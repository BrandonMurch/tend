<!--
Description: Styling for the notification bars.
Props: 
	colour  	The colour of the notification bar in hexadecimal.

	isOpen		Boolean. Whether the notification bar is open or closed.

	position 	Number. The position within the bar. Used to offset the 
				notification bar due to necesssary absolute position. 

	count 		Number. The number of active notifications within the bar.

Emits: 
	toggleOpen 	Toggles the notification bar open and close.
-->

<template>
	<div
		class="notification-bar"
		:class="{ 'notification-bar-open': isOpen }"
		:style="{
			'background-color': colour,
			/* Dynamically offset the notification bar based on the position. */
			right: `${position * (100 / 6)}%`,
		}"
	>
		<div class="visible-bar" @click="$emit('toggleOpen')">
			<slot name="icon" />
			<h1 v-if="count" class="count">{{ count }}</h1>
			<IconDownArrow class="dropdown" />
		</div>
		<!-- A small connector between the dropdown and the bar. It makes it look like the bar is extending into the drop down.  -->
		<div
			class="join-div"
			:class="{ 'join-div-open': isOpen }"
			:style="{ 'background-color': colour }"
		></div>
		<div class="desktop-drop">
			<DropDown :isOpen="isOpen" :shadow="false">
				<template v-slot:inside>
					<slot name="content" />
				</template>
			</DropDown>
		</div>
	</div>
	<div
		class="mobile-drop-container"
		:style="{
			'background-color': colour,
			/* If the left most or right most tabs are open, those corners shouldn't be rounded.  */
			'border-radius': configureCornerRadius(),
		}"
	>
		<DropDown :isOpen="isOpen" :shadow="false">
			<template v-slot:inside>
				<slot name="content" />
			</template>
		</DropDown>
	</div>
</template>

<script>
import IconDownArrow from "./Icons/IconDownArrow.vue";
import DropDown from "./DropDown.vue";
export default {
	name: "NotificationShape",
	components: {
		IconDownArrow,
		DropDown,
	},
	props: {
		colour: String,
		isOpen: Boolean,
		position: Number,
		count: Number,
	},
	emits: ["toggleOpen"],
	setup(props) {
		const configureCornerRadius = () => {
			if (props.position == 0) {
				return "20px 0 20px 20px";
			} else if (props.position == 5) {
				return "0 20px 20px 20px";
			}
			return "20px";
		};
		return {
			configureCornerRadius,
		};
	},
};
</script>

<style scoped>
.join-div {
	position: absolute;
	top: 1.5rem;
	background-color: #3d6b56;
	width: 100%;
	height: 0;
	z-index: 2;
	transition-duration: 0.3s;
	transition-delay: 1.3s;
	transition-timing-function: ease-in-out;
}
.join-div-open {
	height: 2rem;
	transition-duration: 0.1s;
	transition-delay: 0.1s;
}

.visible-bar {
	display: flex;
	justify-content: space-between;
	position: relative;
	z-index: 4;
}

.notification-bar {
	width: 80%;
	min-height: 3rem;
	height: min-content;
	border-radius: 30px;
	overflow: hidden;
	box-shadow: 2px 5px 10px gray;
	margin: 0.2rem;
	transition-delay: 1.5s;
	transition-duration: 0.4s;
	position: relative;
	transition-property: border-radius;
}

.dropdown {
	float: right;
	margin-right: 0.5rem;
	cursor: pointer;
	color: #dce0d1;
}

.mobile-drop-container {
	position: relative;
	top: 3.7rem;
	width: 99%;
	background-color: #3d6b56;
	border-radius: 20px;
	z-index: 5;
}

.count {
	color: #dce0d1;
	width: 2rem;
	display: inline-block;
	margin: 0 1rem;
}

@media (max-width: 850px) {
	.notification-bar {
		width: 16%;
		overflow: visible;
		position: absolute;
	}

	.notification-bar-open {
		border-radius: 22px 22px 0 0;
		transition-delay: 0s;
		transition-duration: 0.2s;
		transition-property: border-radius;
	}

	.dropdown {
		display: none;
	}

	.visible-bar {
		justify-content: center;
	}

	.desktop-drop {
		display: none;
	}

	.count {
		margin: 0;
		margin-right: 10%;
		text-align: center;
	}
}
@media (min-width: 850px) {
	.mobile-drop-container {
		display: none;
	}
	.join-div {
		display: none;
	}
	.notification-bar {
		right: 0 !important;
	}
}
</style>
