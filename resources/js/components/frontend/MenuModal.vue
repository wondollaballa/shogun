<template>
  	<dialog class="modal menu-modal" v-show="opened">
		<div class="modal-menu-dialog">
	  		<div class="modal-header">
				<p>{{ title }}</p>
				<span class="modal-close" @click="menuClose" >&times;</span>
			</div>
			<div id="menu-item-container" class="modal-body" >
                <h5 v-if="menu && menu.description && menu.description.length > 0">{{ menu.description }}</h5>
                <br/>
                <div v-if="menu && menu.items && menu.items.length > 0">
                    <div class="menu-row" v-for="(iValue, iKey) in menu.items" v-bind:key="menuType+'-'+iKey">
                        <div class="menu-title-container">
                            <h4 class="menu-title">{{ iValue.name }}</h4>
                            <span class="menu-dots"></span>
                            <span class="menu-price" v-if="iValue.price">{{ iValue.price }}</span>
                            <span class="menu-price" v-else>ASK</span>
                        </div>
                        <p class="menu-description" v-if="iValue.description">{{ iValue.description }}</p>

                    </div>
                </div>
			</div>
		</div>
  	</dialog>
</template>
<script lang="ts" src="./menu_modal.ts"></script>
