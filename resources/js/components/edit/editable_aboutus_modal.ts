import Vue from 'vue'
import Component from 'vue-class-component'
import Editor from '@tinymce/tinymce-vue';
const Filepond = require('filepond');

@Component({
    props: {
        oldImage: String,
        rotateClass: String,
        htmlContent: String
    },
    components: {
        Editor
    }
})
export default class EditableAboutUsModal extends Vue {
    opened: boolean = false;
    title: string = 'Please wait...';
    pond: any = null;
    token: string | null = null;
    content: string | null = null;
    imageUrl: string | null = null;
    imageRotate: number = 0;
    imageRotateClass: string | null = null;
    // Lifecycle hooks
    created() {
        document.addEventListener('open-aboutus-modal', (e) => {
            this.openModal();
        });
        this.$root.$on('editable-reset', this.reset);
    }
    mounted() {
        this.token = (document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]') as HTMLMetaElement).getAttribute('content');
        this.createFilepond();
        this.setData();
    }
    updated() {
    }
    destroyed() {
        document.removeEventListener('open-aboutus-modal', (e) => {
            this.openModal();
        });

    }
    private setData() {
        this.content = this.$props.htmlContent;
        this.imageUrl = this.$props.oldImage;
        this.imageRotateClass = this.$props.rotateClass;
    }

    private createFilepond() {
        const inputElement = document.querySelector('#fileUpload-aboutus');
        this.pond = Filepond.create( inputElement );
        this.pond.setOptions({
            server: {
                process: {
                    url: './upload/aboutus',
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
                },
                revert: {
                    url: './revert/aboutus',
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
    private finishImage(imageSrc: string) {
        this.imageUrl = `../${imageSrc}`;
    }

    private rotate(direction: number) {
        switch (direction) {
            case 1:
            if(this.imageRotate < 2) {
                this.imageRotate += 1;
            }
            break;

            case -1:
            if (this.imageRotate > 0) {
                this.imageRotate -= 1;
            }
            break;
        }

        switch(this.imageRotate) {
            case 0:
            this.imageRotateClass = 'rotate-0';
            break;

            default:
            this.imageRotateClass = `rotate-${this.imageRotate}`;
            break;
        }

    }

    private getRotateClass(): string | null {
        return this.imageRotateClass;
    }
    private apply() {
        this.$root.$emit('apply-aboutus-data', this.imageUrl, this.imageRotateClass, this.content);
        this.$root.$emit('editable-nav-aboutus', {
            image: this.imageUrl,
            imageRotate: this.imageRotateClass,
            html: this.content
        });
        this.modalClose();
    }
    private openModal() {
        this.opened = true;
        this.title = "About Us Edit";
    }

    private modalClose() {
        this.opened = false;
    }

    private reset() {
        this.content = this.$props.htmlContent;
        this.imageUrl = this.$props.oldImage;
        this.imageRotateClass = this.$props.rotateClass;
    }

}
