import Vue from 'vue'
import Component from 'vue-class-component'
import 'flatpickr/dist/flatpickr.css';
import { IDateConfig } from '../../interfaces/interfaces';
import * as moment from 'moment';
import axios from 'axios'
import { Watch } from 'vue-property-decorator';
import { Debounce } from 'typescript-debounce';
const validator = require('validator');
const flatPickr = require('vue-flatpickr-component');

@Component({
    props:  {
        disabledDates: String,
        times: String,
        isLabel: Boolean,
        label: String,
        defaultDate: String,
    },
    components: {
        flatPickr
    }
})
export default class DatePicker extends Vue {
    validated: boolean = false;
    selectedDate: string = '';
    get config(): IDateConfig {
        return {
            dateFormat: 'D m/d/Y',
            minDate: 'today',
            maxDate: moment().add(1, 'month').format('ddd MM/DD/YYYY'),
            disable: (this.$props.disabledDates) ? JSON.parse(this.$props.disabledDates) : '',
            onChange: (selectedDate: any, dateStr: string, instance: any) => {
                this.setSelectedDate(dateStr);
            }
        };
    }
    // Lifecycle hooks
    created() {
        this.$root.$on('check-times', this.forceCheckTime);
    }
    mounted() {

    }
    updated() {
    }
    destroyed() {
        this.$root.$off('check-times', this.forceCheckTime);

    }
    @Watch('selectedDate')
    private onChangedName() {
        this.$root.$emit('is-thinking');
        this.validateDate();
    }
    @Debounce({millisecondsDelay: 1000})
    private validateDate() {
        const date = validator.trim(this.selectedDate);
        this.validated = (!validator.isEmpty(date));
        this.thinking(this.validated);
    }

    private thinking(state: boolean)
    {
        if (state) {
            this.$root.$emit('passed-thinking');
            this.$root.$emit('validate-date', true);
        } else {
            this.$root.$emit('failed-thinking');
            this.$root.$emit('validate-date', false);
        }
    }

    private forceCheckTime() {
        if (this.selectedDate === undefined || !this.selectedDate) {
            return;
        }
        this.setSelectedDate(this.selectedDate);
    }

    private setSelectedDate(date: string) {
        this.$root.$emit('set-reservation-date', date);
        // get the price subtotal with all options selected
        axios.post('/rules/get-times',{
            date,
            party_size: this.getPartySize()
        }).then(response => {

            if (response.data) {
                this.$root.$emit('update-times', response.data);
            }

        }).catch(e => {

        });
    }

    private getPartySize(): string {
        const party_size_element = document.querySelector<HTMLSelectElement>('#party-size');
        const selected_index = (party_size_element as HTMLSelectElement).selectedIndex;
        const party_size_selected_option = (party_size_element as HTMLSelectElement).options[selected_index];
        return party_size_selected_option.value;
    }

}
