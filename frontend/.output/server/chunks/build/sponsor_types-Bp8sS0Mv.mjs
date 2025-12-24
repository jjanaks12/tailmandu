import { _ as _sfc_main$5, a as _sfc_main$3, b as _sfc_main$2$1, c as _sfc_main$1$1, d as _sfc_main$4, e as _sfc_main$3$1 } from './TableHeader-DWcwUMYW.mjs';
import { _ as _sfc_main$4$1, a as _sfc_main$2$2, b as _sfc_main$7, c as _sfc_main$1$2 } from './DialogTitle-CfBb7Gc3.mjs';
import { _ as _sfc_main$6 } from './DialogHeader-DOkqwiOU.mjs';
import { defineComponent, ref, withCtx, createTextVNode, createVNode, unref, toDisplayString, createBlock, openBlock, Fragment, renderList, isRef, useTemplateRef, resolveComponent, mergeProps, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { a as useAxios, E as sponsorTypeSchema } from './server.mjs';
import { PencilIcon, TrashIcon } from 'lucide-vue-next';
import { _ as _sfc_main$8 } from './Input-Cs6c7Uzm.mjs';
import { _ as _sfc_main$9 } from './Textarea-myQCGZz3.mjs';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { _ as _sfc_main$2 } from './Button-bc6lCA4h.mjs';
import { u as useHead } from './v3-gCezraLe.mjs';
import './helpers-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
import 'reka-ui';
import './index-3vNTMeQu.mjs';
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
import 'pinia';
import 'vue-router';
import 'deep-pick-omit';
import 'yup';
import 'axios';
import 'vue-sonner';
import './index-f52njE13.mjs';
import './index-Dniqw3Np.mjs';
import 'class-variance-authority';
import './authorization-DPJpR6G0.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Form",
  __ssrInlineRender: true,
  props: {
    sponsorType: {}
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const form = useTemplateRef("form");
    const { axios } = useAxios();
    const isLoading = ref(false);
    const onSubmit = async (values) => {
      isLoading.value = true;
      const method = props.sponsorType ? "put" : "post";
      const url = props.sponsorType ? `/sponsor_types/${props.sponsorType.id}` : "/sponsor_types";
      await axios[method](url, values);
      isLoading.value = false;
      emit("close");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Input = _sfc_main$8;
      const _component_Textarea = _sfc_main$9;
      const _component_Button = _sfc_main$2;
      const _component_LoaderIcon = resolveComponent("LoaderIcon");
      _push(ssrRenderComponent(unref(Form), mergeProps({
        "validation-schema": unref(sponsorTypeSchema),
        onSubmit,
        class: "space-y-4",
        ref_key: "form",
        ref: form
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Field), {
              name: "name",
              as: "div",
              class: "space-y-2"
            }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<label for="name"${_scopeId2}>Name</label>`);
                  _push3(ssrRenderComponent(_component_Input, mergeProps({
                    type: "text",
                    id: "name"
                  }, field), null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "name" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("label", { for: "name" }, "Name"),
                    createVNode(_component_Input, mergeProps({
                      type: "text",
                      id: "name"
                    }, field), null, 16),
                    createVNode(unref(ErrorMessage), { name: "name" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Field), {
              name: "description",
              as: "div",
              class: "space-y-2"
            }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<label for="description"${_scopeId2}>Description</label>`);
                  _push3(ssrRenderComponent(_component_Textarea, mergeProps({ id: "description" }, field), null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "description" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("label", { for: "description" }, "Description"),
                    createVNode(_component_Textarea, mergeProps({ id: "description" }, field), null, 16),
                    createVNode(unref(ErrorMessage), { name: "description" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="text-right"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Button, {
              type: "submit",
              disabled: unref(isLoading)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(isLoading)) {
                    _push3(ssrRenderComponent(_component_LoaderIcon, { class: "mr-2 h-4 w-4 animate-spin" }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(` Submit `);
                } else {
                  return [
                    unref(isLoading) ? (openBlock(), createBlock(_component_LoaderIcon, {
                      key: 0,
                      class: "mr-2 h-4 w-4 animate-spin"
                    })) : createCommentVNode("", true),
                    createTextVNode(" Submit ")
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
                class: "space-y-2"
              }, {
                default: withCtx(({ field }) => [
                  createVNode("label", { for: "name" }, "Name"),
                  createVNode(_component_Input, mergeProps({
                    type: "text",
                    id: "name"
                  }, field), null, 16),
                  createVNode(unref(ErrorMessage), { name: "name" })
                ]),
                _: 1
              }),
              createVNode(unref(Field), {
                name: "description",
                as: "div",
                class: "space-y-2"
              }, {
                default: withCtx(({ field }) => [
                  createVNode("label", { for: "description" }, "Description"),
                  createVNode(_component_Textarea, mergeProps({ id: "description" }, field), null, 16),
                  createVNode(unref(ErrorMessage), { name: "description" })
                ]),
                _: 1
              }),
              createVNode("div", { class: "text-right" }, [
                createVNode(_component_Button, {
                  type: "submit",
                  disabled: unref(isLoading)
                }, {
                  default: withCtx(() => [
                    unref(isLoading) ? (openBlock(), createBlock(_component_LoaderIcon, {
                      key: 0,
                      class: "mr-2 h-4 w-4 animate-spin"
                    })) : createCommentVNode("", true),
                    createTextVNode(" Submit ")
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/dashboard/sponsor_type/Form.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "sponsor_types",
  __ssrInlineRender: true,
  setup(__props) {
    const { axios } = useAxios();
    const sponsorTypes = ref([]);
    useHead({
      title: "Sponsor Type"
    });
    const showDialog = ref(false);
    const editSponsorType = ref(null);
    const fetch = async () => {
      const { data } = await axios.get("/sponsor_types");
      sponsorTypes.value = data;
    };
    const deleteSponsorType = async (id) => {
      await axios.delete(`/sponsor_types/${id}`);
      fetch();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = _sfc_main$2;
      const _component_Table = _sfc_main$5;
      const _component_TableHeader = _sfc_main$3;
      const _component_TableRow = _sfc_main$2$1;
      const _component_TableHead = _sfc_main$1$1;
      const _component_TableBody = _sfc_main$4;
      const _component_TableCell = _sfc_main$3$1;
      const _component_Dialog = _sfc_main$4$1;
      const _component_DialogContent = _sfc_main$2$2;
      const _component_DialogHeader = _sfc_main$6;
      const _component_DialogTitle = _sfc_main$7;
      const _component_DialogDescription = _sfc_main$1$2;
      _push(`<!--[--><div class="flex justify-between items-center mb-4"><h1 class="text-primary text-2xl">Sponsor Type</h1>`);
      _push(ssrRenderComponent(_component_Button, {
        type: "button",
        onClick: ($event) => showDialog.value = true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Add Sponsor Type `);
          } else {
            return [
              createTextVNode("Add Sponsor Type ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_Table, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_TableHeader, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_TableRow, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_TableHead, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Name`);
                            } else {
                              return [
                                createTextVNode("Name")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_TableHead, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Actions`);
                            } else {
                              return [
                                createTextVNode("Actions")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_TableHead, null, {
                            default: withCtx(() => [
                              createTextVNode("Name")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_TableHead, null, {
                            default: withCtx(() => [
                              createTextVNode("Actions")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_TableRow, null, {
                      default: withCtx(() => [
                        createVNode(_component_TableHead, null, {
                          default: withCtx(() => [
                            createTextVNode("Name")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_TableHead, null, {
                          default: withCtx(() => [
                            createTextVNode("Actions")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_TableBody, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(sponsorTypes), (sponsorType) => {
                    _push3(ssrRenderComponent(_component_TableRow, {
                      key: sponsorType.id
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_TableCell, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(sponsorType.name)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(sponsorType.name), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_TableCell, { class: "space-x-2" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_Button, {
                                  type: "button",
                                  modifier: "outline",
                                  size: "icon",
                                  onClick: ($event) => {
                                    showDialog.value = true;
                                    editSponsorType.value = sponsorType;
                                  }
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(PencilIcon), { class: "mr-2 h-4 w-4" }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(unref(PencilIcon), { class: "mr-2 h-4 w-4" })
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(_component_Button, {
                                  type: "button",
                                  variant: "secondary",
                                  modifier: "outline",
                                  size: "icon",
                                  onClick: ($event) => deleteSponsorType(sponsorType.id)
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(TrashIcon), { class: "mr-2 h-4 w-4" }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(unref(TrashIcon), { class: "mr-2 h-4 w-4" })
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_Button, {
                                    type: "button",
                                    modifier: "outline",
                                    size: "icon",
                                    onClick: ($event) => {
                                      showDialog.value = true;
                                      editSponsorType.value = sponsorType;
                                    }
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(PencilIcon), { class: "mr-2 h-4 w-4" })
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"]),
                                  createVNode(_component_Button, {
                                    type: "button",
                                    variant: "secondary",
                                    modifier: "outline",
                                    size: "icon",
                                    onClick: ($event) => deleteSponsorType(sponsorType.id)
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(TrashIcon), { class: "mr-2 h-4 w-4" })
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_TableCell, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(sponsorType.name), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_TableCell, { class: "space-x-2" }, {
                              default: withCtx(() => [
                                createVNode(_component_Button, {
                                  type: "button",
                                  modifier: "outline",
                                  size: "icon",
                                  onClick: ($event) => {
                                    showDialog.value = true;
                                    editSponsorType.value = sponsorType;
                                  }
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(PencilIcon), { class: "mr-2 h-4 w-4" })
                                  ]),
                                  _: 1
                                }, 8, ["onClick"]),
                                createVNode(_component_Button, {
                                  type: "button",
                                  variant: "secondary",
                                  modifier: "outline",
                                  size: "icon",
                                  onClick: ($event) => deleteSponsorType(sponsorType.id)
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(TrashIcon), { class: "mr-2 h-4 w-4" })
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ]),
                              _: 2
                            }, 1024)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(sponsorTypes), (sponsorType) => {
                      return openBlock(), createBlock(_component_TableRow, {
                        key: sponsorType.id
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_TableCell, null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(sponsorType.name), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_component_TableCell, { class: "space-x-2" }, {
                            default: withCtx(() => [
                              createVNode(_component_Button, {
                                type: "button",
                                modifier: "outline",
                                size: "icon",
                                onClick: ($event) => {
                                  showDialog.value = true;
                                  editSponsorType.value = sponsorType;
                                }
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(PencilIcon), { class: "mr-2 h-4 w-4" })
                                ]),
                                _: 1
                              }, 8, ["onClick"]),
                              createVNode(_component_Button, {
                                type: "button",
                                variant: "secondary",
                                modifier: "outline",
                                size: "icon",
                                onClick: ($event) => deleteSponsorType(sponsorType.id)
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(TrashIcon), { class: "mr-2 h-4 w-4" })
                                ]),
                                _: 1
                              }, 8, ["onClick"])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_TableHeader, null, {
                default: withCtx(() => [
                  createVNode(_component_TableRow, null, {
                    default: withCtx(() => [
                      createVNode(_component_TableHead, null, {
                        default: withCtx(() => [
                          createTextVNode("Name")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_TableHead, null, {
                        default: withCtx(() => [
                          createTextVNode("Actions")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_TableBody, null, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(sponsorTypes), (sponsorType) => {
                    return openBlock(), createBlock(_component_TableRow, {
                      key: sponsorType.id
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_TableCell, null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(sponsorType.name), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(_component_TableCell, { class: "space-x-2" }, {
                          default: withCtx(() => [
                            createVNode(_component_Button, {
                              type: "button",
                              modifier: "outline",
                              size: "icon",
                              onClick: ($event) => {
                                showDialog.value = true;
                                editSponsorType.value = sponsorType;
                              }
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(PencilIcon), { class: "mr-2 h-4 w-4" })
                              ]),
                              _: 1
                            }, 8, ["onClick"]),
                            createVNode(_component_Button, {
                              type: "button",
                              variant: "secondary",
                              modifier: "outline",
                              size: "icon",
                              onClick: ($event) => deleteSponsorType(sponsorType.id)
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(TrashIcon), { class: "mr-2 h-4 w-4" })
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Dialog, {
        open: unref(showDialog),
        "onUpdate:open": [($event) => isRef(showDialog) ? showDialog.value = $event : null, ($event) => {
          editSponsorType.value = null;
          showDialog.value = false;
        }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_DialogContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_DialogHeader, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_DialogTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(unref(editSponsorType) ? "Edit" : "Add")} Sponsor Type`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(unref(editSponsorType) ? "Edit" : "Add") + " Sponsor Type", 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_DialogDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` This form collects details regarding your chosen sponsorship tier. `);
                            } else {
                              return [
                                createTextVNode(" This form collects details regarding your chosen sponsorship tier. ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_DialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(editSponsorType) ? "Edit" : "Add") + " Sponsor Type", 1)
                            ]),
                            _: 1
                          }),
                          createVNode(_component_DialogDescription, null, {
                            default: withCtx(() => [
                              createTextVNode(" This form collects details regarding your chosen sponsorship tier. ")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$1, {
                    sponsorType: unref(editSponsorType),
                    onClose: ($event) => {
                      showDialog.value = false;
                      editSponsorType.value = null;
                      fetch();
                    }
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_DialogHeader, null, {
                      default: withCtx(() => [
                        createVNode(_component_DialogTitle, null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(editSponsorType) ? "Edit" : "Add") + " Sponsor Type", 1)
                          ]),
                          _: 1
                        }),
                        createVNode(_component_DialogDescription, null, {
                          default: withCtx(() => [
                            createTextVNode(" This form collects details regarding your chosen sponsorship tier. ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_sfc_main$1, {
                      sponsorType: unref(editSponsorType),
                      onClose: ($event) => {
                        showDialog.value = false;
                        editSponsorType.value = null;
                        fetch();
                      }
                    }, null, 8, ["sponsorType", "onClose"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_DialogContent, null, {
                default: withCtx(() => [
                  createVNode(_component_DialogHeader, null, {
                    default: withCtx(() => [
                      createVNode(_component_DialogTitle, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(editSponsorType) ? "Edit" : "Add") + " Sponsor Type", 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_DialogDescription, null, {
                        default: withCtx(() => [
                          createTextVNode(" This form collects details regarding your chosen sponsorship tier. ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_sfc_main$1, {
                    sponsorType: unref(editSponsorType),
                    onClose: ($event) => {
                      showDialog.value = false;
                      editSponsorType.value = null;
                      fetch();
                    }
                  }, null, 8, ["sponsorType", "onClose"])
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/sponsor_types.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=sponsor_types-Bp8sS0Mv.mjs.map
