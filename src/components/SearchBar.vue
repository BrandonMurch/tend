<!-- A search bar with autocomplete. // Currently options are mocked from a json
file. // Search autocomplete inspired from
https://www.w3schools.com/howto/howto_js_autocomplete.asp -->

<template>
	<div style="display: inline;">
		<!-- Create pop up if a plant has been selected through the search bar. -->
		<PlantProfilePublic
			v-if="searchResultForPopUp"
			v-bind="searchResultForPopUp"
			@close="searchResultForPopUp = null"
		/>
		<DropDown :isOpen="isOpen">
			<template v-slot:inside>
				<div class="search-container" ref="searchbar">
					<!-- Search bar -->
					<input
						@keyup="handleKeyUp"
						class="search-input"
						type="text"
						placeholder="search for a plant species..."
						v-model.trim="searchTerm"
					/>
					<div>
						<!-- Populated suggestions for autocomplete -->
						<h3
							v-for="suggestion in suggestions"
							:key="suggestion"
							class="suggestion-text"
							:class="{
								suggestionFocus: isFocusedSuggestion(
									suggestion
								),
							}"
							@click="() => submitSearch(suggestion)"
						>
							{{ suggestion }}
						</h3>
					</div>
				</div>
			</template>
		</DropDown>
	</div>
</template>

<script>
import DropDown from "./DropDown.vue";
import PlantProfilePublic from "./PlantProfilePublic.vue";

import plantData from "../assets/json/plants.json";

export default {
	name: "SearchBar",
	components: { DropDown, PlantProfilePublic },
	props: { isOpen: Boolean },
	watch: {
		isOpen: function(value) {
			if (!value) {
				this.close();
			}
		},
	},
	data() {
		return {
			searchTerm: "",
			searchOptions: plantData.map((plant) => plant.title.toLowerCase()),
			suggestions: [],
			focusedIndex: -1,
			focusedSuggestion: "",
			searchResultForPopUp: undefined,
		};
	},
	methods: {
		close() {
			this.suggestions = [];
			this.focusedIndex = -1;
			this.focusedSuggestion = "";
			this.searchTerm = "";
			this.$emit("close");
		},

		// Perfom actions if a key has been typed within the search bar.
		handleKeyUp(event) {
			if (this.suggestions.length === 0) {
				this.getSuggestions();
			}
			switch (event.key) {
				// Submit search
				case "Enter":
					// Submit either the suggestion, or what is in the search bar depending if a suggestion has been selected.
					if (this.focusedSuggestion === "") {
						this.submitSearch(this.searchTerm);
					} else {
						this.submitSearch(this.focusedSuggestion);
					}
					break;
				case "Escape":
					this.close();
					break;
				case "ArrowDown":
					// Shift to the focused suggestion below the current.
					if (this.focusedIndex < this.suggestions.length - 1) {
						this.focusedIndex++;
						this.focusedSuggestion = this.suggestions[
							this.focusedIndex
						];
					}
					break;
				case "ArrowUp":
					// Shift to the focused suggestion above the current.
					if (this.focusedIndex > 0) {
						this.focusedIndex--;
						this.focusedSuggestion = this.suggestions[
							this.focusedIndex
						];
						// Unfocus suggestions if the current suggestion is on top.
					} else if (this.focusedIndex == 0) {
						this.focusedIndex = -1;
						this.focusedSuggestion = "";
					}
					break;
				default:
					// Letter has been typed. Regenerate suggestions.
					this.focusedIndex = -1;
					this.focusedSuggestion = "";
					this.getSuggestions();
			}
		},
		isFocusedSuggestion(suggestion) {
			return this.focusedSuggestion == suggestion;
		},
		getSuggestions() {
			// Regex is for any possible suggestion that starts with what is currently in the search bar. The possible options are then filtered into suggestions using this regex.
			//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp

			// TODO: Update this for performance. The amount of possible selections will be reduced to the current suggestions. When the length of the input string shrinks, all options should be considered again.
			const regexPattern = new RegExp(
				"^" + this.searchTerm.toLowerCase() + ".*$"
			);

			this.suggestions = this.searchOptions.filter((option) =>
				regexPattern.test(option.toLowerCase())
			);
		},

		// Check so see if the search result exists, then load a popup with it.
		submitSearch(input) {
			this.close();
			const searchResult = plantData.find(
				(plant) => plant.title.toLowerCase() == input
			);
			if (searchResult) {
				this.searchResultForPopUp = searchResult;
			} else {
				alert("Your search could not be found.");
			}
		},
	},
};
</script>

<style scoped>
.suggestion {
	cursor: pointer;
	display: flex;
}

/* We don't want the suggestion to span the whole box. So left/translate is used. */
.suggestion-text {
	cursor: pointer;
	width: fit-content;
	position: relative;
	left: 50%;
	transform: translateX(-50%);
	font-weight: normal;
}

.suggestion-text:last-child {
	padding-bottom: 1rem;
}

.suggestion-text:hover,
.suggestionFocus {
	font-weight: bold;
}

.search-container {
	width: 100%;
	display: block;
}

.search-input {
	position: relative;
	width: 100%;
	background-color: rgba(0, 0, 0, 0.05);
	border: none;
	height: 2rem;
	text-align: center;
	color: #3f463d;
	font-family: fell, serif;
	font-size: 1.5rem;
	padding: 1rem;
	border-bottom: 2px solid gray;
	outline: none;
}
</style>
