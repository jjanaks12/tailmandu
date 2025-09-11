import { defineComponent, mergeProps, computed, createElementBlock, openBlock, normalizeClass, createVNode, createCommentVNode, unref, withCtx, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { Position, CurveType, Orientation, StackedBar, GroupedBar } from '@unovis/ts';
import { VisXYContainer, VisTooltip, VisLine, VisAxis, VisCrosshair, VisBulletLegend, VisStackedBar, VisGroupedBar } from '@unovis/vue';
import { _ as __nuxt_component_0$1 } from './server.mjs';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { u as useHead } from './v3-UNO0wT_2.mjs';
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
import 'axios';
import 'vue-sonner';

var l = /* @__PURE__ */ ((a) => (a.Top = "top", a.Bottom = "bottom", a))(l || {});
const R = /* @__PURE__ */ defineComponent({
  __name: "LineChart",
  props: {
    data: {},
    height: {},
    xLabel: {},
    yLabel: {},
    padding: { default: () => ({
      top: 5,
      right: 5,
      bottom: 5,
      left: 5
    }) },
    categories: {},
    xFormatter: {},
    yFormatter: {},
    curveType: {},
    xNumTicks: { default: (t) => t.data.length > 24 ? 24 / 4 : t.data.length - 1 },
    xExplicitTicks: {},
    minMaxTicksOnly: { type: Boolean },
    yNumTicks: { default: (t) => t.data.length > 24 ? 24 / 4 : t.data.length - 1 },
    hideTooltip: { type: Boolean },
    hideLegend: { type: Boolean },
    legendPosition: {},
    xGridLine: { type: Boolean },
    xDomainLine: { type: Boolean },
    yGridLine: { type: Boolean },
    yDomainLine: { type: Boolean },
    xTickLine: { type: Boolean },
    yTickLine: { type: Boolean }
  },
  setup(t) {
    const n = t, h = Object.values(n.categories).map((e, c) => `var(--vis-color${c})`), L = (e) => {
      var _a;
      return (_a = Object.values(n.categories)[e].color) != null ? _a : h[e];
    }, T = computed(() => (e, c) => {
      return "";
    }), d = computed(
      () => n.legendPosition === l.Top
    );
    return (e, c) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(["flex flex-col space-y-4", { "flex-col-reverse": d.value }])
    }, [
      createVNode(unref(VisXYContainer), {
        data: e.data,
        padding: e.padding,
        height: e.height
      }, {
        default: withCtx(() => [
          createVNode(unref(VisTooltip), {
            "horizontal-placement": unref(Position).Right,
            "vertical-placement": unref(Position).Top
          }, null, 8, ["horizontal-placement", "vertical-placement"]),
          (openBlock(true), createElementBlock(Fragment, null, renderList(Object.keys(n.categories), (o, a) => {
            var _a;
            return openBlock(), createBlock(unref(VisLine), {
              key: a,
              x: (m, v) => v,
              y: (m) => m[o],
              color: L(a),
              "curve-type": (_a = e.curveType) != null ? _a : unref(CurveType).MonotoneX
            }, null, 8, ["x", "y", "color", "curve-type"]);
          }), 128)),
          createVNode(unref(VisAxis), {
            type: "x",
            "tick-format": e.xFormatter,
            label: e.xLabel,
            "label-margin": 8,
            "domain-line": e.xDomainLine,
            "grid-line": e.xGridLine,
            "tick-line": e.xTickLine,
            "num-ticks": e.xNumTicks,
            "tick-values": e.xExplicitTicks,
            "min-max-ticks-only": e.minMaxTicksOnly
          }, null, 8, ["tick-format", "label", "domain-line", "grid-line", "tick-line", "num-ticks", "tick-values", "min-max-ticks-only"]),
          createVNode(unref(VisAxis), {
            type: "y",
            "tick-format": e.yFormatter,
            label: e.yLabel,
            "num-ticks": e.yNumTicks,
            "domain-line": e.yDomainLine,
            "grid-line": e.yGridLine,
            "tick-line": e.yTickLine
          }, null, 8, ["tick-format", "label", "num-ticks", "domain-line", "grid-line", "tick-line"]),
          e.hideTooltip ? createCommentVNode("", true) : (openBlock(), createBlock(unref(VisCrosshair), {
            key: 0,
            color: "#666",
            template: T.value
          }, null, 8, ["template"]))
        ]),
        _: 1
      }, 8, ["data", "padding", "height"]),
      e.hideLegend ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(["flex items center justify-end", { "pb-4": d.value }])
      }, [
        createVNode(unref(VisBulletLegend), {
          items: Object.values(e.categories)
        }, null, 8, ["items"])
      ], 2))
    ], 2));
  }
});
/* @__PURE__ */ defineComponent({
  __name: "BarChart",
  props: {
    data: {},
    stacked: { type: Boolean },
    height: {},
    xLabel: {},
    yLabel: {},
    padding: { default: () => ({
      top: 5,
      right: 5,
      bottom: 5,
      left: 5
    }) },
    categories: {},
    xFormatter: {},
    yFormatter: {},
    yNumTicks: { default: (a) => a.data.length > 24 ? 24 / 4 : a.data.length - 1 },
    minMaxTicksOnly: { type: Boolean },
    xNumTicks: { default: (a) => a.data.length > 24 ? 24 / 4 : a.data.length - 1 },
    xExplicitTicks: {},
    yAxis: {},
    groupPadding: {},
    barPadding: {},
    radius: {},
    hideLegend: { type: Boolean },
    orientation: { default: Orientation.Vertical },
    legendPosition: {},
    xDomainLine: { type: Boolean },
    yDomainLine: { type: Boolean },
    xTickLine: { type: Boolean },
    yTickLine: { type: Boolean },
    xGridLine: { type: Boolean },
    yGridLine: { type: Boolean, default: true }
  },
  setup(a) {
    const n = a;
    if (!n.yAxis || n.yAxis.length === 0)
      throw new Error("yAxis is required");
    const m = computed(() => n.yAxis.map((e) => (t) => t[e])), p = (e, t) => Object.values(n.categories)[t].color, g = computed(
      () => n.legendPosition === l.Top
    ), y = computed(() => (e, t) => {
      return "";
    });
    return (e, t) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(["flex flex-col space-y-4", { "flex-col-reverse": g.value }])
    }, [
      createVNode(unref(VisXYContainer), {
        padding: e.padding,
        height: e.height
      }, {
        default: withCtx(() => {
          var _a, _b, _c, _d, _e, _f, _g, _h;
          return [
            createVNode(unref(VisTooltip), {
              triggers: {
                [unref(GroupedBar).selectors.bar]: y.value,
                [unref(StackedBar).selectors.bar]: y.value
              }
            }, null, 8, ["triggers"]),
            e.stacked ? (openBlock(), createBlock(unref(VisStackedBar), {
              key: 1,
              data: e.data,
              x: (u, d) => d,
              y: m.value,
              color: p,
              "rounded-corners": (_a = e.radius) != null ? _a : 0,
              "group-padding": (_b = e.groupPadding) != null ? _b : 0,
              "bar-padding": (_c = e.barPadding) != null ? _c : 0.2,
              orientation: (_d = e.orientation) != null ? _d : unref(Orientation).Vertical
            }, null, 8, ["data", "x", "y", "rounded-corners", "group-padding", "bar-padding", "orientation"])) : (openBlock(), createBlock(unref(VisGroupedBar), {
              key: 0,
              data: e.data,
              x: (u, d) => d,
              y: m.value,
              color: p,
              "rounded-corners": (_e = e.radius) != null ? _e : 0,
              "group-padding": (_f = e.groupPadding) != null ? _f : 0,
              "bar-padding": (_g = e.barPadding) != null ? _g : 0.2,
              orientation: (_h = e.orientation) != null ? _h : unref(Orientation).Vertical
            }, null, 8, ["data", "x", "y", "rounded-corners", "group-padding", "bar-padding", "orientation"])),
            createVNode(unref(VisAxis), {
              type: "x",
              "tick-format": e.xFormatter,
              label: e.xLabel,
              "grid-line": e.xGridLine,
              "domain-line": !!e.xDomainLine,
              "tick-line": e.xTickLine,
              "num-ticks": e.xNumTicks,
              "tick-values": e.xExplicitTicks,
              "min-max-ticks-only": e.minMaxTicksOnly
            }, null, 8, ["tick-format", "label", "grid-line", "domain-line", "tick-line", "num-ticks", "tick-values", "min-max-ticks-only"]),
            createVNode(unref(VisAxis), {
              type: "y",
              label: e.yLabel,
              "grid-line": e.orientation !== unref(Orientation).Horizontal && e.yGridLine,
              "domain-line": !!e.yDomainLine,
              "tick-format": e.yFormatter,
              "num-ticks": e.yNumTicks,
              "tick-line": e.yTickLine
            }, null, 8, ["label", "grid-line", "domain-line", "tick-format", "num-ticks", "tick-line"])
          ];
        }),
        _: 1
      }, 8, ["padding", "height"]),
      e.hideLegend ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(["flex items center justify-end", { "pb-4": g.value }])
      }, [
        createVNode(unref(VisBulletLegend), {
          items: Object.values(e.categories)
        }, null, 8, ["items"])
      ], 2))
    ], 2));
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Dashboard"
    });
    const data = [
      { month: "Jan", sales: 100, profit: 50 },
      { month: "Feb", sales: 120, profit: 55 },
      { month: "Mar", sales: 180, profit: 80 },
      { month: "Apr", sales: 110, profit: 40 },
      { month: "May", sales: 90, profit: 30 }
    ];
    const categories = {
      sales: {
        name: "Sales",
        color: "#3b82f6"
      },
      profit: {
        name: "Profit",
        color: "#10b981"
      }
    };
    const xFormatter = (i) => data[i].month;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LineChart = R;
      const _component_ClientOnly = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-wrap space-y-2" }, _attrs))}><div class="w-1/2">`);
      _push(ssrRenderComponent(_component_LineChart, {
        data,
        categories,
        height: 300,
        xFormatter,
        xLabel: "Month",
        yLabel: "Amount"
      }, null, _parent));
      _push(`</div><div class="w-1/2">`);
      _push(ssrRenderComponent(_component_LineChart, {
        data,
        categories,
        height: 300,
        xFormatter,
        xLabel: "Month",
        yLabel: "Amount"
      }, null, _parent));
      _push(`</div><div class="w-full">`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-rBgry6G6.mjs.map
