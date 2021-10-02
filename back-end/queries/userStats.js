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

const getAnnualStats = async (date) => {
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
        const jan = await db.one(
          `SELECT COUNT(message_id) AS "$1" FROM stats WHERE message_id=$1 AND date LIKE '%${year.to_char}-01-%'`,
          [elem]
        );
        const feb = await db.one(
          `SELECT COUNT(message_id) AS "$1" FROM stats WHERE message_id=$1 AND date LIKE '%${year.to_char}-02-%'`,
          [elem]
        );
        const mar = await db.one(
          `SELECT COUNT(message_id) AS "$1" FROM stats WHERE message_id=$1 AND date LIKE '%${year.to_char}-03-%'`,
          [elem]
        );
        const apr = await db.one(
          `SELECT COUNT(message_id) AS "$1" FROM stats WHERE message_id=$1 AND date LIKE '%${year.to_char}-04-%'`,
          [elem]
        );
        const may = await db.one(
          `SELECT COUNT(message_id) AS "$1" FROM stats WHERE message_id=$1 AND date LIKE '%${year.to_char}-05-%'`,
          [elem]
        );
        const jun = await db.one(
          `SELECT COUNT(message_id) AS "$1" FROM stats WHERE message_id=$1 AND date LIKE '%${year.to_char}-06-%'`,
          [elem]
        );
        const jul = await db.one(
          `SELECT COUNT(message_id) AS "$1" FROM stats WHERE message_id=$1 AND date LIKE '%${year.to_char}-07-%'`,
          [elem]
        );
        const aug = await db.one(
          `SELECT COUNT(message_id) AS "$1" FROM stats WHERE message_id=$1 AND date LIKE '%${year.to_char}-08-%'`,
          [elem]
        );
        const sep = await db.one(
          `SELECT COUNT(message_id) AS "$1" FROM stats WHERE message_id=$1 AND date LIKE '%${year.to_char}-09-%'`,
          [elem]
        );
        const oct = await db.one(
          `SELECT COUNT(message_id) AS "$1" FROM stats WHERE message_id=$1 AND date LIKE '%${year.to_char}-10-%'`,
          [elem]
        );
        const nov = await db.one(
          `SELECT COUNT(message_id) AS "$1" FROM stats WHERE message_id=$1 AND date LIKE '%${year.to_char}-11-%'`,
          [elem]
        );
        const dec = await db.one(
          `SELECT COUNT(message_id) AS "$1" FROM stats WHERE message_id=$1 AND date LIKE '%${year.to_char}-12-%'`,
          [elem]
        );
        return [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec];
      };
      return count();
    });

    return Promise.all(stats);
  } catch (error) {
    return error;
  }
};

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
//   let data = await getAnnualStats("2021-09-29");
//   console.log(data);
// };

// log();

const createStats = async (stats) => {
  try {
    let qString = "INSERT INTO stats (message_id, message, source_code, severity, rating) VALUES ";
    let count = 0;
    qString += Array.from({ length: stats.length }, () => `($${++count}, $${++count}, $${++count}, $${++count}, $${++count})`).join(",") + " RETURNING *";
    console.log(qString, "STRINGGGGGG HERE")

    const qArray = [];
    stats.forEach(stat => qArray.push(stat.ruleId, stat.message, stat.source_code, stat.severity, stat.rating));

    const result = await db.any(qString, qArray);
    console.log(result, "RESULT HEREEEE")
    return result;
    // const newStats = stats.map((elem) => {
    //   const newStat = async () => {
    //     return await db.one(
    //       "INSERT INTO stats (message_id, message, source_code, severity, rating) VALUES ($1, $2, $3, $4, $5), ($6, $7) RETURNING *",
    //       [
    //         elem.ruleId,
    //         elem.message,
    //         elem.source_code,
    //         elem.severity,
    //         elem.rating,
    //       ]
    //     );
    //   };
    //   return newStat();
    // });
    // return Promise.all(newStats);
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
  getAnnualStats,
  createStats,
  deleteStat,
  updateStat,
};
