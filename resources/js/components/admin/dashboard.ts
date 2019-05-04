///<reference path="../../types/worker.d.ts"/>
import Vue from 'vue'
import Component from 'vue-class-component'
import Worker from 'worker-loader!../../workers/dashboard/worker';
import { MessageType, Message, IWorkerStart, IWorkerRestart, IWorkerPause, IReservation } from '../../interfaces/interfaces';
import axios from 'axios'
import window from '../../bootstrap';

@Component({
    props: {

    }
})
export default class Dashboard extends Vue {
    worker: Worker = new Worker();
    editable: boolean = false;
    // Lifecycle hooks
    created() {
        this.$root.$on('worker-ticker-pause', this.pauseWorker)
        this.$root.$on('worker-ticker-restart', this.restartWorker)
        this.$root.$on('make-calendar-editable', this.updateEditable);
        this.worker.addEventListener("message", (event: any) => {
            const message: Message = event.data;
            this.handleOnMessage(message);
        });
    }
    mounted() {
        this.startWorker();
    }
    updated() {
    }
    destroyed() {
        this.disposeWorker();
        this.$root.$off('worker-ticker-pause', this.pauseWorker);
        this.$root.$off('worker-ticker-restart', this.restartWorker);
        this.$root.$off('make-calendar-editable', this.updateEditable);
    }
    //#region worker-setup
    private startWorker() {
        const message: IWorkerStart = {
            type: MessageType.Start
        }
        this.worker.postMessage(message);
    }
    private pauseWorker() {
        const message: IWorkerPause = {
            type: MessageType.Pause
        }
        this.worker.postMessage(message);
    }

    private restartWorker() {
        const message: IWorkerRestart = {
            type: MessageType.Restart
        }
        this.worker.postMessage(message);
    }
    private disposeWorker() {
        this.worker.terminate();
        delete this.worker;
    };
    private handleOnMessage(message: Message) {
        switch (message.type) {
            case MessageType.Expired:
                this.makeExpired(message.datetime);
                return;
            break;

            case MessageType.Test:
                return;
            break;
        }
    }
    //#endregion worker-setup

    //#region worker-job
    private makeExpired(requested: string) {

        axios.post('/reservations/expired',{
            requested,
            editable: this.editable
        }).then(response => {
            const message: IWorkerRestart = {
                type: MessageType.Restart
            }
            this.worker.postMessage(message);

        }).catch(e => {
            const response = e.response.data;
            const message: IWorkerStart = {
                type: MessageType.Start
            }
            this.worker.postMessage(message);
        });
    }

    //#endregion worker-job

    private updateEditable(state: boolean) {
        this.editable = state;
    }

}


