//  Uses event listeners to listen for window resizes, then calls a funtion if it occurs. 

import { onUnmounted } from "vue";

export default (resizeFunction) => {
    window.addEventListener("resize", resizeFunction);

    onUnmounted(() => {
        window.removeEventListener("resize", resizeFunction);
    });

}

/*
Lifecycle hooks are used to create global event listeners. When the component is unmounted, the listener will be removed to prevent memory leaks.

https://vuejs.org/v2/api/#Options-Lifecycle-Hooks
https://vuejs.org/v2/api/#created
https://vuejs.org/v2/api/#mounted
https://www.w3schools.com/js/js_htmldom_eventlistener.asp
*/