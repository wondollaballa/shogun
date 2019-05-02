import Vue from 'vue'
import Component from 'vue-class-component'
const scrollToThis= require('scroll-to-element');
@Component({
    props: {
        imageSrc: String,
        
    }
    
})
export default class ShogunNav extends Vue {
    pointReached: string = '';
    // Lifecycle hooks
    created() {
        document.addEventListener('waypoint', this.updateWaypoint as any);
    }
    mounted() {
    }
    updated() {
    }
    destroyed() {
        document.removeEventListener('waypoint', this.updateWaypoint as any);
    }
    
    private updateWaypoint(e: CustomEvent) {
        switch(e.detail.point) {
            case 'about-us':
            this.pointReached = 'about-us';
            break;

            case 'the-experience':
            this.pointReached = 'the-experience';
            break;

            case 'our-menu':
            this.pointReached = 'our-menu';
            break;

            case 'contact-us':
            this.pointReached = 'contact-us';
            break;
        }
    }

    private scrollToElement(element: string) {
        this.pointReached = '';
        scrollToThis("#"+element, {
            offset: -70,
            ease: 'out-bounce',
            duration: 500
        });
        setTimeout(() => {
            this.pointReached = element;
        }, 501)
        
    }

}