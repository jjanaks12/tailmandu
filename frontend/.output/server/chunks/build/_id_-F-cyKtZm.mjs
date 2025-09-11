import { _ as _sfc_main$i } from './index-fXRoVOws.mjs';
import { defineComponent, ref, unref, withCtx, createVNode, createTextVNode, toDisplayString, mergeProps, createBlock, openBlock, renderSlot, watch, isRef, Fragment, renderList, createCommentVNode, shallowRef, h as h$1, getCurrentInstance, watchEffect, nextTick, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderSlot, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { useForwardPropsEmits, TabsRoot, TabsList, useForwardProps, TabsTrigger, TabsContent, AccordionRoot, AccordionItem, AccordionHeader, AccordionTrigger, AccordionContent } from 'reka-ui';
import { c as cn } from './helpers-H80jjgLf.mjs';
import { r as reactiveOmit } from './index-BCNSwEbA.mjs';
import { a as useRoute, u as useEventStore, n as navigateTo, d as useAxios, s as showImage, _ as __nuxt_component_0$1 } from './server.mjs';
import { MoveLeftIcon, SaveIcon, LoaderIcon, MapIcon, PlusIcon, TrashIcon, PencilIcon, XIcon, Trash2Icon, BoldIcon, ItalicIcon, UnderlineIcon, StrikethroughIcon, RotateCcwIcon, WrapTextIcon, Heading1Icon, Heading2Icon, Heading3Icon, Heading4Icon, Heading5Icon, Heading6Icon, ListIcon, ListOrderedIcon, QuoteIcon, MinusIcon, UndoIcon, RedoIcon, ChevronDown } from 'lucide-vue-next';
import { f as formatDate } from './humanize-Dt8EJGgI.mjs';
import { u as useAuthorization } from './authorization-NeTuVL6Y.mjs';
import { Plugin, PluginKey, Selection, TextSelection, NodeSelection, AllSelection } from '@tiptap/pm/state';
import { RemoveMarkStep, findWrapping, canJoin, Transform, liftTarget, joinPoint, canSplit, ReplaceStep, ReplaceAroundStep } from '@tiptap/pm/transform';
import { Fragment as Fragment$1, Slice, Node, Schema, DOMParser } from '@tiptap/pm/model';
import { createParagraphNear as createParagraphNear$1, deleteSelection as deleteSelection$1, exitCode as exitCode$1, joinUp as joinUp$1, joinDown as joinDown$1, joinBackward as joinBackward$1, joinForward as joinForward$1, joinTextblockBackward as joinTextblockBackward$1, joinTextblockForward as joinTextblockForward$1, lift as lift$1, liftEmptyBlock as liftEmptyBlock$1, newlineInCode as newlineInCode$1, selectNodeBackward as selectNodeBackward$1, selectNodeForward as selectNodeForward$1, selectParentNode as selectParentNode$1, selectTextblockEnd as selectTextblockEnd$1, selectTextblockStart as selectTextblockStart$1, setBlockType, wrapIn as wrapIn$1 } from '@tiptap/pm/commands';
import { liftListItem as liftListItem$1, sinkListItem as sinkListItem$1, wrapInList as wrapInList$1 } from '@tiptap/pm/schema-list';
import { _ as _sfc_main$l } from './index-CIwfCEWF.mjs';
import { _ as _sfc_main$4$1, a as _sfc_main$2$1, b as _sfc_main$k, c as _sfc_main$1$1 } from './DialogTitle-CZaefnAH.mjs';
import { _ as _sfc_main$j } from './DialogHeader-DOkqwiOU.mjs';
import { _ as _sfc_main$m } from './Input-DM54l6M4.mjs';
import { _ as _sfc_main$n } from './Label-jSWrZiLt.mjs';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { s as stageSchema } from './event.schema-B7NmTo0u.mjs';
import { defineStore, storeToRefs } from 'pinia';
import { u as useHead } from './v3-UNO0wT_2.mjs';
import 'class-variance-authority';
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
import 'vue-router';
import 'deep-pick-omit';
import 'axios';
import 'vue-sonner';
import 'moment';
import './index-DRYUbUIy.mjs';
import 'yup';

const _sfc_main$h = /* @__PURE__ */ defineComponent({
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
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/tabs/Tabs.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const _sfc_main$g = /* @__PURE__ */ defineComponent({
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
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/tabs/TabsContent.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const _sfc_main$f = /* @__PURE__ */ defineComponent({
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
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/tabs/TabsList.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const _sfc_main$e = /* @__PURE__ */ defineComponent({
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
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/tabs/TabsTrigger.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const _sfc_main$d = /* @__PURE__ */ defineComponent({
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
      emit("update");
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_Button = _sfc_main$i;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-accent aspect-[1030/350] -mt-12 -mx-12 relative z-10" }, _attrs))}>`);
      if (_ctx.trailRace.image_id != null && (!unref(editImage) || !unref(can)("event_edit"))) {
        _push(`<figure class=""><img${ssrRenderAttr("src", unref(showImage)((_b = (_a = _ctx.trailRace) == null ? void 0 : _a.thumbnail) == null ? void 0 : _b.file_name))}${ssrRenderAttr("alt", _ctx.trailRace.name)} class="w-full h-full object-cover absolute top-0 left-0 z-0"></figure>`);
      } else {
        _push(`<label class="bg-gray-100 hover:bg-gray-200 h-full flex justify-center items-center cursor-pointer transition-colors overflow-hidden"${ssrRenderAttr("diabled", unref(saving))}><input type="file" class="hidden"${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""} accept="image/*">`);
        if (unref(imageToUpload)) {
          _push(`<img${ssrRenderAttr("src", unref(imageToUpload))} alt="Trail race preview image" class="w-full h-full object-cover absolute top-0 left-0 z-0">`);
        } else {
          _push(`<span class="relative">Upload image</span>`);
        }
        _push(`</label>`);
      }
      _push(`<div class="absolute top-2 right-2">`);
      if (_ctx.trailRace.image_id != null && !unref(editImage)) {
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
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/dashboard/event/imageUpload.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
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
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "TiptapEditor",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const editor = useEditor({
      content: props.modelValue
    });
    watch(() => props.modelValue, () => {
      var _a, _b;
      (_a = editor.value) == null ? void 0 : _a.commands.setContent(props.modelValue);
      (_b = editor.value) == null ? void 0 : _b.setEditable(props.disabled);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = _sfc_main$i;
      const _component_TiptapEditorContent = EditorContent;
      if (unref(editor)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "editor" }, _attrs))}>`);
        if (!_ctx.disabled) {
          _push(`<div class="flex gap-0.5 rounded-sm mb-2"><div class="bg-gray-300 p-0.5 rounded">`);
          _push(ssrRenderComponent(_component_Button, {
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
          _push(`</div></div>`);
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
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TiptapEditor.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const _sfc_main$b = /* @__PURE__ */ defineComponent({
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
      const _component_TiptapEditor = _sfc_main$c;
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
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/dashboard/event/description.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const _sfc_main$a = /* @__PURE__ */ defineComponent({
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
      const _component_Button = _sfc_main$i;
      const _component_ClientOnly = __nuxt_component_0$1;
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
      _push(`</div><label class="w-full text-center block p-3 border border-dashed rounded-md"><input type="file" class="hidden"><span>${ssrInterpolate((_a = unref(fileName)) != null ? _a : "Upload .gpx file")}</span></label></div>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/dashboard/event/mapUpload.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "Accordion",
  __ssrInlineRender: true,
  props: {
    collapsible: { type: Boolean },
    disabled: { type: Boolean },
    dir: {},
    orientation: {},
    unmountOnHide: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    type: {},
    modelValue: {},
    defaultValue: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(AccordionRoot), mergeProps({ "data-slot": "accordion" }, unref(forwarded), _attrs), {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/accordion/Accordion.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "AccordionContent",
  __ssrInlineRender: true,
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(AccordionContent), mergeProps({ "data-slot": "accordion-content" }, unref(delegatedProps), { class: "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass(unref(cn)("pt-0 pb-4", props.class))}"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", {
                class: unref(cn)("pt-0 pb-4", props.class)
              }, [
                renderSlot(_ctx.$slots, "default")
              ], 2)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/accordion/AccordionContent.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "AccordionItem",
  __ssrInlineRender: true,
  props: {
    disabled: { type: Boolean },
    value: {},
    unmountOnHide: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(AccordionItem), mergeProps({ "data-slot": "accordion-item" }, unref(forwardedProps), {
        class: unref(cn)("border-b last:border-b-0", props.class)
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
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/accordion/AccordionItem.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "AccordionTrigger",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(AccordionHeader), mergeProps({ class: "flex" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(AccordionTrigger), mergeProps({ "data-slot": "accordion-trigger" }, unref(delegatedProps), {
              class: unref(cn)(
                "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
                props.class
              )
            }), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                  ssrRenderSlot(_ctx.$slots, "icon", {}, () => {
                    _push3(ssrRenderComponent(unref(ChevronDown), { class: "text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" }, null, _parent3, _scopeId2));
                  }, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "default"),
                    renderSlot(_ctx.$slots, "icon", {}, () => [
                      createVNode(unref(ChevronDown), { class: "text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" })
                    ])
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(AccordionTrigger), mergeProps({ "data-slot": "accordion-trigger" }, unref(delegatedProps), {
                class: unref(cn)(
                  "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
                  props.class
                )
              }), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default"),
                  renderSlot(_ctx.$slots, "icon", {}, () => [
                    createVNode(unref(ChevronDown), { class: "text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" })
                  ])
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
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/accordion/AccordionTrigger.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
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
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
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
    const form = ref(null);
    const formSubmit = async (values) => {
      isLoading.value = true;
      await save(props.eventId, values);
      isLoading.value = false;
      emit("update");
    };
    const fileHandler = (event) => {
      var _a;
      const files = (_a = event.target.files) != null ? _a : [];
      if ((files == null ? void 0 : files.length) == 0)
        return;
      const reader = new FileReader();
      const file = files[0];
      reader.onload = () => {
        if (form.value)
          form.value.setFieldValue("map", reader.result);
      };
      if (file)
        reader.readAsDataURL(file);
    };
    const init = () => {
      if (form.value) {
        form.value.setFieldValue("event_id", props.eventId);
        if (props.stage)
          form.value.setValues({
            id: props.stage.id,
            name: props.stage.name
          });
      }
    };
    watch(form, () => {
      init();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Input = _sfc_main$m;
      const _component_Label = _sfc_main$n;
      const _component_Button = _sfc_main$i;
      _push(ssrRenderComponent(unref(Form), mergeProps({
        onSubmit: formSubmit,
        "validation-schema": unref(stageSchema),
        class: "flex flex-col gap-4",
        ref_key: "form",
        ref: form
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
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
            _push2(`<label${_scopeId}><input type="file"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ErrorMessage), { name: "map" }, null, _parent2, _scopeId));
            _push2(`</label><div class="text-right"${_scopeId}>`);
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
              createVNode("label", null, [
                createVNode("input", {
                  type: "file",
                  onChange: fileHandler
                }, null, 32),
                createVNode(unref(ErrorMessage), { name: "map" })
              ]),
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
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/dashboard/event/stages/form.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
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
    const editStage = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = _sfc_main$i;
      const _component_Accordion = _sfc_main$9;
      const _component_AccordionItem = _sfc_main$7;
      const _component_AccordionTrigger = _sfc_main$6;
      const _component_Badge = _sfc_main$l;
      const _component_AccordionContent = _sfc_main$8;
      const _component_Dialog = _sfc_main$4$1;
      const _component_DialogContent = _sfc_main$2$1;
      const _component_DialogHeader = _sfc_main$j;
      const _component_DialogTitle = _sfc_main$k;
      const _component_DialogDescription = _sfc_main$1$1;
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
      _push(`</div>`);
      _push(ssrRenderComponent(_component_Accordion, { type: "single" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(stages), (stage) => {
              _push2(ssrRenderComponent(_component_AccordionItem, {
                value: stage.id
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_AccordionTrigger, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(stage.name)} `);
                          if (stage.runners.length > 0) {
                            _push4(ssrRenderComponent(_component_Badge, null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(stage.runners.length)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(stage.runners.length), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                        } else {
                          return [
                            createTextVNode(toDisplayString(stage.name) + " ", 1),
                            stage.runners.length > 0 ? (openBlock(), createBlock(_component_Badge, { key: 0 }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(stage.runners.length), 1)
                              ]),
                              _: 2
                            }, 1024)) : createCommentVNode("", true)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_AccordionContent, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="flex justify-end gap-2 mb-8"${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_Button, {
                            variant: "destructive",
                            onClick: async () => {
                              await unref(destory)(stage.id);
                              unref(fetch)(_ctx.eventId);
                            }
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(TrashIcon), null, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(TrashIcon))
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_Button, {
                            size: "icon",
                            onClick: () => {
                              showDialog.value = true;
                              editStage.value = stage;
                            }
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(PencilIcon), null, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(PencilIcon))
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode("div", { class: "flex justify-end gap-2 mb-8" }, [
                              createVNode(_component_Button, {
                                variant: "destructive",
                                onClick: async () => {
                                  await unref(destory)(stage.id);
                                  unref(fetch)(_ctx.eventId);
                                }
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(TrashIcon))
                                ]),
                                _: 2
                              }, 1032, ["onClick"]),
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
                                _: 2
                              }, 1032, ["onClick"])
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_AccordionTrigger, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(stage.name) + " ", 1),
                          stage.runners.length > 0 ? (openBlock(), createBlock(_component_Badge, { key: 0 }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(stage.runners.length), 1)
                            ]),
                            _: 2
                          }, 1024)) : createCommentVNode("", true)
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(_component_AccordionContent, null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex justify-end gap-2 mb-8" }, [
                            createVNode(_component_Button, {
                              variant: "destructive",
                              onClick: async () => {
                                await unref(destory)(stage.id);
                                unref(fetch)(_ctx.eventId);
                              }
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(TrashIcon))
                              ]),
                              _: 2
                            }, 1032, ["onClick"]),
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
                              _: 2
                            }, 1032, ["onClick"])
                          ])
                        ]),
                        _: 2
                      }, 1024)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(stages), (stage) => {
                return openBlock(), createBlock(_component_AccordionItem, {
                  value: stage.id
                }, {
                  default: withCtx(() => [
                    createVNode(_component_AccordionTrigger, null, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(stage.name) + " ", 1),
                        stage.runners.length > 0 ? (openBlock(), createBlock(_component_Badge, { key: 0 }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(stage.runners.length), 1)
                          ]),
                          _: 2
                        }, 1024)) : createCommentVNode("", true)
                      ]),
                      _: 2
                    }, 1024),
                    createVNode(_component_AccordionContent, null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex justify-end gap-2 mb-8" }, [
                          createVNode(_component_Button, {
                            variant: "destructive",
                            onClick: async () => {
                              await unref(destory)(stage.id);
                              unref(fetch)(_ctx.eventId);
                            }
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(TrashIcon))
                            ]),
                            _: 2
                          }, 1032, ["onClick"]),
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
                            _: 2
                          }, 1032, ["onClick"])
                        ])
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1032, ["value"]);
              }), 256))
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
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    "event-id": _ctx.eventId,
                    stage: unref(editStage),
                    onUpdate: () => {
                      showDialog.value = false;
                      editStage.value = null;
                      unref(fetch)(_ctx.eventId);
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
                    createVNode(_sfc_main$5, {
                      "event-id": _ctx.eventId,
                      stage: unref(editStage),
                      onUpdate: () => {
                        showDialog.value = false;
                        editStage.value = null;
                        unref(fetch)(_ctx.eventId);
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
                  createVNode(_sfc_main$5, {
                    "event-id": _ctx.eventId,
                    stage: unref(editStage),
                    onUpdate: () => {
                      showDialog.value = false;
                      editStage.value = null;
                      unref(fetch)(_ctx.eventId);
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
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/dashboard/event/stages/list.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const useCheckpointStore = defineStore("checkpoints", () => {
  const checkpoints = ref([]);
  const isLoading = ref(false);
  const { axios } = useAxios();
  const fetch = async (eventId) => {
    isLoading.value = true;
    const { data } = await axios.get(`/events/${eventId}/checkpoints`);
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
  return {
    checkpoints,
    isLoading,
    fetch,
    save,
    destory
  };
});
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "form",
  __ssrInlineRender: true,
  props: {
    eventId: {},
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
      await save(props.eventId, values);
      isLoading.value = false;
      emit("update");
    };
    const init = () => {
      if (form.value) {
        form.value.setFieldValue("event_id", props.eventId);
        if (props.checkpoint)
          form.value.setValues({
            id: props.checkpoint.id,
            name: props.checkpoint.name
          });
      }
    };
    watch(form, () => {
      init();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Input = _sfc_main$m;
      const _component_Label = _sfc_main$n;
      const _component_Button = _sfc_main$i;
      _push(ssrRenderComponent(unref(Form), mergeProps({
        onSubmit: formSubmit,
        "validation-schema": unref(stageSchema),
        class: "flex flex-col gap-4",
        ref_key: "form",
        ref: form
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/dashboard/event/checkpoint/form.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "list",
  __ssrInlineRender: true,
  props: {
    eventId: {}
  },
  emits: ["update"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const { fetch, destory } = useCheckpointStore();
    const { checkpoints } = storeToRefs(useCheckpointStore());
    const showDialog = ref(false);
    const editCheckpoint = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = _sfc_main$i;
      const _component_Accordion = _sfc_main$9;
      const _component_AccordionItem = _sfc_main$7;
      const _component_AccordionTrigger = _sfc_main$6;
      const _component_AccordionContent = _sfc_main$8;
      const _component_Dialog = _sfc_main$4$1;
      const _component_DialogContent = _sfc_main$2$1;
      const _component_DialogHeader = _sfc_main$j;
      const _component_DialogTitle = _sfc_main$k;
      const _component_DialogDescription = _sfc_main$1$1;
      _push(`<!--[--><div class="text-right mb-12">`);
      _push(ssrRenderComponent(_component_Button, {
        variant: "secondary",
        onClick: ($event) => showDialog.value = true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(PlusIcon), null, null, _parent2, _scopeId));
            _push2(` Add Checkpoint `);
          } else {
            return [
              createVNode(unref(PlusIcon)),
              createTextVNode(" Add Checkpoint ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_Accordion, { type: "single" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(checkpoints), (checkpoint) => {
              _push2(ssrRenderComponent(_component_AccordionItem, {
                value: checkpoint.id
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_AccordionTrigger, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
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
                    _push3(ssrRenderComponent(_component_AccordionContent, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="flex justify-end gap-2 mb-8"${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_Button, {
                            variant: "destructive",
                            onClick: async () => {
                              await unref(destory)(checkpoint.id);
                              await unref(fetch)(_ctx.eventId);
                            }
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(TrashIcon), null, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(TrashIcon))
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_Button, {
                            size: "icon",
                            onClick: () => {
                              showDialog.value = true;
                              editCheckpoint.value = checkpoint;
                            }
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(PencilIcon), null, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(PencilIcon))
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode("div", { class: "flex justify-end gap-2 mb-8" }, [
                              createVNode(_component_Button, {
                                variant: "destructive",
                                onClick: async () => {
                                  await unref(destory)(checkpoint.id);
                                  await unref(fetch)(_ctx.eventId);
                                }
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(TrashIcon))
                                ]),
                                _: 2
                              }, 1032, ["onClick"]),
                              createVNode(_component_Button, {
                                size: "icon",
                                onClick: () => {
                                  showDialog.value = true;
                                  editCheckpoint.value = checkpoint;
                                }
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(PencilIcon))
                                ]),
                                _: 2
                              }, 1032, ["onClick"])
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_AccordionTrigger, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(checkpoint.name), 1)
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(_component_AccordionContent, null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex justify-end gap-2 mb-8" }, [
                            createVNode(_component_Button, {
                              variant: "destructive",
                              onClick: async () => {
                                await unref(destory)(checkpoint.id);
                                await unref(fetch)(_ctx.eventId);
                              }
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(TrashIcon))
                              ]),
                              _: 2
                            }, 1032, ["onClick"]),
                            createVNode(_component_Button, {
                              size: "icon",
                              onClick: () => {
                                showDialog.value = true;
                                editCheckpoint.value = checkpoint;
                              }
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(PencilIcon))
                              ]),
                              _: 2
                            }, 1032, ["onClick"])
                          ])
                        ]),
                        _: 2
                      }, 1024)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(checkpoints), (checkpoint) => {
                return openBlock(), createBlock(_component_AccordionItem, {
                  value: checkpoint.id
                }, {
                  default: withCtx(() => [
                    createVNode(_component_AccordionTrigger, null, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(checkpoint.name), 1)
                      ]),
                      _: 2
                    }, 1024),
                    createVNode(_component_AccordionContent, null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex justify-end gap-2 mb-8" }, [
                          createVNode(_component_Button, {
                            variant: "destructive",
                            onClick: async () => {
                              await unref(destory)(checkpoint.id);
                              await unref(fetch)(_ctx.eventId);
                            }
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(TrashIcon))
                            ]),
                            _: 2
                          }, 1032, ["onClick"]),
                          createVNode(_component_Button, {
                            size: "icon",
                            onClick: () => {
                              showDialog.value = true;
                              editCheckpoint.value = checkpoint;
                            }
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(PencilIcon))
                            ]),
                            _: 2
                          }, 1032, ["onClick"])
                        ])
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1032, ["value"]);
              }), 256))
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
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    "event-id": _ctx.eventId,
                    checkpoint: unref(editCheckpoint),
                    onUpdate: () => {
                      showDialog.value = false;
                      editCheckpoint.value = null;
                      unref(fetch)(_ctx.eventId);
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
                    createVNode(_sfc_main$3, {
                      "event-id": _ctx.eventId,
                      checkpoint: unref(editCheckpoint),
                      onUpdate: () => {
                        showDialog.value = false;
                        editCheckpoint.value = null;
                        unref(fetch)(_ctx.eventId);
                        emit("update");
                      }
                    }, null, 8, ["event-id", "checkpoint", "onUpdate"])
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
                  createVNode(_sfc_main$3, {
                    "event-id": _ctx.eventId,
                    checkpoint: unref(editCheckpoint),
                    onUpdate: () => {
                      showDialog.value = false;
                      editCheckpoint.value = null;
                      unref(fetch)(_ctx.eventId);
                      emit("update");
                    }
                  }, null, 8, ["event-id", "checkpoint", "onUpdate"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/dashboard/event/checkpoint/list.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
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
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
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
      const _component_Button = _sfc_main$i;
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
            await unref(destory)(_ctx.eventId, image.id);
            unref(fetch)(_ctx.eventId);
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/dashboard/event/gallery/list.vue");
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
    const fetchEventDetail = async () => {
      trailRace.value = await get(route.params.id);
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_Button = _sfc_main$i;
      const _component_Tabs = _sfc_main$h;
      const _component_TabsList = _sfc_main$f;
      const _component_TabsTrigger = _sfc_main$e;
      const _component_TabsContent = _sfc_main$g;
      if (unref(trailRace)) {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_sfc_main$d, {
          "trail-race": unref(trailRace),
          onUpdate: fetchEventDetail
        }, null, _parent));
        _push(`<div class="bg-white flex items-center gap-4 px-4 pt-4 pb-20 -mt-16 rounded-xl relative z-10"><div class="flex-grow"><h1 class="text-2xl">${ssrInterpolate((_a = unref(trailRace)) == null ? void 0 : _a.name)}</h1></div><div class="flex gap-2 items-center">`);
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
          "default-value": "gallery",
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
                    _push3(ssrRenderComponent(_component_TabsTrigger, { value: "checkpoint" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Checkpoint `);
                        } else {
                          return [
                            createTextVNode(" Checkpoint ")
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
                  } else {
                    return [
                      createVNode(_component_TabsTrigger, { value: "detail" }, {
                        default: withCtx(() => [
                          createTextVNode(" Details ")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_TabsTrigger, { value: "checkpoint" }, {
                        default: withCtx(() => [
                          createTextVNode(" Checkpoint ")
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
                    _push3(ssrRenderComponent(_sfc_main$a, {
                      "trail-race": unref(trailRace),
                      onUpdate: fetchEventDetail
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_sfc_main$b, {
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
                        createVNode(_sfc_main$a, {
                          "trail-race": unref(trailRace),
                          onUpdate: fetchEventDetail
                        }, null, 8, ["trail-race"]),
                        createVNode(_sfc_main$b, {
                          "trail-race": unref(trailRace),
                          onUpdate: fetchEventDetail
                        }, null, 8, ["trail-race"])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_TabsContent, { value: "checkpoint" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_sfc_main$2, {
                      "event-id": unref(route).params.id,
                      onUpdate: fetchEventDetail
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_sfc_main$2, {
                        "event-id": unref(route).params.id,
                        onUpdate: fetchEventDetail
                      }, null, 8, ["event-id"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_TabsContent, { value: "stages" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_sfc_main$4, {
                      "event-id": unref(route).params.id,
                      onUpdate: fetchEventDetail
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_sfc_main$4, {
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
                    _push3(` Runners `);
                  } else {
                    return [
                      createTextVNode(" Runners ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_TabsContent, { value: "volunteers" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Volunteers `);
                  } else {
                    return [
                      createTextVNode(" Volunteers ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_TabsContent, { value: "gallery" }, {
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
                    createVNode(_component_TabsTrigger, { value: "checkpoint" }, {
                      default: withCtx(() => [
                        createTextVNode(" Checkpoint ")
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
                        createVNode(_sfc_main$a, {
                          "trail-race": unref(trailRace),
                          onUpdate: fetchEventDetail
                        }, null, 8, ["trail-race"]),
                        createVNode(_sfc_main$b, {
                          "trail-race": unref(trailRace),
                          onUpdate: fetchEventDetail
                        }, null, 8, ["trail-race"])
                      ])
                    ];
                  }),
                  _: 1
                }),
                createVNode(_component_TabsContent, { value: "checkpoint" }, {
                  default: withCtx(() => [
                    createVNode(_sfc_main$2, {
                      "event-id": unref(route).params.id,
                      onUpdate: fetchEventDetail
                    }, null, 8, ["event-id"])
                  ]),
                  _: 1
                }),
                createVNode(_component_TabsContent, { value: "stages" }, {
                  default: withCtx(() => [
                    createVNode(_sfc_main$4, {
                      "event-id": unref(route).params.id,
                      onUpdate: fetchEventDetail
                    }, null, 8, ["event-id"])
                  ]),
                  _: 1
                }),
                createVNode(_component_TabsContent, { value: "runners" }, {
                  default: withCtx(() => [
                    createTextVNode(" Runners ")
                  ]),
                  _: 1
                }),
                createVNode(_component_TabsContent, { value: "volunteers" }, {
                  default: withCtx(() => [
                    createTextVNode(" Volunteers ")
                  ]),
                  _: 1
                }),
                createVNode(_component_TabsContent, { value: "gallery" }, {
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
//# sourceMappingURL=_id_-F-cyKtZm.mjs.map
