<template>
  <div class="app_wrap">
    
    <header class="header">
      <div class="container header__container">
        <div class="logobox">
          <a class="logobox__pic" href="#home">
            <img class="logobox__img" src="/static/logo.png" alt="samsung shop">
          </a>
        </div>

        <div class="searchbox">
          <search-form></search-form>
        </div>
      </div>
    </header>

    <section class="nav_wrap">
      <div class="container nav_wrap__container">
        <navbar :menu-items="menuItems"></navbar>
      </div>
    </section>

    <section class="content_wrap">
      <div class="container content_wrap__container">
        
        <div class="breadcrumbs">
          <a class="breadcrumbs__link" href="#/home">Главная</a>
          <span class="breadcrumbs__delimeter">/ </span>
          <span class="breadcrumbs__text">Корзина</span>
        </div>

        <h2 class="content__title text--upper">Корзина</h2>

        <div class="content">          
          <cart-view></cart-view>
        </div>

      </div>
    </section>

  </div>
</template>

<script>
import '@/assets/reset.css'
import '@/assets/fonts/style.css'

import HTTP from '@/api/http'
import Navbar from '@/components/Navbar'
import SearchForm from '@/components/SearchForm'
import CartView from '@/views/CartView'

export default {
  name: 'app',
  components: {
    Navbar,
    SearchForm,
    CartView
  },
  data () {
    return {
      menuItems: []
    }
  },
  computed: {},
  methods: {},
  created () {
    HTTP.get('menu.json')
      .then(response => {
        this.menuItems = response.data
      })
      .catch(e => {
        console.error('Ошибка при загрузке меню')
      })
  }
}
</script>

<style lang="postcss" src="./assets/app.sss"></style>
