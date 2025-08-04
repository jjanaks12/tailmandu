import { useSSRContext } from 'vue';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tm_clicks.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const tm_clicks = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { tm_clicks as default };
//# sourceMappingURL=tm_clicks-D5-JszAt.mjs.map
