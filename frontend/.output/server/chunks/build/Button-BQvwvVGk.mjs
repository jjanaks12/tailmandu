import { defineComponent, ref, unref, mergeProps, withCtx, renderSlot, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { Primitive } from 'reka-ui';
import { c as cn } from './helpers-H80jjgLf.mjs';
import { b as buttonVariants } from './index-Dniqw3Np.mjs';
import { u as useAuthorization } from './authorization-DPJpR6G0.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Button",
  __ssrInlineRender: true,
  props: {
    variant: {},
    size: {},
    class: {},
    role: {},
    permissions: {},
    modifier: {},
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    useAuthorization();
    const showButton = ref(true);
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(showButton)) {
        _push(ssrRenderComponent(unref(Primitive), mergeProps({
          "data-slot": "button",
          as: _ctx.as,
          "as-child": _ctx.asChild,
          class: unref(cn)(unref(buttonVariants)({ variant: _ctx.variant, size: _ctx.size, modifier: _ctx.modifier }), props.class)
        }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "default")
              ];
            }
          }),
          _: 3
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/button/Button.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Button-BQvwvVGk.mjs.map
