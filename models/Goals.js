connectDB = require('../config/db');
const {ObjectId} = require('mongodb');
const { ActiveState, CompletedState, OverdueState } = require('../services/GoalStateManager');

class Goal {
  constructor(userId, targetAmount, deadline) {
    this.userId = new ObjectId(userId);
    this.targetAmount = targetAmount;
    this.currentAmount = 0;
    this.deadline = new Date(deadline);
    this.status = 'active';
    this.state = new ActiveState();
    this.createdAt = new Date();
  }

    updateProgress(amount) {
        this.currentAmount += amount;
        this.checkStatus();
    }

    checkStatus() {
        this.state.handleGoalBehavior(this);
    }

    async save() {
        const db = await connectDB();
        const { state, ...goalData } = this;
        return db.collection('goals').insertOne(goalData);
    }

    static async findByUser(userId) {
        const db = await connectDB();
        return db.collection('goals').find({ userId: new ObjectId(userId) }).toArray();
    }

    static async findById(id) {
        const db = await connectDB();
        return db.collection('goals').findOne({ _id: new ObjectId(id) });
    }

    static async update(id, updates) {
        const db = await connectDB();
        return db.collection('goals').updateOne(
            { _id: new ObjectId(id) },
            { $set: updates }
        );
    }

    static async delete(id) {
        const db = await connectDB();
        return db.collection('goals').deleteOne({ _id: new ObjectId(id) });
    }

    static getState(status) {
        if (status === 'completed') return new CompletedState();
        if (status === 'overdue') return new OverdueState();
        return new ActiveState();
    }
}

module.exports = Goal;




