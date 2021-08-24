<template>
	<div class="contact-container">
		<form
			class="form"
			v-on:submit.stop.prevent="onSubmit"
			v-on:reset="resetErrorMessage"
		>
			<h1 class="contact-title">Send us a message!</h1>
			<SlideFadeTransition>
				<h4 class="errorMessage" v-if="errorMessage">
					{{ errorMessage }}
				</h4>
			</SlideFadeTransition>
			<!-- label with hidden class for use with accessibility readers. -->
			<label class="hidden" for="name">Email address:</label>
			<input
				id="name"
				class="input-box desktop-side"
				placeholder="Name:"
				type="text"
				v-model.trim="formData.userName"
			/>
			<label class="hidden" for="email">Email address:</label>
			<input
				id="email"
				class="input-box desktop-side"
				placeholder="Email:"
				type="email"
				v-model.trim="formData.userEmail"
			/>
			<label class="hidden" for="messageType">Message Type:</label>
			<select
				id="messageType"
				class="input-box desktop-side"
				v-model="formData.messageType"
			>
				<option value="" selected disabled>Message Type:</option>
				<option
					v-for="option in messageTypeOptions"
					:key="option"
					:value="option.value"
				>
					{{ option.text }}
				</option>
			</select>
			<label class="hidden" for="message">Message:</label>
			<textarea
				class="input-box"
				id="message"
				placeholder="Enter a message..."
				type="text"
				v-model="formData.userMessage"
			></textarea>
			<input class="button" type="submit" value="submit" />
			<input class="button" type="reset" />
		</form>
	</div>
	<div class="policy-container">
		<a class="footer-link" href="#">Terms of Use</a>
		<a class="footer-link" href="#">Privacy Policy</a>
	</div>
</template>

<script>
import SlideFadeTransition from "./SlideFadeTransition.vue";

export default {
	name: "ContactForm",
	components: { SlideFadeTransition },
	data() {
		return {
			formData: {
				userName: "",
				userEmail: "",
				userMessage: "",
				messageType: "",
			},
			errorMessage: "",
			messageTypeOptions: [
				{ text: "Account", value: "account" },
				{ text: "Report Offensive Content", value: "offensive" },
				{ text: "Bug Finding", value: "bug" },
				{ text: "Other", value: "misc" },
			],
		};
	},
	methods: {
		resetErrorMessage() {
			this.errorMessage = "";
			this.messageType = "";
		},
		checkRequiredFields() {
			for (let key of Object.keys(this.formData)) {
				if (this.formData[key].length <= 0) {
					this.errorMessage = "Please fill in all fields.";
					return false;
				}
			}
			return true;
		},
		onSubmit() {
			if (this.checkRequiredFields()) {
				alert(
					`Thank you ${this.userName}! We will get in touch shortly at ${this.userEmail}.`
				);
			}
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
	width: 50%;
	max-width: 800px;
	min-width: 300px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
}

.input-box {
	box-sizing: border-box;
	width: 100%;
	border-radius: 10px;
	border: 4px solid #3d6b56;
	margin: 0.5rem;
	font-family: fell, serif;
	font-size: 1rem;
	padding: 0.5rem;
	background-color: rgba(255, 255, 255, 0.4);
}

.input-box:focus {
	outline: none;
	border: 4px solid #bf763c;
}

.input-box:invalid {
	border: 4px solid darkred;
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
	.desktop-side {
		width: 46%;
	}
}

@media (max-height: 700px) {
	.policy-container {
		position: relative;
		margin: 4rem 0;
	}
}
</style>
