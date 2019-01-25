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

@XStreamAlias("TaPinTaskProblemFactChange")
public class PinTaskProblemFactChange extends AbstractPersistable implements ProblemFactChange<TaskAssigningSolution> {

    private int consumedTime;

    public PinTaskProblemFactChange(int consumedTime) {
        this.consumedTime = consumedTime;
    }

    @Override
    public void doChange(ScoreDirector<TaskAssigningSolution> scoreDirector) {
        scoreDirector.getWorkingSolution().setFrozenCutoff(consumedTime);

        // There's no need to call scoreDirector.lookUpWorkingObject(workingTask);
        //   since we're looping through the whole taskList
        for (Task workingTask : scoreDirector.getWorkingSolution().getTaskList()) {
            if (workingTask.getStartTime() != null && workingTask.getStartTime() < consumedTime) {
                scoreDirector.beforeProblemPropertyChanged(workingTask);
                workingTask.setPinned(true);
                scoreDirector.afterProblemPropertyChanged(workingTask);
            } else if (workingTask.getReadyTime() < consumedTime) {
                // Prevent a non-pinned task from being assigned retroactively
                scoreDirector.beforeProblemPropertyChanged(workingTask);
                workingTask.setReadyTime(consumedTime);
                scoreDirector.afterProblemPropertyChanged(workingTask);
            }
        }

        scoreDirector.triggerVariableListeners();
    }
}
