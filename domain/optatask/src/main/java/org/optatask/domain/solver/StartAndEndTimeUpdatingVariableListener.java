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

package org.optatask.domain.solver;

import java.util.Objects;

import org.optaplanner.core.impl.domain.variable.listener.VariableListener;
import org.optaplanner.core.impl.score.director.ScoreDirector;
import org.optatask.domain.Task;
import org.optatask.domain.TaskOrEmployee;

public class StartAndEndTimeUpdatingVariableListener implements VariableListener<Task> {

    @Override
    public void beforeEntityAdded(ScoreDirector scoreDirector, Task task) {
        // Do nothing
    }

    @Override
    public void afterEntityAdded(ScoreDirector scoreDirector, Task task) {
        updateStartAndEndTime(scoreDirector, task);
    }

    @Override
    public void beforeVariableChanged(ScoreDirector scoreDirector, Task task) {
        // Do nothing
    }

    @Override
    public void afterVariableChanged(ScoreDirector scoreDirector, Task task) {
        updateStartAndEndTime(scoreDirector, task);
    }

    @Override
    public void beforeEntityRemoved(ScoreDirector scoreDirector, Task task) {
        // Do nothing
    }

    @Override
    public void afterEntityRemoved(ScoreDirector scoreDirector, Task task) {
        // Do nothing
    }

    protected void updateStartAndEndTime(ScoreDirector scoreDirector, Task sourceTask) {
        TaskOrEmployee previous = sourceTask.getPreviousTaskOrEmployee();
        Task shadowTask = sourceTask;
        Integer previousEndTime = (previous == null ? null : previous.getEndTime());
        Integer startTime = calculateStartTime(shadowTask, previousEndTime);
        Integer endTime = calculateEndTime(shadowTask, startTime);
        while (shadowTask != null && !Objects.equals(shadowTask.getStartTime(), startTime)) {
            scoreDirector.beforeVariableChanged(shadowTask, "startTime");
            shadowTask.setStartTime(startTime);
            scoreDirector.afterVariableChanged(shadowTask, "startTime");

            scoreDirector.beforeVariableChanged(shadowTask, "endTime");
            shadowTask.setEndTime(endTime);
            scoreDirector.afterVariableChanged(shadowTask, "endTime");

            previousEndTime = shadowTask.getEndTime();
            shadowTask = shadowTask.getNextTask();
            startTime = calculateStartTime(shadowTask, previousEndTime);
            endTime = calculateEndTime(shadowTask, startTime);
        }
    }

    private Integer calculateStartTime(Task task, Integer previousEndTime) {
        if (task == null || previousEndTime == null) {
            return null;
        }
        return Math.max(task.getReadyTime(), previousEndTime);
    }

    private Integer calculateEndTime(Task shadowTask, Integer startTime) {
        return startTime == null || shadowTask == null ? 0 : startTime + shadowTask.getDuration();
    }

}
