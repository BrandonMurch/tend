<template>
	<div class="gallery-container">
		<div
			class="gallery-column"
			v-for="(column, index) in imageColumns"
			:key="index"
		>
			<!-- eslint-disable-next-line vue/no-unused-vars -->
			<ImageCard
				v-for="image in column"
				:key="image.id"
				v-bind="image"
				@imageLoaded="countLoads"
				@click="$emit('itemClick', image)"
			/>
		</div>
	</div>
	<div v-show="allImagesLoaded" class="reload-trigger" ref="reload"></div>
</template>

<script>
import ImageCard from "./ImageCard.vue";
import { debounce } from "../assets/javascript/debounce";

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
		this.updateColumns();
	},
	mounted() {
		// When the bottom of the screen is reached. Load more images.
		// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
		this.observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting === true) {
				this.$emit("moreImages");
			}
		});

		this.observer.observe(this.$refs.reload);
	},
	unmounted() {
		window.removeEventListener("resize", this.debounceUpdateSize);
		this.observer.disconnect();
	},
	methods: {
		countLoads() {
			// Once all images are loaded in the initial round, then the element to trigger loading more images will be displayed. This is only a concern where there are no elements on the screen, and would trigger more images automatically.
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

		initialiseColumns() {
			const body_margins = 30;
			this.columns = Math.floor((window.innerWidth - body_margins) / 265);
			const columnQueue = [];
			for (let i = 0; i < this.columns; i++) {
				columnQueue[i] = [];
			}

			this.imageColumns = columnQueue;
		},

		// Split images into a 2d array of columns first, then images.
		splitImagesIntoColumns() {
			for (let i = 0; i < this.images.length; i++) {
				this.imageColumns[i % this.columns].push(this.images[i]);
			}

			for (let i = 0; i < this.columns; i++) {
				this.imageColumns[i].push();
			}
		},
	},
	data() {
		return {
			columns: 0,
			imageColumns: [],
			observer: null,
			loadedImages: 0,
			allImagesLoaded: false,
			// Use data to properly remove event listener;
			debounceUpdateSize: debounce(this.updateColumns),
		};
	},
	watch: {
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
}

.gallery-column {
	margin: 0.5rem;
}

.reload-trigger {
	width: 100vw;
	height: 20px;
}
</style>
