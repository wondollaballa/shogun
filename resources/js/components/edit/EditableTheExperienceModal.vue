<template>
  	<dialog class="modal menu-modal" v-show="opened">
		<div class="modal-menu-dialog">
	  		<div class="modal-header">
				<p>{{ title }}</p>
				<span class="modal-close" @click="modalClose" >&times;</span>
			</div>
			<div id="theexperience-container" class="modal-body" >
                <div id="theexperience-image-container">
                    <input id="fileUpload-theexperience" class="fileUpload" type="file"/>
                    <div id="button-container">
                        <button id="rotate-left" class="pure-button button-error" @click="rotate(1)">rotate +</button>
                        <button id="rotate-right" class="pure-button button-success" @click="rotate(-1)">rotate -</button>
                    </div>
                    <div id="theexperience-image" :class="getRotateClass()" :style="{ backgroundImage: 'url('+imageUrl+')'  }"></div>
                </div>
                <div>
                    <editor class="theexperience-editor" v-model="content"></editor>
                </div>
			</div>
            <div class="modal-footer">
                <button class="pure-button button-error" @click="reset">Reset</button>
                <button class="pure-button button-success" @click="apply">Apply</button>
            </div>
		</div>
  	</dialog>
</template>
<script lang="ts" src="./editable_theexperience_modal.ts"></script>
