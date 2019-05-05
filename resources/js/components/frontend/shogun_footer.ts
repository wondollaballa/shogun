import Vue from 'vue'
import Component from 'vue-class-component'
import * as moment from 'moment';

@Component({
    props: {
    }

})
export default class ShogunFooter extends Vue {
    get year(): string {
        return moment().year().toString();
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
