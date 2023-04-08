import { findByProps } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { ReactNative as RN, stylesheet, toasts, React } from "@vendetta/metro/common";

import Badges from "./Icons";
import Settings from "./Settings";
import { storage } from "@vendetta/plugin";

import { BadgeProps, CustomBadges } from "./types";
import { BadgeComponent } from "./badgeComponent";
const { View, TouchableOpacity, Image } = RN



type BadgeCache = {
  badges: CustomBadges;
  lastFetch: number;
};

type ConditionComponentPair = {
  condition: boolean | undefined | string | object;
  component: any;
};

const cache = new Map<string, BadgeCache>();
const REFRESH_INTERVAL = 1000 * 60 * 30;

const profileBadges = findByProps("ProfileBadgesOld");
// const RowManager = findByName("RowManager")

let unpatch;
let rowPatches;
let cachUser;
export default {
  onLoad: () => {


    after("default", profileBadges, (args, res) => {
      if (!res) return;
      unpatch = after("type", res,  (args, res) => {
        console.log(res)
        if(!res) return;
        if(!res.props) return;
      const [, updateForce] = React.useReducer(x => x = !x, false);

      const user = args[0]?.user;
      if (user === undefined) return;

      cachUser = cache.get(user.id);
      if (cachUser === undefined) {
        fetchbadges(user.id, updateForce);
        return;
      }

      const style = res.props.style
      const { replugged } = cachUser?.badges;
      const colors = `#${replugged?.custom?.color || '7289da'}`

      const pushBadge = ({ name, image, custom = false }: BadgeProps) => {
        const RenderableBadge = () => <BadgeComponent
          custom={custom}
          name={name}
          image={image}
          size={Array.isArray(style) ? style?.find(r => r.paddingVertical && r.paddingHorizontal) ? 16 : 22 : 16}
          margin={Array.isArray(style) ? 4 : 6}
        />;
        const pushOrUnpush = storage.left;
        if (res.props.badges) pushOrUnpush ? res.props.badges.unshit(<RenderableBadge />) : res.props.badges.push(<RenderableBadge />);
        else pushOrUnpush ? res.props.children.unshit(<RenderableBadge />) : res.props.children.push(<RenderableBadge />);
      };

      Object.entries(cachUser?.badges).forEach(([key, value]): any => {
        switch (key) {
          case "customBadgesArray":
            if (value) {
              pushBadge({
                name: value.name,
                image: value.badge,
              });
            }
            break;
          case "aliu":
            if (value?.dev) {
              pushBadge({
                name: "Aliucord Dev",
                image: "https://cdn.discordapp.com/emojis/860165259117199401.webp",
              });
            }
            if(value?.donor) {
              pushBadge({
                name: "Aliucord Donor",
                image: "https://cdn.discordapp.com/emojis/859801776232202280.webp",
              });
            }
            if(value?.contributor) {
              pushBadge({
                name: "Aliucord Contributor",
                image: "https://cdn.discordapp.com/emojis/886587553187246120.webp",
              });
            }
            break;
          case "bd":
            if (value?.dev) {
              pushBadge({
                name: "BD Dev",
                image: "",
                custom: <Badges.bdDevs />
              });
            }
            break;
          case "enmity":
            if (value?.supporter?.data) {
              pushBadge({
                name: "Enmity Supporter",
                image: value?.supporter?.data.url.dark,

              });
            }
            if (value?.staff?.data) {
              pushBadge({
                name: "Enmity Staff",
                image: value?.staff?.data.url.dark,
              });
            }
            if (value?.dev?.data) {
              pushBadge({
                name: "Enmity Dev",
                image: value?.dev?.data.url.dark,
              });
            }
            if (value?.contributor?.data) {
              pushBadge({
                name: "Enmity Contributor",
                image: value?.contributor?.data.url.dark,
              });
            }
            if (value[user.id]?.data) {
              pushBadge({
                name: "Enmity User",
                image: value[user.id]?.data.url.dark,
              });
            }
            break;
          case "goosemod":
            if (value?.sponsor) {
              pushBadge({
                name: "GooseMod Sponsor",
                image: "https://goosemod.com/img/goose_globe.png",
              });
            }
            if (value?.dev) {
              pushBadge({
                name: "GooseMod Dev",
                image: "https://goosemod.com/img/goose_glitch.jpg",
              });
            }
            if (value?.translator) {
              pushBadge({
                name: "GooseMod Translator",
                image: "https://goosemod.com/img/goose_globe.png",
              });
            }
            break;
          case "replugged":
            if (value?.developer) {
              pushBadge({
                name: "Replugged Developer",
                image: "",
                custom: <Badges.Developer color={colors} />
              });
            }
            if (value?.staff) {
              pushBadge({
                name: "Replugged Staff",
                image: "",
                custom: <Badges.Staff color={colors} />
              });
            }
            if (value?.support) {
              pushBadge({
                name: "Replugged Support",
                image: "",
                custom: <Badges.Support color={colors} />
              });
            }
            if (value?.contributor) {
              pushBadge({
                name: "Replugged Contributor",
                image: "",
                custom: <Badges.Contributor color={colors} />
              });
            }
            if (value?.translator) {
              pushBadge({
                name: "Replugged Translator",
                image: "",
                custom: <Badges.Translator color={colors} />
              });
            }
            if (value?.hunter) {
              pushBadge({
                name: "Replugged Hunter",
                image: "",
                custom: <Badges.BugHunter color={colors} />
              });
            }
            if (value?.early) {
              pushBadge({
                name: "Replugged Early Access",
                image: "",
                custom: <Badges.EarlyUser color={colors} />
              });
            }
            if (value?.booster) {
              pushBadge({
                name: "Replugged Booster",
                image: "",
                custom: <Badges.Booster color={colors} />
              });
            }
            if (value?.custom?.name) {
              pushBadge({
                name: value.custom.name,
                image: value.custom.icon,
              });
            }
            break;
          case "vencord":
            if (value?.contributor) {
              pushBadge({
                name: "Vencord Contributor",
                image: "https://cdn.discordapp.com/attachments/1033680203433660458/1092089947126780035/favicon.png",
              });
            }
            if (value?.cutie) {
              pushBadge({
                name: value.cutie.tooltip,
                image: value.cutie.image,

              });
            }
            break;
          default:
            break;
        }
      })
      
    });
  })

    // rowPatches = after("generate", RowManager.prototype, ([row], { message }) => {
    //   // const [, updateForce] = React.useReducer(x => x = !x, false);

    //   if (row.rowType !== 1) return
    //   // if (message.roleIcon) return
    //   cachUser = cache.get(message.authorId);
    //   if (cachUser === undefined) {
    //     fetchbadges(message.authorId, false);
    //     return;
    //   }

    //   const { customBadgesArray } =
    //     cachUser?.badges;
    //   if (!customBadgesArray.badge) return

    //   message.roleIcon = {
    //     source: customBadgesArray.badge,
    //     name: customBadgesArray.name,
    //     size: 18,
    //     alt: `Custom Badge, ${customBadgesArray.name}`
    //   }
    //   console.log(message.roleIcon)
    //   return

    //   //roleIcon:
    //   //  { source: 'https://cdn.discordapp.com/role-icons/984258942613991444/12f87f0471446c0e757e6f79d3f1a625.webp?quality=lossless',
    //   //  name: 'Light Cornflower Blue',
    //   //  size: 18,
    //   //  unicodeEmoji: undefined,
    //   //  alt: 'Role icon, Light Cornflower Blue' }
    // })
  },
  onUnload: () => {
    unpatch?.();
    rowPatches?.();
  },
  settings: Settings
};

async function fetchbadges(userId: string, updateForce) {
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
    updateForce();

  }

  return cache.get(userId)!.badges;
}