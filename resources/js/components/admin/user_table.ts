import Vue from 'vue'
import Component from 'vue-class-component'
import { AgGridVue } from 'ag-grid-vue';
import axios from 'axios'
import { IUsers } from '../../interfaces/interfaces';


@Component({
    components: {
        AgGridVue
    },
    props: {
        rows: String
    }

})
export default class UserTable extends Vue {
    public get rowData(): IUsers {
        const rows = (this.$props.rows) ? JSON.parse(this.$props.rows) : [];

        return rows;
    }
    public get columnDefs(): any {
        return [
            {
                headerName: 'Username',
                field: 'username',
                sortable: true,
                filter: true
            },
            {
                headerName: 'First Name',
                field: 'first_name',
                sortable: true,
                filter: true
            },
            {
                headerName: 'Last Name',
                field: 'last_name',
                sortable: true,
                filter: true
            },
            {
                headerName: 'Phone',
                field: 'phoneFormatted',
                sortable: true,
                filter: true
            },
            {
                headerName: 'Email',
                field: 'email',
                sortable: true,
                filter: true
            },
            {
                headerName: 'Role',
                field: 'role',
                sortable: true,
                filter: true
            }
        ];
    }

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
    onRowClicked($event: any) {
        const rowIndex: number = $event.rowIndex;
        const selectedData = ((this.rowData as any)[rowIndex] as IUsers);
        this.$root.$emit('open-user-modal', selectedData);
    }

}
