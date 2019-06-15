<template>
  <div class="heading-title">
    <h2 class="heading-title__text">{{ title }}</h2>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang='scss' scoped>
$img_common: '/assets/images/common/';
$img_pc_common: '/assets/images/pc/common/';

.heading-title {
  padding: 40px 0;
  background-color: #fc393f;
  position: relative;
  overflow: hidden;
  z-index: -2;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 106px;
    height: 187px;
    background-image: url('#{$img_common}bg_mv-left.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  &::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: -1;
    width: 106px;
    height: 187px;
    background-image: url('#{$img_common}bg_mv-right.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  &__text {
    font-size: 32px;
    text-align: center;
    letter-spacing: 0.03em;
    font-weight: bold;
    font-family: 'Noto Sans Japanese', 'メイリオ', Meiryo, Helvetica, Arial, sans-serif;
    color: #fff;
  }
}
</style>
