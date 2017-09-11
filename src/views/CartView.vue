<template>
  <div class="cart">
    <div class="cart__panel">
      <div class="cart__panel-selected">
        <span class="font--bbook">Выделено:</span> <span class="font--sbold" style="font-size: 18px;">{{ selectedProducts }}</span>
      </div>
      <div class="cart__panel-buttons">
        <a class="text_btn" @click.prevent="removeSelectedProducts" href="#">
          <i class="icon-delete text_btn__img"></i><span class="text_btn__text font--bbook">Удалить отмеченные</span>
        </a>
      </div>
    </div>
    <div class="table cart__grid">
      <div class="table__row hovered" v-for="(item, index) in products" :key="item.id">
        <div class="table__cell cell--small text--right"><input class="index_checkbox" type="checkbox" v-model="item.checked">{{ index + 1 }}</div>
        <div class="table__cell cell--small text--center cell--delimiter">
          <img :src="item.image_url" :alt="item.title" style="max-width: 55px;">
        </div>
        <div class="table__cell cell--delimiter">{{ item.descr }}</div>
        <div class="table__cell cell--base_price cell--delimiter">{{ item.price | currency }} <span class="font--rubl">a</span></div>
        <div class="table__cell cell--prod_count text--center"><input class="input--counter" type="text" size="1" @click.stop="onProductCountClick($event, item)" v-model="item.count" readonly></div>
        <div class="table__cell cell--res_price text--right">{{ (item.count * item.price) | currency }} <span class="font--rubl">a</span></div>
      </div>

      <product-count-popup ref="productCountPopup" @change="updateProduct"></product-count-popup>

    </div>
    <div class="cart__summary">
      <div class="cart__summary-item">Промежуточный итог по корзине: <div class="cart__summary-value">{{ interimSum | currency }} <span class="font--rubl">c</span></div></div>
      <div class="cart__summary-item">В том числе НДС: <div class="cart__summary-value">{{ vatSum | currency }} <span class="font--rubl">c</span></div></div>
      <div class="cart__summary-delimiter"></div>
      <div class="cart__summary-item color--primary"><span class="font--regular">ИТОГО:</span> <div class="cart__summary-value font--bold" style="font-size: 24px;">{{ totalSum | currency }} <span class="font--rubl">c</span></div></div>
    </div>
  </div>
</template>

<script>
import HTTP from '@/api/http'
import ProductCountPopup from '@/components/cart/ProductCountPopup'

export default {
  name: 'CartView',
  components: {
    ProductCountPopup
  },
  data () {
    return {
      products: []
    }
  },
  computed: {
    selectedProducts () {
      let sum = 0
      this.products.forEach(item => {
        sum += item.checked ? 1 : 0
      })
      return sum
    },
    interimSum () {
      let sum = 0
      this.products.forEach(item => {
        sum += (item.price * item.count)
      })
      return +sum.toFixed(2)
    },
    vatSum () {
      return +((this.interimSum / 100) * 18).toFixed(2)
    },
    totalSum () {
      return +this.interimSum
    }
  },
  methods: {
    updateProduct (item) {
      let product = this.products.find((element, index, array) => { return element.id === item.id })
      product.count = item.count || 0
    },
    removeSelectedProducts () {
      this.products = this.products.filter((item) => {
        if (!item.checked) {
          return true
        } else {
          return false
        }
      })
    },
    onProductCountClick (event, item) {
      let x = event.pageX
      let y = event.pageY

      this.$refs.productCountPopup.show(x, y, item)
    }
  },
  created () {
    HTTP.get('products.json')
      .then(response => {
        this.products = response.data
      })
      .catch(e => {
        console.error('Ошибка при загрузке продукции')
      })
  }
}
</script>

<style lang="postcss" src="@/assets/views/cart-view.sss"></style>
