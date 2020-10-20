<template>
    <div class="home">
        <create-script />
        <scripts-list />
    </div>
</template>

<script>
    import CreateScript from '@/components/Home/createScript.vue';
    import ScriptsList from '@/components/Home/scriptsList.vue'

    export default {
        name: 'Home',
        components: {
            CreateScript,
            ScriptsList
        }
    }
</script>
