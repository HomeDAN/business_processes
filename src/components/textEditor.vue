<template>
    <editor
        :initialValue="editorText"
        :options="editorOptions"
        height="350px"
        ref="toastuiEditor"
    />
</template>

<script>
    import 'tui-editor/dist/tui-editor.css'
    import 'tui-editor/dist/tui-editor-contents.css'
    import 'codemirror/lib/codemirror.css'
    import { Editor } from '@toast-ui/vue-editor';

    export default {
        name: "textEditor",
        props: ['editorText'],
        data: () => ({
            editorOptions: {
                language: 'ru',
                initialEditType: 'wysiwyg'
            }
        }),
        components: {
            Editor
        },
        methods: {
            getHtml () {
                return this.$refs.toastuiEditor.invoke('getHtml');
            }
        }
    }
</script>
