const express = require("express");
const prisma = require("../prismaClient");
const jwtMiddleware = require("./jwtMiddleware");

const router = express.Router();

// Add a New Task 
router.post("/", jwtMiddleware, async (req, res) => {
  const { title, description, status, assignedUserId, projectId } = req.body;

  try {
    // Check if project exists
    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project) return res.status(404).json({ message: "Project not found" });

    // Create task
    const task = await prisma.task.create({
      data: {
        title,
        description,
        status: status || "TODO",
        projectId,
        assignedUserId,
      },
    });

    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Error creating task", error: error.message });
  }
});

// Get All Tasks for a Specific Project
router.get("/project/:projectId", jwtMiddleware, async (req, res) => {
  const { projectId } = req.params;

  try {
    const tasks = await prisma.task.findMany({
      where: { projectId },
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
});

// Get a Single Task by ID
router.get("/:taskId", jwtMiddleware, async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error fetching task", error });
  }
});

// Update a Task
router.put("/:taskId", jwtMiddleware, async (req, res) => {
  const { taskId } = req.params;
  const { title, description, status, assignedUserId } = req.body;

  try {
    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) return res.status(404).json({ message: "Task not found" });

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { title, description, status, assignedUserId },
    });

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
});

//  Delete a Task
router.delete("/:taskId", jwtMiddleware, async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) return res.status(404).json({ message: "Task not found" });

    await prisma.task.delete({ where: { id: taskId } });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
});

//  Filter Tasks by Status and Assigned User
router.get("/", jwtMiddleware, async (req, res) => {
  const { status, assignedUserId } = req.query;

  try {
    const tasks = await prisma.task.findMany({
      where: {
        status: status ? status.toUpperCase() : undefined,
        assignedUserId: assignedUserId || undefined,
      },
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error filtering tasks", error });
  }
});



// Filter Tasks by Status and Assigned User
router.get("/", jwtMiddleware, async (req, res) => {
  const { status, assignedUserId } = req.query;

  try {
    const tasks = await prisma.task.findMany({
      where: {
        status: status ? status.toUpperCase() : undefined, // Convert status to uppercase to match database value
        assignedUserId: assignedUserId || undefined,
      },
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error filtering tasks", error });
  }
});


module.exports = router;
