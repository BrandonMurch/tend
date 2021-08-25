<template>
	<div class="login-container">
		<div class="logo-container">
			<MainLogo />
		</div>
		<form
			class="form"
			id="loginForm"
			:class="{ submitted: hasSubmitted }"
			@submit.stop.prevent="onSubmit"
			@reset="resetForm"
		>
			<transition-group name="slide" appear>
				<Input
					v-for="input in getInputs()"
					:key="input.label"
					:label="input.label"
					:type="input.type"
					:validation="input.validation"
					required
					v-model="formData[input.dataName]"
				/>
			</transition-group>

			<div class="checkbox-container">
				<label class="checkboxLabel" for="rememberMe"
					>Remember me:</label
				>
				<input
					id="rememberMe"
					type="checkbox"
					v-model="formData.rememberMe"
					:true-value="true"
					:false-value="false"
				/>
			</div>

			<div class="button-container">
				<Button
					class="button"
					:type="'submit'"
					:form="'loginForm'"
					@click="hasSubmitted = true"
				>
					submit
				</Button>
				<Button class="button" :type="'reset'" :form="'loginForm'">
					reset
				</Button>
				<Button class="button" type="button" @click="toggleRegister">
					{{ register ? "Login" : "register" }}
				</Button>
			</div>
		</form>
	</div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import Button from "./AppButton.vue";
import Input from "./AppInput.vue";
import MainLogo from "./MainLogo.vue";

const getDefaultForm = () => {
	return {
		email: "",
		username: "",
		password: "",
		confirmPassword: "",
		rememberMe: false,
	};
};

const inputs = [
	{
		label: "Username",
		type: "text",
		dataName: "username",
		appearsIn: ["register"],
	},
	{
		label: "Email",
		type: "email",
		dataName: "email",
		appearsIn: ["login", "register"],
	},

	{
		label: "Password",
		type: "password",
		dataName: "password",
		appearsIn: ["login", "register"],
		validation: {
			minlength: 8,
			maxlength: 30,
		},
	},
	{
		label: "Confirm Password",
		type: "password",
		dataName: "confirmPassword",
		appearsIn: ["register"],
		validation: {
			minlength: 8,
			maxlength: 30,
		},
	},
];

export default {
	name: "LogInForm",
	components: { Button, Input, MainLogo },
	setup() {
		const store = useStore();
		const router = useRouter();

		const register = ref(false);
		const hasSubmitted = ref(false);
		let formData = getDefaultForm();

		// Dynamically create a list of inputs depending on which mode is selected.
		const getInputs = () => {
			return inputs.filter((input) =>
				input.appearsIn.includes(register.value ? "register" : "login")
			);
		};

		// Set HTML5 custom error message on relevent password fields
		const setPasswordError = (error) => {
			document.getElementById("Password").setCustomValidity(error);
			if (register.value) {
				document
					.getElementById("Confirm Password")
					.setCustomValidity(error);
			}
		};

		// Check that both the password and confirm password fields match.
		const doPasswordsMatch = () => {
			if (
				register.value &&
				formData.password != formData.confirmPassword
			) {
				setPasswordError("Password and Confirm Password must match.");
				return false;
			}
			// Clear password error.
			setPasswordError("");
			return true;
		};

		// Return the form to its initial state.
		const resetForm = () => {
			hasSubmitted.value = false;
			setPasswordError("");
			formData = getDefaultForm();
		};

		const onSubmit = () => {
			hasSubmitted.value = true;
			if (doPasswordsMatch()) {
				// Get a name for the user
				const username = formData.username
					? formData.username
					: formData.email.split("@")[0];

				store.commit("user/logUserIn", username);
				router.push("/explore");
			}
		};

		// Toggle between register and login
		const toggleRegister = () => {
			resetForm();
			register.value = !register.value;
		};

		return {
			getInputs,
			register,
			formData,
			hasSubmitted,
			onSubmit,
			toggleRegister,
			resetForm,
		};
	},
	methods: {},
};
</script>

<style scoped>
/* css for the transition */
@import "../assets/css/transitionFade.css";

.logo-container {
	height: 7rem;
	width: 100%;
	display: flex;
	justify-content: center;
}

.form {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	position: relative;
}

.button-container {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
}

.login-container {
	padding: 3rem;
	border: 3px solid #b87d4b;
	border-radius: 20px;
	min-width: 200px;
}

.checkbox-container {
	width: 100%;
	display: flex;
	justify-content: center;
}

.checkboxLabel {
	color: #3f463d;
}

@media (max-width: 800px) {
	.button {
		width: 60%;
	}
}
</style>
