<template>
	<transition name="fade">
		<PopUp v-if="enabled" @close="$emit('close')">
			<CardListWithTextbox
				buttonText="Save Note"
				:values="values"
				@add="addNote"
				@delete="deleteNote"
				scroll
			/>
		</PopUp>
	</transition>
</template>

<script>
import PopUp from "./PopUp.vue";
import CardListWithTextbox from "./CardListWithTextbox.vue";
import { getFormattedDate } from "../composables/getFormattedDate";
import { ref } from "vue";
import { addPlantNote, deletePlantNote } from "../composables/mockPlantData";
export default {
	components: { PopUp, CardListWithTextbox },
	name: "PlantNotes",
	emits: ["close", "add:note", "delete:note"],
	props: {
		enabled: Boolean,
		values: Array,
	},
	setup(props, { emit }) {
		// const newNoteText = ref("");
		const notes = ref(props.value);

		const addNote = (text) => {
			const newNote = {
				text,
				date: new Date().toISOString(),
			};
			addPlantNote(newNote);

			emit("add:note", newNote);
		};

		const deleteNote = (noteId) => {
			deletePlantNote(noteId);

			emit("delete:note", noteId);
		};
		return { getFormattedDate, notes, addNote, deleteNote };
	},
};
</script>

<style scoped>
@import "../assets/css/transitionFade.css";
</style>
