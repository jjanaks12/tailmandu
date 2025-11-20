import { _ as _sfc_main$5 } from './Input-DM54l6M4.mjs';
import { _ as _sfc_main$6 } from './index-WlfeWCet.mjs';
import { _ as _sfc_main$2$1, a as _sfc_main$7, b as _sfc_main$1$1, c as abbr } from './AvatarImage-BKYKzFla.mjs';
import { defineComponent, ref, computed, unref, isRef, withCtx, createVNode, createTextVNode, mergeProps, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderSlot } from 'vue/server-renderer';
import moment from 'moment';
import { a as useAxios, b as useRoute, c as useAuthStore, s as showImage } from './server.mjs';
import { cva } from 'class-variance-authority';
import { RefreshCwIcon, TriangleAlertIcon } from 'lucide-vue-next';
import { u as useHead } from './v3-CnyYpv1t.mjs';
import { storeToRefs } from 'pinia';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import './index-DRYUbUIy.mjs';
import './index-BCNSwEbA.mjs';
import './helpers-H80jjgLf.mjs';
import 'reka-ui';
import './authorization-DPJpR6G0.mjs';
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

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Runner",
  __ssrInlineRender: true,
  props: {
    runner: {},
    timer: {},
    stageId: {}
  },
  emits: ["update"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const { axios } = useAxios();
    const fullName = computed(() => [props.runner.personal.first_name, props.runner.personal.middle_name, props.runner.personal.last_name].join(" "));
    const logTimer = async () => {
      if (props.timer == void 0) {
        await axios.post(`/volunteers/${props.stageId}/log_timer/${props.runner.id}`);
        emit("update");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Avatar = _sfc_main$2$1;
      const _component_AvatarImage = _sfc_main$7;
      const _component_AvatarFallback = _sfc_main$1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "text-center space-y-2" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Avatar, {
        class: { "size-[120px] mx-auto border-4": true, "border-primary": _ctx.timer == void 0, "border-secondary": _ctx.timer !== void 0 },
        onClick: logTimer
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(ssrRenderComponent(_component_AvatarImage, {
              src: unref(showImage)((_b = (_a = _ctx.runner.personal) == null ? void 0 : _a.avatar) == null ? void 0 : _b.file_name),
              alt: _ctx.runner.personal.first_name
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_AvatarFallback, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(abbr)(unref(fullName)))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(abbr)(unref(fullName))), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_AvatarImage, {
                src: unref(showImage)((_d = (_c = _ctx.runner.personal) == null ? void 0 : _c.avatar) == null ? void 0 : _d.file_name),
                alt: _ctx.runner.personal.first_name
              }, null, 8, ["src", "alt"]),
              createVNode(_component_AvatarFallback, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(abbr)(unref(fullName))), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<strong class="block">${ssrInterpolate(unref(fullName))}</strong><em class="not-italic text-3xl text-black block">${ssrInterpolate(_ctx.runner.bib)}</em>`);
      if (_ctx.timer) {
        _push(`<span class="block">${ssrInterpolate(unref(moment)(_ctx.timer).format("YYYY-MM-DD HH:mm:ss"))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="${ssrRenderClass({ "flag": true, ["flag-" + _ctx.runner.personal.country.abbr]: true })}"></span></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/dashboard/volunteer/Runner.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Alert",
  __ssrInlineRender: true,
  props: {
    class: {},
    variant: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "alert",
        class: unref(cn)(unref(alertVariants)({ variant: _ctx.variant }), props.class),
        role: "alert"
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/alert/Alert.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AlertDescription",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "alert-description",
        class: unref(cn)("text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/alert/AlertDescription.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AlertTitle",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "alert-title",
        class: unref(cn)("col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/alert/AlertTitle.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive: "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
        info: "text-blue-800 bg-card [&>svg]:text-blue-400 *:data-[slot=alert-description]:text-blue-400"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[stage_id]",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Volunteer"
    });
    const { axios } = useAxios();
    const route = useRoute();
    const { user } = storeToRefs(useAuthStore());
    const runners = ref([]);
    const entryList = ref([]);
    const searchText = ref("");
    const checkpoint = computed(() => {
      var _a, _b, _c;
      let foundCheckpoint = null;
      for (const volunteer of (_c = (_b = (_a = user.value) == null ? void 0 : _a.personal) == null ? void 0 : _b.volunteers) != null ? _c : []) {
        for (const checkpoint2 of volunteer.checkpoints) {
          if (checkpoint2.stage_id == route.params.stage_id)
            foundCheckpoint = checkpoint2;
        }
      }
      return foundCheckpoint;
    });
    const fetchCheckpointRegister = async () => {
      if (checkpoint.value) {
        const { data } = await axios.get(`/volunteers/checkpoints/${checkpoint.value.id}/entry`);
        entryList.value = data;
      }
    };
    const fetch = async () => {
      const { data } = await axios.get(`/events/stages/${route.params.stage_id}/runners`);
      runners.value = data;
      fetchCheckpointRegister();
    };
    const findEntry = (runner_id) => {
      var _a;
      return (_a = entryList.value.find((entry) => entry.runner_id === runner_id)) != null ? _a : null;
    };
    const filteredList = computed(() => runners.value.filter((runner) => runner.bib.includes(searchText.value)));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Input = _sfc_main$5;
      const _component_Button = _sfc_main$6;
      const _component_PagesDashboardVolunteerRunner = _sfc_main$4;
      const _component_Alert = _sfc_main$3;
      const _component_AlertTitle = _sfc_main$1;
      const _component_AlertDescription = _sfc_main$2;
      _push(`<!--[--><div class="flex justify-end items-center gap-4 pb-4 mb-14 border-b">`);
      _push(ssrRenderComponent(_component_Input, {
        modelValue: unref(searchText),
        "onUpdate:modelValue": ($event) => isRef(searchText) ? searchText.value = $event : null,
        placeholder: "Search by BIB ID here...",
        class: "max-w-[280px]"
      }, null, _parent));
      _push(ssrRenderComponent(_component_Button, {
        type: "button",
        onClick: fetch,
        size: "icon",
        modifier: "outline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(RefreshCwIcon), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(RefreshCwIcon))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(filteredList).length > 0) {
        _push(`<div class="flex gap-4"><!--[-->`);
        ssrRenderList(unref(filteredList), (runner) => {
          var _a;
          _push(ssrRenderComponent(_component_PagesDashboardVolunteerRunner, {
            timer: (_a = findEntry(runner.id)) == null ? void 0 : _a.timer,
            "stage-id": unref(route).params.stage_id,
            runner,
            class: "w-1/2 md:w-1/3 lg:w-1/4",
            onUpdate: fetchCheckpointRegister
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!--[-->`);
        if (unref(searchText)) {
          _push(ssrRenderComponent(_component_Alert, { variant: "info" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(TriangleAlertIcon), null, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_AlertTitle, { class: "text-lg" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`No runners found!`);
                    } else {
                      return [
                        createTextVNode("No runners found!")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_AlertDescription, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<p${_scopeId2}>Please check on your search, there might be some typo.</p>`);
                    } else {
                      return [
                        createVNode("p", null, "Please check on your search, there might be some typo.")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(TriangleAlertIcon)),
                  createVNode(_component_AlertTitle, { class: "text-lg" }, {
                    default: withCtx(() => [
                      createTextVNode("No runners found!")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_AlertDescription, null, {
                    default: withCtx(() => [
                      createVNode("p", null, "Please check on your search, there might be some typo.")
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
        _push(`<!--]-->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/volunteer/checkpoint/[stage_id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_stage_id_-Df_1UdTW.mjs.map
