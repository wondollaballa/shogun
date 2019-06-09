<template>
    <div id="our-menu" class="content-body">
        <div class="triangle-top-left">
            <span>our menu</span>
        </div>
        <div class="triangle-bottom-right"></div>
        <!-- <div class="content-image-container"><div id="the-experience-image" class="content-image"></div></div> -->
        <div v-for="(menu, menuKey) in menus" v-bind:key="'menu-'+menuKey">
            <h3 class="the-experience-title">{{ menu.name }} </h3>
            <h6 v-show="(menu.description !== null)">{{ menu.description }}</h6>
            <div class="scrolling-wrapper-container">
                <div class="menu-card" v-for="sectionValue in menu.items"
                    v-bind:key="'section-'+sectionValue.id"
                    @click="openMenu(sectionValue)">
                    <div class="menu-card-top lazy" :class="sectionValue.image_rotate" :style="{ backgroundImage: 'url('+sectionValue.image+')'  }"></div>
                    <div class="menu-card-bottom" :style="{ 'border-top': '2px solid blue'}">
                        {{ sectionValue.name }}
                    </div>
                </div>
            </div>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
    </div>
</template>

<script lang="ts" src="./our_menu.ts"></script>
