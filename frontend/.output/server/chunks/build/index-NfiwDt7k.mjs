import { a as buildAssetsURL } from '../routes/renderer.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-D3NELkxn.mjs';
import { defineComponent, ref, computed, unref, mergeProps, withCtx, createTextVNode, createVNode, toDisplayString, createBlock, createCommentVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { b as useRoute, u as useEventStore, s as showImage } from './server.mjs';
import { f as formatDate } from './humanize-Dt8EJGgI.mjs';
import { _ as _sfc_main$3 } from './index-Bv9pTvYc.mjs';
import { MapIcon } from 'lucide-vue-next';
import moment from 'moment';
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
import 'class-variance-authority';
import './index-3vNTMeQu.mjs';
import './index-Dniqw3Np.mjs';
import './authorization-DPJpR6G0.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "card",
  __ssrInlineRender: true,
  props: {
    stage: {},
    raceSlug: {},
    raceName: {}
  },
  setup(__props) {
    const props = __props;
    const starts = computed(
      () => {
        var _a;
        return (_a = props.stage) == null ? void 0 : _a.stage_categories.map((category) => category.start).map((date) => moment(date)).sort((a, b) => a.valueOf() - b.valueOf())[0];
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Badge = _sfc_main$3;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        to: `/races/${__props.raceSlug}/stage/${__props.stage.id}`,
        class: "shadow"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<figure class="relative"${_scopeId}><img${ssrRenderAttr("src", unref(showImage)(__props.stage.thumbnail.file_name))}${ssrRenderAttr("alt", __props.stage.name)}${_scopeId}>`);
            if (unref(starts)) {
              _push2(ssrRenderComponent(_component_Badge, {
                variant: "secondary",
                class: "rounded-xs absolute top-2 left-2"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(formatDate)(unref(starts).toISOString()))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(formatDate)(unref(starts).toISOString())), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</figure><div class="px-7 space-y-5 pb-7"${_scopeId}><ul class="bg-[#13304a] text-white/80 flex gap-4 px-[30px] py-[17px] -mt-4 [&amp;&gt;li&gt;strong]:block [&amp;&gt;li&gt;em]:text-[#4487a0] [&amp;&gt;li&gt;em]:capitalize [&amp;&gt;li&gt;em]:not-italic relative z-[2] rounded-sm"${_scopeId}><li${_scopeId}><em${_scopeId}>${ssrInterpolate(__props.stage.distance)}</em><strong${_scopeId}>Distance</strong></li><li${_scopeId}><em${_scopeId}>${ssrInterpolate(__props.stage.difficulty)}</em><strong${_scopeId}>Difficulty</strong></li></ul><em class="text-[#13304a] text-3xl not-italic block"${_scopeId}>${ssrInterpolate(__props.raceName)}</em><h3 class="text-primary"${_scopeId}>${ssrInterpolate(__props.stage.name)}</h3><address class="not-italic flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(MapIcon), null, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(__props.stage.location)}</address></div>`);
          } else {
            return [
              createVNode("figure", { class: "relative" }, [
                createVNode("img", {
                  src: unref(showImage)(__props.stage.thumbnail.file_name),
                  alt: __props.stage.name
                }, null, 8, ["src", "alt"]),
                unref(starts) ? (openBlock(), createBlock(_component_Badge, {
                  key: 0,
                  variant: "secondary",
                  class: "rounded-xs absolute top-2 left-2"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(formatDate)(unref(starts).toISOString())), 1)
                  ]),
                  _: 1
                })) : createCommentVNode("", true)
              ]),
              createVNode("div", { class: "px-7 space-y-5 pb-7" }, [
                createVNode("ul", { class: "bg-[#13304a] text-white/80 flex gap-4 px-[30px] py-[17px] -mt-4 [&>li>strong]:block [&>li>em]:text-[#4487a0] [&>li>em]:capitalize [&>li>em]:not-italic relative z-[2] rounded-sm" }, [
                  createVNode("li", null, [
                    createVNode("em", null, toDisplayString(__props.stage.distance), 1),
                    createVNode("strong", null, "Distance")
                  ]),
                  createVNode("li", null, [
                    createVNode("em", null, toDisplayString(__props.stage.difficulty), 1),
                    createVNode("strong", null, "Difficulty")
                  ])
                ]),
                createVNode("em", { class: "text-[#13304a] text-3xl not-italic block" }, toDisplayString(__props.raceName), 1),
                createVNode("h3", { class: "text-primary" }, toDisplayString(__props.stage.name), 1),
                createVNode("address", { class: "not-italic flex items-center gap-2" }, [
                  createVNode(unref(MapIcon)),
                  createTextVNode(" " + toDisplayString(__props.stage.location), 1)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/default/home/card.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const bg01 = "" + buildAssetsURL("bg-01.DtQKYdWQ.png");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    const trailRace = ref(null);
    const { getBySlug } = useEventStore();
    const isFinished = computed(() => {
      var _a;
      return moment().isAfter(moment((_a = trailRace.value) == null ? void 0 : _a.end));
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Button = _sfc_main$2;
      if (unref(trailRace)) {
        _push(`<section${ssrRenderAttrs(mergeProps({ class: "relative z-[1]" }, _attrs))}><figure class="w-full z-0 sticky top-0"><img${ssrRenderAttr("src", unref(showImage)((_b = (_a = unref(trailRace)) == null ? void 0 : _a.thumbnail) == null ? void 0 : _b.file_name))}${ssrRenderAttr("alt", (_c = unref(trailRace)) == null ? void 0 : _c.name)} class="w-full h-auto"></figure><div class="bg-white container -mt-6 pb-6 rounded-t-md relative z-[2]"><header class="py-8 px-12"><h1 class="text-gray-600 text-4xl">${ssrInterpolate((_d = unref(trailRace)) == null ? void 0 : _d.name)}</h1><em class="not-italic"> Starts ${ssrInterpolate(unref(formatDate)(unref(trailRace).start))} until ${ssrInterpolate(unref(formatDate)(unref(trailRace).end))}</em></header><div class="flex gap-4"><div class="w-2/3"><div class="px-14"><h2 class="text-gray-400 uppercase text-sm mb-4">Event description</h2><div class="text-gray-500 text__holder content_editor">${(_e = unref(trailRace).description) != null ? _e : ""}</div></div></div><div class="w-1/3">`);
        if (!unref(isFinished)) {
          _push(`<div class="flex gap-2">`);
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
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div><section class="relative overflow-hidden z-[1]"><figure class="absolute inset-0 z-[-1]"><img${ssrRenderAttr("src", unref(bg01))}></figure><div class="container text-[#13304a] py-[100px]"><ul class="flex gap-12 [&amp;&gt;li&gt;strong]:block [&amp;&gt;li&gt;strong]:text-[25px] [&amp;&gt;li&gt;em]:not-italic [&amp;&gt;li&gt;em]:text-[40px]"><li><strong>Total Distance</strong><em>100KM +</em></li><li><strong>Five Different</strong><em>Places</em></li><li><strong>Five Different</strong><em>Summits</em></li><li><strong>Grade</strong><em>Challenging</em></li></ul></div></section>`);
        if (unref(trailRace).stages.length > 0) {
          _push(`<section class="bg-white py-12 relative z-[2]"><div class="container"><h2 class="text-2xl mb-7">Stages</h2><div class="flex gap-4"><!--[-->`);
          ssrRenderList(unref(trailRace).stages, (stage, index) => {
            _push(ssrRenderComponent(_sfc_main$1, {
              class: "w-1/3",
              "race-slug": unref(trailRace).slug,
              stage,
              "race-name": `${unref(trailRace).name} ${index + 1}`
            }, null, _parent));
          });
          _push(`<!--]--></div></div></section>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</section>`);
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
//# sourceMappingURL=index-NfiwDt7k.mjs.map
