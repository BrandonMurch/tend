<template>
	<div class="gallery-container">
		<PopUp
			v-if="popupImage"
			v-bind="popupImage"
			@close="popupImage = null"
		/>
		<div
			class="gallery-column"
			v-for="(column, index) in imageColumns"
			:key="index"
		>
			<ImageCard
				v-for="image in column"
				:key="image.id"
				v-bind="image"
				@click="popupImage = image"
			/>
		</div>
	</div>
</template>

<script>
import ImageCard from "./ImageCard.vue";
import PopUp from "./PopUp.vue";
import { debounce } from "../assets/javascript/debounce";

export default {
	name: "ImageGallery",
	components: {
		ImageCard,
		PopUp,
	},
	props: {
		images: Array,
	},
	/*
        For monitoring the resize of the window, I use the lifecycle hooks
        to create global event listeners. When the component is unmounted,
        the listener will be removed. 

        https://vuejs.org/v2/api/#Options-Lifecycle-Hooks
        https://vuejs.org/v2/api/#created
        https://vuejs.org/v2/api/#mounted
        https://www.w3schools.com/js/js_htmldom_eventlistener.asp
    */
	created() {
		window.addEventListener("resize", this.debounceUpdateSize);
	},
	unmounted() {
		window.removeEventListener("resize", this.debounceUpdateSize);
	},
	methods: {
		updateColumnsOnResize() {
			this.imageColumns = this.splitImagesIntoColumns();
		},
		// Split images into a 2d array of columns first, then images.
		splitImagesIntoColumns() {
			const columns = Math.floor(window.innerWidth / 265);
			const columnQueue = [];
			for (let i = 0; i < columns; i++) {
				columnQueue[i] = [];
			}
			for (let i = 0; i < this.images.length; i++) {
				columnQueue[i % columns].push(this.images[i]);
			}
			return columnQueue;
		},
	},
	data() {
		return {
			imageColumns: this.splitImagesIntoColumns(),
			popupImage: null,
			// Use data to properly remove event listener;
			debounceUpdateSize: debounce(this.updateColumnsOnResize),
		};
	},
};
</script>

<style scoped>
.gallery-container {
	margin: auto;
	display: flex;
}

.gallery-column {
	width: 250px;
	margin: 0.5rem;
}
</style>
