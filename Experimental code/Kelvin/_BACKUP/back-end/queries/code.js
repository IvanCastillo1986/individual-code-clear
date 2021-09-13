const db = require("../db/dbConfig");

const getAllDays = async () => {
  try {
    const allDays = await db.any("SELECT * FROM test");
    return allDays;
  } catch (err) {
    return err;
  }
};

const getDay = async (id) => {
  try {
    const oneDay = await db.one("SELECT * FROM test where id=$1", id);
    return oneDay;
  } catch (error) {
    return error;
  }
};

const createDay = async (day) => {
  try {
    const newDay = await db.one(
      "INSERT INTO test (name) VALUES ($1) RETURNING *",
      [day.name]
    );
    return newDay;
  } catch (error) {
    return error;
  }
};

const deleteDay = async (id) => {
  try {
    const deletedDay = await db.one(
      "DELETE FROM test WHERE id = $1 RETURNING *",
      id
    );
    return deletedDay;
  } catch (error) {
    return error;
  }
};

const updateDay = async (id, day) => {
  try {
    const updatedDay = await db.one(
      "UPDATE test SET name=$1 WHERE id=$2 RETURNING *",
      [day.name, id]
    );
    return updatedDay;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllDays,
  getDay,
  createDay,
  deleteDay,
  updateDay,
};
