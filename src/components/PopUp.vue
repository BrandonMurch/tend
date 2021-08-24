<template>
	<div :class="{ container: !scrollable }">
		<div :class="{ background: !scrollable }" @click="close" />
		<div class="popup" :class="{ scrollPopup: scrollable }" ref="popUp">
			<CloseIcon
				v-if="closable"
				class="close"
				:isOpen="true"
				@click="close"
			/>
			<slot />
		</div>
	</div>
</template>

<script>
import CloseIcon from "./IconClose.vue";

export default {
	name: "PopUp",
	components: { CloseIcon },
	props: {
		closable: {
			default: true,
			type: Boolean,
		},
		scrollable: {
			default: false,
			type: Boolean,
		},
	},
	methods: {
		close() {
			if (this.closable) {
				this.$emit("close");
			}
		},
	},
};
</script>

<style scoped>
h3,
h4,
p {
	color: #3f463d;
}

.container {
	/* Cover entire screen, ignore scrolling */
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 10;
	transition: 0.7s;
}

.background {
	/* Fill container */
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.3);
	z-index: 10;
}

.popup {
	position: relative;
	background-color: #dce0d1;
	border-radius: 20px;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	z-index: 25;
	overflow: hidden;
}

.scrollPopup {
	position: absolute;
	top: 50vh;
	left: 50vw;
	transform: translate(-50%, -50%);
}

.close {
	position: absolute;
	top: 0.5rem;
	right: 0.5rem;
	height: 3rem;
	width: 3rem;
	z-index: 20;
}
</style>
