<template>
  <div id="app">
    <!--<transition name="fade">-->
    	<router-view></router-view>
    <!--</transition>-->
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {

    }
  }
}
</script>
<style type="text/css">
	/*.fade-enter-active{
		animation: slidein 0.5s ease-in-out 0s ;
	} 
	.fade-leave-active {
		 animation: slideout 0.5s ease-in-out 0s ;
	}
	.fade-enter, .fade-leave-to {
	   
	}
	@keyframes slidein{
		from{transform: scale(1);}
		to{transform: scale(0);}
	}
	@keyframes slideout{
		from{transform: scale(0);}
		to{transform: scale(1);}
	}
	@keyframes slidein{
		from{transform: rotate(0deg);transform-origin: center;}
		to{transform: rotate(180deg);transform-origin: center;}
	}
	@keyframes slideout{
		from{transform: rotate(0);transform-origin: center;}
		to{transform: rotate(180deg); transform-origin: center;}
	}
	@keyframes slidein{
		from{transform: translateX(0);transform-origin:0 center;}
		to{transform: translateX(100%); ;transform-origin:0 center;}
	}
	@keyframes slideout{
		from{transform: translateX(0);transform-origin:0 center;}
		to{transform: translateX(100%); ;transform-origin:0 center;}
	}*/
</style>

