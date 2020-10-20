<template>
    <div class="answer-statuses">
        <h2>Статусы ответов</h2>

        <button
            @click="addStatus"
        >
            Добавить
        </button>

        <answer-statuses-list />
    </div>
</template>

<script>
    import AnswerStatusesList from '@/components/Settings/answerStatusesList.vue'

    export default {
        name: "answerStatuses",
        components: {
            AnswerStatusesList
        },
        methods: {
            addStatus () {

            }
        }
    }
</script>
