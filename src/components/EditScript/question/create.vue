<template>
    <div class="edit_question">
        <h3>Создание вопроса</h3>

        <form
            id="create_question_form"
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
    import serializeFormByDomSelector from '@/functions/serializeFormByDomSelector.js';
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: "createQuestion",
        data: () => ({
            text: '',
            name: ''
        }),
        computed: {
            ...mapGetters([
                'currentScriptId'
            ])
        },
        methods: {
            ...mapActions([
                'createAnswerStatus',
                'getScriptById',
                'updateScript'
            ]),
            async submitQuestion () {
                let objFormData = serializeFormByDomSelector('#create_question_form');
                objFormData.answers = [];
                // todo: проверка на статус
                let createdQuestion = await this.createQuestion(objFormData);
                let updatedScript = await this.getScriptById(this.currentScriptId);

                let questions = updatedScript.data[0].questions;
                questions.push(createdQuestion.data.id);
                let updateScriptRes = await this.updateScript({id: this.currentScriptId, data: {questions: questions}});

                if (updateScriptRes.status == 200) {
                    document.getElementById('create_question_form').reset();
                }
            }
        }
    }
</script>
