import Vue from 'vue'
import Component from 'vue-class-component'
import { timingSafeEqual } from 'crypto';

@Component({
    props: {
        title: String
    }
})
export default class Modal extends Vue{
    // computed
    // public get styleType(): string {
    //     return (JSON.parse(this.alert)) ? JSON.parse(this.alert).message : "";
    // }

    // Lifecycle hooks
    created() {
        this.$root.$on("open-modal", this.openModal);
    }
    mounted() {
        
        
    }
    updated() {
    }
    destroyed() {
        this.$root.$off("open-modal", () => { this.openModal });
    }
    private openModal(name: string): void {
        const modal = document.querySelector(name) as HTMLElement;
        modal.classList.add('opened');
    }
    private close(): void {
        this.$el.classList.remove("opened");
    }

}