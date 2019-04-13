import Vue from 'vue'
import axios from 'axios'
import Component from 'vue-class-component'
import { timingSafeEqual } from 'crypto';
import * as moment from 'moment';
import { IReservationModal, IReservation, IRules, IOldReservation } from '../../interfaces/interfaces';
import { parsePhoneNumberFromString, AsYouType } from 'libphonenumber-js'
import { Debounce } from 'typescript-debounce';

@Component({
    props: {
        title: String,
        rule: String
    }
})
export default class DeleteConfirmation extends Vue {
    reservation_id: number = 0;
    // Lifecycle hooks
    created() {
        this.$root.$on("open-delete-confirmation", this.openConfirmation);
    }
    mounted() {

    }
    updated() {
    }
    destroyed() {
        this.$root.$off("open-delete-confirmation", this.openConfirmation);

    }

    private openConfirmation(reservation_id: number): void {
        this.reservation_id = reservation_id;
        this.$el.classList.add("opened");
    }

    private close(): void {
        this.$el.classList.remove("opened");
    }

    private deleteReservation() {
        axios.post('/reservations/destroy/'+this.reservation_id,{ status: 1 }).then(response => {
            if (response.status) {
                const msg = 'You have successfully deleted this reservation.';
                const type = 'success';
                this.$root.$emit('toast', msg, type);
                this.close();
                this.$root.$emit('close-modal');
            }
            
        }).catch(e => {
            const msg = 'There was an error deleting this reservation. Please try again.';
            const type = 'danger';
            this.$root.$emit('toast', msg, type);

        });
    }

}