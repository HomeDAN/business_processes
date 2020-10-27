<template>
    <div>
        <mindmap
            :nodes="nodes"
            :connections="connections"
            :editable="true"
        />
    </div>
</template>

<script>
    //import map from '../../map';
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: "test",
        // data() {
        //     return {...map}
        // },
        data: () => ({
            nodes: [],
            connections: []
        }),
        computed: {
            ...mapGetters([
                'currentScriptId',
                'questionsInCurrentScript'
            ]),
            questionsInCurrentScript (val) {
                // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                this.nodes = val;
                return val;
            }
        },
        mounted () {
            this.$store.dispatch('setCurrentScriptId', 2);
            this.$store.dispatch('setQuestionsInCurrentScript');
        },
        methods: {
            ...mapActions([
                'getScriptById',
                'getQuestionById',
                'setCurrentScriptId',
                'setQuestionsInCurrentScript'
            ]),
        }
    }
</script>
