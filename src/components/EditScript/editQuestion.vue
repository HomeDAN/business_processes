<template>
    <div class="edit_question">
        <h3>Редактирование вопроса</h3>
        <form
            id="edit_question_form"
            @submit.prevent="submitQuestion"
        >
            <div class="form-group">
                <label for="name">
                    Название вопроса
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
                    Текст вопроса
                </label>
                <textarea
                    class="form-control"
                    id="text"
                    name="text"
                    v-model="text"
                ></textarea>
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
        name: "editQuestion",
        props: ['current'],
        data: () => ({
            name: '',
            text: ''
        }),
        computed: {
            ...mapGetters([
                'questionsInCurrentScript'
            ])
        },
        mounted () {
            this.setQuestionData();
        },
        watch: {
            current: function () {
                this.setQuestionData();
            }
        },
        methods: {
            ...mapActions([
                'getQuestionById',
                'updateQuestion'
            ]),
            async setQuestionData () {
                const question = await this.getQuestionById(this.current);

                this.name = question.data[0].name;
                this.text = question.data[0].text;
            },
            async submitQuestion () {
                let objFormData = serializeFormByDomSelector('#edit_question_form');

                await this.updateQuestion({id: this.current, data: objFormData});
            }
        }
    }
</script>
