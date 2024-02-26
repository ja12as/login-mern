import { Route, Router } from "express";
import { getTask, getTasks, createTask ,deleteTask,updateTask } from "../controllers/task.controller.js";
import {requiredAuth } from '../middlewares/tokenValidation.js'
import { createTaskSchema } from '../schemas/task.schema.js';
import { validateSchema } from "../middlewares/validator.middewares.js";

const router = Router();

router.get('/tasks', requiredAuth, getTasks)
router.get('/task/:id', requiredAuth, getTask)
router.post('/task', requiredAuth, validateSchema(createTaskSchema), createTask)
router.put('/task/:id', requiredAuth, updateTask)
router.delete('/task/:id', requiredAuth, deleteTask)

export default router;