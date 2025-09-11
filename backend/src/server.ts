import dotenv from "dotenv";
import app from "./utils/app";
import sequelize from "./config/database";

dotenv.config();

const PORT = process.env.PORT || 5000;

// sync tanpa alter, biar tidak otomatis ubah tabel seenaknya
sequelize
  .sync()
  .then(() => {
    console.log("✅ Database connected & synced (no alter/force)");
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection error:", err);
  });
