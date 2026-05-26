const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./Home-BO0rm5lm.js","./vendor-D9-CikdX.js","./api-C-givZ-6.js","./icons-C9fXCgbF.js","./index-BnBKAzgp.js","./index-D-SnMtD4.css","./Menu-B39mEeQP.js","./Cart-Chno_P3B.js","./Gallery-ZCN-y1h1.js","./AboutUs-DJCHTc59.js","./Checkout-DQ3Q1cPZ.js","./orderLifecycleGuards-B28NX-5n.js","./Login-CYsDML8b.js","./validators-KcHLYWIO.js","./runtimeSafety-DDGa35ag.js","./Profile-Dx6ejVTH.js","./OrderSuccess-CXhkZ7jl.js","./PaymentSuccess-7HkTdO3y.js","./PaymentCancel-C3z7zezB.js","./OrderTracking-Cqhd0eLb.js","./ChatWindow-CBAaW9eb.js","./Admin-Cas8iNeA.js","./DriverPanel-DE_lCXEQ.js","./DataSeedPage-BMH-VNrp.js"])))=>i.map(i=>d[i]);
import{_ as He}from"./index-BnBKAzgp.js";import{r as G,j as _,u as om,a as ME,L as Ye,m as Ri,A as am,B as LE,b as FE,c as Ue,N as UE}from"./vendor-D9-CikdX.js";import{L as BE,U as ta,M as es,S as Ld,X as cm,a as jE,H as GE,b as qE,I as $E,P as zE,c as KE,C as um,F as HE,d as WE,e as QE,f as lm,B as JE,g as YE,h as XE}from"./icons-C9fXCgbF.js";const hm=G.createContext();function ZE({children:n}){const[e,t]=G.useState(()=>{try{const l=localStorage.getItem("stm_salam_cart");if(!l)return[];const d=JSON.parse(l);return Array.isArray(d)?d:[]}catch{try{localStorage.removeItem("stm_salam_cart")}catch{}return[]}});G.useEffect(()=>{localStorage.setItem("stm_salam_cart",JSON.stringify(e))},[e]);const r=l=>{t(d=>d.find(m=>m.id===l.id)?d.map(m=>m.id===l.id?{...m,qty:m.qty+1}:m):[...d,{...l,qty:1}])},s=l=>{t(d=>d.filter(f=>f.id!==l))},i=(l,d)=>{t(f=>f.map(m=>{if(m.id===l){const y=Math.max(0,m.qty+d);return{...m,qty:y}}return m}).filter(m=>m.qty>0))},o=()=>t([]),c=e.reduce((l,d)=>l+d.price*d.qty,0),u=e.reduce((l,d)=>l+d.qty,0);return _.jsx(hm.Provider,{value:{cartItems:e,addToCart:r,removeFromCart:s,updateQty:i,clearCart:o,subtotal:c,totalItems:u},children:n})}const ew=()=>{const n=G.useContext(hm);if(!n)throw new Error("useCart must be used within a CartProvider");return n},tw=()=>{};var Fd={};/**
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
 */const dm=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},nw=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],o=n[t++],c=n[t++],u=((s&7)<<18|(i&63)<<12|(o&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=n[t++],o=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Wu={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],o=s+1<n.length,c=o?n[s+1]:0,u=s+2<n.length,l=u?n[s+2]:0,d=i>>2,f=(i&3)<<4|c>>4;let m=(c&15)<<2|l>>6,y=l&63;u||(y=64,o||(m=64)),r.push(t[d],t[f],t[m],t[y])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(dm(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):nw(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],c=s<n.length?t[n.charAt(s)]:0;++s;const l=s<n.length?t[n.charAt(s)]:64;++s;const f=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||c==null||l==null||f==null)throw new rw;const m=i<<2|c>>4;if(r.push(m),l!==64){const y=c<<4&240|l>>2;if(r.push(y),f!==64){const S=l<<6&192|f;r.push(S)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class rw extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const sw=function(n){const e=dm(n);return Wu.encodeByteArray(e,!0)},na=function(n){return sw(n).replace(/\./g,"")},fm=function(n){try{return Wu.decodeString(n,!0)}catch{}return null};/**
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
 */function Qu(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const iw=()=>Qu().__FIREBASE_DEFAULTS__,ow=()=>{if(typeof process>"u"||typeof Fd>"u")return;const n=Fd.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},aw=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&fm(n[1]);return e&&JSON.parse(e)},Ma=()=>{try{return tw()||iw()||ow()||aw()}catch{return}},pm=n=>{var e,t;return(t=(e=Ma())==null?void 0:e.emulatorHosts)==null?void 0:t[n]},Ju=n=>{const e=pm(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},mm=()=>{var n;return(n=Ma())==null?void 0:n.config},gm=n=>{var e;return(e=Ma())==null?void 0:e[`_${n}`]};/**
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
 */class Pi{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
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
 */function _m(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[na(JSON.stringify(t)),na(JSON.stringify(o)),""].join(".")}/**
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
 */function De(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function cw(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(De())}function ym(){var e;const n=(e=Ma())==null?void 0:e.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function uw(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function lw(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function hw(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function dw(){const n=De();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Im(){return!ym()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Em(){return!ym()&&!!navigator.userAgent&&(navigator.userAgent.includes("Safari")||navigator.userAgent.includes("WebKit"))&&!navigator.userAgent.includes("Chrome")}function La(){try{return typeof indexedDB=="object"}catch{return!1}}function fw(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)==null?void 0:i.message)||"")}}catch(t){e(t)}})}/**
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
 */const pw="FirebaseError";class vt extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=pw,Object.setPrototypeOf(this,vt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,vs.prototype.create)}}class vs{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?mw(i,r):"Error",c=`${this.serviceName}: ${o} (${s}).`;return new vt(s,c,r)}}function mw(n,e){return n.replace(gw,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const gw=/\{\$([^}]+)}/g;function _w(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function wt(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],o=e[s];if(Ud(i)&&Ud(o)){if(!wt(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function Ud(n){return n!==null&&typeof n=="object"}/**
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
 */function $i(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function ui(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function li(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function yw(n,e){const t=new Iw(n,e);return t.subscribe.bind(t)}class Iw{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");Ew(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Bc),s.error===void 0&&(s.error=Bc),s.complete===void 0&&(s.complete=Bc);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch{}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Ew(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Bc(){}/**
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
 */const ww=1e3,Tw=2,Aw=4*60*60*1e3,vw=.5;function bw(n,e=ww,t=Tw){const r=e*Math.pow(t,n),s=Math.round(vw*r*(Math.random()-.5)*2);return Math.min(Aw,r+s)}/**
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
 */function Ut(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function zi(n){return(await fetch(n,{credentials:"include"})).ok}class Tt{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */class Sw{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new Pi;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Pw(e))try{this.getOrInitializeService({instanceIdentifier:tr})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=tr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=tr){return this.instances.has(e)}getOptions(e=tr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&o.resolve(s)}return s}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Rw(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=tr){return this.component?this.component.multipleInstances?e:tr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Rw(n){return n===tr?void 0:n}function Pw(n){return n.instantiationMode==="EAGER"}/**
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
 */class Cw{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Sw(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var te;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(te||(te={}));const xw={debug:te.DEBUG,verbose:te.VERBOSE,info:te.INFO,warn:te.WARN,error:te.ERROR,silent:te.SILENT},Dw=te.INFO,kw={[te.DEBUG]:"log",[te.VERBOSE]:"log",[te.INFO]:"info",[te.WARN]:"warn",[te.ERROR]:"error"},Nw=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=kw[e];if(!s)throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Fa{constructor(e){this.name=e,this._logLevel=Dw,this._logHandler=Nw,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in te))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?xw[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,te.DEBUG,...e),this._logHandler(this,te.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,te.VERBOSE,...e),this._logHandler(this,te.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,te.INFO,...e),this._logHandler(this,te.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,te.WARN,...e),this._logHandler(this,te.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,te.ERROR,...e),this._logHandler(this,te.ERROR,...e)}}const Vw=(n,e)=>e.some(t=>n instanceof t);let Bd,jd;function Ow(){return Bd||(Bd=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Mw(){return jd||(jd=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const wm=new WeakMap,uu=new WeakMap,Tm=new WeakMap,jc=new WeakMap,Yu=new WeakMap;function Lw(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",o)},i=()=>{t(Sn(n.result)),s()},o=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&wm.set(t,n)}).catch(()=>{}),Yu.set(e,n),e}function Fw(n){if(uu.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",o),n.removeEventListener("abort",o)},i=()=>{t(),s()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",o),n.addEventListener("abort",o)});uu.set(n,e)}let lu={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return uu.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Tm.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Sn(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Uw(n){lu=n(lu)}function Bw(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Gc(this),e,...t);return Tm.set(r,e.sort?e.sort():[e]),Sn(r)}:Mw().includes(n)?function(...e){return n.apply(Gc(this),e),Sn(wm.get(this))}:function(...e){return Sn(n.apply(Gc(this),e))}}function jw(n){return typeof n=="function"?Bw(n):(n instanceof IDBTransaction&&Fw(n),Vw(n,Ow())?new Proxy(n,lu):n)}function Sn(n){if(n instanceof IDBRequest)return Lw(n);if(jc.has(n))return jc.get(n);const e=jw(n);return e!==n&&(jc.set(n,e),Yu.set(e,n)),e}const Gc=n=>Yu.get(n);function Gw(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(n,e),c=Sn(o);return r&&o.addEventListener("upgradeneeded",u=>{r(Sn(o.result),u.oldVersion,u.newVersion,Sn(o.transaction),u)}),t&&o.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),c}const qw=["get","getKey","getAll","getAllKeys","count"],$w=["put","add","delete","clear"],qc=new Map;function Gd(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(qc.get(e))return qc.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=$w.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||qw.includes(t)))return;const i=async function(o,...c){const u=this.transaction(o,s?"readwrite":"readonly");let l=u.store;return r&&(l=l.index(c.shift())),(await Promise.all([l[t](...c),s&&u.done]))[0]};return qc.set(e,i),i}Uw(n=>({...n,get:(e,t,r)=>Gd(e,t)||n.get(e,t,r),has:(e,t)=>!!Gd(e,t)||n.has(e,t)}));/**
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
 */class zw{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Kw(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function Kw(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const hu="@firebase/app",qd="0.14.11";/**
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
 */const zt=new Fa("@firebase/app"),Hw="@firebase/app-compat",Ww="@firebase/analytics-compat",Qw="@firebase/analytics",Jw="@firebase/app-check-compat",Yw="@firebase/app-check",Xw="@firebase/auth",Zw="@firebase/auth-compat",eT="@firebase/database",tT="@firebase/data-connect",nT="@firebase/database-compat",rT="@firebase/functions",sT="@firebase/functions-compat",iT="@firebase/installations",oT="@firebase/installations-compat",aT="@firebase/messaging",cT="@firebase/messaging-compat",uT="@firebase/performance",lT="@firebase/performance-compat",hT="@firebase/remote-config",dT="@firebase/remote-config-compat",fT="@firebase/storage",pT="@firebase/storage-compat",mT="@firebase/firestore",gT="@firebase/ai",_T="@firebase/firestore-compat",yT="firebase",IT="12.12.0";/**
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
 */const ra="[DEFAULT]",ET={[hu]:"fire-core",[Hw]:"fire-core-compat",[Qw]:"fire-analytics",[Ww]:"fire-analytics-compat",[Yw]:"fire-app-check",[Jw]:"fire-app-check-compat",[Xw]:"fire-auth",[Zw]:"fire-auth-compat",[eT]:"fire-rtdb",[tT]:"fire-data-connect",[nT]:"fire-rtdb-compat",[rT]:"fire-fn",[sT]:"fire-fn-compat",[iT]:"fire-iid",[oT]:"fire-iid-compat",[aT]:"fire-fcm",[cT]:"fire-fcm-compat",[uT]:"fire-perf",[lT]:"fire-perf-compat",[hT]:"fire-rc",[dT]:"fire-rc-compat",[fT]:"fire-gcs",[pT]:"fire-gcs-compat",[mT]:"fire-fst",[_T]:"fire-fst-compat",[gT]:"fire-vertex","fire-js":"fire-js",[yT]:"fire-js-all"};/**
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
 */const sa=new Map,wT=new Map,du=new Map;function $d(n,e){try{n.container.addComponent(e)}catch(t){zt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Lt(n){const e=n.name;if(du.has(e))return zt.debug(`There were multiple attempts to register component ${e}.`),!1;du.set(e,n);for(const t of sa.values())$d(t,n);for(const t of wT.values())$d(t,n);return!0}function Xt(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function TT(n,e,t=ra){Xt(n,e).clearInstance(t)}function Xe(n){return n==null?!1:n.settings!==void 0}/**
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
 */const AT={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Rn=new vs("app","Firebase",AT);/**
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
 */class vT{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Tt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Rn.create("app-deleted",{appName:this._name})}}/**
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
 */const vr=IT;function Am(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:ra,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw Rn.create("bad-app-name",{appName:String(s)});if(t||(t=mm()),!t)throw Rn.create("no-options");const i=sa.get(s);if(i){if(wt(t,i.options)&&wt(r,i.config))return i;throw Rn.create("duplicate-app",{appName:s})}const o=new Cw(s);for(const u of du.values())o.addComponent(u);const c=new vT(t,r,o);return sa.set(s,c),c}function Ki(n=ra){const e=sa.get(n);if(!e&&n===ra&&mm())return Am();if(!e)throw Rn.create("no-app",{appName:n});return e}function dt(n,e,t){let r=ET[n]??n;t&&(r+=`-${t}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const o=[`Unable to register library "${r}" with version "${e}":`];s&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&o.push("and"),i&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),zt.warn(o.join(" "));return}Lt(new Tt(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
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
 */const bT="firebase-heartbeat-database",ST=1,Ci="firebase-heartbeat-store";let $c=null;function vm(){return $c||($c=Gw(bT,ST,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Ci)}catch{}}}}).catch(n=>{throw Rn.create("idb-open",{originalErrorMessage:n.message})})),$c}async function RT(n){try{const t=(await vm()).transaction(Ci),r=await t.objectStore(Ci).get(bm(n));return await t.done,r}catch(e){if(e instanceof vt)zt.warn(e.message);else{const t=Rn.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});zt.warn(t.message)}}}async function zd(n,e){try{const r=(await vm()).transaction(Ci,"readwrite");await r.objectStore(Ci).put(e,bm(n)),await r.done}catch(t){if(t instanceof vt)zt.warn(t.message);else{const r=Rn.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});zt.warn(r.message)}}}function bm(n){return`${n.name}!${n.options.appId}`}/**
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
 */const PT=1024,CT=30;class xT{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new kT(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Kd();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>CT){const o=NT(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){zt.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Kd(),{heartbeatsToSend:r,unsentEntries:s}=DT(this._heartbeatsCache.heartbeats),i=na(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return zt.warn(t),""}}}function Kd(){return new Date().toISOString().substring(0,10)}function DT(n,e=PT){const t=[];let r=n.slice();for(const s of n){const i=t.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),Hd(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Hd(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class kT{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return La()?fw().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await RT(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return zd(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return zd(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function Hd(n){return na(JSON.stringify({version:2,heartbeats:n})).length}function NT(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
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
 */function VT(n){Lt(new Tt("platform-logger",e=>new zw(e),"PRIVATE")),Lt(new Tt("heartbeat",e=>new xT(e),"PRIVATE")),dt(hu,qd,n),dt(hu,qd,"esm2020"),dt("fire-js","")}VT("");function Sm(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const OT=Sm,Rm=new vs("auth","Firebase",Sm());/**
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
 */const ia=new Fa("@firebase/auth");function MT(n,...e){ia.logLevel<=te.WARN&&ia.warn(`Auth (${vr}): ${n}`,...e)}function jo(n,...e){ia.logLevel<=te.ERROR&&ia.error(`Auth (${vr}): ${n}`,...e)}/**
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
 */function At(n,...e){throw Xu(n,...e)}function kt(n,...e){return Xu(n,...e)}function Pm(n,e,t){const r={...OT(),[e]:t};return new vs("auth","Firebase",r).create(e,{appName:n.name})}function Nt(n){return Pm(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Xu(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Rm.create(n,...e)}function K(n,e,...t){if(!n)throw Xu(e,...t)}function jt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw jo(e),new Error(e)}function Kt(n,e){n||jt(e)}/**
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
 */function fu(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function LT(){return Wd()==="http:"||Wd()==="https:"}function Wd(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
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
 */function FT(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(LT()||lw()||"connection"in navigator)?navigator.onLine:!0}function UT(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class Hi{constructor(e,t){this.shortDelay=e,this.longDelay=t,Kt(t>e,"Short delay should be less than long delay!"),this.isMobile=cw()||hw()}get(){return FT()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Zu(n,e){Kt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class Cm{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;jt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;jt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;jt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const BT={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const jT=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],GT=new Hi(3e4,6e4);function Zt(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function Bt(n,e,t,r,s={}){return xm(n,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const c=$i({key:n.config.apiKey,...o}).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const l={method:e,headers:u,...i};return uw()||(l.referrerPolicy="no-referrer"),n.emulatorConfig&&Ut(n.emulatorConfig.host)&&(l.credentials="include"),Cm.fetch()(await Dm(n,n.config.apiHost,t,c),l)})}async function xm(n,e,t){n._canInitEmulator=!1;const r={...BT,...e};try{const s=new $T(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw Po(n,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const c=i.ok?o.errorMessage:o.error.message,[u,l]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw Po(n,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw Po(n,"email-already-in-use",o);if(u==="USER_DISABLED")throw Po(n,"user-disabled",o);const d=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Pm(n,d,l);At(n,d)}}catch(s){if(s instanceof vt)throw s;At(n,"network-request-failed",{message:String(s)})}}async function Wi(n,e,t,r,s={}){const i=await Bt(n,e,t,r,s);return"mfaPendingCredential"in i&&At(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function Dm(n,e,t,r){const s=`${e}${t}?${r}`,i=n,o=i.config.emulator?Zu(n.config,s):`${n.config.apiScheme}://${s}`;return jT.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}function qT(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class $T{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(kt(this.auth,"network-request-failed")),GT.get())})}}function Po(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=kt(n,e,r);return s.customData._tokenResponse=t,s}function Qd(n){return n!==void 0&&n.enterprise!==void 0}class zT{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return qT(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function KT(n,e){return Bt(n,"GET","/v2/recaptchaConfig",Zt(n,e))}/**
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
 */async function HT(n,e){return Bt(n,"POST","/v1/accounts:delete",e)}async function oa(n,e){return Bt(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function mi(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function km(n,e=!1){const t=X(n),r=await t.getIdToken(e),s=el(r);K(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:mi(zc(s.auth_time)),issuedAtTime:mi(zc(s.iat)),expirationTime:mi(zc(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function zc(n){return Number(n)*1e3}function el(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return jo("JWT malformed, contained fewer than 3 sections"),null;try{const s=fm(t);return s?JSON.parse(s):(jo("Failed to decode base64 JWT payload"),null)}catch(s){return jo("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Jd(n){const e=el(n);return K(e,"internal-error"),K(typeof e.exp<"u","internal-error"),K(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function ts(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof vt&&WT(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function WT({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class QT{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class pu{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=mi(this.lastLoginAt),this.creationTime=mi(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function aa(n){var f;const e=n.auth,t=await n.getIdToken(),r=await ts(n,oa(e,{idToken:t}));K(r==null?void 0:r.users.length,e,"internal-error");const s=r.users[0];n._notifyReloadListener(s);const i=(f=s.providerUserInfo)!=null&&f.length?Nm(s.providerUserInfo):[],o=YT(n.providerData,i),c=n.isAnonymous,u=!(n.email&&s.passwordHash)&&!(o!=null&&o.length),l=c?u:!1,d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new pu(s.createdAt,s.lastLoginAt),isAnonymous:l};Object.assign(n,d)}async function JT(n){const e=X(n);await aa(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function YT(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Nm(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
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
 */async function XT(n,e){const t=await xm(n,{},async()=>{const r=$i({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,o=await Dm(n,s,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:c,body:r};return n.emulatorConfig&&Ut(n.emulatorConfig.host)&&(u.credentials="include"),Cm.fetch()(o,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function ZT(n,e){return Bt(n,"POST","/v2/accounts:revokeToken",Zt(n,e))}/**
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
 */class Wr{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){K(e.idToken,"internal-error"),K(typeof e.idToken<"u","internal-error"),K(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Jd(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){K(e.length!==0,"internal-error");const t=Jd(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(K(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await XT(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,o=new Wr;return r&&(K(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(K(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(K(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Wr,this.toJSON())}_performRefresh(){return jt("not implemented")}}/**
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
 */function dn(n,e){K(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class _t{constructor({uid:e,auth:t,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new QT(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new pu(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await ts(this,this.stsTokenManager.getToken(this.auth,e));return K(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return km(this,e)}reload(){return JT(this)}_assign(e){this!==e&&(K(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new _t({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){K(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await aa(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Xe(this.auth.app))return Promise.reject(Nt(this.auth));const e=await this.getIdToken();return await ts(this,HT(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,o=t.photoURL??void 0,c=t.tenantId??void 0,u=t._redirectEventId??void 0,l=t.createdAt??void 0,d=t.lastLoginAt??void 0,{uid:f,emailVerified:m,isAnonymous:y,providerData:S,stsTokenManager:x}=t;K(f&&x,e,"internal-error");const k=Wr.fromJSON(this.name,x);K(typeof f=="string",e,"internal-error"),dn(r,e.name),dn(s,e.name),K(typeof m=="boolean",e,"internal-error"),K(typeof y=="boolean",e,"internal-error"),dn(i,e.name),dn(o,e.name),dn(c,e.name),dn(u,e.name),dn(l,e.name),dn(d,e.name);const O=new _t({uid:f,auth:e,email:s,emailVerified:m,displayName:r,isAnonymous:y,photoURL:o,phoneNumber:i,tenantId:c,stsTokenManager:k,createdAt:l,lastLoginAt:d});return S&&Array.isArray(S)&&(O.providerData=S.map(U=>({...U}))),u&&(O._redirectEventId=u),O}static async _fromIdTokenResponse(e,t,r=!1){const s=new Wr;s.updateFromServerResponse(t);const i=new _t({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await aa(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];K(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Nm(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),c=new Wr;c.updateFromIdToken(r);const u=new _t({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:o}),l={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new pu(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(u,l),u}}/**
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
 */const Yd=new Map;function Gt(n){Kt(n instanceof Function,"Expected a class definition");let e=Yd.get(n);return e?(Kt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Yd.set(n,e),e)}/**
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
 */class Vm{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Vm.type="NONE";const Xd=Vm;/**
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
 */function Go(n,e,t){return`firebase:${n}:${e}:${t}`}class Qr{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Go(this.userKey,s.apiKey,i),this.fullPersistenceKey=Go("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await oa(this.auth,{idToken:e}).catch(()=>{});return t?_t._fromGetAccountInfoResponse(this.auth,t,e):null}return _t._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Qr(Gt(Xd),e,r);const s=(await Promise.all(t.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let i=s[0]||Gt(Xd);const o=Go(r,e.config.apiKey,e.name);let c=null;for(const l of t)try{const d=await l._get(o);if(d){let f;if(typeof d=="string"){const m=await oa(e,{idToken:d}).catch(()=>{});if(!m)break;f=await _t._fromGetAccountInfoResponse(e,m,d)}else f=_t._fromJSON(e,d);l!==i&&(c=f),i=l;break}}catch{}const u=s.filter(l=>l._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new Qr(i,e,r):(i=u[0],c&&await i._set(o,c.toJSON()),await Promise.all(t.map(async l=>{if(l!==i)try{await l._remove(o)}catch{}})),new Qr(i,e,r))}}/**
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
 */function Zd(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Fm(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Om(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Bm(e))return"Blackberry";if(jm(e))return"Webos";if(Mm(e))return"Safari";if((e.includes("chrome/")||Lm(e))&&!e.includes("edge/"))return"Chrome";if(Um(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Om(n=De()){return/firefox\//i.test(n)}function Mm(n=De()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Lm(n=De()){return/crios\//i.test(n)}function Fm(n=De()){return/iemobile/i.test(n)}function Um(n=De()){return/android/i.test(n)}function Bm(n=De()){return/blackberry/i.test(n)}function jm(n=De()){return/webos/i.test(n)}function tl(n=De()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function eA(n=De()){var e;return tl(n)&&!!((e=window.navigator)!=null&&e.standalone)}function tA(){return dw()&&document.documentMode===10}function Gm(n=De()){return tl(n)||Um(n)||jm(n)||Bm(n)||/windows phone/i.test(n)||Fm(n)}/**
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
 */function qm(n,e=[]){let t;switch(n){case"Browser":t=Zd(De());break;case"Worker":t=`${Zd(De())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${vr}/${r}`}/**
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
 */class nA{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((o,c)=>{try{const u=e(i);o(u)}catch(u){c(u)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function rA(n,e={}){return Bt(n,"GET","/v2/passwordPolicy",Zt(n,e))}/**
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
 */const sA=6;class iA{constructor(e){var r;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??sA,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=e.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
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
 */class oA{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new ef(this),this.idTokenSubscription=new ef(this),this.beforeStateQueue=new nA(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Rm,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Gt(t)),this._initializationPromise=this.queue(async()=>{var r,s,i;if(!this._deleted&&(this.persistenceManager=await Qr.create(this,e),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await oa(this,{idToken:e}),r=await _t._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch{await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var i;if(Xe(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(i=this.redirectUser)==null?void 0:i._redirectEventId,c=r==null?void 0:r._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===c)&&(u!=null&&u.user)&&(r=u.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(o){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return K(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await aa(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=UT()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Xe(this.app))return Promise.reject(Nt(this));const t=e?X(e):null;return t&&K(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&K(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Xe(this.app)?Promise.reject(Nt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Xe(this.app)?Promise.reject(Nt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Gt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await rA(this),t=new iA(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new vs("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await ZT(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Gt(e)||this._popupRedirectResolver;K(t,this,"argument-error"),this.redirectPersistenceManager=await Qr.create(this,[Gt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(K(c,this,"internal-error"),c.then(()=>{o||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,r,s);return()=>{o=!0,u()}}else{const u=e.addObserver(t);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return K(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=qm(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){var t;if(Xe(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&MT(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function en(n){return X(n)}class ef{constructor(e){this.auth=e,this.observer=null,this.addObserver=yw(t=>this.observer=t)}get next(){return K(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let Ua={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function aA(n){Ua=n}function $m(n){return Ua.loadJS(n)}function cA(){return Ua.recaptchaEnterpriseScript}function uA(){return Ua.gapiScript}function lA(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class hA{constructor(){this.enterprise=new dA}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class dA{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const fA="recaptcha-enterprise",zm="NO_RECAPTCHA";class pA{constructor(e){this.type=fA,this.auth=en(e)}async verify(e="verify",t=!1){async function r(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,c)=>{KT(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const l=new zT(u);return i.tenantId==null?i._agentRecaptchaConfig=l:i._tenantRecaptchaConfigs[i.tenantId]=l,o(l.siteKey)}}).catch(u=>{c(u)})})}function s(i,o,c){const u=window.grecaptcha;Qd(u)?u.enterprise.ready(()=>{u.enterprise.execute(i,{action:e}).then(l=>{o(l)}).catch(()=>{o(zm)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new hA().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{r(this.auth).then(c=>{if(!t&&Qd(window.grecaptcha))s(c,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let u=cA();u.length!==0&&(u+=c),$m(u).then(()=>{s(c,i,o)}).catch(l=>{o(l)})}}).catch(c=>{o(c)})})}}async function tf(n,e,t,r=!1,s=!1){const i=new pA(n);let o;if(s)o=zm;else try{o=await i.verify(t)}catch{o=await i.verify(t,!0)}const c={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const u=c.phoneEnrollmentInfo.phoneNumber,l=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:l,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const u=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:o}):Object.assign(c,{captchaResponse:o}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function ca(n,e,t,r,s){var i;if((i=n._getRecaptchaConfig())!=null&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await tf(n,e,t,t==="getOobCode");return r(n,o)}else return r(n,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){const c=await tf(n,e,t,t==="getOobCode");return r(n,c)}else return Promise.reject(o)})}/**
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
 */function mA(n,e){const t=Xt(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(wt(i,e??{}))return s;At(s,"already-initialized")}return t.initialize({options:e})}function gA(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(Gt);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function _A(n,e,t){const r=en(n);K(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=Km(e),{host:o,port:c}=yA(e),u=c===null?"":`:${c}`,l={url:`${i}//${o}${u}/`},d=Object.freeze({host:o,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){K(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),K(wt(l,r.config.emulator)&&wt(d,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=l,r.emulatorConfig=d,r.settings.appVerificationDisabledForTesting=!0,Ut(o)?zi(`${i}//${o}${u}`):IA()}function Km(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function yA(n){const e=Km(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:nf(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:nf(o)}}}function nf(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function IA(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class nl{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return jt("not implemented")}_getIdTokenResponse(e){return jt("not implemented")}_linkToIdToken(e,t){return jt("not implemented")}_getReauthenticationResolver(e){return jt("not implemented")}}async function EA(n,e){return Bt(n,"POST","/v1/accounts:signUp",e)}/**
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
 */async function wA(n,e){return Wi(n,"POST","/v1/accounts:signInWithPassword",Zt(n,e))}async function Hm(n,e){return Bt(n,"POST","/v1/accounts:sendOobCode",Zt(n,e))}async function TA(n,e){return Hm(n,e)}async function AA(n,e){return Hm(n,e)}/**
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
 */async function vA(n,e){return Wi(n,"POST","/v1/accounts:signInWithEmailLink",Zt(n,e))}async function bA(n,e){return Wi(n,"POST","/v1/accounts:signInWithEmailLink",Zt(n,e))}/**
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
 */class xi extends nl{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new xi(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new xi(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ca(e,t,"signInWithPassword",wA);case"emailLink":return vA(e,{email:this._email,oobCode:this._password});default:At(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ca(e,r,"signUpPassword",EA);case"emailLink":return bA(e,{idToken:t,email:this._email,oobCode:this._password});default:At(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function Jr(n,e){return Wi(n,"POST","/v1/accounts:signInWithIdp",Zt(n,e))}/**
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
 */const SA="http://localhost";class fr extends nl{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new fr(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):At("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=t;if(!r||!s)return null;const o=new fr(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return Jr(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Jr(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Jr(e,t)}buildRequest(){const e={requestUri:SA,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=$i(t)}return e}}/**
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
 */function RA(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function PA(n){const e=ui(li(n)).link,t=e?ui(li(e)).deep_link_id:null,r=ui(li(n)).deep_link_id;return(r?ui(li(r)).link:null)||r||t||e||n}class rl{constructor(e){const t=ui(li(e)),r=t.apiKey??null,s=t.oobCode??null,i=RA(t.mode??null);K(r&&s&&i,"argument-error"),this.apiKey=r,this.operation=i,this.code=s,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=PA(e);try{return new rl(t)}catch{return null}}}/**
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
 */class bs{constructor(){this.providerId=bs.PROVIDER_ID}static credential(e,t){return xi._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=rl.parseLink(t);return K(r,"argument-error"),xi._fromEmailAndCode(e,r.code,r.tenantId)}}bs.PROVIDER_ID="password";bs.EMAIL_PASSWORD_SIGN_IN_METHOD="password";bs.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class Qi extends Wm{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class gn extends Qi{constructor(){super("facebook.com")}static credential(e){return fr._fromParams({providerId:gn.PROVIDER_ID,signInMethod:gn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return gn.credentialFromTaggedObject(e)}static credentialFromError(e){return gn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return gn.credential(e.oauthAccessToken)}catch{return null}}}gn.FACEBOOK_SIGN_IN_METHOD="facebook.com";gn.PROVIDER_ID="facebook.com";/**
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
 */class _n extends Qi{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return fr._fromParams({providerId:_n.PROVIDER_ID,signInMethod:_n.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return _n.credentialFromTaggedObject(e)}static credentialFromError(e){return _n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return _n.credential(t,r)}catch{return null}}}_n.GOOGLE_SIGN_IN_METHOD="google.com";_n.PROVIDER_ID="google.com";/**
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
 */class yn extends Qi{constructor(){super("github.com")}static credential(e){return fr._fromParams({providerId:yn.PROVIDER_ID,signInMethod:yn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return yn.credentialFromTaggedObject(e)}static credentialFromError(e){return yn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return yn.credential(e.oauthAccessToken)}catch{return null}}}yn.GITHUB_SIGN_IN_METHOD="github.com";yn.PROVIDER_ID="github.com";/**
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
 */class In extends Qi{constructor(){super("twitter.com")}static credential(e,t){return fr._fromParams({providerId:In.PROVIDER_ID,signInMethod:In.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return In.credentialFromTaggedObject(e)}static credentialFromError(e){return In.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return In.credential(t,r)}catch{return null}}}In.TWITTER_SIGN_IN_METHOD="twitter.com";In.PROVIDER_ID="twitter.com";/**
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
 */async function Qm(n,e){return Wi(n,"POST","/v1/accounts:signUp",Zt(n,e))}/**
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
 */class Ht{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await _t._fromIdTokenResponse(e,r,s),o=rf(r);return new Ht({user:i,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=rf(r);return new Ht({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function rf(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */async function aN(n){var s;if(Xe(n.app))return Promise.reject(Nt(n));const e=en(n);if(await e._initializationPromise,(s=e.currentUser)!=null&&s.isAnonymous)return new Ht({user:e.currentUser,providerId:null,operationType:"signIn"});const t=await Qm(e,{returnSecureToken:!0}),r=await Ht._fromIdTokenResponse(e,"signIn",t,!0);return await e._updateCurrentUser(r.user),r}/**
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
 */class ua extends vt{constructor(e,t,r,s){super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,ua.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new ua(e,t,r,s)}}function Jm(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?ua._fromErrorAndOperation(n,i,e,r):i})}async function CA(n,e,t=!1){const r=await ts(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Ht._forOperation(n,"link",r)}/**
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
 */async function xA(n,e,t=!1){const{auth:r}=n;if(Xe(r.app))return Promise.reject(Nt(r));const s="reauthenticate";try{const i=await ts(n,Jm(r,s,e,n),t);K(i.idToken,r,"internal-error");const o=el(i.idToken);K(o,r,"internal-error");const{sub:c}=o;return K(n.uid===c,r,"user-mismatch"),Ht._forOperation(n,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&At(r,"user-mismatch"),i}}/**
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
 */async function Ym(n,e,t=!1){if(Xe(n.app))return Promise.reject(Nt(n));const r="signIn",s=await Jm(n,r,e),i=await Ht._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}async function DA(n,e){return Ym(en(n),e)}/**
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
 */async function Xm(n){const e=en(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function cN(n,e,t){const r=en(n);await ca(r,{requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"},"getOobCode",AA)}async function uN(n,e,t){if(Xe(n.app))return Promise.reject(Nt(n));const r=en(n),o=await ca(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Qm).catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&Xm(n),u}),c=await Ht._fromIdTokenResponse(r,"signIn",o);return await r._updateCurrentUser(c.user),c}function lN(n,e,t){return Xe(n.app)?Promise.reject(Nt(n)):DA(X(n),bs.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Xm(n),r})}async function hN(n,e){const t=X(n),s={requestType:"VERIFY_EMAIL",idToken:await n.getIdToken()},{email:i}=await TA(t.auth,s);i!==n.email&&await n.reload()}/**
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
 */async function kA(n,e){return Bt(n,"POST","/v1/accounts:update",e)}/**
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
 */async function dN(n,{displayName:e,photoURL:t}){if(e===void 0&&t===void 0)return;const r=X(n),i={idToken:await r.getIdToken(),displayName:e,photoUrl:t,returnSecureToken:!0},o=await ts(r,kA(r.auth,i));r.displayName=o.displayName||null,r.photoURL=o.photoUrl||null;const c=r.providerData.find(({providerId:u})=>u==="password");c&&(c.displayName=r.displayName,c.photoURL=r.photoURL),await r._updateTokensIfNecessary(o)}/**
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
 */function fN(n,e){return X(n).setPersistence(e)}function NA(n,e,t,r){return X(n).onIdTokenChanged(e,t,r)}function VA(n,e,t){return X(n).beforeAuthStateChanged(e,t)}function OA(n,e,t,r){return X(n).onAuthStateChanged(e,t,r)}const la="__sak";/**
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
 */class Zm{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(la,"1"),this.storage.removeItem(la),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const MA=1e3,LA=10;class eg extends Zm{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Gm(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,u)=>{this.notifyListeners(o,u)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);tA()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,LA):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},MA)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}eg.type="LOCAL";const FA=eg;/**
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
 */class tg extends Zm{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}tg.type="SESSION";const ng=tg;/**
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
 */function UA(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class Ba{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new Ba(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(o).map(async l=>l(t.origin,i)),u=await UA(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Ba.receivers=[];/**
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
 */function sl(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class BA{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((c,u)=>{const l=sl("",20);s.port1.start();const d=setTimeout(()=>{u(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(f){const m=f;if(m.data.eventId===l)switch(m.data.status){case"ack":clearTimeout(d),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(m.data.response);break;default:clearTimeout(d),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function Vt(){return window}function jA(n){Vt().location.href=n}/**
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
 */function rg(){return typeof Vt().WorkerGlobalScope<"u"&&typeof Vt().importScripts=="function"}async function GA(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function qA(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function $A(){return rg()?self:null}/**
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
 */const sg="firebaseLocalStorageDb",zA=1,ha="firebaseLocalStorage",ig="fbase_key";class Ji{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function ja(n,e){return n.transaction([ha],e?"readwrite":"readonly").objectStore(ha)}function KA(){const n=indexedDB.deleteDatabase(sg);return new Ji(n).toPromise()}function mu(){const n=indexedDB.open(sg,zA);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(ha,{keyPath:ig})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(ha)?e(r):(r.close(),await KA(),e(await mu()))})})}async function sf(n,e,t){const r=ja(n,!0).put({[ig]:e,value:t});return new Ji(r).toPromise()}async function HA(n,e){const t=ja(n,!1).get(e),r=await new Ji(t).toPromise();return r===void 0?null:r.value}function of(n,e){const t=ja(n,!0).delete(e);return new Ji(t).toPromise()}const WA=800,QA=3;class og{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await mu(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>QA)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return rg()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Ba._getInstance($A()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,r;if(this.activeServiceWorker=await GA(),!this.activeServiceWorker)return;this.sender=new BA(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(r=e[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||qA()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await mu();return await sf(e,la,"1"),await of(e,la),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>sf(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>HA(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>of(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=ja(s,!1).getAll();return new Ji(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),WA)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}og.type="LOCAL";const JA=og;new Hi(3e4,6e4);/**
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
 */function YA(n,e){return e?Gt(e):(K(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class il extends nl{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Jr(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Jr(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Jr(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function XA(n){return Ym(n.auth,new il(n),n.bypassAuthState)}function ZA(n){const{auth:e,user:t}=n;return K(t,e,"internal-error"),xA(t,new il(n),n.bypassAuthState)}async function ev(n){const{auth:e,user:t}=n;return K(t,e,"internal-error"),CA(t,new il(n),n.bypassAuthState)}/**
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
 */class ag{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:o,type:c}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return XA;case"linkViaPopup":case"linkViaRedirect":return ev;case"reauthViaPopup":case"reauthViaRedirect":return ZA;default:At(this.auth,"internal-error")}}resolve(e){Kt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Kt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const tv=new Hi(2e3,1e4);class Kr extends ag{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Kr.currentPopupAction&&Kr.currentPopupAction.cancel(),Kr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return K(e,this.auth,"internal-error"),e}async onExecution(){Kt(this.filter.length===1,"Popup operations only handle one event");const e=sl();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(kt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(kt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Kr.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if((r=(t=this.authWindow)==null?void 0:t.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(kt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,tv.get())};e()}}Kr.currentPopupAction=null;/**
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
 */const nv="pendingRedirect",qo=new Map;class rv extends ag{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=qo.get(this.auth._key());if(!e){try{const r=await sv(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}qo.set(this.auth._key(),e)}return this.bypassAuthState||qo.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function sv(n,e){const t=av(e),r=ov(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function iv(n,e){qo.set(n._key(),e)}function ov(n){return Gt(n._redirectPersistence)}function av(n){return Go(nv,n.config.apiKey,n.name)}async function cv(n,e,t=!1){if(Xe(n.app))return Promise.reject(Nt(n));const r=en(n),s=YA(r,e),o=await new rv(r,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
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
 */const uv=10*60*1e3;class lv{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!hv(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!cg(e)){const s=((r=e.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";t.onError(kt(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=uv&&this.cachedEventUids.clear(),this.cachedEventUids.has(af(e))}saveEventToCache(e){this.cachedEventUids.add(af(e)),this.lastProcessedEventTime=Date.now()}}function af(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function cg({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function hv(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return cg(n);default:return!1}}/**
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
 */async function dv(n,e={}){return Bt(n,"GET","/v1/projects",e)}/**
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
 */const fv=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,pv=/^https?/;async function mv(n){if(n.config.emulator)return;const{authorizedDomains:e}=await dv(n);for(const t of e)try{if(gv(t))return}catch{}At(n,"unauthorized-domain")}function gv(n){const e=fu(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!pv.test(t))return!1;if(fv.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const _v=new Hi(3e4,6e4);function cf(){const n=Vt().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function yv(n){return new Promise((e,t)=>{var s,i,o;function r(){cf(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{cf(),t(kt(n,"network-request-failed"))},timeout:_v.get()})}if((i=(s=Vt().gapi)==null?void 0:s.iframes)!=null&&i.Iframe)e(gapi.iframes.getContext());else if((o=Vt().gapi)!=null&&o.load)r();else{const c=lA("iframefcb");return Vt()[c]=()=>{gapi.load?r():t(kt(n,"network-request-failed"))},$m(`${uA()}?onload=${c}`).catch(u=>t(u))}}).catch(e=>{throw $o=null,e})}let $o=null;function Iv(n){return $o=$o||yv(n),$o}/**
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
 */const Ev=new Hi(5e3,15e3),wv="__/auth/iframe",Tv="emulator/auth/iframe",Av={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},vv=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function bv(n){const e=n.config;K(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Zu(e,Tv):`https://${n.config.authDomain}/${wv}`,r={apiKey:e.apiKey,appName:n.name,v:vr},s=vv.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${$i(r).slice(1)}`}async function Sv(n){const e=await Iv(n),t=Vt().gapi;return K(t,n,"internal-error"),e.open({where:document.body,url:bv(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Av,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=kt(n,"network-request-failed"),c=Vt().setTimeout(()=>{i(o)},Ev.get());function u(){Vt().clearTimeout(c),s(r)}r.ping(u).then(u,()=>{i(o)})}))}/**
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
 */const Rv={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Pv=500,Cv=600,xv="_blank",Dv="http://localhost";class uf{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function kv(n,e,t,r=Pv,s=Cv){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const u={...Rv,width:r.toString(),height:s.toString(),top:i,left:o},l=De().toLowerCase();t&&(c=Lm(l)?xv:t),Om(l)&&(e=e||Dv,u.scrollbars="yes");const d=Object.entries(u).reduce((m,[y,S])=>`${m}${y}=${S},`,"");if(eA(l)&&c!=="_self")return Nv(e||"",c),new uf(null);const f=window.open(e||"",c,d);K(f,n,"popup-blocked");try{f.focus()}catch{}return new uf(f)}function Nv(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const Vv="__/auth/handler",Ov="emulator/auth/handler",Mv=encodeURIComponent("fac");async function lf(n,e,t,r,s,i){K(n.config.authDomain,n,"auth-domain-config-required"),K(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:vr,eventId:s};if(e instanceof Wm){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",_w(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,f]of Object.entries({}))o[d]=f}if(e instanceof Qi){const d=e.getScopes().filter(f=>f!=="");d.length>0&&(o.scopes=d.join(","))}n.tenantId&&(o.tid=n.tenantId);const c=o;for(const d of Object.keys(c))c[d]===void 0&&delete c[d];const u=await n._getAppCheckToken(),l=u?`#${Mv}=${encodeURIComponent(u)}`:"";return`${Lv(n)}?${$i(c).slice(1)}${l}`}function Lv({config:n}){return n.emulator?Zu(n,Ov):`https://${n.authDomain}/${Vv}`}/**
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
 */const Kc="webStorageSupport";class Fv{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=ng,this._completeRedirectFn=cv,this._overrideRedirectResult=iv}async _openPopup(e,t,r,s){var o;Kt((o=this.eventManagers[e._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const i=await lf(e,t,r,fu(),s);return kv(e,i,sl())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await lf(e,t,r,fu(),s);return jA(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(Kt(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await Sv(e),r=new lv(e);return t.register("authEvent",s=>(K(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Kc,{type:Kc},s=>{var o;const i=(o=s==null?void 0:s[0])==null?void 0:o[Kc];i!==void 0&&t(!!i),At(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=mv(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Gm()||Mm()||tl()}}const Uv=Fv;var hf="@firebase/auth",df="1.13.0";/**
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
 */class Bv{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){K(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function jv(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Gv(n){Lt(new Tt("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;K(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:o,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:qm(n)},l=new oA(r,s,i,u);return gA(l,t),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Lt(new Tt("auth-internal",e=>{const t=en(e.getProvider("auth").getImmediate());return(r=>new Bv(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),dt(hf,df,jv(n)),dt(hf,df,"esm2020")}/**
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
 */const qv=5*60,$v=gm("authIdTokenMaxAge")||qv;let ff=null;const zv=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>$v)return;const s=t==null?void 0:t.token;ff!==s&&(ff=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function Kv(n=Ki()){const e=Xt(n,"auth");if(e.isInitialized())return e.getImmediate();const t=mA(n,{popupRedirectResolver:Uv,persistence:[JA,FA,ng]}),r=gm("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=zv(i.toString());VA(t,o,()=>o(t.currentUser)),NA(t,c=>o(c))}}const s=pm("auth");return s&&_A(t,`http://${s}`),t}function Hv(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}aA({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=kt("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",Hv().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Gv("Browser");var Wv="firebase",Qv="12.12.0";/**
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
 */dt(Wv,Qv,"app");/**
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
 */const gu=new Map,ug={activated:!1,tokenObservers:[]},Jv={initialized:!1,enabled:!1};function xe(n){return gu.get(n)||{...ug}}function Yv(n,e){return gu.set(n,e),gu.get(n)}function Ga(){return Jv}/**
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
 */const lg="https://content-firebaseappcheck.googleapis.com/v1",Xv="exchangeRecaptchaV3Token",Zv="exchangeDebugToken",pf={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:16*60*1e3},eb=24*60*60*1e3;/**
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
 */class tb{constructor(e,t,r,s,i){if(this.operation=e,this.retryPolicy=t,this.getWaitDuration=r,this.lowerBound=s,this.upperBound=i,this.pending=null,this.nextErrorWaitInterval=s,s>i)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new Pi,this.pending.promise.catch(t=>{}),await nb(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new Pi,this.pending.promise.catch(t=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(t){this.retryPolicy(t)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const t=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),t}}}function nb(n){return new Promise(e=>{setTimeout(e,n)})}/**
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
 */const rb={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.","initial-throttle":"{$httpStatus} error. Attempts allowed again after {$time}",throttled:"Requests throttled due to previous {$httpStatus} error. Attempts allowed again after {$time}"},tt=new vs("appCheck","AppCheck",rb);/**
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
 */function mf(n=!1){var e;return n?(e=self.grecaptcha)==null?void 0:e.enterprise:self.grecaptcha}function ol(n){if(!xe(n).activated)throw tt.create("use-before-activation",{appName:n.name})}function hg(n){const e=Math.round(n/1e3),t=Math.floor(e/(3600*24)),r=Math.floor((e-t*3600*24)/3600),s=Math.floor((e-t*3600*24-r*3600)/60),i=e-t*3600*24-r*3600-s*60;let o="";return t&&(o+=Co(t)+"d:"),r&&(o+=Co(r)+"h:"),o+=Co(s)+"m:"+Co(i)+"s",o}function Co(n){return n===0?"00":n>=10?n.toString():"0"+n}/**
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
 */async function al({url:n,body:e},t){const r={"Content-Type":"application/json"},s=t.getImmediate({optional:!0});if(s){const f=await s.getHeartbeatsHeader();f&&(r["X-Firebase-Client"]=f)}const i={method:"POST",body:JSON.stringify(e),headers:r};let o;try{o=await fetch(n,i)}catch(f){throw tt.create("fetch-network-error",{originalErrorMessage:f==null?void 0:f.message})}if(o.status!==200)throw tt.create("fetch-status-error",{httpStatus:o.status});let c;try{c=await o.json()}catch(f){throw tt.create("fetch-parse-error",{originalErrorMessage:f==null?void 0:f.message})}const u=c.ttl.match(/^([\d.]+)(s)$/);if(!u||!u[2]||isNaN(Number(u[1])))throw tt.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${c.ttl}`});const l=Number(u[1])*1e3,d=Date.now();return{token:c.token,expireTimeMillis:d+l,issuedAtTimeMillis:d}}function sb(n,e){const{projectId:t,appId:r,apiKey:s}=n.options;return{url:`${lg}/projects/${t}/apps/${r}:${Xv}?key=${s}`,body:{recaptcha_v3_token:e}}}function dg(n,e){const{projectId:t,appId:r,apiKey:s}=n.options;return{url:`${lg}/projects/${t}/apps/${r}:${Zv}?key=${s}`,body:{debug_token:e}}}/**
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
 */const ib="firebase-app-check-database",ob=1,Di="firebase-app-check-store",fg="debug-token";let xo=null;function pg(){return xo||(xo=new Promise((n,e)=>{try{const t=indexedDB.open(ib,ob);t.onsuccess=r=>{n(r.target.result)},t.onerror=r=>{var s;e(tt.create("storage-open",{originalErrorMessage:(s=r.target.error)==null?void 0:s.message}))},t.onupgradeneeded=r=>{const s=r.target.result;switch(r.oldVersion){case 0:s.createObjectStore(Di,{keyPath:"compositeKey"})}}}catch(t){e(tt.create("storage-open",{originalErrorMessage:t==null?void 0:t.message}))}}),xo)}function ab(n){return gg(_g(n))}function cb(n,e){return mg(_g(n),e)}function ub(n){return mg(fg,n)}function lb(){return gg(fg)}async function mg(n,e){const r=(await pg()).transaction(Di,"readwrite"),i=r.objectStore(Di).put({compositeKey:n,value:e});return new Promise((o,c)=>{i.onsuccess=u=>{o()},r.onerror=u=>{var l;c(tt.create("storage-set",{originalErrorMessage:(l=u.target.error)==null?void 0:l.message}))}})}async function gg(n){const t=(await pg()).transaction(Di,"readonly"),s=t.objectStore(Di).get(n);return new Promise((i,o)=>{s.onsuccess=c=>{const u=c.target.result;i(u?u.value:void 0)},t.onerror=c=>{var u;o(tt.create("storage-get",{originalErrorMessage:(u=c.target.error)==null?void 0:u.message}))}})}function _g(n){return`${n.options.appId}-${n.name}`}/**
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
 */const An=new Fa("@firebase/app-check");/**
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
 */async function hb(n){if(La()){let e;try{e=await ab(n)}catch(t){An.warn(`Failed to read token from IndexedDB. Error: ${t}`)}return e}}function Hc(n,e){return La()?cb(n,e).catch(t=>{An.warn(`Failed to write token to IndexedDB. Error: ${t}`)}):Promise.resolve()}async function db(){let n;try{n=await lb()}catch{}if(n)return n;{const e=crypto.randomUUID();return ub(e).catch(t=>An.warn(`Failed to persist debug token to IndexedDB. Error: ${t}`)),e}}/**
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
 */function cl(){return Ga().enabled}async function ul(){const n=Ga();if(n.enabled&&n.token)return n.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function fb(){const n=Qu(),e=Ga();if(e.initialized=!0,typeof n.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&n.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;e.enabled=!0;const t=new Pi;e.token=t,typeof n.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?t.resolve(n.FIREBASE_APPCHECK_DEBUG_TOKEN):t.resolve(db())}/**
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
 */const pb={error:"UNKNOWN_ERROR"};function mb(n){return Wu.encodeString(JSON.stringify(n),!1)}async function da(n,e=!1,t=!1){const r=n.app;ol(r);const s=xe(r);let i=s.token,o;if(i&&!Hr(i)&&(s.token=void 0,i=void 0),!i){const l=await s.cachedTokenPromise;l&&(Hr(l)?i=l:await Hc(r,void 0))}if(!e&&i&&Hr(i))return{token:i.token};let c=!1;if(cl())try{const l=await ul();s.exchangeTokenPromise||(s.exchangeTokenPromise=al(dg(r,l),n.heartbeatServiceProvider).finally(()=>{s.exchangeTokenPromise=void 0}),c=!0);const d=await s.exchangeTokenPromise;return await Hc(r,d),s.token=d,{token:d.token}}catch(l){return l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?An.warn(l.message):t&&An.error(l),Wc(l)}try{s.exchangeTokenPromise||(s.exchangeTokenPromise=s.provider.getToken().finally(()=>{s.exchangeTokenPromise=void 0}),c=!0),i=await xe(r).exchangeTokenPromise}catch(l){l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?An.warn(l.message):t&&An.error(l),o=l}let u;return i?o?Hr(i)?u={token:i.token,internalError:o}:u=Wc(o):(u={token:i.token},s.token=i,await Hc(r,i)):u=Wc(o),c&&Eg(r,u),u}async function gb(n){const e=n.app;ol(e);const{provider:t}=xe(e);if(cl()){const r=await ul(),{token:s}=await al(dg(e,r),n.heartbeatServiceProvider);return{token:s}}else{const{token:r}=await t.getToken();return{token:r}}}function yg(n,e,t,r){const{app:s}=n,i=xe(s),o={next:t,error:r,type:e};if(i.tokenObservers=[...i.tokenObservers,o],i.token&&Hr(i.token)){const c=i.token;Promise.resolve().then(()=>{t({token:c.token}),gf(n)}).catch(()=>{})}i.cachedTokenPromise.then(()=>gf(n))}function Ig(n,e){const t=xe(n),r=t.tokenObservers.filter(s=>s.next!==e);r.length===0&&t.tokenRefresher&&t.tokenRefresher.isRunning()&&t.tokenRefresher.stop(),t.tokenObservers=r}function gf(n){const{app:e}=n,t=xe(e);let r=t.tokenRefresher;r||(r=_b(n),t.tokenRefresher=r),!r.isRunning()&&t.isTokenAutoRefreshEnabled&&r.start()}function _b(n){const{app:e}=n;return new tb(async()=>{const t=xe(e);let r;if(t.token?r=await da(n,!0):r=await da(n),r.error)throw r.error;if(r.internalError)throw r.internalError},()=>!0,()=>{const t=xe(e);if(t.token){let r=t.token.issuedAtTimeMillis+(t.token.expireTimeMillis-t.token.issuedAtTimeMillis)*.5+3e5;const s=t.token.expireTimeMillis-5*60*1e3;return r=Math.min(r,s),Math.max(0,r-Date.now())}else return 0},pf.RETRIAL_MIN_WAIT,pf.RETRIAL_MAX_WAIT)}function Eg(n,e){const t=xe(n).tokenObservers;for(const r of t)try{r.type==="EXTERNAL"&&e.error!=null?r.error(e.error):r.next(e)}catch{}}function Hr(n){return n.expireTimeMillis-Date.now()>0}function Wc(n){return{token:mb(pb),error:n}}/**
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
 */class yb{constructor(e,t){this.app=e,this.heartbeatServiceProvider=t}_delete(){const{tokenObservers:e}=xe(this.app);for(const t of e)Ig(this.app,t.next);return Promise.resolve()}}function Ib(n,e){return new yb(n,e)}function Eb(n){return{getToken:e=>da(n,e),getLimitedUseToken:()=>gb(n),addTokenListener:e=>yg(n,"INTERNAL",e),removeTokenListener:e=>Ig(n.app,e)}}const wb="@firebase/app-check",Tb="0.11.2";/**
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
 */const Ab="https://www.google.com/recaptcha/api.js";function vb(n,e){const t=new Pi,r=xe(n);r.reCAPTCHAState={initialized:t};const s=bb(n),i=mf(!1);return i?_f(n,e,i,s,t):Pb(()=>{const o=mf(!1);if(!o)throw new Error("no recaptcha");_f(n,e,o,s,t)}),t.promise}function _f(n,e,t,r,s){t.ready(()=>{Rb(n,e,t,r),s.resolve(t)})}function bb(n){const e=`fire_app_check_${n.name}`,t=document.createElement("div");return t.id=e,t.style.display="none",document.body.appendChild(t),e}async function Sb(n){ol(n);const t=await xe(n).reCAPTCHAState.initialized.promise;return new Promise((r,s)=>{const i=xe(n).reCAPTCHAState;t.ready(()=>{r(t.execute(i.widgetId,{action:"fire_app_check"}))})})}function Rb(n,e,t,r){const s=t.render(r,{sitekey:e,size:"invisible",callback:()=>{xe(n).reCAPTCHAState.succeeded=!0},"error-callback":()=>{xe(n).reCAPTCHAState.succeeded=!1}}),i=xe(n);i.reCAPTCHAState={...i.reCAPTCHAState,widgetId:s}}function Pb(n){const e=document.createElement("script");e.src=Ab,e.onload=n,document.head.appendChild(e)}/**
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
 */class ll{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(){var r,s,i;xb(this._throttleData);const e=await Sb(this._app).catch(o=>{throw tt.create("recaptcha-error")});if(!((r=xe(this._app).reCAPTCHAState)!=null&&r.succeeded))throw tt.create("recaptcha-error");let t;try{t=await al(sb(this._app,e),this._heartbeatServiceProvider)}catch(o){throw(s=o.code)!=null&&s.includes("fetch-status-error")?(this._throttleData=Cb(Number((i=o.customData)==null?void 0:i.httpStatus),this._throttleData),tt.create("initial-throttle",{time:hg(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):o}return this._throttleData=null,t}initialize(e){this._app=e,this._heartbeatServiceProvider=Xt(e,"heartbeat"),vb(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof ll?this._siteKey===e._siteKey:!1}}function Cb(n,e){if(n===404||n===403)return{backoffCount:1,allowRequestsAfter:Date.now()+eb,httpStatus:n};{const t=e?e.backoffCount:0,r=bw(t,1e3,2);return{backoffCount:t+1,allowRequestsAfter:Date.now()+r,httpStatus:n}}}function xb(n){if(n&&Date.now()-n.allowRequestsAfter<=0)throw tt.create("throttled",{time:hg(n.allowRequestsAfter-Date.now()),httpStatus:n.httpStatus})}/**
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
 */function Db(n=Ki(),e){n=X(n);const t=Xt(n,"app-check");if(Ga().initialized||fb(),cl()&&ul().then(s=>{}),t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(i.isTokenAutoRefreshEnabled===e.isTokenAutoRefreshEnabled&&i.provider.isEqual(e.provider))return s;throw tt.create("already-initialized",{appName:n.name})}const r=t.initialize({options:e});return kb(n,e.provider,e.isTokenAutoRefreshEnabled),xe(n).isTokenAutoRefreshEnabled&&yg(r,"INTERNAL",()=>{}),r}function kb(n,e,t=!1){const r=Yv(n,{...ug});r.activated=!0,r.provider=e,r.cachedTokenPromise=hb(n).then(s=>(s&&Hr(s)&&(r.token=s,Eg(n,{token:s.token})),s)),r.isTokenAutoRefreshEnabled=t&&n.automaticDataCollectionEnabled,!n.automaticDataCollectionEnabled&&t&&An.warn("`isTokenAutoRefreshEnabled` is true but `automaticDataCollectionEnabled` was set to false during `initializeApp()`. This blocks automatic token refresh."),r.provider.initialize(n)}async function pN(n,e){const t=await da(n,e);if(t.error)throw t.error;if(t.internalError)throw t.internalError;return{token:t.token}}const Nb="app-check",yf="app-check-internal";function Vb(){Lt(new Tt(Nb,n=>{const e=n.getProvider("app").getImmediate(),t=n.getProvider("heartbeat");return Ib(e,t)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((n,e,t)=>{n.getProvider(yf).initialize()})),Lt(new Tt(yf,n=>{const e=n.getProvider("app-check").getImmediate();return Eb(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),dt(wb,Tb)}Vb();var If=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Pn,wg;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,I){function T(){}T.prototype=I.prototype,E.F=I.prototype,E.prototype=new T,E.prototype.constructor=E,E.D=function(v,A,C){for(var w=Array(arguments.length-2),Ze=2;Ze<arguments.length;Ze++)w[Ze-2]=arguments[Ze];return I.prototype[A].apply(v,w)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,t),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(E,I,T){T||(T=0);const v=Array(16);if(typeof I=="string")for(var A=0;A<16;++A)v[A]=I.charCodeAt(T++)|I.charCodeAt(T++)<<8|I.charCodeAt(T++)<<16|I.charCodeAt(T++)<<24;else for(A=0;A<16;++A)v[A]=I[T++]|I[T++]<<8|I[T++]<<16|I[T++]<<24;I=E.g[0],T=E.g[1],A=E.g[2];let C=E.g[3],w;w=I+(C^T&(A^C))+v[0]+3614090360&4294967295,I=T+(w<<7&4294967295|w>>>25),w=C+(A^I&(T^A))+v[1]+3905402710&4294967295,C=I+(w<<12&4294967295|w>>>20),w=A+(T^C&(I^T))+v[2]+606105819&4294967295,A=C+(w<<17&4294967295|w>>>15),w=T+(I^A&(C^I))+v[3]+3250441966&4294967295,T=A+(w<<22&4294967295|w>>>10),w=I+(C^T&(A^C))+v[4]+4118548399&4294967295,I=T+(w<<7&4294967295|w>>>25),w=C+(A^I&(T^A))+v[5]+1200080426&4294967295,C=I+(w<<12&4294967295|w>>>20),w=A+(T^C&(I^T))+v[6]+2821735955&4294967295,A=C+(w<<17&4294967295|w>>>15),w=T+(I^A&(C^I))+v[7]+4249261313&4294967295,T=A+(w<<22&4294967295|w>>>10),w=I+(C^T&(A^C))+v[8]+1770035416&4294967295,I=T+(w<<7&4294967295|w>>>25),w=C+(A^I&(T^A))+v[9]+2336552879&4294967295,C=I+(w<<12&4294967295|w>>>20),w=A+(T^C&(I^T))+v[10]+4294925233&4294967295,A=C+(w<<17&4294967295|w>>>15),w=T+(I^A&(C^I))+v[11]+2304563134&4294967295,T=A+(w<<22&4294967295|w>>>10),w=I+(C^T&(A^C))+v[12]+1804603682&4294967295,I=T+(w<<7&4294967295|w>>>25),w=C+(A^I&(T^A))+v[13]+4254626195&4294967295,C=I+(w<<12&4294967295|w>>>20),w=A+(T^C&(I^T))+v[14]+2792965006&4294967295,A=C+(w<<17&4294967295|w>>>15),w=T+(I^A&(C^I))+v[15]+1236535329&4294967295,T=A+(w<<22&4294967295|w>>>10),w=I+(A^C&(T^A))+v[1]+4129170786&4294967295,I=T+(w<<5&4294967295|w>>>27),w=C+(T^A&(I^T))+v[6]+3225465664&4294967295,C=I+(w<<9&4294967295|w>>>23),w=A+(I^T&(C^I))+v[11]+643717713&4294967295,A=C+(w<<14&4294967295|w>>>18),w=T+(C^I&(A^C))+v[0]+3921069994&4294967295,T=A+(w<<20&4294967295|w>>>12),w=I+(A^C&(T^A))+v[5]+3593408605&4294967295,I=T+(w<<5&4294967295|w>>>27),w=C+(T^A&(I^T))+v[10]+38016083&4294967295,C=I+(w<<9&4294967295|w>>>23),w=A+(I^T&(C^I))+v[15]+3634488961&4294967295,A=C+(w<<14&4294967295|w>>>18),w=T+(C^I&(A^C))+v[4]+3889429448&4294967295,T=A+(w<<20&4294967295|w>>>12),w=I+(A^C&(T^A))+v[9]+568446438&4294967295,I=T+(w<<5&4294967295|w>>>27),w=C+(T^A&(I^T))+v[14]+3275163606&4294967295,C=I+(w<<9&4294967295|w>>>23),w=A+(I^T&(C^I))+v[3]+4107603335&4294967295,A=C+(w<<14&4294967295|w>>>18),w=T+(C^I&(A^C))+v[8]+1163531501&4294967295,T=A+(w<<20&4294967295|w>>>12),w=I+(A^C&(T^A))+v[13]+2850285829&4294967295,I=T+(w<<5&4294967295|w>>>27),w=C+(T^A&(I^T))+v[2]+4243563512&4294967295,C=I+(w<<9&4294967295|w>>>23),w=A+(I^T&(C^I))+v[7]+1735328473&4294967295,A=C+(w<<14&4294967295|w>>>18),w=T+(C^I&(A^C))+v[12]+2368359562&4294967295,T=A+(w<<20&4294967295|w>>>12),w=I+(T^A^C)+v[5]+4294588738&4294967295,I=T+(w<<4&4294967295|w>>>28),w=C+(I^T^A)+v[8]+2272392833&4294967295,C=I+(w<<11&4294967295|w>>>21),w=A+(C^I^T)+v[11]+1839030562&4294967295,A=C+(w<<16&4294967295|w>>>16),w=T+(A^C^I)+v[14]+4259657740&4294967295,T=A+(w<<23&4294967295|w>>>9),w=I+(T^A^C)+v[1]+2763975236&4294967295,I=T+(w<<4&4294967295|w>>>28),w=C+(I^T^A)+v[4]+1272893353&4294967295,C=I+(w<<11&4294967295|w>>>21),w=A+(C^I^T)+v[7]+4139469664&4294967295,A=C+(w<<16&4294967295|w>>>16),w=T+(A^C^I)+v[10]+3200236656&4294967295,T=A+(w<<23&4294967295|w>>>9),w=I+(T^A^C)+v[13]+681279174&4294967295,I=T+(w<<4&4294967295|w>>>28),w=C+(I^T^A)+v[0]+3936430074&4294967295,C=I+(w<<11&4294967295|w>>>21),w=A+(C^I^T)+v[3]+3572445317&4294967295,A=C+(w<<16&4294967295|w>>>16),w=T+(A^C^I)+v[6]+76029189&4294967295,T=A+(w<<23&4294967295|w>>>9),w=I+(T^A^C)+v[9]+3654602809&4294967295,I=T+(w<<4&4294967295|w>>>28),w=C+(I^T^A)+v[12]+3873151461&4294967295,C=I+(w<<11&4294967295|w>>>21),w=A+(C^I^T)+v[15]+530742520&4294967295,A=C+(w<<16&4294967295|w>>>16),w=T+(A^C^I)+v[2]+3299628645&4294967295,T=A+(w<<23&4294967295|w>>>9),w=I+(A^(T|~C))+v[0]+4096336452&4294967295,I=T+(w<<6&4294967295|w>>>26),w=C+(T^(I|~A))+v[7]+1126891415&4294967295,C=I+(w<<10&4294967295|w>>>22),w=A+(I^(C|~T))+v[14]+2878612391&4294967295,A=C+(w<<15&4294967295|w>>>17),w=T+(C^(A|~I))+v[5]+4237533241&4294967295,T=A+(w<<21&4294967295|w>>>11),w=I+(A^(T|~C))+v[12]+1700485571&4294967295,I=T+(w<<6&4294967295|w>>>26),w=C+(T^(I|~A))+v[3]+2399980690&4294967295,C=I+(w<<10&4294967295|w>>>22),w=A+(I^(C|~T))+v[10]+4293915773&4294967295,A=C+(w<<15&4294967295|w>>>17),w=T+(C^(A|~I))+v[1]+2240044497&4294967295,T=A+(w<<21&4294967295|w>>>11),w=I+(A^(T|~C))+v[8]+1873313359&4294967295,I=T+(w<<6&4294967295|w>>>26),w=C+(T^(I|~A))+v[15]+4264355552&4294967295,C=I+(w<<10&4294967295|w>>>22),w=A+(I^(C|~T))+v[6]+2734768916&4294967295,A=C+(w<<15&4294967295|w>>>17),w=T+(C^(A|~I))+v[13]+1309151649&4294967295,T=A+(w<<21&4294967295|w>>>11),w=I+(A^(T|~C))+v[4]+4149444226&4294967295,I=T+(w<<6&4294967295|w>>>26),w=C+(T^(I|~A))+v[11]+3174756917&4294967295,C=I+(w<<10&4294967295|w>>>22),w=A+(I^(C|~T))+v[2]+718787259&4294967295,A=C+(w<<15&4294967295|w>>>17),w=T+(C^(A|~I))+v[9]+3951481745&4294967295,E.g[0]=E.g[0]+I&4294967295,E.g[1]=E.g[1]+(A+(w<<21&4294967295|w>>>11))&4294967295,E.g[2]=E.g[2]+A&4294967295,E.g[3]=E.g[3]+C&4294967295}r.prototype.v=function(E,I){I===void 0&&(I=E.length);const T=I-this.blockSize,v=this.C;let A=this.h,C=0;for(;C<I;){if(A==0)for(;C<=T;)s(this,E,C),C+=this.blockSize;if(typeof E=="string"){for(;C<I;)if(v[A++]=E.charCodeAt(C++),A==this.blockSize){s(this,v),A=0;break}}else for(;C<I;)if(v[A++]=E[C++],A==this.blockSize){s(this,v),A=0;break}}this.h=A,this.o+=I},r.prototype.A=function(){var E=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);E[0]=128;for(var I=1;I<E.length-8;++I)E[I]=0;I=this.o*8;for(var T=E.length-8;T<E.length;++T)E[T]=I&255,I/=256;for(this.v(E),E=Array(16),I=0,T=0;T<4;++T)for(let v=0;v<32;v+=8)E[I++]=this.g[T]>>>v&255;return E};function i(E,I){var T=c;return Object.prototype.hasOwnProperty.call(T,E)?T[E]:T[E]=I(E)}function o(E,I){this.h=I;const T=[];let v=!0;for(let A=E.length-1;A>=0;A--){const C=E[A]|0;v&&C==I||(T[A]=C,v=!1)}this.g=T}var c={};function u(E){return-128<=E&&E<128?i(E,function(I){return new o([I|0],I<0?-1:0)}):new o([E|0],E<0?-1:0)}function l(E){if(isNaN(E)||!isFinite(E))return f;if(E<0)return k(l(-E));const I=[];let T=1;for(let v=0;E>=T;v++)I[v]=E/T|0,T*=4294967296;return new o(I,0)}function d(E,I){if(E.length==0)throw Error("number format error: empty string");if(I=I||10,I<2||36<I)throw Error("radix out of range: "+I);if(E.charAt(0)=="-")return k(d(E.substring(1),I));if(E.indexOf("-")>=0)throw Error('number format error: interior "-" character');const T=l(Math.pow(I,8));let v=f;for(let C=0;C<E.length;C+=8){var A=Math.min(8,E.length-C);const w=parseInt(E.substring(C,C+A),I);A<8?(A=l(Math.pow(I,A)),v=v.j(A).add(l(w))):(v=v.j(T),v=v.add(l(w)))}return v}var f=u(0),m=u(1),y=u(16777216);n=o.prototype,n.m=function(){if(x(this))return-k(this).m();let E=0,I=1;for(let T=0;T<this.g.length;T++){const v=this.i(T);E+=(v>=0?v:4294967296+v)*I,I*=4294967296}return E},n.toString=function(E){if(E=E||10,E<2||36<E)throw Error("radix out of range: "+E);if(S(this))return"0";if(x(this))return"-"+k(this).toString(E);const I=l(Math.pow(E,6));var T=this;let v="";for(;;){const A=z(T,I).g;T=O(T,A.j(I));let C=((T.g.length>0?T.g[0]:T.h)>>>0).toString(E);if(T=A,S(T))return C+v;for(;C.length<6;)C="0"+C;v=C+v}},n.i=function(E){return E<0?0:E<this.g.length?this.g[E]:this.h};function S(E){if(E.h!=0)return!1;for(let I=0;I<E.g.length;I++)if(E.g[I]!=0)return!1;return!0}function x(E){return E.h==-1}n.l=function(E){return E=O(this,E),x(E)?-1:S(E)?0:1};function k(E){const I=E.g.length,T=[];for(let v=0;v<I;v++)T[v]=~E.g[v];return new o(T,~E.h).add(m)}n.abs=function(){return x(this)?k(this):this},n.add=function(E){const I=Math.max(this.g.length,E.g.length),T=[];let v=0;for(let A=0;A<=I;A++){let C=v+(this.i(A)&65535)+(E.i(A)&65535),w=(C>>>16)+(this.i(A)>>>16)+(E.i(A)>>>16);v=w>>>16,C&=65535,w&=65535,T[A]=w<<16|C}return new o(T,T[T.length-1]&-2147483648?-1:0)};function O(E,I){return E.add(k(I))}n.j=function(E){if(S(this)||S(E))return f;if(x(this))return x(E)?k(this).j(k(E)):k(k(this).j(E));if(x(E))return k(this.j(k(E)));if(this.l(y)<0&&E.l(y)<0)return l(this.m()*E.m());const I=this.g.length+E.g.length,T=[];for(var v=0;v<2*I;v++)T[v]=0;for(v=0;v<this.g.length;v++)for(let A=0;A<E.g.length;A++){const C=this.i(v)>>>16,w=this.i(v)&65535,Ze=E.i(A)>>>16,Wn=E.i(A)&65535;T[2*v+2*A]+=w*Wn,U(T,2*v+2*A),T[2*v+2*A+1]+=C*Wn,U(T,2*v+2*A+1),T[2*v+2*A+1]+=w*Ze,U(T,2*v+2*A+1),T[2*v+2*A+2]+=C*Ze,U(T,2*v+2*A+2)}for(E=0;E<I;E++)T[E]=T[2*E+1]<<16|T[2*E];for(E=I;E<2*I;E++)T[E]=0;return new o(T,0)};function U(E,I){for(;(E[I]&65535)!=E[I];)E[I+1]+=E[I]>>>16,E[I]&=65535,I++}function B(E,I){this.g=E,this.h=I}function z(E,I){if(S(I))throw Error("division by zero");if(S(E))return new B(f,f);if(x(E))return I=z(k(E),I),new B(k(I.g),k(I.h));if(x(I))return I=z(E,k(I)),new B(k(I.g),I.h);if(E.g.length>30){if(x(E)||x(I))throw Error("slowDivide_ only works with positive integers.");for(var T=m,v=I;v.l(E)<=0;)T=W(T),v=W(v);var A=Q(T,1),C=Q(v,1);for(v=Q(v,2),T=Q(T,2);!S(v);){var w=C.add(v);w.l(E)<=0&&(A=A.add(T),C=w),v=Q(v,1),T=Q(T,1)}return I=O(E,A.j(I)),new B(A,I)}for(A=f;E.l(I)>=0;){for(T=Math.max(1,Math.floor(E.m()/I.m())),v=Math.ceil(Math.log(T)/Math.LN2),v=v<=48?1:Math.pow(2,v-48),C=l(T),w=C.j(I);x(w)||w.l(E)>0;)T-=v,C=l(T),w=C.j(I);S(C)&&(C=m),A=A.add(C),E=O(E,w)}return new B(A,E)}n.B=function(E){return z(this,E).h},n.and=function(E){const I=Math.max(this.g.length,E.g.length),T=[];for(let v=0;v<I;v++)T[v]=this.i(v)&E.i(v);return new o(T,this.h&E.h)},n.or=function(E){const I=Math.max(this.g.length,E.g.length),T=[];for(let v=0;v<I;v++)T[v]=this.i(v)|E.i(v);return new o(T,this.h|E.h)},n.xor=function(E){const I=Math.max(this.g.length,E.g.length),T=[];for(let v=0;v<I;v++)T[v]=this.i(v)^E.i(v);return new o(T,this.h^E.h)};function W(E){const I=E.g.length+1,T=[];for(let v=0;v<I;v++)T[v]=E.i(v)<<1|E.i(v-1)>>>31;return new o(T,E.h)}function Q(E,I){const T=I>>5;I%=32;const v=E.g.length-T,A=[];for(let C=0;C<v;C++)A[C]=I>0?E.i(C+T)>>>I|E.i(C+T+1)<<32-I:E.i(C+T);return new o(A,E.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,wg=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=l,o.fromString=d,Pn=o}).apply(typeof If<"u"?If:typeof self<"u"?self:typeof window<"u"?window:{});var Do=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Tg,hi,Ag,zo,_u,vg,bg,Sg;(function(){var n,e=Object.defineProperty;function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Do=="object"&&Do];for(var h=0;h<a.length;++h){var p=a[h];if(p&&p.Math==Math)return p}throw Error("Cannot find global object")}var r=t(this);function s(a,h){if(h)e:{var p=r;a=a.split(".");for(var g=0;g<a.length-1;g++){var R=a[g];if(!(R in p))break e;p=p[R]}a=a[a.length-1],g=p[a],h=h(g),h!=g&&h!=null&&e(p,a,{configurable:!0,writable:!0,value:h})}}s("Symbol.dispose",function(a){return a||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(a){return a||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(a){return a||function(h){var p=[],g;for(g in h)Object.prototype.hasOwnProperty.call(h,g)&&p.push([g,h[g]]);return p}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},o=this||self;function c(a){var h=typeof a;return h=="object"&&a!=null||h=="function"}function u(a,h,p){return a.call.apply(a.bind,arguments)}function l(a,h,p){return l=u,l.apply(null,arguments)}function d(a,h){var p=Array.prototype.slice.call(arguments,1);return function(){var g=p.slice();return g.push.apply(g,arguments),a.apply(this,g)}}function f(a,h){function p(){}p.prototype=h.prototype,a.Z=h.prototype,a.prototype=new p,a.prototype.constructor=a,a.Ob=function(g,R,D){for(var F=Array(arguments.length-2),Y=2;Y<arguments.length;Y++)F[Y-2]=arguments[Y];return h.prototype[R].apply(g,F)}}var m=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?a=>a&&AsyncContext.Snapshot.wrap(a):a=>a;function y(a){const h=a.length;if(h>0){const p=Array(h);for(let g=0;g<h;g++)p[g]=a[g];return p}return[]}function S(a,h){for(let g=1;g<arguments.length;g++){const R=arguments[g];var p=typeof R;if(p=p!="object"?p:R?Array.isArray(R)?"array":p:"null",p=="array"||p=="object"&&typeof R.length=="number"){p=a.length||0;const D=R.length||0;a.length=p+D;for(let F=0;F<D;F++)a[p+F]=R[F]}else a.push(R)}}class x{constructor(h,p){this.i=h,this.j=p,this.h=0,this.g=null}get(){let h;return this.h>0?(this.h--,h=this.g,this.g=h.next,h.next=null):h=this.i(),h}}function k(a){o.setTimeout(()=>{throw a},0)}function O(){var a=E;let h=null;return a.g&&(h=a.g,a.g=a.g.next,a.g||(a.h=null),h.next=null),h}class U{constructor(){this.h=this.g=null}add(h,p){const g=B.get();g.set(h,p),this.h?this.h.next=g:this.g=g,this.h=g}}var B=new x(()=>new z,a=>a.reset());class z{constructor(){this.next=this.g=this.h=null}set(h,p){this.h=h,this.g=p,this.next=null}reset(){this.next=this.g=this.h=null}}let W,Q=!1,E=new U,I=()=>{const a=Promise.resolve(void 0);W=()=>{a.then(T)}};function T(){for(var a;a=O();){try{a.h.call(a.g)}catch(p){k(p)}var h=B;h.j(a),h.h<100&&(h.h++,a.next=h.g,h.g=a)}Q=!1}function v(){this.u=this.u,this.C=this.C}v.prototype.u=!1,v.prototype.dispose=function(){this.u||(this.u=!0,this.N())},v.prototype[Symbol.dispose]=function(){this.dispose()},v.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function A(a,h){this.type=a,this.g=this.target=h,this.defaultPrevented=!1}A.prototype.h=function(){this.defaultPrevented=!0};var C=function(){if(!o.addEventListener||!Object.defineProperty)return!1;var a=!1,h=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const p=()=>{};o.addEventListener("test",p,h),o.removeEventListener("test",p,h)}catch{}return a}();function w(a){return/^[\s\xa0]*$/.test(a)}function Ze(a,h){A.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a&&this.init(a,h)}f(Ze,A),Ze.prototype.init=function(a,h){const p=this.type=a.type,g=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement,this.g=h,h=a.relatedTarget,h||(p=="mouseover"?h=a.fromElement:p=="mouseout"&&(h=a.toElement)),this.relatedTarget=h,g?(this.clientX=g.clientX!==void 0?g.clientX:g.pageX,this.clientY=g.clientY!==void 0?g.clientY:g.pageY,this.screenX=g.screenX||0,this.screenY=g.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=a.pointerType,this.state=a.state,this.i=a,a.defaultPrevented&&Ze.Z.h.call(this)},Ze.prototype.h=function(){Ze.Z.h.call(this);const a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var Wn="closure_listenable_"+(Math.random()*1e6|0),sE=0;function iE(a,h,p,g,R){this.listener=a,this.proxy=null,this.src=h,this.type=p,this.capture=!!g,this.ha=R,this.key=++sE,this.da=this.fa=!1}function fo(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function po(a,h,p){for(const g in a)h.call(p,a[g],g,a)}function oE(a,h){for(const p in a)h.call(void 0,a[p],p,a)}function Mh(a){const h={};for(const p in a)h[p]=a[p];return h}const Lh="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Fh(a,h){let p,g;for(let R=1;R<arguments.length;R++){g=arguments[R];for(p in g)a[p]=g[p];for(let D=0;D<Lh.length;D++)p=Lh[D],Object.prototype.hasOwnProperty.call(g,p)&&(a[p]=g[p])}}function mo(a){this.src=a,this.g={},this.h=0}mo.prototype.add=function(a,h,p,g,R){const D=a.toString();a=this.g[D],a||(a=this.g[D]=[],this.h++);const F=_c(a,h,g,R);return F>-1?(h=a[F],p||(h.fa=!1)):(h=new iE(h,this.src,D,!!g,R),h.fa=p,a.push(h)),h};function gc(a,h){const p=h.type;if(p in a.g){var g=a.g[p],R=Array.prototype.indexOf.call(g,h,void 0),D;(D=R>=0)&&Array.prototype.splice.call(g,R,1),D&&(fo(h),a.g[p].length==0&&(delete a.g[p],a.h--))}}function _c(a,h,p,g){for(let R=0;R<a.length;++R){const D=a[R];if(!D.da&&D.listener==h&&D.capture==!!p&&D.ha==g)return R}return-1}var yc="closure_lm_"+(Math.random()*1e6|0),Ic={};function Uh(a,h,p,g,R){if(Array.isArray(h)){for(let D=0;D<h.length;D++)Uh(a,h[D],p,g,R);return null}return p=Gh(p),a&&a[Wn]?a.J(h,p,c(g)?!!g.capture:!1,R):aE(a,h,p,!1,g,R)}function aE(a,h,p,g,R,D){if(!h)throw Error("Invalid event type");const F=c(R)?!!R.capture:!!R;let Y=wc(a);if(Y||(a[yc]=Y=new mo(a)),p=Y.add(h,p,g,F,D),p.proxy)return p;if(g=cE(),p.proxy=g,g.src=a,g.listener=p,a.addEventListener)C||(R=F),R===void 0&&(R=!1),a.addEventListener(h.toString(),g,R);else if(a.attachEvent)a.attachEvent(jh(h.toString()),g);else if(a.addListener&&a.removeListener)a.addListener(g);else throw Error("addEventListener and attachEvent are unavailable.");return p}function cE(){function a(p){return h.call(a.src,a.listener,p)}const h=uE;return a}function Bh(a,h,p,g,R){if(Array.isArray(h))for(var D=0;D<h.length;D++)Bh(a,h[D],p,g,R);else g=c(g)?!!g.capture:!!g,p=Gh(p),a&&a[Wn]?(a=a.i,D=String(h).toString(),D in a.g&&(h=a.g[D],p=_c(h,p,g,R),p>-1&&(fo(h[p]),Array.prototype.splice.call(h,p,1),h.length==0&&(delete a.g[D],a.h--)))):a&&(a=wc(a))&&(h=a.g[h.toString()],a=-1,h&&(a=_c(h,p,g,R)),(p=a>-1?h[a]:null)&&Ec(p))}function Ec(a){if(typeof a!="number"&&a&&!a.da){var h=a.src;if(h&&h[Wn])gc(h.i,a);else{var p=a.type,g=a.proxy;h.removeEventListener?h.removeEventListener(p,g,a.capture):h.detachEvent?h.detachEvent(jh(p),g):h.addListener&&h.removeListener&&h.removeListener(g),(p=wc(h))?(gc(p,a),p.h==0&&(p.src=null,h[yc]=null)):fo(a)}}}function jh(a){return a in Ic?Ic[a]:Ic[a]="on"+a}function uE(a,h){if(a.da)a=!0;else{h=new Ze(h,this);const p=a.listener,g=a.ha||a.src;a.fa&&Ec(a),a=p.call(g,h)}return a}function wc(a){return a=a[yc],a instanceof mo?a:null}var Tc="__closure_events_fn_"+(Math.random()*1e9>>>0);function Gh(a){return typeof a=="function"?a:(a[Tc]||(a[Tc]=function(h){return a.handleEvent(h)}),a[Tc])}function je(){v.call(this),this.i=new mo(this),this.M=this,this.G=null}f(je,v),je.prototype[Wn]=!0,je.prototype.removeEventListener=function(a,h,p,g){Bh(this,a,h,p,g)};function We(a,h){var p,g=a.G;if(g)for(p=[];g;g=g.G)p.push(g);if(a=a.M,g=h.type||h,typeof h=="string")h=new A(h,a);else if(h instanceof A)h.target=h.target||a;else{var R=h;h=new A(g,a),Fh(h,R)}R=!0;let D,F;if(p)for(F=p.length-1;F>=0;F--)D=h.g=p[F],R=go(D,g,!0,h)&&R;if(D=h.g=a,R=go(D,g,!0,h)&&R,R=go(D,g,!1,h)&&R,p)for(F=0;F<p.length;F++)D=h.g=p[F],R=go(D,g,!1,h)&&R}je.prototype.N=function(){if(je.Z.N.call(this),this.i){var a=this.i;for(const h in a.g){const p=a.g[h];for(let g=0;g<p.length;g++)fo(p[g]);delete a.g[h],a.h--}}this.G=null},je.prototype.J=function(a,h,p,g){return this.i.add(String(a),h,!1,p,g)},je.prototype.K=function(a,h,p,g){return this.i.add(String(a),h,!0,p,g)};function go(a,h,p,g){if(h=a.i.g[String(h)],!h)return!0;h=h.concat();let R=!0;for(let D=0;D<h.length;++D){const F=h[D];if(F&&!F.da&&F.capture==p){const Y=F.listener,Pe=F.ha||F.src;F.fa&&gc(a.i,F),R=Y.call(Pe,g)!==!1&&R}}return R&&!g.defaultPrevented}function lE(a,h){if(typeof a!="function")if(a&&typeof a.handleEvent=="function")a=l(a.handleEvent,a);else throw Error("Invalid listener argument");return Number(h)>2147483647?-1:o.setTimeout(a,h||0)}function qh(a){a.g=lE(()=>{a.g=null,a.i&&(a.i=!1,qh(a))},a.l);const h=a.h;a.h=null,a.m.apply(null,h)}class hE extends v{constructor(h,p){super(),this.m=h,this.l=p,this.h=null,this.i=!1,this.g=null}j(h){this.h=arguments,this.g?this.i=!0:qh(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Bs(a){v.call(this),this.h=a,this.g={}}f(Bs,v);var $h=[];function zh(a){po(a.g,function(h,p){this.g.hasOwnProperty(p)&&Ec(h)},a),a.g={}}Bs.prototype.N=function(){Bs.Z.N.call(this),zh(this)},Bs.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Ac=o.JSON.stringify,dE=o.JSON.parse,fE=class{stringify(a){return o.JSON.stringify(a,void 0)}parse(a){return o.JSON.parse(a,void 0)}};function Kh(){}function Hh(){}var js={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function vc(){A.call(this,"d")}f(vc,A);function bc(){A.call(this,"c")}f(bc,A);var Qn={},Wh=null;function _o(){return Wh=Wh||new je}Qn.Ia="serverreachability";function Qh(a){A.call(this,Qn.Ia,a)}f(Qh,A);function Gs(a){const h=_o();We(h,new Qh(h))}Qn.STAT_EVENT="statevent";function Jh(a,h){A.call(this,Qn.STAT_EVENT,a),this.stat=h}f(Jh,A);function Qe(a){const h=_o();We(h,new Jh(h,a))}Qn.Ja="timingevent";function Yh(a,h){A.call(this,Qn.Ja,a),this.size=h}f(Yh,A);function qs(a,h){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){a()},h)}function $s(){this.g=!0}$s.prototype.ua=function(){this.g=!1};function pE(a,h,p,g,R,D){a.info(function(){if(a.g)if(D){var F="",Y=D.split("&");for(let le=0;le<Y.length;le++){var Pe=Y[le].split("=");if(Pe.length>1){const Ve=Pe[0];Pe=Pe[1];const St=Ve.split("_");F=St.length>=2&&St[1]=="type"?F+(Ve+"="+Pe+"&"):F+(Ve+"=redacted&")}}}else F=null;else F=D;return"XMLHTTP REQ ("+g+") [attempt "+R+"]: "+h+`
`+p+`
`+F})}function mE(a,h,p,g,R,D,F){a.info(function(){return"XMLHTTP RESP ("+g+") [ attempt "+R+"]: "+h+`
`+p+`
`+D+" "+F})}function Nr(a,h,p,g){a.info(function(){return"XMLHTTP TEXT ("+h+"): "+_E(a,p)+(g?" "+g:"")})}function gE(a,h){a.info(function(){return"TIMEOUT: "+h})}$s.prototype.info=function(){};function _E(a,h){if(!a.g)return h;if(!h)return null;try{const D=JSON.parse(h);if(D){for(a=0;a<D.length;a++)if(Array.isArray(D[a])){var p=D[a];if(!(p.length<2)){var g=p[1];if(Array.isArray(g)&&!(g.length<1)){var R=g[0];if(R!="noop"&&R!="stop"&&R!="close")for(let F=1;F<g.length;F++)g[F]=""}}}}return Ac(D)}catch{return h}}var yo={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Xh={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Zh;function Sc(){}f(Sc,Kh),Sc.prototype.g=function(){return new XMLHttpRequest},Zh=new Sc;function zs(a){return encodeURIComponent(String(a))}function yE(a){var h=1;a=a.split(":");const p=[];for(;h>0&&a.length;)p.push(a.shift()),h--;return a.length&&p.push(a.join(":")),p}function on(a,h,p,g){this.j=a,this.i=h,this.l=p,this.S=g||1,this.V=new Bs(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new ed}function ed(){this.i=null,this.g="",this.h=!1}var td={},Rc={};function Pc(a,h,p){a.M=1,a.A=Eo(bt(h)),a.u=p,a.R=!0,nd(a,null)}function nd(a,h){a.F=Date.now(),Io(a),a.B=bt(a.A);var p=a.B,g=a.S;Array.isArray(g)||(g=[String(g)]),md(p.i,"t",g),a.C=0,p=a.j.L,a.h=new ed,a.g=Nd(a.j,p?h:null,!a.u),a.P>0&&(a.O=new hE(l(a.Y,a,a.g),a.P)),h=a.V,p=a.g,g=a.ba;var R="readystatechange";Array.isArray(R)||(R&&($h[0]=R.toString()),R=$h);for(let D=0;D<R.length;D++){const F=Uh(p,R[D],g||h.handleEvent,!1,h.h||h);if(!F)break;h.g[F.key]=F}h=a.J?Mh(a.J):{},a.u?(a.v||(a.v="POST"),h["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.B,a.v,a.u,h)):(a.v="GET",a.g.ea(a.B,a.v,null,h)),Gs(),pE(a.i,a.v,a.B,a.l,a.S,a.u)}on.prototype.ba=function(a){a=a.target;const h=this.O;h&&un(a)==3?h.j():this.Y(a)},on.prototype.Y=function(a){try{if(a==this.g)e:{const Y=un(this.g),Pe=this.g.ya(),le=this.g.ca();if(!(Y<3)&&(Y!=3||this.g&&(this.h.h||this.g.la()||Td(this.g)))){this.K||Y!=4||Pe==7||(Pe==8||le<=0?Gs(3):Gs(2)),Cc(this);var h=this.g.ca();this.X=h;var p=IE(this);if(this.o=h==200,mE(this.i,this.v,this.B,this.l,this.S,Y,h),this.o){if(this.U&&!this.L){t:{if(this.g){var g,R=this.g;if((g=R.g?R.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!w(g)){var D=g;break t}}D=null}if(a=D)Nr(this.i,this.l,a,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,xc(this,a);else{this.o=!1,this.m=3,Qe(12),Jn(this),Ks(this);break e}}if(this.R){a=!0;let Ve;for(;!this.K&&this.C<p.length;)if(Ve=EE(this,p),Ve==Rc){Y==4&&(this.m=4,Qe(14),a=!1),Nr(this.i,this.l,null,"[Incomplete Response]");break}else if(Ve==td){this.m=4,Qe(15),Nr(this.i,this.l,p,"[Invalid Chunk]"),a=!1;break}else Nr(this.i,this.l,Ve,null),xc(this,Ve);if(rd(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Y!=4||p.length!=0||this.h.h||(this.m=1,Qe(16),a=!1),this.o=this.o&&a,!a)Nr(this.i,this.l,p,"[Invalid Chunked Response]"),Jn(this),Ks(this);else if(p.length>0&&!this.W){this.W=!0;var F=this.j;F.g==this&&F.aa&&!F.P&&(F.j.info("Great, no buffering proxy detected. Bytes received: "+p.length),Fc(F),F.P=!0,Qe(11))}}else Nr(this.i,this.l,p,null),xc(this,p);Y==4&&Jn(this),this.o&&!this.K&&(Y==4?Cd(this.j,this):(this.o=!1,Io(this)))}else VE(this.g),h==400&&p.indexOf("Unknown SID")>0?(this.m=3,Qe(12)):(this.m=0,Qe(13)),Jn(this),Ks(this)}}}catch{}finally{}};function IE(a){if(!rd(a))return a.g.la();const h=Td(a.g);if(h==="")return"";let p="";const g=h.length,R=un(a.g)==4;if(!a.h.i){if(typeof TextDecoder>"u")return Jn(a),Ks(a),"";a.h.i=new o.TextDecoder}for(let D=0;D<g;D++)a.h.h=!0,p+=a.h.i.decode(h[D],{stream:!(R&&D==g-1)});return h.length=0,a.h.g+=p,a.C=0,a.h.g}function rd(a){return a.g?a.v=="GET"&&a.M!=2&&a.j.Aa:!1}function EE(a,h){var p=a.C,g=h.indexOf(`
`,p);return g==-1?Rc:(p=Number(h.substring(p,g)),isNaN(p)?td:(g+=1,g+p>h.length?Rc:(h=h.slice(g,g+p),a.C=g+p,h)))}on.prototype.cancel=function(){this.K=!0,Jn(this)};function Io(a){a.T=Date.now()+a.H,sd(a,a.H)}function sd(a,h){if(a.D!=null)throw Error("WatchDog timer not null");a.D=qs(l(a.aa,a),h)}function Cc(a){a.D&&(o.clearTimeout(a.D),a.D=null)}on.prototype.aa=function(){this.D=null;const a=Date.now();a-this.T>=0?(gE(this.i,this.B),this.M!=2&&(Gs(),Qe(17)),Jn(this),this.m=2,Ks(this)):sd(this,this.T-a)};function Ks(a){a.j.I==0||a.K||Cd(a.j,a)}function Jn(a){Cc(a);var h=a.O;h&&typeof h.dispose=="function"&&h.dispose(),a.O=null,zh(a.V),a.g&&(h=a.g,a.g=null,h.abort(),h.dispose())}function xc(a,h){try{var p=a.j;if(p.I!=0&&(p.g==a||Dc(p.h,a))){if(!a.L&&Dc(p.h,a)&&p.I==3){try{var g=p.Ba.g.parse(h)}catch{g=null}if(Array.isArray(g)&&g.length==3){var R=g;if(R[0]==0){e:if(!p.v){if(p.g)if(p.g.F+3e3<a.F)bo(p),Ao(p);else break e;Lc(p),Qe(18)}}else p.xa=R[1],0<p.xa-p.K&&R[2]<37500&&p.F&&p.A==0&&!p.C&&(p.C=qs(l(p.Va,p),6e3));ad(p.h)<=1&&p.ta&&(p.ta=void 0)}else Xn(p,11)}else if((a.L||p.g==a)&&bo(p),!w(h))for(R=p.Ba.g.parse(h),h=0;h<R.length;h++){let le=R[h];const Ve=le[0];if(!(Ve<=p.K))if(p.K=Ve,le=le[1],p.I==2)if(le[0]=="c"){p.M=le[1],p.ba=le[2];const St=le[3];St!=null&&(p.ka=St,p.j.info("VER="+p.ka));const Zn=le[4];Zn!=null&&(p.za=Zn,p.j.info("SVER="+p.za));const ln=le[5];ln!=null&&typeof ln=="number"&&ln>0&&(g=1.5*ln,p.O=g,p.j.info("backChannelRequestTimeoutMs_="+g)),g=p;const hn=a.g;if(hn){const Ro=hn.g?hn.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Ro){var D=g.h;D.g||Ro.indexOf("spdy")==-1&&Ro.indexOf("quic")==-1&&Ro.indexOf("h2")==-1||(D.j=D.l,D.g=new Set,D.h&&(kc(D,D.h),D.h=null))}if(g.G){const Uc=hn.g?hn.g.getResponseHeader("X-HTTP-Session-Id"):null;Uc&&(g.wa=Uc,de(g.J,g.G,Uc))}}p.I=3,p.l&&p.l.ra(),p.aa&&(p.T=Date.now()-a.F,p.j.info("Handshake RTT: "+p.T+"ms")),g=p;var F=a;if(g.na=kd(g,g.L?g.ba:null,g.W),F.L){cd(g.h,F);var Y=F,Pe=g.O;Pe&&(Y.H=Pe),Y.D&&(Cc(Y),Io(Y)),g.g=F}else Rd(g);p.i.length>0&&vo(p)}else le[0]!="stop"&&le[0]!="close"||Xn(p,7);else p.I==3&&(le[0]=="stop"||le[0]=="close"?le[0]=="stop"?Xn(p,7):Mc(p):le[0]!="noop"&&p.l&&p.l.qa(le),p.A=0)}}Gs(4)}catch{}}var wE=class{constructor(a,h){this.g=a,this.map=h}};function id(a){this.l=a||10,o.PerformanceNavigationTiming?(a=o.performance.getEntriesByType("navigation"),a=a.length>0&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function od(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function ad(a){return a.h?1:a.g?a.g.size:0}function Dc(a,h){return a.h?a.h==h:a.g?a.g.has(h):!1}function kc(a,h){a.g?a.g.add(h):a.h=h}function cd(a,h){a.h&&a.h==h?a.h=null:a.g&&a.g.has(h)&&a.g.delete(h)}id.prototype.cancel=function(){if(this.i=ud(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function ud(a){if(a.h!=null)return a.i.concat(a.h.G);if(a.g!=null&&a.g.size!==0){let h=a.i;for(const p of a.g.values())h=h.concat(p.G);return h}return y(a.i)}var ld=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function TE(a,h){if(a){a=a.split("&");for(let p=0;p<a.length;p++){const g=a[p].indexOf("=");let R,D=null;g>=0?(R=a[p].substring(0,g),D=a[p].substring(g+1)):R=a[p],h(R,D?decodeURIComponent(D.replace(/\+/g," ")):"")}}}function an(a){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let h;a instanceof an?(this.l=a.l,Hs(this,a.j),this.o=a.o,this.g=a.g,Ws(this,a.u),this.h=a.h,Nc(this,gd(a.i)),this.m=a.m):a&&(h=String(a).match(ld))?(this.l=!1,Hs(this,h[1]||"",!0),this.o=Qs(h[2]||""),this.g=Qs(h[3]||"",!0),Ws(this,h[4]),this.h=Qs(h[5]||"",!0),Nc(this,h[6]||"",!0),this.m=Qs(h[7]||"")):(this.l=!1,this.i=new Ys(null,this.l))}an.prototype.toString=function(){const a=[];var h=this.j;h&&a.push(Js(h,hd,!0),":");var p=this.g;return(p||h=="file")&&(a.push("//"),(h=this.o)&&a.push(Js(h,hd,!0),"@"),a.push(zs(p).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),p=this.u,p!=null&&a.push(":",String(p))),(p=this.h)&&(this.g&&p.charAt(0)!="/"&&a.push("/"),a.push(Js(p,p.charAt(0)=="/"?bE:vE,!0))),(p=this.i.toString())&&a.push("?",p),(p=this.m)&&a.push("#",Js(p,RE)),a.join("")},an.prototype.resolve=function(a){const h=bt(this);let p=!!a.j;p?Hs(h,a.j):p=!!a.o,p?h.o=a.o:p=!!a.g,p?h.g=a.g:p=a.u!=null;var g=a.h;if(p)Ws(h,a.u);else if(p=!!a.h){if(g.charAt(0)!="/")if(this.g&&!this.h)g="/"+g;else{var R=h.h.lastIndexOf("/");R!=-1&&(g=h.h.slice(0,R+1)+g)}if(R=g,R==".."||R==".")g="";else if(R.indexOf("./")!=-1||R.indexOf("/.")!=-1){g=R.lastIndexOf("/",0)==0,R=R.split("/");const D=[];for(let F=0;F<R.length;){const Y=R[F++];Y=="."?g&&F==R.length&&D.push(""):Y==".."?((D.length>1||D.length==1&&D[0]!="")&&D.pop(),g&&F==R.length&&D.push("")):(D.push(Y),g=!0)}g=D.join("/")}else g=R}return p?h.h=g:p=a.i.toString()!=="",p?Nc(h,gd(a.i)):p=!!a.m,p&&(h.m=a.m),h};function bt(a){return new an(a)}function Hs(a,h,p){a.j=p?Qs(h,!0):h,a.j&&(a.j=a.j.replace(/:$/,""))}function Ws(a,h){if(h){if(h=Number(h),isNaN(h)||h<0)throw Error("Bad port number "+h);a.u=h}else a.u=null}function Nc(a,h,p){h instanceof Ys?(a.i=h,PE(a.i,a.l)):(p||(h=Js(h,SE)),a.i=new Ys(h,a.l))}function de(a,h,p){a.i.set(h,p)}function Eo(a){return de(a,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),a}function Qs(a,h){return a?h?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Js(a,h,p){return typeof a=="string"?(a=encodeURI(a).replace(h,AE),p&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function AE(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var hd=/[#\/\?@]/g,vE=/[#\?:]/g,bE=/[#\?]/g,SE=/[#\?@]/g,RE=/#/g;function Ys(a,h){this.h=this.g=null,this.i=a||null,this.j=!!h}function Yn(a){a.g||(a.g=new Map,a.h=0,a.i&&TE(a.i,function(h,p){a.add(decodeURIComponent(h.replace(/\+/g," ")),p)}))}n=Ys.prototype,n.add=function(a,h){Yn(this),this.i=null,a=Vr(this,a);let p=this.g.get(a);return p||this.g.set(a,p=[]),p.push(h),this.h+=1,this};function dd(a,h){Yn(a),h=Vr(a,h),a.g.has(h)&&(a.i=null,a.h-=a.g.get(h).length,a.g.delete(h))}function fd(a,h){return Yn(a),h=Vr(a,h),a.g.has(h)}n.forEach=function(a,h){Yn(this),this.g.forEach(function(p,g){p.forEach(function(R){a.call(h,R,g,this)},this)},this)};function pd(a,h){Yn(a);let p=[];if(typeof h=="string")fd(a,h)&&(p=p.concat(a.g.get(Vr(a,h))));else for(a=Array.from(a.g.values()),h=0;h<a.length;h++)p=p.concat(a[h]);return p}n.set=function(a,h){return Yn(this),this.i=null,a=Vr(this,a),fd(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[h]),this.h+=1,this},n.get=function(a,h){return a?(a=pd(this,a),a.length>0?String(a[0]):h):h};function md(a,h,p){dd(a,h),p.length>0&&(a.i=null,a.g.set(Vr(a,h),y(p)),a.h+=p.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],h=Array.from(this.g.keys());for(let g=0;g<h.length;g++){var p=h[g];const R=zs(p);p=pd(this,p);for(let D=0;D<p.length;D++){let F=R;p[D]!==""&&(F+="="+zs(p[D])),a.push(F)}}return this.i=a.join("&")};function gd(a){const h=new Ys;return h.i=a.i,a.g&&(h.g=new Map(a.g),h.h=a.h),h}function Vr(a,h){return h=String(h),a.j&&(h=h.toLowerCase()),h}function PE(a,h){h&&!a.j&&(Yn(a),a.i=null,a.g.forEach(function(p,g){const R=g.toLowerCase();g!=R&&(dd(this,g),md(this,R,p))},a)),a.j=h}function CE(a,h){const p=new $s;if(o.Image){const g=new Image;g.onload=d(cn,p,"TestLoadImage: loaded",!0,h,g),g.onerror=d(cn,p,"TestLoadImage: error",!1,h,g),g.onabort=d(cn,p,"TestLoadImage: abort",!1,h,g),g.ontimeout=d(cn,p,"TestLoadImage: timeout",!1,h,g),o.setTimeout(function(){g.ontimeout&&g.ontimeout()},1e4),g.src=a}else h(!1)}function xE(a,h){const p=new $s,g=new AbortController,R=setTimeout(()=>{g.abort(),cn(p,"TestPingServer: timeout",!1,h)},1e4);fetch(a,{signal:g.signal}).then(D=>{clearTimeout(R),D.ok?cn(p,"TestPingServer: ok",!0,h):cn(p,"TestPingServer: server error",!1,h)}).catch(()=>{clearTimeout(R),cn(p,"TestPingServer: error",!1,h)})}function cn(a,h,p,g,R){try{R&&(R.onload=null,R.onerror=null,R.onabort=null,R.ontimeout=null),g(p)}catch{}}function DE(){this.g=new fE}function Vc(a){this.i=a.Sb||null,this.h=a.ab||!1}f(Vc,Kh),Vc.prototype.g=function(){return new wo(this.i,this.h)};function wo(a,h){je.call(this),this.H=a,this.o=h,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}f(wo,je),n=wo.prototype,n.open=function(a,h){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=a,this.D=h,this.readyState=1,Zs(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const h={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};a&&(h.body=a),(this.H||o).fetch(new Request(this.D,h)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Xs(this)),this.readyState=0},n.Pa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Zs(this)),this.g&&(this.readyState=3,Zs(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;_d(this)}else a.text().then(this.Oa.bind(this),this.ga.bind(this))};function _d(a){a.j.read().then(a.Ma.bind(a)).catch(a.ga.bind(a))}n.Ma=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var h=a.value?a.value:new Uint8Array(0);(h=this.B.decode(h,{stream:!a.done}))&&(this.response=this.responseText+=h)}a.done?Xs(this):Zs(this),this.readyState==3&&_d(this)}},n.Oa=function(a){this.g&&(this.response=this.responseText=a,Xs(this))},n.Na=function(a){this.g&&(this.response=a,Xs(this))},n.ga=function(){this.g&&Xs(this)};function Xs(a){a.readyState=4,a.l=null,a.j=null,a.B=null,Zs(a)}n.setRequestHeader=function(a,h){this.A.append(a,h)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],h=this.h.entries();for(var p=h.next();!p.done;)p=p.value,a.push(p[0]+": "+p[1]),p=h.next();return a.join(`\r
`)};function Zs(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(wo.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function yd(a){let h="";return po(a,function(p,g){h+=g,h+=":",h+=p,h+=`\r
`}),h}function Oc(a,h,p){e:{for(g in p){var g=!1;break e}g=!0}g||(p=yd(p),typeof a=="string"?p!=null&&zs(p):de(a,h,p))}function Ee(a){je.call(this),this.headers=new Map,this.L=a||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}f(Ee,je);var kE=/^https?$/i,NE=["POST","PUT"];n=Ee.prototype,n.Fa=function(a){this.H=a},n.ea=function(a,h,p,g){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);h=h?h.toUpperCase():"GET",this.D=a,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Zh.g(),this.g.onreadystatechange=m(l(this.Ca,this));try{this.B=!0,this.g.open(h,String(a),!0),this.B=!1}catch(D){Id(this,D);return}if(a=p||"",p=new Map(this.headers),g)if(Object.getPrototypeOf(g)===Object.prototype)for(var R in g)p.set(R,g[R]);else if(typeof g.keys=="function"&&typeof g.get=="function")for(const D of g.keys())p.set(D,g.get(D));else throw Error("Unknown input type for opt_headers: "+String(g));g=Array.from(p.keys()).find(D=>D.toLowerCase()=="content-type"),R=o.FormData&&a instanceof o.FormData,!(Array.prototype.indexOf.call(NE,h,void 0)>=0)||g||R||p.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[D,F]of p)this.g.setRequestHeader(D,F);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(a),this.v=!1}catch(D){Id(this,D)}};function Id(a,h){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=h,a.o=5,Ed(a),To(a)}function Ed(a){a.A||(a.A=!0,We(a,"complete"),We(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=a||7,We(this,"complete"),We(this,"abort"),To(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),To(this,!0)),Ee.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?wd(this):this.Xa())},n.Xa=function(){wd(this)};function wd(a){if(a.h&&typeof i<"u"){if(a.v&&un(a)==4)setTimeout(a.Ca.bind(a),0);else if(We(a,"readystatechange"),un(a)==4){a.h=!1;try{const D=a.ca();e:switch(D){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var h=!0;break e;default:h=!1}var p;if(!(p=h)){var g;if(g=D===0){let F=String(a.D).match(ld)[1]||null;!F&&o.self&&o.self.location&&(F=o.self.location.protocol.slice(0,-1)),g=!kE.test(F?F.toLowerCase():"")}p=g}if(p)We(a,"complete"),We(a,"success");else{a.o=6;try{var R=un(a)>2?a.g.statusText:""}catch{R=""}a.l=R+" ["+a.ca()+"]",Ed(a)}}finally{To(a)}}}}function To(a,h){if(a.g){a.m&&(clearTimeout(a.m),a.m=null);const p=a.g;a.g=null,h||We(a,"ready");try{p.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function un(a){return a.g?a.g.readyState:0}n.ca=function(){try{return un(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(a){if(this.g){var h=this.g.responseText;return a&&h.indexOf(a)==0&&(h=h.substring(a.length)),dE(h)}};function Td(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.F){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function VE(a){const h={};a=(a.g&&un(a)>=2&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let g=0;g<a.length;g++){if(w(a[g]))continue;var p=yE(a[g]);const R=p[0];if(p=p[1],typeof p!="string")continue;p=p.trim();const D=h[R]||[];h[R]=D,D.push(p)}oE(h,function(g){return g.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function ei(a,h,p){return p&&p.internalChannelParams&&p.internalChannelParams[a]||h}function Ad(a){this.za=0,this.i=[],this.j=new $s,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=ei("failFast",!1,a),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=ei("baseRetryDelayMs",5e3,a),this.Za=ei("retryDelaySeedMs",1e4,a),this.Ta=ei("forwardChannelMaxRetries",2,a),this.va=ei("forwardChannelRequestTimeoutMs",2e4,a),this.ma=a&&a.xmlHttpFactory||void 0,this.Ua=a&&a.Rb||void 0,this.Aa=a&&a.useFetchStreams||!1,this.O=void 0,this.L=a&&a.supportsCrossDomainXhr||!1,this.M="",this.h=new id(a&&a.concurrentRequestLimit),this.Ba=new DE,this.S=a&&a.fastHandshake||!1,this.R=a&&a.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=a&&a.Pb||!1,a&&a.ua&&this.j.ua(),a&&a.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&a&&a.detectBufferingProxy||!1,this.ia=void 0,a&&a.longPollingTimeout&&a.longPollingTimeout>0&&(this.ia=a.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=Ad.prototype,n.ka=8,n.I=1,n.connect=function(a,h,p,g){Qe(0),this.W=a,this.H=h||{},p&&g!==void 0&&(this.H.OSID=p,this.H.OAID=g),this.F=this.X,this.J=kd(this,null,this.W),vo(this)};function Mc(a){if(vd(a),a.I==3){var h=a.V++,p=bt(a.J);if(de(p,"SID",a.M),de(p,"RID",h),de(p,"TYPE","terminate"),ti(a,p),h=new on(a,a.j,h),h.M=2,h.A=Eo(bt(p)),p=!1,o.navigator&&o.navigator.sendBeacon)try{p=o.navigator.sendBeacon(h.A.toString(),"")}catch{}!p&&o.Image&&(new Image().src=h.A,p=!0),p||(h.g=Nd(h.j,null),h.g.ea(h.A)),h.F=Date.now(),Io(h)}Dd(a)}function Ao(a){a.g&&(Fc(a),a.g.cancel(),a.g=null)}function vd(a){Ao(a),a.v&&(o.clearTimeout(a.v),a.v=null),bo(a),a.h.cancel(),a.m&&(typeof a.m=="number"&&o.clearTimeout(a.m),a.m=null)}function vo(a){if(!od(a.h)&&!a.m){a.m=!0;var h=a.Ea;W||I(),Q||(W(),Q=!0),E.add(h,a),a.D=0}}function OE(a,h){return ad(a.h)>=a.h.j-(a.m?1:0)?!1:a.m?(a.i=h.G.concat(a.i),!0):a.I==1||a.I==2||a.D>=(a.Sa?0:a.Ta)?!1:(a.m=qs(l(a.Ea,a,h),xd(a,a.D)),a.D++,!0)}n.Ea=function(a){if(this.m)if(this.m=null,this.I==1){if(!a){this.V=Math.floor(Math.random()*1e5),a=this.V++;const R=new on(this,this.j,a);let D=this.o;if(this.U&&(D?(D=Mh(D),Fh(D,this.U)):D=this.U),this.u!==null||this.R||(R.J=D,D=null),this.S)e:{for(var h=0,p=0;p<this.i.length;p++){t:{var g=this.i[p];if("__data__"in g.map&&(g=g.map.__data__,typeof g=="string")){g=g.length;break t}g=void 0}if(g===void 0)break;if(h+=g,h>4096){h=p;break e}if(h===4096||p===this.i.length-1){h=p+1;break e}}h=1e3}else h=1e3;h=Sd(this,R,h),p=bt(this.J),de(p,"RID",a),de(p,"CVER",22),this.G&&de(p,"X-HTTP-Session-Id",this.G),ti(this,p),D&&(this.R?h="headers="+zs(yd(D))+"&"+h:this.u&&Oc(p,this.u,D)),kc(this.h,R),this.Ra&&de(p,"TYPE","init"),this.S?(de(p,"$req",h),de(p,"SID","null"),R.U=!0,Pc(R,p,null)):Pc(R,p,h),this.I=2}}else this.I==3&&(a?bd(this,a):this.i.length==0||od(this.h)||bd(this))};function bd(a,h){var p;h?p=h.l:p=a.V++;const g=bt(a.J);de(g,"SID",a.M),de(g,"RID",p),de(g,"AID",a.K),ti(a,g),a.u&&a.o&&Oc(g,a.u,a.o),p=new on(a,a.j,p,a.D+1),a.u===null&&(p.J=a.o),h&&(a.i=h.G.concat(a.i)),h=Sd(a,p,1e3),p.H=Math.round(a.va*.5)+Math.round(a.va*.5*Math.random()),kc(a.h,p),Pc(p,g,h)}function ti(a,h){a.H&&po(a.H,function(p,g){de(h,g,p)}),a.l&&po({},function(p,g){de(h,g,p)})}function Sd(a,h,p){p=Math.min(a.i.length,p);const g=a.l?l(a.l.Ka,a.l,a):null;e:{var R=a.i;let Y=-1;for(;;){const Pe=["count="+p];Y==-1?p>0?(Y=R[0].g,Pe.push("ofs="+Y)):Y=0:Pe.push("ofs="+Y);let le=!0;for(let Ve=0;Ve<p;Ve++){var D=R[Ve].g;const St=R[Ve].map;if(D-=Y,D<0)Y=Math.max(0,R[Ve].g-100),le=!1;else try{D="req"+D+"_"||"";try{var F=St instanceof Map?St:Object.entries(St);for(const[Zn,ln]of F){let hn=ln;c(ln)&&(hn=Ac(ln)),Pe.push(D+Zn+"="+encodeURIComponent(hn))}}catch(Zn){throw Pe.push(D+"type="+encodeURIComponent("_badmap")),Zn}}catch{g&&g(St)}}if(le){F=Pe.join("&");break e}}F=void 0}return a=a.i.splice(0,p),h.G=a,F}function Rd(a){if(!a.g&&!a.v){a.Y=1;var h=a.Da;W||I(),Q||(W(),Q=!0),E.add(h,a),a.A=0}}function Lc(a){return a.g||a.v||a.A>=3?!1:(a.Y++,a.v=qs(l(a.Da,a),xd(a,a.A)),a.A++,!0)}n.Da=function(){if(this.v=null,Pd(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var a=4*this.T;this.j.info("BP detection timer enabled: "+a),this.B=qs(l(this.Wa,this),a)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Qe(10),Ao(this),Pd(this))};function Fc(a){a.B!=null&&(o.clearTimeout(a.B),a.B=null)}function Pd(a){a.g=new on(a,a.j,"rpc",a.Y),a.u===null&&(a.g.J=a.o),a.g.P=0;var h=bt(a.na);de(h,"RID","rpc"),de(h,"SID",a.M),de(h,"AID",a.K),de(h,"CI",a.F?"0":"1"),!a.F&&a.ia&&de(h,"TO",a.ia),de(h,"TYPE","xmlhttp"),ti(a,h),a.u&&a.o&&Oc(h,a.u,a.o),a.O&&(a.g.H=a.O);var p=a.g;a=a.ba,p.M=1,p.A=Eo(bt(h)),p.u=null,p.R=!0,nd(p,a)}n.Va=function(){this.C!=null&&(this.C=null,Ao(this),Lc(this),Qe(19))};function bo(a){a.C!=null&&(o.clearTimeout(a.C),a.C=null)}function Cd(a,h){var p=null;if(a.g==h){bo(a),Fc(a),a.g=null;var g=2}else if(Dc(a.h,h))p=h.G,cd(a.h,h),g=1;else return;if(a.I!=0){if(h.o)if(g==1){p=h.u?h.u.length:0,h=Date.now()-h.F;var R=a.D;g=_o(),We(g,new Yh(g,p)),vo(a)}else Rd(a);else if(R=h.m,R==3||R==0&&h.X>0||!(g==1&&OE(a,h)||g==2&&Lc(a)))switch(p&&p.length>0&&(h=a.h,h.i=h.i.concat(p)),R){case 1:Xn(a,5);break;case 4:Xn(a,10);break;case 3:Xn(a,6);break;default:Xn(a,2)}}}function xd(a,h){let p=a.Qa+Math.floor(Math.random()*a.Za);return a.isActive()||(p*=2),p*h}function Xn(a,h){if(a.j.info("Error code "+h),h==2){var p=l(a.bb,a),g=a.Ua;const R=!g;g=new an(g||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||Hs(g,"https"),Eo(g),R?CE(g.toString(),p):xE(g.toString(),p)}else Qe(2);a.I=0,a.l&&a.l.pa(h),Dd(a),vd(a)}n.bb=function(a){a?(this.j.info("Successfully pinged google.com"),Qe(2)):(this.j.info("Failed to ping google.com"),Qe(1))};function Dd(a){if(a.I=0,a.ja=[],a.l){const h=ud(a.h);(h.length!=0||a.i.length!=0)&&(S(a.ja,h),S(a.ja,a.i),a.h.i.length=0,y(a.i),a.i.length=0),a.l.oa()}}function kd(a,h,p){var g=p instanceof an?bt(p):new an(p);if(g.g!="")h&&(g.g=h+"."+g.g),Ws(g,g.u);else{var R=o.location;g=R.protocol,h=h?h+"."+R.hostname:R.hostname,R=+R.port;const D=new an(null);g&&Hs(D,g),h&&(D.g=h),R&&Ws(D,R),p&&(D.h=p),g=D}return p=a.G,h=a.wa,p&&h&&de(g,p,h),de(g,"VER",a.ka),ti(a,g),g}function Nd(a,h,p){if(h&&!a.L)throw Error("Can't create secondary domain capable XhrIo object.");return h=a.Aa&&!a.ma?new Ee(new Vc({ab:p})):new Ee(a.ma),h.Fa(a.L),h}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Vd(){}n=Vd.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function So(){}So.prototype.g=function(a,h){return new ut(a,h)};function ut(a,h){je.call(this),this.g=new Ad(h),this.l=a,this.h=h&&h.messageUrlParams||null,a=h&&h.messageHeaders||null,h&&h.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=h&&h.initMessageHeaders||null,h&&h.messageContentType&&(a?a["X-WebChannel-Content-Type"]=h.messageContentType:a={"X-WebChannel-Content-Type":h.messageContentType}),h&&h.sa&&(a?a["X-WebChannel-Client-Profile"]=h.sa:a={"X-WebChannel-Client-Profile":h.sa}),this.g.U=a,(a=h&&h.Qb)&&!w(a)&&(this.g.u=a),this.A=h&&h.supportsCrossDomainXhr||!1,this.v=h&&h.sendRawJson||!1,(h=h&&h.httpSessionIdParam)&&!w(h)&&(this.g.G=h,a=this.h,a!==null&&h in a&&(a=this.h,h in a&&delete a[h])),this.j=new Or(this)}f(ut,je),ut.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},ut.prototype.close=function(){Mc(this.g)},ut.prototype.o=function(a){var h=this.g;if(typeof a=="string"){var p={};p.__data__=a,a=p}else this.v&&(p={},p.__data__=Ac(a),a=p);h.i.push(new wE(h.Ya++,a)),h.I==3&&vo(h)},ut.prototype.N=function(){this.g.l=null,delete this.j,Mc(this.g),delete this.g,ut.Z.N.call(this)};function Od(a){vc.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var h=a.__sm__;if(h){e:{for(const p in h){a=p;break e}a=void 0}(this.i=a)&&(a=this.i,h=h!==null&&a in h?h[a]:void 0),this.data=h}else this.data=a}f(Od,vc);function Md(){bc.call(this),this.status=1}f(Md,bc);function Or(a){this.g=a}f(Or,Vd),Or.prototype.ra=function(){We(this.g,"a")},Or.prototype.qa=function(a){We(this.g,new Od(a))},Or.prototype.pa=function(a){We(this.g,new Md)},Or.prototype.oa=function(){We(this.g,"b")},So.prototype.createWebChannel=So.prototype.g,ut.prototype.send=ut.prototype.o,ut.prototype.open=ut.prototype.m,ut.prototype.close=ut.prototype.close,Sg=function(){return new So},bg=function(){return _o()},vg=Qn,_u={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},yo.NO_ERROR=0,yo.TIMEOUT=8,yo.HTTP_ERROR=6,zo=yo,Xh.COMPLETE="complete",Ag=Xh,Hh.EventType=js,js.OPEN="a",js.CLOSE="b",js.ERROR="c",js.MESSAGE="d",je.prototype.listen=je.prototype.J,hi=Hh,Ee.prototype.listenOnce=Ee.prototype.K,Ee.prototype.getLastError=Ee.prototype.Ha,Ee.prototype.getLastErrorCode=Ee.prototype.ya,Ee.prototype.getStatus=Ee.prototype.ca,Ee.prototype.getResponseJson=Ee.prototype.La,Ee.prototype.getResponseText=Ee.prototype.la,Ee.prototype.send=Ee.prototype.ea,Ee.prototype.setWithCredentials=Ee.prototype.Fa,Tg=Ee}).apply(typeof Do<"u"?Do:typeof self<"u"?self:typeof window<"u"?window:{});/**
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
 */class Me{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Me.UNAUTHENTICATED=new Me(null),Me.GOOGLE_CREDENTIALS=new Me("google-credentials-uid"),Me.FIRST_PARTY=new Me("first-party-uid"),Me.MOCK_USER=new Me("mock-user");/**
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
 */let Ss="12.12.0";function Ob(n){Ss=n}/**
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
 */const Dn=new Fa("@firebase/firestore");function Gr(){return Dn.logLevel}function Mb(n){Dn.setLogLevel(n)}function V(n,...e){if(Dn.logLevel<=te.DEBUG){const t=e.map(hl);Dn.debug(`Firestore (${Ss}): ${n}`,...t)}}function ve(n,...e){if(Dn.logLevel<=te.ERROR){const t=e.map(hl);Dn.error(`Firestore (${Ss}): ${n}`,...t)}}function ct(n,...e){if(Dn.logLevel<=te.WARN){const t=e.map(hl);Dn.warn(`Firestore (${Ss}): ${n}`,...t)}}function hl(n){if(typeof n=="string")return n;try{return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
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
 */function j(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,Rg(n,r,t)}function Rg(n,e,t){let r=`FIRESTORE (${Ss}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw ve(r),new Error(r)}function q(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||Rg(e,s,r)}function Lb(n,e){n||j(57014,e)}function L(n,e){return n}/**
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
 */const P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class N extends vt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class Fe{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
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
 */class Pg{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Cg{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Me.UNAUTHENTICATED))}shutdown(){}}class Fb{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class Ub{constructor(e){this.t=e,this.currentUser=Me.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){q(this.o===void 0,42304);let r=this.i;const s=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve();let i=new Fe;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Fe,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const u=i;e.enqueueRetryable(async()=>{await u.promise,await s(this.currentUser)})},c=u=>{V("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(u=>c(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(V("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Fe)}},0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(V("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(q(typeof r.accessToken=="string",31837,{l:r}),new Pg(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return q(e===null||typeof e=="string",2055,{h:e}),new Me(e)}}class Bb{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=Me.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class jb{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new Bb(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(Me.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class yu{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Gb{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Xe(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){q(this.o===void 0,3512);const r=i=>{i.error!=null&&V("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.m;return this.m=i.token,V("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{V("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):V("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new yu(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(q(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new yu(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}class qb{getToken(){return Promise.resolve(new yu(""))}invalidateToken(){}start(e,t){}shutdown(){}}/**
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
 */function $b(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
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
 */class qa{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=$b(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function H(n,e){return n<e?-1:n>e?1:0}function Iu(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const s=n.charAt(r),i=e.charAt(r);if(s!==i)return Qc(s)===Qc(i)?H(s,i):Qc(s)?1:-1}return H(n.length,e.length)}const zb=55296,Kb=57343;function Qc(n){const e=n.charCodeAt(0);return e>=zb&&e<=Kb}function ns(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}function xg(n){return n+"\0"}/**
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
 */const Eu="__name__";class Rt{constructor(e,t,r){t===void 0?t=0:t>e.length&&j(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&j(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return Rt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Rt?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=Rt.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return H(e.length,t.length)}static compareSegments(e,t){const r=Rt.isNumericId(e),s=Rt.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?Rt.extractNumericId(e).compare(Rt.extractNumericId(t)):Iu(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Pn.fromString(e.substring(4,e.length-2))}}class Z extends Rt{construct(e,t,r){return new Z(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new N(P.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new Z(t)}static emptyPath(){return new Z([])}}const Hb=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class pe extends Rt{construct(e,t,r){return new pe(e,t,r)}static isValidIdentifier(e){return Hb.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),pe.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Eu}static keyField(){return new pe([Eu])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new N(P.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let o=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new N(P.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new N(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else c==="`"?(o=!o,s++):c!=="."||o?(r+=c,s++):(i(),s++)}if(i(),o)throw new N(P.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new pe(t)}static emptyPath(){return new pe([])}}/**
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
 */class M{constructor(e){this.path=e}static fromPath(e){return new M(Z.fromString(e))}static fromName(e){return new M(Z.fromString(e).popFirst(5))}static empty(){return new M(Z.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Z.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Z.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new M(new Z(e.slice()))}}/**
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
 */function dl(n,e,t){if(!t)throw new N(P.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function Dg(n,e,t,r){if(e===!0&&r===!0)throw new N(P.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Ef(n){if(!M.isDocumentKey(n))throw new N(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function wf(n){if(M.isDocumentKey(n))throw new N(P.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function kg(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function $a(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":j(12329,{type:typeof n})}function ee(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new N(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=$a(n);throw new N(P.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function Ng(n,e){if(e<=0)throw new N(P.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
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
 */function Re(n,e){const t={typeString:n};return e&&(t.value=e),t}function br(n,e){if(!kg(n))throw new N(P.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const o=n[r];if(s&&typeof o!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&o!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new N(P.INVALID_ARGUMENT,t);return!0}/**
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
 */const Tf=-62135596800,Af=1e6;class ie{static now(){return ie.fromMillis(Date.now())}static fromDate(e){return ie.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*Af);return new ie(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new N(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new N(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Tf)throw new N(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new N(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Af}_compareTo(e){return this.seconds===e.seconds?H(this.nanoseconds,e.nanoseconds):H(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ie._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(br(e,ie._jsonSchema))return new ie(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Tf;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ie._jsonSchemaVersion="firestore/timestamp/1.0",ie._jsonSchema={type:Re("string",ie._jsonSchemaVersion),seconds:Re("number"),nanoseconds:Re("number")};/**
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
 */const rs=-1;class ss{constructor(e,t,r,s){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=s}}function wu(n){return n.fields.find(e=>e.kind===2)}function nr(n){return n.fields.filter(e=>e.kind!==2)}function Wb(n,e){let t=H(n.collectionGroup,e.collectionGroup);if(t!==0)return t;for(let r=0;r<Math.min(n.fields.length,e.fields.length);++r)if(t=Qb(n.fields[r],e.fields[r]),t!==0)return t;return H(n.fields.length,e.fields.length)}ss.UNKNOWN_ID=-1;class ur{constructor(e,t){this.fieldPath=e,this.kind=t}}function Qb(n,e){const t=pe.comparator(n.fieldPath,e.fieldPath);return t!==0?t:H(n.kind,e.kind)}class is{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new is(0,pt.min())}}function Vg(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=$.fromTimestamp(r===1e9?new ie(t+1,0):new ie(t,r));return new pt(s,M.empty(),e)}function Og(n){return new pt(n.readTime,n.key,rs)}class pt{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new pt($.min(),M.empty(),rs)}static max(){return new pt($.max(),M.empty(),rs)}}function fl(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=M.comparator(n.documentKey,e.documentKey),t!==0?t:H(n.largestBatchId,e.largestBatchId))}/**
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
 */const Mg="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Lg{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function Bn(n){if(n.code!==P.FAILED_PRECONDITION||n.message!==Mg)throw n;V("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class b{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&j(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new b((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof b?t:b.resolve(t)}catch(t){return b.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):b.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):b.reject(t)}static resolve(e){return new b((t,r)=>{t(e)})}static reject(e){return new b((t,r)=>{r(e)})}static waitFor(e){return new b((t,r)=>{let s=0,i=0,o=!1;e.forEach(c=>{++s,c.next(()=>{++i,o&&i===s&&t()},u=>r(u))}),o=!0,i===s&&t()})}static or(e){let t=b.resolve(!1);for(const r of e)t=t.next(s=>s?b.resolve(s):r());return t}static forEach(e,t){const r=[];return e.forEach((s,i)=>{r.push(t.call(this,s,i))}),this.waitFor(r)}static mapArray(e,t){return new b((r,s)=>{const i=e.length,o=new Array(i);let c=0;for(let u=0;u<i;u++){const l=u;t(e[l]).next(d=>{o[l]=d,++c,c===i&&r(o)},d=>s(d))}})}static doWhile(e,t){return new b((r,s)=>{const i=()=>{e()===!0?t().next(()=>{i()},s):r()};i()})}}/**
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
 */const lt="SimpleDb";class za{static open(e,t,r,s){try{return new za(t,e.transaction(s,r))}catch(i){throw new gi(t,i)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.S=new Fe,this.transaction.oncomplete=()=>{this.S.resolve()},this.transaction.onabort=()=>{t.error?this.S.reject(new gi(e,t.error)):this.S.resolve()},this.transaction.onerror=r=>{const s=pl(r.target.error);this.S.reject(new gi(e,s))}}get D(){return this.S.promise}abort(e){e&&this.S.reject(e),this.aborted||(V(lt,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}C(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new Yb(t)}}class Ot{static delete(e){return V(lt,"Removing database:",e),sr(Qu().indexedDB.deleteDatabase(e)).toPromise()}static v(){if(!La())return!1;if(Ot.F())return!0;const e=De(),t=Ot.M(e),r=0<t&&t<10,s=Fg(e),i=0<s&&s<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||r||i)}static F(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)==null?void 0:e.__PRIVATE_USE_MOCK_PERSISTENCE)==="YES"}static O(e,t){return e.store(t)}static M(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),r=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(r)}constructor(e,t,r){this.name=e,this.version=t,this.N=r,this.B=null,Ot.M(De())===12.2&&ve("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async L(e){return this.db||(V(lt,"Opening database:",this.name),this.db=await new Promise((t,r)=>{const s=indexedDB.open(this.name,this.version);s.onsuccess=i=>{const o=i.target.result;t(o)},s.onblocked=()=>{r(new gi(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},s.onerror=i=>{const o=i.target.error;o.name==="VersionError"?r(new N(P.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?r(new N(P.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):r(new gi(e,o))},s.onupgradeneeded=i=>{V(lt,'Database "'+this.name+'" requires upgrade from version:',i.oldVersion);const o=i.target.result;this.N.k(o,s.transaction,i.oldVersion,this.version).next(()=>{V(lt,"Database upgrade to version "+this.version+" complete")})}})),this.q&&(this.db.onversionchange=t=>this.q(t)),this.db}K(e){this.q=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,r,s){const i=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.L(e);const c=za.open(this.db,e,i?"readonly":"readwrite",r),u=s(c).next(l=>(c.C(),l)).catch(l=>(c.abort(l),b.reject(l))).toPromise();return u.catch(()=>{}),await c.D,u}catch(c){const u=c,l=u.name!=="FirebaseError"&&o<3;if(V(lt,"Transaction failed with error:",u.message,"Retrying:",l),this.close(),!l)return Promise.reject(u)}}}close(){this.db&&this.db.close(),this.db=void 0}}function Fg(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class Jb{constructor(e){this.U=e,this.$=!1,this.W=null}get isDone(){return this.$}get G(){return this.W}set cursor(e){this.U=e}done(){this.$=!0}j(e){this.W=e}delete(){return sr(this.U.delete())}}class gi extends N{constructor(e,t){super(P.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function jn(n){return n.name==="IndexedDbTransactionError"}class Yb{constructor(e){this.store=e}put(e,t){let r;return t!==void 0?(V(lt,"PUT",this.store.name,e,t),r=this.store.put(t,e)):(V(lt,"PUT",this.store.name,"<auto-key>",e),r=this.store.put(e)),sr(r)}add(e){return V(lt,"ADD",this.store.name,e,e),sr(this.store.add(e))}get(e){return sr(this.store.get(e)).next(t=>(t===void 0&&(t=null),V(lt,"GET",this.store.name,e,t),t))}delete(e){return V(lt,"DELETE",this.store.name,e),sr(this.store.delete(e))}count(){return V(lt,"COUNT",this.store.name),sr(this.store.count())}J(e,t){const r=this.options(e,t),s=r.index?this.store.index(r.index):this.store;if(typeof s.getAll=="function"){const i=s.getAll(r.range);return new b((o,c)=>{i.onerror=u=>{c(u.target.error)},i.onsuccess=u=>{o(u.target.result)}})}{const i=this.cursor(r),o=[];return this.H(i,(c,u)=>{o.push(u)}).next(()=>o)}}Z(e,t){const r=this.store.getAll(e,t===null?void 0:t);return new b((s,i)=>{r.onerror=o=>{i(o.target.error)},r.onsuccess=o=>{s(o.target.result)}})}X(e,t){V(lt,"DELETE ALL",this.store.name);const r=this.options(e,t);r.Y=!1;const s=this.cursor(r);return this.H(s,(i,o,c)=>c.delete())}ee(e,t){let r;t?r=e:(r={},t=e);const s=this.cursor(r);return this.H(s,t)}te(e){const t=this.cursor({});return new b((r,s)=>{t.onerror=i=>{const o=pl(i.target.error);s(o)},t.onsuccess=i=>{const o=i.target.result;o?e(o.primaryKey,o.value).next(c=>{c?o.continue():r()}):r()}})}H(e,t){const r=[];return new b((s,i)=>{e.onerror=o=>{i(o.target.error)},e.onsuccess=o=>{const c=o.target.result;if(!c)return void s();const u=new Jb(c),l=t(c.primaryKey,c.value,u);if(l instanceof b){const d=l.catch(f=>(u.done(),b.reject(f)));r.push(d)}u.isDone?s():u.G===null?c.continue():c.continue(u.G)}}).next(()=>b.waitFor(r))}options(e,t){let r;return e!==void 0&&(typeof e=="string"?r=e:t=e),{index:r,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const r=this.store.index(e.index);return e.Y?r.openKeyCursor(e.range,t):r.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function sr(n){return new b((e,t)=>{n.onsuccess=r=>{const s=r.target.result;e(s)},n.onerror=r=>{const s=pl(r.target.error);t(s)}})}let vf=!1;function pl(n){const e=Ot.M(De());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(n.message.indexOf(t)>=0){const r=new N("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return vf||(vf=!0,setTimeout(()=>{throw r},0)),r}}return n}const _i="IndexBackfiller";class Xb{constructor(e,t){this.asyncQueue=e,this.ne=t,this.task=null}start(){this.re(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}re(e){V(_i,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{const t=await this.ne.ie();V(_i,`Documents written: ${t}`)}catch(t){jn(t)?V(_i,"Ignoring IndexedDB error during index backfill: ",t):await Bn(t)}await this.re(6e4)})}}class Zb{constructor(e,t){this.localStore=e,this.persistence=t}async ie(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.se(t,e))}se(e,t){const r=new Set;let s=t,i=!0;return b.doWhile(()=>i===!0&&s>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(o=>{if(o!==null&&!r.has(o))return V(_i,`Processing collection: ${o}`),this.oe(e,o,s).next(c=>{s-=c,r.add(o)});i=!1})).next(()=>t-s)}oe(e,t,r){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(s=>this.localStore.localDocuments.getNextDocuments(e,t,s,r).next(i=>{const o=i.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next(()=>this._e(s,i)).next(c=>(V(_i,`Updating offset: ${c}`),this.localStore.indexManager.updateCollectionGroup(e,t,c))).next(()=>o.size)}))}_e(e,t){let r=e;return t.changes.forEach((s,i)=>{const o=Og(i);fl(o,r)>0&&(r=o)}),new pt(r.readTime,r.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
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
 */const Cn=-1;function Yi(n){return n==null}function ki(n){return n===0&&1/n==-1/0}function Ug(n){return typeof n=="number"&&Number.isInteger(n)&&!ki(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
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
 */const fa="";function ze(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=bf(e)),e=eS(n.get(t),e);return bf(e)}function eS(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case fa:t+="";break;default:t+=i}}return t}function bf(n){return n+fa+""}function Ct(n){const e=n.length;if(q(e>=2,64408,{path:n}),e===2)return q(n.charAt(0)===fa&&n.charAt(1)==="",56145,{path:n}),Z.emptyPath();const t=e-2,r=[];let s="";for(let i=0;i<e;){const o=n.indexOf(fa,i);switch((o<0||o>t)&&j(50515,{path:n}),n.charAt(o+1)){case"":const c=n.substring(i,o);let u;s.length===0?u=c:(s+=c,u=s,s=""),r.push(u);break;case"":s+=n.substring(i,o),s+="\0";break;case"":s+=n.substring(i,o+1);break;default:j(61167,{path:n})}i=o+2}return new Z(r)}/**
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
 */const rr="remoteDocuments",Xi="owner",Mr="owner",Ni="mutationQueues",tS="userId",gt="mutations",Sf="batchId",cr="userMutationsIndex",Rf=["userId","batchId"];/**
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
 */function Ko(n,e){return[n,ze(e)]}function Bg(n,e,t){return[n,ze(e),t]}const nS={},os="documentMutations",pa="remoteDocumentsV14",rS=["prefixPath","collectionGroup","readTime","documentId"],Ho="documentKeyIndex",sS=["prefixPath","collectionGroup","documentId"],jg="collectionGroupIndex",iS=["collectionGroup","readTime","prefixPath","documentId"],Vi="remoteDocumentGlobal",Tu="remoteDocumentGlobalKey",as="targets",Gg="queryTargetsIndex",oS=["canonicalId","targetId"],cs="targetDocuments",aS=["targetId","path"],ml="documentTargetsIndex",cS=["path","targetId"],ma="targetGlobalKey",lr="targetGlobal",Oi="collectionParents",uS=["collectionId","parent"],us="clientMetadata",lS="clientId",Ka="bundles",hS="bundleId",Ha="namedQueries",dS="name",gl="indexConfiguration",fS="indexId",Au="collectionGroupIndex",pS="collectionGroup",yi="indexState",mS=["indexId","uid"],qg="sequenceNumberIndex",gS=["uid","sequenceNumber"],Ii="indexEntries",_S=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],$g="documentKeyIndex",yS=["indexId","uid","orderedDocumentKey"],Wa="documentOverlays",IS=["userId","collectionPath","documentId"],vu="collectionPathOverlayIndex",ES=["userId","collectionPath","largestBatchId"],zg="collectionGroupOverlayIndex",wS=["userId","collectionGroup","largestBatchId"],_l="globals",TS="name",Kg=[Ni,gt,os,rr,as,Xi,lr,cs,us,Vi,Oi,Ka,Ha],AS=[...Kg,Wa],Hg=[Ni,gt,os,pa,as,Xi,lr,cs,us,Vi,Oi,Ka,Ha,Wa],Wg=Hg,yl=[...Wg,gl,yi,Ii],vS=yl,Qg=[...yl,_l],bS=Qg;/**
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
 */class bu extends Lg{constructor(e,t){super(),this.le=e,this.currentSequenceNumber=t}}function Ne(n,e){const t=L(n);return Ot.O(t.le,e)}/**
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
 */function Pf(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Gn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Jg(n,e){const t=[];for(const r in n)Object.prototype.hasOwnProperty.call(n,r)&&t.push(e(n[r],r,n));return t}function Yg(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
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
 */class he{constructor(e,t){this.comparator=e,this.root=t||Be.EMPTY}insert(e,t){return new he(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Be.BLACK,null,null))}remove(e){return new he(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Be.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new ko(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new ko(this.root,e,this.comparator,!1)}getReverseIterator(){return new ko(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new ko(this.root,e,this.comparator,!0)}}class ko{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Be{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??Be.RED,this.left=s??Be.EMPTY,this.right=i??Be.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new Be(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Be.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return Be.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Be.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Be.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw j(43730,{key:this.key,value:this.value});if(this.right.isRed())throw j(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw j(27949);return e+(this.isRed()?0:1)}}Be.EMPTY=null,Be.RED=!0,Be.BLACK=!1;Be.EMPTY=new class{constructor(){this.size=0}get key(){throw j(57766)}get value(){throw j(16141)}get color(){throw j(16727)}get left(){throw j(29726)}get right(){throw j(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new Be(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class ce{constructor(e){this.comparator=e,this.data=new he(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Cf(this.data.getIterator())}getIteratorFrom(e){return new Cf(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof ce)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new ce(this.comparator);return t.data=e,t}}class Cf{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function Lr(n){return n.hasNext()?n.getNext():void 0}/**
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
 */class rt{constructor(e){this.fields=e,e.sort(pe.comparator)}static empty(){return new rt([])}unionWith(e){let t=new ce(pe.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new rt(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return ns(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
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
 */class Xg extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */function SS(){return typeof atob<"u"}/**
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
 */class Ie{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Xg("Invalid base64 string: "+i):i}}(e);return new Ie(t)}static fromUint8Array(e){const t=function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i}(e);return new Ie(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return H(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Ie.EMPTY_BYTE_STRING=new Ie("");const RS=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Wt(n){if(q(!!n,39018),typeof n=="string"){let e=0;const t=RS.exec(n);if(q(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:me(n.seconds),nanos:me(n.nanos)}}function me(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Qt(n){return typeof n=="string"?Ie.fromBase64String(n):Ie.fromUint8Array(n)}/**
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
 */const Zg="server_timestamp",e_="__type__",t_="__previous_value__",n_="__local_write_time__";function Qa(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[e_])==null?void 0:r.stringValue)===Zg}function Ja(n){const e=n.mapValue.fields[t_];return Qa(e)?Ja(e):e}function Mi(n){const e=Wt(n.mapValue.fields[n_].timestampValue);return new ie(e.seconds,e.nanos)}/**
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
 */class PS{constructor(e,t,r,s,i,o,c,u,l,d,f){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=l,this.isUsingEmulator=d,this.apiKey=f}}const Li="(default)";class kn{constructor(e,t){this.projectId=e,this.database=t||Li}static empty(){return new kn("","")}get isDefaultDatabase(){return this.database===Li}isEqual(e){return e instanceof kn&&e.projectId===this.projectId&&e.database===this.database}}function CS(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new N(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new kn(n.options.projectId,e)}/**
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
 */const Il="__type__",r_="__max__",vn={mapValue:{fields:{__type__:{stringValue:r_}}}},El="__vector__",ls="value",Wo={nullValue:"NULL_VALUE"};function Nn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Qa(n)?4:s_(n)?9007199254740991:Ya(n)?10:11:j(28295,{value:n})}function Ft(n,e){if(n===e)return!0;const t=Nn(n);if(t!==Nn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Mi(n).isEqual(Mi(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=Wt(s.timestampValue),c=Wt(i.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(s,i){return Qt(s.bytesValue).isEqual(Qt(i.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(s,i){return me(s.geoPointValue.latitude)===me(i.geoPointValue.latitude)&&me(s.geoPointValue.longitude)===me(i.geoPointValue.longitude)}(n,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return me(s.integerValue)===me(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=me(s.doubleValue),c=me(i.doubleValue);return o===c?ki(o)===ki(c):isNaN(o)&&isNaN(c)}return!1}(n,e);case 9:return ns(n.arrayValue.values||[],e.arrayValue.values||[],Ft);case 10:case 11:return function(s,i){const o=s.mapValue.fields||{},c=i.mapValue.fields||{};if(Pf(o)!==Pf(c))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(c[u]===void 0||!Ft(o[u],c[u])))return!1;return!0}(n,e);default:return j(52216,{left:n})}}function Fi(n,e){return(n.values||[]).find(t=>Ft(t,e))!==void 0}function Vn(n,e){if(n===e)return 0;const t=Nn(n),r=Nn(e);if(t!==r)return H(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return H(n.booleanValue,e.booleanValue);case 2:return function(i,o){const c=me(i.integerValue||i.doubleValue),u=me(o.integerValue||o.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1}(n,e);case 3:return xf(n.timestampValue,e.timestampValue);case 4:return xf(Mi(n),Mi(e));case 5:return Iu(n.stringValue,e.stringValue);case 6:return function(i,o){const c=Qt(i),u=Qt(o);return c.compareTo(u)}(n.bytesValue,e.bytesValue);case 7:return function(i,o){const c=i.split("/"),u=o.split("/");for(let l=0;l<c.length&&l<u.length;l++){const d=H(c[l],u[l]);if(d!==0)return d}return H(c.length,u.length)}(n.referenceValue,e.referenceValue);case 8:return function(i,o){const c=H(me(i.latitude),me(o.latitude));return c!==0?c:H(me(i.longitude),me(o.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Df(n.arrayValue,e.arrayValue);case 10:return function(i,o){var m,y,S,x;const c=i.fields||{},u=o.fields||{},l=(m=c[ls])==null?void 0:m.arrayValue,d=(y=u[ls])==null?void 0:y.arrayValue,f=H(((S=l==null?void 0:l.values)==null?void 0:S.length)||0,((x=d==null?void 0:d.values)==null?void 0:x.length)||0);return f!==0?f:Df(l,d)}(n.mapValue,e.mapValue);case 11:return function(i,o){if(i===vn.mapValue&&o===vn.mapValue)return 0;if(i===vn.mapValue)return 1;if(o===vn.mapValue)return-1;const c=i.fields||{},u=Object.keys(c),l=o.fields||{},d=Object.keys(l);u.sort(),d.sort();for(let f=0;f<u.length&&f<d.length;++f){const m=Iu(u[f],d[f]);if(m!==0)return m;const y=Vn(c[u[f]],l[d[f]]);if(y!==0)return y}return H(u.length,d.length)}(n.mapValue,e.mapValue);default:throw j(23264,{he:t})}}function xf(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return H(n,e);const t=Wt(n),r=Wt(e),s=H(t.seconds,r.seconds);return s!==0?s:H(t.nanos,r.nanos)}function Df(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=Vn(t[s],r[s]);if(i)return i}return H(t.length,r.length)}function hs(n){return Su(n)}function Su(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=Wt(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Qt(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return M.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=Su(i);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${Su(t.fields[o])}`;return s+"}"}(n.mapValue):j(61005,{value:n})}function Qo(n){switch(Nn(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Ja(n);return e?16+Qo(e):16;case 5:return 2*n.stringValue.length;case 6:return Qt(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,i)=>s+Qo(i),0)}(n.arrayValue);case 10:case 11:return function(r){let s=0;return Gn(r.fields,(i,o)=>{s+=i.length+Qo(o)}),s}(n.mapValue);default:throw j(13486,{value:n})}}function pr(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function Ru(n){return!!n&&"integerValue"in n}function Ui(n){return!!n&&"arrayValue"in n}function kf(n){return!!n&&"nullValue"in n}function Nf(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Jo(n){return!!n&&"mapValue"in n}function Ya(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[Il])==null?void 0:r.stringValue)===El}function Ei(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return Gn(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=Ei(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Ei(n.arrayValue.values[t]);return e}return{...n}}function s_(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===r_}const i_={mapValue:{fields:{[Il]:{stringValue:El},[ls]:{arrayValue:{}}}}};function xS(n){return"nullValue"in n?Wo:"booleanValue"in n?{booleanValue:!1}:"integerValue"in n||"doubleValue"in n?{doubleValue:NaN}:"timestampValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in n?{stringValue:""}:"bytesValue"in n?{bytesValue:""}:"referenceValue"in n?pr(kn.empty(),M.empty()):"geoPointValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in n?{arrayValue:{}}:"mapValue"in n?Ya(n)?i_:{mapValue:{}}:j(35942,{value:n})}function DS(n){return"nullValue"in n?{booleanValue:!1}:"booleanValue"in n?{doubleValue:NaN}:"integerValue"in n||"doubleValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in n?{stringValue:""}:"stringValue"in n?{bytesValue:""}:"bytesValue"in n?pr(kn.empty(),M.empty()):"referenceValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in n?{arrayValue:{}}:"arrayValue"in n?i_:"mapValue"in n?Ya(n)?{mapValue:{}}:vn:j(61959,{value:n})}function Vf(n,e){const t=Vn(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?-1:!n.inclusive&&e.inclusive?1:0}function Of(n,e){const t=Vn(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?1:!n.inclusive&&e.inclusive?-1:0}/**
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
 */class Le{constructor(e){this.value=e}static empty(){return new Le({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Jo(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Ei(t)}setAll(e){let t=pe.emptyPath(),r={},s=[];e.forEach((o,c)=>{if(!t.isImmediateParentOf(c)){const u=this.getFieldsMap(t);this.applyChanges(u,r,s),r={},s=[],t=c.popLast()}o?r[c.lastSegment()]=Ei(o):s.push(c.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());Jo(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Ft(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];Jo(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){Gn(t,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new Le(Ei(this.value))}}function o_(n){const e=[];return Gn(n.fields,(t,r)=>{const s=new pe([t]);if(Jo(r)){const i=o_(r.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)}),new rt(e)}/**
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
 */class fe{constructor(e,t,r,s,i,o,c){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=c}static newInvalidDocument(e){return new fe(e,0,$.min(),$.min(),$.min(),Le.empty(),0)}static newFoundDocument(e,t,r,s){return new fe(e,1,t,$.min(),r,s,0)}static newNoDocument(e,t){return new fe(e,2,t,$.min(),$.min(),Le.empty(),0)}static newUnknownDocument(e,t){return new fe(e,3,t,$.min(),$.min(),Le.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual($.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Le.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Le.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=$.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof fe&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new fe(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class On{constructor(e,t){this.position=e,this.inclusive=t}}function Mf(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],o=n.position[s];if(i.field.isKeyField()?r=M.comparator(M.fromName(o.referenceValue),t.key):r=Vn(o,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Lf(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Ft(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class Bi{constructor(e,t="asc"){this.field=e,this.dir=t}}function kS(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class a_{}class ne extends a_{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new NS(e,t,r):t==="array-contains"?new MS(e,r):t==="in"?new f_(e,r):t==="not-in"?new LS(e,r):t==="array-contains-any"?new FS(e,r):new ne(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new VS(e,r):new OS(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Vn(t,this.value)):t!==null&&Nn(this.value)===Nn(t)&&this.matchesComparison(Vn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return j(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class oe extends a_{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new oe(e,t)}matches(e){return ds(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function ds(n){return n.op==="and"}function Pu(n){return n.op==="or"}function wl(n){return c_(n)&&ds(n)}function c_(n){for(const e of n.filters)if(e instanceof oe)return!1;return!0}function Cu(n){if(n instanceof ne)return n.field.canonicalString()+n.op.toString()+hs(n.value);if(wl(n))return n.filters.map(e=>Cu(e)).join(",");{const e=n.filters.map(t=>Cu(t)).join(",");return`${n.op}(${e})`}}function u_(n,e){return n instanceof ne?function(r,s){return s instanceof ne&&r.op===s.op&&r.field.isEqual(s.field)&&Ft(r.value,s.value)}(n,e):n instanceof oe?function(r,s){return s instanceof oe&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,o,c)=>i&&u_(o,s.filters[c]),!0):!1}(n,e):void j(19439)}function l_(n,e){const t=n.filters.concat(e);return oe.create(t,n.op)}function h_(n){return n instanceof ne?function(t){return`${t.field.canonicalString()} ${t.op} ${hs(t.value)}`}(n):n instanceof oe?function(t){return t.op.toString()+" {"+t.getFilters().map(h_).join(" ,")+"}"}(n):"Filter"}class NS extends ne{constructor(e,t,r){super(e,t,r),this.key=M.fromName(r.referenceValue)}matches(e){const t=M.comparator(e.key,this.key);return this.matchesComparison(t)}}class VS extends ne{constructor(e,t){super(e,"in",t),this.keys=d_("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class OS extends ne{constructor(e,t){super(e,"not-in",t),this.keys=d_("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function d_(n,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map(r=>M.fromName(r.referenceValue))}class MS extends ne{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Ui(t)&&Fi(t.arrayValue,this.value)}}class f_ extends ne{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Fi(this.value.arrayValue,t)}}class LS extends ne{constructor(e,t){super(e,"not-in",t)}matches(e){if(Fi(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Fi(this.value.arrayValue,t)}}class FS extends ne{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Ui(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>Fi(this.value.arrayValue,r))}}/**
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
 */class US{constructor(e,t=null,r=[],s=[],i=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=c,this.Te=null}}function xu(n,e=null,t=[],r=[],s=null,i=null,o=null){return new US(n,e,t,r,s,i,o)}function mr(n){const e=L(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>Cu(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),Yi(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>hs(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>hs(r)).join(",")),e.Te=t}return e.Te}function Zi(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!kS(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!u_(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Lf(n.startAt,e.startAt)&&Lf(n.endAt,e.endAt)}function ga(n){return M.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function _a(n,e){return n.filters.filter(t=>t instanceof ne&&t.field.isEqual(e))}function Ff(n,e,t){let r=Wo,s=!0;for(const i of _a(n,e)){let o=Wo,c=!0;switch(i.op){case"<":case"<=":o=xS(i.value);break;case"==":case"in":case">=":o=i.value;break;case">":o=i.value,c=!1;break;case"!=":case"not-in":o=Wo}Vf({value:r,inclusive:s},{value:o,inclusive:c})<0&&(r=o,s=c)}if(t!==null){for(let i=0;i<n.orderBy.length;++i)if(n.orderBy[i].field.isEqual(e)){const o=t.position[i];Vf({value:r,inclusive:s},{value:o,inclusive:t.inclusive})<0&&(r=o,s=t.inclusive);break}}return{value:r,inclusive:s}}function Uf(n,e,t){let r=vn,s=!0;for(const i of _a(n,e)){let o=vn,c=!0;switch(i.op){case">=":case">":o=DS(i.value),c=!1;break;case"==":case"in":case"<=":o=i.value;break;case"<":o=i.value,c=!1;break;case"!=":case"not-in":o=vn}Of({value:r,inclusive:s},{value:o,inclusive:c})>0&&(r=o,s=c)}if(t!==null){for(let i=0;i<n.orderBy.length;++i)if(n.orderBy[i].field.isEqual(e)){const o=t.position[i];Of({value:r,inclusive:s},{value:o,inclusive:t.inclusive})>0&&(r=o,s=t.inclusive);break}}return{value:r,inclusive:s}}/**
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
 */class tn{constructor(e,t=null,r=[],s=[],i=null,o="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=c,this.endAt=u,this.Ee=null,this.Ie=null,this.Re=null,this.startAt,this.endAt}}function p_(n,e,t,r,s,i,o,c){return new tn(n,e,t,r,s,i,o,c)}function Rs(n){return new tn(n)}function Bf(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function BS(n){return M.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function Tl(n){return n.collectionGroup!==null}function Yr(n){const e=L(n);if(e.Ee===null){e.Ee=[];const t=new Set;for(const i of e.explicitOrderBy)e.Ee.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new ce(pe.comparator);return o.filters.forEach(u=>{u.getFlattenedFilters().forEach(l=>{l.isInequality()&&(c=c.add(l.field))})}),c})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.Ee.push(new Bi(i,r))}),t.has(pe.keyField().canonicalString())||e.Ee.push(new Bi(pe.keyField(),r))}return e.Ee}function Ke(n){const e=L(n);return e.Ie||(e.Ie=g_(e,Yr(n))),e.Ie}function m_(n){const e=L(n);return e.Re||(e.Re=g_(e,n.explicitOrderBy)),e.Re}function g_(n,e){if(n.limitType==="F")return xu(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new Bi(s.field,i)});const t=n.endAt?new On(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new On(n.startAt.position,n.startAt.inclusive):null;return xu(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function Du(n,e){const t=n.filters.concat([e]);return new tn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function jS(n,e){const t=n.explicitOrderBy.concat([e]);return new tn(n.path,n.collectionGroup,t,n.filters.slice(),n.limit,n.limitType,n.startAt,n.endAt)}function ya(n,e,t){return new tn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function GS(n,e){return new tn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),n.limit,n.limitType,e,n.endAt)}function qS(n,e){return new tn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),n.limit,n.limitType,n.startAt,e)}function eo(n,e){return Zi(Ke(n),Ke(e))&&n.limitType===e.limitType}function __(n){return`${mr(Ke(n))}|lt:${n.limitType}`}function qr(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(s=>h_(s)).join(", ")}]`),Yi(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(s=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(s)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(s=>hs(s)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(s=>hs(s)).join(",")),`Target(${r})`}(Ke(n))}; limitType=${n.limitType})`}function to(n,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):M.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(n,e)&&function(r,s){for(const i of Yr(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(n,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(n,e)&&function(r,s){return!(r.startAt&&!function(o,c,u){const l=Mf(o,c,u);return o.inclusive?l<=0:l<0}(r.startAt,Yr(r),s)||r.endAt&&!function(o,c,u){const l=Mf(o,c,u);return o.inclusive?l>=0:l>0}(r.endAt,Yr(r),s))}(n,e)}function y_(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function I_(n){return(e,t)=>{let r=!1;for(const s of Yr(n)){const i=$S(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function $S(n,e,t){const r=n.field.isKeyField()?M.comparator(e.key,t.key):function(i,o,c){const u=o.data.field(i),l=c.data.field(i);return u!==null&&l!==null?Vn(u,l):j(42886)}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return j(19790,{direction:n.dir})}}/**
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
 */class nn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Gn(this.inner,(t,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return Yg(this.inner)}size(){return this.innerSize}}/**
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
 */const zS=new he(M.comparator);function st(){return zS}const E_=new he(M.comparator);function di(...n){let e=E_;for(const t of n)e=e.insert(t.key,t);return e}function w_(n){let e=E_;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function xt(){return wi()}function T_(){return wi()}function wi(){return new nn(n=>n.toString(),(n,e)=>n.isEqual(e))}const KS=new he(M.comparator),HS=new ce(M.comparator);function J(...n){let e=HS;for(const t of n)e=e.add(t);return e}const WS=new ce(H);function Al(){return WS}/**
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
 */function vl(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ki(e)?"-0":e}}function A_(n){return{integerValue:""+n}}function v_(n,e){return Ug(e)?A_(e):vl(n,e)}/**
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
 */class Xa{constructor(){this._=void 0}}function QS(n,e,t){return n instanceof fs?function(s,i){const o={fields:{[e_]:{stringValue:Zg},[n_]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Qa(i)&&(i=Ja(i)),i&&(o.fields[t_]=i),{mapValue:o}}(t,e):n instanceof gr?S_(n,e):n instanceof _r?R_(n,e):function(s,i){const o=b_(s,i),c=jf(o)+jf(s.Ae);return Ru(o)&&Ru(s.Ae)?A_(c):vl(s.serializer,c)}(n,e)}function JS(n,e,t){return n instanceof gr?S_(n,e):n instanceof _r?R_(n,e):t}function b_(n,e){return n instanceof ps?function(r){return Ru(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class fs extends Xa{}class gr extends Xa{constructor(e){super(),this.elements=e}}function S_(n,e){const t=P_(e);for(const r of n.elements)t.some(s=>Ft(s,r))||t.push(r);return{arrayValue:{values:t}}}class _r extends Xa{constructor(e){super(),this.elements=e}}function R_(n,e){let t=P_(e);for(const r of n.elements)t=t.filter(s=>!Ft(s,r));return{arrayValue:{values:t}}}class ps extends Xa{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function jf(n){return me(n.integerValue||n.doubleValue)}function P_(n){return Ui(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
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
 */class no{constructor(e,t){this.field=e,this.transform=t}}function YS(n,e){return n.field.isEqual(e.field)&&function(r,s){return r instanceof gr&&s instanceof gr||r instanceof _r&&s instanceof _r?ns(r.elements,s.elements,Ft):r instanceof ps&&s instanceof ps?Ft(r.Ae,s.Ae):r instanceof fs&&s instanceof fs}(n.transform,e.transform)}class XS{constructor(e,t){this.version=e,this.transformResults=t}}class ge{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new ge}static exists(e){return new ge(void 0,e)}static updateTime(e){return new ge(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Yo(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Za{}function C_(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Cs(n.key,ge.none()):new Ps(n.key,n.data,ge.none());{const t=n.data,r=Le.empty();let s=new ce(pe.comparator);for(let i of e.fields)if(!s.has(i)){let o=t.field(i);o===null&&i.length>1&&(i=i.popLast(),o=t.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new rn(n.key,r,new rt(s.toArray()),ge.none())}}function ZS(n,e,t){n instanceof Ps?function(s,i,o){const c=s.value.clone(),u=qf(s.fieldTransforms,i,o.transformResults);c.setAll(u),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(n,e,t):n instanceof rn?function(s,i,o){if(!Yo(s.precondition,i))return void i.convertToUnknownDocument(o.version);const c=qf(s.fieldTransforms,i,o.transformResults),u=i.data;u.setAll(x_(s)),u.setAll(c),i.convertToFoundDocument(o.version,u).setHasCommittedMutations()}(n,e,t):function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function Ti(n,e,t,r){return n instanceof Ps?function(i,o,c,u){if(!Yo(i.precondition,o))return c;const l=i.value.clone(),d=$f(i.fieldTransforms,u,o);return l.setAll(d),o.convertToFoundDocument(o.version,l).setHasLocalMutations(),null}(n,e,t,r):n instanceof rn?function(i,o,c,u){if(!Yo(i.precondition,o))return c;const l=$f(i.fieldTransforms,u,o),d=o.data;return d.setAll(x_(i)),d.setAll(l),o.convertToFoundDocument(o.version,d).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(f=>f.field))}(n,e,t,r):function(i,o,c){return Yo(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c}(n,e,t)}function eR(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=b_(r.transform,s||null);i!=null&&(t===null&&(t=Le.empty()),t.set(r.field,i))}return t||null}function Gf(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&ns(r,s,(i,o)=>YS(i,o))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Ps extends Za{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class rn extends Za{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function x_(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function qf(n,e,t){const r=new Map;q(n.length===t.length,32656,{Ve:t.length,de:n.length});for(let s=0;s<t.length;s++){const i=n[s],o=i.transform,c=e.data.field(i.field);r.set(i.field,JS(o,c,t[s]))}return r}function $f(n,e,t){const r=new Map;for(const s of n){const i=s.transform,o=t.data.field(s.field);r.set(s.field,QS(i,o,e))}return r}class Cs extends Za{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class bl extends Za{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class Sl{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&ZS(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Ti(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Ti(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=T_();return this.mutations.forEach(s=>{const i=e.get(s.key),o=i.overlayedDocument;let c=this.applyToLocalView(o,i.mutatedFields);c=t.has(s.key)?null:c;const u=C_(o,c);u!==null&&r.set(s.key,u),o.isValidDocument()||o.convertToNoDocument($.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),J())}isEqual(e){return this.batchId===e.batchId&&ns(this.mutations,e.mutations,(t,r)=>Gf(t,r))&&ns(this.baseMutations,e.baseMutations,(t,r)=>Gf(t,r))}}class Rl{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){q(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let s=function(){return KS}();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new Rl(e,t,r,s)}}/**
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
 */class Pl{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class D_{constructor(e,t,r){this.alias=e,this.aggregateType=t,this.fieldPath=r}}/**
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
 */class tR{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
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
 */var Se,se;function k_(n){switch(n){case P.OK:return j(64938);case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0;default:return j(15467,{code:n})}}function N_(n){if(n===void 0)return ve("GRPC error has no .code"),P.UNKNOWN;switch(n){case Se.OK:return P.OK;case Se.CANCELLED:return P.CANCELLED;case Se.UNKNOWN:return P.UNKNOWN;case Se.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case Se.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case Se.INTERNAL:return P.INTERNAL;case Se.UNAVAILABLE:return P.UNAVAILABLE;case Se.UNAUTHENTICATED:return P.UNAUTHENTICATED;case Se.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case Se.NOT_FOUND:return P.NOT_FOUND;case Se.ALREADY_EXISTS:return P.ALREADY_EXISTS;case Se.PERMISSION_DENIED:return P.PERMISSION_DENIED;case Se.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case Se.ABORTED:return P.ABORTED;case Se.OUT_OF_RANGE:return P.OUT_OF_RANGE;case Se.UNIMPLEMENTED:return P.UNIMPLEMENTED;case Se.DATA_LOSS:return P.DATA_LOSS;default:return j(39323,{code:n})}}(se=Se||(Se={}))[se.OK=0]="OK",se[se.CANCELLED=1]="CANCELLED",se[se.UNKNOWN=2]="UNKNOWN",se[se.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",se[se.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",se[se.NOT_FOUND=5]="NOT_FOUND",se[se.ALREADY_EXISTS=6]="ALREADY_EXISTS",se[se.PERMISSION_DENIED=7]="PERMISSION_DENIED",se[se.UNAUTHENTICATED=16]="UNAUTHENTICATED",se[se.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",se[se.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",se[se.ABORTED=10]="ABORTED",se[se.OUT_OF_RANGE=11]="OUT_OF_RANGE",se[se.UNIMPLEMENTED=12]="UNIMPLEMENTED",se[se.INTERNAL=13]="INTERNAL",se[se.UNAVAILABLE=14]="UNAVAILABLE",se[se.DATA_LOSS=15]="DATA_LOSS";/**
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
 */let Ai=null;function nR(n){if(Ai)throw new Error("a TestingHooksSpi instance is already set");Ai=n}/**
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
 */function V_(){return new TextEncoder}/**
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
 */const rR=new Pn([4294967295,4294967295],0);function zf(n){const e=V_().encode(n),t=new wg;return t.update(e),new Uint8Array(t.digest())}function Kf(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Pn([t,r],0),new Pn([s,i],0)]}class Cl{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new fi(`Invalid padding: ${t}`);if(r<0)throw new fi(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new fi(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new fi(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=Pn.fromNumber(this.ge)}ye(e,t,r){let s=e.add(t.multiply(Pn.fromNumber(r)));return s.compare(rR)===1&&(s=new Pn([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=zf(e),[r,s]=Kf(t);for(let i=0;i<this.hashCount;i++){const o=this.ye(r,s,i);if(!this.we(o))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new Cl(i,s,t);return r.forEach(c=>o.insert(c)),o}insert(e){if(this.ge===0)return;const t=zf(e),[r,s]=Kf(t);for(let i=0;i<this.hashCount;i++){const o=this.ye(r,s,i);this.Se(o)}}Se(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class fi extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class ro{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,so.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new ro($.min(),s,new he(H),st(),J())}}class so{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new so(r,t,J(),J(),J())}}/**
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
 */class Xo{constructor(e,t,r,s){this.be=e,this.removedTargetIds=t,this.key=r,this.De=s}}class O_{constructor(e,t){this.targetId=e,this.Ce=t}}class M_{constructor(e,t,r=Ie.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class Hf{constructor(){this.ve=0,this.Fe=Wf(),this.Me=Ie.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=J(),t=J(),r=J();return this.Fe.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:j(38017,{changeType:i})}}),new so(this.Me,this.xe,e,t,r)}qe(){this.Oe=!1,this.Fe=Wf()}Ke(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,q(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class sR{constructor(e){this.Ge=e,this.ze=new Map,this.je=st(),this.Je=No(),this.He=No(),this.Ze=new he(H)}Xe(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,t=>{const r=this.nt(t);switch(e.state){case 0:this.rt(t)&&r.Le(e.resumeToken);break;case 1:r.We(),r.Ne||r.qe(),r.Le(e.resumeToken);break;case 2:r.We(),r.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(r.Qe(),r.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),r.Le(e.resumeToken));break;default:j(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach((r,s)=>{this.rt(s)&&t(s)})}st(e){const t=e.targetId,r=e.Ce.count,s=this.ot(t);if(s){const i=s.target;if(ga(i))if(r===0){const o=new M(i.path);this.et(t,o,fe.newNoDocument(o,$.min()))}else q(r===1,20013,{expectedCount:r});else{const o=this._t(t);if(o!==r){const c=this.ut(e),u=c?this.ct(c,e,o):1;if(u!==0){this.it(t);const l=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,l)}Ai==null||Ai.o(function(d,f,m,y,S){var O,U,B;const x={localCacheCount:d,existenceFilterCount:f.count,databaseId:m.database,projectId:m.projectId},k=f.unchangedNames;return k&&(x.bloomFilter={applied:S===0,hashCount:(k==null?void 0:k.hashCount)??0,bitmapLength:((U=(O=k==null?void 0:k.bits)==null?void 0:O.bitmap)==null?void 0:U.length)??0,padding:((B=k==null?void 0:k.bits)==null?void 0:B.padding)??0,mightContain:z=>(y==null?void 0:y.mightContain(z))??!1}),x}(o,e.Ce,this.Ge.ht(),c,u))}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let o,c;try{o=Qt(r).toUint8Array()}catch(u){if(u instanceof Xg)return ct("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new Cl(o,s,i)}catch(u){return ct(u instanceof fi?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.ge===0?null:c}ct(e,t,r){return t.Ce.count===r-this.Pt(e,t.targetId)?0:2}Pt(e,t){const r=this.Ge.getRemoteKeysForTarget(t);let s=0;return r.forEach(i=>{const o=this.Ge.ht(),c=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.et(t,i,null),s++)}),s}Tt(e){const t=new Map;this.ze.forEach((i,o)=>{const c=this.ot(o);if(c){if(i.current&&ga(c.target)){const u=new M(c.target.path);this.Et(u).has(o)||this.It(o,u)||this.et(o,u,fe.newNoDocument(u,e))}i.Be&&(t.set(o,i.ke()),i.qe())}});let r=J();this.He.forEach((i,o)=>{let c=!0;o.forEachWhile(u=>{const l=this.ot(u);return!l||l.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(i))}),this.je.forEach((i,o)=>o.setReadTime(e));const s=new ro(e,t,this.Ze,this.je,r);return this.je=st(),this.Je=No(),this.He=No(),this.Ze=new he(H),s}Ye(e,t){if(!this.rt(e))return;const r=this.It(e,t.key)?2:0;this.nt(e).Ke(t.key,r),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.Et(t.key).add(e)),this.He=this.He.insert(t.key,this.Rt(t.key).add(e))}et(e,t,r){if(!this.rt(e))return;const s=this.nt(e);this.It(e,t)?s.Ke(t,1):s.Ue(t),this.He=this.He.insert(t,this.Rt(t).delete(e)),this.He=this.He.insert(t,this.Rt(t).add(e)),r&&(this.je=this.je.insert(t,r))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.nt(e).$e()}nt(e){let t=this.ze.get(e);return t||(t=new Hf,this.ze.set(e,t)),t}Rt(e){let t=this.He.get(e);return t||(t=new ce(H),this.He=this.He.insert(e,t)),t}Et(e){let t=this.Je.get(e);return t||(t=new ce(H),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||V("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new Hf),this.Ge.getRemoteKeysForTarget(e).forEach(t=>{this.et(e,t,null)})}It(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function No(){return new he(M.comparator)}function Wf(){return new he(M.comparator)}const iR={asc:"ASCENDING",desc:"DESCENDING"},oR={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},aR={and:"AND",or:"OR"};class cR{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function ku(n,e){return n.useProto3Json||Yi(e)?e:{value:e}}function ms(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function L_(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function uR(n,e){return ms(n,e.toTimestamp())}function be(n){return q(!!n,49232),$.fromTimestamp(function(t){const r=Wt(t);return new ie(r.seconds,r.nanos)}(n))}function xl(n,e){return Nu(n,e).canonicalString()}function Nu(n,e){const t=function(s){return new Z(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function F_(n){const e=Z.fromString(n);return q(H_(e),10190,{key:e.toString()}),e}function ji(n,e){return xl(n.databaseId,e.path)}function Mt(n,e){const t=F_(e);if(t.get(1)!==n.databaseId.projectId)throw new N(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new N(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new M(j_(t))}function U_(n,e){return xl(n.databaseId,e)}function B_(n){const e=F_(n);return e.length===4?Z.emptyPath():j_(e)}function Vu(n){return new Z(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function j_(n){return q(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Qf(n,e,t){return{name:ji(n,e),fields:t.value.mapValue.fields}}function ec(n,e,t){const r=Mt(n,e.name),s=be(e.updateTime),i=e.createTime?be(e.createTime):$.min(),o=new Le({mapValue:{fields:e.fields}}),c=fe.newFoundDocument(r,s,i,o);return t&&c.setHasCommittedMutations(),t?c.setHasCommittedMutations():c}function lR(n,e){return"found"in e?function(r,s){q(!!s.found,43571),s.found.name,s.found.updateTime;const i=Mt(r,s.found.name),o=be(s.found.updateTime),c=s.found.createTime?be(s.found.createTime):$.min(),u=new Le({mapValue:{fields:s.found.fields}});return fe.newFoundDocument(i,o,c,u)}(n,e):"missing"in e?function(r,s){q(!!s.missing,3894),q(!!s.readTime,22933);const i=Mt(r,s.missing),o=be(s.readTime);return fe.newNoDocument(i,o)}(n,e):j(7234,{result:e})}function hR(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(l){return l==="NO_CHANGE"?0:l==="ADD"?1:l==="REMOVE"?2:l==="CURRENT"?3:l==="RESET"?4:j(39313,{state:l})}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(l,d){return l.useProto3Json?(q(d===void 0||typeof d=="string",58123),Ie.fromBase64String(d||"")):(q(d===void 0||d instanceof Buffer||d instanceof Uint8Array,16193),Ie.fromUint8Array(d||new Uint8Array))}(n,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&function(l){const d=l.code===void 0?P.UNKNOWN:N_(l.code);return new N(d,l.message||"")}(o);t=new M_(r,s,i,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=Mt(n,r.document.name),i=be(r.document.updateTime),o=r.document.createTime?be(r.document.createTime):$.min(),c=new Le({mapValue:{fields:r.document.fields}}),u=fe.newFoundDocument(s,i,o,c),l=r.targetIds||[],d=r.removedTargetIds||[];t=new Xo(l,d,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=Mt(n,r.document),i=r.readTime?be(r.readTime):$.min(),o=fe.newNoDocument(s,i),c=r.removedTargetIds||[];t=new Xo([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=Mt(n,r.document),i=r.removedTargetIds||[];t=new Xo([],i,s,null)}else{if(!("filter"in e))return j(11601,{Vt:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new tR(s,i),c=r.targetId;t=new O_(c,o)}}return t}function Gi(n,e){let t;if(e instanceof Ps)t={update:Qf(n,e.key,e.value)};else if(e instanceof Cs)t={delete:ji(n,e.key)};else if(e instanceof rn)t={update:Qf(n,e.key,e.data),updateMask:_R(e.fieldMask)};else{if(!(e instanceof bl))return j(16599,{dt:e.type});t={verify:ji(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(i,o){const c=o.transform;if(c instanceof fs)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof gr)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof _r)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof ps)return{fieldPath:o.field.canonicalString(),increment:c.Ae};throw j(20930,{transform:o.transform})}(0,r))),e.precondition.isNone||(t.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:uR(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:j(27497)}(n,e.precondition)),t}function Ou(n,e){const t=e.currentDocument?function(i){return i.updateTime!==void 0?ge.updateTime(be(i.updateTime)):i.exists!==void 0?ge.exists(i.exists):ge.none()}(e.currentDocument):ge.none(),r=e.updateTransforms?e.updateTransforms.map(s=>function(o,c){let u=null;if("setToServerValue"in c)q(c.setToServerValue==="REQUEST_TIME",16630,{proto:c}),u=new fs;else if("appendMissingElements"in c){const d=c.appendMissingElements.values||[];u=new gr(d)}else if("removeAllFromArray"in c){const d=c.removeAllFromArray.values||[];u=new _r(d)}else"increment"in c?u=new ps(o,c.increment):j(16584,{proto:c});const l=pe.fromServerFormat(c.fieldPath);return new no(l,u)}(n,s)):[];if(e.update){e.update.name;const s=Mt(n,e.update.name),i=new Le({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=function(u){const l=u.fieldPaths||[];return new rt(l.map(d=>pe.fromServerFormat(d)))}(e.updateMask);return new rn(s,i,o,t,r)}return new Ps(s,i,t,r)}if(e.delete){const s=Mt(n,e.delete);return new Cs(s,t)}if(e.verify){const s=Mt(n,e.verify);return new bl(s,t)}return j(1463,{proto:e})}function dR(n,e){return n&&n.length>0?(q(e!==void 0,14353),n.map(t=>function(s,i){let o=s.updateTime?be(s.updateTime):be(i);return o.isEqual($.min())&&(o=be(i)),new XS(o,s.transformResults||[])}(t,e))):[]}function G_(n,e){return{documents:[U_(n,e.path)]}}function tc(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=U_(n,s);const i=function(l){if(l.length!==0)return K_(oe.create(l,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const o=function(l){if(l.length!==0)return l.map(d=>function(m){return{field:En(m.field),direction:pR(m.dir)}}(d))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);const c=ku(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(l){return{before:l.inclusive,values:l.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(l){return{before:!l.inclusive,values:l.position}}(e.endAt)),{ft:t,parent:s}}function q_(n,e,t,r){const{ft:s,parent:i}=tc(n,e),o={},c=[];let u=0;return t.forEach(l=>{const d=r?l.alias:"aggregate_"+u++;o[d]=l.alias,l.aggregateType==="count"?c.push({alias:d,count:{}}):l.aggregateType==="avg"?c.push({alias:d,avg:{field:En(l.fieldPath)}}):l.aggregateType==="sum"&&c.push({alias:d,sum:{field:En(l.fieldPath)}})}),{request:{structuredAggregationQuery:{aggregations:c,structuredQuery:s.structuredQuery},parent:s.parent},gt:o,parent:i}}function $_(n){let e=B_(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){q(r===1,65062);const d=t.from[0];d.allDescendants?s=d.collectionId:e=e.child(d.collectionId)}let i=[];t.where&&(i=function(f){const m=z_(f);return m instanceof oe&&wl(m)?m.getFilters():[m]}(t.where));let o=[];t.orderBy&&(o=function(f){return f.map(m=>function(S){return new Bi($r(S.field),function(k){switch(k){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(S.direction))}(m))}(t.orderBy));let c=null;t.limit&&(c=function(f){let m;return m=typeof f=="object"?f.value:f,Yi(m)?null:m}(t.limit));let u=null;t.startAt&&(u=function(f){const m=!!f.before,y=f.values||[];return new On(y,m)}(t.startAt));let l=null;return t.endAt&&(l=function(f){const m=!f.before,y=f.values||[];return new On(y,m)}(t.endAt)),p_(e,s,o,i,c,"F",u,l)}function fR(n,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return j(28987,{purpose:s})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function z_(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=$r(t.unaryFilter.field);return ne.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=$r(t.unaryFilter.field);return ne.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=$r(t.unaryFilter.field);return ne.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=$r(t.unaryFilter.field);return ne.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return j(61313);default:return j(60726)}}(n):n.fieldFilter!==void 0?function(t){return ne.create($r(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return j(58110);default:return j(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return oe.create(t.compositeFilter.filters.map(r=>z_(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return j(1026)}}(t.compositeFilter.op))}(n):j(30097,{filter:n})}function pR(n){return iR[n]}function mR(n){return oR[n]}function gR(n){return aR[n]}function En(n){return{fieldPath:n.canonicalString()}}function $r(n){return pe.fromServerFormat(n.fieldPath)}function K_(n){return n instanceof ne?function(t){if(t.op==="=="){if(Nf(t.value))return{unaryFilter:{field:En(t.field),op:"IS_NAN"}};if(kf(t.value))return{unaryFilter:{field:En(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Nf(t.value))return{unaryFilter:{field:En(t.field),op:"IS_NOT_NAN"}};if(kf(t.value))return{unaryFilter:{field:En(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:En(t.field),op:mR(t.op),value:t.value}}}(n):n instanceof oe?function(t){const r=t.getFilters().map(s=>K_(s));return r.length===1?r[0]:{compositeFilter:{op:gR(t.op),filters:r}}}(n):j(54877,{filter:n})}function _R(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function H_(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function W_(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}/**
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
 */class qt{constructor(e,t,r,s,i=$.min(),o=$.min(),c=Ie.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new qt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new qt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new qt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new qt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class Q_{constructor(e){this.yt=e}}function yR(n,e){let t;if(e.document)t=ec(n.yt,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const r=M.fromSegments(e.noDocument.path),s=Ir(e.noDocument.readTime);t=fe.newNoDocument(r,s),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return j(56709);{const r=M.fromSegments(e.unknownDocument.path),s=Ir(e.unknownDocument.version);t=fe.newUnknownDocument(r,s)}}return e.readTime&&t.setReadTime(function(s){const i=new ie(s[0],s[1]);return $.fromTimestamp(i)}(e.readTime)),t}function Jf(n,e){const t=e.key,r={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:Ia(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())r.document=function(i,o){return{name:ji(i,o.key),fields:o.data.value.mapValue.fields,updateTime:ms(i,o.version.toTimestamp()),createTime:ms(i,o.createTime.toTimestamp())}}(n.yt,e);else if(e.isNoDocument())r.noDocument={path:t.path.toArray(),readTime:yr(e.version)};else{if(!e.isUnknownDocument())return j(57904,{document:e});r.unknownDocument={path:t.path.toArray(),version:yr(e.version)}}return r}function Ia(n){const e=n.toTimestamp();return[e.seconds,e.nanoseconds]}function yr(n){const e=n.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function Ir(n){const e=new ie(n.seconds,n.nanoseconds);return $.fromTimestamp(e)}function ir(n,e){const t=(e.baseMutations||[]).map(i=>Ou(n.yt,i));for(let i=0;i<e.mutations.length-1;++i){const o=e.mutations[i];if(i+1<e.mutations.length&&e.mutations[i+1].transform!==void 0){const c=e.mutations[i+1];o.updateTransforms=c.transform.fieldTransforms,e.mutations.splice(i+1,1),++i}}const r=e.mutations.map(i=>Ou(n.yt,i)),s=ie.fromMillis(e.localWriteTimeMs);return new Sl(e.batchId,s,t,r)}function pi(n){const e=Ir(n.readTime),t=n.lastLimboFreeSnapshotVersion!==void 0?Ir(n.lastLimboFreeSnapshotVersion):$.min();let r;return r=function(i){return i.documents!==void 0}(n.query)?function(i){const o=i.documents.length;return q(o===1,1966,{count:o}),Ke(Rs(B_(i.documents[0])))}(n.query):function(i){return Ke($_(i))}(n.query),new qt(r,n.targetId,"TargetPurposeListen",n.lastListenSequenceNumber,e,t,Ie.fromBase64String(n.resumeToken))}function J_(n,e){const t=yr(e.snapshotVersion),r=yr(e.lastLimboFreeSnapshotVersion);let s;s=ga(e.target)?G_(n.yt,e.target):tc(n.yt,e.target).ft;const i=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:mr(e.target),readTime:t,resumeToken:i,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:s}}function nc(n){const e=$_({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?ya(e,e.limit,"L"):e}function Jc(n,e){return new Pl(e.largestBatchId,Ou(n.yt,e.overlayMutation))}function Yf(n,e){const t=e.path.lastSegment();return[n,ze(e.path.popLast()),t]}function Xf(n,e,t,r){return{indexId:n,uid:e,sequenceNumber:t,readTime:yr(r.readTime),documentKey:ze(r.documentKey.path),largestBatchId:r.largestBatchId}}/**
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
 */class IR{getBundleMetadata(e,t){return Zf(e).get(t).next(r=>{if(r)return function(i){return{id:i.bundleId,createTime:Ir(i.createTime),version:i.version}}(r)})}saveBundleMetadata(e,t){return Zf(e).put(function(s){return{bundleId:s.id,createTime:yr(be(s.createTime)),version:s.version}}(t))}getNamedQuery(e,t){return ep(e).get(t).next(r=>{if(r)return function(i){return{name:i.name,query:nc(i.bundledQuery),readTime:Ir(i.readTime)}}(r)})}saveNamedQuery(e,t){return ep(e).put(function(s){return{name:s.name,readTime:yr(be(s.readTime)),bundledQuery:s.bundledQuery}}(t))}}function Zf(n){return Ne(n,Ka)}function ep(n){return Ne(n,Ha)}/**
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
 */class rc{constructor(e,t){this.serializer=e,this.userId=t}static wt(e,t){const r=t.uid||"";return new rc(e,r)}getOverlay(e,t){return ni(e).get(Yf(this.userId,t)).next(r=>r?Jc(this.serializer,r):null)}getOverlays(e,t){const r=xt();return b.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){const s=[];return r.forEach((i,o)=>{const c=new Pl(t,o);s.push(this.St(e,c))}),b.waitFor(s)}removeOverlaysForBatchId(e,t,r){const s=new Set;t.forEach(o=>s.add(ze(o.getCollectionPath())));const i=[];return s.forEach(o=>{const c=IDBKeyRange.bound([this.userId,o,r],[this.userId,o,r+1],!1,!0);i.push(ni(e).X(vu,c))}),b.waitFor(i)}getOverlaysForCollection(e,t,r){const s=xt(),i=ze(t),o=IDBKeyRange.bound([this.userId,i,r],[this.userId,i,Number.POSITIVE_INFINITY],!0);return ni(e).J(vu,o).next(c=>{for(const u of c){const l=Jc(this.serializer,u);s.set(l.getKey(),l)}return s})}getOverlaysForCollectionGroup(e,t,r,s){const i=xt();let o;const c=IDBKeyRange.bound([this.userId,t,r],[this.userId,t,Number.POSITIVE_INFINITY],!0);return ni(e).ee({index:zg,range:c},(u,l,d)=>{const f=Jc(this.serializer,l);i.size()<s||f.largestBatchId===o?(i.set(f.getKey(),f),o=f.largestBatchId):d.done()}).next(()=>i)}St(e,t){return ni(e).put(function(s,i,o){const[c,u,l]=Yf(i,o.mutation.key);return{userId:i,collectionPath:u,documentId:l,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:Gi(s.yt,o.mutation)}}(this.serializer,this.userId,t))}}function ni(n){return Ne(n,Wa)}/**
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
 */class ER{bt(e){return Ne(e,_l)}getSessionToken(e){return this.bt(e).get("sessionToken").next(t=>{const r=t==null?void 0:t.value;return r?Ie.fromUint8Array(r):Ie.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.bt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
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
 */class or{constructor(){}Dt(e,t){this.Ct(e,t),t.vt()}Ct(e,t){if("nullValue"in e)this.Ft(t,5);else if("booleanValue"in e)this.Ft(t,10),t.Mt(e.booleanValue?1:0);else if("integerValue"in e)this.Ft(t,15),t.Mt(me(e.integerValue));else if("doubleValue"in e){const r=me(e.doubleValue);isNaN(r)?this.Ft(t,13):(this.Ft(t,15),ki(r)?t.Mt(0):t.Mt(r))}else if("timestampValue"in e){let r=e.timestampValue;this.Ft(t,20),typeof r=="string"&&(r=Wt(r)),t.xt(`${r.seconds||""}`),t.Mt(r.nanos||0)}else if("stringValue"in e)this.Ot(e.stringValue,t),this.Nt(t);else if("bytesValue"in e)this.Ft(t,30),t.Bt(Qt(e.bytesValue)),this.Nt(t);else if("referenceValue"in e)this.Lt(e.referenceValue,t);else if("geoPointValue"in e){const r=e.geoPointValue;this.Ft(t,45),t.Mt(r.latitude||0),t.Mt(r.longitude||0)}else"mapValue"in e?s_(e)?this.Ft(t,Number.MAX_SAFE_INTEGER):Ya(e)?this.kt(e.mapValue,t):(this.qt(e.mapValue,t),this.Nt(t)):"arrayValue"in e?(this.Kt(e.arrayValue,t),this.Nt(t)):j(19022,{Ut:e})}Ot(e,t){this.Ft(t,25),this.$t(e,t)}$t(e,t){t.xt(e)}qt(e,t){const r=e.fields||{};this.Ft(t,55);for(const s of Object.keys(r))this.Ot(s,t),this.Ct(r[s],t)}kt(e,t){var o,c;const r=e.fields||{};this.Ft(t,53);const s=ls,i=((c=(o=r[s].arrayValue)==null?void 0:o.values)==null?void 0:c.length)||0;this.Ft(t,15),t.Mt(me(i)),this.Ot(s,t),this.Ct(r[s],t)}Kt(e,t){const r=e.values||[];this.Ft(t,50);for(const s of r)this.Ct(s,t)}Lt(e,t){this.Ft(t,37),M.fromName(e).path.forEach(r=>{this.Ft(t,60),this.$t(r,t)})}Ft(e,t){e.Mt(t)}Nt(e){e.Mt(2)}}or.Wt=new or;/**
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
 */const Fr=255;function wR(n){if(n===0)return 8;let e=0;return n>>4||(e+=4,n<<=4),n>>6||(e+=2,n<<=2),n>>7||(e+=1),e}function tp(n){const e=64-function(r){let s=0;for(let i=0;i<8;++i){const o=wR(255&r[i]);if(s+=o,o!==8)break}return s}(n);return Math.ceil(e/8)}class TR{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Qt(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Gt(r.value),r=t.next();this.zt()}jt(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Jt(r.value),r=t.next();this.Ht()}Zt(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Gt(r);else if(r<2048)this.Gt(960|r>>>6),this.Gt(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Gt(480|r>>>12),this.Gt(128|63&r>>>6),this.Gt(128|63&r);else{const s=t.codePointAt(0);this.Gt(240|s>>>18),this.Gt(128|63&s>>>12),this.Gt(128|63&s>>>6),this.Gt(128|63&s)}}this.zt()}Xt(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Jt(r);else if(r<2048)this.Jt(960|r>>>6),this.Jt(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Jt(480|r>>>12),this.Jt(128|63&r>>>6),this.Jt(128|63&r);else{const s=t.codePointAt(0);this.Jt(240|s>>>18),this.Jt(128|63&s>>>12),this.Jt(128|63&s>>>6),this.Jt(128|63&s)}}this.Ht()}Yt(e){const t=this.en(e),r=tp(t);this.tn(1+r),this.buffer[this.position++]=255&r;for(let s=t.length-r;s<t.length;++s)this.buffer[this.position++]=255&t[s]}nn(e){const t=this.en(e),r=tp(t);this.tn(1+r),this.buffer[this.position++]=~(255&r);for(let s=t.length-r;s<t.length;++s)this.buffer[this.position++]=~(255&t[s])}rn(){this.sn(Fr),this.sn(255)}_n(){this.an(Fr),this.an(255)}reset(){this.position=0}seed(e){this.tn(e.length),this.buffer.set(e,this.position),this.position+=e.length}un(){return this.buffer.slice(0,this.position)}en(e){const t=function(i){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,i,!1),new Uint8Array(o.buffer)}(e),r=!!(128&t[0]);t[0]^=r?255:128;for(let s=1;s<t.length;++s)t[s]^=r?255:0;return t}Gt(e){const t=255&e;t===0?(this.sn(0),this.sn(255)):t===Fr?(this.sn(Fr),this.sn(0)):this.sn(t)}Jt(e){const t=255&e;t===0?(this.an(0),this.an(255)):t===Fr?(this.an(Fr),this.an(0)):this.an(e)}zt(){this.sn(0),this.sn(1)}Ht(){this.an(0),this.an(1)}sn(e){this.tn(1),this.buffer[this.position++]=e}an(e){this.tn(1),this.buffer[this.position++]=~e}tn(e){const t=e+this.position;if(t<=this.buffer.length)return;let r=2*this.buffer.length;r<t&&(r=t);const s=new Uint8Array(r);s.set(this.buffer),this.buffer=s}}class AR{constructor(e){this.cn=e}Bt(e){this.cn.Qt(e)}xt(e){this.cn.Zt(e)}Mt(e){this.cn.Yt(e)}vt(){this.cn.rn()}}class vR{constructor(e){this.cn=e}Bt(e){this.cn.jt(e)}xt(e){this.cn.Xt(e)}Mt(e){this.cn.nn(e)}vt(){this.cn._n()}}class ri{constructor(){this.cn=new TR,this.ascending=new AR(this.cn),this.descending=new vR(this.cn)}seed(e){this.cn.seed(e)}ln(e){return e===0?this.ascending:this.descending}un(){return this.cn.un()}reset(){this.cn.reset()}}/**
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
 */class ar{constructor(e,t,r,s){this.hn=e,this.Pn=t,this.Tn=r,this.En=s}In(){const e=this.En.length,t=e===0||this.En[e-1]===255?e+1:e,r=new Uint8Array(t);return r.set(this.En,0),t!==e?r.set([0],this.En.length):++r[r.length-1],new ar(this.hn,this.Pn,this.Tn,r)}Rn(e,t,r){return{indexId:this.hn,uid:e,arrayValue:Zo(this.Tn),directionalValue:Zo(this.En),orderedDocumentKey:Zo(t),documentKey:r.path.toArray()}}An(e,t,r){const s=this.Rn(e,t,r);return[s.indexId,s.uid,s.arrayValue,s.directionalValue,s.orderedDocumentKey,s.documentKey]}}function fn(n,e){let t=n.hn-e.hn;return t!==0?t:(t=np(n.Tn,e.Tn),t!==0?t:(t=np(n.En,e.En),t!==0?t:M.comparator(n.Pn,e.Pn)))}function np(n,e){for(let t=0;t<n.length&&t<e.length;++t){const r=n[t]-e[t];if(r!==0)return r}return n.length-e.length}function Zo(n){return Em()?function(t){let r="";for(let s=0;s<t.length;s++)r+=String.fromCharCode(t[s]);return r}(n):n}function rp(n){return typeof n!="string"?n:function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(n)}class sp{constructor(e){this.Vn=new ce((t,r)=>pe.comparator(t.field,r.field)),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.dn=e.orderBy,this.mn=[];for(const t of e.filters){const r=t;r.isInequality()?this.Vn=this.Vn.add(r):this.mn.push(r)}}get fn(){return this.Vn.size>1}gn(e){if(q(e.collectionGroup===this.collectionId,49279),this.fn)return!1;const t=wu(e);if(t!==void 0&&!this.pn(t))return!1;const r=nr(e);let s=new Set,i=0,o=0;for(;i<r.length&&this.pn(r[i]);++i)s=s.add(r[i].fieldPath.canonicalString());if(i===r.length)return!0;if(this.Vn.size>0){const c=this.Vn.getIterator().getNext();if(!s.has(c.field.canonicalString())){const u=r[i];if(!this.yn(c,u)||!this.wn(this.dn[o++],u))return!1}++i}for(;i<r.length;++i){const c=r[i];if(o>=this.dn.length||!this.wn(this.dn[o++],c))return!1}return!0}Sn(){if(this.fn)return null;let e=new ce(pe.comparator);const t=[];for(const r of this.mn)if(!r.field.isKeyField())if(r.op==="array-contains"||r.op==="array-contains-any")t.push(new ur(r.field,2));else{if(e.has(r.field))continue;e=e.add(r.field),t.push(new ur(r.field,0))}for(const r of this.dn)r.field.isKeyField()||e.has(r.field)||(e=e.add(r.field),t.push(new ur(r.field,r.dir==="asc"?0:1)));return new ss(ss.UNKNOWN_ID,this.collectionId,t,is.empty())}pn(e){for(const t of this.mn)if(this.yn(t,e))return!0;return!1}yn(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const r=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===r}wn(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
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
 */function Y_(n){var t,r;if(q(n instanceof ne||n instanceof oe,20012),n instanceof ne){if(n instanceof f_){const s=((r=(t=n.value.arrayValue)==null?void 0:t.values)==null?void 0:r.map(i=>ne.create(n.field,"==",i)))||[];return oe.create(s,"or")}return n}const e=n.filters.map(s=>Y_(s));return oe.create(e,n.op)}function bR(n){if(n.getFilters().length===0)return[];const e=Fu(Y_(n));return q(X_(e),7391),Mu(e)||Lu(e)?[e]:e.getFilters()}function Mu(n){return n instanceof ne}function Lu(n){return n instanceof oe&&wl(n)}function X_(n){return Mu(n)||Lu(n)||function(t){if(t instanceof oe&&Pu(t)){for(const r of t.getFilters())if(!Mu(r)&&!Lu(r))return!1;return!0}return!1}(n)}function Fu(n){if(q(n instanceof ne||n instanceof oe,34018),n instanceof ne)return n;if(n.filters.length===1)return Fu(n.filters[0]);const e=n.filters.map(r=>Fu(r));let t=oe.create(e,n.op);return t=Ea(t),X_(t)?t:(q(t instanceof oe,64498),q(ds(t),40251),q(t.filters.length>1,57927),t.filters.reduce((r,s)=>Dl(r,s)))}function Dl(n,e){let t;return q(n instanceof ne||n instanceof oe,38388),q(e instanceof ne||e instanceof oe,25473),t=n instanceof ne?e instanceof ne?function(s,i){return oe.create([s,i],"and")}(n,e):ip(n,e):e instanceof ne?ip(e,n):function(s,i){if(q(s.filters.length>0&&i.filters.length>0,48005),ds(s)&&ds(i))return l_(s,i.getFilters());const o=Pu(s)?s:i,c=Pu(s)?i:s,u=o.filters.map(l=>Dl(l,c));return oe.create(u,"or")}(n,e),Ea(t)}function ip(n,e){if(ds(e))return l_(e,n.getFilters());{const t=e.filters.map(r=>Dl(n,r));return oe.create(t,"or")}}function Ea(n){if(q(n instanceof ne||n instanceof oe,11850),n instanceof ne)return n;const e=n.getFilters();if(e.length===1)return Ea(e[0]);if(c_(n))return n;const t=e.map(s=>Ea(s)),r=[];return t.forEach(s=>{s instanceof ne?r.push(s):s instanceof oe&&(s.op===n.op?r.push(...s.filters):r.push(s))}),r.length===1?r[0]:oe.create(r,n.op)}/**
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
 */class SR{constructor(){this.bn=new kl}addToCollectionParentIndex(e,t){return this.bn.add(t),b.resolve()}getCollectionParents(e,t){return b.resolve(this.bn.getEntries(t))}addFieldIndex(e,t){return b.resolve()}deleteFieldIndex(e,t){return b.resolve()}deleteAllFieldIndexes(e){return b.resolve()}createTargetIndexes(e,t){return b.resolve()}getDocumentsMatchingTarget(e,t){return b.resolve(null)}getIndexType(e,t){return b.resolve(0)}getFieldIndexes(e,t){return b.resolve([])}getNextCollectionGroupToUpdate(e){return b.resolve(null)}getMinOffset(e,t){return b.resolve(pt.min())}getMinOffsetFromCollectionGroup(e,t){return b.resolve(pt.min())}updateCollectionGroup(e,t,r){return b.resolve()}updateIndexEntries(e,t){return b.resolve()}}class kl{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new ce(Z.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new ce(Z.comparator)).toArray()}}/**
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
 */const op="IndexedDbIndexManager",Vo=new Uint8Array(0);class RR{constructor(e,t){this.databaseId=t,this.Dn=new kl,this.Cn=new nn(r=>mr(r),(r,s)=>Zi(r,s)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.Dn.has(t)){const r=t.lastSegment(),s=t.popLast();e.addOnCommittedListener(()=>{this.Dn.add(t)});const i={collectionId:r,parent:ze(s)};return ap(e).put(i)}return b.resolve()}getCollectionParents(e,t){const r=[],s=IDBKeyRange.bound([t,""],[xg(t),""],!1,!0);return ap(e).J(s).next(i=>{for(const o of i){if(o.collectionId!==t)break;r.push(Ct(o.parent))}return r})}addFieldIndex(e,t){const r=si(e),s=function(c){return{indexId:c.indexId,collectionGroup:c.collectionGroup,fields:c.fields.map(u=>[u.fieldPath.canonicalString(),u.kind])}}(t);delete s.indexId;const i=r.add(s);if(t.indexState){const o=Br(e);return i.next(c=>{o.put(Xf(c,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return i.next()}deleteFieldIndex(e,t){const r=si(e),s=Br(e),i=Ur(e);return r.delete(t.indexId).next(()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){const t=si(e),r=Ur(e),s=Br(e);return t.X().next(()=>r.X()).next(()=>s.X())}createTargetIndexes(e,t){return b.forEach(this.vn(t),r=>this.getIndexType(e,r).next(s=>{if(s===0||s===1){const i=new sp(r).Sn();if(i!=null)return this.addFieldIndex(e,i)}}))}getDocumentsMatchingTarget(e,t){const r=Ur(e);let s=!0;const i=new Map;return b.forEach(this.vn(t),o=>this.Fn(e,o).next(c=>{s&&(s=!!c),i.set(o,c)})).next(()=>{if(s){let o=J();const c=[];return b.forEach(i,(u,l)=>{V(op,`Using index ${function(B){return`id=${B.indexId}|cg=${B.collectionGroup}|f=${B.fields.map(z=>`${z.fieldPath}:${z.kind}`).join(",")}`}(u)} to execute ${mr(t)}`);const d=function(B,z){const W=wu(z);if(W===void 0)return null;for(const Q of _a(B,W.fieldPath))switch(Q.op){case"array-contains-any":return Q.value.arrayValue.values||[];case"array-contains":return[Q.value]}return null}(l,u),f=function(B,z){const W=new Map;for(const Q of nr(z))for(const E of _a(B,Q.fieldPath))switch(E.op){case"==":case"in":W.set(Q.fieldPath.canonicalString(),E.value);break;case"not-in":case"!=":return W.set(Q.fieldPath.canonicalString(),E.value),Array.from(W.values())}return null}(l,u),m=function(B,z){const W=[];let Q=!0;for(const E of nr(z)){const I=E.kind===0?Ff(B,E.fieldPath,B.startAt):Uf(B,E.fieldPath,B.startAt);W.push(I.value),Q&&(Q=I.inclusive)}return new On(W,Q)}(l,u),y=function(B,z){const W=[];let Q=!0;for(const E of nr(z)){const I=E.kind===0?Uf(B,E.fieldPath,B.endAt):Ff(B,E.fieldPath,B.endAt);W.push(I.value),Q&&(Q=I.inclusive)}return new On(W,Q)}(l,u),S=this.Mn(u,l,m),x=this.Mn(u,l,y),k=this.xn(u,l,f),O=this.On(u.indexId,d,S,m.inclusive,x,y.inclusive,k);return b.forEach(O,U=>r.Z(U,t.limit).next(B=>{B.forEach(z=>{const W=M.fromSegments(z.documentKey);o.has(W)||(o=o.add(W),c.push(W))})}))}).next(()=>c)}return b.resolve(null)})}vn(e){let t=this.Cn.get(e);return t||(e.filters.length===0?t=[e]:t=bR(oe.create(e.filters,"and")).map(r=>xu(e.path,e.collectionGroup,e.orderBy,r.getFilters(),e.limit,e.startAt,e.endAt)),this.Cn.set(e,t),t)}On(e,t,r,s,i,o,c){const u=(t!=null?t.length:1)*Math.max(r.length,i.length),l=u/(t!=null?t.length:1),d=[];for(let f=0;f<u;++f){const m=t?this.Nn(t[f/l]):Vo,y=this.Bn(e,m,r[f%l],s),S=this.Ln(e,m,i[f%l],o),x=c.map(k=>this.Bn(e,m,k,!0));d.push(...this.createRange(y,S,x))}return d}Bn(e,t,r,s){const i=new ar(e,M.empty(),t,r);return s?i:i.In()}Ln(e,t,r,s){const i=new ar(e,M.empty(),t,r);return s?i.In():i}Fn(e,t){const r=new sp(t),s=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,s).next(i=>{let o=null;for(const c of i)r.gn(c)&&(!o||c.fields.length>o.fields.length)&&(o=c);return o})}getIndexType(e,t){let r=2;const s=this.vn(t);return b.forEach(s,i=>this.Fn(e,i).next(o=>{o?r!==0&&o.fields.length<function(u){let l=new ce(pe.comparator),d=!1;for(const f of u.filters)for(const m of f.getFlattenedFilters())m.field.isKeyField()||(m.op==="array-contains"||m.op==="array-contains-any"?d=!0:l=l.add(m.field));for(const f of u.orderBy)f.field.isKeyField()||(l=l.add(f.field));return l.size+(d?1:0)}(i)&&(r=1):r=0})).next(()=>function(o){return o.limit!==null}(t)&&s.length>1&&r===2?1:r)}kn(e,t){const r=new ri;for(const s of nr(e)){const i=t.data.field(s.fieldPath);if(i==null)return null;const o=r.ln(s.kind);or.Wt.Dt(i,o)}return r.un()}Nn(e){const t=new ri;return or.Wt.Dt(e,t.ln(0)),t.un()}qn(e,t){const r=new ri;return or.Wt.Dt(pr(this.databaseId,t),r.ln(function(i){const o=nr(i);return o.length===0?0:o[o.length-1].kind}(e))),r.un()}xn(e,t,r){if(r===null)return[];let s=[];s.push(new ri);let i=0;for(const o of nr(e)){const c=r[i++];for(const u of s)if(this.Kn(t,o.fieldPath)&&Ui(c))s=this.Un(s,o,c);else{const l=u.ln(o.kind);or.Wt.Dt(c,l)}}return this.$n(s)}Mn(e,t,r){return this.xn(e,t,r.position)}$n(e){const t=[];for(let r=0;r<e.length;++r)t[r]=e[r].un();return t}Un(e,t,r){const s=[...e],i=[];for(const o of r.arrayValue.values||[])for(const c of s){const u=new ri;u.seed(c.un()),or.Wt.Dt(o,u.ln(t.kind)),i.push(u)}return i}Kn(e,t){return!!e.filters.find(r=>r instanceof ne&&r.field.isEqual(t)&&(r.op==="in"||r.op==="not-in"))}getFieldIndexes(e,t){const r=si(e),s=Br(e);return(t?r.J(Au,IDBKeyRange.bound(t,t)):r.J()).next(i=>{const o=[];return b.forEach(i,c=>s.get([c.indexId,this.uid]).next(u=>{o.push(function(d,f){const m=f?new is(f.sequenceNumber,new pt(Ir(f.readTime),new M(Ct(f.documentKey)),f.largestBatchId)):is.empty(),y=d.fields.map(([S,x])=>new ur(pe.fromServerFormat(S),x));return new ss(d.indexId,d.collectionGroup,y,m)}(c,u))})).next(()=>o)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(t=>t.length===0?null:(t.sort((r,s)=>{const i=r.indexState.sequenceNumber-s.indexState.sequenceNumber;return i!==0?i:H(r.collectionGroup,s.collectionGroup)}),t[0].collectionGroup))}updateCollectionGroup(e,t,r){const s=si(e),i=Br(e);return this.Wn(e).next(o=>s.J(Au,IDBKeyRange.bound(t,t)).next(c=>b.forEach(c,u=>i.put(Xf(u.indexId,this.uid,o,r)))))}updateIndexEntries(e,t){const r=new Map;return b.forEach(t,(s,i)=>{const o=r.get(s.collectionGroup);return(o?b.resolve(o):this.getFieldIndexes(e,s.collectionGroup)).next(c=>(r.set(s.collectionGroup,c),b.forEach(c,u=>this.Qn(e,s,u).next(l=>{const d=this.Gn(i,u);return l.isEqual(d)?b.resolve():this.zn(e,i,u,l,d)}))))})}jn(e,t,r,s){return Ur(e).put(s.Rn(this.uid,this.qn(r,t.key),t.key))}Jn(e,t,r,s){return Ur(e).delete(s.An(this.uid,this.qn(r,t.key),t.key))}Qn(e,t,r){const s=Ur(e);let i=new ce(fn);return s.ee({index:$g,range:IDBKeyRange.only([r.indexId,this.uid,Zo(this.qn(r,t))])},(o,c)=>{i=i.add(new ar(r.indexId,t,rp(c.arrayValue),rp(c.directionalValue)))}).next(()=>i)}Gn(e,t){let r=new ce(fn);const s=this.kn(t,e);if(s==null)return r;const i=wu(t);if(i!=null){const o=e.data.field(i.fieldPath);if(Ui(o))for(const c of o.arrayValue.values||[])r=r.add(new ar(t.indexId,e.key,this.Nn(c),s))}else r=r.add(new ar(t.indexId,e.key,Vo,s));return r}zn(e,t,r,s,i){V(op,"Updating index entries for document '%s'",t.key);const o=[];return function(u,l,d,f,m){const y=u.getIterator(),S=l.getIterator();let x=Lr(y),k=Lr(S);for(;x||k;){let O=!1,U=!1;if(x&&k){const B=d(x,k);B<0?U=!0:B>0&&(O=!0)}else x!=null?U=!0:O=!0;O?(f(k),k=Lr(S)):U?(m(x),x=Lr(y)):(x=Lr(y),k=Lr(S))}}(s,i,fn,c=>{o.push(this.jn(e,t,r,c))},c=>{o.push(this.Jn(e,t,r,c))}),b.waitFor(o)}Wn(e){let t=1;return Br(e).ee({index:qg,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(r,s,i)=>{i.done(),t=s.sequenceNumber+1}).next(()=>t)}createRange(e,t,r){r=r.sort((o,c)=>fn(o,c)).filter((o,c,u)=>!c||fn(o,u[c-1])!==0);const s=[];s.push(e);for(const o of r){const c=fn(o,e),u=fn(o,t);if(c===0)s[0]=e.In();else if(c>0&&u<0)s.push(o),s.push(o.In());else if(u>0)break}s.push(t);const i=[];for(let o=0;o<s.length;o+=2){if(this.Hn(s[o],s[o+1]))return[];const c=s[o].An(this.uid,Vo,M.empty()),u=s[o+1].An(this.uid,Vo,M.empty());i.push(IDBKeyRange.bound(c,u))}return i}Hn(e,t){return fn(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(cp)}getMinOffset(e,t){return b.mapArray(this.vn(t),r=>this.Fn(e,r).next(s=>s||j(44426))).next(cp)}}function ap(n){return Ne(n,Oi)}function Ur(n){return Ne(n,Ii)}function si(n){return Ne(n,gl)}function Br(n){return Ne(n,yi)}function cp(n){q(n.length!==0,28825);let e=n[0].indexState.offset,t=e.largestBatchId;for(let r=1;r<n.length;r++){const s=n[r].indexState.offset;fl(s,e)<0&&(e=s),t<s.largestBatchId&&(t=s.largestBatchId)}return new pt(e.readTime,e.documentKey,t)}/**
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
 */const up={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Z_=41943040;class $e{static withCacheSize(e){return new $e(e,$e.DEFAULT_COLLECTION_PERCENTILE,$e.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
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
 */function ey(n,e,t){const r=n.store(gt),s=n.store(os),i=[],o=IDBKeyRange.only(t.batchId);let c=0;const u=r.ee({range:o},(d,f,m)=>(c++,m.delete()));i.push(u.next(()=>{q(c===1,47070,{batchId:t.batchId})}));const l=[];for(const d of t.mutations){const f=Bg(e,d.key.path,t.batchId);i.push(s.delete(f)),l.push(d.key)}return b.waitFor(i).next(()=>l)}function wa(n){if(!n)return 0;let e;if(n.document)e=n.document;else if(n.unknownDocument)e=n.unknownDocument;else{if(!n.noDocument)throw j(14731);e=n.noDocument}return JSON.stringify(e).length}/**
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
 */$e.DEFAULT_COLLECTION_PERCENTILE=10,$e.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,$e.DEFAULT=new $e(Z_,$e.DEFAULT_COLLECTION_PERCENTILE,$e.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),$e.DISABLED=new $e(-1,0,0);class sc{constructor(e,t,r,s){this.userId=e,this.serializer=t,this.indexManager=r,this.referenceDelegate=s,this.Zn={}}static wt(e,t,r,s){q(e.uid!=="",64387);const i=e.isAuthenticated()?e.uid:"";return new sc(i,t,r,s)}checkEmpty(e){let t=!0;const r=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return pn(e).ee({index:cr,range:r},(s,i,o)=>{t=!1,o.done()}).next(()=>t)}addMutationBatch(e,t,r,s){const i=zr(e),o=pn(e);return o.add({}).next(c=>{q(typeof c=="number",49019);const u=new Sl(c,t,r,s),l=function(y,S,x){const k=x.baseMutations.map(U=>Gi(y.yt,U)),O=x.mutations.map(U=>Gi(y.yt,U));return{userId:S,batchId:x.batchId,localWriteTimeMs:x.localWriteTime.toMillis(),baseMutations:k,mutations:O}}(this.serializer,this.userId,u),d=[];let f=new ce((m,y)=>H(m.canonicalString(),y.canonicalString()));for(const m of s){const y=Bg(this.userId,m.key.path,c);f=f.add(m.key.path.popLast()),d.push(o.put(l)),d.push(i.put(y,nS))}return f.forEach(m=>{d.push(this.indexManager.addToCollectionParentIndex(e,m))}),e.addOnCommittedListener(()=>{this.Zn[c]=u.keys()}),b.waitFor(d).next(()=>u)})}lookupMutationBatch(e,t){return pn(e).get(t).next(r=>r?(q(r.userId===this.userId,48,"Unexpected user for mutation batch",{userId:r.userId,batchId:t}),ir(this.serializer,r)):null)}Xn(e,t){return this.Zn[t]?b.resolve(this.Zn[t]):this.lookupMutationBatch(e,t).next(r=>{if(r){const s=r.keys();return this.Zn[t]=s,s}return null})}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=IDBKeyRange.lowerBound([this.userId,r]);let i=null;return pn(e).ee({index:cr,range:s},(o,c,u)=>{c.userId===this.userId&&(q(c.batchId>=r,47524,{Yn:r}),i=ir(this.serializer,c)),u.done()}).next(()=>i)}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let r=Cn;return pn(e).ee({index:cr,range:t,reverse:!0},(s,i,o)=>{r=i.batchId,o.done()}).next(()=>r)}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,Cn],[this.userId,Number.POSITIVE_INFINITY]);return pn(e).J(cr,t).next(r=>r.map(s=>ir(this.serializer,s)))}getAllMutationBatchesAffectingDocumentKey(e,t){const r=Ko(this.userId,t.path),s=IDBKeyRange.lowerBound(r),i=[];return zr(e).ee({range:s},(o,c,u)=>{const[l,d,f]=o,m=Ct(d);if(l===this.userId&&t.path.isEqual(m))return pn(e).get(f).next(y=>{if(!y)throw j(61480,{er:o,batchId:f});q(y.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:y.userId,batchId:f}),i.push(ir(this.serializer,y))});u.done()}).next(()=>i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new ce(H);const s=[];return t.forEach(i=>{const o=Ko(this.userId,i.path),c=IDBKeyRange.lowerBound(o),u=zr(e).ee({range:c},(l,d,f)=>{const[m,y,S]=l,x=Ct(y);m===this.userId&&i.path.isEqual(x)?r=r.add(S):f.done()});s.push(u)}),b.waitFor(s).next(()=>this.tr(e,r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1,i=Ko(this.userId,r),o=IDBKeyRange.lowerBound(i);let c=new ce(H);return zr(e).ee({range:o},(u,l,d)=>{const[f,m,y]=u,S=Ct(m);f===this.userId&&r.isPrefixOf(S)?S.length===s&&(c=c.add(y)):d.done()}).next(()=>this.tr(e,c))}tr(e,t){const r=[],s=[];return t.forEach(i=>{s.push(pn(e).get(i).next(o=>{if(o===null)throw j(35274,{batchId:i});q(o.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:o.userId,batchId:i}),r.push(ir(this.serializer,o))}))}),b.waitFor(s).next(()=>r)}removeMutationBatch(e,t){return ey(e.le,this.userId,t).next(r=>(e.addOnCommittedListener(()=>{this.nr(t.batchId)}),b.forEach(r,s=>this.referenceDelegate.markPotentiallyOrphaned(e,s))))}nr(e){delete this.Zn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return b.resolve();const r=IDBKeyRange.lowerBound(function(o){return[o]}(this.userId)),s=[];return zr(e).ee({range:r},(i,o,c)=>{if(i[0]===this.userId){const u=Ct(i[1]);s.push(u)}else c.done()}).next(()=>{q(s.length===0,56720,{rr:s.map(i=>i.canonicalString())})})})}containsKey(e,t){return ty(e,this.userId,t)}ir(e){return ny(e).get(this.userId).next(t=>t||{userId:this.userId,lastAcknowledgedBatchId:Cn,lastStreamToken:""})}}function ty(n,e,t){const r=Ko(e,t.path),s=r[1],i=IDBKeyRange.lowerBound(r);let o=!1;return zr(n).ee({range:i,Y:!0},(c,u,l)=>{const[d,f,m]=c;d===e&&f===s&&(o=!0),l.done()}).next(()=>o)}function pn(n){return Ne(n,gt)}function zr(n){return Ne(n,os)}function ny(n){return Ne(n,Ni)}/**
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
 */class Er{constructor(e){this.sr=e}next(){return this.sr+=2,this.sr}static _r(){return new Er(0)}static ar(){return new Er(-1)}}/**
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
 */class PR{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.ur(e).next(t=>{const r=new Er(t.highestTargetId);return t.highestTargetId=r.next(),this.cr(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.ur(e).next(t=>$.fromTimestamp(new ie(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.ur(e).next(t=>t.highestListenSequenceNumber)}setTargetsMetadata(e,t,r){return this.ur(e).next(s=>(s.highestListenSequenceNumber=t,r&&(s.lastRemoteSnapshotVersion=r.toTimestamp()),t>s.highestListenSequenceNumber&&(s.highestListenSequenceNumber=t),this.cr(e,s)))}addTargetData(e,t){return this.lr(e,t).next(()=>this.ur(e).next(r=>(r.targetCount+=1,this.hr(t,r),this.cr(e,r))))}updateTargetData(e,t){return this.lr(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>jr(e).delete(t.targetId)).next(()=>this.ur(e)).next(r=>(q(r.targetCount>0,8065),r.targetCount-=1,this.cr(e,r)))}removeTargets(e,t,r){let s=0;const i=[];return jr(e).ee((o,c)=>{const u=pi(c);u.sequenceNumber<=t&&r.get(u.targetId)===null&&(s++,i.push(this.removeTargetData(e,u)))}).next(()=>b.waitFor(i)).next(()=>s)}forEachTarget(e,t){return jr(e).ee((r,s)=>{const i=pi(s);t(i)})}ur(e){return lp(e).get(ma).next(t=>(q(t!==null,2888),t))}cr(e,t){return lp(e).put(ma,t)}lr(e,t){return jr(e).put(J_(this.serializer,t))}hr(e,t){let r=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,r=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,r=!0),r}getTargetCount(e){return this.ur(e).next(t=>t.targetCount)}getTargetData(e,t){const r=mr(t),s=IDBKeyRange.bound([r,Number.NEGATIVE_INFINITY],[r,Number.POSITIVE_INFINITY]);let i=null;return jr(e).ee({range:s,index:Gg},(o,c,u)=>{const l=pi(c);Zi(t,l.target)&&(i=l,u.done())}).next(()=>i)}addMatchingKeys(e,t,r){const s=[],i=wn(e);return t.forEach(o=>{const c=ze(o.path);s.push(i.put({targetId:r,path:c})),s.push(this.referenceDelegate.addReference(e,r,o))}),b.waitFor(s)}removeMatchingKeys(e,t,r){const s=wn(e);return b.forEach(t,i=>{const o=ze(i.path);return b.waitFor([s.delete([r,o]),this.referenceDelegate.removeReference(e,r,i)])})}removeMatchingKeysForTargetId(e,t){const r=wn(e),s=IDBKeyRange.bound([t],[t+1],!1,!0);return r.delete(s)}getMatchingKeysForTargetId(e,t){const r=IDBKeyRange.bound([t],[t+1],!1,!0),s=wn(e);let i=J();return s.ee({range:r,Y:!0},(o,c,u)=>{const l=Ct(o[1]),d=new M(l);i=i.add(d)}).next(()=>i)}containsKey(e,t){const r=ze(t.path),s=IDBKeyRange.bound([r],[xg(r)],!1,!0);let i=0;return wn(e).ee({index:ml,Y:!0,range:s},([o,c],u,l)=>{o!==0&&(i++,l.done())}).next(()=>i>0)}At(e,t){return jr(e).get(t).next(r=>r?pi(r):null)}}function jr(n){return Ne(n,as)}function lp(n){return Ne(n,lr)}function wn(n){return Ne(n,cs)}/**
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
 */const hp="LruGarbageCollector",ry=1048576;function dp([n,e],[t,r]){const s=H(n,t);return s===0?H(e,r):s}class CR{constructor(e){this.Pr=e,this.buffer=new ce(dp),this.Tr=0}Er(){return++this.Tr}Ir(e){const t=[e,this.Er()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();dp(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class sy{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(e){V(hp,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){jn(t)?V(hp,"Ignoring IndexedDB error during garbage collection: ",t):await Bn(t)}await this.Ar(3e5)})}}class xR{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.dr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return b.resolve(nt.ce);const r=new CR(t);return this.Vr.forEachTarget(e,s=>r.Ir(s.sequenceNumber)).next(()=>this.Vr.mr(e,s=>r.Ir(s))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.Vr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(V("LruGarbageCollector","Garbage collection skipped; disabled"),b.resolve(up)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(V("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),up):this.gr(e,t))}getCacheSize(e){return this.Vr.getCacheSize(e)}gr(e,t){let r,s,i,o,c,u,l;const d=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(f=>(f>this.params.maximumSequenceNumbersToCollect?(V("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${f}`),s=this.params.maximumSequenceNumbersToCollect):s=f,o=Date.now(),this.nthSequenceNumber(e,s))).next(f=>(r=f,c=Date.now(),this.removeTargets(e,r,t))).next(f=>(i=f,u=Date.now(),this.removeOrphanedDocuments(e,r))).next(f=>(l=Date.now(),Gr()<=te.DEBUG&&V("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-d}ms
	Determined least recently used ${s} in `+(c-o)+`ms
	Removed ${i} targets in `+(u-c)+`ms
	Removed ${f} documents in `+(l-u)+`ms
Total Duration: ${l-d}ms`),b.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:f})))}}function iy(n,e){return new xR(n,e)}/**
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
 */class DR{constructor(e,t){this.db=e,this.garbageCollector=iy(this,t)}dr(e){const t=this.pr(e);return this.db.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}pr(e){let t=0;return this.mr(e,r=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}mr(e,t){return this.yr(e,(r,s)=>t(s))}addReference(e,t,r){return Oo(e,r)}removeReference(e,t,r){return Oo(e,r)}removeTargets(e,t,r){return this.db.getTargetCache().removeTargets(e,t,r)}markPotentiallyOrphaned(e,t){return Oo(e,t)}wr(e,t){return function(s,i){let o=!1;return ny(s).te(c=>ty(s,c,i).next(u=>(u&&(o=!0),b.resolve(!u)))).next(()=>o)}(e,t)}removeOrphanedDocuments(e,t){const r=this.db.getRemoteDocumentCache().newChangeBuffer(),s=[];let i=0;return this.yr(e,(o,c)=>{if(c<=t){const u=this.wr(e,o).next(l=>{if(!l)return i++,r.getEntry(e,o).next(()=>(r.removeEntry(o,$.min()),wn(e).delete(function(f){return[0,ze(f.path)]}(o))))});s.push(u)}}).next(()=>b.waitFor(s)).next(()=>r.apply(e)).next(()=>i)}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,r)}updateLimboDocument(e,t){return Oo(e,t)}yr(e,t){const r=wn(e);let s,i=nt.ce;return r.ee({index:ml},([o,c],{path:u,sequenceNumber:l})=>{o===0?(i!==nt.ce&&t(new M(Ct(s)),i),i=l,s=u):i=nt.ce}).next(()=>{i!==nt.ce&&t(new M(Ct(s)),i)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function Oo(n,e){return wn(n).put(function(r,s){return{targetId:0,path:ze(r.path),sequenceNumber:s}}(e,n.currentSequenceNumber))}/**
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
 */class oy{constructor(){this.changes=new nn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,fe.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?b.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class kR{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,r){return er(e).put(r)}removeEntry(e,t,r){return er(e).delete(function(i,o){const c=i.path.toArray();return[c.slice(0,c.length-2),c[c.length-2],Ia(o),c[c.length-1]]}(t,r))}updateMetadata(e,t){return this.getMetadata(e).next(r=>(r.byteSize+=t,this.Sr(e,r)))}getEntry(e,t){let r=fe.newInvalidDocument(t);return er(e).ee({index:Ho,range:IDBKeyRange.only(ii(t))},(s,i)=>{r=this.br(t,i)}).next(()=>r)}Dr(e,t){let r={size:0,document:fe.newInvalidDocument(t)};return er(e).ee({index:Ho,range:IDBKeyRange.only(ii(t))},(s,i)=>{r={document:this.br(t,i),size:wa(i)}}).next(()=>r)}getEntries(e,t){let r=st();return this.Cr(e,t,(s,i)=>{const o=this.br(s,i);r=r.insert(s,o)}).next(()=>r)}vr(e,t){let r=st(),s=new he(M.comparator);return this.Cr(e,t,(i,o)=>{const c=this.br(i,o);r=r.insert(i,c),s=s.insert(i,wa(o))}).next(()=>({documents:r,Fr:s}))}Cr(e,t,r){if(t.isEmpty())return b.resolve();let s=new ce(mp);t.forEach(u=>s=s.add(u));const i=IDBKeyRange.bound(ii(s.first()),ii(s.last())),o=s.getIterator();let c=o.getNext();return er(e).ee({index:Ho,range:i},(u,l,d)=>{const f=M.fromSegments([...l.prefixPath,l.collectionGroup,l.documentId]);for(;c&&mp(c,f)<0;)r(c,null),c=o.getNext();c&&c.isEqual(f)&&(r(c,l),c=o.hasNext()?o.getNext():null),c?d.j(ii(c)):d.done()}).next(()=>{for(;c;)r(c,null),c=o.hasNext()?o.getNext():null})}getDocumentsMatchingQuery(e,t,r,s,i){const o=t.path,c=[o.popLast().toArray(),o.lastSegment(),Ia(r.readTime),r.documentKey.path.isEmpty()?"":r.documentKey.path.lastSegment()],u=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return er(e).J(IDBKeyRange.bound(c,u,!0)).next(l=>{i==null||i.incrementDocumentReadCount(l.length);let d=st();for(const f of l){const m=this.br(M.fromSegments(f.prefixPath.concat(f.collectionGroup,f.documentId)),f);m.isFoundDocument()&&(to(t,m)||s.has(m.key))&&(d=d.insert(m.key,m))}return d})}getAllFromCollectionGroup(e,t,r,s){let i=st();const o=pp(t,r),c=pp(t,pt.max());return er(e).ee({index:jg,range:IDBKeyRange.bound(o,c,!0)},(u,l,d)=>{const f=this.br(M.fromSegments(l.prefixPath.concat(l.collectionGroup,l.documentId)),l);i=i.insert(f.key,f),i.size===s&&d.done()}).next(()=>i)}newChangeBuffer(e){return new NR(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(t=>t.byteSize)}getMetadata(e){return fp(e).get(Tu).next(t=>(q(!!t,20021),t))}Sr(e,t){return fp(e).put(Tu,t)}br(e,t){if(t){const r=yR(this.serializer,t);if(!(r.isNoDocument()&&r.version.isEqual($.min())))return r}return fe.newInvalidDocument(e)}}function ay(n){return new kR(n)}class NR extends oy{constructor(e,t){super(),this.Mr=e,this.trackRemovals=t,this.Or=new nn(r=>r.toString(),(r,s)=>r.isEqual(s))}applyChanges(e){const t=[];let r=0,s=new ce((i,o)=>H(i.canonicalString(),o.canonicalString()));return this.changes.forEach((i,o)=>{const c=this.Or.get(i);if(t.push(this.Mr.removeEntry(e,i,c.readTime)),o.isValidDocument()){const u=Jf(this.Mr.serializer,o);s=s.add(i.path.popLast());const l=wa(u);r+=l-c.size,t.push(this.Mr.addEntry(e,i,u))}else if(r-=c.size,this.trackRemovals){const u=Jf(this.Mr.serializer,o.convertToNoDocument($.min()));t.push(this.Mr.addEntry(e,i,u))}}),s.forEach(i=>{t.push(this.Mr.indexManager.addToCollectionParentIndex(e,i))}),t.push(this.Mr.updateMetadata(e,r)),b.waitFor(t)}getFromCache(e,t){return this.Mr.Dr(e,t).next(r=>(this.Or.set(t,{size:r.size,readTime:r.document.readTime}),r.document))}getAllFromCache(e,t){return this.Mr.vr(e,t).next(({documents:r,Fr:s})=>(s.forEach((i,o)=>{this.Or.set(i,{size:o,readTime:r.get(i).readTime})}),r))}}function fp(n){return Ne(n,Vi)}function er(n){return Ne(n,pa)}function ii(n){const e=n.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function pp(n,e){const t=e.documentKey.path.toArray();return[n,Ia(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function mp(n,e){const t=n.path.toArray(),r=e.path.toArray();let s=0;for(let i=0;i<t.length-2&&i<r.length-2;++i)if(s=H(t[i],r[i]),s)return s;return s=H(t.length,r.length),s||(s=H(t[t.length-2],r[r.length-2]),s||H(t[t.length-1],r[r.length-1]))}/**
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
 */class VR{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class cy{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&Ti(r.mutation,s,rt.empty(),ie.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,J()).next(()=>r))}getLocalViewOfDocuments(e,t,r=J()){const s=xt();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(i=>{let o=di();return i.forEach((c,u)=>{o=o.insert(c,u.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){const r=xt();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,J()))}populateOverlays(e,t,r){const s=[];return r.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((o,c)=>{t.set(o,c)})})}computeViews(e,t,r,s){let i=st();const o=wi(),c=function(){return wi()}();return t.forEach((u,l)=>{const d=r.get(l.key);s.has(l.key)&&(d===void 0||d.mutation instanceof rn)?i=i.insert(l.key,l):d!==void 0?(o.set(l.key,d.mutation.getFieldMask()),Ti(d.mutation,l,d.mutation.getFieldMask(),ie.now())):o.set(l.key,rt.empty())}),this.recalculateAndSaveOverlays(e,i).next(u=>(u.forEach((l,d)=>o.set(l,d)),t.forEach((l,d)=>c.set(l,new VR(d,o.get(l)??null))),c))}recalculateAndSaveOverlays(e,t){const r=wi();let s=new he((o,c)=>o-c),i=J();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(const c of o)c.keys().forEach(u=>{const l=t.get(u);if(l===null)return;let d=r.get(u)||rt.empty();d=c.applyToLocalView(l,d),r.set(u,d);const f=(s.get(c.batchId)||J()).add(u);s=s.insert(c.batchId,f)})}).next(()=>{const o=[],c=s.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),l=u.key,d=u.value,f=T_();d.forEach(m=>{if(!i.has(m)){const y=C_(t.get(m),r.get(m));y!==null&&f.set(m,y),i=i.add(m)}}),o.push(this.documentOverlayCache.saveOverlays(e,l,f))}return b.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,s){return BS(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Tl(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):b.resolve(xt());let c=rs,u=i;return o.next(l=>b.forEach(l,(d,f)=>(c<f.largestBatchId&&(c=f.largestBatchId),i.get(d)?b.resolve():this.remoteDocumentCache.getEntry(e,d).next(m=>{u=u.insert(d,m)}))).next(()=>this.populateOverlays(e,l,i)).next(()=>this.computeViews(e,u,l,J())).next(d=>({batchId:c,changes:w_(d)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new M(t)).next(r=>{let s=di();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let o=di();return this.indexManager.getCollectionParents(e,i).next(c=>b.forEach(c,u=>{const l=function(f,m){return new tn(m,null,f.explicitOrderBy.slice(),f.filters.slice(),f.limit,f.limitType,f.startAt,f.endAt)}(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,l,r,s).next(d=>{d.forEach((f,m)=>{o=o.insert(f,m)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s))).next(o=>{i.forEach((u,l)=>{const d=l.getKey();o.get(d)===null&&(o=o.insert(d,fe.newInvalidDocument(d)))});let c=di();return o.forEach((u,l)=>{const d=i.get(u);d!==void 0&&Ti(d.mutation,l,rt.empty(),ie.now()),to(t,l)&&(c=c.insert(u,l))}),c})}}/**
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
 */class OR{constructor(e){this.serializer=e,this.Nr=new Map,this.Br=new Map}getBundleMetadata(e,t){return b.resolve(this.Nr.get(t))}saveBundleMetadata(e,t){return this.Nr.set(t.id,function(s){return{id:s.id,version:s.version,createTime:be(s.createTime)}}(t)),b.resolve()}getNamedQuery(e,t){return b.resolve(this.Br.get(t))}saveNamedQuery(e,t){return this.Br.set(t.name,function(s){return{name:s.name,query:nc(s.bundledQuery),readTime:be(s.readTime)}}(t)),b.resolve()}}/**
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
 */class MR{constructor(){this.overlays=new he(M.comparator),this.Lr=new Map}getOverlay(e,t){return b.resolve(this.overlays.get(t))}getOverlays(e,t){const r=xt();return b.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((s,i)=>{this.St(e,t,i)}),b.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Lr.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Lr.delete(r)),b.resolve()}getOverlaysForCollection(e,t,r){const s=xt(),i=t.length+1,o=new M(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const u=c.getNext().value,l=u.getKey();if(!t.isPrefixOf(l.path))break;l.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return b.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new he((l,d)=>l-d);const o=this.overlays.getIterator();for(;o.hasNext();){const l=o.getNext().value;if(l.getKey().getCollectionGroup()===t&&l.largestBatchId>r){let d=i.get(l.largestBatchId);d===null&&(d=xt(),i=i.insert(l.largestBatchId,d)),d.set(l.getKey(),l)}}const c=xt(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((l,d)=>c.set(l,d)),!(c.size()>=s)););return b.resolve(c)}St(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.Lr.get(s.largestBatchId).delete(r.key);this.Lr.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new Pl(t,r));let i=this.Lr.get(t);i===void 0&&(i=J(),this.Lr.set(t,i)),this.Lr.set(t,i.add(r.key))}}/**
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
 */class LR{constructor(){this.sessionToken=Ie.EMPTY_BYTE_STRING}getSessionToken(e){return b.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,b.resolve()}}/**
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
 */class Nl{constructor(){this.kr=new ce(Oe.qr),this.Kr=new ce(Oe.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(e,t){const r=new Oe(e,t);this.kr=this.kr.add(r),this.Kr=this.Kr.add(r)}$r(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Wr(new Oe(e,t))}Qr(e,t){e.forEach(r=>this.removeReference(r,t))}Gr(e){const t=new M(new Z([])),r=new Oe(t,e),s=new Oe(t,e+1),i=[];return this.Kr.forEachInRange([r,s],o=>{this.Wr(o),i.push(o.key)}),i}zr(){this.kr.forEach(e=>this.Wr(e))}Wr(e){this.kr=this.kr.delete(e),this.Kr=this.Kr.delete(e)}jr(e){const t=new M(new Z([])),r=new Oe(t,e),s=new Oe(t,e+1);let i=J();return this.Kr.forEachInRange([r,s],o=>{i=i.add(o.key)}),i}containsKey(e){const t=new Oe(e,0),r=this.kr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class Oe{constructor(e,t){this.key=e,this.Jr=t}static qr(e,t){return M.comparator(e.key,t.key)||H(e.Jr,t.Jr)}static Ur(e,t){return H(e.Jr,t.Jr)||M.comparator(e.key,t.key)}}/**
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
 */class FR{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Yn=1,this.Hr=new ce(Oe.qr)}checkEmpty(e){return b.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new Sl(i,t,r,s);this.mutationQueue.push(o);for(const c of s)this.Hr=this.Hr.add(new Oe(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return b.resolve(o)}lookupMutationBatch(e,t){return b.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.Xr(r),i=s<0?0:s;return b.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return b.resolve(this.mutationQueue.length===0?Cn:this.Yn-1)}getAllMutationBatches(e){return b.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new Oe(t,0),s=new Oe(t,Number.POSITIVE_INFINITY),i=[];return this.Hr.forEachInRange([r,s],o=>{const c=this.Zr(o.Jr);i.push(c)}),b.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new ce(H);return t.forEach(s=>{const i=new Oe(s,0),o=new Oe(s,Number.POSITIVE_INFINITY);this.Hr.forEachInRange([i,o],c=>{r=r.add(c.Jr)})}),b.resolve(this.Yr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;M.isDocumentKey(i)||(i=i.child(""));const o=new Oe(new M(i),0);let c=new ce(H);return this.Hr.forEachWhile(u=>{const l=u.key.path;return!!r.isPrefixOf(l)&&(l.length===s&&(c=c.add(u.Jr)),!0)},o),b.resolve(this.Yr(c))}Yr(e){const t=[];return e.forEach(r=>{const s=this.Zr(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){q(this.ei(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Hr;return b.forEach(t.mutations,s=>{const i=new Oe(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Hr=r})}nr(e){}containsKey(e,t){const r=new Oe(t,0),s=this.Hr.firstAfterOrEqual(r);return b.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,b.resolve()}ei(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class UR{constructor(e){this.ti=e,this.docs=function(){return new he(M.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,o=this.ti(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return b.resolve(r?r.document.mutableCopy():fe.newInvalidDocument(t))}getEntries(e,t){let r=st();return t.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():fe.newInvalidDocument(s))}),b.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=st();const o=t.path,c=new M(o.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:l,value:{document:d}}=u.getNext();if(!o.isPrefixOf(l.path))break;l.path.length>o.length+1||fl(Og(d),r)<=0||(s.has(d.key)||to(t,d))&&(i=i.insert(d.key,d.mutableCopy()))}return b.resolve(i)}getAllFromCollectionGroup(e,t,r,s){j(9500)}ni(e,t){return b.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new BR(this)}getSize(e){return b.resolve(this.size)}}class BR extends oy{constructor(e){super(),this.Mr=e}applyChanges(e){const t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.Mr.addEntry(e,s)):this.Mr.removeEntry(r)}),b.waitFor(t)}getFromCache(e,t){return this.Mr.getEntry(e,t)}getAllFromCache(e,t){return this.Mr.getEntries(e,t)}}/**
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
 */class jR{constructor(e){this.persistence=e,this.ri=new nn(t=>mr(t),Zi),this.lastRemoteSnapshotVersion=$.min(),this.highestTargetId=0,this.ii=0,this.si=new Nl,this.targetCount=0,this.oi=Er._r()}forEachTarget(e,t){return this.ri.forEach((r,s)=>t(s)),b.resolve()}getLastRemoteSnapshotVersion(e){return b.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return b.resolve(this.ii)}allocateTargetId(e){return this.highestTargetId=this.oi.next(),b.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.ii&&(this.ii=t),b.resolve()}lr(e){this.ri.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.oi=new Er(t),this.highestTargetId=t),e.sequenceNumber>this.ii&&(this.ii=e.sequenceNumber)}addTargetData(e,t){return this.lr(t),this.targetCount+=1,b.resolve()}updateTargetData(e,t){return this.lr(t),b.resolve()}removeTargetData(e,t){return this.ri.delete(t.target),this.si.Gr(t.targetId),this.targetCount-=1,b.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.ri.forEach((o,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.ri.delete(o),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)}),b.waitFor(i).next(()=>s)}getTargetCount(e){return b.resolve(this.targetCount)}getTargetData(e,t){const r=this.ri.get(t)||null;return b.resolve(r)}addMatchingKeys(e,t,r){return this.si.$r(t,r),b.resolve()}removeMatchingKeys(e,t,r){this.si.Qr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(o=>{i.push(s.markPotentiallyOrphaned(e,o))}),b.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.si.Gr(t),b.resolve()}getMatchingKeysForTargetId(e,t){const r=this.si.jr(t);return b.resolve(r)}containsKey(e,t){return b.resolve(this.si.containsKey(t))}}/**
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
 */class Vl{constructor(e,t){this._i={},this.overlays={},this.ai=new nt(0),this.ui=!1,this.ui=!0,this.ci=new LR,this.referenceDelegate=e(this),this.li=new jR(this),this.indexManager=new SR,this.remoteDocumentCache=function(s){return new UR(s)}(r=>this.referenceDelegate.hi(r)),this.serializer=new Q_(t),this.Pi=new OR(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new MR,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this._i[e.toKey()];return r||(r=new FR(t,this.referenceDelegate),this._i[e.toKey()]=r),r}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(e,t,r){V("MemoryPersistence","Starting transaction:",e);const s=new GR(this.ai.next());return this.referenceDelegate.Ti(),r(s).next(i=>this.referenceDelegate.Ei(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Ii(e,t){return b.or(Object.values(this._i).map(r=>()=>r.containsKey(e,t)))}}class GR extends Lg{constructor(e){super(),this.currentSequenceNumber=e}}class ic{constructor(e){this.persistence=e,this.Ri=new Nl,this.Ai=null}static Vi(e){return new ic(e)}get di(){if(this.Ai)return this.Ai;throw j(60996)}addReference(e,t,r){return this.Ri.addReference(r,t),this.di.delete(r.toString()),b.resolve()}removeReference(e,t,r){return this.Ri.removeReference(r,t),this.di.add(r.toString()),b.resolve()}markPotentiallyOrphaned(e,t){return this.di.add(t.toString()),b.resolve()}removeTarget(e,t){this.Ri.Gr(t.targetId).forEach(s=>this.di.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.di.add(i.toString()))}).next(()=>r.removeTargetData(e,t))}Ti(){this.Ai=new Set}Ei(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return b.forEach(this.di,r=>{const s=M.fromPath(r);return this.mi(e,s).next(i=>{i||t.removeEntry(s,$.min())})}).next(()=>(this.Ai=null,t.apply(e)))}updateLimboDocument(e,t){return this.mi(e,t).next(r=>{r?this.di.delete(t.toString()):this.di.add(t.toString())})}hi(e){return 0}mi(e,t){return b.or([()=>b.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ii(e,t)])}}class Ta{constructor(e,t){this.persistence=e,this.fi=new nn(r=>ze(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=iy(this,t)}static Vi(e,t){return new Ta(e,t)}Ti(){}Ei(e){return b.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}dr(e){const t=this.pr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}pr(e){let t=0;return this.mr(e,r=>{t++}).next(()=>t)}mr(e,t){return b.forEach(this.fi,(r,s)=>this.wr(e,r,s).next(i=>i?b.resolve():t(s)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ni(e,o=>this.wr(e,o,t).next(c=>{c||(r++,i.removeEntry(o,$.min()))})).next(()=>i.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.fi.set(t,e.currentSequenceNumber),b.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.fi.set(r,e.currentSequenceNumber),b.resolve()}removeReference(e,t,r){return this.fi.set(r,e.currentSequenceNumber),b.resolve()}updateLimboDocument(e,t){return this.fi.set(t,e.currentSequenceNumber),b.resolve()}hi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Qo(e.data.value)),t}wr(e,t,r){return b.or([()=>this.persistence.Ii(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.fi.get(t);return b.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
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
 */class qR{constructor(e){this.serializer=e}k(e,t,r,s){const i=new za("createOrUpgrade",t);r<1&&s>=1&&(function(u){u.createObjectStore(Xi)}(e),function(u){u.createObjectStore(Ni,{keyPath:tS}),u.createObjectStore(gt,{keyPath:Sf,autoIncrement:!0}).createIndex(cr,Rf,{unique:!0}),u.createObjectStore(os)}(e),gp(e),function(u){u.createObjectStore(rr)}(e));let o=b.resolve();return r<3&&s>=3&&(r!==0&&(function(u){u.deleteObjectStore(cs),u.deleteObjectStore(as),u.deleteObjectStore(lr)}(e),gp(e)),o=o.next(()=>function(u){const l=u.store(lr),d={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:$.min().toTimestamp(),targetCount:0};return l.put(ma,d)}(i))),r<4&&s>=4&&(r!==0&&(o=o.next(()=>function(u,l){return l.store(gt).J().next(f=>{u.deleteObjectStore(gt),u.createObjectStore(gt,{keyPath:Sf,autoIncrement:!0}).createIndex(cr,Rf,{unique:!0});const m=l.store(gt),y=f.map(S=>m.put(S));return b.waitFor(y)})}(e,i))),o=o.next(()=>{(function(u){u.createObjectStore(us,{keyPath:lS})})(e)})),r<5&&s>=5&&(o=o.next(()=>this.gi(i))),r<6&&s>=6&&(o=o.next(()=>(function(u){u.createObjectStore(Vi)}(e),this.pi(i)))),r<7&&s>=7&&(o=o.next(()=>this.yi(i))),r<8&&s>=8&&(o=o.next(()=>this.wi(e,i))),r<9&&s>=9&&(o=o.next(()=>{(function(u){u.objectStoreNames.contains("remoteDocumentChanges")&&u.deleteObjectStore("remoteDocumentChanges")})(e)})),r<10&&s>=10&&(o=o.next(()=>this.Si(i))),r<11&&s>=11&&(o=o.next(()=>{(function(u){u.createObjectStore(Ka,{keyPath:hS})})(e),function(u){u.createObjectStore(Ha,{keyPath:dS})}(e)})),r<12&&s>=12&&(o=o.next(()=>{(function(u){const l=u.createObjectStore(Wa,{keyPath:IS});l.createIndex(vu,ES,{unique:!1}),l.createIndex(zg,wS,{unique:!1})})(e)})),r<13&&s>=13&&(o=o.next(()=>function(u){const l=u.createObjectStore(pa,{keyPath:rS});l.createIndex(Ho,sS),l.createIndex(jg,iS)}(e)).next(()=>this.bi(e,i)).next(()=>e.deleteObjectStore(rr))),r<14&&s>=14&&(o=o.next(()=>this.Di(e,i))),r<15&&s>=15&&(o=o.next(()=>function(u){u.createObjectStore(gl,{keyPath:fS,autoIncrement:!0}).createIndex(Au,pS,{unique:!1}),u.createObjectStore(yi,{keyPath:mS}).createIndex(qg,gS,{unique:!1}),u.createObjectStore(Ii,{keyPath:_S}).createIndex($g,yS,{unique:!1})}(e))),r<16&&s>=16&&(o=o.next(()=>{t.objectStore(yi).clear()}).next(()=>{t.objectStore(Ii).clear()})),r<17&&s>=17&&(o=o.next(()=>{(function(u){u.createObjectStore(_l,{keyPath:TS})})(e)})),r<18&&s>=18&&Em()&&(o=o.next(()=>{t.objectStore(yi).clear()}).next(()=>{t.objectStore(Ii).clear()})),o}pi(e){let t=0;return e.store(rr).ee((r,s)=>{t+=wa(s)}).next(()=>{const r={byteSize:t};return e.store(Vi).put(Tu,r)})}gi(e){const t=e.store(Ni),r=e.store(gt);return t.J().next(s=>b.forEach(s,i=>{const o=IDBKeyRange.bound([i.userId,Cn],[i.userId,i.lastAcknowledgedBatchId]);return r.J(cr,o).next(c=>b.forEach(c,u=>{q(u.userId===i.userId,18650,"Cannot process batch from unexpected user",{batchId:u.batchId});const l=ir(this.serializer,u);return ey(e,i.userId,l).next(()=>{})}))}))}yi(e){const t=e.store(cs),r=e.store(rr);return e.store(lr).get(ma).next(s=>{const i=[];return r.ee((o,c)=>{const u=new Z(o),l=function(f){return[0,ze(f)]}(u);i.push(t.get(l).next(d=>d?b.resolve():(f=>t.put({targetId:0,path:ze(f),sequenceNumber:s.highestListenSequenceNumber}))(u)))}).next(()=>b.waitFor(i))})}wi(e,t){e.createObjectStore(Oi,{keyPath:uS});const r=t.store(Oi),s=new kl,i=o=>{if(s.add(o)){const c=o.lastSegment(),u=o.popLast();return r.put({collectionId:c,parent:ze(u)})}};return t.store(rr).ee({Y:!0},(o,c)=>{const u=new Z(o);return i(u.popLast())}).next(()=>t.store(os).ee({Y:!0},([o,c,u],l)=>{const d=Ct(c);return i(d.popLast())}))}Si(e){const t=e.store(as);return t.ee((r,s)=>{const i=pi(s),o=J_(this.serializer,i);return t.put(o)})}bi(e,t){const r=t.store(rr),s=[];return r.ee((i,o)=>{const c=t.store(pa),u=function(f){return f.document?new M(Z.fromString(f.document.name).popFirst(5)):f.noDocument?M.fromSegments(f.noDocument.path):f.unknownDocument?M.fromSegments(f.unknownDocument.path):j(36783)}(o).path.toArray(),l={prefixPath:u.slice(0,u.length-2),collectionGroup:u[u.length-2],documentId:u[u.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};s.push(c.put(l))}).next(()=>b.waitFor(s))}Di(e,t){const r=t.store(gt),s=ay(this.serializer),i=new Vl(ic.Vi,this.serializer.yt);return r.J().next(o=>{const c=new Map;return o.forEach(u=>{let l=c.get(u.userId)??J();ir(this.serializer,u).keys().forEach(d=>l=l.add(d)),c.set(u.userId,l)}),b.forEach(c,(u,l)=>{const d=new Me(l),f=rc.wt(this.serializer,d),m=i.getIndexManager(d),y=sc.wt(d,this.serializer,m,i.referenceDelegate);return new cy(s,y,f,m).recalculateAndSaveOverlaysForDocumentKeys(new bu(t,nt.ce),u).next()})})}}function gp(n){n.createObjectStore(cs,{keyPath:aS}).createIndex(ml,cS,{unique:!0}),n.createObjectStore(as,{keyPath:"targetId"}).createIndex(Gg,oS,{unique:!0}),n.createObjectStore(lr)}const mn="IndexedDbPersistence",Yc=18e5,Xc=5e3,Zc="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",uy="main";class Ol{constructor(e,t,r,s,i,o,c,u,l,d,f=18){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=r,this.Ci=i,this.window=o,this.document=c,this.Fi=l,this.Mi=d,this.xi=f,this.ai=null,this.ui=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Oi=null,this.inForeground=!1,this.Ni=null,this.Bi=null,this.Li=Number.NEGATIVE_INFINITY,this.ki=m=>Promise.resolve(),!Ol.v())throw new N(P.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new DR(this,s),this.qi=t+uy,this.serializer=new Q_(u),this.Ki=new Ot(this.qi,this.xi,new qR(this.serializer)),this.ci=new ER,this.li=new PR(this.referenceDelegate,this.serializer),this.remoteDocumentCache=ay(this.serializer),this.Pi=new IR,this.window&&this.window.localStorage?this.Ui=this.window.localStorage:(this.Ui=null,d===!1&&ve(mn,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.$i().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new N(P.FAILED_PRECONDITION,Zc);return this.Wi(),this.Qi(),this.Gi(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.li.getHighestSequenceNumber(e))}).then(e=>{this.ai=new nt(e,this.Fi)}).then(()=>{this.ui=!0}).catch(e=>(this.Ki&&this.Ki.close(),Promise.reject(e)))}zi(e){return this.ki=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.Ki.K(async t=>{t.newVersion===null&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Ci.enqueueAndForget(async()=>{this.started&&await this.$i()}))}$i(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>Mo(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.ji(e).next(t=>{t||(this.isPrimary=!1,this.Ci.enqueueRetryable(()=>this.ki(!1)))})}).next(()=>this.Ji(e)).next(t=>this.isPrimary&&!t?this.Hi(e).next(()=>!1):!!t&&this.Zi(e).next(()=>!0))).catch(e=>{if(jn(e))return V(mn,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return V(mn,"Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.Ci.enqueueRetryable(()=>this.ki(e)),this.isPrimary=e})}ji(e){return oi(e).get(Mr).next(t=>b.resolve(this.Xi(t)))}Yi(e){return Mo(e).delete(this.clientId)}async es(){if(this.isPrimary&&!this.ts(this.Li,Yc)){this.Li=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",t=>{const r=Ne(t,us);return r.J().next(s=>{const i=this.ns(s,Yc),o=s.filter(c=>i.indexOf(c)===-1);return b.forEach(o,c=>r.delete(c.clientId)).next(()=>o)})}).catch(()=>[]);if(this.Ui)for(const t of e)this.Ui.removeItem(this.rs(t.clientId))}}Gi(){this.Bi=this.Ci.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.$i().then(()=>this.es()).then(()=>this.Gi()))}Xi(e){return!!e&&e.ownerId===this.clientId}Ji(e){return this.Mi?b.resolve(!0):oi(e).get(Mr).next(t=>{if(t!==null&&this.ts(t.leaseTimestampMs,Xc)&&!this.ss(t.ownerId)){if(this.Xi(t)&&this.networkEnabled)return!0;if(!this.Xi(t)){if(!t.allowTabSynchronization)throw new N(P.FAILED_PRECONDITION,Zc);return!1}}return!(!this.networkEnabled||!this.inForeground)||Mo(e).J().next(r=>this.ns(r,Xc).find(s=>{if(this.clientId!==s.clientId){const i=!this.networkEnabled&&s.networkEnabled,o=!this.inForeground&&s.inForeground,c=this.networkEnabled===s.networkEnabled;if(i||o&&c)return!0}return!1})===void 0)}).next(t=>(this.isPrimary!==t&&V(mn,`Client ${t?"is":"is not"} eligible for a primary lease.`),t))}async shutdown(){this.ui=!1,this._s(),this.Bi&&(this.Bi.cancel(),this.Bi=null),this.us(),this.cs(),await this.Ki.runTransaction("shutdown","readwrite",[Xi,us],e=>{const t=new bu(e,nt.ce);return this.Hi(t).next(()=>this.Yi(t))}),this.Ki.close(),this.ls()}ns(e,t){return e.filter(r=>this.ts(r.updateTimeMs,t)&&!this.ss(r.clientId))}hs(){return this.runTransaction("getActiveClients","readonly",e=>Mo(e).J().next(t=>this.ns(t,Yc).map(r=>r.clientId)))}get started(){return this.ui}getGlobalsCache(){return this.ci}getMutationQueue(e,t){return sc.wt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new RR(e,this.serializer.yt.databaseId)}getDocumentOverlayCache(e){return rc.wt(this.serializer,e)}getBundleCache(){return this.Pi}runTransaction(e,t,r){V(mn,"Starting transaction:",e);const s=t==="readonly"?"readonly":"readwrite",i=function(u){return u===18?bS:u===17?Qg:u===16?vS:u===15?yl:u===14?Wg:u===13?Hg:u===12?AS:u===11?Kg:void j(60245)}(this.xi);let o;return this.Ki.runTransaction(e,s,i,c=>(o=new bu(c,this.ai?this.ai.next():nt.ce),t==="readwrite-primary"?this.ji(o).next(u=>!!u||this.Ji(o)).next(u=>{if(!u)throw ve(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Ci.enqueueRetryable(()=>this.ki(!1)),new N(P.FAILED_PRECONDITION,Mg);return r(o)}).next(u=>this.Zi(o).next(()=>u)):this.Ps(o).next(()=>r(o)))).then(c=>(o.raiseOnCommittedEvent(),c))}Ps(e){return oi(e).get(Mr).next(t=>{if(t!==null&&this.ts(t.leaseTimestampMs,Xc)&&!this.ss(t.ownerId)&&!this.Xi(t)&&!(this.Mi||this.allowTabSynchronization&&t.allowTabSynchronization))throw new N(P.FAILED_PRECONDITION,Zc)})}Zi(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return oi(e).put(Mr,t)}static v(){return Ot.v()}Hi(e){const t=oi(e);return t.get(Mr).next(r=>this.Xi(r)?(V(mn,"Releasing primary lease."),t.delete(Mr)):b.resolve())}ts(e,t){const r=Date.now();return!(e<r-t)&&(!(e>r)||(ve(`Detected an update time that is in the future: ${e} > ${r}`),!1))}Wi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ni=()=>{this.Ci.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.$i()))},this.document.addEventListener("visibilitychange",this.Ni),this.inForeground=this.document.visibilityState==="visible")}us(){this.Ni&&(this.document.removeEventListener("visibilitychange",this.Ni),this.Ni=null)}Qi(){var e;typeof((e=this.window)==null?void 0:e.addEventListener)=="function"&&(this.Oi=()=>{this._s();const t=/(?:Version|Mobile)\/1[456]/;Im()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.Ci.enterRestrictedMode(!0),this.Ci.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Oi))}cs(){this.Oi&&(this.window.removeEventListener("pagehide",this.Oi),this.Oi=null)}ss(e){var t;try{const r=((t=this.Ui)==null?void 0:t.getItem(this.rs(e)))!==null;return V(mn,`Client '${e}' ${r?"is":"is not"} zombied in LocalStorage`),r}catch(r){return ve(mn,"Failed to get zombied client id.",r),!1}}_s(){if(this.Ui)try{this.Ui.setItem(this.rs(this.clientId),String(Date.now()))}catch(e){ve("Failed to set zombie client id.",e)}}ls(){if(this.Ui)try{this.Ui.removeItem(this.rs(this.clientId))}catch{}}rs(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function oi(n){return Ne(n,Xi)}function Mo(n){return Ne(n,us)}function Ml(n,e){let t=n.projectId;return n.isDefaultDatabase||(t+="."+n.database),"firestore/"+e+"/"+t+"/"}/**
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
 */class Ll{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Ts=r,this.Es=s}static Is(e,t){let r=J(),s=J();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new Ll(e,t.fromCache,r,s)}}/**
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
 */class $R{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class ly{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=function(){return Im()?8:Fg(De())>0?6:4}()}initialize(e,t){this.fs=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.gs(e,t).next(o=>{i.result=o}).next(()=>{if(!i.result)return this.ps(e,t,s,r).next(o=>{i.result=o})}).next(()=>{if(i.result)return;const o=new $R;return this.ys(e,t,o).next(c=>{if(i.result=c,this.As)return this.ws(e,t,o,c.size)})}).next(()=>i.result)}ws(e,t,r,s){return r.documentReadCount<this.Vs?(Gr()<=te.DEBUG&&V("QueryEngine","SDK will not create cache indexes for query:",qr(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),b.resolve()):(Gr()<=te.DEBUG&&V("QueryEngine","Query:",qr(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.ds*s?(Gr()<=te.DEBUG&&V("QueryEngine","The SDK decides to create cache indexes for query:",qr(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Ke(t))):b.resolve())}gs(e,t){if(Bf(t))return b.resolve(null);let r=Ke(t);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=ya(t,null,"F"),r=Ke(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const o=J(...i);return this.fs.getDocuments(e,o).next(c=>this.indexManager.getMinOffset(e,r).next(u=>{const l=this.Ss(t,c);return this.bs(t,l,o,u.readTime)?this.gs(e,ya(t,null,"F")):this.Ds(e,l,t,u)}))})))}ps(e,t,r,s){return Bf(t)||s.isEqual($.min())?b.resolve(null):this.fs.getDocuments(e,r).next(i=>{const o=this.Ss(t,i);return this.bs(t,o,r,s)?b.resolve(null):(Gr()<=te.DEBUG&&V("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),qr(t)),this.Ds(e,o,t,Vg(s,rs)).next(c=>c))})}Ss(e,t){let r=new ce(I_(e));return t.forEach((s,i)=>{to(e,i)&&(r=r.add(i))}),r}bs(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}ys(e,t,r){return Gr()<=te.DEBUG&&V("QueryEngine","Using full collection scan to execute query:",qr(t)),this.fs.getDocumentsMatchingQuery(e,t,pt.min(),r)}Ds(e,t,r,s){return this.fs.getDocumentsMatchingQuery(e,r,s).next(i=>(t.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
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
 */const Fl="LocalStore",zR=3e8;class KR{constructor(e,t,r,s){this.persistence=e,this.Cs=t,this.serializer=s,this.vs=new he(H),this.Fs=new nn(i=>mr(i),Zi),this.Ms=new Map,this.xs=e.getRemoteDocumentCache(),this.li=e.getTargetCache(),this.Pi=e.getBundleCache(),this.Os(r)}Os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new cy(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.vs))}}function hy(n,e,t,r){return new KR(n,e,t,r)}async function dy(n,e){const t=L(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,t.Os(e),t.mutationQueue.getAllMutationBatches(r))).next(i=>{const o=[],c=[];let u=J();for(const l of s){o.push(l.batchId);for(const d of l.mutations)u=u.add(d.key)}for(const l of i){c.push(l.batchId);for(const d of l.mutations)u=u.add(d.key)}return t.localDocuments.getDocuments(r,u).next(l=>({Ns:l,removedBatchIds:o,addedBatchIds:c}))})})}function HR(n,e){const t=L(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=t.xs.newChangeBuffer({trackRemovals:!0});return function(c,u,l,d){const f=l.batch,m=f.keys();let y=b.resolve();return m.forEach(S=>{y=y.next(()=>d.getEntry(u,S)).next(x=>{const k=l.docVersions.get(S);q(k!==null,48541),x.version.compareTo(k)<0&&(f.applyToRemoteDocument(x,l),x.isValidDocument()&&(x.setReadTime(l.commitVersion),d.addEntry(x)))})}),y.next(()=>c.mutationQueue.removeMutationBatch(u,f))}(t,r,e,i).next(()=>i.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let u=J();for(let l=0;l<c.mutationResults.length;++l)c.mutationResults[l].transformResults.length>0&&(u=u.add(c.batch.mutations[l].key));return u}(e))).next(()=>t.localDocuments.getDocuments(r,s))})}function fy(n){const e=L(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.li.getLastRemoteSnapshotVersion(t))}function WR(n,e){const t=L(n),r=e.snapshotVersion;let s=t.vs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=t.xs.newChangeBuffer({trackRemovals:!0});s=t.vs;const c=[];e.targetChanges.forEach((d,f)=>{const m=s.get(f);if(!m)return;c.push(t.li.removeMatchingKeys(i,d.removedDocuments,f).next(()=>t.li.addMatchingKeys(i,d.addedDocuments,f)));let y=m.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(f)!==null?y=y.withResumeToken(Ie.EMPTY_BYTE_STRING,$.min()).withLastLimboFreeSnapshotVersion($.min()):d.resumeToken.approximateByteSize()>0&&(y=y.withResumeToken(d.resumeToken,r)),s=s.insert(f,y),function(x,k,O){return x.resumeToken.approximateByteSize()===0||k.snapshotVersion.toMicroseconds()-x.snapshotVersion.toMicroseconds()>=zR?!0:O.addedDocuments.size+O.modifiedDocuments.size+O.removedDocuments.size>0}(m,y,d)&&c.push(t.li.updateTargetData(i,y))});let u=st(),l=J();if(e.documentUpdates.forEach(d=>{e.resolvedLimboDocuments.has(d)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,d))}),c.push(py(i,o,e.documentUpdates).next(d=>{u=d.Bs,l=d.Ls})),!r.isEqual($.min())){const d=t.li.getLastRemoteSnapshotVersion(i).next(f=>t.li.setTargetsMetadata(i,i.currentSequenceNumber,r));c.push(d)}return b.waitFor(c).next(()=>o.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,u,l)).next(()=>u)}).then(i=>(t.vs=s,i))}function py(n,e,t){let r=J(),s=J();return t.forEach(i=>r=r.add(i)),e.getEntries(n,r).next(i=>{let o=st();return t.forEach((c,u)=>{const l=i.get(c);u.isFoundDocument()!==l.isFoundDocument()&&(s=s.add(c)),u.isNoDocument()&&u.version.isEqual($.min())?(e.removeEntry(c,u.readTime),o=o.insert(c,u)):!l.isValidDocument()||u.version.compareTo(l.version)>0||u.version.compareTo(l.version)===0&&l.hasPendingWrites?(e.addEntry(u),o=o.insert(c,u)):V(Fl,"Ignoring outdated watch update for ",c,". Current version:",l.version," Watch version:",u.version)}),{Bs:o,Ls:s}})}function QR(n,e){const t=L(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=Cn),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function gs(n,e){const t=L(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return t.li.getTargetData(r,e).next(i=>i?(s=i,b.resolve(s)):t.li.allocateTargetId(r).next(o=>(s=new qt(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.li.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=t.vs.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.vs=t.vs.insert(r.targetId,r),t.Fs.set(e,r.targetId)),r})}async function _s(n,e,t){const r=L(n),s=r.vs.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,o=>r.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!jn(o))throw o;V(Fl,`Failed to update sequence numbers for target ${e}: ${o}`)}r.vs=r.vs.remove(e),r.Fs.delete(s.target)}function Aa(n,e,t){const r=L(n);let s=$.min(),i=J();return r.persistence.runTransaction("Execute query","readwrite",o=>function(u,l,d){const f=L(u),m=f.Fs.get(d);return m!==void 0?b.resolve(f.vs.get(m)):f.li.getTargetData(l,d)}(r,o,Ke(e)).next(c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.li.getMatchingKeysForTargetId(o,c.targetId).next(u=>{i=u})}).next(()=>r.Cs.getDocumentsMatchingQuery(o,e,t?s:$.min(),t?i:J())).next(c=>(_y(r,y_(e),c),{documents:c,ks:i})))}function my(n,e){const t=L(n),r=L(t.li),s=t.vs.get(e);return s?Promise.resolve(s.target):t.persistence.runTransaction("Get target data","readonly",i=>r.At(i,e).next(o=>o?o.target:null))}function gy(n,e){const t=L(n),r=t.Ms.get(e)||$.min();return t.persistence.runTransaction("Get new document changes","readonly",s=>t.xs.getAllFromCollectionGroup(s,e,Vg(r,rs),Number.MAX_SAFE_INTEGER)).then(s=>(_y(t,e,s),s))}function _y(n,e,t){let r=n.Ms.get(e)||$.min();t.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),n.Ms.set(e,r)}async function JR(n,e,t,r){const s=L(n);let i=J(),o=st();for(const l of t){const d=e.qs(l.metadata.name);l.document&&(i=i.add(d));const f=e.Ks(l);f.setReadTime(e.Us(l.metadata.readTime)),o=o.insert(d,f)}const c=s.xs.newChangeBuffer({trackRemovals:!0}),u=await gs(s,function(d){return Ke(Rs(Z.fromString(`__bundle__/docs/${d}`)))}(r));return s.persistence.runTransaction("Apply bundle documents","readwrite",l=>py(l,c,o).next(d=>(c.apply(l),d)).next(d=>s.li.removeMatchingKeysForTargetId(l,u.targetId).next(()=>s.li.addMatchingKeys(l,i,u.targetId)).next(()=>s.localDocuments.getLocalViewOfDocuments(l,d.Bs,d.Ls)).next(()=>d.Bs)))}async function YR(n,e,t=J()){const r=await gs(n,Ke(nc(e.bundledQuery))),s=L(n);return s.persistence.runTransaction("Save named query","readwrite",i=>{const o=be(e.readTime);if(r.snapshotVersion.compareTo(o)>=0)return s.Pi.saveNamedQuery(i,e);const c=r.withResumeToken(Ie.EMPTY_BYTE_STRING,o);return s.vs=s.vs.insert(c.targetId,c),s.li.updateTargetData(i,c).next(()=>s.li.removeMatchingKeysForTargetId(i,r.targetId)).next(()=>s.li.addMatchingKeys(i,t,r.targetId)).next(()=>s.Pi.saveNamedQuery(i,e))})}/**
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
 */const yy="firestore_clients";function _p(n,e){return`${yy}_${n}_${e}`}const Iy="firestore_mutations";function yp(n,e,t){let r=`${Iy}_${n}_${t}`;return e.isAuthenticated()&&(r+=`_${e.uid}`),r}const Ey="firestore_targets";function eu(n,e){return`${Ey}_${n}_${e}`}/**
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
 */const Pt="SharedClientState";class va{constructor(e,t,r,s){this.user=e,this.batchId=t,this.state=r,this.error=s}static $s(e,t,r){const s=JSON.parse(r);let i,o=typeof s=="object"&&["pending","acknowledged","rejected"].indexOf(s.state)!==-1&&(s.error===void 0||typeof s.error=="object");return o&&s.error&&(o=typeof s.error.message=="string"&&typeof s.error.code=="string",o&&(i=new N(s.error.code,s.error.message))),o?new va(e,t,s.state,i):(ve(Pt,`Failed to parse mutation state for ID '${t}': ${r}`),null)}Ws(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class vi{constructor(e,t,r){this.targetId=e,this.state=t,this.error=r}static $s(e,t){const r=JSON.parse(t);let s,i=typeof r=="object"&&["not-current","current","rejected"].indexOf(r.state)!==-1&&(r.error===void 0||typeof r.error=="object");return i&&r.error&&(i=typeof r.error.message=="string"&&typeof r.error.code=="string",i&&(s=new N(r.error.code,r.error.message))),i?new vi(e,r.state,s):(ve(Pt,`Failed to parse target state for ID '${e}': ${t}`),null)}Ws(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class ba{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static $s(e,t){const r=JSON.parse(t);let s=typeof r=="object"&&r.activeTargetIds instanceof Array,i=Al();for(let o=0;s&&o<r.activeTargetIds.length;++o)s=Ug(r.activeTargetIds[o]),i=i.add(r.activeTargetIds[o]);return s?new ba(e,i):(ve(Pt,`Failed to parse client data for instance '${e}': ${t}`),null)}}class Ul{constructor(e,t){this.clientId=e,this.onlineState=t}static $s(e){const t=JSON.parse(e);return typeof t=="object"&&["Unknown","Online","Offline"].indexOf(t.onlineState)!==-1&&typeof t.clientId=="string"?new Ul(t.clientId,t.onlineState):(ve(Pt,`Failed to parse online state: ${e}`),null)}}class Uu{constructor(){this.activeTargetIds=Al()}Qs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class tu{constructor(e,t,r,s,i){this.window=e,this.Ci=t,this.persistenceKey=r,this.zs=s,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.js=this.Js.bind(this),this.Hs=new he(H),this.started=!1,this.Zs=[];const o=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=i,this.Xs=_p(this.persistenceKey,this.zs),this.Ys=function(u){return`firestore_sequence_number_${u}`}(this.persistenceKey),this.Hs=this.Hs.insert(this.zs,new Uu),this.eo=new RegExp(`^${yy}_${o}_([^_]*)$`),this.no=new RegExp(`^${Iy}_${o}_(\\d+)(?:_(.*))?$`),this.ro=new RegExp(`^${Ey}_${o}_(\\d+)$`),this.io=function(u){return`firestore_online_state_${u}`}(this.persistenceKey),this.so=function(u){return`firestore_bundle_loaded_v2_${u}`}(this.persistenceKey),this.window.addEventListener("storage",this.js)}static v(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.hs();for(const r of e){if(r===this.zs)continue;const s=this.getItem(_p(this.persistenceKey,r));if(s){const i=ba.$s(r,s);i&&(this.Hs=this.Hs.insert(i.clientId,i))}}this.oo();const t=this.storage.getItem(this.io);if(t){const r=this._o(t);r&&this.ao(r)}for(const r of this.Zs)this.Js(r);this.Zs=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(e){this.setItem(this.Ys,JSON.stringify(e))}getAllActiveQueryTargets(){return this.uo(this.Hs)}isActiveQueryTarget(e){let t=!1;return this.Hs.forEach((r,s)=>{s.activeTargetIds.has(e)&&(t=!0)}),t}addPendingMutation(e){this.co(e,"pending")}updateMutationState(e,t,r){this.co(e,t,r),this.lo(e)}addLocalQueryTarget(e,t=!0){let r="not-current";if(this.isActiveQueryTarget(e)){const s=this.storage.getItem(eu(this.persistenceKey,e));if(s){const i=vi.$s(e,s);i&&(r=i.state)}}return t&&this.ho.Qs(e),this.oo(),r}removeLocalQueryTarget(e){this.ho.Gs(e),this.oo()}isLocalQueryTarget(e){return this.ho.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(eu(this.persistenceKey,e))}updateQueryState(e,t,r){this.Po(e,t,r)}handleUserChange(e,t,r){t.forEach(s=>{this.lo(s)}),this.currentUser=e,r.forEach(s=>{this.addPendingMutation(s)})}setOnlineState(e){this.To(e)}notifyBundleLoaded(e){this.Eo(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.js),this.removeItem(this.Xs),this.started=!1)}getItem(e){const t=this.storage.getItem(e);return V(Pt,"READ",e,t),t}setItem(e,t){V(Pt,"SET",e,t),this.storage.setItem(e,t)}removeItem(e){V(Pt,"REMOVE",e),this.storage.removeItem(e)}Js(e){const t=e;if(t.storageArea===this.storage){if(V(Pt,"EVENT",t.key,t.newValue),t.key===this.Xs)return void ve("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.Ci.enqueueRetryable(async()=>{if(this.started){if(t.key!==null){if(this.eo.test(t.key)){if(t.newValue==null){const r=this.Io(t.key);return this.Ro(r,null)}{const r=this.Ao(t.key,t.newValue);if(r)return this.Ro(r.clientId,r)}}else if(this.no.test(t.key)){if(t.newValue!==null){const r=this.Vo(t.key,t.newValue);if(r)return this.mo(r)}}else if(this.ro.test(t.key)){if(t.newValue!==null){const r=this.fo(t.key,t.newValue);if(r)return this.po(r)}}else if(t.key===this.io){if(t.newValue!==null){const r=this._o(t.newValue);if(r)return this.ao(r)}}else if(t.key===this.Ys){const r=function(i){let o=nt.ce;if(i!=null)try{const c=JSON.parse(i);q(typeof c=="number",30636,{yo:i}),o=c}catch(c){ve(Pt,"Failed to read sequence number from WebStorage",c)}return o}(t.newValue);r!==nt.ce&&this.sequenceNumberHandler(r)}else if(t.key===this.so){const r=this.wo(t.newValue);await Promise.all(r.map(s=>this.syncEngine.So(s)))}}}else this.Zs.push(t)})}}get ho(){return this.Hs.get(this.zs)}oo(){this.setItem(this.Xs,this.ho.Ws())}co(e,t,r){const s=new va(this.currentUser,e,t,r),i=yp(this.persistenceKey,this.currentUser,e);this.setItem(i,s.Ws())}lo(e){const t=yp(this.persistenceKey,this.currentUser,e);this.removeItem(t)}To(e){const t={clientId:this.zs,onlineState:e};this.storage.setItem(this.io,JSON.stringify(t))}Po(e,t,r){const s=eu(this.persistenceKey,e),i=new vi(e,t,r);this.setItem(s,i.Ws())}Eo(e){const t=JSON.stringify(Array.from(e));this.setItem(this.so,t)}Io(e){const t=this.eo.exec(e);return t?t[1]:null}Ao(e,t){const r=this.Io(e);return ba.$s(r,t)}Vo(e,t){const r=this.no.exec(e),s=Number(r[1]),i=r[2]!==void 0?r[2]:null;return va.$s(new Me(i),s,t)}fo(e,t){const r=this.ro.exec(e),s=Number(r[1]);return vi.$s(s,t)}_o(e){return Ul.$s(e)}wo(e){return JSON.parse(e)}async mo(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.bo(e.batchId,e.state,e.error);V(Pt,`Ignoring mutation for non-active user ${e.user.uid}`)}po(e){return this.syncEngine.Do(e.targetId,e.state,e.error)}Ro(e,t){const r=t?this.Hs.insert(e,t):this.Hs.remove(e),s=this.uo(this.Hs),i=this.uo(r),o=[],c=[];return i.forEach(u=>{s.has(u)||o.push(u)}),s.forEach(u=>{i.has(u)||c.push(u)}),this.syncEngine.Co(o,c).then(()=>{this.Hs=r})}ao(e){this.Hs.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}uo(e){let t=Al();return e.forEach((r,s)=>{t=t.unionWith(s.activeTargetIds)}),t}}class wy{constructor(){this.vo=new Uu,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.vo.Qs(e),this.Fo[e]||"not-current"}updateQueryState(e,t,r){this.Fo[e]=t}removeLocalQueryTarget(e){this.vo.Gs(e)}isLocalQueryTarget(e){return this.vo.activeTargetIds.has(e)}clearQueryState(e){delete this.Fo[e]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(e){return this.vo.activeTargetIds.has(e)}start(){return this.vo=new Uu,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class XR{Mo(e){}shutdown(){}}/**
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
 */const Ip="ConnectivityMonitor";class Ep{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(e){this.Lo.push(e)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){V(Ip,"Network connectivity changed: AVAILABLE");for(const e of this.Lo)e(0)}Bo(){V(Ip,"Network connectivity changed: UNAVAILABLE");for(const e of this.Lo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let Lo=null;function Bu(){return Lo===null?Lo=function(){return 268435456+Math.round(2147483648*Math.random())}():Lo++,"0x"+Lo.toString(16)}/**
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
 */const nu="RestConnection",ZR={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class eP{get qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Ko=t+"://"+e.host,this.Uo=`projects/${r}/databases/${s}`,this.$o=this.databaseId.database===Li?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Wo(e,t,r,s,i){const o=Bu(),c=this.Qo(e,t.toUriEncodedString());V(nu,`Sending RPC '${e}' ${o}:`,c,r);const u={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(u,s,i);const{host:l}=new URL(c),d=Ut(l);return this.zo(e,c,u,r,d).then(f=>(V(nu,`Received RPC '${e}' ${o}: `,f),f),f=>{throw ct(nu,`RPC '${e}' ${o} failed with error: `,f,"url: ",c,"request:",r),f})}jo(e,t,r,s,i,o){return this.Wo(e,t,r,s,i)}Go(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Ss}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s)}Qo(e,t){const r=ZR[e];let s=`${this.Ko}/v1/${t}:${r}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
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
 */class tP{constructor(e){this.Jo=e.Jo,this.Ho=e.Ho}Zo(e){this.Xo=e}Yo(e){this.e_=e}t_(e){this.n_=e}onMessage(e){this.r_=e}close(){this.Ho()}send(e){this.Jo(e)}i_(){this.Xo()}s_(){this.e_()}o_(e){this.n_(e)}__(e){this.r_(e)}}/**
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
 */const Ge="WebChannelConnection",ai=(n,e,t)=>{n.listen(e,r=>{try{t(r)}catch(s){setTimeout(()=>{throw s},0)}})};class Xr extends eP{constructor(e){super(e),this.a_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static u_(){if(!Xr.c_){const e=bg();ai(e,vg.STAT_EVENT,t=>{t.stat===_u.PROXY?V(Ge,"STAT_EVENT: detected buffering proxy"):t.stat===_u.NOPROXY&&V(Ge,"STAT_EVENT: detected no buffering proxy")}),Xr.c_=!0}}zo(e,t,r,s,i){const o=Bu();return new Promise((c,u)=>{const l=new Tg;l.setWithCredentials(!0),l.listenOnce(Ag.COMPLETE,()=>{try{switch(l.getLastErrorCode()){case zo.NO_ERROR:const f=l.getResponseJson();V(Ge,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(f)),c(f);break;case zo.TIMEOUT:V(Ge,`RPC '${e}' ${o} timed out`),u(new N(P.DEADLINE_EXCEEDED,"Request time out"));break;case zo.HTTP_ERROR:const m=l.getStatus();if(V(Ge,`RPC '${e}' ${o} failed with status:`,m,"response text:",l.getResponseText()),m>0){let y=l.getResponseJson();Array.isArray(y)&&(y=y[0]);const S=y==null?void 0:y.error;if(S&&S.status&&S.message){const x=function(O){const U=O.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(U)>=0?U:P.UNKNOWN}(S.status);u(new N(x,S.message))}else u(new N(P.UNKNOWN,"Server responded with status "+l.getStatus()))}else u(new N(P.UNAVAILABLE,"Connection failed."));break;default:j(9055,{l_:e,streamId:o,h_:l.getLastErrorCode(),P_:l.getLastError()})}}finally{V(Ge,`RPC '${e}' ${o} completed.`)}});const d=JSON.stringify(s);V(Ge,`RPC '${e}' ${o} sending request:`,s),l.send(t,"POST",d,r,15)})}T_(e,t,r){const s=Bu(),i=[this.Ko,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=this.createWebChannelTransport(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(c.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Go(c.initMessageHeaders,t,r),c.encodeInitMessageHeaders=!0;const l=i.join("");V(Ge,`Creating RPC '${e}' stream ${s}: ${l}`,c);const d=o.createWebChannel(l,c);this.E_(d);let f=!1,m=!1;const y=new tP({Jo:S=>{m?V(Ge,`Not sending because RPC '${e}' stream ${s} is closed:`,S):(f||(V(Ge,`Opening RPC '${e}' stream ${s} transport.`),d.open(),f=!0),V(Ge,`RPC '${e}' stream ${s} sending:`,S),d.send(S))},Ho:()=>d.close()});return ai(d,hi.EventType.OPEN,()=>{m||(V(Ge,`RPC '${e}' stream ${s} transport opened.`),y.i_())}),ai(d,hi.EventType.CLOSE,()=>{m||(m=!0,V(Ge,`RPC '${e}' stream ${s} transport closed`),y.o_(),this.I_(d))}),ai(d,hi.EventType.ERROR,S=>{m||(m=!0,ct(Ge,`RPC '${e}' stream ${s} transport errored. Name:`,S.name,"Message:",S.message),y.o_(new N(P.UNAVAILABLE,"The operation could not be completed")))}),ai(d,hi.EventType.MESSAGE,S=>{var x;if(!m){const k=S.data[0];q(!!k,16349);const O=k,U=(O==null?void 0:O.error)||((x=O[0])==null?void 0:x.error);if(U){V(Ge,`RPC '${e}' stream ${s} received error:`,U);const B=U.status;let z=function(E){const I=Se[E];if(I!==void 0)return N_(I)}(B),W=U.message;B==="NOT_FOUND"&&W.includes("database")&&W.includes("does not exist")&&W.includes(this.databaseId.database)&&ct(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),z===void 0&&(z=P.INTERNAL,W="Unknown error status: "+B+" with message "+U.message),m=!0,y.o_(new N(z,W)),d.close()}else V(Ge,`RPC '${e}' stream ${s} received:`,k),y.__(k)}}),Xr.u_(),setTimeout(()=>{y.s_()},0),y}terminate(){this.a_.forEach(e=>e.close()),this.a_=[]}E_(e){this.a_.push(e)}I_(e){this.a_=this.a_.filter(t=>t===e)}Go(e,t,r){super.Go(e,t,r),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return Sg()}}/**
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
 */function nP(n){return new Xr(n)}/**
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
 */function Ty(){return typeof window<"u"?window:null}function ea(){return typeof document<"u"?document:null}/**
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
 */function Sr(n){return new cR(n,!0)}/**
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
 */Xr.c_=!1;class Bl{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Ci=e,this.timerId=t,this.R_=r,this.A_=s,this.V_=i,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();const t=Math.floor(this.d_+this.y_()),r=Math.max(0,Date.now()-this.f_),s=Math.max(0,t-r);s>0&&V("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.d_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,s,()=>(this.f_=Date.now(),e())),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
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
 */const wp="PersistentStream";class Ay{constructor(e,t,r,s,i,o,c,u){this.Ci=e,this.S_=r,this.b_=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Bl(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.K_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.K_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===P.RESOURCE_EXHAUSTED?(ve(t.toString()),ve("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.t_(t)}W_(){}auth(){this.state=1;const e=this.Q_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.D_===t&&this.G_(r,s)},r=>{e(()=>{const s=new N(P.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(s)})})}G_(e,t){const r=this.Q_(this.D_);this.stream=this.j_(e,t),this.stream.Zo(()=>{r(()=>this.listener.Zo())}),this.stream.Yo(()=>{r(()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.Yo()))}),this.stream.t_(s=>{r(()=>this.z_(s))}),this.stream.onMessage(s=>{r(()=>++this.F_==1?this.J_(s):this.onNext(s))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return V(wp,`close with error: ${e}`),this.stream=null,this.close(4,e)}Q_(e){return t=>{this.Ci.enqueueAndForget(()=>this.D_===e?t():(V(wp,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class rP extends Ay{constructor(e,t,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,o),this.serializer=i}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=hR(this.serializer,e),r=function(i){if(!("targetChange"in i))return $.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?$.min():o.readTime?be(o.readTime):$.min()}(e);return this.listener.H_(t,r)}Z_(e){const t={};t.database=Vu(this.serializer),t.addTarget=function(i,o){let c;const u=o.target;if(c=ga(u)?{documents:G_(i,u)}:{query:tc(i,u).ft},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=L_(i,o.resumeToken);const l=ku(i,o.expectedCount);l!==null&&(c.expectedCount=l)}else if(o.snapshotVersion.compareTo($.min())>0){c.readTime=ms(i,o.snapshotVersion.toTimestamp());const l=ku(i,o.expectedCount);l!==null&&(c.expectedCount=l)}return c}(this.serializer,e);const r=fR(this.serializer,e);r&&(t.labels=r),this.q_(t)}X_(e){const t={};t.database=Vu(this.serializer),t.removeTarget=e,this.q_(t)}}class sP extends Ay{constructor(e,t,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,o),this.serializer=i}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return q(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,q(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){q(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=dR(e.writeResults,e.commitTime),r=be(e.commitTime);return this.listener.na(r,t)}ra(){const e={};e.database=Vu(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>Gi(this.serializer,r))};this.q_(t)}}/**
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
 */class iP{}class oP extends iP{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new N(P.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.Wo(e,Nu(t,r),s,i,o)).catch(i=>{throw i.name==="FirebaseError"?(i.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new N(P.UNKNOWN,i.toString())})}jo(e,t,r,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,c])=>this.connection.jo(e,Nu(t,r),s,o,c,i)).catch(o=>{throw o.name==="FirebaseError"?(o.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new N(P.UNKNOWN,o.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}function aP(n,e,t,r){return new oP(n,e,t,r)}class cP{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
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
 */const wr="RemoteStore";class uP{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ea=new Map,this.Ia=new Set,this.Ra=[],this.Aa=i,this.Aa.Mo(o=>{r.enqueueAndForget(async()=>{qn(this)&&(V(wr,"Restarting streams for network reachability change."),await async function(u){const l=L(u);l.Ia.add(4),await xs(l),l.Va.set("Unknown"),l.Ia.delete(4),await io(l)}(this))})}),this.Va=new cP(r,s)}}async function io(n){if(qn(n))for(const e of n.Ra)await e(!0)}async function xs(n){for(const e of n.Ra)await e(!1)}function oc(n,e){const t=L(n);t.Ea.has(e.targetId)||(t.Ea.set(e.targetId,e),ql(t)?Gl(t):ks(t).O_()&&jl(t,e))}function ys(n,e){const t=L(n),r=ks(t);t.Ea.delete(e),r.O_()&&vy(t,e),t.Ea.size===0&&(r.O_()?r.L_():qn(t)&&t.Va.set("Unknown"))}function jl(n,e){if(n.da.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo($.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}ks(n).Z_(e)}function vy(n,e){n.da.$e(e),ks(n).X_(e)}function Gl(n){n.da=new sR({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),At:e=>n.Ea.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),ks(n).start(),n.Va.ua()}function ql(n){return qn(n)&&!ks(n).x_()&&n.Ea.size>0}function qn(n){return L(n).Ia.size===0}function by(n){n.da=void 0}async function lP(n){n.Va.set("Online")}async function hP(n){n.Ea.forEach((e,t)=>{jl(n,e)})}async function dP(n,e){by(n),ql(n)?(n.Va.ha(e),Gl(n)):n.Va.set("Unknown")}async function fP(n,e,t){if(n.Va.set("Online"),e instanceof M_&&e.state===2&&e.cause)try{await async function(s,i){const o=i.cause;for(const c of i.targetIds)s.Ea.has(c)&&(await s.remoteSyncer.rejectListen(c,o),s.Ea.delete(c),s.da.removeTarget(c))}(n,e)}catch(r){V(wr,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Sa(n,r)}else if(e instanceof Xo?n.da.Xe(e):e instanceof O_?n.da.st(e):n.da.tt(e),!t.isEqual($.min()))try{const r=await fy(n.localStore);t.compareTo(r)>=0&&await function(i,o){const c=i.da.Tt(o);return c.targetChanges.forEach((u,l)=>{if(u.resumeToken.approximateByteSize()>0){const d=i.Ea.get(l);d&&i.Ea.set(l,d.withResumeToken(u.resumeToken,o))}}),c.targetMismatches.forEach((u,l)=>{const d=i.Ea.get(u);if(!d)return;i.Ea.set(u,d.withResumeToken(Ie.EMPTY_BYTE_STRING,d.snapshotVersion)),vy(i,u);const f=new qt(d.target,u,l,d.sequenceNumber);jl(i,f)}),i.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(r){V(wr,"Failed to raise snapshot:",r),await Sa(n,r)}}async function Sa(n,e,t){if(!jn(e))throw e;n.Ia.add(1),await xs(n),n.Va.set("Offline"),t||(t=()=>fy(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{V(wr,"Retrying IndexedDB access"),await t(),n.Ia.delete(1),await io(n)})}function Sy(n,e){return e().catch(t=>Sa(n,t,e))}async function Ds(n){const e=L(n),t=Mn(e);let r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:Cn;for(;pP(e);)try{const s=await QR(e.localStore,r);if(s===null){e.Ta.length===0&&t.L_();break}r=s.batchId,mP(e,s)}catch(s){await Sa(e,s)}Ry(e)&&Py(e)}function pP(n){return qn(n)&&n.Ta.length<10}function mP(n,e){n.Ta.push(e);const t=Mn(n);t.O_()&&t.Y_&&t.ea(e.mutations)}function Ry(n){return qn(n)&&!Mn(n).x_()&&n.Ta.length>0}function Py(n){Mn(n).start()}async function gP(n){Mn(n).ra()}async function _P(n){const e=Mn(n);for(const t of n.Ta)e.ea(t.mutations)}async function yP(n,e,t){const r=n.Ta.shift(),s=Rl.from(r,e,t);await Sy(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await Ds(n)}async function IP(n,e){e&&Mn(n).Y_&&await async function(r,s){if(function(o){return k_(o)&&o!==P.ABORTED}(s.code)){const i=r.Ta.shift();Mn(r).B_(),await Sy(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await Ds(r)}}(n,e),Ry(n)&&Py(n)}async function Tp(n,e){const t=L(n);t.asyncQueue.verifyOperationInProgress(),V(wr,"RemoteStore received new credentials");const r=qn(t);t.Ia.add(3),await xs(t),r&&t.Va.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ia.delete(3),await io(t)}async function ju(n,e){const t=L(n);e?(t.Ia.delete(2),await io(t)):e||(t.Ia.add(2),await xs(t),t.Va.set("Unknown"))}function ks(n){return n.ma||(n.ma=function(t,r,s){const i=L(t);return i.sa(),new rP(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{Zo:lP.bind(null,n),Yo:hP.bind(null,n),t_:dP.bind(null,n),H_:fP.bind(null,n)}),n.Ra.push(async e=>{e?(n.ma.B_(),ql(n)?Gl(n):n.Va.set("Unknown")):(await n.ma.stop(),by(n))})),n.ma}function Mn(n){return n.fa||(n.fa=function(t,r,s){const i=L(t);return i.sa(),new sP(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),Yo:gP.bind(null,n),t_:IP.bind(null,n),ta:_P.bind(null,n),na:yP.bind(null,n)}),n.Ra.push(async e=>{e?(n.fa.B_(),await Ds(n)):(await n.fa.stop(),n.Ta.length>0&&(V(wr,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))})),n.fa}/**
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
 */class $l{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Fe,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const o=Date.now()+r,c=new $l(e,t,o,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new N(P.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Ns(n,e){if(ve("AsyncQueue",`${e}: ${n}`),jn(n))return new N(P.UNAVAILABLE,`${e}: ${n}`);throw n}/**
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
 */class hr{static emptySet(e){return new hr(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||M.comparator(t.key,r.key):(t,r)=>M.comparator(t.key,r.key),this.keyedMap=di(),this.sortedSet=new he(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof hr)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
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
 */class Ap{constructor(){this.ga=new he(M.comparator)}track(e){const t=e.doc.key,r=this.ga.get(t);r?e.type!==0&&r.type===3?this.ga=this.ga.insert(t,e):e.type===3&&r.type!==1?this.ga=this.ga.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.ga=this.ga.remove(t):e.type===1&&r.type===2?this.ga=this.ga.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):j(63341,{Vt:e,pa:r}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal((t,r)=>{e.push(r)}),e}}class Tr{constructor(e,t,r,s,i,o,c,u,l){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=l}static fromInitialDocuments(e,t,r,s,i){const o=[];return t.forEach(c=>{o.push({type:0,doc:c})}),new Tr(e,t,hr.emptySet(t),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&eo(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
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
 */class EP{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class wP{constructor(){this.queries=vp(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,r){const s=L(t),i=s.queries;s.queries=vp(),i.forEach((o,c)=>{for(const u of c.Sa)u.onError(r)})})(this,new N(P.ABORTED,"Firestore shutting down"))}}function vp(){return new nn(n=>__(n),eo)}async function zl(n,e){const t=L(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.ba()&&e.Da()&&(r=2):(i=new EP,r=e.Da()?0:1);try{switch(r){case 0:i.wa=await t.onListen(s,!0);break;case 1:i.wa=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(o){const c=Ns(o,`Initialization of query '${qr(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.Sa.push(e),e.va(t.onlineState),i.wa&&e.Fa(i.wa)&&Hl(t)}async function Kl(n,e){const t=L(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const o=i.Sa.indexOf(e);o>=0&&(i.Sa.splice(o,1),i.Sa.length===0?s=e.Da()?0:1:!i.ba()&&e.Da()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function TP(n,e){const t=L(n);let r=!1;for(const s of e){const i=s.query,o=t.queries.get(i);if(o){for(const c of o.Sa)c.Fa(s)&&(r=!0);o.wa=s}}r&&Hl(t)}function AP(n,e,t){const r=L(n),s=r.queries.get(e);if(s)for(const i of s.Sa)i.onError(t);r.queries.delete(e)}function Hl(n){n.Ca.forEach(e=>{e.next()})}var Gu,bp;(bp=Gu||(Gu={})).Ma="default",bp.Cache="cache";class Wl{constructor(e,t,r){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new Tr(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const r=t!=="Offline";return(!this.options.qa||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=Tr.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==Gu.Cache}}/**
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
 */class Cy{constructor(e,t){this.Ka=e,this.byteLength=t}Ua(){return"metadata"in this.Ka}}/**
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
 */class Sp{constructor(e){this.serializer=e}qs(e){return Mt(this.serializer,e)}Ks(e){return e.metadata.exists?ec(this.serializer,e.document,!1):fe.newNoDocument(this.qs(e.metadata.name),this.Us(e.metadata.readTime))}Us(e){return be(e)}}class Ql{constructor(e,t){this.$a=e,this.serializer=t,this.Wa=[],this.Qa=[],this.collectionGroups=new Set,this.progress=xy(e)}get queries(){return this.Wa}get documents(){return this.Qa}Ga(e){this.progress.bytesLoaded+=e.byteLength;let t=this.progress.documentsLoaded;if(e.Ka.namedQuery)this.Wa.push(e.Ka.namedQuery);else if(e.Ka.documentMetadata){this.Qa.push({metadata:e.Ka.documentMetadata}),e.Ka.documentMetadata.exists||++t;const r=Z.fromString(e.Ka.documentMetadata.name);this.collectionGroups.add(r.get(r.length-2))}else e.Ka.document&&(this.Qa[this.Qa.length-1].document=e.Ka.document,++t);return t!==this.progress.documentsLoaded?(this.progress.documentsLoaded=t,{...this.progress}):null}za(e){const t=new Map,r=new Sp(this.serializer);for(const s of e)if(s.metadata.queries){const i=r.qs(s.metadata.name);for(const o of s.metadata.queries){const c=(t.get(o)||J()).add(i);t.set(o,c)}}return t}async ja(e){const t=await JR(e,new Sp(this.serializer),this.Qa,this.$a.id),r=this.za(this.documents);for(const s of this.Wa)await YR(e,s,r.get(s.name));return this.progress.taskState="Success",{progress:this.progress,Ja:this.collectionGroups,Ha:t}}}function xy(n){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:n.totalDocuments,totalBytes:n.totalBytes}}/**
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
 */class Dy{constructor(e){this.key=e}}class ky{constructor(e){this.key=e}}class Ny{constructor(e,t){this.query=e,this.Za=t,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=J(),this.mutatedKeys=J(),this.eu=I_(e),this.tu=new hr(this.eu)}get nu(){return this.Za}ru(e,t){const r=t?t.iu:new Ap,s=t?t.tu:this.tu;let i=t?t.mutatedKeys:this.mutatedKeys,o=s,c=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,l=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((d,f)=>{const m=s.get(d),y=to(this.query,f)?f:null,S=!!m&&this.mutatedKeys.has(m.key),x=!!y&&(y.hasLocalMutations||this.mutatedKeys.has(y.key)&&y.hasCommittedMutations);let k=!1;m&&y?m.data.isEqual(y.data)?S!==x&&(r.track({type:3,doc:y}),k=!0):this.su(m,y)||(r.track({type:2,doc:y}),k=!0,(u&&this.eu(y,u)>0||l&&this.eu(y,l)<0)&&(c=!0)):!m&&y?(r.track({type:0,doc:y}),k=!0):m&&!y&&(r.track({type:1,doc:m}),k=!0,(u||l)&&(c=!0)),k&&(y?(o=o.add(y),i=x?i.add(d):i.delete(d)):(o=o.delete(d),i=i.delete(d)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const d=this.query.limitType==="F"?o.last():o.first();o=o.delete(d.key),i=i.delete(d.key),r.track({type:1,doc:d})}return{tu:o,iu:r,bs:c,mutatedKeys:i}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const o=e.iu.ya();o.sort((d,f)=>function(y,S){const x=k=>{switch(k){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return j(20277,{Vt:k})}};return x(y)-x(S)}(d.type,f.type)||this.eu(d.doc,f.doc)),this.ou(r),s=s??!1;const c=t&&!s?this._u():[],u=this.Ya.size===0&&this.current&&!s?1:0,l=u!==this.Xa;return this.Xa=u,o.length!==0||l?{snapshot:new Tr(this.query,e.tu,i,o,e.mutatedKeys,u===0,l,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:c}:{au:c}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Ap,mutatedKeys:this.mutatedKeys,bs:!1},!1)):{au:[]}}uu(e){return!this.Za.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(t=>this.Za=this.Za.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Za=this.Za.delete(t)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Ya;this.Ya=J(),this.tu.forEach(r=>{this.uu(r.key)&&(this.Ya=this.Ya.add(r.key))});const t=[];return e.forEach(r=>{this.Ya.has(r)||t.push(new ky(r))}),this.Ya.forEach(r=>{e.has(r)||t.push(new Dy(r))}),t}cu(e){this.Za=e.ks,this.Ya=J();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return Tr.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Xa===0,this.hasCachedResults)}}const $n="SyncEngine";class vP{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class bP{constructor(e){this.key=e,this.hu=!1}}class SP{constructor(e,t,r,s,i,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Pu={},this.Tu=new nn(c=>__(c),eo),this.Eu=new Map,this.Iu=new Set,this.Ru=new he(M.comparator),this.Au=new Map,this.Vu=new Nl,this.du={},this.mu=new Map,this.fu=Er.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function RP(n,e,t=!0){const r=ac(n);let s;const i=r.Tu.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await Vy(r,e,t,!0),s}async function PP(n,e){const t=ac(n);await Vy(t,e,!0,!1)}async function Vy(n,e,t,r){const s=await gs(n.localStore,Ke(e)),i=s.targetId,o=n.sharedClientState.addLocalQueryTarget(i,t);let c;return r&&(c=await Jl(n,e,i,o==="current",s.resumeToken)),n.isPrimaryClient&&t&&oc(n.remoteStore,s),c}async function Jl(n,e,t,r,s){n.pu=(f,m,y)=>async function(x,k,O,U){let B=k.view.ru(O);B.bs&&(B=await Aa(x.localStore,k.query,!1).then(({documents:E})=>k.view.ru(E,B)));const z=U&&U.targetChanges.get(k.targetId),W=U&&U.targetMismatches.get(k.targetId)!=null,Q=k.view.applyChanges(B,x.isPrimaryClient,z,W);return qu(x,k.targetId,Q.au),Q.snapshot}(n,f,m,y);const i=await Aa(n.localStore,e,!0),o=new Ny(e,i.ks),c=o.ru(i.documents),u=so.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),l=o.applyChanges(c,n.isPrimaryClient,u);qu(n,t,l.au);const d=new vP(e,t,o);return n.Tu.set(e,d),n.Eu.has(t)?n.Eu.get(t).push(e):n.Eu.set(t,[e]),l.snapshot}async function CP(n,e,t){const r=L(n),s=r.Tu.get(e),i=r.Eu.get(s.targetId);if(i.length>1)return r.Eu.set(s.targetId,i.filter(o=>!eo(o,e))),void r.Tu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await _s(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),t&&ys(r.remoteStore,s.targetId),Is(r,s.targetId)}).catch(Bn)):(Is(r,s.targetId),await _s(r.localStore,s.targetId,!0))}async function xP(n,e){const t=L(n),r=t.Tu.get(e),s=t.Eu.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),ys(t.remoteStore,r.targetId))}async function DP(n,e,t){const r=eh(n);try{const s=await function(o,c){const u=L(o),l=ie.now(),d=c.reduce((y,S)=>y.add(S.key),J());let f,m;return u.persistence.runTransaction("Locally write mutations","readwrite",y=>{let S=st(),x=J();return u.xs.getEntries(y,d).next(k=>{S=k,S.forEach((O,U)=>{U.isValidDocument()||(x=x.add(O))})}).next(()=>u.localDocuments.getOverlayedDocuments(y,S)).next(k=>{f=k;const O=[];for(const U of c){const B=eR(U,f.get(U.key).overlayedDocument);B!=null&&O.push(new rn(U.key,B,o_(B.value.mapValue),ge.exists(!0)))}return u.mutationQueue.addMutationBatch(y,l,O,c)}).next(k=>{m=k;const O=k.applyToLocalDocumentSet(f,x);return u.documentOverlayCache.saveOverlays(y,k.batchId,O)})}).then(()=>({batchId:m.batchId,changes:w_(f)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(o,c,u){let l=o.du[o.currentUser.toKey()];l||(l=new he(H)),l=l.insert(c,u),o.du[o.currentUser.toKey()]=l}(r,s.batchId,t),await sn(r,s.changes),await Ds(r.remoteStore)}catch(s){const i=Ns(s,"Failed to persist write");t.reject(i)}}async function Oy(n,e){const t=L(n);try{const r=await WR(t.localStore,e);e.targetChanges.forEach((s,i)=>{const o=t.Au.get(i);o&&(q(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?o.hu=!0:s.modifiedDocuments.size>0?q(o.hu,14607):s.removedDocuments.size>0&&(q(o.hu,42227),o.hu=!1))}),await sn(t,r,e)}catch(r){await Bn(r)}}function Rp(n,e,t){const r=L(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Tu.forEach((i,o)=>{const c=o.view.va(e);c.snapshot&&s.push(c.snapshot)}),function(o,c){const u=L(o);u.onlineState=c;let l=!1;u.queries.forEach((d,f)=>{for(const m of f.Sa)m.va(c)&&(l=!0)}),l&&Hl(u)}(r.eventManager,e),s.length&&r.Pu.H_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function kP(n,e,t){const r=L(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Au.get(e),i=s&&s.key;if(i){let o=new he(M.comparator);o=o.insert(i,fe.newNoDocument(i,$.min()));const c=J().add(i),u=new ro($.min(),new Map,new he(H),o,c);await Oy(r,u),r.Ru=r.Ru.remove(i),r.Au.delete(e),Zl(r)}else await _s(r.localStore,e,!1).then(()=>Is(r,e,t)).catch(Bn)}async function NP(n,e){const t=L(n),r=e.batch.batchId;try{const s=await HR(t.localStore,e);Xl(t,r,null),Yl(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await sn(t,s)}catch(s){await Bn(s)}}async function VP(n,e,t){const r=L(n);try{const s=await function(o,c){const u=L(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",l=>{let d;return u.mutationQueue.lookupMutationBatch(l,c).next(f=>(q(f!==null,37113),d=f.keys(),u.mutationQueue.removeMutationBatch(l,f))).next(()=>u.mutationQueue.performConsistencyCheck(l)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(l,d,c)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(l,d)).next(()=>u.localDocuments.getDocuments(l,d))})}(r.localStore,e);Xl(r,e,t),Yl(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await sn(r,s)}catch(s){await Bn(s)}}async function OP(n,e){const t=L(n);qn(t.remoteStore)||V($n,"The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const r=await function(o){const c=L(o);return c.persistence.runTransaction("Get highest unacknowledged batch id","readonly",u=>c.mutationQueue.getHighestUnacknowledgedBatchId(u))}(t.localStore);if(r===Cn)return void e.resolve();const s=t.mu.get(r)||[];s.push(e),t.mu.set(r,s)}catch(r){const s=Ns(r,"Initialization of waitForPendingWrites() operation failed");e.reject(s)}}function Yl(n,e){(n.mu.get(e)||[]).forEach(t=>{t.resolve()}),n.mu.delete(e)}function Xl(n,e,t){const r=L(n);let s=r.du[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.du[r.currentUser.toKey()]=s}}function Is(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Eu.get(e))n.Tu.delete(r),t&&n.Pu.yu(r,t);n.Eu.delete(e),n.isPrimaryClient&&n.Vu.Gr(e).forEach(r=>{n.Vu.containsKey(r)||My(n,r)})}function My(n,e){n.Iu.delete(e.path.canonicalString());const t=n.Ru.get(e);t!==null&&(ys(n.remoteStore,t),n.Ru=n.Ru.remove(e),n.Au.delete(t),Zl(n))}function qu(n,e,t){for(const r of t)r instanceof Dy?(n.Vu.addReference(r.key,e),MP(n,r)):r instanceof ky?(V($n,"Document no longer in limbo: "+r.key),n.Vu.removeReference(r.key,e),n.Vu.containsKey(r.key)||My(n,r.key)):j(19791,{wu:r})}function MP(n,e){const t=e.key,r=t.path.canonicalString();n.Ru.get(t)||n.Iu.has(r)||(V($n,"New document in limbo: "+t),n.Iu.add(r),Zl(n))}function Zl(n){for(;n.Iu.size>0&&n.Ru.size<n.maxConcurrentLimboResolutions;){const e=n.Iu.values().next().value;n.Iu.delete(e);const t=new M(Z.fromString(e)),r=n.fu.next();n.Au.set(r,new bP(t)),n.Ru=n.Ru.insert(t,r),oc(n.remoteStore,new qt(Ke(Rs(t.path)),r,"TargetPurposeLimboResolution",nt.ce))}}async function sn(n,e,t){const r=L(n),s=[],i=[],o=[];r.Tu.isEmpty()||(r.Tu.forEach((c,u)=>{o.push(r.pu(u,e,t).then(l=>{var d;if((l||t)&&r.isPrimaryClient){const f=l?!l.fromCache:(d=t==null?void 0:t.targetChanges.get(u.targetId))==null?void 0:d.current;r.sharedClientState.updateQueryState(u.targetId,f?"current":"not-current")}if(l){s.push(l);const f=Ll.Is(u.targetId,l);i.push(f)}}))}),await Promise.all(o),r.Pu.H_(s),await async function(u,l){const d=L(u);try{await d.persistence.runTransaction("notifyLocalViewChanges","readwrite",f=>b.forEach(l,m=>b.forEach(m.Ts,y=>d.persistence.referenceDelegate.addReference(f,m.targetId,y)).next(()=>b.forEach(m.Es,y=>d.persistence.referenceDelegate.removeReference(f,m.targetId,y)))))}catch(f){if(!jn(f))throw f;V(Fl,"Failed to update sequence numbers: "+f)}for(const f of l){const m=f.targetId;if(!f.fromCache){const y=d.vs.get(m),S=y.snapshotVersion,x=y.withLastLimboFreeSnapshotVersion(S);d.vs=d.vs.insert(m,x)}}}(r.localStore,i))}async function LP(n,e){const t=L(n);if(!t.currentUser.isEqual(e)){V($n,"User change. New user:",e.toKey());const r=await dy(t.localStore,e);t.currentUser=e,function(i,o){i.mu.forEach(c=>{c.forEach(u=>{u.reject(new N(P.CANCELLED,o))})}),i.mu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await sn(t,r.Ns)}}function FP(n,e){const t=L(n),r=t.Au.get(e);if(r&&r.hu)return J().add(r.key);{let s=J();const i=t.Eu.get(e);if(!i)return s;for(const o of i){const c=t.Tu.get(o);s=s.unionWith(c.view.nu)}return s}}async function UP(n,e){const t=L(n),r=await Aa(t.localStore,e.query,!0),s=e.view.cu(r);return t.isPrimaryClient&&qu(t,e.targetId,s.au),s}async function BP(n,e){const t=L(n);return gy(t.localStore,e).then(r=>sn(t,r))}async function jP(n,e,t,r){const s=L(n),i=await function(c,u){const l=L(c),d=L(l.mutationQueue);return l.persistence.runTransaction("Lookup mutation documents","readonly",f=>d.Xn(f,u).next(m=>m?l.localDocuments.getDocuments(f,m):b.resolve(null)))}(s.localStore,e);i!==null?(t==="pending"?await Ds(s.remoteStore):t==="acknowledged"||t==="rejected"?(Xl(s,e,r||null),Yl(s,e),function(c,u){L(L(c).mutationQueue).nr(u)}(s.localStore,e)):j(6720,"Unknown batchState",{Su:t}),await sn(s,i)):V($n,"Cannot apply mutation batch with id: "+e)}async function GP(n,e){const t=L(n);if(ac(t),eh(t),e===!0&&t.gu!==!0){const r=t.sharedClientState.getAllActiveQueryTargets(),s=await Pp(t,r.toArray());t.gu=!0,await ju(t.remoteStore,!0);for(const i of s)oc(t.remoteStore,i)}else if(e===!1&&t.gu!==!1){const r=[];let s=Promise.resolve();t.Eu.forEach((i,o)=>{t.sharedClientState.isLocalQueryTarget(o)?r.push(o):s=s.then(()=>(Is(t,o),_s(t.localStore,o,!0))),ys(t.remoteStore,o)}),await s,await Pp(t,r),function(o){const c=L(o);c.Au.forEach((u,l)=>{ys(c.remoteStore,l)}),c.Vu.zr(),c.Au=new Map,c.Ru=new he(M.comparator)}(t),t.gu=!1,await ju(t.remoteStore,!1)}}async function Pp(n,e,t){const r=L(n),s=[],i=[];for(const o of e){let c;const u=r.Eu.get(o);if(u&&u.length!==0){c=await gs(r.localStore,Ke(u[0]));for(const l of u){const d=r.Tu.get(l),f=await UP(r,d);f.snapshot&&i.push(f.snapshot)}}else{const l=await my(r.localStore,o);c=await gs(r.localStore,l),await Jl(r,Ly(l),o,!1,c.resumeToken)}s.push(c)}return r.Pu.H_(i),s}function Ly(n){return p_(n.path,n.collectionGroup,n.orderBy,n.filters,n.limit,"F",n.startAt,n.endAt)}function qP(n){return function(t){return L(L(t).persistence).hs()}(L(n).localStore)}async function $P(n,e,t,r){const s=L(n);if(s.gu)return void V($n,"Ignoring unexpected query state notification.");const i=s.Eu.get(e);if(i&&i.length>0)switch(t){case"current":case"not-current":{const o=await gy(s.localStore,y_(i[0])),c=ro.createSynthesizedRemoteEventForCurrentChange(e,t==="current",Ie.EMPTY_BYTE_STRING);await sn(s,o,c);break}case"rejected":await _s(s.localStore,e,!0),Is(s,e,r);break;default:j(64155,t)}}async function zP(n,e,t){const r=ac(n);if(r.gu){for(const s of e){if(r.Eu.has(s)&&r.sharedClientState.isActiveQueryTarget(s)){V($n,"Adding an already active target "+s);continue}const i=await my(r.localStore,s),o=await gs(r.localStore,i);await Jl(r,Ly(i),o.targetId,!1,o.resumeToken),oc(r.remoteStore,o)}for(const s of t)r.Eu.has(s)&&await _s(r.localStore,s,!1).then(()=>{ys(r.remoteStore,s),Is(r,s)}).catch(Bn)}}function ac(n){const e=L(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Oy.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=FP.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=kP.bind(null,e),e.Pu.H_=TP.bind(null,e.eventManager),e.Pu.yu=AP.bind(null,e.eventManager),e}function eh(n){const e=L(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=NP.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=VP.bind(null,e),e}function KP(n,e,t){const r=L(n);(async function(i,o,c){try{const u=await o.getMetadata();if(await function(y,S){const x=L(y),k=be(S.createTime);return x.persistence.runTransaction("hasNewerBundle","readonly",O=>x.Pi.getBundleMetadata(O,S.id)).then(O=>!!O&&O.createTime.compareTo(k)>=0)}(i.localStore,u))return await o.close(),c._completeWith(function(y){return{taskState:"Success",documentsLoaded:y.totalDocuments,bytesLoaded:y.totalBytes,totalDocuments:y.totalDocuments,totalBytes:y.totalBytes}}(u)),Promise.resolve(new Set);c._updateProgress(xy(u));const l=new Ql(u,o.serializer);let d=await o.bu();for(;d;){const m=await l.Ga(d);m&&c._updateProgress(m),d=await o.bu()}const f=await l.ja(i.localStore);return await sn(i,f.Ha,void 0),await function(y,S){const x=L(y);return x.persistence.runTransaction("Save bundle","readwrite",k=>x.Pi.saveBundleMetadata(k,S))}(i.localStore,u),c._completeWith(f.progress),Promise.resolve(f.Ja)}catch(u){return ct($n,`Loading bundle failed with ${u}`),c._failWith(u),Promise.resolve(new Set)}})(r,e,t).then(s=>{r.sharedClientState.notifyBundleLoaded(s)})}class Es{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Sr(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return hy(this.persistence,new ly,e.initialUser,this.serializer)}Cu(e){return new Vl(ic.Vi,this.serializer)}Du(e){return new wy}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Es.provider={build:()=>new Es};class th extends Es{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){q(this.persistence.referenceDelegate instanceof Ta,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new sy(r,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?$e.withCacheSize(this.cacheSizeBytes):$e.DEFAULT;return new Vl(r=>Ta.Vi(r,t),this.serializer)}}class nh extends Es{constructor(e,t,r){super(),this.xu=e,this.cacheSizeBytes=t,this.forceOwnership=r,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.xu.initialize(this,e),await eh(this.xu.syncEngine),await Ds(this.xu.remoteStore),await this.persistence.zi(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}vu(e){return hy(this.persistence,new ly,e.initialUser,this.serializer)}Fu(e,t){const r=this.persistence.referenceDelegate.garbageCollector;return new sy(r,e.asyncQueue,t)}Mu(e,t){const r=new Zb(t,this.persistence);return new Xb(e.asyncQueue,r)}Cu(e){const t=Ml(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),r=this.cacheSizeBytes!==void 0?$e.withCacheSize(this.cacheSizeBytes):$e.DEFAULT;return new Ol(this.synchronizeTabs,t,e.clientId,r,e.asyncQueue,Ty(),ea(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Du(e){return new wy}}class Fy extends nh{constructor(e,t){super(e,t,!1),this.xu=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const t=this.xu.syncEngine;this.sharedClientState instanceof tu&&(this.sharedClientState.syncEngine={bo:jP.bind(null,t),Do:$P.bind(null,t),Co:zP.bind(null,t),hs:qP.bind(null,t),So:BP.bind(null,t)},await this.sharedClientState.start()),await this.persistence.zi(async r=>{await GP(this.xu.syncEngine,r),this.gcScheduler&&(r&&!this.gcScheduler.started?this.gcScheduler.start():r||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(r&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():r||this.indexBackfillerScheduler.stop())})}Du(e){const t=Ty();if(!tu.v(t))throw new N(P.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const r=Ml(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new tu(t,e.asyncQueue,r,e.clientId,e.initialUser)}}class Ln{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Rp(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=LP.bind(null,this.syncEngine),await ju(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new wP}()}createDatastore(e){const t=Sr(e.databaseInfo.databaseId),r=nP(e.databaseInfo);return aP(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,s,i,o,c){return new uP(r,s,i,o,c)}(this.localStore,this.datastore,e.asyncQueue,t=>Rp(this.syncEngine,t,0),function(){return Ep.v()?new Ep:new XR}())}createSyncEngine(e,t){return function(s,i,o,c,u,l,d){const f=new SP(s,i,o,c,u,l);return d&&(f.gu=!0),f}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const i=L(s);V(wr,"RemoteStore shutting down."),i.Ia.add(5),await xs(i),i.Aa.shutdown(),i.Va.set("Unknown")}(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}}Ln.provider={build:()=>new Ln};function Cp(n,e=10240){let t=0;return{async read(){if(t<n.byteLength){const r={value:n.slice(t,t+e),done:!1};return t+=e,r}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.resolve()}}/**
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
 */class cc{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):ve("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
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
 */class HP{constructor(e,t){this.Bu=e,this.serializer=t,this.metadata=new Fe,this.buffer=new Uint8Array,this.Lu=function(){return new TextDecoder("utf-8")}(),this.ku().then(r=>{r&&r.Ua()?this.metadata.resolve(r.Ka.metadata):this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is
             ${JSON.stringify(r==null?void 0:r.Ka)}`))},r=>this.metadata.reject(r))}close(){return this.Bu.cancel()}async getMetadata(){return this.metadata.promise}async bu(){return await this.getMetadata(),this.ku()}async ku(){const e=await this.qu();if(e===null)return null;const t=this.Lu.decode(e),r=Number(t);isNaN(r)&&this.Ku(`length string (${t}) is not valid number`);const s=await this.Uu(r);return new Cy(JSON.parse(s),e.length+r)}$u(){return this.buffer.findIndex(e=>e===123)}async qu(){for(;this.$u()<0&&!await this.Wu(););if(this.buffer.length===0)return null;const e=this.$u();e<0&&this.Ku("Reached the end of bundle when a length string is expected.");const t=this.buffer.slice(0,e);return this.buffer=this.buffer.slice(e),t}async Uu(e){for(;this.buffer.length<e;)await this.Wu()&&this.Ku("Reached the end of bundle when more is expected.");const t=this.Lu.decode(this.buffer.slice(0,e));return this.buffer=this.buffer.slice(e),t}Ku(e){throw this.Bu.cancel(),new Error(`Invalid bundle format: ${e}`)}async Wu(){const e=await this.Bu.read();if(!e.done){const t=new Uint8Array(this.buffer.length+e.value.length);t.set(this.buffer),t.set(e.value,this.buffer.length),this.buffer=t}return e.done}}/**
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
 */class WP{constructor(e,t){this.bundleData=e,this.serializer=t,this.cursor=0,this.elements=[];let r=this.bu();if(!r||!r.Ua())throw new Error(`The first element of the bundle is not a metadata object, it is
         ${JSON.stringify(r==null?void 0:r.Ka)}`);this.metadata=r;do r=this.bu(),r!==null&&this.elements.push(r);while(r!==null)}getMetadata(){return this.metadata}Qu(){return this.elements}bu(){if(this.cursor===this.bundleData.length)return null;const e=this.qu(),t=this.Uu(e);return new Cy(JSON.parse(t),e)}Uu(e){if(this.cursor+e>this.bundleData.length)throw new N(P.INTERNAL,"Reached the end of bundle when more is expected.");return this.bundleData.slice(this.cursor,this.cursor+=e)}qu(){const e=this.cursor;let t=this.cursor;for(;t<this.bundleData.length;){if(this.bundleData[t]==="{"){if(t===e)throw new Error("First character is a bracket and not a number");return this.cursor=t,Number(this.bundleData.slice(e,t))}t++}throw new Error("Reached the end of bundle when more is expected.")}}/**
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
 */let QP=class{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new N(P.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const t=await async function(s,i){const o=L(s),c={documents:i.map(f=>ji(o.serializer,f))},u=await o.jo("BatchGetDocuments",o.serializer.databaseId,Z.emptyPath(),c,i.length),l=new Map;u.forEach(f=>{const m=lR(o.serializer,f);l.set(m.key.toString(),m)});const d=[];return i.forEach(f=>{const m=l.get(f.toString());q(!!m,55234,{key:f}),d.push(m)}),d}(this.datastore,e);return t.forEach(r=>this.recordVersion(r)),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(r){this.lastTransactionError=r}this.writtenDocs.add(e.toString())}delete(e){this.write(new Cs(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach(t=>{e.delete(t.key.toString())}),e.forEach((t,r)=>{const s=M.fromPath(r);this.mutations.push(new bl(s,this.precondition(s)))}),await async function(r,s){const i=L(r),o={writes:s.map(c=>Gi(i.serializer,c))};await i.Wo("Commit",i.serializer.databaseId,Z.emptyPath(),o)}(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw j(50498,{Gu:e.constructor.name});t=$.min()}const r=this.readVersions.get(e.key.toString());if(r){if(!t.isEqual(r))throw new N(P.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){const t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual($.min())?ge.exists(!1):ge.updateTime(t):ge.none()}preconditionForUpdate(e){const t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual($.min()))throw new N(P.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return ge.updateTime(t)}return ge.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}};/**
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
 */class JP{constructor(e,t,r,s,i){this.asyncQueue=e,this.datastore=t,this.options=r,this.updateFunction=s,this.deferred=i,this.zu=r.maxAttempts,this.M_=new Bl(this.asyncQueue,"transaction_retry")}ju(){this.zu-=1,this.Ju()}Ju(){this.M_.p_(async()=>{const e=new QP(this.datastore),t=this.Hu(e);t&&t.then(r=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(r)}).catch(s=>{this.Zu(s)}))}).catch(r=>{this.Zu(r)})})}Hu(e){try{const t=this.updateFunction(e);return!Yi(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}Zu(e){this.zu>0&&this.Xu(e)?(this.zu-=1,this.asyncQueue.enqueueAndForget(()=>(this.Ju(),Promise.resolve()))):this.deferred.reject(e)}Xu(e){if((e==null?void 0:e.name)==="FirebaseError"){const t=e.code;return t==="aborted"||t==="failed-precondition"||t==="already-exists"||!k_(t)}return!1}}/**
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
 */const Fn="FirestoreClient";class YP{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this._databaseInfo=s,this.user=Me.UNAUTHENTICATED,this.clientId=qa.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async o=>{V(Fn,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(V(Fn,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Fe;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=Ns(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function ru(n,e){n.asyncQueue.verifyOperationInProgress(),V(Fn,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await dy(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function xp(n,e){n.asyncQueue.verifyOperationInProgress();const t=await rh(n);V(Fn,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>Tp(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>Tp(e.remoteStore,s)),n._onlineComponents=e}async function rh(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){V(Fn,"Using user provided OfflineComponentProvider");try{await ru(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===P.FAILED_PRECONDITION||s.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;ct("Error using user provided cache. Falling back to memory cache: "+t),await ru(n,new Es)}}else V(Fn,"Using default OfflineComponentProvider"),await ru(n,new th(void 0));return n._offlineComponents}async function uc(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(V(Fn,"Using user provided OnlineComponentProvider"),await xp(n,n._uninitializedComponentsProvider._online)):(V(Fn,"Using default OnlineComponentProvider"),await xp(n,new Ln))),n._onlineComponents}function Uy(n){return rh(n).then(e=>e.persistence)}function Vs(n){return rh(n).then(e=>e.localStore)}function By(n){return uc(n).then(e=>e.remoteStore)}function sh(n){return uc(n).then(e=>e.syncEngine)}function jy(n){return uc(n).then(e=>e.datastore)}async function ws(n){const e=await uc(n),t=e.eventManager;return t.onListen=RP.bind(null,e.syncEngine),t.onUnlisten=CP.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=PP.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=xP.bind(null,e.syncEngine),t}function XP(n){return n.asyncQueue.enqueue(async()=>{const e=await Uy(n),t=await By(n);return e.setNetworkEnabled(!0),function(s){const i=L(s);return i.Ia.delete(0),io(i)}(t)})}function ZP(n){return n.asyncQueue.enqueue(async()=>{const e=await Uy(n),t=await By(n);return e.setNetworkEnabled(!1),async function(s){const i=L(s);i.Ia.add(0),await xs(i),i.Va.set("Offline")}(t)})}function e0(n,e,t,r){const s=new cc(r),i=new Wl(e,s,t);return n.asyncQueue.enqueueAndForget(async()=>zl(await ws(n),i)),()=>{s.Nu(),n.asyncQueue.enqueueAndForget(async()=>Kl(await ws(n),i))}}function t0(n,e){const t=new Fe;return n.asyncQueue.enqueueAndForget(async()=>async function(s,i,o){try{const c=await function(l,d){const f=L(l);return f.persistence.runTransaction("read document","readonly",m=>f.localDocuments.getDocument(m,d))}(s,i);c.isFoundDocument()?o.resolve(c):c.isNoDocument()?o.resolve(null):o.reject(new N(P.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(c){const u=Ns(c,`Failed to get document '${i} from cache`);o.reject(u)}}(await Vs(n),e,t)),t.promise}function Gy(n,e,t={}){const r=new Fe;return n.asyncQueue.enqueueAndForget(async()=>function(i,o,c,u,l){const d=new cc({next:m=>{d.Nu(),o.enqueueAndForget(()=>Kl(i,f));const y=m.docs.has(c);!y&&m.fromCache?l.reject(new N(P.UNAVAILABLE,"Failed to get document because the client is offline.")):y&&m.fromCache&&u&&u.source==="server"?l.reject(new N(P.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):l.resolve(m)},error:m=>l.reject(m)}),f=new Wl(Rs(c.path),d,{includeMetadataChanges:!0,qa:!0});return zl(i,f)}(await ws(n),n.asyncQueue,e,t,r)),r.promise}function n0(n,e){const t=new Fe;return n.asyncQueue.enqueueAndForget(async()=>async function(s,i,o){try{const c=await Aa(s,i,!0),u=new Ny(i,c.ks),l=u.ru(c.documents),d=u.applyChanges(l,!1);o.resolve(d.snapshot)}catch(c){const u=Ns(c,`Failed to execute query '${i} against cache`);o.reject(u)}}(await Vs(n),e,t)),t.promise}function qy(n,e,t={}){const r=new Fe;return n.asyncQueue.enqueueAndForget(async()=>function(i,o,c,u,l){const d=new cc({next:m=>{d.Nu(),o.enqueueAndForget(()=>Kl(i,f)),m.fromCache&&u.source==="server"?l.reject(new N(P.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):l.resolve(m)},error:m=>l.reject(m)}),f=new Wl(c,d,{includeMetadataChanges:!0,qa:!0});return zl(i,f)}(await ws(n),n.asyncQueue,e,t,r)),r.promise}function r0(n,e,t){const r=new Fe;return n.asyncQueue.enqueueAndForget(async()=>{try{const s=await jy(n);r.resolve(async function(o,c,u){var x;const l=L(o),{request:d,gt:f,parent:m}=q_(l.serializer,m_(c),u);l.connection.qo||delete d.parent;const y=(await l.jo("RunAggregationQuery",l.serializer.databaseId,m,d,1)).filter(k=>!!k.result);q(y.length===1,64727);const S=(x=y[0].result)==null?void 0:x.aggregateFields;return Object.keys(S).reduce((k,O)=>(k[f[O]]=S[O],k),{})}(s,e,t))}catch(s){r.reject(s)}}),r.promise}function s0(n,e){const t=new Fe;return n.asyncQueue.enqueueAndForget(async()=>DP(await sh(n),e,t)),t.promise}function i0(n,e){const t=new cc(e);return n.asyncQueue.enqueueAndForget(async()=>function(s,i){L(s).Ca.add(i),i.next()}(await ws(n),t)),()=>{t.Nu(),n.asyncQueue.enqueueAndForget(async()=>function(s,i){L(s).Ca.delete(i)}(await ws(n),t))}}function o0(n,e,t){const r=new Fe;return n.asyncQueue.enqueueAndForget(async()=>{const s=await jy(n);new JP(n.asyncQueue,s,t,e,r).ju()}),r.promise}function a0(n,e,t,r){const s=function(o,c){let u;return u=typeof o=="string"?V_().encode(o):o,function(d,f){return new HP(d,f)}(function(d,f){if(d instanceof Uint8Array)return Cp(d,f);if(d instanceof ArrayBuffer)return Cp(new Uint8Array(d),f);if(d instanceof ReadableStream)return d.getReader();throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")}(u),c)}(t,Sr(e));n.asyncQueue.enqueueAndForget(async()=>{KP(await sh(n),s,r)})}function c0(n,e){return n.asyncQueue.enqueue(async()=>function(r,s){const i=L(r);return i.persistence.runTransaction("Get named query","readonly",o=>i.Pi.getNamedQuery(o,s))}(await Vs(n),e))}function $y(n,e){return function(r,s){return new WP(r,s)}(n,e)}function u0(n,e){return n.asyncQueue.enqueue(async()=>async function(r,s){const i=L(r),o=i.indexManager,c=[];return i.persistence.runTransaction("Configure indexes","readwrite",u=>o.getFieldIndexes(u).next(l=>function(f,m,y,S,x){f=[...f],m=[...m],f.sort(y),m.sort(y);const k=f.length,O=m.length;let U=0,B=0;for(;U<O&&B<k;){const z=y(f[B],m[U]);z<0?x(f[B++]):z>0?S(m[U++]):(U++,B++)}for(;U<O;)S(m[U++]);for(;B<k;)x(f[B++])}(l,s,Wb,d=>{c.push(o.addFieldIndex(u,d))},d=>{c.push(o.deleteFieldIndex(u,d))})).next(()=>b.waitFor(c)))}(await Vs(n),e))}function l0(n,e){return n.asyncQueue.enqueue(async()=>function(r,s){L(r).Cs.As=s}(await Vs(n),e))}function h0(n){return n.asyncQueue.enqueue(async()=>function(t){const r=L(t),s=r.indexManager;return r.persistence.runTransaction("Delete All Indexes","readwrite",i=>s.deleteAllFieldIndexes(i))}(await Vs(n)))}/**
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
 */function zy(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
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
 */const d0="ComponentProvider",Dp=new Map;function f0(n,e,t,r,s){return new PS(n,e,t,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,zy(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,r)}/**
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
 */const Ky="firestore.googleapis.com",kp=!0;class Np{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new N(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Ky,this.ssl=kp}else this.host=e.host,this.ssl=e.ssl??kp;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Z_;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<ry)throw new N(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Dg("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=zy(e.experimentalLongPollingOptions??{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new N(P.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new N(P.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new N(P.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class oo{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Np({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new N(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new N(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Np(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new Cg;switch(r.type){case"firstParty":return new jb(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new N(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=Dp.get(t);r&&(V(d0,"Removing Datastore"),Dp.delete(t),r.terminate())}(this),Promise.resolve()}}function Hy(n,e,t,r={}){var l;n=ee(n,oo);const s=Ut(e),i=n._getSettings(),o={...i,emulatorOptions:n._getEmulatorOptions()},c=`${e}:${t}`;s&&zi(`https://${c}`),i.host!==Ky&&i.host!==c&&ct("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...i,host:c,ssl:s,emulatorOptions:r};if(!wt(u,o)&&(n._setSettings(u),r.mockUserToken)){let d,f;if(typeof r.mockUserToken=="string")d=r.mockUserToken,f=Me.MOCK_USER;else{d=_m(r.mockUserToken,(l=n._app)==null?void 0:l.options.projectId);const m=r.mockUserToken.sub||r.mockUserToken.user_id;if(!m)throw new N(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");f=new Me(m)}n._authCredentials=new Fb(new Pg(d,f))}}/**
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
 */class ke{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new ke(this.firestore,e,this._query)}}class ae{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new yt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new ae(this.firestore,e,this._key)}toJSON(){return{type:ae._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(br(t,ae._jsonSchema))return new ae(e,r||null,new M(Z.fromString(t.referencePath)))}}ae._jsonSchemaVersion="firestore/documentReference/1.0",ae._jsonSchema={type:Re("string",ae._jsonSchemaVersion),referencePath:Re("string")};class yt extends ke{constructor(e,t,r){super(e,t,Rs(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new ae(this.firestore,null,new M(e))}withConverter(e){return new yt(this.firestore,e,this._path)}}function mt(n,e,...t){if(n=X(n),dl("collection","path",e),n instanceof oo){const r=Z.fromString(e,...t);return wf(r),new yt(n,null,r)}{if(!(n instanceof ae||n instanceof yt))throw new N(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Z.fromString(e,...t));return wf(r),new yt(n.firestore,null,r)}}function p0(n,e){if(n=ee(n,oo),dl("collectionGroup","collection id",e),e.indexOf("/")>=0)throw new N(P.INVALID_ARGUMENT,`Invalid collection ID '${e}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new ke(n,null,function(r){return new tn(Z.emptyPath(),r)}(e))}function we(n,e,...t){if(n=X(n),arguments.length===1&&(e=qa.newId()),dl("doc","path",e),n instanceof oo){const r=Z.fromString(e,...t);return Ef(r),new ae(n,null,new M(r))}{if(!(n instanceof ae||n instanceof yt))throw new N(P.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Z.fromString(e,...t));return Ef(r),new ae(n.firestore,n instanceof yt?n.converter:null,new M(r))}}function m0(n,e){return n=X(n),e=X(e),(n instanceof ae||n instanceof yt)&&(e instanceof ae||e instanceof yt)&&n.firestore===e.firestore&&n.path===e.path&&n.converter===e.converter}function ih(n,e){return n=X(n),e=X(e),n instanceof ke&&e instanceof ke&&n.firestore===e.firestore&&eo(n._query,e._query)&&n.converter===e.converter}/**
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
 */const Vp="AsyncQueue";class Op{constructor(e=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new Bl(this,"async_queue_retry"),this._c=()=>{const r=ea();r&&V(Vp,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=e;const t=ea();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=ea();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const t=new Fe;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Yu.push(e),this.lc()))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(e){if(!jn(e))throw e;V(Vp,"Operation failed with retryable error: "+e)}this.Yu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const t=this.ac.then(()=>(this.rc=!0,e().catch(r=>{throw this.nc=r,this.rc=!1,ve("INTERNAL UNHANDLED ERROR: ",Mp(r)),r}).then(r=>(this.rc=!1,r))));return this.ac=t,t}enqueueAfterDelay(e,t,r){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const s=$l.createAndSchedule(this,e,t,r,i=>this.hc(i));return this.tc.push(s),s}uc(){this.nc&&j(47125,{Pc:Mp(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ec(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ic(e){return this.Tc().then(()=>{this.tc.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()})}Rc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function Mp(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
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
 */class Wy{constructor(){this._progressObserver={},this._taskCompletionResolver=new Fe,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(e,t,r){this._progressObserver={next:e,error:t,complete:r}}catch(e){return this._taskCompletionResolver.promise.catch(e)}then(e,t){return this._taskCompletionResolver.promise.then(e,t)}_completeWith(e){this._updateProgress(e),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(e)}_failWith(e){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(e),this._taskCompletionResolver.reject(e)}_updateProgress(e){this._lastProgress=e,this._progressObserver.next&&this._progressObserver.next(e)}}/**
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
 */const g0=-1;class ue extends oo{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new Op,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Op(e),this._firestoreClient=void 0,await e}}}function _0(n,e,t){t||(t=Li);const r=Xt(n,"firestore");if(r.isInitialized(t)){const s=r.getImmediate({identifier:t}),i=r.getOptions(t);if(wt(i,e))return s;throw new N(P.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new N(P.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<ry)throw new N(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return e.host&&Ut(e.host)&&zi(e.host),r.initialize({options:e,instanceIdentifier:t})}function Qy(n,e){const t=typeof n=="object"?n:Ki(),r=typeof n=="string"?n:e||Li,s=Xt(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=Ju("firestore");i&&Hy(s,...i)}return s}function ye(n){if(n._terminated)throw new N(P.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Jy(n),n._firestoreClient}function Jy(n){var r,s,i,o;const e=n._freezeSettings(),t=f0(n._databaseId,((r=n._app)==null?void 0:r.options.appId)||"",n._persistenceKey,(s=n._app)==null?void 0:s.options.apiKey,e);n._componentsProvider||(i=e.localCache)!=null&&i._offlineComponentProvider&&((o=e.localCache)!=null&&o._onlineComponentProvider)&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new YP(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&function(u){const l=u==null?void 0:u._online.build();return{_offline:u==null?void 0:u._offline.build(l),_online:l}}(n._componentsProvider))}function y0(n,e){ct("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const t=n._freezeSettings();return Xy(n,Ln.provider,{build:r=>new nh(r,t.cacheSizeBytes,e==null?void 0:e.forceOwnership)}),Promise.resolve()}async function Yy(n){ct("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const e=n._freezeSettings();Xy(n,Ln.provider,{build:t=>new Fy(t,e.cacheSizeBytes)})}function Xy(n,e,t){if((n=ee(n,ue))._firestoreClient||n._terminated)throw new N(P.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(n._componentsProvider||n._getSettings().localCache)throw new N(P.FAILED_PRECONDITION,"SDK cache is already specified.");n._componentsProvider={_online:e,_offline:t},Jy(n)}function I0(n){if(n._initialized&&!n._terminated)throw new N(P.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const e=new Fe;return n._queue.enqueueAndForgetEvenWhileRestricted(async()=>{try{await async function(r){if(!Ot.v())return Promise.resolve();const s=r+uy;await Ot.delete(s)}(Ml(n._databaseId,n._persistenceKey)),e.resolve()}catch(t){e.reject(t)}}),e.promise}function E0(n){return function(t){const r=new Fe;return t.asyncQueue.enqueueAndForget(async()=>OP(await sh(t),r)),r.promise}(ye(n=ee(n,ue)))}function w0(n){return XP(ye(n=ee(n,ue)))}function T0(n){return ZP(ye(n=ee(n,ue)))}function A0(n){return TT(n.app,"firestore",n._databaseId.database),n._delete()}function $u(n,e){const t=ye(n=ee(n,ue)),r=new Wy;return a0(t,n._databaseId,e,r),r}function Zy(n,e){return c0(ye(n=ee(n,ue)),e).then(t=>t?new ke(n,null,t.query):null)}/**
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
 */class et{constructor(e){this._byteString=e}static fromBase64String(e){try{return new et(Ie.fromBase64String(e))}catch(t){throw new N(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new et(Ie.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:et._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(br(e,et._jsonSchema))return et.fromBase64String(e.bytes)}}et._jsonSchemaVersion="firestore/bytes/1.0",et._jsonSchema={type:Re("string",et._jsonSchemaVersion),bytes:Re("string")};/**
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
 */class Rr{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new N(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new pe(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function v0(){return new Rr(Eu)}/**
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
 */class zn{constructor(e){this._methodName=e}}/**
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
 */class It{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new N(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new N(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return H(this._lat,e._lat)||H(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:It._jsonSchemaVersion}}static fromJSON(e){if(br(e,It._jsonSchema))return new It(e.latitude,e.longitude)}}It._jsonSchemaVersion="firestore/geoPoint/1.0",It._jsonSchema={type:Re("string",It._jsonSchemaVersion),latitude:Re("number"),longitude:Re("number")};/**
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
 */class ft{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}toJSON(){return{type:ft._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(br(e,ft._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new ft(e.vectorValues);throw new N(P.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}ft._jsonSchemaVersion="firestore/vectorValue/1.0",ft._jsonSchema={type:Re("string",ft._jsonSchemaVersion),vectorValues:Re("object")};/**
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
 */const b0=/^__.*__$/;class S0{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new rn(e,this.data,this.fieldMask,t,this.fieldTransforms):new Ps(e,this.data,t,this.fieldTransforms)}}class eI{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new rn(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function tI(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw j(40011,{dataSource:n})}}class lc{constructor(e,t,r,s,i,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Ac(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(e){return new lc({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}dc(e){var s;const t=(s=this.path)==null?void 0:s.child(e),r=this.i({path:t,arrayElement:!1});return r.mc(e),r}fc(e){var s;const t=(s=this.path)==null?void 0:s.child(e),r=this.i({path:t,arrayElement:!1});return r.Ac(),r}gc(e){return this.i({path:void 0,arrayElement:!0})}yc(e){return Ra(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.mc(this.path.get(e))}mc(e){if(e.length===0)throw this.yc("Document fields must not be empty");if(tI(this.dataSource)&&b0.test(e))throw this.yc('Document fields cannot begin and end with "__"')}}class R0{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Sr(e)}I(e,t,r,s=!1){return new lc({dataSource:e,methodName:t,targetDoc:r,path:pe.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Pr(n){const e=n._freezeSettings(),t=Sr(n._databaseId);return new R0(n._databaseId,!!e.ignoreUndefinedProperties,t)}function hc(n,e,t,r,s,i={}){const o=n.I(i.merge||i.mergeFields?2:0,e,t,s);dh("Data must be an object, but it was:",o,r);const c=sI(r,o);let u,l;if(i.merge)u=new rt(o.fieldMask),l=o.fieldTransforms;else if(i.mergeFields){const d=[];for(const f of i.mergeFields){const m=Jt(e,f,t);if(!o.contains(m))throw new N(P.INVALID_ARGUMENT,`Field '${m}' is specified in your field mask but missing from your input data.`);oI(d,m)||d.push(m)}u=new rt(d),l=o.fieldTransforms.filter(f=>u.covers(f.field))}else u=null,l=o.fieldTransforms;return new S0(new Le(c),u,l)}class ao extends zn{_toFieldTransform(e){if(e.dataSource!==2)throw e.dataSource===1?e.yc(`${this._methodName}() can only appear at the top level of your update data`):e.yc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof ao}}function nI(n,e,t){return new lc({dataSource:3,targetDoc:e.settings.targetDoc,methodName:n._methodName,arrayElement:t},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class oh extends zn{_toFieldTransform(e){return new no(e.path,new fs)}isEqual(e){return e instanceof oh}}class ah extends zn{constructor(e,t){super(e),this.Sc=t}_toFieldTransform(e){const t=nI(this,e,!0),r=this.Sc.map(i=>Cr(i,t)),s=new gr(r);return new no(e.path,s)}isEqual(e){return e instanceof ah&&wt(this.Sc,e.Sc)}}class ch extends zn{constructor(e,t){super(e),this.Sc=t}_toFieldTransform(e){const t=nI(this,e,!0),r=this.Sc.map(i=>Cr(i,t)),s=new _r(r);return new no(e.path,s)}isEqual(e){return e instanceof ch&&wt(this.Sc,e.Sc)}}class uh extends zn{constructor(e,t){super(e),this.bc=t}_toFieldTransform(e){const t=new ps(e.serializer,v_(e.serializer,this.bc));return new no(e.path,t)}isEqual(e){return e instanceof uh&&this.bc===e.bc}}function lh(n,e,t,r){const s=n.I(1,e,t);dh("Data must be an object, but it was:",s,r);const i=[],o=Le.empty();Gn(r,(u,l)=>{const d=fh(e,u,t);l=X(l);const f=s.fc(d);if(l instanceof ao)i.push(d);else{const m=Cr(l,f);m!=null&&(i.push(d),o.set(d,m))}});const c=new rt(i);return new eI(o,c,s.fieldTransforms)}function hh(n,e,t,r,s,i){const o=n.I(1,e,t),c=[Jt(e,r,t)],u=[s];if(i.length%2!=0)throw new N(P.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let m=0;m<i.length;m+=2)c.push(Jt(e,i[m])),u.push(i[m+1]);const l=[],d=Le.empty();for(let m=c.length-1;m>=0;--m)if(!oI(l,c[m])){const y=c[m];let S=u[m];S=X(S);const x=o.fc(y);if(S instanceof ao)l.push(y);else{const k=Cr(S,x);k!=null&&(l.push(y),d.set(y,k))}}const f=new rt(l);return new eI(d,f,o.fieldTransforms)}function rI(n,e,t,r=!1){return Cr(t,n.I(r?4:3,e))}function Cr(n,e){if(iI(n=X(n)))return dh("Unsupported field value:",e,n),sI(n,e);if(n instanceof zn)return function(r,s){if(!tI(s.dataSource))throw s.yc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.yc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.yc("Nested arrays are not supported");return function(r,s){const i=[];let o=0;for(const c of r){let u=Cr(c,s.gc(o));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),o++}return{arrayValue:{values:i}}}(n,e)}return function(r,s){if((r=X(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return v_(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=ie.fromDate(r);return{timestampValue:ms(s.serializer,i)}}if(r instanceof ie){const i=new ie(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:ms(s.serializer,i)}}if(r instanceof It)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof et)return{bytesValue:L_(s.serializer,r._byteString)};if(r instanceof ae){const i=s.databaseId,o=r.firestore._databaseId;if(!o.isEqual(i))throw s.yc(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:xl(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof ft)return function(o,c){const u=o instanceof ft?o.toArray():o;return{mapValue:{fields:{[Il]:{stringValue:El},[ls]:{arrayValue:{values:u.map(d=>{if(typeof d!="number")throw c.yc("VectorValues must only contain numeric values.");return vl(c.serializer,d)})}}}}}}(r,s);if(W_(r))return r._toProto(s.serializer);throw s.yc(`Unsupported field value: ${$a(r)}`)}(n,e)}function sI(n,e){const t={};return Yg(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Gn(n,(r,s)=>{const i=Cr(s,e.dc(r));i!=null&&(t[r]=i)}),{mapValue:{fields:t}}}function iI(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ie||n instanceof It||n instanceof et||n instanceof ae||n instanceof zn||n instanceof ft||W_(n))}function dh(n,e,t){if(!iI(t)||!kg(t)){const r=$a(t);throw r==="an object"?e.yc(n+" a custom object"):e.yc(n+" "+r)}}function Jt(n,e,t){if((e=X(e))instanceof Rr)return e._internalPath;if(typeof e=="string")return fh(n,e);throw Ra("Field path arguments must be of type string or ",n,!1,void 0,t)}const P0=new RegExp("[~\\*/\\[\\]]");function fh(n,e,t){if(e.search(P0)>=0)throw Ra(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Rr(...e.split("."))._internalPath}catch{throw Ra(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Ra(n,e,t,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(i||o)&&(u+=" (found",i&&(u+=` in field ${r}`),o&&(u+=` in document ${s}`),u+=")"),new N(P.INVALID_ARGUMENT,c+n+u)}function oI(n,e){return n.some(t=>t.isEqual(e))}/**
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
 */class ph{convertValue(e,t="none"){switch(Nn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return me(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Qt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw j(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return Gn(e,(s,i)=>{r[s]=this.convertValue(i,t)}),r}convertVectorValue(e){var r,s,i;const t=(i=(s=(r=e.fields)==null?void 0:r[ls].arrayValue)==null?void 0:s.values)==null?void 0:i.map(o=>me(o.doubleValue));return new ft(t)}convertGeoPoint(e){return new It(me(e.latitude),me(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=Ja(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Mi(e));default:return null}}convertTimestamp(e){const t=Wt(e);return new ie(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=Z.fromString(e);q(H_(r),9688,{name:e});const s=new kn(r.get(1),r.get(3)),i=new M(r.popFirst(5));return s.isEqual(t)||ve(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
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
 */class Kn extends ph{constructor(e){super(),this.firestore=e}convertBytes(e){return new et(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new ae(this.firestore,null,t)}}/**
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
 */function C0(){return new ao("deleteField")}function xn(){return new oh("serverTimestamp")}function x0(...n){return new ah("arrayUnion",n)}function D0(...n){return new ch("arrayRemove",n)}function k0(n){return new uh("increment",n)}function N0(n){return new ft(n)}/**
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
 */function V0(n){var r;const e=ye(ee(n.firestore,ue)),t=(r=e._onlineComponents)==null?void 0:r.datastore.serializer;return t===void 0?null:tc(t,Ke(n._query)).ft}function O0(n,e){var i;const t=Jg(e,(o,c)=>new D_(c,o.aggregateType,o._internalFieldPath)),r=ye(ee(n.firestore,ue)),s=(i=r._onlineComponents)==null?void 0:i.datastore.serializer;return s===void 0?null:q_(s,m_(n._query),t,!0).request}const Lp="@firebase/firestore",Fp="4.14.0";/**
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
 */function Zr(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1}(n,["next","error","complete"])}/**
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
 */class Ts{constructor(e="count",t){this._internalFieldPath=t,this.type="AggregateField",this.aggregateType=e}}class aI{constructor(e,t,r){this._userDataWriter=t,this._data=r,this.type="AggregateQuerySnapshot",this.query=e}data(){return this._userDataWriter.convertObjectMap(this._data)}_fieldsProto(){return new Le({mapValue:{fields:this._data}}).clone().value.mapValue.fields}}/**
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
 */class qi{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new ae(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new M0(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const t=this._document.data.field(Jt("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class M0 extends qi{data(){return super.data()}}/**
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
 */function cI(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new N(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class mh{}class Os extends mh{}function Hn(n,e,...t){let r=[];e instanceof mh&&r.push(e),r=r.concat(t),function(i){const o=i.filter(u=>u instanceof xr).length,c=i.filter(u=>u instanceof Ms).length;if(o>1||o>0&&c>0)throw new N(P.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)n=s._apply(n);return n}class Ms extends Os{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new Ms(e,t,r)}_apply(e){const t=this._parse(e);return lI(e._query,t),new ke(e.firestore,e.converter,Du(e._query,t))}_parse(e){const t=Pr(e.firestore);return function(i,o,c,u,l,d,f){let m;if(l.isKeyField()){if(d==="array-contains"||d==="array-contains-any")throw new N(P.INVALID_ARGUMENT,`Invalid Query. You can't perform '${d}' queries on documentId().`);if(d==="in"||d==="not-in"){Bp(f,d);const S=[];for(const x of f)S.push(Up(u,i,x));m={arrayValue:{values:S}}}else m=Up(u,i,f)}else d!=="in"&&d!=="not-in"&&d!=="array-contains-any"||Bp(f,d),m=rI(c,o,f,d==="in"||d==="not-in");return ne.create(l,d,m)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function L0(n,e,t){const r=e,s=Jt("where",n);return Ms._create(s,r,t)}class xr extends mh{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new xr(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:oe.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(s,i){let o=s;const c=i.getFlattenedFilters();for(const u of c)lI(o,u),o=Du(o,u)}(e._query,t),new ke(e.firestore,e.converter,Du(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function F0(...n){return n.forEach(e=>hI("or",e)),xr._create("or",n)}function U0(...n){return n.forEach(e=>hI("and",e)),xr._create("and",n)}class dc extends Os{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new dc(e,t)}_apply(e){const t=function(s,i,o){if(s.startAt!==null)throw new N(P.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new N(P.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Bi(i,o)}(e._query,this._field,this._direction);return new ke(e.firestore,e.converter,jS(e._query,t))}}function Dr(n,e="asc"){const t=e,r=Jt("orderBy",n);return dc._create(r,t)}class co extends Os{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new co(e,t,r)}_apply(e){return new ke(e.firestore,e.converter,ya(e._query,this._limit,this._limitType))}}function B0(n){return Ng("limit",n),co._create("limit",n,"F")}function j0(n){return Ng("limitToLast",n),co._create("limitToLast",n,"L")}class uo extends Os{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new uo(e,t,r)}_apply(e){const t=uI(e,this.type,this._docOrFields,this._inclusive);return new ke(e.firestore,e.converter,GS(e._query,t))}}function G0(...n){return uo._create("startAt",n,!0)}function q0(...n){return uo._create("startAfter",n,!1)}class lo extends Os{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new lo(e,t,r)}_apply(e){const t=uI(e,this.type,this._docOrFields,this._inclusive);return new ke(e.firestore,e.converter,qS(e._query,t))}}function $0(...n){return lo._create("endBefore",n,!1)}function z0(...n){return lo._create("endAt",n,!0)}function uI(n,e,t,r){if(t[0]=X(t[0]),t[0]instanceof qi)return function(i,o,c,u,l){if(!u)throw new N(P.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${c}().`);const d=[];for(const f of Yr(i))if(f.field.isKeyField())d.push(pr(o,u.key));else{const m=u.data.field(f.field);if(Qa(m))throw new N(P.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+f.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(m===null){const y=f.field.canonicalString();throw new N(P.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${y}' (used as the orderBy) does not exist.`)}d.push(m)}return new On(d,l)}(n._query,n.firestore._databaseId,e,t[0]._document,r);{const s=Pr(n.firestore);return function(o,c,u,l,d,f){const m=o.explicitOrderBy;if(d.length>m.length)throw new N(P.INVALID_ARGUMENT,`Too many arguments provided to ${l}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const y=[];for(let S=0;S<d.length;S++){const x=d[S];if(m[S].field.isKeyField()){if(typeof x!="string")throw new N(P.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${l}(), but got a ${typeof x}`);if(!Tl(o)&&x.indexOf("/")!==-1)throw new N(P.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${l}() must be a plain document ID, but '${x}' contains a slash.`);const k=o.path.child(Z.fromString(x));if(!M.isDocumentKey(k))throw new N(P.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${l}() must result in a valid document path, but '${k}' is not because it contains an odd number of segments.`);const O=new M(k);y.push(pr(c,O))}else{const k=rI(u,l,x);y.push(k)}}return new On(y,f)}(n._query,n.firestore._databaseId,s,e,t,r)}}function Up(n,e,t){if(typeof(t=X(t))=="string"){if(t==="")throw new N(P.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Tl(e)&&t.indexOf("/")!==-1)throw new N(P.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(Z.fromString(t));if(!M.isDocumentKey(r))throw new N(P.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return pr(n,new M(r))}if(t instanceof ae)return pr(n,t._key);throw new N(P.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${$a(t)}.`)}function Bp(n,e){if(!Array.isArray(n)||n.length===0)throw new N(P.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function lI(n,e){const t=function(s,i){for(const o of s)for(const c of o.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new N(P.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new N(P.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function hI(n,e){if(!(e instanceof Ms||e instanceof xr))throw new N(P.INVALID_ARGUMENT,`Function ${n}() requires AppliableConstraints created with a call to 'where(...)', 'or(...)', or 'and(...)'.`)}function fc(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}class gh extends ph{constructor(e){super(),this.firestore=e}convertBytes(e){return new et(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new ae(this.firestore,null,t)}}/**
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
 */function K0(n){return new Ts("sum",Jt("sum",n))}function H0(n){return new Ts("avg",Jt("average",n))}function dI(){return new Ts("count")}function W0(n,e){var t,r;return n instanceof Ts&&e instanceof Ts&&n.aggregateType===e.aggregateType&&((t=n._internalFieldPath)==null?void 0:t.canonicalString())===((r=e._internalFieldPath)==null?void 0:r.canonicalString())}function Q0(n,e){return ih(n.query,e.query)&&wt(n.data(),e.data())}/**
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
 */function J0(n){return fI(n,{count:dI()})}function fI(n,e){const t=ee(n.firestore,ue),r=ye(t),s=Jg(e,(i,o)=>new D_(o,i.aggregateType,i._internalFieldPath));return r0(r,n._query,s).then(i=>function(c,u,l){const d=new Kn(c);return new aI(u,d,l)}(t,n,i))}class Y0{constructor(e){this.kind="memory",this._onlineComponentProvider=Ln.provider,this._offlineComponentProvider=e!=null&&e.garbageCollector?e.garbageCollector._offlineComponentProvider:{build:()=>new th(void 0)}}toJSON(){return{kind:this.kind}}}class X0{constructor(e){let t;this.kind="persistent",e!=null&&e.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=pI(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}class Z0{constructor(){this.kind="memoryEager",this._offlineComponentProvider=Es.provider}toJSON(){return{kind:this.kind}}}class eC{constructor(e){this.kind="memoryLru",this._offlineComponentProvider={build:()=>new th(e)}}toJSON(){return{kind:this.kind}}}function tC(){return new Z0}function nC(n){return new eC(n==null?void 0:n.cacheSizeBytes)}function rC(n){return new Y0(n)}function sC(n){return new X0(n)}class iC{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Ln.provider,this._offlineComponentProvider={build:t=>new nh(t,e==null?void 0:e.cacheSizeBytes,this.forceOwnership)}}}class oC{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Ln.provider,this._offlineComponentProvider={build:t=>new Fy(t,e==null?void 0:e.cacheSizeBytes)}}}function pI(n){return new iC(n==null?void 0:n.forceOwnership)}function aC(){return new oC}/**
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
 */const mI="NOT SUPPORTED";class $t{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class ot extends qi{constructor(e,t,r,s,i,o){super(e,t,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new bi(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(Jt("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new N(P.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=ot._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}function cC(n,e,t){if(br(e,ot._jsonSchema)){if(e.bundle===mI)throw new N(P.INVALID_ARGUMENT,"The provided JSON object was created in a client environment, which is not supported.");const r=Sr(n._databaseId),s=$y(e.bundle,r),i=s.Qu(),o=new Ql(s.getMetadata(),r);for(const d of i)o.Ga(d);const c=o.documents;if(c.length!==1)throw new N(P.INVALID_ARGUMENT,`Expected bundle data to contain 1 document, but it contains ${c.length} documents.`);const u=ec(r,c[0].document),l=new M(Z.fromString(e.bundleName));return new ot(n,new gh(n),l,u,new $t(!1,!1),t||null)}}ot._jsonSchemaVersion="firestore/documentSnapshot/1.0",ot._jsonSchema={type:Re("string",ot._jsonSchemaVersion),bundleSource:Re("string","DocumentSnapshot"),bundleName:Re("string"),bundle:Re("string")};class bi extends ot{data(e={}){return super.data(e)}}class at{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new $t(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new bi(this._firestore,this._userDataWriter,r.key,r,new $t(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new N(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map(c=>{const u=new bi(s._firestore,s._userDataWriter,c.doc.key,c.doc,new $t(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}})}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(c=>i||c.type!==3).map(c=>{const u=new bi(s._firestore,s._userDataWriter,c.doc.key,c.doc,new $t(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let l=-1,d=-1;return c.type!==0&&(l=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),d=o.indexOf(c.doc.key)),{type:lC(c.type),doc:u,oldIndex:l,newIndex:d}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new N(P.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=at._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=qa.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach(i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function uC(n,e,t){if(br(e,at._jsonSchema)){if(e.bundle===mI)throw new N(P.INVALID_ARGUMENT,"The provided JSON object was created in a client environment, which is not supported.");const r=Sr(n._databaseId),s=$y(e.bundle,r),i=s.Qu(),o=new Ql(s.getMetadata(),r);for(const m of i)o.Ga(m);if(o.queries.length!==1)throw new N(P.INVALID_ARGUMENT,`Snapshot data expected 1 query but found ${o.queries.length} queries.`);const c=nc(o.queries[0].bundledQuery),u=o.documents;let l=new hr;u.map(m=>{const y=ec(r,m.document);l=l.add(y)});const d=Tr.fromInitialDocuments(c,l,J(),!1,!1),f=new ke(n,t||null,c);return new at(n,new gh(n),f,d)}}function lC(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return j(61501,{type:n})}}function hC(n,e){return n instanceof ot&&e instanceof ot?n._firestore===e._firestore&&n._key.isEqual(e._key)&&(n._document===null?e._document===null:n._document.isEqual(e._document))&&n._converter===e._converter:n instanceof at&&e instanceof at&&n._firestore===e._firestore&&ih(n.query,e.query)&&n.metadata.isEqual(e.metadata)&&n._snapshot.isEqual(e._snapshot)}/**
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
 */at._jsonSchemaVersion="firestore/querySnapshot/1.0",at._jsonSchema={type:Re("string",at._jsonSchemaVersion),bundleSource:Re("string","QuerySnapshot"),bundleName:Re("string"),bundle:Re("string")};const dC={maxAttempts:5};/**
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
 */class gI{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=Pr(e)}set(e,t,r){this._verifyNotCommitted();const s=bn(e,this._firestore),i=fc(s.converter,t,r),o=hc(this._dataReader,"WriteBatch.set",s._key,i,s.converter!==null,r);return this._mutations.push(o.toMutation(s._key,ge.none())),this}update(e,t,r,...s){this._verifyNotCommitted();const i=bn(e,this._firestore);let o;return o=typeof(t=X(t))=="string"||t instanceof Rr?hh(this._dataReader,"WriteBatch.update",i._key,t,r,s):lh(this._dataReader,"WriteBatch.update",i._key,t),this._mutations.push(o.toMutation(i._key,ge.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=bn(e,this._firestore);return this._mutations=this._mutations.concat(new Cs(t._key,ge.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new N(P.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function bn(n,e){if((n=X(n)).firestore!==e)throw new N(P.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}/**
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
 */class fC{constructor(e,t){this._firestore=e,this._transaction=t,this._dataReader=Pr(e)}get(e){const t=bn(e,this._firestore),r=new gh(this._firestore);return this._transaction.lookup([t._key]).then(s=>{if(!s||s.length!==1)return j(24041);const i=s[0];if(i.isFoundDocument())return new qi(this._firestore,r,i.key,i,t.converter);if(i.isNoDocument())return new qi(this._firestore,r,t._key,null,t.converter);throw j(18433,{doc:i})})}set(e,t,r){const s=bn(e,this._firestore),i=fc(s.converter,t,r),o=hc(this._dataReader,"Transaction.set",s._key,i,s.converter!==null,r);return this._transaction.set(s._key,o),this}update(e,t,r,...s){const i=bn(e,this._firestore);let o;return o=typeof(t=X(t))=="string"||t instanceof Rr?hh(this._dataReader,"Transaction.update",i._key,t,r,s):lh(this._dataReader,"Transaction.update",i._key,t),this._transaction.update(i._key,o),this}delete(e){const t=bn(e,this._firestore);return this._transaction.delete(t._key),this}}/**
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
 */class _I extends fC{constructor(e,t){super(e,t),this._firestore=e}get(e){const t=bn(e,this._firestore),r=new Kn(this._firestore);return super.get(e).then(s=>new ot(this._firestore,r,t._key,s._document,new $t(!1,!1),t.converter))}}function pC(n,e,t){n=ee(n,ue);const r={...dC,...t};(function(o){if(o.maxAttempts<1)throw new N(P.INVALID_ARGUMENT,"Max attempts must be at least 1")})(r);const s=ye(n);return o0(s,i=>e(new _I(n,i)),r)}/**
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
 */function kr(n){n=ee(n,ae);const e=ee(n.firestore,ue),t=ye(e);return Gy(t,n._key).then(r=>yh(e,n,r))}function mC(n){n=ee(n,ae);const e=ee(n.firestore,ue),t=ye(e),r=new Kn(e);return t0(t,n._key).then(s=>new ot(e,r,n._key,s,new $t(s!==null&&s.hasLocalMutations,!0),n.converter))}function gC(n){n=ee(n,ae);const e=ee(n.firestore,ue),t=ye(e);return Gy(t,n._key,{source:"server"}).then(r=>yh(e,n,r))}function Pa(n){n=ee(n,ke);const e=ee(n.firestore,ue),t=ye(e),r=new Kn(e);return cI(n._query),qy(t,n._query).then(s=>new at(e,r,n,s))}function _C(n){n=ee(n,ke);const e=ee(n.firestore,ue),t=ye(e),r=new Kn(e);return n0(t,n._query).then(s=>new at(e,r,n,s))}function yC(n){n=ee(n,ke);const e=ee(n.firestore,ue),t=ye(e),r=new Kn(e);return qy(t,n._query,{source:"server"}).then(s=>new at(e,r,n,s))}function Et(n,e,t){n=ee(n,ae);const r=ee(n.firestore,ue),s=fc(n.converter,e,t),i=Pr(r);return Ls(r,[hc(i,"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,ge.none())])}function Un(n,e,t,...r){n=ee(n,ae);const s=ee(n.firestore,ue),i=Pr(s);let o;return o=typeof(e=X(e))=="string"||e instanceof Rr?hh(i,"updateDoc",n._key,e,t,r):lh(i,"updateDoc",n._key,e),Ls(s,[o.toMutation(n._key,ge.exists(!0))])}function pc(n){return Ls(ee(n.firestore,ue),[new Cs(n._key,ge.none())])}function _h(n,e){const t=ee(n.firestore,ue),r=we(n),s=fc(n.converter,e),i=Pr(n.firestore);return Ls(t,[hc(i,"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,ge.exists(!1))]).then(()=>r)}function Yt(n,...e){var l,d,f;n=X(n);let t={includeMetadataChanges:!1,source:"default"},r=0;typeof e[r]!="object"||Zr(e[r])||(t=e[r++]);const s={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(Zr(e[r])){const m=e[r];e[r]=(l=m.next)==null?void 0:l.bind(m),e[r+1]=(d=m.error)==null?void 0:d.bind(m),e[r+2]=(f=m.complete)==null?void 0:f.bind(m)}let i,o,c;if(n instanceof ae)o=ee(n.firestore,ue),c=Rs(n._key.path),i={next:m=>{e[r]&&e[r](yh(o,n,m))},error:e[r+1],complete:e[r+2]};else{const m=ee(n,ke);o=ee(m.firestore,ue),c=m._query;const y=new Kn(o);i={next:S=>{e[r]&&e[r](new at(o,y,m,S))},error:e[r+1],complete:e[r+2]},cI(n._query)}const u=ye(o);return e0(u,c,s,i)}function IC(n,e,...t){const r=X(n),s=function(u){const l={bundle:"",bundleName:"",bundleSource:""},d=["bundle","bundleName","bundleSource"];for(const f of d){if(!(f in u)){l.error=`snapshotJson missing required field: ${f}`;break}const m=u[f];if(typeof m!="string"){l.error=`snapshotJson field '${f}' must be a string.`;break}if(m.length===0){l.error=`snapshotJson field '${f}' cannot be an empty string.`;break}f==="bundle"?l.bundle=m:f==="bundleName"?l.bundleName=m:f==="bundleSource"&&(l.bundleSource=m)}return l}(e);if(s.error)throw new N(P.INVALID_ARGUMENT,s.error);let i,o=0;if(typeof t[o]!="object"||Zr(t[o])||(i=t[o++]),s.bundleSource==="QuerySnapshot"){let c=null;if(typeof t[o]=="object"&&Zr(t[o])){const u=t[o++];c={next:u.next,error:u.error,complete:u.complete}}else c={next:t[o++],error:t[o++],complete:t[o++]};return function(l,d,f,m,y){let S,x=!1;return $u(l,d.bundle).then(()=>Zy(l,d.bundleName)).then(O=>{O&&!x&&(y&&O.withConverter(y),S=Yt(O,f||{},m))}).catch(O=>(m.error&&m.error(O),()=>{})),()=>{x||(x=!0,S&&S())}}(r,s,i,c,t[o])}if(s.bundleSource==="DocumentSnapshot"){let c=null;if(typeof t[o]=="object"&&Zr(t[o])){const u=t[o++];c={next:u.next,error:u.error,complete:u.complete}}else c={next:t[o++],error:t[o++],complete:t[o++]};return function(l,d,f,m,y){let S,x=!1;return $u(l,d.bundle).then(()=>{if(!x){const O=new ae(l,y||null,M.fromPath(d.bundleName));S=Yt(O,f||{},m)}}).catch(O=>(m.error&&m.error(O),()=>{})),()=>{x||(x=!0,S&&S())}}(r,s,i,c,t[o])}throw new N(P.INVALID_ARGUMENT,`unsupported bundle source: ${s.bundleSource}`)}function EC(n,e){n=ee(n,ue);const t=ye(n),r=Zr(e)?e:{next:e};return i0(t,r)}function Ls(n,e){const t=ye(n);return s0(t,e)}function yh(n,e,t){const r=t.docs.get(e._key),s=new Kn(n);return new ot(n,s,e._key,r,new $t(t.hasPendingWrites,t.fromCache),e.converter)}function wC(n){return n=ee(n,ue),ye(n),new gI(n,e=>Ls(n,e))}/**
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
 */function TC(n,e){n=ee(n,ue);const t=ye(n);if(!t._uninitializedComponentsProvider||t._uninitializedComponentsProvider._offline.kind==="memory")return ct("Cannot enable indexes when persistence is disabled"),Promise.resolve();const r=function(i){const o=typeof i=="string"?function(l){try{return JSON.parse(l)}catch(d){throw new N(P.INVALID_ARGUMENT,"Failed to parse JSON: "+(d==null?void 0:d.message))}}(i):i,c=[];if(Array.isArray(o.indexes))for(const u of o.indexes){const l=jp(u,"collectionGroup"),d=[];if(Array.isArray(u.fields))for(const f of u.fields){const m=jp(f,"fieldPath"),y=fh("setIndexConfiguration",m);f.arrayConfig==="CONTAINS"?d.push(new ur(y,2)):f.order==="ASCENDING"?d.push(new ur(y,0)):f.order==="DESCENDING"&&d.push(new ur(y,1))}c.push(new ss(ss.UNKNOWN_ID,l,d,is.empty()))}return c}(e);return u0(t,r)}function jp(n,e){if(typeof n[e]!="string")throw new N(P.INVALID_ARGUMENT,"Missing string value for: "+e);return n[e]}/**
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
 */class yI{constructor(e){this._firestore=e,this.type="PersistentCacheIndexManager"}}function AC(n){var s;n=ee(n,ue);const e=Gp.get(n);if(e)return e;if(((s=ye(n)._uninitializedComponentsProvider)==null?void 0:s._offline.kind)!=="persistent")return null;const r=new yI(n);return Gp.set(n,r),r}function vC(n){II(n,!0)}function bC(n){II(n,!1)}function SC(n){const e=ye(n._firestore);h0(e).then(t=>V("deleting all persistent cache indexes succeeded")).catch(t=>ct("deleting all persistent cache indexes failed",t))}function II(n,e){const t=ye(n._firestore);l0(t,e).then(r=>V(`setting persistent cache index auto creation isEnabled=${e} succeeded`)).catch(r=>ct(`setting persistent cache index auto creation isEnabled=${e} failed`,r))}const Gp=new WeakMap;/**
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
 */class RC{constructor(){throw new Error("instances of this class should not be created")}static onExistenceFilterMismatch(e){return Ih.instance.onExistenceFilterMismatch(e)}}class Ih{constructor(){this.t=new Map}static get instance(){return Fo||(Fo=new Ih,nR(Fo)),Fo}o(e){this.t.forEach(t=>t(e))}onExistenceFilterMismatch(e){const t=Symbol(),r=this.t;return r.set(t,e),()=>r.delete(t)}}let Fo=null;(function(e,t=!0){Ob(vr),Lt(new Tt("firestore",(r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),c=new ue(new Ub(r.getProvider("auth-internal")),new Gb(o,r.getProvider("app-check-internal")),CS(o,s),o);return i={useFetchStreams:t,...i},c._setSettings(i),c},"PUBLIC").setMultipleInstances(!0)),dt(Lp,Fp,e),dt(Lp,Fp,"esm2020")})();const Eh=Object.freeze(Object.defineProperty({__proto__:null,AbstractUserDataWriter:ph,AggregateField:Ts,AggregateQuerySnapshot:aI,Bytes:et,CACHE_SIZE_UNLIMITED:g0,CollectionReference:yt,DocumentReference:ae,DocumentSnapshot:ot,FieldPath:Rr,FieldValue:zn,Firestore:ue,FirestoreError:N,GeoPoint:It,LoadBundleTask:Wy,PersistentCacheIndexManager:yI,Query:ke,QueryCompositeFilterConstraint:xr,QueryConstraint:Os,QueryDocumentSnapshot:bi,QueryEndAtConstraint:lo,QueryFieldFilterConstraint:Ms,QueryLimitConstraint:co,QueryOrderByConstraint:dc,QuerySnapshot:at,QueryStartAtConstraint:uo,SnapshotMetadata:$t,Timestamp:ie,Transaction:_I,VectorValue:ft,WriteBatch:gI,_AutoId:qa,_ByteString:Ie,_DatabaseId:kn,_DocumentKey:M,_EmptyAppCheckTokenProvider:qb,_EmptyAuthCredentialsProvider:Cg,_FieldPath:pe,_TestingHooks:RC,_cast:ee,_debugAssert:Lb,_internalAggregationQueryToProtoRunAggregationQueryRequest:O0,_internalQueryToProtoQueryTarget:V0,_isBase64Available:SS,_logWarn:ct,_validateIsNotUsedTogether:Dg,addDoc:_h,aggregateFieldEqual:W0,aggregateQuerySnapshotEqual:Q0,and:U0,arrayRemove:D0,arrayUnion:x0,average:H0,clearIndexedDbPersistence:I0,collection:mt,collectionGroup:p0,connectFirestoreEmulator:Hy,count:dI,deleteAllPersistentCacheIndexes:SC,deleteDoc:pc,deleteField:C0,disableNetwork:T0,disablePersistentCacheIndexAutoCreation:bC,doc:we,documentId:v0,documentSnapshotFromJSON:cC,enableIndexedDbPersistence:y0,enableMultiTabIndexedDbPersistence:Yy,enableNetwork:w0,enablePersistentCacheIndexAutoCreation:vC,endAt:z0,endBefore:$0,ensureFirestoreConfigured:ye,executeWrite:Ls,getAggregateFromServer:fI,getCountFromServer:J0,getDoc:kr,getDocFromCache:mC,getDocFromServer:gC,getDocs:Pa,getDocsFromCache:_C,getDocsFromServer:yC,getFirestore:Qy,getPersistentCacheIndexManager:AC,increment:k0,initializeFirestore:_0,limit:B0,limitToLast:j0,loadBundle:$u,memoryEagerGarbageCollector:tC,memoryLocalCache:rC,memoryLruGarbageCollector:nC,namedQuery:Zy,onSnapshot:Yt,onSnapshotResume:IC,onSnapshotsInSync:EC,or:F0,orderBy:Dr,persistentLocalCache:sC,persistentMultipleTabManager:aC,persistentSingleTabManager:pI,query:Hn,queryEqual:ih,querySnapshotFromJSON:uC,refEqual:m0,runTransaction:pC,serverTimestamp:xn,setDoc:Et,setIndexConfiguration:TC,setLogLevel:Mb,snapshotEqual:hC,startAfter:q0,startAt:G0,sum:K0,terminate:A0,updateDoc:Un,vector:N0,waitForPendingWrites:E0,where:L0,writeBatch:wC},Symbol.toStringTag,{value:"Module"}));/**
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
 */const EI="firebasestorage.googleapis.com",wI="storageBucket",PC=2*60*1e3,CC=10*60*1e3;/**
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
 */class Ae extends vt{constructor(e,t,r=0){super(su(e),`Firebase Storage: ${t} (${su(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,Ae.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return su(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var Te;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(Te||(Te={}));function su(n){return"storage/"+n}function wh(){const n="An unknown error occurred, please check the error payload for server response.";return new Ae(Te.UNKNOWN,n)}function xC(n){return new Ae(Te.OBJECT_NOT_FOUND,"Object '"+n+"' does not exist.")}function DC(n){return new Ae(Te.QUOTA_EXCEEDED,"Quota for bucket '"+n+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function kC(){const n="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new Ae(Te.UNAUTHENTICATED,n)}function NC(){return new Ae(Te.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function VC(n){return new Ae(Te.UNAUTHORIZED,"User does not have permission to access '"+n+"'.")}function OC(){return new Ae(Te.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function MC(){return new Ae(Te.CANCELED,"User canceled the upload/download.")}function LC(n){return new Ae(Te.INVALID_URL,"Invalid URL '"+n+"'.")}function FC(n){return new Ae(Te.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function UC(){return new Ae(Te.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+wI+"' property when initializing the app?")}function BC(){return new Ae(Te.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function jC(){return new Ae(Te.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function GC(n){return new Ae(Te.UNSUPPORTED_ENVIRONMENT,`${n} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function zu(n){return new Ae(Te.INVALID_ARGUMENT,n)}function TI(){return new Ae(Te.APP_DELETED,"The Firebase app was deleted.")}function qC(n){return new Ae(Te.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function Si(n,e){return new Ae(Te.INVALID_FORMAT,"String does not match format '"+n+"': "+e)}function ci(n){throw new Ae(Te.INTERNAL_ERROR,"Internal error: "+n)}/**
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
 */class ht{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let r;try{r=ht.makeFromUrl(e,t)}catch{return new ht(e,"")}if(r.path==="")return r;throw FC(e)}static makeFromUrl(e,t){let r=null;const s="([A-Za-z0-9.\\-_]+)";function i(z){z.path.charAt(z.path.length-1)==="/"&&(z.path_=z.path_.slice(0,-1))}const o="(/(.*))?$",c=new RegExp("^gs://"+s+o,"i"),u={bucket:1,path:3};function l(z){z.path_=decodeURIComponent(z.path)}const d="v[A-Za-z0-9_]+",f=t.replace(/[.]/g,"\\."),m="(/([^?#]*).*)?$",y=new RegExp(`^https?://${f}/${d}/b/${s}/o${m}`,"i"),S={bucket:1,path:3},x=t===EI?"(?:storage.googleapis.com|storage.cloud.google.com)":t,k="([^?#]*)",O=new RegExp(`^https?://${x}/${s}/${k}`,"i"),B=[{regex:c,indices:u,postModify:i},{regex:y,indices:S,postModify:l},{regex:O,indices:{bucket:1,path:2},postModify:l}];for(let z=0;z<B.length;z++){const W=B[z],Q=W.regex.exec(e);if(Q){const E=Q[W.indices.bucket];let I=Q[W.indices.path];I||(I=""),r=new ht(E,I),W.postModify(r);break}}if(r==null)throw LC(e);return r}}class $C{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
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
 */function zC(n,e,t){let r=1,s=null,i=null,o=!1,c=0;function u(){return c===2}let l=!1;function d(...k){l||(l=!0,e.apply(null,k))}function f(k){s=setTimeout(()=>{s=null,n(y,u())},k)}function m(){i&&clearTimeout(i)}function y(k,...O){if(l){m();return}if(k){m(),d.call(null,k,...O);return}if(u()||o){m(),d.call(null,k,...O);return}r<64&&(r*=2);let B;c===1?(c=2,B=0):B=(r+Math.random())*1e3,f(B)}let S=!1;function x(k){S||(S=!0,m(),!l&&(s!==null?(k||(c=2),clearTimeout(s),f(0)):k||(c=1)))}return f(0),i=setTimeout(()=>{o=!0,x(!0)},t),x}function KC(n){n(!1)}/**
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
 */function HC(n){return n!==void 0}function WC(n){return typeof n=="object"&&!Array.isArray(n)}function Th(n){return typeof n=="string"||n instanceof String}function qp(n){return Ah()&&n instanceof Blob}function Ah(){return typeof Blob<"u"}function $p(n,e,t,r){if(r<e)throw zu(`Invalid value for '${n}'. Expected ${e} or greater.`);if(r>t)throw zu(`Invalid value for '${n}'. Expected ${t} or less.`)}/**
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
 */function mc(n,e,t){let r=e;return t==null&&(r=`https://${e}`),`${t}://${r}/v0${n}`}function AI(n){const e=encodeURIComponent;let t="?";for(const r in n)if(n.hasOwnProperty(r)){const s=e(r)+"="+e(n[r]);t=t+s+"&"}return t=t.slice(0,-1),t}var dr;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(dr||(dr={}));/**
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
 */function QC(n,e){const t=n>=500&&n<600,s=[408,429].indexOf(n)!==-1,i=e.indexOf(n)!==-1;return t||s||i}/**
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
 */class JC{constructor(e,t,r,s,i,o,c,u,l,d,f,m=!0,y=!1){this.url_=e,this.method_=t,this.headers_=r,this.body_=s,this.successCodes_=i,this.additionalRetryCodes_=o,this.callback_=c,this.errorCallback_=u,this.timeout_=l,this.progressCallback_=d,this.connectionFactory_=f,this.retry=m,this.isUsingEmulator=y,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((S,x)=>{this.resolve_=S,this.reject_=x,this.start_()})}start_(){const e=(r,s)=>{if(s){r(!1,new Uo(!1,null,!0));return}const i=this.connectionFactory_();this.pendingConnection_=i;const o=c=>{const u=c.loaded,l=c.lengthComputable?c.total:-1;this.progressCallback_!==null&&this.progressCallback_(u,l)};this.progressCallback_!==null&&i.addUploadProgressListener(o),i.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&i.removeUploadProgressListener(o),this.pendingConnection_=null;const c=i.getErrorCode()===dr.NO_ERROR,u=i.getStatus();if(!c||QC(u,this.additionalRetryCodes_)&&this.retry){const d=i.getErrorCode()===dr.ABORT;r(!1,new Uo(!1,null,d));return}const l=this.successCodes_.indexOf(u)!==-1;r(!0,new Uo(l,i))})},t=(r,s)=>{const i=this.resolve_,o=this.reject_,c=s.connection;if(s.wasSuccessCode)try{const u=this.callback_(c,c.getResponse());HC(u)?i(u):i()}catch(u){o(u)}else if(c!==null){const u=wh();u.serverResponse=c.getErrorText(),this.errorCallback_?o(this.errorCallback_(c,u)):o(u)}else if(s.canceled){const u=this.appDelete_?TI():MC();o(u)}else{const u=OC();o(u)}};this.canceled_?t(!1,new Uo(!1,null,!0)):this.backoffId_=zC(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&KC(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class Uo{constructor(e,t,r){this.wasSuccessCode=e,this.connection=t,this.canceled=!!r}}function YC(n,e){e!==null&&e.length>0&&(n.Authorization="Firebase "+e)}function XC(n,e){n["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function ZC(n,e){e&&(n["X-Firebase-GMPID"]=e)}function ex(n,e){e!==null&&(n["X-Firebase-AppCheck"]=e)}function tx(n,e,t,r,s,i,o=!0,c=!1){const u=AI(n.urlParams),l=n.url+u,d=Object.assign({},n.headers);return ZC(d,e),YC(d,t),XC(d,i),ex(d,r),new JC(l,n.method,d,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,s,o,c)}/**
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
 */function nx(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function rx(...n){const e=nx();if(e!==void 0){const t=new e;for(let r=0;r<n.length;r++)t.append(n[r]);return t.getBlob()}else{if(Ah())return new Blob(n);throw new Ae(Te.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function sx(n,e,t){return n.webkitSlice?n.webkitSlice(e,t):n.mozSlice?n.mozSlice(e,t):n.slice?n.slice(e,t):null}/**
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
 */function ix(n){if(typeof atob>"u")throw GC("base-64");return atob(n)}/**
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
 */const Dt={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class iu{constructor(e,t){this.data=e,this.contentType=t||null}}function ox(n,e){switch(n){case Dt.RAW:return new iu(vI(e));case Dt.BASE64:case Dt.BASE64URL:return new iu(bI(n,e));case Dt.DATA_URL:return new iu(cx(e),ux(e))}throw wh()}function vI(n){const e=[];for(let t=0;t<n.length;t++){let r=n.charCodeAt(t);if(r<=127)e.push(r);else if(r<=2047)e.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(t<n.length-1&&(n.charCodeAt(t+1)&64512)===56320))e.push(239,191,189);else{const i=r,o=n.charCodeAt(++t);r=65536|(i&1023)<<10|o&1023,e.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?e.push(239,191,189):e.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(e)}function ax(n){let e;try{e=decodeURIComponent(n)}catch{throw Si(Dt.DATA_URL,"Malformed data URL.")}return vI(e)}function bI(n,e){switch(n){case Dt.BASE64:{const s=e.indexOf("-")!==-1,i=e.indexOf("_")!==-1;if(s||i)throw Si(n,"Invalid character '"+(s?"-":"_")+"' found: is it base64url encoded?");break}case Dt.BASE64URL:{const s=e.indexOf("+")!==-1,i=e.indexOf("/")!==-1;if(s||i)throw Si(n,"Invalid character '"+(s?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let t;try{t=ix(e)}catch(s){throw s.message.includes("polyfill")?s:Si(n,"Invalid character found")}const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}class SI{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(t===null)throw Si(Dt.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=t[1]||null;r!=null&&(this.base64=lx(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=e.substring(e.indexOf(",")+1)}}function cx(n){const e=new SI(n);return e.base64?bI(Dt.BASE64,e.rest):ax(e.rest)}function ux(n){return new SI(n).contentType}function lx(n,e){return n.length>=e.length?n.substring(n.length-e.length)===e:!1}/**
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
 */class Tn{constructor(e,t){let r=0,s="";qp(e)?(this.data_=e,r=e.size,s=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=s}size(){return this.size_}type(){return this.type_}slice(e,t){if(qp(this.data_)){const r=this.data_,s=sx(r,e,t);return s===null?null:new Tn(s)}else{const r=new Uint8Array(this.data_.buffer,e,t-e);return new Tn(r,!0)}}static getBlob(...e){if(Ah()){const t=e.map(r=>r instanceof Tn?r.data_:r);return new Tn(rx.apply(null,t))}else{const t=e.map(o=>Th(o)?ox(Dt.RAW,o).data:o.data_);let r=0;t.forEach(o=>{r+=o.byteLength});const s=new Uint8Array(r);let i=0;return t.forEach(o=>{for(let c=0;c<o.length;c++)s[i++]=o[c]}),new Tn(s,!0)}}uploadData(){return this.data_}}/**
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
 */function RI(n){let e;try{e=JSON.parse(n)}catch{return null}return WC(e)?e:null}/**
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
 */function hx(n){if(n.length===0)return null;const e=n.lastIndexOf("/");return e===-1?"":n.slice(0,e)}function dx(n,e){const t=e.split("/").filter(r=>r.length>0).join("/");return n.length===0?t:n+"/"+t}function PI(n){const e=n.lastIndexOf("/",n.length-2);return e===-1?n:n.slice(e+1)}/**
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
 */function fx(n,e){return e}class Je{constructor(e,t,r,s){this.server=e,this.local=t||e,this.writable=!!r,this.xform=s||fx}}let Bo=null;function px(n){return!Th(n)||n.length<2?n:PI(n)}function CI(){if(Bo)return Bo;const n=[];n.push(new Je("bucket")),n.push(new Je("generation")),n.push(new Je("metageneration")),n.push(new Je("name","fullPath",!0));function e(i,o){return px(o)}const t=new Je("name");t.xform=e,n.push(t);function r(i,o){return o!==void 0?Number(o):o}const s=new Je("size");return s.xform=r,n.push(s),n.push(new Je("timeCreated")),n.push(new Je("updated")),n.push(new Je("md5Hash",null,!0)),n.push(new Je("cacheControl",null,!0)),n.push(new Je("contentDisposition",null,!0)),n.push(new Je("contentEncoding",null,!0)),n.push(new Je("contentLanguage",null,!0)),n.push(new Je("contentType",null,!0)),n.push(new Je("metadata","customMetadata",!0)),Bo=n,Bo}function mx(n,e){function t(){const r=n.bucket,s=n.fullPath,i=new ht(r,s);return e._makeStorageReference(i)}Object.defineProperty(n,"ref",{get:t})}function gx(n,e,t){const r={};r.type="file";const s=t.length;for(let i=0;i<s;i++){const o=t[i];r[o.local]=o.xform(r,e[o.server])}return mx(r,n),r}function xI(n,e,t){const r=RI(e);return r===null?null:gx(n,r,t)}function _x(n,e,t,r){const s=RI(e);if(s===null||!Th(s.downloadTokens))return null;const i=s.downloadTokens;if(i.length===0)return null;const o=encodeURIComponent;return i.split(",").map(l=>{const d=n.bucket,f=n.fullPath,m="/b/"+o(d)+"/o/"+o(f),y=mc(m,t,r),S=AI({alt:"media",token:l});return y+S})[0]}function yx(n,e){const t={},r=e.length;for(let s=0;s<r;s++){const i=e[s];i.writable&&(t[i.server]=n[i.local])}return JSON.stringify(t)}class vh{constructor(e,t,r,s){this.url=e,this.method=t,this.handler=r,this.timeout=s,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
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
 */function DI(n){if(!n)throw wh()}function Ix(n,e){function t(r,s){const i=xI(n,s,e);return DI(i!==null),i}return t}function Ex(n,e){function t(r,s){const i=xI(n,s,e);return DI(i!==null),_x(i,s,n.host,n._protocol)}return t}function kI(n){function e(t,r){let s;return t.getStatus()===401?t.getErrorText().includes("Firebase App Check token is invalid")?s=NC():s=kC():t.getStatus()===402?s=DC(n.bucket):t.getStatus()===403?s=VC(n.path):s=r,s.status=t.getStatus(),s.serverResponse=r.serverResponse,s}return e}function NI(n){const e=kI(n);function t(r,s){let i=e(r,s);return r.getStatus()===404&&(i=xC(n.path)),i.serverResponse=s.serverResponse,i}return t}function wx(n,e,t){const r=e.fullServerUrl(),s=mc(r,n.host,n._protocol),i="GET",o=n.maxOperationRetryTime,c=new vh(s,i,Ex(n,t),o);return c.errorHandler=NI(e),c}function Tx(n,e){const t=e.fullServerUrl(),r=mc(t,n.host,n._protocol),s="DELETE",i=n.maxOperationRetryTime;function o(u,l){}const c=new vh(r,s,o,i);return c.successCodes=[200,204],c.errorHandler=NI(e),c}function Ax(n,e){return n&&n.contentType||e&&e.type()||"application/octet-stream"}function vx(n,e,t){const r=Object.assign({},t);return r.fullPath=n.path,r.size=e.size(),r.contentType||(r.contentType=Ax(null,e)),r}function bx(n,e,t,r,s){const i=e.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function c(){let B="";for(let z=0;z<2;z++)B=B+Math.random().toString().slice(2);return B}const u=c();o["Content-Type"]="multipart/related; boundary="+u;const l=vx(e,r,s),d=yx(l,t),f="--"+u+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+d+`\r
--`+u+`\r
Content-Type: `+l.contentType+`\r
\r
`,m=`\r
--`+u+"--",y=Tn.getBlob(f,r,m);if(y===null)throw BC();const S={name:l.fullPath},x=mc(i,n.host,n._protocol),k="POST",O=n.maxUploadRetryTime,U=new vh(x,k,Ix(n,t),O);return U.urlParams=S,U.headers=o,U.body=y.uploadData(),U.errorHandler=kI(e),U}class Sx{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=dr.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=dr.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=dr.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,r,s,i){if(this.sent_)throw ci("cannot .send() more than once");if(Ut(e)&&r&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(t,e,!0),i!==void 0)for(const o in i)i.hasOwnProperty(o)&&this.xhr_.setRequestHeader(o,i[o].toString());return s!==void 0?this.xhr_.send(s):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw ci("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw ci("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw ci("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw ci("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class Rx extends Sx{initXhr(){this.xhr_.responseType="text"}}function bh(){return new Rx}/**
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
 */class Ar{constructor(e,t){this._service=e,t instanceof ht?this._location=t:this._location=ht.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new Ar(e,t)}get root(){const e=new ht(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return PI(this._location.path)}get storage(){return this._service}get parent(){const e=hx(this._location.path);if(e===null)return null;const t=new ht(this._location.bucket,e);return new Ar(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw qC(e)}}function Px(n,e,t){n._throwIfRoot("uploadBytes");const r=bx(n.storage,n._location,CI(),new Tn(e,!0),t);return n.storage.makeRequestWithTokens(r,bh).then(s=>({metadata:s,ref:n}))}function Cx(n){n._throwIfRoot("getDownloadURL");const e=wx(n.storage,n._location,CI());return n.storage.makeRequestWithTokens(e,bh).then(t=>{if(t===null)throw jC();return t})}function xx(n){n._throwIfRoot("deleteObject");const e=Tx(n.storage,n._location);return n.storage.makeRequestWithTokens(e,bh)}function Dx(n,e){const t=dx(n._location.path,e),r=new ht(n._location.bucket,t);return new Ar(n.storage,r)}/**
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
 */function kx(n){return/^[A-Za-z]+:\/\//.test(n)}function Nx(n,e){return new Ar(n,e)}function VI(n,e){if(n instanceof Sh){const t=n;if(t._bucket==null)throw UC();const r=new Ar(t,t._bucket);return e!=null?VI(r,e):r}else return e!==void 0?Dx(n,e):n}function Vx(n,e){if(e&&kx(e)){if(n instanceof Sh)return Nx(n,e);throw zu("To use ref(service, url), the first argument must be a Storage instance.")}else return VI(n,e)}function zp(n,e){const t=e==null?void 0:e[wI];return t==null?null:ht.makeFromBucketSpec(t,n)}function Ox(n,e,t,r={}){n.host=`${e}:${t}`;const s=Ut(e);s&&zi(`https://${n.host}/b`),n._isUsingEmulator=!0,n._protocol=s?"https":"http";const{mockUserToken:i}=r;i&&(n._overrideAuthToken=typeof i=="string"?i:_m(i,n.app.options.projectId))}class Sh{constructor(e,t,r,s,i,o=!1){this.app=e,this._authProvider=t,this._appCheckProvider=r,this._url=s,this._firebaseVersion=i,this._isUsingEmulator=o,this._bucket=null,this._host=EI,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=PC,this._maxUploadRetryTime=CC,this._requests=new Set,s!=null?this._bucket=ht.makeFromBucketSpec(s,this._host):this._bucket=zp(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=ht.makeFromBucketSpec(this._url,e):this._bucket=zp(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){$p("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){$p("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){if(Xe(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new Ar(this,e)}_makeRequest(e,t,r,s,i=!0){if(this._deleted)return new $C(TI());{const o=tx(e,this._appId,r,s,t,this._firebaseVersion,i,this._isUsingEmulator);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,t){const[r,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,r,s).getPromise()}}const Kp="@firebase/storage",Hp="0.14.2";/**
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
 */const OI="storage";function _N(n,e,t){return n=X(n),Px(n,e,t)}function yN(n){return n=X(n),Cx(n)}function MI(n){return n=X(n),xx(n)}function LI(n,e){return n=X(n),Vx(n,e)}function Mx(n=Ki(),e){n=X(n);const r=Xt(n,OI).getImmediate({identifier:e}),s=Ju("storage");return s&&Lx(r,...s),r}function Lx(n,e,t,r={}){Ox(n,e,t,r)}function Fx(n,{instanceIdentifier:e}){const t=n.getProvider("app").getImmediate(),r=n.getProvider("auth-internal"),s=n.getProvider("app-check-internal");return new Sh(t,r,s,e,vr)}function Ux(){Lt(new Tt(OI,Fx,"PUBLIC").setMultipleInstances(!0)),dt(Kp,Hp,""),dt(Kp,Hp,"esm2020")}Ux();/**
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
 */const Bx="type.googleapis.com/google.protobuf.Int64Value",jx="type.googleapis.com/google.protobuf.UInt64Value";function FI(n,e){const t={};for(const r in n)n.hasOwnProperty(r)&&(t[r]=e(n[r]));return t}function Ca(n){if(n==null)return null;if(n instanceof Number&&(n=n.valueOf()),typeof n=="number"&&isFinite(n)||n===!0||n===!1||Object.prototype.toString.call(n)==="[object String]")return n;if(n instanceof Date)return n.toISOString();if(Array.isArray(n))return n.map(e=>Ca(e));if(typeof n=="function"||typeof n=="object")return FI(n,e=>Ca(e));throw new Error("Data cannot be encoded in JSON: "+n)}function As(n){if(n==null)return n;if(n["@type"])switch(n["@type"]){case Bx:case jx:{const e=Number(n.value);if(isNaN(e))throw new Error("Data cannot be decoded from JSON: "+n);return e}default:throw new Error("Data cannot be decoded from JSON: "+n)}return Array.isArray(n)?n.map(e=>As(e)):typeof n=="function"||typeof n=="object"?FI(n,e=>As(e)):n}/**
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
 */const Rh="functions";/**
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
 */const Wp={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class it extends vt{constructor(e,t,r){super(`${Rh}/${e}`,t||""),this.details=r,Object.setPrototypeOf(this,it.prototype)}}function Gx(n){if(n>=200&&n<300)return"ok";switch(n){case 0:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 500:return"internal";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}function xa(n,e){let t=Gx(n),r=t,s;try{const i=e&&e.error;if(i){const o=i.status;if(typeof o=="string"){if(!Wp[o])return new it("internal","internal");t=Wp[o],r=o}const c=i.message;typeof c=="string"&&(r=c),s=i.details,s!==void 0&&(s=As(s))}}catch{}return t==="ok"?null:new it(t,r,s)}/**
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
 */class qx{constructor(e,t,r,s){this.app=e,this.auth=null,this.messaging=null,this.appCheck=null,this.serverAppAppCheckToken=null,Xe(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.auth=t.getImmediate({optional:!0}),this.messaging=r.getImmediate({optional:!0}),this.auth||t.get().then(i=>this.auth=i,()=>{}),this.messaging||r.get().then(i=>this.messaging=i,()=>{}),this.appCheck||s==null||s.get().then(i=>this.appCheck=i,()=>{})}async getAuthToken(){if(this.auth)try{const e=await this.auth.getToken();return e==null?void 0:e.accessToken}catch{return}}async getMessagingToken(){if(!(!this.messaging||!("Notification"in self)||Notification.permission!=="granted"))try{return await this.messaging.getToken()}catch{return}}async getAppCheckToken(e){if(this.serverAppAppCheckToken)return this.serverAppAppCheckToken;if(this.appCheck){const t=e?await this.appCheck.getLimitedUseToken():await this.appCheck.getToken();return t.error?null:t.token}return null}async getContext(e){const t=await this.getAuthToken(),r=await this.getMessagingToken(),s=await this.getAppCheckToken(e);return{authToken:t,messagingToken:r,appCheckToken:s}}}/**
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
 */const Ku="us-central1",$x=/^data: (.*?)(?:\n|$)/;function zx(n){let e=null;return{promise:new Promise((t,r)=>{e=setTimeout(()=>{r(new it("deadline-exceeded","deadline-exceeded"))},n)}),cancel:()=>{e&&clearTimeout(e)}}}class Kx{constructor(e,t,r,s,i=Ku,o=(...c)=>fetch(...c)){this.app=e,this.fetchImpl=o,this.emulatorOrigin=null,this.contextProvider=new qx(e,t,r,s),this.cancelAllRequests=new Promise(c=>{this.deleteService=()=>Promise.resolve(c())});try{const c=new URL(i);this.customDomain=c.origin+(c.pathname==="/"?"":c.pathname),this.region=Ku}catch{this.customDomain=null,this.region=i}}_delete(){return this.deleteService()}_url(e){const t=this.app.options.projectId;return this.emulatorOrigin!==null?`${this.emulatorOrigin}/${t}/${this.region}/${e}`:this.customDomain!==null?`${this.customDomain}/${e}`:`https://${this.region}-${t}.cloudfunctions.net/${e}`}}function Hx(n,e,t){const r=Ut(e);n.emulatorOrigin=`http${r?"s":""}://${e}:${t}`,r&&zi(n.emulatorOrigin+"/backends")}function Wx(n,e,t){const r=s=>Jx(n,e,s,{});return r.stream=(s,i)=>Xx(n,e,s,i),r}function UI(n){return n.emulatorOrigin&&Ut(n.emulatorOrigin)?"include":void 0}async function Qx(n,e,t,r,s){t["Content-Type"]="application/json";let i;try{i=await r(n,{method:"POST",body:JSON.stringify(e),headers:t,credentials:UI(s)})}catch{return{status:0,json:null}}let o=null;try{o=await i.json()}catch{}return{status:i.status,json:o}}async function BI(n,e){const t={},r=await n.contextProvider.getContext(e.limitedUseAppCheckTokens);return r.authToken&&(t.Authorization="Bearer "+r.authToken),r.messagingToken&&(t["Firebase-Instance-ID-Token"]=r.messagingToken),r.appCheckToken!==null&&(t["X-Firebase-AppCheck"]=r.appCheckToken),t}function Jx(n,e,t,r){const s=n._url(e);return Yx(n,s,t,r)}async function Yx(n,e,t,r){t=Ca(t);const s={data:t},i=await BI(n,r),o=r.timeout||7e4,c=zx(o),u=await Promise.race([Qx(e,s,i,n.fetchImpl,n),c.promise,n.cancelAllRequests]);if(c.cancel(),!u)throw new it("cancelled","Firebase Functions instance was deleted.");const l=xa(u.status,u.json);if(l)throw l;if(!u.json)throw new it("internal","Response is not valid JSON object.");let d=u.json.data;if(typeof d>"u"&&(d=u.json.result),typeof d>"u")throw new it("internal","Response is missing data field.");return{data:As(d)}}function Xx(n,e,t,r){const s=n._url(e);return Zx(n,s,t,r||{})}async function Zx(n,e,t,r){var m;t=Ca(t);const s={data:t},i=await BI(n,r);i["Content-Type"]="application/json",i.Accept="text/event-stream";let o;try{o=await n.fetchImpl(e,{method:"POST",body:JSON.stringify(s),headers:i,signal:r==null?void 0:r.signal,credentials:UI(n)})}catch(y){if(y instanceof Error&&y.name==="AbortError"){const x=new it("cancelled","Request was cancelled.");return{data:Promise.reject(x),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(x)}}}}}}const S=xa(0,null);return{data:Promise.reject(S),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(S)}}}}}}let c,u;const l=new Promise((y,S)=>{c=y,u=S});(m=r==null?void 0:r.signal)==null||m.addEventListener("abort",()=>{const y=new it("cancelled","Request was cancelled.");u(y)});const d=o.body.getReader(),f=eD(d,c,u,r==null?void 0:r.signal);return{stream:{[Symbol.asyncIterator](){const y=f.getReader();return{async next(){const{value:S,done:x}=await y.read();return{value:S,done:x}},async return(){return await y.cancel(),{done:!0,value:void 0}}}}},data:l}}function eD(n,e,t,r){const s=(o,c)=>{const u=o.match($x);if(!u)return;const l=u[1];try{const d=JSON.parse(l);if("result"in d){e(As(d.result));return}if("message"in d){c.enqueue(As(d.message));return}if("error"in d){const f=xa(0,d);c.error(f),t(f);return}}catch(d){if(d instanceof it){c.error(d),t(d);return}}},i=new TextDecoder;return new ReadableStream({start(o){let c="";return u();async function u(){if(r!=null&&r.aborted){const l=new it("cancelled","Request was cancelled");return o.error(l),t(l),Promise.resolve()}try{const{value:l,done:d}=await n.read();if(d){c.trim()&&s(c.trim(),o),o.close();return}if(r!=null&&r.aborted){const m=new it("cancelled","Request was cancelled");o.error(m),t(m),await n.cancel();return}c+=i.decode(l,{stream:!0});const f=c.split(`
`);c=f.pop()||"";for(const m of f)m.trim()&&s(m.trim(),o);return u()}catch(l){const d=l instanceof it?l:xa(0,null);o.error(d),t(d)}}},cancel(){return n.cancel()}})}const Qp="@firebase/functions",Jp="0.13.3";/**
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
 */const tD="auth-internal",nD="app-check-internal",rD="messaging-internal";function sD(n){const e=(t,{instanceIdentifier:r})=>{const s=t.getProvider("app").getImmediate(),i=t.getProvider(tD),o=t.getProvider(rD),c=t.getProvider(nD);return new Kx(s,i,o,c,r)};Lt(new Tt(Rh,e,"PUBLIC").setMultipleInstances(!0)),dt(Qp,Jp,n),dt(Qp,Jp,"esm2020")}/**
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
 */function iD(n=Ki(),e=Ku){const r=Xt(X(n),Rh).getImmediate({identifier:e}),s=Ju("functions");return s&&oD(r,...s),r}function oD(n,e,t){Hx(X(n),e,t)}function Fs(n,e,t){return Wx(X(n),e)}sD();const Da={apiKey:"AIzaSyDpmm-NIEq80-NFg2Y6o9D6Ea4oghYJPhw",authDomain:"teh-tarik-app-my-own.firebaseapp.com",projectId:"teh-tarik-app-my-own",storageBucket:"teh-tarik-app-my-own.firebasestorage.app",messagingSenderId:"239722784519",appId:"1:239722784519:web:ccf12b2ff7f3575bd4c7a2",measurementId:"G-4LMGTL375D"};if(!Da.apiKey||!Da.projectId)throw new Error("Missing Firebase web config (need at least VITE_FIREBASE_API_KEY and VITE_FIREBASE_PROJECT_ID). Copy frontend/.env.example to frontend/.env.local and fill the VITE_FIREBASE_* values from Firebase Console → Project settings → Your apps.");const ho=Am(Da),Yp="".trim();function aD(n){if(!Yp)return null;try{return Db(n,{provider:new ll(Yp),isTokenAutoRefreshEnabled:!0})}catch{return null}}const IN=aD(ho),re=Qy(ho),jI=Mx(ho),_e=Kv(ho),cD="us-central1".trim()||"us-central1",Us=iD(ho,cD);Da.projectId;try{Yy(re).catch(n=>{n.code==="failed-precondition"||n.code})}catch{}const uD=new Set(["stmsalam@gmail.com","admin@stmsalam.com","admin@stm.com","haritha.mh77@gmail.com"].map(n=>n.toLowerCase())),lD=new Set(["rider1@stmsalam.com","rider2@stmsalam.com","rider3@stmsalam.com"].map(n=>n.toLowerCase()));function ou(n,e){const t=e==="admin"?"admin":e==="rider"?"rider":"user";if(t==="admin"||t==="rider")return t;const r=(n||"").trim().toLowerCase();return r&&uD.has(r)?"admin":r&&lD.has(r)?"rider":"user"}const GI=G.createContext();function hD({children:n}){const[e,t]=G.useState(()=>{try{const m=localStorage.getItem("stm_user");return m?JSON.parse(m):null}catch{return localStorage.removeItem("stm_user"),null}}),[r,s]=G.useState(!0),[i,o]=G.useState(!1),[c,u]=G.useState(()=>!!localStorage.getItem("stm_guest"));G.useEffect(()=>{const m=OA(_e,async y=>{var S;if(y){o(!0);let x="user",k=y.displayName||"Customer",O="",U="";try{const W=we(re,"users",y.uid),Q=await kr(W);if(Q.exists()){const E=Q.data();x=ou(y.email,E.role),k=E.name||k,typeof E.phone=="string"&&E.phone.trim()?O=E.phone.trim():typeof E.mobile=="string"&&E.mobile.trim()&&(O=E.mobile.trim()),typeof E.address=="string"&&E.address.trim()?U=E.address.trim():typeof E.defaultAddress=="string"&&E.defaultAddress.trim()&&(U=E.defaultAddress.trim())}else x=ou(y.email,null)}catch{x=ou(y.email,null)}try{((S=(await km(y)).claims)==null?void 0:S.admin)===!0&&(x="admin")}catch{}const B=typeof y.phoneNumber=="string"&&y.phoneNumber.trim()?y.phoneNumber.trim():"",z={id:y.uid,name:x==="admin"?k||"Admin Master":k,email:y.email,phone:O||B||"",address:U||"",role:x};t(z),localStorage.setItem("stm_user",JSON.stringify(z))}else o(!1),t(null),localStorage.removeItem("stm_user");s(!1)});return()=>m()},[]);const l=m=>{t(m),o(!0),u(!1),localStorage.setItem("stm_user",JSON.stringify(m)),localStorage.removeItem("stm_guest")},d=()=>{u(!0),t(null),localStorage.setItem("stm_guest","true"),localStorage.removeItem("stm_user")},f=()=>{t(null),o(!1),u(!1),localStorage.removeItem("stm_user"),localStorage.removeItem("stm_guest"),_e.signOut()};return _.jsx(GI.Provider,{value:{user:e,isGuest:c,login:l,loginAsGuest:d,logout:f,loading:r,isAuthenticated:i},children:n})}const dD=()=>G.useContext(GI),ka="stm-open-support",Ce={name:"STM Salam",tagline:"Authentic Kopitiam Flavors, Delivered.",outletName:"STM Salam — Blk 50A",outletAddress:"STM Salam — Blk 50A Marine Terrace, #01-303, Singapore 441050",address:"STM Salam — Blk 50A Marine Terrace, #01-303, Singapore 441050",outletLat:1.30892,outletLng:103.91548,freeDeliveryRadiusKm:5,deliveryFee:2,minOrderDelivery:10,minOrderFreeDelivery:10,minOrder:10,phone:"+65 9191 5766",whatsapp:"+65 9191 5766",email:"highlitesg786@gmail.com",website:"https://www.stmsalam.com",catalog:"https://wa.me/c/6591915766",hours:"Daily 9:00 AM – 11:00 PM",avgDeliveryTime:"25–35 min"},fD=[{id:1,name:"STM Salam — Blk 50A",address:"STM Salam — Blk 50A Marine Terrace, #01-303, Singapore 441050",phone:"+65 9191 5766",hours:"Daily 9:00 AM – 11:00 PM",isMain:!0,img:"/bg2.jpeg",lat:1.30892,lng:103.91548}],Xp=[{id:"hot-drinks",name:"Hot Drinks",emoji:"☕"},{id:"cold-drinks",name:"Cold Drinks",emoji:"🧊"},{id:"can-drinks",name:"Can Drinks",emoji:"🥫"},{id:"sugarcane",name:"Sugarcane",emoji:"🎋"},{id:"dinosaur",name:"Dinosaur",emoji:"🦕"},{id:"burgers-kebabs",name:"Burgers, Kebabs & More",emoji:"🍔"},{id:"snacks",name:"Snacks",emoji:"🥟"},{id:"sides",name:"Sides",emoji:"🍟"},{id:"desserts",name:"Desserts",emoji:"🍰"},{id:"indian",name:"Indian Food",emoji:"🍛",note:"Start 9:00 AM to 9:00 PM"}],qI="/bg1.jpeg",pD=/^(?:https?:)?\/\//i;function Zp(n){const e=typeof n=="string"?n.trim():"";if(!e)return qI;if(e.startsWith("data:")||e.startsWith("blob:")||pD.test(e))return e;const t=e.replace(/\\/g,"/").replace(/^\.\/+/,"/").replace(/^\/aboutusimages\//i,"/aboutusimage/").replace(/^aboutusimage\//i,"/aboutusimage/").replace(/^aboutusimages\//i,"/aboutusimage/").replace(/\/{2,}/g,"/"),r=t.startsWith("/")?t:`/${t}`;return encodeURI(r)}function $I({src:n,alt:e,fallbackSrc:t=qI,style:r,onError:s,...i}){const o=G.useMemo(()=>Zp(n),[n]),c=G.useMemo(()=>Zp(t),[t]),u=l=>{var f;const d=l.currentTarget;if(d!=null&&d.currentSrc||d!=null&&d.src,((f=d==null?void 0:d.dataset)==null?void 0:f.fallbackApplied)==="1"){s&&s(l);return}d.dataset.fallbackApplied="1",d.src=c,s&&s(l)};return _.jsx("img",{loading:"lazy",src:o,alt:e||"Image",onError:u,style:{width:"100%",height:"auto",objectFit:"cover",display:"block",...r},...i})}function mD(){var S,x,k;const[n,e]=G.useState(!1),[t,r]=G.useState(!1),{pathname:s}=om(),i=ME(),{user:o,isGuest:c,logout:u}=dD(),{totalItems:l}=ew();G.useEffect(()=>{const O=()=>e(window.scrollY>20);return window.addEventListener("scroll",O),()=>window.removeEventListener("scroll",O)},[]);const d=()=>_.jsx("div",{style:{background:"var(--gold)",color:"var(--green-dark)",textAlign:"center",padding:"8px 0",fontSize:"13px",fontWeight:950,letterSpacing:"1px",textTransform:"uppercase",borderBottom:"1px solid rgba(0,0,0,0.1)",zIndex:1100,position:"relative"},children:_.jsx("marquee",{scrollamount:"6",style:{display:"block"},children:"✨ MINIMUM ORDER SGD 10.00 FOR ALL DELIVERIES AND PICKUPS ✨ ENJOY AUTHENTIC STM SALAM FLAVORS ✨ MINIMUM ORDER SGD 10.00 ✨"})});G.useEffect(()=>{r(!1)},[s]);const f=[{to:"/",label:"Home"},{to:"/menu",label:"Menu"},{to:"/gallery",label:"Gallery"},{to:"/about",label:"About Us"},{to:"/profile",label:"Orders"}],m=()=>{u(),i("/login")},y=()=>{window.dispatchEvent(new CustomEvent(ka,{detail:{tab:"team"}}))};return _.jsxs(_.Fragment,{children:[_.jsx(d,{}),_.jsxs("nav",{style:{position:"sticky",top:0,zIndex:1e3,background:n?"rgba(1, 50, 32, 0.98)":"var(--green-dark)",backdropFilter:"blur(16px)",borderBottom:n?"1px solid rgba(201, 163, 68, 0.15)":"1px solid transparent",boxShadow:n?"0 10px 40px rgba(0,0,0,0.3)":"none",transition:"all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",padding:n?"10px 0":"18px 0",width:"100%",overflow:"hidden"},children:[_.jsxs("div",{className:"container",style:{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%"},children:[_.jsx(Ye,{to:"/",style:{display:"flex",alignItems:"center",gap:"12px",textDecoration:"none",transition:"transform 0.2s"},children:_.jsx($I,{src:"/stmsalamlogo.png",alt:"Logo",style:{width:"60px",height:"60px",objectFit:"contain"}})}),_.jsx("div",{className:"desktop-nav",style:{display:"flex",gap:"6px",alignItems:"center",background:"rgba(255,255,255,0.06)",padding:"6px",borderRadius:"16px",border:"1px solid rgba(255,255,255,0.08)"},children:f.map(O=>_.jsx(Ye,{to:O.to,style:{padding:"10px 22px",borderRadius:"12px",fontSize:"15px",fontWeight:700,color:s===O.to?"var(--green-dark)":"rgba(255,255,255,0.8)",background:s===O.to?"var(--gold)":"transparent",transition:"all 0.3s ease",textDecoration:"none"},children:O.label},O.to))}),_.jsx("div",{style:{display:"flex",gap:"12px",alignItems:"center"},children:_.jsxs("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[o?_.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[_.jsxs(Ye,{to:"/profile",style:{display:"flex",alignItems:"center",gap:"8px",textDecoration:"none"},children:[_.jsx("div",{style:{width:"36px",height:"36px",borderRadius:"50%",background:"var(--gold)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14px",fontWeight:900,color:"var(--green-dark)"},children:((x=(S=o.name)==null?void 0:S.charAt(0))==null?void 0:x.toUpperCase())||"U"}),_.jsx("span",{className:"nav-brand-text",style:{color:"white",fontWeight:700,fontSize:"14px",maxWidth:"100px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:(k=o.name)==null?void 0:k.split(" ")[0]})]}),_.jsx("button",{onClick:m,title:"Sign Out",style:{width:"36px",height:"36px",borderRadius:"12px",background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.7)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"},children:_.jsx(BE,{size:16})})]}):_.jsxs(Ye,{to:"/login",className:"nav-icon-btn",style:{padding:"8px 18px",borderRadius:"14px",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:"white",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",textDecoration:"none",fontSize:"14px",fontWeight:700},children:[_.jsx(ta,{size:18})," ",c?"Guest":"Sign In"]}),_.jsxs("button",{type:"button",onClick:y,title:"Chat with Admin",style:{padding:"8px 14px",borderRadius:"14px",background:"rgba(255,255,255,0.12)",border:"1px solid rgba(255,255,255,0.2)",color:"white",display:"flex",alignItems:"center",gap:"8px",fontSize:"13px",fontWeight:800,cursor:"pointer"},children:[_.jsx(es,{size:18})," ",_.jsx("span",{className:"nav-chat-label",children:"Chat with Admin"})]}),_.jsxs(Ye,{to:"/cart",style:{background:"var(--gold)",color:"var(--green-dark)",padding:"0 16px",borderRadius:"14px",height:"42px",display:"flex",alignItems:"center",gap:"10px",textDecoration:"none",fontWeight:900},children:[_.jsx(Ld,{size:18}),_.jsx("span",{style:{fontSize:"14px"},children:l})]}),_.jsx("button",{onClick:()=>r(!t),className:"mobile-toggle",style:{background:"rgba(255,255,255,0.08)",border:"none",color:"white",width:"42px",height:"42px",borderRadius:"14px",cursor:"pointer",display:"none",alignItems:"center",justifyContent:"center"},children:t?_.jsx(cm,{size:22}):_.jsx(jE,{size:22})})]})})]}),_.jsx("style",{children:`
          @media (max-width: 968px) {
            .desktop-nav { display: none !important; }
            .mobile-toggle { display: flex !important; }
            .container { padding: 0 16px !important; }
            .nav-chat-label { display: none; }
          }
        `})]}),t&&_.jsxs("div",{style:{position:"fixed",inset:0,zIndex:999,background:"var(--green-dark)",padding:"120px 40px",display:"flex",flexDirection:"column",gap:"20px"},children:[f.map(O=>_.jsx(Ye,{to:O.to,style:{fontSize:"40px",fontWeight:950,color:s===O.to?"var(--gold)":"white",textDecoration:"none"},children:O.label},O.to)),_.jsxs("button",{type:"button",onClick:()=>{y(),r(!1)},style:{fontSize:"28px",fontWeight:950,color:"var(--gold)",background:"none",border:"none",cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",gap:12,padding:0},children:[_.jsx(es,{size:32})," Chat with Admin"]}),_.jsx("div",{style:{marginTop:"auto",borderTop:"1px solid rgba(255,255,255,0.1)",paddingTop:"40px"},children:_.jsxs("div",{style:{display:"flex",gap:"20px",color:"rgba(255,255,255,0.5)",fontSize:"14px"},children:[_.jsx("span",{children:"Marine Terrace"}),_.jsx("span",{children:"•"}),_.jsx("span",{children:"Halal Certified"})]})})]}),_.jsxs("div",{className:"mobile-bottom-nav",children:[_.jsxs(Ye,{to:"/",className:`mobile-nav-item ${s==="/"?"active":""}`,children:[_.jsx(GE,{size:22}),_.jsx("span",{children:"Home"})]}),_.jsxs(Ye,{to:"/menu",className:`mobile-nav-item ${s==="/menu"?"active":""}`,children:[_.jsx(qE,{size:22}),_.jsx("span",{children:"Menu"})]}),_.jsxs(Ye,{to:"/cart",className:`mobile-nav-item ${s==="/cart"?"active":""}`,style:{position:"relative"},children:[_.jsx(Ld,{size:22}),_.jsx("span",{children:"Cart"}),l>0&&_.jsx("div",{style:{position:"absolute",top:-5,right:-5,background:"var(--green-dark)",color:"var(--gold)",fontSize:"10px",width:"16px",height:"16px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",fontWeight:900,border:"1.5px solid white"},children:l})]}),_.jsxs(Ye,{to:"/gallery",className:`mobile-nav-item ${s==="/gallery"?"active":""}`,children:[_.jsx($E,{size:22}),_.jsx("span",{children:"Gallery"})]}),_.jsxs(Ye,{to:"/profile",className:`mobile-nav-item ${s==="/profile"?"active":""}`,children:[_.jsx(ta,{size:22}),_.jsx("span",{children:"Profile"})]})]})]})}function gD(){const n=()=>{window.dispatchEvent(new CustomEvent(ka,{detail:{tab:"team"}}))};return _.jsxs("footer",{style:{background:"var(--green-dark)",color:"white",paddingTop:"72px",width:"100%",overflow:"hidden"},children:[_.jsxs("div",{className:"container",children:[_.jsxs("div",{className:"footer-grid",style:{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:"56px",marginBottom:"56px"},children:[_.jsxs("div",{className:"footer-brand",children:[_.jsxs("div",{style:{marginBottom:"24px",display:"flex",alignItems:"center",gap:"14px"},children:[_.jsx($I,{src:"/stmsalamlogo.png",alt:"Logo",style:{width:"64px",height:"64px",objectFit:"contain"}}),_.jsxs("div",{style:{display:"flex",flexDirection:"column"},children:[_.jsx("div",{style:{fontSize:"26px",fontWeight:950,color:"var(--gold)",letterSpacing:"-0.5px",lineHeight:1},children:"Salam"}),_.jsx("div",{style:{fontSize:"11px",color:"rgba(255,255,255,0.5)",fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",marginTop:"4px"},children:"Genuine Taste Since 1988"})]})]}),_.jsx("p",{style:{color:"rgba(255,255,255,0.6)",fontSize:"15px",lineHeight:1.8,maxWidth:"300px",marginBottom:"32px"},children:"Experience the peak of Marine Terrace hospitality. Premium ingredients, crafted with excellence and delivered with grace."}),_.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"24px"},children:[_.jsxs("div",{style:{background:"rgba(255,255,255,0.05)",padding:"16px 20px",borderRadius:"16px",border:"1px solid rgba(255,255,255,0.1)",display:"flex",alignItems:"center",gap:"16px"},children:[_.jsx("div",{style:{width:"40px",height:"40px",borderRadius:"12px",background:"var(--gold)",color:"var(--green-dark)",display:"flex",alignItems:"center",justifyContent:"center"},children:_.jsx(zE,{size:20})}),_.jsxs("div",{children:[_.jsx("div",{style:{fontSize:"10px",color:"var(--gold)",fontWeight:800,textTransform:"uppercase",letterSpacing:"1px"},children:"Quick Support"}),_.jsx("div",{style:{fontSize:"18px",fontWeight:900},children:Ce.phone})]})]}),_.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:fD.map((e,t)=>_.jsxs("div",{style:{display:"flex",gap:"12px",alignItems:"flex-start",color:"rgba(255,255,255,0.7)",fontSize:"13px"},children:[_.jsx("span",{style:{color:"var(--gold)",marginTop:"2px",flexShrink:0},children:_.jsx(KE,{size:16})}),_.jsxs("div",{children:[_.jsx("div",{style:{color:"white",fontWeight:800,fontSize:"14px",marginBottom:"2px"},children:e.name}),e.address]})]},e.id))}),_.jsxs("div",{style:{display:"flex",gap:"12px",alignItems:"center",color:"rgba(255,255,255,0.7)",fontSize:"14px"},children:[_.jsx("span",{style:{color:"var(--gold)",flexShrink:0},children:_.jsx(um,{size:16})}),_.jsx("span",{children:Ce.hours})]})]})]}),_.jsxs("div",{children:[_.jsx("h4",{style:{fontSize:"13px",fontWeight:900,letterSpacing:"2px",textTransform:"uppercase",color:"var(--gold)",marginBottom:"24px"},children:"Explore"}),_.jsx("ul",{style:{listStyle:"none",display:"flex",flexDirection:"column",gap:"14px",padding:0},children:[["Main Menu","/menu"],["Your Cart","/cart"],["Track Delivery","/tracking"],["My Profile","/profile"]].map(([e,t])=>_.jsx("li",{children:_.jsx(Ye,{to:t,style:{color:"rgba(255,255,255,0.7)",fontSize:"15px",fontWeight:500,textDecoration:"none"},children:e})},t))})]}),_.jsxs("div",{children:[_.jsx("h4",{style:{fontSize:"13px",fontWeight:900,letterSpacing:"2px",textTransform:"uppercase",color:"var(--gold)",marginBottom:"24px"},children:"Support"}),_.jsxs("ul",{style:{listStyle:"none",display:"flex",flexDirection:"column",gap:"14px",padding:0},children:[_.jsx("li",{children:_.jsxs("button",{type:"button",onClick:n,style:{display:"inline-flex",alignItems:"center",gap:8,background:"var(--gold)",color:"var(--green-dark)",border:"none",borderRadius:12,padding:"10px 16px",fontSize:"14px",fontWeight:900,cursor:"pointer",width:"100%",justifyContent:"center"},children:[_.jsx(es,{size:18})," Chat with Admin"]})}),_.jsx("li",{children:_.jsx(Ye,{to:"/about",style:{color:"rgba(255,255,255,0.7)",fontSize:"15px",fontWeight:500,textDecoration:"none"},children:"About STM"})}),["Latest Promos","Delivery Info","Halal Status"].map(e=>_.jsx("li",{children:_.jsx("a",{href:"#",style:{color:"rgba(255,255,255,0.7)",fontSize:"15px",fontWeight:500,textDecoration:"none"},children:e})},e))]})]}),_.jsxs("div",{children:[_.jsx("h4",{style:{fontSize:"13px",fontWeight:900,letterSpacing:"2px",textTransform:"uppercase",color:"var(--gold)",marginBottom:"24px"},children:"Portals"}),_.jsxs("ul",{style:{listStyle:"none",display:"flex",flexDirection:"column",gap:"14px",padding:0},children:[_.jsx("li",{children:_.jsx(Ye,{to:"/admin",style:{color:"#86EFAC",fontSize:"15px",fontWeight:800,textDecoration:"none"},children:"Admin Login ↗"})}),_.jsx("li",{children:_.jsx(Ye,{to:"/driver",style:{color:"#FCA5A5",fontSize:"15px",fontWeight:800,textDecoration:"none"},children:"Driver Portal ↗"})}),["Terms of Service","Privacy Policy"].map(e=>_.jsx("li",{children:_.jsx("a",{href:"#",style:{color:"rgba(255,255,255,0.7)",fontSize:"15px",fontWeight:500,textDecoration:"none"},children:e})},e))]})]})]}),_.jsxs("div",{style:{borderTop:"1px solid rgba(255,255,255,0.1)",padding:"32px 0",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"24px"},children:[_.jsxs("p",{style:{color:"rgba(255,255,255,0.4)",fontSize:"14px"},children:["© ",new Date().getFullYear()," Salam Teh Tarik. All rights reserved."]}),_.jsxs("div",{style:{display:"flex",gap:"32px",alignItems:"center"},children:[_.jsxs("div",{style:{display:"flex",gap:"16px",alignItems:"center"},children:[_.jsx("a",{href:"https://facebook.com/stmsalam",target:"_blank",rel:"noreferrer",style:{color:"rgba(255,255,255,0.4)",transition:"0.3s color"},onMouseEnter:e=>e.currentTarget.style.color="var(--gold)",onMouseLeave:e=>e.currentTarget.style.color="rgba(255,255,255,0.4)",children:_.jsx(HE,{size:20})}),_.jsx("a",{href:"https://instagram.com/stmsalam",target:"_blank",rel:"noreferrer",style:{color:"rgba(255,255,255,0.4)",transition:"0.3s color"},onMouseEnter:e=>e.currentTarget.style.color="var(--gold)",onMouseLeave:e=>e.currentTarget.style.color="rgba(255,255,255,0.4)",children:_.jsx(WE,{size:20})})]}),_.jsx("div",{style:{width:"1px",height:"24px",background:"rgba(255,255,255,0.1)"}}),_.jsx("span",{style:{background:"var(--gold)",color:"var(--green-dark)",fontSize:"11px",fontWeight:950,padding:"6px 14px",borderRadius:"30px",letterSpacing:"1px"},children:"HALAL Certified"}),_.jsx("span",{style:{color:"rgba(255,255,255,0.4)",fontSize:"14px"},children:"STM Salam — Blk 50A Marine Terrace, #01-303, Singapore 441050"})]})]})]}),_.jsx("style",{children:`
        @media (max-width: 968px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 48px !important; text-align: center; }
          .footer-brand { display: flex; flex-direction: column; align-items: center; }
          .footer-brand p { margin: 0 auto 32px !important; }
          .footer-brand > div { justify-content: center; }
        }
      `}),_.jsx("div",{style:{textAlign:"center",paddingBottom:"24px",color:"rgba(255,255,255,0.25)",fontSize:"10px",fontWeight:600,letterSpacing:"0.5px"},children:"Designed by HamoTech PTE. LTD."})]})}const _D=({message:n="Hi STM Salam, I need help with my order",type:e="floating",label:t="Chat with Admin",className:r="",style:s={}})=>{const o=`https://wa.me/${Ce.whatsapp.replace(/\D/g,"")}?text=${encodeURIComponent(n)}`;return e==="button"?_.jsxs(Ri.a,{href:o,target:"_blank",rel:"noopener noreferrer",className:`btn ${r}`,style:{display:"inline-flex",alignItems:"center",gap:"10px",background:"#25d366",color:"white",padding:"14px 28px",borderRadius:"16px",fontWeight:800,textDecoration:"none",boxShadow:"0 10px 20px rgba(37,211,102,0.2)",border:"none",cursor:"pointer",...s},whileHover:{scale:1.02,y:-2},whileTap:{scale:.98},children:[_.jsx(es,{size:20}),t]}):_.jsxs(Ri.a,{href:o,target:"_blank",rel:"noopener noreferrer",className:r,style:{position:"fixed",bottom:"30px",right:"30px",width:"60px",height:"60px",background:"#25d366",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"white",boxShadow:"0 10px 30px rgba(0,0,0,0.15), 0 0 20px rgba(37,211,102,0.4)",zIndex:9991,cursor:"pointer",...s},initial:{scale:0,opacity:0},animate:{scale:1,opacity:1},whileHover:{scale:1.1,rotate:5},whileTap:{scale:.9},children:[_.jsx(es,{size:32}),_.jsxs("div",{className:"whatsapp-tooltip",style:{position:"absolute",right:"75px",background:"white",color:"#1f2937",padding:"8px 16px",borderRadius:"12px",fontSize:"13px",fontWeight:800,boxShadow:"0 8px 16px rgba(0,0,0,0.1)",whiteSpace:"nowrap",pointerEvents:"none",opacity:0,transform:"translateX(10px)",transition:"all 0.3s ease",border:"1px solid #f1f5f9"},children:[t,_.jsx("div",{style:{position:"absolute",right:"-6px",top:"50%",transform:"translateY(-50%) rotate(45deg)",width:"12px",height:"12px",background:"white",borderRight:"1px solid #f1f5f9",borderTop:"1px solid #f1f5f9"}})]}),_.jsx("style",{children:`
        a:hover .whatsapp-tooltip {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
        @media (max-width: 768px) {
          .whatsapp-tooltip { display: none !important; }
        }
      `})]})};function em(n){const e=(n||"").toLowerCase().trim();if(!e)return"Hi! I’m the STM Salam assistant. Try asking about **opening hours**, **delivery**, **minimum order**, **our address**, or **how to track an order**.";const t=`${Ce.outletName} — ${Ce.outletAddress}`;return/hour|open|close|time|when/.test(e)?`We’re open **${Ce.hours}**. Last orders may vary on busy nights — the team will confirm on WhatsApp (${Ce.phone}) if needed.`:/where|address|location|find you|outlet|marine|terrace|blk|block|441050/.test(e)?`You can order for pickup or delivery from our outlet:

**${Ce.outletName}**
${Ce.outletAddress}

We’re the kitchen your delivery or pickup is fulfilled from.`:/deliver|delivery|radius|km|distance|fee|free ship|shipping/.test(e)?`**Delivery rules (summary):**
• Minimum **SGD ${Ce.minOrderDelivery.toFixed(2)}** subtotal for delivery.
• **Free delivery** if your address is within **${Ce.freeDeliveryRadiusKm} km** of our outlet and you meet the minimum.
• Otherwise a **SGD ${Ce.deliveryFee.toFixed(2)}** delivery fee applies (final amount is confirmed at checkout once your address is checked).
• **Pickup** is always available at the outlet — no delivery fee.`:/minimum|min order|less than|below \$?10/.test(e)?`For **delivery**, we need at least **SGD ${Ce.minOrderDelivery.toFixed(2)}** in your cart. You can still use **pickup** for smaller orders, or add a few more items.`:/track|order status|where is my|stm-/.test(e)?`Open **Order tracking** from the menu and enter your **order ID** (e.g. STM-…). You’ll see status updates there. If you’re stuck, use **Live team** in this chat or WhatsApp **${Ce.phone}**.`:/pay|payment|paynow|qr|stripe|paypal|cash/.test(e)?"We support **PayNow (SGQR)**, **card / demo checkout**, and **cash** (where available). At checkout you’ll see the exact options. For PayNow help, tap **Payment Help** on the checkout page or WhatsApp us.":/menu|food|halal|vegetarian|spicy|price/.test(e)?`Browse the full **Menu** on the site for items and prices. If you need ingredient or halal details, tap **Live team** or WhatsApp **${Ce.phone}** and the kitchen will confirm.`:/phone|whatsapp|call|contact/.test(e)?`Reach us at **${Ce.phone}** or WhatsApp **${Ce.whatsapp}**. For written follow-up on an existing order, **Live team** in this chat is best.`:/human|agent|staff|real person|admin/.test(e)?"Switch to the **Live team** tab in this chat — a staff member can read your thread from the admin dashboard and reply when they’re available.":/thank|thanks|great/.test(e)?`You’re welcome! Enjoy your meal — and thanks for choosing **${Ce.name}**.`:`I don’t have a specific answer for that yet. Try rephrasing, or ask about **hours**, **delivery**, **address**, or **tracking**.

For anything personal (payments, allergies, special requests), open the **Live team** tab or WhatsApp **${Ce.phone}**.

_Outlet:_ ${t}`}const yD=["Opening hours?","Delivery rules","Outlet address","Track my order"];function ID(n){if(n&&Object.prototype.hasOwnProperty.call(n,"active"))throw new Error("product.active is forbidden. Use available only.")}function ED(n){return Object.prototype.hasOwnProperty.call(n||{},"available")?n:{...n,available:!0}}function wD(n){const e=String(n||""),t=e.includes("collection('products')")||e.includes('collection("products")')||e.includes("getDocs(products)")||e.includes("getDocs(collection(db, 'products'))")||e.includes('getDocs(collection(db, "products"))'),r=e.includes("shared/useProductsCore.js")||e.includes("useProductsCore");if(t&&!r)throw new Error("Direct product query forbidden. Use shared/useProductsCore.js")}function TD(n,e){const t=String(e);if(t!=="useProductsCore")throw new Error("Unsafe product query access blocked");return wD(`shared/useProductsCore.js:${t}`),n()}function tm(n){if(!n)return 0;if(typeof(n==null?void 0:n.toMillis)=="function")return n.toMillis();const e=Date.parse(String(n));return Number.isFinite(e)?e:0}function zI(n){const e=ED(n);return ID(e),e}function AD(n,e=!1){const t=zI(n);return e?!0:(t==null?void 0:t.available)!==!1}let nm=!1;function vD(n){if(!n||!Object.prototype.hasOwnProperty.call(n,"active"))return n;nm||(nm=!0);const{active:e,...t}=n;return t}function bD(n){const e=String((n==null?void 0:n.code)||"").toLowerCase(),t=String((n==null?void 0:n.message)||"").toLowerCase();return e.includes("failed-precondition")||t.includes("index")}function SD({firestore:n,db:e,categoryId:t,orderByCreatedDesc:r,withOrderBy:s}){return TD(()=>{const i=[];return t&&t!=="all"&&i.push(n.where("categoryId","==",t)),r&&s&&i.push(n.orderBy("createdAt","desc")),i.length?n.query(n.collection(e,"products"),...i):n.query(n.collection(e,"products"))},"useProductsCore")}function Ph({firestore:n,db:e,categoryId:t,includeUnavailable:r=!1,orderByCreatedDesc:s=!0,onData:i,onError:o,onIndexWarning:c}){let u=!1,l=()=>{};const d=f=>{l();const m=SD({firestore:n,db:e,categoryId:t,orderByCreatedDesc:s,withOrderBy:f});l=n.onSnapshot(m,y=>{try{const S=y.docs.map(x=>({id:x.id,...x.data()})).map(x=>vD(x)).map(x=>zI(x)).filter(x=>AD(x,r)).sort((x,k)=>tm(k.createdAt)-tm(x.createdAt));i(S)}catch(S){o==null||o(S instanceof Error?S:new Error(String(S)))}},y=>{if(!u&&f&&s&&bD(y)){u=!0,c==null||c(y),d(!1);return}o==null||o(y)})};return d(!0),()=>l()}const Na={SNACKS:["7_DAYS__1_piece__SGD_1.50.png","Bhai_suji_SGD_8.00.png","Candy_1_packet_SGD_1.70.png","Chicken_curry_puffs_1_piece_SGD_2.40.png","Coconut_bun__SGD_1.20.png","Kaya_bun__SGD_1.20.png","mutton_curry_puff_1_piece_SGD_2.40.png","Potato_curry_puffs_1_piece__SGD_2.00.png","Roti_curry_1_piece__SGD_1.30.png","Roti_curry_5_piece__SGD_6.00.png","TAPIOCA_SAMBAL_SGD_4.70.png","tapioca__chips_sgd_4.20.png"],"BURGER KABABAB":["BEEF_BURGER_CHEESY__SGD_7.40_.png","BEEF_BURGER_classic__SGD_6.40_.png","BEEF_BURRTIO__SGD_10.40_.jpg","BEEF_HEALTHY_BOWL__SGD_11.50_.png","BEEF_KEBAB__8.90_.jpg","BEEF_QUESADILLA__11.50_.png","Chicken_burger_CHEESY__SGD_6.90_.png","Chicken_burger_classic__SGD_6.90_.png","CHICKEN_BURRITO__SGD_9.40_.png","CHICKEN_HEALTHY_BOWL__SGD_11.00_.jpg","CHICKEN_KEBAB__SGD_6.90_.png","CHICKEN_QUESADILLA__SGD_10.50_.jpg","HUMMUS_BEEF__tortilla___SGD_11.50_.png","HUMMUS_CHICKEN__tortilla___11.00_.png","Hummus_FALAFEL__tortilla___SGD_10.90_.png","HUMMUS_LAMB__tortilla___SGD_13.50_.png","Hummus__SGD_6.40_.png","LAMB_BURGER_CHEESY__SGD_7.90_.png","LAMB_BURGER_CLASSIC__SGD_7.90_.png","LAMB_BURRITO__SGD_12.40_.png","LAMB_HEALTHY_BOWL__SGD_12.50_.jpg","LAMB_KEBAB__SGD_10.40_.png","LAMB_QUESADILLA__SGD_12.10_.png","MIX_BURRITO__BEEF_CHICKEN___SGD_11.40_.png","MIX_KEBAB__BEEF_CHICKEN____SDG_9.50__.png","PLATE_RICE_BEEF__SGD_11.50_.png","PLATE_RICE_LAMB__SGD_12.50_.png","PLATE_RICE_SHAWARMA_CHICKEN__SGD_11.00_.png","VEG_FALAFEL_BURRITO__9.40_.jpg","VEG_FALAFEL_HEALTHY_BOWL__SGD_11.00_.png","VEG_FALAFEL_KEBAB__SGD_6.90_.png","VEG_FALAFEL_QUESADILLA__SGD_10.40_.jpg"],DINOSAUR:["Bandong_dinosaur__SGD_3.60_.png","Boost_dinosaur__SGD_2.90_.png","Horlicks_dinosaur_Ice__SGD_3.00_.png","Milo_Dino_ICE__SGD_3.60_.png"],DESERT:["KUNAFA_ORGIINAL_SGD_12.00.png","KUNAFE_NEUTELLA__SGD_14.90.png"],"COLD DRINKS":["Bandong_ice__SGD_2.70_SGD_2.80.png","Blueberry_longan__SGD_3.50.png","Blueberry_soda_ice__SGD_3.50.png","Blueberry__SGD_2.80_SGD_2.90.png","Boost_ice_SGD_2.90.png","Fresh_ice__ginger_lemon_SGD_2.80_SGD_3.00.png","Fresh_ice__lemon_tea__SGD_2.70_SGD_2.90.png","Fresh_lemon_juice__ice_SGD_2.70.png","Fresh__virgin__mojito_soda__ice__SGD_3.80_SGD_4.00.png","Honeydew_milk_Ice__SGD_2.80.png","Honeydew_soda__ice__SGD_3.50_SGD_3.70.png","Honey__lemon_soda__ice_SGD_3.70.png","Honey__lemon__ginger__ice_SGD_3.00.png","Honey__lemon__ice__SGD_2.70_SGD_2.90.png","Horlicks__ice__SGD_3.00.png","Ice_BRU_coffee__SGD_2.80.png","Ice_Limau_SGD_2.70_SGD_2.90.png","Kopi_C_kosong_ice__SGD_2.70_SGD_2.90.png","Kopi_ice_SGD_2.50_SGD_2.70.png","Kopi_O_ice__SGD_2.30_SGD_2.50.png","Lemon_soda_SGD_3.50.png","Longan_ice__SGD_3.00.png","Lychee_ice_SGD_2.90.png","Masala_tea_ice__SGD_2.90.png","Milo_Ice_SGD_2.70_SGD_2.90.png","Nescafe__ice_SGD_2.80.png","Syrup__ice_SGD_2.70.png","Syrup__Limau_ice_SGD_3.00.png","Tea_O_ginger_SGD_2.80.png","Teh_cino_ice__SGD_3.00.png","Teh_C_kosong_ice_SGD_2.70.png","Teh_ginger_ice__SGD_2.90_SGD_3.00.png","TEH_O_ICE_LIMAU__SGD_2.70.png","Teh_O_ice_SGD_2.20_SGD_2.40.png","Teh_O_mint_ice_SGD_2.60_SGD_2.70.png","Ying_yang_Ice_SGD_2.80_SGD_3.00.png"],"CAN DRINKS":["100_PLUS__SGD_1.90_.png","APPLE_CAN_DRINK__SGD_1.90_.png","AYATAKA__SGD_1.90_.png","CHRYSANTHEMUM_TEA__SGD_1.90_.png","DASANI_WATER__SGD_1.50_.png","Ice_cream_soda__SGD_1.90_.png","KICKAPOO__SGD_1.90_.png","Oolong_TEA__SGD_1.90_.png","QOO__SDG_1.90_.png","REDBULL__SGD_2.00_.png"],"INDIAN FOOD":["Chicken_biryani__SGD_9.90.png","MEE_COMPO__SGD_12.90.png","MEE_GORENG_SEA_FOOD__SGD_8.50.png","MEE_GORENG__SGD_6.90.png","MURTABAK__CHICKEN____SGD_10.90.png","MURTABAK__MUTTON__sgd__13.50.png","mutton_biriyani_SGD_11.20.png","PRATA_TELUR___SGD_4.20.png","TOSAI_MASALA__SGD_5.50.png"],SUGARCANE:["Fresh_sugarcan_asam__ice__SGD_4.70_.png","Fresh_sugarcan_ice__SGD_4.00_.png","Fresh_Sugercan__lemon_LESS__ice__SGD_4.50_.png","Fresh_Sugercan__lemon_no_ice__SGD_4.90_.png"],HOT:["BOOST_HOT__SGD_2.50_.png","BRU_COFFEE_GINGER__2.40_SGD__.png","BRU_COFFEE_NO_SUGAR__SGD_2.40_.png","Cofee_cino_HOT__SGD_3.00_.png","GINGER_HORLICKS_HOT__SGD_2.70_.png","GINGER_KOPI___SGD_2.40_.png","GINGER_WATER_HOT__SGD_2.50_.png","HOT_MILK__1.80_SGD_.png","Hot_Teh_Chino__SGD_3.00_.png","HOT_TEH_O__LIMAU__SGD_2.20_.png","KOPI_O_GINGER__SGD_2.10_.png","MILO_GINGER__SGD_2.40_.png","MILO_HOT__SGD_2.40_.png","MSALA_TEA_WITH_GINGER___SGD_2.50_.png","NESCAFE_GINGER___SGD_2.90_.png","NESCAFE_HOT__SGD_2.90_.png","NESLO__HOT___SGD_2.50_.png","TEH_C_NO_SUGAR__SGD_2.20_.png","TEH_O_GINGER__SGD_2.30_.png","TEH_O_MINT_HOT__SGD_2.10_.png","TEH_O__SGD_1.70_.png","TEH_TARIK_ICE__SGD_3.00_.png","TEH_TARIK__SGD_2.00_.png","YING_YANG___SGD_2.20_.png"],SIDES:["CHEESE_FRIES_SGD__7.80.png","chicken_nuggets__6_pieces__SGD_6.40.png","french_fries_SGD_6.90.png","ONION_RINGS_SGD_6.90.png"]};var RD={};function PD(){return typeof process<"u"&&RD&&"production".toLowerCase()==="production"}const CD=["pending_payment","placed","paid","refunded","preparing","ready_for_pickup","out_for_delivery","delivered","cancelled","failed"],xD={pending_payment:{paid:"webhook",failed:"webhook",cancelled:"admin"},placed:{refunded:"admin",preparing:"admin",cancelled:"admin"},paid:{refunded:"admin",preparing:"admin",cancelled:"admin"},refunded:{},preparing:{ready_for_pickup:"admin",cancelled:"admin"},ready_for_pickup:{out_for_delivery:"rider",cancelled:"admin"},out_for_delivery:{delivered:"rider",cancelled:"admin"},delivered:{},cancelled:{},failed:{cancelled:"admin"}},rm=new Set(CD);function Va(n){return String(n??"").trim().toLowerCase().replace(/-/g,"_").replace(/\s+/g,"_")}function DD(n,e){const t=Va(n),r=xD[t]||{};return Object.entries(r).filter(([,s])=>e?s===e:!0).map(([s])=>s)}const kD={pending:"paid",confirmed:"preparing",ready:"ready_for_pickup",delivering:"out_for_delivery",complete:"delivered",completed:"delivered",refunded:"refunded",canceled:"cancelled",assigned:"out_for_delivery",picked_up:"out_for_delivery"};function au(n,e){const t=String((n==null?void 0:n.paymentMethod)??(n==null?void 0:n.payment_mode)??(n==null?void 0:n.paymentMode)??"").trim().toUpperCase();return t!=="COD"&&t!=="CASH"||Va(e)!=="paid"?e:String((n==null?void 0:n.paymentStatus)??(n==null?void 0:n.payment_status)??"").trim().toUpperCase()==="PAID"?"paid":"placed"}function ND(n,e){const t=(e==null?void 0:e.strict)??PD(),r=(e==null?void 0:e.logger)||(()=>{}),s=Va(n==null?void 0:n.status);if(rm.has(s)){const o=String((n==null?void 0:n.paymentMethod)??(n==null?void 0:n.payment_mode)??(n==null?void 0:n.paymentMode)??"").trim().toUpperCase();if(s==="pending_payment"&&String((n==null?void 0:n.paymentStatus)??"").toUpperCase()==="PAID")return r("state mismatch: pending_payment with PAID paymentStatus",{status:s,paymentStatus:n==null?void 0:n.paymentStatus}),t&&r("strict mode: normalized persisted pending_payment+PAID to paid",{paymentMethod:o||null}),o==="STRIPE"?"paid":s;if(s==="placed"){const c=String((n==null?void 0:n.paymentStatus)??(n==null?void 0:n.payment_status)??"").trim().toUpperCase();c==="NOT_APPLICABLE"||c==="COD_PENDING"||(o==="COD"||o==="CASH")&&c==="PENDING"||(r("state mismatch: placed requires paymentStatus NOT_APPLICABLE or COD_PENDING (legacy COD PENDING accepted)",{status:s,paymentStatus:n==null?void 0:n.paymentStatus,paymentMethod:o||null}),t&&r("strict mode: tolerated placed mismatch for read normalization",{paymentMethod:o||null}))}return au(n,s)}const i=[n==null?void 0:n.orderStatus,n==null?void 0:n.order_status,n==null?void 0:n.stage].map(Va).filter(Boolean);for(const o of i){const c=rm.has(o)?o:kD[o];if(c)return r("legacy status mapped",{source:o,mapped:c}),au(n,c)}if(r("unknown order status token",{status:n==null?void 0:n.status,orderStatus:n==null?void 0:n.orderStatus,order_status:n==null?void 0:n.order_status,stage:n==null?void 0:n.stage}),t)throw new Error("Invalid persisted order state");return au(n,"paid")}function Oa(n){return ND(n||{},{strict:typeof process<"u",logger:(e,t)=>{}})}function VD(n){const e=DD(n,"admin");return e.includes("preparing")?"preparing":e.includes("ready_for_pickup")?"ready_for_pickup":e[0]||null}function KI(n){const e=String(n||"").trim().toUpperCase().replace(/\s+/g,"_");return e==="CANCELLED"||e==="CANCELED"?"cancelled":e==="CONFIRMED"||e==="PREPARING"?"preparing":e==="READY"?"ready_for_pickup":e==="PLACED"?"placed":e==="PENDING"?"paid":e==="OUT_FOR_DELIVERY"||e==="DELIVERING"||e==="ON_THE_WAY"?"out_for_delivery":e==="DELIVERED"||e==="COMPLETE"||e==="COMPLETED"?"delivered":String(n||"").trim().toLowerCase().replace(/\s+/g,"_")}const OD=Object.freeze(["LOCAL","DUAL_READ","SHARED"]);function sm(n){const e=String(n??"").trim().toUpperCase();return e&&OD.includes(e)?e:null}function MD(n){const e=sm(n==null?void 0:n.forceModeRaw);if(e)return e;const t=sm(n==null?void 0:n.modeRaw);return t||(n==null?void 0:n.defaultMode)}const LD=1;function FD(n){const e=String(n??"").trim().toLowerCase();return e==="paid"||e==="placed"}function EN(n){const e=Oa(typeof n=="object"&&n!==null?n:{status:n});return VD(e)}function Ch(n){const e=n.paymentMethod??n.payment_method??"";return String(e).toLowerCase().trim()}function UD(n){const e=n==null?void 0:n.paidAt;return e!=null&&e!==""}function BD(n){if(String(n.paymentStatus??n.payment_status??"").trim().toUpperCase()==="PAID"||UD(n))return!0;const t=String(n.paymentMethod??n.payment_mode??"").trim().toUpperCase();return t==="COD"||t==="CASH"?!1:String(n.status??"").trim().toLowerCase()==="paid"}function HI(n){const e=String(n.paymentStatus??"").trim(),t=e.toLowerCase();let r;if(t==="paid"||e==="PAID")r="PAID";else if(t==="not_applicable"||e==="NOT_APPLICABLE")r="NOT_APPLICABLE";else if(t==="pending_verification"||e==="PENDING_VERIFICATION")r="PENDING_VERIFICATION";else if(t==="failed")r="FAILED";else{const i=String(n.payment_status??"").trim().toLowerCase();i==="paid"?r="PAID":r="PENDING"}return Ch(n)==="cod"?"NOT_APPLICABLE":r}function jD(n,e){return n?"SETTLED":e==="FAILED"?"FAILED":e==="NOT_APPLICABLE"?"NOT_APPLICABLE":e==="PENDING_VERIFICATION"?"PENDING_VERIFICATION":"UNSETTLED"}function GD(n){return MD(n)}function qD(n,e,t){const r=n&&typeof n=="object"?n:{},s=Ch(r),i=s==="cod",o=Oa(r),c=HI(r),u=BD(r),l=FD(o),d=String(o).trim().toUpperCase().replace(/-/g,"_"),f=jD(u,c);return{readModelVersion:e,modeUsed:t,canonicalStatus:o,paymentMethodNorm:s,paymentStatusNorm:c,isCOD:i,isSettled:u,isQueueEligible:l,uiStatus:d,financialStatus:f}}function $D(n,e){const t=LD,r=GD({modeRaw:e==null?void 0:e.modeUsed,defaultMode:"LOCAL"});return qD(n,t,r)}function zD(n){const e=Ch(n);return e==="cod"||e==="phone"?{ok:!0}:HI(n)==="PAID"?{ok:!0}:{ok:!1,reason:"Payment must be verified (PAID) before confirming. Complete Stripe verification or mark QR/online as PAID."}}function wN(n,e){if(e==="all")return!0;const t=$D(n),r=t.paymentMethodNorm,s=t.paymentStatusNorm;return e==="cod"?r==="cod":e==="stripe_paid"?(r==="stripe"||r==="paypal")&&s==="PAID":e==="qr_pending"?r==="qr"&&s!=="PAID":!0}function KD(n){const e=(n||"").trim().toLowerCase();return e?e.includes("order status")||e.includes("track order")||e.includes("where is my order")?"You can track your order in the Order Tracking screen.":e.includes("payment")||e.includes("pay now")||e.includes("stripe")?"Payments are processed securely via Stripe, COD, or QR where available.":e.includes("refund")?"Admin will review refund requests shortly.":/\bhello\b|^hi\b|^hey\b|\bhi!\b/.test(e)?"Hi 👋 How can we help you today?":null:null}const HD=/^(\/|https?:\/\/)/i,WD=n=>String(n||"").replace(/\s+/g,"_"),QD=(n="")=>n.toLowerCase().split(" ").filter(Boolean).map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" "),xh=n=>{const e=typeof n=="string"?n.trim():"";return HD.test(e)?e:""},JD=n=>{const t=String(n||"").replace(/\.[^.]+$/,"").split("_").filter(Boolean),r=(t[0]||"Menu Item").replace(/[-]+/g," ").trim(),s=t.length>1?t[1]:"",i=QD(r||"Menu Item"),o=Number.parseFloat(String(s).replace(/[^0-9.]/g,""));return{name:i,price:Number.isFinite(o)?o:0}},Dh=n=>{const e=Hn(mt(re,"categories"));return Yt(e,r=>{n(r.docs.map(s=>({id:s.id,...s.data()})))},r=>{})},YD=async n=>{if(!_e.currentUser)throw new Error("Authentication required to add categories.");const e=n.id||`cat-${Date.now()}`;return await Et(we(re,"categories",e),{...n,id:e}),n},XD=(n,e)=>{if(!_e.currentUser)throw new Error("Authentication required to update categories.");return Un(we(re,"categories",n),e)},ZD=async n=>{var e;if(!_e.currentUser)throw new Error("Authentication required to delete categories.");try{await pc(we(re,"categories",n))}catch(t){throw t.code==="permission-denied"?new Error(`Permission Denied: Your account (${(e=_e.currentUser)==null?void 0:e.email}) is NOT authorized in Firestore rules to delete categories.`):t}},ek=async()=>new Promise((n,e)=>{const t=Ph({firestore:Eh,db:re,includeUnavailable:!0,orderByCreatedDesc:!0,onData:r=>{t(),n(r)},onError:r=>{t(),e(r)},onIndexWarning:r=>{}})}),WI=(n,e=null)=>Ph({firestore:Eh,db:re,categoryId:e,includeUnavailable:!0,orderByCreatedDesc:!0,onData:t=>n(t),onError:t=>{},onIndexWarning:t=>{}}),tk=async n=>{if(!_e.currentUser)throw new Error("Authentication required to add products.");const e=xh(n.image||n.img||""),t=n.available!==void 0?!!n.available:!0,r=String(n.category||"").trim()||String(n.categoryId||"").trim()||"uncategorized",s=String(n.name||"").trim(),i=Number(n.price||0);if(!s)throw new Error("Product name is required.");if(!Number.isFinite(i)||i<0)throw new Error("Product price must be a valid non-negative number.");if(!e)throw new Error("Product image is required.");const o={name:s,price:i,image:e,category:r,available:t,createdAt:xn(),updatedAt:xn()};return{id:(await _h(mt(re,"products"),o)).id,...o}},nk=(n,e)=>{if(!_e.currentUser)throw new Error("Authentication required to update products.");const t=xh(e.image||e.img||""),r=e.available!==void 0?!!e.available:!0,s=String(e.category||"").trim()||String(e.categoryId||"").trim()||"uncategorized",i=String(e.name||"").trim(),o=Number(e.price||0);if(!i)throw new Error("Product name is required.");if(!Number.isFinite(o)||o<0)throw new Error("Product price must be a valid non-negative number.");if(!t)throw new Error("Product image is required.");return Un(we(re,"products",n),{name:i,price:o,image:t,category:s,available:r,updatedAt:xn()})},rk=async n=>{var t;if(!_e.currentUser)throw new Error("Authentication required to delete products.");try{const r=we(re,"products",n),s=await kr(r);if(s.exists()){const i=s.data(),o=i.image||i.img;if(o&&(o.includes("firebasestorage.googleapis.com")||o.startsWith("gs://")))try{const c=LI(jI,o);await MI(c)}catch{}}return await pc(r),!0}catch(r){throw r.code==="permission-denied"?new Error(`Permission Denied: You (${((t=_e.currentUser)==null?void 0:t.email)||"unauthenticated"}) do not have rights to delete products.`):r}},sk=async()=>{if(!_e.currentUser)throw new Error("Authentication required to repair product images.");return(await Fs(Us,"repairProductImages")({})).data},TN=async n=>{if(!_e.currentUser)throw new Error("Authentication required.");return(await Fs(Us,"deleteCustomerAccount")({uid:n})).data},AN=async({dryRun:n=!0,previewLimit:e=100}={})=>{if(!_e.currentUser)throw new Error("Authentication required.");return(await Fs(Us,"migrateProductImagePaths")({dryRun:n,previewLimit:e})).data},ik=async n=>{if(!_e.currentUser)throw new Error("Authentication required.");const e=String(n||_e.currentUser.uid||"").trim();if(!e)throw new Error("Missing uid.");const r=await Fs(Us,"makeUserAdmin")({uid:e});return await _e.currentUser.getIdToken(!0),r.data},QI=n=>({...n.data(),id:n.id}),vN=n=>{const e=(n==null?void 0:n.items)??(n==null?void 0:n.lineItems)??[];return Array.isArray(e)?e.map(t=>{const r=Number((t==null?void 0:t.qty)??(t==null?void 0:t.quantity)??1),s=Number.isFinite(r)&&r>0?Math.min(999,Math.floor(r)):1,i=String((t==null?void 0:t.name)??(t==null?void 0:t.title)??(t==null?void 0:t.productName)??"Item").trim()||"Item";return{qty:s,name:i}}):[]},ok=async n=>{throw new Error("Direct client order writes are disabled. Use backend callable order creation.")},ak=async()=>{try{const n=Hn(mt(re,"orders"),Dr("createdAt","desc"));return(await Pa(n)).docs.map(QI)}catch(n){throw n}},JI=n=>{const e=Hn(mt(re,"orders"),Dr("createdAt","desc"));return Yt(e,r=>{n(r.docs.map(QI))},r=>{})},ck=async n=>{try{const e=we(re,"orders",n),t=await kr(e);if(t.exists())return t.data();throw new Error("Order not found")}catch(e){throw e}},uk=async(n,e,t={})=>{const r=we(re,"orders",n),s=await kr(r);if(!s.exists())throw new Error("Order not found");const i={...s.data()},o=String(e||"").trim().toLowerCase().replace(/[\s-]+/g,"_"),u={confirmed:"preparing",pending:"preparing",preparing:"preparing",ready:"ready_for_pickup"}[o]??KI(e);await hk(n,i,u)};async function lk(n,{toStatus:e,metadata:t={}}){await Fs(Us,"transitionOrderStatus")({orderId:n,nextStatus:e,metadata:t})}const hk=async(n,e,t)=>{if(!_e.currentUser)throw new Error("Authentication required");const r=KI(t),s=Oa(e);if(r==="preparing"&&s==="paid"){const i=zD(e);if(!i.ok)throw new Error(i.reason)}await lk(n,{toStatus:r,metadata:{source:"advanceOrderPipeline"}})},dk=async n=>{if(!_e.currentUser)throw new Error("Authentication required to delete orders.");return(await Fs(Us,"deleteOrderByAdmin")({orderId:n})).data},fk=async(n,e,t=null)=>{const r=`msg-${Date.now()}`,s=we(mt(re,"orders",n,"messages"),r),i={...e,id:r,token:t,createdAt:new Date().toISOString(),read:!1};await Et(s,i);const o=we(re,"orders",n),c=await kr(o);if(c.exists()){const u=c.data();e.senderRole==="admin"?await Un(o,{unreadCustomer:(u.unreadCustomer||0)+1}):await Un(o,{unreadAdmin:(u.unreadAdmin||0)+1,lastGuestVerifyToken:t})}return i},pk=(n,e,t=null)=>{const r=mt(re,"orders",n,"messages");if(t)return e([]),()=>{};const s=Hn(r,Dr("createdAt","asc"));return Yt(s,i=>{e(i.docs.map(o=>({id:o.id,...o.data()})))})},mk=async(n,e,t=null)=>{const r=we(re,"orders",n);e==="admin"&&await Un(r,{unreadAdmin:0})},gk=async n=>{if(!_e.currentUser)return;const e=we(re,"orders",n);await Un(e,{isNewForAdmin:!1,unreadAdmin:0})},_k=n=>String(n||"").trim().slice(0,140);async function yk(n,e,t){const r=_k(t);e==="customer"?await Et(n,{updatedAt:xn(),lastPreview:r,lastMessage:r,lastSenderRole:e,unreadByAdmin:!0,unreadByUser:!1},{merge:!0}):e==="admin"?await Et(n,{updatedAt:xn(),lastPreview:r,lastMessage:r,lastSenderRole:e,unreadByUser:!0,unreadByAdmin:!1,resolved:!1},{merge:!0}):e==="bot"&&await Et(n,{updatedAt:xn(),lastPreview:r,lastMessage:r,lastSenderRole:"bot"},{merge:!0})}const kh=async(n,{text:e,senderRole:t},r={})=>{const s=(e||"").trim();if(!s||!n)throw new Error("Invalid support message");const i=we(re,"support_chats",n);if(await yk(i,t,s),await _h(mt(re,"support_chats",n,"messages"),{text:s,senderRole:t,createdAt:xn()}),t==="customer"&&!r.skipBot){const o=KD(s);o&&await kh(n,{text:o,senderRole:"bot"},{skipBot:!0})}},YI=(n,e)=>{if(!n)return()=>{};const t=Hn(mt(re,"support_chats",n,"messages"),Dr("createdAt","asc"));return Yt(t,r=>e(r.docs.map(s=>({id:s.id,...s.data()}))),r=>{})},Ik=n=>{const e=Hn(mt(re,"support_chats"),Dr("updatedAt","desc"));return Yt(e,t=>n(t.docs.map(r=>({id:r.id,...r.data()}))),t=>{n([])})},Ek=async n=>{n&&await Et(we(re,"support_chats",n),{unreadByAdmin:!1},{merge:!0})},Nh=n=>{const e=Hn(mt(re,"gallery"),Dr("createdAt","desc"));return Yt(e,r=>{n(r.docs.map(s=>({id:s.id,...s.data()})))},r=>{})},wk=async n=>{if(!_e.currentUser)throw new Error("Authentication required to manage gallery.");const e=n.id||`gallery-${Date.now()}`,t={...n,id:e,createdAt:new Date().toISOString()};return await Et(we(re,"gallery",e),t),t},Tk=(n,e)=>{if(!_e.currentUser)throw new Error("Authentication required to manage gallery.");return Un(we(re,"gallery",n),{...e,updatedAt:new Date().toISOString()})},Ak=async n=>{var t;if(!_e.currentUser)throw new Error("Authentication required to manage gallery.");try{const r=we(re,"gallery",n),s=await kr(r);if(s.exists()){const i=s.data();if(i.url&&(i.url.includes("firebasestorage.googleapis.com")||i.url.startsWith("gs://")))try{const o=LI(jI,i.url);await MI(o)}catch{}}return await pc(r),!0}catch(r){throw r.code==="permission-denied"?new Error(`Permission Denied: You (${((t=_e.currentUser)==null?void 0:t.email)||"unauthenticated"}) do not have rights to delete gallery items.`):r}},bN=()=>{try{return{categories:JSON.parse(localStorage.getItem("stm_categories")||"[]"),products:JSON.parse(localStorage.getItem("stm_products")||"[]"),orders:JSON.parse(localStorage.getItem("stm_orders")||"[]"),gallery:JSON.parse(localStorage.getItem("stm_gallery")||"[]")}}catch{return{categories:[],products:[],orders:[],gallery:[]}}},vk=async(n=!1)=>{if(!_e.currentUser)throw new Error("Authentication required to seed data.");const e=await ek(),t=new Set(e.map(f=>f.id)),r=await Pa(mt(re,"categories")),s=new Set(r.docs.map(f=>f.id)),i=await Pa(mt(re,"gallery")),o=new Set(i.docs.map(f=>f.id)),c=[],u={SNACKS:"snacks","BURGER KABABAB":"BURGER KABABAB",DINOSAUR:"DINOSAUR",DESERT:"desert","COLD DRINKS":"cold drinks","CAN DRINKS":"CAN DRINKS","INDIAN FOOD":"indian food",SUGARCANE:"SUGARCANE",HOT:"HOT",SIDES:"sides"};Object.keys(Na).forEach(f=>{Na[f].forEach((m,y)=>{const S=JD(m),x=S.name,k=S.price,U={SNACKS:"snacks","BURGER KABABAB":"burgers-kebabs",DINOSAUR:"dinosaur",DESERT:"desserts","COLD DRINKS":"cold-drinks","CAN DRINKS":"can-drinks","INDIAN FOOD":"indian",SUGARCANE:"sugarcane",HOT:"hot-drinks",SIDES:"sides"}[f]||"snacks",B=Xp.find(Q=>Q.id===U),z=u[f]||f,W=`stm-prod-${f.substring(0,3).toLowerCase()}-${y}`;if(!t.has(W)){const Q=xh(encodeURI(`/assets/SMT_FOOD/${WD(z)}/${m}`));c.push({id:W,name:x,price:k,categoryId:U,category:B?B.name:f,badge:y%5===0?"bestseller":"",available:!0,image:Q,img:Q})}})});let l=0;for(const f of Xp){const m=f.id;s.has(m)||(await Et(we(re,"categories",m),{...f,id:m,active:!0,icon:f.icon||f.emoji||"🍽️",order:f.order||l+1}),l++)}for(const f of c){const m=new Date().toISOString();await Et(we(re,"products",f.id),{...f,createdAt:m,updatedAt:m})}let d=0;try{const{galleryMedia:f}=await He(async()=>{const{galleryMedia:m}=await Promise.resolve().then(()=>Ck);return{galleryMedia:m}},void 0,import.meta.url);for(const[m,y]of f.entries()){const S=`gallery-seed-${m}`;if(!o.has(S)){const x=y.toLowerCase().endsWith(".mp4")||y.toLowerCase().endsWith(".mov");await Et(we(re,"gallery",S),{id:S,url:`/aboutusimage/${y}`,type:x?"video":"image",title:y.replace(/_/g," ").split(".")[0].substring(0,20),active:!0,createdAt:new Date().toISOString()}),d++}}}catch{}return{categories:l,products:c.length,orders:0,gallery:d}},bk=async()=>{const n=await ak();return{totalOrders:n.length,totalRevenue:n.reduce((e,t)=>e+parseFloat(t.total||0),0).toFixed(2),popularItems:["Teh Tarik Special","Nasi Lemak"],recentOrders:n.slice(0,5)}};let XI=[],Hu=[],ZI=[],eE=[];const Vh=()=>window.dispatchEvent(new Event("stm_data_updated"));Dh(n=>{XI=n,Vh()});WI(n=>{Hu=n,Vh()});JI(n=>{ZI=n});Nh(n=>{eE=n,Vh()});const SN={getCategories:()=>[...XI],getProducts:()=>[...Hu],getProductsByCategory:n=>Hu.filter(e=>e.categoryId===n),getOrders:()=>[...ZI],getGallery:()=>[...eE],addCategory:YD,updateCategory:XD,deleteCategory:ZD,addProduct:tk,updateProduct:nk,deleteProduct:rk,repairProductImages:sk,bootstrapAdminClaim:ik,placeOrder:ok,updateOrderStatus:uk,deleteOrder:dk,addGalleryItem:wk,updateGalleryItem:Tk,deleteGalleryItem:Ak,subscribeCategories:Dh,subscribeProducts:WI,subscribeOrders:JI,subscribeGallery:Nh,fetchOrderById:ck,getDashboardStats:bk,seedFromLocalStorage:vk,sendMessage:fk,subscribeMessages:pk,markMessagesAsRead:mk,markOrderAsSeen:gk,sendSupportChatMessage:kh,subscribeSupportChatMessages:YI,subscribeSupportInbox:Ik,markSupportChatReadByAdmin:Ek};function Sk({conversationId:n,role:e="customer"}){const[t,r]=G.useState([]),[s,i]=G.useState(""),[o,c]=G.useState(!1),u=G.useRef(null);G.useEffect(()=>{if(!n)return;const f=YI(n,r);return()=>f()},[n]),G.useEffect(()=>{u.current&&(u.current.scrollTop=u.current.scrollHeight)},[t]);const l=async f=>{if(f.preventDefault(),!(!s.trim()||o||!n)){c(!0);try{await kh(n,{text:s.trim(),senderRole:e}),i("")}catch{alert("Could not send message. Check your connection or try again.")}finally{c(!1)}}},d=e==="admin"?"Customer":"STM team";return _.jsxs("div",{style:{display:"flex",flexDirection:"column",height:"100%",minHeight:280,background:"#f8fafc"},children:[_.jsx("div",{ref:u,style:{flex:1,padding:"16px",overflowY:"auto",display:"flex",flexDirection:"column",gap:"12px"},children:t.length===0?_.jsxs("div",{style:{margin:"auto",textAlign:"center",padding:"16px",maxWidth:280},children:[_.jsx("div",{style:{fontWeight:900,color:"var(--green-dark)",marginBottom:8,fontSize:14},children:e==="customer"?"Message the team":"Reply to customer"}),_.jsx("p",{style:{fontSize:12,color:"#64748b",lineHeight:1.5,fontWeight:600},children:e==="customer"?"Staff see this inbox in Admin → Support. Replies appear here in real time.":"Your messages appear on the customer’s screen instantly."})]}):t.map(f=>{var S;const m=f.senderRole==="bot",y=f.senderRole===e;return _.jsxs("div",{style:{alignSelf:y?"flex-end":"flex-start",maxWidth:"88%",display:"flex",flexDirection:"column",alignItems:y?"flex-end":"flex-start"},children:[_.jsx("div",{style:{padding:"10px 14px",borderRadius:y?"16px 16px 4px 16px":"16px 16px 16px 4px",background:y?"var(--green-dark)":m?"#fffbeb":"white",color:y?"white":m?"#78350f":"#0f172a",boxShadow:"0 2px 8px rgba(0,0,0,0.04)",border:y?"none":`1px solid ${m?"#fde68a":"#e2e8f0"}`,fontSize:14,lineHeight:1.45,fontWeight:600,whiteSpace:"pre-wrap"},children:f.text}),_.jsxs("div",{style:{marginTop:4,fontSize:10,color:"#94a3b8",fontWeight:700,display:"flex",alignItems:"center",gap:4},children:[y?e==="admin"?_.jsx(QE,{size:10}):_.jsx(ta,{size:10}):m?null:_.jsx(ta,{size:10}),y?"You":m?"Auto-reply":d,_.jsx(um,{size:10}),(S=f.createdAt)!=null&&S.toDate?f.createdAt.toDate().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):f.createdAt?new Date(f.createdAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):""]})]},f.id)})}),_.jsxs("form",{onSubmit:l,style:{padding:"12px 14px",background:"white",borderTop:"1px solid #e2e8f0",display:"flex",gap:8,alignItems:"center"},children:[_.jsx("input",{type:"text",value:s,onChange:f=>i(f.target.value),placeholder:e==="customer"?"Message the team…":"Reply…",style:{flex:1,padding:"12px 14px",borderRadius:12,border:"1.5px solid #e2e8f0",background:"#f8fafc",fontSize:14,outline:"none",fontWeight:600}}),_.jsx("button",{type:"submit",disabled:!s.trim()||o,style:{width:44,height:44,borderRadius:12,background:"var(--green-dark)",color:"white",border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:!s.trim()||o?"not-allowed":"pointer",opacity:!s.trim()||o?.55:1},children:_.jsx(lm,{size:18})})]})]})}function Rk(){try{let n=localStorage.getItem("stm_support_conv_id");return n||(n=`sc-${crypto.randomUUID()}`,localStorage.setItem("stm_support_conv_id",n)),n}catch{return`sc-${Date.now()}`}}function Pk(){const[n,e]=G.useState(!1),[t,r]=G.useState("ai"),s=G.useMemo(()=>Rk(),[]);G.useEffect(()=>{const f=m=>{var S;e(!0);const y=(S=m.detail)==null?void 0:S.tab;r(y==="ai"||y==="team"?y:"team")};return window.addEventListener(ka,f),()=>window.removeEventListener(ka,f)},[]);const[i,o]=G.useState(()=>[{id:"w",role:"assistant",text:em("")}]),[c,u]=G.useState(""),l=G.useRef(null);G.useEffect(()=>{l.current&&(l.current.scrollTop=l.current.scrollHeight)},[i,n,t]);const d=f=>{const m=(f||"").trim();if(!m)return;const y={id:`u-${Date.now()}`,role:"user",text:m},S={id:`a-${Date.now()}`,role:"assistant",text:em(m)};o(x=>[...x,y,S]),u("")};return _.jsxs(_.Fragment,{children:[_.jsx(Ri.button,{type:"button","aria-label":"Open help & chat",onClick:()=>e(!0),style:{position:"fixed",bottom:30,left:30,width:56,height:56,borderRadius:"50%",border:"none",background:"linear-gradient(135deg, #013220 0%, #056a48 100%)",color:"white",boxShadow:"0 10px 30px rgba(1,50,32,0.35)",zIndex:9992,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"},initial:{scale:0,opacity:0},animate:{scale:1,opacity:1},whileHover:{scale:1.06},whileTap:{scale:.94},children:_.jsx(es,{size:26,strokeWidth:2.2})}),_.jsx(am,{children:n&&_.jsxs(Ri.div,{initial:{opacity:0,y:20,scale:.96},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:16,scale:.96},transition:{type:"spring",damping:26,stiffness:320},style:{position:"fixed",bottom:100,left:20,width:"min(400px, calc(100vw - 32px))",height:"min(560px, calc(100vh - 140px))",background:"white",borderRadius:24,boxShadow:"0 25px 60px rgba(0,0,0,0.18)",zIndex:9993,display:"flex",flexDirection:"column",overflow:"hidden",border:"1px solid #e2e8f0"},children:[_.jsxs("div",{style:{padding:"16px 18px",background:"var(--green-dark)",color:"white",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12},children:[_.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[_.jsx("div",{style:{width:40,height:40,borderRadius:12,background:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center"},children:_.jsx(JE,{size:22})}),_.jsxs("div",{children:[_.jsx("div",{style:{fontWeight:900,fontSize:15},children:"STM Help"}),_.jsx("div",{style:{fontSize:11,opacity:.85,fontWeight:600},children:"AI answers · Live team"})]})]}),_.jsx("button",{type:"button",onClick:()=>e(!1),style:{background:"none",border:"none",color:"white",cursor:"pointer",padding:8},children:_.jsx(cm,{size:22})})]}),_.jsxs("div",{style:{display:"flex",padding:"10px 12px",gap:8,background:"#f1f5f9"},children:[_.jsxs("button",{type:"button",onClick:()=>r("ai"),style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"10px 12px",borderRadius:14,border:"none",fontWeight:800,fontSize:13,cursor:"pointer",background:t==="ai"?"white":"transparent",color:t==="ai"?"var(--green-dark)":"#64748b",boxShadow:t==="ai"?"0 2px 8px rgba(0,0,0,0.06)":"none"},children:[_.jsx(YE,{size:16})," AI assistant"]}),_.jsxs("button",{type:"button",onClick:()=>r("team"),style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"10px 12px",borderRadius:14,border:"none",fontWeight:800,fontSize:13,cursor:"pointer",background:t==="team"?"white":"transparent",color:t==="team"?"var(--green-dark)":"#64748b",boxShadow:t==="team"?"0 2px 8px rgba(0,0,0,0.06)":"none"},children:[_.jsx(XE,{size:16})," Live team"]})]}),t==="ai"&&_.jsxs(_.Fragment,{children:[_.jsx("div",{ref:l,style:{flex:1,overflowY:"auto",padding:"14px 16px",display:"flex",flexDirection:"column",gap:12,background:"#fafafa"},children:i.map(f=>_.jsxs("div",{style:{alignSelf:f.role==="user"?"flex-end":"flex-start",maxWidth:"92%"},children:[_.jsx("div",{style:{padding:"12px 14px",borderRadius:f.role==="user"?"18px 18px 4px 18px":"18px 18px 18px 4px",background:f.role==="user"?"var(--green-dark)":"white",color:f.role==="user"?"white":"#0f172a",fontSize:13,lineHeight:1.5,fontWeight:600,whiteSpace:"pre-wrap",border:f.role==="user"?"none":"1px solid #e2e8f0",boxShadow:"0 2px 8px rgba(0,0,0,0.04)"},children:f.text.split("**").map((m,y)=>y%2===1?_.jsx("strong",{children:m},y):_.jsx("span",{children:m},y))}),_.jsx("div",{style:{fontSize:10,color:"#94a3b8",marginTop:4,fontWeight:700},children:f.role==="user"?"You":"AI assistant"})]},f.id))}),_.jsx("div",{style:{padding:"8px 12px 4px",display:"flex",flexWrap:"wrap",gap:6,background:"#fafafa"},children:yD.map(f=>_.jsx("button",{type:"button",onClick:()=>d(f),style:{fontSize:11,fontWeight:800,padding:"6px 10px",borderRadius:999,border:"1px solid #cbd5e1",background:"white",color:"#475569",cursor:"pointer"},children:f},f))}),_.jsxs("form",{onSubmit:f=>{f.preventDefault(),d(c)},style:{padding:12,display:"flex",gap:8,borderTop:"1px solid #e2e8f0",background:"white"},children:[_.jsx("input",{value:c,onChange:f=>u(f.target.value),placeholder:"Ask the assistant…",style:{flex:1,padding:"12px 14px",borderRadius:14,border:"1.5px solid #e2e8f0",fontSize:14,fontWeight:600}}),_.jsx("button",{type:"submit",disabled:!c.trim(),style:{width:46,height:46,borderRadius:14,border:"none",background:"var(--green-dark)",color:"white",cursor:c.trim()?"pointer":"not-allowed",opacity:c.trim()?1:.5,display:"flex",alignItems:"center",justifyContent:"center"},children:_.jsx(lm,{size:18})})]})]}),t==="team"&&_.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",minHeight:0},children:[_.jsxs("div",{style:{fontSize:11,color:"#64748b",padding:"8px 14px",fontWeight:700,background:"#fffbeb",borderBottom:"1px solid #fde68a"},children:["Thread ID: ",_.jsxs("code",{style:{fontSize:10},children:[s.slice(0,18),"…"]})," — staff reply from Admin → Support."]}),_.jsx(Sk,{conversationId:s,role:"customer"})]})]})})]})}const tE=["tehtarik_premium.png","burger_bg.png","juice_bg.png","Heritage.png","v1.mp4","v2.mp4","v3.mp4","WhatsApp_Image_2026_04_08_at_10.56.53_PM.jpeg","WhatsApp_Image_2026_04_08_at_10.57.21_PM.jpeg","WhatsApp_Image_2026_04_08_at_8.22.51_PM.jpeg","WhatsApp_Image_2026_04_08_at_8.22.59_PM.jpeg","WhatsApp_Image_2026_04_08_at_8.26.13_PM.jpeg","WhatsApp_Image_2026_04_08_at_8.33.52_PM.jpeg","WhatsApp_Image_2026_04_08_at_8.34.04_PM.jpeg","WhatsApp_Image_2026_04_08_at_8.34.35_PM.jpeg","WhatsApp_Image_2026_04_08_at_8.34.50_PM.jpeg","WhatsApp_Image_2026_04_08_at_8.36.05_PM.jpeg","WhatsApp_Image_2026_04_08_at_8.42.54_PM.jpeg","WhatsApp_Image_2026_04_08_at_8.42.54_PM__1_.jpeg","WhatsApp_Image_2026_04_08_at_8.42.54_PM__2_.jpeg","WhatsApp_Image_2026_04_08_at_8.42.54_PM__3_.jpeg","WhatsApp_Image_2026_04_08_at_8.42.54_PM__4_.jpeg","WhatsApp_Image_2026_04_08_at_8.42.54_PM__5_.jpeg","WhatsApp_Image_2026_04_08_at_8.42.54_PM__6_.jpeg","WhatsApp_Video_2026_04_08_at_8.25.12_PM.mp4","WhatsApp_Video_2026_04_08_at_8.25.15_PM.mp4","WhatsApp_Video_2026_04_08_at_8.25.15_PM__1_.mp4","WhatsApp_Video_2026_04_08_at_8.31.20_PM.mp4"],Ck=Object.freeze(Object.defineProperty({__proto__:null,galleryMedia:tE},Symbol.toStringTag,{value:"Module"})),xk={SNACKS:"snacks","BURGER KABABAB":"BURGER KABABAB",DINOSAUR:"DINOSAUR",DESERT:"desert","COLD DRINKS":"cold drinks","CAN DRINKS":"CAN DRINKS","INDIAN FOOD":"indian food",SUGARCANE:"SUGARCANE",HOT:"HOT",SIDES:"sides"},Dk=n=>String(n||"").replace(/\s+/g,"_"),kk={SNACKS:"snacks","BURGER KABABAB":"burgers-kebabs",DINOSAUR:"dinosaur",DESERT:"desserts","COLD DRINKS":"cold-drinks","CAN DRINKS":"can-drinks","INDIAN FOOD":"indian",SUGARCANE:"sugarcane",HOT:"hot-drinks",SIDES:"sides"},Nk=/(?:\(?SGD\s*\$?\s*\d+(?:\.\d+)?\)?|\$?\d+(?:\.\d+)?)/gi,Vk=/\.(png|jpe?g|webp|gif)$/i,Ok=new Set(["a","an","the","and","or","of","with","to","in","on","for","1","2","3","4","5","6","8","9","10","piece","pieces","pc","pcs","sgd","sdg","classic","original"]),nE=n=>(n||"").replace(Vk,"").replace(/_/g," ").replace(Nk," ").replace(/[()\[\]]/g," ").replace(/[^a-zA-Z0-9\s]/g," ").replace(/\s+/g," ").trim().toLowerCase(),Oh=n=>nE(n).split(" ").filter(e=>e.length>1&&!Ok.has(e)),Mk=n=>Oh(n).join(" "),cu=(()=>{const n=[];return Object.keys(Na).forEach(e=>{const t=xk[e]||e,r=kk[e]||e.toLowerCase();for(const s of Na[e]||[]){const i=nE(s);n.push({filename:s,path:encodeURI(`/assets/SMT_FOOD/${Dk(t)}/${s}`),categoryId:r,cleanName:i,tokens:Oh(s),key:Mk(s)})}}),n})();function Lk(n){if(!n)return null;const e=n.name||"",t=Oh(e);if(t.length===0)return null;const r=new Set(t),s=t.join(" "),i=l=>{let d=0;for(const x of l.tokens)r.has(x)&&(d+=1);if(d===0)return 0;const f=l.key===s,m=l.key.includes(s)||s.includes(l.key),y=new Set([...r,...l.tokens]).size,S=d/y+d/t.length*.5;return f?S+2:m?S+.75:S};let o=null,c=0;const u=n.categoryId?cu.filter(l=>l.categoryId===n.categoryId):cu;for(const l of u){const d=i(l);d>c&&(o=l,c=d)}if(!o&&n.categoryId)for(const l of cu){const d=i(l);d>c&&(o=l,c=d)}return o&&c>=.15?o.path:null}function Fk(n){const e=((n==null?void 0:n.image)||(n==null?void 0:n.img)||"").trim();return!!(!e||e.startsWith("https://images.unsplash.com")||e.startsWith("data:")&&e.length<80||!(e.startsWith("/")||e.startsWith("http://")||e.startsWith("https://")||e.startsWith("blob:")||e.startsWith("data:")||e.startsWith("gs://")))}function Uk({category:n=null,includeUnavailable:e=!1,orderByCreatedDesc:t=!0}={}){const[r,s]=G.useState([]),[i,o]=G.useState(!0),[c,u]=G.useState(null);return G.useEffect(()=>{o(!0),u(null);const l=Ph({firestore:Eh,db:re,categoryId:n,includeUnavailable:e,orderByCreatedDesc:t,onData:d=>{s(d),o(!1)},onError:d=>{u(d),o(!1)},onIndexWarning:d=>{}});return()=>l()},[n,e,t]),G.useMemo(()=>({products:r,loading:i,error:c}),[r,i,c])}const Bk=(n=[])=>n.map(e=>{const t=e.image||e.img||"",r={...e,image:t,img:t};if(!Fk(r))return r;const s=Lk(e);return s?{...r,image:s,img:s}:r}),rE=G.createContext();function jk({children:n}){const{products:e,loading:t}=Uk({orderByCreatedDesc:!0}),[r,s]=G.useState([]),[i,o]=G.useState([]),[c,u]=G.useState([]),[l,d]=G.useState(!0),[f,m]=G.useState(null),[y,S]=G.useState(!1),[x,k]=G.useState(!1);G.useEffect(()=>{const U=Dh(E=>{o(I=>E.length===0&&I.length>0?I:E),S(!0)}),B=Nh(E=>{const I=E;u(T=>I.length===0&&T.length>0?T:I),k(!0)}),z=()=>tE.map((E,I)=>{const T=E.toLowerCase().endsWith(".mp4")||E.toLowerCase().endsWith(".mov");return{id:`fallback-gallery-${I}`,url:`/aboutusimage/${E}`,type:T?"video":"image",name:E,active:!0}}),W=async()=>{u(E=>E.length>0?E:z()),d(!1)},Q=setTimeout(()=>{W()},5e3);return()=>{U(),B(),clearTimeout(Q)}},[]),G.useEffect(()=>{const U=Bk(e);s(U)},[e]),G.useEffect(()=>{!t&&y&&x&&d(!1)},[t,y,x]);const O={products:r,categories:i,gallery:c,loading:l,error:f,refreshData:()=>{}};return _.jsx(rE.Provider,{value:O,children:n})}function RN(){const n=G.useContext(rE);if(!n)throw new Error("useData must be used within a DataProvider");return n}const Gk=G.lazy(()=>He(()=>import("./Home-BO0rm5lm.js"),__vite__mapDeps([0,1,2,3,4,5]),import.meta.url)),qk=G.lazy(()=>He(()=>import("./Menu-B39mEeQP.js"),__vite__mapDeps([6,1,3,4,5]),import.meta.url)),$k=G.lazy(()=>He(()=>import("./Cart-Chno_P3B.js"),__vite__mapDeps([7,1,3,4,5]),import.meta.url)),zk=G.lazy(()=>He(()=>import("./Gallery-ZCN-y1h1.js"),__vite__mapDeps([8,1,3,4,5]),import.meta.url)),Kk=G.lazy(()=>He(()=>import("./AboutUs-DJCHTc59.js"),__vite__mapDeps([9,1,3,4,5]),import.meta.url)),Hk=G.lazy(()=>He(()=>import("./Checkout-DQ3Q1cPZ.js"),__vite__mapDeps([10,1,11,3,4,5]),import.meta.url)),Wk=G.lazy(()=>He(()=>import("./Login-CYsDML8b.js"),__vite__mapDeps([12,1,2,13,14,3,4,5]),import.meta.url)),Qk=G.lazy(()=>He(()=>import("./Profile-Dx6ejVTH.js"),__vite__mapDeps([15,1,3,13,4,5]),import.meta.url)),Jk=G.lazy(()=>He(()=>import("./OrderSuccess-CXhkZ7jl.js"),__vite__mapDeps([16,1,3]),import.meta.url)),Yk=G.lazy(()=>He(()=>import("./PaymentSuccess-7HkTdO3y.js"),__vite__mapDeps([17,1,3]),import.meta.url)),Xk=G.lazy(()=>He(()=>import("./PaymentCancel-C3z7zezB.js"),__vite__mapDeps([18,1,3]),import.meta.url)),im=G.lazy(()=>He(()=>import("./OrderTracking-Cqhd0eLb.js"),__vite__mapDeps([19,1,20,3,14,11,4,5]),import.meta.url)),Zk=G.lazy(()=>He(()=>import("./Admin-Cas8iNeA.js"),__vite__mapDeps([21,1,3,20,13,14,11,4,5]),import.meta.url)),eN=G.lazy(()=>He(()=>import("./DriverPanel-DE_lCXEQ.js"),__vite__mapDeps([22,1,14,11,3,4,5]),import.meta.url)),tN=G.lazy(()=>He(()=>import("./DataSeedPage-BMH-VNrp.js"),__vite__mapDeps([23,1,3,4,5]),import.meta.url));function qe({children:n}){return _.jsx(Ri.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},exit:{opacity:0,y:-8},transition:{duration:.2,ease:"easeOut"},children:n})}function nN(){const n=om(),e=n.pathname,t=["/admin","/driver","/rider","/login","/order-success","/success","/cancel","/sandbox","/pay"].some(s=>e.startsWith(s))||e.startsWith("/seed"),r=e.startsWith("/admin")||e.startsWith("/driver")||e.startsWith("/rider");return _.jsxs(_.Fragment,{children:[!t&&_.jsx(mD,{}),_.jsx(am,{mode:"popLayout",children:_.jsx(G.Suspense,{fallback:_.jsx("div",{style:{minHeight:"100vh",display:"flex",justifyContent:"center",alignItems:"center"},children:_.jsx("div",{style:{width:"40px",height:"40px",border:"4px solid #e2e8f0",borderTopColor:"var(--green-dark)",borderRadius:"50%",animation:"spin 1s linear infinite"}})}),children:_.jsxs(FE,{location:n,children:[_.jsx(Ue,{path:"/",element:_.jsx(qe,{children:_.jsx(Gk,{})})}),_.jsx(Ue,{path:"/menu",element:_.jsx(qe,{children:_.jsx(qk,{})})}),_.jsx(Ue,{path:"/gallery",element:_.jsx(qe,{children:_.jsx(zk,{})})}),_.jsx(Ue,{path:"/about",element:_.jsx(qe,{children:_.jsx(Kk,{})})}),_.jsx(Ue,{path:"/cart",element:_.jsx(qe,{children:_.jsx($k,{})})}),_.jsx(Ue,{path:"/checkout",element:_.jsx(qe,{children:_.jsx(Hk,{})})}),_.jsx(Ue,{path:"/login",element:_.jsx(qe,{children:_.jsx(Wk,{})})}),_.jsx(Ue,{path:"/profile",element:_.jsx(qe,{children:_.jsx(Qk,{})})}),_.jsx(Ue,{path:"/order-success",element:_.jsx(qe,{children:_.jsx(Jk,{})})}),_.jsx(Ue,{path:"/success",element:_.jsx(qe,{children:_.jsx(Yk,{})})}),_.jsx(Ue,{path:"/cancel",element:_.jsx(qe,{children:_.jsx(Xk,{})})}),_.jsx(Ue,{path:"/tracking/:orderId",element:_.jsx(qe,{children:_.jsx(im,{})})}),_.jsx(Ue,{path:"/order-tracking/:orderId",element:_.jsx(qe,{children:_.jsx(im,{})})}),_.jsx(Ue,{path:"/admin/*",element:_.jsx(qe,{children:_.jsx(Zk,{})})}),_.jsx(Ue,{path:"/driver",element:_.jsx(qe,{children:_.jsx(eN,{})})}),_.jsx(Ue,{path:"/rider",element:_.jsx(UE,{to:"/driver",replace:!0})}),_.jsx(Ue,{path:"/seed",element:_.jsx(qe,{children:_.jsx(tN,{})})})]},n.pathname)})}),!t&&_.jsx(gD,{}),!r&&_.jsx(Pk,{}),!r&&_.jsx(_D,{message:"Hi STM Salam, I need help with my order.",label:"Chat with Admin"})]})}function rN(){return _.jsx(hD,{children:_.jsx(jk,{children:_.jsx(ZE,{children:_.jsx(LE,{children:_.jsx(nN,{})})})})})}const PN=Object.freeze(Object.defineProperty({__proto__:null,default:rN},Symbol.toStringTag,{value:"Module"}));export{gk as $,xn as A,fN as B,FA as C,qI as D,lN as E,km as F,cN as G,Yt as H,$D as I,mk as J,JI as K,Ik as L,bk as M,WI as N,Dh as O,tk as P,nk as Q,rk as R,$I as S,AN as T,ik as U,wN as V,_D as W,EN as X,FD as Y,zD as Z,vN as _,ew as a,dk as a0,hk as a1,YD as a2,XD as a3,ZD as a4,Nh as a5,wk as a6,Tk as a7,Ak as a8,Hn as a9,mt as aa,TN as ab,Ek as ac,Sk as ad,Oa as ae,L0 as af,Dr as ag,_h as ah,B0 as ai,bN as aj,vk as ak,PN as al,dD as b,_e as c,SN as d,aN as e,Us as f,IN as g,Fs as h,pN as i,LI as j,jI as k,_N as l,yN as m,Un as n,fD as o,we as p,re as q,Zp as r,Ce as s,uN as t,RN as u,hN as v,dN as w,kr as x,ou as y,Et as z};
