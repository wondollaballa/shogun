import Vue from 'vue'
import Component from 'vue-class-component'
import Editor from '@tinymce/tinymce-vue';
import axios from 'axios'
const Filepond = require('filepond');

@Component({
    props: {
        hasBackground: Boolean
    },
    components: {
        Editor
    }
})
export default class EditableHeaderModal extends Vue {
    opened: boolean = false;
    title: string = 'Please wait...';
    pond: any = null;
    token: string | null = null;
    htmlContent: string | null = null;
    imageUrl: string | null = null;

    // Lifecycle hooks
    created() {
        document.addEventListener('open-header-modal', (e) => {
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
        document.removeEventListener('open-header-modal', (e) => {
            this.openModal();
        });

    }
    private createFilepond() {
        const inputElement = document.querySelector('#fileUpload-header');
        console.log(inputElement);
        this.pond = Filepond.create( inputElement );
        this.pond.setOptions({
            server: {
                process: {
                    url: './upload/header',
                    method: 'POST',
                    withCredentials: false,
                    headers: {
                        'X-CSRF-TOKEN': this.token
                    },
                    timeout: 7000,
                    onload: (e: string) => {
                        const event = JSON.parse(e);
                        const path = event.path;
                        this.setImageUrl(path);
                    },
                    onerror: null,
                    ondata: null
                },
                revert: {
                    url: './revert/header',
                    method: 'POST',
                    withCredentials: false,
                    headers: {
                        'X-CSRF-TOKEN': this.token
                    },
                    timeout: 7000,
                    onload: (e: string) => {
                        this.imageUrl = null;
                    },
                    onerror: null
                }
            }

        });
    };
    private setImageUrl(image: string) {
        this.imageUrl = `../${image}`;
    }
    private reset() {
        console.log('reset header info');
        // set values back to prop values
        this.title = '';
        this.htmlContent = null;

        // delete image from path
        this.deleteImageFromPath();
        this.imageUrl = null;
    }
    private deleteImageFromPath() {
        // check revert button exists
        const revertButton = document.querySelector<HTMLButtonElement>('.filepond--file-action-button.filepond--action-revert-item-processing');
        if(revertButton) {
            revertButton.click();
        } else {
            axios.post('/home/header/reset',{
                'path': this.imageUrl
            });
        }
        this.$root.$emit('apply-root-header');

    }
    private apply() {
        // save image path into db remove everything else in folder
        this.$root.$emit('apply-header-image', this.imageUrl);
        this.opened = false;
    }
    private openModal() {
        this.opened = true;
        this.title = "Header Edit";
    }

    private modalClose() {
        this.opened = false;
        this.reset();
    }

}
