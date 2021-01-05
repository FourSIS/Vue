<template>
  <div id="shopcard-list">
    <shopcard-list-item v-for="item in list" :key="item.id" :item-info="item" />
  </div>
</template>

<script>
import shopcardListItem from './shopcardLIstItem'
import { mapGetters } from 'vuex';

export default {
  components: {
    shopcardListItem
  },

  computed: {
    ...mapGetters({
      length: 'cardLength',
      list: 'cardList'
    })
  },
}
</script>

<style>

</style>