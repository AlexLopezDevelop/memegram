const mysql = require("mysql2");

//const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_URL = "mysql://1894v9ezl9vj:pscale_pw_pLVpzg34Z8RdMg1hqfQ2zs1XrKHWXweFg59oitLxelQ@0qucho5k5a9k.us-east-1.psdb.cloud/memegram?ssl={\"rejectUnauthorized\":true}"

const getAllPosts = async (req, res) => {
  try {
    const connection = mysql.createConnection(DATABASE_URL);
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
    const connection = mysql.createConnection(DATABASE_URL);
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
    const connection = mysql.createConnection(DATABASE_URL);
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
    const connection = mysql.createConnection(DATABASE_URL);
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

    const connection = mysql.createConnection(DATABASE_URL);

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
    let { id, UIDimagen } = req.query;

    const connection = mysql.createConnection(DATABASE_URL);

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
    let { id } = req.query;

    const connection = mysql.createConnection(DATABASE_URL);

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
