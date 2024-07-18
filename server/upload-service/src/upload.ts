import { S3 } from "aws-sdk";
import fs from "fs";

const s3 = new S3({
  accessKeyId: process.env.ACCESSID,
  secretAccessKey: process.env.ACCESSKEY,
  endpoint: process.env.ENDPOINT,
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
