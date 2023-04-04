import { registerCommand } from "@vendetta/commands";
import { findByStoreName, findByProps } from "@vendetta/metro";

const UserStore = findByStoreName("UserStore");
const { sendAttachments } = findByProps("sendAttachments");
let command;

export default {
    onLoad: () => {
        command = registerCommand({ 
            name: "petpet",
            displayName: "petpet",
            displayDescription: "PetPet someone",
            description: "PetPet someone",

            options: [
                {
                    name: "user",
                    description: "The user(or their id) to be patted",
                    type: 6,
                    required: true,
                    displayName: "user",
                    displayDescription: "The user(or their id) to be patted",
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
    return {
        content: data.url,
    }
    
}
