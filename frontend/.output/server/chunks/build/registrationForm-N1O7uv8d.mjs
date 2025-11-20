import { _ as _sfc_main$1 } from './Label-jSWrZiLt.mjs';
import { _ as _sfc_main$2 } from './Input-DM54l6M4.mjs';
import { _ as _sfc_main$6, a as _sfc_main$1$1, b as _sfc_main$4, c as _sfc_main$5, d as _sfc_main$4$1 } from './SelectValue-cH59kxAH.mjs';
import { _ as _sfc_main$7 } from './Checkbox-COe6Ah5B.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { parseDate } from '@internationalized/date';
import { storeToRefs } from 'pinia';
import { User, Mail, Phone, Calendar, Flag, Users, Shirt, Target, Loader2 } from 'lucide-vue-next';
import { _ as _sfc_main$3 } from './DatePicker-DwR9bXOV.mjs';
import { d as useAppStore, u as useEventStore, b as useRoute, x as trailRaceRunner, y as trailRaceVolunteer, n as navigateTo } from './server.mjs';
import { _ as _sfc_main$8 } from './Button-BQvwvVGk.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "registrationForm",
  __ssrInlineRender: true,
  props: {
    mode: {},
    trailRace: {}
  },
  setup(__props) {
    const props = __props;
    const { countries, genders, age_categories, shirtSizes } = storeToRefs(useAppStore());
    const { saveVoluteer, saveRunner } = useEventStore();
    const route = useRoute();
    const form = ref(null);
    const isLoading = ref(false);
    const stageOptions = computed(() => props.trailRace.stages);
    const onSubmit = async (values) => {
      isLoading.value = true;
      if (props.mode == "volunteer")
        await saveVoluteer(values, props.trailRace.id);
      else
        await saveRunner(values, props.trailRace.id);
      isLoading.value = false;
      navigateTo(`/races/${route.params.slug}`);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Label = _sfc_main$1;
      const _component_Input = _sfc_main$2;
      const _component_Select = _sfc_main$6;
      const _component_SelectTrigger = _sfc_main$1$1;
      const _component_SelectValue = _sfc_main$4;
      const _component_SelectContent = _sfc_main$5;
      const _component_SelectItem = _sfc_main$4$1;
      const _component_Checkbox = _sfc_main$7;
      const _component_Button = _sfc_main$8;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "max-w-4xl mx-auto p-6 space-y-8" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Form), {
        ref_key: "form",
        ref: form,
        class: "space-y-8",
        "validation-schema": _ctx.mode == "runner" ? unref(trailRaceRunner) : unref(trailRaceVolunteer),
        onSubmit
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
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
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
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
              _: 1
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
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
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
              _: 1
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
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
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
              _: 1
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
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
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
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Field), {
              name: "phone_number",
              as: "div",
              class: "space-y-2"
            }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Label, { class: "text-sm font-medium text-gray-700 flex items-center gap-2" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
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
              _: 1
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
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
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
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    Label: "Select your birth date",
                    "model-value": field.value ? unref(parseDate)(field.value) : void 0,
                    "onUpdate:modelValue": (d) => field.onChange(d ? d.toString() : "")
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
                    createVNode(_sfc_main$3, {
                      Label: "Select your birth date",
                      "model-value": field.value ? unref(parseDate)(field.value) : void 0,
                      "onUpdate:modelValue": (d) => field.onChange(d ? d.toString() : "")
                    }, null, 8, ["model-value", "onUpdate:modelValue"]),
                    createVNode(unref(ErrorMessage), { name: "date_of_birth" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "country_id",
              as: "div",
              class: "space-y-2"
            }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                var _a, _b;
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Label, { class: "text-sm font-medium text-gray-700 flex items-center gap-2" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
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
                    "model-value": String((_a = field.value) != null ? _a : ""),
                    "onUpdate:modelValue": (v) => field.onChange(v)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_SelectTrigger, { class: "w-full h-12" }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
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
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(unref(countries), (country) => {
                                _push5(ssrRenderComponent(_component_SelectItem, {
                                  key: country.id,
                                  value: String(country.id)
                                }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
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
                      "model-value": String((_b = field.value) != null ? _b : ""),
                      "onUpdate:modelValue": (v) => field.onChange(v)
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
                      _: 2
                    }, 1032, ["model-value", "onUpdate:modelValue"]),
                    createVNode(unref(ErrorMessage), { name: "country_id" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Field), {
              name: "gender_id",
              as: "div",
              class: "space-y-2"
            }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                var _a, _b;
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Label, { class: "text-sm font-medium text-gray-700 flex items-center gap-2" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
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
                    "model-value": String((_a = field.value) != null ? _a : ""),
                    "onUpdate:modelValue": (v) => field.onChange(v)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_SelectTrigger, { class: "w-full h-12" }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
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
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(unref(genders), (gender) => {
                                _push5(ssrRenderComponent(_component_SelectItem, {
                                  key: gender.id,
                                  value: String(gender.id)
                                }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
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
                      "model-value": String((_b = field.value) != null ? _b : ""),
                      "onUpdate:modelValue": (v) => field.onChange(v)
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
                      _: 2
                    }, 1032, ["model-value", "onUpdate:modelValue"]),
                    createVNode(unref(ErrorMessage), { name: "gender_id" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Field), {
              name: "size_id",
              as: "div",
              class: "space-y-2"
            }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                var _a, _b;
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Label, { class: "text-sm font-medium text-gray-700 flex items-center gap-2" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Shirt), {
                          size: 16,
                          class: "text-gray-400"
                        }, null, _parent4, _scopeId3));
                        _push4(` Shirt size `);
                      } else {
                        return [
                          createVNode(unref(Shirt), {
                            size: 16,
                            class: "text-gray-400"
                          }),
                          createTextVNode(" Shirt size ")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Select, {
                    "model-value": String((_a = field.value) != null ? _a : ""),
                    "onUpdate:modelValue": (v) => field.onChange(v)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_SelectTrigger, { class: "w-full h-12" }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_SelectValue, { placeholder: "Size" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_SelectValue, { placeholder: "Size" })
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_SelectContent, null, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(unref(shirtSizes), (s) => {
                                _push5(ssrRenderComponent(_component_SelectItem, {
                                  key: s.id,
                                  value: s.id
                                }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
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
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(shirtSizes), (s) => {
                                  return openBlock(), createBlock(_component_SelectItem, {
                                    key: s.id,
                                    value: s.id
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
                          createVNode(_component_SelectTrigger, { class: "w-full h-12" }, {
                            default: withCtx(() => [
                              createVNode(_component_SelectValue, { placeholder: "Size" })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_SelectContent, null, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(shirtSizes), (s) => {
                                return openBlock(), createBlock(_component_SelectItem, {
                                  key: s.id,
                                  value: s.id
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
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "size_id" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Label, { class: "text-sm font-medium text-gray-700 flex items-center gap-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(Shirt), {
                          size: 16,
                          class: "text-gray-400"
                        }),
                        createTextVNode(" Shirt size ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Select, {
                      "model-value": String((_b = field.value) != null ? _b : ""),
                      "onUpdate:modelValue": (v) => field.onChange(v)
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_SelectTrigger, { class: "w-full h-12" }, {
                          default: withCtx(() => [
                            createVNode(_component_SelectValue, { placeholder: "Size" })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_SelectContent, null, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(shirtSizes), (s) => {
                              return openBlock(), createBlock(_component_SelectItem, {
                                key: s.id,
                                value: s.id
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
                      _: 2
                    }, 1032, ["model-value", "onUpdate:modelValue"]),
                    createVNode(unref(ErrorMessage), { name: "size_id" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Field), {
              name: "age_category_id",
              as: "div",
              class: "space-y-2"
            }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                var _a, _b;
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Label, { class: "text-sm font-medium text-gray-700 flex items-center gap-2" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Users), {
                          size: 16,
                          class: "text-gray-400"
                        }, null, _parent4, _scopeId3));
                        _push4(` Age group `);
                      } else {
                        return [
                          createVNode(unref(Users), {
                            size: 16,
                            class: "text-gray-400"
                          }),
                          createTextVNode(" Age group ")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Select, {
                    "model-value": String((_a = field.value) != null ? _a : ""),
                    "onUpdate:modelValue": (v) => field.onChange(v)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_SelectTrigger, { class: "w-full h-12" }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_SelectValue, { placeholder: "Age group" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_SelectValue, { placeholder: "Age group" })
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_SelectContent, null, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(unref(age_categories), (ageCategory) => {
                                _push5(ssrRenderComponent(_component_SelectItem, {
                                  key: ageCategory.id,
                                  value: String(ageCategory.id)
                                }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(ageCategory.name)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(ageCategory.name), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(age_categories), (ageCategory) => {
                                  return openBlock(), createBlock(_component_SelectItem, {
                                    key: ageCategory.id,
                                    value: String(ageCategory.id)
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(ageCategory.name), 1)
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
                              createVNode(_component_SelectValue, { placeholder: "Age group" })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_SelectContent, null, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(age_categories), (ageCategory) => {
                                return openBlock(), createBlock(_component_SelectItem, {
                                  key: ageCategory.id,
                                  value: String(ageCategory.id)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(ageCategory.name), 1)
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
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "age_category_id" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Label, { class: "text-sm font-medium text-gray-700 flex items-center gap-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(Users), {
                          size: 16,
                          class: "text-gray-400"
                        }),
                        createTextVNode(" Age group ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Select, {
                      "model-value": String((_b = field.value) != null ? _b : ""),
                      "onUpdate:modelValue": (v) => field.onChange(v)
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_SelectTrigger, { class: "w-full h-12" }, {
                          default: withCtx(() => [
                            createVNode(_component_SelectValue, { placeholder: "Age group" })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_SelectContent, null, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(age_categories), (ageCategory) => {
                              return openBlock(), createBlock(_component_SelectItem, {
                                key: ageCategory.id,
                                value: String(ageCategory.id)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(ageCategory.name), 1)
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
                    createVNode(unref(ErrorMessage), { name: "age_category_id" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "stage_id",
              as: "div",
              class: "space-y-2"
            }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                var _a, _b;
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Label, { class: "text-sm font-medium text-gray-700 flex items-center gap-2" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
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
                    "model-value": String((_a = field.value) != null ? _a : ""),
                    "onUpdate:modelValue": (v) => field.onChange(v)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_SelectTrigger, { class: "w-full h-12 disabled:opacity-50 disabled:cursor-not-allowed" }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            var _a2, _b2, _c, _d;
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_SelectValue, {
                                placeholder: ((_b2 = (_a2 = form.value) == null ? void 0 : _a2.values) == null ? void 0 : _b2.event_id) ? "Choose your stage" : "Select an event first"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_SelectValue, {
                                  placeholder: ((_d = (_c = form.value) == null ? void 0 : _c.values) == null ? void 0 : _d.event_id) ? "Choose your stage" : "Select an event first"
                                }, null, 8, ["placeholder"])
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_SelectContent, null, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(stageOptions.value, (s) => {
                                _push5(ssrRenderComponent(_component_SelectItem, {
                                  key: s.id,
                                  value: String(s.id)
                                }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
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
                                (openBlock(true), createBlock(Fragment, null, renderList(stageOptions.value, (s) => {
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
                            default: withCtx(() => {
                              var _a2, _b2;
                              return [
                                createVNode(_component_SelectValue, {
                                  placeholder: ((_b2 = (_a2 = form.value) == null ? void 0 : _a2.values) == null ? void 0 : _b2.event_id) ? "Choose your stage" : "Select an event first"
                                }, null, 8, ["placeholder"])
                              ];
                            }),
                            _: 1
                          }),
                          createVNode(_component_SelectContent, null, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(stageOptions.value, (s) => {
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
                      "model-value": String((_b = field.value) != null ? _b : ""),
                      "onUpdate:modelValue": (v) => field.onChange(v)
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_SelectTrigger, { class: "w-full h-12 disabled:opacity-50 disabled:cursor-not-allowed" }, {
                          default: withCtx(() => {
                            var _a2, _b2;
                            return [
                              createVNode(_component_SelectValue, {
                                placeholder: ((_b2 = (_a2 = form.value) == null ? void 0 : _a2.values) == null ? void 0 : _b2.event_id) ? "Choose your stage" : "Select an event first"
                              }, null, 8, ["placeholder"])
                            ];
                          }),
                          _: 1
                        }),
                        createVNode(_component_SelectContent, null, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(stageOptions.value, (s) => {
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
                      _: 2
                    }, 1032, ["model-value", "onUpdate:modelValue"]),
                    createVNode(unref(ErrorMessage), { name: "stage_id" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (_ctx.mode == "runner") {
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
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
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
                _: 1
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
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
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
                _: 1
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
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
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
                _: 1
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
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
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
                _: 1
              }, _parent2, _scopeId));
              _push2(`<!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="bg-white rounded-3xl border border-gray-200 shadow-sm p-8"${_scopeId}><div class="flex flex-col sm:flex-row items-center justify-between gap-6"${_scopeId}><div class="text-center sm:text-left"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-2"${_scopeId}>Ready to register?</h3><p class="text-gray-600 text-sm"${_scopeId}>${ssrInterpolate(props.mode === "volunteer" ? "Complete your volunteer registration and join our team!" : "Submit your registration and get ready for the race!")}</p></div>`);
            _push2(ssrRenderComponent(_component_Button, {
              variant: "secondary",
              type: "submit",
              class: "w-full sm:w-auto px-8 py-3 h-12 text-base font-medium",
              disabled: isLoading.value,
              "aria-busy": isLoading.value
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
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
              _: 1
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
                        createVNode(_sfc_main$3, {
                          Label: "Select your birth date",
                          "model-value": field.value ? unref(parseDate)(field.value) : void 0,
                          "onUpdate:modelValue": (d) => field.onChange(d ? d.toString() : "")
                        }, null, 8, ["model-value", "onUpdate:modelValue"]),
                        createVNode(unref(ErrorMessage), { name: "date_of_birth" })
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" }, [
                    createVNode(unref(Field), {
                      name: "country_id",
                      as: "div",
                      class: "space-y-2"
                    }, {
                      default: withCtx(({ field }) => {
                        var _a;
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
                            "model-value": String((_a = field.value) != null ? _a : ""),
                            "onUpdate:modelValue": (v) => field.onChange(v)
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
                            _: 2
                          }, 1032, ["model-value", "onUpdate:modelValue"]),
                          createVNode(unref(ErrorMessage), { name: "country_id" })
                        ];
                      }),
                      _: 1
                    }),
                    createVNode(unref(Field), {
                      name: "gender_id",
                      as: "div",
                      class: "space-y-2"
                    }, {
                      default: withCtx(({ field }) => {
                        var _a;
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
                            "model-value": String((_a = field.value) != null ? _a : ""),
                            "onUpdate:modelValue": (v) => field.onChange(v)
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
                            _: 2
                          }, 1032, ["model-value", "onUpdate:modelValue"]),
                          createVNode(unref(ErrorMessage), { name: "gender_id" })
                        ];
                      }),
                      _: 1
                    }),
                    createVNode(unref(Field), {
                      name: "size_id",
                      as: "div",
                      class: "space-y-2"
                    }, {
                      default: withCtx(({ field }) => {
                        var _a;
                        return [
                          createVNode(_component_Label, { class: "text-sm font-medium text-gray-700 flex items-center gap-2" }, {
                            default: withCtx(() => [
                              createVNode(unref(Shirt), {
                                size: 16,
                                class: "text-gray-400"
                              }),
                              createTextVNode(" Shirt size ")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_Select, {
                            "model-value": String((_a = field.value) != null ? _a : ""),
                            "onUpdate:modelValue": (v) => field.onChange(v)
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_SelectTrigger, { class: "w-full h-12" }, {
                                default: withCtx(() => [
                                  createVNode(_component_SelectValue, { placeholder: "Size" })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_SelectContent, null, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(shirtSizes), (s) => {
                                    return openBlock(), createBlock(_component_SelectItem, {
                                      key: s.id,
                                      value: s.id
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
                            _: 2
                          }, 1032, ["model-value", "onUpdate:modelValue"]),
                          createVNode(unref(ErrorMessage), { name: "size_id" })
                        ];
                      }),
                      _: 1
                    }),
                    createVNode(unref(Field), {
                      name: "age_category_id",
                      as: "div",
                      class: "space-y-2"
                    }, {
                      default: withCtx(({ field }) => {
                        var _a;
                        return [
                          createVNode(_component_Label, { class: "text-sm font-medium text-gray-700 flex items-center gap-2" }, {
                            default: withCtx(() => [
                              createVNode(unref(Users), {
                                size: 16,
                                class: "text-gray-400"
                              }),
                              createTextVNode(" Age group ")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_Select, {
                            "model-value": String((_a = field.value) != null ? _a : ""),
                            "onUpdate:modelValue": (v) => field.onChange(v)
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_SelectTrigger, { class: "w-full h-12" }, {
                                default: withCtx(() => [
                                  createVNode(_component_SelectValue, { placeholder: "Age group" })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_SelectContent, null, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(age_categories), (ageCategory) => {
                                    return openBlock(), createBlock(_component_SelectItem, {
                                      key: ageCategory.id,
                                      value: String(ageCategory.id)
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(ageCategory.name), 1)
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
                          createVNode(unref(ErrorMessage), { name: "age_category_id" })
                        ];
                      }),
                      _: 1
                    })
                  ]),
                  createVNode(unref(Field), {
                    name: "stage_id",
                    as: "div",
                    class: "space-y-2"
                  }, {
                    default: withCtx(({ field }) => {
                      var _a;
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
                          "model-value": String((_a = field.value) != null ? _a : ""),
                          "onUpdate:modelValue": (v) => field.onChange(v)
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_SelectTrigger, { class: "w-full h-12 disabled:opacity-50 disabled:cursor-not-allowed" }, {
                              default: withCtx(() => {
                                var _a2, _b;
                                return [
                                  createVNode(_component_SelectValue, {
                                    placeholder: ((_b = (_a2 = form.value) == null ? void 0 : _a2.values) == null ? void 0 : _b.event_id) ? "Choose your stage" : "Select an event first"
                                  }, null, 8, ["placeholder"])
                                ];
                              }),
                              _: 1
                            }),
                            createVNode(_component_SelectContent, null, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(stageOptions.value, (s) => {
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
                          _: 2
                        }, 1032, ["model-value", "onUpdate:modelValue"]),
                        createVNode(unref(ErrorMessage), { name: "stage_id" })
                      ];
                    }),
                    _: 1
                  }),
                  _ctx.mode == "runner" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
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
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/dashboard/event/races/registrationForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=registrationForm-N1O7uv8d.mjs.map
