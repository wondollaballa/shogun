import Vue from 'vue'
import Component from 'vue-class-component'
import { IMenuSection } from '../../interfaces/interfaces';

@Component({
    props: {
        hasBackground: Boolean
    }
})
export default class MenuModal extends Vue {
    opened: boolean = false;
    title: string = 'Please wait...';
    menuType: number = 1;
    menu: IMenuSection | null = null;
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

    private openMenu(section: IMenuSection) {
        (this.container as HTMLElement).classList.add('noscroll');
        (this.body as HTMLElement).classList.add('noscroll');

        this.opened = true;
        this.menuType = section.id!;
        this.title = `${section.name} Menu`;
        this.menu = section;
        (this.ourMenu as HTMLElement).classList.add('noscroll');

    }

    private menuClose() {
        this.opened = false;
        this.title = '';
        this.menuType = 1;
        (this.container as HTMLElement).classList.remove('noscroll');
        (this.body as HTMLElement).classList.remove('noscroll');
        (this.ourMenu as HTMLElement).classList.remove('noscroll');
    }

}
