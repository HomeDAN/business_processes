<template>
    <div class="question_with_answer">
        <div
            v-drag="{}"
            class="question_drag"
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
                @click="addAnswer"
            >add</div>
        </div>

        <answer
            v-for="answer in answers"
            :answer="answer"
            :key="answer.id"
            @click-answer="selectAnswer(answer.id)"
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
            idAndCoordsStorage: [],
            answers: [],
            editAnswer: false,
            currentAnswer: 0
        }),
        components: {
            Answer
        },
        async mounted () {
            let answer = {};

            //if (Array.isArray(this.question.answers)) {
                for (let answerId of this.question.asnwers) {
                    answer = await this.getAnswerById(answerId);
                    this.answers.push(answer.data[0]);
                }
            //}
        },
        methods: {
            ...mapActions([
                'getAnswerById'
            ]),
            selectQuestion (e) {
                this.$emit('click-question');

                // Получаем ID и координаты объекта (вопроса)
                const itemData = {
                    id: e.target.id,
                    coords: {
                        x: e.clientX,
                        y: e.clientY
                    }
                };

                // Поиск, существует объект в масиве или нет
                let item = this.idAndCoordsStorage.find(i => i.id === itemData.id);

                // Если существует, обновляем координаты, иначе - добавляем новый элемент
                if (item) {
                    item.coords.x = itemData.coords.x;
                    item.coords.y = itemData.coords.y;
                    console.log("test")
                } else {
                    this.idAndCoordsStorage.push(itemData);
                }

                // console.log(this.idAndCoordsStorage);
                // localStorage.setItem(JSON.stringify(e.target.id), JSON.stringify(itemData))
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
