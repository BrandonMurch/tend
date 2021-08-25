<template>
	<ImageGallery :images="images" @moreImages="getImageData()">
		<LogInForm class="formCard" />
	</ImageGallery>
	<PopUp class="formPopUp" :closable="false" scrollable>
		<LogInForm />
	</PopUp>
</template>

<script>
import ImageGallery from "./ImageGallery.vue";
import PopUp from "./PopUp.vue";
import LogInForm from "./TheLoginForm.vue";
import plantData from "../assets/json/plants.json";

export default {
	name: "LogIn",
	components: { ImageGallery, PopUp, LogInForm },
	data() {
		return {
			images: [],
			currentImageRound: 0,
		};
	},

	methods: {
		// A fake function that returns images until backend is implemented.
		getDataStub() {
			const images = [];

			for (let i = 0; i < 5; i++) {
				for (let j = 0; j < 7; j++) {
					let copy = { ...plantData[j] };
					copy.id = copy.id + 7 * i + this.currentImageRound * 7 * 5;
					images.push(copy);
				}
			}

			return images;
		},

		getImageData() {
			// Duplicate examples to fill the screen into images array.

			// New array to trigger watch updates.
			this.images = [...this.images, ...this.getDataStub()];
			this.currentImageRound++;
		},
	},
	created() {
		this.getImageData();
	},
};
</script>

<style scoped>
@media (max-width: 571px) {
	.formPopUp {
		display: none;
	}

	.formCard {
		width: 230px;
		padding: 0;
		margin-bottom: 1rem;
		box-shadow: 0 5px 5px grey;
		border: 5px solid #b87d4b;
		padding: 10px;
		position: relative;
		z-index: 10;
	}
}
@media (min-width: 572px) {
	.formCard {
		display: none;
	}
}
</style>
