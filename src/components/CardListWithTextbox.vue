<template>
	<div
		class="card-container"
		:style="{ 'overflow-y': scroll ? 'scroll' : 'visible' }"
	>
		<Input type="textarea" v-model="newText" />
		<Button @click="add" class="save-button">
			{{ buttonText }}
		</Button>
		<CardText
			v-for="note of values"
			:key="note.date"
			:title="note.title || ''"
			:subtitle="
				note.subtitle ||
					getFormattedDate(note.date || note.datetime) ||
					''
			"
			:text="note.text || note.body"
			@delete="$emit('delete', note.id)"
		/>
	</div>
</template>

<script>
import Input from "./AppInput.vue";
import Button from "./AppButton.vue";
import CardText from "./CardText.vue";
import { ref } from "vue";
import { getFormattedDate } from "../composables/getFormattedDate";
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
	components: { Input, Button, CardText },
	emits: ["add", "delete"],
	setup(props, { emit }) {
		console.log(props.values);
		const newText = ref("");
		const add = () => {
			if (newText.value.length > 0) {
				emit("add", newText.value);
				newText.value = "";
			}
		};
		return { newText, add, getFormattedDate };
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
