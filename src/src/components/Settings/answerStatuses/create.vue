<template>
    <div class="edit_question">
        <h3>Создание статуса ответа</h3>

        <form
            id="create_status_form"
            @submit.prevent="submitStatus"
        >
            <div class="form-group">
                <label for="text">
                    Текст статуса
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
    import {mapActions} from 'vuex';

    export default {
        name: "createStatus",
        data: () => ({
            text: ''
        }),
        methods: {
            ...mapActions([
                'createAnswerStatus'
            ]),
            async submitStatus () {
                let objFormData = serializeFormByDomSelector('#create_status_form');
                let createdStatus = await this.createAnswerStatus(objFormData);

                if (createdStatus == 200) {
                    document.getElementById('create_status_form').reset();
                }
            }
        }
    }
</script>
