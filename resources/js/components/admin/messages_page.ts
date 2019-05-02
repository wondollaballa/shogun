import Vue from 'vue'
import Component from 'vue-class-component'
import { IMessagesRaw } from '../../interfaces/interfaces';
import axios from 'axios'

@Component({
    props: {
        messagesNew: String,
        messagesViewed: String,
        messagesReplied: String
    }
})
export default class MessagesPage extends Vue {
    messageNew: IMessagesRaw[] | null = [];
    messageViewed: IMessagesRaw[] | null = [];
    messageReplied: IMessagesRaw[] | null = [];

    // Lifecycle hooks
    created() {
    }
    mounted() {
        this.messageNew = (this.$props.messagesNew) ? JSON.parse(this.$props.messagesNew) : [];
        this.messageViewed = (this.$props.messagesViewed) ? JSON.parse(this.$props.messagesViewed) : [];
        this.messageReplied = (this.$props.messagesReplied) ? JSON.parse(this.$props.messagesReplied) : [];
        this.handleEvents();
    }
    updated() {
    }
    destroyed() {
    }

    private updateStatus(id: number, status: number) {
        // get the price subtotal with all options selected
        axios.patch('/messages/update/'+id,{
            'status': status,
        }).then(response => {
            if (response.status) {
                const msg = 'Successfully updated message status';
                const type = 'success';
                this.$root.$emit('toast', msg, type);
                // update data
                this.messageNew = response.data.new ? JSON.parse(response.data.new) : [];
                this.messageViewed = response.data.viewed ? JSON.parse(response.data.viewed) : [];
                this.messageReplied = response.data.replied ? JSON.parse(response.data.replied) : [];

            }

        }).catch(e => {
            const response = e.response.data;
            // validation errors go here
            const msg = e.response.headers.status === '422' ? response.message : 'There was an error with your request to the server. Check with your administrator for further assistance.';
            const type = 'danger';
            this.$root.$emit('toast', msg, type);
        });
    }

    private handleEvents() {
        const messagesEvent = "MessageEvent";
        (window as any).Echo.channel('message-event').listen(messagesEvent, (e: any) => {
            this.messageNew = e.data;
        });
    }

}


