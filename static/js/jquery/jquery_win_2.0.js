/*
 * 名称：弹窗控件/shineonWin
 * 作者：djl
 * 邮箱：474569696@qq.com
 * 日期：2016/4/14
 */
$.fn.shineonWin = function(options,fahterid) 
{			
	var defaults = {
	"width":"287px",//弹窗宽度
	"height":"215px",//弹窗高度
	"type":"txt",//弹窗类型input/txt/iframe/html
	"typehtmlfn":false,//html填充后执行方法
	"typemargin":"0px",
	"typepadding":"0px",
	"typeval":"",//input操作后的值/iframe的src地址
	"typewid":"100%",
	"typehei":"32px",
	"title":"标题",
	"iframeid":"",
	"iframeclass":"iframe",
	"iframefullscreen":false,
	"placehloder":"",
	"position":"auto",//auto为水平垂直居中，self为自定义传参+positionx,positiony
	"positionx":"auto",
	"positiony":"auto",
	"content":'',//嵌入的html代码,文本
	"btnshow":"block",//按钮显示隐藏block/none
	"btn":[["cancel","取&nbsp;&nbsp;消"],["save","保&nbsp;&nbsp;存"]],//按钮自定义
	"headshow":"block",//弹窗头部显示
	"scroll":"no",//no,yes,auto//iframe滚动与否
	"sure":function(){},
	"cancel":function(){},
	"close":function(){},
	"timeout":0,//无按钮，几秒后消失
	"timefn":function(){},//消失后回调
	"param":"",//弹窗临时调用数据，供iframe内部调用或其他页面调用
	"templates":false,//弹窗模板临时调用url,data数据，供iframe内部调用或其他页面调用{url:url,data:data}
	"bodyMinWid":1200,//body最小宽度值
	"iframesubfn":'init',//iframe调用子页面方法
	"titleEvent":{"event":true,"type":"pc"},//弹窗移动事件,指定event:true/false,type:pc/mobile
	"iframescrollLock":false,//iframe锁定父页面body.onmousewheel
	"resize":true//弹窗resize事件
	},
	winlen=0,
	settings  = $.extend({},defaults,options),
	appendhtml=function(){
		if($(".win").length!=0)
		{
			winlen=$(".win").length;
		}
		var seeheight=window.innerHeight||document.documentElement.clientHeight;
		var allhei=document.body.scrollHeight,heis;
		var scrolltopval =document.body.scrollTop|| document.documentElement.scrollTop;
		heis=scrolltopval+seeheight/2-parseInt(settings['height'])/2+"px";
		var html="<div class=\"win\" id=\"win"+winlen+"\" param=\""+settings['param']+"\" >";
		if(settings['position']=="auto")
		{
			html+="<div class=\"win_content\" style=\"height: "+settings['height']+";width:"+settings['width']+";margin:auto\">";
		}
		else
		{//待处理
			if(window.innerWidth<settings['bodyMinWid']){
				$("#win"+winlen).width(settings['bodyMinWid']);
				html+="<div class=\"win_content\" style=\"height: "+settings['height']+";width:"+settings['width']+";margin:auto\">";
			}else{
				html+="<div class=\"win_content\" style=\"height: "+settings['height']+";width:"+settings['width']+";left:"+(settings['positionx']=="auto"?($(window).width()/2-parseInt(settings['width'])/2)+"px":settings['positionx'])+";top:"+(settings['positiony']=="auto"?heis:settings['positiony'])+"\">";
			}
			
		}
			html+=	"<div class=\"title\" style=\"display:"+settings['headshow']+"\">";
			html+=		"<span class=\"menuname\">"+settings['title']+"</span>";
			html+=	"</div>";
			html+=	"<div class=\"winclose\"></div>";
			if(settings['type']=="txt")
			{
				html+="<div class=\"txt\">"+settings['content']+"</div>";
			}
			else if(settings['type']=="input")
			{
				// +";padding:"+settings['typepadding']+"
				html+=	"<input type=\"text\" value=\""+settings['typeval']+"\" class=\"input\" placeholder=\""+settings['placehloder']+"\" style=\"margin:"+settings['typemargin']+";padding:"+settings['typepadding']+";width:"+settings['typewid']+";height:"+settings['typehei']+"\"/>";
			}
			else if(settings['type']=="iframe")
			{
				if(settings.iframeid!=""){
					html+=	'<iframe allowfullscreen="'+settings.iframefullscreen+'" name="iframe'+winlen+'" id="'+settings.iframeid+'" param="'+settings['param']+'" scrolling="'+settings['scroll']+'" frameborder="0" src="'+settings['typeval']+'" class="'+settings.iframeclass+'" style="margin:'+settings['typemargin']+';padding:'+settings['typepadding']+';width:'+settings['typewid']+';height:'+settings['typehei']+'"/>';
				}else{
					html+=	'<iframe allowfullscreen="'+settings.iframefullscreen+'"  name="iframe'+winlen+'" param="'+settings['param']+'" scrolling="'+settings['scroll']+'" frameborder="0" src="'+settings['typeval']+'" class="'+settings.iframeclass+'" style="margin:'+settings['typemargin']+';padding:'+settings['typepadding']+';width:'+settings['typewid']+';height:'+settings['typehei']+'"/>';
				}
			}
			else
			{
				html+="<div class=\"content\">"+settings['content']+"</div>";
			}
			html+= "<div class=\"btnline\"  style=\"display:"+settings['btnshow']+"\">"
			for(var i =0;i<settings['btn'].length;i++)
			{
				if(settings['btn'][i][2]!=undefined){
					html+=	 "<div class=\""+settings['btn'][i][0]+"\" style=\"margin-left:"+settings['btn'][i][2]+"\">"+settings['btn'][i][1]+"</div>";
				}
				else
				{
					html+=	 "<div class=\""+settings['btn'][i][0]+"\" >"+settings['btn'][i][1]+"</div>";
				}
				
			}
			html+= "</div>";
			html+="</div>";
			html+="</div>";
			$("body").append(html);
			var seeheight=$("body").height();
			var allhei=document.body.scrollHeight;
			if(window.innerWidth<settings['bodyMinWid']){
				$("#win"+winlen).width(settings['bodyMinWid']);
			}
			if(allhei<seeheight)
			{
				$("#win"+winlen).height(seeheight);
			}
			else
			{
				$("#win"+winlen).height(allhei);
			}
			$("#win"+winlen).show();
			if(settings['type']=="iframe"){
				$("#win"+winlen +" .iframe").on("load",function(){
					var names = "iframe"+winlen;
					if(settings.templates){
						window.frames[names][settings.iframesubfn](settings.templates);
					}
				})
			}
	};
	if(settings.resize){
		var winresizeTimer = null;
		window.addEventListener("resize",function(){
			if (winresizeTimer){
				 clearTimeout(winresizeTimer);
			}
			winresizeTimer = setTimeout(function(){
				var winLen = $(".win").length;
				if(winLen){
					var seeheight=$("body").height();
					var allhei=document.body.scrollHeight;
					if(window.innerWidth<settings['bodyMinWid']){
						$(".win").width(settings['bodyMinWid']);
						$(".win .win_content").css({"left":"0","top":"0","margin":"auto"});
					}else{
						$(".win").css("width","100%");
					}
					if(allhei<seeheight)
					{
						$(".win").height(seeheight);
					}
					else
					{
						$(".win").height(allhei);
					}
				}
			}, 200);
		})
	}
	
	appendhtml();
	if(typeof settings['typehtmlfn'] === 'function'){
		settings['typehtmlfn']();
	}
	if(settings['timeout']!=0)
	{
		settings['btnshow']="none";
		$("#win"+winlen +" .btnline").hide();
		setTimeout(function(){
			$("#win"+winlen).remove();
			if(typeof settings['timefn']==="function"){
				settings['timefn'](fahterid);
			}
		},settings['timeout'])
		
	}
	if(settings.iframescrollLock){
		document.body.onmousewheel = function(){
			return false;
		}
	}
	//点击关闭，隐藏播放窗口
	var winobj=document.getElementsByClassName("win");
	for(var i=0;i<winobj.length;i++ ){
		if(winobj[i].getElementsByClassName("winclose").length>0){
			for(var j=0;j<winobj[i].getElementsByClassName("winclose").length;j++){//for ie8
				winobj[i].getElementsByClassName("winclose")[0].addEventListener("click",function(){
					var parentid=this.parentNode.parentNode.getAttribute("id");
					settings['close']();
					$("#"+parentid).remove();
					if(settings.iframescrollLock){
						document.body.onmousewheel = null;
					}
				},false)
			}
		}
		
	}
	//点击确定，隐藏播放窗口
	for(var i=0;i<winobj.length;i++ ){
		if(winobj[i].getElementsByClassName("save").length>0){
			for(var j=0;j<winobj[i].getElementsByClassName("save").length;j++){//for ie8
				winobj[i].getElementsByClassName("save")[j].addEventListener("click",function(){
					var parentid=this.parentNode.parentNode.parentNode.getAttribute("id");
					settings['sure'](parentid);
					if(settings.iframescrollLock){
						document.body.onmousewheel = null;
					}
				},false)
			}
		}
	}
	
	//点击取消，隐藏播放窗口
	for(var i=0;i<winobj.length;i++ ){
		if(winobj[i].getElementsByClassName("cancel").length>0){
			for(var j=0;j<winobj[i].getElementsByClassName("save").length;j++){//for ie8
				winobj[i].getElementsByClassName("cancel")[j].addEventListener("click",function(){
					var parentid=this.parentNode.parentNode.parentNode.getAttribute("id");
					settings['cancel'](parentid);
					if(settings.iframescrollLock){
						document.body.onmousewheel = null;
					}
				},false)
			}
		}
	}
	if(settings.titleEvent.event){
		var scrollwid =  window.innerWidth - document.documentElement.clientWidth;
		var scrollhei =  window.innerHeight - document.documentElement.clientHeight;
		if(settings.titleEvent.type == "pc"){
			//添加title移动
			var titlemoveflag = false;
			$("#win"+winlen+" .title").mousedown(function(e){
				document.onselectstart=function (){return false;}; 
				titlemoveflag = false;
				var _this = $(this);
				var ev = window.event||e;
				var downx = (ev.pageX||ev.clientX);
				var downy = (ev.pageY||ev.clientY);
				var parentleft = parseInt(_this.parent().css("left"));
				var parenttop = parseInt(_this.parent().css("top"));
				var parentwid = parseInt(_this.parent().css("width"));
				var parenthei = parseInt(_this.parent().css("height"));
				var comparex = window.innerWidth-parentwid+document.body.scrollLeft-scrollwid-4;
				var comparey = window.innerHeight-parenthei+document.body.scrollTop-scrollhei-4;
				titlemoveflag = true;
				$(this).mousemove(function(e){
					var ev = window.event||e;
					if(titlemoveflag){
						var movex = (ev.pageX||ev.clientX);
						var movey = (ev.pageY||ev.clientY);
						var xval = movex-downx;//x移动距离
						var yval = movey-downy;//y移动距离
						var leftval = (parentleft+xval)<0?0:parentleft+xval;
						var topval = (parenttop+yval)<0?0:(parenttop+yval);
						
						leftval = leftval>comparex?comparex:leftval;
						topval = topval>comparey?comparey:topval;
						
						_this.parent().css({"left":leftval+"px","top":(topval<=document.body.scrollTop?document.body.scrollTop:topval)+"px"})
					}else{
						titlemoveflag = false;
					}
				})
				$(document).mouseup(function(e){
					var ev = window.event||e;
					titlemoveflag = false;
					document.onselectstart=null;
				})
			})
		}else{
			//添加title移动
			var titlemoveflag = false;
			$("#win"+winlen+" .title").on("touchstart",function(e){
				document.onselectstart=function (){return false;}; 
				titlemoveflag = false;
				var _this = $(this);
				var ev = window.event||e;
				var touch = ev.touches[0]; //获取第一个触点
			    var downx  = Number(touch.pageX); //页面触点X坐标
			    var downy = Number(touch.pageY); //页面触点Y坐标
				var parentleft = parseInt(_this.parent().css("left"));
				var parenttop = parseInt(_this.parent().css("top"));
				var parentwid = parseInt(_this.parent().css("width"));
				var parenthei = parseInt(_this.parent().css("height"));
				var comparex = window.innerWidth-parentwid+document.body.scrollLeft-scrollwid-4;
				var comparey = window.innerHeight-parenthei+document.body.scrollTop-scrollhei-4;
				titlemoveflag = true;
				$(this).on("touchmove",function(e){
					var ev = window.event||e;
					if(titlemoveflag){
						var touchmove  = ev.touches[0], //获取第一个触点
					    movex  = Number(touchmove.pageX), //页面触点X坐标
					    movey  = Number(touchmove.pageY); //页面触点Y坐标
						var xval = movex-downx;//x移动距离
						var yval = movey-downy;//y移动距离
						var leftval = (parentleft+xval)<0?0:parentleft+xval;
						var topval = (parenttop+yval)<0?0:(parenttop+yval);
						
						leftval = leftval>comparex?comparex:leftval;
						topval = topval>comparey?comparey:topval;
						_this.parent().css({"left":leftval+"px","top":(topval<=document.body.scrollTop?document.body.scrollTop:topval)+"px"})
					}else{
						titlemoveflag = false;
					}
				})
				$(document).on("touchend",function(e){
					var ev = window.event||e;
					titlemoveflag = false;
					document.onselectstart=null;
				})
//				$(this).mouseout(function(e){
//					var ev = window.event||e;
//					titlemoveflag = false;
//					document.onselectstart=null;
//				})
			})
		}
		
	}
	//console.log(settings['btn'].length)
}
