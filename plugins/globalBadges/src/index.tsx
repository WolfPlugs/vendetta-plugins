import { findByName } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import Settings from "./Settings";
import { storage } from "@vendetta/plugin";
import { GlobalBadges, loadBadges } from "./utils";
import { BadgeProps } from "./types";

const bunny = (window as any).bunny.api.react.jsx;
const REFRESH_INTERVAL = 1000 * 60 * 30;
const badgeModule = findByName("useBadges", false);

let unpatch;
let intervalId;
export default {
  onLoad: async () => {
    storage.left ??= false;
    storage.showModStyle ??= "none";
    storage.showAero ??= true;
    storage.showAliucord ??= true;
    storage.showCustom ??= true;
    storage.showBetterDiscord ??= true;
    storage.showBunny ??= true;
    storage.showEnmity ??= true;
    storage.showEquicord ??= true;
    storage.showGooseMod ??= true;
    storage.showNekocord ??= true;
    storage.showPaicord ??= true;
    storage.showReCord ??= true;
    storage.showReplugged ??= true;
    storage.showRevenge ??= true;
    storage.showReviewDB ??= true;
    storage.showVelocity ??= true;
    storage.showVencord ??= true;
    storage.showVendroidEnhanced ??= true;

    await loadBadges();
    intervalId = setInterval(loadBadges, REFRESH_INTERVAL);

    const badgeProps = {} as Record<string, BadgeProps>;

    bunny.onJsxCreate("ProfileBadge", (component: any, ret: any) => {
      if (ret.props.id?.startsWith("gb-")) {
        const badgePropsCache = badgeProps[ret.props.id];
        if (badgePropsCache) {
          ret.props.source = badgePropsCache.source;
          ret.props.label = badgePropsCache.label;
          ret.props.id = badgePropsCache.id;
        }
      }
    });

    bunny.onJsxCreate("RenderBadge", (component: any, ret: any) => {
      if (ret.props.id?.startsWith("gb-")) {
        const badgePropsCache = badgeProps[ret.props.id];
        if (badgePropsCache) {
          Object.assign(ret.props, badgePropsCache);
        }
      }
    });

    unpatch = after("default", badgeModule, ([user], result) => {
      if (user === null) return;

      const userBadges = GlobalBadges[user.userId];
      if (!userBadges) return;

      const pushBadges = (badge: any) => {
        if (storage.left) {
          result.unshift(badge);
        } else {
          result.push(badge);
        }
      };

      userBadges.forEach((badge, idx) => {
        const badgeId = `gb-${badge.mod}-${idx}`;
        badgeProps[badgeId] = {
          id: badgeId,
          source: { uri: badge.badge },
          label: badge.tooltip,
          userId: user.userId,
        };
        pushBadges({
          id: badgeId,
          description: badge.tooltip,
          icon: "dummy",
        });
      });
    });
  },
  onUnload: () => {
    unpatch?.();
    clearInterval(intervalId);
  },
  settings: Settings
};