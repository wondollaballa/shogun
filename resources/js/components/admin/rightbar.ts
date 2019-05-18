import Vue from 'vue'
import Component from 'vue-class-component'
interface IRightbar {
    title: string,
    titleSrc: string,
    state: string
}
@Component({
    props: {
        logout: String,
        users: String,
        menus: String
    }

})
export default class Rightbar extends Vue implements IRightbar {
    title = '';
    titleSrc = '';
    state = 'closed';
    logout: string = this.logout;
    csrf = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement).getAttribute('content');
    element = document.querySelector('nav#navbar') as HTMLElement;
    // computed


    // Lifecycle hooks
    created() {
    }
    mounted() {

    }
    updated() {
    }
    destroyed() {
    }

    // methods
    private toggleMenu(): void {
        this.state = (this.state == 'opened') ? 'closed' : 'opened';
        const host = document.querySelector('#admin') as HTMLElement;
        host.setAttribute('right',this.state);
    }

}
