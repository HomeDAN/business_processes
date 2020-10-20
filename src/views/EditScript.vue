<template>
    <div class="edit-script">
        <button @click="createQuestion">
            Создать вопрос
        </button>

        <question
            v-for="question in questions"
            :question="question"
            :currentQuestion="currentQuestion"
            :key="question.id"
            @click-question="selectQuestion(question.id)"
            @click-answer="selectAnswer"
            @is-add-answer="updateState"
        />

        <create-question
            v-if="creatingQuestion"
            :currentScriptId="currentScriptId"
        />

        <edit-question
            v-if="editingQuestion"
            :current="currentQuestion"
            :questions="questions"
        />

        <create-answer
            v-if="creatingAnswer"
            :currentQuestion="currentQuestion"
        />

        <edit-answer
            v-if="editingAnswer"
            :current="currentAnswer"
        />
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    import Question from '@/components/EditScript/question.vue';
    import createQuestion from '@/components/EditScript/createQuestion.vue';
    import EditQuestion from '@/components/EditScript/editQuestion.vue';
    import createAnswer from '@/components/EditScript/createAnswer.vue';
    import editAnswer from '@/components/EditScript/editAnswer.vue';

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
            script: {},
            currentScriptId: 0,
            questions: [],
            currentQuestion: 0,
            currentAnswer: 0,
            creatingAnswer: false,
            creatingQuestion: false,
            editingQuestion: false,
            editingAnswer: false
        }),
        mounted () {
            this.setCurrentScriptAndQuestions();
        },
        methods: {
            ...mapActions([
                'getScriptById',
                'getQuestionById'
            ]),
            async setCurrentScriptAndQuestions () {
                this.currentScriptId = this.$route.params.id;
                const script = await this.getScriptById(this.currentScriptId);
                this.script = script.data[0];

                let question = {};
                for (let questionId of this.script.questions) {
                    question = await this.getQuestionById(questionId);
                    this.questions.push(question.data[0]);
                }
            },
            selectQuestion (id) {
                this.currentQuestion = id;

                this.editingQuestion = true;
                this.creatingAnswer = false;
                this.editingAnswer = false;
                this.creatingQuestion = false;
            },
            selectAnswer (id) {
                this.currentAnswer = id;

                this.editingAnswer = true;
                this.editingQuestion = false;
                this.creatingAnswer = false;
                this.creatingQuestion = false;
            },
            updateState () {
                this.creatingAnswer = true;
                this.editingQuestion = false;
                this.editingAnswer = false;
                this.creatingQuestion = false;
            },
            createQuestion () {
                this.creatingQuestion = true;
                this.creatingAnswer = false;
                this.editingQuestion = false;
                this.editingAnswer = false;
            }
        }
    }
</script>
