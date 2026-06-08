const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./web-DjvKP0mA.js","./index-38_sbYAS.js","./vendor-DGlXZeyz.js","./index-Cf0SXcSS.css","./icons-Ri5pl4Oq.js","./Home-CB1T70aJ.js","./api-C-givZ-6.js","./Menu-DpXNJepG.js","./Cart-MYw6TRi8.js","./Gallery-SqHwLO5N.js","./AboutUs-BtQjNg-A.js","./Checkout-C2tiRlxO.js","./Login-DTN73OUC.js","./validators-KcHLYWIO.js","./Profile-C_Hkb32j.js","./OrderSuccess-B240YLAv.js","./PaymentSuccess-CkVf84vB.js","./PaymentCancel-CfjBlYtF.js","./OrderTracking-D9qKU6Z5.js","./esm-D4exnVaD.js","./Admin-BWtR1FYY.js","./DriverPanel-BE9fbAKa.js","./DataSeedPage-W50NTFNV.js","./ShopScan-anyIW58u.js"])))=>i.map(i=>d[i]);
import{_ as Ge}from"./index-38_sbYAS.js";import{r as G,j as _,u as vl,a as bl,L as Ze,m as Er,A as rm,b as Nu,B as uT,N as vf,c as lT,d as xe}from"./vendor-DGlXZeyz.js";import{L as hT,U as hs,M as ds,S as Ou,X as sm,a as dT,H as im,b as fT,I as pT,P as gT,c as mT,C as om,F as _T,d as yT,e as IT,f as am,B as wT,g as ET,h as TT,i as cm,j as AT,k as vT}from"./icons-Ri5pl4Oq.js";const um=G.createContext();function bT({children:n}){const[e,t]=G.useState(()=>{try{const l=localStorage.getItem("stm_salam_cart");if(!l)return[];const d=JSON.parse(l);return Array.isArray(d)?d:[]}catch{try{localStorage.removeItem("stm_salam_cart")}catch{}return[]}});G.useEffect(()=>{localStorage.setItem("stm_salam_cart",JSON.stringify(e))},[e]);const r=l=>{t(d=>d.find(g=>g.id===l.id)?d.map(g=>g.id===l.id?{...g,qty:g.qty+1}:g):[...d,{...l,qty:1}])},s=l=>{t(d=>d.filter(f=>f.id!==l))},i=(l,d)=>{t(f=>f.map(g=>{if(g.id===l){const I=Math.max(0,g.qty+d);return{...g,qty:I}}return g}).filter(g=>g.qty>0))},o=()=>t([]),c=e.reduce((l,d)=>l+d.price*d.qty,0),u=e.reduce((l,d)=>l+d.qty,0);return _.jsx(um.Provider,{value:{cartItems:e,addToCart:r,removeFromCart:s,updateQty:i,clearCart:o,subtotal:c,totalItems:u},children:n})}const ST=()=>{const n=G.useContext(um);if(!n)throw new Error("useCart must be used within a CartProvider");return n},RT=()=>{};var bf={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lm=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},PT=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],o=n[t++],c=n[t++],u=((s&7)<<18|(i&63)<<12|(o&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=n[t++],o=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Sl={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],o=s+1<n.length,c=o?n[s+1]:0,u=s+2<n.length,l=u?n[s+2]:0,d=i>>2,f=(i&3)<<4|c>>4;let g=(c&15)<<2|l>>6,I=l&63;u||(I=64,o||(g=64)),r.push(t[d],t[f],t[g],t[I])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(lm(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):PT(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],c=s<n.length?t[n.charAt(s)]:0;++s;const l=s<n.length?t[n.charAt(s)]:64;++s;const f=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||c==null||l==null||f==null)throw new CT;const g=i<<2|c>>4;if(r.push(g),l!==64){const I=c<<4&240|l>>2;if(r.push(I),f!==64){const b=l<<6&192|f;r.push(b)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class CT extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const xT=function(n){const e=lm(n);return Sl.encodeByteArray(e,!0)},_a=function(n){return xT(n).replace(/\./g,"")},hm=function(n){try{return Sl.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rl(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kT=()=>Rl().__FIREBASE_DEFAULTS__,DT=()=>{if(typeof process>"u"||typeof bf>"u")return;const n=bf.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},NT=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&hm(n[1]);return e&&JSON.parse(e)},Ja=()=>{try{return RT()||kT()||DT()||NT()}catch(n){`${n}`;return}},dm=n=>{var e,t;return(t=(e=Ja())==null?void 0:e.emulatorHosts)==null?void 0:t[n]},Pl=n=>{const e=dm(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},fm=()=>{var n;return(n=Ja())==null?void 0:n.config},pm=n=>{var e;return(e=Ja())==null?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ji{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gm(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[_a(JSON.stringify(t)),_a(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ne(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function OT(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ne())}function mm(){var e;const n=(e=Ja())==null?void 0:e.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function VT(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function LT(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function MT(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function FT(){const n=Ne();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function _m(){return!mm()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function ym(){return!mm()&&!!navigator.userAgent&&(navigator.userAgent.includes("Safari")||navigator.userAgent.includes("WebKit"))&&!navigator.userAgent.includes("Chrome")}function io(){try{return typeof indexedDB=="object"}catch{return!1}}function Im(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)==null?void 0:i.message)||"")}}catch(t){e(t)}})}function UT(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jT="FirebaseError";class wt extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=jT,Object.setPrototypeOf(this,wt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Kn.prototype.create)}}class Kn{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?BT(i,r):"Error",c=`${this.serviceName}: ${o} (${s}).`;return new wt(s,c,r)}}function BT(n,e){return n.replace(GT,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const GT=/\{\$([^}]+)}/g;function qT(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Pt(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],o=e[s];if(Sf(i)&&Sf(o)){if(!Pt(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function Sf(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oo(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Ti(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function Ai(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function $T(n,e){const t=new zT(n,e);return t.subscribe.bind(t)}class zT{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");KT(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=ru),s.error===void 0&&(s.error=ru),s.complete===void 0&&(s.complete=ru);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function KT(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function ru(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WT=1e3,HT=2,QT=4*60*60*1e3,JT=.5;function YT(n,e=WT,t=HT){const r=e*Math.pow(t,n),s=Math.round(JT*r*(Math.random()-.5)*2);return Math.min(QT,r+s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Y(n){return n&&n._delegate?n._delegate:n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $t(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function ao(n){return(await fetch(n,{credentials:"include"})).ok}class nt{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ar="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XT{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new ji;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(eA(e))try{this.getOrInitializeService({instanceIdentifier:ar})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=ar){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=ar){return this.instances.has(e)}getOptions(e=ar){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&o.resolve(s)}return s}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:ZT(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=ar){return this.component?this.component.multipleInstances?e:ar:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function ZT(n){return n===ar?void 0:n}function eA(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tA{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new XT(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ne;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(ne||(ne={}));const nA={debug:ne.DEBUG,verbose:ne.VERBOSE,info:ne.INFO,warn:ne.WARN,error:ne.ERROR,silent:ne.SILENT},rA=ne.INFO,sA={[ne.DEBUG]:"log",[ne.VERBOSE]:"log",[ne.INFO]:"info",[ne.WARN]:"warn",[ne.ERROR]:"error"},iA=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=sA[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ya{constructor(e){this.name=e,this._logLevel=rA,this._logHandler=iA,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ne))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?nA[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ne.DEBUG,...e),this._logHandler(this,ne.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ne.VERBOSE,...e),this._logHandler(this,ne.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ne.INFO,...e),this._logHandler(this,ne.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ne.WARN,...e),this._logHandler(this,ne.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ne.ERROR,...e),this._logHandler(this,ne.ERROR,...e)}}const oA=(n,e)=>e.some(t=>n instanceof t);let Rf,Pf;function aA(){return Rf||(Rf=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function cA(){return Pf||(Pf=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const wm=new WeakMap,Vu=new WeakMap,Em=new WeakMap,su=new WeakMap,Cl=new WeakMap;function uA(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",o)},i=()=>{t(Yt(n.result)),s()},o=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&wm.set(t,n)}).catch(()=>{}),Cl.set(e,n),e}function lA(n){if(Vu.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",o),n.removeEventListener("abort",o)},i=()=>{t(),s()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",o),n.addEventListener("abort",o)});Vu.set(n,e)}let Lu={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Vu.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Em.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Yt(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function hA(n){Lu=n(Lu)}function dA(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(iu(this),e,...t);return Em.set(r,e.sort?e.sort():[e]),Yt(r)}:cA().includes(n)?function(...e){return n.apply(iu(this),e),Yt(wm.get(this))}:function(...e){return Yt(n.apply(iu(this),e))}}function fA(n){return typeof n=="function"?dA(n):(n instanceof IDBTransaction&&lA(n),oA(n,aA())?new Proxy(n,Lu):n)}function Yt(n){if(n instanceof IDBRequest)return uA(n);if(su.has(n))return su.get(n);const e=fA(n);return e!==n&&(su.set(n,e),Cl.set(e,n)),e}const iu=n=>Cl.get(n);function Xa(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(n,e),c=Yt(o);return r&&o.addEventListener("upgradeneeded",u=>{r(Yt(o.result),u.oldVersion,u.newVersion,Yt(o.transaction),u)}),t&&o.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),c}function ou(n,{blocked:e}={}){const t=indexedDB.deleteDatabase(n);return e&&t.addEventListener("blocked",r=>e(r.oldVersion,r)),Yt(t).then(()=>{})}const pA=["get","getKey","getAll","getAllKeys","count"],gA=["put","add","delete","clear"],au=new Map;function Cf(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(au.get(e))return au.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=gA.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||pA.includes(t)))return;const i=async function(o,...c){const u=this.transaction(o,s?"readwrite":"readonly");let l=u.store;return r&&(l=l.index(c.shift())),(await Promise.all([l[t](...c),s&&u.done]))[0]};return au.set(e,i),i}hA(n=>({...n,get:(e,t,r)=>Cf(e,t)||n.get(e,t,r),has:(e,t)=>!!Cf(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mA{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(_A(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function _A(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Mu="@firebase/app",xf="0.14.11";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xt=new Ya("@firebase/app"),yA="@firebase/app-compat",IA="@firebase/analytics-compat",wA="@firebase/analytics",EA="@firebase/app-check-compat",TA="@firebase/app-check",AA="@firebase/auth",vA="@firebase/auth-compat",bA="@firebase/database",SA="@firebase/data-connect",RA="@firebase/database-compat",PA="@firebase/functions",CA="@firebase/functions-compat",xA="@firebase/installations",kA="@firebase/installations-compat",DA="@firebase/messaging",NA="@firebase/messaging-compat",OA="@firebase/performance",VA="@firebase/performance-compat",LA="@firebase/remote-config",MA="@firebase/remote-config-compat",FA="@firebase/storage",UA="@firebase/storage-compat",jA="@firebase/firestore",BA="@firebase/ai",GA="@firebase/firestore-compat",qA="firebase",$A="12.12.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ya="[DEFAULT]",zA={[Mu]:"fire-core",[yA]:"fire-core-compat",[wA]:"fire-analytics",[IA]:"fire-analytics-compat",[TA]:"fire-app-check",[EA]:"fire-app-check-compat",[AA]:"fire-auth",[vA]:"fire-auth-compat",[bA]:"fire-rtdb",[SA]:"fire-data-connect",[RA]:"fire-rtdb-compat",[PA]:"fire-fn",[CA]:"fire-fn-compat",[xA]:"fire-iid",[kA]:"fire-iid-compat",[DA]:"fire-fcm",[NA]:"fire-fcm-compat",[OA]:"fire-perf",[VA]:"fire-perf-compat",[LA]:"fire-rc",[MA]:"fire-rc-compat",[FA]:"fire-gcs",[UA]:"fire-gcs-compat",[jA]:"fire-fst",[GA]:"fire-fst-compat",[BA]:"fire-vertex","fire-js":"fire-js",[qA]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ia=new Map,KA=new Map,Fu=new Map;function kf(n,e){try{n.container.addComponent(e)}catch(t){Xt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function ht(n){const e=n.name;if(Fu.has(e))return Xt.debug(`There were multiple attempts to register component ${e}.`),!1;Fu.set(e,n);for(const t of Ia.values())kf(t,n);for(const t of KA.values())kf(t,n);return!0}function Et(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function WA(n,e,t=ya){Et(n,e).clearInstance(t)}function et(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const HA={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},On=new Kn("app","Firebase",HA);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QA{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new nt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw On.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lr=$A;function Tm(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:ya,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw On.create("bad-app-name",{appName:String(s)});if(t||(t=fm()),!t)throw On.create("no-options");const i=Ia.get(s);if(i){if(Pt(t,i.options)&&Pt(r,i.config))return i;throw On.create("duplicate-app",{appName:s})}const o=new tA(s);for(const u of Fu.values())o.addComponent(u);const c=new QA(t,r,o);return Ia.set(s,c),c}function Ls(n=ya){const e=Ia.get(n);if(!e&&n===ya&&fm())return Tm();if(!e)throw On.create("no-app",{appName:n});return e}function $e(n,e,t){let r=zA[n]??n;t&&(r+=`-${t}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const o=[`Unable to register library "${r}" with version "${e}":`];s&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&o.push("and"),i&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Xt.warn(o.join(" "));return}ht(new nt(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const JA="firebase-heartbeat-database",YA=1,Bi="firebase-heartbeat-store";let cu=null;function Am(){return cu||(cu=Xa(JA,YA,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Bi)}catch(t){console.warn(t)}}}}).catch(n=>{throw On.create("idb-open",{originalErrorMessage:n.message})})),cu}async function XA(n){try{const t=(await Am()).transaction(Bi),r=await t.objectStore(Bi).get(vm(n));return await t.done,r}catch(e){if(e instanceof wt)Xt.warn(e.message);else{const t=On.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Xt.warn(t.message)}}}async function Df(n,e){try{const r=(await Am()).transaction(Bi,"readwrite");await r.objectStore(Bi).put(e,vm(n)),await r.done}catch(t){if(t instanceof wt)Xt.warn(t.message);else{const r=On.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Xt.warn(r.message)}}}function vm(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZA=1024,ev=30;class tv{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new rv(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Nf();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>ev){const o=sv(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Xt.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Nf(),{heartbeatsToSend:r,unsentEntries:s}=nv(this._heartbeatsCache.heartbeats),i=_a(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return Xt.warn(t),""}}}function Nf(){return new Date().toISOString().substring(0,10)}function nv(n,e=ZA){const t=[];let r=n.slice();for(const s of n){const i=t.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),Of(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Of(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class rv{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return io()?Im().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await XA(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Df(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Df(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function Of(n){return _a(JSON.stringify({version:2,heartbeats:n})).length}function sv(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iv(n){ht(new nt("platform-logger",e=>new mA(e),"PRIVATE")),ht(new nt("heartbeat",e=>new tv(e),"PRIVATE")),$e(Mu,xf,n),$e(Mu,xf,"esm2020"),$e("fire-js","")}iv("");function bm(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const ov=bm,Sm=new Kn("auth","Firebase",bm());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wa=new Ya("@firebase/auth");function av(n,...e){wa.logLevel<=ne.WARN&&wa.warn(`Auth (${Lr}): ${n}`,...e)}function na(n,...e){wa.logLevel<=ne.ERROR&&wa.error(`Auth (${Lr}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ct(n,...e){throw xl(n,...e)}function Ft(n,...e){return xl(n,...e)}function Rm(n,e,t){const r={...ov(),[e]:t};return new Kn("auth","Firebase",r).create(e,{appName:n.name})}function Ut(n){return Rm(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function xl(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Sm.create(n,...e)}function W(n,e,...t){if(!n)throw xl(e,...t)}function Wt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw na(e),new Error(e)}function Zt(n,e){n||Wt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uu(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function cv(){return Vf()==="http:"||Vf()==="https:"}function Vf(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uv(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(cv()||LT()||"connection"in navigator)?navigator.onLine:!0}function lv(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class co{constructor(e,t){this.shortDelay=e,this.longDelay=t,Zt(t>e,"Short delay should be less than long delay!"),this.isMobile=OT()||MT()}get(){return uv()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kl(n,e){Zt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pm{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Wt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Wt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Wt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hv={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dv=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],fv=new co(3e4,6e4);function an(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function zt(n,e,t,r,s={}){return Cm(n,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const c=oo({key:n.config.apiKey,...o}).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const l={method:e,headers:u,...i};return VT()||(l.referrerPolicy="no-referrer"),n.emulatorConfig&&$t(n.emulatorConfig.host)&&(l.credentials="include"),Pm.fetch()(await xm(n,n.config.apiHost,t,c),l)})}async function Cm(n,e,t){n._canInitEmulator=!1;const r={...hv,...e};try{const s=new gv(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw qo(n,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const c=i.ok?o.errorMessage:o.error.message,[u,l]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw qo(n,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw qo(n,"email-already-in-use",o);if(u==="USER_DISABLED")throw qo(n,"user-disabled",o);const d=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Rm(n,d,l);Ct(n,d)}}catch(s){if(s instanceof wt)throw s;Ct(n,"network-request-failed",{message:String(s)})}}async function uo(n,e,t,r,s={}){const i=await zt(n,e,t,r,s);return"mfaPendingCredential"in i&&Ct(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function xm(n,e,t,r){const s=`${e}${t}?${r}`,i=n,o=i.config.emulator?kl(n.config,s):`${n.config.apiScheme}://${s}`;return dv.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}function pv(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class gv{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Ft(this.auth,"network-request-failed")),fv.get())})}}function qo(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=Ft(n,e,r);return s.customData._tokenResponse=t,s}function Lf(n){return n!==void 0&&n.enterprise!==void 0}class mv{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return pv(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function _v(n,e){return zt(n,"GET","/v2/recaptchaConfig",an(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yv(n,e){return zt(n,"POST","/v1/accounts:delete",e)}async function Ea(n,e){return zt(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pi(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function km(n,e=!1){const t=Y(n),r=await t.getIdToken(e),s=Dl(r);W(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:Pi(uu(s.auth_time)),issuedAtTime:Pi(uu(s.iat)),expirationTime:Pi(uu(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function uu(n){return Number(n)*1e3}function Dl(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return na("JWT malformed, contained fewer than 3 sections"),null;try{const s=hm(t);return s?JSON.parse(s):(na("Failed to decode base64 JWT payload"),null)}catch(s){return na("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Mf(n){const e=Dl(n);return W(e,"internal-error"),W(typeof e.exp<"u","internal-error"),W(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fs(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof wt&&Iv(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function Iv({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wv{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ju{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Pi(this.lastLoginAt),this.creationTime=Pi(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ta(n){var f;const e=n.auth,t=await n.getIdToken(),r=await fs(n,Ea(e,{idToken:t}));W(r==null?void 0:r.users.length,e,"internal-error");const s=r.users[0];n._notifyReloadListener(s);const i=(f=s.providerUserInfo)!=null&&f.length?Dm(s.providerUserInfo):[],o=Tv(n.providerData,i),c=n.isAnonymous,u=!(n.email&&s.passwordHash)&&!(o!=null&&o.length),l=c?u:!1,d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new ju(s.createdAt,s.lastLoginAt),isAnonymous:l};Object.assign(n,d)}async function Ev(n){const e=Y(n);await Ta(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Tv(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Dm(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Av(n,e){const t=await Cm(n,{},async()=>{const r=oo({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,o=await xm(n,s,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:c,body:r};return n.emulatorConfig&&$t(n.emulatorConfig.host)&&(u.credentials="include"),Pm.fetch()(o,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function vv(n,e){return zt(n,"POST","/v2/accounts:revokeToken",an(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class is{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){W(e.idToken,"internal-error"),W(typeof e.idToken<"u","internal-error"),W(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Mf(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){W(e.length!==0,"internal-error");const t=Mf(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(W(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await Av(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,o=new is;return r&&(W(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(W(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(W(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new is,this.toJSON())}_performRefresh(){return Wt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wn(n,e){W(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class At{constructor({uid:e,auth:t,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new wv(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new ju(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await fs(this,this.stsTokenManager.getToken(this.auth,e));return W(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return km(this,e)}reload(){return Ev(this)}_assign(e){this!==e&&(W(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new At({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){W(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Ta(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(et(this.auth.app))return Promise.reject(Ut(this.auth));const e=await this.getIdToken();return await fs(this,yv(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,o=t.photoURL??void 0,c=t.tenantId??void 0,u=t._redirectEventId??void 0,l=t.createdAt??void 0,d=t.lastLoginAt??void 0,{uid:f,emailVerified:g,isAnonymous:I,providerData:b,stsTokenManager:P}=t;W(f&&P,e,"internal-error");const k=is.fromJSON(this.name,P);W(typeof f=="string",e,"internal-error"),wn(r,e.name),wn(s,e.name),W(typeof g=="boolean",e,"internal-error"),W(typeof I=="boolean",e,"internal-error"),wn(i,e.name),wn(o,e.name),wn(c,e.name),wn(u,e.name),wn(l,e.name),wn(d,e.name);const V=new At({uid:f,auth:e,email:s,emailVerified:g,displayName:r,isAnonymous:I,photoURL:o,phoneNumber:i,tenantId:c,stsTokenManager:k,createdAt:l,lastLoginAt:d});return b&&Array.isArray(b)&&(V.providerData=b.map(j=>({...j}))),u&&(V._redirectEventId=u),V}static async _fromIdTokenResponse(e,t,r=!1){const s=new is;s.updateFromServerResponse(t);const i=new At({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Ta(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];W(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Dm(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),c=new is;c.updateFromIdToken(r);const u=new At({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:o}),l={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new ju(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(u,l),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ff=new Map;function Ht(n){Zt(n instanceof Function,"Expected a class definition");let e=Ff.get(n);return e?(Zt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Ff.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nm{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Nm.type="NONE";const Uf=Nm;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ra(n,e,t){return`firebase:${n}:${e}:${t}`}class os{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=ra(this.userKey,s.apiKey,i),this.fullPersistenceKey=ra("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Ea(this.auth,{idToken:e}).catch(()=>{});return t?At._fromGetAccountInfoResponse(this.auth,t,e):null}return At._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new os(Ht(Uf),e,r);const s=(await Promise.all(t.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let i=s[0]||Ht(Uf);const o=ra(r,e.config.apiKey,e.name);let c=null;for(const l of t)try{const d=await l._get(o);if(d){let f;if(typeof d=="string"){const g=await Ea(e,{idToken:d}).catch(()=>{});if(!g)break;f=await At._fromGetAccountInfoResponse(e,g,d)}else f=At._fromJSON(e,d);l!==i&&(c=f),i=l;break}}catch{}const u=s.filter(l=>l._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new os(i,e,r):(i=u[0],c&&await i._set(o,c.toJSON()),await Promise.all(t.map(async l=>{if(l!==i)try{await l._remove(o)}catch{}})),new os(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jf(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Mm(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Om(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Um(e))return"Blackberry";if(jm(e))return"Webos";if(Vm(e))return"Safari";if((e.includes("chrome/")||Lm(e))&&!e.includes("edge/"))return"Chrome";if(Fm(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Om(n=Ne()){return/firefox\//i.test(n)}function Vm(n=Ne()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Lm(n=Ne()){return/crios\//i.test(n)}function Mm(n=Ne()){return/iemobile/i.test(n)}function Fm(n=Ne()){return/android/i.test(n)}function Um(n=Ne()){return/blackberry/i.test(n)}function jm(n=Ne()){return/webos/i.test(n)}function Nl(n=Ne()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function bv(n=Ne()){var e;return Nl(n)&&!!((e=window.navigator)!=null&&e.standalone)}function Sv(){return FT()&&document.documentMode===10}function Bm(n=Ne()){return Nl(n)||Fm(n)||jm(n)||Um(n)||/windows phone/i.test(n)||Mm(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gm(n,e=[]){let t;switch(n){case"Browser":t=jf(Ne());break;case"Worker":t=`${jf(Ne())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Lr}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rv{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((o,c)=>{try{const u=e(i);o(u)}catch(u){c(u)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Pv(n,e={}){return zt(n,"GET","/v2/passwordPolicy",an(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cv=6;class xv{constructor(e){var r;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??Cv,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=e.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kv{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Bf(this),this.idTokenSubscription=new Bf(this),this.beforeStateQueue=new Rv(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Sm,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Ht(t)),this._initializationPromise=this.queue(async()=>{var r,s,i;if(!this._deleted&&(this.persistenceManager=await os.create(this,e),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Ea(this,{idToken:e}),r=await At._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var i;if(et(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(i=this.redirectUser)==null?void 0:i._redirectEventId,c=r==null?void 0:r._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===c)&&(u!=null&&u.user)&&(r=u.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(o){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return W(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Ta(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=lv()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(et(this.app))return Promise.reject(Ut(this));const t=e?Y(e):null;return t&&W(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&W(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return et(this.app)?Promise.reject(Ut(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return et(this.app)?Promise.reject(Ut(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Ht(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Pv(this),t=new xv(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Kn("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await vv(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Ht(e)||this._popupRedirectResolver;W(t,this,"argument-error"),this.redirectPersistenceManager=await os.create(this,[Ht(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(W(c,this,"internal-error"),c.then(()=>{o||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,r,s);return()=>{o=!0,u()}}else{const u=e.addObserver(t);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return W(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Gm(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){var t;if(et(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&av(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function cn(n){return Y(n)}class Bf{constructor(e){this.auth=e,this.observer=null,this.addObserver=$T(t=>this.observer=t)}get next(){return W(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Za={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Dv(n){Za=n}function qm(n){return Za.loadJS(n)}function Nv(){return Za.recaptchaEnterpriseScript}function Ov(){return Za.gapiScript}function Vv(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class Lv{constructor(){this.enterprise=new Mv}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class Mv{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const Fv="recaptcha-enterprise",$m="NO_RECAPTCHA";class Uv{constructor(e){this.type=Fv,this.auth=cn(e)}async verify(e="verify",t=!1){async function r(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,c)=>{_v(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const l=new mv(u);return i.tenantId==null?i._agentRecaptchaConfig=l:i._tenantRecaptchaConfigs[i.tenantId]=l,o(l.siteKey)}}).catch(u=>{c(u)})})}function s(i,o,c){const u=window.grecaptcha;Lf(u)?u.enterprise.ready(()=>{u.enterprise.execute(i,{action:e}).then(l=>{o(l)}).catch(()=>{o($m)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new Lv().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{r(this.auth).then(c=>{if(!t&&Lf(window.grecaptcha))s(c,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let u=Nv();u.length!==0&&(u+=c),qm(u).then(()=>{s(c,i,o)}).catch(l=>{o(l)})}}).catch(c=>{o(c)})})}}async function Gf(n,e,t,r=!1,s=!1){const i=new Uv(n);let o;if(s)o=$m;else try{o=await i.verify(t)}catch{o=await i.verify(t,!0)}const c={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const u=c.phoneEnrollmentInfo.phoneNumber,l=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:l,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const u=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:o}):Object.assign(c,{captchaResponse:o}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function Aa(n,e,t,r,s){var i;if((i=n._getRecaptchaConfig())!=null&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await Gf(n,e,t,t==="getOobCode");return r(n,o)}else return r(n,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){`${t}`;const c=await Gf(n,e,t,t==="getOobCode");return r(n,c)}else return Promise.reject(o)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jv(n,e){const t=Et(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(Pt(i,e??{}))return s;Ct(s,"already-initialized")}return t.initialize({options:e})}function Bv(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(Ht);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function Gv(n,e,t){const r=cn(n);W(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=zm(e),{host:o,port:c}=qv(e),u=c===null?"":`:${c}`,l={url:`${i}//${o}${u}/`},d=Object.freeze({host:o,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){W(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),W(Pt(l,r.config.emulator)&&Pt(d,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=l,r.emulatorConfig=d,r.settings.appVerificationDisabledForTesting=!0,$t(o)?ao(`${i}//${o}${u}`):$v()}function zm(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function qv(n){const e=zm(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:qf(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:qf(o)}}}function qf(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function $v(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ol{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Wt("not implemented")}_getIdTokenResponse(e){return Wt("not implemented")}_linkToIdToken(e,t){return Wt("not implemented")}_getReauthenticationResolver(e){return Wt("not implemented")}}async function zv(n,e){return zt(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Kv(n,e){return uo(n,"POST","/v1/accounts:signInWithPassword",an(n,e))}async function Km(n,e){return zt(n,"POST","/v1/accounts:sendOobCode",an(n,e))}async function Wv(n,e){return Km(n,e)}async function Hv(n,e){return Km(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qv(n,e){return uo(n,"POST","/v1/accounts:signInWithEmailLink",an(n,e))}async function Jv(n,e){return uo(n,"POST","/v1/accounts:signInWithEmailLink",an(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gi extends Ol{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new Gi(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new Gi(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Aa(e,t,"signInWithPassword",Kv);case"emailLink":return Qv(e,{email:this._email,oobCode:this._password});default:Ct(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Aa(e,r,"signUpPassword",zv);case"emailLink":return Jv(e,{idToken:t,email:this._email,oobCode:this._password});default:Ct(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function as(n,e){return uo(n,"POST","/v1/accounts:signInWithIdp",an(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yv="http://localhost";class Tr extends Ol{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Tr(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Ct("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=t;if(!r||!s)return null;const o=new Tr(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return as(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,as(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,as(e,t)}buildRequest(){const e={requestUri:Yv,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=oo(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xv(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Zv(n){const e=Ti(Ai(n)).link,t=e?Ti(Ai(e)).deep_link_id:null,r=Ti(Ai(n)).deep_link_id;return(r?Ti(Ai(r)).link:null)||r||t||e||n}class Vl{constructor(e){const t=Ti(Ai(e)),r=t.apiKey??null,s=t.oobCode??null,i=Xv(t.mode??null);W(r&&s&&i,"argument-error"),this.apiKey=r,this.operation=i,this.code=s,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=Zv(e);try{return new Vl(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ms{constructor(){this.providerId=Ms.PROVIDER_ID}static credential(e,t){return Gi._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=Vl.parseLink(t);return W(r,"argument-error"),Gi._fromEmailAndCode(e,r.code,r.tenantId)}}Ms.PROVIDER_ID="password";Ms.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Ms.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wm{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lo extends Wm{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vn extends lo{constructor(){super("facebook.com")}static credential(e){return Tr._fromParams({providerId:vn.PROVIDER_ID,signInMethod:vn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return vn.credentialFromTaggedObject(e)}static credentialFromError(e){return vn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return vn.credential(e.oauthAccessToken)}catch{return null}}}vn.FACEBOOK_SIGN_IN_METHOD="facebook.com";vn.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bn extends lo{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Tr._fromParams({providerId:bn.PROVIDER_ID,signInMethod:bn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return bn.credentialFromTaggedObject(e)}static credentialFromError(e){return bn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return bn.credential(t,r)}catch{return null}}}bn.GOOGLE_SIGN_IN_METHOD="google.com";bn.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sn extends lo{constructor(){super("github.com")}static credential(e){return Tr._fromParams({providerId:Sn.PROVIDER_ID,signInMethod:Sn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Sn.credentialFromTaggedObject(e)}static credentialFromError(e){return Sn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Sn.credential(e.oauthAccessToken)}catch{return null}}}Sn.GITHUB_SIGN_IN_METHOD="github.com";Sn.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rn extends lo{constructor(){super("twitter.com")}static credential(e,t){return Tr._fromParams({providerId:Rn.PROVIDER_ID,signInMethod:Rn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Rn.credentialFromTaggedObject(e)}static credentialFromError(e){return Rn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Rn.credential(t,r)}catch{return null}}}Rn.TWITTER_SIGN_IN_METHOD="twitter.com";Rn.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Hm(n,e){return uo(n,"POST","/v1/accounts:signUp",an(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class en{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await At._fromIdTokenResponse(e,r,s),o=$f(r);return new en({user:i,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=$f(r);return new en({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function $f(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function w1(n){var s;if(et(n.app))return Promise.reject(Ut(n));const e=cn(n);if(await e._initializationPromise,(s=e.currentUser)!=null&&s.isAnonymous)return new en({user:e.currentUser,providerId:null,operationType:"signIn"});const t=await Hm(e,{returnSecureToken:!0}),r=await en._fromIdTokenResponse(e,"signIn",t,!0);return await e._updateCurrentUser(r.user),r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class va extends wt{constructor(e,t,r,s){super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,va.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new va(e,t,r,s)}}function Qm(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?va._fromErrorAndOperation(n,i,e,r):i})}async function eb(n,e,t=!1){const r=await fs(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return en._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tb(n,e,t=!1){const{auth:r}=n;if(et(r.app))return Promise.reject(Ut(r));const s="reauthenticate";try{const i=await fs(n,Qm(r,s,e,n),t);W(i.idToken,r,"internal-error");const o=Dl(i.idToken);W(o,r,"internal-error");const{sub:c}=o;return W(n.uid===c,r,"user-mismatch"),en._forOperation(n,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&Ct(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Jm(n,e,t=!1){if(et(n.app))return Promise.reject(Ut(n));const r="signIn",s=await Qm(n,r,e),i=await en._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}async function nb(n,e){return Jm(cn(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ym(n){const e=cn(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function E1(n,e,t){const r=cn(n);await Aa(r,{requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"},"getOobCode",Hv)}async function T1(n,e,t){if(et(n.app))return Promise.reject(Ut(n));const r=cn(n),o=await Aa(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Hm).catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&Ym(n),u}),c=await en._fromIdTokenResponse(r,"signIn",o);return await r._updateCurrentUser(c.user),c}function A1(n,e,t){return et(n.app)?Promise.reject(Ut(n)):nb(Y(n),Ms.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Ym(n),r})}async function v1(n,e){const t=Y(n),s={requestType:"VERIFY_EMAIL",idToken:await n.getIdToken()},{email:i}=await Wv(t.auth,s);i!==n.email&&await n.reload()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rb(n,e){return zt(n,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function b1(n,{displayName:e,photoURL:t}){if(e===void 0&&t===void 0)return;const r=Y(n),i={idToken:await r.getIdToken(),displayName:e,photoUrl:t,returnSecureToken:!0},o=await fs(r,rb(r.auth,i));r.displayName=o.displayName||null,r.photoURL=o.photoUrl||null;const c=r.providerData.find(({providerId:u})=>u==="password");c&&(c.displayName=r.displayName,c.photoURL=r.photoURL),await r._updateTokensIfNecessary(o)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function S1(n,e){return Y(n).setPersistence(e)}function sb(n,e,t,r){return Y(n).onIdTokenChanged(e,t,r)}function ib(n,e,t){return Y(n).beforeAuthStateChanged(e,t)}function ob(n,e,t,r){return Y(n).onAuthStateChanged(e,t,r)}const ba="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xm{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(ba,"1"),this.storage.removeItem(ba),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ab=1e3,cb=10;class Zm extends Xm{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Bm(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,u)=>{this.notifyListeners(o,u)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);Sv()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,cb):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},ab)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Zm.type="LOCAL";const ub=Zm;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e_ extends Xm{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}e_.type="SESSION";const t_=e_;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lb(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ec{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new ec(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(o).map(async l=>l(t.origin,i)),u=await lb(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ec.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ll(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hb{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((c,u)=>{const l=Ll("",20);s.port1.start();const d=setTimeout(()=>{u(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(f){const g=f;if(g.data.eventId===l)switch(g.data.status){case"ack":clearTimeout(d),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(g.data.response);break;default:clearTimeout(d),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jt(){return window}function db(n){jt().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function n_(){return typeof jt().WorkerGlobalScope<"u"&&typeof jt().importScripts=="function"}async function fb(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function pb(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function gb(){return n_()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const r_="firebaseLocalStorageDb",mb=1,Sa="firebaseLocalStorage",s_="fbase_key";class ho{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function tc(n,e){return n.transaction([Sa],e?"readwrite":"readonly").objectStore(Sa)}function _b(){const n=indexedDB.deleteDatabase(r_);return new ho(n).toPromise()}function Bu(){const n=indexedDB.open(r_,mb);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Sa,{keyPath:s_})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Sa)?e(r):(r.close(),await _b(),e(await Bu()))})})}async function zf(n,e,t){const r=tc(n,!0).put({[s_]:e,value:t});return new ho(r).toPromise()}async function yb(n,e){const t=tc(n,!1).get(e),r=await new ho(t).toPromise();return r===void 0?null:r.value}function Kf(n,e){const t=tc(n,!0).delete(e);return new ho(t).toPromise()}const Ib=800,wb=3;class i_{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Bu(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>wb)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return n_()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ec._getInstance(gb()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,r;if(this.activeServiceWorker=await fb(),!this.activeServiceWorker)return;this.sender=new hb(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(r=e[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||pb()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Bu();return await zf(e,ba,"1"),await Kf(e,ba),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>zf(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>yb(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Kf(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=tc(s,!1).getAll();return new ho(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Ib)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}i_.type="LOCAL";const Eb=i_;new co(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tb(n,e){return e?Ht(e):(W(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ml extends Ol{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return as(e,this._buildIdpRequest())}_linkToIdToken(e,t){return as(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return as(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Ab(n){return Jm(n.auth,new Ml(n),n.bypassAuthState)}function vb(n){const{auth:e,user:t}=n;return W(t,e,"internal-error"),tb(t,new Ml(n),n.bypassAuthState)}async function bb(n){const{auth:e,user:t}=n;return W(t,e,"internal-error"),eb(t,new Ml(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class o_{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:o,type:c}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Ab;case"linkViaPopup":case"linkViaRedirect":return bb;case"reauthViaPopup":case"reauthViaRedirect":return vb;default:Ct(this.auth,"internal-error")}}resolve(e){Zt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Zt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sb=new co(2e3,1e4);class rs extends o_{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,rs.currentPopupAction&&rs.currentPopupAction.cancel(),rs.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return W(e,this.auth,"internal-error"),e}async onExecution(){Zt(this.filter.length===1,"Popup operations only handle one event");const e=Ll();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Ft(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(Ft(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,rs.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if((r=(t=this.authWindow)==null?void 0:t.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ft(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Sb.get())};e()}}rs.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rb="pendingRedirect",sa=new Map;class Pb extends o_{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=sa.get(this.auth._key());if(!e){try{const r=await Cb(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}sa.set(this.auth._key(),e)}return this.bypassAuthState||sa.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Cb(n,e){const t=Db(e),r=kb(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function xb(n,e){sa.set(n._key(),e)}function kb(n){return Ht(n._redirectPersistence)}function Db(n){return ra(Rb,n.config.apiKey,n.name)}async function Nb(n,e,t=!1){if(et(n.app))return Promise.reject(Ut(n));const r=cn(n),s=Tb(r,e),o=await new Pb(r,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ob=10*60*1e3;class Vb{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Lb(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!a_(e)){const s=((r=e.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";t.onError(Ft(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Ob&&this.cachedEventUids.clear(),this.cachedEventUids.has(Wf(e))}saveEventToCache(e){this.cachedEventUids.add(Wf(e)),this.lastProcessedEventTime=Date.now()}}function Wf(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function a_({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Lb(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return a_(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Mb(n,e={}){return zt(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fb=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Ub=/^https?/;async function jb(n){if(n.config.emulator)return;const{authorizedDomains:e}=await Mb(n);for(const t of e)try{if(Bb(t))return}catch{}Ct(n,"unauthorized-domain")}function Bb(n){const e=Uu(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!Ub.test(t))return!1;if(Fb.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gb=new co(3e4,6e4);function Hf(){const n=jt().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function qb(n){return new Promise((e,t)=>{var s,i,o;function r(){Hf(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Hf(),t(Ft(n,"network-request-failed"))},timeout:Gb.get()})}if((i=(s=jt().gapi)==null?void 0:s.iframes)!=null&&i.Iframe)e(gapi.iframes.getContext());else if((o=jt().gapi)!=null&&o.load)r();else{const c=Vv("iframefcb");return jt()[c]=()=>{gapi.load?r():t(Ft(n,"network-request-failed"))},qm(`${Ov()}?onload=${c}`).catch(u=>t(u))}}).catch(e=>{throw ia=null,e})}let ia=null;function $b(n){return ia=ia||qb(n),ia}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zb=new co(5e3,15e3),Kb="__/auth/iframe",Wb="emulator/auth/iframe",Hb={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Qb=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Jb(n){const e=n.config;W(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?kl(e,Wb):`https://${n.config.authDomain}/${Kb}`,r={apiKey:e.apiKey,appName:n.name,v:Lr},s=Qb.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${oo(r).slice(1)}`}async function Yb(n){const e=await $b(n),t=jt().gapi;return W(t,n,"internal-error"),e.open({where:document.body,url:Jb(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Hb,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=Ft(n,"network-request-failed"),c=jt().setTimeout(()=>{i(o)},zb.get());function u(){jt().clearTimeout(c),s(r)}r.ping(u).then(u,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xb={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Zb=500,eS=600,tS="_blank",nS="http://localhost";class Qf{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function rS(n,e,t,r=Zb,s=eS){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const u={...Xb,width:r.toString(),height:s.toString(),top:i,left:o},l=Ne().toLowerCase();t&&(c=Lm(l)?tS:t),Om(l)&&(e=e||nS,u.scrollbars="yes");const d=Object.entries(u).reduce((g,[I,b])=>`${g}${I}=${b},`,"");if(bv(l)&&c!=="_self")return sS(e||"",c),new Qf(null);const f=window.open(e||"",c,d);W(f,n,"popup-blocked");try{f.focus()}catch{}return new Qf(f)}function sS(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iS="__/auth/handler",oS="emulator/auth/handler",aS=encodeURIComponent("fac");async function Jf(n,e,t,r,s,i){W(n.config.authDomain,n,"auth-domain-config-required"),W(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Lr,eventId:s};if(e instanceof Wm){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",qT(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,f]of Object.entries({}))o[d]=f}if(e instanceof lo){const d=e.getScopes().filter(f=>f!=="");d.length>0&&(o.scopes=d.join(","))}n.tenantId&&(o.tid=n.tenantId);const c=o;for(const d of Object.keys(c))c[d]===void 0&&delete c[d];const u=await n._getAppCheckToken(),l=u?`#${aS}=${encodeURIComponent(u)}`:"";return`${cS(n)}?${oo(c).slice(1)}${l}`}function cS({config:n}){return n.emulator?kl(n,oS):`https://${n.authDomain}/${iS}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lu="webStorageSupport";class uS{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=t_,this._completeRedirectFn=Nb,this._overrideRedirectResult=xb}async _openPopup(e,t,r,s){var o;Zt((o=this.eventManagers[e._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const i=await Jf(e,t,r,Uu(),s);return rS(e,i,Ll())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await Jf(e,t,r,Uu(),s);return db(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(Zt(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await Yb(e),r=new Vb(e);return t.register("authEvent",s=>(W(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(lu,{type:lu},s=>{var o;const i=(o=s==null?void 0:s[0])==null?void 0:o[lu];i!==void 0&&t(!!i),Ct(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=jb(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Bm()||Vm()||Nl()}}const lS=uS;var Yf="@firebase/auth",Xf="1.13.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hS{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){W(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dS(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function fS(n){ht(new nt("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;W(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:o,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Gm(n)},l=new kv(r,s,i,u);return Bv(l,t),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),ht(new nt("auth-internal",e=>{const t=cn(e.getProvider("auth").getImmediate());return(r=>new hS(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),$e(Yf,Xf,dS(n)),$e(Yf,Xf,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pS=5*60,gS=pm("authIdTokenMaxAge")||pS;let Zf=null;const mS=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>gS)return;const s=t==null?void 0:t.token;Zf!==s&&(Zf=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function _S(n=Ls()){const e=Et(n,"auth");if(e.isInitialized())return e.getImmediate();const t=jv(n,{popupRedirectResolver:lS,persistence:[Eb,ub,t_]}),r=pm("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=mS(i.toString());ib(t,o,()=>o(t.currentUser)),sb(t,c=>o(c))}}const s=dm("auth");return s&&Gv(t,`http://${s}`),t}function yS(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}Dv({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=Ft("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",yS().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});fS("Browser");var IS="firebase",wS="12.12.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */$e(IS,wS,"app");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gu=new Map,c_={activated:!1,tokenObservers:[]},ES={initialized:!1,enabled:!1};function De(n){return Gu.get(n)||{...c_}}function TS(n,e){return Gu.set(n,e),Gu.get(n)}function nc(){return ES}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const u_="https://content-firebaseappcheck.googleapis.com/v1",AS="exchangeRecaptchaV3Token",vS="exchangeDebugToken",ep={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:16*60*1e3},bS=24*60*60*1e3;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SS{constructor(e,t,r,s,i){if(this.operation=e,this.retryPolicy=t,this.getWaitDuration=r,this.lowerBound=s,this.upperBound=i,this.pending=null,this.nextErrorWaitInterval=s,s>i)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new ji,this.pending.promise.catch(t=>{}),await RS(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new ji,this.pending.promise.catch(t=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(t){this.retryPolicy(t)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const t=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),t}}}function RS(n){return new Promise(e=>{setTimeout(e,n)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PS={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.","initial-throttle":"{$httpStatus} error. Attempts allowed again after {$time}",throttled:"Requests throttled due to previous {$httpStatus} error. Attempts allowed again after {$time}"},st=new Kn("appCheck","AppCheck",PS);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tp(n=!1){var e;return n?(e=self.grecaptcha)==null?void 0:e.enterprise:self.grecaptcha}function Fl(n){if(!De(n).activated)throw st.create("use-before-activation",{appName:n.name})}function l_(n){const e=Math.round(n/1e3),t=Math.floor(e/(3600*24)),r=Math.floor((e-t*3600*24)/3600),s=Math.floor((e-t*3600*24-r*3600)/60),i=e-t*3600*24-r*3600-s*60;let o="";return t&&(o+=$o(t)+"d:"),r&&(o+=$o(r)+"h:"),o+=$o(s)+"m:"+$o(i)+"s",o}function $o(n){return n===0?"00":n>=10?n.toString():"0"+n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ul({url:n,body:e},t){const r={"Content-Type":"application/json"},s=t.getImmediate({optional:!0});if(s){const f=await s.getHeartbeatsHeader();f&&(r["X-Firebase-Client"]=f)}const i={method:"POST",body:JSON.stringify(e),headers:r};let o;try{o=await fetch(n,i)}catch(f){throw st.create("fetch-network-error",{originalErrorMessage:f==null?void 0:f.message})}if(o.status!==200)throw st.create("fetch-status-error",{httpStatus:o.status});let c;try{c=await o.json()}catch(f){throw st.create("fetch-parse-error",{originalErrorMessage:f==null?void 0:f.message})}const u=c.ttl.match(/^([\d.]+)(s)$/);if(!u||!u[2]||isNaN(Number(u[1])))throw st.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${c.ttl}`});const l=Number(u[1])*1e3,d=Date.now();return{token:c.token,expireTimeMillis:d+l,issuedAtTimeMillis:d}}function CS(n,e){const{projectId:t,appId:r,apiKey:s}=n.options;return{url:`${u_}/projects/${t}/apps/${r}:${AS}?key=${s}`,body:{recaptcha_v3_token:e}}}function h_(n,e){const{projectId:t,appId:r,apiKey:s}=n.options;return{url:`${u_}/projects/${t}/apps/${r}:${vS}?key=${s}`,body:{debug_token:e}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xS="firebase-app-check-database",kS=1,qi="firebase-app-check-store",d_="debug-token";let zo=null;function f_(){return zo||(zo=new Promise((n,e)=>{try{const t=indexedDB.open(xS,kS);t.onsuccess=r=>{n(r.target.result)},t.onerror=r=>{var s;e(st.create("storage-open",{originalErrorMessage:(s=r.target.error)==null?void 0:s.message}))},t.onupgradeneeded=r=>{const s=r.target.result;switch(r.oldVersion){case 0:s.createObjectStore(qi,{keyPath:"compositeKey"})}}}catch(t){e(st.create("storage-open",{originalErrorMessage:t==null?void 0:t.message}))}}),zo)}function DS(n){return g_(m_(n))}function NS(n,e){return p_(m_(n),e)}function OS(n){return p_(d_,n)}function VS(){return g_(d_)}async function p_(n,e){const r=(await f_()).transaction(qi,"readwrite"),i=r.objectStore(qi).put({compositeKey:n,value:e});return new Promise((o,c)=>{i.onsuccess=u=>{o()},r.onerror=u=>{var l;c(st.create("storage-set",{originalErrorMessage:(l=u.target.error)==null?void 0:l.message}))}})}async function g_(n){const t=(await f_()).transaction(qi,"readonly"),s=t.objectStore(qi).get(n);return new Promise((i,o)=>{s.onsuccess=c=>{const u=c.target.result;i(u?u.value:void 0)},t.onerror=c=>{var u;o(st.create("storage-get",{originalErrorMessage:(u=c.target.error)==null?void 0:u.message}))}})}function m_(n){return`${n.options.appId}-${n.name}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kn=new Ya("@firebase/app-check");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function LS(n){if(io()){let e;try{e=await DS(n)}catch(t){kn.warn(`Failed to read token from IndexedDB. Error: ${t}`)}return e}}function hu(n,e){return io()?NS(n,e).catch(t=>{kn.warn(`Failed to write token to IndexedDB. Error: ${t}`)}):Promise.resolve()}async function MS(){let n;try{n=await VS()}catch{}if(n)return n;{const e=crypto.randomUUID();return OS(e).catch(t=>kn.warn(`Failed to persist debug token to IndexedDB. Error: ${t}`)),e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jl(){return nc().enabled}async function Bl(){const n=nc();if(n.enabled&&n.token)return n.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function FS(){const n=Rl(),e=nc();if(e.initialized=!0,typeof n.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&n.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;e.enabled=!0;const t=new ji;e.token=t,typeof n.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?t.resolve(n.FIREBASE_APPCHECK_DEBUG_TOKEN):t.resolve(MS())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const US={error:"UNKNOWN_ERROR"};function jS(n){return Sl.encodeString(JSON.stringify(n),!1)}async function Ra(n,e=!1,t=!1){const r=n.app;Fl(r);const s=De(r);let i=s.token,o;if(i&&!ss(i)&&(s.token=void 0,i=void 0),!i){const l=await s.cachedTokenPromise;l&&(ss(l)?i=l:await hu(r,void 0))}if(!e&&i&&ss(i))return{token:i.token};let c=!1;if(jl())try{const l=await Bl();s.exchangeTokenPromise||(s.exchangeTokenPromise=Ul(h_(r,l),n.heartbeatServiceProvider).finally(()=>{s.exchangeTokenPromise=void 0}),c=!0);const d=await s.exchangeTokenPromise;return await hu(r,d),s.token=d,{token:d.token}}catch(l){return l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?kn.warn(l.message):t&&kn.error(l),du(l)}try{s.exchangeTokenPromise||(s.exchangeTokenPromise=s.provider.getToken().finally(()=>{s.exchangeTokenPromise=void 0}),c=!0),i=await De(r).exchangeTokenPromise}catch(l){l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?kn.warn(l.message):t&&kn.error(l),o=l}let u;return i?o?ss(i)?u={token:i.token,internalError:o}:u=du(o):(u={token:i.token},s.token=i,await hu(r,i)):u=du(o),c&&I_(r,u),u}async function BS(n){const e=n.app;Fl(e);const{provider:t}=De(e);if(jl()){const r=await Bl(),{token:s}=await Ul(h_(e,r),n.heartbeatServiceProvider);return{token:s}}else{const{token:r}=await t.getToken();return{token:r}}}function __(n,e,t,r){const{app:s}=n,i=De(s),o={next:t,error:r,type:e};if(i.tokenObservers=[...i.tokenObservers,o],i.token&&ss(i.token)){const c=i.token;Promise.resolve().then(()=>{t({token:c.token}),np(n)}).catch(()=>{})}i.cachedTokenPromise.then(()=>np(n))}function y_(n,e){const t=De(n),r=t.tokenObservers.filter(s=>s.next!==e);r.length===0&&t.tokenRefresher&&t.tokenRefresher.isRunning()&&t.tokenRefresher.stop(),t.tokenObservers=r}function np(n){const{app:e}=n,t=De(e);let r=t.tokenRefresher;r||(r=GS(n),t.tokenRefresher=r),!r.isRunning()&&t.isTokenAutoRefreshEnabled&&r.start()}function GS(n){const{app:e}=n;return new SS(async()=>{const t=De(e);let r;if(t.token?r=await Ra(n,!0):r=await Ra(n),r.error)throw r.error;if(r.internalError)throw r.internalError},()=>!0,()=>{const t=De(e);if(t.token){let r=t.token.issuedAtTimeMillis+(t.token.expireTimeMillis-t.token.issuedAtTimeMillis)*.5+3e5;const s=t.token.expireTimeMillis-5*60*1e3;return r=Math.min(r,s),Math.max(0,r-Date.now())}else return 0},ep.RETRIAL_MIN_WAIT,ep.RETRIAL_MAX_WAIT)}function I_(n,e){const t=De(n).tokenObservers;for(const r of t)try{r.type==="EXTERNAL"&&e.error!=null?r.error(e.error):r.next(e)}catch{}}function ss(n){return n.expireTimeMillis-Date.now()>0}function du(n){return{token:jS(US),error:n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qS{constructor(e,t){this.app=e,this.heartbeatServiceProvider=t}_delete(){const{tokenObservers:e}=De(this.app);for(const t of e)y_(this.app,t.next);return Promise.resolve()}}function $S(n,e){return new qS(n,e)}function zS(n){return{getToken:e=>Ra(n,e),getLimitedUseToken:()=>BS(n),addTokenListener:e=>__(n,"INTERNAL",e),removeTokenListener:e=>y_(n.app,e)}}const KS="@firebase/app-check",WS="0.11.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const HS="https://www.google.com/recaptcha/api.js";function QS(n,e){const t=new ji,r=De(n);r.reCAPTCHAState={initialized:t};const s=JS(n),i=tp(!1);return i?rp(n,e,i,s,t):ZS(()=>{const o=tp(!1);if(!o)throw new Error("no recaptcha");rp(n,e,o,s,t)}),t.promise}function rp(n,e,t,r,s){t.ready(()=>{XS(n,e,t,r),s.resolve(t)})}function JS(n){const e=`fire_app_check_${n.name}`,t=document.createElement("div");return t.id=e,t.style.display="none",document.body.appendChild(t),e}async function YS(n){Fl(n);const t=await De(n).reCAPTCHAState.initialized.promise;return new Promise((r,s)=>{const i=De(n).reCAPTCHAState;t.ready(()=>{r(t.execute(i.widgetId,{action:"fire_app_check"}))})})}function XS(n,e,t,r){const s=t.render(r,{sitekey:e,size:"invisible",callback:()=>{De(n).reCAPTCHAState.succeeded=!0},"error-callback":()=>{De(n).reCAPTCHAState.succeeded=!1}}),i=De(n);i.reCAPTCHAState={...i.reCAPTCHAState,widgetId:s}}function ZS(n){const e=document.createElement("script");e.src=HS,e.onload=n,document.head.appendChild(e)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gl{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(){var r,s,i;tR(this._throttleData);const e=await YS(this._app).catch(o=>{throw st.create("recaptcha-error")});if(!((r=De(this._app).reCAPTCHAState)!=null&&r.succeeded))throw st.create("recaptcha-error");let t;try{t=await Ul(CS(this._app,e),this._heartbeatServiceProvider)}catch(o){throw(s=o.code)!=null&&s.includes("fetch-status-error")?(this._throttleData=eR(Number((i=o.customData)==null?void 0:i.httpStatus),this._throttleData),st.create("initial-throttle",{time:l_(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):o}return this._throttleData=null,t}initialize(e){this._app=e,this._heartbeatServiceProvider=Et(e,"heartbeat"),QS(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof Gl?this._siteKey===e._siteKey:!1}}function eR(n,e){if(n===404||n===403)return{backoffCount:1,allowRequestsAfter:Date.now()+bS,httpStatus:n};{const t=e?e.backoffCount:0,r=YT(t,1e3,2);return{backoffCount:t+1,allowRequestsAfter:Date.now()+r,httpStatus:n}}}function tR(n){if(n&&Date.now()-n.allowRequestsAfter<=0)throw st.create("throttled",{time:l_(n.allowRequestsAfter-Date.now()),httpStatus:n.httpStatus})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nR(n=Ls(),e){n=Y(n);const t=Et(n,"app-check");if(nc().initialized||FS(),jl()&&Bl().then(s=>console.log(`App Check debug token: ${s}. You will need to add it to your app's App Check settings in the Firebase console for it to work.`)),t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(i.isTokenAutoRefreshEnabled===e.isTokenAutoRefreshEnabled&&i.provider.isEqual(e.provider))return s;throw st.create("already-initialized",{appName:n.name})}const r=t.initialize({options:e});return rR(n,e.provider,e.isTokenAutoRefreshEnabled),De(n).isTokenAutoRefreshEnabled&&__(r,"INTERNAL",()=>{}),r}function rR(n,e,t=!1){const r=TS(n,{...c_});r.activated=!0,r.provider=e,r.cachedTokenPromise=LS(n).then(s=>(s&&ss(s)&&(r.token=s,I_(n,{token:s.token})),s)),r.isTokenAutoRefreshEnabled=t&&n.automaticDataCollectionEnabled,!n.automaticDataCollectionEnabled&&t&&kn.warn("`isTokenAutoRefreshEnabled` is true but `automaticDataCollectionEnabled` was set to false during `initializeApp()`. This blocks automatic token refresh."),r.provider.initialize(n)}async function R1(n,e){const t=await Ra(n,e);if(t.error)throw t.error;if(t.internalError)throw t.internalError;return{token:t.token}}const sR="app-check",sp="app-check-internal";function iR(){ht(new nt(sR,n=>{const e=n.getProvider("app").getImmediate(),t=n.getProvider("heartbeat");return $S(e,t)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((n,e,t)=>{n.getProvider(sp).initialize()})),ht(new nt(sp,n=>{const e=n.getProvider("app-check").getImmediate();return zS(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),$e(KS,WS)}iR();var ip=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Vn,w_;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(T,y){function w(){}w.prototype=y.prototype,T.F=y.prototype,T.prototype=new w,T.prototype.constructor=T,T.D=function(v,A,R){for(var E=Array(arguments.length-2),Pe=2;Pe<arguments.length;Pe++)E[Pe-2]=arguments[Pe];return y.prototype[A].apply(v,E)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,t),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(T,y,w){w||(w=0);const v=Array(16);if(typeof y=="string")for(var A=0;A<16;++A)v[A]=y.charCodeAt(w++)|y.charCodeAt(w++)<<8|y.charCodeAt(w++)<<16|y.charCodeAt(w++)<<24;else for(A=0;A<16;++A)v[A]=y[w++]|y[w++]<<8|y[w++]<<16|y[w++]<<24;y=T.g[0],w=T.g[1],A=T.g[2];let R=T.g[3],E;E=y+(R^w&(A^R))+v[0]+3614090360&4294967295,y=w+(E<<7&4294967295|E>>>25),E=R+(A^y&(w^A))+v[1]+3905402710&4294967295,R=y+(E<<12&4294967295|E>>>20),E=A+(w^R&(y^w))+v[2]+606105819&4294967295,A=R+(E<<17&4294967295|E>>>15),E=w+(y^A&(R^y))+v[3]+3250441966&4294967295,w=A+(E<<22&4294967295|E>>>10),E=y+(R^w&(A^R))+v[4]+4118548399&4294967295,y=w+(E<<7&4294967295|E>>>25),E=R+(A^y&(w^A))+v[5]+1200080426&4294967295,R=y+(E<<12&4294967295|E>>>20),E=A+(w^R&(y^w))+v[6]+2821735955&4294967295,A=R+(E<<17&4294967295|E>>>15),E=w+(y^A&(R^y))+v[7]+4249261313&4294967295,w=A+(E<<22&4294967295|E>>>10),E=y+(R^w&(A^R))+v[8]+1770035416&4294967295,y=w+(E<<7&4294967295|E>>>25),E=R+(A^y&(w^A))+v[9]+2336552879&4294967295,R=y+(E<<12&4294967295|E>>>20),E=A+(w^R&(y^w))+v[10]+4294925233&4294967295,A=R+(E<<17&4294967295|E>>>15),E=w+(y^A&(R^y))+v[11]+2304563134&4294967295,w=A+(E<<22&4294967295|E>>>10),E=y+(R^w&(A^R))+v[12]+1804603682&4294967295,y=w+(E<<7&4294967295|E>>>25),E=R+(A^y&(w^A))+v[13]+4254626195&4294967295,R=y+(E<<12&4294967295|E>>>20),E=A+(w^R&(y^w))+v[14]+2792965006&4294967295,A=R+(E<<17&4294967295|E>>>15),E=w+(y^A&(R^y))+v[15]+1236535329&4294967295,w=A+(E<<22&4294967295|E>>>10),E=y+(A^R&(w^A))+v[1]+4129170786&4294967295,y=w+(E<<5&4294967295|E>>>27),E=R+(w^A&(y^w))+v[6]+3225465664&4294967295,R=y+(E<<9&4294967295|E>>>23),E=A+(y^w&(R^y))+v[11]+643717713&4294967295,A=R+(E<<14&4294967295|E>>>18),E=w+(R^y&(A^R))+v[0]+3921069994&4294967295,w=A+(E<<20&4294967295|E>>>12),E=y+(A^R&(w^A))+v[5]+3593408605&4294967295,y=w+(E<<5&4294967295|E>>>27),E=R+(w^A&(y^w))+v[10]+38016083&4294967295,R=y+(E<<9&4294967295|E>>>23),E=A+(y^w&(R^y))+v[15]+3634488961&4294967295,A=R+(E<<14&4294967295|E>>>18),E=w+(R^y&(A^R))+v[4]+3889429448&4294967295,w=A+(E<<20&4294967295|E>>>12),E=y+(A^R&(w^A))+v[9]+568446438&4294967295,y=w+(E<<5&4294967295|E>>>27),E=R+(w^A&(y^w))+v[14]+3275163606&4294967295,R=y+(E<<9&4294967295|E>>>23),E=A+(y^w&(R^y))+v[3]+4107603335&4294967295,A=R+(E<<14&4294967295|E>>>18),E=w+(R^y&(A^R))+v[8]+1163531501&4294967295,w=A+(E<<20&4294967295|E>>>12),E=y+(A^R&(w^A))+v[13]+2850285829&4294967295,y=w+(E<<5&4294967295|E>>>27),E=R+(w^A&(y^w))+v[2]+4243563512&4294967295,R=y+(E<<9&4294967295|E>>>23),E=A+(y^w&(R^y))+v[7]+1735328473&4294967295,A=R+(E<<14&4294967295|E>>>18),E=w+(R^y&(A^R))+v[12]+2368359562&4294967295,w=A+(E<<20&4294967295|E>>>12),E=y+(w^A^R)+v[5]+4294588738&4294967295,y=w+(E<<4&4294967295|E>>>28),E=R+(y^w^A)+v[8]+2272392833&4294967295,R=y+(E<<11&4294967295|E>>>21),E=A+(R^y^w)+v[11]+1839030562&4294967295,A=R+(E<<16&4294967295|E>>>16),E=w+(A^R^y)+v[14]+4259657740&4294967295,w=A+(E<<23&4294967295|E>>>9),E=y+(w^A^R)+v[1]+2763975236&4294967295,y=w+(E<<4&4294967295|E>>>28),E=R+(y^w^A)+v[4]+1272893353&4294967295,R=y+(E<<11&4294967295|E>>>21),E=A+(R^y^w)+v[7]+4139469664&4294967295,A=R+(E<<16&4294967295|E>>>16),E=w+(A^R^y)+v[10]+3200236656&4294967295,w=A+(E<<23&4294967295|E>>>9),E=y+(w^A^R)+v[13]+681279174&4294967295,y=w+(E<<4&4294967295|E>>>28),E=R+(y^w^A)+v[0]+3936430074&4294967295,R=y+(E<<11&4294967295|E>>>21),E=A+(R^y^w)+v[3]+3572445317&4294967295,A=R+(E<<16&4294967295|E>>>16),E=w+(A^R^y)+v[6]+76029189&4294967295,w=A+(E<<23&4294967295|E>>>9),E=y+(w^A^R)+v[9]+3654602809&4294967295,y=w+(E<<4&4294967295|E>>>28),E=R+(y^w^A)+v[12]+3873151461&4294967295,R=y+(E<<11&4294967295|E>>>21),E=A+(R^y^w)+v[15]+530742520&4294967295,A=R+(E<<16&4294967295|E>>>16),E=w+(A^R^y)+v[2]+3299628645&4294967295,w=A+(E<<23&4294967295|E>>>9),E=y+(A^(w|~R))+v[0]+4096336452&4294967295,y=w+(E<<6&4294967295|E>>>26),E=R+(w^(y|~A))+v[7]+1126891415&4294967295,R=y+(E<<10&4294967295|E>>>22),E=A+(y^(R|~w))+v[14]+2878612391&4294967295,A=R+(E<<15&4294967295|E>>>17),E=w+(R^(A|~y))+v[5]+4237533241&4294967295,w=A+(E<<21&4294967295|E>>>11),E=y+(A^(w|~R))+v[12]+1700485571&4294967295,y=w+(E<<6&4294967295|E>>>26),E=R+(w^(y|~A))+v[3]+2399980690&4294967295,R=y+(E<<10&4294967295|E>>>22),E=A+(y^(R|~w))+v[10]+4293915773&4294967295,A=R+(E<<15&4294967295|E>>>17),E=w+(R^(A|~y))+v[1]+2240044497&4294967295,w=A+(E<<21&4294967295|E>>>11),E=y+(A^(w|~R))+v[8]+1873313359&4294967295,y=w+(E<<6&4294967295|E>>>26),E=R+(w^(y|~A))+v[15]+4264355552&4294967295,R=y+(E<<10&4294967295|E>>>22),E=A+(y^(R|~w))+v[6]+2734768916&4294967295,A=R+(E<<15&4294967295|E>>>17),E=w+(R^(A|~y))+v[13]+1309151649&4294967295,w=A+(E<<21&4294967295|E>>>11),E=y+(A^(w|~R))+v[4]+4149444226&4294967295,y=w+(E<<6&4294967295|E>>>26),E=R+(w^(y|~A))+v[11]+3174756917&4294967295,R=y+(E<<10&4294967295|E>>>22),E=A+(y^(R|~w))+v[2]+718787259&4294967295,A=R+(E<<15&4294967295|E>>>17),E=w+(R^(A|~y))+v[9]+3951481745&4294967295,T.g[0]=T.g[0]+y&4294967295,T.g[1]=T.g[1]+(A+(E<<21&4294967295|E>>>11))&4294967295,T.g[2]=T.g[2]+A&4294967295,T.g[3]=T.g[3]+R&4294967295}r.prototype.v=function(T,y){y===void 0&&(y=T.length);const w=y-this.blockSize,v=this.C;let A=this.h,R=0;for(;R<y;){if(A==0)for(;R<=w;)s(this,T,R),R+=this.blockSize;if(typeof T=="string"){for(;R<y;)if(v[A++]=T.charCodeAt(R++),A==this.blockSize){s(this,v),A=0;break}}else for(;R<y;)if(v[A++]=T[R++],A==this.blockSize){s(this,v),A=0;break}}this.h=A,this.o+=y},r.prototype.A=function(){var T=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);T[0]=128;for(var y=1;y<T.length-8;++y)T[y]=0;y=this.o*8;for(var w=T.length-8;w<T.length;++w)T[w]=y&255,y/=256;for(this.v(T),T=Array(16),y=0,w=0;w<4;++w)for(let v=0;v<32;v+=8)T[y++]=this.g[w]>>>v&255;return T};function i(T,y){var w=c;return Object.prototype.hasOwnProperty.call(w,T)?w[T]:w[T]=y(T)}function o(T,y){this.h=y;const w=[];let v=!0;for(let A=T.length-1;A>=0;A--){const R=T[A]|0;v&&R==y||(w[A]=R,v=!1)}this.g=w}var c={};function u(T){return-128<=T&&T<128?i(T,function(y){return new o([y|0],y<0?-1:0)}):new o([T|0],T<0?-1:0)}function l(T){if(isNaN(T)||!isFinite(T))return f;if(T<0)return k(l(-T));const y=[];let w=1;for(let v=0;T>=w;v++)y[v]=T/w|0,w*=4294967296;return new o(y,0)}function d(T,y){if(T.length==0)throw Error("number format error: empty string");if(y=y||10,y<2||36<y)throw Error("radix out of range: "+y);if(T.charAt(0)=="-")return k(d(T.substring(1),y));if(T.indexOf("-")>=0)throw Error('number format error: interior "-" character');const w=l(Math.pow(y,8));let v=f;for(let R=0;R<T.length;R+=8){var A=Math.min(8,T.length-R);const E=parseInt(T.substring(R,R+A),y);A<8?(A=l(Math.pow(y,A)),v=v.j(A).add(l(E))):(v=v.j(w),v=v.add(l(E)))}return v}var f=u(0),g=u(1),I=u(16777216);n=o.prototype,n.m=function(){if(P(this))return-k(this).m();let T=0,y=1;for(let w=0;w<this.g.length;w++){const v=this.i(w);T+=(v>=0?v:4294967296+v)*y,y*=4294967296}return T},n.toString=function(T){if(T=T||10,T<2||36<T)throw Error("radix out of range: "+T);if(b(this))return"0";if(P(this))return"-"+k(this).toString(T);const y=l(Math.pow(T,6));var w=this;let v="";for(;;){const A=z(w,y).g;w=V(w,A.j(y));let R=((w.g.length>0?w.g[0]:w.h)>>>0).toString(T);if(w=A,b(w))return R+v;for(;R.length<6;)R="0"+R;v=R+v}},n.i=function(T){return T<0?0:T<this.g.length?this.g[T]:this.h};function b(T){if(T.h!=0)return!1;for(let y=0;y<T.g.length;y++)if(T.g[y]!=0)return!1;return!0}function P(T){return T.h==-1}n.l=function(T){return T=V(this,T),P(T)?-1:b(T)?0:1};function k(T){const y=T.g.length,w=[];for(let v=0;v<y;v++)w[v]=~T.g[v];return new o(w,~T.h).add(g)}n.abs=function(){return P(this)?k(this):this},n.add=function(T){const y=Math.max(this.g.length,T.g.length),w=[];let v=0;for(let A=0;A<=y;A++){let R=v+(this.i(A)&65535)+(T.i(A)&65535),E=(R>>>16)+(this.i(A)>>>16)+(T.i(A)>>>16);v=E>>>16,R&=65535,E&=65535,w[A]=E<<16|R}return new o(w,w[w.length-1]&-2147483648?-1:0)};function V(T,y){return T.add(k(y))}n.j=function(T){if(b(this)||b(T))return f;if(P(this))return P(T)?k(this).j(k(T)):k(k(this).j(T));if(P(T))return k(this.j(k(T)));if(this.l(I)<0&&T.l(I)<0)return l(this.m()*T.m());const y=this.g.length+T.g.length,w=[];for(var v=0;v<2*y;v++)w[v]=0;for(v=0;v<this.g.length;v++)for(let A=0;A<T.g.length;A++){const R=this.i(v)>>>16,E=this.i(v)&65535,Pe=T.i(A)>>>16,It=T.i(A)&65535;w[2*v+2*A]+=E*It,j(w,2*v+2*A),w[2*v+2*A+1]+=R*It,j(w,2*v+2*A+1),w[2*v+2*A+1]+=E*Pe,j(w,2*v+2*A+1),w[2*v+2*A+2]+=R*Pe,j(w,2*v+2*A+2)}for(T=0;T<y;T++)w[T]=w[2*T+1]<<16|w[2*T];for(T=y;T<2*y;T++)w[T]=0;return new o(w,0)};function j(T,y){for(;(T[y]&65535)!=T[y];)T[y+1]+=T[y]>>>16,T[y]&=65535,y++}function U(T,y){this.g=T,this.h=y}function z(T,y){if(b(y))throw Error("division by zero");if(b(T))return new U(f,f);if(P(T))return y=z(k(T),y),new U(k(y.g),k(y.h));if(P(y))return y=z(T,k(y)),new U(k(y.g),y.h);if(T.g.length>30){if(P(T)||P(y))throw Error("slowDivide_ only works with positive integers.");for(var w=g,v=y;v.l(T)<=0;)w=K(w),v=K(v);var A=Q(w,1),R=Q(v,1);for(v=Q(v,2),w=Q(w,2);!b(v);){var E=R.add(v);E.l(T)<=0&&(A=A.add(w),R=E),v=Q(v,1),w=Q(w,1)}return y=V(T,A.j(y)),new U(A,y)}for(A=f;T.l(y)>=0;){for(w=Math.max(1,Math.floor(T.m()/y.m())),v=Math.ceil(Math.log(w)/Math.LN2),v=v<=48?1:Math.pow(2,v-48),R=l(w),E=R.j(y);P(E)||E.l(T)>0;)w-=v,R=l(w),E=R.j(y);b(R)&&(R=g),A=A.add(R),T=V(T,E)}return new U(A,T)}n.B=function(T){return z(this,T).h},n.and=function(T){const y=Math.max(this.g.length,T.g.length),w=[];for(let v=0;v<y;v++)w[v]=this.i(v)&T.i(v);return new o(w,this.h&T.h)},n.or=function(T){const y=Math.max(this.g.length,T.g.length),w=[];for(let v=0;v<y;v++)w[v]=this.i(v)|T.i(v);return new o(w,this.h|T.h)},n.xor=function(T){const y=Math.max(this.g.length,T.g.length),w=[];for(let v=0;v<y;v++)w[v]=this.i(v)^T.i(v);return new o(w,this.h^T.h)};function K(T){const y=T.g.length+1,w=[];for(let v=0;v<y;v++)w[v]=T.i(v)<<1|T.i(v-1)>>>31;return new o(w,T.h)}function Q(T,y){const w=y>>5;y%=32;const v=T.g.length-w,A=[];for(let R=0;R<v;R++)A[R]=y>0?T.i(R+w)>>>y|T.i(R+w+1)<<32-y:T.i(R+w);return new o(A,T.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,w_=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=l,o.fromString=d,Vn=o}).apply(typeof ip<"u"?ip:typeof self<"u"?self:typeof window<"u"?window:{});var Ko=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var E_,vi,T_,oa,qu,A_,v_,b_;(function(){var n,e=Object.defineProperty;function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Ko=="object"&&Ko];for(var h=0;h<a.length;++h){var p=a[h];if(p&&p.Math==Math)return p}throw Error("Cannot find global object")}var r=t(this);function s(a,h){if(h)e:{var p=r;a=a.split(".");for(var m=0;m<a.length-1;m++){var C=a[m];if(!(C in p))break e;p=p[C]}a=a[a.length-1],m=p[a],h=h(m),h!=m&&h!=null&&e(p,a,{configurable:!0,writable:!0,value:h})}}s("Symbol.dispose",function(a){return a||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(a){return a||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(a){return a||function(h){var p=[],m;for(m in h)Object.prototype.hasOwnProperty.call(h,m)&&p.push([m,h[m]]);return p}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},o=this||self;function c(a){var h=typeof a;return h=="object"&&a!=null||h=="function"}function u(a,h,p){return a.call.apply(a.bind,arguments)}function l(a,h,p){return l=u,l.apply(null,arguments)}function d(a,h){var p=Array.prototype.slice.call(arguments,1);return function(){var m=p.slice();return m.push.apply(m,arguments),a.apply(this,m)}}function f(a,h){function p(){}p.prototype=h.prototype,a.Z=h.prototype,a.prototype=new p,a.prototype.constructor=a,a.Ob=function(m,C,D){for(var F=Array(arguments.length-2),X=2;X<arguments.length;X++)F[X-2]=arguments[X];return h.prototype[C].apply(m,F)}}var g=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?a=>a&&AsyncContext.Snapshot.wrap(a):a=>a;function I(a){const h=a.length;if(h>0){const p=Array(h);for(let m=0;m<h;m++)p[m]=a[m];return p}return[]}function b(a,h){for(let m=1;m<arguments.length;m++){const C=arguments[m];var p=typeof C;if(p=p!="object"?p:C?Array.isArray(C)?"array":p:"null",p=="array"||p=="object"&&typeof C.length=="number"){p=a.length||0;const D=C.length||0;a.length=p+D;for(let F=0;F<D;F++)a[p+F]=C[F]}else a.push(C)}}class P{constructor(h,p){this.i=h,this.j=p,this.h=0,this.g=null}get(){let h;return this.h>0?(this.h--,h=this.g,this.g=h.next,h.next=null):h=this.i(),h}}function k(a){o.setTimeout(()=>{throw a},0)}function V(){var a=T;let h=null;return a.g&&(h=a.g,a.g=a.g.next,a.g||(a.h=null),h.next=null),h}class j{constructor(){this.h=this.g=null}add(h,p){const m=U.get();m.set(h,p),this.h?this.h.next=m:this.g=m,this.h=m}}var U=new P(()=>new z,a=>a.reset());class z{constructor(){this.next=this.g=this.h=null}set(h,p){this.h=h,this.g=p,this.next=null}reset(){this.next=this.g=this.h=null}}let K,Q=!1,T=new j,y=()=>{const a=Promise.resolve(void 0);K=()=>{a.then(w)}};function w(){for(var a;a=V();){try{a.h.call(a.g)}catch(p){k(p)}var h=U;h.j(a),h.h<100&&(h.h++,a.next=h.g,h.g=a)}Q=!1}function v(){this.u=this.u,this.C=this.C}v.prototype.u=!1,v.prototype.dispose=function(){this.u||(this.u=!0,this.N())},v.prototype[Symbol.dispose]=function(){this.dispose()},v.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function A(a,h){this.type=a,this.g=this.target=h,this.defaultPrevented=!1}A.prototype.h=function(){this.defaultPrevented=!0};var R=function(){if(!o.addEventListener||!Object.defineProperty)return!1;var a=!1,h=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const p=()=>{};o.addEventListener("test",p,h),o.removeEventListener("test",p,h)}catch{}return a}();function E(a){return/^[\s\xa0]*$/.test(a)}function Pe(a,h){A.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a&&this.init(a,h)}f(Pe,A),Pe.prototype.init=function(a,h){const p=this.type=a.type,m=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement,this.g=h,h=a.relatedTarget,h||(p=="mouseover"?h=a.fromElement:p=="mouseout"&&(h=a.toElement)),this.relatedTarget=h,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=a.pointerType,this.state=a.state,this.i=a,a.defaultPrevented&&Pe.Z.h.call(this)},Pe.prototype.h=function(){Pe.Z.h.call(this);const a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var It="closure_listenable_"+(Math.random()*1e6|0),kE=0;function DE(a,h,p,m,C){this.listener=a,this.proxy=null,this.src=h,this.type=p,this.capture=!!m,this.ha=C,this.key=++kE,this.da=this.fa=!1}function Po(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Co(a,h,p){for(const m in a)h.call(p,a[m],m,a)}function NE(a,h){for(const p in a)h.call(void 0,a[p],p,a)}function Td(a){const h={};for(const p in a)h[p]=a[p];return h}const Ad="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function vd(a,h){let p,m;for(let C=1;C<arguments.length;C++){m=arguments[C];for(p in m)a[p]=m[p];for(let D=0;D<Ad.length;D++)p=Ad[D],Object.prototype.hasOwnProperty.call(m,p)&&(a[p]=m[p])}}function xo(a){this.src=a,this.g={},this.h=0}xo.prototype.add=function(a,h,p,m,C){const D=a.toString();a=this.g[D],a||(a=this.g[D]=[],this.h++);const F=Oc(a,h,m,C);return F>-1?(h=a[F],p||(h.fa=!1)):(h=new DE(h,this.src,D,!!m,C),h.fa=p,a.push(h)),h};function Nc(a,h){const p=h.type;if(p in a.g){var m=a.g[p],C=Array.prototype.indexOf.call(m,h,void 0),D;(D=C>=0)&&Array.prototype.splice.call(m,C,1),D&&(Po(h),a.g[p].length==0&&(delete a.g[p],a.h--))}}function Oc(a,h,p,m){for(let C=0;C<a.length;++C){const D=a[C];if(!D.da&&D.listener==h&&D.capture==!!p&&D.ha==m)return C}return-1}var Vc="closure_lm_"+(Math.random()*1e6|0),Lc={};function bd(a,h,p,m,C){if(Array.isArray(h)){for(let D=0;D<h.length;D++)bd(a,h[D],p,m,C);return null}return p=Pd(p),a&&a[It]?a.J(h,p,c(m)?!!m.capture:!1,C):OE(a,h,p,!1,m,C)}function OE(a,h,p,m,C,D){if(!h)throw Error("Invalid event type");const F=c(C)?!!C.capture:!!C;let X=Fc(a);if(X||(a[Vc]=X=new xo(a)),p=X.add(h,p,m,F,D),p.proxy)return p;if(m=VE(),p.proxy=m,m.src=a,m.listener=p,a.addEventListener)R||(C=F),C===void 0&&(C=!1),a.addEventListener(h.toString(),m,C);else if(a.attachEvent)a.attachEvent(Rd(h.toString()),m);else if(a.addListener&&a.removeListener)a.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return p}function VE(){function a(p){return h.call(a.src,a.listener,p)}const h=LE;return a}function Sd(a,h,p,m,C){if(Array.isArray(h))for(var D=0;D<h.length;D++)Sd(a,h[D],p,m,C);else m=c(m)?!!m.capture:!!m,p=Pd(p),a&&a[It]?(a=a.i,D=String(h).toString(),D in a.g&&(h=a.g[D],p=Oc(h,p,m,C),p>-1&&(Po(h[p]),Array.prototype.splice.call(h,p,1),h.length==0&&(delete a.g[D],a.h--)))):a&&(a=Fc(a))&&(h=a.g[h.toString()],a=-1,h&&(a=Oc(h,p,m,C)),(p=a>-1?h[a]:null)&&Mc(p))}function Mc(a){if(typeof a!="number"&&a&&!a.da){var h=a.src;if(h&&h[It])Nc(h.i,a);else{var p=a.type,m=a.proxy;h.removeEventListener?h.removeEventListener(p,m,a.capture):h.detachEvent?h.detachEvent(Rd(p),m):h.addListener&&h.removeListener&&h.removeListener(m),(p=Fc(h))?(Nc(p,a),p.h==0&&(p.src=null,h[Vc]=null)):Po(a)}}}function Rd(a){return a in Lc?Lc[a]:Lc[a]="on"+a}function LE(a,h){if(a.da)a=!0;else{h=new Pe(h,this);const p=a.listener,m=a.ha||a.src;a.fa&&Mc(a),a=p.call(m,h)}return a}function Fc(a){return a=a[Vc],a instanceof xo?a:null}var Uc="__closure_events_fn_"+(Math.random()*1e9>>>0);function Pd(a){return typeof a=="function"?a:(a[Uc]||(a[Uc]=function(h){return a.handleEvent(h)}),a[Uc])}function ze(){v.call(this),this.i=new xo(this),this.M=this,this.G=null}f(ze,v),ze.prototype[It]=!0,ze.prototype.removeEventListener=function(a,h,p,m){Sd(this,a,h,p,m)};function Je(a,h){var p,m=a.G;if(m)for(p=[];m;m=m.G)p.push(m);if(a=a.M,m=h.type||h,typeof h=="string")h=new A(h,a);else if(h instanceof A)h.target=h.target||a;else{var C=h;h=new A(m,a),vd(h,C)}C=!0;let D,F;if(p)for(F=p.length-1;F>=0;F--)D=h.g=p[F],C=ko(D,m,!0,h)&&C;if(D=h.g=a,C=ko(D,m,!0,h)&&C,C=ko(D,m,!1,h)&&C,p)for(F=0;F<p.length;F++)D=h.g=p[F],C=ko(D,m,!1,h)&&C}ze.prototype.N=function(){if(ze.Z.N.call(this),this.i){var a=this.i;for(const h in a.g){const p=a.g[h];for(let m=0;m<p.length;m++)Po(p[m]);delete a.g[h],a.h--}}this.G=null},ze.prototype.J=function(a,h,p,m){return this.i.add(String(a),h,!1,p,m)},ze.prototype.K=function(a,h,p,m){return this.i.add(String(a),h,!0,p,m)};function ko(a,h,p,m){if(h=a.i.g[String(h)],!h)return!0;h=h.concat();let C=!0;for(let D=0;D<h.length;++D){const F=h[D];if(F&&!F.da&&F.capture==p){const X=F.listener,Ce=F.ha||F.src;F.fa&&Nc(a.i,F),C=X.call(Ce,m)!==!1&&C}}return C&&!m.defaultPrevented}function ME(a,h){if(typeof a!="function")if(a&&typeof a.handleEvent=="function")a=l(a.handleEvent,a);else throw Error("Invalid listener argument");return Number(h)>2147483647?-1:o.setTimeout(a,h||0)}function Cd(a){a.g=ME(()=>{a.g=null,a.i&&(a.i=!1,Cd(a))},a.l);const h=a.h;a.h=null,a.m.apply(null,h)}class FE extends v{constructor(h,p){super(),this.m=h,this.l=p,this.h=null,this.i=!1,this.g=null}j(h){this.h=arguments,this.g?this.i=!0:Cd(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Zs(a){v.call(this),this.h=a,this.g={}}f(Zs,v);var xd=[];function kd(a){Co(a.g,function(h,p){this.g.hasOwnProperty(p)&&Mc(h)},a),a.g={}}Zs.prototype.N=function(){Zs.Z.N.call(this),kd(this)},Zs.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var jc=o.JSON.stringify,UE=o.JSON.parse,jE=class{stringify(a){return o.JSON.stringify(a,void 0)}parse(a){return o.JSON.parse(a,void 0)}};function Dd(){}function Nd(){}var ei={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Bc(){A.call(this,"d")}f(Bc,A);function Gc(){A.call(this,"c")}f(Gc,A);var tr={},Od=null;function Do(){return Od=Od||new ze}tr.Ia="serverreachability";function Vd(a){A.call(this,tr.Ia,a)}f(Vd,A);function ti(a){const h=Do();Je(h,new Vd(h))}tr.STAT_EVENT="statevent";function Ld(a,h){A.call(this,tr.STAT_EVENT,a),this.stat=h}f(Ld,A);function Ye(a){const h=Do();Je(h,new Ld(h,a))}tr.Ja="timingevent";function Md(a,h){A.call(this,tr.Ja,a),this.size=h}f(Md,A);function ni(a,h){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){a()},h)}function ri(){this.g=!0}ri.prototype.ua=function(){this.g=!1};function BE(a,h,p,m,C,D){a.info(function(){if(a.g)if(D){var F="",X=D.split("&");for(let he=0;he<X.length;he++){var Ce=X[he].split("=");if(Ce.length>1){const Le=Ce[0];Ce=Ce[1];const kt=Le.split("_");F=kt.length>=2&&kt[1]=="type"?F+(Le+"="+Ce+"&"):F+(Le+"=redacted&")}}}else F=null;else F=D;return"XMLHTTP REQ ("+m+") [attempt "+C+"]: "+h+`
`+p+`
`+F})}function GE(a,h,p,m,C,D,F){a.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+C+"]: "+h+`
`+p+`
`+D+" "+F})}function $r(a,h,p,m){a.info(function(){return"XMLHTTP TEXT ("+h+"): "+$E(a,p)+(m?" "+m:"")})}function qE(a,h){a.info(function(){return"TIMEOUT: "+h})}ri.prototype.info=function(){};function $E(a,h){if(!a.g)return h;if(!h)return null;try{const D=JSON.parse(h);if(D){for(a=0;a<D.length;a++)if(Array.isArray(D[a])){var p=D[a];if(!(p.length<2)){var m=p[1];if(Array.isArray(m)&&!(m.length<1)){var C=m[0];if(C!="noop"&&C!="stop"&&C!="close")for(let F=1;F<m.length;F++)m[F]=""}}}}return jc(D)}catch{return h}}var No={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Fd={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Ud;function qc(){}f(qc,Dd),qc.prototype.g=function(){return new XMLHttpRequest},Ud=new qc;function si(a){return encodeURIComponent(String(a))}function zE(a){var h=1;a=a.split(":");const p=[];for(;h>0&&a.length;)p.push(a.shift()),h--;return a.length&&p.push(a.join(":")),p}function pn(a,h,p,m){this.j=a,this.i=h,this.l=p,this.S=m||1,this.V=new Zs(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new jd}function jd(){this.i=null,this.g="",this.h=!1}var Bd={},$c={};function zc(a,h,p){a.M=1,a.A=Vo(xt(h)),a.u=p,a.R=!0,Gd(a,null)}function Gd(a,h){a.F=Date.now(),Oo(a),a.B=xt(a.A);var p=a.B,m=a.S;Array.isArray(m)||(m=[String(m)]),tf(p.i,"t",m),a.C=0,p=a.j.L,a.h=new jd,a.g=wf(a.j,p?h:null,!a.u),a.P>0&&(a.O=new FE(l(a.Y,a,a.g),a.P)),h=a.V,p=a.g,m=a.ba;var C="readystatechange";Array.isArray(C)||(C&&(xd[0]=C.toString()),C=xd);for(let D=0;D<C.length;D++){const F=bd(p,C[D],m||h.handleEvent,!1,h.h||h);if(!F)break;h.g[F.key]=F}h=a.J?Td(a.J):{},a.u?(a.v||(a.v="POST"),h["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.B,a.v,a.u,h)):(a.v="GET",a.g.ea(a.B,a.v,null,h)),ti(),BE(a.i,a.v,a.B,a.l,a.S,a.u)}pn.prototype.ba=function(a){a=a.target;const h=this.O;h&&_n(a)==3?h.j():this.Y(a)},pn.prototype.Y=function(a){try{if(a==this.g)e:{const X=_n(this.g),Ce=this.g.ya(),he=this.g.ca();if(!(X<3)&&(X!=3||this.g&&(this.h.h||this.g.la()||uf(this.g)))){this.K||X!=4||Ce==7||(Ce==8||he<=0?ti(3):ti(2)),Kc(this);var h=this.g.ca();this.X=h;var p=KE(this);if(this.o=h==200,GE(this.i,this.v,this.B,this.l,this.S,X,h),this.o){if(this.U&&!this.L){t:{if(this.g){var m,C=this.g;if((m=C.g?C.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!E(m)){var D=m;break t}}D=null}if(a=D)$r(this.i,this.l,a,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Wc(this,a);else{this.o=!1,this.m=3,Ye(12),nr(this),ii(this);break e}}if(this.R){a=!0;let Le;for(;!this.K&&this.C<p.length;)if(Le=WE(this,p),Le==$c){X==4&&(this.m=4,Ye(14),a=!1),$r(this.i,this.l,null,"[Incomplete Response]");break}else if(Le==Bd){this.m=4,Ye(15),$r(this.i,this.l,p,"[Invalid Chunk]"),a=!1;break}else $r(this.i,this.l,Le,null),Wc(this,Le);if(qd(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),X!=4||p.length!=0||this.h.h||(this.m=1,Ye(16),a=!1),this.o=this.o&&a,!a)$r(this.i,this.l,p,"[Invalid Chunked Response]"),nr(this),ii(this);else if(p.length>0&&!this.W){this.W=!0;var F=this.j;F.g==this&&F.aa&&!F.P&&(F.j.info("Great, no buffering proxy detected. Bytes received: "+p.length),tu(F),F.P=!0,Ye(11))}}else $r(this.i,this.l,p,null),Wc(this,p);X==4&&nr(this),this.o&&!this.K&&(X==4?mf(this.j,this):(this.o=!1,Oo(this)))}else aT(this.g),h==400&&p.indexOf("Unknown SID")>0?(this.m=3,Ye(12)):(this.m=0,Ye(13)),nr(this),ii(this)}}}catch{}finally{}};function KE(a){if(!qd(a))return a.g.la();const h=uf(a.g);if(h==="")return"";let p="";const m=h.length,C=_n(a.g)==4;if(!a.h.i){if(typeof TextDecoder>"u")return nr(a),ii(a),"";a.h.i=new o.TextDecoder}for(let D=0;D<m;D++)a.h.h=!0,p+=a.h.i.decode(h[D],{stream:!(C&&D==m-1)});return h.length=0,a.h.g+=p,a.C=0,a.h.g}function qd(a){return a.g?a.v=="GET"&&a.M!=2&&a.j.Aa:!1}function WE(a,h){var p=a.C,m=h.indexOf(`
`,p);return m==-1?$c:(p=Number(h.substring(p,m)),isNaN(p)?Bd:(m+=1,m+p>h.length?$c:(h=h.slice(m,m+p),a.C=m+p,h)))}pn.prototype.cancel=function(){this.K=!0,nr(this)};function Oo(a){a.T=Date.now()+a.H,$d(a,a.H)}function $d(a,h){if(a.D!=null)throw Error("WatchDog timer not null");a.D=ni(l(a.aa,a),h)}function Kc(a){a.D&&(o.clearTimeout(a.D),a.D=null)}pn.prototype.aa=function(){this.D=null;const a=Date.now();a-this.T>=0?(qE(this.i,this.B),this.M!=2&&(ti(),Ye(17)),nr(this),this.m=2,ii(this)):$d(this,this.T-a)};function ii(a){a.j.I==0||a.K||mf(a.j,a)}function nr(a){Kc(a);var h=a.O;h&&typeof h.dispose=="function"&&h.dispose(),a.O=null,kd(a.V),a.g&&(h=a.g,a.g=null,h.abort(),h.dispose())}function Wc(a,h){try{var p=a.j;if(p.I!=0&&(p.g==a||Hc(p.h,a))){if(!a.L&&Hc(p.h,a)&&p.I==3){try{var m=p.Ba.g.parse(h)}catch{m=null}if(Array.isArray(m)&&m.length==3){var C=m;if(C[0]==0){e:if(!p.v){if(p.g)if(p.g.F+3e3<a.F)jo(p),Fo(p);else break e;eu(p),Ye(18)}}else p.xa=C[1],0<p.xa-p.K&&C[2]<37500&&p.F&&p.A==0&&!p.C&&(p.C=ni(l(p.Va,p),6e3));Wd(p.h)<=1&&p.ta&&(p.ta=void 0)}else sr(p,11)}else if((a.L||p.g==a)&&jo(p),!E(h))for(C=p.Ba.g.parse(h),h=0;h<C.length;h++){let he=C[h];const Le=he[0];if(!(Le<=p.K))if(p.K=Le,he=he[1],p.I==2)if(he[0]=="c"){p.M=he[1],p.ba=he[2];const kt=he[3];kt!=null&&(p.ka=kt,p.j.info("VER="+p.ka));const ir=he[4];ir!=null&&(p.za=ir,p.j.info("SVER="+p.za));const yn=he[5];yn!=null&&typeof yn=="number"&&yn>0&&(m=1.5*yn,p.O=m,p.j.info("backChannelRequestTimeoutMs_="+m)),m=p;const In=a.g;if(In){const Go=In.g?In.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Go){var D=m.h;D.g||Go.indexOf("spdy")==-1&&Go.indexOf("quic")==-1&&Go.indexOf("h2")==-1||(D.j=D.l,D.g=new Set,D.h&&(Qc(D,D.h),D.h=null))}if(m.G){const nu=In.g?In.g.getResponseHeader("X-HTTP-Session-Id"):null;nu&&(m.wa=nu,fe(m.J,m.G,nu))}}p.I=3,p.l&&p.l.ra(),p.aa&&(p.T=Date.now()-a.F,p.j.info("Handshake RTT: "+p.T+"ms")),m=p;var F=a;if(m.na=If(m,m.L?m.ba:null,m.W),F.L){Hd(m.h,F);var X=F,Ce=m.O;Ce&&(X.H=Ce),X.D&&(Kc(X),Oo(X)),m.g=F}else pf(m);p.i.length>0&&Uo(p)}else he[0]!="stop"&&he[0]!="close"||sr(p,7);else p.I==3&&(he[0]=="stop"||he[0]=="close"?he[0]=="stop"?sr(p,7):Zc(p):he[0]!="noop"&&p.l&&p.l.qa(he),p.A=0)}}ti(4)}catch{}}var HE=class{constructor(a,h){this.g=a,this.map=h}};function zd(a){this.l=a||10,o.PerformanceNavigationTiming?(a=o.performance.getEntriesByType("navigation"),a=a.length>0&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Kd(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Wd(a){return a.h?1:a.g?a.g.size:0}function Hc(a,h){return a.h?a.h==h:a.g?a.g.has(h):!1}function Qc(a,h){a.g?a.g.add(h):a.h=h}function Hd(a,h){a.h&&a.h==h?a.h=null:a.g&&a.g.has(h)&&a.g.delete(h)}zd.prototype.cancel=function(){if(this.i=Qd(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Qd(a){if(a.h!=null)return a.i.concat(a.h.G);if(a.g!=null&&a.g.size!==0){let h=a.i;for(const p of a.g.values())h=h.concat(p.G);return h}return I(a.i)}var Jd=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function QE(a,h){if(a){a=a.split("&");for(let p=0;p<a.length;p++){const m=a[p].indexOf("=");let C,D=null;m>=0?(C=a[p].substring(0,m),D=a[p].substring(m+1)):C=a[p],h(C,D?decodeURIComponent(D.replace(/\+/g," ")):"")}}}function gn(a){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let h;a instanceof gn?(this.l=a.l,oi(this,a.j),this.o=a.o,this.g=a.g,ai(this,a.u),this.h=a.h,Jc(this,nf(a.i)),this.m=a.m):a&&(h=String(a).match(Jd))?(this.l=!1,oi(this,h[1]||"",!0),this.o=ci(h[2]||""),this.g=ci(h[3]||"",!0),ai(this,h[4]),this.h=ci(h[5]||"",!0),Jc(this,h[6]||"",!0),this.m=ci(h[7]||"")):(this.l=!1,this.i=new li(null,this.l))}gn.prototype.toString=function(){const a=[];var h=this.j;h&&a.push(ui(h,Yd,!0),":");var p=this.g;return(p||h=="file")&&(a.push("//"),(h=this.o)&&a.push(ui(h,Yd,!0),"@"),a.push(si(p).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),p=this.u,p!=null&&a.push(":",String(p))),(p=this.h)&&(this.g&&p.charAt(0)!="/"&&a.push("/"),a.push(ui(p,p.charAt(0)=="/"?XE:YE,!0))),(p=this.i.toString())&&a.push("?",p),(p=this.m)&&a.push("#",ui(p,eT)),a.join("")},gn.prototype.resolve=function(a){const h=xt(this);let p=!!a.j;p?oi(h,a.j):p=!!a.o,p?h.o=a.o:p=!!a.g,p?h.g=a.g:p=a.u!=null;var m=a.h;if(p)ai(h,a.u);else if(p=!!a.h){if(m.charAt(0)!="/")if(this.g&&!this.h)m="/"+m;else{var C=h.h.lastIndexOf("/");C!=-1&&(m=h.h.slice(0,C+1)+m)}if(C=m,C==".."||C==".")m="";else if(C.indexOf("./")!=-1||C.indexOf("/.")!=-1){m=C.lastIndexOf("/",0)==0,C=C.split("/");const D=[];for(let F=0;F<C.length;){const X=C[F++];X=="."?m&&F==C.length&&D.push(""):X==".."?((D.length>1||D.length==1&&D[0]!="")&&D.pop(),m&&F==C.length&&D.push("")):(D.push(X),m=!0)}m=D.join("/")}else m=C}return p?h.h=m:p=a.i.toString()!=="",p?Jc(h,nf(a.i)):p=!!a.m,p&&(h.m=a.m),h};function xt(a){return new gn(a)}function oi(a,h,p){a.j=p?ci(h,!0):h,a.j&&(a.j=a.j.replace(/:$/,""))}function ai(a,h){if(h){if(h=Number(h),isNaN(h)||h<0)throw Error("Bad port number "+h);a.u=h}else a.u=null}function Jc(a,h,p){h instanceof li?(a.i=h,tT(a.i,a.l)):(p||(h=ui(h,ZE)),a.i=new li(h,a.l))}function fe(a,h,p){a.i.set(h,p)}function Vo(a){return fe(a,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),a}function ci(a,h){return a?h?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function ui(a,h,p){return typeof a=="string"?(a=encodeURI(a).replace(h,JE),p&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function JE(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Yd=/[#\/\?@]/g,YE=/[#\?:]/g,XE=/[#\?]/g,ZE=/[#\?@]/g,eT=/#/g;function li(a,h){this.h=this.g=null,this.i=a||null,this.j=!!h}function rr(a){a.g||(a.g=new Map,a.h=0,a.i&&QE(a.i,function(h,p){a.add(decodeURIComponent(h.replace(/\+/g," ")),p)}))}n=li.prototype,n.add=function(a,h){rr(this),this.i=null,a=zr(this,a);let p=this.g.get(a);return p||this.g.set(a,p=[]),p.push(h),this.h+=1,this};function Xd(a,h){rr(a),h=zr(a,h),a.g.has(h)&&(a.i=null,a.h-=a.g.get(h).length,a.g.delete(h))}function Zd(a,h){return rr(a),h=zr(a,h),a.g.has(h)}n.forEach=function(a,h){rr(this),this.g.forEach(function(p,m){p.forEach(function(C){a.call(h,C,m,this)},this)},this)};function ef(a,h){rr(a);let p=[];if(typeof h=="string")Zd(a,h)&&(p=p.concat(a.g.get(zr(a,h))));else for(a=Array.from(a.g.values()),h=0;h<a.length;h++)p=p.concat(a[h]);return p}n.set=function(a,h){return rr(this),this.i=null,a=zr(this,a),Zd(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[h]),this.h+=1,this},n.get=function(a,h){return a?(a=ef(this,a),a.length>0?String(a[0]):h):h};function tf(a,h,p){Xd(a,h),p.length>0&&(a.i=null,a.g.set(zr(a,h),I(p)),a.h+=p.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],h=Array.from(this.g.keys());for(let m=0;m<h.length;m++){var p=h[m];const C=si(p);p=ef(this,p);for(let D=0;D<p.length;D++){let F=C;p[D]!==""&&(F+="="+si(p[D])),a.push(F)}}return this.i=a.join("&")};function nf(a){const h=new li;return h.i=a.i,a.g&&(h.g=new Map(a.g),h.h=a.h),h}function zr(a,h){return h=String(h),a.j&&(h=h.toLowerCase()),h}function tT(a,h){h&&!a.j&&(rr(a),a.i=null,a.g.forEach(function(p,m){const C=m.toLowerCase();m!=C&&(Xd(this,m),tf(this,C,p))},a)),a.j=h}function nT(a,h){const p=new ri;if(o.Image){const m=new Image;m.onload=d(mn,p,"TestLoadImage: loaded",!0,h,m),m.onerror=d(mn,p,"TestLoadImage: error",!1,h,m),m.onabort=d(mn,p,"TestLoadImage: abort",!1,h,m),m.ontimeout=d(mn,p,"TestLoadImage: timeout",!1,h,m),o.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=a}else h(!1)}function rT(a,h){const p=new ri,m=new AbortController,C=setTimeout(()=>{m.abort(),mn(p,"TestPingServer: timeout",!1,h)},1e4);fetch(a,{signal:m.signal}).then(D=>{clearTimeout(C),D.ok?mn(p,"TestPingServer: ok",!0,h):mn(p,"TestPingServer: server error",!1,h)}).catch(()=>{clearTimeout(C),mn(p,"TestPingServer: error",!1,h)})}function mn(a,h,p,m,C){try{C&&(C.onload=null,C.onerror=null,C.onabort=null,C.ontimeout=null),m(p)}catch{}}function sT(){this.g=new jE}function Yc(a){this.i=a.Sb||null,this.h=a.ab||!1}f(Yc,Dd),Yc.prototype.g=function(){return new Lo(this.i,this.h)};function Lo(a,h){ze.call(this),this.H=a,this.o=h,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}f(Lo,ze),n=Lo.prototype,n.open=function(a,h){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=a,this.D=h,this.readyState=1,di(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const h={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};a&&(h.body=a),(this.H||o).fetch(new Request(this.D,h)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,hi(this)),this.readyState=0},n.Pa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,di(this)),this.g&&(this.readyState=3,di(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;rf(this)}else a.text().then(this.Oa.bind(this),this.ga.bind(this))};function rf(a){a.j.read().then(a.Ma.bind(a)).catch(a.ga.bind(a))}n.Ma=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var h=a.value?a.value:new Uint8Array(0);(h=this.B.decode(h,{stream:!a.done}))&&(this.response=this.responseText+=h)}a.done?hi(this):di(this),this.readyState==3&&rf(this)}},n.Oa=function(a){this.g&&(this.response=this.responseText=a,hi(this))},n.Na=function(a){this.g&&(this.response=a,hi(this))},n.ga=function(){this.g&&hi(this)};function hi(a){a.readyState=4,a.l=null,a.j=null,a.B=null,di(a)}n.setRequestHeader=function(a,h){this.A.append(a,h)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],h=this.h.entries();for(var p=h.next();!p.done;)p=p.value,a.push(p[0]+": "+p[1]),p=h.next();return a.join(`\r
`)};function di(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(Lo.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function sf(a){let h="";return Co(a,function(p,m){h+=m,h+=":",h+=p,h+=`\r
`}),h}function Xc(a,h,p){e:{for(m in p){var m=!1;break e}m=!0}m||(p=sf(p),typeof a=="string"?p!=null&&si(p):fe(a,h,p))}function Ee(a){ze.call(this),this.headers=new Map,this.L=a||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}f(Ee,ze);var iT=/^https?$/i,oT=["POST","PUT"];n=Ee.prototype,n.Fa=function(a){this.H=a},n.ea=function(a,h,p,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);h=h?h.toUpperCase():"GET",this.D=a,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Ud.g(),this.g.onreadystatechange=g(l(this.Ca,this));try{this.B=!0,this.g.open(h,String(a),!0),this.B=!1}catch(D){of(this,D);return}if(a=p||"",p=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var C in m)p.set(C,m[C]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const D of m.keys())p.set(D,m.get(D));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(p.keys()).find(D=>D.toLowerCase()=="content-type"),C=o.FormData&&a instanceof o.FormData,!(Array.prototype.indexOf.call(oT,h,void 0)>=0)||m||C||p.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[D,F]of p)this.g.setRequestHeader(D,F);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(a),this.v=!1}catch(D){of(this,D)}};function of(a,h){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=h,a.o=5,af(a),Mo(a)}function af(a){a.A||(a.A=!0,Je(a,"complete"),Je(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=a||7,Je(this,"complete"),Je(this,"abort"),Mo(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Mo(this,!0)),Ee.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?cf(this):this.Xa())},n.Xa=function(){cf(this)};function cf(a){if(a.h&&typeof i<"u"){if(a.v&&_n(a)==4)setTimeout(a.Ca.bind(a),0);else if(Je(a,"readystatechange"),_n(a)==4){a.h=!1;try{const D=a.ca();e:switch(D){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var h=!0;break e;default:h=!1}var p;if(!(p=h)){var m;if(m=D===0){let F=String(a.D).match(Jd)[1]||null;!F&&o.self&&o.self.location&&(F=o.self.location.protocol.slice(0,-1)),m=!iT.test(F?F.toLowerCase():"")}p=m}if(p)Je(a,"complete"),Je(a,"success");else{a.o=6;try{var C=_n(a)>2?a.g.statusText:""}catch{C=""}a.l=C+" ["+a.ca()+"]",af(a)}}finally{Mo(a)}}}}function Mo(a,h){if(a.g){a.m&&(clearTimeout(a.m),a.m=null);const p=a.g;a.g=null,h||Je(a,"ready");try{p.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function _n(a){return a.g?a.g.readyState:0}n.ca=function(){try{return _n(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(a){if(this.g){var h=this.g.responseText;return a&&h.indexOf(a)==0&&(h=h.substring(a.length)),UE(h)}};function uf(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.F){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function aT(a){const h={};a=(a.g&&_n(a)>=2&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<a.length;m++){if(E(a[m]))continue;var p=zE(a[m]);const C=p[0];if(p=p[1],typeof p!="string")continue;p=p.trim();const D=h[C]||[];h[C]=D,D.push(p)}NE(h,function(m){return m.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function fi(a,h,p){return p&&p.internalChannelParams&&p.internalChannelParams[a]||h}function lf(a){this.za=0,this.i=[],this.j=new ri,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=fi("failFast",!1,a),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=fi("baseRetryDelayMs",5e3,a),this.Za=fi("retryDelaySeedMs",1e4,a),this.Ta=fi("forwardChannelMaxRetries",2,a),this.va=fi("forwardChannelRequestTimeoutMs",2e4,a),this.ma=a&&a.xmlHttpFactory||void 0,this.Ua=a&&a.Rb||void 0,this.Aa=a&&a.useFetchStreams||!1,this.O=void 0,this.L=a&&a.supportsCrossDomainXhr||!1,this.M="",this.h=new zd(a&&a.concurrentRequestLimit),this.Ba=new sT,this.S=a&&a.fastHandshake||!1,this.R=a&&a.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=a&&a.Pb||!1,a&&a.ua&&this.j.ua(),a&&a.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&a&&a.detectBufferingProxy||!1,this.ia=void 0,a&&a.longPollingTimeout&&a.longPollingTimeout>0&&(this.ia=a.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=lf.prototype,n.ka=8,n.I=1,n.connect=function(a,h,p,m){Ye(0),this.W=a,this.H=h||{},p&&m!==void 0&&(this.H.OSID=p,this.H.OAID=m),this.F=this.X,this.J=If(this,null,this.W),Uo(this)};function Zc(a){if(hf(a),a.I==3){var h=a.V++,p=xt(a.J);if(fe(p,"SID",a.M),fe(p,"RID",h),fe(p,"TYPE","terminate"),pi(a,p),h=new pn(a,a.j,h),h.M=2,h.A=Vo(xt(p)),p=!1,o.navigator&&o.navigator.sendBeacon)try{p=o.navigator.sendBeacon(h.A.toString(),"")}catch{}!p&&o.Image&&(new Image().src=h.A,p=!0),p||(h.g=wf(h.j,null),h.g.ea(h.A)),h.F=Date.now(),Oo(h)}yf(a)}function Fo(a){a.g&&(tu(a),a.g.cancel(),a.g=null)}function hf(a){Fo(a),a.v&&(o.clearTimeout(a.v),a.v=null),jo(a),a.h.cancel(),a.m&&(typeof a.m=="number"&&o.clearTimeout(a.m),a.m=null)}function Uo(a){if(!Kd(a.h)&&!a.m){a.m=!0;var h=a.Ea;K||y(),Q||(K(),Q=!0),T.add(h,a),a.D=0}}function cT(a,h){return Wd(a.h)>=a.h.j-(a.m?1:0)?!1:a.m?(a.i=h.G.concat(a.i),!0):a.I==1||a.I==2||a.D>=(a.Sa?0:a.Ta)?!1:(a.m=ni(l(a.Ea,a,h),_f(a,a.D)),a.D++,!0)}n.Ea=function(a){if(this.m)if(this.m=null,this.I==1){if(!a){this.V=Math.floor(Math.random()*1e5),a=this.V++;const C=new pn(this,this.j,a);let D=this.o;if(this.U&&(D?(D=Td(D),vd(D,this.U)):D=this.U),this.u!==null||this.R||(C.J=D,D=null),this.S)e:{for(var h=0,p=0;p<this.i.length;p++){t:{var m=this.i[p];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(h+=m,h>4096){h=p;break e}if(h===4096||p===this.i.length-1){h=p+1;break e}}h=1e3}else h=1e3;h=ff(this,C,h),p=xt(this.J),fe(p,"RID",a),fe(p,"CVER",22),this.G&&fe(p,"X-HTTP-Session-Id",this.G),pi(this,p),D&&(this.R?h="headers="+si(sf(D))+"&"+h:this.u&&Xc(p,this.u,D)),Qc(this.h,C),this.Ra&&fe(p,"TYPE","init"),this.S?(fe(p,"$req",h),fe(p,"SID","null"),C.U=!0,zc(C,p,null)):zc(C,p,h),this.I=2}}else this.I==3&&(a?df(this,a):this.i.length==0||Kd(this.h)||df(this))};function df(a,h){var p;h?p=h.l:p=a.V++;const m=xt(a.J);fe(m,"SID",a.M),fe(m,"RID",p),fe(m,"AID",a.K),pi(a,m),a.u&&a.o&&Xc(m,a.u,a.o),p=new pn(a,a.j,p,a.D+1),a.u===null&&(p.J=a.o),h&&(a.i=h.G.concat(a.i)),h=ff(a,p,1e3),p.H=Math.round(a.va*.5)+Math.round(a.va*.5*Math.random()),Qc(a.h,p),zc(p,m,h)}function pi(a,h){a.H&&Co(a.H,function(p,m){fe(h,m,p)}),a.l&&Co({},function(p,m){fe(h,m,p)})}function ff(a,h,p){p=Math.min(a.i.length,p);const m=a.l?l(a.l.Ka,a.l,a):null;e:{var C=a.i;let X=-1;for(;;){const Ce=["count="+p];X==-1?p>0?(X=C[0].g,Ce.push("ofs="+X)):X=0:Ce.push("ofs="+X);let he=!0;for(let Le=0;Le<p;Le++){var D=C[Le].g;const kt=C[Le].map;if(D-=X,D<0)X=Math.max(0,C[Le].g-100),he=!1;else try{D="req"+D+"_"||"";try{var F=kt instanceof Map?kt:Object.entries(kt);for(const[ir,yn]of F){let In=yn;c(yn)&&(In=jc(yn)),Ce.push(D+ir+"="+encodeURIComponent(In))}}catch(ir){throw Ce.push(D+"type="+encodeURIComponent("_badmap")),ir}}catch{m&&m(kt)}}if(he){F=Ce.join("&");break e}}F=void 0}return a=a.i.splice(0,p),h.G=a,F}function pf(a){if(!a.g&&!a.v){a.Y=1;var h=a.Da;K||y(),Q||(K(),Q=!0),T.add(h,a),a.A=0}}function eu(a){return a.g||a.v||a.A>=3?!1:(a.Y++,a.v=ni(l(a.Da,a),_f(a,a.A)),a.A++,!0)}n.Da=function(){if(this.v=null,gf(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var a=4*this.T;this.j.info("BP detection timer enabled: "+a),this.B=ni(l(this.Wa,this),a)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Ye(10),Fo(this),gf(this))};function tu(a){a.B!=null&&(o.clearTimeout(a.B),a.B=null)}function gf(a){a.g=new pn(a,a.j,"rpc",a.Y),a.u===null&&(a.g.J=a.o),a.g.P=0;var h=xt(a.na);fe(h,"RID","rpc"),fe(h,"SID",a.M),fe(h,"AID",a.K),fe(h,"CI",a.F?"0":"1"),!a.F&&a.ia&&fe(h,"TO",a.ia),fe(h,"TYPE","xmlhttp"),pi(a,h),a.u&&a.o&&Xc(h,a.u,a.o),a.O&&(a.g.H=a.O);var p=a.g;a=a.ba,p.M=1,p.A=Vo(xt(h)),p.u=null,p.R=!0,Gd(p,a)}n.Va=function(){this.C!=null&&(this.C=null,Fo(this),eu(this),Ye(19))};function jo(a){a.C!=null&&(o.clearTimeout(a.C),a.C=null)}function mf(a,h){var p=null;if(a.g==h){jo(a),tu(a),a.g=null;var m=2}else if(Hc(a.h,h))p=h.G,Hd(a.h,h),m=1;else return;if(a.I!=0){if(h.o)if(m==1){p=h.u?h.u.length:0,h=Date.now()-h.F;var C=a.D;m=Do(),Je(m,new Md(m,p)),Uo(a)}else pf(a);else if(C=h.m,C==3||C==0&&h.X>0||!(m==1&&cT(a,h)||m==2&&eu(a)))switch(p&&p.length>0&&(h=a.h,h.i=h.i.concat(p)),C){case 1:sr(a,5);break;case 4:sr(a,10);break;case 3:sr(a,6);break;default:sr(a,2)}}}function _f(a,h){let p=a.Qa+Math.floor(Math.random()*a.Za);return a.isActive()||(p*=2),p*h}function sr(a,h){if(a.j.info("Error code "+h),h==2){var p=l(a.bb,a),m=a.Ua;const C=!m;m=new gn(m||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||oi(m,"https"),Vo(m),C?nT(m.toString(),p):rT(m.toString(),p)}else Ye(2);a.I=0,a.l&&a.l.pa(h),yf(a),hf(a)}n.bb=function(a){a?(this.j.info("Successfully pinged google.com"),Ye(2)):(this.j.info("Failed to ping google.com"),Ye(1))};function yf(a){if(a.I=0,a.ja=[],a.l){const h=Qd(a.h);(h.length!=0||a.i.length!=0)&&(b(a.ja,h),b(a.ja,a.i),a.h.i.length=0,I(a.i),a.i.length=0),a.l.oa()}}function If(a,h,p){var m=p instanceof gn?xt(p):new gn(p);if(m.g!="")h&&(m.g=h+"."+m.g),ai(m,m.u);else{var C=o.location;m=C.protocol,h=h?h+"."+C.hostname:C.hostname,C=+C.port;const D=new gn(null);m&&oi(D,m),h&&(D.g=h),C&&ai(D,C),p&&(D.h=p),m=D}return p=a.G,h=a.wa,p&&h&&fe(m,p,h),fe(m,"VER",a.ka),pi(a,m),m}function wf(a,h,p){if(h&&!a.L)throw Error("Can't create secondary domain capable XhrIo object.");return h=a.Aa&&!a.ma?new Ee(new Yc({ab:p})):new Ee(a.ma),h.Fa(a.L),h}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Ef(){}n=Ef.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function Bo(){}Bo.prototype.g=function(a,h){return new ft(a,h)};function ft(a,h){ze.call(this),this.g=new lf(h),this.l=a,this.h=h&&h.messageUrlParams||null,a=h&&h.messageHeaders||null,h&&h.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=h&&h.initMessageHeaders||null,h&&h.messageContentType&&(a?a["X-WebChannel-Content-Type"]=h.messageContentType:a={"X-WebChannel-Content-Type":h.messageContentType}),h&&h.sa&&(a?a["X-WebChannel-Client-Profile"]=h.sa:a={"X-WebChannel-Client-Profile":h.sa}),this.g.U=a,(a=h&&h.Qb)&&!E(a)&&(this.g.u=a),this.A=h&&h.supportsCrossDomainXhr||!1,this.v=h&&h.sendRawJson||!1,(h=h&&h.httpSessionIdParam)&&!E(h)&&(this.g.G=h,a=this.h,a!==null&&h in a&&(a=this.h,h in a&&delete a[h])),this.j=new Kr(this)}f(ft,ze),ft.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},ft.prototype.close=function(){Zc(this.g)},ft.prototype.o=function(a){var h=this.g;if(typeof a=="string"){var p={};p.__data__=a,a=p}else this.v&&(p={},p.__data__=jc(a),a=p);h.i.push(new HE(h.Ya++,a)),h.I==3&&Uo(h)},ft.prototype.N=function(){this.g.l=null,delete this.j,Zc(this.g),delete this.g,ft.Z.N.call(this)};function Tf(a){Bc.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var h=a.__sm__;if(h){e:{for(const p in h){a=p;break e}a=void 0}(this.i=a)&&(a=this.i,h=h!==null&&a in h?h[a]:void 0),this.data=h}else this.data=a}f(Tf,Bc);function Af(){Gc.call(this),this.status=1}f(Af,Gc);function Kr(a){this.g=a}f(Kr,Ef),Kr.prototype.ra=function(){Je(this.g,"a")},Kr.prototype.qa=function(a){Je(this.g,new Tf(a))},Kr.prototype.pa=function(a){Je(this.g,new Af)},Kr.prototype.oa=function(){Je(this.g,"b")},Bo.prototype.createWebChannel=Bo.prototype.g,ft.prototype.send=ft.prototype.o,ft.prototype.open=ft.prototype.m,ft.prototype.close=ft.prototype.close,b_=function(){return new Bo},v_=function(){return Do()},A_=tr,qu={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},No.NO_ERROR=0,No.TIMEOUT=8,No.HTTP_ERROR=6,oa=No,Fd.COMPLETE="complete",T_=Fd,Nd.EventType=ei,ei.OPEN="a",ei.CLOSE="b",ei.ERROR="c",ei.MESSAGE="d",ze.prototype.listen=ze.prototype.J,vi=Nd,Ee.prototype.listenOnce=Ee.prototype.K,Ee.prototype.getLastError=Ee.prototype.Ha,Ee.prototype.getLastErrorCode=Ee.prototype.ya,Ee.prototype.getStatus=Ee.prototype.ca,Ee.prototype.getResponseJson=Ee.prototype.La,Ee.prototype.getResponseText=Ee.prototype.la,Ee.prototype.send=Ee.prototype.ea,Ee.prototype.setWithCredentials=Ee.prototype.Fa,E_=Ee}).apply(typeof Ko<"u"?Ko:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ue{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Ue.UNAUTHENTICATED=new Ue(null),Ue.GOOGLE_CREDENTIALS=new Ue("google-credentials-uid"),Ue.FIRST_PARTY=new Ue("first-party-uid"),Ue.MOCK_USER=new Ue("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Fs="12.12.0";function oR(n){Fs=n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fn=new Ya("@firebase/firestore");function Zr(){return Fn.logLevel}function aR(n){Fn.setLogLevel(n)}function O(n,...e){if(Fn.logLevel<=ne.DEBUG){const t=e.map(ql);Fn.debug(`Firestore (${Fs}): ${n}`,...t)}}function ve(n,...e){if(Fn.logLevel<=ne.ERROR){const t=e.map(ql);Fn.error(`Firestore (${Fs}): ${n}`,...t)}}function dt(n,...e){if(Fn.logLevel<=ne.WARN){const t=e.map(ql);Fn.warn(`Firestore (${Fs}): ${n}`,...t)}}function ql(n){if(typeof n=="string")return n;try{return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function B(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,S_(n,r,t)}function S_(n,e,t){let r=`FIRESTORE (${Fs}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw ve(r),new Error(r)}function q(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||S_(e,s,r)}function cR(n,e){n||B(57014,e)}function M(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const x={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class N extends wt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class R_{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class P_{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Ue.UNAUTHENTICATED))}shutdown(){}}class uR{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class lR{constructor(e){this.t=e,this.currentUser=Ue.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){q(this.o===void 0,42304);let r=this.i;const s=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve();let i=new Be;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Be,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const u=i;e.enqueueRetryable(async()=>{await u.promise,await s(this.currentUser)})},c=u=>{O("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(u=>c(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(O("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Be)}},0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(O("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(q(typeof r.accessToken=="string",31837,{l:r}),new R_(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return q(e===null||typeof e=="string",2055,{h:e}),new Ue(e)}}class hR{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=Ue.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class dR{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new hR(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(Ue.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class $u{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class fR{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,et(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){q(this.o===void 0,3512);const r=i=>{i.error!=null&&O("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.m;return this.m=i.token,O("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{O("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):O("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new $u(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(q(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new $u(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}class pR{getToken(){return Promise.resolve(new $u(""))}invalidateToken(){}start(e,t){}shutdown(){}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gR(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rc{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=gR(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function H(n,e){return n<e?-1:n>e?1:0}function zu(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const s=n.charAt(r),i=e.charAt(r);if(s!==i)return fu(s)===fu(i)?H(s,i):fu(s)?1:-1}return H(n.length,e.length)}const mR=55296,_R=57343;function fu(n){const e=n.charCodeAt(0);return e>=mR&&e<=_R}function ps(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}function C_(n){return n+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ku="__name__";class Dt{constructor(e,t,r){t===void 0?t=0:t>e.length&&B(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&B(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return Dt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Dt?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=Dt.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return H(e.length,t.length)}static compareSegments(e,t){const r=Dt.isNumericId(e),s=Dt.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?Dt.extractNumericId(e).compare(Dt.extractNumericId(t)):zu(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Vn.fromString(e.substring(4,e.length-2))}}class Z extends Dt{construct(e,t,r){return new Z(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new N(x.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new Z(t)}static emptyPath(){return new Z([])}}const yR=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ge extends Dt{construct(e,t,r){return new ge(e,t,r)}static isValidIdentifier(e){return yR.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ge.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Ku}static keyField(){return new ge([Ku])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new N(x.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let o=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new N(x.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new N(x.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else c==="`"?(o=!o,s++):c!=="."||o?(r+=c,s++):(i(),s++)}if(i(),o)throw new N(x.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ge(t)}static emptyPath(){return new ge([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{constructor(e){this.path=e}static fromPath(e){return new L(Z.fromString(e))}static fromName(e){return new L(Z.fromString(e).popFirst(5))}static empty(){return new L(Z.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Z.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Z.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new L(new Z(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $l(n,e,t){if(!t)throw new N(x.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function x_(n,e,t,r){if(e===!0&&r===!0)throw new N(x.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function op(n){if(!L.isDocumentKey(n))throw new N(x.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function ap(n){if(L.isDocumentKey(n))throw new N(x.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function k_(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function sc(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":B(12329,{type:typeof n})}function ee(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new N(x.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=sc(n);throw new N(x.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function D_(n,e){if(e<=0)throw new N(x.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Re(n,e){const t={typeString:n};return e&&(t.value=e),t}function Mr(n,e){if(!k_(n))throw new N(x.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const o=n[r];if(s&&typeof o!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&o!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new N(x.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cp=-62135596800,up=1e6;class oe{static now(){return oe.fromMillis(Date.now())}static fromDate(e){return oe.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*up);return new oe(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new N(x.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new N(x.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<cp)throw new N(x.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new N(x.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/up}_compareTo(e){return this.seconds===e.seconds?H(this.nanoseconds,e.nanoseconds):H(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:oe._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Mr(e,oe._jsonSchema))return new oe(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-cp;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}oe._jsonSchemaVersion="firestore/timestamp/1.0",oe._jsonSchema={type:Re("string",oe._jsonSchemaVersion),seconds:Re("number"),nanoseconds:Re("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ${static fromTimestamp(e){return new $(e)}static min(){return new $(new oe(0,0))}static max(){return new $(new oe(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gs=-1;class ms{constructor(e,t,r,s){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=s}}function Wu(n){return n.fields.find(e=>e.kind===2)}function cr(n){return n.fields.filter(e=>e.kind!==2)}function IR(n,e){let t=H(n.collectionGroup,e.collectionGroup);if(t!==0)return t;for(let r=0;r<Math.min(n.fields.length,e.fields.length);++r)if(t=wR(n.fields[r],e.fields[r]),t!==0)return t;return H(n.fields.length,e.fields.length)}ms.UNKNOWN_ID=-1;class mr{constructor(e,t){this.fieldPath=e,this.kind=t}}function wR(n,e){const t=ge.comparator(n.fieldPath,e.fieldPath);return t!==0?t:H(n.kind,e.kind)}class _s{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new _s(0,_t.min())}}function N_(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=$.fromTimestamp(r===1e9?new oe(t+1,0):new oe(t,r));return new _t(s,L.empty(),e)}function O_(n){return new _t(n.readTime,n.key,gs)}class _t{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new _t($.min(),L.empty(),gs)}static max(){return new _t($.max(),L.empty(),gs)}}function zl(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=L.comparator(n.documentKey,e.documentKey),t!==0?t:H(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const V_="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class L_{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Wn(n){if(n.code!==x.FAILED_PRECONDITION||n.message!==V_)throw n;O("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class S{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&B(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new S((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof S?t:S.resolve(t)}catch(t){return S.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):S.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):S.reject(t)}static resolve(e){return new S((t,r)=>{t(e)})}static reject(e){return new S((t,r)=>{r(e)})}static waitFor(e){return new S((t,r)=>{let s=0,i=0,o=!1;e.forEach(c=>{++s,c.next(()=>{++i,o&&i===s&&t()},u=>r(u))}),o=!0,i===s&&t()})}static or(e){let t=S.resolve(!1);for(const r of e)t=t.next(s=>s?S.resolve(s):r());return t}static forEach(e,t){const r=[];return e.forEach((s,i)=>{r.push(t.call(this,s,i))}),this.waitFor(r)}static mapArray(e,t){return new S((r,s)=>{const i=e.length,o=new Array(i);let c=0;for(let u=0;u<i;u++){const l=u;t(e[l]).next(d=>{o[l]=d,++c,c===i&&r(o)},d=>s(d))}})}static doWhile(e,t){return new S((r,s)=>{const i=()=>{e()===!0?t().next(()=>{i()},s):r()};i()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pt="SimpleDb";class ic{static open(e,t,r,s){try{return new ic(t,e.transaction(s,r))}catch(i){throw new Ci(t,i)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.S=new Be,this.transaction.oncomplete=()=>{this.S.resolve()},this.transaction.onabort=()=>{t.error?this.S.reject(new Ci(e,t.error)):this.S.resolve()},this.transaction.onerror=r=>{const s=Kl(r.target.error);this.S.reject(new Ci(e,s))}}get D(){return this.S.promise}abort(e){e&&this.S.reject(e),this.aborted||(O(pt,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}C(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new TR(t)}}class Bt{static delete(e){return O(pt,"Removing database:",e),lr(Rl().indexedDB.deleteDatabase(e)).toPromise()}static v(){if(!io())return!1;if(Bt.F())return!0;const e=Ne(),t=Bt.M(e),r=0<t&&t<10,s=M_(e),i=0<s&&s<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||r||i)}static F(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)==null?void 0:e.__PRIVATE_USE_MOCK_PERSISTENCE)==="YES"}static O(e,t){return e.store(t)}static M(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),r=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(r)}constructor(e,t,r){this.name=e,this.version=t,this.N=r,this.B=null,Bt.M(Ne())===12.2&&ve("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async L(e){return this.db||(O(pt,"Opening database:",this.name),this.db=await new Promise((t,r)=>{const s=indexedDB.open(this.name,this.version);s.onsuccess=i=>{const o=i.target.result;t(o)},s.onblocked=()=>{r(new Ci(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},s.onerror=i=>{const o=i.target.error;o.name==="VersionError"?r(new N(x.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?r(new N(x.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):r(new Ci(e,o))},s.onupgradeneeded=i=>{O(pt,'Database "'+this.name+'" requires upgrade from version:',i.oldVersion);const o=i.target.result;this.N.k(o,s.transaction,i.oldVersion,this.version).next(()=>{O(pt,"Database upgrade to version "+this.version+" complete")})}})),this.q&&(this.db.onversionchange=t=>this.q(t)),this.db}K(e){this.q=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,r,s){const i=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.L(e);const c=ic.open(this.db,e,i?"readonly":"readwrite",r),u=s(c).next(l=>(c.C(),l)).catch(l=>(c.abort(l),S.reject(l))).toPromise();return u.catch(()=>{}),await c.D,u}catch(c){const u=c,l=u.name!=="FirebaseError"&&o<3;if(O(pt,"Transaction failed with error:",u.message,"Retrying:",l),this.close(),!l)return Promise.reject(u)}}}close(){this.db&&this.db.close(),this.db=void 0}}function M_(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class ER{constructor(e){this.U=e,this.$=!1,this.W=null}get isDone(){return this.$}get G(){return this.W}set cursor(e){this.U=e}done(){this.$=!0}j(e){this.W=e}delete(){return lr(this.U.delete())}}class Ci extends N{constructor(e,t){super(x.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function Hn(n){return n.name==="IndexedDbTransactionError"}class TR{constructor(e){this.store=e}put(e,t){let r;return t!==void 0?(O(pt,"PUT",this.store.name,e,t),r=this.store.put(t,e)):(O(pt,"PUT",this.store.name,"<auto-key>",e),r=this.store.put(e)),lr(r)}add(e){return O(pt,"ADD",this.store.name,e,e),lr(this.store.add(e))}get(e){return lr(this.store.get(e)).next(t=>(t===void 0&&(t=null),O(pt,"GET",this.store.name,e,t),t))}delete(e){return O(pt,"DELETE",this.store.name,e),lr(this.store.delete(e))}count(){return O(pt,"COUNT",this.store.name),lr(this.store.count())}J(e,t){const r=this.options(e,t),s=r.index?this.store.index(r.index):this.store;if(typeof s.getAll=="function"){const i=s.getAll(r.range);return new S((o,c)=>{i.onerror=u=>{c(u.target.error)},i.onsuccess=u=>{o(u.target.result)}})}{const i=this.cursor(r),o=[];return this.H(i,(c,u)=>{o.push(u)}).next(()=>o)}}Z(e,t){const r=this.store.getAll(e,t===null?void 0:t);return new S((s,i)=>{r.onerror=o=>{i(o.target.error)},r.onsuccess=o=>{s(o.target.result)}})}X(e,t){O(pt,"DELETE ALL",this.store.name);const r=this.options(e,t);r.Y=!1;const s=this.cursor(r);return this.H(s,(i,o,c)=>c.delete())}ee(e,t){let r;t?r=e:(r={},t=e);const s=this.cursor(r);return this.H(s,t)}te(e){const t=this.cursor({});return new S((r,s)=>{t.onerror=i=>{const o=Kl(i.target.error);s(o)},t.onsuccess=i=>{const o=i.target.result;o?e(o.primaryKey,o.value).next(c=>{c?o.continue():r()}):r()}})}H(e,t){const r=[];return new S((s,i)=>{e.onerror=o=>{i(o.target.error)},e.onsuccess=o=>{const c=o.target.result;if(!c)return void s();const u=new ER(c),l=t(c.primaryKey,c.value,u);if(l instanceof S){const d=l.catch(f=>(u.done(),S.reject(f)));r.push(d)}u.isDone?s():u.G===null?c.continue():c.continue(u.G)}}).next(()=>S.waitFor(r))}options(e,t){let r;return e!==void 0&&(typeof e=="string"?r=e:t=e),{index:r,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const r=this.store.index(e.index);return e.Y?r.openKeyCursor(e.range,t):r.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function lr(n){return new S((e,t)=>{n.onsuccess=r=>{const s=r.target.result;e(s)},n.onerror=r=>{const s=Kl(r.target.error);t(s)}})}let lp=!1;function Kl(n){const e=Bt.M(Ne());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(n.message.indexOf(t)>=0){const r=new N("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return lp||(lp=!0,setTimeout(()=>{throw r},0)),r}}return n}const xi="IndexBackfiller";class AR{constructor(e,t){this.asyncQueue=e,this.ne=t,this.task=null}start(){this.re(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}re(e){O(xi,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{const t=await this.ne.ie();O(xi,`Documents written: ${t}`)}catch(t){Hn(t)?O(xi,"Ignoring IndexedDB error during index backfill: ",t):await Wn(t)}await this.re(6e4)})}}class vR{constructor(e,t){this.localStore=e,this.persistence=t}async ie(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.se(t,e))}se(e,t){const r=new Set;let s=t,i=!0;return S.doWhile(()=>i===!0&&s>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(o=>{if(o!==null&&!r.has(o))return O(xi,`Processing collection: ${o}`),this.oe(e,o,s).next(c=>{s-=c,r.add(o)});i=!1})).next(()=>t-s)}oe(e,t,r){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(s=>this.localStore.localDocuments.getNextDocuments(e,t,s,r).next(i=>{const o=i.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next(()=>this._e(s,i)).next(c=>(O(xi,`Updating offset: ${c}`),this.localStore.indexManager.updateCollectionGroup(e,t,c))).next(()=>o.size)}))}_e(e,t){let r=e;return t.changes.forEach((s,i)=>{const o=O_(i);zl(o,r)>0&&(r=o)}),new _t(r.readTime,r.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class it{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>t.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}it.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ln=-1;function fo(n){return n==null}function $i(n){return n===0&&1/n==-1/0}function F_(n){return typeof n=="number"&&Number.isInteger(n)&&!$i(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pa="";function He(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=hp(e)),e=bR(n.get(t),e);return hp(e)}function bR(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case Pa:t+="";break;default:t+=i}}return t}function hp(n){return n+Pa+""}function Vt(n){const e=n.length;if(q(e>=2,64408,{path:n}),e===2)return q(n.charAt(0)===Pa&&n.charAt(1)==="",56145,{path:n}),Z.emptyPath();const t=e-2,r=[];let s="";for(let i=0;i<e;){const o=n.indexOf(Pa,i);switch((o<0||o>t)&&B(50515,{path:n}),n.charAt(o+1)){case"":const c=n.substring(i,o);let u;s.length===0?u=c:(s+=c,u=s,s=""),r.push(u);break;case"":s+=n.substring(i,o),s+="\0";break;case"":s+=n.substring(i,o+1);break;default:B(61167,{path:n})}i=o+2}return new Z(r)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ur="remoteDocuments",po="owner",Wr="owner",zi="mutationQueues",SR="userId",Tt="mutations",dp="batchId",pr="userMutationsIndex",fp=["userId","batchId"];/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aa(n,e){return[n,He(e)]}function U_(n,e,t){return[n,He(e),t]}const RR={},ys="documentMutations",Ca="remoteDocumentsV14",PR=["prefixPath","collectionGroup","readTime","documentId"],ca="documentKeyIndex",CR=["prefixPath","collectionGroup","documentId"],j_="collectionGroupIndex",xR=["collectionGroup","readTime","prefixPath","documentId"],Ki="remoteDocumentGlobal",Hu="remoteDocumentGlobalKey",Is="targets",B_="queryTargetsIndex",kR=["canonicalId","targetId"],ws="targetDocuments",DR=["targetId","path"],Wl="documentTargetsIndex",NR=["path","targetId"],xa="targetGlobalKey",_r="targetGlobal",Wi="collectionParents",OR=["collectionId","parent"],Es="clientMetadata",VR="clientId",oc="bundles",LR="bundleId",ac="namedQueries",MR="name",Hl="indexConfiguration",FR="indexId",Qu="collectionGroupIndex",UR="collectionGroup",ki="indexState",jR=["indexId","uid"],G_="sequenceNumberIndex",BR=["uid","sequenceNumber"],Di="indexEntries",GR=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],q_="documentKeyIndex",qR=["indexId","uid","orderedDocumentKey"],cc="documentOverlays",$R=["userId","collectionPath","documentId"],Ju="collectionPathOverlayIndex",zR=["userId","collectionPath","largestBatchId"],$_="collectionGroupOverlayIndex",KR=["userId","collectionGroup","largestBatchId"],Ql="globals",WR="name",z_=[zi,Tt,ys,ur,Is,po,_r,ws,Es,Ki,Wi,oc,ac],HR=[...z_,cc],K_=[zi,Tt,ys,Ca,Is,po,_r,ws,Es,Ki,Wi,oc,ac,cc],W_=K_,Jl=[...W_,Hl,ki,Di],QR=Jl,H_=[...Jl,Ql],JR=H_;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yu extends L_{constructor(e,t){super(),this.le=e,this.currentSequenceNumber=t}}function Ve(n,e){const t=M(n);return Bt.O(t.le,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pp(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Qn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Q_(n,e){const t=[];for(const r in n)Object.prototype.hasOwnProperty.call(n,r)&&t.push(e(n[r],r,n));return t}function J_(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class de{constructor(e,t){this.comparator=e,this.root=t||qe.EMPTY}insert(e,t){return new de(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,qe.BLACK,null,null))}remove(e){return new de(this.comparator,this.root.remove(e,this.comparator).copy(null,null,qe.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Wo(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Wo(this.root,e,this.comparator,!1)}getReverseIterator(){return new Wo(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Wo(this.root,e,this.comparator,!0)}}class Wo{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class qe{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??qe.RED,this.left=s??qe.EMPTY,this.right=i??qe.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new qe(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return qe.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return qe.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,qe.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,qe.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw B(43730,{key:this.key,value:this.value});if(this.right.isRed())throw B(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw B(27949);return e+(this.isRed()?0:1)}}qe.EMPTY=null,qe.RED=!0,qe.BLACK=!1;qe.EMPTY=new class{constructor(){this.size=0}get key(){throw B(57766)}get value(){throw B(16141)}get color(){throw B(16727)}get left(){throw B(29726)}get right(){throw B(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new qe(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ue{constructor(e){this.comparator=e,this.data=new de(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new gp(this.data.getIterator())}getIteratorFrom(e){return new gp(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof ue)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new ue(this.comparator);return t.data=e,t}}class gp{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function Hr(n){return n.hasNext()?n.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ot{constructor(e){this.fields=e,e.sort(ge.comparator)}static empty(){return new ot([])}unionWith(e){let t=new ue(ge.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new ot(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return ps(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y_ extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function YR(){return typeof atob<"u"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class we{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Y_("Invalid base64 string: "+i):i}}(e);return new we(t)}static fromUint8Array(e){const t=function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i}(e);return new we(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return H(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}we.EMPTY_BYTE_STRING=new we("");const XR=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function tn(n){if(q(!!n,39018),typeof n=="string"){let e=0;const t=XR.exec(n);if(q(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:me(n.seconds),nanos:me(n.nanos)}}function me(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function nn(n){return typeof n=="string"?we.fromBase64String(n):we.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const X_="server_timestamp",Z_="__type__",ey="__previous_value__",ty="__local_write_time__";function uc(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[Z_])==null?void 0:r.stringValue)===X_}function lc(n){const e=n.mapValue.fields[ey];return uc(e)?lc(e):e}function Hi(n){const e=tn(n.mapValue.fields[ty].timestampValue);return new oe(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZR{constructor(e,t,r,s,i,o,c,u,l,d,f){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=l,this.isUsingEmulator=d,this.apiKey=f}}const Qi="(default)";class Un{constructor(e,t){this.projectId=e,this.database=t||Qi}static empty(){return new Un("","")}get isDefaultDatabase(){return this.database===Qi}isEqual(e){return e instanceof Un&&e.projectId===this.projectId&&e.database===this.database}}function e0(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new N(x.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Un(n.options.projectId,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yl="__type__",ny="__max__",Dn={mapValue:{fields:{__type__:{stringValue:ny}}}},Xl="__vector__",Ts="value",ua={nullValue:"NULL_VALUE"};function jn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?uc(n)?4:ry(n)?9007199254740991:hc(n)?10:11:B(28295,{value:n})}function qt(n,e){if(n===e)return!0;const t=jn(n);if(t!==jn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Hi(n).isEqual(Hi(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=tn(s.timestampValue),c=tn(i.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(s,i){return nn(s.bytesValue).isEqual(nn(i.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(s,i){return me(s.geoPointValue.latitude)===me(i.geoPointValue.latitude)&&me(s.geoPointValue.longitude)===me(i.geoPointValue.longitude)}(n,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return me(s.integerValue)===me(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=me(s.doubleValue),c=me(i.doubleValue);return o===c?$i(o)===$i(c):isNaN(o)&&isNaN(c)}return!1}(n,e);case 9:return ps(n.arrayValue.values||[],e.arrayValue.values||[],qt);case 10:case 11:return function(s,i){const o=s.mapValue.fields||{},c=i.mapValue.fields||{};if(pp(o)!==pp(c))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(c[u]===void 0||!qt(o[u],c[u])))return!1;return!0}(n,e);default:return B(52216,{left:n})}}function Ji(n,e){return(n.values||[]).find(t=>qt(t,e))!==void 0}function Bn(n,e){if(n===e)return 0;const t=jn(n),r=jn(e);if(t!==r)return H(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return H(n.booleanValue,e.booleanValue);case 2:return function(i,o){const c=me(i.integerValue||i.doubleValue),u=me(o.integerValue||o.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1}(n,e);case 3:return mp(n.timestampValue,e.timestampValue);case 4:return mp(Hi(n),Hi(e));case 5:return zu(n.stringValue,e.stringValue);case 6:return function(i,o){const c=nn(i),u=nn(o);return c.compareTo(u)}(n.bytesValue,e.bytesValue);case 7:return function(i,o){const c=i.split("/"),u=o.split("/");for(let l=0;l<c.length&&l<u.length;l++){const d=H(c[l],u[l]);if(d!==0)return d}return H(c.length,u.length)}(n.referenceValue,e.referenceValue);case 8:return function(i,o){const c=H(me(i.latitude),me(o.latitude));return c!==0?c:H(me(i.longitude),me(o.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return _p(n.arrayValue,e.arrayValue);case 10:return function(i,o){var g,I,b,P;const c=i.fields||{},u=o.fields||{},l=(g=c[Ts])==null?void 0:g.arrayValue,d=(I=u[Ts])==null?void 0:I.arrayValue,f=H(((b=l==null?void 0:l.values)==null?void 0:b.length)||0,((P=d==null?void 0:d.values)==null?void 0:P.length)||0);return f!==0?f:_p(l,d)}(n.mapValue,e.mapValue);case 11:return function(i,o){if(i===Dn.mapValue&&o===Dn.mapValue)return 0;if(i===Dn.mapValue)return 1;if(o===Dn.mapValue)return-1;const c=i.fields||{},u=Object.keys(c),l=o.fields||{},d=Object.keys(l);u.sort(),d.sort();for(let f=0;f<u.length&&f<d.length;++f){const g=zu(u[f],d[f]);if(g!==0)return g;const I=Bn(c[u[f]],l[d[f]]);if(I!==0)return I}return H(u.length,d.length)}(n.mapValue,e.mapValue);default:throw B(23264,{he:t})}}function mp(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return H(n,e);const t=tn(n),r=tn(e),s=H(t.seconds,r.seconds);return s!==0?s:H(t.nanos,r.nanos)}function _p(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=Bn(t[s],r[s]);if(i)return i}return H(t.length,r.length)}function As(n){return Xu(n)}function Xu(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=tn(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return nn(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return L.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=Xu(i);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${Xu(t.fields[o])}`;return s+"}"}(n.mapValue):B(61005,{value:n})}function la(n){switch(jn(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=lc(n);return e?16+la(e):16;case 5:return 2*n.stringValue.length;case 6:return nn(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,i)=>s+la(i),0)}(n.arrayValue);case 10:case 11:return function(r){let s=0;return Qn(r.fields,(i,o)=>{s+=i.length+la(o)}),s}(n.mapValue);default:throw B(13486,{value:n})}}function Ar(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function Zu(n){return!!n&&"integerValue"in n}function Yi(n){return!!n&&"arrayValue"in n}function yp(n){return!!n&&"nullValue"in n}function Ip(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function ha(n){return!!n&&"mapValue"in n}function hc(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[Yl])==null?void 0:r.stringValue)===Xl}function Ni(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return Qn(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=Ni(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Ni(n.arrayValue.values[t]);return e}return{...n}}function ry(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===ny}const sy={mapValue:{fields:{[Yl]:{stringValue:Xl},[Ts]:{arrayValue:{}}}}};function t0(n){return"nullValue"in n?ua:"booleanValue"in n?{booleanValue:!1}:"integerValue"in n||"doubleValue"in n?{doubleValue:NaN}:"timestampValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in n?{stringValue:""}:"bytesValue"in n?{bytesValue:""}:"referenceValue"in n?Ar(Un.empty(),L.empty()):"geoPointValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in n?{arrayValue:{}}:"mapValue"in n?hc(n)?sy:{mapValue:{}}:B(35942,{value:n})}function n0(n){return"nullValue"in n?{booleanValue:!1}:"booleanValue"in n?{doubleValue:NaN}:"integerValue"in n||"doubleValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in n?{stringValue:""}:"stringValue"in n?{bytesValue:""}:"bytesValue"in n?Ar(Un.empty(),L.empty()):"referenceValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in n?{arrayValue:{}}:"arrayValue"in n?sy:"mapValue"in n?hc(n)?{mapValue:{}}:Dn:B(61959,{value:n})}function wp(n,e){const t=Bn(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?-1:!n.inclusive&&e.inclusive?1:0}function Ep(n,e){const t=Bn(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?1:!n.inclusive&&e.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class je{constructor(e){this.value=e}static empty(){return new je({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!ha(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Ni(t)}setAll(e){let t=ge.emptyPath(),r={},s=[];e.forEach((o,c)=>{if(!t.isImmediateParentOf(c)){const u=this.getFieldsMap(t);this.applyChanges(u,r,s),r={},s=[],t=c.popLast()}o?r[c.lastSegment()]=Ni(o):s.push(c.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());ha(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return qt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];ha(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){Qn(t,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new je(Ni(this.value))}}function iy(n){const e=[];return Qn(n.fields,(t,r)=>{const s=new ge([t]);if(ha(r)){const i=iy(r.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)}),new ot(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pe{constructor(e,t,r,s,i,o,c){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=c}static newInvalidDocument(e){return new pe(e,0,$.min(),$.min(),$.min(),je.empty(),0)}static newFoundDocument(e,t,r,s){return new pe(e,1,t,$.min(),r,s,0)}static newNoDocument(e,t){return new pe(e,2,t,$.min(),$.min(),je.empty(),0)}static newUnknownDocument(e,t){return new pe(e,3,t,$.min(),$.min(),je.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual($.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=je.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=je.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=$.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof pe&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new pe(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gn{constructor(e,t){this.position=e,this.inclusive=t}}function Tp(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],o=n.position[s];if(i.field.isKeyField()?r=L.comparator(L.fromName(o.referenceValue),t.key):r=Bn(o,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Ap(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!qt(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xi{constructor(e,t="asc"){this.field=e,this.dir=t}}function r0(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oy{}class re extends oy{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new s0(e,t,r):t==="array-contains"?new a0(e,r):t==="in"?new dy(e,r):t==="not-in"?new c0(e,r):t==="array-contains-any"?new u0(e,r):new re(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new i0(e,r):new o0(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Bn(t,this.value)):t!==null&&jn(this.value)===jn(t)&&this.matchesComparison(Bn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return B(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ae extends oy{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new ae(e,t)}matches(e){return vs(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function vs(n){return n.op==="and"}function el(n){return n.op==="or"}function Zl(n){return ay(n)&&vs(n)}function ay(n){for(const e of n.filters)if(e instanceof ae)return!1;return!0}function tl(n){if(n instanceof re)return n.field.canonicalString()+n.op.toString()+As(n.value);if(Zl(n))return n.filters.map(e=>tl(e)).join(",");{const e=n.filters.map(t=>tl(t)).join(",");return`${n.op}(${e})`}}function cy(n,e){return n instanceof re?function(r,s){return s instanceof re&&r.op===s.op&&r.field.isEqual(s.field)&&qt(r.value,s.value)}(n,e):n instanceof ae?function(r,s){return s instanceof ae&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,o,c)=>i&&cy(o,s.filters[c]),!0):!1}(n,e):void B(19439)}function uy(n,e){const t=n.filters.concat(e);return ae.create(t,n.op)}function ly(n){return n instanceof re?function(t){return`${t.field.canonicalString()} ${t.op} ${As(t.value)}`}(n):n instanceof ae?function(t){return t.op.toString()+" {"+t.getFilters().map(ly).join(" ,")+"}"}(n):"Filter"}class s0 extends re{constructor(e,t,r){super(e,t,r),this.key=L.fromName(r.referenceValue)}matches(e){const t=L.comparator(e.key,this.key);return this.matchesComparison(t)}}class i0 extends re{constructor(e,t){super(e,"in",t),this.keys=hy("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class o0 extends re{constructor(e,t){super(e,"not-in",t),this.keys=hy("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function hy(n,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map(r=>L.fromName(r.referenceValue))}class a0 extends re{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Yi(t)&&Ji(t.arrayValue,this.value)}}class dy extends re{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Ji(this.value.arrayValue,t)}}class c0 extends re{constructor(e,t){super(e,"not-in",t)}matches(e){if(Ji(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Ji(this.value.arrayValue,t)}}class u0 extends re{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Yi(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>Ji(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class l0{constructor(e,t=null,r=[],s=[],i=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=c,this.Te=null}}function nl(n,e=null,t=[],r=[],s=null,i=null,o=null){return new l0(n,e,t,r,s,i,o)}function vr(n){const e=M(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>tl(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),fo(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>As(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>As(r)).join(",")),e.Te=t}return e.Te}function go(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!r0(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!cy(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Ap(n.startAt,e.startAt)&&Ap(n.endAt,e.endAt)}function ka(n){return L.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function Da(n,e){return n.filters.filter(t=>t instanceof re&&t.field.isEqual(e))}function vp(n,e,t){let r=ua,s=!0;for(const i of Da(n,e)){let o=ua,c=!0;switch(i.op){case"<":case"<=":o=t0(i.value);break;case"==":case"in":case">=":o=i.value;break;case">":o=i.value,c=!1;break;case"!=":case"not-in":o=ua}wp({value:r,inclusive:s},{value:o,inclusive:c})<0&&(r=o,s=c)}if(t!==null){for(let i=0;i<n.orderBy.length;++i)if(n.orderBy[i].field.isEqual(e)){const o=t.position[i];wp({value:r,inclusive:s},{value:o,inclusive:t.inclusive})<0&&(r=o,s=t.inclusive);break}}return{value:r,inclusive:s}}function bp(n,e,t){let r=Dn,s=!0;for(const i of Da(n,e)){let o=Dn,c=!0;switch(i.op){case">=":case">":o=n0(i.value),c=!1;break;case"==":case"in":case"<=":o=i.value;break;case"<":o=i.value,c=!1;break;case"!=":case"not-in":o=Dn}Ep({value:r,inclusive:s},{value:o,inclusive:c})>0&&(r=o,s=c)}if(t!==null){for(let i=0;i<n.orderBy.length;++i)if(n.orderBy[i].field.isEqual(e)){const o=t.position[i];Ep({value:r,inclusive:s},{value:o,inclusive:t.inclusive})>0&&(r=o,s=t.inclusive);break}}return{value:r,inclusive:s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class un{constructor(e,t=null,r=[],s=[],i=null,o="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=c,this.endAt=u,this.Ee=null,this.Ie=null,this.Re=null,this.startAt,this.endAt}}function fy(n,e,t,r,s,i,o,c){return new un(n,e,t,r,s,i,o,c)}function Us(n){return new un(n)}function Sp(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function h0(n){return L.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function eh(n){return n.collectionGroup!==null}function cs(n){const e=M(n);if(e.Ee===null){e.Ee=[];const t=new Set;for(const i of e.explicitOrderBy)e.Ee.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new ue(ge.comparator);return o.filters.forEach(u=>{u.getFlattenedFilters().forEach(l=>{l.isInequality()&&(c=c.add(l.field))})}),c})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.Ee.push(new Xi(i,r))}),t.has(ge.keyField().canonicalString())||e.Ee.push(new Xi(ge.keyField(),r))}return e.Ee}function Qe(n){const e=M(n);return e.Ie||(e.Ie=gy(e,cs(n))),e.Ie}function py(n){const e=M(n);return e.Re||(e.Re=gy(e,n.explicitOrderBy)),e.Re}function gy(n,e){if(n.limitType==="F")return nl(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new Xi(s.field,i)});const t=n.endAt?new Gn(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Gn(n.startAt.position,n.startAt.inclusive):null;return nl(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function rl(n,e){const t=n.filters.concat([e]);return new un(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function d0(n,e){const t=n.explicitOrderBy.concat([e]);return new un(n.path,n.collectionGroup,t,n.filters.slice(),n.limit,n.limitType,n.startAt,n.endAt)}function Na(n,e,t){return new un(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function f0(n,e){return new un(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),n.limit,n.limitType,e,n.endAt)}function p0(n,e){return new un(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),n.limit,n.limitType,n.startAt,e)}function mo(n,e){return go(Qe(n),Qe(e))&&n.limitType===e.limitType}function my(n){return`${vr(Qe(n))}|lt:${n.limitType}`}function es(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(s=>ly(s)).join(", ")}]`),fo(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(s=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(s)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(s=>As(s)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(s=>As(s)).join(",")),`Target(${r})`}(Qe(n))}; limitType=${n.limitType})`}function _o(n,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):L.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(n,e)&&function(r,s){for(const i of cs(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(n,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(n,e)&&function(r,s){return!(r.startAt&&!function(o,c,u){const l=Tp(o,c,u);return o.inclusive?l<=0:l<0}(r.startAt,cs(r),s)||r.endAt&&!function(o,c,u){const l=Tp(o,c,u);return o.inclusive?l>=0:l>0}(r.endAt,cs(r),s))}(n,e)}function _y(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function yy(n){return(e,t)=>{let r=!1;for(const s of cs(n)){const i=g0(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function g0(n,e,t){const r=n.field.isKeyField()?L.comparator(e.key,t.key):function(i,o,c){const u=o.data.field(i),l=c.data.field(i);return u!==null&&l!==null?Bn(u,l):B(42886)}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return B(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ln{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Qn(this.inner,(t,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return J_(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const m0=new de(L.comparator);function at(){return m0}const Iy=new de(L.comparator);function bi(...n){let e=Iy;for(const t of n)e=e.insert(t.key,t);return e}function wy(n){let e=Iy;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function Lt(){return Oi()}function Ey(){return Oi()}function Oi(){return new ln(n=>n.toString(),(n,e)=>n.isEqual(e))}const _0=new de(L.comparator),y0=new ue(L.comparator);function J(...n){let e=y0;for(const t of n)e=e.add(t);return e}const I0=new ue(H);function th(){return I0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nh(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:$i(e)?"-0":e}}function Ty(n){return{integerValue:""+n}}function Ay(n,e){return F_(e)?Ty(e):nh(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dc{constructor(){this._=void 0}}function w0(n,e,t){return n instanceof bs?function(s,i){const o={fields:{[Z_]:{stringValue:X_},[ty]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&uc(i)&&(i=lc(i)),i&&(o.fields[ey]=i),{mapValue:o}}(t,e):n instanceof br?by(n,e):n instanceof Sr?Sy(n,e):function(s,i){const o=vy(s,i),c=Rp(o)+Rp(s.Ae);return Zu(o)&&Zu(s.Ae)?Ty(c):nh(s.serializer,c)}(n,e)}function E0(n,e,t){return n instanceof br?by(n,e):n instanceof Sr?Sy(n,e):t}function vy(n,e){return n instanceof Ss?function(r){return Zu(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class bs extends dc{}class br extends dc{constructor(e){super(),this.elements=e}}function by(n,e){const t=Ry(e);for(const r of n.elements)t.some(s=>qt(s,r))||t.push(r);return{arrayValue:{values:t}}}class Sr extends dc{constructor(e){super(),this.elements=e}}function Sy(n,e){let t=Ry(e);for(const r of n.elements)t=t.filter(s=>!qt(s,r));return{arrayValue:{values:t}}}class Ss extends dc{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function Rp(n){return me(n.integerValue||n.doubleValue)}function Ry(n){return Yi(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yo{constructor(e,t){this.field=e,this.transform=t}}function T0(n,e){return n.field.isEqual(e.field)&&function(r,s){return r instanceof br&&s instanceof br||r instanceof Sr&&s instanceof Sr?ps(r.elements,s.elements,qt):r instanceof Ss&&s instanceof Ss?qt(r.Ae,s.Ae):r instanceof bs&&s instanceof bs}(n.transform,e.transform)}class A0{constructor(e,t){this.version=e,this.transformResults=t}}class _e{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new _e}static exists(e){return new _e(void 0,e)}static updateTime(e){return new _e(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function da(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class fc{}function Py(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Bs(n.key,_e.none()):new js(n.key,n.data,_e.none());{const t=n.data,r=je.empty();let s=new ue(ge.comparator);for(let i of e.fields)if(!s.has(i)){let o=t.field(i);o===null&&i.length>1&&(i=i.popLast(),o=t.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new hn(n.key,r,new ot(s.toArray()),_e.none())}}function v0(n,e,t){n instanceof js?function(s,i,o){const c=s.value.clone(),u=Cp(s.fieldTransforms,i,o.transformResults);c.setAll(u),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(n,e,t):n instanceof hn?function(s,i,o){if(!da(s.precondition,i))return void i.convertToUnknownDocument(o.version);const c=Cp(s.fieldTransforms,i,o.transformResults),u=i.data;u.setAll(Cy(s)),u.setAll(c),i.convertToFoundDocument(o.version,u).setHasCommittedMutations()}(n,e,t):function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function Vi(n,e,t,r){return n instanceof js?function(i,o,c,u){if(!da(i.precondition,o))return c;const l=i.value.clone(),d=xp(i.fieldTransforms,u,o);return l.setAll(d),o.convertToFoundDocument(o.version,l).setHasLocalMutations(),null}(n,e,t,r):n instanceof hn?function(i,o,c,u){if(!da(i.precondition,o))return c;const l=xp(i.fieldTransforms,u,o),d=o.data;return d.setAll(Cy(i)),d.setAll(l),o.convertToFoundDocument(o.version,d).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(f=>f.field))}(n,e,t,r):function(i,o,c){return da(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c}(n,e,t)}function b0(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=vy(r.transform,s||null);i!=null&&(t===null&&(t=je.empty()),t.set(r.field,i))}return t||null}function Pp(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&ps(r,s,(i,o)=>T0(i,o))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class js extends fc{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class hn extends fc{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Cy(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function Cp(n,e,t){const r=new Map;q(n.length===t.length,32656,{Ve:t.length,de:n.length});for(let s=0;s<t.length;s++){const i=n[s],o=i.transform,c=e.data.field(i.field);r.set(i.field,E0(o,c,t[s]))}return r}function xp(n,e,t){const r=new Map;for(const s of n){const i=s.transform,o=t.data.field(s.field);r.set(s.field,w0(i,o,e))}return r}class Bs extends fc{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class rh extends fc{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sh{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&v0(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Vi(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Vi(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=Ey();return this.mutations.forEach(s=>{const i=e.get(s.key),o=i.overlayedDocument;let c=this.applyToLocalView(o,i.mutatedFields);c=t.has(s.key)?null:c;const u=Py(o,c);u!==null&&r.set(s.key,u),o.isValidDocument()||o.convertToNoDocument($.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),J())}isEqual(e){return this.batchId===e.batchId&&ps(this.mutations,e.mutations,(t,r)=>Pp(t,r))&&ps(this.baseMutations,e.baseMutations,(t,r)=>Pp(t,r))}}class ih{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){q(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let s=function(){return _0}();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new ih(e,t,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oh{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xy{constructor(e,t,r){this.alias=e,this.aggregateType=t,this.fieldPath=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class S0{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Se,se;function ky(n){switch(n){case x.OK:return B(64938);case x.CANCELLED:case x.UNKNOWN:case x.DEADLINE_EXCEEDED:case x.RESOURCE_EXHAUSTED:case x.INTERNAL:case x.UNAVAILABLE:case x.UNAUTHENTICATED:return!1;case x.INVALID_ARGUMENT:case x.NOT_FOUND:case x.ALREADY_EXISTS:case x.PERMISSION_DENIED:case x.FAILED_PRECONDITION:case x.ABORTED:case x.OUT_OF_RANGE:case x.UNIMPLEMENTED:case x.DATA_LOSS:return!0;default:return B(15467,{code:n})}}function Dy(n){if(n===void 0)return ve("GRPC error has no .code"),x.UNKNOWN;switch(n){case Se.OK:return x.OK;case Se.CANCELLED:return x.CANCELLED;case Se.UNKNOWN:return x.UNKNOWN;case Se.DEADLINE_EXCEEDED:return x.DEADLINE_EXCEEDED;case Se.RESOURCE_EXHAUSTED:return x.RESOURCE_EXHAUSTED;case Se.INTERNAL:return x.INTERNAL;case Se.UNAVAILABLE:return x.UNAVAILABLE;case Se.UNAUTHENTICATED:return x.UNAUTHENTICATED;case Se.INVALID_ARGUMENT:return x.INVALID_ARGUMENT;case Se.NOT_FOUND:return x.NOT_FOUND;case Se.ALREADY_EXISTS:return x.ALREADY_EXISTS;case Se.PERMISSION_DENIED:return x.PERMISSION_DENIED;case Se.FAILED_PRECONDITION:return x.FAILED_PRECONDITION;case Se.ABORTED:return x.ABORTED;case Se.OUT_OF_RANGE:return x.OUT_OF_RANGE;case Se.UNIMPLEMENTED:return x.UNIMPLEMENTED;case Se.DATA_LOSS:return x.DATA_LOSS;default:return B(39323,{code:n})}}(se=Se||(Se={}))[se.OK=0]="OK",se[se.CANCELLED=1]="CANCELLED",se[se.UNKNOWN=2]="UNKNOWN",se[se.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",se[se.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",se[se.NOT_FOUND=5]="NOT_FOUND",se[se.ALREADY_EXISTS=6]="ALREADY_EXISTS",se[se.PERMISSION_DENIED=7]="PERMISSION_DENIED",se[se.UNAUTHENTICATED=16]="UNAUTHENTICATED",se[se.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",se[se.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",se[se.ABORTED=10]="ABORTED",se[se.OUT_OF_RANGE=11]="OUT_OF_RANGE",se[se.UNIMPLEMENTED=12]="UNIMPLEMENTED",se[se.INTERNAL=13]="INTERNAL",se[se.UNAVAILABLE=14]="UNAVAILABLE",se[se.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Li=null;function R0(n){if(Li)throw new Error("a TestingHooksSpi instance is already set");Li=n}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ny(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P0=new Vn([4294967295,4294967295],0);function kp(n){const e=Ny().encode(n),t=new w_;return t.update(e),new Uint8Array(t.digest())}function Dp(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Vn([t,r],0),new Vn([s,i],0)]}class ah{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Si(`Invalid padding: ${t}`);if(r<0)throw new Si(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Si(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Si(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=Vn.fromNumber(this.ge)}ye(e,t,r){let s=e.add(t.multiply(Vn.fromNumber(r)));return s.compare(P0)===1&&(s=new Vn([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=kp(e),[r,s]=Dp(t);for(let i=0;i<this.hashCount;i++){const o=this.ye(r,s,i);if(!this.we(o))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new ah(i,s,t);return r.forEach(c=>o.insert(c)),o}insert(e){if(this.ge===0)return;const t=kp(e),[r,s]=Dp(t);for(let i=0;i<this.hashCount;i++){const o=this.ye(r,s,i);this.Se(o)}}Se(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class Si extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Io{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,wo.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new Io($.min(),s,new de(H),at(),J())}}class wo{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new wo(r,t,J(),J(),J())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fa{constructor(e,t,r,s){this.be=e,this.removedTargetIds=t,this.key=r,this.De=s}}class Oy{constructor(e,t){this.targetId=e,this.Ce=t}}class Vy{constructor(e,t,r=we.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class Np{constructor(){this.ve=0,this.Fe=Op(),this.Me=we.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=J(),t=J(),r=J();return this.Fe.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:B(38017,{changeType:i})}}),new wo(this.Me,this.xe,e,t,r)}qe(){this.Oe=!1,this.Fe=Op()}Ke(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,q(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class C0{constructor(e){this.Ge=e,this.ze=new Map,this.je=at(),this.Je=Ho(),this.He=Ho(),this.Ze=new de(H)}Xe(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,t=>{const r=this.nt(t);switch(e.state){case 0:this.rt(t)&&r.Le(e.resumeToken);break;case 1:r.We(),r.Ne||r.qe(),r.Le(e.resumeToken);break;case 2:r.We(),r.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(r.Qe(),r.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),r.Le(e.resumeToken));break;default:B(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach((r,s)=>{this.rt(s)&&t(s)})}st(e){const t=e.targetId,r=e.Ce.count,s=this.ot(t);if(s){const i=s.target;if(ka(i))if(r===0){const o=new L(i.path);this.et(t,o,pe.newNoDocument(o,$.min()))}else q(r===1,20013,{expectedCount:r});else{const o=this._t(t);if(o!==r){const c=this.ut(e),u=c?this.ct(c,e,o):1;if(u!==0){this.it(t);const l=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,l)}Li==null||Li.o(function(d,f,g,I,b){var V,j,U;const P={localCacheCount:d,existenceFilterCount:f.count,databaseId:g.database,projectId:g.projectId},k=f.unchangedNames;return k&&(P.bloomFilter={applied:b===0,hashCount:(k==null?void 0:k.hashCount)??0,bitmapLength:((j=(V=k==null?void 0:k.bits)==null?void 0:V.bitmap)==null?void 0:j.length)??0,padding:((U=k==null?void 0:k.bits)==null?void 0:U.padding)??0,mightContain:z=>(I==null?void 0:I.mightContain(z))??!1}),P}(o,e.Ce,this.Ge.ht(),c,u))}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let o,c;try{o=nn(r).toUint8Array()}catch(u){if(u instanceof Y_)return dt("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new ah(o,s,i)}catch(u){return dt(u instanceof Si?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.ge===0?null:c}ct(e,t,r){return t.Ce.count===r-this.Pt(e,t.targetId)?0:2}Pt(e,t){const r=this.Ge.getRemoteKeysForTarget(t);let s=0;return r.forEach(i=>{const o=this.Ge.ht(),c=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.et(t,i,null),s++)}),s}Tt(e){const t=new Map;this.ze.forEach((i,o)=>{const c=this.ot(o);if(c){if(i.current&&ka(c.target)){const u=new L(c.target.path);this.Et(u).has(o)||this.It(o,u)||this.et(o,u,pe.newNoDocument(u,e))}i.Be&&(t.set(o,i.ke()),i.qe())}});let r=J();this.He.forEach((i,o)=>{let c=!0;o.forEachWhile(u=>{const l=this.ot(u);return!l||l.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(i))}),this.je.forEach((i,o)=>o.setReadTime(e));const s=new Io(e,t,this.Ze,this.je,r);return this.je=at(),this.Je=Ho(),this.He=Ho(),this.Ze=new de(H),s}Ye(e,t){if(!this.rt(e))return;const r=this.It(e,t.key)?2:0;this.nt(e).Ke(t.key,r),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.Et(t.key).add(e)),this.He=this.He.insert(t.key,this.Rt(t.key).add(e))}et(e,t,r){if(!this.rt(e))return;const s=this.nt(e);this.It(e,t)?s.Ke(t,1):s.Ue(t),this.He=this.He.insert(t,this.Rt(t).delete(e)),this.He=this.He.insert(t,this.Rt(t).add(e)),r&&(this.je=this.je.insert(t,r))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.nt(e).$e()}nt(e){let t=this.ze.get(e);return t||(t=new Np,this.ze.set(e,t)),t}Rt(e){let t=this.He.get(e);return t||(t=new ue(H),this.He=this.He.insert(e,t)),t}Et(e){let t=this.Je.get(e);return t||(t=new ue(H),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||O("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new Np),this.Ge.getRemoteKeysForTarget(e).forEach(t=>{this.et(e,t,null)})}It(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function Ho(){return new de(L.comparator)}function Op(){return new de(L.comparator)}const x0={asc:"ASCENDING",desc:"DESCENDING"},k0={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},D0={and:"AND",or:"OR"};class N0{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function sl(n,e){return n.useProto3Json||fo(e)?e:{value:e}}function Rs(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Ly(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function O0(n,e){return Rs(n,e.toTimestamp())}function be(n){return q(!!n,49232),$.fromTimestamp(function(t){const r=tn(t);return new oe(r.seconds,r.nanos)}(n))}function ch(n,e){return il(n,e).canonicalString()}function il(n,e){const t=function(s){return new Z(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function My(n){const e=Z.fromString(n);return q(Ky(e),10190,{key:e.toString()}),e}function Zi(n,e){return ch(n.databaseId,e.path)}function Gt(n,e){const t=My(e);if(t.get(1)!==n.databaseId.projectId)throw new N(x.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new N(x.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new L(jy(t))}function Fy(n,e){return ch(n.databaseId,e)}function Uy(n){const e=My(n);return e.length===4?Z.emptyPath():jy(e)}function ol(n){return new Z(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function jy(n){return q(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Vp(n,e,t){return{name:Zi(n,e),fields:t.value.mapValue.fields}}function pc(n,e,t){const r=Gt(n,e.name),s=be(e.updateTime),i=e.createTime?be(e.createTime):$.min(),o=new je({mapValue:{fields:e.fields}}),c=pe.newFoundDocument(r,s,i,o);return t&&c.setHasCommittedMutations(),t?c.setHasCommittedMutations():c}function V0(n,e){return"found"in e?function(r,s){q(!!s.found,43571),s.found.name,s.found.updateTime;const i=Gt(r,s.found.name),o=be(s.found.updateTime),c=s.found.createTime?be(s.found.createTime):$.min(),u=new je({mapValue:{fields:s.found.fields}});return pe.newFoundDocument(i,o,c,u)}(n,e):"missing"in e?function(r,s){q(!!s.missing,3894),q(!!s.readTime,22933);const i=Gt(r,s.missing),o=be(s.readTime);return pe.newNoDocument(i,o)}(n,e):B(7234,{result:e})}function L0(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(l){return l==="NO_CHANGE"?0:l==="ADD"?1:l==="REMOVE"?2:l==="CURRENT"?3:l==="RESET"?4:B(39313,{state:l})}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(l,d){return l.useProto3Json?(q(d===void 0||typeof d=="string",58123),we.fromBase64String(d||"")):(q(d===void 0||d instanceof Buffer||d instanceof Uint8Array,16193),we.fromUint8Array(d||new Uint8Array))}(n,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&function(l){const d=l.code===void 0?x.UNKNOWN:Dy(l.code);return new N(d,l.message||"")}(o);t=new Vy(r,s,i,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=Gt(n,r.document.name),i=be(r.document.updateTime),o=r.document.createTime?be(r.document.createTime):$.min(),c=new je({mapValue:{fields:r.document.fields}}),u=pe.newFoundDocument(s,i,o,c),l=r.targetIds||[],d=r.removedTargetIds||[];t=new fa(l,d,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=Gt(n,r.document),i=r.readTime?be(r.readTime):$.min(),o=pe.newNoDocument(s,i),c=r.removedTargetIds||[];t=new fa([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=Gt(n,r.document),i=r.removedTargetIds||[];t=new fa([],i,s,null)}else{if(!("filter"in e))return B(11601,{Vt:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new S0(s,i),c=r.targetId;t=new Oy(c,o)}}return t}function eo(n,e){let t;if(e instanceof js)t={update:Vp(n,e.key,e.value)};else if(e instanceof Bs)t={delete:Zi(n,e.key)};else if(e instanceof hn)t={update:Vp(n,e.key,e.data),updateMask:G0(e.fieldMask)};else{if(!(e instanceof rh))return B(16599,{dt:e.type});t={verify:Zi(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(i,o){const c=o.transform;if(c instanceof bs)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof br)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Sr)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof Ss)return{fieldPath:o.field.canonicalString(),increment:c.Ae};throw B(20930,{transform:o.transform})}(0,r))),e.precondition.isNone||(t.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:O0(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:B(27497)}(n,e.precondition)),t}function al(n,e){const t=e.currentDocument?function(i){return i.updateTime!==void 0?_e.updateTime(be(i.updateTime)):i.exists!==void 0?_e.exists(i.exists):_e.none()}(e.currentDocument):_e.none(),r=e.updateTransforms?e.updateTransforms.map(s=>function(o,c){let u=null;if("setToServerValue"in c)q(c.setToServerValue==="REQUEST_TIME",16630,{proto:c}),u=new bs;else if("appendMissingElements"in c){const d=c.appendMissingElements.values||[];u=new br(d)}else if("removeAllFromArray"in c){const d=c.removeAllFromArray.values||[];u=new Sr(d)}else"increment"in c?u=new Ss(o,c.increment):B(16584,{proto:c});const l=ge.fromServerFormat(c.fieldPath);return new yo(l,u)}(n,s)):[];if(e.update){e.update.name;const s=Gt(n,e.update.name),i=new je({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=function(u){const l=u.fieldPaths||[];return new ot(l.map(d=>ge.fromServerFormat(d)))}(e.updateMask);return new hn(s,i,o,t,r)}return new js(s,i,t,r)}if(e.delete){const s=Gt(n,e.delete);return new Bs(s,t)}if(e.verify){const s=Gt(n,e.verify);return new rh(s,t)}return B(1463,{proto:e})}function M0(n,e){return n&&n.length>0?(q(e!==void 0,14353),n.map(t=>function(s,i){let o=s.updateTime?be(s.updateTime):be(i);return o.isEqual($.min())&&(o=be(i)),new A0(o,s.transformResults||[])}(t,e))):[]}function By(n,e){return{documents:[Fy(n,e.path)]}}function gc(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Fy(n,s);const i=function(l){if(l.length!==0)return zy(ae.create(l,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const o=function(l){if(l.length!==0)return l.map(d=>function(g){return{field:Pn(g.field),direction:U0(g.dir)}}(d))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);const c=sl(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(l){return{before:l.inclusive,values:l.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(l){return{before:!l.inclusive,values:l.position}}(e.endAt)),{ft:t,parent:s}}function Gy(n,e,t,r){const{ft:s,parent:i}=gc(n,e),o={},c=[];let u=0;return t.forEach(l=>{const d=r?l.alias:"aggregate_"+u++;o[d]=l.alias,l.aggregateType==="count"?c.push({alias:d,count:{}}):l.aggregateType==="avg"?c.push({alias:d,avg:{field:Pn(l.fieldPath)}}):l.aggregateType==="sum"&&c.push({alias:d,sum:{field:Pn(l.fieldPath)}})}),{request:{structuredAggregationQuery:{aggregations:c,structuredQuery:s.structuredQuery},parent:s.parent},gt:o,parent:i}}function qy(n){let e=Uy(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){q(r===1,65062);const d=t.from[0];d.allDescendants?s=d.collectionId:e=e.child(d.collectionId)}let i=[];t.where&&(i=function(f){const g=$y(f);return g instanceof ae&&Zl(g)?g.getFilters():[g]}(t.where));let o=[];t.orderBy&&(o=function(f){return f.map(g=>function(b){return new Xi(ts(b.field),function(k){switch(k){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(b.direction))}(g))}(t.orderBy));let c=null;t.limit&&(c=function(f){let g;return g=typeof f=="object"?f.value:f,fo(g)?null:g}(t.limit));let u=null;t.startAt&&(u=function(f){const g=!!f.before,I=f.values||[];return new Gn(I,g)}(t.startAt));let l=null;return t.endAt&&(l=function(f){const g=!f.before,I=f.values||[];return new Gn(I,g)}(t.endAt)),fy(e,s,o,i,c,"F",u,l)}function F0(n,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return B(28987,{purpose:s})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function $y(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=ts(t.unaryFilter.field);return re.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=ts(t.unaryFilter.field);return re.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=ts(t.unaryFilter.field);return re.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=ts(t.unaryFilter.field);return re.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return B(61313);default:return B(60726)}}(n):n.fieldFilter!==void 0?function(t){return re.create(ts(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return B(58110);default:return B(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return ae.create(t.compositeFilter.filters.map(r=>$y(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return B(1026)}}(t.compositeFilter.op))}(n):B(30097,{filter:n})}function U0(n){return x0[n]}function j0(n){return k0[n]}function B0(n){return D0[n]}function Pn(n){return{fieldPath:n.canonicalString()}}function ts(n){return ge.fromServerFormat(n.fieldPath)}function zy(n){return n instanceof re?function(t){if(t.op==="=="){if(Ip(t.value))return{unaryFilter:{field:Pn(t.field),op:"IS_NAN"}};if(yp(t.value))return{unaryFilter:{field:Pn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Ip(t.value))return{unaryFilter:{field:Pn(t.field),op:"IS_NOT_NAN"}};if(yp(t.value))return{unaryFilter:{field:Pn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Pn(t.field),op:j0(t.op),value:t.value}}}(n):n instanceof ae?function(t){const r=t.getFilters().map(s=>zy(s));return r.length===1?r[0]:{compositeFilter:{op:B0(t.op),filters:r}}}(n):B(54877,{filter:n})}function G0(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Ky(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function Wy(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qt{constructor(e,t,r,s,i=$.min(),o=$.min(),c=we.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new Qt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Qt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Qt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Qt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hy{constructor(e){this.yt=e}}function q0(n,e){let t;if(e.document)t=pc(n.yt,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const r=L.fromSegments(e.noDocument.path),s=Pr(e.noDocument.readTime);t=pe.newNoDocument(r,s),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return B(56709);{const r=L.fromSegments(e.unknownDocument.path),s=Pr(e.unknownDocument.version);t=pe.newUnknownDocument(r,s)}}return e.readTime&&t.setReadTime(function(s){const i=new oe(s[0],s[1]);return $.fromTimestamp(i)}(e.readTime)),t}function Lp(n,e){const t=e.key,r={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:Oa(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())r.document=function(i,o){return{name:Zi(i,o.key),fields:o.data.value.mapValue.fields,updateTime:Rs(i,o.version.toTimestamp()),createTime:Rs(i,o.createTime.toTimestamp())}}(n.yt,e);else if(e.isNoDocument())r.noDocument={path:t.path.toArray(),readTime:Rr(e.version)};else{if(!e.isUnknownDocument())return B(57904,{document:e});r.unknownDocument={path:t.path.toArray(),version:Rr(e.version)}}return r}function Oa(n){const e=n.toTimestamp();return[e.seconds,e.nanoseconds]}function Rr(n){const e=n.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function Pr(n){const e=new oe(n.seconds,n.nanoseconds);return $.fromTimestamp(e)}function hr(n,e){const t=(e.baseMutations||[]).map(i=>al(n.yt,i));for(let i=0;i<e.mutations.length-1;++i){const o=e.mutations[i];if(i+1<e.mutations.length&&e.mutations[i+1].transform!==void 0){const c=e.mutations[i+1];o.updateTransforms=c.transform.fieldTransforms,e.mutations.splice(i+1,1),++i}}const r=e.mutations.map(i=>al(n.yt,i)),s=oe.fromMillis(e.localWriteTimeMs);return new sh(e.batchId,s,t,r)}function Ri(n){const e=Pr(n.readTime),t=n.lastLimboFreeSnapshotVersion!==void 0?Pr(n.lastLimboFreeSnapshotVersion):$.min();let r;return r=function(i){return i.documents!==void 0}(n.query)?function(i){const o=i.documents.length;return q(o===1,1966,{count:o}),Qe(Us(Uy(i.documents[0])))}(n.query):function(i){return Qe(qy(i))}(n.query),new Qt(r,n.targetId,"TargetPurposeListen",n.lastListenSequenceNumber,e,t,we.fromBase64String(n.resumeToken))}function Qy(n,e){const t=Rr(e.snapshotVersion),r=Rr(e.lastLimboFreeSnapshotVersion);let s;s=ka(e.target)?By(n.yt,e.target):gc(n.yt,e.target).ft;const i=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:vr(e.target),readTime:t,resumeToken:i,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:s}}function mc(n){const e=qy({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Na(e,e.limit,"L"):e}function pu(n,e){return new oh(e.largestBatchId,al(n.yt,e.overlayMutation))}function Mp(n,e){const t=e.path.lastSegment();return[n,He(e.path.popLast()),t]}function Fp(n,e,t,r){return{indexId:n,uid:e,sequenceNumber:t,readTime:Rr(r.readTime),documentKey:He(r.documentKey.path),largestBatchId:r.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $0{getBundleMetadata(e,t){return Up(e).get(t).next(r=>{if(r)return function(i){return{id:i.bundleId,createTime:Pr(i.createTime),version:i.version}}(r)})}saveBundleMetadata(e,t){return Up(e).put(function(s){return{bundleId:s.id,createTime:Rr(be(s.createTime)),version:s.version}}(t))}getNamedQuery(e,t){return jp(e).get(t).next(r=>{if(r)return function(i){return{name:i.name,query:mc(i.bundledQuery),readTime:Pr(i.readTime)}}(r)})}saveNamedQuery(e,t){return jp(e).put(function(s){return{name:s.name,readTime:Rr(be(s.readTime)),bundledQuery:s.bundledQuery}}(t))}}function Up(n){return Ve(n,oc)}function jp(n){return Ve(n,ac)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _c{constructor(e,t){this.serializer=e,this.userId=t}static wt(e,t){const r=t.uid||"";return new _c(e,r)}getOverlay(e,t){return gi(e).get(Mp(this.userId,t)).next(r=>r?pu(this.serializer,r):null)}getOverlays(e,t){const r=Lt();return S.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){const s=[];return r.forEach((i,o)=>{const c=new oh(t,o);s.push(this.St(e,c))}),S.waitFor(s)}removeOverlaysForBatchId(e,t,r){const s=new Set;t.forEach(o=>s.add(He(o.getCollectionPath())));const i=[];return s.forEach(o=>{const c=IDBKeyRange.bound([this.userId,o,r],[this.userId,o,r+1],!1,!0);i.push(gi(e).X(Ju,c))}),S.waitFor(i)}getOverlaysForCollection(e,t,r){const s=Lt(),i=He(t),o=IDBKeyRange.bound([this.userId,i,r],[this.userId,i,Number.POSITIVE_INFINITY],!0);return gi(e).J(Ju,o).next(c=>{for(const u of c){const l=pu(this.serializer,u);s.set(l.getKey(),l)}return s})}getOverlaysForCollectionGroup(e,t,r,s){const i=Lt();let o;const c=IDBKeyRange.bound([this.userId,t,r],[this.userId,t,Number.POSITIVE_INFINITY],!0);return gi(e).ee({index:$_,range:c},(u,l,d)=>{const f=pu(this.serializer,l);i.size()<s||f.largestBatchId===o?(i.set(f.getKey(),f),o=f.largestBatchId):d.done()}).next(()=>i)}St(e,t){return gi(e).put(function(s,i,o){const[c,u,l]=Mp(i,o.mutation.key);return{userId:i,collectionPath:u,documentId:l,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:eo(s.yt,o.mutation)}}(this.serializer,this.userId,t))}}function gi(n){return Ve(n,cc)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z0{bt(e){return Ve(e,Ql)}getSessionToken(e){return this.bt(e).get("sessionToken").next(t=>{const r=t==null?void 0:t.value;return r?we.fromUint8Array(r):we.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.bt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dr{constructor(){}Dt(e,t){this.Ct(e,t),t.vt()}Ct(e,t){if("nullValue"in e)this.Ft(t,5);else if("booleanValue"in e)this.Ft(t,10),t.Mt(e.booleanValue?1:0);else if("integerValue"in e)this.Ft(t,15),t.Mt(me(e.integerValue));else if("doubleValue"in e){const r=me(e.doubleValue);isNaN(r)?this.Ft(t,13):(this.Ft(t,15),$i(r)?t.Mt(0):t.Mt(r))}else if("timestampValue"in e){let r=e.timestampValue;this.Ft(t,20),typeof r=="string"&&(r=tn(r)),t.xt(`${r.seconds||""}`),t.Mt(r.nanos||0)}else if("stringValue"in e)this.Ot(e.stringValue,t),this.Nt(t);else if("bytesValue"in e)this.Ft(t,30),t.Bt(nn(e.bytesValue)),this.Nt(t);else if("referenceValue"in e)this.Lt(e.referenceValue,t);else if("geoPointValue"in e){const r=e.geoPointValue;this.Ft(t,45),t.Mt(r.latitude||0),t.Mt(r.longitude||0)}else"mapValue"in e?ry(e)?this.Ft(t,Number.MAX_SAFE_INTEGER):hc(e)?this.kt(e.mapValue,t):(this.qt(e.mapValue,t),this.Nt(t)):"arrayValue"in e?(this.Kt(e.arrayValue,t),this.Nt(t)):B(19022,{Ut:e})}Ot(e,t){this.Ft(t,25),this.$t(e,t)}$t(e,t){t.xt(e)}qt(e,t){const r=e.fields||{};this.Ft(t,55);for(const s of Object.keys(r))this.Ot(s,t),this.Ct(r[s],t)}kt(e,t){var o,c;const r=e.fields||{};this.Ft(t,53);const s=Ts,i=((c=(o=r[s].arrayValue)==null?void 0:o.values)==null?void 0:c.length)||0;this.Ft(t,15),t.Mt(me(i)),this.Ot(s,t),this.Ct(r[s],t)}Kt(e,t){const r=e.values||[];this.Ft(t,50);for(const s of r)this.Ct(s,t)}Lt(e,t){this.Ft(t,37),L.fromName(e).path.forEach(r=>{this.Ft(t,60),this.$t(r,t)})}Ft(e,t){e.Mt(t)}Nt(e){e.Mt(2)}}dr.Wt=new dr;/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law | agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qr=255;function K0(n){if(n===0)return 8;let e=0;return n>>4||(e+=4,n<<=4),n>>6||(e+=2,n<<=2),n>>7||(e+=1),e}function Bp(n){const e=64-function(r){let s=0;for(let i=0;i<8;++i){const o=K0(255&r[i]);if(s+=o,o!==8)break}return s}(n);return Math.ceil(e/8)}class W0{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Qt(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Gt(r.value),r=t.next();this.zt()}jt(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Jt(r.value),r=t.next();this.Ht()}Zt(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Gt(r);else if(r<2048)this.Gt(960|r>>>6),this.Gt(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Gt(480|r>>>12),this.Gt(128|63&r>>>6),this.Gt(128|63&r);else{const s=t.codePointAt(0);this.Gt(240|s>>>18),this.Gt(128|63&s>>>12),this.Gt(128|63&s>>>6),this.Gt(128|63&s)}}this.zt()}Xt(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Jt(r);else if(r<2048)this.Jt(960|r>>>6),this.Jt(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Jt(480|r>>>12),this.Jt(128|63&r>>>6),this.Jt(128|63&r);else{const s=t.codePointAt(0);this.Jt(240|s>>>18),this.Jt(128|63&s>>>12),this.Jt(128|63&s>>>6),this.Jt(128|63&s)}}this.Ht()}Yt(e){const t=this.en(e),r=Bp(t);this.tn(1+r),this.buffer[this.position++]=255&r;for(let s=t.length-r;s<t.length;++s)this.buffer[this.position++]=255&t[s]}nn(e){const t=this.en(e),r=Bp(t);this.tn(1+r),this.buffer[this.position++]=~(255&r);for(let s=t.length-r;s<t.length;++s)this.buffer[this.position++]=~(255&t[s])}rn(){this.sn(Qr),this.sn(255)}_n(){this.an(Qr),this.an(255)}reset(){this.position=0}seed(e){this.tn(e.length),this.buffer.set(e,this.position),this.position+=e.length}un(){return this.buffer.slice(0,this.position)}en(e){const t=function(i){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,i,!1),new Uint8Array(o.buffer)}(e),r=!!(128&t[0]);t[0]^=r?255:128;for(let s=1;s<t.length;++s)t[s]^=r?255:0;return t}Gt(e){const t=255&e;t===0?(this.sn(0),this.sn(255)):t===Qr?(this.sn(Qr),this.sn(0)):this.sn(t)}Jt(e){const t=255&e;t===0?(this.an(0),this.an(255)):t===Qr?(this.an(Qr),this.an(0)):this.an(e)}zt(){this.sn(0),this.sn(1)}Ht(){this.an(0),this.an(1)}sn(e){this.tn(1),this.buffer[this.position++]=e}an(e){this.tn(1),this.buffer[this.position++]=~e}tn(e){const t=e+this.position;if(t<=this.buffer.length)return;let r=2*this.buffer.length;r<t&&(r=t);const s=new Uint8Array(r);s.set(this.buffer),this.buffer=s}}class H0{constructor(e){this.cn=e}Bt(e){this.cn.Qt(e)}xt(e){this.cn.Zt(e)}Mt(e){this.cn.Yt(e)}vt(){this.cn.rn()}}class Q0{constructor(e){this.cn=e}Bt(e){this.cn.jt(e)}xt(e){this.cn.Xt(e)}Mt(e){this.cn.nn(e)}vt(){this.cn._n()}}class mi{constructor(){this.cn=new W0,this.ascending=new H0(this.cn),this.descending=new Q0(this.cn)}seed(e){this.cn.seed(e)}ln(e){return e===0?this.ascending:this.descending}un(){return this.cn.un()}reset(){this.cn.reset()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fr{constructor(e,t,r,s){this.hn=e,this.Pn=t,this.Tn=r,this.En=s}In(){const e=this.En.length,t=e===0||this.En[e-1]===255?e+1:e,r=new Uint8Array(t);return r.set(this.En,0),t!==e?r.set([0],this.En.length):++r[r.length-1],new fr(this.hn,this.Pn,this.Tn,r)}Rn(e,t,r){return{indexId:this.hn,uid:e,arrayValue:pa(this.Tn),directionalValue:pa(this.En),orderedDocumentKey:pa(t),documentKey:r.path.toArray()}}An(e,t,r){const s=this.Rn(e,t,r);return[s.indexId,s.uid,s.arrayValue,s.directionalValue,s.orderedDocumentKey,s.documentKey]}}function En(n,e){let t=n.hn-e.hn;return t!==0?t:(t=Gp(n.Tn,e.Tn),t!==0?t:(t=Gp(n.En,e.En),t!==0?t:L.comparator(n.Pn,e.Pn)))}function Gp(n,e){for(let t=0;t<n.length&&t<e.length;++t){const r=n[t]-e[t];if(r!==0)return r}return n.length-e.length}function pa(n){return ym()?function(t){let r="";for(let s=0;s<t.length;s++)r+=String.fromCharCode(t[s]);return r}(n):n}function qp(n){return typeof n!="string"?n:function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(n)}class $p{constructor(e){this.Vn=new ue((t,r)=>ge.comparator(t.field,r.field)),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.dn=e.orderBy,this.mn=[];for(const t of e.filters){const r=t;r.isInequality()?this.Vn=this.Vn.add(r):this.mn.push(r)}}get fn(){return this.Vn.size>1}gn(e){if(q(e.collectionGroup===this.collectionId,49279),this.fn)return!1;const t=Wu(e);if(t!==void 0&&!this.pn(t))return!1;const r=cr(e);let s=new Set,i=0,o=0;for(;i<r.length&&this.pn(r[i]);++i)s=s.add(r[i].fieldPath.canonicalString());if(i===r.length)return!0;if(this.Vn.size>0){const c=this.Vn.getIterator().getNext();if(!s.has(c.field.canonicalString())){const u=r[i];if(!this.yn(c,u)||!this.wn(this.dn[o++],u))return!1}++i}for(;i<r.length;++i){const c=r[i];if(o>=this.dn.length||!this.wn(this.dn[o++],c))return!1}return!0}Sn(){if(this.fn)return null;let e=new ue(ge.comparator);const t=[];for(const r of this.mn)if(!r.field.isKeyField())if(r.op==="array-contains"||r.op==="array-contains-any")t.push(new mr(r.field,2));else{if(e.has(r.field))continue;e=e.add(r.field),t.push(new mr(r.field,0))}for(const r of this.dn)r.field.isKeyField()||e.has(r.field)||(e=e.add(r.field),t.push(new mr(r.field,r.dir==="asc"?0:1)));return new ms(ms.UNKNOWN_ID,this.collectionId,t,_s.empty())}pn(e){for(const t of this.mn)if(this.yn(t,e))return!0;return!1}yn(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const r=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===r}wn(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jy(n){var t,r;if(q(n instanceof re||n instanceof ae,20012),n instanceof re){if(n instanceof dy){const s=((r=(t=n.value.arrayValue)==null?void 0:t.values)==null?void 0:r.map(i=>re.create(n.field,"==",i)))||[];return ae.create(s,"or")}return n}const e=n.filters.map(s=>Jy(s));return ae.create(e,n.op)}function J0(n){if(n.getFilters().length===0)return[];const e=ll(Jy(n));return q(Yy(e),7391),cl(e)||ul(e)?[e]:e.getFilters()}function cl(n){return n instanceof re}function ul(n){return n instanceof ae&&Zl(n)}function Yy(n){return cl(n)||ul(n)||function(t){if(t instanceof ae&&el(t)){for(const r of t.getFilters())if(!cl(r)&&!ul(r))return!1;return!0}return!1}(n)}function ll(n){if(q(n instanceof re||n instanceof ae,34018),n instanceof re)return n;if(n.filters.length===1)return ll(n.filters[0]);const e=n.filters.map(r=>ll(r));let t=ae.create(e,n.op);return t=Va(t),Yy(t)?t:(q(t instanceof ae,64498),q(vs(t),40251),q(t.filters.length>1,57927),t.filters.reduce((r,s)=>uh(r,s)))}function uh(n,e){let t;return q(n instanceof re||n instanceof ae,38388),q(e instanceof re||e instanceof ae,25473),t=n instanceof re?e instanceof re?function(s,i){return ae.create([s,i],"and")}(n,e):zp(n,e):e instanceof re?zp(e,n):function(s,i){if(q(s.filters.length>0&&i.filters.length>0,48005),vs(s)&&vs(i))return uy(s,i.getFilters());const o=el(s)?s:i,c=el(s)?i:s,u=o.filters.map(l=>uh(l,c));return ae.create(u,"or")}(n,e),Va(t)}function zp(n,e){if(vs(e))return uy(e,n.getFilters());{const t=e.filters.map(r=>uh(n,r));return ae.create(t,"or")}}function Va(n){if(q(n instanceof re||n instanceof ae,11850),n instanceof re)return n;const e=n.getFilters();if(e.length===1)return Va(e[0]);if(ay(n))return n;const t=e.map(s=>Va(s)),r=[];return t.forEach(s=>{s instanceof re?r.push(s):s instanceof ae&&(s.op===n.op?r.push(...s.filters):r.push(s))}),r.length===1?r[0]:ae.create(r,n.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y0{constructor(){this.bn=new lh}addToCollectionParentIndex(e,t){return this.bn.add(t),S.resolve()}getCollectionParents(e,t){return S.resolve(this.bn.getEntries(t))}addFieldIndex(e,t){return S.resolve()}deleteFieldIndex(e,t){return S.resolve()}deleteAllFieldIndexes(e){return S.resolve()}createTargetIndexes(e,t){return S.resolve()}getDocumentsMatchingTarget(e,t){return S.resolve(null)}getIndexType(e,t){return S.resolve(0)}getFieldIndexes(e,t){return S.resolve([])}getNextCollectionGroupToUpdate(e){return S.resolve(null)}getMinOffset(e,t){return S.resolve(_t.min())}getMinOffsetFromCollectionGroup(e,t){return S.resolve(_t.min())}updateCollectionGroup(e,t,r){return S.resolve()}updateIndexEntries(e,t){return S.resolve()}}class lh{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new ue(Z.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new ue(Z.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kp="IndexedDbIndexManager",Qo=new Uint8Array(0);class X0{constructor(e,t){this.databaseId=t,this.Dn=new lh,this.Cn=new ln(r=>vr(r),(r,s)=>go(r,s)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.Dn.has(t)){const r=t.lastSegment(),s=t.popLast();e.addOnCommittedListener(()=>{this.Dn.add(t)});const i={collectionId:r,parent:He(s)};return Wp(e).put(i)}return S.resolve()}getCollectionParents(e,t){const r=[],s=IDBKeyRange.bound([t,""],[C_(t),""],!1,!0);return Wp(e).J(s).next(i=>{for(const o of i){if(o.collectionId!==t)break;r.push(Vt(o.parent))}return r})}addFieldIndex(e,t){const r=_i(e),s=function(c){return{indexId:c.indexId,collectionGroup:c.collectionGroup,fields:c.fields.map(u=>[u.fieldPath.canonicalString(),u.kind])}}(t);delete s.indexId;const i=r.add(s);if(t.indexState){const o=Yr(e);return i.next(c=>{o.put(Fp(c,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return i.next()}deleteFieldIndex(e,t){const r=_i(e),s=Yr(e),i=Jr(e);return r.delete(t.indexId).next(()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){const t=_i(e),r=Jr(e),s=Yr(e);return t.X().next(()=>r.X()).next(()=>s.X())}createTargetIndexes(e,t){return S.forEach(this.vn(t),r=>this.getIndexType(e,r).next(s=>{if(s===0||s===1){const i=new $p(r).Sn();if(i!=null)return this.addFieldIndex(e,i)}}))}getDocumentsMatchingTarget(e,t){const r=Jr(e);let s=!0;const i=new Map;return S.forEach(this.vn(t),o=>this.Fn(e,o).next(c=>{s&&(s=!!c),i.set(o,c)})).next(()=>{if(s){let o=J();const c=[];return S.forEach(i,(u,l)=>{O(Kp,`Using index ${function(U){return`id=${U.indexId}|cg=${U.collectionGroup}|f=${U.fields.map(z=>`${z.fieldPath}:${z.kind}`).join(",")}`}(u)} to execute ${vr(t)}`);const d=function(U,z){const K=Wu(z);if(K===void 0)return null;for(const Q of Da(U,K.fieldPath))switch(Q.op){case"array-contains-any":return Q.value.arrayValue.values||[];case"array-contains":return[Q.value]}return null}(l,u),f=function(U,z){const K=new Map;for(const Q of cr(z))for(const T of Da(U,Q.fieldPath))switch(T.op){case"==":case"in":K.set(Q.fieldPath.canonicalString(),T.value);break;case"not-in":case"!=":return K.set(Q.fieldPath.canonicalString(),T.value),Array.from(K.values())}return null}(l,u),g=function(U,z){const K=[];let Q=!0;for(const T of cr(z)){const y=T.kind===0?vp(U,T.fieldPath,U.startAt):bp(U,T.fieldPath,U.startAt);K.push(y.value),Q&&(Q=y.inclusive)}return new Gn(K,Q)}(l,u),I=function(U,z){const K=[];let Q=!0;for(const T of cr(z)){const y=T.kind===0?bp(U,T.fieldPath,U.endAt):vp(U,T.fieldPath,U.endAt);K.push(y.value),Q&&(Q=y.inclusive)}return new Gn(K,Q)}(l,u),b=this.Mn(u,l,g),P=this.Mn(u,l,I),k=this.xn(u,l,f),V=this.On(u.indexId,d,b,g.inclusive,P,I.inclusive,k);return S.forEach(V,j=>r.Z(j,t.limit).next(U=>{U.forEach(z=>{const K=L.fromSegments(z.documentKey);o.has(K)||(o=o.add(K),c.push(K))})}))}).next(()=>c)}return S.resolve(null)})}vn(e){let t=this.Cn.get(e);return t||(e.filters.length===0?t=[e]:t=J0(ae.create(e.filters,"and")).map(r=>nl(e.path,e.collectionGroup,e.orderBy,r.getFilters(),e.limit,e.startAt,e.endAt)),this.Cn.set(e,t),t)}On(e,t,r,s,i,o,c){const u=(t!=null?t.length:1)*Math.max(r.length,i.length),l=u/(t!=null?t.length:1),d=[];for(let f=0;f<u;++f){const g=t?this.Nn(t[f/l]):Qo,I=this.Bn(e,g,r[f%l],s),b=this.Ln(e,g,i[f%l],o),P=c.map(k=>this.Bn(e,g,k,!0));d.push(...this.createRange(I,b,P))}return d}Bn(e,t,r,s){const i=new fr(e,L.empty(),t,r);return s?i:i.In()}Ln(e,t,r,s){const i=new fr(e,L.empty(),t,r);return s?i.In():i}Fn(e,t){const r=new $p(t),s=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,s).next(i=>{let o=null;for(const c of i)r.gn(c)&&(!o||c.fields.length>o.fields.length)&&(o=c);return o})}getIndexType(e,t){let r=2;const s=this.vn(t);return S.forEach(s,i=>this.Fn(e,i).next(o=>{o?r!==0&&o.fields.length<function(u){let l=new ue(ge.comparator),d=!1;for(const f of u.filters)for(const g of f.getFlattenedFilters())g.field.isKeyField()||(g.op==="array-contains"||g.op==="array-contains-any"?d=!0:l=l.add(g.field));for(const f of u.orderBy)f.field.isKeyField()||(l=l.add(f.field));return l.size+(d?1:0)}(i)&&(r=1):r=0})).next(()=>function(o){return o.limit!==null}(t)&&s.length>1&&r===2?1:r)}kn(e,t){const r=new mi;for(const s of cr(e)){const i=t.data.field(s.fieldPath);if(i==null)return null;const o=r.ln(s.kind);dr.Wt.Dt(i,o)}return r.un()}Nn(e){const t=new mi;return dr.Wt.Dt(e,t.ln(0)),t.un()}qn(e,t){const r=new mi;return dr.Wt.Dt(Ar(this.databaseId,t),r.ln(function(i){const o=cr(i);return o.length===0?0:o[o.length-1].kind}(e))),r.un()}xn(e,t,r){if(r===null)return[];let s=[];s.push(new mi);let i=0;for(const o of cr(e)){const c=r[i++];for(const u of s)if(this.Kn(t,o.fieldPath)&&Yi(c))s=this.Un(s,o,c);else{const l=u.ln(o.kind);dr.Wt.Dt(c,l)}}return this.$n(s)}Mn(e,t,r){return this.xn(e,t,r.position)}$n(e){const t=[];for(let r=0;r<e.length;++r)t[r]=e[r].un();return t}Un(e,t,r){const s=[...e],i=[];for(const o of r.arrayValue.values||[])for(const c of s){const u=new mi;u.seed(c.un()),dr.Wt.Dt(o,u.ln(t.kind)),i.push(u)}return i}Kn(e,t){return!!e.filters.find(r=>r instanceof re&&r.field.isEqual(t)&&(r.op==="in"||r.op==="not-in"))}getFieldIndexes(e,t){const r=_i(e),s=Yr(e);return(t?r.J(Qu,IDBKeyRange.bound(t,t)):r.J()).next(i=>{const o=[];return S.forEach(i,c=>s.get([c.indexId,this.uid]).next(u=>{o.push(function(d,f){const g=f?new _s(f.sequenceNumber,new _t(Pr(f.readTime),new L(Vt(f.documentKey)),f.largestBatchId)):_s.empty(),I=d.fields.map(([b,P])=>new mr(ge.fromServerFormat(b),P));return new ms(d.indexId,d.collectionGroup,I,g)}(c,u))})).next(()=>o)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(t=>t.length===0?null:(t.sort((r,s)=>{const i=r.indexState.sequenceNumber-s.indexState.sequenceNumber;return i!==0?i:H(r.collectionGroup,s.collectionGroup)}),t[0].collectionGroup))}updateCollectionGroup(e,t,r){const s=_i(e),i=Yr(e);return this.Wn(e).next(o=>s.J(Qu,IDBKeyRange.bound(t,t)).next(c=>S.forEach(c,u=>i.put(Fp(u.indexId,this.uid,o,r)))))}updateIndexEntries(e,t){const r=new Map;return S.forEach(t,(s,i)=>{const o=r.get(s.collectionGroup);return(o?S.resolve(o):this.getFieldIndexes(e,s.collectionGroup)).next(c=>(r.set(s.collectionGroup,c),S.forEach(c,u=>this.Qn(e,s,u).next(l=>{const d=this.Gn(i,u);return l.isEqual(d)?S.resolve():this.zn(e,i,u,l,d)}))))})}jn(e,t,r,s){return Jr(e).put(s.Rn(this.uid,this.qn(r,t.key),t.key))}Jn(e,t,r,s){return Jr(e).delete(s.An(this.uid,this.qn(r,t.key),t.key))}Qn(e,t,r){const s=Jr(e);let i=new ue(En);return s.ee({index:q_,range:IDBKeyRange.only([r.indexId,this.uid,pa(this.qn(r,t))])},(o,c)=>{i=i.add(new fr(r.indexId,t,qp(c.arrayValue),qp(c.directionalValue)))}).next(()=>i)}Gn(e,t){let r=new ue(En);const s=this.kn(t,e);if(s==null)return r;const i=Wu(t);if(i!=null){const o=e.data.field(i.fieldPath);if(Yi(o))for(const c of o.arrayValue.values||[])r=r.add(new fr(t.indexId,e.key,this.Nn(c),s))}else r=r.add(new fr(t.indexId,e.key,Qo,s));return r}zn(e,t,r,s,i){O(Kp,"Updating index entries for document '%s'",t.key);const o=[];return function(u,l,d,f,g){const I=u.getIterator(),b=l.getIterator();let P=Hr(I),k=Hr(b);for(;P||k;){let V=!1,j=!1;if(P&&k){const U=d(P,k);U<0?j=!0:U>0&&(V=!0)}else P!=null?j=!0:V=!0;V?(f(k),k=Hr(b)):j?(g(P),P=Hr(I)):(P=Hr(I),k=Hr(b))}}(s,i,En,c=>{o.push(this.jn(e,t,r,c))},c=>{o.push(this.Jn(e,t,r,c))}),S.waitFor(o)}Wn(e){let t=1;return Yr(e).ee({index:G_,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(r,s,i)=>{i.done(),t=s.sequenceNumber+1}).next(()=>t)}createRange(e,t,r){r=r.sort((o,c)=>En(o,c)).filter((o,c,u)=>!c||En(o,u[c-1])!==0);const s=[];s.push(e);for(const o of r){const c=En(o,e),u=En(o,t);if(c===0)s[0]=e.In();else if(c>0&&u<0)s.push(o),s.push(o.In());else if(u>0)break}s.push(t);const i=[];for(let o=0;o<s.length;o+=2){if(this.Hn(s[o],s[o+1]))return[];const c=s[o].An(this.uid,Qo,L.empty()),u=s[o+1].An(this.uid,Qo,L.empty());i.push(IDBKeyRange.bound(c,u))}return i}Hn(e,t){return En(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(Hp)}getMinOffset(e,t){return S.mapArray(this.vn(t),r=>this.Fn(e,r).next(s=>s||B(44426))).next(Hp)}}function Wp(n){return Ve(n,Wi)}function Jr(n){return Ve(n,Di)}function _i(n){return Ve(n,Hl)}function Yr(n){return Ve(n,ki)}function Hp(n){q(n.length!==0,28825);let e=n[0].indexState.offset,t=e.largestBatchId;for(let r=1;r<n.length;r++){const s=n[r].indexState.offset;zl(s,e)<0&&(e=s),t<s.largestBatchId&&(t=s.largestBatchId)}return new _t(e.readTime,e.documentKey,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qp={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Xy=41943040;class We{static withCacheSize(e){return new We(e,We.DEFAULT_COLLECTION_PERCENTILE,We.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zy(n,e,t){const r=n.store(Tt),s=n.store(ys),i=[],o=IDBKeyRange.only(t.batchId);let c=0;const u=r.ee({range:o},(d,f,g)=>(c++,g.delete()));i.push(u.next(()=>{q(c===1,47070,{batchId:t.batchId})}));const l=[];for(const d of t.mutations){const f=U_(e,d.key.path,t.batchId);i.push(s.delete(f)),l.push(d.key)}return S.waitFor(i).next(()=>l)}function La(n){if(!n)return 0;let e;if(n.document)e=n.document;else if(n.unknownDocument)e=n.unknownDocument;else{if(!n.noDocument)throw B(14731);e=n.noDocument}return JSON.stringify(e).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */We.DEFAULT_COLLECTION_PERCENTILE=10,We.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,We.DEFAULT=new We(Xy,We.DEFAULT_COLLECTION_PERCENTILE,We.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),We.DISABLED=new We(-1,0,0);class yc{constructor(e,t,r,s){this.userId=e,this.serializer=t,this.indexManager=r,this.referenceDelegate=s,this.Zn={}}static wt(e,t,r,s){q(e.uid!=="",64387);const i=e.isAuthenticated()?e.uid:"";return new yc(i,t,r,s)}checkEmpty(e){let t=!0;const r=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return Tn(e).ee({index:pr,range:r},(s,i,o)=>{t=!1,o.done()}).next(()=>t)}addMutationBatch(e,t,r,s){const i=ns(e),o=Tn(e);return o.add({}).next(c=>{q(typeof c=="number",49019);const u=new sh(c,t,r,s),l=function(I,b,P){const k=P.baseMutations.map(j=>eo(I.yt,j)),V=P.mutations.map(j=>eo(I.yt,j));return{userId:b,batchId:P.batchId,localWriteTimeMs:P.localWriteTime.toMillis(),baseMutations:k,mutations:V}}(this.serializer,this.userId,u),d=[];let f=new ue((g,I)=>H(g.canonicalString(),I.canonicalString()));for(const g of s){const I=U_(this.userId,g.key.path,c);f=f.add(g.key.path.popLast()),d.push(o.put(l)),d.push(i.put(I,RR))}return f.forEach(g=>{d.push(this.indexManager.addToCollectionParentIndex(e,g))}),e.addOnCommittedListener(()=>{this.Zn[c]=u.keys()}),S.waitFor(d).next(()=>u)})}lookupMutationBatch(e,t){return Tn(e).get(t).next(r=>r?(q(r.userId===this.userId,48,"Unexpected user for mutation batch",{userId:r.userId,batchId:t}),hr(this.serializer,r)):null)}Xn(e,t){return this.Zn[t]?S.resolve(this.Zn[t]):this.lookupMutationBatch(e,t).next(r=>{if(r){const s=r.keys();return this.Zn[t]=s,s}return null})}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=IDBKeyRange.lowerBound([this.userId,r]);let i=null;return Tn(e).ee({index:pr,range:s},(o,c,u)=>{c.userId===this.userId&&(q(c.batchId>=r,47524,{Yn:r}),i=hr(this.serializer,c)),u.done()}).next(()=>i)}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let r=Ln;return Tn(e).ee({index:pr,range:t,reverse:!0},(s,i,o)=>{r=i.batchId,o.done()}).next(()=>r)}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,Ln],[this.userId,Number.POSITIVE_INFINITY]);return Tn(e).J(pr,t).next(r=>r.map(s=>hr(this.serializer,s)))}getAllMutationBatchesAffectingDocumentKey(e,t){const r=aa(this.userId,t.path),s=IDBKeyRange.lowerBound(r),i=[];return ns(e).ee({range:s},(o,c,u)=>{const[l,d,f]=o,g=Vt(d);if(l===this.userId&&t.path.isEqual(g))return Tn(e).get(f).next(I=>{if(!I)throw B(61480,{er:o,batchId:f});q(I.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:I.userId,batchId:f}),i.push(hr(this.serializer,I))});u.done()}).next(()=>i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new ue(H);const s=[];return t.forEach(i=>{const o=aa(this.userId,i.path),c=IDBKeyRange.lowerBound(o),u=ns(e).ee({range:c},(l,d,f)=>{const[g,I,b]=l,P=Vt(I);g===this.userId&&i.path.isEqual(P)?r=r.add(b):f.done()});s.push(u)}),S.waitFor(s).next(()=>this.tr(e,r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1,i=aa(this.userId,r),o=IDBKeyRange.lowerBound(i);let c=new ue(H);return ns(e).ee({range:o},(u,l,d)=>{const[f,g,I]=u,b=Vt(g);f===this.userId&&r.isPrefixOf(b)?b.length===s&&(c=c.add(I)):d.done()}).next(()=>this.tr(e,c))}tr(e,t){const r=[],s=[];return t.forEach(i=>{s.push(Tn(e).get(i).next(o=>{if(o===null)throw B(35274,{batchId:i});q(o.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:o.userId,batchId:i}),r.push(hr(this.serializer,o))}))}),S.waitFor(s).next(()=>r)}removeMutationBatch(e,t){return Zy(e.le,this.userId,t).next(r=>(e.addOnCommittedListener(()=>{this.nr(t.batchId)}),S.forEach(r,s=>this.referenceDelegate.markPotentiallyOrphaned(e,s))))}nr(e){delete this.Zn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return S.resolve();const r=IDBKeyRange.lowerBound(function(o){return[o]}(this.userId)),s=[];return ns(e).ee({range:r},(i,o,c)=>{if(i[0]===this.userId){const u=Vt(i[1]);s.push(u)}else c.done()}).next(()=>{q(s.length===0,56720,{rr:s.map(i=>i.canonicalString())})})})}containsKey(e,t){return eI(e,this.userId,t)}ir(e){return tI(e).get(this.userId).next(t=>t||{userId:this.userId,lastAcknowledgedBatchId:Ln,lastStreamToken:""})}}function eI(n,e,t){const r=aa(e,t.path),s=r[1],i=IDBKeyRange.lowerBound(r);let o=!1;return ns(n).ee({range:i,Y:!0},(c,u,l)=>{const[d,f,g]=c;d===e&&f===s&&(o=!0),l.done()}).next(()=>o)}function Tn(n){return Ve(n,Tt)}function ns(n){return Ve(n,ys)}function tI(n){return Ve(n,zi)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cr{constructor(e){this.sr=e}next(){return this.sr+=2,this.sr}static _r(){return new Cr(0)}static ar(){return new Cr(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z0{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.ur(e).next(t=>{const r=new Cr(t.highestTargetId);return t.highestTargetId=r.next(),this.cr(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.ur(e).next(t=>$.fromTimestamp(new oe(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.ur(e).next(t=>t.highestListenSequenceNumber)}setTargetsMetadata(e,t,r){return this.ur(e).next(s=>(s.highestListenSequenceNumber=t,r&&(s.lastRemoteSnapshotVersion=r.toTimestamp()),t>s.highestListenSequenceNumber&&(s.highestListenSequenceNumber=t),this.cr(e,s)))}addTargetData(e,t){return this.lr(e,t).next(()=>this.ur(e).next(r=>(r.targetCount+=1,this.hr(t,r),this.cr(e,r))))}updateTargetData(e,t){return this.lr(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>Xr(e).delete(t.targetId)).next(()=>this.ur(e)).next(r=>(q(r.targetCount>0,8065),r.targetCount-=1,this.cr(e,r)))}removeTargets(e,t,r){let s=0;const i=[];return Xr(e).ee((o,c)=>{const u=Ri(c);u.sequenceNumber<=t&&r.get(u.targetId)===null&&(s++,i.push(this.removeTargetData(e,u)))}).next(()=>S.waitFor(i)).next(()=>s)}forEachTarget(e,t){return Xr(e).ee((r,s)=>{const i=Ri(s);t(i)})}ur(e){return Jp(e).get(xa).next(t=>(q(t!==null,2888),t))}cr(e,t){return Jp(e).put(xa,t)}lr(e,t){return Xr(e).put(Qy(this.serializer,t))}hr(e,t){let r=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,r=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,r=!0),r}getTargetCount(e){return this.ur(e).next(t=>t.targetCount)}getTargetData(e,t){const r=vr(t),s=IDBKeyRange.bound([r,Number.NEGATIVE_INFINITY],[r,Number.POSITIVE_INFINITY]);let i=null;return Xr(e).ee({range:s,index:B_},(o,c,u)=>{const l=Ri(c);go(t,l.target)&&(i=l,u.done())}).next(()=>i)}addMatchingKeys(e,t,r){const s=[],i=Cn(e);return t.forEach(o=>{const c=He(o.path);s.push(i.put({targetId:r,path:c})),s.push(this.referenceDelegate.addReference(e,r,o))}),S.waitFor(s)}removeMatchingKeys(e,t,r){const s=Cn(e);return S.forEach(t,i=>{const o=He(i.path);return S.waitFor([s.delete([r,o]),this.referenceDelegate.removeReference(e,r,i)])})}removeMatchingKeysForTargetId(e,t){const r=Cn(e),s=IDBKeyRange.bound([t],[t+1],!1,!0);return r.delete(s)}getMatchingKeysForTargetId(e,t){const r=IDBKeyRange.bound([t],[t+1],!1,!0),s=Cn(e);let i=J();return s.ee({range:r,Y:!0},(o,c,u)=>{const l=Vt(o[1]),d=new L(l);i=i.add(d)}).next(()=>i)}containsKey(e,t){const r=He(t.path),s=IDBKeyRange.bound([r],[C_(r)],!1,!0);let i=0;return Cn(e).ee({index:Wl,Y:!0,range:s},([o,c],u,l)=>{o!==0&&(i++,l.done())}).next(()=>i>0)}At(e,t){return Xr(e).get(t).next(r=>r?Ri(r):null)}}function Xr(n){return Ve(n,Is)}function Jp(n){return Ve(n,_r)}function Cn(n){return Ve(n,ws)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yp="LruGarbageCollector",nI=1048576;function Xp([n,e],[t,r]){const s=H(n,t);return s===0?H(e,r):s}class eP{constructor(e){this.Pr=e,this.buffer=new ue(Xp),this.Tr=0}Er(){return++this.Tr}Ir(e){const t=[e,this.Er()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();Xp(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class rI{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(e){O(Yp,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Hn(t)?O(Yp,"Ignoring IndexedDB error during garbage collection: ",t):await Wn(t)}await this.Ar(3e5)})}}class tP{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.dr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return S.resolve(it.ce);const r=new eP(t);return this.Vr.forEachTarget(e,s=>r.Ir(s.sequenceNumber)).next(()=>this.Vr.mr(e,s=>r.Ir(s))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.Vr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(O("LruGarbageCollector","Garbage collection skipped; disabled"),S.resolve(Qp)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(O("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Qp):this.gr(e,t))}getCacheSize(e){return this.Vr.getCacheSize(e)}gr(e,t){let r,s,i,o,c,u,l;const d=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(f=>(f>this.params.maximumSequenceNumbersToCollect?(O("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${f}`),s=this.params.maximumSequenceNumbersToCollect):s=f,o=Date.now(),this.nthSequenceNumber(e,s))).next(f=>(r=f,c=Date.now(),this.removeTargets(e,r,t))).next(f=>(i=f,u=Date.now(),this.removeOrphanedDocuments(e,r))).next(f=>(l=Date.now(),Zr()<=ne.DEBUG&&O("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-d}ms
	Determined least recently used ${s} in `+(c-o)+`ms
	Removed ${i} targets in `+(u-c)+`ms
	Removed ${f} documents in `+(l-u)+`ms
Total Duration: ${l-d}ms`),S.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:f})))}}function sI(n,e){return new tP(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nP{constructor(e,t){this.db=e,this.garbageCollector=sI(this,t)}dr(e){const t=this.pr(e);return this.db.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}pr(e){let t=0;return this.mr(e,r=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}mr(e,t){return this.yr(e,(r,s)=>t(s))}addReference(e,t,r){return Jo(e,r)}removeReference(e,t,r){return Jo(e,r)}removeTargets(e,t,r){return this.db.getTargetCache().removeTargets(e,t,r)}markPotentiallyOrphaned(e,t){return Jo(e,t)}wr(e,t){return function(s,i){let o=!1;return tI(s).te(c=>eI(s,c,i).next(u=>(u&&(o=!0),S.resolve(!u)))).next(()=>o)}(e,t)}removeOrphanedDocuments(e,t){const r=this.db.getRemoteDocumentCache().newChangeBuffer(),s=[];let i=0;return this.yr(e,(o,c)=>{if(c<=t){const u=this.wr(e,o).next(l=>{if(!l)return i++,r.getEntry(e,o).next(()=>(r.removeEntry(o,$.min()),Cn(e).delete(function(f){return[0,He(f.path)]}(o))))});s.push(u)}}).next(()=>S.waitFor(s)).next(()=>r.apply(e)).next(()=>i)}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,r)}updateLimboDocument(e,t){return Jo(e,t)}yr(e,t){const r=Cn(e);let s,i=it.ce;return r.ee({index:Wl},([o,c],{path:u,sequenceNumber:l})=>{o===0?(i!==it.ce&&t(new L(Vt(s)),i),i=l,s=u):i=it.ce}).next(()=>{i!==it.ce&&t(new L(Vt(s)),i)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function Jo(n,e){return Cn(n).put(function(r,s){return{targetId:0,path:He(r.path),sequenceNumber:s}}(e,n.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iI{constructor(){this.changes=new ln(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,pe.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?S.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rP{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,r){return or(e).put(r)}removeEntry(e,t,r){return or(e).delete(function(i,o){const c=i.path.toArray();return[c.slice(0,c.length-2),c[c.length-2],Oa(o),c[c.length-1]]}(t,r))}updateMetadata(e,t){return this.getMetadata(e).next(r=>(r.byteSize+=t,this.Sr(e,r)))}getEntry(e,t){let r=pe.newInvalidDocument(t);return or(e).ee({index:ca,range:IDBKeyRange.only(yi(t))},(s,i)=>{r=this.br(t,i)}).next(()=>r)}Dr(e,t){let r={size:0,document:pe.newInvalidDocument(t)};return or(e).ee({index:ca,range:IDBKeyRange.only(yi(t))},(s,i)=>{r={document:this.br(t,i),size:La(i)}}).next(()=>r)}getEntries(e,t){let r=at();return this.Cr(e,t,(s,i)=>{const o=this.br(s,i);r=r.insert(s,o)}).next(()=>r)}vr(e,t){let r=at(),s=new de(L.comparator);return this.Cr(e,t,(i,o)=>{const c=this.br(i,o);r=r.insert(i,c),s=s.insert(i,La(o))}).next(()=>({documents:r,Fr:s}))}Cr(e,t,r){if(t.isEmpty())return S.resolve();let s=new ue(tg);t.forEach(u=>s=s.add(u));const i=IDBKeyRange.bound(yi(s.first()),yi(s.last())),o=s.getIterator();let c=o.getNext();return or(e).ee({index:ca,range:i},(u,l,d)=>{const f=L.fromSegments([...l.prefixPath,l.collectionGroup,l.documentId]);for(;c&&tg(c,f)<0;)r(c,null),c=o.getNext();c&&c.isEqual(f)&&(r(c,l),c=o.hasNext()?o.getNext():null),c?d.j(yi(c)):d.done()}).next(()=>{for(;c;)r(c,null),c=o.hasNext()?o.getNext():null})}getDocumentsMatchingQuery(e,t,r,s,i){const o=t.path,c=[o.popLast().toArray(),o.lastSegment(),Oa(r.readTime),r.documentKey.path.isEmpty()?"":r.documentKey.path.lastSegment()],u=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return or(e).J(IDBKeyRange.bound(c,u,!0)).next(l=>{i==null||i.incrementDocumentReadCount(l.length);let d=at();for(const f of l){const g=this.br(L.fromSegments(f.prefixPath.concat(f.collectionGroup,f.documentId)),f);g.isFoundDocument()&&(_o(t,g)||s.has(g.key))&&(d=d.insert(g.key,g))}return d})}getAllFromCollectionGroup(e,t,r,s){let i=at();const o=eg(t,r),c=eg(t,_t.max());return or(e).ee({index:j_,range:IDBKeyRange.bound(o,c,!0)},(u,l,d)=>{const f=this.br(L.fromSegments(l.prefixPath.concat(l.collectionGroup,l.documentId)),l);i=i.insert(f.key,f),i.size===s&&d.done()}).next(()=>i)}newChangeBuffer(e){return new sP(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(t=>t.byteSize)}getMetadata(e){return Zp(e).get(Hu).next(t=>(q(!!t,20021),t))}Sr(e,t){return Zp(e).put(Hu,t)}br(e,t){if(t){const r=q0(this.serializer,t);if(!(r.isNoDocument()&&r.version.isEqual($.min())))return r}return pe.newInvalidDocument(e)}}function oI(n){return new rP(n)}class sP extends iI{constructor(e,t){super(),this.Mr=e,this.trackRemovals=t,this.Or=new ln(r=>r.toString(),(r,s)=>r.isEqual(s))}applyChanges(e){const t=[];let r=0,s=new ue((i,o)=>H(i.canonicalString(),o.canonicalString()));return this.changes.forEach((i,o)=>{const c=this.Or.get(i);if(t.push(this.Mr.removeEntry(e,i,c.readTime)),o.isValidDocument()){const u=Lp(this.Mr.serializer,o);s=s.add(i.path.popLast());const l=La(u);r+=l-c.size,t.push(this.Mr.addEntry(e,i,u))}else if(r-=c.size,this.trackRemovals){const u=Lp(this.Mr.serializer,o.convertToNoDocument($.min()));t.push(this.Mr.addEntry(e,i,u))}}),s.forEach(i=>{t.push(this.Mr.indexManager.addToCollectionParentIndex(e,i))}),t.push(this.Mr.updateMetadata(e,r)),S.waitFor(t)}getFromCache(e,t){return this.Mr.Dr(e,t).next(r=>(this.Or.set(t,{size:r.size,readTime:r.document.readTime}),r.document))}getAllFromCache(e,t){return this.Mr.vr(e,t).next(({documents:r,Fr:s})=>(s.forEach((i,o)=>{this.Or.set(i,{size:o,readTime:r.get(i).readTime})}),r))}}function Zp(n){return Ve(n,Ki)}function or(n){return Ve(n,Ca)}function yi(n){const e=n.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function eg(n,e){const t=e.documentKey.path.toArray();return[n,Oa(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function tg(n,e){const t=n.path.toArray(),r=e.path.toArray();let s=0;for(let i=0;i<t.length-2&&i<r.length-2;++i)if(s=H(t[i],r[i]),s)return s;return s=H(t.length,r.length),s||(s=H(t[t.length-2],r[r.length-2]),s||H(t[t.length-1],r[r.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iP{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aI{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&Vi(r.mutation,s,ot.empty(),oe.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,J()).next(()=>r))}getLocalViewOfDocuments(e,t,r=J()){const s=Lt();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(i=>{let o=bi();return i.forEach((c,u)=>{o=o.insert(c,u.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){const r=Lt();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,J()))}populateOverlays(e,t,r){const s=[];return r.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((o,c)=>{t.set(o,c)})})}computeViews(e,t,r,s){let i=at();const o=Oi(),c=function(){return Oi()}();return t.forEach((u,l)=>{const d=r.get(l.key);s.has(l.key)&&(d===void 0||d.mutation instanceof hn)?i=i.insert(l.key,l):d!==void 0?(o.set(l.key,d.mutation.getFieldMask()),Vi(d.mutation,l,d.mutation.getFieldMask(),oe.now())):o.set(l.key,ot.empty())}),this.recalculateAndSaveOverlays(e,i).next(u=>(u.forEach((l,d)=>o.set(l,d)),t.forEach((l,d)=>c.set(l,new iP(d,o.get(l)??null))),c))}recalculateAndSaveOverlays(e,t){const r=Oi();let s=new de((o,c)=>o-c),i=J();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(const c of o)c.keys().forEach(u=>{const l=t.get(u);if(l===null)return;let d=r.get(u)||ot.empty();d=c.applyToLocalView(l,d),r.set(u,d);const f=(s.get(c.batchId)||J()).add(u);s=s.insert(c.batchId,f)})}).next(()=>{const o=[],c=s.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),l=u.key,d=u.value,f=Ey();d.forEach(g=>{if(!i.has(g)){const I=Py(t.get(g),r.get(g));I!==null&&f.set(g,I),i=i.add(g)}}),o.push(this.documentOverlayCache.saveOverlays(e,l,f))}return S.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,s){return h0(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):eh(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):S.resolve(Lt());let c=gs,u=i;return o.next(l=>S.forEach(l,(d,f)=>(c<f.largestBatchId&&(c=f.largestBatchId),i.get(d)?S.resolve():this.remoteDocumentCache.getEntry(e,d).next(g=>{u=u.insert(d,g)}))).next(()=>this.populateOverlays(e,l,i)).next(()=>this.computeViews(e,u,l,J())).next(d=>({batchId:c,changes:wy(d)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new L(t)).next(r=>{let s=bi();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let o=bi();return this.indexManager.getCollectionParents(e,i).next(c=>S.forEach(c,u=>{const l=function(f,g){return new un(g,null,f.explicitOrderBy.slice(),f.filters.slice(),f.limit,f.limitType,f.startAt,f.endAt)}(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,l,r,s).next(d=>{d.forEach((f,g)=>{o=o.insert(f,g)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s))).next(o=>{i.forEach((u,l)=>{const d=l.getKey();o.get(d)===null&&(o=o.insert(d,pe.newInvalidDocument(d)))});let c=bi();return o.forEach((u,l)=>{const d=i.get(u);d!==void 0&&Vi(d.mutation,l,ot.empty(),oe.now()),_o(t,l)&&(c=c.insert(u,l))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oP{constructor(e){this.serializer=e,this.Nr=new Map,this.Br=new Map}getBundleMetadata(e,t){return S.resolve(this.Nr.get(t))}saveBundleMetadata(e,t){return this.Nr.set(t.id,function(s){return{id:s.id,version:s.version,createTime:be(s.createTime)}}(t)),S.resolve()}getNamedQuery(e,t){return S.resolve(this.Br.get(t))}saveNamedQuery(e,t){return this.Br.set(t.name,function(s){return{name:s.name,query:mc(s.bundledQuery),readTime:be(s.readTime)}}(t)),S.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aP{constructor(){this.overlays=new de(L.comparator),this.Lr=new Map}getOverlay(e,t){return S.resolve(this.overlays.get(t))}getOverlays(e,t){const r=Lt();return S.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((s,i)=>{this.St(e,t,i)}),S.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Lr.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Lr.delete(r)),S.resolve()}getOverlaysForCollection(e,t,r){const s=Lt(),i=t.length+1,o=new L(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const u=c.getNext().value,l=u.getKey();if(!t.isPrefixOf(l.path))break;l.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return S.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new de((l,d)=>l-d);const o=this.overlays.getIterator();for(;o.hasNext();){const l=o.getNext().value;if(l.getKey().getCollectionGroup()===t&&l.largestBatchId>r){let d=i.get(l.largestBatchId);d===null&&(d=Lt(),i=i.insert(l.largestBatchId,d)),d.set(l.getKey(),l)}}const c=Lt(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((l,d)=>c.set(l,d)),!(c.size()>=s)););return S.resolve(c)}St(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.Lr.get(s.largestBatchId).delete(r.key);this.Lr.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new oh(t,r));let i=this.Lr.get(t);i===void 0&&(i=J(),this.Lr.set(t,i)),this.Lr.set(t,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cP{constructor(){this.sessionToken=we.EMPTY_BYTE_STRING}getSessionToken(e){return S.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,S.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hh{constructor(){this.kr=new ue(Fe.qr),this.Kr=new ue(Fe.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(e,t){const r=new Fe(e,t);this.kr=this.kr.add(r),this.Kr=this.Kr.add(r)}$r(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Wr(new Fe(e,t))}Qr(e,t){e.forEach(r=>this.removeReference(r,t))}Gr(e){const t=new L(new Z([])),r=new Fe(t,e),s=new Fe(t,e+1),i=[];return this.Kr.forEachInRange([r,s],o=>{this.Wr(o),i.push(o.key)}),i}zr(){this.kr.forEach(e=>this.Wr(e))}Wr(e){this.kr=this.kr.delete(e),this.Kr=this.Kr.delete(e)}jr(e){const t=new L(new Z([])),r=new Fe(t,e),s=new Fe(t,e+1);let i=J();return this.Kr.forEachInRange([r,s],o=>{i=i.add(o.key)}),i}containsKey(e){const t=new Fe(e,0),r=this.kr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class Fe{constructor(e,t){this.key=e,this.Jr=t}static qr(e,t){return L.comparator(e.key,t.key)||H(e.Jr,t.Jr)}static Ur(e,t){return H(e.Jr,t.Jr)||L.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uP{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Yn=1,this.Hr=new ue(Fe.qr)}checkEmpty(e){return S.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new sh(i,t,r,s);this.mutationQueue.push(o);for(const c of s)this.Hr=this.Hr.add(new Fe(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return S.resolve(o)}lookupMutationBatch(e,t){return S.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.Xr(r),i=s<0?0:s;return S.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return S.resolve(this.mutationQueue.length===0?Ln:this.Yn-1)}getAllMutationBatches(e){return S.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new Fe(t,0),s=new Fe(t,Number.POSITIVE_INFINITY),i=[];return this.Hr.forEachInRange([r,s],o=>{const c=this.Zr(o.Jr);i.push(c)}),S.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new ue(H);return t.forEach(s=>{const i=new Fe(s,0),o=new Fe(s,Number.POSITIVE_INFINITY);this.Hr.forEachInRange([i,o],c=>{r=r.add(c.Jr)})}),S.resolve(this.Yr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;L.isDocumentKey(i)||(i=i.child(""));const o=new Fe(new L(i),0);let c=new ue(H);return this.Hr.forEachWhile(u=>{const l=u.key.path;return!!r.isPrefixOf(l)&&(l.length===s&&(c=c.add(u.Jr)),!0)},o),S.resolve(this.Yr(c))}Yr(e){const t=[];return e.forEach(r=>{const s=this.Zr(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){q(this.ei(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Hr;return S.forEach(t.mutations,s=>{const i=new Fe(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Hr=r})}nr(e){}containsKey(e,t){const r=new Fe(t,0),s=this.Hr.firstAfterOrEqual(r);return S.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,S.resolve()}ei(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lP{constructor(e){this.ti=e,this.docs=function(){return new de(L.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,o=this.ti(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return S.resolve(r?r.document.mutableCopy():pe.newInvalidDocument(t))}getEntries(e,t){let r=at();return t.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():pe.newInvalidDocument(s))}),S.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=at();const o=t.path,c=new L(o.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:l,value:{document:d}}=u.getNext();if(!o.isPrefixOf(l.path))break;l.path.length>o.length+1||zl(O_(d),r)<=0||(s.has(d.key)||_o(t,d))&&(i=i.insert(d.key,d.mutableCopy()))}return S.resolve(i)}getAllFromCollectionGroup(e,t,r,s){B(9500)}ni(e,t){return S.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new hP(this)}getSize(e){return S.resolve(this.size)}}class hP extends iI{constructor(e){super(),this.Mr=e}applyChanges(e){const t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.Mr.addEntry(e,s)):this.Mr.removeEntry(r)}),S.waitFor(t)}getFromCache(e,t){return this.Mr.getEntry(e,t)}getAllFromCache(e,t){return this.Mr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dP{constructor(e){this.persistence=e,this.ri=new ln(t=>vr(t),go),this.lastRemoteSnapshotVersion=$.min(),this.highestTargetId=0,this.ii=0,this.si=new hh,this.targetCount=0,this.oi=Cr._r()}forEachTarget(e,t){return this.ri.forEach((r,s)=>t(s)),S.resolve()}getLastRemoteSnapshotVersion(e){return S.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return S.resolve(this.ii)}allocateTargetId(e){return this.highestTargetId=this.oi.next(),S.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.ii&&(this.ii=t),S.resolve()}lr(e){this.ri.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.oi=new Cr(t),this.highestTargetId=t),e.sequenceNumber>this.ii&&(this.ii=e.sequenceNumber)}addTargetData(e,t){return this.lr(t),this.targetCount+=1,S.resolve()}updateTargetData(e,t){return this.lr(t),S.resolve()}removeTargetData(e,t){return this.ri.delete(t.target),this.si.Gr(t.targetId),this.targetCount-=1,S.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.ri.forEach((o,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.ri.delete(o),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)}),S.waitFor(i).next(()=>s)}getTargetCount(e){return S.resolve(this.targetCount)}getTargetData(e,t){const r=this.ri.get(t)||null;return S.resolve(r)}addMatchingKeys(e,t,r){return this.si.$r(t,r),S.resolve()}removeMatchingKeys(e,t,r){this.si.Qr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(o=>{i.push(s.markPotentiallyOrphaned(e,o))}),S.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.si.Gr(t),S.resolve()}getMatchingKeysForTargetId(e,t){const r=this.si.jr(t);return S.resolve(r)}containsKey(e,t){return S.resolve(this.si.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dh{constructor(e,t){this._i={},this.overlays={},this.ai=new it(0),this.ui=!1,this.ui=!0,this.ci=new cP,this.referenceDelegate=e(this),this.li=new dP(this),this.indexManager=new Y0,this.remoteDocumentCache=function(s){return new lP(s)}(r=>this.referenceDelegate.hi(r)),this.serializer=new Hy(t),this.Pi=new oP(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new aP,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this._i[e.toKey()];return r||(r=new uP(t,this.referenceDelegate),this._i[e.toKey()]=r),r}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(e,t,r){O("MemoryPersistence","Starting transaction:",e);const s=new fP(this.ai.next());return this.referenceDelegate.Ti(),r(s).next(i=>this.referenceDelegate.Ei(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Ii(e,t){return S.or(Object.values(this._i).map(r=>()=>r.containsKey(e,t)))}}class fP extends L_{constructor(e){super(),this.currentSequenceNumber=e}}class Ic{constructor(e){this.persistence=e,this.Ri=new hh,this.Ai=null}static Vi(e){return new Ic(e)}get di(){if(this.Ai)return this.Ai;throw B(60996)}addReference(e,t,r){return this.Ri.addReference(r,t),this.di.delete(r.toString()),S.resolve()}removeReference(e,t,r){return this.Ri.removeReference(r,t),this.di.add(r.toString()),S.resolve()}markPotentiallyOrphaned(e,t){return this.di.add(t.toString()),S.resolve()}removeTarget(e,t){this.Ri.Gr(t.targetId).forEach(s=>this.di.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.di.add(i.toString()))}).next(()=>r.removeTargetData(e,t))}Ti(){this.Ai=new Set}Ei(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return S.forEach(this.di,r=>{const s=L.fromPath(r);return this.mi(e,s).next(i=>{i||t.removeEntry(s,$.min())})}).next(()=>(this.Ai=null,t.apply(e)))}updateLimboDocument(e,t){return this.mi(e,t).next(r=>{r?this.di.delete(t.toString()):this.di.add(t.toString())})}hi(e){return 0}mi(e,t){return S.or([()=>S.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ii(e,t)])}}class Ma{constructor(e,t){this.persistence=e,this.fi=new ln(r=>He(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=sI(this,t)}static Vi(e,t){return new Ma(e,t)}Ti(){}Ei(e){return S.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}dr(e){const t=this.pr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}pr(e){let t=0;return this.mr(e,r=>{t++}).next(()=>t)}mr(e,t){return S.forEach(this.fi,(r,s)=>this.wr(e,r,s).next(i=>i?S.resolve():t(s)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ni(e,o=>this.wr(e,o,t).next(c=>{c||(r++,i.removeEntry(o,$.min()))})).next(()=>i.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.fi.set(t,e.currentSequenceNumber),S.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.fi.set(r,e.currentSequenceNumber),S.resolve()}removeReference(e,t,r){return this.fi.set(r,e.currentSequenceNumber),S.resolve()}updateLimboDocument(e,t){return this.fi.set(t,e.currentSequenceNumber),S.resolve()}hi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=la(e.data.value)),t}wr(e,t,r){return S.or([()=>this.persistence.Ii(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.fi.get(t);return S.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pP{constructor(e){this.serializer=e}k(e,t,r,s){const i=new ic("createOrUpgrade",t);r<1&&s>=1&&(function(u){u.createObjectStore(po)}(e),function(u){u.createObjectStore(zi,{keyPath:SR}),u.createObjectStore(Tt,{keyPath:dp,autoIncrement:!0}).createIndex(pr,fp,{unique:!0}),u.createObjectStore(ys)}(e),ng(e),function(u){u.createObjectStore(ur)}(e));let o=S.resolve();return r<3&&s>=3&&(r!==0&&(function(u){u.deleteObjectStore(ws),u.deleteObjectStore(Is),u.deleteObjectStore(_r)}(e),ng(e)),o=o.next(()=>function(u){const l=u.store(_r),d={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:$.min().toTimestamp(),targetCount:0};return l.put(xa,d)}(i))),r<4&&s>=4&&(r!==0&&(o=o.next(()=>function(u,l){return l.store(Tt).J().next(f=>{u.deleteObjectStore(Tt),u.createObjectStore(Tt,{keyPath:dp,autoIncrement:!0}).createIndex(pr,fp,{unique:!0});const g=l.store(Tt),I=f.map(b=>g.put(b));return S.waitFor(I)})}(e,i))),o=o.next(()=>{(function(u){u.createObjectStore(Es,{keyPath:VR})})(e)})),r<5&&s>=5&&(o=o.next(()=>this.gi(i))),r<6&&s>=6&&(o=o.next(()=>(function(u){u.createObjectStore(Ki)}(e),this.pi(i)))),r<7&&s>=7&&(o=o.next(()=>this.yi(i))),r<8&&s>=8&&(o=o.next(()=>this.wi(e,i))),r<9&&s>=9&&(o=o.next(()=>{(function(u){u.objectStoreNames.contains("remoteDocumentChanges")&&u.deleteObjectStore("remoteDocumentChanges")})(e)})),r<10&&s>=10&&(o=o.next(()=>this.Si(i))),r<11&&s>=11&&(o=o.next(()=>{(function(u){u.createObjectStore(oc,{keyPath:LR})})(e),function(u){u.createObjectStore(ac,{keyPath:MR})}(e)})),r<12&&s>=12&&(o=o.next(()=>{(function(u){const l=u.createObjectStore(cc,{keyPath:$R});l.createIndex(Ju,zR,{unique:!1}),l.createIndex($_,KR,{unique:!1})})(e)})),r<13&&s>=13&&(o=o.next(()=>function(u){const l=u.createObjectStore(Ca,{keyPath:PR});l.createIndex(ca,CR),l.createIndex(j_,xR)}(e)).next(()=>this.bi(e,i)).next(()=>e.deleteObjectStore(ur))),r<14&&s>=14&&(o=o.next(()=>this.Di(e,i))),r<15&&s>=15&&(o=o.next(()=>function(u){u.createObjectStore(Hl,{keyPath:FR,autoIncrement:!0}).createIndex(Qu,UR,{unique:!1}),u.createObjectStore(ki,{keyPath:jR}).createIndex(G_,BR,{unique:!1}),u.createObjectStore(Di,{keyPath:GR}).createIndex(q_,qR,{unique:!1})}(e))),r<16&&s>=16&&(o=o.next(()=>{t.objectStore(ki).clear()}).next(()=>{t.objectStore(Di).clear()})),r<17&&s>=17&&(o=o.next(()=>{(function(u){u.createObjectStore(Ql,{keyPath:WR})})(e)})),r<18&&s>=18&&ym()&&(o=o.next(()=>{t.objectStore(ki).clear()}).next(()=>{t.objectStore(Di).clear()})),o}pi(e){let t=0;return e.store(ur).ee((r,s)=>{t+=La(s)}).next(()=>{const r={byteSize:t};return e.store(Ki).put(Hu,r)})}gi(e){const t=e.store(zi),r=e.store(Tt);return t.J().next(s=>S.forEach(s,i=>{const o=IDBKeyRange.bound([i.userId,Ln],[i.userId,i.lastAcknowledgedBatchId]);return r.J(pr,o).next(c=>S.forEach(c,u=>{q(u.userId===i.userId,18650,"Cannot process batch from unexpected user",{batchId:u.batchId});const l=hr(this.serializer,u);return Zy(e,i.userId,l).next(()=>{})}))}))}yi(e){const t=e.store(ws),r=e.store(ur);return e.store(_r).get(xa).next(s=>{const i=[];return r.ee((o,c)=>{const u=new Z(o),l=function(f){return[0,He(f)]}(u);i.push(t.get(l).next(d=>d?S.resolve():(f=>t.put({targetId:0,path:He(f),sequenceNumber:s.highestListenSequenceNumber}))(u)))}).next(()=>S.waitFor(i))})}wi(e,t){e.createObjectStore(Wi,{keyPath:OR});const r=t.store(Wi),s=new lh,i=o=>{if(s.add(o)){const c=o.lastSegment(),u=o.popLast();return r.put({collectionId:c,parent:He(u)})}};return t.store(ur).ee({Y:!0},(o,c)=>{const u=new Z(o);return i(u.popLast())}).next(()=>t.store(ys).ee({Y:!0},([o,c,u],l)=>{const d=Vt(c);return i(d.popLast())}))}Si(e){const t=e.store(Is);return t.ee((r,s)=>{const i=Ri(s),o=Qy(this.serializer,i);return t.put(o)})}bi(e,t){const r=t.store(ur),s=[];return r.ee((i,o)=>{const c=t.store(Ca),u=function(f){return f.document?new L(Z.fromString(f.document.name).popFirst(5)):f.noDocument?L.fromSegments(f.noDocument.path):f.unknownDocument?L.fromSegments(f.unknownDocument.path):B(36783)}(o).path.toArray(),l={prefixPath:u.slice(0,u.length-2),collectionGroup:u[u.length-2],documentId:u[u.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};s.push(c.put(l))}).next(()=>S.waitFor(s))}Di(e,t){const r=t.store(Tt),s=oI(this.serializer),i=new dh(Ic.Vi,this.serializer.yt);return r.J().next(o=>{const c=new Map;return o.forEach(u=>{let l=c.get(u.userId)??J();hr(this.serializer,u).keys().forEach(d=>l=l.add(d)),c.set(u.userId,l)}),S.forEach(c,(u,l)=>{const d=new Ue(l),f=_c.wt(this.serializer,d),g=i.getIndexManager(d),I=yc.wt(d,this.serializer,g,i.referenceDelegate);return new aI(s,I,f,g).recalculateAndSaveOverlaysForDocumentKeys(new Yu(t,it.ce),u).next()})})}}function ng(n){n.createObjectStore(ws,{keyPath:DR}).createIndex(Wl,NR,{unique:!0}),n.createObjectStore(Is,{keyPath:"targetId"}).createIndex(B_,kR,{unique:!0}),n.createObjectStore(_r)}const An="IndexedDbPersistence",gu=18e5,mu=5e3,_u="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",cI="main";class fh{constructor(e,t,r,s,i,o,c,u,l,d,f=18){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=r,this.Ci=i,this.window=o,this.document=c,this.Fi=l,this.Mi=d,this.xi=f,this.ai=null,this.ui=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Oi=null,this.inForeground=!1,this.Ni=null,this.Bi=null,this.Li=Number.NEGATIVE_INFINITY,this.ki=g=>Promise.resolve(),!fh.v())throw new N(x.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new nP(this,s),this.qi=t+cI,this.serializer=new Hy(u),this.Ki=new Bt(this.qi,this.xi,new pP(this.serializer)),this.ci=new z0,this.li=new Z0(this.referenceDelegate,this.serializer),this.remoteDocumentCache=oI(this.serializer),this.Pi=new $0,this.window&&this.window.localStorage?this.Ui=this.window.localStorage:(this.Ui=null,d===!1&&ve(An,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.$i().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new N(x.FAILED_PRECONDITION,_u);return this.Wi(),this.Qi(),this.Gi(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.li.getHighestSequenceNumber(e))}).then(e=>{this.ai=new it(e,this.Fi)}).then(()=>{this.ui=!0}).catch(e=>(this.Ki&&this.Ki.close(),Promise.reject(e)))}zi(e){return this.ki=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.Ki.K(async t=>{t.newVersion===null&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Ci.enqueueAndForget(async()=>{this.started&&await this.$i()}))}$i(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>Yo(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.ji(e).next(t=>{t||(this.isPrimary=!1,this.Ci.enqueueRetryable(()=>this.ki(!1)))})}).next(()=>this.Ji(e)).next(t=>this.isPrimary&&!t?this.Hi(e).next(()=>!1):!!t&&this.Zi(e).next(()=>!0))).catch(e=>{if(Hn(e))return O(An,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return O(An,"Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.Ci.enqueueRetryable(()=>this.ki(e)),this.isPrimary=e})}ji(e){return Ii(e).get(Wr).next(t=>S.resolve(this.Xi(t)))}Yi(e){return Yo(e).delete(this.clientId)}async es(){if(this.isPrimary&&!this.ts(this.Li,gu)){this.Li=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",t=>{const r=Ve(t,Es);return r.J().next(s=>{const i=this.ns(s,gu),o=s.filter(c=>i.indexOf(c)===-1);return S.forEach(o,c=>r.delete(c.clientId)).next(()=>o)})}).catch(()=>[]);if(this.Ui)for(const t of e)this.Ui.removeItem(this.rs(t.clientId))}}Gi(){this.Bi=this.Ci.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.$i().then(()=>this.es()).then(()=>this.Gi()))}Xi(e){return!!e&&e.ownerId===this.clientId}Ji(e){return this.Mi?S.resolve(!0):Ii(e).get(Wr).next(t=>{if(t!==null&&this.ts(t.leaseTimestampMs,mu)&&!this.ss(t.ownerId)){if(this.Xi(t)&&this.networkEnabled)return!0;if(!this.Xi(t)){if(!t.allowTabSynchronization)throw new N(x.FAILED_PRECONDITION,_u);return!1}}return!(!this.networkEnabled||!this.inForeground)||Yo(e).J().next(r=>this.ns(r,mu).find(s=>{if(this.clientId!==s.clientId){const i=!this.networkEnabled&&s.networkEnabled,o=!this.inForeground&&s.inForeground,c=this.networkEnabled===s.networkEnabled;if(i||o&&c)return!0}return!1})===void 0)}).next(t=>(this.isPrimary!==t&&O(An,`Client ${t?"is":"is not"} eligible for a primary lease.`),t))}async shutdown(){this.ui=!1,this._s(),this.Bi&&(this.Bi.cancel(),this.Bi=null),this.us(),this.cs(),await this.Ki.runTransaction("shutdown","readwrite",[po,Es],e=>{const t=new Yu(e,it.ce);return this.Hi(t).next(()=>this.Yi(t))}),this.Ki.close(),this.ls()}ns(e,t){return e.filter(r=>this.ts(r.updateTimeMs,t)&&!this.ss(r.clientId))}hs(){return this.runTransaction("getActiveClients","readonly",e=>Yo(e).J().next(t=>this.ns(t,gu).map(r=>r.clientId)))}get started(){return this.ui}getGlobalsCache(){return this.ci}getMutationQueue(e,t){return yc.wt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new X0(e,this.serializer.yt.databaseId)}getDocumentOverlayCache(e){return _c.wt(this.serializer,e)}getBundleCache(){return this.Pi}runTransaction(e,t,r){O(An,"Starting transaction:",e);const s=t==="readonly"?"readonly":"readwrite",i=function(u){return u===18?JR:u===17?H_:u===16?QR:u===15?Jl:u===14?W_:u===13?K_:u===12?HR:u===11?z_:void B(60245)}(this.xi);let o;return this.Ki.runTransaction(e,s,i,c=>(o=new Yu(c,this.ai?this.ai.next():it.ce),t==="readwrite-primary"?this.ji(o).next(u=>!!u||this.Ji(o)).next(u=>{if(!u)throw ve(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Ci.enqueueRetryable(()=>this.ki(!1)),new N(x.FAILED_PRECONDITION,V_);return r(o)}).next(u=>this.Zi(o).next(()=>u)):this.Ps(o).next(()=>r(o)))).then(c=>(o.raiseOnCommittedEvent(),c))}Ps(e){return Ii(e).get(Wr).next(t=>{if(t!==null&&this.ts(t.leaseTimestampMs,mu)&&!this.ss(t.ownerId)&&!this.Xi(t)&&!(this.Mi||this.allowTabSynchronization&&t.allowTabSynchronization))throw new N(x.FAILED_PRECONDITION,_u)})}Zi(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return Ii(e).put(Wr,t)}static v(){return Bt.v()}Hi(e){const t=Ii(e);return t.get(Wr).next(r=>this.Xi(r)?(O(An,"Releasing primary lease."),t.delete(Wr)):S.resolve())}ts(e,t){const r=Date.now();return!(e<r-t)&&(!(e>r)||(ve(`Detected an update time that is in the future: ${e} > ${r}`),!1))}Wi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ni=()=>{this.Ci.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.$i()))},this.document.addEventListener("visibilitychange",this.Ni),this.inForeground=this.document.visibilityState==="visible")}us(){this.Ni&&(this.document.removeEventListener("visibilitychange",this.Ni),this.Ni=null)}Qi(){var e;typeof((e=this.window)==null?void 0:e.addEventListener)=="function"&&(this.Oi=()=>{this._s();const t=/(?:Version|Mobile)\/1[456]/;_m()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.Ci.enterRestrictedMode(!0),this.Ci.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Oi))}cs(){this.Oi&&(this.window.removeEventListener("pagehide",this.Oi),this.Oi=null)}ss(e){var t;try{const r=((t=this.Ui)==null?void 0:t.getItem(this.rs(e)))!==null;return O(An,`Client '${e}' ${r?"is":"is not"} zombied in LocalStorage`),r}catch(r){return ve(An,"Failed to get zombied client id.",r),!1}}_s(){if(this.Ui)try{this.Ui.setItem(this.rs(this.clientId),String(Date.now()))}catch(e){ve("Failed to set zombie client id.",e)}}ls(){if(this.Ui)try{this.Ui.removeItem(this.rs(this.clientId))}catch{}}rs(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function Ii(n){return Ve(n,po)}function Yo(n){return Ve(n,Es)}function ph(n,e){let t=n.projectId;return n.isDefaultDatabase||(t+="."+n.database),"firestore/"+e+"/"+t+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gh{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Ts=r,this.Es=s}static Is(e,t){let r=J(),s=J();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new gh(e,t.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gP{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uI{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=function(){return _m()?8:M_(Ne())>0?6:4}()}initialize(e,t){this.fs=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.gs(e,t).next(o=>{i.result=o}).next(()=>{if(!i.result)return this.ps(e,t,s,r).next(o=>{i.result=o})}).next(()=>{if(i.result)return;const o=new gP;return this.ys(e,t,o).next(c=>{if(i.result=c,this.As)return this.ws(e,t,o,c.size)})}).next(()=>i.result)}ws(e,t,r,s){return r.documentReadCount<this.Vs?(Zr()<=ne.DEBUG&&O("QueryEngine","SDK will not create cache indexes for query:",es(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),S.resolve()):(Zr()<=ne.DEBUG&&O("QueryEngine","Query:",es(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.ds*s?(Zr()<=ne.DEBUG&&O("QueryEngine","The SDK decides to create cache indexes for query:",es(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Qe(t))):S.resolve())}gs(e,t){if(Sp(t))return S.resolve(null);let r=Qe(t);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=Na(t,null,"F"),r=Qe(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const o=J(...i);return this.fs.getDocuments(e,o).next(c=>this.indexManager.getMinOffset(e,r).next(u=>{const l=this.Ss(t,c);return this.bs(t,l,o,u.readTime)?this.gs(e,Na(t,null,"F")):this.Ds(e,l,t,u)}))})))}ps(e,t,r,s){return Sp(t)||s.isEqual($.min())?S.resolve(null):this.fs.getDocuments(e,r).next(i=>{const o=this.Ss(t,i);return this.bs(t,o,r,s)?S.resolve(null):(Zr()<=ne.DEBUG&&O("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),es(t)),this.Ds(e,o,t,N_(s,gs)).next(c=>c))})}Ss(e,t){let r=new ue(yy(e));return t.forEach((s,i)=>{_o(e,i)&&(r=r.add(i))}),r}bs(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}ys(e,t,r){return Zr()<=ne.DEBUG&&O("QueryEngine","Using full collection scan to execute query:",es(t)),this.fs.getDocumentsMatchingQuery(e,t,_t.min(),r)}Ds(e,t,r,s){return this.fs.getDocumentsMatchingQuery(e,r,s).next(i=>(t.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mh="LocalStore",mP=3e8;class _P{constructor(e,t,r,s){this.persistence=e,this.Cs=t,this.serializer=s,this.vs=new de(H),this.Fs=new ln(i=>vr(i),go),this.Ms=new Map,this.xs=e.getRemoteDocumentCache(),this.li=e.getTargetCache(),this.Pi=e.getBundleCache(),this.Os(r)}Os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new aI(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.vs))}}function lI(n,e,t,r){return new _P(n,e,t,r)}async function hI(n,e){const t=M(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,t.Os(e),t.mutationQueue.getAllMutationBatches(r))).next(i=>{const o=[],c=[];let u=J();for(const l of s){o.push(l.batchId);for(const d of l.mutations)u=u.add(d.key)}for(const l of i){c.push(l.batchId);for(const d of l.mutations)u=u.add(d.key)}return t.localDocuments.getDocuments(r,u).next(l=>({Ns:l,removedBatchIds:o,addedBatchIds:c}))})})}function yP(n,e){const t=M(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=t.xs.newChangeBuffer({trackRemovals:!0});return function(c,u,l,d){const f=l.batch,g=f.keys();let I=S.resolve();return g.forEach(b=>{I=I.next(()=>d.getEntry(u,b)).next(P=>{const k=l.docVersions.get(b);q(k!==null,48541),P.version.compareTo(k)<0&&(f.applyToRemoteDocument(P,l),P.isValidDocument()&&(P.setReadTime(l.commitVersion),d.addEntry(P)))})}),I.next(()=>c.mutationQueue.removeMutationBatch(u,f))}(t,r,e,i).next(()=>i.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let u=J();for(let l=0;l<c.mutationResults.length;++l)c.mutationResults[l].transformResults.length>0&&(u=u.add(c.batch.mutations[l].key));return u}(e))).next(()=>t.localDocuments.getDocuments(r,s))})}function dI(n){const e=M(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.li.getLastRemoteSnapshotVersion(t))}function IP(n,e){const t=M(n),r=e.snapshotVersion;let s=t.vs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=t.xs.newChangeBuffer({trackRemovals:!0});s=t.vs;const c=[];e.targetChanges.forEach((d,f)=>{const g=s.get(f);if(!g)return;c.push(t.li.removeMatchingKeys(i,d.removedDocuments,f).next(()=>t.li.addMatchingKeys(i,d.addedDocuments,f)));let I=g.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(f)!==null?I=I.withResumeToken(we.EMPTY_BYTE_STRING,$.min()).withLastLimboFreeSnapshotVersion($.min()):d.resumeToken.approximateByteSize()>0&&(I=I.withResumeToken(d.resumeToken,r)),s=s.insert(f,I),function(P,k,V){return P.resumeToken.approximateByteSize()===0||k.snapshotVersion.toMicroseconds()-P.snapshotVersion.toMicroseconds()>=mP?!0:V.addedDocuments.size+V.modifiedDocuments.size+V.removedDocuments.size>0}(g,I,d)&&c.push(t.li.updateTargetData(i,I))});let u=at(),l=J();if(e.documentUpdates.forEach(d=>{e.resolvedLimboDocuments.has(d)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,d))}),c.push(fI(i,o,e.documentUpdates).next(d=>{u=d.Bs,l=d.Ls})),!r.isEqual($.min())){const d=t.li.getLastRemoteSnapshotVersion(i).next(f=>t.li.setTargetsMetadata(i,i.currentSequenceNumber,r));c.push(d)}return S.waitFor(c).next(()=>o.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,u,l)).next(()=>u)}).then(i=>(t.vs=s,i))}function fI(n,e,t){let r=J(),s=J();return t.forEach(i=>r=r.add(i)),e.getEntries(n,r).next(i=>{let o=at();return t.forEach((c,u)=>{const l=i.get(c);u.isFoundDocument()!==l.isFoundDocument()&&(s=s.add(c)),u.isNoDocument()&&u.version.isEqual($.min())?(e.removeEntry(c,u.readTime),o=o.insert(c,u)):!l.isValidDocument()||u.version.compareTo(l.version)>0||u.version.compareTo(l.version)===0&&l.hasPendingWrites?(e.addEntry(u),o=o.insert(c,u)):O(mh,"Ignoring outdated watch update for ",c,". Current version:",l.version," Watch version:",u.version)}),{Bs:o,Ls:s}})}function wP(n,e){const t=M(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=Ln),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function Ps(n,e){const t=M(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return t.li.getTargetData(r,e).next(i=>i?(s=i,S.resolve(s)):t.li.allocateTargetId(r).next(o=>(s=new Qt(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.li.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=t.vs.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.vs=t.vs.insert(r.targetId,r),t.Fs.set(e,r.targetId)),r})}async function Cs(n,e,t){const r=M(n),s=r.vs.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,o=>r.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!Hn(o))throw o;O(mh,`Failed to update sequence numbers for target ${e}: ${o}`)}r.vs=r.vs.remove(e),r.Fs.delete(s.target)}function Fa(n,e,t){const r=M(n);let s=$.min(),i=J();return r.persistence.runTransaction("Execute query","readwrite",o=>function(u,l,d){const f=M(u),g=f.Fs.get(d);return g!==void 0?S.resolve(f.vs.get(g)):f.li.getTargetData(l,d)}(r,o,Qe(e)).next(c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.li.getMatchingKeysForTargetId(o,c.targetId).next(u=>{i=u})}).next(()=>r.Cs.getDocumentsMatchingQuery(o,e,t?s:$.min(),t?i:J())).next(c=>(mI(r,_y(e),c),{documents:c,ks:i})))}function pI(n,e){const t=M(n),r=M(t.li),s=t.vs.get(e);return s?Promise.resolve(s.target):t.persistence.runTransaction("Get target data","readonly",i=>r.At(i,e).next(o=>o?o.target:null))}function gI(n,e){const t=M(n),r=t.Ms.get(e)||$.min();return t.persistence.runTransaction("Get new document changes","readonly",s=>t.xs.getAllFromCollectionGroup(s,e,N_(r,gs),Number.MAX_SAFE_INTEGER)).then(s=>(mI(t,e,s),s))}function mI(n,e,t){let r=n.Ms.get(e)||$.min();t.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),n.Ms.set(e,r)}async function EP(n,e,t,r){const s=M(n);let i=J(),o=at();for(const l of t){const d=e.qs(l.metadata.name);l.document&&(i=i.add(d));const f=e.Ks(l);f.setReadTime(e.Us(l.metadata.readTime)),o=o.insert(d,f)}const c=s.xs.newChangeBuffer({trackRemovals:!0}),u=await Ps(s,function(d){return Qe(Us(Z.fromString(`__bundle__/docs/${d}`)))}(r));return s.persistence.runTransaction("Apply bundle documents","readwrite",l=>fI(l,c,o).next(d=>(c.apply(l),d)).next(d=>s.li.removeMatchingKeysForTargetId(l,u.targetId).next(()=>s.li.addMatchingKeys(l,i,u.targetId)).next(()=>s.localDocuments.getLocalViewOfDocuments(l,d.Bs,d.Ls)).next(()=>d.Bs)))}async function TP(n,e,t=J()){const r=await Ps(n,Qe(mc(e.bundledQuery))),s=M(n);return s.persistence.runTransaction("Save named query","readwrite",i=>{const o=be(e.readTime);if(r.snapshotVersion.compareTo(o)>=0)return s.Pi.saveNamedQuery(i,e);const c=r.withResumeToken(we.EMPTY_BYTE_STRING,o);return s.vs=s.vs.insert(c.targetId,c),s.li.updateTargetData(i,c).next(()=>s.li.removeMatchingKeysForTargetId(i,r.targetId)).next(()=>s.li.addMatchingKeys(i,t,r.targetId)).next(()=>s.Pi.saveNamedQuery(i,e))})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _I="firestore_clients";function rg(n,e){return`${_I}_${n}_${e}`}const yI="firestore_mutations";function sg(n,e,t){let r=`${yI}_${n}_${t}`;return e.isAuthenticated()&&(r+=`_${e.uid}`),r}const II="firestore_targets";function yu(n,e){return`${II}_${n}_${e}`}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nt="SharedClientState";class Ua{constructor(e,t,r,s){this.user=e,this.batchId=t,this.state=r,this.error=s}static $s(e,t,r){const s=JSON.parse(r);let i,o=typeof s=="object"&&["pending","acknowledged","rejected"].indexOf(s.state)!==-1&&(s.error===void 0||typeof s.error=="object");return o&&s.error&&(o=typeof s.error.message=="string"&&typeof s.error.code=="string",o&&(i=new N(s.error.code,s.error.message))),o?new Ua(e,t,s.state,i):(ve(Nt,`Failed to parse mutation state for ID '${t}': ${r}`),null)}Ws(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class Mi{constructor(e,t,r){this.targetId=e,this.state=t,this.error=r}static $s(e,t){const r=JSON.parse(t);let s,i=typeof r=="object"&&["not-current","current","rejected"].indexOf(r.state)!==-1&&(r.error===void 0||typeof r.error=="object");return i&&r.error&&(i=typeof r.error.message=="string"&&typeof r.error.code=="string",i&&(s=new N(r.error.code,r.error.message))),i?new Mi(e,r.state,s):(ve(Nt,`Failed to parse target state for ID '${e}': ${t}`),null)}Ws(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class ja{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static $s(e,t){const r=JSON.parse(t);let s=typeof r=="object"&&r.activeTargetIds instanceof Array,i=th();for(let o=0;s&&o<r.activeTargetIds.length;++o)s=F_(r.activeTargetIds[o]),i=i.add(r.activeTargetIds[o]);return s?new ja(e,i):(ve(Nt,`Failed to parse client data for instance '${e}': ${t}`),null)}}class _h{constructor(e,t){this.clientId=e,this.onlineState=t}static $s(e){const t=JSON.parse(e);return typeof t=="object"&&["Unknown","Online","Offline"].indexOf(t.onlineState)!==-1&&typeof t.clientId=="string"?new _h(t.clientId,t.onlineState):(ve(Nt,`Failed to parse online state: ${e}`),null)}}class hl{constructor(){this.activeTargetIds=th()}Qs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Iu{constructor(e,t,r,s,i){this.window=e,this.Ci=t,this.persistenceKey=r,this.zs=s,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.js=this.Js.bind(this),this.Hs=new de(H),this.started=!1,this.Zs=[];const o=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=i,this.Xs=rg(this.persistenceKey,this.zs),this.Ys=function(u){return`firestore_sequence_number_${u}`}(this.persistenceKey),this.Hs=this.Hs.insert(this.zs,new hl),this.eo=new RegExp(`^${_I}_${o}_([^_]*)$`),this.no=new RegExp(`^${yI}_${o}_(\\d+)(?:_(.*))?$`),this.ro=new RegExp(`^${II}_${o}_(\\d+)$`),this.io=function(u){return`firestore_online_state_${u}`}(this.persistenceKey),this.so=function(u){return`firestore_bundle_loaded_v2_${u}`}(this.persistenceKey),this.window.addEventListener("storage",this.js)}static v(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.hs();for(const r of e){if(r===this.zs)continue;const s=this.getItem(rg(this.persistenceKey,r));if(s){const i=ja.$s(r,s);i&&(this.Hs=this.Hs.insert(i.clientId,i))}}this.oo();const t=this.storage.getItem(this.io);if(t){const r=this._o(t);r&&this.ao(r)}for(const r of this.Zs)this.Js(r);this.Zs=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(e){this.setItem(this.Ys,JSON.stringify(e))}getAllActiveQueryTargets(){return this.uo(this.Hs)}isActiveQueryTarget(e){let t=!1;return this.Hs.forEach((r,s)=>{s.activeTargetIds.has(e)&&(t=!0)}),t}addPendingMutation(e){this.co(e,"pending")}updateMutationState(e,t,r){this.co(e,t,r),this.lo(e)}addLocalQueryTarget(e,t=!0){let r="not-current";if(this.isActiveQueryTarget(e)){const s=this.storage.getItem(yu(this.persistenceKey,e));if(s){const i=Mi.$s(e,s);i&&(r=i.state)}}return t&&this.ho.Qs(e),this.oo(),r}removeLocalQueryTarget(e){this.ho.Gs(e),this.oo()}isLocalQueryTarget(e){return this.ho.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(yu(this.persistenceKey,e))}updateQueryState(e,t,r){this.Po(e,t,r)}handleUserChange(e,t,r){t.forEach(s=>{this.lo(s)}),this.currentUser=e,r.forEach(s=>{this.addPendingMutation(s)})}setOnlineState(e){this.To(e)}notifyBundleLoaded(e){this.Eo(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.js),this.removeItem(this.Xs),this.started=!1)}getItem(e){const t=this.storage.getItem(e);return O(Nt,"READ",e,t),t}setItem(e,t){O(Nt,"SET",e,t),this.storage.setItem(e,t)}removeItem(e){O(Nt,"REMOVE",e),this.storage.removeItem(e)}Js(e){const t=e;if(t.storageArea===this.storage){if(O(Nt,"EVENT",t.key,t.newValue),t.key===this.Xs)return void ve("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.Ci.enqueueRetryable(async()=>{if(this.started){if(t.key!==null){if(this.eo.test(t.key)){if(t.newValue==null){const r=this.Io(t.key);return this.Ro(r,null)}{const r=this.Ao(t.key,t.newValue);if(r)return this.Ro(r.clientId,r)}}else if(this.no.test(t.key)){if(t.newValue!==null){const r=this.Vo(t.key,t.newValue);if(r)return this.mo(r)}}else if(this.ro.test(t.key)){if(t.newValue!==null){const r=this.fo(t.key,t.newValue);if(r)return this.po(r)}}else if(t.key===this.io){if(t.newValue!==null){const r=this._o(t.newValue);if(r)return this.ao(r)}}else if(t.key===this.Ys){const r=function(i){let o=it.ce;if(i!=null)try{const c=JSON.parse(i);q(typeof c=="number",30636,{yo:i}),o=c}catch(c){ve(Nt,"Failed to read sequence number from WebStorage",c)}return o}(t.newValue);r!==it.ce&&this.sequenceNumberHandler(r)}else if(t.key===this.so){const r=this.wo(t.newValue);await Promise.all(r.map(s=>this.syncEngine.So(s)))}}}else this.Zs.push(t)})}}get ho(){return this.Hs.get(this.zs)}oo(){this.setItem(this.Xs,this.ho.Ws())}co(e,t,r){const s=new Ua(this.currentUser,e,t,r),i=sg(this.persistenceKey,this.currentUser,e);this.setItem(i,s.Ws())}lo(e){const t=sg(this.persistenceKey,this.currentUser,e);this.removeItem(t)}To(e){const t={clientId:this.zs,onlineState:e};this.storage.setItem(this.io,JSON.stringify(t))}Po(e,t,r){const s=yu(this.persistenceKey,e),i=new Mi(e,t,r);this.setItem(s,i.Ws())}Eo(e){const t=JSON.stringify(Array.from(e));this.setItem(this.so,t)}Io(e){const t=this.eo.exec(e);return t?t[1]:null}Ao(e,t){const r=this.Io(e);return ja.$s(r,t)}Vo(e,t){const r=this.no.exec(e),s=Number(r[1]),i=r[2]!==void 0?r[2]:null;return Ua.$s(new Ue(i),s,t)}fo(e,t){const r=this.ro.exec(e),s=Number(r[1]);return Mi.$s(s,t)}_o(e){return _h.$s(e)}wo(e){return JSON.parse(e)}async mo(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.bo(e.batchId,e.state,e.error);O(Nt,`Ignoring mutation for non-active user ${e.user.uid}`)}po(e){return this.syncEngine.Do(e.targetId,e.state,e.error)}Ro(e,t){const r=t?this.Hs.insert(e,t):this.Hs.remove(e),s=this.uo(this.Hs),i=this.uo(r),o=[],c=[];return i.forEach(u=>{s.has(u)||o.push(u)}),s.forEach(u=>{i.has(u)||c.push(u)}),this.syncEngine.Co(o,c).then(()=>{this.Hs=r})}ao(e){this.Hs.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}uo(e){let t=th();return e.forEach((r,s)=>{t=t.unionWith(s.activeTargetIds)}),t}}class wI{constructor(){this.vo=new hl,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.vo.Qs(e),this.Fo[e]||"not-current"}updateQueryState(e,t,r){this.Fo[e]=t}removeLocalQueryTarget(e){this.vo.Gs(e)}isLocalQueryTarget(e){return this.vo.activeTargetIds.has(e)}clearQueryState(e){delete this.Fo[e]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(e){return this.vo.activeTargetIds.has(e)}start(){return this.vo=new hl,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AP{Mo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ig="ConnectivityMonitor";class og{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(e){this.Lo.push(e)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){O(ig,"Network connectivity changed: AVAILABLE");for(const e of this.Lo)e(0)}Bo(){O(ig,"Network connectivity changed: UNAVAILABLE");for(const e of this.Lo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Xo=null;function dl(){return Xo===null?Xo=function(){return 268435456+Math.round(2147483648*Math.random())}():Xo++,"0x"+Xo.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wu="RestConnection",vP={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class bP{get qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Ko=t+"://"+e.host,this.Uo=`projects/${r}/databases/${s}`,this.$o=this.databaseId.database===Qi?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Wo(e,t,r,s,i){const o=dl(),c=this.Qo(e,t.toUriEncodedString());O(wu,`Sending RPC '${e}' ${o}:`,c,r);const u={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(u,s,i);const{host:l}=new URL(c),d=$t(l);return this.zo(e,c,u,r,d).then(f=>(O(wu,`Received RPC '${e}' ${o}: `,f),f),f=>{throw dt(wu,`RPC '${e}' ${o} failed with error: `,f,"url: ",c,"request:",r),f})}jo(e,t,r,s,i,o){return this.Wo(e,t,r,s,i)}Go(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Fs}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s)}Qo(e,t){const r=vP[e];let s=`${this.Ko}/v1/${t}:${r}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SP{constructor(e){this.Jo=e.Jo,this.Ho=e.Ho}Zo(e){this.Xo=e}Yo(e){this.e_=e}t_(e){this.n_=e}onMessage(e){this.r_=e}close(){this.Ho()}send(e){this.Jo(e)}i_(){this.Xo()}s_(){this.e_()}o_(e){this.n_(e)}__(e){this.r_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ke="WebChannelConnection",wi=(n,e,t)=>{n.listen(e,r=>{try{t(r)}catch(s){setTimeout(()=>{throw s},0)}})};class us extends bP{constructor(e){super(e),this.a_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static u_(){if(!us.c_){const e=v_();wi(e,A_.STAT_EVENT,t=>{t.stat===qu.PROXY?O(Ke,"STAT_EVENT: detected buffering proxy"):t.stat===qu.NOPROXY&&O(Ke,"STAT_EVENT: detected no buffering proxy")}),us.c_=!0}}zo(e,t,r,s,i){const o=dl();return new Promise((c,u)=>{const l=new E_;l.setWithCredentials(!0),l.listenOnce(T_.COMPLETE,()=>{try{switch(l.getLastErrorCode()){case oa.NO_ERROR:const f=l.getResponseJson();O(Ke,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(f)),c(f);break;case oa.TIMEOUT:O(Ke,`RPC '${e}' ${o} timed out`),u(new N(x.DEADLINE_EXCEEDED,"Request time out"));break;case oa.HTTP_ERROR:const g=l.getStatus();if(O(Ke,`RPC '${e}' ${o} failed with status:`,g,"response text:",l.getResponseText()),g>0){let I=l.getResponseJson();Array.isArray(I)&&(I=I[0]);const b=I==null?void 0:I.error;if(b&&b.status&&b.message){const P=function(V){const j=V.toLowerCase().replace(/_/g,"-");return Object.values(x).indexOf(j)>=0?j:x.UNKNOWN}(b.status);u(new N(P,b.message))}else u(new N(x.UNKNOWN,"Server responded with status "+l.getStatus()))}else u(new N(x.UNAVAILABLE,"Connection failed."));break;default:B(9055,{l_:e,streamId:o,h_:l.getLastErrorCode(),P_:l.getLastError()})}}finally{O(Ke,`RPC '${e}' ${o} completed.`)}});const d=JSON.stringify(s);O(Ke,`RPC '${e}' ${o} sending request:`,s),l.send(t,"POST",d,r,15)})}T_(e,t,r){const s=dl(),i=[this.Ko,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=this.createWebChannelTransport(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(c.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Go(c.initMessageHeaders,t,r),c.encodeInitMessageHeaders=!0;const l=i.join("");O(Ke,`Creating RPC '${e}' stream ${s}: ${l}`,c);const d=o.createWebChannel(l,c);this.E_(d);let f=!1,g=!1;const I=new SP({Jo:b=>{g?O(Ke,`Not sending because RPC '${e}' stream ${s} is closed:`,b):(f||(O(Ke,`Opening RPC '${e}' stream ${s} transport.`),d.open(),f=!0),O(Ke,`RPC '${e}' stream ${s} sending:`,b),d.send(b))},Ho:()=>d.close()});return wi(d,vi.EventType.OPEN,()=>{g||(O(Ke,`RPC '${e}' stream ${s} transport opened.`),I.i_())}),wi(d,vi.EventType.CLOSE,()=>{g||(g=!0,O(Ke,`RPC '${e}' stream ${s} transport closed`),I.o_(),this.I_(d))}),wi(d,vi.EventType.ERROR,b=>{g||(g=!0,dt(Ke,`RPC '${e}' stream ${s} transport errored. Name:`,b.name,"Message:",b.message),I.o_(new N(x.UNAVAILABLE,"The operation could not be completed")))}),wi(d,vi.EventType.MESSAGE,b=>{var P;if(!g){const k=b.data[0];q(!!k,16349);const V=k,j=(V==null?void 0:V.error)||((P=V[0])==null?void 0:P.error);if(j){O(Ke,`RPC '${e}' stream ${s} received error:`,j);const U=j.status;let z=function(T){const y=Se[T];if(y!==void 0)return Dy(y)}(U),K=j.message;U==="NOT_FOUND"&&K.includes("database")&&K.includes("does not exist")&&K.includes(this.databaseId.database)&&dt(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),z===void 0&&(z=x.INTERNAL,K="Unknown error status: "+U+" with message "+j.message),g=!0,I.o_(new N(z,K)),d.close()}else O(Ke,`RPC '${e}' stream ${s} received:`,k),I.__(k)}}),us.u_(),setTimeout(()=>{I.s_()},0),I}terminate(){this.a_.forEach(e=>e.close()),this.a_=[]}E_(e){this.a_.push(e)}I_(e){this.a_=this.a_.filter(t=>t===e)}Go(e,t,r){super.Go(e,t,r),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return b_()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function RP(n){return new us(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function EI(){return typeof window<"u"?window:null}function ga(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fr(n){return new N0(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */us.c_=!1;class yh{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Ci=e,this.timerId=t,this.R_=r,this.A_=s,this.V_=i,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();const t=Math.floor(this.d_+this.y_()),r=Math.max(0,Date.now()-this.f_),s=Math.max(0,t-r);s>0&&O("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.d_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,s,()=>(this.f_=Date.now(),e())),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ag="PersistentStream";class TI{constructor(e,t,r,s,i,o,c,u){this.Ci=e,this.S_=r,this.b_=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new yh(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.K_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.K_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===x.RESOURCE_EXHAUSTED?(ve(t.toString()),ve("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===x.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.t_(t)}W_(){}auth(){this.state=1;const e=this.Q_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.D_===t&&this.G_(r,s)},r=>{e(()=>{const s=new N(x.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(s)})})}G_(e,t){const r=this.Q_(this.D_);this.stream=this.j_(e,t),this.stream.Zo(()=>{r(()=>this.listener.Zo())}),this.stream.Yo(()=>{r(()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.Yo()))}),this.stream.t_(s=>{r(()=>this.z_(s))}),this.stream.onMessage(s=>{r(()=>++this.F_==1?this.J_(s):this.onNext(s))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return O(ag,`close with error: ${e}`),this.stream=null,this.close(4,e)}Q_(e){return t=>{this.Ci.enqueueAndForget(()=>this.D_===e?t():(O(ag,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class PP extends TI{constructor(e,t,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,o),this.serializer=i}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=L0(this.serializer,e),r=function(i){if(!("targetChange"in i))return $.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?$.min():o.readTime?be(o.readTime):$.min()}(e);return this.listener.H_(t,r)}Z_(e){const t={};t.database=ol(this.serializer),t.addTarget=function(i,o){let c;const u=o.target;if(c=ka(u)?{documents:By(i,u)}:{query:gc(i,u).ft},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=Ly(i,o.resumeToken);const l=sl(i,o.expectedCount);l!==null&&(c.expectedCount=l)}else if(o.snapshotVersion.compareTo($.min())>0){c.readTime=Rs(i,o.snapshotVersion.toTimestamp());const l=sl(i,o.expectedCount);l!==null&&(c.expectedCount=l)}return c}(this.serializer,e);const r=F0(this.serializer,e);r&&(t.labels=r),this.q_(t)}X_(e){const t={};t.database=ol(this.serializer),t.removeTarget=e,this.q_(t)}}class CP extends TI{constructor(e,t,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,o),this.serializer=i}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return q(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,q(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){q(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=M0(e.writeResults,e.commitTime),r=be(e.commitTime);return this.listener.na(r,t)}ra(){const e={};e.database=ol(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>eo(this.serializer,r))};this.q_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xP{}class kP extends xP{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new N(x.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.Wo(e,il(t,r),s,i,o)).catch(i=>{throw i.name==="FirebaseError"?(i.code===x.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new N(x.UNKNOWN,i.toString())})}jo(e,t,r,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,c])=>this.connection.jo(e,il(t,r),s,o,c,i)).catch(o=>{throw o.name==="FirebaseError"?(o.code===x.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new N(x.UNKNOWN,o.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}function DP(n,e,t,r){return new kP(n,e,t,r)}class NP{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(ve(t),this.aa=!1):O("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xr="RemoteStore";class OP{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ea=new Map,this.Ia=new Set,this.Ra=[],this.Aa=i,this.Aa.Mo(o=>{r.enqueueAndForget(async()=>{Jn(this)&&(O(xr,"Restarting streams for network reachability change."),await async function(u){const l=M(u);l.Ia.add(4),await Gs(l),l.Va.set("Unknown"),l.Ia.delete(4),await Eo(l)}(this))})}),this.Va=new NP(r,s)}}async function Eo(n){if(Jn(n))for(const e of n.Ra)await e(!0)}async function Gs(n){for(const e of n.Ra)await e(!1)}function wc(n,e){const t=M(n);t.Ea.has(e.targetId)||(t.Ea.set(e.targetId,e),Eh(t)?wh(t):$s(t).O_()&&Ih(t,e))}function xs(n,e){const t=M(n),r=$s(t);t.Ea.delete(e),r.O_()&&AI(t,e),t.Ea.size===0&&(r.O_()?r.L_():Jn(t)&&t.Va.set("Unknown"))}function Ih(n,e){if(n.da.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo($.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}$s(n).Z_(e)}function AI(n,e){n.da.$e(e),$s(n).X_(e)}function wh(n){n.da=new C0({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),At:e=>n.Ea.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),$s(n).start(),n.Va.ua()}function Eh(n){return Jn(n)&&!$s(n).x_()&&n.Ea.size>0}function Jn(n){return M(n).Ia.size===0}function vI(n){n.da=void 0}async function VP(n){n.Va.set("Online")}async function LP(n){n.Ea.forEach((e,t)=>{Ih(n,e)})}async function MP(n,e){vI(n),Eh(n)?(n.Va.ha(e),wh(n)):n.Va.set("Unknown")}async function FP(n,e,t){if(n.Va.set("Online"),e instanceof Vy&&e.state===2&&e.cause)try{await async function(s,i){const o=i.cause;for(const c of i.targetIds)s.Ea.has(c)&&(await s.remoteSyncer.rejectListen(c,o),s.Ea.delete(c),s.da.removeTarget(c))}(n,e)}catch(r){O(xr,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Ba(n,r)}else if(e instanceof fa?n.da.Xe(e):e instanceof Oy?n.da.st(e):n.da.tt(e),!t.isEqual($.min()))try{const r=await dI(n.localStore);t.compareTo(r)>=0&&await function(i,o){const c=i.da.Tt(o);return c.targetChanges.forEach((u,l)=>{if(u.resumeToken.approximateByteSize()>0){const d=i.Ea.get(l);d&&i.Ea.set(l,d.withResumeToken(u.resumeToken,o))}}),c.targetMismatches.forEach((u,l)=>{const d=i.Ea.get(u);if(!d)return;i.Ea.set(u,d.withResumeToken(we.EMPTY_BYTE_STRING,d.snapshotVersion)),AI(i,u);const f=new Qt(d.target,u,l,d.sequenceNumber);Ih(i,f)}),i.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(r){O(xr,"Failed to raise snapshot:",r),await Ba(n,r)}}async function Ba(n,e,t){if(!Hn(e))throw e;n.Ia.add(1),await Gs(n),n.Va.set("Offline"),t||(t=()=>dI(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{O(xr,"Retrying IndexedDB access"),await t(),n.Ia.delete(1),await Eo(n)})}function bI(n,e){return e().catch(t=>Ba(n,t,e))}async function qs(n){const e=M(n),t=qn(e);let r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:Ln;for(;UP(e);)try{const s=await wP(e.localStore,r);if(s===null){e.Ta.length===0&&t.L_();break}r=s.batchId,jP(e,s)}catch(s){await Ba(e,s)}SI(e)&&RI(e)}function UP(n){return Jn(n)&&n.Ta.length<10}function jP(n,e){n.Ta.push(e);const t=qn(n);t.O_()&&t.Y_&&t.ea(e.mutations)}function SI(n){return Jn(n)&&!qn(n).x_()&&n.Ta.length>0}function RI(n){qn(n).start()}async function BP(n){qn(n).ra()}async function GP(n){const e=qn(n);for(const t of n.Ta)e.ea(t.mutations)}async function qP(n,e,t){const r=n.Ta.shift(),s=ih.from(r,e,t);await bI(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await qs(n)}async function $P(n,e){e&&qn(n).Y_&&await async function(r,s){if(function(o){return ky(o)&&o!==x.ABORTED}(s.code)){const i=r.Ta.shift();qn(r).B_(),await bI(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await qs(r)}}(n,e),SI(n)&&RI(n)}async function cg(n,e){const t=M(n);t.asyncQueue.verifyOperationInProgress(),O(xr,"RemoteStore received new credentials");const r=Jn(t);t.Ia.add(3),await Gs(t),r&&t.Va.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ia.delete(3),await Eo(t)}async function fl(n,e){const t=M(n);e?(t.Ia.delete(2),await Eo(t)):e||(t.Ia.add(2),await Gs(t),t.Va.set("Unknown"))}function $s(n){return n.ma||(n.ma=function(t,r,s){const i=M(t);return i.sa(),new PP(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{Zo:VP.bind(null,n),Yo:LP.bind(null,n),t_:MP.bind(null,n),H_:FP.bind(null,n)}),n.Ra.push(async e=>{e?(n.ma.B_(),Eh(n)?wh(n):n.Va.set("Unknown")):(await n.ma.stop(),vI(n))})),n.ma}function qn(n){return n.fa||(n.fa=function(t,r,s){const i=M(t);return i.sa(),new CP(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),Yo:BP.bind(null,n),t_:$P.bind(null,n),ta:GP.bind(null,n),na:qP.bind(null,n)}),n.Ra.push(async e=>{e?(n.fa.B_(),await qs(n)):(await n.fa.stop(),n.Ta.length>0&&(O(xr,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))})),n.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Th{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Be,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const o=Date.now()+r,c=new Th(e,t,o,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new N(x.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function zs(n,e){if(ve("AsyncQueue",`${e}: ${n}`),Hn(n))return new N(x.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yr{static emptySet(e){return new yr(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||L.comparator(t.key,r.key):(t,r)=>L.comparator(t.key,r.key),this.keyedMap=bi(),this.sortedSet=new de(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof yr)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new yr;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ug{constructor(){this.ga=new de(L.comparator)}track(e){const t=e.doc.key,r=this.ga.get(t);r?e.type!==0&&r.type===3?this.ga=this.ga.insert(t,e):e.type===3&&r.type!==1?this.ga=this.ga.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.ga=this.ga.remove(t):e.type===1&&r.type===2?this.ga=this.ga.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):B(63341,{Vt:e,pa:r}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal((t,r)=>{e.push(r)}),e}}class kr{constructor(e,t,r,s,i,o,c,u,l){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=l}static fromInitialDocuments(e,t,r,s,i){const o=[];return t.forEach(c=>{o.push({type:0,doc:c})}),new kr(e,t,yr.emptySet(t),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&mo(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zP{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class KP{constructor(){this.queries=lg(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,r){const s=M(t),i=s.queries;s.queries=lg(),i.forEach((o,c)=>{for(const u of c.Sa)u.onError(r)})})(this,new N(x.ABORTED,"Firestore shutting down"))}}function lg(){return new ln(n=>my(n),mo)}async function Ah(n,e){const t=M(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.ba()&&e.Da()&&(r=2):(i=new zP,r=e.Da()?0:1);try{switch(r){case 0:i.wa=await t.onListen(s,!0);break;case 1:i.wa=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(o){const c=zs(o,`Initialization of query '${es(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.Sa.push(e),e.va(t.onlineState),i.wa&&e.Fa(i.wa)&&bh(t)}async function vh(n,e){const t=M(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const o=i.Sa.indexOf(e);o>=0&&(i.Sa.splice(o,1),i.Sa.length===0?s=e.Da()?0:1:!i.ba()&&e.Da()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function WP(n,e){const t=M(n);let r=!1;for(const s of e){const i=s.query,o=t.queries.get(i);if(o){for(const c of o.Sa)c.Fa(s)&&(r=!0);o.wa=s}}r&&bh(t)}function HP(n,e,t){const r=M(n),s=r.queries.get(e);if(s)for(const i of s.Sa)i.onError(t);r.queries.delete(e)}function bh(n){n.Ca.forEach(e=>{e.next()})}var pl,hg;(hg=pl||(pl={})).Ma="default",hg.Cache="cache";class Sh{constructor(e,t,r){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new kr(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const r=t!=="Offline";return(!this.options.qa||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=kr.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==pl.Cache}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PI{constructor(e,t){this.Ka=e,this.byteLength=t}Ua(){return"metadata"in this.Ka}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dg{constructor(e){this.serializer=e}qs(e){return Gt(this.serializer,e)}Ks(e){return e.metadata.exists?pc(this.serializer,e.document,!1):pe.newNoDocument(this.qs(e.metadata.name),this.Us(e.metadata.readTime))}Us(e){return be(e)}}class Rh{constructor(e,t){this.$a=e,this.serializer=t,this.Wa=[],this.Qa=[],this.collectionGroups=new Set,this.progress=CI(e)}get queries(){return this.Wa}get documents(){return this.Qa}Ga(e){this.progress.bytesLoaded+=e.byteLength;let t=this.progress.documentsLoaded;if(e.Ka.namedQuery)this.Wa.push(e.Ka.namedQuery);else if(e.Ka.documentMetadata){this.Qa.push({metadata:e.Ka.documentMetadata}),e.Ka.documentMetadata.exists||++t;const r=Z.fromString(e.Ka.documentMetadata.name);this.collectionGroups.add(r.get(r.length-2))}else e.Ka.document&&(this.Qa[this.Qa.length-1].document=e.Ka.document,++t);return t!==this.progress.documentsLoaded?(this.progress.documentsLoaded=t,{...this.progress}):null}za(e){const t=new Map,r=new dg(this.serializer);for(const s of e)if(s.metadata.queries){const i=r.qs(s.metadata.name);for(const o of s.metadata.queries){const c=(t.get(o)||J()).add(i);t.set(o,c)}}return t}async ja(e){const t=await EP(e,new dg(this.serializer),this.Qa,this.$a.id),r=this.za(this.documents);for(const s of this.Wa)await TP(e,s,r.get(s.name));return this.progress.taskState="Success",{progress:this.progress,Ja:this.collectionGroups,Ha:t}}}function CI(n){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:n.totalDocuments,totalBytes:n.totalBytes}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xI{constructor(e){this.key=e}}class kI{constructor(e){this.key=e}}class DI{constructor(e,t){this.query=e,this.Za=t,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=J(),this.mutatedKeys=J(),this.eu=yy(e),this.tu=new yr(this.eu)}get nu(){return this.Za}ru(e,t){const r=t?t.iu:new ug,s=t?t.tu:this.tu;let i=t?t.mutatedKeys:this.mutatedKeys,o=s,c=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,l=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((d,f)=>{const g=s.get(d),I=_o(this.query,f)?f:null,b=!!g&&this.mutatedKeys.has(g.key),P=!!I&&(I.hasLocalMutations||this.mutatedKeys.has(I.key)&&I.hasCommittedMutations);let k=!1;g&&I?g.data.isEqual(I.data)?b!==P&&(r.track({type:3,doc:I}),k=!0):this.su(g,I)||(r.track({type:2,doc:I}),k=!0,(u&&this.eu(I,u)>0||l&&this.eu(I,l)<0)&&(c=!0)):!g&&I?(r.track({type:0,doc:I}),k=!0):g&&!I&&(r.track({type:1,doc:g}),k=!0,(u||l)&&(c=!0)),k&&(I?(o=o.add(I),i=P?i.add(d):i.delete(d)):(o=o.delete(d),i=i.delete(d)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const d=this.query.limitType==="F"?o.last():o.first();o=o.delete(d.key),i=i.delete(d.key),r.track({type:1,doc:d})}return{tu:o,iu:r,bs:c,mutatedKeys:i}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const o=e.iu.ya();o.sort((d,f)=>function(I,b){const P=k=>{switch(k){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return B(20277,{Vt:k})}};return P(I)-P(b)}(d.type,f.type)||this.eu(d.doc,f.doc)),this.ou(r),s=s??!1;const c=t&&!s?this._u():[],u=this.Ya.size===0&&this.current&&!s?1:0,l=u!==this.Xa;return this.Xa=u,o.length!==0||l?{snapshot:new kr(this.query,e.tu,i,o,e.mutatedKeys,u===0,l,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:c}:{au:c}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new ug,mutatedKeys:this.mutatedKeys,bs:!1},!1)):{au:[]}}uu(e){return!this.Za.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(t=>this.Za=this.Za.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Za=this.Za.delete(t)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Ya;this.Ya=J(),this.tu.forEach(r=>{this.uu(r.key)&&(this.Ya=this.Ya.add(r.key))});const t=[];return e.forEach(r=>{this.Ya.has(r)||t.push(new kI(r))}),this.Ya.forEach(r=>{e.has(r)||t.push(new xI(r))}),t}cu(e){this.Za=e.ks,this.Ya=J();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return kr.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Xa===0,this.hasCachedResults)}}const Yn="SyncEngine";class QP{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class JP{constructor(e){this.key=e,this.hu=!1}}class YP{constructor(e,t,r,s,i,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Pu={},this.Tu=new ln(c=>my(c),mo),this.Eu=new Map,this.Iu=new Set,this.Ru=new de(L.comparator),this.Au=new Map,this.Vu=new hh,this.du={},this.mu=new Map,this.fu=Cr.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function XP(n,e,t=!0){const r=Ec(n);let s;const i=r.Tu.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await NI(r,e,t,!0),s}async function ZP(n,e){const t=Ec(n);await NI(t,e,!0,!1)}async function NI(n,e,t,r){const s=await Ps(n.localStore,Qe(e)),i=s.targetId,o=n.sharedClientState.addLocalQueryTarget(i,t);let c;return r&&(c=await Ph(n,e,i,o==="current",s.resumeToken)),n.isPrimaryClient&&t&&wc(n.remoteStore,s),c}async function Ph(n,e,t,r,s){n.pu=(f,g,I)=>async function(P,k,V,j){let U=k.view.ru(V);U.bs&&(U=await Fa(P.localStore,k.query,!1).then(({documents:T})=>k.view.ru(T,U)));const z=j&&j.targetChanges.get(k.targetId),K=j&&j.targetMismatches.get(k.targetId)!=null,Q=k.view.applyChanges(U,P.isPrimaryClient,z,K);return gl(P,k.targetId,Q.au),Q.snapshot}(n,f,g,I);const i=await Fa(n.localStore,e,!0),o=new DI(e,i.ks),c=o.ru(i.documents),u=wo.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),l=o.applyChanges(c,n.isPrimaryClient,u);gl(n,t,l.au);const d=new QP(e,t,o);return n.Tu.set(e,d),n.Eu.has(t)?n.Eu.get(t).push(e):n.Eu.set(t,[e]),l.snapshot}async function eC(n,e,t){const r=M(n),s=r.Tu.get(e),i=r.Eu.get(s.targetId);if(i.length>1)return r.Eu.set(s.targetId,i.filter(o=>!mo(o,e))),void r.Tu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Cs(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),t&&xs(r.remoteStore,s.targetId),ks(r,s.targetId)}).catch(Wn)):(ks(r,s.targetId),await Cs(r.localStore,s.targetId,!0))}async function tC(n,e){const t=M(n),r=t.Tu.get(e),s=t.Eu.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),xs(t.remoteStore,r.targetId))}async function nC(n,e,t){const r=Dh(n);try{const s=await function(o,c){const u=M(o),l=oe.now(),d=c.reduce((I,b)=>I.add(b.key),J());let f,g;return u.persistence.runTransaction("Locally write mutations","readwrite",I=>{let b=at(),P=J();return u.xs.getEntries(I,d).next(k=>{b=k,b.forEach((V,j)=>{j.isValidDocument()||(P=P.add(V))})}).next(()=>u.localDocuments.getOverlayedDocuments(I,b)).next(k=>{f=k;const V=[];for(const j of c){const U=b0(j,f.get(j.key).overlayedDocument);U!=null&&V.push(new hn(j.key,U,iy(U.value.mapValue),_e.exists(!0)))}return u.mutationQueue.addMutationBatch(I,l,V,c)}).next(k=>{g=k;const V=k.applyToLocalDocumentSet(f,P);return u.documentOverlayCache.saveOverlays(I,k.batchId,V)})}).then(()=>({batchId:g.batchId,changes:wy(f)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(o,c,u){let l=o.du[o.currentUser.toKey()];l||(l=new de(H)),l=l.insert(c,u),o.du[o.currentUser.toKey()]=l}(r,s.batchId,t),await dn(r,s.changes),await qs(r.remoteStore)}catch(s){const i=zs(s,"Failed to persist write");t.reject(i)}}async function OI(n,e){const t=M(n);try{const r=await IP(t.localStore,e);e.targetChanges.forEach((s,i)=>{const o=t.Au.get(i);o&&(q(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?o.hu=!0:s.modifiedDocuments.size>0?q(o.hu,14607):s.removedDocuments.size>0&&(q(o.hu,42227),o.hu=!1))}),await dn(t,r,e)}catch(r){await Wn(r)}}function fg(n,e,t){const r=M(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Tu.forEach((i,o)=>{const c=o.view.va(e);c.snapshot&&s.push(c.snapshot)}),function(o,c){const u=M(o);u.onlineState=c;let l=!1;u.queries.forEach((d,f)=>{for(const g of f.Sa)g.va(c)&&(l=!0)}),l&&bh(u)}(r.eventManager,e),s.length&&r.Pu.H_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function rC(n,e,t){const r=M(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Au.get(e),i=s&&s.key;if(i){let o=new de(L.comparator);o=o.insert(i,pe.newNoDocument(i,$.min()));const c=J().add(i),u=new Io($.min(),new Map,new de(H),o,c);await OI(r,u),r.Ru=r.Ru.remove(i),r.Au.delete(e),kh(r)}else await Cs(r.localStore,e,!1).then(()=>ks(r,e,t)).catch(Wn)}async function sC(n,e){const t=M(n),r=e.batch.batchId;try{const s=await yP(t.localStore,e);xh(t,r,null),Ch(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await dn(t,s)}catch(s){await Wn(s)}}async function iC(n,e,t){const r=M(n);try{const s=await function(o,c){const u=M(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",l=>{let d;return u.mutationQueue.lookupMutationBatch(l,c).next(f=>(q(f!==null,37113),d=f.keys(),u.mutationQueue.removeMutationBatch(l,f))).next(()=>u.mutationQueue.performConsistencyCheck(l)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(l,d,c)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(l,d)).next(()=>u.localDocuments.getDocuments(l,d))})}(r.localStore,e);xh(r,e,t),Ch(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await dn(r,s)}catch(s){await Wn(s)}}async function oC(n,e){const t=M(n);Jn(t.remoteStore)||O(Yn,"The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const r=await function(o){const c=M(o);return c.persistence.runTransaction("Get highest unacknowledged batch id","readonly",u=>c.mutationQueue.getHighestUnacknowledgedBatchId(u))}(t.localStore);if(r===Ln)return void e.resolve();const s=t.mu.get(r)||[];s.push(e),t.mu.set(r,s)}catch(r){const s=zs(r,"Initialization of waitForPendingWrites() operation failed");e.reject(s)}}function Ch(n,e){(n.mu.get(e)||[]).forEach(t=>{t.resolve()}),n.mu.delete(e)}function xh(n,e,t){const r=M(n);let s=r.du[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.du[r.currentUser.toKey()]=s}}function ks(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Eu.get(e))n.Tu.delete(r),t&&n.Pu.yu(r,t);n.Eu.delete(e),n.isPrimaryClient&&n.Vu.Gr(e).forEach(r=>{n.Vu.containsKey(r)||VI(n,r)})}function VI(n,e){n.Iu.delete(e.path.canonicalString());const t=n.Ru.get(e);t!==null&&(xs(n.remoteStore,t),n.Ru=n.Ru.remove(e),n.Au.delete(t),kh(n))}function gl(n,e,t){for(const r of t)r instanceof xI?(n.Vu.addReference(r.key,e),aC(n,r)):r instanceof kI?(O(Yn,"Document no longer in limbo: "+r.key),n.Vu.removeReference(r.key,e),n.Vu.containsKey(r.key)||VI(n,r.key)):B(19791,{wu:r})}function aC(n,e){const t=e.key,r=t.path.canonicalString();n.Ru.get(t)||n.Iu.has(r)||(O(Yn,"New document in limbo: "+t),n.Iu.add(r),kh(n))}function kh(n){for(;n.Iu.size>0&&n.Ru.size<n.maxConcurrentLimboResolutions;){const e=n.Iu.values().next().value;n.Iu.delete(e);const t=new L(Z.fromString(e)),r=n.fu.next();n.Au.set(r,new JP(t)),n.Ru=n.Ru.insert(t,r),wc(n.remoteStore,new Qt(Qe(Us(t.path)),r,"TargetPurposeLimboResolution",it.ce))}}async function dn(n,e,t){const r=M(n),s=[],i=[],o=[];r.Tu.isEmpty()||(r.Tu.forEach((c,u)=>{o.push(r.pu(u,e,t).then(l=>{var d;if((l||t)&&r.isPrimaryClient){const f=l?!l.fromCache:(d=t==null?void 0:t.targetChanges.get(u.targetId))==null?void 0:d.current;r.sharedClientState.updateQueryState(u.targetId,f?"current":"not-current")}if(l){s.push(l);const f=gh.Is(u.targetId,l);i.push(f)}}))}),await Promise.all(o),r.Pu.H_(s),await async function(u,l){const d=M(u);try{await d.persistence.runTransaction("notifyLocalViewChanges","readwrite",f=>S.forEach(l,g=>S.forEach(g.Ts,I=>d.persistence.referenceDelegate.addReference(f,g.targetId,I)).next(()=>S.forEach(g.Es,I=>d.persistence.referenceDelegate.removeReference(f,g.targetId,I)))))}catch(f){if(!Hn(f))throw f;O(mh,"Failed to update sequence numbers: "+f)}for(const f of l){const g=f.targetId;if(!f.fromCache){const I=d.vs.get(g),b=I.snapshotVersion,P=I.withLastLimboFreeSnapshotVersion(b);d.vs=d.vs.insert(g,P)}}}(r.localStore,i))}async function cC(n,e){const t=M(n);if(!t.currentUser.isEqual(e)){O(Yn,"User change. New user:",e.toKey());const r=await hI(t.localStore,e);t.currentUser=e,function(i,o){i.mu.forEach(c=>{c.forEach(u=>{u.reject(new N(x.CANCELLED,o))})}),i.mu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await dn(t,r.Ns)}}function uC(n,e){const t=M(n),r=t.Au.get(e);if(r&&r.hu)return J().add(r.key);{let s=J();const i=t.Eu.get(e);if(!i)return s;for(const o of i){const c=t.Tu.get(o);s=s.unionWith(c.view.nu)}return s}}async function lC(n,e){const t=M(n),r=await Fa(t.localStore,e.query,!0),s=e.view.cu(r);return t.isPrimaryClient&&gl(t,e.targetId,s.au),s}async function hC(n,e){const t=M(n);return gI(t.localStore,e).then(r=>dn(t,r))}async function dC(n,e,t,r){const s=M(n),i=await function(c,u){const l=M(c),d=M(l.mutationQueue);return l.persistence.runTransaction("Lookup mutation documents","readonly",f=>d.Xn(f,u).next(g=>g?l.localDocuments.getDocuments(f,g):S.resolve(null)))}(s.localStore,e);i!==null?(t==="pending"?await qs(s.remoteStore):t==="acknowledged"||t==="rejected"?(xh(s,e,r||null),Ch(s,e),function(c,u){M(M(c).mutationQueue).nr(u)}(s.localStore,e)):B(6720,"Unknown batchState",{Su:t}),await dn(s,i)):O(Yn,"Cannot apply mutation batch with id: "+e)}async function fC(n,e){const t=M(n);if(Ec(t),Dh(t),e===!0&&t.gu!==!0){const r=t.sharedClientState.getAllActiveQueryTargets(),s=await pg(t,r.toArray());t.gu=!0,await fl(t.remoteStore,!0);for(const i of s)wc(t.remoteStore,i)}else if(e===!1&&t.gu!==!1){const r=[];let s=Promise.resolve();t.Eu.forEach((i,o)=>{t.sharedClientState.isLocalQueryTarget(o)?r.push(o):s=s.then(()=>(ks(t,o),Cs(t.localStore,o,!0))),xs(t.remoteStore,o)}),await s,await pg(t,r),function(o){const c=M(o);c.Au.forEach((u,l)=>{xs(c.remoteStore,l)}),c.Vu.zr(),c.Au=new Map,c.Ru=new de(L.comparator)}(t),t.gu=!1,await fl(t.remoteStore,!1)}}async function pg(n,e,t){const r=M(n),s=[],i=[];for(const o of e){let c;const u=r.Eu.get(o);if(u&&u.length!==0){c=await Ps(r.localStore,Qe(u[0]));for(const l of u){const d=r.Tu.get(l),f=await lC(r,d);f.snapshot&&i.push(f.snapshot)}}else{const l=await pI(r.localStore,o);c=await Ps(r.localStore,l),await Ph(r,LI(l),o,!1,c.resumeToken)}s.push(c)}return r.Pu.H_(i),s}function LI(n){return fy(n.path,n.collectionGroup,n.orderBy,n.filters,n.limit,"F",n.startAt,n.endAt)}function pC(n){return function(t){return M(M(t).persistence).hs()}(M(n).localStore)}async function gC(n,e,t,r){const s=M(n);if(s.gu)return void O(Yn,"Ignoring unexpected query state notification.");const i=s.Eu.get(e);if(i&&i.length>0)switch(t){case"current":case"not-current":{const o=await gI(s.localStore,_y(i[0])),c=Io.createSynthesizedRemoteEventForCurrentChange(e,t==="current",we.EMPTY_BYTE_STRING);await dn(s,o,c);break}case"rejected":await Cs(s.localStore,e,!0),ks(s,e,r);break;default:B(64155,t)}}async function mC(n,e,t){const r=Ec(n);if(r.gu){for(const s of e){if(r.Eu.has(s)&&r.sharedClientState.isActiveQueryTarget(s)){O(Yn,"Adding an already active target "+s);continue}const i=await pI(r.localStore,s),o=await Ps(r.localStore,i);await Ph(r,LI(i),o.targetId,!1,o.resumeToken),wc(r.remoteStore,o)}for(const s of t)r.Eu.has(s)&&await Cs(r.localStore,s,!1).then(()=>{xs(r.remoteStore,s),ks(r,s)}).catch(Wn)}}function Ec(n){const e=M(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=OI.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=uC.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=rC.bind(null,e),e.Pu.H_=WP.bind(null,e.eventManager),e.Pu.yu=HP.bind(null,e.eventManager),e}function Dh(n){const e=M(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=sC.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=iC.bind(null,e),e}function _C(n,e,t){const r=M(n);(async function(i,o,c){try{const u=await o.getMetadata();if(await function(I,b){const P=M(I),k=be(b.createTime);return P.persistence.runTransaction("hasNewerBundle","readonly",V=>P.Pi.getBundleMetadata(V,b.id)).then(V=>!!V&&V.createTime.compareTo(k)>=0)}(i.localStore,u))return await o.close(),c._completeWith(function(I){return{taskState:"Success",documentsLoaded:I.totalDocuments,bytesLoaded:I.totalBytes,totalDocuments:I.totalDocuments,totalBytes:I.totalBytes}}(u)),Promise.resolve(new Set);c._updateProgress(CI(u));const l=new Rh(u,o.serializer);let d=await o.bu();for(;d;){const g=await l.Ga(d);g&&c._updateProgress(g),d=await o.bu()}const f=await l.ja(i.localStore);return await dn(i,f.Ha,void 0),await function(I,b){const P=M(I);return P.persistence.runTransaction("Save bundle","readwrite",k=>P.Pi.saveBundleMetadata(k,b))}(i.localStore,u),c._completeWith(f.progress),Promise.resolve(f.Ja)}catch(u){return dt(Yn,`Loading bundle failed with ${u}`),c._failWith(u),Promise.resolve(new Set)}})(r,e,t).then(s=>{r.sharedClientState.notifyBundleLoaded(s)})}class Ds{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Fr(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return lI(this.persistence,new uI,e.initialUser,this.serializer)}Cu(e){return new dh(Ic.Vi,this.serializer)}Du(e){return new wI}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Ds.provider={build:()=>new Ds};class Nh extends Ds{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){q(this.persistence.referenceDelegate instanceof Ma,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new rI(r,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?We.withCacheSize(this.cacheSizeBytes):We.DEFAULT;return new dh(r=>Ma.Vi(r,t),this.serializer)}}class Oh extends Ds{constructor(e,t,r){super(),this.xu=e,this.cacheSizeBytes=t,this.forceOwnership=r,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.xu.initialize(this,e),await Dh(this.xu.syncEngine),await qs(this.xu.remoteStore),await this.persistence.zi(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}vu(e){return lI(this.persistence,new uI,e.initialUser,this.serializer)}Fu(e,t){const r=this.persistence.referenceDelegate.garbageCollector;return new rI(r,e.asyncQueue,t)}Mu(e,t){const r=new vR(t,this.persistence);return new AR(e.asyncQueue,r)}Cu(e){const t=ph(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),r=this.cacheSizeBytes!==void 0?We.withCacheSize(this.cacheSizeBytes):We.DEFAULT;return new fh(this.synchronizeTabs,t,e.clientId,r,e.asyncQueue,EI(),ga(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Du(e){return new wI}}class MI extends Oh{constructor(e,t){super(e,t,!1),this.xu=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const t=this.xu.syncEngine;this.sharedClientState instanceof Iu&&(this.sharedClientState.syncEngine={bo:dC.bind(null,t),Do:gC.bind(null,t),Co:mC.bind(null,t),hs:pC.bind(null,t),So:hC.bind(null,t)},await this.sharedClientState.start()),await this.persistence.zi(async r=>{await fC(this.xu.syncEngine,r),this.gcScheduler&&(r&&!this.gcScheduler.started?this.gcScheduler.start():r||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(r&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():r||this.indexBackfillerScheduler.stop())})}Du(e){const t=EI();if(!Iu.v(t))throw new N(x.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const r=ph(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new Iu(t,e.asyncQueue,r,e.clientId,e.initialUser)}}class $n{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>fg(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=cC.bind(null,this.syncEngine),await fl(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new KP}()}createDatastore(e){const t=Fr(e.databaseInfo.databaseId),r=RP(e.databaseInfo);return DP(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,s,i,o,c){return new OP(r,s,i,o,c)}(this.localStore,this.datastore,e.asyncQueue,t=>fg(this.syncEngine,t,0),function(){return og.v()?new og:new AP}())}createSyncEngine(e,t){return function(s,i,o,c,u,l,d){const f=new YP(s,i,o,c,u,l);return d&&(f.gu=!0),f}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const i=M(s);O(xr,"RemoteStore shutting down."),i.Ia.add(5),await Gs(i),i.Aa.shutdown(),i.Va.set("Unknown")}(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}}$n.provider={build:()=>new $n};function gg(n,e=10240){let t=0;return{async read(){if(t<n.byteLength){const r={value:n.slice(t,t+e),done:!1};return t+=e,r}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tc{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):ve("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yC{constructor(e,t){this.Bu=e,this.serializer=t,this.metadata=new Be,this.buffer=new Uint8Array,this.Lu=function(){return new TextDecoder("utf-8")}(),this.ku().then(r=>{r&&r.Ua()?this.metadata.resolve(r.Ka.metadata):this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is
             ${JSON.stringify(r==null?void 0:r.Ka)}`))},r=>this.metadata.reject(r))}close(){return this.Bu.cancel()}async getMetadata(){return this.metadata.promise}async bu(){return await this.getMetadata(),this.ku()}async ku(){const e=await this.qu();if(e===null)return null;const t=this.Lu.decode(e),r=Number(t);isNaN(r)&&this.Ku(`length string (${t}) is not valid number`);const s=await this.Uu(r);return new PI(JSON.parse(s),e.length+r)}$u(){return this.buffer.findIndex(e=>e===123)}async qu(){for(;this.$u()<0&&!await this.Wu(););if(this.buffer.length===0)return null;const e=this.$u();e<0&&this.Ku("Reached the end of bundle when a length string is expected.");const t=this.buffer.slice(0,e);return this.buffer=this.buffer.slice(e),t}async Uu(e){for(;this.buffer.length<e;)await this.Wu()&&this.Ku("Reached the end of bundle when more is expected.");const t=this.Lu.decode(this.buffer.slice(0,e));return this.buffer=this.buffer.slice(e),t}Ku(e){throw this.Bu.cancel(),new Error(`Invalid bundle format: ${e}`)}async Wu(){const e=await this.Bu.read();if(!e.done){const t=new Uint8Array(this.buffer.length+e.value.length);t.set(this.buffer),t.set(e.value,this.buffer.length),this.buffer=t}return e.done}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IC{constructor(e,t){this.bundleData=e,this.serializer=t,this.cursor=0,this.elements=[];let r=this.bu();if(!r||!r.Ua())throw new Error(`The first element of the bundle is not a metadata object, it is
         ${JSON.stringify(r==null?void 0:r.Ka)}`);this.metadata=r;do r=this.bu(),r!==null&&this.elements.push(r);while(r!==null)}getMetadata(){return this.metadata}Qu(){return this.elements}bu(){if(this.cursor===this.bundleData.length)return null;const e=this.qu(),t=this.Uu(e);return new PI(JSON.parse(t),e)}Uu(e){if(this.cursor+e>this.bundleData.length)throw new N(x.INTERNAL,"Reached the end of bundle when more is expected.");return this.bundleData.slice(this.cursor,this.cursor+=e)}qu(){const e=this.cursor;let t=this.cursor;for(;t<this.bundleData.length;){if(this.bundleData[t]==="{"){if(t===e)throw new Error("First character is a bracket and not a number");return this.cursor=t,Number(this.bundleData.slice(e,t))}t++}throw new Error("Reached the end of bundle when more is expected.")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let wC=class{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new N(x.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const t=await async function(s,i){const o=M(s),c={documents:i.map(f=>Zi(o.serializer,f))},u=await o.jo("BatchGetDocuments",o.serializer.databaseId,Z.emptyPath(),c,i.length),l=new Map;u.forEach(f=>{const g=V0(o.serializer,f);l.set(g.key.toString(),g)});const d=[];return i.forEach(f=>{const g=l.get(f.toString());q(!!g,55234,{key:f}),d.push(g)}),d}(this.datastore,e);return t.forEach(r=>this.recordVersion(r)),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(r){this.lastTransactionError=r}this.writtenDocs.add(e.toString())}delete(e){this.write(new Bs(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach(t=>{e.delete(t.key.toString())}),e.forEach((t,r)=>{const s=L.fromPath(r);this.mutations.push(new rh(s,this.precondition(s)))}),await async function(r,s){const i=M(r),o={writes:s.map(c=>eo(i.serializer,c))};await i.Wo("Commit",i.serializer.databaseId,Z.emptyPath(),o)}(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw B(50498,{Gu:e.constructor.name});t=$.min()}const r=this.readVersions.get(e.key.toString());if(r){if(!t.isEqual(r))throw new N(x.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){const t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual($.min())?_e.exists(!1):_e.updateTime(t):_e.none()}preconditionForUpdate(e){const t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual($.min()))throw new N(x.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return _e.updateTime(t)}return _e.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class EC{constructor(e,t,r,s,i){this.asyncQueue=e,this.datastore=t,this.options=r,this.updateFunction=s,this.deferred=i,this.zu=r.maxAttempts,this.M_=new yh(this.asyncQueue,"transaction_retry")}ju(){this.zu-=1,this.Ju()}Ju(){this.M_.p_(async()=>{const e=new wC(this.datastore),t=this.Hu(e);t&&t.then(r=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(r)}).catch(s=>{this.Zu(s)}))}).catch(r=>{this.Zu(r)})})}Hu(e){try{const t=this.updateFunction(e);return!fo(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}Zu(e){this.zu>0&&this.Xu(e)?(this.zu-=1,this.asyncQueue.enqueueAndForget(()=>(this.Ju(),Promise.resolve()))):this.deferred.reject(e)}Xu(e){if((e==null?void 0:e.name)==="FirebaseError"){const t=e.code;return t==="aborted"||t==="failed-precondition"||t==="already-exists"||!ky(t)}return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zn="FirestoreClient";class TC{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this._databaseInfo=s,this.user=Ue.UNAUTHENTICATED,this.clientId=rc.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async o=>{O(zn,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(O(zn,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Be;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=zs(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function Eu(n,e){n.asyncQueue.verifyOperationInProgress(),O(zn,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await hI(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function mg(n,e){n.asyncQueue.verifyOperationInProgress();const t=await Vh(n);O(zn,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>cg(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>cg(e.remoteStore,s)),n._onlineComponents=e}async function Vh(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){O(zn,"Using user provided OfflineComponentProvider");try{await Eu(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===x.FAILED_PRECONDITION||s.code===x.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;dt("Error using user provided cache. Falling back to memory cache: "+t),await Eu(n,new Ds)}}else O(zn,"Using default OfflineComponentProvider"),await Eu(n,new Nh(void 0));return n._offlineComponents}async function Ac(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(O(zn,"Using user provided OnlineComponentProvider"),await mg(n,n._uninitializedComponentsProvider._online)):(O(zn,"Using default OnlineComponentProvider"),await mg(n,new $n))),n._onlineComponents}function FI(n){return Vh(n).then(e=>e.persistence)}function Ks(n){return Vh(n).then(e=>e.localStore)}function UI(n){return Ac(n).then(e=>e.remoteStore)}function Lh(n){return Ac(n).then(e=>e.syncEngine)}function jI(n){return Ac(n).then(e=>e.datastore)}async function Ns(n){const e=await Ac(n),t=e.eventManager;return t.onListen=XP.bind(null,e.syncEngine),t.onUnlisten=eC.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=ZP.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=tC.bind(null,e.syncEngine),t}function AC(n){return n.asyncQueue.enqueue(async()=>{const e=await FI(n),t=await UI(n);return e.setNetworkEnabled(!0),function(s){const i=M(s);return i.Ia.delete(0),Eo(i)}(t)})}function vC(n){return n.asyncQueue.enqueue(async()=>{const e=await FI(n),t=await UI(n);return e.setNetworkEnabled(!1),async function(s){const i=M(s);i.Ia.add(0),await Gs(i),i.Va.set("Offline")}(t)})}function bC(n,e,t,r){const s=new Tc(r),i=new Sh(e,s,t);return n.asyncQueue.enqueueAndForget(async()=>Ah(await Ns(n),i)),()=>{s.Nu(),n.asyncQueue.enqueueAndForget(async()=>vh(await Ns(n),i))}}function SC(n,e){const t=new Be;return n.asyncQueue.enqueueAndForget(async()=>async function(s,i,o){try{const c=await function(l,d){const f=M(l);return f.persistence.runTransaction("read document","readonly",g=>f.localDocuments.getDocument(g,d))}(s,i);c.isFoundDocument()?o.resolve(c):c.isNoDocument()?o.resolve(null):o.reject(new N(x.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(c){const u=zs(c,`Failed to get document '${i} from cache`);o.reject(u)}}(await Ks(n),e,t)),t.promise}function BI(n,e,t={}){const r=new Be;return n.asyncQueue.enqueueAndForget(async()=>function(i,o,c,u,l){const d=new Tc({next:g=>{d.Nu(),o.enqueueAndForget(()=>vh(i,f));const I=g.docs.has(c);!I&&g.fromCache?l.reject(new N(x.UNAVAILABLE,"Failed to get document because the client is offline.")):I&&g.fromCache&&u&&u.source==="server"?l.reject(new N(x.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):l.resolve(g)},error:g=>l.reject(g)}),f=new Sh(Us(c.path),d,{includeMetadataChanges:!0,qa:!0});return Ah(i,f)}(await Ns(n),n.asyncQueue,e,t,r)),r.promise}function RC(n,e){const t=new Be;return n.asyncQueue.enqueueAndForget(async()=>async function(s,i,o){try{const c=await Fa(s,i,!0),u=new DI(i,c.ks),l=u.ru(c.documents),d=u.applyChanges(l,!1);o.resolve(d.snapshot)}catch(c){const u=zs(c,`Failed to execute query '${i} against cache`);o.reject(u)}}(await Ks(n),e,t)),t.promise}function GI(n,e,t={}){const r=new Be;return n.asyncQueue.enqueueAndForget(async()=>function(i,o,c,u,l){const d=new Tc({next:g=>{d.Nu(),o.enqueueAndForget(()=>vh(i,f)),g.fromCache&&u.source==="server"?l.reject(new N(x.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):l.resolve(g)},error:g=>l.reject(g)}),f=new Sh(c,d,{includeMetadataChanges:!0,qa:!0});return Ah(i,f)}(await Ns(n),n.asyncQueue,e,t,r)),r.promise}function PC(n,e,t){const r=new Be;return n.asyncQueue.enqueueAndForget(async()=>{try{const s=await jI(n);r.resolve(async function(o,c,u){var P;const l=M(o),{request:d,gt:f,parent:g}=Gy(l.serializer,py(c),u);l.connection.qo||delete d.parent;const I=(await l.jo("RunAggregationQuery",l.serializer.databaseId,g,d,1)).filter(k=>!!k.result);q(I.length===1,64727);const b=(P=I[0].result)==null?void 0:P.aggregateFields;return Object.keys(b).reduce((k,V)=>(k[f[V]]=b[V],k),{})}(s,e,t))}catch(s){r.reject(s)}}),r.promise}function CC(n,e){const t=new Be;return n.asyncQueue.enqueueAndForget(async()=>nC(await Lh(n),e,t)),t.promise}function xC(n,e){const t=new Tc(e);return n.asyncQueue.enqueueAndForget(async()=>function(s,i){M(s).Ca.add(i),i.next()}(await Ns(n),t)),()=>{t.Nu(),n.asyncQueue.enqueueAndForget(async()=>function(s,i){M(s).Ca.delete(i)}(await Ns(n),t))}}function kC(n,e,t){const r=new Be;return n.asyncQueue.enqueueAndForget(async()=>{const s=await jI(n);new EC(n.asyncQueue,s,t,e,r).ju()}),r.promise}function DC(n,e,t,r){const s=function(o,c){let u;return u=typeof o=="string"?Ny().encode(o):o,function(d,f){return new yC(d,f)}(function(d,f){if(d instanceof Uint8Array)return gg(d,f);if(d instanceof ArrayBuffer)return gg(new Uint8Array(d),f);if(d instanceof ReadableStream)return d.getReader();throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")}(u),c)}(t,Fr(e));n.asyncQueue.enqueueAndForget(async()=>{_C(await Lh(n),s,r)})}function NC(n,e){return n.asyncQueue.enqueue(async()=>function(r,s){const i=M(r);return i.persistence.runTransaction("Get named query","readonly",o=>i.Pi.getNamedQuery(o,s))}(await Ks(n),e))}function qI(n,e){return function(r,s){return new IC(r,s)}(n,e)}function OC(n,e){return n.asyncQueue.enqueue(async()=>async function(r,s){const i=M(r),o=i.indexManager,c=[];return i.persistence.runTransaction("Configure indexes","readwrite",u=>o.getFieldIndexes(u).next(l=>function(f,g,I,b,P){f=[...f],g=[...g],f.sort(I),g.sort(I);const k=f.length,V=g.length;let j=0,U=0;for(;j<V&&U<k;){const z=I(f[U],g[j]);z<0?P(f[U++]):z>0?b(g[j++]):(j++,U++)}for(;j<V;)b(g[j++]);for(;U<k;)P(f[U++])}(l,s,IR,d=>{c.push(o.addFieldIndex(u,d))},d=>{c.push(o.deleteFieldIndex(u,d))})).next(()=>S.waitFor(c)))}(await Ks(n),e))}function VC(n,e){return n.asyncQueue.enqueue(async()=>function(r,s){M(r).Cs.As=s}(await Ks(n),e))}function LC(n){return n.asyncQueue.enqueue(async()=>function(t){const r=M(t),s=r.indexManager;return r.persistence.runTransaction("Delete All Indexes","readwrite",i=>s.deleteAllFieldIndexes(i))}(await Ks(n)))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $I(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const MC="ComponentProvider",_g=new Map;function FC(n,e,t,r,s){return new ZR(n,e,t,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,$I(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zI="firestore.googleapis.com",yg=!0;class Ig{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new N(x.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=zI,this.ssl=yg}else this.host=e.host,this.ssl=e.ssl??yg;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Xy;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<nI)throw new N(x.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}x_("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=$I(e.experimentalLongPollingOptions??{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new N(x.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new N(x.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new N(x.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class To{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Ig({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new N(x.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new N(x.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Ig(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new P_;switch(r.type){case"firstParty":return new dR(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new N(x.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=_g.get(t);r&&(O(MC,"Removing Datastore"),_g.delete(t),r.terminate())}(this),Promise.resolve()}}function KI(n,e,t,r={}){var l;n=ee(n,To);const s=$t(e),i=n._getSettings(),o={...i,emulatorOptions:n._getEmulatorOptions()},c=`${e}:${t}`;s&&ao(`https://${c}`),i.host!==zI&&i.host!==c&&dt("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...i,host:c,ssl:s,emulatorOptions:r};if(!Pt(u,o)&&(n._setSettings(u),r.mockUserToken)){let d,f;if(typeof r.mockUserToken=="string")d=r.mockUserToken,f=Ue.MOCK_USER;else{d=gm(r.mockUserToken,(l=n._app)==null?void 0:l.options.projectId);const g=r.mockUserToken.sub||r.mockUserToken.user_id;if(!g)throw new N(x.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");f=new Ue(g)}n._authCredentials=new uR(new R_(d,f))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oe{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Oe(this.firestore,e,this._query)}}class ce{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new vt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new ce(this.firestore,e,this._key)}toJSON(){return{type:ce._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(Mr(t,ce._jsonSchema))return new ce(e,r||null,new L(Z.fromString(t.referencePath)))}}ce._jsonSchemaVersion="firestore/documentReference/1.0",ce._jsonSchema={type:Re("string",ce._jsonSchemaVersion),referencePath:Re("string")};class vt extends Oe{constructor(e,t,r){super(e,t,Us(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new ce(this.firestore,null,new L(e))}withConverter(e){return new vt(this.firestore,e,this._path)}}function yt(n,e,...t){if(n=Y(n),$l("collection","path",e),n instanceof To){const r=Z.fromString(e,...t);return ap(r),new vt(n,null,r)}{if(!(n instanceof ce||n instanceof vt))throw new N(x.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Z.fromString(e,...t));return ap(r),new vt(n.firestore,null,r)}}function UC(n,e){if(n=ee(n,To),$l("collectionGroup","collection id",e),e.indexOf("/")>=0)throw new N(x.INVALID_ARGUMENT,`Invalid collection ID '${e}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new Oe(n,null,function(r){return new un(Z.emptyPath(),r)}(e))}function ye(n,e,...t){if(n=Y(n),arguments.length===1&&(e=rc.newId()),$l("doc","path",e),n instanceof To){const r=Z.fromString(e,...t);return op(r),new ce(n,null,new L(r))}{if(!(n instanceof ce||n instanceof vt))throw new N(x.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Z.fromString(e,...t));return op(r),new ce(n.firestore,n instanceof vt?n.converter:null,new L(r))}}function jC(n,e){return n=Y(n),e=Y(e),(n instanceof ce||n instanceof vt)&&(e instanceof ce||e instanceof vt)&&n.firestore===e.firestore&&n.path===e.path&&n.converter===e.converter}function Mh(n,e){return n=Y(n),e=Y(e),n instanceof Oe&&e instanceof Oe&&n.firestore===e.firestore&&mo(n._query,e._query)&&n.converter===e.converter}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wg="AsyncQueue";class Eg{constructor(e=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new yh(this,"async_queue_retry"),this._c=()=>{const r=ga();r&&O(wg,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=e;const t=ga();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=ga();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const t=new Be;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Yu.push(e),this.lc()))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(e){if(!Hn(e))throw e;O(wg,"Operation failed with retryable error: "+e)}this.Yu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const t=this.ac.then(()=>(this.rc=!0,e().catch(r=>{throw this.nc=r,this.rc=!1,ve("INTERNAL UNHANDLED ERROR: ",Tg(r)),r}).then(r=>(this.rc=!1,r))));return this.ac=t,t}enqueueAfterDelay(e,t,r){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const s=Th.createAndSchedule(this,e,t,r,i=>this.hc(i));return this.tc.push(s),s}uc(){this.nc&&B(47125,{Pc:Tg(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ec(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ic(e){return this.Tc().then(()=>{this.tc.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()})}Rc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function Tg(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WI{constructor(){this._progressObserver={},this._taskCompletionResolver=new Be,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(e,t,r){this._progressObserver={next:e,error:t,complete:r}}catch(e){return this._taskCompletionResolver.promise.catch(e)}then(e,t){return this._taskCompletionResolver.promise.then(e,t)}_completeWith(e){this._updateProgress(e),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(e)}_failWith(e){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(e),this._taskCompletionResolver.reject(e)}_updateProgress(e){this._lastProgress=e,this._progressObserver.next&&this._progressObserver.next(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const BC=-1;class le extends To{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new Eg,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Eg(e),this._firestoreClient=void 0,await e}}}function GC(n,e,t){t||(t=Qi);const r=Et(n,"firestore");if(r.isInitialized(t)){const s=r.getImmediate({identifier:t}),i=r.getOptions(t);if(Pt(i,e))return s;throw new N(x.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new N(x.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<nI)throw new N(x.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return e.host&&$t(e.host)&&ao(e.host),r.initialize({options:e,instanceIdentifier:t})}function HI(n,e){const t=typeof n=="object"?n:Ls(),r=typeof n=="string"?n:e||Qi,s=Et(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=Pl("firestore");i&&KI(s,...i)}return s}function Ie(n){if(n._terminated)throw new N(x.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||QI(n),n._firestoreClient}function QI(n){var r,s,i,o;const e=n._freezeSettings(),t=FC(n._databaseId,((r=n._app)==null?void 0:r.options.appId)||"",n._persistenceKey,(s=n._app)==null?void 0:s.options.apiKey,e);n._componentsProvider||(i=e.localCache)!=null&&i._offlineComponentProvider&&((o=e.localCache)!=null&&o._onlineComponentProvider)&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new TC(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&function(u){const l=u==null?void 0:u._online.build();return{_offline:u==null?void 0:u._offline.build(l),_online:l}}(n._componentsProvider))}function qC(n,e){dt("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const t=n._freezeSettings();return YI(n,$n.provider,{build:r=>new Oh(r,t.cacheSizeBytes,e==null?void 0:e.forceOwnership)}),Promise.resolve()}async function JI(n){dt("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const e=n._freezeSettings();YI(n,$n.provider,{build:t=>new MI(t,e.cacheSizeBytes)})}function YI(n,e,t){if((n=ee(n,le))._firestoreClient||n._terminated)throw new N(x.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(n._componentsProvider||n._getSettings().localCache)throw new N(x.FAILED_PRECONDITION,"SDK cache is already specified.");n._componentsProvider={_online:e,_offline:t},QI(n)}function $C(n){if(n._initialized&&!n._terminated)throw new N(x.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const e=new Be;return n._queue.enqueueAndForgetEvenWhileRestricted(async()=>{try{await async function(r){if(!Bt.v())return Promise.resolve();const s=r+cI;await Bt.delete(s)}(ph(n._databaseId,n._persistenceKey)),e.resolve()}catch(t){e.reject(t)}}),e.promise}function zC(n){return function(t){const r=new Be;return t.asyncQueue.enqueueAndForget(async()=>oC(await Lh(t),r)),r.promise}(Ie(n=ee(n,le)))}function KC(n){return AC(Ie(n=ee(n,le)))}function WC(n){return vC(Ie(n=ee(n,le)))}function HC(n){return WA(n.app,"firestore",n._databaseId.database),n._delete()}function ml(n,e){const t=Ie(n=ee(n,le)),r=new WI;return DC(t,n._databaseId,e,r),r}function XI(n,e){return NC(Ie(n=ee(n,le)),e).then(t=>t?new Oe(n,null,t.query):null)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rt{constructor(e){this._byteString=e}static fromBase64String(e){try{return new rt(we.fromBase64String(e))}catch(t){throw new N(x.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new rt(we.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:rt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Mr(e,rt._jsonSchema))return rt.fromBase64String(e.bytes)}}rt._jsonSchemaVersion="firestore/bytes/1.0",rt._jsonSchema={type:Re("string",rt._jsonSchemaVersion),bytes:Re("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ur{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new N(x.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ge(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function QC(){return new Ur(Ku)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xn{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bt{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new N(x.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new N(x.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return H(this._lat,e._lat)||H(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:bt._jsonSchemaVersion}}static fromJSON(e){if(Mr(e,bt._jsonSchema))return new bt(e.latitude,e.longitude)}}bt._jsonSchemaVersion="firestore/geoPoint/1.0",bt._jsonSchema={type:Re("string",bt._jsonSchemaVersion),latitude:Re("number"),longitude:Re("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mt{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}toJSON(){return{type:mt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Mr(e,mt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new mt(e.vectorValues);throw new N(x.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}mt._jsonSchemaVersion="firestore/vectorValue/1.0",mt._jsonSchema={type:Re("string",mt._jsonSchemaVersion),vectorValues:Re("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const JC=/^__.*__$/;class YC{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new hn(e,this.data,this.fieldMask,t,this.fieldTransforms):new js(e,this.data,t,this.fieldTransforms)}}class ZI{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new hn(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function ew(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw B(40011,{dataSource:n})}}class vc{constructor(e,t,r,s,i,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Ac(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(e){return new vc({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}dc(e){var s;const t=(s=this.path)==null?void 0:s.child(e),r=this.i({path:t,arrayElement:!1});return r.mc(e),r}fc(e){var s;const t=(s=this.path)==null?void 0:s.child(e),r=this.i({path:t,arrayElement:!1});return r.Ac(),r}gc(e){return this.i({path:void 0,arrayElement:!0})}yc(e){return Ga(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.mc(this.path.get(e))}mc(e){if(e.length===0)throw this.yc("Document fields must not be empty");if(ew(this.dataSource)&&JC.test(e))throw this.yc('Document fields cannot begin and end with "__"')}}class XC{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Fr(e)}I(e,t,r,s=!1){return new vc({dataSource:e,methodName:t,targetDoc:r,path:ge.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function jr(n){const e=n._freezeSettings(),t=Fr(n._databaseId);return new XC(n._databaseId,!!e.ignoreUndefinedProperties,t)}function bc(n,e,t,r,s,i={}){const o=n.I(i.merge||i.mergeFields?2:0,e,t,s);$h("Data must be an object, but it was:",o,r);const c=rw(r,o);let u,l;if(i.merge)u=new ot(o.fieldMask),l=o.fieldTransforms;else if(i.mergeFields){const d=[];for(const f of i.mergeFields){const g=rn(e,f,t);if(!o.contains(g))throw new N(x.INVALID_ARGUMENT,`Field '${g}' is specified in your field mask but missing from your input data.`);iw(d,g)||d.push(g)}u=new ot(d),l=o.fieldTransforms.filter(f=>u.covers(f.field))}else u=null,l=o.fieldTransforms;return new YC(new je(c),u,l)}class Ao extends Xn{_toFieldTransform(e){if(e.dataSource!==2)throw e.dataSource===1?e.yc(`${this._methodName}() can only appear at the top level of your update data`):e.yc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Ao}}function tw(n,e,t){return new vc({dataSource:3,targetDoc:e.settings.targetDoc,methodName:n._methodName,arrayElement:t},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class Fh extends Xn{_toFieldTransform(e){return new yo(e.path,new bs)}isEqual(e){return e instanceof Fh}}class Uh extends Xn{constructor(e,t){super(e),this.Sc=t}_toFieldTransform(e){const t=tw(this,e,!0),r=this.Sc.map(i=>Br(i,t)),s=new br(r);return new yo(e.path,s)}isEqual(e){return e instanceof Uh&&Pt(this.Sc,e.Sc)}}class jh extends Xn{constructor(e,t){super(e),this.Sc=t}_toFieldTransform(e){const t=tw(this,e,!0),r=this.Sc.map(i=>Br(i,t)),s=new Sr(r);return new yo(e.path,s)}isEqual(e){return e instanceof jh&&Pt(this.Sc,e.Sc)}}class Bh extends Xn{constructor(e,t){super(e),this.bc=t}_toFieldTransform(e){const t=new Ss(e.serializer,Ay(e.serializer,this.bc));return new yo(e.path,t)}isEqual(e){return e instanceof Bh&&this.bc===e.bc}}function Gh(n,e,t,r){const s=n.I(1,e,t);$h("Data must be an object, but it was:",s,r);const i=[],o=je.empty();Qn(r,(u,l)=>{const d=zh(e,u,t);l=Y(l);const f=s.fc(d);if(l instanceof Ao)i.push(d);else{const g=Br(l,f);g!=null&&(i.push(d),o.set(d,g))}});const c=new ot(i);return new ZI(o,c,s.fieldTransforms)}function qh(n,e,t,r,s,i){const o=n.I(1,e,t),c=[rn(e,r,t)],u=[s];if(i.length%2!=0)throw new N(x.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let g=0;g<i.length;g+=2)c.push(rn(e,i[g])),u.push(i[g+1]);const l=[],d=je.empty();for(let g=c.length-1;g>=0;--g)if(!iw(l,c[g])){const I=c[g];let b=u[g];b=Y(b);const P=o.fc(I);if(b instanceof Ao)l.push(I);else{const k=Br(b,P);k!=null&&(l.push(I),d.set(I,k))}}const f=new ot(l);return new ZI(d,f,o.fieldTransforms)}function nw(n,e,t,r=!1){return Br(t,n.I(r?4:3,e))}function Br(n,e){if(sw(n=Y(n)))return $h("Unsupported field value:",e,n),rw(n,e);if(n instanceof Xn)return function(r,s){if(!ew(s.dataSource))throw s.yc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.yc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.yc("Nested arrays are not supported");return function(r,s){const i=[];let o=0;for(const c of r){let u=Br(c,s.gc(o));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),o++}return{arrayValue:{values:i}}}(n,e)}return function(r,s){if((r=Y(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Ay(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=oe.fromDate(r);return{timestampValue:Rs(s.serializer,i)}}if(r instanceof oe){const i=new oe(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Rs(s.serializer,i)}}if(r instanceof bt)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof rt)return{bytesValue:Ly(s.serializer,r._byteString)};if(r instanceof ce){const i=s.databaseId,o=r.firestore._databaseId;if(!o.isEqual(i))throw s.yc(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:ch(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof mt)return function(o,c){const u=o instanceof mt?o.toArray():o;return{mapValue:{fields:{[Yl]:{stringValue:Xl},[Ts]:{arrayValue:{values:u.map(d=>{if(typeof d!="number")throw c.yc("VectorValues must only contain numeric values.");return nh(c.serializer,d)})}}}}}}(r,s);if(Wy(r))return r._toProto(s.serializer);throw s.yc(`Unsupported field value: ${sc(r)}`)}(n,e)}function rw(n,e){const t={};return J_(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Qn(n,(r,s)=>{const i=Br(s,e.dc(r));i!=null&&(t[r]=i)}),{mapValue:{fields:t}}}function sw(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof oe||n instanceof bt||n instanceof rt||n instanceof ce||n instanceof Xn||n instanceof mt||Wy(n))}function $h(n,e,t){if(!sw(t)||!k_(t)){const r=sc(t);throw r==="an object"?e.yc(n+" a custom object"):e.yc(n+" "+r)}}function rn(n,e,t){if((e=Y(e))instanceof Ur)return e._internalPath;if(typeof e=="string")return zh(n,e);throw Ga("Field path arguments must be of type string or ",n,!1,void 0,t)}const ZC=new RegExp("[~\\*/\\[\\]]");function zh(n,e,t){if(e.search(ZC)>=0)throw Ga(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Ur(...e.split("."))._internalPath}catch{throw Ga(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Ga(n,e,t,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(i||o)&&(u+=" (found",i&&(u+=` in field ${r}`),o&&(u+=` in document ${s}`),u+=")"),new N(x.INVALID_ARGUMENT,c+n+u)}function iw(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kh{convertValue(e,t="none"){switch(jn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return me(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(nn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw B(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return Qn(e,(s,i)=>{r[s]=this.convertValue(i,t)}),r}convertVectorValue(e){var r,s,i;const t=(i=(s=(r=e.fields)==null?void 0:r[Ts].arrayValue)==null?void 0:s.values)==null?void 0:i.map(o=>me(o.doubleValue));return new mt(t)}convertGeoPoint(e){return new bt(me(e.latitude),me(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=lc(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Hi(e));default:return null}}convertTimestamp(e){const t=tn(e);return new oe(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=Z.fromString(e);q(Ky(r),9688,{name:e});const s=new Un(r.get(1),r.get(3)),i=new L(r.popFirst(5));return s.isEqual(t)||ve(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zn extends Kh{constructor(e){super(),this.firestore=e}convertBytes(e){return new rt(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new ce(this.firestore,null,t)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ex(){return new Ao("deleteField")}function Mn(){return new Fh("serverTimestamp")}function tx(...n){return new Uh("arrayUnion",n)}function nx(...n){return new jh("arrayRemove",n)}function rx(n){return new Bh("increment",n)}function sx(n){return new mt(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ix(n){var r;const e=Ie(ee(n.firestore,le)),t=(r=e._onlineComponents)==null?void 0:r.datastore.serializer;return t===void 0?null:gc(t,Qe(n._query)).ft}function ox(n,e){var i;const t=Q_(e,(o,c)=>new xy(c,o.aggregateType,o._internalFieldPath)),r=Ie(ee(n.firestore,le)),s=(i=r._onlineComponents)==null?void 0:i.datastore.serializer;return s===void 0?null:Gy(s,py(n._query),t,!0).request}const Ag="@firebase/firestore",vg="4.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ls(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1}(n,["next","error","complete"])}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Os{constructor(e="count",t){this._internalFieldPath=t,this.type="AggregateField",this.aggregateType=e}}class ow{constructor(e,t,r){this._userDataWriter=t,this._data=r,this.type="AggregateQuerySnapshot",this.query=e}data(){return this._userDataWriter.convertObjectMap(this._data)}_fieldsProto(){return new je({mapValue:{fields:this._data}}).clone().value.mapValue.fields}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class to{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new ce(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new ax(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const t=this._document.data.field(rn("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class ax extends to{data(){return super.data()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aw(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new N(x.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Wh{}class Ws extends Wh{}function er(n,e,...t){let r=[];e instanceof Wh&&r.push(e),r=r.concat(t),function(i){const o=i.filter(u=>u instanceof Gr).length,c=i.filter(u=>u instanceof Hs).length;if(o>1||o>0&&c>0)throw new N(x.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)n=s._apply(n);return n}class Hs extends Ws{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new Hs(e,t,r)}_apply(e){const t=this._parse(e);return uw(e._query,t),new Oe(e.firestore,e.converter,rl(e._query,t))}_parse(e){const t=jr(e.firestore);return function(i,o,c,u,l,d,f){let g;if(l.isKeyField()){if(d==="array-contains"||d==="array-contains-any")throw new N(x.INVALID_ARGUMENT,`Invalid Query. You can't perform '${d}' queries on documentId().`);if(d==="in"||d==="not-in"){Sg(f,d);const b=[];for(const P of f)b.push(bg(u,i,P));g={arrayValue:{values:b}}}else g=bg(u,i,f)}else d!=="in"&&d!=="not-in"&&d!=="array-contains-any"||Sg(f,d),g=nw(c,o,f,d==="in"||d==="not-in");return re.create(l,d,g)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function cx(n,e,t){const r=e,s=rn("where",n);return Hs._create(s,r,t)}class Gr extends Wh{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Gr(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:ae.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(s,i){let o=s;const c=i.getFlattenedFilters();for(const u of c)uw(o,u),o=rl(o,u)}(e._query,t),new Oe(e.firestore,e.converter,rl(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function ux(...n){return n.forEach(e=>lw("or",e)),Gr._create("or",n)}function lx(...n){return n.forEach(e=>lw("and",e)),Gr._create("and",n)}class Sc extends Ws{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Sc(e,t)}_apply(e){const t=function(s,i,o){if(s.startAt!==null)throw new N(x.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new N(x.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Xi(i,o)}(e._query,this._field,this._direction);return new Oe(e.firestore,e.converter,d0(e._query,t))}}function qr(n,e="asc"){const t=e,r=rn("orderBy",n);return Sc._create(r,t)}class vo extends Ws{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new vo(e,t,r)}_apply(e){return new Oe(e.firestore,e.converter,Na(e._query,this._limit,this._limitType))}}function hx(n){return D_("limit",n),vo._create("limit",n,"F")}function dx(n){return D_("limitToLast",n),vo._create("limitToLast",n,"L")}class bo extends Ws{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new bo(e,t,r)}_apply(e){const t=cw(e,this.type,this._docOrFields,this._inclusive);return new Oe(e.firestore,e.converter,f0(e._query,t))}}function fx(...n){return bo._create("startAt",n,!0)}function px(...n){return bo._create("startAfter",n,!1)}class So extends Ws{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new So(e,t,r)}_apply(e){const t=cw(e,this.type,this._docOrFields,this._inclusive);return new Oe(e.firestore,e.converter,p0(e._query,t))}}function gx(...n){return So._create("endBefore",n,!1)}function mx(...n){return So._create("endAt",n,!0)}function cw(n,e,t,r){if(t[0]=Y(t[0]),t[0]instanceof to)return function(i,o,c,u,l){if(!u)throw new N(x.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${c}().`);const d=[];for(const f of cs(i))if(f.field.isKeyField())d.push(Ar(o,u.key));else{const g=u.data.field(f.field);if(uc(g))throw new N(x.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+f.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(g===null){const I=f.field.canonicalString();throw new N(x.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${I}' (used as the orderBy) does not exist.`)}d.push(g)}return new Gn(d,l)}(n._query,n.firestore._databaseId,e,t[0]._document,r);{const s=jr(n.firestore);return function(o,c,u,l,d,f){const g=o.explicitOrderBy;if(d.length>g.length)throw new N(x.INVALID_ARGUMENT,`Too many arguments provided to ${l}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const I=[];for(let b=0;b<d.length;b++){const P=d[b];if(g[b].field.isKeyField()){if(typeof P!="string")throw new N(x.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${l}(), but got a ${typeof P}`);if(!eh(o)&&P.indexOf("/")!==-1)throw new N(x.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${l}() must be a plain document ID, but '${P}' contains a slash.`);const k=o.path.child(Z.fromString(P));if(!L.isDocumentKey(k))throw new N(x.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${l}() must result in a valid document path, but '${k}' is not because it contains an odd number of segments.`);const V=new L(k);I.push(Ar(c,V))}else{const k=nw(u,l,P);I.push(k)}}return new Gn(I,f)}(n._query,n.firestore._databaseId,s,e,t,r)}}function bg(n,e,t){if(typeof(t=Y(t))=="string"){if(t==="")throw new N(x.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!eh(e)&&t.indexOf("/")!==-1)throw new N(x.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(Z.fromString(t));if(!L.isDocumentKey(r))throw new N(x.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Ar(n,new L(r))}if(t instanceof ce)return Ar(n,t._key);throw new N(x.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${sc(t)}.`)}function Sg(n,e){if(!Array.isArray(n)||n.length===0)throw new N(x.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function uw(n,e){const t=function(s,i){for(const o of s)for(const c of o.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new N(x.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new N(x.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function lw(n,e){if(!(e instanceof Hs||e instanceof Gr))throw new N(x.INVALID_ARGUMENT,`Function ${n}() requires AppliableConstraints created with a call to 'where(...)', 'or(...)', or 'and(...)'.`)}function Rc(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}class Hh extends Kh{constructor(e){super(),this.firestore=e}convertBytes(e){return new rt(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new ce(this.firestore,null,t)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _x(n){return new Os("sum",rn("sum",n))}function yx(n){return new Os("avg",rn("average",n))}function hw(){return new Os("count")}function Ix(n,e){var t,r;return n instanceof Os&&e instanceof Os&&n.aggregateType===e.aggregateType&&((t=n._internalFieldPath)==null?void 0:t.canonicalString())===((r=e._internalFieldPath)==null?void 0:r.canonicalString())}function wx(n,e){return Mh(n.query,e.query)&&Pt(n.data(),e.data())}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ex(n){return dw(n,{count:hw()})}function dw(n,e){const t=ee(n.firestore,le),r=Ie(t),s=Q_(e,(i,o)=>new xy(o,i.aggregateType,i._internalFieldPath));return PC(r,n._query,s).then(i=>function(c,u,l){const d=new Zn(c);return new ow(u,d,l)}(t,n,i))}class Tx{constructor(e){this.kind="memory",this._onlineComponentProvider=$n.provider,this._offlineComponentProvider=e!=null&&e.garbageCollector?e.garbageCollector._offlineComponentProvider:{build:()=>new Nh(void 0)}}toJSON(){return{kind:this.kind}}}class Ax{constructor(e){let t;this.kind="persistent",e!=null&&e.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=fw(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}class vx{constructor(){this.kind="memoryEager",this._offlineComponentProvider=Ds.provider}toJSON(){return{kind:this.kind}}}class bx{constructor(e){this.kind="memoryLru",this._offlineComponentProvider={build:()=>new Nh(e)}}toJSON(){return{kind:this.kind}}}function Sx(){return new vx}function Rx(n){return new bx(n==null?void 0:n.cacheSizeBytes)}function Px(n){return new Tx(n)}function Cx(n){return new Ax(n)}class xx{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=$n.provider,this._offlineComponentProvider={build:t=>new Oh(t,e==null?void 0:e.cacheSizeBytes,this.forceOwnership)}}}class kx{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=$n.provider,this._offlineComponentProvider={build:t=>new MI(t,e==null?void 0:e.cacheSizeBytes)}}}function fw(n){return new xx(n==null?void 0:n.forceOwnership)}function Dx(){return new kx}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pw="NOT SUPPORTED";class Jt{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class ut extends to{constructor(e,t,r,s,i,o){super(e,t,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Fi(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(rn("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new N(x.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=ut._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}function Nx(n,e,t){if(Mr(e,ut._jsonSchema)){if(e.bundle===pw)throw new N(x.INVALID_ARGUMENT,"The provided JSON object was created in a client environment, which is not supported.");const r=Fr(n._databaseId),s=qI(e.bundle,r),i=s.Qu(),o=new Rh(s.getMetadata(),r);for(const d of i)o.Ga(d);const c=o.documents;if(c.length!==1)throw new N(x.INVALID_ARGUMENT,`Expected bundle data to contain 1 document, but it contains ${c.length} documents.`);const u=pc(r,c[0].document),l=new L(Z.fromString(e.bundleName));return new ut(n,new Hh(n),l,u,new Jt(!1,!1),t||null)}}ut._jsonSchemaVersion="firestore/documentSnapshot/1.0",ut._jsonSchema={type:Re("string",ut._jsonSchemaVersion),bundleSource:Re("string","DocumentSnapshot"),bundleName:Re("string"),bundle:Re("string")};class Fi extends ut{data(e={}){return super.data(e)}}class lt{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Jt(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new Fi(this._firestore,this._userDataWriter,r.key,r,new Jt(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new N(x.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map(c=>{const u=new Fi(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Jt(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}})}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(c=>i||c.type!==3).map(c=>{const u=new Fi(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Jt(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let l=-1,d=-1;return c.type!==0&&(l=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),d=o.indexOf(c.doc.key)),{type:Vx(c.type),doc:u,oldIndex:l,newIndex:d}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new N(x.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=lt._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=rc.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach(i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function Ox(n,e,t){if(Mr(e,lt._jsonSchema)){if(e.bundle===pw)throw new N(x.INVALID_ARGUMENT,"The provided JSON object was created in a client environment, which is not supported.");const r=Fr(n._databaseId),s=qI(e.bundle,r),i=s.Qu(),o=new Rh(s.getMetadata(),r);for(const g of i)o.Ga(g);if(o.queries.length!==1)throw new N(x.INVALID_ARGUMENT,`Snapshot data expected 1 query but found ${o.queries.length} queries.`);const c=mc(o.queries[0].bundledQuery),u=o.documents;let l=new yr;u.map(g=>{const I=pc(r,g.document);l=l.add(I)});const d=kr.fromInitialDocuments(c,l,J(),!1,!1),f=new Oe(n,t||null,c);return new lt(n,new Hh(n),f,d)}}function Vx(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return B(61501,{type:n})}}function Lx(n,e){return n instanceof ut&&e instanceof ut?n._firestore===e._firestore&&n._key.isEqual(e._key)&&(n._document===null?e._document===null:n._document.isEqual(e._document))&&n._converter===e._converter:n instanceof lt&&e instanceof lt&&n._firestore===e._firestore&&Mh(n.query,e.query)&&n.metadata.isEqual(e.metadata)&&n._snapshot.isEqual(e._snapshot)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */lt._jsonSchemaVersion="firestore/querySnapshot/1.0",lt._jsonSchema={type:Re("string",lt._jsonSchemaVersion),bundleSource:Re("string","QuerySnapshot"),bundleName:Re("string"),bundle:Re("string")};const Mx={maxAttempts:5};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gw{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=jr(e)}set(e,t,r){this._verifyNotCommitted();const s=Nn(e,this._firestore),i=Rc(s.converter,t,r),o=bc(this._dataReader,"WriteBatch.set",s._key,i,s.converter!==null,r);return this._mutations.push(o.toMutation(s._key,_e.none())),this}update(e,t,r,...s){this._verifyNotCommitted();const i=Nn(e,this._firestore);let o;return o=typeof(t=Y(t))=="string"||t instanceof Ur?qh(this._dataReader,"WriteBatch.update",i._key,t,r,s):Gh(this._dataReader,"WriteBatch.update",i._key,t),this._mutations.push(o.toMutation(i._key,_e.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=Nn(e,this._firestore);return this._mutations=this._mutations.concat(new Bs(t._key,_e.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new N(x.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Nn(n,e){if((n=Y(n)).firestore!==e)throw new N(x.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fx{constructor(e,t){this._firestore=e,this._transaction=t,this._dataReader=jr(e)}get(e){const t=Nn(e,this._firestore),r=new Hh(this._firestore);return this._transaction.lookup([t._key]).then(s=>{if(!s||s.length!==1)return B(24041);const i=s[0];if(i.isFoundDocument())return new to(this._firestore,r,i.key,i,t.converter);if(i.isNoDocument())return new to(this._firestore,r,t._key,null,t.converter);throw B(18433,{doc:i})})}set(e,t,r){const s=Nn(e,this._firestore),i=Rc(s.converter,t,r),o=bc(this._dataReader,"Transaction.set",s._key,i,s.converter!==null,r);return this._transaction.set(s._key,o),this}update(e,t,r,...s){const i=Nn(e,this._firestore);let o;return o=typeof(t=Y(t))=="string"||t instanceof Ur?qh(this._dataReader,"Transaction.update",i._key,t,r,s):Gh(this._dataReader,"Transaction.update",i._key,t),this._transaction.update(i._key,o),this}delete(e){const t=Nn(e,this._firestore);return this._transaction.delete(t._key),this}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mw extends Fx{constructor(e,t){super(e,t),this._firestore=e}get(e){const t=Nn(e,this._firestore),r=new Zn(this._firestore);return super.get(e).then(s=>new ut(this._firestore,r,t._key,s._document,new Jt(!1,!1),t.converter))}}function Ux(n,e,t){n=ee(n,le);const r={...Mx,...t};(function(o){if(o.maxAttempts<1)throw new N(x.INVALID_ARGUMENT,"Max attempts must be at least 1")})(r);const s=Ie(n);return kC(s,i=>e(new mw(n,i)),r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sn(n){n=ee(n,ce);const e=ee(n.firestore,le),t=Ie(e);return BI(t,n._key).then(r=>Jh(e,n,r))}function jx(n){n=ee(n,ce);const e=ee(n.firestore,le),t=Ie(e),r=new Zn(e);return SC(t,n._key).then(s=>new ut(e,r,n._key,s,new Jt(s!==null&&s.hasLocalMutations,!0),n.converter))}function Bx(n){n=ee(n,ce);const e=ee(n.firestore,le),t=Ie(e);return BI(t,n._key,{source:"server"}).then(r=>Jh(e,n,r))}function qa(n){n=ee(n,Oe);const e=ee(n.firestore,le),t=Ie(e),r=new Zn(e);return aw(n._query),GI(t,n._query).then(s=>new lt(e,r,n,s))}function Gx(n){n=ee(n,Oe);const e=ee(n.firestore,le),t=Ie(e),r=new Zn(e);return RC(t,n._query).then(s=>new lt(e,r,n,s))}function qx(n){n=ee(n,Oe);const e=ee(n.firestore,le),t=Ie(e),r=new Zn(e);return GI(t,n._query,{source:"server"}).then(s=>new lt(e,r,n,s))}function St(n,e,t){n=ee(n,ce);const r=ee(n.firestore,le),s=Rc(n.converter,e,t),i=jr(r);return Qs(r,[bc(i,"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,_e.none())])}function Rt(n,e,t,...r){n=ee(n,ce);const s=ee(n.firestore,le),i=jr(s);let o;return o=typeof(e=Y(e))=="string"||e instanceof Ur?qh(i,"updateDoc",n._key,e,t,r):Gh(i,"updateDoc",n._key,e),Qs(s,[o.toMutation(n._key,_e.exists(!0))])}function Pc(n){return Qs(ee(n.firestore,le),[new Bs(n._key,_e.none())])}function Qh(n,e){const t=ee(n.firestore,le),r=ye(n),s=Rc(n.converter,e),i=jr(n.firestore);return Qs(t,[bc(i,"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,_e.exists(!1))]).then(()=>r)}function on(n,...e){var l,d,f;n=Y(n);let t={includeMetadataChanges:!1,source:"default"},r=0;typeof e[r]!="object"||ls(e[r])||(t=e[r++]);const s={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(ls(e[r])){const g=e[r];e[r]=(l=g.next)==null?void 0:l.bind(g),e[r+1]=(d=g.error)==null?void 0:d.bind(g),e[r+2]=(f=g.complete)==null?void 0:f.bind(g)}let i,o,c;if(n instanceof ce)o=ee(n.firestore,le),c=Us(n._key.path),i={next:g=>{e[r]&&e[r](Jh(o,n,g))},error:e[r+1],complete:e[r+2]};else{const g=ee(n,Oe);o=ee(g.firestore,le),c=g._query;const I=new Zn(o);i={next:b=>{e[r]&&e[r](new lt(o,I,g,b))},error:e[r+1],complete:e[r+2]},aw(n._query)}const u=Ie(o);return bC(u,c,s,i)}function $x(n,e,...t){const r=Y(n),s=function(u){const l={bundle:"",bundleName:"",bundleSource:""},d=["bundle","bundleName","bundleSource"];for(const f of d){if(!(f in u)){l.error=`snapshotJson missing required field: ${f}`;break}const g=u[f];if(typeof g!="string"){l.error=`snapshotJson field '${f}' must be a string.`;break}if(g.length===0){l.error=`snapshotJson field '${f}' cannot be an empty string.`;break}f==="bundle"?l.bundle=g:f==="bundleName"?l.bundleName=g:f==="bundleSource"&&(l.bundleSource=g)}return l}(e);if(s.error)throw new N(x.INVALID_ARGUMENT,s.error);let i,o=0;if(typeof t[o]!="object"||ls(t[o])||(i=t[o++]),s.bundleSource==="QuerySnapshot"){let c=null;if(typeof t[o]=="object"&&ls(t[o])){const u=t[o++];c={next:u.next,error:u.error,complete:u.complete}}else c={next:t[o++],error:t[o++],complete:t[o++]};return function(l,d,f,g,I){let b,P=!1;return ml(l,d.bundle).then(()=>XI(l,d.bundleName)).then(V=>{V&&!P&&(I&&V.withConverter(I),b=on(V,f||{},g))}).catch(V=>(g.error&&g.error(V),()=>{})),()=>{P||(P=!0,b&&b())}}(r,s,i,c,t[o])}if(s.bundleSource==="DocumentSnapshot"){let c=null;if(typeof t[o]=="object"&&ls(t[o])){const u=t[o++];c={next:u.next,error:u.error,complete:u.complete}}else c={next:t[o++],error:t[o++],complete:t[o++]};return function(l,d,f,g,I){let b,P=!1;return ml(l,d.bundle).then(()=>{if(!P){const V=new ce(l,I||null,L.fromPath(d.bundleName));b=on(V,f||{},g)}}).catch(V=>(g.error&&g.error(V),()=>{})),()=>{P||(P=!0,b&&b())}}(r,s,i,c,t[o])}throw new N(x.INVALID_ARGUMENT,`unsupported bundle source: ${s.bundleSource}`)}function zx(n,e){n=ee(n,le);const t=Ie(n),r=ls(e)?e:{next:e};return xC(t,r)}function Qs(n,e){const t=Ie(n);return CC(t,e)}function Jh(n,e,t){const r=t.docs.get(e._key),s=new Zn(n);return new ut(n,s,e._key,r,new Jt(t.hasPendingWrites,t.fromCache),e.converter)}function Kx(n){return n=ee(n,le),Ie(n),new gw(n,e=>Qs(n,e))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wx(n,e){n=ee(n,le);const t=Ie(n);if(!t._uninitializedComponentsProvider||t._uninitializedComponentsProvider._offline.kind==="memory")return dt("Cannot enable indexes when persistence is disabled"),Promise.resolve();const r=function(i){const o=typeof i=="string"?function(l){try{return JSON.parse(l)}catch(d){throw new N(x.INVALID_ARGUMENT,"Failed to parse JSON: "+(d==null?void 0:d.message))}}(i):i,c=[];if(Array.isArray(o.indexes))for(const u of o.indexes){const l=Rg(u,"collectionGroup"),d=[];if(Array.isArray(u.fields))for(const f of u.fields){const g=Rg(f,"fieldPath"),I=zh("setIndexConfiguration",g);f.arrayConfig==="CONTAINS"?d.push(new mr(I,2)):f.order==="ASCENDING"?d.push(new mr(I,0)):f.order==="DESCENDING"&&d.push(new mr(I,1))}c.push(new ms(ms.UNKNOWN_ID,l,d,_s.empty()))}return c}(e);return OC(t,r)}function Rg(n,e){if(typeof n[e]!="string")throw new N(x.INVALID_ARGUMENT,"Missing string value for: "+e);return n[e]}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _w{constructor(e){this._firestore=e,this.type="PersistentCacheIndexManager"}}function Hx(n){var s;n=ee(n,le);const e=Pg.get(n);if(e)return e;if(((s=Ie(n)._uninitializedComponentsProvider)==null?void 0:s._offline.kind)!=="persistent")return null;const r=new _w(n);return Pg.set(n,r),r}function Qx(n){yw(n,!0)}function Jx(n){yw(n,!1)}function Yx(n){const e=Ie(n._firestore);LC(e).then(t=>O("deleting all persistent cache indexes succeeded")).catch(t=>dt("deleting all persistent cache indexes failed",t))}function yw(n,e){const t=Ie(n._firestore);VC(t,e).then(r=>O(`setting persistent cache index auto creation isEnabled=${e} succeeded`)).catch(r=>dt(`setting persistent cache index auto creation isEnabled=${e} failed`,r))}const Pg=new WeakMap;/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xx{constructor(){throw new Error("instances of this class should not be created")}static onExistenceFilterMismatch(e){return Yh.instance.onExistenceFilterMismatch(e)}}class Yh{constructor(){this.t=new Map}static get instance(){return Zo||(Zo=new Yh,R0(Zo)),Zo}o(e){this.t.forEach(t=>t(e))}onExistenceFilterMismatch(e){const t=Symbol(),r=this.t;return r.set(t,e),()=>r.delete(t)}}let Zo=null;(function(e,t=!0){oR(Lr),ht(new nt("firestore",(r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),c=new le(new lR(r.getProvider("auth-internal")),new fR(o,r.getProvider("app-check-internal")),e0(o,s),o);return i={useFetchStreams:t,...i},c._setSettings(i),c},"PUBLIC").setMultipleInstances(!0)),$e(Ag,vg,e),$e(Ag,vg,"esm2020")})();const Xh=Object.freeze(Object.defineProperty({__proto__:null,AbstractUserDataWriter:Kh,AggregateField:Os,AggregateQuerySnapshot:ow,Bytes:rt,CACHE_SIZE_UNLIMITED:BC,CollectionReference:vt,DocumentReference:ce,DocumentSnapshot:ut,FieldPath:Ur,FieldValue:Xn,Firestore:le,FirestoreError:N,GeoPoint:bt,LoadBundleTask:WI,PersistentCacheIndexManager:_w,Query:Oe,QueryCompositeFilterConstraint:Gr,QueryConstraint:Ws,QueryDocumentSnapshot:Fi,QueryEndAtConstraint:So,QueryFieldFilterConstraint:Hs,QueryLimitConstraint:vo,QueryOrderByConstraint:Sc,QuerySnapshot:lt,QueryStartAtConstraint:bo,SnapshotMetadata:Jt,Timestamp:oe,Transaction:mw,VectorValue:mt,WriteBatch:gw,_AutoId:rc,_ByteString:we,_DatabaseId:Un,_DocumentKey:L,_EmptyAppCheckTokenProvider:pR,_EmptyAuthCredentialsProvider:P_,_FieldPath:ge,_TestingHooks:Xx,_cast:ee,_debugAssert:cR,_internalAggregationQueryToProtoRunAggregationQueryRequest:ox,_internalQueryToProtoQueryTarget:ix,_isBase64Available:YR,_logWarn:dt,_validateIsNotUsedTogether:x_,addDoc:Qh,aggregateFieldEqual:Ix,aggregateQuerySnapshotEqual:wx,and:lx,arrayRemove:nx,arrayUnion:tx,average:yx,clearIndexedDbPersistence:$C,collection:yt,collectionGroup:UC,connectFirestoreEmulator:KI,count:hw,deleteAllPersistentCacheIndexes:Yx,deleteDoc:Pc,deleteField:ex,disableNetwork:WC,disablePersistentCacheIndexAutoCreation:Jx,doc:ye,documentId:QC,documentSnapshotFromJSON:Nx,enableIndexedDbPersistence:qC,enableMultiTabIndexedDbPersistence:JI,enableNetwork:KC,enablePersistentCacheIndexAutoCreation:Qx,endAt:mx,endBefore:gx,ensureFirestoreConfigured:Ie,executeWrite:Qs,getAggregateFromServer:dw,getCountFromServer:Ex,getDoc:sn,getDocFromCache:jx,getDocFromServer:Bx,getDocs:qa,getDocsFromCache:Gx,getDocsFromServer:qx,getFirestore:HI,getPersistentCacheIndexManager:Hx,increment:rx,initializeFirestore:GC,limit:hx,limitToLast:dx,loadBundle:ml,memoryEagerGarbageCollector:Sx,memoryLocalCache:Px,memoryLruGarbageCollector:Rx,namedQuery:XI,onSnapshot:on,onSnapshotResume:$x,onSnapshotsInSync:zx,or:ux,orderBy:qr,persistentLocalCache:Cx,persistentMultipleTabManager:Dx,persistentSingleTabManager:fw,query:er,queryEqual:Mh,querySnapshotFromJSON:Ox,refEqual:jC,runTransaction:Ux,serverTimestamp:Mn,setDoc:St,setIndexConfiguration:Wx,setLogLevel:aR,snapshotEqual:Lx,startAfter:px,startAt:fx,sum:_x,terminate:HC,updateDoc:Rt,vector:sx,waitForPendingWrites:zC,where:cx,writeBatch:Kx},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Iw="firebasestorage.googleapis.com",ww="storageBucket",Zx=2*60*1e3,ek=10*60*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ae extends wt{constructor(e,t,r=0){super(Tu(e),`Firebase Storage: ${t} (${Tu(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,Ae.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return Tu(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var Te;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(Te||(Te={}));function Tu(n){return"storage/"+n}function Zh(){const n="An unknown error occurred, please check the error payload for server response.";return new Ae(Te.UNKNOWN,n)}function tk(n){return new Ae(Te.OBJECT_NOT_FOUND,"Object '"+n+"' does not exist.")}function nk(n){return new Ae(Te.QUOTA_EXCEEDED,"Quota for bucket '"+n+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function rk(){const n="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new Ae(Te.UNAUTHENTICATED,n)}function sk(){return new Ae(Te.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function ik(n){return new Ae(Te.UNAUTHORIZED,"User does not have permission to access '"+n+"'.")}function ok(){return new Ae(Te.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function ak(){return new Ae(Te.CANCELED,"User canceled the upload/download.")}function ck(n){return new Ae(Te.INVALID_URL,"Invalid URL '"+n+"'.")}function uk(n){return new Ae(Te.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function lk(){return new Ae(Te.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+ww+"' property when initializing the app?")}function hk(){return new Ae(Te.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function dk(){return new Ae(Te.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function fk(n){return new Ae(Te.UNSUPPORTED_ENVIRONMENT,`${n} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function _l(n){return new Ae(Te.INVALID_ARGUMENT,n)}function Ew(){return new Ae(Te.APP_DELETED,"The Firebase app was deleted.")}function pk(n){return new Ae(Te.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function Ui(n,e){return new Ae(Te.INVALID_FORMAT,"String does not match format '"+n+"': "+e)}function Ei(n){throw new Ae(Te.INTERNAL_ERROR,"Internal error: "+n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let r;try{r=gt.makeFromUrl(e,t)}catch{return new gt(e,"")}if(r.path==="")return r;throw uk(e)}static makeFromUrl(e,t){let r=null;const s="([A-Za-z0-9.\\-_]+)";function i(z){z.path.charAt(z.path.length-1)==="/"&&(z.path_=z.path_.slice(0,-1))}const o="(/(.*))?$",c=new RegExp("^gs://"+s+o,"i"),u={bucket:1,path:3};function l(z){z.path_=decodeURIComponent(z.path)}const d="v[A-Za-z0-9_]+",f=t.replace(/[.]/g,"\\."),g="(/([^?#]*).*)?$",I=new RegExp(`^https?://${f}/${d}/b/${s}/o${g}`,"i"),b={bucket:1,path:3},P=t===Iw?"(?:storage.googleapis.com|storage.cloud.google.com)":t,k="([^?#]*)",V=new RegExp(`^https?://${P}/${s}/${k}`,"i"),U=[{regex:c,indices:u,postModify:i},{regex:I,indices:b,postModify:l},{regex:V,indices:{bucket:1,path:2},postModify:l}];for(let z=0;z<U.length;z++){const K=U[z],Q=K.regex.exec(e);if(Q){const T=Q[K.indices.bucket];let y=Q[K.indices.path];y||(y=""),r=new gt(T,y),K.postModify(r);break}}if(r==null)throw ck(e);return r}}class gk{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mk(n,e,t){let r=1,s=null,i=null,o=!1,c=0;function u(){return c===2}let l=!1;function d(...k){l||(l=!0,e.apply(null,k))}function f(k){s=setTimeout(()=>{s=null,n(I,u())},k)}function g(){i&&clearTimeout(i)}function I(k,...V){if(l){g();return}if(k){g(),d.call(null,k,...V);return}if(u()||o){g(),d.call(null,k,...V);return}r<64&&(r*=2);let U;c===1?(c=2,U=0):U=(r+Math.random())*1e3,f(U)}let b=!1;function P(k){b||(b=!0,g(),!l&&(s!==null?(k||(c=2),clearTimeout(s),f(0)):k||(c=1)))}return f(0),i=setTimeout(()=>{o=!0,P(!0)},t),P}function _k(n){n(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yk(n){return n!==void 0}function Ik(n){return typeof n=="object"&&!Array.isArray(n)}function ed(n){return typeof n=="string"||n instanceof String}function Cg(n){return td()&&n instanceof Blob}function td(){return typeof Blob<"u"}function xg(n,e,t,r){if(r<e)throw _l(`Invalid value for '${n}'. Expected ${e} or greater.`);if(r>t)throw _l(`Invalid value for '${n}'. Expected ${t} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cc(n,e,t){let r=e;return t==null&&(r=`https://${e}`),`${t}://${r}/v0${n}`}function Tw(n){const e=encodeURIComponent;let t="?";for(const r in n)if(n.hasOwnProperty(r)){const s=e(r)+"="+e(n[r]);t=t+s+"&"}return t=t.slice(0,-1),t}var Ir;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(Ir||(Ir={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wk(n,e){const t=n>=500&&n<600,s=[408,429].indexOf(n)!==-1,i=e.indexOf(n)!==-1;return t||s||i}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ek{constructor(e,t,r,s,i,o,c,u,l,d,f,g=!0,I=!1){this.url_=e,this.method_=t,this.headers_=r,this.body_=s,this.successCodes_=i,this.additionalRetryCodes_=o,this.callback_=c,this.errorCallback_=u,this.timeout_=l,this.progressCallback_=d,this.connectionFactory_=f,this.retry=g,this.isUsingEmulator=I,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((b,P)=>{this.resolve_=b,this.reject_=P,this.start_()})}start_(){const e=(r,s)=>{if(s){r(!1,new ea(!1,null,!0));return}const i=this.connectionFactory_();this.pendingConnection_=i;const o=c=>{const u=c.loaded,l=c.lengthComputable?c.total:-1;this.progressCallback_!==null&&this.progressCallback_(u,l)};this.progressCallback_!==null&&i.addUploadProgressListener(o),i.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&i.removeUploadProgressListener(o),this.pendingConnection_=null;const c=i.getErrorCode()===Ir.NO_ERROR,u=i.getStatus();if(!c||wk(u,this.additionalRetryCodes_)&&this.retry){const d=i.getErrorCode()===Ir.ABORT;r(!1,new ea(!1,null,d));return}const l=this.successCodes_.indexOf(u)!==-1;r(!0,new ea(l,i))})},t=(r,s)=>{const i=this.resolve_,o=this.reject_,c=s.connection;if(s.wasSuccessCode)try{const u=this.callback_(c,c.getResponse());yk(u)?i(u):i()}catch(u){o(u)}else if(c!==null){const u=Zh();u.serverResponse=c.getErrorText(),this.errorCallback_?o(this.errorCallback_(c,u)):o(u)}else if(s.canceled){const u=this.appDelete_?Ew():ak();o(u)}else{const u=ok();o(u)}};this.canceled_?t(!1,new ea(!1,null,!0)):this.backoffId_=mk(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&_k(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class ea{constructor(e,t,r){this.wasSuccessCode=e,this.connection=t,this.canceled=!!r}}function Tk(n,e){e!==null&&e.length>0&&(n.Authorization="Firebase "+e)}function Ak(n,e){n["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function vk(n,e){e&&(n["X-Firebase-GMPID"]=e)}function bk(n,e){e!==null&&(n["X-Firebase-AppCheck"]=e)}function Sk(n,e,t,r,s,i,o=!0,c=!1){const u=Tw(n.urlParams),l=n.url+u,d=Object.assign({},n.headers);return vk(d,e),Tk(d,t),Ak(d,i),bk(d,r),new Ek(l,n.method,d,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,s,o,c)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rk(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function Pk(...n){const e=Rk();if(e!==void 0){const t=new e;for(let r=0;r<n.length;r++)t.append(n[r]);return t.getBlob()}else{if(td())return new Blob(n);throw new Ae(Te.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function Ck(n,e,t){return n.webkitSlice?n.webkitSlice(e,t):n.mozSlice?n.mozSlice(e,t):n.slice?n.slice(e,t):null}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xk(n){if(typeof atob>"u")throw fk("base-64");return atob(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mt={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class Au{constructor(e,t){this.data=e,this.contentType=t||null}}function kk(n,e){switch(n){case Mt.RAW:return new Au(Aw(e));case Mt.BASE64:case Mt.BASE64URL:return new Au(vw(n,e));case Mt.DATA_URL:return new Au(Nk(e),Ok(e))}throw Zh()}function Aw(n){const e=[];for(let t=0;t<n.length;t++){let r=n.charCodeAt(t);if(r<=127)e.push(r);else if(r<=2047)e.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(t<n.length-1&&(n.charCodeAt(t+1)&64512)===56320))e.push(239,191,189);else{const i=r,o=n.charCodeAt(++t);r=65536|(i&1023)<<10|o&1023,e.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?e.push(239,191,189):e.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(e)}function Dk(n){let e;try{e=decodeURIComponent(n)}catch{throw Ui(Mt.DATA_URL,"Malformed data URL.")}return Aw(e)}function vw(n,e){switch(n){case Mt.BASE64:{const s=e.indexOf("-")!==-1,i=e.indexOf("_")!==-1;if(s||i)throw Ui(n,"Invalid character '"+(s?"-":"_")+"' found: is it base64url encoded?");break}case Mt.BASE64URL:{const s=e.indexOf("+")!==-1,i=e.indexOf("/")!==-1;if(s||i)throw Ui(n,"Invalid character '"+(s?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let t;try{t=xk(e)}catch(s){throw s.message.includes("polyfill")?s:Ui(n,"Invalid character found")}const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}class bw{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(t===null)throw Ui(Mt.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=t[1]||null;r!=null&&(this.base64=Vk(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=e.substring(e.indexOf(",")+1)}}function Nk(n){const e=new bw(n);return e.base64?vw(Mt.BASE64,e.rest):Dk(e.rest)}function Ok(n){return new bw(n).contentType}function Vk(n,e){return n.length>=e.length?n.substring(n.length-e.length)===e:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xn{constructor(e,t){let r=0,s="";Cg(e)?(this.data_=e,r=e.size,s=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=s}size(){return this.size_}type(){return this.type_}slice(e,t){if(Cg(this.data_)){const r=this.data_,s=Ck(r,e,t);return s===null?null:new xn(s)}else{const r=new Uint8Array(this.data_.buffer,e,t-e);return new xn(r,!0)}}static getBlob(...e){if(td()){const t=e.map(r=>r instanceof xn?r.data_:r);return new xn(Pk.apply(null,t))}else{const t=e.map(o=>ed(o)?kk(Mt.RAW,o).data:o.data_);let r=0;t.forEach(o=>{r+=o.byteLength});const s=new Uint8Array(r);let i=0;return t.forEach(o=>{for(let c=0;c<o.length;c++)s[i++]=o[c]}),new xn(s,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sw(n){let e;try{e=JSON.parse(n)}catch{return null}return Ik(e)?e:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lk(n){if(n.length===0)return null;const e=n.lastIndexOf("/");return e===-1?"":n.slice(0,e)}function Mk(n,e){const t=e.split("/").filter(r=>r.length>0).join("/");return n.length===0?t:n+"/"+t}function Rw(n){const e=n.lastIndexOf("/",n.length-2);return e===-1?n:n.slice(e+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fk(n,e){return e}class Xe{constructor(e,t,r,s){this.server=e,this.local=t||e,this.writable=!!r,this.xform=s||Fk}}let ta=null;function Uk(n){return!ed(n)||n.length<2?n:Rw(n)}function Pw(){if(ta)return ta;const n=[];n.push(new Xe("bucket")),n.push(new Xe("generation")),n.push(new Xe("metageneration")),n.push(new Xe("name","fullPath",!0));function e(i,o){return Uk(o)}const t=new Xe("name");t.xform=e,n.push(t);function r(i,o){return o!==void 0?Number(o):o}const s=new Xe("size");return s.xform=r,n.push(s),n.push(new Xe("timeCreated")),n.push(new Xe("updated")),n.push(new Xe("md5Hash",null,!0)),n.push(new Xe("cacheControl",null,!0)),n.push(new Xe("contentDisposition",null,!0)),n.push(new Xe("contentEncoding",null,!0)),n.push(new Xe("contentLanguage",null,!0)),n.push(new Xe("contentType",null,!0)),n.push(new Xe("metadata","customMetadata",!0)),ta=n,ta}function jk(n,e){function t(){const r=n.bucket,s=n.fullPath,i=new gt(r,s);return e._makeStorageReference(i)}Object.defineProperty(n,"ref",{get:t})}function Bk(n,e,t){const r={};r.type="file";const s=t.length;for(let i=0;i<s;i++){const o=t[i];r[o.local]=o.xform(r,e[o.server])}return jk(r,n),r}function Cw(n,e,t){const r=Sw(e);return r===null?null:Bk(n,r,t)}function Gk(n,e,t,r){const s=Sw(e);if(s===null||!ed(s.downloadTokens))return null;const i=s.downloadTokens;if(i.length===0)return null;const o=encodeURIComponent;return i.split(",").map(l=>{const d=n.bucket,f=n.fullPath,g="/b/"+o(d)+"/o/"+o(f),I=Cc(g,t,r),b=Tw({alt:"media",token:l});return I+b})[0]}function qk(n,e){const t={},r=e.length;for(let s=0;s<r;s++){const i=e[s];i.writable&&(t[i.server]=n[i.local])}return JSON.stringify(t)}class nd{constructor(e,t,r,s){this.url=e,this.method=t,this.handler=r,this.timeout=s,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xw(n){if(!n)throw Zh()}function $k(n,e){function t(r,s){const i=Cw(n,s,e);return xw(i!==null),i}return t}function zk(n,e){function t(r,s){const i=Cw(n,s,e);return xw(i!==null),Gk(i,s,n.host,n._protocol)}return t}function kw(n){function e(t,r){let s;return t.getStatus()===401?t.getErrorText().includes("Firebase App Check token is invalid")?s=sk():s=rk():t.getStatus()===402?s=nk(n.bucket):t.getStatus()===403?s=ik(n.path):s=r,s.status=t.getStatus(),s.serverResponse=r.serverResponse,s}return e}function Dw(n){const e=kw(n);function t(r,s){let i=e(r,s);return r.getStatus()===404&&(i=tk(n.path)),i.serverResponse=s.serverResponse,i}return t}function Kk(n,e,t){const r=e.fullServerUrl(),s=Cc(r,n.host,n._protocol),i="GET",o=n.maxOperationRetryTime,c=new nd(s,i,zk(n,t),o);return c.errorHandler=Dw(e),c}function Wk(n,e){const t=e.fullServerUrl(),r=Cc(t,n.host,n._protocol),s="DELETE",i=n.maxOperationRetryTime;function o(u,l){}const c=new nd(r,s,o,i);return c.successCodes=[200,204],c.errorHandler=Dw(e),c}function Hk(n,e){return n&&n.contentType||e&&e.type()||"application/octet-stream"}function Qk(n,e,t){const r=Object.assign({},t);return r.fullPath=n.path,r.size=e.size(),r.contentType||(r.contentType=Hk(null,e)),r}function Jk(n,e,t,r,s){const i=e.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function c(){let U="";for(let z=0;z<2;z++)U=U+Math.random().toString().slice(2);return U}const u=c();o["Content-Type"]="multipart/related; boundary="+u;const l=Qk(e,r,s),d=qk(l,t),f="--"+u+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+d+`\r
--`+u+`\r
Content-Type: `+l.contentType+`\r
\r
`,g=`\r
--`+u+"--",I=xn.getBlob(f,r,g);if(I===null)throw hk();const b={name:l.fullPath},P=Cc(i,n.host,n._protocol),k="POST",V=n.maxUploadRetryTime,j=new nd(P,k,$k(n,t),V);return j.urlParams=b,j.headers=o,j.body=I.uploadData(),j.errorHandler=kw(e),j}class Yk{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=Ir.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=Ir.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=Ir.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,r,s,i){if(this.sent_)throw Ei("cannot .send() more than once");if($t(e)&&r&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(t,e,!0),i!==void 0)for(const o in i)i.hasOwnProperty(o)&&this.xhr_.setRequestHeader(o,i[o].toString());return s!==void 0?this.xhr_.send(s):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw Ei("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw Ei("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw Ei("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw Ei("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class Xk extends Yk{initXhr(){this.xhr_.responseType="text"}}function rd(){return new Xk}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dr{constructor(e,t){this._service=e,t instanceof gt?this._location=t:this._location=gt.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new Dr(e,t)}get root(){const e=new gt(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return Rw(this._location.path)}get storage(){return this._service}get parent(){const e=Lk(this._location.path);if(e===null)return null;const t=new gt(this._location.bucket,e);return new Dr(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw pk(e)}}function Zk(n,e,t){n._throwIfRoot("uploadBytes");const r=Jk(n.storage,n._location,Pw(),new xn(e,!0),t);return n.storage.makeRequestWithTokens(r,rd).then(s=>({metadata:s,ref:n}))}function eD(n){n._throwIfRoot("getDownloadURL");const e=Kk(n.storage,n._location,Pw());return n.storage.makeRequestWithTokens(e,rd).then(t=>{if(t===null)throw dk();return t})}function tD(n){n._throwIfRoot("deleteObject");const e=Wk(n.storage,n._location);return n.storage.makeRequestWithTokens(e,rd)}function nD(n,e){const t=Mk(n._location.path,e),r=new gt(n._location.bucket,t);return new Dr(n.storage,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rD(n){return/^[A-Za-z]+:\/\//.test(n)}function sD(n,e){return new Dr(n,e)}function Nw(n,e){if(n instanceof sd){const t=n;if(t._bucket==null)throw lk();const r=new Dr(t,t._bucket);return e!=null?Nw(r,e):r}else return e!==void 0?nD(n,e):n}function iD(n,e){if(e&&rD(e)){if(n instanceof sd)return sD(n,e);throw _l("To use ref(service, url), the first argument must be a Storage instance.")}else return Nw(n,e)}function kg(n,e){const t=e==null?void 0:e[ww];return t==null?null:gt.makeFromBucketSpec(t,n)}function oD(n,e,t,r={}){n.host=`${e}:${t}`;const s=$t(e);s&&ao(`https://${n.host}/b`),n._isUsingEmulator=!0,n._protocol=s?"https":"http";const{mockUserToken:i}=r;i&&(n._overrideAuthToken=typeof i=="string"?i:gm(i,n.app.options.projectId))}class sd{constructor(e,t,r,s,i,o=!1){this.app=e,this._authProvider=t,this._appCheckProvider=r,this._url=s,this._firebaseVersion=i,this._isUsingEmulator=o,this._bucket=null,this._host=Iw,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=Zx,this._maxUploadRetryTime=ek,this._requests=new Set,s!=null?this._bucket=gt.makeFromBucketSpec(s,this._host):this._bucket=kg(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=gt.makeFromBucketSpec(this._url,e):this._bucket=kg(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){xg("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){xg("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){if(et(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new Dr(this,e)}_makeRequest(e,t,r,s,i=!0){if(this._deleted)return new gk(Ew());{const o=Sk(e,this._appId,r,s,t,this._firebaseVersion,i,this._isUsingEmulator);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,t){const[r,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,r,s).getPromise()}}const Dg="@firebase/storage",Ng="0.14.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ow="storage";function x1(n,e,t){return n=Y(n),Zk(n,e,t)}function k1(n){return n=Y(n),eD(n)}function Vw(n){return n=Y(n),tD(n)}function Lw(n,e){return n=Y(n),iD(n,e)}function aD(n=Ls(),e){n=Y(n);const r=Et(n,Ow).getImmediate({identifier:e}),s=Pl("storage");return s&&cD(r,...s),r}function cD(n,e,t,r={}){oD(n,e,t,r)}function uD(n,{instanceIdentifier:e}){const t=n.getProvider("app").getImmediate(),r=n.getProvider("auth-internal"),s=n.getProvider("app-check-internal");return new sd(t,r,s,e,Lr)}function lD(){ht(new nt(Ow,uD,"PUBLIC").setMultipleInstances(!0)),$e(Dg,Ng,""),$e(Dg,Ng,"esm2020")}lD();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hD="type.googleapis.com/google.protobuf.Int64Value",dD="type.googleapis.com/google.protobuf.UInt64Value";function Mw(n,e){const t={};for(const r in n)n.hasOwnProperty(r)&&(t[r]=e(n[r]));return t}function $a(n){if(n==null)return null;if(n instanceof Number&&(n=n.valueOf()),typeof n=="number"&&isFinite(n)||n===!0||n===!1||Object.prototype.toString.call(n)==="[object String]")return n;if(n instanceof Date)return n.toISOString();if(Array.isArray(n))return n.map(e=>$a(e));if(typeof n=="function"||typeof n=="object")return Mw(n,e=>$a(e));throw new Error("Data cannot be encoded in JSON: "+n)}function Vs(n){if(n==null)return n;if(n["@type"])switch(n["@type"]){case hD:case dD:{const e=Number(n.value);if(isNaN(e))throw new Error("Data cannot be decoded from JSON: "+n);return e}default:throw new Error("Data cannot be decoded from JSON: "+n)}return Array.isArray(n)?n.map(e=>Vs(e)):typeof n=="function"||typeof n=="object"?Mw(n,e=>Vs(e)):n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const id="functions";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Og={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class ct extends wt{constructor(e,t,r){super(`${id}/${e}`,t||""),this.details=r,Object.setPrototypeOf(this,ct.prototype)}}function fD(n){if(n>=200&&n<300)return"ok";switch(n){case 0:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 500:return"internal";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}function za(n,e){let t=fD(n),r=t,s;try{const i=e&&e.error;if(i){const o=i.status;if(typeof o=="string"){if(!Og[o])return new ct("internal","internal");t=Og[o],r=o}const c=i.message;typeof c=="string"&&(r=c),s=i.details,s!==void 0&&(s=Vs(s))}}catch{}return t==="ok"?null:new ct(t,r,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pD{constructor(e,t,r,s){this.app=e,this.auth=null,this.messaging=null,this.appCheck=null,this.serverAppAppCheckToken=null,et(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.auth=t.getImmediate({optional:!0}),this.messaging=r.getImmediate({optional:!0}),this.auth||t.get().then(i=>this.auth=i,()=>{}),this.messaging||r.get().then(i=>this.messaging=i,()=>{}),this.appCheck||s==null||s.get().then(i=>this.appCheck=i,()=>{})}async getAuthToken(){if(this.auth)try{const e=await this.auth.getToken();return e==null?void 0:e.accessToken}catch{return}}async getMessagingToken(){if(!(!this.messaging||!("Notification"in self)||Notification.permission!=="granted"))try{return await this.messaging.getToken()}catch{return}}async getAppCheckToken(e){if(this.serverAppAppCheckToken)return this.serverAppAppCheckToken;if(this.appCheck){const t=e?await this.appCheck.getLimitedUseToken():await this.appCheck.getToken();return t.error?null:t.token}return null}async getContext(e){const t=await this.getAuthToken(),r=await this.getMessagingToken(),s=await this.getAppCheckToken(e);return{authToken:t,messagingToken:r,appCheckToken:s}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yl="us-central1",gD=/^data: (.*?)(?:\n|$)/;function mD(n){let e=null;return{promise:new Promise((t,r)=>{e=setTimeout(()=>{r(new ct("deadline-exceeded","deadline-exceeded"))},n)}),cancel:()=>{e&&clearTimeout(e)}}}class _D{constructor(e,t,r,s,i=yl,o=(...c)=>fetch(...c)){this.app=e,this.fetchImpl=o,this.emulatorOrigin=null,this.contextProvider=new pD(e,t,r,s),this.cancelAllRequests=new Promise(c=>{this.deleteService=()=>Promise.resolve(c())});try{const c=new URL(i);this.customDomain=c.origin+(c.pathname==="/"?"":c.pathname),this.region=yl}catch{this.customDomain=null,this.region=i}}_delete(){return this.deleteService()}_url(e){const t=this.app.options.projectId;return this.emulatorOrigin!==null?`${this.emulatorOrigin}/${t}/${this.region}/${e}`:this.customDomain!==null?`${this.customDomain}/${e}`:`https://${this.region}-${t}.cloudfunctions.net/${e}`}}function yD(n,e,t){const r=$t(e);n.emulatorOrigin=`http${r?"s":""}://${e}:${t}`,r&&ao(n.emulatorOrigin+"/backends")}function ID(n,e,t){const r=s=>ED(n,e,s,{});return r.stream=(s,i)=>AD(n,e,s,i),r}function Fw(n){return n.emulatorOrigin&&$t(n.emulatorOrigin)?"include":void 0}async function wD(n,e,t,r,s){t["Content-Type"]="application/json";let i;try{i=await r(n,{method:"POST",body:JSON.stringify(e),headers:t,credentials:Fw(s)})}catch{return{status:0,json:null}}let o=null;try{o=await i.json()}catch{}return{status:i.status,json:o}}async function Uw(n,e){const t={},r=await n.contextProvider.getContext(e.limitedUseAppCheckTokens);return r.authToken&&(t.Authorization="Bearer "+r.authToken),r.messagingToken&&(t["Firebase-Instance-ID-Token"]=r.messagingToken),r.appCheckToken!==null&&(t["X-Firebase-AppCheck"]=r.appCheckToken),t}function ED(n,e,t,r){const s=n._url(e);return TD(n,s,t,r)}async function TD(n,e,t,r){t=$a(t);const s={data:t},i=await Uw(n,r),o=r.timeout||7e4,c=mD(o),u=await Promise.race([wD(e,s,i,n.fetchImpl,n),c.promise,n.cancelAllRequests]);if(c.cancel(),!u)throw new ct("cancelled","Firebase Functions instance was deleted.");const l=za(u.status,u.json);if(l)throw l;if(!u.json)throw new ct("internal","Response is not valid JSON object.");let d=u.json.data;if(typeof d>"u"&&(d=u.json.result),typeof d>"u")throw new ct("internal","Response is missing data field.");return{data:Vs(d)}}function AD(n,e,t,r){const s=n._url(e);return vD(n,s,t,r||{})}async function vD(n,e,t,r){var g;t=$a(t);const s={data:t},i=await Uw(n,r);i["Content-Type"]="application/json",i.Accept="text/event-stream";let o;try{o=await n.fetchImpl(e,{method:"POST",body:JSON.stringify(s),headers:i,signal:r==null?void 0:r.signal,credentials:Fw(n)})}catch(I){if(I instanceof Error&&I.name==="AbortError"){const P=new ct("cancelled","Request was cancelled.");return{data:Promise.reject(P),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(P)}}}}}}const b=za(0,null);return{data:Promise.reject(b),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(b)}}}}}}let c,u;const l=new Promise((I,b)=>{c=I,u=b});(g=r==null?void 0:r.signal)==null||g.addEventListener("abort",()=>{const I=new ct("cancelled","Request was cancelled.");u(I)});const d=o.body.getReader(),f=bD(d,c,u,r==null?void 0:r.signal);return{stream:{[Symbol.asyncIterator](){const I=f.getReader();return{async next(){const{value:b,done:P}=await I.read();return{value:b,done:P}},async return(){return await I.cancel(),{done:!0,value:void 0}}}}},data:l}}function bD(n,e,t,r){const s=(o,c)=>{const u=o.match(gD);if(!u)return;const l=u[1];try{const d=JSON.parse(l);if("result"in d){e(Vs(d.result));return}if("message"in d){c.enqueue(Vs(d.message));return}if("error"in d){const f=za(0,d);c.error(f),t(f);return}}catch(d){if(d instanceof ct){c.error(d),t(d);return}}},i=new TextDecoder;return new ReadableStream({start(o){let c="";return u();async function u(){if(r!=null&&r.aborted){const l=new ct("cancelled","Request was cancelled");return o.error(l),t(l),Promise.resolve()}try{const{value:l,done:d}=await n.read();if(d){c.trim()&&s(c.trim(),o),o.close();return}if(r!=null&&r.aborted){const g=new ct("cancelled","Request was cancelled");o.error(g),t(g),await n.cancel();return}c+=i.decode(l,{stream:!0});const f=c.split(`
`);c=f.pop()||"";for(const g of f)g.trim()&&s(g.trim(),o);return u()}catch(l){const d=l instanceof ct?l:za(0,null);o.error(d),t(d)}}},cancel(){return n.cancel()}})}const Vg="@firebase/functions",Lg="0.13.3";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const SD="auth-internal",RD="app-check-internal",PD="messaging-internal";function CD(n){const e=(t,{instanceIdentifier:r})=>{const s=t.getProvider("app").getImmediate(),i=t.getProvider(SD),o=t.getProvider(PD),c=t.getProvider(RD);return new _D(s,i,o,c,r)};ht(new nt(id,e,"PUBLIC").setMultipleInstances(!0)),$e(Vg,Lg,n),$e(Vg,Lg,"esm2020")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xD(n=Ls(),e=yl){const r=Et(Y(n),id).getImmediate({identifier:e}),s=Pl("functions");return s&&kD(r,...s),r}function kD(n,e,t){yD(Y(n),e,t)}function Js(n,e,t){return ID(Y(n),e)}CD();const jw="@firebase/installations",od="0.6.21";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bw=1e4,Gw=`w:${od}`,qw="FIS_v2",DD="https://firebaseinstallations.googleapis.com/v1",ND=60*60*1e3,OD="installations",VD="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const LD={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},Nr=new Kn(OD,VD,LD);function $w(n){return n instanceof wt&&n.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zw({projectId:n}){return`${DD}/projects/${n}/installations`}function Kw(n){return{token:n.token,requestStatus:2,expiresIn:FD(n.expiresIn),creationTime:Date.now()}}async function Ww(n,e){const r=(await e.json()).error;return Nr.create("request-failed",{requestName:n,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function Hw({apiKey:n}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n})}function MD(n,{refreshToken:e}){const t=Hw(n);return t.append("Authorization",UD(e)),t}async function Qw(n){const e=await n();return e.status>=500&&e.status<600?n():e}function FD(n){return Number(n.replace("s","000"))}function UD(n){return`${qw} ${n}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jD({appConfig:n,heartbeatServiceProvider:e},{fid:t}){const r=zw(n),s=Hw(n),i=e.getImmediate({optional:!0});if(i){const l=await i.getHeartbeatsHeader();l&&s.append("x-firebase-client",l)}const o={fid:t,authVersion:qw,appId:n.appId,sdkVersion:Gw},c={method:"POST",headers:s,body:JSON.stringify(o)},u=await Qw(()=>fetch(r,c));if(u.ok){const l=await u.json();return{fid:l.fid||t,registrationStatus:2,refreshToken:l.refreshToken,authToken:Kw(l.authToken)}}else throw await Ww("Create Installation",u)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jw(n){return new Promise(e=>{setTimeout(e,n)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function BD(n){return btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const GD=/^[cdef][\w-]{21}$/,Il="";function qD(){try{const n=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(n),n[0]=112+n[0]%16;const t=$D(n);return GD.test(t)?t:Il}catch{return Il}}function $D(n){return BD(n).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xc(n){return`${n.appName}!${n.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yw=new Map;function Xw(n,e){const t=xc(n);Zw(t,e),zD(t,e)}function Zw(n,e){const t=Yw.get(n);if(t)for(const r of t)r(e)}function zD(n,e){const t=KD();t&&t.postMessage({key:n,fid:e}),WD()}let gr=null;function KD(){return!gr&&"BroadcastChannel"in self&&(gr=new BroadcastChannel("[Firebase] FID Change"),gr.onmessage=n=>{Zw(n.data.key,n.data.fid)}),gr}function WD(){Yw.size===0&&gr&&(gr.close(),gr=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const HD="firebase-installations-database",QD=1,Or="firebase-installations-store";let vu=null;function ad(){return vu||(vu=Xa(HD,QD,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore(Or)}}})),vu}async function Ka(n,e){const t=xc(n),s=(await ad()).transaction(Or,"readwrite"),i=s.objectStore(Or),o=await i.get(t);return await i.put(e,t),await s.done,(!o||o.fid!==e.fid)&&Xw(n,e.fid),e}async function eE(n){const e=xc(n),r=(await ad()).transaction(Or,"readwrite");await r.objectStore(Or).delete(e),await r.done}async function kc(n,e){const t=xc(n),s=(await ad()).transaction(Or,"readwrite"),i=s.objectStore(Or),o=await i.get(t),c=e(o);return c===void 0?await i.delete(t):await i.put(c,t),await s.done,c&&(!o||o.fid!==c.fid)&&Xw(n,c.fid),c}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cd(n){let e;const t=await kc(n.appConfig,r=>{const s=JD(r),i=YD(n,s);return e=i.registrationPromise,i.installationEntry});return t.fid===Il?{installationEntry:await e}:{installationEntry:t,registrationPromise:e}}function JD(n){const e=n||{fid:qD(),registrationStatus:0};return tE(e)}function YD(n,e){if(e.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(Nr.create("app-offline"));return{installationEntry:e,registrationPromise:s}}const t={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=XD(n,t);return{installationEntry:t,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:ZD(n)}:{installationEntry:e}}async function XD(n,e){try{const t=await jD(n,e);return Ka(n.appConfig,t)}catch(t){throw $w(t)&&t.customData.serverCode===409?await eE(n.appConfig):await Ka(n.appConfig,{fid:e.fid,registrationStatus:0}),t}}async function ZD(n){let e=await Mg(n.appConfig);for(;e.registrationStatus===1;)await Jw(100),e=await Mg(n.appConfig);if(e.registrationStatus===0){const{installationEntry:t,registrationPromise:r}=await cd(n);return r||t}return e}function Mg(n){return kc(n,e=>{if(!e)throw Nr.create("installation-not-found");return tE(e)})}function tE(n){return eN(n)?{fid:n.fid,registrationStatus:0}:n}function eN(n){return n.registrationStatus===1&&n.registrationTime+Bw<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tN({appConfig:n,heartbeatServiceProvider:e},t){const r=nN(n,t),s=MD(n,t),i=e.getImmediate({optional:!0});if(i){const l=await i.getHeartbeatsHeader();l&&s.append("x-firebase-client",l)}const o={installation:{sdkVersion:Gw,appId:n.appId}},c={method:"POST",headers:s,body:JSON.stringify(o)},u=await Qw(()=>fetch(r,c));if(u.ok){const l=await u.json();return Kw(l)}else throw await Ww("Generate Auth Token",u)}function nN(n,{fid:e}){return`${zw(n)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ud(n,e=!1){let t;const r=await kc(n.appConfig,i=>{if(!nE(i))throw Nr.create("not-registered");const o=i.authToken;if(!e&&iN(o))return i;if(o.requestStatus===1)return t=rN(n,e),i;{if(!navigator.onLine)throw Nr.create("app-offline");const c=aN(i);return t=sN(n,c),c}});return t?await t:r.authToken}async function rN(n,e){let t=await Fg(n.appConfig);for(;t.authToken.requestStatus===1;)await Jw(100),t=await Fg(n.appConfig);const r=t.authToken;return r.requestStatus===0?ud(n,e):r}function Fg(n){return kc(n,e=>{if(!nE(e))throw Nr.create("not-registered");const t=e.authToken;return cN(t)?{...e,authToken:{requestStatus:0}}:e})}async function sN(n,e){try{const t=await tN(n,e),r={...e,authToken:t};return await Ka(n.appConfig,r),t}catch(t){if($w(t)&&(t.customData.serverCode===401||t.customData.serverCode===404))await eE(n.appConfig);else{const r={...e,authToken:{requestStatus:0}};await Ka(n.appConfig,r)}throw t}}function nE(n){return n!==void 0&&n.registrationStatus===2}function iN(n){return n.requestStatus===2&&!oN(n)}function oN(n){const e=Date.now();return e<n.creationTime||n.creationTime+n.expiresIn<e+ND}function aN(n){const e={requestStatus:1,requestTime:Date.now()};return{...n,authToken:e}}function cN(n){return n.requestStatus===1&&n.requestTime+Bw<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function uN(n){const e=n,{installationEntry:t,registrationPromise:r}=await cd(e);return r?r.catch(console.error):ud(e).catch(console.error),t.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lN(n,e=!1){const t=n;return await hN(t),(await ud(t,e)).token}async function hN(n){const{registrationPromise:e}=await cd(n);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dN(n){if(!n||!n.options)throw bu("App Configuration");if(!n.name)throw bu("App Name");const e=["projectId","apiKey","appId"];for(const t of e)if(!n.options[t])throw bu(t);return{appName:n.name,projectId:n.options.projectId,apiKey:n.options.apiKey,appId:n.options.appId}}function bu(n){return Nr.create("missing-app-config-values",{valueName:n})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rE="installations",fN="installations-internal",pN=n=>{const e=n.getProvider("app").getImmediate(),t=dN(e),r=Et(e,"heartbeat");return{app:e,appConfig:t,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},gN=n=>{const e=n.getProvider("app").getImmediate(),t=Et(e,rE).getImmediate();return{getId:()=>uN(t),getToken:s=>lN(t,s)}};function mN(){ht(new nt(rE,pN,"PUBLIC")),ht(new nt(fN,gN,"PRIVATE"))}mN();$e(jw,od);$e(jw,od,"esm2020");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _N="/firebase-messaging-sw.js",yN="/firebase-cloud-messaging-push-scope",sE="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",IN="https://fcmregistrations.googleapis.com/v1",iE="google.c.a.c_id",wN="google.c.a.c_l",EN="google.c.a.ts",TN="google.c.a.e",Ug=1e4;var jg;(function(n){n[n.DATA_MESSAGE=1]="DATA_MESSAGE",n[n.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(jg||(jg={}));/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */var no;(function(n){n.PUSH_RECEIVED="push-received",n.NOTIFICATION_CLICKED="notification-clicked"})(no||(no={}));/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kt(n){const e=new Uint8Array(n);return btoa(String.fromCharCode(...e)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function AN(n){const e="=".repeat((4-n.length%4)%4),t=(n+e).replace(/\-/g,"+").replace(/_/g,"/"),r=atob(t),s=new Uint8Array(r.length);for(let i=0;i<r.length;++i)s[i]=r.charCodeAt(i);return s}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Su="fcm_token_details_db",vN=5,Bg="fcm_token_object_Store";async function bN(n){if("databases"in indexedDB&&!(await indexedDB.databases()).map(i=>i.name).includes(Su))return null;let e=null;return(await Xa(Su,vN,{upgrade:async(r,s,i,o)=>{if(s<2||!r.objectStoreNames.contains(Bg))return;const c=o.objectStore(Bg),u=await c.index("fcmSenderId").get(n);if(await c.clear(),!!u){if(s===2){const l=u;if(!l.auth||!l.p256dh||!l.endpoint)return;e={token:l.fcmToken,createTime:l.createTime??Date.now(),subscriptionOptions:{auth:l.auth,p256dh:l.p256dh,endpoint:l.endpoint,swScope:l.swScope,vapidKey:typeof l.vapidKey=="string"?l.vapidKey:Kt(l.vapidKey)}}}else if(s===3){const l=u;e={token:l.fcmToken,createTime:l.createTime,subscriptionOptions:{auth:Kt(l.auth),p256dh:Kt(l.p256dh),endpoint:l.endpoint,swScope:l.swScope,vapidKey:Kt(l.vapidKey)}}}else if(s===4){const l=u;e={token:l.fcmToken,createTime:l.createTime,subscriptionOptions:{auth:Kt(l.auth),p256dh:Kt(l.p256dh),endpoint:l.endpoint,swScope:l.swScope,vapidKey:Kt(l.vapidKey)}}}}}})).close(),await ou(Su),await ou("fcm_vapid_details_db"),await ou("undefined"),SN(e)?e:null}function SN(n){if(!n||!n.subscriptionOptions)return!1;const{subscriptionOptions:e}=n;return typeof n.createTime=="number"&&n.createTime>0&&typeof n.token=="string"&&n.token.length>0&&typeof e.auth=="string"&&e.auth.length>0&&typeof e.p256dh=="string"&&e.p256dh.length>0&&typeof e.endpoint=="string"&&e.endpoint.length>0&&typeof e.swScope=="string"&&e.swScope.length>0&&typeof e.vapidKey=="string"&&e.vapidKey.length>0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RN="firebase-messaging-database",PN=1,ro="firebase-messaging-store";let Ru=null;function oE(){return Ru||(Ru=Xa(RN,PN,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore(ro)}}})),Ru}async function CN(n){const e=aE(n),r=await(await oE()).transaction(ro).objectStore(ro).get(e);if(r)return r;{const s=await bN(n.appConfig.senderId);if(s)return await ld(n,s),s}}async function ld(n,e){const t=aE(n),s=(await oE()).transaction(ro,"readwrite");return await s.objectStore(ro).put(e,t),await s.done,e}function aE({appConfig:n}){return n.appId}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xN={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},tt=new Kn("messaging","Messaging",xN);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kN(n,e){const t=await dd(n),r=cE(e),s={method:"POST",headers:t,body:JSON.stringify(r)};let i;try{i=await(await fetch(hd(n.appConfig),s)).json()}catch(o){throw tt.create("token-subscribe-failed",{errorInfo:o==null?void 0:o.toString()})}if(i.error){const o=i.error.message;throw tt.create("token-subscribe-failed",{errorInfo:o})}if(!i.token)throw tt.create("token-subscribe-no-token");return i.token}async function DN(n,e){const t=await dd(n),r=cE(e.subscriptionOptions),s={method:"PATCH",headers:t,body:JSON.stringify(r)};let i;try{i=await(await fetch(`${hd(n.appConfig)}/${e.token}`,s)).json()}catch(o){throw tt.create("token-update-failed",{errorInfo:o==null?void 0:o.toString()})}if(i.error){const o=i.error.message;throw tt.create("token-update-failed",{errorInfo:o})}if(!i.token)throw tt.create("token-update-no-token");return i.token}async function NN(n,e){const r={method:"DELETE",headers:await dd(n)};try{const i=await(await fetch(`${hd(n.appConfig)}/${e}`,r)).json();if(i.error){const o=i.error.message;throw tt.create("token-unsubscribe-failed",{errorInfo:o})}}catch(s){throw tt.create("token-unsubscribe-failed",{errorInfo:s==null?void 0:s.toString()})}}function hd({projectId:n}){return`${IN}/projects/${n}/registrations`}async function dd({appConfig:n,installations:e}){const t=await e.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n.apiKey,"x-goog-firebase-installations-auth":`FIS ${t}`})}function cE({p256dh:n,auth:e,endpoint:t,vapidKey:r}){const s={web:{endpoint:t,auth:e,p256dh:n}};return r!==sE&&(s.web.applicationPubKey=r),s}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ON=7*24*60*60*1e3;async function VN(n){const e=await MN(n.swRegistration,n.vapidKey),t={vapidKey:n.vapidKey,swScope:n.swRegistration.scope,endpoint:e.endpoint,auth:Kt(e.getKey("auth")),p256dh:Kt(e.getKey("p256dh"))},r=await CN(n.firebaseDependencies);if(r){if(FN(r.subscriptionOptions,t))return Date.now()>=r.createTime+ON?LN(n,{token:r.token,createTime:Date.now(),subscriptionOptions:t}):r.token;try{await NN(n.firebaseDependencies,r.token)}catch(s){console.warn(s)}return Gg(n.firebaseDependencies,t)}else return Gg(n.firebaseDependencies,t)}async function LN(n,e){try{const t=await DN(n.firebaseDependencies,e),r={...e,token:t,createTime:Date.now()};return await ld(n.firebaseDependencies,r),t}catch(t){throw t}}async function Gg(n,e){const r={token:await kN(n,e),createTime:Date.now(),subscriptionOptions:e};return await ld(n,r),r.token}async function MN(n,e){const t=await n.pushManager.getSubscription();return t||n.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:AN(e)})}function FN(n,e){const t=e.vapidKey===n.vapidKey,r=e.endpoint===n.endpoint,s=e.auth===n.auth,i=e.p256dh===n.p256dh;return t&&r&&s&&i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qg(n){const e={from:n.from,collapseKey:n.collapse_key,messageId:n.fcmMessageId};return UN(e,n),jN(e,n),BN(e,n),e}function UN(n,e){if(!e.notification)return;n.notification={};const t=e.notification.title;t&&(n.notification.title=t);const r=e.notification.body;r&&(n.notification.body=r);const s=e.notification.image;s&&(n.notification.image=s);const i=e.notification.icon;i&&(n.notification.icon=i)}function jN(n,e){e.data&&(n.data=e.data)}function BN(n,e){var s,i,o,c;if(!e.fcmOptions&&!((s=e.notification)!=null&&s.click_action))return;n.fcmOptions={};const t=((i=e.fcmOptions)==null?void 0:i.link)??((o=e.notification)==null?void 0:o.click_action);t&&(n.fcmOptions.link=t);const r=(c=e.fcmOptions)==null?void 0:c.analytics_label;r&&(n.fcmOptions.analyticsLabel=r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function GN(n){return typeof n=="object"&&!!n&&iE in n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qN(n){if(!n||!n.options)throw Pu("App Configuration Object");if(!n.name)throw Pu("App Name");const e=["projectId","apiKey","appId","messagingSenderId"],{options:t}=n;for(const r of e)if(!t[r])throw Pu(r);return{appName:n.name,projectId:t.projectId,apiKey:t.apiKey,appId:t.appId,senderId:t.messagingSenderId}}function Pu(n){return tt.create("missing-app-config-values",{valueName:n})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $N{constructor(e,t,r){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const s=qN(e);this.firebaseDependencies={app:e,appConfig:s,installations:t,analyticsProvider:r}}_delete(){return Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zN(n){try{n.swRegistration=await navigator.serviceWorker.register(_N,{scope:yN}),n.swRegistration.update().catch(()=>{}),await KN(n.swRegistration)}catch(e){throw tt.create("failed-service-worker-registration",{browserErrorMessage:e==null?void 0:e.message})}}async function KN(n){return new Promise((e,t)=>{const r=setTimeout(()=>t(new Error(`Service worker not registered after ${Ug} ms`)),Ug),s=n.installing||n.waiting;n.active?(clearTimeout(r),e()):s?s.onstatechange=i=>{var o;((o=i.target)==null?void 0:o.state)==="activated"&&(s.onstatechange=null,clearTimeout(r),e())}:(clearTimeout(r),t(new Error("No incoming service worker found.")))})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function WN(n,e){if(!e&&!n.swRegistration&&await zN(n),!(!e&&n.swRegistration)){if(!(e instanceof ServiceWorkerRegistration))throw tt.create("invalid-sw-registration");n.swRegistration=e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function HN(n,e){e?n.vapidKey=e:n.vapidKey||(n.vapidKey=sE)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function uE(n,e){if(!navigator)throw tt.create("only-available-in-window");if(Notification.permission==="default"&&await Notification.requestPermission(),Notification.permission!=="granted")throw tt.create("permission-blocked");return await HN(n,e==null?void 0:e.vapidKey),await WN(n,e==null?void 0:e.serviceWorkerRegistration),VN(n)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function QN(n,e,t){const r=JN(e);(await n.firebaseDependencies.analyticsProvider.get()).logEvent(r,{message_id:t[iE],message_name:t[wN],message_time:t[EN],message_device_time:Math.floor(Date.now()/1e3)})}function JN(n){switch(n){case no.NOTIFICATION_CLICKED:return"notification_open";case no.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function YN(n,e){const t=e.data;if(!t.isFirebaseMessaging)return;n.onMessageHandler&&t.messageType===no.PUSH_RECEIVED&&(typeof n.onMessageHandler=="function"?n.onMessageHandler(qg(t)):n.onMessageHandler.next(qg(t)));const r=t.data;GN(r)&&r[TN]==="1"&&await QN(n,t.messageType,r)}const $g="@firebase/messaging",zg="0.12.25";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const XN=n=>{const e=new $N(n.getProvider("app").getImmediate(),n.getProvider("installations-internal").getImmediate(),n.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",t=>YN(e,t)),e},ZN=n=>{const e=n.getProvider("messaging").getImmediate();return{getToken:r=>uE(e,r)}};function eO(){ht(new nt("messaging",XN,"PUBLIC")),ht(new nt("messaging-internal",ZN,"PRIVATE")),$e($g,zg),$e($g,zg,"esm2020")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lE(){try{await Im()}catch{return!1}return typeof window<"u"&&io()&&UT()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tO(n=Ls()){return lE().then(e=>{if(!e)throw tt.create("unsupported-browser")},e=>{throw tt.create("indexed-db-unsupported")}),Et(Y(n),"messaging").getImmediate()}async function D1(n,e){return n=Y(n),uE(n,e)}eO();const Ot={apiKey:"AIzaSyDpmm-NIEq80-NFg2Y6o9D6Ea4oghYJPhw",authDomain:"teh-tarik-app-my-own.firebaseapp.com",projectId:"teh-tarik-app-my-own",storageBucket:"teh-tarik-app-my-own.firebasestorage.app",messagingSenderId:"239722784519",appId:"1:239722784519:web:ccf12b2ff7f3575bd4c7a2",measurementId:"G-4LMGTL375D"};Ot.apiKey,Ot.authDomain,Ot.projectId,Ot.storageBucket,Ot.messagingSenderId,Ot.appId;if(!Ot.apiKey||!Ot.projectId)throw new Error("Missing Firebase web config (need at least VITE_FIREBASE_API_KEY and VITE_FIREBASE_PROJECT_ID). Copy frontend/.env.example to frontend/.env.local and fill the VITE_FIREBASE_* values from Firebase Console → Project settings → Your apps.");const fn=Tm(Ot);fn.options.projectId;fn.options.authDomain;String(fn.options.apiKey||"").slice(0,8)+"";const Kg="".trim();function nO(n){if(!Kg)return console.warn("[app-check] VITE_RECAPTCHA_V3_SITE_KEY is missing. App Check not initialized."),null;try{return nR(n,{provider:new Gl(Kg),isTokenAutoRefreshEnabled:!0})}catch(e){return console.warn("[app-check] Initialization skipped. App may be not registered yet.",e),null}}const N1=nO(fn),te=HI(fn),hE=aD(fn),ie=_S(fn),O1=!1;let dE=null;lE().then(n=>{n&&(dE=tO(fn))}).catch(console.warn);const V1=()=>dE,rO="us-central1".trim()||"us-central1",Ys=xD(fn,rO),L1=Ot.projectId||"";try{JI(te).catch(n=>{n.code==="failed-precondition"?console.warn("Firestore persistence: multiple tabs open"):n.code==="unimplemented"?console.warn("Firestore persistence: not supported"):console.warn("Firestore persistence error:",n.code)})}catch(n){console.warn("Persistence setup skipped:",n)}const sO=new Set(["stmsalam@gmail.com","admin@stmsalam.com","admin@stm.com","haritha.mh77@gmail.com"].map(n=>n.toLowerCase())),iO=new Set(["rider1@stmsalam.com","rider2@stmsalam.com","rider3@stmsalam.com"].map(n=>n.toLowerCase()));function Cu(n,e){let r=new Set(["admin","rider","driver","customer","user"]).has(e)?e:"customer";if(r==="user"&&(r="customer"),r==="admin"||r==="rider"||r==="driver")return r;const s=(n||"").trim().toLowerCase();return s&&sO.has(s)?"admin":s&&iO.has(s)?"driver":"customer"}const fE=G.createContext();function oO({children:n}){const[e,t]=G.useState(()=>{try{const g=localStorage.getItem("stm_user");return g?JSON.parse(g):null}catch{return localStorage.removeItem("stm_user"),null}}),[r,s]=G.useState(!0),[i,o]=G.useState(!1),[c,u]=G.useState(()=>!!localStorage.getItem("stm_guest"));G.useEffect(()=>{const g=ob(ie,async I=>{var b;if(I){o(!0);let P="customer",k=I.displayName||"Customer",V="",j="";try{const K=ye(te,"drivers",I.uid),Q=await sn(K);if(Q.exists()){const T=Q.data();P=T.role||"driver",k=T.name||k,typeof T.phone=="string"&&T.phone.trim()&&(V=T.phone.trim()),I.uid}else{const T=ye(te,"users",I.uid),y=await sn(T);if(y.exists()){const w=y.data();P=Cu(I.email,w.role),k=w.name||k,typeof w.phone=="string"&&w.phone.trim()?V=w.phone.trim():typeof w.mobile=="string"&&w.mobile.trim()&&(V=w.mobile.trim()),typeof w.address=="string"&&w.address.trim()?j=w.address.trim():typeof w.defaultAddress=="string"&&w.defaultAddress.trim()&&(j=w.defaultAddress.trim())}else P=Cu(I.email,null);I.uid}}catch(K){console.warn("[AuthContext] Failed to fetch profile:",K),P=Cu(I.email,null)}try{((b=(await km(I)).claims)==null?void 0:b.admin)===!0&&(P="admin")}catch(K){console.warn("Could not read ID token claims:",K)}const U=typeof I.phoneNumber=="string"&&I.phoneNumber.trim()?I.phoneNumber.trim():"",z={id:I.uid,name:P==="admin"?k||"Admin Master":k,email:I.email,phone:V||U||"",address:j||"",role:P};t(z),localStorage.setItem("stm_user",JSON.stringify(z))}else o(!1),t(null),localStorage.removeItem("stm_user"),localStorage.removeItem("token");s(!1)});return()=>g()},[]);const l=g=>{t(g),o(!0),u(!1),localStorage.setItem("stm_user",JSON.stringify(g)),localStorage.removeItem("stm_guest")},d=()=>{u(!0),t(null),localStorage.setItem("stm_guest","true"),localStorage.removeItem("stm_user")},f=()=>{t(null),o(!1),u(!1),localStorage.removeItem("stm_user"),localStorage.removeItem("stm_guest"),ie.signOut()};return _.jsx(fE.Provider,{value:{user:e,isGuest:c,login:l,loginAsGuest:d,logout:f,loading:r,isAuthenticated:i},children:n})}const fd=()=>G.useContext(fE),Wa="stm-open-support",ke={name:"STM Salam",tagline:"Authentic Kopitiam Flavors, Delivered.",outletName:"STM Salam — Blk 50A",outletAddress:"STM Salam — Blk 50A Marine Terrace, #01-303, Singapore 441050",address:"STM Salam — Blk 50A Marine Terrace, #01-303, Singapore 441050",outletLat:1.30892,outletLng:103.91548,freeDeliveryRadiusKm:5,deliveryFee:2,minOrderDelivery:10,minOrderFreeDelivery:10,minOrder:10,phone:"+65 9191 5766",whatsapp:"+65 9191 5766",email:"highlitesg786@gmail.com",website:"https://www.stmsalam.com",catalog:"https://wa.me/c/6591915766",hours:"Daily 9:00 AM – 11:00 PM",avgDeliveryTime:"25–35 min"},aO=[{id:1,name:"STM Salam — Blk 50A",address:"STM Salam — Blk 50A Marine Terrace, #01-303, Singapore 441050",phone:"+65 9191 5766",hours:"Daily 9:00 AM – 11:00 PM",isMain:!0,img:"/bg2.jpeg",lat:1.30892,lng:103.91548}],Wg=[{id:"hot-drinks",name:"Hot Drinks",emoji:"☕"},{id:"cold-drinks",name:"Cold Drinks",emoji:"🧊"},{id:"can-drinks",name:"Can Drinks",emoji:"🥫"},{id:"sugarcane",name:"Sugarcane",emoji:"🎋"},{id:"dinosaur",name:"Dinosaur",emoji:"🦕"},{id:"burgers-kebabs",name:"Burgers, Kebabs & More",emoji:"🍔"},{id:"snacks",name:"Snacks",emoji:"🥟"},{id:"sides",name:"Sides",emoji:"🍟"},{id:"desserts",name:"Desserts",emoji:"🍰"},{id:"indian",name:"Indian Food",emoji:"🍛",note:"Start 9:00 AM to 9:00 PM"}],pE="/bg1.jpeg",cO=/^(?:https?:)?\/\//i;function Hg(n){const e=typeof n=="string"?n.trim():"";if(!e)return pE;if(e.startsWith("data:")||e.startsWith("blob:")||cO.test(e))return e;const t=e.replace(/\\/g,"/").replace(/^\.\/+/,"/").replace(/^\/aboutusimages\//i,"/aboutusimage/").replace(/^aboutusimage\//i,"/aboutusimage/").replace(/^aboutusimages\//i,"/aboutusimage/").replace(/\/{2,}/g,"/"),r=t.startsWith("/")?t:`/${t}`;return encodeURI(r)}function gE({src:n,alt:e,fallbackSrc:t=pE,style:r,onError:s,...i}){const o=G.useMemo(()=>Hg(n),[n]),c=G.useMemo(()=>Hg(t),[t]),u=l=>{var g;const d=l.currentTarget,f=(d==null?void 0:d.currentSrc)||(d==null?void 0:d.src)||o;if(((g=d==null?void 0:d.dataset)==null?void 0:g.fallbackApplied)==="1"){console.error("[ImageLoadError] fallback failed",{attemptedSrc:f,fallbackSrc:c}),s&&s(l);return}console.warn("[ImageLoadError] image failed; switching to fallback",{attemptedSrc:f,originalSrc:n,fallbackSrc:c}),d.dataset.fallbackApplied="1",d.src=c,s&&s(l)};return _.jsx("img",{loading:"lazy",src:o,alt:e||"Image",onError:u,style:{width:"100%",height:"auto",objectFit:"cover",display:"block",...r},...i})}function uO(){var b,P,k;const[n,e]=G.useState(!1),[t,r]=G.useState(!1),{pathname:s}=vl(),i=bl(),{user:o,isGuest:c,logout:u}=fd(),{totalItems:l}=ST();G.useEffect(()=>{const V=()=>e(window.scrollY>20);return window.addEventListener("scroll",V),()=>window.removeEventListener("scroll",V)},[]);const d=()=>_.jsx("div",{style:{background:"var(--gold)",color:"var(--green-dark)",textAlign:"center",padding:"8px 0",fontSize:"13px",fontWeight:950,letterSpacing:"1px",textTransform:"uppercase",borderBottom:"1px solid rgba(0,0,0,0.1)",zIndex:1100,position:"relative"},children:_.jsx("marquee",{scrollamount:"6",style:{display:"block"},children:"✨ MINIMUM ORDER SGD 10.00 FOR ALL DELIVERIES AND PICKUPS ✨ ENJOY AUTHENTIC STM Salam FLAVORS ✨ MINIMUM ORDER SGD 10.00 ✨"})});G.useEffect(()=>{r(!1)},[s]);const f=[{to:"/",label:"Home"},{to:"/menu",label:"Menu"},{to:"/gallery",label:"Gallery"},{to:"/about",label:"About Us"},{to:"/profile",label:"Orders"}],g=()=>{u(),i("/login")},I=()=>{window.dispatchEvent(new CustomEvent(Wa,{detail:{tab:"team"}}))};return _.jsxs(_.Fragment,{children:[_.jsx(d,{}),_.jsxs("nav",{style:{position:"sticky",top:0,zIndex:1e3,background:n?"rgba(20, 62, 50, 0.98)":"var(--green-dark)",backdropFilter:"blur(16px)",borderBottom:n?"1px solid rgba(201, 163, 68, 0.15)":"1px solid transparent",boxShadow:n?"0 10px 40px rgba(0,0,0,0.3)":"none",transition:"all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",padding:n?"10px 0":"18px 0",width:"100%",overflow:"hidden"},children:[_.jsxs("div",{className:"container",style:{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%"},children:[_.jsx(Ze,{to:"/",style:{display:"flex",alignItems:"center",gap:"12px",textDecoration:"none",transition:"transform 0.2s"},children:_.jsx(gE,{src:"/stmsalamlogo.png",alt:"Logo",style:{width:"60px",height:"60px",objectFit:"contain"}})}),_.jsx("div",{className:"desktop-nav",style:{display:"flex",gap:"6px",alignItems:"center",background:"rgba(255,255,255,0.06)",padding:"6px",borderRadius:"16px",border:"1px solid rgba(255,255,255,0.08)"},children:f.map(V=>_.jsx(Ze,{to:V.to,style:{padding:"10px 22px",borderRadius:"12px",fontSize:"15px",fontWeight:700,color:s===V.to?"var(--green-dark)":"rgba(255,255,255,0.8)",background:s===V.to?"var(--gold)":"transparent",transition:"all 0.3s ease",textDecoration:"none"},children:V.label},V.to))}),_.jsx("div",{style:{display:"flex",gap:"12px",alignItems:"center"},children:_.jsxs("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[o?_.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[_.jsxs(Ze,{to:"/profile",style:{display:"flex",alignItems:"center",gap:"8px",textDecoration:"none"},children:[_.jsx("div",{style:{width:"36px",height:"36px",borderRadius:"50%",background:"var(--gold)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14px",fontWeight:900,color:"var(--green-dark)"},children:((P=(b=o.name)==null?void 0:b.charAt(0))==null?void 0:P.toUpperCase())||"U"}),_.jsx("span",{className:"nav-brand-text",style:{color:"white",fontWeight:700,fontSize:"14px",maxWidth:"100px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:(k=o.name)==null?void 0:k.split(" ")[0]})]}),_.jsx("button",{onClick:g,title:"Sign Out",style:{width:"36px",height:"36px",borderRadius:"12px",background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.7)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"},children:_.jsx(hT,{size:16})})]}):_.jsxs(Ze,{to:"/login",className:"nav-icon-btn",style:{padding:"8px 18px",borderRadius:"14px",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:"white",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",textDecoration:"none",fontSize:"14px",fontWeight:700},children:[_.jsx(hs,{size:18})," ",c?"Guest":"Sign In"]}),_.jsxs("button",{type:"button",onClick:I,title:"Chat with Admin",style:{padding:"8px 14px",borderRadius:"14px",background:"rgba(255,255,255,0.12)",border:"1px solid rgba(255,255,255,0.2)",color:"white",display:"flex",alignItems:"center",gap:"8px",fontSize:"13px",fontWeight:800,cursor:"pointer"},children:[_.jsx(ds,{size:18})," ",_.jsx("span",{className:"nav-chat-label",children:"Chat with Admin"})]}),_.jsxs(Ze,{to:"/cart",style:{background:"var(--gold)",color:"var(--green-dark)",padding:"0 16px",borderRadius:"14px",height:"42px",display:"flex",alignItems:"center",gap:"10px",textDecoration:"none",fontWeight:900},children:[_.jsx(Ou,{size:18}),_.jsx("span",{style:{fontSize:"14px"},children:l})]}),_.jsx("button",{onClick:()=>r(!t),className:"mobile-toggle",style:{background:"rgba(255,255,255,0.08)",border:"none",color:"white",width:"42px",height:"42px",borderRadius:"14px",cursor:"pointer",display:"none",alignItems:"center",justifyContent:"center"},children:t?_.jsx(sm,{size:22}):_.jsx(dT,{size:22})})]})})]}),_.jsx("style",{children:`
          @media (max-width: 968px) {
            .desktop-nav { display: none !important; }
            .mobile-toggle { display: flex !important; }
            .container { padding: 0 16px !important; }
            .nav-chat-label { display: none; }
          }
        `})]}),t&&_.jsxs("div",{style:{position:"fixed",inset:0,zIndex:999,background:"var(--green-dark)",padding:"120px 40px",display:"flex",flexDirection:"column",gap:"20px"},children:[f.map(V=>_.jsx(Ze,{to:V.to,style:{fontSize:"40px",fontWeight:950,color:s===V.to?"var(--gold)":"white",textDecoration:"none"},children:V.label},V.to)),_.jsxs("button",{type:"button",onClick:()=>{I(),r(!1)},style:{fontSize:"28px",fontWeight:950,color:"var(--gold)",background:"none",border:"none",cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",gap:12,padding:0},children:[_.jsx(ds,{size:32})," Chat with Admin"]}),_.jsx("div",{style:{marginTop:"auto",borderTop:"1px solid rgba(255,255,255,0.1)",paddingTop:"40px"},children:_.jsxs("div",{style:{display:"flex",gap:"20px",color:"rgba(255,255,255,0.5)",fontSize:"14px"},children:[_.jsx("span",{children:"Marine Terrace"}),_.jsx("span",{children:"•"}),_.jsx("span",{children:"Halal Certified"})]})})]}),_.jsxs("div",{className:"mobile-bottom-nav",children:[_.jsxs(Ze,{to:"/",className:`mobile-nav-item ${s==="/"?"active":""}`,children:[_.jsx(im,{size:22}),_.jsx("span",{children:"Home"})]}),_.jsxs(Ze,{to:"/menu",className:`mobile-nav-item ${s==="/menu"?"active":""}`,children:[_.jsx(fT,{size:22}),_.jsx("span",{children:"Menu"})]}),_.jsxs(Ze,{to:"/cart",className:`mobile-nav-item ${s==="/cart"?"active":""}`,style:{position:"relative"},children:[_.jsx(Ou,{size:22}),_.jsx("span",{children:"Cart"}),l>0&&_.jsx("div",{style:{position:"absolute",top:-5,right:-5,background:"var(--green-dark)",color:"var(--gold)",fontSize:"10px",width:"16px",height:"16px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",fontWeight:900,border:"1.5px solid white"},children:l})]}),_.jsxs(Ze,{to:"/gallery",className:`mobile-nav-item ${s==="/gallery"?"active":""}`,children:[_.jsx(pT,{size:22}),_.jsx("span",{children:"Gallery"})]}),_.jsxs(Ze,{to:"/profile",className:`mobile-nav-item ${s==="/profile"?"active":""}`,children:[_.jsx(hs,{size:22}),_.jsx("span",{children:"Profile"})]})]})]})}function lO(){const n=()=>{window.dispatchEvent(new CustomEvent(Wa,{detail:{tab:"team"}}))};return _.jsxs("footer",{style:{background:"var(--green-dark)",color:"white",paddingTop:"72px",width:"100%",overflow:"hidden"},children:[_.jsxs("div",{className:"container",children:[_.jsxs("div",{className:"footer-grid",style:{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:"56px",marginBottom:"56px"},children:[_.jsxs("div",{className:"footer-brand",children:[_.jsxs("div",{style:{marginBottom:"24px",display:"flex",alignItems:"center",gap:"14px"},children:[_.jsx(gE,{src:"/stmsalamlogo.png",alt:"Logo",style:{width:"64px",height:"64px",objectFit:"contain"}}),_.jsxs("div",{style:{display:"flex",flexDirection:"column"},children:[_.jsx("div",{style:{fontSize:"26px",fontWeight:950,color:"var(--gold)",letterSpacing:"-0.5px",lineHeight:1},children:"Salam"}),_.jsx("div",{style:{fontSize:"11px",color:"rgba(255,255,255,0.5)",fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",marginTop:"4px"},children:"Genuine Taste Since 1988"})]})]}),_.jsx("p",{style:{color:"rgba(255,255,255,0.6)",fontSize:"15px",lineHeight:1.8,maxWidth:"300px",marginBottom:"32px"},children:"Experience the peak of Marine Terrace hospitality. Premium ingredients, crafted with excellence and delivered with grace."}),_.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"24px"},children:[_.jsxs("div",{style:{background:"rgba(255,255,255,0.05)",padding:"16px 20px",borderRadius:"16px",border:"1px solid rgba(255,255,255,0.1)",display:"flex",alignItems:"center",gap:"16px"},children:[_.jsx("div",{style:{width:"40px",height:"40px",borderRadius:"12px",background:"var(--gold)",color:"var(--green-dark)",display:"flex",alignItems:"center",justifyContent:"center"},children:_.jsx(gT,{size:20})}),_.jsxs("div",{children:[_.jsx("div",{style:{fontSize:"10px",color:"var(--gold)",fontWeight:800,textTransform:"uppercase",letterSpacing:"1px"},children:"Quick Support"}),_.jsx("div",{style:{fontSize:"18px",fontWeight:900},children:ke.phone})]})]}),_.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:aO.map((e,t)=>_.jsxs("div",{style:{display:"flex",gap:"12px",alignItems:"flex-start",color:"rgba(255,255,255,0.7)",fontSize:"13px"},children:[_.jsx("span",{style:{color:"var(--gold)",marginTop:"2px",flexShrink:0},children:_.jsx(mT,{size:16})}),_.jsxs("div",{children:[_.jsx("div",{style:{color:"white",fontWeight:800,fontSize:"14px",marginBottom:"2px"},children:e.name}),e.address]})]},e.id))}),_.jsxs("div",{style:{display:"flex",gap:"12px",alignItems:"center",color:"rgba(255,255,255,0.7)",fontSize:"14px"},children:[_.jsx("span",{style:{color:"var(--gold)",flexShrink:0},children:_.jsx(om,{size:16})}),_.jsx("span",{children:ke.hours})]})]})]}),_.jsxs("div",{children:[_.jsx("h4",{style:{fontSize:"13px",fontWeight:900,letterSpacing:"2px",textTransform:"uppercase",color:"var(--gold)",marginBottom:"24px"},children:"Explore"}),_.jsx("ul",{style:{listStyle:"none",display:"flex",flexDirection:"column",gap:"14px",padding:0},children:[["Main Menu","/menu"],["Your Cart","/cart"],["Track Delivery","/tracking"],["My Profile","/profile"]].map(([e,t])=>_.jsx("li",{children:_.jsx(Ze,{to:t,style:{color:"rgba(255,255,255,0.7)",fontSize:"15px",fontWeight:500,textDecoration:"none"},children:e})},t))})]}),_.jsxs("div",{children:[_.jsx("h4",{style:{fontSize:"13px",fontWeight:900,letterSpacing:"2px",textTransform:"uppercase",color:"var(--gold)",marginBottom:"24px"},children:"Support"}),_.jsxs("ul",{style:{listStyle:"none",display:"flex",flexDirection:"column",gap:"14px",padding:0},children:[_.jsx("li",{children:_.jsxs("button",{type:"button",onClick:n,style:{display:"inline-flex",alignItems:"center",gap:8,background:"var(--gold)",color:"var(--green-dark)",border:"none",borderRadius:12,padding:"10px 16px",fontSize:"14px",fontWeight:900,cursor:"pointer",width:"100%",justifyContent:"center"},children:[_.jsx(ds,{size:18})," Chat with Admin"]})}),_.jsx("li",{children:_.jsx(Ze,{to:"/about",style:{color:"rgba(255,255,255,0.7)",fontSize:"15px",fontWeight:500,textDecoration:"none"},children:"About STM"})}),["Latest Promos","Delivery Info","Halal Status"].map(e=>_.jsx("li",{children:_.jsx("a",{href:"#",style:{color:"rgba(255,255,255,0.7)",fontSize:"15px",fontWeight:500,textDecoration:"none"},children:e})},e))]})]}),_.jsxs("div",{children:[_.jsx("h4",{style:{fontSize:"13px",fontWeight:900,letterSpacing:"2px",textTransform:"uppercase",color:"var(--gold)",marginBottom:"24px"},children:"Portals"}),_.jsxs("ul",{style:{listStyle:"none",display:"flex",flexDirection:"column",gap:"14px",padding:0},children:[_.jsx("li",{children:_.jsx(Ze,{to:"/admin",style:{color:"#86EFAC",fontSize:"15px",fontWeight:800,textDecoration:"none"},children:"Admin Login ↗"})}),_.jsx("li",{children:_.jsx(Ze,{to:"/driver",style:{color:"#FCA5A5",fontSize:"15px",fontWeight:800,textDecoration:"none"},children:"Driver Portal ↗"})}),["Terms of Service","Privacy Policy"].map(e=>_.jsx("li",{children:_.jsx("a",{href:"#",style:{color:"rgba(255,255,255,0.7)",fontSize:"15px",fontWeight:500,textDecoration:"none"},children:e})},e))]})]})]}),_.jsxs("div",{style:{borderTop:"1px solid rgba(255,255,255,0.1)",padding:"32px 0",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"24px"},children:[_.jsxs("p",{style:{color:"rgba(255,255,255,0.4)",fontSize:"14px"},children:["© ",new Date().getFullYear()," STM Salam. All rights reserved."]}),_.jsxs("div",{style:{display:"flex",gap:"32px",alignItems:"center"},children:[_.jsxs("div",{style:{display:"flex",gap:"16px",alignItems:"center"},children:[_.jsx("a",{href:"https://facebook.com/stmsalam",target:"_blank",rel:"noreferrer",style:{color:"rgba(255,255,255,0.4)",transition:"0.3s color"},onMouseEnter:e=>e.currentTarget.style.color="var(--gold)",onMouseLeave:e=>e.currentTarget.style.color="rgba(255,255,255,0.4)",children:_.jsx(_T,{size:20})}),_.jsx("a",{href:"https://instagram.com/stmsalam",target:"_blank",rel:"noreferrer",style:{color:"rgba(255,255,255,0.4)",transition:"0.3s color"},onMouseEnter:e=>e.currentTarget.style.color="var(--gold)",onMouseLeave:e=>e.currentTarget.style.color="rgba(255,255,255,0.4)",children:_.jsx(yT,{size:20})})]}),_.jsx("div",{style:{width:"1px",height:"24px",background:"rgba(255,255,255,0.1)"}}),_.jsx("span",{style:{background:"var(--gold)",color:"var(--green-dark)",fontSize:"11px",fontWeight:950,padding:"6px 14px",borderRadius:"30px",letterSpacing:"1px"},children:"HALAL Certified"}),_.jsx("span",{style:{color:"rgba(255,255,255,0.4)",fontSize:"14px"},children:"STM Salam — Blk 50A Marine Terrace, #01-303, Singapore 441050"})]})]})]}),_.jsx("style",{children:`
        @media (max-width: 968px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 48px !important; text-align: center; }
          .footer-brand { display: flex; flex-direction: column; align-items: center; }
          .footer-brand p { margin: 0 auto 32px !important; }
          .footer-brand > div { justify-content: center; }
        }
      `}),_.jsx("div",{style:{textAlign:"center",paddingBottom:"24px",color:"rgba(255,255,255,0.25)",fontSize:"10px",fontWeight:600,letterSpacing:"0.5px"},children:"Designed by HamoTech PTE. LTD."})]})}const hO=({message:n="Hi STM Salam, I need help with my order",type:e="floating",label:t="Chat with Admin",className:r="",style:s={}})=>{const o=`https://wa.me/${ke.whatsapp.replace(/\D/g,"")}?text=${encodeURIComponent(n)}`;return e==="button"?_.jsxs(Er.a,{href:o,target:"_blank",rel:"noopener noreferrer",className:`btn ${r}`,style:{display:"inline-flex",alignItems:"center",gap:"10px",background:"#25d366",color:"white",padding:"14px 28px",borderRadius:"16px",fontWeight:800,textDecoration:"none",boxShadow:"0 10px 20px rgba(37,211,102,0.2)",border:"none",cursor:"pointer",...s},whileHover:{scale:1.02,y:-2},whileTap:{scale:.98},children:[_.jsx(ds,{size:20}),t]}):_.jsxs(Er.a,{href:o,target:"_blank",rel:"noopener noreferrer",className:r,style:{position:"fixed",bottom:"calc(85px + env(safe-area-inset-bottom))",right:"20px",width:"60px",height:"60px",background:"#25d366",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"white",boxShadow:"0 10px 30px rgba(0,0,0,0.15), 0 0 20px rgba(37,211,102,0.4)",zIndex:9991,cursor:"pointer",...s},initial:{scale:0,opacity:0},animate:{scale:1,opacity:1},whileHover:{scale:1.1,rotate:5},whileTap:{scale:.9},children:[_.jsx(ds,{size:32}),_.jsxs("div",{className:"whatsapp-tooltip",style:{position:"absolute",right:"75px",background:"white",color:"#1f2937",padding:"8px 16px",borderRadius:"12px",fontSize:"13px",fontWeight:800,boxShadow:"0 8px 16px rgba(0,0,0,0.1)",whiteSpace:"nowrap",pointerEvents:"none",opacity:0,transform:"translateX(10px)",transition:"all 0.3s ease",border:"1px solid #f1f5f9"},children:[t,_.jsx("div",{style:{position:"absolute",right:"-6px",top:"50%",transform:"translateY(-50%) rotate(45deg)",width:"12px",height:"12px",background:"white",borderRight:"1px solid #f1f5f9",borderTop:"1px solid #f1f5f9"}})]}),_.jsx("style",{children:`
        a:hover .whatsapp-tooltip {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
        @media (max-width: 768px) {
          .whatsapp-tooltip { display: none !important; }
        }
      `})]})};function Qg(n){const e=(n||"").toLowerCase().trim();if(!e)return"Hi! I’m the STM Salam assistant. Try asking about **opening hours**, **delivery**, **minimum order**, **our address**, or **how to track an order**.";const t=`${ke.outletName} — ${ke.outletAddress}`;return/hour|open|close|time|when/.test(e)?`We’re open **${ke.hours}**. Last orders may vary on busy nights — the team will confirm on WhatsApp (${ke.phone}) if needed.`:/where|address|location|find you|outlet|marine|terrace|blk|block|441050/.test(e)?`You can order for pickup or delivery from our outlet:

**${ke.outletName}**
${ke.outletAddress}

We’re the kitchen your delivery or pickup is fulfilled from.`:/deliver|delivery|radius|km|distance|fee|free ship|shipping/.test(e)?`**Delivery rules (summary):**
• Minimum **SGD ${ke.minOrderDelivery.toFixed(2)}** subtotal for delivery.
• **Free delivery** if your address is within **${ke.freeDeliveryRadiusKm} km** of our outlet and you meet the minimum.
• Otherwise a **SGD ${ke.deliveryFee.toFixed(2)}** delivery fee applies (final amount is confirmed at checkout once your address is checked).
• **Pickup** is always available at the outlet — no delivery fee.`:/minimum|min order|less than|below \$?10/.test(e)?`For **delivery**, we need at least **SGD ${ke.minOrderDelivery.toFixed(2)}** in your cart. You can still use **pickup** for smaller orders, or add a few more items.`:/track|order status|where is my|stm-/.test(e)?`Open **Order tracking** from the menu and enter your **order ID** (e.g. STM-…). You’ll see status updates there. If you’re stuck, use **Live team** in this chat or WhatsApp **${ke.phone}**.`:/pay|payment|paynow|qr|stripe|paypal|cash/.test(e)?"We support **PayNow (SGQR)**, **card / demo checkout**, and **cash** (where available). At checkout you’ll see the exact options. For PayNow help, tap **Payment Help** on the checkout page or WhatsApp us.":/menu|food|halal|vegetarian|spicy|price/.test(e)?`Browse the full **Menu** on the site for items and prices. If you need ingredient or halal details, tap **Live team** or WhatsApp **${ke.phone}** and the kitchen will confirm.`:/phone|whatsapp|call|contact/.test(e)?`Reach us at **${ke.phone}** or WhatsApp **${ke.whatsapp}**. For written follow-up on an existing order, **Live team** in this chat is best.`:/human|agent|staff|real person|admin/.test(e)?"Switch to the **Live team** tab in this chat — a staff member can read your thread from the admin dashboard and reply when they’re available.":/thank|thanks|great/.test(e)?`You’re welcome! Enjoy your meal — and thanks for choosing **${ke.name}**.`:`I don’t have a specific answer for that yet. Try rephrasing, or ask about **hours**, **delivery**, **address**, or **tracking**.

For anything personal (payments, allergies, special requests), open the **Live team** tab or WhatsApp **${ke.phone}**.

_Outlet:_ ${t}`}const dO=["Opening hours?","Delivery rules","Outlet address","Track my order"];function fO(n){if(n&&Object.prototype.hasOwnProperty.call(n,"active"))throw new Error("product.active is forbidden. Use available only.")}function pO(n){return Object.prototype.hasOwnProperty.call(n||{},"available")?n:(console.warn("[products.visibility] Missing `available`; defaulting to true for legacy doc.",{productId:(n==null?void 0:n.id)||null}),{...n,available:!0})}function gO(n){const e=String(n||""),t=e.includes("collection('products')")||e.includes('collection("products")')||e.includes("getDocs(products)")||e.includes("getDocs(collection(db, 'products'))")||e.includes('getDocs(collection(db, "products"))'),r=e.includes("shared/useProductsCore.js")||e.includes("useProductsCore");if(t&&!r)throw new Error("Direct product query forbidden. Use shared/useProductsCore.js")}function mO(n,e){const t=String(e);if(t!=="useProductsCore")throw new Error("Unsafe product query access blocked");return gO(`shared/useProductsCore.js:${t}`),n()}function Jg(n){if(!n)return 0;if(typeof(n==null?void 0:n.toMillis)=="function")return n.toMillis();const e=Date.parse(String(n));return Number.isFinite(e)?e:0}function mE(n){const e=pO(n);return fO(e),e}function _O(n,e=!1){const t=mE(n);return e?!0:(t==null?void 0:t.available)!==!1}let Yg=!1;function yO(n){if(!n||!Object.prototype.hasOwnProperty.call(n,"active"))return n;Yg||(console.warn("[products] Ignoring legacy `active` on product documents. Visibility uses `available` only; remove `active` when convenient."),Yg=!0);const{active:e,...t}=n;return t}function IO(n){const e=String((n==null?void 0:n.code)||"").toLowerCase(),t=String((n==null?void 0:n.message)||"").toLowerCase();return e.includes("failed-precondition")||t.includes("index")}function wO({firestore:n,db:e,categoryId:t,orderByCreatedDesc:r,withOrderBy:s}){return mO(()=>{const i=[];return t&&t!=="all"&&i.push(n.where("categoryId","==",t)),r&&s&&i.push(n.orderBy("createdAt","desc")),i.length?n.query(n.collection(e,"products"),...i):n.query(n.collection(e,"products"))},"useProductsCore")}function pd({firestore:n,db:e,categoryId:t,includeUnavailable:r=!1,orderByCreatedDesc:s=!0,onData:i,onError:o,onIndexWarning:c}){let u=!1,l=()=>{};const d=f=>{l();const g=wO({firestore:n,db:e,categoryId:t,orderByCreatedDesc:s,withOrderBy:f});l=n.onSnapshot(g,I=>{try{const b=I.docs.map(P=>({id:P.id,...P.data()})).map(P=>yO(P)).map(P=>mE(P)).filter(P=>_O(P,r)).sort((P,k)=>Jg(k.createdAt)-Jg(P.createdAt));i(b)}catch(b){console.error("[useProductsCore] snapshot processing error",b),o==null||o(b instanceof Error?b:new Error(String(b)))}},I=>{if(!u&&f&&s&&IO(I)){u=!0,c==null||c(I),d(!1);return}o==null||o(I)})};return d(!0),()=>l()}const Ha={SNACKS:["7_DAYS__1_piece__SGD_1.50.png","Bhai_suji_SGD_8.00.png","Candy_1_packet_SGD_1.70.png","Chicken_curry_puffs_1_piece_SGD_2.40.png","Coconut_bun__SGD_1.20.png","Kaya_bun__SGD_1.20.png","mutton_curry_puff_1_piece_SGD_2.40.png","Potato_curry_puffs_1_piece__SGD_2.00.png","Roti_curry_1_piece__SGD_1.30.png","Roti_curry_5_piece__SGD_6.00.png","TAPIOCA_SAMBAL_SGD_4.70.png","tapioca__chips_sgd_4.20.png"],"BURGER KABABAB":["BEEF_BURGER_CHEESY__SGD_7.40_.png","BEEF_BURGER_classic__SGD_6.40_.png","BEEF_BURRTIO__SGD_10.40_.jpg","BEEF_HEALTHY_BOWL__SGD_11.50_.png","BEEF_KEBAB__8.90_.jpg","BEEF_QUESADILLA__11.50_.png","Chicken_burger_CHEESY__SGD_6.90_.png","Chicken_burger_classic__SGD_6.90_.png","CHICKEN_BURRITO__SGD_9.40_.png","CHICKEN_HEALTHY_BOWL__SGD_11.00_.jpg","CHICKEN_KEBAB__SGD_6.90_.png","CHICKEN_QUESADILLA__SGD_10.50_.jpg","HUMMUS_BEEF__tortilla___SGD_11.50_.png","HUMMUS_CHICKEN__tortilla___11.00_.png","Hummus_FALAFEL__tortilla___SGD_10.90_.png","HUMMUS_LAMB__tortilla___SGD_13.50_.png","Hummus__SGD_6.40_.png","LAMB_BURGER_CHEESY__SGD_7.90_.png","LAMB_BURGER_CLASSIC__SGD_7.90_.png","LAMB_BURRITO__SGD_12.40_.png","LAMB_HEALTHY_BOWL__SGD_12.50_.jpg","LAMB_KEBAB__SGD_10.40_.png","LAMB_QUESADILLA__SGD_12.10_.png","MIX_BURRITO__BEEF_CHICKEN___SGD_11.40_.png","MIX_KEBAB__BEEF_CHICKEN____SDG_9.50__.png","PLATE_RICE_BEEF__SGD_11.50_.png","PLATE_RICE_LAMB__SGD_12.50_.png","PLATE_RICE_SHAWARMA_CHICKEN__SGD_11.00_.png","VEG_FALAFEL_BURRITO__9.40_.jpg","VEG_FALAFEL_HEALTHY_BOWL__SGD_11.00_.png","VEG_FALAFEL_KEBAB__SGD_6.90_.png","VEG_FALAFEL_QUESADILLA__SGD_10.40_.jpg"],DINOSAUR:["Bandong_dinosaur__SGD_3.60_.png","Boost_dinosaur__SGD_2.90_.png","Horlicks_dinosaur_Ice__SGD_3.00_.png","Milo_Dino_ICE__SGD_3.60_.png"],DESERT:["KUNAFA_ORGIINAL_SGD_12.00.png","KUNAFE_NEUTELLA__SGD_14.90.png"],"COLD DRINKS":["Bandong_ice__SGD_2.70_SGD_2.80.png","Blueberry_longan__SGD_3.50.png","Blueberry_soda_ice__SGD_3.50.png","Blueberry__SGD_2.80_SGD_2.90.png","Boost_ice_SGD_2.90.png","Fresh_ice__ginger_lemon_SGD_2.80_SGD_3.00.png","Fresh_ice__lemon_tea__SGD_2.70_SGD_2.90.png","Fresh_lemon_juice__ice_SGD_2.70.png","Fresh__virgin__mojito_soda__ice__SGD_3.80_SGD_4.00.png","Honeydew_milk_Ice__SGD_2.80.png","Honeydew_soda__ice__SGD_3.50_SGD_3.70.png","Honey__lemon_soda__ice_SGD_3.70.png","Honey__lemon__ginger__ice_SGD_3.00.png","Honey__lemon__ice__SGD_2.70_SGD_2.90.png","Horlicks__ice__SGD_3.00.png","Ice_BRU_coffee__SGD_2.80.png","Ice_Limau_SGD_2.70_SGD_2.90.png","Kopi_C_kosong_ice__SGD_2.70_SGD_2.90.png","Kopi_ice_SGD_2.50_SGD_2.70.png","Kopi_O_ice__SGD_2.30_SGD_2.50.png","Lemon_soda_SGD_3.50.png","Longan_ice__SGD_3.00.png","Lychee_ice_SGD_2.90.png","Masala_tea_ice__SGD_2.90.png","Milo_Ice_SGD_2.70_SGD_2.90.png","Nescafe__ice_SGD_2.80.png","Syrup__ice_SGD_2.70.png","Syrup__Limau_ice_SGD_3.00.png","Tea_O_ginger_SGD_2.80.png","Teh_cino_ice__SGD_3.00.png","Teh_C_kosong_ice_SGD_2.70.png","Teh_ginger_ice__SGD_2.90_SGD_3.00.png","TEH_O_ICE_LIMAU__SGD_2.70.png","Teh_O_ice_SGD_2.20_SGD_2.40.png","Teh_O_mint_ice_SGD_2.60_SGD_2.70.png","Ying_yang_Ice_SGD_2.80_SGD_3.00.png"],"CAN DRINKS":["100_PLUS__SGD_1.90_.png","APPLE_CAN_DRINK__SGD_1.90_.png","AYATAKA__SGD_1.90_.png","CHRYSANTHEMUM_TEA__SGD_1.90_.png","DASANI_WATER__SGD_1.50_.png","Ice_cream_soda__SGD_1.90_.png","KICKAPOO__SGD_1.90_.png","Oolong_TEA__SGD_1.90_.png","QOO__SDG_1.90_.png","REDBULL__SGD_2.00_.png"],"INDIAN FOOD":["Chicken_biryani__SGD_9.90.png","MEE_COMPO__SGD_12.90.png","MEE_GORENG_SEA_FOOD__SGD_8.50.png","MEE_GORENG__SGD_6.90.png","MURTABAK__CHICKEN____SGD_10.90.png","MURTABAK__MUTTON__sgd__13.50.png","mutton_biriyani_SGD_11.20.png","PRATA_TELUR___SGD_4.20.png","TOSAI_MASALA__SGD_5.50.png"],SUGARCANE:["Fresh_sugarcan_asam__ice__SGD_4.70_.png","Fresh_sugarcan_ice__SGD_4.00_.png","Fresh_Sugercan__lemon_LESS__ice__SGD_4.50_.png","Fresh_Sugercan__lemon_no_ice__SGD_4.90_.png"],HOT:["BOOST_HOT__SGD_2.50_.png","BRU_COFFEE_GINGER__2.40_SGD__.png","BRU_COFFEE_NO_SUGAR__SGD_2.40_.png","Cofee_cino_HOT__SGD_3.00_.png","GINGER_HORLICKS_HOT__SGD_2.70_.png","GINGER_KOPI___SGD_2.40_.png","GINGER_WATER_HOT__SGD_2.50_.png","HOT_MILK__1.80_SGD_.png","Hot_Teh_Chino__SGD_3.00_.png","HOT_TEH_O__LIMAU__SGD_2.20_.png","KOPI_O_GINGER__SGD_2.10_.png","MILO_GINGER__SGD_2.40_.png","MILO_HOT__SGD_2.40_.png","MSALA_TEA_WITH_GINGER___SGD_2.50_.png","NESCAFE_GINGER___SGD_2.90_.png","NESCAFE_HOT__SGD_2.90_.png","NESLO__HOT___SGD_2.50_.png","TEH_C_NO_SUGAR__SGD_2.20_.png","TEH_O_GINGER__SGD_2.30_.png","TEH_O_MINT_HOT__SGD_2.10_.png","TEH_O__SGD_1.70_.png","TEH_TARIK_ICE__SGD_3.00_.png","TEH_TARIK__SGD_2.00_.png","YING_YANG___SGD_2.20_.png"],SIDES:["CHEESE_FRIES_SGD__7.80.png","chicken_nuggets__6_pieces__SGD_6.40.png","french_fries_SGD_6.90.png","ONION_RINGS_SGD_6.90.png"]};var EO={};function TO(){return typeof process<"u"&&EO&&"production".toLowerCase()==="production"}const AO=["pending_payment","placed","paid","refunded","preparing","ready_for_pickup","out_for_delivery","delivered","cancelled","failed"],vO={pending_payment:{paid:"webhook",failed:"webhook",cancelled:"admin"},placed:{refunded:"admin",preparing:"admin",cancelled:"admin"},paid:{refunded:"admin",preparing:"admin",cancelled:"admin"},refunded:{},preparing:{ready_for_pickup:["admin","kitchen"],cancelled:"admin"},ready_for_pickup:{out_for_delivery:"rider",cancelled:"admin"},out_for_delivery:{delivered:"rider",cancelled:"admin"},delivered:{},cancelled:{},failed:{cancelled:"admin"}},Xg=new Set(AO);function Qa(n){return String(n??"").trim().toLowerCase().replace(/-/g,"_").replace(/\s+/g,"_")}function bO(n,e){const t=Qa(n),r=vO[t]||{};return Object.entries(r).filter(([,s])=>e?Array.isArray(s)?s.includes(e):s===e:!0).map(([s])=>s)}const SO={pending:"paid",confirmed:"preparing",ready:"ready_for_pickup",delivering:"out_for_delivery",complete:"delivered",completed:"delivered",refunded:"refunded",canceled:"cancelled",assigned:"out_for_delivery",picked_up:"out_for_delivery"};function xu(n,e){const t=(n==null?void 0:n.paymentMethod)??(n==null?void 0:n.payment_mode)??(n==null?void 0:n.paymentMode),r=t==null?"":String(t).trim().toUpperCase();return r!=="COD"&&r!=="CASH"&&r!==""||Qa(e)!=="paid"?e:String((n==null?void 0:n.paymentStatus)??(n==null?void 0:n.payment_status)??"").trim().toUpperCase()==="PAID"?"paid":"placed"}function RO(n,e){const t=(e==null?void 0:e.strict)??TO(),r=(e==null?void 0:e.logger)||(()=>{}),s=Qa(n==null?void 0:n.status);if(Xg.has(s)){const o=(n==null?void 0:n.paymentMethod)??(n==null?void 0:n.payment_mode)??(n==null?void 0:n.paymentMode),c=o==null?"":String(o).trim().toUpperCase();if(s==="pending_payment"&&String((n==null?void 0:n.paymentStatus)??"").toUpperCase()==="PAID")return r("state mismatch: pending_payment with PAID paymentStatus",{status:s,paymentStatus:n==null?void 0:n.paymentStatus}),t&&r("strict mode: normalized persisted pending_payment+PAID to paid",{paymentMethod:c||null}),c==="STRIPE"?"paid":s;if(s==="placed"){const u=(n==null?void 0:n.paymentStatus)??(n==null?void 0:n.payment_status),f=!(c==="STRIPE")&&!(c==="ONLINE"),g=c==="SCANNER";let I="";u==null||u===""?(f||g)&&(n.paymentStatus="NOT_APPLICABLE",I="NOT_APPLICABLE"):I=String(u).trim().toUpperCase(),I==="NOT_APPLICABLE"||I==="COD_PENDING"||(f||g)&&(I==="PENDING"||I==="PAID")||(r("state mismatch: placed requires paymentStatus NOT_APPLICABLE or COD_PENDING (legacy COD PENDING accepted)",{status:s,paymentStatus:n==null?void 0:n.paymentStatus,paymentMethod:c||null}),t&&r("strict mode: tolerated placed mismatch for read normalization",{paymentMethod:c||null}))}return xu(n,s)}const i=[n==null?void 0:n.orderStatus,n==null?void 0:n.order_status,n==null?void 0:n.stage].map(Qa).filter(Boolean);for(const o of i){const c=Xg.has(o)?o:SO[o];if(c)return r("legacy status mapped",{source:o,mapped:c}),xu(n,c)}if(r("unknown order status token",{status:n==null?void 0:n.status,orderStatus:n==null?void 0:n.orderStatus,order_status:n==null?void 0:n.order_status,stage:n==null?void 0:n.stage}),t)throw new Error("Invalid persisted order state");return xu(n,"paid")}const M1={COD:"COD",SCANNER:"SCANNER",STRIPE:"STRIPE"};function Ro(n){const e={...n},t=e.paymentMethod??e.payment_method,r=e.paymentMode??e.payment_mode;let s=t;(s==null||String(s).trim()===""||String(s).toUpperCase()==="NULL")&&(s=r??"COD"),String(s).toUpperCase()==="CASH"&&(s="COD"),e.paymentMethod=s;let i=e.paymentStatus??e.payment_status;return(i==null||String(i).trim()===""||String(i).toUpperCase()==="NULL")&&(i=s==="COD"||s==="CASH"?"COD_PENDING":"PENDING"),(s==="COD"||s==="CASH")&&i==="PENDING"&&(i="COD_PENDING"),e.paymentStatus=i,e}function so(n){const e=Ro(n||{});return RO(e,{strict:typeof process<"u",logger:(t,r)=>console.warn("[orderStateMachine]",t,r||{})})}function PO(n){const e=bO(n,"admin");return e.includes("preparing")?"preparing":e.includes("ready_for_pickup")?"ready_for_pickup":e[0]||null}function _E(n){const e=String(n||"").trim().toUpperCase().replace(/\s+/g,"_");return e==="CANCELLED"||e==="CANCELED"?"cancelled":e==="CONFIRMED"||e==="PREPARING"?"preparing":e==="READY"?"ready_for_pickup":e==="PLACED"?"placed":e==="PENDING"?"paid":e==="OUT_FOR_DELIVERY"||e==="DELIVERING"||e==="ON_THE_WAY"?"out_for_delivery":e==="DELIVERED"||e==="COMPLETE"||e==="COMPLETED"?"delivered":String(n||"").trim().toLowerCase().replace(/\s+/g,"_")}const CO=Object.freeze(["LOCAL","DUAL_READ","SHARED"]);function Zg(n){const e=String(n??"").trim().toUpperCase();return e&&CO.includes(e)?e:null}function xO(n){const e=Zg(n==null?void 0:n.forceModeRaw);if(e)return e;const t=Zg(n==null?void 0:n.modeRaw);return t||(n==null?void 0:n.defaultMode)}const kO=1;function DO(n){const e=String(n??"").trim().toLowerCase();return e==="paid"||e==="placed"}function F1(n){const e=so(typeof n=="object"&&n!==null?n:{status:n});return PO(e)}function gd(n){const e=n.paymentMethod??n.payment_method??n.paymentMode??n.payment_mode??"cod";return String(e).toLowerCase().trim()}function NO(n){const e=n==null?void 0:n.paidAt;return e!=null&&e!==""}function OO(n){if(String(n.paymentStatus??n.payment_status??"").trim().toUpperCase()==="PAID"||NO(n))return!0;const t=String(n.paymentMethod??n.payment_mode??"").trim().toUpperCase();return t==="COD"||t==="CASH"?!1:String(n.status??"").trim().toLowerCase()==="paid"}function yE(n){const e=String(n.paymentStatus??"").trim(),t=e.toLowerCase();let r;if(t==="paid"||e==="PAID")r="PAID";else if(t==="not_applicable"||e==="NOT_APPLICABLE")r="NOT_APPLICABLE";else if(t==="pending_verification"||e==="PENDING_VERIFICATION")r="PENDING_VERIFICATION";else if(t==="failed")r="FAILED";else{const i=String(n.payment_status??"").trim().toLowerCase();i==="paid"?r="PAID":r="PENDING"}return gd(n)==="cod"?r==="PENDING"||r==="PAID"?r:"NOT_APPLICABLE":r}function VO(n,e){return n?"SETTLED":e==="FAILED"?"FAILED":e==="NOT_APPLICABLE"?"NOT_APPLICABLE":e==="PENDING_VERIFICATION"?"PENDING_VERIFICATION":"UNSETTLED"}function LO(n){return xO(n)}function MO(n,e,t){const r=Ro(n&&typeof n=="object"?n:{}),s=gd(r),i=s==="cod",o=so(r),c=yE(r),u=OO(r),l=DO(o),d=String(o).trim().toUpperCase().replace(/-/g,"_"),f=VO(u,c);return{readModelVersion:e,modeUsed:t,canonicalStatus:o,paymentMethodNorm:s,paymentStatusNorm:c,isCOD:i,isSettled:u,isQueueEligible:l,uiStatus:d,financialStatus:f}}function FO(n,e){const t=kO,r=LO({modeRaw:e==null?void 0:e.modeUsed,defaultMode:"LOCAL"});return MO(n,t,r)}function UO(n){const e=gd(n);return e==="cod"||e==="phone"?{ok:!0}:yE(n)==="PAID"?{ok:!0}:{ok:!1,reason:"Payment must be verified (PAID) before confirming. Complete Stripe verification or mark QR/online as PAID."}}function U1(n,e){if(e==="all")return!0;const t=FO(n),r=t.paymentMethodNorm,s=t.paymentStatusNorm;return e==="cod"?r==="cod":e==="stripe_paid"?(r==="stripe"||r==="paypal")&&s==="PAID":e==="qr_pending"?r==="qr"&&s!=="PAID":!0}function jO(n){const e=(n||"").trim().toLowerCase();return e?e.includes("order status")||e.includes("track order")||e.includes("where is my order")?"You can track your order in the Order Tracking screen.":e.includes("payment")||e.includes("pay now")||e.includes("stripe")?"Payments are processed securely via Stripe, COD, or QR where available.":e.includes("refund")?"Admin will review refund requests shortly.":/\bhello\b|^hi\b|^hey\b|\bhi!\b/.test(e)?"Hi 👋 How can we help you today?":null:null}function IE(n,e){try{}catch{}}function j1(n,e="+65"){const t=String(n||"").trim();if(!t)return"";const r=t.replace(/\s+/g,"");if(r.startsWith("+"))return r;const s=r.replace(/[^\d]/g,"");return s?s.startsWith("65")?`+${s}`:`${e}${s}`:""}const BO=new Set(["status","paymentStatus","paymentMethod"]);function GO(n){return!n||typeof n!="object"?!1:Object.keys(n).some(e=>{const t=String(e||"").split(".")[0];return BO.has(t)})}function ku(n,e=""){if(GO(n)){const t=e?` (${e})`:"";throw new Error(`Direct order lifecycle writes are disabled. Use transitionOrderStatus only.${t}`)}}const qO=/^(\/|https?:\/\/)/i,$O=n=>String(n||"").replace(/\s+/g,"_"),zO=(n="")=>n.toLowerCase().split(" ").filter(Boolean).map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" "),md=n=>{const e=typeof n=="string"?n.trim():"";return qO.test(e)?e:""},KO=n=>{const t=String(n||"").replace(/\.[^.]+$/,"").split("_").filter(Boolean),r=(t[0]||"Menu Item").replace(/[-]+/g," ").trim(),s=t.length>1?t[1]:"",i=zO(r||"Menu Item"),o=Number.parseFloat(String(s).replace(/[^0-9.]/g,""));return{name:i,price:Number.isFinite(o)?o:0}},_d=n=>{const e=er(yt(te,"categories"));return on(e,r=>{n(r.docs.map(s=>({id:s.id,...s.data()})))},r=>{console.error("Categories Subscription Error:",r)})},WO=async n=>{if(!ie.currentUser)throw new Error("Authentication required to add categories.");const e=n.id||`cat-${Date.now()}`;return await St(ye(te,"categories",e),{...n,id:e}),n},HO=(n,e)=>{if(!ie.currentUser)throw new Error("Authentication required to update categories.");return Rt(ye(te,"categories",n),e)},QO=async n=>{var e;if(!ie.currentUser)throw new Error("Authentication required to delete categories.");try{await Pc(ye(te,"categories",n))}catch(t){throw t.code==="permission-denied"?new Error(`Permission Denied: Your account (${(e=ie.currentUser)==null?void 0:e.email}) is NOT authorized in Firestore rules to delete categories.`):t}},JO=async()=>new Promise((n,e)=>{const t=pd({firestore:Xh,db:te,includeUnavailable:!0,orderByCreatedDesc:!0,onData:r=>{t(),n(r)},onError:r=>{t(),console.error("Failed to fetch products:",r),e(r)},onIndexWarning:r=>{console.warn("[fetchProducts] Missing index for categoryId + createdAt; fallback listener applied.",r)}})}),wE=(n,e=null)=>pd({firestore:Xh,db:te,categoryId:e,includeUnavailable:!0,orderByCreatedDesc:!0,onData:t=>n(t),onError:t=>{console.error("Products Subscription Error:",t)},onIndexWarning:t=>{console.warn("[admin dataService] Missing index for categoryId + createdAt; fallback listener applied.",t)}}),YO=async n=>{if(!ie.currentUser)throw new Error("Authentication required to add products.");const e=md(n.image||n.img||""),t=n.available!==void 0?!!n.available:!0,r=String(n.category||"").trim()||String(n.categoryId||"").trim()||"uncategorized",s=String(n.name||"").trim(),i=Number(n.price||0);if(!s)throw new Error("Product name is required.");if(!Number.isFinite(i)||i<0)throw new Error("Product price must be a valid non-negative number.");if(!e)throw new Error("Product image is required.");const o={name:s,price:i,image:e,category:r,available:t,createdAt:Mn(),updatedAt:Mn()};return{id:(await Qh(yt(te,"products"),o)).id,...o}},XO=(n,e)=>{if(!ie.currentUser)throw new Error("Authentication required to update products.");const t=md(e.image||e.img||""),r=e.available!==void 0?!!e.available:!0,s=String(e.category||"").trim()||String(e.categoryId||"").trim()||"uncategorized",i=String(e.name||"").trim(),o=Number(e.price||0);if(!i)throw new Error("Product name is required.");if(!Number.isFinite(o)||o<0)throw new Error("Product price must be a valid non-negative number.");if(!t)throw new Error("Product image is required.");return Rt(ye(te,"products",n),{name:i,price:o,image:t,category:s,available:r,updatedAt:Mn()})},ZO=async n=>{var e,t;if(!ie.currentUser)throw new Error("Authentication required to delete products.");try{const r=ye(te,"products",n),s=await sn(r);if(s.exists()){const i=s.data(),o=i.image||i.img;if(o&&(o.includes("firebasestorage.googleapis.com")||o.startsWith("gs://")))try{const c=Lw(hE,o);await Vw(c)}catch(c){console.warn("⚠️ Storage image delete failed (Product):",c.message)}}return`${n}${(e=ie.currentUser)==null?void 0:e.email}`,await Pc(r),!0}catch(r){throw console.error("Delete Product Error:",r.code,r.message),r.code==="permission-denied"?new Error(`Permission Denied: You (${((t=ie.currentUser)==null?void 0:t.email)||"unauthenticated"}) do not have rights to delete products.`):r}},eV=async()=>{if(!ie.currentUser)throw new Error("Authentication required to repair product images.");const e=await Js(Ys,"repairProductImages")({});return e.data,e.data},B1=async n=>{if(!ie.currentUser)throw new Error("Authentication required.");return(await Js(Ys,"deleteCustomerAccount")({uid:n})).data},G1=async({dryRun:n=!0,previewLimit:e=100}={})=>{if(!ie.currentUser)throw new Error("Authentication required.");return(await Js(Ys,"migrateProductImagePaths")({dryRun:n,previewLimit:e})).data},tV=async n=>{if(!ie.currentUser)throw new Error("Authentication required.");const e=String(n||ie.currentUser.uid||"").trim();if(!e)throw new Error("Missing uid.");const r=await Js(Ys,"makeUserAdmin")({uid:e});return await ie.currentUser.getIdToken(!0),r.data},EE=n=>({...n.data(),id:n.id}),q1=n=>{const e=(n==null?void 0:n.items)??(n==null?void 0:n.lineItems)??[];return Array.isArray(e)?e.map(t=>{const r=Number((t==null?void 0:t.qty)??(t==null?void 0:t.quantity)??1),s=Number.isFinite(r)&&r>0?Math.min(999,Math.floor(r)):1,i=String((t==null?void 0:t.name)??(t==null?void 0:t.title)??(t==null?void 0:t.productName)??"Item").trim()||"Item";return{qty:s,name:i}}):[]},nV=async n=>{throw new Error("Direct client order writes are disabled. Use backend callable order creation.")},rV=async()=>{try{const n=er(yt(te,"orders"),qr("createdAt","desc"));return(await qa(n)).docs.map(EE).map(Ro)}catch(n){throw IE("Failed to fetch orders",{error:(n==null?void 0:n.message)||n,code:n==null?void 0:n.code}),console.error("Failed to fetch orders:",n),n}},TE=n=>{const e=er(yt(te,"orders"),qr("createdAt","desc"));return on(e,r=>{const i=r.docs.map(EE).map(Ro);n(i)},r=>{IE("Orders Subscription Error",{error:(r==null?void 0:r.message)||r,code:r==null?void 0:r.code}),console.error("Orders Subscription Error:",r)})},sV=async n=>{try{const e=ye(te,"orders",n),t=await sn(e);if(t.exists()){const r={id:t.id,...t.data()};return Ro(r)}throw new Error("Order not found")}catch(e){throw console.error("Failed to fetch order:",e),e}},iV=async(n,e,t={})=>{const r=ye(te,"orders",n),s=await sn(r);if(!s.exists())throw new Error("Order not found");const i={id:n,...s.data()},o=String(e||"").trim().toLowerCase().replace(/[\s-]+/g,"_"),u={confirmed:"preparing",pending:"preparing",preparing:"preparing",ready:"ready_for_pickup"}[o]??_E(e);await oV(n,i,u)};async function wl(n,{toStatus:e,metadata:t={}}){await Js(Ys,"transitionOrderStatus")({orderId:n,nextStatus:e,metadata:t})}const oV=async(n,e,t)=>{if(!ie.currentUser)throw new Error("Authentication required");const r=_E(t),s=so(e);if(r==="preparing"&&s==="paid"){const i=UO(e);if(!i.ok)throw new Error(i.reason)}await wl(n,{toStatus:r,metadata:{source:"advanceOrderPipeline"}})},$1=async(n,e)=>{if(!ie.currentUser)throw new Error("Authentication required");const t=ye(te,"orders",n),r=await sn(t);if(!r.exists())throw new Error("Order not found");const s=r.data(),i=so(s),o=s.rider||{},c=new Date().toISOString();if(e==="accept"){if(i!=="ready_for_pickup")throw new Error("Rider accept only when order is ready_for_pickup");if(o.legStatus!=="OFFERED"&&!s.assignedDriverId)throw new Error("Assign a rider first");await wl(n,{toStatus:"out_for_delivery",metadata:{source:"advanceRiderLeg",leg:"accept"}});const u={assignedDriverId:ie.currentUser.uid,assignedRiderName:ie.currentUser.displayName||ie.currentUser.email||"Driver",rider:{...o,id:ie.currentUser.uid,legStatus:"ACCEPTED",acceptedAt:c},updatedAt:c};ku(u,"dataService.advanceRiderLeg.accept"),await Rt(t,u);return}if(e==="pickup"){if(i!=="out_for_delivery")throw new Error("Pick up only when out_for_delivery");const u={rider:{...o,legStatus:"PICKED_UP",pickedUpAt:c},updatedAt:c};ku(u,"dataService.advanceRiderLeg.pickup"),await Rt(t,u);return}if(e==="deliver"){if(i!=="out_for_delivery")throw new Error("Deliver only when out_for_delivery");await wl(n,{toStatus:"delivered",metadata:{source:"advanceRiderLeg",leg:"deliver"}});const u={rider:{...o,legStatus:"COMPLETED",deliveredAt:c},updatedAt:c};ku(u,"dataService.advanceRiderLeg.deliver"),await Rt(t,u);return}throw new Error("Unknown rider action")},aV=async n=>{if(!ie.currentUser)throw new Error("Authentication required to delete orders.");return(await Js(Ys,"deleteOrderByAdmin")({orderId:n})).data},cV=async(n,e,t=null)=>{const r=`msg-${Date.now()}`,s=ye(yt(te,"orders",n,"messages"),r),i={...e,id:r,token:t,createdAt:new Date().toISOString(),read:!1};await St(s,i);const o=ye(te,"orders",n),c=await sn(o);if(c.exists()){const u=c.data();e.senderRole==="admin"?await Rt(o,{unreadCustomer:(u.unreadCustomer||0)+1}):await Rt(o,{unreadAdmin:(u.unreadAdmin||0)+1,lastGuestVerifyToken:t})}return i},uV=(n,e,t=null)=>{const r=yt(te,"orders",n,"messages");if(t)return console.warn("Customer live chat reading is disabled for security."),e([]),()=>{};const s=er(r,qr("createdAt","asc"));return on(s,i=>{e(i.docs.map(o=>({id:o.id,...o.data()})))})},lV=async(n,e,t=null)=>{const r=ye(te,"orders",n);e==="admin"&&await Rt(r,{unreadAdmin:0})},hV=async n=>{if(!ie.currentUser)return;const e=ye(te,"orders",n);await Rt(e,{isNewForAdmin:!1,unreadAdmin:0})},dV=n=>String(n||"").trim().slice(0,140);async function fV(n,e,t){const r=dV(t);e==="customer"?await St(n,{updatedAt:Mn(),lastPreview:r,lastMessage:r,lastSenderRole:e,unreadByAdmin:!0,unreadByUser:!1},{merge:!0}):e==="admin"?await St(n,{updatedAt:Mn(),lastPreview:r,lastMessage:r,lastSenderRole:e,unreadByUser:!0,unreadByAdmin:!1,resolved:!1},{merge:!0}):e==="bot"&&await St(n,{updatedAt:Mn(),lastPreview:r,lastMessage:r,lastSenderRole:"bot"},{merge:!0})}const yd=async(n,{text:e,senderRole:t},r={})=>{const s=(e||"").trim();if(!s||!n)throw new Error("Invalid support message");const i=ye(te,"support_chats",n);if(await fV(i,t,s),await Qh(yt(te,"support_chats",n,"messages"),{text:s,senderRole:t,createdAt:Mn()}),t==="customer"&&!r.skipBot){const o=jO(s);o&&await yd(n,{text:o,senderRole:"bot"},{skipBot:!0})}},AE=(n,e)=>{if(!n)return()=>{};const t=er(yt(te,"support_chats",n,"messages"),qr("createdAt","asc"));return on(t,r=>e(r.docs.map(s=>({id:s.id,...s.data()}))),r=>console.error("Support chat messages subscription:",r))},pV=n=>{const e=er(yt(te,"support_chats"),qr("updatedAt","desc"));return on(e,t=>n(t.docs.map(r=>({id:r.id,...r.data()}))),t=>{console.error("Support inbox subscription:",t),n([])})},gV=async n=>{n&&await St(ye(te,"support_chats",n),{unreadByAdmin:!1},{merge:!0})},Id=n=>{const e=er(yt(te,"gallery"),qr("createdAt","desc"));return on(e,r=>{n(r.docs.map(s=>({id:s.id,...s.data()})))},r=>{console.error("Gallery Subscription Error:",r)})},mV=async n=>{if(!ie.currentUser)throw new Error("Authentication required to manage gallery.");const e=n.id||`gallery-${Date.now()}`,t={...n,id:e,createdAt:new Date().toISOString()};return await St(ye(te,"gallery",e),t),t},_V=(n,e)=>{if(!ie.currentUser)throw new Error("Authentication required to manage gallery.");return Rt(ye(te,"gallery",n),{...e,updatedAt:new Date().toISOString()})},yV=async n=>{var e,t;if(!ie.currentUser)throw new Error("Authentication required to manage gallery.");try{const r=ye(te,"gallery",n),s=await sn(r);if(s.exists()){const i=s.data();if(i.url&&(i.url.includes("firebasestorage.googleapis.com")||i.url.startsWith("gs://")))try{const o=Lw(hE,i.url);await Vw(o)}catch(o){console.warn("⚠️ Storage file delete failed (Gallery):",o.message)}}return`${n}${(e=ie.currentUser)==null?void 0:e.email}`,await Pc(r),!0}catch(r){throw console.error("Delete Gallery Item Error:",r.code,r.message),r.code==="permission-denied"?new Error(`Permission Denied: You (${((t=ie.currentUser)==null?void 0:t.email)||"unauthenticated"}) do not have rights to delete gallery items.`):r}},z1=()=>{try{return{categories:JSON.parse(localStorage.getItem("stm_categories")||"[]"),products:JSON.parse(localStorage.getItem("stm_products")||"[]"),orders:JSON.parse(localStorage.getItem("stm_orders")||"[]"),gallery:JSON.parse(localStorage.getItem("stm_gallery")||"[]")}}catch{return{categories:[],products:[],orders:[],gallery:[]}}},IV=async(n=!1)=>{if(!ie.currentUser)throw new Error("Authentication required to seed data.");const e=await JO(),t=new Set(e.map(f=>f.id)),r=await qa(yt(te,"categories")),s=new Set(r.docs.map(f=>f.id)),i=await qa(yt(te,"gallery")),o=new Set(i.docs.map(f=>f.id)),c=[],u={SNACKS:"snacks","BURGER KABABAB":"BURGER KABABAB",DINOSAUR:"DINOSAUR",DESERT:"desert","COLD DRINKS":"cold drinks","CAN DRINKS":"CAN DRINKS","INDIAN FOOD":"indian food",SUGARCANE:"SUGARCANE",HOT:"HOT",SIDES:"sides"};Object.keys(Ha).forEach(f=>{Ha[f].forEach((g,I)=>{const b=KO(g),P=b.name,k=b.price,j={SNACKS:"snacks","BURGER KABABAB":"burgers-kebabs",DINOSAUR:"dinosaur",DESERT:"desserts","COLD DRINKS":"cold-drinks","CAN DRINKS":"can-drinks","INDIAN FOOD":"indian",SUGARCANE:"sugarcane",HOT:"hot-drinks",SIDES:"sides"}[f]||"snacks",U=Wg.find(Q=>Q.id===j),z=u[f]||f,K=`stm-prod-${f.substring(0,3).toLowerCase()}-${I}`;if(!t.has(K)){const Q=md(encodeURI(`/assets/SMT_FOOD/${$O(z)}/${g}`));c.push({id:K,name:P,price:k,categoryId:j,category:U?U.name:f,badge:I%5===0?"bestseller":"",available:!0,image:Q,img:Q})}})});let l=0;for(const f of Wg){const g=f.id;s.has(g)||(await St(ye(te,"categories",g),{...f,id:g,active:!0,icon:f.icon||f.emoji||"🍽️",order:f.order||l+1}),l++)}for(const f of c){const g=new Date().toISOString();await St(ye(te,"products",f.id),{...f,createdAt:g,updatedAt:g})}let d=0;try{const{galleryMedia:f}=await Ge(async()=>{const{galleryMedia:g}=await Promise.resolve().then(()=>BV);return{galleryMedia:g}},void 0,import.meta.url);for(const[g,I]of f.entries()){const b=`gallery-seed-${g}`;if(!o.has(b)){const P=I.toLowerCase().endsWith(".mp4")||I.toLowerCase().endsWith(".mov");await St(ye(te,"gallery",b),{id:b,url:`/aboutusimage/${I}`,type:P?"video":"image",title:I.replace(/_/g," ").split(".")[0].substring(0,20),active:!0,createdAt:new Date().toISOString()}),d++}}}catch(f){console.warn("Gallery seeding skip:",f)}return{categories:l,products:c.length,orders:0,gallery:d}},wV=async()=>{const n=await rV();return{totalOrders:n.length,totalRevenue:n.reduce((e,t)=>e+parseFloat(t.total||0),0).toFixed(2),popularItems:["Teh Tarik Special","Nasi Lemak"],recentOrders:n.slice(0,5)}};let vE=[],El=[],bE=[],SE=[];const wd=()=>window.dispatchEvent(new Event("stm_data_updated"));_d(n=>{vE=n,wd()});wE(n=>{El=n,wd()});TE(n=>{bE=n});Id(n=>{SE=n,wd()});const K1={getCategories:()=>[...vE],getProducts:()=>[...El],getProductsByCategory:n=>El.filter(e=>e.categoryId===n),getOrders:()=>[...bE],getGallery:()=>[...SE],addCategory:WO,updateCategory:HO,deleteCategory:QO,addProduct:YO,updateProduct:XO,deleteProduct:ZO,repairProductImages:eV,bootstrapAdminClaim:tV,placeOrder:nV,updateOrderStatus:iV,deleteOrder:aV,addGalleryItem:mV,updateGalleryItem:_V,deleteGalleryItem:yV,subscribeCategories:_d,subscribeProducts:wE,subscribeOrders:TE,subscribeGallery:Id,fetchOrderById:sV,getDashboardStats:wV,seedFromLocalStorage:IV,sendMessage:cV,subscribeMessages:uV,markMessagesAsRead:lV,markOrderAsSeen:hV,sendSupportChatMessage:yd,subscribeSupportChatMessages:AE,subscribeSupportInbox:pV,markSupportChatReadByAdmin:gV};function EV({conversationId:n,role:e="customer"}){const[t,r]=G.useState([]),[s,i]=G.useState(""),[o,c]=G.useState(!1),u=G.useRef(null);G.useEffect(()=>{if(!n)return;const f=AE(n,r);return()=>f()},[n]),G.useEffect(()=>{u.current&&(u.current.scrollTop=u.current.scrollHeight)},[t]);const l=async f=>{if(f.preventDefault(),!(!s.trim()||o||!n)){c(!0);try{await yd(n,{text:s.trim(),senderRole:e}),i("")}catch(g){console.error("Support chat send failed:",g),alert("Could not send message. Check your connection or try again.")}finally{c(!1)}}},d=e==="admin"?"Customer":"STM team";return _.jsxs("div",{style:{display:"flex",flexDirection:"column",height:"100%",minHeight:280,background:"#f8fafc"},children:[_.jsx("div",{ref:u,style:{flex:1,padding:"16px",overflowY:"auto",display:"flex",flexDirection:"column",gap:"12px"},children:t.length===0?_.jsxs("div",{style:{margin:"auto",textAlign:"center",padding:"16px",maxWidth:280},children:[_.jsx("div",{style:{fontWeight:900,color:"var(--green-dark)",marginBottom:8,fontSize:14},children:e==="customer"?"Message the team":"Reply to customer"}),_.jsx("p",{style:{fontSize:12,color:"#64748b",lineHeight:1.5,fontWeight:600},children:e==="customer"?"Staff see this inbox in Admin → Support. Replies appear here in real time.":"Your messages appear on the customer’s screen instantly."})]}):t.map(f=>{var b;const g=f.senderRole==="bot",I=f.senderRole===e;return _.jsxs("div",{style:{alignSelf:I?"flex-end":"flex-start",maxWidth:"88%",display:"flex",flexDirection:"column",alignItems:I?"flex-end":"flex-start"},children:[_.jsx("div",{style:{padding:"10px 14px",borderRadius:I?"16px 16px 4px 16px":"16px 16px 16px 4px",background:I?"var(--green-dark)":g?"rgba(212,175,55,0.08)":"white",color:I?"white":g?"#B8860B":"#0f172a",boxShadow:"0 2px 8px rgba(0,0,0,0.04)",border:I?"none":`1px solid ${g?"rgba(212,175,55,0.3)":"#e2e8f0"}`,fontSize:14,lineHeight:1.45,fontWeight:600,whiteSpace:"pre-wrap"},children:f.text}),_.jsxs("div",{style:{marginTop:4,fontSize:10,color:"#94a3b8",fontWeight:700,display:"flex",alignItems:"center",gap:4},children:[I?e==="admin"?_.jsx(IT,{size:10}):_.jsx(hs,{size:10}):g?null:_.jsx(hs,{size:10}),I?"You":g?"Auto-reply":d,_.jsx(om,{size:10}),(b=f.createdAt)!=null&&b.toDate?f.createdAt.toDate().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):f.createdAt?new Date(f.createdAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):""]})]},f.id)})}),_.jsxs("form",{onSubmit:l,style:{padding:"12px 14px",background:"white",borderTop:"1px solid #e2e8f0",display:"flex",gap:8,alignItems:"center"},children:[_.jsx("input",{type:"text",value:s,onChange:f=>i(f.target.value),placeholder:e==="customer"?"Message the team…":"Reply…",style:{flex:1,padding:"12px 14px",borderRadius:12,border:"1.5px solid #e2e8f0",background:"#f8fafc",fontSize:14,outline:"none",fontWeight:600}}),_.jsx("button",{type:"submit",disabled:!s.trim()||o,style:{width:44,height:44,borderRadius:12,background:"var(--green-dark)",color:"white",border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:!s.trim()||o?"not-allowed":"pointer",opacity:!s.trim()||o?.55:1},children:_.jsx(am,{size:18})})]})]})}function TV(){try{let n=localStorage.getItem("stm_support_conv_id");return n||(n=`sc-${crypto.randomUUID()}`,localStorage.setItem("stm_support_conv_id",n)),n}catch{return`sc-${Date.now()}`}}function AV(){const[n,e]=G.useState(!1),[t,r]=G.useState("ai"),s=G.useMemo(()=>TV(),[]);G.useEffect(()=>{const f=g=>{var b;e(!0);const I=(b=g.detail)==null?void 0:b.tab;r(I==="ai"||I==="team"?I:"team")};return window.addEventListener(Wa,f),()=>window.removeEventListener(Wa,f)},[]);const[i,o]=G.useState(()=>[{id:"w",role:"assistant",text:Qg("")}]),[c,u]=G.useState(""),l=G.useRef(null);G.useEffect(()=>{l.current&&(l.current.scrollTop=l.current.scrollHeight)},[i,n,t]);const d=f=>{const g=(f||"").trim();if(!g)return;const I={id:`u-${Date.now()}`,role:"user",text:g},b={id:`a-${Date.now()}`,role:"assistant",text:Qg(g)};o(P=>[...P,I,b]),u("")};return _.jsxs(_.Fragment,{children:[_.jsx(Er.button,{type:"button","aria-label":"Open help & chat",onClick:()=>e(!0),style:{position:"fixed",bottom:"calc(85px + env(safe-area-inset-bottom))",left:"20px",width:56,height:56,borderRadius:"50%",border:"none",background:"linear-gradient(135deg, #013220 0%, #056a48 100%)",color:"white",boxShadow:"0 10px 30px rgba(1,50,32,0.35)",zIndex:9992,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"},initial:{scale:0,opacity:0},animate:{scale:1,opacity:1},whileHover:{scale:1.06},whileTap:{scale:.94},children:_.jsx(ds,{size:26,strokeWidth:2.2})}),_.jsx(rm,{children:n&&_.jsxs(Er.div,{initial:{opacity:0,y:20,scale:.96},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:16,scale:.96},transition:{type:"spring",damping:26,stiffness:320},style:{position:"fixed",bottom:"calc(150px + env(safe-area-inset-bottom))",left:"20px",width:"min(400px, calc(100vw - 40px))",height:"min(560px, calc(100vh - 180px))",background:"white",borderRadius:24,boxShadow:"0 25px 60px rgba(0,0,0,0.18)",zIndex:9993,display:"flex",flexDirection:"column",overflow:"hidden",border:"1px solid #e2e8f0"},children:[_.jsxs("div",{style:{padding:"16px 18px",background:"var(--green-dark)",color:"white",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12},children:[_.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[_.jsx("div",{style:{width:40,height:40,borderRadius:12,background:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center"},children:_.jsx(wT,{size:22})}),_.jsxs("div",{children:[_.jsx("div",{style:{fontWeight:900,fontSize:15},children:"STM Help"}),_.jsx("div",{style:{fontSize:11,opacity:.85,fontWeight:600},children:"AI answers · Live team"})]})]}),_.jsx("button",{type:"button",onClick:()=>e(!1),style:{background:"none",border:"none",color:"white",cursor:"pointer",padding:8},children:_.jsx(sm,{size:22})})]}),_.jsxs("div",{style:{display:"flex",padding:"10px 12px",gap:8,background:"#f1f5f9"},children:[_.jsxs("button",{type:"button",onClick:()=>r("ai"),style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"10px 12px",borderRadius:14,border:"none",fontWeight:800,fontSize:13,cursor:"pointer",background:t==="ai"?"white":"transparent",color:t==="ai"?"var(--green-dark)":"#64748b",boxShadow:t==="ai"?"0 2px 8px rgba(0,0,0,0.06)":"none"},children:[_.jsx(ET,{size:16})," AI assistant"]}),_.jsxs("button",{type:"button",onClick:()=>r("team"),style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"10px 12px",borderRadius:14,border:"none",fontWeight:800,fontSize:13,cursor:"pointer",background:t==="team"?"white":"transparent",color:t==="team"?"var(--green-dark)":"#64748b",boxShadow:t==="team"?"0 2px 8px rgba(0,0,0,0.06)":"none"},children:[_.jsx(TT,{size:16})," Live team"]})]}),t==="ai"&&_.jsxs(_.Fragment,{children:[_.jsx("div",{ref:l,style:{flex:1,overflowY:"auto",padding:"14px 16px",display:"flex",flexDirection:"column",gap:12,background:"#fafafa"},children:i.map(f=>_.jsxs("div",{style:{alignSelf:f.role==="user"?"flex-end":"flex-start",maxWidth:"92%"},children:[_.jsx("div",{style:{padding:"12px 14px",borderRadius:f.role==="user"?"18px 18px 4px 18px":"18px 18px 18px 4px",background:f.role==="user"?"var(--green-dark)":"white",color:f.role==="user"?"white":"#0f172a",fontSize:13,lineHeight:1.5,fontWeight:600,whiteSpace:"pre-wrap",border:f.role==="user"?"none":"1px solid #e2e8f0",boxShadow:"0 2px 8px rgba(0,0,0,0.04)"},children:f.text.split("**").map((g,I)=>I%2===1?_.jsx("strong",{children:g},I):_.jsx("span",{children:g},I))}),_.jsx("div",{style:{fontSize:10,color:"#94a3b8",marginTop:4,fontWeight:700},children:f.role==="user"?"You":"AI assistant"})]},f.id))}),_.jsx("div",{style:{padding:"8px 12px 4px",display:"flex",flexWrap:"wrap",gap:6,background:"#fafafa"},children:dO.map(f=>_.jsx("button",{type:"button",onClick:()=>d(f),style:{fontSize:11,fontWeight:800,padding:"6px 10px",borderRadius:999,border:"1px solid #cbd5e1",background:"white",color:"#475569",cursor:"pointer"},children:f},f))}),_.jsxs("form",{onSubmit:f=>{f.preventDefault(),d(c)},style:{padding:12,display:"flex",gap:8,borderTop:"1px solid #e2e8f0",background:"white"},children:[_.jsx("input",{value:c,onChange:f=>u(f.target.value),placeholder:"Ask the assistant…",style:{flex:1,padding:"12px 14px",borderRadius:14,border:"1.5px solid #e2e8f0",fontSize:14,fontWeight:600}}),_.jsx("button",{type:"submit",disabled:!c.trim(),style:{width:46,height:46,borderRadius:14,border:"none",background:"var(--green-dark)",color:"white",cursor:c.trim()?"pointer":"not-allowed",opacity:c.trim()?1:.5,display:"flex",alignItems:"center",justifyContent:"center"},children:_.jsx(am,{size:18})})]})]}),t==="team"&&_.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",minHeight:0},children:[_.jsxs("div",{style:{fontSize:11,color:"#64748b",padding:"8px 14px",fontWeight:700,background:"rgba(212,175,55,0.08)",borderBottom:"1px solid rgba(212,175,55,0.3)"},children:["Thread ID: ",_.jsxs("code",{style:{fontSize:10},children:[s.slice(0,18),"…"]})," — staff reply from Admin → Support."]}),_.jsx(EV,{conversationId:s,role:"customer"})]})]})})]})}/*! Capacitor: https://capacitorjs.com/ - MIT License */var Vr;(function(n){n.Unimplemented="UNIMPLEMENTED",n.Unavailable="UNAVAILABLE"})(Vr||(Vr={}));class ma extends Error{constructor(e,t,r){super(e),this.message=e,this.code=t,this.data=r}}const vV=n=>{var e,t;return n!=null&&n.androidBridge?"android":!((t=(e=n==null?void 0:n.webkit)===null||e===void 0?void 0:e.messageHandlers)===null||t===void 0)&&t.bridge?"ios":"web"},bV=n=>{const e=n.CapacitorCustomPlatform||null,t=n.Capacitor||{},r=t.Plugins=t.Plugins||{},s=()=>e!==null?e.name:vV(n),i=()=>s()!=="web",o=f=>{const g=l.get(f);return!!(g!=null&&g.platforms.has(s())||c(f))},c=f=>{var g;return(g=t.PluginHeaders)===null||g===void 0?void 0:g.find(I=>I.name===f)},u=f=>n.console.error(f),l=new Map,d=(f,g={})=>{const I=l.get(f);if(I)return console.warn(`Capacitor plugin "${f}" already registered. Cannot register plugins twice.`),I.proxy;const b=s(),P=c(f);let k;const V=async()=>(!k&&b in g?k=typeof g[b]=="function"?k=await g[b]():k=g[b]:e!==null&&!k&&"web"in g&&(k=typeof g.web=="function"?k=await g.web():k=g.web),k),j=(y,w)=>{var v,A;if(P){const R=P==null?void 0:P.methods.find(E=>w===E.name);if(R)return R.rtype==="promise"?E=>t.nativePromise(f,w.toString(),E):(E,Pe)=>t.nativeCallback(f,w.toString(),E,Pe);if(y)return(v=y[w])===null||v===void 0?void 0:v.bind(y)}else{if(y)return(A=y[w])===null||A===void 0?void 0:A.bind(y);throw new ma(`"${f}" plugin is not implemented on ${b}`,Vr.Unimplemented)}},U=y=>{let w;const v=(...A)=>{const R=V().then(E=>{const Pe=j(E,y);if(Pe){const It=Pe(...A);return w=It==null?void 0:It.remove,It}else throw new ma(`"${f}.${y}()" is not implemented on ${b}`,Vr.Unimplemented)});return y==="addListener"&&(R.remove=async()=>w()),R};return v.toString=()=>`${y.toString()}() { [capacitor code] }`,Object.defineProperty(v,"name",{value:y,writable:!1,configurable:!1}),v},z=U("addListener"),K=U("removeListener"),Q=(y,w)=>{const v=z({eventName:y},w),A=async()=>{const E=await v;K({eventName:y,callbackId:E},w)},R=new Promise(E=>v.then(()=>E({remove:A})));return R.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await A()},R},T=new Proxy({},{get(y,w){switch(w){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return P?Q:z;case"removeListener":return K;default:return U(w)}}});return r[f]=T,l.set(f,{name:f,proxy:T,platforms:new Set([...Object.keys(g),...P?[b]:[]])}),T};return t.convertFileSrc||(t.convertFileSrc=f=>f),t.getPlatform=s,t.handleError=u,t.isNativePlatform=i,t.isPluginAvailable=o,t.registerPlugin=d,t.Exception=ma,t.DEBUG=!!t.DEBUG,t.isLoggingEnabled=!!t.isLoggingEnabled,t},SV=n=>n.Capacitor=bV(n),wr=SV(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),Xs=wr.registerPlugin;class Dc{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,t){let r=!1;this.listeners[e]||(this.listeners[e]=[],r=!0),this.listeners[e].push(t);const i=this.windowListeners[e];i&&!i.registered&&this.addWindowListener(i),r&&this.sendRetainedArgumentsForEvent(e);const o=async()=>this.removeListener(e,t);return Promise.resolve({remove:o})}async removeAllListeners(){this.listeners={};for(const e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t,r){const s=this.listeners[e];if(!s){if(r){let i=this.retainedEventArguments[e];i||(i=[]),i.push(t),this.retainedEventArguments[e]=i}return}s.forEach(i=>i(t))}hasListeners(e){var t;return!!(!((t=this.listeners[e])===null||t===void 0)&&t.length)}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:r=>{this.notifyListeners(t,r)}}}unimplemented(e="not implemented"){return new wr.Exception(e,Vr.Unimplemented)}unavailable(e="not available"){return new wr.Exception(e,Vr.Unavailable)}async removeListener(e,t){const r=this.listeners[e];if(!r)return;const s=r.indexOf(t);this.listeners[e].splice(s,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){const t=this.retainedEventArguments[e];t&&(delete this.retainedEventArguments[e],t.forEach(r=>{this.notifyListeners(e,r)}))}}const RV=Xs("WebView"),em=n=>encodeURIComponent(n).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),tm=n=>n.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class PV extends Dc{async getCookies(){const e=document.cookie,t={};return e.split(";").forEach(r=>{if(r.length<=0)return;let[s,i]=r.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");s=tm(s).trim(),i=tm(i).trim(),t[s]=i}),t}async setCookie(e){try{const t=em(e.key),r=em(e.value),s=e.expires?`; expires=${e.expires.replace("expires=","")}`:"",i=(e.path||"/").replace("path=",""),o=e.url!=null&&e.url.length>0?`domain=${e.url}`:"";document.cookie=`${t}=${r||""}${s}; path=${i}; ${o};`}catch(t){return Promise.reject(t)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(t){return Promise.reject(t)}}async clearCookies(){try{const e=document.cookie.split(";")||[];for(const t of e)document.cookie=t.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}}const CV=Xs("CapacitorCookies",{web:()=>new PV}),xV=async n=>new Promise((e,t)=>{const r=new FileReader;r.onload=()=>{const s=r.result;e(s.indexOf(",")>=0?s.split(",")[1]:s)},r.onerror=s=>t(s),r.readAsDataURL(n)}),kV=(n={})=>{const e=Object.keys(n);return Object.keys(n).map(s=>s.toLocaleLowerCase()).reduce((s,i,o)=>(s[i]=n[e[o]],s),{})},DV=(n,e=!0)=>n?Object.entries(n).reduce((r,s)=>{const[i,o]=s;let c,u;return Array.isArray(o)?(u="",o.forEach(l=>{c=e?encodeURIComponent(l):l,u+=`${i}=${c}&`}),u.slice(0,-1)):(c=e?encodeURIComponent(o):o,u=`${i}=${c}`),`${r}&${u}`},"").substr(1):null,RE=(n,e={})=>{const t=Object.assign({method:n.method||"GET",headers:n.headers},e),s=kV(n.headers)["content-type"]||"";if(typeof n.data=="string")t.body=n.data;else if(s.includes("application/x-www-form-urlencoded")){const i=new URLSearchParams;for(const[o,c]of Object.entries(n.data||{}))i.set(o,c);t.body=i.toString()}else if(s.includes("multipart/form-data")||n.data instanceof FormData){const i=new FormData;if(n.data instanceof FormData)n.data.forEach((c,u)=>{i.append(u,c)});else for(const c of Object.keys(n.data))i.append(c,n.data[c]);t.body=i;const o=new Headers(t.headers);o.delete("content-type"),t.headers=o}else(s.includes("application/json")||typeof n.data=="object")&&(t.body=JSON.stringify(n.data));return t};class NV extends Dc{async request(e){const t=RE(e,e.webFetchExtra),r=DV(e.params,e.shouldEncodeUrlParams),s=r?`${e.url}?${r}`:e.url,i=await fetch(s,t),o=i.headers.get("content-type")||"";let{responseType:c="text"}=i.ok?e:{};o.includes("application/json")&&(c="json");let u,l;switch(c){case"arraybuffer":case"blob":l=await i.blob(),u=await xV(l);break;case"json":u=await i.json();break;case"document":case"text":default:u=await i.text()}const d={};return i.headers.forEach((f,g)=>{d[g]=f}),{data:u,headers:d,status:i.status,url:i.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:"GET"}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:"POST"}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:"PUT"}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:"PATCH"}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:"DELETE"}))}}const OV=Xs("CapacitorHttp",{web:()=>new NV});var Tl;(function(n){n.Dark="DARK",n.Light="LIGHT",n.Default="DEFAULT"})(Tl||(Tl={}));var Al;(function(n){n.StatusBar="StatusBar",n.NavigationBar="NavigationBar"})(Al||(Al={}));class VV extends Dc{async setStyle(){this.unavailable("not available for web")}async setAnimation(){this.unavailable("not available for web")}async show(){this.unavailable("not available for web")}async hide(){this.unavailable("not available for web")}}const LV=Xs("SystemBars",{web:()=>new VV}),W1=Object.freeze(Object.defineProperty({__proto__:null,Capacitor:wr,CapacitorCookies:CV,CapacitorException:ma,CapacitorHttp:OV,get ExceptionCode(){return Vr},get SystemBarType(){return Al},SystemBars:LV,get SystemBarsStyle(){return Tl},WebPlugin:Dc,WebView:RV,buildRequestInit:RE,registerPlugin:Xs},Symbol.toStringTag,{value:"Module"})),MV=Xs("SplashScreen",{web:()=>Ge(()=>import("./web-DjvKP0mA.js"),__vite__mapDeps([0,1,2,3,4]),import.meta.url).then(n=>new n.SplashScreenWeb)});function FV({children:n}){const e=bl(),t=vl(),{userProfile:r}=fd(),s=(r==null?void 0:r.role)==="rider",i=(r==null?void 0:r.role)==="admin",o=t.pathname.startsWith("/admin")||t.pathname.startsWith("/login")||t.pathname==="/mobile-role-select"||t.pathname.startsWith("/tracking"),c=[];return s?(c.push({id:"driver",icon:_.jsx(cm,{size:24}),path:"/driver",label:"Deliveries"}),c.push({id:"profile",icon:_.jsx(hs,{size:24}),path:"/profile",label:"Profile"})):i||(c.push({id:"home",icon:_.jsx(im,{size:24}),path:"/",label:"Home"}),c.push({id:"menu",icon:_.jsx(Ou,{size:24}),path:"/menu",label:"Menu"}),c.push({id:"profile",icon:_.jsx(hs,{size:24}),path:"/profile",label:"Profile"})),_.jsxs("div",{style:{display:"flex",flexDirection:"column",minHeight:"100vh",paddingBottom:o?"0":"70px"},children:[_.jsx("div",{style:{flex:1,position:"relative"},children:n}),!o&&c.length>0&&_.jsx("div",{style:{position:"fixed",bottom:0,left:0,right:0,height:"70px",background:"white",borderTop:"1px solid #e2e8f0",display:"flex",justifyContent:"space-around",alignItems:"center",paddingBottom:"env(safe-area-inset-bottom, 16px)",zIndex:9999,boxShadow:"0 -4px 6px -1px rgba(0, 0, 0, 0.05)"},children:c.map(u=>{const l=t.pathname===u.path;return _.jsxs("div",{onClick:()=>e(u.path),style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"4px",color:l?"#0A8754":"#94a3b8",cursor:"pointer",padding:"8px",flex:1},children:[Nu.cloneElement(u.icon,{color:l?"#0A8754":"#94a3b8",strokeWidth:l?2.5:2}),_.jsx("span",{style:{fontSize:"11px",fontWeight:l?"700":"500"},children:u.label})]},u.id)})})]})}function UV(){const n=bl(),e=[{id:"customer",title:"Order Food",description:"I want to order food and track deliveries",icon:_.jsx(AT,{size:32,color:"#0A8754"}),route:"/login",color:"rgba(10, 135, 84, 0.1)"},{id:"rider",title:"Rider Partner",description:"I am a delivery rider",icon:_.jsx(cm,{size:32,color:"#D4AF37"}),route:"/login?role=rider",color:"rgba(245, 158, 11, 0.1)"},{id:"admin",title:"Restaurant Admin",description:"Manage orders and kitchen",icon:_.jsx(vT,{size:32,color:"#dc2626"}),route:"/login?role=admin",color:"rgba(220, 38, 38, 0.1)"}];return _.jsxs("div",{style:{minHeight:"100vh",background:"linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",padding:"24px",display:"flex",flexDirection:"column",justifyContent:"center",color:"white"},children:[_.jsxs(Er.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{duration:.5},style:{textAlign:"center",marginBottom:"40px"},children:[_.jsx("img",{src:"/stmsalamlogo.png",alt:"STM Salam",style:{width:"120px",marginBottom:"16px",borderRadius:"50%"}}),_.jsx("h1",{style:{fontSize:"28px",fontWeight:"800",margin:"0 0 8px 0"},children:"Welcome to STM"}),_.jsx("p",{style:{color:"#94a3b8",margin:0},children:"Select your portal to continue"})]}),_.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:e.map((t,r)=>_.jsxs(Er.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{duration:.3,delay:r*.1},whileTap:{scale:.98},onClick:()=>n(t.route),style:{background:"rgba(255, 255, 255, 0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"20px",padding:"20px",display:"flex",alignItems:"center",gap:"16px",cursor:"pointer"},children:[_.jsx("div",{style:{width:"60px",height:"60px",borderRadius:"16px",background:t.color,display:"flex",alignItems:"center",justifyContent:"center"},children:t.icon}),_.jsxs("div",{children:[_.jsx("div",{style:{fontSize:"18px",fontWeight:"700",marginBottom:"4px"},children:t.title}),_.jsx("div",{style:{fontSize:"13px",color:"#94a3b8"},children:t.description})]})]},t.id))})]})}function jV(){const[n,e]=G.useState(0);return G.useEffect(()=>{const t=setTimeout(()=>e(1),50);return()=>clearTimeout(t)},[]),_.jsxs("div",{style:{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",background:"#143E32",opacity:n,transition:"opacity 0.5s ease-in-out",padding:"24px",textAlign:"center"},children:[_.jsx("div",{style:{marginBottom:"32px"},children:_.jsx("img",{src:"/stmsalamlogo.png",alt:"STM Salam Logo",style:{width:"150px",height:"150px",objectFit:"contain"}})}),_.jsx("h1",{style:{color:"#D4AF37",fontSize:"28px",fontWeight:"900",margin:"0 0 8px 0",letterSpacing:"1px"},children:"STM Salam"}),_.jsx("p",{style:{color:"#E6C200",fontSize:"16px",fontWeight:"500",margin:0,opacity:.9,letterSpacing:"0.5px"},children:"Fast Delivery Services"}),_.jsx("div",{style:{marginTop:"48px"},children:_.jsx("div",{style:{width:"32px",height:"32px",border:"3px solid rgba(212, 175, 55, 0.2)",borderTopColor:"#D4AF37",borderRadius:"50%",animation:"spin 1s linear infinite"}})}),_.jsx("style",{children:`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `})]})}const PE=["tehtarik_premium.png","burger_bg.png","juice_bg.png","Heritage.png","v1.mp4","v2.mp4","v3.mp4","WhatsApp_Image_2026_04_08_at_10.56.53_PM.jpeg","WhatsApp_Image_2026_04_08_at_10.57.21_PM.jpeg","WhatsApp_Image_2026_04_08_at_8.22.51_PM.jpeg","WhatsApp_Image_2026_04_08_at_8.22.59_PM.jpeg","WhatsApp_Image_2026_04_08_at_8.26.13_PM.jpeg","WhatsApp_Image_2026_04_08_at_8.33.52_PM.jpeg","WhatsApp_Image_2026_04_08_at_8.34.04_PM.jpeg","WhatsApp_Image_2026_04_08_at_8.34.35_PM.jpeg","WhatsApp_Image_2026_04_08_at_8.34.50_PM.jpeg","WhatsApp_Image_2026_04_08_at_8.36.05_PM.jpeg","WhatsApp_Image_2026_04_08_at_8.42.54_PM.jpeg","WhatsApp_Image_2026_04_08_at_8.42.54_PM__1_.jpeg","WhatsApp_Image_2026_04_08_at_8.42.54_PM__2_.jpeg","WhatsApp_Image_2026_04_08_at_8.42.54_PM__3_.jpeg","WhatsApp_Image_2026_04_08_at_8.42.54_PM__4_.jpeg","WhatsApp_Image_2026_04_08_at_8.42.54_PM__5_.jpeg","WhatsApp_Image_2026_04_08_at_8.42.54_PM__6_.jpeg","WhatsApp_Video_2026_04_08_at_8.25.12_PM.mp4","WhatsApp_Video_2026_04_08_at_8.25.15_PM.mp4","WhatsApp_Video_2026_04_08_at_8.25.15_PM__1_.mp4","WhatsApp_Video_2026_04_08_at_8.31.20_PM.mp4"],BV=Object.freeze(Object.defineProperty({__proto__:null,galleryMedia:PE},Symbol.toStringTag,{value:"Module"})),GV={SNACKS:"snacks","BURGER KABABAB":"BURGER KABABAB",DINOSAUR:"DINOSAUR",DESERT:"desert","COLD DRINKS":"cold drinks","CAN DRINKS":"CAN DRINKS","INDIAN FOOD":"indian food",SUGARCANE:"SUGARCANE",HOT:"HOT",SIDES:"sides"},qV=n=>String(n||"").replace(/\s+/g,"_"),$V={SNACKS:"snacks","BURGER KABABAB":"burgers-kebabs",DINOSAUR:"dinosaur",DESERT:"desserts","COLD DRINKS":"cold-drinks","CAN DRINKS":"can-drinks","INDIAN FOOD":"indian",SUGARCANE:"sugarcane",HOT:"hot-drinks",SIDES:"sides"},zV=/(?:\(?SGD\s*\$?\s*\d+(?:\.\d+)?\)?|\$?\d+(?:\.\d+)?)/gi,KV=/\.(png|jpe?g|webp|gif)$/i,WV=new Set(["a","an","the","and","or","of","with","to","in","on","for","1","2","3","4","5","6","8","9","10","piece","pieces","pc","pcs","sgd","sdg","classic","original"]),CE=n=>(n||"").replace(KV,"").replace(/_/g," ").replace(zV," ").replace(/[()\[\]]/g," ").replace(/[^a-zA-Z0-9\s]/g," ").replace(/\s+/g," ").trim().toLowerCase(),Ed=n=>CE(n).split(" ").filter(e=>e.length>1&&!WV.has(e)),HV=n=>Ed(n).join(" "),Du=(()=>{const n=[];return Object.keys(Ha).forEach(e=>{const t=GV[e]||e,r=$V[e]||e.toLowerCase();for(const s of Ha[e]||[]){const i=CE(s);n.push({filename:s,path:encodeURI(`/assets/SMT_FOOD/${qV(t)}/${s}`),categoryId:r,cleanName:i,tokens:Ed(s),key:HV(s)})}}),n})();function QV(n){if(!n)return null;const e=n.name||"",t=Ed(e);if(t.length===0)return null;const r=new Set(t),s=t.join(" "),i=l=>{let d=0;for(const P of l.tokens)r.has(P)&&(d+=1);if(d===0)return 0;const f=l.key===s,g=l.key.includes(s)||s.includes(l.key),I=new Set([...r,...l.tokens]).size,b=d/I+d/t.length*.5;return f?b+2:g?b+.75:b};let o=null,c=0;const u=n.categoryId?Du.filter(l=>l.categoryId===n.categoryId):Du;for(const l of u){const d=i(l);d>c&&(o=l,c=d)}if(!o&&n.categoryId)for(const l of Du){const d=i(l);d>c&&(o=l,c=d)}return o&&c>=.15?o.path:null}function JV(n){const e=((n==null?void 0:n.image)||(n==null?void 0:n.img)||"").trim();return!!(!e||e.startsWith("https://images.unsplash.com")||e.startsWith("data:")&&e.length<80||!(e.startsWith("/")||e.startsWith("http://")||e.startsWith("https://")||e.startsWith("blob:")||e.startsWith("data:")||e.startsWith("gs://")))}function YV({category:n=null,includeUnavailable:e=!1,orderByCreatedDesc:t=!0}={}){const[r,s]=G.useState([]),[i,o]=G.useState(!0),[c,u]=G.useState(null);return G.useEffect(()=>{o(!0),u(null);const l=pd({firestore:Xh,db:te,categoryId:n,includeUnavailable:e,orderByCreatedDesc:t,onData:d=>{s(d),o(!1)},onError:d=>{console.error("[useProducts] snapshot error:",d),u(d),o(!1)},onIndexWarning:d=>{console.warn("[useProducts] Missing index for products query (categoryId + createdAt). Falling back to unordered listener.",d)}});return()=>l()},[n,e,t]),G.useMemo(()=>({products:r,loading:i,error:c}),[r,i,c])}const XV=(n=[])=>n.map(e=>{const t=e.image||e.img||"",r={...e,image:t,img:t};if(!JV(r))return r;const s=QV(e);return s?{...r,image:s,img:s}:r}),xE=G.createContext();function ZV({children:n}){const{products:e,loading:t}=YV({orderByCreatedDesc:!0}),[r,s]=G.useState([]),[i,o]=G.useState([]),[c,u]=G.useState([]),[l,d]=G.useState(!0),[f,g]=G.useState(null),[I,b]=G.useState(!1),[P,k]=G.useState(!1);G.useEffect(()=>{const j=_d(T=>{o(y=>T.length===0&&y.length>0?y:T),b(!0)}),U=Id(T=>{const y=T;u(w=>y.length===0&&w.length>0?w:y),k(!0)}),z=()=>PE.map((T,y)=>{const w=T.toLowerCase().endsWith(".mp4")||T.toLowerCase().endsWith(".mov");return{id:`fallback-gallery-${y}`,url:`/aboutusimage/${T}`,type:w?"video":"image",name:T,active:!0}}),K=async()=>{u(T=>T.length>0?T:z()),d(!1)},Q=setTimeout(()=>{K()},5e3);return()=>{j(),U(),clearTimeout(Q)}},[]),G.useEffect(()=>{const j=XV(e);s(j)},[e]),G.useEffect(()=>{!t&&I&&P&&d(!1)},[t,I,P]);const V={products:r,categories:i,gallery:c,loading:l,error:f,refreshData:()=>{}};return _.jsx(xE.Provider,{value:V,children:n})}function H1(){const n=G.useContext(xE);if(!n)throw new Error("useData must be used within a DataProvider");return n}const e1=G.lazy(()=>Ge(()=>import("./Home-CB1T70aJ.js"),__vite__mapDeps([5,2,6,4,1,3]),import.meta.url)),t1=G.lazy(()=>Ge(()=>import("./Menu-DpXNJepG.js"),__vite__mapDeps([7,2,4,1,3]),import.meta.url)),n1=G.lazy(()=>Ge(()=>import("./Cart-MYw6TRi8.js"),__vite__mapDeps([8,2,4,1,3]),import.meta.url)),r1=G.lazy(()=>Ge(()=>import("./Gallery-SqHwLO5N.js"),__vite__mapDeps([9,2,4,1,3]),import.meta.url)),s1=G.lazy(()=>Ge(()=>import("./AboutUs-BtQjNg-A.js"),__vite__mapDeps([10,2,4,1,3]),import.meta.url)),i1=G.lazy(()=>Ge(()=>import("./Checkout-C2tiRlxO.js"),__vite__mapDeps([11,1,2,3,4]),import.meta.url)),o1=G.lazy(()=>Ge(()=>import("./Login-DTN73OUC.js"),__vite__mapDeps([12,2,6,13,4,1,3]),import.meta.url)),a1=G.lazy(()=>Ge(()=>import("./Profile-C_Hkb32j.js"),__vite__mapDeps([14,2,1,3,4,13]),import.meta.url)),c1=G.lazy(()=>Ge(()=>import("./OrderSuccess-B240YLAv.js"),__vite__mapDeps([15,2,4]),import.meta.url)),u1=G.lazy(()=>Ge(()=>import("./PaymentSuccess-CkVf84vB.js"),__vite__mapDeps([16,2,4]),import.meta.url)),l1=G.lazy(()=>Ge(()=>import("./PaymentCancel-CfjBlYtF.js"),__vite__mapDeps([17,2,4]),import.meta.url)),nm=G.lazy(()=>Ge(()=>import("./OrderTracking-D9qKU6Z5.js"),__vite__mapDeps([18,2,19,4,1,3]),import.meta.url)),h1=G.lazy(()=>Ge(()=>import("./Admin-BWtR1FYY.js"),__vite__mapDeps([20,2,4,19,13,1,3]),import.meta.url)),d1=G.lazy(()=>Ge(()=>import("./DriverPanel-BE9fbAKa.js"),__vite__mapDeps([21,2,4,1,3]),import.meta.url)),f1=G.lazy(()=>Ge(()=>import("./DataSeedPage-W50NTFNV.js"),__vite__mapDeps([22,2,4,1,3]),import.meta.url)),p1=G.lazy(()=>Ge(()=>import("./ShopScan-anyIW58u.js"),__vite__mapDeps([23,2,4,1,3]),import.meta.url));function Me({children:n}){return _.jsx(Er.div,{className:"page-wrapper",initial:{opacity:0,y:8},animate:{opacity:1,y:0},exit:{opacity:0,y:-8},transition:{duration:.2,ease:"easeOut"},children:n})}function g1(){const n=vl(),e=n.pathname,t=["/admin","/driver","/rider","/login","/order-success","/success","/cancel","/sandbox","/pay","/scan-pay"].some(u=>e.startsWith(u))||e.startsWith("/seed"),r=e.startsWith("/admin")||e.startsWith("/driver")||e.startsWith("/rider"),{user:s,loading:i}=fd();if(Nu.useEffect(()=>{wr.isNativePlatform()&&MV.hide().catch(console.error)},[]),i)return _.jsx(jV,{});if(wr.isNativePlatform()&&!s&&e==="/")return _.jsx(vf,{to:"/mobile-role-select",replace:!0});const o=wr.isNativePlatform(),c=o?FV:Nu.Fragment;return _.jsxs(c,{children:[!t&&!o&&_.jsx(uO,{}),_.jsx(rm,{mode:"popLayout",children:_.jsx(G.Suspense,{fallback:_.jsx("div",{style:{minHeight:"100vh",display:"flex",justifyContent:"center",alignItems:"center"},children:_.jsx("div",{style:{width:"40px",height:"40px",border:"4px solid #e2e8f0",borderTopColor:"var(--green-dark)",borderRadius:"50%",animation:"spin 1s linear infinite"}})}),children:_.jsxs(lT,{location:n,children:[_.jsx(xe,{path:"/",element:_.jsx(Me,{children:_.jsx(e1,{})})}),_.jsx(xe,{path:"/menu",element:_.jsx(Me,{children:_.jsx(t1,{})})}),_.jsx(xe,{path:"/gallery",element:_.jsx(Me,{children:_.jsx(r1,{})})}),_.jsx(xe,{path:"/about",element:_.jsx(Me,{children:_.jsx(s1,{})})}),_.jsx(xe,{path:"/cart",element:_.jsx(Me,{children:_.jsx(n1,{})})}),_.jsx(xe,{path:"/checkout",element:_.jsx(Me,{children:_.jsx(i1,{})})}),_.jsx(xe,{path:"/login",element:_.jsx(Me,{children:_.jsx(o1,{})})}),_.jsx(xe,{path:"/profile",element:_.jsx(Me,{children:_.jsx(a1,{})})}),_.jsx(xe,{path:"/order-success",element:_.jsx(Me,{children:_.jsx(c1,{})})}),_.jsx(xe,{path:"/success",element:_.jsx(Me,{children:_.jsx(u1,{})})}),_.jsx(xe,{path:"/cancel",element:_.jsx(Me,{children:_.jsx(l1,{})})}),_.jsx(xe,{path:"/tracking/:orderId",element:_.jsx(Me,{children:_.jsx(nm,{})})}),_.jsx(xe,{path:"/order-tracking/:orderId",element:_.jsx(Me,{children:_.jsx(nm,{})})}),_.jsx(xe,{path:"/admin/*",element:_.jsx(Me,{children:_.jsx(h1,{})})}),_.jsx(xe,{path:"/driver",element:_.jsx(Me,{children:_.jsx(d1,{})})}),_.jsx(xe,{path:"/rider",element:_.jsx(vf,{to:"/driver",replace:!0})}),_.jsx(xe,{path:"/seed",element:_.jsx(Me,{children:_.jsx(f1,{})})}),_.jsx(xe,{path:"/scan-pay/:orderId",element:_.jsx(Me,{children:_.jsx(p1,{})})}),_.jsx(xe,{path:"/mobile-role-select",element:_.jsx(Me,{children:_.jsx(UV,{})})})]},n.pathname)})}),!t&&_.jsx(lO,{}),!r&&_.jsx(AV,{}),!r&&_.jsx(hO,{message:"Hi STM Salam, I need help with my order.",label:"Chat with Admin"})]})}function m1(){return _.jsx(oO,{children:_.jsx(ZV,{children:_.jsx(bT,{children:_.jsx(uT,{children:_.jsx(g1,{})})})})})}const Q1=Object.freeze(Object.defineProperty({__proto__:null,default:m1},Symbol.toStringTag,{value:"Module"}));export{G1 as $,A1 as A,km as B,wr as C,pE as D,E1 as E,L1 as F,on as G,FO as H,O1 as I,Lw as J,hE as K,x1 as L,k1 as M,ku as N,Rt as O,M1 as P,lV as Q,TE as R,gE as S,pV as T,wV as U,wE as V,hO as W,_d as X,YO as Y,XO as Z,ZO as _,ST as a,tV as a0,U1 as a1,F1 as a2,DO as a3,UO as a4,q1 as a5,hV as a6,aV as a7,WO as a8,HO as a9,QO as aa,Id as ab,mV as ac,_V as ad,yV as ae,er as af,yt as ag,B1 as ah,cx as ai,gV as aj,EV as ak,so as al,oV as am,IE as an,qr as ao,Qh as ap,hx as aq,V1 as ar,D1 as as,$1 as at,z1 as au,IV as av,Dc as aw,Xs as ax,W1 as ay,Q1 as az,fd as b,ie as c,K1 as d,w1 as e,Ys as f,N1 as g,Js as h,R1 as i,T1 as j,v1 as k,b1 as l,ye as m,te as n,aO as o,sn as p,Cu as q,Hg as r,ke as s,j1 as t,H1 as u,St as v,Mn as w,Eb as x,ub as y,S1 as z};
