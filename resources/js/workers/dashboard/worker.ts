import { Message, MessageType, IExpiredReservations } from "../../interfaces/interfaces";
import * as moment from 'moment';
import { TaskTimer } from 'tasktimer';
const ctx: Worker = self as any;
 // Respond to message from parent thread
ctx.addEventListener("message", (event: any) => {
    processMessage(event.data);
});
class DashboardPageWorker {
    timer: any; 
    constructor() {
        this.timer = new TaskTimer(1000);
    }

    //#region ticker
    public startTicker() {
        
        // You can also execute some code on each tick... (every 1000 ms)
        this.timer.on('tick', () => {
            const timeToCheck = this.checkSeconds();
            if (timeToCheck) {
                this.updateReservation();
            }
        } );
         
        // Start the timer
        this.timer.start();

    }


    public restartTimer() {
        this.timer.start();
    }

    public stopTimer() {
        this.timer.stop();
    }

    private updateReservation() {
        this.stopTimer();
        // get the price subtotal with all options selected
        const requested = moment().format('YYYY-MM-DD HH:mm:ss');
        const message: IExpiredReservations = {
            type: MessageType.Expired,
            datetime: requested
        }
        ctx.postMessage(message);

    }

    private checkSeconds(): boolean {
        const time = moment().format('ss');
        return (time === "00");
    }

   
    //#endregion ticker
}
const dashboard = new DashboardPageWorker();
function processMessage(event: Message): void {
    switch(event.type) {
        case MessageType.Start:
            dashboard.startTicker();
            return;
        break;

        case MessageType.Restart:
            dashboard.restartTimer();
            return;
        break;

        case MessageType.Pause:
            dashboard.stopTimer();
            return;

        case MessageType.Test:
            return;
        break;

        case MessageType.UpdateCalendar:
            return;
        break;
        default:
            console.log('failed');
            return;
        break;
    }
}