<template>
  	<dialog class="modal menu-modal" v-show="opened">
		<div class="modal-menu-dialog">
	  		<div class="modal-header">
				<p>{{ title }}</p>
				<span class="modal-close" @click="modalClose" >&times;</span>
			</div>
			<div id="menu-item-container" class="modal-body" >
                <div>
                    <input id="fileUpload-aboutus" class="fileUpload" type="file"/>
                </div>
                <div>
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
<script lang="ts" src="./editable_aboutus_modal.ts"></script>
