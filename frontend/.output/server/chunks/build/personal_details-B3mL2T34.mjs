import { _ as _sfc_main$2, a as _sfc_main$1, b as _sfc_main$1$1, c as abbr } from './AvatarImage-BKYKzFla.mjs';
import { _ as _sfc_main$3 } from './Input-DM54l6M4.mjs';
import { _ as _sfc_main$4 } from './DatePicker-DwR9bXOV.mjs';
import { _ as _sfc_main$6, a as _sfc_main$1$2, b as _sfc_main$5, c as _sfc_main$5$1, d as _sfc_main$4$1 } from './SelectValue-cH59kxAH.mjs';
import { defineComponent, ref, computed, watch, unref, withCtx, createTextVNode, toDisplayString, createVNode, mergeProps, createBlock, openBlock, Fragment, renderList, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { parseDate } from '@internationalized/date';
import { IdCard, Mail, Phone, Calendar, VenusAndMars, Flag, Baby, Loader } from 'lucide-vue-next';
import moment from 'moment';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { c as useAuthStore, d as useAppStore, s as showImage } from './server.mjs';
import { c as userDetailSchema } from './user.schema-DGWfCGO_.mjs';
import { u as useHead } from './v3-CnyYpv1t.mjs';
import { storeToRefs } from 'pinia';
import { _ as _sfc_main$7 } from './Button-BQvwvVGk.mjs';
import 'reka-ui';
import './helpers-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
import './index-BCNSwEbA.mjs';
import './index-DRYUbUIy.mjs';
import './index-Dniqw3Np.mjs';
import 'class-variance-authority';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "personal_details",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Personal details"
    });
    const { updateDetail } = useAuthStore();
    const { isLoading, user, fullName } = storeToRefs(useAuthStore());
    const { genders, countries, age_categories } = storeToRefs(useAppStore());
    const form = ref(null);
    const dateOfBirth = ref();
    const avatar = computed(() => {
      var _a, _b, _c;
      return showImage((_c = (_b = (_a = user.value) == null ? void 0 : _a.personal) == null ? void 0 : _b.avatar) == null ? void 0 : _c.file_name);
    });
    const init = () => {
      var _a;
      if (form.value !== null && user.value !== null) {
        form.value.setFieldValue("first_name", user.value.personal.first_name);
        form.value.setFieldValue("middle_name", user.value.personal.middle_name || "");
        form.value.setFieldValue("last_name", user.value.personal.last_name);
        form.value.setFieldValue("email", user.value.personal.email);
        form.value.setFieldValue("gender_id", user.value.personal.gender_id);
        form.value.setFieldValue("country_id", user.value.personal.country_id);
        form.value.setFieldValue("age_category_id", user.value.personal.age_category_id);
        form.value.setFieldValue("phone_number", user.value.personal.phone_number);
        form.value.setFieldValue("image_id", (_a = user.value.personal) == null ? void 0 : _a.image_id);
        if (user.value.personal.date_of_birth) {
          form.value.setFieldValue("date_of_birth", user.value.personal.date_of_birth);
          dateOfBirth.value = parseDate(moment(user.value.personal.date_of_birth).format("YYYY-MM-DD"));
        }
      }
    };
    const fileInputHandler = (event) => {
      const files = event.target.files;
      if (!files)
        return;
      const reader = new FileReader();
      if (files[0]) {
        reader.readAsDataURL(files[0]);
        reader.onload = () => {
          var _a;
          (_a = form.value) == null ? void 0 : _a.setFieldValue("image", reader.result);
        };
      }
    };
    watch(dateOfBirth, () => {
      if (form.value)
        form.value.setFieldValue("date_of_birth", `${dateOfBirth.value.year}-${dateOfBirth.value.month}-${dateOfBirth.value.day}`);
    });
    watch(user, () => {
      init();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Avatar = _sfc_main$2;
      const _component_AvatarImage = _sfc_main$1;
      const _component_AvatarFallback = _sfc_main$1$1;
      const _component_Input = _sfc_main$3;
      const _component_DatePicker = _sfc_main$4;
      const _component_Select = _sfc_main$6;
      const _component_SelectTrigger = _sfc_main$1$2;
      const _component_SelectValue = _sfc_main$5;
      const _component_SelectContent = _sfc_main$5$1;
      const _component_SelectItem = _sfc_main$4$1;
      const _component_Button = _sfc_main$7;
      _push(`<!--[--><div class="text-sm mb-4"><h1 class="text-black text-xl">Personal details</h1><p>Enter your personal details below to update your account information.</p></div>`);
      _push(ssrRenderComponent(unref(Form), {
        "validation-schema": unref(userDetailSchema),
        method: "post",
        onSubmit: unref(updateDetail),
        class: "max-w-[820px] flex flex-col space-y-4",
        ref_key: "form",
        ref: form
      }, {
        default: withCtx(({ values, errors }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<label class="self-center mb-16"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Avatar, { class: "w-[180px] h-[180px] bg-gray-300" }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_AvatarImage, {
                    src: values.image || unref(avatar) || "",
                    class: "object-cover"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_AvatarFallback, { class: "text-4xl" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(unref(abbr)(unref(fullName)))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(unref(abbr)(unref(fullName))), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_AvatarImage, {
                      src: values.image || unref(avatar) || "",
                      class: "object-cover"
                    }, null, 8, ["src"]),
                    createVNode(_component_AvatarFallback, { class: "text-4xl" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(abbr)(unref(fullName))), 1)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`<input type="file" class="sr-only" accept="image/*"${_scopeId}></label><div class="flex space-x-8"${_scopeId}><div class="w-1/3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Field), { name: "first_name" }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<label class="sr-only" for="lf__first_name"${_scopeId2}>First name</label><div class="flex gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(IdCard), { class: "mt-3" }, null, _parent3, _scopeId2));
                  _push3(`<div class="flex-grow"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Input, mergeProps({ type: "text" }, field, {
                    placeholder: "First name",
                    id: "lf__first_name",
                    autocomplete: "given-name"
                  }), null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "first_name" }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("label", {
                      class: "sr-only",
                      for: "lf__first_name"
                    }, "First name"),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode(unref(IdCard), { class: "mt-3" }),
                      createVNode("div", { class: "flex-grow" }, [
                        createVNode(_component_Input, mergeProps({ type: "text" }, field, {
                          placeholder: "First name",
                          id: "lf__first_name",
                          autocomplete: "given-name"
                        }), null, 16),
                        createVNode(unref(ErrorMessage), { name: "first_name" })
                      ])
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`</div><div class="w-1/3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Field), { name: "middle_name" }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<label class="sr-only" for="lf__middle_name"${_scopeId2}>Middle name</label><div class="flex gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(IdCard), { class: "mt-3" }, null, _parent3, _scopeId2));
                  _push3(`<div class="flex-grow"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Input, mergeProps({ type: "text" }, field, {
                    placeholder: "Middle name",
                    id: "lf__middle_name"
                  }), null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "middle_name" }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("label", {
                      class: "sr-only",
                      for: "lf__middle_name"
                    }, "Middle name"),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode(unref(IdCard), { class: "mt-3" }),
                      createVNode("div", { class: "flex-grow" }, [
                        createVNode(_component_Input, mergeProps({ type: "text" }, field, {
                          placeholder: "Middle name",
                          id: "lf__middle_name"
                        }), null, 16),
                        createVNode(unref(ErrorMessage), { name: "middle_name" })
                      ])
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`</div><div class="w-1/3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Field), { name: "last_name" }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<label class="sr-only" for="lf__last_name"${_scopeId2}>Last name</label><div class="flex gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(IdCard), { class: "mt-3" }, null, _parent3, _scopeId2));
                  _push3(`<div class="flex-grow"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Input, mergeProps({ type: "text" }, field, {
                    placeholder: "Last name",
                    id: "lf__last_name",
                    autocomplete: "given-name"
                  }), null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "last_name" }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("label", {
                      class: "sr-only",
                      for: "lf__last_name"
                    }, "Last name"),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode(unref(IdCard), { class: "mt-3" }),
                      createVNode("div", { class: "flex-grow" }, [
                        createVNode(_component_Input, mergeProps({ type: "text" }, field, {
                          placeholder: "Last name",
                          id: "lf__last_name",
                          autocomplete: "given-name"
                        }), null, 16),
                        createVNode(unref(ErrorMessage), { name: "last_name" })
                      ])
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="flex space-x-8"${_scopeId}><div class="w-1/2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Field), { name: "email" }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<label class="sr-only" for="lf__email"${_scopeId2}>Email</label><div class="flex gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Mail), { class: "mt-3" }, null, _parent3, _scopeId2));
                  _push3(`<div class="flex-grow"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Input, mergeProps({ type: "email" }, field, {
                    placeholder: "Email",
                    id: "lf__email",
                    autocomplete: "email",
                    disabled: ""
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
                      createVNode(unref(Mail), { class: "mt-3" }),
                      createVNode("div", { class: "flex-grow" }, [
                        createVNode(_component_Input, mergeProps({ type: "email" }, field, {
                          placeholder: "Email",
                          id: "lf__email",
                          autocomplete: "email",
                          disabled: ""
                        }), null, 16),
                        createVNode(unref(ErrorMessage), { name: "email" })
                      ])
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`</div><div class="w-1/2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Field), { name: "phone_number" }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<label class="sr-only" for="lf__phone_number"${_scopeId2}>Phone number</label><div class="flex gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Phone), { class: "mt-3" }, null, _parent3, _scopeId2));
                  _push3(`<div class="flex-grow"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Input, mergeProps({ type: "text" }, field, {
                    placeholder: "Phone number",
                    id: "lf__phone_number",
                    autocomplete: "mobile"
                  }), null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "phone_number" }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("label", {
                      class: "sr-only",
                      for: "lf__phone_number"
                    }, "Phone number"),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode(unref(Phone), { class: "mt-3" }),
                      createVNode("div", { class: "flex-grow" }, [
                        createVNode(_component_Input, mergeProps({ type: "text" }, field, {
                          placeholder: "Phone number",
                          id: "lf__phone_number",
                          autocomplete: "mobile"
                        }), null, 16),
                        createVNode(unref(ErrorMessage), { name: "phone_number" })
                      ])
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(unref(Field), { name: "date_of_birth" }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<label class="sr-only" for="lf__date_of_birth"${_scopeId2}>Date of birth</label><div class="flex gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Calendar), { class: "mt-3" }, null, _parent3, _scopeId2));
                  _push3(`<div class="flex-grow"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_DatePicker, {
                    label: "Date of Birth",
                    "model-value": unref(dateOfBirth),
                    "onUpdate:modelValue": (dob) => dateOfBirth.value = dob
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "date_of_birth" }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("label", {
                      class: "sr-only",
                      for: "lf__date_of_birth"
                    }, "Date of birth"),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode(unref(Calendar), { class: "mt-3" }),
                      createVNode("div", { class: "flex-grow" }, [
                        createVNode(_component_DatePicker, {
                          label: "Date of Birth",
                          "model-value": unref(dateOfBirth),
                          "onUpdate:modelValue": (dob) => dateOfBirth.value = dob
                        }, null, 8, ["model-value", "onUpdate:modelValue"]),
                        createVNode(unref(ErrorMessage), { name: "date_of_birth" })
                      ])
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`<div class="flex space-x-8"${_scopeId}><div class="w-1/3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "gender_id",
              id: "lf__gender"
            }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                var _a, _b;
                if (_push3) {
                  _push3(`<label class="sr-only" for="lf__gender"${_scopeId2}>Gender</label><div class="flex gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(VenusAndMars), { class: "mt-3" }, null, _parent3, _scopeId2));
                  _push3(`<div class="flex-grow"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Select, mergeProps(field, {
                    autocomplete: "sex",
                    "default-value": (_a = unref(user)) == null ? void 0 : _a.personal.gender_id
                  }), {
                    default: withCtx((_, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_SelectTrigger, { class: "w-full" }, {
                          default: withCtx((_2, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_SelectValue, { placeholder: "Select a gender" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_SelectValue, { placeholder: "Select a gender" })
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
                                  value: gender.id
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
                                    value: gender.id
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(gender.name), 1)
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
                          createVNode(_component_SelectTrigger, { class: "w-full" }, {
                            default: withCtx(() => [
                              createVNode(_component_SelectValue, { placeholder: "Select a gender" })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_SelectContent, null, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(genders), (gender) => {
                                return openBlock(), createBlock(_component_SelectItem, {
                                  value: gender.id
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(gender.name), 1)
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
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "gender_id" }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("label", {
                      class: "sr-only",
                      for: "lf__gender"
                    }, "Gender"),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode(unref(VenusAndMars), { class: "mt-3" }),
                      createVNode("div", { class: "flex-grow" }, [
                        createVNode(_component_Select, mergeProps(field, {
                          autocomplete: "sex",
                          "default-value": (_b = unref(user)) == null ? void 0 : _b.personal.gender_id
                        }), {
                          default: withCtx(() => [
                            createVNode(_component_SelectTrigger, { class: "w-full" }, {
                              default: withCtx(() => [
                                createVNode(_component_SelectValue, { placeholder: "Select a gender" })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_SelectContent, null, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(genders), (gender) => {
                                  return openBlock(), createBlock(_component_SelectItem, {
                                    value: gender.id
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(gender.name), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 256))
                              ]),
                              _: 1
                            })
                          ]),
                          _: 2
                        }, 1040, ["default-value"]),
                        createVNode(unref(ErrorMessage), { name: "gender_id" })
                      ])
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`</div><div class="w-1/3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Field), { name: "country_id" }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                var _a, _b;
                if (_push3) {
                  _push3(`<label class="sr-only" for="lf__country"${_scopeId2}>Country</label><div class="flex gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Flag), { class: "mt-3" }, null, _parent3, _scopeId2));
                  _push3(`<div class="flex-grow"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Select, mergeProps(field, {
                    autocomplete: "sex",
                    id: "lf__country",
                    "default-value": (_a = unref(user)) == null ? void 0 : _a.personal.country_id
                  }), {
                    default: withCtx((_, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_SelectTrigger, { class: "w-full" }, {
                          default: withCtx((_2, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_SelectValue, { placeholder: "Select a country" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_SelectValue, { placeholder: "Select a country" })
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
                                  value: country.id
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
                                    value: country.id
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(country.name), 1)
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
                          createVNode(_component_SelectTrigger, { class: "w-full" }, {
                            default: withCtx(() => [
                              createVNode(_component_SelectValue, { placeholder: "Select a country" })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_SelectContent, null, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(countries), (country) => {
                                return openBlock(), createBlock(_component_SelectItem, {
                                  value: country.id
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(country.name), 1)
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
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "country_id" }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("label", {
                      class: "sr-only",
                      for: "lf__country"
                    }, "Country"),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode(unref(Flag), { class: "mt-3" }),
                      createVNode("div", { class: "flex-grow" }, [
                        createVNode(_component_Select, mergeProps(field, {
                          autocomplete: "sex",
                          id: "lf__country",
                          "default-value": (_b = unref(user)) == null ? void 0 : _b.personal.country_id
                        }), {
                          default: withCtx(() => [
                            createVNode(_component_SelectTrigger, { class: "w-full" }, {
                              default: withCtx(() => [
                                createVNode(_component_SelectValue, { placeholder: "Select a country" })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_SelectContent, null, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(countries), (country) => {
                                  return openBlock(), createBlock(_component_SelectItem, {
                                    value: country.id
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(country.name), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 256))
                              ]),
                              _: 1
                            })
                          ]),
                          _: 2
                        }, 1040, ["default-value"]),
                        createVNode(unref(ErrorMessage), { name: "country_id" })
                      ])
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`</div><div class="w-1/3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Field), { name: "age_category_id" }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                var _a, _b;
                if (_push3) {
                  _push3(`<label class="sr-only" for="lf__age_category_id"${_scopeId2}>Age category</label><div class="flex gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Baby), { class: "mt-3" }, null, _parent3, _scopeId2));
                  _push3(`<div class="flex-grow"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Select, mergeProps(field, {
                    autocomplete: "sex",
                    id: "lf__country",
                    "default-value": (_a = unref(user)) == null ? void 0 : _a.personal.age_category_id
                  }), {
                    default: withCtx((_, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_SelectTrigger, { class: "w-full" }, {
                          default: withCtx((_2, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_SelectValue, { placeholder: "Select an age group" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_SelectValue, { placeholder: "Select an age group" })
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_SelectContent, null, {
                          default: withCtx((_2, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(unref(age_categories), (ageCategory) => {
                                _push5(ssrRenderComponent(_component_SelectItem, {
                                  value: ageCategory.id
                                }, {
                                  default: withCtx((_3, _push6, _parent6, _scopeId5) => {
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
                                    value: ageCategory.id
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(ageCategory.name), 1)
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
                          createVNode(_component_SelectTrigger, { class: "w-full" }, {
                            default: withCtx(() => [
                              createVNode(_component_SelectValue, { placeholder: "Select an age group" })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_SelectContent, null, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(age_categories), (ageCategory) => {
                                return openBlock(), createBlock(_component_SelectItem, {
                                  value: ageCategory.id
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(ageCategory.name), 1)
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
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "age_category_id" }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("label", {
                      class: "sr-only",
                      for: "lf__age_category_id"
                    }, "Age category"),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode(unref(Baby), { class: "mt-3" }),
                      createVNode("div", { class: "flex-grow" }, [
                        createVNode(_component_Select, mergeProps(field, {
                          autocomplete: "sex",
                          id: "lf__country",
                          "default-value": (_b = unref(user)) == null ? void 0 : _b.personal.age_category_id
                        }), {
                          default: withCtx(() => [
                            createVNode(_component_SelectTrigger, { class: "w-full" }, {
                              default: withCtx(() => [
                                createVNode(_component_SelectValue, { placeholder: "Select an age group" })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_SelectContent, null, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(age_categories), (ageCategory) => {
                                  return openBlock(), createBlock(_component_SelectItem, {
                                    value: ageCategory.id
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(ageCategory.name), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 256))
                              ]),
                              _: 1
                            })
                          ]),
                          _: 2
                        }, 1040, ["default-value"]),
                        createVNode(unref(ErrorMessage), { name: "age_category_id" })
                      ])
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="text-right"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Button, {
              variant: "secondary",
              type: "submit",
              class: "w-[180px]",
              disabled: unref(isLoading)
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(isLoading)) {
                    _push3(ssrRenderComponent(unref(Loader), { class: "animate-spin relative" }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(` Update details `);
                } else {
                  return [
                    unref(isLoading) ? (openBlock(), createBlock(unref(Loader), {
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
              createVNode("label", { class: "self-center mb-16" }, [
                createVNode(_component_Avatar, { class: "w-[180px] h-[180px] bg-gray-300" }, {
                  default: withCtx(() => [
                    createVNode(_component_AvatarImage, {
                      src: values.image || unref(avatar) || "",
                      class: "object-cover"
                    }, null, 8, ["src"]),
                    createVNode(_component_AvatarFallback, { class: "text-4xl" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(abbr)(unref(fullName))), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 2
                }, 1024),
                createVNode("input", {
                  type: "file",
                  onChange: fileInputHandler,
                  class: "sr-only",
                  accept: "image/*"
                }, null, 32)
              ]),
              createVNode("div", { class: "flex space-x-8" }, [
                createVNode("div", { class: "w-1/3" }, [
                  createVNode(unref(Field), { name: "first_name" }, {
                    default: withCtx(({ field }) => [
                      createVNode("label", {
                        class: "sr-only",
                        for: "lf__first_name"
                      }, "First name"),
                      createVNode("div", { class: "flex gap-2" }, [
                        createVNode(unref(IdCard), { class: "mt-3" }),
                        createVNode("div", { class: "flex-grow" }, [
                          createVNode(_component_Input, mergeProps({ type: "text" }, field, {
                            placeholder: "First name",
                            id: "lf__first_name",
                            autocomplete: "given-name"
                          }), null, 16),
                          createVNode(unref(ErrorMessage), { name: "first_name" })
                        ])
                      ])
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "w-1/3" }, [
                  createVNode(unref(Field), { name: "middle_name" }, {
                    default: withCtx(({ field }) => [
                      createVNode("label", {
                        class: "sr-only",
                        for: "lf__middle_name"
                      }, "Middle name"),
                      createVNode("div", { class: "flex gap-2" }, [
                        createVNode(unref(IdCard), { class: "mt-3" }),
                        createVNode("div", { class: "flex-grow" }, [
                          createVNode(_component_Input, mergeProps({ type: "text" }, field, {
                            placeholder: "Middle name",
                            id: "lf__middle_name"
                          }), null, 16),
                          createVNode(unref(ErrorMessage), { name: "middle_name" })
                        ])
                      ])
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "w-1/3" }, [
                  createVNode(unref(Field), { name: "last_name" }, {
                    default: withCtx(({ field }) => [
                      createVNode("label", {
                        class: "sr-only",
                        for: "lf__last_name"
                      }, "Last name"),
                      createVNode("div", { class: "flex gap-2" }, [
                        createVNode(unref(IdCard), { class: "mt-3" }),
                        createVNode("div", { class: "flex-grow" }, [
                          createVNode(_component_Input, mergeProps({ type: "text" }, field, {
                            placeholder: "Last name",
                            id: "lf__last_name",
                            autocomplete: "given-name"
                          }), null, 16),
                          createVNode(unref(ErrorMessage), { name: "last_name" })
                        ])
                      ])
                    ]),
                    _: 1
                  })
                ])
              ]),
              createVNode("div", { class: "flex space-x-8" }, [
                createVNode("div", { class: "w-1/2" }, [
                  createVNode(unref(Field), { name: "email" }, {
                    default: withCtx(({ field }) => [
                      createVNode("label", {
                        class: "sr-only",
                        for: "lf__email"
                      }, "Email"),
                      createVNode("div", { class: "flex gap-2" }, [
                        createVNode(unref(Mail), { class: "mt-3" }),
                        createVNode("div", { class: "flex-grow" }, [
                          createVNode(_component_Input, mergeProps({ type: "email" }, field, {
                            placeholder: "Email",
                            id: "lf__email",
                            autocomplete: "email",
                            disabled: ""
                          }), null, 16),
                          createVNode(unref(ErrorMessage), { name: "email" })
                        ])
                      ])
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "w-1/2" }, [
                  createVNode(unref(Field), { name: "phone_number" }, {
                    default: withCtx(({ field }) => [
                      createVNode("label", {
                        class: "sr-only",
                        for: "lf__phone_number"
                      }, "Phone number"),
                      createVNode("div", { class: "flex gap-2" }, [
                        createVNode(unref(Phone), { class: "mt-3" }),
                        createVNode("div", { class: "flex-grow" }, [
                          createVNode(_component_Input, mergeProps({ type: "text" }, field, {
                            placeholder: "Phone number",
                            id: "lf__phone_number",
                            autocomplete: "mobile"
                          }), null, 16),
                          createVNode(unref(ErrorMessage), { name: "phone_number" })
                        ])
                      ])
                    ]),
                    _: 1
                  })
                ])
              ]),
              createVNode(unref(Field), { name: "date_of_birth" }, {
                default: withCtx(() => [
                  createVNode("label", {
                    class: "sr-only",
                    for: "lf__date_of_birth"
                  }, "Date of birth"),
                  createVNode("div", { class: "flex gap-2" }, [
                    createVNode(unref(Calendar), { class: "mt-3" }),
                    createVNode("div", { class: "flex-grow" }, [
                      createVNode(_component_DatePicker, {
                        label: "Date of Birth",
                        "model-value": unref(dateOfBirth),
                        "onUpdate:modelValue": (dob) => dateOfBirth.value = dob
                      }, null, 8, ["model-value", "onUpdate:modelValue"]),
                      createVNode(unref(ErrorMessage), { name: "date_of_birth" })
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("div", { class: "flex space-x-8" }, [
                createVNode("div", { class: "w-1/3" }, [
                  createVNode(unref(Field), {
                    name: "gender_id",
                    id: "lf__gender"
                  }, {
                    default: withCtx(({ field }) => {
                      var _a;
                      return [
                        createVNode("label", {
                          class: "sr-only",
                          for: "lf__gender"
                        }, "Gender"),
                        createVNode("div", { class: "flex gap-2" }, [
                          createVNode(unref(VenusAndMars), { class: "mt-3" }),
                          createVNode("div", { class: "flex-grow" }, [
                            createVNode(_component_Select, mergeProps(field, {
                              autocomplete: "sex",
                              "default-value": (_a = unref(user)) == null ? void 0 : _a.personal.gender_id
                            }), {
                              default: withCtx(() => [
                                createVNode(_component_SelectTrigger, { class: "w-full" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_SelectValue, { placeholder: "Select a gender" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_SelectContent, null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(unref(genders), (gender) => {
                                      return openBlock(), createBlock(_component_SelectItem, {
                                        value: gender.id
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(gender.name), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["value"]);
                                    }), 256))
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 2
                            }, 1040, ["default-value"]),
                            createVNode(unref(ErrorMessage), { name: "gender_id" })
                          ])
                        ])
                      ];
                    }),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "w-1/3" }, [
                  createVNode(unref(Field), { name: "country_id" }, {
                    default: withCtx(({ field }) => {
                      var _a;
                      return [
                        createVNode("label", {
                          class: "sr-only",
                          for: "lf__country"
                        }, "Country"),
                        createVNode("div", { class: "flex gap-2" }, [
                          createVNode(unref(Flag), { class: "mt-3" }),
                          createVNode("div", { class: "flex-grow" }, [
                            createVNode(_component_Select, mergeProps(field, {
                              autocomplete: "sex",
                              id: "lf__country",
                              "default-value": (_a = unref(user)) == null ? void 0 : _a.personal.country_id
                            }), {
                              default: withCtx(() => [
                                createVNode(_component_SelectTrigger, { class: "w-full" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_SelectValue, { placeholder: "Select a country" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_SelectContent, null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(unref(countries), (country) => {
                                      return openBlock(), createBlock(_component_SelectItem, {
                                        value: country.id
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(country.name), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["value"]);
                                    }), 256))
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 2
                            }, 1040, ["default-value"]),
                            createVNode(unref(ErrorMessage), { name: "country_id" })
                          ])
                        ])
                      ];
                    }),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "w-1/3" }, [
                  createVNode(unref(Field), { name: "age_category_id" }, {
                    default: withCtx(({ field }) => {
                      var _a;
                      return [
                        createVNode("label", {
                          class: "sr-only",
                          for: "lf__age_category_id"
                        }, "Age category"),
                        createVNode("div", { class: "flex gap-2" }, [
                          createVNode(unref(Baby), { class: "mt-3" }),
                          createVNode("div", { class: "flex-grow" }, [
                            createVNode(_component_Select, mergeProps(field, {
                              autocomplete: "sex",
                              id: "lf__country",
                              "default-value": (_a = unref(user)) == null ? void 0 : _a.personal.age_category_id
                            }), {
                              default: withCtx(() => [
                                createVNode(_component_SelectTrigger, { class: "w-full" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_SelectValue, { placeholder: "Select an age group" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_SelectContent, null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(unref(age_categories), (ageCategory) => {
                                      return openBlock(), createBlock(_component_SelectItem, {
                                        value: ageCategory.id
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(ageCategory.name), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["value"]);
                                    }), 256))
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 2
                            }, 1040, ["default-value"]),
                            createVNode(unref(ErrorMessage), { name: "age_category_id" })
                          ])
                        ])
                      ];
                    }),
                    _: 1
                  })
                ])
              ]),
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
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/personal_details.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=personal_details-B3mL2T34.mjs.map
