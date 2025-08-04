import{ag as s,F as h,e as p,aB as C,K as g,aU as w}from"./CMjavVp8.js";/**
 * @license lucide-vue-next v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),v=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,n,r)=>r?r.toUpperCase():n.toLowerCase()),S=t=>{const e=v(t);return e.charAt(0).toUpperCase()+e.slice(1)},A=(...t)=>t.filter((e,n,r)=>!!e&&e.trim()!==""&&r.indexOf(e)===n).join(" ").trim();/**
 * @license lucide-vue-next v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var u={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-vue-next v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=({size:t,strokeWidth:e=2,absoluteStrokeWidth:n,color:r,iconNode:a,name:o,class:d,...l},{slots:i})=>s("svg",{...u,width:t||u.width,height:t||u.height,stroke:r||u.stroke,"stroke-width":n?Number(e)*24/Number(t):e,class:A("lucide",...o?[`lucide-${f(S(o))}-icon`,`lucide-${f(o)}`]:["lucide-icon"]),...l},[...a.map(c=>s(...c)),...i.default?[i.default()]:[]]);/**
 * @license lucide-vue-next v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=(t,e)=>(n,{slots:r})=>s(P,{...n,iconNode:e,name:t},r);function m(t){return t?t.flatMap(e=>e.type===h?m(e.children):[e]):[]}const b=p({name:"PrimitiveSlot",inheritAttrs:!1,setup(t,{attrs:e,slots:n}){return()=>{var i;if(!n.default)return null;const r=m(n.default()),a=r.findIndex(c=>c.type!==C);if(a===-1)return r;const o=r[a];(i=o.props)==null||delete i.ref;const d=o.props?g(e,o.props):e,l=w({...o,props:{}},d);return r.length===1?l:(r[a]=l,r)}}}),k=["area","img","input"],y=p({name:"Primitive",inheritAttrs:!1,props:{asChild:{type:Boolean,default:!1},as:{type:[String,Object],default:"div"}},setup(t,{attrs:e,slots:n}){const r=t.asChild?"template":t.as;return typeof r=="string"&&k.includes(r)?()=>s(r,e):r!=="template"?()=>s(t.as,e,{default:n.default}):()=>s(b,e,{default:n.default})}});export{P as I,y as P,b as S,I as c,m as r};
