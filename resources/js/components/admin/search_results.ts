import Vue from 'vue'
import Component from 'vue-class-component'
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