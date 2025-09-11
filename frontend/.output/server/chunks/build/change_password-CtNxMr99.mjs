import { _ as _sfc_main$1 } from './Input-DM54l6M4.mjs';
import { _ as _sfc_main$2 } from './index-fXRoVOws.mjs';
import { defineComponent, unref, withCtx, mergeProps, createVNode, createBlock, createCommentVNode, createTextVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { KeyRound, Loader } from 'lucide-vue-next';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { b as userChangePasswordSchema } from './user.schema-DGWfCGO_.mjs';
import { b as useAuthStore } from './server.mjs';
import { u as useHead } from './v3-UNO0wT_2.mjs';
import { storeToRefs } from 'pinia';
import './index-DRYUbUIy.mjs';
import './index-BCNSwEbA.mjs';
import './helpers-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
import 'reka-ui';
import 'class-variance-authority';
import './authorization-NeTuVL6Y.mjs';
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
  __name: "change_password",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Change password"
    });
    const { changePassword } = useAuthStore();
    const { isLoading } = storeToRefs(useAuthStore());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Input = _sfc_main$1;
      const _component_Button = _sfc_main$2;
      _push(`<!--[--><div class="text-sm mb-4"><h1 class="text-black text-xl">Change password</h1><p>Update your password below to keep your account safe and secure.</p></div>`);
      _push(ssrRenderComponent(unref(Form), {
        "validation-schema": unref(userChangePasswordSchema),
        method: "post",
        onSubmit: unref(changePassword),
        class: "max-w-[420px] flex flex-col space-y-4 mx-auto"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Field), { name: "old_password" }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<label class="sr-only" for="lf__old_password"${_scopeId2}>Old_password</label><div class="flex gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(KeyRound), { class: "mt-3" }, null, _parent3, _scopeId2));
                  _push3(`<div class="flex-grow"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Input, mergeProps({ type: "password" }, field, {
                    placeholder: "Old password",
                    id: "lf__old_password",
                    autocomplete: "current-password"
                  }), null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "old_password" }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("label", {
                      class: "sr-only",
                      for: "lf__old_password"
                    }, "Old_password"),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode(unref(KeyRound), { class: "mt-3" }),
                      createVNode("div", { class: "flex-grow" }, [
                        createVNode(_component_Input, mergeProps({ type: "password" }, field, {
                          placeholder: "Old password",
                          id: "lf__old_password",
                          autocomplete: "current-password"
                        }), null, 16),
                        createVNode(unref(ErrorMessage), { name: "old_password" })
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Field), { name: "password" }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<label class="sr-only" for="lf__password"${_scopeId2}>Password</label><div class="flex gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(KeyRound), { class: "mt-3" }, null, _parent3, _scopeId2));
                  _push3(`<div class="flex-grow"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Input, mergeProps({ type: "password" }, field, {
                    placeholder: "Password",
                    id: "lf__password",
                    autocomplete: "current-password"
                  }), null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "password" }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("label", {
                      class: "sr-only",
                      for: "lf__password"
                    }, "Password"),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode(unref(KeyRound), { class: "mt-3" }),
                      createVNode("div", { class: "flex-grow" }, [
                        createVNode(_component_Input, mergeProps({ type: "password" }, field, {
                          placeholder: "Password",
                          id: "lf__password",
                          autocomplete: "current-password"
                        }), null, 16),
                        createVNode(unref(ErrorMessage), { name: "password" })
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Field), { name: "confirm_password" }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<label class="sr-only" for="lf__confirm_password"${_scopeId2}>Confirm Password</label><div class="flex gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(KeyRound), { class: "mt-3" }, null, _parent3, _scopeId2));
                  _push3(`<div class="flex-grow"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Input, mergeProps({ type: "password" }, field, {
                    placeholder: "Confirm password",
                    id: "lf__confirm_password",
                    autocomplete: "current-password"
                  }), null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "confirm_password" }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("label", {
                      class: "sr-only",
                      for: "lf__confirm_password"
                    }, "Confirm Password"),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode(unref(KeyRound), { class: "mt-3" }),
                      createVNode("div", { class: "flex-grow" }, [
                        createVNode(_component_Input, mergeProps({ type: "password" }, field, {
                          placeholder: "Confirm password",
                          id: "lf__confirm_password",
                          autocomplete: "current-password"
                        }), null, 16),
                        createVNode(unref(ErrorMessage), { name: "confirm_password" })
                      ])
                    ])
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
                    _push3(ssrRenderComponent(unref(Loader), { class: "animate-spin relative" }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(` Change password `);
                } else {
                  return [
                    unref(isLoading) ? (openBlock(), createBlock(unref(Loader), {
                      key: 0,
                      class: "animate-spin relative"
                    })) : createCommentVNode("", true),
                    createTextVNode(" Change password ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode(unref(Field), { name: "old_password" }, {
                default: withCtx(({ field }) => [
                  createVNode("label", {
                    class: "sr-only",
                    for: "lf__old_password"
                  }, "Old_password"),
                  createVNode("div", { class: "flex gap-2" }, [
                    createVNode(unref(KeyRound), { class: "mt-3" }),
                    createVNode("div", { class: "flex-grow" }, [
                      createVNode(_component_Input, mergeProps({ type: "password" }, field, {
                        placeholder: "Old password",
                        id: "lf__old_password",
                        autocomplete: "current-password"
                      }), null, 16),
                      createVNode(unref(ErrorMessage), { name: "old_password" })
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(unref(Field), { name: "password" }, {
                default: withCtx(({ field }) => [
                  createVNode("label", {
                    class: "sr-only",
                    for: "lf__password"
                  }, "Password"),
                  createVNode("div", { class: "flex gap-2" }, [
                    createVNode(unref(KeyRound), { class: "mt-3" }),
                    createVNode("div", { class: "flex-grow" }, [
                      createVNode(_component_Input, mergeProps({ type: "password" }, field, {
                        placeholder: "Password",
                        id: "lf__password",
                        autocomplete: "current-password"
                      }), null, 16),
                      createVNode(unref(ErrorMessage), { name: "password" })
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(unref(Field), { name: "confirm_password" }, {
                default: withCtx(({ field }) => [
                  createVNode("label", {
                    class: "sr-only",
                    for: "lf__confirm_password"
                  }, "Confirm Password"),
                  createVNode("div", { class: "flex gap-2" }, [
                    createVNode(unref(KeyRound), { class: "mt-3" }),
                    createVNode("div", { class: "flex-grow" }, [
                      createVNode(_component_Input, mergeProps({ type: "password" }, field, {
                        placeholder: "Confirm password",
                        id: "lf__confirm_password",
                        autocomplete: "current-password"
                      }), null, 16),
                      createVNode(unref(ErrorMessage), { name: "confirm_password" })
                    ])
                  ])
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
                    unref(isLoading) ? (openBlock(), createBlock(unref(Loader), {
                      key: 0,
                      class: "animate-spin relative"
                    })) : createCommentVNode("", true),
                    createTextVNode(" Change password ")
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/change_password.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=change_password-CtNxMr99.mjs.map
