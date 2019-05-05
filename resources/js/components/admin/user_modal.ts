import Vue from 'vue'
import Component from 'vue-class-component'
import { IUsers } from '../../interfaces/interfaces';
import axios from 'axios'
import { Watch } from 'vue-property-decorator';
import { Debounce } from 'typescript-debounce';
import { AsYouType } from 'libphonenumber-js';
const validator = require('validator');
@Component({
    props: {
        hasBackground: Boolean,
        title: String
    }
})
export default class UserModal extends Vue {
    opened: boolean = false;
    user: IUsers = {
        id: 0,
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        role_id: 0,
        username: '',
        password: ''
    };
    confirm: string = '';
    validation = {
        username: true,
        first_name: true,
        last_name: true,
        phone: true,
        email: true,
        password: true,
        password_label: ''
    }
    // Lifecycle hooks
    created() {
        this.$root.$on('open-user-modal', this.openDialog);
    }
    mounted() {

    }
    updated() {
    }
    destroyed() {
        this.$root.$off('open-user-modal', this.openDialog);

    }

    private openDialog(user: IUsers) {
        this.user = user;
        this.opened = true;

    }

    private closeDialog() {
        this.opened = false;
        this.resetForm();
    }

    private resetForm() {
        this.confirm = '';
        this.user = {
            id: 0,
            first_name: '',
            last_name: '',
            phone: '',
            email: '',
            role_id: 0,
            username: '',
            password: ''
        };
        this.validation = {
            username: true,
            first_name: true,
            last_name: true,
            phone: true,
            email: true,
            password: true,
            password_label: ''
        }
    }

    @Watch('user.username')
    private onChangedUsername() {
        this.validateUsername();
    }
    @Watch('user.first_name')
    private onChangedFirstName() {
        this.validateFirstName();
    }
    @Watch('user.last_name')
    private onChangedLastName() {
        this.validateLastName();
    }
    @Watch('user.phone')
    private onChangedPhone() {
        this.validatePhone();
    }
    @Watch('user.email')
    private onChangedEmail() {
        this.validateEmail();
    }
    @Watch('user.password')
    private onChangedPassword() {
        this.validation.password = true;
    }
    @Watch('confirm')
    private onChangedConfirm() {
        this.validatePassword();
    }

    @Debounce({millisecondsDelay: 1000})
    private validateUsername() {
        const n = this.user.username.replace(' ', '');;
        this.validation.username = (validator.isAlphanumeric(n) && !validator.isEmpty(n));
        this.user.username = validator.trim(this.user.username);
    }
    @Debounce({millisecondsDelay: 1000})
    private validateFirstName() {
        const n = this.user.first_name.replace(' ', '');;
        this.validation.first_name = (validator.isAlphanumeric(n) && !validator.isEmpty(n));
        this.user.first_name = validator.trim(this.user.first_name);
    }
    @Debounce({millisecondsDelay: 1000})
    private validateLastName() {
        const n = this.user.last_name.replace(' ', '');;
        this.validation.last_name = (validator.isAlphanumeric(n) && !validator.isEmpty(n));
        this.user.last_name = validator.trim(this.user.last_name);
    }

    @Debounce({millisecondsDelay: 1000})
    private validatePhone() {
        const phone: any = new AsYouType('US').input(this.user.phone);
        this.user.phone = validator.trim(phone);
        const base = phone.replace(/\D/g,'');
        this.validation.phone = (!validator.isEmpty(base) && validator.isAlphanumeric(base) && base.length === 10);
    }
    @Debounce({millisecondsDelay: 1000})
    private validateEmail() {
        const email = validator.trim(this.user.email);
        this.validation.email = (!validator.isEmpty(email) && validator.isEmail(email));
    }

    @Debounce({millisecondsDelay: 1000})
    private validatePassword() {
        const pconfirm = ((this.user.password as string) === '' || this.user.password === undefined);
        const cconfirm = ((this.confirm as string) === '' || this.confirm === undefined);
        if (pconfirm && cconfirm) {
            this.validation.password = true;
            return;
        }
        const pw = validator.trim(this.user.password);
        const confirm = validator.trim(this.confirm);

        this.validation.password = (pw === confirm && pw.length > 4) ? true : false;
        this.validation.password_label=(!this.validation.password) ? 'Passwords do not match. please try again' : '';

    }

    private validateAndSave() {
        this.validatePassword();
        if (!this.validation.password) {
            return;
        }
        // validated you may update
        const id: number = this.user.id;
        axios.patch('/users/'+id,{
            'user': this.user
        }).then(response => {
            if (response.status) {
                this.closeDialog();
                // toast
                const msg = 'You have successfully updated your user.';
                const type = 'success';

                this.$root.$emit('toast', msg, type);
            }
        }).catch(e => {
            const msg = 'There was an error saving your user.';
            const type = 'error';

            this.$root.$emit('toast', msg, type);
        });
    }

}
