<template>
	<div
		:class="{ open: isOpen, container: true }"
		ref="container"
		:style="{ height: height }"
	>
		<div ref="contents">
			<!-- Named slots, in the future would like to add more parts to the drop down
			https://vuejs.org/v2/guide/components-slots.html#Named-Slots-->
			<slot name="inside" />
		</div>
	</div>
</template>

<script>
import { onUpdated, ref } from "vue";

export default {
	name: "DropDown",
	props: {
		isOpen: Boolean,
	},
	setup(props) {
		const contents = ref(null);
		const container = ref(null);
		let height = ref(0);

		const updateHeight = () => {
			container.value.style.height = props.isOpen
				? contents.value.clientHeight + "px"
				: 0;
		};

		onUpdated(() => {
			updateHeight();
		});

		return {
			contents,
			container,
			height,
		};
	},
};
</script>

<style scoped>
.container {
	position: relative;
	left: -10%;
	width: 120%;
	/* https://www.w3schools.com/css/css3_transitions.asp */
	transition: 1.5s ease-in-out;
	transition-property: height;
	box-shadow: inset 0px 0px 4px 4px grey;
	overflow: hidden;
}

.open {
	/* Uneven transition times due to the max-height css animation work around. */
	transition: 1.5s ease-in-out;
	transition-property: height;
	border-top: 1px solid black;
	border-bottom: 1px solid black;
}
</style>

// https://markus.oberlehner.net/blog/refs-and-the-vue-3-composition-api/
