import Task from "../models/task.model.js";
import mongoose from "mongoose";

// create task

export const createTask = async (req, res) => {

    try {
        const { todo, status, checked } = req.body;

        const newTask = Task(
            {
                todo,
                status: status || "pending",
                checked: checked || false
            }
        );
        await newTask.save();
        res.status(201).json({
            success: true,
            message: "Task created successfully",
            
        });
    }catch(error) {
        console.error("Error in creating taks:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create task. Please try again later."   
        });
    }

 };

// get all tasks

export const getAllTasks = async (req,res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json({
            success: true,
            tasks
        });
        
    } catch (error) {
        console.log("Error in getting tasks:", error);
        res.status(500).json({
            success: false,
            message: "Failed to get tasks. Please try again later."
        });
    }
}

// update task

export const updateTask = async (req, res) => {

    try {
        
        const { taskId, todo, status, checked } = req.body;

        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            {
                todo,
                status: status || "pending",
                checked: checked || false
            },
            { new: true }
        );

        if(updatedTask) {
            res.status(200).json({
                success: true,
                message: "Task updated successfully",
                
            })
        } else {
            res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

    } catch (error) {
        console.log("Task not found!");
        res.status(500).json({
            success: false,
            message: "Failed to update task. Please try again later."
        });
    };
}

// delete task

export const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.body;

        const deletedTask = await Task.findByIdAndDelete(taskId);
        if (deletedTask) {
            res.status(200).json({
                success: true,
                message: "Task deleted successfully"
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

    } catch (error) {
        console.error("Error in deleting task:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete task. Please try again later."
        });
    }
}