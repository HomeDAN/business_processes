<template>
    <div class="script">
        <question
            v-for="question in questions"
            :question="question"
            :currentQuestion="currentQuestion"
            :key="question.id"
            @click="selectQuestion(question.id)"
            @is-add-answer="updateState"
        />

        <edit-question
            v-if="editQuestion"
            :current="currentQuestion"
            :questions="questions"
        />

        <create-answer
            v-if="createAnswer"
            :currentQuestion="currentQuestion"
        />
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    import Question from '@/components/question.vue';
    import EditQuestion from '@/components/editQuestion.vue';
    import createAnswer from '@/components/createAnswer.vue';

    export default {
        name: "script",
        components: {
            Question,
            EditQuestion,
            createAnswer
        },
        data: () => ({
            script: {},
            questions: [],
            currentQuestion: 0,
            editQuestion: false,
            createAnswer: false
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
                const script = await this.getScriptById(this.$route.params.id);
                this.script = script.data[0];

                let question = {};
                for (let questionId of this.script.questions) {
                    question = await this.getQuestionById(questionId);
                    this.questions.push(question.data[0]);
                }
            },
            selectQuestion (id) {
                this.currentQuestion = id;

                this.editQuestion = true;
                this.createAnswer = false;
            },
            updateState () {
                this.createAnswer = true;
                this.editQuestion = false;
            }
        }
    }
</script>
