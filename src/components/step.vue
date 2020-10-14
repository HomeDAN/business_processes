<template>
    <div v-drag="{}">
        <div
            class="step"
            :class="{ selected: step.id == currentStep }"
        >
            {{ step.name }} (id: {{ step.id }})
        </div>
    </div>
</template>

<script>
    export default {
        name: "step",
        props: ['step', 'currentStep']
    }
</script>

<style lang="scss">
    .step {
        border: 1px solid black;
        display: inline-block;
        padding: 10px;

        &.selected {
            background-color: aqua;
        }
    }
</style>
