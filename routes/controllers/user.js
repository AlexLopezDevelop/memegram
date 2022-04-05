const mysql = require("mysql2");

//const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_URL = "mysql://1894v9ezl9vj:pscale_pw_pLVpzg34Z8RdMg1hqfQ2zs1XrKHWXweFg59oitLxelQ@0qucho5k5a9k.us-east-1.psdb.cloud/memegram?ssl={\"rejectUnauthorized\":true}"
const getAllUsers = async (req, res) => {
  try {
    const connection = mysql.createConnection(DATABASE_URL);
    // simple query
    connection.query(
      "SELECT id, nombre FROM `user`",
      [],
      function (err, results, fields) {

        if (err) return res.json({ error: err });
        if (results.length === 0) return res.json({ mensaje: "error", data: "no hay usuarios" })

        res.json({
          mensaje: "success",
          data: results
        })
      }
    );

    connection.end();
  } catch (e) {
    console.log(e);
    res.json({
      mensaje: "error",
      data: e
    })
  }
}

const getUserById = async (req, res) => {

  try {
    let { id } = req.query;

    const connection = mysql.createConnection(DATABASE_URL);
    // simple query
    connection.query(
      "SELECT id, nombre FROM `user` WHERE id = ?",
      [id],
      function (err, results, fields) {

        if (err) return res.json({ error: err });
        if (results.length === 0) return res.json({ mensaje: "error", data: "no hay usuarios" })

        res.json({
          mensaje: "success",
          data: results
        })
      }
    );

    connection.end();
  } catch (e) {
    console.log(e);
    res.json({
      mensaje: "error",
      data: e
    })
  }
}

const addUser = async (req, res) => {

  try {
    let { nombre, password } = req.query;

    const connection = mysql.createConnection(DATABASE_URL);

    connection.query(
      "INSERT INTO `user` ( nombre, password) VALUES (?, ?)",
      [nombre, password],
      function (err, results, fields) {

        if (err) return res.json({ error: err });
        if (results.length === 0) return res.json({ mensaje: "error", data: "no se ha podido añadir comentarios" })

        res.json({
          mensaje: "success",
          data: results
        })
      }
    );

    connection.end();

  } catch (e) {
    console.log(e);
    res.json({
      mensaje: "error",
      data: e
    })
  }
}

const editUser = async (req, res) => {

  try {
    let { id, nombre, password } = req.query;

    const connection = mysql.createConnection(DATABASE_URL);

    connection.query(
      "UPDATE `user` SET nombre = ?, password = ? WHERE id = ?",
      [nombre, password, id],
      function (err, results, fields) {

        if (err) return res.json({ error: err });
        if (results.length === 0) return res.json({ mensaje: "error", data: "no hay usuarios" })

        res.json({
          mensaje: "success",
          data: results
        })
      }
    );

    connection.end();

  } catch (e) {
    console.log(e);
    res.json({
      mensaje: "error",
      data: e
    })
  }
}

const deleteUser = async (req, res) => {
  try {
    let { id } = req.query;

    const connection = mysql.createConnection(DATABASE_URL);

    connection.query(
      "DELETE FROM `user` WHERE id = ?;",
      [id],
      function (err, results, fields) {

        if (err) return res.json({ error: err });
        if (results.length === 0) return res.json({ mensaje: "error", data: "no hay usuarios" })

        res.json({
          mensaje: "success",
          data: results
        })
      }
    );

    connection.end();

  } catch (e) {
    console.log(e);
    res.json({
      mensaje: "error",
      data: e
    })
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  editUser,
  deleteUser
}
