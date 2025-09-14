import { _ as _sfc_main$2 } from './Input-DM54l6M4.mjs';
import { _ as _sfc_main$3 } from './index-fXRoVOws.mjs';
import { _ as _sfc_main$5, a as _sfc_main$4, b as _sfc_main$2$1, c as _sfc_main$1$1, d as _sfc_main$4$1, e as _sfc_main$3$1 } from './TableHeader-DWcwUMYW.mjs';
import { _ as _sfc_main$2$5, a as _sfc_main$b, b as _sfc_main$1$6, c as abbr } from './AvatarImage-BKYKzFla.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-C7aJpepl.mjs';
import { _ as _sfc_main$c } from './index-CIwfCEWF.mjs';
import { defineComponent, ref, unref, withCtx, mergeProps, createVNode, createTextVNode, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList, watch, computed, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttrs } from 'vue/server-renderer';
import { h as useRuntimeConfig, g as useModalMeta, d as useAxios, i as isObjEq, s as showImage } from './server.mjs';
import { _ as _sfc_main$3$2, a as _sfc_main$6, b as _sfc_main$2$2, c as _sfc_main$1$3 } from './DropdownMenuTrigger-xuKKjxp6.mjs';
import { _ as _sfc_main$6$1, a as _sfc_main$5$1, b as _sfc_main$4$2, c as _sfc_main$8, d as _sfc_main$2$3, e as _sfc_main$3$3, f as _sfc_main$1$4 } from './PaginationPrevious-C4rJpRbt.mjs';
import { _ as _sfc_main$1$2, a as _sfc_main$7 } from './DropdownMenuSeparator-B-ibFYtd.mjs';
import { _ as _sfc_main$4$3, a as _sfc_main$2$4, b as _sfc_main$9, c as _sfc_main$1$5 } from './DialogTitle-CZaefnAH.mjs';
import { SlidersVertical, Search, EllipsisVertical, ShieldCheckIcon } from 'lucide-vue-next';
import { Form, Field } from 'vee-validate';
import { storeToRefs, defineStore } from 'pinia';
import _sfc_main$a from './roleForm-Bv32gwFl.mjs';
import { u as useHead } from './v3-UNO0wT_2.mjs';
import { u as useAuthorization } from './authorization-NeTuVL6Y.mjs';
import './index-DRYUbUIy.mjs';
import './index-BCNSwEbA.mjs';
import './helpers-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
import 'reka-ui';
import 'class-variance-authority';
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
import './SelectValue-cH59kxAH.mjs';
import './role.schema-Dy0VrPka.mjs';
import 'yup';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "UserInfo",
  __ssrInlineRender: true,
  props: {
    user: {}
  },
  setup(__props) {
    const props = __props;
    const name = computed(() => {
      var _a, _b, _c, _d, _e, _f;
      return [(_b = (_a = props.user) == null ? void 0 : _a.personal) == null ? void 0 : _b.first_name, (_d = (_c = props.user) == null ? void 0 : _c.personal) == null ? void 0 : _d.middle_name, (_f = (_e = props.user) == null ? void 0 : _e.personal) == null ? void 0 : _f.last_name].join(" ").trim();
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_Avatar = _sfc_main$2$5;
      const _component_AvatarImage = _sfc_main$b;
      const _component_AvatarFallback = _sfc_main$1$6;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Badge = _sfc_main$c;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center gap-2" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Avatar, { class: "w-[60px] h-[60px]" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b, _c, _d, _e, _f;
          if (_push2) {
            _push2(ssrRenderComponent(_component_AvatarImage, {
              src: unref(showImage)((_c = (_b = (_a2 = _ctx.user) == null ? void 0 : _a2.personal) == null ? void 0 : _b.avatar) == null ? void 0 : _c.file_name),
              class: "object-cover"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_AvatarFallback, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(abbr)(unref(name)))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(abbr)(unref(name))), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_AvatarImage, {
                src: unref(showImage)((_f = (_e = (_d = _ctx.user) == null ? void 0 : _d.personal) == null ? void 0 : _e.avatar) == null ? void 0 : _f.file_name),
                class: "object-cover"
              }, null, 8, ["src"]),
              createVNode(_component_AvatarFallback, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(abbr)(unref(name))), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex-grow">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/dashboard/users?id=${_ctx.user.id}`,
        class: "hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(name))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(name)), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<em class="not-italic block">${ssrInterpolate((_a = _ctx.user.personal) == null ? void 0 : _a.email)}</em>`);
      if (_ctx.user.role) {
        _push(ssrRenderComponent(_component_Badge, { variant: "secondary" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a2, _b, _c, _d;
            if (_push2) {
              _push2(`${ssrInterpolate((_b = (_a2 = _ctx.user) == null ? void 0 : _a2.role) == null ? void 0 : _b.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString((_d = (_c = _ctx.user) == null ? void 0 : _c.role) == null ? void 0 : _d.name), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UserInfo.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const useUsersStore = defineStore("users", () => {
  const users = ref([]);
  const { isLoading, params } = useModalMeta();
  const { axios } = useAxios();
  const fetch = async () => {
    const { data: { data, ...p } } = await axios.get("/users", {
      params: params.value
    });
    users.value = data;
    params.value = p;
    users.value = data;
  };
  watch(params, (oldValue, newValue) => {
    if (!isObjEq(oldValue, newValue))
      fetch();
  });
  return {
    users,
    isLoading,
    params,
    fetch
  };
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Contacts"
    });
    const { public: { mailAdmin } } = useRuntimeConfig();
    const { users, params } = storeToRefs(useUsersStore());
    const { fetch } = useUsersStore();
    useAuthorization();
    const isUserRoleChangeDialogOpen = ref(false);
    const tempUser = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_Input = _sfc_main$2;
      const _component_Button = _sfc_main$3;
      const _component_Table = _sfc_main$5;
      const _component_TableHeader = _sfc_main$4;
      const _component_TableRow = _sfc_main$2$1;
      const _component_TableHead = _sfc_main$1$1;
      const _component_TableBody = _sfc_main$4$1;
      const _component_TableCell = _sfc_main$3$1;
      const _component_UserInfo = _sfc_main$1;
      const _component_DropdownMenu = _sfc_main$3$2;
      const _component_DropdownMenuTrigger = _sfc_main$6;
      const _component_DropdownMenuContent = _sfc_main$2$2;
      const _component_DropdownMenuGroup = _sfc_main$6$1;
      const _component_DropdownMenuLabel = _sfc_main$1$2;
      const _component_DropdownMenuSeparator = _sfc_main$7;
      const _component_DropdownMenuItem = _sfc_main$1$3;
      const _component_Pagination = _sfc_main$5$1;
      const _component_PaginationContent = _sfc_main$4$2;
      const _component_PaginationPrevious = _sfc_main$8;
      const _component_PaginationItem = _sfc_main$2$3;
      const _component_PaginationEllipsis = _sfc_main$3$3;
      const _component_PaginationNext = _sfc_main$1$4;
      const _component_Dialog = _sfc_main$4$3;
      const _component_DialogContent = _sfc_main$2$4;
      const _component_DialogTitle = _sfc_main$9;
      const _component_DialogDescription = _sfc_main$1$5;
      _push(`<!--[--><div class="flex gap-4 mb-20"><div class="flex-grow"><div class="flex gap-2 mb-4">`);
      _push(ssrRenderComponent(unref(SlidersVertical), null, null, _parent));
      _push(` Filters </div></div>`);
      _push(ssrRenderComponent(unref(Form), { class: "max-w-[320px] w-full flex items-center gap-2" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Field), { name: "search" }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Input, mergeProps(field, { placeholder: "Search users" }), null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Input, mergeProps(field, { placeholder: "Search users" }), null, 16)
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
                  createVNode(_component_Input, mergeProps(field, { placeholder: "Search users" }), null, 16)
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
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(users), (user, index) => {
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
                                _push5(ssrRenderComponent(_component_UserInfo, { user }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_UserInfo, { user }, null, 8, ["user"])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_TableCell, null, null, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_TableCell, { class: "text-right" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                if (user.personal.email != unref(mailAdmin)) {
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
                                                    _push8(ssrRenderComponent(_component_DropdownMenuItem, {
                                                      onClick: () => {
                                                        isUserRoleChangeDialogOpen.value = true;
                                                        tempUser.value = user;
                                                      }
                                                    }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(ssrRenderComponent(unref(ShieldCheckIcon), null, null, _parent9, _scopeId8));
                                                          _push9(`<span${_scopeId8}>Change role</span>`);
                                                        } else {
                                                          return [
                                                            createVNode(unref(ShieldCheckIcon)),
                                                            createVNode("span", null, "Change role")
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
                                                      createVNode(_component_DropdownMenuItem, {
                                                        onClick: () => {
                                                          isUserRoleChangeDialogOpen.value = true;
                                                          tempUser.value = user;
                                                        }
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode(unref(ShieldCheckIcon)),
                                                          createVNode("span", null, "Change role")
                                                        ]),
                                                        _: 2
                                                      }, 1032, ["onClick"])
                                                    ];
                                                  }
                                                }),
                                                _: 2
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
                                                    createVNode(_component_DropdownMenuItem, {
                                                      onClick: () => {
                                                        isUserRoleChangeDialogOpen.value = true;
                                                        tempUser.value = user;
                                                      }
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(unref(ShieldCheckIcon)),
                                                        createVNode("span", null, "Change role")
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["onClick"])
                                                  ]),
                                                  _: 2
                                                }, 1024)
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
                                                  createVNode(_component_DropdownMenuItem, {
                                                    onClick: () => {
                                                      isUserRoleChangeDialogOpen.value = true;
                                                      tempUser.value = user;
                                                    }
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(ShieldCheckIcon)),
                                                      createVNode("span", null, "Change role")
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["onClick"])
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
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                              } else {
                                return [
                                  user.personal.email != unref(mailAdmin) ? (openBlock(), createBlock(_component_DropdownMenu, { key: 0 }, {
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
                                              createVNode(_component_DropdownMenuItem, {
                                                onClick: () => {
                                                  isUserRoleChangeDialogOpen.value = true;
                                                  tempUser.value = user;
                                                }
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(ShieldCheckIcon)),
                                                  createVNode("span", null, "Change role")
                                                ]),
                                                _: 2
                                              }, 1032, ["onClick"])
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024)) : createCommentVNode("", true)
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
                                createVNode(_component_UserInfo, { user }, null, 8, ["user"])
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_TableCell),
                            createVNode(_component_TableCell, { class: "text-right" }, {
                              default: withCtx(() => [
                                user.personal.email != unref(mailAdmin) ? (openBlock(), createBlock(_component_DropdownMenu, { key: 0 }, {
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
                                            createVNode(_component_DropdownMenuItem, {
                                              onClick: () => {
                                                isUserRoleChangeDialogOpen.value = true;
                                                tempUser.value = user;
                                              }
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(ShieldCheckIcon)),
                                                createVNode("span", null, "Change role")
                                              ]),
                                              _: 2
                                            }, 1032, ["onClick"])
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024)) : createCommentVNode("", true)
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
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(users), (user, index) => {
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
                              createVNode(_component_UserInfo, { user }, null, 8, ["user"])
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_component_TableCell),
                          createVNode(_component_TableCell, { class: "text-right" }, {
                            default: withCtx(() => [
                              user.personal.email != unref(mailAdmin) ? (openBlock(), createBlock(_component_DropdownMenu, { key: 0 }, {
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
                                          createVNode(_component_DropdownMenuItem, {
                                            onClick: () => {
                                              isUserRoleChangeDialogOpen.value = true;
                                              tempUser.value = user;
                                            }
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(ShieldCheckIcon)),
                                              createVNode("span", null, "Change role")
                                            ]),
                                            _: 2
                                          }, 1032, ["onClick"])
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024)) : createCommentVNode("", true)
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
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(users), (user, index) => {
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
                            createVNode(_component_UserInfo, { user }, null, 8, ["user"])
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(_component_TableCell),
                        createVNode(_component_TableCell, { class: "text-right" }, {
                          default: withCtx(() => [
                            user.personal.email != unref(mailAdmin) ? (openBlock(), createBlock(_component_DropdownMenu, { key: 0 }, {
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
                                        createVNode(_component_DropdownMenuItem, {
                                          onClick: () => {
                                            isUserRoleChangeDialogOpen.value = true;
                                            tempUser.value = user;
                                          }
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(ShieldCheckIcon)),
                                            createVNode("span", null, "Change role")
                                          ]),
                                          _: 2
                                        }, 1032, ["onClick"])
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024)) : createCommentVNode("", true)
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
        open: unref(isUserRoleChangeDialogOpen),
        "onUpdate:open": () => {
          isUserRoleChangeDialogOpen.value = false;
          tempUser.value = null;
        }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_DialogContent, { class: "bg-white" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_DialogTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      var _a2, _b2, _c, _d, _e, _f, _g, _h;
                      if (_push4) {
                        _push4(` Update `);
                        if ((_b2 = (_a2 = unref(tempUser)) == null ? void 0 : _a2.personal) == null ? void 0 : _b2.first_name) {
                          _push4(`<span${_scopeId3}>${ssrInterpolate((_d = (_c = unref(tempUser)) == null ? void 0 : _c.personal) == null ? void 0 : _d.first_name)}&#39;s</span>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(` role `);
                      } else {
                        return [
                          createTextVNode(" Update "),
                          ((_f = (_e = unref(tempUser)) == null ? void 0 : _e.personal) == null ? void 0 : _f.first_name) ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString((_h = (_g = unref(tempUser)) == null ? void 0 : _g.personal) == null ? void 0 : _h.first_name) + "'s", 1)) : createCommentVNode("", true),
                          createTextVNode(" role ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_DialogDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Change role of users`);
                      } else {
                        return [
                          createTextVNode("Change role of users")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$a, {
                    user: unref(tempUser),
                    onUpdate: () => {
                      isUserRoleChangeDialogOpen.value = false;
                      tempUser.value = null;
                      unref(fetch)();
                    }
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_DialogTitle, null, {
                      default: withCtx(() => {
                        var _a2, _b2, _c, _d;
                        return [
                          createTextVNode(" Update "),
                          ((_b2 = (_a2 = unref(tempUser)) == null ? void 0 : _a2.personal) == null ? void 0 : _b2.first_name) ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString((_d = (_c = unref(tempUser)) == null ? void 0 : _c.personal) == null ? void 0 : _d.first_name) + "'s", 1)) : createCommentVNode("", true),
                          createTextVNode(" role ")
                        ];
                      }),
                      _: 1
                    }),
                    createVNode(_component_DialogDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Change role of users")
                      ]),
                      _: 1
                    }),
                    createVNode(_sfc_main$a, {
                      user: unref(tempUser),
                      onUpdate: () => {
                        isUserRoleChangeDialogOpen.value = false;
                        tempUser.value = null;
                        unref(fetch)();
                      }
                    }, null, 8, ["user", "onUpdate"])
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
                      var _a2, _b2, _c, _d;
                      return [
                        createTextVNode(" Update "),
                        ((_b2 = (_a2 = unref(tempUser)) == null ? void 0 : _a2.personal) == null ? void 0 : _b2.first_name) ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString((_d = (_c = unref(tempUser)) == null ? void 0 : _c.personal) == null ? void 0 : _d.first_name) + "'s", 1)) : createCommentVNode("", true),
                        createTextVNode(" role ")
                      ];
                    }),
                    _: 1
                  }),
                  createVNode(_component_DialogDescription, null, {
                    default: withCtx(() => [
                      createTextVNode("Change role of users")
                    ]),
                    _: 1
                  }),
                  createVNode(_sfc_main$a, {
                    user: unref(tempUser),
                    onUpdate: () => {
                      isUserRoleChangeDialogOpen.value = false;
                      tempUser.value = null;
                      unref(fetch)();
                    }
                  }, null, 8, ["user", "onUpdate"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/users/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Dpwhm73r.mjs.map
