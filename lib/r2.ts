import { S3Client, PutObjectCommand, GetObjectCommand, ListObjectsV2Command, HeadObjectCommand } from "@aws-sdk/client-s3";

const STORAGE_LIMIT_BYTES = 10 * 1024 * 1024 * 1024; // 10GB R2 free tier
const UPLOAD_BLOCK_AT = 0.95; // Block uploads at 95% usage

export const r2 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT || "",
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
});

export const BUCKET = process.env.R2_BUCKET_NAME || "orbit-mods";

export async function getStorageUsed(): Promise<number> {
  let totalSize = 0;
  let continuationToken: string | undefined;

  do {
    const res = await r2.send(new ListObjectsV2Command({
      Bucket: BUCKET,
      ContinuationToken: continuationToken,
    }));

    if (res.Contents) {
      for (const obj of res.Contents) {
        totalSize += obj.Size || 0;
      }
    }

    continuationToken = res.NextContinuationToken;
  } while (continuationToken);

  return totalSize;
}

export async function canUpload(fileSize: number): Promise<{ allowed: boolean; used: number; limit: number; message?: string }> {
  const used = await getStorageUsed();
  const limit = STORAGE_LIMIT_BYTES;
  const blockAt = limit * UPLOAD_BLOCK_AT;

  if (used + fileSize > blockAt) {
    return {
      allowed: false,
      used,
      limit,
      message: `Storage full (${formatBytes(used)} / ${formatBytes(limit)} used). Uploads disabled until storage is upgraded.`,
    };
  }

  return { allowed: true, used, limit };
}

export async function uploadMod(key: string, data: Buffer, contentType: string = "application/octet-stream") {
  await r2.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: data,
    ContentType: contentType,
  }));
}

export async function downloadMod(key: string): Promise<Buffer> {
  const res = await r2.send(new GetObjectCommand({
    Bucket: BUCKET,
    Key: key,
  }));

  const chunks: Uint8Array[] = [];
  const stream = res.Body as AsyncIterable<Uint8Array>;
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

export async function getModSize(key: string): Promise<number> {
  const res = await r2.send(new HeadObjectCommand({
    Bucket: BUCKET,
    Key: key,
  }));
  return res.ContentLength || 0;
}

function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024 * 1024) return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
  if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  if (bytes >= 1024) return (bytes / 1024).toFixed(2) + " KB";
  return bytes + " B";
}
