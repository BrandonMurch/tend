<template>
	<div :class="{ open: isOpen, container: true }">
		<!-- Named slots, in the future would like to add more parts to the drop down
         https://vuejs.org/v2/guide/components-slots.html#Named-Slots-->
		<slot name="inside" />
	</div>
</template>

<script>
export default {
	name: "DropDown",
	props: {
		isOpen: Boolean,
	},
};
</script>

<style scoped>
.container {
	position: relative;
	left: -10%;
	width: 120%;
	max-height: 0;
	/* https://www.w3schools.com/css/css3_transitions.asp */
	transition: 1s ease-out;
	transition-property: max-height;
	box-shadow: inset 0px 0px 4px 4px grey;
	overflow: hidden;
}

.open {
	max-height: 500px;
	/* Uneven transition times due to the max-height css animation work around. */
	transition: 1s ease-in;
	transition-property: max-height;
	border-top: 1px solid black;
	border-bottom: 1px solid black;
}
</style>
