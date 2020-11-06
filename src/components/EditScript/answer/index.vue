<template>
    <g
        class="answer_drag"
        :transform="stylesCoords"
        :id="answer.id"
        ref="box"
        @mousedown="drag"
        @mouseup="drop"
        @click="selectAnswer"
    >
        <rect
            class="answer"
            width="200"
            height="80"
            fill="orange"
        />

        <text
            x="20" y="20"
            fill="white"
        >
            {{ answer.name }}
        </text>

        <rect
            width="80"
            height="80"
            fill="grey"
            x="200"
            class="answer"
            @click="editAnswer"
        />
    </g>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "answer",
        props: ['answerId', 'currentQuestion'],
        data: () => ({
            currentAnswer: 0,
            answer: {},
            stylesCoords: '',
            pathCoords: '',
            square: {
                x: 50,
                y: 50,
            },
            dragOffsetX: null,
            dragOffsetY: null
        }),
        async mounted () {
            this.answer = await this.getAnswerById(this.answerId);
            this.answer = this.answer.data[0];

            if (this.answer.coords) {
                this.stylesCoords =  `translate(${this.answer.coords.x}, ${this.answer.coords.y})`;
            }
        },
        methods: {
            ...mapActions([
                'updateAnswer',
                'getAnswerById'
            ]),
            async selectAnswer (e) {
                try {
                    let updatedAnswer = await this.updateAnswer({
                        id: this.answer.id,
                        data: {
                            coords: {
                                x: e.offsetX - this.square.x,
                                y: e.offsetY - this.square.y,
                            }
                        }
                    });

                    this.answer = updatedAnswer.data;

                    this.$emit('answer-change');
                } catch (e) {
                    console.error(e);
                }
            },
            editAnswer () {
                this.$emit('click-edit-answer', this.answer.id);
            },
            drag ({offsetX, offsetY}) {
                this.dragOffsetX = offsetX - this.square.x;
                this.dragOffsetY = offsetY - this.square.y;

                this.$refs.box.addEventListener('mousemove', this.move);
            },
            drop () {
                this.dragOffsetX = this.dragOffsetY = null;

                this.$refs.box.removeEventListener('mousemove', this.move);
            },
            move ({offsetX, offsetY}) {
                this.$parent.pathCoords = `M ${this.$parent.question.coords.x} ${this.$parent.question.coords.y} L ${offsetX} ${offsetY}`;
                this.stylesCoords = `translate(${offsetX - this.square.x}, ${offsetY - this.square.x})`;
            }
        }
    }
</script>

<style lang="scss">
    .answer_drag {
        display: inline-block;
    }

    .answer {
        border: 1px solid black;
        display: inline-block;
        padding: 10px;
        &.selected {
            background-color: aqua;
        }
    }
</style>