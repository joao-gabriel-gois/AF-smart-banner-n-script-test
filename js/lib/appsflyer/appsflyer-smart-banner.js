// Banners can't be encapsulated, they rely on at least one request that, consumes a lot
// of data set in window.AF by code below, in order to properly render them. I just created
// this export in order to properly call it whenever the importing context want (for this
// use case, it must be triggered by the DOMContentLoaded event, once this page is fetching
// only one entry-point JS Script - index.js - in the HTML header).
export const renderAFBanner = () => {
  // Untouched Appflyer's shared code snippet below
  !function(t,e,n,s,a,c,i,o,p){t.AppsFlyerSdkObject=a,t.AF=t.AF||function(){(t.AF.q=t.AF.q||[]).push([Date.now()].concat(Array.prototype.slice.call(arguments)))},t.AF.id=t.AF.id||i,t.AF.plugins={},o=e.createElement(n),p=e.getElementsByTagName(n)[0],o.async=1,o.src="https://websdk.appsflyer.com?"+(c.length>0?"st="+c.split(",").sort().join(",")+"&":"")+(i.length>0?"af_id="+i:""),p.parentNode.insertBefore(o,p)}(window,document,"script",0,"AF","banners",{banners: {key: "d830606c-5add-4022-8120-3922bdeb7365"}});
  AF('banners', 'showBanner');
}
