<!-- Uses PopUp to display public facing information about a plant. Necessary
information is passed in as props. -->

<template>
	<!-- Display box to send message on MessageIconClick. Replaces PopUp.  -->
	<PopUpMessage
		v-if="messageActive"
		@cancel="messageActive = false"
		@send="submitMessage"
	/>
	<PopUp v-else @close="$emit('close')">
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
					<MessageIcon @message="messageActive = true" />
				</div>
				<CardListWithTextbox
					buttonText="add comment"
					:values="localComments"
					@add="
						(commentText) => {
							newComment = {
								id:
									localComments.length > 0
										? localComments[0].id + 1
										: 1001,
								datetime: new Date(),
								body: commentText,
							};
							localComments = [newComment, ...localComments];
							addPlantComment(newComment);
						}
					"
					@delete="
						(commentId) => {
							localComments = [
								...localComments.filter(
									(comment) => comment.id != commentId
								),
							];
							deletePlantComment(commen);
						}
					"
				/>
			</div>
		</div>
	</PopUp>
</template>

<script>
import PopUp from "./PopUp.vue";
import HeartIcon from "./Icons/IconHeart.vue";
import MessageIcon from "./Icons/IconMessage.vue";
import CardListWithTextbox from "./CardListWithTextbox.vue";
import {
	addPlantComment,
	deletePlantComment,
} from "../composables/mockPlantData";

import { debounce } from "../helpers/debounce";
import PopUpMessage from "./PopUpMessage.vue";

export default {
	name: "PlantProfilePublic",
	components: {
		PopUp,
		PopUpMessage,
		HeartIcon,
		MessageIcon,
		CardListWithTextbox,
	},
	props: {
		imageSource: String,
		title: String,
		subtitle: String,
		text: String,
		comments: Array,
	},
	data() {
		return {
			localComments: this.comments,
			messageActive: false,
			popUpHeight: null,
			popUpWidth: null,
			// Cannot put debounce(...) directly in the event
			// listener or it will not be properly destroyed.
			debounceUpdateSize: debounce(this.updateSizeOfPopUpBasedOnImage),
		};
	},
	methods: {
		submitMessage(message) {
			this.messageActive = false;
			console.log(message);
		},
		addPlantComment(comment) {
			console.log(comment);
			addPlantComment(comment);
		},
		deletePlantComment(id) {
			deletePlantComment(id);
		},
		updateSizeOfPopUpBasedOnImage() {
			const image = this.$refs.image;
			if (window.innerWidth > 800) {
				this.popUpWidth = image.width * 2 + "px";
				this.popUpHeight = image.height + "px";
			} else {
				this.popUpWidth = image.width + "px";
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
	max-height: 95vh;
	max-width: 95vw;
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
	position: relative;
	display: flex;
	justify-content: center;
	margin: 1rem 0 2rem 0;
}

@media (min-width: 800px) {
	.popup {
		min-width: 40vw;
		max-width: 80vw;
		max-height: 80vh;
	}

	.image {
		position: absolute;
		max-width: 40vw;
		max-height: 80vh;
	}

	.text-container {
		width: 44%;
		margin-right: 2%;
	}
}

@media (max-width: 800px) {
	.content-container {
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

.content-container::-webkit-scrollbar,
.text-container::-webkit-scrollbar {
	width: 4px; /* width of the entire scrollbar */
}

.content-container::-webkit-scrollbar-track,
.text-container::-webkit-scrollbar-track {
	background: transparent; /* color of the tracking area */
}

.content-container::-webkit-scrollbar-thumb,
.text-container::-webkit-scrollbar-thumb {
	background-color: #bf763c; /* color of the scroll thumb */
	border-radius: 20px; /* roundness of the scroll thumb */
	border: 5px solid transparent; /* creates padding around scroll thumb */
}

.text-container,
.content-container {
	scrollbar-width: thin; /* "auto" or "thin" */
	scrollbar-color: #bf763c transparent; /* scroll thumb and track */
}

/* ----------------------------------------------------------------------------------------- */
</style>
