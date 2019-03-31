import Vue from 'vue'
import Component from 'vue-class-component'
import { AgGridVue } from 'ag-grid-vue';
import { moment } from 'fullcalendar';
import axios from 'axios'

interface IBlackoutDate {
    [date: string] : string
}
interface ISet {
    [key: number]: string
}
interface IAgGridVue {
    row: IBlackoutDate[],
    blackout_dates: ISet
}
@Component({
    components: {
        AgGridVue
    },
    props: {
        dates: String
    }
    
})
export default class GridVue extends Vue implements IAgGridVue {
    row: IBlackoutDate[] = [];
    blackout_dates: ISet = {};
    dates: string = this.dates;
    public get columnDefs(): any {
        return [
            {
                headerName: 'Date', 
                field: 'date', 
                sortable: true,
                filter: true
            }
        ];
    }

    public get rowData(): any {
        return this.row;
    }

    created() {
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        this.$root.$on('post-blackout-date', this.postBlackoutDate);
        this.$root.$on('reset-blackout-dates', this.resetDates);
        this.$root.$on('date-selected', this.updateDate);
        this.$root.$on('deleted-blackout-rows', this.deleteRows);
        this.$root.$on('blackout-set', this.getBlackoutSet);
        this.$root.$on('blackout-dates', this.getBlackoutDate);
        
    }
    beforeMounted() {
        
    }
    mounted() {
    }
    updated() {
        // send data to blackout dates

    }
    destroyed() {
        console.log('destroyed')
        this.$root.$off('blackout_dates', this.getBlackoutDate);
        this.$root.$off('post-blackout-date', this.postBlackoutDate);
        this.$root.$off('reset-blackout-dates', this.resetDates);
        this.$root.$off('date-selected', this.updateDate);
        this.$root.$off('deleted-blackout-rows', this.deleteRows);
    
    }

    private getBlackoutDate(bdates: any): void {
        this.row = bdates;
    }

    private getBlackoutSet(bset: ISet) {
        this.blackout_dates = bset;
    }
    private notBeforeToday() {
        let idx = -1;
        for(let k in this.row) {
            idx++;
            const compareDate = moment(this.row[k].date);
            const test = (moment().diff(compareDate, 'days'));
            if (test > 0) {
                this.row.splice(idx, 1);
            }
        }
    }
    private updateBlackoutSetFromRows() {
        this.notBeforeToday();
        this.blackout_dates = {};
        for( let k in this.row) {
            const value = this.row[k].date;
            const timestamp = moment(value).unix();
            this.blackout_dates[timestamp] = value;
        }
    }

    private updateDate(selected_date: string): void {
        const moment_date = moment(selected_date);
        if (moment_date.isValid) {
            const formatted_date = moment_date.format('LL');
            const timestamp = moment_date.unix();
            if (!this.validate(timestamp, formatted_date)) {
                alert('date has already been selected');
                return;
            }
            this.makeRows();
            
        } else {
            alert('Not a valid date. Please select again.');
        }

    }

    private validate(timestamp: number, date: string): boolean {
        if (timestamp in this.blackout_dates) {
            return false;
        }
        this.blackout_dates[timestamp] = date;
        this.blackout_dates = this.sortObject();
        return true;
    }

    private sortObject(): any {
        return Object.keys(this.blackout_dates).sort().reduce((result: any, key: any) => {
            result[key] = this.blackout_dates[key];
            return result;
        }, {});
    }

    private makeRows(): void {
        this.row = [];
        if (this.blackout_dates) {
            for (let key in this.blackout_dates) {
                const value = this.blackout_dates[key];
                this.row.push({ date: value });
            }
        }
        this.notBeforeToday();
    }

    private onSelectionChanged() {
        const selectedRows = document.querySelectorAll<HTMLElement>('.ag-center-cols-viewport .ag-row-selected');
        console.log(selectedRows.length);
        const cancelButton = document.querySelector<HTMLButtonElement>('#blackout-cancel');
        if (selectedRows.length > 0) {
            (cancelButton as HTMLButtonElement).removeAttribute('disabled');
            
        } else {
            (cancelButton as HTMLButtonElement).setAttribute('disabled','true');
        }
    }

    private resetDates(oldDates: IBlackoutDate[]) {
        this.row = oldDates;
        this.updateBlackoutSetFromRows();
        const remove = document.querySelector<HTMLButtonElement>('#blackout-cancel');

        (remove as HTMLButtonElement).setAttribute('disabled','disabled');
    }

    private deleteRows(event: any) {
        if (event.length > 0) {
            // remove
            const newRows = this.row.filter((rowCompare: IBlackoutDate) => {
                const row = rowCompare.date as string;
                let check: boolean = true;
                event.forEach((itemString: string) => {
                    const item = itemString as string;
                    if(row === item) {
                        check = false;
                        
                    }
                });
                if (check) {
                    return rowCompare;
                }
            });
            this.row = newRows;

            // update form data
            for( let k in this.blackout_dates) {
                event.forEach((itemString: string) => {
                    const item = itemString as string;
                    if(this.blackout_dates[k] === item) {
                        delete this.blackout_dates[k];
                    }
                });
            }
        }
    }

    private postBlackoutDate() {
        // get the price subtotal with all options selected
        axios.post('/rules/blackout',{
            'blackout_dates': this.row

        }).then(response => {
            const msg = 'You have successfully updated your blackout dates.';
            const type = 'success';
            this.$root.$emit('toast', msg, type);
        }).catch(e => {
            const msg = 'There was an error with your request to the server. Check with your administrator for further assistance.';
            const type = 'danger';
            this.$root.$emit('toast', msg, type);
        });
    }
}