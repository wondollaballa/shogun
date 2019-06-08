import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
    props: {
        oldImage: String,
        imageRotate: String
    },

})
export default class EditableHeader extends Vue {
    imageUrl: string | null = null;
    imageRotateClass: string | null = null;

    // Lifecycle hooks
    created() {
        this.$root.$on('apply-header-image', this.apply);
        this.$root.$on('apply-root-header', this.applyRoot);
        this.$root.$on('editable-reset', this.reset);
    }
    mounted() {
        this.applyRoot();
    }
    updated() {
    }
    destroyed() {
        this.$root.$off('apply-header-image', this.apply);
        this.$root.$off('apply-root-header', this.applyRoot);
    }

    private reset() {
        this.applyRoot();
    }

    private apply(imageUrl: string, imageRotateClass: string) {
        this.imageUrl = imageUrl;
        this.imageRotateClass = imageRotateClass;
    }

    private applyRoot() {
        this.imageUrl = this.$props.oldImage;
        this.imageRotateClass = this.$props.imageRotate;
    }

}
