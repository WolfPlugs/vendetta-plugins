import { registerCommand } from "@vendetta/commands";

import { RootObject } from "./interfaces/osu";

let command;

type userCache = {
    user: RootObject;
    lastFetch: number;
};

const cache = new Map<string, userCache>();


export default {
    onLoad: () => {
        command = registerCommand({ 
            name: "osu",
            displayName: "Osu!",
            displayDescription: "Check your osu! stats",
            description: "check your osu! stats",

            options: [
                {
                    name: "user",
                    description: "name or id of the user",
                    type: 3,
                    required: true,
                    displayName: "User",
                    displayDescription: "Name or Id of the user",
                }
                // {
                //     name: "mode",
                //     description: "Choose the mode",
                //     type: 3,
                //     required: false,
                //     displayName: "Mode",
                //     displayDescription: "Choose the mode",

                // }
            ],

            execute: osuCommand,
             // @ts-ignore
            applicationId: "-1",
            inputType: 1,
            type: 1,
        });

        


    },

    onUnload: () => {
        command();

    },
}



async function getApiData(userName: any) {
    if(!cache.has(userName.username) || cache.get(userName.username)!.lastFetch + 1000 * 60 * 60 * 24 < Date.now()) {
        const data = await fetch(`https://api.obamabot.me/v2/text/osu?user=${userName}`);
        const body = (await data.json()) as RootObject;

        const result: userCache = 
        data.status === 200 || data.status === 401
            ? { user: body, lastFetch: Date.now() }
            : (cache.delete(userName), { user: body, lastFetch: Date.now() });

        cache.set(userName, result);
    }

    return cache.get(userName)!.user;
}

async function osuCommand(args, ctx) {
    const userName = args[0].value;

    const data = await getApiData(userName);
    if(data.error) return { content: data.error }

    const string = [
        `__${data.username}'s Stats__`,
        `Global Rank: **${data.custom.pp_rank}** (:flag_${data.country_code.toLowerCase()}: #${data.custom.pp_country_rank})`,
        `PP: **${data.custom.pp_raw}**`,
        `Play Count: **${data.custom.playcount}**`,
        `Accuracy: **${data.custom.hit_accuracy}%**`,
        `Time Played: **${data.custom.time_played}**`,
        `Play Styles: **${data.custom.playstyles}**`,
      ].join("\n");

    return { content: string }
}