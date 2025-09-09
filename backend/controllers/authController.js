// controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db/pool");

// REGISTER
exports.register = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;

    const checkUser = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (checkUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email sudah digunakan",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO users (username, email, password, role) VALUES ($1,$2,$3,$4) RETURNING id, username, email, role",
      [username, email, hashedPassword, role || "user"]
    );

    return res.status(201).json({
      success: true,
      message: "User berhasil didaftarkan",
      data: newUser.rows[0],
    });
  } catch (err) {
    next(err); // kirim error ke middleware
  }
};


// LOGIN
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (user.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }

    const validPass = await bcrypt.compare(password, user.rows[0].password);
    if (!validPass) {
      return res.status(400).json({
        success: false,
        message: "Password salah",
      });
    }

    const token = jwt.sign(
      { id: user.rows[0].id, email: user.rows[0].email, role: user.rows[0].role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    return res.json({
      success: true,
      message: "Login berhasil",
      token,
      role: user.rows[0].role,
    });
  } catch (err) {
    next(err);
  }
};
