import Vue from 'vue'
import Component from 'vue-class-component'
import { IMenuSection, IMenu } from '../../interfaces/interfaces';
const Filepond = require('filepond');
@Component({
    props: {

    }
})
export default class ImageModal extends Vue {
    opened: boolean = false;
    title: string = 'Upload Image';
    image: any;
    hasImage: boolean = false;
    token: string | null = null;
    imagePath: string | null = null;
    section: IMenuSection | null = null;
    keys: number[] = [];
    pond: any = null;

    // Lifecycle hooks
    created() {
        this.$root.$on('open-image-modal', this.openDialog);
    }
    mounted() {
        this.token = (document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]') as HTMLMetaElement).getAttribute('content');
        this.createFilepond();
    }
    updated() {
    }
    destroyed() {
        this.$root.$off('open-image-modal', this.openDialog);
    }

    private createFilepond() {
        const inputElement = document.querySelector('.fileUpload');
        this.pond = Filepond.create( inputElement );
        Filepond.setOptions({
            server: {
                process: {
                    url: './menus/upload',
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
    }

    private finishImage(path: string) {
        if ('image' in this.section!) {
            this.section!.image = path;
            this.$root.$emit('update-save-image');
        }
        this.closeDialog();
        return;
    }
    private openDialog(section: IMenuSection, keys: number[]) {
        this.opened = true;
        this.section = section;
        this.keys = keys;
    }

    private closeDialog() {
        this.opened = false;
        this.resetForm();
    }

    private async resetForm() {
        this.image = null;
        this.hasImage = false;
        this.token = null;
        this.imagePath = null;
        this.section = null;
        this.keys = [];
        const inputElement = document.querySelector<HTMLInputElement>('.fileUpload');
        await this.pond.destroy(inputElement);
        setTimeout(() => {
            this.createFilepond();
        });

    }

    private setImage(output: any) {
        this.hasImage = true;
        this.image = output;
    }


}
