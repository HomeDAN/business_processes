<template>
    <div class="select-answer">
        <v-select
            :options="answersSelect"
            @input="selectAnswer"
        >
            <template v-slot:item='{answersSelect}'> <div v-html='answersSelect.label'/> </template>
            <template v-slot:selection='{answersSelect}'> <div v-html='answersSelect.label'/> </template>
        </v-select>
    </div>
</template>

<script>
    import {mapActions} from "vuex";
    import vSelect from "vue-select";
    import "vue-select/dist/vue-select.css";

    export default {
        name: "selectAnswer",
        props: ['currentQuestion'],
        components: {
            vSelect
        },
        data: () => ({
            answers: [],
            answersSelect: []
        }),
        async mounted () {
            let question = await this.getQuestionById(this.currentQuestion);
            let answer = {};

            for (let answerId of question.data[0].asnwers) {
                answer = await this.getAnswerById(answerId);

                this.answers.push(answer.data[0]);

                this.answersSelect.push({
                    label: answer.data[0].text.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi,'').replace(/<[^>]+?>/g,'').replace(/\s+/g,' ').replace(/ /g,' ').replace(/>/g,' '),
                    id: answer.data[0].id,
                    next: answer.data[0].bind_to
                });
            }
        },
        methods: {
            ...mapActions([
                'getQuestionById',
                'getAnswerById'
            ]),
            selectAnswer (e) {
                this.$emit('next-answer', e);
            }
        }
    }
</script>

<style>
    .select-answer {
        flex: 0 0 auto;
    }
</style>