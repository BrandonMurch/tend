<template>
	<div
		class="notification-bar"
		:class="{ 'notification-bar-open': isOpen }"
		:style="{ 'background-color': colour, right: `${position * 20}%` }"
	>
		<div class="visible-bar" @click="$emit('toggleOpen')">
			<slot name="icon" />
			<h1 class="count">{{ count }}</h1>
			<IconDownArrow class="dropdown" />
		</div>
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
			} else if (props.position == 4) {
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
	transition-duration: 0.1s;
	transition-delay: 1.3s;
}
.join-div-open {
	height: 35px;
	transition-duration: 0.1s;
	transition-delay: 0.15s;
}

.visible-bar {
	display: flex;
	justify-content: space-between;
	position: relative;
	z-index: 4;
}

.notification-bar {
	width: 60%;
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

.link {
	background-color: transparent;
	border: none;
	font-family: fell, sans-serif;
	font-size: 1rem;
	color: #dce0d1;
}

.link-container {
	width: 100%;
	display: block;
	text-align: center;
	padding: 0.5rem;
}

.notification-icon {
	color: #dce0d1;
	margin-left: 1rem;
	height: 3rem;
}

.dropdown {
	float: right;
	margin-right: 0.5rem;
	cursor: pointer;
	color: #dce0d1;
}

.text-container {
	width: 80%;
	padding: 10%;
}

.title {
	text-align: center;
	margin-top: 0;
	color: #dce0d1;
}

.tip {
	margin: 4px;
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
		width: 19%;
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

	.notification-icon {
		margin-left: 0;
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
