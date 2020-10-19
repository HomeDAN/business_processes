<template>
    <div class="edit-script">
        <question
            v-for="question in questions"
            :question="question"
            :currentQuestion="currentQuestion"
            :key="question.id"
            @click-question="selectQuestion(question.id)"
            @click-answer="selectAnswer"
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

        <edit-answer
            v-if="editAnswer"
            :current="currentAnswer"
        />
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    import Question from '@/components/EditScript/question.vue';
    import EditQuestion from '@/components/EditScript/editQuestion.vue';
    import createAnswer from '@/components/EditScript/createAnswer.vue';
    import editAnswer from '@/components/EditScript/editAnswer.vue';

    export default {
        name: "EditScript",
        components: {
            Question,
            EditQuestion,
            createAnswer,
            editAnswer
        },
        data: () => ({
            script: {},
            questions: [],
            currentQuestion: 0,
            currentAnswer: 0,
            editQuestion: false,
            editAnswer: false,
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
                this.editAnswer = false;
            },
            selectAnswer (id) {
                this.currentAnswer = id;

                this.editAnswer = true;
                this.editQuestion = false;
                this.createAnswer = false;
            },
            updateState () {
                this.createAnswer = true;
                this.editQuestion = false;
                this.editAnswer = false;
            }
        }
    }
</script>
