import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { managerOnly, staffOnly } from '../middleware/role.js';
import { createTask, getMyTasks, getAllTasks, updateTaskStatus } from '../controllers/task.controller.js';


const router = express.Router();
router.use(authMiddleware);
router.post('/create', managerOnly, createTask);
router.get('/my', staffOnly, getMyTasks);
router.get('/all', managerOnly, getAllTasks);
router.patch('/:id/status', authMiddleware, updateTaskStatus);
export default router;