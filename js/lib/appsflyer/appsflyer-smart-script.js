// If needed, you can download the script from: https://onelinksmartscript.appsflyer.com/onelink-smart-script-latest.js
// See an example of implementation and how to place the URL result behind a CTA on your website: https://appsflyersdk.github.io/appsflyer-onelink-smart-script/examples/utm_parameters.html?utm_campaign=mycmpn&utm_source=mysource
// See an example of how to display a QR code: https://appsflyersdk.github.io/appsflyer-onelink-smart-script/examples/qr_code.html?inmedia=my_email&incmp=my_campaign
import { runInSandbox } from '../../utils/sandbox.js'
import { getStringFromFile } from '../../utils/general.js'

const AF_SCRIPT_PATH = 'js/lib/appsflyer/appsflyer-smart-script_dependency.js'

// Initializing Smart Script arguments. Exported instances will never impact the var below
const constructorArgs = {
  oneLinkURL: "https://joaotest.onelink.me/JvP5",
  webReferrer: "af_channel",
  afParameters: {
    mediaSource: {
      keys:["utm_source"],
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
      {
        paramKey:"is_retargeting",
        defaultValue:"true"
      },
    ],
  },
};

console.log('(appsflyer-smart-script) - started: creating exporting AFScript factory');
export const AFScript = async () => {
  // clone to prevent intented mutation from importers to affect this non exported file
  // var (constructorArgs above) value - avoiding assigning the non-exported var by reference
  const localConstructor = { ...constructorArgs };
  const { generateOneLinkURL } = await createAppsFlyerEncapsulatedObject();

  console.log('(appsflyer-smart-script) - finished');
  return {
    // passing by reference to allow changes inside this context whenever importers change the isntance.contructorArgs
    // in their context. The intention is to allow changes in the instance's contructorArgs properties to be reflected
    // in the possible new `generateNewOneLinkURL` method calls (example in the index.js and README.md)
    constructorArgs: localConstructor,
    generateNewOneLinkURL() { 
      return generateOneLinkURL(localConstructor);
    }
  }
};

async function createAppsFlyerEncapsulatedObject(path = AF_SCRIPT_PATH) {
  // Runing Appsflyer's Public Script in sandbox
  const rawCode = await getStringFromFile(path);
  const sandbox = runInSandbox(rawCode);
  console.log('\t(appsflyer-smart-script):\n\t\ttesting global (expect undefined):', window.AF_SMART_SCRIPT, '\n\t\ttesting sandbox (expect the AF object):', sandbox.AF_SMART_SCRIPT);

  return sandbox.AF_SMART_SCRIPT;
};
