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

@XStreamAlias("TaPinTaskProblemFactChange")
public class PinTaskProblemFactChange extends AbstractPersistable implements ProblemFactChange<TaskAssigningSolution> {

    private Long taskId;

    public PinTaskProblemFactChange(Long taskId) {
        this.taskId = taskId;
    }

    @Override
    public void doChange(ScoreDirector<TaskAssigningSolution> scoreDirector) {
        TaskAssigningSolution solution = scoreDirector.getWorkingSolution();
        Task toBePinnedTask = null;

        for (Task task : solution.getTaskList()) {
            if (task.getId().equals(taskId)) {
                toBePinnedTask = task;
                break;
            }
        }
        if (toBePinnedTask == null) {
            return;
        }
        Task workingTask = scoreDirector.lookUpWorkingObject(toBePinnedTask);
        if (workingTask == null) {
            return;
        }

        scoreDirector.beforeProblemPropertyChanged(workingTask);
        workingTask.setPinned(true);
        scoreDirector.afterProblemPropertyChanged(workingTask);
        scoreDirector.triggerVariableListeners();
    }
}
