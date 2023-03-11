import { logger } from "@vendetta";
import { findByDisplayName, findByProps, findByStoreName } from "@vendetta/metro";
import { after, before } from "@vendetta/patcher";

const userStore = findByStoreName("")


let unpatch;


export default {
    onLoad: () => {
        logger.log("Hello world!");

        // unpatch = before("ProfileBadges", userStore, args => {
        //     console.log(args[0])

        // })
        // unpatch = after("ProfileBadges", userStore, args => {
        //     console.log(args[0])
        // })

        console.log(userStore)
    },
    onUnload: () => {
        logger.log("Goodbye, world.");
        unpatch?.();
    },
}