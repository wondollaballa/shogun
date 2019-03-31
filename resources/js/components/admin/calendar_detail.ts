import Vue from 'vue'
import Component from 'vue-class-component'
import { AgGridVue } from "ag-grid-vue"


@Component({
    props: {
        columnDefs: Array,
        rowData: Array
    }
})
export default class CalendarDetail extends Vue{
    
    // Lifecycle hooks
    created() {
    }
    beforeMount() {

    }
    mounted() {
        this.makeCalendar();
        
    }
    updated() {
    }
    destroyed() {
    }

    private makeCalendar() {

    }
}