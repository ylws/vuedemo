<template>
  <div>
  
  	<ghead></ghead>
    <gnav></gnav>
     <h1>{{ msg }}</h1>
     <div class="iconfont icon-guanbijiantou" ></div>
     <slide></slide>
     	<p>{{ count }}--{{ addnum }}</p>
     	<p>{{ overcount }}--{{ dbcount }}</p>
  <p>
    <button @click="CourseCounterAdd">+</button>
    <button @click="CourseCounterDec">-</button>
  </p>
    <gfoot></gfoot>
  </div>
</template>

<script>
import ghead from '../common/header'
import gfoot from '../common/footer'
import gnav from '../common/nav'
import slide from '../extend/slide'
import { mapState, mapGetters } from 'vuex'
import {CourseCounterAdd, CourseCounterDec} from '../../store/mutation-types'
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    ghead,
    gfoot,
    gnav,
    slide
  },
  methods: {
    [CourseCounterAdd] () {
//    this.$store.commit(CourseCounterAdd, 10)
      this.$store.dispatch({
        type: CourseCounterAdd,
        num: 10
      })
    },
    [CourseCounterDec] () {
//    this.$store.commit(CourseCounterDec)
      this.$store.dispatch(CourseCounterDec)
    }
  },
  computed: {
    ...mapState(['count', 'addnum']),
    ...mapGetters(['overcount', 'dbcount'])
  }
}
/*
 mapState({
    count () {
      return this.$store.state.count
    },
    addnum () {
      return this.$store.state.addnum
    },
    overcount () {
      return this.$store.getters.overcount
    },
    dbcount () {
      return this.$store.getters.dbcount
    }
  })
 * */
</script>
