<template>
	<PopUp @close="$emit('close')">
		<div
			class="content-container"
			:style="{ height: popUpHeight, width: popUpWidth }"
		>
			<img
				class="image"
				:src="imageSource"
				:alt="title"
				@load="updateSizeOfPopUpBasedOnImage"
				ref="image"
			/>
			<div class="text-container">
				<h3 class="title">{{ title }}</h3>
				<h4 class="subtitle">{{ subtitle }}</h4>
				<p class="paragraph">{{ text }}</p>
				<div class="action-container">
					<HeartIcon />
					<MessageIcon />
				</div>
			</div>
		</div>
	</PopUp>
</template>

<script>
import PopUp from "./PopUp.vue";
import HeartIcon from "./HeartIcon.vue";
import MessageIcon from "./MessageIcon.vue";
import { debounce } from "../assets/javascript/debounce";

export default {
	name: "PlantProfilePublic",
	components: { PopUp, HeartIcon, MessageIcon },
	props: {
		imageSource: String,
		title: String,
		subtitle: String,
		text: String,
	},
	data() {
		return {
			popUpHeight: null,
			popUpWidth: null,
			// Cannot put debounce(...) directly in the event
			// listener or it will not be properly destroyed.
			debounceUpdateSize: debounce(this.getPopUpThenResize),
		};
	},
	methods: {
		getPopUpThenResize() {
			this.updateSizeOfPopUpBasedOnImage({ target: this.$refs.image });
		},
		updateSizeOfPopUpBasedOnImage(event) {
			if (window.innerWidth > 800) {
				this.popUpWidth = event.target.width * 2 + "px";
				this.popUpHeight = event.target.height + "px";
			} else {
				this.popUpWidth = event.target.width + "px";
				this.popUpHeight = "auto";
			}
		},
	},
	created() {
		window.addEventListener("resize", this.debounceUpdateSize);
	},
	unmounted() {
		window.removeEventListener("resize", this.debounceUpdateSize);
	},
};
</script>

<style scoped>
.content-container {
	overflow: hidden;
}

.text-container {
	float: right;
	margin-top: 4%;
	width: 49%;
	height: 100%;
	overflow-y: scroll;
}

.title {
	font-size: 2rem;
}

.subtitle {
	font-size: 1.25rem;
}

.title,
.subtitle {
	text-align: center;
	width: 100%;
	margin: 0;
	margin-top: 1rem;
}

.action-container {
	height: 3rem;
	width: 100%;
	position: relative;
	display: flex;
	justify-content: center;
}

@media (min-width: 800px) {
	.popup {
		min-width: 40vw;
		max-width: 80vw;
		max-height: 80vh;
	}

	.image {
		max-width: 40vw;
		max-height: 80vh;
	}

	.text-container {
		width: 44%;
		margin-right: 2%;
	}
}

@media (max-width: 800px) {
	.popup {
		overflow-y: scroll;
		/* min-content adjusts the height to be as small as possible
            https://developer.mozilla.org/en-US/docs/Web/CSS/min-content */
		width: min-content;
		max-height: 90vh;
	}

	.image {
		max-height: 70vh;
		max-width: 80vw;
		position: relative;
	}

	.close {
		fill: #3f463d;
		stroke: black;
	}

	.text-container {
		float: none;
		width: 90%;
		position: relative;
		left: 5%;
	}
}

/* Scrollbar Modifications: https://www.w3schools.com/howto/howto_css_custom_scrollbar.asp */
.popup::-webkit-scrollbar,
.text-container::-webkit-scrollbar {
	width: 4px; /* width of the entire scrollbar */
}

.popup::-webkit-scrollbar-track,
.text-container::-webkit-scrollbar-track {
	background: transparent; /* color of the tracking area */
}

.popup::-webkit-scrollbar-thumb,
.text-container::-webkit-scrollbar-thumb {
	background-color: #bf763c; /* color of the scroll thumb */
	border-radius: 20px; /* roundness of the scroll thumb */
	border: 5px solid transparent; /* creates padding around scroll thumb */
}

.text-container,
.popup {
	scrollbar-width: thin; /* "auto" or "thin" */
	scrollbar-color: #bf763c transparent; /* scroll thumb and track */
}

/* ----------------------------------------------------------------------------------------- */
</style>
