const express = require('express');
const router = express.Router();
const { createGoal, getGoals, updateProgress, deleteGoal } = require('../controllers/goalController');

router.post('/', createGoal);
router.get('/:userId', getGoals);
router.put('/:id/progress', updateProgress);
router.delete('/:id', deleteGoal);

module.exports = router;