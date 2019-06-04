import Vue from 'vue'
import Component from 'vue-class-component'
import Editor from '@tinymce/tinymce-vue';
const Filepond = require('filepond');

@Component({
    props: {
        hasBackground: Boolean
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
    htmlContent: string | null = null;
    imageUrl: string | null = null;

    // Lifecycle hooks
    created() {
        document.addEventListener('open-footer-modal', (e) => {
            this.openModal();
        });
    }
    mounted() {
        this.token = (document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]') as HTMLMetaElement).getAttribute('content');
        this.createFilepond();
    }
    updated() {
    }
    destroyed() {
        document.removeEventListener('open-footer-modal', (e) => {
            this.openModal();
        });
    }
    private createFilepond() {
        const inputElement = document.querySelector('#fileUpload-footer');
        this.pond = Filepond.create( inputElement );
        this.pond.setOptions({
            server: {
                process: {
                    url: './upload/footer',
                    method: 'POST',
                    withCredentials: false,
                    headers: {
                        'X-CSRF-TOKEN': this.token
                    },
                    timeout: 7000,
                    onload: (e: string) => {
                        const event = JSON.parse(e);
                        const path = event.path;
                        this.finishImage(path);
                    },
                    onerror: null,
                    ondata: null
                }
            }

        });
    };

    private finishImage(path: string) {
        // if ('image' in this.section!) {
        //     this.section!.image = path;
        //     this.$root.$emit('update-save-image');
        // }
        return;
    }
    private openModal() {
        this.opened = true;
        this.title = "Footer Edit";
    }

    private modalClose() {
        this.opened = false;
        this.title = '';
        this.htmlContent = null;
        this.imageUrl = null;
    }

}
