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

package org.optatask.domain.realtime;

import java.util.List;

import com.thoughtworks.xstream.annotations.XStreamAlias;
import org.optaplanner.core.impl.score.director.ScoreDirector;
import org.optaplanner.core.impl.solver.ProblemFactChange;
import org.optatask.domain.AbstractPersistable;
import org.optatask.domain.Task;
import org.optatask.domain.TaskAssigningSolution;
import org.optatask.domain.TaskType;

@XStreamAlias("TaAddTaskProblemFactChange")
public class AddTaskProblemFactChange extends AbstractPersistable implements ProblemFactChange<TaskAssigningSolution> {

    private final Task task;
    private final Long taskTypeId;
    private final Long customerId;

    public AddTaskProblemFactChange(Task task, Long taskTypeId, Long customerId) {
        this.task = task;
        this.taskTypeId = taskTypeId;
        this.customerId = customerId;
    }

    @Override
    public void doChange(ScoreDirector<TaskAssigningSolution> scoreDirector) {
        TaskAssigningSolution solution = scoreDirector.getWorkingSolution();
        List<Task> taskList = solution.getTaskList();

        for (TaskType taskType : solution.getTaskTypeList()) {
            if (taskType.getId() == taskTypeId) {
                task.setTaskType(taskType);
            }
        }
        solution.getCustomerList().stream().forEach(customer -> {
            if (customer.getId() == customerId) {
                task.setCustomer(customer);
            }
        });

        long taskId = 0L;
        int taskIndexInTaskType = 0;
        // A SolutionCloner clones planning entity lists (such as taskList), so no need to clone the processList here
        for (Task other : taskList) {
            if (taskId <= other.getId()) {
                taskId = other.getId() + 1L;
            }
            if (task.getTaskType() == other.getTaskType()) {
                if (taskIndexInTaskType <= other.getIndexInTaskType()) {
                    taskIndexInTaskType = other.getIndexInTaskType() + 1;
                }
            }
        }
        task.setId(taskId);
        task.setIndexInTaskType(taskIndexInTaskType);

        scoreDirector.beforeEntityAdded(task);
        taskList.add(task);
        scoreDirector.afterEntityAdded(task);
        scoreDirector.triggerVariableListeners();
    }
}
