import { onUnmounted } from "vue";

export default (resizeFunction) => {
    window.addEventListener("resize", resizeFunction);

    onUnmounted(() => {
        window.removeEventListener("resize", resizeFunction);
    });

}