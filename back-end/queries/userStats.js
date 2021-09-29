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

const getByDayPieChart = async (date) => {
  try {
    const day = await db.one(`SELECT TO_CHAR(DATE '${date}', 'DD')`);
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
          `SELECT COUNT(message_id) AS "$1" FROM stats WHERE message_id=$1 AND date LIKE '%-${day.to_char}%'`,
          [elem]
        );
      };
      return count();
    });

    return Promise.all(stats);
  } catch (error) {
    return error;
  }
};

const getByWeekPieChart = async (date) => {
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

    return Promise.all(stats);
  } catch (error) {
    return error;
  }
};

const getByMonthPieChart = async (date) => {
  try {
    const month = await db.one(`SELECT TO_CHAR(DATE '${date}', 'MM')`);
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
          `SELECT COUNT(message_id) AS "$1" FROM stats WHERE message_id=$1 AND date LIKE '%-${month.to_char}-%'`,
          [elem]
        );
      };
      return count();
    });

    return Promise.all(stats);
  } catch (error) {
    return error;
  }
};

const getByYearPieChart = async (date) => {
  try {
    const year = await db.one(`SELECT TO_CHAR(DATE '${date}', 'YYYY')`);
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
          `SELECT COUNT(message_id) AS "$1" FROM stats WHERE message_id=$1 AND date LIKE '%${year.to_char}-%'`,
          [elem]
        );
      };
      return count();
    });

    return Promise.all(stats);
  } catch (error) {
    return error;
  }
};

const getByDayBarChart = async (date) => {
  try {
    const day = await db.one(`SELECT TO_CHAR(DATE '${date}', 'DD')`);
    let dayData = await db.any(
      `SELECT message_id, severity FROM stats WHERE date LIKE '%-${day.to_char}%'`
    );
    return dayData;
  } catch (error) {
    return error;
  }
};

const getByWeekBarChart = async (date) => {
  try {
    const week = await db.one(`SELECT TO_CHAR(DATE '${date}', 'WW')`);
    let weekData = await db.any(
      "SELECT message_id, severity FROM stats WHERE week=$1",
      week.to_char
    );
    return weekData;
  } catch (error) {
    return error;
  }
};

const getByMonthBarChart = async (date) => {
  try {
    const month = await db.one(`SELECT TO_CHAR(DATE '${date}', 'MM')`);
    let monthData = await db.any(
      `SELECT message_id, severity FROM stats WHERE date LIKE '%-${month.to_char}-%'`
    );
    return monthData;
  } catch (error) {
    return error;
  }
};

const getByYearBarChart = async (date) => {
  try {
    const year = await db.one(`SELECT TO_CHAR(DATE '${date}', 'YYYY')`);
    let yearData = await db.any(
      `SELECT message_id, severity FROM stats WHERE date LIKE '%${year.to_char}-%'`
    );
    return yearData;
  } catch (error) {
    return error;
  }
};

// const log = async () => {
//   let data = await getByYearPieChart("2021-09-29");
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
    return Promise.all(newStats);
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
  getByDayPieChart,
  getByDayBarChart,
  getByWeekPieChart,
  getByWeekBarChart,
  getByMonthPieChart,
  getByMonthBarChart,
  getByYearPieChart,
  getByYearBarChart,
  createStats,
  deleteStat,
  updateStat,
};
