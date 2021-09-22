<!--
Description: 
					Uses PopUp to display public facing information about a plant using the PopUp component.
Props: 

	imageSource		The url for the plant's photo.
	title			The plants species.
	subtitle		The plants name.
	text			A bio about the plant. 
	comments 		A list of comments.
	id				The plant's id
	baseId			Since some plants are duplicated for mocking purposes, this 
					is the id off which they are based.
Emits: 
-->

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
			:class="{ 'content-container-mobile': isMobile }"
			:style="{ height: popUpHeight, width: popUpWidth }"
		>
			<img
				:class="getImageClass()"
				:src="imageSource"
				:alt="title"
				@load="updateSizeOfPopUpBasedOnImage"
				ref="imageRef"
			/>
			<div
				class="text-container"
				:class="
					isMobile ? 'text-container-mobile' : 'text-container-full'
				"
			>
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
							addPlantComment(commentText);
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
import { debounce } from "../helpers/debounce";
import PopUpMessage from "./PopUpMessage.vue";
import { ref, onMounted } from "vue";
import windowSizeWatcher from "../composables/windowSizeWatcher";
import { useStore } from "vuex";

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
		id: Number,
		baseId: Number,
	},
	setup(props) {
		const store = useStore();

		const localComments = ref(props.comments);
		const messageActive = ref(false);
		const sizeHasBeenChecked = ref(false);
		const isMobile = ref(false);
		const popUpHeight = ref(null);
		const popUpWidth = ref(null);
		const imageRef = ref(null);

		const submitMessage = (message) => {
			console.log(message);
			messageActive.value = false;
		};

		const addPlantComment = (comment) => {
			store.dispatch("plants/addComment", { id: props.baseId, comment });
			localComments.value = store.getters["plants/comments"](
				props.baseId
			);
		};

		// resize PopUp based on image size/ratio.
		function updateSizeOfPopUpBasedOnImage() {
			const image = imageRef.value;
			sizeHasBeenChecked.value = true;

			if (window.innerWidth <= 1000 || image.width > image.height) {
				isMobile.value = true;
				popUpWidth.value = image.width + "px";
				popUpHeight.value = "auto";
			} else {
				isMobile.value = false;
				popUpWidth.value = image.width * 2 + "px";
				popUpHeight.value = image.height + "px";
			}
		}

		// Used to get inital image size.
		const getImageClass = () => {
			if (!sizeHasBeenChecked.value) {
				return "unset-image";
			} else if (!isMobile.value) {
				return "image-full";
			} else {
				return "image-mobile";
			}
		};

		// Cannot put debounce(...) directly in the event
		// listener or it will not be properly destroyed.
		const debounceUpdateSize = debounce(updateSizeOfPopUpBasedOnImage);
		windowSizeWatcher(debounceUpdateSize);

		onMounted(() => {
			updateSizeOfPopUpBasedOnImage();
		});

		return {
			localComments,
			messageActive,
			isMobile,
			popUpHeight,
			popUpWidth,
			imageRef,
			submitMessage,
			addPlantComment,
			getImageClass,
		};
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

.unset-image {
	max-width: 90vw;
	max-height: 70vh;
}

.image-full {
	position: absolute;
	max-width: 50%;
	max-height: 100%;
}

.text-container-full {
	width: 44%;
	margin-right: 2%;
}

.content-container-mobile {
	overflow-y: scroll;
	/* min-content adjusts the height to be as small as possible
            https://developer.mozilla.org/en-US/docs/Web/CSS/min-content */
	width: min-content;
	max-height: 90vh;
}

.image-mobile {
	max-height: 70vh;
	max-width: 90vw;
	position: relative;
}

.close-mobile {
	fill: #3f463d;
	stroke: black;
}

.text-container-mobile {
	float: none;
	width: 90%;
	position: relative;
	left: 5%;
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
