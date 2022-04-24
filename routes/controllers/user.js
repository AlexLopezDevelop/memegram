const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config()

const loginUser = async (req, res) => {
  try {
    const { nombre, password } = req.query;

    // simulamos un SELECT * FROM users WHERE email = email a la base de datos:
    //const user = users.find(u => u.email === email)

    const connection = mysql.createConnection(process.env.DATABASE_URL);
    // simple query
    connection.query(
      "SELECT id, nombre, password FROM `user` WHERE nombre = ?",
      [nombre],
      function (err, results, fields) {

        if (err) return res.json({ error: err });
        if (results.length === 0) return res.json({ mensaje: "error", data: "user not found" })

        const user = results[0];
        console.log(user)

        // si la contraseña no es correcta, lanzamos un error al middleware de errores
        if (!bcrypt.compareSync(password, user.password)) return res.json({
          mensaje: "error",
          data: "password not match"
        })

        // todo ok!

        const token = jwt.sign({ id: user.id, nombre: user.nombre }, process.env.JWT_KEY);  // creamos el token con el payload y la clave secreta

        res.json({
          mensaje: "success",
          data: { accessToken: token }
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

const getAllUsers = async (req, res) => {
  try {
    const connection = mysql.createConnection(process.env.DATABASE_URL);
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

    const connection = mysql.createConnection(process.env.DATABASE_URL);
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

    const connection = mysql.createConnection(process.env.DATABASE_URL);

    const saltRounds = 10;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    connection.query(
      "INSERT INTO `user` ( nombre, password) VALUES (?, ?)",
      [nombre, hash],
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
    let { USER_ID } = req;

    if (id !== USER_ID.toString()) return res.json({
      mensaje: "error",
      data: "solo el propieratio puede editar"
    })

    const saltRounds = 10;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const connection = mysql.createConnection(process.env.DATABASE_URL);

    connection.query(
      "UPDATE `user` SET nombre = ?, password = ? WHERE id = ?",
      [nombre, hash, id],
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
    let { USER_ID } = req;

    if (id !== USER_ID.toString()) return res.json({
      mensaje: "error",
      data: "solo el propieratio puede eliminar"
    })


    const connection = mysql.createConnection(process.env.DATABASE_URL);

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
  loginUser,
  getAllUsers,
  getUserById,
  addUser,
  editUser,
  deleteUser
}
