// Banners can't be encapsulated, they rely on at least one request that, consumes a lot
// of data set in window.AF by code below, in order to properly render them. I just created
// this export in order to properly call it whenever the importing context want (for this
// use case, it must be triggered by the DOMContentLoaded event, once this page is fetching
// only one entry-point JS Script - index.js - in the HTML header).

// Once this module is imported, we start to observe if banner is rendered
observeBannerRendering();

export const renderAFBanner = () => {
  // Untouched Appflyer's shared code snippet below
  !function(t,e,n,s,a,c,i,o,p){t.AppsFlyerSdkObject=a,t.AF=t.AF||function(){(t.AF.q=t.AF.q||[]).push([Date.now()].concat(Array.prototype.slice.call(arguments)))},t.AF.id=t.AF.id||i,t.AF.plugins={},o=e.createElement(n),p=e.getElementsByTagName(n)[0],o.async=1,o.src="https://websdk.appsflyer.com?"+(c.length>0?"st="+c.split(",").sort().join(",")+"&":"")+(i.length>0?"af_id="+i:""),p.parentNode.insertBefore(o,p)}(window,document,"script",0,"AF","banners",{banners: {key: "d830606c-5add-4022-8120-3922bdeb7365"}});
  AF('banners', 'showBanner');
}

function observeBannerRendering(elementToObserve = document.body) { // Smart Banners render as a body's child
  const observer = new MutationObserver(observerCallback);
  // not checking changes inside children's children (subtree), only direct children of the body element
  const config = { childList: true, subtree: false };
  observer.observe(document.body, config);

  function observerCallback(mutationsList, observer) {
    for (const mutation of mutationsList) {
      const banner = document.querySelector('#smart-banner');
      if (mutation.type === 'childList' && banner) {
        // add any additional logic after banner rendering below
        // in this use case we are simply removing the additional div
        // that appsflyer adds before the banner as margin to it once 
        // it has a fixed position
        if (elementToObserve.tagName === 'BODY') {
          setTimeout(() => {
            // as the sibling is not necessarily rendered once the banner mutation
            // is observed, let's turn it async, so it will be forced to go to the
            // callback queue and be executed once all rendering (sync) logic is done
            banner.previousElementSibling.remove();
          }, 0);
        }
        observer.disconnect();
        return;
      }
    }
  }
};
