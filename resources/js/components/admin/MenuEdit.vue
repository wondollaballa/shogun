<template>
    <div>
        <nav id="menu-nav">
            <button class="pure-button button-error" @click="setMenus">Undo All</button>
            <button id="saveAll" class="pure-button button-success" @click="saveMenu"><span class="notifications" :class="(edits === 0) ? 'notifications-dead' : 'notifications-alive'">{{ edits }}</span> Save</button>
        </nav>
        <ul id="menuUl" class="menu-list">
            <li class="menu" v-for="(mValue, mKey) in menus" v-bind:key="'menu-'+mKey" v-show="(mValue.delete !== true)">
                <div class="menu-title">
                    <button v-show="!mValue.show" @click="openTierOneRow(mKey)">Open</button>
                    <button v-show="mValue.show" @click="closeTierOneRow(mKey)">Close</button>
                    <input class="pure-input-4 menu-name" v-model="mValue.name" @blur="makeEdits"/>
                    <button @click="deleteMenu(mValue.id, mKey)">Delete</button>
                </div>
                <div class='menu-content' v-show="mValue.show">
                    <textarea class="pure-input-1 menu-description" type="text" v-model="mValue.description"/>
                    <ul id="sectionUl" class="menu-section-container">
                        <li class="menu-section" v-for="(msValue, msKey) in mValue.items" v-bind:key="'section-'+msKey" v-show="msValue.delete === false">
                            <div class="menu-section-image" :style="{ backgroundImage: 'url('+msValue.image+')'}" @click="imageModalOpen(msValue)"></div>
                            <input class="menu-section-name" v-model="msValue.name" @blur="makeEdits"/>
                            <div class="menu-button-group">
                                <button type="button" class="pure-button button-error pure-input-1-2" @click="deleteSection(mValue.id, msValue.id, [mKey, msKey])">delete</button>
                                <button type="button" class="pure-button button-secondary pure-input-1-2" @click="openItemsModal(msValue, [mKey, msKey])">View</button>
                            </div>
                        </li>
                    </ul>
                    <br/><br/>
                    <button class="pure-button button-success pure-u-1" @click="addSection">New {{ mValue.name }} Section</button>
                </div>
            </li>
        </ul>
        <div>

            <button class="pure-button pure-button-primary pure-u-1" @click="newMenuRow">+New Menu Row</button>
            <br/><br/><br/>
            <button class="pure-button pure-u-1-5" @click="importBase">Import Base Menu</button>
        </div>
    </div>
</template>

<script lang="ts" src="./menu_edit.ts"></script>
