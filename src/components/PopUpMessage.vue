<template>
	<PopUp :closable="false">
		<div class="message-container">
			<textarea
				:placeholder="`Send a message...`"
				class="textarea"
				v-model="message"
				cols="30"
				rows="10"
			></textarea>
			<div class="button-container">
				<AppButton @click="$emit('sendMessage', message)">
					submit
				</AppButton>
				<AppButton @click="$emit('cancelMessage')">
					cancel
				</AppButton>
			</div>
		</div>
	</PopUp>
</template>

<script>
import PopUp from "./PopUp.vue";
import AppButton from "./AppButton.vue";

export default {
	name: "PopUpMessage",
	components: { PopUp, AppButton },
	data() {
		return {
			message: "",
		};
	},
};
</script>

<style scoped>
.message-container {
	border-radius: 20px;
	box-sizing: border-box;
}

.message-container:focus-within {
	border: 3px solid #bf763c;
}

.textarea {
	background-color: #dce0d1;
	border: none;
	outline: none;
	font-size: 1.25rem;
	padding: 1rem;
	border-radius: 20px;
}

.textarea:focus {
	border: none;
}

.button-container {
	width: 100%;
	display: flex;
	justify-content: center;
}
</style>
