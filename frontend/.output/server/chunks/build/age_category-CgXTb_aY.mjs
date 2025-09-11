import { _ as _sfc_main$5, a as _sfc_main$1, b as _sfc_main$2, c as _sfc_main$1$1, d as _sfc_main$4, e as _sfc_main$3 } from './TableHeader-DWcwUMYW.mjs';
import { _ as _sfc_main$3$1, a as _sfc_main$6, b as _sfc_main$2$1, c as _sfc_main$1$3 } from './DropdownMenuTrigger-xuKKjxp6.mjs';
import { _ as _sfc_main$1$2, a as _sfc_main$7 } from './DropdownMenuSeparator-B-ibFYtd.mjs';
import { defineComponent, withCtx, createTextVNode, createVNode, unref, toDisplayString, createBlock, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { EllipsisVertical, Pencil, Trash } from 'lucide-vue-next';
import { c as useAppStore } from './server.mjs';
import { u as useHead } from './v3-UNO0wT_2.mjs';
import { storeToRefs } from 'pinia';
import './helpers-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
import 'reka-ui';
import './index-BCNSwEbA.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "age_category",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Age Category"
    });
    const { age_categories } = storeToRefs(useAppStore());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Table = _sfc_main$5;
      const _component_TableHeader = _sfc_main$1;
      const _component_TableRow = _sfc_main$2;
      const _component_TableHead = _sfc_main$1$1;
      const _component_TableBody = _sfc_main$4;
      const _component_TableCell = _sfc_main$3;
      const _component_DropdownMenu = _sfc_main$3$1;
      const _component_DropdownMenuTrigger = _sfc_main$6;
      const _component_DropdownMenuContent = _sfc_main$2$1;
      const _component_DropdownMenuLabel = _sfc_main$1$2;
      const _component_DropdownMenuSeparator = _sfc_main$7;
      const _component_DropdownMenuItem = _sfc_main$1$3;
      _push(`<!--[--><h1 class="text-primary text-2xl mb-4">Countries</h1>`);
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
                        _push4(ssrRenderComponent(_component_TableHead, null, null, _parent4, _scopeId3));
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
                          createVNode(_component_TableHead)
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
                        createVNode(_component_TableHead)
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
                  ssrRenderList(unref(age_categories), (ageCategory, index) => {
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
                                _push5(`${ssrInterpolate(ageCategory.name)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(ageCategory.name), 1)
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
                                            _push7(ssrRenderComponent(unref(EllipsisVertical), null, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(unref(EllipsisVertical))
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_DropdownMenuContent, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(_component_DropdownMenuLabel, null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`Options`);
                                                } else {
                                                  return [
                                                    createTextVNode("Options")
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(_component_DropdownMenuSeparator, null, null, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(_component_DropdownMenuItem, null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(unref(Pencil), null, null, _parent8, _scopeId7));
                                                  _push8(` Edit `);
                                                } else {
                                                  return [
                                                    createVNode(unref(Pencil)),
                                                    createTextVNode(" Edit ")
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(_component_DropdownMenuItem, null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(unref(Trash), null, null, _parent8, _scopeId7));
                                                  _push8(` Delete `);
                                                } else {
                                                  return [
                                                    createVNode(unref(Trash)),
                                                    createTextVNode(" Delete ")
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(_component_DropdownMenuLabel, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Options")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_DropdownMenuSeparator),
                                              createVNode(_component_DropdownMenuItem, null, {
                                                default: withCtx(() => [
                                                  createVNode(unref(Pencil)),
                                                  createTextVNode(" Edit ")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_DropdownMenuItem, null, {
                                                default: withCtx(() => [
                                                  createVNode(unref(Trash)),
                                                  createTextVNode(" Delete ")
                                                ]),
                                                _: 1
                                              })
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_DropdownMenuTrigger, null, {
                                          default: withCtx(() => [
                                            createVNode(unref(EllipsisVertical))
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_DropdownMenuContent, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_DropdownMenuLabel, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Options")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_DropdownMenuSeparator),
                                            createVNode(_component_DropdownMenuItem, null, {
                                              default: withCtx(() => [
                                                createVNode(unref(Pencil)),
                                                createTextVNode(" Edit ")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_DropdownMenuItem, null, {
                                              default: withCtx(() => [
                                                createVNode(unref(Trash)),
                                                createTextVNode(" Delete ")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        })
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
                                          createVNode(unref(EllipsisVertical))
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_DropdownMenuContent, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_DropdownMenuLabel, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Options")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_DropdownMenuSeparator),
                                          createVNode(_component_DropdownMenuItem, null, {
                                            default: withCtx(() => [
                                              createVNode(unref(Pencil)),
                                              createTextVNode(" Edit ")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_DropdownMenuItem, null, {
                                            default: withCtx(() => [
                                              createVNode(unref(Trash)),
                                              createTextVNode(" Delete ")
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
                                createTextVNode(toDisplayString(ageCategory.name), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_TableCell, { class: "text-right" }, {
                              default: withCtx(() => [
                                createVNode(_component_DropdownMenu, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_DropdownMenuTrigger, null, {
                                      default: withCtx(() => [
                                        createVNode(unref(EllipsisVertical))
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_DropdownMenuContent, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_DropdownMenuLabel, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Options")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_DropdownMenuSeparator),
                                        createVNode(_component_DropdownMenuItem, null, {
                                          default: withCtx(() => [
                                            createVNode(unref(Pencil)),
                                            createTextVNode(" Edit ")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_DropdownMenuItem, null, {
                                          default: withCtx(() => [
                                            createVNode(unref(Trash)),
                                            createTextVNode(" Delete ")
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
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(age_categories), (ageCategory, index) => {
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
                              createTextVNode(toDisplayString(ageCategory.name), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_component_TableCell, { class: "text-right" }, {
                            default: withCtx(() => [
                              createVNode(_component_DropdownMenu, null, {
                                default: withCtx(() => [
                                  createVNode(_component_DropdownMenuTrigger, null, {
                                    default: withCtx(() => [
                                      createVNode(unref(EllipsisVertical))
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_DropdownMenuContent, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_DropdownMenuLabel, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Options")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_DropdownMenuSeparator),
                                      createVNode(_component_DropdownMenuItem, null, {
                                        default: withCtx(() => [
                                          createVNode(unref(Pencil)),
                                          createTextVNode(" Edit ")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_DropdownMenuItem, null, {
                                        default: withCtx(() => [
                                          createVNode(unref(Trash)),
                                          createTextVNode(" Delete ")
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
                      createVNode(_component_TableHead)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_TableBody, null, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(age_categories), (ageCategory, index) => {
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
                            createTextVNode(toDisplayString(ageCategory.name), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(_component_TableCell, { class: "text-right" }, {
                          default: withCtx(() => [
                            createVNode(_component_DropdownMenu, null, {
                              default: withCtx(() => [
                                createVNode(_component_DropdownMenuTrigger, null, {
                                  default: withCtx(() => [
                                    createVNode(unref(EllipsisVertical))
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_DropdownMenuContent, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_DropdownMenuLabel, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Options")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_DropdownMenuSeparator),
                                    createVNode(_component_DropdownMenuItem, null, {
                                      default: withCtx(() => [
                                        createVNode(unref(Pencil)),
                                        createTextVNode(" Edit ")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_DropdownMenuItem, null, {
                                      default: withCtx(() => [
                                        createVNode(unref(Trash)),
                                        createTextVNode(" Delete ")
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
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/age_category.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=age_category-CgXTb_aY.mjs.map
