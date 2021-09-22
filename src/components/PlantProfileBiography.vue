<!--
Description: 		Contains the public information for a plant. This is 
					currently only the biography.
Props: 
	biography 		The plant's biography.
Emits: 
	update:biography 	Emits when the biography is saved. 
-->

<template>
	<div class="bio-container">
		<Input type="textarea" v-model="biographyText" />
		<Button @click="update">
			Save
		</Button>
	</div>
</template>

<script>
import Input from "./AppInput.vue";
import Button from "./AppButton.vue";
import { ref, watch } from "vue";
export default {
	name: "PlantProfileBiography",
	components: { Input, Button },
	props: {
		biography: String,
	},
	emits: ["update:biography"],
	setup(props, { emit }) {
		const biographyText = ref(props.biography);
		watch(
			() => props.biography,
			(current) => {
				biographyText.value = current;
			}
		);
		const update = () => {
			emit("update:biography", biographyText.value);
		};
		return { biographyText, update };
	},
};
</script>

<style scoped>
.bio-container {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}
</style>
