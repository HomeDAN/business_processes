<template>
    <div class="answer-statuses-list">
        <div
            v-for="status in answerStatusesList"
            :key="status.id"
        >
            {{ status.text }}

            <button
                @click="editStatus(status.id)"
            >
                Изменить
            </button>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "answerStatusesList",
        computed: {
            ...mapGetters([
                'answerStatusesList'
            ])
        },
        mounted () {
            this.$store.dispatch('getAnswerStatuses');
        },
        methods: {
            ...mapActions([
                'getAnswerStatuses'
            ]),
            editStatus (id) {
                this.$emit('edit-status', id);
            }
        }
    }
</script>
