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
    imageRotate: number = 0;
    imageRotateClass: string | null = null;
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
        this.pond.setOptions({
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
        this.imagePath = path;
        console.log('here')
        if ('image' in this.section!) {
            this.mergeImageData();
        }
        // this.closeDialog();
        return;
    }
    private mergeImageData() {
        this.section!.image = this.imagePath;
        this.section!.image_rotate = this.imageRotateClass;
        console.log('sending image');
        this.$root.$emit('update-save-image', this.keys, this.imagePath, this.imageRotateClass);
    }

    private openDialog(section: IMenuSection, keys: number[]) {
        this.opened = true;
        this.section = section;
        this.keys = keys;
        console.log('opened', this.keys);
        this.imagePath = this.section.image;
        this.imageRotateClass = this.section.image_rotate;
    }

    private closeDialog() {
        this.opened = false;
        this.mergeImageData();
        this.resetForm();
    }

    private async resetForm() {
        this.image = null;
        this.hasImage = false;
        this.token = null;
        this.imagePath = null;
        this.imageRotateClass = null;
        this.imageRotate = 0;
        this.section = null;
        this.keys = [];
    }

    private setImage(output: any) {
        this.hasImage = true;
        this.image = output;
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

    private getRotateClass(){
        return this.imageRotateClass;
    }

}
