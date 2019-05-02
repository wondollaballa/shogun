import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
    props: {
        text: String
    }
    
})
export default class TheExperience extends Vue {

    get overview() {
        const overview = (this.$props.text) ? JSON.parse(this.$props.text).Overview : '';
        return overview;
    }
    get teppanyaki() {
        const teppanyaki = (this.$props.text) ? JSON.parse(this.$props.text).Teppanyaki : '';
        return teppanyaki;
    }

    get sushi() {
        const sushi = (this.$props.text) ? JSON.parse(this.$props.text).Sushi : "";
        return sushi;
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