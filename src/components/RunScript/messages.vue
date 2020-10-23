<template>
    <div class="discussion">
        <div
            class="bubble sender first"
            v-html="question.text"
        ></div>
        <div
            class="bubble recipient first"
            v-html="answer"
        ></div>
    </div>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "messages",
        props: ['currentQuestion', 'answer'],
        data: () => ({
            question: {}
        }),
        async mounted () {
            let question = await this.getQuestionById(this.currentQuestion);
            this.question = question.data[0];
        },
        methods: {
            ...mapActions([
                'getQuestionById'
            ])
        }
    }
</script>

<style>
    .discussion {
        max-width: 900px;
        margin: 0 auto;

        display: flex;
        flex-flow: column wrap;
    }

    .discussion > .bubble {
        border-radius: 1em;
        padding: 0.25em 0.75em;
        margin: 0.0625em;
        max-width: 50%;
        min-width: 500px;
    }

    .discussion > .bubble.sender {
        align-self: flex-start;
        background-color: cornflowerblue;
        color: #fff;
    }
    .discussion > .bubble.recipient {
        align-self: flex-end;
        background-color: #efefef;
    }

    .discussion > .bubble.sender.first { border-bottom-left-radius: 0.1em; }
    .discussion > .bubble.sender.last { border-top-left-radius: 0.1em; }
    .discussion > .bubble.sender.middle {
        border-bottom-left-radius: 0.1em;
        border-top-left-radius: 0.1em;
    }

    .discussion > .bubble.recipient.first { border-bottom-right-radius: 0.1em; }
    .discussion > .bubble.recipient.last { border-top-right-radius: 0.1em; }
    .discussion > .bubble.recipient.middle {
        border-bottom-right-radius: 0.1em;
        border-top-right-radius: 0.1em;
    }
</style>