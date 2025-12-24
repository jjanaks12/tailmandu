import { unref, useSSRContext } from 'vue';
import { ssrRenderList, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import moment from 'moment';
import { u as useHead } from './v3-gCezraLe.mjs';
import './server.mjs';
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

const _sfc_main = {
  __name: "our_story",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Our Story"
    });
    const stories = [{
      title: "Foundation",
      subtitle: "Started Our Journey",
      text: "Each of us started our journey from different backgrounds and different ventures before getting in to trail running.",
      date: "2017-01-01 00:00:00"
    }, {
      title: "Joined Hands",
      subtitle: "Collaboration",
      text: "All three of us joined hands and started collaborating in different trail running and outdoor events.",
      date: "2019-01-01 00:00:00"
    }, {
      title: "Exapansion",
      subtitle: "We are bigger",
      text: "We grew together as a team and decided on forming Trailmandu.",
      date: "2021-01-01 00:00:00"
    }, {
      title: "Online",
      subtitle: "We are online!",
      text: "We finally decided to work together as a team and bring out Trailmandu.",
      date: "2023-01-01 00:00:00"
    }];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="bg-gray-600 uppercase py-20 border-b"><div class="container"><h1 class="text-4xl font-bold">Our Story</h1><em class="text-xl not-italic">Talent wins games, but teamwork win championships</em></div></div><section class="py-12"><div class="container"><!--[-->`);
      ssrRenderList(stories, (story) => {
        _push(`<div><strong>${ssrInterpolate(story.title)}</strong><p>${ssrInterpolate(story.text)}</p><time${ssrRenderAttr("datetime", story.date)}>${ssrInterpolate(unref(moment)(story.date).format("YYYY"))}</time></div>`);
      });
      _push(`<!--]--></div></section><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/our_story.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=our_story-CMHn3dI6.mjs.map
