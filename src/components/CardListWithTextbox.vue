<!--
Description: Displays a list of cards with a textbox at the top

Props: 
	values		A list of objects containing all information for Card Text.

	scroll		If true, then overflow:scroll; is applied, otherwise 
				overflow:visible is applied.
	deletable	If true, text cards can be deleted

Emits:
	add  		The text within the text box will be submitted.

	delete 	 	The id of the card will be passed back.
-->

<template>
	<div
		class="card-container"
		:style="{ 'overflow-y': scroll ? 'scroll' : 'visible' }"
	>
		<Input type="textarea" v-model="newText" />
		<Button @click="add" class="save-button">
			{{ buttonText }}
		</Button>
		<transition-group name="fade">
			<!-- Can additionally use user as a title if there is no title. Same with subtitle and date. -->
			<CardText
				v-for="note of values"
				:key="note.id"
				:title="note.title || note.user || ''"
				:subtitle="
					note.subtitle ||
						getFormattedDate(note.date || note.datetime) ||
						''
				"
				:text="note.text || note.body"
				@delete="$emit('delete', note.id)"
				:deletable="deletable"
			/>
		</transition-group>
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
		deletable: {
			type: Boolean,
			default: false,
		},
	},
	components: { Input, Button, CardText },
	emits: ["add", "delete"],
	setup(props, { emit }) {
		const newText = ref("");
		const add = () => {
			if (newText.value.length > 0) {
				emit("add", newText.value);
				// Reset input after submission.
				newText.value = "";
			}
		};
		return { newText, add, getFormattedDate };
	},
};
</script>

<style scoped>
@import "../assets/css/transitionFade.css";

.card-container {
	padding: 3rem;
	max-height: 80vh;
	max-width: 60vw;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin-bottom: 1rem;
}
.save-button {
	margin-bottom: 1rem;
}
</style>
