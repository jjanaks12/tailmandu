import { _ as _sfc_main$1 } from './Input-DM54l6M4.mjs';
import { _ as _sfc_main$2, a as _sfc_main$3, b as _sfc_main$1$1, c as abbr } from './AvatarImage-BKYKzFla.mjs';
import { _ as _sfc_main$4 } from './Label-jSWrZiLt.mjs';
import { _ as _sfc_main$6, a as _sfc_main$1$2, b as _sfc_main$5, c as _sfc_main$5$1, d as _sfc_main$4$1 } from './SelectValue-cH59kxAH.mjs';
import { _ as _sfc_main$7 } from './Checkbox-COe6Ah5B.mjs';
import { defineComponent, ref, computed, watchEffect, unref, withCtx, mergeProps, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { LoaderIcon } from 'lucide-vue-next';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { d as useAppStore, s as showImage } from './server.mjs';
import * as Y from 'yup';
import { u as useHead } from './v3-CnyYpv1t.mjs';
import { storeToRefs } from 'pinia';
import { _ as _sfc_main$8 } from './Button-BQvwvVGk.mjs';
import './index-DRYUbUIy.mjs';
import './index-BCNSwEbA.mjs';
import './helpers-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
import 'reka-ui';
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
import './index-Dniqw3Np.mjs';
import 'class-variance-authority';
import './authorization-DPJpR6G0.mjs';

const companySchema = Y.object({
  name: Y.string().required().label("Company name"),
  short_name: Y.string().required().label("Company short name"),
  email: Y.string().email().required().label("Email"),
  address: Y.object({
    street: Y.string().required().label("Street name"),
    address: Y.string().required().label("Address name"),
    city: Y.string().required().label("City"),
    state: Y.string().required().label("State"),
    zipCode: Y.string().required().label("ZipCode"),
    countryId: Y.string().required().label("Country")
  }).required().label("Address"),
  phone: Y.string().required().label("Phone number"),
  vat_registered: Y.boolean().required().label("Is company registered on VAT"),
  pan_no: Y.string().when("vat_registered", {
    is: void 0,
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.notRequired()
  }).label("PAN number"),
  vat_no: Y.string().when("vat_registered", {
    is: true,
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.notRequired()
  }).label("VAT number"),
  image: Y.string().label("Company logo")
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "company",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Change company details"
    });
    const form = ref(null);
    const isLoading = ref(false);
    const { company, countries } = storeToRefs(useAppStore());
    const { saveCompany } = useAppStore();
    const avatar = computed(() => {
      var _a, _b;
      return showImage((_b = (_a = company.value) == null ? void 0 : _a.logo) == null ? void 0 : _b.file_name);
    });
    const submitHandler = async (values) => {
      isLoading.value = true;
      await saveCompany(values);
      isLoading.value = false;
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
    const init = () => {
      var _a, _b;
      if (form.value) {
        if (company.value) {
          form.value.setFieldValue("id", company.value.id);
          form.value.setFieldValue("short_name", company.value.short_name);
          form.value.setFieldValue("name", company.value.name);
          form.value.setFieldValue("email", company.value.email);
          form.value.setFieldValue("phone", company.value.phone);
          form.value.setFieldValue("vat_no", company.value.vat_no);
          form.value.setFieldValue("pan_no", company.value.pan_no);
          form.value.setFieldValue("vat_registered", (_a = company.value.vat_registered) != null ? _a : false);
          if ((_b = company.value) == null ? void 0 : _b.address) {
            form.value.setFieldValue("address.address", company.value.address.address);
            form.value.setFieldValue("address.street", company.value.address.street);
            form.value.setFieldValue("address.state", company.value.address.state);
            form.value.setFieldValue("address.city", company.value.address.city);
            form.value.setFieldValue("address.zipCode", company.value.address.zipCode);
            form.value.setFieldValue("address.countryId", company.value.address.countryId);
          }
        }
      }
    };
    watchEffect(() => {
      if (company.value)
        init();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Input = _sfc_main$1;
      const _component_Avatar = _sfc_main$2;
      const _component_AvatarImage = _sfc_main$3;
      const _component_AvatarFallback = _sfc_main$1$1;
      const _component_Label = _sfc_main$4;
      const _component_Select = _sfc_main$6;
      const _component_SelectTrigger = _sfc_main$1$2;
      const _component_SelectValue = _sfc_main$5;
      const _component_SelectContent = _sfc_main$5$1;
      const _component_SelectItem = _sfc_main$4$1;
      const _component_Checkbox = _sfc_main$7;
      const _component_Button = _sfc_main$8;
      _push(`<!--[--><div class="text-sm mb-4"><h1 class="text-black text-xl">Company details</h1><p>Enter your personal details below to update your account information.</p></div>`);
      _push(ssrRenderComponent(unref(Form), {
        class: "flex flex-col gap-5",
        onSubmit: submitHandler,
        ref_key: "form",
        ref: form,
        "validation-schema": unref(companySchema)
      }, {
        default: withCtx(({ values }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Field), { name: "id" }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                var _a, _b;
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Input, mergeProps({ type: "hidden" }, field, {
                    "model-value": (_a = unref(company)) == null ? void 0 : _a.id
                  }), null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Input, mergeProps({ type: "hidden" }, field, {
                      "model-value": (_b = unref(company)) == null ? void 0 : _b.id
                    }), null, 16, ["model-value"])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`<label class="self-center mb-16"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Avatar, { class: "w-[180px] h-[180px] bg-gray-300" }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_AvatarImage, {
                    src: values.image || unref(avatar) || "",
                    class: "object-contain p-3"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_AvatarFallback, { class: "text-4xl" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      var _a, _b, _c, _d;
                      if (_push4) {
                        _push4(`${ssrInterpolate(unref(abbr)((_b = (_a = unref(company)) == null ? void 0 : _a.name) != null ? _b : ""))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(unref(abbr)((_d = (_c = unref(company)) == null ? void 0 : _c.name) != null ? _d : "")), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_AvatarImage, {
                      src: values.image || unref(avatar) || "",
                      class: "object-contain p-3"
                    }, null, 8, ["src"]),
                    createVNode(_component_AvatarFallback, { class: "text-4xl" }, {
                      default: withCtx(() => {
                        var _a, _b;
                        return [
                          createTextVNode(toDisplayString(unref(abbr)((_b = (_a = unref(company)) == null ? void 0 : _a.name) != null ? _b : "")), 1)
                        ];
                      }),
                      _: 1
                    })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`<input type="file" class="sr-only" accept="image/*"${_scopeId}></label>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "name",
              class: "flex flex-col gap-1",
              as: "div"
            }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Label, { for: "cf__name" }, {
                    default: withCtx((_, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Name of company`);
                      } else {
                        return [
                          createTextVNode("Name of company")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Input, mergeProps(field, {
                    id: "cf__name",
                    autocomplete: "off"
                  }), null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "name" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Label, { for: "cf__name" }, {
                      default: withCtx(() => [
                        createTextVNode("Name of company")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Input, mergeProps(field, {
                      id: "cf__name",
                      autocomplete: "off"
                    }), null, 16),
                    createVNode(unref(ErrorMessage), { name: "name" })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Field), {
              name: "short_name",
              class: "flex flex-col gap-1",
              as: "div"
            }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Label, { for: "cf__short_name" }, {
                    default: withCtx((_, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Company short name`);
                      } else {
                        return [
                          createTextVNode("Company short name")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Input, mergeProps(field, {
                    id: "cf__short_name",
                    autocomplete: "off"
                  }), null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "short_name" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Label, { for: "cf__short_name" }, {
                      default: withCtx(() => [
                        createTextVNode("Company short name")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Input, mergeProps(field, {
                      id: "cf__short_name",
                      autocomplete: "off"
                    }), null, 16),
                    createVNode(unref(ErrorMessage), { name: "short_name" })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Field), {
              name: "email",
              class: "flex flex-col gap-1",
              as: "div"
            }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Label, { for: "cf__email" }, {
                    default: withCtx((_, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Email address`);
                      } else {
                        return [
                          createTextVNode("Email address")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Input, mergeProps({ type: "email" }, field, {
                    id: "cf__email",
                    autocomplete: "off"
                  }), null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "email" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Label, { for: "cf__email" }, {
                      default: withCtx(() => [
                        createTextVNode("Email address")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Input, mergeProps({ type: "email" }, field, {
                      id: "cf__email",
                      autocomplete: "off"
                    }), null, 16),
                    createVNode(unref(ErrorMessage), { name: "email" })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`<fieldset class="flex flex-col gap-4"${_scopeId}><legend${_scopeId}>Company Address</legend><div class="flex gap-4"${_scopeId}><div class="w-1/2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Field), {
              as: "div",
              name: "address.address",
              class: "flex flex-col gap-2"
            }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Label, { for: "cf__address" }, {
                    default: withCtx((_, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Address`);
                      } else {
                        return [
                          createTextVNode("Address")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Input, mergeProps({ id: "cf__address" }, field, { max: "16" }), null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "address.address" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Label, { for: "cf__address" }, {
                      default: withCtx(() => [
                        createTextVNode("Address")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Input, mergeProps({ id: "cf__address" }, field, { max: "16" }), null, 16),
                    createVNode(unref(ErrorMessage), { name: "address.address" })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`</div><div class="w-1/2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Field), {
              as: "div",
              name: "address.street",
              class: "flex flex-col gap-2"
            }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Label, { for: "cf__street" }, {
                    default: withCtx((_, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Street name`);
                      } else {
                        return [
                          createTextVNode("Street name")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Input, mergeProps({ id: "cf__street" }, field), null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "address.street" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Label, { for: "cf__street" }, {
                      default: withCtx(() => [
                        createTextVNode("Street name")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Input, mergeProps({ id: "cf__street" }, field), null, 16),
                    createVNode(unref(ErrorMessage), { name: "address.street" })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="flex gap-4"${_scopeId}><div class="w-1/3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Field), {
              as: "div",
              name: "address.city",
              class: "flex flex-col gap-2"
            }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Label, { for: "cf__city" }, {
                    default: withCtx((_, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`City`);
                      } else {
                        return [
                          createTextVNode("City")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Input, mergeProps({ id: "cf__city" }, field, { max: "16" }), null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "address.city" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Label, { for: "cf__city" }, {
                      default: withCtx(() => [
                        createTextVNode("City")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Input, mergeProps({ id: "cf__city" }, field, { max: "16" }), null, 16),
                    createVNode(unref(ErrorMessage), { name: "address.city" })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`</div><div class="w-1/3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Field), {
              as: "div",
              name: "address.zipCode",
              class: "flex flex-col gap-2"
            }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Label, { for: "cf__zipCode" }, {
                    default: withCtx((_, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Zip code`);
                      } else {
                        return [
                          createTextVNode("Zip code")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Input, mergeProps({ id: "cf__zipCode" }, field, { max: "16" }), null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "address.zipCode" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Label, { for: "cf__zipCode" }, {
                      default: withCtx(() => [
                        createTextVNode("Zip code")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Input, mergeProps({ id: "cf__zipCode" }, field, { max: "16" }), null, 16),
                    createVNode(unref(ErrorMessage), { name: "address.zipCode" })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`</div><div class="w-1/3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Field), {
              as: "div",
              name: "address.state",
              class: "flex flex-col gap-2"
            }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Label, { for: "cf__state" }, {
                    default: withCtx((_, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`State`);
                      } else {
                        return [
                          createTextVNode("State")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Input, mergeProps({ id: "cf__state" }, field, { max: "16" }), null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "address.state" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Label, { for: "cf__state" }, {
                      default: withCtx(() => [
                        createTextVNode("State")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Input, mergeProps({ id: "cf__state" }, field, { max: "16" }), null, 16),
                    createVNode(unref(ErrorMessage), { name: "address.state" })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`</div><div class="w-1/3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Field), {
              as: "div",
              name: "address.countryId",
              class: "flex flex-col gap-2"
            }, {
              default: withCtx(({ field, handleChange }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Label, { for: "cf__country" }, {
                    default: withCtx((_, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Country`);
                      } else {
                        return [
                          createTextVNode("Country")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Select, {
                    onChange: handleChange,
                    "model-value": field.value,
                    id: "cf__country"
                  }, {
                    default: withCtx((_, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_SelectTrigger, null, {
                          default: withCtx((_2, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_SelectValue, { placeholder: "Country" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_SelectValue, { placeholder: "Country" })
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
                          createVNode(_component_SelectTrigger, null, {
                            default: withCtx(() => [
                              createVNode(_component_SelectValue, { placeholder: "Country" })
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
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "address.countryId" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Label, { for: "cf__country" }, {
                      default: withCtx(() => [
                        createTextVNode("Country")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Select, {
                      onChange: handleChange,
                      "model-value": field.value,
                      id: "cf__country"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_SelectTrigger, null, {
                          default: withCtx(() => [
                            createVNode(_component_SelectValue, { placeholder: "Country" })
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
                    }, 1032, ["onChange", "model-value"]),
                    createVNode(unref(ErrorMessage), { name: "address.countryId" })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`</div></div></fieldset>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "phone",
              class: "flex flex-col gap-1",
              as: "div"
            }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Label, { for: "cf__phone" }, {
                    default: withCtx((_, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Phone`);
                      } else {
                        return [
                          createTextVNode("Phone")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Input, mergeProps({ type: "text" }, field, {
                    id: "cf__phone",
                    autocomplete: "off"
                  }), null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "phone" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Label, { for: "cf__phone" }, {
                      default: withCtx(() => [
                        createTextVNode("Phone")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Input, mergeProps({ type: "text" }, field, {
                      id: "cf__phone",
                      autocomplete: "off"
                    }), null, 16),
                    createVNode(unref(ErrorMessage), { name: "phone" })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Field), { name: "vat_registered" }, {
              default: withCtx(({ handleChange, value }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Label, { class: "flex gap-2" }, {
                    default: withCtx((_, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Checkbox, {
                          "model-value": value,
                          "default-value": false,
                          "onUpdate:modelValue": handleChange
                        }, null, _parent4, _scopeId3));
                        _push4(`<span${_scopeId3}>Is your company registered on VAT?</span>`);
                      } else {
                        return [
                          createVNode(_component_Checkbox, {
                            "model-value": value,
                            "default-value": false,
                            "onUpdate:modelValue": handleChange
                          }, null, 8, ["model-value", "onUpdate:modelValue"]),
                          createVNode("span", null, "Is your company registered on VAT?")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "vat_registered" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Label, { class: "flex gap-2" }, {
                      default: withCtx(() => [
                        createVNode(_component_Checkbox, {
                          "model-value": value,
                          "default-value": false,
                          "onUpdate:modelValue": handleChange
                        }, null, 8, ["model-value", "onUpdate:modelValue"]),
                        createVNode("span", null, "Is your company registered on VAT?")
                      ]),
                      _: 2
                    }, 1024),
                    createVNode(unref(ErrorMessage), { name: "vat_registered" })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`<div class="flex gap-4"${_scopeId}><div class="w-1/2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "vat_no",
              class: "flex flex-col gap-1",
              as: "div"
            }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Label, { for: "cf__vat" }, {
                    default: withCtx((_, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`VAT - Value Added Tax`);
                      } else {
                        return [
                          createTextVNode("VAT - Value Added Tax")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Input, mergeProps({ type: "text" }, field, {
                    id: "cf__vat",
                    autocomplete: "off"
                  }), null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "vat_no" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Label, { for: "cf__vat" }, {
                      default: withCtx(() => [
                        createTextVNode("VAT - Value Added Tax")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Input, mergeProps({ type: "text" }, field, {
                      id: "cf__vat",
                      autocomplete: "off"
                    }), null, 16),
                    createVNode(unref(ErrorMessage), { name: "vat_no" })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`</div><div class="w-1/2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "pan_no",
              class: "flex flex-col gap-1",
              as: "div"
            }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Label, { for: "cf__pan" }, {
                    default: withCtx((_, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`PAN - Permanent Address Number`);
                      } else {
                        return [
                          createTextVNode("PAN - Permanent Address Number")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Input, mergeProps({ type: "text" }, field, {
                    id: "cf__pan",
                    autocomplete: "off"
                  }), null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "pan_no" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Label, { for: "cf__pan" }, {
                      default: withCtx(() => [
                        createTextVNode("PAN - Permanent Address Number")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Input, mergeProps({ type: "text" }, field, {
                      id: "cf__pan",
                      autocomplete: "off"
                    }), null, 16),
                    createVNode(unref(ErrorMessage), { name: "pan_no" })
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
              _: 2
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode(unref(Field), { name: "id" }, {
                default: withCtx(({ field }) => {
                  var _a;
                  return [
                    createVNode(_component_Input, mergeProps({ type: "hidden" }, field, {
                      "model-value": (_a = unref(company)) == null ? void 0 : _a.id
                    }), null, 16, ["model-value"])
                  ];
                }),
                _: 1
              }),
              createVNode("label", { class: "self-center mb-16" }, [
                createVNode(_component_Avatar, { class: "w-[180px] h-[180px] bg-gray-300" }, {
                  default: withCtx(() => [
                    createVNode(_component_AvatarImage, {
                      src: values.image || unref(avatar) || "",
                      class: "object-contain p-3"
                    }, null, 8, ["src"]),
                    createVNode(_component_AvatarFallback, { class: "text-4xl" }, {
                      default: withCtx(() => {
                        var _a, _b;
                        return [
                          createTextVNode(toDisplayString(unref(abbr)((_b = (_a = unref(company)) == null ? void 0 : _a.name) != null ? _b : "")), 1)
                        ];
                      }),
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
              createVNode(unref(Field), {
                name: "name",
                class: "flex flex-col gap-1",
                as: "div"
              }, {
                default: withCtx(({ field }) => [
                  createVNode(_component_Label, { for: "cf__name" }, {
                    default: withCtx(() => [
                      createTextVNode("Name of company")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Input, mergeProps(field, {
                    id: "cf__name",
                    autocomplete: "off"
                  }), null, 16),
                  createVNode(unref(ErrorMessage), { name: "name" })
                ]),
                _: 1
              }),
              createVNode(unref(Field), {
                name: "short_name",
                class: "flex flex-col gap-1",
                as: "div"
              }, {
                default: withCtx(({ field }) => [
                  createVNode(_component_Label, { for: "cf__short_name" }, {
                    default: withCtx(() => [
                      createTextVNode("Company short name")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Input, mergeProps(field, {
                    id: "cf__short_name",
                    autocomplete: "off"
                  }), null, 16),
                  createVNode(unref(ErrorMessage), { name: "short_name" })
                ]),
                _: 1
              }),
              createVNode(unref(Field), {
                name: "email",
                class: "flex flex-col gap-1",
                as: "div"
              }, {
                default: withCtx(({ field }) => [
                  createVNode(_component_Label, { for: "cf__email" }, {
                    default: withCtx(() => [
                      createTextVNode("Email address")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Input, mergeProps({ type: "email" }, field, {
                    id: "cf__email",
                    autocomplete: "off"
                  }), null, 16),
                  createVNode(unref(ErrorMessage), { name: "email" })
                ]),
                _: 1
              }),
              createVNode("fieldset", { class: "flex flex-col gap-4" }, [
                createVNode("legend", null, "Company Address"),
                createVNode("div", { class: "flex gap-4" }, [
                  createVNode("div", { class: "w-1/2" }, [
                    createVNode(unref(Field), {
                      as: "div",
                      name: "address.address",
                      class: "flex flex-col gap-2"
                    }, {
                      default: withCtx(({ field }) => [
                        createVNode(_component_Label, { for: "cf__address" }, {
                          default: withCtx(() => [
                            createTextVNode("Address")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_Input, mergeProps({ id: "cf__address" }, field, { max: "16" }), null, 16),
                        createVNode(unref(ErrorMessage), { name: "address.address" })
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("div", { class: "w-1/2" }, [
                    createVNode(unref(Field), {
                      as: "div",
                      name: "address.street",
                      class: "flex flex-col gap-2"
                    }, {
                      default: withCtx(({ field }) => [
                        createVNode(_component_Label, { for: "cf__street" }, {
                          default: withCtx(() => [
                            createTextVNode("Street name")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_Input, mergeProps({ id: "cf__street" }, field), null, 16),
                        createVNode(unref(ErrorMessage), { name: "address.street" })
                      ]),
                      _: 1
                    })
                  ])
                ]),
                createVNode("div", { class: "flex gap-4" }, [
                  createVNode("div", { class: "w-1/3" }, [
                    createVNode(unref(Field), {
                      as: "div",
                      name: "address.city",
                      class: "flex flex-col gap-2"
                    }, {
                      default: withCtx(({ field }) => [
                        createVNode(_component_Label, { for: "cf__city" }, {
                          default: withCtx(() => [
                            createTextVNode("City")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_Input, mergeProps({ id: "cf__city" }, field, { max: "16" }), null, 16),
                        createVNode(unref(ErrorMessage), { name: "address.city" })
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("div", { class: "w-1/3" }, [
                    createVNode(unref(Field), {
                      as: "div",
                      name: "address.zipCode",
                      class: "flex flex-col gap-2"
                    }, {
                      default: withCtx(({ field }) => [
                        createVNode(_component_Label, { for: "cf__zipCode" }, {
                          default: withCtx(() => [
                            createTextVNode("Zip code")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_Input, mergeProps({ id: "cf__zipCode" }, field, { max: "16" }), null, 16),
                        createVNode(unref(ErrorMessage), { name: "address.zipCode" })
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("div", { class: "w-1/3" }, [
                    createVNode(unref(Field), {
                      as: "div",
                      name: "address.state",
                      class: "flex flex-col gap-2"
                    }, {
                      default: withCtx(({ field }) => [
                        createVNode(_component_Label, { for: "cf__state" }, {
                          default: withCtx(() => [
                            createTextVNode("State")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_Input, mergeProps({ id: "cf__state" }, field, { max: "16" }), null, 16),
                        createVNode(unref(ErrorMessage), { name: "address.state" })
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("div", { class: "w-1/3" }, [
                    createVNode(unref(Field), {
                      as: "div",
                      name: "address.countryId",
                      class: "flex flex-col gap-2"
                    }, {
                      default: withCtx(({ field, handleChange }) => [
                        createVNode(_component_Label, { for: "cf__country" }, {
                          default: withCtx(() => [
                            createTextVNode("Country")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_Select, {
                          onChange: handleChange,
                          "model-value": field.value,
                          id: "cf__country"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_SelectTrigger, null, {
                              default: withCtx(() => [
                                createVNode(_component_SelectValue, { placeholder: "Country" })
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
                        }, 1032, ["onChange", "model-value"]),
                        createVNode(unref(ErrorMessage), { name: "address.countryId" })
                      ]),
                      _: 1
                    })
                  ])
                ])
              ]),
              createVNode(unref(Field), {
                name: "phone",
                class: "flex flex-col gap-1",
                as: "div"
              }, {
                default: withCtx(({ field }) => [
                  createVNode(_component_Label, { for: "cf__phone" }, {
                    default: withCtx(() => [
                      createTextVNode("Phone")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Input, mergeProps({ type: "text" }, field, {
                    id: "cf__phone",
                    autocomplete: "off"
                  }), null, 16),
                  createVNode(unref(ErrorMessage), { name: "phone" })
                ]),
                _: 1
              }),
              createVNode(unref(Field), { name: "vat_registered" }, {
                default: withCtx(({ handleChange, value }) => [
                  createVNode(_component_Label, { class: "flex gap-2" }, {
                    default: withCtx(() => [
                      createVNode(_component_Checkbox, {
                        "model-value": value,
                        "default-value": false,
                        "onUpdate:modelValue": handleChange
                      }, null, 8, ["model-value", "onUpdate:modelValue"]),
                      createVNode("span", null, "Is your company registered on VAT?")
                    ]),
                    _: 2
                  }, 1024),
                  createVNode(unref(ErrorMessage), { name: "vat_registered" })
                ]),
                _: 1
              }),
              createVNode("div", { class: "flex gap-4" }, [
                createVNode("div", { class: "w-1/2" }, [
                  createVNode(unref(Field), {
                    name: "vat_no",
                    class: "flex flex-col gap-1",
                    as: "div"
                  }, {
                    default: withCtx(({ field }) => [
                      createVNode(_component_Label, { for: "cf__vat" }, {
                        default: withCtx(() => [
                          createTextVNode("VAT - Value Added Tax")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Input, mergeProps({ type: "text" }, field, {
                        id: "cf__vat",
                        autocomplete: "off"
                      }), null, 16),
                      createVNode(unref(ErrorMessage), { name: "vat_no" })
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "w-1/2" }, [
                  createVNode(unref(Field), {
                    name: "pan_no",
                    class: "flex flex-col gap-1",
                    as: "div"
                  }, {
                    default: withCtx(({ field }) => [
                      createVNode(_component_Label, { for: "cf__pan" }, {
                        default: withCtx(() => [
                          createTextVNode("PAN - Permanent Address Number")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Input, mergeProps({ type: "text" }, field, {
                        id: "cf__pan",
                        autocomplete: "off"
                      }), null, 16),
                      createVNode(unref(ErrorMessage), { name: "pan_no" })
                    ]),
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
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/company.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=company-BPolG_sL.mjs.map
