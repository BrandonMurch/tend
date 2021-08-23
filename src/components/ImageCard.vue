<template>
	<!-- 
        Wait until image is loaded before loading borders, overlay and text.
        https://www.geeksforgeeks.org/how-to-check-an-image-is-loaded-or-not-in-vuejs/
    -->
	<div :class="{ imageContainer: isLoaded }">
		<img class="image" :src="imageSource" :alt="title" @load="onLoaded" />
		<div v-if="isLoaded" class="image-overlay">
			<p class="image-hover-text">{{ title }}</p>
		</div>
	</div>
</template>

<script>
export default {
	name: "ImageCard",
	props: {
		imageSource: String,
		title: String,
	},
	emits: ["imageLoaded"],
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
.imageContainer {
	position: relative;
	width: 250px;
	border: 3px solid #b87d4b;
	border-radius: 20px;
	box-shadow: 0 5px 5px grey;
	margin-bottom: 1rem;
	overflow: hidden;
}

.image {
	width: 100%;
	/* 
        There was a small gap that was appearing at the bottom of my images. It seems that the browser treats
        an image as text. So I used vertical-align to stop this, as discussed here:

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
}

.image-overlay:hover {
	background-color: rgba(0, 0, 0, 0.3);
	cursor: pointer;
}

.image-hover-text {
	display: none;
}

/* Display when card is hovered. */
.image-overlay:hover .image-hover-text {
	display: inline;
	position: absolute;
	bottom: 10%;
	left: 5%;
	text-align: center;
	width: 90%;
	color: white;
	font-size: 2rem;
	margin: 0;
}
</style>
