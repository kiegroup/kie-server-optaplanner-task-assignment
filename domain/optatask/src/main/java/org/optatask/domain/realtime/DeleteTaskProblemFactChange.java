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
