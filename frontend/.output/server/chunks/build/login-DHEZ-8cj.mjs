import { _ as _sfc_main$1 } from './brand-VuBHSClX.mjs';
import { _ as _sfc_main$2 } from './Input-0Aij7Ii7.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-C7aJpepl.mjs';
import { _ as _sfc_main$3 } from './Checkbox-CgBomrhm.mjs';
import { _ as _sfc_main$4 } from './index-CS0YxOVg.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { User, KeyRound, Loader } from 'lucide-vue-next';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { u as userLoginSchema } from './user.schema-DGWfCGO_.mjs';
import { a as useRoute, b as useAuthStore } from './server.mjs';
import { u as useHead } from './v3-UNO0wT_2.mjs';
import { storeToRefs } from 'pinia';
import './index-DRYUbUIy.mjs';
import './index-BCNSwEbA.mjs';
import './utils-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
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
import 'class-variance-authority';
import './authorization-NeTuVL6Y.mjs';
import 'yup';
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
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Login"
    });
    const route = useRoute();
    const { login } = useAuthStore();
    const { isLoggedin, isLoading } = storeToRefs(useAuthStore());
    const form = ref();
    const signIn = async (formData) => {
      await login(formData, route.query.redirect_from);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Brand = _sfc_main$1;
      const _component_Input = _sfc_main$2;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Checkbox = _sfc_main$3;
      const _component_Button = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white w-full max-w-[480px] p-8 rounded-lg" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Brand, { class: "w-[220px] text-center mx-auto mb-12" }, null, _parent));
      _push(`<div class="text-sm mb-4"><h1 class="text-black text-xl">Welcome back</h1><p>Access your account securely \u2013 please enter your login details.</p></div>`);
      _push(ssrRenderComponent(unref(Form), {
        "validation-schema": unref(userLoginSchema),
        method: "post",
        onSubmit: signIn,
        class: "flex flex-col space-y-4",
        ref_key: "form",
        ref: form
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Field), { name: "email" }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<label class="sr-only" for="lf__email"${_scopeId2}>Email</label><div class="flex gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(User), { class: "mt-3" }, null, _parent3, _scopeId2));
                  _push3(`<div class="flex-grow"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Input, mergeProps(field, {
                    placeholder: "Email",
                    id: "lf__email",
                    autocomplete: "email"
                  }), null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "email" }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("label", {
                      class: "sr-only",
                      for: "lf__email"
                    }, "Email"),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode(unref(User), { class: "mt-3" }),
                      createVNode("div", { class: "flex-grow" }, [
                        createVNode(_component_Input, mergeProps(field, {
                          placeholder: "Email",
                          id: "lf__email",
                          autocomplete: "email"
                        }), null, 16),
                        createVNode(unref(ErrorMessage), { name: "email" })
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
            _push2(`<div class="text-right"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/forget_password",
              class: "text-sm text-primary"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`forget password?`);
                } else {
                  return [
                    createTextVNode("forget password?")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Field), { name: "remember_me" }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Checkbox, mergeProps(field, {
                    id: "lf__remember_me",
                    class: "mr-2",
                    value: true
                  }), null, _parent3, _scopeId2));
                  _push3(`<label for="lf__remember_me"${_scopeId2}>remember me?</label>`);
                } else {
                  return [
                    createVNode(_component_Checkbox, mergeProps(field, {
                      id: "lf__remember_me",
                      class: "mr-2",
                      value: true
                    }), null, 16),
                    createVNode("label", { for: "lf__remember_me" }, "remember me?")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="text-right"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Button, {
              type: "submit",
              class: "w-[120px]",
              disabled: unref(isLoading)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(isLoading)) {
                    _push3(ssrRenderComponent(unref(Loader), { class: "animate-spin relative" }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(` Login `);
                } else {
                  return [
                    unref(isLoading) ? (openBlock(), createBlock(unref(Loader), {
                      key: 0,
                      class: "animate-spin relative"
                    })) : createCommentVNode("", true),
                    createTextVNode(" Login ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="text-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/register",
              class: "text-primary text-sm underline"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Do not have an account?`);
                } else {
                  return [
                    createTextVNode("Do not have an account?")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode(unref(Field), { name: "email" }, {
                default: withCtx(({ field }) => [
                  createVNode("label", {
                    class: "sr-only",
                    for: "lf__email"
                  }, "Email"),
                  createVNode("div", { class: "flex gap-2" }, [
                    createVNode(unref(User), { class: "mt-3" }),
                    createVNode("div", { class: "flex-grow" }, [
                      createVNode(_component_Input, mergeProps(field, {
                        placeholder: "Email",
                        id: "lf__email",
                        autocomplete: "email"
                      }), null, 16),
                      createVNode(unref(ErrorMessage), { name: "email" })
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
              createVNode("div", { class: "text-right" }, [
                createVNode(_component_NuxtLink, {
                  to: "/forget_password",
                  class: "text-sm text-primary"
                }, {
                  default: withCtx(() => [
                    createTextVNode("forget password?")
                  ]),
                  _: 1
                })
              ]),
              createVNode("div", null, [
                createVNode(unref(Field), { name: "remember_me" }, {
                  default: withCtx(({ field }) => [
                    createVNode(_component_Checkbox, mergeProps(field, {
                      id: "lf__remember_me",
                      class: "mr-2",
                      value: true
                    }), null, 16),
                    createVNode("label", { for: "lf__remember_me" }, "remember me?")
                  ]),
                  _: 1
                })
              ]),
              createVNode("div", { class: "text-right" }, [
                createVNode(_component_Button, {
                  type: "submit",
                  class: "w-[120px]",
                  disabled: unref(isLoading)
                }, {
                  default: withCtx(() => [
                    unref(isLoading) ? (openBlock(), createBlock(unref(Loader), {
                      key: 0,
                      class: "animate-spin relative"
                    })) : createCommentVNode("", true),
                    createTextVNode(" Login ")
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ]),
              createVNode("div", { class: "text-center" }, [
                createVNode(_component_NuxtLink, {
                  to: "/register",
                  class: "text-primary text-sm underline"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Do not have an account?")
                  ]),
                  _: 1
                })
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(accounts)/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-DHEZ-8cj.mjs.map
