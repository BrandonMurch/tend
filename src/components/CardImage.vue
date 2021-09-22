<!--
Description: 		Presents an image inside a card. Hover for darker overlay 
					if title is provided.

Props: 				
	imageSource		URL for image file to be displayed.
	
	title			Title to be displayed within the overlay.

	actions			Possible actions from this image card. These will be 
					displayed in the form of a clickable icon. So far there is 
					"water", "repot" and "fertilize".
Emits: 
	imageLoaded		Called when the image has loaded. Useful for keeping track 					of when all images have loaded in a gallery.

	performAction 	When an action button is called. Will return the action type

	imageClick		Called when the image is clicked.
-->

<template>
	<!-- 
        Wait until image is loaded before loading borders, overlay and text.
        https://www.geeksforgeeks.org/how-to-check-an-image-is-loaded-or-not-in-vuejs/
    -->
	<div :class="{ imageContainer: isLoaded, hiddenContainer: !isLoaded }">
		<img class="image" :src="imageSource" :alt="title" @load="onLoaded" />

		<div
			v-if="isLoaded && title"
			class="image-overlay"
			@click="$emit('imageClick')"
		>
			<p class="image-hover-text">{{ title }}</p>
		</div>

		<IconBarAction
			:actions="actions"
			v-if="isLoaded"
			@performAction="(type) => $emit('performAction', type)"
			class="icon-bar"
		/>
	</div>
</template>

<script>
import IconBarAction from "./IconBarAction.vue";

export default {
	name: "ImageCard",
	components: { IconBarAction },
	props: {
		imageSource: String,
		title: String,
		actions: Array,
	},
	emits: ["imageLoaded", "performAction", "imageClick"],
	data() {
		return {
			isLoaded: false,
		};
	},
	methods: {
		onLoaded() {
			this.isLoaded = true;
			this.$emit("imageLoaded");
		},
	},
};
</script>

<style scoped>
.hiddenContainer {
	height: 0;
}

.imageContainer {
	position: relative;
	width: 100%;
	border: 3px solid #b87d4b;
	border-radius: 20px;
	box-shadow: 0 5px 5px grey;
	margin-bottom: 1rem;
	overflow: hidden;
}

.image {
	width: 100%;
	/* 
        There was a small gap that was appearing at the bottom of my images. It seems that the browser treats an image as text. So I used vertical-align to stop this, as discussed here:

        https://stackoverflow.com/questions/10844205/html-5-strange-img-always-adds-3px-margin-at-bottom 
        */
	vertical-align: middle;
}

.image-overlay {
	/* Fill parent completely */
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	transition: 0.7s;
}

.image-overlay:hover {
	background-color: rgba(0, 0, 0, 0.3);
	cursor: pointer;
	transition: 0.7s;
}

.image-hover-text {
	opacity: 0;
	color: white;
	font-size: 2rem;
}

/* Display when card is hovered. */
.image-overlay:hover .image-hover-text {
	display: inline;
	opacity: 1;
	position: absolute;
	bottom: 10%;
	left: 5%;
	text-align: center;
	width: 90%;
	margin: 0;

	transition: 0.7s;
}

.icon-bar {
	position: absolute;
	top: 0;
	left: 0;
}
</style>
