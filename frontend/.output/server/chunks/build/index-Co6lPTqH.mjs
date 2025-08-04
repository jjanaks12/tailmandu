import { _ as _sfc_main$4, a as _sfc_main$2$1, b as _sfc_main$5, c as _sfc_main$1$1 } from './DialogTitle-D-qBX5zY.mjs';
import { _ as _sfc_main$3 } from './DialogHeader-yD3_yzIy.mjs';
import { defineComponent, withCtx, unref, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, mergeProps, renderSlot, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { DialogTrigger } from 'reka-ui';
import { _ as _sfc_main$2 } from './index-C1GnAqFM.mjs';
import { _ as _sfc_main$6$1, a as _sfc_main$1$2, b as _sfc_main$7, c as _sfc_main$5$1, d as _sfc_main$4$1 } from './SelectValue-L58LLnds.mjs';
import { _ as _sfc_main$8 } from './Input-D7-VbNDD.mjs';
import { _ as _sfc_main$5$2, a as _sfc_main$9, b as _sfc_main$2$2, c as _sfc_main$1$3, d as _sfc_main$4$2, e as _sfc_main$3$1 } from './TableHeader-CVOW9Aa9.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-ClNoEpxG.mjs';
import { a as _sfc_main$a, _ as _sfc_main$1$4 } from './index-CgKbJvNg.mjs';
import { _ as _sfc_main$3$2, a as _sfc_main$b, b as _sfc_main$2$3, c as _sfc_main$1$6 } from './DropdownMenuTrigger-CYBCbCdb.mjs';
import { _ as _sfc_main$1$5, a as _sfc_main$c } from './DropdownMenuSeparator-Bzci-EU0.mjs';
import { CalendarIcon, SlidersVertical, Search, EllipsisVertical, Eye, Pencil, Trash } from 'lucide-vue-next';
import { Form, Field } from 'vee-validate';
import _sfc_main$6 from './form-hvcefGsM.mjs';
import { u as useHead } from './v3-Cs620QXS.mjs';
import './virtual_nuxt__Users_janakshrestha_Documents_2025_05_May_trailmandu_frontend_.nuxt_shadcn-nuxt_utils-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
import './index-LYqOXnlG.mjs';
import 'class-variance-authority';
import './index-PQOYgYe9.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'pinia';
import 'vue-router';
import 'deep-pick-omit';
import 'axios';
import 'vue-sonner';
import './Textarea-BBwOHM7r.mjs';
import './DatePicker-BoO5mdIx.mjs';
import '@internationalized/date';
import 'reka-ui/date';
import 'yup';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "DialogTrigger",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogTrigger), mergeProps({ "data-slot": "dialog-trigger" }, props, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/dialog/DialogTrigger.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Events"
    });
    const statuses = ["completed", "ongoing", "coming soon"];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = _sfc_main$4;
      const _component_DialogTrigger = _sfc_main$1;
      const _component_Button = _sfc_main$2;
      const _component_DialogContent = _sfc_main$2$1;
      const _component_DialogHeader = _sfc_main$3;
      const _component_DialogTitle = _sfc_main$5;
      const _component_DialogDescription = _sfc_main$1$1;
      const _component_Select = _sfc_main$6$1;
      const _component_SelectTrigger = _sfc_main$1$2;
      const _component_SelectValue = _sfc_main$7;
      const _component_SelectContent = _sfc_main$5$1;
      const _component_SelectItem = _sfc_main$4$1;
      const _component_Input = _sfc_main$8;
      const _component_Table = _sfc_main$5$2;
      const _component_TableHeader = _sfc_main$9;
      const _component_TableRow = _sfc_main$2$2;
      const _component_TableHead = _sfc_main$1$3;
      const _component_TableBody = _sfc_main$4$2;
      const _component_TableCell = _sfc_main$3$1;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Badge = _sfc_main$a;
      const _component_DropdownMenu = _sfc_main$3$2;
      const _component_DropdownMenuTrigger = _sfc_main$b;
      const _component_DropdownMenuContent = _sfc_main$2$3;
      const _component_DropdownMenuGroup = _sfc_main$1$4;
      const _component_DropdownMenuLabel = _sfc_main$1$5;
      const _component_DropdownMenuSeparator = _sfc_main$c;
      const _component_DropdownMenuItem = _sfc_main$1$6;
      _push(`<!--[--><div class="flex items-center justify-between mb-12"><h1 class="text-2xl">Events</h1>`);
      _push(ssrRenderComponent(_component_Dialog, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_DialogTrigger, { "as-child": "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Button, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(CalendarIcon), null, null, _parent4, _scopeId3));
                        _push4(` Add new Event `);
                      } else {
                        return [
                          createVNode(unref(CalendarIcon)),
                          createTextVNode(" Add new Event ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Button, null, {
                      default: withCtx(() => [
                        createVNode(unref(CalendarIcon)),
                        createTextVNode(" Add new Event ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_DialogContent, { class: "sm:max-w-md" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_DialogHeader, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_DialogTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Event`);
                            } else {
                              return [
                                createTextVNode("Event")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_DialogDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Anyone who has this link will be able to view this. `);
                            } else {
                              return [
                                createTextVNode(" Anyone who has this link will be able to view this. ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_DialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Event")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_DialogDescription, null, {
                            default: withCtx(() => [
                              createTextVNode(" Anyone who has this link will be able to view this. ")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$6, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_DialogHeader, null, {
                      default: withCtx(() => [
                        createVNode(_component_DialogTitle, null, {
                          default: withCtx(() => [
                            createTextVNode("Event")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_DialogDescription, null, {
                          default: withCtx(() => [
                            createTextVNode(" Anyone who has this link will be able to view this. ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_sfc_main$6)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_DialogTrigger, { "as-child": "" }, {
                default: withCtx(() => [
                  createVNode(_component_Button, null, {
                    default: withCtx(() => [
                      createVNode(unref(CalendarIcon)),
                      createTextVNode(" Add new Event ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_DialogContent, { class: "sm:max-w-md" }, {
                default: withCtx(() => [
                  createVNode(_component_DialogHeader, null, {
                    default: withCtx(() => [
                      createVNode(_component_DialogTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Event")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_DialogDescription, null, {
                        default: withCtx(() => [
                          createTextVNode(" Anyone who has this link will be able to view this. ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_sfc_main$6)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex items-end gap-4 mb-20"><div class="flex-grow"><div class="flex gap-2 mb-4">`);
      _push(ssrRenderComponent(unref(SlidersVertical), null, null, _parent));
      _push(` Filters </div>`);
      _push(ssrRenderComponent(unref(Form), { class: "flex flex-wrap gap-2" }, {
        default: withCtx(({ values }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Field), {
              as: "div",
              type: "radio",
              name: "status",
              class: "w-1/3 flex gap-2"
            }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Select, field, {
                    default: withCtx((_, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_SelectTrigger, { class: "w-full" }, {
                          default: withCtx((_2, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_SelectValue, { placeholder: "Status" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_SelectValue, { placeholder: "Status" })
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_SelectContent, null, {
                          default: withCtx((_2, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(statuses, (status) => {
                                _push5(ssrRenderComponent(_component_SelectItem, { value: status }, {
                                  default: withCtx((_3, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(status)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(status), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(), createBlock(Fragment, null, renderList(statuses, (status) => {
                                  return createVNode(_component_SelectItem, { value: status }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(status), 1)
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
                          createVNode(_component_SelectTrigger, { class: "w-full" }, {
                            default: withCtx(() => [
                              createVNode(_component_SelectValue, { placeholder: "Status" })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_SelectContent, null, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(statuses, (status) => {
                                return createVNode(_component_SelectItem, { value: status }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(status), 1)
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
                } else {
                  return [
                    createVNode(_component_Select, field, {
                      default: withCtx(() => [
                        createVNode(_component_SelectTrigger, { class: "w-full" }, {
                          default: withCtx(() => [
                            createVNode(_component_SelectValue, { placeholder: "Status" })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_SelectContent, null, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(Fragment, null, renderList(statuses, (status) => {
                              return createVNode(_component_SelectItem, { value: status }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(status), 1)
                                ]),
                                _: 2
                              }, 1032, ["value"]);
                            }), 64))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 2
                    }, 1040)
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Field), {
                as: "div",
                type: "radio",
                name: "status",
                class: "w-1/3 flex gap-2"
              }, {
                default: withCtx(({ field }) => [
                  createVNode(_component_Select, field, {
                    default: withCtx(() => [
                      createVNode(_component_SelectTrigger, { class: "w-full" }, {
                        default: withCtx(() => [
                          createVNode(_component_SelectValue, { placeholder: "Status" })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_SelectContent, null, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(Fragment, null, renderList(statuses, (status) => {
                            return createVNode(_component_SelectItem, { value: status }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(status), 1)
                              ]),
                              _: 2
                            }, 1032, ["value"]);
                          }), 64))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 2
                  }, 1040)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(unref(Form), { class: "max-w-[320px] w-full flex items-center gap-2" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Field), { name: "search" }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Input, mergeProps(field, { placeholder: "Search Events" }), null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Input, mergeProps(field, { placeholder: "Search Events" }), null, 16)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, {
              variant: "secondary",
              size: "lg"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Search), null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Search))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Field), { name: "search" }, {
                default: withCtx(({ field }) => [
                  createVNode(_component_Input, mergeProps(field, { placeholder: "Search Events" }), null, 16)
                ]),
                _: 1
              }),
              createVNode(_component_Button, {
                variant: "secondary",
                size: "lg"
              }, {
                default: withCtx(() => [
                  createVNode(unref(Search))
                ]),
                _: 1
              })
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
                              _push5(`SN`);
                            } else {
                              return [
                                createTextVNode("SN")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_TableHead, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`User`);
                            } else {
                              return [
                                createTextVNode("User")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_TableHead, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Status`);
                            } else {
                              return [
                                createTextVNode("Status")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_TableHead, { class: "text-right" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Action`);
                            } else {
                              return [
                                createTextVNode("Action")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_TableHead, null, {
                            default: withCtx(() => [
                              createTextVNode("SN")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_TableHead, null, {
                            default: withCtx(() => [
                              createTextVNode("User")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_TableHead, null, {
                            default: withCtx(() => [
                              createTextVNode("Status")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_TableHead, { class: "text-right" }, {
                            default: withCtx(() => [
                              createTextVNode("Action")
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
                            createTextVNode("SN")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_TableHead, null, {
                          default: withCtx(() => [
                            createTextVNode("User")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_TableHead, null, {
                          default: withCtx(() => [
                            createTextVNode("Status")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_TableHead, { class: "text-right" }, {
                          default: withCtx(() => [
                            createTextVNode("Action")
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
                  _push3(ssrRenderComponent(_component_TableRow, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_TableCell, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`1`);
                            } else {
                              return [
                                createTextVNode("1")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_TableCell, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_NuxtLink, { to: "/dashboard/events?id=1" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Event Name`);
                                  } else {
                                    return [
                                      createTextVNode("Event Name")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<em class="not-italic block"${_scopeId4}>Starts from</em><em class="not-italic block"${_scopeId4}>Ends At</em>`);
                            } else {
                              return [
                                createVNode(_component_NuxtLink, { to: "/dashboard/events?id=1" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Event Name")
                                  ]),
                                  _: 1
                                }),
                                createVNode("em", { class: "not-italic block" }, "Starts from"),
                                createVNode("em", { class: "not-italic block" }, "Ends At")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_TableCell, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_Badge, { variant: "info" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Comming soon`);
                                  } else {
                                    return [
                                      createTextVNode("Comming soon")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_Badge, { variant: "info" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Comming soon")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_TableCell, { class: "text-right" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_DropdownMenu, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_DropdownMenuTrigger, { "as-child": "" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_Button, { variant: "outline" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(unref(EllipsisVertical), null, null, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(unref(EllipsisVertical))
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_Button, { variant: "outline" }, {
                                              default: withCtx(() => [
                                                createVNode(unref(EllipsisVertical))
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_DropdownMenuContent, { class: "w-56" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_DropdownMenuGroup, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(_component_DropdownMenuLabel, null, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`Actions`);
                                                    } else {
                                                      return [
                                                        createTextVNode("Actions")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_DropdownMenuSeparator, null, null, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_DropdownMenuItem, null, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(ssrRenderComponent(unref(Eye), null, null, _parent9, _scopeId8));
                                                      _push9(`<span${_scopeId8}>View</span>`);
                                                    } else {
                                                      return [
                                                        createVNode(unref(Eye)),
                                                        createVNode("span", null, "View")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_DropdownMenuItem, null, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(ssrRenderComponent(unref(Pencil), null, null, _parent9, _scopeId8));
                                                      _push9(`<span${_scopeId8}>Edit</span>`);
                                                    } else {
                                                      return [
                                                        createVNode(unref(Pencil)),
                                                        createVNode("span", null, "Edit")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_DropdownMenuItem, null, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(ssrRenderComponent(unref(Trash), null, null, _parent9, _scopeId8));
                                                      _push9(`<span${_scopeId8}>Delete</span>`);
                                                    } else {
                                                      return [
                                                        createVNode(unref(Trash)),
                                                        createVNode("span", null, "Delete")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(_component_DropdownMenuLabel, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Actions")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_DropdownMenuSeparator),
                                                  createVNode(_component_DropdownMenuItem, null, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(Eye)),
                                                      createVNode("span", null, "View")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_DropdownMenuItem, null, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(Pencil)),
                                                      createVNode("span", null, "Edit")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_DropdownMenuItem, null, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(Trash)),
                                                      createVNode("span", null, "Delete")
                                                    ]),
                                                    _: 1
                                                  })
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_component_DropdownMenuSeparator, null, null, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_component_DropdownMenuGroup, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(_component_DropdownMenuLabel, null, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`Update status`);
                                                    } else {
                                                      return [
                                                        createTextVNode("Update status")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_DropdownMenuSeparator, null, null, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_DropdownMenuItem, { class: "text-yellow-500" }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`Pending`);
                                                    } else {
                                                      return [
                                                        createTextVNode("Pending")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_DropdownMenuItem, { class: "text-red-500" }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`Rejected`);
                                                    } else {
                                                      return [
                                                        createTextVNode("Rejected")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_DropdownMenuItem, { class: "text-green-500" }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`Approved`);
                                                    } else {
                                                      return [
                                                        createTextVNode("Approved")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_DropdownMenuItem, { class: "text-gray-500" }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`Cancelled`);
                                                    } else {
                                                      return [
                                                        createTextVNode("Cancelled")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(_component_DropdownMenuLabel, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Update status")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_DropdownMenuSeparator),
                                                  createVNode(_component_DropdownMenuItem, { class: "text-yellow-500" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Pending")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_DropdownMenuItem, { class: "text-red-500" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Rejected")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_DropdownMenuItem, { class: "text-green-500" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Approved")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_DropdownMenuItem, { class: "text-gray-500" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Cancelled")
                                                    ]),
                                                    _: 1
                                                  })
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_DropdownMenuGroup, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_DropdownMenuLabel, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Actions")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_DropdownMenuSeparator),
                                                createVNode(_component_DropdownMenuItem, null, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(Eye)),
                                                    createVNode("span", null, "View")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_DropdownMenuItem, null, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(Pencil)),
                                                    createVNode("span", null, "Edit")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_DropdownMenuItem, null, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(Trash)),
                                                    createVNode("span", null, "Delete")
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_DropdownMenuSeparator),
                                            createVNode(_component_DropdownMenuGroup, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_DropdownMenuLabel, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Update status")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_DropdownMenuSeparator),
                                                createVNode(_component_DropdownMenuItem, { class: "text-yellow-500" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Pending")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_DropdownMenuItem, { class: "text-red-500" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Rejected")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_DropdownMenuItem, { class: "text-green-500" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Approved")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_DropdownMenuItem, { class: "text-gray-500" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Cancelled")
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
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_DropdownMenuTrigger, { "as-child": "" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_Button, { variant: "outline" }, {
                                            default: withCtx(() => [
                                              createVNode(unref(EllipsisVertical))
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_DropdownMenuContent, { class: "w-56" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_DropdownMenuGroup, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_DropdownMenuLabel, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Actions")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_DropdownMenuSeparator),
                                              createVNode(_component_DropdownMenuItem, null, {
                                                default: withCtx(() => [
                                                  createVNode(unref(Eye)),
                                                  createVNode("span", null, "View")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_DropdownMenuItem, null, {
                                                default: withCtx(() => [
                                                  createVNode(unref(Pencil)),
                                                  createVNode("span", null, "Edit")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_DropdownMenuItem, null, {
                                                default: withCtx(() => [
                                                  createVNode(unref(Trash)),
                                                  createVNode("span", null, "Delete")
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_DropdownMenuSeparator),
                                          createVNode(_component_DropdownMenuGroup, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_DropdownMenuLabel, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Update status")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_DropdownMenuSeparator),
                                              createVNode(_component_DropdownMenuItem, { class: "text-yellow-500" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Pending")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_DropdownMenuItem, { class: "text-red-500" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Rejected")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_DropdownMenuItem, { class: "text-green-500" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Approved")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_DropdownMenuItem, { class: "text-gray-500" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Cancelled")
                                                ]),
                                                _: 1
                                              })
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
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_DropdownMenu, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_DropdownMenuTrigger, { "as-child": "" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_Button, { variant: "outline" }, {
                                          default: withCtx(() => [
                                            createVNode(unref(EllipsisVertical))
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_DropdownMenuContent, { class: "w-56" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_DropdownMenuGroup, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_DropdownMenuLabel, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Actions")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_DropdownMenuSeparator),
                                            createVNode(_component_DropdownMenuItem, null, {
                                              default: withCtx(() => [
                                                createVNode(unref(Eye)),
                                                createVNode("span", null, "View")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_DropdownMenuItem, null, {
                                              default: withCtx(() => [
                                                createVNode(unref(Pencil)),
                                                createVNode("span", null, "Edit")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_DropdownMenuItem, null, {
                                              default: withCtx(() => [
                                                createVNode(unref(Trash)),
                                                createVNode("span", null, "Delete")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_DropdownMenuSeparator),
                                        createVNode(_component_DropdownMenuGroup, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_DropdownMenuLabel, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Update status")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_DropdownMenuSeparator),
                                            createVNode(_component_DropdownMenuItem, { class: "text-yellow-500" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Pending")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_DropdownMenuItem, { class: "text-red-500" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Rejected")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_DropdownMenuItem, { class: "text-green-500" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Approved")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_DropdownMenuItem, { class: "text-gray-500" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Cancelled")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        })
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
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_TableCell, null, {
                            default: withCtx(() => [
                              createTextVNode("1")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_TableCell, null, {
                            default: withCtx(() => [
                              createVNode(_component_NuxtLink, { to: "/dashboard/events?id=1" }, {
                                default: withCtx(() => [
                                  createTextVNode("Event Name")
                                ]),
                                _: 1
                              }),
                              createVNode("em", { class: "not-italic block" }, "Starts from"),
                              createVNode("em", { class: "not-italic block" }, "Ends At")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_TableCell, null, {
                            default: withCtx(() => [
                              createVNode(_component_Badge, { variant: "info" }, {
                                default: withCtx(() => [
                                  createTextVNode("Comming soon")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_TableCell, { class: "text-right" }, {
                            default: withCtx(() => [
                              createVNode(_component_DropdownMenu, null, {
                                default: withCtx(() => [
                                  createVNode(_component_DropdownMenuTrigger, { "as-child": "" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_Button, { variant: "outline" }, {
                                        default: withCtx(() => [
                                          createVNode(unref(EllipsisVertical))
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_DropdownMenuContent, { class: "w-56" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_DropdownMenuGroup, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_DropdownMenuLabel, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Actions")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_DropdownMenuSeparator),
                                          createVNode(_component_DropdownMenuItem, null, {
                                            default: withCtx(() => [
                                              createVNode(unref(Eye)),
                                              createVNode("span", null, "View")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_DropdownMenuItem, null, {
                                            default: withCtx(() => [
                                              createVNode(unref(Pencil)),
                                              createVNode("span", null, "Edit")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_DropdownMenuItem, null, {
                                            default: withCtx(() => [
                                              createVNode(unref(Trash)),
                                              createVNode("span", null, "Delete")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_DropdownMenuSeparator),
                                      createVNode(_component_DropdownMenuGroup, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_DropdownMenuLabel, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Update status")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_DropdownMenuSeparator),
                                          createVNode(_component_DropdownMenuItem, { class: "text-yellow-500" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Pending")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_DropdownMenuItem, { class: "text-red-500" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Rejected")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_DropdownMenuItem, { class: "text-green-500" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Approved")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_DropdownMenuItem, { class: "text-gray-500" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Cancelled")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
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
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_TableRow, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_TableCell, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`1`);
                            } else {
                              return [
                                createTextVNode("1")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_TableCell, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_NuxtLink, { to: "/dashboard/events?id=1" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Event Name`);
                                  } else {
                                    return [
                                      createTextVNode("Event Name")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<em class="not-italic block"${_scopeId4}>Starts from</em><em class="not-italic block"${_scopeId4}>Ends At</em>`);
                            } else {
                              return [
                                createVNode(_component_NuxtLink, { to: "/dashboard/events?id=1" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Event Name")
                                  ]),
                                  _: 1
                                }),
                                createVNode("em", { class: "not-italic block" }, "Starts from"),
                                createVNode("em", { class: "not-italic block" }, "Ends At")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_TableCell, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_Badge, { variant: "success" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`ongoing`);
                                  } else {
                                    return [
                                      createTextVNode("ongoing")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_Badge, { variant: "success" }, {
                                  default: withCtx(() => [
                                    createTextVNode("ongoing")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_TableCell, { class: "text-right" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_DropdownMenu, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_DropdownMenuTrigger, { "as-child": "" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_Button, { variant: "outline" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(unref(EllipsisVertical), null, null, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(unref(EllipsisVertical))
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_Button, { variant: "outline" }, {
                                              default: withCtx(() => [
                                                createVNode(unref(EllipsisVertical))
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_DropdownMenuContent, { class: "w-56" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_DropdownMenuGroup, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(_component_DropdownMenuLabel, null, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`Actions`);
                                                    } else {
                                                      return [
                                                        createTextVNode("Actions")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_DropdownMenuSeparator, null, null, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_DropdownMenuItem, null, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(ssrRenderComponent(unref(Eye), null, null, _parent9, _scopeId8));
                                                      _push9(`<span${_scopeId8}>View</span>`);
                                                    } else {
                                                      return [
                                                        createVNode(unref(Eye)),
                                                        createVNode("span", null, "View")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_DropdownMenuItem, null, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(ssrRenderComponent(unref(Pencil), null, null, _parent9, _scopeId8));
                                                      _push9(`<span${_scopeId8}>Edit</span>`);
                                                    } else {
                                                      return [
                                                        createVNode(unref(Pencil)),
                                                        createVNode("span", null, "Edit")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_DropdownMenuItem, null, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(ssrRenderComponent(unref(Trash), null, null, _parent9, _scopeId8));
                                                      _push9(`<span${_scopeId8}>Delete</span>`);
                                                    } else {
                                                      return [
                                                        createVNode(unref(Trash)),
                                                        createVNode("span", null, "Delete")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(_component_DropdownMenuLabel, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Actions")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_DropdownMenuSeparator),
                                                  createVNode(_component_DropdownMenuItem, null, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(Eye)),
                                                      createVNode("span", null, "View")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_DropdownMenuItem, null, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(Pencil)),
                                                      createVNode("span", null, "Edit")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_DropdownMenuItem, null, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(Trash)),
                                                      createVNode("span", null, "Delete")
                                                    ]),
                                                    _: 1
                                                  })
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_component_DropdownMenuSeparator, null, null, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_component_DropdownMenuGroup, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(_component_DropdownMenuLabel, null, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`Update status`);
                                                    } else {
                                                      return [
                                                        createTextVNode("Update status")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_DropdownMenuSeparator, null, null, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_DropdownMenuItem, { class: "text-yellow-500" }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`Pending`);
                                                    } else {
                                                      return [
                                                        createTextVNode("Pending")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_DropdownMenuItem, { class: "text-red-500" }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`Rejected`);
                                                    } else {
                                                      return [
                                                        createTextVNode("Rejected")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_DropdownMenuItem, { class: "text-green-500" }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`Approved`);
                                                    } else {
                                                      return [
                                                        createTextVNode("Approved")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_DropdownMenuItem, { class: "text-gray-500" }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`Cancelled`);
                                                    } else {
                                                      return [
                                                        createTextVNode("Cancelled")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(_component_DropdownMenuLabel, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Update status")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_DropdownMenuSeparator),
                                                  createVNode(_component_DropdownMenuItem, { class: "text-yellow-500" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Pending")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_DropdownMenuItem, { class: "text-red-500" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Rejected")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_DropdownMenuItem, { class: "text-green-500" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Approved")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_DropdownMenuItem, { class: "text-gray-500" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Cancelled")
                                                    ]),
                                                    _: 1
                                                  })
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_DropdownMenuGroup, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_DropdownMenuLabel, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Actions")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_DropdownMenuSeparator),
                                                createVNode(_component_DropdownMenuItem, null, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(Eye)),
                                                    createVNode("span", null, "View")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_DropdownMenuItem, null, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(Pencil)),
                                                    createVNode("span", null, "Edit")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_DropdownMenuItem, null, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(Trash)),
                                                    createVNode("span", null, "Delete")
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_DropdownMenuSeparator),
                                            createVNode(_component_DropdownMenuGroup, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_DropdownMenuLabel, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Update status")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_DropdownMenuSeparator),
                                                createVNode(_component_DropdownMenuItem, { class: "text-yellow-500" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Pending")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_DropdownMenuItem, { class: "text-red-500" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Rejected")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_DropdownMenuItem, { class: "text-green-500" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Approved")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_DropdownMenuItem, { class: "text-gray-500" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Cancelled")
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
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_DropdownMenuTrigger, { "as-child": "" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_Button, { variant: "outline" }, {
                                            default: withCtx(() => [
                                              createVNode(unref(EllipsisVertical))
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_DropdownMenuContent, { class: "w-56" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_DropdownMenuGroup, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_DropdownMenuLabel, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Actions")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_DropdownMenuSeparator),
                                              createVNode(_component_DropdownMenuItem, null, {
                                                default: withCtx(() => [
                                                  createVNode(unref(Eye)),
                                                  createVNode("span", null, "View")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_DropdownMenuItem, null, {
                                                default: withCtx(() => [
                                                  createVNode(unref(Pencil)),
                                                  createVNode("span", null, "Edit")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_DropdownMenuItem, null, {
                                                default: withCtx(() => [
                                                  createVNode(unref(Trash)),
                                                  createVNode("span", null, "Delete")
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_DropdownMenuSeparator),
                                          createVNode(_component_DropdownMenuGroup, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_DropdownMenuLabel, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Update status")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_DropdownMenuSeparator),
                                              createVNode(_component_DropdownMenuItem, { class: "text-yellow-500" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Pending")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_DropdownMenuItem, { class: "text-red-500" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Rejected")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_DropdownMenuItem, { class: "text-green-500" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Approved")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_DropdownMenuItem, { class: "text-gray-500" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Cancelled")
                                                ]),
                                                _: 1
                                              })
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
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_DropdownMenu, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_DropdownMenuTrigger, { "as-child": "" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_Button, { variant: "outline" }, {
                                          default: withCtx(() => [
                                            createVNode(unref(EllipsisVertical))
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_DropdownMenuContent, { class: "w-56" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_DropdownMenuGroup, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_DropdownMenuLabel, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Actions")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_DropdownMenuSeparator),
                                            createVNode(_component_DropdownMenuItem, null, {
                                              default: withCtx(() => [
                                                createVNode(unref(Eye)),
                                                createVNode("span", null, "View")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_DropdownMenuItem, null, {
                                              default: withCtx(() => [
                                                createVNode(unref(Pencil)),
                                                createVNode("span", null, "Edit")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_DropdownMenuItem, null, {
                                              default: withCtx(() => [
                                                createVNode(unref(Trash)),
                                                createVNode("span", null, "Delete")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_DropdownMenuSeparator),
                                        createVNode(_component_DropdownMenuGroup, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_DropdownMenuLabel, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Update status")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_DropdownMenuSeparator),
                                            createVNode(_component_DropdownMenuItem, { class: "text-yellow-500" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Pending")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_DropdownMenuItem, { class: "text-red-500" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Rejected")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_DropdownMenuItem, { class: "text-green-500" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Approved")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_DropdownMenuItem, { class: "text-gray-500" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Cancelled")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        })
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
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_TableCell, null, {
                            default: withCtx(() => [
                              createTextVNode("1")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_TableCell, null, {
                            default: withCtx(() => [
                              createVNode(_component_NuxtLink, { to: "/dashboard/events?id=1" }, {
                                default: withCtx(() => [
                                  createTextVNode("Event Name")
                                ]),
                                _: 1
                              }),
                              createVNode("em", { class: "not-italic block" }, "Starts from"),
                              createVNode("em", { class: "not-italic block" }, "Ends At")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_TableCell, null, {
                            default: withCtx(() => [
                              createVNode(_component_Badge, { variant: "success" }, {
                                default: withCtx(() => [
                                  createTextVNode("ongoing")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_TableCell, { class: "text-right" }, {
                            default: withCtx(() => [
                              createVNode(_component_DropdownMenu, null, {
                                default: withCtx(() => [
                                  createVNode(_component_DropdownMenuTrigger, { "as-child": "" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_Button, { variant: "outline" }, {
                                        default: withCtx(() => [
                                          createVNode(unref(EllipsisVertical))
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_DropdownMenuContent, { class: "w-56" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_DropdownMenuGroup, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_DropdownMenuLabel, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Actions")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_DropdownMenuSeparator),
                                          createVNode(_component_DropdownMenuItem, null, {
                                            default: withCtx(() => [
                                              createVNode(unref(Eye)),
                                              createVNode("span", null, "View")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_DropdownMenuItem, null, {
                                            default: withCtx(() => [
                                              createVNode(unref(Pencil)),
                                              createVNode("span", null, "Edit")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_DropdownMenuItem, null, {
                                            default: withCtx(() => [
                                              createVNode(unref(Trash)),
                                              createVNode("span", null, "Delete")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_DropdownMenuSeparator),
                                      createVNode(_component_DropdownMenuGroup, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_DropdownMenuLabel, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Update status")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_DropdownMenuSeparator),
                                          createVNode(_component_DropdownMenuItem, { class: "text-yellow-500" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Pending")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_DropdownMenuItem, { class: "text-red-500" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Rejected")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_DropdownMenuItem, { class: "text-green-500" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Approved")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_DropdownMenuItem, { class: "text-gray-500" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Cancelled")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
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
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_TableRow, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_TableCell, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`1`);
                            } else {
                              return [
                                createTextVNode("1")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_TableCell, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_NuxtLink, { to: "/dashboard/events?id=1" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Event Name`);
                                  } else {
                                    return [
                                      createTextVNode("Event Name")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<em class="not-italic block"${_scopeId4}>Starts from</em><em class="not-italic block"${_scopeId4}>Ends At</em>`);
                            } else {
                              return [
                                createVNode(_component_NuxtLink, { to: "/dashboard/events?id=1" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Event Name")
                                  ]),
                                  _: 1
                                }),
                                createVNode("em", { class: "not-italic block" }, "Starts from"),
                                createVNode("em", { class: "not-italic block" }, "Ends At")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_TableCell, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_Badge, { variant: "outline" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Finished`);
                                  } else {
                                    return [
                                      createTextVNode("Finished")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_Badge, { variant: "outline" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Finished")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_TableCell, { class: "text-right" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_DropdownMenu, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_DropdownMenuTrigger, { "as-child": "" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_Button, { variant: "outline" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(unref(EllipsisVertical), null, null, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(unref(EllipsisVertical))
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_Button, { variant: "outline" }, {
                                              default: withCtx(() => [
                                                createVNode(unref(EllipsisVertical))
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_DropdownMenuContent, { class: "w-56" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_DropdownMenuGroup, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(_component_DropdownMenuLabel, null, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`Actions`);
                                                    } else {
                                                      return [
                                                        createTextVNode("Actions")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_DropdownMenuSeparator, null, null, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_DropdownMenuItem, null, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(ssrRenderComponent(unref(Eye), null, null, _parent9, _scopeId8));
                                                      _push9(`<span${_scopeId8}>View</span>`);
                                                    } else {
                                                      return [
                                                        createVNode(unref(Eye)),
                                                        createVNode("span", null, "View")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_DropdownMenuItem, null, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(ssrRenderComponent(unref(Pencil), null, null, _parent9, _scopeId8));
                                                      _push9(`<span${_scopeId8}>Edit</span>`);
                                                    } else {
                                                      return [
                                                        createVNode(unref(Pencil)),
                                                        createVNode("span", null, "Edit")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_DropdownMenuItem, null, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(ssrRenderComponent(unref(Trash), null, null, _parent9, _scopeId8));
                                                      _push9(`<span${_scopeId8}>Delete</span>`);
                                                    } else {
                                                      return [
                                                        createVNode(unref(Trash)),
                                                        createVNode("span", null, "Delete")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(_component_DropdownMenuLabel, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Actions")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_DropdownMenuSeparator),
                                                  createVNode(_component_DropdownMenuItem, null, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(Eye)),
                                                      createVNode("span", null, "View")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_DropdownMenuItem, null, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(Pencil)),
                                                      createVNode("span", null, "Edit")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_DropdownMenuItem, null, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(Trash)),
                                                      createVNode("span", null, "Delete")
                                                    ]),
                                                    _: 1
                                                  })
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_component_DropdownMenuSeparator, null, null, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_component_DropdownMenuGroup, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(_component_DropdownMenuLabel, null, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`Update status`);
                                                    } else {
                                                      return [
                                                        createTextVNode("Update status")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_DropdownMenuSeparator, null, null, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_DropdownMenuItem, { class: "text-yellow-500" }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`Pending`);
                                                    } else {
                                                      return [
                                                        createTextVNode("Pending")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_DropdownMenuItem, { class: "text-red-500" }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`Rejected`);
                                                    } else {
                                                      return [
                                                        createTextVNode("Rejected")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_DropdownMenuItem, { class: "text-green-500" }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`Approved`);
                                                    } else {
                                                      return [
                                                        createTextVNode("Approved")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_DropdownMenuItem, { class: "text-gray-500" }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`Cancelled`);
                                                    } else {
                                                      return [
                                                        createTextVNode("Cancelled")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(_component_DropdownMenuLabel, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Update status")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_DropdownMenuSeparator),
                                                  createVNode(_component_DropdownMenuItem, { class: "text-yellow-500" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Pending")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_DropdownMenuItem, { class: "text-red-500" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Rejected")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_DropdownMenuItem, { class: "text-green-500" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Approved")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_DropdownMenuItem, { class: "text-gray-500" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Cancelled")
                                                    ]),
                                                    _: 1
                                                  })
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_DropdownMenuGroup, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_DropdownMenuLabel, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Actions")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_DropdownMenuSeparator),
                                                createVNode(_component_DropdownMenuItem, null, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(Eye)),
                                                    createVNode("span", null, "View")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_DropdownMenuItem, null, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(Pencil)),
                                                    createVNode("span", null, "Edit")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_DropdownMenuItem, null, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(Trash)),
                                                    createVNode("span", null, "Delete")
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_DropdownMenuSeparator),
                                            createVNode(_component_DropdownMenuGroup, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_DropdownMenuLabel, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Update status")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_DropdownMenuSeparator),
                                                createVNode(_component_DropdownMenuItem, { class: "text-yellow-500" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Pending")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_DropdownMenuItem, { class: "text-red-500" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Rejected")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_DropdownMenuItem, { class: "text-green-500" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Approved")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_DropdownMenuItem, { class: "text-gray-500" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Cancelled")
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
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_DropdownMenuTrigger, { "as-child": "" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_Button, { variant: "outline" }, {
                                            default: withCtx(() => [
                                              createVNode(unref(EllipsisVertical))
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_DropdownMenuContent, { class: "w-56" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_DropdownMenuGroup, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_DropdownMenuLabel, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Actions")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_DropdownMenuSeparator),
                                              createVNode(_component_DropdownMenuItem, null, {
                                                default: withCtx(() => [
                                                  createVNode(unref(Eye)),
                                                  createVNode("span", null, "View")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_DropdownMenuItem, null, {
                                                default: withCtx(() => [
                                                  createVNode(unref(Pencil)),
                                                  createVNode("span", null, "Edit")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_DropdownMenuItem, null, {
                                                default: withCtx(() => [
                                                  createVNode(unref(Trash)),
                                                  createVNode("span", null, "Delete")
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_DropdownMenuSeparator),
                                          createVNode(_component_DropdownMenuGroup, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_DropdownMenuLabel, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Update status")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_DropdownMenuSeparator),
                                              createVNode(_component_DropdownMenuItem, { class: "text-yellow-500" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Pending")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_DropdownMenuItem, { class: "text-red-500" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Rejected")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_DropdownMenuItem, { class: "text-green-500" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Approved")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_DropdownMenuItem, { class: "text-gray-500" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Cancelled")
                                                ]),
                                                _: 1
                                              })
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
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_DropdownMenu, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_DropdownMenuTrigger, { "as-child": "" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_Button, { variant: "outline" }, {
                                          default: withCtx(() => [
                                            createVNode(unref(EllipsisVertical))
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_DropdownMenuContent, { class: "w-56" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_DropdownMenuGroup, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_DropdownMenuLabel, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Actions")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_DropdownMenuSeparator),
                                            createVNode(_component_DropdownMenuItem, null, {
                                              default: withCtx(() => [
                                                createVNode(unref(Eye)),
                                                createVNode("span", null, "View")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_DropdownMenuItem, null, {
                                              default: withCtx(() => [
                                                createVNode(unref(Pencil)),
                                                createVNode("span", null, "Edit")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_DropdownMenuItem, null, {
                                              default: withCtx(() => [
                                                createVNode(unref(Trash)),
                                                createVNode("span", null, "Delete")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_DropdownMenuSeparator),
                                        createVNode(_component_DropdownMenuGroup, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_DropdownMenuLabel, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Update status")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_DropdownMenuSeparator),
                                            createVNode(_component_DropdownMenuItem, { class: "text-yellow-500" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Pending")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_DropdownMenuItem, { class: "text-red-500" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Rejected")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_DropdownMenuItem, { class: "text-green-500" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Approved")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_DropdownMenuItem, { class: "text-gray-500" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Cancelled")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        })
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
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_TableCell, null, {
                            default: withCtx(() => [
                              createTextVNode("1")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_TableCell, null, {
                            default: withCtx(() => [
                              createVNode(_component_NuxtLink, { to: "/dashboard/events?id=1" }, {
                                default: withCtx(() => [
                                  createTextVNode("Event Name")
                                ]),
                                _: 1
                              }),
                              createVNode("em", { class: "not-italic block" }, "Starts from"),
                              createVNode("em", { class: "not-italic block" }, "Ends At")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_TableCell, null, {
                            default: withCtx(() => [
                              createVNode(_component_Badge, { variant: "outline" }, {
                                default: withCtx(() => [
                                  createTextVNode("Finished")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_TableCell, { class: "text-right" }, {
                            default: withCtx(() => [
                              createVNode(_component_DropdownMenu, null, {
                                default: withCtx(() => [
                                  createVNode(_component_DropdownMenuTrigger, { "as-child": "" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_Button, { variant: "outline" }, {
                                        default: withCtx(() => [
                                          createVNode(unref(EllipsisVertical))
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_DropdownMenuContent, { class: "w-56" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_DropdownMenuGroup, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_DropdownMenuLabel, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Actions")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_DropdownMenuSeparator),
                                          createVNode(_component_DropdownMenuItem, null, {
                                            default: withCtx(() => [
                                              createVNode(unref(Eye)),
                                              createVNode("span", null, "View")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_DropdownMenuItem, null, {
                                            default: withCtx(() => [
                                              createVNode(unref(Pencil)),
                                              createVNode("span", null, "Edit")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_DropdownMenuItem, null, {
                                            default: withCtx(() => [
                                              createVNode(unref(Trash)),
                                              createVNode("span", null, "Delete")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_DropdownMenuSeparator),
                                      createVNode(_component_DropdownMenuGroup, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_DropdownMenuLabel, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Update status")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_DropdownMenuSeparator),
                                          createVNode(_component_DropdownMenuItem, { class: "text-yellow-500" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Pending")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_DropdownMenuItem, { class: "text-red-500" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Rejected")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_DropdownMenuItem, { class: "text-green-500" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Approved")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_DropdownMenuItem, { class: "text-gray-500" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Cancelled")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
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
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_TableRow, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_TableCell, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`1`);
                            } else {
                              return [
                                createTextVNode("1")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_TableCell, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_NuxtLink, { to: "/dashboard/events?id=1" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Event Name`);
                                  } else {
                                    return [
                                      createTextVNode("Event Name")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<em class="not-italic block"${_scopeId4}>Starts from</em><em class="not-italic block"${_scopeId4}>Ends At</em>`);
                            } else {
                              return [
                                createVNode(_component_NuxtLink, { to: "/dashboard/events?id=1" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Event Name")
                                  ]),
                                  _: 1
                                }),
                                createVNode("em", { class: "not-italic block" }, "Starts from"),
                                createVNode("em", { class: "not-italic block" }, "Ends At")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_TableCell, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_Badge, { variant: "destructive" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Cancelled`);
                                  } else {
                                    return [
                                      createTextVNode("Cancelled")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_Badge, { variant: "destructive" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Cancelled")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_TableCell, { class: "text-right" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_DropdownMenu, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_DropdownMenuTrigger, { "as-child": "" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_Button, { variant: "outline" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(unref(EllipsisVertical), null, null, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(unref(EllipsisVertical))
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_Button, { variant: "outline" }, {
                                              default: withCtx(() => [
                                                createVNode(unref(EllipsisVertical))
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_DropdownMenuContent, { class: "w-56" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_DropdownMenuGroup, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(_component_DropdownMenuLabel, null, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`Actions`);
                                                    } else {
                                                      return [
                                                        createTextVNode("Actions")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_DropdownMenuSeparator, null, null, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_DropdownMenuItem, null, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(ssrRenderComponent(unref(Eye), null, null, _parent9, _scopeId8));
                                                      _push9(`<span${_scopeId8}>View</span>`);
                                                    } else {
                                                      return [
                                                        createVNode(unref(Eye)),
                                                        createVNode("span", null, "View")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_DropdownMenuItem, null, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(ssrRenderComponent(unref(Pencil), null, null, _parent9, _scopeId8));
                                                      _push9(`<span${_scopeId8}>Edit</span>`);
                                                    } else {
                                                      return [
                                                        createVNode(unref(Pencil)),
                                                        createVNode("span", null, "Edit")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_DropdownMenuItem, null, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(ssrRenderComponent(unref(Trash), null, null, _parent9, _scopeId8));
                                                      _push9(`<span${_scopeId8}>Delete</span>`);
                                                    } else {
                                                      return [
                                                        createVNode(unref(Trash)),
                                                        createVNode("span", null, "Delete")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(_component_DropdownMenuLabel, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Actions")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_DropdownMenuSeparator),
                                                  createVNode(_component_DropdownMenuItem, null, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(Eye)),
                                                      createVNode("span", null, "View")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_DropdownMenuItem, null, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(Pencil)),
                                                      createVNode("span", null, "Edit")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_DropdownMenuItem, null, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(Trash)),
                                                      createVNode("span", null, "Delete")
                                                    ]),
                                                    _: 1
                                                  })
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_component_DropdownMenuSeparator, null, null, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_component_DropdownMenuGroup, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(_component_DropdownMenuLabel, null, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`Update status`);
                                                    } else {
                                                      return [
                                                        createTextVNode("Update status")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_DropdownMenuSeparator, null, null, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_DropdownMenuItem, { class: "text-yellow-500" }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`Pending`);
                                                    } else {
                                                      return [
                                                        createTextVNode("Pending")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_DropdownMenuItem, { class: "text-red-500" }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`Rejected`);
                                                    } else {
                                                      return [
                                                        createTextVNode("Rejected")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_DropdownMenuItem, { class: "text-green-500" }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`Approved`);
                                                    } else {
                                                      return [
                                                        createTextVNode("Approved")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_DropdownMenuItem, { class: "text-gray-500" }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`Cancelled`);
                                                    } else {
                                                      return [
                                                        createTextVNode("Cancelled")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(_component_DropdownMenuLabel, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Update status")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_DropdownMenuSeparator),
                                                  createVNode(_component_DropdownMenuItem, { class: "text-yellow-500" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Pending")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_DropdownMenuItem, { class: "text-red-500" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Rejected")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_DropdownMenuItem, { class: "text-green-500" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Approved")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_DropdownMenuItem, { class: "text-gray-500" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Cancelled")
                                                    ]),
                                                    _: 1
                                                  })
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_DropdownMenuGroup, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_DropdownMenuLabel, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Actions")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_DropdownMenuSeparator),
                                                createVNode(_component_DropdownMenuItem, null, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(Eye)),
                                                    createVNode("span", null, "View")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_DropdownMenuItem, null, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(Pencil)),
                                                    createVNode("span", null, "Edit")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_DropdownMenuItem, null, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(Trash)),
                                                    createVNode("span", null, "Delete")
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_DropdownMenuSeparator),
                                            createVNode(_component_DropdownMenuGroup, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_DropdownMenuLabel, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Update status")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_DropdownMenuSeparator),
                                                createVNode(_component_DropdownMenuItem, { class: "text-yellow-500" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Pending")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_DropdownMenuItem, { class: "text-red-500" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Rejected")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_DropdownMenuItem, { class: "text-green-500" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Approved")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_DropdownMenuItem, { class: "text-gray-500" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Cancelled")
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
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_DropdownMenuTrigger, { "as-child": "" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_Button, { variant: "outline" }, {
                                            default: withCtx(() => [
                                              createVNode(unref(EllipsisVertical))
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_DropdownMenuContent, { class: "w-56" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_DropdownMenuGroup, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_DropdownMenuLabel, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Actions")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_DropdownMenuSeparator),
                                              createVNode(_component_DropdownMenuItem, null, {
                                                default: withCtx(() => [
                                                  createVNode(unref(Eye)),
                                                  createVNode("span", null, "View")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_DropdownMenuItem, null, {
                                                default: withCtx(() => [
                                                  createVNode(unref(Pencil)),
                                                  createVNode("span", null, "Edit")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_DropdownMenuItem, null, {
                                                default: withCtx(() => [
                                                  createVNode(unref(Trash)),
                                                  createVNode("span", null, "Delete")
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_DropdownMenuSeparator),
                                          createVNode(_component_DropdownMenuGroup, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_DropdownMenuLabel, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Update status")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_DropdownMenuSeparator),
                                              createVNode(_component_DropdownMenuItem, { class: "text-yellow-500" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Pending")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_DropdownMenuItem, { class: "text-red-500" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Rejected")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_DropdownMenuItem, { class: "text-green-500" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Approved")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_DropdownMenuItem, { class: "text-gray-500" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Cancelled")
                                                ]),
                                                _: 1
                                              })
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
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_DropdownMenu, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_DropdownMenuTrigger, { "as-child": "" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_Button, { variant: "outline" }, {
                                          default: withCtx(() => [
                                            createVNode(unref(EllipsisVertical))
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_DropdownMenuContent, { class: "w-56" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_DropdownMenuGroup, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_DropdownMenuLabel, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Actions")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_DropdownMenuSeparator),
                                            createVNode(_component_DropdownMenuItem, null, {
                                              default: withCtx(() => [
                                                createVNode(unref(Eye)),
                                                createVNode("span", null, "View")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_DropdownMenuItem, null, {
                                              default: withCtx(() => [
                                                createVNode(unref(Pencil)),
                                                createVNode("span", null, "Edit")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_DropdownMenuItem, null, {
                                              default: withCtx(() => [
                                                createVNode(unref(Trash)),
                                                createVNode("span", null, "Delete")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_DropdownMenuSeparator),
                                        createVNode(_component_DropdownMenuGroup, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_DropdownMenuLabel, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Update status")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_DropdownMenuSeparator),
                                            createVNode(_component_DropdownMenuItem, { class: "text-yellow-500" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Pending")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_DropdownMenuItem, { class: "text-red-500" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Rejected")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_DropdownMenuItem, { class: "text-green-500" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Approved")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_DropdownMenuItem, { class: "text-gray-500" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Cancelled")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        })
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
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_TableCell, null, {
                            default: withCtx(() => [
                              createTextVNode("1")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_TableCell, null, {
                            default: withCtx(() => [
                              createVNode(_component_NuxtLink, { to: "/dashboard/events?id=1" }, {
                                default: withCtx(() => [
                                  createTextVNode("Event Name")
                                ]),
                                _: 1
                              }),
                              createVNode("em", { class: "not-italic block" }, "Starts from"),
                              createVNode("em", { class: "not-italic block" }, "Ends At")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_TableCell, null, {
                            default: withCtx(() => [
                              createVNode(_component_Badge, { variant: "destructive" }, {
                                default: withCtx(() => [
                                  createTextVNode("Cancelled")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_TableCell, { class: "text-right" }, {
                            default: withCtx(() => [
                              createVNode(_component_DropdownMenu, null, {
                                default: withCtx(() => [
                                  createVNode(_component_DropdownMenuTrigger, { "as-child": "" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_Button, { variant: "outline" }, {
                                        default: withCtx(() => [
                                          createVNode(unref(EllipsisVertical))
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_DropdownMenuContent, { class: "w-56" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_DropdownMenuGroup, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_DropdownMenuLabel, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Actions")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_DropdownMenuSeparator),
                                          createVNode(_component_DropdownMenuItem, null, {
                                            default: withCtx(() => [
                                              createVNode(unref(Eye)),
                                              createVNode("span", null, "View")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_DropdownMenuItem, null, {
                                            default: withCtx(() => [
                                              createVNode(unref(Pencil)),
                                              createVNode("span", null, "Edit")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_DropdownMenuItem, null, {
                                            default: withCtx(() => [
                                              createVNode(unref(Trash)),
                                              createVNode("span", null, "Delete")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_DropdownMenuSeparator),
                                      createVNode(_component_DropdownMenuGroup, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_DropdownMenuLabel, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Update status")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_DropdownMenuSeparator),
                                          createVNode(_component_DropdownMenuItem, { class: "text-yellow-500" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Pending")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_DropdownMenuItem, { class: "text-red-500" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Rejected")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_DropdownMenuItem, { class: "text-green-500" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Approved")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_DropdownMenuItem, { class: "text-gray-500" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Cancelled")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_TableRow, null, {
                      default: withCtx(() => [
                        createVNode(_component_TableCell, null, {
                          default: withCtx(() => [
                            createTextVNode("1")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_TableCell, null, {
                          default: withCtx(() => [
                            createVNode(_component_NuxtLink, { to: "/dashboard/events?id=1" }, {
                              default: withCtx(() => [
                                createTextVNode("Event Name")
                              ]),
                              _: 1
                            }),
                            createVNode("em", { class: "not-italic block" }, "Starts from"),
                            createVNode("em", { class: "not-italic block" }, "Ends At")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_TableCell, null, {
                          default: withCtx(() => [
                            createVNode(_component_Badge, { variant: "info" }, {
                              default: withCtx(() => [
                                createTextVNode("Comming soon")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_TableCell, { class: "text-right" }, {
                          default: withCtx(() => [
                            createVNode(_component_DropdownMenu, null, {
                              default: withCtx(() => [
                                createVNode(_component_DropdownMenuTrigger, { "as-child": "" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_Button, { variant: "outline" }, {
                                      default: withCtx(() => [
                                        createVNode(unref(EllipsisVertical))
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_DropdownMenuContent, { class: "w-56" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_DropdownMenuGroup, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_DropdownMenuLabel, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Actions")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_DropdownMenuSeparator),
                                        createVNode(_component_DropdownMenuItem, null, {
                                          default: withCtx(() => [
                                            createVNode(unref(Eye)),
                                            createVNode("span", null, "View")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_DropdownMenuItem, null, {
                                          default: withCtx(() => [
                                            createVNode(unref(Pencil)),
                                            createVNode("span", null, "Edit")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_DropdownMenuItem, null, {
                                          default: withCtx(() => [
                                            createVNode(unref(Trash)),
                                            createVNode("span", null, "Delete")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_DropdownMenuSeparator),
                                    createVNode(_component_DropdownMenuGroup, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_DropdownMenuLabel, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Update status")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_DropdownMenuSeparator),
                                        createVNode(_component_DropdownMenuItem, { class: "text-yellow-500" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Pending")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_DropdownMenuItem, { class: "text-red-500" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Rejected")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_DropdownMenuItem, { class: "text-green-500" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Approved")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_DropdownMenuItem, { class: "text-gray-500" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Cancelled")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_TableRow, null, {
                      default: withCtx(() => [
                        createVNode(_component_TableCell, null, {
                          default: withCtx(() => [
                            createTextVNode("1")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_TableCell, null, {
                          default: withCtx(() => [
                            createVNode(_component_NuxtLink, { to: "/dashboard/events?id=1" }, {
                              default: withCtx(() => [
                                createTextVNode("Event Name")
                              ]),
                              _: 1
                            }),
                            createVNode("em", { class: "not-italic block" }, "Starts from"),
                            createVNode("em", { class: "not-italic block" }, "Ends At")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_TableCell, null, {
                          default: withCtx(() => [
                            createVNode(_component_Badge, { variant: "success" }, {
                              default: withCtx(() => [
                                createTextVNode("ongoing")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_TableCell, { class: "text-right" }, {
                          default: withCtx(() => [
                            createVNode(_component_DropdownMenu, null, {
                              default: withCtx(() => [
                                createVNode(_component_DropdownMenuTrigger, { "as-child": "" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_Button, { variant: "outline" }, {
                                      default: withCtx(() => [
                                        createVNode(unref(EllipsisVertical))
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_DropdownMenuContent, { class: "w-56" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_DropdownMenuGroup, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_DropdownMenuLabel, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Actions")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_DropdownMenuSeparator),
                                        createVNode(_component_DropdownMenuItem, null, {
                                          default: withCtx(() => [
                                            createVNode(unref(Eye)),
                                            createVNode("span", null, "View")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_DropdownMenuItem, null, {
                                          default: withCtx(() => [
                                            createVNode(unref(Pencil)),
                                            createVNode("span", null, "Edit")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_DropdownMenuItem, null, {
                                          default: withCtx(() => [
                                            createVNode(unref(Trash)),
                                            createVNode("span", null, "Delete")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_DropdownMenuSeparator),
                                    createVNode(_component_DropdownMenuGroup, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_DropdownMenuLabel, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Update status")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_DropdownMenuSeparator),
                                        createVNode(_component_DropdownMenuItem, { class: "text-yellow-500" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Pending")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_DropdownMenuItem, { class: "text-red-500" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Rejected")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_DropdownMenuItem, { class: "text-green-500" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Approved")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_DropdownMenuItem, { class: "text-gray-500" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Cancelled")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_TableRow, null, {
                      default: withCtx(() => [
                        createVNode(_component_TableCell, null, {
                          default: withCtx(() => [
                            createTextVNode("1")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_TableCell, null, {
                          default: withCtx(() => [
                            createVNode(_component_NuxtLink, { to: "/dashboard/events?id=1" }, {
                              default: withCtx(() => [
                                createTextVNode("Event Name")
                              ]),
                              _: 1
                            }),
                            createVNode("em", { class: "not-italic block" }, "Starts from"),
                            createVNode("em", { class: "not-italic block" }, "Ends At")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_TableCell, null, {
                          default: withCtx(() => [
                            createVNode(_component_Badge, { variant: "outline" }, {
                              default: withCtx(() => [
                                createTextVNode("Finished")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_TableCell, { class: "text-right" }, {
                          default: withCtx(() => [
                            createVNode(_component_DropdownMenu, null, {
                              default: withCtx(() => [
                                createVNode(_component_DropdownMenuTrigger, { "as-child": "" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_Button, { variant: "outline" }, {
                                      default: withCtx(() => [
                                        createVNode(unref(EllipsisVertical))
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_DropdownMenuContent, { class: "w-56" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_DropdownMenuGroup, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_DropdownMenuLabel, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Actions")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_DropdownMenuSeparator),
                                        createVNode(_component_DropdownMenuItem, null, {
                                          default: withCtx(() => [
                                            createVNode(unref(Eye)),
                                            createVNode("span", null, "View")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_DropdownMenuItem, null, {
                                          default: withCtx(() => [
                                            createVNode(unref(Pencil)),
                                            createVNode("span", null, "Edit")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_DropdownMenuItem, null, {
                                          default: withCtx(() => [
                                            createVNode(unref(Trash)),
                                            createVNode("span", null, "Delete")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_DropdownMenuSeparator),
                                    createVNode(_component_DropdownMenuGroup, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_DropdownMenuLabel, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Update status")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_DropdownMenuSeparator),
                                        createVNode(_component_DropdownMenuItem, { class: "text-yellow-500" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Pending")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_DropdownMenuItem, { class: "text-red-500" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Rejected")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_DropdownMenuItem, { class: "text-green-500" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Approved")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_DropdownMenuItem, { class: "text-gray-500" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Cancelled")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_TableRow, null, {
                      default: withCtx(() => [
                        createVNode(_component_TableCell, null, {
                          default: withCtx(() => [
                            createTextVNode("1")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_TableCell, null, {
                          default: withCtx(() => [
                            createVNode(_component_NuxtLink, { to: "/dashboard/events?id=1" }, {
                              default: withCtx(() => [
                                createTextVNode("Event Name")
                              ]),
                              _: 1
                            }),
                            createVNode("em", { class: "not-italic block" }, "Starts from"),
                            createVNode("em", { class: "not-italic block" }, "Ends At")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_TableCell, null, {
                          default: withCtx(() => [
                            createVNode(_component_Badge, { variant: "destructive" }, {
                              default: withCtx(() => [
                                createTextVNode("Cancelled")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_TableCell, { class: "text-right" }, {
                          default: withCtx(() => [
                            createVNode(_component_DropdownMenu, null, {
                              default: withCtx(() => [
                                createVNode(_component_DropdownMenuTrigger, { "as-child": "" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_Button, { variant: "outline" }, {
                                      default: withCtx(() => [
                                        createVNode(unref(EllipsisVertical))
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_DropdownMenuContent, { class: "w-56" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_DropdownMenuGroup, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_DropdownMenuLabel, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Actions")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_DropdownMenuSeparator),
                                        createVNode(_component_DropdownMenuItem, null, {
                                          default: withCtx(() => [
                                            createVNode(unref(Eye)),
                                            createVNode("span", null, "View")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_DropdownMenuItem, null, {
                                          default: withCtx(() => [
                                            createVNode(unref(Pencil)),
                                            createVNode("span", null, "Edit")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_DropdownMenuItem, null, {
                                          default: withCtx(() => [
                                            createVNode(unref(Trash)),
                                            createVNode("span", null, "Delete")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_DropdownMenuSeparator),
                                    createVNode(_component_DropdownMenuGroup, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_DropdownMenuLabel, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Update status")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_DropdownMenuSeparator),
                                        createVNode(_component_DropdownMenuItem, { class: "text-yellow-500" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Pending")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_DropdownMenuItem, { class: "text-red-500" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Rejected")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_DropdownMenuItem, { class: "text-green-500" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Approved")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_DropdownMenuItem, { class: "text-gray-500" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Cancelled")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
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
          } else {
            return [
              createVNode(_component_TableHeader, null, {
                default: withCtx(() => [
                  createVNode(_component_TableRow, null, {
                    default: withCtx(() => [
                      createVNode(_component_TableHead, null, {
                        default: withCtx(() => [
                          createTextVNode("SN")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_TableHead, null, {
                        default: withCtx(() => [
                          createTextVNode("User")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_TableHead, null, {
                        default: withCtx(() => [
                          createTextVNode("Status")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_TableHead, { class: "text-right" }, {
                        default: withCtx(() => [
                          createTextVNode("Action")
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
                  createVNode(_component_TableRow, null, {
                    default: withCtx(() => [
                      createVNode(_component_TableCell, null, {
                        default: withCtx(() => [
                          createTextVNode("1")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_TableCell, null, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtLink, { to: "/dashboard/events?id=1" }, {
                            default: withCtx(() => [
                              createTextVNode("Event Name")
                            ]),
                            _: 1
                          }),
                          createVNode("em", { class: "not-italic block" }, "Starts from"),
                          createVNode("em", { class: "not-italic block" }, "Ends At")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_TableCell, null, {
                        default: withCtx(() => [
                          createVNode(_component_Badge, { variant: "info" }, {
                            default: withCtx(() => [
                              createTextVNode("Comming soon")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_TableCell, { class: "text-right" }, {
                        default: withCtx(() => [
                          createVNode(_component_DropdownMenu, null, {
                            default: withCtx(() => [
                              createVNode(_component_DropdownMenuTrigger, { "as-child": "" }, {
                                default: withCtx(() => [
                                  createVNode(_component_Button, { variant: "outline" }, {
                                    default: withCtx(() => [
                                      createVNode(unref(EllipsisVertical))
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_DropdownMenuContent, { class: "w-56" }, {
                                default: withCtx(() => [
                                  createVNode(_component_DropdownMenuGroup, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_DropdownMenuLabel, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Actions")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_DropdownMenuSeparator),
                                      createVNode(_component_DropdownMenuItem, null, {
                                        default: withCtx(() => [
                                          createVNode(unref(Eye)),
                                          createVNode("span", null, "View")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_DropdownMenuItem, null, {
                                        default: withCtx(() => [
                                          createVNode(unref(Pencil)),
                                          createVNode("span", null, "Edit")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_DropdownMenuItem, null, {
                                        default: withCtx(() => [
                                          createVNode(unref(Trash)),
                                          createVNode("span", null, "Delete")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_DropdownMenuSeparator),
                                  createVNode(_component_DropdownMenuGroup, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_DropdownMenuLabel, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Update status")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_DropdownMenuSeparator),
                                      createVNode(_component_DropdownMenuItem, { class: "text-yellow-500" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Pending")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_DropdownMenuItem, { class: "text-red-500" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Rejected")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_DropdownMenuItem, { class: "text-green-500" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Approved")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_DropdownMenuItem, { class: "text-gray-500" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Cancelled")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_TableRow, null, {
                    default: withCtx(() => [
                      createVNode(_component_TableCell, null, {
                        default: withCtx(() => [
                          createTextVNode("1")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_TableCell, null, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtLink, { to: "/dashboard/events?id=1" }, {
                            default: withCtx(() => [
                              createTextVNode("Event Name")
                            ]),
                            _: 1
                          }),
                          createVNode("em", { class: "not-italic block" }, "Starts from"),
                          createVNode("em", { class: "not-italic block" }, "Ends At")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_TableCell, null, {
                        default: withCtx(() => [
                          createVNode(_component_Badge, { variant: "success" }, {
                            default: withCtx(() => [
                              createTextVNode("ongoing")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_TableCell, { class: "text-right" }, {
                        default: withCtx(() => [
                          createVNode(_component_DropdownMenu, null, {
                            default: withCtx(() => [
                              createVNode(_component_DropdownMenuTrigger, { "as-child": "" }, {
                                default: withCtx(() => [
                                  createVNode(_component_Button, { variant: "outline" }, {
                                    default: withCtx(() => [
                                      createVNode(unref(EllipsisVertical))
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_DropdownMenuContent, { class: "w-56" }, {
                                default: withCtx(() => [
                                  createVNode(_component_DropdownMenuGroup, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_DropdownMenuLabel, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Actions")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_DropdownMenuSeparator),
                                      createVNode(_component_DropdownMenuItem, null, {
                                        default: withCtx(() => [
                                          createVNode(unref(Eye)),
                                          createVNode("span", null, "View")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_DropdownMenuItem, null, {
                                        default: withCtx(() => [
                                          createVNode(unref(Pencil)),
                                          createVNode("span", null, "Edit")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_DropdownMenuItem, null, {
                                        default: withCtx(() => [
                                          createVNode(unref(Trash)),
                                          createVNode("span", null, "Delete")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_DropdownMenuSeparator),
                                  createVNode(_component_DropdownMenuGroup, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_DropdownMenuLabel, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Update status")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_DropdownMenuSeparator),
                                      createVNode(_component_DropdownMenuItem, { class: "text-yellow-500" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Pending")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_DropdownMenuItem, { class: "text-red-500" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Rejected")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_DropdownMenuItem, { class: "text-green-500" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Approved")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_DropdownMenuItem, { class: "text-gray-500" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Cancelled")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_TableRow, null, {
                    default: withCtx(() => [
                      createVNode(_component_TableCell, null, {
                        default: withCtx(() => [
                          createTextVNode("1")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_TableCell, null, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtLink, { to: "/dashboard/events?id=1" }, {
                            default: withCtx(() => [
                              createTextVNode("Event Name")
                            ]),
                            _: 1
                          }),
                          createVNode("em", { class: "not-italic block" }, "Starts from"),
                          createVNode("em", { class: "not-italic block" }, "Ends At")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_TableCell, null, {
                        default: withCtx(() => [
                          createVNode(_component_Badge, { variant: "outline" }, {
                            default: withCtx(() => [
                              createTextVNode("Finished")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_TableCell, { class: "text-right" }, {
                        default: withCtx(() => [
                          createVNode(_component_DropdownMenu, null, {
                            default: withCtx(() => [
                              createVNode(_component_DropdownMenuTrigger, { "as-child": "" }, {
                                default: withCtx(() => [
                                  createVNode(_component_Button, { variant: "outline" }, {
                                    default: withCtx(() => [
                                      createVNode(unref(EllipsisVertical))
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_DropdownMenuContent, { class: "w-56" }, {
                                default: withCtx(() => [
                                  createVNode(_component_DropdownMenuGroup, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_DropdownMenuLabel, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Actions")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_DropdownMenuSeparator),
                                      createVNode(_component_DropdownMenuItem, null, {
                                        default: withCtx(() => [
                                          createVNode(unref(Eye)),
                                          createVNode("span", null, "View")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_DropdownMenuItem, null, {
                                        default: withCtx(() => [
                                          createVNode(unref(Pencil)),
                                          createVNode("span", null, "Edit")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_DropdownMenuItem, null, {
                                        default: withCtx(() => [
                                          createVNode(unref(Trash)),
                                          createVNode("span", null, "Delete")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_DropdownMenuSeparator),
                                  createVNode(_component_DropdownMenuGroup, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_DropdownMenuLabel, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Update status")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_DropdownMenuSeparator),
                                      createVNode(_component_DropdownMenuItem, { class: "text-yellow-500" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Pending")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_DropdownMenuItem, { class: "text-red-500" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Rejected")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_DropdownMenuItem, { class: "text-green-500" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Approved")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_DropdownMenuItem, { class: "text-gray-500" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Cancelled")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_TableRow, null, {
                    default: withCtx(() => [
                      createVNode(_component_TableCell, null, {
                        default: withCtx(() => [
                          createTextVNode("1")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_TableCell, null, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtLink, { to: "/dashboard/events?id=1" }, {
                            default: withCtx(() => [
                              createTextVNode("Event Name")
                            ]),
                            _: 1
                          }),
                          createVNode("em", { class: "not-italic block" }, "Starts from"),
                          createVNode("em", { class: "not-italic block" }, "Ends At")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_TableCell, null, {
                        default: withCtx(() => [
                          createVNode(_component_Badge, { variant: "destructive" }, {
                            default: withCtx(() => [
                              createTextVNode("Cancelled")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_TableCell, { class: "text-right" }, {
                        default: withCtx(() => [
                          createVNode(_component_DropdownMenu, null, {
                            default: withCtx(() => [
                              createVNode(_component_DropdownMenuTrigger, { "as-child": "" }, {
                                default: withCtx(() => [
                                  createVNode(_component_Button, { variant: "outline" }, {
                                    default: withCtx(() => [
                                      createVNode(unref(EllipsisVertical))
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_DropdownMenuContent, { class: "w-56" }, {
                                default: withCtx(() => [
                                  createVNode(_component_DropdownMenuGroup, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_DropdownMenuLabel, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Actions")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_DropdownMenuSeparator),
                                      createVNode(_component_DropdownMenuItem, null, {
                                        default: withCtx(() => [
                                          createVNode(unref(Eye)),
                                          createVNode("span", null, "View")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_DropdownMenuItem, null, {
                                        default: withCtx(() => [
                                          createVNode(unref(Pencil)),
                                          createVNode("span", null, "Edit")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_DropdownMenuItem, null, {
                                        default: withCtx(() => [
                                          createVNode(unref(Trash)),
                                          createVNode("span", null, "Delete")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_DropdownMenuSeparator),
                                  createVNode(_component_DropdownMenuGroup, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_DropdownMenuLabel, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Update status")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_DropdownMenuSeparator),
                                      createVNode(_component_DropdownMenuItem, { class: "text-yellow-500" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Pending")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_DropdownMenuItem, { class: "text-red-500" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Rejected")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_DropdownMenuItem, { class: "text-green-500" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Approved")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_DropdownMenuItem, { class: "text-gray-500" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Cancelled")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
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
      }, _parent));
      _push(`<div class="flex items-center justify-end space-x-2 py-4"><div class="flex-1 text-sm text-muted-foreground"> 1 of 5 </div><div class="space-x-2">`);
      _push(ssrRenderComponent(_component_Button, {
        variant: "outline",
        size: "sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Previous `);
          } else {
            return [
              createTextVNode(" Previous ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Button, {
        variant: "outline",
        size: "sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Next `);
          } else {
            return [
              createTextVNode(" Next ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/events/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Co6lPTqH.mjs.map
