import { Forms, General } from "@vendetta/ui/components";
import { storage } from '@vendetta/plugin';
import { useProxy } from '@vendetta/storage';
import { getAssetIDByName } from "@vendetta/ui/assets";
import { url } from "@vendetta/metro/common";
import { loadBadges } from "./utils";

const { ScrollView } = General;
const { FormSwitchRow, FormRow, FormIcon } = Forms;

export default () => {
    useProxy(storage);

    const refetch = () => {
        loadBadges();
    };

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
                label="Show Mod as Prefix"
                value={storage.showPrefix}
                onValueChange={(value: boolean) => {
                    storage.showPrefix = value;
                    if (value && storage.showSuffix) storage.showSuffix = false;
                    refetch();
                }}
            />
            <FormSwitchRow
                label="Show Mod as Suffix"
                value={storage.showSuffix}
                onValueChange={(value: boolean) => {
                    storage.showSuffix = value;
                    if (value && storage.showPrefix) storage.showPrefix = false;
                    refetch();
                }}
            />
            <FormSwitchRow label="Show Custom Badges" value={storage.showCustom} onValueChange={(v: boolean) => { storage.showCustom = v; refetch(); }} />
            <FormSwitchRow label="Show Nekocord Badges" value={storage.showNekocord} onValueChange={(v: boolean) => { storage.showNekocord = v; refetch(); }} />
            <FormSwitchRow label="Show ReviewDB Badges" value={storage.showReviewDB} onValueChange={(v: boolean) => { storage.showReviewDB = v; refetch(); }} />
            <FormSwitchRow label="Show Aero Badges" value={storage.showAero} onValueChange={(v: boolean) => { storage.showAero = v; refetch(); }} />
            <FormSwitchRow label="Show Aliucord Badges" value={storage.showAliucord} onValueChange={(v: boolean) => { storage.showAliucord = v; refetch(); }} />
            <FormSwitchRow label="Show Raincord Badges" value={storage.showRaincord} onValueChange={(v: boolean) => { storage.showRaincord = v; refetch(); }} />
            <FormSwitchRow label="Show Velocity Badges" value={storage.showVelocity} onValueChange={(v: boolean) => { storage.showVelocity = v; refetch(); }} />
            <FormSwitchRow label="Show Enmity Badges" value={storage.showEnmity} onValueChange={(v: boolean) => { storage.showEnmity = v; refetch(); }} />
            <FormSwitchRow label="Show Paicord Badges" value={storage.showPaicord} onValueChange={(v: boolean) => { storage.showPaicord = v; refetch(); }} />

            <FormRow
                label="Add Custom badges"
                leading={<FormRow.Icon source={getAssetIDByName("Discord")} />}
                trailing={FormRow.Arrow}
                onPress={() => url.openDeeplink("https://discord.gg/eTvYv95PCG")}
            />
        </ScrollView>
    )
}
