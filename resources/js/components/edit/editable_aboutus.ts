import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
    props: {
        oldImage: String,
        htmlContent: String,
        imageRotate: String
    },

})
export default class EditableAboutus extends Vue {
    imageUrl: string | null = null;
    content: string | null = null;
    imageRotateClass: string | null = null;

    // Lifecycle hooks
    created() {
        this.$root.$on('apply-aboutus-data', this.apply);
        this.$root.$on('editable-reset', this.reset);
    }
    mounted() {
        this.setData();
    }
    updated() {
    }
    destroyed() {
        this.$root.$off('apply-aboutus-data', this.apply);
    }

    private reset() {
        this.setData();
    }
    private setData() {
        this.imageUrl = this.$props.oldImage;
        this.content = this.$props.htmlContent;
        this.imageRotateClass = this.$props.imageRotate;
    }

    private apply(newImage: string, newRotateClass: string, newContent: string) {
        console.log(newImage, newRotateClass, newContent);
        this.imageUrl = newImage;
        this.imageRotateClass = newRotateClass;
        this.content = newContent;
    }


}
