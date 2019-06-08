<template>
  	<dialog class="modal menu-modal" v-show="opened">
		<div class="modal-menu-dialog">
	  		<div class="modal-header">
				<p>{{ title }}</p>
				<span class="modal-close" @click="modalClose" >&times;</span>
			</div>
			<div id="footer-container" class="modal-body" >

                <div id="footer-modal">
                    <editor class="tinyMCE-editor" v-model="content"></editor>
                </div>
			</div>
            <div class="modal-footer">
                <button class="pure-button button-error" @click="reset">Reset</button>
                <button class="pure-button button-success" @click="apply">Apply</button>
            </div>
		</div>
  	</dialog>
</template>
<script lang="ts" src="./editable_footer_modal.ts"></script>
