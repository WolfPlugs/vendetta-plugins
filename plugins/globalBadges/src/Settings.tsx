import { Forms, General } from "@vendetta/ui/components";
import { storage } from '@vendetta/plugin';
import { useProxy } from '@vendetta/storage';
import { getAssetIDByName } from "@vendetta/ui/assets";
import { url } from "@vendetta/metro/common"

const { ScrollView } = General;

const { FormSwitchRow, FormRow, FormIcon } = Forms;

export default () => {
    useProxy(storage);


    return (
        <ScrollView>
            <FormSwitchRow
                label="Load Badges on left"
                subLabel="If enabled, custom badges will load up first than the original badges."
                leading={<FormIcon source={getAssetIDByName("ic_nitro_rep_24px")} />}
                value={storage.left}
                onValueChange={(value: boolean) => storage.left = value}
            />
            <FormSwitchRow
                label="Disable Mod Badges"
                subLabel="If enabled, it will disable mod client badges but not custom badges."
                leading={<FormIcon source={getAssetIDByName("ic_shield_24px")} />}
                value={storage.mods}
                onValueChange={(value: boolean) => storage.mods = value}
            />
            <FormSwitchRow
                label="Disable Custom Badges"
                subLabel="If enabled, it will disable custom badges but not mod client badges."
                leading={<FormIcon source={getAssetIDByName("alert")} />}
                value={storage.customs}
                onValueChange={(value: boolean) => storage.customs = value}
            />
            <FormRow
                label="Add Custom badges"
                leading={<FormRow.Icon source={getAssetIDByName("Discord")} />}
                trailing={FormRow.Arrow}
                onPress={() => url.openDeeplink("https://discord.gg/eTvYv95PCG")}
            />
        </ScrollView>
    )

}
