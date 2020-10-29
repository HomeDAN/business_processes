<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Создание ответа</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" @click="closeModal">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form
                                id="create_answer_form"
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

                                <editor
                                    :language="editorOptions.language"
                                    :initialEditType="editorOptions.initialEditType"
                                    height="350px"
                                    ref="toastuiEditor"
                                />

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

                                <div class="form-group">
                                    <label for="bind_to">
                                        Привязать к вопросу (по id)
                                    </label>

                                    <select
                                        v-model="bindTo"
                                        id="bind_to"
                                        name="bind_to"
                                        class="form-control"
                                    >
                                        <option
                                            v-for="question in questionsInCurrentScript"
                                            :value="question.id"
                                            :key="question.id"
                                        >
                                            {{ question.id }}
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
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import serializeFormByDomSelector from '@/functions/serializeFormByDomSelector.js';
    import { Editor } from '@toast-ui/vue-editor';
    import editorOptions from "@/settings/editorOptions";

    export default {
        name: "createAnswer",
        props: ['currentQuestion'],
        data: () => ({
            status: 0,
            text: '',
            name: '',
            bindTo: 0,
            editorOptions: editorOptions
        }),
        components: {
            Editor
        },
        computed: {
            ...mapGetters([
                'answerStatusesList',
                'questionsInCurrentScript'
            ])
        },
        methods: {
            ...mapActions([
                'getAnswerStatuses',
                'createAnswer',
                'updateQuestion',
                'getQuestionById'
            ]),
            closeModal () {
                this.$emit('close-modal');
            },
            getHtml() {
                return this.$refs.toastuiEditor.invoke('getHtml');
            },
            async submitAnswer () {
                let objFormData = serializeFormByDomSelector('#create_answer_form');
                objFormData.text = this.getHtml();

                let createdAnswer = await this.createAnswer(objFormData);
                let updatedQuestion = await this.getQuestionById(this.currentQuestion);

                let asnwers = [];

                if (typeof updatedQuestion.data[0].asnwers === 'undefined') {
                    asnwers = [];
                } else {
                    asnwers = updatedQuestion.data[0].asnwers;
                }

                asnwers.push(createdAnswer.data.id);
                let updateQuestion = await this.updateQuestion({id: this.currentQuestion, data: {asnwers: asnwers}});

                if (updateQuestion.status == 200) {
                    document.getElementById('create_answer_form').reset();
                }
            }
        },
        mounted () {
            this.$store.dispatch('getAnswerStatuses');
        }
    }
</script>
