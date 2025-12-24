import { _ as _sfc_main$1 } from './brand-tYyitp1R.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-D3NELkxn.mjs';
import { mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'pinia';
import 'vue-router';
import 'deep-pick-omit';
import 'yup';
import 'axios';
import 'vue-sonner';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Brand = _sfc_main$1;
  const _component_NuxtLink = __nuxt_component_0;
  _push(`<footer${ssrRenderAttrs(mergeProps({
    id: "footer",
    class: "bg-black p-4"
  }, _attrs))}><div class="footer__navigation py-12"><div class="container flex gap-8">`);
  _push(ssrRenderComponent(_component_Brand, { class: "grayscale brightness-200" }, null, _parent));
  _push(`<div class="grow flex justify-end gap-4"><nav><h3 class="text-xl mb-4">Useful links</h3><ul><li>`);
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/about_us" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`About us`);
      } else {
        return [
          createTextVNode("About us")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/contact_us" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Contact us`);
      } else {
        return [
          createTextVNode("Contact us")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li></ul></nav></div></div></div><div class="container flex justify-between"><span class="copyright">copyright \xA9 `);
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Trailmandu Pvt. Ltd`);
      } else {
        return [
          createTextVNode("Trailmandu Pvt. Ltd")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`. ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())}</span><span class="developed__by">Developed by `);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "http://janakstha.com.np",
    target: "_blank"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Janak Shrestha`);
      } else {
        return [
          createTextVNode("Janak Shrestha")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</span></div></footer>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default/_footer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AppFooter = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { AppFooter as default };
//# sourceMappingURL=_footer--CnsrTmu.mjs.map
