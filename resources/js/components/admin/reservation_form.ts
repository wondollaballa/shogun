import Vue from 'vue'
import Component from 'vue-class-component'
import axios from 'axios'
import * as moment from 'moment';
import { IReservationForm, IErrors } from '../../interfaces/interfaces';
import { Debounce } from 'typescript-debounce';
import { Watch } from 'vue-property-decorator';
import { AsYouType } from 'libphonenumber-js'

@Component({
    props: {
        reservationRules: String
    }

})
export default class ReservationForm extends Vue implements IReservationForm {
    showValidation = false;
    name: string = '';
    nameValidated = true;
    nameErrorMessage = '';
    phone: string = '';
    phoneValidated = true;
    phoneErrorMessage = '';
    email: string = '';
    emailValidated = true;
    emailErrorMessage = '';
    partySize: number = 2;
    partySizeValidated = true;
    partySizeErrorMessage = '';
    requested: string = '';
    requestedValidated = true;
    requestedErrorMessage = '';
    specialRequest: string = '';
    specialRequestValidated = true;
    specialRequestErrorMessage = '';
    hibachi = true;
    csrf = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement).getAttribute('content');
    // computed
    public get blackouts() {
        const rules = JSON.parse(this.$props.reservationRules);
        return JSON.stringify(rules.disabledDays);
    }
    public get notAfter() {
        const rules = JSON.parse(this.$props.reservationRules);
        return rules.notAfter;
    }

    public get interval() {
        const rules = JSON.parse(this.$props.reservationRules);
        return parseInt(rules.interval);
    }

    // Lifecycle hooks
    created() {
        this.$root.$on('update-selected-date-time', this.setRequested);
    }
    mounted() {
        // set the default datetime
        this.$root.$emit('update-default-date-time');
        // update
        this.partySize = 2;
        const reset = document.querySelector<HTMLButtonElement>('#reservations-reset');
        const update = document.querySelector<HTMLButtonElement>('#reservations-make');
        (reset as HTMLButtonElement).addEventListener("click", this.resetReservation);
        (update as HTMLButtonElement).addEventListener("click", this.makeReservation);
    }
    updated() {
    }
    destroyed() {
        const reset = document.querySelector<HTMLButtonElement>('#reservations-reset');
        const update = document.querySelector<HTMLButtonElement>('#reservations-make');
        (reset as HTMLButtonElement).removeEventListener("click", this.resetReservation);
        (update as HTMLButtonElement).removeEventListener("click", this.makeReservation);
        this.$root.$off('update-selected-date-time', this.setRequested);
    }

    // methods
    @Watch('phone')
    onChangePhone()
    {
        this.formatPhone();
    }
    // methods
    @Debounce({millisecondsDelay: 1000})
    private formatPhone() {
        const phone: any = new AsYouType('US').input(this.phone);
        this.phone = phone;
    }

    private setRequested(dateTime: string) {
        this.requested = moment(dateTime).format('MM/DD/YYYY h:mma');
    }

    private resetReservation() {
        this.name = '';
        this.phone = '';
        this.email = '';
        this.partySize = 2;
        this.requested = '';
        this.specialRequest = '';
        this.showValidation = false;
        this.hibachi = true;
    }

    private makeReservation() {
        // get the price subtotal with all options selected
        axios.post('/reservations/make',{
            'name': this.name,
            'phone': this.phone,
            'email': this.email,
            'party_size': this.partySize,
            'requested': this.requested,
            'special_request':this.specialRequest,
            'hibachi': this.hibachi
        }).then(response => {
            if (response.status) {
                this.showValidation = false;
                const msg = 'You have successfully created a new reservation.';
                const type = 'success';

                this.$root.$emit('toast', msg, type);
                this.resetReservation();
            }

        }).catch(e => {
            const response = e.response.data;
            // validation errors go here
            this.showValidation = true;
            this.handleValidation(response.errors);
            const msg = e.response.headers.status === '422' ? response.message : 'There was an error with your request to the server. Check with your administrator for further assistance.';
            const type = 'danger';
            this.$root.$emit('toast', msg, type);
        });
    }

    private handleValidation(errors: IErrors) {
        if ('name' in errors) {
            this.nameValidated = false;
            this.nameErrorMessage = errors.name[0];
        } else {
            this.nameValidated = true;
            this.nameErrorMessage = '';
        }
        if('phone' in errors) {
            this.phoneValidated = false;
            this.phoneErrorMessage = errors.phone[0];
        } else {
            this.phoneValidated = true;
            this.phoneErrorMessage = '';
        }
        if('email' in errors) {
            this.emailValidated = false;
            this.emailErrorMessage = errors.email[0];
        } else {
            this.emailValidated = true;
            this.emailErrorMessage = '';
        }
        if('party_size' in errors) {
            this.partySizeValidated = false;
            this.partySizeErrorMessage = errors.party_size[0];
        } else {
            this.partySizeValidated = true;
            this.partySizeErrorMessage = '';
        }
        if ('requested' in errors) {
            this.requestedValidated = false;
            this.requestedErrorMessage = errors.requested[0];
        } else {
            this.requestedValidated = true;
            this.requestedErrorMessage = '';
        }
        if ('special_request' in errors) {
            this.specialRequestValidated = false;
            this.specialRequestErrorMessage = errors.special_request[0];
        } else {
            this.specialRequestValidated = true;
            this.specialRequestErrorMessage = '';
        }
    }
}
