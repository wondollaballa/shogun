import Vue from 'vue'
import axios from 'axios'
import Component from 'vue-class-component'
import { timingSafeEqual } from 'crypto';
import * as moment from 'moment';
import { IReservationModal, IReservation, IRules, IOldReservation } from '../../interfaces/interfaces';
import { parsePhoneNumberFromString, AsYouType } from 'libphonenumber-js'
import { Debounce } from 'typescript-debounce';
import { diffDay } from 'fullcalendar';

@Component({
    props: {
        hasBackground: Boolean
    }
})
export default class FinishModal extends Vue {
    opened: boolean = false;
    step: number = 1;
    title: string = 'Please wait...';

    // Lifecycle hooks
    created() {
        this.$root.$on('open-finish-modal', this.openModal);
        this.$root.$on('finish-modal-step', this.setStep);
    }
    mounted() {
  
    }
    updated() {
    }
    destroyed() {
        this.$root.$off('open-finish-modal', this.openModal);
        this.$root.$off('finish-modal-step', this.setStep);

    }


    private openModal() {
        this.resetModal();
        this.opened = true;
    }

    private finish() {
        this.opened = false;
        this.$root.$emit('reset-all-reservation');
    }

    private resetModal() {
        this.title = 'Please wait...';
        this.step = 1;
    }

    private setStep(step: number) {
        this.step = step;
        this.title = (step == 1) ? 'Please wait...' : 'Reservation complete!';
    }




}