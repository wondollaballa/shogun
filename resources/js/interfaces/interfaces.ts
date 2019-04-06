//#region worker
export enum MessageType {
    Start,
    Restart,
    UpdateCalendar,
    Test,
    Expired
}

export interface IExpiredReservations {
    type: MessageType.Expired,
    datetime: string
}

export interface IWorkerRestart {
    type: MessageType.Restart
}

export interface IUpdateCalendar {
    type: MessageType.UpdateCalendar,
    worker: string,

}

export interface IWorkerStart {
    type: MessageType.Start
}

export interface ITest {
    type: MessageType.Test,
    payload: string[]
}

export type Message = IWorkerStart | 
    IWorkerRestart | 
    IUpdateCalendar | 
    ITest | 
    IExpiredReservations;
//#endregion worker

//#region components
export interface IBlackoutDate {
    [date: string]: string
}

export interface IBlackoutDates {
    selectedDate: string,
    date1: string,
    dates: IBlackoutDate[],
    set: ISet[]
}

export interface IEvent {
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

export interface IEvents {
    'daily': IEvent[];
}

export interface ILeftbar {
    title: string;
    titleSrc: string;
    state: string;
    logoutSrc: string;
    reservationCount: number;
    totalReservationCount: number;
    messagesCount: number;
    animateNotificationCounts: boolean;
}

export interface INotificationsCount {
    today: number,
    all: number,
    messages: number
}

export interface ISet {
    [key: number]: string
}
//#endregion components