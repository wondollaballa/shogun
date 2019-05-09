<template>
    <div id="our-menu" class="content-body">
        <div class="triangle-top-left">
            <span>our menu</span>
        </div>
        <div class="triangle-bottom-right"></div>
        <!-- <div class="content-image-container"><div id="the-experience-image" class="content-image"></div></div> -->
        <h3 class="the-experience-title">Lunch </h3>
        <h6 v-show="(lunch.description !== null)">{{ lunch.description }}</h6>
        <div class="scrolling-wrapper-container">
            <div class="menu-card" v-for="(lunchValue, lunchKey) in lunch.items"
                 v-bind:key="'lunch-'+lunchKey"
                 v-show="(lunchKey !== 'description' && lunchKey !== 'image')"
                 @click="openMenu('lunch', lunchKey)">
                <div class="menu-card-top lazy" :style="{ backgroundImage: 'url('+lunchValue.image+')'  }"></div>
                <div class="menu-card-bottom" :style="{ 'border-top': '2px solid blue'}">
                    {{ lunchValue.name }}
                </div>
            </div>
        </div>
        <h3 class="the-experience-title">Happy Hour</h3>
        <h6 v-show="(happyHour.description !== null)">{{ happyHour.description }}</h6>
        <div class="scrolling-wrapper-container">
            <div class="menu-card" v-for="(hhValue, hhKey) in happyHour.items"
                 v-bind:key="'hh-'+hhKey"
                 v-show="hhKey !== 'description'"
                 @click="openMenu('happy hour', hhKey)">
                <div class="menu-card-top lazy" :style="{ backgroundImage: 'url('+hhValue.image+')'  }"></div>
                <div class="menu-card-bottom" :style="{ 'border-top': '2px solid red'}">
                    {{ hhValue.name }}
                </div>
            </div>
        </div>
        <h3 class="the-experience-title">Hibachi</h3>
        <h6 v-show="(hibachi.description !== null)">{{ hibachi.description }}</h6>
        <div class="scrolling-wrapper-container">
            <div class="menu-card"
                 v-for="(hbValue, hbKey) in hibachi.items"
                 v-bind:key="'hibachi-'+hbKey"
                 v-show="hbKey !== 'description'"
                 @click="openMenu('hibachi', hbKey)">
                <div class="menu-card-top lazy" :style="{ backgroundImage: 'url('+hbValue.image+')'  }"></div>
                <div class="menu-card-bottom" :style="{ 'border-top': '2px solid green'}">
                    {{ hbValue.name }}
                </div>
            </div>
        </div>
        <h3 class="the-experience-title">Sushi</h3>
        <h6 v-show="(sushi.description !== null)">{{ sushi.description }}</h6>
        <div class="scrolling-wrapper-container">
            <div class="menu-card"
                 v-for="(sValue, sKey) in sushi.items"
                 v-bind:key="'sushi-'+sKey"
                 v-show="sKey !== 'description'"
                 @click="openMenu('sushi', sKey)">
                <div class="menu-card-top lazy" :style="{ backgroundImage: 'url('+sValue.image+')'  }"></div>
                <div class="menu-card-bottom" :style="{ 'border-top': '2px solid yellow'}">
                    {{ sValue.name }}
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
