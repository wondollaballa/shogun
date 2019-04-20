//#region worker
export enum MessageType {
    Start,
    Pause,
    Restart,
    UpdateCalendar,
    Test,
    Expired
}

export interface IExpiredReservations {
    type: MessageType.Expired,
    datetime: string
}

export interface IWorkerPause {
    type: MessageType.Pause
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
    IWorkerPause | 
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

export interface INewReservation {
    name: string,
    phone: string,
    email: string,
    party_size: number,
    date: string,
    time: string,
    special_request: string,
    hibachi: boolean
}

export interface IReservation {
    id: number,
    customer_id: number,
    name: string,
    phone: string,
    email: string,
    large_party: number,
    party_size: number,
    requested: string,
    requested_formatted?: string,
    special_request: string,
    no_show: boolean,
    arrived_at: string,
    seated_at: string,
    seat_id: number,
    status: number,
    hibachi: boolean,
    deleted_at: string,
    created_at: string,
    updated_at: string
}

export interface IOldReservation {
    id: number,
    customer_id: number,
    name: string,
    phone: string,
    email: string,
    large_party: number,
    party_size: number,
    requested: string,
    requested_formatted?: string,
    special_request: string,
    no_show: boolean,
    arrived_at: string,
    seated_at: string,
    seat_id: number,
    status: number,
    hibachi: boolean,
    deleted_at: string,
    created_at: string,
    updated_at: string
}

export interface IReservationModal {
    reservation: IReservation,
    rules: IRules
}

export interface IRules {
    notAfter: string,
    disabledDays: string[],
    interval: number
}

export interface IErrors {
    name: string[],
    phone: string[],
    email: string[],
    party_size: string[],
    requested: string[],
    special_request: string[]
}
export interface IReservationForm {
    notAfter: string,
    blackouts: string,
    interval: number,
    name: string,
    nameValidated: boolean,
    nameErrorMessage: string,
    phone: string,
    phoneValidated: boolean,
    phoneErrorMessage: string,
    email: string,
    emailValidated: boolean,
    emailErrorMessage: string,
    partySize: number,
    partySizeValidated: boolean,
    partySizeErrorMessage: string,
    requested: string,
    requestedValidated: boolean,
    requestedErrorMessage: string,
    specialRequest: string,
    specialRequestValidated: boolean,
    specialRequestErrorMessage: string,
    showValidation: boolean
}

export interface ISet {
    [key: number]: string
}
//#endregion components

//#region thirdparty
export interface IDateConfig {
    altFormat?: string;
    altInput?: boolean;
    altInputClass?: string;
    appendTo?: HTMLElement,
    ariaDateFormat?: String;
    dateFormat?: string;
    disable?: string[];
    disableMobile?: boolean;
    clickOpens?: boolean;
    defaultDate?: string;
    defaultHour?: number;
    defaultMinute?: number;
    enable?: string[];
    enableTime?: boolean;
    enableSeconds?: boolean;
    formatDate?: any;
    hourIncrement?: number;
    inline?: boolean;
    locale?: string;
    maxDate?: string | Date;
    minDate?: string | Date;
    minuteIncrement?: number;
    mode?: string;
    nextArrow?: string;
    noCalendar?: boolean;
    onChange?: any;
    onOpen?: any;
    onReady?: any;
    parseDate?: any;
    position?: string;
    prevArray?: string;
    shorthandCurrentMonth?: boolean;
    static?: boolean;
    time_24hr?: boolean;
    weekNumbers?: boolean;
    wrap?: boolean;
    
}
//#endregion