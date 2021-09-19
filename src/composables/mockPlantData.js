import plantData from "../assets/json/plants.json";
import { ref } from "vue";

const NUMBER_OF_PLANTS = 7;
const DATA_SIZE_MULTIPLER = 5;
const MAXIMUM_POSSIBLE_ID = 5000

export const getPlantData = () => {
    const images = [];
    const currentImageRound = ref(0);

    for (let i = 0; i < DATA_SIZE_MULTIPLER; i++) {
        for (let j = 0; j < NUMBER_OF_PLANTS; j++) {
            let copy = { ...plantData[j] };
            copy.baseId = plantData[j].id;
            copy.id = copy.id + NUMBER_OF_PLANTS * i + currentImageRound.value * DATA_SIZE_MULTIPLER * NUMBER_OF_PLANTS;
            images.push(copy);
        }
    }

    currentImageRound.value++;

    return images;
};

export const getSinglePlant = (id) => {
    let i = 0;
    let currentImageRound = 0;
    let currentId = 0;
    while (currentId < MAXIMUM_POSSIBLE_ID) {
        if (i > DATA_SIZE_MULTIPLER) {
            i = 0;
            currentImageRound++;
        }


        for (let j = 0; j < NUMBER_OF_PLANTS; j++) {
            currentId = plantData[j].id + NUMBER_OF_PLANTS * (i + currentImageRound * DATA_SIZE_MULTIPLER);
            if (currentId > id) {
                throw new Error("No Plant with that ID");
            }
            if (id == currentId) {
                return plantData[j];
            }
        }
        i++;
    }
}

export const getSpecies = () => {
    const species = [];

    for (let i = 0; i < NUMBER_OF_PLANTS; i++) {
        species.push(plantData[i].title.toLowerCase());
    }
    species.sort();
    return species;
}

export const updatePlant = (plant) => {
    alert(`Sucessfully updated ${plant.subtitle}!`)
}