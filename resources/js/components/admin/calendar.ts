import Vue from 'vue'
import Component from 'vue-class-component'
import * as $ from 'jquery';
import 'fullcalendar';
import * as moment from 'moment';
import axios from 'axios'
import window from '../../bootstrap';
import { Debounce } from 'typescript-debounce'
import { IEvents, IReservation } from '../../interfaces/interfaces'
import { diffDay } from 'fullcalendar';

@Component({
    props: {
        storeHours: String,
        timeInterval: String,
        timeLabel: String,
        events: String
    }
})
export default class Calendar extends Vue  {
    calendar: JQuery = $('#calendar')
    eventDay: any[] = [];
    eventMonth: any[] = [];
    editable: boolean = false;
    calendarDate: any = null;

    public get businessHours(){
        return JSON.parse(this.$props.storeHours);
    }
    public get slotDuration() {
        return this.$props.timeInterval;
    }

    public get slotDurationLabel() {
        return this.$props.timeLabel;
    }

    // Lifecycle hooks
    created() {
        this.$root.$on("set-month", this.setMonth);
        this.$root.$on("set-day", this.setDay);
        this.$root.$on('make-calendar-editable', this.makeEditableCalendar);
        this.$root.$on('make-daily-calendar', this.makeDailyCalendar);
    }
    mounted() {
        window.addEventListener('resize', this.resizeCalendar);
        const allEvents: IEvents = JSON.parse(this.$props.events);
        this.setEvents(allEvents);

        this.makeCalendar();
        this.messageReceived();
    }
    updated() {

    }
    destroyed() {
        this.$root.$off("set-month", this.setMonth);
        this.$root.$off("set-day", this.setDay);
        this.$root.$off('make-daily-calendar', this.makeDailyCalendar);
        this.$root.$off('make-calendar-editable', this.makeEditableCalendar);
        window.removeEventListener('resize', this.resizeCalendar);
    }

    private setEvents(events: any) {
        this.eventDay = ('daily' in events) ? events['daily'] : [];
        this.eventMonth = ('monthly' in events) ? events['monthly'] : [];
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

    private makeEditableCalendar(state: boolean) {
        this.editable = state;
        axios.post('/reservations/make-events-with-editable', {
            editable: this.editable
        }).then((response) => {
            const allDay = JSON.parse(response.data);
            this.setEvents(allDay);
            this.makeDailyCalendar(this.calendarDate);
        }).catch(e => {
        });

    }

    private messageReceived() {
        if ('Echo' in window) {
            const resEvent = "ReservationEvent";
            (window as any).Echo.channel('reservation-event').listen(resEvent, (e: any) => {
                const allEvents: IEvents = JSON.parse(e.data);
                if (allEvents) {
                    this.eventDay = ('daily' in allEvents) ? allEvents['daily'] : [];
                    this.updateEvents();
                    const msg = 'A new reservation has been made.';
                    const type = 'success';
                    this.$root.$emit('toast', msg, type);
                    // add animation for new reservation to the left sidebar notifications
                    this.$root.$emit('animate-reservation-notifications');
                }

            });
            const expiredEvent = "ExpiredEvent";
            (window as any).Echo.channel('expired-event').listen(expiredEvent, (e: any) => {
                const allEvents: IEvents = JSON.parse(e.data);
                if (allEvents) {
                    this.eventDay = ('daily' in allEvents) ? allEvents['daily'] : [];
                    this.updateEvents();
                }

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
            dayClick: (e) => {
                this.calendarDate = e;
            },
            viewRender: (e) => {
                const dateSelected = this.calendar.fullCalendar('getDate');
                this.calendarDate = dateSelected;
            },
            eventClick: (e) => {
                const eventId: number = e.id as number;
                this.getEventById(eventId);
            },
            eventDrop: (d) => {
                this.$root.$emit('worker-ticker-pause');
                const id = d.id;
                const requested: any = d.start;
                this.calendarDate = requested;
                axios.post('/reservations/update-time/'+id, {
                    requested: requested.format('YYYY-MM-DD HH:mm:ss')
                }).then((response: any) => {
                    const events = JSON.parse(response.data.calendar);
                    this.setEvents(events);
                    this.makeDailyCalendar(requested);
                    const msg = response.data.message;
                    const type = (response.data.status) ? 'success' : 'error';
                    this.$root.$emit('toast', msg, type);
                    this.$root.$emit('worker-ticker-restart');
                }).catch(e => {
                });
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
            contentHeight,
            displayEventTime: false,
            editable: false,
            eventClick: (e: any) => {
                this.calendarDate = e.start;
                this.makeDailyCalendar(e.start);
            }
        });
        this.updateMonthlyEvents();
        // stop worker ticker
        this.$root.$emit('worker-ticker-pause');
        // add primary to month
        btn.classList.add('pure-button-primary');
    }

    private updateEvents(): void {
        // this.calendar.fullCalendar('updateEvents', this.eventDay);
        this.calendar.fullCalendar('removeEvents');
        this.calendar.fullCalendar('addEventSource', this.eventDay);
        this.calendar.fullCalendar('rerenderEvents');
        this.calendar.fullCalendar({
            editable: this.editable,
            eventClick: (e) => {
                const eventId: number = e.id as number;
                this.getEventById(eventId);
            }
        });

    }

    private updateMonthlyEvents(): void {
        this.calendar.fullCalendar('removeEvents');
        this.calendar.fullCalendar('addEventSource', this.eventMonth);
        this.calendar.fullCalendar('rerenderEvents');
    }
    private setDay(btn: HTMLButtonElement): void {
        this.makeDailyCalendar(this.calendarDate);
        // add primary to month
        btn.classList.add('pure-button-primary');
    }

    private makeDailyCalendar(day?: any) {
        this.$root.$emit('worker-ticker-pause');

        const time = day ? day.format('HH:00:00') : moment().format('HH:00:00');
        const contentHeight = (document.getElementById('calendar') as HTMLElement).clientHeight;

        // set calendar view
        const selectedDate = day ? day.format('YYYY-MM-DD 00:00:00') : new Date(Date.now()).toLocaleString();

        this.calendar.fullCalendar('changeView', 'agendaDay', selectedDate);
        this.updateEvents();
        this.calendar.fullCalendar('option', {
            nowIndicator: true,
            slotDuration: this.slotDuration,
            slotLabelInterval: this.slotDurationLabel,
            businessHours: this.businessHours,
            scrollTime: time,
            timezone: false,
            contentHeight,
            eventClick: (e: any) => {
                const eventId: number = e.id as number;
                this.getEventById(eventId);
            }
        });

        // start worker ticker
        this.$root.$emit('worker-ticker-restart');
        // make sure that the primary button is selected
        this.removePrimary();
        this.setPrimary('day');
    }

    private removePrimary(): void {
        const btns = document.querySelectorAll('.calendar-views');
        btns.forEach(btn => {
            btn.classList.remove('pure-button-primary');
        });
    }

    private setPrimary(type: string) {
        const todayBtn = document.querySelector<HTMLButtonElement>('#card-reservation #day');
        const monthBtn = document.querySelector<HTMLButtonElement>('#card-reservation #month');
        (todayBtn as HTMLButtonElement).classList.remove('pure-button-primary');
        (monthBtn as HTMLButtonElement).classList.remove('pure-button-primary');
        if (type === "day") {
            (todayBtn as HTMLButtonElement).classList.add('pure-button-primary');
        } else {
            (monthBtn as HTMLButtonElement).classList.add('pure-button-primary');
        }
    }

    private getEventById(id: number) {
        axios.get('/reservations/get-event/'+id).then((response) => {
            const res = (response.data as IReservation)
            this.$root.$emit('open-modal','#reservation-details', res);
        }).catch(e => {

        });
    }

}
