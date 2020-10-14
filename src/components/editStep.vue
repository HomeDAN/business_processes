<template>
    <div class="edit_step">
        <form
            id="edit_step_form"
            @submit.prevent="submitStep"
        >
            <div class="form-group">
                <label for="name">
                    Название шага
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
                    Текст шага
                </label>
                <textarea
                    class="form-control"
                    id="text"
                    name="text"
                    v-model="text"
                ></textarea>
            </div>

            <div class="form-group">
                <label for="bind_to">
                    Привязать к шагу (по id)
                </label>

                <select
                    v-model="bindTo"
                    id="bind_to"
                    name="bind_to"
                    class="form-control"
                >
                    <option
                        v-for="step in steps"
                        :value="step.id"
                        :key="step.id"
                    >
                        {{ step.id }}
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
    import {mapActions} from 'vuex';
    import jQuery from 'jquery';
    const $ = jQuery;

    export default {
        name: "editStep",
        props: ['current', 'steps'],
        data: () => ({
            name: '',
            text: '',
            bindTo: 0
        }),
        mounted () {
            this.setStepData();
        },
        watch: {
            current: function () {
                this.setStepData();
            }
        },
        methods: {
            ...mapActions([
                'getStepById',
                'updateStep'
            ]),
            async setStepData () {
                const step = await this.getStepById(this.current);

                this.name = step.data[0].name;
                this.text = step.data[0].text;
                this.bindTo = step.data[0].bind_to;
            },
            async submitStep () {
                let serializedFormArray = $('#edit_step_form').serializeArray();
                let objFormData = {};

                $.each(serializedFormArray, function () {
                    objFormData[this.name] = this.value;
                });

                await this.updateStep({id: this.current, data: objFormData});
            }
        }
    }
</script>
