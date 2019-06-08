import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
    props: {
        htmlContent: String,
        oldImage: String,
        imageRotate: String
    }
})
export default class AboutUs extends Vue {

    imageUrl: string | null = null;
    imageRotateClass: string | null = null;
    content: string | null = null;


    // Lifecycle hooks
    created() {
        this.$root.$on('apply-aboutus-data', this.applyChange);
    }
    mounted() {
        this.setData();
    }
    updated() {
    }
    destroyed() {
        this.$root.$off('apply-aboutus-data', this.applyChange);
    }

    private setData() {
        this.imageUrl = this.$props.oldImage;
        this.imageRotateClass = this.$props.imageRotate;
        this.content = this.$props.htmlContent;
    }

    private applyChange(imageSrc: string, imageRotateClass: string, content: string) {
        this.imageUrl = imageSrc;
        this.imageRotateClass = imageRotateClass;
        this.content = content;
    }
}
