<template>
    <div v-drag="{}">
        <div
            class="question"
        >
            {{ answer.name }}
        </div>
    </div>
</template>

<script>
    export default {
        name: "answer",
        props: ['answer']
    }
</script>
