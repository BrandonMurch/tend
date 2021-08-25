<!-- SINGLETON. The login page for the website. Displays a scaled back version of the explore page. Depending on the size of the screen, the login form with
either be displayed in a pop-up or as part of the gallery. -->

<template>
	<ImageGallery :images="images" @moreImages="getImageData()">
		<LogInForm v-if="isMobile" class="formCard" />
	</ImageGallery>
	<PopUp class="formPopUp" :closable="false" scrollable>
		<LogInForm v-if="!isMobile" />
	</PopUp>
</template>

<script>
import ImageGallery from "./ImageGallery.vue";
import PopUp from "./PopUp.vue";
import LogInForm from "./TheLoginForm.vue";
import plantData from "../assets/json/plants.json";
import { debounce } from "../helpers/debounce";

export default {
	name: "LogIn",
	components: { ImageGallery, PopUp, LogInForm },

	data() {
		return {
			images: [],
			currentImageRound: 0,
			isMobile: false,
			debouncedUpdateMobile: debounce(this.updateIsMobile),
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

		updateIsMobile() {
			this.isMobile = window.innerWidth < 572;
		},
	},
	created() {
		this.updateIsMobile();
		this.getImageData();
		window.addEventListener("resize", this.debouncedUpdateMobile);
	},
	unmounted() {
		window.removeEventListener("resize", this.debouncedUpdateMobile);
	},
};
</script>

<style scoped>
@media (max-width: 571px) {
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
</style>
