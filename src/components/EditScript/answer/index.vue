<template>
    <div class="">
        <div
            v-drag="{}"
            class="answer_drag"
            :style="stylesCoords"
        >
            <div
                class="answer"
                @click="selectAnswer"
            >
                {{ answer.name }}
            </div>

            <div
                class="answer"
                @click="editAnswer"
            >edit</div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "answer",
        props: ['answer', 'currentQuestion'],
        data: () => ({
            currentAnswer: 0,
            stylesCoords: ''
        }),
        mounted () {
            if (this.answer.coords) {
                this.stylesCoords = 'transform: none; left: ' + this.answer.coords.x + 'px; top: ' + this.answer.coords.y + 'px;';
            }
        },
        methods: {
            ...mapActions([
                'updateAnswer'
            ]),
            async selectAnswer (e) {
                const coords = {
                    x: parseInt(e.target.parentNode.style.left, 10),
                    y: parseInt(e.target.parentNode.style.top, 10),
                };

                try {
                    await this.updateAnswer({
                        id: this.answer.id,
                        data: {
                            coords: coords
                        }
                    });
                } catch (e) {
                    console.error(e);
                }
            },
            editAnswer () {
                this.$emit('click-edit-answer', this.answer.id);
            }
        }
    }
</script>

<style lang="scss">
    .answer_drag {
        display: inline-block;
    }
    .answer {
        border: 1px solid black;
        display: inline-block;
        padding: 10px;
        &.selected {
            background-color: aqua;
        }
    }
</style>