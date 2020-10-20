<template>
    <div class="answer-statuses-list">
        <div
            v-for="status in answerStatusesList"
            :key="status.id"
        >
            {{ status.text }}

            <button
                @click="editStatus"
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
            editStatus () {

            }
        }
    }
</script>
