import { createClient, commandOptions } from "redis";
import { copyFinalDist, downloadS3Folder } from "./aws";
import express from "express";
import { buildProject } from "./execute";

const subscriber = createClient();
subscriber.connect();

const publisher = createClient();
publisher.connect();

async function sub() {
  while (true) {
    try {
      const response = await subscriber.brPop(
        commandOptions({ isolated: true }),
        "build-queue",
        0
      );

      if (response) {
        const id = response.element[1];
        await downloadS3Folder(`output${id}`);
        await buildProject(id);
        copyFinalDist(id);
        publisher.hSet("status", id, "deployed");
      }
    } catch (error) {
      console.error("Error processing message from Redis:", error);
    }
  }
}

sub().catch((error) => {
  console.error("Error in subscription function:", error);
});
