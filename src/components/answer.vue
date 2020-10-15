<template>
    <div v-drag="{}">
        <div
            class="question"
        >
            {{ question.name }} (id: {{ question.id }})
        </div>
    </div>
</template>

<script>
    export default {
        name: "answer"
    }
</script>
