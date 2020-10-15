<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
        </div>

        <router-view/>
    </div>
</template>

<style lang="scss">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }

    .edit_question {
        outline: 1px solid red;
        position: fixed;
        right: 0;
        width: 300px;
        height: 100%;
        padding: 20px;
        top: 0;
        z-index: 999;
        background: #fff;
    }

    @import'~bootstrap/dist/css/bootstrap.css';
</style>
