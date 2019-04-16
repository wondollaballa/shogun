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
  
    }
    
})
export default class ReservationForm extends Vue {
    step: number = 1;
    // Lifecycle hooks
    created() {
    }
    mounted() {
    }
    updated() {
    }
    destroyed() {
    }

    private proceedStep()
    {
        
        this.step = 2;
    }

    private preceedStep()
    {
        this.step = 1;
    }

    private finishReservation()
    {

    }
}