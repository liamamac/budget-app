const Goal = require('../models/Goals');

async function createGoal() {
    try {
        const { userId, targetAmount, deadline } = req.body;

        const goal = new Goal(userId, targetAmount, deadline);
        await goal.save();

        res.status(201).json({message: 'Goal created successfully'});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

async function getGoals(req, res) {
    try {
        const { userId } = req.params;
        const goals = await Goal.findByUser(userId);
        res.json(goals);
    } catch {
        res.status(500).json({message: err.message});
    }
}

async function updateProgress(req, res) {
    try {
        const { id } = req.params;
        const { amount } = req.body;

        const goalData = await Goal.findById(id);
        if(!goalData) return res.status(404).json({message: 'Goal not found'});
        
        const goal = new Goal(goalData.userId, goalData.targetAmount, goalData.deadline);
        goal.currentAmount = goalData.currentAmount;
        goal.status = goalData.status;
        goal.state = Goal.getState(goalData.status);

        goal.updateProgress(amount);

        await Goal.update(id, {
            currentAmount: goal.currentAmount,
            status: goal.status
        });

        res.status(200).json({ message: 'Progress updated', status: goal.status });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function deleteGoal(req, res) {
    try {
        const { id } = req.params;
        await Goal.delete(id);
        res.status(200).json({ message: 'Goal deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { createGoal, getGoals, updateProgress, deleteGoal };