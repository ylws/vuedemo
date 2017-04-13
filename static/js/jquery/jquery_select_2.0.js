/*
 * 名称：模拟下拉菜单/shineonSelect
 * 作者：djl
 * 邮箱：474569696@qq.com
 * 日期：2016/4/14
 */
$.fn.shineonSelect = function(options,num,fn) 
{		
		var temparr=[];
		if(typeof arguments[0]=== "number" && arguments.length == 1)
		{
			num = arguments[0];
		}
		else if(typeof arguments[0]=== "function" && arguments.length == 1)
		{//当没有输入num值得时候，且只有1个回调方法的时候，默认实例化第一个
			fn = arguments[0];
			num = 0;
		}
		else if(arguments.length == 2 && typeof arguments[0]=== "number" && typeof arguments[1]=== "function" )
		{
			temparr[0] = arguments[0];
			temparr[1] = arguments[1]
			num = temparr[0];
			fn  = temparr[1];
		}
		var _this=this,
		_len = arguments.length,
		defaults = {
		"father":".sall",//最外围元素样式
		"ssid":"#select",//原生select id
		"ssarr":".arrow",//箭头样式
		"ssdaid":"#selectdivall",//整个文本区域和下拉元素id
		"ssdid":"#selectdiv",//文本区域id
		"ssduid":"#selectdivul",//下拉区域id
		"fatherwid":158,//整体宽度
		"ssdidwid":120,//文本区域宽度
		"ssdarwid":38,//箭头宽度
		"ssdidhei":38,//文本区域高度
		"border":"1px solid #dfdfdf",//外围元素边框
		"fontsize":"14px",
		"textindent":"10px",
		"letterspace":"normal",
		"position":"down",//指定下拉菜单方向
		"disabled":false//是否可用
		},
		    settings  = $.extend({},defaults,options),
		    ssid      = settings.ssid,
		      sf      = settings.father,
		  ssdaid      = settings.ssdaid,
		   ssdid      = settings.ssdid,
		  ssduid      = settings.ssduid,
		      sb      = settings.border,
		     sfw      = settings.fatherwid,
		  ssdidh      = settings.ssdidhei,
		    sarr      = settings.ssarr,
		ssdarwid      = settings.ssdarwid,
		     sfs      = settings.fontsize,
		     sti      = settings.textindent,
		     slp      = settings.letterspace,
		     spoi     = settings.position, 
		sdisabled     = settings.disabled,
 		htmlinsert=function(args,flag)
		{
			$(ssduid+args).html(" ");
			var selectobj = $(ssid+args);
			var divobj    = $(ssdid+args);
			var divulobj  = $(ssduid+args);
			var sdefault=selectobj.find("option:selected");//获取默认选中值
			sdefault.attr("selected","selected");
			selectobj.attr("onchange","shineonchange()");
			divobj.attr("flag","false");
			if(flag=="false")
			{
				divobj.attr("flag","true");
			}
			else
			{
				divobj.attr("flag","false");
			}
			$(ssdid+args).text(sdefault.text());//赋值给模拟div的text
			var optlen=selectobj.find("option").length;//获取option的长度
			for(var i=0;i<optlen;i++)
			{
				var optval=selectobj.find("option").eq(i).text();//获取每一个select的值
				var disable=selectobj.find("option").eq(i).attr("disabled");
				if(disable)
				{
					var htmlto="<a href=javascript:void(0) class=noevent style=background:#ededed>"+optval+"</a>";//赋值给a标签
				}
				else
				{
					var htmlto="<a href=javascript:void(0)>"+optval+"</a>";//赋值给a标签
				}	
				divulobj.append(htmlto);//将a标签添加到模拟div
			}
		},
		divcshow=function(args)
		{
			if(!sdisabled){
				//点击模拟下拉框，显示或隐藏内容
				$(ssdid+args).off().on("click",function(){
					var checkflag=$(ssdid+args).attr("flag");
					var flag=$(ssduid+args).css("display");//判断当前模拟下拉菜单的显示属性
					if(flag=="none"&&checkflag=="true"||flag=="none"&&checkflag=="false")
					{//隐藏，则显示
						$(ssduid+args).css("display","block");
						$(ssdid+args).attr("flag","false");
						if(spoi=="top")
						{
							$(ssduid+args).css("top",-$(ssduid+args).height()+"px")
						}
					}
					else
					{//显示，则隐藏
						$(ssduid+args).css("display","none");
					}
				});
				//点击模拟箭头，显示或隐藏内容
				$("#"+sarr.substr(1)+args).off().on("click",function(){
					var checkflag=$(ssdid+args).attr("flag");
					var flag=$(ssduid+args).css("display");//判断当前模拟下拉菜单的显示属性
					if(flag=="none"&&checkflag=="true"||flag=="none"&&checkflag=="false")
					{//隐藏，则显示
						$(ssduid+args).css("display","block");
						$(ssdid+args).attr("flag","false");
						if(spoi=="top")
						{
							$(ssduid+args).css("top",-$(ssduid+args).height()+"px")
						}
					}
					else
					{//显示，则隐藏
						$(ssduid+args).css("display","none");
					}
				});
				//点击空白区域，隐藏select模拟
				$(document).bind("click",function(e){
					var target = $(e.target);//获取点击时间
					if(target.closest(ssdaid+args).length == 0)
					{
						$(ssduid+args).hide();//隐藏divli
					}
				})
			}
		},
		divulaclick=function(args){
			//点击模拟a标签，重新选定原生select选项
			$(document).on("click",ssduid+args+" a",function(){
				var index=$(this).index();//获取a标签的索引值
				if($(this).attr("class")=="noevent")
				{
					return false;
				}
				$(ssid+args).find("option").eq(index).prop("selected","selected");//根据a标签的索引值选择select原生的值
				$(ssduid+args).css("display","none");//选中模拟值后，隐藏该div
				$(ssdid+args).text($(ssid+args).find("option").eq(index).text());//把选中的值赋值到模拟div默认值选项
				if(typeof fn === "function")
				{
					fn($(ssid+args).find("option:selected").val(),args);
				}
			});
		},
		shineonchange=function(){
			if(typeof num!=="undefined")
			{
				htmlinsert(num,"false")//循环调用赋值方法
				divcshow(num);
			}
			else
			{
				$(settings.father).each(function(j){
					htmlinsert(j,"false")//循环调用赋值方法
					divcshow(j);
				})
			}
			
		},
		init=function(num){
			if(typeof num!=="undefined")
			{
				htmlinsert(num,"true")//循环调用赋值方法
				//界面初始化操作
				$(ssid+num).parent().css({"border":sb,"width":sfw+"px"});
				$(ssdaid+num).css({"width":sfw+"px"});
				$(ssdid+num).css({"font-size":sfs,"height":ssdidh+"px","letter-spacing":slp,"text-indent":sti,"width":(sfw-ssdarwid)+"px","line-height":ssdidh+"px"});
				$(ssduid+num).css({"font-size":sfs,"width":sfw+"px","top":ssdidh+"px"});
				$(ssduid+num+" a").css({"height":ssdidh+"px","letter-spacing":slp,"line-height":ssdidh+"px","text-indent":sti});
				$(ssduid+num).next().attr("id",sarr.substr(1)+num);
				$("#"+sarr.substr(1)+num).css({"width":ssdarwid+"px","height":ssdidh+"px","line-height":ssdidh+"px"});
				divcshow(num);
				divulaclick(num);
			}
			else
			{
				$(settings.father).each(function(j){
					htmlinsert(j,"true");//循环调用赋值方法
					divcshow(j);
					divulaclick(j);
				})
				$(sf).css({"border":sb,"width":sfw+"px"});
				$("."+ssdaid.substring(1)).css({"width":sfw+"px"});
				$("."+ssdid.substring(1)).css({"font-size":sfs,"height":ssdidh+"px","letter-spacing":slp,"text-indent":sti,"width":(sfw-ssdarwid)+"px","line-height":ssdidh+"px"});
				$("."+ssduid.substring(1)).css({"font-size":sfs,"width":sfw+"px","top":ssdidh+"px"});
				$("."+ssduid.substring(1)+" a").css({"letter-spacing":slp,"text-indent":sti});
				$(sarr).css({"width":ssdarwid+"px","height":ssdidh+"px","line-height":ssdidh+"px"});
			}
			
		};
		//用户列表插入用户事件监听
		if($("#select"+num).attr("id")!=undefined)
		{
			if(window.addEventListener){
				document.getElementById("select"+num).addEventListener('DOMNodeInserted',function(){
					init(num);
				} , false);
			}
		}
		else
		{
			throw new Error("初始化下拉菜单id  select"+num+"不存在！请查看$().shineonSelect({},"+num+",fn)调用信息！");
		}
		
		init(num);
		return htmlinsert;		
}
