import { Storage, File } from "megajs";

const STORAGE_LIMIT_BYTES = 20 * 1024 * 1024 * 1024; // 20GB MEGA free
const UPLOAD_BLOCK_AT = 0.95;
const MODS_FOLDER = "orbit-mods";

let storageInstance: Storage | null = null;

async function getMega(): Promise<Storage> {
  if (storageInstance && storageInstance.root) return storageInstance;

  const email = process.env.MEGA_EMAIL || "";
  const password = process.env.MEGA_PASSWORD || "";

  if (!email || !password) {
    throw new Error("MEGA not configured");
  }

  const storage = new Storage({ email, password });
  await storage.ready;
  storageInstance = storage;
  return storage;
}

async function getOrCreateModsFolder(): Promise<any> {
  const mega = await getMega();
  const root = mega.root as any;
  if (!root) throw new Error("MEGA root not available");

  const existing = root.children?.find(
    (f: any) => f.name === MODS_FOLDER && f.directory
  );
  if (existing) return existing;

  return new Promise((resolve, reject) => {
    root.mkdir(MODS_FOLDER, (err: Error | null, folder: any) => {
      if (err) reject(err);
      else resolve(folder);
    });
  });
}

function getFolderSize(folder: any): number {
  let total = 0;
  if (folder.children) {
    for (const child of folder.children) {
      if (child.directory) {
        total += getFolderSize(child);
      } else {
        total += child.size || 0;
      }
    }
  }
  return total;
}

export async function getStorageUsed(): Promise<number> {
  try {
    const folder = await getOrCreateModsFolder();
    return getFolderSize(folder);
  } catch {
    return 0;
  }
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

export async function uploadMod(key: string, data: Buffer): Promise<void> {
  const folder = await getOrCreateModsFolder();
  const filename = key.split("/").pop() || key;

  // Delete existing file with same name
  const existing = folder.children?.find((f: any) => f.name === filename);
  if (existing) {
    await new Promise<void>((resolve, reject) => {
      existing.delete((err: Error | null) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  return new Promise((resolve, reject) => {
    const upload = folder.upload({ name: filename, size: data.length }, data);
    upload.on("error", reject);
    upload.on("complete", () => resolve());
  });
}

export async function downloadMod(key: string): Promise<Buffer> {
  const folder = await getOrCreateModsFolder();
  const filename = key.split("/").pop() || key;

  const file = folder.children?.find((f: any) => f.name === filename);
  if (!file) throw new Error("File not found");

  return new Promise((resolve, reject) => {
    const stream = file.download({});
    const chunks: Buffer[] = [];
    stream.on("data", (chunk: Buffer) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
}

export async function getModSize(key: string): Promise<number> {
  const folder = await getOrCreateModsFolder();
  const filename = key.split("/").pop() || key;
  const file = folder.children?.find((f: any) => f.name === filename);
  return file?.size || 0;
}

function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024 * 1024) return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
  if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  if (bytes >= 1024) return (bytes / 1024).toFixed(2) + " KB";
  return bytes + " B";
}
