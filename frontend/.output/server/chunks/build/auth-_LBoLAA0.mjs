import { z as defineNuxtRouteMiddleware, c as useAuthStore, n as navigateTo } from './server.mjs';
import { storeToRefs } from 'pinia';
import 'vue';
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
import 'vue/server-renderer';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
import 'deep-pick-omit';
import 'yup';
import 'axios';
import 'vue-sonner';

const auth = defineNuxtRouteMiddleware(async (to) => {
  const { isLoggedin } = storeToRefs(useAuthStore());
  return !isLoggedin.value ? navigateTo("/login?redirect_from=" + to.fullPath) : void 0;
});

export { auth as default };
//# sourceMappingURL=auth-_LBoLAA0.mjs.map
