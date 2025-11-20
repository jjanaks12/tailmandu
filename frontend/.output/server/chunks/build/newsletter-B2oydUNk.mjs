import { _ as _sfc_main$5, a as _sfc_main$1, b as _sfc_main$2, c as _sfc_main$1$1, d as _sfc_main$4, e as _sfc_main$3 } from './TableHeader-DWcwUMYW.mjs';
import { _ as _sfc_main$5$1, a as _sfc_main$4$1, b as _sfc_main$6, c as _sfc_main$2$1, d as _sfc_main$3$1, e as _sfc_main$1$2 } from './PaginationPrevious-jU64QIWz.mjs';
import { defineComponent, withCtx, createTextVNode, createVNode, unref, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, ref, watch, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { f as formatDate } from './humanize-Dt8EJGgI.mjs';
import { e as useModalMeta, a as useAxios, i as isObjEq } from './server.mjs';
import { storeToRefs, defineStore } from 'pinia';
import { u as useHead } from './v3-CnyYpv1t.mjs';
import './helpers-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
import 'reka-ui';
import './index-BCNSwEbA.mjs';
import 'lucide-vue-next';
import './index-Dniqw3Np.mjs';
import 'class-variance-authority';
import 'moment';
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

const useNewsletterStore = defineStore("newsletters", () => {
  const newsletters = ref([]);
  const { isLoading, params } = useModalMeta();
  const { axios } = useAxios();
  const fetch = async () => {
    const { data: { data, ...p } } = await axios.get("/newsletter", {
      params: params.value
    });
    newsletters.value = data;
    params.value = p;
    newsletters.value = data;
  };
  watch(params, (oldValue, newValue) => {
    if (!isObjEq(oldValue, newValue))
      fetch();
  });
  return {
    newsletters,
    isLoading,
    params,
    fetch
  };
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "newsletter",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Newsletters"
    });
    const { newsletters, params } = storeToRefs(useNewsletterStore());
    const { fetch } = useNewsletterStore();
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_Table = _sfc_main$5;
      const _component_TableHeader = _sfc_main$1;
      const _component_TableRow = _sfc_main$2;
      const _component_TableHead = _sfc_main$1$1;
      const _component_TableBody = _sfc_main$4;
      const _component_TableCell = _sfc_main$3;
      const _component_Pagination = _sfc_main$5$1;
      const _component_PaginationContent = _sfc_main$4$1;
      const _component_PaginationPrevious = _sfc_main$6;
      const _component_PaginationItem = _sfc_main$2$1;
      const _component_PaginationEllipsis = _sfc_main$3$1;
      const _component_PaginationNext = _sfc_main$1$2;
      _push(`<!--[--><div class="flex"><div class="flex-grow"><h1 class="text-primary text-2xl mb-4">Newsletters</h1></div></div>`);
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
                        _push4(ssrRenderComponent(_component_TableHead, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Email`);
                            } else {
                              return [
                                createTextVNode("Email")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_TableHead, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Subscribed at`);
                            } else {
                              return [
                                createTextVNode("Subscribed at")
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
                          createVNode(_component_TableHead, null, {
                            default: withCtx(() => [
                              createTextVNode("Email")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_TableHead, null, {
                            default: withCtx(() => [
                              createTextVNode("Subscribed at")
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
                        createVNode(_component_TableHead, null, {
                          default: withCtx(() => [
                            createTextVNode("Email")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_TableHead, null, {
                          default: withCtx(() => [
                            createTextVNode("Subscribed at")
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
                  ssrRenderList(unref(newsletters), (newsletter, index) => {
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
                              var _a2, _b2, _c, _d, _e, _f, _g, _h;
                              if (_push5) {
                                _push5(`${ssrInterpolate((_d = [(_a2 = newsletter.user) == null ? void 0 : _a2.first_name, (_b2 = newsletter.user) == null ? void 0 : _b2.middle_name, (_c = newsletter.user) == null ? void 0 : _c.last_name].join(" ")) != null ? _d : "-")}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString((_h = [(_e = newsletter.user) == null ? void 0 : _e.first_name, (_f = newsletter.user) == null ? void 0 : _f.middle_name, (_g = newsletter.user) == null ? void 0 : _g.last_name].join(" ")) != null ? _h : "-"), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_TableCell, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(newsletter.email)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(newsletter.email), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_TableCell, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(unref(formatDate)(newsletter.subscribed_at))}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(unref(formatDate)(newsletter.subscribed_at)), 1)
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
                              default: withCtx(() => {
                                var _a2, _b2, _c, _d;
                                return [
                                  createTextVNode(toDisplayString((_d = [(_a2 = newsletter.user) == null ? void 0 : _a2.first_name, (_b2 = newsletter.user) == null ? void 0 : _b2.middle_name, (_c = newsletter.user) == null ? void 0 : _c.last_name].join(" ")) != null ? _d : "-"), 1)
                                ];
                              }),
                              _: 2
                            }, 1024),
                            createVNode(_component_TableCell, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(newsletter.email), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_TableCell, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(formatDate)(newsletter.subscribed_at)), 1)
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
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(newsletters), (newsletter, index) => {
                      return openBlock(), createBlock(_component_TableRow, null, {
                        default: withCtx(() => [
                          createVNode(_component_TableCell, null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(index + 1), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_component_TableCell, null, {
                            default: withCtx(() => {
                              var _a2, _b2, _c, _d;
                              return [
                                createTextVNode(toDisplayString((_d = [(_a2 = newsletter.user) == null ? void 0 : _a2.first_name, (_b2 = newsletter.user) == null ? void 0 : _b2.middle_name, (_c = newsletter.user) == null ? void 0 : _c.last_name].join(" ")) != null ? _d : "-"), 1)
                              ];
                            }),
                            _: 2
                          }, 1024),
                          createVNode(_component_TableCell, null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(newsletter.email), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_component_TableCell, null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(formatDate)(newsletter.subscribed_at)), 1)
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
                      createVNode(_component_TableHead, null, {
                        default: withCtx(() => [
                          createTextVNode("Email")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_TableHead, null, {
                        default: withCtx(() => [
                          createTextVNode("Subscribed at")
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
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(newsletters), (newsletter, index) => {
                    return openBlock(), createBlock(_component_TableRow, null, {
                      default: withCtx(() => [
                        createVNode(_component_TableCell, null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(index + 1), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(_component_TableCell, null, {
                          default: withCtx(() => {
                            var _a2, _b2, _c, _d;
                            return [
                              createTextVNode(toDisplayString((_d = [(_a2 = newsletter.user) == null ? void 0 : _a2.first_name, (_b2 = newsletter.user) == null ? void 0 : _b2.middle_name, (_c = newsletter.user) == null ? void 0 : _c.last_name].join(" ")) != null ? _d : "-"), 1)
                            ];
                          }),
                          _: 2
                        }, 1024),
                        createVNode(_component_TableCell, null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(newsletter.email), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(_component_TableCell, null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(formatDate)(newsletter.subscribed_at)), 1)
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
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/newsletter.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=newsletter-B2oydUNk.mjs.map
