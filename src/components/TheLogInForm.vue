<!-- SINGLETON. The form for users to log in. It doubles as a registration form as well. Directly interacts with the store/router after successful login. Currently mocked to always succeed. -->

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
				<AppInput
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
					class="checkbox"
					id="rememberMe"
					type="checkbox"
					v-model="formData.rememberMe"
					:true-value="true"
					:false-value="false"
				/>
			</div>

			<div class="button-container">
				<AppButton
					class="button"
					:type="'submit'"
					:form="'loginForm'"
					@click="hasSubmitted = true"
				>
					submit
				</AppButton>
				<AppButton class="button" :type="'reset'" :form="'loginForm'">
					reset
				</AppButton>
				<AppButton class="button" type="button" @click="toggleRegister">
					{{ register ? "Login" : "register" }}
				</AppButton>
			</div>
			<!-- Remove for production versions -->
			<div style="width: 100%">
				<h2 style="text-align: center">
					Any Email/Password will work for testing.
				</h2>
			</div>
		</form>
	</div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import AppButton from "./AppButton.vue";
import AppInput from "./AppInput.vue";
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

// Inputs for the login form. Will be loaded into the AppInput component.
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
	components: { AppButton, AppInput, MainLogo },
	setup() {
		const store = useStore();
		const router = useRouter();

		const register = ref(false);
		const hasSubmitted = ref(false);
		let formData = ref(getDefaultForm());

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
					.getElementById("ConfirmPassword")
					.setCustomValidity(error);
			}
		};

		// Check that both the password and confirm password fields match.
		const doPasswordsMatch = () => {
			if (
				register.value &&
				formData.value.password != formData.value.confirmPassword
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
			formData.value = getDefaultForm();
		};

		const onSubmit = () => {
			hasSubmitted.value = true;
			if (doPasswordsMatch()) {
				// Get a name for the user
				const username = formData.value.username
					? formData.value.username
					: formData.value.email.split("@")[0];

				store.commit("user/logIn", username);
				router.push("/my-plants");
			}
		};

		// Toggle between register and login
		const toggleRegister = () => {
			resetForm();
			register.value = !register.value;
		};

		const test = (value, dataName) => {
			formData.value[dataName] = value;
		};

		return {
			getInputs,
			register,
			formData,
			hasSubmitted,
			onSubmit,
			toggleRegister,
			resetForm,
			test,
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

.checkbox {
	cursor: pointer;
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
