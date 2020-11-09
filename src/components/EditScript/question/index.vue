<template>
    <g class="q_a_wrapper">
        <path
            v-for="(pathCoords, key) in pathsCoords"
            :key="key"
            :d="pathCoords.value"
            fill="transparent"
            stroke="black"
            stroke-width="5"
        />

        <g
            class="question_with_answer"
            :id="question.id"
            :transform="stylesCoords"
            ref="box"
            :style="cursor"
            @mousedown="drag"
            @mouseup="drop"
            @click="selectQuestion"
        >
            <rect
                class="question"
                :id="question.id"
                :class="{ selected: question.id == currentQuestion }"
                width="200"
                height="40"
                fill="#fff"
                stroke="#cfcfcf"
                stroke-width="1"
            />

            <text
                fill="#000"
                y="24" x="30"
            >
                {{ question.name }} (ID: {{ question.id }})
            </text>

            <path d="M206.68,11.07l-2-2,4.83-4.83,2,2Zm-2.19-1.65,1.83,1.83-2.74.92Zm7.63-3.8-.35.35-2-2,.35-.35a.89.89,0,0,1,1.26,0l.74.74A.89.89,0,0,1,212.12,5.62Z"
                y="0" x="200"
                style="fill: blue"
                width="80"
                height="80"
                class="question"
                @click="editQuestion"
            />

            <path
                d="M108.66,48.66h2.57a.51.51,0,0,0,.51-.51v-.34a.51.51,0,0,0-.51-.52h-2.57V44.73a.51.51,0,0,0-.51-.52h-.34a.52.52,0,0,0-.52.52v2.56h-2.56a.52.52,0,0,0-.52.52v.34a.51.51,0,0,0,.52.51h2.56v2.57a.51.51,0,0,0,.52.51h.34a.51.51,0,0,0,.51-.51Z"
                y="0" x="280"
                style="fill: greenyellow"
                width="80"
                height="80"
                class="question"
                @click="addAnswer"
            />

            <circle cy="0" cx="0" r="10" stroke="#cfcfcf" stroke-width="1" fill="white"></circle>

            <path
                    d="M9,8l1.81-1.82a.51.51,0,0,0,0-.72l-.24-.24a.52.52,0,0,0-.73,0L8,7,6.16,5.2a.49.49,0,0,0-.72,0l-.24.24a.49.49,0,0,0,0,.72L7,8,5.2,9.79a.52.52,0,0,0,0,.73l.24.24a.51.51,0,0,0,.72,0L8,9l1.81,1.81a.52.52,0,0,0,.73,0l.24-.24a.52.52,0,0,0,0-.73Z"
                    y="0" x="360"
                    style="fill: red"
                    width="80"
                    height="80"
                    class="question"
                    @click="deleteQ"
                />
        </g>

        <answer
            v-for="answer in answers"
            :answerId="answer.id"
            :key="answer.id"
            @click-edit-answer="selectAnswer(answer.id)"
            @answer-change="changeAnswers"
        />
    </g>
</template>

<script>
    import Answer from '@/components/EditScript/answer/index.vue';
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: "question",
        props: ['currentQuestion', 'questionId'],
        data: () => ({
            stylesCoords: '',
            pathsCoords: [],
            answers: [],
            question: {},
            editAnswer: false,
            currentAnswer: 0,
            square: {
                x: 75,
                y: 25,
            },
            dragOffsetX: null,
            dragOffsetY: null,
            x: null,
            y: null
        }),
        components: {
            Answer
        },
        async mounted () {
            this.question = await this.getQuestionById(this.questionId);
            this.question = this.question.data[0];

            this.answers = await this.getAnswersOfQuestionById(this.questionId);

            for (let answer of this.answers) {
                this.pathsCoords.push({
                    id: answer.id,
                    value: `M ${this.question.coords.x} ${this.question.coords.y} L ${answer.coords.x} ${answer.coords.y}`
                });
            }

            if (this.question.coords) {
                this.stylesCoords = `translate(${this.question.coords.x}, ${this.question.coords.y})`;
            }
        },
        computed: {
            ...mapGetters([
                'currentScriptId'
            ]),
            cursor () {
                return `cursor: ${this.dragOffsetX ? 'grabbing' : 'grab'}, `;
            }
        },
        methods: {
            ...mapActions([
                'getQuestionById',
                'getAnswerById',
                'updateQuestion',
                'getAnswersOfQuestionById',
                'deleteQuestion'
            ]),
            editQuestion () {
                this.$emit('click-edit-question');
            },
            async changeAnswers () {
                this.answers = await this.getAnswersOfQuestionById(this.questionId);
            },
            async selectQuestion (e) {
                try {
                    let updatedQuestion = await this.updateQuestion({
                        id: e.target.id,
                        data: {
                            coords: {
                                x: e.offsetX - this.square.x,
                                y: e.offsetY - this.square.y
                            }
                        }
                    });

                    this.question = updatedQuestion.data;
                } catch (e) {
                    console.error(e);
                }
            },
            deleteQ () {
                let answer = confirm('Все связанные сущности будут удалены. Продолжить?');

                if (answer) {
                    this.deleteQuestion({
                        questionId: this.question.id,
                        scriptId: this.currentScriptId
                    });
                }
            },
            addAnswer () {
                this.$emit('click-question');
                this.$emit('is-add-answer');
            },
            selectAnswer (id) {
                this.$emit('click-answer', id);
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
                for (let answer of this.answers) {
                    for (let pathKey in this.pathsCoords) {
                        if (this.pathsCoords[pathKey].id == answer.id) {
                            this.pathsCoords[pathKey].value = `M ${offsetX} ${offsetY} L ${answer.coords.x} ${answer.coords.y}`;
                        }
                    }
                }

                this.stylesCoords = `translate(${offsetX - this.square.x}, ${offsetY - this.square.y})`;
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

    .question_drag {
        display: inline-block;
    }

    .handle {
        fill: dodgerblue;
    }
</style>
