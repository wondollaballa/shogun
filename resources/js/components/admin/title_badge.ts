import Vue from 'vue'
import Component from 'vue-class-component'

interface IBadgeData {
    type: boolean,
    title: string,
    payload: string
}

interface ITitleBadge {
    badgeClasses: string,
    dataPoints: IBadgeData[]
}
@Component({
    props: {
        title: String,
        showTitle: Boolean,
        data: String
    }
    
})
export default class TitleBadge extends Vue implements ITitleBadge {
    badgeClasses = ""
    // computed
    public get dataPoints() {
        return JSON.parse(this.$props.data);
    }

    // Lifecycle hooks
    created() {

    }
    mounted() {

    }
    updated() {

    }
    destroyed() {

    }

    // methods

}