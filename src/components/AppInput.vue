<!--
Description: 		An input component that applies common styling to all 	 
					inputs. It also allows creation of many inputs from a list.

Props: 
	modelValue:		Used for v-model. The value provided to v-model will appear 				in this component as modelValue.
	
	required: 		Optional parameter. Make the input mandatory if provided.

	options: 		A list of options for the select, or custom slider inputs. 
					Needs an array of objects containing a text field (to display) and a value field to store.

	validation		Validation for the inputs. Passed in as an object for all 					validationfields. For example: 
						validation: {
							minlength: 8,
							maxlength: 30,
						}
	type			The type of input. Example: "text", "checkbox", "email", etc

	stealth			Applies the stealth styling without a border or background. 

	size			Either "full" or "half" for full width inputs or half.

Emits: 
update:modelValue	Works with v-model. Used to update the data source within 						the parent. Passes back the input field value.

Notes: 
					Notes on v-model with custom components: https://v3.vuejs.org/guide/component-basics.html#using-v-model-on-components

-->

<template>
	<div
		:class="{
			inputContainer: !stealth,
			stealthContainer: stealth,
			halfInput: size === 'half',
		}"
	>
		<!-- An Icon slot -->
		<slot name="icon" />

		<!-- label with hidden class for use with accessibility readers. -->
		<label
			:class="type == 'checkbox' ? 'stealth-input' : 'hidden'"
			:for="id"
			>{{ label }}</label
		>

		<!-- SELECT -->
		<select
			v-if="type == 'select'"
			:id="id"
			:class="stealth ? 'stealth-input' : 'inputBox'"
			:value="modelValue"
			:required="required"
			v-bind="validation"
			@change="$emit('update:modelValue', $event.target.value)"
		>
			<!-- Create an option that shows the label initially but is unselectable -->
			<option value="" selected disabled>{{ label }}</option>
			<option
				v-for="option in options"
				:key="option.value"
				:value="option.value"
			>
				{{ option.text }}
			</option>
		</select>

		<!-- Custom Input Slider -->
		<InputSlider
			:id="id"
			v-else-if="type === 'slider'"
			:option1="options[0]"
			:option2="options[1]"
			:value="modelValue"
			@update:modelValue="
				$emit(
					'update:modelValue',
					modelValue == options[0].value
						? options[1].value
						: options[0].value
				)
			"
		/>

		<!-- Checkbox -->
		<input
			v-else-if="type == 'checkbox'"
			:id="id"
			class="checkbox"
			:class="stealth ? 'stealth-input' : 'inputBox'"
			:checked="modelValue"
			@click="$emit('update:modelValue', !modelValue)"
			:placeholder="label"
			:type="type"
			v-bind="validation"
			style="max-height"
		/>

		<!-- Textarea -->
		<textarea
			v-else-if="type === 'textarea'"
			:id="id"
			:class="stealth ? 'stealth-input' : 'inputBox'"
			:value="modelValue"
			:required="required"
			@input="$emit('update:modelValue', $event.target.value)"
			:placeholder="label"
			v-bind="validation"
		/>

		<!-- Text Based Input -->
		<input
			v-else
			:id="id"
			:class="stealth ? 'stealth-input' : 'inputBox'"
			:value="modelValue"
			:required="required"
			@input="$emit('update:modelValue', $event.target.value)"
			:placeholder="label"
			:type="type"
			v-bind="validation"
			@blur="$emit('blur')"
		/>
	</div>
</template>

<script>
import InputSlider from "./InputSlider.vue";
import { removeWhiteSpace } from "../composables/stringManipulation";
import { computed } from "vue";

export default {
	name: "Input",
	components: { InputSlider },
	emits: ["update:modelValue"],
	props: {
		modelValue: [String, Boolean],
		label: String,
		required: {
			type: Boolean,
			default: false,
		},
		options: Array,
		validation: Object,
		type: {
			default: "text",
			type: String,
		},
		stealth: {
			default: false,
			type: Boolean,
		},

		size: {
			default: "full",
			type: String,
			validator: (value) => {
				return ["half", "full"].includes(value);
			},
		},
	},
	setup(props) {
		const id = computed(() => {
			if (props.label) {
				return removeWhiteSpace(props.label);
			} else {
				return "";
			}
		});
		return { id };
	},
};
</script>

<style scoped>
@import "../assets/css/stealthInput.css";

.inputContainer {
	display: flex;
	justify-content: center;
	width: 100%;
}

.stealthContainer {
	display: flex;
	align-content: left;
}

.inputBox {
	box-sizing: border-box;
	width: 100%;
	border-radius: 10px;
	border: 4px solid #3d6b56;
	margin: 0.5rem;
	font-family: fell, serif;
	font-size: 1rem;
	padding: 0.5rem;
	background-color: rgba(255, 255, 255, 0.4);
	text-align: inherit;
}

.inputBox:focus {
	outline: none;
	border: 4px solid #bf763c;
}

.checkbox {
	margin: 0 1rem;
}

form.submitted .inputBox:invalid {
	border: 4px solid darkred;
}

@media (min-width: 800px) {
	.halfInput {
		width: 50%;
	}
}
</style>
