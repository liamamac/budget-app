class GoalState {
    handleGoalBehavior(goal) {
        throw new Error('handleGoalBehavior must be implemented');
    }
}

class ActiveState extends GoalState {
    handleGoalBehavior(goal) {
        if (goal.currentAmount >= goal.targetAmount) {
            goal.status = 'completed';
            goal.state = new CompletedState();
            console.log(`Goal ${goal.goalId} completed`);
        } else if (new Date() > new Date(goal.deadline)) {
            goal.status = 'overdue';
            goal.state = new OverdueState();
        console.log(`Goal ${goal.goalId} is overdue`);
        }
    }
}

class CompletedState extends GoalState {
    handleGoalBehavior(goal) {
        console.log(`Goal ${goal.goalId} is already completed`);
    }
}

class OverdueState extends GoalState {
    handleGoalBehavior(goal) {
        console.log(`Goal ${goal.goalId} is overdue and cannot be updated`);
    }
}

module.exports = { ActiveState, CompletedState, OverdueState }