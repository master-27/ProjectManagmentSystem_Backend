const express = require("express");
const prisma = require("../prismaClient");
const jwtMiddleware = require("./jwtMiddleware");

const router = express.Router();

// Create a New Project (Protected)
router.post("/", jwtMiddleware, async (req, res) => {
  const { name, description, status } = req.body;
  const userId = req.user.userId; // Get user ID from JWT token

  try {
    const project = await prisma.project.create({
      data: {
        name,
        description,
        status: status || "PLANNED",
        userId,
      },
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Error creating project", error });
  }
});

//  Get All Projects 
router.get("/", jwtMiddleware, async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: { userId: req.user.userId },
      include: { tasks: true },
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects", error });
  }
});

//Update a Project 
router.put("/:id", jwtMiddleware, async (req, res) => {
  const { name, description, status } = req.body;
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const project = await prisma.project.findUnique({ where: { id } });

    if (!project || project.userId !== userId) {
      return res.status(403).json({ message: "Unauthorized to update this project" });
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: { name, description, status },
    });

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: "Error updating project", error });
  }
});

// Delete a Project 
router.delete("/:id", jwtMiddleware, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const project = await prisma.project.findUnique({ where: { id } });

    if (!project || project.userId !== userId) {
      return res.status(403).json({ message: "Unauthorized to delete this project" });
    }

    await prisma.task.deleteMany({ where: { projectId: id } }); // Delete associated tasks first because of foreign key constraints.
    await prisma.project.delete({ where: { id } });

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting project", error });
  }
});



//  Add a New Task under a Project
router.post("/:projectId/tasks", jwtMiddleware, async (req, res) => {
    const { title, description, status, assignedUserId } = req.body;
    const { projectId } = req.params;  
  
    try {
      // Check if the project exists
      const project = await prisma.project.findUnique({ where: { id: projectId } });
      if (!project) return res.status(404).json({ message: "Project not found" });
  
      // Create the task under this project
      const task = await prisma.task.create({
        data: {
          title,
          description,
          status: status || "TODO",
          projectId,  //under a project id.
          assignedUserId,
        },
      });
  
      res.status(201).json(task);
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({ message: "Error creating task", error: error.message });
    }
  });
  

module.exports = router;
