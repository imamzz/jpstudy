const express = require("express");
const cors = require("cors");
require("dotenv").config();


const app = express();
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const wordRoutes = require("./routes/wordRoutes");
app.use("/api/words", wordRoutes);

const questionRoutes = require("./routes/questionRoute");
app.use("/api/questions", questionRoutes);

// Default route
app.get("/", (req, res) => {
  res.json({ message: "Japanese Study API Running 🚀" });
});

// Error handler (paling akhir)
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
