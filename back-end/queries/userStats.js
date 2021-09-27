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

// const getJanStats = async () => {
//   try {
//     const semiColons = await db.one(
//       `SELECT COUNT(messageId) AS "Missing Semicolons" FROM stats WHERE messageId='missingSemi' AND date LIKE '%-01-%'`
//     );
//     const indentations = await db.one(
//       `SELECT COUNT(messageId) AS "Wrong Indentations" FROM stats WHERE messageId='wrongIndentation' AND date LIKE '%-01-%'`
//     );
//     const strQuotes = await db.one(
//       `SELECT COUNT(messageId) AS "Wrong String Quotes" FROM stats WHERE messageId='wrongQuotes' AND date LIKE '%-01-%'`
//     );
//     const trailingSpaces = await db.one(
//       `SELECT COUNT(messageId) AS "Trailing Spaces" FROM stats WHERE messageId='trailingSpace' AND date LIKE '%-01-%'`
//     );
//     return [semiColons, indentations, strQuotes, trailingSpaces];
//   } catch (error) {
//     return error;
//   }
// };

const getByWeek = async (date) => {
  try {
    const week = await db.one(`SELECT TO_CHAR(DATE '${date}', 'WW')`);
    const allStats = await db.any("SELECT * FROM stats");
    const wordArr = allStats.map((elem) => {
      return elem.message_id;
    });
    let filter = wordArr.filter((elem, i) => {
      return wordArr.indexOf(elem) === i;
    });
    const stats = filter.map((elem) => {
      const count = async () => {
        return await db.one(
          `SELECT COUNT(message_id) AS "$1" FROM stats WHERE message_id=$1 AND week=$2`,
          [elem, week.to_char]
        );
      };
      return count();
    });
    stats;
    return stats;
  } catch (error) {
    return error;
  }
};

// const log = async () => {
//   let data = await getByWeek("2021-09-27");
//   await getAllStats();
//   await getAllStats();
//   console.log(data);
// };

// log();

const createStats = async (stats) => {
  try {
    const newStats = stats.map((elem) => {
      const newStat = async () => {
        return await db.one(
          "INSERT INTO stats (message_id, message, source_code, severity, rating) VALUES ($1, $2, $3, $4, $5) RETURNING *",
          [
            elem.ruleId,
            elem.message,
            elem.source_code,
            elem.severity,
            elem.rating,
          ]
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
      "UPDATE stats SET message_id=$1, message=$2, source_code=$3, severity=$4, rating=$5 WHERE id=$6 RETURNING *",
      [
        stat.ruleId,
        stat.message,
        stat.source_code,
        stat.severity,
        stat.rating,
        id,
      ]
    );
    return updatedStat;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllStats,
  getStat,
  getByWeek,
  createStats,
  deleteStat,
  updateStat,
};
