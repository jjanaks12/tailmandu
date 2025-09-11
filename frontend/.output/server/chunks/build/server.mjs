import { defineComponent, shallowRef, getCurrentInstance, provide, cloneVNode, h, createElementBlock, hasInjectionContext, inject, ref, computed, watch, defineAsyncComponent, unref, shallowReactive, Suspense, Fragment, useSSRContext, createApp, withCtx, createBlock, openBlock, toRef, onErrorCaptured, onServerPrefetch, createVNode, resolveDynamicComponent, reactive, effectScope, isReadonly, isRef, isShallow, isReactive, toRaw, nextTick, mergeProps, getCurrentScope } from 'vue';
import { h as hasProtocol, i as isScriptProtocol, k as joinURL, w as withQuery, s as sanitizeStatusCode, l as getContext, $ as $fetch, m as createHooks, n as executeAsync, c as createError$1, t as toRouteMatcher, o as createRouter$1, p as defu, q as destr, r as klona, v as getRequestHeader, x as isEqual, y as setCookie, z as getCookie, A as deleteCookie } from '../nitro/nitro.mjs';
import { b as baseURL } from '../routes/renderer.mjs';
import { defineStore, storeToRefs, createPinia, setActivePinia, shouldHydrate } from 'pinia';
import { useRoute as useRoute$1, RouterView, createMemoryHistory, createRouter, START_LOCATION } from 'vue-router';
import { deepPickUnsafe, deepOmitUnsafe } from 'deep-pick-omit';
import { ssrRenderComponent, ssrRenderSuspense, ssrRenderVNode } from 'vue/server-renderer';
import axios from 'axios';
import { toast } from 'vue-sonner';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

function parse(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  const obj = {};
  const opt = options || {};
  const dec = opt.decode || decode;
  let index = 0;
  while (index < str.length) {
    const eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    let endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    const key = str.slice(index, eqIdx).trim();
    if (opt?.filter && !opt?.filter(key)) {
      index = endIdx + 1;
      continue;
    }
    if (void 0 === obj[key]) {
      let val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.codePointAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key] = tryDecode(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
}
function decode(str) {
  return str.includes("%") ? decodeURIComponent(str) : str;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch {
    return str;
  }
}

if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
if (!("global" in globalThis)) {
  globalThis.global = globalThis;
}
const appLayoutTransition = false;
const nuxtLinkDefaults = { "componentName": "NuxtLink" };
const appId = "nuxt-app";
function getNuxtAppCtx(id = appId) {
  return getContext(id, {
    asyncContext: false
  });
}
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    _id: options.id || appId || "nuxt-app",
    _scope: effectScope(),
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.18.1";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: shallowReactive({
      ...options.ssrContext?.payload || {},
      data: shallowReactive({}),
      state: reactive({}),
      once: /* @__PURE__ */ new Set(),
      _errors: shallowReactive({})
    }),
    static: {
      data: {}
    },
    runWithContext(fn) {
      if (nuxtApp._scope.active && !getCurrentScope()) {
        return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
      }
      return callWithNuxt(nuxtApp, fn);
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: shallowReactive({}),
    _payloadRevivers: {},
    ...options
  };
  {
    nuxtApp.payload.serverRendered = true;
  }
  if (nuxtApp.ssrContext) {
    nuxtApp.payload.path = nuxtApp.ssrContext.url;
    nuxtApp.ssrContext.nuxt = nuxtApp;
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: nuxtApp.ssrContext.runtimeConfig.public,
      app: nuxtApp.ssrContext.runtimeConfig.app
    };
  }
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
function registerPluginHooks(nuxtApp, plugin2) {
  if (plugin2.hooks) {
    nuxtApp.hooks.addHooks(plugin2.hooks);
  }
}
async function applyPlugin(nuxtApp, plugin2) {
  if (typeof plugin2 === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin2(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  const resolvedPlugins = /* @__PURE__ */ new Set();
  const unresolvedPlugins = [];
  const parallels = [];
  let error = void 0;
  let promiseDepth = 0;
  async function executePlugin(plugin2) {
    const unresolvedPluginsForThisPlugin = plugin2.dependsOn?.filter((name) => plugins2.some((p) => p._name === name) && !resolvedPlugins.has(name)) ?? [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin2]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin2).then(async () => {
        if (plugin2._name) {
          resolvedPlugins.add(plugin2._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin2._name)) {
              dependsOn.delete(plugin2._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      }).catch((e) => {
        if (!plugin2.parallel && !nuxtApp.payload.error) {
          throw e;
        }
        error ||= e;
      });
      if (plugin2.parallel) {
        parallels.push(promise);
      } else {
        await promise;
      }
    }
  }
  for (const plugin2 of plugins2) {
    if (nuxtApp.ssrContext?.islandContext && plugin2.env?.islands === false) {
      continue;
    }
    registerPluginHooks(nuxtApp, plugin2);
  }
  for (const plugin2 of plugins2) {
    if (nuxtApp.ssrContext?.islandContext && plugin2.env?.islands === false) {
      continue;
    }
    await executePlugin(plugin2);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (error) {
    throw nuxtApp.payload.error || error;
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin2) {
  if (typeof plugin2 === "function") {
    return plugin2;
  }
  const _name = plugin2._name || plugin2.name;
  delete plugin2.name;
  return Object.assign(plugin2.setup || (() => {
  }), plugin2, { [NuxtPluginIndicator]: true, _name });
}
const definePayloadPlugin = defineNuxtPlugin;
function callWithNuxt(nuxt, setup, args) {
  const fn = () => setup();
  const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
function tryUseNuxtApp(id) {
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = getCurrentInstance()?.appContext.app.$nuxt;
  }
  nuxtAppInstance ||= getNuxtAppCtx(id).tryUse();
  return nuxtAppInstance || null;
}
function useNuxtApp(id) {
  const nuxtAppInstance = tryUseNuxtApp(id);
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const LayoutMetaSymbol = Symbol("layout-meta");
const PageRouteSymbol = Symbol("route");
const useRouter = () => {
  return useNuxtApp()?.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
const URL_QUOTE_RE = /"/g;
const navigateTo = (to, options) => {
  to ||= "/";
  const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
  const isExternalHost = hasProtocol(toPath, { acceptRelative: true });
  const isExternal = options?.external || isExternalHost;
  if (isExternal) {
    if (!options?.external) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const { protocol } = new URL(toPath, "http://localhost");
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(URL_QUOTE_RE, "%22");
        const encodedHeader = encodeURL(location2, isExternalHost);
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode(options?.redirectCode || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: encodedHeader }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options?.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  return options?.replace ? router.replace(to) : router.push(to);
};
function resolveRouteObject(to) {
  return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
function encodeURL(location2, isExternalHost = false) {
  const url = new URL(location2, "http://localhost");
  if (!isExternalHost) {
    return url.pathname + url.search + url.hash;
  }
  if (location2.startsWith("//")) {
    return url.toString().replace(url.protocol, "");
  }
  return url.toString();
}
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = () => toRef(useNuxtApp().payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const nuxtApp = useNuxtApp();
    const error2 = useError();
    if (false) ;
    error2.value ||= nuxtError;
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  return nuxtError;
};
async function getRouteRules(arg) {
  const path = typeof arg === "string" ? arg : arg.path;
  {
    useNuxtApp().ssrContext._preloadManifest = true;
    const _routeRulesMatcher = toRouteMatcher(
      createRouter$1({ routes: (/* @__PURE__ */ useRuntimeConfig()).nitro.routeRules })
    );
    return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
  }
}
function definePayloadReducer(name, reduce) {
  {
    useNuxtApp().ssrContext._payloadReducers[name] = reduce;
  }
}
const payloadPlugin = definePayloadPlugin(() => {
  definePayloadReducer(
    "skipHydrate",
    // We need to return something truthy to be treated as a match
    (data) => !shouldHydrate(data) && 1
  );
});
const unhead_k2P3m_ZDyjlr2mMYnoDPwavjsDN8hBlk9cFai0bbopU = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    nuxtApp.vueApp.use(head);
  }
});
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
const __nuxt_page_meta$i = {
  layout: "default"
};
const __nuxt_page_meta$h = {
  layout: "admin",
  authorization: "*"
};
const __nuxt_page_meta$g = {
  layout: "simple"
};
const __nuxt_page_meta$f = {
  layout: "admin",
  role: "Admin",
  authorization: "manage_gender"
};
const __nuxt_page_meta$e = {
  layout: "admin",
  authorization: "*",
  role: "Admin"
};
const __nuxt_page_meta$d = {
  layout: "simple"
};
const __nuxt_page_meta$c = {
  layout: "admin",
  role: "Admin",
  authorization: "manage__country"
};
const __nuxt_page_meta$b = {
  layout: "admin",
  authorization: ["event_view"]
};
const __nuxt_page_meta$a = {
  layout: "admin",
  authorization: ["manage_permission"]
};
const __nuxt_page_meta$9 = {
  layout: "admin",
  authorization: ["role_create", "role_edit", "role_view", "role_delete"]
};
const __nuxt_page_meta$8 = {
  layout: "admin",
  authorization: ["manage_user"]
};
const __nuxt_page_meta$7 = {
  layout: "admin",
  role: "Admin",
  authorization: ["manage_ageCategory"]
};
const __nuxt_page_meta$6 = {
  layout: "admin",
  authorization: ["event_create", "event_update", "event_view", "event_delete"]
};
const __nuxt_page_meta$5 = {
  layout: "admin"
};
const __nuxt_page_meta$4 = {
  layout: "admin",
  authorization: ["*"]
};
const __nuxt_page_meta$3 = {
  layout: "simple"
};
const __nuxt_page_meta$2 = {
  layout: "simple"
};
const __nuxt_page_meta$1 = {
  layout: "admin",
  authorization: ["*"]
};
const __nuxt_page_meta = {
  layout: "admin"
};
const _routes = [
  {
    name: "index",
    path: "/",
    meta: __nuxt_page_meta$i || {},
    component: () => import('./index-BCgY5Toc.mjs')
  },
  {
    name: "about_us",
    path: "/about_us",
    component: () => import('./about_us-CkTdFyWZ.mjs')
  },
  {
    name: "checkout",
    path: "/checkout",
    component: () => import('./checkout-zk0W9NBl.mjs')
  },
  {
    name: "tm_clicks",
    path: "/tm_clicks",
    component: () => import('./tm_clicks-D5-JszAt.mjs')
  },
  {
    name: "contact_us",
    path: "/contact_us",
    component: () => import('./contact_us-BnOgrKil.mjs')
  },
  {
    name: "our_trails",
    path: "/our_trails",
    component: () => import('./our_trails-DgiaoFnv.mjs')
  },
  {
    name: "races",
    path: "/races",
    component: () => import('./index-ClfH5IJH.mjs')
  },
  {
    name: "dashboard",
    path: "/dashboard",
    meta: { ...__nuxt_page_meta$h || {}, ...{ "middleware": "auth" } },
    component: () => import('./index-rBgry6G6.mjs')
  },
  {
    name: "login",
    path: "/login",
    meta: __nuxt_page_meta$g || {},
    component: () => import('./login-DHEZ-8cj.mjs')
  },
  {
    name: "dashboard-gender",
    path: "/dashboard/gender",
    meta: { ...__nuxt_page_meta$f || {}, ...{ "middleware": "auth" } },
    component: () => import('./gender-B7T39SD5.mjs')
  },
  {
    name: "dashboard-company",
    path: "/dashboard/company",
    meta: { ...__nuxt_page_meta$e || {}, ...{ "middleware": "auth" } },
    component: () => import('./company-CtAjVQw3.mjs')
  },
  {
    name: "races-slug",
    path: "/races/:slug()",
    component: () => import('./index-HzApX3sR.mjs')
  },
  {
    name: "register",
    path: "/register",
    meta: __nuxt_page_meta$d || {},
    component: () => import('./register-Ci3VhFtw.mjs')
  },
  {
    name: "dashboard-countries",
    path: "/dashboard/countries",
    meta: { ...__nuxt_page_meta$c || {}, ...{ "middleware": "auth" } },
    component: () => import('./countries-DreHtq9W.mjs')
  },
  {
    name: "races-slug-runner",
    path: "/races/:slug()/runner",
    component: () => import('./runner-Dl67gspo.mjs')
  },
  {
    name: "dashboard-events-id",
    path: "/dashboard/events/:id()",
    meta: { ...__nuxt_page_meta$b || {}, ...{ "middleware": "auth" } },
    component: () => import('./_id_-wivVvYr4.mjs')
  },
  {
    name: "dashboard-events-form",
    path: "/dashboard/events/form",
    component: () => import('./form-DcFAsuTg.mjs')
  },
  {
    name: "dashboard-permissions",
    path: "/dashboard/permissions",
    meta: { ...__nuxt_page_meta$a || {}, ...{ "middleware": "auth" } },
    component: () => import('./permissions-FkOSTBB-.mjs')
  },
  {
    name: "dashboard-roles",
    path: "/dashboard/roles",
    meta: { ...__nuxt_page_meta$9 || {}, ...{ "middleware": "auth" } },
    component: () => import('./index-BTHiK3Ih.mjs')
  },
  {
    name: "dashboard-users",
    path: "/dashboard/users",
    meta: { ...__nuxt_page_meta$8 || {}, ...{ "middleware": "auth" } },
    component: () => import('./index-CZS_bZBc.mjs')
  },
  {
    name: "dashboard-age_category",
    path: "/dashboard/age_category",
    meta: { ...__nuxt_page_meta$7 || {}, ...{ "middleware": "auth" } },
    component: () => import('./age_category-D6NQjIqQ.mjs')
  },
  {
    name: "dashboard-events",
    path: "/dashboard/events",
    meta: { ...__nuxt_page_meta$6 || {}, ...{ "middleware": "auth" } },
    component: () => import('./index-C3riVQ36.mjs')
  },
  {
    name: "races-slug-volunteer",
    path: "/races/:slug()/volunteer",
    component: () => import('./volunteer-DW7YAzFM.mjs')
  },
  {
    name: "dashboard-events-stages",
    path: "/dashboard/events/stages",
    meta: { ...__nuxt_page_meta$5 || {}, ...{ "middleware": "auth" } },
    component: () => import('./stages-BhVDV1OA.mjs')
  },
  {
    name: "dashboard-change_password",
    path: "/dashboard/change_password",
    meta: { ...__nuxt_page_meta$4 || {}, ...{ "middleware": "auth" } },
    component: () => import('./change_password-C7JRAxEv.mjs')
  },
  {
    name: "forget_password",
    path: "/forget_password",
    meta: __nuxt_page_meta$3 || {},
    component: () => import('./forget_password-C9It2HOs.mjs')
  },
  {
    name: "getting_started",
    path: "/getting_started",
    meta: __nuxt_page_meta$2 || {},
    component: () => import('./getting_started-CnuUaF6X.mjs')
  },
  {
    name: "dashboard-personal_details",
    path: "/dashboard/personal_details",
    meta: { ...__nuxt_page_meta$1 || {}, ...{ "middleware": "auth" } },
    component: () => import('./personal_details-Bpu8jP90.mjs')
  },
  {
    name: "dashboard-events-checkpoints",
    path: "/dashboard/events/checkpoints",
    meta: { ...__nuxt_page_meta || {}, ...{ "middleware": "auth" } },
    component: () => import('./checkpoints-J6cRT7nP.mjs')
  },
  {
    name: "dashboard-roles-_components-form",
    path: "/dashboard/roles/_components/form",
    component: () => import('./form-MZEDc4bl.mjs')
  },
  {
    name: "dashboard-users-_components-roleForm",
    path: "/dashboard/users/_components/roleForm",
    component: () => import('./roleForm-BpWAmzDk.mjs')
  }
];
const _wrapInTransition = (props, children) => {
  return { default: () => children.default?.() };
};
const ROUTE_KEY_PARENTHESES_RE = /(:\w+)\([^)]+\)/g;
const ROUTE_KEY_SYMBOLS_RE = /(:\w+)[?+*]/g;
const ROUTE_KEY_NORMAL_RE = /:\w+/g;
function generateRouteKey(route) {
  const source = route?.meta.key ?? route.path.replace(ROUTE_KEY_PARENTHESES_RE, "$1").replace(ROUTE_KEY_SYMBOLS_RE, "$1").replace(ROUTE_KEY_NORMAL_RE, (r) => route.params[r.slice(1)]?.toString() || "");
  return typeof source === "function" ? source(route) : source;
}
function isChangingPage(to, from) {
  if (to === from || from === START_LOCATION) {
    return false;
  }
  if (generateRouteKey(to) !== generateRouteKey(from)) {
    return true;
  }
  const areComponentsSame = to.matched.every(
    (comp, index) => comp.components && comp.components.default === from.matched[index]?.components?.default
  );
  if (areComponentsSame) {
    return false;
  }
  return true;
}
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp();
    const hashScrollBehaviour = useRouter().options?.scrollBehaviorType ?? "auto";
    if (to.path === from.path) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior: hashScrollBehaviour };
      }
      return false;
    }
    const routeAllowsScrollToTop = typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop;
    if (routeAllowsScrollToTop === false) {
      return false;
    }
    const hookToWait = nuxtApp._runningTransition ? "page:transition:finish" : "page:loading:end";
    return new Promise((resolve) => {
      if (from === START_LOCATION) {
        resolve(_calculatePosition(to, from, savedPosition, hashScrollBehaviour));
        return;
      }
      nuxtApp.hooks.hookOnce(hookToWait, () => {
        requestAnimationFrame(() => resolve(_calculatePosition(to, from, savedPosition, hashScrollBehaviour)));
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = (void 0).querySelector(selector);
    if (elem) {
      return (Number.parseFloat(getComputedStyle(elem).scrollMarginTop) || 0) + (Number.parseFloat(getComputedStyle((void 0).documentElement).scrollPaddingTop) || 0);
    }
  } catch {
  }
  return 0;
}
function _calculatePosition(to, from, savedPosition, defaultHashScrollBehaviour) {
  if (savedPosition) {
    return savedPosition;
  }
  const isPageNavigation = isChangingPage(to, from);
  if (to.hash) {
    return {
      el: to.hash,
      top: _getHashElementScrollMarginTop(to.hash),
      behavior: isPageNavigation ? defaultHashScrollBehaviour : "instant"
    };
  }
  return {
    left: 0,
    top: 0
  };
}
const configRouterOptions = {
  linkExactActiveClass: "nav--active",
  linkActiveClass: "",
  hashMode: false,
  scrollBehaviorType: "auto"
};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to, from) => {
  let __temp, __restore;
  if (!to.meta?.validate) {
    return;
  }
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  const error = createError({
    fatal: false,
    statusCode: result && result.statusCode || 404,
    statusMessage: result && result.statusMessage || `Page Not Found: ${to.fullPath}`,
    data: {
      path: to.fullPath
    }
  });
  return error;
});
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  {
    return;
  }
});
const globalMiddleware = [
  validate,
  manifest_45route_45rule
];
const namedMiddleware = {
  auth: () => import('./auth-B_sInZd0.mjs')
};
const plugin$1 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    let __temp, __restore;
    let routerBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    const history = routerOptions.history?.(routerBase) ?? createMemoryHistory(routerBase);
    const routes = routerOptions.routes ? ([__temp, __restore] = executeAsync(() => routerOptions.routes(_routes)), __temp = await __temp, __restore(), __temp) ?? _routes : _routes;
    let startPosition;
    const router = createRouter({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        if (from === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        if (routerOptions.scrollBehavior) {
          router.options.scrollBehavior = routerOptions.scrollBehavior;
          if ("scrollRestoration" in (void 0).history) {
            const unsub = router.beforeEach(() => {
              unsub();
              (void 0).history.scrollRestoration = "manual";
            });
          }
          return routerOptions.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
        }
      },
      history,
      routes
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const initialURL = nuxtApp.ssrContext.url;
    const _route = shallowRef(router.currentRoute.value);
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    nuxtApp.hook("page:finish", syncCurrentRoute);
    router.afterEach((to, from) => {
      if (to.matched[0]?.components?.default === from.matched[0]?.components?.default) {
        syncCurrentRoute();
      }
    });
    const route = {};
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key],
        enumerable: true
      });
    }
    nuxtApp._route = shallowReactive(route);
    nuxtApp._middleware ||= {
      global: [],
      named: {}
    };
    useError();
    if (!nuxtApp.ssrContext?.islandContext) {
      router.afterEach(async (to, _from, failure) => {
        delete nuxtApp._processingMiddleware;
        if (failure) {
          await nuxtApp.callHook("page:loading:end");
        }
        if (failure?.type === 4) {
          return;
        }
        if (to.redirectedFrom && to.fullPath !== initialURL) {
          await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
        }
      });
    }
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    const resolvedInitialRoute = router.currentRoute.value;
    syncCurrentRoute();
    if (nuxtApp.ssrContext?.islandContext) {
      return { provide: { router } };
    }
    const initialLayout = nuxtApp.payload.state._layout;
    router.beforeEach(async (to, from) => {
      await nuxtApp.callHook("page:loading:start");
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout;
      }
      nuxtApp._processingMiddleware = true;
      if (!nuxtApp.ssrContext?.islandContext) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          for (const entry2 of toArray(componentMiddleware)) {
            middlewareEntries.add(entry2);
          }
        }
        {
          const routeRules = await nuxtApp.runWithContext(() => getRouteRules({ path: to.path }));
          if (routeRules.appMiddleware) {
            for (const key in routeRules.appMiddleware) {
              if (routeRules.appMiddleware[key]) {
                middlewareEntries.add(key);
              } else {
                middlewareEntries.delete(key);
              }
            }
          }
        }
        for (const entry2 of middlewareEntries) {
          const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await namedMiddleware[entry2]?.().then((r) => r.default || r) : entry2;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry2}'.`);
          }
          try {
            const result = await nuxtApp.runWithContext(() => middleware(to, from));
            if (true) {
              if (result === false || result instanceof Error) {
                const error2 = result || createError({
                  statusCode: 404,
                  statusMessage: `Page Not Found: ${initialURL}`
                });
                await nuxtApp.runWithContext(() => showError(error2));
                return false;
              }
            }
            if (result === true) {
              continue;
            }
            if (result === false) {
              return result;
            }
            if (result) {
              if (isNuxtError(result) && result.fatal) {
                await nuxtApp.runWithContext(() => showError(result));
              }
              return result;
            }
          } catch (err) {
            const error2 = createError(err);
            if (error2.fatal) {
              await nuxtApp.runWithContext(() => showError(error2));
            }
            return error2;
          }
        }
      }
    });
    router.onError(async () => {
      delete nuxtApp._processingMiddleware;
      await nuxtApp.callHook("page:loading:end");
    });
    router.afterEach(async (to, _from) => {
      if (to.matched.length === 0) {
        await nuxtApp.runWithContext(() => showError(createError({
          statusCode: 404,
          fatal: false,
          statusMessage: `Page not found: ${to.fullPath}`,
          data: {
            path: to.fullPath
          }
        })));
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        if ("name" in resolvedInitialRoute) {
          resolvedInitialRoute.name = void 0;
        }
        await router.replace({
          ...resolvedInitialRoute,
          force: true
        });
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
});
const reducers = [
  ["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
  ["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
  ["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
  ["Ref", (data) => isRef(data) && data.value],
  ["Reactive", (data) => isReactive(data) && toRaw(data)]
];
const revive_payload_server_MVtmlZaQpj6ApFmshWfUWl5PehCebzaBf2NuRMiIbms = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const [reducer, fn] of reducers) {
      definePayloadReducer(reducer, fn);
    }
  }
});
defineComponent({
  name: "ServerPlaceholder",
  render() {
    return createElementBlock("div");
  }
});
const clientOnlySymbol = Symbol.for("nuxt:client-only");
const __nuxt_component_0$1 = defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  ...false,
  setup(props, { slots, attrs }) {
    const mounted = shallowRef(false);
    const vm = getCurrentInstance();
    if (vm) {
      vm._nuxtClientOnly = true;
    }
    provide(clientOnlySymbol, true);
    return () => {
      if (mounted.value) {
        const vnodes = slots.default?.();
        if (vnodes && vnodes.length === 1) {
          return [cloneVNode(vnodes[0], attrs)];
        }
        return vnodes;
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return h(slot);
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
function useRequestEvent(nuxtApp) {
  nuxtApp ||= useNuxtApp();
  return nuxtApp.ssrContext?.event;
}
const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => destr(decodeURIComponent(val)),
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  const opts = { ...CookieDefaults, ..._opts };
  opts.filter ??= (key) => key === name;
  const cookies2 = readRawCookies(opts) || {};
  let delay;
  if (opts.maxAge !== void 0) {
    delay = opts.maxAge * 1e3;
  } else if (opts.expires) {
    delay = opts.expires.getTime() - Date.now();
  }
  const hasExpired = delay !== void 0 && delay <= 0;
  const cookieValue = klona(hasExpired ? void 0 : cookies2[name] ?? opts.default?.());
  const cookie = ref(cookieValue);
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (opts.readonly || isEqual(cookie.value, cookies2[name])) {
        return;
      }
      nuxtApp._cookies ||= {};
      if (name in nuxtApp._cookies) {
        if (isEqual(cookie.value, nuxtApp._cookies[name])) {
          return;
        }
      }
      nuxtApp._cookies[name] = cookie.value;
      writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:error", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  {
    return parse(getRequestHeader(useRequestEvent(), "cookie") || "", opts);
  }
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    if (value !== null && value !== void 0) {
      return setCookie(event, name, value, opts);
    }
    if (getCookie(event, name) !== void 0) {
      return deleteCookie(event, name, opts);
    }
  }
}
const plugin = /* @__PURE__ */ defineNuxtPlugin({
  name: "pinia",
  setup(nuxtApp) {
    const pinia = createPinia();
    nuxtApp.vueApp.use(pinia);
    setActivePinia(pinia);
    {
      nuxtApp.payload.pinia = toRaw(pinia.state.value);
    }
    return {
      provide: {
        pinia
      }
    };
  }
});
const components_plugin_z4hgvsiddfKkfXTP6M8M4zG5Cb7sGnDhcryKVM45Di4 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components"
});
function hydrateStore(store, {
  storage,
  serializer,
  key,
  debug,
  pick,
  omit,
  beforeHydrate,
  afterHydrate
}, context, runHooks = true) {
  try {
    if (runHooks)
      beforeHydrate?.(context);
    const fromStorage = storage.getItem(key);
    if (fromStorage) {
      const deserialized = serializer.deserialize(fromStorage);
      const picked = pick ? deepPickUnsafe(deserialized, pick) : deserialized;
      const omitted = omit ? deepOmitUnsafe(picked, omit) : picked;
      store.$patch(omitted);
    }
    if (runHooks)
      afterHydrate?.(context);
  } catch (error) {
    if (debug)
      console.error("[pinia-plugin-persistedstate]", error);
  }
}
function persistState(state, {
  storage,
  serializer,
  key,
  debug,
  pick,
  omit
}) {
  try {
    const picked = pick ? deepPickUnsafe(state, pick) : state;
    const omitted = omit ? deepOmitUnsafe(picked, omit) : picked;
    const toStorage = serializer.serialize(omitted);
    storage.setItem(key, toStorage);
  } catch (error) {
    if (debug)
      console.error("[pinia-plugin-persistedstate]", error);
  }
}
function createPersistence(context, optionsParser, auto) {
  const { pinia, store, options: { persist = auto } } = context;
  if (!persist)
    return;
  if (!(store.$id in pinia.state.value)) {
    const originalStore = pinia._s.get(store.$id.replace("__hot:", ""));
    if (originalStore)
      void Promise.resolve().then(() => originalStore.$persist());
    return;
  }
  const persistenceOptions = Array.isArray(persist) ? persist : persist === true ? [{}] : [persist];
  const persistences = persistenceOptions.map(optionsParser);
  store.$hydrate = ({ runHooks = true } = {}) => {
    persistences.forEach((p) => {
      hydrateStore(store, p, context, runHooks);
    });
  };
  store.$persist = () => {
    persistences.forEach((p) => {
      persistState(store.$state, p);
    });
  };
  persistences.forEach((p) => {
    hydrateStore(store, p, context);
    store.$subscribe(
      (_mutation, state) => persistState(state, p),
      { detached: true }
    );
  });
}
function cookies(options) {
  return {
    getItem: (key) => useCookie(
      key,
      {
        ...options ?? (/* @__PURE__ */ useRuntimeConfig()).public.piniaPluginPersistedstate.cookieOptions ?? {},
        decode: options?.decode ?? decodeURIComponent,
        readonly: true
      }
    ).value,
    setItem: (key, value) => useCookie(
      key,
      {
        ...options ?? (/* @__PURE__ */ useRuntimeConfig()).public.piniaPluginPersistedstate.cookieOptions ?? {},
        encode: options?.encode ?? encodeURIComponent
      }
    ).value = value
  };
}
function localStorage() {
  return {
    getItem: (key) => null,
    setItem: (key, value) => null
  };
}
function sessionStorage() {
  return {
    getItem: (key) => null,
    setItem: (key, value) => null
  };
}
const storages = {
  cookies,
  localStorage,
  sessionStorage
};
function piniaPlugin(context) {
  const config = /* @__PURE__ */ useRuntimeConfig();
  const options = config.public.piniaPluginPersistedstate;
  createPersistence(
    context,
    (p) => ({
      key: options.key ? options.key.replace(/%id/g, p.key ?? context.store.$id) : p.key ?? context.store.$id,
      debug: p.debug ?? options.debug ?? false,
      serializer: p.serializer ?? {
        serialize: (data) => JSON.stringify(data),
        deserialize: (data) => destr(data)
      },
      storage: p.storage ?? (options.storage ? options.storage === "cookies" ? storages.cookies(options.cookieOptions) : storages[options.storage]() : storages.cookies()),
      beforeHydrate: p.beforeHydrate,
      afterHydrate: p.afterHydrate,
      pick: p.pick,
      omit: p.omit
    }),
    options.auto ?? false
  );
}
const plugin_jjl2DFTrQxMG7TqNyE_rvcIV8r2uFVLO_Sius2B7lXg = /* @__PURE__ */ defineNuxtPlugin({
  name: "pinia-plugin-persistedstate",
  setup({ $pinia }) {
    $pinia.use(piniaPlugin);
  }
});
const plugins = [
  payloadPlugin,
  unhead_k2P3m_ZDyjlr2mMYnoDPwavjsDN8hBlk9cFai0bbopU,
  plugin$1,
  revive_payload_server_MVtmlZaQpj6ApFmshWfUWl5PehCebzaBf2NuRMiIbms,
  plugin,
  components_plugin_z4hgvsiddfKkfXTP6M8M4zG5Cb7sGnDhcryKVM45Di4,
  plugin_jjl2DFTrQxMG7TqNyE_rvcIV8r2uFVLO_Sius2B7lXg
];
const layouts = {
  "admin-sidebar": defineAsyncComponent(() => import('./_sidebar-C5gkv9C1.mjs').then((m) => m.default || m)),
  admin: defineAsyncComponent(() => import('./index-B08efxNg.mjs').then((m) => m.default || m)),
  "default-footer": defineAsyncComponent(() => import('./_footer-BgpHzCBS.mjs').then((m) => m.default || m)),
  "default-header": defineAsyncComponent(() => import('./_header-C6jA4uGU.mjs').then((m) => m.default || m)),
  "default-sidebar": defineAsyncComponent(() => import('./_sidebar-BIS0KLul.mjs').then((m) => m.default || m)),
  default: defineAsyncComponent(() => import('./index-BCGzAbpC.mjs').then((m) => m.default || m)),
  simple: defineAsyncComponent(() => import('./index-pWhHW54B.mjs').then((m) => m.default || m))
};
const LayoutLoader = defineComponent({
  name: "LayoutLoader",
  inheritAttrs: false,
  props: {
    name: String,
    layoutProps: Object
  },
  setup(props, context) {
    return () => h(layouts[props.name], props.layoutProps, context.slots);
  }
});
const nuxtLayoutProps = {
  name: {
    type: [String, Boolean, Object],
    default: null
  },
  fallback: {
    type: [String, Object],
    default: null
  }
};
const __nuxt_component_0 = defineComponent({
  name: "NuxtLayout",
  inheritAttrs: false,
  props: nuxtLayoutProps,
  setup(props, context) {
    const nuxtApp = useNuxtApp();
    const injectedRoute = inject(PageRouteSymbol);
    const shouldUseEagerRoute = !injectedRoute || injectedRoute === useRoute();
    const route = shouldUseEagerRoute ? useRoute$1() : injectedRoute;
    const layout = computed(() => {
      let layout2 = unref(props.name) ?? route?.meta.layout ?? "default";
      if (layout2 && !(layout2 in layouts)) {
        if (props.fallback) {
          layout2 = unref(props.fallback);
        }
      }
      return layout2;
    });
    const layoutRef = shallowRef();
    context.expose({ layoutRef });
    const done = nuxtApp.deferHydration();
    let lastLayout;
    return () => {
      const hasLayout = layout.value && layout.value in layouts;
      const transitionProps = route?.meta.layoutTransition ?? appLayoutTransition;
      const previouslyRenderedLayout = lastLayout;
      lastLayout = layout.value;
      return _wrapInTransition(hasLayout && transitionProps, {
        default: () => h(Suspense, { suspensible: true, onResolve: () => {
          nextTick(done);
        } }, {
          default: () => h(
            LayoutProvider,
            {
              layoutProps: mergeProps(context.attrs, { ref: layoutRef }),
              key: layout.value || void 0,
              name: layout.value,
              shouldProvide: !props.name,
              isRenderingNewLayout: (name) => {
                return name !== previouslyRenderedLayout && name === layout.value;
              },
              hasTransition: !!transitionProps
            },
            context.slots
          )
        })
      }).default();
    };
  }
});
const LayoutProvider = defineComponent({
  name: "NuxtLayoutProvider",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean]
    },
    layoutProps: {
      type: Object
    },
    hasTransition: {
      type: Boolean
    },
    shouldProvide: {
      type: Boolean
    },
    isRenderingNewLayout: {
      type: Function,
      required: true
    }
  },
  setup(props, context) {
    const name = props.name;
    if (props.shouldProvide) {
      provide(LayoutMetaSymbol, {
        isCurrent: (route) => name === (route.meta.layout ?? "default")
      });
    }
    const injectedRoute = inject(PageRouteSymbol);
    const isNotWithinNuxtPage = injectedRoute && injectedRoute === useRoute();
    if (isNotWithinNuxtPage) {
      const vueRouterRoute = useRoute$1();
      const reactiveChildRoute = {};
      for (const _key in vueRouterRoute) {
        const key = _key;
        Object.defineProperty(reactiveChildRoute, key, {
          enumerable: true,
          get: () => {
            return props.isRenderingNewLayout(props.name) ? vueRouterRoute[key] : injectedRoute[key];
          }
        });
      }
      provide(PageRouteSymbol, shallowReactive(reactiveChildRoute));
    }
    return () => {
      if (!name || typeof name === "string" && !(name in layouts)) {
        return context.slots.default?.();
      }
      return h(
        LayoutLoader,
        { key: name, layoutProps: props.layoutProps, name },
        context.slots
      );
    };
  }
});
const defineRouteProvider = (name = "RouteProvider") => defineComponent({
  name,
  props: {
    route: {
      type: Object,
      required: true
    },
    vnode: Object,
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key],
        enumerable: true
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    return () => {
      if (!props.vnode) {
        return props.vnode;
      }
      return h(props.vnode, { ref: props.vnodeRef });
    };
  }
});
const RouteProvider = defineRouteProvider();
const __nuxt_component_1 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs, slots, expose }) {
    const nuxtApp = useNuxtApp();
    const pageRef = ref();
    inject(PageRouteSymbol, null);
    expose({ pageRef });
    inject(LayoutMetaSymbol, null);
    nuxtApp.deferHydration();
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          return h(Suspense, { suspensible: true }, {
            default() {
              return h(RouteProvider, {
                vnode: slots.default ? normalizeSlot(slots.default, routeProps) : routeProps.Component,
                route: routeProps.route,
                vnodeRef: pageRef
              });
            }
          });
        }
      });
    };
  }
});
function normalizeSlot(slot, data) {
  const slotContent = slot(data);
  return slotContent.length === 1 ? h(slotContent[0]) : h(Fragment, void 0, slotContent);
}
const showImage = (fileName) => {
  const { public: { serverUrl } } = /* @__PURE__ */ useRuntimeConfig();
  return fileName ? serverUrl + "resources/images/" + fileName : "";
};
const isObjEq = (x, y) => {
  const ok = Object.keys, tx = typeof x, ty = typeof y;
  return x && y && tx === "object" && tx === ty ? ok(x).length === ok(y).length && ok(x).every((key) => isObjEq(x[key], y[key])) : x === y;
};
const useAxios = () => {
  const { public: { apiUrl } } = /* @__PURE__ */ useRuntimeConfig();
  const instance = axios.create({
    baseURL: apiUrl
  });
  instance.interceptors.request.use((request) => {
    const { token } = storeToRefs(useAuthStore());
    if (token.value && token.value !== null) {
      request.headers["Authorization"] = `Bearer ${token.value.accessToken}`;
    }
    return request;
  });
  instance.interceptors.response.use((response) => response, async (error) => {
    const { status } = error.response || {};
    const { token } = storeToRefs(useAuthStore());
    const { refreshToken, logout } = useAuthStore();
    if ([401, 403].indexOf(status) !== -1) {
      if (error.response.data.error.message == "jwt expired") {
        const originalRequest = error.config;
        originalRequest._retry = true;
        await refreshToken().then(async () => {
          navigateTo("/");
        });
      }
      if (error.response.data.error.message == "Unauthorized") {
        token.value = null;
      }
      toast({
        title: "Something went wrong",
        description: error.response.data.error.message,
        variant: "destructive"
      });
    }
    toast({
      title: error.message,
      description: error.response?.data?.error?.message,
      variant: "destructive"
    });
    return error;
  });
  return { axios: instance };
};
const useAuthStore = defineStore("auth", () => {
  const { axios: axios2 } = useAxios();
  const user = ref(null);
  const token = ref(null);
  const isLoading = ref(false);
  const permissions = computed(() => user.value?.role?.permissions.map((permission) => permission.name) || []);
  const isLoggedin = computed(() => token.value != null);
  computed(() => showImage(user.value?.personal.avatar.file_name));
  const fullName = computed(() => [user.value?.personal.first_name, user.value?.personal.middle_name, user.value?.personal.last_name].join(" ").trim());
  const role = computed(() => user.value?.role?.name);
  const fetch = async () => {
    isLoading.value = true;
    const { data } = await axios2.get("/profile");
    user.value = data;
    isLoading.value = false;
  };
  const login = async (formData, redirectURL = "/dashboard") => {
    isLoading.value = true;
    const { data } = await axios2.post("/login", formData);
    if (data) {
      token.value = data;
      await fetch();
      navigateTo(redirectURL);
    }
    isLoading.value = false;
  };
  const register = async (formData) => {
    isLoading.value = true;
    const { data } = await axios2.post("/register", formData);
    token.value = data;
    isLoading.value = false;
  };
  const refreshToken = () => new Promise(async (resolve, reject) => {
    try {
      if (token.value != null) {
        const { data } = await axios2.post("/refresh-token", {
          refreshToken: token.value?.refreshToken
        });
        token.value = data;
      }
      resolve(true);
    } catch (e) {
      reject(e);
    }
  });
  const logout = async () => {
    isLoading.value = true;
    await axios2.post("/logout", {
      refreshToken: token.value?.refreshToken
    });
    token.value = null;
    isLoading.value = false;
    navigateTo("/login");
  };
  const changePassword = async () => {
    isLoading.value = true;
    setTimeout(() => {
      isLoading.value = false;
      navigateTo("/login");
    }, 4e3);
  };
  const updateDetail = async (formData) => {
    isLoading.value = true;
    await axios2.put("profile", formData);
    await fetch();
    isLoading.value = false;
  };
  const checkUser = async () => {
    if (token.value == null && user.value != null)
      user.value = null;
  };
  watch(token, () => {
    checkUser();
  });
  return {
    user,
    isLoading,
    token,
    fullName,
    permissions,
    isLoggedin,
    role,
    fetch,
    login,
    register,
    logout,
    changePassword,
    refreshToken,
    updateDetail
  };
}, {
  persist: {
    pick: ["user", "token"]
  }
});
const useAppStore = defineStore("app", () => {
  const breakpoints = ref();
  const genders = ref([]);
  const countries = ref([]);
  const permissions = ref([]);
  const age_categories = ref([]);
  const company = ref(null);
  const { axios: axios2 } = useAxios();
  const fetchGender = async () => {
    const { data } = await axios2.get("/genders");
    genders.value = data;
  };
  const fetchCountries = async () => {
    const { data } = await axios2.get("/countries");
    countries.value = data;
  };
  const fetchPermission = async () => {
    const { data } = await axios2.get("/permissions");
    permissions.value = data;
  };
  const fetchAgeCategory = async () => {
    const { data } = await axios2.get("/age_categories");
    age_categories.value = data;
  };
  const fetchCompany = async () => {
    const { data } = await axios2.get("/companies");
    company.value = data;
  };
  const saveCompany = async (formData) => {
    const method = formData.id ? "put" : "post";
    const url = formData.id ? `/companies/${formData.id}` : "/companies";
    await axios2[method](url, formData);
    await fetchCompany();
  };
  return {
    breakpoints,
    genders,
    countries,
    permissions,
    age_categories,
    company,
    fetchGender,
    fetchCountries,
    fetchPermission,
    fetchAgeCategory,
    fetchCompany,
    saveCompany
  };
});
class Jobs {
  list = [];
  add(jobs) {
    if (Array.isArray(jobs))
      this.list = jobs;
    else
      this.list.push(jobs);
  }
  run() {
    return new Promise(async (resolve) => {
      try {
        while (this.list.length > 0) {
          const job = this.list[0];
          await job();
          this.list.shift();
        }
        resolve(true);
      } catch (error) {
        console.error(error);
      }
    });
  }
  getJobs() {
    return this.list;
  }
}
const useModalMeta = () => {
  const isLoading = ref(false);
  const params = ref({
    current: 1,
    per_page: 15,
    total: 0,
    total_page: 0
  });
  const nextPage = () => {
    if (params.value.current + 1 <= params.value.total_page)
      params.value = {
        ...params.value,
        current: params.value.current + 1
      };
  };
  const prevPage = () => {
    if (params.value.current - 1 > 0)
      params.value = {
        ...params.value,
        current: params.value.current - 1
      };
  };
  return {
    isLoading,
    params,
    nextPage,
    prevPage
  };
};
const useRoleStore = defineStore("role", () => {
  const roles = ref([]);
  const { axios: axios2 } = useAxios();
  const { params, isLoading } = useModalMeta();
  const fetch = async () => {
    const { data } = await axios2.get("/roles");
    roles.value = data;
  };
  const save = async (formData) => {
    const method = formData.id ? "put" : "post";
    const url = formData.id ? `/roles/${formData.id}` : "roles";
    isLoading.value = true;
    await axios2[method](url, formData);
    isLoading.value = false;
    fetch();
  };
  const destory = async (id) => {
    await axios2.delete(`/roles/${id}`);
  };
  const assignUserRole = async (formData) => {
    console.log(formData);
    await axios2.put(`/users/assignRole/`, formData);
  };
  watch(params, (oldValue, newValue) => {
    if (!isObjEq(oldValue, newValue))
      fetch();
  });
  return {
    roles,
    params,
    isLoading,
    fetch,
    save,
    destory,
    assignUserRole
  };
});
const usePermissionStore = defineStore("permission", () => {
  const permissions = ref([]);
  const { axios: axios2 } = useAxios();
  const { params, isLoading } = useModalMeta();
  const fetch = async () => {
    const { data } = await axios2.get("/permissions");
    permissions.value = data;
  };
  watch(params, (oldValue, newValue) => {
    if (!isObjEq(oldValue, newValue))
      fetch();
  });
  return {
    permissions,
    params,
    isLoading,
    fetch
  };
});
const useEventStore = defineStore("event", () => {
  const events = ref([]);
  const { isLoading, params } = useModalMeta();
  const { axios: axios2 } = useAxios();
  const currentRace = computed(() => events.value[events.value.length - 1]);
  const fetch = async () => {
    const { data } = await axios2.get("/events", {
      params: params.value
    });
    if (data) {
      const { data: d, ...p } = data;
      events.value = d;
      params.value = p;
    }
  };
  const save = async (formData) => {
    const method = formData.id ? "put" : "post";
    const url = formData.id ? `/events/${formData.id}` : "events";
    isLoading.value = true;
    await axios2[method](url, formData);
    isLoading.value = false;
    fetch();
  };
  const get = async (id) => {
    const { data } = await axios2(`/events/${id}`);
    return data;
  };
  const getBySlug = async (slug) => {
    const { data } = await axios2(`/events/by_slug/${slug}`);
    return data;
  };
  const saveDescription = async (id, description) => {
    await axios2.put(`/events/${id}/update_description`, { description });
  };
  const saveMap = async (id, description) => {
    await axios2.put(`/events/${id}/upload_map_file`, { description });
  };
  return {
    isLoading,
    params,
    events,
    currentRace,
    fetch,
    save,
    get,
    saveDescription,
    saveMap,
    getBySlug
  };
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    const { isLoggedin } = storeToRefs(useAuthStore());
    const { fetch } = useAuthStore();
    const { fetchGender, fetchCountries, fetchAgeCategory, fetchCompany } = useAppStore();
    const { fetch: fetchRole } = useRoleStore();
    const { fetch: fetchPermission } = usePermissionStore();
    const { fetch: fetchEvents } = useEventStore();
    const isLoading = ref(true);
    const job = new Jobs();
    const initPage = async () => {
      const jobList = [fetchCompany, fetchEvents];
      if (isLoggedin.value)
        jobList.push(fetch, fetchGender, fetchCountries, fetchPermission, fetchRole, fetchAgeCategory);
      job.add(jobList);
      await job.run().finally(() => {
        isLoading.value = false;
      });
    };
    watch(isLoggedin, () => {
      initPage();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_NuxtPage = __nuxt_component_1;
      _push(ssrRenderComponent(_component_NuxtLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtPage, {
              key: _ctx.$route.fullPath
            }, null, _parent2, _scopeId));
          } else {
            return [
              (openBlock(), createBlock(_component_NuxtPage, {
                key: _ctx.$route.fullPath
              }))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "nuxt-error-page",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    const props = __props;
    const _error = props.error;
    _error.stack ? _error.stack.split("\n").splice(1).map((line) => {
      const text = line.replace("webpack:/", "").replace(".vue", ".js").trim();
      return {
        text,
        internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
      };
    }).map((i) => `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`).join("\n") : "";
    const statusCode = Number(_error.statusCode || 500);
    const is404 = statusCode === 404;
    const statusMessage = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
    const description = _error.message || _error.toString();
    const stack = void 0;
    const _Error404 = defineAsyncComponent(() => import('./error-404-EW67PANC.mjs'));
    const _Error = defineAsyncComponent(() => import('./error-500-Bl73XX8G.mjs'));
    const ErrorTemplate = is404 ? _Error404 : _Error;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({ statusCode: unref(statusCode), statusMessage: unref(statusMessage), description: unref(description), stack: unref(stack) }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = () => null;
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    const abortRender = error.value && !nuxtApp.ssrContext.error;
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(abortRender)) {
            _push(`<div></div>`);
          } else if (unref(error)) {
            _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(_sfc_main$2), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      nuxt.payload.error ||= createError(error);
    }
    if (ssrContext?._renderResponse) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry$1 = (ssrContext) => entry(ssrContext);

export { __nuxt_component_0$1 as _, useRoute as a, useAuthStore as b, useAppStore as c, useAxios as d, entry$1 as default, usePermissionStore as e, useRoleStore as f, useModalMeta as g, useRuntimeConfig as h, isObjEq as i, useRouter as j, useNuxtApp as k, nuxtLinkDefaults as l, defineNuxtRouteMiddleware as m, navigateTo as n, resolveRouteObject as r, showImage as s, tryUseNuxtApp as t, useEventStore as u };
//# sourceMappingURL=server.mjs.map
