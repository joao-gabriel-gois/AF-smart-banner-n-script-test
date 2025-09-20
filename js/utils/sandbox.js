import { createModuleError } from './general.js';
if (!window || !globalThis || !self) throw createModuleError(
  'sandbox',
  'None of possible Global objects were found (`window`, `globalThis` or `self`)!',
);
// Sandbox Utils
// Call it whenever you need that the code that use global properties in window
// obj. have private context to work in. Not working for banners, the reason is
// better explained in both ./appsflyer-smart-banner.js comments and README.md
export function runInSandbox(codeString) {
  const sandbox = createSandboxedGlobal();
  // The `with` statement lets us make all unqualified references go through the proxy
  const script = new Function('sandbox', `
    with (sandbox) {
      ${codeString}
    }
  `);

  script(sandbox);
  
  return sandbox;

  function createSandboxedGlobal() {
    const shadow = {}; // this captures all mutations

    const proxy = new Proxy(shadow, {
      get(target, key) {
        if (key === Symbol.unscopables) return undefined;
        if (key === 'self' || key === 'window' || key === 'globalThis') return proxy;
        return key in target ? target[key] : window[key];
      },
      set(target, key, value) {
        target[key] = value;
        return true;
      },
      has(target, key) {
        return true; // so that with(proxy) { foo } always finds foo
      }
    });

    return proxy;
  }
}
