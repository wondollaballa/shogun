import Vue from 'vue'
import Component from 'vue-class-component'
import Axios from 'axios';
import * as _ from 'lodash';
import { Watch } from 'vue-property-decorator';
import { Debounce } from 'typescript-debounce'
interface ISearch {
    search: string
}



@Component({
    props: {
        results: String
    }
})
export default class Search extends Vue implements ISearch {
    search = '';
    // computed

    // Lifecycle hooks
    created() {
    
    }
    mounted() {
     
    }
    updated() {
    }
    destroyed() {
    }
    @Watch('search')
    onChangeSearch() 
    {
        this.makeSearch();
    }
    // methods
    @Debounce({millisecondsDelay: 1000})
    makeSearch() {

        Axios.post('/reservations/search',{
            'search': this.search
        }).then(response => {
            if (response.status) {
                this.$root.$emit('set-search-results', response.data);
            }
            
        }).catch(e => {
            // for now just eat the exception

        });
    }
}