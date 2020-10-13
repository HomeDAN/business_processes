<template>
    <div class="home">
        <create-script />
        <scripts-list />
    </div>
</template>

<script>
    import CreateScript from '@/components/createScript.vue';
    import ScriptsList from '@/components/scriptsList.vue'

    export default {
        name: 'Home',
        components: {
            CreateScript,
            ScriptsList
        }
    }
</script>
