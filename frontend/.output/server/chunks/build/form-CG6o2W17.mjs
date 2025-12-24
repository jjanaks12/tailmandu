import { _ as _sfc_main$1 } from './Input-Cs6c7Uzm.mjs';
import { _ as _sfc_main$2 } from './Label-CxpqotiU.mjs';
import { _ as _sfc_main$3 } from './index-Bv9pTvYc.mjs';
import { _ as _sfc_main$5 } from './DatePicker-BTvxZIGA.mjs';
import { _ as _sfc_main$6 } from './Textarea-myQCGZz3.mjs';
import { defineComponent, ref, watch, unref, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, createCommentVNode, Fragment, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { parseDate } from '@internationalized/date';
import { LinkIcon, LoaderIcon } from 'lucide-vue-next';
import moment from 'moment';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { s as slugify } from './humanize-Dt8EJGgI.mjs';
import { u as useEventStore, C as eventSchema } from './server.mjs';
import { storeToRefs } from 'pinia';
import { _ as _sfc_main$4 } from './Button-bc6lCA4h.mjs';
import './index-f52njE13.mjs';
import './index-3vNTMeQu.mjs';
import './helpers-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
import 'reka-ui';
import 'class-variance-authority';
import './index-Dniqw3Np.mjs';
import './SelectValue-B_oh3C4o.mjs';
import 'reka-ui/date';
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
import './authorization-DPJpR6G0.mjs';

let timer;
const debounce = (callback, timeout = 200) => {
  if (timer)
    clearTimeout(timer);
  timer = setTimeout(() => {
    callback();
  }, timeout);
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "form",
  __ssrInlineRender: true,
  props: {
    trailRace: {}
  },
  emits: ["update"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const { isLoading } = storeToRefs(useEventStore());
    const { save } = useEventStore();
    const emit = __emit;
    const form = ref();
    const updatedSlug = ref("");
    const updateSlug = () => {
      var _a, _b;
      updatedSlug.value = slugify((_b = (_a = form.value) == null ? void 0 : _a.values) == null ? void 0 : _b.title);
      setTimeout(() => {
        var _a2;
        (_a2 = form.value) == null ? void 0 : _a2.setFieldValue("slug", updatedSlug.value);
      }, 100);
    };
    const submitHandler = async (values) => {
      await save({
        ...values,
        start_date: values.start_date.toString(),
        end_date: values.end_date.toString()
      });
      emit("update");
    };
    const updateField = () => {
      var _a;
      if (props.trailRace) {
        (_a = form.value) == null ? void 0 : _a.setValues({
          id: props.trailRace.id,
          name: props.trailRace.name,
          slug: props.trailRace.slug,
          excerpt: props.trailRace.excerpt,
          start_date: parseDate(moment(props.trailRace.start).format("YYYY-MM-DD")),
          end_date: parseDate(moment(props.trailRace.end).format("YYYY-MM-DD"))
        });
      }
    };
    const handleTitleChange = () => {
      debounce(() => {
        var _a, _b, _c;
        updatedSlug.value = slugify((_b = (_a = form.value) == null ? void 0 : _a.values) == null ? void 0 : _b.name);
        (_c = form.value) == null ? void 0 : _c.setFieldValue("slug", updatedSlug.value);
      });
    };
    watch(() => props.trailRace, () => {
      updateField();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Input = _sfc_main$1;
      const _component_Label = _sfc_main$2;
      const _component_Badge = _sfc_main$3;
      const _component_Button = _sfc_main$4;
      const _component_DatePicker = _sfc_main$5;
      const _component_Textarea = _sfc_main$6;
      _push(ssrRenderComponent(unref(Form), mergeProps({
        "validation-schema": unref(eventSchema),
        class: "flex flex-col gap-5",
        onSubmit: submitHandler,
        ref_key: "form",
        ref: form
      }, _attrs), {
        default: withCtx(({ values }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Field), { name: "id" }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Input, mergeProps({ type: "hidden" }, field), null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Input, mergeProps({ type: "hidden" }, field), null, 16)
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Field), {
              name: "name",
              as: "div",
              class: "flex flex-col gap-2"
            }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Label, { for: "ef__name" }, {
                    default: withCtx((_, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Event name`);
                      } else {
                        return [
                          createTextVNode("Event name")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Input, mergeProps({ type: "text" }, field, {
                    id: "ef__name",
                    onInput: handleTitleChange
                  }), null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "name" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Label, { for: "ef__name" }, {
                      default: withCtx(() => [
                        createTextVNode("Event name")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Input, mergeProps({ type: "text" }, field, {
                      id: "ef__name",
                      onInput: handleTitleChange
                    }), null, 16),
                    createVNode(unref(ErrorMessage), { name: "name" })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Field), {
              as: "div",
              name: "slug",
              class: "flex flex-col gap-2"
            }, {
              default: withCtx(({ field, value }, _push3, _parent3, _scopeId2) => {
                var _a, _b;
                if (_push3) {
                  if (unref(updatedSlug) && unref(updatedSlug) == ((_a = __props.trailRace) == null ? void 0 : _a.slug)) {
                    _push3(`<div class="flex"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_Badge, null, {
                      default: withCtx((_, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(unref(updatedSlug))}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(unref(updatedSlug)), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    if (unref(updatedSlug) != value) {
                      _push3(ssrRenderComponent(_component_Button, {
                        type: "button",
                        variant: "link",
                        size: "sm",
                        onClick: updateSlug
                      }, {
                        default: withCtx((_, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(LinkIcon), null, null, _parent4, _scopeId3));
                            _push4(` update URL `);
                          } else {
                            return [
                              createVNode(unref(LinkIcon)),
                              createTextVNode(" update URL ")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                  } else {
                    _push3(`<!--[-->`);
                    _push3(ssrRenderComponent(_component_Label, { for: "ef__slug" }, {
                      default: withCtx((_, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Slug`);
                        } else {
                          return [
                            createTextVNode("Slug")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Input, mergeProps({ type: "text" }, field, { id: "ef__slug" }), null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(ErrorMessage), { name: "slug" }, null, _parent3, _scopeId2));
                    _push3(`<!--]-->`);
                  }
                } else {
                  return [
                    unref(updatedSlug) && unref(updatedSlug) == ((_b = __props.trailRace) == null ? void 0 : _b.slug) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex"
                    }, [
                      createVNode(_component_Badge, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(updatedSlug)), 1)
                        ]),
                        _: 1
                      }),
                      unref(updatedSlug) != value ? (openBlock(), createBlock(_component_Button, {
                        key: 0,
                        type: "button",
                        variant: "link",
                        size: "sm",
                        onClick: updateSlug
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(LinkIcon)),
                          createTextVNode(" update URL ")
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                      createVNode(_component_Label, { for: "ef__slug" }, {
                        default: withCtx(() => [
                          createTextVNode("Slug")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Input, mergeProps({ type: "text" }, field, { id: "ef__slug" }), null, 16),
                      createVNode(unref(ErrorMessage), { name: "slug" })
                    ], 64))
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`<div class="flex gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "start_date",
              as: "div",
              class: "w-1/2 flex flex-col gap-2"
            }, {
              default: withCtx(({ handleInput, value }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Label, { for: "ef__start_date" }, {
                    default: withCtx((_, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Start Date`);
                      } else {
                        return [
                          createTextVNode("Start Date")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_DatePicker, {
                    label: "Start date",
                    "onUpdate:modelValue": handleInput,
                    "model-value": value
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "start_date" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Label, { for: "ef__start_date" }, {
                      default: withCtx(() => [
                        createTextVNode("Start Date")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_DatePicker, {
                      label: "Start date",
                      "onUpdate:modelValue": handleInput,
                      "model-value": value
                    }, null, 8, ["onUpdate:modelValue", "model-value"]),
                    createVNode(unref(ErrorMessage), { name: "start_date" })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Field), {
              name: "end_date",
              as: "div",
              class: "w-1/2 flex flex-col gap-2"
            }, {
              default: withCtx(({ handleInput, value }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Label, { for: "ef__end_date" }, {
                    default: withCtx((_, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`End Date`);
                      } else {
                        return [
                          createTextVNode("End Date")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_DatePicker, {
                    label: "End date",
                    "onUpdate:modelValue": handleInput,
                    "model-value": value,
                    "min-value": values.start_date
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "end_date" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Label, { for: "ef__end_date" }, {
                      default: withCtx(() => [
                        createTextVNode("End Date")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_DatePicker, {
                      label: "End date",
                      "onUpdate:modelValue": handleInput,
                      "model-value": value,
                      "min-value": values.start_date
                    }, null, 8, ["onUpdate:modelValue", "model-value", "min-value"]),
                    createVNode(unref(ErrorMessage), { name: "end_date" })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "excerpt",
              as: "div",
              class: "flex flex-col gap-2"
            }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Label, { for: "ef__excerpt" }, {
                    default: withCtx((_, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Event short description`);
                      } else {
                        return [
                          createTextVNode("Event short description")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Textarea, mergeProps({ type: "text" }, field, { id: "ef__excerpt" }), null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "excerpt" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Label, { for: "ef__excerpt" }, {
                      default: withCtx(() => [
                        createTextVNode("Event short description")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Textarea, mergeProps({ type: "text" }, field, { id: "ef__excerpt" }), null, 16),
                    createVNode(unref(ErrorMessage), { name: "excerpt" })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`<div class="text-right"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Button, {
              variant: "secondary",
              type: "submit",
              class: "w-[180px]",
              disabled: unref(isLoading)
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(isLoading)) {
                    _push3(ssrRenderComponent(unref(LoaderIcon), { class: "animate-spin relative" }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(` Update details `);
                } else {
                  return [
                    unref(isLoading) ? (openBlock(), createBlock(unref(LoaderIcon), {
                      key: 0,
                      class: "animate-spin relative"
                    })) : createCommentVNode("", true),
                    createTextVNode(" Update details ")
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode(unref(Field), { name: "id" }, {
                default: withCtx(({ field }) => [
                  createVNode(_component_Input, mergeProps({ type: "hidden" }, field), null, 16)
                ]),
                _: 1
              }),
              createVNode(unref(Field), {
                name: "name",
                as: "div",
                class: "flex flex-col gap-2"
              }, {
                default: withCtx(({ field }) => [
                  createVNode(_component_Label, { for: "ef__name" }, {
                    default: withCtx(() => [
                      createTextVNode("Event name")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Input, mergeProps({ type: "text" }, field, {
                    id: "ef__name",
                    onInput: handleTitleChange
                  }), null, 16),
                  createVNode(unref(ErrorMessage), { name: "name" })
                ]),
                _: 1
              }),
              createVNode(unref(Field), {
                as: "div",
                name: "slug",
                class: "flex flex-col gap-2"
              }, {
                default: withCtx(({ field, value }) => {
                  var _a;
                  return [
                    unref(updatedSlug) && unref(updatedSlug) == ((_a = __props.trailRace) == null ? void 0 : _a.slug) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex"
                    }, [
                      createVNode(_component_Badge, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(updatedSlug)), 1)
                        ]),
                        _: 1
                      }),
                      unref(updatedSlug) != value ? (openBlock(), createBlock(_component_Button, {
                        key: 0,
                        type: "button",
                        variant: "link",
                        size: "sm",
                        onClick: updateSlug
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(LinkIcon)),
                          createTextVNode(" update URL ")
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                      createVNode(_component_Label, { for: "ef__slug" }, {
                        default: withCtx(() => [
                          createTextVNode("Slug")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Input, mergeProps({ type: "text" }, field, { id: "ef__slug" }), null, 16),
                      createVNode(unref(ErrorMessage), { name: "slug" })
                    ], 64))
                  ];
                }),
                _: 1
              }),
              createVNode("div", { class: "flex gap-3" }, [
                createVNode(unref(Field), {
                  name: "start_date",
                  as: "div",
                  class: "w-1/2 flex flex-col gap-2"
                }, {
                  default: withCtx(({ handleInput, value }) => [
                    createVNode(_component_Label, { for: "ef__start_date" }, {
                      default: withCtx(() => [
                        createTextVNode("Start Date")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_DatePicker, {
                      label: "Start date",
                      "onUpdate:modelValue": handleInput,
                      "model-value": value
                    }, null, 8, ["onUpdate:modelValue", "model-value"]),
                    createVNode(unref(ErrorMessage), { name: "start_date" })
                  ]),
                  _: 1
                }),
                createVNode(unref(Field), {
                  name: "end_date",
                  as: "div",
                  class: "w-1/2 flex flex-col gap-2"
                }, {
                  default: withCtx(({ handleInput, value }) => [
                    createVNode(_component_Label, { for: "ef__end_date" }, {
                      default: withCtx(() => [
                        createTextVNode("End Date")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_DatePicker, {
                      label: "End date",
                      "onUpdate:modelValue": handleInput,
                      "model-value": value,
                      "min-value": values.start_date
                    }, null, 8, ["onUpdate:modelValue", "model-value", "min-value"]),
                    createVNode(unref(ErrorMessage), { name: "end_date" })
                  ]),
                  _: 2
                }, 1024)
              ]),
              createVNode(unref(Field), {
                name: "excerpt",
                as: "div",
                class: "flex flex-col gap-2"
              }, {
                default: withCtx(({ field }) => [
                  createVNode(_component_Label, { for: "ef__excerpt" }, {
                    default: withCtx(() => [
                      createTextVNode("Event short description")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Textarea, mergeProps({ type: "text" }, field, { id: "ef__excerpt" }), null, 16),
                  createVNode(unref(ErrorMessage), { name: "excerpt" })
                ]),
                _: 1
              }),
              createVNode("div", { class: "text-right" }, [
                createVNode(_component_Button, {
                  variant: "secondary",
                  type: "submit",
                  class: "w-[180px]",
                  disabled: unref(isLoading)
                }, {
                  default: withCtx(() => [
                    unref(isLoading) ? (openBlock(), createBlock(unref(LoaderIcon), {
                      key: 0,
                      class: "animate-spin relative"
                    })) : createCommentVNode("", true),
                    createTextVNode(" Update details ")
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/events/form.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=form-CG6o2W17.mjs.map
