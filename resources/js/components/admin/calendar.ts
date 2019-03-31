import Vue from 'vue'
import Component from 'vue-class-component'
import * as $ from 'jquery';
import 'fullcalendar';
import * as moment from 'moment';
import axios from 'axios'
import window from '../../bootstrap';
import { Debounce } from 'typescript-debounce'

interface IEvent {
    id?: string,
    title: string,
    start: string,
    end?: string | null,
    allDay?: boolean,
    url?: string,
    classNames?: string[],
    editable?: boolean | null,
    startEditable?: boolean | null,
    durationEditable?: boolean | null,
    resourceEditable?: boolean | null,
    rendering?: string, // normal, background, inverse-background
    overlap?: string | boolean,
    constraint?: string,
    backgroundColor?: string,
    borderColor?: string,
    textColor?: string,
    extendedProps?: string,
    source?: string
}

interface IEvents {
    'daily': IEvent[];
}

@Component({
    props: {
        storeHours: String,
        timeInterval: String,
        timeLabel: String,
        events: String
    }
})
export default class Calendar extends Vue  {
    // @Prop({ type: String, default : '' })
    // storeHours: string = '';
    // @Prop({ type: String, default: '' })
    // timeInterval: string = '';
    // @Prop({ type: String, default: '' })
    // timeLabel: string = '';
    // @Prop({ type: String, default: '' })
    // events: string = '';

    calendar: JQuery = $('#calendar')
    eventDay: any[] = [];
    
    public get businessHours(){
        return JSON.parse(this.$props.storeHours);
    }
    public get slotDuration() {
        return this.$props.timeInterval;
    }

    public get slotDurationLabel() {
        return this.$props.timeLabel;
    }

    // @Watch('eventDay')
    // onEventDayChanged() {
        
    // }
    // Lifecycle hooks
    created() {
        this.$root.$on("set-month", this.setMonth);
        this.$root.$on("set-week", this.setWeek);
        this.$root.$on("set-day", this.setDay);
       
    }
    mounted() {
        window.addEventListener('resize', this.resizeCalendar);
        const allEvents: IEvents = JSON.parse(this.$props.events);
        this.eventDay = ('daily' in allEvents) ? allEvents['daily'] : [];
        this.makeCalendar();
        this.messageReceived();
    }
    updated() {
        
    }
    destroyed() {
        this.$root.$off("set-month", this.setMonth);
        this.$root.$off("set-week", this.setWeek);
        this.$root.$off("set-day", this.setDay);
        window.removeEventListener('resize', this.resizeCalendar);
    }
    @Debounce({millisecondsDelay: 500})
    private resizeCalendar() {
        const contentHeight = (document.getElementById('calendar') as HTMLElement).clientHeight;
        const el: JQuery = $('#calendar');
        this.calendar = el;
        this.calendar.fullCalendar('option', {
            contentHeight
        });
    }

    private messageReceived() {
        if ('Echo' in window) {
            const resEvent = "ReservationEvent";
            (window as any).Echo.channel('reservation-event').listen(resEvent, (e: any) => {
                const allEvents: IEvents = JSON.parse(e.data);
                this.eventDay = ('daily' in allEvents) ? allEvents['daily'] : [];

                // this.calendar.fullCalendar('removeEvents');
                this.updateEvents();
                const msg = 'A new reservation has been made.';
                const type = 'success';
                this.$root.$emit('toast', msg, type);
            });
        }
    }

    private makeCalendar() {
        const el: JQuery = $('#calendar');
        this.calendar = el;
        const time = moment().format('HH:00:00');
        const contentHeight = (document.getElementById('calendar') as HTMLElement).clientHeight;
        this.calendar.fullCalendar({
            defaultView: 'agendaDay',
            nowIndicator: true,
            slotDuration: this.slotDuration,
            slotLabelInterval: this.slotDurationLabel,
            businessHours: this.businessHours,
            timezone: false,
            scrollTime: time,
            contentHeight,
            events: this.eventDay,
            eventClick: (e) => {
                const eventId: number = e.id as number;
                this.getEventById(eventId);
            }
        });
        
    }

    private setMonth(btn: HTMLButtonElement): void {
        this.removePrimary();
        const contentHeight = (document.getElementById('calendar') as HTMLElement).clientHeight;
        
        // set calendar view
        this.calendar.fullCalendar('changeView', 'month');
        this.calendar.fullCalendar('option', {
            businessHours: this.businessHours,
            contentHeight
        });
        // add primary to month
        btn.classList.add('pure-button-primary');
    }
    private setWeek(btn: HTMLButtonElement): void {
        this.removePrimary();
        const time = moment().format('HH:00:00');
        const contentHeight = (document.getElementById('calendar') as HTMLElement).clientHeight;

        // set calendar view
        this.calendar.fullCalendar('changeView', 'agendaWeek');
        this.calendar.fullCalendar('option', {
            nowIndicator: true,
            slotDuration: this.slotDuration,
            slotLabelInterval: this.slotDuration,
            businessHours: this.businessHours,
            scrollTime: time,
            timezone: false,
            contentHeight
        });
        // add primary to month
        btn.classList.add('pure-button-primary');
    }

    private updateEvents(): void {
        // this.calendar.fullCalendar('updateEvents', this.eventDay);
        this.calendar.fullCalendar('removeEvents');
        this.calendar.fullCalendar('addEventSource', this.eventDay);
        this.calendar.fullCalendar('rerenderEvents');
        

    }
    private setDay(btn: HTMLButtonElement): void {
        this.removePrimary();
        const time = moment().format('HH:00:00');
        const contentHeight = (document.getElementById('calendar') as HTMLElement).clientHeight;

        // set calendar view
        const today = new Date(Date.now()).toLocaleString();
        this.calendar.fullCalendar('changeView', 'agendaDay', today);
        this.calendar.fullCalendar('option', {
            nowIndicator: true,
            slotDuration: this.slotDuration,
            slotLabelInterval: this.slotDurationLabel,
            businessHours: this.businessHours,
            scrollTime: time,
            timezone: false,
            contentHeight
        });
        // add primary to month
        btn.classList.add('pure-button-primary');
    }

    private removePrimary(): void {
        const btns = document.querySelectorAll('.calendar-views');
        btns.forEach(btn => {
            btn.classList.remove('pure-button-primary');
        });
    }

    private getEventById(id: number) {
        axios.get('/reservations/event/'+id).then(response => {
            console.log(response);
            
        }).catch(e => {

        });
    }

}