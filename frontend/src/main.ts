import Vue, { createApp, DirectiveBinding, VNode } from 'vue'
import router from './router'
import App from './App.vue'

const app = createApp(App);
app.directive('click-outside', {
    beforeMount: function (el, binding) {
      function clickOutsideEvent(event: MouseEvent) {
        // here I check that click was outside the el and his children
        if (!(el == event.target || el.contains(event.target as Node))) {
          // and if it did, call method provided in attribute value
          binding.value();
        }
      }
      el.clickOutsideEvent = clickOutsideEvent;
      document.addEventListener('click', clickOutsideEvent)
    },
    unmounted: function (el) {
      document.removeEventListener('click', el.clickOutsideEvent)
    },
});
app.use(router);
app.mount('#app');