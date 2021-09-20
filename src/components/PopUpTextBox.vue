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
	name: "CardListWithTextbox",
	props: {
		values: Array,
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
