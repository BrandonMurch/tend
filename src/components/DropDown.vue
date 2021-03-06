<!--
Description:  	A higher order function that renders any of its children within
				a drop down menu. Handles animation. Use an external button to 
				modify the isOpen prop to open/close component.

Props: 

	isOpen		Is the drop down open? Open and close by changing this prop.

	insetShadow	Change the visual of the dropDown to include an inset shadow.

-->

<template>
	<div class="container" :class="{ shadow: insetShadow }" ref="container">
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
		insetShadow: {
			default: false,
			type: Boolean,
		},
	},
	setup(props) {
		const contents = ref(null);
		const container = ref(null);

		// Set the height of the dropdown dynamically to fit the childrens size. This is because height:auto is not affected by transition styles.
		const updateHeight = () => {
			let duration = 1.5;

			container.value.style.transition = `${duration}s ease-in-out`;

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
		};
	},
};
</script>

<style scoped>
.container {
	position: relative;
	/* Container should be larger than its parent to hide left and right inset shadows. */
	left: -10%;
	width: 120%;
	overflow: hidden;
	/* Hide until javascript loads */
	height: 0;
}

.shadow {
	box-shadow: inset 0px 0px 4px 4px grey;
}
</style>
