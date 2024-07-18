import { exec } from "child_process";
import path from "path";

export function buildProject(id: string) {
  return new Promise((resolve) => {
    const child = exec(
      `cd ${path.join(__dirname, `output/${id}`)} && npm i && npm run build`
    );

    child.on("close", function (code) {
      resolve("");
    });
  });
}
