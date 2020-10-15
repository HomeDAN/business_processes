<template>
    <div v-drag="{}">
        <div
            class="question"
            :class="{ selected: question.id == currentQuestion }"
        >
            {{ question.name }} (id: {{ question.id }})
        </div>
        <span
            @click="addAnswer"
        >add</span>
    </div>
</template>

<script>
    export default {
        name: "question",
        props: ['question', 'currentQuestion'],
        methods: {
            addAnswer () {

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
