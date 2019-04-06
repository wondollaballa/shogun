import Vue from 'vue'
import Component from 'vue-class-component'
import { IBlackoutDates } from '../../interfaces/interfaces';

@Component({
    props: {
        bdates: String,
        bset: String
    }
})
export default class BlackoutDates extends Vue implements IBlackoutDates{
    bdates: string = this.bdates;
    bset: string = this.bset;
    selectedDate: string = this.selectedDate;
    date1: string = this.date1;
    // computed
    public get dates() {
        const blackout_dates = (JSON.parse(this.bdates)) ? JSON.parse(this.bdates) : [{}];
        
        return blackout_dates;
    }
    public get set() {
        const blackout_set = (JSON.parse(this.bset)) ? JSON.parse(this.bset) : [{}];
        
        return blackout_set;
    }
    // Lifecycle hooks
    created() {
        console.log('created')
        
    }
    mounted() {
        const reset = document.querySelector<HTMLButtonElement>('#blackout-reset');
        const update = document.querySelector<HTMLButtonElement>('#blackout-update');
        const cancel = document.querySelector<HTMLButtonElement>('#blackout-cancel');
        (reset as HTMLButtonElement).addEventListener("click", this.resetBlackoutDates);
        (update as HTMLButtonElement).addEventListener("click", this.updateBlackoutDates);
        (cancel as HTMLButtonElement).addEventListener("click", this.cancelBlackoutDates);
        this.$root.$emit('blackout-dates', this.dates);
        this.$root.$emit('blackout-set', this.set);
    }
    updated() {
        console.log('updated')
    }
    destroyed() {
        const reset = document.querySelector<HTMLButtonElement>('#blackout-reset');
        const update = document.querySelector<HTMLButtonElement>('#blackout-update');
        const cancel = document.querySelector<HTMLButtonElement>('#blackout-cancel');
        (reset as HTMLButtonElement).removeEventListener("click", this.resetBlackoutDates);
        (update as HTMLButtonElement).removeEventListener("click", this.updateBlackoutDates);
        (cancel as HTMLButtonElement).removeEventListener("click", this.cancelBlackoutDates);
        console.log('destroyed')
    }

    private dateSelected() {
        console.log('test')

    }

    public updateBlackoutDates() {
        this.$root.$emit('post-blackout-date');
        
    }

    public resetBlackoutDates() {
        this.$root.$emit('reset-blackout-dates', this.dates);
    }

    public cancelBlackoutDates() {
        const selectedRows = document.querySelectorAll<HTMLElement>('.ag-center-cols-viewport .ag-row-selected');
        const cancel = document.querySelector('#blackout-cancel') as HTMLButtonElement;
        if (selectedRows.length > 0) {
            const deletedRows: any = [];
            selectedRows.forEach((element, key) => {
                deletedRows.push(element.innerText)
            });
            this.$root.$emit('deleted-blackout-rows', deletedRows );
        }
        cancel.setAttribute('disabled','true');
        
    }


}