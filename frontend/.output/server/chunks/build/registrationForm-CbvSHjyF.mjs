import { _ as _sfc_main$2 } from './Label-CxpqotiU.mjs';
import { _ as _sfc_main$3 } from './Input-Cs6c7Uzm.mjs';
import { _ as _sfc_main$6, a as _sfc_main$1$1, b as _sfc_main$5, c as _sfc_main$5$1, d as _sfc_main$4$1 } from './SelectValue-B_oh3C4o.mjs';
import { _ as _sfc_main$7 } from './Checkbox-BM2RqMe1.mjs';
import { _ as _sfc_main$2$1, a as _sfc_main$8, b as _sfc_main$1$2 } from './index-DVPcm4k2.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { Separator } from 'reka-ui';
import { c as cn } from './helpers-H80jjgLf.mjs';
import { r as reactiveOmit } from './index-3vNTMeQu.mjs';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { parseDate } from '@internationalized/date';
import { storeToRefs } from 'pinia';
import { User, Mail, Phone, Calendar, Flag, Users, Target, InfoIcon, XIcon, Loader2 } from 'lucide-vue-next';
import { _ as _sfc_main$4 } from './DatePicker-BTvxZIGA.mjs';
import { d as useAppStore, u as useEventStore, b as useRoute, A as trailRaceRunner, B as trailRaceVolunteer, s as showImage, n as navigateTo } from './server.mjs';
import moment from 'moment';
import { _ as _sfc_main$9 } from './Button-bc6lCA4h.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Separator",
  __ssrInlineRender: true,
  props: {
    orientation: { default: "horizontal" },
    decorative: { type: Boolean, default: true },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Separator), mergeProps({ "data-slot": "separator-root" }, unref(delegatedProps), {
        class: unref(cn)(
          `bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px`,
          props.class
        )
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/separator/Separator.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "registrationForm",
  __ssrInlineRender: true,
  props: {
    eventId: {},
    mode: {},
    trailRace: {}
  },
  setup(__props) {
    const props = __props;
    const { countries, genders, company } = storeToRefs(useAppStore());
    const { saveVoluteer, saveRunner } = useEventStore();
    const route = useRoute();
    const form = ref(null);
    const isLoading = ref(false);
    const stageList = computed(() => props.trailRace.stages.map((stage) => stage.stage_categories.filter((stage_category) => moment(stage_category.end).isAfter(moment())).length > 0 ? stage : null).filter((stage) => stage !== null));
    const availabeStageCategoryList = computed(() => {
      var _a;
      return (_a = stageList.value.find((stage) => {
        var _a2;
        return stage.id === ((_a2 = form.value) == null ? void 0 : _a2.values.stage_id);
      })) == null ? void 0 : _a.stage_categories;
    });
    const prices = computed(() => {
      var _a;
      return (_a = availabeStageCategoryList.value) == null ? void 0 : _a.find((stage_category) => {
        var _a2;
        return stage_category.id === ((_a2 = form.value) == null ? void 0 : _a2.values.stage_category_id);
      });
    });
    const payment = computed(() => {
      var _a, _b, _c, _d, _e;
      const type = ((_a = form.value) == null ? void 0 : _a.values.country_id) == ((_b = company.value) == null ? void 0 : _b.address.country_id) ? "NATIONAL" : "INTERNATIONAL";
      (_c = form.value) == null ? void 0 : _c.setFieldValue("payment_type", type);
      return (_e = (_d = prices.value) == null ? void 0 : _d.payment.find((payment2) => payment2.type === type)) != null ? _e : {};
    });
    const onSubmit = async (values) => {
      try {
        isLoading.value = true;
        if (props.mode == "volunteer")
          await saveVoluteer(values, props.trailRace.id);
        else
          await saveRunner(values, props.trailRace.id);
        navigateTo(`/races/${route.params.slug}`);
      } catch (error) {
        console.log(error);
      } finally {
        isLoading.value = false;
      }
    };
    const handleFileChange = (event) => {
      var _a;
      const target = event.target;
      const file = (_a = target.files) == null ? void 0 : _a[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          var _a2, _b, _c;
          const result = (_a2 = e.target) == null ? void 0 : _a2.result;
          if (result) {
            (_b = form.value) == null ? void 0 : _b.setFieldValue("payment_method", "QR");
            (_c = form.value) == null ? void 0 : _c.setFieldValue("payment_screenshot", result);
          }
        };
        reader.readAsDataURL(file);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Label = _sfc_main$2;
      const _component_Input = _sfc_main$3;
      const _component_Select = _sfc_main$6;
      const _component_SelectTrigger = _sfc_main$1$1;
      const _component_SelectValue = _sfc_main$5;
      const _component_SelectContent = _sfc_main$5$1;
      const _component_SelectItem = _sfc_main$4$1;
      const _component_Checkbox = _sfc_main$7;
      const _component_Alert = _sfc_main$2$1;
      const _component_AlertTitle = _sfc_main$8;
      const _component_AlertDescription = _sfc_main$1$2;
      const _component_Button = _sfc_main$9;
      const _component_Separator = _sfc_main$1;
      if (stageList.value.length > 0) {
        _push(`<section${ssrRenderAttrs(mergeProps({ class: "max-w-4xl mx-auto p-6 space-y-8" }, _attrs))}>`);
        _push(ssrRenderComponent(unref(Form), {
          ref_key: "form",
          ref: form,
          class: "space-y-8",
          "validation-schema": __props.mode == "runner" ? unref(trailRaceRunner) : unref(trailRaceVolunteer),
          onSubmit
        }, {
          default: withCtx(({ values }, _push2, _parent2, _scopeId) => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            if (_push2) {
              _push2(`<div class="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"${_scopeId}><div class="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><div class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(User), { size: 20 }, null, _parent2, _scopeId));
              _push2(`</div><div${_scopeId}><h2 class="text-xl font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(props.mode === "volunteer" ? "Volunteer Information" : "Runner Information")}</h2><p class="text-sm text-gray-600"${_scopeId}>Tell us about yourself</p></div></div></div><div class="p-8 space-y-6"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-3 gap-6"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Field), {
                name: "first_name",
                as: "div",
                class: "space-y-2"
              }, {
                default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Label, {
                      for: "rf__first_name",
                      class: "text-sm font-medium text-gray-700 flex items-center gap-2"
                    }, {
                      default: withCtx((_, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(User), {
                            size: 16,
                            class: "text-gray-400"
                          }, null, _parent4, _scopeId3));
                          _push4(` First name `);
                        } else {
                          return [
                            createVNode(unref(User), {
                              size: 16,
                              class: "text-gray-400"
                            }),
                            createTextVNode(" First name ")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Input, mergeProps({ id: "rf__first_name" }, field, {
                      placeholder: "Enter your first name",
                      autocomplete: "given-name",
                      class: "h-12 text-base"
                    }), null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(ErrorMessage), { name: "first_name" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_Label, {
                        for: "rf__first_name",
                        class: "text-sm font-medium text-gray-700 flex items-center gap-2"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(User), {
                            size: 16,
                            class: "text-gray-400"
                          }),
                          createTextVNode(" First name ")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Input, mergeProps({ id: "rf__first_name" }, field, {
                        placeholder: "Enter your first name",
                        autocomplete: "given-name",
                        class: "h-12 text-base"
                      }), null, 16),
                      createVNode(unref(ErrorMessage), { name: "first_name" })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(Field), {
                name: "middle_name",
                as: "div",
                class: "space-y-2"
              }, {
                default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Label, {
                      for: "rf__middle_name",
                      class: "text-sm font-medium text-gray-700"
                    }, {
                      default: withCtx((_, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Middle name <span class="text-gray-400 text-xs"${_scopeId3}>(optional)</span>`);
                        } else {
                          return [
                            createTextVNode(" Middle name "),
                            createVNode("span", { class: "text-gray-400 text-xs" }, "(optional)")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Input, mergeProps({ id: "rf__middle_name" }, field, {
                      placeholder: "Middle name",
                      class: "h-12 text-base"
                    }), null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(ErrorMessage), { name: "middle_name" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_Label, {
                        for: "rf__middle_name",
                        class: "text-sm font-medium text-gray-700"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Middle name "),
                          createVNode("span", { class: "text-gray-400 text-xs" }, "(optional)")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Input, mergeProps({ id: "rf__middle_name" }, field, {
                        placeholder: "Middle name",
                        class: "h-12 text-base"
                      }), null, 16),
                      createVNode(unref(ErrorMessage), { name: "middle_name" })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(Field), {
                name: "last_name",
                as: "div",
                class: "space-y-2"
              }, {
                default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Label, {
                      for: "rf__last_name",
                      class: "text-sm font-medium text-gray-700"
                    }, {
                      default: withCtx((_, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Last name `);
                        } else {
                          return [
                            createTextVNode(" Last name ")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Input, mergeProps({ id: "rf__last_name" }, field, {
                      placeholder: "Enter your last name",
                      autocomplete: "family-name",
                      class: "h-12 text-base"
                    }), null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(ErrorMessage), { name: "last_name" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_Label, {
                        for: "rf__last_name",
                        class: "text-sm font-medium text-gray-700"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Last name ")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Input, mergeProps({ id: "rf__last_name" }, field, {
                        placeholder: "Enter your last name",
                        autocomplete: "family-name",
                        class: "h-12 text-base"
                      }), null, 16),
                      createVNode(unref(ErrorMessage), { name: "last_name" })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Field), {
                name: "email",
                as: "div",
                class: "space-y-2"
              }, {
                default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Label, {
                      for: "rf__email",
                      class: "text-sm font-medium text-gray-700 flex items-center gap-2"
                    }, {
                      default: withCtx((_, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Mail), {
                            size: 16,
                            class: "text-gray-400"
                          }, null, _parent4, _scopeId3));
                          _push4(` Email address `);
                        } else {
                          return [
                            createVNode(unref(Mail), {
                              size: 16,
                              class: "text-gray-400"
                            }),
                            createTextVNode(" Email address ")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Input, mergeProps({
                      id: "rf__email",
                      type: "email"
                    }, field, {
                      placeholder: "your.email@example.com",
                      autocomplete: "email",
                      class: "h-12 text-base"
                    }), null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(ErrorMessage), { name: "email" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_Label, {
                        for: "rf__email",
                        class: "text-sm font-medium text-gray-700 flex items-center gap-2"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Mail), {
                            size: 16,
                            class: "text-gray-400"
                          }),
                          createTextVNode(" Email address ")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Input, mergeProps({
                        id: "rf__email",
                        type: "email"
                      }, field, {
                        placeholder: "your.email@example.com",
                        autocomplete: "email",
                        class: "h-12 text-base"
                      }), null, 16),
                      createVNode(unref(ErrorMessage), { name: "email" })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(Field), {
                name: "phone_number",
                as: "div",
                class: "space-y-2"
              }, {
                default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Label, { class: "text-sm font-medium text-gray-700 flex items-center gap-2" }, {
                      default: withCtx((_, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Phone), {
                            size: 16,
                            class: "text-gray-400"
                          }, null, _parent4, _scopeId3));
                          _push4(` Phone number `);
                        } else {
                          return [
                            createVNode(unref(Phone), {
                              size: 16,
                              class: "text-gray-400"
                            }),
                            createTextVNode(" Phone number ")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Input, mergeProps({ type: "tel" }, field, {
                      placeholder: "xxxxxxxxxx",
                      autocomplete: "tel",
                      class: "h-12 text-base"
                    }), null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(ErrorMessage), { name: "phone_number" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_Label, { class: "text-sm font-medium text-gray-700 flex items-center gap-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(Phone), {
                            size: 16,
                            class: "text-gray-400"
                          }),
                          createTextVNode(" Phone number ")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Input, mergeProps({ type: "tel" }, field, {
                        placeholder: "xxxxxxxxxx",
                        autocomplete: "tel",
                        class: "h-12 text-base"
                      }), null, 16),
                      createVNode(unref(ErrorMessage), { name: "phone_number" })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Field), {
                name: "date_of_birth",
                as: "div",
                class: "space-y-2"
              }, {
                default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Label, { class: "text-sm font-medium text-gray-700 flex items-center gap-2" }, {
                      default: withCtx((_, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Calendar), {
                            size: 16,
                            class: "text-gray-400"
                          }, null, _parent4, _scopeId3));
                          _push4(` Date of birth `);
                        } else {
                          return [
                            createVNode(unref(Calendar), {
                              size: 16,
                              class: "text-gray-400"
                            }),
                            createTextVNode(" Date of birth ")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_sfc_main$4, {
                      Label: "Select your birth date",
                      "model-value": field.value ? unref(parseDate)(field.value) : void 0,
                      "onUpdate:modelValue": ($event) => $event ? field.onChange($event.toString()) : void 0
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(ErrorMessage), { name: "date_of_birth" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_Label, { class: "text-sm font-medium text-gray-700 flex items-center gap-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(Calendar), {
                            size: 16,
                            class: "text-gray-400"
                          }),
                          createTextVNode(" Date of birth ")
                        ]),
                        _: 1
                      }),
                      createVNode(_sfc_main$4, {
                        Label: "Select your birth date",
                        "model-value": field.value ? unref(parseDate)(field.value) : void 0,
                        "onUpdate:modelValue": ($event) => $event ? field.onChange($event.toString()) : void 0
                      }, null, 8, ["model-value", "onUpdate:modelValue"]),
                      createVNode(unref(ErrorMessage), { name: "date_of_birth" })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Field), {
                name: "country_id",
                as: "div",
                class: "space-y-2"
              }, {
                default: withCtx(({ value, handleChange }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Label, { class: "text-sm font-medium text-gray-700 flex items-center gap-2" }, {
                      default: withCtx((_, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Flag), {
                            size: 16,
                            class: "text-gray-400"
                          }, null, _parent4, _scopeId3));
                          _push4(` Country `);
                        } else {
                          return [
                            createVNode(unref(Flag), {
                              size: 16,
                              class: "text-gray-400"
                            }),
                            createTextVNode(" Country ")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Select, {
                      "model-value": String(value != null ? value : ""),
                      "onUpdate:modelValue": handleChange
                    }, {
                      default: withCtx((_, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_SelectTrigger, { class: "w-full h-12" }, {
                            default: withCtx((_2, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_SelectValue, { placeholder: "Select country" }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_SelectValue, { placeholder: "Select country" })
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_SelectContent, null, {
                            default: withCtx((_2, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(unref(countries), (country) => {
                                  _push5(ssrRenderComponent(_component_SelectItem, {
                                    key: country.id,
                                    value: String(country.id)
                                  }, {
                                    default: withCtx((_3, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(country.name)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(country.name), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(countries), (country) => {
                                    return openBlock(), createBlock(_component_SelectItem, {
                                      key: country.id,
                                      value: String(country.id)
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(country.name), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["value"]);
                                  }), 128))
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_SelectTrigger, { class: "w-full h-12" }, {
                              default: withCtx(() => [
                                createVNode(_component_SelectValue, { placeholder: "Select country" })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_SelectContent, null, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(countries), (country) => {
                                  return openBlock(), createBlock(_component_SelectItem, {
                                    key: country.id,
                                    value: String(country.id)
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(country.name), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 128))
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(ErrorMessage), { name: "country_id" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_Label, { class: "text-sm font-medium text-gray-700 flex items-center gap-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(Flag), {
                            size: 16,
                            class: "text-gray-400"
                          }),
                          createTextVNode(" Country ")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Select, {
                        "model-value": String(value != null ? value : ""),
                        "onUpdate:modelValue": handleChange
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_SelectTrigger, { class: "w-full h-12" }, {
                            default: withCtx(() => [
                              createVNode(_component_SelectValue, { placeholder: "Select country" })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_SelectContent, null, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(countries), (country) => {
                                return openBlock(), createBlock(_component_SelectItem, {
                                  key: country.id,
                                  value: String(country.id)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(country.name), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["value"]);
                              }), 128))
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["model-value", "onUpdate:modelValue"]),
                      createVNode(unref(ErrorMessage), { name: "country_id" })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(Field), {
                name: "gender_id",
                as: "div",
                class: "space-y-2"
              }, {
                default: withCtx(({ value, handleChange }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Label, { class: "text-sm font-medium text-gray-700 flex items-center gap-2" }, {
                      default: withCtx((_, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Users), {
                            size: 16,
                            class: "text-gray-400"
                          }, null, _parent4, _scopeId3));
                          _push4(` Gender `);
                        } else {
                          return [
                            createVNode(unref(Users), {
                              size: 16,
                              class: "text-gray-400"
                            }),
                            createTextVNode(" Gender ")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Select, {
                      "model-value": value,
                      "onUpdate:modelValue": handleChange
                    }, {
                      default: withCtx((_, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_SelectTrigger, { class: "w-full h-12" }, {
                            default: withCtx((_2, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_SelectValue, { placeholder: "Select gender" }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_SelectValue, { placeholder: "Select gender" })
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_SelectContent, null, {
                            default: withCtx((_2, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(unref(genders), (gender) => {
                                  _push5(ssrRenderComponent(_component_SelectItem, {
                                    key: gender.id,
                                    value: String(gender.id)
                                  }, {
                                    default: withCtx((_3, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(gender.name)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(gender.name), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(genders), (gender) => {
                                    return openBlock(), createBlock(_component_SelectItem, {
                                      key: gender.id,
                                      value: String(gender.id)
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(gender.name), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["value"]);
                                  }), 128))
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_SelectTrigger, { class: "w-full h-12" }, {
                              default: withCtx(() => [
                                createVNode(_component_SelectValue, { placeholder: "Select gender" })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_SelectContent, null, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(genders), (gender) => {
                                  return openBlock(), createBlock(_component_SelectItem, {
                                    key: gender.id,
                                    value: String(gender.id)
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(gender.name), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 128))
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(ErrorMessage), { name: "gender_id" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_Label, { class: "text-sm font-medium text-gray-700 flex items-center gap-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(Users), {
                            size: 16,
                            class: "text-gray-400"
                          }),
                          createTextVNode(" Gender ")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Select, {
                        "model-value": value,
                        "onUpdate:modelValue": handleChange
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_SelectTrigger, { class: "w-full h-12" }, {
                            default: withCtx(() => [
                              createVNode(_component_SelectValue, { placeholder: "Select gender" })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_SelectContent, null, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(genders), (gender) => {
                                return openBlock(), createBlock(_component_SelectItem, {
                                  key: gender.id,
                                  value: String(gender.id)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(gender.name), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["value"]);
                              }), 128))
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["model-value", "onUpdate:modelValue"]),
                      createVNode(unref(ErrorMessage), { name: "gender_id" })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div><div class="flex gap-4"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Field), {
                name: "stage_id",
                as: "div",
                class: { "space-y-2": true, "w-1/2": __props.mode === "runner", "w-full": __props.mode === "volunteer" }
              }, {
                default: withCtx(({ value, handleChange }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Label, { class: "text-sm font-medium text-gray-700 flex items-center gap-2" }, {
                      default: withCtx((_, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Target), {
                            size: 16,
                            class: "text-gray-400"
                          }, null, _parent4, _scopeId3));
                          _push4(` Stage `);
                        } else {
                          return [
                            createVNode(unref(Target), {
                              size: 16,
                              class: "text-gray-400"
                            }),
                            createTextVNode(" Stage ")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Select, {
                      "model-value": value,
                      "onUpdate:modelValue": handleChange
                    }, {
                      default: withCtx((_, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_SelectTrigger, { class: "w-full h-12 disabled:opacity-50 disabled:cursor-not-allowed" }, {
                            default: withCtx((_2, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_SelectValue, { placeholder: "Choose your stage" }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_SelectValue, { placeholder: "Choose your stage" })
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_SelectContent, null, {
                            default: withCtx((_2, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(stageList.value, (s) => {
                                  _push5(ssrRenderComponent(_component_SelectItem, {
                                    key: s.id,
                                    value: String(s.id)
                                  }, {
                                    default: withCtx((_3, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(s.name)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(s.name), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(true), createBlock(Fragment, null, renderList(stageList.value, (s) => {
                                    return openBlock(), createBlock(_component_SelectItem, {
                                      key: s.id,
                                      value: String(s.id)
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(s.name), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["value"]);
                                  }), 128))
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_SelectTrigger, { class: "w-full h-12 disabled:opacity-50 disabled:cursor-not-allowed" }, {
                              default: withCtx(() => [
                                createVNode(_component_SelectValue, { placeholder: "Choose your stage" })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_SelectContent, null, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(stageList.value, (s) => {
                                  return openBlock(), createBlock(_component_SelectItem, {
                                    key: s.id,
                                    value: String(s.id)
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(s.name), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 128))
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(ErrorMessage), { name: "stage_id" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_Label, { class: "text-sm font-medium text-gray-700 flex items-center gap-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(Target), {
                            size: 16,
                            class: "text-gray-400"
                          }),
                          createTextVNode(" Stage ")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Select, {
                        "model-value": value,
                        "onUpdate:modelValue": handleChange
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_SelectTrigger, { class: "w-full h-12 disabled:opacity-50 disabled:cursor-not-allowed" }, {
                            default: withCtx(() => [
                              createVNode(_component_SelectValue, { placeholder: "Choose your stage" })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_SelectContent, null, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(stageList.value, (s) => {
                                return openBlock(), createBlock(_component_SelectItem, {
                                  key: s.id,
                                  value: String(s.id)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(s.name), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["value"]);
                              }), 128))
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["model-value", "onUpdate:modelValue"]),
                      createVNode(unref(ErrorMessage), { name: "stage_id" })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              if (__props.mode === "runner") {
                _push2(ssrRenderComponent(unref(Field), {
                  name: "stage_category_id",
                  as: "div",
                  class: "w-1/2 space-y-2"
                }, {
                  default: withCtx(({ value, handleChange }, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_Label, { class: "text-sm font-medium text-gray-700 flex items-center gap-2" }, {
                        default: withCtx((_, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(Target), {
                              size: 16,
                              class: "text-gray-400"
                            }, null, _parent4, _scopeId3));
                            _push4(` Stage Category `);
                          } else {
                            return [
                              createVNode(unref(Target), {
                                size: 16,
                                class: "text-gray-400"
                              }),
                              createTextVNode(" Stage Category ")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_Select, {
                        "model-value": value,
                        "onUpdate:modelValue": handleChange
                      }, {
                        default: withCtx((_, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_SelectTrigger, { class: "w-full h-12 disabled:opacity-50 disabled:cursor-not-allowed" }, {
                              default: withCtx((_2, _push5, _parent5, _scopeId4) => {
                                var _a2, _b2, _c2, _d2;
                                if (_push5) {
                                  _push5(ssrRenderComponent(_component_SelectValue, {
                                    placeholder: ((_b2 = (_a2 = form.value) == null ? void 0 : _a2.values) == null ? void 0 : _b2.stage_id) ? "Choose your stage catgeory" : "Select an stage first"
                                  }, null, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(_component_SelectValue, {
                                      placeholder: ((_d2 = (_c2 = form.value) == null ? void 0 : _c2.values) == null ? void 0 : _d2.stage_id) ? "Choose your stage catgeory" : "Select an stage first"
                                    }, null, 8, ["placeholder"])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(_component_SelectContent, null, {
                              default: withCtx((_2, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<!--[-->`);
                                  ssrRenderList(availabeStageCategoryList.value, (sc) => {
                                    _push5(ssrRenderComponent(_component_SelectItem, {
                                      key: sc.id,
                                      value: String(sc.id)
                                    }, {
                                      default: withCtx((_3, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(`${ssrInterpolate(sc.name)}`);
                                        } else {
                                          return [
                                            createTextVNode(toDisplayString(sc.name), 1)
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                  });
                                  _push5(`<!--]-->`);
                                } else {
                                  return [
                                    (openBlock(true), createBlock(Fragment, null, renderList(availabeStageCategoryList.value, (sc) => {
                                      return openBlock(), createBlock(_component_SelectItem, {
                                        key: sc.id,
                                        value: String(sc.id)
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(sc.name), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["value"]);
                                    }), 128))
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_SelectTrigger, { class: "w-full h-12 disabled:opacity-50 disabled:cursor-not-allowed" }, {
                                default: withCtx(() => {
                                  var _a2, _b2;
                                  return [
                                    createVNode(_component_SelectValue, {
                                      placeholder: ((_b2 = (_a2 = form.value) == null ? void 0 : _a2.values) == null ? void 0 : _b2.stage_id) ? "Choose your stage catgeory" : "Select an stage first"
                                    }, null, 8, ["placeholder"])
                                  ];
                                }),
                                _: 2
                              }, 1024),
                              createVNode(_component_SelectContent, null, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(availabeStageCategoryList.value, (sc) => {
                                    return openBlock(), createBlock(_component_SelectItem, {
                                      key: sc.id,
                                      value: String(sc.id)
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(sc.name), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["value"]);
                                  }), 128))
                                ]),
                                _: 1
                              })
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(unref(ErrorMessage), { name: "stage_category_id" }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_Label, { class: "text-sm font-medium text-gray-700 flex items-center gap-2" }, {
                          default: withCtx(() => [
                            createVNode(unref(Target), {
                              size: 16,
                              class: "text-gray-400"
                            }),
                            createTextVNode(" Stage Category ")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_Select, {
                          "model-value": value,
                          "onUpdate:modelValue": handleChange
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_SelectTrigger, { class: "w-full h-12 disabled:opacity-50 disabled:cursor-not-allowed" }, {
                              default: withCtx(() => {
                                var _a2, _b2;
                                return [
                                  createVNode(_component_SelectValue, {
                                    placeholder: ((_b2 = (_a2 = form.value) == null ? void 0 : _a2.values) == null ? void 0 : _b2.stage_id) ? "Choose your stage catgeory" : "Select an stage first"
                                  }, null, 8, ["placeholder"])
                                ];
                              }),
                              _: 2
                            }, 1024),
                            createVNode(_component_SelectContent, null, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(availabeStageCategoryList.value, (sc) => {
                                  return openBlock(), createBlock(_component_SelectItem, {
                                    key: sc.id,
                                    value: String(sc.id)
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(sc.name), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 128))
                              ]),
                              _: 1
                            })
                          ]),
                          _: 2
                        }, 1032, ["model-value", "onUpdate:modelValue"]),
                        createVNode(unref(ErrorMessage), { name: "stage_category_id" })
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              if (__props.mode == "runner") {
                _push2(`<!--[-->`);
                _push2(ssrRenderComponent(unref(Field), {
                  name: "description.club_name",
                  as: "div",
                  class: "space-y-2"
                }, {
                  default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_Label, {
                        for: "rf__description.club_name",
                        class: "text-sm font-medium text-gray-700 flex items-center gap-2"
                      }, {
                        default: withCtx((_, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(` Club name `);
                          } else {
                            return [
                              createTextVNode(" Club name ")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_Input, mergeProps(field, {
                        id: "rf__description.club_name",
                        placeholder: "Name of club you belong to"
                      }), null, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(unref(ErrorMessage), { name: "description.club_name" }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_Label, {
                          for: "rf__description.club_name",
                          class: "text-sm font-medium text-gray-700 flex items-center gap-2"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Club name ")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_Input, mergeProps(field, {
                          id: "rf__description.club_name",
                          placeholder: "Name of club you belong to"
                        }), null, 16),
                        createVNode(unref(ErrorMessage), { name: "description.club_name" })
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Field), {
                  name: "description.emergency_contact_name",
                  as: "div",
                  class: "space-y-2"
                }, {
                  default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_Label, {
                        id: "rf__emergency_contact_name",
                        class: "text-sm font-medium text-gray-700 flex items-center gap-2"
                      }, {
                        default: withCtx((_, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(` Emergency contact name `);
                          } else {
                            return [
                              createTextVNode(" Emergency contact name ")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_Input, mergeProps(field, { placeholder: "In case of emergency" }), null, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(unref(ErrorMessage), { name: "description.emergency_contact_name" }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_Label, {
                          id: "rf__emergency_contact_name",
                          class: "text-sm font-medium text-gray-700 flex items-center gap-2"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Emergency contact name ")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_Input, mergeProps(field, { placeholder: "In case of emergency" }), null, 16),
                        createVNode(unref(ErrorMessage), { name: "description.emergency_contact_name" })
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(unref(Field), {
                  name: "description.emergency_contact_phone",
                  as: "div",
                  class: "space-y-2"
                }, {
                  default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_Label, {
                        id: "rf__emergency_contact_phone",
                        class: "text-sm font-medium text-gray-700 flex items-center gap-2"
                      }, {
                        default: withCtx((_, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(` Emergency contact phone `);
                          } else {
                            return [
                              createTextVNode(" Emergency contact phone ")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_Input, mergeProps(field, { placeholder: "In case of emergency" }), null, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(unref(ErrorMessage), { name: "description.emergency_contact_phone" }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_Label, {
                          id: "rf__emergency_contact_phone",
                          class: "text-sm font-medium text-gray-700 flex items-center gap-2"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Emergency contact phone ")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_Input, mergeProps(field, { placeholder: "In case of emergency" }), null, 16),
                        createVNode(unref(ErrorMessage), { name: "description.emergency_contact_phone" })
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div>`);
                _push2(ssrRenderComponent(unref(Field), {
                  name: "description.want_lunch",
                  as: "div",
                  class: "space-y-2"
                }, {
                  default: withCtx(({ value, handleChange }, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_Label, {
                        id: "rf__want_lunch",
                        class: "flex items-start gap-2"
                      }, {
                        default: withCtx((_, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_Checkbox, {
                              "model-value": value,
                              "onUpdate:modelValue": handleChange,
                              "default-value": false
                            }, null, _parent4, _scopeId3));
                            _push4(`<div class="grow flex flex-col gap-2"${_scopeId3}><span class="font-medium text-gray-700"${_scopeId3}>I want to order After Race Lunch.</span><em class="text-sm font-light not-italic"${_scopeId3}>Please Note*: Lunch is only provided to those who pre- ordered and pre-paid which is 480 per person and not included in registration fee.</em></div>`);
                          } else {
                            return [
                              createVNode(_component_Checkbox, {
                                "model-value": value,
                                "onUpdate:modelValue": handleChange,
                                "default-value": false
                              }, null, 8, ["model-value", "onUpdate:modelValue"]),
                              createVNode("div", { class: "grow flex flex-col gap-2" }, [
                                createVNode("span", { class: "font-medium text-gray-700" }, "I want to order After Race Lunch."),
                                createVNode("em", { class: "text-sm font-light not-italic" }, "Please Note*: Lunch is only provided to those who pre- ordered and pre-paid which is 480 per person and not included in registration fee.")
                              ])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(unref(ErrorMessage), { name: "description.want_lunch" }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_Label, {
                          id: "rf__want_lunch",
                          class: "flex items-start gap-2"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_Checkbox, {
                              "model-value": value,
                              "onUpdate:modelValue": handleChange,
                              "default-value": false
                            }, null, 8, ["model-value", "onUpdate:modelValue"]),
                            createVNode("div", { class: "grow flex flex-col gap-2" }, [
                              createVNode("span", { class: "font-medium text-gray-700" }, "I want to order After Race Lunch."),
                              createVNode("em", { class: "text-sm font-light not-italic" }, "Please Note*: Lunch is only provided to those who pre- ordered and pre-paid which is 480 per person and not included in registration fee.")
                            ])
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(ErrorMessage), { name: "description.want_lunch" })
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`<!--]-->`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
              if (__props.mode == "runner" && Object.keys(payment.value).length > 0) {
                _push2(`<div class="bg-white text-gray-500 rounded-3xl border border-gray-200 shadow-sm p-8"${_scopeId}><h3 class="text-2xl font-light mb-2"${_scopeId}> Registration fees for <span class="text-primary font-bold"${_scopeId}>${ssrInterpolate((_a = prices.value) == null ? void 0 : _a.name)}</span></h3>`);
                if (!values.payment_method || values.payment_method == "QR") {
                  _push2(`<!--[--><div class="flex items-center justify-between gap-6 pb-5"${_scopeId}><div class="grow space-y-3"${_scopeId}><em class="text-gray-600 block not-italic text-2xl"${_scopeId}>NPR ${ssrInterpolate((_b = payment.value) == null ? void 0 : _b.amount)}</em><p${_scopeId}>Please make payment to this QR code and upload your screenshot. We verify from the screenshot. We will contact you as soon as possible.</p>`);
                  _push2(ssrRenderComponent(_component_Alert, { variant: "info" }, {
                    default: withCtx((_, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(ssrRenderComponent(unref(InfoIcon), null, null, _parent3, _scopeId2));
                        _push3(ssrRenderComponent(_component_AlertTitle, null, {
                          default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`Payment`);
                            } else {
                              return [
                                createTextVNode("Payment")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                        _push3(ssrRenderComponent(_component_AlertDescription, null, {
                          default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`If you are international personal, Just upload the screenshot of the conversation. We will handle the payment at venue.`);
                            } else {
                              return [
                                createTextVNode("If you are international personal, Just upload the screenshot of the conversation. We will handle the payment at venue.")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      } else {
                        return [
                          createVNode(unref(InfoIcon)),
                          createVNode(_component_AlertTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Payment")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_AlertDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("If you are international personal, Just upload the screenshot of the conversation. We will handle the payment at venue.")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  _push2(`<label class="flex items-center gap-2 rounded-lg overflow-hidden border border-gray-200 relative"${_scopeId}><input type="file" class="hidden"${_scopeId}>`);
                  if (values == null ? void 0 : values.payment_screenshot) {
                    _push2(`<figure${_scopeId}><img${ssrRenderAttr("src", values == null ? void 0 : values.payment_screenshot)} alt="Payment screenshot" class="w-full h-auto"${_scopeId}>`);
                    _push2(ssrRenderComponent(_component_Button, {
                      class: "absolute top-2 right-2",
                      onClick: ($event) => {
                        var _a2;
                        return (_a2 = form.value) == null ? void 0 : _a2.setFieldValue("payment_screenshot", "");
                      }
                    }, {
                      default: withCtx((_, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(ssrRenderComponent(unref(XIcon), { class: "w-6 h-6" }, null, _parent3, _scopeId2));
                        } else {
                          return [
                            createVNode(unref(XIcon), { class: "w-6 h-6" })
                          ];
                        }
                      }),
                      _: 2
                    }, _parent2, _scopeId));
                    _push2(`</figure>`);
                  } else {
                    _push2(`<div class="w-full flex flex-col gap-2 p-4"${_scopeId}><span class="text-sm"${_scopeId}>You can upload your screenshot here...</span><p class="text-xs"${_scopeId}>File size should be less than 2MB</p></div>`);
                  }
                  _push2(`</label></div><figure class="w-1/2 text-sm space-y-1 border border-gray-200 p-4 rounded-lg"${_scopeId}><figcaption${_scopeId}>Here is the payment QR code</figcaption><img${ssrRenderAttr("src", unref(showImage)((_d = (_c = payment.value) == null ? void 0 : _c.screenshot) == null ? void 0 : _d.file_name))} alt="Payment screenshot" class="w-full h-auto"${_scopeId}></figure></div>`);
                  _push2(ssrRenderComponent(unref(ErrorMessage), { name: "payment_method" }, null, _parent2, _scopeId));
                  _push2(ssrRenderComponent(_component_Separator, null, null, _parent2, _scopeId));
                  _push2(`<!--]-->`);
                } else {
                  _push2(`<!---->`);
                }
                if (values.payment_method === "PAY_AT_VENUE") {
                  _push2(`<p${_scopeId}>Got it! We will remind you to pay cash when you arrive at the event.</p>`);
                } else {
                  _push2(`<div class="text-center flex flex-col justify-center items-center"${_scopeId}><span class="bg-white text-gray-600 text-lg font-bold uppercase -translate-y-1/2 px-2"${_scopeId}>Or</span><p${_scopeId}>You can also choose to pay in cash when you arrive at the event.</p>`);
                  _push2(ssrRenderComponent(_component_Button, {
                    type: "button",
                    onClick: ($event) => {
                      var _a2;
                      return (_a2 = form.value) == null ? void 0 : _a2.setFieldValue("payment_method", "PAY_AT_VENUE");
                    },
                    class: "mt-2"
                  }, {
                    default: withCtx((_, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(` Pay at venue `);
                      } else {
                        return [
                          createTextVNode(" Pay at venue ")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  _push2(`</div>`);
                }
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="bg-white rounded-3xl border border-gray-200 shadow-sm p-8"${_scopeId}><div class="flex flex-col sm:flex-row items-center justify-between gap-6"${_scopeId}><div class="text-center sm:text-left"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-2"${_scopeId}>Ready to register?</h3><p class="text-gray-600 text-sm"${_scopeId}>${ssrInterpolate(props.mode === "volunteer" ? "Complete your volunteer registration and join our team!" : "Submit your registration and get ready for the race!")}</p></div>`);
              _push2(ssrRenderComponent(_component_Button, {
                variant: "secondary",
                type: "submit",
                class: "w-full sm:w-auto px-8 py-3 h-12 text-base font-medium",
                disabled: isLoading.value,
                "aria-busy": isLoading.value
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (isLoading.value) {
                      _push3(ssrRenderComponent(unref(Loader2), {
                        size: 20,
                        class: "animate-spin mr-2"
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    if (!isLoading.value) {
                      _push3(`<span${_scopeId2}>${ssrInterpolate(props.mode === "volunteer" ? "Register as Volunteer" : "Register as Runner")}</span>`);
                    } else {
                      _push3(`<span${_scopeId2}>Processing Registration...</span>`);
                    }
                  } else {
                    return [
                      isLoading.value ? (openBlock(), createBlock(unref(Loader2), {
                        key: 0,
                        size: 20,
                        class: "animate-spin mr-2"
                      })) : createCommentVNode("", true),
                      !isLoading.value ? (openBlock(), createBlock("span", { key: 1 }, toDisplayString(props.mode === "volunteer" ? "Register as Volunteer" : "Register as Runner"), 1)) : (openBlock(), createBlock("span", { key: 2 }, "Processing Registration..."))
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              return [
                createVNode("div", { class: "bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden" }, [
                  createVNode("div", { class: "bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200" }, [
                    createVNode("div", { class: "flex items-center gap-3" }, [
                      createVNode("div", { class: "flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600" }, [
                        createVNode(unref(User), { size: 20 })
                      ]),
                      createVNode("div", null, [
                        createVNode("h2", { class: "text-xl font-semibold text-gray-900" }, toDisplayString(props.mode === "volunteer" ? "Volunteer Information" : "Runner Information"), 1),
                        createVNode("p", { class: "text-sm text-gray-600" }, "Tell us about yourself")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "p-8 space-y-6" }, [
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6" }, [
                      createVNode(unref(Field), {
                        name: "first_name",
                        as: "div",
                        class: "space-y-2"
                      }, {
                        default: withCtx(({ field }) => [
                          createVNode(_component_Label, {
                            for: "rf__first_name",
                            class: "text-sm font-medium text-gray-700 flex items-center gap-2"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(User), {
                                size: 16,
                                class: "text-gray-400"
                              }),
                              createTextVNode(" First name ")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_Input, mergeProps({ id: "rf__first_name" }, field, {
                            placeholder: "Enter your first name",
                            autocomplete: "given-name",
                            class: "h-12 text-base"
                          }), null, 16),
                          createVNode(unref(ErrorMessage), { name: "first_name" })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Field), {
                        name: "middle_name",
                        as: "div",
                        class: "space-y-2"
                      }, {
                        default: withCtx(({ field }) => [
                          createVNode(_component_Label, {
                            for: "rf__middle_name",
                            class: "text-sm font-medium text-gray-700"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Middle name "),
                              createVNode("span", { class: "text-gray-400 text-xs" }, "(optional)")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_Input, mergeProps({ id: "rf__middle_name" }, field, {
                            placeholder: "Middle name",
                            class: "h-12 text-base"
                          }), null, 16),
                          createVNode(unref(ErrorMessage), { name: "middle_name" })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Field), {
                        name: "last_name",
                        as: "div",
                        class: "space-y-2"
                      }, {
                        default: withCtx(({ field }) => [
                          createVNode(_component_Label, {
                            for: "rf__last_name",
                            class: "text-sm font-medium text-gray-700"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Last name ")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_Input, mergeProps({ id: "rf__last_name" }, field, {
                            placeholder: "Enter your last name",
                            autocomplete: "family-name",
                            class: "h-12 text-base"
                          }), null, 16),
                          createVNode(unref(ErrorMessage), { name: "last_name" })
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                      createVNode(unref(Field), {
                        name: "email",
                        as: "div",
                        class: "space-y-2"
                      }, {
                        default: withCtx(({ field }) => [
                          createVNode(_component_Label, {
                            for: "rf__email",
                            class: "text-sm font-medium text-gray-700 flex items-center gap-2"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Mail), {
                                size: 16,
                                class: "text-gray-400"
                              }),
                              createTextVNode(" Email address ")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_Input, mergeProps({
                            id: "rf__email",
                            type: "email"
                          }, field, {
                            placeholder: "your.email@example.com",
                            autocomplete: "email",
                            class: "h-12 text-base"
                          }), null, 16),
                          createVNode(unref(ErrorMessage), { name: "email" })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Field), {
                        name: "phone_number",
                        as: "div",
                        class: "space-y-2"
                      }, {
                        default: withCtx(({ field }) => [
                          createVNode(_component_Label, { class: "text-sm font-medium text-gray-700 flex items-center gap-2" }, {
                            default: withCtx(() => [
                              createVNode(unref(Phone), {
                                size: 16,
                                class: "text-gray-400"
                              }),
                              createTextVNode(" Phone number ")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_Input, mergeProps({ type: "tel" }, field, {
                            placeholder: "xxxxxxxxxx",
                            autocomplete: "tel",
                            class: "h-12 text-base"
                          }), null, 16),
                          createVNode(unref(ErrorMessage), { name: "phone_number" })
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                      createVNode(unref(Field), {
                        name: "date_of_birth",
                        as: "div",
                        class: "space-y-2"
                      }, {
                        default: withCtx(({ field }) => [
                          createVNode(_component_Label, { class: "text-sm font-medium text-gray-700 flex items-center gap-2" }, {
                            default: withCtx(() => [
                              createVNode(unref(Calendar), {
                                size: 16,
                                class: "text-gray-400"
                              }),
                              createTextVNode(" Date of birth ")
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$4, {
                            Label: "Select your birth date",
                            "model-value": field.value ? unref(parseDate)(field.value) : void 0,
                            "onUpdate:modelValue": ($event) => $event ? field.onChange($event.toString()) : void 0
                          }, null, 8, ["model-value", "onUpdate:modelValue"]),
                          createVNode(unref(ErrorMessage), { name: "date_of_birth" })
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                      createVNode(unref(Field), {
                        name: "country_id",
                        as: "div",
                        class: "space-y-2"
                      }, {
                        default: withCtx(({ value, handleChange }) => [
                          createVNode(_component_Label, { class: "text-sm font-medium text-gray-700 flex items-center gap-2" }, {
                            default: withCtx(() => [
                              createVNode(unref(Flag), {
                                size: 16,
                                class: "text-gray-400"
                              }),
                              createTextVNode(" Country ")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_Select, {
                            "model-value": String(value != null ? value : ""),
                            "onUpdate:modelValue": handleChange
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_SelectTrigger, { class: "w-full h-12" }, {
                                default: withCtx(() => [
                                  createVNode(_component_SelectValue, { placeholder: "Select country" })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_SelectContent, null, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(countries), (country) => {
                                    return openBlock(), createBlock(_component_SelectItem, {
                                      key: country.id,
                                      value: String(country.id)
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(country.name), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["value"]);
                                  }), 128))
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["model-value", "onUpdate:modelValue"]),
                          createVNode(unref(ErrorMessage), { name: "country_id" })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Field), {
                        name: "gender_id",
                        as: "div",
                        class: "space-y-2"
                      }, {
                        default: withCtx(({ value, handleChange }) => [
                          createVNode(_component_Label, { class: "text-sm font-medium text-gray-700 flex items-center gap-2" }, {
                            default: withCtx(() => [
                              createVNode(unref(Users), {
                                size: 16,
                                class: "text-gray-400"
                              }),
                              createTextVNode(" Gender ")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_Select, {
                            "model-value": value,
                            "onUpdate:modelValue": handleChange
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_SelectTrigger, { class: "w-full h-12" }, {
                                default: withCtx(() => [
                                  createVNode(_component_SelectValue, { placeholder: "Select gender" })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_SelectContent, null, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(genders), (gender) => {
                                    return openBlock(), createBlock(_component_SelectItem, {
                                      key: gender.id,
                                      value: String(gender.id)
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(gender.name), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["value"]);
                                  }), 128))
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["model-value", "onUpdate:modelValue"]),
                          createVNode(unref(ErrorMessage), { name: "gender_id" })
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "flex gap-4" }, [
                      createVNode(unref(Field), {
                        name: "stage_id",
                        as: "div",
                        class: { "space-y-2": true, "w-1/2": __props.mode === "runner", "w-full": __props.mode === "volunteer" }
                      }, {
                        default: withCtx(({ value, handleChange }) => [
                          createVNode(_component_Label, { class: "text-sm font-medium text-gray-700 flex items-center gap-2" }, {
                            default: withCtx(() => [
                              createVNode(unref(Target), {
                                size: 16,
                                class: "text-gray-400"
                              }),
                              createTextVNode(" Stage ")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_Select, {
                            "model-value": value,
                            "onUpdate:modelValue": handleChange
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_SelectTrigger, { class: "w-full h-12 disabled:opacity-50 disabled:cursor-not-allowed" }, {
                                default: withCtx(() => [
                                  createVNode(_component_SelectValue, { placeholder: "Choose your stage" })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_SelectContent, null, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(stageList.value, (s) => {
                                    return openBlock(), createBlock(_component_SelectItem, {
                                      key: s.id,
                                      value: String(s.id)
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(s.name), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["value"]);
                                  }), 128))
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["model-value", "onUpdate:modelValue"]),
                          createVNode(unref(ErrorMessage), { name: "stage_id" })
                        ]),
                        _: 1
                      }, 8, ["class"]),
                      __props.mode === "runner" ? (openBlock(), createBlock(unref(Field), {
                        key: 0,
                        name: "stage_category_id",
                        as: "div",
                        class: "w-1/2 space-y-2"
                      }, {
                        default: withCtx(({ value, handleChange }) => [
                          createVNode(_component_Label, { class: "text-sm font-medium text-gray-700 flex items-center gap-2" }, {
                            default: withCtx(() => [
                              createVNode(unref(Target), {
                                size: 16,
                                class: "text-gray-400"
                              }),
                              createTextVNode(" Stage Category ")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_Select, {
                            "model-value": value,
                            "onUpdate:modelValue": handleChange
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_SelectTrigger, { class: "w-full h-12 disabled:opacity-50 disabled:cursor-not-allowed" }, {
                                default: withCtx(() => {
                                  var _a2, _b2;
                                  return [
                                    createVNode(_component_SelectValue, {
                                      placeholder: ((_b2 = (_a2 = form.value) == null ? void 0 : _a2.values) == null ? void 0 : _b2.stage_id) ? "Choose your stage catgeory" : "Select an stage first"
                                    }, null, 8, ["placeholder"])
                                  ];
                                }),
                                _: 2
                              }, 1024),
                              createVNode(_component_SelectContent, null, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(availabeStageCategoryList.value, (sc) => {
                                    return openBlock(), createBlock(_component_SelectItem, {
                                      key: sc.id,
                                      value: String(sc.id)
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(sc.name), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["value"]);
                                  }), 128))
                                ]),
                                _: 1
                              })
                            ]),
                            _: 2
                          }, 1032, ["model-value", "onUpdate:modelValue"]),
                          createVNode(unref(ErrorMessage), { name: "stage_category_id" })
                        ]),
                        _: 2
                      }, 1024)) : createCommentVNode("", true)
                    ]),
                    __props.mode == "runner" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                      createVNode(unref(Field), {
                        name: "description.club_name",
                        as: "div",
                        class: "space-y-2"
                      }, {
                        default: withCtx(({ field }) => [
                          createVNode(_component_Label, {
                            for: "rf__description.club_name",
                            class: "text-sm font-medium text-gray-700 flex items-center gap-2"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Club name ")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_Input, mergeProps(field, {
                            id: "rf__description.club_name",
                            placeholder: "Name of club you belong to"
                          }), null, 16),
                          createVNode(unref(ErrorMessage), { name: "description.club_name" })
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                        createVNode(unref(Field), {
                          name: "description.emergency_contact_name",
                          as: "div",
                          class: "space-y-2"
                        }, {
                          default: withCtx(({ field }) => [
                            createVNode(_component_Label, {
                              id: "rf__emergency_contact_name",
                              class: "text-sm font-medium text-gray-700 flex items-center gap-2"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Emergency contact name ")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_Input, mergeProps(field, { placeholder: "In case of emergency" }), null, 16),
                            createVNode(unref(ErrorMessage), { name: "description.emergency_contact_name" })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(Field), {
                          name: "description.emergency_contact_phone",
                          as: "div",
                          class: "space-y-2"
                        }, {
                          default: withCtx(({ field }) => [
                            createVNode(_component_Label, {
                              id: "rf__emergency_contact_phone",
                              class: "text-sm font-medium text-gray-700 flex items-center gap-2"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Emergency contact phone ")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_Input, mergeProps(field, { placeholder: "In case of emergency" }), null, 16),
                            createVNode(unref(ErrorMessage), { name: "description.emergency_contact_phone" })
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode(unref(Field), {
                        name: "description.want_lunch",
                        as: "div",
                        class: "space-y-2"
                      }, {
                        default: withCtx(({ value, handleChange }) => [
                          createVNode(_component_Label, {
                            id: "rf__want_lunch",
                            class: "flex items-start gap-2"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_Checkbox, {
                                "model-value": value,
                                "onUpdate:modelValue": handleChange,
                                "default-value": false
                              }, null, 8, ["model-value", "onUpdate:modelValue"]),
                              createVNode("div", { class: "grow flex flex-col gap-2" }, [
                                createVNode("span", { class: "font-medium text-gray-700" }, "I want to order After Race Lunch."),
                                createVNode("em", { class: "text-sm font-light not-italic" }, "Please Note*: Lunch is only provided to those who pre- ordered and pre-paid which is 480 per person and not included in registration fee.")
                              ])
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(ErrorMessage), { name: "description.want_lunch" })
                        ]),
                        _: 1
                      })
                    ], 64)) : createCommentVNode("", true)
                  ])
                ]),
                __props.mode == "runner" && Object.keys(payment.value).length > 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "bg-white text-gray-500 rounded-3xl border border-gray-200 shadow-sm p-8"
                }, [
                  createVNode("h3", { class: "text-2xl font-light mb-2" }, [
                    createTextVNode(" Registration fees for "),
                    createVNode("span", { class: "text-primary font-bold" }, toDisplayString((_e = prices.value) == null ? void 0 : _e.name), 1)
                  ]),
                  !values.payment_method || values.payment_method == "QR" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                    createVNode("div", { class: "flex items-center justify-between gap-6 pb-5" }, [
                      createVNode("div", { class: "grow space-y-3" }, [
                        createVNode("em", { class: "text-gray-600 block not-italic text-2xl" }, "NPR " + toDisplayString((_f = payment.value) == null ? void 0 : _f.amount), 1),
                        createVNode("p", null, "Please make payment to this QR code and upload your screenshot. We verify from the screenshot. We will contact you as soon as possible."),
                        createVNode(_component_Alert, { variant: "info" }, {
                          default: withCtx(() => [
                            createVNode(unref(InfoIcon)),
                            createVNode(_component_AlertTitle, null, {
                              default: withCtx(() => [
                                createTextVNode("Payment")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_AlertDescription, null, {
                              default: withCtx(() => [
                                createTextVNode("If you are international personal, Just upload the screenshot of the conversation. We will handle the payment at venue.")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode("label", { class: "flex items-center gap-2 rounded-lg overflow-hidden border border-gray-200 relative" }, [
                          createVNode("input", {
                            type: "file",
                            onChange: handleFileChange,
                            class: "hidden"
                          }, null, 32),
                          (values == null ? void 0 : values.payment_screenshot) ? (openBlock(), createBlock("figure", { key: 0 }, [
                            createVNode("img", {
                              src: values == null ? void 0 : values.payment_screenshot,
                              alt: "Payment screenshot",
                              class: "w-full h-auto"
                            }, null, 8, ["src"]),
                            createVNode(_component_Button, {
                              class: "absolute top-2 right-2",
                              onClick: ($event) => {
                                var _a2;
                                return (_a2 = form.value) == null ? void 0 : _a2.setFieldValue("payment_screenshot", "");
                              }
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(XIcon), { class: "w-6 h-6" })
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "w-full flex flex-col gap-2 p-4"
                          }, [
                            createVNode("span", { class: "text-sm" }, "You can upload your screenshot here..."),
                            createVNode("p", { class: "text-xs" }, "File size should be less than 2MB")
                          ]))
                        ])
                      ]),
                      createVNode("figure", { class: "w-1/2 text-sm space-y-1 border border-gray-200 p-4 rounded-lg" }, [
                        createVNode("figcaption", null, "Here is the payment QR code"),
                        createVNode("img", {
                          src: unref(showImage)((_h = (_g = payment.value) == null ? void 0 : _g.screenshot) == null ? void 0 : _h.file_name),
                          alt: "Payment screenshot",
                          class: "w-full h-auto"
                        }, null, 8, ["src"])
                      ])
                    ]),
                    createVNode(unref(ErrorMessage), { name: "payment_method" }),
                    createVNode(_component_Separator)
                  ], 64)) : createCommentVNode("", true),
                  values.payment_method === "PAY_AT_VENUE" ? (openBlock(), createBlock("p", { key: 1 }, "Got it! We will remind you to pay cash when you arrive at the event.")) : (openBlock(), createBlock("div", {
                    key: 2,
                    class: "text-center flex flex-col justify-center items-center"
                  }, [
                    createVNode("span", { class: "bg-white text-gray-600 text-lg font-bold uppercase -translate-y-1/2 px-2" }, "Or"),
                    createVNode("p", null, "You can also choose to pay in cash when you arrive at the event."),
                    createVNode(_component_Button, {
                      type: "button",
                      onClick: ($event) => {
                        var _a2;
                        return (_a2 = form.value) == null ? void 0 : _a2.setFieldValue("payment_method", "PAY_AT_VENUE");
                      },
                      class: "mt-2"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Pay at venue ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]))
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "bg-white rounded-3xl border border-gray-200 shadow-sm p-8" }, [
                  createVNode("div", { class: "flex flex-col sm:flex-row items-center justify-between gap-6" }, [
                    createVNode("div", { class: "text-center sm:text-left" }, [
                      createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-2" }, "Ready to register?"),
                      createVNode("p", { class: "text-gray-600 text-sm" }, toDisplayString(props.mode === "volunteer" ? "Complete your volunteer registration and join our team!" : "Submit your registration and get ready for the race!"), 1)
                    ]),
                    createVNode(_component_Button, {
                      variant: "secondary",
                      type: "submit",
                      class: "w-full sm:w-auto px-8 py-3 h-12 text-base font-medium",
                      disabled: isLoading.value,
                      "aria-busy": isLoading.value
                    }, {
                      default: withCtx(() => [
                        isLoading.value ? (openBlock(), createBlock(unref(Loader2), {
                          key: 0,
                          size: 20,
                          class: "animate-spin mr-2"
                        })) : createCommentVNode("", true),
                        !isLoading.value ? (openBlock(), createBlock("span", { key: 1 }, toDisplayString(props.mode === "volunteer" ? "Register as Volunteer" : "Register as Runner"), 1)) : (openBlock(), createBlock("span", { key: 2 }, "Processing Registration..."))
                      ]),
                      _: 1
                    }, 8, ["disabled", "aria-busy"])
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</section>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-gray-50 text-gray-600 text-center border border-gray-300 p-8 rounded-xl" }, _attrs))}> looks like all the stages are completed </div>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/default/races/registrationForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=registrationForm-CbvSHjyF.mjs.map
