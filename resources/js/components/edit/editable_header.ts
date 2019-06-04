import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
    props: {
        oldImage: String
    },

})
export default class EditableHeader extends Vue {
    imageUrl: string | null = null;

    // Lifecycle hooks
    created() {
        this.$root.$on('apply-header-image', this.apply);
        this.$root.$on('apply-root-header', this.applyRoot);
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

    private apply(imageUrl: string) {
        this.imageUrl = imageUrl;
    }

    private applyRoot() {
        this.imageUrl = this.$props.oldImage;
    }

}
