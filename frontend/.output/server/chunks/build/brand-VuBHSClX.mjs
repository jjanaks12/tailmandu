import { a as useRoute, b as useAuthStore, c as useAppStore, _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, computed, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { storeToRefs } from 'pinia';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "brand",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const { isLoggedin } = storeToRefs(useAuthStore());
    const { company } = storeToRefs(useAppStore());
    computed(() => !isLoggedin.value ? "index" : route.meta.layout == "admin" ? "dashboard" : "index");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_ClientOnly, _attrs, {}, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/brand.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=brand-VuBHSClX.mjs.map
