import express from "express";
import { MongoClient } from "mongodb";

const app = express();
app.use(express.json());
const client = new MongoClient(process.env.MONGO_URL);
const collection = () => client.db().collection("tasks");

app.get("/health", async (_request, response) => {
  await client.db().command({ ping: 1 });
  response.json({ status: "ok" });
});
app.get("/tasks", async (_request, response) => response.json(await collection().find().toArray()));
app.post("/tasks", async (request, response) => {
  const title = String(request.body.title ?? "").trim();
  if (!title) return response.status(400).json({ error: "title is required" });
  const task = { title, completed: false, createdAt: new Date() };
  const result = await collection().insertOne(task);
  response.status(201).json({ ...task, _id: result.insertedId });
});

await client.connect();
app.listen(3000, () => console.log("Task API listening on :3000"));
