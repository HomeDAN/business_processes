<template>
    <div class="settings">
        <h1>Настройки</h1>

        <answer-statuses />
    </div>
</template>

<script>
    import AnswerStatuses from '@/components/Settings/answerStatuses.vue'

    export default {
        name: 'settings',
        components: {
            AnswerStatuses
        }
    }
</script>