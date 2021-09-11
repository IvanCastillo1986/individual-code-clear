// Dependencies
const express = require("express");
const code = express.Router();
const {
  getAllDays,
  getDay,
  createDay,
  deleteDay,
  updateDay,
} = require("../queries/code.js");

// ROUTES

// Index
code.get("/", async (req, res) => {
  const allDays = await getAllDays();
  try {
    if (allDays.code === "ECONNREFUSED") {
      console.log(`Database ${allDays}`);
      throw `Unable to connect to the database`;
    } else {
      res.json({
        success: true,
        payload: allDays,
      });
    }
  } catch (e) {
    res.status(404).json({
      error: "Error",
      message: e,
    });
  }
});

// Create
code.post("/", async (req, res) => {
  try {
    const newDay = await createDay(req.body);
    if (newDay["id"]) {
      res.json({
        success: true,
        payload: newDay,
      });
    } else {
      console.log(`Database error: ${newDay}`);
      throw `Error adding ${req.body} to the database.`;
    }
  } catch (error) {
    res.status(404).json({
      error: "Code not added.",
      message: error,
    });
  }
});

// Show
code.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const day = await getDay(id);
    if (day["id"]) {
      res.json({
        success: true,
        payload: day,
      });
    } else {
      console.log(`Database error: ${day}`);
      throw `There is no code with the id: ${id}`;
    }
  } catch (error) {
    res.status(404).json({
      error: "Resource not found.",
      message: error,
    });
  }
});

// Destroy
code.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDay = await deleteDay(id);
    if (deletedDay["id"]) {
      res.status(200).json({
        success: true,
        payload: deletedDay,
      });
    } else {
      console.log(`Database error: ${deletedDay}`);
      throw `There is no day to delete with the id: ${id}`;
    }
  } catch (e) {
    res.status(404).json({
      error: "day not deleted",
      message: e,
    });
  }
});

// Update
code.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedDay = await updateDay(id, req.body);
    if (updatedDay["id"]) {
      res.status(200).json({
        success: true,
        payload: updatedDay,
      });
    } else {
      console.log(`Database error: ${updatedDay}`);
      throw `There is no day to be updated with the id: ${id}`;
    }
  } catch (e) {
    res.status(404).json({
      error: "day not updated",
      message: e,
    });
  }
});

module.exports = code;
