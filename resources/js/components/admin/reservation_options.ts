import Vue from 'vue'
import Component from 'vue-class-component'
import axios from 'axios'

interface IOptions {
    text: string,
    value: number
}
interface IReservationOptions {
    interval_selected: number,
    intervals: IOptions[];
    reservation_deadline_selected: number,
    reservation_deadline: IOptions[]

}
@Component({
    props: {
        pInterval: String,
        pCutoff: String
    }

})
export default class ReservationOptions extends Vue implements IReservationOptions {
    interval_selected = 1;
    reservation_deadline_selected = 15;
    csrf = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement).getAttribute('content');
    // computed
    public get intervals() {
        return [
            { value: 1, text: '1 minute interval' },
            { value: 5, text: '5 minute interval' },
            { value: 10, text: '10 minute interval' },
            { value: 15, text: '15 minute interval' },
            { value: 20, text: '20 minute interval' },
            { value: 25, text: '25 minute interval' },
            { value: 30, text: '30 minute interval' },
            { value: 60, text: '1 hour interval' },
        ];
    }
    public get reservation_deadline() {
        return [
            { value: 0, text: 'No cutoff' },
            { value: 1, text: '1 minutes cutoff' },
            { value: 10, text: '10 minute cutoff' },
            { value: 15, text: '15 minute cutoff' },
            { value: 20, text: '20 minute cutoff' },
            { value: 25, text: '25 minute cutoff' },
            { value: 30, text: '30 minute cutoff' },
            { value: 60, text: '1 hour cutoff' },
        ];
    }


    // Lifecycle hooks
    created() {
    }
    mounted() {
       this.resetOptions();
        const reset = document.querySelector<HTMLButtonElement>('#settings-reset');
        const update = document.querySelector<HTMLButtonElement>('#settings-update');
        (reset as HTMLButtonElement).addEventListener("click", this.resetOptions);
        (update as HTMLButtonElement).addEventListener("click", this.updateOptions);
    }
    updated() {
    }
    destroyed() {
    }

    // methods
    private resetOptions() {
        this.interval_selected = this.$props.pInterval;
        this.reservation_deadline_selected = this.$props.pCutoff;
    }

    private updateOptions() {
        // get the price subtotal with all options selected
        axios.post('/rules/store-options',{
            'reservation_deadline': this.reservation_deadline_selected,
            'interval': this.interval_selected
        }).then(response => {
            if (response.status) {
                const msg = 'You have successfully updated your reservation options.';
                const type = 'success';
                this.$root.$emit('toast', msg, type);
            } else {
                const msg = 'There was an error saving your reservation options. Please try again.';
                const type = 'danger';
                this.$root.$emit('toast', msg, type);
            }

        }).catch(e => {
            const msg = 'There was an error with your request to the server. Check with your administrator for further assistance.';
            const type = 'danger';
            this.$root.$emit('toast', msg, type);
        });
    }
}
