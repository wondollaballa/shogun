import Vue from 'vue'
import Component from 'vue-class-component'
import DatePicker from "vue2-datepicker";
import * as moment from 'moment';

interface ILang {
    days: string[],
    months: string[],
    pickers: string[],
    placeholder: {
        date: string,
        dateRange: string
    }
}
interface ITimePickerOptions {
    start: string,
    step: string,
    end: string
}
interface IDateTimePicker {
    dateTime: string,
    lang: ILang,
    disabledDays: string[],
    timePickerOptions: ITimePickerOptions
}
@Component({
    props: {
        dateTimeRequested: String,
        blackouts: String,
        notAfter: String,
        interval: Number
    },
    components: {
        DatePicker
    }
    
})
export default class DateTimePicker extends Vue implements IDateTimePicker {
    dateTime = '';
    public get lang() {
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

    public get timePickerOptions() {
        const step = (this.$props.interval < 60) ? (this.$props.interval < 10) ? '00:0'+this.$props.interval : '00:'+this.$props.interval : '01:00';
        return {
            start: '00:00',
            step,
            end: '23:30'
          }
    }

    public get disabledDays() {
        return JSON.parse(this.$props.blackouts);
    }

    created() {
        console.log('created')
        this.$root.$on('update-default-date-time', this.setDefaultDateTime);
        this.$root.$on('force-date-time', this.forceDateTime);

    }
    mounted() {
        this.setDefaultDateTime();
    }
    updated() {
        // send data to blackout dates
        console.log('something updated');
        
        this.$root.$emit('update-selected-date-time', this.dateTime);
        this.$root.$emit('update-reservation-date-time', this.dateTime);
    }
    destroyed() {
        console.log('destroyed')
        this.$root.$off('update-default-date-time', this.setDefaultDateTime);
        this.$root.$off('force-date-time', this.forceDateTime);
    }

    private forceDateTime(dateTime: string) {
        this.dateTime = dateTime;
    }

    private setDefaultDateTime() {
        this.dateTime = (this.$props.dateTimeRequested) ? JSON.parse(this.$props.dateTimeRequested) : new Date().toLocaleString();
    }

}