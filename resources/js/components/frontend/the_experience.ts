import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
    props: {
        htmlContent: String,
        oldImage: String,
        rotateClass: String
    }

})
export default class TheExperience extends Vue {
    imageUrl: string | null = null;
    imageRotateClass: string | null = null;
    content: string | null = null;

    // Lifecycle hooks
    created() {
        this.$root.$on('apply-theexperience-data', this.applyData);
    }
    mounted() {
        this.setData();
    }
    updated() {
    }
    destroyed() {
        this.$root.$off('apply-theexperience-data', this.applyData);
    }

    private setData() {
        this.imageUrl = this.$props.oldImage;
        this.imageRotateClass = this.$props.rotateClass;
        this.content = this.$props.htmlContent;
    }

    private applyData(imageSrc: string, rotateClass: string, content: string) {
        this.imageUrl = imageSrc;
        this.imageRotateClass = rotateClass;
        this.content = content;
    }

}
