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
