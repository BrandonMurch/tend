<template>
	<div class="icon-container">
		<img
			class="menu-icon"
			:class="{ menuIconOpen: !isOpen }"
			src="@/assets/images/MenuIcon.svg"
		/>
		<!-- Close Icon -->
		<!-- https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Adding_vector_graphics_to_the_Web -->
		<svg
			class="menu-icon"
			:class="{ menuIconOpen: isOpen }"
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
	name: "MenuIcon",
	props: { isOpen: Boolean },
};
</script>

<style>
.menu-icon {
	height: 4rem;
	width: 4rem;
	position: absolute;
	right: 2rem;
	top: 1rem;
	opacity: 0;
	transition: opacity 0.5s;
	cursor: pointer;
	fill: #bf763c;
}

.menuIconOpen {
	opacity: 1;
	transition: opacity 0.5s;
	transition-delay: 0.5s;
}
</style>
