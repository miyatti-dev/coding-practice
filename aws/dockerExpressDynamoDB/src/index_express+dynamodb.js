import express from "express";
import cors from "cors";
import { v4 as uuid } from "uuid";
import {
  DynamoDBClient,
  CreateTableCommand,
  DescribeTableCommand,
} from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: ["http://localhost:5173", "http://localhost:3000"] }));
app.use(express.json());

// ===== DynamoDB Client =====
const REGION = process.env.AWS_REGION || "ap-northeast-1";
const ENDPOINT = process.env.DDB_ENDPOINT; // docker内では http://dynamodb:8000

const ddbClient = new DynamoDBClient({
  region: REGION,
  endpoint: ENDPOINT, // 本番AWSなら undefined にする
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "dummy",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "dummy",
  },
});
const ddb = DynamoDBDocumentClient.from(ddbClient);

// テーブル定義（最小）
const TABLE = "Items";
async function ensureTable() {
  try {
    await ddbClient.send(new DescribeTableCommand({ TableName: TABLE }));
    return; // 既にある
  } catch {
    // 作成
    await ddbClient.send(
      new CreateTableCommand({
        TableName: TABLE,
        AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
        KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
        BillingMode: "PAY_PER_REQUEST",
      })
    );
    // ACTIVE になるまで軽くポーリング（簡易版）
    let ok = false;
    for (let i = 0; i < 20; i++) {
      await new Promise((r) => setTimeout(r, 500));
      try {
        const d = await ddbClient.send(
          new DescribeTableCommand({ TableName: TABLE })
        );
        if (d.Table?.TableStatus === "ACTIVE") {
          ok = true;
          break;
        }
      } catch {}
    }
    if (!ok) console.warn("Table not ACTIVE yet, but continuing…");
  }
}

// ===== Routes =====
app.get("/health", (_req, res) => res.json({ ok: true }));

app.get("/items", async (_req, res) => {
  try {
    const data = await ddb.send(new ScanCommand({ TableName: TABLE }));
    res.json(data.Items ?? []);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "scan_failed" });
  }
});

app.post("/items", async (req, res) => {
  try {
    const id = uuid();
    const item = { id, name: req.body?.name ?? "no-name" };
    await ddb.send(new PutCommand({ TableName: TABLE, Item: item }));
    res.status(201).json(item);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "put_failed" });
  }
});

async function waitForDynamoDB() {
  for (let i = 0; i < 10; i++) {
    // 最大10回
    try {
      await ddbClient.send(new DescribeTableCommand({ TableName: TABLE }));
      console.log("DynamoDB 接続OK");
      return;
    } catch (err) {
      if (err.name === "ResourceNotFoundException") {
        console.log("テーブル未作成 → 作成を実行");
        return;
      }
      console.log(`DynamoDB 起動待機中... (${i + 1})`);
      await new Promise((r) => setTimeout(r, 2000)); // 2秒待つ
    }
  }
  throw new Error("DynamoDBに接続できませんでした");
}

// 起動
app.listen(PORT, "0.0.0.0", async () => {
  console.log(`API http://0.0.0.0:${PORT}`);
  try {
    await waitForDynamoDB();
    await ensureTable();
    console.log(`DynamoDB table ready: ${TABLE}`);
  } catch (e) {
    console.error("ensureTable error:", e);
  }
});
