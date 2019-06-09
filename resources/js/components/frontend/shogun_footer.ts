import Vue from 'vue'
import Component from 'vue-class-component'
import * as moment from 'moment';
import { IStoreInfo } from '../../interfaces/interfaces';

@Component({
    props: {
        companyInfo: String,
        htmlContent: String
    }

})
export default class ShogunFooter extends Vue {
    content: string | null = null;
    get year(): string {
        return moment().year().toString();
    }


    get store(): IStoreInfo {
		const content = (this.$props.companyInfo) ? JSON.parse(this.$props.companyInfo) : {
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
    // Lifecycle hooks
    created() {
        this.$root.$on('apply-footer-data', this.applyData);
    }
    mounted() {
        this.setData();
    }
    updated() {
    }
    destroyed() {
        this.$root.$off('apply-footer-data', this.applyData);
    }

    private setData() {
        this.content = this.$props.htmlContent;
    }

    private applyData(content: string) {
        this.content = content;
    }

}
