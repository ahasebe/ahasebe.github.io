// start app
new Vue({
  el: '#modal1',
  data: {
    showModal: false
  },
  components: {
    modal: {
      template: '#modal-template'
    }
  }
});

new Vue({
  el: '#modal2',
  data: {
    showModal2: false
  },
  components: {
    modal: {
      template: '#modal-template2'
    }
  }
});

new Vue({
  el: "#top"
});