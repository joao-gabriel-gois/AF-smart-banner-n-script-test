import { AFScript } from "./appsflyer-smart-script.js";

(() => {
  window.addEventListener('DOMContentLoaded', async () => {
    const { constructorArgs, generateNewOneLinkURL } = await AFScript();
    const result = generateNewOneLinkURL();
    console.log('\n\nDefault Values.\nContructor:', constructorArgs, '\nResult:', result.clickURL);
    console.table(getVisualParams(result.clickURL));

    constructorArgs.afParameters.mediaSource.defaultValue = 'joao_new_media_source_for_smart_script';
    const newResult = generateNewOneLinkURL();
    console.log('\n\nNew Values.\nContructor:', constructorArgs, '\nResult:', newResult.clickURL);
    console.table(getVisualParams(newResult.clickURL));

    // attaching updated defaultValue for mediaSource to be called on button click:
    const btn = document.getElementById('CTA');
    btn.addEventListener('click', (event) => {
      console.log('click in url:', newResult.clickURL);
      const a = document.createElement('a');
      // Consuming AppsFlyer generated URL
      a.href = newResult.clickURL;
      // a.target = '_blank'
      a.click();
      a.remove();
    })
  });
})();

console.log('check global values:', window.AF_SMART_SCRIqPT);

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