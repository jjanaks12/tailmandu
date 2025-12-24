import { defineComponent, mergeProps, unref, ref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as useHead } from './v3-gCezraLe.mjs';
import { u as useAuthorization } from './authorization-DPJpR6G0.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-D3NELkxn.mjs';
import { RefreshCcwIcon } from 'lucide-vue-next';
import moment from 'moment';
import { a as useAxios } from './server.mjs';
import { _ as _sfc_main$2 } from './Button-bc6lCA4h.mjs';
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
import 'pinia';
import 'vue-router';
import 'deep-pick-omit';
import 'yup';
import 'axios';
import 'vue-sonner';
import 'reka-ui';
import './helpers-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
import './index-Dniqw3Np.mjs';
import 'class-variance-authority';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "EventList",
  __ssrInlineRender: true,
  setup(__props) {
    const { axios } = useAxios();
    const stages = ref([]);
    const isLoading = ref(false);
    const fetch = async () => {
      isLoading.value = true;
      const { data } = await axios.get("/volunteers/trail_events");
      stages.value = data;
      isLoading.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = _sfc_main$2;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "w-full space-y-4" }, _attrs))}><header class="flex items-center gap-2 pb-4 border-b border-primary"><div class="grow"><h1 class="text-3xl text-secondary">Current events</h1></div>`);
      _push(ssrRenderComponent(_component_Button, {
        onClick: fetch,
        variant: "secondary",
        modifier: "link",
        disabled: unref(isLoading)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(RefreshCcwIcon), {
              class: { "animate-spin": unref(isLoading) }
            }, null, _parent2, _scopeId));
            _push2(` fetch `);
          } else {
            return [
              createVNode(unref(RefreshCcwIcon), {
                class: { "animate-spin": unref(isLoading) }
              }, null, 8, ["class"]),
              createTextVNode(" fetch ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</header><div class="space-y-2"><!--[-->`);
      ssrRenderList(unref(stages), (stage) => {
        _push(`<div><h2 class="text-xl text-gray-600">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/dashboard/volunteer/checkpoint/${stage.id}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(stage.event.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(stage.event.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</h2><em class="not-italic">Starts ${ssrInterpolate(unref(moment)(stage.event.start).fromNow())}</em></div>`);
      });
      _push(`<!--]--></div></section>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/dashboard/volunteer/EventList.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Dashboard"
    });
    const { can } = useAuthorization();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-wrap space-y-2" }, _attrs))}>`);
      if (unref(can)("timer_view")) {
        _push(ssrRenderComponent(unref(_sfc_main$1), null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DRWbyuPn.mjs.map
