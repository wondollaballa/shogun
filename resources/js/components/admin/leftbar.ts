import Vue from 'vue'
import Component from 'vue-class-component'
import axios from 'axios'
import window from '../../bootstrap';

interface INotificationsCount {
    today: number,
    all: number,
    messages: number
}

interface ILeftbar {
    title: string;
    titleSrc: string;
    state: string;
    logoutSrc: string;
    reservationCount: number;
    totalReservationCount: number;
    messagesCount: number;
    animateNotificationCounts: boolean;
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
    reservationCount = 0;
    totalReservationCount = 0;
    messagesCount = 0;
    animateNotificationCounts = false;
    csrf = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement).getAttribute('content');
    element = document.querySelector('nav#navbar') as HTMLElement;
    // computed


    // Lifecycle hooks
    created() {
        this.$root.$on('animate-reservation-notifications', this.animateReservationNotifications);
    }
    mounted() {
        this.closeSubMenuOnOutsideClick();
        this.messageReceived();
        setTimeout(() => {
            this.setNotifications();    
        }, 1000);
    }
    updated() {
    }
    destroyed() {
        this.$root.$off('animate-reservation-notifications', this.animateReservationNotifications);
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
    private setNotifications() {
        axios.get('/reservations/setEvent');
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

    private animateReservationNotifications() {
        this.animateNotificationCounts = true;
        setTimeout(() => {
            this.animateNotificationCounts = false;
        }, 30000)
    }

    private messageReceived() {
        if ('Echo' in window) {
            const notificationsEvent = "NotificationsEvent";
            (window as any).Echo.channel('notifications-event').listen(notificationsEvent, (e: any) => {                
                const notificationsCount = e.data;
                if (Object.keys(notificationsCount).length > 0) {
                    // update notification counts
                    this.reservationCount = notificationsCount.today;
                    this.totalReservationCount = notificationsCount.all;
                    this.messagesCount = notificationsCount.messages;
                }
            });
        }
    }

}