<script setup lang="ts">
import { PlusIcon, Trash2Icon, Loader2Icon } from 'lucide-vue-next'
import type { Trek } from '~/lib/types'
import { useAxios } from '~/services/axios'

interface Props {
    trek: Trek
}

const props = defineProps<Props>()
const emit = defineEmits(['fetch', 'close'])
const { axios } = useAxios()
const isLoading = ref(false)

const protocols = ref<{ title: string, description: string }[]>([])

onMounted(() => {
    if (props.trek.details?.securityProtocols) {
        protocols.value = JSON.parse(JSON.stringify(props.trek.details.securityProtocols))
    }
})

const addProtocol = () => {
    protocols.value.push({ title: 'New Safety Protocol', description: '' })
}

const removeProtocol = (index: number) => {
    protocols.value.splice(index, 1)
}

const handleSave = async () => {
    isLoading.value = true
    try {
        const details = { ...props.trek.details, securityProtocols: protocols.value }
        await axios.put(`/treks/${props.trek.id}`, { details: { ...props.trek.details, securityProtocols: protocols.value } })
        emit('fetch')
        emit('close')
    } catch (e) {
        console.error(e)
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
    <div class="space-y-6">
        <div class="space-y-4 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
            <div v-for="(protocol, index) in protocols" :key="index"
                class="flex flex-col gap-4 p-5 bg-muted/20 rounded-xl border border-border group relative transition-all hover:bg-muted/30">
                <div class="space-y-2">
                    <Label class="text-[10px] uppercase font-black text-primary ml-1 tracking-widest italic">Protocol Title</Label>
                    <Input v-model="protocol.title" placeholder="e.g. Oxygen Support" class="bg-background border-border/50 h-11" />
                </div>
                <div class="space-y-2">
                    <Label class="text-[10px] uppercase font-black text-primary ml-1 tracking-widest italic">Detailed Description</Label>
                    <Textarea v-model="protocol.description" placeholder="Describe the safety protocol, equipment, and procedures..." class="bg-background min-h-[100px] border-border/50 resize-none" />
                </div>
                <Button variant="ghost" size="icon" @click="removeProtocol(index)"
                    class="absolute top-3 right-3 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-all scale-90 hover:scale-100">
                    <Trash2Icon class="w-4 h-4" />
                </Button>
            </div>

            <div v-if="protocols.length === 0" class="text-center py-12 bg-muted/10 rounded-xl border border-dashed border-border">
                <ShieldCheckIcon class="w-10 h-10 text-muted-foreground mb-3 mx-auto opacity-20" />
                <p class="text-sm font-bold text-muted-foreground uppercase tracking-widest">No protocols defined</p>
                <p class="text-[10px] text-muted-foreground mt-1">Add safety procedures for this expedition.</p>
            </div>
        </div>

        <Button modifier="outline" class="w-full border-dashed py-10 flex flex-col items-center justify-center gap-2 hover:bg-primary/5 hover:border-primary/50 transition-all group"
            @click="addProtocol">
            <PlusIcon class="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
            <span class="text-xs font-black uppercase tracking-widest">Add New Protocol</span>
        </Button>

        <div class="pt-6 border-t flex justify-end gap-3">
            <Button variant="ghost" @click="emit('close')" class="font-bold">Cancel</Button>
            <Button @click="handleSave" :disabled="isLoading" class="min-w-[180px] font-black shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 text-primary-foreground">
                <Loader2Icon v-if="isLoading" class="w-4 h-4 animate-spin mr-2" />
                Save Security Plan
            </Button>
        </div>
    </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background: hsl(var(--muted-foreground) / 0.2);
    border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: hsl(var(--muted-foreground) / 0.4);
}
</style>
