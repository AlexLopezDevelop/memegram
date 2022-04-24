const mysql = require("mysql2");
require('dotenv').config()

const getAllPosts = async (req, res) => {
  try {
    const connection = mysql.createConnection(process.env.DATABASE_URL);
    // simple query
    connection.query(
      "SELECT id, idUser, UIDimagen FROM `post`",
      [],
      function (err, results, fields) {

        if (err) return res.json({ error: err });
        if (results.length === 0) return res.json({ mensaje: "error", data: "no hay posts" });

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

const getAllUserPosts = async (req, res) => {
  let { idUser } = req.query;

  try {
    const connection = mysql.createConnection(process.env.DATABASE_URL);
    // simple query
    connection.query(
      "SELECT id, idUser, UIDimagen FROM `post` WHERE idUser = ?",
      [idUser],
      function (err, results, fields) {

        if (err) return res.json({ error: err });
        if (results.length === 0) return res.json({ mensaje: "error", data: "no hay posts" });

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

const getPostById = async (req, res) => {
  let { id } = req.query;

  try {
    const connection = mysql.createConnection(process.env.DATABASE_URL);
    // simple query
    connection.query(
      "SELECT id, idUser, UIDimagen FROM `post` WHERE id = ?",
      [id],
      function (err, results, fields) {

        if (err) return res.json({ error: err });
        if (results.length === 0) return res.json({ mensaje: "error", data: "no hay posts" });

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

const getTotalUserPosts = async (req, res) => {
  let { idUser } = req.query;

  try {
    const connection = mysql.createConnection(process.env.DATABASE_URL);
    // simple query
    connection.query(
      "SELECT COUNT(*) FROM post WHERE idUser = ?",
      [idUser],
      function (err, results, fields) {

        if (err) return res.json({ error: err });
        if (results.length === 0) return res.json({ mensaje: "error", data: "no hay posts" });

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

const addPost = async (req, res) => {

  try {
    let { idUser, UIDimagen } = req.query;

    const connection = mysql.createConnection(process.env.DATABASE_URL);

    connection.query(
      "INSERT INTO `post` (idUser, UIDimagen) VALUES (?, ?)",
      [idUser, UIDimagen],
      function (err, results, fields) {

        if (err) return res.json({ error: err });
        if (results.length === 0) return res.json({ mensaje: "error", data: "no se ha podido añadir el post" })

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

const editPost = async (req, res) => {

  try {
    let { id, idUser, UIDimagen } = req.query;
    let { USER_ID } = req;

    if (idUser !== USER_ID.toString()) return res.json({
      mensaje: "error",
      data: "solo el propieratio puede editar"
    })


    const connection = mysql.createConnection(process.env.DATABASE_URL);

    connection.query(
      "UPDATE `post` SET UIDimagen = ? WHERE id = ?",
      [UIDimagen, id],
      function (err, results, fields) {

        if (err) return res.json({ error: err });
        if (results.length === 0) return res.json({ mensaje: "error", data: "no hay post" })

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

const deletePost = async (req, res) => {
  try {
    let { id, idUser } = req.query;
    let { USER_ID } = req;

    if (idUser !== USER_ID.toString()) return res.json({
      mensaje: "error",
      data: "solo el propieratio puede elminar"
    })

    const connection = mysql.createConnection(process.env.DATABASE_URL);

    connection.query(
      "DELETE FROM `post` WHERE id = ?;",
      [id],
      function (err, results, fields) {

        if (err) return res.json({ error: err });
        if (results.length === 0) return res.json({ mensaje: "error", data: "no hay posts" })

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
  getAllPosts,
  getAllUserPosts,
  getPostById,
  getTotalUserPosts,
  addPost,
  editPost,
  deletePost
}
