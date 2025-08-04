import { _ as _sfc_main$1, a as _sfc_main$3 } from './Textarea-BBwOHM7r.mjs';
import { _ as _sfc_main$2 } from './Input-D7-VbNDD.mjs';
import { _ as _sfc_main$4 } from './Checkbox-BGbB4eec.mjs';
import { _ as _sfc_main$5 } from './index-C1GnAqFM.mjs';
import { defineComponent, ref, unref, mergeProps, withCtx, createTextVNode, createVNode, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { LoaderIcon } from 'lucide-vue-next';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { h as humanize } from './humanize-jq14WXGJ.mjs';
import { r as roleSchema } from './role.schema-Dy0VrPka.mjs';
import { b as usePermissionStore, c as useRoleStore } from './server.mjs';
import { storeToRefs } from 'pinia';
import 'reka-ui';
import './virtual_nuxt__Users_janakshrestha_Documents_2025_05_May_trailmandu_frontend_.nuxt_shadcn-nuxt_utils-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
import './index-LYqOXnlG.mjs';
import './index-PQOYgYe9.mjs';
import 'class-variance-authority';
import 'yup';
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
import 'axios';
import 'vue-sonner';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "form",
  __ssrInlineRender: true,
  props: {
    role: {}
  },
  emits: ["update"],
  setup(__props, { emit: __emit }) {
    const { permissions } = storeToRefs(usePermissionStore());
    const { save } = useRoleStore();
    const emit = __emit;
    const form = ref();
    const isLoading = ref(false);
    const formSubmit = (values) => {
      isLoading.value = true;
      save(values);
      isLoading.value = false;
      emit("update");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Label = _sfc_main$1;
      const _component_Input = _sfc_main$2;
      const _component_Textarea = _sfc_main$3;
      const _component_Checkbox = _sfc_main$4;
      const _component_Button = _sfc_main$5;
      _push(ssrRenderComponent(unref(Form), mergeProps({
        "validation-schema": unref(roleSchema),
        onSubmit: formSubmit,
        class: "flex flex-col gap-4",
        ref_key: "form",
        ref: form
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Field), {
              name: "name",
              as: "div",
              class: "flex flex-col gap-2"
            }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Label, { for: "rf__name" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Role name`);
                      } else {
                        return [
                          createTextVNode("Role name")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(`<div class="flex gap-2"${_scopeId2}><div class="flex-grow"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Input, mergeProps({ type: "text" }, field, {
                    placeholder: "Name",
                    id: "rf__name"
                  }), null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "name" }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode(_component_Label, { for: "rf__name" }, {
                      default: withCtx(() => [
                        createTextVNode("Role name")
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode("div", { class: "flex-grow" }, [
                        createVNode(_component_Input, mergeProps({ type: "text" }, field, {
                          placeholder: "Name",
                          id: "rf__name"
                        }), null, 16),
                        createVNode(unref(ErrorMessage), { name: "name" })
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Field), {
              name: "description",
              as: "div",
              class: "flex flex-col gap-2"
            }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Label, { for: "rf__description" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Role description`);
                      } else {
                        return [
                          createTextVNode("Role description")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(`<div class="flex gap-2"${_scopeId2}><div class="flex-grow"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Textarea, mergeProps({ type: "text" }, field, {
                    placeholder: "Description",
                    id: "rf__description"
                  }), null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "description" }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode(_component_Label, { for: "rf__description" }, {
                      default: withCtx(() => [
                        createTextVNode("Role description")
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode("div", { class: "flex-grow" }, [
                        createVNode(_component_Textarea, mergeProps({ type: "text" }, field, {
                          placeholder: "Description",
                          id: "rf__description"
                        }), null, 16),
                        createVNode(unref(ErrorMessage), { name: "description" })
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="flex flex-wrap gap-4"${_scopeId}><!--[-->`);
            ssrRenderList(unref(permissions), (permission) => {
              _push2(ssrRenderComponent(unref(Field), {
                as: "div",
                type: "checkbox",
                name: "permissions",
                value: permission.id,
                class: "flex gap-2"
              }, {
                default: withCtx(({ handleChange, value }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Checkbox, {
                      "onUpdate:modelValue": handleChange,
                      id: permission.id,
                      "model-value": value == null ? void 0 : value.includes(permission.id)
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Label, {
                      for: permission.id
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(unref(humanize)(permission.name))}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(unref(humanize)(permission.name)), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_Checkbox, {
                        "onUpdate:modelValue": handleChange,
                        id: permission.id,
                        "model-value": value == null ? void 0 : value.includes(permission.id)
                      }, null, 8, ["onUpdate:modelValue", "id", "model-value"]),
                      createVNode(_component_Label, {
                        for: permission.id
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(humanize)(permission.name)), 1)
                        ]),
                        _: 2
                      }, 1032, ["for"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
            _push2(ssrRenderComponent(unref(ErrorMessage), { name: "permissions" }, null, _parent2, _scopeId));
            _push2(`</div><div class="text-right"${_scopeId}>`);
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
                as: "div",
                class: "flex flex-col gap-2"
              }, {
                default: withCtx(({ field }) => [
                  createVNode(_component_Label, { for: "rf__name" }, {
                    default: withCtx(() => [
                      createTextVNode("Role name")
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "flex gap-2" }, [
                    createVNode("div", { class: "flex-grow" }, [
                      createVNode(_component_Input, mergeProps({ type: "text" }, field, {
                        placeholder: "Name",
                        id: "rf__name"
                      }), null, 16),
                      createVNode(unref(ErrorMessage), { name: "name" })
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(unref(Field), {
                name: "description",
                as: "div",
                class: "flex flex-col gap-2"
              }, {
                default: withCtx(({ field }) => [
                  createVNode(_component_Label, { for: "rf__description" }, {
                    default: withCtx(() => [
                      createTextVNode("Role description")
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "flex gap-2" }, [
                    createVNode("div", { class: "flex-grow" }, [
                      createVNode(_component_Textarea, mergeProps({ type: "text" }, field, {
                        placeholder: "Description",
                        id: "rf__description"
                      }), null, 16),
                      createVNode(unref(ErrorMessage), { name: "description" })
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("div", { class: "flex flex-wrap gap-4" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(permissions), (permission) => {
                  return openBlock(), createBlock(unref(Field), {
                    as: "div",
                    type: "checkbox",
                    name: "permissions",
                    value: permission.id,
                    class: "flex gap-2"
                  }, {
                    default: withCtx(({ handleChange, value }) => [
                      createVNode(_component_Checkbox, {
                        "onUpdate:modelValue": handleChange,
                        id: permission.id,
                        "model-value": value == null ? void 0 : value.includes(permission.id)
                      }, null, 8, ["onUpdate:modelValue", "id", "model-value"]),
                      createVNode(_component_Label, {
                        for: permission.id
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(humanize)(permission.name)), 1)
                        ]),
                        _: 2
                      }, 1032, ["for"])
                    ]),
                    _: 2
                  }, 1032, ["value"]);
                }), 256)),
                createVNode(unref(ErrorMessage), { name: "permissions" })
              ]),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/roles/_components/form.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=form-Dk3dkazD.mjs.map
