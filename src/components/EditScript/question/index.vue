<template>
    <g
        class="question_with_answer"

      >

            <rect
                class="question"
                :class="{ selected: question.id == currentQuestion }"
                @click="selectQuestion"
                v-bind:id="question.id"
                style="fill: green"

            />

        <text fill="red">{{ question.name }} (ID: {{ question.id }})</text>

            <rect
                class="question"
                @click="editQuestion"
            >edit</rect>

            <rect
                class="question"
                @click="addAnswer"
            >add</rect>


        <answer
            v-for="answer in answers"
            :answer="answer"
            :key="answer.id"
            @click-edit-answer="selectAnswer(answer.id)"
        />
    </g>
</template>

<script>
    import Answer from '@/components/EditScript/answer/index.vue';
    import {mapActions} from 'vuex';

    export default {
        name: "question",
        props: ['question', 'currentQuestion'],
        data: () => ({
            stylesCoords: '',
            answers: [],
            editAnswer: false,
            currentAnswer: 0
        }),
        components: {
            Answer
        },
        async mounted () {
            this.setAnswers();

            if (this.question.coords) {
                this.stylesCoords = 'x: ' + this.question.coords.x + 'px; y: ' + this.question.coords.y + 'px;';
            }

        },
        methods: {
            ...mapActions([
                'getAnswerById',
                'updateQuestion'
            ]),
            async setAnswers () {
                let answer = {};

                if (typeof this.question.asnwers != 'undefined') {
                    for (let answerId of this.question.asnwers) {
                        answer = await this.getAnswerById(answerId);
                        this.answers.push(answer.data[0]);
                    }
                }
            },
            editQuestion () {
                this.$emit('click-edit-question');
            },
            async selectQuestion (e) {
                const coords = {
                    x: parseInt(e.target.parentNode.style.left, 10),
                    y: parseInt(e.target.parentNode.style.top, 10),
                };

                try {
                    await this.updateQuestion({
                        id: e.target.id,
                        data: {
                            coords: coords
                        }
                    });

                } catch (e) {
                    console.error(e);
                }
            },
            addAnswer () {
                this.$emit('click-question');
                this.$emit('is-add-answer');
            },
            selectAnswer (id) {
                this.$emit('click-answer', id);
            }
        }
    }
</script>

<style lang="scss" scoped>



    .question {
        border: 1px solid black;
        display: inline-block;
        padding: 10px;

        &.selected {
            background-color: aqua;
        }
    }

    .question_drag {
        display: inline-block;
    }



    .handle {
        fill: dodgerblue;
    }

</style>
