<!-- Presents images within the space given. Arranges the image into columns. Once the bottom of the page is reached, 'moreImages' will be emitted. A slot is
provided for a special card to be placed in the first place of the first column. -->

<template>
	<div ref="container" class="gallery-container">
		<div
			class="gallery-column"
			v-for="(column, index) in imageColumns"
			:key="index"
		>
			<slot v-if="index == 0" />
			<ImageCard
				v-for="image in column"
				:key="image.id"
				v-bind="image"
				@imageLoaded="setAllImagesLoadedIfTrue"
				@click="$emit('itemClick', image)"
			/>
		</div>
	</div>
	<!-- Only display once all images are loaded, to prevent hitting it initially -->
	<div v-show="allImagesLoaded" class="reload-trigger" ref="reload"></div>
</template>

<script>
import ImageCard from "./CardImage.vue";
import { debounce } from "../helpers/debounce.js";

export default {
	name: "ImageGallery",
	components: {
		ImageCard,
	},
	props: {
		images: Array,
	},
	emits: ["itemClick", "moreImages"],

	/*
        Lifecycle hooks are used to create global event listeners. When the component is unmounted, the listener will be removed to prevent memory leaks.

        https://vuejs.org/v2/api/#Options-Lifecycle-Hooks
        https://vuejs.org/v2/api/#created
        https://vuejs.org/v2/api/#mounted
        https://www.w3schools.com/js/js_htmldom_eventlistener.asp
    */
	created() {
		window.addEventListener("resize", this.debounceUpdateSize);
	},
	mounted() {
		// Div with the reload ref is loaded at the bottom of the screen. Once this "intersects" the viewport (is displayed in the viewport) it will emit 'moreImages'. Ask for more images.
		// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
		this.observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting === true) {
				this.$emit("moreImages");
			}
		});

		this.observer.observe(this.$refs.reload);

		this.updateColumns();
	},
	unmounted() {
		window.removeEventListener("resize", this.debounceUpdateSize);
		this.observer.disconnect();
	},
	methods: {
		setAllImagesLoadedIfTrue() {
			this.loadedImages++;
			if (this.loadedImages === this.images.length) {
				this.allImagesLoaded = true;
			}
		},
		updateColumns() {
			this.loadedImages = 0;

			this.initialiseColumns();
			this.splitImagesIntoColumns();
		},

		// Find the width of the galleries current container. Find how many columns can fit inside and initialise the array.
		initialiseColumns() {
			const pageMargins = 30;
			const cardWidth = 265;
			this.numberOfColumns = Math.floor(
				(this.$refs.container.clientWidth - pageMargins) / cardWidth
			);
			if (this.numberOfColumns == 0) {
				this.numberOfColumns = 1;
			}
			const columnQueue = [];
			for (let i = 0; i < this.numberOfColumns; i++) {
				columnQueue[i] = [];
			}

			this.imageColumns = columnQueue;
		},

		// Split images into a 2d array of columns first, then images.
		splitImagesIntoColumns() {
			for (let i = 0; i < this.images.length; i++) {
				this.imageColumns[i % this.numberOfColumns].push(
					this.images[i]
				);
			}

			for (let i = 0; i < this.numberOfColumns; i++) {
				this.imageColumns[i].push();
			}
		},
	},
	data() {
		return {
			numberOfColumns: 0,
			imageColumns: [],
			observer: null,
			loadedImages: 0,
			allImagesLoaded: false,
			// Use data to properly remove event listener;
			debounceUpdateSize: debounce(this.updateColumns),
		};
	},
	watch: {
		// Regenerate columns whenever more images are loaded
		images: function() {
			this.updateColumns();
		},
	},
};
</script>

<style scoped>
.gallery-container {
	margin: auto;
	display: flex;
	width: 100%;
	justify-content: center;
}

.gallery-column {
	margin: 0.5rem;
}

.reload-trigger {
	width: 100vw;
	height: 20px;
}
</style>
