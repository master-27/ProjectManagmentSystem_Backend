require("dotenv").config();
const express = require("express");
const cors = require("cors");
const prisma = require("./prismaClient");
const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/projectRoute");
const taskRoutes = require("./routes/task");
const { task } = require("./prismaClient");

const app = express();
app.use(cors());
app.use(express.json());

// Routes 
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks/",taskRoutes);

app.get("/", (req, res) => {
  res.send("Project Management API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
