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
    get happyHour() {
        const happyHour = (this.$props.text) ? JSON.parse(this.$props.text).happyHour : {};
        return happyHour as IHappyHourMenu;
    }
    get hibachi() {
        const hibachi = (this.$props.text) ? JSON.parse(this.$props.text).hibachi : {};
        return hibachi as IHibachiMenu;
    }

    get lunch() {
        const lunch = (this.$props.text) ? JSON.parse(this.$props.text).lunch : {};
        return lunch as ILunchMenu;
    }

    get sushi() {
        const sushi = (this.$props.text) ? JSON.parse(this.$props.text).sushi : [];
        return sushi as ISushiMenu;
    }
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

    private openMenu(type: string, menuKey: string) {
        let bringWith = {};
        switch(type) {
            case 'lunch':
            bringWith = (this.lunch.items as any)[menuKey];
            break;

            case 'happy hour':
            bringWith = (this.happyHour.items as any)[menuKey];
            break;

            case 'sushi':
            bringWith = (this.sushi.items as any)[menuKey];
            break;

            case 'hibachi':
            bringWith = (this.hibachi.items as any)[menuKey];
            break;
        }
        this.$root.$emit('open-menu', type, bringWith, menuKey);
    }

}
