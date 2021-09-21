const db = require("../db/dbConfig");

const getAllStats = async () => {
  try {
    const allStats = await db.any("SELECT * FROM stats");
    return allStats;
  } catch (err) {
    return err;
  }
};

const getStat = async (id) => {
  try {
    const oneStat = await db.one("SELECT * FROM stats where id=$1", id);
    return oneStat;
  } catch (error) {
    return error;
  }
};

const createStat = async (stat) => {
  try {
    const newStat = await db.one(
      "INSERT INTO stats (name, date, severity_level, rating) VALUES ($1, $2, $3, $4) RETURNING *",
      [stat.name, stat.date, stat.severity_level, stat.rating]
    );
    return newStat;
  } catch (error) {
    return error;
  }
};

const deleteStat = async (id) => {
  try {
    const deletedStat = await db.one(
      "DELETE FROM stats WHERE id = $1 RETURNING *",
      id
    );
    return deletedStat;
  } catch (error) {
    return error;
  }
};

const updateStat = async (id, stat) => {
  try {
    const updatedStat = await db.one(
      "UPDATE stats SET name=$1, date=$2, severity_level=$3, rating=$4 WHERE id=$5 RETURNING *",
      [stat.name, stat.date, stat.severity_level, stat.rating, id]
    );
    return updatedStat;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllStats,
  getStat,
  createStat,
  deleteStat,
  updateStat,
};
