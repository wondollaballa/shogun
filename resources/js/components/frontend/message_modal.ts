import Vue from 'vue'
import axios from 'axios'
import Component from 'vue-class-component'

@Component({
    props: {
        title: String
    }
})
export default class MessageModal extends Vue {
    icon: string = '';
    message: string = '';
    opened: boolean = false;
    // Lifecycle hooks
    created() {
        this.$root.$on('open-message-modal', this.openMessageModal);
    }
    mounted() {

    }
    updated() {
    }
    destroyed() {
        this.$root.$off('open-message-modal', this.openMessageModal);

    }

    private openMessageModal(status: boolean, data: any) {
        this.opened = true;
        if (status) {
            this.icon = 'success';
            this.message = data.success;
        } else {
            this.icon = 'failed';
            this.message = "There was an internal error with saving your message. Please try again.";
        }


    }

    private closeModal() {
        this.opened = false;
        if (this.icon == 'success') {
            this.reset();
        }
    }

    private reset() {
        this.icon = '';
        this.message = '';
        this.$root.$emit('reset-message-form');
    }


}
