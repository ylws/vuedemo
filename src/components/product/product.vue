<template>
  <div>
  	<ghead></ghead>
    <gnav></gnav>
     <h1>{{ msg }}</h1>
     <product v-for="item in products" :items="item"  key="item.id"></product>
      {{total}}
     
    <gfoot></gfoot>
  </div>
</template>

<script>
import ghead from '../common/header'
import gfoot from '../common/footer'
import gnav from '../common/nav'
import {productsinfo} from '../../info/product/productinfo'
export default {
  name: 'Product',
  data () {
    return {
      msg: 'Welcome to you product page',
      products: productsinfo
    }
  },
  components: {
    product: {
      template: `
        <div>
          <span>单价$：{{items.price}}</span>
          <span>数量：{{items.Quality}}</span>
          <input  v-model='items.Quality'>
          <button @click='add(items)'>+</button>
          <button @click='dec(items)'>-</button>
        </div>
      `,
      props: ['items'],
      methods: {
        add (items) {
          this.$store.dispatch('ProductQualityAdd', items)
        },
        dec (items) {
          this.$store.dispatch('ProductQualityDec', items)
        }
      }
    },
    ghead,
    gfoot,
    gnav
  },
  methods: {},
  computed: {
    total () {
      return this.$store.state.product.total
    }
  }
}
</script>
