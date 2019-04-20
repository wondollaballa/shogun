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
        title: String
    }
})
export default class MessageModal extends Vue {

    opened: boolean = false;
    // Lifecycle hooks
    created() {
    }
    mounted() {
  
    }
    updated() {
    }
    destroyed() {
    }

    private closeModal() {
        this.opened = true;
    }


}