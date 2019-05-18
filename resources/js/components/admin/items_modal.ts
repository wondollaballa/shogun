import Vue from 'vue'
import Component from 'vue-class-component'
import { IMenuItem, IMenuSection } from '../../interfaces/interfaces';
const Sortable = require('sortablejs');
@Component({
    props: {

    }
})
export default class ItemsModal extends Vue {
    opened: boolean = false;
    title: string = '';
    saved: IMenuItem[] = [];
    section: IMenuSection = {
        id : 0,
        menu_id: 0,
        name: '',
        description: null,
        image: null,
        status: 1,
        items: [],
        deleted_at: null,
        created_at: '',
        updated_at: '',
        show: false,
        delete: false,
        order: 0
    };

    // Lifecycle hooks
    created() {
        this.$root.$on('open-items-modal', this.openDialog);
    }
    mounted() {
        this.makeSortable();

    }
    updated() {
    }
    destroyed() {
        this.$root.$off('open-items-modal', this.openDialog);
    }

    private makeSortable() {
        const el = document.getElementById('itemsOl');
        const itemModal = this;
        const sortable = Sortable.create(el, {
            onSort: function (e: Event) {
                itemModal.reorderAll();
            },
        });
    }

    private reorderAll() {
        const el = document.querySelectorAll<HTMLLIElement>('.items-list-li');
        let items: IMenuItem[] = [];
        el.forEach((v, k) => {
            const itemName = (v.querySelector('.itemName') as HTMLInputElement).value;
            this.section.items!.map(item => {
                if(item.name === itemName) {
                    item.order = k;
                    items.push(item);
                }
                return item;
            });
        });
        this.saved = items;
    }

    private addItem() {
        const item: IMenuItem = {
            id: null,
            menu_id: this.section.menu_id,
            menu_section_id: this.section.id,
            name: null,
            description: null,
            image: null,
            price: null,
            status: 1,
            deleted_at: null,
            created_at: null,
            updated_at: null,
            show: true,
            delete: false,
            order: this.section.items!.length + 1
        }
        this.section.items!.push(item);
    }

    private removeItem(id: number) {
        this.section.items!.map(item => {
            if (id === item.id) {
                item.delete = true;
            }
            return item;
        });
    }

    private openDialog(section: IMenuSection) {
        this.section = section;
        this.resetRows();
        this.opened = true;
    }

    private closeDialog() {
        this.opened = false;
        this.resetForm();
    }

    private resetForm() {
        this.section = {
            id : 0,
            menu_id: 0,
            name: '',
            description: null,
            image: null,
            status: 1,
            items: [],
            deleted_at: null,
            created_at: '',
            updated_at: '',
            show: false,
            delete: false,
            order: 0
        };
        this.saved = [];
    }

    private resetRows() {
        const items = (this.section.items as IMenuItem[]);
        items.map((v, k) => {
            v.show = false;
            return v;
        });
    }

    private activeRow(row: number) {
        this.resetRows();
        (this.section.items as IMenuItem[])[row].show = true;
    }

    private saveItems() {
        this.section.items = this.saved;
        this.$root.$emit('update-menu-items', this.section.items);
        this.closeDialog();
    }
}
