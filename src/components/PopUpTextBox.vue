<!--
Description: 
					A pop up with a textbox, and a button to submit the contents of that text box.
Props: 
	buttonText 		The text to be displayed within the button.

	scroll			Booelan Does this scroll when it grows too big?
Emits: 
	add				Submit the message. Returns the message text with the emit.
	close			Close the popup.
-->

<template>
	<PopUp @close="$emit('close')">
		<div
			class="card-container"
			:style="{ 'overflow-y': scroll ? 'scroll' : 'visible' }"
		>
			<Input type="textarea" v-model="newText" />
			<Button @click="add" class="save-button">
				{{ buttonText }}
			</Button>
		</div>
	</PopUp>
</template>

<script>
import Input from "./AppInput.vue";
import Button from "./AppButton.vue";
import PopUp from "./PopUp.vue";
import { ref } from "vue";
export default {
	name: "PopUpTextBox",
	props: {
		buttonText: String,
		scroll: {
			type: Boolean,
			default: false,
		},
	},
	components: { Input, Button, PopUp },
	emits: ["add", "close"],
	setup(props, { emit }) {
		const newText = ref("");
		const add = () => {
			if (newText.value.length > 0) {
				emit("add", newText.value);
				newText.value = "";
			}
		};
		return { newText, add };
	},
};
</script>

<style scoped>
.card-container {
	padding: 3rem;
	max-height: 80vh;
	max-width: 60vw;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}
.save-button {
	margin-bottom: 1rem;
}
</style>
