import { a as buildAssetsURL } from '../routes/renderer.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-ClNoEpxG.mjs';
import { defineComponent, mergeProps, withCtx, unref, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { f as useRuntimeConfig } from './server.mjs';

const _imports_0 = "" + buildAssetsURL("logo.m1Sa6EJ9.png");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "brand",
  __ssrInlineRender: true,
  props: {
    to: { default: "/" }
  },
  setup(__props) {
    const { public: { appName } } = useRuntimeConfig();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "logo w-[140px]" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: _ctx.to }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_0)}${ssrRenderAttr("alt", unref(appName))}${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_0,
                alt: unref(appName)
              }, null, 8, ["alt"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
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
//# sourceMappingURL=brand-qkhVn09M.mjs.map
