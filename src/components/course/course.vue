<template>
 <div>
 	<ghead></ghead>
  <gnav></gnav>
  {{ msg }}
  <gfoot></gfoot>
 </div>
</template>

<script>
import ghead from '../common/header'
import gfoot from '../common/footer'
import gnav from '../common/nav'

export default {
  name: 'Course',
  data () {
    return {
      msg: '课程界面'
    }
  },
  components: {
    ghead,
    gfoot,
    gnav
  }
}
</script>
