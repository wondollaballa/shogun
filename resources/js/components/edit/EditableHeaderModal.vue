<template>
  	<dialog class="modal menu-modal" v-show="opened">
		<div class="modal-menu-dialog">
	  		<div class="modal-header">
				<p>{{ title }}</p>
				<span class="modal-close" @click="modalClose" >&times;</span>
			</div>
			<div id="menu-item-container" class="modal-body" >
                <div>
                    <input id="fileUpload-header" class="fileUpload" type="file"/>
                </div>
                <div id="preview-image-header" class="preview-image" :style="{ backgroundImage: 'url('+imageUrl+')'  }">
                </div>
			</div>
            <div class="modal-footer">
                <button class="pure-button button-error" @click="reset">Reset</button>
                <button class="pure-button button-success" @click="apply" :disabled="imageUrl === null">Apply</button>
            </div>
		</div>
  	</dialog>
</template>
<script lang="ts" src="./editable_header_modal.ts"></script>
