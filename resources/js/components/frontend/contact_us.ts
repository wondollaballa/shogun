import Vue from 'vue'
import Component from 'vue-class-component'
import { parsePhoneNumber } from 'libphonenumber-js'
import { IStoreInfo, IStoreHours } from '../../interfaces/interfaces';
import { Debounce } from 'typescript-debounce';
import { Watch } from 'vue-property-decorator';
import axios from 'axios'

const validator = require('validator');
interface IStoreHourTime {
	hh: string,
	mm: string,
	a: string
}


@Component({
	props: {
		text: String
	}

})
export default class ContactUs extends Vue {
    fullName: string = '';
    email: string = '';
    message: string = '';
    validation = {
        name: true,
        email: true,
        message: true
    }
	get store(): IStoreInfo {
		const content = (this.$props.text) ? JSON.parse(this.$props.text) : {
			phone: '',
			street: '',
			zipcode: '',
			city: '',
			state: '',
			country: '',
			email: '',
			store_hours: [
                {
                    opened: false,
                },
                {
                    opened: false,
                },
                {
                    opened: false,
                },
                {
                    opened: false,
                },
                {
                    opened: false,
                },
                {
                    opened: false,
                },
                {
                    opened: false,
                }
            ]
        };

		return {
            phone: content.phone,
            street: content.street,
            zipcode: content.zipcode,
            city: content.city,
            country: content.country,
            email: content.email,
            state: content.state,
            store_hours: content.store_hours
        };
	}

	get storeHoursString() {
		const sun = this.store.store_hours[0];
		const mon = this.store.store_hours[1];
		const tue = this.store.store_hours[2];
		const wed = this.store.store_hours[3];
		const thu = this.store.store_hours[4];
		const fri = this.store.store_hours[5];
		const sat = this.store.store_hours[6];
		const dayStart = (sun.opened) ? 'Sun' : (mon.opened) ? 'Mon' : (tue.opened) ? 'Tue' : (wed.opened) ? 'Wed' : (thu.opened) ? 'Thu' : (fri.opened) ? 'Fri' : 'Sat';
		let openCloseString = dayStart + ' - ';
		const openedDays = this.store.store_hours.filter((element: IStoreHours, key: number) => {
			const day = (key === 0) ? 'Sunday' : (key === 1) ? 'Monday' : (key === 2) ? 'Tuesday' : (key === 3) ? 'Wednesday' : (key === 4) ? 'Thursday' : (key === 5) ? 'Friday' : 'Saturday';
            element.day = day;
            return element;
		});

		if (this.store.store_hours.length === openedDays.length || openedDays.length == 6) {
			openCloseString += 'Sat';
		} else {

		}


		return this.store.store_hours;
	}

	// Lifecycle hooks
	created() {
	}
	mounted() {
        const phone = parsePhoneNumber(this.store.phone, 'US');
        this.store.phone = phone.formatNational();
	}
	updated() {
	}
	destroyed() {

    }

    @Watch('fullName')
    private onChangedName() {
        this.validation.name = true;
        this.validateForm();
    }
    @Watch('message')
    private onChangedMessage() {
        this.validation.message = true;
        this.validateForm();
    }
    @Watch('email')
    private onChangedEmail() {
        this.validation.email = true;
        this.validateForm();
    }
    @Debounce({millisecondsDelay: 1000})
    private validateForm() {

        const n = this.fullName.replace(' ', '');
        this.validation.name = (!validator.isEmpty(n));
        this.fullName = validator.trim(this.fullName);
        const e = this.email.replace(' ', '');
        this.validation.email = (!validator.isEmpty(e) && validator.isEmail(e));
        this.email = validator.trim(e);
        const m = this.message.replace(' ', '');
        this.validation.message = (!validator.isEmpty(m));
        this.message = validator.trim(this.message);
    }

    private submitMessage() {
        this.validateForm();
        if (!this.validation.name || !this.validation.email || !this.validation.message) {
            return;
        } else {
            axios.post('/messages/create',{
                'name': this.fullName,
                'message': this.message,
                'email': this.email,
            }).then(response => {
                if (response.status) {
                    console.log('success', response);
                }

            }).catch(e => {
                const response = e.response.data;

            });
        }
    }


}
