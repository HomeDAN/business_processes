<template>
    <div class="run_script">
        <question-answers
            v-for="(question, key) in questions"
            :key="question.id"
            :question="question"
            :number="key"
            :currentQuestion="currentQuestion"
            @change-step="changeStep"
        />
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    import QuestionAnswers from '@/components/RunScript/questionAnswers.vue';

    export default {
        name: "RunScript",
        data: () => ({
            script: {},
            questions: [],
            currentQuestion: 0
        }),
        components: {
            QuestionAnswers
        },
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
            changeStep () {
                this.currentQuestion++;
            }
        }
    }
</script>
