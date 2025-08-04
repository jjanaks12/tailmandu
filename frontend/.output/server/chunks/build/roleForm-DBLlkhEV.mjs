import { _ as _sfc_main$6, a as _sfc_main$1, b as _sfc_main$2, c as _sfc_main$5, d as _sfc_main$4 } from './SelectValue-L58LLnds.mjs';
import { _ as _sfc_main$3 } from './index-C1GnAqFM.mjs';
import { defineComponent, ref, watchEffect, unref, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { LoaderIcon } from 'lucide-vue-next';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { a as assignRoleSchema } from './role.schema-Dy0VrPka.mjs';
import { c as useRoleStore } from './server.mjs';
import { storeToRefs } from 'pinia';
import 'reka-ui';
import './virtual_nuxt__Users_janakshrestha_Documents_2025_05_May_trailmandu_frontend_.nuxt_shadcn-nuxt_utils-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
import './index-LYqOXnlG.mjs';
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
  __name: "roleForm",
  __ssrInlineRender: true,
  props: {
    user: {}
  },
  emits: ["update"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const form = ref();
    const emit = __emit;
    const { assignUserRole } = useRoleStore();
    const { roles } = storeToRefs(useRoleStore());
    const isLoading = ref(false);
    const formSubmit = async (values) => {
      isLoading.value = true;
      console.log(values);
      await assignUserRole(values);
      isLoading.value = false;
      emit("update");
    };
    watchEffect(() => {
      var _a, _b, _c;
      if (form.value) {
        form.value.setValues({
          user_id: (_a = props.user) == null ? void 0 : _a.id,
          role_id: (_c = (_b = props.user) == null ? void 0 : _b.role) == null ? void 0 : _c.id
        });
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Select = _sfc_main$6;
      const _component_SelectTrigger = _sfc_main$1;
      const _component_SelectValue = _sfc_main$2;
      const _component_SelectContent = _sfc_main$5;
      const _component_SelectItem = _sfc_main$4;
      const _component_Button = _sfc_main$3;
      _push(ssrRenderComponent(unref(Form), mergeProps({
        "validation-schema": unref(assignRoleSchema),
        onSubmit: formSubmit,
        class: "flex flex-col gap-4",
        ref_key: "form",
        ref: form
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Field), {
              type: "hidden",
              name: "user_id",
              value: (_a = _ctx.user) == null ? void 0 : _a.id
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Field), { name: "role_id" }, {
              default: withCtx(({ handleChange }, _push3, _parent3, _scopeId2) => {
                var _a2, _b2, _c, _d;
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Select, {
                    "onUpdate:modelValue": handleChange,
                    "default-value": (_b2 = (_a2 = _ctx.user) == null ? void 0 : _a2.role) == null ? void 0 : _b2.id
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_SelectTrigger, null, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_SelectValue, { placeholder: "Change role" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_SelectValue, { placeholder: "Change role" })
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_SelectContent, null, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(unref(roles), (role) => {
                                _push5(ssrRenderComponent(_component_SelectItem, {
                                  value: role.id
                                }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(role.name)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(role.name), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(roles), (role) => {
                                  return openBlock(), createBlock(_component_SelectItem, {
                                    value: role.id
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(role.name), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 256))
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_SelectTrigger, null, {
                            default: withCtx(() => [
                              createVNode(_component_SelectValue, { placeholder: "Change role" })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_SelectContent, null, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(roles), (role) => {
                                return openBlock(), createBlock(_component_SelectItem, {
                                  value: role.id
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(role.name), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["value"]);
                              }), 256))
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "role_id" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Select, {
                      "onUpdate:modelValue": handleChange,
                      "default-value": (_d = (_c = _ctx.user) == null ? void 0 : _c.role) == null ? void 0 : _d.id
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_SelectTrigger, null, {
                          default: withCtx(() => [
                            createVNode(_component_SelectValue, { placeholder: "Change role" })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_SelectContent, null, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(roles), (role) => {
                              return openBlock(), createBlock(_component_SelectItem, {
                                value: role.id
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(role.name), 1)
                                ]),
                                _: 2
                              }, 1032, ["value"]);
                            }), 256))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 2
                    }, 1032, ["onUpdate:modelValue", "default-value"]),
                    createVNode(unref(ErrorMessage), { name: "role_id" })
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
                type: "hidden",
                name: "user_id",
                value: (_b = _ctx.user) == null ? void 0 : _b.id
              }, null, 8, ["value"]),
              createVNode(unref(Field), { name: "role_id" }, {
                default: withCtx(({ handleChange }) => {
                  var _a2, _b2;
                  return [
                    createVNode(_component_Select, {
                      "onUpdate:modelValue": handleChange,
                      "default-value": (_b2 = (_a2 = _ctx.user) == null ? void 0 : _a2.role) == null ? void 0 : _b2.id
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_SelectTrigger, null, {
                          default: withCtx(() => [
                            createVNode(_component_SelectValue, { placeholder: "Change role" })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_SelectContent, null, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(roles), (role) => {
                              return openBlock(), createBlock(_component_SelectItem, {
                                value: role.id
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(role.name), 1)
                                ]),
                                _: 2
                              }, 1032, ["value"]);
                            }), 256))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 2
                    }, 1032, ["onUpdate:modelValue", "default-value"]),
                    createVNode(unref(ErrorMessage), { name: "role_id" })
                  ];
                }),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/users/_components/roleForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=roleForm-DBLlkhEV.mjs.map
