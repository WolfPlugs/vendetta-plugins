import { registerCommand } from "@vendetta/commands";
import { findByStoreName, findByProps } from "@vendetta/metro";

const UserStore = findByStoreName("UserStore");
const { uploadLocalFiles } = findByProps("uploadLocalFiles");
const token = findByProps("getToken").getToken()

let command;
let patcher;
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
        },
      ],

      execute: pcommand,
      // @ts-ignore
      applicationId: "-1",
      inputType: 1,
      type: 1,
    });
  },

  onUnload: () => {
    command();
    patcher();
  },
};

async function getApiData(image: any) {
  // const data = await fetch(
  //   `https://api.obamabot.me/v1/image/petpet?avatar=${image.replace(
  //     "webp",
  //     "png"
  //   )}`
  // );
  // const blob = await data.blob();
  // const f = new File([blob], "temp.gif", { type: "image/gif" });
  // console.log(f);
  // return f;
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

  // const items = [{
  //   item: {
  //       id: "petpet",
  //       origin: 1,
  //       uri: data,
  //       originalUri: data,
  //       mimeType: "image/gif",
  //       width: 512,
  //       height: 512,
  //       filename: "petpet.gif",
  //       playableDuration: 0,
  //       platform: 0,
  //   },
  //   id: "petpet",
  //   filename: "petpet.gif",
  //   isImage: true,
  //   isVideo: false,
  //   mimeType: "image/gif",
  //   origin: 1,
  //   durationSecs: undefined,
  //   waveform: undefined,
  //   uniqueId: data._data.blobId,
  //   showLargerMessageDialog: undefined,
  //   spoiler: false,
  //   sensitive: false,
  //   desciption: undefined,
  //   status: 'NOT_STARTED',
  //   loaded: 0,
  //   reactNativeFilePropped: false,
  //   channelId: ctx.channel.channel_id,
  //   preCompressionSize: 0,
  //   currentSize: 0,
  //   reactNativefileIndex: 0,
  //   _abortController: {},
  //   _aborted: false,
  // }]
  // const parsedMessage = {
  //   content: "",
  //   tts: false,
  //   invalidEmojis: [],
  //   validNonShortcutEmojis: [],
  // };

  // return uploadLocalFiles([{ctx, items, token: token, parsedMessage}]);
}
