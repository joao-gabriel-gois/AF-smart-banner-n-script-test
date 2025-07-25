// Sandbox Utils

// Below func was necessary due to the fact that declaring directly the 3rd party code
// as string was causing syntax errors, once it has all different types of quotes, that
// is: single (''), double ("") and grave accent (``). The goal was to control as much 
// as possible all 3rd party code without directly changing it.
export async function get3rdPartyCode(path) {
  return await fetch(path).then(res => res.text());
}

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
