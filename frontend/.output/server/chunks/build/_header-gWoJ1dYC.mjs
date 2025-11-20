import { _ as _sfc_main$1 } from './brand-tYyitp1R.mjs';
import { d as useAppStore, _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { u as useSidebar } from './index-Ca1go7dh.mjs';
import { u as useMenu } from './defaultMenus-CKqsyDUX.mjs';
import { storeToRefs } from 'pinia';
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
import 'class-variance-authority';
import 'reka-ui';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "_header",
  __ssrInlineRender: true,
  setup(__props) {
    useMenu();
    const { breakpoints } = storeToRefs(useAppStore());
    const { toggleSidebar } = useSidebar();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Brand = _sfc_main$1;
      const _component_ClientOnly = __nuxt_component_0$1;
      _push(`<header${ssrRenderAttrs(mergeProps({
        id: "header",
        class: "bg-white py-3 px-2 border-b sticky top-0 z-30"
      }, _attrs))}><div class="container mx-auto flex items-center justify-between">`);
      _push(ssrRenderComponent(_component_Brand, null, null, _parent));
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</div></header>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default/_header.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_header-gWoJ1dYC.mjs.map
