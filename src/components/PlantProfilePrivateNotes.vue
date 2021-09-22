<!--
Description: 
				Contains the plants notes within a popup window. New notes can be added using the textarea. Notes can be deleted with the trash icon.
Props: 
	enabled		Boolean. Determines whether or not to show the pop up.
	values		An array that stores the notes. 

Emits: 
	close		Close the pop up.
	add:note 	Add a note.
	delete:note Delete a note.
-->

<template>
	<transition name="fade">
		<PopUp v-if="enabled" @close="$emit('close')">
			<CardListWithTextbox
				buttonText="Save Note"
				:values="values"
				@add="addNote"
				@delete="deleteNote"
				scroll
				deletable
			/>
		</PopUp>
	</transition>
</template>

<script>
import PopUp from "./PopUp.vue";
import CardListWithTextbox from "./CardListWithTextbox.vue";
import { ref } from "vue";
export default {
	components: { PopUp, CardListWithTextbox },
	name: "PlantNotes",
	emits: ["close", "add:note", "delete:note"],
	props: {
		enabled: Boolean,
		values: Array,
	},
	setup(props, { emit }) {
		const notes = ref(props.value);

		const addNote = (text) => {
			const newNote = {
				id: props.values.length > 0 ? props.values[0].id + 1 : 1001,
				text,
				date: new Date().toISOString(),
			};

			emit("add:note", newNote);
		};

		const deleteNote = (noteId) => {
			emit("delete:note", noteId);
		};
		return { notes, addNote, deleteNote };
	},
};
</script>

<style scoped>
@import "../assets/css/transitionFade.css";
</style>
