if(!self.define){let s,e={};const n=(n,i)=>(n=new URL(n+".js",i).href,e[n]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=n,s.onload=e,document.head.appendChild(s)}else s=n,importScripts(n),e()})).then((()=>{let s=e[n];if(!s)throw new Error(`Module ${n} didn’t register its module`);return s})));self.define=(i,r)=>{const l=s||("document"in self?document.currentScript.src:"")||location.href;if(e[l])return;let o={};const u=s=>n(s,l),a={module:{uri:l},exports:o,require:u};e[l]=Promise.all(i.map((s=>a[s]||u(s)))).then((s=>(r(...s),o)))}}define(["./workbox-5ffe50d4"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/And-vPRNnjli.webp",revision:null},{url:"assets/Buffer-B3Uvsw-c.webp",revision:null},{url:"assets/ContrastTheme-CNUeCQgT.js",revision:null},{url:"assets/Controls-DoJf3xhx.js",revision:null},{url:"assets/DrawerController-BJiHEJNu.js",revision:null},{url:"assets/DrawerController-CDtfjO5V.css",revision:null},{url:"assets/Icon-BLMZTJzq.js",revision:null},{url:"assets/index-DF7rjwo1.css",revision:null},{url:"assets/index-DIHdjlnv.js",revision:null},{url:"assets/inputIcon-6hipRhQs.png",revision:null},{url:"assets/line_17-DCZvmg7d.svg",revision:null},{url:"assets/line_21-7XHsreHa.svg",revision:null},{url:"assets/line_23-jVsxSHjs.svg",revision:null},{url:"assets/line_24-CAGnot87.svg",revision:null},{url:"assets/line_25-BdrisjEt.svg",revision:null},{url:"assets/line_26-C1cBpm9h.svg",revision:null},{url:"assets/line_27-B3UFdKx_.svg",revision:null},{url:"assets/line_29-Befxc44M.svg",revision:null},{url:"assets/Nand-CeX_LhnV.webp",revision:null},{url:"assets/Nor-CgPoSiw3.webp",revision:null},{url:"assets/Not-CKmu_FXd.webp",revision:null},{url:"assets/Or-D6Cm5Ena.webp",revision:null},{url:"assets/outputIcon-C9FYfgf8.png",revision:null},{url:"assets/worker-worker-DMfFRo21.js",revision:null},{url:"assets/Xnor-D92Hxo_S.webp",revision:null},{url:"assets/Xor-FwkKBC7T.webp",revision:null},{url:"favicons/android-chrome-192x192.png",revision:"460276516f4e814f253fe5198c5cbbce"},{url:"favicons/android-chrome-512x512.png",revision:"53b0cfc0c873085a1cccbda6aee7409f"},{url:"favicons/apple-touch-icon.png",revision:"8d623878e432bf34ed34b76b643fa2f3"},{url:"favicons/favicon-16x16.png",revision:"365d53bac21bbd75439ac4b75adae02b"},{url:"favicons/favicon-32x32.png",revision:"61c1e7e514e215edc6d797fc83d8f14f"},{url:"Fonts/DynamicSchematicRegular.woff2",revision:"82cf07ea47125122d9cf69d26af10356"},{url:"Fonts/vcr_osd_mono_1.001-webfont.woff2",revision:"8cb00a03ce957118b88d70580cdfa094"},{url:"index.html",revision:"b7c9e1b0f4ff8899dfadaad2ecb1c495"},{url:"logicap.png",revision:"29a9ddcb249d0144724c6b3907451304"},{url:"metaImage.png",revision:"65d70246af7b70025d702a7937172390"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"Fonts/DynamicSchematicRegular.otf",revision:"a28e2eff3aacb09a06dfc52bcdbbfd57"},{url:"Fonts/DynamicSchematicRegular.ttf",revision:"915f349840eacf69a35b38918d990463"},{url:"Fonts/DynamicSchematicRegular.woff2",revision:"82cf07ea47125122d9cf69d26af10356"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
