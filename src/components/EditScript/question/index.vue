<template>
    <div class="question_with_answer">
        <canvas :id="question.id" width="300" height="225"></canvas>

        <div
            v-drag="{}"
            class="question_drag"
            :style="stylesCoords"
        >
            <div
                class="question"
                :class="{ selected: question.id == currentQuestion }"
                @click="selectQuestion"
                v-bind:id="question.id"
            >
                {{ question.name }} (ID: {{ question.id }})
            </div>

            <div
                class="question"
                @click="editQuestion"
            >edit</div>

            <div
                class="question"
                @click="addAnswer"
            >add</div>
        </div>

        <answer
            v-for="answer in answers"
            :answer="answer"
            :key="answer.id"
            @click-edit-answer="selectAnswer(answer.id)"
        />
    </div>
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
                this.stylesCoords = 'left: ' + this.question.coords.x + 'px; top: ' + this.question.coords.y + 'px;';
            }

            let canvas = document.getElementById(this.question.id);
            let context = canvas.getContext("2d");

            // context.moveTo(this.question.coords.x, this.question.coords.y);
            // context.lineTo(1000, 500);

            context.beginPath();
            context.moveTo(0, 40);
            context.lineTo(240, 40);
            context.moveTo(260, 40);
            context.lineTo(500, 40);
            context.moveTo(495, 35);
            context.lineTo(500, 40);
            context.lineTo(495, 45);

            context.strokeStyle = "black";
            context.stroke();
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
</style>
