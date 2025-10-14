import { _ as _sfc_main$2 } from './index-fXRoVOws.mjs';
import { _ as _sfc_main$6, a as _sfc_main$1$1, b as _sfc_main$3, c as _sfc_main$5, d as _sfc_main$4 } from './SelectValue-cH59kxAH.mjs';
import { _ as _sfc_main$7 } from './Input-DM54l6M4.mjs';
import { _ as _sfc_main$5$1, a as _sfc_main$8, b as _sfc_main$2$1, c as _sfc_main$1$2, d as _sfc_main$4$1, e as _sfc_main$3$1 } from './TableHeader-DWcwUMYW.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-C7aJpepl.mjs';
import { _ as _sfc_main$3$2, a as _sfc_main$9, b as _sfc_main$2$2, c as _sfc_main$1$4 } from './DropdownMenuTrigger-xuKKjxp6.mjs';
import { _ as _sfc_main$6$1, a as _sfc_main$5$2, b as _sfc_main$4$2, c as _sfc_main$c, d as _sfc_main$2$3, e as _sfc_main$3$3, f as _sfc_main$1$5 } from './PaginationPrevious-C4rJpRbt.mjs';
import { _ as _sfc_main$1$3, a as _sfc_main$a } from './DropdownMenuSeparator-B-ibFYtd.mjs';
import { _ as _sfc_main$b } from './Skeleton-Dr5q0UQT.mjs';
import { _ as _sfc_main$4$3, a as _sfc_main$2$4, b as _sfc_main$e, c as _sfc_main$1$6 } from './DialogTitle-CZaefnAH.mjs';
import { _ as _sfc_main$d } from './DialogHeader-DOkqwiOU.mjs';
import { defineComponent, ref, withCtx, unref, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, mergeProps, createCommentVNode, renderSlot, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { DialogTrigger } from 'reka-ui';
import { CalendarIcon, SlidersVertical, Search, EllipsisVertical, Eye, Pencil, Trash } from 'lucide-vue-next';
import { Form, Field } from 'vee-validate';
import _sfc_main$f from './form-CbHbAu79.mjs';
import { f as formatDate } from './humanize-Dt8EJGgI.mjs';
import { u as useEventStore } from './server.mjs';
import { u as useHead } from './v3-UNO0wT_2.mjs';
import { storeToRefs } from 'pinia';
import './helpers-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
import 'class-variance-authority';
import './authorization-NeTuVL6Y.mjs';
import './index-BCNSwEbA.mjs';
import './index-DRYUbUIy.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import './Label-jSWrZiLt.mjs';
import './index-CIwfCEWF.mjs';
import './DatePicker-BUMac20k.mjs';
import '@internationalized/date';
import 'reka-ui/date';
import './Textarea-CAK_nurl.mjs';
import 'moment';
import './event.schema-7vZus5g4.mjs';
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
    const { events, isLoading, params } = storeToRefs(useEventStore());
    const { fetch } = useEventStore();
    const showForm = ref(false);
    const trailRace = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_Button = _sfc_main$2;
      const _component_Select = _sfc_main$6;
      const _component_SelectTrigger = _sfc_main$1$1;
      const _component_SelectValue = _sfc_main$3;
      const _component_SelectContent = _sfc_main$5;
      const _component_SelectItem = _sfc_main$4;
      const _component_Input = _sfc_main$7;
      const _component_Table = _sfc_main$5$1;
      const _component_TableHeader = _sfc_main$8;
      const _component_TableRow = _sfc_main$2$1;
      const _component_TableHead = _sfc_main$1$2;
      const _component_TableBody = _sfc_main$4$1;
      const _component_TableCell = _sfc_main$3$1;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_DropdownMenu = _sfc_main$3$2;
      const _component_DropdownMenuTrigger = _sfc_main$9;
      const _component_DropdownMenuContent = _sfc_main$2$2;
      const _component_DropdownMenuGroup = _sfc_main$6$1;
      const _component_DropdownMenuLabel = _sfc_main$1$3;
      const _component_DropdownMenuSeparator = _sfc_main$a;
      const _component_DropdownMenuItem = _sfc_main$1$4;
      const _component_Skeleton = _sfc_main$b;
      const _component_Pagination = _sfc_main$5$2;
      const _component_PaginationContent = _sfc_main$4$2;
      const _component_PaginationPrevious = _sfc_main$c;
      const _component_PaginationItem = _sfc_main$2$3;
      const _component_PaginationEllipsis = _sfc_main$3$3;
      const _component_PaginationNext = _sfc_main$1$5;
      const _component_Dialog = _sfc_main$4$3;
      const _component_DialogTrigger = _sfc_main$1;
      const _component_DialogContent = _sfc_main$2$4;
      const _component_DialogHeader = _sfc_main$d;
      const _component_DialogTitle = _sfc_main$e;
      const _component_DialogDescription = _sfc_main$1$6;
      _push(`<!--[--><div class="flex items-center justify-between mb-12"><h1 class="text-2xl">Events</h1>`);
      _push(ssrRenderComponent(_component_Button, {
        onClick: ($event) => showForm.value = true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(CalendarIcon), null, null, _parent2, _scopeId));
            _push2(` Add new Event `);
          } else {
            return [
              createVNode(unref(CalendarIcon)),
              createTextVNode(" Add new Event ")
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
                  if (!unref(isLoading)) {
                    _push3(`<!--[-->`);
                    ssrRenderList(unref(events), (trailEvent, index) => {
                      _push3(ssrRenderComponent(_component_TableRow, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_TableCell, null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(index + 1)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(index + 1), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(_component_TableCell, null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<strong class="block text-lg"${_scopeId4}>`);
                                  _push5(ssrRenderComponent(_component_NuxtLink, {
                                    to: `/dashboard/events/${trailEvent.id}`,
                                    class: "hover:text-primary transition-colors"
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(trailEvent.name)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(trailEvent.name), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(`</strong><em class="not-italic block"${_scopeId4}>Starts from ${ssrInterpolate(unref(formatDate)(trailEvent.start))}</em><em class="not-italic block"${_scopeId4}>Ends At ${ssrInterpolate(unref(formatDate)(trailEvent.end))}</em>`);
                                } else {
                                  return [
                                    createVNode("strong", { class: "block text-lg" }, [
                                      createVNode(_component_NuxtLink, {
                                        to: `/dashboard/events/${trailEvent.id}`,
                                        class: "hover:text-primary transition-colors"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(trailEvent.name), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["to"])
                                    ]),
                                    createVNode("em", { class: "not-italic block" }, "Starts from " + toDisplayString(unref(formatDate)(trailEvent.start)), 1),
                                    createVNode("em", { class: "not-italic block" }, "Ends At " + toDisplayString(unref(formatDate)(trailEvent.end)), 1)
                                  ];
                                }
                              }),
                              _: 2
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
                                                _: 2
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
                                          _: 2
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
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                    _push8(ssrRenderComponent(_component_DropdownMenuSeparator, null, null, _parent8, _scopeId7));
                                                    _push8(ssrRenderComponent(_component_DropdownMenuItem, { "as-child": "" }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(ssrRenderComponent(_component_NuxtLink, {
                                                            to: `/dashboard/events/${trailEvent.id}`
                                                          }, {
                                                            default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                              if (_push10) {
                                                                _push10(ssrRenderComponent(unref(Eye), null, null, _parent10, _scopeId9));
                                                                _push10(`<span${_scopeId9}>View</span>`);
                                                              } else {
                                                                return [
                                                                  createVNode(unref(Eye)),
                                                                  createVNode("span", null, "View")
                                                                ];
                                                              }
                                                            }),
                                                            _: 2
                                                          }, _parent9, _scopeId8));
                                                        } else {
                                                          return [
                                                            createVNode(_component_NuxtLink, {
                                                              to: `/dashboard/events/${trailEvent.id}`
                                                            }, {
                                                              default: withCtx(() => [
                                                                createVNode(unref(Eye)),
                                                                createVNode("span", null, "View")
                                                              ]),
                                                              _: 2
                                                            }, 1032, ["to"])
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                    _push8(ssrRenderComponent(_component_DropdownMenuItem, {
                                                      onClick: () => {
                                                        trailRace.value = trailEvent;
                                                        showForm.value = true;
                                                      }
                                                    }, {
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
                                                      _: 2
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
                                                      _: 2
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
                                                      createVNode(_component_DropdownMenuItem, { "as-child": "" }, {
                                                        default: withCtx(() => [
                                                          createVNode(_component_NuxtLink, {
                                                            to: `/dashboard/events/${trailEvent.id}`
                                                          }, {
                                                            default: withCtx(() => [
                                                              createVNode(unref(Eye)),
                                                              createVNode("span", null, "View")
                                                            ]),
                                                            _: 2
                                                          }, 1032, ["to"])
                                                        ]),
                                                        _: 2
                                                      }, 1024),
                                                      createVNode(_component_DropdownMenuItem, {
                                                        onClick: () => {
                                                          trailRace.value = trailEvent;
                                                          showForm.value = true;
                                                        }
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode(unref(Pencil)),
                                                          createVNode("span", null, "Edit")
                                                        ]),
                                                        _: 2
                                                      }, 1032, ["onClick"]),
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
                                                _: 2
                                              }, _parent7, _scopeId6));
                                              _push7(ssrRenderComponent(_component_DropdownMenuSeparator, null, null, _parent7, _scopeId6));
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
                                                    createVNode(_component_DropdownMenuItem, { "as-child": "" }, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_NuxtLink, {
                                                          to: `/dashboard/events/${trailEvent.id}`
                                                        }, {
                                                          default: withCtx(() => [
                                                            createVNode(unref(Eye)),
                                                            createVNode("span", null, "View")
                                                          ]),
                                                          _: 2
                                                        }, 1032, ["to"])
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(_component_DropdownMenuItem, {
                                                      onClick: () => {
                                                        trailRace.value = trailEvent;
                                                        showForm.value = true;
                                                      }
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(unref(Pencil)),
                                                        createVNode("span", null, "Edit")
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["onClick"]),
                                                    createVNode(_component_DropdownMenuItem, null, {
                                                      default: withCtx(() => [
                                                        createVNode(unref(Trash)),
                                                        createVNode("span", null, "Delete")
                                                      ]),
                                                      _: 1
                                                    })
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(_component_DropdownMenuSeparator)
                                              ];
                                            }
                                          }),
                                          _: 2
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
                                                  createVNode(_component_DropdownMenuItem, { "as-child": "" }, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_NuxtLink, {
                                                        to: `/dashboard/events/${trailEvent.id}`
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode(unref(Eye)),
                                                          createVNode("span", null, "View")
                                                        ]),
                                                        _: 2
                                                      }, 1032, ["to"])
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(_component_DropdownMenuItem, {
                                                    onClick: () => {
                                                      trailRace.value = trailEvent;
                                                      showForm.value = true;
                                                    }
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(Pencil)),
                                                      createVNode("span", null, "Edit")
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["onClick"]),
                                                  createVNode(_component_DropdownMenuItem, null, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(Trash)),
                                                      createVNode("span", null, "Delete")
                                                    ]),
                                                    _: 1
                                                  })
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_DropdownMenuSeparator)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ];
                                      }
                                    }),
                                    _: 2
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
                                                createVNode(_component_DropdownMenuItem, { "as-child": "" }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_NuxtLink, {
                                                      to: `/dashboard/events/${trailEvent.id}`
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(unref(Eye)),
                                                        createVNode("span", null, "View")
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["to"])
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(_component_DropdownMenuItem, {
                                                  onClick: () => {
                                                    trailRace.value = trailEvent;
                                                    showForm.value = true;
                                                  }
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(Pencil)),
                                                    createVNode("span", null, "Edit")
                                                  ]),
                                                  _: 2
                                                }, 1032, ["onClick"]),
                                                createVNode(_component_DropdownMenuItem, null, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(Trash)),
                                                    createVNode("span", null, "Delete")
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(_component_DropdownMenuSeparator)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_TableCell, null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(index + 1), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(_component_TableCell, null, {
                                default: withCtx(() => [
                                  createVNode("strong", { class: "block text-lg" }, [
                                    createVNode(_component_NuxtLink, {
                                      to: `/dashboard/events/${trailEvent.id}`,
                                      class: "hover:text-primary transition-colors"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(trailEvent.name), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["to"])
                                  ]),
                                  createVNode("em", { class: "not-italic block" }, "Starts from " + toDisplayString(unref(formatDate)(trailEvent.start)), 1),
                                  createVNode("em", { class: "not-italic block" }, "Ends At " + toDisplayString(unref(formatDate)(trailEvent.end)), 1)
                                ]),
                                _: 2
                              }, 1024),
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
                                              createVNode(_component_DropdownMenuItem, { "as-child": "" }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_NuxtLink, {
                                                    to: `/dashboard/events/${trailEvent.id}`
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(Eye)),
                                                      createVNode("span", null, "View")
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["to"])
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_DropdownMenuItem, {
                                                onClick: () => {
                                                  trailRace.value = trailEvent;
                                                  showForm.value = true;
                                                }
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(Pencil)),
                                                  createVNode("span", null, "Edit")
                                                ]),
                                                _: 2
                                              }, 1032, ["onClick"]),
                                              createVNode(_component_DropdownMenuItem, null, {
                                                default: withCtx(() => [
                                                  createVNode(unref(Trash)),
                                                  createVNode("span", null, "Delete")
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_DropdownMenuSeparator)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024)
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
                    _push3(ssrRenderComponent(_component_TableRow, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_TableCell, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_Skeleton, { class: "w-8 h-8" }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_Skeleton, { class: "w-8 h-8" })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_TableCell, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="flex flex-col gap-1"${_scopeId4}>`);
                                _push5(ssrRenderComponent(_component_Skeleton, { class: "w-[250px] h-8" }, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(_component_Skeleton, { class: "w-[250px] h-4" }, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(_component_Skeleton, { class: "w-[250px] h-4" }, null, _parent5, _scopeId4));
                                _push5(`</div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "flex flex-col gap-1" }, [
                                    createVNode(_component_Skeleton, { class: "w-[250px] h-8" }),
                                    createVNode(_component_Skeleton, { class: "w-[250px] h-4" }),
                                    createVNode(_component_Skeleton, { class: "w-[250px] h-4" })
                                  ])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_TableCell, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_Skeleton, { class: "w-11 h-9 ml-auto" }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_Skeleton, { class: "w-11 h-9 ml-auto" })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_TableCell, null, {
                              default: withCtx(() => [
                                createVNode(_component_Skeleton, { class: "w-8 h-8" })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_TableCell, null, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex flex-col gap-1" }, [
                                  createVNode(_component_Skeleton, { class: "w-[250px] h-8" }),
                                  createVNode(_component_Skeleton, { class: "w-[250px] h-4" }),
                                  createVNode(_component_Skeleton, { class: "w-[250px] h-4" })
                                ])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_TableCell, null, {
                              default: withCtx(() => [
                                createVNode(_component_Skeleton, { class: "w-11 h-9 ml-auto" })
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  }
                } else {
                  return [
                    !unref(isLoading) ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(events), (trailEvent, index) => {
                      return openBlock(), createBlock(_component_TableRow, null, {
                        default: withCtx(() => [
                          createVNode(_component_TableCell, null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(index + 1), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_component_TableCell, null, {
                            default: withCtx(() => [
                              createVNode("strong", { class: "block text-lg" }, [
                                createVNode(_component_NuxtLink, {
                                  to: `/dashboard/events/${trailEvent.id}`,
                                  class: "hover:text-primary transition-colors"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(trailEvent.name), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["to"])
                              ]),
                              createVNode("em", { class: "not-italic block" }, "Starts from " + toDisplayString(unref(formatDate)(trailEvent.start)), 1),
                              createVNode("em", { class: "not-italic block" }, "Ends At " + toDisplayString(unref(formatDate)(trailEvent.end)), 1)
                            ]),
                            _: 2
                          }, 1024),
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
                                          createVNode(_component_DropdownMenuItem, { "as-child": "" }, {
                                            default: withCtx(() => [
                                              createVNode(_component_NuxtLink, {
                                                to: `/dashboard/events/${trailEvent.id}`
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(Eye)),
                                                  createVNode("span", null, "View")
                                                ]),
                                                _: 2
                                              }, 1032, ["to"])
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_DropdownMenuItem, {
                                            onClick: () => {
                                              trailRace.value = trailEvent;
                                              showForm.value = true;
                                            }
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(Pencil)),
                                              createVNode("span", null, "Edit")
                                            ]),
                                            _: 2
                                          }, 1032, ["onClick"]),
                                          createVNode(_component_DropdownMenuItem, null, {
                                            default: withCtx(() => [
                                              createVNode(unref(Trash)),
                                              createVNode("span", null, "Delete")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_DropdownMenuSeparator)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024);
                    }), 256)) : (openBlock(), createBlock(_component_TableRow, { key: 1 }, {
                      default: withCtx(() => [
                        createVNode(_component_TableCell, null, {
                          default: withCtx(() => [
                            createVNode(_component_Skeleton, { class: "w-8 h-8" })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_TableCell, null, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex flex-col gap-1" }, [
                              createVNode(_component_Skeleton, { class: "w-[250px] h-8" }),
                              createVNode(_component_Skeleton, { class: "w-[250px] h-4" }),
                              createVNode(_component_Skeleton, { class: "w-[250px] h-4" })
                            ])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_TableCell, null, {
                          default: withCtx(() => [
                            createVNode(_component_Skeleton, { class: "w-11 h-9 ml-auto" })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }))
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
                  !unref(isLoading) ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(events), (trailEvent, index) => {
                    return openBlock(), createBlock(_component_TableRow, null, {
                      default: withCtx(() => [
                        createVNode(_component_TableCell, null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(index + 1), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(_component_TableCell, null, {
                          default: withCtx(() => [
                            createVNode("strong", { class: "block text-lg" }, [
                              createVNode(_component_NuxtLink, {
                                to: `/dashboard/events/${trailEvent.id}`,
                                class: "hover:text-primary transition-colors"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(trailEvent.name), 1)
                                ]),
                                _: 2
                              }, 1032, ["to"])
                            ]),
                            createVNode("em", { class: "not-italic block" }, "Starts from " + toDisplayString(unref(formatDate)(trailEvent.start)), 1),
                            createVNode("em", { class: "not-italic block" }, "Ends At " + toDisplayString(unref(formatDate)(trailEvent.end)), 1)
                          ]),
                          _: 2
                        }, 1024),
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
                                        createVNode(_component_DropdownMenuItem, { "as-child": "" }, {
                                          default: withCtx(() => [
                                            createVNode(_component_NuxtLink, {
                                              to: `/dashboard/events/${trailEvent.id}`
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(Eye)),
                                                createVNode("span", null, "View")
                                              ]),
                                              _: 2
                                            }, 1032, ["to"])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_DropdownMenuItem, {
                                          onClick: () => {
                                            trailRace.value = trailEvent;
                                            showForm.value = true;
                                          }
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(Pencil)),
                                            createVNode("span", null, "Edit")
                                          ]),
                                          _: 2
                                        }, 1032, ["onClick"]),
                                        createVNode(_component_DropdownMenuItem, null, {
                                          default: withCtx(() => [
                                            createVNode(unref(Trash)),
                                            createVNode("span", null, "Delete")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_DropdownMenuSeparator)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024);
                  }), 256)) : (openBlock(), createBlock(_component_TableRow, { key: 1 }, {
                    default: withCtx(() => [
                      createVNode(_component_TableCell, null, {
                        default: withCtx(() => [
                          createVNode(_component_Skeleton, { class: "w-8 h-8" })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_TableCell, null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex flex-col gap-1" }, [
                            createVNode(_component_Skeleton, { class: "w-[250px] h-8" }),
                            createVNode(_component_Skeleton, { class: "w-[250px] h-4" }),
                            createVNode(_component_Skeleton, { class: "w-[250px] h-4" })
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_TableCell, null, {
                        default: withCtx(() => [
                          createVNode(_component_Skeleton, { class: "w-11 h-9 ml-auto" })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(params).total_page > 1) {
        _push(`<div class="flex items-center justify-end space-x-2 py-4"><div class="flex-1 text-sm text-muted-foreground">${ssrInterpolate((_a = unref(params)) == null ? void 0 : _a.current)} of ${ssrInterpolate((_b = unref(params)) == null ? void 0 : _b.total_page)} pages </div><div class="space-x-2">`);
        _push(ssrRenderComponent(_component_Pagination, {
          "items-per-page": unref(params).per_page,
          total: unref(params).total,
          "default-page": unref(params).current,
          "onUpdate:page": (p) => {
            params.value = { ...unref(params), current: p };
          }
        }, {
          default: withCtx(({ page }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_PaginationContent, null, {
                default: withCtx(({ items }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_PaginationPrevious, null, null, _parent3, _scopeId2));
                    _push3(`<!--[-->`);
                    ssrRenderList(items, (item, index) => {
                      _push3(`<!--[-->`);
                      if (item.type === "page") {
                        _push3(ssrRenderComponent(_component_PaginationItem, {
                          value: item.value,
                          "is-active": item.value === page
                        }, {
                          default: withCtx((_, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`${ssrInterpolate(item.value)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(item.value), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`<!--]-->`);
                    });
                    _push3(`<!--]-->`);
                    _push3(ssrRenderComponent(_component_PaginationEllipsis, { index: 4 }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_PaginationNext, null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_PaginationPrevious),
                      (openBlock(true), createBlock(Fragment, null, renderList(items, (item, index) => {
                        return openBlock(), createBlock(Fragment, { key: index }, [
                          item.type === "page" ? (openBlock(), createBlock(_component_PaginationItem, {
                            key: 0,
                            value: item.value,
                            "is-active": item.value === page
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.value), 1)
                            ]),
                            _: 2
                          }, 1032, ["value", "is-active"])) : createCommentVNode("", true)
                        ], 64);
                      }), 128)),
                      createVNode(_component_PaginationEllipsis, { index: 4 }),
                      createVNode(_component_PaginationNext)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_PaginationContent, null, {
                  default: withCtx(({ items }) => [
                    createVNode(_component_PaginationPrevious),
                    (openBlock(true), createBlock(Fragment, null, renderList(items, (item, index) => {
                      return openBlock(), createBlock(Fragment, { key: index }, [
                        item.type === "page" ? (openBlock(), createBlock(_component_PaginationItem, {
                          key: 0,
                          value: item.value,
                          "is-active": item.value === page
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(item.value), 1)
                          ]),
                          _: 2
                        }, 1032, ["value", "is-active"])) : createCommentVNode("", true)
                      ], 64);
                    }), 128)),
                    createVNode(_component_PaginationEllipsis, { index: 4 }),
                    createVNode(_component_PaginationNext)
                  ]),
                  _: 2
                }, 1024)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_Dialog, {
        open: unref(showForm),
        "onUpdate:open": () => {
          showForm.value = false;
        }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_DialogTrigger, { "as-child": "" }, null, _parent2, _scopeId));
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
                  _push3(ssrRenderComponent(_sfc_main$f, {
                    onUpdate: () => {
                      showForm.value = false;
                      unref(fetch)();
                    },
                    trailRace: unref(trailRace)
                  }, null, _parent3, _scopeId2));
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
                    createVNode(_sfc_main$f, {
                      onUpdate: () => {
                        showForm.value = false;
                        unref(fetch)();
                      },
                      trailRace: unref(trailRace)
                    }, null, 8, ["onUpdate", "trailRace"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_DialogTrigger, { "as-child": "" }),
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
                  createVNode(_sfc_main$f, {
                    onUpdate: () => {
                      showForm.value = false;
                      unref(fetch)();
                    },
                    trailRace: unref(trailRace)
                  }, null, 8, ["onUpdate", "trailRace"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/events/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-AWfRlqcn.mjs.map
