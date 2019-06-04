<template>
  	<dialog class="modal menu-modal" v-show="opened">
		<div class="modal-menu-dialog">
	  		<div class="modal-header">
				<p>{{ title }}</p>
				<span class="modal-close" @click="modalClose" >&times;</span>
			</div>
			<div id="menu-item-container" class="modal-body" >
                <div v-show="false">
                    <input id="fileUpload-footer" class="fileUpload" type="file"/>
                </div>
                <div v-show="true">
                    <editor id="tinyMCE-editor" ></editor>
                </div>
			</div>
            <div class="modal-footer">
                <button class="pure-button button-error">Reset</button>
                <button class="pure-button button-success">Save</button>
            </div>
		</div>
  	</dialog>
</template>
<script lang="ts" src="./editable_footer_modal.ts"></script>
