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
import { ref } from "vue";
export default {
	name: "PlantProfileBiography",
	components: { Input, Button },
	props: {
		biography: String,
	},
	emits: ["update:biography"],
	setup(props, { emit }) {
		const biographyText = ref(props.biography);
		const update = () => {
			emit("update:biography", biographyText);
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
