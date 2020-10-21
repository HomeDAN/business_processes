<template>
    <div class="answer-statuses">
        <h4>Статусы ответов</h4>

        <button
            @click="addStatus"
        >
            Добавить
        </button>

        <answer-statuses-list
            @edit-status="editStatus"
        />

        <create-status
            v-if="CreatingUpdatingState.creating"
        />

        <edit-status
            v-if="CreatingUpdatingState.editing"
            :currentId="currentId"
        />
    </div>
</template>

<script>
    import AnswerStatusesList from '@/components/Settings/answerStatuses/list.vue'
    import createStatus from '@/components/Settings/answerStatuses/create.vue'
    import editStatus from '@/components/Settings/answerStatuses/edit.vue'

    export default {
        name: "answerStatuses",
        components: {
            AnswerStatusesList,
            createStatus,
            editStatus
        },
        data: () => ({
            currentId: 0,
            CreatingUpdatingState: {
                creating: false,
                editing: false
            }
        }),
        methods: {
            addStatus () {
                this.CreatingUpdatingState.creating = true;
                this.CreatingUpdatingState.editing = false;
            },
            editStatus (statusId) {
                this.currentId = statusId;

                this.CreatingUpdatingState.editing = true;
                this.CreatingUpdatingState.creating = false;
            }
        }
    }
</script>
