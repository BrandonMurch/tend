<template>
	<div class="icon-container">
		<div class="slot-container icon" :class="{ displayIcon: !isOpen }">
			<slot />
		</div>

		<!-- Close Icon -->
		<!-- https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Adding_vector_graphics_to_the_Web -->
		<svg
			class="icon"
			:class="{ displayIcon: isOpen }"
			xmlns="http://www.w3.org/2000/svg"
			width="48"
			height="48"
			viewBox="0 0 48 48"
		>
			<path
				d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z"
			/>
		</svg>
	</div>
</template>

<script>
export default {
	name: "CloseIcon",
	props: { isOpen: Boolean },
};
</script>

<style scoped>
.icon-container {
	position: relative;
	height: 100%;
}

.icon-container:hover {
	transform: scale(1.1);
	transition: 0.4s;
}

.icon {
	height: 100%;
	width: 100%;
	opacity: 0;
	transition: opacity 0.5s;
	cursor: pointer;
	fill: #bf763c;
	position: absolute;
	top: 0;
	left: 0;
}

.displayIcon {
	opacity: 1;
	transition: opacity 0.5s;
	transition-delay: 0.5s;
}
</style>
