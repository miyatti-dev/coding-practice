import express from "express";
import cors from "cors";
import { v4 as uuid } from "uuid";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";
import serverless from "serverless-http"; // ← Lambda用ラッパー

// ===== Express アプリ =====
const app = express();
app.use(cors());
app.use(express.json());

const TABLE = "Items";

// 本番用：endpoint は指定しない（SDK が自動でAWSを使う）
const ddbClient = new DynamoDBClient({ region: process.env.AWS_REGION });
const ddb = DynamoDBDocumentClient.from(ddbClient);

// === Routes ===
app.get("/health", (_req, res) => res.json({ ok: true }));

app.get("/items", async (_req, res) => {
  try {
    const data = await ddb.send(new ScanCommand({ TableName: TABLE }));
    res.json(data.Items ?? []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "scan_failed" });
  }
});

app.post("/items", async (req, res) => {
  try {
    const item = { id: uuid(), name: req.body?.name ?? "no-name" };
    await ddb.send(new PutCommand({ TableName: TABLE, Item: item }));
    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "put_failed" });
  }
});

// Lambda 用ハンドラーをエクスポート
export const handler = serverless(app);
