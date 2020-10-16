<template>
    <div class="question_with_answer">
        <div v-drag="{}">
            <div
                class="question"
                :class="{ selected: question.id == currentQuestion }"
                @click="selectQuestion"
            >
                {{ question.name }}
            </div>
            <div
                class="question"
                @click="addAnswer"
            >add</div>
        </div>

        <answer
            v-for="answer in answers"
            :answer="answer"
            :key="answer.id"
        />

        <edit-answer

        />
    </div>
</template>

<script>
    import Answer from '@/components/answer.vue';
    import editAnswer from '@/components/editAnswer.vue';
    import {mapActions} from 'vuex';

    export default {
        name: "question",
        props: ['question', 'currentQuestion'],
        data: () => ({
            answers: []
        }),
        components: {
            Answer,
            editAnswer
        },
        async mounted () {
            let answer = {};

            for (let answerId of this.question.asnwers) {
                answer = await this.getAnswerById(answerId);
                this.answers.push(answer.data[0]);
            }
        },
        methods: {
            ...mapActions([
                'getAnswerById'
            ]),
            selectQuestion () {
                this.$emit('click');
            },
            addAnswer () {
                this.$emit('is-add-answer');
            }
        }
    }
</script>

<style lang="scss">
    .question {
        border: 1px solid black;
        display: inline-block;
        padding: 10px;

        &.selected {
            background-color: aqua;
        }
    }
</style>
