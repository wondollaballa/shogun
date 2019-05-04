import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
    props: {
        alert: String,
        timer: String
    }
})
export default class Alert extends Vue{
    alert: string = this.alert;
    timer: string = this.timer;
    // computed
    public get message(): string {
        return (JSON.parse(this.alert)) ? JSON.parse(this.alert).message : "";
    }
    public get typeClass(): string {
        return (JSON.parse(this.alert)) ? JSON.parse(this.alert).type : "alert-none";
    }

    public get timerNumber(): number {
        return (this.timer) ? parseInt(this.timer) : 0;
    }

    // Lifecycle hooks
    created() {
        this.$root.$on('toast', this.openAlert);
    }
    mounted() {
        this.countDownRemove();
    }
    updated() {
    }
    destroyed() {
        this.$root.$off('toast', this.openAlert);
    }
    private countDownRemove() {
        if (this.timer && this.timerNumber > 0) {
            setTimeout(() => {
                this.removeAlert();
            }, this.timerNumber);
        }
    }
    private openAlert(msg: string, type: string) {

        if (!msg || !type) return;
        const alert = (document.querySelector('.alert') as HTMLElement);
        alert.classList.remove('alert-none');
        let toastType = 'alert-none';
        switch (type) {
            case 'info':
            toastType = 'alert-info';
            break;
            case 'secondary':
            toastType = 'alert-secondary';
            break;
            case 'success':
            toastType = 'alert-success';
            break;
            case 'warning':
            toastType = 'alert-warning';
            break;
            case 'danger':
            toastType = 'alert-danger';
            break;
            case 'primary':
            toastType = 'alert-primary';
            break;
        }
        (alert.querySelector('article') as HTMLElement).innerHTML = msg;
        alert.classList.add(toastType);
        this.countDownRemove();
    }
    private removeAlert() {
        const alert = (document.querySelector('.alert') as HTMLElement);
        alert.classList.remove(
            'alert-success',
            'alert-info',
            'alert-secondary',
            'alert-warning',
            'alert-danger',
            'alert-primary');
        alert.classList.add('alert-none');
    }

}
