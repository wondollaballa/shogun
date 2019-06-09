import Vue from 'vue'
import Component from 'vue-class-component'
import { IMenuItem, IMenuSection } from '../../interfaces/interfaces';
import { Watch } from 'vue-property-decorator';
import { Debounce } from 'typescript-debounce';
const Sortable = require('sortablejs');
@Component({
    props: {

    }
})
export default class ItemsModal extends Vue {
    opened: boolean = false;
    title: string = '';
    saved: IMenuItem[] = [];
    saving: IMenuItem[] = [];
    section: IMenuSection = {
        id : 0,
        menu_id: 0,
        name: '',
        description: null,
        image: null,
        image_rotate: null,
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
        setTimeout(() => {
            el.forEach((v, k) => {
                const itemName = (v.querySelector('.itemName') as HTMLInputElement).value;
                this.saved!.map(item => {
                    if(item.name === itemName) {
                        item.order = k;
                        items.push(item);
                    }
                    return item;
                });
            });
            this.saving = items;
        }, 100);


    }
    @Watch('saving')
    onMenuChange()
    {
        this.updateSaved();
    }
    // methods
    @Debounce({millisecondsDelay: 1000})
    private updateSaved() {
        // this.saved = this.saving;
    }

    private addItem() {
        const itemsCount = this.saved.length > 0 ? this.saved.length + 1 : 0;
        const item: IMenuItem = {
            id: null,
            menu_id: this.section.menu_id,
            menu_section_id: this.section.id,
            name: null,
            description: null,
            image: null,
            image_rotate: null,
            price: null,
            status: 1,
            deleted_at: null,
            created_at: null,
            updated_at: null,
            show: true,
            delete: false,
            order: itemsCount
        }
        this.saving.push(item);
    }

    private removeItem(id: number, key: number) {
        this.saving.map((item, k) => {
            if (id) {
                if (id === item.id) {
                    item.delete = true;
                }
            } else {
                if (k === key) {
                    item.delete = true;
                }
            }
            return item;
        });
    }

    private openDialog(section: IMenuSection) {
        this.saved = section.items!;
        this.saving = section.items!;
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
            image_rotate: null,
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
        this.saving = [];
    }

    private resetRows() {
        if (this.saved === undefined) {
            this.saved = [];
            this.saving = [];
            return;
        }
        const items = this.saved;
        items.map((v, k) => {
            v.show = false;
            return v;
        });
    }

    private activeRow(row: number) {
        this.resetRows();
        this.saving[row].show = true;
    }

    private saveItems() {
        this.saved = this.saving;
        this.$root.$emit('update-menu-items', this.saved);
        this.closeDialog();
    }

    private makeCopy(obj: any) {
        return JSON.parse(JSON.stringify(obj));
    }
}
