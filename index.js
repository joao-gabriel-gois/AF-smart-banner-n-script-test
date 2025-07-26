import { AFScript } from "./js/lib/appsflyer/appsflyer-smart-script.js";
import { renderAFBanner } from "./js/lib/appsflyer/appsflyer-smart-banner.js";

console.log('(index.js) - started');

(() => {
  window.addEventListener('DOMContentLoaded', async () => {
    renderAFBanner();
    const { constructorArgs, generateNewOneLinkURL } = await AFScript();

    const result = generateNewOneLinkURL();
    console.log('\t(index.js): \n\t\tDefault Values:\n\t\t\tContructor:', constructorArgs, '\n\t\t\tResult:', result.clickURL);
    console.table(getVisualParams(result.clickURL));

    constructorArgs.afParameters.mediaSource.defaultValue = 'joao_new_media_source_for_smart_script';
    const newResult = generateNewOneLinkURL();
    console.log('\t(index.js): \n\t\tNew Values:\n\t\t\tContructor:', constructorArgs, '\n\t\t\tResult:', newResult.clickURL);
    console.table(getVisualParams(newResult.clickURL));

    // attaching updated defaultValue for mediaSource in the link to be called on button click:
    const btn = document.getElementById('CTA');
    btn.addEventListener('click', (event) => {
      console.log('(index.js - Event): click in url:', newResult.clickURL);
      const a = document.createElement('a');
      // Consuming AppsFlyer generated URL
      a.href = newResult.clickURL;
      // a.target = '_blank'
      a.click();
      a.remove();
    })
  });
})();

console.log('\t(index.js): check global values:', window.AF_SMART_SCRIPT);
console.log('(index.js) - finished');

function getVisualParams(uri) {
  const formattedParams = {};
  let [urlAndPath, params] = decodeURIComponent(uri).split("?");
  const [_, path] = urlAndPath.split('.me/');
  params = params.split('&');

  for (const param of params) {
      let [key, value] = param.split('=');
      Object.assign(formattedParams, { [key]: value });
  }
  Object.assign(formattedParams, { path });

  return formattedParams;
}