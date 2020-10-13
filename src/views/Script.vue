<template>
    <div class="script">
        <step
            v-for="(step, key) in script.steps"
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
            currentStep: 0
        }),
        async mounted () {
            this.getCurrentScript();
        },
        methods: {
            ...mapActions([
                'getScriptById'
            ]),
            async getCurrentScript () {
                const script = await this.getScriptById(this.$route.params.id);
                this.script = script.data[0];
            },
            selectStep (id) {
                this.currentStep = id;
            }
        }
    }
</script>
