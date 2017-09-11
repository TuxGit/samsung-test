<template>
  <nav class="nav" role="navigation">    
    <ul class="nav__list">
      <li class="nav__item" :class="[item.id == 1 ? 'active' : '']" v-for="item in menuItems" :key="item.id">
        <a class="nav__link" :href="item.url">{{ item.title }}<span class="nav__arrow" v-if="item.children && item.children.length > 0"><i class="icon-arrow"></i></span></a>
      </li>
    </ul>
  </nav>
</template>

<<script>
export default {
  name: 'NavBar',
  props: ['menuItems']
}
</script>

<style lang="postcss" src="@/assets/components/navbar.sss"></style>
