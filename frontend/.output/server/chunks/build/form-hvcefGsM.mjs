import { _ as _sfc_main$1, a as _sfc_main$4 } from './Textarea-BBwOHM7r.mjs';
import { _ as _sfc_main$2 } from './Input-D7-VbNDD.mjs';
import { _ as _sfc_main$3 } from './DatePicker-BoO5mdIx.mjs';
import { _ as _sfc_main$5 } from './index-C1GnAqFM.mjs';
import { defineComponent, ref, unref, mergeProps, withCtx, createTextVNode, createVNode, createBlock, createCommentVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { LoaderIcon } from 'lucide-vue-next';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Y from 'yup';
import { storeToRefs, defineStore } from 'pinia';
import 'reka-ui';
import './virtual_nuxt__Users_janakshrestha_Documents_2025_05_May_trailmandu_frontend_.nuxt_shadcn-nuxt_utils-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
import './index-LYqOXnlG.mjs';
import './index-PQOYgYe9.mjs';
import './SelectValue-L58LLnds.mjs';
import '@internationalized/date';
import 'reka-ui/date';
import 'class-variance-authority';

const eventSchema = Y.object({
  name: Y.string().required().label("Name"),
  start_date: Y.string().required().label("Start date"),
  end_date: Y.string().required().label("End date"),
  description: Y.string().required().label("Description")
});
const useEventStore = defineStore("event", () => {
  const isLoading = ref();
  return { isLoading };
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "form",
  __ssrInlineRender: true,
  setup(__props) {
    const { isLoading } = storeToRefs(useEventStore());
    const startDate = ref();
    const endDate = ref();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Label = _sfc_main$1;
      const _component_Input = _sfc_main$2;
      const _component_DatePicker = _sfc_main$3;
      const _component_Textarea = _sfc_main$4;
      const _component_Button = _sfc_main$5;
      _push(ssrRenderComponent(unref(Form), mergeProps({
        "validation-schema": unref(eventSchema),
        class: "flex flex-col gap-3"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Field), {
              name: "name",
              as: "div"
            }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Label, { for: "ef__name" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
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
                  _push3(ssrRenderComponent(_component_Input, mergeProps({ type: "text" }, field, { id: "ef__name" }), null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "name" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Label, { for: "ef__name" }, {
                      default: withCtx(() => [
                        createTextVNode("Event name")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Input, mergeProps({ type: "text" }, field, { id: "ef__name" }), null, 16),
                    createVNode(unref(ErrorMessage), { name: "name" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="flex gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "start_date",
              as: "div",
              class: "w-1/2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Label, { for: "ef__start_date" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Start Date`);
                      } else {
                        return [
                          createTextVNode("Start Date")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_DatePicker, {
                    label: "Date of Birth",
                    "model-value": unref(startDate),
                    "onUpdate:modelValue": (sd) => startDate.value = sd
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
                      label: "Date of Birth",
                      "model-value": unref(startDate),
                      "onUpdate:modelValue": (sd) => startDate.value = sd
                    }, null, 8, ["model-value", "onUpdate:modelValue"]),
                    createVNode(unref(ErrorMessage), { name: "start_date" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Field), {
              name: "end_date",
              as: "div",
              class: "w-1/2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Label, { for: "ef__end_date" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`End Date`);
                      } else {
                        return [
                          createTextVNode("End Date")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_DatePicker, {
                    label: "Date of Birth",
                    "model-value": unref(endDate),
                    "onUpdate:modelValue": (sd) => endDate.value = sd,
                    "min-value": unref(startDate)
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
                      label: "Date of Birth",
                      "model-value": unref(endDate),
                      "onUpdate:modelValue": (sd) => endDate.value = sd,
                      "min-value": unref(startDate)
                    }, null, 8, ["model-value", "onUpdate:modelValue", "min-value"]),
                    createVNode(unref(ErrorMessage), { name: "end_date" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(Field), { name: "description" }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Label, { for: "ef__description" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Description`);
                      } else {
                        return [
                          createTextVNode("Description")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Textarea, mergeProps(field, {
                    placeholder: "Description",
                    id: "ef__description"
                  }), null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "description" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Label, { for: "ef__description" }, {
                      default: withCtx(() => [
                        createTextVNode("Description")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Textarea, mergeProps(field, {
                      placeholder: "Description",
                      id: "ef__description"
                    }), null, 16),
                    createVNode(unref(ErrorMessage), { name: "description" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="text-right"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Button, {
              variant: "secondary",
              type: "submit",
              class: "w-[180px]",
              disabled: unref(isLoading)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
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
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode(unref(Field), {
                name: "name",
                as: "div"
              }, {
                default: withCtx(({ field }) => [
                  createVNode(_component_Label, { for: "ef__name" }, {
                    default: withCtx(() => [
                      createTextVNode("Event name")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Input, mergeProps({ type: "text" }, field, { id: "ef__name" }), null, 16),
                  createVNode(unref(ErrorMessage), { name: "name" })
                ]),
                _: 1
              }),
              createVNode("div", { class: "flex gap-3" }, [
                createVNode(unref(Field), {
                  name: "start_date",
                  as: "div",
                  class: "w-1/2"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_Label, { for: "ef__start_date" }, {
                      default: withCtx(() => [
                        createTextVNode("Start Date")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_DatePicker, {
                      label: "Date of Birth",
                      "model-value": unref(startDate),
                      "onUpdate:modelValue": (sd) => startDate.value = sd
                    }, null, 8, ["model-value", "onUpdate:modelValue"]),
                    createVNode(unref(ErrorMessage), { name: "start_date" })
                  ]),
                  _: 1
                }),
                createVNode(unref(Field), {
                  name: "end_date",
                  as: "div",
                  class: "w-1/2"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_Label, { for: "ef__end_date" }, {
                      default: withCtx(() => [
                        createTextVNode("End Date")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_DatePicker, {
                      label: "Date of Birth",
                      "model-value": unref(endDate),
                      "onUpdate:modelValue": (sd) => endDate.value = sd,
                      "min-value": unref(startDate)
                    }, null, 8, ["model-value", "onUpdate:modelValue", "min-value"]),
                    createVNode(unref(ErrorMessage), { name: "end_date" })
                  ]),
                  _: 1
                })
              ]),
              createVNode(unref(Field), { name: "description" }, {
                default: withCtx(({ field }) => [
                  createVNode(_component_Label, { for: "ef__description" }, {
                    default: withCtx(() => [
                      createTextVNode("Description")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Textarea, mergeProps(field, {
                    placeholder: "Description",
                    id: "ef__description"
                  }), null, 16),
                  createVNode(unref(ErrorMessage), { name: "description" })
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
//# sourceMappingURL=form-hvcefGsM.mjs.map
