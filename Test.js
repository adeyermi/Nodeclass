const express = require("express");

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

const port = 3000;

// In-memory array to store users
let users = [];
let idCounter = 1; // Simple ID generator

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// CREATE (POST) - Add a new user
app.post("/users", (req, res) => {
  const { name, email } = req.body; // Expecting name and email in the request body
  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }
  const newUser = {
    id: idCounter++,
    name,
    email,
  };
  users.push(newUser);
  res.status(201).json({
    message: "User added successfully",
    user: newUser,
  });
});

// READ (GET) - Get all users or a specific user by ID
app.get("/users", (req, res) => {
  res.status(200).json({
    message: "List of users",
    users: users,
  });
});

app.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({
    message: "User retrieved successfully",
    user: user,
  });
});

// UPDATE (PATCH) - Update an existing user by ID
app.patch("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }
  // Update only provided fields
  if (name) users[userIndex].name = name;
  if (email) users[userIndex].email = email;
  res.status(200).json({
    message: "User updated successfully",
    user: users[userIndex],
  });
});

// DELETE - Delete a user by ID
app.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }
  users.splice(userIndex, 1); // Remove the user from the array
  res.status(200).json({
    message: "User deleted successfully",
  });
});

// Optional: General greeting endpoint
app.get("/intro", (req, res) => {
  res.status(200).json({
    message: "Welcome to the User Management API",
  });
});