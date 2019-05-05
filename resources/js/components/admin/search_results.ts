import Vue from 'vue'
import Component from 'vue-class-component'
import * as moment from 'moment';
import { IReservation } from '../../interfaces/interfaces';
interface ISearchResult {
    id: number,
    name: string,
    phoneFormatted: string,
    requestedFormatted: string,
    partySize: number
}

interface ISearchResults {
    searchResults: ISearchResult[]
}

@Component({
    props: {
    }
})
export default class SearchResults extends Vue implements ISearchResults {
    show = false;
    searchResults = [];
    // computed

    // Lifecycle hooks
    created() {
        this.$root.$on('set-search-results', this.setSearchResults);
        document.addEventListener('click', this.clickedOutside);
    }
    mounted() {
        // if clicked outside of the search area then close the container
    }
    updated() {
    }
    destroyed() {
        this.$root.$off('set-search-results', this.setSearchResults);
        document.removeEventListener('click', this.clickedOutside);
    }

    // methods
    private clickedOutside(e: any) {
        const clicked = document.getElementById("search-results") as HTMLElement;
        const isClickInside = clicked.contains(e.target);
        if (!isClickInside && this.show) {
            this.hideSearchResults();
        }
    }

    private setClickedRow(key: number) {
        // send event to modal
        const reservation: IReservation = this.searchResults[key];
        const dateRequested = moment(reservation.requested);
        this.$root.$emit('open-modal', '#reservation-details', reservation);
        this.$root.$emit('make-daily-calendar', dateRequested);
        // clear search results
        this.hideSearchResults();
    }
    private setSearchResults(results: string) {
        // this.searchResults = [];
        const result = JSON.parse(results);
        if (result.length == 0) {
            this.hideSearchResults();
            return;
        }
        this.show = true;
        this.searchResults = JSON.parse(results);
    }

    private hideSearchResults() {
        this.searchResults = [];
        this.show = false;
    }

}
