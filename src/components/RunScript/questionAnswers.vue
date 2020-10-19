<template>
    <div
        class="question-answers"
    >
        <Dialog
            v-if="currentQuestion >= number"
            :currentQuestion="question.id"
            :answer="answer"
        />

        <select-answer
            @next-answer="nextAnswer"
            :currentQuestion="question.id"
            v-if="currentQuestion == number"
        />
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    import SelectAnswer from '@/components/RunScript/selectAnswer.vue';
    import Dialog from '@/components/RunScript/dialog.vue';

    export default {
        name: "questionAnswers",
        props: ['question', 'number', 'currentQuestion'],
        components: {
            SelectAnswer,
            Dialog
        },
        data: () => ({
            answers: [],
            answer: ''
        }),
        methods: {
            ...mapActions([
                'getAnswerById'
            ]),
            nextAnswer (e) {
                this.answer = e;
                this.currentQuestion++;

                this.$emit('change-step', this.currentQuestion);
            }
        },
        async mounted () {
            let answer = {};
            for (let answerId of this.question.asnwers) {
                answer = await this.getAnswerById(answerId);
                this.answers.push(answer.data[0]);
            }
        }
    }
</script>

<style>
    .question-answers {
        display: flex;
        flex-direction: column;
        min-height: 100%;
    }
</style>