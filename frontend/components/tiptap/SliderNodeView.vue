<script setup lang="ts">
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3'
import { PlusIcon, TrashIcon, Image as ImageIcon, GripHorizontalIcon } from 'lucide-vue-next'
import { useMediaStore } from '~/store/media'
import { storeToRefs } from 'pinia'
import { showImage } from '~/lib/filters'
import { computed } from 'vue'

const props = defineProps(nodeViewProps)

const { media } = storeToRefs(useMediaStore())
const { fetchImage } = useMediaStore()

const images = computed(() => props.node.attrs.images as string[])

const addImages = () => {
  media.value.show = true
  media.value.mode = 'image'
  media.value.isMultiple = true
  media.value.action = async (state: any) => {
    if (state.selectedImages.length > 0) {
      const newUrls: string[] = []
      for (const id of state.selectedImages) {
        const image = await fetchImage(id)
        if (image) {
          newUrls.push(showImage(image.file_name))
        }
      }

      props.updateAttributes({
        images: [...images.value, ...newUrls]
      })

      media.value.show = false
    }
  }
}

const removeImage = (index: number) => {
  const newImages = [...images.value]
  newImages.splice(index, 1)
  props.updateAttributes({ images: newImages })
}

const draggedIndex = ref<number | null>(null)

const onDragStart = (idx: number) => {
  draggedIndex.value = idx
}

const onDrop = (targetIdx: number) => {
  if (draggedIndex.value === null || draggedIndex.value === targetIdx) {
    draggedIndex.value = null
    return
  }
  const newImages = [...images.value]
  const [removed] = newImages.splice(draggedIndex.value, 1)
  newImages.splice(targetIdx, 0, removed)
  props.updateAttributes({ images: newImages })
  draggedIndex.value = null
}
</script>

<template>
  <NodeViewWrapper class="slider-node-view my-4 relative group">
    <div
      class="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-4 bg-slate-50 dark:bg-slate-900/50">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2 text-slate-500 font-bold">
          <div class="cursor-grab hover:bg-slate-200 dark:hover:bg-slate-800 p-1 rounded transition-colors active:cursor-grabbing" data-drag-handle title="Drag to move widget">
            <GripHorizontalIcon class="w-5 h-5" />
          </div>
          <ImageIcon class="w-5 h-5" />
          Image Slider Widget
        </div>
        <Button type="button" size="sm" variant="secondary" @click="addImages">
          <PlusIcon class="w-4 h-4 mr-1" /> Add Images
        </Button>
      </div>

      <div v-if="images.length === 0" class="text-center py-8 text-slate-400">
        No images in this slider yet. Click "Add Images" to start.
      </div>

      <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="(img, idx) in images" :key="img + idx"
          draggable="true"
          @dragstart="onDragStart(idx)"
          @dragover.prevent
          @drop="onDrop(idx)"
          @dragend="draggedIndex = null"
          class="relative group/img aspect-video rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800 cursor-move border-2 border-transparent hover:border-primary transition-colors hover:shadow-lg">
          <img :src="img" class="w-full h-full object-cover" :class="{'opacity-50': draggedIndex === idx}" />
          <div
            class="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
            <Button size="icon" variant="destructive" class="h-8 w-8 rounded-full" @click="removeImage(idx)"
              title="Remove image">
              <TrashIcon class="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </NodeViewWrapper>
</template>

<style scoped>
.slider-node-view {
  user-select: none;
}
</style>
