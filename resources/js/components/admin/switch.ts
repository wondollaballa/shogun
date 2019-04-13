import Vue from 'vue'
import Component from 'vue-class-component'


@Component({

    props: {
    }
    
})
export default class AdminSwitch extends Vue {
    state: boolean = false;

    created() {

        
    }
    beforeMounted() {
        
    }
    mounted() {
    }
    updated() {
        // send data to blackout dates

    }
    destroyed() {

    }

    private changeState(): void {
        this.state = (!this.state) ? true : false;
        this.$root.$emit('make-calendar-editable', this.state);
    }
}