import Vue, { createApp, DirectiveBinding, VNode } from 'vue'
import router from './router'
import App from './App.vue'

type TaggedElement = Element & {
  eventMap: {
    [key: string]: (event: MouseEvent) => void
  }
}
function createMouseOutsideDirective(eventType: 'mouseup' | 'click') {
  return {
    beforeMount: function (el: TaggedElement, binding: Vue.DirectiveBinding) {
      function clickOutsideEvent(event: MouseEvent) {
        // here I check that click was outside the el and his children
        if (window.document.contains(event.target as Node)
          &&!(el == event.target || el.contains(event.target as Node))) {
          // and if it did, call method provided in attribute value
          binding.value();
        }
      }
      if (!el.eventMap) {
        el.eventMap = {};
      }
      el.eventMap[eventType] = clickOutsideEvent;
      document.addEventListener(eventType, clickOutsideEvent)
    },
    unmounted: function (el: any) {
      document.removeEventListener(eventType, el.eventMap[eventType])
    },
}
}

const app = createApp(App);
app.directive('mouseup-outside', createMouseOutsideDirective('mouseup'));
app.directive('click-outside', createMouseOutsideDirective('click'));
app.use(router);
app.mount('#app');