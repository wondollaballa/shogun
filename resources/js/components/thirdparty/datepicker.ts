import Vue from 'vue'
import Component from 'vue-class-component'
import DatePicker from "vue2-datepicker";
import BlackoutDates from '../admin/blackout_dates';
interface IDatePicker {
    date1: string,
    lang: object
}
@Component({
    components: {
        DatePicker
    }
    
})
export default class Datepicker extends Vue implements IDatePicker {
    date1: string = new Date().toDateString();
    public get lang(): object {
        return {
            days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            pickers: ['next 7 days', 'next 30 days', 'previous 7 days', 'previous 30 days'],
            placeholder: {
                date: 'Select Date',
                dateRange: 'Select Date Range'
            }
        }
    }

    created() {
        console.log('created')
    }
    mounted() {
        
    }
    updated() {
        const blackout_dates = document.querySelector('#blackout-grid') as HTMLElement;
        console.log(blackout_dates)
        
        this.$root.$emit('date-selected', this.date1);
        // send data to blackout dates
        console.log('sent')
        
    }
    destroyed() {
        console.log('destroyed')
    }
    

}