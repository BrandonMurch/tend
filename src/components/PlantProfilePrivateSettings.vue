<!--
Description: 
					Contains all the settings for a plant within a form. When saved, all settings will be stored.
Props: 
	settings		Plant settings. See the list below for all possible 		
					settings. 
	id				The plants id
	
Emits: 
	update:settings Update the settings.
	delete			Delete the plant.

-->
<template>
	<PlantNotes
		:enabled="notesOpen"
		:values="formData.notes"
		@add:note="addNote"
		@delete:note="deleteNote"
		@close="notesOpen = false"
	/>
	<form
		novalidate
		id="plantSettings"
		class="input-container"
		@submit.stop.prevent="onSubmit"
		@reset.stop.prevent="resetForm"
		:class="{ submitted: hasSubmitted }"
	>
		<Input
			class="input"
			v-for="input in inputs"
			:key="input.label"
			v-bind="input"
			v-model="formData[input.dataName]"
			required
			stealth
		>
			<!-- Allow each input to have an associated icon. -->
			<template v-slot:icon>
				<component class="input-icon" :is="input.icon" />
			</template>
		</Input>

		<button
			class="stealth-input button-single-line input"
			@click="notesOpen = true"
			type="button"
		>
			<IconNotes class="button-icon" /> see plant notes
		</button>
		<button
			class="stealth-input button-single-line input"
			type="button"
			@click="
				() => {
					$router.push({
						name: 'species',
						params: { name: formData.species },
					});
				}
			"
		>
			<IconExclamation class="button-icon" /> help my plant!
		</button>

		<div class="button-container">
			<Button
				class="button"
				type="submit"
				:form="'plantSettings'"
				@click="hasSubmitted = true"
			>
				save
			</Button>
			<Button class="button" type="reset" :form="'plantSettings'">
				cancel
			</Button>
			<Button deleteButton type="button" @click="$emit('delete')">
				Delete
			</Button>
		</div>
	</form>
</template>

<script>
import IconLeaf from "./Icons/IconLeaf.vue";
import Input from "./AppInput.vue";
import Button from "./AppButton.vue";
import IconWater from "./Icons/IconWater.vue";
import IconMushroom from "./Icons/IconMushroom.vue";
import IconCut from "./Icons/IconCut.vue";
import IconFlowerPot from "./Icons/IconFlowerPot.vue";
import IconRoof from "./Icons/IconRoof.vue";
import IconNotes from "./Icons/IconNotes.vue";
import IconLocation from "./Icons/IconLocation.vue";
import IconExclamation from "./Icons/IconExclamation.vue";
import PlantNotes from "./PlantProfilePrivateNotes.vue";
import { ref, watch, computed, watchEffect } from "vue";
import { useStore } from "vuex";

export default {
	name: "PlantProfilePrivateSettings",
	props: {
		settings: Object,
		id: Number,
	},
	components: { Button, Input, IconNotes, IconExclamation, PlantNotes },
	emits: ["update:settings", "delete"],
	setup(props, { emit }) {
		const store = useStore();
		const notesOpen = ref(false);
		let hasSubmitted = false;

		// Get the list of species and format them for options.
		const getSpeciesList = () => {
			const list = [{ text: "Add New Species", value: "new" }];
			store.getters["plants/allSpecies"].forEach((species) => {
				list.push({ text: species, value: species });
			});
			return list;
		};
		const speciesOptions = ref(getSpeciesList());

		// All options for time based settings.
		const timeOptions = [
			{ text: "Auto", value: "Auto" },
			{ text: "Daily", value: "Daily" },
			{ text: "Weekly", value: "Weekly" },
			{ text: "Monthly", value: "Monthly" },
			{ text: "Annually", value: "Annually" },
			{ text: "Every 2 Years", value: "Every 2 Years" },
		];

		// All inputs
		const inputs = computed(() => [
			{
				label: "Species:",
				type: "select",
				options: speciesOptions.value,
				dataName: "species",
				icon: IconLeaf,
			},
			{
				label: "Indoor / outdoor:",
				type: "slider",
				options: [
					{ text: "Indoors", value: "Indoors" },
					{ text: "Outdoors", value: "Outdoors" },
				],
				dataName: "indoor-outdoor",
				icon: IconRoof,
			},
			{
				label: "Location: ",
				type: "checkbox",
				dataName: "locationEnabled",
				icon: IconLocation,
			},
			{
				label: "Water:",
				type: "select",
				options: timeOptions,
				dataName: "water-frequency",
				icon: IconWater,
			},
			{
				label: "Fertilizer:",
				type: "select",
				options: timeOptions,
				dataName: "fertilize-frequency",
				icon: IconMushroom,
			},
			{
				label: "Pruning:",
				type: "select",
				options: timeOptions,
				dataName: "prune-frequency",
				icon: IconCut,
			},
			{
				label: "Repotting:",
				type: "select",
				options: timeOptions,
				dataName: "repot-frequency",
				icon: IconFlowerPot,
			},
		]);
		const formData = ref(props.settings);
		watch(
			() => props.settings,
			(current) => {
				formData.value = current;
			}
		);

		const getLocation = () => {
			const locationSuccess = (position) => {
				formData.value.location = `${position.coords.latitude}, ${position.coords.longitude}`;
			};

			// Only get the location if it is enabled, and has not already been taken.
			if (
				formData.value.locationEnabled &&
				navigator.geolocation &&
				!formData.value.location
			) {
				navigator.geolocation.getCurrentPosition(
					locationSuccess,
					() => {
						alert("Location error. Please try again later.");
						formData.value.locationEnabled = false;
					}
				);
			}

			// If location is disabled, ensure the location is cleared.
			if (!formData.value.locationEnabled) {
				formData.value.location = "";
			}
		};

		getLocation();

		watchEffect(formData, getLocation());

		const resetForm = () => {
			hasSubmitted = false;
			formData.value = { ...props.settings };
		};

		const onSubmit = () => {
			// Create a new species.
			if (formData.value.species == "new") {
				const species = prompt("Please enter in species name: ");
				formData.value.species = species;
			}
			speciesOptions.value = getSpeciesList();
			emit("update:settings", formData.value);
		};

		const addNote = (newNote) => {
			formData.value.notes.unshift(newNote);
			formData.value = { ...formData.value };
			emit("update:settings", formData.value);
		};

		const deleteNote = (noteId) => {
			formData.value.notes = [
				...formData.value.notes.filter((note) => note.id != noteId),
			];
			emit("update:settings", formData.value);
		};

		return {
			inputs,
			formData,
			hasSubmitted,
			resetForm,
			onSubmit,
			notesOpen,
			location,
			addNote,
			deleteNote,
		};
	},
};
</script>

<style scoped>
.button-container {
	width: 100%;
	display: flex;
	justify-content: center;
}

.button-single-line {
	display: block;
}

.button-icon,
.input-icon {
	float: left;
	margin-right: 1rem;
}

.input-container {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}

.input {
	width: 100%;
	display: flex;
	justify-content: center;
	min-width: 10rem;
}

@media (min-width: 500px) {
	.input {
		width: 40%;
		margin: 0 5%;
	}
}

@media (min-width: 1200px) {
	.input {
		width: 20%;
		margin: 0 5%;
	}
}
</style>
