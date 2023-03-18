import { registerCommand } from "@vendetta/commands";

let command;

export default {
    onLoad: () => {
        command = registerCommand({ 
            name: "discgpt",
            displayName: "discgpt",
            displayDescription: "Chat with a AI",
            description: "Chat with a AI",

            options: [
                {
                    name: "message",
                    description: "Message to send to GPT-3",
                    type: 3,
                    required: true,
                    displayName: "Message",
                    displayDescription: "Message to send to GPT-3",
                }
            ],

            execute: async (args, ctx) => {
                console.log(args);

            },
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