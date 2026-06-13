<template>
  <node-view-wrapper as="span" style="display: inline-flex;" class="align-text-bottom">
    <component :is="iconComponent" v-if="iconComponent" :class="node.attrs.class" />
    <span v-else class="text-red-500 text-xs font-mono border border-red-500 px-1 rounded">[Icon: {{ node.attrs.name }}]</span>
  </node-view-wrapper>
</template>

<script setup>
import { computed } from 'vue'
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3'
import * as icons from 'lucide-vue-next'

const props = defineProps(nodeViewProps)

const iconComponent = computed(() => {
  const iconName = props.node.attrs.name
  let comp = icons[iconName]
  if (!comp) {
    const pascalCase = iconName.replace(/(^\w|-\w)/g, (text) => text.replace(/-/, "").toUpperCase())
    comp = icons[pascalCase]
  }
  if (!comp && iconName.endsWith('Icon')) {
    const nameWithoutIcon = iconName.slice(0, -4)
    const pascalCase = nameWithoutIcon.replace(/(^\w|-\w)/g, (text) => text.replace(/-/, "").toUpperCase())
    comp = icons[pascalCase]
  }
  return comp || null
})
</script>
