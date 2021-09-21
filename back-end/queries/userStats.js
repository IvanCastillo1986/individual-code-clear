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

const createStats = async (stats) => {
  try {
    const newStats = stats.map((elem) => {
      const newStat = async () => {
        return await db.one(
          "INSERT INTO stats (messageId, message, date, severity, rating) VALUES ($1, $2, $3, $4, $5) RETURNING *",
          [elem.messageId, elem.message, elem.date, elem.severity, elem.rating]
        );
      };
      return newStat();
    });
    return newStats;
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
      "UPDATE stats SET messageId=$1, message=$2, date=$3, severity=$4, rating=$5 WHERE id=$6 RETURNING *",
      [stat.messageId, stat.message, stat.date, stat.severity, stat.rating, id]
    );
    return updatedStat;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllStats,
  getStat,
  createStats,
  deleteStat,
  updateStat,
};
