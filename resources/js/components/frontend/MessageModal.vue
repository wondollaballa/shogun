<template>
    <div class="modal message-modal" v-show="opened">
        <div class="modal-dialog">
            <div class="modal-header">
                <p>{{ title }}</p>
                <span class="modal-close" @click="closeModal">&times;</span>
            </div>
            <div class="modal-body">
				<section class="c-container">

					<div class="o-circle c-container__circle o-circle__sign--success" v-if="icon == 'success'">
						<div class="o-circle__sign"></div>
					</div>

					<div class="o-circle c-container__circle o-circle__sign--failure" v-else>
						<div class="o-circle__sign"></div>
					</div>

				</section>
				<p class="message-p">{{ message }}</p>
            </div>
            <div class="modal-footer">

                <button type="button" class="pure-button button-error pure-u-1" @click="closeModal">close</button>

            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./message_modal.ts"></script>
