<template>
    <div id="items-modal" class="modal" :class="opened ? 'opened': ''">
        <div class="modal-dialog">
            <div class="modal-header">
                <p>{{ section.name }}</p>
                <span class="modal-close" @click="closeDialog">&times;</span>
            </div>
            <div class="modal-body">
                <ol id="itemsOl" class="pure-form items-list">
                    <li class="items-list-li" v-for="(iValue, iKey) in section.items" v-bind:key="'item-'+iKey" @click="activeRow(iKey)" :class="iValue.show ? 'active' : ''" v-show="iValue.delete == false">
                        <img :src="iValue.image"/>
                        <input class="itemName" v-model="iValue.name"/>
                        <input v-model="iValue.description"/>
                        <input v-model="iValue.price"/>
                        <button class="pure-button button-error" @click="removeItem(iValue.id)">X</button>
                    </li>
                </ol>
            </div>
            <div class="modal-footer">
                <button type="button" class="pure-button button-info pure-u-1-2" @click="addItem">add</button>
                <button type="button" class="pure-button button-success pure-u-1-2" @click="saveItems">save</button>
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./items_modal.ts"></script>
