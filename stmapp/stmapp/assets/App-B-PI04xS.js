const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./web-l0u_SPd3.js","./index-DHSMsQSk.js","./vendor-2PFap5f2.js","./index-D-SnMtD4.css","./icons-B7HRMgi8.js","./Home-BPodW2Eo.js","./api-C-givZ-6.js","./Menu-CpGemzpy.js","./Cart-DvZmE7nK.js","./Gallery-BSWVagCi.js","./AboutUs-CX7yy-pj.js","./Checkout-DokNhIki.js","./Login-I3jDSJ4b.js","./validators-KcHLYWIO.js","./Profile-inuF3nOB.js","./OrderSuccess-Dw6sG2cf.js","./PaymentSuccess-Cbgb121Q.js","./PaymentCancel-QsGdZHYa.js","./OrderTracking-DfTLYbSp.js","./ChatWindow-B9yHd9cl.js","./orderLifecycleGuards-B28NX-5n.js","./Admin-YovbLZrh.js","./DriverPanel-BVV9-vUp.js","./DataSeedPage-xrnM-x7G.js","./ShopScan-D-HA-SY2.js"])))=>i.map(i=>d[i]);
import{_ as Ge}from"./index-DHSMsQSk.js";import{r as G,j as _,u as tl,a as nl,L as Xe,m as fr,A as wm,b as pu,B as ZE,N as Kd,c as ew,d as Ce}from"./vendor-2PFap5f2.js";import{L as tw,U as ns,M as rs,S as mu,X as Tm,a as nw,H as Am,b as rw,I as sw,P as iw,c as ow,C as vm,F as aw,d as cw,e as uw,f as bm,B as lw,g as hw,h as dw,i as Sm,j as fw,k as pw}from"./icons-B7HRMgi8.js";const Rm=G.createContext();function mw({children:n}){const[e,t]=G.useState(()=>{try{const l=localStorage.getItem("stm_salam_cart");if(!l)return[];const d=JSON.parse(l);return Array.isArray(d)?d:[]}catch{try{localStorage.removeItem("stm_salam_cart")}catch{}return[]}});G.useEffect(()=>{localStorage.setItem("stm_salam_cart",JSON.stringify(e))},[e]);const r=l=>{t(d=>d.find(m=>m.id===l.id)?d.map(m=>m.id===l.id?{...m,qty:m.qty+1}:m):[...d,{...l,qty:1}])},s=l=>{t(d=>d.filter(f=>f.id!==l))},i=(l,d)=>{t(f=>f.map(m=>{if(m.id===l){const I=Math.max(0,m.qty+d);return{...m,qty:I}}return m}).filter(m=>m.qty>0))},o=()=>t([]),c=e.reduce((l,d)=>l+d.price*d.qty,0),u=e.reduce((l,d)=>l+d.qty,0);return _.jsx(Rm.Provider,{value:{cartItems:e,addToCart:r,removeFromCart:s,updateQty:i,clearCart:o,subtotal:c,totalItems:u},children:n})}const gw=()=>{const n=G.useContext(Rm);if(!n)throw new Error("useCart must be used within a CartProvider");return n},_w=()=>{};var Qd={};/**
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
 */const Pm=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},yw=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],o=n[t++],c=n[t++],u=((s&7)<<18|(i&63)<<12|(o&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=n[t++],o=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},rl={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],o=s+1<n.length,c=o?n[s+1]:0,u=s+2<n.length,l=u?n[s+2]:0,d=i>>2,f=(i&3)<<4|c>>4;let m=(c&15)<<2|l>>6,I=l&63;u||(I=64,o||(m=64)),r.push(t[d],t[f],t[m],t[I])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Pm(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):yw(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],c=s<n.length?t[n.charAt(s)]:0;++s;const l=s<n.length?t[n.charAt(s)]:64;++s;const f=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||c==null||l==null||f==null)throw new Iw;const m=i<<2|c>>4;if(r.push(m),l!==64){const I=c<<4&240|l>>2;if(r.push(I),f!==64){const b=l<<6&192|f;r.push(b)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Iw extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Ew=function(n){const e=Pm(n);return rl.encodeByteArray(e,!0)},ia=function(n){return Ew(n).replace(/\./g,"")},xm=function(n){try{return rl.decodeString(n,!0)}catch{}return null};/**
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
 */function sl(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const ww=()=>sl().__FIREBASE_DEFAULTS__,Tw=()=>{if(typeof process>"u"||typeof Qd>"u")return;const n=Qd.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Aw=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&xm(n[1]);return e&&JSON.parse(e)},Ua=()=>{try{return _w()||ww()||Tw()||Aw()}catch{return}},Cm=n=>{var e,t;return(t=(e=Ua())==null?void 0:e.emulatorHosts)==null?void 0:t[n]},il=n=>{const e=Cm(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Dm=()=>{var n;return(n=Ua())==null?void 0:n.config},km=n=>{var e;return(e=Ua())==null?void 0:e[`_${n}`]};/**
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
 */class Di{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
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
 */function Nm(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[ia(JSON.stringify(t)),ia(JSON.stringify(o)),""].join(".")}/**
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
 */function Ne(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function vw(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ne())}function Vm(){var e;const n=(e=Ua())==null?void 0:e.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function bw(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Sw(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Rw(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Pw(){const n=Ne();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Om(){return!Vm()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Lm(){return!Vm()&&!!navigator.userAgent&&(navigator.userAgent.includes("Safari")||navigator.userAgent.includes("WebKit"))&&!navigator.userAgent.includes("Chrome")}function Ba(){try{return typeof indexedDB=="object"}catch{return!1}}function xw(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)==null?void 0:i.message)||"")}}catch(t){e(t)}})}/**
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
 */const Cw="FirebaseError";class bt extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Cw,Object.setPrototypeOf(this,bt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ps.prototype.create)}}class Ps{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?Dw(i,r):"Error",c=`${this.serviceName}: ${o} (${s}).`;return new bt(s,c,r)}}function Dw(n,e){return n.replace(kw,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const kw=/\{\$([^}]+)}/g;function Nw(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Tt(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],o=e[s];if(Jd(i)&&Jd(o)){if(!Tt(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function Jd(n){return n!==null&&typeof n=="object"}/**
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
 */function Hi(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function fi(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function pi(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Vw(n,e){const t=new Ow(n,e);return t.subscribe.bind(t)}class Ow{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");Lw(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=$c),s.error===void 0&&(s.error=$c),s.complete===void 0&&(s.complete=$c);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch{}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Lw(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function $c(){}/**
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
 */const Mw=1e3,Fw=2,Uw=4*60*60*1e3,Bw=.5;function jw(n,e=Mw,t=Fw){const r=e*Math.pow(t,n),s=Math.round(Bw*r*(Math.random()-.5)*2);return Math.min(Uw,r+s)}/**
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
 */function X(n){return n&&n._delegate?n._delegate:n}/**
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
 */function Bt(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Ki(n){return(await fetch(n,{credentials:"include"})).ok}class At{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const tr="[DEFAULT]";/**
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
 */class Gw{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new Di;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if($w(e))try{this.getOrInitializeService({instanceIdentifier:tr})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=tr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=tr){return this.instances.has(e)}getOptions(e=tr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&o.resolve(s)}return s}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:qw(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=tr){return this.component?this.component.multipleInstances?e:tr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function qw(n){return n===tr?void 0:n}function $w(n){return n.instantiationMode==="EAGER"}/**
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
 */class zw{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Gw(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var te;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(te||(te={}));const Ww={debug:te.DEBUG,verbose:te.VERBOSE,info:te.INFO,warn:te.WARN,error:te.ERROR,silent:te.SILENT},Hw=te.INFO,Kw={[te.DEBUG]:"log",[te.VERBOSE]:"log",[te.INFO]:"info",[te.WARN]:"warn",[te.ERROR]:"error"},Qw=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=Kw[e];if(!s)throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ja{constructor(e){this.name=e,this._logLevel=Hw,this._logHandler=Qw,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in te))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Ww[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,te.DEBUG,...e),this._logHandler(this,te.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,te.VERBOSE,...e),this._logHandler(this,te.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,te.INFO,...e),this._logHandler(this,te.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,te.WARN,...e),this._logHandler(this,te.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,te.ERROR,...e),this._logHandler(this,te.ERROR,...e)}}const Jw=(n,e)=>e.some(t=>n instanceof t);let Yd,Xd;function Yw(){return Yd||(Yd=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Xw(){return Xd||(Xd=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Mm=new WeakMap,gu=new WeakMap,Fm=new WeakMap,zc=new WeakMap,ol=new WeakMap;function Zw(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",o)},i=()=>{t(Rn(n.result)),s()},o=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Mm.set(t,n)}).catch(()=>{}),ol.set(e,n),e}function eT(n){if(gu.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",o),n.removeEventListener("abort",o)},i=()=>{t(),s()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",o),n.addEventListener("abort",o)});gu.set(n,e)}let _u={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return gu.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Fm.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Rn(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function tT(n){_u=n(_u)}function nT(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Wc(this),e,...t);return Fm.set(r,e.sort?e.sort():[e]),Rn(r)}:Xw().includes(n)?function(...e){return n.apply(Wc(this),e),Rn(Mm.get(this))}:function(...e){return Rn(n.apply(Wc(this),e))}}function rT(n){return typeof n=="function"?nT(n):(n instanceof IDBTransaction&&eT(n),Jw(n,Yw())?new Proxy(n,_u):n)}function Rn(n){if(n instanceof IDBRequest)return Zw(n);if(zc.has(n))return zc.get(n);const e=rT(n);return e!==n&&(zc.set(n,e),ol.set(e,n)),e}const Wc=n=>ol.get(n);function sT(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(n,e),c=Rn(o);return r&&o.addEventListener("upgradeneeded",u=>{r(Rn(o.result),u.oldVersion,u.newVersion,Rn(o.transaction),u)}),t&&o.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),c}const iT=["get","getKey","getAll","getAllKeys","count"],oT=["put","add","delete","clear"],Hc=new Map;function Zd(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Hc.get(e))return Hc.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=oT.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||iT.includes(t)))return;const i=async function(o,...c){const u=this.transaction(o,s?"readwrite":"readonly");let l=u.store;return r&&(l=l.index(c.shift())),(await Promise.all([l[t](...c),s&&u.done]))[0]};return Hc.set(e,i),i}tT(n=>({...n,get:(e,t,r)=>Zd(e,t)||n.get(e,t,r),has:(e,t)=>!!Zd(e,t)||n.has(e,t)}));/**
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
 */class aT{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(cT(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function cT(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const yu="@firebase/app",ef="0.14.11";/**
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
 */const Wt=new ja("@firebase/app"),uT="@firebase/app-compat",lT="@firebase/analytics-compat",hT="@firebase/analytics",dT="@firebase/app-check-compat",fT="@firebase/app-check",pT="@firebase/auth",mT="@firebase/auth-compat",gT="@firebase/database",_T="@firebase/data-connect",yT="@firebase/database-compat",IT="@firebase/functions",ET="@firebase/functions-compat",wT="@firebase/installations",TT="@firebase/installations-compat",AT="@firebase/messaging",vT="@firebase/messaging-compat",bT="@firebase/performance",ST="@firebase/performance-compat",RT="@firebase/remote-config",PT="@firebase/remote-config-compat",xT="@firebase/storage",CT="@firebase/storage-compat",DT="@firebase/firestore",kT="@firebase/ai",NT="@firebase/firestore-compat",VT="firebase",OT="12.12.0";/**
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
 */const oa="[DEFAULT]",LT={[yu]:"fire-core",[uT]:"fire-core-compat",[hT]:"fire-analytics",[lT]:"fire-analytics-compat",[fT]:"fire-app-check",[dT]:"fire-app-check-compat",[pT]:"fire-auth",[mT]:"fire-auth-compat",[gT]:"fire-rtdb",[_T]:"fire-data-connect",[yT]:"fire-rtdb-compat",[IT]:"fire-fn",[ET]:"fire-fn-compat",[wT]:"fire-iid",[TT]:"fire-iid-compat",[AT]:"fire-fcm",[vT]:"fire-fcm-compat",[bT]:"fire-perf",[ST]:"fire-perf-compat",[RT]:"fire-rc",[PT]:"fire-rc-compat",[xT]:"fire-gcs",[CT]:"fire-gcs-compat",[DT]:"fire-fst",[NT]:"fire-fst-compat",[kT]:"fire-vertex","fire-js":"fire-js",[VT]:"fire-js-all"};/**
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
 */const aa=new Map,MT=new Map,Iu=new Map;function tf(n,e){try{n.container.addComponent(e)}catch(t){Wt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Ft(n){const e=n.name;if(Iu.has(e))return Wt.debug(`There were multiple attempts to register component ${e}.`),!1;Iu.set(e,n);for(const t of aa.values())tf(t,n);for(const t of MT.values())tf(t,n);return!0}function Zt(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function FT(n,e,t=oa){Zt(n,e).clearInstance(t)}function Ze(n){return n==null?!1:n.settings!==void 0}/**
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
 */const UT={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Pn=new Ps("app","Firebase",UT);/**
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
 */class BT{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new At("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Pn.create("app-deleted",{appName:this._name})}}/**
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
 */const br=OT;function Um(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:oa,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw Pn.create("bad-app-name",{appName:String(s)});if(t||(t=Dm()),!t)throw Pn.create("no-options");const i=aa.get(s);if(i){if(Tt(t,i.options)&&Tt(r,i.config))return i;throw Pn.create("duplicate-app",{appName:s})}const o=new zw(s);for(const u of Iu.values())o.addComponent(u);const c=new BT(t,r,o);return aa.set(s,c),c}function Qi(n=oa){const e=aa.get(n);if(!e&&n===oa&&Dm())return Um();if(!e)throw Pn.create("no-app",{appName:n});return e}function dt(n,e,t){let r=LT[n]??n;t&&(r+=`-${t}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const o=[`Unable to register library "${r}" with version "${e}":`];s&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&o.push("and"),i&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Wt.warn(o.join(" "));return}Ft(new At(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
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
 */const jT="firebase-heartbeat-database",GT=1,ki="firebase-heartbeat-store";let Kc=null;function Bm(){return Kc||(Kc=sT(jT,GT,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(ki)}catch{}}}}).catch(n=>{throw Pn.create("idb-open",{originalErrorMessage:n.message})})),Kc}async function qT(n){try{const t=(await Bm()).transaction(ki),r=await t.objectStore(ki).get(jm(n));return await t.done,r}catch(e){if(e instanceof bt)Wt.warn(e.message);else{const t=Pn.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Wt.warn(t.message)}}}async function nf(n,e){try{const r=(await Bm()).transaction(ki,"readwrite");await r.objectStore(ki).put(e,jm(n)),await r.done}catch(t){if(t instanceof bt)Wt.warn(t.message);else{const r=Pn.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Wt.warn(r.message)}}}function jm(n){return`${n.name}!${n.options.appId}`}/**
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
 */const $T=1024,zT=30;class WT{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new KT(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=rf();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>zT){const o=QT(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Wt.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=rf(),{heartbeatsToSend:r,unsentEntries:s}=HT(this._heartbeatsCache.heartbeats),i=ia(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return Wt.warn(t),""}}}function rf(){return new Date().toISOString().substring(0,10)}function HT(n,e=$T){const t=[];let r=n.slice();for(const s of n){const i=t.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),sf(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),sf(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class KT{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ba()?xw().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await qT(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return nf(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return nf(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function sf(n){return ia(JSON.stringify({version:2,heartbeats:n})).length}function QT(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
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
 */function JT(n){Ft(new At("platform-logger",e=>new aT(e),"PRIVATE")),Ft(new At("heartbeat",e=>new WT(e),"PRIVATE")),dt(yu,ef,n),dt(yu,ef,"esm2020"),dt("fire-js","")}JT("");function Gm(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const YT=Gm,qm=new Ps("auth","Firebase",Gm());/**
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
 */const ca=new ja("@firebase/auth");function XT(n,...e){ca.logLevel<=te.WARN&&ca.warn(`Auth (${br}): ${n}`,...e)}function zo(n,...e){ca.logLevel<=te.ERROR&&ca.error(`Auth (${br}): ${n}`,...e)}/**
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
 */function vt(n,...e){throw al(n,...e)}function Nt(n,...e){return al(n,...e)}function $m(n,e,t){const r={...YT(),[e]:t};return new Ps("auth","Firebase",r).create(e,{appName:n.name})}function Vt(n){return $m(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function al(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return qm.create(n,...e)}function H(n,e,...t){if(!n)throw al(e,...t)}function Gt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw zo(e),new Error(e)}function Ht(n,e){n||Gt(e)}/**
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
 */function Eu(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function ZT(){return of()==="http:"||of()==="https:"}function of(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
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
 */function eA(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(ZT()||Sw()||"connection"in navigator)?navigator.onLine:!0}function tA(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class Ji{constructor(e,t){this.shortDelay=e,this.longDelay=t,Ht(t>e,"Short delay should be less than long delay!"),this.isMobile=vw()||Rw()}get(){return eA()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function cl(n,e){Ht(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class zm{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Gt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Gt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Gt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const nA={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const rA=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],sA=new Ji(3e4,6e4);function en(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function jt(n,e,t,r,s={}){return Wm(n,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const c=Hi({key:n.config.apiKey,...o}).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const l={method:e,headers:u,...i};return bw()||(l.referrerPolicy="no-referrer"),n.emulatorConfig&&Bt(n.emulatorConfig.host)&&(l.credentials="include"),zm.fetch()(await Hm(n,n.config.apiHost,t,c),l)})}async function Wm(n,e,t){n._canInitEmulator=!1;const r={...nA,...e};try{const s=new oA(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw ko(n,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const c=i.ok?o.errorMessage:o.error.message,[u,l]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw ko(n,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw ko(n,"email-already-in-use",o);if(u==="USER_DISABLED")throw ko(n,"user-disabled",o);const d=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw $m(n,d,l);vt(n,d)}}catch(s){if(s instanceof bt)throw s;vt(n,"network-request-failed",{message:String(s)})}}async function Yi(n,e,t,r,s={}){const i=await jt(n,e,t,r,s);return"mfaPendingCredential"in i&&vt(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function Hm(n,e,t,r){const s=`${e}${t}?${r}`,i=n,o=i.config.emulator?cl(n.config,s):`${n.config.apiScheme}://${s}`;return rA.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}function iA(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class oA{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Nt(this.auth,"network-request-failed")),sA.get())})}}function ko(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=Nt(n,e,r);return s.customData._tokenResponse=t,s}function af(n){return n!==void 0&&n.enterprise!==void 0}class aA{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return iA(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function cA(n,e){return jt(n,"GET","/v2/recaptchaConfig",en(n,e))}/**
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
 */async function uA(n,e){return jt(n,"POST","/v1/accounts:delete",e)}async function ua(n,e){return jt(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function Ii(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Km(n,e=!1){const t=X(n),r=await t.getIdToken(e),s=ul(r);H(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:Ii(Qc(s.auth_time)),issuedAtTime:Ii(Qc(s.iat)),expirationTime:Ii(Qc(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function Qc(n){return Number(n)*1e3}function ul(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return zo("JWT malformed, contained fewer than 3 sections"),null;try{const s=xm(t);return s?JSON.parse(s):(zo("Failed to decode base64 JWT payload"),null)}catch(s){return zo("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function cf(n){const e=ul(n);return H(e,"internal-error"),H(typeof e.exp<"u","internal-error"),H(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function ss(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof bt&&lA(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function lA({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class hA{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class wu{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ii(this.lastLoginAt),this.creationTime=Ii(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function la(n){var f;const e=n.auth,t=await n.getIdToken(),r=await ss(n,ua(e,{idToken:t}));H(r==null?void 0:r.users.length,e,"internal-error");const s=r.users[0];n._notifyReloadListener(s);const i=(f=s.providerUserInfo)!=null&&f.length?Qm(s.providerUserInfo):[],o=fA(n.providerData,i),c=n.isAnonymous,u=!(n.email&&s.passwordHash)&&!(o!=null&&o.length),l=c?u:!1,d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new wu(s.createdAt,s.lastLoginAt),isAnonymous:l};Object.assign(n,d)}async function dA(n){const e=X(n);await la(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function fA(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Qm(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
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
 */async function pA(n,e){const t=await Wm(n,{},async()=>{const r=Hi({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,o=await Hm(n,s,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:c,body:r};return n.emulatorConfig&&Bt(n.emulatorConfig.host)&&(u.credentials="include"),zm.fetch()(o,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function mA(n,e){return jt(n,"POST","/v2/accounts:revokeToken",en(n,e))}/**
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
 */class Qr{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){H(e.idToken,"internal-error"),H(typeof e.idToken<"u","internal-error"),H(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):cf(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){H(e.length!==0,"internal-error");const t=cf(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(H(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await pA(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,o=new Qr;return r&&(H(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(H(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(H(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Qr,this.toJSON())}_performRefresh(){return Gt("not implemented")}}/**
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
 */function fn(n,e){H(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class yt{constructor({uid:e,auth:t,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new hA(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new wu(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await ss(this,this.stsTokenManager.getToken(this.auth,e));return H(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Km(this,e)}reload(){return dA(this)}_assign(e){this!==e&&(H(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new yt({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){H(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await la(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ze(this.auth.app))return Promise.reject(Vt(this.auth));const e=await this.getIdToken();return await ss(this,uA(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,o=t.photoURL??void 0,c=t.tenantId??void 0,u=t._redirectEventId??void 0,l=t.createdAt??void 0,d=t.lastLoginAt??void 0,{uid:f,emailVerified:m,isAnonymous:I,providerData:b,stsTokenManager:x}=t;H(f&&x,e,"internal-error");const D=Qr.fromJSON(this.name,x);H(typeof f=="string",e,"internal-error"),fn(r,e.name),fn(s,e.name),H(typeof m=="boolean",e,"internal-error"),H(typeof I=="boolean",e,"internal-error"),fn(i,e.name),fn(o,e.name),fn(c,e.name),fn(u,e.name),fn(l,e.name),fn(d,e.name);const O=new yt({uid:f,auth:e,email:s,emailVerified:m,displayName:r,isAnonymous:I,photoURL:o,phoneNumber:i,tenantId:c,stsTokenManager:D,createdAt:l,lastLoginAt:d});return b&&Array.isArray(b)&&(O.providerData=b.map(B=>({...B}))),u&&(O._redirectEventId=u),O}static async _fromIdTokenResponse(e,t,r=!1){const s=new Qr;s.updateFromServerResponse(t);const i=new yt({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await la(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];H(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Qm(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),c=new Qr;c.updateFromIdToken(r);const u=new yt({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:o}),l={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new wu(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(u,l),u}}/**
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
 */const uf=new Map;function qt(n){Ht(n instanceof Function,"Expected a class definition");let e=uf.get(n);return e?(Ht(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,uf.set(n,e),e)}/**
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
 */class Jm{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Jm.type="NONE";const lf=Jm;/**
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
 */function Wo(n,e,t){return`firebase:${n}:${e}:${t}`}class Jr{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Wo(this.userKey,s.apiKey,i),this.fullPersistenceKey=Wo("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await ua(this.auth,{idToken:e}).catch(()=>{});return t?yt._fromGetAccountInfoResponse(this.auth,t,e):null}return yt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Jr(qt(lf),e,r);const s=(await Promise.all(t.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let i=s[0]||qt(lf);const o=Wo(r,e.config.apiKey,e.name);let c=null;for(const l of t)try{const d=await l._get(o);if(d){let f;if(typeof d=="string"){const m=await ua(e,{idToken:d}).catch(()=>{});if(!m)break;f=await yt._fromGetAccountInfoResponse(e,m,d)}else f=yt._fromJSON(e,d);l!==i&&(c=f),i=l;break}}catch{}const u=s.filter(l=>l._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new Jr(i,e,r):(i=u[0],c&&await i._set(o,c.toJSON()),await Promise.all(t.map(async l=>{if(l!==i)try{await l._remove(o)}catch{}})),new Jr(i,e,r))}}/**
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
 */function hf(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(eg(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Ym(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(ng(e))return"Blackberry";if(rg(e))return"Webos";if(Xm(e))return"Safari";if((e.includes("chrome/")||Zm(e))&&!e.includes("edge/"))return"Chrome";if(tg(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Ym(n=Ne()){return/firefox\//i.test(n)}function Xm(n=Ne()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Zm(n=Ne()){return/crios\//i.test(n)}function eg(n=Ne()){return/iemobile/i.test(n)}function tg(n=Ne()){return/android/i.test(n)}function ng(n=Ne()){return/blackberry/i.test(n)}function rg(n=Ne()){return/webos/i.test(n)}function ll(n=Ne()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function gA(n=Ne()){var e;return ll(n)&&!!((e=window.navigator)!=null&&e.standalone)}function _A(){return Pw()&&document.documentMode===10}function sg(n=Ne()){return ll(n)||tg(n)||rg(n)||ng(n)||/windows phone/i.test(n)||eg(n)}/**
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
 */function ig(n,e=[]){let t;switch(n){case"Browser":t=hf(Ne());break;case"Worker":t=`${hf(Ne())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${br}/${r}`}/**
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
 */class yA{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((o,c)=>{try{const u=e(i);o(u)}catch(u){c(u)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function IA(n,e={}){return jt(n,"GET","/v2/passwordPolicy",en(n,e))}/**
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
 */const EA=6;class wA{constructor(e){var r;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??EA,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=e.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
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
 */class TA{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new df(this),this.idTokenSubscription=new df(this),this.beforeStateQueue=new yA(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=qm,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=qt(t)),this._initializationPromise=this.queue(async()=>{var r,s,i;if(!this._deleted&&(this.persistenceManager=await Jr.create(this,e),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await ua(this,{idToken:e}),r=await yt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch{await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var i;if(Ze(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(i=this.redirectUser)==null?void 0:i._redirectEventId,c=r==null?void 0:r._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===c)&&(u!=null&&u.user)&&(r=u.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(o){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return H(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await la(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=tA()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ze(this.app))return Promise.reject(Vt(this));const t=e?X(e):null;return t&&H(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&H(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ze(this.app)?Promise.reject(Vt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ze(this.app)?Promise.reject(Vt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(qt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await IA(this),t=new wA(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Ps("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await mA(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&qt(e)||this._popupRedirectResolver;H(t,this,"argument-error"),this.redirectPersistenceManager=await Jr.create(this,[qt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(H(c,this,"internal-error"),c.then(()=>{o||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,r,s);return()=>{o=!0,u()}}else{const u=e.addObserver(t);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return H(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=ig(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){var t;if(Ze(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&XT(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function tn(n){return X(n)}class df{constructor(e){this.auth=e,this.observer=null,this.addObserver=Vw(t=>this.observer=t)}get next(){return H(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let Ga={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function AA(n){Ga=n}function og(n){return Ga.loadJS(n)}function vA(){return Ga.recaptchaEnterpriseScript}function bA(){return Ga.gapiScript}function SA(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class RA{constructor(){this.enterprise=new PA}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class PA{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const xA="recaptcha-enterprise",ag="NO_RECAPTCHA";class CA{constructor(e){this.type=xA,this.auth=tn(e)}async verify(e="verify",t=!1){async function r(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,c)=>{cA(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const l=new aA(u);return i.tenantId==null?i._agentRecaptchaConfig=l:i._tenantRecaptchaConfigs[i.tenantId]=l,o(l.siteKey)}}).catch(u=>{c(u)})})}function s(i,o,c){const u=window.grecaptcha;af(u)?u.enterprise.ready(()=>{u.enterprise.execute(i,{action:e}).then(l=>{o(l)}).catch(()=>{o(ag)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new RA().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{r(this.auth).then(c=>{if(!t&&af(window.grecaptcha))s(c,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let u=vA();u.length!==0&&(u+=c),og(u).then(()=>{s(c,i,o)}).catch(l=>{o(l)})}}).catch(c=>{o(c)})})}}async function ff(n,e,t,r=!1,s=!1){const i=new CA(n);let o;if(s)o=ag;else try{o=await i.verify(t)}catch{o=await i.verify(t,!0)}const c={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const u=c.phoneEnrollmentInfo.phoneNumber,l=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:l,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const u=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:o}):Object.assign(c,{captchaResponse:o}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function ha(n,e,t,r,s){var i;if((i=n._getRecaptchaConfig())!=null&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await ff(n,e,t,t==="getOobCode");return r(n,o)}else return r(n,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){const c=await ff(n,e,t,t==="getOobCode");return r(n,c)}else return Promise.reject(o)})}/**
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
 */function DA(n,e){const t=Zt(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(Tt(i,e??{}))return s;vt(s,"already-initialized")}return t.initialize({options:e})}function kA(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(qt);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function NA(n,e,t){const r=tn(n);H(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=cg(e),{host:o,port:c}=VA(e),u=c===null?"":`:${c}`,l={url:`${i}//${o}${u}/`},d=Object.freeze({host:o,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){H(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),H(Tt(l,r.config.emulator)&&Tt(d,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=l,r.emulatorConfig=d,r.settings.appVerificationDisabledForTesting=!0,Bt(o)?Ki(`${i}//${o}${u}`):OA()}function cg(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function VA(n){const e=cg(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:pf(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:pf(o)}}}function pf(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function OA(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class hl{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Gt("not implemented")}_getIdTokenResponse(e){return Gt("not implemented")}_linkToIdToken(e,t){return Gt("not implemented")}_getReauthenticationResolver(e){return Gt("not implemented")}}async function LA(n,e){return jt(n,"POST","/v1/accounts:signUp",e)}/**
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
 */async function MA(n,e){return Yi(n,"POST","/v1/accounts:signInWithPassword",en(n,e))}async function ug(n,e){return jt(n,"POST","/v1/accounts:sendOobCode",en(n,e))}async function FA(n,e){return ug(n,e)}async function UA(n,e){return ug(n,e)}/**
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
 */async function BA(n,e){return Yi(n,"POST","/v1/accounts:signInWithEmailLink",en(n,e))}async function jA(n,e){return Yi(n,"POST","/v1/accounts:signInWithEmailLink",en(n,e))}/**
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
 */class Ni extends hl{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new Ni(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new Ni(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ha(e,t,"signInWithPassword",MA);case"emailLink":return BA(e,{email:this._email,oobCode:this._password});default:vt(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ha(e,r,"signUpPassword",LA);case"emailLink":return jA(e,{idToken:t,email:this._email,oobCode:this._password});default:vt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function Yr(n,e){return Yi(n,"POST","/v1/accounts:signInWithIdp",en(n,e))}/**
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
 */const GA="http://localhost";class pr extends hl{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new pr(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):vt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=t;if(!r||!s)return null;const o=new pr(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return Yr(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Yr(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Yr(e,t)}buildRequest(){const e={requestUri:GA,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Hi(t)}return e}}/**
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
 */function qA(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function $A(n){const e=fi(pi(n)).link,t=e?fi(pi(e)).deep_link_id:null,r=fi(pi(n)).deep_link_id;return(r?fi(pi(r)).link:null)||r||t||e||n}class dl{constructor(e){const t=fi(pi(e)),r=t.apiKey??null,s=t.oobCode??null,i=qA(t.mode??null);H(r&&s&&i,"argument-error"),this.apiKey=r,this.operation=i,this.code=s,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=$A(e);try{return new dl(t)}catch{return null}}}/**
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
 */class xs{constructor(){this.providerId=xs.PROVIDER_ID}static credential(e,t){return Ni._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=dl.parseLink(t);return H(r,"argument-error"),Ni._fromEmailAndCode(e,r.code,r.tenantId)}}xs.PROVIDER_ID="password";xs.EMAIL_PASSWORD_SIGN_IN_METHOD="password";xs.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class lg{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Xi extends lg{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class _n extends Xi{constructor(){super("facebook.com")}static credential(e){return pr._fromParams({providerId:_n.PROVIDER_ID,signInMethod:_n.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return _n.credentialFromTaggedObject(e)}static credentialFromError(e){return _n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return _n.credential(e.oauthAccessToken)}catch{return null}}}_n.FACEBOOK_SIGN_IN_METHOD="facebook.com";_n.PROVIDER_ID="facebook.com";/**
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
 */class yn extends Xi{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return pr._fromParams({providerId:yn.PROVIDER_ID,signInMethod:yn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return yn.credentialFromTaggedObject(e)}static credentialFromError(e){return yn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return yn.credential(t,r)}catch{return null}}}yn.GOOGLE_SIGN_IN_METHOD="google.com";yn.PROVIDER_ID="google.com";/**
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
 */class In extends Xi{constructor(){super("github.com")}static credential(e){return pr._fromParams({providerId:In.PROVIDER_ID,signInMethod:In.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return In.credentialFromTaggedObject(e)}static credentialFromError(e){return In.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return In.credential(e.oauthAccessToken)}catch{return null}}}In.GITHUB_SIGN_IN_METHOD="github.com";In.PROVIDER_ID="github.com";/**
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
 */class En extends Xi{constructor(){super("twitter.com")}static credential(e,t){return pr._fromParams({providerId:En.PROVIDER_ID,signInMethod:En.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return En.credentialFromTaggedObject(e)}static credentialFromError(e){return En.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return En.credential(t,r)}catch{return null}}}En.TWITTER_SIGN_IN_METHOD="twitter.com";En.PROVIDER_ID="twitter.com";/**
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
 */async function hg(n,e){return Yi(n,"POST","/v1/accounts:signUp",en(n,e))}/**
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
 */class Kt{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await yt._fromIdTokenResponse(e,r,s),o=mf(r);return new Kt({user:i,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=mf(r);return new Kt({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function mf(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */async function LN(n){var s;if(Ze(n.app))return Promise.reject(Vt(n));const e=tn(n);if(await e._initializationPromise,(s=e.currentUser)!=null&&s.isAnonymous)return new Kt({user:e.currentUser,providerId:null,operationType:"signIn"});const t=await hg(e,{returnSecureToken:!0}),r=await Kt._fromIdTokenResponse(e,"signIn",t,!0);return await e._updateCurrentUser(r.user),r}/**
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
 */class da extends bt{constructor(e,t,r,s){super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,da.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new da(e,t,r,s)}}function dg(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?da._fromErrorAndOperation(n,i,e,r):i})}async function zA(n,e,t=!1){const r=await ss(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Kt._forOperation(n,"link",r)}/**
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
 */async function WA(n,e,t=!1){const{auth:r}=n;if(Ze(r.app))return Promise.reject(Vt(r));const s="reauthenticate";try{const i=await ss(n,dg(r,s,e,n),t);H(i.idToken,r,"internal-error");const o=ul(i.idToken);H(o,r,"internal-error");const{sub:c}=o;return H(n.uid===c,r,"user-mismatch"),Kt._forOperation(n,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&vt(r,"user-mismatch"),i}}/**
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
 */async function fg(n,e,t=!1){if(Ze(n.app))return Promise.reject(Vt(n));const r="signIn",s=await dg(n,r,e),i=await Kt._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}async function HA(n,e){return fg(tn(n),e)}/**
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
 */async function pg(n){const e=tn(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function MN(n,e,t){const r=tn(n);await ha(r,{requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"},"getOobCode",UA)}async function FN(n,e,t){if(Ze(n.app))return Promise.reject(Vt(n));const r=tn(n),o=await ha(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",hg).catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&pg(n),u}),c=await Kt._fromIdTokenResponse(r,"signIn",o);return await r._updateCurrentUser(c.user),c}function UN(n,e,t){return Ze(n.app)?Promise.reject(Vt(n)):HA(X(n),xs.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&pg(n),r})}async function BN(n,e){const t=X(n),s={requestType:"VERIFY_EMAIL",idToken:await n.getIdToken()},{email:i}=await FA(t.auth,s);i!==n.email&&await n.reload()}/**
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
 */async function KA(n,e){return jt(n,"POST","/v1/accounts:update",e)}/**
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
 */async function jN(n,{displayName:e,photoURL:t}){if(e===void 0&&t===void 0)return;const r=X(n),i={idToken:await r.getIdToken(),displayName:e,photoUrl:t,returnSecureToken:!0},o=await ss(r,KA(r.auth,i));r.displayName=o.displayName||null,r.photoURL=o.photoUrl||null;const c=r.providerData.find(({providerId:u})=>u==="password");c&&(c.displayName=r.displayName,c.photoURL=r.photoURL),await r._updateTokensIfNecessary(o)}/**
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
 */function GN(n,e){return X(n).setPersistence(e)}function QA(n,e,t,r){return X(n).onIdTokenChanged(e,t,r)}function JA(n,e,t){return X(n).beforeAuthStateChanged(e,t)}function YA(n,e,t,r){return X(n).onAuthStateChanged(e,t,r)}const fa="__sak";/**
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
 */class mg{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(fa,"1"),this.storage.removeItem(fa),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const XA=1e3,ZA=10;class gg extends mg{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=sg(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,u)=>{this.notifyListeners(o,u)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);_A()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,ZA):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},XA)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}gg.type="LOCAL";const ev=gg;/**
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
 */class _g extends mg{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}_g.type="SESSION";const yg=_g;/**
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
 */function tv(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class qa{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new qa(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(o).map(async l=>l(t.origin,i)),u=await tv(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}qa.receivers=[];/**
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
 */function fl(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class nv{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((c,u)=>{const l=fl("",20);s.port1.start();const d=setTimeout(()=>{u(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(f){const m=f;if(m.data.eventId===l)switch(m.data.status){case"ack":clearTimeout(d),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(m.data.response);break;default:clearTimeout(d),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function Ot(){return window}function rv(n){Ot().location.href=n}/**
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
 */function Ig(){return typeof Ot().WorkerGlobalScope<"u"&&typeof Ot().importScripts=="function"}async function sv(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function iv(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function ov(){return Ig()?self:null}/**
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
 */const Eg="firebaseLocalStorageDb",av=1,pa="firebaseLocalStorage",wg="fbase_key";class Zi{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function $a(n,e){return n.transaction([pa],e?"readwrite":"readonly").objectStore(pa)}function cv(){const n=indexedDB.deleteDatabase(Eg);return new Zi(n).toPromise()}function Tu(){const n=indexedDB.open(Eg,av);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(pa,{keyPath:wg})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(pa)?e(r):(r.close(),await cv(),e(await Tu()))})})}async function gf(n,e,t){const r=$a(n,!0).put({[wg]:e,value:t});return new Zi(r).toPromise()}async function uv(n,e){const t=$a(n,!1).get(e),r=await new Zi(t).toPromise();return r===void 0?null:r.value}function _f(n,e){const t=$a(n,!0).delete(e);return new Zi(t).toPromise()}const lv=800,hv=3;class Tg{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Tu(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>hv)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Ig()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=qa._getInstance(ov()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,r;if(this.activeServiceWorker=await sv(),!this.activeServiceWorker)return;this.sender=new nv(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(r=e[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||iv()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Tu();return await gf(e,fa,"1"),await _f(e,fa),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>gf(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>uv(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>_f(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=$a(s,!1).getAll();return new Zi(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),lv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Tg.type="LOCAL";const dv=Tg;new Ji(3e4,6e4);/**
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
 */function fv(n,e){return e?qt(e):(H(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class pl extends hl{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Yr(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Yr(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Yr(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function pv(n){return fg(n.auth,new pl(n),n.bypassAuthState)}function mv(n){const{auth:e,user:t}=n;return H(t,e,"internal-error"),WA(t,new pl(n),n.bypassAuthState)}async function gv(n){const{auth:e,user:t}=n;return H(t,e,"internal-error"),zA(t,new pl(n),n.bypassAuthState)}/**
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
 */class Ag{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:o,type:c}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return pv;case"linkViaPopup":case"linkViaRedirect":return gv;case"reauthViaPopup":case"reauthViaRedirect":return mv;default:vt(this.auth,"internal-error")}}resolve(e){Ht(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Ht(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const _v=new Ji(2e3,1e4);class Hr extends Ag{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Hr.currentPopupAction&&Hr.currentPopupAction.cancel(),Hr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return H(e,this.auth,"internal-error"),e}async onExecution(){Ht(this.filter.length===1,"Popup operations only handle one event");const e=fl();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Nt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(Nt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Hr.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if((r=(t=this.authWindow)==null?void 0:t.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Nt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,_v.get())};e()}}Hr.currentPopupAction=null;/**
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
 */const yv="pendingRedirect",Ho=new Map;class Iv extends Ag{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Ho.get(this.auth._key());if(!e){try{const r=await Ev(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Ho.set(this.auth._key(),e)}return this.bypassAuthState||Ho.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Ev(n,e){const t=Av(e),r=Tv(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function wv(n,e){Ho.set(n._key(),e)}function Tv(n){return qt(n._redirectPersistence)}function Av(n){return Wo(yv,n.config.apiKey,n.name)}async function vv(n,e,t=!1){if(Ze(n.app))return Promise.reject(Vt(n));const r=tn(n),s=fv(r,e),o=await new Iv(r,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
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
 */const bv=10*60*1e3;class Sv{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Rv(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!vg(e)){const s=((r=e.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";t.onError(Nt(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=bv&&this.cachedEventUids.clear(),this.cachedEventUids.has(yf(e))}saveEventToCache(e){this.cachedEventUids.add(yf(e)),this.lastProcessedEventTime=Date.now()}}function yf(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function vg({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Rv(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return vg(n);default:return!1}}/**
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
 */async function Pv(n,e={}){return jt(n,"GET","/v1/projects",e)}/**
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
 */const xv=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Cv=/^https?/;async function Dv(n){if(n.config.emulator)return;const{authorizedDomains:e}=await Pv(n);for(const t of e)try{if(kv(t))return}catch{}vt(n,"unauthorized-domain")}function kv(n){const e=Eu(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!Cv.test(t))return!1;if(xv.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const Nv=new Ji(3e4,6e4);function If(){const n=Ot().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Vv(n){return new Promise((e,t)=>{var s,i,o;function r(){If(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{If(),t(Nt(n,"network-request-failed"))},timeout:Nv.get()})}if((i=(s=Ot().gapi)==null?void 0:s.iframes)!=null&&i.Iframe)e(gapi.iframes.getContext());else if((o=Ot().gapi)!=null&&o.load)r();else{const c=SA("iframefcb");return Ot()[c]=()=>{gapi.load?r():t(Nt(n,"network-request-failed"))},og(`${bA()}?onload=${c}`).catch(u=>t(u))}}).catch(e=>{throw Ko=null,e})}let Ko=null;function Ov(n){return Ko=Ko||Vv(n),Ko}/**
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
 */const Lv=new Ji(5e3,15e3),Mv="__/auth/iframe",Fv="emulator/auth/iframe",Uv={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Bv=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function jv(n){const e=n.config;H(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?cl(e,Fv):`https://${n.config.authDomain}/${Mv}`,r={apiKey:e.apiKey,appName:n.name,v:br},s=Bv.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${Hi(r).slice(1)}`}async function Gv(n){const e=await Ov(n),t=Ot().gapi;return H(t,n,"internal-error"),e.open({where:document.body,url:jv(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Uv,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=Nt(n,"network-request-failed"),c=Ot().setTimeout(()=>{i(o)},Lv.get());function u(){Ot().clearTimeout(c),s(r)}r.ping(u).then(u,()=>{i(o)})}))}/**
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
 */const qv={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},$v=500,zv=600,Wv="_blank",Hv="http://localhost";class Ef{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Kv(n,e,t,r=$v,s=zv){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const u={...qv,width:r.toString(),height:s.toString(),top:i,left:o},l=Ne().toLowerCase();t&&(c=Zm(l)?Wv:t),Ym(l)&&(e=e||Hv,u.scrollbars="yes");const d=Object.entries(u).reduce((m,[I,b])=>`${m}${I}=${b},`,"");if(gA(l)&&c!=="_self")return Qv(e||"",c),new Ef(null);const f=window.open(e||"",c,d);H(f,n,"popup-blocked");try{f.focus()}catch{}return new Ef(f)}function Qv(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const Jv="__/auth/handler",Yv="emulator/auth/handler",Xv=encodeURIComponent("fac");async function wf(n,e,t,r,s,i){H(n.config.authDomain,n,"auth-domain-config-required"),H(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:br,eventId:s};if(e instanceof lg){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",Nw(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,f]of Object.entries({}))o[d]=f}if(e instanceof Xi){const d=e.getScopes().filter(f=>f!=="");d.length>0&&(o.scopes=d.join(","))}n.tenantId&&(o.tid=n.tenantId);const c=o;for(const d of Object.keys(c))c[d]===void 0&&delete c[d];const u=await n._getAppCheckToken(),l=u?`#${Xv}=${encodeURIComponent(u)}`:"";return`${Zv(n)}?${Hi(c).slice(1)}${l}`}function Zv({config:n}){return n.emulator?cl(n,Yv):`https://${n.authDomain}/${Jv}`}/**
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
 */const Jc="webStorageSupport";class eb{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=yg,this._completeRedirectFn=vv,this._overrideRedirectResult=wv}async _openPopup(e,t,r,s){var o;Ht((o=this.eventManagers[e._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const i=await wf(e,t,r,Eu(),s);return Kv(e,i,fl())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await wf(e,t,r,Eu(),s);return rv(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(Ht(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await Gv(e),r=new Sv(e);return t.register("authEvent",s=>(H(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Jc,{type:Jc},s=>{var o;const i=(o=s==null?void 0:s[0])==null?void 0:o[Jc];i!==void 0&&t(!!i),vt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Dv(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return sg()||Xm()||ll()}}const tb=eb;var Tf="@firebase/auth",Af="1.13.0";/**
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
 */class nb{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){H(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function rb(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function sb(n){Ft(new At("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;H(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:o,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:ig(n)},l=new TA(r,s,i,u);return kA(l,t),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Ft(new At("auth-internal",e=>{const t=tn(e.getProvider("auth").getImmediate());return(r=>new nb(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),dt(Tf,Af,rb(n)),dt(Tf,Af,"esm2020")}/**
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
 */const ib=5*60,ob=km("authIdTokenMaxAge")||ib;let vf=null;const ab=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>ob)return;const s=t==null?void 0:t.token;vf!==s&&(vf=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function cb(n=Qi()){const e=Zt(n,"auth");if(e.isInitialized())return e.getImmediate();const t=DA(n,{popupRedirectResolver:tb,persistence:[dv,ev,yg]}),r=km("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=ab(i.toString());JA(t,o,()=>o(t.currentUser)),QA(t,c=>o(c))}}const s=Cm("auth");return s&&NA(t,`http://${s}`),t}function ub(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}AA({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=Nt("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",ub().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});sb("Browser");var lb="firebase",hb="12.12.0";/**
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
 */dt(lb,hb,"app");/**
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
 */const Au=new Map,bg={activated:!1,tokenObservers:[]},db={initialized:!1,enabled:!1};function ke(n){return Au.get(n)||{...bg}}function fb(n,e){return Au.set(n,e),Au.get(n)}function za(){return db}/**
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
 */const Sg="https://content-firebaseappcheck.googleapis.com/v1",pb="exchangeRecaptchaV3Token",mb="exchangeDebugToken",bf={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:16*60*1e3},gb=24*60*60*1e3;/**
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
 */class _b{constructor(e,t,r,s,i){if(this.operation=e,this.retryPolicy=t,this.getWaitDuration=r,this.lowerBound=s,this.upperBound=i,this.pending=null,this.nextErrorWaitInterval=s,s>i)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new Di,this.pending.promise.catch(t=>{}),await yb(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new Di,this.pending.promise.catch(t=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(t){this.retryPolicy(t)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const t=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),t}}}function yb(n){return new Promise(e=>{setTimeout(e,n)})}/**
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
 */const Ib={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.","initial-throttle":"{$httpStatus} error. Attempts allowed again after {$time}",throttled:"Requests throttled due to previous {$httpStatus} error. Attempts allowed again after {$time}"},tt=new Ps("appCheck","AppCheck",Ib);/**
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
 */function Sf(n=!1){var e;return n?(e=self.grecaptcha)==null?void 0:e.enterprise:self.grecaptcha}function ml(n){if(!ke(n).activated)throw tt.create("use-before-activation",{appName:n.name})}function Rg(n){const e=Math.round(n/1e3),t=Math.floor(e/(3600*24)),r=Math.floor((e-t*3600*24)/3600),s=Math.floor((e-t*3600*24-r*3600)/60),i=e-t*3600*24-r*3600-s*60;let o="";return t&&(o+=No(t)+"d:"),r&&(o+=No(r)+"h:"),o+=No(s)+"m:"+No(i)+"s",o}function No(n){return n===0?"00":n>=10?n.toString():"0"+n}/**
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
 */async function gl({url:n,body:e},t){const r={"Content-Type":"application/json"},s=t.getImmediate({optional:!0});if(s){const f=await s.getHeartbeatsHeader();f&&(r["X-Firebase-Client"]=f)}const i={method:"POST",body:JSON.stringify(e),headers:r};let o;try{o=await fetch(n,i)}catch(f){throw tt.create("fetch-network-error",{originalErrorMessage:f==null?void 0:f.message})}if(o.status!==200)throw tt.create("fetch-status-error",{httpStatus:o.status});let c;try{c=await o.json()}catch(f){throw tt.create("fetch-parse-error",{originalErrorMessage:f==null?void 0:f.message})}const u=c.ttl.match(/^([\d.]+)(s)$/);if(!u||!u[2]||isNaN(Number(u[1])))throw tt.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${c.ttl}`});const l=Number(u[1])*1e3,d=Date.now();return{token:c.token,expireTimeMillis:d+l,issuedAtTimeMillis:d}}function Eb(n,e){const{projectId:t,appId:r,apiKey:s}=n.options;return{url:`${Sg}/projects/${t}/apps/${r}:${pb}?key=${s}`,body:{recaptcha_v3_token:e}}}function Pg(n,e){const{projectId:t,appId:r,apiKey:s}=n.options;return{url:`${Sg}/projects/${t}/apps/${r}:${mb}?key=${s}`,body:{debug_token:e}}}/**
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
 */const wb="firebase-app-check-database",Tb=1,Vi="firebase-app-check-store",xg="debug-token";let Vo=null;function Cg(){return Vo||(Vo=new Promise((n,e)=>{try{const t=indexedDB.open(wb,Tb);t.onsuccess=r=>{n(r.target.result)},t.onerror=r=>{var s;e(tt.create("storage-open",{originalErrorMessage:(s=r.target.error)==null?void 0:s.message}))},t.onupgradeneeded=r=>{const s=r.target.result;switch(r.oldVersion){case 0:s.createObjectStore(Vi,{keyPath:"compositeKey"})}}}catch(t){e(tt.create("storage-open",{originalErrorMessage:t==null?void 0:t.message}))}}),Vo)}function Ab(n){return kg(Ng(n))}function vb(n,e){return Dg(Ng(n),e)}function bb(n){return Dg(xg,n)}function Sb(){return kg(xg)}async function Dg(n,e){const r=(await Cg()).transaction(Vi,"readwrite"),i=r.objectStore(Vi).put({compositeKey:n,value:e});return new Promise((o,c)=>{i.onsuccess=u=>{o()},r.onerror=u=>{var l;c(tt.create("storage-set",{originalErrorMessage:(l=u.target.error)==null?void 0:l.message}))}})}async function kg(n){const t=(await Cg()).transaction(Vi,"readonly"),s=t.objectStore(Vi).get(n);return new Promise((i,o)=>{s.onsuccess=c=>{const u=c.target.result;i(u?u.value:void 0)},t.onerror=c=>{var u;o(tt.create("storage-get",{originalErrorMessage:(u=c.target.error)==null?void 0:u.message}))}})}function Ng(n){return`${n.options.appId}-${n.name}`}/**
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
 */const vn=new ja("@firebase/app-check");/**
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
 */async function Rb(n){if(Ba()){let e;try{e=await Ab(n)}catch(t){vn.warn(`Failed to read token from IndexedDB. Error: ${t}`)}return e}}function Yc(n,e){return Ba()?vb(n,e).catch(t=>{vn.warn(`Failed to write token to IndexedDB. Error: ${t}`)}):Promise.resolve()}async function Pb(){let n;try{n=await Sb()}catch{}if(n)return n;{const e=crypto.randomUUID();return bb(e).catch(t=>vn.warn(`Failed to persist debug token to IndexedDB. Error: ${t}`)),e}}/**
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
 */function _l(){return za().enabled}async function yl(){const n=za();if(n.enabled&&n.token)return n.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function xb(){const n=sl(),e=za();if(e.initialized=!0,typeof n.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&n.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;e.enabled=!0;const t=new Di;e.token=t,typeof n.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?t.resolve(n.FIREBASE_APPCHECK_DEBUG_TOKEN):t.resolve(Pb())}/**
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
 */const Cb={error:"UNKNOWN_ERROR"};function Db(n){return rl.encodeString(JSON.stringify(n),!1)}async function ma(n,e=!1,t=!1){const r=n.app;ml(r);const s=ke(r);let i=s.token,o;if(i&&!Kr(i)&&(s.token=void 0,i=void 0),!i){const l=await s.cachedTokenPromise;l&&(Kr(l)?i=l:await Yc(r,void 0))}if(!e&&i&&Kr(i))return{token:i.token};let c=!1;if(_l())try{const l=await yl();s.exchangeTokenPromise||(s.exchangeTokenPromise=gl(Pg(r,l),n.heartbeatServiceProvider).finally(()=>{s.exchangeTokenPromise=void 0}),c=!0);const d=await s.exchangeTokenPromise;return await Yc(r,d),s.token=d,{token:d.token}}catch(l){return l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?vn.warn(l.message):t&&vn.error(l),Xc(l)}try{s.exchangeTokenPromise||(s.exchangeTokenPromise=s.provider.getToken().finally(()=>{s.exchangeTokenPromise=void 0}),c=!0),i=await ke(r).exchangeTokenPromise}catch(l){l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?vn.warn(l.message):t&&vn.error(l),o=l}let u;return i?o?Kr(i)?u={token:i.token,internalError:o}:u=Xc(o):(u={token:i.token},s.token=i,await Yc(r,i)):u=Xc(o),c&&Lg(r,u),u}async function kb(n){const e=n.app;ml(e);const{provider:t}=ke(e);if(_l()){const r=await yl(),{token:s}=await gl(Pg(e,r),n.heartbeatServiceProvider);return{token:s}}else{const{token:r}=await t.getToken();return{token:r}}}function Vg(n,e,t,r){const{app:s}=n,i=ke(s),o={next:t,error:r,type:e};if(i.tokenObservers=[...i.tokenObservers,o],i.token&&Kr(i.token)){const c=i.token;Promise.resolve().then(()=>{t({token:c.token}),Rf(n)}).catch(()=>{})}i.cachedTokenPromise.then(()=>Rf(n))}function Og(n,e){const t=ke(n),r=t.tokenObservers.filter(s=>s.next!==e);r.length===0&&t.tokenRefresher&&t.tokenRefresher.isRunning()&&t.tokenRefresher.stop(),t.tokenObservers=r}function Rf(n){const{app:e}=n,t=ke(e);let r=t.tokenRefresher;r||(r=Nb(n),t.tokenRefresher=r),!r.isRunning()&&t.isTokenAutoRefreshEnabled&&r.start()}function Nb(n){const{app:e}=n;return new _b(async()=>{const t=ke(e);let r;if(t.token?r=await ma(n,!0):r=await ma(n),r.error)throw r.error;if(r.internalError)throw r.internalError},()=>!0,()=>{const t=ke(e);if(t.token){let r=t.token.issuedAtTimeMillis+(t.token.expireTimeMillis-t.token.issuedAtTimeMillis)*.5+3e5;const s=t.token.expireTimeMillis-5*60*1e3;return r=Math.min(r,s),Math.max(0,r-Date.now())}else return 0},bf.RETRIAL_MIN_WAIT,bf.RETRIAL_MAX_WAIT)}function Lg(n,e){const t=ke(n).tokenObservers;for(const r of t)try{r.type==="EXTERNAL"&&e.error!=null?r.error(e.error):r.next(e)}catch{}}function Kr(n){return n.expireTimeMillis-Date.now()>0}function Xc(n){return{token:Db(Cb),error:n}}/**
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
 */class Vb{constructor(e,t){this.app=e,this.heartbeatServiceProvider=t}_delete(){const{tokenObservers:e}=ke(this.app);for(const t of e)Og(this.app,t.next);return Promise.resolve()}}function Ob(n,e){return new Vb(n,e)}function Lb(n){return{getToken:e=>ma(n,e),getLimitedUseToken:()=>kb(n),addTokenListener:e=>Vg(n,"INTERNAL",e),removeTokenListener:e=>Og(n.app,e)}}const Mb="@firebase/app-check",Fb="0.11.2";/**
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
 */const Ub="https://www.google.com/recaptcha/api.js";function Bb(n,e){const t=new Di,r=ke(n);r.reCAPTCHAState={initialized:t};const s=jb(n),i=Sf(!1);return i?Pf(n,e,i,s,t):$b(()=>{const o=Sf(!1);if(!o)throw new Error("no recaptcha");Pf(n,e,o,s,t)}),t.promise}function Pf(n,e,t,r,s){t.ready(()=>{qb(n,e,t,r),s.resolve(t)})}function jb(n){const e=`fire_app_check_${n.name}`,t=document.createElement("div");return t.id=e,t.style.display="none",document.body.appendChild(t),e}async function Gb(n){ml(n);const t=await ke(n).reCAPTCHAState.initialized.promise;return new Promise((r,s)=>{const i=ke(n).reCAPTCHAState;t.ready(()=>{r(t.execute(i.widgetId,{action:"fire_app_check"}))})})}function qb(n,e,t,r){const s=t.render(r,{sitekey:e,size:"invisible",callback:()=>{ke(n).reCAPTCHAState.succeeded=!0},"error-callback":()=>{ke(n).reCAPTCHAState.succeeded=!1}}),i=ke(n);i.reCAPTCHAState={...i.reCAPTCHAState,widgetId:s}}function $b(n){const e=document.createElement("script");e.src=Ub,e.onload=n,document.head.appendChild(e)}/**
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
 */class Il{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(){var r,s,i;Wb(this._throttleData);const e=await Gb(this._app).catch(o=>{throw tt.create("recaptcha-error")});if(!((r=ke(this._app).reCAPTCHAState)!=null&&r.succeeded))throw tt.create("recaptcha-error");let t;try{t=await gl(Eb(this._app,e),this._heartbeatServiceProvider)}catch(o){throw(s=o.code)!=null&&s.includes("fetch-status-error")?(this._throttleData=zb(Number((i=o.customData)==null?void 0:i.httpStatus),this._throttleData),tt.create("initial-throttle",{time:Rg(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):o}return this._throttleData=null,t}initialize(e){this._app=e,this._heartbeatServiceProvider=Zt(e,"heartbeat"),Bb(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof Il?this._siteKey===e._siteKey:!1}}function zb(n,e){if(n===404||n===403)return{backoffCount:1,allowRequestsAfter:Date.now()+gb,httpStatus:n};{const t=e?e.backoffCount:0,r=jw(t,1e3,2);return{backoffCount:t+1,allowRequestsAfter:Date.now()+r,httpStatus:n}}}function Wb(n){if(n&&Date.now()-n.allowRequestsAfter<=0)throw tt.create("throttled",{time:Rg(n.allowRequestsAfter-Date.now()),httpStatus:n.httpStatus})}/**
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
 */function Hb(n=Qi(),e){n=X(n);const t=Zt(n,"app-check");if(za().initialized||xb(),_l()&&yl().then(s=>{}),t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(i.isTokenAutoRefreshEnabled===e.isTokenAutoRefreshEnabled&&i.provider.isEqual(e.provider))return s;throw tt.create("already-initialized",{appName:n.name})}const r=t.initialize({options:e});return Kb(n,e.provider,e.isTokenAutoRefreshEnabled),ke(n).isTokenAutoRefreshEnabled&&Vg(r,"INTERNAL",()=>{}),r}function Kb(n,e,t=!1){const r=fb(n,{...bg});r.activated=!0,r.provider=e,r.cachedTokenPromise=Rb(n).then(s=>(s&&Kr(s)&&(r.token=s,Lg(n,{token:s.token})),s)),r.isTokenAutoRefreshEnabled=t&&n.automaticDataCollectionEnabled,!n.automaticDataCollectionEnabled&&t&&vn.warn("`isTokenAutoRefreshEnabled` is true but `automaticDataCollectionEnabled` was set to false during `initializeApp()`. This blocks automatic token refresh."),r.provider.initialize(n)}async function qN(n,e){const t=await ma(n,e);if(t.error)throw t.error;if(t.internalError)throw t.internalError;return{token:t.token}}const Qb="app-check",xf="app-check-internal";function Jb(){Ft(new At(Qb,n=>{const e=n.getProvider("app").getImmediate(),t=n.getProvider("heartbeat");return Ob(e,t)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((n,e,t)=>{n.getProvider(xf).initialize()})),Ft(new At(xf,n=>{const e=n.getProvider("app-check").getImmediate();return Lb(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),dt(Mb,Fb)}Jb();var Cf=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var xn,Mg;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(T,y){function w(){}w.prototype=y.prototype,T.F=y.prototype,T.prototype=new w,T.prototype.constructor=T,T.D=function(v,A,R){for(var E=Array(arguments.length-2),Pe=2;Pe<arguments.length;Pe++)E[Pe-2]=arguments[Pe];return y.prototype[A].apply(v,E)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,t),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(T,y,w){w||(w=0);const v=Array(16);if(typeof y=="string")for(var A=0;A<16;++A)v[A]=y.charCodeAt(w++)|y.charCodeAt(w++)<<8|y.charCodeAt(w++)<<16|y.charCodeAt(w++)<<24;else for(A=0;A<16;++A)v[A]=y[w++]|y[w++]<<8|y[w++]<<16|y[w++]<<24;y=T.g[0],w=T.g[1],A=T.g[2];let R=T.g[3],E;E=y+(R^w&(A^R))+v[0]+3614090360&4294967295,y=w+(E<<7&4294967295|E>>>25),E=R+(A^y&(w^A))+v[1]+3905402710&4294967295,R=y+(E<<12&4294967295|E>>>20),E=A+(w^R&(y^w))+v[2]+606105819&4294967295,A=R+(E<<17&4294967295|E>>>15),E=w+(y^A&(R^y))+v[3]+3250441966&4294967295,w=A+(E<<22&4294967295|E>>>10),E=y+(R^w&(A^R))+v[4]+4118548399&4294967295,y=w+(E<<7&4294967295|E>>>25),E=R+(A^y&(w^A))+v[5]+1200080426&4294967295,R=y+(E<<12&4294967295|E>>>20),E=A+(w^R&(y^w))+v[6]+2821735955&4294967295,A=R+(E<<17&4294967295|E>>>15),E=w+(y^A&(R^y))+v[7]+4249261313&4294967295,w=A+(E<<22&4294967295|E>>>10),E=y+(R^w&(A^R))+v[8]+1770035416&4294967295,y=w+(E<<7&4294967295|E>>>25),E=R+(A^y&(w^A))+v[9]+2336552879&4294967295,R=y+(E<<12&4294967295|E>>>20),E=A+(w^R&(y^w))+v[10]+4294925233&4294967295,A=R+(E<<17&4294967295|E>>>15),E=w+(y^A&(R^y))+v[11]+2304563134&4294967295,w=A+(E<<22&4294967295|E>>>10),E=y+(R^w&(A^R))+v[12]+1804603682&4294967295,y=w+(E<<7&4294967295|E>>>25),E=R+(A^y&(w^A))+v[13]+4254626195&4294967295,R=y+(E<<12&4294967295|E>>>20),E=A+(w^R&(y^w))+v[14]+2792965006&4294967295,A=R+(E<<17&4294967295|E>>>15),E=w+(y^A&(R^y))+v[15]+1236535329&4294967295,w=A+(E<<22&4294967295|E>>>10),E=y+(A^R&(w^A))+v[1]+4129170786&4294967295,y=w+(E<<5&4294967295|E>>>27),E=R+(w^A&(y^w))+v[6]+3225465664&4294967295,R=y+(E<<9&4294967295|E>>>23),E=A+(y^w&(R^y))+v[11]+643717713&4294967295,A=R+(E<<14&4294967295|E>>>18),E=w+(R^y&(A^R))+v[0]+3921069994&4294967295,w=A+(E<<20&4294967295|E>>>12),E=y+(A^R&(w^A))+v[5]+3593408605&4294967295,y=w+(E<<5&4294967295|E>>>27),E=R+(w^A&(y^w))+v[10]+38016083&4294967295,R=y+(E<<9&4294967295|E>>>23),E=A+(y^w&(R^y))+v[15]+3634488961&4294967295,A=R+(E<<14&4294967295|E>>>18),E=w+(R^y&(A^R))+v[4]+3889429448&4294967295,w=A+(E<<20&4294967295|E>>>12),E=y+(A^R&(w^A))+v[9]+568446438&4294967295,y=w+(E<<5&4294967295|E>>>27),E=R+(w^A&(y^w))+v[14]+3275163606&4294967295,R=y+(E<<9&4294967295|E>>>23),E=A+(y^w&(R^y))+v[3]+4107603335&4294967295,A=R+(E<<14&4294967295|E>>>18),E=w+(R^y&(A^R))+v[8]+1163531501&4294967295,w=A+(E<<20&4294967295|E>>>12),E=y+(A^R&(w^A))+v[13]+2850285829&4294967295,y=w+(E<<5&4294967295|E>>>27),E=R+(w^A&(y^w))+v[2]+4243563512&4294967295,R=y+(E<<9&4294967295|E>>>23),E=A+(y^w&(R^y))+v[7]+1735328473&4294967295,A=R+(E<<14&4294967295|E>>>18),E=w+(R^y&(A^R))+v[12]+2368359562&4294967295,w=A+(E<<20&4294967295|E>>>12),E=y+(w^A^R)+v[5]+4294588738&4294967295,y=w+(E<<4&4294967295|E>>>28),E=R+(y^w^A)+v[8]+2272392833&4294967295,R=y+(E<<11&4294967295|E>>>21),E=A+(R^y^w)+v[11]+1839030562&4294967295,A=R+(E<<16&4294967295|E>>>16),E=w+(A^R^y)+v[14]+4259657740&4294967295,w=A+(E<<23&4294967295|E>>>9),E=y+(w^A^R)+v[1]+2763975236&4294967295,y=w+(E<<4&4294967295|E>>>28),E=R+(y^w^A)+v[4]+1272893353&4294967295,R=y+(E<<11&4294967295|E>>>21),E=A+(R^y^w)+v[7]+4139469664&4294967295,A=R+(E<<16&4294967295|E>>>16),E=w+(A^R^y)+v[10]+3200236656&4294967295,w=A+(E<<23&4294967295|E>>>9),E=y+(w^A^R)+v[13]+681279174&4294967295,y=w+(E<<4&4294967295|E>>>28),E=R+(y^w^A)+v[0]+3936430074&4294967295,R=y+(E<<11&4294967295|E>>>21),E=A+(R^y^w)+v[3]+3572445317&4294967295,A=R+(E<<16&4294967295|E>>>16),E=w+(A^R^y)+v[6]+76029189&4294967295,w=A+(E<<23&4294967295|E>>>9),E=y+(w^A^R)+v[9]+3654602809&4294967295,y=w+(E<<4&4294967295|E>>>28),E=R+(y^w^A)+v[12]+3873151461&4294967295,R=y+(E<<11&4294967295|E>>>21),E=A+(R^y^w)+v[15]+530742520&4294967295,A=R+(E<<16&4294967295|E>>>16),E=w+(A^R^y)+v[2]+3299628645&4294967295,w=A+(E<<23&4294967295|E>>>9),E=y+(A^(w|~R))+v[0]+4096336452&4294967295,y=w+(E<<6&4294967295|E>>>26),E=R+(w^(y|~A))+v[7]+1126891415&4294967295,R=y+(E<<10&4294967295|E>>>22),E=A+(y^(R|~w))+v[14]+2878612391&4294967295,A=R+(E<<15&4294967295|E>>>17),E=w+(R^(A|~y))+v[5]+4237533241&4294967295,w=A+(E<<21&4294967295|E>>>11),E=y+(A^(w|~R))+v[12]+1700485571&4294967295,y=w+(E<<6&4294967295|E>>>26),E=R+(w^(y|~A))+v[3]+2399980690&4294967295,R=y+(E<<10&4294967295|E>>>22),E=A+(y^(R|~w))+v[10]+4293915773&4294967295,A=R+(E<<15&4294967295|E>>>17),E=w+(R^(A|~y))+v[1]+2240044497&4294967295,w=A+(E<<21&4294967295|E>>>11),E=y+(A^(w|~R))+v[8]+1873313359&4294967295,y=w+(E<<6&4294967295|E>>>26),E=R+(w^(y|~A))+v[15]+4264355552&4294967295,R=y+(E<<10&4294967295|E>>>22),E=A+(y^(R|~w))+v[6]+2734768916&4294967295,A=R+(E<<15&4294967295|E>>>17),E=w+(R^(A|~y))+v[13]+1309151649&4294967295,w=A+(E<<21&4294967295|E>>>11),E=y+(A^(w|~R))+v[4]+4149444226&4294967295,y=w+(E<<6&4294967295|E>>>26),E=R+(w^(y|~A))+v[11]+3174756917&4294967295,R=y+(E<<10&4294967295|E>>>22),E=A+(y^(R|~w))+v[2]+718787259&4294967295,A=R+(E<<15&4294967295|E>>>17),E=w+(R^(A|~y))+v[9]+3951481745&4294967295,T.g[0]=T.g[0]+y&4294967295,T.g[1]=T.g[1]+(A+(E<<21&4294967295|E>>>11))&4294967295,T.g[2]=T.g[2]+A&4294967295,T.g[3]=T.g[3]+R&4294967295}r.prototype.v=function(T,y){y===void 0&&(y=T.length);const w=y-this.blockSize,v=this.C;let A=this.h,R=0;for(;R<y;){if(A==0)for(;R<=w;)s(this,T,R),R+=this.blockSize;if(typeof T=="string"){for(;R<y;)if(v[A++]=T.charCodeAt(R++),A==this.blockSize){s(this,v),A=0;break}}else for(;R<y;)if(v[A++]=T[R++],A==this.blockSize){s(this,v),A=0;break}}this.h=A,this.o+=y},r.prototype.A=function(){var T=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);T[0]=128;for(var y=1;y<T.length-8;++y)T[y]=0;y=this.o*8;for(var w=T.length-8;w<T.length;++w)T[w]=y&255,y/=256;for(this.v(T),T=Array(16),y=0,w=0;w<4;++w)for(let v=0;v<32;v+=8)T[y++]=this.g[w]>>>v&255;return T};function i(T,y){var w=c;return Object.prototype.hasOwnProperty.call(w,T)?w[T]:w[T]=y(T)}function o(T,y){this.h=y;const w=[];let v=!0;for(let A=T.length-1;A>=0;A--){const R=T[A]|0;v&&R==y||(w[A]=R,v=!1)}this.g=w}var c={};function u(T){return-128<=T&&T<128?i(T,function(y){return new o([y|0],y<0?-1:0)}):new o([T|0],T<0?-1:0)}function l(T){if(isNaN(T)||!isFinite(T))return f;if(T<0)return D(l(-T));const y=[];let w=1;for(let v=0;T>=w;v++)y[v]=T/w|0,w*=4294967296;return new o(y,0)}function d(T,y){if(T.length==0)throw Error("number format error: empty string");if(y=y||10,y<2||36<y)throw Error("radix out of range: "+y);if(T.charAt(0)=="-")return D(d(T.substring(1),y));if(T.indexOf("-")>=0)throw Error('number format error: interior "-" character');const w=l(Math.pow(y,8));let v=f;for(let R=0;R<T.length;R+=8){var A=Math.min(8,T.length-R);const E=parseInt(T.substring(R,R+A),y);A<8?(A=l(Math.pow(y,A)),v=v.j(A).add(l(E))):(v=v.j(w),v=v.add(l(E)))}return v}var f=u(0),m=u(1),I=u(16777216);n=o.prototype,n.m=function(){if(x(this))return-D(this).m();let T=0,y=1;for(let w=0;w<this.g.length;w++){const v=this.i(w);T+=(v>=0?v:4294967296+v)*y,y*=4294967296}return T},n.toString=function(T){if(T=T||10,T<2||36<T)throw Error("radix out of range: "+T);if(b(this))return"0";if(x(this))return"-"+D(this).toString(T);const y=l(Math.pow(T,6));var w=this;let v="";for(;;){const A=z(w,y).g;w=O(w,A.j(y));let R=((w.g.length>0?w.g[0]:w.h)>>>0).toString(T);if(w=A,b(w))return R+v;for(;R.length<6;)R="0"+R;v=R+v}},n.i=function(T){return T<0?0:T<this.g.length?this.g[T]:this.h};function b(T){if(T.h!=0)return!1;for(let y=0;y<T.g.length;y++)if(T.g[y]!=0)return!1;return!0}function x(T){return T.h==-1}n.l=function(T){return T=O(this,T),x(T)?-1:b(T)?0:1};function D(T){const y=T.g.length,w=[];for(let v=0;v<y;v++)w[v]=~T.g[v];return new o(w,~T.h).add(m)}n.abs=function(){return x(this)?D(this):this},n.add=function(T){const y=Math.max(this.g.length,T.g.length),w=[];let v=0;for(let A=0;A<=y;A++){let R=v+(this.i(A)&65535)+(T.i(A)&65535),E=(R>>>16)+(this.i(A)>>>16)+(T.i(A)>>>16);v=E>>>16,R&=65535,E&=65535,w[A]=E<<16|R}return new o(w,w[w.length-1]&-2147483648?-1:0)};function O(T,y){return T.add(D(y))}n.j=function(T){if(b(this)||b(T))return f;if(x(this))return x(T)?D(this).j(D(T)):D(D(this).j(T));if(x(T))return D(this.j(D(T)));if(this.l(I)<0&&T.l(I)<0)return l(this.m()*T.m());const y=this.g.length+T.g.length,w=[];for(var v=0;v<2*y;v++)w[v]=0;for(v=0;v<this.g.length;v++)for(let A=0;A<T.g.length;A++){const R=this.i(v)>>>16,E=this.i(v)&65535,Pe=T.i(A)>>>16,gt=T.i(A)&65535;w[2*v+2*A]+=E*gt,B(w,2*v+2*A),w[2*v+2*A+1]+=R*gt,B(w,2*v+2*A+1),w[2*v+2*A+1]+=E*Pe,B(w,2*v+2*A+1),w[2*v+2*A+2]+=R*Pe,B(w,2*v+2*A+2)}for(T=0;T<y;T++)w[T]=w[2*T+1]<<16|w[2*T];for(T=y;T<2*y;T++)w[T]=0;return new o(w,0)};function B(T,y){for(;(T[y]&65535)!=T[y];)T[y+1]+=T[y]>>>16,T[y]&=65535,y++}function U(T,y){this.g=T,this.h=y}function z(T,y){if(b(y))throw Error("division by zero");if(b(T))return new U(f,f);if(x(T))return y=z(D(T),y),new U(D(y.g),D(y.h));if(x(y))return y=z(T,D(y)),new U(D(y.g),y.h);if(T.g.length>30){if(x(T)||x(y))throw Error("slowDivide_ only works with positive integers.");for(var w=m,v=y;v.l(T)<=0;)w=W(w),v=W(v);var A=Q(w,1),R=Q(v,1);for(v=Q(v,2),w=Q(w,2);!b(v);){var E=R.add(v);E.l(T)<=0&&(A=A.add(w),R=E),v=Q(v,1),w=Q(w,1)}return y=O(T,A.j(y)),new U(A,y)}for(A=f;T.l(y)>=0;){for(w=Math.max(1,Math.floor(T.m()/y.m())),v=Math.ceil(Math.log(w)/Math.LN2),v=v<=48?1:Math.pow(2,v-48),R=l(w),E=R.j(y);x(E)||E.l(T)>0;)w-=v,R=l(w),E=R.j(y);b(R)&&(R=m),A=A.add(R),T=O(T,E)}return new U(A,T)}n.B=function(T){return z(this,T).h},n.and=function(T){const y=Math.max(this.g.length,T.g.length),w=[];for(let v=0;v<y;v++)w[v]=this.i(v)&T.i(v);return new o(w,this.h&T.h)},n.or=function(T){const y=Math.max(this.g.length,T.g.length),w=[];for(let v=0;v<y;v++)w[v]=this.i(v)|T.i(v);return new o(w,this.h|T.h)},n.xor=function(T){const y=Math.max(this.g.length,T.g.length),w=[];for(let v=0;v<y;v++)w[v]=this.i(v)^T.i(v);return new o(w,this.h^T.h)};function W(T){const y=T.g.length+1,w=[];for(let v=0;v<y;v++)w[v]=T.i(v)<<1|T.i(v-1)>>>31;return new o(w,T.h)}function Q(T,y){const w=y>>5;y%=32;const v=T.g.length-w,A=[];for(let R=0;R<v;R++)A[R]=y>0?T.i(R+w)>>>y|T.i(R+w+1)<<32-y:T.i(R+w);return new o(A,T.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,Mg=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=l,o.fromString=d,xn=o}).apply(typeof Cf<"u"?Cf:typeof self<"u"?self:typeof window<"u"?window:{});var Oo=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Fg,mi,Ug,Qo,vu,Bg,jg,Gg;(function(){var n,e=Object.defineProperty;function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Oo=="object"&&Oo];for(var h=0;h<a.length;++h){var p=a[h];if(p&&p.Math==Math)return p}throw Error("Cannot find global object")}var r=t(this);function s(a,h){if(h)e:{var p=r;a=a.split(".");for(var g=0;g<a.length-1;g++){var P=a[g];if(!(P in p))break e;p=p[P]}a=a[a.length-1],g=p[a],h=h(g),h!=g&&h!=null&&e(p,a,{configurable:!0,writable:!0,value:h})}}s("Symbol.dispose",function(a){return a||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(a){return a||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(a){return a||function(h){var p=[],g;for(g in h)Object.prototype.hasOwnProperty.call(h,g)&&p.push([g,h[g]]);return p}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},o=this||self;function c(a){var h=typeof a;return h=="object"&&a!=null||h=="function"}function u(a,h,p){return a.call.apply(a.bind,arguments)}function l(a,h,p){return l=u,l.apply(null,arguments)}function d(a,h){var p=Array.prototype.slice.call(arguments,1);return function(){var g=p.slice();return g.push.apply(g,arguments),a.apply(this,g)}}function f(a,h){function p(){}p.prototype=h.prototype,a.Z=h.prototype,a.prototype=new p,a.prototype.constructor=a,a.Ob=function(g,P,k){for(var F=Array(arguments.length-2),Y=2;Y<arguments.length;Y++)F[Y-2]=arguments[Y];return h.prototype[P].apply(g,F)}}var m=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?a=>a&&AsyncContext.Snapshot.wrap(a):a=>a;function I(a){const h=a.length;if(h>0){const p=Array(h);for(let g=0;g<h;g++)p[g]=a[g];return p}return[]}function b(a,h){for(let g=1;g<arguments.length;g++){const P=arguments[g];var p=typeof P;if(p=p!="object"?p:P?Array.isArray(P)?"array":p:"null",p=="array"||p=="object"&&typeof P.length=="number"){p=a.length||0;const k=P.length||0;a.length=p+k;for(let F=0;F<k;F++)a[p+F]=P[F]}else a.push(P)}}class x{constructor(h,p){this.i=h,this.j=p,this.h=0,this.g=null}get(){let h;return this.h>0?(this.h--,h=this.g,this.g=h.next,h.next=null):h=this.i(),h}}function D(a){o.setTimeout(()=>{throw a},0)}function O(){var a=T;let h=null;return a.g&&(h=a.g,a.g=a.g.next,a.g||(a.h=null),h.next=null),h}class B{constructor(){this.h=this.g=null}add(h,p){const g=U.get();g.set(h,p),this.h?this.h.next=g:this.g=g,this.h=g}}var U=new x(()=>new z,a=>a.reset());class z{constructor(){this.next=this.g=this.h=null}set(h,p){this.h=h,this.g=p,this.next=null}reset(){this.next=this.g=this.h=null}}let W,Q=!1,T=new B,y=()=>{const a=Promise.resolve(void 0);W=()=>{a.then(w)}};function w(){for(var a;a=O();){try{a.h.call(a.g)}catch(p){D(p)}var h=U;h.j(a),h.h<100&&(h.h++,a.next=h.g,h.g=a)}Q=!1}function v(){this.u=this.u,this.C=this.C}v.prototype.u=!1,v.prototype.dispose=function(){this.u||(this.u=!0,this.N())},v.prototype[Symbol.dispose]=function(){this.dispose()},v.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function A(a,h){this.type=a,this.g=this.target=h,this.defaultPrevented=!1}A.prototype.h=function(){this.defaultPrevented=!0};var R=function(){if(!o.addEventListener||!Object.defineProperty)return!1;var a=!1,h=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const p=()=>{};o.addEventListener("test",p,h),o.removeEventListener("test",p,h)}catch{}return a}();function E(a){return/^[\s\xa0]*$/.test(a)}function Pe(a,h){A.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a&&this.init(a,h)}f(Pe,A),Pe.prototype.init=function(a,h){const p=this.type=a.type,g=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement,this.g=h,h=a.relatedTarget,h||(p=="mouseover"?h=a.fromElement:p=="mouseout"&&(h=a.toElement)),this.relatedTarget=h,g?(this.clientX=g.clientX!==void 0?g.clientX:g.pageX,this.clientY=g.clientY!==void 0?g.clientY:g.pageY,this.screenX=g.screenX||0,this.screenY=g.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=a.pointerType,this.state=a.state,this.i=a,a.defaultPrevented&&Pe.Z.h.call(this)},Pe.prototype.h=function(){Pe.Z.h.call(this);const a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var gt="closure_listenable_"+(Math.random()*1e6|0),wE=0;function TE(a,h,p,g,P){this.listener=a,this.proxy=null,this.src=h,this.type=p,this.capture=!!g,this.ha=P,this.key=++wE,this.da=this.fa=!1}function _o(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function yo(a,h,p){for(const g in a)h.call(p,a[g],g,a)}function AE(a,h){for(const p in a)h.call(void 0,a[p],p,a)}function Hh(a){const h={};for(const p in a)h[p]=a[p];return h}const Kh="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Qh(a,h){let p,g;for(let P=1;P<arguments.length;P++){g=arguments[P];for(p in g)a[p]=g[p];for(let k=0;k<Kh.length;k++)p=Kh[k],Object.prototype.hasOwnProperty.call(g,p)&&(a[p]=g[p])}}function Io(a){this.src=a,this.g={},this.h=0}Io.prototype.add=function(a,h,p,g,P){const k=a.toString();a=this.g[k],a||(a=this.g[k]=[],this.h++);const F=wc(a,h,g,P);return F>-1?(h=a[F],p||(h.fa=!1)):(h=new TE(h,this.src,k,!!g,P),h.fa=p,a.push(h)),h};function Ec(a,h){const p=h.type;if(p in a.g){var g=a.g[p],P=Array.prototype.indexOf.call(g,h,void 0),k;(k=P>=0)&&Array.prototype.splice.call(g,P,1),k&&(_o(h),a.g[p].length==0&&(delete a.g[p],a.h--))}}function wc(a,h,p,g){for(let P=0;P<a.length;++P){const k=a[P];if(!k.da&&k.listener==h&&k.capture==!!p&&k.ha==g)return P}return-1}var Tc="closure_lm_"+(Math.random()*1e6|0),Ac={};function Jh(a,h,p,g,P){if(Array.isArray(h)){for(let k=0;k<h.length;k++)Jh(a,h[k],p,g,P);return null}return p=Zh(p),a&&a[gt]?a.J(h,p,c(g)?!!g.capture:!1,P):vE(a,h,p,!1,g,P)}function vE(a,h,p,g,P,k){if(!h)throw Error("Invalid event type");const F=c(P)?!!P.capture:!!P;let Y=bc(a);if(Y||(a[Tc]=Y=new Io(a)),p=Y.add(h,p,g,F,k),p.proxy)return p;if(g=bE(),p.proxy=g,g.src=a,g.listener=p,a.addEventListener)R||(P=F),P===void 0&&(P=!1),a.addEventListener(h.toString(),g,P);else if(a.attachEvent)a.attachEvent(Xh(h.toString()),g);else if(a.addListener&&a.removeListener)a.addListener(g);else throw Error("addEventListener and attachEvent are unavailable.");return p}function bE(){function a(p){return h.call(a.src,a.listener,p)}const h=SE;return a}function Yh(a,h,p,g,P){if(Array.isArray(h))for(var k=0;k<h.length;k++)Yh(a,h[k],p,g,P);else g=c(g)?!!g.capture:!!g,p=Zh(p),a&&a[gt]?(a=a.i,k=String(h).toString(),k in a.g&&(h=a.g[k],p=wc(h,p,g,P),p>-1&&(_o(h[p]),Array.prototype.splice.call(h,p,1),h.length==0&&(delete a.g[k],a.h--)))):a&&(a=bc(a))&&(h=a.g[h.toString()],a=-1,h&&(a=wc(h,p,g,P)),(p=a>-1?h[a]:null)&&vc(p))}function vc(a){if(typeof a!="number"&&a&&!a.da){var h=a.src;if(h&&h[gt])Ec(h.i,a);else{var p=a.type,g=a.proxy;h.removeEventListener?h.removeEventListener(p,g,a.capture):h.detachEvent?h.detachEvent(Xh(p),g):h.addListener&&h.removeListener&&h.removeListener(g),(p=bc(h))?(Ec(p,a),p.h==0&&(p.src=null,h[Tc]=null)):_o(a)}}}function Xh(a){return a in Ac?Ac[a]:Ac[a]="on"+a}function SE(a,h){if(a.da)a=!0;else{h=new Pe(h,this);const p=a.listener,g=a.ha||a.src;a.fa&&vc(a),a=p.call(g,h)}return a}function bc(a){return a=a[Tc],a instanceof Io?a:null}var Sc="__closure_events_fn_"+(Math.random()*1e9>>>0);function Zh(a){return typeof a=="function"?a:(a[Sc]||(a[Sc]=function(h){return a.handleEvent(h)}),a[Sc])}function $e(){v.call(this),this.i=new Io(this),this.M=this,this.G=null}f($e,v),$e.prototype[gt]=!0,$e.prototype.removeEventListener=function(a,h,p,g){Yh(this,a,h,p,g)};function Qe(a,h){var p,g=a.G;if(g)for(p=[];g;g=g.G)p.push(g);if(a=a.M,g=h.type||h,typeof h=="string")h=new A(h,a);else if(h instanceof A)h.target=h.target||a;else{var P=h;h=new A(g,a),Qh(h,P)}P=!0;let k,F;if(p)for(F=p.length-1;F>=0;F--)k=h.g=p[F],P=Eo(k,g,!0,h)&&P;if(k=h.g=a,P=Eo(k,g,!0,h)&&P,P=Eo(k,g,!1,h)&&P,p)for(F=0;F<p.length;F++)k=h.g=p[F],P=Eo(k,g,!1,h)&&P}$e.prototype.N=function(){if($e.Z.N.call(this),this.i){var a=this.i;for(const h in a.g){const p=a.g[h];for(let g=0;g<p.length;g++)_o(p[g]);delete a.g[h],a.h--}}this.G=null},$e.prototype.J=function(a,h,p,g){return this.i.add(String(a),h,!1,p,g)},$e.prototype.K=function(a,h,p,g){return this.i.add(String(a),h,!0,p,g)};function Eo(a,h,p,g){if(h=a.i.g[String(h)],!h)return!0;h=h.concat();let P=!0;for(let k=0;k<h.length;++k){const F=h[k];if(F&&!F.da&&F.capture==p){const Y=F.listener,xe=F.ha||F.src;F.fa&&Ec(a.i,F),P=Y.call(xe,g)!==!1&&P}}return P&&!g.defaultPrevented}function RE(a,h){if(typeof a!="function")if(a&&typeof a.handleEvent=="function")a=l(a.handleEvent,a);else throw Error("Invalid listener argument");return Number(h)>2147483647?-1:o.setTimeout(a,h||0)}function ed(a){a.g=RE(()=>{a.g=null,a.i&&(a.i=!1,ed(a))},a.l);const h=a.h;a.h=null,a.m.apply(null,h)}class PE extends v{constructor(h,p){super(),this.m=h,this.l=p,this.h=null,this.i=!1,this.g=null}j(h){this.h=arguments,this.g?this.i=!0:ed(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function $s(a){v.call(this),this.h=a,this.g={}}f($s,v);var td=[];function nd(a){yo(a.g,function(h,p){this.g.hasOwnProperty(p)&&vc(h)},a),a.g={}}$s.prototype.N=function(){$s.Z.N.call(this),nd(this)},$s.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Rc=o.JSON.stringify,xE=o.JSON.parse,CE=class{stringify(a){return o.JSON.stringify(a,void 0)}parse(a){return o.JSON.parse(a,void 0)}};function rd(){}function sd(){}var zs={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Pc(){A.call(this,"d")}f(Pc,A);function xc(){A.call(this,"c")}f(xc,A);var Qn={},id=null;function wo(){return id=id||new $e}Qn.Ia="serverreachability";function od(a){A.call(this,Qn.Ia,a)}f(od,A);function Ws(a){const h=wo();Qe(h,new od(h))}Qn.STAT_EVENT="statevent";function ad(a,h){A.call(this,Qn.STAT_EVENT,a),this.stat=h}f(ad,A);function Je(a){const h=wo();Qe(h,new ad(h,a))}Qn.Ja="timingevent";function cd(a,h){A.call(this,Qn.Ja,a),this.size=h}f(cd,A);function Hs(a,h){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){a()},h)}function Ks(){this.g=!0}Ks.prototype.ua=function(){this.g=!1};function DE(a,h,p,g,P,k){a.info(function(){if(a.g)if(k){var F="",Y=k.split("&");for(let le=0;le<Y.length;le++){var xe=Y[le].split("=");if(xe.length>1){const Le=xe[0];xe=xe[1];const Rt=Le.split("_");F=Rt.length>=2&&Rt[1]=="type"?F+(Le+"="+xe+"&"):F+(Le+"=redacted&")}}}else F=null;else F=k;return"XMLHTTP REQ ("+g+") [attempt "+P+"]: "+h+`
`+p+`
`+F})}function kE(a,h,p,g,P,k,F){a.info(function(){return"XMLHTTP RESP ("+g+") [ attempt "+P+"]: "+h+`
`+p+`
`+k+" "+F})}function Vr(a,h,p,g){a.info(function(){return"XMLHTTP TEXT ("+h+"): "+VE(a,p)+(g?" "+g:"")})}function NE(a,h){a.info(function(){return"TIMEOUT: "+h})}Ks.prototype.info=function(){};function VE(a,h){if(!a.g)return h;if(!h)return null;try{const k=JSON.parse(h);if(k){for(a=0;a<k.length;a++)if(Array.isArray(k[a])){var p=k[a];if(!(p.length<2)){var g=p[1];if(Array.isArray(g)&&!(g.length<1)){var P=g[0];if(P!="noop"&&P!="stop"&&P!="close")for(let F=1;F<g.length;F++)g[F]=""}}}}return Rc(k)}catch{return h}}var To={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},ud={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},ld;function Cc(){}f(Cc,rd),Cc.prototype.g=function(){return new XMLHttpRequest},ld=new Cc;function Qs(a){return encodeURIComponent(String(a))}function OE(a){var h=1;a=a.split(":");const p=[];for(;h>0&&a.length;)p.push(a.shift()),h--;return a.length&&p.push(a.join(":")),p}function an(a,h,p,g){this.j=a,this.i=h,this.l=p,this.S=g||1,this.V=new $s(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new hd}function hd(){this.i=null,this.g="",this.h=!1}var dd={},Dc={};function kc(a,h,p){a.M=1,a.A=vo(St(h)),a.u=p,a.R=!0,fd(a,null)}function fd(a,h){a.F=Date.now(),Ao(a),a.B=St(a.A);var p=a.B,g=a.S;Array.isArray(g)||(g=[String(g)]),Sd(p.i,"t",g),a.C=0,p=a.j.L,a.h=new hd,a.g=$d(a.j,p?h:null,!a.u),a.P>0&&(a.O=new PE(l(a.Y,a,a.g),a.P)),h=a.V,p=a.g,g=a.ba;var P="readystatechange";Array.isArray(P)||(P&&(td[0]=P.toString()),P=td);for(let k=0;k<P.length;k++){const F=Jh(p,P[k],g||h.handleEvent,!1,h.h||h);if(!F)break;h.g[F.key]=F}h=a.J?Hh(a.J):{},a.u?(a.v||(a.v="POST"),h["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.B,a.v,a.u,h)):(a.v="GET",a.g.ea(a.B,a.v,null,h)),Ws(),DE(a.i,a.v,a.B,a.l,a.S,a.u)}an.prototype.ba=function(a){a=a.target;const h=this.O;h&&ln(a)==3?h.j():this.Y(a)},an.prototype.Y=function(a){try{if(a==this.g)e:{const Y=ln(this.g),xe=this.g.ya(),le=this.g.ca();if(!(Y<3)&&(Y!=3||this.g&&(this.h.h||this.g.la()||Nd(this.g)))){this.K||Y!=4||xe==7||(xe==8||le<=0?Ws(3):Ws(2)),Nc(this);var h=this.g.ca();this.X=h;var p=LE(this);if(this.o=h==200,kE(this.i,this.v,this.B,this.l,this.S,Y,h),this.o){if(this.U&&!this.L){t:{if(this.g){var g,P=this.g;if((g=P.g?P.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!E(g)){var k=g;break t}}k=null}if(a=k)Vr(this.i,this.l,a,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Vc(this,a);else{this.o=!1,this.m=3,Je(12),Jn(this),Js(this);break e}}if(this.R){a=!0;let Le;for(;!this.K&&this.C<p.length;)if(Le=ME(this,p),Le==Dc){Y==4&&(this.m=4,Je(14),a=!1),Vr(this.i,this.l,null,"[Incomplete Response]");break}else if(Le==dd){this.m=4,Je(15),Vr(this.i,this.l,p,"[Invalid Chunk]"),a=!1;break}else Vr(this.i,this.l,Le,null),Vc(this,Le);if(pd(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Y!=4||p.length!=0||this.h.h||(this.m=1,Je(16),a=!1),this.o=this.o&&a,!a)Vr(this.i,this.l,p,"[Invalid Chunked Response]"),Jn(this),Js(this);else if(p.length>0&&!this.W){this.W=!0;var F=this.j;F.g==this&&F.aa&&!F.P&&(F.j.info("Great, no buffering proxy detected. Bytes received: "+p.length),Gc(F),F.P=!0,Je(11))}}else Vr(this.i,this.l,p,null),Vc(this,p);Y==4&&Jn(this),this.o&&!this.K&&(Y==4?Bd(this.j,this):(this.o=!1,Ao(this)))}else YE(this.g),h==400&&p.indexOf("Unknown SID")>0?(this.m=3,Je(12)):(this.m=0,Je(13)),Jn(this),Js(this)}}}catch{}finally{}};function LE(a){if(!pd(a))return a.g.la();const h=Nd(a.g);if(h==="")return"";let p="";const g=h.length,P=ln(a.g)==4;if(!a.h.i){if(typeof TextDecoder>"u")return Jn(a),Js(a),"";a.h.i=new o.TextDecoder}for(let k=0;k<g;k++)a.h.h=!0,p+=a.h.i.decode(h[k],{stream:!(P&&k==g-1)});return h.length=0,a.h.g+=p,a.C=0,a.h.g}function pd(a){return a.g?a.v=="GET"&&a.M!=2&&a.j.Aa:!1}function ME(a,h){var p=a.C,g=h.indexOf(`
`,p);return g==-1?Dc:(p=Number(h.substring(p,g)),isNaN(p)?dd:(g+=1,g+p>h.length?Dc:(h=h.slice(g,g+p),a.C=g+p,h)))}an.prototype.cancel=function(){this.K=!0,Jn(this)};function Ao(a){a.T=Date.now()+a.H,md(a,a.H)}function md(a,h){if(a.D!=null)throw Error("WatchDog timer not null");a.D=Hs(l(a.aa,a),h)}function Nc(a){a.D&&(o.clearTimeout(a.D),a.D=null)}an.prototype.aa=function(){this.D=null;const a=Date.now();a-this.T>=0?(NE(this.i,this.B),this.M!=2&&(Ws(),Je(17)),Jn(this),this.m=2,Js(this)):md(this,this.T-a)};function Js(a){a.j.I==0||a.K||Bd(a.j,a)}function Jn(a){Nc(a);var h=a.O;h&&typeof h.dispose=="function"&&h.dispose(),a.O=null,nd(a.V),a.g&&(h=a.g,a.g=null,h.abort(),h.dispose())}function Vc(a,h){try{var p=a.j;if(p.I!=0&&(p.g==a||Oc(p.h,a))){if(!a.L&&Oc(p.h,a)&&p.I==3){try{var g=p.Ba.g.parse(h)}catch{g=null}if(Array.isArray(g)&&g.length==3){var P=g;if(P[0]==0){e:if(!p.v){if(p.g)if(p.g.F+3e3<a.F)xo(p),Ro(p);else break e;jc(p),Je(18)}}else p.xa=P[1],0<p.xa-p.K&&P[2]<37500&&p.F&&p.A==0&&!p.C&&(p.C=Hs(l(p.Va,p),6e3));yd(p.h)<=1&&p.ta&&(p.ta=void 0)}else Xn(p,11)}else if((a.L||p.g==a)&&xo(p),!E(h))for(P=p.Ba.g.parse(h),h=0;h<P.length;h++){let le=P[h];const Le=le[0];if(!(Le<=p.K))if(p.K=Le,le=le[1],p.I==2)if(le[0]=="c"){p.M=le[1],p.ba=le[2];const Rt=le[3];Rt!=null&&(p.ka=Rt,p.j.info("VER="+p.ka));const Zn=le[4];Zn!=null&&(p.za=Zn,p.j.info("SVER="+p.za));const hn=le[5];hn!=null&&typeof hn=="number"&&hn>0&&(g=1.5*hn,p.O=g,p.j.info("backChannelRequestTimeoutMs_="+g)),g=p;const dn=a.g;if(dn){const Do=dn.g?dn.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Do){var k=g.h;k.g||Do.indexOf("spdy")==-1&&Do.indexOf("quic")==-1&&Do.indexOf("h2")==-1||(k.j=k.l,k.g=new Set,k.h&&(Lc(k,k.h),k.h=null))}if(g.G){const qc=dn.g?dn.g.getResponseHeader("X-HTTP-Session-Id"):null;qc&&(g.wa=qc,de(g.J,g.G,qc))}}p.I=3,p.l&&p.l.ra(),p.aa&&(p.T=Date.now()-a.F,p.j.info("Handshake RTT: "+p.T+"ms")),g=p;var F=a;if(g.na=qd(g,g.L?g.ba:null,g.W),F.L){Id(g.h,F);var Y=F,xe=g.O;xe&&(Y.H=xe),Y.D&&(Nc(Y),Ao(Y)),g.g=F}else Fd(g);p.i.length>0&&Po(p)}else le[0]!="stop"&&le[0]!="close"||Xn(p,7);else p.I==3&&(le[0]=="stop"||le[0]=="close"?le[0]=="stop"?Xn(p,7):Bc(p):le[0]!="noop"&&p.l&&p.l.qa(le),p.A=0)}}Ws(4)}catch{}}var FE=class{constructor(a,h){this.g=a,this.map=h}};function gd(a){this.l=a||10,o.PerformanceNavigationTiming?(a=o.performance.getEntriesByType("navigation"),a=a.length>0&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function _d(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function yd(a){return a.h?1:a.g?a.g.size:0}function Oc(a,h){return a.h?a.h==h:a.g?a.g.has(h):!1}function Lc(a,h){a.g?a.g.add(h):a.h=h}function Id(a,h){a.h&&a.h==h?a.h=null:a.g&&a.g.has(h)&&a.g.delete(h)}gd.prototype.cancel=function(){if(this.i=Ed(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Ed(a){if(a.h!=null)return a.i.concat(a.h.G);if(a.g!=null&&a.g.size!==0){let h=a.i;for(const p of a.g.values())h=h.concat(p.G);return h}return I(a.i)}var wd=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function UE(a,h){if(a){a=a.split("&");for(let p=0;p<a.length;p++){const g=a[p].indexOf("=");let P,k=null;g>=0?(P=a[p].substring(0,g),k=a[p].substring(g+1)):P=a[p],h(P,k?decodeURIComponent(k.replace(/\+/g," ")):"")}}}function cn(a){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let h;a instanceof cn?(this.l=a.l,Ys(this,a.j),this.o=a.o,this.g=a.g,Xs(this,a.u),this.h=a.h,Mc(this,Rd(a.i)),this.m=a.m):a&&(h=String(a).match(wd))?(this.l=!1,Ys(this,h[1]||"",!0),this.o=Zs(h[2]||""),this.g=Zs(h[3]||"",!0),Xs(this,h[4]),this.h=Zs(h[5]||"",!0),Mc(this,h[6]||"",!0),this.m=Zs(h[7]||"")):(this.l=!1,this.i=new ti(null,this.l))}cn.prototype.toString=function(){const a=[];var h=this.j;h&&a.push(ei(h,Td,!0),":");var p=this.g;return(p||h=="file")&&(a.push("//"),(h=this.o)&&a.push(ei(h,Td,!0),"@"),a.push(Qs(p).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),p=this.u,p!=null&&a.push(":",String(p))),(p=this.h)&&(this.g&&p.charAt(0)!="/"&&a.push("/"),a.push(ei(p,p.charAt(0)=="/"?GE:jE,!0))),(p=this.i.toString())&&a.push("?",p),(p=this.m)&&a.push("#",ei(p,$E)),a.join("")},cn.prototype.resolve=function(a){const h=St(this);let p=!!a.j;p?Ys(h,a.j):p=!!a.o,p?h.o=a.o:p=!!a.g,p?h.g=a.g:p=a.u!=null;var g=a.h;if(p)Xs(h,a.u);else if(p=!!a.h){if(g.charAt(0)!="/")if(this.g&&!this.h)g="/"+g;else{var P=h.h.lastIndexOf("/");P!=-1&&(g=h.h.slice(0,P+1)+g)}if(P=g,P==".."||P==".")g="";else if(P.indexOf("./")!=-1||P.indexOf("/.")!=-1){g=P.lastIndexOf("/",0)==0,P=P.split("/");const k=[];for(let F=0;F<P.length;){const Y=P[F++];Y=="."?g&&F==P.length&&k.push(""):Y==".."?((k.length>1||k.length==1&&k[0]!="")&&k.pop(),g&&F==P.length&&k.push("")):(k.push(Y),g=!0)}g=k.join("/")}else g=P}return p?h.h=g:p=a.i.toString()!=="",p?Mc(h,Rd(a.i)):p=!!a.m,p&&(h.m=a.m),h};function St(a){return new cn(a)}function Ys(a,h,p){a.j=p?Zs(h,!0):h,a.j&&(a.j=a.j.replace(/:$/,""))}function Xs(a,h){if(h){if(h=Number(h),isNaN(h)||h<0)throw Error("Bad port number "+h);a.u=h}else a.u=null}function Mc(a,h,p){h instanceof ti?(a.i=h,zE(a.i,a.l)):(p||(h=ei(h,qE)),a.i=new ti(h,a.l))}function de(a,h,p){a.i.set(h,p)}function vo(a){return de(a,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),a}function Zs(a,h){return a?h?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function ei(a,h,p){return typeof a=="string"?(a=encodeURI(a).replace(h,BE),p&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function BE(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Td=/[#\/\?@]/g,jE=/[#\?:]/g,GE=/[#\?]/g,qE=/[#\?@]/g,$E=/#/g;function ti(a,h){this.h=this.g=null,this.i=a||null,this.j=!!h}function Yn(a){a.g||(a.g=new Map,a.h=0,a.i&&UE(a.i,function(h,p){a.add(decodeURIComponent(h.replace(/\+/g," ")),p)}))}n=ti.prototype,n.add=function(a,h){Yn(this),this.i=null,a=Or(this,a);let p=this.g.get(a);return p||this.g.set(a,p=[]),p.push(h),this.h+=1,this};function Ad(a,h){Yn(a),h=Or(a,h),a.g.has(h)&&(a.i=null,a.h-=a.g.get(h).length,a.g.delete(h))}function vd(a,h){return Yn(a),h=Or(a,h),a.g.has(h)}n.forEach=function(a,h){Yn(this),this.g.forEach(function(p,g){p.forEach(function(P){a.call(h,P,g,this)},this)},this)};function bd(a,h){Yn(a);let p=[];if(typeof h=="string")vd(a,h)&&(p=p.concat(a.g.get(Or(a,h))));else for(a=Array.from(a.g.values()),h=0;h<a.length;h++)p=p.concat(a[h]);return p}n.set=function(a,h){return Yn(this),this.i=null,a=Or(this,a),vd(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[h]),this.h+=1,this},n.get=function(a,h){return a?(a=bd(this,a),a.length>0?String(a[0]):h):h};function Sd(a,h,p){Ad(a,h),p.length>0&&(a.i=null,a.g.set(Or(a,h),I(p)),a.h+=p.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],h=Array.from(this.g.keys());for(let g=0;g<h.length;g++){var p=h[g];const P=Qs(p);p=bd(this,p);for(let k=0;k<p.length;k++){let F=P;p[k]!==""&&(F+="="+Qs(p[k])),a.push(F)}}return this.i=a.join("&")};function Rd(a){const h=new ti;return h.i=a.i,a.g&&(h.g=new Map(a.g),h.h=a.h),h}function Or(a,h){return h=String(h),a.j&&(h=h.toLowerCase()),h}function zE(a,h){h&&!a.j&&(Yn(a),a.i=null,a.g.forEach(function(p,g){const P=g.toLowerCase();g!=P&&(Ad(this,g),Sd(this,P,p))},a)),a.j=h}function WE(a,h){const p=new Ks;if(o.Image){const g=new Image;g.onload=d(un,p,"TestLoadImage: loaded",!0,h,g),g.onerror=d(un,p,"TestLoadImage: error",!1,h,g),g.onabort=d(un,p,"TestLoadImage: abort",!1,h,g),g.ontimeout=d(un,p,"TestLoadImage: timeout",!1,h,g),o.setTimeout(function(){g.ontimeout&&g.ontimeout()},1e4),g.src=a}else h(!1)}function HE(a,h){const p=new Ks,g=new AbortController,P=setTimeout(()=>{g.abort(),un(p,"TestPingServer: timeout",!1,h)},1e4);fetch(a,{signal:g.signal}).then(k=>{clearTimeout(P),k.ok?un(p,"TestPingServer: ok",!0,h):un(p,"TestPingServer: server error",!1,h)}).catch(()=>{clearTimeout(P),un(p,"TestPingServer: error",!1,h)})}function un(a,h,p,g,P){try{P&&(P.onload=null,P.onerror=null,P.onabort=null,P.ontimeout=null),g(p)}catch{}}function KE(){this.g=new CE}function Fc(a){this.i=a.Sb||null,this.h=a.ab||!1}f(Fc,rd),Fc.prototype.g=function(){return new bo(this.i,this.h)};function bo(a,h){$e.call(this),this.H=a,this.o=h,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}f(bo,$e),n=bo.prototype,n.open=function(a,h){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=a,this.D=h,this.readyState=1,ri(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const h={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};a&&(h.body=a),(this.H||o).fetch(new Request(this.D,h)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,ni(this)),this.readyState=0},n.Pa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,ri(this)),this.g&&(this.readyState=3,ri(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Pd(this)}else a.text().then(this.Oa.bind(this),this.ga.bind(this))};function Pd(a){a.j.read().then(a.Ma.bind(a)).catch(a.ga.bind(a))}n.Ma=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var h=a.value?a.value:new Uint8Array(0);(h=this.B.decode(h,{stream:!a.done}))&&(this.response=this.responseText+=h)}a.done?ni(this):ri(this),this.readyState==3&&Pd(this)}},n.Oa=function(a){this.g&&(this.response=this.responseText=a,ni(this))},n.Na=function(a){this.g&&(this.response=a,ni(this))},n.ga=function(){this.g&&ni(this)};function ni(a){a.readyState=4,a.l=null,a.j=null,a.B=null,ri(a)}n.setRequestHeader=function(a,h){this.A.append(a,h)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],h=this.h.entries();for(var p=h.next();!p.done;)p=p.value,a.push(p[0]+": "+p[1]),p=h.next();return a.join(`\r
`)};function ri(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(bo.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function xd(a){let h="";return yo(a,function(p,g){h+=g,h+=":",h+=p,h+=`\r
`}),h}function Uc(a,h,p){e:{for(g in p){var g=!1;break e}g=!0}g||(p=xd(p),typeof a=="string"?p!=null&&Qs(p):de(a,h,p))}function Ee(a){$e.call(this),this.headers=new Map,this.L=a||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}f(Ee,$e);var QE=/^https?$/i,JE=["POST","PUT"];n=Ee.prototype,n.Fa=function(a){this.H=a},n.ea=function(a,h,p,g){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);h=h?h.toUpperCase():"GET",this.D=a,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():ld.g(),this.g.onreadystatechange=m(l(this.Ca,this));try{this.B=!0,this.g.open(h,String(a),!0),this.B=!1}catch(k){Cd(this,k);return}if(a=p||"",p=new Map(this.headers),g)if(Object.getPrototypeOf(g)===Object.prototype)for(var P in g)p.set(P,g[P]);else if(typeof g.keys=="function"&&typeof g.get=="function")for(const k of g.keys())p.set(k,g.get(k));else throw Error("Unknown input type for opt_headers: "+String(g));g=Array.from(p.keys()).find(k=>k.toLowerCase()=="content-type"),P=o.FormData&&a instanceof o.FormData,!(Array.prototype.indexOf.call(JE,h,void 0)>=0)||g||P||p.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[k,F]of p)this.g.setRequestHeader(k,F);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(a),this.v=!1}catch(k){Cd(this,k)}};function Cd(a,h){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=h,a.o=5,Dd(a),So(a)}function Dd(a){a.A||(a.A=!0,Qe(a,"complete"),Qe(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=a||7,Qe(this,"complete"),Qe(this,"abort"),So(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),So(this,!0)),Ee.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?kd(this):this.Xa())},n.Xa=function(){kd(this)};function kd(a){if(a.h&&typeof i<"u"){if(a.v&&ln(a)==4)setTimeout(a.Ca.bind(a),0);else if(Qe(a,"readystatechange"),ln(a)==4){a.h=!1;try{const k=a.ca();e:switch(k){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var h=!0;break e;default:h=!1}var p;if(!(p=h)){var g;if(g=k===0){let F=String(a.D).match(wd)[1]||null;!F&&o.self&&o.self.location&&(F=o.self.location.protocol.slice(0,-1)),g=!QE.test(F?F.toLowerCase():"")}p=g}if(p)Qe(a,"complete"),Qe(a,"success");else{a.o=6;try{var P=ln(a)>2?a.g.statusText:""}catch{P=""}a.l=P+" ["+a.ca()+"]",Dd(a)}}finally{So(a)}}}}function So(a,h){if(a.g){a.m&&(clearTimeout(a.m),a.m=null);const p=a.g;a.g=null,h||Qe(a,"ready");try{p.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function ln(a){return a.g?a.g.readyState:0}n.ca=function(){try{return ln(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(a){if(this.g){var h=this.g.responseText;return a&&h.indexOf(a)==0&&(h=h.substring(a.length)),xE(h)}};function Nd(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.F){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function YE(a){const h={};a=(a.g&&ln(a)>=2&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let g=0;g<a.length;g++){if(E(a[g]))continue;var p=OE(a[g]);const P=p[0];if(p=p[1],typeof p!="string")continue;p=p.trim();const k=h[P]||[];h[P]=k,k.push(p)}AE(h,function(g){return g.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function si(a,h,p){return p&&p.internalChannelParams&&p.internalChannelParams[a]||h}function Vd(a){this.za=0,this.i=[],this.j=new Ks,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=si("failFast",!1,a),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=si("baseRetryDelayMs",5e3,a),this.Za=si("retryDelaySeedMs",1e4,a),this.Ta=si("forwardChannelMaxRetries",2,a),this.va=si("forwardChannelRequestTimeoutMs",2e4,a),this.ma=a&&a.xmlHttpFactory||void 0,this.Ua=a&&a.Rb||void 0,this.Aa=a&&a.useFetchStreams||!1,this.O=void 0,this.L=a&&a.supportsCrossDomainXhr||!1,this.M="",this.h=new gd(a&&a.concurrentRequestLimit),this.Ba=new KE,this.S=a&&a.fastHandshake||!1,this.R=a&&a.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=a&&a.Pb||!1,a&&a.ua&&this.j.ua(),a&&a.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&a&&a.detectBufferingProxy||!1,this.ia=void 0,a&&a.longPollingTimeout&&a.longPollingTimeout>0&&(this.ia=a.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=Vd.prototype,n.ka=8,n.I=1,n.connect=function(a,h,p,g){Je(0),this.W=a,this.H=h||{},p&&g!==void 0&&(this.H.OSID=p,this.H.OAID=g),this.F=this.X,this.J=qd(this,null,this.W),Po(this)};function Bc(a){if(Od(a),a.I==3){var h=a.V++,p=St(a.J);if(de(p,"SID",a.M),de(p,"RID",h),de(p,"TYPE","terminate"),ii(a,p),h=new an(a,a.j,h),h.M=2,h.A=vo(St(p)),p=!1,o.navigator&&o.navigator.sendBeacon)try{p=o.navigator.sendBeacon(h.A.toString(),"")}catch{}!p&&o.Image&&(new Image().src=h.A,p=!0),p||(h.g=$d(h.j,null),h.g.ea(h.A)),h.F=Date.now(),Ao(h)}Gd(a)}function Ro(a){a.g&&(Gc(a),a.g.cancel(),a.g=null)}function Od(a){Ro(a),a.v&&(o.clearTimeout(a.v),a.v=null),xo(a),a.h.cancel(),a.m&&(typeof a.m=="number"&&o.clearTimeout(a.m),a.m=null)}function Po(a){if(!_d(a.h)&&!a.m){a.m=!0;var h=a.Ea;W||y(),Q||(W(),Q=!0),T.add(h,a),a.D=0}}function XE(a,h){return yd(a.h)>=a.h.j-(a.m?1:0)?!1:a.m?(a.i=h.G.concat(a.i),!0):a.I==1||a.I==2||a.D>=(a.Sa?0:a.Ta)?!1:(a.m=Hs(l(a.Ea,a,h),jd(a,a.D)),a.D++,!0)}n.Ea=function(a){if(this.m)if(this.m=null,this.I==1){if(!a){this.V=Math.floor(Math.random()*1e5),a=this.V++;const P=new an(this,this.j,a);let k=this.o;if(this.U&&(k?(k=Hh(k),Qh(k,this.U)):k=this.U),this.u!==null||this.R||(P.J=k,k=null),this.S)e:{for(var h=0,p=0;p<this.i.length;p++){t:{var g=this.i[p];if("__data__"in g.map&&(g=g.map.__data__,typeof g=="string")){g=g.length;break t}g=void 0}if(g===void 0)break;if(h+=g,h>4096){h=p;break e}if(h===4096||p===this.i.length-1){h=p+1;break e}}h=1e3}else h=1e3;h=Md(this,P,h),p=St(this.J),de(p,"RID",a),de(p,"CVER",22),this.G&&de(p,"X-HTTP-Session-Id",this.G),ii(this,p),k&&(this.R?h="headers="+Qs(xd(k))+"&"+h:this.u&&Uc(p,this.u,k)),Lc(this.h,P),this.Ra&&de(p,"TYPE","init"),this.S?(de(p,"$req",h),de(p,"SID","null"),P.U=!0,kc(P,p,null)):kc(P,p,h),this.I=2}}else this.I==3&&(a?Ld(this,a):this.i.length==0||_d(this.h)||Ld(this))};function Ld(a,h){var p;h?p=h.l:p=a.V++;const g=St(a.J);de(g,"SID",a.M),de(g,"RID",p),de(g,"AID",a.K),ii(a,g),a.u&&a.o&&Uc(g,a.u,a.o),p=new an(a,a.j,p,a.D+1),a.u===null&&(p.J=a.o),h&&(a.i=h.G.concat(a.i)),h=Md(a,p,1e3),p.H=Math.round(a.va*.5)+Math.round(a.va*.5*Math.random()),Lc(a.h,p),kc(p,g,h)}function ii(a,h){a.H&&yo(a.H,function(p,g){de(h,g,p)}),a.l&&yo({},function(p,g){de(h,g,p)})}function Md(a,h,p){p=Math.min(a.i.length,p);const g=a.l?l(a.l.Ka,a.l,a):null;e:{var P=a.i;let Y=-1;for(;;){const xe=["count="+p];Y==-1?p>0?(Y=P[0].g,xe.push("ofs="+Y)):Y=0:xe.push("ofs="+Y);let le=!0;for(let Le=0;Le<p;Le++){var k=P[Le].g;const Rt=P[Le].map;if(k-=Y,k<0)Y=Math.max(0,P[Le].g-100),le=!1;else try{k="req"+k+"_"||"";try{var F=Rt instanceof Map?Rt:Object.entries(Rt);for(const[Zn,hn]of F){let dn=hn;c(hn)&&(dn=Rc(hn)),xe.push(k+Zn+"="+encodeURIComponent(dn))}}catch(Zn){throw xe.push(k+"type="+encodeURIComponent("_badmap")),Zn}}catch{g&&g(Rt)}}if(le){F=xe.join("&");break e}}F=void 0}return a=a.i.splice(0,p),h.G=a,F}function Fd(a){if(!a.g&&!a.v){a.Y=1;var h=a.Da;W||y(),Q||(W(),Q=!0),T.add(h,a),a.A=0}}function jc(a){return a.g||a.v||a.A>=3?!1:(a.Y++,a.v=Hs(l(a.Da,a),jd(a,a.A)),a.A++,!0)}n.Da=function(){if(this.v=null,Ud(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var a=4*this.T;this.j.info("BP detection timer enabled: "+a),this.B=Hs(l(this.Wa,this),a)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Je(10),Ro(this),Ud(this))};function Gc(a){a.B!=null&&(o.clearTimeout(a.B),a.B=null)}function Ud(a){a.g=new an(a,a.j,"rpc",a.Y),a.u===null&&(a.g.J=a.o),a.g.P=0;var h=St(a.na);de(h,"RID","rpc"),de(h,"SID",a.M),de(h,"AID",a.K),de(h,"CI",a.F?"0":"1"),!a.F&&a.ia&&de(h,"TO",a.ia),de(h,"TYPE","xmlhttp"),ii(a,h),a.u&&a.o&&Uc(h,a.u,a.o),a.O&&(a.g.H=a.O);var p=a.g;a=a.ba,p.M=1,p.A=vo(St(h)),p.u=null,p.R=!0,fd(p,a)}n.Va=function(){this.C!=null&&(this.C=null,Ro(this),jc(this),Je(19))};function xo(a){a.C!=null&&(o.clearTimeout(a.C),a.C=null)}function Bd(a,h){var p=null;if(a.g==h){xo(a),Gc(a),a.g=null;var g=2}else if(Oc(a.h,h))p=h.G,Id(a.h,h),g=1;else return;if(a.I!=0){if(h.o)if(g==1){p=h.u?h.u.length:0,h=Date.now()-h.F;var P=a.D;g=wo(),Qe(g,new cd(g,p)),Po(a)}else Fd(a);else if(P=h.m,P==3||P==0&&h.X>0||!(g==1&&XE(a,h)||g==2&&jc(a)))switch(p&&p.length>0&&(h=a.h,h.i=h.i.concat(p)),P){case 1:Xn(a,5);break;case 4:Xn(a,10);break;case 3:Xn(a,6);break;default:Xn(a,2)}}}function jd(a,h){let p=a.Qa+Math.floor(Math.random()*a.Za);return a.isActive()||(p*=2),p*h}function Xn(a,h){if(a.j.info("Error code "+h),h==2){var p=l(a.bb,a),g=a.Ua;const P=!g;g=new cn(g||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||Ys(g,"https"),vo(g),P?WE(g.toString(),p):HE(g.toString(),p)}else Je(2);a.I=0,a.l&&a.l.pa(h),Gd(a),Od(a)}n.bb=function(a){a?(this.j.info("Successfully pinged google.com"),Je(2)):(this.j.info("Failed to ping google.com"),Je(1))};function Gd(a){if(a.I=0,a.ja=[],a.l){const h=Ed(a.h);(h.length!=0||a.i.length!=0)&&(b(a.ja,h),b(a.ja,a.i),a.h.i.length=0,I(a.i),a.i.length=0),a.l.oa()}}function qd(a,h,p){var g=p instanceof cn?St(p):new cn(p);if(g.g!="")h&&(g.g=h+"."+g.g),Xs(g,g.u);else{var P=o.location;g=P.protocol,h=h?h+"."+P.hostname:P.hostname,P=+P.port;const k=new cn(null);g&&Ys(k,g),h&&(k.g=h),P&&Xs(k,P),p&&(k.h=p),g=k}return p=a.G,h=a.wa,p&&h&&de(g,p,h),de(g,"VER",a.ka),ii(a,g),g}function $d(a,h,p){if(h&&!a.L)throw Error("Can't create secondary domain capable XhrIo object.");return h=a.Aa&&!a.ma?new Ee(new Fc({ab:p})):new Ee(a.ma),h.Fa(a.L),h}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function zd(){}n=zd.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function Co(){}Co.prototype.g=function(a,h){return new ut(a,h)};function ut(a,h){$e.call(this),this.g=new Vd(h),this.l=a,this.h=h&&h.messageUrlParams||null,a=h&&h.messageHeaders||null,h&&h.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=h&&h.initMessageHeaders||null,h&&h.messageContentType&&(a?a["X-WebChannel-Content-Type"]=h.messageContentType:a={"X-WebChannel-Content-Type":h.messageContentType}),h&&h.sa&&(a?a["X-WebChannel-Client-Profile"]=h.sa:a={"X-WebChannel-Client-Profile":h.sa}),this.g.U=a,(a=h&&h.Qb)&&!E(a)&&(this.g.u=a),this.A=h&&h.supportsCrossDomainXhr||!1,this.v=h&&h.sendRawJson||!1,(h=h&&h.httpSessionIdParam)&&!E(h)&&(this.g.G=h,a=this.h,a!==null&&h in a&&(a=this.h,h in a&&delete a[h])),this.j=new Lr(this)}f(ut,$e),ut.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},ut.prototype.close=function(){Bc(this.g)},ut.prototype.o=function(a){var h=this.g;if(typeof a=="string"){var p={};p.__data__=a,a=p}else this.v&&(p={},p.__data__=Rc(a),a=p);h.i.push(new FE(h.Ya++,a)),h.I==3&&Po(h)},ut.prototype.N=function(){this.g.l=null,delete this.j,Bc(this.g),delete this.g,ut.Z.N.call(this)};function Wd(a){Pc.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var h=a.__sm__;if(h){e:{for(const p in h){a=p;break e}a=void 0}(this.i=a)&&(a=this.i,h=h!==null&&a in h?h[a]:void 0),this.data=h}else this.data=a}f(Wd,Pc);function Hd(){xc.call(this),this.status=1}f(Hd,xc);function Lr(a){this.g=a}f(Lr,zd),Lr.prototype.ra=function(){Qe(this.g,"a")},Lr.prototype.qa=function(a){Qe(this.g,new Wd(a))},Lr.prototype.pa=function(a){Qe(this.g,new Hd)},Lr.prototype.oa=function(){Qe(this.g,"b")},Co.prototype.createWebChannel=Co.prototype.g,ut.prototype.send=ut.prototype.o,ut.prototype.open=ut.prototype.m,ut.prototype.close=ut.prototype.close,Gg=function(){return new Co},jg=function(){return wo()},Bg=Qn,vu={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},To.NO_ERROR=0,To.TIMEOUT=8,To.HTTP_ERROR=6,Qo=To,ud.COMPLETE="complete",Ug=ud,sd.EventType=zs,zs.OPEN="a",zs.CLOSE="b",zs.ERROR="c",zs.MESSAGE="d",$e.prototype.listen=$e.prototype.J,mi=sd,Ee.prototype.listenOnce=Ee.prototype.K,Ee.prototype.getLastError=Ee.prototype.Ha,Ee.prototype.getLastErrorCode=Ee.prototype.ya,Ee.prototype.getStatus=Ee.prototype.ca,Ee.prototype.getResponseJson=Ee.prototype.La,Ee.prototype.getResponseText=Ee.prototype.la,Ee.prototype.send=Ee.prototype.ea,Ee.prototype.setWithCredentials=Ee.prototype.Fa,Fg=Ee}).apply(typeof Oo<"u"?Oo:typeof self<"u"?self:typeof window<"u"?window:{});/**
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
 */let Cs="12.12.0";function Yb(n){Cs=n}/**
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
 */const kn=new ja("@firebase/firestore");function qr(){return kn.logLevel}function Xb(n){kn.setLogLevel(n)}function V(n,...e){if(kn.logLevel<=te.DEBUG){const t=e.map(El);kn.debug(`Firestore (${Cs}): ${n}`,...t)}}function ve(n,...e){if(kn.logLevel<=te.ERROR){const t=e.map(El);kn.error(`Firestore (${Cs}): ${n}`,...t)}}function ct(n,...e){if(kn.logLevel<=te.WARN){const t=e.map(El);kn.warn(`Firestore (${Cs}): ${n}`,...t)}}function El(n){if(typeof n=="string")return n;try{return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
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
 */function j(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,qg(n,r,t)}function qg(n,e,t){let r=`FIRESTORE (${Cs}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw ve(r),new Error(r)}function q(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||qg(e,s,r)}function Zb(n,e){n||j(57014,e)}function M(n,e){return n}/**
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
 */const C={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class N extends bt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class je{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
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
 */class $g{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class zg{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Ue.UNAUTHENTICATED))}shutdown(){}}class eS{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class tS{constructor(e){this.t=e,this.currentUser=Ue.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){q(this.o===void 0,42304);let r=this.i;const s=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve();let i=new je;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new je,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const u=i;e.enqueueRetryable(async()=>{await u.promise,await s(this.currentUser)})},c=u=>{V("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(u=>c(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(V("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new je)}},0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(V("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(q(typeof r.accessToken=="string",31837,{l:r}),new $g(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return q(e===null||typeof e=="string",2055,{h:e}),new Ue(e)}}class nS{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=Ue.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class rS{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new nS(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(Ue.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class bu{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class sS{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Ze(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){q(this.o===void 0,3512);const r=i=>{i.error!=null&&V("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.m;return this.m=i.token,V("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{V("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):V("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new bu(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(q(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new bu(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}class iS{getToken(){return Promise.resolve(new bu(""))}invalidateToken(){}start(e,t){}shutdown(){}}/**
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
 */function oS(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
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
 */class Wa{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=oS(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function K(n,e){return n<e?-1:n>e?1:0}function Su(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const s=n.charAt(r),i=e.charAt(r);if(s!==i)return Zc(s)===Zc(i)?K(s,i):Zc(s)?1:-1}return K(n.length,e.length)}const aS=55296,cS=57343;function Zc(n){const e=n.charCodeAt(0);return e>=aS&&e<=cS}function is(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}function Wg(n){return n+"\0"}/**
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
 */const Ru="__name__";class Pt{constructor(e,t,r){t===void 0?t=0:t>e.length&&j(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&j(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return Pt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Pt?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=Pt.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return K(e.length,t.length)}static compareSegments(e,t){const r=Pt.isNumericId(e),s=Pt.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?Pt.extractNumericId(e).compare(Pt.extractNumericId(t)):Su(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return xn.fromString(e.substring(4,e.length-2))}}class Z extends Pt{construct(e,t,r){return new Z(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new N(C.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new Z(t)}static emptyPath(){return new Z([])}}const uS=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class pe extends Pt{construct(e,t,r){return new pe(e,t,r)}static isValidIdentifier(e){return uS.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),pe.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Ru}static keyField(){return new pe([Ru])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new N(C.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let o=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new N(C.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new N(C.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else c==="`"?(o=!o,s++):c!=="."||o?(r+=c,s++):(i(),s++)}if(i(),o)throw new N(C.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new pe(t)}static emptyPath(){return new pe([])}}/**
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
 */function wl(n,e,t){if(!t)throw new N(C.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function Hg(n,e,t,r){if(e===!0&&r===!0)throw new N(C.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Df(n){if(!L.isDocumentKey(n))throw new N(C.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function kf(n){if(L.isDocumentKey(n))throw new N(C.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Kg(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Ha(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":j(12329,{type:typeof n})}function ee(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new N(C.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Ha(n);throw new N(C.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function Qg(n,e){if(e<=0)throw new N(C.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
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
 */function Re(n,e){const t={typeString:n};return e&&(t.value=e),t}function Sr(n,e){if(!Kg(n))throw new N(C.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const o=n[r];if(s&&typeof o!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&o!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new N(C.INVALID_ARGUMENT,t);return!0}/**
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
 */const Nf=-62135596800,Vf=1e6;class ie{static now(){return ie.fromMillis(Date.now())}static fromDate(e){return ie.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*Vf);return new ie(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new N(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new N(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Nf)throw new N(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new N(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Vf}_compareTo(e){return this.seconds===e.seconds?K(this.nanoseconds,e.nanoseconds):K(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ie._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Sr(e,ie._jsonSchema))return new ie(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Nf;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ie._jsonSchemaVersion="firestore/timestamp/1.0",ie._jsonSchema={type:Re("string",ie._jsonSchemaVersion),seconds:Re("number"),nanoseconds:Re("number")};/**
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
 */class ${static fromTimestamp(e){return new $(e)}static min(){return new $(new ie(0,0))}static max(){return new $(new ie(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const os=-1;class as{constructor(e,t,r,s){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=s}}function Pu(n){return n.fields.find(e=>e.kind===2)}function nr(n){return n.fields.filter(e=>e.kind!==2)}function lS(n,e){let t=K(n.collectionGroup,e.collectionGroup);if(t!==0)return t;for(let r=0;r<Math.min(n.fields.length,e.fields.length);++r)if(t=hS(n.fields[r],e.fields[r]),t!==0)return t;return K(n.fields.length,e.fields.length)}as.UNKNOWN_ID=-1;class ur{constructor(e,t){this.fieldPath=e,this.kind=t}}function hS(n,e){const t=pe.comparator(n.fieldPath,e.fieldPath);return t!==0?t:K(n.kind,e.kind)}class cs{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new cs(0,pt.min())}}function Jg(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=$.fromTimestamp(r===1e9?new ie(t+1,0):new ie(t,r));return new pt(s,L.empty(),e)}function Yg(n){return new pt(n.readTime,n.key,os)}class pt{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new pt($.min(),L.empty(),os)}static max(){return new pt($.max(),L.empty(),os)}}function Tl(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=L.comparator(n.documentKey,e.documentKey),t!==0?t:K(n.largestBatchId,e.largestBatchId))}/**
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
 */const Xg="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Zg{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function jn(n){if(n.code!==C.FAILED_PRECONDITION||n.message!==Xg)throw n;V("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class S{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&j(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new S((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof S?t:S.resolve(t)}catch(t){return S.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):S.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):S.reject(t)}static resolve(e){return new S((t,r)=>{t(e)})}static reject(e){return new S((t,r)=>{r(e)})}static waitFor(e){return new S((t,r)=>{let s=0,i=0,o=!1;e.forEach(c=>{++s,c.next(()=>{++i,o&&i===s&&t()},u=>r(u))}),o=!0,i===s&&t()})}static or(e){let t=S.resolve(!1);for(const r of e)t=t.next(s=>s?S.resolve(s):r());return t}static forEach(e,t){const r=[];return e.forEach((s,i)=>{r.push(t.call(this,s,i))}),this.waitFor(r)}static mapArray(e,t){return new S((r,s)=>{const i=e.length,o=new Array(i);let c=0;for(let u=0;u<i;u++){const l=u;t(e[l]).next(d=>{o[l]=d,++c,c===i&&r(o)},d=>s(d))}})}static doWhile(e,t){return new S((r,s)=>{const i=()=>{e()===!0?t().next(()=>{i()},s):r()};i()})}}/**
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
 */const lt="SimpleDb";class Ka{static open(e,t,r,s){try{return new Ka(t,e.transaction(s,r))}catch(i){throw new Ei(t,i)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.S=new je,this.transaction.oncomplete=()=>{this.S.resolve()},this.transaction.onabort=()=>{t.error?this.S.reject(new Ei(e,t.error)):this.S.resolve()},this.transaction.onerror=r=>{const s=Al(r.target.error);this.S.reject(new Ei(e,s))}}get D(){return this.S.promise}abort(e){e&&this.S.reject(e),this.aborted||(V(lt,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}C(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new fS(t)}}class Lt{static delete(e){return V(lt,"Removing database:",e),sr(sl().indexedDB.deleteDatabase(e)).toPromise()}static v(){if(!Ba())return!1;if(Lt.F())return!0;const e=Ne(),t=Lt.M(e),r=0<t&&t<10,s=e_(e),i=0<s&&s<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||r||i)}static F(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)==null?void 0:e.__PRIVATE_USE_MOCK_PERSISTENCE)==="YES"}static O(e,t){return e.store(t)}static M(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),r=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(r)}constructor(e,t,r){this.name=e,this.version=t,this.N=r,this.B=null,Lt.M(Ne())===12.2&&ve("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async L(e){return this.db||(V(lt,"Opening database:",this.name),this.db=await new Promise((t,r)=>{const s=indexedDB.open(this.name,this.version);s.onsuccess=i=>{const o=i.target.result;t(o)},s.onblocked=()=>{r(new Ei(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},s.onerror=i=>{const o=i.target.error;o.name==="VersionError"?r(new N(C.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?r(new N(C.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):r(new Ei(e,o))},s.onupgradeneeded=i=>{V(lt,'Database "'+this.name+'" requires upgrade from version:',i.oldVersion);const o=i.target.result;this.N.k(o,s.transaction,i.oldVersion,this.version).next(()=>{V(lt,"Database upgrade to version "+this.version+" complete")})}})),this.q&&(this.db.onversionchange=t=>this.q(t)),this.db}K(e){this.q=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,r,s){const i=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.L(e);const c=Ka.open(this.db,e,i?"readonly":"readwrite",r),u=s(c).next(l=>(c.C(),l)).catch(l=>(c.abort(l),S.reject(l))).toPromise();return u.catch(()=>{}),await c.D,u}catch(c){const u=c,l=u.name!=="FirebaseError"&&o<3;if(V(lt,"Transaction failed with error:",u.message,"Retrying:",l),this.close(),!l)return Promise.reject(u)}}}close(){this.db&&this.db.close(),this.db=void 0}}function e_(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class dS{constructor(e){this.U=e,this.$=!1,this.W=null}get isDone(){return this.$}get G(){return this.W}set cursor(e){this.U=e}done(){this.$=!0}j(e){this.W=e}delete(){return sr(this.U.delete())}}class Ei extends N{constructor(e,t){super(C.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function Gn(n){return n.name==="IndexedDbTransactionError"}class fS{constructor(e){this.store=e}put(e,t){let r;return t!==void 0?(V(lt,"PUT",this.store.name,e,t),r=this.store.put(t,e)):(V(lt,"PUT",this.store.name,"<auto-key>",e),r=this.store.put(e)),sr(r)}add(e){return V(lt,"ADD",this.store.name,e,e),sr(this.store.add(e))}get(e){return sr(this.store.get(e)).next(t=>(t===void 0&&(t=null),V(lt,"GET",this.store.name,e,t),t))}delete(e){return V(lt,"DELETE",this.store.name,e),sr(this.store.delete(e))}count(){return V(lt,"COUNT",this.store.name),sr(this.store.count())}J(e,t){const r=this.options(e,t),s=r.index?this.store.index(r.index):this.store;if(typeof s.getAll=="function"){const i=s.getAll(r.range);return new S((o,c)=>{i.onerror=u=>{c(u.target.error)},i.onsuccess=u=>{o(u.target.result)}})}{const i=this.cursor(r),o=[];return this.H(i,(c,u)=>{o.push(u)}).next(()=>o)}}Z(e,t){const r=this.store.getAll(e,t===null?void 0:t);return new S((s,i)=>{r.onerror=o=>{i(o.target.error)},r.onsuccess=o=>{s(o.target.result)}})}X(e,t){V(lt,"DELETE ALL",this.store.name);const r=this.options(e,t);r.Y=!1;const s=this.cursor(r);return this.H(s,(i,o,c)=>c.delete())}ee(e,t){let r;t?r=e:(r={},t=e);const s=this.cursor(r);return this.H(s,t)}te(e){const t=this.cursor({});return new S((r,s)=>{t.onerror=i=>{const o=Al(i.target.error);s(o)},t.onsuccess=i=>{const o=i.target.result;o?e(o.primaryKey,o.value).next(c=>{c?o.continue():r()}):r()}})}H(e,t){const r=[];return new S((s,i)=>{e.onerror=o=>{i(o.target.error)},e.onsuccess=o=>{const c=o.target.result;if(!c)return void s();const u=new dS(c),l=t(c.primaryKey,c.value,u);if(l instanceof S){const d=l.catch(f=>(u.done(),S.reject(f)));r.push(d)}u.isDone?s():u.G===null?c.continue():c.continue(u.G)}}).next(()=>S.waitFor(r))}options(e,t){let r;return e!==void 0&&(typeof e=="string"?r=e:t=e),{index:r,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const r=this.store.index(e.index);return e.Y?r.openKeyCursor(e.range,t):r.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function sr(n){return new S((e,t)=>{n.onsuccess=r=>{const s=r.target.result;e(s)},n.onerror=r=>{const s=Al(r.target.error);t(s)}})}let Of=!1;function Al(n){const e=Lt.M(Ne());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(n.message.indexOf(t)>=0){const r=new N("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return Of||(Of=!0,setTimeout(()=>{throw r},0)),r}}return n}const wi="IndexBackfiller";class pS{constructor(e,t){this.asyncQueue=e,this.ne=t,this.task=null}start(){this.re(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}re(e){V(wi,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{const t=await this.ne.ie();V(wi,`Documents written: ${t}`)}catch(t){Gn(t)?V(wi,"Ignoring IndexedDB error during index backfill: ",t):await jn(t)}await this.re(6e4)})}}class mS{constructor(e,t){this.localStore=e,this.persistence=t}async ie(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.se(t,e))}se(e,t){const r=new Set;let s=t,i=!0;return S.doWhile(()=>i===!0&&s>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(o=>{if(o!==null&&!r.has(o))return V(wi,`Processing collection: ${o}`),this.oe(e,o,s).next(c=>{s-=c,r.add(o)});i=!1})).next(()=>t-s)}oe(e,t,r){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(s=>this.localStore.localDocuments.getNextDocuments(e,t,s,r).next(i=>{const o=i.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next(()=>this._e(s,i)).next(c=>(V(wi,`Updating offset: ${c}`),this.localStore.indexManager.updateCollectionGroup(e,t,c))).next(()=>o.size)}))}_e(e,t){let r=e;return t.changes.forEach((s,i)=>{const o=Yg(i);Tl(o,r)>0&&(r=o)}),new pt(r.readTime,r.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
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
 */class nt{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>t.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}nt.ce=-1;/**
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
 */const Cn=-1;function eo(n){return n==null}function Oi(n){return n===0&&1/n==-1/0}function t_(n){return typeof n=="number"&&Number.isInteger(n)&&!Oi(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
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
 */const ga="";function He(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Lf(e)),e=gS(n.get(t),e);return Lf(e)}function gS(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case ga:t+="";break;default:t+=i}}return t}function Lf(n){return n+ga+""}function Ct(n){const e=n.length;if(q(e>=2,64408,{path:n}),e===2)return q(n.charAt(0)===ga&&n.charAt(1)==="",56145,{path:n}),Z.emptyPath();const t=e-2,r=[];let s="";for(let i=0;i<e;){const o=n.indexOf(ga,i);switch((o<0||o>t)&&j(50515,{path:n}),n.charAt(o+1)){case"":const c=n.substring(i,o);let u;s.length===0?u=c:(s+=c,u=s,s=""),r.push(u);break;case"":s+=n.substring(i,o),s+="\0";break;case"":s+=n.substring(i,o+1);break;default:j(61167,{path:n})}i=o+2}return new Z(r)}/**
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
 */const rr="remoteDocuments",to="owner",Mr="owner",Li="mutationQueues",_S="userId",_t="mutations",Mf="batchId",cr="userMutationsIndex",Ff=["userId","batchId"];/**
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
 */function Jo(n,e){return[n,He(e)]}function n_(n,e,t){return[n,He(e),t]}const yS={},us="documentMutations",_a="remoteDocumentsV14",IS=["prefixPath","collectionGroup","readTime","documentId"],Yo="documentKeyIndex",ES=["prefixPath","collectionGroup","documentId"],r_="collectionGroupIndex",wS=["collectionGroup","readTime","prefixPath","documentId"],Mi="remoteDocumentGlobal",xu="remoteDocumentGlobalKey",ls="targets",s_="queryTargetsIndex",TS=["canonicalId","targetId"],hs="targetDocuments",AS=["targetId","path"],vl="documentTargetsIndex",vS=["path","targetId"],ya="targetGlobalKey",lr="targetGlobal",Fi="collectionParents",bS=["collectionId","parent"],ds="clientMetadata",SS="clientId",Qa="bundles",RS="bundleId",Ja="namedQueries",PS="name",bl="indexConfiguration",xS="indexId",Cu="collectionGroupIndex",CS="collectionGroup",Ti="indexState",DS=["indexId","uid"],i_="sequenceNumberIndex",kS=["uid","sequenceNumber"],Ai="indexEntries",NS=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],o_="documentKeyIndex",VS=["indexId","uid","orderedDocumentKey"],Ya="documentOverlays",OS=["userId","collectionPath","documentId"],Du="collectionPathOverlayIndex",LS=["userId","collectionPath","largestBatchId"],a_="collectionGroupOverlayIndex",MS=["userId","collectionGroup","largestBatchId"],Sl="globals",FS="name",c_=[Li,_t,us,rr,ls,to,lr,hs,ds,Mi,Fi,Qa,Ja],US=[...c_,Ya],u_=[Li,_t,us,_a,ls,to,lr,hs,ds,Mi,Fi,Qa,Ja,Ya],l_=u_,Rl=[...l_,bl,Ti,Ai],BS=Rl,h_=[...Rl,Sl],jS=h_;/**
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
 */class ku extends Zg{constructor(e,t){super(),this.le=e,this.currentSequenceNumber=t}}function Oe(n,e){const t=M(n);return Lt.O(t.le,e)}/**
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
 */function Uf(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function qn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function d_(n,e){const t=[];for(const r in n)Object.prototype.hasOwnProperty.call(n,r)&&t.push(e(n[r],r,n));return t}function f_(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
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
 */class he{constructor(e,t){this.comparator=e,this.root=t||qe.EMPTY}insert(e,t){return new he(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,qe.BLACK,null,null))}remove(e){return new he(this.comparator,this.root.remove(e,this.comparator).copy(null,null,qe.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Lo(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Lo(this.root,e,this.comparator,!1)}getReverseIterator(){return new Lo(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Lo(this.root,e,this.comparator,!0)}}class Lo{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class qe{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??qe.RED,this.left=s??qe.EMPTY,this.right=i??qe.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new qe(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return qe.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return qe.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,qe.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,qe.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw j(43730,{key:this.key,value:this.value});if(this.right.isRed())throw j(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw j(27949);return e+(this.isRed()?0:1)}}qe.EMPTY=null,qe.RED=!0,qe.BLACK=!1;qe.EMPTY=new class{constructor(){this.size=0}get key(){throw j(57766)}get value(){throw j(16141)}get color(){throw j(16727)}get left(){throw j(29726)}get right(){throw j(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new qe(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class ce{constructor(e){this.comparator=e,this.data=new he(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Bf(this.data.getIterator())}getIteratorFrom(e){return new Bf(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof ce)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new ce(this.comparator);return t.data=e,t}}class Bf{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function Fr(n){return n.hasNext()?n.getNext():void 0}/**
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
 */class rt{constructor(e){this.fields=e,e.sort(pe.comparator)}static empty(){return new rt([])}unionWith(e){let t=new ce(pe.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new rt(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return is(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
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
 */class p_ extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */function GS(){return typeof atob<"u"}/**
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
 */class Ie{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new p_("Invalid base64 string: "+i):i}}(e);return new Ie(t)}static fromUint8Array(e){const t=function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i}(e);return new Ie(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return K(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Ie.EMPTY_BYTE_STRING=new Ie("");const qS=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Qt(n){if(q(!!n,39018),typeof n=="string"){let e=0;const t=qS.exec(n);if(q(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:me(n.seconds),nanos:me(n.nanos)}}function me(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Jt(n){return typeof n=="string"?Ie.fromBase64String(n):Ie.fromUint8Array(n)}/**
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
 */const m_="server_timestamp",g_="__type__",__="__previous_value__",y_="__local_write_time__";function Xa(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[g_])==null?void 0:r.stringValue)===m_}function Za(n){const e=n.mapValue.fields[__];return Xa(e)?Za(e):e}function Ui(n){const e=Qt(n.mapValue.fields[y_].timestampValue);return new ie(e.seconds,e.nanos)}/**
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
 */class $S{constructor(e,t,r,s,i,o,c,u,l,d,f){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=l,this.isUsingEmulator=d,this.apiKey=f}}const Bi="(default)";class Nn{constructor(e,t){this.projectId=e,this.database=t||Bi}static empty(){return new Nn("","")}get isDefaultDatabase(){return this.database===Bi}isEqual(e){return e instanceof Nn&&e.projectId===this.projectId&&e.database===this.database}}function zS(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new N(C.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Nn(n.options.projectId,e)}/**
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
 */const Pl="__type__",I_="__max__",bn={mapValue:{fields:{__type__:{stringValue:I_}}}},xl="__vector__",fs="value",Xo={nullValue:"NULL_VALUE"};function Vn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Xa(n)?4:E_(n)?9007199254740991:ec(n)?10:11:j(28295,{value:n})}function Ut(n,e){if(n===e)return!0;const t=Vn(n);if(t!==Vn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Ui(n).isEqual(Ui(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=Qt(s.timestampValue),c=Qt(i.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(s,i){return Jt(s.bytesValue).isEqual(Jt(i.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(s,i){return me(s.geoPointValue.latitude)===me(i.geoPointValue.latitude)&&me(s.geoPointValue.longitude)===me(i.geoPointValue.longitude)}(n,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return me(s.integerValue)===me(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=me(s.doubleValue),c=me(i.doubleValue);return o===c?Oi(o)===Oi(c):isNaN(o)&&isNaN(c)}return!1}(n,e);case 9:return is(n.arrayValue.values||[],e.arrayValue.values||[],Ut);case 10:case 11:return function(s,i){const o=s.mapValue.fields||{},c=i.mapValue.fields||{};if(Uf(o)!==Uf(c))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(c[u]===void 0||!Ut(o[u],c[u])))return!1;return!0}(n,e);default:return j(52216,{left:n})}}function ji(n,e){return(n.values||[]).find(t=>Ut(t,e))!==void 0}function On(n,e){if(n===e)return 0;const t=Vn(n),r=Vn(e);if(t!==r)return K(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return K(n.booleanValue,e.booleanValue);case 2:return function(i,o){const c=me(i.integerValue||i.doubleValue),u=me(o.integerValue||o.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1}(n,e);case 3:return jf(n.timestampValue,e.timestampValue);case 4:return jf(Ui(n),Ui(e));case 5:return Su(n.stringValue,e.stringValue);case 6:return function(i,o){const c=Jt(i),u=Jt(o);return c.compareTo(u)}(n.bytesValue,e.bytesValue);case 7:return function(i,o){const c=i.split("/"),u=o.split("/");for(let l=0;l<c.length&&l<u.length;l++){const d=K(c[l],u[l]);if(d!==0)return d}return K(c.length,u.length)}(n.referenceValue,e.referenceValue);case 8:return function(i,o){const c=K(me(i.latitude),me(o.latitude));return c!==0?c:K(me(i.longitude),me(o.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Gf(n.arrayValue,e.arrayValue);case 10:return function(i,o){var m,I,b,x;const c=i.fields||{},u=o.fields||{},l=(m=c[fs])==null?void 0:m.arrayValue,d=(I=u[fs])==null?void 0:I.arrayValue,f=K(((b=l==null?void 0:l.values)==null?void 0:b.length)||0,((x=d==null?void 0:d.values)==null?void 0:x.length)||0);return f!==0?f:Gf(l,d)}(n.mapValue,e.mapValue);case 11:return function(i,o){if(i===bn.mapValue&&o===bn.mapValue)return 0;if(i===bn.mapValue)return 1;if(o===bn.mapValue)return-1;const c=i.fields||{},u=Object.keys(c),l=o.fields||{},d=Object.keys(l);u.sort(),d.sort();for(let f=0;f<u.length&&f<d.length;++f){const m=Su(u[f],d[f]);if(m!==0)return m;const I=On(c[u[f]],l[d[f]]);if(I!==0)return I}return K(u.length,d.length)}(n.mapValue,e.mapValue);default:throw j(23264,{he:t})}}function jf(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return K(n,e);const t=Qt(n),r=Qt(e),s=K(t.seconds,r.seconds);return s!==0?s:K(t.nanos,r.nanos)}function Gf(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=On(t[s],r[s]);if(i)return i}return K(t.length,r.length)}function ps(n){return Nu(n)}function Nu(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=Qt(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Jt(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return L.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=Nu(i);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${Nu(t.fields[o])}`;return s+"}"}(n.mapValue):j(61005,{value:n})}function Zo(n){switch(Vn(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Za(n);return e?16+Zo(e):16;case 5:return 2*n.stringValue.length;case 6:return Jt(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,i)=>s+Zo(i),0)}(n.arrayValue);case 10:case 11:return function(r){let s=0;return qn(r.fields,(i,o)=>{s+=i.length+Zo(o)}),s}(n.mapValue);default:throw j(13486,{value:n})}}function mr(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function Vu(n){return!!n&&"integerValue"in n}function Gi(n){return!!n&&"arrayValue"in n}function qf(n){return!!n&&"nullValue"in n}function $f(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function ea(n){return!!n&&"mapValue"in n}function ec(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[Pl])==null?void 0:r.stringValue)===xl}function vi(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return qn(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=vi(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=vi(n.arrayValue.values[t]);return e}return{...n}}function E_(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===I_}const w_={mapValue:{fields:{[Pl]:{stringValue:xl},[fs]:{arrayValue:{}}}}};function WS(n){return"nullValue"in n?Xo:"booleanValue"in n?{booleanValue:!1}:"integerValue"in n||"doubleValue"in n?{doubleValue:NaN}:"timestampValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in n?{stringValue:""}:"bytesValue"in n?{bytesValue:""}:"referenceValue"in n?mr(Nn.empty(),L.empty()):"geoPointValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in n?{arrayValue:{}}:"mapValue"in n?ec(n)?w_:{mapValue:{}}:j(35942,{value:n})}function HS(n){return"nullValue"in n?{booleanValue:!1}:"booleanValue"in n?{doubleValue:NaN}:"integerValue"in n||"doubleValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in n?{stringValue:""}:"stringValue"in n?{bytesValue:""}:"bytesValue"in n?mr(Nn.empty(),L.empty()):"referenceValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in n?{arrayValue:{}}:"arrayValue"in n?w_:"mapValue"in n?ec(n)?{mapValue:{}}:bn:j(61959,{value:n})}function zf(n,e){const t=On(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?-1:!n.inclusive&&e.inclusive?1:0}function Wf(n,e){const t=On(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?1:!n.inclusive&&e.inclusive?-1:0}/**
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
 */class Be{constructor(e){this.value=e}static empty(){return new Be({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!ea(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=vi(t)}setAll(e){let t=pe.emptyPath(),r={},s=[];e.forEach((o,c)=>{if(!t.isImmediateParentOf(c)){const u=this.getFieldsMap(t);this.applyChanges(u,r,s),r={},s=[],t=c.popLast()}o?r[c.lastSegment()]=vi(o):s.push(c.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());ea(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Ut(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];ea(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){qn(t,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new Be(vi(this.value))}}function T_(n){const e=[];return qn(n.fields,(t,r)=>{const s=new pe([t]);if(ea(r)){const i=T_(r.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)}),new rt(e)}/**
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
 */class fe{constructor(e,t,r,s,i,o,c){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=c}static newInvalidDocument(e){return new fe(e,0,$.min(),$.min(),$.min(),Be.empty(),0)}static newFoundDocument(e,t,r,s){return new fe(e,1,t,$.min(),r,s,0)}static newNoDocument(e,t){return new fe(e,2,t,$.min(),$.min(),Be.empty(),0)}static newUnknownDocument(e,t){return new fe(e,3,t,$.min(),$.min(),Be.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual($.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Be.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Be.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=$.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof fe&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new fe(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class Ln{constructor(e,t){this.position=e,this.inclusive=t}}function Hf(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],o=n.position[s];if(i.field.isKeyField()?r=L.comparator(L.fromName(o.referenceValue),t.key):r=On(o,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Kf(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Ut(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class qi{constructor(e,t="asc"){this.field=e,this.dir=t}}function KS(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class A_{}class ne extends A_{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new QS(e,t,r):t==="array-contains"?new XS(e,r):t==="in"?new x_(e,r):t==="not-in"?new ZS(e,r):t==="array-contains-any"?new eR(e,r):new ne(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new JS(e,r):new YS(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(On(t,this.value)):t!==null&&Vn(this.value)===Vn(t)&&this.matchesComparison(On(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return j(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class oe extends A_{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new oe(e,t)}matches(e){return ms(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function ms(n){return n.op==="and"}function Ou(n){return n.op==="or"}function Cl(n){return v_(n)&&ms(n)}function v_(n){for(const e of n.filters)if(e instanceof oe)return!1;return!0}function Lu(n){if(n instanceof ne)return n.field.canonicalString()+n.op.toString()+ps(n.value);if(Cl(n))return n.filters.map(e=>Lu(e)).join(",");{const e=n.filters.map(t=>Lu(t)).join(",");return`${n.op}(${e})`}}function b_(n,e){return n instanceof ne?function(r,s){return s instanceof ne&&r.op===s.op&&r.field.isEqual(s.field)&&Ut(r.value,s.value)}(n,e):n instanceof oe?function(r,s){return s instanceof oe&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,o,c)=>i&&b_(o,s.filters[c]),!0):!1}(n,e):void j(19439)}function S_(n,e){const t=n.filters.concat(e);return oe.create(t,n.op)}function R_(n){return n instanceof ne?function(t){return`${t.field.canonicalString()} ${t.op} ${ps(t.value)}`}(n):n instanceof oe?function(t){return t.op.toString()+" {"+t.getFilters().map(R_).join(" ,")+"}"}(n):"Filter"}class QS extends ne{constructor(e,t,r){super(e,t,r),this.key=L.fromName(r.referenceValue)}matches(e){const t=L.comparator(e.key,this.key);return this.matchesComparison(t)}}class JS extends ne{constructor(e,t){super(e,"in",t),this.keys=P_("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class YS extends ne{constructor(e,t){super(e,"not-in",t),this.keys=P_("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function P_(n,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map(r=>L.fromName(r.referenceValue))}class XS extends ne{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Gi(t)&&ji(t.arrayValue,this.value)}}class x_ extends ne{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&ji(this.value.arrayValue,t)}}class ZS extends ne{constructor(e,t){super(e,"not-in",t)}matches(e){if(ji(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!ji(this.value.arrayValue,t)}}class eR extends ne{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Gi(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>ji(this.value.arrayValue,r))}}/**
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
 */class tR{constructor(e,t=null,r=[],s=[],i=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=c,this.Te=null}}function Mu(n,e=null,t=[],r=[],s=null,i=null,o=null){return new tR(n,e,t,r,s,i,o)}function gr(n){const e=M(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>Lu(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),eo(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>ps(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>ps(r)).join(",")),e.Te=t}return e.Te}function no(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!KS(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!b_(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Kf(n.startAt,e.startAt)&&Kf(n.endAt,e.endAt)}function Ia(n){return L.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function Ea(n,e){return n.filters.filter(t=>t instanceof ne&&t.field.isEqual(e))}function Qf(n,e,t){let r=Xo,s=!0;for(const i of Ea(n,e)){let o=Xo,c=!0;switch(i.op){case"<":case"<=":o=WS(i.value);break;case"==":case"in":case">=":o=i.value;break;case">":o=i.value,c=!1;break;case"!=":case"not-in":o=Xo}zf({value:r,inclusive:s},{value:o,inclusive:c})<0&&(r=o,s=c)}if(t!==null){for(let i=0;i<n.orderBy.length;++i)if(n.orderBy[i].field.isEqual(e)){const o=t.position[i];zf({value:r,inclusive:s},{value:o,inclusive:t.inclusive})<0&&(r=o,s=t.inclusive);break}}return{value:r,inclusive:s}}function Jf(n,e,t){let r=bn,s=!0;for(const i of Ea(n,e)){let o=bn,c=!0;switch(i.op){case">=":case">":o=HS(i.value),c=!1;break;case"==":case"in":case"<=":o=i.value;break;case"<":o=i.value,c=!1;break;case"!=":case"not-in":o=bn}Wf({value:r,inclusive:s},{value:o,inclusive:c})>0&&(r=o,s=c)}if(t!==null){for(let i=0;i<n.orderBy.length;++i)if(n.orderBy[i].field.isEqual(e)){const o=t.position[i];Wf({value:r,inclusive:s},{value:o,inclusive:t.inclusive})>0&&(r=o,s=t.inclusive);break}}return{value:r,inclusive:s}}/**
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
 */class nn{constructor(e,t=null,r=[],s=[],i=null,o="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=c,this.endAt=u,this.Ee=null,this.Ie=null,this.Re=null,this.startAt,this.endAt}}function C_(n,e,t,r,s,i,o,c){return new nn(n,e,t,r,s,i,o,c)}function Ds(n){return new nn(n)}function Yf(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function nR(n){return L.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function Dl(n){return n.collectionGroup!==null}function Xr(n){const e=M(n);if(e.Ee===null){e.Ee=[];const t=new Set;for(const i of e.explicitOrderBy)e.Ee.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new ce(pe.comparator);return o.filters.forEach(u=>{u.getFlattenedFilters().forEach(l=>{l.isInequality()&&(c=c.add(l.field))})}),c})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.Ee.push(new qi(i,r))}),t.has(pe.keyField().canonicalString())||e.Ee.push(new qi(pe.keyField(),r))}return e.Ee}function Ke(n){const e=M(n);return e.Ie||(e.Ie=k_(e,Xr(n))),e.Ie}function D_(n){const e=M(n);return e.Re||(e.Re=k_(e,n.explicitOrderBy)),e.Re}function k_(n,e){if(n.limitType==="F")return Mu(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new qi(s.field,i)});const t=n.endAt?new Ln(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Ln(n.startAt.position,n.startAt.inclusive):null;return Mu(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function Fu(n,e){const t=n.filters.concat([e]);return new nn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function rR(n,e){const t=n.explicitOrderBy.concat([e]);return new nn(n.path,n.collectionGroup,t,n.filters.slice(),n.limit,n.limitType,n.startAt,n.endAt)}function wa(n,e,t){return new nn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function sR(n,e){return new nn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),n.limit,n.limitType,e,n.endAt)}function iR(n,e){return new nn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),n.limit,n.limitType,n.startAt,e)}function ro(n,e){return no(Ke(n),Ke(e))&&n.limitType===e.limitType}function N_(n){return`${gr(Ke(n))}|lt:${n.limitType}`}function $r(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(s=>R_(s)).join(", ")}]`),eo(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(s=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(s)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(s=>ps(s)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(s=>ps(s)).join(",")),`Target(${r})`}(Ke(n))}; limitType=${n.limitType})`}function so(n,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):L.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(n,e)&&function(r,s){for(const i of Xr(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(n,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(n,e)&&function(r,s){return!(r.startAt&&!function(o,c,u){const l=Hf(o,c,u);return o.inclusive?l<=0:l<0}(r.startAt,Xr(r),s)||r.endAt&&!function(o,c,u){const l=Hf(o,c,u);return o.inclusive?l>=0:l>0}(r.endAt,Xr(r),s))}(n,e)}function V_(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function O_(n){return(e,t)=>{let r=!1;for(const s of Xr(n)){const i=oR(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function oR(n,e,t){const r=n.field.isKeyField()?L.comparator(e.key,t.key):function(i,o,c){const u=o.data.field(i),l=c.data.field(i);return u!==null&&l!==null?On(u,l):j(42886)}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return j(19790,{direction:n.dir})}}/**
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
 */class rn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){qn(this.inner,(t,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return f_(this.inner)}size(){return this.innerSize}}/**
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
 */const aR=new he(L.comparator);function st(){return aR}const L_=new he(L.comparator);function gi(...n){let e=L_;for(const t of n)e=e.insert(t.key,t);return e}function M_(n){let e=L_;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function Dt(){return bi()}function F_(){return bi()}function bi(){return new rn(n=>n.toString(),(n,e)=>n.isEqual(e))}const cR=new he(L.comparator),uR=new ce(L.comparator);function J(...n){let e=uR;for(const t of n)e=e.add(t);return e}const lR=new ce(K);function kl(){return lR}/**
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
 */function Nl(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Oi(e)?"-0":e}}function U_(n){return{integerValue:""+n}}function B_(n,e){return t_(e)?U_(e):Nl(n,e)}/**
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
 */class tc{constructor(){this._=void 0}}function hR(n,e,t){return n instanceof gs?function(s,i){const o={fields:{[g_]:{stringValue:m_},[y_]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Xa(i)&&(i=Za(i)),i&&(o.fields[__]=i),{mapValue:o}}(t,e):n instanceof _r?G_(n,e):n instanceof yr?q_(n,e):function(s,i){const o=j_(s,i),c=Xf(o)+Xf(s.Ae);return Vu(o)&&Vu(s.Ae)?U_(c):Nl(s.serializer,c)}(n,e)}function dR(n,e,t){return n instanceof _r?G_(n,e):n instanceof yr?q_(n,e):t}function j_(n,e){return n instanceof _s?function(r){return Vu(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class gs extends tc{}class _r extends tc{constructor(e){super(),this.elements=e}}function G_(n,e){const t=$_(e);for(const r of n.elements)t.some(s=>Ut(s,r))||t.push(r);return{arrayValue:{values:t}}}class yr extends tc{constructor(e){super(),this.elements=e}}function q_(n,e){let t=$_(e);for(const r of n.elements)t=t.filter(s=>!Ut(s,r));return{arrayValue:{values:t}}}class _s extends tc{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function Xf(n){return me(n.integerValue||n.doubleValue)}function $_(n){return Gi(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
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
 */class io{constructor(e,t){this.field=e,this.transform=t}}function fR(n,e){return n.field.isEqual(e.field)&&function(r,s){return r instanceof _r&&s instanceof _r||r instanceof yr&&s instanceof yr?is(r.elements,s.elements,Ut):r instanceof _s&&s instanceof _s?Ut(r.Ae,s.Ae):r instanceof gs&&s instanceof gs}(n.transform,e.transform)}class pR{constructor(e,t){this.version=e,this.transformResults=t}}class ge{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new ge}static exists(e){return new ge(void 0,e)}static updateTime(e){return new ge(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function ta(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class nc{}function z_(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Ns(n.key,ge.none()):new ks(n.key,n.data,ge.none());{const t=n.data,r=Be.empty();let s=new ce(pe.comparator);for(let i of e.fields)if(!s.has(i)){let o=t.field(i);o===null&&i.length>1&&(i=i.popLast(),o=t.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new sn(n.key,r,new rt(s.toArray()),ge.none())}}function mR(n,e,t){n instanceof ks?function(s,i,o){const c=s.value.clone(),u=ep(s.fieldTransforms,i,o.transformResults);c.setAll(u),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(n,e,t):n instanceof sn?function(s,i,o){if(!ta(s.precondition,i))return void i.convertToUnknownDocument(o.version);const c=ep(s.fieldTransforms,i,o.transformResults),u=i.data;u.setAll(W_(s)),u.setAll(c),i.convertToFoundDocument(o.version,u).setHasCommittedMutations()}(n,e,t):function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function Si(n,e,t,r){return n instanceof ks?function(i,o,c,u){if(!ta(i.precondition,o))return c;const l=i.value.clone(),d=tp(i.fieldTransforms,u,o);return l.setAll(d),o.convertToFoundDocument(o.version,l).setHasLocalMutations(),null}(n,e,t,r):n instanceof sn?function(i,o,c,u){if(!ta(i.precondition,o))return c;const l=tp(i.fieldTransforms,u,o),d=o.data;return d.setAll(W_(i)),d.setAll(l),o.convertToFoundDocument(o.version,d).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(f=>f.field))}(n,e,t,r):function(i,o,c){return ta(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c}(n,e,t)}function gR(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=j_(r.transform,s||null);i!=null&&(t===null&&(t=Be.empty()),t.set(r.field,i))}return t||null}function Zf(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&is(r,s,(i,o)=>fR(i,o))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class ks extends nc{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class sn extends nc{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function W_(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function ep(n,e,t){const r=new Map;q(n.length===t.length,32656,{Ve:t.length,de:n.length});for(let s=0;s<t.length;s++){const i=n[s],o=i.transform,c=e.data.field(i.field);r.set(i.field,dR(o,c,t[s]))}return r}function tp(n,e,t){const r=new Map;for(const s of n){const i=s.transform,o=t.data.field(s.field);r.set(s.field,hR(i,o,e))}return r}class Ns extends nc{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Vl extends nc{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class Ol{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&mR(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Si(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Si(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=F_();return this.mutations.forEach(s=>{const i=e.get(s.key),o=i.overlayedDocument;let c=this.applyToLocalView(o,i.mutatedFields);c=t.has(s.key)?null:c;const u=z_(o,c);u!==null&&r.set(s.key,u),o.isValidDocument()||o.convertToNoDocument($.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),J())}isEqual(e){return this.batchId===e.batchId&&is(this.mutations,e.mutations,(t,r)=>Zf(t,r))&&is(this.baseMutations,e.baseMutations,(t,r)=>Zf(t,r))}}class Ll{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){q(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let s=function(){return cR}();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new Ll(e,t,r,s)}}/**
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
 */class Ml{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class H_{constructor(e,t,r){this.alias=e,this.aggregateType=t,this.fieldPath=r}}/**
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
 */class _R{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
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
 */var Se,se;function K_(n){switch(n){case C.OK:return j(64938);case C.CANCELLED:case C.UNKNOWN:case C.DEADLINE_EXCEEDED:case C.RESOURCE_EXHAUSTED:case C.INTERNAL:case C.UNAVAILABLE:case C.UNAUTHENTICATED:return!1;case C.INVALID_ARGUMENT:case C.NOT_FOUND:case C.ALREADY_EXISTS:case C.PERMISSION_DENIED:case C.FAILED_PRECONDITION:case C.ABORTED:case C.OUT_OF_RANGE:case C.UNIMPLEMENTED:case C.DATA_LOSS:return!0;default:return j(15467,{code:n})}}function Q_(n){if(n===void 0)return ve("GRPC error has no .code"),C.UNKNOWN;switch(n){case Se.OK:return C.OK;case Se.CANCELLED:return C.CANCELLED;case Se.UNKNOWN:return C.UNKNOWN;case Se.DEADLINE_EXCEEDED:return C.DEADLINE_EXCEEDED;case Se.RESOURCE_EXHAUSTED:return C.RESOURCE_EXHAUSTED;case Se.INTERNAL:return C.INTERNAL;case Se.UNAVAILABLE:return C.UNAVAILABLE;case Se.UNAUTHENTICATED:return C.UNAUTHENTICATED;case Se.INVALID_ARGUMENT:return C.INVALID_ARGUMENT;case Se.NOT_FOUND:return C.NOT_FOUND;case Se.ALREADY_EXISTS:return C.ALREADY_EXISTS;case Se.PERMISSION_DENIED:return C.PERMISSION_DENIED;case Se.FAILED_PRECONDITION:return C.FAILED_PRECONDITION;case Se.ABORTED:return C.ABORTED;case Se.OUT_OF_RANGE:return C.OUT_OF_RANGE;case Se.UNIMPLEMENTED:return C.UNIMPLEMENTED;case Se.DATA_LOSS:return C.DATA_LOSS;default:return j(39323,{code:n})}}(se=Se||(Se={}))[se.OK=0]="OK",se[se.CANCELLED=1]="CANCELLED",se[se.UNKNOWN=2]="UNKNOWN",se[se.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",se[se.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",se[se.NOT_FOUND=5]="NOT_FOUND",se[se.ALREADY_EXISTS=6]="ALREADY_EXISTS",se[se.PERMISSION_DENIED=7]="PERMISSION_DENIED",se[se.UNAUTHENTICATED=16]="UNAUTHENTICATED",se[se.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",se[se.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",se[se.ABORTED=10]="ABORTED",se[se.OUT_OF_RANGE=11]="OUT_OF_RANGE",se[se.UNIMPLEMENTED=12]="UNIMPLEMENTED",se[se.INTERNAL=13]="INTERNAL",se[se.UNAVAILABLE=14]="UNAVAILABLE",se[se.DATA_LOSS=15]="DATA_LOSS";/**
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
 */let Ri=null;function yR(n){if(Ri)throw new Error("a TestingHooksSpi instance is already set");Ri=n}/**
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
 */function J_(){return new TextEncoder}/**
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
 */const IR=new xn([4294967295,4294967295],0);function np(n){const e=J_().encode(n),t=new Mg;return t.update(e),new Uint8Array(t.digest())}function rp(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new xn([t,r],0),new xn([s,i],0)]}class Fl{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new _i(`Invalid padding: ${t}`);if(r<0)throw new _i(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new _i(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new _i(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=xn.fromNumber(this.ge)}ye(e,t,r){let s=e.add(t.multiply(xn.fromNumber(r)));return s.compare(IR)===1&&(s=new xn([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=np(e),[r,s]=rp(t);for(let i=0;i<this.hashCount;i++){const o=this.ye(r,s,i);if(!this.we(o))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new Fl(i,s,t);return r.forEach(c=>o.insert(c)),o}insert(e){if(this.ge===0)return;const t=np(e),[r,s]=rp(t);for(let i=0;i<this.hashCount;i++){const o=this.ye(r,s,i);this.Se(o)}}Se(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class _i extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class oo{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,ao.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new oo($.min(),s,new he(K),st(),J())}}class ao{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new ao(r,t,J(),J(),J())}}/**
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
 */class na{constructor(e,t,r,s){this.be=e,this.removedTargetIds=t,this.key=r,this.De=s}}class Y_{constructor(e,t){this.targetId=e,this.Ce=t}}class X_{constructor(e,t,r=Ie.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class sp{constructor(){this.ve=0,this.Fe=ip(),this.Me=Ie.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=J(),t=J(),r=J();return this.Fe.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:j(38017,{changeType:i})}}),new ao(this.Me,this.xe,e,t,r)}qe(){this.Oe=!1,this.Fe=ip()}Ke(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,q(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class ER{constructor(e){this.Ge=e,this.ze=new Map,this.je=st(),this.Je=Mo(),this.He=Mo(),this.Ze=new he(K)}Xe(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,t=>{const r=this.nt(t);switch(e.state){case 0:this.rt(t)&&r.Le(e.resumeToken);break;case 1:r.We(),r.Ne||r.qe(),r.Le(e.resumeToken);break;case 2:r.We(),r.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(r.Qe(),r.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),r.Le(e.resumeToken));break;default:j(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach((r,s)=>{this.rt(s)&&t(s)})}st(e){const t=e.targetId,r=e.Ce.count,s=this.ot(t);if(s){const i=s.target;if(Ia(i))if(r===0){const o=new L(i.path);this.et(t,o,fe.newNoDocument(o,$.min()))}else q(r===1,20013,{expectedCount:r});else{const o=this._t(t);if(o!==r){const c=this.ut(e),u=c?this.ct(c,e,o):1;if(u!==0){this.it(t);const l=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,l)}Ri==null||Ri.o(function(d,f,m,I,b){var O,B,U;const x={localCacheCount:d,existenceFilterCount:f.count,databaseId:m.database,projectId:m.projectId},D=f.unchangedNames;return D&&(x.bloomFilter={applied:b===0,hashCount:(D==null?void 0:D.hashCount)??0,bitmapLength:((B=(O=D==null?void 0:D.bits)==null?void 0:O.bitmap)==null?void 0:B.length)??0,padding:((U=D==null?void 0:D.bits)==null?void 0:U.padding)??0,mightContain:z=>(I==null?void 0:I.mightContain(z))??!1}),x}(o,e.Ce,this.Ge.ht(),c,u))}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let o,c;try{o=Jt(r).toUint8Array()}catch(u){if(u instanceof p_)return ct("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new Fl(o,s,i)}catch(u){return ct(u instanceof _i?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.ge===0?null:c}ct(e,t,r){return t.Ce.count===r-this.Pt(e,t.targetId)?0:2}Pt(e,t){const r=this.Ge.getRemoteKeysForTarget(t);let s=0;return r.forEach(i=>{const o=this.Ge.ht(),c=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.et(t,i,null),s++)}),s}Tt(e){const t=new Map;this.ze.forEach((i,o)=>{const c=this.ot(o);if(c){if(i.current&&Ia(c.target)){const u=new L(c.target.path);this.Et(u).has(o)||this.It(o,u)||this.et(o,u,fe.newNoDocument(u,e))}i.Be&&(t.set(o,i.ke()),i.qe())}});let r=J();this.He.forEach((i,o)=>{let c=!0;o.forEachWhile(u=>{const l=this.ot(u);return!l||l.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(i))}),this.je.forEach((i,o)=>o.setReadTime(e));const s=new oo(e,t,this.Ze,this.je,r);return this.je=st(),this.Je=Mo(),this.He=Mo(),this.Ze=new he(K),s}Ye(e,t){if(!this.rt(e))return;const r=this.It(e,t.key)?2:0;this.nt(e).Ke(t.key,r),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.Et(t.key).add(e)),this.He=this.He.insert(t.key,this.Rt(t.key).add(e))}et(e,t,r){if(!this.rt(e))return;const s=this.nt(e);this.It(e,t)?s.Ke(t,1):s.Ue(t),this.He=this.He.insert(t,this.Rt(t).delete(e)),this.He=this.He.insert(t,this.Rt(t).add(e)),r&&(this.je=this.je.insert(t,r))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.nt(e).$e()}nt(e){let t=this.ze.get(e);return t||(t=new sp,this.ze.set(e,t)),t}Rt(e){let t=this.He.get(e);return t||(t=new ce(K),this.He=this.He.insert(e,t)),t}Et(e){let t=this.Je.get(e);return t||(t=new ce(K),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||V("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new sp),this.Ge.getRemoteKeysForTarget(e).forEach(t=>{this.et(e,t,null)})}It(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function Mo(){return new he(L.comparator)}function ip(){return new he(L.comparator)}const wR={asc:"ASCENDING",desc:"DESCENDING"},TR={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},AR={and:"AND",or:"OR"};class vR{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Uu(n,e){return n.useProto3Json||eo(e)?e:{value:e}}function ys(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Z_(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function bR(n,e){return ys(n,e.toTimestamp())}function be(n){return q(!!n,49232),$.fromTimestamp(function(t){const r=Qt(t);return new ie(r.seconds,r.nanos)}(n))}function Ul(n,e){return Bu(n,e).canonicalString()}function Bu(n,e){const t=function(s){return new Z(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function ey(n){const e=Z.fromString(n);return q(uy(e),10190,{key:e.toString()}),e}function $i(n,e){return Ul(n.databaseId,e.path)}function Mt(n,e){const t=ey(e);if(t.get(1)!==n.databaseId.projectId)throw new N(C.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new N(C.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new L(ry(t))}function ty(n,e){return Ul(n.databaseId,e)}function ny(n){const e=ey(n);return e.length===4?Z.emptyPath():ry(e)}function ju(n){return new Z(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function ry(n){return q(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function op(n,e,t){return{name:$i(n,e),fields:t.value.mapValue.fields}}function rc(n,e,t){const r=Mt(n,e.name),s=be(e.updateTime),i=e.createTime?be(e.createTime):$.min(),o=new Be({mapValue:{fields:e.fields}}),c=fe.newFoundDocument(r,s,i,o);return t&&c.setHasCommittedMutations(),t?c.setHasCommittedMutations():c}function SR(n,e){return"found"in e?function(r,s){q(!!s.found,43571),s.found.name,s.found.updateTime;const i=Mt(r,s.found.name),o=be(s.found.updateTime),c=s.found.createTime?be(s.found.createTime):$.min(),u=new Be({mapValue:{fields:s.found.fields}});return fe.newFoundDocument(i,o,c,u)}(n,e):"missing"in e?function(r,s){q(!!s.missing,3894),q(!!s.readTime,22933);const i=Mt(r,s.missing),o=be(s.readTime);return fe.newNoDocument(i,o)}(n,e):j(7234,{result:e})}function RR(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(l){return l==="NO_CHANGE"?0:l==="ADD"?1:l==="REMOVE"?2:l==="CURRENT"?3:l==="RESET"?4:j(39313,{state:l})}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(l,d){return l.useProto3Json?(q(d===void 0||typeof d=="string",58123),Ie.fromBase64String(d||"")):(q(d===void 0||d instanceof Buffer||d instanceof Uint8Array,16193),Ie.fromUint8Array(d||new Uint8Array))}(n,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&function(l){const d=l.code===void 0?C.UNKNOWN:Q_(l.code);return new N(d,l.message||"")}(o);t=new X_(r,s,i,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=Mt(n,r.document.name),i=be(r.document.updateTime),o=r.document.createTime?be(r.document.createTime):$.min(),c=new Be({mapValue:{fields:r.document.fields}}),u=fe.newFoundDocument(s,i,o,c),l=r.targetIds||[],d=r.removedTargetIds||[];t=new na(l,d,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=Mt(n,r.document),i=r.readTime?be(r.readTime):$.min(),o=fe.newNoDocument(s,i),c=r.removedTargetIds||[];t=new na([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=Mt(n,r.document),i=r.removedTargetIds||[];t=new na([],i,s,null)}else{if(!("filter"in e))return j(11601,{Vt:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new _R(s,i),c=r.targetId;t=new Y_(c,o)}}return t}function zi(n,e){let t;if(e instanceof ks)t={update:op(n,e.key,e.value)};else if(e instanceof Ns)t={delete:$i(n,e.key)};else if(e instanceof sn)t={update:op(n,e.key,e.data),updateMask:NR(e.fieldMask)};else{if(!(e instanceof Vl))return j(16599,{dt:e.type});t={verify:$i(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(i,o){const c=o.transform;if(c instanceof gs)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof _r)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof yr)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof _s)return{fieldPath:o.field.canonicalString(),increment:c.Ae};throw j(20930,{transform:o.transform})}(0,r))),e.precondition.isNone||(t.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:bR(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:j(27497)}(n,e.precondition)),t}function Gu(n,e){const t=e.currentDocument?function(i){return i.updateTime!==void 0?ge.updateTime(be(i.updateTime)):i.exists!==void 0?ge.exists(i.exists):ge.none()}(e.currentDocument):ge.none(),r=e.updateTransforms?e.updateTransforms.map(s=>function(o,c){let u=null;if("setToServerValue"in c)q(c.setToServerValue==="REQUEST_TIME",16630,{proto:c}),u=new gs;else if("appendMissingElements"in c){const d=c.appendMissingElements.values||[];u=new _r(d)}else if("removeAllFromArray"in c){const d=c.removeAllFromArray.values||[];u=new yr(d)}else"increment"in c?u=new _s(o,c.increment):j(16584,{proto:c});const l=pe.fromServerFormat(c.fieldPath);return new io(l,u)}(n,s)):[];if(e.update){e.update.name;const s=Mt(n,e.update.name),i=new Be({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=function(u){const l=u.fieldPaths||[];return new rt(l.map(d=>pe.fromServerFormat(d)))}(e.updateMask);return new sn(s,i,o,t,r)}return new ks(s,i,t,r)}if(e.delete){const s=Mt(n,e.delete);return new Ns(s,t)}if(e.verify){const s=Mt(n,e.verify);return new Vl(s,t)}return j(1463,{proto:e})}function PR(n,e){return n&&n.length>0?(q(e!==void 0,14353),n.map(t=>function(s,i){let o=s.updateTime?be(s.updateTime):be(i);return o.isEqual($.min())&&(o=be(i)),new pR(o,s.transformResults||[])}(t,e))):[]}function sy(n,e){return{documents:[ty(n,e.path)]}}function sc(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=ty(n,s);const i=function(l){if(l.length!==0)return cy(oe.create(l,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const o=function(l){if(l.length!==0)return l.map(d=>function(m){return{field:wn(m.field),direction:CR(m.dir)}}(d))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);const c=Uu(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(l){return{before:l.inclusive,values:l.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(l){return{before:!l.inclusive,values:l.position}}(e.endAt)),{ft:t,parent:s}}function iy(n,e,t,r){const{ft:s,parent:i}=sc(n,e),o={},c=[];let u=0;return t.forEach(l=>{const d=r?l.alias:"aggregate_"+u++;o[d]=l.alias,l.aggregateType==="count"?c.push({alias:d,count:{}}):l.aggregateType==="avg"?c.push({alias:d,avg:{field:wn(l.fieldPath)}}):l.aggregateType==="sum"&&c.push({alias:d,sum:{field:wn(l.fieldPath)}})}),{request:{structuredAggregationQuery:{aggregations:c,structuredQuery:s.structuredQuery},parent:s.parent},gt:o,parent:i}}function oy(n){let e=ny(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){q(r===1,65062);const d=t.from[0];d.allDescendants?s=d.collectionId:e=e.child(d.collectionId)}let i=[];t.where&&(i=function(f){const m=ay(f);return m instanceof oe&&Cl(m)?m.getFilters():[m]}(t.where));let o=[];t.orderBy&&(o=function(f){return f.map(m=>function(b){return new qi(zr(b.field),function(D){switch(D){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(b.direction))}(m))}(t.orderBy));let c=null;t.limit&&(c=function(f){let m;return m=typeof f=="object"?f.value:f,eo(m)?null:m}(t.limit));let u=null;t.startAt&&(u=function(f){const m=!!f.before,I=f.values||[];return new Ln(I,m)}(t.startAt));let l=null;return t.endAt&&(l=function(f){const m=!f.before,I=f.values||[];return new Ln(I,m)}(t.endAt)),C_(e,s,o,i,c,"F",u,l)}function xR(n,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return j(28987,{purpose:s})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function ay(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=zr(t.unaryFilter.field);return ne.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=zr(t.unaryFilter.field);return ne.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=zr(t.unaryFilter.field);return ne.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=zr(t.unaryFilter.field);return ne.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return j(61313);default:return j(60726)}}(n):n.fieldFilter!==void 0?function(t){return ne.create(zr(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return j(58110);default:return j(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return oe.create(t.compositeFilter.filters.map(r=>ay(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return j(1026)}}(t.compositeFilter.op))}(n):j(30097,{filter:n})}function CR(n){return wR[n]}function DR(n){return TR[n]}function kR(n){return AR[n]}function wn(n){return{fieldPath:n.canonicalString()}}function zr(n){return pe.fromServerFormat(n.fieldPath)}function cy(n){return n instanceof ne?function(t){if(t.op==="=="){if($f(t.value))return{unaryFilter:{field:wn(t.field),op:"IS_NAN"}};if(qf(t.value))return{unaryFilter:{field:wn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if($f(t.value))return{unaryFilter:{field:wn(t.field),op:"IS_NOT_NAN"}};if(qf(t.value))return{unaryFilter:{field:wn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:wn(t.field),op:DR(t.op),value:t.value}}}(n):n instanceof oe?function(t){const r=t.getFilters().map(s=>cy(s));return r.length===1?r[0]:{compositeFilter:{op:kR(t.op),filters:r}}}(n):j(54877,{filter:n})}function NR(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function uy(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function ly(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}/**
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
 */class $t{constructor(e,t,r,s,i=$.min(),o=$.min(),c=Ie.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new $t(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new $t(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new $t(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new $t(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class hy{constructor(e){this.yt=e}}function VR(n,e){let t;if(e.document)t=rc(n.yt,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const r=L.fromSegments(e.noDocument.path),s=Er(e.noDocument.readTime);t=fe.newNoDocument(r,s),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return j(56709);{const r=L.fromSegments(e.unknownDocument.path),s=Er(e.unknownDocument.version);t=fe.newUnknownDocument(r,s)}}return e.readTime&&t.setReadTime(function(s){const i=new ie(s[0],s[1]);return $.fromTimestamp(i)}(e.readTime)),t}function ap(n,e){const t=e.key,r={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:Ta(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())r.document=function(i,o){return{name:$i(i,o.key),fields:o.data.value.mapValue.fields,updateTime:ys(i,o.version.toTimestamp()),createTime:ys(i,o.createTime.toTimestamp())}}(n.yt,e);else if(e.isNoDocument())r.noDocument={path:t.path.toArray(),readTime:Ir(e.version)};else{if(!e.isUnknownDocument())return j(57904,{document:e});r.unknownDocument={path:t.path.toArray(),version:Ir(e.version)}}return r}function Ta(n){const e=n.toTimestamp();return[e.seconds,e.nanoseconds]}function Ir(n){const e=n.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function Er(n){const e=new ie(n.seconds,n.nanoseconds);return $.fromTimestamp(e)}function ir(n,e){const t=(e.baseMutations||[]).map(i=>Gu(n.yt,i));for(let i=0;i<e.mutations.length-1;++i){const o=e.mutations[i];if(i+1<e.mutations.length&&e.mutations[i+1].transform!==void 0){const c=e.mutations[i+1];o.updateTransforms=c.transform.fieldTransforms,e.mutations.splice(i+1,1),++i}}const r=e.mutations.map(i=>Gu(n.yt,i)),s=ie.fromMillis(e.localWriteTimeMs);return new Ol(e.batchId,s,t,r)}function yi(n){const e=Er(n.readTime),t=n.lastLimboFreeSnapshotVersion!==void 0?Er(n.lastLimboFreeSnapshotVersion):$.min();let r;return r=function(i){return i.documents!==void 0}(n.query)?function(i){const o=i.documents.length;return q(o===1,1966,{count:o}),Ke(Ds(ny(i.documents[0])))}(n.query):function(i){return Ke(oy(i))}(n.query),new $t(r,n.targetId,"TargetPurposeListen",n.lastListenSequenceNumber,e,t,Ie.fromBase64String(n.resumeToken))}function dy(n,e){const t=Ir(e.snapshotVersion),r=Ir(e.lastLimboFreeSnapshotVersion);let s;s=Ia(e.target)?sy(n.yt,e.target):sc(n.yt,e.target).ft;const i=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:gr(e.target),readTime:t,resumeToken:i,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:s}}function ic(n){const e=oy({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?wa(e,e.limit,"L"):e}function eu(n,e){return new Ml(e.largestBatchId,Gu(n.yt,e.overlayMutation))}function cp(n,e){const t=e.path.lastSegment();return[n,He(e.path.popLast()),t]}function up(n,e,t,r){return{indexId:n,uid:e,sequenceNumber:t,readTime:Ir(r.readTime),documentKey:He(r.documentKey.path),largestBatchId:r.largestBatchId}}/**
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
 */class OR{getBundleMetadata(e,t){return lp(e).get(t).next(r=>{if(r)return function(i){return{id:i.bundleId,createTime:Er(i.createTime),version:i.version}}(r)})}saveBundleMetadata(e,t){return lp(e).put(function(s){return{bundleId:s.id,createTime:Ir(be(s.createTime)),version:s.version}}(t))}getNamedQuery(e,t){return hp(e).get(t).next(r=>{if(r)return function(i){return{name:i.name,query:ic(i.bundledQuery),readTime:Er(i.readTime)}}(r)})}saveNamedQuery(e,t){return hp(e).put(function(s){return{name:s.name,readTime:Ir(be(s.readTime)),bundledQuery:s.bundledQuery}}(t))}}function lp(n){return Oe(n,Qa)}function hp(n){return Oe(n,Ja)}/**
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
 */class oc{constructor(e,t){this.serializer=e,this.userId=t}static wt(e,t){const r=t.uid||"";return new oc(e,r)}getOverlay(e,t){return oi(e).get(cp(this.userId,t)).next(r=>r?eu(this.serializer,r):null)}getOverlays(e,t){const r=Dt();return S.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){const s=[];return r.forEach((i,o)=>{const c=new Ml(t,o);s.push(this.St(e,c))}),S.waitFor(s)}removeOverlaysForBatchId(e,t,r){const s=new Set;t.forEach(o=>s.add(He(o.getCollectionPath())));const i=[];return s.forEach(o=>{const c=IDBKeyRange.bound([this.userId,o,r],[this.userId,o,r+1],!1,!0);i.push(oi(e).X(Du,c))}),S.waitFor(i)}getOverlaysForCollection(e,t,r){const s=Dt(),i=He(t),o=IDBKeyRange.bound([this.userId,i,r],[this.userId,i,Number.POSITIVE_INFINITY],!0);return oi(e).J(Du,o).next(c=>{for(const u of c){const l=eu(this.serializer,u);s.set(l.getKey(),l)}return s})}getOverlaysForCollectionGroup(e,t,r,s){const i=Dt();let o;const c=IDBKeyRange.bound([this.userId,t,r],[this.userId,t,Number.POSITIVE_INFINITY],!0);return oi(e).ee({index:a_,range:c},(u,l,d)=>{const f=eu(this.serializer,l);i.size()<s||f.largestBatchId===o?(i.set(f.getKey(),f),o=f.largestBatchId):d.done()}).next(()=>i)}St(e,t){return oi(e).put(function(s,i,o){const[c,u,l]=cp(i,o.mutation.key);return{userId:i,collectionPath:u,documentId:l,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:zi(s.yt,o.mutation)}}(this.serializer,this.userId,t))}}function oi(n){return Oe(n,Ya)}/**
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
 */class LR{bt(e){return Oe(e,Sl)}getSessionToken(e){return this.bt(e).get("sessionToken").next(t=>{const r=t==null?void 0:t.value;return r?Ie.fromUint8Array(r):Ie.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.bt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
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
 */class or{constructor(){}Dt(e,t){this.Ct(e,t),t.vt()}Ct(e,t){if("nullValue"in e)this.Ft(t,5);else if("booleanValue"in e)this.Ft(t,10),t.Mt(e.booleanValue?1:0);else if("integerValue"in e)this.Ft(t,15),t.Mt(me(e.integerValue));else if("doubleValue"in e){const r=me(e.doubleValue);isNaN(r)?this.Ft(t,13):(this.Ft(t,15),Oi(r)?t.Mt(0):t.Mt(r))}else if("timestampValue"in e){let r=e.timestampValue;this.Ft(t,20),typeof r=="string"&&(r=Qt(r)),t.xt(`${r.seconds||""}`),t.Mt(r.nanos||0)}else if("stringValue"in e)this.Ot(e.stringValue,t),this.Nt(t);else if("bytesValue"in e)this.Ft(t,30),t.Bt(Jt(e.bytesValue)),this.Nt(t);else if("referenceValue"in e)this.Lt(e.referenceValue,t);else if("geoPointValue"in e){const r=e.geoPointValue;this.Ft(t,45),t.Mt(r.latitude||0),t.Mt(r.longitude||0)}else"mapValue"in e?E_(e)?this.Ft(t,Number.MAX_SAFE_INTEGER):ec(e)?this.kt(e.mapValue,t):(this.qt(e.mapValue,t),this.Nt(t)):"arrayValue"in e?(this.Kt(e.arrayValue,t),this.Nt(t)):j(19022,{Ut:e})}Ot(e,t){this.Ft(t,25),this.$t(e,t)}$t(e,t){t.xt(e)}qt(e,t){const r=e.fields||{};this.Ft(t,55);for(const s of Object.keys(r))this.Ot(s,t),this.Ct(r[s],t)}kt(e,t){var o,c;const r=e.fields||{};this.Ft(t,53);const s=fs,i=((c=(o=r[s].arrayValue)==null?void 0:o.values)==null?void 0:c.length)||0;this.Ft(t,15),t.Mt(me(i)),this.Ot(s,t),this.Ct(r[s],t)}Kt(e,t){const r=e.values||[];this.Ft(t,50);for(const s of r)this.Ct(s,t)}Lt(e,t){this.Ft(t,37),L.fromName(e).path.forEach(r=>{this.Ft(t,60),this.$t(r,t)})}Ft(e,t){e.Mt(t)}Nt(e){e.Mt(2)}}or.Wt=new or;/**
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
 */const Ur=255;function MR(n){if(n===0)return 8;let e=0;return n>>4||(e+=4,n<<=4),n>>6||(e+=2,n<<=2),n>>7||(e+=1),e}function dp(n){const e=64-function(r){let s=0;for(let i=0;i<8;++i){const o=MR(255&r[i]);if(s+=o,o!==8)break}return s}(n);return Math.ceil(e/8)}class FR{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Qt(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Gt(r.value),r=t.next();this.zt()}jt(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Jt(r.value),r=t.next();this.Ht()}Zt(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Gt(r);else if(r<2048)this.Gt(960|r>>>6),this.Gt(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Gt(480|r>>>12),this.Gt(128|63&r>>>6),this.Gt(128|63&r);else{const s=t.codePointAt(0);this.Gt(240|s>>>18),this.Gt(128|63&s>>>12),this.Gt(128|63&s>>>6),this.Gt(128|63&s)}}this.zt()}Xt(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Jt(r);else if(r<2048)this.Jt(960|r>>>6),this.Jt(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Jt(480|r>>>12),this.Jt(128|63&r>>>6),this.Jt(128|63&r);else{const s=t.codePointAt(0);this.Jt(240|s>>>18),this.Jt(128|63&s>>>12),this.Jt(128|63&s>>>6),this.Jt(128|63&s)}}this.Ht()}Yt(e){const t=this.en(e),r=dp(t);this.tn(1+r),this.buffer[this.position++]=255&r;for(let s=t.length-r;s<t.length;++s)this.buffer[this.position++]=255&t[s]}nn(e){const t=this.en(e),r=dp(t);this.tn(1+r),this.buffer[this.position++]=~(255&r);for(let s=t.length-r;s<t.length;++s)this.buffer[this.position++]=~(255&t[s])}rn(){this.sn(Ur),this.sn(255)}_n(){this.an(Ur),this.an(255)}reset(){this.position=0}seed(e){this.tn(e.length),this.buffer.set(e,this.position),this.position+=e.length}un(){return this.buffer.slice(0,this.position)}en(e){const t=function(i){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,i,!1),new Uint8Array(o.buffer)}(e),r=!!(128&t[0]);t[0]^=r?255:128;for(let s=1;s<t.length;++s)t[s]^=r?255:0;return t}Gt(e){const t=255&e;t===0?(this.sn(0),this.sn(255)):t===Ur?(this.sn(Ur),this.sn(0)):this.sn(t)}Jt(e){const t=255&e;t===0?(this.an(0),this.an(255)):t===Ur?(this.an(Ur),this.an(0)):this.an(e)}zt(){this.sn(0),this.sn(1)}Ht(){this.an(0),this.an(1)}sn(e){this.tn(1),this.buffer[this.position++]=e}an(e){this.tn(1),this.buffer[this.position++]=~e}tn(e){const t=e+this.position;if(t<=this.buffer.length)return;let r=2*this.buffer.length;r<t&&(r=t);const s=new Uint8Array(r);s.set(this.buffer),this.buffer=s}}class UR{constructor(e){this.cn=e}Bt(e){this.cn.Qt(e)}xt(e){this.cn.Zt(e)}Mt(e){this.cn.Yt(e)}vt(){this.cn.rn()}}class BR{constructor(e){this.cn=e}Bt(e){this.cn.jt(e)}xt(e){this.cn.Xt(e)}Mt(e){this.cn.nn(e)}vt(){this.cn._n()}}class ai{constructor(){this.cn=new FR,this.ascending=new UR(this.cn),this.descending=new BR(this.cn)}seed(e){this.cn.seed(e)}ln(e){return e===0?this.ascending:this.descending}un(){return this.cn.un()}reset(){this.cn.reset()}}/**
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
 */class ar{constructor(e,t,r,s){this.hn=e,this.Pn=t,this.Tn=r,this.En=s}In(){const e=this.En.length,t=e===0||this.En[e-1]===255?e+1:e,r=new Uint8Array(t);return r.set(this.En,0),t!==e?r.set([0],this.En.length):++r[r.length-1],new ar(this.hn,this.Pn,this.Tn,r)}Rn(e,t,r){return{indexId:this.hn,uid:e,arrayValue:ra(this.Tn),directionalValue:ra(this.En),orderedDocumentKey:ra(t),documentKey:r.path.toArray()}}An(e,t,r){const s=this.Rn(e,t,r);return[s.indexId,s.uid,s.arrayValue,s.directionalValue,s.orderedDocumentKey,s.documentKey]}}function pn(n,e){let t=n.hn-e.hn;return t!==0?t:(t=fp(n.Tn,e.Tn),t!==0?t:(t=fp(n.En,e.En),t!==0?t:L.comparator(n.Pn,e.Pn)))}function fp(n,e){for(let t=0;t<n.length&&t<e.length;++t){const r=n[t]-e[t];if(r!==0)return r}return n.length-e.length}function ra(n){return Lm()?function(t){let r="";for(let s=0;s<t.length;s++)r+=String.fromCharCode(t[s]);return r}(n):n}function pp(n){return typeof n!="string"?n:function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(n)}class mp{constructor(e){this.Vn=new ce((t,r)=>pe.comparator(t.field,r.field)),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.dn=e.orderBy,this.mn=[];for(const t of e.filters){const r=t;r.isInequality()?this.Vn=this.Vn.add(r):this.mn.push(r)}}get fn(){return this.Vn.size>1}gn(e){if(q(e.collectionGroup===this.collectionId,49279),this.fn)return!1;const t=Pu(e);if(t!==void 0&&!this.pn(t))return!1;const r=nr(e);let s=new Set,i=0,o=0;for(;i<r.length&&this.pn(r[i]);++i)s=s.add(r[i].fieldPath.canonicalString());if(i===r.length)return!0;if(this.Vn.size>0){const c=this.Vn.getIterator().getNext();if(!s.has(c.field.canonicalString())){const u=r[i];if(!this.yn(c,u)||!this.wn(this.dn[o++],u))return!1}++i}for(;i<r.length;++i){const c=r[i];if(o>=this.dn.length||!this.wn(this.dn[o++],c))return!1}return!0}Sn(){if(this.fn)return null;let e=new ce(pe.comparator);const t=[];for(const r of this.mn)if(!r.field.isKeyField())if(r.op==="array-contains"||r.op==="array-contains-any")t.push(new ur(r.field,2));else{if(e.has(r.field))continue;e=e.add(r.field),t.push(new ur(r.field,0))}for(const r of this.dn)r.field.isKeyField()||e.has(r.field)||(e=e.add(r.field),t.push(new ur(r.field,r.dir==="asc"?0:1)));return new as(as.UNKNOWN_ID,this.collectionId,t,cs.empty())}pn(e){for(const t of this.mn)if(this.yn(t,e))return!0;return!1}yn(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const r=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===r}wn(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
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
 */function fy(n){var t,r;if(q(n instanceof ne||n instanceof oe,20012),n instanceof ne){if(n instanceof x_){const s=((r=(t=n.value.arrayValue)==null?void 0:t.values)==null?void 0:r.map(i=>ne.create(n.field,"==",i)))||[];return oe.create(s,"or")}return n}const e=n.filters.map(s=>fy(s));return oe.create(e,n.op)}function jR(n){if(n.getFilters().length===0)return[];const e=zu(fy(n));return q(py(e),7391),qu(e)||$u(e)?[e]:e.getFilters()}function qu(n){return n instanceof ne}function $u(n){return n instanceof oe&&Cl(n)}function py(n){return qu(n)||$u(n)||function(t){if(t instanceof oe&&Ou(t)){for(const r of t.getFilters())if(!qu(r)&&!$u(r))return!1;return!0}return!1}(n)}function zu(n){if(q(n instanceof ne||n instanceof oe,34018),n instanceof ne)return n;if(n.filters.length===1)return zu(n.filters[0]);const e=n.filters.map(r=>zu(r));let t=oe.create(e,n.op);return t=Aa(t),py(t)?t:(q(t instanceof oe,64498),q(ms(t),40251),q(t.filters.length>1,57927),t.filters.reduce((r,s)=>Bl(r,s)))}function Bl(n,e){let t;return q(n instanceof ne||n instanceof oe,38388),q(e instanceof ne||e instanceof oe,25473),t=n instanceof ne?e instanceof ne?function(s,i){return oe.create([s,i],"and")}(n,e):gp(n,e):e instanceof ne?gp(e,n):function(s,i){if(q(s.filters.length>0&&i.filters.length>0,48005),ms(s)&&ms(i))return S_(s,i.getFilters());const o=Ou(s)?s:i,c=Ou(s)?i:s,u=o.filters.map(l=>Bl(l,c));return oe.create(u,"or")}(n,e),Aa(t)}function gp(n,e){if(ms(e))return S_(e,n.getFilters());{const t=e.filters.map(r=>Bl(n,r));return oe.create(t,"or")}}function Aa(n){if(q(n instanceof ne||n instanceof oe,11850),n instanceof ne)return n;const e=n.getFilters();if(e.length===1)return Aa(e[0]);if(v_(n))return n;const t=e.map(s=>Aa(s)),r=[];return t.forEach(s=>{s instanceof ne?r.push(s):s instanceof oe&&(s.op===n.op?r.push(...s.filters):r.push(s))}),r.length===1?r[0]:oe.create(r,n.op)}/**
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
 */class GR{constructor(){this.bn=new jl}addToCollectionParentIndex(e,t){return this.bn.add(t),S.resolve()}getCollectionParents(e,t){return S.resolve(this.bn.getEntries(t))}addFieldIndex(e,t){return S.resolve()}deleteFieldIndex(e,t){return S.resolve()}deleteAllFieldIndexes(e){return S.resolve()}createTargetIndexes(e,t){return S.resolve()}getDocumentsMatchingTarget(e,t){return S.resolve(null)}getIndexType(e,t){return S.resolve(0)}getFieldIndexes(e,t){return S.resolve([])}getNextCollectionGroupToUpdate(e){return S.resolve(null)}getMinOffset(e,t){return S.resolve(pt.min())}getMinOffsetFromCollectionGroup(e,t){return S.resolve(pt.min())}updateCollectionGroup(e,t,r){return S.resolve()}updateIndexEntries(e,t){return S.resolve()}}class jl{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new ce(Z.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new ce(Z.comparator)).toArray()}}/**
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
 */const _p="IndexedDbIndexManager",Fo=new Uint8Array(0);class qR{constructor(e,t){this.databaseId=t,this.Dn=new jl,this.Cn=new rn(r=>gr(r),(r,s)=>no(r,s)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.Dn.has(t)){const r=t.lastSegment(),s=t.popLast();e.addOnCommittedListener(()=>{this.Dn.add(t)});const i={collectionId:r,parent:He(s)};return yp(e).put(i)}return S.resolve()}getCollectionParents(e,t){const r=[],s=IDBKeyRange.bound([t,""],[Wg(t),""],!1,!0);return yp(e).J(s).next(i=>{for(const o of i){if(o.collectionId!==t)break;r.push(Ct(o.parent))}return r})}addFieldIndex(e,t){const r=ci(e),s=function(c){return{indexId:c.indexId,collectionGroup:c.collectionGroup,fields:c.fields.map(u=>[u.fieldPath.canonicalString(),u.kind])}}(t);delete s.indexId;const i=r.add(s);if(t.indexState){const o=jr(e);return i.next(c=>{o.put(up(c,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return i.next()}deleteFieldIndex(e,t){const r=ci(e),s=jr(e),i=Br(e);return r.delete(t.indexId).next(()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){const t=ci(e),r=Br(e),s=jr(e);return t.X().next(()=>r.X()).next(()=>s.X())}createTargetIndexes(e,t){return S.forEach(this.vn(t),r=>this.getIndexType(e,r).next(s=>{if(s===0||s===1){const i=new mp(r).Sn();if(i!=null)return this.addFieldIndex(e,i)}}))}getDocumentsMatchingTarget(e,t){const r=Br(e);let s=!0;const i=new Map;return S.forEach(this.vn(t),o=>this.Fn(e,o).next(c=>{s&&(s=!!c),i.set(o,c)})).next(()=>{if(s){let o=J();const c=[];return S.forEach(i,(u,l)=>{V(_p,`Using index ${function(U){return`id=${U.indexId}|cg=${U.collectionGroup}|f=${U.fields.map(z=>`${z.fieldPath}:${z.kind}`).join(",")}`}(u)} to execute ${gr(t)}`);const d=function(U,z){const W=Pu(z);if(W===void 0)return null;for(const Q of Ea(U,W.fieldPath))switch(Q.op){case"array-contains-any":return Q.value.arrayValue.values||[];case"array-contains":return[Q.value]}return null}(l,u),f=function(U,z){const W=new Map;for(const Q of nr(z))for(const T of Ea(U,Q.fieldPath))switch(T.op){case"==":case"in":W.set(Q.fieldPath.canonicalString(),T.value);break;case"not-in":case"!=":return W.set(Q.fieldPath.canonicalString(),T.value),Array.from(W.values())}return null}(l,u),m=function(U,z){const W=[];let Q=!0;for(const T of nr(z)){const y=T.kind===0?Qf(U,T.fieldPath,U.startAt):Jf(U,T.fieldPath,U.startAt);W.push(y.value),Q&&(Q=y.inclusive)}return new Ln(W,Q)}(l,u),I=function(U,z){const W=[];let Q=!0;for(const T of nr(z)){const y=T.kind===0?Jf(U,T.fieldPath,U.endAt):Qf(U,T.fieldPath,U.endAt);W.push(y.value),Q&&(Q=y.inclusive)}return new Ln(W,Q)}(l,u),b=this.Mn(u,l,m),x=this.Mn(u,l,I),D=this.xn(u,l,f),O=this.On(u.indexId,d,b,m.inclusive,x,I.inclusive,D);return S.forEach(O,B=>r.Z(B,t.limit).next(U=>{U.forEach(z=>{const W=L.fromSegments(z.documentKey);o.has(W)||(o=o.add(W),c.push(W))})}))}).next(()=>c)}return S.resolve(null)})}vn(e){let t=this.Cn.get(e);return t||(e.filters.length===0?t=[e]:t=jR(oe.create(e.filters,"and")).map(r=>Mu(e.path,e.collectionGroup,e.orderBy,r.getFilters(),e.limit,e.startAt,e.endAt)),this.Cn.set(e,t),t)}On(e,t,r,s,i,o,c){const u=(t!=null?t.length:1)*Math.max(r.length,i.length),l=u/(t!=null?t.length:1),d=[];for(let f=0;f<u;++f){const m=t?this.Nn(t[f/l]):Fo,I=this.Bn(e,m,r[f%l],s),b=this.Ln(e,m,i[f%l],o),x=c.map(D=>this.Bn(e,m,D,!0));d.push(...this.createRange(I,b,x))}return d}Bn(e,t,r,s){const i=new ar(e,L.empty(),t,r);return s?i:i.In()}Ln(e,t,r,s){const i=new ar(e,L.empty(),t,r);return s?i.In():i}Fn(e,t){const r=new mp(t),s=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,s).next(i=>{let o=null;for(const c of i)r.gn(c)&&(!o||c.fields.length>o.fields.length)&&(o=c);return o})}getIndexType(e,t){let r=2;const s=this.vn(t);return S.forEach(s,i=>this.Fn(e,i).next(o=>{o?r!==0&&o.fields.length<function(u){let l=new ce(pe.comparator),d=!1;for(const f of u.filters)for(const m of f.getFlattenedFilters())m.field.isKeyField()||(m.op==="array-contains"||m.op==="array-contains-any"?d=!0:l=l.add(m.field));for(const f of u.orderBy)f.field.isKeyField()||(l=l.add(f.field));return l.size+(d?1:0)}(i)&&(r=1):r=0})).next(()=>function(o){return o.limit!==null}(t)&&s.length>1&&r===2?1:r)}kn(e,t){const r=new ai;for(const s of nr(e)){const i=t.data.field(s.fieldPath);if(i==null)return null;const o=r.ln(s.kind);or.Wt.Dt(i,o)}return r.un()}Nn(e){const t=new ai;return or.Wt.Dt(e,t.ln(0)),t.un()}qn(e,t){const r=new ai;return or.Wt.Dt(mr(this.databaseId,t),r.ln(function(i){const o=nr(i);return o.length===0?0:o[o.length-1].kind}(e))),r.un()}xn(e,t,r){if(r===null)return[];let s=[];s.push(new ai);let i=0;for(const o of nr(e)){const c=r[i++];for(const u of s)if(this.Kn(t,o.fieldPath)&&Gi(c))s=this.Un(s,o,c);else{const l=u.ln(o.kind);or.Wt.Dt(c,l)}}return this.$n(s)}Mn(e,t,r){return this.xn(e,t,r.position)}$n(e){const t=[];for(let r=0;r<e.length;++r)t[r]=e[r].un();return t}Un(e,t,r){const s=[...e],i=[];for(const o of r.arrayValue.values||[])for(const c of s){const u=new ai;u.seed(c.un()),or.Wt.Dt(o,u.ln(t.kind)),i.push(u)}return i}Kn(e,t){return!!e.filters.find(r=>r instanceof ne&&r.field.isEqual(t)&&(r.op==="in"||r.op==="not-in"))}getFieldIndexes(e,t){const r=ci(e),s=jr(e);return(t?r.J(Cu,IDBKeyRange.bound(t,t)):r.J()).next(i=>{const o=[];return S.forEach(i,c=>s.get([c.indexId,this.uid]).next(u=>{o.push(function(d,f){const m=f?new cs(f.sequenceNumber,new pt(Er(f.readTime),new L(Ct(f.documentKey)),f.largestBatchId)):cs.empty(),I=d.fields.map(([b,x])=>new ur(pe.fromServerFormat(b),x));return new as(d.indexId,d.collectionGroup,I,m)}(c,u))})).next(()=>o)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(t=>t.length===0?null:(t.sort((r,s)=>{const i=r.indexState.sequenceNumber-s.indexState.sequenceNumber;return i!==0?i:K(r.collectionGroup,s.collectionGroup)}),t[0].collectionGroup))}updateCollectionGroup(e,t,r){const s=ci(e),i=jr(e);return this.Wn(e).next(o=>s.J(Cu,IDBKeyRange.bound(t,t)).next(c=>S.forEach(c,u=>i.put(up(u.indexId,this.uid,o,r)))))}updateIndexEntries(e,t){const r=new Map;return S.forEach(t,(s,i)=>{const o=r.get(s.collectionGroup);return(o?S.resolve(o):this.getFieldIndexes(e,s.collectionGroup)).next(c=>(r.set(s.collectionGroup,c),S.forEach(c,u=>this.Qn(e,s,u).next(l=>{const d=this.Gn(i,u);return l.isEqual(d)?S.resolve():this.zn(e,i,u,l,d)}))))})}jn(e,t,r,s){return Br(e).put(s.Rn(this.uid,this.qn(r,t.key),t.key))}Jn(e,t,r,s){return Br(e).delete(s.An(this.uid,this.qn(r,t.key),t.key))}Qn(e,t,r){const s=Br(e);let i=new ce(pn);return s.ee({index:o_,range:IDBKeyRange.only([r.indexId,this.uid,ra(this.qn(r,t))])},(o,c)=>{i=i.add(new ar(r.indexId,t,pp(c.arrayValue),pp(c.directionalValue)))}).next(()=>i)}Gn(e,t){let r=new ce(pn);const s=this.kn(t,e);if(s==null)return r;const i=Pu(t);if(i!=null){const o=e.data.field(i.fieldPath);if(Gi(o))for(const c of o.arrayValue.values||[])r=r.add(new ar(t.indexId,e.key,this.Nn(c),s))}else r=r.add(new ar(t.indexId,e.key,Fo,s));return r}zn(e,t,r,s,i){V(_p,"Updating index entries for document '%s'",t.key);const o=[];return function(u,l,d,f,m){const I=u.getIterator(),b=l.getIterator();let x=Fr(I),D=Fr(b);for(;x||D;){let O=!1,B=!1;if(x&&D){const U=d(x,D);U<0?B=!0:U>0&&(O=!0)}else x!=null?B=!0:O=!0;O?(f(D),D=Fr(b)):B?(m(x),x=Fr(I)):(x=Fr(I),D=Fr(b))}}(s,i,pn,c=>{o.push(this.jn(e,t,r,c))},c=>{o.push(this.Jn(e,t,r,c))}),S.waitFor(o)}Wn(e){let t=1;return jr(e).ee({index:i_,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(r,s,i)=>{i.done(),t=s.sequenceNumber+1}).next(()=>t)}createRange(e,t,r){r=r.sort((o,c)=>pn(o,c)).filter((o,c,u)=>!c||pn(o,u[c-1])!==0);const s=[];s.push(e);for(const o of r){const c=pn(o,e),u=pn(o,t);if(c===0)s[0]=e.In();else if(c>0&&u<0)s.push(o),s.push(o.In());else if(u>0)break}s.push(t);const i=[];for(let o=0;o<s.length;o+=2){if(this.Hn(s[o],s[o+1]))return[];const c=s[o].An(this.uid,Fo,L.empty()),u=s[o+1].An(this.uid,Fo,L.empty());i.push(IDBKeyRange.bound(c,u))}return i}Hn(e,t){return pn(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(Ip)}getMinOffset(e,t){return S.mapArray(this.vn(t),r=>this.Fn(e,r).next(s=>s||j(44426))).next(Ip)}}function yp(n){return Oe(n,Fi)}function Br(n){return Oe(n,Ai)}function ci(n){return Oe(n,bl)}function jr(n){return Oe(n,Ti)}function Ip(n){q(n.length!==0,28825);let e=n[0].indexState.offset,t=e.largestBatchId;for(let r=1;r<n.length;r++){const s=n[r].indexState.offset;Tl(s,e)<0&&(e=s),t<s.largestBatchId&&(t=s.largestBatchId)}return new pt(e.readTime,e.documentKey,t)}/**
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
 */const Ep={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},my=41943040;class We{static withCacheSize(e){return new We(e,We.DEFAULT_COLLECTION_PERCENTILE,We.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
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
 */function gy(n,e,t){const r=n.store(_t),s=n.store(us),i=[],o=IDBKeyRange.only(t.batchId);let c=0;const u=r.ee({range:o},(d,f,m)=>(c++,m.delete()));i.push(u.next(()=>{q(c===1,47070,{batchId:t.batchId})}));const l=[];for(const d of t.mutations){const f=n_(e,d.key.path,t.batchId);i.push(s.delete(f)),l.push(d.key)}return S.waitFor(i).next(()=>l)}function va(n){if(!n)return 0;let e;if(n.document)e=n.document;else if(n.unknownDocument)e=n.unknownDocument;else{if(!n.noDocument)throw j(14731);e=n.noDocument}return JSON.stringify(e).length}/**
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
 */We.DEFAULT_COLLECTION_PERCENTILE=10,We.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,We.DEFAULT=new We(my,We.DEFAULT_COLLECTION_PERCENTILE,We.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),We.DISABLED=new We(-1,0,0);class ac{constructor(e,t,r,s){this.userId=e,this.serializer=t,this.indexManager=r,this.referenceDelegate=s,this.Zn={}}static wt(e,t,r,s){q(e.uid!=="",64387);const i=e.isAuthenticated()?e.uid:"";return new ac(i,t,r,s)}checkEmpty(e){let t=!0;const r=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return mn(e).ee({index:cr,range:r},(s,i,o)=>{t=!1,o.done()}).next(()=>t)}addMutationBatch(e,t,r,s){const i=Wr(e),o=mn(e);return o.add({}).next(c=>{q(typeof c=="number",49019);const u=new Ol(c,t,r,s),l=function(I,b,x){const D=x.baseMutations.map(B=>zi(I.yt,B)),O=x.mutations.map(B=>zi(I.yt,B));return{userId:b,batchId:x.batchId,localWriteTimeMs:x.localWriteTime.toMillis(),baseMutations:D,mutations:O}}(this.serializer,this.userId,u),d=[];let f=new ce((m,I)=>K(m.canonicalString(),I.canonicalString()));for(const m of s){const I=n_(this.userId,m.key.path,c);f=f.add(m.key.path.popLast()),d.push(o.put(l)),d.push(i.put(I,yS))}return f.forEach(m=>{d.push(this.indexManager.addToCollectionParentIndex(e,m))}),e.addOnCommittedListener(()=>{this.Zn[c]=u.keys()}),S.waitFor(d).next(()=>u)})}lookupMutationBatch(e,t){return mn(e).get(t).next(r=>r?(q(r.userId===this.userId,48,"Unexpected user for mutation batch",{userId:r.userId,batchId:t}),ir(this.serializer,r)):null)}Xn(e,t){return this.Zn[t]?S.resolve(this.Zn[t]):this.lookupMutationBatch(e,t).next(r=>{if(r){const s=r.keys();return this.Zn[t]=s,s}return null})}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=IDBKeyRange.lowerBound([this.userId,r]);let i=null;return mn(e).ee({index:cr,range:s},(o,c,u)=>{c.userId===this.userId&&(q(c.batchId>=r,47524,{Yn:r}),i=ir(this.serializer,c)),u.done()}).next(()=>i)}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let r=Cn;return mn(e).ee({index:cr,range:t,reverse:!0},(s,i,o)=>{r=i.batchId,o.done()}).next(()=>r)}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,Cn],[this.userId,Number.POSITIVE_INFINITY]);return mn(e).J(cr,t).next(r=>r.map(s=>ir(this.serializer,s)))}getAllMutationBatchesAffectingDocumentKey(e,t){const r=Jo(this.userId,t.path),s=IDBKeyRange.lowerBound(r),i=[];return Wr(e).ee({range:s},(o,c,u)=>{const[l,d,f]=o,m=Ct(d);if(l===this.userId&&t.path.isEqual(m))return mn(e).get(f).next(I=>{if(!I)throw j(61480,{er:o,batchId:f});q(I.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:I.userId,batchId:f}),i.push(ir(this.serializer,I))});u.done()}).next(()=>i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new ce(K);const s=[];return t.forEach(i=>{const o=Jo(this.userId,i.path),c=IDBKeyRange.lowerBound(o),u=Wr(e).ee({range:c},(l,d,f)=>{const[m,I,b]=l,x=Ct(I);m===this.userId&&i.path.isEqual(x)?r=r.add(b):f.done()});s.push(u)}),S.waitFor(s).next(()=>this.tr(e,r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1,i=Jo(this.userId,r),o=IDBKeyRange.lowerBound(i);let c=new ce(K);return Wr(e).ee({range:o},(u,l,d)=>{const[f,m,I]=u,b=Ct(m);f===this.userId&&r.isPrefixOf(b)?b.length===s&&(c=c.add(I)):d.done()}).next(()=>this.tr(e,c))}tr(e,t){const r=[],s=[];return t.forEach(i=>{s.push(mn(e).get(i).next(o=>{if(o===null)throw j(35274,{batchId:i});q(o.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:o.userId,batchId:i}),r.push(ir(this.serializer,o))}))}),S.waitFor(s).next(()=>r)}removeMutationBatch(e,t){return gy(e.le,this.userId,t).next(r=>(e.addOnCommittedListener(()=>{this.nr(t.batchId)}),S.forEach(r,s=>this.referenceDelegate.markPotentiallyOrphaned(e,s))))}nr(e){delete this.Zn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return S.resolve();const r=IDBKeyRange.lowerBound(function(o){return[o]}(this.userId)),s=[];return Wr(e).ee({range:r},(i,o,c)=>{if(i[0]===this.userId){const u=Ct(i[1]);s.push(u)}else c.done()}).next(()=>{q(s.length===0,56720,{rr:s.map(i=>i.canonicalString())})})})}containsKey(e,t){return _y(e,this.userId,t)}ir(e){return yy(e).get(this.userId).next(t=>t||{userId:this.userId,lastAcknowledgedBatchId:Cn,lastStreamToken:""})}}function _y(n,e,t){const r=Jo(e,t.path),s=r[1],i=IDBKeyRange.lowerBound(r);let o=!1;return Wr(n).ee({range:i,Y:!0},(c,u,l)=>{const[d,f,m]=c;d===e&&f===s&&(o=!0),l.done()}).next(()=>o)}function mn(n){return Oe(n,_t)}function Wr(n){return Oe(n,us)}function yy(n){return Oe(n,Li)}/**
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
 */class wr{constructor(e){this.sr=e}next(){return this.sr+=2,this.sr}static _r(){return new wr(0)}static ar(){return new wr(-1)}}/**
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
 */class $R{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.ur(e).next(t=>{const r=new wr(t.highestTargetId);return t.highestTargetId=r.next(),this.cr(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.ur(e).next(t=>$.fromTimestamp(new ie(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.ur(e).next(t=>t.highestListenSequenceNumber)}setTargetsMetadata(e,t,r){return this.ur(e).next(s=>(s.highestListenSequenceNumber=t,r&&(s.lastRemoteSnapshotVersion=r.toTimestamp()),t>s.highestListenSequenceNumber&&(s.highestListenSequenceNumber=t),this.cr(e,s)))}addTargetData(e,t){return this.lr(e,t).next(()=>this.ur(e).next(r=>(r.targetCount+=1,this.hr(t,r),this.cr(e,r))))}updateTargetData(e,t){return this.lr(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>Gr(e).delete(t.targetId)).next(()=>this.ur(e)).next(r=>(q(r.targetCount>0,8065),r.targetCount-=1,this.cr(e,r)))}removeTargets(e,t,r){let s=0;const i=[];return Gr(e).ee((o,c)=>{const u=yi(c);u.sequenceNumber<=t&&r.get(u.targetId)===null&&(s++,i.push(this.removeTargetData(e,u)))}).next(()=>S.waitFor(i)).next(()=>s)}forEachTarget(e,t){return Gr(e).ee((r,s)=>{const i=yi(s);t(i)})}ur(e){return wp(e).get(ya).next(t=>(q(t!==null,2888),t))}cr(e,t){return wp(e).put(ya,t)}lr(e,t){return Gr(e).put(dy(this.serializer,t))}hr(e,t){let r=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,r=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,r=!0),r}getTargetCount(e){return this.ur(e).next(t=>t.targetCount)}getTargetData(e,t){const r=gr(t),s=IDBKeyRange.bound([r,Number.NEGATIVE_INFINITY],[r,Number.POSITIVE_INFINITY]);let i=null;return Gr(e).ee({range:s,index:s_},(o,c,u)=>{const l=yi(c);no(t,l.target)&&(i=l,u.done())}).next(()=>i)}addMatchingKeys(e,t,r){const s=[],i=Tn(e);return t.forEach(o=>{const c=He(o.path);s.push(i.put({targetId:r,path:c})),s.push(this.referenceDelegate.addReference(e,r,o))}),S.waitFor(s)}removeMatchingKeys(e,t,r){const s=Tn(e);return S.forEach(t,i=>{const o=He(i.path);return S.waitFor([s.delete([r,o]),this.referenceDelegate.removeReference(e,r,i)])})}removeMatchingKeysForTargetId(e,t){const r=Tn(e),s=IDBKeyRange.bound([t],[t+1],!1,!0);return r.delete(s)}getMatchingKeysForTargetId(e,t){const r=IDBKeyRange.bound([t],[t+1],!1,!0),s=Tn(e);let i=J();return s.ee({range:r,Y:!0},(o,c,u)=>{const l=Ct(o[1]),d=new L(l);i=i.add(d)}).next(()=>i)}containsKey(e,t){const r=He(t.path),s=IDBKeyRange.bound([r],[Wg(r)],!1,!0);let i=0;return Tn(e).ee({index:vl,Y:!0,range:s},([o,c],u,l)=>{o!==0&&(i++,l.done())}).next(()=>i>0)}At(e,t){return Gr(e).get(t).next(r=>r?yi(r):null)}}function Gr(n){return Oe(n,ls)}function wp(n){return Oe(n,lr)}function Tn(n){return Oe(n,hs)}/**
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
 */const Tp="LruGarbageCollector",Iy=1048576;function Ap([n,e],[t,r]){const s=K(n,t);return s===0?K(e,r):s}class zR{constructor(e){this.Pr=e,this.buffer=new ce(Ap),this.Tr=0}Er(){return++this.Tr}Ir(e){const t=[e,this.Er()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();Ap(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class Ey{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(e){V(Tp,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Gn(t)?V(Tp,"Ignoring IndexedDB error during garbage collection: ",t):await jn(t)}await this.Ar(3e5)})}}class WR{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.dr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return S.resolve(nt.ce);const r=new zR(t);return this.Vr.forEachTarget(e,s=>r.Ir(s.sequenceNumber)).next(()=>this.Vr.mr(e,s=>r.Ir(s))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.Vr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(V("LruGarbageCollector","Garbage collection skipped; disabled"),S.resolve(Ep)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(V("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Ep):this.gr(e,t))}getCacheSize(e){return this.Vr.getCacheSize(e)}gr(e,t){let r,s,i,o,c,u,l;const d=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(f=>(f>this.params.maximumSequenceNumbersToCollect?(V("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${f}`),s=this.params.maximumSequenceNumbersToCollect):s=f,o=Date.now(),this.nthSequenceNumber(e,s))).next(f=>(r=f,c=Date.now(),this.removeTargets(e,r,t))).next(f=>(i=f,u=Date.now(),this.removeOrphanedDocuments(e,r))).next(f=>(l=Date.now(),qr()<=te.DEBUG&&V("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-d}ms
	Determined least recently used ${s} in `+(c-o)+`ms
	Removed ${i} targets in `+(u-c)+`ms
	Removed ${f} documents in `+(l-u)+`ms
Total Duration: ${l-d}ms`),S.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:f})))}}function wy(n,e){return new WR(n,e)}/**
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
 */class HR{constructor(e,t){this.db=e,this.garbageCollector=wy(this,t)}dr(e){const t=this.pr(e);return this.db.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}pr(e){let t=0;return this.mr(e,r=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}mr(e,t){return this.yr(e,(r,s)=>t(s))}addReference(e,t,r){return Uo(e,r)}removeReference(e,t,r){return Uo(e,r)}removeTargets(e,t,r){return this.db.getTargetCache().removeTargets(e,t,r)}markPotentiallyOrphaned(e,t){return Uo(e,t)}wr(e,t){return function(s,i){let o=!1;return yy(s).te(c=>_y(s,c,i).next(u=>(u&&(o=!0),S.resolve(!u)))).next(()=>o)}(e,t)}removeOrphanedDocuments(e,t){const r=this.db.getRemoteDocumentCache().newChangeBuffer(),s=[];let i=0;return this.yr(e,(o,c)=>{if(c<=t){const u=this.wr(e,o).next(l=>{if(!l)return i++,r.getEntry(e,o).next(()=>(r.removeEntry(o,$.min()),Tn(e).delete(function(f){return[0,He(f.path)]}(o))))});s.push(u)}}).next(()=>S.waitFor(s)).next(()=>r.apply(e)).next(()=>i)}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,r)}updateLimboDocument(e,t){return Uo(e,t)}yr(e,t){const r=Tn(e);let s,i=nt.ce;return r.ee({index:vl},([o,c],{path:u,sequenceNumber:l})=>{o===0?(i!==nt.ce&&t(new L(Ct(s)),i),i=l,s=u):i=nt.ce}).next(()=>{i!==nt.ce&&t(new L(Ct(s)),i)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function Uo(n,e){return Tn(n).put(function(r,s){return{targetId:0,path:He(r.path),sequenceNumber:s}}(e,n.currentSequenceNumber))}/**
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
 */class Ty{constructor(){this.changes=new rn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,fe.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?S.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class KR{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,r){return er(e).put(r)}removeEntry(e,t,r){return er(e).delete(function(i,o){const c=i.path.toArray();return[c.slice(0,c.length-2),c[c.length-2],Ta(o),c[c.length-1]]}(t,r))}updateMetadata(e,t){return this.getMetadata(e).next(r=>(r.byteSize+=t,this.Sr(e,r)))}getEntry(e,t){let r=fe.newInvalidDocument(t);return er(e).ee({index:Yo,range:IDBKeyRange.only(ui(t))},(s,i)=>{r=this.br(t,i)}).next(()=>r)}Dr(e,t){let r={size:0,document:fe.newInvalidDocument(t)};return er(e).ee({index:Yo,range:IDBKeyRange.only(ui(t))},(s,i)=>{r={document:this.br(t,i),size:va(i)}}).next(()=>r)}getEntries(e,t){let r=st();return this.Cr(e,t,(s,i)=>{const o=this.br(s,i);r=r.insert(s,o)}).next(()=>r)}vr(e,t){let r=st(),s=new he(L.comparator);return this.Cr(e,t,(i,o)=>{const c=this.br(i,o);r=r.insert(i,c),s=s.insert(i,va(o))}).next(()=>({documents:r,Fr:s}))}Cr(e,t,r){if(t.isEmpty())return S.resolve();let s=new ce(Sp);t.forEach(u=>s=s.add(u));const i=IDBKeyRange.bound(ui(s.first()),ui(s.last())),o=s.getIterator();let c=o.getNext();return er(e).ee({index:Yo,range:i},(u,l,d)=>{const f=L.fromSegments([...l.prefixPath,l.collectionGroup,l.documentId]);for(;c&&Sp(c,f)<0;)r(c,null),c=o.getNext();c&&c.isEqual(f)&&(r(c,l),c=o.hasNext()?o.getNext():null),c?d.j(ui(c)):d.done()}).next(()=>{for(;c;)r(c,null),c=o.hasNext()?o.getNext():null})}getDocumentsMatchingQuery(e,t,r,s,i){const o=t.path,c=[o.popLast().toArray(),o.lastSegment(),Ta(r.readTime),r.documentKey.path.isEmpty()?"":r.documentKey.path.lastSegment()],u=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return er(e).J(IDBKeyRange.bound(c,u,!0)).next(l=>{i==null||i.incrementDocumentReadCount(l.length);let d=st();for(const f of l){const m=this.br(L.fromSegments(f.prefixPath.concat(f.collectionGroup,f.documentId)),f);m.isFoundDocument()&&(so(t,m)||s.has(m.key))&&(d=d.insert(m.key,m))}return d})}getAllFromCollectionGroup(e,t,r,s){let i=st();const o=bp(t,r),c=bp(t,pt.max());return er(e).ee({index:r_,range:IDBKeyRange.bound(o,c,!0)},(u,l,d)=>{const f=this.br(L.fromSegments(l.prefixPath.concat(l.collectionGroup,l.documentId)),l);i=i.insert(f.key,f),i.size===s&&d.done()}).next(()=>i)}newChangeBuffer(e){return new QR(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(t=>t.byteSize)}getMetadata(e){return vp(e).get(xu).next(t=>(q(!!t,20021),t))}Sr(e,t){return vp(e).put(xu,t)}br(e,t){if(t){const r=VR(this.serializer,t);if(!(r.isNoDocument()&&r.version.isEqual($.min())))return r}return fe.newInvalidDocument(e)}}function Ay(n){return new KR(n)}class QR extends Ty{constructor(e,t){super(),this.Mr=e,this.trackRemovals=t,this.Or=new rn(r=>r.toString(),(r,s)=>r.isEqual(s))}applyChanges(e){const t=[];let r=0,s=new ce((i,o)=>K(i.canonicalString(),o.canonicalString()));return this.changes.forEach((i,o)=>{const c=this.Or.get(i);if(t.push(this.Mr.removeEntry(e,i,c.readTime)),o.isValidDocument()){const u=ap(this.Mr.serializer,o);s=s.add(i.path.popLast());const l=va(u);r+=l-c.size,t.push(this.Mr.addEntry(e,i,u))}else if(r-=c.size,this.trackRemovals){const u=ap(this.Mr.serializer,o.convertToNoDocument($.min()));t.push(this.Mr.addEntry(e,i,u))}}),s.forEach(i=>{t.push(this.Mr.indexManager.addToCollectionParentIndex(e,i))}),t.push(this.Mr.updateMetadata(e,r)),S.waitFor(t)}getFromCache(e,t){return this.Mr.Dr(e,t).next(r=>(this.Or.set(t,{size:r.size,readTime:r.document.readTime}),r.document))}getAllFromCache(e,t){return this.Mr.vr(e,t).next(({documents:r,Fr:s})=>(s.forEach((i,o)=>{this.Or.set(i,{size:o,readTime:r.get(i).readTime})}),r))}}function vp(n){return Oe(n,Mi)}function er(n){return Oe(n,_a)}function ui(n){const e=n.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function bp(n,e){const t=e.documentKey.path.toArray();return[n,Ta(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function Sp(n,e){const t=n.path.toArray(),r=e.path.toArray();let s=0;for(let i=0;i<t.length-2&&i<r.length-2;++i)if(s=K(t[i],r[i]),s)return s;return s=K(t.length,r.length),s||(s=K(t[t.length-2],r[r.length-2]),s||K(t[t.length-1],r[r.length-1]))}/**
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
 */class JR{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class vy{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&Si(r.mutation,s,rt.empty(),ie.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,J()).next(()=>r))}getLocalViewOfDocuments(e,t,r=J()){const s=Dt();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(i=>{let o=gi();return i.forEach((c,u)=>{o=o.insert(c,u.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){const r=Dt();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,J()))}populateOverlays(e,t,r){const s=[];return r.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((o,c)=>{t.set(o,c)})})}computeViews(e,t,r,s){let i=st();const o=bi(),c=function(){return bi()}();return t.forEach((u,l)=>{const d=r.get(l.key);s.has(l.key)&&(d===void 0||d.mutation instanceof sn)?i=i.insert(l.key,l):d!==void 0?(o.set(l.key,d.mutation.getFieldMask()),Si(d.mutation,l,d.mutation.getFieldMask(),ie.now())):o.set(l.key,rt.empty())}),this.recalculateAndSaveOverlays(e,i).next(u=>(u.forEach((l,d)=>o.set(l,d)),t.forEach((l,d)=>c.set(l,new JR(d,o.get(l)??null))),c))}recalculateAndSaveOverlays(e,t){const r=bi();let s=new he((o,c)=>o-c),i=J();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(const c of o)c.keys().forEach(u=>{const l=t.get(u);if(l===null)return;let d=r.get(u)||rt.empty();d=c.applyToLocalView(l,d),r.set(u,d);const f=(s.get(c.batchId)||J()).add(u);s=s.insert(c.batchId,f)})}).next(()=>{const o=[],c=s.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),l=u.key,d=u.value,f=F_();d.forEach(m=>{if(!i.has(m)){const I=z_(t.get(m),r.get(m));I!==null&&f.set(m,I),i=i.add(m)}}),o.push(this.documentOverlayCache.saveOverlays(e,l,f))}return S.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,s){return nR(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Dl(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):S.resolve(Dt());let c=os,u=i;return o.next(l=>S.forEach(l,(d,f)=>(c<f.largestBatchId&&(c=f.largestBatchId),i.get(d)?S.resolve():this.remoteDocumentCache.getEntry(e,d).next(m=>{u=u.insert(d,m)}))).next(()=>this.populateOverlays(e,l,i)).next(()=>this.computeViews(e,u,l,J())).next(d=>({batchId:c,changes:M_(d)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new L(t)).next(r=>{let s=gi();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let o=gi();return this.indexManager.getCollectionParents(e,i).next(c=>S.forEach(c,u=>{const l=function(f,m){return new nn(m,null,f.explicitOrderBy.slice(),f.filters.slice(),f.limit,f.limitType,f.startAt,f.endAt)}(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,l,r,s).next(d=>{d.forEach((f,m)=>{o=o.insert(f,m)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s))).next(o=>{i.forEach((u,l)=>{const d=l.getKey();o.get(d)===null&&(o=o.insert(d,fe.newInvalidDocument(d)))});let c=gi();return o.forEach((u,l)=>{const d=i.get(u);d!==void 0&&Si(d.mutation,l,rt.empty(),ie.now()),so(t,l)&&(c=c.insert(u,l))}),c})}}/**
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
 */class YR{constructor(e){this.serializer=e,this.Nr=new Map,this.Br=new Map}getBundleMetadata(e,t){return S.resolve(this.Nr.get(t))}saveBundleMetadata(e,t){return this.Nr.set(t.id,function(s){return{id:s.id,version:s.version,createTime:be(s.createTime)}}(t)),S.resolve()}getNamedQuery(e,t){return S.resolve(this.Br.get(t))}saveNamedQuery(e,t){return this.Br.set(t.name,function(s){return{name:s.name,query:ic(s.bundledQuery),readTime:be(s.readTime)}}(t)),S.resolve()}}/**
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
 */class XR{constructor(){this.overlays=new he(L.comparator),this.Lr=new Map}getOverlay(e,t){return S.resolve(this.overlays.get(t))}getOverlays(e,t){const r=Dt();return S.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((s,i)=>{this.St(e,t,i)}),S.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Lr.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Lr.delete(r)),S.resolve()}getOverlaysForCollection(e,t,r){const s=Dt(),i=t.length+1,o=new L(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const u=c.getNext().value,l=u.getKey();if(!t.isPrefixOf(l.path))break;l.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return S.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new he((l,d)=>l-d);const o=this.overlays.getIterator();for(;o.hasNext();){const l=o.getNext().value;if(l.getKey().getCollectionGroup()===t&&l.largestBatchId>r){let d=i.get(l.largestBatchId);d===null&&(d=Dt(),i=i.insert(l.largestBatchId,d)),d.set(l.getKey(),l)}}const c=Dt(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((l,d)=>c.set(l,d)),!(c.size()>=s)););return S.resolve(c)}St(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.Lr.get(s.largestBatchId).delete(r.key);this.Lr.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new Ml(t,r));let i=this.Lr.get(t);i===void 0&&(i=J(),this.Lr.set(t,i)),this.Lr.set(t,i.add(r.key))}}/**
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
 */class ZR{constructor(){this.sessionToken=Ie.EMPTY_BYTE_STRING}getSessionToken(e){return S.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,S.resolve()}}/**
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
 */class Gl{constructor(){this.kr=new ce(Fe.qr),this.Kr=new ce(Fe.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(e,t){const r=new Fe(e,t);this.kr=this.kr.add(r),this.Kr=this.Kr.add(r)}$r(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Wr(new Fe(e,t))}Qr(e,t){e.forEach(r=>this.removeReference(r,t))}Gr(e){const t=new L(new Z([])),r=new Fe(t,e),s=new Fe(t,e+1),i=[];return this.Kr.forEachInRange([r,s],o=>{this.Wr(o),i.push(o.key)}),i}zr(){this.kr.forEach(e=>this.Wr(e))}Wr(e){this.kr=this.kr.delete(e),this.Kr=this.Kr.delete(e)}jr(e){const t=new L(new Z([])),r=new Fe(t,e),s=new Fe(t,e+1);let i=J();return this.Kr.forEachInRange([r,s],o=>{i=i.add(o.key)}),i}containsKey(e){const t=new Fe(e,0),r=this.kr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class Fe{constructor(e,t){this.key=e,this.Jr=t}static qr(e,t){return L.comparator(e.key,t.key)||K(e.Jr,t.Jr)}static Ur(e,t){return K(e.Jr,t.Jr)||L.comparator(e.key,t.key)}}/**
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
 */class eP{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Yn=1,this.Hr=new ce(Fe.qr)}checkEmpty(e){return S.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new Ol(i,t,r,s);this.mutationQueue.push(o);for(const c of s)this.Hr=this.Hr.add(new Fe(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return S.resolve(o)}lookupMutationBatch(e,t){return S.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.Xr(r),i=s<0?0:s;return S.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return S.resolve(this.mutationQueue.length===0?Cn:this.Yn-1)}getAllMutationBatches(e){return S.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new Fe(t,0),s=new Fe(t,Number.POSITIVE_INFINITY),i=[];return this.Hr.forEachInRange([r,s],o=>{const c=this.Zr(o.Jr);i.push(c)}),S.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new ce(K);return t.forEach(s=>{const i=new Fe(s,0),o=new Fe(s,Number.POSITIVE_INFINITY);this.Hr.forEachInRange([i,o],c=>{r=r.add(c.Jr)})}),S.resolve(this.Yr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;L.isDocumentKey(i)||(i=i.child(""));const o=new Fe(new L(i),0);let c=new ce(K);return this.Hr.forEachWhile(u=>{const l=u.key.path;return!!r.isPrefixOf(l)&&(l.length===s&&(c=c.add(u.Jr)),!0)},o),S.resolve(this.Yr(c))}Yr(e){const t=[];return e.forEach(r=>{const s=this.Zr(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){q(this.ei(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Hr;return S.forEach(t.mutations,s=>{const i=new Fe(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Hr=r})}nr(e){}containsKey(e,t){const r=new Fe(t,0),s=this.Hr.firstAfterOrEqual(r);return S.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,S.resolve()}ei(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class tP{constructor(e){this.ti=e,this.docs=function(){return new he(L.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,o=this.ti(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return S.resolve(r?r.document.mutableCopy():fe.newInvalidDocument(t))}getEntries(e,t){let r=st();return t.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():fe.newInvalidDocument(s))}),S.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=st();const o=t.path,c=new L(o.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:l,value:{document:d}}=u.getNext();if(!o.isPrefixOf(l.path))break;l.path.length>o.length+1||Tl(Yg(d),r)<=0||(s.has(d.key)||so(t,d))&&(i=i.insert(d.key,d.mutableCopy()))}return S.resolve(i)}getAllFromCollectionGroup(e,t,r,s){j(9500)}ni(e,t){return S.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new nP(this)}getSize(e){return S.resolve(this.size)}}class nP extends Ty{constructor(e){super(),this.Mr=e}applyChanges(e){const t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.Mr.addEntry(e,s)):this.Mr.removeEntry(r)}),S.waitFor(t)}getFromCache(e,t){return this.Mr.getEntry(e,t)}getAllFromCache(e,t){return this.Mr.getEntries(e,t)}}/**
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
 */class rP{constructor(e){this.persistence=e,this.ri=new rn(t=>gr(t),no),this.lastRemoteSnapshotVersion=$.min(),this.highestTargetId=0,this.ii=0,this.si=new Gl,this.targetCount=0,this.oi=wr._r()}forEachTarget(e,t){return this.ri.forEach((r,s)=>t(s)),S.resolve()}getLastRemoteSnapshotVersion(e){return S.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return S.resolve(this.ii)}allocateTargetId(e){return this.highestTargetId=this.oi.next(),S.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.ii&&(this.ii=t),S.resolve()}lr(e){this.ri.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.oi=new wr(t),this.highestTargetId=t),e.sequenceNumber>this.ii&&(this.ii=e.sequenceNumber)}addTargetData(e,t){return this.lr(t),this.targetCount+=1,S.resolve()}updateTargetData(e,t){return this.lr(t),S.resolve()}removeTargetData(e,t){return this.ri.delete(t.target),this.si.Gr(t.targetId),this.targetCount-=1,S.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.ri.forEach((o,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.ri.delete(o),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)}),S.waitFor(i).next(()=>s)}getTargetCount(e){return S.resolve(this.targetCount)}getTargetData(e,t){const r=this.ri.get(t)||null;return S.resolve(r)}addMatchingKeys(e,t,r){return this.si.$r(t,r),S.resolve()}removeMatchingKeys(e,t,r){this.si.Qr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(o=>{i.push(s.markPotentiallyOrphaned(e,o))}),S.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.si.Gr(t),S.resolve()}getMatchingKeysForTargetId(e,t){const r=this.si.jr(t);return S.resolve(r)}containsKey(e,t){return S.resolve(this.si.containsKey(t))}}/**
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
 */class ql{constructor(e,t){this._i={},this.overlays={},this.ai=new nt(0),this.ui=!1,this.ui=!0,this.ci=new ZR,this.referenceDelegate=e(this),this.li=new rP(this),this.indexManager=new GR,this.remoteDocumentCache=function(s){return new tP(s)}(r=>this.referenceDelegate.hi(r)),this.serializer=new hy(t),this.Pi=new YR(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new XR,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this._i[e.toKey()];return r||(r=new eP(t,this.referenceDelegate),this._i[e.toKey()]=r),r}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(e,t,r){V("MemoryPersistence","Starting transaction:",e);const s=new sP(this.ai.next());return this.referenceDelegate.Ti(),r(s).next(i=>this.referenceDelegate.Ei(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Ii(e,t){return S.or(Object.values(this._i).map(r=>()=>r.containsKey(e,t)))}}class sP extends Zg{constructor(e){super(),this.currentSequenceNumber=e}}class cc{constructor(e){this.persistence=e,this.Ri=new Gl,this.Ai=null}static Vi(e){return new cc(e)}get di(){if(this.Ai)return this.Ai;throw j(60996)}addReference(e,t,r){return this.Ri.addReference(r,t),this.di.delete(r.toString()),S.resolve()}removeReference(e,t,r){return this.Ri.removeReference(r,t),this.di.add(r.toString()),S.resolve()}markPotentiallyOrphaned(e,t){return this.di.add(t.toString()),S.resolve()}removeTarget(e,t){this.Ri.Gr(t.targetId).forEach(s=>this.di.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.di.add(i.toString()))}).next(()=>r.removeTargetData(e,t))}Ti(){this.Ai=new Set}Ei(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return S.forEach(this.di,r=>{const s=L.fromPath(r);return this.mi(e,s).next(i=>{i||t.removeEntry(s,$.min())})}).next(()=>(this.Ai=null,t.apply(e)))}updateLimboDocument(e,t){return this.mi(e,t).next(r=>{r?this.di.delete(t.toString()):this.di.add(t.toString())})}hi(e){return 0}mi(e,t){return S.or([()=>S.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ii(e,t)])}}class ba{constructor(e,t){this.persistence=e,this.fi=new rn(r=>He(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=wy(this,t)}static Vi(e,t){return new ba(e,t)}Ti(){}Ei(e){return S.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}dr(e){const t=this.pr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}pr(e){let t=0;return this.mr(e,r=>{t++}).next(()=>t)}mr(e,t){return S.forEach(this.fi,(r,s)=>this.wr(e,r,s).next(i=>i?S.resolve():t(s)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ni(e,o=>this.wr(e,o,t).next(c=>{c||(r++,i.removeEntry(o,$.min()))})).next(()=>i.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.fi.set(t,e.currentSequenceNumber),S.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.fi.set(r,e.currentSequenceNumber),S.resolve()}removeReference(e,t,r){return this.fi.set(r,e.currentSequenceNumber),S.resolve()}updateLimboDocument(e,t){return this.fi.set(t,e.currentSequenceNumber),S.resolve()}hi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Zo(e.data.value)),t}wr(e,t,r){return S.or([()=>this.persistence.Ii(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.fi.get(t);return S.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
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
 */class iP{constructor(e){this.serializer=e}k(e,t,r,s){const i=new Ka("createOrUpgrade",t);r<1&&s>=1&&(function(u){u.createObjectStore(to)}(e),function(u){u.createObjectStore(Li,{keyPath:_S}),u.createObjectStore(_t,{keyPath:Mf,autoIncrement:!0}).createIndex(cr,Ff,{unique:!0}),u.createObjectStore(us)}(e),Rp(e),function(u){u.createObjectStore(rr)}(e));let o=S.resolve();return r<3&&s>=3&&(r!==0&&(function(u){u.deleteObjectStore(hs),u.deleteObjectStore(ls),u.deleteObjectStore(lr)}(e),Rp(e)),o=o.next(()=>function(u){const l=u.store(lr),d={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:$.min().toTimestamp(),targetCount:0};return l.put(ya,d)}(i))),r<4&&s>=4&&(r!==0&&(o=o.next(()=>function(u,l){return l.store(_t).J().next(f=>{u.deleteObjectStore(_t),u.createObjectStore(_t,{keyPath:Mf,autoIncrement:!0}).createIndex(cr,Ff,{unique:!0});const m=l.store(_t),I=f.map(b=>m.put(b));return S.waitFor(I)})}(e,i))),o=o.next(()=>{(function(u){u.createObjectStore(ds,{keyPath:SS})})(e)})),r<5&&s>=5&&(o=o.next(()=>this.gi(i))),r<6&&s>=6&&(o=o.next(()=>(function(u){u.createObjectStore(Mi)}(e),this.pi(i)))),r<7&&s>=7&&(o=o.next(()=>this.yi(i))),r<8&&s>=8&&(o=o.next(()=>this.wi(e,i))),r<9&&s>=9&&(o=o.next(()=>{(function(u){u.objectStoreNames.contains("remoteDocumentChanges")&&u.deleteObjectStore("remoteDocumentChanges")})(e)})),r<10&&s>=10&&(o=o.next(()=>this.Si(i))),r<11&&s>=11&&(o=o.next(()=>{(function(u){u.createObjectStore(Qa,{keyPath:RS})})(e),function(u){u.createObjectStore(Ja,{keyPath:PS})}(e)})),r<12&&s>=12&&(o=o.next(()=>{(function(u){const l=u.createObjectStore(Ya,{keyPath:OS});l.createIndex(Du,LS,{unique:!1}),l.createIndex(a_,MS,{unique:!1})})(e)})),r<13&&s>=13&&(o=o.next(()=>function(u){const l=u.createObjectStore(_a,{keyPath:IS});l.createIndex(Yo,ES),l.createIndex(r_,wS)}(e)).next(()=>this.bi(e,i)).next(()=>e.deleteObjectStore(rr))),r<14&&s>=14&&(o=o.next(()=>this.Di(e,i))),r<15&&s>=15&&(o=o.next(()=>function(u){u.createObjectStore(bl,{keyPath:xS,autoIncrement:!0}).createIndex(Cu,CS,{unique:!1}),u.createObjectStore(Ti,{keyPath:DS}).createIndex(i_,kS,{unique:!1}),u.createObjectStore(Ai,{keyPath:NS}).createIndex(o_,VS,{unique:!1})}(e))),r<16&&s>=16&&(o=o.next(()=>{t.objectStore(Ti).clear()}).next(()=>{t.objectStore(Ai).clear()})),r<17&&s>=17&&(o=o.next(()=>{(function(u){u.createObjectStore(Sl,{keyPath:FS})})(e)})),r<18&&s>=18&&Lm()&&(o=o.next(()=>{t.objectStore(Ti).clear()}).next(()=>{t.objectStore(Ai).clear()})),o}pi(e){let t=0;return e.store(rr).ee((r,s)=>{t+=va(s)}).next(()=>{const r={byteSize:t};return e.store(Mi).put(xu,r)})}gi(e){const t=e.store(Li),r=e.store(_t);return t.J().next(s=>S.forEach(s,i=>{const o=IDBKeyRange.bound([i.userId,Cn],[i.userId,i.lastAcknowledgedBatchId]);return r.J(cr,o).next(c=>S.forEach(c,u=>{q(u.userId===i.userId,18650,"Cannot process batch from unexpected user",{batchId:u.batchId});const l=ir(this.serializer,u);return gy(e,i.userId,l).next(()=>{})}))}))}yi(e){const t=e.store(hs),r=e.store(rr);return e.store(lr).get(ya).next(s=>{const i=[];return r.ee((o,c)=>{const u=new Z(o),l=function(f){return[0,He(f)]}(u);i.push(t.get(l).next(d=>d?S.resolve():(f=>t.put({targetId:0,path:He(f),sequenceNumber:s.highestListenSequenceNumber}))(u)))}).next(()=>S.waitFor(i))})}wi(e,t){e.createObjectStore(Fi,{keyPath:bS});const r=t.store(Fi),s=new jl,i=o=>{if(s.add(o)){const c=o.lastSegment(),u=o.popLast();return r.put({collectionId:c,parent:He(u)})}};return t.store(rr).ee({Y:!0},(o,c)=>{const u=new Z(o);return i(u.popLast())}).next(()=>t.store(us).ee({Y:!0},([o,c,u],l)=>{const d=Ct(c);return i(d.popLast())}))}Si(e){const t=e.store(ls);return t.ee((r,s)=>{const i=yi(s),o=dy(this.serializer,i);return t.put(o)})}bi(e,t){const r=t.store(rr),s=[];return r.ee((i,o)=>{const c=t.store(_a),u=function(f){return f.document?new L(Z.fromString(f.document.name).popFirst(5)):f.noDocument?L.fromSegments(f.noDocument.path):f.unknownDocument?L.fromSegments(f.unknownDocument.path):j(36783)}(o).path.toArray(),l={prefixPath:u.slice(0,u.length-2),collectionGroup:u[u.length-2],documentId:u[u.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};s.push(c.put(l))}).next(()=>S.waitFor(s))}Di(e,t){const r=t.store(_t),s=Ay(this.serializer),i=new ql(cc.Vi,this.serializer.yt);return r.J().next(o=>{const c=new Map;return o.forEach(u=>{let l=c.get(u.userId)??J();ir(this.serializer,u).keys().forEach(d=>l=l.add(d)),c.set(u.userId,l)}),S.forEach(c,(u,l)=>{const d=new Ue(l),f=oc.wt(this.serializer,d),m=i.getIndexManager(d),I=ac.wt(d,this.serializer,m,i.referenceDelegate);return new vy(s,I,f,m).recalculateAndSaveOverlaysForDocumentKeys(new ku(t,nt.ce),u).next()})})}}function Rp(n){n.createObjectStore(hs,{keyPath:AS}).createIndex(vl,vS,{unique:!0}),n.createObjectStore(ls,{keyPath:"targetId"}).createIndex(s_,TS,{unique:!0}),n.createObjectStore(lr)}const gn="IndexedDbPersistence",tu=18e5,nu=5e3,ru="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",by="main";class $l{constructor(e,t,r,s,i,o,c,u,l,d,f=18){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=r,this.Ci=i,this.window=o,this.document=c,this.Fi=l,this.Mi=d,this.xi=f,this.ai=null,this.ui=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Oi=null,this.inForeground=!1,this.Ni=null,this.Bi=null,this.Li=Number.NEGATIVE_INFINITY,this.ki=m=>Promise.resolve(),!$l.v())throw new N(C.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new HR(this,s),this.qi=t+by,this.serializer=new hy(u),this.Ki=new Lt(this.qi,this.xi,new iP(this.serializer)),this.ci=new LR,this.li=new $R(this.referenceDelegate,this.serializer),this.remoteDocumentCache=Ay(this.serializer),this.Pi=new OR,this.window&&this.window.localStorage?this.Ui=this.window.localStorage:(this.Ui=null,d===!1&&ve(gn,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.$i().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new N(C.FAILED_PRECONDITION,ru);return this.Wi(),this.Qi(),this.Gi(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.li.getHighestSequenceNumber(e))}).then(e=>{this.ai=new nt(e,this.Fi)}).then(()=>{this.ui=!0}).catch(e=>(this.Ki&&this.Ki.close(),Promise.reject(e)))}zi(e){return this.ki=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.Ki.K(async t=>{t.newVersion===null&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Ci.enqueueAndForget(async()=>{this.started&&await this.$i()}))}$i(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>Bo(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.ji(e).next(t=>{t||(this.isPrimary=!1,this.Ci.enqueueRetryable(()=>this.ki(!1)))})}).next(()=>this.Ji(e)).next(t=>this.isPrimary&&!t?this.Hi(e).next(()=>!1):!!t&&this.Zi(e).next(()=>!0))).catch(e=>{if(Gn(e))return V(gn,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return V(gn,"Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.Ci.enqueueRetryable(()=>this.ki(e)),this.isPrimary=e})}ji(e){return li(e).get(Mr).next(t=>S.resolve(this.Xi(t)))}Yi(e){return Bo(e).delete(this.clientId)}async es(){if(this.isPrimary&&!this.ts(this.Li,tu)){this.Li=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",t=>{const r=Oe(t,ds);return r.J().next(s=>{const i=this.ns(s,tu),o=s.filter(c=>i.indexOf(c)===-1);return S.forEach(o,c=>r.delete(c.clientId)).next(()=>o)})}).catch(()=>[]);if(this.Ui)for(const t of e)this.Ui.removeItem(this.rs(t.clientId))}}Gi(){this.Bi=this.Ci.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.$i().then(()=>this.es()).then(()=>this.Gi()))}Xi(e){return!!e&&e.ownerId===this.clientId}Ji(e){return this.Mi?S.resolve(!0):li(e).get(Mr).next(t=>{if(t!==null&&this.ts(t.leaseTimestampMs,nu)&&!this.ss(t.ownerId)){if(this.Xi(t)&&this.networkEnabled)return!0;if(!this.Xi(t)){if(!t.allowTabSynchronization)throw new N(C.FAILED_PRECONDITION,ru);return!1}}return!(!this.networkEnabled||!this.inForeground)||Bo(e).J().next(r=>this.ns(r,nu).find(s=>{if(this.clientId!==s.clientId){const i=!this.networkEnabled&&s.networkEnabled,o=!this.inForeground&&s.inForeground,c=this.networkEnabled===s.networkEnabled;if(i||o&&c)return!0}return!1})===void 0)}).next(t=>(this.isPrimary!==t&&V(gn,`Client ${t?"is":"is not"} eligible for a primary lease.`),t))}async shutdown(){this.ui=!1,this._s(),this.Bi&&(this.Bi.cancel(),this.Bi=null),this.us(),this.cs(),await this.Ki.runTransaction("shutdown","readwrite",[to,ds],e=>{const t=new ku(e,nt.ce);return this.Hi(t).next(()=>this.Yi(t))}),this.Ki.close(),this.ls()}ns(e,t){return e.filter(r=>this.ts(r.updateTimeMs,t)&&!this.ss(r.clientId))}hs(){return this.runTransaction("getActiveClients","readonly",e=>Bo(e).J().next(t=>this.ns(t,tu).map(r=>r.clientId)))}get started(){return this.ui}getGlobalsCache(){return this.ci}getMutationQueue(e,t){return ac.wt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new qR(e,this.serializer.yt.databaseId)}getDocumentOverlayCache(e){return oc.wt(this.serializer,e)}getBundleCache(){return this.Pi}runTransaction(e,t,r){V(gn,"Starting transaction:",e);const s=t==="readonly"?"readonly":"readwrite",i=function(u){return u===18?jS:u===17?h_:u===16?BS:u===15?Rl:u===14?l_:u===13?u_:u===12?US:u===11?c_:void j(60245)}(this.xi);let o;return this.Ki.runTransaction(e,s,i,c=>(o=new ku(c,this.ai?this.ai.next():nt.ce),t==="readwrite-primary"?this.ji(o).next(u=>!!u||this.Ji(o)).next(u=>{if(!u)throw ve(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Ci.enqueueRetryable(()=>this.ki(!1)),new N(C.FAILED_PRECONDITION,Xg);return r(o)}).next(u=>this.Zi(o).next(()=>u)):this.Ps(o).next(()=>r(o)))).then(c=>(o.raiseOnCommittedEvent(),c))}Ps(e){return li(e).get(Mr).next(t=>{if(t!==null&&this.ts(t.leaseTimestampMs,nu)&&!this.ss(t.ownerId)&&!this.Xi(t)&&!(this.Mi||this.allowTabSynchronization&&t.allowTabSynchronization))throw new N(C.FAILED_PRECONDITION,ru)})}Zi(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return li(e).put(Mr,t)}static v(){return Lt.v()}Hi(e){const t=li(e);return t.get(Mr).next(r=>this.Xi(r)?(V(gn,"Releasing primary lease."),t.delete(Mr)):S.resolve())}ts(e,t){const r=Date.now();return!(e<r-t)&&(!(e>r)||(ve(`Detected an update time that is in the future: ${e} > ${r}`),!1))}Wi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ni=()=>{this.Ci.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.$i()))},this.document.addEventListener("visibilitychange",this.Ni),this.inForeground=this.document.visibilityState==="visible")}us(){this.Ni&&(this.document.removeEventListener("visibilitychange",this.Ni),this.Ni=null)}Qi(){var e;typeof((e=this.window)==null?void 0:e.addEventListener)=="function"&&(this.Oi=()=>{this._s();const t=/(?:Version|Mobile)\/1[456]/;Om()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.Ci.enterRestrictedMode(!0),this.Ci.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Oi))}cs(){this.Oi&&(this.window.removeEventListener("pagehide",this.Oi),this.Oi=null)}ss(e){var t;try{const r=((t=this.Ui)==null?void 0:t.getItem(this.rs(e)))!==null;return V(gn,`Client '${e}' ${r?"is":"is not"} zombied in LocalStorage`),r}catch(r){return ve(gn,"Failed to get zombied client id.",r),!1}}_s(){if(this.Ui)try{this.Ui.setItem(this.rs(this.clientId),String(Date.now()))}catch(e){ve("Failed to set zombie client id.",e)}}ls(){if(this.Ui)try{this.Ui.removeItem(this.rs(this.clientId))}catch{}}rs(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function li(n){return Oe(n,to)}function Bo(n){return Oe(n,ds)}function zl(n,e){let t=n.projectId;return n.isDefaultDatabase||(t+="."+n.database),"firestore/"+e+"/"+t+"/"}/**
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
 */class Wl{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Ts=r,this.Es=s}static Is(e,t){let r=J(),s=J();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new Wl(e,t.fromCache,r,s)}}/**
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
 */class oP{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class Sy{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=function(){return Om()?8:e_(Ne())>0?6:4}()}initialize(e,t){this.fs=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.gs(e,t).next(o=>{i.result=o}).next(()=>{if(!i.result)return this.ps(e,t,s,r).next(o=>{i.result=o})}).next(()=>{if(i.result)return;const o=new oP;return this.ys(e,t,o).next(c=>{if(i.result=c,this.As)return this.ws(e,t,o,c.size)})}).next(()=>i.result)}ws(e,t,r,s){return r.documentReadCount<this.Vs?(qr()<=te.DEBUG&&V("QueryEngine","SDK will not create cache indexes for query:",$r(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),S.resolve()):(qr()<=te.DEBUG&&V("QueryEngine","Query:",$r(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.ds*s?(qr()<=te.DEBUG&&V("QueryEngine","The SDK decides to create cache indexes for query:",$r(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Ke(t))):S.resolve())}gs(e,t){if(Yf(t))return S.resolve(null);let r=Ke(t);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=wa(t,null,"F"),r=Ke(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const o=J(...i);return this.fs.getDocuments(e,o).next(c=>this.indexManager.getMinOffset(e,r).next(u=>{const l=this.Ss(t,c);return this.bs(t,l,o,u.readTime)?this.gs(e,wa(t,null,"F")):this.Ds(e,l,t,u)}))})))}ps(e,t,r,s){return Yf(t)||s.isEqual($.min())?S.resolve(null):this.fs.getDocuments(e,r).next(i=>{const o=this.Ss(t,i);return this.bs(t,o,r,s)?S.resolve(null):(qr()<=te.DEBUG&&V("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),$r(t)),this.Ds(e,o,t,Jg(s,os)).next(c=>c))})}Ss(e,t){let r=new ce(O_(e));return t.forEach((s,i)=>{so(e,i)&&(r=r.add(i))}),r}bs(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}ys(e,t,r){return qr()<=te.DEBUG&&V("QueryEngine","Using full collection scan to execute query:",$r(t)),this.fs.getDocumentsMatchingQuery(e,t,pt.min(),r)}Ds(e,t,r,s){return this.fs.getDocumentsMatchingQuery(e,r,s).next(i=>(t.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
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
 */const Hl="LocalStore",aP=3e8;class cP{constructor(e,t,r,s){this.persistence=e,this.Cs=t,this.serializer=s,this.vs=new he(K),this.Fs=new rn(i=>gr(i),no),this.Ms=new Map,this.xs=e.getRemoteDocumentCache(),this.li=e.getTargetCache(),this.Pi=e.getBundleCache(),this.Os(r)}Os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new vy(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.vs))}}function Ry(n,e,t,r){return new cP(n,e,t,r)}async function Py(n,e){const t=M(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,t.Os(e),t.mutationQueue.getAllMutationBatches(r))).next(i=>{const o=[],c=[];let u=J();for(const l of s){o.push(l.batchId);for(const d of l.mutations)u=u.add(d.key)}for(const l of i){c.push(l.batchId);for(const d of l.mutations)u=u.add(d.key)}return t.localDocuments.getDocuments(r,u).next(l=>({Ns:l,removedBatchIds:o,addedBatchIds:c}))})})}function uP(n,e){const t=M(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=t.xs.newChangeBuffer({trackRemovals:!0});return function(c,u,l,d){const f=l.batch,m=f.keys();let I=S.resolve();return m.forEach(b=>{I=I.next(()=>d.getEntry(u,b)).next(x=>{const D=l.docVersions.get(b);q(D!==null,48541),x.version.compareTo(D)<0&&(f.applyToRemoteDocument(x,l),x.isValidDocument()&&(x.setReadTime(l.commitVersion),d.addEntry(x)))})}),I.next(()=>c.mutationQueue.removeMutationBatch(u,f))}(t,r,e,i).next(()=>i.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let u=J();for(let l=0;l<c.mutationResults.length;++l)c.mutationResults[l].transformResults.length>0&&(u=u.add(c.batch.mutations[l].key));return u}(e))).next(()=>t.localDocuments.getDocuments(r,s))})}function xy(n){const e=M(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.li.getLastRemoteSnapshotVersion(t))}function lP(n,e){const t=M(n),r=e.snapshotVersion;let s=t.vs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=t.xs.newChangeBuffer({trackRemovals:!0});s=t.vs;const c=[];e.targetChanges.forEach((d,f)=>{const m=s.get(f);if(!m)return;c.push(t.li.removeMatchingKeys(i,d.removedDocuments,f).next(()=>t.li.addMatchingKeys(i,d.addedDocuments,f)));let I=m.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(f)!==null?I=I.withResumeToken(Ie.EMPTY_BYTE_STRING,$.min()).withLastLimboFreeSnapshotVersion($.min()):d.resumeToken.approximateByteSize()>0&&(I=I.withResumeToken(d.resumeToken,r)),s=s.insert(f,I),function(x,D,O){return x.resumeToken.approximateByteSize()===0||D.snapshotVersion.toMicroseconds()-x.snapshotVersion.toMicroseconds()>=aP?!0:O.addedDocuments.size+O.modifiedDocuments.size+O.removedDocuments.size>0}(m,I,d)&&c.push(t.li.updateTargetData(i,I))});let u=st(),l=J();if(e.documentUpdates.forEach(d=>{e.resolvedLimboDocuments.has(d)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,d))}),c.push(Cy(i,o,e.documentUpdates).next(d=>{u=d.Bs,l=d.Ls})),!r.isEqual($.min())){const d=t.li.getLastRemoteSnapshotVersion(i).next(f=>t.li.setTargetsMetadata(i,i.currentSequenceNumber,r));c.push(d)}return S.waitFor(c).next(()=>o.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,u,l)).next(()=>u)}).then(i=>(t.vs=s,i))}function Cy(n,e,t){let r=J(),s=J();return t.forEach(i=>r=r.add(i)),e.getEntries(n,r).next(i=>{let o=st();return t.forEach((c,u)=>{const l=i.get(c);u.isFoundDocument()!==l.isFoundDocument()&&(s=s.add(c)),u.isNoDocument()&&u.version.isEqual($.min())?(e.removeEntry(c,u.readTime),o=o.insert(c,u)):!l.isValidDocument()||u.version.compareTo(l.version)>0||u.version.compareTo(l.version)===0&&l.hasPendingWrites?(e.addEntry(u),o=o.insert(c,u)):V(Hl,"Ignoring outdated watch update for ",c,". Current version:",l.version," Watch version:",u.version)}),{Bs:o,Ls:s}})}function hP(n,e){const t=M(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=Cn),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function Is(n,e){const t=M(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return t.li.getTargetData(r,e).next(i=>i?(s=i,S.resolve(s)):t.li.allocateTargetId(r).next(o=>(s=new $t(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.li.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=t.vs.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.vs=t.vs.insert(r.targetId,r),t.Fs.set(e,r.targetId)),r})}async function Es(n,e,t){const r=M(n),s=r.vs.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,o=>r.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!Gn(o))throw o;V(Hl,`Failed to update sequence numbers for target ${e}: ${o}`)}r.vs=r.vs.remove(e),r.Fs.delete(s.target)}function Sa(n,e,t){const r=M(n);let s=$.min(),i=J();return r.persistence.runTransaction("Execute query","readwrite",o=>function(u,l,d){const f=M(u),m=f.Fs.get(d);return m!==void 0?S.resolve(f.vs.get(m)):f.li.getTargetData(l,d)}(r,o,Ke(e)).next(c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.li.getMatchingKeysForTargetId(o,c.targetId).next(u=>{i=u})}).next(()=>r.Cs.getDocumentsMatchingQuery(o,e,t?s:$.min(),t?i:J())).next(c=>(Ny(r,V_(e),c),{documents:c,ks:i})))}function Dy(n,e){const t=M(n),r=M(t.li),s=t.vs.get(e);return s?Promise.resolve(s.target):t.persistence.runTransaction("Get target data","readonly",i=>r.At(i,e).next(o=>o?o.target:null))}function ky(n,e){const t=M(n),r=t.Ms.get(e)||$.min();return t.persistence.runTransaction("Get new document changes","readonly",s=>t.xs.getAllFromCollectionGroup(s,e,Jg(r,os),Number.MAX_SAFE_INTEGER)).then(s=>(Ny(t,e,s),s))}function Ny(n,e,t){let r=n.Ms.get(e)||$.min();t.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),n.Ms.set(e,r)}async function dP(n,e,t,r){const s=M(n);let i=J(),o=st();for(const l of t){const d=e.qs(l.metadata.name);l.document&&(i=i.add(d));const f=e.Ks(l);f.setReadTime(e.Us(l.metadata.readTime)),o=o.insert(d,f)}const c=s.xs.newChangeBuffer({trackRemovals:!0}),u=await Is(s,function(d){return Ke(Ds(Z.fromString(`__bundle__/docs/${d}`)))}(r));return s.persistence.runTransaction("Apply bundle documents","readwrite",l=>Cy(l,c,o).next(d=>(c.apply(l),d)).next(d=>s.li.removeMatchingKeysForTargetId(l,u.targetId).next(()=>s.li.addMatchingKeys(l,i,u.targetId)).next(()=>s.localDocuments.getLocalViewOfDocuments(l,d.Bs,d.Ls)).next(()=>d.Bs)))}async function fP(n,e,t=J()){const r=await Is(n,Ke(ic(e.bundledQuery))),s=M(n);return s.persistence.runTransaction("Save named query","readwrite",i=>{const o=be(e.readTime);if(r.snapshotVersion.compareTo(o)>=0)return s.Pi.saveNamedQuery(i,e);const c=r.withResumeToken(Ie.EMPTY_BYTE_STRING,o);return s.vs=s.vs.insert(c.targetId,c),s.li.updateTargetData(i,c).next(()=>s.li.removeMatchingKeysForTargetId(i,r.targetId)).next(()=>s.li.addMatchingKeys(i,t,r.targetId)).next(()=>s.Pi.saveNamedQuery(i,e))})}/**
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
 */const Vy="firestore_clients";function Pp(n,e){return`${Vy}_${n}_${e}`}const Oy="firestore_mutations";function xp(n,e,t){let r=`${Oy}_${n}_${t}`;return e.isAuthenticated()&&(r+=`_${e.uid}`),r}const Ly="firestore_targets";function su(n,e){return`${Ly}_${n}_${e}`}/**
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
 */const xt="SharedClientState";class Ra{constructor(e,t,r,s){this.user=e,this.batchId=t,this.state=r,this.error=s}static $s(e,t,r){const s=JSON.parse(r);let i,o=typeof s=="object"&&["pending","acknowledged","rejected"].indexOf(s.state)!==-1&&(s.error===void 0||typeof s.error=="object");return o&&s.error&&(o=typeof s.error.message=="string"&&typeof s.error.code=="string",o&&(i=new N(s.error.code,s.error.message))),o?new Ra(e,t,s.state,i):(ve(xt,`Failed to parse mutation state for ID '${t}': ${r}`),null)}Ws(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class Pi{constructor(e,t,r){this.targetId=e,this.state=t,this.error=r}static $s(e,t){const r=JSON.parse(t);let s,i=typeof r=="object"&&["not-current","current","rejected"].indexOf(r.state)!==-1&&(r.error===void 0||typeof r.error=="object");return i&&r.error&&(i=typeof r.error.message=="string"&&typeof r.error.code=="string",i&&(s=new N(r.error.code,r.error.message))),i?new Pi(e,r.state,s):(ve(xt,`Failed to parse target state for ID '${e}': ${t}`),null)}Ws(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class Pa{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static $s(e,t){const r=JSON.parse(t);let s=typeof r=="object"&&r.activeTargetIds instanceof Array,i=kl();for(let o=0;s&&o<r.activeTargetIds.length;++o)s=t_(r.activeTargetIds[o]),i=i.add(r.activeTargetIds[o]);return s?new Pa(e,i):(ve(xt,`Failed to parse client data for instance '${e}': ${t}`),null)}}class Kl{constructor(e,t){this.clientId=e,this.onlineState=t}static $s(e){const t=JSON.parse(e);return typeof t=="object"&&["Unknown","Online","Offline"].indexOf(t.onlineState)!==-1&&typeof t.clientId=="string"?new Kl(t.clientId,t.onlineState):(ve(xt,`Failed to parse online state: ${e}`),null)}}class Wu{constructor(){this.activeTargetIds=kl()}Qs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class iu{constructor(e,t,r,s,i){this.window=e,this.Ci=t,this.persistenceKey=r,this.zs=s,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.js=this.Js.bind(this),this.Hs=new he(K),this.started=!1,this.Zs=[];const o=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=i,this.Xs=Pp(this.persistenceKey,this.zs),this.Ys=function(u){return`firestore_sequence_number_${u}`}(this.persistenceKey),this.Hs=this.Hs.insert(this.zs,new Wu),this.eo=new RegExp(`^${Vy}_${o}_([^_]*)$`),this.no=new RegExp(`^${Oy}_${o}_(\\d+)(?:_(.*))?$`),this.ro=new RegExp(`^${Ly}_${o}_(\\d+)$`),this.io=function(u){return`firestore_online_state_${u}`}(this.persistenceKey),this.so=function(u){return`firestore_bundle_loaded_v2_${u}`}(this.persistenceKey),this.window.addEventListener("storage",this.js)}static v(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.hs();for(const r of e){if(r===this.zs)continue;const s=this.getItem(Pp(this.persistenceKey,r));if(s){const i=Pa.$s(r,s);i&&(this.Hs=this.Hs.insert(i.clientId,i))}}this.oo();const t=this.storage.getItem(this.io);if(t){const r=this._o(t);r&&this.ao(r)}for(const r of this.Zs)this.Js(r);this.Zs=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(e){this.setItem(this.Ys,JSON.stringify(e))}getAllActiveQueryTargets(){return this.uo(this.Hs)}isActiveQueryTarget(e){let t=!1;return this.Hs.forEach((r,s)=>{s.activeTargetIds.has(e)&&(t=!0)}),t}addPendingMutation(e){this.co(e,"pending")}updateMutationState(e,t,r){this.co(e,t,r),this.lo(e)}addLocalQueryTarget(e,t=!0){let r="not-current";if(this.isActiveQueryTarget(e)){const s=this.storage.getItem(su(this.persistenceKey,e));if(s){const i=Pi.$s(e,s);i&&(r=i.state)}}return t&&this.ho.Qs(e),this.oo(),r}removeLocalQueryTarget(e){this.ho.Gs(e),this.oo()}isLocalQueryTarget(e){return this.ho.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(su(this.persistenceKey,e))}updateQueryState(e,t,r){this.Po(e,t,r)}handleUserChange(e,t,r){t.forEach(s=>{this.lo(s)}),this.currentUser=e,r.forEach(s=>{this.addPendingMutation(s)})}setOnlineState(e){this.To(e)}notifyBundleLoaded(e){this.Eo(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.js),this.removeItem(this.Xs),this.started=!1)}getItem(e){const t=this.storage.getItem(e);return V(xt,"READ",e,t),t}setItem(e,t){V(xt,"SET",e,t),this.storage.setItem(e,t)}removeItem(e){V(xt,"REMOVE",e),this.storage.removeItem(e)}Js(e){const t=e;if(t.storageArea===this.storage){if(V(xt,"EVENT",t.key,t.newValue),t.key===this.Xs)return void ve("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.Ci.enqueueRetryable(async()=>{if(this.started){if(t.key!==null){if(this.eo.test(t.key)){if(t.newValue==null){const r=this.Io(t.key);return this.Ro(r,null)}{const r=this.Ao(t.key,t.newValue);if(r)return this.Ro(r.clientId,r)}}else if(this.no.test(t.key)){if(t.newValue!==null){const r=this.Vo(t.key,t.newValue);if(r)return this.mo(r)}}else if(this.ro.test(t.key)){if(t.newValue!==null){const r=this.fo(t.key,t.newValue);if(r)return this.po(r)}}else if(t.key===this.io){if(t.newValue!==null){const r=this._o(t.newValue);if(r)return this.ao(r)}}else if(t.key===this.Ys){const r=function(i){let o=nt.ce;if(i!=null)try{const c=JSON.parse(i);q(typeof c=="number",30636,{yo:i}),o=c}catch(c){ve(xt,"Failed to read sequence number from WebStorage",c)}return o}(t.newValue);r!==nt.ce&&this.sequenceNumberHandler(r)}else if(t.key===this.so){const r=this.wo(t.newValue);await Promise.all(r.map(s=>this.syncEngine.So(s)))}}}else this.Zs.push(t)})}}get ho(){return this.Hs.get(this.zs)}oo(){this.setItem(this.Xs,this.ho.Ws())}co(e,t,r){const s=new Ra(this.currentUser,e,t,r),i=xp(this.persistenceKey,this.currentUser,e);this.setItem(i,s.Ws())}lo(e){const t=xp(this.persistenceKey,this.currentUser,e);this.removeItem(t)}To(e){const t={clientId:this.zs,onlineState:e};this.storage.setItem(this.io,JSON.stringify(t))}Po(e,t,r){const s=su(this.persistenceKey,e),i=new Pi(e,t,r);this.setItem(s,i.Ws())}Eo(e){const t=JSON.stringify(Array.from(e));this.setItem(this.so,t)}Io(e){const t=this.eo.exec(e);return t?t[1]:null}Ao(e,t){const r=this.Io(e);return Pa.$s(r,t)}Vo(e,t){const r=this.no.exec(e),s=Number(r[1]),i=r[2]!==void 0?r[2]:null;return Ra.$s(new Ue(i),s,t)}fo(e,t){const r=this.ro.exec(e),s=Number(r[1]);return Pi.$s(s,t)}_o(e){return Kl.$s(e)}wo(e){return JSON.parse(e)}async mo(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.bo(e.batchId,e.state,e.error);V(xt,`Ignoring mutation for non-active user ${e.user.uid}`)}po(e){return this.syncEngine.Do(e.targetId,e.state,e.error)}Ro(e,t){const r=t?this.Hs.insert(e,t):this.Hs.remove(e),s=this.uo(this.Hs),i=this.uo(r),o=[],c=[];return i.forEach(u=>{s.has(u)||o.push(u)}),s.forEach(u=>{i.has(u)||c.push(u)}),this.syncEngine.Co(o,c).then(()=>{this.Hs=r})}ao(e){this.Hs.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}uo(e){let t=kl();return e.forEach((r,s)=>{t=t.unionWith(s.activeTargetIds)}),t}}class My{constructor(){this.vo=new Wu,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.vo.Qs(e),this.Fo[e]||"not-current"}updateQueryState(e,t,r){this.Fo[e]=t}removeLocalQueryTarget(e){this.vo.Gs(e)}isLocalQueryTarget(e){return this.vo.activeTargetIds.has(e)}clearQueryState(e){delete this.Fo[e]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(e){return this.vo.activeTargetIds.has(e)}start(){return this.vo=new Wu,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class pP{Mo(e){}shutdown(){}}/**
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
 */const Cp="ConnectivityMonitor";class Dp{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(e){this.Lo.push(e)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){V(Cp,"Network connectivity changed: AVAILABLE");for(const e of this.Lo)e(0)}Bo(){V(Cp,"Network connectivity changed: UNAVAILABLE");for(const e of this.Lo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let jo=null;function Hu(){return jo===null?jo=function(){return 268435456+Math.round(2147483648*Math.random())}():jo++,"0x"+jo.toString(16)}/**
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
 */const ou="RestConnection",mP={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class gP{get qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Ko=t+"://"+e.host,this.Uo=`projects/${r}/databases/${s}`,this.$o=this.databaseId.database===Bi?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Wo(e,t,r,s,i){const o=Hu(),c=this.Qo(e,t.toUriEncodedString());V(ou,`Sending RPC '${e}' ${o}:`,c,r);const u={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(u,s,i);const{host:l}=new URL(c),d=Bt(l);return this.zo(e,c,u,r,d).then(f=>(V(ou,`Received RPC '${e}' ${o}: `,f),f),f=>{throw ct(ou,`RPC '${e}' ${o} failed with error: `,f,"url: ",c,"request:",r),f})}jo(e,t,r,s,i,o){return this.Wo(e,t,r,s,i)}Go(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Cs}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s)}Qo(e,t){const r=mP[e];let s=`${this.Ko}/v1/${t}:${r}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
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
 */class _P{constructor(e){this.Jo=e.Jo,this.Ho=e.Ho}Zo(e){this.Xo=e}Yo(e){this.e_=e}t_(e){this.n_=e}onMessage(e){this.r_=e}close(){this.Ho()}send(e){this.Jo(e)}i_(){this.Xo()}s_(){this.e_()}o_(e){this.n_(e)}__(e){this.r_(e)}}/**
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
 */const ze="WebChannelConnection",hi=(n,e,t)=>{n.listen(e,r=>{try{t(r)}catch(s){setTimeout(()=>{throw s},0)}})};class Zr extends gP{constructor(e){super(e),this.a_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static u_(){if(!Zr.c_){const e=jg();hi(e,Bg.STAT_EVENT,t=>{t.stat===vu.PROXY?V(ze,"STAT_EVENT: detected buffering proxy"):t.stat===vu.NOPROXY&&V(ze,"STAT_EVENT: detected no buffering proxy")}),Zr.c_=!0}}zo(e,t,r,s,i){const o=Hu();return new Promise((c,u)=>{const l=new Fg;l.setWithCredentials(!0),l.listenOnce(Ug.COMPLETE,()=>{try{switch(l.getLastErrorCode()){case Qo.NO_ERROR:const f=l.getResponseJson();V(ze,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(f)),c(f);break;case Qo.TIMEOUT:V(ze,`RPC '${e}' ${o} timed out`),u(new N(C.DEADLINE_EXCEEDED,"Request time out"));break;case Qo.HTTP_ERROR:const m=l.getStatus();if(V(ze,`RPC '${e}' ${o} failed with status:`,m,"response text:",l.getResponseText()),m>0){let I=l.getResponseJson();Array.isArray(I)&&(I=I[0]);const b=I==null?void 0:I.error;if(b&&b.status&&b.message){const x=function(O){const B=O.toLowerCase().replace(/_/g,"-");return Object.values(C).indexOf(B)>=0?B:C.UNKNOWN}(b.status);u(new N(x,b.message))}else u(new N(C.UNKNOWN,"Server responded with status "+l.getStatus()))}else u(new N(C.UNAVAILABLE,"Connection failed."));break;default:j(9055,{l_:e,streamId:o,h_:l.getLastErrorCode(),P_:l.getLastError()})}}finally{V(ze,`RPC '${e}' ${o} completed.`)}});const d=JSON.stringify(s);V(ze,`RPC '${e}' ${o} sending request:`,s),l.send(t,"POST",d,r,15)})}T_(e,t,r){const s=Hu(),i=[this.Ko,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=this.createWebChannelTransport(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(c.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Go(c.initMessageHeaders,t,r),c.encodeInitMessageHeaders=!0;const l=i.join("");V(ze,`Creating RPC '${e}' stream ${s}: ${l}`,c);const d=o.createWebChannel(l,c);this.E_(d);let f=!1,m=!1;const I=new _P({Jo:b=>{m?V(ze,`Not sending because RPC '${e}' stream ${s} is closed:`,b):(f||(V(ze,`Opening RPC '${e}' stream ${s} transport.`),d.open(),f=!0),V(ze,`RPC '${e}' stream ${s} sending:`,b),d.send(b))},Ho:()=>d.close()});return hi(d,mi.EventType.OPEN,()=>{m||(V(ze,`RPC '${e}' stream ${s} transport opened.`),I.i_())}),hi(d,mi.EventType.CLOSE,()=>{m||(m=!0,V(ze,`RPC '${e}' stream ${s} transport closed`),I.o_(),this.I_(d))}),hi(d,mi.EventType.ERROR,b=>{m||(m=!0,ct(ze,`RPC '${e}' stream ${s} transport errored. Name:`,b.name,"Message:",b.message),I.o_(new N(C.UNAVAILABLE,"The operation could not be completed")))}),hi(d,mi.EventType.MESSAGE,b=>{var x;if(!m){const D=b.data[0];q(!!D,16349);const O=D,B=(O==null?void 0:O.error)||((x=O[0])==null?void 0:x.error);if(B){V(ze,`RPC '${e}' stream ${s} received error:`,B);const U=B.status;let z=function(T){const y=Se[T];if(y!==void 0)return Q_(y)}(U),W=B.message;U==="NOT_FOUND"&&W.includes("database")&&W.includes("does not exist")&&W.includes(this.databaseId.database)&&ct(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),z===void 0&&(z=C.INTERNAL,W="Unknown error status: "+U+" with message "+B.message),m=!0,I.o_(new N(z,W)),d.close()}else V(ze,`RPC '${e}' stream ${s} received:`,D),I.__(D)}}),Zr.u_(),setTimeout(()=>{I.s_()},0),I}terminate(){this.a_.forEach(e=>e.close()),this.a_=[]}E_(e){this.a_.push(e)}I_(e){this.a_=this.a_.filter(t=>t===e)}Go(e,t,r){super.Go(e,t,r),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return Gg()}}/**
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
 */function yP(n){return new Zr(n)}/**
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
 */function Fy(){return typeof window<"u"?window:null}function sa(){return typeof document<"u"?document:null}/**
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
 */function Rr(n){return new vR(n,!0)}/**
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
 */Zr.c_=!1;class Ql{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Ci=e,this.timerId=t,this.R_=r,this.A_=s,this.V_=i,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();const t=Math.floor(this.d_+this.y_()),r=Math.max(0,Date.now()-this.f_),s=Math.max(0,t-r);s>0&&V("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.d_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,s,()=>(this.f_=Date.now(),e())),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
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
 */const kp="PersistentStream";class Uy{constructor(e,t,r,s,i,o,c,u){this.Ci=e,this.S_=r,this.b_=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Ql(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.K_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.K_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===C.RESOURCE_EXHAUSTED?(ve(t.toString()),ve("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===C.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.t_(t)}W_(){}auth(){this.state=1;const e=this.Q_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.D_===t&&this.G_(r,s)},r=>{e(()=>{const s=new N(C.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(s)})})}G_(e,t){const r=this.Q_(this.D_);this.stream=this.j_(e,t),this.stream.Zo(()=>{r(()=>this.listener.Zo())}),this.stream.Yo(()=>{r(()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.Yo()))}),this.stream.t_(s=>{r(()=>this.z_(s))}),this.stream.onMessage(s=>{r(()=>++this.F_==1?this.J_(s):this.onNext(s))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return V(kp,`close with error: ${e}`),this.stream=null,this.close(4,e)}Q_(e){return t=>{this.Ci.enqueueAndForget(()=>this.D_===e?t():(V(kp,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class IP extends Uy{constructor(e,t,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,o),this.serializer=i}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=RR(this.serializer,e),r=function(i){if(!("targetChange"in i))return $.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?$.min():o.readTime?be(o.readTime):$.min()}(e);return this.listener.H_(t,r)}Z_(e){const t={};t.database=ju(this.serializer),t.addTarget=function(i,o){let c;const u=o.target;if(c=Ia(u)?{documents:sy(i,u)}:{query:sc(i,u).ft},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=Z_(i,o.resumeToken);const l=Uu(i,o.expectedCount);l!==null&&(c.expectedCount=l)}else if(o.snapshotVersion.compareTo($.min())>0){c.readTime=ys(i,o.snapshotVersion.toTimestamp());const l=Uu(i,o.expectedCount);l!==null&&(c.expectedCount=l)}return c}(this.serializer,e);const r=xR(this.serializer,e);r&&(t.labels=r),this.q_(t)}X_(e){const t={};t.database=ju(this.serializer),t.removeTarget=e,this.q_(t)}}class EP extends Uy{constructor(e,t,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,o),this.serializer=i}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return q(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,q(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){q(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=PR(e.writeResults,e.commitTime),r=be(e.commitTime);return this.listener.na(r,t)}ra(){const e={};e.database=ju(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>zi(this.serializer,r))};this.q_(t)}}/**
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
 */class wP{}class TP extends wP{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new N(C.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.Wo(e,Bu(t,r),s,i,o)).catch(i=>{throw i.name==="FirebaseError"?(i.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new N(C.UNKNOWN,i.toString())})}jo(e,t,r,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,c])=>this.connection.jo(e,Bu(t,r),s,o,c,i)).catch(o=>{throw o.name==="FirebaseError"?(o.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new N(C.UNKNOWN,o.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}function AP(n,e,t,r){return new TP(n,e,t,r)}class vP{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(ve(t),this.aa=!1):V("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
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
 */const Tr="RemoteStore";class bP{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ea=new Map,this.Ia=new Set,this.Ra=[],this.Aa=i,this.Aa.Mo(o=>{r.enqueueAndForget(async()=>{$n(this)&&(V(Tr,"Restarting streams for network reachability change."),await async function(u){const l=M(u);l.Ia.add(4),await Vs(l),l.Va.set("Unknown"),l.Ia.delete(4),await co(l)}(this))})}),this.Va=new vP(r,s)}}async function co(n){if($n(n))for(const e of n.Ra)await e(!0)}async function Vs(n){for(const e of n.Ra)await e(!1)}function uc(n,e){const t=M(n);t.Ea.has(e.targetId)||(t.Ea.set(e.targetId,e),Xl(t)?Yl(t):Ls(t).O_()&&Jl(t,e))}function ws(n,e){const t=M(n),r=Ls(t);t.Ea.delete(e),r.O_()&&By(t,e),t.Ea.size===0&&(r.O_()?r.L_():$n(t)&&t.Va.set("Unknown"))}function Jl(n,e){if(n.da.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo($.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Ls(n).Z_(e)}function By(n,e){n.da.$e(e),Ls(n).X_(e)}function Yl(n){n.da=new ER({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),At:e=>n.Ea.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),Ls(n).start(),n.Va.ua()}function Xl(n){return $n(n)&&!Ls(n).x_()&&n.Ea.size>0}function $n(n){return M(n).Ia.size===0}function jy(n){n.da=void 0}async function SP(n){n.Va.set("Online")}async function RP(n){n.Ea.forEach((e,t)=>{Jl(n,e)})}async function PP(n,e){jy(n),Xl(n)?(n.Va.ha(e),Yl(n)):n.Va.set("Unknown")}async function xP(n,e,t){if(n.Va.set("Online"),e instanceof X_&&e.state===2&&e.cause)try{await async function(s,i){const o=i.cause;for(const c of i.targetIds)s.Ea.has(c)&&(await s.remoteSyncer.rejectListen(c,o),s.Ea.delete(c),s.da.removeTarget(c))}(n,e)}catch(r){V(Tr,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await xa(n,r)}else if(e instanceof na?n.da.Xe(e):e instanceof Y_?n.da.st(e):n.da.tt(e),!t.isEqual($.min()))try{const r=await xy(n.localStore);t.compareTo(r)>=0&&await function(i,o){const c=i.da.Tt(o);return c.targetChanges.forEach((u,l)=>{if(u.resumeToken.approximateByteSize()>0){const d=i.Ea.get(l);d&&i.Ea.set(l,d.withResumeToken(u.resumeToken,o))}}),c.targetMismatches.forEach((u,l)=>{const d=i.Ea.get(u);if(!d)return;i.Ea.set(u,d.withResumeToken(Ie.EMPTY_BYTE_STRING,d.snapshotVersion)),By(i,u);const f=new $t(d.target,u,l,d.sequenceNumber);Jl(i,f)}),i.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(r){V(Tr,"Failed to raise snapshot:",r),await xa(n,r)}}async function xa(n,e,t){if(!Gn(e))throw e;n.Ia.add(1),await Vs(n),n.Va.set("Offline"),t||(t=()=>xy(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{V(Tr,"Retrying IndexedDB access"),await t(),n.Ia.delete(1),await co(n)})}function Gy(n,e){return e().catch(t=>xa(n,t,e))}async function Os(n){const e=M(n),t=Mn(e);let r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:Cn;for(;CP(e);)try{const s=await hP(e.localStore,r);if(s===null){e.Ta.length===0&&t.L_();break}r=s.batchId,DP(e,s)}catch(s){await xa(e,s)}qy(e)&&$y(e)}function CP(n){return $n(n)&&n.Ta.length<10}function DP(n,e){n.Ta.push(e);const t=Mn(n);t.O_()&&t.Y_&&t.ea(e.mutations)}function qy(n){return $n(n)&&!Mn(n).x_()&&n.Ta.length>0}function $y(n){Mn(n).start()}async function kP(n){Mn(n).ra()}async function NP(n){const e=Mn(n);for(const t of n.Ta)e.ea(t.mutations)}async function VP(n,e,t){const r=n.Ta.shift(),s=Ll.from(r,e,t);await Gy(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await Os(n)}async function OP(n,e){e&&Mn(n).Y_&&await async function(r,s){if(function(o){return K_(o)&&o!==C.ABORTED}(s.code)){const i=r.Ta.shift();Mn(r).B_(),await Gy(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await Os(r)}}(n,e),qy(n)&&$y(n)}async function Np(n,e){const t=M(n);t.asyncQueue.verifyOperationInProgress(),V(Tr,"RemoteStore received new credentials");const r=$n(t);t.Ia.add(3),await Vs(t),r&&t.Va.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ia.delete(3),await co(t)}async function Ku(n,e){const t=M(n);e?(t.Ia.delete(2),await co(t)):e||(t.Ia.add(2),await Vs(t),t.Va.set("Unknown"))}function Ls(n){return n.ma||(n.ma=function(t,r,s){const i=M(t);return i.sa(),new IP(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{Zo:SP.bind(null,n),Yo:RP.bind(null,n),t_:PP.bind(null,n),H_:xP.bind(null,n)}),n.Ra.push(async e=>{e?(n.ma.B_(),Xl(n)?Yl(n):n.Va.set("Unknown")):(await n.ma.stop(),jy(n))})),n.ma}function Mn(n){return n.fa||(n.fa=function(t,r,s){const i=M(t);return i.sa(),new EP(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),Yo:kP.bind(null,n),t_:OP.bind(null,n),ta:NP.bind(null,n),na:VP.bind(null,n)}),n.Ra.push(async e=>{e?(n.fa.B_(),await Os(n)):(await n.fa.stop(),n.Ta.length>0&&(V(Tr,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))})),n.fa}/**
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
 */class Zl{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new je,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const o=Date.now()+r,c=new Zl(e,t,o,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new N(C.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Ms(n,e){if(ve("AsyncQueue",`${e}: ${n}`),Gn(n))return new N(C.UNAVAILABLE,`${e}: ${n}`);throw n}/**
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
 */class hr{static emptySet(e){return new hr(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||L.comparator(t.key,r.key):(t,r)=>L.comparator(t.key,r.key),this.keyedMap=gi(),this.sortedSet=new he(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof hr)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new hr;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
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
 */class Vp{constructor(){this.ga=new he(L.comparator)}track(e){const t=e.doc.key,r=this.ga.get(t);r?e.type!==0&&r.type===3?this.ga=this.ga.insert(t,e):e.type===3&&r.type!==1?this.ga=this.ga.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.ga=this.ga.remove(t):e.type===1&&r.type===2?this.ga=this.ga.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):j(63341,{Vt:e,pa:r}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal((t,r)=>{e.push(r)}),e}}class Ar{constructor(e,t,r,s,i,o,c,u,l){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=l}static fromInitialDocuments(e,t,r,s,i){const o=[];return t.forEach(c=>{o.push({type:0,doc:c})}),new Ar(e,t,hr.emptySet(t),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&ro(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
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
 */class LP{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class MP{constructor(){this.queries=Op(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,r){const s=M(t),i=s.queries;s.queries=Op(),i.forEach((o,c)=>{for(const u of c.Sa)u.onError(r)})})(this,new N(C.ABORTED,"Firestore shutting down"))}}function Op(){return new rn(n=>N_(n),ro)}async function eh(n,e){const t=M(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.ba()&&e.Da()&&(r=2):(i=new LP,r=e.Da()?0:1);try{switch(r){case 0:i.wa=await t.onListen(s,!0);break;case 1:i.wa=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(o){const c=Ms(o,`Initialization of query '${$r(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.Sa.push(e),e.va(t.onlineState),i.wa&&e.Fa(i.wa)&&nh(t)}async function th(n,e){const t=M(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const o=i.Sa.indexOf(e);o>=0&&(i.Sa.splice(o,1),i.Sa.length===0?s=e.Da()?0:1:!i.ba()&&e.Da()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function FP(n,e){const t=M(n);let r=!1;for(const s of e){const i=s.query,o=t.queries.get(i);if(o){for(const c of o.Sa)c.Fa(s)&&(r=!0);o.wa=s}}r&&nh(t)}function UP(n,e,t){const r=M(n),s=r.queries.get(e);if(s)for(const i of s.Sa)i.onError(t);r.queries.delete(e)}function nh(n){n.Ca.forEach(e=>{e.next()})}var Qu,Lp;(Lp=Qu||(Qu={})).Ma="default",Lp.Cache="cache";class rh{constructor(e,t,r){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new Ar(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const r=t!=="Offline";return(!this.options.qa||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=Ar.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==Qu.Cache}}/**
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
 */class zy{constructor(e,t){this.Ka=e,this.byteLength=t}Ua(){return"metadata"in this.Ka}}/**
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
 */class Mp{constructor(e){this.serializer=e}qs(e){return Mt(this.serializer,e)}Ks(e){return e.metadata.exists?rc(this.serializer,e.document,!1):fe.newNoDocument(this.qs(e.metadata.name),this.Us(e.metadata.readTime))}Us(e){return be(e)}}class sh{constructor(e,t){this.$a=e,this.serializer=t,this.Wa=[],this.Qa=[],this.collectionGroups=new Set,this.progress=Wy(e)}get queries(){return this.Wa}get documents(){return this.Qa}Ga(e){this.progress.bytesLoaded+=e.byteLength;let t=this.progress.documentsLoaded;if(e.Ka.namedQuery)this.Wa.push(e.Ka.namedQuery);else if(e.Ka.documentMetadata){this.Qa.push({metadata:e.Ka.documentMetadata}),e.Ka.documentMetadata.exists||++t;const r=Z.fromString(e.Ka.documentMetadata.name);this.collectionGroups.add(r.get(r.length-2))}else e.Ka.document&&(this.Qa[this.Qa.length-1].document=e.Ka.document,++t);return t!==this.progress.documentsLoaded?(this.progress.documentsLoaded=t,{...this.progress}):null}za(e){const t=new Map,r=new Mp(this.serializer);for(const s of e)if(s.metadata.queries){const i=r.qs(s.metadata.name);for(const o of s.metadata.queries){const c=(t.get(o)||J()).add(i);t.set(o,c)}}return t}async ja(e){const t=await dP(e,new Mp(this.serializer),this.Qa,this.$a.id),r=this.za(this.documents);for(const s of this.Wa)await fP(e,s,r.get(s.name));return this.progress.taskState="Success",{progress:this.progress,Ja:this.collectionGroups,Ha:t}}}function Wy(n){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:n.totalDocuments,totalBytes:n.totalBytes}}/**
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
 */class Hy{constructor(e){this.key=e}}class Ky{constructor(e){this.key=e}}class Qy{constructor(e,t){this.query=e,this.Za=t,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=J(),this.mutatedKeys=J(),this.eu=O_(e),this.tu=new hr(this.eu)}get nu(){return this.Za}ru(e,t){const r=t?t.iu:new Vp,s=t?t.tu:this.tu;let i=t?t.mutatedKeys:this.mutatedKeys,o=s,c=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,l=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((d,f)=>{const m=s.get(d),I=so(this.query,f)?f:null,b=!!m&&this.mutatedKeys.has(m.key),x=!!I&&(I.hasLocalMutations||this.mutatedKeys.has(I.key)&&I.hasCommittedMutations);let D=!1;m&&I?m.data.isEqual(I.data)?b!==x&&(r.track({type:3,doc:I}),D=!0):this.su(m,I)||(r.track({type:2,doc:I}),D=!0,(u&&this.eu(I,u)>0||l&&this.eu(I,l)<0)&&(c=!0)):!m&&I?(r.track({type:0,doc:I}),D=!0):m&&!I&&(r.track({type:1,doc:m}),D=!0,(u||l)&&(c=!0)),D&&(I?(o=o.add(I),i=x?i.add(d):i.delete(d)):(o=o.delete(d),i=i.delete(d)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const d=this.query.limitType==="F"?o.last():o.first();o=o.delete(d.key),i=i.delete(d.key),r.track({type:1,doc:d})}return{tu:o,iu:r,bs:c,mutatedKeys:i}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const o=e.iu.ya();o.sort((d,f)=>function(I,b){const x=D=>{switch(D){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return j(20277,{Vt:D})}};return x(I)-x(b)}(d.type,f.type)||this.eu(d.doc,f.doc)),this.ou(r),s=s??!1;const c=t&&!s?this._u():[],u=this.Ya.size===0&&this.current&&!s?1:0,l=u!==this.Xa;return this.Xa=u,o.length!==0||l?{snapshot:new Ar(this.query,e.tu,i,o,e.mutatedKeys,u===0,l,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:c}:{au:c}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Vp,mutatedKeys:this.mutatedKeys,bs:!1},!1)):{au:[]}}uu(e){return!this.Za.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(t=>this.Za=this.Za.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Za=this.Za.delete(t)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Ya;this.Ya=J(),this.tu.forEach(r=>{this.uu(r.key)&&(this.Ya=this.Ya.add(r.key))});const t=[];return e.forEach(r=>{this.Ya.has(r)||t.push(new Ky(r))}),this.Ya.forEach(r=>{e.has(r)||t.push(new Hy(r))}),t}cu(e){this.Za=e.ks,this.Ya=J();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return Ar.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Xa===0,this.hasCachedResults)}}const zn="SyncEngine";class BP{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class jP{constructor(e){this.key=e,this.hu=!1}}class GP{constructor(e,t,r,s,i,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Pu={},this.Tu=new rn(c=>N_(c),ro),this.Eu=new Map,this.Iu=new Set,this.Ru=new he(L.comparator),this.Au=new Map,this.Vu=new Gl,this.du={},this.mu=new Map,this.fu=wr.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function qP(n,e,t=!0){const r=lc(n);let s;const i=r.Tu.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await Jy(r,e,t,!0),s}async function $P(n,e){const t=lc(n);await Jy(t,e,!0,!1)}async function Jy(n,e,t,r){const s=await Is(n.localStore,Ke(e)),i=s.targetId,o=n.sharedClientState.addLocalQueryTarget(i,t);let c;return r&&(c=await ih(n,e,i,o==="current",s.resumeToken)),n.isPrimaryClient&&t&&uc(n.remoteStore,s),c}async function ih(n,e,t,r,s){n.pu=(f,m,I)=>async function(x,D,O,B){let U=D.view.ru(O);U.bs&&(U=await Sa(x.localStore,D.query,!1).then(({documents:T})=>D.view.ru(T,U)));const z=B&&B.targetChanges.get(D.targetId),W=B&&B.targetMismatches.get(D.targetId)!=null,Q=D.view.applyChanges(U,x.isPrimaryClient,z,W);return Ju(x,D.targetId,Q.au),Q.snapshot}(n,f,m,I);const i=await Sa(n.localStore,e,!0),o=new Qy(e,i.ks),c=o.ru(i.documents),u=ao.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),l=o.applyChanges(c,n.isPrimaryClient,u);Ju(n,t,l.au);const d=new BP(e,t,o);return n.Tu.set(e,d),n.Eu.has(t)?n.Eu.get(t).push(e):n.Eu.set(t,[e]),l.snapshot}async function zP(n,e,t){const r=M(n),s=r.Tu.get(e),i=r.Eu.get(s.targetId);if(i.length>1)return r.Eu.set(s.targetId,i.filter(o=>!ro(o,e))),void r.Tu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Es(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),t&&ws(r.remoteStore,s.targetId),Ts(r,s.targetId)}).catch(jn)):(Ts(r,s.targetId),await Es(r.localStore,s.targetId,!0))}async function WP(n,e){const t=M(n),r=t.Tu.get(e),s=t.Eu.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),ws(t.remoteStore,r.targetId))}async function HP(n,e,t){const r=uh(n);try{const s=await function(o,c){const u=M(o),l=ie.now(),d=c.reduce((I,b)=>I.add(b.key),J());let f,m;return u.persistence.runTransaction("Locally write mutations","readwrite",I=>{let b=st(),x=J();return u.xs.getEntries(I,d).next(D=>{b=D,b.forEach((O,B)=>{B.isValidDocument()||(x=x.add(O))})}).next(()=>u.localDocuments.getOverlayedDocuments(I,b)).next(D=>{f=D;const O=[];for(const B of c){const U=gR(B,f.get(B.key).overlayedDocument);U!=null&&O.push(new sn(B.key,U,T_(U.value.mapValue),ge.exists(!0)))}return u.mutationQueue.addMutationBatch(I,l,O,c)}).next(D=>{m=D;const O=D.applyToLocalDocumentSet(f,x);return u.documentOverlayCache.saveOverlays(I,D.batchId,O)})}).then(()=>({batchId:m.batchId,changes:M_(f)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(o,c,u){let l=o.du[o.currentUser.toKey()];l||(l=new he(K)),l=l.insert(c,u),o.du[o.currentUser.toKey()]=l}(r,s.batchId,t),await on(r,s.changes),await Os(r.remoteStore)}catch(s){const i=Ms(s,"Failed to persist write");t.reject(i)}}async function Yy(n,e){const t=M(n);try{const r=await lP(t.localStore,e);e.targetChanges.forEach((s,i)=>{const o=t.Au.get(i);o&&(q(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?o.hu=!0:s.modifiedDocuments.size>0?q(o.hu,14607):s.removedDocuments.size>0&&(q(o.hu,42227),o.hu=!1))}),await on(t,r,e)}catch(r){await jn(r)}}function Fp(n,e,t){const r=M(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Tu.forEach((i,o)=>{const c=o.view.va(e);c.snapshot&&s.push(c.snapshot)}),function(o,c){const u=M(o);u.onlineState=c;let l=!1;u.queries.forEach((d,f)=>{for(const m of f.Sa)m.va(c)&&(l=!0)}),l&&nh(u)}(r.eventManager,e),s.length&&r.Pu.H_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function KP(n,e,t){const r=M(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Au.get(e),i=s&&s.key;if(i){let o=new he(L.comparator);o=o.insert(i,fe.newNoDocument(i,$.min()));const c=J().add(i),u=new oo($.min(),new Map,new he(K),o,c);await Yy(r,u),r.Ru=r.Ru.remove(i),r.Au.delete(e),ch(r)}else await Es(r.localStore,e,!1).then(()=>Ts(r,e,t)).catch(jn)}async function QP(n,e){const t=M(n),r=e.batch.batchId;try{const s=await uP(t.localStore,e);ah(t,r,null),oh(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await on(t,s)}catch(s){await jn(s)}}async function JP(n,e,t){const r=M(n);try{const s=await function(o,c){const u=M(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",l=>{let d;return u.mutationQueue.lookupMutationBatch(l,c).next(f=>(q(f!==null,37113),d=f.keys(),u.mutationQueue.removeMutationBatch(l,f))).next(()=>u.mutationQueue.performConsistencyCheck(l)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(l,d,c)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(l,d)).next(()=>u.localDocuments.getDocuments(l,d))})}(r.localStore,e);ah(r,e,t),oh(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await on(r,s)}catch(s){await jn(s)}}async function YP(n,e){const t=M(n);$n(t.remoteStore)||V(zn,"The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const r=await function(o){const c=M(o);return c.persistence.runTransaction("Get highest unacknowledged batch id","readonly",u=>c.mutationQueue.getHighestUnacknowledgedBatchId(u))}(t.localStore);if(r===Cn)return void e.resolve();const s=t.mu.get(r)||[];s.push(e),t.mu.set(r,s)}catch(r){const s=Ms(r,"Initialization of waitForPendingWrites() operation failed");e.reject(s)}}function oh(n,e){(n.mu.get(e)||[]).forEach(t=>{t.resolve()}),n.mu.delete(e)}function ah(n,e,t){const r=M(n);let s=r.du[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.du[r.currentUser.toKey()]=s}}function Ts(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Eu.get(e))n.Tu.delete(r),t&&n.Pu.yu(r,t);n.Eu.delete(e),n.isPrimaryClient&&n.Vu.Gr(e).forEach(r=>{n.Vu.containsKey(r)||Xy(n,r)})}function Xy(n,e){n.Iu.delete(e.path.canonicalString());const t=n.Ru.get(e);t!==null&&(ws(n.remoteStore,t),n.Ru=n.Ru.remove(e),n.Au.delete(t),ch(n))}function Ju(n,e,t){for(const r of t)r instanceof Hy?(n.Vu.addReference(r.key,e),XP(n,r)):r instanceof Ky?(V(zn,"Document no longer in limbo: "+r.key),n.Vu.removeReference(r.key,e),n.Vu.containsKey(r.key)||Xy(n,r.key)):j(19791,{wu:r})}function XP(n,e){const t=e.key,r=t.path.canonicalString();n.Ru.get(t)||n.Iu.has(r)||(V(zn,"New document in limbo: "+t),n.Iu.add(r),ch(n))}function ch(n){for(;n.Iu.size>0&&n.Ru.size<n.maxConcurrentLimboResolutions;){const e=n.Iu.values().next().value;n.Iu.delete(e);const t=new L(Z.fromString(e)),r=n.fu.next();n.Au.set(r,new jP(t)),n.Ru=n.Ru.insert(t,r),uc(n.remoteStore,new $t(Ke(Ds(t.path)),r,"TargetPurposeLimboResolution",nt.ce))}}async function on(n,e,t){const r=M(n),s=[],i=[],o=[];r.Tu.isEmpty()||(r.Tu.forEach((c,u)=>{o.push(r.pu(u,e,t).then(l=>{var d;if((l||t)&&r.isPrimaryClient){const f=l?!l.fromCache:(d=t==null?void 0:t.targetChanges.get(u.targetId))==null?void 0:d.current;r.sharedClientState.updateQueryState(u.targetId,f?"current":"not-current")}if(l){s.push(l);const f=Wl.Is(u.targetId,l);i.push(f)}}))}),await Promise.all(o),r.Pu.H_(s),await async function(u,l){const d=M(u);try{await d.persistence.runTransaction("notifyLocalViewChanges","readwrite",f=>S.forEach(l,m=>S.forEach(m.Ts,I=>d.persistence.referenceDelegate.addReference(f,m.targetId,I)).next(()=>S.forEach(m.Es,I=>d.persistence.referenceDelegate.removeReference(f,m.targetId,I)))))}catch(f){if(!Gn(f))throw f;V(Hl,"Failed to update sequence numbers: "+f)}for(const f of l){const m=f.targetId;if(!f.fromCache){const I=d.vs.get(m),b=I.snapshotVersion,x=I.withLastLimboFreeSnapshotVersion(b);d.vs=d.vs.insert(m,x)}}}(r.localStore,i))}async function ZP(n,e){const t=M(n);if(!t.currentUser.isEqual(e)){V(zn,"User change. New user:",e.toKey());const r=await Py(t.localStore,e);t.currentUser=e,function(i,o){i.mu.forEach(c=>{c.forEach(u=>{u.reject(new N(C.CANCELLED,o))})}),i.mu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await on(t,r.Ns)}}function e0(n,e){const t=M(n),r=t.Au.get(e);if(r&&r.hu)return J().add(r.key);{let s=J();const i=t.Eu.get(e);if(!i)return s;for(const o of i){const c=t.Tu.get(o);s=s.unionWith(c.view.nu)}return s}}async function t0(n,e){const t=M(n),r=await Sa(t.localStore,e.query,!0),s=e.view.cu(r);return t.isPrimaryClient&&Ju(t,e.targetId,s.au),s}async function n0(n,e){const t=M(n);return ky(t.localStore,e).then(r=>on(t,r))}async function r0(n,e,t,r){const s=M(n),i=await function(c,u){const l=M(c),d=M(l.mutationQueue);return l.persistence.runTransaction("Lookup mutation documents","readonly",f=>d.Xn(f,u).next(m=>m?l.localDocuments.getDocuments(f,m):S.resolve(null)))}(s.localStore,e);i!==null?(t==="pending"?await Os(s.remoteStore):t==="acknowledged"||t==="rejected"?(ah(s,e,r||null),oh(s,e),function(c,u){M(M(c).mutationQueue).nr(u)}(s.localStore,e)):j(6720,"Unknown batchState",{Su:t}),await on(s,i)):V(zn,"Cannot apply mutation batch with id: "+e)}async function s0(n,e){const t=M(n);if(lc(t),uh(t),e===!0&&t.gu!==!0){const r=t.sharedClientState.getAllActiveQueryTargets(),s=await Up(t,r.toArray());t.gu=!0,await Ku(t.remoteStore,!0);for(const i of s)uc(t.remoteStore,i)}else if(e===!1&&t.gu!==!1){const r=[];let s=Promise.resolve();t.Eu.forEach((i,o)=>{t.sharedClientState.isLocalQueryTarget(o)?r.push(o):s=s.then(()=>(Ts(t,o),Es(t.localStore,o,!0))),ws(t.remoteStore,o)}),await s,await Up(t,r),function(o){const c=M(o);c.Au.forEach((u,l)=>{ws(c.remoteStore,l)}),c.Vu.zr(),c.Au=new Map,c.Ru=new he(L.comparator)}(t),t.gu=!1,await Ku(t.remoteStore,!1)}}async function Up(n,e,t){const r=M(n),s=[],i=[];for(const o of e){let c;const u=r.Eu.get(o);if(u&&u.length!==0){c=await Is(r.localStore,Ke(u[0]));for(const l of u){const d=r.Tu.get(l),f=await t0(r,d);f.snapshot&&i.push(f.snapshot)}}else{const l=await Dy(r.localStore,o);c=await Is(r.localStore,l),await ih(r,Zy(l),o,!1,c.resumeToken)}s.push(c)}return r.Pu.H_(i),s}function Zy(n){return C_(n.path,n.collectionGroup,n.orderBy,n.filters,n.limit,"F",n.startAt,n.endAt)}function i0(n){return function(t){return M(M(t).persistence).hs()}(M(n).localStore)}async function o0(n,e,t,r){const s=M(n);if(s.gu)return void V(zn,"Ignoring unexpected query state notification.");const i=s.Eu.get(e);if(i&&i.length>0)switch(t){case"current":case"not-current":{const o=await ky(s.localStore,V_(i[0])),c=oo.createSynthesizedRemoteEventForCurrentChange(e,t==="current",Ie.EMPTY_BYTE_STRING);await on(s,o,c);break}case"rejected":await Es(s.localStore,e,!0),Ts(s,e,r);break;default:j(64155,t)}}async function a0(n,e,t){const r=lc(n);if(r.gu){for(const s of e){if(r.Eu.has(s)&&r.sharedClientState.isActiveQueryTarget(s)){V(zn,"Adding an already active target "+s);continue}const i=await Dy(r.localStore,s),o=await Is(r.localStore,i);await ih(r,Zy(i),o.targetId,!1,o.resumeToken),uc(r.remoteStore,o)}for(const s of t)r.Eu.has(s)&&await Es(r.localStore,s,!1).then(()=>{ws(r.remoteStore,s),Ts(r,s)}).catch(jn)}}function lc(n){const e=M(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Yy.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=e0.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=KP.bind(null,e),e.Pu.H_=FP.bind(null,e.eventManager),e.Pu.yu=UP.bind(null,e.eventManager),e}function uh(n){const e=M(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=QP.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=JP.bind(null,e),e}function c0(n,e,t){const r=M(n);(async function(i,o,c){try{const u=await o.getMetadata();if(await function(I,b){const x=M(I),D=be(b.createTime);return x.persistence.runTransaction("hasNewerBundle","readonly",O=>x.Pi.getBundleMetadata(O,b.id)).then(O=>!!O&&O.createTime.compareTo(D)>=0)}(i.localStore,u))return await o.close(),c._completeWith(function(I){return{taskState:"Success",documentsLoaded:I.totalDocuments,bytesLoaded:I.totalBytes,totalDocuments:I.totalDocuments,totalBytes:I.totalBytes}}(u)),Promise.resolve(new Set);c._updateProgress(Wy(u));const l=new sh(u,o.serializer);let d=await o.bu();for(;d;){const m=await l.Ga(d);m&&c._updateProgress(m),d=await o.bu()}const f=await l.ja(i.localStore);return await on(i,f.Ha,void 0),await function(I,b){const x=M(I);return x.persistence.runTransaction("Save bundle","readwrite",D=>x.Pi.saveBundleMetadata(D,b))}(i.localStore,u),c._completeWith(f.progress),Promise.resolve(f.Ja)}catch(u){return ct(zn,`Loading bundle failed with ${u}`),c._failWith(u),Promise.resolve(new Set)}})(r,e,t).then(s=>{r.sharedClientState.notifyBundleLoaded(s)})}class As{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Rr(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return Ry(this.persistence,new Sy,e.initialUser,this.serializer)}Cu(e){return new ql(cc.Vi,this.serializer)}Du(e){return new My}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}As.provider={build:()=>new As};class lh extends As{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){q(this.persistence.referenceDelegate instanceof ba,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new Ey(r,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?We.withCacheSize(this.cacheSizeBytes):We.DEFAULT;return new ql(r=>ba.Vi(r,t),this.serializer)}}class hh extends As{constructor(e,t,r){super(),this.xu=e,this.cacheSizeBytes=t,this.forceOwnership=r,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.xu.initialize(this,e),await uh(this.xu.syncEngine),await Os(this.xu.remoteStore),await this.persistence.zi(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}vu(e){return Ry(this.persistence,new Sy,e.initialUser,this.serializer)}Fu(e,t){const r=this.persistence.referenceDelegate.garbageCollector;return new Ey(r,e.asyncQueue,t)}Mu(e,t){const r=new mS(t,this.persistence);return new pS(e.asyncQueue,r)}Cu(e){const t=zl(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),r=this.cacheSizeBytes!==void 0?We.withCacheSize(this.cacheSizeBytes):We.DEFAULT;return new $l(this.synchronizeTabs,t,e.clientId,r,e.asyncQueue,Fy(),sa(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Du(e){return new My}}class eI extends hh{constructor(e,t){super(e,t,!1),this.xu=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const t=this.xu.syncEngine;this.sharedClientState instanceof iu&&(this.sharedClientState.syncEngine={bo:r0.bind(null,t),Do:o0.bind(null,t),Co:a0.bind(null,t),hs:i0.bind(null,t),So:n0.bind(null,t)},await this.sharedClientState.start()),await this.persistence.zi(async r=>{await s0(this.xu.syncEngine,r),this.gcScheduler&&(r&&!this.gcScheduler.started?this.gcScheduler.start():r||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(r&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():r||this.indexBackfillerScheduler.stop())})}Du(e){const t=Fy();if(!iu.v(t))throw new N(C.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const r=zl(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new iu(t,e.asyncQueue,r,e.clientId,e.initialUser)}}class Fn{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Fp(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=ZP.bind(null,this.syncEngine),await Ku(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new MP}()}createDatastore(e){const t=Rr(e.databaseInfo.databaseId),r=yP(e.databaseInfo);return AP(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,s,i,o,c){return new bP(r,s,i,o,c)}(this.localStore,this.datastore,e.asyncQueue,t=>Fp(this.syncEngine,t,0),function(){return Dp.v()?new Dp:new pP}())}createSyncEngine(e,t){return function(s,i,o,c,u,l,d){const f=new GP(s,i,o,c,u,l);return d&&(f.gu=!0),f}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const i=M(s);V(Tr,"RemoteStore shutting down."),i.Ia.add(5),await Vs(i),i.Aa.shutdown(),i.Va.set("Unknown")}(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}}Fn.provider={build:()=>new Fn};function Bp(n,e=10240){let t=0;return{async read(){if(t<n.byteLength){const r={value:n.slice(t,t+e),done:!1};return t+=e,r}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.resolve()}}/**
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
 */class hc{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):ve("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
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
 */class u0{constructor(e,t){this.Bu=e,this.serializer=t,this.metadata=new je,this.buffer=new Uint8Array,this.Lu=function(){return new TextDecoder("utf-8")}(),this.ku().then(r=>{r&&r.Ua()?this.metadata.resolve(r.Ka.metadata):this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is
             ${JSON.stringify(r==null?void 0:r.Ka)}`))},r=>this.metadata.reject(r))}close(){return this.Bu.cancel()}async getMetadata(){return this.metadata.promise}async bu(){return await this.getMetadata(),this.ku()}async ku(){const e=await this.qu();if(e===null)return null;const t=this.Lu.decode(e),r=Number(t);isNaN(r)&&this.Ku(`length string (${t}) is not valid number`);const s=await this.Uu(r);return new zy(JSON.parse(s),e.length+r)}$u(){return this.buffer.findIndex(e=>e===123)}async qu(){for(;this.$u()<0&&!await this.Wu(););if(this.buffer.length===0)return null;const e=this.$u();e<0&&this.Ku("Reached the end of bundle when a length string is expected.");const t=this.buffer.slice(0,e);return this.buffer=this.buffer.slice(e),t}async Uu(e){for(;this.buffer.length<e;)await this.Wu()&&this.Ku("Reached the end of bundle when more is expected.");const t=this.Lu.decode(this.buffer.slice(0,e));return this.buffer=this.buffer.slice(e),t}Ku(e){throw this.Bu.cancel(),new Error(`Invalid bundle format: ${e}`)}async Wu(){const e=await this.Bu.read();if(!e.done){const t=new Uint8Array(this.buffer.length+e.value.length);t.set(this.buffer),t.set(e.value,this.buffer.length),this.buffer=t}return e.done}}/**
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
 */class l0{constructor(e,t){this.bundleData=e,this.serializer=t,this.cursor=0,this.elements=[];let r=this.bu();if(!r||!r.Ua())throw new Error(`The first element of the bundle is not a metadata object, it is
         ${JSON.stringify(r==null?void 0:r.Ka)}`);this.metadata=r;do r=this.bu(),r!==null&&this.elements.push(r);while(r!==null)}getMetadata(){return this.metadata}Qu(){return this.elements}bu(){if(this.cursor===this.bundleData.length)return null;const e=this.qu(),t=this.Uu(e);return new zy(JSON.parse(t),e)}Uu(e){if(this.cursor+e>this.bundleData.length)throw new N(C.INTERNAL,"Reached the end of bundle when more is expected.");return this.bundleData.slice(this.cursor,this.cursor+=e)}qu(){const e=this.cursor;let t=this.cursor;for(;t<this.bundleData.length;){if(this.bundleData[t]==="{"){if(t===e)throw new Error("First character is a bracket and not a number");return this.cursor=t,Number(this.bundleData.slice(e,t))}t++}throw new Error("Reached the end of bundle when more is expected.")}}/**
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
 */let h0=class{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new N(C.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const t=await async function(s,i){const o=M(s),c={documents:i.map(f=>$i(o.serializer,f))},u=await o.jo("BatchGetDocuments",o.serializer.databaseId,Z.emptyPath(),c,i.length),l=new Map;u.forEach(f=>{const m=SR(o.serializer,f);l.set(m.key.toString(),m)});const d=[];return i.forEach(f=>{const m=l.get(f.toString());q(!!m,55234,{key:f}),d.push(m)}),d}(this.datastore,e);return t.forEach(r=>this.recordVersion(r)),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(r){this.lastTransactionError=r}this.writtenDocs.add(e.toString())}delete(e){this.write(new Ns(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach(t=>{e.delete(t.key.toString())}),e.forEach((t,r)=>{const s=L.fromPath(r);this.mutations.push(new Vl(s,this.precondition(s)))}),await async function(r,s){const i=M(r),o={writes:s.map(c=>zi(i.serializer,c))};await i.Wo("Commit",i.serializer.databaseId,Z.emptyPath(),o)}(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw j(50498,{Gu:e.constructor.name});t=$.min()}const r=this.readVersions.get(e.key.toString());if(r){if(!t.isEqual(r))throw new N(C.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){const t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual($.min())?ge.exists(!1):ge.updateTime(t):ge.none()}preconditionForUpdate(e){const t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual($.min()))throw new N(C.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return ge.updateTime(t)}return ge.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}};/**
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
 */class d0{constructor(e,t,r,s,i){this.asyncQueue=e,this.datastore=t,this.options=r,this.updateFunction=s,this.deferred=i,this.zu=r.maxAttempts,this.M_=new Ql(this.asyncQueue,"transaction_retry")}ju(){this.zu-=1,this.Ju()}Ju(){this.M_.p_(async()=>{const e=new h0(this.datastore),t=this.Hu(e);t&&t.then(r=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(r)}).catch(s=>{this.Zu(s)}))}).catch(r=>{this.Zu(r)})})}Hu(e){try{const t=this.updateFunction(e);return!eo(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}Zu(e){this.zu>0&&this.Xu(e)?(this.zu-=1,this.asyncQueue.enqueueAndForget(()=>(this.Ju(),Promise.resolve()))):this.deferred.reject(e)}Xu(e){if((e==null?void 0:e.name)==="FirebaseError"){const t=e.code;return t==="aborted"||t==="failed-precondition"||t==="already-exists"||!K_(t)}return!1}}/**
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
 */const Un="FirestoreClient";class f0{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this._databaseInfo=s,this.user=Ue.UNAUTHENTICATED,this.clientId=Wa.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async o=>{V(Un,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(V(Un,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new je;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=Ms(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function au(n,e){n.asyncQueue.verifyOperationInProgress(),V(Un,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await Py(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function jp(n,e){n.asyncQueue.verifyOperationInProgress();const t=await dh(n);V(Un,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>Np(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>Np(e.remoteStore,s)),n._onlineComponents=e}async function dh(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){V(Un,"Using user provided OfflineComponentProvider");try{await au(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===C.FAILED_PRECONDITION||s.code===C.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;ct("Error using user provided cache. Falling back to memory cache: "+t),await au(n,new As)}}else V(Un,"Using default OfflineComponentProvider"),await au(n,new lh(void 0));return n._offlineComponents}async function dc(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(V(Un,"Using user provided OnlineComponentProvider"),await jp(n,n._uninitializedComponentsProvider._online)):(V(Un,"Using default OnlineComponentProvider"),await jp(n,new Fn))),n._onlineComponents}function tI(n){return dh(n).then(e=>e.persistence)}function Fs(n){return dh(n).then(e=>e.localStore)}function nI(n){return dc(n).then(e=>e.remoteStore)}function fh(n){return dc(n).then(e=>e.syncEngine)}function rI(n){return dc(n).then(e=>e.datastore)}async function vs(n){const e=await dc(n),t=e.eventManager;return t.onListen=qP.bind(null,e.syncEngine),t.onUnlisten=zP.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=$P.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=WP.bind(null,e.syncEngine),t}function p0(n){return n.asyncQueue.enqueue(async()=>{const e=await tI(n),t=await nI(n);return e.setNetworkEnabled(!0),function(s){const i=M(s);return i.Ia.delete(0),co(i)}(t)})}function m0(n){return n.asyncQueue.enqueue(async()=>{const e=await tI(n),t=await nI(n);return e.setNetworkEnabled(!1),async function(s){const i=M(s);i.Ia.add(0),await Vs(i),i.Va.set("Offline")}(t)})}function g0(n,e,t,r){const s=new hc(r),i=new rh(e,s,t);return n.asyncQueue.enqueueAndForget(async()=>eh(await vs(n),i)),()=>{s.Nu(),n.asyncQueue.enqueueAndForget(async()=>th(await vs(n),i))}}function _0(n,e){const t=new je;return n.asyncQueue.enqueueAndForget(async()=>async function(s,i,o){try{const c=await function(l,d){const f=M(l);return f.persistence.runTransaction("read document","readonly",m=>f.localDocuments.getDocument(m,d))}(s,i);c.isFoundDocument()?o.resolve(c):c.isNoDocument()?o.resolve(null):o.reject(new N(C.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(c){const u=Ms(c,`Failed to get document '${i} from cache`);o.reject(u)}}(await Fs(n),e,t)),t.promise}function sI(n,e,t={}){const r=new je;return n.asyncQueue.enqueueAndForget(async()=>function(i,o,c,u,l){const d=new hc({next:m=>{d.Nu(),o.enqueueAndForget(()=>th(i,f));const I=m.docs.has(c);!I&&m.fromCache?l.reject(new N(C.UNAVAILABLE,"Failed to get document because the client is offline.")):I&&m.fromCache&&u&&u.source==="server"?l.reject(new N(C.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):l.resolve(m)},error:m=>l.reject(m)}),f=new rh(Ds(c.path),d,{includeMetadataChanges:!0,qa:!0});return eh(i,f)}(await vs(n),n.asyncQueue,e,t,r)),r.promise}function y0(n,e){const t=new je;return n.asyncQueue.enqueueAndForget(async()=>async function(s,i,o){try{const c=await Sa(s,i,!0),u=new Qy(i,c.ks),l=u.ru(c.documents),d=u.applyChanges(l,!1);o.resolve(d.snapshot)}catch(c){const u=Ms(c,`Failed to execute query '${i} against cache`);o.reject(u)}}(await Fs(n),e,t)),t.promise}function iI(n,e,t={}){const r=new je;return n.asyncQueue.enqueueAndForget(async()=>function(i,o,c,u,l){const d=new hc({next:m=>{d.Nu(),o.enqueueAndForget(()=>th(i,f)),m.fromCache&&u.source==="server"?l.reject(new N(C.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):l.resolve(m)},error:m=>l.reject(m)}),f=new rh(c,d,{includeMetadataChanges:!0,qa:!0});return eh(i,f)}(await vs(n),n.asyncQueue,e,t,r)),r.promise}function I0(n,e,t){const r=new je;return n.asyncQueue.enqueueAndForget(async()=>{try{const s=await rI(n);r.resolve(async function(o,c,u){var x;const l=M(o),{request:d,gt:f,parent:m}=iy(l.serializer,D_(c),u);l.connection.qo||delete d.parent;const I=(await l.jo("RunAggregationQuery",l.serializer.databaseId,m,d,1)).filter(D=>!!D.result);q(I.length===1,64727);const b=(x=I[0].result)==null?void 0:x.aggregateFields;return Object.keys(b).reduce((D,O)=>(D[f[O]]=b[O],D),{})}(s,e,t))}catch(s){r.reject(s)}}),r.promise}function E0(n,e){const t=new je;return n.asyncQueue.enqueueAndForget(async()=>HP(await fh(n),e,t)),t.promise}function w0(n,e){const t=new hc(e);return n.asyncQueue.enqueueAndForget(async()=>function(s,i){M(s).Ca.add(i),i.next()}(await vs(n),t)),()=>{t.Nu(),n.asyncQueue.enqueueAndForget(async()=>function(s,i){M(s).Ca.delete(i)}(await vs(n),t))}}function T0(n,e,t){const r=new je;return n.asyncQueue.enqueueAndForget(async()=>{const s=await rI(n);new d0(n.asyncQueue,s,t,e,r).ju()}),r.promise}function A0(n,e,t,r){const s=function(o,c){let u;return u=typeof o=="string"?J_().encode(o):o,function(d,f){return new u0(d,f)}(function(d,f){if(d instanceof Uint8Array)return Bp(d,f);if(d instanceof ArrayBuffer)return Bp(new Uint8Array(d),f);if(d instanceof ReadableStream)return d.getReader();throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")}(u),c)}(t,Rr(e));n.asyncQueue.enqueueAndForget(async()=>{c0(await fh(n),s,r)})}function v0(n,e){return n.asyncQueue.enqueue(async()=>function(r,s){const i=M(r);return i.persistence.runTransaction("Get named query","readonly",o=>i.Pi.getNamedQuery(o,s))}(await Fs(n),e))}function oI(n,e){return function(r,s){return new l0(r,s)}(n,e)}function b0(n,e){return n.asyncQueue.enqueue(async()=>async function(r,s){const i=M(r),o=i.indexManager,c=[];return i.persistence.runTransaction("Configure indexes","readwrite",u=>o.getFieldIndexes(u).next(l=>function(f,m,I,b,x){f=[...f],m=[...m],f.sort(I),m.sort(I);const D=f.length,O=m.length;let B=0,U=0;for(;B<O&&U<D;){const z=I(f[U],m[B]);z<0?x(f[U++]):z>0?b(m[B++]):(B++,U++)}for(;B<O;)b(m[B++]);for(;U<D;)x(f[U++])}(l,s,lS,d=>{c.push(o.addFieldIndex(u,d))},d=>{c.push(o.deleteFieldIndex(u,d))})).next(()=>S.waitFor(c)))}(await Fs(n),e))}function S0(n,e){return n.asyncQueue.enqueue(async()=>function(r,s){M(r).Cs.As=s}(await Fs(n),e))}function R0(n){return n.asyncQueue.enqueue(async()=>function(t){const r=M(t),s=r.indexManager;return r.persistence.runTransaction("Delete All Indexes","readwrite",i=>s.deleteAllFieldIndexes(i))}(await Fs(n)))}/**
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
 */function aI(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
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
 */const P0="ComponentProvider",Gp=new Map;function x0(n,e,t,r,s){return new $S(n,e,t,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,aI(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,r)}/**
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
 */const cI="firestore.googleapis.com",qp=!0;class $p{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new N(C.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=cI,this.ssl=qp}else this.host=e.host,this.ssl=e.ssl??qp;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=my;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Iy)throw new N(C.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Hg("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=aI(e.experimentalLongPollingOptions??{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new N(C.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new N(C.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new N(C.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class uo{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new $p({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new N(C.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new N(C.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new $p(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new zg;switch(r.type){case"firstParty":return new rS(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new N(C.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=Gp.get(t);r&&(V(P0,"Removing Datastore"),Gp.delete(t),r.terminate())}(this),Promise.resolve()}}function uI(n,e,t,r={}){var l;n=ee(n,uo);const s=Bt(e),i=n._getSettings(),o={...i,emulatorOptions:n._getEmulatorOptions()},c=`${e}:${t}`;s&&Ki(`https://${c}`),i.host!==cI&&i.host!==c&&ct("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...i,host:c,ssl:s,emulatorOptions:r};if(!Tt(u,o)&&(n._setSettings(u),r.mockUserToken)){let d,f;if(typeof r.mockUserToken=="string")d=r.mockUserToken,f=Ue.MOCK_USER;else{d=Nm(r.mockUserToken,(l=n._app)==null?void 0:l.options.projectId);const m=r.mockUserToken.sub||r.mockUserToken.user_id;if(!m)throw new N(C.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");f=new Ue(m)}n._authCredentials=new eS(new $g(d,f))}}/**
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
 */class Ve{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Ve(this.firestore,e,this._query)}}class ae{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new It(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new ae(this.firestore,e,this._key)}toJSON(){return{type:ae._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(Sr(t,ae._jsonSchema))return new ae(e,r||null,new L(Z.fromString(t.referencePath)))}}ae._jsonSchemaVersion="firestore/documentReference/1.0",ae._jsonSchema={type:Re("string",ae._jsonSchemaVersion),referencePath:Re("string")};class It extends Ve{constructor(e,t,r){super(e,t,Ds(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new ae(this.firestore,null,new L(e))}withConverter(e){return new It(this.firestore,e,this._path)}}function mt(n,e,...t){if(n=X(n),wl("collection","path",e),n instanceof uo){const r=Z.fromString(e,...t);return kf(r),new It(n,null,r)}{if(!(n instanceof ae||n instanceof It))throw new N(C.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Z.fromString(e,...t));return kf(r),new It(n.firestore,null,r)}}function C0(n,e){if(n=ee(n,uo),wl("collectionGroup","collection id",e),e.indexOf("/")>=0)throw new N(C.INVALID_ARGUMENT,`Invalid collection ID '${e}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new Ve(n,null,function(r){return new nn(Z.emptyPath(),r)}(e))}function we(n,e,...t){if(n=X(n),arguments.length===1&&(e=Wa.newId()),wl("doc","path",e),n instanceof uo){const r=Z.fromString(e,...t);return Df(r),new ae(n,null,new L(r))}{if(!(n instanceof ae||n instanceof It))throw new N(C.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Z.fromString(e,...t));return Df(r),new ae(n.firestore,n instanceof It?n.converter:null,new L(r))}}function D0(n,e){return n=X(n),e=X(e),(n instanceof ae||n instanceof It)&&(e instanceof ae||e instanceof It)&&n.firestore===e.firestore&&n.path===e.path&&n.converter===e.converter}function ph(n,e){return n=X(n),e=X(e),n instanceof Ve&&e instanceof Ve&&n.firestore===e.firestore&&ro(n._query,e._query)&&n.converter===e.converter}/**
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
 */const zp="AsyncQueue";class Wp{constructor(e=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new Ql(this,"async_queue_retry"),this._c=()=>{const r=sa();r&&V(zp,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=e;const t=sa();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=sa();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const t=new je;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Yu.push(e),this.lc()))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(e){if(!Gn(e))throw e;V(zp,"Operation failed with retryable error: "+e)}this.Yu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const t=this.ac.then(()=>(this.rc=!0,e().catch(r=>{throw this.nc=r,this.rc=!1,ve("INTERNAL UNHANDLED ERROR: ",Hp(r)),r}).then(r=>(this.rc=!1,r))));return this.ac=t,t}enqueueAfterDelay(e,t,r){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const s=Zl.createAndSchedule(this,e,t,r,i=>this.hc(i));return this.tc.push(s),s}uc(){this.nc&&j(47125,{Pc:Hp(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ec(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ic(e){return this.Tc().then(()=>{this.tc.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()})}Rc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function Hp(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
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
 */class lI{constructor(){this._progressObserver={},this._taskCompletionResolver=new je,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(e,t,r){this._progressObserver={next:e,error:t,complete:r}}catch(e){return this._taskCompletionResolver.promise.catch(e)}then(e,t){return this._taskCompletionResolver.promise.then(e,t)}_completeWith(e){this._updateProgress(e),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(e)}_failWith(e){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(e),this._taskCompletionResolver.reject(e)}_updateProgress(e){this._lastProgress=e,this._progressObserver.next&&this._progressObserver.next(e)}}/**
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
 */const k0=-1;class ue extends uo{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new Wp,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Wp(e),this._firestoreClient=void 0,await e}}}function N0(n,e,t){t||(t=Bi);const r=Zt(n,"firestore");if(r.isInitialized(t)){const s=r.getImmediate({identifier:t}),i=r.getOptions(t);if(Tt(i,e))return s;throw new N(C.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new N(C.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Iy)throw new N(C.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return e.host&&Bt(e.host)&&Ki(e.host),r.initialize({options:e,instanceIdentifier:t})}function hI(n,e){const t=typeof n=="object"?n:Qi(),r=typeof n=="string"?n:e||Bi,s=Zt(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=il("firestore");i&&uI(s,...i)}return s}function ye(n){if(n._terminated)throw new N(C.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||dI(n),n._firestoreClient}function dI(n){var r,s,i,o;const e=n._freezeSettings(),t=x0(n._databaseId,((r=n._app)==null?void 0:r.options.appId)||"",n._persistenceKey,(s=n._app)==null?void 0:s.options.apiKey,e);n._componentsProvider||(i=e.localCache)!=null&&i._offlineComponentProvider&&((o=e.localCache)!=null&&o._onlineComponentProvider)&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new f0(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&function(u){const l=u==null?void 0:u._online.build();return{_offline:u==null?void 0:u._offline.build(l),_online:l}}(n._componentsProvider))}function V0(n,e){ct("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const t=n._freezeSettings();return pI(n,Fn.provider,{build:r=>new hh(r,t.cacheSizeBytes,e==null?void 0:e.forceOwnership)}),Promise.resolve()}async function fI(n){ct("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const e=n._freezeSettings();pI(n,Fn.provider,{build:t=>new eI(t,e.cacheSizeBytes)})}function pI(n,e,t){if((n=ee(n,ue))._firestoreClient||n._terminated)throw new N(C.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(n._componentsProvider||n._getSettings().localCache)throw new N(C.FAILED_PRECONDITION,"SDK cache is already specified.");n._componentsProvider={_online:e,_offline:t},dI(n)}function O0(n){if(n._initialized&&!n._terminated)throw new N(C.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const e=new je;return n._queue.enqueueAndForgetEvenWhileRestricted(async()=>{try{await async function(r){if(!Lt.v())return Promise.resolve();const s=r+by;await Lt.delete(s)}(zl(n._databaseId,n._persistenceKey)),e.resolve()}catch(t){e.reject(t)}}),e.promise}function L0(n){return function(t){const r=new je;return t.asyncQueue.enqueueAndForget(async()=>YP(await fh(t),r)),r.promise}(ye(n=ee(n,ue)))}function M0(n){return p0(ye(n=ee(n,ue)))}function F0(n){return m0(ye(n=ee(n,ue)))}function U0(n){return FT(n.app,"firestore",n._databaseId.database),n._delete()}function Yu(n,e){const t=ye(n=ee(n,ue)),r=new lI;return A0(t,n._databaseId,e,r),r}function mI(n,e){return v0(ye(n=ee(n,ue)),e).then(t=>t?new Ve(n,null,t.query):null)}/**
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
 */class et{constructor(e){this._byteString=e}static fromBase64String(e){try{return new et(Ie.fromBase64String(e))}catch(t){throw new N(C.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new et(Ie.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:et._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Sr(e,et._jsonSchema))return et.fromBase64String(e.bytes)}}et._jsonSchemaVersion="firestore/bytes/1.0",et._jsonSchema={type:Re("string",et._jsonSchemaVersion),bytes:Re("string")};/**
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
 */class Pr{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new N(C.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new pe(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function B0(){return new Pr(Ru)}/**
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
 */class Wn{constructor(e){this._methodName=e}}/**
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
 */class Et{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new N(C.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new N(C.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return K(this._lat,e._lat)||K(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Et._jsonSchemaVersion}}static fromJSON(e){if(Sr(e,Et._jsonSchema))return new Et(e.latitude,e.longitude)}}Et._jsonSchemaVersion="firestore/geoPoint/1.0",Et._jsonSchema={type:Re("string",Et._jsonSchemaVersion),latitude:Re("number"),longitude:Re("number")};/**
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
 */class ft{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}toJSON(){return{type:ft._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Sr(e,ft._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new ft(e.vectorValues);throw new N(C.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}ft._jsonSchemaVersion="firestore/vectorValue/1.0",ft._jsonSchema={type:Re("string",ft._jsonSchemaVersion),vectorValues:Re("object")};/**
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
 */const j0=/^__.*__$/;class G0{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new sn(e,this.data,this.fieldMask,t,this.fieldTransforms):new ks(e,this.data,t,this.fieldTransforms)}}class gI{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new sn(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function _I(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw j(40011,{dataSource:n})}}class fc{constructor(e,t,r,s,i,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Ac(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(e){return new fc({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}dc(e){var s;const t=(s=this.path)==null?void 0:s.child(e),r=this.i({path:t,arrayElement:!1});return r.mc(e),r}fc(e){var s;const t=(s=this.path)==null?void 0:s.child(e),r=this.i({path:t,arrayElement:!1});return r.Ac(),r}gc(e){return this.i({path:void 0,arrayElement:!0})}yc(e){return Ca(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.mc(this.path.get(e))}mc(e){if(e.length===0)throw this.yc("Document fields must not be empty");if(_I(this.dataSource)&&j0.test(e))throw this.yc('Document fields cannot begin and end with "__"')}}class q0{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Rr(e)}I(e,t,r,s=!1){return new fc({dataSource:e,methodName:t,targetDoc:r,path:pe.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function xr(n){const e=n._freezeSettings(),t=Rr(n._databaseId);return new q0(n._databaseId,!!e.ignoreUndefinedProperties,t)}function pc(n,e,t,r,s,i={}){const o=n.I(i.merge||i.mergeFields?2:0,e,t,s);wh("Data must be an object, but it was:",o,r);const c=EI(r,o);let u,l;if(i.merge)u=new rt(o.fieldMask),l=o.fieldTransforms;else if(i.mergeFields){const d=[];for(const f of i.mergeFields){const m=Yt(e,f,t);if(!o.contains(m))throw new N(C.INVALID_ARGUMENT,`Field '${m}' is specified in your field mask but missing from your input data.`);TI(d,m)||d.push(m)}u=new rt(d),l=o.fieldTransforms.filter(f=>u.covers(f.field))}else u=null,l=o.fieldTransforms;return new G0(new Be(c),u,l)}class lo extends Wn{_toFieldTransform(e){if(e.dataSource!==2)throw e.dataSource===1?e.yc(`${this._methodName}() can only appear at the top level of your update data`):e.yc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof lo}}function yI(n,e,t){return new fc({dataSource:3,targetDoc:e.settings.targetDoc,methodName:n._methodName,arrayElement:t},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class mh extends Wn{_toFieldTransform(e){return new io(e.path,new gs)}isEqual(e){return e instanceof mh}}class gh extends Wn{constructor(e,t){super(e),this.Sc=t}_toFieldTransform(e){const t=yI(this,e,!0),r=this.Sc.map(i=>Cr(i,t)),s=new _r(r);return new io(e.path,s)}isEqual(e){return e instanceof gh&&Tt(this.Sc,e.Sc)}}class _h extends Wn{constructor(e,t){super(e),this.Sc=t}_toFieldTransform(e){const t=yI(this,e,!0),r=this.Sc.map(i=>Cr(i,t)),s=new yr(r);return new io(e.path,s)}isEqual(e){return e instanceof _h&&Tt(this.Sc,e.Sc)}}class yh extends Wn{constructor(e,t){super(e),this.bc=t}_toFieldTransform(e){const t=new _s(e.serializer,B_(e.serializer,this.bc));return new io(e.path,t)}isEqual(e){return e instanceof yh&&this.bc===e.bc}}function Ih(n,e,t,r){const s=n.I(1,e,t);wh("Data must be an object, but it was:",s,r);const i=[],o=Be.empty();qn(r,(u,l)=>{const d=Th(e,u,t);l=X(l);const f=s.fc(d);if(l instanceof lo)i.push(d);else{const m=Cr(l,f);m!=null&&(i.push(d),o.set(d,m))}});const c=new rt(i);return new gI(o,c,s.fieldTransforms)}function Eh(n,e,t,r,s,i){const o=n.I(1,e,t),c=[Yt(e,r,t)],u=[s];if(i.length%2!=0)throw new N(C.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let m=0;m<i.length;m+=2)c.push(Yt(e,i[m])),u.push(i[m+1]);const l=[],d=Be.empty();for(let m=c.length-1;m>=0;--m)if(!TI(l,c[m])){const I=c[m];let b=u[m];b=X(b);const x=o.fc(I);if(b instanceof lo)l.push(I);else{const D=Cr(b,x);D!=null&&(l.push(I),d.set(I,D))}}const f=new rt(l);return new gI(d,f,o.fieldTransforms)}function II(n,e,t,r=!1){return Cr(t,n.I(r?4:3,e))}function Cr(n,e){if(wI(n=X(n)))return wh("Unsupported field value:",e,n),EI(n,e);if(n instanceof Wn)return function(r,s){if(!_I(s.dataSource))throw s.yc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.yc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.yc("Nested arrays are not supported");return function(r,s){const i=[];let o=0;for(const c of r){let u=Cr(c,s.gc(o));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),o++}return{arrayValue:{values:i}}}(n,e)}return function(r,s){if((r=X(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return B_(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=ie.fromDate(r);return{timestampValue:ys(s.serializer,i)}}if(r instanceof ie){const i=new ie(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:ys(s.serializer,i)}}if(r instanceof Et)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof et)return{bytesValue:Z_(s.serializer,r._byteString)};if(r instanceof ae){const i=s.databaseId,o=r.firestore._databaseId;if(!o.isEqual(i))throw s.yc(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Ul(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof ft)return function(o,c){const u=o instanceof ft?o.toArray():o;return{mapValue:{fields:{[Pl]:{stringValue:xl},[fs]:{arrayValue:{values:u.map(d=>{if(typeof d!="number")throw c.yc("VectorValues must only contain numeric values.");return Nl(c.serializer,d)})}}}}}}(r,s);if(ly(r))return r._toProto(s.serializer);throw s.yc(`Unsupported field value: ${Ha(r)}`)}(n,e)}function EI(n,e){const t={};return f_(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):qn(n,(r,s)=>{const i=Cr(s,e.dc(r));i!=null&&(t[r]=i)}),{mapValue:{fields:t}}}function wI(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ie||n instanceof Et||n instanceof et||n instanceof ae||n instanceof Wn||n instanceof ft||ly(n))}function wh(n,e,t){if(!wI(t)||!Kg(t)){const r=Ha(t);throw r==="an object"?e.yc(n+" a custom object"):e.yc(n+" "+r)}}function Yt(n,e,t){if((e=X(e))instanceof Pr)return e._internalPath;if(typeof e=="string")return Th(n,e);throw Ca("Field path arguments must be of type string or ",n,!1,void 0,t)}const $0=new RegExp("[~\\*/\\[\\]]");function Th(n,e,t){if(e.search($0)>=0)throw Ca(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Pr(...e.split("."))._internalPath}catch{throw Ca(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Ca(n,e,t,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(i||o)&&(u+=" (found",i&&(u+=` in field ${r}`),o&&(u+=` in document ${s}`),u+=")"),new N(C.INVALID_ARGUMENT,c+n+u)}function TI(n,e){return n.some(t=>t.isEqual(e))}/**
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
 */class Ah{convertValue(e,t="none"){switch(Vn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return me(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Jt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw j(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return qn(e,(s,i)=>{r[s]=this.convertValue(i,t)}),r}convertVectorValue(e){var r,s,i;const t=(i=(s=(r=e.fields)==null?void 0:r[fs].arrayValue)==null?void 0:s.values)==null?void 0:i.map(o=>me(o.doubleValue));return new ft(t)}convertGeoPoint(e){return new Et(me(e.latitude),me(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=Za(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Ui(e));default:return null}}convertTimestamp(e){const t=Qt(e);return new ie(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=Z.fromString(e);q(uy(r),9688,{name:e});const s=new Nn(r.get(1),r.get(3)),i=new L(r.popFirst(5));return s.isEqual(t)||ve(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
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
 */class Hn extends Ah{constructor(e){super(),this.firestore=e}convertBytes(e){return new et(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new ae(this.firestore,null,t)}}/**
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
 */function z0(){return new lo("deleteField")}function Dn(){return new mh("serverTimestamp")}function W0(...n){return new gh("arrayUnion",n)}function H0(...n){return new _h("arrayRemove",n)}function K0(n){return new yh("increment",n)}function Q0(n){return new ft(n)}/**
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
 */function J0(n){var r;const e=ye(ee(n.firestore,ue)),t=(r=e._onlineComponents)==null?void 0:r.datastore.serializer;return t===void 0?null:sc(t,Ke(n._query)).ft}function Y0(n,e){var i;const t=d_(e,(o,c)=>new H_(c,o.aggregateType,o._internalFieldPath)),r=ye(ee(n.firestore,ue)),s=(i=r._onlineComponents)==null?void 0:i.datastore.serializer;return s===void 0?null:iy(s,D_(n._query),t,!0).request}const Kp="@firebase/firestore",Qp="4.14.0";/**
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
 */function es(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1}(n,["next","error","complete"])}/**
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
 */class bs{constructor(e="count",t){this._internalFieldPath=t,this.type="AggregateField",this.aggregateType=e}}class AI{constructor(e,t,r){this._userDataWriter=t,this._data=r,this.type="AggregateQuerySnapshot",this.query=e}data(){return this._userDataWriter.convertObjectMap(this._data)}_fieldsProto(){return new Be({mapValue:{fields:this._data}}).clone().value.mapValue.fields}}/**
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
 */class Wi{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new ae(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new X0(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const t=this._document.data.field(Yt("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class X0 extends Wi{data(){return super.data()}}/**
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
 */function vI(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new N(C.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class vh{}class Us extends vh{}function Kn(n,e,...t){let r=[];e instanceof vh&&r.push(e),r=r.concat(t),function(i){const o=i.filter(u=>u instanceof Dr).length,c=i.filter(u=>u instanceof Bs).length;if(o>1||o>0&&c>0)throw new N(C.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)n=s._apply(n);return n}class Bs extends Us{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new Bs(e,t,r)}_apply(e){const t=this._parse(e);return SI(e._query,t),new Ve(e.firestore,e.converter,Fu(e._query,t))}_parse(e){const t=xr(e.firestore);return function(i,o,c,u,l,d,f){let m;if(l.isKeyField()){if(d==="array-contains"||d==="array-contains-any")throw new N(C.INVALID_ARGUMENT,`Invalid Query. You can't perform '${d}' queries on documentId().`);if(d==="in"||d==="not-in"){Yp(f,d);const b=[];for(const x of f)b.push(Jp(u,i,x));m={arrayValue:{values:b}}}else m=Jp(u,i,f)}else d!=="in"&&d!=="not-in"&&d!=="array-contains-any"||Yp(f,d),m=II(c,o,f,d==="in"||d==="not-in");return ne.create(l,d,m)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function Z0(n,e,t){const r=e,s=Yt("where",n);return Bs._create(s,r,t)}class Dr extends vh{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Dr(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:oe.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(s,i){let o=s;const c=i.getFlattenedFilters();for(const u of c)SI(o,u),o=Fu(o,u)}(e._query,t),new Ve(e.firestore,e.converter,Fu(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function ex(...n){return n.forEach(e=>RI("or",e)),Dr._create("or",n)}function tx(...n){return n.forEach(e=>RI("and",e)),Dr._create("and",n)}class mc extends Us{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new mc(e,t)}_apply(e){const t=function(s,i,o){if(s.startAt!==null)throw new N(C.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new N(C.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new qi(i,o)}(e._query,this._field,this._direction);return new Ve(e.firestore,e.converter,rR(e._query,t))}}function kr(n,e="asc"){const t=e,r=Yt("orderBy",n);return mc._create(r,t)}class ho extends Us{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new ho(e,t,r)}_apply(e){return new Ve(e.firestore,e.converter,wa(e._query,this._limit,this._limitType))}}function nx(n){return Qg("limit",n),ho._create("limit",n,"F")}function rx(n){return Qg("limitToLast",n),ho._create("limitToLast",n,"L")}class fo extends Us{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new fo(e,t,r)}_apply(e){const t=bI(e,this.type,this._docOrFields,this._inclusive);return new Ve(e.firestore,e.converter,sR(e._query,t))}}function sx(...n){return fo._create("startAt",n,!0)}function ix(...n){return fo._create("startAfter",n,!1)}class po extends Us{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new po(e,t,r)}_apply(e){const t=bI(e,this.type,this._docOrFields,this._inclusive);return new Ve(e.firestore,e.converter,iR(e._query,t))}}function ox(...n){return po._create("endBefore",n,!1)}function ax(...n){return po._create("endAt",n,!0)}function bI(n,e,t,r){if(t[0]=X(t[0]),t[0]instanceof Wi)return function(i,o,c,u,l){if(!u)throw new N(C.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${c}().`);const d=[];for(const f of Xr(i))if(f.field.isKeyField())d.push(mr(o,u.key));else{const m=u.data.field(f.field);if(Xa(m))throw new N(C.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+f.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(m===null){const I=f.field.canonicalString();throw new N(C.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${I}' (used as the orderBy) does not exist.`)}d.push(m)}return new Ln(d,l)}(n._query,n.firestore._databaseId,e,t[0]._document,r);{const s=xr(n.firestore);return function(o,c,u,l,d,f){const m=o.explicitOrderBy;if(d.length>m.length)throw new N(C.INVALID_ARGUMENT,`Too many arguments provided to ${l}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const I=[];for(let b=0;b<d.length;b++){const x=d[b];if(m[b].field.isKeyField()){if(typeof x!="string")throw new N(C.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${l}(), but got a ${typeof x}`);if(!Dl(o)&&x.indexOf("/")!==-1)throw new N(C.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${l}() must be a plain document ID, but '${x}' contains a slash.`);const D=o.path.child(Z.fromString(x));if(!L.isDocumentKey(D))throw new N(C.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${l}() must result in a valid document path, but '${D}' is not because it contains an odd number of segments.`);const O=new L(D);I.push(mr(c,O))}else{const D=II(u,l,x);I.push(D)}}return new Ln(I,f)}(n._query,n.firestore._databaseId,s,e,t,r)}}function Jp(n,e,t){if(typeof(t=X(t))=="string"){if(t==="")throw new N(C.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Dl(e)&&t.indexOf("/")!==-1)throw new N(C.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(Z.fromString(t));if(!L.isDocumentKey(r))throw new N(C.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return mr(n,new L(r))}if(t instanceof ae)return mr(n,t._key);throw new N(C.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Ha(t)}.`)}function Yp(n,e){if(!Array.isArray(n)||n.length===0)throw new N(C.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function SI(n,e){const t=function(s,i){for(const o of s)for(const c of o.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new N(C.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new N(C.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function RI(n,e){if(!(e instanceof Bs||e instanceof Dr))throw new N(C.INVALID_ARGUMENT,`Function ${n}() requires AppliableConstraints created with a call to 'where(...)', 'or(...)', or 'and(...)'.`)}function gc(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}class bh extends Ah{constructor(e){super(),this.firestore=e}convertBytes(e){return new et(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new ae(this.firestore,null,t)}}/**
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
 */function cx(n){return new bs("sum",Yt("sum",n))}function ux(n){return new bs("avg",Yt("average",n))}function PI(){return new bs("count")}function lx(n,e){var t,r;return n instanceof bs&&e instanceof bs&&n.aggregateType===e.aggregateType&&((t=n._internalFieldPath)==null?void 0:t.canonicalString())===((r=e._internalFieldPath)==null?void 0:r.canonicalString())}function hx(n,e){return ph(n.query,e.query)&&Tt(n.data(),e.data())}/**
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
 */function dx(n){return xI(n,{count:PI()})}function xI(n,e){const t=ee(n.firestore,ue),r=ye(t),s=d_(e,(i,o)=>new H_(o,i.aggregateType,i._internalFieldPath));return I0(r,n._query,s).then(i=>function(c,u,l){const d=new Hn(c);return new AI(u,d,l)}(t,n,i))}class fx{constructor(e){this.kind="memory",this._onlineComponentProvider=Fn.provider,this._offlineComponentProvider=e!=null&&e.garbageCollector?e.garbageCollector._offlineComponentProvider:{build:()=>new lh(void 0)}}toJSON(){return{kind:this.kind}}}class px{constructor(e){let t;this.kind="persistent",e!=null&&e.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=CI(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}class mx{constructor(){this.kind="memoryEager",this._offlineComponentProvider=As.provider}toJSON(){return{kind:this.kind}}}class gx{constructor(e){this.kind="memoryLru",this._offlineComponentProvider={build:()=>new lh(e)}}toJSON(){return{kind:this.kind}}}function _x(){return new mx}function yx(n){return new gx(n==null?void 0:n.cacheSizeBytes)}function Ix(n){return new fx(n)}function Ex(n){return new px(n)}class wx{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Fn.provider,this._offlineComponentProvider={build:t=>new hh(t,e==null?void 0:e.cacheSizeBytes,this.forceOwnership)}}}class Tx{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Fn.provider,this._offlineComponentProvider={build:t=>new eI(t,e==null?void 0:e.cacheSizeBytes)}}}function CI(n){return new wx(n==null?void 0:n.forceOwnership)}function Ax(){return new Tx}/**
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
 */const DI="NOT SUPPORTED";class zt{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class ot extends Wi{constructor(e,t,r,s,i,o){super(e,t,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new xi(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(Yt("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new N(C.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=ot._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}function vx(n,e,t){if(Sr(e,ot._jsonSchema)){if(e.bundle===DI)throw new N(C.INVALID_ARGUMENT,"The provided JSON object was created in a client environment, which is not supported.");const r=Rr(n._databaseId),s=oI(e.bundle,r),i=s.Qu(),o=new sh(s.getMetadata(),r);for(const d of i)o.Ga(d);const c=o.documents;if(c.length!==1)throw new N(C.INVALID_ARGUMENT,`Expected bundle data to contain 1 document, but it contains ${c.length} documents.`);const u=rc(r,c[0].document),l=new L(Z.fromString(e.bundleName));return new ot(n,new bh(n),l,u,new zt(!1,!1),t||null)}}ot._jsonSchemaVersion="firestore/documentSnapshot/1.0",ot._jsonSchema={type:Re("string",ot._jsonSchemaVersion),bundleSource:Re("string","DocumentSnapshot"),bundleName:Re("string"),bundle:Re("string")};class xi extends ot{data(e={}){return super.data(e)}}class at{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new zt(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new xi(this._firestore,this._userDataWriter,r.key,r,new zt(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new N(C.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map(c=>{const u=new xi(s._firestore,s._userDataWriter,c.doc.key,c.doc,new zt(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}})}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(c=>i||c.type!==3).map(c=>{const u=new xi(s._firestore,s._userDataWriter,c.doc.key,c.doc,new zt(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let l=-1,d=-1;return c.type!==0&&(l=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),d=o.indexOf(c.doc.key)),{type:Sx(c.type),doc:u,oldIndex:l,newIndex:d}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new N(C.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=at._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Wa.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach(i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function bx(n,e,t){if(Sr(e,at._jsonSchema)){if(e.bundle===DI)throw new N(C.INVALID_ARGUMENT,"The provided JSON object was created in a client environment, which is not supported.");const r=Rr(n._databaseId),s=oI(e.bundle,r),i=s.Qu(),o=new sh(s.getMetadata(),r);for(const m of i)o.Ga(m);if(o.queries.length!==1)throw new N(C.INVALID_ARGUMENT,`Snapshot data expected 1 query but found ${o.queries.length} queries.`);const c=ic(o.queries[0].bundledQuery),u=o.documents;let l=new hr;u.map(m=>{const I=rc(r,m.document);l=l.add(I)});const d=Ar.fromInitialDocuments(c,l,J(),!1,!1),f=new Ve(n,t||null,c);return new at(n,new bh(n),f,d)}}function Sx(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return j(61501,{type:n})}}function Rx(n,e){return n instanceof ot&&e instanceof ot?n._firestore===e._firestore&&n._key.isEqual(e._key)&&(n._document===null?e._document===null:n._document.isEqual(e._document))&&n._converter===e._converter:n instanceof at&&e instanceof at&&n._firestore===e._firestore&&ph(n.query,e.query)&&n.metadata.isEqual(e.metadata)&&n._snapshot.isEqual(e._snapshot)}/**
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
 */at._jsonSchemaVersion="firestore/querySnapshot/1.0",at._jsonSchema={type:Re("string",at._jsonSchemaVersion),bundleSource:Re("string","QuerySnapshot"),bundleName:Re("string"),bundle:Re("string")};const Px={maxAttempts:5};/**
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
 */class kI{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=xr(e)}set(e,t,r){this._verifyNotCommitted();const s=Sn(e,this._firestore),i=gc(s.converter,t,r),o=pc(this._dataReader,"WriteBatch.set",s._key,i,s.converter!==null,r);return this._mutations.push(o.toMutation(s._key,ge.none())),this}update(e,t,r,...s){this._verifyNotCommitted();const i=Sn(e,this._firestore);let o;return o=typeof(t=X(t))=="string"||t instanceof Pr?Eh(this._dataReader,"WriteBatch.update",i._key,t,r,s):Ih(this._dataReader,"WriteBatch.update",i._key,t),this._mutations.push(o.toMutation(i._key,ge.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=Sn(e,this._firestore);return this._mutations=this._mutations.concat(new Ns(t._key,ge.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new N(C.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Sn(n,e){if((n=X(n)).firestore!==e)throw new N(C.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}/**
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
 */class xx{constructor(e,t){this._firestore=e,this._transaction=t,this._dataReader=xr(e)}get(e){const t=Sn(e,this._firestore),r=new bh(this._firestore);return this._transaction.lookup([t._key]).then(s=>{if(!s||s.length!==1)return j(24041);const i=s[0];if(i.isFoundDocument())return new Wi(this._firestore,r,i.key,i,t.converter);if(i.isNoDocument())return new Wi(this._firestore,r,t._key,null,t.converter);throw j(18433,{doc:i})})}set(e,t,r){const s=Sn(e,this._firestore),i=gc(s.converter,t,r),o=pc(this._dataReader,"Transaction.set",s._key,i,s.converter!==null,r);return this._transaction.set(s._key,o),this}update(e,t,r,...s){const i=Sn(e,this._firestore);let o;return o=typeof(t=X(t))=="string"||t instanceof Pr?Eh(this._dataReader,"Transaction.update",i._key,t,r,s):Ih(this._dataReader,"Transaction.update",i._key,t),this._transaction.update(i._key,o),this}delete(e){const t=Sn(e,this._firestore);return this._transaction.delete(t._key),this}}/**
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
 */class NI extends xx{constructor(e,t){super(e,t),this._firestore=e}get(e){const t=Sn(e,this._firestore),r=new Hn(this._firestore);return super.get(e).then(s=>new ot(this._firestore,r,t._key,s._document,new zt(!1,!1),t.converter))}}function Cx(n,e,t){n=ee(n,ue);const r={...Px,...t};(function(o){if(o.maxAttempts<1)throw new N(C.INVALID_ARGUMENT,"Max attempts must be at least 1")})(r);const s=ye(n);return T0(s,i=>e(new NI(n,i)),r)}/**
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
 */function Nr(n){n=ee(n,ae);const e=ee(n.firestore,ue),t=ye(e);return sI(t,n._key).then(r=>Rh(e,n,r))}function Dx(n){n=ee(n,ae);const e=ee(n.firestore,ue),t=ye(e),r=new Hn(e);return _0(t,n._key).then(s=>new ot(e,r,n._key,s,new zt(s!==null&&s.hasLocalMutations,!0),n.converter))}function kx(n){n=ee(n,ae);const e=ee(n.firestore,ue),t=ye(e);return sI(t,n._key,{source:"server"}).then(r=>Rh(e,n,r))}function Da(n){n=ee(n,Ve);const e=ee(n.firestore,ue),t=ye(e),r=new Hn(e);return vI(n._query),iI(t,n._query).then(s=>new at(e,r,n,s))}function Nx(n){n=ee(n,Ve);const e=ee(n.firestore,ue),t=ye(e),r=new Hn(e);return y0(t,n._query).then(s=>new at(e,r,n,s))}function Vx(n){n=ee(n,Ve);const e=ee(n.firestore,ue),t=ye(e),r=new Hn(e);return iI(t,n._query,{source:"server"}).then(s=>new at(e,r,n,s))}function wt(n,e,t){n=ee(n,ae);const r=ee(n.firestore,ue),s=gc(n.converter,e,t),i=xr(r);return js(r,[pc(i,"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,ge.none())])}function Bn(n,e,t,...r){n=ee(n,ae);const s=ee(n.firestore,ue),i=xr(s);let o;return o=typeof(e=X(e))=="string"||e instanceof Pr?Eh(i,"updateDoc",n._key,e,t,r):Ih(i,"updateDoc",n._key,e),js(s,[o.toMutation(n._key,ge.exists(!0))])}function _c(n){return js(ee(n.firestore,ue),[new Ns(n._key,ge.none())])}function Sh(n,e){const t=ee(n.firestore,ue),r=we(n),s=gc(n.converter,e),i=xr(n.firestore);return js(t,[pc(i,"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,ge.exists(!1))]).then(()=>r)}function Xt(n,...e){var l,d,f;n=X(n);let t={includeMetadataChanges:!1,source:"default"},r=0;typeof e[r]!="object"||es(e[r])||(t=e[r++]);const s={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(es(e[r])){const m=e[r];e[r]=(l=m.next)==null?void 0:l.bind(m),e[r+1]=(d=m.error)==null?void 0:d.bind(m),e[r+2]=(f=m.complete)==null?void 0:f.bind(m)}let i,o,c;if(n instanceof ae)o=ee(n.firestore,ue),c=Ds(n._key.path),i={next:m=>{e[r]&&e[r](Rh(o,n,m))},error:e[r+1],complete:e[r+2]};else{const m=ee(n,Ve);o=ee(m.firestore,ue),c=m._query;const I=new Hn(o);i={next:b=>{e[r]&&e[r](new at(o,I,m,b))},error:e[r+1],complete:e[r+2]},vI(n._query)}const u=ye(o);return g0(u,c,s,i)}function Ox(n,e,...t){const r=X(n),s=function(u){const l={bundle:"",bundleName:"",bundleSource:""},d=["bundle","bundleName","bundleSource"];for(const f of d){if(!(f in u)){l.error=`snapshotJson missing required field: ${f}`;break}const m=u[f];if(typeof m!="string"){l.error=`snapshotJson field '${f}' must be a string.`;break}if(m.length===0){l.error=`snapshotJson field '${f}' cannot be an empty string.`;break}f==="bundle"?l.bundle=m:f==="bundleName"?l.bundleName=m:f==="bundleSource"&&(l.bundleSource=m)}return l}(e);if(s.error)throw new N(C.INVALID_ARGUMENT,s.error);let i,o=0;if(typeof t[o]!="object"||es(t[o])||(i=t[o++]),s.bundleSource==="QuerySnapshot"){let c=null;if(typeof t[o]=="object"&&es(t[o])){const u=t[o++];c={next:u.next,error:u.error,complete:u.complete}}else c={next:t[o++],error:t[o++],complete:t[o++]};return function(l,d,f,m,I){let b,x=!1;return Yu(l,d.bundle).then(()=>mI(l,d.bundleName)).then(O=>{O&&!x&&(I&&O.withConverter(I),b=Xt(O,f||{},m))}).catch(O=>(m.error&&m.error(O),()=>{})),()=>{x||(x=!0,b&&b())}}(r,s,i,c,t[o])}if(s.bundleSource==="DocumentSnapshot"){let c=null;if(typeof t[o]=="object"&&es(t[o])){const u=t[o++];c={next:u.next,error:u.error,complete:u.complete}}else c={next:t[o++],error:t[o++],complete:t[o++]};return function(l,d,f,m,I){let b,x=!1;return Yu(l,d.bundle).then(()=>{if(!x){const O=new ae(l,I||null,L.fromPath(d.bundleName));b=Xt(O,f||{},m)}}).catch(O=>(m.error&&m.error(O),()=>{})),()=>{x||(x=!0,b&&b())}}(r,s,i,c,t[o])}throw new N(C.INVALID_ARGUMENT,`unsupported bundle source: ${s.bundleSource}`)}function Lx(n,e){n=ee(n,ue);const t=ye(n),r=es(e)?e:{next:e};return w0(t,r)}function js(n,e){const t=ye(n);return E0(t,e)}function Rh(n,e,t){const r=t.docs.get(e._key),s=new Hn(n);return new ot(n,s,e._key,r,new zt(t.hasPendingWrites,t.fromCache),e.converter)}function Mx(n){return n=ee(n,ue),ye(n),new kI(n,e=>js(n,e))}/**
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
 */function Fx(n,e){n=ee(n,ue);const t=ye(n);if(!t._uninitializedComponentsProvider||t._uninitializedComponentsProvider._offline.kind==="memory")return ct("Cannot enable indexes when persistence is disabled"),Promise.resolve();const r=function(i){const o=typeof i=="string"?function(l){try{return JSON.parse(l)}catch(d){throw new N(C.INVALID_ARGUMENT,"Failed to parse JSON: "+(d==null?void 0:d.message))}}(i):i,c=[];if(Array.isArray(o.indexes))for(const u of o.indexes){const l=Xp(u,"collectionGroup"),d=[];if(Array.isArray(u.fields))for(const f of u.fields){const m=Xp(f,"fieldPath"),I=Th("setIndexConfiguration",m);f.arrayConfig==="CONTAINS"?d.push(new ur(I,2)):f.order==="ASCENDING"?d.push(new ur(I,0)):f.order==="DESCENDING"&&d.push(new ur(I,1))}c.push(new as(as.UNKNOWN_ID,l,d,cs.empty()))}return c}(e);return b0(t,r)}function Xp(n,e){if(typeof n[e]!="string")throw new N(C.INVALID_ARGUMENT,"Missing string value for: "+e);return n[e]}/**
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
 */class VI{constructor(e){this._firestore=e,this.type="PersistentCacheIndexManager"}}function Ux(n){var s;n=ee(n,ue);const e=Zp.get(n);if(e)return e;if(((s=ye(n)._uninitializedComponentsProvider)==null?void 0:s._offline.kind)!=="persistent")return null;const r=new VI(n);return Zp.set(n,r),r}function Bx(n){OI(n,!0)}function jx(n){OI(n,!1)}function Gx(n){const e=ye(n._firestore);R0(e).then(t=>V("deleting all persistent cache indexes succeeded")).catch(t=>ct("deleting all persistent cache indexes failed",t))}function OI(n,e){const t=ye(n._firestore);S0(t,e).then(r=>V(`setting persistent cache index auto creation isEnabled=${e} succeeded`)).catch(r=>ct(`setting persistent cache index auto creation isEnabled=${e} failed`,r))}const Zp=new WeakMap;/**
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
 */class qx{constructor(){throw new Error("instances of this class should not be created")}static onExistenceFilterMismatch(e){return Ph.instance.onExistenceFilterMismatch(e)}}class Ph{constructor(){this.t=new Map}static get instance(){return Go||(Go=new Ph,yR(Go)),Go}o(e){this.t.forEach(t=>t(e))}onExistenceFilterMismatch(e){const t=Symbol(),r=this.t;return r.set(t,e),()=>r.delete(t)}}let Go=null;(function(e,t=!0){Yb(br),Ft(new At("firestore",(r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),c=new ue(new tS(r.getProvider("auth-internal")),new sS(o,r.getProvider("app-check-internal")),zS(o,s),o);return i={useFetchStreams:t,...i},c._setSettings(i),c},"PUBLIC").setMultipleInstances(!0)),dt(Kp,Qp,e),dt(Kp,Qp,"esm2020")})();const xh=Object.freeze(Object.defineProperty({__proto__:null,AbstractUserDataWriter:Ah,AggregateField:bs,AggregateQuerySnapshot:AI,Bytes:et,CACHE_SIZE_UNLIMITED:k0,CollectionReference:It,DocumentReference:ae,DocumentSnapshot:ot,FieldPath:Pr,FieldValue:Wn,Firestore:ue,FirestoreError:N,GeoPoint:Et,LoadBundleTask:lI,PersistentCacheIndexManager:VI,Query:Ve,QueryCompositeFilterConstraint:Dr,QueryConstraint:Us,QueryDocumentSnapshot:xi,QueryEndAtConstraint:po,QueryFieldFilterConstraint:Bs,QueryLimitConstraint:ho,QueryOrderByConstraint:mc,QuerySnapshot:at,QueryStartAtConstraint:fo,SnapshotMetadata:zt,Timestamp:ie,Transaction:NI,VectorValue:ft,WriteBatch:kI,_AutoId:Wa,_ByteString:Ie,_DatabaseId:Nn,_DocumentKey:L,_EmptyAppCheckTokenProvider:iS,_EmptyAuthCredentialsProvider:zg,_FieldPath:pe,_TestingHooks:qx,_cast:ee,_debugAssert:Zb,_internalAggregationQueryToProtoRunAggregationQueryRequest:Y0,_internalQueryToProtoQueryTarget:J0,_isBase64Available:GS,_logWarn:ct,_validateIsNotUsedTogether:Hg,addDoc:Sh,aggregateFieldEqual:lx,aggregateQuerySnapshotEqual:hx,and:tx,arrayRemove:H0,arrayUnion:W0,average:ux,clearIndexedDbPersistence:O0,collection:mt,collectionGroup:C0,connectFirestoreEmulator:uI,count:PI,deleteAllPersistentCacheIndexes:Gx,deleteDoc:_c,deleteField:z0,disableNetwork:F0,disablePersistentCacheIndexAutoCreation:jx,doc:we,documentId:B0,documentSnapshotFromJSON:vx,enableIndexedDbPersistence:V0,enableMultiTabIndexedDbPersistence:fI,enableNetwork:M0,enablePersistentCacheIndexAutoCreation:Bx,endAt:ax,endBefore:ox,ensureFirestoreConfigured:ye,executeWrite:js,getAggregateFromServer:xI,getCountFromServer:dx,getDoc:Nr,getDocFromCache:Dx,getDocFromServer:kx,getDocs:Da,getDocsFromCache:Nx,getDocsFromServer:Vx,getFirestore:hI,getPersistentCacheIndexManager:Ux,increment:K0,initializeFirestore:N0,limit:nx,limitToLast:rx,loadBundle:Yu,memoryEagerGarbageCollector:_x,memoryLocalCache:Ix,memoryLruGarbageCollector:yx,namedQuery:mI,onSnapshot:Xt,onSnapshotResume:Ox,onSnapshotsInSync:Lx,or:ex,orderBy:kr,persistentLocalCache:Ex,persistentMultipleTabManager:Ax,persistentSingleTabManager:CI,query:Kn,queryEqual:ph,querySnapshotFromJSON:bx,refEqual:D0,runTransaction:Cx,serverTimestamp:Dn,setDoc:wt,setIndexConfiguration:Fx,setLogLevel:Xb,snapshotEqual:Rx,startAfter:ix,startAt:sx,sum:cx,terminate:U0,updateDoc:Bn,vector:Q0,waitForPendingWrites:L0,where:Z0,writeBatch:Mx},Symbol.toStringTag,{value:"Module"}));/**
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
 */const LI="firebasestorage.googleapis.com",MI="storageBucket",$x=2*60*1e3,zx=10*60*1e3;/**
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
 */class Ae extends bt{constructor(e,t,r=0){super(cu(e),`Firebase Storage: ${t} (${cu(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,Ae.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return cu(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var Te;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(Te||(Te={}));function cu(n){return"storage/"+n}function Ch(){const n="An unknown error occurred, please check the error payload for server response.";return new Ae(Te.UNKNOWN,n)}function Wx(n){return new Ae(Te.OBJECT_NOT_FOUND,"Object '"+n+"' does not exist.")}function Hx(n){return new Ae(Te.QUOTA_EXCEEDED,"Quota for bucket '"+n+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function Kx(){const n="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new Ae(Te.UNAUTHENTICATED,n)}function Qx(){return new Ae(Te.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function Jx(n){return new Ae(Te.UNAUTHORIZED,"User does not have permission to access '"+n+"'.")}function Yx(){return new Ae(Te.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function Xx(){return new Ae(Te.CANCELED,"User canceled the upload/download.")}function Zx(n){return new Ae(Te.INVALID_URL,"Invalid URL '"+n+"'.")}function eC(n){return new Ae(Te.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function tC(){return new Ae(Te.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+MI+"' property when initializing the app?")}function nC(){return new Ae(Te.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function rC(){return new Ae(Te.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function sC(n){return new Ae(Te.UNSUPPORTED_ENVIRONMENT,`${n} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function Xu(n){return new Ae(Te.INVALID_ARGUMENT,n)}function FI(){return new Ae(Te.APP_DELETED,"The Firebase app was deleted.")}function iC(n){return new Ae(Te.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function Ci(n,e){return new Ae(Te.INVALID_FORMAT,"String does not match format '"+n+"': "+e)}function di(n){throw new Ae(Te.INTERNAL_ERROR,"Internal error: "+n)}/**
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
 */class ht{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let r;try{r=ht.makeFromUrl(e,t)}catch{return new ht(e,"")}if(r.path==="")return r;throw eC(e)}static makeFromUrl(e,t){let r=null;const s="([A-Za-z0-9.\\-_]+)";function i(z){z.path.charAt(z.path.length-1)==="/"&&(z.path_=z.path_.slice(0,-1))}const o="(/(.*))?$",c=new RegExp("^gs://"+s+o,"i"),u={bucket:1,path:3};function l(z){z.path_=decodeURIComponent(z.path)}const d="v[A-Za-z0-9_]+",f=t.replace(/[.]/g,"\\."),m="(/([^?#]*).*)?$",I=new RegExp(`^https?://${f}/${d}/b/${s}/o${m}`,"i"),b={bucket:1,path:3},x=t===LI?"(?:storage.googleapis.com|storage.cloud.google.com)":t,D="([^?#]*)",O=new RegExp(`^https?://${x}/${s}/${D}`,"i"),U=[{regex:c,indices:u,postModify:i},{regex:I,indices:b,postModify:l},{regex:O,indices:{bucket:1,path:2},postModify:l}];for(let z=0;z<U.length;z++){const W=U[z],Q=W.regex.exec(e);if(Q){const T=Q[W.indices.bucket];let y=Q[W.indices.path];y||(y=""),r=new ht(T,y),W.postModify(r);break}}if(r==null)throw Zx(e);return r}}class oC{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
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
 */function aC(n,e,t){let r=1,s=null,i=null,o=!1,c=0;function u(){return c===2}let l=!1;function d(...D){l||(l=!0,e.apply(null,D))}function f(D){s=setTimeout(()=>{s=null,n(I,u())},D)}function m(){i&&clearTimeout(i)}function I(D,...O){if(l){m();return}if(D){m(),d.call(null,D,...O);return}if(u()||o){m(),d.call(null,D,...O);return}r<64&&(r*=2);let U;c===1?(c=2,U=0):U=(r+Math.random())*1e3,f(U)}let b=!1;function x(D){b||(b=!0,m(),!l&&(s!==null?(D||(c=2),clearTimeout(s),f(0)):D||(c=1)))}return f(0),i=setTimeout(()=>{o=!0,x(!0)},t),x}function cC(n){n(!1)}/**
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
 */function uC(n){return n!==void 0}function lC(n){return typeof n=="object"&&!Array.isArray(n)}function Dh(n){return typeof n=="string"||n instanceof String}function em(n){return kh()&&n instanceof Blob}function kh(){return typeof Blob<"u"}function tm(n,e,t,r){if(r<e)throw Xu(`Invalid value for '${n}'. Expected ${e} or greater.`);if(r>t)throw Xu(`Invalid value for '${n}'. Expected ${t} or less.`)}/**
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
 */function yc(n,e,t){let r=e;return t==null&&(r=`https://${e}`),`${t}://${r}/v0${n}`}function UI(n){const e=encodeURIComponent;let t="?";for(const r in n)if(n.hasOwnProperty(r)){const s=e(r)+"="+e(n[r]);t=t+s+"&"}return t=t.slice(0,-1),t}var dr;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(dr||(dr={}));/**
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
 */function hC(n,e){const t=n>=500&&n<600,s=[408,429].indexOf(n)!==-1,i=e.indexOf(n)!==-1;return t||s||i}/**
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
 */class dC{constructor(e,t,r,s,i,o,c,u,l,d,f,m=!0,I=!1){this.url_=e,this.method_=t,this.headers_=r,this.body_=s,this.successCodes_=i,this.additionalRetryCodes_=o,this.callback_=c,this.errorCallback_=u,this.timeout_=l,this.progressCallback_=d,this.connectionFactory_=f,this.retry=m,this.isUsingEmulator=I,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((b,x)=>{this.resolve_=b,this.reject_=x,this.start_()})}start_(){const e=(r,s)=>{if(s){r(!1,new qo(!1,null,!0));return}const i=this.connectionFactory_();this.pendingConnection_=i;const o=c=>{const u=c.loaded,l=c.lengthComputable?c.total:-1;this.progressCallback_!==null&&this.progressCallback_(u,l)};this.progressCallback_!==null&&i.addUploadProgressListener(o),i.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&i.removeUploadProgressListener(o),this.pendingConnection_=null;const c=i.getErrorCode()===dr.NO_ERROR,u=i.getStatus();if(!c||hC(u,this.additionalRetryCodes_)&&this.retry){const d=i.getErrorCode()===dr.ABORT;r(!1,new qo(!1,null,d));return}const l=this.successCodes_.indexOf(u)!==-1;r(!0,new qo(l,i))})},t=(r,s)=>{const i=this.resolve_,o=this.reject_,c=s.connection;if(s.wasSuccessCode)try{const u=this.callback_(c,c.getResponse());uC(u)?i(u):i()}catch(u){o(u)}else if(c!==null){const u=Ch();u.serverResponse=c.getErrorText(),this.errorCallback_?o(this.errorCallback_(c,u)):o(u)}else if(s.canceled){const u=this.appDelete_?FI():Xx();o(u)}else{const u=Yx();o(u)}};this.canceled_?t(!1,new qo(!1,null,!0)):this.backoffId_=aC(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&cC(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class qo{constructor(e,t,r){this.wasSuccessCode=e,this.connection=t,this.canceled=!!r}}function fC(n,e){e!==null&&e.length>0&&(n.Authorization="Firebase "+e)}function pC(n,e){n["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function mC(n,e){e&&(n["X-Firebase-GMPID"]=e)}function gC(n,e){e!==null&&(n["X-Firebase-AppCheck"]=e)}function _C(n,e,t,r,s,i,o=!0,c=!1){const u=UI(n.urlParams),l=n.url+u,d=Object.assign({},n.headers);return mC(d,e),fC(d,t),pC(d,i),gC(d,r),new dC(l,n.method,d,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,s,o,c)}/**
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
 */function yC(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function IC(...n){const e=yC();if(e!==void 0){const t=new e;for(let r=0;r<n.length;r++)t.append(n[r]);return t.getBlob()}else{if(kh())return new Blob(n);throw new Ae(Te.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function EC(n,e,t){return n.webkitSlice?n.webkitSlice(e,t):n.mozSlice?n.mozSlice(e,t):n.slice?n.slice(e,t):null}/**
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
 */function wC(n){if(typeof atob>"u")throw sC("base-64");return atob(n)}/**
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
 */const kt={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class uu{constructor(e,t){this.data=e,this.contentType=t||null}}function TC(n,e){switch(n){case kt.RAW:return new uu(BI(e));case kt.BASE64:case kt.BASE64URL:return new uu(jI(n,e));case kt.DATA_URL:return new uu(vC(e),bC(e))}throw Ch()}function BI(n){const e=[];for(let t=0;t<n.length;t++){let r=n.charCodeAt(t);if(r<=127)e.push(r);else if(r<=2047)e.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(t<n.length-1&&(n.charCodeAt(t+1)&64512)===56320))e.push(239,191,189);else{const i=r,o=n.charCodeAt(++t);r=65536|(i&1023)<<10|o&1023,e.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?e.push(239,191,189):e.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(e)}function AC(n){let e;try{e=decodeURIComponent(n)}catch{throw Ci(kt.DATA_URL,"Malformed data URL.")}return BI(e)}function jI(n,e){switch(n){case kt.BASE64:{const s=e.indexOf("-")!==-1,i=e.indexOf("_")!==-1;if(s||i)throw Ci(n,"Invalid character '"+(s?"-":"_")+"' found: is it base64url encoded?");break}case kt.BASE64URL:{const s=e.indexOf("+")!==-1,i=e.indexOf("/")!==-1;if(s||i)throw Ci(n,"Invalid character '"+(s?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let t;try{t=wC(e)}catch(s){throw s.message.includes("polyfill")?s:Ci(n,"Invalid character found")}const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}class GI{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(t===null)throw Ci(kt.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=t[1]||null;r!=null&&(this.base64=SC(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=e.substring(e.indexOf(",")+1)}}function vC(n){const e=new GI(n);return e.base64?jI(kt.BASE64,e.rest):AC(e.rest)}function bC(n){return new GI(n).contentType}function SC(n,e){return n.length>=e.length?n.substring(n.length-e.length)===e:!1}/**
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
 */class An{constructor(e,t){let r=0,s="";em(e)?(this.data_=e,r=e.size,s=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=s}size(){return this.size_}type(){return this.type_}slice(e,t){if(em(this.data_)){const r=this.data_,s=EC(r,e,t);return s===null?null:new An(s)}else{const r=new Uint8Array(this.data_.buffer,e,t-e);return new An(r,!0)}}static getBlob(...e){if(kh()){const t=e.map(r=>r instanceof An?r.data_:r);return new An(IC.apply(null,t))}else{const t=e.map(o=>Dh(o)?TC(kt.RAW,o).data:o.data_);let r=0;t.forEach(o=>{r+=o.byteLength});const s=new Uint8Array(r);let i=0;return t.forEach(o=>{for(let c=0;c<o.length;c++)s[i++]=o[c]}),new An(s,!0)}}uploadData(){return this.data_}}/**
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
 */function qI(n){let e;try{e=JSON.parse(n)}catch{return null}return lC(e)?e:null}/**
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
 */function RC(n){if(n.length===0)return null;const e=n.lastIndexOf("/");return e===-1?"":n.slice(0,e)}function PC(n,e){const t=e.split("/").filter(r=>r.length>0).join("/");return n.length===0?t:n+"/"+t}function $I(n){const e=n.lastIndexOf("/",n.length-2);return e===-1?n:n.slice(e+1)}/**
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
 */function xC(n,e){return e}class Ye{constructor(e,t,r,s){this.server=e,this.local=t||e,this.writable=!!r,this.xform=s||xC}}let $o=null;function CC(n){return!Dh(n)||n.length<2?n:$I(n)}function zI(){if($o)return $o;const n=[];n.push(new Ye("bucket")),n.push(new Ye("generation")),n.push(new Ye("metageneration")),n.push(new Ye("name","fullPath",!0));function e(i,o){return CC(o)}const t=new Ye("name");t.xform=e,n.push(t);function r(i,o){return o!==void 0?Number(o):o}const s=new Ye("size");return s.xform=r,n.push(s),n.push(new Ye("timeCreated")),n.push(new Ye("updated")),n.push(new Ye("md5Hash",null,!0)),n.push(new Ye("cacheControl",null,!0)),n.push(new Ye("contentDisposition",null,!0)),n.push(new Ye("contentEncoding",null,!0)),n.push(new Ye("contentLanguage",null,!0)),n.push(new Ye("contentType",null,!0)),n.push(new Ye("metadata","customMetadata",!0)),$o=n,$o}function DC(n,e){function t(){const r=n.bucket,s=n.fullPath,i=new ht(r,s);return e._makeStorageReference(i)}Object.defineProperty(n,"ref",{get:t})}function kC(n,e,t){const r={};r.type="file";const s=t.length;for(let i=0;i<s;i++){const o=t[i];r[o.local]=o.xform(r,e[o.server])}return DC(r,n),r}function WI(n,e,t){const r=qI(e);return r===null?null:kC(n,r,t)}function NC(n,e,t,r){const s=qI(e);if(s===null||!Dh(s.downloadTokens))return null;const i=s.downloadTokens;if(i.length===0)return null;const o=encodeURIComponent;return i.split(",").map(l=>{const d=n.bucket,f=n.fullPath,m="/b/"+o(d)+"/o/"+o(f),I=yc(m,t,r),b=UI({alt:"media",token:l});return I+b})[0]}function VC(n,e){const t={},r=e.length;for(let s=0;s<r;s++){const i=e[s];i.writable&&(t[i.server]=n[i.local])}return JSON.stringify(t)}class Nh{constructor(e,t,r,s){this.url=e,this.method=t,this.handler=r,this.timeout=s,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
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
 */function HI(n){if(!n)throw Ch()}function OC(n,e){function t(r,s){const i=WI(n,s,e);return HI(i!==null),i}return t}function LC(n,e){function t(r,s){const i=WI(n,s,e);return HI(i!==null),NC(i,s,n.host,n._protocol)}return t}function KI(n){function e(t,r){let s;return t.getStatus()===401?t.getErrorText().includes("Firebase App Check token is invalid")?s=Qx():s=Kx():t.getStatus()===402?s=Hx(n.bucket):t.getStatus()===403?s=Jx(n.path):s=r,s.status=t.getStatus(),s.serverResponse=r.serverResponse,s}return e}function QI(n){const e=KI(n);function t(r,s){let i=e(r,s);return r.getStatus()===404&&(i=Wx(n.path)),i.serverResponse=s.serverResponse,i}return t}function MC(n,e,t){const r=e.fullServerUrl(),s=yc(r,n.host,n._protocol),i="GET",o=n.maxOperationRetryTime,c=new Nh(s,i,LC(n,t),o);return c.errorHandler=QI(e),c}function FC(n,e){const t=e.fullServerUrl(),r=yc(t,n.host,n._protocol),s="DELETE",i=n.maxOperationRetryTime;function o(u,l){}const c=new Nh(r,s,o,i);return c.successCodes=[200,204],c.errorHandler=QI(e),c}function UC(n,e){return n&&n.contentType||e&&e.type()||"application/octet-stream"}function BC(n,e,t){const r=Object.assign({},t);return r.fullPath=n.path,r.size=e.size(),r.contentType||(r.contentType=UC(null,e)),r}function jC(n,e,t,r,s){const i=e.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function c(){let U="";for(let z=0;z<2;z++)U=U+Math.random().toString().slice(2);return U}const u=c();o["Content-Type"]="multipart/related; boundary="+u;const l=BC(e,r,s),d=VC(l,t),f="--"+u+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+d+`\r
--`+u+`\r
Content-Type: `+l.contentType+`\r
\r
`,m=`\r
--`+u+"--",I=An.getBlob(f,r,m);if(I===null)throw nC();const b={name:l.fullPath},x=yc(i,n.host,n._protocol),D="POST",O=n.maxUploadRetryTime,B=new Nh(x,D,OC(n,t),O);return B.urlParams=b,B.headers=o,B.body=I.uploadData(),B.errorHandler=KI(e),B}class GC{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=dr.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=dr.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=dr.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,r,s,i){if(this.sent_)throw di("cannot .send() more than once");if(Bt(e)&&r&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(t,e,!0),i!==void 0)for(const o in i)i.hasOwnProperty(o)&&this.xhr_.setRequestHeader(o,i[o].toString());return s!==void 0?this.xhr_.send(s):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw di("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw di("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw di("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw di("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class qC extends GC{initXhr(){this.xhr_.responseType="text"}}function Vh(){return new qC}/**
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
 */class vr{constructor(e,t){this._service=e,t instanceof ht?this._location=t:this._location=ht.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new vr(e,t)}get root(){const e=new ht(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return $I(this._location.path)}get storage(){return this._service}get parent(){const e=RC(this._location.path);if(e===null)return null;const t=new ht(this._location.bucket,e);return new vr(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw iC(e)}}function $C(n,e,t){n._throwIfRoot("uploadBytes");const r=jC(n.storage,n._location,zI(),new An(e,!0),t);return n.storage.makeRequestWithTokens(r,Vh).then(s=>({metadata:s,ref:n}))}function zC(n){n._throwIfRoot("getDownloadURL");const e=MC(n.storage,n._location,zI());return n.storage.makeRequestWithTokens(e,Vh).then(t=>{if(t===null)throw rC();return t})}function WC(n){n._throwIfRoot("deleteObject");const e=FC(n.storage,n._location);return n.storage.makeRequestWithTokens(e,Vh)}function HC(n,e){const t=PC(n._location.path,e),r=new ht(n._location.bucket,t);return new vr(n.storage,r)}/**
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
 */function KC(n){return/^[A-Za-z]+:\/\//.test(n)}function QC(n,e){return new vr(n,e)}function JI(n,e){if(n instanceof Oh){const t=n;if(t._bucket==null)throw tC();const r=new vr(t,t._bucket);return e!=null?JI(r,e):r}else return e!==void 0?HC(n,e):n}function JC(n,e){if(e&&KC(e)){if(n instanceof Oh)return QC(n,e);throw Xu("To use ref(service, url), the first argument must be a Storage instance.")}else return JI(n,e)}function nm(n,e){const t=e==null?void 0:e[MI];return t==null?null:ht.makeFromBucketSpec(t,n)}function YC(n,e,t,r={}){n.host=`${e}:${t}`;const s=Bt(e);s&&Ki(`https://${n.host}/b`),n._isUsingEmulator=!0,n._protocol=s?"https":"http";const{mockUserToken:i}=r;i&&(n._overrideAuthToken=typeof i=="string"?i:Nm(i,n.app.options.projectId))}class Oh{constructor(e,t,r,s,i,o=!1){this.app=e,this._authProvider=t,this._appCheckProvider=r,this._url=s,this._firebaseVersion=i,this._isUsingEmulator=o,this._bucket=null,this._host=LI,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=$x,this._maxUploadRetryTime=zx,this._requests=new Set,s!=null?this._bucket=ht.makeFromBucketSpec(s,this._host):this._bucket=nm(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=ht.makeFromBucketSpec(this._url,e):this._bucket=nm(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){tm("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){tm("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){if(Ze(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new vr(this,e)}_makeRequest(e,t,r,s,i=!0){if(this._deleted)return new oC(FI());{const o=_C(e,this._appId,r,s,t,this._firebaseVersion,i,this._isUsingEmulator);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,t){const[r,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,r,s).getPromise()}}const rm="@firebase/storage",sm="0.14.2";/**
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
 */const YI="storage";function WN(n,e,t){return n=X(n),$C(n,e,t)}function HN(n){return n=X(n),zC(n)}function XI(n){return n=X(n),WC(n)}function ZI(n,e){return n=X(n),JC(n,e)}function XC(n=Qi(),e){n=X(n);const r=Zt(n,YI).getImmediate({identifier:e}),s=il("storage");return s&&ZC(r,...s),r}function ZC(n,e,t,r={}){YC(n,e,t,r)}function eD(n,{instanceIdentifier:e}){const t=n.getProvider("app").getImmediate(),r=n.getProvider("auth-internal"),s=n.getProvider("app-check-internal");return new Oh(t,r,s,e,br)}function tD(){Ft(new At(YI,eD,"PUBLIC").setMultipleInstances(!0)),dt(rm,sm,""),dt(rm,sm,"esm2020")}tD();/**
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
 */const nD="type.googleapis.com/google.protobuf.Int64Value",rD="type.googleapis.com/google.protobuf.UInt64Value";function eE(n,e){const t={};for(const r in n)n.hasOwnProperty(r)&&(t[r]=e(n[r]));return t}function ka(n){if(n==null)return null;if(n instanceof Number&&(n=n.valueOf()),typeof n=="number"&&isFinite(n)||n===!0||n===!1||Object.prototype.toString.call(n)==="[object String]")return n;if(n instanceof Date)return n.toISOString();if(Array.isArray(n))return n.map(e=>ka(e));if(typeof n=="function"||typeof n=="object")return eE(n,e=>ka(e));throw new Error("Data cannot be encoded in JSON: "+n)}function Ss(n){if(n==null)return n;if(n["@type"])switch(n["@type"]){case nD:case rD:{const e=Number(n.value);if(isNaN(e))throw new Error("Data cannot be decoded from JSON: "+n);return e}default:throw new Error("Data cannot be decoded from JSON: "+n)}return Array.isArray(n)?n.map(e=>Ss(e)):typeof n=="function"||typeof n=="object"?eE(n,e=>Ss(e)):n}/**
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
 */const Lh="functions";/**
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
 */const im={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class it extends bt{constructor(e,t,r){super(`${Lh}/${e}`,t||""),this.details=r,Object.setPrototypeOf(this,it.prototype)}}function sD(n){if(n>=200&&n<300)return"ok";switch(n){case 0:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 500:return"internal";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}function Na(n,e){let t=sD(n),r=t,s;try{const i=e&&e.error;if(i){const o=i.status;if(typeof o=="string"){if(!im[o])return new it("internal","internal");t=im[o],r=o}const c=i.message;typeof c=="string"&&(r=c),s=i.details,s!==void 0&&(s=Ss(s))}}catch{}return t==="ok"?null:new it(t,r,s)}/**
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
 */class iD{constructor(e,t,r,s){this.app=e,this.auth=null,this.messaging=null,this.appCheck=null,this.serverAppAppCheckToken=null,Ze(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.auth=t.getImmediate({optional:!0}),this.messaging=r.getImmediate({optional:!0}),this.auth||t.get().then(i=>this.auth=i,()=>{}),this.messaging||r.get().then(i=>this.messaging=i,()=>{}),this.appCheck||s==null||s.get().then(i=>this.appCheck=i,()=>{})}async getAuthToken(){if(this.auth)try{const e=await this.auth.getToken();return e==null?void 0:e.accessToken}catch{return}}async getMessagingToken(){if(!(!this.messaging||!("Notification"in self)||Notification.permission!=="granted"))try{return await this.messaging.getToken()}catch{return}}async getAppCheckToken(e){if(this.serverAppAppCheckToken)return this.serverAppAppCheckToken;if(this.appCheck){const t=e?await this.appCheck.getLimitedUseToken():await this.appCheck.getToken();return t.error?null:t.token}return null}async getContext(e){const t=await this.getAuthToken(),r=await this.getMessagingToken(),s=await this.getAppCheckToken(e);return{authToken:t,messagingToken:r,appCheckToken:s}}}/**
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
 */const Zu="us-central1",oD=/^data: (.*?)(?:\n|$)/;function aD(n){let e=null;return{promise:new Promise((t,r)=>{e=setTimeout(()=>{r(new it("deadline-exceeded","deadline-exceeded"))},n)}),cancel:()=>{e&&clearTimeout(e)}}}class cD{constructor(e,t,r,s,i=Zu,o=(...c)=>fetch(...c)){this.app=e,this.fetchImpl=o,this.emulatorOrigin=null,this.contextProvider=new iD(e,t,r,s),this.cancelAllRequests=new Promise(c=>{this.deleteService=()=>Promise.resolve(c())});try{const c=new URL(i);this.customDomain=c.origin+(c.pathname==="/"?"":c.pathname),this.region=Zu}catch{this.customDomain=null,this.region=i}}_delete(){return this.deleteService()}_url(e){const t=this.app.options.projectId;return this.emulatorOrigin!==null?`${this.emulatorOrigin}/${t}/${this.region}/${e}`:this.customDomain!==null?`${this.customDomain}/${e}`:`https://${this.region}-${t}.cloudfunctions.net/${e}`}}function uD(n,e,t){const r=Bt(e);n.emulatorOrigin=`http${r?"s":""}://${e}:${t}`,r&&Ki(n.emulatorOrigin+"/backends")}function lD(n,e,t){const r=s=>dD(n,e,s,{});return r.stream=(s,i)=>pD(n,e,s,i),r}function tE(n){return n.emulatorOrigin&&Bt(n.emulatorOrigin)?"include":void 0}async function hD(n,e,t,r,s){t["Content-Type"]="application/json";let i;try{i=await r(n,{method:"POST",body:JSON.stringify(e),headers:t,credentials:tE(s)})}catch{return{status:0,json:null}}let o=null;try{o=await i.json()}catch{}return{status:i.status,json:o}}async function nE(n,e){const t={},r=await n.contextProvider.getContext(e.limitedUseAppCheckTokens);return r.authToken&&(t.Authorization="Bearer "+r.authToken),r.messagingToken&&(t["Firebase-Instance-ID-Token"]=r.messagingToken),r.appCheckToken!==null&&(t["X-Firebase-AppCheck"]=r.appCheckToken),t}function dD(n,e,t,r){const s=n._url(e);return fD(n,s,t,r)}async function fD(n,e,t,r){t=ka(t);const s={data:t},i=await nE(n,r),o=r.timeout||7e4,c=aD(o),u=await Promise.race([hD(e,s,i,n.fetchImpl,n),c.promise,n.cancelAllRequests]);if(c.cancel(),!u)throw new it("cancelled","Firebase Functions instance was deleted.");const l=Na(u.status,u.json);if(l)throw l;if(!u.json)throw new it("internal","Response is not valid JSON object.");let d=u.json.data;if(typeof d>"u"&&(d=u.json.result),typeof d>"u")throw new it("internal","Response is missing data field.");return{data:Ss(d)}}function pD(n,e,t,r){const s=n._url(e);return mD(n,s,t,r||{})}async function mD(n,e,t,r){var m;t=ka(t);const s={data:t},i=await nE(n,r);i["Content-Type"]="application/json",i.Accept="text/event-stream";let o;try{o=await n.fetchImpl(e,{method:"POST",body:JSON.stringify(s),headers:i,signal:r==null?void 0:r.signal,credentials:tE(n)})}catch(I){if(I instanceof Error&&I.name==="AbortError"){const x=new it("cancelled","Request was cancelled.");return{data:Promise.reject(x),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(x)}}}}}}const b=Na(0,null);return{data:Promise.reject(b),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(b)}}}}}}let c,u;const l=new Promise((I,b)=>{c=I,u=b});(m=r==null?void 0:r.signal)==null||m.addEventListener("abort",()=>{const I=new it("cancelled","Request was cancelled.");u(I)});const d=o.body.getReader(),f=gD(d,c,u,r==null?void 0:r.signal);return{stream:{[Symbol.asyncIterator](){const I=f.getReader();return{async next(){const{value:b,done:x}=await I.read();return{value:b,done:x}},async return(){return await I.cancel(),{done:!0,value:void 0}}}}},data:l}}function gD(n,e,t,r){const s=(o,c)=>{const u=o.match(oD);if(!u)return;const l=u[1];try{const d=JSON.parse(l);if("result"in d){e(Ss(d.result));return}if("message"in d){c.enqueue(Ss(d.message));return}if("error"in d){const f=Na(0,d);c.error(f),t(f);return}}catch(d){if(d instanceof it){c.error(d),t(d);return}}},i=new TextDecoder;return new ReadableStream({start(o){let c="";return u();async function u(){if(r!=null&&r.aborted){const l=new it("cancelled","Request was cancelled");return o.error(l),t(l),Promise.resolve()}try{const{value:l,done:d}=await n.read();if(d){c.trim()&&s(c.trim(),o),o.close();return}if(r!=null&&r.aborted){const m=new it("cancelled","Request was cancelled");o.error(m),t(m),await n.cancel();return}c+=i.decode(l,{stream:!0});const f=c.split(`
`);c=f.pop()||"";for(const m of f)m.trim()&&s(m.trim(),o);return u()}catch(l){const d=l instanceof it?l:Na(0,null);o.error(d),t(d)}}},cancel(){return n.cancel()}})}const om="@firebase/functions",am="0.13.3";/**
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
 */const _D="auth-internal",yD="app-check-internal",ID="messaging-internal";function ED(n){const e=(t,{instanceIdentifier:r})=>{const s=t.getProvider("app").getImmediate(),i=t.getProvider(_D),o=t.getProvider(ID),c=t.getProvider(yD);return new cD(s,i,o,c,r)};Ft(new At(Lh,e,"PUBLIC").setMultipleInstances(!0)),dt(om,am,n),dt(om,am,"esm2020")}/**
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
 */function wD(n=Qi(),e=Zu){const r=Zt(X(n),Lh).getImmediate({identifier:e}),s=il("functions");return s&&TD(r,...s),r}function TD(n,e,t){uD(X(n),e,t)}function Gs(n,e,t){return lD(X(n),e)}ED();const Va={apiKey:"AIzaSyDpmm-NIEq80-NFg2Y6o9D6Ea4oghYJPhw",authDomain:"teh-tarik-app-my-own.firebaseapp.com",projectId:"teh-tarik-app-my-own",storageBucket:"teh-tarik-app-my-own.firebasestorage.app",messagingSenderId:"239722784519",appId:"1:239722784519:web:ccf12b2ff7f3575bd4c7a2",measurementId:"G-4LMGTL375D"};if(!Va.apiKey||!Va.projectId)throw new Error("Missing Firebase web config (need at least VITE_FIREBASE_API_KEY and VITE_FIREBASE_PROJECT_ID). Copy frontend/.env.example to frontend/.env.local and fill the VITE_FIREBASE_* values from Firebase Console → Project settings → Your apps.");const mo=Um(Va),cm="".trim();function AD(n){if(!cm)return null;try{return Hb(n,{provider:new Il(cm),isTokenAutoRefreshEnabled:!0})}catch{return null}}const KN=AD(mo),re=hI(mo),rE=XC(mo),_e=cb(mo),vD="us-central1".trim()||"us-central1",qs=wD(mo,vD);Va.projectId;try{fI(re).catch(n=>{n.code==="failed-precondition"||n.code})}catch{}const bD=new Set(["stmsalam@gmail.com","admin@stmsalam.com","admin@stm.com","haritha.mh77@gmail.com"].map(n=>n.toLowerCase())),SD=new Set(["rider1@stmsalam.com","rider2@stmsalam.com","rider3@stmsalam.com"].map(n=>n.toLowerCase()));function lu(n,e){const t=e==="admin"?"admin":e==="rider"?"rider":"user";if(t==="admin"||t==="rider")return t;const r=(n||"").trim().toLowerCase();return r&&bD.has(r)?"admin":r&&SD.has(r)?"rider":"user"}const sE=G.createContext();function RD({children:n}){const[e,t]=G.useState(()=>{try{const m=localStorage.getItem("stm_user");return m?JSON.parse(m):null}catch{return localStorage.removeItem("stm_user"),null}}),[r,s]=G.useState(!0),[i,o]=G.useState(!1),[c,u]=G.useState(()=>!!localStorage.getItem("stm_guest"));G.useEffect(()=>{const m=YA(_e,async I=>{var b;if(I){o(!0);let x="user",D=I.displayName||"Customer",O="",B="";try{const W=we(re,"users",I.uid),Q=await Nr(W);if(Q.exists()){const T=Q.data();x=lu(I.email,T.role),D=T.name||D,typeof T.phone=="string"&&T.phone.trim()?O=T.phone.trim():typeof T.mobile=="string"&&T.mobile.trim()&&(O=T.mobile.trim()),typeof T.address=="string"&&T.address.trim()?B=T.address.trim():typeof T.defaultAddress=="string"&&T.defaultAddress.trim()&&(B=T.defaultAddress.trim())}else x=lu(I.email,null)}catch{x=lu(I.email,null)}try{((b=(await Km(I)).claims)==null?void 0:b.admin)===!0&&(x="admin")}catch{}const U=typeof I.phoneNumber=="string"&&I.phoneNumber.trim()?I.phoneNumber.trim():"",z={id:I.uid,name:x==="admin"?D||"Admin Master":D,email:I.email,phone:O||U||"",address:B||"",role:x};t(z),localStorage.setItem("stm_user",JSON.stringify(z))}else o(!1),t(null),localStorage.removeItem("stm_user");s(!1)});return()=>m()},[]);const l=m=>{t(m),o(!0),u(!1),localStorage.setItem("stm_user",JSON.stringify(m)),localStorage.removeItem("stm_guest")},d=()=>{u(!0),t(null),localStorage.setItem("stm_guest","true"),localStorage.removeItem("stm_user")},f=()=>{t(null),o(!1),u(!1),localStorage.removeItem("stm_user"),localStorage.removeItem("stm_guest"),_e.signOut()};return _.jsx(sE.Provider,{value:{user:e,isGuest:c,login:l,loginAsGuest:d,logout:f,loading:r,isAuthenticated:i},children:n})}const Mh=()=>G.useContext(sE),Oa="stm-open-support",De={name:"STM Salam",tagline:"Authentic Kopitiam Flavors, Delivered.",outletName:"STM Salam — Blk 50A",outletAddress:"STM Salam — Blk 50A Marine Terrace, #01-303, Singapore 441050",address:"STM Salam — Blk 50A Marine Terrace, #01-303, Singapore 441050",outletLat:1.30892,outletLng:103.91548,freeDeliveryRadiusKm:5,deliveryFee:2,minOrderDelivery:10,minOrderFreeDelivery:10,minOrder:10,phone:"+65 9191 5766",whatsapp:"+65 9191 5766",email:"highlitesg786@gmail.com",website:"https://www.stmsalam.com",catalog:"https://wa.me/c/6591915766",hours:"Daily 9:00 AM – 11:00 PM",avgDeliveryTime:"25–35 min"},PD=[{id:1,name:"STM Salam — Blk 50A",address:"STM Salam — Blk 50A Marine Terrace, #01-303, Singapore 441050",phone:"+65 9191 5766",hours:"Daily 9:00 AM – 11:00 PM",isMain:!0,img:"/bg2.jpeg",lat:1.30892,lng:103.91548}],um=[{id:"hot-drinks",name:"Hot Drinks",emoji:"☕"},{id:"cold-drinks",name:"Cold Drinks",emoji:"🧊"},{id:"can-drinks",name:"Can Drinks",emoji:"🥫"},{id:"sugarcane",name:"Sugarcane",emoji:"🎋"},{id:"dinosaur",name:"Dinosaur",emoji:"🦕"},{id:"burgers-kebabs",name:"Burgers, Kebabs & More",emoji:"🍔"},{id:"snacks",name:"Snacks",emoji:"🥟"},{id:"sides",name:"Sides",emoji:"🍟"},{id:"desserts",name:"Desserts",emoji:"🍰"},{id:"indian",name:"Indian Food",emoji:"🍛",note:"Start 9:00 AM to 9:00 PM"}],iE="/bg1.jpeg",xD=/^(?:https?:)?\/\//i;function lm(n){const e=typeof n=="string"?n.trim():"";if(!e)return iE;if(e.startsWith("data:")||e.startsWith("blob:")||xD.test(e))return e;const t=e.replace(/\\/g,"/").replace(/^\.\/+/,"/").replace(/^\/aboutusimages\//i,"/aboutusimage/").replace(/^aboutusimage\//i,"/aboutusimage/").replace(/^aboutusimages\//i,"/aboutusimage/").replace(/\/{2,}/g,"/"),r=t.startsWith("/")?t:`/${t}`;return encodeURI(r)}function oE({src:n,alt:e,fallbackSrc:t=iE,style:r,onError:s,...i}){const o=G.useMemo(()=>lm(n),[n]),c=G.useMemo(()=>lm(t),[t]),u=l=>{var f;const d=l.currentTarget;if(d!=null&&d.currentSrc||d!=null&&d.src,((f=d==null?void 0:d.dataset)==null?void 0:f.fallbackApplied)==="1"){s&&s(l);return}d.dataset.fallbackApplied="1",d.src=c,s&&s(l)};return _.jsx("img",{loading:"lazy",src:o,alt:e||"Image",onError:u,style:{width:"100%",height:"auto",objectFit:"cover",display:"block",...r},...i})}function CD(){var b,x,D;const[n,e]=G.useState(!1),[t,r]=G.useState(!1),{pathname:s}=tl(),i=nl(),{user:o,isGuest:c,logout:u}=Mh(),{totalItems:l}=gw();G.useEffect(()=>{const O=()=>e(window.scrollY>20);return window.addEventListener("scroll",O),()=>window.removeEventListener("scroll",O)},[]);const d=()=>_.jsx("div",{style:{background:"var(--gold)",color:"var(--green-dark)",textAlign:"center",padding:"8px 0",fontSize:"13px",fontWeight:950,letterSpacing:"1px",textTransform:"uppercase",borderBottom:"1px solid rgba(0,0,0,0.1)",zIndex:1100,position:"relative"},children:_.jsx("marquee",{scrollamount:"6",style:{display:"block"},children:"✨ MINIMUM ORDER SGD 10.00 FOR ALL DELIVERIES AND PICKUPS ✨ ENJOY AUTHENTIC STM SALAM FLAVORS ✨ MINIMUM ORDER SGD 10.00 ✨"})});G.useEffect(()=>{r(!1)},[s]);const f=[{to:"/",label:"Home"},{to:"/menu",label:"Menu"},{to:"/gallery",label:"Gallery"},{to:"/about",label:"About Us"},{to:"/profile",label:"Orders"}],m=()=>{u(),i("/login")},I=()=>{window.dispatchEvent(new CustomEvent(Oa,{detail:{tab:"team"}}))};return _.jsxs(_.Fragment,{children:[_.jsx(d,{}),_.jsxs("nav",{style:{position:"sticky",top:0,zIndex:1e3,background:n?"rgba(1, 50, 32, 0.98)":"var(--green-dark)",backdropFilter:"blur(16px)",borderBottom:n?"1px solid rgba(201, 163, 68, 0.15)":"1px solid transparent",boxShadow:n?"0 10px 40px rgba(0,0,0,0.3)":"none",transition:"all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",padding:n?"10px 0":"18px 0",width:"100%",overflow:"hidden"},children:[_.jsxs("div",{className:"container",style:{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%"},children:[_.jsx(Xe,{to:"/",style:{display:"flex",alignItems:"center",gap:"12px",textDecoration:"none",transition:"transform 0.2s"},children:_.jsx(oE,{src:"/stmsalamlogo.png",alt:"Logo",style:{width:"60px",height:"60px",objectFit:"contain"}})}),_.jsx("div",{className:"desktop-nav",style:{display:"flex",gap:"6px",alignItems:"center",background:"rgba(255,255,255,0.06)",padding:"6px",borderRadius:"16px",border:"1px solid rgba(255,255,255,0.08)"},children:f.map(O=>_.jsx(Xe,{to:O.to,style:{padding:"10px 22px",borderRadius:"12px",fontSize:"15px",fontWeight:700,color:s===O.to?"var(--green-dark)":"rgba(255,255,255,0.8)",background:s===O.to?"var(--gold)":"transparent",transition:"all 0.3s ease",textDecoration:"none"},children:O.label},O.to))}),_.jsx("div",{style:{display:"flex",gap:"12px",alignItems:"center"},children:_.jsxs("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[o?_.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[_.jsxs(Xe,{to:"/profile",style:{display:"flex",alignItems:"center",gap:"8px",textDecoration:"none"},children:[_.jsx("div",{style:{width:"36px",height:"36px",borderRadius:"50%",background:"var(--gold)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14px",fontWeight:900,color:"var(--green-dark)"},children:((x=(b=o.name)==null?void 0:b.charAt(0))==null?void 0:x.toUpperCase())||"U"}),_.jsx("span",{className:"nav-brand-text",style:{color:"white",fontWeight:700,fontSize:"14px",maxWidth:"100px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:(D=o.name)==null?void 0:D.split(" ")[0]})]}),_.jsx("button",{onClick:m,title:"Sign Out",style:{width:"36px",height:"36px",borderRadius:"12px",background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.7)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"},children:_.jsx(tw,{size:16})})]}):_.jsxs(Xe,{to:"/login",className:"nav-icon-btn",style:{padding:"8px 18px",borderRadius:"14px",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:"white",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",textDecoration:"none",fontSize:"14px",fontWeight:700},children:[_.jsx(ns,{size:18})," ",c?"Guest":"Sign In"]}),_.jsxs("button",{type:"button",onClick:I,title:"Chat with Admin",style:{padding:"8px 14px",borderRadius:"14px",background:"rgba(255,255,255,0.12)",border:"1px solid rgba(255,255,255,0.2)",color:"white",display:"flex",alignItems:"center",gap:"8px",fontSize:"13px",fontWeight:800,cursor:"pointer"},children:[_.jsx(rs,{size:18})," ",_.jsx("span",{className:"nav-chat-label",children:"Chat with Admin"})]}),_.jsxs(Xe,{to:"/cart",style:{background:"var(--gold)",color:"var(--green-dark)",padding:"0 16px",borderRadius:"14px",height:"42px",display:"flex",alignItems:"center",gap:"10px",textDecoration:"none",fontWeight:900},children:[_.jsx(mu,{size:18}),_.jsx("span",{style:{fontSize:"14px"},children:l})]}),_.jsx("button",{onClick:()=>r(!t),className:"mobile-toggle",style:{background:"rgba(255,255,255,0.08)",border:"none",color:"white",width:"42px",height:"42px",borderRadius:"14px",cursor:"pointer",display:"none",alignItems:"center",justifyContent:"center"},children:t?_.jsx(Tm,{size:22}):_.jsx(nw,{size:22})})]})})]}),_.jsx("style",{children:`
          @media (max-width: 968px) {
            .desktop-nav { display: none !important; }
            .mobile-toggle { display: flex !important; }
            .container { padding: 0 16px !important; }
            .nav-chat-label { display: none; }
          }
        `})]}),t&&_.jsxs("div",{style:{position:"fixed",inset:0,zIndex:999,background:"var(--green-dark)",padding:"120px 40px",display:"flex",flexDirection:"column",gap:"20px"},children:[f.map(O=>_.jsx(Xe,{to:O.to,style:{fontSize:"40px",fontWeight:950,color:s===O.to?"var(--gold)":"white",textDecoration:"none"},children:O.label},O.to)),_.jsxs("button",{type:"button",onClick:()=>{I(),r(!1)},style:{fontSize:"28px",fontWeight:950,color:"var(--gold)",background:"none",border:"none",cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",gap:12,padding:0},children:[_.jsx(rs,{size:32})," Chat with Admin"]}),_.jsx("div",{style:{marginTop:"auto",borderTop:"1px solid rgba(255,255,255,0.1)",paddingTop:"40px"},children:_.jsxs("div",{style:{display:"flex",gap:"20px",color:"rgba(255,255,255,0.5)",fontSize:"14px"},children:[_.jsx("span",{children:"Marine Terrace"}),_.jsx("span",{children:"•"}),_.jsx("span",{children:"Halal Certified"})]})})]}),_.jsxs("div",{className:"mobile-bottom-nav",children:[_.jsxs(Xe,{to:"/",className:`mobile-nav-item ${s==="/"?"active":""}`,children:[_.jsx(Am,{size:22}),_.jsx("span",{children:"Home"})]}),_.jsxs(Xe,{to:"/menu",className:`mobile-nav-item ${s==="/menu"?"active":""}`,children:[_.jsx(rw,{size:22}),_.jsx("span",{children:"Menu"})]}),_.jsxs(Xe,{to:"/cart",className:`mobile-nav-item ${s==="/cart"?"active":""}`,style:{position:"relative"},children:[_.jsx(mu,{size:22}),_.jsx("span",{children:"Cart"}),l>0&&_.jsx("div",{style:{position:"absolute",top:-5,right:-5,background:"var(--green-dark)",color:"var(--gold)",fontSize:"10px",width:"16px",height:"16px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",fontWeight:900,border:"1.5px solid white"},children:l})]}),_.jsxs(Xe,{to:"/gallery",className:`mobile-nav-item ${s==="/gallery"?"active":""}`,children:[_.jsx(sw,{size:22}),_.jsx("span",{children:"Gallery"})]}),_.jsxs(Xe,{to:"/profile",className:`mobile-nav-item ${s==="/profile"?"active":""}`,children:[_.jsx(ns,{size:22}),_.jsx("span",{children:"Profile"})]})]})]})}function DD(){const n=()=>{window.dispatchEvent(new CustomEvent(Oa,{detail:{tab:"team"}}))};return _.jsxs("footer",{style:{background:"var(--green-dark)",color:"white",paddingTop:"72px",width:"100%",overflow:"hidden"},children:[_.jsxs("div",{className:"container",children:[_.jsxs("div",{className:"footer-grid",style:{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:"56px",marginBottom:"56px"},children:[_.jsxs("div",{className:"footer-brand",children:[_.jsxs("div",{style:{marginBottom:"24px",display:"flex",alignItems:"center",gap:"14px"},children:[_.jsx(oE,{src:"/stmsalamlogo.png",alt:"Logo",style:{width:"64px",height:"64px",objectFit:"contain"}}),_.jsxs("div",{style:{display:"flex",flexDirection:"column"},children:[_.jsx("div",{style:{fontSize:"26px",fontWeight:950,color:"var(--gold)",letterSpacing:"-0.5px",lineHeight:1},children:"Salam"}),_.jsx("div",{style:{fontSize:"11px",color:"rgba(255,255,255,0.5)",fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",marginTop:"4px"},children:"Genuine Taste Since 1988"})]})]}),_.jsx("p",{style:{color:"rgba(255,255,255,0.6)",fontSize:"15px",lineHeight:1.8,maxWidth:"300px",marginBottom:"32px"},children:"Experience the peak of Marine Terrace hospitality. Premium ingredients, crafted with excellence and delivered with grace."}),_.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"24px"},children:[_.jsxs("div",{style:{background:"rgba(255,255,255,0.05)",padding:"16px 20px",borderRadius:"16px",border:"1px solid rgba(255,255,255,0.1)",display:"flex",alignItems:"center",gap:"16px"},children:[_.jsx("div",{style:{width:"40px",height:"40px",borderRadius:"12px",background:"var(--gold)",color:"var(--green-dark)",display:"flex",alignItems:"center",justifyContent:"center"},children:_.jsx(iw,{size:20})}),_.jsxs("div",{children:[_.jsx("div",{style:{fontSize:"10px",color:"var(--gold)",fontWeight:800,textTransform:"uppercase",letterSpacing:"1px"},children:"Quick Support"}),_.jsx("div",{style:{fontSize:"18px",fontWeight:900},children:De.phone})]})]}),_.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:PD.map((e,t)=>_.jsxs("div",{style:{display:"flex",gap:"12px",alignItems:"flex-start",color:"rgba(255,255,255,0.7)",fontSize:"13px"},children:[_.jsx("span",{style:{color:"var(--gold)",marginTop:"2px",flexShrink:0},children:_.jsx(ow,{size:16})}),_.jsxs("div",{children:[_.jsx("div",{style:{color:"white",fontWeight:800,fontSize:"14px",marginBottom:"2px"},children:e.name}),e.address]})]},e.id))}),_.jsxs("div",{style:{display:"flex",gap:"12px",alignItems:"center",color:"rgba(255,255,255,0.7)",fontSize:"14px"},children:[_.jsx("span",{style:{color:"var(--gold)",flexShrink:0},children:_.jsx(vm,{size:16})}),_.jsx("span",{children:De.hours})]})]})]}),_.jsxs("div",{children:[_.jsx("h4",{style:{fontSize:"13px",fontWeight:900,letterSpacing:"2px",textTransform:"uppercase",color:"var(--gold)",marginBottom:"24px"},children:"Explore"}),_.jsx("ul",{style:{listStyle:"none",display:"flex",flexDirection:"column",gap:"14px",padding:0},children:[["Main Menu","/menu"],["Your Cart","/cart"],["Track Delivery","/tracking"],["My Profile","/profile"]].map(([e,t])=>_.jsx("li",{children:_.jsx(Xe,{to:t,style:{color:"rgba(255,255,255,0.7)",fontSize:"15px",fontWeight:500,textDecoration:"none"},children:e})},t))})]}),_.jsxs("div",{children:[_.jsx("h4",{style:{fontSize:"13px",fontWeight:900,letterSpacing:"2px",textTransform:"uppercase",color:"var(--gold)",marginBottom:"24px"},children:"Support"}),_.jsxs("ul",{style:{listStyle:"none",display:"flex",flexDirection:"column",gap:"14px",padding:0},children:[_.jsx("li",{children:_.jsxs("button",{type:"button",onClick:n,style:{display:"inline-flex",alignItems:"center",gap:8,background:"var(--gold)",color:"var(--green-dark)",border:"none",borderRadius:12,padding:"10px 16px",fontSize:"14px",fontWeight:900,cursor:"pointer",width:"100%",justifyContent:"center"},children:[_.jsx(rs,{size:18})," Chat with Admin"]})}),_.jsx("li",{children:_.jsx(Xe,{to:"/about",style:{color:"rgba(255,255,255,0.7)",fontSize:"15px",fontWeight:500,textDecoration:"none"},children:"About STM"})}),["Latest Promos","Delivery Info","Halal Status"].map(e=>_.jsx("li",{children:_.jsx("a",{href:"#",style:{color:"rgba(255,255,255,0.7)",fontSize:"15px",fontWeight:500,textDecoration:"none"},children:e})},e))]})]}),_.jsxs("div",{children:[_.jsx("h4",{style:{fontSize:"13px",fontWeight:900,letterSpacing:"2px",textTransform:"uppercase",color:"var(--gold)",marginBottom:"24px"},children:"Portals"}),_.jsxs("ul",{style:{listStyle:"none",display:"flex",flexDirection:"column",gap:"14px",padding:0},children:[_.jsx("li",{children:_.jsx(Xe,{to:"/admin",style:{color:"#86EFAC",fontSize:"15px",fontWeight:800,textDecoration:"none"},children:"Admin Login ↗"})}),_.jsx("li",{children:_.jsx(Xe,{to:"/driver",style:{color:"#FCA5A5",fontSize:"15px",fontWeight:800,textDecoration:"none"},children:"Driver Portal ↗"})}),["Terms of Service","Privacy Policy"].map(e=>_.jsx("li",{children:_.jsx("a",{href:"#",style:{color:"rgba(255,255,255,0.7)",fontSize:"15px",fontWeight:500,textDecoration:"none"},children:e})},e))]})]})]}),_.jsxs("div",{style:{borderTop:"1px solid rgba(255,255,255,0.1)",padding:"32px 0",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"24px"},children:[_.jsxs("p",{style:{color:"rgba(255,255,255,0.4)",fontSize:"14px"},children:["© ",new Date().getFullYear()," Salam Teh Tarik. All rights reserved."]}),_.jsxs("div",{style:{display:"flex",gap:"32px",alignItems:"center"},children:[_.jsxs("div",{style:{display:"flex",gap:"16px",alignItems:"center"},children:[_.jsx("a",{href:"https://facebook.com/stmsalam",target:"_blank",rel:"noreferrer",style:{color:"rgba(255,255,255,0.4)",transition:"0.3s color"},onMouseEnter:e=>e.currentTarget.style.color="var(--gold)",onMouseLeave:e=>e.currentTarget.style.color="rgba(255,255,255,0.4)",children:_.jsx(aw,{size:20})}),_.jsx("a",{href:"https://instagram.com/stmsalam",target:"_blank",rel:"noreferrer",style:{color:"rgba(255,255,255,0.4)",transition:"0.3s color"},onMouseEnter:e=>e.currentTarget.style.color="var(--gold)",onMouseLeave:e=>e.currentTarget.style.color="rgba(255,255,255,0.4)",children:_.jsx(cw,{size:20})})]}),_.jsx("div",{style:{width:"1px",height:"24px",background:"rgba(255,255,255,0.1)"}}),_.jsx("span",{style:{background:"var(--gold)",color:"var(--green-dark)",fontSize:"11px",fontWeight:950,padding:"6px 14px",borderRadius:"30px",letterSpacing:"1px"},children:"HALAL Certified"}),_.jsx("span",{style:{color:"rgba(255,255,255,0.4)",fontSize:"14px"},children:"STM Salam — Blk 50A Marine Terrace, #01-303, Singapore 441050"})]})]})]}),_.jsx("style",{children:`
        @media (max-width: 968px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 48px !important; text-align: center; }
          .footer-brand { display: flex; flex-direction: column; align-items: center; }
          .footer-brand p { margin: 0 auto 32px !important; }
          .footer-brand > div { justify-content: center; }
        }
      `}),_.jsx("div",{style:{textAlign:"center",paddingBottom:"24px",color:"rgba(255,255,255,0.25)",fontSize:"10px",fontWeight:600,letterSpacing:"0.5px"},children:"Designed by HamoTech PTE. LTD."})]})}const kD=({message:n="Hi STM Salam, I need help with my order",type:e="floating",label:t="Chat with Admin",className:r="",style:s={}})=>{const o=`https://wa.me/${De.whatsapp.replace(/\D/g,"")}?text=${encodeURIComponent(n)}`;return e==="button"?_.jsxs(fr.a,{href:o,target:"_blank",rel:"noopener noreferrer",className:`btn ${r}`,style:{display:"inline-flex",alignItems:"center",gap:"10px",background:"#25d366",color:"white",padding:"14px 28px",borderRadius:"16px",fontWeight:800,textDecoration:"none",boxShadow:"0 10px 20px rgba(37,211,102,0.2)",border:"none",cursor:"pointer",...s},whileHover:{scale:1.02,y:-2},whileTap:{scale:.98},children:[_.jsx(rs,{size:20}),t]}):_.jsxs(fr.a,{href:o,target:"_blank",rel:"noopener noreferrer",className:r,style:{position:"fixed",bottom:"30px",right:"30px",width:"60px",height:"60px",background:"#25d366",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"white",boxShadow:"0 10px 30px rgba(0,0,0,0.15), 0 0 20px rgba(37,211,102,0.4)",zIndex:9991,cursor:"pointer",...s},initial:{scale:0,opacity:0},animate:{scale:1,opacity:1},whileHover:{scale:1.1,rotate:5},whileTap:{scale:.9},children:[_.jsx(rs,{size:32}),_.jsxs("div",{className:"whatsapp-tooltip",style:{position:"absolute",right:"75px",background:"white",color:"#1f2937",padding:"8px 16px",borderRadius:"12px",fontSize:"13px",fontWeight:800,boxShadow:"0 8px 16px rgba(0,0,0,0.1)",whiteSpace:"nowrap",pointerEvents:"none",opacity:0,transform:"translateX(10px)",transition:"all 0.3s ease",border:"1px solid #f1f5f9"},children:[t,_.jsx("div",{style:{position:"absolute",right:"-6px",top:"50%",transform:"translateY(-50%) rotate(45deg)",width:"12px",height:"12px",background:"white",borderRight:"1px solid #f1f5f9",borderTop:"1px solid #f1f5f9"}})]}),_.jsx("style",{children:`
        a:hover .whatsapp-tooltip {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
        @media (max-width: 768px) {
          .whatsapp-tooltip { display: none !important; }
        }
      `})]})};function hm(n){const e=(n||"").toLowerCase().trim();if(!e)return"Hi! I’m the STM Salam assistant. Try asking about **opening hours**, **delivery**, **minimum order**, **our address**, or **how to track an order**.";const t=`${De.outletName} — ${De.outletAddress}`;return/hour|open|close|time|when/.test(e)?`We’re open **${De.hours}**. Last orders may vary on busy nights — the team will confirm on WhatsApp (${De.phone}) if needed.`:/where|address|location|find you|outlet|marine|terrace|blk|block|441050/.test(e)?`You can order for pickup or delivery from our outlet:

**${De.outletName}**
${De.outletAddress}

We’re the kitchen your delivery or pickup is fulfilled from.`:/deliver|delivery|radius|km|distance|fee|free ship|shipping/.test(e)?`**Delivery rules (summary):**
• Minimum **SGD ${De.minOrderDelivery.toFixed(2)}** subtotal for delivery.
• **Free delivery** if your address is within **${De.freeDeliveryRadiusKm} km** of our outlet and you meet the minimum.
• Otherwise a **SGD ${De.deliveryFee.toFixed(2)}** delivery fee applies (final amount is confirmed at checkout once your address is checked).
• **Pickup** is always available at the outlet — no delivery fee.`:/minimum|min order|less than|below \$?10/.test(e)?`For **delivery**, we need at least **SGD ${De.minOrderDelivery.toFixed(2)}** in your cart. You can still use **pickup** for smaller orders, or add a few more items.`:/track|order status|where is my|stm-/.test(e)?`Open **Order tracking** from the menu and enter your **order ID** (e.g. STM-…). You’ll see status updates there. If you’re stuck, use **Live team** in this chat or WhatsApp **${De.phone}**.`:/pay|payment|paynow|qr|stripe|paypal|cash/.test(e)?"We support **PayNow (SGQR)**, **card / demo checkout**, and **cash** (where available). At checkout you’ll see the exact options. For PayNow help, tap **Payment Help** on the checkout page or WhatsApp us.":/menu|food|halal|vegetarian|spicy|price/.test(e)?`Browse the full **Menu** on the site for items and prices. If you need ingredient or halal details, tap **Live team** or WhatsApp **${De.phone}** and the kitchen will confirm.`:/phone|whatsapp|call|contact/.test(e)?`Reach us at **${De.phone}** or WhatsApp **${De.whatsapp}**. For written follow-up on an existing order, **Live team** in this chat is best.`:/human|agent|staff|real person|admin/.test(e)?"Switch to the **Live team** tab in this chat — a staff member can read your thread from the admin dashboard and reply when they’re available.":/thank|thanks|great/.test(e)?`You’re welcome! Enjoy your meal — and thanks for choosing **${De.name}**.`:`I don’t have a specific answer for that yet. Try rephrasing, or ask about **hours**, **delivery**, **address**, or **tracking**.

For anything personal (payments, allergies, special requests), open the **Live team** tab or WhatsApp **${De.phone}**.

_Outlet:_ ${t}`}const ND=["Opening hours?","Delivery rules","Outlet address","Track my order"];function VD(n){if(n&&Object.prototype.hasOwnProperty.call(n,"active"))throw new Error("product.active is forbidden. Use available only.")}function OD(n){return Object.prototype.hasOwnProperty.call(n||{},"available")?n:{...n,available:!0}}function LD(n){const e=String(n||""),t=e.includes("collection('products')")||e.includes('collection("products")')||e.includes("getDocs(products)")||e.includes("getDocs(collection(db, 'products'))")||e.includes('getDocs(collection(db, "products"))'),r=e.includes("shared/useProductsCore.js")||e.includes("useProductsCore");if(t&&!r)throw new Error("Direct product query forbidden. Use shared/useProductsCore.js")}function MD(n,e){const t=String(e);if(t!=="useProductsCore")throw new Error("Unsafe product query access blocked");return LD(`shared/useProductsCore.js:${t}`),n()}function dm(n){if(!n)return 0;if(typeof(n==null?void 0:n.toMillis)=="function")return n.toMillis();const e=Date.parse(String(n));return Number.isFinite(e)?e:0}function aE(n){const e=OD(n);return VD(e),e}function FD(n,e=!1){const t=aE(n);return e?!0:(t==null?void 0:t.available)!==!1}let fm=!1;function UD(n){if(!n||!Object.prototype.hasOwnProperty.call(n,"active"))return n;fm||(fm=!0);const{active:e,...t}=n;return t}function BD(n){const e=String((n==null?void 0:n.code)||"").toLowerCase(),t=String((n==null?void 0:n.message)||"").toLowerCase();return e.includes("failed-precondition")||t.includes("index")}function jD({firestore:n,db:e,categoryId:t,orderByCreatedDesc:r,withOrderBy:s}){return MD(()=>{const i=[];return t&&t!=="all"&&i.push(n.where("categoryId","==",t)),r&&s&&i.push(n.orderBy("createdAt","desc")),i.length?n.query(n.collection(e,"products"),...i):n.query(n.collection(e,"products"))},"useProductsCore")}function Fh({firestore:n,db:e,categoryId:t,includeUnavailable:r=!1,orderByCreatedDesc:s=!0,onData:i,onError:o,onIndexWarning:c}){let u=!1,l=()=>{};const d=f=>{l();const m=jD({firestore:n,db:e,categoryId:t,orderByCreatedDesc:s,withOrderBy:f});l=n.onSnapshot(m,I=>{try{const b=I.docs.map(x=>({id:x.id,...x.data()})).map(x=>UD(x)).map(x=>aE(x)).filter(x=>FD(x,r)).sort((x,D)=>dm(D.createdAt)-dm(x.createdAt));i(b)}catch(b){o==null||o(b instanceof Error?b:new Error(String(b)))}},I=>{if(!u&&f&&s&&BD(I)){u=!0,c==null||c(I),d(!1);return}o==null||o(I)})};return d(!0),()=>l()}const La={SNACKS:["7_DAYS__1_piece__SGD_1.50.png","Bhai_suji_SGD_8.00.png","Candy_1_packet_SGD_1.70.png","Chicken_curry_puffs_1_piece_SGD_2.40.png","Coconut_bun__SGD_1.20.png","Kaya_bun__SGD_1.20.png","mutton_curry_puff_1_piece_SGD_2.40.png","Potato_curry_puffs_1_piece__SGD_2.00.png","Roti_curry_1_piece__SGD_1.30.png","Roti_curry_5_piece__SGD_6.00.png","TAPIOCA_SAMBAL_SGD_4.70.png","tapioca__chips_sgd_4.20.png"],"BURGER KABABAB":["BEEF_BURGER_CHEESY__SGD_7.40_.png","BEEF_BURGER_classic__SGD_6.40_.png","BEEF_BURRTIO__SGD_10.40_.jpg","BEEF_HEALTHY_BOWL__SGD_11.50_.png","BEEF_KEBAB__8.90_.jpg","BEEF_QUESADILLA__11.50_.png","Chicken_burger_CHEESY__SGD_6.90_.png","Chicken_burger_classic__SGD_6.90_.png","CHICKEN_BURRITO__SGD_9.40_.png","CHICKEN_HEALTHY_BOWL__SGD_11.00_.jpg","CHICKEN_KEBAB__SGD_6.90_.png","CHICKEN_QUESADILLA__SGD_10.50_.jpg","HUMMUS_BEEF__tortilla___SGD_11.50_.png","HUMMUS_CHICKEN__tortilla___11.00_.png","Hummus_FALAFEL__tortilla___SGD_10.90_.png","HUMMUS_LAMB__tortilla___SGD_13.50_.png","Hummus__SGD_6.40_.png","LAMB_BURGER_CHEESY__SGD_7.90_.png","LAMB_BURGER_CLASSIC__SGD_7.90_.png","LAMB_BURRITO__SGD_12.40_.png","LAMB_HEALTHY_BOWL__SGD_12.50_.jpg","LAMB_KEBAB__SGD_10.40_.png","LAMB_QUESADILLA__SGD_12.10_.png","MIX_BURRITO__BEEF_CHICKEN___SGD_11.40_.png","MIX_KEBAB__BEEF_CHICKEN____SDG_9.50__.png","PLATE_RICE_BEEF__SGD_11.50_.png","PLATE_RICE_LAMB__SGD_12.50_.png","PLATE_RICE_SHAWARMA_CHICKEN__SGD_11.00_.png","VEG_FALAFEL_BURRITO__9.40_.jpg","VEG_FALAFEL_HEALTHY_BOWL__SGD_11.00_.png","VEG_FALAFEL_KEBAB__SGD_6.90_.png","VEG_FALAFEL_QUESADILLA__SGD_10.40_.jpg"],DINOSAUR:["Bandong_dinosaur__SGD_3.60_.png","Boost_dinosaur__SGD_2.90_.png","Horlicks_dinosaur_Ice__SGD_3.00_.png","Milo_Dino_ICE__SGD_3.60_.png"],DESERT:["KUNAFA_ORGIINAL_SGD_12.00.png","KUNAFE_NEUTELLA__SGD_14.90.png"],"COLD DRINKS":["Bandong_ice__SGD_2.70_SGD_2.80.png","Blueberry_longan__SGD_3.50.png","Blueberry_soda_ice__SGD_3.50.png","Blueberry__SGD_2.80_SGD_2.90.png","Boost_ice_SGD_2.90.png","Fresh_ice__ginger_lemon_SGD_2.80_SGD_3.00.png","Fresh_ice__lemon_tea__SGD_2.70_SGD_2.90.png","Fresh_lemon_juice__ice_SGD_2.70.png","Fresh__virgin__mojito_soda__ice__SGD_3.80_SGD_4.00.png","Honeydew_milk_Ice__SGD_2.80.png","Honeydew_soda__ice__SGD_3.50_SGD_3.70.png","Honey__lemon_soda__ice_SGD_3.70.png","Honey__lemon__ginger__ice_SGD_3.00.png","Honey__lemon__ice__SGD_2.70_SGD_2.90.png","Horlicks__ice__SGD_3.00.png","Ice_BRU_coffee__SGD_2.80.png","Ice_Limau_SGD_2.70_SGD_2.90.png","Kopi_C_kosong_ice__SGD_2.70_SGD_2.90.png","Kopi_ice_SGD_2.50_SGD_2.70.png","Kopi_O_ice__SGD_2.30_SGD_2.50.png","Lemon_soda_SGD_3.50.png","Longan_ice__SGD_3.00.png","Lychee_ice_SGD_2.90.png","Masala_tea_ice__SGD_2.90.png","Milo_Ice_SGD_2.70_SGD_2.90.png","Nescafe__ice_SGD_2.80.png","Syrup__ice_SGD_2.70.png","Syrup__Limau_ice_SGD_3.00.png","Tea_O_ginger_SGD_2.80.png","Teh_cino_ice__SGD_3.00.png","Teh_C_kosong_ice_SGD_2.70.png","Teh_ginger_ice__SGD_2.90_SGD_3.00.png","TEH_O_ICE_LIMAU__SGD_2.70.png","Teh_O_ice_SGD_2.20_SGD_2.40.png","Teh_O_mint_ice_SGD_2.60_SGD_2.70.png","Ying_yang_Ice_SGD_2.80_SGD_3.00.png"],"CAN DRINKS":["100_PLUS__SGD_1.90_.png","APPLE_CAN_DRINK__SGD_1.90_.png","AYATAKA__SGD_1.90_.png","CHRYSANTHEMUM_TEA__SGD_1.90_.png","DASANI_WATER__SGD_1.50_.png","Ice_cream_soda__SGD_1.90_.png","KICKAPOO__SGD_1.90_.png","Oolong_TEA__SGD_1.90_.png","QOO__SDG_1.90_.png","REDBULL__SGD_2.00_.png"],"INDIAN FOOD":["Chicken_biryani__SGD_9.90.png","MEE_COMPO__SGD_12.90.png","MEE_GORENG_SEA_FOOD__SGD_8.50.png","MEE_GORENG__SGD_6.90.png","MURTABAK__CHICKEN____SGD_10.90.png","MURTABAK__MUTTON__sgd__13.50.png","mutton_biriyani_SGD_11.20.png","PRATA_TELUR___SGD_4.20.png","TOSAI_MASALA__SGD_5.50.png"],SUGARCANE:["Fresh_sugarcan_asam__ice__SGD_4.70_.png","Fresh_sugarcan_ice__SGD_4.00_.png","Fresh_Sugercan__lemon_LESS__ice__SGD_4.50_.png","Fresh_Sugercan__lemon_no_ice__SGD_4.90_.png"],HOT:["BOOST_HOT__SGD_2.50_.png","BRU_COFFEE_GINGER__2.40_SGD__.png","BRU_COFFEE_NO_SUGAR__SGD_2.40_.png","Cofee_cino_HOT__SGD_3.00_.png","GINGER_HORLICKS_HOT__SGD_2.70_.png","GINGER_KOPI___SGD_2.40_.png","GINGER_WATER_HOT__SGD_2.50_.png","HOT_MILK__1.80_SGD_.png","Hot_Teh_Chino__SGD_3.00_.png","HOT_TEH_O__LIMAU__SGD_2.20_.png","KOPI_O_GINGER__SGD_2.10_.png","MILO_GINGER__SGD_2.40_.png","MILO_HOT__SGD_2.40_.png","MSALA_TEA_WITH_GINGER___SGD_2.50_.png","NESCAFE_GINGER___SGD_2.90_.png","NESCAFE_HOT__SGD_2.90_.png","NESLO__HOT___SGD_2.50_.png","TEH_C_NO_SUGAR__SGD_2.20_.png","TEH_O_GINGER__SGD_2.30_.png","TEH_O_MINT_HOT__SGD_2.10_.png","TEH_O__SGD_1.70_.png","TEH_TARIK_ICE__SGD_3.00_.png","TEH_TARIK__SGD_2.00_.png","YING_YANG___SGD_2.20_.png"],SIDES:["CHEESE_FRIES_SGD__7.80.png","chicken_nuggets__6_pieces__SGD_6.40.png","french_fries_SGD_6.90.png","ONION_RINGS_SGD_6.90.png"]};var GD={};function qD(){return typeof process<"u"&&GD&&"production".toLowerCase()==="production"}const $D=["pending_payment","placed","paid","refunded","preparing","ready_for_pickup","out_for_delivery","delivered","cancelled","failed"],zD={pending_payment:{paid:"webhook",failed:"webhook",cancelled:"admin"},placed:{refunded:"admin",preparing:"admin",cancelled:"admin"},paid:{refunded:"admin",preparing:"admin",cancelled:"admin"},refunded:{},preparing:{ready_for_pickup:["admin","kitchen"],cancelled:"admin"},ready_for_pickup:{out_for_delivery:"rider",cancelled:"admin"},out_for_delivery:{delivered:"rider",cancelled:"admin"},delivered:{},cancelled:{},failed:{cancelled:"admin"}},pm=new Set($D);function Ma(n){return String(n??"").trim().toLowerCase().replace(/-/g,"_").replace(/\s+/g,"_")}function WD(n,e){const t=Ma(n),r=zD[t]||{};return Object.entries(r).filter(([,s])=>e?Array.isArray(s)?s.includes(e):s===e:!0).map(([s])=>s)}const HD={pending:"paid",confirmed:"preparing",ready:"ready_for_pickup",delivering:"out_for_delivery",complete:"delivered",completed:"delivered",refunded:"refunded",canceled:"cancelled",assigned:"out_for_delivery",picked_up:"out_for_delivery"};function hu(n,e){const t=(n==null?void 0:n.paymentMethod)??(n==null?void 0:n.payment_mode)??(n==null?void 0:n.paymentMode),r=t==null?"":String(t).trim().toUpperCase();return r!=="COD"&&r!=="CASH"&&r!==""||Ma(e)!=="paid"?e:String((n==null?void 0:n.paymentStatus)??(n==null?void 0:n.payment_status)??"").trim().toUpperCase()==="PAID"?"paid":"placed"}function KD(n,e){const t=(e==null?void 0:e.strict)??qD(),r=(e==null?void 0:e.logger)||(()=>{}),s=Ma(n==null?void 0:n.status);if(pm.has(s)){const o=(n==null?void 0:n.paymentMethod)??(n==null?void 0:n.payment_mode)??(n==null?void 0:n.paymentMode),c=o==null?"":String(o).trim().toUpperCase();if(s==="pending_payment"&&String((n==null?void 0:n.paymentStatus)??"").toUpperCase()==="PAID")return r("state mismatch: pending_payment with PAID paymentStatus",{status:s,paymentStatus:n==null?void 0:n.paymentStatus}),t&&r("strict mode: normalized persisted pending_payment+PAID to paid",{paymentMethod:c||null}),c==="STRIPE"?"paid":s;if(s==="placed"){const u=(n==null?void 0:n.paymentStatus)??(n==null?void 0:n.payment_status),f=!(c==="STRIPE")&&!(c==="ONLINE"),m=c==="SCANNER";let I="";u==null||u===""?(f||m)&&(n.paymentStatus="NOT_APPLICABLE",I="NOT_APPLICABLE"):I=String(u).trim().toUpperCase(),I==="NOT_APPLICABLE"||I==="COD_PENDING"||(f||m)&&(I==="PENDING"||I==="PAID")||(r("state mismatch: placed requires paymentStatus NOT_APPLICABLE or COD_PENDING (legacy COD PENDING accepted)",{status:s,paymentStatus:n==null?void 0:n.paymentStatus,paymentMethod:c||null}),t&&r("strict mode: tolerated placed mismatch for read normalization",{paymentMethod:c||null}))}return hu(n,s)}const i=[n==null?void 0:n.orderStatus,n==null?void 0:n.order_status,n==null?void 0:n.stage].map(Ma).filter(Boolean);for(const o of i){const c=pm.has(o)?o:HD[o];if(c)return r("legacy status mapped",{source:o,mapped:c}),hu(n,c)}if(r("unknown order status token",{status:n==null?void 0:n.status,orderStatus:n==null?void 0:n.orderStatus,order_status:n==null?void 0:n.order_status,stage:n==null?void 0:n.stage}),t)throw new Error("Invalid persisted order state");return hu(n,"paid")}const QN={COD:"COD",SCANNER:"SCANNER",STRIPE:"STRIPE"};function go(n){const e={...n},t=e.paymentMethod??e.payment_method,r=e.paymentMode??e.payment_mode;let s=t;(s==null||String(s).trim()===""||String(s).toUpperCase()==="NULL")&&(s=r??"COD"),String(s).toUpperCase()==="CASH"&&(s="COD"),e.paymentMethod=s;let i=e.paymentStatus??e.payment_status;return(i==null||String(i).trim()===""||String(i).toUpperCase()==="NULL")&&(i=s==="COD"||s==="CASH"?"COD_PENDING":"PENDING"),(s==="COD"||s==="CASH")&&i==="PENDING"&&(i="COD_PENDING"),e.paymentStatus=i,e}function Fa(n){const e=go(n||{});return KD(e,{strict:typeof process<"u",logger:(t,r)=>{}})}function QD(n){const e=WD(n,"admin");return e.includes("preparing")?"preparing":e.includes("ready_for_pickup")?"ready_for_pickup":e[0]||null}function cE(n){const e=String(n||"").trim().toUpperCase().replace(/\s+/g,"_");return e==="CANCELLED"||e==="CANCELED"?"cancelled":e==="CONFIRMED"||e==="PREPARING"?"preparing":e==="READY"?"ready_for_pickup":e==="PLACED"?"placed":e==="PENDING"?"paid":e==="OUT_FOR_DELIVERY"||e==="DELIVERING"||e==="ON_THE_WAY"?"out_for_delivery":e==="DELIVERED"||e==="COMPLETE"||e==="COMPLETED"?"delivered":String(n||"").trim().toLowerCase().replace(/\s+/g,"_")}const JD=Object.freeze(["LOCAL","DUAL_READ","SHARED"]);function mm(n){const e=String(n??"").trim().toUpperCase();return e&&JD.includes(e)?e:null}function YD(n){const e=mm(n==null?void 0:n.forceModeRaw);if(e)return e;const t=mm(n==null?void 0:n.modeRaw);return t||(n==null?void 0:n.defaultMode)}const XD=1;function ZD(n){const e=String(n??"").trim().toLowerCase();return e==="paid"||e==="placed"}function JN(n){const e=Fa(typeof n=="object"&&n!==null?n:{status:n});return QD(e)}function Uh(n){const e=n.paymentMethod??n.payment_method??"";return String(e).toLowerCase().trim()}function ek(n){const e=n==null?void 0:n.paidAt;return e!=null&&e!==""}function tk(n){if(String(n.paymentStatus??n.payment_status??"").trim().toUpperCase()==="PAID"||ek(n))return!0;const t=String(n.paymentMethod??n.payment_mode??"").trim().toUpperCase();return t==="COD"||t==="CASH"?!1:String(n.status??"").trim().toLowerCase()==="paid"}function uE(n){const e=String(n.paymentStatus??"").trim(),t=e.toLowerCase();let r;if(t==="paid"||e==="PAID")r="PAID";else if(t==="not_applicable"||e==="NOT_APPLICABLE")r="NOT_APPLICABLE";else if(t==="pending_verification"||e==="PENDING_VERIFICATION")r="PENDING_VERIFICATION";else if(t==="failed")r="FAILED";else{const i=String(n.payment_status??"").trim().toLowerCase();i==="paid"?r="PAID":r="PENDING"}return Uh(n)==="cod"?r==="PENDING"||r==="PAID"?r:"NOT_APPLICABLE":r}function nk(n,e){return n?"SETTLED":e==="FAILED"?"FAILED":e==="NOT_APPLICABLE"?"NOT_APPLICABLE":e==="PENDING_VERIFICATION"?"PENDING_VERIFICATION":"UNSETTLED"}function rk(n){return YD(n)}function sk(n,e,t){const r=go(n&&typeof n=="object"?n:{}),s=Uh(r),i=s==="cod",o=Fa(r),c=uE(r),u=tk(r),l=ZD(o),d=String(o).trim().toUpperCase().replace(/-/g,"_"),f=nk(u,c);return{readModelVersion:e,modeUsed:t,canonicalStatus:o,paymentMethodNorm:s,paymentStatusNorm:c,isCOD:i,isSettled:u,isQueueEligible:l,uiStatus:d,financialStatus:f}}function ik(n,e){const t=XD,r=rk({modeRaw:e==null?void 0:e.modeUsed,defaultMode:"LOCAL"});return sk(n,t,r)}function ok(n){const e=Uh(n);return e==="cod"||e==="phone"?{ok:!0}:uE(n)==="PAID"?{ok:!0}:{ok:!1,reason:"Payment must be verified (PAID) before confirming. Complete Stripe verification or mark QR/online as PAID."}}function YN(n,e){if(e==="all")return!0;const t=ik(n),r=t.paymentMethodNorm,s=t.paymentStatusNorm;return e==="cod"?r==="cod":e==="stripe_paid"?(r==="stripe"||r==="paypal")&&s==="PAID":e==="qr_pending"?r==="qr"&&s!=="PAID":!0}function ak(n){const e=(n||"").trim().toLowerCase();return e?e.includes("order status")||e.includes("track order")||e.includes("where is my order")?"You can track your order in the Order Tracking screen.":e.includes("payment")||e.includes("pay now")||e.includes("stripe")?"Payments are processed securely via Stripe, COD, or QR where available.":e.includes("refund")?"Admin will review refund requests shortly.":/\bhello\b|^hi\b|^hey\b|\bhi!\b/.test(e)?"Hi 👋 How can we help you today?":null:null}function lE(n,e){try{}catch{}}function XN(n,e="+65"){const t=String(n||"").trim();if(!t)return"";const r=t.replace(/\s+/g,"");if(r.startsWith("+"))return r;const s=r.replace(/[^\d]/g,"");return s?s.startsWith("65")?`+${s}`:`${e}${s}`:""}const ck=/^(\/|https?:\/\/)/i,uk=n=>String(n||"").replace(/\s+/g,"_"),lk=(n="")=>n.toLowerCase().split(" ").filter(Boolean).map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" "),Bh=n=>{const e=typeof n=="string"?n.trim():"";return ck.test(e)?e:""},hk=n=>{const t=String(n||"").replace(/\.[^.]+$/,"").split("_").filter(Boolean),r=(t[0]||"Menu Item").replace(/[-]+/g," ").trim(),s=t.length>1?t[1]:"",i=lk(r||"Menu Item"),o=Number.parseFloat(String(s).replace(/[^0-9.]/g,""));return{name:i,price:Number.isFinite(o)?o:0}},jh=n=>{const e=Kn(mt(re,"categories"));return Xt(e,r=>{n(r.docs.map(s=>({id:s.id,...s.data()})))},r=>{})},dk=async n=>{if(!_e.currentUser)throw new Error("Authentication required to add categories.");const e=n.id||`cat-${Date.now()}`;return await wt(we(re,"categories",e),{...n,id:e}),n},fk=(n,e)=>{if(!_e.currentUser)throw new Error("Authentication required to update categories.");return Bn(we(re,"categories",n),e)},pk=async n=>{var e;if(!_e.currentUser)throw new Error("Authentication required to delete categories.");try{await _c(we(re,"categories",n))}catch(t){throw t.code==="permission-denied"?new Error(`Permission Denied: Your account (${(e=_e.currentUser)==null?void 0:e.email}) is NOT authorized in Firestore rules to delete categories.`):t}},mk=async()=>new Promise((n,e)=>{const t=Fh({firestore:xh,db:re,includeUnavailable:!0,orderByCreatedDesc:!0,onData:r=>{t(),n(r)},onError:r=>{t(),e(r)},onIndexWarning:r=>{}})}),hE=(n,e=null)=>Fh({firestore:xh,db:re,categoryId:e,includeUnavailable:!0,orderByCreatedDesc:!0,onData:t=>n(t),onError:t=>{},onIndexWarning:t=>{}}),gk=async n=>{if(!_e.currentUser)throw new Error("Authentication required to add products.");const e=Bh(n.image||n.img||""),t=n.available!==void 0?!!n.available:!0,r=String(n.category||"").trim()||String(n.categoryId||"").trim()||"uncategorized",s=String(n.name||"").trim(),i=Number(n.price||0);if(!s)throw new Error("Product name is required.");if(!Number.isFinite(i)||i<0)throw new Error("Product price must be a valid non-negative number.");if(!e)throw new Error("Product image is required.");const o={name:s,price:i,image:e,category:r,available:t,createdAt:Dn(),updatedAt:Dn()};return{id:(await Sh(mt(re,"products"),o)).id,...o}},_k=(n,e)=>{if(!_e.currentUser)throw new Error("Authentication required to update products.");const t=Bh(e.image||e.img||""),r=e.available!==void 0?!!e.available:!0,s=String(e.category||"").trim()||String(e.categoryId||"").trim()||"uncategorized",i=String(e.name||"").trim(),o=Number(e.price||0);if(!i)throw new Error("Product name is required.");if(!Number.isFinite(o)||o<0)throw new Error("Product price must be a valid non-negative number.");if(!t)throw new Error("Product image is required.");return Bn(we(re,"products",n),{name:i,price:o,image:t,category:s,available:r,updatedAt:Dn()})},yk=async n=>{var t;if(!_e.currentUser)throw new Error("Authentication required to delete products.");try{const r=we(re,"products",n),s=await Nr(r);if(s.exists()){const i=s.data(),o=i.image||i.img;if(o&&(o.includes("firebasestorage.googleapis.com")||o.startsWith("gs://")))try{const c=ZI(rE,o);await XI(c)}catch{}}return await _c(r),!0}catch(r){throw r.code==="permission-denied"?new Error(`Permission Denied: You (${((t=_e.currentUser)==null?void 0:t.email)||"unauthenticated"}) do not have rights to delete products.`):r}},Ik=async()=>{if(!_e.currentUser)throw new Error("Authentication required to repair product images.");return(await Gs(qs,"repairProductImages")({})).data},ZN=async n=>{if(!_e.currentUser)throw new Error("Authentication required.");return(await Gs(qs,"deleteCustomerAccount")({uid:n})).data},eV=async({dryRun:n=!0,previewLimit:e=100}={})=>{if(!_e.currentUser)throw new Error("Authentication required.");return(await Gs(qs,"migrateProductImagePaths")({dryRun:n,previewLimit:e})).data},Ek=async n=>{if(!_e.currentUser)throw new Error("Authentication required.");const e=String(n||_e.currentUser.uid||"").trim();if(!e)throw new Error("Missing uid.");const r=await Gs(qs,"makeUserAdmin")({uid:e});return await _e.currentUser.getIdToken(!0),r.data},dE=n=>({...n.data(),id:n.id}),tV=n=>{const e=(n==null?void 0:n.items)??(n==null?void 0:n.lineItems)??[];return Array.isArray(e)?e.map(t=>{const r=Number((t==null?void 0:t.qty)??(t==null?void 0:t.quantity)??1),s=Number.isFinite(r)&&r>0?Math.min(999,Math.floor(r)):1,i=String((t==null?void 0:t.name)??(t==null?void 0:t.title)??(t==null?void 0:t.productName)??"Item").trim()||"Item";return{qty:s,name:i}}):[]},wk=async n=>{throw new Error("Direct client order writes are disabled. Use backend callable order creation.")},Tk=async()=>{try{const n=Kn(mt(re,"orders"),kr("createdAt","desc"));return(await Da(n)).docs.map(dE).map(go)}catch(n){throw lE("Failed to fetch orders",{error:(n==null?void 0:n.message)||n,code:n==null?void 0:n.code}),n}},fE=n=>{const e=Kn(mt(re,"orders"),kr("createdAt","desc"));return Xt(e,r=>{const i=r.docs.map(dE).map(go);n(i)},r=>{lE("Orders Subscription Error",{error:(r==null?void 0:r.message)||r,code:r==null?void 0:r.code})})},Ak=async n=>{try{const e=we(re,"orders",n),t=await Nr(e);if(t.exists()){const r={id:t.id,...t.data()};return go(r)}throw new Error("Order not found")}catch(e){throw e}},vk=async(n,e,t={})=>{const r=we(re,"orders",n),s=await Nr(r);if(!s.exists())throw new Error("Order not found");const i={id:n,...s.data()},o=String(e||"").trim().toLowerCase().replace(/[\s-]+/g,"_"),u={confirmed:"preparing",pending:"preparing",preparing:"preparing",ready:"ready_for_pickup"}[o]??cE(e);await Sk(n,i,u)};async function bk(n,{toStatus:e,metadata:t={}}){await Gs(qs,"transitionOrderStatus")({orderId:n,nextStatus:e,metadata:t})}const Sk=async(n,e,t)=>{if(!_e.currentUser)throw new Error("Authentication required");const r=cE(t),s=Fa(e);if(r==="preparing"&&s==="paid"){const i=ok(e);if(!i.ok)throw new Error(i.reason)}await bk(n,{toStatus:r,metadata:{source:"advanceOrderPipeline"}})},Rk=async n=>{if(!_e.currentUser)throw new Error("Authentication required to delete orders.");return(await Gs(qs,"deleteOrderByAdmin")({orderId:n})).data},Pk=async(n,e,t=null)=>{const r=`msg-${Date.now()}`,s=we(mt(re,"orders",n,"messages"),r),i={...e,id:r,token:t,createdAt:new Date().toISOString(),read:!1};await wt(s,i);const o=we(re,"orders",n),c=await Nr(o);if(c.exists()){const u=c.data();e.senderRole==="admin"?await Bn(o,{unreadCustomer:(u.unreadCustomer||0)+1}):await Bn(o,{unreadAdmin:(u.unreadAdmin||0)+1,lastGuestVerifyToken:t})}return i},xk=(n,e,t=null)=>{const r=mt(re,"orders",n,"messages");if(t)return e([]),()=>{};const s=Kn(r,kr("createdAt","asc"));return Xt(s,i=>{e(i.docs.map(o=>({id:o.id,...o.data()})))})},Ck=async(n,e,t=null)=>{const r=we(re,"orders",n);e==="admin"&&await Bn(r,{unreadAdmin:0})},Dk=async n=>{if(!_e.currentUser)return;const e=we(re,"orders",n);await Bn(e,{isNewForAdmin:!1,unreadAdmin:0})},kk=n=>String(n||"").trim().slice(0,140);async function Nk(n,e,t){const r=kk(t);e==="customer"?await wt(n,{updatedAt:Dn(),lastPreview:r,lastMessage:r,lastSenderRole:e,unreadByAdmin:!0,unreadByUser:!1},{merge:!0}):e==="admin"?await wt(n,{updatedAt:Dn(),lastPreview:r,lastMessage:r,lastSenderRole:e,unreadByUser:!0,unreadByAdmin:!1,resolved:!1},{merge:!0}):e==="bot"&&await wt(n,{updatedAt:Dn(),lastPreview:r,lastMessage:r,lastSenderRole:"bot"},{merge:!0})}const Gh=async(n,{text:e,senderRole:t},r={})=>{const s=(e||"").trim();if(!s||!n)throw new Error("Invalid support message");const i=we(re,"support_chats",n);if(await Nk(i,t,s),await Sh(mt(re,"support_chats",n,"messages"),{text:s,senderRole:t,createdAt:Dn()}),t==="customer"&&!r.skipBot){const o=ak(s);o&&await Gh(n,{text:o,senderRole:"bot"},{skipBot:!0})}},pE=(n,e)=>{if(!n)return()=>{};const t=Kn(mt(re,"support_chats",n,"messages"),kr("createdAt","asc"));return Xt(t,r=>e(r.docs.map(s=>({id:s.id,...s.data()}))),r=>{})},Vk=n=>{const e=Kn(mt(re,"support_chats"),kr("updatedAt","desc"));return Xt(e,t=>n(t.docs.map(r=>({id:r.id,...r.data()}))),t=>{n([])})},Ok=async n=>{n&&await wt(we(re,"support_chats",n),{unreadByAdmin:!1},{merge:!0})},qh=n=>{const e=Kn(mt(re,"gallery"),kr("createdAt","desc"));return Xt(e,r=>{n(r.docs.map(s=>({id:s.id,...s.data()})))},r=>{})},Lk=async n=>{if(!_e.currentUser)throw new Error("Authentication required to manage gallery.");const e=n.id||`gallery-${Date.now()}`,t={...n,id:e,createdAt:new Date().toISOString()};return await wt(we(re,"gallery",e),t),t},Mk=(n,e)=>{if(!_e.currentUser)throw new Error("Authentication required to manage gallery.");return Bn(we(re,"gallery",n),{...e,updatedAt:new Date().toISOString()})},Fk=async n=>{var t;if(!_e.currentUser)throw new Error("Authentication required to manage gallery.");try{const r=we(re,"gallery",n),s=await Nr(r);if(s.exists()){const i=s.data();if(i.url&&(i.url.includes("firebasestorage.googleapis.com")||i.url.startsWith("gs://")))try{const o=ZI(rE,i.url);await XI(o)}catch{}}return await _c(r),!0}catch(r){throw r.code==="permission-denied"?new Error(`Permission Denied: You (${((t=_e.currentUser)==null?void 0:t.email)||"unauthenticated"}) do not have rights to delete gallery items.`):r}},nV=()=>{try{return{categories:JSON.parse(localStorage.getItem("stm_categories")||"[]"),products:JSON.parse(localStorage.getItem("stm_products")||"[]"),orders:JSON.parse(localStorage.getItem("stm_orders")||"[]"),gallery:JSON.parse(localStorage.getItem("stm_gallery")||"[]")}}catch{return{categories:[],products:[],orders:[],gallery:[]}}},Uk=async(n=!1)=>{if(!_e.currentUser)throw new Error("Authentication required to seed data.");const e=await mk(),t=new Set(e.map(f=>f.id)),r=await Da(mt(re,"categories")),s=new Set(r.docs.map(f=>f.id)),i=await Da(mt(re,"gallery")),o=new Set(i.docs.map(f=>f.id)),c=[],u={SNACKS:"snacks","BURGER KABABAB":"BURGER KABABAB",DINOSAUR:"DINOSAUR",DESERT:"desert","COLD DRINKS":"cold drinks","CAN DRINKS":"CAN DRINKS","INDIAN FOOD":"indian food",SUGARCANE:"SUGARCANE",HOT:"HOT",SIDES:"sides"};Object.keys(La).forEach(f=>{La[f].forEach((m,I)=>{const b=hk(m),x=b.name,D=b.price,B={SNACKS:"snacks","BURGER KABABAB":"burgers-kebabs",DINOSAUR:"dinosaur",DESERT:"desserts","COLD DRINKS":"cold-drinks","CAN DRINKS":"can-drinks","INDIAN FOOD":"indian",SUGARCANE:"sugarcane",HOT:"hot-drinks",SIDES:"sides"}[f]||"snacks",U=um.find(Q=>Q.id===B),z=u[f]||f,W=`stm-prod-${f.substring(0,3).toLowerCase()}-${I}`;if(!t.has(W)){const Q=Bh(encodeURI(`/assets/SMT_FOOD/${uk(z)}/${m}`));c.push({id:W,name:x,price:D,categoryId:B,category:U?U.name:f,badge:I%5===0?"bestseller":"",available:!0,image:Q,img:Q})}})});let l=0;for(const f of um){const m=f.id;s.has(m)||(await wt(we(re,"categories",m),{...f,id:m,active:!0,icon:f.icon||f.emoji||"🍽️",order:f.order||l+1}),l++)}for(const f of c){const m=new Date().toISOString();await wt(we(re,"products",f.id),{...f,createdAt:m,updatedAt:m})}let d=0;try{const{galleryMedia:f}=await Ge(async()=>{const{galleryMedia:m}=await Promise.resolve().then(()=>rN);return{galleryMedia:m}},void 0,import.meta.url);for(const[m,I]of f.entries()){const b=`gallery-seed-${m}`;if(!o.has(b)){const x=I.toLowerCase().endsWith(".mp4")||I.toLowerCase().endsWith(".mov");await wt(we(re,"gallery",b),{id:b,url:`/aboutusimage/${I}`,type:x?"video":"image",title:I.replace(/_/g," ").split(".")[0].substring(0,20),active:!0,createdAt:new Date().toISOString()}),d++}}}catch{}return{categories:l,products:c.length,orders:0,gallery:d}},Bk=async()=>{const n=await Tk();return{totalOrders:n.length,totalRevenue:n.reduce((e,t)=>e+parseFloat(t.total||0),0).toFixed(2),popularItems:["Teh Tarik Special","Nasi Lemak"],recentOrders:n.slice(0,5)}};let mE=[],el=[],gE=[],_E=[];const $h=()=>window.dispatchEvent(new Event("stm_data_updated"));jh(n=>{mE=n,$h()});hE(n=>{el=n,$h()});fE(n=>{gE=n});qh(n=>{_E=n,$h()});const rV={getCategories:()=>[...mE],getProducts:()=>[...el],getProductsByCategory:n=>el.filter(e=>e.categoryId===n),getOrders:()=>[...gE],getGallery:()=>[..._E],addCategory:dk,updateCategory:fk,deleteCategory:pk,addProduct:gk,updateProduct:_k,deleteProduct:yk,repairProductImages:Ik,bootstrapAdminClaim:Ek,placeOrder:wk,updateOrderStatus:vk,deleteOrder:Rk,addGalleryItem:Lk,updateGalleryItem:Mk,deleteGalleryItem:Fk,subscribeCategories:jh,subscribeProducts:hE,subscribeOrders:fE,subscribeGallery:qh,fetchOrderById:Ak,getDashboardStats:Bk,seedFromLocalStorage:Uk,sendMessage:Pk,subscribeMessages:xk,markMessagesAsRead:Ck,markOrderAsSeen:Dk,sendSupportChatMessage:Gh,subscribeSupportChatMessages:pE,subscribeSupportInbox:Vk,markSupportChatReadByAdmin:Ok};function jk({conversationId:n,role:e="customer"}){const[t,r]=G.useState([]),[s,i]=G.useState(""),[o,c]=G.useState(!1),u=G.useRef(null);G.useEffect(()=>{if(!n)return;const f=pE(n,r);return()=>f()},[n]),G.useEffect(()=>{u.current&&(u.current.scrollTop=u.current.scrollHeight)},[t]);const l=async f=>{if(f.preventDefault(),!(!s.trim()||o||!n)){c(!0);try{await Gh(n,{text:s.trim(),senderRole:e}),i("")}catch{alert("Could not send message. Check your connection or try again.")}finally{c(!1)}}},d=e==="admin"?"Customer":"STM team";return _.jsxs("div",{style:{display:"flex",flexDirection:"column",height:"100%",minHeight:280,background:"#f8fafc"},children:[_.jsx("div",{ref:u,style:{flex:1,padding:"16px",overflowY:"auto",display:"flex",flexDirection:"column",gap:"12px"},children:t.length===0?_.jsxs("div",{style:{margin:"auto",textAlign:"center",padding:"16px",maxWidth:280},children:[_.jsx("div",{style:{fontWeight:900,color:"var(--green-dark)",marginBottom:8,fontSize:14},children:e==="customer"?"Message the team":"Reply to customer"}),_.jsx("p",{style:{fontSize:12,color:"#64748b",lineHeight:1.5,fontWeight:600},children:e==="customer"?"Staff see this inbox in Admin → Support. Replies appear here in real time.":"Your messages appear on the customer’s screen instantly."})]}):t.map(f=>{var b;const m=f.senderRole==="bot",I=f.senderRole===e;return _.jsxs("div",{style:{alignSelf:I?"flex-end":"flex-start",maxWidth:"88%",display:"flex",flexDirection:"column",alignItems:I?"flex-end":"flex-start"},children:[_.jsx("div",{style:{padding:"10px 14px",borderRadius:I?"16px 16px 4px 16px":"16px 16px 16px 4px",background:I?"var(--green-dark)":m?"#fffbeb":"white",color:I?"white":m?"#78350f":"#0f172a",boxShadow:"0 2px 8px rgba(0,0,0,0.04)",border:I?"none":`1px solid ${m?"#fde68a":"#e2e8f0"}`,fontSize:14,lineHeight:1.45,fontWeight:600,whiteSpace:"pre-wrap"},children:f.text}),_.jsxs("div",{style:{marginTop:4,fontSize:10,color:"#94a3b8",fontWeight:700,display:"flex",alignItems:"center",gap:4},children:[I?e==="admin"?_.jsx(uw,{size:10}):_.jsx(ns,{size:10}):m?null:_.jsx(ns,{size:10}),I?"You":m?"Auto-reply":d,_.jsx(vm,{size:10}),(b=f.createdAt)!=null&&b.toDate?f.createdAt.toDate().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):f.createdAt?new Date(f.createdAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):""]})]},f.id)})}),_.jsxs("form",{onSubmit:l,style:{padding:"12px 14px",background:"white",borderTop:"1px solid #e2e8f0",display:"flex",gap:8,alignItems:"center"},children:[_.jsx("input",{type:"text",value:s,onChange:f=>i(f.target.value),placeholder:e==="customer"?"Message the team…":"Reply…",style:{flex:1,padding:"12px 14px",borderRadius:12,border:"1.5px solid #e2e8f0",background:"#f8fafc",fontSize:14,outline:"none",fontWeight:600}}),_.jsx("button",{type:"submit",disabled:!s.trim()||o,style:{width:44,height:44,borderRadius:12,background:"var(--green-dark)",color:"white",border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:!s.trim()||o?"not-allowed":"pointer",opacity:!s.trim()||o?.55:1},children:_.jsx(bm,{size:18})})]})]})}function Gk(){try{let n=localStorage.getItem("stm_support_conv_id");return n||(n=`sc-${crypto.randomUUID()}`,localStorage.setItem("stm_support_conv_id",n)),n}catch{return`sc-${Date.now()}`}}function qk(){const[n,e]=G.useState(!1),[t,r]=G.useState("ai"),s=G.useMemo(()=>Gk(),[]);G.useEffect(()=>{const f=m=>{var b;e(!0);const I=(b=m.detail)==null?void 0:b.tab;r(I==="ai"||I==="team"?I:"team")};return window.addEventListener(Oa,f),()=>window.removeEventListener(Oa,f)},[]);const[i,o]=G.useState(()=>[{id:"w",role:"assistant",text:hm("")}]),[c,u]=G.useState(""),l=G.useRef(null);G.useEffect(()=>{l.current&&(l.current.scrollTop=l.current.scrollHeight)},[i,n,t]);const d=f=>{const m=(f||"").trim();if(!m)return;const I={id:`u-${Date.now()}`,role:"user",text:m},b={id:`a-${Date.now()}`,role:"assistant",text:hm(m)};o(x=>[...x,I,b]),u("")};return _.jsxs(_.Fragment,{children:[_.jsx(fr.button,{type:"button","aria-label":"Open help & chat",onClick:()=>e(!0),style:{position:"fixed",bottom:30,left:30,width:56,height:56,borderRadius:"50%",border:"none",background:"linear-gradient(135deg, #013220 0%, #056a48 100%)",color:"white",boxShadow:"0 10px 30px rgba(1,50,32,0.35)",zIndex:9992,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"},initial:{scale:0,opacity:0},animate:{scale:1,opacity:1},whileHover:{scale:1.06},whileTap:{scale:.94},children:_.jsx(rs,{size:26,strokeWidth:2.2})}),_.jsx(wm,{children:n&&_.jsxs(fr.div,{initial:{opacity:0,y:20,scale:.96},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:16,scale:.96},transition:{type:"spring",damping:26,stiffness:320},style:{position:"fixed",bottom:100,left:20,width:"min(400px, calc(100vw - 32px))",height:"min(560px, calc(100vh - 140px))",background:"white",borderRadius:24,boxShadow:"0 25px 60px rgba(0,0,0,0.18)",zIndex:9993,display:"flex",flexDirection:"column",overflow:"hidden",border:"1px solid #e2e8f0"},children:[_.jsxs("div",{style:{padding:"16px 18px",background:"var(--green-dark)",color:"white",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12},children:[_.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[_.jsx("div",{style:{width:40,height:40,borderRadius:12,background:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center"},children:_.jsx(lw,{size:22})}),_.jsxs("div",{children:[_.jsx("div",{style:{fontWeight:900,fontSize:15},children:"STM Help"}),_.jsx("div",{style:{fontSize:11,opacity:.85,fontWeight:600},children:"AI answers · Live team"})]})]}),_.jsx("button",{type:"button",onClick:()=>e(!1),style:{background:"none",border:"none",color:"white",cursor:"pointer",padding:8},children:_.jsx(Tm,{size:22})})]}),_.jsxs("div",{style:{display:"flex",padding:"10px 12px",gap:8,background:"#f1f5f9"},children:[_.jsxs("button",{type:"button",onClick:()=>r("ai"),style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"10px 12px",borderRadius:14,border:"none",fontWeight:800,fontSize:13,cursor:"pointer",background:t==="ai"?"white":"transparent",color:t==="ai"?"var(--green-dark)":"#64748b",boxShadow:t==="ai"?"0 2px 8px rgba(0,0,0,0.06)":"none"},children:[_.jsx(hw,{size:16})," AI assistant"]}),_.jsxs("button",{type:"button",onClick:()=>r("team"),style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"10px 12px",borderRadius:14,border:"none",fontWeight:800,fontSize:13,cursor:"pointer",background:t==="team"?"white":"transparent",color:t==="team"?"var(--green-dark)":"#64748b",boxShadow:t==="team"?"0 2px 8px rgba(0,0,0,0.06)":"none"},children:[_.jsx(dw,{size:16})," Live team"]})]}),t==="ai"&&_.jsxs(_.Fragment,{children:[_.jsx("div",{ref:l,style:{flex:1,overflowY:"auto",padding:"14px 16px",display:"flex",flexDirection:"column",gap:12,background:"#fafafa"},children:i.map(f=>_.jsxs("div",{style:{alignSelf:f.role==="user"?"flex-end":"flex-start",maxWidth:"92%"},children:[_.jsx("div",{style:{padding:"12px 14px",borderRadius:f.role==="user"?"18px 18px 4px 18px":"18px 18px 18px 4px",background:f.role==="user"?"var(--green-dark)":"white",color:f.role==="user"?"white":"#0f172a",fontSize:13,lineHeight:1.5,fontWeight:600,whiteSpace:"pre-wrap",border:f.role==="user"?"none":"1px solid #e2e8f0",boxShadow:"0 2px 8px rgba(0,0,0,0.04)"},children:f.text.split("**").map((m,I)=>I%2===1?_.jsx("strong",{children:m},I):_.jsx("span",{children:m},I))}),_.jsx("div",{style:{fontSize:10,color:"#94a3b8",marginTop:4,fontWeight:700},children:f.role==="user"?"You":"AI assistant"})]},f.id))}),_.jsx("div",{style:{padding:"8px 12px 4px",display:"flex",flexWrap:"wrap",gap:6,background:"#fafafa"},children:ND.map(f=>_.jsx("button",{type:"button",onClick:()=>d(f),style:{fontSize:11,fontWeight:800,padding:"6px 10px",borderRadius:999,border:"1px solid #cbd5e1",background:"white",color:"#475569",cursor:"pointer"},children:f},f))}),_.jsxs("form",{onSubmit:f=>{f.preventDefault(),d(c)},style:{padding:12,display:"flex",gap:8,borderTop:"1px solid #e2e8f0",background:"white"},children:[_.jsx("input",{value:c,onChange:f=>u(f.target.value),placeholder:"Ask the assistant…",style:{flex:1,padding:"12px 14px",borderRadius:14,border:"1.5px solid #e2e8f0",fontSize:14,fontWeight:600}}),_.jsx("button",{type:"submit",disabled:!c.trim(),style:{width:46,height:46,borderRadius:14,border:"none",background:"var(--green-dark)",color:"white",cursor:c.trim()?"pointer":"not-allowed",opacity:c.trim()?1:.5,display:"flex",alignItems:"center",justifyContent:"center"},children:_.jsx(bm,{size:18})})]})]}),t==="team"&&_.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",minHeight:0},children:[_.jsxs("div",{style:{fontSize:11,color:"#64748b",padding:"8px 14px",fontWeight:700,background:"#fffbeb",borderBottom:"1px solid #fde68a"},children:["Thread ID: ",_.jsxs("code",{style:{fontSize:10},children:[s.slice(0,18),"…"]})," — staff reply from Admin → Support."]}),_.jsx(jk,{conversationId:s,role:"customer"})]})]})})]})}/*! Capacitor: https://capacitorjs.com/ - MIT License */var Rs;(function(n){n.Unimplemented="UNIMPLEMENTED",n.Unavailable="UNAVAILABLE"})(Rs||(Rs={}));class du extends Error{constructor(e,t,r){super(e),this.message=e,this.code=t,this.data=r}}const $k=n=>{var e,t;return n!=null&&n.androidBridge?"android":!((t=(e=n==null?void 0:n.webkit)===null||e===void 0?void 0:e.messageHandlers)===null||t===void 0)&&t.bridge?"ios":"web"},zk=n=>{const e=n.CapacitorCustomPlatform||null,t=n.Capacitor||{},r=t.Plugins=t.Plugins||{},s=()=>e!==null?e.name:$k(n),i=()=>s()!=="web",o=f=>{const m=l.get(f);return!!(m!=null&&m.platforms.has(s())||c(f))},c=f=>{var m;return(m=t.PluginHeaders)===null||m===void 0?void 0:m.find(I=>I.name===f)},u=f=>n.console.error(f),l=new Map,d=(f,m={})=>{const I=l.get(f);if(I)return I.proxy;const b=s(),x=c(f);let D;const O=async()=>(!D&&b in m?D=typeof m[b]=="function"?D=await m[b]():D=m[b]:e!==null&&!D&&"web"in m&&(D=typeof m.web=="function"?D=await m.web():D=m.web),D),B=(y,w)=>{var v,A;if(x){const R=x==null?void 0:x.methods.find(E=>w===E.name);if(R)return R.rtype==="promise"?E=>t.nativePromise(f,w.toString(),E):(E,Pe)=>t.nativeCallback(f,w.toString(),E,Pe);if(y)return(v=y[w])===null||v===void 0?void 0:v.bind(y)}else{if(y)return(A=y[w])===null||A===void 0?void 0:A.bind(y);throw new du(`"${f}" plugin is not implemented on ${b}`,Rs.Unimplemented)}},U=y=>{let w;const v=(...A)=>{const R=O().then(E=>{const Pe=B(E,y);if(Pe){const gt=Pe(...A);return w=gt==null?void 0:gt.remove,gt}else throw new du(`"${f}.${y}()" is not implemented on ${b}`,Rs.Unimplemented)});return y==="addListener"&&(R.remove=async()=>w()),R};return v.toString=()=>`${y.toString()}() { [capacitor code] }`,Object.defineProperty(v,"name",{value:y,writable:!1,configurable:!1}),v},z=U("addListener"),W=U("removeListener"),Q=(y,w)=>{const v=z({eventName:y},w),A=async()=>{const E=await v;W({eventName:y,callbackId:E},w)},R=new Promise(E=>v.then(()=>E({remove:A})));return R.remove=async()=>{await A()},R},T=new Proxy({},{get(y,w){switch(w){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return x?Q:z;case"removeListener":return W;default:return U(w)}}});return r[f]=T,l.set(f,{name:f,proxy:T,platforms:new Set([...Object.keys(m),...x?[b]:[]])}),T};return t.convertFileSrc||(t.convertFileSrc=f=>f),t.getPlatform=s,t.handleError=u,t.isNativePlatform=i,t.isPluginAvailable=o,t.registerPlugin=d,t.Exception=du,t.DEBUG=!!t.DEBUG,t.isLoggingEnabled=!!t.isLoggingEnabled,t},Wk=n=>n.Capacitor=zk(n),ts=Wk(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),Ic=ts.registerPlugin;class zh{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,t){let r=!1;this.listeners[e]||(this.listeners[e]=[],r=!0),this.listeners[e].push(t);const i=this.windowListeners[e];i&&!i.registered&&this.addWindowListener(i),r&&this.sendRetainedArgumentsForEvent(e);const o=async()=>this.removeListener(e,t);return Promise.resolve({remove:o})}async removeAllListeners(){this.listeners={};for(const e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t,r){const s=this.listeners[e];if(!s){if(r){let i=this.retainedEventArguments[e];i||(i=[]),i.push(t),this.retainedEventArguments[e]=i}return}s.forEach(i=>i(t))}hasListeners(e){var t;return!!(!((t=this.listeners[e])===null||t===void 0)&&t.length)}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:r=>{this.notifyListeners(t,r)}}}unimplemented(e="not implemented"){return new ts.Exception(e,Rs.Unimplemented)}unavailable(e="not available"){return new ts.Exception(e,Rs.Unavailable)}async removeListener(e,t){const r=this.listeners[e];if(!r)return;const s=r.indexOf(t);this.listeners[e].splice(s,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){const t=this.retainedEventArguments[e];t&&(delete this.retainedEventArguments[e],t.forEach(r=>{this.notifyListeners(e,r)}))}}const gm=n=>encodeURIComponent(n).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),_m=n=>n.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class Hk extends zh{async getCookies(){const e=document.cookie,t={};return e.split(";").forEach(r=>{if(r.length<=0)return;let[s,i]=r.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");s=_m(s).trim(),i=_m(i).trim(),t[s]=i}),t}async setCookie(e){try{const t=gm(e.key),r=gm(e.value),s=e.expires?`; expires=${e.expires.replace("expires=","")}`:"",i=(e.path||"/").replace("path=",""),o=e.url!=null&&e.url.length>0?`domain=${e.url}`:"";document.cookie=`${t}=${r||""}${s}; path=${i}; ${o};`}catch(t){return Promise.reject(t)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(t){return Promise.reject(t)}}async clearCookies(){try{const e=document.cookie.split(";")||[];for(const t of e)document.cookie=t.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}}Ic("CapacitorCookies",{web:()=>new Hk});const Kk=async n=>new Promise((e,t)=>{const r=new FileReader;r.onload=()=>{const s=r.result;e(s.indexOf(",")>=0?s.split(",")[1]:s)},r.onerror=s=>t(s),r.readAsDataURL(n)}),Qk=(n={})=>{const e=Object.keys(n);return Object.keys(n).map(s=>s.toLocaleLowerCase()).reduce((s,i,o)=>(s[i]=n[e[o]],s),{})},Jk=(n,e=!0)=>n?Object.entries(n).reduce((r,s)=>{const[i,o]=s;let c,u;return Array.isArray(o)?(u="",o.forEach(l=>{c=e?encodeURIComponent(l):l,u+=`${i}=${c}&`}),u.slice(0,-1)):(c=e?encodeURIComponent(o):o,u=`${i}=${c}`),`${r}&${u}`},"").substr(1):null,Yk=(n,e={})=>{const t=Object.assign({method:n.method||"GET",headers:n.headers},e),s=Qk(n.headers)["content-type"]||"";if(typeof n.data=="string")t.body=n.data;else if(s.includes("application/x-www-form-urlencoded")){const i=new URLSearchParams;for(const[o,c]of Object.entries(n.data||{}))i.set(o,c);t.body=i.toString()}else if(s.includes("multipart/form-data")||n.data instanceof FormData){const i=new FormData;if(n.data instanceof FormData)n.data.forEach((c,u)=>{i.append(u,c)});else for(const c of Object.keys(n.data))i.append(c,n.data[c]);t.body=i;const o=new Headers(t.headers);o.delete("content-type"),t.headers=o}else(s.includes("application/json")||typeof n.data=="object")&&(t.body=JSON.stringify(n.data));return t};class Xk extends zh{async request(e){const t=Yk(e,e.webFetchExtra),r=Jk(e.params,e.shouldEncodeUrlParams),s=r?`${e.url}?${r}`:e.url,i=await fetch(s,t),o=i.headers.get("content-type")||"";let{responseType:c="text"}=i.ok?e:{};o.includes("application/json")&&(c="json");let u,l;switch(c){case"arraybuffer":case"blob":l=await i.blob(),u=await Kk(l);break;case"json":u=await i.json();break;case"document":case"text":default:u=await i.text()}const d={};return i.headers.forEach((f,m)=>{d[m]=f}),{data:u,headers:d,status:i.status,url:i.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:"GET"}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:"POST"}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:"PUT"}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:"PATCH"}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:"DELETE"}))}}Ic("CapacitorHttp",{web:()=>new Xk});var ym;(function(n){n.Dark="DARK",n.Light="LIGHT",n.Default="DEFAULT"})(ym||(ym={}));var Im;(function(n){n.StatusBar="StatusBar",n.NavigationBar="NavigationBar"})(Im||(Im={}));class Zk extends zh{async setStyle(){this.unavailable("not available for web")}async setAnimation(){this.unavailable("not available for web")}async show(){this.unavailable("not available for web")}async hide(){this.unavailable("not available for web")}}Ic("SystemBars",{web:()=>new Zk});const eN=Ic("SplashScreen",{web:()=>Ge(()=>import("./web-l0u_SPd3.js"),__vite__mapDeps([0,1,2,3,4]),import.meta.url).then(n=>new n.SplashScreenWeb)});function tN({children:n}){const e=nl(),t=tl(),{userProfile:r}=Mh(),s=(r==null?void 0:r.role)==="rider",i=(r==null?void 0:r.role)==="admin",o=t.pathname.startsWith("/admin")||t.pathname.startsWith("/login")||t.pathname==="/mobile-role-select"||t.pathname.startsWith("/tracking"),c=[];return s?(c.push({id:"driver",icon:_.jsx(Sm,{size:24}),path:"/driver",label:"Deliveries"}),c.push({id:"profile",icon:_.jsx(ns,{size:24}),path:"/profile",label:"Profile"})):i||(c.push({id:"home",icon:_.jsx(Am,{size:24}),path:"/",label:"Home"}),c.push({id:"menu",icon:_.jsx(mu,{size:24}),path:"/menu",label:"Menu"}),c.push({id:"profile",icon:_.jsx(ns,{size:24}),path:"/profile",label:"Profile"})),_.jsxs("div",{style:{display:"flex",flexDirection:"column",minHeight:"100vh",paddingBottom:o?"0":"70px"},children:[_.jsx("div",{style:{flex:1,position:"relative"},children:n}),!o&&c.length>0&&_.jsx("div",{style:{position:"fixed",bottom:0,left:0,right:0,height:"70px",background:"white",borderTop:"1px solid #e2e8f0",display:"flex",justifyContent:"space-around",alignItems:"center",paddingBottom:"env(safe-area-inset-bottom, 16px)",zIndex:9999,boxShadow:"0 -4px 6px -1px rgba(0, 0, 0, 0.05)"},children:c.map(u=>{const l=t.pathname===u.path;return _.jsxs("div",{onClick:()=>e(u.path),style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"4px",color:l?"#0A8754":"#94a3b8",cursor:"pointer",padding:"8px",flex:1},children:[pu.cloneElement(u.icon,{color:l?"#0A8754":"#94a3b8",strokeWidth:l?2.5:2}),_.jsx("span",{style:{fontSize:"11px",fontWeight:l?"700":"500"},children:u.label})]},u.id)})})]})}function nN(){const n=nl(),e=[{id:"customer",title:"Order Food",description:"I want to order food and track deliveries",icon:_.jsx(fw,{size:32,color:"#0A8754"}),route:"/login",color:"rgba(10, 135, 84, 0.1)"},{id:"rider",title:"Rider Partner",description:"I am a delivery rider",icon:_.jsx(Sm,{size:32,color:"#f59e0b"}),route:"/login?role=rider",color:"rgba(245, 158, 11, 0.1)"},{id:"admin",title:"Restaurant Admin",description:"Manage orders and kitchen",icon:_.jsx(pw,{size:32,color:"#dc2626"}),route:"/login?role=admin",color:"rgba(220, 38, 38, 0.1)"}];return _.jsxs("div",{style:{minHeight:"100vh",background:"linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",padding:"24px",display:"flex",flexDirection:"column",justifyContent:"center",color:"white"},children:[_.jsxs(fr.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{duration:.5},style:{textAlign:"center",marginBottom:"40px"},children:[_.jsx("img",{src:"/stmsalamlogo.png",alt:"STM Salam",style:{width:"120px",marginBottom:"16px",borderRadius:"50%"}}),_.jsx("h1",{style:{fontSize:"28px",fontWeight:"800",margin:"0 0 8px 0"},children:"Welcome to STM"}),_.jsx("p",{style:{color:"#94a3b8",margin:0},children:"Select your portal to continue"})]}),_.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:e.map((t,r)=>_.jsxs(fr.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{duration:.3,delay:r*.1},whileTap:{scale:.98},onClick:()=>n(t.route),style:{background:"rgba(255, 255, 255, 0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"20px",padding:"20px",display:"flex",alignItems:"center",gap:"16px",cursor:"pointer"},children:[_.jsx("div",{style:{width:"60px",height:"60px",borderRadius:"16px",background:t.color,display:"flex",alignItems:"center",justifyContent:"center"},children:t.icon}),_.jsxs("div",{children:[_.jsx("div",{style:{fontSize:"18px",fontWeight:"700",marginBottom:"4px"},children:t.title}),_.jsx("div",{style:{fontSize:"13px",color:"#94a3b8"},children:t.description})]})]},t.id))})]})}const yE=["tehtarik_premium.png","burger_bg.png","juice_bg.png","Heritage.png","v1.mp4","v2.mp4","v3.mp4","WhatsApp_Image_2026_04_08_at_10.56.53_PM.jpeg","WhatsApp_Image_2026_04_08_at_10.57.21_PM.jpeg","WhatsApp_Image_2026_04_08_at_8.22.51_PM.jpeg","WhatsApp_Image_2026_04_08_at_8.22.59_PM.jpeg","WhatsApp_Image_2026_04_08_at_8.26.13_PM.jpeg","WhatsApp_Image_2026_04_08_at_8.33.52_PM.jpeg","WhatsApp_Image_2026_04_08_at_8.34.04_PM.jpeg","WhatsApp_Image_2026_04_08_at_8.34.35_PM.jpeg","WhatsApp_Image_2026_04_08_at_8.34.50_PM.jpeg","WhatsApp_Image_2026_04_08_at_8.36.05_PM.jpeg","WhatsApp_Image_2026_04_08_at_8.42.54_PM.jpeg","WhatsApp_Image_2026_04_08_at_8.42.54_PM__1_.jpeg","WhatsApp_Image_2026_04_08_at_8.42.54_PM__2_.jpeg","WhatsApp_Image_2026_04_08_at_8.42.54_PM__3_.jpeg","WhatsApp_Image_2026_04_08_at_8.42.54_PM__4_.jpeg","WhatsApp_Image_2026_04_08_at_8.42.54_PM__5_.jpeg","WhatsApp_Image_2026_04_08_at_8.42.54_PM__6_.jpeg","WhatsApp_Video_2026_04_08_at_8.25.12_PM.mp4","WhatsApp_Video_2026_04_08_at_8.25.15_PM.mp4","WhatsApp_Video_2026_04_08_at_8.25.15_PM__1_.mp4","WhatsApp_Video_2026_04_08_at_8.31.20_PM.mp4"],rN=Object.freeze(Object.defineProperty({__proto__:null,galleryMedia:yE},Symbol.toStringTag,{value:"Module"})),sN={SNACKS:"snacks","BURGER KABABAB":"BURGER KABABAB",DINOSAUR:"DINOSAUR",DESERT:"desert","COLD DRINKS":"cold drinks","CAN DRINKS":"CAN DRINKS","INDIAN FOOD":"indian food",SUGARCANE:"SUGARCANE",HOT:"HOT",SIDES:"sides"},iN=n=>String(n||"").replace(/\s+/g,"_"),oN={SNACKS:"snacks","BURGER KABABAB":"burgers-kebabs",DINOSAUR:"dinosaur",DESERT:"desserts","COLD DRINKS":"cold-drinks","CAN DRINKS":"can-drinks","INDIAN FOOD":"indian",SUGARCANE:"sugarcane",HOT:"hot-drinks",SIDES:"sides"},aN=/(?:\(?SGD\s*\$?\s*\d+(?:\.\d+)?\)?|\$?\d+(?:\.\d+)?)/gi,cN=/\.(png|jpe?g|webp|gif)$/i,uN=new Set(["a","an","the","and","or","of","with","to","in","on","for","1","2","3","4","5","6","8","9","10","piece","pieces","pc","pcs","sgd","sdg","classic","original"]),IE=n=>(n||"").replace(cN,"").replace(/_/g," ").replace(aN," ").replace(/[()\[\]]/g," ").replace(/[^a-zA-Z0-9\s]/g," ").replace(/\s+/g," ").trim().toLowerCase(),Wh=n=>IE(n).split(" ").filter(e=>e.length>1&&!uN.has(e)),lN=n=>Wh(n).join(" "),fu=(()=>{const n=[];return Object.keys(La).forEach(e=>{const t=sN[e]||e,r=oN[e]||e.toLowerCase();for(const s of La[e]||[]){const i=IE(s);n.push({filename:s,path:encodeURI(`/assets/SMT_FOOD/${iN(t)}/${s}`),categoryId:r,cleanName:i,tokens:Wh(s),key:lN(s)})}}),n})();function hN(n){if(!n)return null;const e=n.name||"",t=Wh(e);if(t.length===0)return null;const r=new Set(t),s=t.join(" "),i=l=>{let d=0;for(const x of l.tokens)r.has(x)&&(d+=1);if(d===0)return 0;const f=l.key===s,m=l.key.includes(s)||s.includes(l.key),I=new Set([...r,...l.tokens]).size,b=d/I+d/t.length*.5;return f?b+2:m?b+.75:b};let o=null,c=0;const u=n.categoryId?fu.filter(l=>l.categoryId===n.categoryId):fu;for(const l of u){const d=i(l);d>c&&(o=l,c=d)}if(!o&&n.categoryId)for(const l of fu){const d=i(l);d>c&&(o=l,c=d)}return o&&c>=.15?o.path:null}function dN(n){const e=((n==null?void 0:n.image)||(n==null?void 0:n.img)||"").trim();return!!(!e||e.startsWith("https://images.unsplash.com")||e.startsWith("data:")&&e.length<80||!(e.startsWith("/")||e.startsWith("http://")||e.startsWith("https://")||e.startsWith("blob:")||e.startsWith("data:")||e.startsWith("gs://")))}function fN({category:n=null,includeUnavailable:e=!1,orderByCreatedDesc:t=!0}={}){const[r,s]=G.useState([]),[i,o]=G.useState(!0),[c,u]=G.useState(null);return G.useEffect(()=>{o(!0),u(null);const l=Fh({firestore:xh,db:re,categoryId:n,includeUnavailable:e,orderByCreatedDesc:t,onData:d=>{s(d),o(!1)},onError:d=>{u(d),o(!1)},onIndexWarning:d=>{}});return()=>l()},[n,e,t]),G.useMemo(()=>({products:r,loading:i,error:c}),[r,i,c])}const pN=(n=[])=>n.map(e=>{const t=e.image||e.img||"",r={...e,image:t,img:t};if(!dN(r))return r;const s=hN(e);return s?{...r,image:s,img:s}:r}),EE=G.createContext();function mN({children:n}){const{products:e,loading:t}=fN({orderByCreatedDesc:!0}),[r,s]=G.useState([]),[i,o]=G.useState([]),[c,u]=G.useState([]),[l,d]=G.useState(!0),[f,m]=G.useState(null),[I,b]=G.useState(!1),[x,D]=G.useState(!1);G.useEffect(()=>{const B=jh(T=>{o(y=>T.length===0&&y.length>0?y:T),b(!0)}),U=qh(T=>{const y=T;u(w=>y.length===0&&w.length>0?w:y),D(!0)}),z=()=>yE.map((T,y)=>{const w=T.toLowerCase().endsWith(".mp4")||T.toLowerCase().endsWith(".mov");return{id:`fallback-gallery-${y}`,url:`/aboutusimage/${T}`,type:w?"video":"image",name:T,active:!0}}),W=async()=>{u(T=>T.length>0?T:z()),d(!1)},Q=setTimeout(()=>{W()},5e3);return()=>{B(),U(),clearTimeout(Q)}},[]),G.useEffect(()=>{const B=pN(e);s(B)},[e]),G.useEffect(()=>{!t&&I&&x&&d(!1)},[t,I,x]);const O={products:r,categories:i,gallery:c,loading:l,error:f,refreshData:()=>{}};return _.jsx(EE.Provider,{value:O,children:n})}function sV(){const n=G.useContext(EE);if(!n)throw new Error("useData must be used within a DataProvider");return n}const gN=G.lazy(()=>Ge(()=>import("./Home-BPodW2Eo.js"),__vite__mapDeps([5,2,6,4,1,3]),import.meta.url)),_N=G.lazy(()=>Ge(()=>import("./Menu-CpGemzpy.js"),__vite__mapDeps([7,2,4,1,3]),import.meta.url)),yN=G.lazy(()=>Ge(()=>import("./Cart-DvZmE7nK.js"),__vite__mapDeps([8,2,4,1,3]),import.meta.url)),IN=G.lazy(()=>Ge(()=>import("./Gallery-BSWVagCi.js"),__vite__mapDeps([9,2,4,1,3]),import.meta.url)),EN=G.lazy(()=>Ge(()=>import("./AboutUs-CX7yy-pj.js"),__vite__mapDeps([10,2,4,1,3]),import.meta.url)),wN=G.lazy(()=>Ge(()=>import("./Checkout-DokNhIki.js"),__vite__mapDeps([11,2,4,1,3]),import.meta.url)),TN=G.lazy(()=>Ge(()=>import("./Login-I3jDSJ4b.js"),__vite__mapDeps([12,2,6,13,4,1,3]),import.meta.url)),AN=G.lazy(()=>Ge(()=>import("./Profile-inuF3nOB.js"),__vite__mapDeps([14,2,4,13,1,3]),import.meta.url)),vN=G.lazy(()=>Ge(()=>import("./OrderSuccess-Dw6sG2cf.js"),__vite__mapDeps([15,2,4]),import.meta.url)),bN=G.lazy(()=>Ge(()=>import("./PaymentSuccess-Cbgb121Q.js"),__vite__mapDeps([16,2,4]),import.meta.url)),SN=G.lazy(()=>Ge(()=>import("./PaymentCancel-QsGdZHYa.js"),__vite__mapDeps([17,2,4]),import.meta.url)),Em=G.lazy(()=>Ge(()=>import("./OrderTracking-DfTLYbSp.js"),__vite__mapDeps([18,2,19,4,20,1,3]),import.meta.url)),RN=G.lazy(()=>Ge(()=>import("./Admin-YovbLZrh.js"),__vite__mapDeps([21,2,4,19,13,1,3]),import.meta.url)),PN=G.lazy(()=>Ge(()=>import("./DriverPanel-BVV9-vUp.js"),__vite__mapDeps([22,2,20,4,1,3]),import.meta.url)),xN=G.lazy(()=>Ge(()=>import("./DataSeedPage-xrnM-x7G.js"),__vite__mapDeps([23,2,4,1,3]),import.meta.url)),CN=G.lazy(()=>Ge(()=>import("./ShopScan-D-HA-SY2.js"),__vite__mapDeps([24,2,20,4,1,3]),import.meta.url));function Me({children:n}){return _.jsx(fr.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},exit:{opacity:0,y:-8},transition:{duration:.2,ease:"easeOut"},children:n})}function DN(){const n=tl(),e=n.pathname,t=["/admin","/driver","/rider","/login","/order-success","/success","/cancel","/sandbox","/pay","/scan-pay"].some(u=>e.startsWith(u))||e.startsWith("/seed"),r=e.startsWith("/admin")||e.startsWith("/driver")||e.startsWith("/rider"),{userProfile:s,loading:i}=Mh();if(pu.useEffect(()=>{ts.isNativePlatform()&&eN.hide().catch(console.error)},[]),ts.isNativePlatform()&&!i&&!s&&e==="/")return _.jsx(Kd,{to:"/mobile-role-select",replace:!0});const o=ts.isNativePlatform(),c=o?tN:pu.Fragment;return _.jsxs(c,{children:[!t&&!o&&_.jsx(CD,{}),_.jsx(wm,{mode:"popLayout",children:_.jsx(G.Suspense,{fallback:_.jsx("div",{style:{minHeight:"100vh",display:"flex",justifyContent:"center",alignItems:"center"},children:_.jsx("div",{style:{width:"40px",height:"40px",border:"4px solid #e2e8f0",borderTopColor:"var(--green-dark)",borderRadius:"50%",animation:"spin 1s linear infinite"}})}),children:_.jsxs(ew,{location:n,children:[_.jsx(Ce,{path:"/",element:_.jsx(Me,{children:_.jsx(gN,{})})}),_.jsx(Ce,{path:"/menu",element:_.jsx(Me,{children:_.jsx(_N,{})})}),_.jsx(Ce,{path:"/gallery",element:_.jsx(Me,{children:_.jsx(IN,{})})}),_.jsx(Ce,{path:"/about",element:_.jsx(Me,{children:_.jsx(EN,{})})}),_.jsx(Ce,{path:"/cart",element:_.jsx(Me,{children:_.jsx(yN,{})})}),_.jsx(Ce,{path:"/checkout",element:_.jsx(Me,{children:_.jsx(wN,{})})}),_.jsx(Ce,{path:"/login",element:_.jsx(Me,{children:_.jsx(TN,{})})}),_.jsx(Ce,{path:"/profile",element:_.jsx(Me,{children:_.jsx(AN,{})})}),_.jsx(Ce,{path:"/order-success",element:_.jsx(Me,{children:_.jsx(vN,{})})}),_.jsx(Ce,{path:"/success",element:_.jsx(Me,{children:_.jsx(bN,{})})}),_.jsx(Ce,{path:"/cancel",element:_.jsx(Me,{children:_.jsx(SN,{})})}),_.jsx(Ce,{path:"/tracking/:orderId",element:_.jsx(Me,{children:_.jsx(Em,{})})}),_.jsx(Ce,{path:"/order-tracking/:orderId",element:_.jsx(Me,{children:_.jsx(Em,{})})}),_.jsx(Ce,{path:"/admin/*",element:_.jsx(Me,{children:_.jsx(RN,{})})}),_.jsx(Ce,{path:"/driver",element:_.jsx(Me,{children:_.jsx(PN,{})})}),_.jsx(Ce,{path:"/rider",element:_.jsx(Kd,{to:"/driver",replace:!0})}),_.jsx(Ce,{path:"/seed",element:_.jsx(Me,{children:_.jsx(xN,{})})}),_.jsx(Ce,{path:"/scan-pay/:orderId",element:_.jsx(Me,{children:_.jsx(CN,{})})}),_.jsx(Ce,{path:"/mobile-role-select",element:_.jsx(Me,{children:_.jsx(nN,{})})})]},n.pathname)})}),!t&&_.jsx(DD,{}),!r&&_.jsx(qk,{}),!r&&_.jsx(kD,{message:"Hi STM Salam, I need help with my order.",label:"Chat with Admin"})]})}function kN(){return _.jsx(RD,{children:_.jsx(mN,{children:_.jsx(mw,{children:_.jsx(ZE,{children:_.jsx(DN,{})})})})})}const iV=Object.freeze(Object.defineProperty({__proto__:null,default:kN},Symbol.toStringTag,{value:"Module"}));export{ZD as $,Km as A,MN as B,Xt as C,iE as D,ik as E,lE as F,ZI as G,rE as H,WN as I,HN as J,Bn as K,Ck as L,fE as M,Vk as N,Bk as O,QN as P,hE as Q,jh as R,oE as S,gk as T,_k as U,yk as V,kD as W,eV as X,Ek as Y,YN as Z,JN as _,gw as a,ok as a0,tV as a1,Dk as a2,Rk as a3,dk as a4,fk as a5,pk as a6,qh as a7,Lk as a8,Mk as a9,Fk as aa,Kn as ab,mt as ac,ZN as ad,Ok as ae,jk as af,Fa as ag,Sk as ah,Z0 as ai,kr as aj,Sh as ak,nx as al,nV as am,Uk as an,zh as ao,iV as ap,Mh as b,_e as c,rV as d,LN as e,qs as f,KN as g,Gs as h,qN as i,FN as j,BN as k,jN as l,we as m,re as n,PD as o,Nr as p,lu as q,lm as r,De as s,XN as t,sV as u,wt as v,Dn as w,GN as x,ev as y,UN as z};
