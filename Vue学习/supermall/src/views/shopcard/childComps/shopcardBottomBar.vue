<template>
  <div id="shopcard-bottom-bar">
    <div class="check-content" @click="selectAll">
      <!-- <img src="~assets/img/shopcard/tick.svg" alt=""> -->
      <check-button class="check-button" :checked="isChecked"/>
      <span>全选</span>
    </div>

    <div class="total-price">
      总计：{{totalPrice}}
    </div>

    <div class="pay">
      支付({{count}})
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CheckButton from 'components/content/checkButton/CheckButton'

export default {
  components: { CheckButton },

  methods: {
    selectAll() {
      if(this.isChecked) {
        this.list.forEach( item => item.checked = false )
      } else {
        this.list.forEach( item => item.checked = true)
      }

      // 像下面这样的化简是行不通的，因为isChecked和list都是响应式的，同时发生变化会有问题出现
      // this.list.forEach( item => item.checked = !ischecked)

    }  
  },

  computed: {
    ...mapGetters({
      list: 'cardList',
      length: 'cardLength'
    }),

    totalPrice() {
      // reduce在使用的时候最好给一个初始化的值，这样在遍历空数组的时候可以有初始值，不会报错
      return this.list.filter( item => item.checked).reduce( (preValue, curItem) => {
        return preValue + curItem.price * curItem.count 
      }, 0).toFixed(2)
    },

    count() {
      return this.list.filter( item => item.checked).length
    },

    isChecked() {
      if(!this.list.length) return false
      // 使用filter需要将所有的元素全部过一遍，效率太低
      // return !this.list.filter( item => !item.checked ).length

      // 使用find只需要判断出有一个元素没有被选中就可以终止了，ps: reduce函数返回的是一个对象，并不是一个数组，没有length属性
      return !this.list.find( item => !item.checked )

      // 对null和undefined取反，结果为true
      // 对数字取反，除了0之外，其他全都是false
      // 对于数组，对象取反，只要有结构存在，哪怕没有实际元素( 是{}和[] )，结果都是false
    }
  },
}
</script>

<style scoped>

  #shopcard-bottom-bar {
    display: flex;
    text-align: center;

    background-color: #eee;
    height: 40px;
  }

  .check-content {
    display: flex;
    align-items: center;

    width: 60px;
    line-height: 26px;
  }

  .check-button {
    height: 20px;
    width: 20px;

    margin-right: 2px;
  }

  .total-price {
    flex: 1;
    line-height: 40px;
  }

  .pay {
    width: 90px;
    line-height: 40px;
    background-color: var(--color-tint);
    color: #fff;
  }
</style>