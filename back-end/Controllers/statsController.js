const stats = require("express").Router();
const {
  getAllStats,
  getStat,
  getByWeek,
  deleteStat,
  updateStat,
} = require("../queries/userStats");

stats.get("/", async (req, res) => {
  try {
    const allStats = await getAllStats();
    if (allStats.code === "ECONNREFUSED") {
      console.log(`Database ${allStats}`);
      throw `Unable to connect to the database`;
    } else {
      res.status(200).json({
        success: true,
        payload: allStats,
      });
    }
  } catch (e) {
    res.status(404).json({
      error: "Error",
      message: e,
    });
  }
});

stats.post("/weekly", async (req, res) => {
  try {
    const weekly = await getByWeek(req.body);
    res.status(200).json({
      success: true,
      payload: weekly,
    });
  } catch (e) {
    res.status(404).json({
      error: "Error",
      message: e,
    });
  }
});

stats.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const stat = await getStat(id);
    if (stat["id"]) {
      res.json({
        success: true,
        payload: stat,
      });
    } else {
      console.log(`Database error: ${stat}`);
      throw `There is no statistic with the id: ${id}`;
    }
  } catch (e) {
    res.status(404).json({
      error: "Statistic not found",
      message: e,
    });
  }
});

stats.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStat = await deleteStat(id);
    if (deletedStat["id"]) {
      res.status(200).json({
        success: true,
        payload: deletedStat,
      });
    } else {
      console.log(`Database error: ${deletedStat}`);
      throw `There is no statistic to delete with the id: ${id}`;
    }
  } catch (e) {
    res.status(404).json({
      error: "Statistic not deleted",
      message: e,
    });
  }
});

stats.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStat = await updateStat(id, req.body);
    if (updatedStat["id"]) {
      res.status(200).json({
        success: true,
        payload: updatedStat,
      });
    } else {
      console.log(`Database error: ${updatedStat}`);
      throw `There is no statistic to be updated with the id: ${id}`;
    }
  } catch (e) {
    res.status(404).json({
      error: "Statistic not updated",
      message: e,
    });
  }
});

module.exports = stats;
