import { logger } from "@vendetta";
import {
  findByDisplayName,
  findByProps,
  findByStoreName,
} from "@vendetta/metro";
import { after, before } from "@vendetta/patcher";
import { ReactNative as RN, stylesheet, toasts } from "@vendetta/metro/common";

import Badges from "./Icons";

const { View, TouchableOpacity, Image } = RN

interface CustomBadges {
  customBadgesArray: {
    badge: string;
    name: string;
  };
  aliu: {
    dev: boolean;
    donor: boolean;
    contributor: boolean;
    custom: {
      url: string;
      text: string;
    };
  };
  bd: {
    dev: boolean;
  };
  enmity: {
    supporter: {
      data: {
        name: string;
        id: string;
        url: {
          dark: string;
          light: string;
        };
      };
    };
  };
  goosemod: {
    sponsor: boolean;
    dev: boolean;
    translator: boolean;
  };
  replugged: {
    developer: boolean;
    staff: boolean;
    support: boolean;
    contributor: boolean;
    translator: boolean;
    hunter: boolean;
    early: boolean;
    booster: boolean;
    custom: {
      name: string;
      icon: string;
      color: string;
    };
  };
}

type BadgeCache = {
  badges: CustomBadges;
  lastFetch: number;
};

const cache = new Map<string, BadgeCache>();
const REFRESH_INTERVAL = 1000 * 60 * 30;

const profileBadges = findByDisplayName("ProfileBadges", false);

const svgshit = findByProps("SvgUri")

let unpatch;

export default {
  onLoad: () => {

    const styles = stylesheet.createThemedStyleSheet({
      container: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "flex-end",
      },
      img: {
        width: 24,
        height: 24,
        resizeMode: "contain",
        marginHorizontal: 4
      }
    });

    unpatch = after("default", profileBadges, (args, res) => {

        const { SvgUri } = svgshit
      const user = args[0]?.user;
      if (user === undefined) return;

      const cachUser = cache.get(user.id);
      if (cachUser === undefined) {
        fetchbadges(user.id);
        return;
      }

      const { customBadgesArray, aliu, bd, enmity, goosemod, replugged } =
        cachUser?.badges;

      const custombadgesViewable = (
        <View key="gb-custom" style={styles.container}>
          <TouchableOpacity key={customBadgesArray.badge} onPress={() => {
            toasts.open({
              content: customBadgesArray.name,
              source: { uri: customBadgesArray.badge }
            });
          }}>
            <SvgUri style={styles.img} source={{ uri: customBadgesArray.badge }} />
          </TouchableOpacity>
        </View>
      )
      const bdViewable = (
        <View key="gb-bd" style={styles.container}>
            <TouchableOpacity key="bd-dev" onPress={() => {
                toasts.open({
                    content: "BetterDiscord Developer",
                    source: { uri: 'https://raw.githubusercontent.com/WolfPlugs/vendetta-plugins/master/plugins/template/src/Icons/bd/bdDevs.png' }
                });
            }}>
                <Image style={styles.img} source={{ uri:'https://raw.githubusercontent.com/WolfPlugs/vendetta-plugins/master/plugins/template/src/Icons/bd/bdDevs.png' }} />
            </TouchableOpacity>
        </View>
    )
    let enmityViewable;
    if (enmity.supporter) {
        enmityViewable = (
            <View key="gb-enmity" style={styles.container}>
                <TouchableOpacity key="enmity-supporter" onPress={() => {
                    toasts.open({
                        content: "Enmity Supporter",
                        source: { uri: enmity.supporter.data.url.dark }
                    });
                }}>
                    <Image style={styles.img} source={{ uri: enmity.supporter.data.url.dark }} />
                </TouchableOpacity>
            </View>
        )
    }

    const goosemodSponsorViewable = (
        <View key="gb-goosemodsponsor" style={styles.container}>
            <TouchableOpacity key="goosemod-sponsor" onPress={() => {
                toasts.open({
                    content: "GooseMod Sponsor",
                    source: { uri: 'https://goosemod.com/img/goose_globe.png' }
                });
            }}>
                <Image style={styles.img} source={{ uri: 'https://goosemod.com/img/goose_globe.png' }} />
            </TouchableOpacity>
        </View>
    )
    const goosemodDevViewable = (
        <View key="gb-goosemoddev" style={styles.container}>
            <TouchableOpacity key="goosemod-dev" onPress={() => {
                toasts.open({
                    content: "GooseMod Developer",
                    source: { uri: 'https://goosemod.com/img/goose_glitch.jpg' }
                });
            }}>
                <Image style={styles.img} source={{ uri: 'https://goosemod.com/img/goose_glitch.jpg' }} />
            </TouchableOpacity>
        </View>
    )

    const goosemodTranslatorViewable = (
        <View key="gb-goosemodtranslator" style={styles.container}>
            <TouchableOpacity key="goosemod-translator" onPress={() => {
                toasts.open({
                    content: "GooseMod Translator",
                    source: { uri: 'https://goosemod.com/img/goose_globe.png' }
                });
            }}>
                <Image style={styles.img} source={{ uri: 'https://goosemod.com/img/goose_globe.png' }} />
            </TouchableOpacity>
        </View>
    )

    const aliDev = (
        <View key="gb-aliDev" style={styles.container}>
            <TouchableOpacity key="ali-dev" onPress={() => {
                toasts.open({
                    content: "Aliucord Developer",
                    source: { uri: 'https://cdn.discordapp.com/emojis/860165259117199401.webp' }
                });
            }}>
                <Image style={styles.img} source={{ uri: 'https://cdn.discordapp.com/emojis/860165259117199401.webp' }} />
            </TouchableOpacity>
        </View>
    )

    const aliDonor = (
        <View key="gb-aliDonor" style={styles.container}>
            <TouchableOpacity key="ali-donor" onPress={() => {
                toasts.open({
                    content: "Aliucord Donor",
                    source: { uri: 'https://cdn.discordapp.com/emojis/859801776232202280.webp' }
                });
            }}>
                <Image style={styles.img} source={{ uri: 'https://cdn.discordapp.com/emojis/859801776232202280.webp' }} />
            </TouchableOpacity>
        </View>
    )

    const aliContributor = (
        <View key="gb-aliContributor" style={styles.container}>
            <TouchableOpacity key="ali-contributor" onPress={() => {
                toasts.open({
                    content: "Aliucord Contributor",
                    source: { uri: 'https://cdn.discordapp.com/emojis/886587553187246120.webp' }
                });
            }}>
                <Image style={styles.img} source={{ uri: 'https://cdn.discordapp.com/emojis/886587553187246120.webp' }} />
            </TouchableOpacity>
        </View>
    )

    const aliCustom = (
        <View key="gb-aliCustom" style={styles.container}>
            <TouchableOpacity key="ali-custom" onPress={() => {
                toasts.open({
                    content: aliu.custom.text,
                    source: { uri: aliu.custom.url }
                });
            }}>
                <Image style={styles.img} source={{ uri: aliu.custom.url }} />
            </TouchableOpacity>
        </View>
    )

    const replugbooster = (
        <View key="gb-replugbooster" style={styles.container}>
            <TouchableOpacity key="replugbooster" onPress={() => {
                toasts.open({
                    content: "Replug Booster",
                    source: { uri: Badges.Booster }
                });
            }}>
                <SvgUri style={styles.img} source={{ uri: Badges.Booster }} />
            </TouchableOpacity>
        </View>
    )

    const replugBugHunter = (
        <View key="gb-replugbughunter" style={styles.container}>
            <TouchableOpacity key="replugbughunter" onPress={() => {
                toasts.open({
                    content: "Replug Bug Hunter",
                    source: { uri: Badges.BugHunter }
                });
            }}>
                <SvgUri style={styles.img} source={{ uri: Badges.BugHunter }} />
            </TouchableOpacity>
        </View>
    )

    const replugContributor = (
        <View key="gb-replugcontributor" style={styles.container}>
            <TouchableOpacity key="replugcontributor" onPress={() => {
                toasts.open({
                    content: "Replug Contributor",
                    source: { uri: Badges.Contributor }
                });
            }}>
                <SvgUri style={styles.img} source={{ uri: Badges.Contributor }} />
            </TouchableOpacity>
        </View>
    )

    const replugDev = (
        <View key="gb-replugdev" style={styles.container}>
            <TouchableOpacity key="replugdev" onPress={() => {
                toasts.open({
                    content: "Replug Developer",
                    source: { uri: Badges.Developer }
                });
            }}>
                <SvgUri style={styles.img} source={{ uri: Badges.Developer }} />
            </TouchableOpacity>
        </View>
    )

    const replugEarlyUser = (
        <View key="gb-replugearlyuser" style={styles.container}>
            <TouchableOpacity key="replugearlyuser" onPress={() => {
                toasts.open({
                    content: "Replug Early User",
                    source: { uri: Badges.EarlyUser }
                });
            }}>
                <SvgUri style={styles.img} source={{ uri: Badges.EarlyUser }} />
            </TouchableOpacity>
        </View>
    )

    const replugStaff = (
        <View key="gb-replugstaff" style={styles.container}>
            <TouchableOpacity key="replugstaff" onPress={() => {
                toasts.open({
                    content: "Replug Staff",
                    source: { uri: Badges.Staff }
                });
            }}>
                <SvgUri style={styles.img} source={{ uri: Badges.Staff }} />
            </TouchableOpacity>
        </View>
    )

    const replugCustom = (
        <View key="gb-replugcustom" style={styles.container}>
            <TouchableOpacity key="replugcustom" onPress={() => {
                toasts.open({
                    content: replugged.custom.name,
                    source: { uri: replugged.custom.icon }
                });
            }}>
                <Image style={styles.img} source={{ uri: replugged.custom.icon }} />
            </TouchableOpacity>
        </View>
    )

    const replugTranslator = (
        <View key="gb-replugtranslator" style={styles.container}>
            <TouchableOpacity key="replugtranslator" onPress={() => {
                toasts.open({
                    content: "Replug Translator",
                    source: { uri: Badges.Translator }
                });
            }}>
                <SvgUri style={styles.img} source={{ uri: Badges.Translator }} />
            </TouchableOpacity>
        </View>
    )

      if (!res) return custombadgesViewable;
      if (customBadgesArray.badge) res.props.children.push(custombadgesViewable);
      if (bd.dev) res.props.children.push(bdViewable);
      if (enmity) res.props.children.push(enmityViewable);
      if (goosemod.sponsor) res.props.children.push(goosemodSponsorViewable);
      if (goosemod.dev) res.props.children.push(goosemodDevViewable);
      if (goosemod.translator) res.props.children.push(goosemodTranslatorViewable);
      if (aliu.dev) res.props.children.push(aliDev);
      if (aliu.donor) res.props.children.push(aliDonor);
      if (aliu.contributor) res.props.children.push(aliContributor);
      if (aliu.custom) res.props.children.push(aliCustom);
      if (replugged.booster) res.props.children.push(replugbooster);
      if (replugged.hunter) res.props.children.push(replugBugHunter);
      if (replugged.contributor) res.props.children.push(replugContributor);
      if (replugged.developer) res.props.children.push(replugDev);
      if (replugged.early) res.props.children.push(replugEarlyUser);
      if (replugged.staff) res.props.children.push(replugStaff);
      if (replugged.translator) res.props.children.push(replugTranslator);
      if (replugged.custom) res.props.children.push(replugCustom);

      return;
    });
  },
  onUnload: () => {
    unpatch?.();
  },
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
