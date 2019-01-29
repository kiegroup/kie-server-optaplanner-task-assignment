/*
 * Copyright 2016 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.kie.server.examples.optaplanner.taskassignment.kjar.domain;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.atomic.AtomicInteger;

import org.junit.Test;
import org.kie.server.examples.optaplanner.taskassignment.kjar.domain.realtime.AddTaskProblemFactChange;
import org.kie.server.examples.optaplanner.taskassignment.kjar.domain.realtime.DeleteTaskProblemFactChange;
import org.optaplanner.core.api.solver.Solver;
import org.optaplanner.core.api.solver.SolverFactory;
import org.optaplanner.core.api.solver.event.BestSolutionChangedEvent;
import org.optaplanner.core.api.solver.event.SolverEventListener;
import org.optaplanner.core.config.solver.termination.TerminationConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class TaskAssigningRealtimeTest {

    private static final String SOLVER_CONFIG = "org/kie/server/examples/optaplanner/taskassignment/kjar/solver/taskAssigningSolverConfig.xml";
    private final transient Logger logger = LoggerFactory.getLogger(getClass());

    private final Object stageLock = new Object();
    private AtomicInteger stageNumber = new AtomicInteger(0);
    private CountDownLatch stage1Latch = new CountDownLatch(1);
    private CountDownLatch stage2Latch = new CountDownLatch(1);
    private CountDownLatch stage3Latch = new CountDownLatch(1);

    private volatile Throwable solverThreadException = null;

    @Test(timeout = 600000)
    public void addAndRemoveTaskProblemFactChange() throws InterruptedException {
        Solver<TaskAssigningSolution> solver = buildSolver();
        TaskAssigningSolution solution = buildProblem();
        SolverThread solverThread = new SolverThread(solver, solution);
        solverThread.start();
        // Wait for the solver thread to start up
        waitForNextStage();

        // Give the solver thread a chance to terminate and get into the daemon waiting state
        Thread.sleep(500);

        int numberOfTasks = 5;
        for (int i = 0; i < numberOfTasks; i++) {
            Task task = new Task();
            task.setTaskType(solution.getTaskTypeList().get(0));
            task.setCustomer(solution.getCustomerList().get(0));
            solver.addProblemFactChange(new AddTaskProblemFactChange(task, 0L, 0L));
        }
        waitForNextStage();
        assertEquals(numberOfTasks, (solver.getBestSolution()).getTaskList().size());

        for (int i = 0; i < numberOfTasks; i++) {
            solver.addProblemFactChange(new DeleteTaskProblemFactChange((long) i));
        }

        waitForNextStage();
        assertEquals(0, (solver.getBestSolution()).getTaskList().size());

        solver.terminateEarly();
        try {
            // Wait until the solver thread dies.
            solverThread.join();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("SolverThread did not die yet due to an interruption.", e);
        }
        assertTrue(solver.isEveryProblemFactChangeProcessed());
    }

    private Solver<TaskAssigningSolution> buildSolver() {
        SolverFactory<TaskAssigningSolution> solverFactory = SolverFactory.createFromKieContainerXmlResource(
                SOLVER_CONFIG);
        solverFactory.getSolverConfig().setTerminationConfig(new TerminationConfig().withBestScoreFeasible(true));
        return solverFactory.buildSolver();
    }

    private TaskAssigningSolution buildProblem() {
        TaskAssigningSolution solution = new TaskAssigningSolution();
        solution.setId(0L);
        solution.setSkillList(new ArrayList<>());
        solution.setCustomerList(new ArrayList<>());
        solution.setEmployeeList(new ArrayList<>());
        solution.setTaskTypeList(new ArrayList<>());
        solution.setTaskList(new ArrayList<>());
        solution.setFrozenCutoff(0);

        Skill skill = new Skill();
        skill.setId(0L);
        solution.getSkillList().add(skill);

        TaskType taskType = new TaskType();
        taskType.setId(0L);
        taskType.setCode("type0");
        taskType.setRequiredSkillList(new ArrayList<>());
        solution.getTaskTypeList().add(taskType);

        Customer customer = new Customer();
        customer.setId(0L);
        customer.setName("customer0");
        solution.getCustomerList().add(customer);

        Employee employee = new Employee();
        employee.setId(0L);
        employee.setFullName("employee0");
        employee.setSkillSet(new HashSet<>());
        employee.setAffinityMap(new HashMap<>());
        solution.getEmployeeList().add(employee);

        return solution;
    }

    private class SolverThread extends Thread implements SolverEventListener<TaskAssigningSolution> {

        private final Solver<TaskAssigningSolution> solver;
        private final TaskAssigningSolution solution;

        public SolverThread(Solver<TaskAssigningSolution> solver, TaskAssigningSolution solution) {
            this.solver = solver;
            this.solution = solution;
        }

        @Override
        public void run() {
            solver.addEventListener(this);
            nextStage();
            try {
                solver.solve(solution);
            } catch (Throwable e) {
                solverThreadException = e;
                nextStage();
            }
        }

        @Override
        public void bestSolutionChanged(BestSolutionChangedEvent<TaskAssigningSolution> event) {
            if (event.isEveryProblemFactChangeProcessed() && event.getNewBestSolution().getScore().isFeasible()) {
                nextStage();
            }
        }
    }

    private void nextStage() {
        synchronized (stageLock) {
            switch (stageNumber.get()) {
                case 0:
                    stage1Latch.countDown();
                    break;
                case 1:
                    stage2Latch.countDown();
                    break;
                case 2:
                    stage3Latch.countDown();
                    break;
            }
        }
    }

    private void waitForNextStage() throws InterruptedException {
        CountDownLatch latch;
        synchronized (stageLock) {
            switch (stageNumber.get()) {
                case 0:
                    latch = stage1Latch;
                    break;
                case 1:
                    latch = stage2Latch;
                    break;
                case 2:
                    latch = stage3Latch;
                    break;
                default:
                    throw new IllegalStateException("Unsupported phaseNumber (" + stageNumber.get() + ").");
            }
        }
        latch.await();
        if (solverThreadException != null) {
            throw new RuntimeException("SolverThread threw an exception.", solverThreadException);
        }
        int stage;
        synchronized (stageLock) {
            stage = stageNumber.incrementAndGet();
        }
        logger.info("==== New testing stage ({}) started. ====", stage);
    }
}
