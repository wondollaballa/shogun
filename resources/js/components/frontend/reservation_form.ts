import Vue from 'vue'
import Component from 'vue-class-component'
import axios from 'axios'
import { INewReservation } from '../../interfaces/interfaces';
import { Debounce } from 'typescript-debounce';
import { Watch } from 'vue-property-decorator';
import { AsYouType } from 'libphonenumber-js'

const validator = require('validator');
interface IValidateForm {
    name: boolean;
    phone: boolean;
    email: boolean;
    party_size: boolean;
    date: boolean;
    time: boolean;
}
@Component({
    props: {
        disabledDates: String,
        times: String
    }

})
export default class ReservationForm extends Vue {
    step: number = 1;
    selectableTimes: string[] = [];
    timeSelected: string = '';
    validation: IValidateForm = {
        name: false,
        phone: false,
        email: false,
        party_size: false,
        date: false,
        time: false
    }
    reservation: INewReservation = {
        name: '',
        phone: '',
        email: '',
        party_size: 0,
        date: '',
        time: '',
        special_request: '',
        hibachi: true
    };
    // Lifecycle hooks
    created() {
        this.$root.$on('update-times', this.updateTimes);
        this.$root.$on('validate-date', this.updateValidateDate);
        this.$root.$on('set-reservation-date', this.setReservationDate);
        this.$root.$on('reset-all-reservation', this.reset);
    }
    mounted() {
    }
    updated() {
    }
    destroyed() {
        this.$root.$off('update-times', this.updateTimes);
        this.$root.$off('validate-date', this.updateValidateDate);
        this.$root.$off('set-reservation-date', this.setReservationDate);
        this.$root.$off('reset-all-reservation', this.reset);

    }
    // observers
    @Watch('reservation.name')
    private onChangedName() {
        this.$root.$emit('is-thinking');
        this.validateName();
    }
    @Watch('reservation.phone')
    private onChangedPhone() {
        this.$root.$emit('is-thinking');
        this.validatePhone();
    }
    @Watch('reservation.email')
    private onChangedEmail() {
        this.$root.$emit('is-thinking');
        this.validateEmail();
    }
    @Watch('reservation.party_size')
    private onChangedPartySize() {
        this.$root.$emit('is-thinking');
        this.validatePartySize();
    }

    @Watch('reservation.time')
    private onChangedTime() {
        this.$root.$emit('is-thinking');
        this.validateTime();
    }


    // methods
    @Debounce({millisecondsDelay: 1000})
    private validateName() {
        const n = this.reservation.name.replace(' ', '');;
        this.validation.name = (validator.isAlphanumeric(n) && !validator.isEmpty(n));
        this.reservation.name = validator.trim(this.reservation.name);
        this.thinking(this.validation.name);
    }

    @Debounce({millisecondsDelay: 1000})
    private validatePhone() {
        const phone: any = new AsYouType('US').input(this.reservation.phone);
        this.reservation.phone = validator.trim(phone);
        const base = phone.replace(/\D/g,'');
        this.validation.phone = (!validator.isEmpty(base) && validator.isAlphanumeric(base) && base.length === 10);
        this.thinking(this.validation.phone);
    }
    @Debounce({millisecondsDelay: 1000})
    private validateEmail() {
        const email = validator.trim(this.reservation.email);
        this.validation.email = (!validator.isEmpty(email) && validator.isEmail(email));
        this.thinking(this.validation.email);
    }
    @Debounce({millisecondsDelay: 1000})
    private validatePartySize() {
        const party_size = validator.trim(this.reservation.party_size);
        this.validation.party_size = (!validator.isEmpty(party_size) && validator.isNumeric(party_size) && party_size > 0);
        this.thinking(this.validation.party_size);
    }
    @Debounce({millisecondsDelay: 1000})
    private validateTime() {
        const time = validator.trim(this.reservation.time);
        this.validation.time = (!validator.isEmpty(time));
        this.thinking(this.validation.time);
    }

    private updateValidateDate(state: boolean) {
        this.validation.date = state;
    }

    private setReservationDate(date: string) {
        this.reservation.date = date;
    }

    private updateTimes(times: string) {
        this.selectableTimes = JSON.parse(times);
    }

    private thinking(state: boolean)
    {
        if (state) {
            this.$root.$emit('passed-thinking');
        } else {
            this.$root.$emit('failed-thinking');
        }
    }
    private proceedStep()
    {
        if (this.validation.name && this.validation.phone && this.validation.email) {
            this.step = 2;
        }
    }

    private preceedStep()
    {
        this.step = 1;
    }

    private finishReservation()
    {
        this.$root.$emit('open-finish-modal');
        setTimeout(() => {
            if (this.validation.name && this.validation.phone && this.validation.email && this.validation.party_size && this.validation.date && this.validation.time) {
                axios.post('/reservations/frontend-make',{
                    'name': this.reservation.name,
                    'phone': this.reservation.phone,
                    'email': this.reservation.email,
                    'party_size': this.reservation.party_size,
                    'date': this.reservation.date,
                    'time': this.reservation.time,
                    'special_request': this.reservation.special_request,
                    'hibachi': this.reservation.hibachi
                }).then(response => {
                    if (response.status) {
                        this.$root.$emit('finish-modal-step', 2);
                    }
                }).catch(e => {
                    this.$root.$emit('finish-modal-step', 0);
                });
            }
        }, 2000);

    }

    private focusSelect(name: string)
    {
        const select = (document.getElementById(name) as HTMLSelectElement);
        select.focus();
    }

    private reset()
    {
        this.step = 1;
        this.selectableTimes = [];
        this.timeSelected = '';
        this.reservation = {
            name: '',
            phone: '',
            email: '',
            party_size: 0,
            date: '',
            time: '',
            special_request: '',
            hibachi: true
        }

        this.validation = {
            name: false,
            phone: false,
            email: false,
            party_size: false,
            date: false,
            time: false
        }
    }
}
