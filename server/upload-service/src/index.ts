import express from "express";
import { random } from "./randomGenerate";
import simpleGit from "simple-git";
import { getAllFiles } from "./getAllfiles";
import path from "path";
import { upload } from "./upload";
import { createClient } from "redis";

const app = express();
app.use(express.json());
const publisher = createClient();
publisher.connect();

const subscriber = createClient();
publisher.connect();

app.post("/send-url", async (req, res) => {
  const repoUrl = req.body.repoUrl;
  const id = random();
  const git = simpleGit();
  const outputPath = path.join(__dirname, `output/${id}`);
  await git.clone(repoUrl, outputPath);
  const files = getAllFiles(outputPath);
  files.forEach(async (element) => {
    await upload(element, element.slice(__dirname.length + 1));
  });
  await new Promise((resolve) => setTimeout(resolve, 5000));
  publisher.lPush("build-queue", id);
  publisher.hSet("status", id, "uploaded");
  res.json({ generated: id, files });
});

app.get("/status", async (req, res) => {
  const id = req.query.id;
  const response = await subscriber.hGet("status", id as string);
  res.json({
    status: response,
  });
});

app.listen(5500, () => {
  console.log("App is running at 5500");
});
