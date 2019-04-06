///<reference path="../../types/worker.d.ts"/>
import Vue from 'vue'
import Component from 'vue-class-component'
import Worker from 'worker-loader!../../workers/dashboard/worker';
import { MessageType, Message, IWorkerStart, IWorkerRestart } from '../../interfaces/interfaces';
import axios from 'axios'
import window from '../../bootstrap';

@Component({
    props: {

    }
})
export default class Dashboard extends Vue {
    worker: Worker = new Worker();
    // Lifecycle hooks
    created() {
        this.worker.addEventListener("message", (event: any) => {
            console.log(event.data);
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
    }
    //#region worker-setup
    private startWorker() {
        const message: IWorkerStart = {
            type: MessageType.Start
        }
        this.worker.postMessage(message);
    }
    private disposeWorker() {
        alert('disposing worker');
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
            requested
        }).then(response => {
            const message: IWorkerRestart = {
                type: MessageType.Restart
            }
            this.worker.postMessage(message);
            
        }).catch(e => {
            const response = e.response.data;
            console.log(response);
            const message: IWorkerStart = {
                type: MessageType.Start
            }
            this.worker.postMessage(message);
        });
    }
    //#endregion worker-job
    
}


