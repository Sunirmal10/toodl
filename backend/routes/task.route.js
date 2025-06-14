import express from 'express'; //1
import { createTask, getAllTasks, updateTask, deleteTask } from '../controllers/task.controller.js'; // 2

const router = express.Router(); // 3

// 4. connecting to the controllers

router.post('/create', createTask); // C 4.1
router.get('/getAll', getAllTasks); // R 4.2
router.patch('/update', updateTask);  // U 4.3
router.post('/delete', deleteTask);  // D 4.4 

export default router; // 5
