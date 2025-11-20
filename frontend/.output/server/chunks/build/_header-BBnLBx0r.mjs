import { _ as _sfc_main$1 } from './index-WlfeWCet.mjs';
import { _ as _sfc_main$2 } from './brand-tYyitp1R.mjs';
import { n as navigateTo } from './server.mjs';
import { defineComponent, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { MenuIcon, ArrowLeftToLine } from 'lucide-vue-next';
import { u as useSidebar } from './index-Ca1go7dh.mjs';
import 'reka-ui';
import './helpers-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
import 'class-variance-authority';
import './authorization-DPJpR6G0.mjs';
import 'pinia';
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
import 'vue-router';
import 'deep-pick-omit';
import 'yup';
import 'axios';
import 'vue-sonner';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "_header",
  __ssrInlineRender: true,
  setup(__props) {
    const { toggleSidebar } = useSidebar();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = _sfc_main$1;
      const _component_Brand = _sfc_main$2;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "bg-white px-4 py-[13px] flex justify-between items-center border-b sticky top-0 z-50" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Button, {
        modifier: "outline",
        onClick: unref(toggleSidebar)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(MenuIcon), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(MenuIcon))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Brand, null, null, _parent));
      _push(`<div class="flex justify-center items-center gap-4">`);
      _push(ssrRenderComponent(_component_Button, {
        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/"),
        variant: "secondary",
        size: "icon"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="sr-only"${_scopeId}>Back to site</span>`);
            _push2(ssrRenderComponent(unref(ArrowLeftToLine), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("span", { class: "sr-only" }, "Back to site"),
              createVNode(unref(ArrowLeftToLine))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></header>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/admin/_header.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_header-BBnLBx0r.mjs.map
