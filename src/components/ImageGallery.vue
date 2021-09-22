<!-- Once the bottom of the page is reached, 'moreImages' will be emitted. A slot is
provided for a special card to be placed in the first place of the first column. -->

<!--
Description: 		Presents images within the space given. Arranges the image 
					into columns. 

Props: 
	images			An array of image objects, including an image url, and 	
					optional actions and title.

	includeActions	Boolean. Whether or not to include action buttons with the 
					images

Emits: 

	moreImages		Emitted upon reaching the bottom of the gallery. A request 
					for more images if they are available.

	itemClick		Emitted when a card is clicked. Returns the image object 					from that card.
			
	performAction	Call performaction if actions were included. Returns an 
					object with an id and action.

Slots:
	default 	Places an element in the first spot of the first column.
-->

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
				@imageLoaded="() => setAllImagesLoadedIfTrue(images)"
				@imageClick="$emit('itemClick', image)"
				:actions="includeActions ? image.actions : []"
				style="width:250px"
				@performAction="
					(action) => $emit('performAction', { id: image.id, action })
				"
			/>
		</div>
	</div>
	<!-- Only display once all images are loaded, to prevent hitting it initially -->
	<div
		v-show="allImagesLoaded"
		class="reload-trigger"
		ref="reloadTrigger"
	></div>
</template>

<script>
import ImageCard from "./CardImage.vue";
import { debounce } from "../helpers/debounce.js";
import { ref, watch, onMounted, onUnmounted } from "vue";
import windowSizeWatcher from "../composables/windowSizeWatcher";
import arrangeImages from "../composables/arrangeImages";

export default {
	name: "ImageGallery",
	components: {
		ImageCard,
	},
	props: {
		images: Array,
		includeActions: {
			type: Boolean,
			default: false,
		},
	},
	emits: ["itemClick", "moreImages", "performAction"],

	setup(props, { emit }) {
		let observer = null;
		const reloadTrigger = ref(null);

		const {
			container,
			allImagesLoaded,
			updateColumns,
			setAllImagesLoadedIfTrue,
			imageColumns,
		} = arrangeImages();

		const debounceUpdateSize = debounce(() => updateColumns(props.images));
		windowSizeWatcher(debounceUpdateSize);

		// When I only used props.images instead of () => props.images, watch wouldn't be triggered by props changes.
		watch(
			() => props.images,
			(currentValue) => {
				updateColumns(currentValue);
			}
		);

		// Must wait until mounted to create observer. Otherwise reloadTrigger will not have been attached to element.
		onMounted(() => {
			observer = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting === true) {
					emit("moreImages");
				}
			});

			observer.observe(reloadTrigger.value);
			updateColumns(props.images);
		});

		onUnmounted(() => {
			observer.disconnect();
		});

		return {
			reloadTrigger,
			setAllImagesLoadedIfTrue,
			container,
			allImagesLoaded,
			imageColumns,
		};
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
