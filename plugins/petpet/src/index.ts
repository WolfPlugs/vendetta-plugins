import { registerCommand } from "@vendetta/commands";
import { findByStoreName, findByProps } from "@vendetta/metro";

const UserStore = findByStoreName("UserStore");
const { sendAttachments } = findByProps("sendAttachments");
let command;


export default {
    onLoad: () => {
        command = registerCommand({ 
            name: "petpet",
            displayName: "PetPet",
            displayDescription: "pet someone with a petpet",
            description: "pet someone with a petpet",

            options: [
                {
                    name: "user",
                    description: "name or id of the user",
                    type: 9,
                    required: true,
                    displayName: "User",
                    displayDescription: "Name or Id of the user",
                }
            ],

            execute: pcommand,
             // @ts-ignore
            applicationId: -1,
            inputType: 1,
            type: 1,
        });

        


    },

    onUnload: () => {
        command();

    },
}



async function getApiData(image: any) {
        const data = await fetch(`https://api.obamabot.me/v2/image/petpet?image=${image.replace("webp", "png")}`);
        const body = await data.json();

    return body;
}

async function pcommand(args, ctx) {
    const user = await UserStore.getUser(args[0].value);
    const image = user.getAvatarURL(512);
    const data = await getApiData(image);
    const results = await data.buffer.data;
    // console.log(sendAttachments(ctx.channel.id, { content: 'hi'}))
    const file = new File([results], "petpet.png", { type: "image/png" });
    setTimeout(() => {
       console.log(sendAttachments())
    }, 10)
}