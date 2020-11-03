<template>
    <g class="q_a_wrapper">
        <path
                :d="pathCoords"
                fill="transparent"
                stroke="black"
                stroke-width="5"></path>
        <g
                class="question_with_answer"
                v-bind:id="question.id"
                :transform="stylesCoords"
                ref="box"
                :style="cursor"
                @mousedown="drag"
                @mouseup="drop"
        >


            <rect
                    @click="selectQuestion"
                    class="question"
                    v-bind:id="question.id"
                    :class="{ selected: question.id == currentQuestion }"
                    width="200"
                    height="80"
                    fill="green"

            ></rect>

            <text
                    fill="white" y="45" x="30"

            >
                {{ question.name }} (ID: {{ question.id }})
            </text>

            <rect
                    y="0" x="200"
                    style="fill: blue"
                    width="80"
                    height="80"
                    class="question"
                    @click="editQuestion"
            ></rect>

            <text fill="white" y="45" x="225">Edit</text>

            <rect
                    y="0" x="280"
                    style="fill: brown"
                    width="80"
                    height="80"
                    class="question"
                    @click="addAnswer"
            ></rect>
            <text fill="white" y="45" x="305">Add</text>
        </g>

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
            pathCoords: '',
            answers: [],
            editAnswer: false,
            currentAnswer: 0,
            square: {
                x: 50,
                y: 50,
            },
            dragOffsetX: null,
            dragOffsetY: null,
            x: null,
            y: null
        }),
        components: {
            Answer
        },

        async mounted() {
            this.answers = await this.getAnswersOfQuestionById(this.question.id);

            for (let answer of this.answers) {
                // console.log('answer.coords.x', answer.coords.x);
                // console.log('answer.coords.y', answer.coords.y);
                // this.pathCoords = `M 0 0 L${answer.coords.x - this.question.coords.x} ${answer.coords.y - this.question.coords.y}`;

                // Отрисовка пути при начальной отрисовке экрана
                this.pathCoords = `M ${this.question.coords.x} ${this.question.coords.y} L${answer.coords.x} ${answer.coords.y}`;

            }

            if (this.question.coords) {
                this.stylesCoords = `translate(${this.question.coords.x}, ${this.question.coords.y})`;
                // console.log('coords', this.answers.coords.y);
            }

        },
        computed: {
            cursor () {
                return `cursor: ${this.dragOffsetX ? 'grabbing' : 'grab'}, `;
            },

        },
        methods: {
            ...mapActions([
                'getAnswerById',
                'updateQuestion',
                'getAnswersOfQuestionById'
            ]),
            editQuestion() {
                this.$emit('click-edit-question');
            },

            async selectQuestion(e) {
                const coords = {
                    x: e.offsetX - this.square.x,
                    y: e.offsetY - this.square.y,
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


            addAnswer() {
                this.$emit('click-question');
                this.$emit('is-add-answer');
            },

            selectAnswer(id) {
                this.$emit('click-answer', id);
            },

            drag({offsetX, offsetY}) {
                this.dragOffsetX = offsetX - this.square.x;
                this.dragOffsetY = offsetY - this.square.y;
                this.$refs.box.addEventListener('mousemove', this.move)
            },

            drop() {
                this.dragOffsetX = this.dragOffsetY = null;
                this.$refs.box.removeEventListener('mousemove', this.move)
            },

            async move({offsetX, offsetY}) {
                this.answers = await this.getAnswersOfQuestionById(this.question.id);

                for (let answer of this.answers) {
                    // this.pathCoords = `M 0 0 L${answer.coords.x - offsetX + 50} ${answer.coords.y - offsetY + 50}`;


                    this.pathCoords = `M ${offsetX} ${offsetY}  L ${answer.coords.x} ${answer.coords.y}`




                }








                this.stylesCoords = `translate(${offsetX - this.square.x}, ${offsetY - this.square.y})`
            },


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
