import Vue from 'vue'
import Component from 'vue-class-component'
interface ILoginForm {
    validate: boolean;
    username: string,
    password: string,
    csrf: string | null
}
@Component({
    props: {
        action: String,
        method: String
    }
    
})
export default class LoginForm extends Vue implements ILoginForm {
    validate = false;
    username = '';
    password = '';
    csrf = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement).getAttribute('content');
    
    // computed
    public get usernameIsNotValid(): boolean {
        return (this.username.length < 5 && this.validate) ?  true : false;
    }
    public get passwordIsNotValid(): boolean {
        return (this.password.length < 5 && this.validate) ?  true : false;
    }
    public get usernameErrorMessage() {
        let message: string = "";
        if (this.validate && this.usernameIsNotValid && this.username.length == 0) {
            message = "username is required";
        } else if (this.validate && this.usernameIsNotValid) {
            message = "username is invalid"
        }
        return message;
    }
    public get passwordErrorMessage() {
        let message: string = "";
        if (this.validate && this.passwordIsNotValid && this.password.length == 0) {
            message = "password is required";
        } else if (this.validate && this.passwordIsNotValid) {
            message = "password is invalid"
        }
        return message;
    }

    // Lifecycle hooks
    created() {
        console.log('created')
    }
    mounted() {
        document.addEventListener('keyup', event => {
            if (event.keyCode === 13) { 
              this.formValidate();
            }
        });
    }
    updated() {
        console.log('updated')
    }
    destroyed() {
        console.log('destroyed')
    }

    // methods

    private formValidate(): void {
        this.validate = true;
        if (this.usernameIsNotValid || this.passwordIsNotValid) {
            return;
        }
        // submit form
        const formElement = document.querySelector("#admin-signin-form") as HTMLFormElement;
        formElement.submit();
    }
}