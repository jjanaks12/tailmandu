<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAxios } from '~/services/axios'
import { toast } from 'vue-sonner'

const { axios } = useAxios()
const categories = ref<any[]>([])
const isLoading = ref(false)

const form = ref({
    name: '',
    email: '',
    category_id: '',
    message: ''
})

const fetchCategories = async () => {
    try {
        const response = await axios.get('/enquiry-categories')
        // Assuming response structure has a data wrapper based on typical patterns
        categories.value = response.data.data || response.data
    } catch (e) {
        console.error(e)
    }
}

const submitEnquiry = async () => {
    if (!form.value.name || !form.value.email || !form.value.category_id || !form.value.message) {
        toast.error('Please fill in all fields')
        return
    }

    try {
        isLoading.value = true
        await axios.post('/enquiries', form.value)
        toast.success('Inquiry sent successfully!')
        form.value = {
            name: '',
            email: '',
            category_id: '',
            message: ''
        }
    } catch (e: any) {
        // Errors are usually handled by axios interceptor
    } finally {
        isLoading.value = false
    }
}

onMounted(() => {
    fetchCategories()
})
</script>

<template>
    <div class="bg-white dark:bg-deep-slate p-10 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800">
        <h3 class="text-2xl font-display font-bold mb-2">Custom Trips &amp; Inquiries</h3>
        <p class="text-slate-500 dark:text-slate-400 mb-8">Have questions about a race or want a custom
            adventure for your group? Reach out to our team.</p>
        <form @submit.prevent="submitEnquiry" class="space-y-6">
            <div class="grid grid-cols-2 gap-6">
                <div class="space-y-2">
                    <Label class="text-xs font-bold uppercase tracking-wider opacity-60 ml-1">Full Name</Label>
                    <Input v-model="form.name"
                        class="w-full bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-5 focus:ring-primary focus:border-primary transition-all"
                        placeholder="John Doe" type="text" />
                </div>
                <div class="space-y-2">
                    <Label class="text-xs font-bold uppercase tracking-wider opacity-60 ml-1">Email Address</Label>
                    <Input v-model="form.email"
                        class="w-full bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-5 focus:ring-primary focus:border-primary transition-all"
                        placeholder="john@example.com" type="email" />
                </div>
            </div>
            <div class="space-y-2">
                <Label class="text-xs font-bold uppercase tracking-wider opacity-60 ml-1">Subject</Label>
                <Select v-model="form.category_id">
                    <SelectTrigger
                        class="w-full bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-5 focus:ring-primary focus:border-primary transition-all">
                        <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem v-for="category in categories" :key="category.id" :value="category.id">
                                {{ category.name }}
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div class="space-y-2">
                <Label class="text-xs font-bold uppercase tracking-wider opacity-60 ml-1">Your Message</Label>
                <Textarea v-model="form.message"
                    class="w-full bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-primary focus:border-primary transition-all"
                    placeholder="Tell us about your goals..." rows="4" />
            </div>
            <Button :disabled="isLoading"
                class="w-full bg-primary hover:bg-[#d8561a] text-white font-bold py-6 rounded-xl transition-all shadow-lg shadow-primary/20"
                type="submit">
                {{ isLoading ? 'Sending...' : 'Send Inquiry' }}
            </Button>
        </form>
    </div>
</template>