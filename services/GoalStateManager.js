// Base state class
class GoalState {
    handleGoalBehavior(goal) {
        throw new Error('handleGoalBehavior must be implemented');
    }
}
// Active state - goal is in progress, checks for completion or overdue
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
// Completed state - goal has been reached, ignores further updates
class CompletedState extends GoalState {
    handleGoalBehavior(goal) {
        console.log(`Goal ${goal.goalId} is already completed`);
    }
}
// Overdue state - deadline has passed, ignores further updates
class OverdueState extends GoalState {
    handleGoalBehavior(goal) {
        console.log(`Goal ${goal.goalId} is overdue and cannot be updated`);
    }
}

module.exports = { ActiveState, CompletedState, OverdueState }