<template>
	<transition name="fade">
		<PopUp v-if="enabled" @close="$emit('close')">
			<div class="card-container">
				<Input type="textarea" v-model="newNoteText" />
				<Button @click="addNote" class="save-button">
					Save Note
				</Button>
				<CardText
					v-for="note of value"
					:key="note.date"
					:title="getFormattedDate(note.date)"
					:text="note.text"
				/>
			</div>
		</PopUp>
	</transition>
</template>

<script>
import PopUp from "./PopUp.vue";
import CardText from "./CardText.vue";
import Input from "./AppInput.vue";
import Button from "./AppButton.vue";
import { getFormattedDate } from "../composables/getFormattedDate";
import { ref } from "vue";
import { addPlantNote } from "../composables/mockPlantData";
export default {
	components: { PopUp, CardText, Input, Button },
	name: "PlantNotes",
	emits: ["close", "update:notes"],
	props: {
		enabled: Boolean,
		value: Array,
		modelValue: Array,
	},
	setup(props, { emit }) {
		const newNoteText = ref("");
		const notes = ref(props.value);

		const addNote = () => {
			const newNote = {
				text: newNoteText.value,
				date: new Date().toISOString(),
			};
			addPlantNote(newNote);

			emit("update:notes", [newNote, ...notes.value]);

			newNoteText.value = "";
		};
		return { newNoteText, getFormattedDate, notes, addNote };
	},
};
</script>

<style scoped>
@import "../assets/css/transitionFade.css";

.card-container {
	padding: 3rem;
	max-height: 80vh;
	max-width: 60vw;
	overflow-y: scroll;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}
.save-button {
	margin-bottom: 1rem;
}
</style>
