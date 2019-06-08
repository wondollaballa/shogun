import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
    props: {
        oldImage: String,
        htmlContent: String,
    },

})
export default class EditableFooter extends Vue {
    content: string | null = null;
    // Lifecycle hooks
    created() {
        this.$root.$on('apply-root-footer', this.applyRoot);
        this.$root.$on('editable-reset', this.reset);
    }
    mounted() {
        this.applyRoot();
    }
    updated() {
    }
    destroyed() {
        this.$root.$off('apply-root-footer', this.applyRoot);
    }

    private reset() {
        this.applyRoot();
    }
    private applyRoot() {
        this.content = this.$props.htmlContent;
    }

}
