import { Forms, General } from "@vendetta/ui/components";
import { storage } from '@vendetta/plugin';
import { useProxy } from '@vendetta/storage';
import { getAssetIDByName } from "@vendetta/ui/assets";

const { ScrollView } = General;

const { FormSwitchRow, FormIcon } = Forms;

export default () => {
    useProxy(storage);


    return (
        <ScrollView>
        <FormSwitchRow
            label="Load Badges on left"
            subLabel="If enabled, custom badges will load up first than the origianls badges."
            leading={<FormIcon source={getAssetIDByName("ic_nitro_rep_24px")} />}
            value={storage.left}
            onValueChange={(value: boolean) => storage.left = value}
        />
    </ScrollView>
    )

    
}