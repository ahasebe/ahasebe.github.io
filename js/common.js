// start app
new Vue({
  el: '#modal',

  data: {
    showModal: false,
    currentImage: ''
  },

  components: {
    modal: {
      template: '#modal-template'
    }
  },

  methods: {
    openModal(event) {
      this.currentImage = event.target.dataset.large;
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
      this.currentImage = '';
    }
  }
});


new Vue({
  el: '#app',
  data: {
    showButton: false,
    scrollThreshold: 300,   // 表示開始スクロール量
    hideTimer: null,
    hideDelay: 500          // スクロール停止後に消すまでの時間(ms)
  },
  methods: {
    handleScroll() {
      // 一定量スクロールしている場合のみ対象
      if (window.scrollY > this.scrollThreshold) {
        this.showButton = true;

        // スクロール停止判定タイマーをリセット
        clearTimeout(this.hideTimer);
        this.hideTimer = setTimeout(() => {
          this.showButton = false;
        }, this.hideDelay);
      } else {
        this.showButton = false;
      }
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }
});
