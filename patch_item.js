const fs = require('fs');
const file = 'frontend/components/pages/dashboard/media/Item.vue';
let content = fs.readFileSync(file, 'utf8');

// 1. Add imports
content = content.replace(
    "import { EllipsisVerticalIcon, PencilIcon, SquareCheckBigIcon, TrashIcon, Loader2Icon } from 'lucide-vue-next'",
    "import { EllipsisVerticalIcon, PencilIcon, SquareCheckBigIcon, TrashIcon, Loader2Icon, FolderInputIcon } from 'lucide-vue-next'"
);
content = content.replace(
    "import { showImage } from '~/lib/filters'",
    "import { showImage } from '~/lib/filters'\nimport { useMediaStore } from '~/store/media'"
);

// 2. Add state
const stateCode = `
const mediaStore = useMediaStore()
const { galleryList } = storeToRefs(mediaStore)

const showMoveDialog = ref(false)
const isMoving = ref(false)
const selectedGalleryId = ref('')
const isNewGallery = ref(false)
const newGalleryName = ref('')
const moveActionType = ref('link')

onMounted(() => {
    mediaStore.fetchGalleryList()
})

const handleMove = async () => {
    isMoving.value = true
    try {
        let galleryId = selectedGalleryId.value
        const imageIds = selectedImages.value.filter(id => id != null)

        if (isNewGallery.value && newGalleryName.value) {
            const { data } = await axios.post('/medias', {
                name: newGalleryName.value,
                images: imageIds,
                tags: []
            })
            galleryId = data.id
        }

        if (!galleryId) {
            toast.error('Please select or create a gallery')
            return
        }

        if (moveActionType.value === 'move') {
            await axios.post('/medias/move-images', {
                images: imageIds,
                gallery_id: galleryId,
                old_gallery_id: props.gallery.id
            })
            toast.success('Images moved successfully')
        } else {
            await axios.post('/medias/link-images', {
                images: imageIds,
                gallery_id: galleryId
            })
            toast.success('Images linked successfully')
        }
        
        showMoveDialog.value = false
        emit('fetch')
        init()
        isNewGallery.value = false
        newGalleryName.value = ''
        selectedGalleryId.value = ''
        moveActionType.value = 'link'
    } catch (error) {
        console.error(error)
        toast.error('Failed to process images')
    } finally {
        isMoving.value = false
    }
}
`;
content = content.replace("const emit = defineEmits(['fetch', 'edit', 'delete'])", "const emit = defineEmits(['fetch', 'edit', 'delete'])\n" + stateCode);

// 3. Add Dropdown menu item
const dropdownItem = `
                        <DropdownMenuItem @click="showMoveDialog = true" v-if="selectedImages.some(id => id != null)">
                            <FolderInputIcon class="mr-2 size-4" />
                            Move / Link
                        </DropdownMenuItem>
`;
content = content.replace("{{ $t('options.select_all') }}\n                        </DropdownMenuItem>", "{{ $t('options.select_all') }}\n                        </DropdownMenuItem>" + dropdownItem);

// 4. Add Dialog component at the end of the file, before </template>
const dialogTemplate = `
    <Dialog v-model:open="showMoveDialog">
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Move / Link to Gallery</DialogTitle>
                <DialogDescription>
                    Add the selected images to another gallery.
                </DialogDescription>
            </DialogHeader>
            <div class="grid gap-4 py-4">
                <div class="flex flex-col gap-2">
                    <Label>Action</Label>
                    <RadioGroup v-model="moveActionType" class="flex flex-col gap-2 mt-1">
                        <div class="flex items-center space-x-2">
                            <RadioGroupItem value="link" id="action-link" />
                            <Label for="action-link" class="cursor-pointer">Link to Gallery (keep in current)</Label>
                        </div>
                        <div class="flex items-center space-x-2">
                            <RadioGroupItem value="move" id="action-move" />
                            <Label for="action-move" class="cursor-pointer">Move to Gallery (remove from current)</Label>
                        </div>
                    </RadioGroup>
                </div>
                <div class="flex flex-col gap-2 mt-2">
                    <Label>Select Gallery</Label>
                    <Select v-model="selectedGalleryId" :disabled="isNewGallery">
                        <SelectTrigger>
                            <SelectValue placeholder="Choose a gallery..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem v-for="gallery in galleryList.filter(g => g.id !== props.gallery.id)" :key="gallery.id" :value="gallery.id">
                                {{ gallery.name }}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div class="flex items-center space-x-2 mt-2">
                    <Checkbox id="new-gallery" v-model="isNewGallery" />
                    <Label for="new-gallery" class="text-sm font-medium leading-none cursor-pointer">
                        Create new gallery
                    </Label>
                </div>
                <div v-if="isNewGallery" class="flex flex-col gap-2 animate-in fade-in slide-in-from-top-2">
                    <Label>Gallery Name</Label>
                    <Input v-model="newGalleryName" placeholder="Enter new gallery name..." />
                </div>
            </div>
            <DialogFooter>
                <Button modifier="outline" @click="showMoveDialog = false" :disabled="isMoving">
                    Cancel
                </Button>
                <Button @click="handleMove"
                    :disabled="isMoving || (!selectedGalleryId && !isNewGallery) || (isNewGallery && !newGalleryName)">
                    <Loader2Icon v-if="isMoving" class="mr-2 h-4 w-4 animate-spin" />
                    Apply
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
`;

content = content.replace("</template>", dialogTemplate + "\n</template>");

fs.writeFileSync(file, content);
