import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
    props: {
        chart: Boolean,
        header: Boolean,
        footer: Boolean
    }
})
export default class Card extends Vue{
    // computed
    // public get styleType(): string {
    //     return (JSON.parse(this.alert)) ? JSON.parse(this.alert).message : "";
    // }

    // Lifecycle hooks
    created() {
    }
    mounted() {
        const month = this.$el.querySelector('#month') as HTMLButtonElement | null;
        const week = this.$el.querySelector('#week') as HTMLButtonElement | null;
        const day = this.$el.querySelector('#day') as HTMLButtonElement | null;

        this.openMonth(month);
        this.openWeek(week);
        this.openDay(day);
    }
    updated() {
    }
    destroyed() {
    }

    //dashboard cards
    private openMonth(month: HTMLButtonElement | null): void {
        if (month) {
            month.onclick = () => {
                console.log('clicked month');
                this.$root.$emit("set-month", month);
            }
        }
    }
    private openWeek(week: HTMLButtonElement | null): void {
        if (week) {
            week.onclick = () => {
                console.log('clicked week');
                this.$root.$emit("set-week", week);
            }
        }
    }
    private openDay(day: HTMLButtonElement | null): void {
        if (day) {
            day.onclick = () => {
                console.log('clicked day');
                this.$root.$emit("set-day", day);
            }
        }
    }
}


