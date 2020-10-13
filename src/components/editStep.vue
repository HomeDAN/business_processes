<template>
    <div class="edit_step">
        <form>
            <input type="text" />
            <textarea />
            <br/>
            <input type="submit" value="Сохранить">
        </form>
    </div>
</template>

<script>
    export default {
        name: "editStep"
    }
</script>

<style>
    .edit_step {
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
</style>
