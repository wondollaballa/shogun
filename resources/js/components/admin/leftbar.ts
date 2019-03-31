import Vue from 'vue'
import Component from 'vue-class-component'
interface ILeftbar {
    title: string;
    titleSrc: string,
    state: string
    logoutSrc: string
}
@Component({
    props: {

    }
    
})
export default class Leftbar extends Vue implements ILeftbar {
    title = '';
    titleSrc = '';
    state = 'closed';
    logoutSrc = '';
    csrf = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement).getAttribute('content');
    element = document.querySelector('nav#navbar') as HTMLElement;
    // computed


    // Lifecycle hooks
    created() {
             
    }
    mounted() {
        this.closeSubMenuOnOutsideClick();
    }
    updated() {
        console.log('updated')
    }
    destroyed() {
 
        console.log('destroyed')
    }

    // methods
    private toggleMenu(): void {
        this.state = (this.state == 'opened') ? 'closed' : 'opened';
        const host = document.querySelector('#admin') as HTMLElement;
        host.setAttribute('left',this.state);
    }
    private toggleDropdown(e: Event): void {
   
        const dropdown = e.currentTarget as HTMLElement;
        const status = dropdown.getAttribute('status');
        const new_state = (status == 'opened') ? 'closed' :  'opened';
        dropdown.setAttribute('status', new_state);
    }
    private makeActiveRow(e: Event): void {
        const host = document.querySelector('#navbar-left') as HTMLElement;
        const menu_item = e.currentTarget as HTMLElement;
        const menu_items = host.querySelectorAll('.menu-item-header');
        // undo active 
        menu_items.forEach(item => {
            console.log(item);
            item.classList.remove('active');
        });
        // make current active
        menu_item.classList.add('active');
    }

    private closeSubMenuOnOutsideClick(): void {
        const body = document.querySelector('body') as HTMLElement;
        body.addEventListener("click", () => {
            const excepts = document.querySelectorAll('nav#navbar-left .left-row-dropdown');
            excepts.forEach(except => {
                except.setAttribute("status","closed");
            });
        });
        const excepts = document.querySelectorAll('nav#navbar-left .left-row-dropdown');
        excepts.forEach(except => {
            except.addEventListener("click", (e) => {
                e.stopPropagation();
            });   
        });
    }

}