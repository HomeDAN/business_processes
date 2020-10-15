<template>
    <div class="script">
        <question
            v-for="question in questions"
            :question="question"
            :currentQuestion="currentQuestion"
            :key="question.id"
            @click.native="selectQuestion(question.id)"
        />

        <edit-question
            v-if="currentQuestion"
            :current="currentQuestion"
            :questions="questions"
        />
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    import Question from '@/components/question.vue';
    import EditQuestion from '@/components/editQuestion.vue';

    export default {
        name: "script",
        components: {
            Question,
            EditQuestion
        },
        data: () => ({
            script: {},
            questions: [],
            currentQuestion: 0
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
            }
        }
    }
</script>
