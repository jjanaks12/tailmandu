import { _ as _sfc_main$1 } from './Label-jSWrZiLt.mjs';
import { _ as _sfc_main$2 } from './Input-DM54l6M4.mjs';
import { _ as _sfc_main$6, a as _sfc_main$1$1, b as _sfc_main$4, c as _sfc_main$5, d as _sfc_main$4$1 } from './SelectValue-cH59kxAH.mjs';
import { _ as _sfc_main$7 } from './index-fXRoVOws.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { parseDate } from '@internationalized/date';
import { storeToRefs, defineStore } from 'pinia';
import { User, Mail, Phone, Calendar, MapPin, Users, Shirt, Flag, Target, Loader2, CheckCircle, AlertCircle } from 'lucide-vue-next';
import { _ as _sfc_main$3 } from './DatePicker-BUMac20k.mjs';
import { c as useAppStore, u as useEventStore } from './server.mjs';
import { t as trailRaceRunner } from './event.schema-7vZus5g4.mjs';

const useRegistrationStore = defineStore("registration", () => {
  const isLoading = ref(false);
  const okMsg = ref("");
  const errMsg = ref("");
  const buildPersonal = (v) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return {
      first_name: (_a = v.first_name) != null ? _a : null,
      middle_name: (_b = v.middle_name) != null ? _b : null,
      last_name: (_c = v.last_name) != null ? _c : null,
      email: v.email,
      phone_number: (_d = v.phone_number) != null ? _d : null,
      date_of_birth: v.date_of_birth,
      country_id: (_e = v.country_id) != null ? _e : null,
      gender_id: (_f = v.gender_id) != null ? _f : null,
      size_id: (_g = v.size_id) != null ? _g : null,
      age_category_id: (_h = v.age_category_id) != null ? _h : null
    };
  };
  const submit = async (mode, values) => {
    var _a;
    okMsg.value = "";
    errMsg.value = "";
    isLoading.value = true;
    try {
      if (mode === "volunteer") {
        const personal = buildPersonal(values);
        okMsg.value = `Registered as Volunteer (${personal.email})`;
        return { personal };
      } else {
        const payload = {
          personal: buildPersonal(values),
          runner: {
            event_id: values.event_id,
            stage_id: values.stage_id
          }
        };
        okMsg.value = `Registered as Runner (${payload.personal.email})`;
        return payload;
      }
    } catch (e) {
      errMsg.value = ((_a = e == null ? void 0 : e.data) == null ? void 0 : _a.statusMessage) || (e == null ? void 0 : e.message) || "Registration failed";
      throw e;
    } finally {
      isLoading.value = false;
    }
  };
  return { isLoading, okMsg, errMsg, submit };
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "RegistrationForm",
  __ssrInlineRender: true,
  props: {
    mode: {}
  },
  setup(__props) {
    const props = __props;
    const app = useAppStore();
    const { countries, genders, age_categories } = storeToRefs(app);
    const eventStore = useEventStore();
    const { events } = storeToRefs(eventStore);
    const reg = useRegistrationStore();
    const { isLoading, okMsg, errMsg } = storeToRefs(reg);
    const form = ref(null);
    const sizes = [
      { id: "xs", name: "XS" },
      { id: "s", name: "S" },
      { id: "m", name: "M" },
      { id: "l", name: "L" },
      { id: "xl", name: "XL" }
    ];
    const eventOptions = computed(
      () => (events.value || []).map((e) => ({ id: String(e.id), name: e.name }))
    );
    const stageOptions = computed(() => {
      var _a, _b, _c, _d, _e;
      const selectedId = (_b = (_a = form.value) == null ? void 0 : _a.values) == null ? void 0 : _b.event_id;
      const ev = (events.value || []).find((e) => String(e.id) === String(selectedId));
      const stages = (_e = (_d = ev == null ? void 0 : ev.stages) != null ? _d : (_c = ev == null ? void 0 : ev.data) == null ? void 0 : _c.stages) != null ? _e : [];
      return stages.map((s) => ({ id: String(s.id), name: s.name }));
    });
    const initialValues = {
      first_name: "",
      middle_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      country_id: "",
      gender_id: "",
      size_id: "",
      age_category_id: "",
      date_of_birth: "",
      event_id: "",
      stage_id: ""
    };
    const onSubmit = async (values) => {
      const result = await reg.submit(props.mode, values);
      console.log(props.mode === "volunteer" ? "VOLUNTEER PAYLOAD" : "RUNNER PAYLOAD", result);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Label = _sfc_main$1;
      const _component_Input = _sfc_main$2;
      const _component_Select = _sfc_main$6;
      const _component_SelectTrigger = _sfc_main$1$1;
      const _component_SelectValue = _sfc_main$4;
      const _component_SelectContent = _sfc_main$5;
      const _component_SelectItem = _sfc_main$4$1;
      const _component_Button = _sfc_main$7;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "max-w-4xl mx-auto p-6 space-y-8" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Form), {
        ref_key: "form",
        ref: form,
        class: "space-y-8",
        "initial-values": initialValues,
        "validation-schema": unref(trailRaceRunner),
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
                    for: "first_name",
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
                  _push3(ssrRenderComponent(_component_Input, mergeProps({ id: "first_name" }, field, {
                    placeholder: "Enter your first name",
                    autocomplete: "given-name",
                    class: "h-12 text-base"
                  }), null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "first_name" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Label, {
                      for: "first_name",
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
                    createVNode(_component_Input, mergeProps({ id: "first_name" }, field, {
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
                    for: "middle_name",
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
                  _push3(ssrRenderComponent(_component_Input, mergeProps({ id: "middle_name" }, field, {
                    placeholder: "Middle name",
                    class: "h-12 text-base"
                  }), null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "middle_name" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Label, {
                      for: "middle_name",
                      class: "text-sm font-medium text-gray-700"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Middle name "),
                        createVNode("span", { class: "text-gray-400 text-xs" }, "(optional)")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Input, mergeProps({ id: "middle_name" }, field, {
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
                    for: "last_name",
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
                  _push3(ssrRenderComponent(_component_Input, mergeProps({ id: "last_name" }, field, {
                    placeholder: "Enter your last name",
                    autocomplete: "family-name",
                    class: "h-12 text-base"
                  }), null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "last_name" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Label, {
                      for: "last_name",
                      class: "text-sm font-medium text-gray-700"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Last name ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Input, mergeProps({ id: "last_name" }, field, {
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
                    for: "email",
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
                    id: "email",
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
                      for: "email",
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
                      id: "email",
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
                  _push3(ssrRenderComponent(_component_Label, {
                    for: "phone_number",
                    class: "text-sm font-medium text-gray-700 flex items-center gap-2"
                  }, {
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
                  _push3(ssrRenderComponent(_component_Input, mergeProps({
                    id: "phone_number",
                    type: "tel"
                  }, field, {
                    placeholder: "xxxxxxxxxx",
                    autocomplete: "tel",
                    class: "h-12 text-base"
                  }), null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "phone_number" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Label, {
                      for: "phone_number",
                      class: "text-sm font-medium text-gray-700 flex items-center gap-2"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Phone), {
                          size: 16,
                          class: "text-gray-400"
                        }),
                        createTextVNode(" Phone number ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Input, mergeProps({
                      id: "phone_number",
                      type: "tel"
                    }, field, {
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
                  _push3(ssrRenderComponent(_component_Label, {
                    for: "date_of_birth",
                    class: "text-sm font-medium text-gray-700 flex items-center gap-2"
                  }, {
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
                    createVNode(_component_Label, {
                      for: "date_of_birth",
                      class: "text-sm font-medium text-gray-700 flex items-center gap-2"
                    }, {
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
                  _push3(ssrRenderComponent(_component_Label, {
                    for: "country_id",
                    class: "text-sm font-medium text-gray-700 flex items-center gap-2"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(MapPin), {
                          size: 16,
                          class: "text-gray-400"
                        }, null, _parent4, _scopeId3));
                        _push4(` Country `);
                      } else {
                        return [
                          createVNode(unref(MapPin), {
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
                    id: "country_id",
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
                    createVNode(_component_Label, {
                      for: "country_id",
                      class: "text-sm font-medium text-gray-700 flex items-center gap-2"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(MapPin), {
                          size: 16,
                          class: "text-gray-400"
                        }),
                        createTextVNode(" Country ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Select, {
                      id: "country_id",
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
                  _push3(ssrRenderComponent(_component_Label, {
                    for: "gender_id",
                    class: "text-sm font-medium text-gray-700 flex items-center gap-2"
                  }, {
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
                    id: "gender_id",
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
                    createVNode(_component_Label, {
                      for: "gender_id",
                      class: "text-sm font-medium text-gray-700 flex items-center gap-2"
                    }, {
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
                      id: "gender_id",
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
                  _push3(ssrRenderComponent(_component_Label, {
                    for: "size_id",
                    class: "text-sm font-medium text-gray-700 flex items-center gap-2"
                  }, {
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
                    id: "size_id",
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
                              ssrRenderList(sizes, (s) => {
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
                                (openBlock(), createBlock(Fragment, null, renderList(sizes, (s) => {
                                  return createVNode(_component_SelectItem, {
                                    key: s.id,
                                    value: String(s.id)
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(s.name), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 64))
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
                              (openBlock(), createBlock(Fragment, null, renderList(sizes, (s) => {
                                return createVNode(_component_SelectItem, {
                                  key: s.id,
                                  value: String(s.id)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(s.name), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["value"]);
                              }), 64))
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
                    createVNode(_component_Label, {
                      for: "size_id",
                      class: "text-sm font-medium text-gray-700 flex items-center gap-2"
                    }, {
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
                      id: "size_id",
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
                            (openBlock(), createBlock(Fragment, null, renderList(sizes, (s) => {
                              return createVNode(_component_SelectItem, {
                                key: s.id,
                                value: String(s.id)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(s.name), 1)
                                ]),
                                _: 2
                              }, 1032, ["value"]);
                            }), 64))
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
                  _push3(ssrRenderComponent(_component_Label, {
                    for: "age_category_id",
                    class: "text-sm font-medium text-gray-700 flex items-center gap-2"
                  }, {
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
                    id: "age_category_id",
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
                    createVNode(_component_Label, {
                      for: "age_category_id",
                      class: "text-sm font-medium text-gray-700 flex items-center gap-2"
                    }, {
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
                      id: "age_category_id",
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
            if (props.mode === "runner") {
              _push2(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Field), {
                name: "event_id",
                as: "div",
                class: "space-y-2"
              }, {
                default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                  var _a, _b;
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Label, {
                      for: "event_id",
                      class: "text-sm font-medium text-gray-700 flex items-center gap-2"
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Flag), {
                            size: 16,
                            class: "text-gray-400"
                          }, null, _parent4, _scopeId3));
                          _push4(` Event `);
                        } else {
                          return [
                            createVNode(unref(Flag), {
                              size: 16,
                              class: "text-gray-400"
                            }),
                            createTextVNode(" Event ")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Select, {
                      id: "event_id",
                      "model-value": String((_a = field.value) != null ? _a : ""),
                      "onUpdate:modelValue": (v) => field.onChange(v)
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_SelectTrigger, { class: "w-full h-12" }, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_SelectValue, { placeholder: "Choose your event" }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_SelectValue, { placeholder: "Choose your event" })
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_SelectContent, null, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(eventOptions.value, (e) => {
                                  _push5(ssrRenderComponent(_component_SelectItem, {
                                    key: e.id,
                                    value: String(e.id)
                                  }, {
                                    default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(e.name)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(e.name), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(true), createBlock(Fragment, null, renderList(eventOptions.value, (e) => {
                                    return openBlock(), createBlock(_component_SelectItem, {
                                      key: e.id,
                                      value: String(e.id)
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(e.name), 1)
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
                                createVNode(_component_SelectValue, { placeholder: "Choose your event" })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_SelectContent, null, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(eventOptions.value, (e) => {
                                  return openBlock(), createBlock(_component_SelectItem, {
                                    key: e.id,
                                    value: String(e.id)
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(e.name), 1)
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
                    _push3(ssrRenderComponent(unref(ErrorMessage), { name: "event_id" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_Label, {
                        for: "event_id",
                        class: "text-sm font-medium text-gray-700 flex items-center gap-2"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Flag), {
                            size: 16,
                            class: "text-gray-400"
                          }),
                          createTextVNode(" Event ")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Select, {
                        id: "event_id",
                        "model-value": String((_b = field.value) != null ? _b : ""),
                        "onUpdate:modelValue": (v) => field.onChange(v)
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_SelectTrigger, { class: "w-full h-12" }, {
                            default: withCtx(() => [
                              createVNode(_component_SelectValue, { placeholder: "Choose your event" })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_SelectContent, null, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(eventOptions.value, (e) => {
                                return openBlock(), createBlock(_component_SelectItem, {
                                  key: e.id,
                                  value: String(e.id)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(e.name), 1)
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
                      createVNode(unref(ErrorMessage), { name: "event_id" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(Field), {
                name: "stage_id",
                as: "div",
                class: "space-y-2"
              }, {
                default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                  var _a, _b, _c, _d, _e, _f;
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Label, {
                      for: "stage_id",
                      class: "text-sm font-medium text-gray-700 flex items-center gap-2"
                    }, {
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
                      id: "stage_id",
                      disabled: !((_b = (_a = form.value) == null ? void 0 : _a.values) == null ? void 0 : _b.event_id),
                      "model-value": String((_c = field.value) != null ? _c : ""),
                      "onUpdate:modelValue": (v) => field.onChange(v)
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_SelectTrigger, { class: "w-full h-12 disabled:opacity-50 disabled:cursor-not-allowed" }, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              var _a2, _b2, _c2, _d2;
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_SelectValue, {
                                  placeholder: ((_b2 = (_a2 = form.value) == null ? void 0 : _a2.values) == null ? void 0 : _b2.event_id) ? "Choose your stage" : "Select an event first"
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_SelectValue, {
                                    placeholder: ((_d2 = (_c2 = form.value) == null ? void 0 : _c2.values) == null ? void 0 : _d2.event_id) ? "Choose your stage" : "Select an event first"
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
                      createVNode(_component_Label, {
                        for: "stage_id",
                        class: "text-sm font-medium text-gray-700 flex items-center gap-2"
                      }, {
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
                        id: "stage_id",
                        disabled: !((_e = (_d = form.value) == null ? void 0 : _d.values) == null ? void 0 : _e.event_id),
                        "model-value": String((_f = field.value) != null ? _f : ""),
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
                      }, 1032, ["disabled", "model-value", "onUpdate:modelValue"]),
                      createVNode(unref(ErrorMessage), { name: "stage_id" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="bg-white rounded-3xl border border-gray-200 shadow-sm p-8"${_scopeId}><div class="flex flex-col sm:flex-row items-center justify-between gap-6"${_scopeId}><div class="text-center sm:text-left"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-2"${_scopeId}>Ready to register?</h3><p class="text-gray-600 text-sm"${_scopeId}>${ssrInterpolate(props.mode === "volunteer" ? "Complete your volunteer registration and join our team!" : "Submit your registration and get ready for the race!")}</p></div>`);
            _push2(ssrRenderComponent(_component_Button, {
              variant: "default",
              type: "submit",
              class: "w-full sm:w-auto px-8 py-3 h-12 text-base font-medium",
              disabled: unref(isLoading),
              "aria-busy": unref(isLoading)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(isLoading)) {
                    _push3(ssrRenderComponent(unref(Loader2), {
                      size: 20,
                      class: "animate-spin mr-2"
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (!unref(isLoading)) {
                    _push3(`<span${_scopeId2}>${ssrInterpolate(props.mode === "volunteer" ? "Register as Volunteer" : "Register as Runner")}</span>`);
                  } else {
                    _push3(`<span${_scopeId2}>Processing Registration...</span>`);
                  }
                } else {
                  return [
                    unref(isLoading) ? (openBlock(), createBlock(unref(Loader2), {
                      key: 0,
                      size: 20,
                      class: "animate-spin mr-2"
                    })) : createCommentVNode("", true),
                    !unref(isLoading) ? (openBlock(), createBlock("span", { key: 1 }, toDisplayString(props.mode === "volunteer" ? "Register as Volunteer" : "Register as Runner"), 1)) : (openBlock(), createBlock("span", { key: 2 }, "Processing Registration..."))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (unref(okMsg) || unref(errMsg)) {
              _push2(`<div class="mt-6 pt-6 border-t border-gray-200"${_scopeId}>`);
              if (unref(okMsg)) {
                _push2(`<div class="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-xl border border-green-200"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(CheckCircle), { size: 20 }, null, _parent2, _scopeId));
                _push2(`<span class="font-medium"${_scopeId}>${ssrInterpolate(unref(okMsg))}</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(errMsg)) {
                _push2(`<div class="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl border border-red-200"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(AlertCircle), { size: 20 }, null, _parent2, _scopeId));
                _push2(`<span class="font-medium"${_scopeId}>${ssrInterpolate(unref(errMsg))}</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
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
                          for: "first_name",
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
                        createVNode(_component_Input, mergeProps({ id: "first_name" }, field, {
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
                          for: "middle_name",
                          class: "text-sm font-medium text-gray-700"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Middle name "),
                            createVNode("span", { class: "text-gray-400 text-xs" }, "(optional)")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_Input, mergeProps({ id: "middle_name" }, field, {
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
                          for: "last_name",
                          class: "text-sm font-medium text-gray-700"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Last name ")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_Input, mergeProps({ id: "last_name" }, field, {
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
                          for: "email",
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
                          id: "email",
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
                        createVNode(_component_Label, {
                          for: "phone_number",
                          class: "text-sm font-medium text-gray-700 flex items-center gap-2"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Phone), {
                              size: 16,
                              class: "text-gray-400"
                            }),
                            createTextVNode(" Phone number ")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_Input, mergeProps({
                          id: "phone_number",
                          type: "tel"
                        }, field, {
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
                        createVNode(_component_Label, {
                          for: "date_of_birth",
                          class: "text-sm font-medium text-gray-700 flex items-center gap-2"
                        }, {
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
                          createVNode(_component_Label, {
                            for: "country_id",
                            class: "text-sm font-medium text-gray-700 flex items-center gap-2"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(MapPin), {
                                size: 16,
                                class: "text-gray-400"
                              }),
                              createTextVNode(" Country ")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_Select, {
                            id: "country_id",
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
                          createVNode(_component_Label, {
                            for: "gender_id",
                            class: "text-sm font-medium text-gray-700 flex items-center gap-2"
                          }, {
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
                            id: "gender_id",
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
                          createVNode(_component_Label, {
                            for: "size_id",
                            class: "text-sm font-medium text-gray-700 flex items-center gap-2"
                          }, {
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
                            id: "size_id",
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
                                  (openBlock(), createBlock(Fragment, null, renderList(sizes, (s) => {
                                    return createVNode(_component_SelectItem, {
                                      key: s.id,
                                      value: String(s.id)
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(s.name), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["value"]);
                                  }), 64))
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
                          createVNode(_component_Label, {
                            for: "age_category_id",
                            class: "text-sm font-medium text-gray-700 flex items-center gap-2"
                          }, {
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
                            id: "age_category_id",
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
                  props.mode === "runner" ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "grid grid-cols-1 md:grid-cols-2 gap-6"
                  }, [
                    createVNode(unref(Field), {
                      name: "event_id",
                      as: "div",
                      class: "space-y-2"
                    }, {
                      default: withCtx(({ field }) => {
                        var _a;
                        return [
                          createVNode(_component_Label, {
                            for: "event_id",
                            class: "text-sm font-medium text-gray-700 flex items-center gap-2"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Flag), {
                                size: 16,
                                class: "text-gray-400"
                              }),
                              createTextVNode(" Event ")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_Select, {
                            id: "event_id",
                            "model-value": String((_a = field.value) != null ? _a : ""),
                            "onUpdate:modelValue": (v) => field.onChange(v)
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_SelectTrigger, { class: "w-full h-12" }, {
                                default: withCtx(() => [
                                  createVNode(_component_SelectValue, { placeholder: "Choose your event" })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_SelectContent, null, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(eventOptions.value, (e) => {
                                    return openBlock(), createBlock(_component_SelectItem, {
                                      key: e.id,
                                      value: String(e.id)
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(e.name), 1)
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
                          createVNode(unref(ErrorMessage), { name: "event_id" })
                        ];
                      }),
                      _: 1
                    }),
                    createVNode(unref(Field), {
                      name: "stage_id",
                      as: "div",
                      class: "space-y-2"
                    }, {
                      default: withCtx(({ field }) => {
                        var _a, _b, _c;
                        return [
                          createVNode(_component_Label, {
                            for: "stage_id",
                            class: "text-sm font-medium text-gray-700 flex items-center gap-2"
                          }, {
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
                            id: "stage_id",
                            disabled: !((_b = (_a = form.value) == null ? void 0 : _a.values) == null ? void 0 : _b.event_id),
                            "model-value": String((_c = field.value) != null ? _c : ""),
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
                          }, 1032, ["disabled", "model-value", "onUpdate:modelValue"]),
                          createVNode(unref(ErrorMessage), { name: "stage_id" })
                        ];
                      }),
                      _: 1
                    })
                  ])) : createCommentVNode("", true)
                ])
              ]),
              createVNode("div", { class: "bg-white rounded-3xl border border-gray-200 shadow-sm p-8" }, [
                createVNode("div", { class: "flex flex-col sm:flex-row items-center justify-between gap-6" }, [
                  createVNode("div", { class: "text-center sm:text-left" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-2" }, "Ready to register?"),
                    createVNode("p", { class: "text-gray-600 text-sm" }, toDisplayString(props.mode === "volunteer" ? "Complete your volunteer registration and join our team!" : "Submit your registration and get ready for the race!"), 1)
                  ]),
                  createVNode(_component_Button, {
                    variant: "default",
                    type: "submit",
                    class: "w-full sm:w-auto px-8 py-3 h-12 text-base font-medium",
                    disabled: unref(isLoading),
                    "aria-busy": unref(isLoading)
                  }, {
                    default: withCtx(() => [
                      unref(isLoading) ? (openBlock(), createBlock(unref(Loader2), {
                        key: 0,
                        size: 20,
                        class: "animate-spin mr-2"
                      })) : createCommentVNode("", true),
                      !unref(isLoading) ? (openBlock(), createBlock("span", { key: 1 }, toDisplayString(props.mode === "volunteer" ? "Register as Volunteer" : "Register as Runner"), 1)) : (openBlock(), createBlock("span", { key: 2 }, "Processing Registration..."))
                    ]),
                    _: 1
                  }, 8, ["disabled", "aria-busy"])
                ]),
                unref(okMsg) || unref(errMsg) ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "mt-6 pt-6 border-t border-gray-200"
                }, [
                  unref(okMsg) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-xl border border-green-200"
                  }, [
                    createVNode(unref(CheckCircle), { size: 20 }),
                    createVNode("span", { class: "font-medium" }, toDisplayString(unref(okMsg)), 1)
                  ])) : createCommentVNode("", true),
                  unref(errMsg) ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl border border-red-200"
                  }, [
                    createVNode(unref(AlertCircle), { size: 20 }),
                    createVNode("span", { class: "font-medium" }, toDisplayString(unref(errMsg)), 1)
                  ])) : createCommentVNode("", true)
                ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/features/registration/RegistrationForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=RegistrationForm-DEGfKQbn.mjs.map
