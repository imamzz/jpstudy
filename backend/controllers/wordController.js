const pool = require("../db/pool");

exports.getWords = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM words ORDER BY id ASC");
    res.json({ success: true, data: result.rows });
  } catch (err) {
    next(err);
  }
};

exports.createWord = async (req, res, next) => {
  try {
    const { kanji, kana, romaji, meaning } = req.body;
    const result = await pool.query(
      "INSERT INTO words (kanji, kana, romaji, meaning) VALUES ($1, $2, $3, $4) RETURNING *",
      [kanji, kana, romaji, meaning]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

exports.updateWord = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { kanji, kana, romaji, meaning } = req.body;

    const result = await pool.query(
      "UPDATE words SET kanji=$1, kana=$2, romaji=$3, meaning=$4 WHERE id=$5 RETURNING *",
      [kanji, kana, romaji, meaning, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Word not found" });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

exports.deleteWord = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query("DELETE FROM words WHERE id=$1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Word not found" });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    next(err);
  }
};
