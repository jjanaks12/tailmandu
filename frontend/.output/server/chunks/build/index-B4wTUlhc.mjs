import { _ as _sfc_main$5, a as _sfc_main$3, b as _sfc_main$2$1, c as _sfc_main$1$1, d as _sfc_main$4, e as _sfc_main$3$1 } from './TableHeader-DWcwUMYW.mjs';
import { _ as _sfc_main$3$2, a as _sfc_main$6, b as _sfc_main$2$2, c as _sfc_main$1$2 } from './DropdownMenuTrigger-B63K8GtA.mjs';
import { _ as _sfc_main$4$1, a as _sfc_main$2$3, b as _sfc_main$7, c as _sfc_main$1$3 } from './DialogTitle-CfBb7Gc3.mjs';
import { defineComponent, ref, unref, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';
import { c as cn } from './helpers-H80jjgLf.mjs';
import { _ as _sfc_main$9 } from './DialogHeader-DOkqwiOU.mjs';
import { SlidersVerticalIcon, PlusIcon, EllipsisVerticalIcon, PencilIcon, TrashIcon } from 'lucide-vue-next';
import { D as useRoleStore } from './server.mjs';
import _sfc_main$8 from './form-CkgQcP1G.mjs';
import { h as humanize } from './humanize-Dt8EJGgI.mjs';
import { u as useHead } from './v3-gCezraLe.mjs';
import { u as useAuthorization } from './authorization-DPJpR6G0.mjs';
import { storeToRefs } from 'pinia';
import { _ as _sfc_main$2 } from './Button-bc6lCA4h.mjs';
import 'reka-ui';
import './index-3vNTMeQu.mjs';
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
import './Label-CxpqotiU.mjs';
import './Input-Cs6c7Uzm.mjs';
import './index-f52njE13.mjs';
import './Textarea-myQCGZz3.mjs';
import './Checkbox-BM2RqMe1.mjs';
import 'vee-validate';
import './role.schema-Dy0VrPka.mjs';
import 'moment';
import './index-Dniqw3Np.mjs';
import 'class-variance-authority';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "DialogFooter",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "dialog-footer",
        class: unref(cn)("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/dialog/DialogFooter.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Roles"
    });
    const { can } = useAuthorization();
    const { roles } = storeToRefs(useRoleStore());
    const { fetch, destory } = useRoleStore();
    const openEditRoleDialog = ref(false);
    const actionRole = ref(null);
    const openDeleteRoleDialog = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = _sfc_main$2;
      const _component_Table = _sfc_main$5;
      const _component_TableHeader = _sfc_main$3;
      const _component_TableRow = _sfc_main$2$1;
      const _component_TableHead = _sfc_main$1$1;
      const _component_TableBody = _sfc_main$4;
      const _component_TableCell = _sfc_main$3$1;
      const _component_DropdownMenu = _sfc_main$3$2;
      const _component_DropdownMenuTrigger = _sfc_main$6;
      const _component_DropdownMenuContent = _sfc_main$2$2;
      const _component_DropdownMenuItem = _sfc_main$1$2;
      const _component_Dialog = _sfc_main$4$1;
      const _component_DialogContent = _sfc_main$2$3;
      const _component_DialogTitle = _sfc_main$7;
      const _component_DialogDescription = _sfc_main$1$3;
      const _component_DialogHeader = _sfc_main$9;
      const _component_DialogFooter = _sfc_main$1;
      _push(`<!--[--><div class="flex gap-4 mb-20"><div class="flex-grow"><div class="flex gap-2 mb-4">`);
      _push(ssrRenderComponent(unref(SlidersVerticalIcon), null, null, _parent));
      _push(` Filters </div></div>`);
      _push(ssrRenderComponent(_component_Button, {
        onClick: ($event) => openEditRoleDialog.value = true,
        permissions: "role_create"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(PlusIcon), null, null, _parent2, _scopeId));
            _push2(` Add a role `);
          } else {
            return [
              createVNode(unref(PlusIcon)),
              createTextVNode(" Add a role ")
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
                              _push5(`Name`);
                            } else {
                              return [
                                createTextVNode("Name")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_TableHead, { class: "text-right" }, {
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
                              createTextVNode("SN")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_TableHead, null, {
                            default: withCtx(() => [
                              createTextVNode("Name")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_TableHead, { class: "text-right" }, {
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
                            createTextVNode("SN")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_TableHead, null, {
                          default: withCtx(() => [
                            createTextVNode("Name")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_TableHead, { class: "text-right" }, {
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
                  ssrRenderList(unref(roles), (role, index) => {
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
                                _push5(`<strong class="block text-xl mb-2"${_scopeId4}>${ssrInterpolate(role.name)}</strong><ul class="flex flex-wrap gap-1"${_scopeId4}><!--[-->`);
                                ssrRenderList(role.permissions, (permission) => {
                                  _push5(`<li class="bg-primary text-white px-3 py-1 text-sm rounded-xl"${_scopeId4}>${ssrInterpolate(unref(humanize)(permission.name))}</li>`);
                                });
                                _push5(`<!--]--></ul>`);
                              } else {
                                return [
                                  createVNode("strong", { class: "block text-xl mb-2" }, toDisplayString(role.name), 1),
                                  createVNode("ul", { class: "flex flex-wrap gap-1" }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(role.permissions, (permission) => {
                                      return openBlock(), createBlock("li", { class: "bg-primary text-white px-3 py-1 text-sm rounded-xl" }, toDisplayString(unref(humanize)(permission.name)), 1);
                                    }), 256))
                                  ])
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
                                      _push6(ssrRenderComponent(_component_DropdownMenuTrigger, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(EllipsisVerticalIcon), null, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(unref(EllipsisVerticalIcon))
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_DropdownMenuContent, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            if (unref(can)("role_edit")) {
                                              _push7(ssrRenderComponent(_component_DropdownMenuItem, {
                                                onClick: () => {
                                                  openEditRoleDialog.value = true;
                                                  actionRole.value = role;
                                                }
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(unref(PencilIcon), null, null, _parent8, _scopeId7));
                                                    _push8(` Edit `);
                                                  } else {
                                                    return [
                                                      createVNode(unref(PencilIcon)),
                                                      createTextVNode(" Edit ")
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            } else {
                                              _push7(`<!---->`);
                                            }
                                            if (unref(can)("role_delete")) {
                                              _push7(ssrRenderComponent(_component_DropdownMenuItem, {
                                                onClick: () => {
                                                  openDeleteRoleDialog.value = true;
                                                  actionRole.value = role;
                                                }
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(unref(TrashIcon), null, null, _parent8, _scopeId7));
                                                    _push8(` Delete `);
                                                  } else {
                                                    return [
                                                      createVNode(unref(TrashIcon)),
                                                      createTextVNode(" Delete ")
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            } else {
                                              _push7(`<!---->`);
                                            }
                                          } else {
                                            return [
                                              unref(can)("role_edit") ? (openBlock(), createBlock(_component_DropdownMenuItem, {
                                                key: 0,
                                                onClick: () => {
                                                  openEditRoleDialog.value = true;
                                                  actionRole.value = role;
                                                }
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(PencilIcon)),
                                                  createTextVNode(" Edit ")
                                                ]),
                                                _: 1
                                              }, 8, ["onClick"])) : createCommentVNode("", true),
                                              unref(can)("role_delete") ? (openBlock(), createBlock(_component_DropdownMenuItem, {
                                                key: 1,
                                                onClick: () => {
                                                  openDeleteRoleDialog.value = true;
                                                  actionRole.value = role;
                                                }
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(TrashIcon)),
                                                  createTextVNode(" Delete ")
                                                ]),
                                                _: 1
                                              }, 8, ["onClick"])) : createCommentVNode("", true)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_DropdownMenuTrigger, null, {
                                          default: withCtx(() => [
                                            createVNode(unref(EllipsisVerticalIcon))
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_DropdownMenuContent, null, {
                                          default: withCtx(() => [
                                            unref(can)("role_edit") ? (openBlock(), createBlock(_component_DropdownMenuItem, {
                                              key: 0,
                                              onClick: () => {
                                                openEditRoleDialog.value = true;
                                                actionRole.value = role;
                                              }
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(PencilIcon)),
                                                createTextVNode(" Edit ")
                                              ]),
                                              _: 1
                                            }, 8, ["onClick"])) : createCommentVNode("", true),
                                            unref(can)("role_delete") ? (openBlock(), createBlock(_component_DropdownMenuItem, {
                                              key: 1,
                                              onClick: () => {
                                                openDeleteRoleDialog.value = true;
                                                actionRole.value = role;
                                              }
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(TrashIcon)),
                                                createTextVNode(" Delete ")
                                              ]),
                                              _: 1
                                            }, 8, ["onClick"])) : createCommentVNode("", true)
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
                                      createVNode(_component_DropdownMenuTrigger, null, {
                                        default: withCtx(() => [
                                          createVNode(unref(EllipsisVerticalIcon))
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_DropdownMenuContent, null, {
                                        default: withCtx(() => [
                                          unref(can)("role_edit") ? (openBlock(), createBlock(_component_DropdownMenuItem, {
                                            key: 0,
                                            onClick: () => {
                                              openEditRoleDialog.value = true;
                                              actionRole.value = role;
                                            }
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(PencilIcon)),
                                              createTextVNode(" Edit ")
                                            ]),
                                            _: 1
                                          }, 8, ["onClick"])) : createCommentVNode("", true),
                                          unref(can)("role_delete") ? (openBlock(), createBlock(_component_DropdownMenuItem, {
                                            key: 1,
                                            onClick: () => {
                                              openDeleteRoleDialog.value = true;
                                              actionRole.value = role;
                                            }
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(TrashIcon)),
                                              createTextVNode(" Delete ")
                                            ]),
                                            _: 1
                                          }, 8, ["onClick"])) : createCommentVNode("", true)
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
                                createVNode("strong", { class: "block text-xl mb-2" }, toDisplayString(role.name), 1),
                                createVNode("ul", { class: "flex flex-wrap gap-1" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(role.permissions, (permission) => {
                                    return openBlock(), createBlock("li", { class: "bg-primary text-white px-3 py-1 text-sm rounded-xl" }, toDisplayString(unref(humanize)(permission.name)), 1);
                                  }), 256))
                                ])
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_TableCell, { class: "text-right" }, {
                              default: withCtx(() => [
                                createVNode(_component_DropdownMenu, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_DropdownMenuTrigger, null, {
                                      default: withCtx(() => [
                                        createVNode(unref(EllipsisVerticalIcon))
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_DropdownMenuContent, null, {
                                      default: withCtx(() => [
                                        unref(can)("role_edit") ? (openBlock(), createBlock(_component_DropdownMenuItem, {
                                          key: 0,
                                          onClick: () => {
                                            openEditRoleDialog.value = true;
                                            actionRole.value = role;
                                          }
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(PencilIcon)),
                                            createTextVNode(" Edit ")
                                          ]),
                                          _: 1
                                        }, 8, ["onClick"])) : createCommentVNode("", true),
                                        unref(can)("role_delete") ? (openBlock(), createBlock(_component_DropdownMenuItem, {
                                          key: 1,
                                          onClick: () => {
                                            openDeleteRoleDialog.value = true;
                                            actionRole.value = role;
                                          }
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(TrashIcon)),
                                            createTextVNode(" Delete ")
                                          ]),
                                          _: 1
                                        }, 8, ["onClick"])) : createCommentVNode("", true)
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
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(roles), (role, index) => {
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
                              createVNode("strong", { class: "block text-xl mb-2" }, toDisplayString(role.name), 1),
                              createVNode("ul", { class: "flex flex-wrap gap-1" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(role.permissions, (permission) => {
                                  return openBlock(), createBlock("li", { class: "bg-primary text-white px-3 py-1 text-sm rounded-xl" }, toDisplayString(unref(humanize)(permission.name)), 1);
                                }), 256))
                              ])
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_component_TableCell, { class: "text-right" }, {
                            default: withCtx(() => [
                              createVNode(_component_DropdownMenu, null, {
                                default: withCtx(() => [
                                  createVNode(_component_DropdownMenuTrigger, null, {
                                    default: withCtx(() => [
                                      createVNode(unref(EllipsisVerticalIcon))
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_DropdownMenuContent, null, {
                                    default: withCtx(() => [
                                      unref(can)("role_edit") ? (openBlock(), createBlock(_component_DropdownMenuItem, {
                                        key: 0,
                                        onClick: () => {
                                          openEditRoleDialog.value = true;
                                          actionRole.value = role;
                                        }
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(PencilIcon)),
                                          createTextVNode(" Edit ")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"])) : createCommentVNode("", true),
                                      unref(can)("role_delete") ? (openBlock(), createBlock(_component_DropdownMenuItem, {
                                        key: 1,
                                        onClick: () => {
                                          openDeleteRoleDialog.value = true;
                                          actionRole.value = role;
                                        }
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(TrashIcon)),
                                          createTextVNode(" Delete ")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"])) : createCommentVNode("", true)
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
                    }), 256))
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
                          createTextVNode("Name")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_TableHead, { class: "text-right" }, {
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
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(roles), (role, index) => {
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
                            createVNode("strong", { class: "block text-xl mb-2" }, toDisplayString(role.name), 1),
                            createVNode("ul", { class: "flex flex-wrap gap-1" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(role.permissions, (permission) => {
                                return openBlock(), createBlock("li", { class: "bg-primary text-white px-3 py-1 text-sm rounded-xl" }, toDisplayString(unref(humanize)(permission.name)), 1);
                              }), 256))
                            ])
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(_component_TableCell, { class: "text-right" }, {
                          default: withCtx(() => [
                            createVNode(_component_DropdownMenu, null, {
                              default: withCtx(() => [
                                createVNode(_component_DropdownMenuTrigger, null, {
                                  default: withCtx(() => [
                                    createVNode(unref(EllipsisVerticalIcon))
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_DropdownMenuContent, null, {
                                  default: withCtx(() => [
                                    unref(can)("role_edit") ? (openBlock(), createBlock(_component_DropdownMenuItem, {
                                      key: 0,
                                      onClick: () => {
                                        openEditRoleDialog.value = true;
                                        actionRole.value = role;
                                      }
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(PencilIcon)),
                                        createTextVNode(" Edit ")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])) : createCommentVNode("", true),
                                    unref(can)("role_delete") ? (openBlock(), createBlock(_component_DropdownMenuItem, {
                                      key: 1,
                                      onClick: () => {
                                        openDeleteRoleDialog.value = true;
                                        actionRole.value = role;
                                      }
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(TrashIcon)),
                                        createTextVNode(" Delete ")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])) : createCommentVNode("", true)
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
                  }), 256))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Dialog, {
        open: unref(openEditRoleDialog),
        "onUpdate:open": () => {
          openEditRoleDialog.value = false;
          actionRole.value = null;
        }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_DialogContent, { class: "bg-white" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_DialogTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      var _a, _b;
                      if (_push4) {
                        _push4(`Edit ${ssrInterpolate((_a = unref(actionRole)) == null ? void 0 : _a.name)}`);
                      } else {
                        return [
                          createTextVNode("Edit " + toDisplayString((_b = unref(actionRole)) == null ? void 0 : _b.name), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_DialogDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Modify existing role details to update user permissions and access rights. `);
                      } else {
                        return [
                          createTextVNode("Modify existing role details to update user permissions and access rights. ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$8, {
                    role: unref(actionRole),
                    onUpdate: () => {
                      openEditRoleDialog.value = false;
                      actionRole.value = null;
                    }
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_DialogTitle, null, {
                      default: withCtx(() => {
                        var _a;
                        return [
                          createTextVNode("Edit " + toDisplayString((_a = unref(actionRole)) == null ? void 0 : _a.name), 1)
                        ];
                      }),
                      _: 1
                    }),
                    createVNode(_component_DialogDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Modify existing role details to update user permissions and access rights. ")
                      ]),
                      _: 1
                    }),
                    createVNode(_sfc_main$8, {
                      role: unref(actionRole),
                      onUpdate: () => {
                        openEditRoleDialog.value = false;
                        actionRole.value = null;
                      }
                    }, null, 8, ["role", "onUpdate"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_DialogContent, { class: "bg-white" }, {
                default: withCtx(() => [
                  createVNode(_component_DialogTitle, null, {
                    default: withCtx(() => {
                      var _a;
                      return [
                        createTextVNode("Edit " + toDisplayString((_a = unref(actionRole)) == null ? void 0 : _a.name), 1)
                      ];
                    }),
                    _: 1
                  }),
                  createVNode(_component_DialogDescription, null, {
                    default: withCtx(() => [
                      createTextVNode("Modify existing role details to update user permissions and access rights. ")
                    ]),
                    _: 1
                  }),
                  createVNode(_sfc_main$8, {
                    role: unref(actionRole),
                    onUpdate: () => {
                      openEditRoleDialog.value = false;
                      actionRole.value = null;
                    }
                  }, null, 8, ["role", "onUpdate"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Dialog, {
        open: unref(openDeleteRoleDialog),
        "onUpdate:open": (state) => {
          openDeleteRoleDialog.value = state;
          actionRole.value = null;
        }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_DialogContent, { class: "bg-white" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_DialogHeader, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_DialogTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Are you sure?`);
                            } else {
                              return [
                                createTextVNode("Are you sure?")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_DialogDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Once deleted cannot be un done. `);
                            } else {
                              return [
                                createTextVNode(" Once deleted cannot be un done. ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_DialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Are you sure?")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_DialogDescription, null, {
                            default: withCtx(() => [
                              createTextVNode(" Once deleted cannot be un done. ")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_DialogFooter, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Button, {
                          variant: "destructive",
                          onClick: () => {
                            openDeleteRoleDialog.value = false;
                            actionRole.value = null;
                          }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Cancel`);
                            } else {
                              return [
                                createTextVNode("Cancel")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_Button, {
                          variant: "secondary",
                          onClick: async () => {
                            var _a;
                            await unref(destory)((_a = unref(actionRole)) == null ? void 0 : _a.id);
                            openDeleteRoleDialog.value = false;
                            actionRole.value = null;
                            unref(fetch)();
                          }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Yes, delete it`);
                            } else {
                              return [
                                createTextVNode("Yes, delete it")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Button, {
                            variant: "destructive",
                            onClick: () => {
                              openDeleteRoleDialog.value = false;
                              actionRole.value = null;
                            }
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_Button, {
                            variant: "secondary",
                            onClick: async () => {
                              var _a;
                              await unref(destory)((_a = unref(actionRole)) == null ? void 0 : _a.id);
                              openDeleteRoleDialog.value = false;
                              actionRole.value = null;
                              unref(fetch)();
                            }
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Yes, delete it")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_DialogHeader, null, {
                      default: withCtx(() => [
                        createVNode(_component_DialogTitle, null, {
                          default: withCtx(() => [
                            createTextVNode("Are you sure?")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_DialogDescription, null, {
                          default: withCtx(() => [
                            createTextVNode(" Once deleted cannot be un done. ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_DialogFooter, null, {
                      default: withCtx(() => [
                        createVNode(_component_Button, {
                          variant: "destructive",
                          onClick: () => {
                            openDeleteRoleDialog.value = false;
                            actionRole.value = null;
                          }
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Cancel")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_Button, {
                          variant: "secondary",
                          onClick: async () => {
                            var _a;
                            await unref(destory)((_a = unref(actionRole)) == null ? void 0 : _a.id);
                            openDeleteRoleDialog.value = false;
                            actionRole.value = null;
                            unref(fetch)();
                          }
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Yes, delete it")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
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
              createVNode(_component_DialogContent, { class: "bg-white" }, {
                default: withCtx(() => [
                  createVNode(_component_DialogHeader, null, {
                    default: withCtx(() => [
                      createVNode(_component_DialogTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Are you sure?")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_DialogDescription, null, {
                        default: withCtx(() => [
                          createTextVNode(" Once deleted cannot be un done. ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_DialogFooter, null, {
                    default: withCtx(() => [
                      createVNode(_component_Button, {
                        variant: "destructive",
                        onClick: () => {
                          openDeleteRoleDialog.value = false;
                          actionRole.value = null;
                        }
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Cancel")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(_component_Button, {
                        variant: "secondary",
                        onClick: async () => {
                          var _a;
                          await unref(destory)((_a = unref(actionRole)) == null ? void 0 : _a.id);
                          openDeleteRoleDialog.value = false;
                          actionRole.value = null;
                          unref(fetch)();
                        }
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Yes, delete it")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
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
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/roles/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-B4wTUlhc.mjs.map
