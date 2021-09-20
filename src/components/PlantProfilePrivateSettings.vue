<template>
	<PlantNotes
		:enabled="notesOpen"
		:values="formData.notes"
		@add:note="
			(note) => {
				note.id = formData.notes[0].id + 1;
				formData.notes = [note, ...formData.notes];
			}
		"
		@delete:note="
			(noteid) => {
				formData.notes = [
					...formData.notes.filter((note) => note.id != noteid),
				];
			}
		"
		@close="notesOpen = false"
	/>
	<form
		novalidate
		id="plantSettings"
		class="input-container"
		@submit.stop.prevent="onSubmit"
		@reset="resetForm"
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
import PlantNotes from "./PlantNotes.vue";
import { getSpecies } from "../composables/mockPlantData";
import { ref, computed, watch } from "vue";

export default {
	name: "PlantProfilePrivateSettings",
	props: {
		settings: Object,
		id: Number,
	},
	components: { Button, Input, IconNotes, IconExclamation, PlantNotes },
	emits: ["update:settings", "delete"],
	setup(props, { emit }) {
		const notesOpen = ref(false);

		const speciesOptions = [];
		for (const species of getSpecies()) {
			speciesOptions.push({
				text: species,
				value: species,
			});
		}

		const timeOptions = [
			{ text: "Auto", value: "Auto" },
			{ text: "Daily", value: "Daily" },
			{ text: "Weekly", value: "Weekly" },
			{ text: "Monthly", value: "Monthly" },
			{ text: "Annually", value: "Annually" },
			{ text: "Every 2 Years", value: "Every 2 Years" },
		];

		const inputs = [
			{
				label: "Species:",
				type: "select",
				options: speciesOptions,
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
		];

		const getLocation = () => {
			const locationSuccess = (position) => {
				formData.value.location = `${position.coords.latitude}, ${position.coords.longitude}`;
			};

			return navigator.geolocation.getCurrentPosition(
				locationSuccess,
				() => {
					alert("Location error. Please try again later.");
					formData.value.locationEnabled = false;
				}
			);
		};

		if (props.settings.locationEnabled) {
			getLocation();
		}

		const formData = computed(() => props.settings);
		const locationEnabled = computed(() => formData.value.locationEnabled);
		watch(locationEnabled, () => {
			if (formData.value.locationEnabled && navigator.geolocation) {
				getLocation();
			}

			formData.value.location = "";
		});

		let hasSubmitted = false;

		const resetForm = () => {
			hasSubmitted = false;
			formData.value = props.settings;
		};

		const onSubmit = () => {
			emit("update:settings", formData);
		};

		return {
			inputs,
			formData,
			hasSubmitted,
			resetForm,
			onSubmit,
			notesOpen,
			location,
		};
	},
};
</script>

<style scoped>
@import "../assets/css/stealthInput.css";

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
