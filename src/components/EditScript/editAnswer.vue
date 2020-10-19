<template>
    <div class="edit_question">
        <h3>Редактирование ответа</h3>
        <form
            id="edit_answer_form"
            @submit.prevent="submitAnswer"
        >
            <div class="form-group">
                <label for="name">
                    Название ответа
                </label>
                <input
                    type="text"
                    class="form-control"
                    id="name"
                    name="name"
                    v-model="name"
                >
            </div>

            <div class="form-group">
                <label for="text">
                    Текст ответа
                </label>
                <textarea
                    class="form-control"
                    id="text"
                    name="text"
                    v-model="text"
                ></textarea>
            </div>

            <div class="form-group">
                <label for="status">
                    Статус
                </label>

                <select
                    v-model="status"
                    id="status"
                    name="status"
                    class="form-control"
                >
                    <option
                        v-for="status in answerStatusesList"
                        :value="status.id"
                        :key="status.id"
                    >
                        {{ status.text }}
                    </option>
                </select>
            </div>

            <input
                type="submit"
                value="Сохранить"
                class="btn btn-primary"
            >
        </form>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import serializeFormByDomSelector from '@/functions/serializeFormByDomSelector.js';

    export default {
        name: "editAnswer",
        props: ['current'],
        computed: {
            ...mapGetters([
                'answerStatusesList'
            ])
        },
        data: () => ({
            status: 0,
            text: '',
            name: ''
        }),
        watch: {
            current: function () {
                this.setAnswerData();
            }
        },
        methods: {
            ...mapActions([
                'getAnswerById',
                'updateAnswer'
            ]),
            async submitAnswer () {
                let objFormData = serializeFormByDomSelector('#edit_answer_form');
                await this.updateAnswer({id: this.current, data: objFormData});
            },
            async setAnswerData () {
                const answer = await this.getAnswerById(this.current);

                this.name = answer.data[0].name;
                this.text = answer.data[0].text;
                this.status = answer.data[0].status;
            }
        },
        async mounted () {
            this.$store.dispatch('getAnswerStatuses');
            this.setAnswerData();
        }
    }
</script>
