<template>
    <div v-drag="{}">
        <div class="step">
            {{ step.title }}
        </div>
    </div>
</template>

<script>
    export default {
        name: "step",
        props: ['step']
    }
</script>

<style>
    .step {
        border: 1px solid black;
        display: inline-block;
        padding: 10px;
    }
</style>