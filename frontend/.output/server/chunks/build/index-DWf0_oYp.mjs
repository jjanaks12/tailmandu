import { defineComponent, ref, watchEffect, mergeProps, unref, withCtx, createTextVNode, createVNode, createBlock, createCommentVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs } from 'vue/server-renderer';
import { u as useEventStore, _ as __nuxt_component_0$1 } from './server.mjs';
import { storeToRefs } from 'pinia';
import { _ as _sfc_main$3 } from './Label-jSWrZiLt.mjs';
import { _ as _sfc_main$4 } from './Input-DM54l6M4.mjs';
import { _ as _sfc_main$5 } from './index-fXRoVOws.mjs';
import { LoaderIcon } from 'lucide-vue-next';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Y from 'yup';
import { u as useTitle } from './index-DRYUbUIy.mjs';
import { u as useHead } from './v3-UNO0wT_2.mjs';
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
import 'reka-ui';
import './helpers-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
import './index-BCNSwEbA.mjs';
import 'class-variance-authority';
import './authorization-NeTuVL6Y.mjs';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "banner",
  __ssrInlineRender: true,
  setup(__props) {
    const { currentRace } = storeToRefs(useEventStore());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_ClientOnly, _attrs, {}, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/default/home/banner.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const newsletterSchema = Y.object({
  email: Y.string().email().required().label("Email address")
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "newsletter",
  __ssrInlineRender: true,
  setup(__props) {
    const isLoading = ref(false);
    const hasFormSubmitted = ref(false);
    const form = ref(null);
    const submitHandler = async (values) => {
      isLoading.value = true;
      setTimeout(() => {
        console.log(values);
        isLoading.value = false;
        hasFormSubmitted.value = true;
      }, 4e3);
    };
    watchEffect(() => {
      if (hasFormSubmitted.value) {
        setTimeout(() => {
          if (form.value)
            form.value.resetForm();
          hasFormSubmitted.value = false;
        }, 5e3);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Label = _sfc_main$3;
      const _component_Input = _sfc_main$4;
      const _component_Button = _sfc_main$5;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "py-20 text-center" }, _attrs))}><div class="container">`);
      if (!unref(hasFormSubmitted)) {
        _push(`<!--[--><div class="mb-8"><h2 class="text-2xl">Do not miss anything</h2><p>Subscribe for your newsletter so you won&#39;t miss anything in future.</p></div>`);
        _push(ssrRenderComponent(unref(Form), {
          "validation-schema": unref(newsletterSchema),
          onSubmit: submitHandler,
          class: "flex items-center gap-2 max-w-[600px] mx-auto",
          ref_key: "form",
          ref: form
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Field), {
                name: "email",
                as: "div",
                class: "relative grow"
              }, {
                default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Label, {
                      for: "nf__email",
                      class: "sr-only"
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Your email`);
                        } else {
                          return [
                            createTextVNode("Your email")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Input, mergeProps(field, {
                      id: "nf__email",
                      placeholder: "Your email: xxx@xxxx.xxx"
                    }), null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(ErrorMessage), {
                      name: "email",
                      class: "absolute top-full left-0"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_Label, {
                        for: "nf__email",
                        class: "sr-only"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Your email")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Input, mergeProps(field, {
                        id: "nf__email",
                        placeholder: "Your email: xxx@xxxx.xxx"
                      }), null, 16),
                      createVNode(unref(ErrorMessage), {
                        name: "email",
                        class: "absolute top-full left-0"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_Button, {
                type: "submit",
                size: "lg",
                disabled: unref(isLoading)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (unref(isLoading)) {
                      _push3(ssrRenderComponent(unref(LoaderIcon), null, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(` Subscribe `);
                  } else {
                    return [
                      unref(isLoading) ? (openBlock(), createBlock(unref(LoaderIcon), { key: 0 })) : createCommentVNode("", true),
                      createTextVNode(" Subscribe ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(Field), {
                  name: "email",
                  as: "div",
                  class: "relative grow"
                }, {
                  default: withCtx(({ field }) => [
                    createVNode(_component_Label, {
                      for: "nf__email",
                      class: "sr-only"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Your email")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Input, mergeProps(field, {
                      id: "nf__email",
                      placeholder: "Your email: xxx@xxxx.xxx"
                    }), null, 16),
                    createVNode(unref(ErrorMessage), {
                      name: "email",
                      class: "absolute top-full left-0"
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_Button, {
                  type: "submit",
                  size: "lg",
                  disabled: unref(isLoading)
                }, {
                  default: withCtx(() => [
                    unref(isLoading) ? (openBlock(), createBlock(unref(LoaderIcon), { key: 0 })) : createCommentVNode("", true),
                    createTextVNode(" Subscribe ")
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<div class="mb-8"><h2 class="text-2xl">Thank you for subscribing newsletter</h2><p>We welcome you ours newsletter program. We will send you email when there is news that might interest you.</p></div>`);
      }
      _push(`</div></section>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/default/newsletter.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useTitle("Trailmandu - From The City To The Mountains");
    useHead({
      meta: [
        {
          name: "description",
          content: "This is a description of my awesome page."
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DWf0_oYp.mjs.map
