import { S3 } from "aws-sdk";
import fs from "fs";

const s3 = new S3({
  accessKeyId: "7ea9c3f8c7f0f26f0d21c5ce99d1ad6a",
  secretAccessKey:
    "b4df203781dd711223ce931a2d7ca269cdbf81bb530de4548474584951b798be",
  endpoint: "https://e21220f4758c0870ba9c388712d42ef2.r2.cloudflarestorage.com",
});

export function upload(file: string, fileName: string) {
  const fileContent = fs.readFileSync(file);
  const response = s3
    .upload({
      Body: file,
      Bucket: "vercel",
      Key: fileName,
    })
    .promise();
  console.log(response);
}
