<template>
  <div class="product_count_popup" :style="productCountPopupStyles">
    <div class="counter_form">
      <div class="counter_form__title">Именить количество</div>
      <div class="table counter_form__grid">
        <div class="table__row">
          <div class="table__cell cell--base_price">{{ product.price | currency }} <span class="font--rubl">a</span></div>
          <div class="table__cell text--center" style="padding: 4px 0;">
            <count-input :value="product.count" @input="value => { product.count = value }"></count-input>
          </div>
          <div class="table__cell cell--res_price text--right">{{ (product.count * product.price) | currency }} <span class="font--rubl">a</span></div>
        </div>
      </div>
      <div class="counter_form__buttons">
        <a href="#" class="text_btn text--upper color--primary" @click.prevent="save">Сохранить</a>
        <a href="#" class="text_btn text--upper" @click.prevent="hide">Отменить</a>
      </div>
    </div>
  </div>  
</template>

<script>
import CountInput from './CountInput'

export default {
  name: 'ProductCountPopup',
  components: {
    CountInput
  },
  data () {
    return {
      product: {
        id: 0,
        price: 0,
        count: 0
      },
      productCountPopupStyles: {
        'display': 'none',
        'position': 'absolute',
        'top': 0,
        'left': 0
      }
    }
  },
  methods: {
    updateValue (value) {
      let formattedValue = 10
      console.log(value)

      this.$emit('input', Number(formattedValue))
    },
    show (x, y, item) {
      this.product = {
        id: item.id,
        price: item.price,
        count: item.count
        // ...item
      }

      this.productCountPopupStyles.top = y + 'px'
      this.productCountPopupStyles.left = (x - 180) + 'px'
      this.productCountPopupStyles.display = 'block'
    },
    hide () {
      this.productCountPopupStyles.display = 'none'
    },
    save () {
      this.$emit('change', this.product)
      this.hide()
    }
  }
}
</script>

<style lang="postcss" src="@/assets/components/cart/product-count-popup.sss"></style>
