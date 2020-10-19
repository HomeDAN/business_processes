<template>
    <div class="dialog">
        <div class="question">
            {{ question.text }}
        </div>
        <div class="answer">
            {{ answer }}
        </div>
    </div>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "dialog",
        props: ['currentQuestion', 'answer'],
        data: () => ({
            question: {}
        }),
        async mounted () {
            let question = await this.getQuestionById(this.currentQuestion);
            this.question = question.data[0];
        },
        methods: {
            ...mapActions([
                'getQuestionById'
            ])
        }
    }
</script>

<style scoped>
    .question {
        text-align: left;
    }

    .answer {
        text-align: right;
    }

    .dialog {
        flex: 1 0 auto;
    }
</style>