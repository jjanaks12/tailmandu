import { _ as __nuxt_component_0 } from './nuxt-link-Bkw0LjSi.mjs';
import { _ as _sfc_main$2 } from './registrationForm-N1O7uv8d.mjs';
import { defineComponent, ref, unref, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { ArrowBigLeft } from 'lucide-vue-next';
import { b as useRoute, u as useEventStore, s as showImage } from './server.mjs';
import { _ as _sfc_main$1 } from './Button-BQvwvVGk.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import './Label-jSWrZiLt.mjs';
import 'reka-ui';
import './helpers-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
import './index-BCNSwEbA.mjs';
import './Input-DM54l6M4.mjs';
import './index-DRYUbUIy.mjs';
import './SelectValue-cH59kxAH.mjs';
import './Checkbox-COe6Ah5B.mjs';
import 'vee-validate';
import '@internationalized/date';
import 'pinia';
import './DatePicker-DwR9bXOV.mjs';
import './index-Dniqw3Np.mjs';
import 'class-variance-authority';
import 'reka-ui/date';
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
import './authorization-DPJpR6G0.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "runner",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const { getBySlug } = useEventStore();
    const trailRace = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_Button = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_PagesDashboardEventRacesRegistrationForm = _sfc_main$2;
      if (unref(trailRace)) {
        _push(`<section${ssrRenderAttrs(mergeProps({ class: "overflow-hidden" }, _attrs))}><figure class="fixed inset-0 -z-[1]"><img${ssrRenderAttr("src", unref(showImage)((_a = unref(trailRace).thumbnail) == null ? void 0 : _a.file_name))}${ssrRenderAttr("alt", unref(trailRace).name)} class="size-full object-cover"></figure><div class="container"><div class="bg-white/90 p-12 mt-12 rounded-tl-2xl rounded-tr-2xl"><div class="space-y-4 mb-16"><h1 class="text-primary text-3xl">${ssrInterpolate((_b = unref(trailRace)) == null ? void 0 : _b.name)}</h1><p>${ssrInterpolate(unref(trailRace).excerpt)}</p><div class="flex justify-center">`);
        _push(ssrRenderComponent(_component_Button, {
          size: "lg",
          "as-child": ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_NuxtLink, {
                to: `/races/${unref(route).params.slug}`,
                "as-child": ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(ArrowBigLeft), null, null, _parent3, _scopeId2));
                    _push3(` Back to main event `);
                  } else {
                    return [
                      createVNode(unref(ArrowBigLeft)),
                      createTextVNode(" Back to main event ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_NuxtLink, {
                  to: `/races/${unref(route).params.slug}`,
                  "as-child": ""
                }, {
                  default: withCtx(() => [
                    createVNode(unref(ArrowBigLeft)),
                    createTextVNode(" Back to main event ")
                  ]),
                  _: 1
                }, 8, ["to"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
        _push(ssrRenderComponent(_component_PagesDashboardEventRacesRegistrationForm, {
          "event-id": unref(trailRace).id,
          "trail-race": unref(trailRace),
          mode: "runner"
        }, null, _parent));
        _push(`</div></div></section>`);
      } else {
        _push(`<div${ssrRenderAttrs(_attrs)}>loading....</div>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/races/[slug]/runner.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=runner-Do_4w1aO.mjs.map
