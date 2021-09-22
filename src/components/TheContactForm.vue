<!-- SINGLETON. The view for the contact page. Contains a form that allows the
user to submit a message to tend. -->

<template>
	<div class="contact-container">
		<form
			class="form"
			id="contactForm"
			@submit.stop.prevent="onSubmit"
			@reset="resetForm"
			:class="{ submitted: hasSubmitted }"
		>
			<h1 class="contact-title">Send us a message!</h1>

			<Input
				v-for="input in getInputs()"
				:key="input.label"
				v-bind="input"
				v-model="formData[input.dataName]"
				required
			/>

			<div class="button-container">
				<Button
					class="button"
					:type="'submit'"
					:form="'contactForm'"
					@click="hasSubmitted = true"
				>
					submit
				</Button>
				<Button class="button" :type="'reset'" :form="'contactForm'">
					reset
				</Button>
			</div>
		</form>
	</div>
</template>

<script>
import Button from "./AppButton.vue";
import Input from "./AppInput.vue";

const inputs = [
	{
		label: "Name:",
		dataName: "name",
		size: "half",
	},
	{
		label: "email:",
		type: "email",
		dataName: "email",
		size: "half",
	},

	{
		label: "Message Type:",
		type: "select",
		options: [
			{ text: "Account", value: "account" },
			{
				text: "Report Offensive Content",
				value: "offensive",
			},
			{ text: "Bug Finding", value: "bug" },
			{ text: "Other", value: "misc" },
		],
		dataName: "messageType",
	},
	{
		label: "message:",
		type: "textarea",
		dataName: "message",
	},
];

const getDefaultForm = () => {
	return {
		name: "",
		email: "",
		message: "",
		messageType: "",
	};
};

export default {
	name: "ContactForm",
	components: { Button, Input },
	data() {
		return {
			formData: getDefaultForm(),
			hasSubmitted: false,
		};
	},
	methods: {
		getInputs() {
			return inputs;
		},
		resetForm() {
			this.hasSubmitted = false;
			this.dataForm = getDefaultForm();
		},

		onSubmit(event) {
			alert(
				`Thank you ${this.formData.name}! We will get in touch shortly at ${this.formData.email}.`
			);
			event.target.reset();
		},
	},
};
</script>

<style scoped>
h1 {
	color: #3f463d;
}

.errorMessage {
	color: #3f463d;
	width: 100%;
	text-align: center;
	margin: 0;
}

.contact-title {
	box-sizing: border-box;
	width: 100%;
	text-align: center;
	display: block;
	text-transform: lowercase;
	font-weight: normal;
	margin: 0.7rem;
	padding: 0.7rem;
}
.contact-container {
	width: 100%;
	display: flex;
	justify-content: center;
	position: relative;
	z-index: 5;
}

.form {
	width: 80%;
	max-width: 800px;
	min-width: 300px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
}

.button-container {
	width: 80%;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
}

.policy-container {
	position: absolute;
	bottom: 20px;
	width: 100%;
	min-width: 300px;
	display: flex;
	justify-content: center;
}

.footer-link {
	color: #bf763c;
	font-size: 1.25rem;
	margin: 0 2rem;
	text-align: center;
}

.footer-link:hover {
	font-size: 1.3rem;
	font-weight: bold;
	transition: font-size 0.5s;
}

@media (min-width: 800px) {
	.button {
		width: 8rem;
	}
}

@media (max-width: 800px) {
	.button {
		width: 60%;
	}
}

/* Without this, the policy links would overlap the form. */
@media (max-height: 800px) {
	.policy-container {
		position: relative;
		margin: 4rem 0;
	}
}
</style>
