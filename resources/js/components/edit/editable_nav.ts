import Vue from 'vue'
import Component from 'vue-class-component'
import axios from 'axios'

interface ISectionData {
    image?: string,
    imageRotate?: string,
    html?: string,
}

@Component({
    props: {
    },
})
export default class EditableNav extends Vue {
    headerData: ISectionData = {};
    aboutusData: ISectionData = {};
    theexperienceData: ISectionData = {};
    footerData: ISectionData = {};
    changes: number = 0;

    // Lifecycle hooks
    created() {
        this.$root.$on('editable-nav-header', this.updateHeader);
        this.$root.$on('editable-nav-aboutus', this.updateAboutus);
        this.$root.$on('editable-nav-theexperience', this.updateTheexperience);
        this.$root.$on('editable-nav-footer', this.updateFooter);
    }
    mounted() {

    }
    updated() {
    }
    destroyed() {
        this.$root.$off('editable-nav-header', this.updateHeader);
        this.$root.$off('editable-nav-aboutus', this.updateAboutus);
        this.$root.$off('editable-nav-theexperience', this.updateTheexperience);
        this.$root.$off('editable-nav-footer', this.updateFooter);
    }

    private reset() {
        this.$root.$emit('editable-reset');
        const msg = 'Reset Homepage';
        const type = 'success';
        this.$root.$emit('toast', msg, type);
        this.changes = 0;
    }
    private publish() {
        // get the price subtotal with all options selected
        axios.post('/home/publish',{
            'header': this.headerData,
            'aboutus': this.aboutusData,
            'theexperience': this.theexperienceData,
            'footerData': this.footerData
        }).then(response => {
            if (response.status) {
                const msg = 'You have successfully published your changes to the front page.';
                const type = 'success';
                this.$root.$emit('toast', msg, type);
                this.changes = 0;
            }

        }).catch(e => {
            const response = e.response.data;
            // validation errors go here
            const msg = e.response.headers.status === '422' ? response.message : 'There was an error with your request to the server. Check with your administrator for further assistance.';
            const type = 'danger';
            this.$root.$emit('toast', msg, type);
        });
    }

    private updateHeader(data: ISectionData) {
        this.headerData = data;
        this.changes += 1;
    }

    private updateAboutus(data: ISectionData) {
        this.aboutusData = data;
        this.changes += 1;
    }

    private updateTheexperience(data: ISectionData) {
        this.theexperienceData = data;
        this.changes += 1;
    }

    private updateFooter(data: ISectionData) {
        this.footerData = data;
        this.changes += 1;
    }


}
