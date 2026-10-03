import { registerCommand } from "@vendetta/commands";
import { findByStoreName, findByProps } from "@vendetta/metro";
import { ReactNative } from "@vendetta/metro/common";
import { logger } from "@vendetta";

// Petpet API and attachment implementation adapted from cocobo1's Rain code:
// https://codeberg.org/raincord/rain/src/commit/201aa14385c361e8bcaaeb8d34dc351c89e71596/src/plugins/petpet/index.ts

const UserStore = findByStoreName("UserStore");
let unregister: (() => void) | undefined;

interface NativeFileManager {
  writeFile(directory: "cache", path: string, data: string, encoding: "base64"): Promise<string>;
  removeFile(directory: "cache", path: string): Promise<unknown>;
}

function isFileManager(module: unknown): module is NativeFileManager {
  return typeof module === "object" && module !== null &&
    "writeFile" in module && typeof module.writeFile === "function" &&
    "removeFile" in module && typeof module.removeFile === "function";
}

function getFileManager(): NativeFileManager {
  const turboProxy = Reflect.get(globalThis, "__turboModuleProxy");
  const nativeProxy = Reflect.get(globalThis, "nativeModuleProxy");
  for (const name of ["NativeFileModule", "RTNFileManager", "DCDFileManager"]) {
    // An unavailable TurboModule may throw instead of returning null.
    if (typeof turboProxy === "function") {
      try {
        const module: unknown = turboProxy(name);
        if (isFileManager(module)) return module;
      } catch {}
    }
    if (nativeProxy && typeof nativeProxy === "object") {
      const module: unknown = Reflect.get(nativeProxy, name);
      if (isFileManager(module)) return module;
    }
    const module: unknown = ReactNative.NativeModules[name];
    if (isFileManager(module)) return module;
  }
  throw new Error("No supported Discord file module was found.");
}

function getApiBase(): string {
  const api = findByProps("getAPIBaseURL", "del");
  let base = api?.getAPIBaseURL?.();
  if (typeof base === "string") {
    if (base.startsWith("//")) base = `https:${base}`;
    if (base.startsWith("https://") && base.includes("/api/")) {
      return base.replace(/\/$/, "");
    }
  }
  return "https://discord.com/api/v9";
}

async function fetchPetPetBase64(avatarUrl: string): Promise<string> {
  const response = await fetch(
    `https://api.popcat.xyz/pet?image=${encodeURIComponent(avatarUrl)}`
  );
  if (!response.ok) {
    throw new Error(`Failed to generate petpet GIF: ${response.status}`);
  }

  const bytes = new Uint8Array(await response.arrayBuffer());
  const signature = String.fromCharCode(...bytes.subarray(0, 6));
  if (signature !== "GIF89a" && signature !== "GIF87a") {
    throw new Error("The petpet API did not return a GIF.");
  }
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

async function sendPetPetAttachment(channelId: string, base64Data: string): Promise<void> {
  const files = getFileManager();
  const token = findByProps("getToken")?.getToken?.();
  if (!token) throw new Error("Unable to resolve authorization token.");

  const tempPath = `vendetta/petpet/${Date.now()}-${Math.random().toString(16).slice(2)}.gif`;
  const filePath = await files.writeFile("cache", tempPath, base64Data, "base64");
  try {
    if (typeof filePath !== "string" || !filePath) {
      throw new Error("Unable to save the petpet GIF.");
    }
    const uri = filePath.startsWith("file://") ? filePath : `file://${filePath}`;
    const form = new FormData();
    form.append("payload_json", JSON.stringify({
      content: "",
      channel_id: channelId,
      type: 0,
      attachments: [{ id: "0", filename: "petpet.gif" }],
      nonce: Date.now().toString(),
    }));

    form.append("files[0]", { uri, type: "image/gif", name: "petpet.gif" });

    const response = await fetch(`${getApiBase()}/channels/${channelId}/messages`, {
      method: "POST",
      headers: { Authorization: token },
      body: form,
    });
    if (!response.ok) {
      throw new Error(`Failed to send petpet attachment: ${response.status}`);
    }
  } finally {
    try {
      await files.removeFile("cache", tempPath);
    } catch (error) {
      logger.error("[PetPet] Failed to remove temporary GIF:", error);
    }
  }
}

export default {
  onLoad: () => {
    unregister = registerCommand({
      name: "petpet",
      displayName: "petpet",
      displayDescription: "PetPet someone",
      description: "PetPet someone",
      options: [{
        name: "user",
        description: "The user (or their id) to be patted",
        type: 6,
        required: true,
        displayName: "user",
        displayDescription: "The user (or their id) to be patted",
      }],
      execute: async (args, ctx) => {
        const user = await UserStore.getUser(args[0].value);
        if (!user) throw new Error("Unable to find the selected user.");
        const channelId = ctx.channel.id ?? ctx.channel.channel_id;
        if (!channelId) throw new Error("Unable to resolve the current channel.");
        const avatarUrl = user.getAvatarURL(128).replace(/\.webp(?=\?|$)/, ".png");
        const base64Gif = await fetchPetPetBase64(avatarUrl);
        await sendPetPetAttachment(channelId, base64Gif);
      },
      applicationId: "-1",
      inputType: 1,
      type: 1,
    });
  },
  onUnload: () => {
    unregister?.();
    unregister = undefined;
  },
};
