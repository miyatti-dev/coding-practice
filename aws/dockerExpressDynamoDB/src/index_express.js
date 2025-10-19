import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

// CORS 設定
app.use(cors({
  origin: "http://localhost:5173",  // React開発サーバのURL
  credentials: true                 // Cookieを使う場合
}));

app.get("/", (_req, res) => {
  res.send("Hello from Docker + Express!");
});

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
