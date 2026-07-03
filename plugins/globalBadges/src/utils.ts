import { storage } from "@vendetta/plugin";
import { Badge } from "./types";

export let GlobalBadges: Record<string, Badge[]> = {};

export const serviceMap: Record<string, string> = {
    badgevault: "BadgeVault",
    nekocord: "Nekocord",
    reviewdb: "ReviewDB",
    aero: "Aero",
    aliucord: "Aliucord",
    raincord: "Raincord",
    velocity: "Velocity",
    enmity: "Enmity",
    paicord: "Paicord",
    bunny: "Bunny",
    goosemod: "GooseMod",
    replugged: "Replugged",
    betterdiscord: "BetterDiscord",
    vendroidenhanced: "VendroidEnhanced",
    revenge: "Revenge",
    record: "ReCord",
    vencord: "Vencord",
    equicord: "Equicord"
};

const blockedMods = ["raincord"];

export async function loadBadges() {
    const url = "https://badges.equicord.org/users";

    try {
        const response = await fetch(url, { cache: "no-cache" });
        const globalBadges = await response.json();
        const filteredUsers: Record<string, Badge[]> = {};

        for (const key in globalBadges.users) {
            filteredUsers[key] = globalBadges.users[key].filter((b: any) => {
                const { mod } = b;
                if (!mod) return false;
                if (blockedMods.includes(mod)) return false;

                const conditionalMods = {
                    aero: storage.showAero ?? true,
                    velocity: storage.showVelocity ?? true,
                    badgevault: storage.showCustom ?? true,
                    nekocord: storage.showNekocord ?? true,
                    reviewdb: storage.showReviewDB ?? true,
                    aliucord: storage.showAliucord ?? true,
                    enmity: storage.showEnmity ?? true,
                    paicord: storage.showPaicord ?? true,
                    vencord: storage.showVencord ?? true,
                    equicord: storage.showEquicord ?? true,
                    bunny: storage.showBunny ?? true,
                    goosemod: storage.showGooseMod ?? true,
                    replugged: storage.showReplugged ?? true,
                    betterdiscord: storage.showBetterDiscord ?? true,
                    vendroidenhanced: storage.showVendroidEnhanced ?? true,
                    revenge: storage.showRevenge ?? true,
                    record: storage.showReCord ?? true
                };

                if (mod in conditionalMods && !conditionalMods[mod as keyof typeof conditionalMods]) return false;

                return true;
            }).map((b: any) => {
                const modFormatted = serviceMap[b.mod] || b.mod;
                const showPrefix = storage.showPrefix ?? true;
                const showSuffix = storage.showSuffix ?? false;

                const prefix = showPrefix ? `${modFormatted} - ` : "";
                const suffix = showSuffix ? ` - ${modFormatted}` : "";
                const tooltip = prefix + b.tooltip + suffix;
                return {
                    ...b,
                    key: b.tooltip,
                    tooltip
                };
            });

            if (filteredUsers[key].length === 0) {
                delete filteredUsers[key];
            }
        }

        GlobalBadges = filteredUsers;
    } catch (e) {
        console.error("Failed to load global badges", e);
    }
}
