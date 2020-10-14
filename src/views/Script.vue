<template>
    <div class="script">
        <step
            v-for="(step, key) in steps"
            :step="step"
            :currentStep="currentStep"
            :key="key"
            @click.native="selectStep(step.id)"
        />

        <edit-step
            v-if="currentStep"
            :current="currentStep"
        />
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    import Step from '@/components/step.vue';
    import EditStep from '@/components/editStep.vue';

    export default {
        name: "script",
        components: {
            Step,
            EditStep
        },
        data: () => ({
            script: {},
            steps: [],
            currentStep: 0
        }),
        mounted () {
            this.setCurrentScriptAndSteps();
        },
        methods: {
            ...mapActions([
                'getScriptById',
                'getStepById'
            ]),
            async setCurrentScriptAndSteps () {
                const script = await this.getScriptById(this.$route.params.id);
                this.script = script.data[0];

                let step = {};
                for (let stepId of this.script.steps) {
                    step = await this.getStepById(stepId);
                    this.steps.push(step.data[0]);
                }
            },
            selectStep (id) {
                this.currentStep = id;
            }
        }
    }
</script>
