/*
 * 名称：模拟单选按钮/shineonRadio
 * 作者：djl
 * 邮箱：474569696@qq.com
 * 日期：2017/2/21
 * 版本：v.1.0
 */
$.fn.shineonRadio = function(options,fn) 
{
		var	defaults = {
		"father":".radiofather span",//最外围元素样式
		"selected":"radioed",//模拟选中样式表名称
		"select":"radio",//模拟未选中样式表名称
		"initval":true,//有初始化值，初始化值为true选中样式
		"initnum":0,//是否有初始化值
		"fatheridclass":".checkline",//多行单选，每行的样式表,用于多列单选的回调id获取或者val获取
		"listdom":false,//用于指定多列单选，class或者id，用于清除其他单选选项
		"listdomtype": {"R":false,"I":false},//用于多列取消单选，RI=radioed+input,R=radioed,I=input(是否有input),必须配合listdom使用   {"R":".radioed","I":"radio"}
		"disabled":false//是否禁用单选
		},
		arg = (typeof arguments[0]),
		len = arguments.length,
		settings = $.extend({},defaults,options);
		$(settings.father).find("input[type=radio]").hide();
		for(var j=0;j<$(settings.father).length;j++)
		{
			if(settings.initnum){//有初始化值，选中
				$(settings.father).eq(j).find("input[type=radio]").eq(settings.initnum).attr("checked",settings.initval);
				$(settings.father).eq(j).find("input[type=radio]").eq(settings.initnum).prop("checked",settings.initval);
			}
			else
			{
				var radioobj=$(settings.father).eq(j).find("input[type=radio]");
				for(var i=0;i<radioobj.length;i++){
					if(radioobj.eq(i).prop("checked"))
					{
						radioobj.eq(i).parent().attr("class","radioed");
						break;
					}
				}
				
			}
		}
		//单选按钮操作
		if(!settings.disabled){
			$(settings.father).off().on("click",function(){
				var flag = $(this).attr("class");
				if(navigator.userAgent.toLowerCase().match(/.(msie)[\/: ]([8.]+)/) != null){
					flag = $.trim(flag.replace(/(slvzr-focus)/gi,""))
				}
				if(flag == settings.select)
				{
					if(settings.listdom){
						if(!settings.listdomtype){
							throw new Error("未指定listdomtype参数");
						}else{
							if(settings.listdomtype.R&&!settings.listdomtype.I){
								$(settings.listdom).find(settings.listdomtype.R).attr("class",settings.select);
							}else if(settings.listdomtype.I&&!settings.listdomtype.R){
								$(settings.listdom).find("input[type="+settings.listdomtype.I+"]").removeAttr("checked");
								$(settings.listdom).find("input[type="+settings.listdomtype.I+"]").prop("checked",false);
							}else if(settings.listdomtype.R&&settings.listdomtype.I){
								$(settings.listdom).find(settings.listdomtype.R).attr("class",settings.select);
								$(settings.listdom).find("input[type="+settings.listdomtype.I+"]").removeAttr("checked");
								$(settings.listdom).find("input[type="+settings.listdomtype.I+"]").prop("checked",false);
							}
							
						}
						
					}
					//$(this).parent().attr("class",settings.select);
					$(settings.father).find("input[type=radio]").removeAttr("checked");
					$(settings.father).find("input[type=radio]").prop("checked",false);
					$(this).attr("class",settings.selected);
					$(this).siblings().attr("class",settings.select);
					$(this).find("input[type=radio]").attr("checked","checked").prop("checked",true);
				}
	//			else
	//			{
	//				$(this).attr("class",settings.select);
	//			}
				if(len==1 && arg==="function")
				{
					fn = options;
					fn();	
				}	
				else
				{
					if(typeof fn==="function"){
						var id="",val="";
						if($(this).parents(settings.fatheridclass).attr("id"))
						{
							id=$(this).parents(settings.fatheridclass).attr("id");
						}
						if($(this).find("input[type='radio']").val())
						{
							val=$(this).find("input[type='radio']").val();
						}
						if(id&&val){
							fn(id,val);	
						}else if(id){
							fn(id);	
						}else if(val){
							fn(val);	
						}else{
							fn();	
						}
						
					}
				}
			});	
		}
}
/*
 *<div class="radiofather">
 *	<span class="radio"><input type=radio>普通教师</span>
 *	<span class="radio">input type=radio>教研员</span>
 *</div> 
 * //单选按钮
 *	$().shineonRadio(function(){
 *		console.log("a")
 *	});
 * */
$.fn.shineonCheckbox = function(options,fn) 
{
		var	defaults = {
		"father":".checkboxfather span",//最外围元素样式
		"selected":"checkboxed",//原生select id
		"select":"checkbox",
		"initelement":"dom",//初始化input的checked   input/dom  默认为dom，模拟元素本身
		"disabled":false//是否可用
		},
		arg = (typeof arguments[0]),
		len = arguments.length,
		settings = $.extend({},defaults,options);
		$(settings.father).find("input[type='checkbox']").hide();
		var checkboxlen=$(settings.father).find("input[type=checkbox]").length;
		for(var i=0;i<checkboxlen;i++){
			//console.log($(settings.father).find("input[type=checkbox]").eq(i).parent().attr("class"))
			if(settings.initelement=="input")
			{
				if($(settings.father).find("input[type=checkbox]").eq(i).attr("checked")=="checked"){
					$(settings.father).find("input[type=checkbox]").eq(i).attr("checked","checked").prop("checked",true);;
					$(settings.father).find("input[type=checkbox]").eq(i).parent().attr("class","checked");
				}else{
					$(settings.father).find("input[type=checkbox]").eq(i).removeAttr("checked");
					$(settings.father).find("input[type=checkbox]").eq(i).prop("checked",false);
					$(settings.father).find("input[type=checkbox]").eq(i).parent().attr("class","check");
				}
			}
			else if(settings.initelement=="dom")
			{
				if($(settings.father).find("input[type=checkbox]").eq(i).parent().attr("class")==settings.selected){
					$(settings.father).find("input[type=checkbox]").eq(i).attr("checked","checked");
				}else{
					$(settings.father).find("input[type=checkbox]").eq(i).removeAttr("checked");
				}
			}
			
		}
		
		//单选按钮操作
		if(!settings.disabled){
			$(settings.father).off().on("click",function(){
				var flag = $(this).attr("class");
				if(navigator.userAgent.toLowerCase().match(/.(msie)[\/: ]([8.]+)/) != null){
					flag = $.trim(flag.replace(/(slvzr-focus)/gi,""))
				}
				if(flag == settings.select)
				{
					$(this).attr("class",settings.selected);
					$(this).find("input[type=checkbox]").attr("checked","checked").prop("checked",true);
				}
				else
				{
					$(this).attr("class",settings.select);
					$(this).find("input[type=checkbox]").removeAttr("checked");
					$(this).find("input[type=checkbox]").prop("checked",false);
				}
				if(len==1 && arg==="function")
				{
					fn = options;
					fn();	
				}	
				else
				{
					if(typeof fn==="function"){
						fn($(this));	
					}
				}
			});	
		}
}