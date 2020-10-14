<template>
    <div class="edit_step">
        <form
            @submit.prevent="updateStep"
        >
            <div class="form-group">
                <label for="name">
                    Название шага
                </label>
                <input
                    type="text"
                    class="form-control"
                    id="name"
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
    import {mapActions} from 'vuex';

    export default {
        name: "editStep",
        props: ['current'],
        data: () => ({
            name: '',
            text: ''
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
                'getStepById'
            ]),
            async setStepData () {
                const step = await this.getStepById(this.current);

                this.name = step.data[0].title;
                this.text = step.data[0].text;
            },
            updateStep () {
                console.log('send');
            }
        }
    }
</script>

