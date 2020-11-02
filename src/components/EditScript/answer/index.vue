<template>

    <g
        class="answer_drag"
        :transform="stylesCoords"
        v-bind:id="answer.id"
        ref="box"
        @mousedown="drag"
        @mouseup="drop"
    >
        <rect
            class="answer"
            @click="selectAnswer"
            width="200"
            height="80"
            fill="orange"
            :style="cursor"
        ></rect>

        <text x="20" y="20" fill="white">{{ answer.name }}</text>

        <rect
            width="80"
            height="80"
            fill="grey"
            x="200"
            class="answer"
            @click="editAnswer"
        ></rect>
        <text x="225" y="45" fill="white">edit</text>
    </g>

</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "answer",
        props: ['answer', 'currentQuestion'],
        data: () => ({
            currentAnswer: 0,
            stylesCoords: '',
            pathCoords: '',
            square: {
                x: 50,
                y: 50,
            },
            dragOffsetX: null,
            dragOffsetY: null
        }),

        mounted () {
            if (this.answer.coords) {
                this.stylesCoords =  `translate(${this.answer.coords.x}, ${this.answer.coords.y})`
            }

        },
        computed: {
            cursor() {
                return `cursor: ${this.dragOffsetX ? 'grabbing' : 'grab'}`
            },

        },
        methods: {
            ...mapActions([
                'updateAnswer'
            ]),
            async selectAnswer (e) {
                const coords = {
                    x: e.offsetX - this.square.x,
                    y: e.offsetY - this.square.y,
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
            },

            drag({offsetX, offsetY}) {
                this.dragOffsetX = offsetX - this.square.x;
                this.dragOffsetY = offsetY - this.square.y;
                // this.stylesCoords = `translate(${offsetX}, ${offsetY})`
                this.$refs.box.addEventListener('mousemove', this.move)
            },
            drop() {
                this.dragOffsetX = this.dragOffsetY = null;
                this.$refs.box.removeEventListener('mousemove', this.move)
            },
            move({offsetX, offsetY}) {
                console.log('test')

                this.pathCoords = `M 0 0 L${this.answer.coords.x - offsetX + 50} ${this.answer.coords.y - offsetY + 50}`;


                this.stylesCoords = `translate(${offsetX - this.square.x}, ${offsetY - this.square.x})`
            },
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