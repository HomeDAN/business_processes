<template>
    <div class="create_script">
        <form @submit.prevent="addScript">
            <input
                type="text"
                id="name"
                v-model="name"
            />

            <input
                type="submit"
            />
        </form>
    </div>
</template>


<script>
    import {mapActions} from "vuex";

    export default {
        name: 'CreateScript',
        data: () => ({
            name: ''
        }),
        methods: {
            ...mapActions([
                'createScript'
            ]),
            addScript () {
                this.$store.dispatch('createScript', this.name);
                this.name = '';
            }
        }
    }
</script>
