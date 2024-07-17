import express from "express";
import { random } from "./randomGenerate";
import simpleGit from "simple-git";
const app = express();

app.post("/send-url", (req, res) => {
  const repoUrl = req.body.repoUrl;
  const id = random();
  const git = simpleGit();

  git.clone(repoUrl, `output${id}`);
  res.json({ generated: id });
});

app.listen(5500, () => {
  console.log("App is running at 5500");
});
