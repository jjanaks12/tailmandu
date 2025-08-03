<script setup lang="ts">
    import { Check, Circle, Dot } from 'lucide-vue-next'
    import { Form, Field, ErrorMessage } from 'vee-validate'

    useHead({
        title: 'Login'
    })

    definePageMeta({
        layout: 'simple'
    })

    const stepIndex = ref(1)
    const steps = [{
        step: 1,
        title: 'Your basic information',
        description: 'Provide your name and email',
    }, {
        step: 2,
        title: 'Your details',
        description: 'Provide your name and email',
    }, {
        step: 3,
        title: 'Your password',
        description: 'Choose a password',
    }, {
        step: 4,
        title: 'Your Favorite Drink',
        description: 'Choose a drink',
    }]

    const onSubmit = (values: any) => {

    }
</script>

<template>
    <div class="bg-white w-full max-w-[750px] p-8 rounded-lg">
        <Form v-slot="{ meta }" keep-values @submit="onSubmit">
            <Stepper v-slot="{ isNextDisabled, isPrevDisabled, nextStep, prevStep }" v-model="stepIndex"
                class="block w-full">
                <div class="flex w-full flex-start gap-2">
                    <StepperItem v-for="step in steps" :key="step.step" v-slot="{ state }"
                        class="relative flex w-full flex-col items-center justify-center" :step="step.step">
                        <StepperSeparator v-if="step.step !== steps[steps.length - 1].step"
                            class="absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary" />

                        <StepperTrigger as-child>
                            <Button :variant="state === 'completed' || state === 'active' ? 'default' : 'outline'"
                                size="icon" class="z-10 rounded-full shrink-0"
                                :class="[state === 'active' && 'ring-2 ring-ring ring-offset-2 ring-offset-background']"
                                :disabled="state !== 'completed' && !meta.valid">
                                <Check v-if="state === 'completed'" class="size-5" />
                                <Circle v-if="state === 'active'" />
                                <Dot v-if="state === 'inactive'" />
                            </Button>
                        </StepperTrigger>

                        <div class="mt-5 flex flex-col items-center text-center">
                            <StepperTitle :class="[state === 'active' && 'text-primary']"
                                class="text-sm font-semibold transition lg:text-base">
                                {{ step.title }}
                            </StepperTitle>
                        </div>
                    </StepperItem>
                </div>

                <div class="flex flex-col gap-4 mt-4">
                    <template v-if="stepIndex === 1">
                        <h1>Your information</h1>
                    </template>
                    <template v-if="stepIndex === 2">
                        <Field v-slot="{ field }" name="fullName">
                            <Input type="text" v-bind="field" />
                        </Field>

                        <Field v-slot="{ field }" name="email">
                            <Input type="email " v-bind="field" />
                        </Field>
                    </template>

                    <template v-if="stepIndex === 3">
                        <Field v-slot="{ field }" name="password">
                            <Input type="password" v-bind="field" />
                        </Field>

                        <Field v-slot="{ field }" name="confirmPassword">
                            <Input type="password" v-bind="field" />
                        </Field>
                    </template>

                    <template v-if="stepIndex === 4">
                        <Field v-slot="{ field }" name="favoriteDrink">
                            <Select v-bind="field">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a drink" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="coffee">
                                            Coffee
                                        </SelectItem>
                                        <SelectItem value="tea">
                                            Tea
                                        </SelectItem>
                                        <SelectItem value="soda">
                                            Soda
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>
                    </template>
                </div>

                <div class="flex items-center justify-between mt-4">
                    <Button :disabled="isPrevDisabled" variant="outline" size="sm" @click="prevStep()">
                        Back
                    </Button>
                    <div class="flex items-center gap-3">
                        <Button type="button" variant="outline" @click="nextStep()">Skip</Button>
                        <Button v-if="stepIndex !== steps.length" :type="meta.valid ? 'button' : 'submit'"
                            :disabled="isNextDisabled" size="sm" @click="meta.valid && nextStep()">
                            Next
                        </Button>
                        <Button v-else size="sm" type="submit">
                            Submit
                        </Button>
                    </div>
                </div>
            </Stepper>
        </Form>
    </div>
</template>