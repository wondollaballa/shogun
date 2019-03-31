import Vue from 'vue'
import Component from 'vue-class-component'
interface INavbar {
    title: string;
    titleSrc: string,
    leftState: boolean,
    rightState: boolean,
    logoutSrc: string
}
@Component({
    props: {

    }
    
})
export default class Navbar extends Vue implements INavbar {
    title = '';
    titleSrc = '';
    leftState = true;
    rightState = true;
    logoutSrc = '';
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
    private stateChanged(): void {
        return;
    }
}