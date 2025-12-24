import { defineComponent, ref, unref, withCtx, createVNode, createTextVNode, toDisplayString, mergeProps, createBlock, openBlock, renderSlot, watch, isRef, Fragment, renderList, createCommentVNode, shallowRef, computed, useTemplateRef, h as h$1, getCurrentInstance, watchEffect, nextTick, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderSlot, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { useForwardPropsEmits, TabsRoot, TabsList, useForwardProps, TabsTrigger, TabsContent } from 'reka-ui';
import { c as cn } from './helpers-H80jjgLf.mjs';
import { r as reactiveOmit, w as watchDebounced } from './index-3vNTMeQu.mjs';
import { b as useRoute, u as useEventStore, n as navigateTo, a as useAxios, s as showImage, f as __nuxt_component_11, g as getGPXFile, m as paymentStatus, o as paymentMethods, h as stageSchema, q as sponsorSchema, p as paymentTypes, l as stageCategoryPaymentSchema, j as stageCategorySchema, k as checkpointSchema } from './server.mjs';
import { RefreshCwIcon, MoveLeftIcon, SaveIcon, LoaderIcon, MapIcon, PlusIcon, TrashIcon, PencilIcon, CommandIcon, XIcon, Trash2Icon, BoldIcon, ItalicIcon, UnderlineIcon, StrikethroughIcon, RotateCcwIcon, WrapTextIcon, Heading1Icon, Heading2Icon, Heading3Icon, Heading4Icon, Heading5Icon, Heading6Icon, ListIcon, ListOrderedIcon, QuoteIcon, MinusIcon, UndoIcon, RedoIcon, LoaderCircleIcon, EllipsisVerticalIcon } from 'lucide-vue-next';
import { f as formatDate } from './humanize-Dt8EJGgI.mjs';
import moment from 'moment';
import { u as useAuthorization } from './authorization-DPJpR6G0.mjs';
import { _ as _sfc_main$t } from './Button-bc6lCA4h.mjs';
import { Plugin, PluginKey, Selection, TextSelection, NodeSelection, AllSelection } from '@tiptap/pm/state';
import { RemoveMarkStep, findWrapping, canJoin, Transform, liftTarget, joinPoint, canSplit, ReplaceStep, ReplaceAroundStep } from '@tiptap/pm/transform';
import { Fragment as Fragment$1, Slice, Node, Schema, DOMParser } from '@tiptap/pm/model';
import { createParagraphNear as createParagraphNear$1, deleteSelection as deleteSelection$1, exitCode as exitCode$1, joinUp as joinUp$1, joinDown as joinDown$1, joinBackward as joinBackward$1, joinForward as joinForward$1, joinTextblockBackward as joinTextblockBackward$1, joinTextblockForward as joinTextblockForward$1, lift as lift$1, liftEmptyBlock as liftEmptyBlock$1, newlineInCode as newlineInCode$1, selectNodeBackward as selectNodeBackward$1, selectNodeForward as selectNodeForward$1, selectParentNode as selectParentNode$1, selectTextblockEnd as selectTextblockEnd$1, selectTextblockStart as selectTextblockStart$1, setBlockType, wrapIn as wrapIn$1 } from '@tiptap/pm/commands';
import { liftListItem as liftListItem$1, sinkListItem as sinkListItem$1, wrapInList as wrapInList$1 } from '@tiptap/pm/schema-list';
import { _ as _sfc_main$4$1, a as _sfc_main$2$1, b as _sfc_main$v, c as _sfc_main$1$1 } from './DialogTitle-CfBb7Gc3.mjs';
import { _ as _sfc_main$u } from './DialogHeader-DOkqwiOU.mjs';
import { _ as _sfc_main$w } from './index-Bv9pTvYc.mjs';
import { _ as _sfc_main$A } from './Input-Cs6c7Uzm.mjs';
import { _ as _sfc_main$B } from './Label-CxpqotiU.mjs';
import { _ as _sfc_main$C } from './Textarea-myQCGZz3.mjs';
import { Form, ErrorMessage, Field } from 'vee-validate';
import { defineStore, storeToRefs } from 'pinia';
import { _ as _sfc_main$G } from './DatePicker-BTvxZIGA.mjs';
import { _ as _sfc_main$6$1, a as _sfc_main$1$2, b as _sfc_main$x, c as _sfc_main$5$1, d as _sfc_main$4$2 } from './SelectValue-B_oh3C4o.mjs';
import { _ as _sfc_main$H } from './DialogTrigger-BuJs-6UL.mjs';
import { _ as _sfc_main$F } from './Checkbox-BM2RqMe1.mjs';
import { cva } from 'class-variance-authority';
import { _ as _sfc_main$5$2, a as _sfc_main$y, b as _sfc_main$2$2, c as _sfc_main$1$3, d as _sfc_main$4$3, e as _sfc_main$3$1 } from './TableHeader-DWcwUMYW.mjs';
import { useRoute as useRoute$1 } from 'vue-router';
import { o as onKeyStroke } from './index-f52njE13.mjs';
import { _ as _sfc_main$3$2, a as _sfc_main$D, b as _sfc_main$2$4, c as _sfc_main$1$5 } from './DropdownMenuTrigger-B63K8GtA.mjs';
import { _ as _sfc_main$1$6, a as _sfc_main$E } from './DropdownMenuSeparator-jSfK3hNb.mjs';
import { c as cn$1 } from './utils-H80jjgLf.mjs';
import { _ as _sfc_main$2$3, a as _sfc_main$z, b as _sfc_main$1$4 } from './AvatarImage-CsUGQSsq.mjs';
import { u as useHead } from './v3-gCezraLe.mjs';
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
import 'deep-pick-omit';
import 'yup';
import 'axios';
import 'vue-sonner';
import './index-Dniqw3Np.mjs';
import '@internationalized/date';
import 'reka-ui/date';

const _sfc_main$s = /* @__PURE__ */ defineComponent({
  __name: "Tabs",
  __ssrInlineRender: true,
  props: {
    defaultValue: {},
    orientation: {},
    dir: {},
    activationMode: {},
    modelValue: {},
    unmountOnHide: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TabsRoot), mergeProps({ "data-slot": "tabs" }, unref(forwarded), {
        class: unref(cn)("flex flex-col gap-2", props.class)
      }, _attrs), {
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
const _sfc_setup$s = _sfc_main$s.setup;
_sfc_main$s.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/tabs/Tabs.vue");
  return _sfc_setup$s ? _sfc_setup$s(props, ctx) : void 0;
};
const _sfc_main$r = /* @__PURE__ */ defineComponent({
  __name: "TabsContent",
  __ssrInlineRender: true,
  props: {
    value: {},
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TabsContent), mergeProps({
        "data-slot": "tabs-content",
        class: unref(cn)("flex-1 outline-none", props.class)
      }, unref(delegatedProps), _attrs), {
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
const _sfc_setup$r = _sfc_main$r.setup;
_sfc_main$r.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/tabs/TabsContent.vue");
  return _sfc_setup$r ? _sfc_setup$r(props, ctx) : void 0;
};
const _sfc_main$q = /* @__PURE__ */ defineComponent({
  __name: "TabsList",
  __ssrInlineRender: true,
  props: {
    loop: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TabsList), mergeProps({ "data-slot": "tabs-list" }, unref(delegatedProps), {
        class: unref(cn)(
          "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
          props.class
        )
      }, _attrs), {
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
const _sfc_setup$q = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/tabs/TabsList.vue");
  return _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};
const _sfc_main$p = /* @__PURE__ */ defineComponent({
  __name: "TabsTrigger",
  __ssrInlineRender: true,
  props: {
    value: {},
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TabsTrigger), mergeProps({ "data-slot": "tabs-trigger" }, unref(forwardedProps), {
        class: unref(cn)(
          `data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,
          props.class
        )
      }, _attrs), {
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
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/tabs/TabsTrigger.vue");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
const _sfc_main$o = /* @__PURE__ */ defineComponent({
  __name: "imageUpload",
  __ssrInlineRender: true,
  props: {
    trailRace: {}
  },
  emits: ["update"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const { axios } = useAxios();
    const emit = __emit;
    const { can } = useAuthorization();
    const imageToUpload = ref("");
    const editImage = ref(false);
    const saving = ref(false);
    const saveImage = async () => {
      saving.value = true;
      await axios.put(`/events/${props.trailRace.id}/upload_thumbnail`, {
        image: imageToUpload.value
      });
      saving.value = false;
      editImage.value = true;
      emit("update");
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_Button = _sfc_main$t;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-accent aspect-[1030/350] -mt-12 -mx-12 relative z-10" }, _attrs))}>`);
      if (__props.trailRace.image_id != null && (!unref(editImage) || !unref(can)("event_edit"))) {
        _push(`<figure class=""><img${ssrRenderAttr("src", unref(showImage)((_b = (_a = __props.trailRace) == null ? void 0 : _a.thumbnail) == null ? void 0 : _b.file_name))}${ssrRenderAttr("alt", __props.trailRace.name)} class="w-full h-full object-cover absolute top-0 left-0 z-0"></figure>`);
      } else {
        _push(`<label class="bg-gray-100 hover:bg-gray-200 h-full flex justify-center items-center cursor-pointer transition-colors overflow-hidden"${ssrRenderAttr("diabled", unref(saving))}><input type="file" class="hidden"${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""} accept=".jpg, .jpeg, .png">`);
        if (unref(imageToUpload)) {
          _push(`<img${ssrRenderAttr("src", unref(imageToUpload))} alt="Trail race preview image" class="w-full h-full object-cover absolute top-0 left-0 z-0">`);
        } else {
          _push(`<span class="relative">Upload image</span>`);
        }
        _push(`</label>`);
      }
      _push(`<div class="absolute top-2 right-2">`);
      if (__props.trailRace.image_id != null && !unref(editImage)) {
        _push(ssrRenderComponent(_component_Button, {
          onClick: ($event) => editImage.value = true,
          permissions: "event_edit"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Edit image`);
            } else {
              return [
                createTextVNode("Edit image")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(editImage) && unref(imageToUpload)) {
        _push(ssrRenderComponent(_component_Button, {
          variant: "secondary",
          size: "sm",
          onClick: saveImage,
          disabled: unref(saving),
          permissions: "event_edit"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (!unref(saving)) {
                _push2(ssrRenderComponent(unref(SaveIcon), null, null, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(unref(LoaderIcon), { class: "animate-spin relative" }, null, _parent2, _scopeId));
              }
              _push2(` Save `);
            } else {
              return [
                !unref(saving) ? (openBlock(), createBlock(unref(SaveIcon), { key: 0 })) : (openBlock(), createBlock(unref(LoaderIcon), {
                  key: 1,
                  class: "animate-spin relative"
                })),
                createTextVNode(" Save ")
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
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/dashboard/event/imageUpload.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
defineComponent({
  name: "BubbleMenu",
  props: {
    pluginKey: {
      type: [String, Object],
      default: "bubbleMenu"
    },
    editor: {
      type: Object,
      required: true
    },
    updateDelay: {
      type: Number,
      default: void 0
    },
    tippyOptions: {
      type: Object,
      default: () => ({})
    },
    shouldShow: {
      type: Function,
      default: null
    }
  },
  setup(props, { slots }) {
    const root = ref(null);
    return () => {
      var _a;
      return h$1("div", { ref: root }, (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots));
    };
  }
});
const EditorContent = defineComponent({
  name: "EditorContent",
  props: {
    editor: {
      default: null,
      type: Object
    }
  },
  setup(props) {
    const rootEl = ref();
    const instance = getCurrentInstance();
    watchEffect(() => {
      const editor = props.editor;
      if (editor && editor.options.element && rootEl.value) {
        nextTick(() => {
          if (!rootEl.value || !editor.options.element.firstChild) {
            return;
          }
          const element = unref(rootEl.value);
          rootEl.value.append(...editor.options.element.childNodes);
          editor.contentComponent = instance.ctx._;
          if (instance) {
            editor.appContext = {
              ...instance.appContext,
              // Vue internally uses prototype chain to forward/shadow injects across the entire component chain
              // so don't use object spread operator or 'Object.assign' and just set `provides` as is on editor's appContext
              // @ts-expect-error forward instance's 'provides' into appContext
              provides: instance.provides
            };
          }
          editor.setOptions({
            element
          });
          editor.createNodeViews();
        });
      }
    });
    return { rootEl };
  },
  render() {
    return h$1("div", {
      ref: (el) => {
        this.rootEl = el;
      }
    });
  }
});
defineComponent({
  name: "FloatingMenu",
  props: {
    pluginKey: {
      // TODO: TypeScript breaks :(
      // type: [String, Object as PropType<Exclude<FloatingMenuPluginProps['pluginKey'], string>>],
      type: null,
      default: "floatingMenu"
    },
    editor: {
      type: Object,
      required: true
    },
    tippyOptions: {
      type: Object,
      default: () => ({})
    },
    shouldShow: {
      type: Function,
      default: null
    }
  },
  setup(props, { slots }) {
    const root = ref(null);
    return () => {
      var _a;
      return h$1("div", { ref: root }, (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots));
    };
  }
});
defineComponent({
  name: "NodeViewContent",
  props: {
    as: {
      type: String,
      default: "div"
    }
  },
  render() {
    return h$1(this.as, {
      style: {
        whiteSpace: "pre-wrap"
      },
      "data-node-view-content": ""
    });
  }
});
defineComponent({
  name: "NodeViewWrapper",
  props: {
    as: {
      type: String,
      default: "div"
    }
  },
  inject: ["onDragStart", "decorationClasses"],
  render() {
    var _a, _b;
    return h$1(this.as, {
      // @ts-ignore
      class: this.decorationClasses,
      style: {
        whiteSpace: "normal"
      },
      "data-node-view-wrapper": "",
      // @ts-ignore (https://github.com/vuejs/vue-next/issues/3031)
      onDragstart: this.onDragStart
    }, (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a));
  }
});
const useEditor = (options = {}) => {
  const editor = shallowRef();
  return editor;
};
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
function createChainableState(config) {
  const { state, transaction } = config;
  let { selection } = transaction;
  let { doc } = transaction;
  let { storedMarks } = transaction;
  return {
    ...state,
    apply: state.apply.bind(state),
    applyTransaction: state.applyTransaction.bind(state),
    plugins: state.plugins,
    schema: state.schema,
    reconfigure: state.reconfigure.bind(state),
    toJSON: state.toJSON.bind(state),
    get storedMarks() {
      return storedMarks;
    },
    get selection() {
      return selection;
    },
    get doc() {
      return doc;
    },
    get tr() {
      selection = transaction.selection;
      doc = transaction.doc;
      storedMarks = transaction.storedMarks;
      return transaction;
    }
  };
}
var CommandManager = class {
  constructor(props) {
    this.editor = props.editor;
    this.rawCommands = this.editor.extensionManager.commands;
    this.customState = props.state;
  }
  get hasCustomState() {
    return !!this.customState;
  }
  get state() {
    return this.customState || this.editor.state;
  }
  get commands() {
    const { rawCommands, editor, state } = this;
    const { view } = editor;
    const { tr } = state;
    const props = this.buildProps(tr);
    return Object.fromEntries(
      Object.entries(rawCommands).map(([name, command2]) => {
        const method = (...args) => {
          const callback = command2(...args)(props);
          if (!tr.getMeta("preventDispatch") && !this.hasCustomState) {
            view.dispatch(tr);
          }
          return callback;
        };
        return [name, method];
      })
    );
  }
  get chain() {
    return () => this.createChain();
  }
  get can() {
    return () => this.createCan();
  }
  createChain(startTr, shouldDispatch = true) {
    const { rawCommands, editor, state } = this;
    const { view } = editor;
    const callbacks = [];
    const hasStartTransaction = !!startTr;
    const tr = startTr || state.tr;
    const run3 = () => {
      if (!hasStartTransaction && shouldDispatch && !tr.getMeta("preventDispatch") && !this.hasCustomState) {
        view.dispatch(tr);
      }
      return callbacks.every((callback) => callback === true);
    };
    const chain = {
      ...Object.fromEntries(
        Object.entries(rawCommands).map(([name, command2]) => {
          const chainedCommand = (...args) => {
            const props = this.buildProps(tr, shouldDispatch);
            const callback = command2(...args)(props);
            callbacks.push(callback);
            return chain;
          };
          return [name, chainedCommand];
        })
      ),
      run: run3
    };
    return chain;
  }
  createCan(startTr) {
    const { rawCommands, state } = this;
    const dispatch = false;
    const tr = startTr || state.tr;
    const props = this.buildProps(tr, dispatch);
    const formattedCommands = Object.fromEntries(
      Object.entries(rawCommands).map(([name, command2]) => {
        return [name, (...args) => command2(...args)({ ...props, dispatch: void 0 })];
      })
    );
    return {
      ...formattedCommands,
      chain: () => this.createChain(tr, dispatch)
    };
  }
  buildProps(tr, shouldDispatch = true) {
    const { rawCommands, editor, state } = this;
    const { view } = editor;
    const props = {
      tr,
      editor,
      view,
      state: createChainableState({
        state,
        transaction: tr
      }),
      dispatch: shouldDispatch ? () => void 0 : void 0,
      chain: () => this.createChain(tr, shouldDispatch),
      can: () => this.createCan(tr),
      get commands() {
        return Object.fromEntries(
          Object.entries(rawCommands).map(([name, command2]) => {
            return [name, (...args) => command2(...args)(props)];
          })
        );
      }
    };
    return props;
  }
};
function combineTransactionSteps(oldDoc, transactions) {
  const transform = new Transform(oldDoc);
  transactions.forEach((transaction) => {
    transaction.steps.forEach((step) => {
      transform.step(step);
    });
  });
  return transform;
}
function elementFromString(value) {
  {
    throw new Error("[tiptap error]: there is no window object available, so this function cannot be used");
  }
}
function createNodeFromContent(content, schema, options) {
  if (content instanceof Node || content instanceof Fragment$1) {
    return content;
  }
  options = {
    slice: true,
    parseOptions: {},
    ...options
  };
  const isJSONContent = typeof content === "object" && content !== null;
  const isTextContent = typeof content === "string";
  if (isJSONContent) {
    try {
      const isArrayContent = Array.isArray(content) && content.length > 0;
      if (isArrayContent) {
        return Fragment$1.fromArray(content.map((item) => schema.nodeFromJSON(item)));
      }
      const node = schema.nodeFromJSON(content);
      if (options.errorOnInvalidContent) {
        node.check();
      }
      return node;
    } catch (error) {
      if (options.errorOnInvalidContent) {
        throw new Error("[tiptap error]: Invalid JSON content", { cause: error });
      }
      console.warn("[tiptap warn]: Invalid content.", "Passed value:", content, "Error:", error);
      return createNodeFromContent("", schema, options);
    }
  }
  if (isTextContent) {
    if (options.errorOnInvalidContent) {
      let hasInvalidContent = false;
      let invalidContent = "";
      const contentCheckSchema = new Schema({
        topNode: schema.spec.topNode,
        marks: schema.spec.marks,
        // Prosemirror's schemas are executed such that: the last to execute, matches last
        // This means that we can add a catch-all node at the end of the schema to catch any content that we don't know how to handle
        nodes: schema.spec.nodes.append({
          __tiptap__private__unknown__catch__all__node: {
            content: "inline*",
            group: "block",
            parseDOM: [
              {
                tag: "*",
                getAttrs: (e) => {
                  hasInvalidContent = true;
                  invalidContent = typeof e === "string" ? e : e.outerHTML;
                  return null;
                }
              }
            ]
          }
        })
      });
      if (options.slice) {
        DOMParser.fromSchema(contentCheckSchema).parseSlice(elementFromString(), options.parseOptions);
      } else {
        DOMParser.fromSchema(contentCheckSchema).parse(elementFromString(), options.parseOptions);
      }
      if (options.errorOnInvalidContent && hasInvalidContent) {
        throw new Error("[tiptap error]: Invalid HTML content", {
          cause: new Error(`Invalid element found: ${invalidContent}`)
        });
      }
    }
    const parser = DOMParser.fromSchema(schema);
    if (options.slice) {
      return parser.parseSlice(elementFromString(), options.parseOptions).content;
    }
    return parser.parse(elementFromString(), options.parseOptions);
  }
  return createNodeFromContent("", schema, options);
}
function createDocument(content, schema, parseOptions = {}, options = {}) {
  return createNodeFromContent(content, schema, {
    slice: false,
    parseOptions,
    errorOnInvalidContent: options.errorOnInvalidContent
  });
}
function defaultBlockAt(match) {
  for (let i = 0; i < match.edgeCount; i += 1) {
    const { type } = match.edge(i);
    if (type.isTextblock && !type.hasRequiredAttrs()) {
      return type;
    }
  }
  return null;
}
function findParentNodeClosestToPos($pos, predicate) {
  for (let i = $pos.depth; i > 0; i -= 1) {
    const node = $pos.node(i);
    if (predicate(node)) {
      return {
        pos: i > 0 ? $pos.before(i) : 0,
        start: $pos.start(i),
        depth: i,
        node
      };
    }
  }
}
function findParentNode(predicate) {
  return (selection) => findParentNodeClosestToPos(selection.$from, predicate);
}
function getExtensionField(extension, field, context) {
  if (extension.config[field] === void 0 && extension.parent) {
    return getExtensionField(extension.parent, field, context);
  }
  if (typeof extension.config[field] === "function") {
    const value = extension.config[field].bind({
      ...context,
      parent: extension.parent ? getExtensionField(extension.parent, field, context) : null
    });
    return value;
  }
  return extension.config[field];
}
function isFunction(value) {
  return typeof value === "function";
}
function callOrReturn(value, context = void 0, ...props) {
  if (isFunction(value)) {
    if (context) {
      return value.bind(context)(...props);
    }
    return value(...props);
  }
  return value;
}
function splitExtensions(extensions) {
  const baseExtensions = extensions.filter((extension) => extension.type === "extension");
  const nodeExtensions = extensions.filter((extension) => extension.type === "node");
  const markExtensions = extensions.filter((extension) => extension.type === "mark");
  return {
    baseExtensions,
    nodeExtensions,
    markExtensions
  };
}
function mergeAttributes(...objects) {
  return objects.filter((item) => !!item).reduce((items, item) => {
    const mergedAttributes = { ...items };
    Object.entries(item).forEach(([key, value]) => {
      const exists = mergedAttributes[key];
      if (!exists) {
        mergedAttributes[key] = value;
        return;
      }
      if (key === "class") {
        const valueClasses = value ? String(value).split(" ") : [];
        const existingClasses = mergedAttributes[key] ? mergedAttributes[key].split(" ") : [];
        const insertClasses = valueClasses.filter((valueClass) => !existingClasses.includes(valueClass));
        mergedAttributes[key] = [...existingClasses, ...insertClasses].join(" ");
      } else if (key === "style") {
        const newStyles = value ? value.split(";").map((style2) => style2.trim()).filter(Boolean) : [];
        const existingStyles = mergedAttributes[key] ? mergedAttributes[key].split(";").map((style2) => style2.trim()).filter(Boolean) : [];
        const styleMap = /* @__PURE__ */ new Map();
        existingStyles.forEach((style2) => {
          const [property, val] = style2.split(":").map((part) => part.trim());
          styleMap.set(property, val);
        });
        newStyles.forEach((style2) => {
          const [property, val] = style2.split(":").map((part) => part.trim());
          styleMap.set(property, val);
        });
        mergedAttributes[key] = Array.from(styleMap.entries()).map(([property, val]) => `${property}: ${val}`).join("; ");
      } else {
        mergedAttributes[key] = value;
      }
    });
    return mergedAttributes;
  }, {});
}
function getTextBetween(startNode, range, options) {
  const { from, to } = range;
  const { blockSeparator = "\n\n", textSerializers = {} } = options || {};
  let text = "";
  startNode.nodesBetween(from, to, (node, pos, parent, index) => {
    var _a;
    if (node.isBlock && pos > from) {
      text += blockSeparator;
    }
    const textSerializer = textSerializers == null ? void 0 : textSerializers[node.type.name];
    if (textSerializer) {
      if (parent) {
        text += textSerializer({
          node,
          pos,
          parent,
          index,
          range
        });
      }
      return false;
    }
    if (node.isText) {
      text += (_a = node == null ? void 0 : node.text) == null ? void 0 : _a.slice(Math.max(from, pos) - pos, to - pos);
    }
  });
  return text;
}
function getTextSerializersFromSchema(schema) {
  return Object.fromEntries(
    Object.entries(schema.nodes).filter(([, node]) => node.spec.toText).map(([name, node]) => [name, node.spec.toText])
  );
}
function getMarkType(nameOrType, schema) {
  if (typeof nameOrType === "string") {
    if (!schema.marks[nameOrType]) {
      throw Error(`There is no mark type named '${nameOrType}'. Maybe you forgot to add the extension?`);
    }
    return schema.marks[nameOrType];
  }
  return nameOrType;
}
function getMarkAttributes(state, typeOrName) {
  const type = getMarkType(typeOrName, state.schema);
  const { from, to, empty } = state.selection;
  const marks = [];
  if (empty) {
    if (state.storedMarks) {
      marks.push(...state.storedMarks);
    }
    marks.push(...state.selection.$head.marks());
  } else {
    state.doc.nodesBetween(from, to, (node) => {
      marks.push(...node.marks);
    });
  }
  const mark = marks.find((markItem) => markItem.type.name === type.name);
  if (!mark) {
    return {};
  }
  return { ...mark.attrs };
}
function getNodeType(nameOrType, schema) {
  if (typeof nameOrType === "string") {
    if (!schema.nodes[nameOrType]) {
      throw Error(`There is no node type named '${nameOrType}'. Maybe you forgot to add the extension?`);
    }
    return schema.nodes[nameOrType];
  }
  return nameOrType;
}
function getSchemaTypeNameByName(name, schema) {
  if (schema.nodes[name]) {
    return "node";
  }
  if (schema.marks[name]) {
    return "mark";
  }
  return null;
}
function removeDuplicates(array, by = JSON.stringify) {
  const seen = {};
  return array.filter((item) => {
    const key = by(item);
    return Object.prototype.hasOwnProperty.call(seen, key) ? false : seen[key] = true;
  });
}
function simplifyChangedRanges(changes) {
  const uniqueChanges = removeDuplicates(changes);
  return uniqueChanges.length === 1 ? uniqueChanges : uniqueChanges.filter((change, index) => {
    const rest = uniqueChanges.filter((_, i) => i !== index);
    return !rest.some((otherChange) => {
      return change.oldRange.from >= otherChange.oldRange.from && change.oldRange.to <= otherChange.oldRange.to && change.newRange.from >= otherChange.newRange.from && change.newRange.to <= otherChange.newRange.to;
    });
  });
}
function getChangedRanges(transform) {
  const { mapping, steps } = transform;
  const changes = [];
  mapping.maps.forEach((stepMap, index) => {
    const ranges = [];
    if (!stepMap.ranges.length) {
      const { from, to } = steps[index];
      if (from === void 0 || to === void 0) {
        return;
      }
      ranges.push({ from, to });
    } else {
      stepMap.forEach((from, to) => {
        ranges.push({ from, to });
      });
    }
    ranges.forEach(({ from, to }) => {
      const newStart = mapping.slice(index).map(from, -1);
      const newEnd = mapping.slice(index).map(to);
      const oldStart = mapping.invert().map(newStart, -1);
      const oldEnd = mapping.invert().map(newEnd);
      changes.push({
        oldRange: {
          from: oldStart,
          to: oldEnd
        },
        newRange: {
          from: newStart,
          to: newEnd
        }
      });
    });
  });
  return simplifyChangedRanges(changes);
}
function isRegExp(value) {
  return Object.prototype.toString.call(value) === "[object RegExp]";
}
function objectIncludes(object1, object2, options = { strict: true }) {
  const keys = Object.keys(object2);
  if (!keys.length) {
    return true;
  }
  return keys.every((key) => {
    if (options.strict) {
      return object2[key] === object1[key];
    }
    if (isRegExp(object2[key])) {
      return object2[key].test(object1[key]);
    }
    return object2[key] === object1[key];
  });
}
function findMarkInSet(marks, type, attributes = {}) {
  return marks.find((item) => {
    return item.type === type && objectIncludes(
      // Only check equality for the attributes that are provided
      Object.fromEntries(Object.keys(attributes).map((k) => [k, item.attrs[k]])),
      attributes
    );
  });
}
function isMarkInSet(marks, type, attributes = {}) {
  return !!findMarkInSet(marks, type, attributes);
}
function getMarkRange($pos, type, attributes) {
  var _a;
  if (!$pos || !type) {
    return;
  }
  let start = $pos.parent.childAfter($pos.parentOffset);
  if (!start.node || !start.node.marks.some((mark2) => mark2.type === type)) {
    start = $pos.parent.childBefore($pos.parentOffset);
  }
  if (!start.node || !start.node.marks.some((mark2) => mark2.type === type)) {
    return;
  }
  attributes = attributes || ((_a = start.node.marks[0]) == null ? void 0 : _a.attrs);
  const mark = findMarkInSet([...start.node.marks], type, attributes);
  if (!mark) {
    return;
  }
  let startIndex = start.index;
  let startPos = $pos.start() + start.offset;
  let endIndex = startIndex + 1;
  let endPos = startPos + start.node.nodeSize;
  while (startIndex > 0 && isMarkInSet([...$pos.parent.child(startIndex - 1).marks], type, attributes)) {
    startIndex -= 1;
    startPos -= $pos.parent.child(startIndex).nodeSize;
  }
  while (endIndex < $pos.parent.childCount && isMarkInSet([...$pos.parent.child(endIndex).marks], type, attributes)) {
    endPos += $pos.parent.child(endIndex).nodeSize;
    endIndex += 1;
  }
  return {
    from: startPos,
    to: endPos
  };
}
function getMarksBetween(from, to, doc) {
  const marks = [];
  if (from === to) {
    doc.resolve(from).marks().forEach((mark) => {
      const $pos = doc.resolve(from);
      const range = getMarkRange($pos, mark.type);
      if (!range) {
        return;
      }
      marks.push({
        mark,
        ...range
      });
    });
  } else {
    doc.nodesBetween(from, to, (node, pos) => {
      if (!node || (node == null ? void 0 : node.nodeSize) === void 0) {
        return;
      }
      marks.push(
        ...node.marks.map((mark) => ({
          from: pos,
          to: pos + node.nodeSize,
          mark
        }))
      );
    });
  }
  return marks;
}
function getSplittedAttributes(extensionAttributes, typeName, attributes) {
  return Object.fromEntries(
    Object.entries(attributes).filter(([name]) => {
      const extensionAttribute = extensionAttributes.find((item) => {
        return item.type === typeName && item.name === name;
      });
      if (!extensionAttribute) {
        return false;
      }
      return extensionAttribute.attribute.keepOnSplit;
    })
  );
}
function isMarkActive(state, typeOrName, attributes = {}) {
  const { empty, ranges } = state.selection;
  const type = typeOrName ? getMarkType(typeOrName, state.schema) : null;
  if (empty) {
    return !!(state.storedMarks || state.selection.$from.marks()).filter((mark) => {
      if (!type) {
        return true;
      }
      return type.name === mark.type.name;
    }).find((mark) => objectIncludes(mark.attrs, attributes, { strict: false }));
  }
  let selectionRange = 0;
  const markRanges = [];
  ranges.forEach(({ $from, $to }) => {
    const from = $from.pos;
    const to = $to.pos;
    state.doc.nodesBetween(from, to, (node, pos) => {
      if (!node.isText && !node.marks.length) {
        return;
      }
      const relativeFrom = Math.max(from, pos);
      const relativeTo = Math.min(to, pos + node.nodeSize);
      const range2 = relativeTo - relativeFrom;
      selectionRange += range2;
      markRanges.push(
        ...node.marks.map((mark) => ({
          mark,
          from: relativeFrom,
          to: relativeTo
        }))
      );
    });
  });
  if (selectionRange === 0) {
    return false;
  }
  const matchedRange = markRanges.filter((markRange) => {
    if (!type) {
      return true;
    }
    return type.name === markRange.mark.type.name;
  }).filter((markRange) => objectIncludes(markRange.mark.attrs, attributes, { strict: false })).reduce((sum, markRange) => sum + markRange.to - markRange.from, 0);
  const excludedRange = markRanges.filter((markRange) => {
    if (!type) {
      return true;
    }
    return markRange.mark.type !== type && markRange.mark.type.excludes(type);
  }).reduce((sum, markRange) => sum + markRange.to - markRange.from, 0);
  const range = matchedRange > 0 ? matchedRange + excludedRange : matchedRange;
  return range >= selectionRange;
}
function isNodeActive(state, typeOrName, attributes = {}) {
  const { from, to, empty } = state.selection;
  const type = typeOrName ? getNodeType(typeOrName, state.schema) : null;
  const nodeRanges = [];
  state.doc.nodesBetween(from, to, (node, pos) => {
    if (node.isText) {
      return;
    }
    const relativeFrom = Math.max(from, pos);
    const relativeTo = Math.min(to, pos + node.nodeSize);
    nodeRanges.push({
      node,
      from: relativeFrom,
      to: relativeTo
    });
  });
  const selectionRange = to - from;
  const matchedNodeRanges = nodeRanges.filter((nodeRange) => {
    if (!type) {
      return true;
    }
    return type.name === nodeRange.node.type.name;
  }).filter((nodeRange) => objectIncludes(nodeRange.node.attrs, attributes, { strict: false }));
  if (empty) {
    return !!matchedNodeRanges.length;
  }
  const range = matchedNodeRanges.reduce((sum, nodeRange) => sum + nodeRange.to - nodeRange.from, 0);
  return range >= selectionRange;
}
function isList(name, extensions) {
  const { nodeExtensions } = splitExtensions(extensions);
  const extension = nodeExtensions.find((item) => item.name === name);
  if (!extension) {
    return false;
  }
  const context = {
    name: extension.name,
    options: extension.options,
    storage: extension.storage
  };
  const group = callOrReturn(getExtensionField(extension, "group", context));
  if (typeof group !== "string") {
    return false;
  }
  return group.split(" ").includes("list");
}
function isNodeEmpty(node, {
  checkChildren = true,
  ignoreWhitespace = false
} = {}) {
  var _a;
  if (ignoreWhitespace) {
    if (node.type.name === "hardBreak") {
      return true;
    }
    if (node.isText) {
      return /^\s*$/m.test((_a = node.text) != null ? _a : "");
    }
  }
  if (node.isText) {
    return !node.text;
  }
  if (node.isAtom || node.isLeaf) {
    return false;
  }
  if (node.content.childCount === 0) {
    return true;
  }
  if (checkChildren) {
    let isContentEmpty = true;
    node.content.forEach((childNode) => {
      if (isContentEmpty === false) {
        return;
      }
      if (!isNodeEmpty(childNode, { ignoreWhitespace, checkChildren })) {
        isContentEmpty = false;
      }
    });
    return isContentEmpty;
  }
  return false;
}
function isNodeSelection(value) {
  return value instanceof NodeSelection;
}
function isTextSelection(value) {
  return value instanceof TextSelection;
}
function minMax(value = 0, min = 0, max = 0) {
  return Math.min(Math.max(value, min), max);
}
function resolveFocusPosition(doc, position = null) {
  if (!position) {
    return null;
  }
  const selectionAtStart = Selection.atStart(doc);
  const selectionAtEnd = Selection.atEnd(doc);
  if (position === "start" || position === true) {
    return selectionAtStart;
  }
  if (position === "end") {
    return selectionAtEnd;
  }
  const minPos = selectionAtStart.from;
  const maxPos = selectionAtEnd.to;
  if (position === "all") {
    return TextSelection.create(doc, minMax(0, minPos, maxPos), minMax(doc.content.size, minPos, maxPos));
  }
  return TextSelection.create(doc, minMax(position, minPos, maxPos), minMax(position, minPos, maxPos));
}
function selectionToInsertionEnd(tr, startLen, bias) {
  const last = tr.steps.length - 1;
  if (last < startLen) {
    return;
  }
  const step = tr.steps[last];
  if (!(step instanceof ReplaceStep || step instanceof ReplaceAroundStep)) {
    return;
  }
  const map = tr.mapping.maps[last];
  let end = 0;
  map.forEach((_from, _to, _newFrom, newTo) => {
    if (end === 0) {
      end = newTo;
    }
  });
  tr.setSelection(Selection.near(tr.doc.resolve(end), bias));
}
var InputRule = class {
  constructor(config) {
    this.find = config.find;
    this.handler = config.handler;
  }
};
function getType(value) {
  return Object.prototype.toString.call(value).slice(8, -1);
}
function isPlainObject(value) {
  if (getType(value) !== "Object") {
    return false;
  }
  return value.constructor === Object && Object.getPrototypeOf(value) === Object.prototype;
}
function mergeDeep(target, source) {
  const output = { ...target };
  if (isPlainObject(target) && isPlainObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isPlainObject(source[key]) && isPlainObject(target[key])) {
        output[key] = mergeDeep(target[key], source[key]);
      } else {
        output[key] = source[key];
      }
    });
  }
  return output;
}
var Extendable = class {
  constructor(config = {}) {
    this.type = "extendable";
    this.parent = null;
    this.child = null;
    this.name = "";
    this.config = {
      name: this.name
    };
    this.config = {
      ...this.config,
      ...config
    };
    this.name = this.config.name;
  }
  get options() {
    return {
      ...callOrReturn(
        getExtensionField(this, "addOptions", {
          name: this.name
        })
      ) || {}
    };
  }
  get storage() {
    return {
      ...callOrReturn(
        getExtensionField(this, "addStorage", {
          name: this.name,
          options: this.options
        })
      ) || {}
    };
  }
  configure(options = {}) {
    const extension = this.extend({
      ...this.config,
      addOptions: () => {
        return mergeDeep(this.options, options);
      }
    });
    extension.name = this.name;
    extension.parent = this.parent;
    return extension;
  }
  extend(extendedConfig = {}) {
    const extension = new this.constructor({ ...this.config, ...extendedConfig });
    extension.parent = this;
    this.child = extension;
    extension.name = "name" in extendedConfig ? extendedConfig.name : extension.parent.name;
    return extension;
  }
};
var Mark = class _Mark extends Extendable {
  constructor() {
    super(...arguments);
    this.type = "mark";
  }
  /**
   * Create a new Mark instance
   * @param config - Mark configuration object or a function that returns a configuration object
   */
  static create(config = {}) {
    const resolvedConfig = typeof config === "function" ? config() : config;
    return new _Mark(resolvedConfig);
  }
  static handleExit({ editor, mark }) {
    const { tr } = editor.state;
    const currentPos = editor.state.selection.$from;
    const isAtEnd = currentPos.pos === currentPos.end();
    if (isAtEnd) {
      const currentMarks = currentPos.marks();
      const isInMark = !!currentMarks.find((m) => (m == null ? void 0 : m.type.name) === mark.name);
      if (!isInMark) {
        return false;
      }
      const removeMark = currentMarks.find((m) => (m == null ? void 0 : m.type.name) === mark.name);
      if (removeMark) {
        tr.removeStoredMark(removeMark);
      }
      tr.insertText(" ", currentPos.pos);
      editor.view.dispatch(tr);
      return true;
    }
    return false;
  }
  configure(options) {
    return super.configure(options);
  }
  extend(extendedConfig) {
    const resolvedConfig = typeof extendedConfig === "function" ? extendedConfig() : extendedConfig;
    return super.extend(resolvedConfig);
  }
};
var PasteRule = class {
  constructor(config) {
    this.find = config.find;
    this.handler = config.handler;
  }
};
var extensions_exports = {};
__export(extensions_exports, {
  ClipboardTextSerializer: () => ClipboardTextSerializer,
  Commands: () => Commands,
  Delete: () => Delete,
  Drop: () => Drop,
  Editable: () => Editable,
  FocusEvents: () => FocusEvents,
  Keymap: () => Keymap,
  Paste: () => Paste,
  Tabindex: () => Tabindex,
  focusEventsPluginKey: () => focusEventsPluginKey
});
var Extension = class _Extension extends Extendable {
  constructor() {
    super(...arguments);
    this.type = "extension";
  }
  /**
   * Create a new Extension instance
   * @param config - Extension configuration object or a function that returns a configuration object
   */
  static create(config = {}) {
    const resolvedConfig = typeof config === "function" ? config() : config;
    return new _Extension(resolvedConfig);
  }
  configure(options) {
    return super.configure(options);
  }
  extend(extendedConfig) {
    const resolvedConfig = typeof extendedConfig === "function" ? extendedConfig() : extendedConfig;
    return super.extend(resolvedConfig);
  }
};
var ClipboardTextSerializer = Extension.create({
  name: "clipboardTextSerializer",
  addOptions() {
    return {
      blockSeparator: void 0
    };
  },
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("clipboardTextSerializer"),
        props: {
          clipboardTextSerializer: () => {
            const { editor } = this;
            const { state, schema } = editor;
            const { doc, selection } = state;
            const { ranges } = selection;
            const from = Math.min(...ranges.map((range2) => range2.$from.pos));
            const to = Math.max(...ranges.map((range2) => range2.$to.pos));
            const textSerializers = getTextSerializersFromSchema(schema);
            const range = { from, to };
            return getTextBetween(doc, range, {
              ...this.options.blockSeparator !== void 0 ? { blockSeparator: this.options.blockSeparator } : {},
              textSerializers
            });
          }
        }
      })
    ];
  }
});
var commands_exports = {};
__export(commands_exports, {
  blur: () => blur,
  clearContent: () => clearContent,
  clearNodes: () => clearNodes,
  command: () => command,
  createParagraphNear: () => createParagraphNear,
  cut: () => cut,
  deleteCurrentNode: () => deleteCurrentNode,
  deleteNode: () => deleteNode,
  deleteRange: () => deleteRange,
  deleteSelection: () => deleteSelection,
  enter: () => enter,
  exitCode: () => exitCode,
  extendMarkRange: () => extendMarkRange,
  first: () => first,
  focus: () => focus,
  forEach: () => forEach,
  insertContent: () => insertContent,
  insertContentAt: () => insertContentAt,
  joinBackward: () => joinBackward,
  joinDown: () => joinDown,
  joinForward: () => joinForward,
  joinItemBackward: () => joinItemBackward,
  joinItemForward: () => joinItemForward,
  joinTextblockBackward: () => joinTextblockBackward,
  joinTextblockForward: () => joinTextblockForward,
  joinUp: () => joinUp,
  keyboardShortcut: () => keyboardShortcut,
  lift: () => lift,
  liftEmptyBlock: () => liftEmptyBlock,
  liftListItem: () => liftListItem,
  newlineInCode: () => newlineInCode,
  resetAttributes: () => resetAttributes,
  scrollIntoView: () => scrollIntoView,
  selectAll: () => selectAll,
  selectNodeBackward: () => selectNodeBackward,
  selectNodeForward: () => selectNodeForward,
  selectParentNode: () => selectParentNode,
  selectTextblockEnd: () => selectTextblockEnd,
  selectTextblockStart: () => selectTextblockStart,
  setContent: () => setContent,
  setMark: () => setMark,
  setMeta: () => setMeta,
  setNode: () => setNode,
  setNodeSelection: () => setNodeSelection,
  setTextSelection: () => setTextSelection,
  sinkListItem: () => sinkListItem,
  splitBlock: () => splitBlock,
  splitListItem: () => splitListItem,
  toggleList: () => toggleList,
  toggleMark: () => toggleMark,
  toggleNode: () => toggleNode,
  toggleWrap: () => toggleWrap,
  undoInputRule: () => undoInputRule,
  unsetAllMarks: () => unsetAllMarks,
  unsetMark: () => unsetMark,
  updateAttributes: () => updateAttributes,
  wrapIn: () => wrapIn,
  wrapInList: () => wrapInList
});
var blur = () => ({ editor, view }) => {
  requestAnimationFrame(() => {
    var _a;
    if (!editor.isDestroyed) {
      view.dom.blur();
      (_a = void 0) == null ? void 0 : _a.removeAllRanges();
    }
  });
  return true;
};
var clearContent = (emitUpdate = true) => ({ commands }) => {
  return commands.setContent("", { emitUpdate });
};
var clearNodes = () => ({ state, tr, dispatch }) => {
  const { selection } = tr;
  const { ranges } = selection;
  if (!dispatch) {
    return true;
  }
  ranges.forEach(({ $from, $to }) => {
    state.doc.nodesBetween($from.pos, $to.pos, (node, pos) => {
      if (node.type.isText) {
        return;
      }
      const { doc, mapping } = tr;
      const $mappedFrom = doc.resolve(mapping.map(pos));
      const $mappedTo = doc.resolve(mapping.map(pos + node.nodeSize));
      const nodeRange = $mappedFrom.blockRange($mappedTo);
      if (!nodeRange) {
        return;
      }
      const targetLiftDepth = liftTarget(nodeRange);
      if (node.type.isTextblock) {
        const { defaultType } = $mappedFrom.parent.contentMatchAt($mappedFrom.index());
        tr.setNodeMarkup(nodeRange.start, defaultType);
      }
      if (targetLiftDepth || targetLiftDepth === 0) {
        tr.lift(nodeRange, targetLiftDepth);
      }
    });
  });
  return true;
};
var command = (fn) => (props) => {
  return fn(props);
};
var createParagraphNear = () => ({ state, dispatch }) => {
  return createParagraphNear$1(state, dispatch);
};
var cut = (originRange, targetPos) => ({ editor, tr }) => {
  const { state } = editor;
  const contentSlice = state.doc.slice(originRange.from, originRange.to);
  tr.deleteRange(originRange.from, originRange.to);
  const newPos = tr.mapping.map(targetPos);
  tr.insert(newPos, contentSlice.content);
  tr.setSelection(new TextSelection(tr.doc.resolve(Math.max(newPos - 1, 0))));
  return true;
};
var deleteCurrentNode = () => ({ tr, dispatch }) => {
  const { selection } = tr;
  const currentNode = selection.$anchor.node();
  if (currentNode.content.size > 0) {
    return false;
  }
  const $pos = tr.selection.$anchor;
  for (let depth = $pos.depth; depth > 0; depth -= 1) {
    const node = $pos.node(depth);
    if (node.type === currentNode.type) {
      if (dispatch) {
        const from = $pos.before(depth);
        const to = $pos.after(depth);
        tr.delete(from, to).scrollIntoView();
      }
      return true;
    }
  }
  return false;
};
var deleteNode = (typeOrName) => ({ tr, state, dispatch }) => {
  const type = getNodeType(typeOrName, state.schema);
  const $pos = tr.selection.$anchor;
  for (let depth = $pos.depth; depth > 0; depth -= 1) {
    const node = $pos.node(depth);
    if (node.type === type) {
      if (dispatch) {
        const from = $pos.before(depth);
        const to = $pos.after(depth);
        tr.delete(from, to).scrollIntoView();
      }
      return true;
    }
  }
  return false;
};
var deleteRange = (range) => ({ tr, dispatch }) => {
  const { from, to } = range;
  if (dispatch) {
    tr.delete(from, to);
  }
  return true;
};
var deleteSelection = () => ({ state, dispatch }) => {
  return deleteSelection$1(state, dispatch);
};
var enter = () => ({ commands }) => {
  return commands.keyboardShortcut("Enter");
};
var exitCode = () => ({ state, dispatch }) => {
  return exitCode$1(state, dispatch);
};
var extendMarkRange = (typeOrName, attributes = {}) => ({ tr, state, dispatch }) => {
  const type = getMarkType(typeOrName, state.schema);
  const { doc, selection } = tr;
  const { $from, from, to } = selection;
  if (dispatch) {
    const range = getMarkRange($from, type, attributes);
    if (range && range.from <= from && range.to >= to) {
      const newSelection = TextSelection.create(doc, range.from, range.to);
      tr.setSelection(newSelection);
    }
  }
  return true;
};
var first = (commands) => (props) => {
  const items = typeof commands === "function" ? commands(props) : commands;
  for (let i = 0; i < items.length; i += 1) {
    if (items[i](props)) {
      return true;
    }
  }
  return false;
};
function isAndroid() {
  return (void 0).platform === "Android" || /android/i.test((void 0).userAgent);
}
function isiOS() {
  return ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].includes((void 0).platform) || // iPad on iOS 13 detection
  (void 0).userAgent.includes("Mac") && "ontouchend" in void 0;
}
var focus = (position = null, options = {}) => ({ editor, view, tr, dispatch }) => {
  options = {
    scrollIntoView: true,
    ...options
  };
  const delayedFocus = () => {
    if (isiOS() || isAndroid()) {
      view.dom.focus();
    }
    requestAnimationFrame(() => {
      if (!editor.isDestroyed) {
        view.focus();
        if (options == null ? void 0 : options.scrollIntoView) {
          editor.commands.scrollIntoView();
        }
      }
    });
  };
  if (view.hasFocus() && position === null || position === false) {
    return true;
  }
  if (dispatch && position === null && !isTextSelection(editor.state.selection)) {
    delayedFocus();
    return true;
  }
  const selection = resolveFocusPosition(tr.doc, position) || editor.state.selection;
  const isSameSelection = editor.state.selection.eq(selection);
  if (dispatch) {
    if (!isSameSelection) {
      tr.setSelection(selection);
    }
    if (isSameSelection && tr.storedMarks) {
      tr.setStoredMarks(tr.storedMarks);
    }
    delayedFocus();
  }
  return true;
};
var forEach = (items, fn) => (props) => {
  return items.every((item, index) => fn(item, { ...props, index }));
};
var insertContent = (value, options) => ({ tr, commands }) => {
  return commands.insertContentAt({ from: tr.selection.from, to: tr.selection.to }, value, options);
};
var isFragment = (nodeOrFragment) => {
  return !("type" in nodeOrFragment);
};
var insertContentAt = (position, value, options) => ({ tr, dispatch, editor }) => {
  var _a;
  if (dispatch) {
    options = {
      parseOptions: editor.options.parseOptions,
      updateSelection: true,
      applyInputRules: false,
      applyPasteRules: false,
      ...options
    };
    let content;
    const { selection } = editor.state;
    const emitContentError = (error) => {
      editor.emit("contentError", {
        editor,
        error,
        disableCollaboration: () => {
          if ("collaboration" in editor.storage && typeof editor.storage.collaboration === "object" && editor.storage.collaboration) {
            editor.storage.collaboration.isDisabled = true;
          }
        }
      });
    };
    const parseOptions = {
      preserveWhitespace: "full",
      ...options.parseOptions
    };
    if (!options.errorOnInvalidContent && !editor.options.enableContentCheck && editor.options.emitContentError) {
      try {
        createNodeFromContent(value, editor.schema, {
          parseOptions,
          errorOnInvalidContent: true
        });
      } catch (e) {
        emitContentError(e);
      }
    }
    try {
      content = createNodeFromContent(value, editor.schema, {
        parseOptions,
        errorOnInvalidContent: (_a = options.errorOnInvalidContent) != null ? _a : editor.options.enableContentCheck
      });
    } catch (e) {
      emitContentError(e);
      return false;
    }
    let { from, to } = typeof position === "number" ? { from: position, to: position } : { from: position.from, to: position.to };
    let isOnlyTextContent = true;
    let isOnlyBlockContent = true;
    const nodes = isFragment(content) ? content : [content];
    nodes.forEach((node) => {
      node.check();
      isOnlyTextContent = isOnlyTextContent ? node.isText && node.marks.length === 0 : false;
      isOnlyBlockContent = isOnlyBlockContent ? node.isBlock : false;
    });
    if (from === to && isOnlyBlockContent) {
      const { parent } = tr.doc.resolve(from);
      const isEmptyTextBlock = parent.isTextblock && !parent.type.spec.code && !parent.childCount;
      if (isEmptyTextBlock) {
        from -= 1;
        to += 1;
      }
    }
    let newContent;
    if (isOnlyTextContent) {
      if (Array.isArray(value)) {
        newContent = value.map((v) => v.text || "").join("");
      } else if (value instanceof Fragment$1) {
        let text = "";
        value.forEach((node) => {
          if (node.text) {
            text += node.text;
          }
        });
        newContent = text;
      } else if (typeof value === "object" && !!value && !!value.text) {
        newContent = value.text;
      } else {
        newContent = value;
      }
      tr.insertText(newContent, from, to);
    } else {
      newContent = content;
      const fromSelectionAtStart = selection.$from.parentOffset === 0;
      const isTextSelection2 = selection.$from.node().isText || selection.$from.node().isTextblock;
      const hasContent = selection.$from.node().content.size > 0;
      if (fromSelectionAtStart && isTextSelection2 && hasContent) {
        from = Math.max(0, from - 1);
      }
      tr.replaceWith(from, to, newContent);
    }
    if (options.updateSelection) {
      selectionToInsertionEnd(tr, tr.steps.length - 1, -1);
    }
    if (options.applyInputRules) {
      tr.setMeta("applyInputRules", { from, text: newContent });
    }
    if (options.applyPasteRules) {
      tr.setMeta("applyPasteRules", { from, text: newContent });
    }
  }
  return true;
};
var joinUp = () => ({ state, dispatch }) => {
  return joinUp$1(state, dispatch);
};
var joinDown = () => ({ state, dispatch }) => {
  return joinDown$1(state, dispatch);
};
var joinBackward = () => ({ state, dispatch }) => {
  return joinBackward$1(state, dispatch);
};
var joinForward = () => ({ state, dispatch }) => {
  return joinForward$1(state, dispatch);
};
var joinItemBackward = () => ({ state, dispatch, tr }) => {
  try {
    const point = joinPoint(state.doc, state.selection.$from.pos, -1);
    if (point === null || point === void 0) {
      return false;
    }
    tr.join(point, 2);
    if (dispatch) {
      dispatch(tr);
    }
    return true;
  } catch {
    return false;
  }
};
var joinItemForward = () => ({ state, dispatch, tr }) => {
  try {
    const point = joinPoint(state.doc, state.selection.$from.pos, 1);
    if (point === null || point === void 0) {
      return false;
    }
    tr.join(point, 2);
    if (dispatch) {
      dispatch(tr);
    }
    return true;
  } catch {
    return false;
  }
};
var joinTextblockBackward = () => ({ state, dispatch }) => {
  return joinTextblockBackward$1(state, dispatch);
};
var joinTextblockForward = () => ({ state, dispatch }) => {
  return joinTextblockForward$1(state, dispatch);
};
function isMacOS() {
  return false;
}
function normalizeKeyName(name) {
  const parts = name.split(/-(?!$)/);
  let result = parts[parts.length - 1];
  if (result === "Space") {
    result = " ";
  }
  let alt;
  let ctrl;
  let shift;
  let meta;
  for (let i = 0; i < parts.length - 1; i += 1) {
    const mod = parts[i];
    if (/^(cmd|meta|m)$/i.test(mod)) {
      meta = true;
    } else if (/^a(lt)?$/i.test(mod)) {
      alt = true;
    } else if (/^(c|ctrl|control)$/i.test(mod)) {
      ctrl = true;
    } else if (/^s(hift)?$/i.test(mod)) {
      shift = true;
    } else if (/^mod$/i.test(mod)) {
      if (isiOS() || isMacOS()) {
        meta = true;
      } else {
        ctrl = true;
      }
    } else {
      throw new Error(`Unrecognized modifier name: ${mod}`);
    }
  }
  if (alt) {
    result = `Alt-${result}`;
  }
  if (ctrl) {
    result = `Ctrl-${result}`;
  }
  if (meta) {
    result = `Meta-${result}`;
  }
  if (shift) {
    result = `Shift-${result}`;
  }
  return result;
}
var keyboardShortcut = (name) => ({ editor, view, tr, dispatch }) => {
  const keys = normalizeKeyName(name).split(/-(?!$)/);
  const key = keys.find((item) => !["Alt", "Ctrl", "Meta", "Shift"].includes(item));
  const event = new KeyboardEvent("keydown", {
    key: key === "Space" ? " " : key,
    altKey: keys.includes("Alt"),
    ctrlKey: keys.includes("Ctrl"),
    metaKey: keys.includes("Meta"),
    shiftKey: keys.includes("Shift"),
    bubbles: true,
    cancelable: true
  });
  const capturedTransaction = editor.captureTransaction(() => {
    view.someProp("handleKeyDown", (f) => f(view, event));
  });
  capturedTransaction == null ? void 0 : capturedTransaction.steps.forEach((step) => {
    const newStep = step.map(tr.mapping);
    if (newStep && dispatch) {
      tr.maybeStep(newStep);
    }
  });
  return true;
};
var lift = (typeOrName, attributes = {}) => ({ state, dispatch }) => {
  const type = getNodeType(typeOrName, state.schema);
  const isActive2 = isNodeActive(state, type, attributes);
  if (!isActive2) {
    return false;
  }
  return lift$1(state, dispatch);
};
var liftEmptyBlock = () => ({ state, dispatch }) => {
  return liftEmptyBlock$1(state, dispatch);
};
var liftListItem = (typeOrName) => ({ state, dispatch }) => {
  const type = getNodeType(typeOrName, state.schema);
  return liftListItem$1(type)(state, dispatch);
};
var newlineInCode = () => ({ state, dispatch }) => {
  return newlineInCode$1(state, dispatch);
};
function deleteProps(obj, propOrProps) {
  const props = typeof propOrProps === "string" ? [propOrProps] : propOrProps;
  return Object.keys(obj).reduce((newObj, prop) => {
    if (!props.includes(prop)) {
      newObj[prop] = obj[prop];
    }
    return newObj;
  }, {});
}
var resetAttributes = (typeOrName, attributes) => ({ tr, state, dispatch }) => {
  let nodeType = null;
  let markType = null;
  const schemaType = getSchemaTypeNameByName(
    typeof typeOrName === "string" ? typeOrName : typeOrName.name,
    state.schema
  );
  if (!schemaType) {
    return false;
  }
  if (schemaType === "node") {
    nodeType = getNodeType(typeOrName, state.schema);
  }
  if (schemaType === "mark") {
    markType = getMarkType(typeOrName, state.schema);
  }
  if (dispatch) {
    tr.selection.ranges.forEach((range) => {
      state.doc.nodesBetween(range.$from.pos, range.$to.pos, (node, pos) => {
        if (nodeType && nodeType === node.type) {
          tr.setNodeMarkup(pos, void 0, deleteProps(node.attrs, attributes));
        }
        if (markType && node.marks.length) {
          node.marks.forEach((mark) => {
            if (markType === mark.type) {
              tr.addMark(pos, pos + node.nodeSize, markType.create(deleteProps(mark.attrs, attributes)));
            }
          });
        }
      });
    });
  }
  return true;
};
var scrollIntoView = () => ({ tr, dispatch }) => {
  if (dispatch) {
    tr.scrollIntoView();
  }
  return true;
};
var selectAll = () => ({ tr, dispatch }) => {
  if (dispatch) {
    const selection = new AllSelection(tr.doc);
    tr.setSelection(selection);
  }
  return true;
};
var selectNodeBackward = () => ({ state, dispatch }) => {
  return selectNodeBackward$1(state, dispatch);
};
var selectNodeForward = () => ({ state, dispatch }) => {
  return selectNodeForward$1(state, dispatch);
};
var selectParentNode = () => ({ state, dispatch }) => {
  return selectParentNode$1(state, dispatch);
};
var selectTextblockEnd = () => ({ state, dispatch }) => {
  return selectTextblockEnd$1(state, dispatch);
};
var selectTextblockStart = () => ({ state, dispatch }) => {
  return selectTextblockStart$1(state, dispatch);
};
var setContent = (content, { errorOnInvalidContent, emitUpdate = true, parseOptions = {} } = {}) => ({ editor, tr, dispatch, commands }) => {
  const { doc } = tr;
  if (parseOptions.preserveWhitespace !== "full") {
    const document2 = createDocument(content, editor.schema, parseOptions, {
      errorOnInvalidContent: errorOnInvalidContent != null ? errorOnInvalidContent : editor.options.enableContentCheck
    });
    if (dispatch) {
      tr.replaceWith(0, doc.content.size, document2).setMeta("preventUpdate", !emitUpdate);
    }
    return true;
  }
  if (dispatch) {
    tr.setMeta("preventUpdate", !emitUpdate);
  }
  return commands.insertContentAt({ from: 0, to: doc.content.size }, content, {
    parseOptions,
    errorOnInvalidContent: errorOnInvalidContent != null ? errorOnInvalidContent : editor.options.enableContentCheck
  });
};
function canSetMark(state, tr, newMarkType) {
  var _a;
  const { selection } = tr;
  let cursor = null;
  if (isTextSelection(selection)) {
    cursor = selection.$cursor;
  }
  if (cursor) {
    const currentMarks = (_a = state.storedMarks) != null ? _a : cursor.marks();
    return !!newMarkType.isInSet(currentMarks) || !currentMarks.some((mark) => mark.type.excludes(newMarkType));
  }
  const { ranges } = selection;
  return ranges.some(({ $from, $to }) => {
    let someNodeSupportsMark = $from.depth === 0 ? state.doc.inlineContent && state.doc.type.allowsMarkType(newMarkType) : false;
    state.doc.nodesBetween($from.pos, $to.pos, (node, _pos, parent) => {
      if (someNodeSupportsMark) {
        return false;
      }
      if (node.isInline) {
        const parentAllowsMarkType = !parent || parent.type.allowsMarkType(newMarkType);
        const currentMarksAllowMarkType = !!newMarkType.isInSet(node.marks) || !node.marks.some((otherMark) => otherMark.type.excludes(newMarkType));
        someNodeSupportsMark = parentAllowsMarkType && currentMarksAllowMarkType;
      }
      return !someNodeSupportsMark;
    });
    return someNodeSupportsMark;
  });
}
var setMark = (typeOrName, attributes = {}) => ({ tr, state, dispatch }) => {
  const { selection } = tr;
  const { empty, ranges } = selection;
  const type = getMarkType(typeOrName, state.schema);
  if (dispatch) {
    if (empty) {
      const oldAttributes = getMarkAttributes(state, type);
      tr.addStoredMark(
        type.create({
          ...oldAttributes,
          ...attributes
        })
      );
    } else {
      ranges.forEach((range) => {
        const from = range.$from.pos;
        const to = range.$to.pos;
        state.doc.nodesBetween(from, to, (node, pos) => {
          const trimmedFrom = Math.max(pos, from);
          const trimmedTo = Math.min(pos + node.nodeSize, to);
          const someHasMark = node.marks.find((mark) => mark.type === type);
          if (someHasMark) {
            node.marks.forEach((mark) => {
              if (type === mark.type) {
                tr.addMark(
                  trimmedFrom,
                  trimmedTo,
                  type.create({
                    ...mark.attrs,
                    ...attributes
                  })
                );
              }
            });
          } else {
            tr.addMark(trimmedFrom, trimmedTo, type.create(attributes));
          }
        });
      });
    }
  }
  return canSetMark(state, tr, type);
};
var setMeta = (key, value) => ({ tr }) => {
  tr.setMeta(key, value);
  return true;
};
var setNode = (typeOrName, attributes = {}) => ({ state, dispatch, chain }) => {
  const type = getNodeType(typeOrName, state.schema);
  let attributesToCopy;
  if (state.selection.$anchor.sameParent(state.selection.$head)) {
    attributesToCopy = state.selection.$anchor.parent.attrs;
  }
  if (!type.isTextblock) {
    console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.');
    return false;
  }
  return chain().command(({ commands }) => {
    const canSetBlock = setBlockType(type, { ...attributesToCopy, ...attributes })(state);
    if (canSetBlock) {
      return true;
    }
    return commands.clearNodes();
  }).command(({ state: updatedState }) => {
    return setBlockType(type, { ...attributesToCopy, ...attributes })(updatedState, dispatch);
  }).run();
};
var setNodeSelection = (position) => ({ tr, dispatch }) => {
  if (dispatch) {
    const { doc } = tr;
    const from = minMax(position, 0, doc.content.size);
    const selection = NodeSelection.create(doc, from);
    tr.setSelection(selection);
  }
  return true;
};
var setTextSelection = (position) => ({ tr, dispatch }) => {
  if (dispatch) {
    const { doc } = tr;
    const { from, to } = typeof position === "number" ? { from: position, to: position } : position;
    const minPos = TextSelection.atStart(doc).from;
    const maxPos = TextSelection.atEnd(doc).to;
    const resolvedFrom = minMax(from, minPos, maxPos);
    const resolvedEnd = minMax(to, minPos, maxPos);
    const selection = TextSelection.create(doc, resolvedFrom, resolvedEnd);
    tr.setSelection(selection);
  }
  return true;
};
var sinkListItem = (typeOrName) => ({ state, dispatch }) => {
  const type = getNodeType(typeOrName, state.schema);
  return sinkListItem$1(type)(state, dispatch);
};
function ensureMarks(state, splittableMarks) {
  const marks = state.storedMarks || state.selection.$to.parentOffset && state.selection.$from.marks();
  if (marks) {
    const filteredMarks = marks.filter((mark) => splittableMarks == null ? void 0 : splittableMarks.includes(mark.type.name));
    state.tr.ensureMarks(filteredMarks);
  }
}
var splitBlock = ({ keepMarks = true } = {}) => ({ tr, state, dispatch, editor }) => {
  const { selection, doc } = tr;
  const { $from, $to } = selection;
  const extensionAttributes = editor.extensionManager.attributes;
  const newAttributes = getSplittedAttributes(extensionAttributes, $from.node().type.name, $from.node().attrs);
  if (selection instanceof NodeSelection && selection.node.isBlock) {
    if (!$from.parentOffset || !canSplit(doc, $from.pos)) {
      return false;
    }
    if (dispatch) {
      if (keepMarks) {
        ensureMarks(state, editor.extensionManager.splittableMarks);
      }
      tr.split($from.pos).scrollIntoView();
    }
    return true;
  }
  if (!$from.parent.isBlock) {
    return false;
  }
  const atEnd = $to.parentOffset === $to.parent.content.size;
  const deflt = $from.depth === 0 ? void 0 : defaultBlockAt($from.node(-1).contentMatchAt($from.indexAfter(-1)));
  let types = atEnd && deflt ? [
    {
      type: deflt,
      attrs: newAttributes
    }
  ] : void 0;
  let can = canSplit(tr.doc, tr.mapping.map($from.pos), 1, types);
  if (!types && !can && canSplit(tr.doc, tr.mapping.map($from.pos), 1, deflt ? [{ type: deflt }] : void 0)) {
    can = true;
    types = deflt ? [
      {
        type: deflt,
        attrs: newAttributes
      }
    ] : void 0;
  }
  if (dispatch) {
    if (can) {
      if (selection instanceof TextSelection) {
        tr.deleteSelection();
      }
      tr.split(tr.mapping.map($from.pos), 1, types);
      if (deflt && !atEnd && !$from.parentOffset && $from.parent.type !== deflt) {
        const first2 = tr.mapping.map($from.before());
        const $first = tr.doc.resolve(first2);
        if ($from.node(-1).canReplaceWith($first.index(), $first.index() + 1, deflt)) {
          tr.setNodeMarkup(tr.mapping.map($from.before()), deflt);
        }
      }
    }
    if (keepMarks) {
      ensureMarks(state, editor.extensionManager.splittableMarks);
    }
    tr.scrollIntoView();
  }
  return can;
};
var splitListItem = (typeOrName, overrideAttrs = {}) => ({ tr, state, dispatch, editor }) => {
  var _a;
  const type = getNodeType(typeOrName, state.schema);
  const { $from, $to } = state.selection;
  const node = state.selection.node;
  if (node && node.isBlock || $from.depth < 2 || !$from.sameParent($to)) {
    return false;
  }
  const grandParent = $from.node(-1);
  if (grandParent.type !== type) {
    return false;
  }
  const extensionAttributes = editor.extensionManager.attributes;
  if ($from.parent.content.size === 0 && $from.node(-1).childCount === $from.indexAfter(-1)) {
    if ($from.depth === 2 || $from.node(-3).type !== type || $from.index(-2) !== $from.node(-2).childCount - 1) {
      return false;
    }
    if (dispatch) {
      let wrap = Fragment$1.empty;
      const depthBefore = $from.index(-1) ? 1 : $from.index(-2) ? 2 : 3;
      for (let d = $from.depth - depthBefore; d >= $from.depth - 3; d -= 1) {
        wrap = Fragment$1.from($from.node(d).copy(wrap));
      }
      const depthAfter = (
        // eslint-disable-next-line no-nested-ternary
        $from.indexAfter(-1) < $from.node(-2).childCount ? 1 : $from.indexAfter(-2) < $from.node(-3).childCount ? 2 : 3
      );
      const newNextTypeAttributes2 = {
        ...getSplittedAttributes(extensionAttributes, $from.node().type.name, $from.node().attrs),
        ...overrideAttrs
      };
      const nextType2 = ((_a = type.contentMatch.defaultType) == null ? void 0 : _a.createAndFill(newNextTypeAttributes2)) || void 0;
      wrap = wrap.append(Fragment$1.from(type.createAndFill(null, nextType2) || void 0));
      const start = $from.before($from.depth - (depthBefore - 1));
      tr.replace(start, $from.after(-depthAfter), new Slice(wrap, 4 - depthBefore, 0));
      let sel = -1;
      tr.doc.nodesBetween(start, tr.doc.content.size, (n, pos) => {
        if (sel > -1) {
          return false;
        }
        if (n.isTextblock && n.content.size === 0) {
          sel = pos + 1;
        }
      });
      if (sel > -1) {
        tr.setSelection(TextSelection.near(tr.doc.resolve(sel)));
      }
      tr.scrollIntoView();
    }
    return true;
  }
  const nextType = $to.pos === $from.end() ? grandParent.contentMatchAt(0).defaultType : null;
  const newTypeAttributes = {
    ...getSplittedAttributes(extensionAttributes, grandParent.type.name, grandParent.attrs),
    ...overrideAttrs
  };
  const newNextTypeAttributes = {
    ...getSplittedAttributes(extensionAttributes, $from.node().type.name, $from.node().attrs),
    ...overrideAttrs
  };
  tr.delete($from.pos, $to.pos);
  const types = nextType ? [
    { type, attrs: newTypeAttributes },
    { type: nextType, attrs: newNextTypeAttributes }
  ] : [{ type, attrs: newTypeAttributes }];
  if (!canSplit(tr.doc, $from.pos, 2)) {
    return false;
  }
  if (dispatch) {
    const { selection, storedMarks } = state;
    const { splittableMarks } = editor.extensionManager;
    const marks = storedMarks || selection.$to.parentOffset && selection.$from.marks();
    tr.split($from.pos, 2, types).scrollIntoView();
    if (!marks || !dispatch) {
      return true;
    }
    const filteredMarks = marks.filter((mark) => splittableMarks.includes(mark.type.name));
    tr.ensureMarks(filteredMarks);
  }
  return true;
};
var joinListBackwards = (tr, listType) => {
  const list = findParentNode((node) => node.type === listType)(tr.selection);
  if (!list) {
    return true;
  }
  const before = tr.doc.resolve(Math.max(0, list.pos - 1)).before(list.depth);
  if (before === void 0) {
    return true;
  }
  const nodeBefore = tr.doc.nodeAt(before);
  const canJoinBackwards = list.node.type === (nodeBefore == null ? void 0 : nodeBefore.type) && canJoin(tr.doc, list.pos);
  if (!canJoinBackwards) {
    return true;
  }
  tr.join(list.pos);
  return true;
};
var joinListForwards = (tr, listType) => {
  const list = findParentNode((node) => node.type === listType)(tr.selection);
  if (!list) {
    return true;
  }
  const after = tr.doc.resolve(list.start).after(list.depth);
  if (after === void 0) {
    return true;
  }
  const nodeAfter = tr.doc.nodeAt(after);
  const canJoinForwards = list.node.type === (nodeAfter == null ? void 0 : nodeAfter.type) && canJoin(tr.doc, after);
  if (!canJoinForwards) {
    return true;
  }
  tr.join(after);
  return true;
};
var toggleList = (listTypeOrName, itemTypeOrName, keepMarks, attributes = {}) => ({ editor, tr, state, dispatch, chain, commands, can }) => {
  const { extensions, splittableMarks } = editor.extensionManager;
  const listType = getNodeType(listTypeOrName, state.schema);
  const itemType = getNodeType(itemTypeOrName, state.schema);
  const { selection, storedMarks } = state;
  const { $from, $to } = selection;
  const range = $from.blockRange($to);
  const marks = storedMarks || selection.$to.parentOffset && selection.$from.marks();
  if (!range) {
    return false;
  }
  const parentList = findParentNode((node) => isList(node.type.name, extensions))(selection);
  if (range.depth >= 1 && parentList && range.depth - parentList.depth <= 1) {
    if (parentList.node.type === listType) {
      return commands.liftListItem(itemType);
    }
    if (isList(parentList.node.type.name, extensions) && listType.validContent(parentList.node.content) && dispatch) {
      return chain().command(() => {
        tr.setNodeMarkup(parentList.pos, listType);
        return true;
      }).command(() => joinListBackwards(tr, listType)).command(() => joinListForwards(tr, listType)).run();
    }
  }
  if (!keepMarks || !marks || !dispatch) {
    return chain().command(() => {
      const canWrapInList = can().wrapInList(listType, attributes);
      if (canWrapInList) {
        return true;
      }
      return commands.clearNodes();
    }).wrapInList(listType, attributes).command(() => joinListBackwards(tr, listType)).command(() => joinListForwards(tr, listType)).run();
  }
  return chain().command(() => {
    const canWrapInList = can().wrapInList(listType, attributes);
    const filteredMarks = marks.filter((mark) => splittableMarks.includes(mark.type.name));
    tr.ensureMarks(filteredMarks);
    if (canWrapInList) {
      return true;
    }
    return commands.clearNodes();
  }).wrapInList(listType, attributes).command(() => joinListBackwards(tr, listType)).command(() => joinListForwards(tr, listType)).run();
};
var toggleMark = (typeOrName, attributes = {}, options = {}) => ({ state, commands }) => {
  const { extendEmptyMarkRange = false } = options;
  const type = getMarkType(typeOrName, state.schema);
  const isActive2 = isMarkActive(state, type, attributes);
  if (isActive2) {
    return commands.unsetMark(type, { extendEmptyMarkRange });
  }
  return commands.setMark(type, attributes);
};
var toggleNode = (typeOrName, toggleTypeOrName, attributes = {}) => ({ state, commands }) => {
  const type = getNodeType(typeOrName, state.schema);
  const toggleType = getNodeType(toggleTypeOrName, state.schema);
  const isActive2 = isNodeActive(state, type, attributes);
  let attributesToCopy;
  if (state.selection.$anchor.sameParent(state.selection.$head)) {
    attributesToCopy = state.selection.$anchor.parent.attrs;
  }
  if (isActive2) {
    return commands.setNode(toggleType, attributesToCopy);
  }
  return commands.setNode(type, { ...attributesToCopy, ...attributes });
};
var toggleWrap = (typeOrName, attributes = {}) => ({ state, commands }) => {
  const type = getNodeType(typeOrName, state.schema);
  const isActive2 = isNodeActive(state, type, attributes);
  if (isActive2) {
    return commands.lift(type);
  }
  return commands.wrapIn(type, attributes);
};
var undoInputRule = () => ({ state, dispatch }) => {
  const plugins = state.plugins;
  for (let i = 0; i < plugins.length; i += 1) {
    const plugin = plugins[i];
    let undoable;
    if (plugin.spec.isInputRules && (undoable = plugin.getState(state))) {
      if (dispatch) {
        const tr = state.tr;
        const toUndo = undoable.transform;
        for (let j = toUndo.steps.length - 1; j >= 0; j -= 1) {
          tr.step(toUndo.steps[j].invert(toUndo.docs[j]));
        }
        if (undoable.text) {
          const marks = tr.doc.resolve(undoable.from).marks();
          tr.replaceWith(undoable.from, undoable.to, state.schema.text(undoable.text, marks));
        } else {
          tr.delete(undoable.from, undoable.to);
        }
      }
      return true;
    }
  }
  return false;
};
var unsetAllMarks = () => ({ tr, dispatch }) => {
  const { selection } = tr;
  const { empty, ranges } = selection;
  if (empty) {
    return true;
  }
  if (dispatch) {
    ranges.forEach((range) => {
      tr.removeMark(range.$from.pos, range.$to.pos);
    });
  }
  return true;
};
var unsetMark = (typeOrName, options = {}) => ({ tr, state, dispatch }) => {
  var _a;
  const { extendEmptyMarkRange = false } = options;
  const { selection } = tr;
  const type = getMarkType(typeOrName, state.schema);
  const { $from, empty, ranges } = selection;
  if (!dispatch) {
    return true;
  }
  if (empty && extendEmptyMarkRange) {
    let { from, to } = selection;
    const attrs = (_a = $from.marks().find((mark) => mark.type === type)) == null ? void 0 : _a.attrs;
    const range = getMarkRange($from, type, attrs);
    if (range) {
      from = range.from;
      to = range.to;
    }
    tr.removeMark(from, to, type);
  } else {
    ranges.forEach((range) => {
      tr.removeMark(range.$from.pos, range.$to.pos, type);
    });
  }
  tr.removeStoredMark(type);
  return true;
};
var updateAttributes = (typeOrName, attributes = {}) => ({ tr, state, dispatch }) => {
  let nodeType = null;
  let markType = null;
  const schemaType = getSchemaTypeNameByName(
    typeof typeOrName === "string" ? typeOrName : typeOrName.name,
    state.schema
  );
  if (!schemaType) {
    return false;
  }
  if (schemaType === "node") {
    nodeType = getNodeType(typeOrName, state.schema);
  }
  if (schemaType === "mark") {
    markType = getMarkType(typeOrName, state.schema);
  }
  if (dispatch) {
    tr.selection.ranges.forEach((range) => {
      const from = range.$from.pos;
      const to = range.$to.pos;
      let lastPos;
      let lastNode;
      let trimmedFrom;
      let trimmedTo;
      if (tr.selection.empty) {
        state.doc.nodesBetween(from, to, (node, pos) => {
          if (nodeType && nodeType === node.type) {
            trimmedFrom = Math.max(pos, from);
            trimmedTo = Math.min(pos + node.nodeSize, to);
            lastPos = pos;
            lastNode = node;
          }
        });
      } else {
        state.doc.nodesBetween(from, to, (node, pos) => {
          if (pos < from && nodeType && nodeType === node.type) {
            trimmedFrom = Math.max(pos, from);
            trimmedTo = Math.min(pos + node.nodeSize, to);
            lastPos = pos;
            lastNode = node;
          }
          if (pos >= from && pos <= to) {
            if (nodeType && nodeType === node.type) {
              tr.setNodeMarkup(pos, void 0, {
                ...node.attrs,
                ...attributes
              });
            }
            if (markType && node.marks.length) {
              node.marks.forEach((mark) => {
                if (markType === mark.type) {
                  const trimmedFrom2 = Math.max(pos, from);
                  const trimmedTo2 = Math.min(pos + node.nodeSize, to);
                  tr.addMark(
                    trimmedFrom2,
                    trimmedTo2,
                    markType.create({
                      ...mark.attrs,
                      ...attributes
                    })
                  );
                }
              });
            }
          }
        });
      }
      if (lastNode) {
        if (lastPos !== void 0) {
          tr.setNodeMarkup(lastPos, void 0, {
            ...lastNode.attrs,
            ...attributes
          });
        }
        if (markType && lastNode.marks.length) {
          lastNode.marks.forEach((mark) => {
            if (markType === mark.type) {
              tr.addMark(
                trimmedFrom,
                trimmedTo,
                markType.create({
                  ...mark.attrs,
                  ...attributes
                })
              );
            }
          });
        }
      }
    });
  }
  return true;
};
var wrapIn = (typeOrName, attributes = {}) => ({ state, dispatch }) => {
  const type = getNodeType(typeOrName, state.schema);
  return wrapIn$1(type, attributes)(state, dispatch);
};
var wrapInList = (typeOrName, attributes = {}) => ({ state, dispatch }) => {
  const type = getNodeType(typeOrName, state.schema);
  return wrapInList$1(type, attributes)(state, dispatch);
};
var Commands = Extension.create({
  name: "commands",
  addCommands() {
    return {
      ...commands_exports
    };
  }
});
var Delete = Extension.create({
  name: "delete",
  onUpdate({ transaction, appendedTransactions }) {
    var _a, _b, _c;
    const callback = () => {
      var _a2, _b2, _c2, _d;
      if ((_d = (_c2 = (_b2 = (_a2 = this.editor.options.coreExtensionOptions) == null ? void 0 : _a2.delete) == null ? void 0 : _b2.filterTransaction) == null ? void 0 : _c2.call(_b2, transaction)) != null ? _d : transaction.getMeta("y-sync$")) {
        return;
      }
      const nextTransaction = combineTransactionSteps(transaction.before, [transaction, ...appendedTransactions]);
      const changes = getChangedRanges(nextTransaction);
      changes.forEach((change) => {
        if (nextTransaction.mapping.mapResult(change.oldRange.from).deletedAfter && nextTransaction.mapping.mapResult(change.oldRange.to).deletedBefore) {
          nextTransaction.before.nodesBetween(change.oldRange.from, change.oldRange.to, (node, from) => {
            const to = from + node.nodeSize - 2;
            const isFullyWithinRange = change.oldRange.from <= from && to <= change.oldRange.to;
            this.editor.emit("delete", {
              type: "node",
              node,
              from,
              to,
              newFrom: nextTransaction.mapping.map(from),
              newTo: nextTransaction.mapping.map(to),
              deletedRange: change.oldRange,
              newRange: change.newRange,
              partial: !isFullyWithinRange,
              editor: this.editor,
              transaction,
              combinedTransform: nextTransaction
            });
          });
        }
      });
      const mapping = nextTransaction.mapping;
      nextTransaction.steps.forEach((step, index) => {
        var _a3, _b3;
        if (step instanceof RemoveMarkStep) {
          const newStart = mapping.slice(index).map(step.from, -1);
          const newEnd = mapping.slice(index).map(step.to);
          const oldStart = mapping.invert().map(newStart, -1);
          const oldEnd = mapping.invert().map(newEnd);
          const foundBeforeMark = (_a3 = nextTransaction.doc.nodeAt(newStart - 1)) == null ? void 0 : _a3.marks.some((mark) => mark.eq(step.mark));
          const foundAfterMark = (_b3 = nextTransaction.doc.nodeAt(newEnd)) == null ? void 0 : _b3.marks.some((mark) => mark.eq(step.mark));
          this.editor.emit("delete", {
            type: "mark",
            mark: step.mark,
            from: step.from,
            to: step.to,
            deletedRange: {
              from: oldStart,
              to: oldEnd
            },
            newRange: {
              from: newStart,
              to: newEnd
            },
            partial: Boolean(foundAfterMark || foundBeforeMark),
            editor: this.editor,
            transaction,
            combinedTransform: nextTransaction
          });
        }
      });
    };
    if ((_c = (_b = (_a = this.editor.options.coreExtensionOptions) == null ? void 0 : _a.delete) == null ? void 0 : _b.async) != null ? _c : true) {
      setTimeout(callback, 0);
    } else {
      callback();
    }
  }
});
var Drop = Extension.create({
  name: "drop",
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("tiptapDrop"),
        props: {
          handleDrop: (_, e, slice, moved) => {
            this.editor.emit("drop", {
              editor: this.editor,
              event: e,
              slice,
              moved
            });
          }
        }
      })
    ];
  }
});
var Editable = Extension.create({
  name: "editable",
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("editable"),
        props: {
          editable: () => this.editor.options.editable
        }
      })
    ];
  }
});
var focusEventsPluginKey = new PluginKey("focusEvents");
var FocusEvents = Extension.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor } = this;
    return [
      new Plugin({
        key: focusEventsPluginKey,
        props: {
          handleDOMEvents: {
            focus: (view, event) => {
              editor.isFocused = true;
              const transaction = editor.state.tr.setMeta("focus", { event }).setMeta("addToHistory", false);
              view.dispatch(transaction);
              return false;
            },
            blur: (view, event) => {
              editor.isFocused = false;
              const transaction = editor.state.tr.setMeta("blur", { event }).setMeta("addToHistory", false);
              view.dispatch(transaction);
              return false;
            }
          }
        }
      })
    ];
  }
});
var Keymap = Extension.create({
  name: "keymap",
  addKeyboardShortcuts() {
    const handleBackspace = () => this.editor.commands.first(({ commands }) => [
      () => commands.undoInputRule(),
      // maybe convert first text block node to default node
      () => commands.command(({ tr }) => {
        const { selection, doc } = tr;
        const { empty, $anchor } = selection;
        const { pos, parent } = $anchor;
        const $parentPos = $anchor.parent.isTextblock && pos > 0 ? tr.doc.resolve(pos - 1) : $anchor;
        const parentIsIsolating = $parentPos.parent.type.spec.isolating;
        const parentPos = $anchor.pos - $anchor.parentOffset;
        const isAtStart = parentIsIsolating && $parentPos.parent.childCount === 1 ? parentPos === $anchor.pos : Selection.atStart(doc).from === pos;
        if (!empty || !parent.type.isTextblock || parent.textContent.length || !isAtStart || isAtStart && $anchor.parent.type.name === "paragraph") {
          return false;
        }
        return commands.clearNodes();
      }),
      () => commands.deleteSelection(),
      () => commands.joinBackward(),
      () => commands.selectNodeBackward()
    ]);
    const handleDelete = () => this.editor.commands.first(({ commands }) => [
      () => commands.deleteSelection(),
      () => commands.deleteCurrentNode(),
      () => commands.joinForward(),
      () => commands.selectNodeForward()
    ]);
    const handleEnter = () => this.editor.commands.first(({ commands }) => [
      () => commands.newlineInCode(),
      () => commands.createParagraphNear(),
      () => commands.liftEmptyBlock(),
      () => commands.splitBlock()
    ]);
    const baseKeymap = {
      Enter: handleEnter,
      "Mod-Enter": () => this.editor.commands.exitCode(),
      Backspace: handleBackspace,
      "Mod-Backspace": handleBackspace,
      "Shift-Backspace": handleBackspace,
      Delete: handleDelete,
      "Mod-Delete": handleDelete,
      "Mod-a": () => this.editor.commands.selectAll()
    };
    const pcKeymap = {
      ...baseKeymap
    };
    const macKeymap = {
      ...baseKeymap,
      "Ctrl-h": handleBackspace,
      "Alt-Backspace": handleBackspace,
      "Ctrl-d": handleDelete,
      "Ctrl-Alt-Backspace": handleDelete,
      "Alt-Delete": handleDelete,
      "Alt-d": handleDelete,
      "Ctrl-a": () => this.editor.commands.selectTextblockStart(),
      "Ctrl-e": () => this.editor.commands.selectTextblockEnd()
    };
    if (isiOS() || isMacOS()) {
      return macKeymap;
    }
    return pcKeymap;
  },
  addProseMirrorPlugins() {
    return [
      // With this plugin we check if the whole document was selected and deleted.
      // In this case we will additionally call `clearNodes()` to convert e.g. a heading
      // to a paragraph if necessary.
      // This is an alternative to ProseMirror's `AllSelection`, which doesn’t work well
      // with many other commands.
      new Plugin({
        key: new PluginKey("clearDocument"),
        appendTransaction: (transactions, oldState, newState) => {
          if (transactions.some((tr2) => tr2.getMeta("composition"))) {
            return;
          }
          const docChanges = transactions.some((transaction) => transaction.docChanged) && !oldState.doc.eq(newState.doc);
          const ignoreTr = transactions.some((transaction) => transaction.getMeta("preventClearDocument"));
          if (!docChanges || ignoreTr) {
            return;
          }
          const { empty, from, to } = oldState.selection;
          const allFrom = Selection.atStart(oldState.doc).from;
          const allEnd = Selection.atEnd(oldState.doc).to;
          const allWasSelected = from === allFrom && to === allEnd;
          if (empty || !allWasSelected) {
            return;
          }
          const isEmpty = isNodeEmpty(newState.doc);
          if (!isEmpty) {
            return;
          }
          const tr = newState.tr;
          const state = createChainableState({
            state: newState,
            transaction: tr
          });
          const { commands } = new CommandManager({
            editor: this.editor,
            state
          });
          commands.clearNodes();
          if (!tr.steps.length) {
            return;
          }
          return tr;
        }
      })
    ];
  }
});
var Paste = Extension.create({
  name: "paste",
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("tiptapPaste"),
        props: {
          handlePaste: (_view, e, slice) => {
            this.editor.emit("paste", {
              editor: this.editor,
              event: e,
              slice
            });
          }
        }
      })
    ];
  }
});
var Tabindex = Extension.create({
  name: "tabindex",
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("tabindex"),
        props: {
          attributes: () => this.editor.isEditable ? { tabindex: "0" } : {}
        }
      })
    ];
  }
});
function markInputRule(config) {
  return new InputRule({
    find: config.find,
    handler: ({ state, range, match }) => {
      const attributes = callOrReturn(config.getAttributes, void 0, match);
      if (attributes === false || attributes === null) {
        return null;
      }
      const { tr } = state;
      const captureGroup = match[match.length - 1];
      const fullMatch = match[0];
      if (captureGroup) {
        const startSpaces = fullMatch.search(/\S/);
        const textStart = range.from + fullMatch.indexOf(captureGroup);
        const textEnd = textStart + captureGroup.length;
        const excludedMarks = getMarksBetween(range.from, range.to, state.doc).filter((item) => {
          const excluded = item.mark.type.excluded;
          return excluded.find((type) => type === config.type && type !== item.mark.type);
        }).filter((item) => item.to > textStart);
        if (excludedMarks.length) {
          return null;
        }
        if (textEnd < range.to) {
          tr.delete(textEnd, range.to);
        }
        if (textStart > range.from) {
          tr.delete(range.from + startSpaces, textStart);
        }
        const markEnd = range.from + startSpaces + captureGroup.length;
        tr.addMark(range.from + startSpaces, markEnd, config.type.create(attributes || {}));
        tr.removeStoredMark(config.type);
      }
    }
  });
}
function nodeInputRule(config) {
  return new InputRule({
    find: config.find,
    handler: ({ state, range, match }) => {
      const attributes = callOrReturn(config.getAttributes, void 0, match) || {};
      const { tr } = state;
      const start = range.from;
      let end = range.to;
      const newNode = config.type.create(attributes);
      if (match[1]) {
        const offset = match[0].lastIndexOf(match[1]);
        let matchStart = start + offset;
        if (matchStart > end) {
          matchStart = end;
        } else {
          end = matchStart + match[1].length;
        }
        const lastChar = match[0][match[0].length - 1];
        tr.insertText(lastChar, start + match[0].length - 1);
        tr.replaceWith(matchStart, end, newNode);
      } else if (match[0]) {
        const insertionStart = config.type.isInline ? start : start - 1;
        tr.insert(insertionStart, config.type.create(attributes)).delete(tr.mapping.map(start), tr.mapping.map(end));
      }
      tr.scrollIntoView();
    }
  });
}
function textblockTypeInputRule(config) {
  return new InputRule({
    find: config.find,
    handler: ({ state, range, match }) => {
      const $start = state.doc.resolve(range.from);
      const attributes = callOrReturn(config.getAttributes, void 0, match) || {};
      if (!$start.node(-1).canReplaceWith($start.index(-1), $start.indexAfter(-1), config.type)) {
        return null;
      }
      state.tr.delete(range.from, range.to).setBlockType(range.from, range.from, config.type, attributes);
    }
  });
}
function wrappingInputRule(config) {
  return new InputRule({
    find: config.find,
    handler: ({ state, range, match, chain }) => {
      const attributes = callOrReturn(config.getAttributes, void 0, match) || {};
      const tr = state.tr.delete(range.from, range.to);
      const $start = tr.doc.resolve(range.from);
      const blockRange = $start.blockRange();
      const wrapping = blockRange && findWrapping(blockRange, config.type, attributes);
      if (!wrapping) {
        return null;
      }
      tr.wrap(blockRange, wrapping);
      if (config.keepMarks && config.editor) {
        const { selection, storedMarks } = state;
        const { splittableMarks } = config.editor.extensionManager;
        const marks = storedMarks || selection.$to.parentOffset && selection.$from.marks();
        if (marks) {
          const filteredMarks = marks.filter((mark) => splittableMarks.includes(mark.type.name));
          tr.ensureMarks(filteredMarks);
        }
      }
      if (config.keepAttributes) {
        const nodeType = config.type.name === "bulletList" || config.type.name === "orderedList" ? "listItem" : "taskList";
        chain().updateAttributes(nodeType, attributes).run();
      }
      const before = tr.doc.resolve(range.from - 1).nodeBefore;
      if (before && before.type === config.type && canJoin(tr.doc, range.from - 1) && (!config.joinPredicate || config.joinPredicate(match, before))) {
        tr.join(range.from - 1);
      }
    }
  });
}
function canInsertNode(state, nodeType) {
  const { selection } = state;
  const { $from } = selection;
  if (selection instanceof NodeSelection) {
    const index = $from.index();
    const parent = $from.parent;
    return parent.canReplaceWith(index, index + 1, nodeType);
  }
  let depth = $from.depth;
  while (depth >= 0) {
    const index = $from.index(depth);
    const parent = $from.node(depth);
    const match = parent.contentMatchAt(index);
    if (match.matchType(nodeType)) {
      return true;
    }
    depth -= 1;
  }
  return false;
}
var Node3 = class _Node extends Extendable {
  constructor() {
    super(...arguments);
    this.type = "node";
  }
  /**
   * Create a new Node instance
   * @param config - Node configuration object or a function that returns a configuration object
   */
  static create(config = {}) {
    const resolvedConfig = typeof config === "function" ? config() : config;
    return new _Node(resolvedConfig);
  }
  configure(options) {
    return super.configure(options);
  }
  extend(extendedConfig) {
    const resolvedConfig = typeof extendedConfig === "function" ? extendedConfig() : extendedConfig;
    return super.extend(resolvedConfig);
  }
};
function markPasteRule(config) {
  return new PasteRule({
    find: config.find,
    handler: ({ state, range, match, pasteEvent }) => {
      const attributes = callOrReturn(config.getAttributes, void 0, match, pasteEvent);
      if (attributes === false || attributes === null) {
        return null;
      }
      const { tr } = state;
      const captureGroup = match[match.length - 1];
      const fullMatch = match[0];
      let markEnd = range.to;
      if (captureGroup) {
        const startSpaces = fullMatch.search(/\S/);
        const textStart = range.from + fullMatch.indexOf(captureGroup);
        const textEnd = textStart + captureGroup.length;
        const excludedMarks = getMarksBetween(range.from, range.to, state.doc).filter((item) => {
          const excluded = item.mark.type.excluded;
          return excluded.find((type) => type === config.type && type !== item.mark.type);
        }).filter((item) => item.to > textStart);
        if (excludedMarks.length) {
          return null;
        }
        if (textEnd < range.to) {
          tr.delete(textEnd, range.to);
        }
        if (textStart > range.from) {
          tr.delete(range.from + startSpaces, textStart);
        }
        markEnd = range.from + startSpaces + captureGroup.length;
        tr.addMark(range.from + startSpaces, markEnd, config.type.create(attributes || {}));
        tr.removeStoredMark(config.type);
      }
    }
  });
}
Node3.create({
  name: "horizontalRule",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  group: "block",
  parseHTML() {
    return [{ tag: "hr" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["hr", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
  },
  addCommands() {
    return {
      setHorizontalRule: () => ({ chain, state }) => {
        if (!canInsertNode(state, state.schema.nodes[this.name])) {
          return false;
        }
        const { selection } = state;
        const { $to: $originTo } = selection;
        const currentChain = chain();
        if (isNodeSelection(selection)) {
          currentChain.insertContentAt($originTo.pos, {
            type: this.name
          });
        } else {
          currentChain.insertContent({ type: this.name });
        }
        return currentChain.command(({ tr, dispatch }) => {
          var _a;
          if (dispatch) {
            const { $to } = tr.selection;
            const posAfter = $to.end();
            if ($to.nodeAfter) {
              if ($to.nodeAfter.isTextblock) {
                tr.setSelection(TextSelection.create(tr.doc, $to.pos + 1));
              } else if ($to.nodeAfter.isBlock) {
                tr.setSelection(NodeSelection.create(tr.doc, $to.pos));
              } else {
                tr.setSelection(TextSelection.create(tr.doc, $to.pos));
              }
            } else {
              const node = (_a = $to.parent.type.contentMatch.defaultType) == null ? void 0 : _a.create();
              if (node) {
                tr.insert(posAfter, node);
                tr.setSelection(TextSelection.create(tr.doc, posAfter + 1));
              }
            }
            tr.scrollIntoView();
          }
          return true;
        }).run();
      }
    };
  },
  addInputRules() {
    return [
      nodeInputRule({
        find: /^(?:---|—-|___\s|\*\*\*\s)$/,
        type: this.type
      })
    ];
  }
});
Node3.create({
  name: "doc",
  topNode: true,
  content: "block+"
});
Node3.create({
  name: "paragraph",
  priority: 1e3,
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  group: "block",
  content: "inline*",
  parseHTML() {
    return [{ tag: "p" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["p", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  addCommands() {
    return {
      setParagraph: () => ({ commands }) => {
        return commands.setNode(this.name);
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Alt-0": () => this.editor.commands.setParagraph()
    };
  }
});
Node3.create({
  name: "text",
  group: "inline"
});
var h = (tag, attributes) => {
  if (tag === "slot") {
    return 0;
  }
  if (tag instanceof Function) {
    return tag(attributes);
  }
  const { children, ...rest } = attributes != null ? attributes : {};
  if (tag === "svg") {
    throw new Error("SVG elements are not supported in the JSX syntax, use the array syntax instead");
  }
  return [tag, rest, children];
};
var starInputRegex$1 = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))$/;
var starPasteRegex$1 = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))/g;
var underscoreInputRegex$1 = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))$/;
var underscorePasteRegex$1 = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))/g;
Mark.create({
  name: "bold",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "strong"
      },
      {
        tag: "b",
        getAttrs: (node) => node.style.fontWeight !== "normal" && null
      },
      {
        style: "font-weight=400",
        clearMark: (mark) => mark.type.name === this.name
      },
      {
        style: "font-weight",
        getAttrs: (value) => /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return /* @__PURE__ */ h("strong", { ...mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), children: /* @__PURE__ */ h("slot", {}) });
  },
  addCommands() {
    return {
      setBold: () => ({ commands }) => {
        return commands.setMark(this.name);
      },
      toggleBold: () => ({ commands }) => {
        return commands.toggleMark(this.name);
      },
      unsetBold: () => ({ commands }) => {
        return commands.unsetMark(this.name);
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-b": () => this.editor.commands.toggleBold(),
      "Mod-B": () => this.editor.commands.toggleBold()
    };
  },
  addInputRules() {
    return [
      markInputRule({
        find: starInputRegex$1,
        type: this.type
      }),
      markInputRule({
        find: underscoreInputRegex$1,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      markPasteRule({
        find: starPasteRegex$1,
        type: this.type
      }),
      markPasteRule({
        find: underscorePasteRegex$1,
        type: this.type
      })
    ];
  }
});
var starInputRegex = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))$/;
var starPasteRegex = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))/g;
var underscoreInputRegex = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))$/;
var underscorePasteRegex = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))/g;
Mark.create({
  name: "italic",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "em"
      },
      {
        tag: "i",
        getAttrs: (node) => node.style.fontStyle !== "normal" && null
      },
      {
        style: "font-style=normal",
        clearMark: (mark) => mark.type.name === this.name
      },
      {
        style: "font-style=italic"
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["em", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  addCommands() {
    return {
      setItalic: () => ({ commands }) => {
        return commands.setMark(this.name);
      },
      toggleItalic: () => ({ commands }) => {
        return commands.toggleMark(this.name);
      },
      unsetItalic: () => ({ commands }) => {
        return commands.unsetMark(this.name);
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-i": () => this.editor.commands.toggleItalic(),
      "Mod-I": () => this.editor.commands.toggleItalic()
    };
  },
  addInputRules() {
    return [
      markInputRule({
        find: starInputRegex,
        type: this.type
      }),
      markInputRule({
        find: underscoreInputRegex,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      markPasteRule({
        find: starPasteRegex,
        type: this.type
      }),
      markPasteRule({
        find: underscorePasteRegex,
        type: this.type
      })
    ];
  }
});
var inputRegex$1 = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))$/;
var pasteRegex = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))/g;
Mark.create({
  name: "strike",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "s"
      },
      {
        tag: "del"
      },
      {
        tag: "strike"
      },
      {
        style: "text-decoration",
        consuming: false,
        getAttrs: (style) => style.includes("line-through") ? {} : false
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["s", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  addCommands() {
    return {
      setStrike: () => ({ commands }) => {
        return commands.setMark(this.name);
      },
      toggleStrike: () => ({ commands }) => {
        return commands.toggleMark(this.name);
      },
      unsetStrike: () => ({ commands }) => {
        return commands.unsetMark(this.name);
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-s": () => this.editor.commands.toggleStrike()
    };
  },
  addInputRules() {
    return [
      markInputRule({
        find: inputRegex$1,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      markPasteRule({
        find: pasteRegex,
        type: this.type
      })
    ];
  }
});
var inputRegex = /^\s*>\s$/;
Node3.create({
  name: "blockquote",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  content: "block+",
  group: "block",
  defining: true,
  parseHTML() {
    return [{ tag: "blockquote" }];
  },
  renderHTML({ HTMLAttributes }) {
    return /* @__PURE__ */ h("blockquote", { ...mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), children: /* @__PURE__ */ h("slot", {}) });
  },
  addCommands() {
    return {
      setBlockquote: () => ({ commands }) => {
        return commands.wrapIn(this.name);
      },
      toggleBlockquote: () => ({ commands }) => {
        return commands.toggleWrap(this.name);
      },
      unsetBlockquote: () => ({ commands }) => {
        return commands.lift(this.name);
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-b": () => this.editor.commands.toggleBlockquote()
    };
  },
  addInputRules() {
    return [
      wrappingInputRule({
        find: inputRegex,
        type: this.type
      })
    ];
  }
});
Node3.create({
  name: "heading",
  addOptions() {
    return {
      levels: [1, 2, 3, 4, 5, 6],
      HTMLAttributes: {}
    };
  },
  content: "inline*",
  group: "block",
  defining: true,
  addAttributes() {
    return {
      level: {
        default: 1,
        rendered: false
      }
    };
  },
  parseHTML() {
    return this.options.levels.map((level) => ({
      tag: `h${level}`,
      attrs: { level }
    }));
  },
  renderHTML({ node, HTMLAttributes }) {
    const hasLevel = this.options.levels.includes(node.attrs.level);
    const level = hasLevel ? node.attrs.level : this.options.levels[0];
    return [`h${level}`, mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  addCommands() {
    return {
      setHeading: (attributes) => ({ commands }) => {
        if (!this.options.levels.includes(attributes.level)) {
          return false;
        }
        return commands.setNode(this.name, attributes);
      },
      toggleHeading: (attributes) => ({ commands }) => {
        if (!this.options.levels.includes(attributes.level)) {
          return false;
        }
        return commands.toggleNode(this.name, "paragraph", attributes);
      }
    };
  },
  addKeyboardShortcuts() {
    return this.options.levels.reduce(
      (items, level) => ({
        ...items,
        ...{
          [`Mod-Alt-${level}`]: () => this.editor.commands.toggleHeading({ level })
        }
      }),
      {}
    );
  },
  addInputRules() {
    return this.options.levels.map((level) => {
      return textblockTypeInputRule({
        find: new RegExp(`^(#{${Math.min(...this.options.levels)},${level}})\\s$`),
        type: this.type,
        getAttributes: {
          level
        }
      });
    });
  }
});
const _sfc_main$n = /* @__PURE__ */ defineComponent({
  __name: "TiptapEditor",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    disabled: { type: Boolean },
    timer: { default: 1e4 }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isChanged = ref(false);
    const editor = useEditor({
      content: props.modelValue
    });
    watch(() => props.modelValue, () => {
      var _a, _b;
      (_a = editor.value) == null ? void 0 : _a.commands.setContent(props.modelValue);
      (_b = editor.value) == null ? void 0 : _b.setEditable(!props.disabled);
    });
    watch(() => props.disabled, () => {
      var _a;
      (_a = editor.value) == null ? void 0 : _a.setEditable(!props.disabled);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = _sfc_main$t;
      const _component_TiptapEditorContent = EditorContent;
      if (unref(editor)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "editor" }, _attrs))}>`);
        if (!__props.disabled) {
          _push(`<div class="flex items-center gap-0.5 rounded-sm mb-2"><div class="bg-gray-300 p-0.5 rounded">`);
          _push(ssrRenderComponent(_component_Button, {
            type: "button",
            size: "sm",
            variant: "ghost",
            onClick: ($event) => unref(editor).chain().focus().toggleBold().run(),
            disabled: !unref(editor).can().chain().focus().toggleBold().run(),
            class: { "is-active": unref(editor).isActive("bold") }
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(BoldIcon), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(BoldIcon))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(_component_Button, {
            type: "button",
            size: "sm",
            variant: "ghost",
            onClick: ($event) => unref(editor).chain().focus().toggleItalic().run(),
            disabled: !unref(editor).can().chain().focus().toggleItalic().run(),
            class: { "is-active": unref(editor).isActive("italic") }
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(ItalicIcon), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(ItalicIcon))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(_component_Button, {
            type: "button",
            size: "sm",
            variant: "ghost",
            onClick: ($event) => unref(editor).chain().focus().toggleUnderline().run(),
            disabled: !unref(editor).can().chain().focus().toggleUnderline().run(),
            class: { "is-active": unref(editor).isActive("underline") }
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(UnderlineIcon), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(UnderlineIcon))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(_component_Button, {
            type: "button",
            size: "sm",
            variant: "ghost",
            onClick: ($event) => unref(editor).chain().focus().toggleStrike().run(),
            disabled: !unref(editor).can().chain().focus().toggleStrike().run(),
            class: { "is-active": unref(editor).isActive("strike") }
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(StrikethroughIcon), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(StrikethroughIcon))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div><div class="bg-gray-300 p-0.5 rounded">`);
          _push(ssrRenderComponent(_component_Button, {
            type: "button",
            size: "sm",
            variant: "ghost",
            onClick: ($event) => unref(editor).chain().focus().unsetAllMarks().run()
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(XIcon), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(XIcon))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(_component_Button, {
            type: "button",
            size: "sm",
            variant: "ghost",
            onClick: ($event) => unref(editor).chain().focus().clearNodes().run()
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(RotateCcwIcon), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(RotateCcwIcon))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(_component_Button, {
            type: "button",
            size: "sm",
            variant: "ghost",
            onClick: ($event) => unref(editor).chain().focus().setParagraph().run(),
            class: { "is-active": unref(editor).isActive("paragraph") }
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(WrapTextIcon), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(WrapTextIcon))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div><div class="bg-gray-300 p-0.5 rounded">`);
          _push(ssrRenderComponent(_component_Button, {
            type: "button",
            size: "sm",
            variant: "ghost",
            onClick: ($event) => unref(editor).chain().focus().toggleHeading({ level: 1 }).run(),
            class: { "is-active": unref(editor).isActive("heading", { level: 1 }) }
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(Heading1Icon), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(Heading1Icon))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(_component_Button, {
            type: "button",
            size: "sm",
            variant: "ghost",
            onClick: ($event) => unref(editor).chain().focus().toggleHeading({ level: 2 }).run(),
            class: { "is-active": unref(editor).isActive("heading", { level: 2 }) }
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(Heading2Icon), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(Heading2Icon))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(_component_Button, {
            type: "button",
            size: "sm",
            variant: "ghost",
            onClick: ($event) => unref(editor).chain().focus().toggleHeading({ level: 3 }).run(),
            class: { "is-active": unref(editor).isActive("heading", { level: 3 }) }
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(Heading3Icon), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(Heading3Icon))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(_component_Button, {
            type: "button",
            size: "sm",
            variant: "ghost",
            onClick: ($event) => unref(editor).chain().focus().toggleHeading({ level: 4 }).run(),
            class: { "is-active": unref(editor).isActive("heading", { level: 4 }) }
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(Heading4Icon), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(Heading4Icon))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(_component_Button, {
            type: "button",
            size: "sm",
            variant: "ghost",
            onClick: ($event) => unref(editor).chain().focus().toggleHeading({ level: 5 }).run(),
            class: { "is-active": unref(editor).isActive("heading", { level: 5 }) }
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(Heading5Icon), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(Heading5Icon))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(_component_Button, {
            type: "button",
            size: "sm",
            variant: "ghost",
            onClick: ($event) => unref(editor).chain().focus().toggleHeading({ level: 6 }).run(),
            class: { "is-active": unref(editor).isActive("heading", { level: 6 }) }
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(Heading6Icon), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(Heading6Icon))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div><div class="bg-gray-300 p-0.5 rounded">`);
          _push(ssrRenderComponent(_component_Button, {
            type: "button",
            size: "sm",
            variant: "ghost",
            onClick: ($event) => unref(editor).chain().focus().toggleBulletList().run(),
            class: { "is-active": unref(editor).isActive("bulletList") }
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(ListIcon), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(ListIcon))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(_component_Button, {
            type: "button",
            size: "sm",
            variant: "ghost",
            onClick: ($event) => unref(editor).chain().focus().toggleOrderedList().run(),
            class: { "is-active": unref(editor).isActive("orderedList") }
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(ListOrderedIcon), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(ListOrderedIcon))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div><div class="bg-gray-300 p-0.5 rounded">`);
          _push(ssrRenderComponent(_component_Button, {
            type: "button",
            size: "sm",
            variant: "ghost",
            onClick: ($event) => unref(editor).chain().focus().toggleBlockquote().run(),
            class: { "is-active": unref(editor).isActive("blockquote") }
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(QuoteIcon), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(QuoteIcon))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(_component_Button, {
            type: "button",
            size: "sm",
            variant: "ghost",
            onClick: ($event) => unref(editor).chain().focus().setHorizontalRule().run()
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(MinusIcon), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(MinusIcon))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div><div class="bg-gray-300 p-0.5 rounded">`);
          _push(ssrRenderComponent(_component_Button, {
            type: "button",
            size: "sm",
            variant: "ghost",
            onClick: ($event) => unref(editor).chain().focus().undo().run(),
            disabled: !unref(editor).can().chain().focus().undo().run()
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(UndoIcon), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(UndoIcon))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(_component_Button, {
            type: "button",
            size: "sm",
            variant: "ghost",
            onClick: ($event) => unref(editor).chain().focus().redo().run(),
            disabled: !unref(editor).can().chain().focus().redo().run()
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(RedoIcon), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(RedoIcon))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
          if (unref(isChanged)) {
            _push(ssrRenderComponent(unref(LoaderCircleIcon), {
              class: "text-green-600 animate-spin",
              size: 16
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_TiptapEditorContent, {
          class: "content_editor p-3 bg-gray-100 text-gray-600 rounded-sm focus:outline-0",
          editor: unref(editor)
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TiptapEditor.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  __name: "description",
  __ssrInlineRender: true,
  props: {
    trailRace: {}
  },
  emits: ["update"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const route = useRoute();
    const { saveDescription } = useEventStore();
    const { can } = useAuthorization();
    const eventDescription = ref("");
    const isLoading = ref(false);
    const isSaved = ref(false);
    watch(eventDescription, async (newDescription) => {
      var _a;
      const hasChanged = newDescription !== ((_a = props.trailRace) == null ? void 0 : _a.description);
      if (hasChanged) {
        isLoading.value = true;
        await saveDescription(route.params.id, eventDescription.value);
        emit("update");
        isLoading.value = false;
        isSaved.value = true;
      }
    });
    watch(() => props.trailRace, () => {
      if (props.trailRace)
        eventDescription.value = props.trailRace.description || "";
    });
    watch(isSaved, () => {
      if (isSaved.value)
        setTimeout(() => {
          isSaved.value = false;
        }, 2e3);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TiptapEditor = _sfc_main$n;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mb-2" }, _attrs))}><div class="flex"><h2 class="text-xs uppercase grow mb-2">Description</h2><div class="flex gap-1 text-sm items-center">`);
      if (unref(isLoading)) {
        _push(ssrRenderComponent(unref(LoaderIcon), {
          class: "loading",
          size: 16
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(isSaved)) {
        _push(`<span class="text-green-700 flex gap-0.5 items-center">`);
        _push(ssrRenderComponent(unref(SaveIcon), { size: 16 }, null, _parent));
        _push(` saved </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_TiptapEditor, {
        modelValue: unref(eventDescription),
        "onUpdate:modelValue": ($event) => isRef(eventDescription) ? eventDescription.value = $event : null,
        disabled: unref(isLoading) || !unref(can)("event_edit")
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/dashboard/event/description.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  __name: "mapUpload",
  __ssrInlineRender: true,
  props: {
    trailRace: {}
  },
  emits: ["update"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const { axios } = useAxios();
    const emit = __emit;
    const showMap = ref(false);
    const saving = ref(false);
    ref(false);
    const fileToUpload = ref("");
    const fileName = ref(null);
    const saveFile = async () => {
      saving.value = true;
      await axios.put(`/events/${props.trailRace.id}/upload_map_file`, {
        file: fileToUpload.value
      });
      saving.value = false;
      emit("update");
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_Button = _sfc_main$t;
      const _component_Dialog = _sfc_main$4$1;
      const _component_DialogContent = _sfc_main$2$1;
      const _component_DialogHeader = _sfc_main$u;
      const _component_DialogTitle = _sfc_main$v;
      const _component_DialogDescription = _sfc_main$1$1;
      const _component_Map = __nuxt_component_11;
      _push(`<!--[--><div class="flex flex-wrap gap-2 items-center"><h2 class="text-xs uppercase grow mb-2">Upload map file</h2><div class="flex gap-2">`);
      if (unref(fileToUpload)) {
        _push(ssrRenderComponent(_component_Button, {
          variant: "secondary",
          size: "sm",
          onClick: saveFile,
          disabled: unref(saving),
          permissions: "event_edit"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (!unref(saving)) {
                _push2(ssrRenderComponent(unref(SaveIcon), null, null, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(unref(LoaderIcon), { class: "animate-spin relative" }, null, _parent2, _scopeId));
              }
              _push2(` Save `);
            } else {
              return [
                !unref(saving) ? (openBlock(), createBlock(unref(SaveIcon), { key: 0 })) : (openBlock(), createBlock(unref(LoaderIcon), {
                  key: 1,
                  class: "animate-spin relative"
                })),
                createTextVNode(" Save ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_Button, {
        variant: "destructive",
        size: "icon",
        onClick: ($event) => showMap.value = true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(MapIcon), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(MapIcon))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><label class="w-full text-center block p-3 border border-dashed rounded-md"><input type="file" class="hidden" accept=".gpx"><span>${ssrInterpolate((_a = unref(fileName)) != null ? _a : "Upload .gpx file")}</span></label></div>`);
      _push(ssrRenderComponent(_component_Dialog, {
        open: unref(showMap),
        "onUpdate:open": ($event) => showMap.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_DialogContent, { class: "sm:max-w-[1000px]" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a2, _b;
                if (_push3) {
                  _push3(ssrRenderComponent(_component_DialogHeader, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_DialogTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Map`);
                            } else {
                              return [
                                createTextVNode("Map")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_DialogDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Some text`);
                            } else {
                              return [
                                createTextVNode("Some text")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_DialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Map")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_DialogDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Some text")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Map, {
                    "map-id": "someId",
                    center: [27.756846786775668, 85.3124535214843],
                    gpxFile: unref(getGPXFile)((_a2 = __props.trailRace.map_file) == null ? void 0 : _a2.file_name)
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_DialogHeader, null, {
                      default: withCtx(() => [
                        createVNode(_component_DialogTitle, null, {
                          default: withCtx(() => [
                            createTextVNode("Map")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_DialogDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Some text")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Map, {
                      "map-id": "someId",
                      center: [27.756846786775668, 85.3124535214843],
                      gpxFile: unref(getGPXFile)((_b = __props.trailRace.map_file) == null ? void 0 : _b.file_name)
                    }, null, 8, ["gpxFile"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_DialogContent, { class: "sm:max-w-[1000px]" }, {
                default: withCtx(() => {
                  var _a2;
                  return [
                    createVNode(_component_DialogHeader, null, {
                      default: withCtx(() => [
                        createVNode(_component_DialogTitle, null, {
                          default: withCtx(() => [
                            createTextVNode("Map")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_DialogDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Some text")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Map, {
                      "map-id": "someId",
                      center: [27.756846786775668, 85.3124535214843],
                      gpxFile: unref(getGPXFile)((_a2 = __props.trailRace.map_file) == null ? void 0 : _a2.file_name)
                    }, null, 8, ["gpxFile"])
                  ];
                }),
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
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/dashboard/event/mapUpload.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const useStageStore = defineStore("stage", () => {
  const stages = ref([]);
  const isLoading = ref(false);
  const { axios } = useAxios();
  const fetch = async (eventId) => {
    isLoading.value = true;
    const { data } = await axios.get(`/events/${eventId}/stages`);
    if (data)
      stages.value = data;
    isLoading.value = false;
  };
  const save = async (eventId, formData) => {
    const method = formData.id ? "put" : "post";
    const url = formData.id ? `/events/stages/${formData.id}` : `/events/${eventId}/stages`;
    await axios[method](url, formData);
  };
  const destory = async (stageId) => {
    await axios.delete(`/events/stages/${stageId}`);
  };
  return {
    stages,
    isLoading,
    fetch,
    save,
    destory
  };
});
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "form",
  __ssrInlineRender: true,
  props: {
    eventId: {},
    stage: {}
  },
  emits: ["update"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { save } = useStageStore();
    const isLoading = ref(false);
    const thumbnailFile = ref("");
    const form = ref(null);
    const startDate = ref();
    const endDate = ref();
    const showFile = ref({
      thumbnail: false
    });
    const formSubmit = async (values) => {
      isLoading.value = true;
      await save(props.eventId, values);
      isLoading.value = false;
      emit("update");
    };
    const imageFileHandler = (event, fieldName) => {
      var _a;
      const files = (_a = event.target.files) != null ? _a : [];
      if ((files == null ? void 0 : files.length) == 0)
        return;
      const reader = new FileReader();
      const file = files[0];
      reader.onload = () => {
        thumbnailFile.value = file.name;
        if (form.value)
          form.value.setFieldValue(fieldName, reader.result);
      };
      if (file)
        reader.readAsDataURL(file);
    };
    const removeFile = (fieldName) => {
      if (form.value) {
        form.value.resetField(fieldName);
      }
    };
    const init = () => {
      if (form.value) {
        form.value.setFieldValue("event_id", props.eventId);
        if (props.stage) {
          form.value.setValues({
            id: props.stage.id,
            name: props.stage.name,
            excerpt: props.stage.excerpt,
            description: props.stage.description,
            location: props.stage.location,
            difficulty: props.stage.difficulty,
            distance: props.stage.distance,
            thumbnail: props.stage.thumbnail.file_name
          });
          if (props.stage.thumbnail.file_name)
            showFile.value.thumbnail = true;
        }
      }
    };
    watch(startDate, () => {
      if (form.value)
        form.value.setFieldValue("start", `${startDate.value.year}-${startDate.value.month}-${startDate.value.day}`);
    });
    watch(endDate, () => {
      if (form.value)
        form.value.setFieldValue("end", `${endDate.value.year}-${endDate.value.month}-${endDate.value.day}`);
    });
    watch(form, () => {
      init();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = _sfc_main$t;
      const _component_Input = _sfc_main$A;
      const _component_Label = _sfc_main$B;
      const _component_Textarea = _sfc_main$C;
      const _component_TiptapEditor = _sfc_main$n;
      _push(ssrRenderComponent(unref(Form), mergeProps({
        onSubmit: formSubmit,
        "validation-schema": unref(stageSchema),
        class: "flex flex-col gap-4 relative",
        ref_key: "form",
        ref: form
      }, _attrs), {
        default: withCtx(({ values }, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            if (unref(showFile).thumbnail) {
              _push2(`<div class="w-full h-[480px] relative"${_scopeId}><img${ssrRenderAttr("src", unref(showImage)((_a = __props.stage) == null ? void 0 : _a.thumbnail.file_name))} class="size-full object-cover"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Button, {
                onClick: ($event) => unref(showFile).thumbnail = false,
                class: "absolute top-2 right-2"
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`change image`);
                  } else {
                    return [
                      createTextVNode("change image")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!--[-->`);
              if (values.thumbnail) {
                _push2(`<div class="w-full h-[480px]"${_scopeId}><img${ssrRenderAttr("src", values.thumbnail)} class="size-full object-cover"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Button, {
                  onClick: ($event) => unref(showFile).thumbnail = true,
                  class: "absolute top-2 right-2"
                }, {
                  default: withCtx((_, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`cancel`);
                    } else {
                      return [
                        createTextVNode("cancel")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="w-full flex flex-col gap-2 relative"${_scopeId}><label class="py-4 px-4 flex border border-dashed rounded-sm"${_scopeId}><input type="file" accept=".jpg, .jpeg, .png, image/jpeg, image/png" class="hidden"${_scopeId}><span class="text-gray-700 flex-grow"${_scopeId}>${ssrInterpolate(unref(thumbnailFile) ? unref(thumbnailFile) : "Upload image file")}</span></label>`);
              if (unref(thumbnailFile)) {
                _push2(ssrRenderComponent(_component_Button, {
                  type: "button",
                  onClick: () => {
                    removeFile("thumbnail");
                    thumbnailFile.value = "";
                  },
                  size: "icon",
                  modifier: "outline",
                  class: "absolute top-1/2 right-2 -translate-y-1/2"
                }, {
                  default: withCtx((_, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(unref(XIcon), null, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(unref(XIcon))
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(unref(ErrorMessage), { name: "thumbnail" }, null, _parent2, _scopeId));
              _push2(`</div><!--]-->`);
            }
            _push2(ssrRenderComponent(unref(Field), {
              name: "event_id",
              as: "div",
              class: "flex flex-col gap-2"
            }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Input, mergeProps({ type: "hidden" }, field, { id: "esf__name" }), null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Input, mergeProps({ type: "hidden" }, field, { id: "esf__name" }), null, 16)
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Field), {
              name: "id",
              as: "div",
              class: "flex flex-col gap-2"
            }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Input, mergeProps({ type: "hidden" }, field, { id: "esf__id" }), null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Input, mergeProps({ type: "hidden" }, field, { id: "esf__id" }), null, 16)
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Field), {
              name: "name",
              as: "div",
              class: "flex flex-col gap-2"
            }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Label, { for: "esf__name" }, {
                    default: withCtx((_, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Name`);
                      } else {
                        return [
                          createTextVNode("Name")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Input, mergeProps(field, { id: "esf__name" }), null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "name" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Label, { for: "esf__name" }, {
                      default: withCtx(() => [
                        createTextVNode("Name")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Input, mergeProps(field, { id: "esf__name" }), null, 16),
                    createVNode(unref(ErrorMessage), { name: "name" })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Field), {
              name: "excerpt",
              as: "div",
              class: "flex flex-col gap-2"
            }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Label, { for: "esf__excerpt" }, {
                    default: withCtx((_, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Excerpt`);
                      } else {
                        return [
                          createTextVNode("Excerpt")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Textarea, mergeProps(field, { id: "esf__excerpt" }), null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "excerpt" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Label, { for: "esf__excerpt" }, {
                      default: withCtx(() => [
                        createTextVNode("Excerpt")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Textarea, mergeProps(field, { id: "esf__excerpt" }), null, 16),
                    createVNode(unref(ErrorMessage), { name: "excerpt" })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Field), {
              name: "location",
              as: "div",
              class: "flex flex-col gap-2"
            }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Label, { for: "esf__location" }, {
                    default: withCtx((_, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Location`);
                      } else {
                        return [
                          createTextVNode("Location")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Input, mergeProps(field, { id: "esf__location" }), null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "location" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Label, { for: "esf__location" }, {
                      default: withCtx(() => [
                        createTextVNode("Location")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Input, mergeProps(field, { id: "esf__location" }), null, 16),
                    createVNode(unref(ErrorMessage), { name: "location" })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Field), {
              name: "description",
              as: "div",
              class: "flex flex-col gap-2"
            }, {
              default: withCtx(({ value, handleChange }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_TiptapEditor, {
                    "model-value": value != null ? value : "",
                    "onUpdate:modelValue": handleChange,
                    disabled: false,
                    timer: 1e3
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_TiptapEditor, {
                      "model-value": value != null ? value : "",
                      "onUpdate:modelValue": handleChange,
                      disabled: false,
                      timer: 1e3
                    }, null, 8, ["model-value", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`<div class="text-right"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Button, {
              type: "submit",
              disabled: unref(isLoading)
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(isLoading)) {
                    _push3(ssrRenderComponent(unref(LoaderIcon), { class: "animate-spin" }, null, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent(unref(SaveIcon), null, null, _parent3, _scopeId2));
                  }
                  _push3(` Save `);
                } else {
                  return [
                    unref(isLoading) ? (openBlock(), createBlock(unref(LoaderIcon), {
                      key: 0,
                      class: "animate-spin"
                    })) : (openBlock(), createBlock(unref(SaveIcon), { key: 1 })),
                    createTextVNode(" Save ")
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              unref(showFile).thumbnail ? (openBlock(), createBlock("div", {
                key: 0,
                class: "w-full h-[480px] relative"
              }, [
                createVNode("img", {
                  src: unref(showImage)((_b = __props.stage) == null ? void 0 : _b.thumbnail.file_name),
                  class: "size-full object-cover"
                }, null, 8, ["src"]),
                createVNode(_component_Button, {
                  onClick: ($event) => unref(showFile).thumbnail = false,
                  class: "absolute top-2 right-2"
                }, {
                  default: withCtx(() => [
                    createTextVNode("change image")
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                values.thumbnail ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "w-full h-[480px]"
                }, [
                  createVNode("img", {
                    src: values.thumbnail,
                    class: "size-full object-cover"
                  }, null, 8, ["src"]),
                  createVNode(_component_Button, {
                    onClick: ($event) => unref(showFile).thumbnail = true,
                    class: "absolute top-2 right-2"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("cancel")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "w-full flex flex-col gap-2 relative" }, [
                  createVNode("label", { class: "py-4 px-4 flex border border-dashed rounded-sm" }, [
                    createVNode("input", {
                      type: "file",
                      onChange: ($event) => imageFileHandler($event, "thumbnail"),
                      accept: ".jpg, .jpeg, .png, image/jpeg, image/png",
                      class: "hidden"
                    }, null, 40, ["onChange"]),
                    createVNode("span", { class: "text-gray-700 flex-grow" }, toDisplayString(unref(thumbnailFile) ? unref(thumbnailFile) : "Upload image file"), 1)
                  ]),
                  unref(thumbnailFile) ? (openBlock(), createBlock(_component_Button, {
                    key: 0,
                    type: "button",
                    onClick: () => {
                      removeFile("thumbnail");
                      thumbnailFile.value = "";
                    },
                    size: "icon",
                    modifier: "outline",
                    class: "absolute top-1/2 right-2 -translate-y-1/2"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(XIcon))
                    ]),
                    _: 1
                  }, 8, ["onClick"])) : createCommentVNode("", true),
                  createVNode(unref(ErrorMessage), { name: "thumbnail" })
                ])
              ], 64)),
              createVNode(unref(Field), {
                name: "event_id",
                as: "div",
                class: "flex flex-col gap-2"
              }, {
                default: withCtx(({ field }) => [
                  createVNode(_component_Input, mergeProps({ type: "hidden" }, field, { id: "esf__name" }), null, 16)
                ]),
                _: 1
              }),
              createVNode(unref(Field), {
                name: "id",
                as: "div",
                class: "flex flex-col gap-2"
              }, {
                default: withCtx(({ field }) => [
                  createVNode(_component_Input, mergeProps({ type: "hidden" }, field, { id: "esf__id" }), null, 16)
                ]),
                _: 1
              }),
              createVNode(unref(Field), {
                name: "name",
                as: "div",
                class: "flex flex-col gap-2"
              }, {
                default: withCtx(({ field }) => [
                  createVNode(_component_Label, { for: "esf__name" }, {
                    default: withCtx(() => [
                      createTextVNode("Name")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Input, mergeProps(field, { id: "esf__name" }), null, 16),
                  createVNode(unref(ErrorMessage), { name: "name" })
                ]),
                _: 1
              }),
              createVNode(unref(Field), {
                name: "excerpt",
                as: "div",
                class: "flex flex-col gap-2"
              }, {
                default: withCtx(({ field }) => [
                  createVNode(_component_Label, { for: "esf__excerpt" }, {
                    default: withCtx(() => [
                      createTextVNode("Excerpt")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Textarea, mergeProps(field, { id: "esf__excerpt" }), null, 16),
                  createVNode(unref(ErrorMessage), { name: "excerpt" })
                ]),
                _: 1
              }),
              createVNode(unref(Field), {
                name: "location",
                as: "div",
                class: "flex flex-col gap-2"
              }, {
                default: withCtx(({ field }) => [
                  createVNode(_component_Label, { for: "esf__location" }, {
                    default: withCtx(() => [
                      createTextVNode("Location")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Input, mergeProps(field, { id: "esf__location" }), null, 16),
                  createVNode(unref(ErrorMessage), { name: "location" })
                ]),
                _: 1
              }),
              createVNode(unref(Field), {
                name: "description",
                as: "div",
                class: "flex flex-col gap-2"
              }, {
                default: withCtx(({ value, handleChange }) => [
                  createVNode(_component_TiptapEditor, {
                    "model-value": value != null ? value : "",
                    "onUpdate:modelValue": handleChange,
                    disabled: false,
                    timer: 1e3
                  }, null, 8, ["model-value", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode("div", { class: "text-right" }, [
                createVNode(_component_Button, {
                  type: "submit",
                  disabled: unref(isLoading)
                }, {
                  default: withCtx(() => [
                    unref(isLoading) ? (openBlock(), createBlock(unref(LoaderIcon), {
                      key: 0,
                      class: "animate-spin"
                    })) : (openBlock(), createBlock(unref(SaveIcon), { key: 1 })),
                    createTextVNode(" Save ")
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/dashboard/event/stages/form.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "Form",
  __ssrInlineRender: true,
  props: {
    stageId: {},
    category: {}
  },
  emits: ["update"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const { axios } = useAxios();
    const isLoading = ref(false);
    const form = ref();
    const GPXFilename = ref("");
    const startDate = ref();
    const endDate = ref();
    const showFile = ref({
      map: false,
      thumbnail: false
    });
    const formSubmitted = async ({ id, ...formData }) => {
      isLoading.value = true;
      const method = id ? "put" : "post";
      const url = id ? `/events/${props.stageId}/stage_categories/${id}` : `/events/${props.stageId}/stage_categories`;
      await axios[method](url, formData);
      emit("update");
      isLoading.value = false;
    };
    const mapFileHandler = (event, fieldName) => {
      var _a;
      const files = (_a = event.target.files) != null ? _a : [];
      if ((files == null ? void 0 : files.length) == 0)
        return;
      const reader = new FileReader();
      const file = files[0];
      reader.onload = () => {
        GPXFilename.value = file.name;
        if (form.value)
          form.value.setFieldValue(fieldName, reader.result);
      };
      if (file)
        reader.readAsDataURL(file);
    };
    const removeFile = (fieldName) => {
      if (form.value) {
        form.value.resetField(fieldName);
      }
    };
    watch(startDate, () => {
      if (form.value)
        form.value.setFieldValue("start", `${startDate.value.year}-${startDate.value.month}-${startDate.value.day}`);
    });
    watch(endDate, () => {
      if (form.value)
        form.value.setFieldValue("end", `${endDate.value.year}-${endDate.value.month}-${endDate.value.day}`);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Input = _sfc_main$A;
      const _component_Label = _sfc_main$B;
      const _component_Textarea = _sfc_main$C;
      const _component_DatePicker = _sfc_main$G;
      const _component_Select = _sfc_main$6$1;
      const _component_SelectTrigger = _sfc_main$1$2;
      const _component_SelectValue = _sfc_main$x;
      const _component_SelectContent = _sfc_main$5$1;
      const _component_SelectItem = _sfc_main$4$2;
      const _component_TiptapEditor = _sfc_main$n;
      const _component_Button = _sfc_main$t;
      const _component_Dialog = _sfc_main$4$1;
      const _component_DialogTrigger = _sfc_main$H;
      const _component_DialogContent = _sfc_main$2$1;
      const _component_DialogTitle = _sfc_main$v;
      const _component_DialogDescription = _sfc_main$1$1;
      const _component_Map = __nuxt_component_11;
      _push(ssrRenderComponent(unref(Form), mergeProps({
        "validation-schema": unref(stageCategorySchema),
        onSubmit: formSubmitted,
        class: "flex flex-col gap-4",
        ref_key: "form",
        ref: form
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Field), { name: "id" }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Input, mergeProps({ type: "hidden" }, field), null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Input, mergeProps({ type: "hidden" }, field), null, 16)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Field), { name: "stage_id" }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Input, mergeProps({ type: "hidden" }, field), null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Input, mergeProps({ type: "hidden" }, field), null, 16)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Field), {
              name: "name",
              as: "div",
              class: "flex flex-col gap-1"
            }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Label, { for: "scf__name" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Name`);
                      } else {
                        return [
                          createTextVNode("Name")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Input, field, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "name" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Label, { for: "scf__name" }, {
                      default: withCtx(() => [
                        createTextVNode("Name")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Input, field, null, 16),
                    createVNode(unref(ErrorMessage), { name: "name" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Field), {
              name: "excerpt",
              as: "div",
              class: "flex flex-col gap-1"
            }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Label, { for: "scf__excerpt" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Short description`);
                      } else {
                        return [
                          createTextVNode("Short description")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Textarea, field, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "excerpt" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Label, { for: "scf__excerpt" }, {
                      default: withCtx(() => [
                        createTextVNode("Short description")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Textarea, field, null, 16),
                    createVNode(unref(ErrorMessage), { name: "excerpt" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="flex gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "start",
              as: "div",
              class: "w-1/4 flex flex-col gap-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Label, { for: "ef__start" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Start Date`);
                      } else {
                        return [
                          createTextVNode("Start Date")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_DatePicker, {
                    label: "Start date",
                    "model-value": unref(startDate),
                    "onUpdate:modelValue": (dob) => startDate.value = dob
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "start" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Label, { for: "ef__start" }, {
                      default: withCtx(() => [
                        createTextVNode("Start Date")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_DatePicker, {
                      label: "Start date",
                      "model-value": unref(startDate),
                      "onUpdate:modelValue": (dob) => startDate.value = dob
                    }, null, 8, ["model-value", "onUpdate:modelValue"]),
                    createVNode(unref(ErrorMessage), { name: "start" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Field), {
              name: "end",
              as: "div",
              class: "w-1/4 flex flex-col gap-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Label, { for: "ef__end" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`End Date`);
                      } else {
                        return [
                          createTextVNode("End Date")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_DatePicker, {
                    label: "End date",
                    "min-value": unref(startDate),
                    "model-value": unref(endDate),
                    "onUpdate:modelValue": (dob) => endDate.value = dob
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "end" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Label, { for: "ef__end" }, {
                      default: withCtx(() => [
                        createTextVNode("End Date")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_DatePicker, {
                      label: "End date",
                      "min-value": unref(startDate),
                      "model-value": unref(endDate),
                      "onUpdate:modelValue": (dob) => endDate.value = dob
                    }, null, 8, ["min-value", "model-value", "onUpdate:modelValue"]),
                    createVNode(unref(ErrorMessage), { name: "end" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Field), {
              name: "difficulty",
              as: "div",
              class: "w-1/4 flex flex-col gap-2"
            }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                var _a, _b;
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Label, { for: "ef__difficulty" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Difficulty`);
                      } else {
                        return [
                          createTextVNode("Difficulty")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Select, mergeProps(field, {
                    autocomplete: "sex",
                    "default-value": (_a = __props.category) == null ? void 0 : _a.difficulty
                  }), {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_SelectTrigger, { class: "w-full" }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_SelectValue, { placeholder: "Select a difficulty" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_SelectValue, { placeholder: "Select a difficulty" })
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_SelectContent, null, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(["moderate", "easy", "difficult"], (difficulty) => {
                                _push5(ssrRenderComponent(_component_SelectItem, { value: difficulty }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(difficulty)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(difficulty), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(), createBlock(Fragment, null, renderList(["moderate", "easy", "difficult"], (difficulty) => {
                                  return createVNode(_component_SelectItem, { value: difficulty }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(difficulty), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 64))
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_SelectTrigger, { class: "w-full" }, {
                            default: withCtx(() => [
                              createVNode(_component_SelectValue, { placeholder: "Select a difficulty" })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_SelectContent, null, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(["moderate", "easy", "difficult"], (difficulty) => {
                                return createVNode(_component_SelectItem, { value: difficulty }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(difficulty), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["value"]);
                              }), 64))
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "difficulty" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Label, { for: "ef__difficulty" }, {
                      default: withCtx(() => [
                        createTextVNode("Difficulty")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Select, mergeProps(field, {
                      autocomplete: "sex",
                      "default-value": (_b = __props.category) == null ? void 0 : _b.difficulty
                    }), {
                      default: withCtx(() => [
                        createVNode(_component_SelectTrigger, { class: "w-full" }, {
                          default: withCtx(() => [
                            createVNode(_component_SelectValue, { placeholder: "Select a difficulty" })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_SelectContent, null, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(Fragment, null, renderList(["moderate", "easy", "difficult"], (difficulty) => {
                              return createVNode(_component_SelectItem, { value: difficulty }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(difficulty), 1)
                                ]),
                                _: 2
                              }, 1032, ["value"]);
                            }), 64))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 16, ["default-value"]),
                    createVNode(unref(ErrorMessage), { name: "difficulty" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Field), {
              name: "distance",
              as: "div",
              class: "w-1/4 flex flex-col gap-2"
            }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Label, { for: "ef__distance" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Distance`);
                      } else {
                        return [
                          createTextVNode("Distance")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Input, mergeProps(field, { id: "ef__distance" }), null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "distance" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Label, { for: "ef__distance" }, {
                      default: withCtx(() => [
                        createTextVNode("Distance")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Input, mergeProps(field, { id: "ef__distance" }), null, 16),
                    createVNode(unref(ErrorMessage), { name: "distance" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "location",
              as: "div",
              class: "flex flex-col gap-1"
            }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Label, { for: "scf__location" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Location`);
                      } else {
                        return [
                          createTextVNode("Location")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Input, field, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "location" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Label, { for: "scf__location" }, {
                      default: withCtx(() => [
                        createTextVNode("Location")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Input, field, null, 16),
                    createVNode(unref(ErrorMessage), { name: "location" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Field), {
              name: "description",
              as: "div",
              class: "flex flex-col gap-2"
            }, {
              default: withCtx(({ value, handleChange }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_TiptapEditor, {
                    "model-value": value != null ? value : "",
                    "onUpdate:modelValue": handleChange,
                    disabled: false,
                    timer: 1e3
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "description" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_TiptapEditor, {
                      "model-value": value != null ? value : "",
                      "onUpdate:modelValue": handleChange,
                      disabled: false,
                      timer: 1e3
                    }, null, 8, ["model-value", "onUpdate:modelValue"]),
                    createVNode(unref(ErrorMessage), { name: "description" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="flex flex-col gap-2 relative"${_scopeId}>`);
            if (!unref(showFile).map) {
              _push2(`<!--[--><label class="py-4 px-4 flex border border-dashed rounded-sm"${_scopeId}><input type="file" accept=".gpx" class="hidden"${_scopeId}><span class="text-gray-700 flex-grow"${_scopeId}>${ssrInterpolate(unref(GPXFilename) ? unref(GPXFilename) : "Upload GPX file")}</span></label>`);
              if (unref(GPXFilename)) {
                _push2(ssrRenderComponent(_component_Button, {
                  type: "button",
                  onClick: () => {
                    removeFile("map");
                    GPXFilename.value = "";
                  },
                  size: "icon",
                  modifier: "outline",
                  class: "absolute top-1/2 right-2 -translate-y-1/2"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(unref(XIcon), null, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(unref(XIcon))
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(unref(ErrorMessage), { name: "map" }, null, _parent2, _scopeId));
              _push2(`<!--]-->`);
            } else {
              _push2(ssrRenderComponent(_component_Dialog, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_DialogTrigger, { "as-child": "" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_Button, {
                            type: "button",
                            size: "icon",
                            variant: "ghost"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(MapIcon), null, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(MapIcon))
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_Button, {
                              type: "button",
                              size: "icon",
                              variant: "ghost"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(MapIcon))
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_DialogContent, { class: "sm:max-w-[1000px]" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        var _a, _b;
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_DialogTitle, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              var _a2, _b2;
                              if (_push5) {
                                _push5(`${ssrInterpolate((_a2 = __props.category) == null ? void 0 : _a2.name)}&#39;s map`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString((_b2 = __props.category) == null ? void 0 : _b2.name) + "'s map", 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_DialogDescription, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`lorem`);
                              } else {
                                return [
                                  createTextVNode("lorem")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_Map, {
                            "gpx-file": unref(getGPXFile)((_a = __props.category) == null ? void 0 : _a.map_file.file_name)
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_DialogTitle, null, {
                              default: withCtx(() => {
                                var _a2;
                                return [
                                  createTextVNode(toDisplayString((_a2 = __props.category) == null ? void 0 : _a2.name) + "'s map", 1)
                                ];
                              }),
                              _: 1
                            }),
                            createVNode(_component_DialogDescription, null, {
                              default: withCtx(() => [
                                createTextVNode("lorem")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_Map, {
                              "gpx-file": unref(getGPXFile)((_b = __props.category) == null ? void 0 : _b.map_file.file_name)
                            }, null, 8, ["gpx-file"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_DialogTrigger, { "as-child": "" }, {
                        default: withCtx(() => [
                          createVNode(_component_Button, {
                            type: "button",
                            size: "icon",
                            variant: "ghost"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(MapIcon))
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_DialogContent, { class: "sm:max-w-[1000px]" }, {
                        default: withCtx(() => {
                          var _a;
                          return [
                            createVNode(_component_DialogTitle, null, {
                              default: withCtx(() => {
                                var _a2;
                                return [
                                  createTextVNode(toDisplayString((_a2 = __props.category) == null ? void 0 : _a2.name) + "'s map", 1)
                                ];
                              }),
                              _: 1
                            }),
                            createVNode(_component_DialogDescription, null, {
                              default: withCtx(() => [
                                createTextVNode("lorem")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_Map, {
                              "gpx-file": unref(getGPXFile)((_a = __props.category) == null ? void 0 : _a.map_file.file_name)
                            }, null, 8, ["gpx-file"])
                          ];
                        }),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }
            _push2(`</div><div class="text-right"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Button, {
              type: "submit",
              disabled: unref(isLoading)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(isLoading)) {
                    _push3(ssrRenderComponent(unref(LoaderIcon), { class: "animate-spin" }, null, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent(unref(SaveIcon), null, null, _parent3, _scopeId2));
                  }
                  _push3(` Save `);
                } else {
                  return [
                    unref(isLoading) ? (openBlock(), createBlock(unref(LoaderIcon), {
                      key: 0,
                      class: "animate-spin"
                    })) : (openBlock(), createBlock(unref(SaveIcon), { key: 1 })),
                    createTextVNode(" Save ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode(unref(Field), { name: "id" }, {
                default: withCtx(({ field }) => [
                  createVNode(_component_Input, mergeProps({ type: "hidden" }, field), null, 16)
                ]),
                _: 1
              }),
              createVNode(unref(Field), { name: "stage_id" }, {
                default: withCtx(({ field }) => [
                  createVNode(_component_Input, mergeProps({ type: "hidden" }, field), null, 16)
                ]),
                _: 1
              }),
              createVNode(unref(Field), {
                name: "name",
                as: "div",
                class: "flex flex-col gap-1"
              }, {
                default: withCtx(({ field }) => [
                  createVNode(_component_Label, { for: "scf__name" }, {
                    default: withCtx(() => [
                      createTextVNode("Name")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Input, field, null, 16),
                  createVNode(unref(ErrorMessage), { name: "name" })
                ]),
                _: 1
              }),
              createVNode(unref(Field), {
                name: "excerpt",
                as: "div",
                class: "flex flex-col gap-1"
              }, {
                default: withCtx(({ field }) => [
                  createVNode(_component_Label, { for: "scf__excerpt" }, {
                    default: withCtx(() => [
                      createTextVNode("Short description")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Textarea, field, null, 16),
                  createVNode(unref(ErrorMessage), { name: "excerpt" })
                ]),
                _: 1
              }),
              createVNode("div", { class: "flex gap-4" }, [
                createVNode(unref(Field), {
                  name: "start",
                  as: "div",
                  class: "w-1/4 flex flex-col gap-2"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_Label, { for: "ef__start" }, {
                      default: withCtx(() => [
                        createTextVNode("Start Date")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_DatePicker, {
                      label: "Start date",
                      "model-value": unref(startDate),
                      "onUpdate:modelValue": (dob) => startDate.value = dob
                    }, null, 8, ["model-value", "onUpdate:modelValue"]),
                    createVNode(unref(ErrorMessage), { name: "start" })
                  ]),
                  _: 1
                }),
                createVNode(unref(Field), {
                  name: "end",
                  as: "div",
                  class: "w-1/4 flex flex-col gap-2"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_Label, { for: "ef__end" }, {
                      default: withCtx(() => [
                        createTextVNode("End Date")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_DatePicker, {
                      label: "End date",
                      "min-value": unref(startDate),
                      "model-value": unref(endDate),
                      "onUpdate:modelValue": (dob) => endDate.value = dob
                    }, null, 8, ["min-value", "model-value", "onUpdate:modelValue"]),
                    createVNode(unref(ErrorMessage), { name: "end" })
                  ]),
                  _: 1
                }),
                createVNode(unref(Field), {
                  name: "difficulty",
                  as: "div",
                  class: "w-1/4 flex flex-col gap-2"
                }, {
                  default: withCtx(({ field }) => {
                    var _a;
                    return [
                      createVNode(_component_Label, { for: "ef__difficulty" }, {
                        default: withCtx(() => [
                          createTextVNode("Difficulty")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Select, mergeProps(field, {
                        autocomplete: "sex",
                        "default-value": (_a = __props.category) == null ? void 0 : _a.difficulty
                      }), {
                        default: withCtx(() => [
                          createVNode(_component_SelectTrigger, { class: "w-full" }, {
                            default: withCtx(() => [
                              createVNode(_component_SelectValue, { placeholder: "Select a difficulty" })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_SelectContent, null, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(["moderate", "easy", "difficult"], (difficulty) => {
                                return createVNode(_component_SelectItem, { value: difficulty }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(difficulty), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["value"]);
                              }), 64))
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 16, ["default-value"]),
                      createVNode(unref(ErrorMessage), { name: "difficulty" })
                    ];
                  }),
                  _: 1
                }),
                createVNode(unref(Field), {
                  name: "distance",
                  as: "div",
                  class: "w-1/4 flex flex-col gap-2"
                }, {
                  default: withCtx(({ field }) => [
                    createVNode(_component_Label, { for: "ef__distance" }, {
                      default: withCtx(() => [
                        createTextVNode("Distance")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Input, mergeProps(field, { id: "ef__distance" }), null, 16),
                    createVNode(unref(ErrorMessage), { name: "distance" })
                  ]),
                  _: 1
                })
              ]),
              createVNode(unref(Field), {
                name: "location",
                as: "div",
                class: "flex flex-col gap-1"
              }, {
                default: withCtx(({ field }) => [
                  createVNode(_component_Label, { for: "scf__location" }, {
                    default: withCtx(() => [
                      createTextVNode("Location")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Input, field, null, 16),
                  createVNode(unref(ErrorMessage), { name: "location" })
                ]),
                _: 1
              }),
              createVNode(unref(Field), {
                name: "description",
                as: "div",
                class: "flex flex-col gap-2"
              }, {
                default: withCtx(({ value, handleChange }) => [
                  createVNode(_component_TiptapEditor, {
                    "model-value": value != null ? value : "",
                    "onUpdate:modelValue": handleChange,
                    disabled: false,
                    timer: 1e3
                  }, null, 8, ["model-value", "onUpdate:modelValue"]),
                  createVNode(unref(ErrorMessage), { name: "description" })
                ]),
                _: 1
              }),
              createVNode("div", { class: "flex flex-col gap-2 relative" }, [
                !unref(showFile).map ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                  createVNode("label", { class: "py-4 px-4 flex border border-dashed rounded-sm" }, [
                    createVNode("input", {
                      type: "file",
                      onChange: ($event) => mapFileHandler($event, "map"),
                      accept: ".gpx",
                      class: "hidden"
                    }, null, 40, ["onChange"]),
                    createVNode("span", { class: "text-gray-700 flex-grow" }, toDisplayString(unref(GPXFilename) ? unref(GPXFilename) : "Upload GPX file"), 1)
                  ]),
                  unref(GPXFilename) ? (openBlock(), createBlock(_component_Button, {
                    key: 0,
                    type: "button",
                    onClick: () => {
                      removeFile("map");
                      GPXFilename.value = "";
                    },
                    size: "icon",
                    modifier: "outline",
                    class: "absolute top-1/2 right-2 -translate-y-1/2"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(XIcon))
                    ]),
                    _: 1
                  }, 8, ["onClick"])) : createCommentVNode("", true),
                  createVNode(unref(ErrorMessage), { name: "map" })
                ], 64)) : (openBlock(), createBlock(_component_Dialog, { key: 1 }, {
                  default: withCtx(() => [
                    createVNode(_component_DialogTrigger, { "as-child": "" }, {
                      default: withCtx(() => [
                        createVNode(_component_Button, {
                          type: "button",
                          size: "icon",
                          variant: "ghost"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(MapIcon))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_DialogContent, { class: "sm:max-w-[1000px]" }, {
                      default: withCtx(() => {
                        var _a;
                        return [
                          createVNode(_component_DialogTitle, null, {
                            default: withCtx(() => {
                              var _a2;
                              return [
                                createTextVNode(toDisplayString((_a2 = __props.category) == null ? void 0 : _a2.name) + "'s map", 1)
                              ];
                            }),
                            _: 1
                          }),
                          createVNode(_component_DialogDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("lorem")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_Map, {
                            "gpx-file": unref(getGPXFile)((_a = __props.category) == null ? void 0 : _a.map_file.file_name)
                          }, null, 8, ["gpx-file"])
                        ];
                      }),
                      _: 1
                    })
                  ]),
                  _: 1
                }))
              ]),
              createVNode("div", { class: "text-right" }, [
                createVNode(_component_Button, {
                  type: "submit",
                  disabled: unref(isLoading)
                }, {
                  default: withCtx(() => [
                    unref(isLoading) ? (openBlock(), createBlock(unref(LoaderIcon), {
                      key: 0,
                      class: "animate-spin"
                    })) : (openBlock(), createBlock(unref(SaveIcon), { key: 1 })),
                    createTextVNode(" Save ")
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/dashboard/event/category/Form.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const useCheckpointStore = defineStore("checkpoints", () => {
  const checkpoints = ref([]);
  const isLoading = ref(false);
  const { axios } = useAxios();
  const fetch = async (stageId) => {
    isLoading.value = true;
    const { data } = await axios.get(`/events/${stageId}/checkpoints`);
    if (data)
      checkpoints.value = data;
    isLoading.value = false;
  };
  const save = async (eventId, formData) => {
    const method = formData.id ? "put" : "post";
    const url = formData.id ? `/events/checkpoints/${formData.id}` : `/events/${eventId}/checkpoints`;
    await axios[method](url, formData);
  };
  const destory = async (checkpointId) => {
    await axios.delete(`/events/checkpoints/${checkpointId}`);
  };
  const assignVolunteerToCheckpoint = async (volunteerId, values) => {
    await axios.patch(`events/checkpoints/assign_volunteer/${volunteerId}`, values);
  };
  return {
    checkpoints,
    isLoading,
    fetch,
    save,
    destory,
    assignVolunteerToCheckpoint
  };
});
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "form",
  __ssrInlineRender: true,
  props: {
    stageCategoryId: {},
    checkpoint: {}
  },
  emits: ["update"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { save } = useCheckpointStore();
    const isLoading = ref(false);
    const form = ref(null);
    const formSubmit = async (values) => {
      isLoading.value = true;
      await save(props.stageCategoryId, values);
      isLoading.value = false;
      emit("update");
      reset();
    };
    const init = () => {
      if (form.value) {
        form.value.setFieldValue("stage_category_id", props.stageCategoryId);
        if (props.checkpoint)
          form.value.setValues({
            id: props.checkpoint.id,
            name: props.checkpoint.name
          });
      }
    };
    const reset = () => {
      var _a;
      (_a = form.value) == null ? void 0 : _a.resetForm();
    };
    watch(form, () => {
      init();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Input = _sfc_main$A;
      const _component_Label = _sfc_main$B;
      const _component_Button = _sfc_main$t;
      _push(ssrRenderComponent(unref(Form), mergeProps({
        onSubmit: formSubmit,
        "validation-schema": unref(checkpointSchema),
        class: "flex flex-col gap-4",
        ref_key: "form",
        ref: form
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Field), {
              name: "stage_category_id",
              as: "div",
              class: "flex flex-col gap-2"
            }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Input, mergeProps({ type: "hidden" }, field, { id: "esf__name" }), null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Input, mergeProps({ type: "hidden" }, field, { id: "esf__name" }), null, 16)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Field), {
              name: "id",
              as: "div",
              class: "flex flex-col gap-2"
            }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Input, mergeProps({ type: "hidden" }, field, { id: "esf__id" }), null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Input, mergeProps({ type: "hidden" }, field, { id: "esf__id" }), null, 16)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Field), {
              name: "name",
              as: "div",
              class: "flex flex-col gap-2"
            }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Label, { for: "esf__name" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Name`);
                      } else {
                        return [
                          createTextVNode("Name")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Input, mergeProps(field, { id: "esf__name" }), null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "name" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Label, { for: "esf__name" }, {
                      default: withCtx(() => [
                        createTextVNode("Name")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Input, mergeProps(field, { id: "esf__name" }), null, 16),
                    createVNode(unref(ErrorMessage), { name: "name" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="text-right"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Button, {
              type: "submit",
              disabled: unref(isLoading)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(isLoading)) {
                    _push3(ssrRenderComponent(unref(LoaderIcon), null, null, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent(unref(SaveIcon), null, null, _parent3, _scopeId2));
                  }
                  _push3(` Save `);
                } else {
                  return [
                    unref(isLoading) ? (openBlock(), createBlock(unref(LoaderIcon), { key: 0 })) : (openBlock(), createBlock(unref(SaveIcon), { key: 1 })),
                    createTextVNode(" Save ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode(unref(Field), {
                name: "stage_category_id",
                as: "div",
                class: "flex flex-col gap-2"
              }, {
                default: withCtx(({ field }) => [
                  createVNode(_component_Input, mergeProps({ type: "hidden" }, field, { id: "esf__name" }), null, 16)
                ]),
                _: 1
              }),
              createVNode(unref(Field), {
                name: "id",
                as: "div",
                class: "flex flex-col gap-2"
              }, {
                default: withCtx(({ field }) => [
                  createVNode(_component_Input, mergeProps({ type: "hidden" }, field, { id: "esf__id" }), null, 16)
                ]),
                _: 1
              }),
              createVNode(unref(Field), {
                name: "name",
                as: "div",
                class: "flex flex-col gap-2"
              }, {
                default: withCtx(({ field }) => [
                  createVNode(_component_Label, { for: "esf__name" }, {
                    default: withCtx(() => [
                      createTextVNode("Name")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Input, mergeProps(field, { id: "esf__name" }), null, 16),
                  createVNode(unref(ErrorMessage), { name: "name" })
                ]),
                _: 1
              }),
              createVNode("div", { class: "text-right" }, [
                createVNode(_component_Button, {
                  type: "submit",
                  disabled: unref(isLoading)
                }, {
                  default: withCtx(() => [
                    unref(isLoading) ? (openBlock(), createBlock(unref(LoaderIcon), { key: 0 })) : (openBlock(), createBlock(unref(SaveIcon), { key: 1 })),
                    createTextVNode(" Save ")
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/dashboard/event/checkpoint/form.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "list",
  __ssrInlineRender: true,
  props: {
    stageCategoryId: {}
  },
  emits: ["update"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const { axios } = useAxios();
    const checkpoints = ref([]);
    const showDialog = ref(false);
    const editCheckpoint = ref(null);
    const fetch = async () => {
      const { data } = await axios.get(`/events/${props.stageCategoryId}/checkpoints`);
      checkpoints.value = data;
    };
    const destory = async (checkpointId) => {
      await axios.delete(`/events/checkpoints/${checkpointId}`);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = _sfc_main$t;
      const _component_Badge = _sfc_main$w;
      const _component_Dialog = _sfc_main$4$1;
      const _component_DialogContent = _sfc_main$2$1;
      const _component_DialogHeader = _sfc_main$u;
      const _component_DialogTitle = _sfc_main$v;
      const _component_DialogDescription = _sfc_main$1$1;
      _push(`<!--[--><div class="pt-8 pl-8"><div class="flex gap-2 pb-4 mb-5 border-b"><div class="grow"><h3>Checkpoints</h3></div>`);
      _push(ssrRenderComponent(_component_Button, {
        variant: "secondary",
        size: "sm",
        modifier: "outline",
        onClick: ($event) => showDialog.value = true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(PlusIcon), null, null, _parent2, _scopeId));
            _push2(` Add a Checkpoint `);
          } else {
            return [
              createVNode(unref(PlusIcon)),
              createTextVNode(" Add a Checkpoint ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><ul class="divide-y space-y-3"><!--[-->`);
      ssrRenderList(unref(checkpoints), (checkpoint) => {
        _push(`<li class="flex gap-2 pb-3"${ssrRenderAttr("value", checkpoint.id)}><div class="grow space-y-1"><strong class="block">${ssrInterpolate(checkpoint.name)}</strong>`);
        if (checkpoint.volunteers.length > 0) {
          _push(ssrRenderComponent(_component_Badge, { variant: "outline" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` has ${ssrInterpolate(checkpoint.volunteers.length)} volunteer${ssrInterpolate(checkpoint.volunteers.length > 1 ? "s" : "")} assigned `);
              } else {
                return [
                  createTextVNode(" has " + toDisplayString(checkpoint.volunteers.length) + " volunteer" + toDisplayString(checkpoint.volunteers.length > 1 ? "s" : "") + " assigned ", 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="flex justify-end gap-2">`);
        _push(ssrRenderComponent(_component_Button, {
          variant: "secondary",
          modifier: "outline",
          size: "icon",
          onClick: () => {
            showDialog.value = true;
            editCheckpoint.value = checkpoint;
          }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(PencilIcon), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(PencilIcon))
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(ssrRenderComponent(_component_Button, {
          modifier: "outline",
          variant: "destructive",
          size: "icon",
          onClick: async () => {
            await destory(checkpoint.id);
            await fetch();
          }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(TrashIcon), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(TrashIcon))
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></li>`);
      });
      _push(`<!--]--></ul></div>`);
      _push(ssrRenderComponent(_component_Dialog, {
        open: unref(showDialog),
        "onUpdate:open": ($event) => showDialog.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_DialogContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_DialogHeader, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_DialogTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Stage form`);
                            } else {
                              return [
                                createTextVNode("Stage form")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_DialogDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus assumenda, maxime distinctio at facere nesciunt vero eius neque voluptates numquam libero vel provident aliquam, iusto, dolorum non. Laboriosam, eveniet quibusdam.`);
                            } else {
                              return [
                                createTextVNode("Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus assumenda, maxime distinctio at facere nesciunt vero eius neque voluptates numquam libero vel provident aliquam, iusto, dolorum non. Laboriosam, eveniet quibusdam.")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_DialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Stage form")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_DialogDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus assumenda, maxime distinctio at facere nesciunt vero eius neque voluptates numquam libero vel provident aliquam, iusto, dolorum non. Laboriosam, eveniet quibusdam.")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$i, {
                    stageCategoryId: __props.stageCategoryId,
                    checkpoint: unref(editCheckpoint),
                    onUpdate: () => {
                      showDialog.value = false;
                      editCheckpoint.value = null;
                      fetch();
                      emit("update");
                    }
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_DialogHeader, null, {
                      default: withCtx(() => [
                        createVNode(_component_DialogTitle, null, {
                          default: withCtx(() => [
                            createTextVNode("Stage form")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_DialogDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus assumenda, maxime distinctio at facere nesciunt vero eius neque voluptates numquam libero vel provident aliquam, iusto, dolorum non. Laboriosam, eveniet quibusdam.")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_sfc_main$i, {
                      stageCategoryId: __props.stageCategoryId,
                      checkpoint: unref(editCheckpoint),
                      onUpdate: () => {
                        showDialog.value = false;
                        editCheckpoint.value = null;
                        fetch();
                        emit("update");
                      }
                    }, null, 8, ["stageCategoryId", "checkpoint", "onUpdate"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_DialogContent, null, {
                default: withCtx(() => [
                  createVNode(_component_DialogHeader, null, {
                    default: withCtx(() => [
                      createVNode(_component_DialogTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Stage form")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_DialogDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus assumenda, maxime distinctio at facere nesciunt vero eius neque voluptates numquam libero vel provident aliquam, iusto, dolorum non. Laboriosam, eveniet quibusdam.")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_sfc_main$i, {
                    stageCategoryId: __props.stageCategoryId,
                    checkpoint: unref(editCheckpoint),
                    onUpdate: () => {
                      showDialog.value = false;
                      editCheckpoint.value = null;
                      fetch();
                      emit("update");
                    }
                  }, null, 8, ["stageCategoryId", "checkpoint", "onUpdate"])
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
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/dashboard/event/checkpoint/list.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "form",
  __ssrInlineRender: true,
  props: {
    stageCategoryId: {},
    availablePayments: {},
    payment: {}
  },
  emits: ["update"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const { axios } = useAxios();
    const form = useTemplateRef("form");
    const isLoading = ref(false);
    const filteredPaymentTypes = computed(() => paymentTypes.filter((type) => !props.availablePayments.includes(type)));
    const handleSubmit = async (values) => {
      isLoading.value = true;
      const method = props.payment ? "put" : "post";
      const url = props.payment ? `/payments/${props.payment.id}` : "/payments";
      await axios[method](url, values);
      isLoading.value = false;
      emit("update");
    };
    const fileHandler = (event) => {
      const target = event.target;
      const files = target.files;
      if (files && files.length > 0) {
        const reader = new FileReader();
        reader.onload = (e) => {
          var _a, _b;
          (_b = form.value) == null ? void 0 : _b.setFieldValue("image", (_a = e.target) == null ? void 0 : _a.result);
        };
        reader.readAsDataURL(files[0]);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Input = _sfc_main$A;
      const _component_Select = _sfc_main$6$1;
      const _component_SelectTrigger = _sfc_main$1$2;
      const _component_SelectValue = _sfc_main$x;
      const _component_SelectContent = _sfc_main$5$1;
      const _component_SelectItem = _sfc_main$4$2;
      const _component_Button = _sfc_main$t;
      _push(`<!--[--><div class="flex items-center gap-2"><h1>Upload payment details here</h1></div>`);
      _push(ssrRenderComponent(unref(Form), {
        ref_key: "form",
        ref: form,
        "validation-schema": unref(stageCategoryPaymentSchema),
        onSubmit: handleSubmit,
        class: "space-y-4"
      }, {
        default: withCtx(({ values }, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Field), {
              name: "stage_category_id",
              type: "hidden",
              value: __props.stageCategoryId
            }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<input${ssrRenderAttrs(mergeProps({ type: "hidden" }, field))}${_scopeId2}>`);
                } else {
                  return [
                    createVNode("input", mergeProps({ type: "hidden" }, field), null, 16)
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Field), {
              name: "payment_id",
              type: "hidden",
              value: (_a = __props.payment) == null ? void 0 : _a.id
            }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<input${ssrRenderAttrs(mergeProps({ type: "hidden" }, field))}${_scopeId2}>`);
                } else {
                  return [
                    createVNode("input", mergeProps({ type: "hidden" }, field), null, 16)
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Field), {
              name: "amount",
              as: "div",
              class: "space-y-2"
            }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<label for="pf__amount"${_scopeId2}>Amount</label>`);
                  _push3(ssrRenderComponent(_component_Input, mergeProps(field, { id: "pf__amount" }), null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "amount" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("label", { for: "pf__amount" }, "Amount"),
                    createVNode(_component_Input, mergeProps(field, { id: "pf__amount" }), null, 16),
                    createVNode(unref(ErrorMessage), { name: "amount" })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Field), {
              name: "type",
              as: "div",
              class: "space-y-2"
            }, {
              default: withCtx(({ value, handleChange }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<label for="pf__type"${_scopeId2}>Payment Type</label>`);
                  _push3(ssrRenderComponent(_component_Select, {
                    "model-value": value,
                    id: "pf__type",
                    "onUpdate:modelValue": handleChange
                  }, {
                    default: withCtx((_, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_SelectTrigger, null, {
                          default: withCtx((_2, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_SelectValue, { placeholder: "Select payment type" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_SelectValue, { placeholder: "Select payment type" })
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_SelectContent, null, {
                          default: withCtx((_2, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(unref(filteredPaymentTypes), (paymentType) => {
                                _push5(ssrRenderComponent(_component_SelectItem, { value: paymentType }, {
                                  default: withCtx((_3, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(paymentType)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(paymentType), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(filteredPaymentTypes), (paymentType) => {
                                  return openBlock(), createBlock(_component_SelectItem, { value: paymentType }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(paymentType), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 256))
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_SelectTrigger, null, {
                            default: withCtx(() => [
                              createVNode(_component_SelectValue, { placeholder: "Select payment type" })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_SelectContent, null, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(filteredPaymentTypes), (paymentType) => {
                                return openBlock(), createBlock(_component_SelectItem, { value: paymentType }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(paymentType), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["value"]);
                              }), 256))
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "type" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("label", { for: "pf__type" }, "Payment Type"),
                    createVNode(_component_Select, {
                      "model-value": value,
                      id: "pf__type",
                      "onUpdate:modelValue": handleChange
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_SelectTrigger, null, {
                          default: withCtx(() => [
                            createVNode(_component_SelectValue, { placeholder: "Select payment type" })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_SelectContent, null, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(filteredPaymentTypes), (paymentType) => {
                              return openBlock(), createBlock(_component_SelectItem, { value: paymentType }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(paymentType), 1)
                                ]),
                                _: 2
                              }, 1032, ["value"]);
                            }), 256))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["model-value", "onUpdate:modelValue"]),
                    createVNode(unref(ErrorMessage), { name: "type" })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`<div class="space-y-2"${_scopeId}><label class="flex justify-center items-center p-3 border border-dashed border-gray-300 rounded-md"${_scopeId}><input type="file" accept="image/*" class="sr-only"${_scopeId}>`);
            if (((_b = __props.payment) == null ? void 0 : _b.screenshot) || values.image) {
              _push2(`<img${ssrRenderAttr("src", ((_c = __props.payment) == null ? void 0 : _c.screenshot) ? unref(showImage)((_d = __props.payment) == null ? void 0 : _d.screenshot.file_name) : values.image)} alt="Image" class="w-24 h-24 object-contain"${_scopeId}>`);
            } else {
              _push2(`<div class="text-center"${_scopeId}><strong class="text-lg block"${_scopeId}>Upload image</strong></div>`);
            }
            _push2(`</label>`);
            _push2(ssrRenderComponent(unref(ErrorMessage), { name: "image" }, null, _parent2, _scopeId));
            _push2(`</div><div class="text-right"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Button, {
              type: "submit",
              loading: unref(isLoading)
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(isLoading)) {
                    _push3(ssrRenderComponent(unref(LoaderIcon), { class: "mr-2 animate-spin" }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(` Submit `);
                } else {
                  return [
                    unref(isLoading) ? (openBlock(), createBlock(unref(LoaderIcon), {
                      key: 0,
                      class: "mr-2 animate-spin"
                    })) : createCommentVNode("", true),
                    createTextVNode(" Submit ")
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode(unref(Field), {
                name: "stage_category_id",
                type: "hidden",
                value: __props.stageCategoryId
              }, {
                default: withCtx(({ field }) => [
                  createVNode("input", mergeProps({ type: "hidden" }, field), null, 16)
                ]),
                _: 1
              }, 8, ["value"]),
              createVNode(unref(Field), {
                name: "payment_id",
                type: "hidden",
                value: (_e = __props.payment) == null ? void 0 : _e.id
              }, {
                default: withCtx(({ field }) => [
                  createVNode("input", mergeProps({ type: "hidden" }, field), null, 16)
                ]),
                _: 1
              }, 8, ["value"]),
              createVNode(unref(Field), {
                name: "amount",
                as: "div",
                class: "space-y-2"
              }, {
                default: withCtx(({ field }) => [
                  createVNode("label", { for: "pf__amount" }, "Amount"),
                  createVNode(_component_Input, mergeProps(field, { id: "pf__amount" }), null, 16),
                  createVNode(unref(ErrorMessage), { name: "amount" })
                ]),
                _: 1
              }),
              createVNode(unref(Field), {
                name: "type",
                as: "div",
                class: "space-y-2"
              }, {
                default: withCtx(({ value, handleChange }) => [
                  createVNode("label", { for: "pf__type" }, "Payment Type"),
                  createVNode(_component_Select, {
                    "model-value": value,
                    id: "pf__type",
                    "onUpdate:modelValue": handleChange
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_SelectTrigger, null, {
                        default: withCtx(() => [
                          createVNode(_component_SelectValue, { placeholder: "Select payment type" })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_SelectContent, null, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(filteredPaymentTypes), (paymentType) => {
                            return openBlock(), createBlock(_component_SelectItem, { value: paymentType }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(paymentType), 1)
                              ]),
                              _: 2
                            }, 1032, ["value"]);
                          }), 256))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["model-value", "onUpdate:modelValue"]),
                  createVNode(unref(ErrorMessage), { name: "type" })
                ]),
                _: 1
              }),
              createVNode("div", { class: "space-y-2" }, [
                createVNode("label", { class: "flex justify-center items-center p-3 border border-dashed border-gray-300 rounded-md" }, [
                  createVNode("input", {
                    type: "file",
                    accept: "image/*",
                    onChange: fileHandler,
                    class: "sr-only"
                  }, null, 32),
                  ((_f = __props.payment) == null ? void 0 : _f.screenshot) || values.image ? (openBlock(), createBlock("img", {
                    key: 0,
                    src: ((_g = __props.payment) == null ? void 0 : _g.screenshot) ? unref(showImage)((_h = __props.payment) == null ? void 0 : _h.screenshot.file_name) : values.image,
                    alt: "Image",
                    class: "w-24 h-24 object-contain"
                  }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "text-center"
                  }, [
                    createVNode("strong", { class: "text-lg block" }, "Upload image")
                  ]))
                ]),
                createVNode(unref(ErrorMessage), { name: "image" })
              ]),
              createVNode("div", { class: "text-right" }, [
                createVNode(_component_Button, {
                  type: "submit",
                  loading: unref(isLoading)
                }, {
                  default: withCtx(() => [
                    unref(isLoading) ? (openBlock(), createBlock(unref(LoaderIcon), {
                      key: 0,
                      class: "mr-2 animate-spin"
                    })) : createCommentVNode("", true),
                    createTextVNode(" Submit ")
                  ]),
                  _: 1
                }, 8, ["loading"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/dashboard/event/payment/form.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "list",
  __ssrInlineRender: true,
  props: {
    stageCategoryId: {},
    payments: {}
  },
  emits: ["update"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const showDialog = ref(false);
    const stagePayment = ref(null);
    const availablePayments = computed(() => props.payments.map((payment) => payment.type) || []);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = _sfc_main$t;
      const _component_Badge = _sfc_main$w;
      const _component_Dialog = _sfc_main$4$1;
      const _component_DialogContent = _sfc_main$2$1;
      const _component_DialogHeader = _sfc_main$u;
      const _component_DialogTitle = _sfc_main$v;
      const _component_DialogDescription = _sfc_main$1$1;
      _push(`<!--[--><div class="py-8 pl-8 border-b"><div class="flex gap-2 pb-4 mb-2 border-b"><strong class="grow">Payments:</strong>`);
      if (unref(availablePayments).length < 2) {
        _push(ssrRenderComponent(_component_Button, {
          variant: "secondary",
          onClick: ($event) => showDialog.value = true
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Add payment details `);
            } else {
              return [
                createTextVNode(" Add payment details ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><ul class="divide-y divide-accent"><!--[-->`);
      ssrRenderList(__props.payments, (payment) => {
        _push(`<li class="flex gap-2 items-center py-2"><div class="grow">`);
        _push(ssrRenderComponent(_component_Badge, { variant: "info" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(payment.type)}`);
            } else {
              return [
                createTextVNode(toDisplayString(payment.type), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(` Rs.${ssrInterpolate(payment.amount)}</div>`);
        _push(ssrRenderComponent(_component_Button, {
          variant: "secondary",
          size: "icon",
          modifier: "outline",
          onClick: ($event) => {
            showDialog.value = true;
            stagePayment.value = payment;
          }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(PencilIcon), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(PencilIcon))
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div>`);
      _push(ssrRenderComponent(_component_Dialog, {
        open: unref(showDialog),
        "onUpdate:open": ($event) => {
          showDialog.value = false;
          stagePayment.value = null;
        }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_DialogContent, { class: "sm:max-w-[600px] max-h-full overflow-y-auto" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_DialogHeader, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_DialogTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(unref(stagePayment) ? "Edit payment details" : "Add payment details")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(unref(stagePayment) ? "Edit payment details" : "Add payment details"), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_DialogDescription, null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_DialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(stagePayment) ? "Edit payment details" : "Add payment details"), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(_component_DialogDescription)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$g, {
                    "available-payments": unref(availablePayments),
                    "stage-category-id": __props.stageCategoryId,
                    payment: unref(stagePayment),
                    onUpdate: async () => {
                      showDialog.value = false;
                      stagePayment.value = null;
                      emit("update");
                    }
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_DialogHeader, null, {
                      default: withCtx(() => [
                        createVNode(_component_DialogTitle, null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(stagePayment) ? "Edit payment details" : "Add payment details"), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(_component_DialogDescription)
                      ]),
                      _: 1
                    }),
                    createVNode(_sfc_main$g, {
                      "available-payments": unref(availablePayments),
                      "stage-category-id": __props.stageCategoryId,
                      payment: unref(stagePayment),
                      onUpdate: async () => {
                        showDialog.value = false;
                        stagePayment.value = null;
                        emit("update");
                      }
                    }, null, 8, ["available-payments", "stage-category-id", "payment", "onUpdate"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_DialogContent, { class: "sm:max-w-[600px] max-h-full overflow-y-auto" }, {
                default: withCtx(() => [
                  createVNode(_component_DialogHeader, null, {
                    default: withCtx(() => [
                      createVNode(_component_DialogTitle, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(stagePayment) ? "Edit payment details" : "Add payment details"), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_DialogDescription)
                    ]),
                    _: 1
                  }),
                  createVNode(_sfc_main$g, {
                    "available-payments": unref(availablePayments),
                    "stage-category-id": __props.stageCategoryId,
                    payment: unref(stagePayment),
                    onUpdate: async () => {
                      showDialog.value = false;
                      stagePayment.value = null;
                      emit("update");
                    }
                  }, null, 8, ["available-payments", "stage-category-id", "payment", "onUpdate"])
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
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/dashboard/event/payment/list.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "Item",
  __ssrInlineRender: true,
  props: {
    stageCategory: {}
  },
  emits: ["event_started", "event_ended", "update", "edit", "delete"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { axios } = useAxios();
    const hasFinished = computed(() => moment().isAfter(moment(props.stageCategory.end, "YYYY-MM-DDTHH:mm:ss.T").endOf("day")));
    const isToday = computed(() => moment().isBetween(
      moment(props.stageCategory.end, "YYYY-MM-DDTHH:mm:ss.T").startOf("day"),
      moment(props.stageCategory.end, "YYYY-MM-DDTHH:mm:ss.T").endOf("day")
    ));
    const hasStarted = computed(() => moment(props.stageCategory.end, "YYYY-MM-DDTHH:mm:ss.T").get("hour") !== 0);
    const startEvent = async () => {
      await axios.patch(`/events/stage_categories/${props.stageCategory.id}/start`);
      emit("event_started");
    };
    const endEvent = async () => {
      await axios.patch(`/events/stage_categories/${props.stageCategory.id}/end`);
      emit("event_ended");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = _sfc_main$t;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (!unref(hasFinished) && unref(isToday)) {
        _push(ssrRenderComponent(_component_Button, { onClick: startEvent }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Start`);
            } else {
              return [
                createTextVNode("Start")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(hasStarted) && !unref(hasFinished)) {
        _push(ssrRenderComponent(_component_Button, { onClick: endEvent }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`End`);
            } else {
              return [
                createTextVNode("End")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex gap-2"><div class="grow"><strong>${ssrInterpolate(__props.stageCategory.name)}</strong><p class="mb-4">${ssrInterpolate(__props.stageCategory.excerpt)}</p></div><div class="flex gap-2">`);
      _push(ssrRenderComponent(_component_Button, {
        variant: "secondary",
        size: "icon",
        modifier: "outline",
        onClick: ($event) => emit("edit")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(PencilIcon), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(PencilIcon))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Button, {
        variant: "destructive",
        size: "icon",
        modifier: "outline",
        onClick: ($event) => emit("delete")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(TrashIcon), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(TrashIcon))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="border-t border-dashed pt-4">`);
      _push(ssrRenderComponent(_sfc_main$f, {
        "stage-category-id": __props.stageCategory.id,
        payments: __props.stageCategory.payment,
        onUpdate: ($event) => emit("update")
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$h, {
        "stage-category-id": __props.stageCategory.id
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/dashboard/event/category/Item.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "List",
  __ssrInlineRender: true,
  props: {
    stageId: {}
  },
  emits: ["update"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const { axios } = useAxios();
    const showDialog = ref(false);
    const editCategory = ref(null);
    const stageCategories = ref([]);
    const fetch = async () => {
      const { data } = await axios.get(`/events/${props.stageId}/stage_categories`);
      stageCategories.value = data;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = _sfc_main$t;
      const _component_Dialog = _sfc_main$4$1;
      const _component_DialogContent = _sfc_main$2$1;
      const _component_DialogHeader = _sfc_main$u;
      const _component_DialogTitle = _sfc_main$v;
      const _component_DialogDescription = _sfc_main$1$1;
      _push(`<!--[--><div class="pt-8 pl-8"><div class="flex gap-2 pb-4 mb-5 border-b"><div class="grow"><h2>Category</h2></div><div class="flex gap-2">`);
      _push(ssrRenderComponent(_component_Button, {
        variant: "secondary",
        size: "sm",
        modifier: "outline",
        onClick: ($event) => showDialog.value = true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(PlusIcon), null, null, _parent2, _scopeId));
            _push2(` Add a Category `);
          } else {
            return [
              createVNode(unref(PlusIcon)),
              createTextVNode(" Add a Category ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      if (unref(stageCategories).length > 0) {
        _push(`<div class="pb-8 space-y-16"><!--[-->`);
        ssrRenderList(unref(stageCategories), (stageCategory) => {
          _push(ssrRenderComponent(_sfc_main$e, {
            "stage-category": stageCategory,
            onEvent_started: ($event) => emit("update"),
            onEvent_ended: ($event) => emit("update"),
            onUpdate: ($event) => fetch(),
            onEdit: ($event) => {
              editCategory.value = stageCategory;
              showDialog.value = true;
            }
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_component_Dialog, {
        open: unref(showDialog),
        "onUpdate:open": ($event) => {
          showDialog.value = false;
          editCategory.value = null;
        }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_DialogContent, { class: "sm:max-w-[1000px] max-h-full overflow-y-auto" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_DialogHeader, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_DialogTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(unref(editCategory) ? "Edit " + unref(editCategory).name : "Add category")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(unref(editCategory) ? "Edit " + unref(editCategory).name : "Add category"), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_DialogDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` This form determines the category for the selected stage area. `);
                            } else {
                              return [
                                createTextVNode(" This form determines the category for the selected stage area. ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_DialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(editCategory) ? "Edit " + unref(editCategory).name : "Add category"), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(_component_DialogDescription, null, {
                            default: withCtx(() => [
                              createTextVNode(" This form determines the category for the selected stage area. ")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$j, {
                    "stage-id": __props.stageId,
                    category: unref(editCategory),
                    onUpdate: async () => {
                      showDialog.value = false;
                      await fetch();
                      emit("update");
                    }
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_DialogHeader, null, {
                      default: withCtx(() => [
                        createVNode(_component_DialogTitle, null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(editCategory) ? "Edit " + unref(editCategory).name : "Add category"), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(_component_DialogDescription, null, {
                          default: withCtx(() => [
                            createTextVNode(" This form determines the category for the selected stage area. ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_sfc_main$j, {
                      "stage-id": __props.stageId,
                      category: unref(editCategory),
                      onUpdate: async () => {
                        showDialog.value = false;
                        await fetch();
                        emit("update");
                      }
                    }, null, 8, ["stage-id", "category", "onUpdate"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_DialogContent, { class: "sm:max-w-[1000px] max-h-full overflow-y-auto" }, {
                default: withCtx(() => [
                  createVNode(_component_DialogHeader, null, {
                    default: withCtx(() => [
                      createVNode(_component_DialogTitle, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(editCategory) ? "Edit " + unref(editCategory).name : "Add category"), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_DialogDescription, null, {
                        default: withCtx(() => [
                          createTextVNode(" This form determines the category for the selected stage area. ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_sfc_main$j, {
                    "stage-id": __props.stageId,
                    category: unref(editCategory),
                    onUpdate: async () => {
                      showDialog.value = false;
                      await fetch();
                      emit("update");
                    }
                  }, null, 8, ["stage-id", "category", "onUpdate"])
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
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/dashboard/event/category/List.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "list",
  __ssrInlineRender: true,
  props: {
    eventId: {}
  },
  emits: ["update"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const { fetch, destory } = useStageStore();
    const { stages } = storeToRefs(useStageStore());
    const showDialog = ref(false);
    const trailRaceStage = ref(null);
    const editStage = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_Button = _sfc_main$t;
      const _component_Tabs = _sfc_main$s;
      const _component_TabsList = _sfc_main$q;
      const _component_TabsTrigger = _sfc_main$p;
      const _component_TabsContent = _sfc_main$r;
      const _component_Badge = _sfc_main$w;
      const _component_Dialog = _sfc_main$4$1;
      const _component_DialogContent = _sfc_main$2$1;
      const _component_DialogHeader = _sfc_main$u;
      const _component_DialogTitle = _sfc_main$v;
      const _component_DialogDescription = _sfc_main$1$1;
      const _component_Map = __nuxt_component_11;
      _push(`<!--[--><div class="text-right mb-12">`);
      _push(ssrRenderComponent(_component_Button, {
        variant: "secondary",
        onClick: ($event) => showDialog.value = true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(PlusIcon), null, null, _parent2, _scopeId));
            _push2(` Add stage `);
          } else {
            return [
              createVNode(unref(PlusIcon)),
              createTextVNode(" Add stage ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="space-y-4">`);
      _push(ssrRenderComponent(_component_Tabs, {
        orientation: "vertical",
        "default-value": (_a = unref(stages)[0]) == null ? void 0 : _a.id,
        class: "flex-row gap-4"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_TabsList, { class: "flex-col h-full" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(stages), (stage) => {
                    _push3(ssrRenderComponent(_component_TabsTrigger, {
                      value: stage.id
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(stage.name)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(stage.name), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(stages), (stage) => {
                      return openBlock(), createBlock(_component_TabsTrigger, {
                        value: stage.id
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(stage.name), 1)
                        ]),
                        _: 2
                      }, 1032, ["value"]);
                    }), 256))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="grow"${_scopeId}><!--[-->`);
            ssrRenderList(unref(stages), (stage) => {
              _push2(ssrRenderComponent(_component_TabsContent, {
                value: stage.id
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex justify-end gap-2 pb-4 mb-8 border-b"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_Button, {
                      variant: "runner",
                      size: "icon",
                      onClick: () => {
                        trailRaceStage.value = stage;
                      }
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(MapIcon), null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(MapIcon))
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Button, {
                      variant: "destructive",
                      onClick: async () => {
                        await unref(destory)(stage.id);
                        unref(fetch)(__props.eventId);
                      }
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(TrashIcon), null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(TrashIcon))
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Button, {
                      size: "icon",
                      onClick: () => {
                        showDialog.value = true;
                        editStage.value = stage;
                      }
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(PencilIcon), null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(PencilIcon))
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div><div class="space-y-2"${_scopeId2}><h2 class="text-xl"${_scopeId2}>${ssrInterpolate(stage.name)}</h2><div class="space-x-3"${_scopeId2}>`);
                    if (stage.runners.length > 0) {
                      _push3(ssrRenderComponent(_component_Badge, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`runners ${ssrInterpolate(stage.runners.length)}`);
                          } else {
                            return [
                              createTextVNode("runners " + toDisplayString(stage.runners.length), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    if (stage.volunteers.length > 0) {
                      _push3(ssrRenderComponent(_component_Badge, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`volunteers ${ssrInterpolate(stage.volunteers.length)}`);
                          } else {
                            return [
                              createTextVNode("volunteers " + toDisplayString(stage.volunteers.length), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div><p${_scopeId2}>${ssrInterpolate(stage.excerpt)}</p>`);
                    _push3(ssrRenderComponent(_sfc_main$d, {
                      "stage-id": stage.id,
                      onUpdate: ($event) => emit("update")
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex justify-end gap-2 pb-4 mb-8 border-b" }, [
                        createVNode(_component_Button, {
                          variant: "runner",
                          size: "icon",
                          onClick: () => {
                            trailRaceStage.value = stage;
                          }
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(MapIcon))
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_Button, {
                          variant: "destructive",
                          onClick: async () => {
                            await unref(destory)(stage.id);
                            unref(fetch)(__props.eventId);
                          }
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(TrashIcon))
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_Button, {
                          size: "icon",
                          onClick: () => {
                            showDialog.value = true;
                            editStage.value = stage;
                          }
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(PencilIcon))
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode("h2", { class: "text-xl" }, toDisplayString(stage.name), 1),
                        createVNode("div", { class: "space-x-3" }, [
                          stage.runners.length > 0 ? (openBlock(), createBlock(_component_Badge, { key: 0 }, {
                            default: withCtx(() => [
                              createTextVNode("runners " + toDisplayString(stage.runners.length), 1)
                            ]),
                            _: 2
                          }, 1024)) : createCommentVNode("", true),
                          stage.volunteers.length > 0 ? (openBlock(), createBlock(_component_Badge, { key: 1 }, {
                            default: withCtx(() => [
                              createTextVNode("volunteers " + toDisplayString(stage.volunteers.length), 1)
                            ]),
                            _: 2
                          }, 1024)) : createCommentVNode("", true)
                        ]),
                        createVNode("p", {
                          textContent: toDisplayString(stage.excerpt)
                        }, null, 8, ["textContent"]),
                        createVNode(_sfc_main$d, {
                          "stage-id": stage.id,
                          onUpdate: ($event) => emit("update")
                        }, null, 8, ["stage-id", "onUpdate"])
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode(_component_TabsList, { class: "flex-col h-full" }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(stages), (stage) => {
                    return openBlock(), createBlock(_component_TabsTrigger, {
                      value: stage.id
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(stage.name), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 256))
                ]),
                _: 1
              }),
              createVNode("div", { class: "grow" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(stages), (stage) => {
                  return openBlock(), createBlock(_component_TabsContent, {
                    value: stage.id
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex justify-end gap-2 pb-4 mb-8 border-b" }, [
                        createVNode(_component_Button, {
                          variant: "runner",
                          size: "icon",
                          onClick: () => {
                            trailRaceStage.value = stage;
                          }
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(MapIcon))
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_Button, {
                          variant: "destructive",
                          onClick: async () => {
                            await unref(destory)(stage.id);
                            unref(fetch)(__props.eventId);
                          }
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(TrashIcon))
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_Button, {
                          size: "icon",
                          onClick: () => {
                            showDialog.value = true;
                            editStage.value = stage;
                          }
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(PencilIcon))
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode("h2", { class: "text-xl" }, toDisplayString(stage.name), 1),
                        createVNode("div", { class: "space-x-3" }, [
                          stage.runners.length > 0 ? (openBlock(), createBlock(_component_Badge, { key: 0 }, {
                            default: withCtx(() => [
                              createTextVNode("runners " + toDisplayString(stage.runners.length), 1)
                            ]),
                            _: 2
                          }, 1024)) : createCommentVNode("", true),
                          stage.volunteers.length > 0 ? (openBlock(), createBlock(_component_Badge, { key: 1 }, {
                            default: withCtx(() => [
                              createTextVNode("volunteers " + toDisplayString(stage.volunteers.length), 1)
                            ]),
                            _: 2
                          }, 1024)) : createCommentVNode("", true)
                        ]),
                        createVNode("p", {
                          textContent: toDisplayString(stage.excerpt)
                        }, null, 8, ["textContent"]),
                        createVNode(_sfc_main$d, {
                          "stage-id": stage.id,
                          onUpdate: ($event) => emit("update")
                        }, null, 8, ["stage-id", "onUpdate"])
                      ])
                    ]),
                    _: 2
                  }, 1032, ["value"]);
                }), 256))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_Dialog, {
        open: unref(showDialog),
        "onUpdate:open": ($event) => showDialog.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_DialogContent, { class: "sm:max-w-[1000px] max-h-full overflow-y-auto" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_DialogHeader, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_DialogTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Stage form`);
                            } else {
                              return [
                                createTextVNode("Stage form")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_DialogDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus assumenda, maxime. `);
                            } else {
                              return [
                                createTextVNode("Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus assumenda, maxime. ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_DialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Stage form")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_DialogDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus assumenda, maxime. ")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$k, {
                    "event-id": __props.eventId,
                    stage: unref(editStage),
                    onUpdate: () => {
                      showDialog.value = false;
                      editStage.value = null;
                      unref(fetch)(__props.eventId);
                      emit("update");
                    }
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_DialogHeader, null, {
                      default: withCtx(() => [
                        createVNode(_component_DialogTitle, null, {
                          default: withCtx(() => [
                            createTextVNode("Stage form")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_DialogDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus assumenda, maxime. ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_sfc_main$k, {
                      "event-id": __props.eventId,
                      stage: unref(editStage),
                      onUpdate: () => {
                        showDialog.value = false;
                        editStage.value = null;
                        unref(fetch)(__props.eventId);
                        emit("update");
                      }
                    }, null, 8, ["event-id", "stage", "onUpdate"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_DialogContent, { class: "sm:max-w-[1000px] max-h-full overflow-y-auto" }, {
                default: withCtx(() => [
                  createVNode(_component_DialogHeader, null, {
                    default: withCtx(() => [
                      createVNode(_component_DialogTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Stage form")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_DialogDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus assumenda, maxime. ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_sfc_main$k, {
                    "event-id": __props.eventId,
                    stage: unref(editStage),
                    onUpdate: () => {
                      showDialog.value = false;
                      editStage.value = null;
                      unref(fetch)(__props.eventId);
                      emit("update");
                    }
                  }, null, 8, ["event-id", "stage", "onUpdate"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Dialog, {
        open: unref(trailRaceStage) != null,
        "onUpdate:open": ($event) => trailRaceStage.value = null
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_DialogContent, { class: "sm:max-w-[1000px]" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a2, _b;
                if (_push3) {
                  _push3(ssrRenderComponent(_component_DialogHeader, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_DialogTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Map`);
                            } else {
                              return [
                                createTextVNode("Map")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_DialogDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Some text`);
                            } else {
                              return [
                                createTextVNode("Some text")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_DialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Map")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_DialogDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Some text")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (unref(trailRaceStage)) {
                    _push3(ssrRenderComponent(_component_Map, {
                      "map-id": "someId",
                      center: [27.756846786775668, 85.3124535214843],
                      gpxFile: unref(getGPXFile)((_a2 = unref(trailRaceStage)) == null ? void 0 : _a2.map_file.file_name)
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(_component_DialogHeader, null, {
                      default: withCtx(() => [
                        createVNode(_component_DialogTitle, null, {
                          default: withCtx(() => [
                            createTextVNode("Map")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_DialogDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Some text")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    unref(trailRaceStage) ? (openBlock(), createBlock(_component_Map, {
                      key: 0,
                      "map-id": "someId",
                      center: [27.756846786775668, 85.3124535214843],
                      gpxFile: unref(getGPXFile)((_b = unref(trailRaceStage)) == null ? void 0 : _b.map_file.file_name)
                    }, null, 8, ["gpxFile"])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_DialogContent, { class: "sm:max-w-[1000px]" }, {
                default: withCtx(() => {
                  var _a2;
                  return [
                    createVNode(_component_DialogHeader, null, {
                      default: withCtx(() => [
                        createVNode(_component_DialogTitle, null, {
                          default: withCtx(() => [
                            createTextVNode("Map")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_DialogDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Some text")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    unref(trailRaceStage) ? (openBlock(), createBlock(_component_Map, {
                      key: 0,
                      "map-id": "someId",
                      center: [27.756846786775668, 85.3124535214843],
                      gpxFile: unref(getGPXFile)((_a2 = unref(trailRaceStage)) == null ? void 0 : _a2.map_file.file_name)
                    }, null, 8, ["gpxFile"])) : createCommentVNode("", true)
                  ];
                }),
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
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/dashboard/event/stages/list.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const useGalleryStore = defineStore("gallery", () => {
  const galleries = ref([]);
  const { axios } = useAxios();
  const fetch = async (eventID) => {
    const { data } = await axios.get(`/events/${eventID}/galleries`);
    galleries.value = data;
  };
  const save = async (eventID, images) => {
    await axios.post(`/events/${eventID}/galleries`, { images });
  };
  const destory = async (eventID, imageID) => {
    await axios.delete(`/events/${eventID}/galleries/${imageID}`);
  };
  return {
    galleries,
    fetch,
    save,
    destory
  };
});
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "list",
  __ssrInlineRender: true,
  props: {
    eventId: {}
  },
  setup(__props) {
    const props = __props;
    const { galleries } = storeToRefs(useGalleryStore());
    const { fetch, save, destory } = useGalleryStore();
    const images = ref([]);
    const isLoading = ref(false);
    const removeImage = (index) => {
      images.value.splice(index, 1);
    };
    const saveImages = async () => {
      isLoading.value = true;
      await save(props.eventId, images.value);
      fetch(props.eventId);
      images.value = [];
      isLoading.value = false;
    };
    watch(() => props.eventId, () => {
      fetch(props.eventId);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = _sfc_main$t;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-wrap gap-4" }, _attrs))}><div class="w-[calc(25%-16px)] h-[250px] rounded overflow-hidden relative border border-dashed hover:border-gray-600 transition-colors">`);
      if (unref(images).length > 0) {
        _push(ssrRenderComponent(_component_Button, {
          class: "absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2",
          onClick: saveImages
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Save `);
            } else {
              return [
                createTextVNode(" Save ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<label class="w-full h-full flex justify-center items-center p-3"><input type="file" accept="image/*" multiple class="sr-only"><div class="text-center"><strong class="text-lg block">Upload image</strong><span class="text-xs">You can upload multiple images</span></div></label>`);
      }
      _push(`</div><!--[-->`);
      ssrRenderList(unref(images), (image, index) => {
        _push(`<figure class="w-[calc(25%-16px)] h-[250px] p-2 rounded overflow-hidden relative border border-dashed"><img${ssrRenderAttr("src", image)} alt="image description" class="w-full h-full object-contain object-center">`);
        _push(ssrRenderComponent(_component_Button, {
          variant: "secondary",
          size: "icon",
          class: "absolute top-2 right-2 z-[2]",
          onClick: ($event) => removeImage(index)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(XIcon), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(XIcon))
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</figure>`);
      });
      _push(`<!--]--><!--[-->`);
      ssrRenderList(unref(galleries), (image) => {
        _push(`<figure class="w-[calc(25%-16px)] h-[250px] p-2 rounded overflow-hidden relative border border-dashed"><img${ssrRenderAttr("src", unref(showImage)(image.file_name))} alt="image description" class="w-full h-full object-contain object-center">`);
        _push(ssrRenderComponent(_component_Button, {
          variant: "secondary",
          size: "icon",
          class: "absolute top-2 right-2 z-[2]",
          onClick: async () => {
            await unref(destory)(__props.eventId, image.id);
            unref(fetch)(__props.eventId);
          }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Trash2Icon), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(Trash2Icon))
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</figure>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/dashboard/event/gallery/list.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "AssignCheckpointForm",
  __ssrInlineRender: true,
  props: {
    volunteer: {},
    checkpoints: {}
  },
  emits: ["update"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const { assignVolunteerToCheckpoint } = useCheckpointStore();
    const isLoading = ref(false);
    const form = ref();
    computed(() => [...new Set(props.checkpoints.map((checkpoint) => {
      var _a, _b;
      return ((_b = (_a = form.value) == null ? void 0 : _a.values.checkpoints) != null ? _b : []).includes(checkpoint.id) ? checkpoint.stage_category_id : null;
    }).filter((id) => id != null))]);
    const formSubmit = async (values) => {
      isLoading.value = true;
      await assignVolunteerToCheckpoint(props.volunteer.id, values);
      isLoading.value = false;
      emit("update");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Checkbox = _sfc_main$F;
      const _component_Label = _sfc_main$B;
      const _component_Button = _sfc_main$t;
      _push(ssrRenderComponent(unref(Form), mergeProps({
        ref_key: "form",
        ref: form,
        onSubmit: formSubmit,
        class: "space-y-4 pt-8 max-w-[460px]"
      }, _attrs), {
        default: withCtx(({ values }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(__props.checkpoints, (checkpoint) => {
              _push2(ssrRenderComponent(unref(Field), {
                as: "div",
                type: "checkbox",
                name: "checkpoints",
                value: checkpoint.id,
                class: "flex gap-2"
              }, {
                default: withCtx(({ handleChange, value }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Checkbox, {
                      "onUpdate:modelValue": handleChange,
                      id: checkpoint.id,
                      "model-value": value == null ? void 0 : value.includes(checkpoint.id)
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Label, {
                      for: checkpoint.id
                    }, {
                      default: withCtx((_, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(checkpoint.name)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(checkpoint.name), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_Checkbox, {
                        "onUpdate:modelValue": handleChange,
                        id: checkpoint.id,
                        "model-value": value == null ? void 0 : value.includes(checkpoint.id)
                      }, null, 8, ["onUpdate:modelValue", "id", "model-value"]),
                      createVNode(_component_Label, {
                        for: checkpoint.id
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(checkpoint.name), 1)
                        ]),
                        _: 2
                      }, 1032, ["for"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--><div class="text-right"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Button, {
              variant: "default",
              type: "submit",
              class: "w-full sm:w-auto px-8 py-3 h-12 text-base font-medium",
              disabled: unref(isLoading),
              "aria-busy": unref(isLoading)
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(isLoading)) {
                    _push3(ssrRenderComponent(unref(LoaderIcon), {
                      size: 20,
                      class: "animate-spin mr-2"
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(` Assign `);
                } else {
                  return [
                    unref(isLoading) ? (openBlock(), createBlock(unref(LoaderIcon), {
                      key: 0,
                      size: 20,
                      class: "animate-spin mr-2"
                    })) : createCommentVNode("", true),
                    createTextVNode(" Assign ")
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(__props.checkpoints, (checkpoint) => {
                return openBlock(), createBlock(unref(Field), {
                  as: "div",
                  type: "checkbox",
                  name: "checkpoints",
                  value: checkpoint.id,
                  class: "flex gap-2"
                }, {
                  default: withCtx(({ handleChange, value }) => [
                    createVNode(_component_Checkbox, {
                      "onUpdate:modelValue": handleChange,
                      id: checkpoint.id,
                      "model-value": value == null ? void 0 : value.includes(checkpoint.id)
                    }, null, 8, ["onUpdate:modelValue", "id", "model-value"]),
                    createVNode(_component_Label, {
                      for: checkpoint.id
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(checkpoint.name), 1)
                      ]),
                      _: 2
                    }, 1032, ["for"])
                  ]),
                  _: 2
                }, 1032, ["value"]);
              }), 256)),
              createVNode("div", { class: "text-right" }, [
                createVNode(_component_Button, {
                  variant: "default",
                  type: "submit",
                  class: "w-full sm:w-auto px-8 py-3 h-12 text-base font-medium",
                  disabled: unref(isLoading),
                  "aria-busy": unref(isLoading)
                }, {
                  default: withCtx(() => [
                    unref(isLoading) ? (openBlock(), createBlock(unref(LoaderIcon), {
                      key: 0,
                      size: 20,
                      class: "animate-spin mr-2"
                    })) : createCommentVNode("", true),
                    createTextVNode(" Assign ")
                  ]),
                  _: 1
                }, 8, ["disabled", "aria-busy"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/dashboard/event/volunteer/AssignCheckpointForm.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "list",
  __ssrInlineRender: true,
  props: {
    stages: {}
  },
  emits: ["update"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const selectedVolunteer = ref(null);
    const checkpoints = ref([]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Badge = _sfc_main$w;
      const _component_Button = _sfc_main$t;
      const _component_Dialog = _sfc_main$4$1;
      const _component_DialogContent = _sfc_main$2$1;
      const _component_DialogHeader = _sfc_main$u;
      const _component_DialogTitle = _sfc_main$v;
      const _component_DialogDescription = _sfc_main$1$1;
      const _component_PagesDashboardEventVolunteerAssignCheckpointForm = _sfc_main$a;
      _push(`<!--[--><ul class="divide-y space-y-4 [&amp;&gt;li]:pb-4"><!--[-->`);
      ssrRenderList(__props.stages, (stage) => {
        _push(`<!--[--><!--[-->`);
        ssrRenderList(stage.volunteers, (volunteer) => {
          _push(`<li class="flex gap-2 items-center"><div class="grow space-y-1"><strong class="text-lg block">${ssrInterpolate(volunteer.personal.first_name)} ${ssrInterpolate(volunteer.personal.middle_name)} ${ssrInterpolate(volunteer.personal.last_name)}</strong>`);
          _push(ssrRenderComponent(_component_Badge, { variant: "outline" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(volunteer.stages.map((s) => s.name).join(", "))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(volunteer.stages.map((s) => s.name).join(", ")), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          if ((volunteer == null ? void 0 : volunteer.checkpoints.length) > 0) {
            _push(`<p><span class="font-semibold text-xs uppercase text-gray-300">Assigned to:</span> ${ssrInterpolate(volunteer == null ? void 0 : volunteer.checkpoints.map((checkpoint) => checkpoint.name).join(", "))}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          if (volunteer.checkpoints.length == 0) {
            _push(ssrRenderComponent(_component_Button, {
              variant: "secondary",
              modifier: "outline",
              onClick: () => {
                selectedVolunteer.value = volunteer;
                checkpoints.value = stage.stage_categories.map((sc) => sc.checkpoints).reduce((acc, curr) => [...acc, ...curr], []);
              }
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`Assign to checkpoint`);
                } else {
                  return [
                    createTextVNode("Assign to checkpoint")
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</li>`);
        });
        _push(`<!--]--><!--]-->`);
      });
      _push(`<!--]--></ul>`);
      if (unref(selectedVolunteer)) {
        _push(ssrRenderComponent(_component_Dialog, {
          open: unref(selectedVolunteer) != null,
          "onUpdate:open": ($event) => selectedVolunteer.value = null
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_DialogContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_DialogHeader, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_DialogTitle, { class: "text-2xl" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Assign volunteers to checkpoint`);
                              } else {
                                return [
                                  createTextVNode("Assign volunteers to checkpoint")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_DialogDescription, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`You can indiviually assign volunteers to the available checkpoints `);
                              } else {
                                return [
                                  createTextVNode("You can indiviually assign volunteers to the available checkpoints ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_DialogTitle, { class: "text-2xl" }, {
                              default: withCtx(() => [
                                createTextVNode("Assign volunteers to checkpoint")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_DialogDescription, null, {
                              default: withCtx(() => [
                                createTextVNode("You can indiviually assign volunteers to the available checkpoints ")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_PagesDashboardEventVolunteerAssignCheckpointForm, {
                      volunteer: unref(selectedVolunteer),
                      checkpoints: unref(checkpoints),
                      onUpdate: () => {
                        selectedVolunteer.value = null;
                        emit("update");
                      }
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_DialogHeader, null, {
                        default: withCtx(() => [
                          createVNode(_component_DialogTitle, { class: "text-2xl" }, {
                            default: withCtx(() => [
                              createTextVNode("Assign volunteers to checkpoint")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_DialogDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("You can indiviually assign volunteers to the available checkpoints ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_PagesDashboardEventVolunteerAssignCheckpointForm, {
                        volunteer: unref(selectedVolunteer),
                        checkpoints: unref(checkpoints),
                        onUpdate: () => {
                          selectedVolunteer.value = null;
                          emit("update");
                        }
                      }, null, 8, ["volunteer", "checkpoints", "onUpdate"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_DialogContent, null, {
                  default: withCtx(() => [
                    createVNode(_component_DialogHeader, null, {
                      default: withCtx(() => [
                        createVNode(_component_DialogTitle, { class: "text-2xl" }, {
                          default: withCtx(() => [
                            createTextVNode("Assign volunteers to checkpoint")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_DialogDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("You can indiviually assign volunteers to the available checkpoints ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_PagesDashboardEventVolunteerAssignCheckpointForm, {
                      volunteer: unref(selectedVolunteer),
                      checkpoints: unref(checkpoints),
                      onUpdate: () => {
                        selectedVolunteer.value = null;
                        emit("update");
                      }
                    }, null, 8, ["volunteer", "checkpoints", "onUpdate"])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/dashboard/event/volunteer/list.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "InputGroup",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "input-group",
        role: "group",
        class: unref(cn$1)(
          "group/input-group border-input dark:bg-input/30 relative flex w-full items-center rounded-md border shadow-xs transition-[color,box-shadow] outline-none",
          "h-9 min-w-0 has-[>textarea]:h-auto",
          // Variants based on alignment.
          "has-[>[data-align=inline-start]]:[&>input]:pl-2",
          "has-[>[data-align=inline-end]]:[&>input]:pr-2",
          "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3",
          "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3",
          // Focus state.
          "has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot=input-group-control]:focus-visible]:ring-[3px]",
          // Error state.
          "has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[[data-slot][aria-invalid=true]]:border-destructive dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40",
          props.class
        )
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/input-group/InputGroup.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "InputGroupAddon",
  __ssrInlineRender: true,
  props: {
    align: { default: "inline-start" },
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        role: "group",
        "data-slot": "input-group-addon",
        "data-align": props.align,
        class: unref(cn$1)(unref(inputGroupAddonVariants)({ align: props.align }), props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/input-group/InputGroupAddon.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "InputGroupInput",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$A), mergeProps({
        "data-slot": "input-group-control",
        class: unref(cn$1)(
          "flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent",
          props.class
        )
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/input-group/InputGroupInput.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const inputGroupAddonVariants = cva(
  "text-muted-foreground flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium select-none [&>svg:not([class*='size-'])]:size-4 [&>kbd]:rounded-[calc(var(--radius)-5px)] group-data-[disabled=true]/input-group:opacity-50",
  {
    variants: {
      align: {
        "inline-start": "order-first pl-3 has-[>button]:ml-[-0.45rem] has-[>kbd]:ml-[-0.35rem]",
        "inline-end": "order-last pr-3 has-[>button]:mr-[-0.45rem] has-[>kbd]:mr-[-0.35rem]",
        "block-start": "order-first w-full justify-start px-3 pt-3 [.border-b]:pb-3 group-has-[>input]/input-group:pt-2.5",
        "block-end": "order-last w-full justify-start px-3 pb-3 [.border-t]:pt-3 group-has-[>input]/input-group:pb-2.5"
      }
    },
    defaultVariants: {
      align: "inline-start"
    }
  }
);
cva(
  "text-sm shadow-none flex gap-2 items-center",
  {
    variants: {
      size: {
        "xs": "h-6 gap-1 px-2 rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-3.5 has-[>svg]:px-2",
        "sm": "h-8 px-2.5 gap-1.5 rounded-md has-[>svg]:px-2.5",
        "icon-xs": "size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0",
        "icon-sm": "size-8 p-0 has-[>svg]:p-0"
      }
    },
    defaultVariants: {
      size: "xs"
    }
  }
);
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "RunnerItem",
  __ssrInlineRender: true,
  props: {
    runner: {}
  },
  emits: ["show:runner", "show:payment", "updated:payment"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const hasPayment = computed(() => props.runner.payments.length > 0);
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_TableRow = _sfc_main$2$2;
      const _component_TableCell = _sfc_main$3$1;
      const _component_Badge = _sfc_main$w;
      const _component_DropdownMenu = _sfc_main$3$2;
      const _component_DropdownMenuTrigger = _sfc_main$D;
      const _component_Button = _sfc_main$t;
      const _component_DropdownMenuContent = _sfc_main$2$4;
      const _component_DropdownMenuItem = _sfc_main$1$5;
      const _component_DropdownMenuLabel = _sfc_main$1$6;
      const _component_DropdownMenuSeparator = _sfc_main$E;
      const _component_TableBody = _sfc_main$4$3;
      const _component_Table = _sfc_main$5$2;
      const _component_TableHeader = _sfc_main$y;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_TableRow, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_TableCell, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<em class="no-italic block"${_scopeId2}>${ssrInterpolate(__props.runner.bib)}</em><strong class="block"${_scopeId2}>${ssrInterpolate(__props.runner.personal.first_name)} ${ssrInterpolate(__props.runner.personal.middle_name)} ${ssrInterpolate(__props.runner.personal.last_name)}</strong>`);
                  _push3(ssrRenderComponent(_component_Badge, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      var _a2, _b, _c, _d;
                      if (_push4) {
                        _push4(`${ssrInterpolate(unref(moment)().diff(unref(moment)(__props.runner.personal.date_of_birth), "years"))} ${ssrInterpolate((_b = (_a2 = __props.runner.personal) == null ? void 0 : _a2.gender) == null ? void 0 : _b.name.charAt(0).toUpperCase())}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(unref(moment)().diff(unref(moment)(__props.runner.personal.date_of_birth), "years")) + " " + toDisplayString((_d = (_c = __props.runner.personal) == null ? void 0 : _c.gender) == null ? void 0 : _d.name.charAt(0).toUpperCase()), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("em", { class: "no-italic block" }, toDisplayString(__props.runner.bib), 1),
                    createVNode("strong", { class: "block" }, toDisplayString(__props.runner.personal.first_name) + " " + toDisplayString(__props.runner.personal.middle_name) + " " + toDisplayString(__props.runner.personal.last_name), 1),
                    createVNode(_component_Badge, null, {
                      default: withCtx(() => {
                        var _a2, _b;
                        return [
                          createTextVNode(toDisplayString(unref(moment)().diff(unref(moment)(__props.runner.personal.date_of_birth), "years")) + " " + toDisplayString((_b = (_a2 = __props.runner.personal) == null ? void 0 : _a2.gender) == null ? void 0 : _b.name.charAt(0).toUpperCase()), 1)
                        ];
                      }),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_TableCell, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a2, _b;
                if (_push3) {
                  _push3(`${ssrInterpolate((_a2 = __props.runner.payments[0]) == null ? void 0 : _a2.status)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString((_b = __props.runner.payments[0]) == null ? void 0 : _b.status), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_TableCell, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a2, _b;
                if (_push3) {
                  _push3(`${ssrInterpolate((_a2 = __props.runner.payments[0]) == null ? void 0 : _a2.type)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString((_b = __props.runner.payments[0]) == null ? void 0 : _b.type), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_TableCell, { class: "text-center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a2, _b, _c, _d;
                if (_push3) {
                  _push3(`<div class="block"${_scopeId2}><span class="${ssrRenderClass({ "flag": true, ["flag-" + __props.runner.personal.country.abbr]: true })}"${_scopeId2}></span></div> ${ssrInterpolate((_b = (_a2 = __props.runner.personal) == null ? void 0 : _a2.country) == null ? void 0 : _b.name)}`);
                } else {
                  return [
                    createVNode("div", { class: "block" }, [
                      createVNode("span", {
                        class: { "flag": true, ["flag-" + __props.runner.personal.country.abbr]: true }
                      }, null, 2)
                    ]),
                    createTextVNode(" " + toDisplayString((_d = (_c = __props.runner.personal) == null ? void 0 : _c.country) == null ? void 0 : _d.name), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_TableCell, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a2, _b, _c, _d;
                if (_push3) {
                  _push3(`${ssrInterpolate((_b = (_a2 = __props.runner.personal) == null ? void 0 : _a2.gender) == null ? void 0 : _b.name)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString((_d = (_c = __props.runner.personal) == null ? void 0 : _c.gender) == null ? void 0 : _d.name), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_TableCell, { class: "text-right" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_DropdownMenu, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_DropdownMenuTrigger, { "as-child": "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_Button, {
                                size: "sm",
                                modifier: "link"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(EllipsisVerticalIcon), null, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(EllipsisVerticalIcon))
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_Button, {
                                  size: "sm",
                                  modifier: "link"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(EllipsisVerticalIcon))
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_DropdownMenuContent, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_DropdownMenuItem, {
                                class: "text-gray-500",
                                onClick: ($event) => emit("show:runner")
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` See runner details `);
                                  } else {
                                    return [
                                      createTextVNode(" See runner details ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              if (unref(hasPayment)) {
                                _push5(ssrRenderComponent(_component_DropdownMenuItem, {
                                  class: "text-gray-500",
                                  onClick: ($event) => emit("show:payment")
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(` See payment details `);
                                    } else {
                                      return [
                                        createTextVNode(" See payment details ")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(ssrRenderComponent(_component_DropdownMenuLabel, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Actions`);
                                  } else {
                                    return [
                                      createTextVNode("Actions")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_DropdownMenuSeparator, null, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_DropdownMenuItem, {
                                class: "text-green-500",
                                onClick: ($event) => emit("updated:payment", "COMPLETED", __props.runner.payments[0].id)
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Completed `);
                                  } else {
                                    return [
                                      createTextVNode(" Completed ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_DropdownMenuItem, {
                                class: "text-yellow-500",
                                onClick: ($event) => emit("updated:payment", "PENDING", __props.runner.payments[0].id)
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Pending `);
                                  } else {
                                    return [
                                      createTextVNode(" Pending ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_DropdownMenuItem, {
                                class: "text-red-500",
                                onClick: ($event) => emit("updated:payment", "FAILED", __props.runner.payments[0].id)
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Failed `);
                                  } else {
                                    return [
                                      createTextVNode(" Failed ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_DropdownMenuItem, {
                                  class: "text-gray-500",
                                  onClick: ($event) => emit("show:runner")
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" See runner details ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"]),
                                unref(hasPayment) ? (openBlock(), createBlock(_component_DropdownMenuItem, {
                                  key: 0,
                                  class: "text-gray-500",
                                  onClick: ($event) => emit("show:payment")
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" See payment details ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])) : createCommentVNode("", true),
                                createVNode(_component_DropdownMenuLabel, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Actions")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_DropdownMenuSeparator),
                                createVNode(_component_DropdownMenuItem, {
                                  class: "text-green-500",
                                  onClick: ($event) => emit("updated:payment", "COMPLETED", __props.runner.payments[0].id)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Completed ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"]),
                                createVNode(_component_DropdownMenuItem, {
                                  class: "text-yellow-500",
                                  onClick: ($event) => emit("updated:payment", "PENDING", __props.runner.payments[0].id)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Pending ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"]),
                                createVNode(_component_DropdownMenuItem, {
                                  class: "text-red-500",
                                  onClick: ($event) => emit("updated:payment", "FAILED", __props.runner.payments[0].id)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Failed ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_DropdownMenuTrigger, { "as-child": "" }, {
                            default: withCtx(() => [
                              createVNode(_component_Button, {
                                size: "sm",
                                modifier: "link"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(EllipsisVerticalIcon))
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_DropdownMenuContent, null, {
                            default: withCtx(() => [
                              createVNode(_component_DropdownMenuItem, {
                                class: "text-gray-500",
                                onClick: ($event) => emit("show:runner")
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" See runner details ")
                                ]),
                                _: 1
                              }, 8, ["onClick"]),
                              unref(hasPayment) ? (openBlock(), createBlock(_component_DropdownMenuItem, {
                                key: 0,
                                class: "text-gray-500",
                                onClick: ($event) => emit("show:payment")
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" See payment details ")
                                ]),
                                _: 1
                              }, 8, ["onClick"])) : createCommentVNode("", true),
                              createVNode(_component_DropdownMenuLabel, null, {
                                default: withCtx(() => [
                                  createTextVNode("Actions")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_DropdownMenuSeparator),
                              createVNode(_component_DropdownMenuItem, {
                                class: "text-green-500",
                                onClick: ($event) => emit("updated:payment", "COMPLETED", __props.runner.payments[0].id)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Completed ")
                                ]),
                                _: 1
                              }, 8, ["onClick"]),
                              createVNode(_component_DropdownMenuItem, {
                                class: "text-yellow-500",
                                onClick: ($event) => emit("updated:payment", "PENDING", __props.runner.payments[0].id)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Pending ")
                                ]),
                                _: 1
                              }, 8, ["onClick"]),
                              createVNode(_component_DropdownMenuItem, {
                                class: "text-red-500",
                                onClick: ($event) => emit("updated:payment", "FAILED", __props.runner.payments[0].id)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Failed ")
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_DropdownMenu, null, {
                      default: withCtx(() => [
                        createVNode(_component_DropdownMenuTrigger, { "as-child": "" }, {
                          default: withCtx(() => [
                            createVNode(_component_Button, {
                              size: "sm",
                              modifier: "link"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(EllipsisVerticalIcon))
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_DropdownMenuContent, null, {
                          default: withCtx(() => [
                            createVNode(_component_DropdownMenuItem, {
                              class: "text-gray-500",
                              onClick: ($event) => emit("show:runner")
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" See runner details ")
                              ]),
                              _: 1
                            }, 8, ["onClick"]),
                            unref(hasPayment) ? (openBlock(), createBlock(_component_DropdownMenuItem, {
                              key: 0,
                              class: "text-gray-500",
                              onClick: ($event) => emit("show:payment")
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" See payment details ")
                              ]),
                              _: 1
                            }, 8, ["onClick"])) : createCommentVNode("", true),
                            createVNode(_component_DropdownMenuLabel, null, {
                              default: withCtx(() => [
                                createTextVNode("Actions")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_DropdownMenuSeparator),
                            createVNode(_component_DropdownMenuItem, {
                              class: "text-green-500",
                              onClick: ($event) => emit("updated:payment", "COMPLETED", __props.runner.payments[0].id)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Completed ")
                              ]),
                              _: 1
                            }, 8, ["onClick"]),
                            createVNode(_component_DropdownMenuItem, {
                              class: "text-yellow-500",
                              onClick: ($event) => emit("updated:payment", "PENDING", __props.runner.payments[0].id)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Pending ")
                              ]),
                              _: 1
                            }, 8, ["onClick"]),
                            createVNode(_component_DropdownMenuItem, {
                              class: "text-red-500",
                              onClick: ($event) => emit("updated:payment", "FAILED", __props.runner.payments[0].id)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Failed ")
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_TableCell, null, {
                default: withCtx(() => [
                  createVNode("em", { class: "no-italic block" }, toDisplayString(__props.runner.bib), 1),
                  createVNode("strong", { class: "block" }, toDisplayString(__props.runner.personal.first_name) + " " + toDisplayString(__props.runner.personal.middle_name) + " " + toDisplayString(__props.runner.personal.last_name), 1),
                  createVNode(_component_Badge, null, {
                    default: withCtx(() => {
                      var _a2, _b;
                      return [
                        createTextVNode(toDisplayString(unref(moment)().diff(unref(moment)(__props.runner.personal.date_of_birth), "years")) + " " + toDisplayString((_b = (_a2 = __props.runner.personal) == null ? void 0 : _a2.gender) == null ? void 0 : _b.name.charAt(0).toUpperCase()), 1)
                      ];
                    }),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_TableCell, null, {
                default: withCtx(() => {
                  var _a2;
                  return [
                    createTextVNode(toDisplayString((_a2 = __props.runner.payments[0]) == null ? void 0 : _a2.status), 1)
                  ];
                }),
                _: 1
              }),
              createVNode(_component_TableCell, null, {
                default: withCtx(() => {
                  var _a2;
                  return [
                    createTextVNode(toDisplayString((_a2 = __props.runner.payments[0]) == null ? void 0 : _a2.type), 1)
                  ];
                }),
                _: 1
              }),
              createVNode(_component_TableCell, { class: "text-center" }, {
                default: withCtx(() => {
                  var _a2, _b;
                  return [
                    createVNode("div", { class: "block" }, [
                      createVNode("span", {
                        class: { "flag": true, ["flag-" + __props.runner.personal.country.abbr]: true }
                      }, null, 2)
                    ]),
                    createTextVNode(" " + toDisplayString((_b = (_a2 = __props.runner.personal) == null ? void 0 : _a2.country) == null ? void 0 : _b.name), 1)
                  ];
                }),
                _: 1
              }),
              createVNode(_component_TableCell, null, {
                default: withCtx(() => {
                  var _a2, _b;
                  return [
                    createTextVNode(toDisplayString((_b = (_a2 = __props.runner.personal) == null ? void 0 : _a2.gender) == null ? void 0 : _b.name), 1)
                  ];
                }),
                _: 1
              }),
              createVNode(_component_TableCell, { class: "text-right" }, {
                default: withCtx(() => [
                  createVNode(_component_DropdownMenu, null, {
                    default: withCtx(() => [
                      createVNode(_component_DropdownMenuTrigger, { "as-child": "" }, {
                        default: withCtx(() => [
                          createVNode(_component_Button, {
                            size: "sm",
                            modifier: "link"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(EllipsisVerticalIcon))
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_DropdownMenuContent, null, {
                        default: withCtx(() => [
                          createVNode(_component_DropdownMenuItem, {
                            class: "text-gray-500",
                            onClick: ($event) => emit("show:runner")
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" See runner details ")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          unref(hasPayment) ? (openBlock(), createBlock(_component_DropdownMenuItem, {
                            key: 0,
                            class: "text-gray-500",
                            onClick: ($event) => emit("show:payment")
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" See payment details ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])) : createCommentVNode("", true),
                          createVNode(_component_DropdownMenuLabel, null, {
                            default: withCtx(() => [
                              createTextVNode("Actions")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_DropdownMenuSeparator),
                          createVNode(_component_DropdownMenuItem, {
                            class: "text-green-500",
                            onClick: ($event) => emit("updated:payment", "COMPLETED", __props.runner.payments[0].id)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Completed ")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_DropdownMenuItem, {
                            class: "text-yellow-500",
                            onClick: ($event) => emit("updated:payment", "PENDING", __props.runner.payments[0].id)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Pending ")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_DropdownMenuItem, {
                            class: "text-red-500",
                            onClick: ($event) => emit("updated:payment", "FAILED", __props.runner.payments[0].id)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Failed ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
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
        _: 1
      }, _parent));
      if ((_a = __props.runner.volunteer_on_checkpoints) == null ? void 0 : _a.length) {
        _push(ssrRenderComponent(_component_TableRow, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_TableCell, { colspan: "6" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_TableBody, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<!--[-->`);
                          ssrRenderList(__props.runner.volunteer_on_checkpoints, (record) => {
                            _push4(ssrRenderComponent(_component_TableRow, null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(_component_TableCell, { colspan: "6" }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(_component_Table, null, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(_component_TableHeader, null, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(_component_TableRow, null, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(ssrRenderComponent(_component_TableCell, null, {
                                                            default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                              if (_push10) {
                                                                _push10(`Checkpoint`);
                                                              } else {
                                                                return [
                                                                  createTextVNode("Checkpoint")
                                                                ];
                                                              }
                                                            }),
                                                            _: 2
                                                          }, _parent9, _scopeId8));
                                                          _push9(ssrRenderComponent(_component_TableCell, null, {
                                                            default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                              if (_push10) {
                                                                _push10(`Time`);
                                                              } else {
                                                                return [
                                                                  createTextVNode("Time")
                                                                ];
                                                              }
                                                            }),
                                                            _: 2
                                                          }, _parent9, _scopeId8));
                                                        } else {
                                                          return [
                                                            createVNode(_component_TableCell, null, {
                                                              default: withCtx(() => [
                                                                createTextVNode("Checkpoint")
                                                              ]),
                                                              _: 1
                                                            }),
                                                            createVNode(_component_TableCell, null, {
                                                              default: withCtx(() => [
                                                                createTextVNode("Time")
                                                              ]),
                                                              _: 1
                                                            })
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                  } else {
                                                    return [
                                                      createVNode(_component_TableRow, null, {
                                                        default: withCtx(() => [
                                                          createVNode(_component_TableCell, null, {
                                                            default: withCtx(() => [
                                                              createTextVNode("Checkpoint")
                                                            ]),
                                                            _: 1
                                                          }),
                                                          createVNode(_component_TableCell, null, {
                                                            default: withCtx(() => [
                                                              createTextVNode("Time")
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
                                              }, _parent7, _scopeId6));
                                              _push7(ssrRenderComponent(_component_TableBody, null, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(_component_TableRow, null, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(ssrRenderComponent(_component_TableCell, null, {
                                                            default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                              var _a2, _b;
                                                              if (_push10) {
                                                                _push10(`${ssrInterpolate((_a2 = record == null ? void 0 : record.checkpoint) == null ? void 0 : _a2.name)}`);
                                                              } else {
                                                                return [
                                                                  createTextVNode(toDisplayString((_b = record == null ? void 0 : record.checkpoint) == null ? void 0 : _b.name), 1)
                                                                ];
                                                              }
                                                            }),
                                                            _: 2
                                                          }, _parent9, _scopeId8));
                                                          _push9(ssrRenderComponent(_component_TableCell, null, {
                                                            default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                              if (_push10) {
                                                                _push10(`${ssrInterpolate(record == null ? void 0 : record.timer)}`);
                                                              } else {
                                                                return [
                                                                  createTextVNode(toDisplayString(record == null ? void 0 : record.timer), 1)
                                                                ];
                                                              }
                                                            }),
                                                            _: 2
                                                          }, _parent9, _scopeId8));
                                                        } else {
                                                          return [
                                                            createVNode(_component_TableCell, null, {
                                                              default: withCtx(() => {
                                                                var _a2;
                                                                return [
                                                                  createTextVNode(toDisplayString((_a2 = record == null ? void 0 : record.checkpoint) == null ? void 0 : _a2.name), 1)
                                                                ];
                                                              }),
                                                              _: 2
                                                            }, 1024),
                                                            createVNode(_component_TableCell, null, {
                                                              default: withCtx(() => [
                                                                createTextVNode(toDisplayString(record == null ? void 0 : record.timer), 1)
                                                              ]),
                                                              _: 2
                                                            }, 1024)
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                  } else {
                                                    return [
                                                      createVNode(_component_TableRow, null, {
                                                        default: withCtx(() => [
                                                          createVNode(_component_TableCell, null, {
                                                            default: withCtx(() => {
                                                              var _a2;
                                                              return [
                                                                createTextVNode(toDisplayString((_a2 = record == null ? void 0 : record.checkpoint) == null ? void 0 : _a2.name), 1)
                                                              ];
                                                            }),
                                                            _: 2
                                                          }, 1024),
                                                          createVNode(_component_TableCell, null, {
                                                            default: withCtx(() => [
                                                              createTextVNode(toDisplayString(record == null ? void 0 : record.timer), 1)
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
                                              }, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(_component_TableHeader, null, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_TableRow, null, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_TableCell, null, {
                                                          default: withCtx(() => [
                                                            createTextVNode("Checkpoint")
                                                          ]),
                                                          _: 1
                                                        }),
                                                        createVNode(_component_TableCell, null, {
                                                          default: withCtx(() => [
                                                            createTextVNode("Time")
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
                                                    createVNode(_component_TableRow, null, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_TableCell, null, {
                                                          default: withCtx(() => {
                                                            var _a2;
                                                            return [
                                                              createTextVNode(toDisplayString((_a2 = record == null ? void 0 : record.checkpoint) == null ? void 0 : _a2.name), 1)
                                                            ];
                                                          }),
                                                          _: 2
                                                        }, 1024),
                                                        createVNode(_component_TableCell, null, {
                                                          default: withCtx(() => [
                                                            createTextVNode(toDisplayString(record == null ? void 0 : record.timer), 1)
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
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(_component_Table, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_TableHeader, null, {
                                                default: withCtx(() => [
                                                  createVNode(_component_TableRow, null, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_TableCell, null, {
                                                        default: withCtx(() => [
                                                          createTextVNode("Checkpoint")
                                                        ]),
                                                        _: 1
                                                      }),
                                                      createVNode(_component_TableCell, null, {
                                                        default: withCtx(() => [
                                                          createTextVNode("Time")
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
                                                  createVNode(_component_TableRow, null, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_TableCell, null, {
                                                        default: withCtx(() => {
                                                          var _a2;
                                                          return [
                                                            createTextVNode(toDisplayString((_a2 = record == null ? void 0 : record.checkpoint) == null ? void 0 : _a2.name), 1)
                                                          ];
                                                        }),
                                                        _: 2
                                                      }, 1024),
                                                      createVNode(_component_TableCell, null, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(record == null ? void 0 : record.timer), 1)
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
                                          }, 1024)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(_component_TableCell, { colspan: "6" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_Table, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_TableHeader, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_TableRow, null, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_TableCell, null, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Checkpoint")
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(_component_TableCell, null, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Time")
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
                                                createVNode(_component_TableRow, null, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_TableCell, null, {
                                                      default: withCtx(() => {
                                                        var _a2;
                                                        return [
                                                          createTextVNode(toDisplayString((_a2 = record == null ? void 0 : record.checkpoint) == null ? void 0 : _a2.name), 1)
                                                        ];
                                                      }),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(_component_TableCell, null, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(record == null ? void 0 : record.timer), 1)
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
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          });
                          _push4(`<!--]-->`);
                        } else {
                          return [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.runner.volunteer_on_checkpoints, (record) => {
                              return openBlock(), createBlock(_component_TableRow, null, {
                                default: withCtx(() => [
                                  createVNode(_component_TableCell, { colspan: "6" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_Table, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_TableHeader, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_TableRow, null, {
                                                default: withCtx(() => [
                                                  createVNode(_component_TableCell, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Checkpoint")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_TableCell, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Time")
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
                                              createVNode(_component_TableRow, null, {
                                                default: withCtx(() => [
                                                  createVNode(_component_TableCell, null, {
                                                    default: withCtx(() => {
                                                      var _a2;
                                                      return [
                                                        createTextVNode(toDisplayString((_a2 = record == null ? void 0 : record.checkpoint) == null ? void 0 : _a2.name), 1)
                                                      ];
                                                    }),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(_component_TableCell, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(record == null ? void 0 : record.timer), 1)
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
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_TableBody, null, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.runner.volunteer_on_checkpoints, (record) => {
                            return openBlock(), createBlock(_component_TableRow, null, {
                              default: withCtx(() => [
                                createVNode(_component_TableCell, { colspan: "6" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_Table, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_TableHeader, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_TableRow, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_TableCell, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Checkpoint")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_TableCell, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Time")
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
                                            createVNode(_component_TableRow, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_TableCell, null, {
                                                  default: withCtx(() => {
                                                    var _a2;
                                                    return [
                                                      createTextVNode(toDisplayString((_a2 = record == null ? void 0 : record.checkpoint) == null ? void 0 : _a2.name), 1)
                                                    ];
                                                  }),
                                                  _: 2
                                                }, 1024),
                                                createVNode(_component_TableCell, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(record == null ? void 0 : record.timer), 1)
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
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_TableCell, { colspan: "6" }, {
                  default: withCtx(() => [
                    createVNode(_component_TableBody, null, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.runner.volunteer_on_checkpoints, (record) => {
                          return openBlock(), createBlock(_component_TableRow, null, {
                            default: withCtx(() => [
                              createVNode(_component_TableCell, { colspan: "6" }, {
                                default: withCtx(() => [
                                  createVNode(_component_Table, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_TableHeader, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_TableRow, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_TableCell, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Checkpoint")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_TableCell, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Time")
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
                                          createVNode(_component_TableRow, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_TableCell, null, {
                                                default: withCtx(() => {
                                                  var _a2;
                                                  return [
                                                    createTextVNode(toDisplayString((_a2 = record == null ? void 0 : record.checkpoint) == null ? void 0 : _a2.name), 1)
                                                  ];
                                                }),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_TableCell, null, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(record == null ? void 0 : record.timer), 1)
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
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/dashboard/event/runner/RunnerItem.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "list",
  __ssrInlineRender: true,
  props: {
    stages: {}
  },
  emits: ["update"],
  setup(__props, { emit: __emit }) {
    const { axios } = useAxios();
    const route = useRoute$1();
    const props = __props;
    const isLoading = ref(false);
    const runners = ref([]);
    const stageID = ref(null);
    const paymentStatusOpt = ref(null);
    const paymentTypeOpt = ref(null);
    const searchText = shallowRef("");
    const stageCategoryID = ref(null);
    const selectedRunner = ref(null);
    onKeyStroke(["command", "/"], () => {
      nextTick(() => {
        var _a;
        (_a = (void 0).querySelector(".search-input")) == null ? void 0 : _a.focus();
      });
    });
    const stageCategoryList = computed(() => {
      var _a;
      if (!stageID.value) return [];
      return ((_a = props.stages.find((stage) => stage.id === stageID.value)) == null ? void 0 : _a.stage_categories) || [];
    });
    const fetch = async () => {
      const event_id = route.params.id;
      if (event_id && stageID.value) {
        isLoading.value = true;
        const stage_id = stageID.value;
        const { data } = await axios.get(`/events/${event_id}/${stage_id}/runners`, {
          params: {
            s: searchText.value,
            payment_status: paymentStatusOpt.value,
            stage_category: stageCategoryID.value,
            payment_type: paymentTypeOpt.value
          }
        });
        runners.value = data;
        isLoading.value = false;
      }
    };
    const updatePaymentStatus = async (status, id) => {
      console.log(status, id);
      await axios.put(`/events/${route.params.id}/payments/${id}`, {
        status
      });
      fetch();
    };
    const reset = () => {
      stageID.value = null;
      searchText.value = "";
      paymentStatusOpt.value = null;
      stageCategoryID.value = null;
      paymentTypeOpt.value = null;
      runners.value = [];
      fetch();
    };
    watch([paymentStatusOpt, stageID, stageCategoryID, paymentTypeOpt], fetch);
    watchDebounced(searchText, fetch, { debounce: 1e3 });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Select = _sfc_main$6$1;
      const _component_SelectTrigger = _sfc_main$1$2;
      const _component_SelectValue = _sfc_main$x;
      const _component_SelectContent = _sfc_main$5$1;
      const _component_SelectItem = _sfc_main$4$2;
      const _component_Button = _sfc_main$t;
      const _component_InputGroup = _sfc_main$8;
      const _component_InputGroupInput = _sfc_main$6;
      const _component_InputGroupAddon = _sfc_main$7;
      const _component_Table = _sfc_main$5$2;
      const _component_TableHeader = _sfc_main$y;
      const _component_TableRow = _sfc_main$2$2;
      const _component_TableHead = _sfc_main$1$3;
      const _component_TableBody = _sfc_main$4$3;
      const _component_TableCell = _sfc_main$3$1;
      const _component_Dialog = _sfc_main$4$1;
      const _component_DialogContent = _sfc_main$2$1;
      const _component_DialogHeader = _sfc_main$u;
      const _component_DialogTitle = _sfc_main$v;
      const _component_DialogDescription = _sfc_main$1$1;
      _push(`<!--[--><div class="bg-gray-100 space-y-6 mb-12 border border-dashed border-gray-400 p-3 rounded-xl"><h2 class="text-xl text-gray-400">Filters:</h2><div class="space-y-3"><div class="flex items-center gap-3">`);
      _push(ssrRenderComponent(_component_Select, {
        modelValue: unref(stageID),
        "onUpdate:modelValue": ($event) => isRef(stageID) ? stageID.value = $event : null,
        disabled: unref(isLoading)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_SelectTrigger, {
              class: "w-[200px]",
              size: "sm"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Stage: `);
                  _push3(ssrRenderComponent(_component_SelectValue, { placeholder: "" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createTextVNode(" Stage: "),
                    createVNode(_component_SelectValue, { placeholder: "" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(__props.stages, (stage) => {
                    _push3(ssrRenderComponent(_component_SelectItem, {
                      value: stage.id
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(stage.name)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(stage.name), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.stages, (stage) => {
                      return openBlock(), createBlock(_component_SelectItem, {
                        value: stage.id
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(stage.name), 1)
                        ]),
                        _: 2
                      }, 1032, ["value"]);
                    }), 256))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_SelectTrigger, {
                class: "w-[200px]",
                size: "sm"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Stage: "),
                  createVNode(_component_SelectValue, { placeholder: "" })
                ]),
                _: 1
              }),
              createVNode(_component_SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.stages, (stage) => {
                    return openBlock(), createBlock(_component_SelectItem, {
                      value: stage.id
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(stage.name), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 256))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Select, {
        modelValue: unref(stageCategoryID),
        "onUpdate:modelValue": ($event) => isRef(stageCategoryID) ? stageCategoryID.value = $event : null,
        disabled: unref(isLoading)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_SelectTrigger, {
              class: "w-[200px]",
              size: "sm"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Category: `);
                  _push3(ssrRenderComponent(_component_SelectValue, { placeholder: "" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createTextVNode(" Category: "),
                    createVNode(_component_SelectValue, { placeholder: "" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(stageCategoryList), (category) => {
                    _push3(ssrRenderComponent(_component_SelectItem, {
                      value: category.id
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(category.name)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(category.name), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(stageCategoryList), (category) => {
                      return openBlock(), createBlock(_component_SelectItem, {
                        value: category.id
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(category.name), 1)
                        ]),
                        _: 2
                      }, 1032, ["value"]);
                    }), 256))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_SelectTrigger, {
                class: "w-[200px]",
                size: "sm"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Category: "),
                  createVNode(_component_SelectValue, { placeholder: "" })
                ]),
                _: 1
              }),
              createVNode(_component_SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(stageCategoryList), (category) => {
                    return openBlock(), createBlock(_component_SelectItem, {
                      value: category.id
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(category.name), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 256))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(stageCategoryID)) {
        _push(ssrRenderComponent(_component_Button, {
          size: "sm",
          modifier: "link",
          onClick: ($event) => stageCategoryID.value = null
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`X`);
            } else {
              return [
                createTextVNode("X")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_Select, {
        modelValue: unref(paymentStatusOpt),
        "onUpdate:modelValue": ($event) => isRef(paymentStatusOpt) ? paymentStatusOpt.value = $event : null,
        disabled: unref(isLoading)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_SelectTrigger, {
              class: "w-[200px]",
              size: "sm"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Payment: `);
                  _push3(ssrRenderComponent(_component_SelectValue, { placeholder: "" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createTextVNode(" Payment: "),
                    createVNode(_component_SelectValue, { placeholder: "" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(paymentStatus), (status) => {
                    _push3(ssrRenderComponent(_component_SelectItem, { value: status }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(status)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(status), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(paymentStatus), (status) => {
                      return openBlock(), createBlock(_component_SelectItem, { value: status }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(status), 1)
                        ]),
                        _: 2
                      }, 1032, ["value"]);
                    }), 256))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_SelectTrigger, {
                class: "w-[200px]",
                size: "sm"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Payment: "),
                  createVNode(_component_SelectValue, { placeholder: "" })
                ]),
                _: 1
              }),
              createVNode(_component_SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(paymentStatus), (status) => {
                    return openBlock(), createBlock(_component_SelectItem, { value: status }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(status), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 256))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(paymentStatusOpt)) {
        _push(ssrRenderComponent(_component_Button, {
          size: "sm",
          modifier: "link",
          onClick: ($event) => paymentStatusOpt.value = null
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`X`);
            } else {
              return [
                createTextVNode("X")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_Select, {
        modelValue: unref(paymentTypeOpt),
        "onUpdate:modelValue": ($event) => isRef(paymentTypeOpt) ? paymentTypeOpt.value = $event : null,
        disabled: unref(isLoading)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_SelectTrigger, {
              class: "w-[200px]",
              size: "sm"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Payment Type: `);
                  _push3(ssrRenderComponent(_component_SelectValue, { placeholder: "" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createTextVNode(" Payment Type: "),
                    createVNode(_component_SelectValue, { placeholder: "" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_SelectContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(paymentMethods), (type) => {
                    _push3(ssrRenderComponent(_component_SelectItem, { value: type }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(type)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(type), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(paymentMethods), (type) => {
                      return openBlock(), createBlock(_component_SelectItem, { value: type }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(type), 1)
                        ]),
                        _: 2
                      }, 1032, ["value"]);
                    }), 256))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_SelectTrigger, {
                class: "w-[200px]",
                size: "sm"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Payment Type: "),
                  createVNode(_component_SelectValue, { placeholder: "" })
                ]),
                _: 1
              }),
              createVNode(_component_SelectContent, null, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(paymentMethods), (type) => {
                    return openBlock(), createBlock(_component_SelectItem, { value: type }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(type), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 256))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(paymentTypeOpt)) {
        _push(ssrRenderComponent(_component_Button, {
          size: "sm",
          modifier: "link",
          onClick: ($event) => paymentTypeOpt.value = null
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`X`);
            } else {
              return [
                createTextVNode("X")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_component_InputGroup, { size: "sm" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_InputGroupInput, {
              class: "search-input",
              modelValue: unref(searchText),
              "onUpdate:modelValue": ($event) => isRef(searchText) ? searchText.value = $event : null,
              placeholder: "Search by name or bib"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_InputGroupAddon, {
              align: "inline-end",
              class: "text-gray-300"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(CommandIcon), null, null, _parent3, _scopeId2));
                  _push3(` + / `);
                } else {
                  return [
                    createVNode(unref(CommandIcon)),
                    createTextVNode(" + / ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_InputGroupInput, {
                class: "search-input",
                modelValue: unref(searchText),
                "onUpdate:modelValue": ($event) => isRef(searchText) ? searchText.value = $event : null,
                placeholder: "Search by name or bib"
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_component_InputGroupAddon, {
                align: "inline-end",
                class: "text-gray-300"
              }, {
                default: withCtx(() => [
                  createVNode(unref(CommandIcon)),
                  createTextVNode(" + / ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex justify-end gap-2">`);
      _push(ssrRenderComponent(_component_Button, {
        variant: "secondary",
        size: "sm",
        modifier: "link",
        onClick: fetch
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`reload`);
          } else {
            return [
              createTextVNode("reload")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Button, {
        size: "sm",
        modifier: "link",
        onClick: reset,
        disabled: unref(isLoading)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`reset all`);
          } else {
            return [
              createTextVNode("reset all")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><span class="text-sm text-gray-300">showing ${ssrInterpolate(unref(runners).length)} runner${ssrInterpolate(unref(runners).length === 1 ? "" : "s")}</span>`);
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
                              _push5(`Payment`);
                            } else {
                              return [
                                createTextVNode("Payment")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_TableHead, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Payment Type`);
                            } else {
                              return [
                                createTextVNode("Payment Type")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_TableHead, { class: "text-center" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Country`);
                            } else {
                              return [
                                createTextVNode("Country")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_TableHead, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Gender`);
                            } else {
                              return [
                                createTextVNode("Gender")
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
                              createTextVNode("Name")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_TableHead, null, {
                            default: withCtx(() => [
                              createTextVNode("Payment")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_TableHead, null, {
                            default: withCtx(() => [
                              createTextVNode("Payment Type")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_TableHead, { class: "text-center" }, {
                            default: withCtx(() => [
                              createTextVNode("Country")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_TableHead, null, {
                            default: withCtx(() => [
                              createTextVNode("Gender")
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
                            createTextVNode("Name")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_TableHead, null, {
                          default: withCtx(() => [
                            createTextVNode("Payment")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_TableHead, null, {
                          default: withCtx(() => [
                            createTextVNode("Payment Type")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_TableHead, { class: "text-center" }, {
                          default: withCtx(() => [
                            createTextVNode("Country")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_TableHead, null, {
                          default: withCtx(() => [
                            createTextVNode("Gender")
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
                  ssrRenderList(unref(runners), (runner) => {
                    _push3(ssrRenderComponent(_sfc_main$5, {
                      runner,
                      "onShow:payment": ($event) => selectedRunner.value = runner,
                      "onUpdated:payment": updatePaymentStatus
                    }, null, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                  if (unref(runners).length === 0) {
                    _push3(ssrRenderComponent(_component_TableRow, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_TableCell, { colspan: "6" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<span class="text-center block p-3 text-gray-500 bg-accent rounded"${_scopeId4}> No runners found </span>`);
                              } else {
                                return [
                                  createVNode("span", { class: "text-center block p-3 text-gray-500 bg-accent rounded" }, " No runners found ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_TableCell, { colspan: "6" }, {
                              default: withCtx(() => [
                                createVNode("span", { class: "text-center block p-3 text-gray-500 bg-accent rounded" }, " No runners found ")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(runners), (runner) => {
                      return openBlock(), createBlock(_sfc_main$5, {
                        runner,
                        "onShow:payment": ($event) => selectedRunner.value = runner,
                        "onUpdated:payment": updatePaymentStatus
                      }, null, 8, ["runner", "onShow:payment"]);
                    }), 256)),
                    unref(runners).length === 0 ? (openBlock(), createBlock(_component_TableRow, { key: 0 }, {
                      default: withCtx(() => [
                        createVNode(_component_TableCell, { colspan: "6" }, {
                          default: withCtx(() => [
                            createVNode("span", { class: "text-center block p-3 text-gray-500 bg-accent rounded" }, " No runners found ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
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
                          createTextVNode("Name")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_TableHead, null, {
                        default: withCtx(() => [
                          createTextVNode("Payment")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_TableHead, null, {
                        default: withCtx(() => [
                          createTextVNode("Payment Type")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_TableHead, { class: "text-center" }, {
                        default: withCtx(() => [
                          createTextVNode("Country")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_TableHead, null, {
                        default: withCtx(() => [
                          createTextVNode("Gender")
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
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(runners), (runner) => {
                    return openBlock(), createBlock(_sfc_main$5, {
                      runner,
                      "onShow:payment": ($event) => selectedRunner.value = runner,
                      "onUpdated:payment": updatePaymentStatus
                    }, null, 8, ["runner", "onShow:payment"]);
                  }), 256)),
                  unref(runners).length === 0 ? (openBlock(), createBlock(_component_TableRow, { key: 0 }, {
                    default: withCtx(() => [
                      createVNode(_component_TableCell, { colspan: "6" }, {
                        default: withCtx(() => [
                          createVNode("span", { class: "text-center block p-3 text-gray-500 bg-accent rounded" }, " No runners found ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Dialog, {
        open: unref(selectedRunner) != null,
        "onUpdate:open": ($event) => selectedRunner.value = null
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_DialogContent, { class: "max-h-[600px] overflow-y-auto" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a, _b, _c, _d, _e, _f;
                if (_push3) {
                  _push3(ssrRenderComponent(_component_DialogHeader, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_DialogTitle, { class: "text-lg" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Payment`);
                            } else {
                              return [
                                createTextVNode("Payment")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_DialogDescription, { class: "text-base" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            var _a2, _b2, _c2, _d2, _e2, _f2;
                            if (_push5) {
                              _push5(` Payment details for <strong${_scopeId4}>${ssrInterpolate((_a2 = unref(selectedRunner)) == null ? void 0 : _a2.personal.first_name)} ${ssrInterpolate((_b2 = unref(selectedRunner)) == null ? void 0 : _b2.personal.middle_name)} ${ssrInterpolate((_c2 = unref(selectedRunner)) == null ? void 0 : _c2.personal.last_name)}</strong>`);
                            } else {
                              return [
                                createTextVNode(" Payment details for "),
                                createVNode("strong", null, toDisplayString((_d2 = unref(selectedRunner)) == null ? void 0 : _d2.personal.first_name) + " " + toDisplayString((_e2 = unref(selectedRunner)) == null ? void 0 : _e2.personal.middle_name) + " " + toDisplayString((_f2 = unref(selectedRunner)) == null ? void 0 : _f2.personal.last_name), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_DialogTitle, { class: "text-lg" }, {
                            default: withCtx(() => [
                              createTextVNode("Payment")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_DialogDescription, { class: "text-base" }, {
                            default: withCtx(() => {
                              var _a2, _b2, _c2;
                              return [
                                createTextVNode(" Payment details for "),
                                createVNode("strong", null, toDisplayString((_a2 = unref(selectedRunner)) == null ? void 0 : _a2.personal.first_name) + " " + toDisplayString((_b2 = unref(selectedRunner)) == null ? void 0 : _b2.personal.middle_name) + " " + toDisplayString((_c2 = unref(selectedRunner)) == null ? void 0 : _c2.personal.last_name), 1)
                              ];
                            }),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="space-y-4 divide-y divide-gray-200 text-sm"${_scopeId2}><!--[-->`);
                  ssrRenderList((_a = unref(selectedRunner)) == null ? void 0 : _a.payments, (payment) => {
                    var _a2;
                    _push3(`<div class="space-y-2 pb-4"${_scopeId2}><div class="flex justify-between"${_scopeId2}><span${_scopeId2}>Payment Type</span><span${_scopeId2}>${ssrInterpolate(payment.type)}</span></div><div class="flex justify-between"${_scopeId2}><span${_scopeId2}>Payment Status</span><span${_scopeId2}>${ssrInterpolate(payment.status)}</span></div><div class="flex justify-between"${_scopeId2}><span${_scopeId2}>Payment Amount</span><span${_scopeId2}>${ssrInterpolate(payment.amount)}</span></div><div class="flex justify-between"${_scopeId2}><span${_scopeId2}>Payment Date</span><span${_scopeId2}>${ssrInterpolate(unref(moment)(payment.created_at).fromNow())}</span></div>`);
                    if (payment == null ? void 0 : payment.screenshot) {
                      _push3(`<figure class="text-xs border p-1 rounded-sm"${_scopeId2}><figcaption${_scopeId2}>Screenshot of payment</figcaption><img${ssrRenderAttr("src", unref(showImage)((_a2 = payment == null ? void 0 : payment.screenshot) == null ? void 0 : _a2.file_name))}${_scopeId2}></figure>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                  });
                  _push3(`<!--]-->`);
                  if (((_b = unref(selectedRunner)) == null ? void 0 : _b.payments.length) === 0) {
                    _push3(`<span class="text-center block p-3 text-gray-500 bg-accent rounded"${_scopeId2}> No payments information found for <strong${_scopeId2}>${ssrInterpolate((_c = unref(selectedRunner)) == null ? void 0 : _c.personal.first_name)}</strong></span>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode(_component_DialogHeader, null, {
                      default: withCtx(() => [
                        createVNode(_component_DialogTitle, { class: "text-lg" }, {
                          default: withCtx(() => [
                            createTextVNode("Payment")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_DialogDescription, { class: "text-base" }, {
                          default: withCtx(() => {
                            var _a2, _b2, _c2;
                            return [
                              createTextVNode(" Payment details for "),
                              createVNode("strong", null, toDisplayString((_a2 = unref(selectedRunner)) == null ? void 0 : _a2.personal.first_name) + " " + toDisplayString((_b2 = unref(selectedRunner)) == null ? void 0 : _b2.personal.middle_name) + " " + toDisplayString((_c2 = unref(selectedRunner)) == null ? void 0 : _c2.personal.last_name), 1)
                            ];
                          }),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "space-y-4 divide-y divide-gray-200 text-sm" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList((_d = unref(selectedRunner)) == null ? void 0 : _d.payments, (payment) => {
                        var _a2;
                        return openBlock(), createBlock("div", { class: "space-y-2 pb-4" }, [
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", null, "Payment Type"),
                            createVNode("span", null, toDisplayString(payment.type), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", null, "Payment Status"),
                            createVNode("span", null, toDisplayString(payment.status), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", null, "Payment Amount"),
                            createVNode("span", null, toDisplayString(payment.amount), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", null, "Payment Date"),
                            createVNode("span", null, toDisplayString(unref(moment)(payment.created_at).fromNow()), 1)
                          ]),
                          (payment == null ? void 0 : payment.screenshot) ? (openBlock(), createBlock("figure", {
                            key: 0,
                            class: "text-xs border p-1 rounded-sm"
                          }, [
                            createVNode("figcaption", null, "Screenshot of payment"),
                            createVNode("img", {
                              src: unref(showImage)((_a2 = payment == null ? void 0 : payment.screenshot) == null ? void 0 : _a2.file_name)
                            }, null, 8, ["src"])
                          ])) : createCommentVNode("", true)
                        ]);
                      }), 256)),
                      ((_e = unref(selectedRunner)) == null ? void 0 : _e.payments.length) === 0 ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "text-center block p-3 text-gray-500 bg-accent rounded"
                      }, [
                        createTextVNode(" No payments information found for "),
                        createVNode("strong", null, toDisplayString((_f = unref(selectedRunner)) == null ? void 0 : _f.personal.first_name), 1)
                      ])) : createCommentVNode("", true)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_DialogContent, { class: "max-h-[600px] overflow-y-auto" }, {
                default: withCtx(() => {
                  var _a, _b, _c;
                  return [
                    createVNode(_component_DialogHeader, null, {
                      default: withCtx(() => [
                        createVNode(_component_DialogTitle, { class: "text-lg" }, {
                          default: withCtx(() => [
                            createTextVNode("Payment")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_DialogDescription, { class: "text-base" }, {
                          default: withCtx(() => {
                            var _a2, _b2, _c2;
                            return [
                              createTextVNode(" Payment details for "),
                              createVNode("strong", null, toDisplayString((_a2 = unref(selectedRunner)) == null ? void 0 : _a2.personal.first_name) + " " + toDisplayString((_b2 = unref(selectedRunner)) == null ? void 0 : _b2.personal.middle_name) + " " + toDisplayString((_c2 = unref(selectedRunner)) == null ? void 0 : _c2.personal.last_name), 1)
                            ];
                          }),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "space-y-4 divide-y divide-gray-200 text-sm" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList((_a = unref(selectedRunner)) == null ? void 0 : _a.payments, (payment) => {
                        var _a2;
                        return openBlock(), createBlock("div", { class: "space-y-2 pb-4" }, [
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", null, "Payment Type"),
                            createVNode("span", null, toDisplayString(payment.type), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", null, "Payment Status"),
                            createVNode("span", null, toDisplayString(payment.status), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", null, "Payment Amount"),
                            createVNode("span", null, toDisplayString(payment.amount), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", null, "Payment Date"),
                            createVNode("span", null, toDisplayString(unref(moment)(payment.created_at).fromNow()), 1)
                          ]),
                          (payment == null ? void 0 : payment.screenshot) ? (openBlock(), createBlock("figure", {
                            key: 0,
                            class: "text-xs border p-1 rounded-sm"
                          }, [
                            createVNode("figcaption", null, "Screenshot of payment"),
                            createVNode("img", {
                              src: unref(showImage)((_a2 = payment == null ? void 0 : payment.screenshot) == null ? void 0 : _a2.file_name)
                            }, null, 8, ["src"])
                          ])) : createCommentVNode("", true)
                        ]);
                      }), 256)),
                      ((_b = unref(selectedRunner)) == null ? void 0 : _b.payments.length) === 0 ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "text-center block p-3 text-gray-500 bg-accent rounded"
                      }, [
                        createTextVNode(" No payments information found for "),
                        createVNode("strong", null, toDisplayString((_c = unref(selectedRunner)) == null ? void 0 : _c.personal.first_name), 1)
                      ])) : createCommentVNode("", true)
                    ])
                  ];
                }),
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
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/dashboard/event/runner/list.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "form",
  __ssrInlineRender: true,
  props: {
    eventId: {},
    sponsor: {}
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const form = useTemplateRef("form");
    const { axios } = useAxios();
    const isLoading = ref(false);
    const sponsorTypes = ref([]);
    const onSubmit = async (values) => {
      isLoading.value = true;
      const method = props.sponsor ? "put" : "post";
      const url = props.sponsor ? `/events/${props.eventId}/sponsors/${props.sponsor.id}` : `/events/${props.eventId}/sponsors`;
      await axios[method](url, values);
      isLoading.value = false;
      emit("close");
    };
    const fileHandler = (event) => {
      const target = event.target;
      const files = target.files;
      if (files && files.length > 0) {
        const reader = new FileReader();
        reader.onload = (e) => {
          var _a, _b;
          (_b = form.value) == null ? void 0 : _b.setFieldValue("image", (_a = e.target) == null ? void 0 : _a.result);
        };
        reader.readAsDataURL(files[0]);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Input = _sfc_main$A;
      const _component_Select = _sfc_main$6$1;
      const _component_SelectTrigger = _sfc_main$1$2;
      const _component_SelectValue = _sfc_main$x;
      const _component_SelectContent = _sfc_main$5$1;
      const _component_SelectItem = _sfc_main$4$2;
      const _component_Button = _sfc_main$t;
      _push(ssrRenderComponent(unref(Form), mergeProps({
        ref_key: "form",
        ref: form,
        "validation-schema": unref(sponsorSchema),
        class: "space-y-4 pt-8",
        onSubmit
      }, _attrs), {
        default: withCtx(({ values }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Field), {
              name: "event_id",
              type: "hidden",
              value: __props.eventId
            }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<input${ssrRenderAttrs(mergeProps({ type: "hidden" }, field))}${_scopeId2}>`);
                } else {
                  return [
                    createVNode("input", mergeProps({ type: "hidden" }, field), null, 16)
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Field), {
              name: "name",
              as: "div",
              class: "space-y-2"
            }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<label for="name"${_scopeId2}>Name</label>`);
                  _push3(ssrRenderComponent(_component_Input, mergeProps({
                    type: "text",
                    id: "name"
                  }, field), null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "name" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("label", { for: "name" }, "Name"),
                    createVNode(_component_Input, mergeProps({
                      type: "text",
                      id: "name"
                    }, field), null, 16),
                    createVNode(unref(ErrorMessage), { name: "name" })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Field), {
              name: "description",
              as: "div",
              class: "space-y-2"
            }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<label for="description"${_scopeId2}>Description</label>`);
                  _push3(ssrRenderComponent(_component_Input, mergeProps({
                    type: "text",
                    id: "description"
                  }, field), null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "description" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("label", { for: "description" }, "Description"),
                    createVNode(_component_Input, mergeProps({
                      type: "text",
                      id: "description"
                    }, field), null, 16),
                    createVNode(unref(ErrorMessage), { name: "description" })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Field), {
              name: "type",
              as: "div",
              class: "space-y-2"
            }, {
              default: withCtx(({ value, handleChange }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<label for="type"${_scopeId2}>Type</label>`);
                  _push3(ssrRenderComponent(_component_Select, {
                    "model-value": value,
                    "onUpdate:modelValue": handleChange
                  }, {
                    default: withCtx((_, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_SelectTrigger, { class: "w-full" }, {
                          default: withCtx((_2, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_SelectValue, { placeholder: "Select a type" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_SelectValue, { placeholder: "Select a type" })
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_SelectContent, null, {
                          default: withCtx((_2, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(unref(sponsorTypes), (type) => {
                                _push5(ssrRenderComponent(_component_SelectItem, {
                                  value: type.id
                                }, {
                                  default: withCtx((_3, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(type.name)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(type.name), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(sponsorTypes), (type) => {
                                  return openBlock(), createBlock(_component_SelectItem, {
                                    value: type.id
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(type.name), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 256))
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_SelectTrigger, { class: "w-full" }, {
                            default: withCtx(() => [
                              createVNode(_component_SelectValue, { placeholder: "Select a type" })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_SelectContent, null, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(sponsorTypes), (type) => {
                                return openBlock(), createBlock(_component_SelectItem, {
                                  value: type.id
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(type.name), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["value"]);
                              }), 256))
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "type" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("label", { for: "type" }, "Type"),
                    createVNode(_component_Select, {
                      "model-value": value,
                      "onUpdate:modelValue": handleChange
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_SelectTrigger, { class: "w-full" }, {
                          default: withCtx(() => [
                            createVNode(_component_SelectValue, { placeholder: "Select a type" })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_SelectContent, null, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(sponsorTypes), (type) => {
                              return openBlock(), createBlock(_component_SelectItem, {
                                value: type.id
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(type.name), 1)
                                ]),
                                _: 2
                              }, 1032, ["value"]);
                            }), 256))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["model-value", "onUpdate:modelValue"]),
                    createVNode(unref(ErrorMessage), { name: "type" })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Field), {
              name: "url",
              as: "div",
              class: "space-y-2"
            }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<label for="url"${_scopeId2}>URL</label>`);
                  _push3(ssrRenderComponent(_component_Input, mergeProps({
                    type: "text",
                    id: "url"
                  }, field), null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ErrorMessage), { name: "url" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("label", { for: "url" }, "URL"),
                    createVNode(_component_Input, mergeProps({
                      type: "text",
                      id: "url"
                    }, field), null, 16),
                    createVNode(unref(ErrorMessage), { name: "url" })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`<div class="space-y-2"${_scopeId}><label class="flex justify-center items-center p-3 border border-dashed border-gray-300 rounded-md"${_scopeId}><input type="file" accept="image/*" class="sr-only"${_scopeId}>`);
            if (values.image) {
              _push2(`<img${ssrRenderAttr("src", values.image)} alt="Image" class="w-24 h-24 object-contain"${_scopeId}>`);
            } else {
              _push2(`<div class="text-center"${_scopeId}><strong class="text-lg block"${_scopeId}>Upload image</strong></div>`);
            }
            _push2(`</label>`);
            _push2(ssrRenderComponent(unref(ErrorMessage), { name: "image" }, null, _parent2, _scopeId));
            _push2(`</div><div class="text-right"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Button, {
              variant: "secondary",
              type: "submit",
              disabled: unref(isLoading)
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(isLoading)) {
                    _push3(ssrRenderComponent(unref(LoaderIcon), { class: "mr-2 h-4 w-4 animate-spin" }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(` Submit `);
                } else {
                  return [
                    unref(isLoading) ? (openBlock(), createBlock(unref(LoaderIcon), {
                      key: 0,
                      class: "mr-2 h-4 w-4 animate-spin"
                    })) : createCommentVNode("", true),
                    createTextVNode(" Submit ")
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode(unref(Field), {
                name: "event_id",
                type: "hidden",
                value: __props.eventId
              }, {
                default: withCtx(({ field }) => [
                  createVNode("input", mergeProps({ type: "hidden" }, field), null, 16)
                ]),
                _: 1
              }, 8, ["value"]),
              createVNode(unref(Field), {
                name: "name",
                as: "div",
                class: "space-y-2"
              }, {
                default: withCtx(({ field }) => [
                  createVNode("label", { for: "name" }, "Name"),
                  createVNode(_component_Input, mergeProps({
                    type: "text",
                    id: "name"
                  }, field), null, 16),
                  createVNode(unref(ErrorMessage), { name: "name" })
                ]),
                _: 1
              }),
              createVNode(unref(Field), {
                name: "description",
                as: "div",
                class: "space-y-2"
              }, {
                default: withCtx(({ field }) => [
                  createVNode("label", { for: "description" }, "Description"),
                  createVNode(_component_Input, mergeProps({
                    type: "text",
                    id: "description"
                  }, field), null, 16),
                  createVNode(unref(ErrorMessage), { name: "description" })
                ]),
                _: 1
              }),
              createVNode(unref(Field), {
                name: "type",
                as: "div",
                class: "space-y-2"
              }, {
                default: withCtx(({ value, handleChange }) => [
                  createVNode("label", { for: "type" }, "Type"),
                  createVNode(_component_Select, {
                    "model-value": value,
                    "onUpdate:modelValue": handleChange
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_SelectTrigger, { class: "w-full" }, {
                        default: withCtx(() => [
                          createVNode(_component_SelectValue, { placeholder: "Select a type" })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_SelectContent, null, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(sponsorTypes), (type) => {
                            return openBlock(), createBlock(_component_SelectItem, {
                              value: type.id
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(type.name), 1)
                              ]),
                              _: 2
                            }, 1032, ["value"]);
                          }), 256))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["model-value", "onUpdate:modelValue"]),
                  createVNode(unref(ErrorMessage), { name: "type" })
                ]),
                _: 1
              }),
              createVNode(unref(Field), {
                name: "url",
                as: "div",
                class: "space-y-2"
              }, {
                default: withCtx(({ field }) => [
                  createVNode("label", { for: "url" }, "URL"),
                  createVNode(_component_Input, mergeProps({
                    type: "text",
                    id: "url"
                  }, field), null, 16),
                  createVNode(unref(ErrorMessage), { name: "url" })
                ]),
                _: 1
              }),
              createVNode("div", { class: "space-y-2" }, [
                createVNode("label", { class: "flex justify-center items-center p-3 border border-dashed border-gray-300 rounded-md" }, [
                  createVNode("input", {
                    type: "file",
                    accept: "image/*",
                    onChange: fileHandler,
                    class: "sr-only"
                  }, null, 32),
                  values.image ? (openBlock(), createBlock("img", {
                    key: 0,
                    src: values.image,
                    alt: "Image",
                    class: "w-24 h-24 object-contain"
                  }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "text-center"
                  }, [
                    createVNode("strong", { class: "text-lg block" }, "Upload image")
                  ]))
                ]),
                createVNode(unref(ErrorMessage), { name: "image" })
              ]),
              createVNode("div", { class: "text-right" }, [
                createVNode(_component_Button, {
                  variant: "secondary",
                  type: "submit",
                  disabled: unref(isLoading)
                }, {
                  default: withCtx(() => [
                    unref(isLoading) ? (openBlock(), createBlock(unref(LoaderIcon), {
                      key: 0,
                      class: "mr-2 h-4 w-4 animate-spin"
                    })) : createCommentVNode("", true),
                    createTextVNode(" Submit ")
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/dashboard/event/sponsor/form.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "list",
  __ssrInlineRender: true,
  props: {
    eventId: {}
  },
  setup(__props) {
    const props = __props;
    const { axios } = useAxios();
    const sponsors = ref([]);
    const showDialog = ref(false);
    const editSponsor = ref(null);
    const fetch = async () => {
      const { data } = await axios.get(`/events/${props.eventId}/sponsors`);
      sponsors.value = data;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = _sfc_main$t;
      const _component_Table = _sfc_main$5$2;
      const _component_TableHeader = _sfc_main$y;
      const _component_TableRow = _sfc_main$2$2;
      const _component_TableHead = _sfc_main$1$3;
      const _component_TableBody = _sfc_main$4$3;
      const _component_TableCell = _sfc_main$3$1;
      const _component_Avatar = _sfc_main$2$3;
      const _component_AvatarImage = _sfc_main$z;
      const _component_AvatarFallback = _sfc_main$1$4;
      const _component_Dialog = _sfc_main$4$1;
      const _component_DialogContent = _sfc_main$2$1;
      const _component_DialogHeader = _sfc_main$u;
      const _component_DialogTitle = _sfc_main$v;
      const _component_DialogDescription = _sfc_main$1$1;
      _push(`<!--[--><div class="text-right mb-12">`);
      _push(ssrRenderComponent(_component_Button, {
        type: "button",
        onClick: ($event) => showDialog.value = true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Add Sponsor`);
          } else {
            return [
              createTextVNode("Add Sponsor")
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
                              _push5(`Description`);
                            } else {
                              return [
                                createTextVNode("Description")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_TableHead, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Type`);
                            } else {
                              return [
                                createTextVNode("Type")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_TableHead, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`URL`);
                            } else {
                              return [
                                createTextVNode("URL")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_TableHead, null, {
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
                              createTextVNode("Name")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_TableHead, null, {
                            default: withCtx(() => [
                              createTextVNode("Description")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_TableHead, null, {
                            default: withCtx(() => [
                              createTextVNode("Type")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_TableHead, null, {
                            default: withCtx(() => [
                              createTextVNode("URL")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_TableHead, null, {
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
                            createTextVNode("Name")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_TableHead, null, {
                          default: withCtx(() => [
                            createTextVNode("Description")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_TableHead, null, {
                          default: withCtx(() => [
                            createTextVNode("Type")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_TableHead, null, {
                          default: withCtx(() => [
                            createTextVNode("URL")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_TableHead, null, {
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
                  ssrRenderList(unref(sponsors), (sponsor) => {
                    _push3(ssrRenderComponent(_component_TableRow, {
                      key: sponsor.id
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_TableCell, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_Avatar, { class: "w-12 h-12 inline-block align-middle" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_AvatarImage, {
                                        src: unref(showImage)(sponsor.thumbnail.file_name)
                                      }, null, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_AvatarFallback, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(sponsor.name.charAt(0).toUpperCase())}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(sponsor.name.charAt(0).toUpperCase()), 1)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_AvatarImage, {
                                          src: unref(showImage)(sponsor.thumbnail.file_name)
                                        }, null, 8, ["src"]),
                                        createVNode(_component_AvatarFallback, null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(sponsor.name.charAt(0).toUpperCase()), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(` ${ssrInterpolate(sponsor.name)}`);
                              } else {
                                return [
                                  createVNode(_component_Avatar, { class: "w-12 h-12 inline-block align-middle" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_AvatarImage, {
                                        src: unref(showImage)(sponsor.thumbnail.file_name)
                                      }, null, 8, ["src"]),
                                      createVNode(_component_AvatarFallback, null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(sponsor.name.charAt(0).toUpperCase()), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createTextVNode(" " + toDisplayString(sponsor.name), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_TableCell, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(sponsor.description)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(sponsor.description), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_TableCell, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(sponsor.sponsorType.name)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(sponsor.sponsorType.name), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_TableCell, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(sponsor.url)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(sponsor.url), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_TableCell, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_Button, {
                                  type: "button",
                                  variant: "secondary",
                                  onClick: ($event) => {
                                    editSponsor.value = sponsor;
                                    showDialog.value = true;
                                  }
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`Edit`);
                                    } else {
                                      return [
                                        createTextVNode("Edit")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_Button, {
                                    type: "button",
                                    variant: "secondary",
                                    onClick: ($event) => {
                                      editSponsor.value = sponsor;
                                      showDialog.value = true;
                                    }
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Edit")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_TableCell, null, {
                              default: withCtx(() => [
                                createVNode(_component_Avatar, { class: "w-12 h-12 inline-block align-middle" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_AvatarImage, {
                                      src: unref(showImage)(sponsor.thumbnail.file_name)
                                    }, null, 8, ["src"]),
                                    createVNode(_component_AvatarFallback, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(sponsor.name.charAt(0).toUpperCase()), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024),
                                createTextVNode(" " + toDisplayString(sponsor.name), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_TableCell, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(sponsor.description), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_TableCell, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(sponsor.sponsorType.name), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_TableCell, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(sponsor.url), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_TableCell, null, {
                              default: withCtx(() => [
                                createVNode(_component_Button, {
                                  type: "button",
                                  variant: "secondary",
                                  onClick: ($event) => {
                                    editSponsor.value = sponsor;
                                    showDialog.value = true;
                                  }
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Edit")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
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
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(sponsors), (sponsor) => {
                      return openBlock(), createBlock(_component_TableRow, {
                        key: sponsor.id
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_TableCell, null, {
                            default: withCtx(() => [
                              createVNode(_component_Avatar, { class: "w-12 h-12 inline-block align-middle" }, {
                                default: withCtx(() => [
                                  createVNode(_component_AvatarImage, {
                                    src: unref(showImage)(sponsor.thumbnail.file_name)
                                  }, null, 8, ["src"]),
                                  createVNode(_component_AvatarFallback, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(sponsor.name.charAt(0).toUpperCase()), 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024),
                              createTextVNode(" " + toDisplayString(sponsor.name), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_component_TableCell, null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(sponsor.description), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_component_TableCell, null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(sponsor.sponsorType.name), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_component_TableCell, null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(sponsor.url), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_component_TableCell, null, {
                            default: withCtx(() => [
                              createVNode(_component_Button, {
                                type: "button",
                                variant: "secondary",
                                onClick: ($event) => {
                                  editSponsor.value = sponsor;
                                  showDialog.value = true;
                                }
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Edit")
                                ]),
                                _: 1
                              }, 8, ["onClick"])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024);
                    }), 128))
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
                          createTextVNode("Name")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_TableHead, null, {
                        default: withCtx(() => [
                          createTextVNode("Description")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_TableHead, null, {
                        default: withCtx(() => [
                          createTextVNode("Type")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_TableHead, null, {
                        default: withCtx(() => [
                          createTextVNode("URL")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_TableHead, null, {
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
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(sponsors), (sponsor) => {
                    return openBlock(), createBlock(_component_TableRow, {
                      key: sponsor.id
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_TableCell, null, {
                          default: withCtx(() => [
                            createVNode(_component_Avatar, { class: "w-12 h-12 inline-block align-middle" }, {
                              default: withCtx(() => [
                                createVNode(_component_AvatarImage, {
                                  src: unref(showImage)(sponsor.thumbnail.file_name)
                                }, null, 8, ["src"]),
                                createVNode(_component_AvatarFallback, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(sponsor.name.charAt(0).toUpperCase()), 1)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024),
                            createTextVNode(" " + toDisplayString(sponsor.name), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(_component_TableCell, null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(sponsor.description), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(_component_TableCell, null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(sponsor.sponsorType.name), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(_component_TableCell, null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(sponsor.url), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(_component_TableCell, null, {
                          default: withCtx(() => [
                            createVNode(_component_Button, {
                              type: "button",
                              variant: "secondary",
                              onClick: ($event) => {
                                editSponsor.value = sponsor;
                                showDialog.value = true;
                              }
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Edit")
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Dialog, {
        open: unref(showDialog),
        "onUpdate:open": ($event) => showDialog.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_DialogContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_DialogHeader, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_DialogTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Add Sponsor`);
                            } else {
                              return [
                                createTextVNode("Add Sponsor")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_DialogDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Add a new sponsor to the event `);
                            } else {
                              return [
                                createTextVNode(" Add a new sponsor to the event ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_DialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Add Sponsor")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_DialogDescription, null, {
                            default: withCtx(() => [
                              createTextVNode(" Add a new sponsor to the event ")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    "event-id": props.eventId,
                    sponsor: unref(editSponsor),
                    onClose: ($event) => {
                      showDialog.value = false;
                      fetch();
                    }
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_DialogHeader, null, {
                      default: withCtx(() => [
                        createVNode(_component_DialogTitle, null, {
                          default: withCtx(() => [
                            createTextVNode("Add Sponsor")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_DialogDescription, null, {
                          default: withCtx(() => [
                            createTextVNode(" Add a new sponsor to the event ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_sfc_main$3, {
                      "event-id": props.eventId,
                      sponsor: unref(editSponsor),
                      onClose: ($event) => {
                        showDialog.value = false;
                        fetch();
                      }
                    }, null, 8, ["event-id", "sponsor", "onClose"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_DialogContent, null, {
                default: withCtx(() => [
                  createVNode(_component_DialogHeader, null, {
                    default: withCtx(() => [
                      createVNode(_component_DialogTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Add Sponsor")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_DialogDescription, null, {
                        default: withCtx(() => [
                          createTextVNode(" Add a new sponsor to the event ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_sfc_main$3, {
                    "event-id": props.eventId,
                    sponsor: unref(editSponsor),
                    onClose: ($event) => {
                      showDialog.value = false;
                      fetch();
                    }
                  }, null, 8, ["event-id", "sponsor", "onClose"])
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/dashboard/event/sponsor/list.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "list",
  __ssrInlineRender: true,
  props: {
    eventId: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/dashboard/event/settings/list.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Events"
    });
    const route = useRoute();
    const { get } = useEventStore();
    const trailRace = ref(null);
    const isLoading = ref(false);
    const fetchEventDetail = async () => {
      trailRace.value = await get(route.params.id);
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_Button = _sfc_main$t;
      const _component_Tabs = _sfc_main$s;
      const _component_TabsList = _sfc_main$q;
      const _component_TabsTrigger = _sfc_main$p;
      const _component_TabsContent = _sfc_main$r;
      if (unref(trailRace)) {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_sfc_main$o, {
          "trail-race": unref(trailRace),
          onUpdate: fetchEventDetail
        }, null, _parent));
        _push(`<div class="bg-white flex items-center gap-4 px-4 pt-4 pb-20 -mt-16 rounded-xl relative z-10"><div class="flex-grow"><h1 class="text-2xl">${ssrInterpolate((_a = unref(trailRace)) == null ? void 0 : _a.name)}</h1></div><div class="flex gap-2 items-center">`);
        _push(ssrRenderComponent(_component_Button, {
          onClick: fetchEventDetail,
          variant: "secondary",
          modifier: "outline",
          size: "icon"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(RefreshCwIcon), {
                class: { "animate-spin": unref(isLoading) }
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(RefreshCwIcon), {
                  class: { "animate-spin": unref(isLoading) }
                }, null, 8, ["class"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_Button, {
          onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))({ name: "dashboard-events" })
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(MoveLeftIcon), null, null, _parent2, _scopeId));
              _push2(` Back `);
            } else {
              return [
                createVNode(unref(MoveLeftIcon)),
                createTextVNode(" Back ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
        _push(ssrRenderComponent(_component_Tabs, {
          "default-value": "detail",
          class: "text-gray-600"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_TabsList, { class: "uppercase" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_TabsTrigger, { value: "detail" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Details `);
                        } else {
                          return [
                            createTextVNode(" Details ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_TabsTrigger, { value: "stages" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Stages `);
                        } else {
                          return [
                            createTextVNode(" Stages ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_TabsTrigger, { value: "runners" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Runners `);
                        } else {
                          return [
                            createTextVNode(" Runners ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_TabsTrigger, { value: "volunteers" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Volunteers `);
                        } else {
                          return [
                            createTextVNode(" Volunteers ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_TabsTrigger, { value: "gallery" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Galleries `);
                        } else {
                          return [
                            createTextVNode(" Galleries ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_TabsTrigger, { value: "sponsor" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Sponsors `);
                        } else {
                          return [
                            createTextVNode(" Sponsors ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_TabsTrigger, { value: "settings" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Settings `);
                        } else {
                          return [
                            createTextVNode(" Settings ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_TabsTrigger, { value: "detail" }, {
                        default: withCtx(() => [
                          createTextVNode(" Details ")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_TabsTrigger, { value: "stages" }, {
                        default: withCtx(() => [
                          createTextVNode(" Stages ")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_TabsTrigger, { value: "runners" }, {
                        default: withCtx(() => [
                          createTextVNode(" Runners ")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_TabsTrigger, { value: "volunteers" }, {
                        default: withCtx(() => [
                          createTextVNode(" Volunteers ")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_TabsTrigger, { value: "gallery" }, {
                        default: withCtx(() => [
                          createTextVNode(" Galleries ")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_TabsTrigger, { value: "sponsor" }, {
                        default: withCtx(() => [
                          createTextVNode(" Sponsors ")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_TabsTrigger, { value: "settings" }, {
                        default: withCtx(() => [
                          createTextVNode(" Settings ")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_TabsContent, { value: "detail" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  var _a2, _b, _c, _d;
                  if (_push3) {
                    _push3(`<div class="flex flex-col gap-4"${_scopeId2}><dl class="text-md"${_scopeId2}><dt${_scopeId2}>Starts:</dt><dd${_scopeId2}>${ssrInterpolate(unref(formatDate)((_a2 = unref(trailRace)) == null ? void 0 : _a2.start))}</dd><dt${_scopeId2}>Ends:</dt><dd${_scopeId2}>${ssrInterpolate(unref(formatDate)((_b = unref(trailRace)) == null ? void 0 : _b.end))}</dd></dl><div class="text"${_scopeId2}>${ssrInterpolate(unref(trailRace).excerpt)}</div>`);
                    _push3(ssrRenderComponent(_sfc_main$l, {
                      "trail-race": unref(trailRace),
                      onUpdate: fetchEventDetail
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_sfc_main$m, {
                      "trail-race": unref(trailRace),
                      onUpdate: fetchEventDetail
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex flex-col gap-4" }, [
                        createVNode("dl", { class: "text-md" }, [
                          createVNode("dt", null, "Starts:"),
                          createVNode("dd", null, toDisplayString(unref(formatDate)((_c = unref(trailRace)) == null ? void 0 : _c.start)), 1),
                          createVNode("dt", null, "Ends:"),
                          createVNode("dd", null, toDisplayString(unref(formatDate)((_d = unref(trailRace)) == null ? void 0 : _d.end)), 1)
                        ]),
                        createVNode("div", { class: "text" }, toDisplayString(unref(trailRace).excerpt), 1),
                        createVNode(_sfc_main$l, {
                          "trail-race": unref(trailRace),
                          onUpdate: fetchEventDetail
                        }, null, 8, ["trail-race"]),
                        createVNode(_sfc_main$m, {
                          "trail-race": unref(trailRace),
                          onUpdate: fetchEventDetail
                        }, null, 8, ["trail-race"])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_TabsContent, { value: "stages" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_sfc_main$c, {
                      "event-id": unref(route).params.id,
                      onUpdate: fetchEventDetail
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_sfc_main$c, {
                        "event-id": unref(route).params.id,
                        onUpdate: fetchEventDetail
                      }, null, 8, ["event-id"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_TabsContent, { value: "runners" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_sfc_main$4, {
                      stages: unref(trailRace).stages,
                      onUpdate: fetchEventDetail
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_sfc_main$4, {
                        stages: unref(trailRace).stages,
                        onUpdate: fetchEventDetail
                      }, null, 8, ["stages"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_TabsContent, { value: "volunteers" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_sfc_main$9, {
                      stages: unref(trailRace).stages,
                      onUpdate: fetchEventDetail
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_sfc_main$9, {
                        stages: unref(trailRace).stages,
                        onUpdate: fetchEventDetail
                      }, null, 8, ["stages"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_TabsContent, { value: "gallery" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_sfc_main$b, {
                      "event-id": unref(route).params.id
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_sfc_main$b, {
                        "event-id": unref(route).params.id
                      }, null, 8, ["event-id"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_TabsContent, { value: "sponsor" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_sfc_main$2, {
                      "event-id": unref(route).params.id
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_sfc_main$2, {
                        "event-id": unref(route).params.id
                      }, null, 8, ["event-id"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_TabsContent, { value: "payments" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_sfc_main$f, {
                      "event-id": unref(route).params.id
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_sfc_main$f, {
                        "event-id": unref(route).params.id
                      }, null, 8, ["event-id"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_TabsContent, { value: "settings" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_sfc_main$1, {
                      "event-id": unref(route).params.id
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_sfc_main$1, {
                        "event-id": unref(route).params.id
                      }, null, 8, ["event-id"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_TabsList, { class: "uppercase" }, {
                  default: withCtx(() => [
                    createVNode(_component_TabsTrigger, { value: "detail" }, {
                      default: withCtx(() => [
                        createTextVNode(" Details ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_TabsTrigger, { value: "stages" }, {
                      default: withCtx(() => [
                        createTextVNode(" Stages ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_TabsTrigger, { value: "runners" }, {
                      default: withCtx(() => [
                        createTextVNode(" Runners ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_TabsTrigger, { value: "volunteers" }, {
                      default: withCtx(() => [
                        createTextVNode(" Volunteers ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_TabsTrigger, { value: "gallery" }, {
                      default: withCtx(() => [
                        createTextVNode(" Galleries ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_TabsTrigger, { value: "sponsor" }, {
                      default: withCtx(() => [
                        createTextVNode(" Sponsors ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_TabsTrigger, { value: "settings" }, {
                      default: withCtx(() => [
                        createTextVNode(" Settings ")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_TabsContent, { value: "detail" }, {
                  default: withCtx(() => {
                    var _a2, _b;
                    return [
                      createVNode("div", { class: "flex flex-col gap-4" }, [
                        createVNode("dl", { class: "text-md" }, [
                          createVNode("dt", null, "Starts:"),
                          createVNode("dd", null, toDisplayString(unref(formatDate)((_a2 = unref(trailRace)) == null ? void 0 : _a2.start)), 1),
                          createVNode("dt", null, "Ends:"),
                          createVNode("dd", null, toDisplayString(unref(formatDate)((_b = unref(trailRace)) == null ? void 0 : _b.end)), 1)
                        ]),
                        createVNode("div", { class: "text" }, toDisplayString(unref(trailRace).excerpt), 1),
                        createVNode(_sfc_main$l, {
                          "trail-race": unref(trailRace),
                          onUpdate: fetchEventDetail
                        }, null, 8, ["trail-race"]),
                        createVNode(_sfc_main$m, {
                          "trail-race": unref(trailRace),
                          onUpdate: fetchEventDetail
                        }, null, 8, ["trail-race"])
                      ])
                    ];
                  }),
                  _: 1
                }),
                createVNode(_component_TabsContent, { value: "stages" }, {
                  default: withCtx(() => [
                    createVNode(_sfc_main$c, {
                      "event-id": unref(route).params.id,
                      onUpdate: fetchEventDetail
                    }, null, 8, ["event-id"])
                  ]),
                  _: 1
                }),
                createVNode(_component_TabsContent, { value: "runners" }, {
                  default: withCtx(() => [
                    createVNode(_sfc_main$4, {
                      stages: unref(trailRace).stages,
                      onUpdate: fetchEventDetail
                    }, null, 8, ["stages"])
                  ]),
                  _: 1
                }),
                createVNode(_component_TabsContent, { value: "volunteers" }, {
                  default: withCtx(() => [
                    createVNode(_sfc_main$9, {
                      stages: unref(trailRace).stages,
                      onUpdate: fetchEventDetail
                    }, null, 8, ["stages"])
                  ]),
                  _: 1
                }),
                createVNode(_component_TabsContent, { value: "gallery" }, {
                  default: withCtx(() => [
                    createVNode(_sfc_main$b, {
                      "event-id": unref(route).params.id
                    }, null, 8, ["event-id"])
                  ]),
                  _: 1
                }),
                createVNode(_component_TabsContent, { value: "sponsor" }, {
                  default: withCtx(() => [
                    createVNode(_sfc_main$2, {
                      "event-id": unref(route).params.id
                    }, null, 8, ["event-id"])
                  ]),
                  _: 1
                }),
                createVNode(_component_TabsContent, { value: "payments" }, {
                  default: withCtx(() => [
                    createVNode(_sfc_main$f, {
                      "event-id": unref(route).params.id
                    }, null, 8, ["event-id"])
                  ]),
                  _: 1
                }),
                createVNode(_component_TabsContent, { value: "settings" }, {
                  default: withCtx(() => [
                    createVNode(_sfc_main$1, {
                      "event-id": unref(route).params.id
                    }, null, 8, ["event-id"])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/events/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-C8GxIFMr.mjs.map
