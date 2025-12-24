import { a as buildAssetsURL } from '../routes/renderer.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-D3NELkxn.mjs';
import { defineComponent, ref, computed, unref, withCtx, createTextVNode, createVNode, createBlock, createCommentVNode, openBlock, useSlots, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderComponent, ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';
import moment from 'moment';
import { b as useRoute, a as useAxios, s as showImage, g as getGPXFile } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import { MapIcon } from 'lucide-vue-next';
import { _ as _sfc_main$2 } from './Button-bc6lCA4h.mjs';
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
import './authorization-DPJpR6G0.mjs';

const pad = (n, width, z = "0") => {
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Countdown",
  __ssrInlineRender: true,
  props: {
    date: {}
  },
  setup(__props) {
    const slots = useSlots();
    const tileCount = ref(0);
    const day = ref(0);
    const hour = ref(0);
    const minute = ref(0);
    const second = ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      const _cssVars = { style: {
        ":--v1798b80d": tileCount.value
      } };
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "countdown" }, _attrs, _cssVars))} data-v-ea4e6f67>`);
      if (unref(slots).default) {
        _push(`<div class="text" data-v-ea4e6f67>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="countdown__holder" data-v-ea4e6f67>`);
      if (day.value > 0) {
        _push(`<div class="countdown__tile" data-v-ea4e6f67><!--[-->`);
        ssrRenderList(unref(pad)(day.value.toString(), 2).split(""), (d, index) => {
          _push(`<span data-v-ea4e6f67>${ssrInterpolate(d)}</span>`);
        });
        _push(`<!--]--><em data-v-ea4e6f67>day${ssrInterpolate(day.value > 1 ? "s" : "")}</em></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="countdown__tile" data-v-ea4e6f67><!--[-->`);
      ssrRenderList(unref(pad)(hour.value.toString(), 2).split(""), (h, index) => {
        _push(`<span data-v-ea4e6f67>${ssrInterpolate(h)}</span>`);
      });
      _push(`<!--]--><em data-v-ea4e6f67>hour${ssrInterpolate(hour.value > 1 ? "s" : "")}</em></div><div class="countdown__tile" data-v-ea4e6f67><!--[-->`);
      ssrRenderList(unref(pad)(minute.value.toString(), 2).toString().split(""), (m, index) => {
        _push(`<span data-v-ea4e6f67>${ssrInterpolate(m)}</span>`);
      });
      _push(`<!--]--><em data-v-ea4e6f67>min${ssrInterpolate(minute.value > 1 ? "s" : "")}</em></div><div class="countdown__tile" data-v-ea4e6f67><!--[-->`);
      ssrRenderList(unref(pad)(second.value.toString(), 2).toString().split(""), (s, index) => {
        _push(`<span data-v-ea4e6f67>${ssrInterpolate(s)}</span>`);
      });
      _push(`<!--]--><em data-v-ea4e6f67>sec${ssrInterpolate(second.value > 1 ? "s" : "")}</em></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Countdown.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-ea4e6f67"]]);
const img01 = "" + buildAssetsURL("img01.BEUtbhuU.png");
const img02 = "" + buildAssetsURL("img02.Boi42oab.jpg");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    useAxios();
    const stage = ref(null);
    const starts = computed(
      () => {
        var _a;
        return (_a = stage.value) == null ? void 0 : _a.stage_categories.map((category) => category.start).map((date) => moment(date)).sort((a, b) => a.valueOf() - b.valueOf())[0];
      }
    );
    const ends = computed(
      () => {
        var _a;
        return (_a = stage.value) == null ? void 0 : _a.stage_categories.map((category) => category.end).map((date) => moment(date).local()).sort((a, b) => b.valueOf() - a.valueOf())[0];
      }
    );
    const hasStarted = computed(() => {
      var _a;
      return moment().isAfter((_a = starts.value) == null ? void 0 : _a.startOf("day"));
    });
    const hasEnded = computed(() => {
      var _a;
      return moment().isAfter((_a = ends.value) == null ? void 0 : _a.endOf("day"));
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Button = _sfc_main$2;
      const _component_Countdown = __nuxt_component_2;
      if (unref(stage)) {
        _push(`<!--[--><figure class="h-[calc(100vh-82px)] overflow-hidden"><img${ssrRenderAttr("src", unref(showImage)((_a = unref(stage)) == null ? void 0 : _a.thumbnail.file_name))}${ssrRenderAttr("alt", unref(stage).name)} class="w-full h-full object-cover"></figure><div class="text-[#13304a] container py-[80px]"><div class="space-y-4 mb-6"><!--[-->`);
        ssrRenderList(unref(stage).stage_categories, (stageCategory) => {
          var _a2;
          _push(`<div class="space-y-4"><strong class="block">Overview: ${ssrInterpolate(stageCategory.name)}</strong><div class="leading-7 content_editor">${(_a2 = stageCategory.description) != null ? _a2 : ""}</div></div>`);
        });
        _push(`<!--]--></div><div class="mb-6 leading-7 content_editor">${(_b = unref(stage).description) != null ? _b : ""}</div>`);
        if (!unref(hasEnded)) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: { name: "races-slug-runner", params: { slug: unref(stage).event.slug }, query: { stage_id: unref(stage).id } },
            "as-child": ""
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_Button, {
                  type: "button",
                  variant: "secondary"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`Register for race`);
                    } else {
                      return [
                        createTextVNode("Register for race")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_Button, {
                    type: "button",
                    variant: "secondary"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Register for race")
                    ]),
                    _: 1
                  })
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div><section class="bg-gray-200 relative overflow-hidden z-[1]"><div class="container text-[#13304a] py-[100px]"><ul class="flex gap-12 [&amp;&gt;li&gt;strong]:block [&amp;&gt;li&gt;strong]:text-[25px] [&amp;&gt;li&gt;em]:not-italic [&amp;&gt;li&gt;em]:text-[40px]"><li><strong>Total Distance</strong><em>100KM +</em></li><li><strong>Five Different</strong><em>Places</em></li><li><strong>Five Different</strong><em>Summits</em></li><li><strong>Grade</strong><em>Challenging</em></li></ul></div></section><div class="container py-[80px]"><div class="text-[#13304a] flex gap-4"><div class="w-3/5"><div class="mb-6 leading-7 content_editor">${(_c = unref(stage).event.description) != null ? _c : ""}</div><!--[-->`);
        ssrRenderList(unref(stage).stage_categories, (category) => {
          _push(`<div class="flex items-center gap-1 mb-2"><strong>${ssrInterpolate(category.name)} GPX file: </strong>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: unref(getGPXFile)(category.map_file.file_name)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_Button, {
                  type: "button",
                  variant: "secondary",
                  class: "rounded-full",
                  modifier: "outline"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(unref(MapIcon), null, null, _parent3, _scopeId2));
                      _push3(` Download GPX `);
                    } else {
                      return [
                        createVNode(unref(MapIcon)),
                        createTextVNode(" Download GPX ")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_Button, {
                    type: "button",
                    variant: "secondary",
                    class: "rounded-full",
                    modifier: "outline"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(MapIcon)),
                      createTextVNode(" Download GPX ")
                    ]),
                    _: 1
                  })
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></div><div class="w-2/5"><figure class="rounded-sm overflow-hidden mb-5"><img${ssrRenderAttr("src", unref(img01))}></figure><strong class="uppercase tracking-wide text-3xl leading-10 block mb-5"> If you are an Elite Athlete, please register for free. </strong><p class="text-gray-500 mb-1">Eligibility for elite athletes is as follows:</p><ul class="space-y-3 pb-10 mb-10 border-b-4 border-secondary"><li>Men\u2019s Category: Minimum 750 ITRA points</li><li>Women\u2019s Category: Minimum 600 ITRA points</li><li>Please make sure to upload your ITRA profile link in the payment section.</li></ul><strong class="tracking-wide text-xl block mb-5"> #3 Result will be updated here after the race. </strong></div></div></div><section class="relative z-0 overflow-hidden"><figure class="absolute inset-0 -z-[-1]"><img${ssrRenderAttr("src", unref(img02))}></figure><div class="text-white text-center grid place-items-center min-h-[620px] z-[1] relative"><div class="container">`);
        if (unref(starts) && !unref(hasStarted)) {
          _push(ssrRenderComponent(_component_Countdown, {
            date: unref(starts),
            class: "mb-3"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<em class="not-italic block"${_scopeId}>Race starts in</em>`);
              } else {
                return [
                  createVNode("em", { class: "not-italic block" }, "Race starts in")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (unref(ends) && !unref(hasEnded)) {
          _push(ssrRenderComponent(_component_Countdown, {
            date: unref(ends).endOf("day"),
            class: "mb-3"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<em class="not-italic block"${_scopeId}>Will end in</em>`);
              } else {
                return [
                  createVNode("em", { class: "not-italic block" }, "Will end in")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: { name: "races-slug-runner", params: { slug: unref(stage).event.slug }, query: { stage_id: unref(stage).id } },
          "as-child": ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (!unref(hasEnded)) {
                _push2(ssrRenderComponent(_component_Button, {
                  type: "button",
                  variant: "secondary",
                  size: "lg",
                  class: "w-[200px] rounded-full"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`Register now`);
                    } else {
                      return [
                        createTextVNode("Register now")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                !unref(hasEnded) ? (openBlock(), createBlock(_component_Button, {
                  key: 0,
                  type: "button",
                  variant: "secondary",
                  size: "lg",
                  class: "w-[200px] rounded-full"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Register now")
                  ]),
                  _: 1
                })) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
        if (unref(hasEnded)) {
          _push(`<strong class="font-normal text-5xl">Registration closed</strong>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></section><!--]-->`);
      } else {
        _push(`<span${ssrRenderAttrs(_attrs)}>loading...</span>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/races/[slug]/stage/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-9rN9sK-X.mjs.map
