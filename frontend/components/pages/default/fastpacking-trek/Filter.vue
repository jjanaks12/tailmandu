<script setup lang="ts">
import { SearchIcon } from 'lucide-vue-next';
import { ErrorMessage, Field, Form } from 'vee-validate'
</script>

<template>
    <Form class="flex flex-col md:flex-row gap-4">
        <Field as="div" class="flex-1 relative" name="s" v-slot="{ field }">
            <InputGroup>
                <InputGroupInput v-bind="field" placeholder="Search your next Himalayan adventure..." />
                <InputGroupAddon>
                    <SearchIcon />
                </InputGroupAddon>
            </InputGroup>
            <ErrorMessage name="s" />
        </Field>
        <div class="flex flex-wrap md:flex-nowrap gap-3">
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant="dark" modifier="outline" size="sm">Region</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem value="everest">Everest</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem value="annapurna">Annapurna</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem value="langtang">Langtang</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant="dark" modifier="outline" size="sm">Difficulty</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem value="easy">Easy</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem value="moderate">Moderate</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem value="hard">Hard</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant="dark" modifier="outline" size="sm">Duration</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem value="1-7">1-7 Days</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem value="8-14">8-14 Days</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem value="15+">15+ Days</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </Form>
    <div class="flex flex-wrap gap-2 items-center text-xs">
        <span class="text-slate-500 font-medium mr-2">Quick Filters:</span>
        <span
            class="bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20 cursor-pointer hover:bg-primary hover:text-white transition-all">Everest</span>
        <span
            class="bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20 cursor-pointer hover:bg-primary hover:text-white transition-all">Moderate</span>
        <span
            class="bg-slate-200 dark:bg-[#271f1c] px-3 py-1 rounded-full border border-transparent cursor-pointer hover:bg-primary hover:text-white transition-all">Spring
            2024</span>
    </div>
</template>