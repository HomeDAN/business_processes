<template>
    <div class="edit-script__wrapper">
        <button
            @click="updateCreatingUpdatingState('creatingQuestion')"
        >
            Создать вопрос
        </button>
    <svg class="edit-script">
        <question
            v-for="question in questionsInCurrentScript"
            :question="question"
            :key="question.id"
            :currentQuestion="currentQuestion"
            @click-edit-question="selectQuestion(question.id)"
            @click-answer="selectAnswer"
            @is-add-answer="selectCreateQuestion(question.id)"
        />

        <create-question
            v-if="CreatingUpdatingState.creatingQuestion"
            @close-modal="closeAllModal"
        />

        <edit-question
            v-if="CreatingUpdatingState.editingQuestion"
            :current="currentQuestion"
            @close-modal="closeAllModal"
        />

        <create-answer
            v-if="CreatingUpdatingState.creatingAnswer"
            :currentQuestion="currentQuestion"
            @close-modal="closeAllModal"
        />

        <edit-answer
            v-if="CreatingUpdatingState.editingAnswer"
            :currentQuestion="currentQuestion"
            :current="currentAnswer"
            @close-modal="closeAllModal"
        />
    </svg>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import Question from '@/components/EditScript/question/index.vue';
    import createQuestion from '@/components/EditScript/question/create.vue';
    import EditQuestion from '@/components/EditScript/question/edit.vue';
    import createAnswer from '@/components/EditScript/answer/create.vue';
    import editAnswer from '@/components/EditScript/answer/edit.vue';

    import 'tui-editor/dist/tui-editor.css'
    import 'tui-editor/dist/tui-editor-contents.css'
    import 'codemirror/lib/codemirror.css'

    export default {
        name: "EditScript",
        components: {
            Question,
            EditQuestion,
            createAnswer,
            editAnswer,
            createQuestion
        },
        data: () => ({
            currentQuestion: 0,
            currentAnswer: 0,
            CreatingUpdatingState: {
                creatingAnswer: false,
                creatingQuestion: false,
                editingQuestion: false,
                editingAnswer: false
            }
        }),
        computed: {
            ...mapGetters([
                'currentScriptId',
                'questionsInCurrentScript'
            ])
        },
        mounted () {
            this.$store.dispatch('setCurrentScriptId', this.$route.params.id);
            this.$store.dispatch('setQuestionsInCurrentScript');
        },
        watch: {
            questionsInCurrentScript () {
                this.$store.dispatch('setQuestionsInCurrentScript');
            }
        },
        methods: {
            ...mapActions([
                'getScriptById',
                'getQuestionById',
                'setCurrentScriptId',
                'setQuestionsInCurrentScript'
            ]),
            closeAllModal () {
                for (let state in this.CreatingUpdatingState) {
                    this.CreatingUpdatingState[state] = false;
                }
            },
            selectQuestion (id) {
                this.currentQuestion = id;
                this.updateCreatingUpdatingState('editingQuestion');
            },
            selectAnswer (id) {
                this.currentAnswer = id;
                this.updateCreatingUpdatingState('editingAnswer');
            },
            selectCreateQuestion (id) {
                this.currentQuestion = id;
                this.updateCreatingUpdatingState('creatingAnswer');
            },
            updateCreatingUpdatingState (changingNow) {
                for (let state in this.CreatingUpdatingState) {
                    if (state == changingNow) {
                        this.CreatingUpdatingState[state] = true;
                    } else {
                        this.CreatingUpdatingState[state] = false;
                    }
                }
            }
        }
    }
</script>

<style>
    .edit-script {
        position: fixed;
        left: 0;
        width: 100%;
        height: 100%;
    }

</style>
