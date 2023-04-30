import { findByStoreName, findByProps } from "@vendetta/metro";
import { ReactNative as RN } from "@vendetta/metro/common";
import { findInReactTree } from "@vendetta/utils";
import { after } from "@vendetta/patcher";

const { View } = RN;
let patches = [];
export default {
  onLoad: () => {
    patches.push(
      after("render", View, (args, res) => {
        const channelPinsConnected = findInReactTree(
          res,
          (r) => r.type?.name === "ChannelPinsConnected"
        );
        console.log(channelTab);
        return res;
      })
    );
  },

  onUnload: () => {
    patches.forEach((unpatch) => unpatch());
  },
};
