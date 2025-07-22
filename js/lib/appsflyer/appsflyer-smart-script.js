// If needed, you can download the script from: https://onelinksmartscript.appsflyer.com/onelink-smart-script-latest.js
// See an example of implementation and how to place the URL result behind a CTA on your website: https://appsflyersdk.github.io/appsflyer-onelink-smart-script/examples/utm_parameters.html?utm_campaign=mycmpn&utm_source=mysource
// See an example of how to display a QR code: https://appsflyersdk.github.io/appsflyer-onelink-smart-script/examples/qr_code.html?inmedia=my_email&incmp=my_campaign
import {runInSandbox, get3rdPartyCode } from '../../utils/sandbox.js'

const AF_SCRIPT_PATH = 'js/lib/appsflyer/appsflyer-smart-script_dependency.js'

//Initializing Smart Script arguments (Public properties, privately exported for this usecase)
const constructorArgs = {
  oneLinkURL: "https://joaotest.onelink.me/JvP5",
  webReferrer: "af_channel",
  afParameters: {
    mediaSource: {
      defaultValue:"joao_test_smart_script"
    },
    afSub1: {
      keys:["script_discount"],
      defaultValue:"10"
    },
    afCustom: [
      {
        paramKey:"af_ss_ui",
        defaultValue:"true"
      },
    ],
  },
};

export const AFScript = async () => {
  const localConstructor = { ...constructorArgs };
  const { generateOneLinkURL } = await createAppsFlyerEncapsulatedObject();

  return {
    constructorArgs: localConstructor, // clone to prevent mutation from outside
    generateNewOneLinkURL() { 
      return generateOneLinkURL(localConstructor);
    }
  }
};

// The initialization code follows the Smart Script code above (APPSFLYER_3RD_PARTY_CODE)
async function createAppsFlyerEncapsulatedObject() {
  // Runing Appsflyer's Public Script in sandbox
  const rawCode = await get3rdPartyCode(AF_SCRIPT_PATH);
  const sandbox = runInSandbox(rawCode);
  console.log('testing global:', window.AF_SMART_SCRIPT, '\ntesting sandbox:', sandbox.AF_SMART_SCRIPT)

  return sandbox.AF_SMART_SCRIPT;
};

