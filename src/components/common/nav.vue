<template>
  <div class="gnav">
  	<div class="centers">
  		<router-link :to="{name:'Home'}" exact>首页</router-link>
  		<router-link :to="{name:'Course'}" exact>课程中心</router-link>
  		<router-link :to="{name:'Product'}" exact>产品单页</router-link>
  	</div>
  </div>
</template>

<script>

export default {
  name: 'Nav',
  data () {
    return {

    }
  }
}
</script>

