import { _ as _sfc_main$4 } from './brand-qkhVn09M.mjs';
import { _ as _sfc_main$5 } from './index-C1GnAqFM.mjs';
import { u as useAuthStore, l as useRoute, n as navigateTo, _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, ref, watchEffect, unref, withCtx, createVNode, renderSlot, createBlock, openBlock, mergeProps, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs } from 'vue/server-renderer';
import { c as cn } from './virtual_nuxt__Users_janakshrestha_Documents_2025_05_May_trailmandu_frontend_.nuxt_shadcn-nuxt_utils-H80jjgLf.mjs';
import { ArrowLeftToLine } from 'lucide-vue-next';
import _sfc_main$3 from './_sidebar-DTW3GOEf.mjs';
import { storeToRefs } from 'pinia';
import { u as useAuthorization } from './authorization-C5u6z8pV.mjs';
import { _ as _sfc_main$2 } from './SidebarProvider-B3r84BkU.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import './nuxt-link-ClNoEpxG.mjs';
import 'reka-ui';
import 'class-variance-authority';
import 'vue-router';
import 'deep-pick-omit';
import 'axios';
import 'vue-sonner';
import 'clsx';
import 'tailwind-merge';
import './index-PQOYgYe9.mjs';
import './index-LYqOXnlG.mjs';
import './index-Ca1go7dh.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Skeleton",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "skeleton",
        class: unref(cn)("animate-pulse rounded-md bg-primary/10", props.class)
      }, _attrs))}></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/skeleton/Skeleton.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { isLoading } = storeToRefs(useAuthStore());
    const { can } = useAuthorization();
    const route = useRoute();
    const hasAccess = ref(false);
    watchEffect(() => {
      var _a, _b, _c;
      if ((_a = route.meta) == null ? void 0 : _a.authorization)
        hasAccess.value = can((_b = route.meta) == null ? void 0 : _b.authorization, (_c = route.meta) == null ? void 0 : _c.role);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SidebarProvider = _sfc_main$2;
      const _component_Brand = _sfc_main$4;
      const _component_Button = _sfc_main$5;
      const _component_ClientOnly = __nuxt_component_0$1;
      const _component_Skeleton = _sfc_main$1;
      if (!unref(isLoading)) {
        _push(ssrRenderComponent(_component_SidebarProvider, _attrs, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$3, null, null, _parent2, _scopeId));
              _push2(`<main id="main" class="bg-gray-300 flex-grow relative"${_scopeId}><div class="bg-white p-4 flex justify-between items-center border-b"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Brand, { to: "/dashboard" }, null, _parent2, _scopeId));
              _push2(`<div class="flex justify-center items-center gap-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Button, {
                onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/"),
                variant: "secondary",
                size: "icon"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span class="sr-only"${_scopeId2}>Back to site</span>`);
                    _push3(ssrRenderComponent(unref(ArrowLeftToLine), null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode("span", { class: "sr-only" }, "Back to site"),
                      createVNode(unref(ArrowLeftToLine))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div><div class="p-4"${_scopeId}><div class="bg-white p-12 rounded-2xl"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_ClientOnly, null, {}, _parent2, _scopeId));
              _push2(`</div></div></main>`);
            } else {
              return [
                createVNode(_sfc_main$3),
                createVNode("main", {
                  id: "main",
                  class: "bg-gray-300 flex-grow relative"
                }, [
                  createVNode("div", { class: "bg-white p-4 flex justify-between items-center border-b" }, [
                    createVNode(_component_Brand, { to: "/dashboard" }),
                    createVNode("div", { class: "flex justify-center items-center gap-4" }, [
                      createVNode(_component_Button, {
                        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/"),
                        variant: "secondary",
                        size: "icon"
                      }, {
                        default: withCtx(() => [
                          createVNode("span", { class: "sr-only" }, "Back to site"),
                          createVNode(unref(ArrowLeftToLine))
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ])
                  ]),
                  createVNode("div", { class: "p-4" }, [
                    createVNode("div", { class: "bg-white p-12 rounded-2xl" }, [
                      createVNode(_component_ClientOnly, null, {
                        default: withCtx(() => [
                          unref(hasAccess) ? renderSlot(_ctx.$slots, "default", { key: 0 }) : (openBlock(), createBlock("p", { key: 1 }, "You do not have access to see this page"))
                        ]),
                        _: 3
                      })
                    ])
                  ])
                ])
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
//# sourceMappingURL=index-U7UKAqa1.mjs.map
