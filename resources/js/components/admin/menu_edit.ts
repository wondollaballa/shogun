import Vue from 'vue'
import Component from 'vue-class-component'
import axios from 'axios'
import window from '../../bootstrap';
import { IMenu, IMenuItem, IMenuSection } from '../../interfaces/interfaces'
import { Debounce } from 'typescript-debounce';
import { Watch } from 'vue-property-decorator';
const Sortable = require('sortablejs');
@Component({
    props: {
        m: String
    }

})
export default class MenuEdit extends Vue {

    // computed
    menus: IMenu[] = [];
    save: IMenu[] = [];
    keys: number[] | null = null;
    tier0: any = null;
    tier1: any = null;
    sort0: any = null;
    sort1: any = null;
    edits: number = 0;
    // Lifecycle hooks
    created() {
        this.$root.$on('update-menu-items', this.updateMenuItems);
        this.$root.$on('update-save-image', this.updateSaveImage);
    }
    mounted() {
        this.tier0 = document.getElementById('menuUl');
        this.setMenus();
        this.makeSortable(0);
        setTimeout(() => {
            this.tier1 = this.tier0.querySelectorAll('ul');
            this.makeSortable(1);
            this.edits = 0;
        }, 1100);
    }
    updated() {
    }
    destroyed() {
        this.$root.$off('update-menu-items', this.updateMenuItems);
        this.$root.$off('update-save-image', this.updateSaveImage);

    }

    private makeSortable(tier: number) {
        const parent = this;
        switch(tier) {
            case 0:
            this.sort0 = Sortable;
            this.sort0.create(this.tier0, {
                onUpdate: function (e: CustomEvent) {

                    parent.reorderAll();
                },
            });
            break;
            case 1:
            this.tier1.forEach((elem: HTMLUListElement) => {
                Sortable.create(elem, {
                    onSort: function (e: CustomEvent) {

                        parent.reorderAll();
                    },
                });
            });
            break;
        }
    }
    @Debounce({millisecondsDelay: 100})
    private reorderAll() {
        const menus = this.menus;
        let section: IMenuSection[] = [];
        const reorder: IMenu[] = [];
        const el = document.querySelectorAll<HTMLInputElement>('.menu-name');
        this.edits++;
        el.forEach((v, k) => {
            const menu = v;
            menus.forEach((value, key) => {
                if (menu.value === value.name) {
                    value.order = k;
                    reorder[k] = value;
                }
            });
        });
        this.save = reorder;
        if (this.keys !== null) {
            const menuUl = (document.getElementById('menuUl') as HTMLUListElement).children;
            const menuLi = (menuUl.item(this.keys[0]) as HTMLLIElement);
            const sectionUl = menuLi.querySelector<HTMLUListElement>('#sectionUl');
            const sectionNames = (sectionUl as HTMLUListElement).querySelectorAll<HTMLInputElement>('.menu-section-name');
            let sectionKey = -1;

            sectionNames.forEach((v, k) => {
                const sectionName = v.value;
                this.save.map((tItem, tKey) => {
                    if (tKey === this.keys![0]) {
                        tItem.items!.forEach((t2Item) => {
                            if (t2Item.name === sectionName) {
                                sectionKey++;
                                t2Item.order = sectionKey;
                                return t2Item;
                            }
                            return t2Item;
                        });
                    }
                    return tItem;
                });
            });

        }
        this.save = this.makeCopy(this.menus);
    }

    private setMenus() {
        const menus: IMenu[] = (this.$props.m) ? JSON.parse(this.$props.m) : [];
        if (menus.length === 0) {
            return;
        }
        menus.map((v, k) => {
            v.show = false;
            this.edits = 0;
            return v;
        });
        this.menus = menus;

    }

    private makeEdits() {
        this.edits++;
    }
    private openTierOneRow(key: number) {
        this.menus.map((v, k) => {
            v.show = false;
        });
        this.keys = [key, 0];
        this.menus[key].show = true;

    }
    private closeTierOneRow(key: number) {
        this.menus[key].show = false;
        this.keys = null;
    }

    @Watch('menus')
    onMenuChange()
    {
        this.countChanges();
    }
    // methods
    @Debounce({millisecondsDelay: 1000})
    private countChanges() {
        this.edits++;
    }


    private deleteMenu(id: number, key: number) {
        if(!id) {
            this.menus.splice(key, 1);

        } else {
            this.menus.map((menu, key) => {
                if (menu.id === id) {
                    menu.show = false;
                    menu.delete = true;
                }
                return menu;
            });
        }

        this.save = this.menus;
        this.edits++;
    }

    private deleteSection(menu_id: number, section_id: number, keys: number[]) {
        if(!menu_id && !section_id) {
            this.menus[keys[0]].items!.splice(keys[1], 1);
        } else {
            this.menus.map((menu, key) => {
                if (menu.id === menu_id) {
                    menu.items!.map((svalue, skey) => {
                        if(svalue.id === section_id) {
                            svalue.delete = true;
                            svalue.show = false;
                            return svalue;
                        }
                    });
                }
                return menu;
            });
        }


        this.save = this.menus;
        this.edits++;

    }

    private updateMenuItems(items: IMenuItem[]) {
        if (this.keys == null) {
            return;
        }
        this.menus[this.keys![0]].items![this.keys![1]].items = items;
        this.keys = null;
        this.edits++;
    }

    private openItemsModal(section: IMenuSection, keys: number[]) {
        this.keys = keys;
        this.$root.$emit('open-items-modal', section);
    }

    private addSection() {
        if (!this.keys) {
            return;
        }
        const key = this.keys![0];
        const section: IMenuSection = {
            id: null,
            menu_id: this.menus[key].id,
            name: null,
            description: null,
            image: null,
            status: 1,
            deleted_at: null,
            created_at: null,
            updated_at: null,
            show: true,
            delete: false,
            order: this.menus[key].items!.length + 1
        }
        this.menus[key].items!.push(section);
        this.edits++;

    }

    private imageModalOpen(section: IMenuSection) {
        this.$root.$emit('open-image-modal', section, this.keys);
    }

    private updateSaveImage() {
        this.save = this.makeCopy(this.menus);
        this.edits++;
    }

    private makeCopy(obj: any[]) {
        return JSON.parse(JSON.stringify(obj));
    }

    private saveMenu() {
        // get the price subtotal with all options selected
        axios.post('/menus/update',{
            'menus': this.menus,
        }).then(response => {
            if (response.status) {
                const msg = 'You have successfully updated your menu!';
                const type = 'success';
                this.$root.$emit('toast', msg, type);
                this.edits = 0;

            }

        }).catch(e => {
            const response = e.response.data;
            const msg = e.response.headers.status === '422' ? response.message : 'There was an error with your request to the server. Check with your administrator for further assistance.';
            const type = 'danger';
            this.$root.$emit('toast', msg, type);
        });
    }

    private newMenuRow() {
        this.menus.map((v, k) => {
            v.show = false;
            this.edits = 0;
            return v;
        });
        const order = (this.menus.length === 0) ? 0 : this.menus.length + 1;

        this.menus.push({
            id: null,
            name: null,
            description: null,
            image: null,
            status: 1,
            deleted_at: null,
            items: [],
            created_at: null,
            updated_at: null,
            show: true,
            delete: false,
            order

        } as IMenu);
        this.keys = [this.menus.length - 1, 0];

    }

    private importBase() {
         // get the price subtotal with all options selected
         axios.post('/menus/import',{
            'menus': true,
        }).then(response => {
            if (response.status) {
                const msg = 'You have successfully imported your base menu!';
                const type = 'success';
                this.$root.$emit('toast', msg, type);
                this.$props.m = JSON.stringify(this.menus);
                this.edits = 0;
            }

        }).catch(e => {
            const response = e.response.data;
            const msg = e.response.headers.status === '422' ? response.message : 'There was an error with your request to the server. Check with your administrator for further assistance.';
            const type = 'danger';
            this.$root.$emit('toast', msg, type);
        });
    }

}
