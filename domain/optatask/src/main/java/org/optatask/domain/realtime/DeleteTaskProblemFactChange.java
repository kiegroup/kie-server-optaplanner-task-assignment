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

import com.thoughtworks.xstream.annotations.XStreamAlias;
import org.optaplanner.core.impl.score.director.ScoreDirector;
import org.optaplanner.core.impl.solver.ProblemFactChange;
import org.optatask.domain.AbstractPersistable;
import org.optatask.domain.Task;
import org.optatask.domain.TaskAssigningSolution;

@XStreamAlias("TaDeleteTaskProblemFactChange")
public class DeleteTaskProblemFactChange extends AbstractPersistable implements ProblemFactChange<TaskAssigningSolution> {

    private final Long taskId;

    public DeleteTaskProblemFactChange(Long task) {
        this.taskId = task;
    }

    @Override
    public void doChange(ScoreDirector<TaskAssigningSolution> scoreDirector) {
        TaskAssigningSolution solution = scoreDirector.getWorkingSolution();
        Task toBeRemovedTask = null;
        for (Task task : solution.getTaskList()) {
            if (task.getId().equals(taskId)) {
                toBeRemovedTask = task;
                break;
            }
        }
        if (toBeRemovedTask == null) {
            return;
        }
        Task workingTask = scoreDirector.lookUpWorkingObject(toBeRemovedTask);

        if (workingTask == null) {
            return;
        }

        scoreDirector.beforeEntityRemoved(workingTask);
        updatePreviousTaskOrEmployee(scoreDirector, workingTask);
        solution.getTaskList().remove(workingTask);
        scoreDirector.afterEntityRemoved(workingTask);
        scoreDirector.triggerVariableListeners();
    }

    private void updatePreviousTaskOrEmployee(ScoreDirector<TaskAssigningSolution> scoreDirector, Task workingTask) {
        Task nextTask = workingTask.getNextTask();
        if (nextTask != null) {
            scoreDirector.beforeVariableChanged(nextTask, "previousTaskOrEmployee");
            nextTask.setPreviousTaskOrEmployee(workingTask.getPreviousTaskOrEmployee());
            scoreDirector.afterVariableChanged(nextTask, "previousTaskOrEmployee");
        }
    }
}
