import dotenv from "dotenv";
import app from "./utils/app";
import sequelize from "./config/database";
import { networkInterfaces } from "os";
import { AddressInfo } from "net";

dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;

// helper untuk ambil IP lokal (IPv4)
function getLocalIp(): string | null {
  const nets = networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] || []) {
      // ambil IPv4 yang bukan internal (bukan 127.0.0.1)
      if (net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }
  return null;
}

sequelize
  .sync()
  .then(() => {
    console.log("✅ Database connected & synced (no alter/force)");

    const server = app.listen(PORT, "0.0.0.0", () => {
      const addr = server.address() as AddressInfo;
      const localIp = getLocalIp();

      console.log(`✅ Server running on:`);
      console.log(`   ➜ Local:   http://localhost:${addr.port}`);
      if (localIp) {
        console.log(`   ➜ Network: http://${localIp}:${addr.port}`);
      }
    });
  })
  .catch((err) => {
    console.error("❌ Database connection error:", err);
  });
