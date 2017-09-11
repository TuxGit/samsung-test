<template>
  <span>
    <a href="#" class="text_btn" @click.prevent="updateValue(--$refs.input.value)"><i class="icon-minus text_btn__img"></i>
    </a><input
      ref="input"
      :value="value"
      @input="updateValue($event.target.value)"
      style="width: 45px; height: 22px; text-align: center;"
      type="text"
    ><a href="#" class="text_btn" @click.prevent="updateValue(++$refs.input.value)"><i class="icon-plus text_btn__img"></i></a>
  </span>
</template>

<script>
export default {
  name: 'CountInput',
  props: ['value'],
  methods: {
    updateValue (value) {
      let formattedValue = Number(value)
      formattedValue = formattedValue > 0 ? formattedValue.toFixed() : '1'

      if (formattedValue !== value) {
        this.$refs.input.value = formattedValue
      }

      this.$emit('input', Number(formattedValue))
    }
  }
}
</script>
