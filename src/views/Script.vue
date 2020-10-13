<template>
    <div class="script">
        <step
            v-for="(step, key) in script.steps"
            :step="step"
            :key="key"
        />

        <edit-step />
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
            script: {}
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
            }
        }
    }
</script>
