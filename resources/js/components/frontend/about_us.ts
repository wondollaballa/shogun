import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
    props: {
        text: String
    }
})
export default class AboutUs extends Vue {
    get content() {
        return this.$props.text ? this.$props.text : '';
    }
    // Lifecycle hooks
    created() {

    }
    mounted() {
    }
    updated() {
    }
    destroyed() {

    }


}