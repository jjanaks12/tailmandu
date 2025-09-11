import { defineComponent, ref, mergeProps, unref, withCtx, isRef, createBlock, createCommentVNode, openBlock, createVNode, createTextVNode, toDisplayString, Fragment, renderList, renderSlot, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { useForwardPropsEmits, StepperRoot, useForwardProps, StepperItem, StepperSeparator, StepperTrigger, StepperTitle, SelectGroup } from 'reka-ui';
import { c as cn } from './helpers-H80jjgLf.mjs';
import { r as reactiveOmit } from './index-BCNSwEbA.mjs';
import { _ as _sfc_main$7 } from './index-fXRoVOws.mjs';
import { _ as _sfc_main$8 } from './Input-DM54l6M4.mjs';
import { _ as _sfc_main$6$1, a as _sfc_main$1$1, b as _sfc_main$9, c as _sfc_main$5$1, d as _sfc_main$4$1 } from './SelectValue-cH59kxAH.mjs';
import { Check, Circle, Dot } from 'lucide-vue-next';
import { Form, Field } from 'vee-validate';
import { u as useHead } from './v3-UNO0wT_2.mjs';
import 'clsx';
import 'tailwind-merge';
import 'class-variance-authority';
import './authorization-NeTuVL6Y.mjs';
import './server.mjs';
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
import 'pinia';
import 'vue-router';
import 'deep-pick-omit';
import 'axios';
import 'vue-sonner';
import './index-DRYUbUIy.mjs';

const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "SelectGroup",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(SelectGroup), mergeProps({ "data-slot": "select-group" }, props, _attrs), {
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
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/select/SelectGroup.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "Stepper",
  __ssrInlineRender: true,
  props: {
    defaultValue: {},
    orientation: {},
    dir: {},
    modelValue: {},
    linear: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(StepperRoot), mergeProps({
        class: unref(cn)(
          "flex gap-2",
          props.class
        )
      }, unref(forwarded), _attrs), {
        default: withCtx((slotProps, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", slotProps, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", slotProps)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/stepper/Stepper.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "StepperItem",
  __ssrInlineRender: true,
  props: {
    step: {},
    disabled: { type: Boolean },
    completed: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(StepperItem), mergeProps(unref(forwarded), {
        class: unref(cn)("flex items-center gap-2 group data-[disabled]:pointer-events-none", props.class)
      }, _attrs), {
        default: withCtx((slotProps, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", slotProps, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", slotProps)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/stepper/StepperItem.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "StepperSeparator",
  __ssrInlineRender: true,
  props: {
    orientation: {},
    decorative: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(StepperSeparator), mergeProps(unref(forwarded), {
        class: unref(cn)(
          "bg-muted",
          // Disabled
          "group-data-[disabled]:bg-muted group-data-[disabled]:opacity-50",
          // Completed
          "group-data-[state=completed]:bg-accent-foreground",
          props.class
        )
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/stepper/StepperSeparator.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "StepperTitle",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(StepperTitle), mergeProps(unref(forwarded), {
        class: unref(cn)("text-md font-semibold whitespace-nowrap", props.class)
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
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/stepper/StepperTitle.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "StepperTrigger",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(StepperTrigger), mergeProps(unref(forwarded), {
        class: unref(cn)("p-1 flex flex-col items-center text-center gap-1 rounded-md", props.class)
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
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/stepper/StepperTrigger.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "getting_started",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Login"
    });
    const stepIndex = ref(1);
    const steps = [{
      step: 1,
      title: "Your basic information",
      description: "Provide your name and email"
    }, {
      step: 2,
      title: "Your details",
      description: "Provide your name and email"
    }, {
      step: 3,
      title: "Your password",
      description: "Choose a password"
    }, {
      step: 4,
      title: "Your Favorite Drink",
      description: "Choose a drink"
    }];
    const onSubmit = (values) => {
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Stepper = _sfc_main$5;
      const _component_StepperItem = _sfc_main$4;
      const _component_StepperSeparator = _sfc_main$3;
      const _component_StepperTrigger = _sfc_main$1;
      const _component_Button = _sfc_main$7;
      const _component_StepperTitle = _sfc_main$2;
      const _component_Input = _sfc_main$8;
      const _component_Select = _sfc_main$6$1;
      const _component_SelectTrigger = _sfc_main$1$1;
      const _component_SelectValue = _sfc_main$9;
      const _component_SelectContent = _sfc_main$5$1;
      const _component_SelectGroup = _sfc_main$6;
      const _component_SelectItem = _sfc_main$4$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white w-full max-w-[750px] p-8 rounded-lg" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Form), {
        "keep-values": "",
        onSubmit
      }, {
        default: withCtx(({ meta }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Stepper, {
              modelValue: unref(stepIndex),
              "onUpdate:modelValue": ($event) => isRef(stepIndex) ? stepIndex.value = $event : null,
              class: "block w-full"
            }, {
              default: withCtx(({ isNextDisabled, isPrevDisabled, nextStep, prevStep }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex w-full flex-start gap-2"${_scopeId2}><!--[-->`);
                  ssrRenderList(steps, (step) => {
                    _push3(ssrRenderComponent(_component_StepperItem, {
                      key: step.step,
                      class: "relative flex w-full flex-col items-center justify-center",
                      step: step.step
                    }, {
                      default: withCtx(({ state }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          if (step.step !== steps[steps.length - 1].step) {
                            _push4(ssrRenderComponent(_component_StepperSeparator, { class: "absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary" }, null, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(ssrRenderComponent(_component_StepperTrigger, { "as-child": "" }, {
                            default: withCtx((_, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_Button, {
                                  variant: state === "completed" || state === "active" ? "default" : "outline",
                                  size: "icon",
                                  class: ["z-10 rounded-full shrink-0", [state === "active" && "ring-2 ring-ring ring-offset-2 ring-offset-background"]],
                                  disabled: state !== "completed" && !meta.valid
                                }, {
                                  default: withCtx((_2, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      if (state === "completed") {
                                        _push6(ssrRenderComponent(unref(Check), { class: "size-5" }, null, _parent6, _scopeId5));
                                      } else {
                                        _push6(`<!---->`);
                                      }
                                      if (state === "active") {
                                        _push6(ssrRenderComponent(unref(Circle), null, null, _parent6, _scopeId5));
                                      } else {
                                        _push6(`<!---->`);
                                      }
                                      if (state === "inactive") {
                                        _push6(ssrRenderComponent(unref(Dot), null, null, _parent6, _scopeId5));
                                      } else {
                                        _push6(`<!---->`);
                                      }
                                    } else {
                                      return [
                                        state === "completed" ? (openBlock(), createBlock(unref(Check), {
                                          key: 0,
                                          class: "size-5"
                                        })) : createCommentVNode("", true),
                                        state === "active" ? (openBlock(), createBlock(unref(Circle), { key: 1 })) : createCommentVNode("", true),
                                        state === "inactive" ? (openBlock(), createBlock(unref(Dot), { key: 2 })) : createCommentVNode("", true)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_Button, {
                                    variant: state === "completed" || state === "active" ? "default" : "outline",
                                    size: "icon",
                                    class: ["z-10 rounded-full shrink-0", [state === "active" && "ring-2 ring-ring ring-offset-2 ring-offset-background"]],
                                    disabled: state !== "completed" && !meta.valid
                                  }, {
                                    default: withCtx(() => [
                                      state === "completed" ? (openBlock(), createBlock(unref(Check), {
                                        key: 0,
                                        class: "size-5"
                                      })) : createCommentVNode("", true),
                                      state === "active" ? (openBlock(), createBlock(unref(Circle), { key: 1 })) : createCommentVNode("", true),
                                      state === "inactive" ? (openBlock(), createBlock(unref(Dot), { key: 2 })) : createCommentVNode("", true)
                                    ]),
                                    _: 2
                                  }, 1032, ["variant", "class", "disabled"])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(`<div class="mt-5 flex flex-col items-center text-center"${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_StepperTitle, {
                            class: [[state === "active" && "text-primary"], "text-sm font-semibold transition lg:text-base"]
                          }, {
                            default: withCtx((_, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(step.title)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(step.title), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          return [
                            step.step !== steps[steps.length - 1].step ? (openBlock(), createBlock(_component_StepperSeparator, {
                              key: 0,
                              class: "absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
                            })) : createCommentVNode("", true),
                            createVNode(_component_StepperTrigger, { "as-child": "" }, {
                              default: withCtx(() => [
                                createVNode(_component_Button, {
                                  variant: state === "completed" || state === "active" ? "default" : "outline",
                                  size: "icon",
                                  class: ["z-10 rounded-full shrink-0", [state === "active" && "ring-2 ring-ring ring-offset-2 ring-offset-background"]],
                                  disabled: state !== "completed" && !meta.valid
                                }, {
                                  default: withCtx(() => [
                                    state === "completed" ? (openBlock(), createBlock(unref(Check), {
                                      key: 0,
                                      class: "size-5"
                                    })) : createCommentVNode("", true),
                                    state === "active" ? (openBlock(), createBlock(unref(Circle), { key: 1 })) : createCommentVNode("", true),
                                    state === "inactive" ? (openBlock(), createBlock(unref(Dot), { key: 2 })) : createCommentVNode("", true)
                                  ]),
                                  _: 2
                                }, 1032, ["variant", "class", "disabled"])
                              ]),
                              _: 2
                            }, 1024),
                            createVNode("div", { class: "mt-5 flex flex-col items-center text-center" }, [
                              createVNode(_component_StepperTitle, {
                                class: [[state === "active" && "text-primary"], "text-sm font-semibold transition lg:text-base"]
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(step.title), 1)
                                ]),
                                _: 2
                              }, 1032, ["class"])
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]--></div><div class="flex flex-col gap-4 mt-4"${_scopeId2}>`);
                  if (unref(stepIndex) === 1) {
                    _push3(`<h1${_scopeId2}>Your information</h1>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(stepIndex) === 2) {
                    _push3(`<!--[-->`);
                    _push3(ssrRenderComponent(unref(Field), { name: "fullName" }, {
                      default: withCtx(({ field }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_Input, mergeProps({ type: "text" }, field), null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_Input, mergeProps({ type: "text" }, field), null, 16)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(Field), { name: "email" }, {
                      default: withCtx(({ field }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_Input, mergeProps({ type: "email " }, field), null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_Input, mergeProps({ type: "email " }, field), null, 16)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`<!--]-->`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(stepIndex) === 3) {
                    _push3(`<!--[-->`);
                    _push3(ssrRenderComponent(unref(Field), { name: "password" }, {
                      default: withCtx(({ field }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_Input, mergeProps({ type: "password" }, field), null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_Input, mergeProps({ type: "password" }, field), null, 16)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(Field), { name: "confirmPassword" }, {
                      default: withCtx(({ field }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_Input, mergeProps({ type: "password" }, field), null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_Input, mergeProps({ type: "password" }, field), null, 16)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`<!--]-->`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(stepIndex) === 4) {
                    _push3(ssrRenderComponent(unref(Field), { name: "favoriteDrink" }, {
                      default: withCtx(({ field }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_Select, field, {
                            default: withCtx((_, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_SelectTrigger, null, {
                                  default: withCtx((_2, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_SelectValue, { placeholder: "Select a drink" }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_SelectValue, { placeholder: "Select a drink" })
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(_component_SelectContent, null, {
                                  default: withCtx((_2, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_SelectGroup, null, {
                                        default: withCtx((_3, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(_component_SelectItem, { value: "coffee" }, {
                                              default: withCtx((_4, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(` Coffee `);
                                                } else {
                                                  return [
                                                    createTextVNode(" Coffee ")
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(_component_SelectItem, { value: "tea" }, {
                                              default: withCtx((_4, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(` Tea `);
                                                } else {
                                                  return [
                                                    createTextVNode(" Tea ")
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(_component_SelectItem, { value: "soda" }, {
                                              default: withCtx((_4, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(` Soda `);
                                                } else {
                                                  return [
                                                    createTextVNode(" Soda ")
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(_component_SelectItem, { value: "coffee" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" Coffee ")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_SelectItem, { value: "tea" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" Tea ")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_SelectItem, { value: "soda" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" Soda ")
                                                ]),
                                                _: 1
                                              })
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_SelectGroup, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_SelectItem, { value: "coffee" }, {
                                              default: withCtx(() => [
                                                createTextVNode(" Coffee ")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_SelectItem, { value: "tea" }, {
                                              default: withCtx(() => [
                                                createTextVNode(" Tea ")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_SelectItem, { value: "soda" }, {
                                              default: withCtx(() => [
                                                createTextVNode(" Soda ")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_SelectTrigger, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_SelectValue, { placeholder: "Select a drink" })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_SelectContent, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_SelectGroup, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_SelectItem, { value: "coffee" }, {
                                            default: withCtx(() => [
                                              createTextVNode(" Coffee ")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_SelectItem, { value: "tea" }, {
                                            default: withCtx(() => [
                                              createTextVNode(" Tea ")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_SelectItem, { value: "soda" }, {
                                            default: withCtx(() => [
                                              createTextVNode(" Soda ")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_Select, field, {
                              default: withCtx(() => [
                                createVNode(_component_SelectTrigger, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_SelectValue, { placeholder: "Select a drink" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_SelectContent, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_SelectGroup, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_SelectItem, { value: "coffee" }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Coffee ")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_SelectItem, { value: "tea" }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Tea ")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_SelectItem, { value: "soda" }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Soda ")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 2
                            }, 1040)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="flex items-center justify-between mt-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Button, {
                    disabled: isPrevDisabled,
                    variant: "outline",
                    size: "sm",
                    onClick: ($event) => prevStep()
                  }, {
                    default: withCtx((_, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Back `);
                      } else {
                        return [
                          createTextVNode(" Back ")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(`<div class="flex items-center gap-3"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Button, {
                    type: "button",
                    variant: "outline",
                    onClick: ($event) => nextStep()
                  }, {
                    default: withCtx((_, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Skip`);
                      } else {
                        return [
                          createTextVNode("Skip")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  if (unref(stepIndex) !== steps.length) {
                    _push3(ssrRenderComponent(_component_Button, {
                      type: meta.valid ? "button" : "submit",
                      disabled: isNextDisabled,
                      size: "sm",
                      onClick: ($event) => meta.valid && nextStep()
                    }, {
                      default: withCtx((_, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Next `);
                        } else {
                          return [
                            createTextVNode(" Next ")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent(_component_Button, {
                      size: "sm",
                      type: "submit"
                    }, {
                      default: withCtx((_, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Submit `);
                        } else {
                          return [
                            createTextVNode(" Submit ")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  }
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex w-full flex-start gap-2" }, [
                      (openBlock(), createBlock(Fragment, null, renderList(steps, (step) => {
                        return createVNode(_component_StepperItem, {
                          key: step.step,
                          class: "relative flex w-full flex-col items-center justify-center",
                          step: step.step
                        }, {
                          default: withCtx(({ state }) => [
                            step.step !== steps[steps.length - 1].step ? (openBlock(), createBlock(_component_StepperSeparator, {
                              key: 0,
                              class: "absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
                            })) : createCommentVNode("", true),
                            createVNode(_component_StepperTrigger, { "as-child": "" }, {
                              default: withCtx(() => [
                                createVNode(_component_Button, {
                                  variant: state === "completed" || state === "active" ? "default" : "outline",
                                  size: "icon",
                                  class: ["z-10 rounded-full shrink-0", [state === "active" && "ring-2 ring-ring ring-offset-2 ring-offset-background"]],
                                  disabled: state !== "completed" && !meta.valid
                                }, {
                                  default: withCtx(() => [
                                    state === "completed" ? (openBlock(), createBlock(unref(Check), {
                                      key: 0,
                                      class: "size-5"
                                    })) : createCommentVNode("", true),
                                    state === "active" ? (openBlock(), createBlock(unref(Circle), { key: 1 })) : createCommentVNode("", true),
                                    state === "inactive" ? (openBlock(), createBlock(unref(Dot), { key: 2 })) : createCommentVNode("", true)
                                  ]),
                                  _: 2
                                }, 1032, ["variant", "class", "disabled"])
                              ]),
                              _: 2
                            }, 1024),
                            createVNode("div", { class: "mt-5 flex flex-col items-center text-center" }, [
                              createVNode(_component_StepperTitle, {
                                class: [[state === "active" && "text-primary"], "text-sm font-semibold transition lg:text-base"]
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(step.title), 1)
                                ]),
                                _: 2
                              }, 1032, ["class"])
                            ])
                          ]),
                          _: 2
                        }, 1032, ["step"]);
                      }), 64))
                    ]),
                    createVNode("div", { class: "flex flex-col gap-4 mt-4" }, [
                      unref(stepIndex) === 1 ? (openBlock(), createBlock("h1", { key: 0 }, "Your information")) : createCommentVNode("", true),
                      unref(stepIndex) === 2 ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                        createVNode(unref(Field), { name: "fullName" }, {
                          default: withCtx(({ field }) => [
                            createVNode(_component_Input, mergeProps({ type: "text" }, field), null, 16)
                          ]),
                          _: 1
                        }),
                        createVNode(unref(Field), { name: "email" }, {
                          default: withCtx(({ field }) => [
                            createVNode(_component_Input, mergeProps({ type: "email " }, field), null, 16)
                          ]),
                          _: 1
                        })
                      ], 64)) : createCommentVNode("", true),
                      unref(stepIndex) === 3 ? (openBlock(), createBlock(Fragment, { key: 2 }, [
                        createVNode(unref(Field), { name: "password" }, {
                          default: withCtx(({ field }) => [
                            createVNode(_component_Input, mergeProps({ type: "password" }, field), null, 16)
                          ]),
                          _: 1
                        }),
                        createVNode(unref(Field), { name: "confirmPassword" }, {
                          default: withCtx(({ field }) => [
                            createVNode(_component_Input, mergeProps({ type: "password" }, field), null, 16)
                          ]),
                          _: 1
                        })
                      ], 64)) : createCommentVNode("", true),
                      unref(stepIndex) === 4 ? (openBlock(), createBlock(unref(Field), {
                        key: 3,
                        name: "favoriteDrink"
                      }, {
                        default: withCtx(({ field }) => [
                          createVNode(_component_Select, field, {
                            default: withCtx(() => [
                              createVNode(_component_SelectTrigger, null, {
                                default: withCtx(() => [
                                  createVNode(_component_SelectValue, { placeholder: "Select a drink" })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_SelectContent, null, {
                                default: withCtx(() => [
                                  createVNode(_component_SelectGroup, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_SelectItem, { value: "coffee" }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Coffee ")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_SelectItem, { value: "tea" }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Tea ")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_SelectItem, { value: "soda" }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Soda ")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 2
                          }, 1040)
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "flex items-center justify-between mt-4" }, [
                      createVNode(_component_Button, {
                        disabled: isPrevDisabled,
                        variant: "outline",
                        size: "sm",
                        onClick: ($event) => prevStep()
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Back ")
                        ]),
                        _: 2
                      }, 1032, ["disabled", "onClick"]),
                      createVNode("div", { class: "flex items-center gap-3" }, [
                        createVNode(_component_Button, {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => nextStep()
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Skip")
                          ]),
                          _: 2
                        }, 1032, ["onClick"]),
                        unref(stepIndex) !== steps.length ? (openBlock(), createBlock(_component_Button, {
                          key: 0,
                          type: meta.valid ? "button" : "submit",
                          disabled: isNextDisabled,
                          size: "sm",
                          onClick: ($event) => meta.valid && nextStep()
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Next ")
                          ]),
                          _: 2
                        }, 1032, ["type", "disabled", "onClick"])) : (openBlock(), createBlock(_component_Button, {
                          key: 1,
                          size: "sm",
                          type: "submit"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Submit ")
                          ]),
                          _: 1
                        }))
                      ])
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Stepper, {
                modelValue: unref(stepIndex),
                "onUpdate:modelValue": ($event) => isRef(stepIndex) ? stepIndex.value = $event : null,
                class: "block w-full"
              }, {
                default: withCtx(({ isNextDisabled, isPrevDisabled, nextStep, prevStep }) => [
                  createVNode("div", { class: "flex w-full flex-start gap-2" }, [
                    (openBlock(), createBlock(Fragment, null, renderList(steps, (step) => {
                      return createVNode(_component_StepperItem, {
                        key: step.step,
                        class: "relative flex w-full flex-col items-center justify-center",
                        step: step.step
                      }, {
                        default: withCtx(({ state }) => [
                          step.step !== steps[steps.length - 1].step ? (openBlock(), createBlock(_component_StepperSeparator, {
                            key: 0,
                            class: "absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
                          })) : createCommentVNode("", true),
                          createVNode(_component_StepperTrigger, { "as-child": "" }, {
                            default: withCtx(() => [
                              createVNode(_component_Button, {
                                variant: state === "completed" || state === "active" ? "default" : "outline",
                                size: "icon",
                                class: ["z-10 rounded-full shrink-0", [state === "active" && "ring-2 ring-ring ring-offset-2 ring-offset-background"]],
                                disabled: state !== "completed" && !meta.valid
                              }, {
                                default: withCtx(() => [
                                  state === "completed" ? (openBlock(), createBlock(unref(Check), {
                                    key: 0,
                                    class: "size-5"
                                  })) : createCommentVNode("", true),
                                  state === "active" ? (openBlock(), createBlock(unref(Circle), { key: 1 })) : createCommentVNode("", true),
                                  state === "inactive" ? (openBlock(), createBlock(unref(Dot), { key: 2 })) : createCommentVNode("", true)
                                ]),
                                _: 2
                              }, 1032, ["variant", "class", "disabled"])
                            ]),
                            _: 2
                          }, 1024),
                          createVNode("div", { class: "mt-5 flex flex-col items-center text-center" }, [
                            createVNode(_component_StepperTitle, {
                              class: [[state === "active" && "text-primary"], "text-sm font-semibold transition lg:text-base"]
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(step.title), 1)
                              ]),
                              _: 2
                            }, 1032, ["class"])
                          ])
                        ]),
                        _: 2
                      }, 1032, ["step"]);
                    }), 64))
                  ]),
                  createVNode("div", { class: "flex flex-col gap-4 mt-4" }, [
                    unref(stepIndex) === 1 ? (openBlock(), createBlock("h1", { key: 0 }, "Your information")) : createCommentVNode("", true),
                    unref(stepIndex) === 2 ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                      createVNode(unref(Field), { name: "fullName" }, {
                        default: withCtx(({ field }) => [
                          createVNode(_component_Input, mergeProps({ type: "text" }, field), null, 16)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Field), { name: "email" }, {
                        default: withCtx(({ field }) => [
                          createVNode(_component_Input, mergeProps({ type: "email " }, field), null, 16)
                        ]),
                        _: 1
                      })
                    ], 64)) : createCommentVNode("", true),
                    unref(stepIndex) === 3 ? (openBlock(), createBlock(Fragment, { key: 2 }, [
                      createVNode(unref(Field), { name: "password" }, {
                        default: withCtx(({ field }) => [
                          createVNode(_component_Input, mergeProps({ type: "password" }, field), null, 16)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Field), { name: "confirmPassword" }, {
                        default: withCtx(({ field }) => [
                          createVNode(_component_Input, mergeProps({ type: "password" }, field), null, 16)
                        ]),
                        _: 1
                      })
                    ], 64)) : createCommentVNode("", true),
                    unref(stepIndex) === 4 ? (openBlock(), createBlock(unref(Field), {
                      key: 3,
                      name: "favoriteDrink"
                    }, {
                      default: withCtx(({ field }) => [
                        createVNode(_component_Select, field, {
                          default: withCtx(() => [
                            createVNode(_component_SelectTrigger, null, {
                              default: withCtx(() => [
                                createVNode(_component_SelectValue, { placeholder: "Select a drink" })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_SelectContent, null, {
                              default: withCtx(() => [
                                createVNode(_component_SelectGroup, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_SelectItem, { value: "coffee" }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Coffee ")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_SelectItem, { value: "tea" }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Tea ")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_SelectItem, { value: "soda" }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Soda ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 2
                        }, 1040)
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "flex items-center justify-between mt-4" }, [
                    createVNode(_component_Button, {
                      disabled: isPrevDisabled,
                      variant: "outline",
                      size: "sm",
                      onClick: ($event) => prevStep()
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Back ")
                      ]),
                      _: 2
                    }, 1032, ["disabled", "onClick"]),
                    createVNode("div", { class: "flex items-center gap-3" }, [
                      createVNode(_component_Button, {
                        type: "button",
                        variant: "outline",
                        onClick: ($event) => nextStep()
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Skip")
                        ]),
                        _: 2
                      }, 1032, ["onClick"]),
                      unref(stepIndex) !== steps.length ? (openBlock(), createBlock(_component_Button, {
                        key: 0,
                        type: meta.valid ? "button" : "submit",
                        disabled: isNextDisabled,
                        size: "sm",
                        onClick: ($event) => meta.valid && nextStep()
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Next ")
                        ]),
                        _: 2
                      }, 1032, ["type", "disabled", "onClick"])) : (openBlock(), createBlock(_component_Button, {
                        key: 1,
                        size: "sm",
                        type: "submit"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Submit ")
                        ]),
                        _: 1
                      }))
                    ])
                  ])
                ]),
                _: 2
              }, 1032, ["modelValue", "onUpdate:modelValue"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(accounts)/getting_started.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=getting_started-DX7rGYPr.mjs.map
