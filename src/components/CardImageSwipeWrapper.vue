<!--
Description: A wrapper for CardImage to enable swiping for mobile devices.

Props:  Refer to CardImage for Prop info.

Emits:
    swipeLeft       Called when a user swipes left on the image.

    swipeRight      Called when a user swipes right on the image.
-->

<template>
	<div class="image-container">
		<CardImage
			@imageLoaded="imageLoaded = true"
			:imageSource="imageSource"
			:actions="actions"
			:title="title"
			@performAction="(type) => $emit('performAction', type)"
			@touchstart="startSwipe"
			@touchend="endSwipe"
		/>
		<IconLeft
			v-if="imageLoaded"
			class="left-icon direction-icon"
			@click="$emit('swipeLeft')"
		/>
		<IconRight
			v-if="imageLoaded"
			class="right-icon direction-icon"
			@click="$emit('swipeRight')"
		/>
	</div>
</template>

<script>
import CardImage from "./CardImage.vue";
import IconLeft from "./Icons/IconLeft.vue";
import IconRight from "./Icons/IconRight.vue";
import { ref } from "vue";

export default {
	name: "CardImageSwipeWrapper",
	components: { CardImage, IconLeft, IconRight },
	props: {
		imageSource: String,
		title: String,
		actions: Array,
	},
	emits: ["swipeLeft", "swipeRight", "performAction"],
	setup(IGNORED, { emit }) {
		let swipeStart = 0;
		const imageLoaded = ref(false);

		const startSwipe = (event) => {
			swipeStart = event.changedTouches[0].clientX;
		};

		// Calculate the difference between the initial touch position, and where the finger lifts up. If this value is negative, it means the user swiped right, otherwise the user swiped left. A buffer of 70 is allowed for small horizontal movements without swiping.
		const endSwipe = (event) => {
			let swipeDifference = swipeStart - event.changedTouches[0].clientX;
			if (swipeDifference < -70) {
				emit("swipeRight");
			} else if (swipeDifference > 70) {
				emit("swipeLeft");
			}
		};

		return { startSwipe, endSwipe, imageLoaded };
	},
};
</script>

<style scoped>
.image-container {
	position: relative;
}

.direction-icon {
	position: absolute;
	top: 50%;
	height: 5rem;
	width: 5rem;
	transform: translate(-20%, -50%);
	cursor: pointer;
	color: #ab6e24;
}

.left-icon {
	left: 0;
	transform: translate(-20%, -50%);
}

.right-icon {
	right: 0;
	transform: translate(10%, -50%);
}

@media (min-width: 851px) {
	.direction-icon {
		display: none;
	}
}
</style>
