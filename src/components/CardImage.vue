<!-- Presents an image inside a card. Hover for the title. Emits "imageLoaded" for keeping track of when all images are loaded on the page.
 -->

<template>
	<!-- 
        Wait until image is loaded before loading borders, overlay and text.
        https://www.geeksforgeeks.org/how-to-check-an-image-is-loaded-or-not-in-vuejs/
    -->
	<div :class="{ imageContainer: isLoaded, hiddenContainer: !isLoaded }">
		<slot v-if="isLoaded" />
		<img class="image" :src="imageSource" :alt="title" @load="onLoaded" />
		<div v-if="isLoaded" class="image-overlay">
			<p class="image-hover-text">{{ title }}</p>
		</div>
		<div
			v-if="actions.includes('water')"
			class="water-icon"
			@click="() => performAction('water', 'watered')"
			:style="{
				left: `${actions.indexOf('water') * 3}rem`,
			}"
		>
			<IconWater class="inner-icon" />
		</div>
		<div
			v-if="actions.includes('repot')"
			class="pot-icon"
			@click="() => performAction('repot', 'repotted')"
			:style="{
				left: `${actions.indexOf('repot') * 3}rem`,
			}"
		>
			<IconFlowerPot class="inner-icon" />
		</div>
		<div
			v-if="actions.includes('fertilize')"
			class="mushroom-icon"
			@click="() => performAction('fertilize', 'fertilized')"
			:style="{
				left: `${actions.indexOf('fertilize') * 3}rem`,
			}"
		>
			<IconMushroom class="inner-icon" />
		</div>
	</div>
</template>

<script>
import IconWater from "./Icons/IconWater.vue";
import IconMushroom from "./Icons/IconMushroom.vue";
import IconFlowerPot from "./Icons/IconFlowerPot.vue";

export default {
	name: "ImageCard",
	components: { IconWater, IconMushroom, IconFlowerPot },
	props: {
		imageSource: String,
		title: String,
		actions: Array,
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
		performAction(type, verb) {
			if (confirm(`Have you ${verb} your plant?`)) {
				actions = actions.filter((action) => action != type);
			}
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

.water-icon,
.pot-icon,
.mushroom-icon {
	position: absolute;
	border-radius: 50%;
	top: 0;
	height: 3rem;
	width: 3rem;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-content: center;
}

.water-icon {
	background-color: #136e9e;
	left: 0;
}
.pot-icon {
	background-color: #bf763c;
	left: 4rem;
}
.mushroom-icon {
	background-color: #bf763c;
	left: 8rem;
}

.inner-icon {
	height: 3rem;
}
</style>
