class AceEditor {
    constructor(editorId, {
        readOnly = false,
        showPrintMargin = false,
        theme = 'ace/theme/monokai',
        mode = 'ace/mode/json'
    }) {
        this.editor = window.ace.edit(editorId);

        // editor
        this.editor.setOptions({
            readOnly: readOnly
        });

        // renderer
        this.editor.renderer.setOptions({
            showPrintMargin: showPrintMargin,
            theme: theme
        });

        // session
        this.editor.session.setOptions({
            mode: mode
        });
    }
}

export default AceEditor;