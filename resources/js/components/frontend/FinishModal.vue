<template>
  	<dialog class="modal" v-show="opened">
		<div class="modal-dialog">
	  		<div class="modal-header">
				<p>{{ title }}</p>
				<span class="modal-close" @click="finish" v-show="step == 2">&times;</span>
			</div>
			<div class="modal-body">
				<div id="finish-step-1" v-show="step == 1">
					<div id="loader" class="lds-circle"><div></div></div>
					<div id="content">
						<p>We are preparing your reservation. Once completed, an email will be sent shortly with the details of your upcoming experience.</p>
					</div>
				</div>
				<div id="finish-step-2" v-show="step == 2">
					<div id="loader">
						<div class="success-checkmark">
							<div class="check-icon">
								<span class="icon-line line-tip"></span>
								<span class="icon-line line-long"></span>
								<div class="icon-circle"></div>
								<div class="icon-fix"></div>
							</div>
						</div>
					</div>
					<div id="content">
						<p>You are all set! An email has been sent to verify your reservation. If this is your first time with us, please check your spam box or click below to resend. Thank you!</p>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button id="finish-button" type="button" class="pure-button button-primary" @click="finish" v-show="step == 2">Confirm</button>
			</div>
		</div>
  	</dialog>
</template>
<script lang="ts" src="./finish_modal.ts"></script>