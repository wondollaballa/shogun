import Vue from 'vue'
import Component from 'vue-class-component'
import axios from 'axios'

interface IStoreHour {
    opened: boolean,
    start: string,
    end: string
}
interface IStoreHours {
    storeHours: IStoreHour[],
    originalHours: IStoreHour[],
    csrf: string
}
@Component({
    props: {
        hours: String
    }
})
export default class StoreHours extends Vue implements IStoreHours {
    hours: string = this.hours;
    storeHours = JSON.parse(this.hours);
    originalHours = JSON.parse(this.hours);

    public get csrf() {
        const csrf = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement).getAttribute('content')
        return (csrf) ? csrf as string : '';
    }
    // Lifecycle hooks
    created() {
        this.$root.$on('update-store-hours', this.updateStoreHours);
        this.$root.$on('reset-store-hours', this.resetStoreHours);
    }
    mounted() {
        const reset = document.querySelector<HTMLButtonElement>('#storehours-reset');
        const update = document.querySelector<HTMLButtonElement>('#storehours-update');
        (reset as HTMLButtonElement).addEventListener("click", this.resetStoreHours);
        (update as HTMLButtonElement).addEventListener("click", this.updateStoreHours);

    }
    updated() {
    }
    destroyed() {
        this.$root.$off('resetStoreHours', this.resetStoreHours);
        this.$root.$off('update-store-hours', this.updateStoreHours);
    }

    // methods

    private resetStoreHours() {
        this.storeHours = this.originalHours;
    }

    private updateOriginalHours() {
        this.originalHours = this.storeHours;
    }

    private updateStoreHours(): void {
        // get the price subtotal with all options selected
        axios.post('/rules/store-hours',{
            'store_hours': JSON.stringify(this.storeHours)
        }).then(response => {
            if (response.status) {
                const msg = 'You have successfully updated your store hours.';
                const type = 'success';
                this.updateOriginalHours();
                this.$root.$emit('toast', msg, type);
            } else {
                const msg = 'There was an error saving your store hours. Please try again.';
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
