<template>
  <button class="base-button" @click.prevent="callback($event)"><slot></slot></button>
</template>

<script>
  export default {
    name: 'BaseButton',
    methods: {
      callback: function (e) {
        this.$emit('click', e);
      },
    },
  }
</script>

<style lang="scss" scoped>
.base-button {
  padding: 5px 10px;
  outline: 0;
  border-radius: 4px;
  border: 1px #969696 solid;
  cursor: pointer;
}
</style>