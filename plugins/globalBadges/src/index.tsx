
import { findByName } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
// import Badges from "./Icons";
// import Settings from "./Settings";
// import { storage } from "@vendetta/plugin";

import { CustomBadges, BadgeCache } from "./types";
import badgeGroups from './badgeGroups';

const bunny = window.bunny.api.react.jsx

const cache = new Map<string, BadgeCache>();
const REFRESH_INTERVAL = 1000 * 60 * 30;

const badgeModule = findByName("useBadges", false);


let unpatch;
let cachUser;
export default {
  onLoad: () => {

    const badgeProps = {} as Record<string, import("./types").BadgeProps>;

    bunny.onJsxCreate("ProfileBadge", (component, ret) => {
      if (ret.props.id?.startsWith("gb-")) {
        const badgePropsCache = badgeProps[ret.props.id];
        if (badgePropsCache) {
          ret.props.source = badgePropsCache.source;
          ret.props.label = badgePropsCache.label;
          ret.props.id = badgePropsCache.id;
        }
      }
    })

    bunny.onJsxCreate("RenderBadge", (component, ret) => {
      if (ret.props.id?.startsWith("gb-")) {
        const badgePropsCache = badgeProps[ret.props.id];
        if (badgePropsCache) {
          Object.assign(ret.props, badgePropsCache);
        }
      }
    })

    unpatch = after("default", badgeModule, ([user], result) => {
      if (user === null) return;
      cachUser = cache.get(user.userId);

      if (cachUser === undefined) {
        fetchbadges(user.userId)
        return;
      }

      const pushBadges = (badge) => {
        result.push(badge);
      };

      Object.entries(cachUser?.badges).forEach(([key, value]): any => {
        badgeGroups[key]?.(value, user).forEach(({ type, label, uri }) => {
          console.log(`Adding badge: ${label}`);
          const badgeId = `gb-${key}-${type}`;
          badgeProps[badgeId] = {
            id: badgeId,
            source: { uri },
            label,
            userId: user.userId,
          };
          pushBadges({
            id: badgeId,
            description: label,
            icon: "dummy",
          });
        });

      })
    });

  },
  onUnload: () => {
    unpatch?.();
  },
  //settings: Settings
};



async function fetchbadges(userId: string) {
  if (
    !cache.has(userId) ||
    cache.get(userId)!.lastFetch + REFRESH_INTERVAL < Date.now()
  ) {

    const res = await fetch(
      `https://api.obamabot.me/v2/text/badges?user=${userId}`
    );
    const body = (await res.json()) as CustomBadges;
    const result: BadgeCache =
      res.status === 200 || res.status === 404
        ? { badges: body || {}, lastFetch: Date.now() }
        : (cache.delete(userId), { badges: body, lastFetch: Date.now() });

    cache.set(userId, result);

  }

  return cache.get(userId)!.badges;
}