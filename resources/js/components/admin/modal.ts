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
        title: String,
        rule: String
    }
})
export default class Modal extends Vue implements IReservationModal{
    editable: boolean = false;
    editableReservation: boolean = false;
    finished: boolean = false;
    get rules() {
        const defaultRules: IRules = {
            disabledDays: [],
            interval: 5,
            notAfter: ''
        };
        let rules = this.$props.rule ? JSON.parse(this.$props.rule) : defaultRules;
        rules.disabledDays = JSON.stringify(rules.disabledDays);
        return rules;
    }

    oldReservation: IOldReservation = {
        id : 0,
        customer_id: 0,
        name: '',
        phone: '',
        email: '',
        large_party: 0,
        party_size: 0,
        requested: '',
        special_request: '',
        no_show: false,
        arrived_at: '',
        seated_at: '',
        seat_id: 0,
        status: 0,
        deleted_at: '',
        created_at: '',
        updated_at: '',
        hibachi: true
    };
    
    reservation: IReservation = {
        id : 0,
        customer_id: 0,
        name: '',
        phone: '',
        email: '',
        large_party: 0,
        party_size: 0,
        requested: '',
        special_request: '',
        no_show: false,
        arrived_at: '',
        seated_at: '',
        seat_id: 0,
        status: 0,
        hibachi: true,
        deleted_at: '',
        created_at: '',
        updated_at: ''
    };
    // Lifecycle hooks
    created() {
        this.$root.$on('make-calendar-editable', this.updateEditable);
        this.$root.$on("open-modal", this.openModal);
        this.$root.$on('close-modal', this.close);
        this.$root.$on('update-reservation-date-time', this.updateRequested);
    }
    mounted() {
  
    }
    updated() {
    }
    destroyed() {
        this.$root.$off("open-modal", () => { this.openModal });
        this.$root.$off('close-modal', this.close);
        this.$root.$off('update-reservation-date-time', this.updateRequested);
        this.$root.$off('make-calendar-editable', this.updateEditable);

    }

    public updateEditable(state: boolean) {
        this.editableReservation = state;
    }

    private openModal(name: string, reservation: IReservation): void {
        console.log(reservation);
        this.editable = false;
        this.reservation = reservation;

        let phone: any = parsePhoneNumberFromString(reservation.phone, 'US');
        this.reservation.phone = phone.formatNational();
        this.reservation.requested_formatted = moment(this.reservation.requested).format('llll');
        this.$root.$emit('force-date-time', this.reservation.requested);
        this.oldReservation = {
            id : reservation.id,
            customer_id: reservation.customer_id,
            name: reservation.name,
            phone: phone.formatNational(),
            email: reservation.email,
            large_party: reservation.large_party,
            party_size: reservation.party_size,
            requested: reservation.requested,
            requested_formatted: moment(this.reservation.requested).format('llll'),
            special_request: reservation.special_request,
            no_show: reservation.no_show,
            arrived_at: reservation.arrived_at,
            seated_at: reservation.seated_at,
            seat_id: reservation.seat_id,
            status: reservation.status,
            hibachi: reservation.hibachi,
            deleted_at: reservation.deleted_at,
            created_at: reservation.created_at,
            updated_at: reservation.updated_at
        }

        this.finished = (reservation.status === 3) ? true : false;

        this.$el.classList.add('opened');
    }
    private close(): void {
        this.$el.classList.remove("opened");
    }

    @Debounce({millisecondsDelay: 1000})
    private formatPhone() {
        const phone: any = new AsYouType('US').input(this.reservation.phone);
        this.reservation.phone = phone;
    }

    private allowEdit() {
        // const resElements = document.querySelectorAll('.reservation-modal-content');
        // resElements.forEach(element => {
        //     element.removeAttribute('disabled');
        // });
        this.editable = true;
    }
    private updateRequested(dateTime: string) {
        const makeDate = moment(dateTime);
        this.reservation.requested = makeDate.format('YYYY-MM-DD HH:mm:ss');
        this.reservation.requested_formatted = makeDate.format('llll');
    }
    private save() {
        axios.post('/reservations/store/'+this.reservation.id,{
            'name': this.reservation.name,
            'phone': this.reservation.phone,
            'email': this.reservation.email,
            'requested': this.reservation.requested,
            'party_size': this.reservation.party_size,
            'special_request': this.reservation.special_request,
            'hibachi': this.reservation.hibachi,
            'editable': this.editableReservation
        }).then(response => {
            if (response.status) {
                // this.close();
                const msg = 'You have successfully updated your reservation.';
                const type = 'success';
                this.$root.$emit('toast', msg, type);
                this.editable = false;
            }
            
        }).catch(e => {
            const response = e.response.data;
            const msg = e.response.status === 422 ? response.message : 'There was an error with your reservation update. Please try again.';
            const type = 'danger';
            this.$root.$emit('toast', msg, type);

        });
        
    }


    private undo() {
        this.reservation = this.oldReservation;
    }

    private seat() {
        axios.post('/reservations/seat/'+this.reservation.id,{ 
            status: 3,
            editable: this.editableReservation
        }).then(response => {
            if (response.status) {
                const msg = 'You have successfully finished this reservation.';
                const type = 'success';
                this.$root.$emit('toast', msg, type);
                this.editable = false;
                this.close();
            }
            
        }).catch(e => {
            const msg = 'There was an error finishing this reservation. Please try again.';
            const type = 'danger';
            this.$root.$emit('toast', msg, type);

        });
    }

    private unseat() {
        axios.post('/reservations/unseat/'+this.reservation.id,{ 
            status: 1,
            editable: this.editableReservation
        }).then(response => {
            if (response.status) {
                const msg = 'You have successfully finished reverting this reservation.';
                const type = 'success';
                this.$root.$emit('toast', msg, type);
                this.editable = false;
                this.finished = false;
            }
            
        }).catch(e => {
            const msg = 'There was an error reverting this reservation. Please try again.';
            const type = 'danger';
            this.$root.$emit('toast', msg, type);

        });
    }

    private deleteConfirmation() {
        this.$root.$emit('open-delete-confirmation', this.reservation.id);
    }

}