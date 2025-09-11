import { defineComponent, computed, withCtx, unref, createTextVNode, toDisplayString, createVNode, mergeProps, isRef, createBlock, openBlock, Fragment, renderList, renderSlot, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderSlot } from 'vue/server-renderer';
import { useForwardPropsEmits, useDateFormatter, CalendarRoot, PopoverRoot, PopoverTrigger, PopoverPortal, PopoverContent, useForwardProps, CalendarHeader, CalendarHeading, CalendarGrid, CalendarGridHead, CalendarGridRow, CalendarHeadCell, CalendarGridBody, CalendarCell, CalendarCellTrigger } from 'reka-ui';
import { c as cn } from './helpers-H80jjgLf.mjs';
import { r as reactiveOmit } from './index-BCNSwEbA.mjs';
import { _ as _sfc_main$d, b as buttonVariants } from './index-fXRoVOws.mjs';
import { _ as _sfc_main$6$1, a as _sfc_main$1$1, b as _sfc_main$e, c as _sfc_main$5$1, d as _sfc_main$4$1 } from './SelectValue-cH59kxAH.mjs';
import { today, getLocalTimeZone } from '@internationalized/date';
import { a as useVModel } from './index-DRYUbUIy.mjs';
import { createYear, toDate, createDecade } from 'reka-ui/date';

const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "Popover",
  __ssrInlineRender: true,
  props: {
    defaultOpen: { type: Boolean },
    open: { type: Boolean },
    modal: { type: Boolean }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(PopoverRoot), mergeProps({ "data-slot": "popover" }, unref(forwarded), _attrs), {
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
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/popover/Popover.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "PopoverContent",
  __ssrInlineRender: true,
  props: {
    forceMount: { type: Boolean },
    side: {},
    sideOffset: { default: 4 },
    sideFlip: { type: Boolean },
    align: { default: "center" },
    alignOffset: {},
    alignFlip: { type: Boolean },
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    positionStrategy: {},
    updatePositionStrategy: {},
    disableUpdateOnLayoutShift: { type: Boolean },
    prioritizePosition: { type: Boolean },
    reference: {},
    asChild: { type: Boolean },
    as: {},
    disableOutsidePointerEvents: { type: Boolean },
    class: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(PopoverPortal), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(PopoverContent), mergeProps({ "data-slot": "popover-content" }, { ...unref(forwarded), ..._ctx.$attrs }, {
              class: unref(cn)(
                "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 rounded-md border p-4 shadow-md origin-(--reka-popover-content-transform-origin) outline-hidden",
                props.class
              )
            }), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "default")
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(PopoverContent), mergeProps({ "data-slot": "popover-content" }, { ...unref(forwarded), ..._ctx.$attrs }, {
                class: unref(cn)(
                  "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 rounded-md border p-4 shadow-md origin-(--reka-popover-content-transform-origin) outline-hidden",
                  props.class
                )
              }), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }, 16, ["class"])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/popover/PopoverContent.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "PopoverTrigger",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(PopoverTrigger), mergeProps({ "data-slot": "popover-trigger" }, props, _attrs), {
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
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/popover/PopoverTrigger.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "CalendarCell",
  __ssrInlineRender: true,
  props: {
    date: {},
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(CalendarCell), mergeProps({
        "data-slot": "calendar-cell",
        class: unref(cn)("relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([data-selected])]:rounded-md [&:has([data-selected])]:bg-accent", props.class)
      }, unref(forwardedProps), _attrs), {
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
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/calendar/CalendarCell.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "CalendarCellTrigger",
  __ssrInlineRender: true,
  props: {
    day: {},
    month: {},
    asChild: { type: Boolean },
    as: { default: "button" },
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(CalendarCellTrigger), mergeProps({
        "data-slot": "calendar-cell-trigger",
        class: unref(cn)(
          unref(buttonVariants)({ variant: "ghost" }),
          "size-8 p-0 font-normal aria-selected:opacity-100 cursor-default",
          "[&[data-today]:not([data-selected])]:bg-accent [&[data-today]:not([data-selected])]:text-accent-foreground",
          // Selected
          "data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[selected]:opacity-100 data-[selected]:hover:bg-primary data-[selected]:hover:text-primary-foreground data-[selected]:focus:bg-primary data-[selected]:focus:text-primary-foreground",
          // Disabled
          "data-[disabled]:text-muted-foreground data-[disabled]:opacity-50",
          // Unavailable
          "data-[unavailable]:text-destructive-foreground data-[unavailable]:line-through",
          // Outside months
          "data-[outside-view]:text-muted-foreground",
          props.class
        )
      }, unref(forwardedProps), _attrs), {
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
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/calendar/CalendarCellTrigger.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "CalendarGrid",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(CalendarGrid), mergeProps({
        "data-slot": "calendar-grid",
        class: unref(cn)("w-full border-collapse space-x-1", props.class)
      }, unref(forwardedProps), _attrs), {
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
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/calendar/CalendarGrid.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "CalendarGridBody",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(CalendarGridBody), mergeProps({ "data-slot": "calendar-grid-body" }, props, _attrs), {
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
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/calendar/CalendarGridBody.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "CalendarGridHead",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(CalendarGridHead), mergeProps({ "data-slot": "calendar-grid-head" }, props, _attrs), {
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
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/calendar/CalendarGridHead.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "CalendarGridRow",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(CalendarGridRow), mergeProps({
        "data-slot": "calendar-grid-row",
        class: unref(cn)("flex", props.class)
      }, unref(forwardedProps), _attrs), {
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
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/calendar/CalendarGridRow.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "CalendarHeadCell",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(CalendarHeadCell), mergeProps({
        "data-slot": "calendar-head-cell",
        class: unref(cn)("text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]", props.class)
      }, unref(forwardedProps), _attrs), {
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/calendar/CalendarHeadCell.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "CalendarHeader",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(CalendarHeader), mergeProps({
        "data-slot": "calendar-header",
        class: unref(cn)("flex justify-center pt-1 relative items-center w-full", props.class)
      }, unref(forwardedProps), _attrs), {
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/calendar/CalendarHeader.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CalendarHeading",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(CalendarHeading), mergeProps({
        "data-slot": "calendar-heading",
        class: unref(cn)("text-sm font-medium", props.class)
      }, unref(forwardedProps), _attrs), {
        default: withCtx(({ headingValue }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", { headingValue }, () => {
              _push2(`${ssrInterpolate(headingValue)}`);
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", { headingValue }, () => [
                createTextVNode(toDisplayString(headingValue), 1)
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/calendar/CalendarHeading.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DatePicker",
  __ssrInlineRender: true,
  props: {
    defaultValue: {},
    defaultPlaceholder: {},
    placeholder: { default() {
      return today(getLocalTimeZone());
    } },
    pagedNavigation: { type: Boolean },
    preventDeselect: { type: Boolean },
    weekStartsOn: {},
    weekdayFormat: { default: "short" },
    calendarLabel: {},
    fixedWeeks: { type: Boolean },
    maxValue: {},
    minValue: {},
    locale: {},
    numberOfMonths: {},
    disabled: { type: Boolean },
    readonly: { type: Boolean },
    initialFocus: { type: Boolean },
    isDateDisabled: {},
    isDateUnavailable: {},
    dir: {},
    nextPage: {},
    prevPage: {},
    modelValue: { default: void 0 },
    multiple: { type: Boolean },
    disableDaysOutsideCurrentView: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  emits: ["update:modelValue", "update:placeholder"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = computed(() => {
      const { class: _, placeholder: __, ...delegated } = props;
      return delegated;
    });
    const placeholder = useVModel(props, "modelValue", emits, {
      passive: true,
      defaultValue: today(getLocalTimeZone())
    });
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    const formatter = useDateFormatter("en");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Popover = _sfc_main$c;
      const _component_PopoverTrigger = _sfc_main$a;
      const _component_Button = _sfc_main$d;
      const _component_PopoverContent = _sfc_main$b;
      const _component_CalendarHeader = _sfc_main$2;
      const _component_CalendarHeading = _sfc_main$1;
      const _component_Select = _sfc_main$6$1;
      const _component_SelectTrigger = _sfc_main$1$1;
      const _component_SelectValue = _sfc_main$e;
      const _component_SelectContent = _sfc_main$5$1;
      const _component_SelectItem = _sfc_main$4$1;
      const _component_CalendarGrid = _sfc_main$7;
      const _component_CalendarGridHead = _sfc_main$5;
      const _component_CalendarGridRow = _sfc_main$4;
      const _component_CalendarHeadCell = _sfc_main$3;
      const _component_CalendarGridBody = _sfc_main$6;
      const _component_CalendarCell = _sfc_main$9;
      const _component_CalendarCellTrigger = _sfc_main$8;
      _push(ssrRenderComponent(_component_Popover, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_PopoverTrigger, { "as-child": "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Button, {
                    variant: "outline",
                    class: unref(cn)("w-full justify-start text-left font-normal h-12", !unref(placeholder) && "text-muted-foreground")
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(unref(placeholder))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(unref(placeholder)), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Button, {
                      variant: "outline",
                      class: unref(cn)("w-full justify-start text-left font-normal h-12", !unref(placeholder) && "text-muted-foreground")
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(placeholder)), 1)
                      ]),
                      _: 1
                    }, 8, ["class"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_PopoverContent, { class: "w-[250px] p-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(CalendarRoot), mergeProps({
                    placeholder: unref(placeholder),
                    "onUpdate:placeholder": ($event) => isRef(placeholder) ? placeholder.value = $event : null
                  }, unref(forwarded), {
                    class: unref(cn)("rounded-md border p-3", props.class)
                  }), {
                    default: withCtx(({ date, grid, weekDays }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_CalendarHeader, null, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_CalendarHeading, { class: "flex w-full items-center justify-between gap-2" }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_Select, {
                                      "default-value": unref(placeholder).month.toString(),
                                      "onUpdate:modelValue": (v) => {
                                        var _a;
                                        if (!v || !unref(placeholder)) return;
                                        if (Number(v) === ((_a = unref(placeholder)) == null ? void 0 : _a.month)) return;
                                        placeholder.value = unref(placeholder).set({
                                          month: Number(v)
                                        });
                                      }
                                    }, {
                                      default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_SelectTrigger, {
                                            "aria-label": "Select month",
                                            class: "w-[60%]"
                                          }, {
                                            default: withCtx((_6, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(_component_SelectValue, { placeholder: "Select month" }, null, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(_component_SelectValue, { placeholder: "Select month" })
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_component_SelectContent, { class: "max-h-[200px]" }, {
                                            default: withCtx((_6, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`<!--[-->`);
                                                ssrRenderList(unref(createYear)({ dateObj: date }), (month) => {
                                                  _push8(ssrRenderComponent(_component_SelectItem, {
                                                    key: month.toString(),
                                                    value: month.month.toString()
                                                  }, {
                                                    default: withCtx((_7, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`${ssrInterpolate(unref(formatter).custom(unref(toDate)(month), { month: "long" }))}`);
                                                      } else {
                                                        return [
                                                          createTextVNode(toDisplayString(unref(formatter).custom(unref(toDate)(month), { month: "long" })), 1)
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                });
                                                _push8(`<!--]-->`);
                                              } else {
                                                return [
                                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(createYear)({ dateObj: date }), (month) => {
                                                    return openBlock(), createBlock(_component_SelectItem, {
                                                      key: month.toString(),
                                                      value: month.month.toString()
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(unref(formatter).custom(unref(toDate)(month), { month: "long" })), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["value"]);
                                                  }), 128))
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_SelectTrigger, {
                                              "aria-label": "Select month",
                                              class: "w-[60%]"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_SelectValue, { placeholder: "Select month" })
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_SelectContent, { class: "max-h-[200px]" }, {
                                              default: withCtx(() => [
                                                (openBlock(true), createBlock(Fragment, null, renderList(unref(createYear)({ dateObj: date }), (month) => {
                                                  return openBlock(), createBlock(_component_SelectItem, {
                                                    key: month.toString(),
                                                    value: month.month.toString()
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(unref(formatter).custom(unref(toDate)(month), { month: "long" })), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["value"]);
                                                }), 128))
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_Select, {
                                      "default-value": unref(placeholder).year.toString(),
                                      "onUpdate:modelValue": (v) => {
                                        var _a;
                                        if (!v || !unref(placeholder)) return;
                                        if (Number(v) === ((_a = unref(placeholder)) == null ? void 0 : _a.year)) return;
                                        placeholder.value = unref(placeholder).set({
                                          year: Number(v)
                                        });
                                      }
                                    }, {
                                      default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_SelectTrigger, {
                                            "aria-label": "Select year",
                                            class: "w-[40%]"
                                          }, {
                                            default: withCtx((_6, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(_component_SelectValue, { placeholder: "Select year" }, null, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(_component_SelectValue, { placeholder: "Select year" })
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_component_SelectContent, { class: "max-h-[200px]" }, {
                                            default: withCtx((_6, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`<!--[-->`);
                                                ssrRenderList(unref(createDecade)({ dateObj: date, startIndex: -50, endIndex: 50 }), (yearValue) => {
                                                  _push8(ssrRenderComponent(_component_SelectItem, {
                                                    key: yearValue.toString(),
                                                    value: yearValue.year.toString()
                                                  }, {
                                                    default: withCtx((_7, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`${ssrInterpolate(yearValue.year)}`);
                                                      } else {
                                                        return [
                                                          createTextVNode(toDisplayString(yearValue.year), 1)
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                });
                                                _push8(`<!--]-->`);
                                              } else {
                                                return [
                                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(createDecade)({ dateObj: date, startIndex: -50, endIndex: 50 }), (yearValue) => {
                                                    return openBlock(), createBlock(_component_SelectItem, {
                                                      key: yearValue.toString(),
                                                      value: yearValue.year.toString()
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(yearValue.year), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["value"]);
                                                  }), 128))
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_SelectTrigger, {
                                              "aria-label": "Select year",
                                              class: "w-[40%]"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_SelectValue, { placeholder: "Select year" })
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_SelectContent, { class: "max-h-[200px]" }, {
                                              default: withCtx(() => [
                                                (openBlock(true), createBlock(Fragment, null, renderList(unref(createDecade)({ dateObj: date, startIndex: -50, endIndex: 50 }), (yearValue) => {
                                                  return openBlock(), createBlock(_component_SelectItem, {
                                                    key: yearValue.toString(),
                                                    value: yearValue.year.toString()
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(yearValue.year), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["value"]);
                                                }), 128))
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
                                      createVNode(_component_Select, {
                                        "default-value": unref(placeholder).month.toString(),
                                        "onUpdate:modelValue": (v) => {
                                          var _a;
                                          if (!v || !unref(placeholder)) return;
                                          if (Number(v) === ((_a = unref(placeholder)) == null ? void 0 : _a.month)) return;
                                          placeholder.value = unref(placeholder).set({
                                            month: Number(v)
                                          });
                                        }
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_SelectTrigger, {
                                            "aria-label": "Select month",
                                            class: "w-[60%]"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_component_SelectValue, { placeholder: "Select month" })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_SelectContent, { class: "max-h-[200px]" }, {
                                            default: withCtx(() => [
                                              (openBlock(true), createBlock(Fragment, null, renderList(unref(createYear)({ dateObj: date }), (month) => {
                                                return openBlock(), createBlock(_component_SelectItem, {
                                                  key: month.toString(),
                                                  value: month.month.toString()
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(unref(formatter).custom(unref(toDate)(month), { month: "long" })), 1)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["value"]);
                                              }), 128))
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1032, ["default-value", "onUpdate:modelValue"]),
                                      createVNode(_component_Select, {
                                        "default-value": unref(placeholder).year.toString(),
                                        "onUpdate:modelValue": (v) => {
                                          var _a;
                                          if (!v || !unref(placeholder)) return;
                                          if (Number(v) === ((_a = unref(placeholder)) == null ? void 0 : _a.year)) return;
                                          placeholder.value = unref(placeholder).set({
                                            year: Number(v)
                                          });
                                        }
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_SelectTrigger, {
                                            "aria-label": "Select year",
                                            class: "w-[40%]"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_component_SelectValue, { placeholder: "Select year" })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_SelectContent, { class: "max-h-[200px]" }, {
                                            default: withCtx(() => [
                                              (openBlock(true), createBlock(Fragment, null, renderList(unref(createDecade)({ dateObj: date, startIndex: -50, endIndex: 50 }), (yearValue) => {
                                                return openBlock(), createBlock(_component_SelectItem, {
                                                  key: yearValue.toString(),
                                                  value: yearValue.year.toString()
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(yearValue.year), 1)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["value"]);
                                              }), 128))
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1032, ["default-value", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_CalendarHeading, { class: "flex w-full items-center justify-between gap-2" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_Select, {
                                      "default-value": unref(placeholder).month.toString(),
                                      "onUpdate:modelValue": (v) => {
                                        var _a;
                                        if (!v || !unref(placeholder)) return;
                                        if (Number(v) === ((_a = unref(placeholder)) == null ? void 0 : _a.month)) return;
                                        placeholder.value = unref(placeholder).set({
                                          month: Number(v)
                                        });
                                      }
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_SelectTrigger, {
                                          "aria-label": "Select month",
                                          class: "w-[60%]"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_SelectValue, { placeholder: "Select month" })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_SelectContent, { class: "max-h-[200px]" }, {
                                          default: withCtx(() => [
                                            (openBlock(true), createBlock(Fragment, null, renderList(unref(createYear)({ dateObj: date }), (month) => {
                                              return openBlock(), createBlock(_component_SelectItem, {
                                                key: month.toString(),
                                                value: month.month.toString()
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(unref(formatter).custom(unref(toDate)(month), { month: "long" })), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["value"]);
                                            }), 128))
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1032, ["default-value", "onUpdate:modelValue"]),
                                    createVNode(_component_Select, {
                                      "default-value": unref(placeholder).year.toString(),
                                      "onUpdate:modelValue": (v) => {
                                        var _a;
                                        if (!v || !unref(placeholder)) return;
                                        if (Number(v) === ((_a = unref(placeholder)) == null ? void 0 : _a.year)) return;
                                        placeholder.value = unref(placeholder).set({
                                          year: Number(v)
                                        });
                                      }
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_SelectTrigger, {
                                          "aria-label": "Select year",
                                          class: "w-[40%]"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_SelectValue, { placeholder: "Select year" })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_SelectContent, { class: "max-h-[200px]" }, {
                                          default: withCtx(() => [
                                            (openBlock(true), createBlock(Fragment, null, renderList(unref(createDecade)({ dateObj: date, startIndex: -50, endIndex: 50 }), (yearValue) => {
                                              return openBlock(), createBlock(_component_SelectItem, {
                                                key: yearValue.toString(),
                                                value: yearValue.year.toString()
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(yearValue.year), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["value"]);
                                            }), 128))
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1032, ["default-value", "onUpdate:modelValue"])
                                  ]),
                                  _: 2
                                }, 1024)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(`<div class="flex flex-col space-y-4 pt-4 sm:flex-row sm:gap-x-4 sm:gap-y-0"${_scopeId3}><!--[-->`);
                        ssrRenderList(grid, (month) => {
                          _push4(ssrRenderComponent(_component_CalendarGrid, {
                            key: month.value.toString()
                          }, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_CalendarGridHead, null, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_CalendarGridRow, null, {
                                        default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`<!--[-->`);
                                            ssrRenderList(weekDays, (day) => {
                                              _push7(ssrRenderComponent(_component_CalendarHeadCell, { key: day }, {
                                                default: withCtx((_6, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`${ssrInterpolate(day)}`);
                                                  } else {
                                                    return [
                                                      createTextVNode(toDisplayString(day), 1)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            });
                                            _push7(`<!--]-->`);
                                          } else {
                                            return [
                                              (openBlock(true), createBlock(Fragment, null, renderList(weekDays, (day) => {
                                                return openBlock(), createBlock(_component_CalendarHeadCell, { key: day }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(day), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024);
                                              }), 128))
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_CalendarGridRow, null, {
                                          default: withCtx(() => [
                                            (openBlock(true), createBlock(Fragment, null, renderList(weekDays, (day) => {
                                              return openBlock(), createBlock(_component_CalendarHeadCell, { key: day }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(day), 1)
                                                ]),
                                                _: 2
                                              }, 1024);
                                            }), 128))
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(_component_CalendarGridBody, { class: "grid" }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<!--[-->`);
                                      ssrRenderList(month.rows, (weekDates, index) => {
                                        _push6(ssrRenderComponent(_component_CalendarGridRow, {
                                          key: `weekDate-${index}`,
                                          class: "mt-2 w-full"
                                        }, {
                                          default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`<!--[-->`);
                                              ssrRenderList(weekDates, (weekDate) => {
                                                _push7(ssrRenderComponent(_component_CalendarCell, {
                                                  key: weekDate.toString(),
                                                  date: weekDate
                                                }, {
                                                  default: withCtx((_6, _push8, _parent8, _scopeId7) => {
                                                    if (_push8) {
                                                      _push8(ssrRenderComponent(_component_CalendarCellTrigger, {
                                                        day: weekDate,
                                                        month: month.value
                                                      }, null, _parent8, _scopeId7));
                                                    } else {
                                                      return [
                                                        createVNode(_component_CalendarCellTrigger, {
                                                          day: weekDate,
                                                          month: month.value
                                                        }, null, 8, ["day", "month"])
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent7, _scopeId6));
                                              });
                                              _push7(`<!--]-->`);
                                            } else {
                                              return [
                                                (openBlock(true), createBlock(Fragment, null, renderList(weekDates, (weekDate) => {
                                                  return openBlock(), createBlock(_component_CalendarCell, {
                                                    key: weekDate.toString(),
                                                    date: weekDate
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_CalendarCellTrigger, {
                                                        day: weekDate,
                                                        month: month.value
                                                      }, null, 8, ["day", "month"])
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["date"]);
                                                }), 128))
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      });
                                      _push6(`<!--]-->`);
                                    } else {
                                      return [
                                        (openBlock(true), createBlock(Fragment, null, renderList(month.rows, (weekDates, index) => {
                                          return openBlock(), createBlock(_component_CalendarGridRow, {
                                            key: `weekDate-${index}`,
                                            class: "mt-2 w-full"
                                          }, {
                                            default: withCtx(() => [
                                              (openBlock(true), createBlock(Fragment, null, renderList(weekDates, (weekDate) => {
                                                return openBlock(), createBlock(_component_CalendarCell, {
                                                  key: weekDate.toString(),
                                                  date: weekDate
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_CalendarCellTrigger, {
                                                      day: weekDate,
                                                      month: month.value
                                                    }, null, 8, ["day", "month"])
                                                  ]),
                                                  _: 2
                                                }, 1032, ["date"]);
                                              }), 128))
                                            ]),
                                            _: 2
                                          }, 1024);
                                        }), 128))
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_CalendarGridHead, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_CalendarGridRow, null, {
                                        default: withCtx(() => [
                                          (openBlock(true), createBlock(Fragment, null, renderList(weekDays, (day) => {
                                            return openBlock(), createBlock(_component_CalendarHeadCell, { key: day }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(day), 1)
                                              ]),
                                              _: 2
                                            }, 1024);
                                          }), 128))
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_CalendarGridBody, { class: "grid" }, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(month.rows, (weekDates, index) => {
                                        return openBlock(), createBlock(_component_CalendarGridRow, {
                                          key: `weekDate-${index}`,
                                          class: "mt-2 w-full"
                                        }, {
                                          default: withCtx(() => [
                                            (openBlock(true), createBlock(Fragment, null, renderList(weekDates, (weekDate) => {
                                              return openBlock(), createBlock(_component_CalendarCell, {
                                                key: weekDate.toString(),
                                                date: weekDate
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_CalendarCellTrigger, {
                                                    day: weekDate,
                                                    month: month.value
                                                  }, null, 8, ["day", "month"])
                                                ]),
                                                _: 2
                                              }, 1032, ["date"]);
                                            }), 128))
                                          ]),
                                          _: 2
                                        }, 1024);
                                      }), 128))
                                    ]),
                                    _: 2
                                  }, 1024)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]--></div>`);
                      } else {
                        return [
                          createVNode(_component_CalendarHeader, null, {
                            default: withCtx(() => [
                              createVNode(_component_CalendarHeading, { class: "flex w-full items-center justify-between gap-2" }, {
                                default: withCtx(() => [
                                  createVNode(_component_Select, {
                                    "default-value": unref(placeholder).month.toString(),
                                    "onUpdate:modelValue": (v) => {
                                      var _a;
                                      if (!v || !unref(placeholder)) return;
                                      if (Number(v) === ((_a = unref(placeholder)) == null ? void 0 : _a.month)) return;
                                      placeholder.value = unref(placeholder).set({
                                        month: Number(v)
                                      });
                                    }
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_SelectTrigger, {
                                        "aria-label": "Select month",
                                        class: "w-[60%]"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_SelectValue, { placeholder: "Select month" })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_SelectContent, { class: "max-h-[200px]" }, {
                                        default: withCtx(() => [
                                          (openBlock(true), createBlock(Fragment, null, renderList(unref(createYear)({ dateObj: date }), (month) => {
                                            return openBlock(), createBlock(_component_SelectItem, {
                                              key: month.toString(),
                                              value: month.month.toString()
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(unref(formatter).custom(unref(toDate)(month), { month: "long" })), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["value"]);
                                          }), 128))
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1032, ["default-value", "onUpdate:modelValue"]),
                                  createVNode(_component_Select, {
                                    "default-value": unref(placeholder).year.toString(),
                                    "onUpdate:modelValue": (v) => {
                                      var _a;
                                      if (!v || !unref(placeholder)) return;
                                      if (Number(v) === ((_a = unref(placeholder)) == null ? void 0 : _a.year)) return;
                                      placeholder.value = unref(placeholder).set({
                                        year: Number(v)
                                      });
                                    }
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_SelectTrigger, {
                                        "aria-label": "Select year",
                                        class: "w-[40%]"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_SelectValue, { placeholder: "Select year" })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_SelectContent, { class: "max-h-[200px]" }, {
                                        default: withCtx(() => [
                                          (openBlock(true), createBlock(Fragment, null, renderList(unref(createDecade)({ dateObj: date, startIndex: -50, endIndex: 50 }), (yearValue) => {
                                            return openBlock(), createBlock(_component_SelectItem, {
                                              key: yearValue.toString(),
                                              value: yearValue.year.toString()
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(yearValue.year), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["value"]);
                                          }), 128))
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1032, ["default-value", "onUpdate:modelValue"])
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode("div", { class: "flex flex-col space-y-4 pt-4 sm:flex-row sm:gap-x-4 sm:gap-y-0" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(grid, (month) => {
                              return openBlock(), createBlock(_component_CalendarGrid, {
                                key: month.value.toString()
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_CalendarGridHead, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_CalendarGridRow, null, {
                                        default: withCtx(() => [
                                          (openBlock(true), createBlock(Fragment, null, renderList(weekDays, (day) => {
                                            return openBlock(), createBlock(_component_CalendarHeadCell, { key: day }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(day), 1)
                                              ]),
                                              _: 2
                                            }, 1024);
                                          }), 128))
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_CalendarGridBody, { class: "grid" }, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(month.rows, (weekDates, index) => {
                                        return openBlock(), createBlock(_component_CalendarGridRow, {
                                          key: `weekDate-${index}`,
                                          class: "mt-2 w-full"
                                        }, {
                                          default: withCtx(() => [
                                            (openBlock(true), createBlock(Fragment, null, renderList(weekDates, (weekDate) => {
                                              return openBlock(), createBlock(_component_CalendarCell, {
                                                key: weekDate.toString(),
                                                date: weekDate
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_CalendarCellTrigger, {
                                                    day: weekDate,
                                                    month: month.value
                                                  }, null, 8, ["day", "month"])
                                                ]),
                                                _: 2
                                              }, 1032, ["date"]);
                                            }), 128))
                                          ]),
                                          _: 2
                                        }, 1024);
                                      }), 128))
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024);
                            }), 128))
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(CalendarRoot), mergeProps({
                      placeholder: unref(placeholder),
                      "onUpdate:placeholder": ($event) => isRef(placeholder) ? placeholder.value = $event : null
                    }, unref(forwarded), {
                      class: unref(cn)("rounded-md border p-3", props.class)
                    }), {
                      default: withCtx(({ date, grid, weekDays }) => [
                        createVNode(_component_CalendarHeader, null, {
                          default: withCtx(() => [
                            createVNode(_component_CalendarHeading, { class: "flex w-full items-center justify-between gap-2" }, {
                              default: withCtx(() => [
                                createVNode(_component_Select, {
                                  "default-value": unref(placeholder).month.toString(),
                                  "onUpdate:modelValue": (v) => {
                                    var _a;
                                    if (!v || !unref(placeholder)) return;
                                    if (Number(v) === ((_a = unref(placeholder)) == null ? void 0 : _a.month)) return;
                                    placeholder.value = unref(placeholder).set({
                                      month: Number(v)
                                    });
                                  }
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_SelectTrigger, {
                                      "aria-label": "Select month",
                                      class: "w-[60%]"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_SelectValue, { placeholder: "Select month" })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_SelectContent, { class: "max-h-[200px]" }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(unref(createYear)({ dateObj: date }), (month) => {
                                          return openBlock(), createBlock(_component_SelectItem, {
                                            key: month.toString(),
                                            value: month.month.toString()
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(unref(formatter).custom(unref(toDate)(month), { month: "long" })), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["value"]);
                                        }), 128))
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1032, ["default-value", "onUpdate:modelValue"]),
                                createVNode(_component_Select, {
                                  "default-value": unref(placeholder).year.toString(),
                                  "onUpdate:modelValue": (v) => {
                                    var _a;
                                    if (!v || !unref(placeholder)) return;
                                    if (Number(v) === ((_a = unref(placeholder)) == null ? void 0 : _a.year)) return;
                                    placeholder.value = unref(placeholder).set({
                                      year: Number(v)
                                    });
                                  }
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_SelectTrigger, {
                                      "aria-label": "Select year",
                                      class: "w-[40%]"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_SelectValue, { placeholder: "Select year" })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_SelectContent, { class: "max-h-[200px]" }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(unref(createDecade)({ dateObj: date, startIndex: -50, endIndex: 50 }), (yearValue) => {
                                          return openBlock(), createBlock(_component_SelectItem, {
                                            key: yearValue.toString(),
                                            value: yearValue.year.toString()
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(yearValue.year), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["value"]);
                                        }), 128))
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1032, ["default-value", "onUpdate:modelValue"])
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode("div", { class: "flex flex-col space-y-4 pt-4 sm:flex-row sm:gap-x-4 sm:gap-y-0" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(grid, (month) => {
                            return openBlock(), createBlock(_component_CalendarGrid, {
                              key: month.value.toString()
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_CalendarGridHead, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_CalendarGridRow, null, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(weekDays, (day) => {
                                          return openBlock(), createBlock(_component_CalendarHeadCell, { key: day }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(day), 1)
                                            ]),
                                            _: 2
                                          }, 1024);
                                        }), 128))
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_CalendarGridBody, { class: "grid" }, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(month.rows, (weekDates, index) => {
                                      return openBlock(), createBlock(_component_CalendarGridRow, {
                                        key: `weekDate-${index}`,
                                        class: "mt-2 w-full"
                                      }, {
                                        default: withCtx(() => [
                                          (openBlock(true), createBlock(Fragment, null, renderList(weekDates, (weekDate) => {
                                            return openBlock(), createBlock(_component_CalendarCell, {
                                              key: weekDate.toString(),
                                              date: weekDate
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_CalendarCellTrigger, {
                                                  day: weekDate,
                                                  month: month.value
                                                }, null, 8, ["day", "month"])
                                              ]),
                                              _: 2
                                            }, 1032, ["date"]);
                                          }), 128))
                                        ]),
                                        _: 2
                                      }, 1024);
                                    }), 128))
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ])
                      ]),
                      _: 2
                    }, 1040, ["placeholder", "onUpdate:placeholder", "class"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_PopoverTrigger, { "as-child": "" }, {
                default: withCtx(() => [
                  createVNode(_component_Button, {
                    variant: "outline",
                    class: unref(cn)("w-full justify-start text-left font-normal h-12", !unref(placeholder) && "text-muted-foreground")
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(placeholder)), 1)
                    ]),
                    _: 1
                  }, 8, ["class"])
                ]),
                _: 1
              }),
              createVNode(_component_PopoverContent, { class: "w-[250px] p-0" }, {
                default: withCtx(() => [
                  createVNode(unref(CalendarRoot), mergeProps({
                    placeholder: unref(placeholder),
                    "onUpdate:placeholder": ($event) => isRef(placeholder) ? placeholder.value = $event : null
                  }, unref(forwarded), {
                    class: unref(cn)("rounded-md border p-3", props.class)
                  }), {
                    default: withCtx(({ date, grid, weekDays }) => [
                      createVNode(_component_CalendarHeader, null, {
                        default: withCtx(() => [
                          createVNode(_component_CalendarHeading, { class: "flex w-full items-center justify-between gap-2" }, {
                            default: withCtx(() => [
                              createVNode(_component_Select, {
                                "default-value": unref(placeholder).month.toString(),
                                "onUpdate:modelValue": (v) => {
                                  var _a;
                                  if (!v || !unref(placeholder)) return;
                                  if (Number(v) === ((_a = unref(placeholder)) == null ? void 0 : _a.month)) return;
                                  placeholder.value = unref(placeholder).set({
                                    month: Number(v)
                                  });
                                }
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_SelectTrigger, {
                                    "aria-label": "Select month",
                                    class: "w-[60%]"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_SelectValue, { placeholder: "Select month" })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_SelectContent, { class: "max-h-[200px]" }, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(unref(createYear)({ dateObj: date }), (month) => {
                                        return openBlock(), createBlock(_component_SelectItem, {
                                          key: month.toString(),
                                          value: month.month.toString()
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(unref(formatter).custom(unref(toDate)(month), { month: "long" })), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["value"]);
                                      }), 128))
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1032, ["default-value", "onUpdate:modelValue"]),
                              createVNode(_component_Select, {
                                "default-value": unref(placeholder).year.toString(),
                                "onUpdate:modelValue": (v) => {
                                  var _a;
                                  if (!v || !unref(placeholder)) return;
                                  if (Number(v) === ((_a = unref(placeholder)) == null ? void 0 : _a.year)) return;
                                  placeholder.value = unref(placeholder).set({
                                    year: Number(v)
                                  });
                                }
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_SelectTrigger, {
                                    "aria-label": "Select year",
                                    class: "w-[40%]"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_SelectValue, { placeholder: "Select year" })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_SelectContent, { class: "max-h-[200px]" }, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(unref(createDecade)({ dateObj: date, startIndex: -50, endIndex: 50 }), (yearValue) => {
                                        return openBlock(), createBlock(_component_SelectItem, {
                                          key: yearValue.toString(),
                                          value: yearValue.year.toString()
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(yearValue.year), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["value"]);
                                      }), 128))
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1032, ["default-value", "onUpdate:modelValue"])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024),
                      createVNode("div", { class: "flex flex-col space-y-4 pt-4 sm:flex-row sm:gap-x-4 sm:gap-y-0" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(grid, (month) => {
                          return openBlock(), createBlock(_component_CalendarGrid, {
                            key: month.value.toString()
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_CalendarGridHead, null, {
                                default: withCtx(() => [
                                  createVNode(_component_CalendarGridRow, null, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(weekDays, (day) => {
                                        return openBlock(), createBlock(_component_CalendarHeadCell, { key: day }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(day), 1)
                                          ]),
                                          _: 2
                                        }, 1024);
                                      }), 128))
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(_component_CalendarGridBody, { class: "grid" }, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(month.rows, (weekDates, index) => {
                                    return openBlock(), createBlock(_component_CalendarGridRow, {
                                      key: `weekDate-${index}`,
                                      class: "mt-2 w-full"
                                    }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(weekDates, (weekDate) => {
                                          return openBlock(), createBlock(_component_CalendarCell, {
                                            key: weekDate.toString(),
                                            date: weekDate
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_component_CalendarCellTrigger, {
                                                day: weekDate,
                                                month: month.value
                                              }, null, 8, ["day", "month"])
                                            ]),
                                            _: 2
                                          }, 1032, ["date"]);
                                        }), 128))
                                      ]),
                                      _: 2
                                    }, 1024);
                                  }), 128))
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024);
                        }), 128))
                      ])
                    ]),
                    _: 2
                  }, 1040, ["placeholder", "onUpdate:placeholder", "class"])
                ]),
                _: 2
              }, 1024)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DatePicker.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=DatePicker-BUMac20k.mjs.map
