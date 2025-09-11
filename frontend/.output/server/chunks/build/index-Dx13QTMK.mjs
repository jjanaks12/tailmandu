import { _ as __nuxt_component_0 } from './nuxt-link-C7aJpepl.mjs';
import { _ as _sfc_main$1 } from './index-fXRoVOws.mjs';
import { defineComponent, ref, unref, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { a as useRoute, u as useEventStore, s as showImage } from './server.mjs';
import { f as formatDate } from './humanize-Dt8EJGgI.mjs';
import { u as useHead } from './v3-UNO0wT_2.mjs';
import { u as useTitle } from './index-DRYUbUIy.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'reka-ui';
import './helpers-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
import 'class-variance-authority';
import './authorization-NeTuVL6Y.mjs';
import 'pinia';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
import 'deep-pick-omit';
import 'axios';
import 'vue-sonner';
import 'moment';
import './index-BCNSwEbA.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    const trailRace = ref(null);
    const { getBySlug } = useEventStore();
    useHead({});
    useTitle(trailRace.value ? trailRace.value.name : "Events");
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Button = _sfc_main$1;
      if (unref(trailRace)) {
        _push(`<section${ssrRenderAttrs(mergeProps({ class: "relative z-[1]" }, _attrs))}><figure class="w-full z-0 sticky top-0"><img${ssrRenderAttr("src", unref(showImage)((_b = (_a = unref(trailRace)) == null ? void 0 : _a.thumbnail) == null ? void 0 : _b.file_name))}${ssrRenderAttr("alt", (_c = unref(trailRace)) == null ? void 0 : _c.name)} class="w-full h-auto"></figure><div class="bg-white container -mt-6 rounded-t-md relative z-[2]"><header class="py-8 px-12"><h1 class="text-gray-600 text-4xl">${ssrInterpolate((_d = unref(trailRace)) == null ? void 0 : _d.name)}</h1><em class="not-italic"> Starts ${ssrInterpolate(unref(formatDate)(unref(trailRace).start))} until ${ssrInterpolate(unref(formatDate)(unref(trailRace).end))}</em></header><div class="flex gap-4"><div class="w-2/3"><div class="px-14"><h2 class="text-gray-400 uppercase text-sm mb-4">Event description</h2><div class="text-gray-500 text__holder">${(_e = unref(trailRace).description) != null ? _e : ""}</div></div></div><div class="w-1/3"><div class="flex gap-2">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: { name: "races-slug-volunteer", params: { slug: unref(trailRace).slug } },
          "as-child": ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Button, { variant: "volunteer" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Apply for volunteers`);
                  } else {
                    return [
                      createTextVNode("Apply for volunteers")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Button, { variant: "volunteer" }, {
                  default: withCtx(() => [
                    createTextVNode("Apply for volunteers")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: { name: "races-slug-runner", params: { slug: unref(trailRace).slug } },
          "as-child": ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Button, { variant: "runner" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Apply as runners`);
                  } else {
                    return [
                      createTextVNode("Apply as runners")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Button, { variant: "runner" }, {
                  default: withCtx(() => [
                    createTextVNode("Apply as runners")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div></div></section>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/races/[slug]/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Dx13QTMK.mjs.map
