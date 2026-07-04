import { Forms, General } from "@vendetta/ui/components";
import { storage } from '@vendetta/plugin';
import { useProxy } from '@vendetta/storage';
import { loadBadges } from "./utils";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { url } from "@vendetta/metro/common";
const { ScrollView } = General;
const { FormRow, FormSection, FormSwitchRow, FormRadioRow } = Forms;

export default () => {
    useProxy(storage);

    const update = (key: string, value: any) => {
        storage[key] = value;
        loadBadges();
    };

    return (
        <ScrollView>
            <FormRow
                label="Get a BadgeVault badge here!"
                leading={<FormRow.Icon source={getAssetIDByName("Discord")} />}
                trailing={FormRow.Arrow}
                onPress={() => url.openDeeplink("https://discord.gg/eTvYv95PCG")}
            />
            <FormSection title="Badge Config">
                <FormSwitchRow
                    label="Show custom badges first"
                    value={!!storage.left}
                    onValueChange={v => update("left", v)}
                />
            </FormSection>

            <FormSection title="Show Mod Style">
                <FormRadioRow
                    label="Don't Show Mod"
                    selected={storage.showModStyle === "none" || !storage.showModStyle}
                    onPress={() => update("showModStyle", "none")}
                />
                <FormRadioRow
                    label="Show Mod as Prefix"
                    selected={storage.showModStyle === "prefix"}
                    onPress={() => update("showModStyle", "prefix")}
                />
                <FormRadioRow
                    label="Show Mod as Suffix"
                    selected={storage.showModStyle === "suffix"}
                    onPress={() => update("showModStyle", "suffix")}
                />
            </FormSection>

            <FormSection title="Badge Display">
                <FormSwitchRow label="Aero Badges" value={!!storage.showAero} onValueChange={(v) => update("showAero", v)} />
                <FormSwitchRow label="Aliucord Badges" value={!!storage.showAliucord} onValueChange={(v) => update("showAliucord", v)} />
                <FormSwitchRow label="BadgeVault Badges" value={!!storage.showCustom} onValueChange={(v) => update("showCustom", v)} />
                <FormSwitchRow label="BetterDiscord Badges" value={!!storage.showBetterDiscord} onValueChange={(v) => update("showBetterDiscord", v)} />
                <FormSwitchRow label="Bunny Badges" value={!!storage.showBunny} onValueChange={(v) => update("showBunny", v)} />
                <FormSwitchRow label="Enmity Badges" value={!!storage.showEnmity} onValueChange={(v) => update("showEnmity", v)} />
                <FormSwitchRow label="Equicord Badges" value={!!storage.showEquicord} onValueChange={(v) => update("showEquicord", v)} />
                <FormSwitchRow label="GooseMod Badges" value={!!storage.showGooseMod} onValueChange={(v) => update("showGooseMod", v)} />
                <FormSwitchRow label="Nekocord Badges" value={!!storage.showNekocord} onValueChange={(v) => update("showNekocord", v)} />
                <FormSwitchRow label="Paicord Badges" value={!!storage.showPaicord} onValueChange={(v) => update("showPaicord", v)} />
                <FormSwitchRow label="ReCord Badges" value={!!storage.showReCord} onValueChange={(v) => update("showReCord", v)} />
                <FormSwitchRow label="Replugged Badges" value={!!storage.showReplugged} onValueChange={(v) => update("showReplugged", v)} />
                <FormSwitchRow label="Revenge Badges" value={!!storage.showRevenge} onValueChange={(v) => update("showRevenge", v)} />
                <FormSwitchRow label="ReviewDB Badges" value={!!storage.showReviewDB} onValueChange={(v) => update("showReviewDB", v)} />
                <FormSwitchRow label="Velocity Badges" value={!!storage.showVelocity} onValueChange={(v) => update("showVelocity", v)} />
                <FormSwitchRow label="Vencord Badges" value={!!storage.showVencord} onValueChange={(v) => update("showVencord", v)} />
                <FormSwitchRow label="Vendroid Enhanced Badges" value={!!storage.showVendroidEnhanced} onValueChange={(v) => update("showVendroidEnhanced", v)} />
            </FormSection>
        </ScrollView>
    )
}
