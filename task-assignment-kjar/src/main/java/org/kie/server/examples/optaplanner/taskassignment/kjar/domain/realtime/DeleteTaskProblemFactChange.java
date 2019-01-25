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

package org.kie.server.examples.optaplanner.taskassignment.kjar.domain.realtime;

import com.thoughtworks.xstream.annotations.XStreamAlias;
import org.kie.server.examples.optaplanner.taskassignment.kjar.domain.AbstractPersistable;
import org.kie.server.examples.optaplanner.taskassignment.kjar.domain.Task;
import org.kie.server.examples.optaplanner.taskassignment.kjar.domain.TaskAssigningSolution;
import org.optaplanner.core.impl.score.director.ScoreDirector;
import org.optaplanner.core.impl.solver.ProblemFactChange;

@XStreamAlias("TaDeleteTaskProblemFactChange")
public class DeleteTaskProblemFactChange extends AbstractPersistable implements ProblemFactChange<TaskAssigningSolution> {

    private final Long taskId;

    public DeleteTaskProblemFactChange(Long task) {
        this.taskId = task;
    }

    @Override
    public void doChange(ScoreDirector<TaskAssigningSolution> scoreDirector) {
        Task toBeRemovedTask = new Task();
        toBeRemovedTask.setId(taskId);

        Task workingTask = scoreDirector.lookUpWorkingObject(toBeRemovedTask);
        if (workingTask == null) { // The UI button was pressed more than once
            return;
        }

        rerouteChain(scoreDirector, workingTask);

        scoreDirector.beforeEntityRemoved(workingTask);
        scoreDirector.getWorkingSolution().getTaskList().remove(workingTask);
        scoreDirector.afterEntityRemoved(workingTask);
        scoreDirector.triggerVariableListeners();
    }

    private void rerouteChain(ScoreDirector<TaskAssigningSolution> scoreDirector, Task workingTask) {
        Task nextTask = workingTask.getNextTask();
        if (nextTask != null) {
            scoreDirector.beforeVariableChanged(nextTask, "previousTaskOrEmployee");
            nextTask.setPreviousTaskOrEmployee(workingTask.getPreviousTaskOrEmployee());
            scoreDirector.afterVariableChanged(nextTask, "previousTaskOrEmployee");
        }
    }
}
