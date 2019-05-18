import Vue from 'vue'
import Component from 'vue-class-component'
import { IHappyHourMenu, IHibachiMenu, ILunchMenu, ISushiMenu } from '../../interfaces/interfaces';
const LazyLoad = require('vanilla-lazyload');

@Component({

    props: {
        text: String
    }

})
export default class OurMenu extends Vue {
    get menus() {
        return JSON.parse(this.$props.text);
    };



    // Lifecycle hooks
    created() {

    }
    mounted() {
        const lazyLoadInstance = new LazyLoad({
            elements_selector: '.lazy'
        });
        if (lazyLoadInstance) {
            lazyLoadInstance.update();
        }
    }
    updated() {
    }
    destroyed() {

    }

    private openMenu(section: any) {

        this.$root.$emit('open-menu', section);
    }

}
