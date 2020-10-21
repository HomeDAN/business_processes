<template>
    <div class="settings">
        <h3>Настройки</h3>

        <answer-statuses />
    </div>
</template>

<script>
    import AnswerStatuses from '@/components/Settings/answerStatuses/index.vue'

    export default {
        name: 'settings',
        components: {
            AnswerStatuses
        }
    }
</script>
