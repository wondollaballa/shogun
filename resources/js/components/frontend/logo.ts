import Vue from 'vue'
import Component from 'vue-class-component'
import axios from 'axios'
import * as moment from 'moment';
import { IReservationForm, IErrors, IReservation, INewReservation } from '../../interfaces/interfaces';
import { Debounce } from 'typescript-debounce';
import { Watch } from 'vue-property-decorator';
import { AsYouType } from 'libphonenumber-js'

@Component({
    props: {
  
    }
    
})
export default class Logo extends Vue {
    thinking: boolean = false;
    failed: boolean = false;
    passed: boolean = false;

    // Lifecycle hooks
    created() {
        this.$root.$on('is-thinking', this.isThinking);
        this.$root.$on('not-thinking', this.notThinking);
        this.$root.$on('failed-thinking', this.failedThinking);
        this.$root.$on('passed-thinking', this.passedThinking);
    }
    mounted() {
    }
    updated() {
    }
    destroyed() {
        this.$root.$off('is-thinking', this.isThinking);
        this.$root.$off('not-thinking', this.notThinking);
        this.$root.$off('failed-thinking', this.failedThinking);
        this.$root.$off('passed-thinking', this.passedThinking);
    }

    private isThinking(): void {
        if (this.thinking) return;
        this.passed = false;
        this.failed = false;
        this.thinking = true;
    }

    private notThinking(): void {
        this.passed = false;
        this.failed = false;
        this.thinking = false;
    }
    private passedThinking(): void {
        if (this.thinking) {
            this.notThinking();
        }
        
        this.passed = true;

        setTimeout(() => {
            this.notThinking();
        }, 500);
    }
    private failedThinking(): void {
        if (this.thinking) {
            this.notThinking();
        }

        this.failed = true;

        setTimeout(() => {
            this.notThinking();
        }, 500);
        
    }
}