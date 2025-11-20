import { c as useAuthStore, b as useRoute, _ as __nuxt_component_0$1 } from './server.mjs';
import { _ as _sfc_main$1, a as _sfc_main$4 } from './Sonner-C1u4557B.mjs';
import { _ as _sfc_main$5 } from './Skeleton-Dr5q0UQT.mjs';
import { defineComponent, unref, withCtx, createVNode, renderSlot, createBlock, openBlock, mergeProps, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs } from 'vue/server-renderer';
import _sfc_main$3 from './_header-C9l9CAXd.mjs';
import _sfc_main$2 from './_sidebar-BB6WX2rM.mjs';
import { storeToRefs } from 'pinia';
import { u as useAuthorization } from './authorization-DPJpR6G0.mjs';
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
import './index-DRYUbUIy.mjs';
import './index-BCNSwEbA.mjs';
import 'reka-ui';
import './helpers-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
import './index-Ca1go7dh.mjs';
import 'class-variance-authority';
import './brand-tYyitp1R.mjs';
import 'lucide-vue-next';
import './Button-BQvwvVGk.mjs';
import './index-Dniqw3Np.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { isLoading } = storeToRefs(useAuthStore());
    const { can } = useAuthorization();
    const route = useRoute();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SidebarProvider = _sfc_main$1;
      const _component_ClientOnly = __nuxt_component_0$1;
      const _component_Toaster = _sfc_main$4;
      const _component_Skeleton = _sfc_main$5;
      if (!unref(isLoading)) {
        _push(ssrRenderComponent(_component_SidebarProvider, _attrs, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$2, null, null, _parent2, _scopeId));
              _push2(`<main id="main" class="bg-gray-300 flex-grow relative"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$3, null, null, _parent2, _scopeId));
              _push2(`<div class="p-4"${_scopeId}><div class="bg-white p-12 rounded-2xl overflow-hidden"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_ClientOnly, null, {}, _parent2, _scopeId));
              _push2(`</div></div></main>`);
              _push2(ssrRenderComponent(_component_Toaster, null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_sfc_main$2),
                createVNode("main", {
                  id: "main",
                  class: "bg-gray-300 flex-grow relative"
                }, [
                  createVNode(_sfc_main$3),
                  createVNode("div", { class: "p-4" }, [
                    createVNode("div", { class: "bg-white p-12 rounded-2xl overflow-hidden" }, [
                      createVNode(_component_ClientOnly, null, {
                        default: withCtx(() => {
                          var _a, _b;
                          return [
                            unref(can)((_a = unref(route).meta) == null ? void 0 : _a.authorization, (_b = unref(route).meta) == null ? void 0 : _b.role) ? renderSlot(_ctx.$slots, "default", { key: 0 }) : (openBlock(), createBlock("p", { key: 1 }, "You do not have access to see this page"))
                          ];
                        }),
                        _: 3
                      })
                    ])
                  ])
                ]),
                createVNode(_component_Toaster)
              ];
            }
          }),
          _: 3
        }, _parent));
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-screen flex w-full gap-4 p-4" }, _attrs))}><div class="h-full w-[250px]"><div class="flex gap-4">`);
        _push(ssrRenderComponent(_component_Skeleton, { class: "w-[50px] h-[50px] rounded-full" }, null, _parent));
        _push(`<div class="grow space-y-2">`);
        _push(ssrRenderComponent(_component_Skeleton, { class: "w-full h-[25px] rounded-full" }, null, _parent));
        _push(ssrRenderComponent(_component_Skeleton, { class: "w-full h-[15px] rounded-full" }, null, _parent));
        _push(ssrRenderComponent(_component_Skeleton, { class: "w-[75px] h-[15px] rounded-full" }, null, _parent));
        _push(`</div></div></div>`);
        _push(ssrRenderComponent(_component_Skeleton, { class: "h-full grow rounded-xl" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Loading.... `);
            } else {
              return [
                createTextVNode(" Loading.... ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/admin/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BJNN-Kgk.mjs.map
