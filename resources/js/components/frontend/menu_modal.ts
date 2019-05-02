import Vue from 'vue'
import Component from 'vue-class-component'
import { ILunchMenu, IHappyHourMenu, ISushiMenu, IHibachiMenu, IMenuItems, IMenuRow } from '../../interfaces/interfaces';
import { min } from 'moment';

@Component({
    props: {
        hasBackground: Boolean
    }
})
export default class MenuModal extends Vue {
    opened: boolean = false;
    title: string = 'Please wait...';
    menuType: string ='';
    menu: IMenuRow = { description: '', items: []};
    container: HTMLElement | null = null;
    body: HTMLElement | null = null;
    ourMenu: HTMLElement | null = null;

    // Lifecycle hooks
    created() {
        this.$root.$on('open-menu', this.openMenu);
    }
    mounted() {
        this.container = document.querySelector('#container') as HTMLElement;
        this.body = document.querySelector('body') as HTMLElement;
        this.ourMenu = document.querySelector('#our-menu') as HTMLElement;
    }
    updated() {
    }
    destroyed() {
        this.$root.$off('open-menu', this.openMenu);

    }

    private openMenu(type: string, menu: ISushiMenu | IHibachiMenu | IHappyHourMenu | ILunchMenu, menuKey: string) {
        (this.container as HTMLElement).classList.add('noscroll');
        (this.body as HTMLElement).classList.add('noscroll');

        this.opened = true;
        this.menuType = menuKey;
        switch(type) {
            case "lunch":
            this.title = `Lunch Menu - ${menuKey}`;
            this.menu = menu as any;
            break;
            case 'happy hour':
            this.title = `Happy Hour Menu - ${menuKey}`;
            this.menu = menu as any;
            break;
            case 'sushi':
            this.title = `Sushi Menu - ${menuKey}`;
            this.menu = menu as any;
            break;
            case 'hibachi':
            this.title = `Hibachi Menu - ${menuKey}`;
            this.menu = menu as any;
            break;
        }
        (this.ourMenu as HTMLElement).classList.add('noscroll');

    }

    private menuClose() {
        this.opened = false;
        this.title = '';
        this.menuType = '';
        (this.container as HTMLElement).classList.remove('noscroll');
        (this.body as HTMLElement).classList.remove('noscroll');
        (this.ourMenu as HTMLElement).classList.remove('noscroll');
    }

}
