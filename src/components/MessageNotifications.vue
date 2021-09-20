<template>
	<NotificationShape
		:position="position"
		:count="messages.length"
		:isOpen="isOpen"
		@toggleOpen="$emit('toggleOpen')"
		colour="#666666"
	>
		<template v-slot:icon>
			<IconEnvelope class="notification-icon" />
		</template>
		<template v-slot:content>
			<div
				class="link-container"
				v-for="message of messages"
				:key="message.id"
			>
				<button class="link" @click="activeMessage = message">
					{{
						message.sender +
							" " +
							getFormattedDate(message.datetime)
					}}
				</button>
			</div>
		</template>
	</NotificationShape>

	<teleport to="body">
		<PopUp v-if="activeMessage != null" @close="activeMessage = null">
			<div class="message-container">
				<h1>From: {{ activeMessage.sender }}</h1>
				<h3>Sent at {{ getFormattedDate(activeMessage.datetime) }}</h3>
				<p>{{ activeMessage.body }}</p>
				<Input type="textarea" v-model="response" />
				<Button
					class="send-button"
					@click="() => sendmessage(constructResponse())"
				>
					send
				</Button>
				<Button deleteButton @click="deleteMessage"> delete </Button>
			</div>
		</PopUp>
	</teleport>
</template>

<script>
import PopUp from "./PopUp.vue";
import NotificationShape from "./NotificationShape.vue";
import IconEnvelope from "./Icons/IconEnvelope.vue";
import Input from "./AppInput.vue";
import Button from "./AppButton.vue";
import { ref } from "vue";
import { useStore } from "vuex";
import { sendMessage } from "../composables/mockMessages";
import { getFormattedDate } from "../composables/getFormattedDate";
export default {
	name: "MessageNotifications",
	components: {
		IconEnvelope,
		PopUp,
		Input,
		Button,
		NotificationShape,
	},
	emits: ["toggleOpen"],
	props: {
		position: Number,
		isOpen: Boolean,
	},
	setup() {
		const response = ref("");
		const activeMessage = ref(null);

		const store = useStore();
		const messages = ref([]);
		messages.value = store.getters["messages/all"];
		const deleteMessage = () => {
			if (
				confirm("Are you sure you would like to delete this message?")
			) {
				store.commit("messages/deleteMessage", activeMessage.value.id);
				messages.value = store.getters["messages/all"];
				activeMessage.value = null;
			}
		};

		const constructResponse = () => {
			return {
				receiver: activeMessage.value.sender,
				body: response,
				datetime: new Date(),
			};
		};

		return {
			response,
			sendMessage,
			activeMessage,
			constructResponse,
			getFormattedDate,
			deleteMessage,
			messages,
		};
	},
};
</script>

<style scoped>
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

.message-container {
	max-width: 60vw;
	margin: 3rem;
}

.send-button {
	float: right;
	margin-bottom: 1.5rem;
}

@media (max-width: 850px) {
	.notification-icon {
		margin-left: 15%;
	}
}
</style>
