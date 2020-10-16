<template>
    <div class="scripts_list">
        <h3>Список скриптов</h3>
        <ul>
            <li
                class="li_item"
                v-for="(script) in scriptsList"
                :key="script.id"
            >
                <router-link :to="{ path: '/scripts/edit/' + script.id }">
                    {{ script.name }} (редактирование)
                </router-link> |
                <router-link :to="{ path: '/scripts/run/' + script.id }">
                    {{ script.name }} (запустить)
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: "scriptsList",
        computed: {
            ...mapGetters([
                'scriptsList'
            ])
        },
        methods: {
            ...mapActions([
                'getScripts'
            ])
        },
        mounted () {
            this.$store.dispatch('getScripts');
        }
    }
</script>


<style scoped lang="scss">
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: block;
        padding: 10px;
    }

    a {
        color: #42b983;
    }

    .li_item {
        &:hover {
            cursor: pointer;
        }
    }
</style>