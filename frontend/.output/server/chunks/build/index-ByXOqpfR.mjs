import { _ as _sfc_main$1, a as _sfc_main$4 } from './Sonner-C1u4557B.mjs';
import { defineComponent, withCtx, createVNode, renderSlot, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import _sfc_main$2 from './_header-gWoJ1dYC.mjs';
import AppFooter from './_footer-CEe9DRUO.mjs';
import _sfc_main$3 from './_sidebar-DUAoSSQY.mjs';
import './index-DRYUbUIy.mjs';
import './index-BCNSwEbA.mjs';
import 'reka-ui';
import './helpers-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
import './index-Ca1go7dh.mjs';
import 'class-variance-authority';
import 'vue-sonner';
import './brand-tYyitp1R.mjs';
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
import './defaultMenus-CKqsyDUX.mjs';
import './nuxt-link-Bkw0LjSi.mjs';
import './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SidebarProvider = _sfc_main$1;
      const _component_Toaster = _sfc_main$4;
      _push(ssrRenderComponent(_component_SidebarProvider, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, null, null, _parent2, _scopeId));
            _push2(`<main id="main" class="flex-grow"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(`</main>`);
            _push2(ssrRenderComponent(AppFooter, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Toaster, null, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "w-full" }, [
                createVNode(_sfc_main$2),
                createVNode(_sfc_main$3),
                createVNode("main", {
                  id: "main",
                  class: "flex-grow"
                }, [
                  renderSlot(_ctx.$slots, "default")
                ]),
                createVNode(AppFooter),
                createVNode(_component_Toaster)
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-ByXOqpfR.mjs.map
