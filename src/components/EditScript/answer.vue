<template>
    <div class="">
        <div
            v-drag="{}"
            class="answer_drag"
        >
            <div
                class="answer"
                @click="selectAnswer"
            >
                {{ answer.name }}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "answer",
        props: ['answer', 'currentQuestion'],
        data: () => ({
            currentAnswer: 0
        }),
        methods: {
            selectAnswer () {
                this.$emit('click-answer', this.answer.id);
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
