import Vue from 'vue'
import Component from 'vue-class-component'
import Editor from '@tinymce/tinymce-vue';
const Filepond = require('filepond');

@Component({
    props: {
        htmlContent: String
    },
    components: {
        Editor
    }
})
export default class EditableFooterModal extends Vue {
    opened: boolean = false;
    title: string = 'Please wait...';
    pond: any = null;
    token: string | null = null;
    content: string | null = null;

    // Lifecycle hooks
    created() {
        document.addEventListener('open-footer-modal', (e) => {
            this.openModal();
        });
        this.$root.$on('editable-reset', this.reset);
    }
    mounted() {
        this.token = (document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]') as HTMLMetaElement).getAttribute('content');
        this.setData();
    }
    updated() {
    }
    destroyed() {
        document.removeEventListener('open-footer-modal', (e) => {
            this.openModal();
        });
    }
    private setData() {
        this.content = this.$props.htmlContent;
    }

    private apply() {
        this.$root.$emit('apply-footer-data', this.content);
        this.$root.$emit('editable-nav-footer', {
            html: this.content
        });
        this.modalClose();
    }
    private openModal() {
        this.opened = true;
        this.title = "Footer Edit";
    }

    private modalClose() {
        this.opened = false;
    }

    private reset() {
        this.content = this.$props.htmlContent;
    }


}
