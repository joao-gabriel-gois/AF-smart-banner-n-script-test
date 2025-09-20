export const createModuleError = (moduleName, message = 'Global `window` object not found!') => {
  const finalMessage = `${message} Could not run or import \`${moduleName}\`.`;
  console.error(finalMessage);
  return new Error(finalMessage);
}

export function getVisualParams(uri) {
  if (!window) throw createModuleError('getVisualParams');
  
  const formattedParams = {};
  let [urlAndPath, params] = window.decodeURIComponent(uri).split("?");
  const [_, path] = urlAndPath.split('.me/');
  
  params = params.split('&');
  for (const param of params) {
      let [key, value] = param.split('=');
      Object.assign(formattedParams, { [key]: value });
  }
  Object.assign(formattedParams, { path });

  return formattedParams;
}

// Below func was necessary due to the fact that declaring directly the 3rd party code
// as string was causing syntax errors, once it has all different types of quotes, that
// is: single (''), double ("") and grave accent (``). The goal was to control as much 
// as possible all 3rd party code without directly changing it.
export async function getStringFromFile(path) {
  return await fetch(path).then(res => res.text());
}
