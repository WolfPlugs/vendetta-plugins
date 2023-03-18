import {
  findByDisplayName,
} from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { ReactNative as RN, stylesheet, toasts, React } from "@vendetta/metro/common";

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
    staff: {
      data: {
        name: string;
        id: string;
        url: {
          dark: string;
          light: string;
        };
      };
    };
    dev: {
      data: {
        name: string;
        id: string;
        url: {
          dark: string;
          light: string;
        };
      };
    };
    contributor: {
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
      const [, updateForce] = React.useReducer(x => x = !x, false);
      const user = args[0]?.user;
      if (user === undefined) return;

      const cachUser = cache.get(user.id);
      if (cachUser === undefined) {
        fetchbadges(user.id, updateForce);
        return;
      }


      const { customBadgesArray, aliu, enmity, replugged } =
        cachUser?.badges;

        const colors = `#${replugged.custom?.color  ||  '7289da'}`
      const custombadgesViewable = (
        <View key="gb-custom" style={styles.container}>
          <TouchableOpacity key={customBadgesArray.badge} onPress={() => {
            toasts.open({
              content: customBadgesArray.name,
              source: { uri: customBadgesArray.badge }
            });
          }}>
            <Image style={styles.img} source={{ uri: customBadgesArray.badge }} />
          </TouchableOpacity>
        </View>
      )
      const bdViewable = (
        <View key="gb-bd" style={styles.container}>
                <Badges.bdDevs/>
        </View>
    )

        const enmityViewable = (
            <View key="gb-enmity" style={styles.container}>
                <TouchableOpacity key="enmity-supporter" onPress={() => {
                    toasts.open({
                        content: "Enmity Supporter",
                        source: { uri: enmity?.supporter?.data?.url.dark }
                    });
                }}>
                    <Image style={styles.img} source={{ uri: enmity?.supporter?.data.url.dark }} />
                </TouchableOpacity>
            </View>
        )

        const enmityStaffViewable = (
            <View key="gb-enmitystaff" style={styles.container}>
                <TouchableOpacity key="enmity-staff" onPress={() => {
                    toasts.open({
                        content: "Enmity Staff",
                        source: { uri: enmity?.staff?.data?.url.dark }
                    });
                }}>
                    <Image style={styles.img} source={{ uri: enmity?.staff?.data.url.dark }} />
                </TouchableOpacity>
            </View>
        )

        const enmityDevViewable = (
            <View key="gb-enmitydev" style={styles.container}>
                <TouchableOpacity key="enmity-dev" onPress={() => {
                    toasts.open({
                        content: "Enmity Developer",
                        source: { uri: enmity?.dev?.data?.url.dark }
                    });
                }}>
                    <Image style={styles.img} source={{ uri: enmity?.dev?.data.url.dark }} />
                </TouchableOpacity>
            </View>
        )

        const enmityContributorViewable = (
            <View key="gb-enmitycontributor" style={styles.container}>
                <TouchableOpacity key="enmity-contributor" onPress={() => {
                    toasts.open({
                        content: "Enmity Contributor",
                        source: { uri: enmity?.contributor?.data?.url.dark }
                    });
                }}>
                    <Image style={styles.img} source={{ uri: enmity?.contributor?.data.url.dark }} />
                </TouchableOpacity>
            </View>
        )

        const enmityCustomViewable = (
            <View key="gb-enmitycustom" style={styles.container}>
                <TouchableOpacity key="enmity-custom" onPress={() => {
                    toasts.open({
                        content: enmity[user.id]?.data?.name,
                        source: { uri: enmity[user.id]?.data?.url.dark }
                    });
                }}>
                    <Image style={styles.img} source={{ uri: enmity[user.id]?.data?.url.dark }} />
                </TouchableOpacity>
            </View>
        )

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
                    content: 'Replugged Booster',
                });
            }}>
                <Badges.Booster color={colors}/>
            </TouchableOpacity>
        </View>
    )

    const replugBugHunter = (
        <View key="gb-replugbughunter" style={styles.container}>
          <TouchableOpacity key="replugbughunter" onPress={() => {
                toasts.open({
                    content: 'Replugged Bug Hunter', // Zoro the Pirate Hunter
                });
            }}>
                <Badges.BugHunter color={colors}/>
            </TouchableOpacity>
        </View>
    )

    const replugContributor = (
        <View key="gb-replugcontributor" style={styles.container}>
          <TouchableOpacity key="replugcontributor" onPress={() => {
                toasts.open({
                    content: 'Replugged Contributor',
                });
            }}>
                <Badges.Contributor color={colors}/>
            </TouchableOpacity>
        </View>
    )

    const replugDev = (
        <View key="gb-replugdev" style={styles.container}>
          <TouchableOpacity key="replugdev" onPress={() => {
                toasts.open({
                    content: 'Replugged Developer',
                });
            }}>
                <Badges.Developer color={colors} />
            </TouchableOpacity>
        </View>
    )

    const replugEarlyUser = (
        <View key="gb-replugearlyuser" style={styles.container}>
          <TouchableOpacity key="replugearlyuser" onPress={() => {
                toasts.open({
                    content: 'Replugged Early User',
                });
            }}>
                <Badges.EarlyUser color={colors} />
            </TouchableOpacity>
        </View>
    )

    const replugStaff = (
        <View key="gb-replugstaff" style={styles.container}>
          <TouchableOpacity key="replugstaff" onPress={() => {
                toasts.open({
                    content: 'Replugged Staff',
                });
            }}>
              <Badges.Staff color={colors} />
            </TouchableOpacity>
        </View>
    )

    const replugTranslator = (
        <View key="gb-replugtranslator" style={styles.container}>
          <TouchableOpacity key="replugtranslator" onPress={() => {
                toasts.open({
                    content: 'Replugged Translator',
                });
            }}>
              <Badges.Translator color={colors}/>
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



    const Badge = {
        custombadgesViewable,
        bdViewable,
        enmityViewable,
        enmityContributorViewable,
        enmityDevViewable,
        enmityStaffViewable,
        enmityCustomViewable,
        goosemodSponsorViewable,
        goosemodDevViewable,
        goosemodTranslatorViewable,
        aliDev,
        aliDonor,
        aliContributor,
        aliCustom,
        replugbooster,
        replugBugHunter,
        replugContributor,
        replugDev,
        replugEarlyUser,
        replugStaff,
        replugTranslator,
        replugCustom,
    };

    getBadgesElements(cachUser?.badges, Badge, res)


    });
  },
  onUnload: () => {
    unpatch?.();
  },
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

function getBadgesElements(badges: CustomBadges, Badge: any, res: any) {
  let badgeTypes
   // @ts-ignore
  if(window.enmity) {
    badgeTypes = [
      { condition: badges.customBadgesArray.badge, component: Badge.custombadgesViewable },
      { condition: badges.bd.dev, component: Badge.bdViewable },
      { condition: badges.goosemod.sponsor, component: Badge.goosemodSponsorViewable },
      { condition: badges.goosemod.dev, component: Badge.goosemodDevViewable },
      { condition: badges.goosemod.translator, component: Badge.goosemodTranslatorViewable },
      { condition: badges.aliu.dev, component: Badge.aliDev },
      { condition: badges.aliu.donor, component: Badge.aliDonor },
      { condition: badges.aliu.contributor, component: Badge.aliContributor },
      { condition: badges.aliu.custom, component: Badge.aliCustom },
      { condition: badges.replugged.booster, component: Badge.replugbooster },
      { condition: badges.replugged.hunter, component: Badge.replugBugHunter },
      { condition: badges.replugged.contributor, component: Badge.replugContributor },
      { condition: badges.replugged.developer, component: Badge.replugDev },
      { condition: badges.replugged.early, component: Badge.replugEarlyUser },
      { condition: badges.replugged.staff, component: Badge.replugStaff },
      { condition: badges.replugged.translator, component: Badge.replugTranslator },
      { condition: badges.replugged.custom?.name && badges.replugged.custom.icon, component: Badge.replugCustom },
    ];
     // @ts-ignore
  } else if(window.aliucord) {
      badgeTypes = [
        { condition: badges.customBadgesArray.badge, component: Badge.custombadgesViewable },
        { condition: badges.bd.dev, component: Badge.bdViewable },
        { condition: badges.enmity, component: Badge.enmityViewable },
        { condition: badges.enmity.contributor, component: Badge.enmityContributorViewable },
        { condition: badges.enmity.dev, component: Badge.enmityDevViewable },
        { condition: badges.enmity.staff, component: Badge.enmityStaffViewable },
        { condition: badges.enmity, component: Badge.enmityCustomViewable },
        { condition: badges.goosemod.sponsor, component: Badge.goosemodSponsorViewable },
        { condition: badges.goosemod.dev, component: Badge.goosemodDevViewable },
        { condition: badges.goosemod.translator, component: Badge.goosemodTranslatorViewable },
        { condition: badges.replugged.booster, component: Badge.replugbooster },
        { condition: badges.replugged.hunter, component: Badge.replugBugHunter },
        { condition: badges.replugged.contributor, component: Badge.replugContributor },
        { condition: badges.replugged.developer, component: Badge.replugDev },
        { condition: badges.replugged.early, component: Badge.replugEarlyUser },
        { condition: badges.replugged.staff, component: Badge.replugStaff },
        { condition: badges.replugged.translator, component: Badge.replugTranslator },
        { condition: badges.replugged.custom?.name && badges.replugged.custom.icon, component: Badge.replugCustom },
      ];
    } else {
      badgeTypes = [
        { condition: badges.customBadgesArray.badge, component: Badge.custombadgesViewable },
        { condition: badges.bd.dev, component: Badge.bdViewable },
        { condition: badges.enmity, component: Badge.enmityViewable },
        { condition: badges.enmity.contributor, component: Badge.enmityContributorViewable },
        { condition: badges.enmity.dev, component: Badge.enmityDevViewable },
        { condition: badges.enmity.staff, component: Badge.enmityStaffViewable },
        { condition: badges.enmity, component: Badge.enmityCustomViewable },
        { condition: badges.goosemod.sponsor, component: Badge.goosemodSponsorViewable },
        { condition: badges.goosemod.dev, component: Badge.goosemodDevViewable },
        { condition: badges.goosemod.translator, component: Badge.goosemodTranslatorViewable },
        { condition: badges.aliu.dev, component: Badge.aliDev },
        { condition: badges.aliu.donor, component: Badge.aliDonor },
        { condition: badges.aliu.contributor, component: Badge.aliContributor },
        { condition: badges.aliu.custom, component: Badge.aliCustom },
        { condition: badges.replugged.booster, component: Badge.replugbooster },
        { condition: badges.replugged.hunter, component: Badge.replugBugHunter },
        { condition: badges.replugged.contributor, component: Badge.replugContributor },
        { condition: badges.replugged.developer, component: Badge.replugDev },
        { condition: badges.replugged.early, component: Badge.replugEarlyUser },
        { condition: badges.replugged.staff, component: Badge.replugStaff },
        { condition: badges.replugged.translator, component: Badge.replugTranslator },
        { condition: badges.replugged.custom?.name && badges.replugged.custom.icon, component: Badge.replugCustom },
      ];
    }
    addBadges(res, badgeTypes);
}

async function addBadges (res: any, badges, ) {
  if(!res) return;
    for (const badge of badges) {
        if (badge.condition) {
          res.props.children.push(badge.component);
        }
    }
}