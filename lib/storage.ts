import { initializeApp, getApps, cert, type App } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

const STORAGE_LIMIT_BYTES = 5 * 1024 * 1024 * 1024; // 5GB Firebase free tier
const UPLOAD_BLOCK_AT = 0.95;

let firebaseApp: App | null = null;

function getApp(): App {
  if (firebaseApp) return firebaseApp;
  if (getApps().length) {
    firebaseApp = getApps()[0];
    return firebaseApp;
  }

  const raw = process.env.FIREBASE_SERVICE_ACCOUNT || "";
  if (!raw || !raw.includes("project_id")) {
    throw new Error("Firebase not configured");
  }

  const serviceAccount = JSON.parse(raw);
  firebaseApp = initializeApp({
    credential: cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "",
  });
  return firebaseApp;
}

function getBucket() {
  return getStorage(getApp()).bucket();
}

export async function getStorageUsed(): Promise<number> {
  const [files] = await getBucket().getFiles({ prefix: "mods/" });
  let total = 0;
  for (const file of files) {
    total += parseInt(file.metadata.size as string, 10) || 0;
  }
  return total;
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

export async function uploadMod(key: string, data: Buffer) {
  const file = getBucket().file(key);
  await file.save(data, {
    metadata: { contentType: "application/octet-stream" },
    resumable: false,
  });
}

export async function downloadMod(key: string): Promise<Buffer> {
  const file = getBucket().file(key);
  const [exists] = await file.exists();
  if (!exists) throw new Error("File not found");
  const [data] = await file.download();
  return data;
}

export async function getModSize(key: string): Promise<number> {
  const file = getBucket().file(key);
  const [metadata] = await file.getMetadata();
  return parseInt(metadata.size as string, 10) || 0;
}

function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024 * 1024) return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
  if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  if (bytes >= 1024) return (bytes / 1024).toFixed(2) + " KB";
  return bytes + " B";
}
