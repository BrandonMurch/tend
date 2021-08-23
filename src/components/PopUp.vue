<template>
	<div class="container">
		<div class="background" @click="closePopUp" />
		<!-- Use JavaScript to dynamically set the height and width depending on the image. -->
		<div
			class="popup"
			ref="popUp"
			:style="{ height: popUpHeight, width: popUpWidth }"
		>
			<button class="close" @click="closePopUp">
				<!-- Close icon -->
				<svg
					class="close-icon"
					xmlns="http://www.w3.org/2000/svg"
					width="48"
					height="48"
					viewBox="0 0 48 48"
				>
					<path
						d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z"
					/>
				</svg>
			</button>
			<!-- Resize PopUp on image load -->
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
			</div>
		</div>
	</div>
</template>

<script>
import { debounce } from "../assets/javascript/debounce";

export default {
	name: "PopUp",
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
	created() {
		window.addEventListener("resize", this.debounceUpdateSize);
	},
	unmounted() {
		window.removeEventListener("resize", this.debounceUpdateSize);
	},
	methods: {
		closePopUp() {
			this.$emit("close");
		},
		getPopUpThenResize() {
			/* 
                this.$refs passes all elements with a ref attribute. Then image selects the image ref.
                This way GetElementById is unnecessary. The image is passed in using the target key to
                emulate an event.

                https://vuejs.org/v2/api/#ref
                https://vuejs.org/v2/api/#vm-refs
            */
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
};
</script>

<style scoped>
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
	z-index: 11;
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

.close {
	position: absolute;
	top: 0.5rem;
	right: 0.5rem;
	border: none;
	background: none;
	cursor: pointer;
	z-index: 20;
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
