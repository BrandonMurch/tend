<template>
	<div class="container">
		<div class="option">
			{{ option1.text }}
		</div>
		<div
			class="slide-container"
			role="button"
			:aria-label="
				'Toggle between ' + option1.text + ' and ' + option2.text
			"
			@click="
				$emit(
					'update:modelValue',
					value == option2.value ? option1.value : option2.value
				)
			"
		>
			<div class="slide"></div>
			<div
				class="circle"
				:class="value == option2.value ? 'right' : 'left'"
			></div>
		</div>
		<div class="option">
			{{ option2.text }}
		</div>
		<!-- https://developers.google.com/web/fundamentals/accessibility/semantics-aria/ -->
		<div :aria-label="'Selected: ' + value"></div>
	</div>
</template>

<script>
export default {
	name: "InputSlider",
	props: {
		value: String,
		option1: Object,
		option2: Object,
	},
	setup() {},
};
</script>

<style scoped>
.container {
	position: relative;
	height: 4rem;
	display: flex;
}

.slide-container {
	width: 2.5rem;
	position: relative;
	cursor: pointer;
	margin: 0 1rem;
}

.slide {
	position: absolute;
	top: 1.75rem;
	width: 100%;
	height: 0.5rem;
	width: 100%;
	background-color: grey;
	border-radius: 4px;
	box-shadow: inset 0px 0px 1px 1px black;
}

/* https://www.w3schools.com/howto/howto_css_circles.asp */
.circle {
	position: absolute;
	top: 1.5rem;
	width: 1rem;
	height: 1rem;
	background-color: #b87d4b;
	border-radius: 50%;
	display: inline-block;
	box-shadow: 0px 0px 1px 1px gray;
}

.left {
	left: 0;
}

.right {
	right: 0;
}

.option {
	line-height: 4rem;
	text-transform: lowercase;
}
</style>
