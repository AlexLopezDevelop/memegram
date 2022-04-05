const mysql = require("mysql2");

const DATABASE_URL = "mysql://1894v9ezl9vj:pscale_pw_pLVpzg34Z8RdMg1hqfQ2zs1XrKHWXweFg59oitLxelQ@0qucho5k5a9k.us-east-1.psdb.cloud/memegram?ssl={\"rejectUnauthorized\":true}"

const getTotalUserComments = async (req, res) => {
  let { idUser } = req.query;

  try {
    const connection = mysql.createConnection(DATABASE_URL);
    // simple query
    connection.query(
      "SELECT COUNT(*) FROM comment WHERE idUser = ?",
      [idUser],
      function (err, results, fields) {

        if (err) return res.json({ error: err });
        if (results.length === 0) return res.json({ mensaje: "error", data: "no hay comentarios" });

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

const addComment = async (req, res) => {

  try {
    let { idUser, idPost, idComment, contenido } = req.query;

    const connection = mysql.createConnection(DATABASE_URL);

    connection.query(
      "INSERT INTO `comment` (idUser, idPost, idComent, contenido) VALUES (?, ?, ?, ?)",
      [idUser, idPost, idComment, contenido],
      function (err, results, fields) {

        if (err) return res.json({ error: err });
        if (results.length === 0) return res.json({ mensaje: "error", data: "no se ha podido añadir el comentario" })

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

const editComment = async (req, res) => {

  try {
    let { id, contenido } = req.query;

    const connection = mysql.createConnection(DATABASE_URL);

    connection.query(
      "UPDATE `comment` SET contenido = ? WHERE id = ?",
      [contenido, id],
      function (err, results, fields) {

        if (err) return res.json({ error: err });
        if (results.length === 0) return res.json({ mensaje: "error", data: "no hay comentario" })

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

const deleteComment = async (req, res) => {
  try {
    let { id } = req.query;

    const connection = mysql.createConnection(DATABASE_URL);

    connection.query(
      "DELETE FROM `comment` WHERE id = ?;",
      [id],
      function (err, results, fields) {

        if (err) return res.json({ error: err });
        if (results.length === 0) return res.json({ mensaje: "error", data: "no hay comentarios" })

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

const getAllCommentsByPost = async (req, res) => {
  try {
    let { idPost } = req.query;

    const connection = mysql.createConnection(DATABASE_URL);

    connection.query(
      "SELECT contenido FROM `comment` WHERE idPost = ?",
      [idPost],
      function (err, results, fields) {

        if (err) return res.json({ error: err });
        if (results.length === 0) return res.json({ mensaje: "error", data: "no hay comentarios" })

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

const getTotalCommentsPost = async (req, res) => {
  let { idPost } = req.query;

  try {
    const connection = mysql.createConnection(DATABASE_URL);
    // simple query
    connection.query(
      "SELECT COUNT(contenido) FROM comment WHERE idPost = ?",
      [idPost],
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

module.exports = {
  getTotalUserComments,
  addComment,
  editComment,
  deleteComment,
  getAllCommentsByPost,
  getTotalCommentsPost
}
