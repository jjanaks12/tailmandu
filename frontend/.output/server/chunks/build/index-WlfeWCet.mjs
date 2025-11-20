import { defineComponent, ref, unref, mergeProps, withCtx, renderSlot, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { Primitive } from 'reka-ui';
import { c as cn } from './helpers-H80jjgLf.mjs';
import { cva } from 'class-variance-authority';
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
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 [--i-c-btn-color:var(--primary)]",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 [--i-c-btn-color:var(--destructive)]",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 [--i-c-btn-color:var(--secondary)]",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        volunteer: "border border-[#4487a0] text-[#4487a0] cursor-pointer [--i-c-btn-color:#4487a0]",
        runner: "bg-[#4487a0] text-white cursor-pointer [--i-c-btn-color:#4487a0]",
        muted: "bg-[var(--i-c-btn-color)] text-white shadow-xs hover:bg-secondary/80 [--i-c-btn-color:var(--color-input)]"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      },
      modifier: {
        outline: "bg-transparent text-[var(--i-c-btn-color)] border border-[var(--i-c-btn-color)] hover:bg-[var(--i-c-btn-color)] hover:text-white",
        link: "bg-transparent text-[var(--i-c-btn-color)] h-auto underline-offset-4 hover:bg-transparent hover:underline p-0  shadow-none border-none"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export { _sfc_main as _, buttonVariants as b };
//# sourceMappingURL=index-WlfeWCet.mjs.map
