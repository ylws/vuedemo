/*
 * 名称：日历/shineonCalendar
 * 作者：djl
 * 邮箱：474569696@qq.com
 * 日期：2016/4/14
 * $().shineonCalendar({
 * 	"id":"start",//inputid
 * 	"flag":"2015-10-12 0:0:0",//初始化值o
 * 	"partline":"-",//年月日间隔线
 * 	"min":"2016-9-10 12:00:50",//设置最小值，需要compareflag=true,for="s_C+id"
 *  "max":"2016-9-10 12:00:50",//设置最小值，需要compareflag=true,for="e_E+id"
 * 	"time":true,//是否显示小时分钟秒true(显示时分秒)/false（隐藏时分秒）/hM（隐藏秒）/h（隐藏小时分钟）
 * 	"today":true,//是否显示今天按钮
 *  "clear":true,//是否显示清空按钮
 *	"ymd":"ymdhMs",//年月日显示格式ymdhMs(M表示分钟)
 *	"compareflag":"true",//是否需要对比开始结束日期
 *  "canlendericon":".canlendericon",
 *	"for":"e_end"//关联对比inputid,e_表示结束日期end表示结束日期input的id值s_表示结束日期end表示开始日期input的id值
 *  "focuschange":true/false//当需要比对的日期都为空的时候的开关，true为都为空，false有一个不为空（focusreset的change参数）
 * 	"valShow":true;初始化显示val值
 *  "disabled":true,//日历可用不可用
 *	})
 * _month,_year,_hour等用来记录当前选中的年月日所选的排序
 */
$.fn.shineonCalendar = function(options,fn) 
{	
	//函数是否有效标识
	var fns=false;
	 if(arguments.length==1 && typeof arguments[0]==="function")
	 {
	 	fn=options;
	 	fns=true;
	 }
	 if(arguments.length==2&&typeof arguments[1]==="function")
	 {
	 	fns=true;
	 }
	 //参数错误判断
	 if((arguments.length==2&&typeof arguments[0]!="object")||(arguments.length==2&&typeof arguments[1]!="function"))
	 {
	 	throw new Error("输入参数错误！");
	 }
	 if((arguments.length==1&&typeof arguments[0]!="function")&&(arguments.length==1&&typeof arguments[0]!="object"))
	 {
	 	throw new Error("输入参数错误1！");
	 }
	var _this=this;
	var partline = "-",//日期格式
		timestartid = "",
		timeendid = "",//比较开始时间和结束时间的id
		compareflag = false,
		optionsdefault={
		 	"id":"start",
		 	"flag":"",
		 	"partline":"-",
		 	"min":"",
		 	"max":"",
		 	"time":true,
		 	"today":true,
		 	"clear":true,
			"ymd":"ymd",
			"compareflag":"false",
			"focuschange":false,
			"valShow":false,
			"disabled":false
		},
		time,
		ymd,
		nowtiming,
		defaults = {
			"can":"canlender",
			"chy":"canlerder_header_year",
			"chm":"canlerder_header_month",
			"chyal":"canlerder_header_year_arrowleft",
			"chmal":"canlerder_header_month_arrowleft",
			"chyad":"canlerder_header_year_arrowdown",
			"cchtxt":"canlerder_content_hmsandlist_hourtxt",
			"ccmtxt":"canlerder_content_hmsandlist_minutestxt",
			"ccstxt":"canlerder_content_hmsandlist_secondstxt",
			"ccd":"canlerder_content_day",
			"cchls":"canlerder_content_hour_lists",
			"ccmls":"canlerder_content_minutes_lists",
			"ccsls":"canlerder_content_seconds_lists",
			"chyl":"canlerder_header_yearlist",
			"chyls":"canlerder_header_yearlists",
			"chml":"canlerder_header_monthlist",
			"ccsl":"canlerder_content_seconds_list",
			"cchl":"canlerder_content_hour_list",
			"chyar":"canlerder_header_year_arrowright",
			"chmar":"canlerder_header_month_arrowright",
			"ccml":"canlerder_content_minutes_list",
			"btnsure":"canlerder_content_hmsandlist_sure",
			"btncancel":"canlerder_content_hmsandlist_cancel",
			"btntoday":"canlerder_content_hmsandlist_today",
			"chylup":"canlerder_header_yearlistup",
			"chyldown":"canlerder_header_yearlistdown",
			"chmad":"canlerder_header_month_arrowdown",
			"cchlt":"canlerder_content_hour_list_title",
			"ccmlt":"canlerder_content_minutes_list_title",
			"ccslt":"canlerder_content_seconds_list_title",
			"canicon":".canlendericon"
		},
		settings  = $.extend({},defaults),
		schy = settings.chy,
		schm = settings.chm,
		chyal = settings.chyal,
		chmal = settings.chmal,
		chyad = settings.chyad,
		cchtxt = settings.cchtxt,
		ccmtxt = settings.ccmtxt,
		ccstxt = settings.ccstxt,
	    ccd    = settings.ccd,
	    cchls  = settings.cchls,
	    ccmls  = settings.ccmls,
	    ccsls  = settings.ccsls,
	    chyl   = settings.chyl,
	    chyls  = settings.chyls,
	    chml   = settings.chml,
	    ccsl   = settings.ccsl,
	    cchl   = settings.cchl,
	    chyar  = settings.chyar,
	    chmar  = settings.chmar,
	    ccml   = settings.ccml,
	    can   = settings.can,
	    canicon = settings.canicon,
	    btnsure   = settings.btnsure,
	    btncancel = settings.btncancel,
	    btntoday  = settings.btntoday,
	    chylup  = settings.chylup,
	    chyldown  = settings.chyldown,
	    chmad = settings.chmad,
	    cchlt = settings.cchlt,
	    ccmlt = settings.ccmlt,
	    ccslt = settings.ccslt,
	    opt  = $.extend({},optionsdefault,options),
	    partline = opt["partline"],
	    
		canlendaradd=function(){
			html='<div class="'+can+'" style="display:none" id="'+opt["id"]+'__canlender">';
			html+='<div class="error">';
			html+='<div class="error_title">错误</div>';
			html+='<div class="errortxt">输入错误，请重新填写</div>';
			html+='</div>';
			html+='<div class="canlerder_header">';
			html+='<div class="noclick"><div class="arrowleft"></div></div>';
			html+='<div class="'+chyal+'"><div class="arrowleft"></div></div>';
			html+='<div class="'+schy+'" year=""></div>';
			html+='<div class="'+chyad+'"><div class="arrowright90"></div></div>';
			html+='<div class="noclick"><div class="arrowright"></div></div>';
			html+='<div class="'+chyar+'"><div class="arrowright"></div></div>';
			html+='<div class="noclick"><div class="arrowleft"></div></div>';
			html+='<div class="'+chmal+'"><div class="arrowleft"></div></div>';
			html+='<div class="'+schm+'" month=""></div>';
			html+='<div class="'+chmad+'"><div class="arrowright90"></div></div>';
			html+='<div class="noclick"><div class="arrowright"></div></div>';
			html+='<div class="'+chmar+'"><div class="arrowright"></div></div>';
			html+='<div class="'+chyl+'">';
			html+='<div class="'+chylup+'">上一页</div>';
			html+='<div class="'+chyls+'"></div>';
			html+='<div class="'+chyldown+'">下一页</div>';
			html+='</div>';
			html+='<div class="'+chml+'"></div>';
			html+='</div>';
			html+='<div class="canlerder_content">';
			html+='<div class="canlerder_content_week">';	
			html+='<span>日</span>';	
			html+='<span>一</span>';
			html+='<span>二</span>';	
			html+='<span>三</span>';		
			html+='<span>四</span>';	
			html+='<span>五</span>';		
			html+='<span>六</span>';			
			html+='</div>';		
			html+='<div class="'+ccd+'"></div>';		
			html+='<div class="canlerder_content_hmsandlist">';		
			html+='<div class="canlerder_content_hmsandlist_timetxt">时间：</div>';	
			html+='<div class="'+cchtxt+'"></div>';
			html+='<div class="canlerder_content_hmsandlist_othertxt">：</div>';		
			html+='<div class="'+ccmtxt+'"></div>';		
			html+='<div class="canlerder_content_hmsandlist_othertxt">：</div>';			
			html+='<div class="'+ccstxt+'"></div>';		
			html+='<div class="'+cchl+'">';		
			html+='<div class="'+cchlt+'">小时<span>x</span></div>';		
			html+='<div class="'+cchls+'"></div>';		
			html+='</div>';		
			html+='<div class="'+ccml+'">';		
			html+='<div class="'+ccmlt+'">分钟<span>x</span></div>';		
			html+='<div class="'+ccmls+'"></div>';		
			html+='</div>';		
			html+='<div class="'+ccsl+'">';		
			html+='<div class="'+ccslt+'">秒<span>x</span></div>';	
			html+='<div class="'+ccsls+'"></div>';		
			html+='</div>';		
			html+='<div class="'+btnsure+'">确定</div>';		
			html+='<div class="'+btncancel+'">清空</div>';	
			html+='<div class="'+btntoday+'">今天</div>';	
			html+='</div>';			
			html+='</div>';	
			html+='</div>';
			if($("."+can).length<=0)
			{
				$("body").append(html);
			}
			//日历图标按钮判定，如果是，添加id
			var chargeicon=$("#"+opt['id']).next().attr("class");
			if(chargeicon==canicon.substring(1))
			{
				$("#"+opt['id']).next().attr("id",opt['id']+canicon.substring(1));
			}
		},
		//重置元素方法
		resetfor=function(datalen,elclass,clas,num){
			for(i=num;i<datalen;i++)
			{
				$(elclass+i).attr("class",clas);
			}
		},
		//隐藏元素方法
		hidecalender=function(){
			for(var i=0;i<arguments.length;i++){
				if(arguments[i]!="")
				{
					$("."+arguments[i]).hide();
				}
			}
		},
		//显示日历方法
		showcalender=function(){
			for(var i=0;i<arguments.length;i++){
				if(arguments[i]!="")
				{
					$("."+arguments[i]).show();
				}
			}
		}
		,
		//设置input的值
		setinputval=function(year,month,day,hour,minutes,seconds,id,canlendershow){
			//修正年份属性和值
			setattr(".",schy,"set","year",year);
			settxt(".",schy,"set",year+"年");
			setattr(".",schy,"set","id","pink"+year);//年份列表
			//修正月份属性和值
		    setattr(".",schm,"set","month",month);
		    settxt(".",schm,"set",twobyte(month)+"月");
		    setattr(".",schm,"set","id","pinkm"+(month-1));//月份列表
		    //重置年月日时分秒列表元素内容
			resetyear(year,month);
			resetmonth(month-1);
			resetdays(month,year,day);
		    resethour(hour);
		    resetminutes(minutes);
		    resetseconds(seconds);
		    //设置年月日时分秒的id
		    btnsevent(id,year,month,day,hour,minutes,seconds,month-1,"false");
		    if(canlendershow=="undefined"||canlendershow=="hide")
		    {
		    	$("."+can).hide();
		    }
		    else
		    {
		    	$("."+can).show();
		    }
		},
		//格式化返回值，带0，不带0twobyte
		twobyte=function(param){
			return (param<10?"0"+param:param);
		},
		//注：初始化后，因为做的是循环初始化，初始后的最终值与当前的日历值不相符;所以需要与当前input的值进行判断，如果值一样，则不变，否则，需要将input的值返回
		returnnowdate=function(){
			var thisid     = cid();
			nowyear        = parint(setattr("#",thisid,"get","year",0)),
			nowmonth       = parint(setattr("#",thisid,"get","month",0)),
			nowday         = parint(setattr("#",thisid,"get","day",0)),
			nowhour        = parint(setattr("#",thisid,"get","hour",0)),
			nowminutes     = parint(setattr("#",thisid,"get","minutes",0)),
			nowseconds     = parint(setattr("#",thisid,"get","seconds",0));
			return nowyear+partline+nowmonth+partline+nowday+partline+nowhour+partline+nowminutes+partline+nowseconds;
		},
		//返回当前id
		cid=function(){
			var canlendarid=$("."+can).attr("id").split("__");
			return canlendarid[0];
		},
		//获取天数方法
		getday=function(month,year){
			switch(month)
			{
				case 0:
				case 1:
				case 3:
				case 5:
				case 7:
				case 8:
				case 10:
				case 12:
					return 31;
					break;
				case 2:
					if((year % 4 == 0) && (year % 100 != 0 || year % 400 == 0))
					{
						//瑞年
						return 29;
					}else{
						return 28;
					}
					break;
				case 4:
				case 6:
				case 9:
				case 11:
					return 30;
					break;
			}
		},
		//返回星期方法
		weekdaying=function(y,m,d){
			var nowweek=new Date(y, m-1, d).getDay();
			return nowweek;	
		},
		//返回格式化日期
		fomcatdate=function(txt,realval){
			if(realval<10)
			{
				txt="0"+realval;
				return txt;
			}
			else
			{
				txt=realval;
				return txt;
			}
		},
		//格式化返回input日期值,无id值
		fomcatinputval=function(year,month,day,hour,minutes,seconds,id,ymd){
			var inputval;
			if(ymd=="ymd")
			{
				inputval=year+partline+twobyte(parint(month))+partline+twobyte(parint(day))+" "+twobyte(parint(hour))+":"+twobyte(parint(minutes))+":"+twobyte(parint(seconds))
			}
			else
			{
				inputval=twobyte(parint(month))+partline+twobyte(parint(day))+partline+year+" "+twobyte(parint(hour))+":"+twobyte(parint(minutes))+":"+twobyte(parint(seconds))
			}
			time=setattr("#",id,"get","time",0);
			if(time=="false")
			{
				inputval=inputval.split(" ")[0];
			}
			else
			{
				inputval=inputval;
			}
			return inputval;
		},
		//返回数值
		parint=function(param){
			return parseInt(param,10);
		},
		//设置attr属性
		setattr=function(idorclass,idclassval,setorget,attrparam1,attrparam2){
			if(idorclass=="#")
			{
				if(setorget=="get"&&attrparam2==0)
				{
		
					var thisval=$("#"+idclassval).attr(attrparam1);
					return thisval;
				}
				else
				{
					$("#"+idclassval).attr(attrparam1,attrparam2);
				}
			}
			else
			{
				if(setorget=="get"&&attrparam2==0)
				{
					var thisval=$("."+idclassval).attr(attrparam1);
					return thisval;
				}
				else
				{
					$("."+idclassval).attr(attrparam1,attrparam2);
				}
			}
		},
		//设置txt属性
		settxt=function(idorclass,idclassval,setorget,setgetval){
			if(idorclass=="#")
			{
				if(setorget=="get" &&setgetval==0)
				{
					var thisval=$("#"+idclassval).text();
					return thisval;
				}
				else
				{
					$("#"+idclassval).text(setgetval);
				}
			}
			else
			{
				if(setorget=="get" &&setgetval==0)
				{
					var thisval=$("."+idclassval).text();
					return thisval;
				}
				else
				{
					$("."+idclassval).text(setgetval);
				}
			}
		},
		//下个月处理函数
		nextmonthopt=function(premonthval,year){
			var inputid = cid(),
			    datearr = "";
			if( opt["id"]==inputid)
			{
				datearr=parint(opt["day"]);
			}
			$("."+ccd).html("");
			var nextmonth=getday(premonthval+1,year);
			var nextmonthspan="";
			for(i=1;i<=nextmonth;i++){
				if(i==datearr)
				{
					nextmonthspan+="<span id=\"pinkd"+i+"\" class=\"dayselected\">"+i+"</span>";
				}
				else
				{
					nextmonthspan+="<span id=\"pinkd"+i+"\" class=\"action\">"+i+"</span>";
				}
			}
			$("."+ccd).append(nextmonthspan);
			// 确定下个月月一号是周几
			var weekdayfirst=weekdaying(year,premonthval+1,1)-1;
			if(weekdayfirst<0){
				weekdayfirst=6;
			}
			//确定上个月的天数
			var startinsertlen=getday(premonthval,year);
			var daymax=getday(premonthval+1);
			var insertday="";
			for(i=startinsertlen-weekdayfirst;i<=startinsertlen;i++){
				insertday+="<span class=\"noaction pre\">"+i+"</span>";
			}
			$("."+ccd+" span").eq(0).before(insertday);
			//确定一共有多少个子元素，剩余添加
			var dayspanlen=42-$("."+ccd+" span").length;
			var endinsertday="";
			for(i=0;i<dayspanlen;i++){
				endinsertday+="<span class=\"noaction next\">"+(i+1)+"</span>";
			}
			$("."+ccd).append(endinsertday);
			var comparedate=new Date();
			if(premonthval==comparedate.getMonth())
			{
				if(datearr=="")
				{
					$("#pinkd"+comparedate.getDate()).click();
				}
			}
			resetstartend(cid());
			dayclick();
		    secondsclick();
		    minutesclick();
		    hoursclick();
		},
		//上个月处理函数
		premonthopt=function(premonthval,year){
			var inputid = cid();
			var datearr = "";
			if( opt["id"]==inputid)
			{
				datearr=parint( opt["day"]);
			}
			$("."+ccd).html("");
			var premonth=getday(premonthval-1,year);
			var premonthspan="";
			for(i=1;i<=premonth;i++){
				premonthspan+="<span id=\"pinkd"+i+"\" class=\"action\">"+i+"</span>";
			}
			$("."+ccd).append(premonthspan);
			// 确定上个月月一号是周几
			var weekdayfirst=weekdaying(year,premonthval-1,1)-1;
			
			if(weekdayfirst<0){
				weekdayfirst=6;
			}
			//确定上个月的天数
			var startinsertlen=getday(premonthval,year);
			var daymax=getday(premonthval+1);
			var insertday="";
			for(i=startinsertlen-weekdayfirst;i<=startinsertlen;i++){
				insertday+="<span class=\"noaction pre\">"+i+"</span>";
			}
			$("."+ccd+" span").eq(0).before(insertday);
			//确定一共有多少个子元素，剩余添加
			var dayspanlen=42-$("."+ccd+" span").length;
			var endinsertday="";
			for(i=0;i<dayspanlen;i++){
				endinsertday+="<span class=\"noaction next\">"+(i+1)+"</span>";
			}
			$("."+ccd).append(endinsertday);
			var comparedate=new Date();
			if((premonthval-2)==comparedate.getMonth())
			{
				if(datearr=="" && datearr!=NaN)
				{
					$("#pinkd"+comparedate.getDate()).click();
				}
				else
				{
					if($("#"+timestartid).attr("compareflag")=="true"&&$("#"+timeendid).attr("compareflag")=="true")
					{
						compare(timestartid,timeendid,"","","","","","","")	;
					}
					else
					{
						$("#pinkd"+parint($("#"+inputid).attr("day"))).attr("class","dayselected");
					}
				}
			}
			resetstartend(cid());
			dayclick();
		    secondsclick();
		    minutesclick();
		    hoursclick();
		},
		//切换年份加，处理天
		yearchangeopt=function(thismonth,year){
			var inputid   = cid();
			$("."+ccd).html(" ");
			var thismonthday=getday(thismonth,year);
			var thisdayspan="";
			for(i=1;i<=thismonthday;i++){
				thisdayspan+="<span id=\"pinkd"+i+"\" class=\"action\">"+i+"</span>";
			}
			$("."+ccd).append(thisdayspan);
			// 确定本月月一号是周几
			var weekdayfirst=weekdaying(year,thismonth,1)-1;
			if(weekdayfirst<0){
				weekdayfirst=6;
			}
			//确定上个月的天数
			var startinsertlen=getday(thismonth-1,year);
			var insertday="";
			for(i=startinsertlen-weekdayfirst;i<=startinsertlen;i++){
				insertday+="<span class=\"noaction pre\">"+i+"</span>";
			}
			$("."+ccd+" span").eq(0).before(insertday);
			//确定一共有多少个子元素，剩余添加
			var dayspanlen=42-$("."+ccd+" span").length;
			var endinsertday="";
			for(i=0;i<dayspanlen;i++){
				endinsertday+="<span class=\"noaction next\">"+(i+1)+"</span>";
			}
			$("."+ccd).append(endinsertday);
			if($("#"+inputid).attr("for")!=undefined){
				var nowinputfor = $("#"+inputid).attr("for").split("_");
		    	if(nowinputfor[0]=="s")
		    	{
		    		timestartid = nowinputfor[1];
		    		timeendid   = inputid;
		    	}
		    	else if(nowinputfor[0]=="e")
		    	{
		    		timestartid = inputid;
		    		timeendid   = nowinputfor[1];
		    	}
				
				if($("#"+timestartid).attr("compareflag")=="true"&&$("#"+timeendid).attr("compareflag")=="true")
				{
					compare(timestartid,timeendid,"","","","","","","")	;
				}
				else
				{
					$("#pinkd"+parint($("#"+inputid).attr("day"))).attr("class","dayselected");
				}
			}
			dayclick();
		    secondsclick();
		    minutesclick();
		    hoursclick();
		    monthclick();
		},
		//重置年
		resetyear=function(year,pink){
			$("."+chyls).html(" ");
			//向年下拉菜单初始化年份，默认当前年份排在第一位，每页显示10年
			var yearspan="";
			for(yi=year-pink,yj=0;yi<year-pink+10;yi++,yj++){
				if(yj==pink)
				{
					yearspan+="<span id=\"pink"+yj+"\" class=\"yearselected\" year=\""+yi+"\">"+yi+"年</span>";
					$("."+schy).attr("year",yi);
					$("."+schy).text(yi+"年");
				}
				else
				{
					yearspan+="<span id=\"pink"+yj+"\" class=\"action\" year=\""+yi+"\">"+yi+"年</span>";
				}
			}
			$("."+chyls).append(yearspan);
		},
		//重置月
		resetmonth=function(pinkm){
			//向月下拉菜单初始化年份，默认当前月排在第一位，每页显示12月
			$("."+chml).html(" ");
			var monthspan="";
			for(mi=1,mj=0;mi<=12;mi++,mj++){
				if(mi<10)
				{
					if(mj==pinkm)
					{
						monthspan+="<span id=\"pinkm"+mj+"\" class=\"monthselected\" month=\""+mi+"\">0"+mi+"月</span>";
						$("."+schm).attr("month",mi);
						$("."+schm).text("0"+mi+"月");
					}
					else
					{
						monthspan+="<span id=\"pinkm"+mj+"\" class=\"action\" month=\""+mi+"\">0"+mi+"月</span>";
					}
				}
				else
				{
					if(mj==pinkm)
					{
						monthspan+="<span id=\"pinkm"+mj+"\" class=\"monthselected\" month=\""+mi+"\">"+mi+"月</span>";
						$("."+schm).attr("month",mi);
						$("."+schm).text(mi+"月");
					}
					else
					{
						monthspan+="<span id=\"pinkm"+mj+"\" class=\"action\" month=\""+mi+"\">"+mi+"月</span>";
					}	
				}
			}
			$("."+chml).append(monthspan);
		},
		//重置天
		resetdays=function(thismonth,year,pinkd){
			if(thismonth==undefined&&year==undefined&&pinkd==undefined){
				return ;
			}
			$("."+ccd).html(" ");
			var thismonthday=getday(thismonth,year);
			var thismonthspan="";
			for(di=1;di<=thismonthday;di++){
				thismonthspan+="<span id=\"pinkd"+di+"\" class=\"action\">"+di+"</span>";
			}
			$("."+ccd).append(thismonthspan);
			// 确定本月月一号是周几
			var weekdayfirst=weekdaying(year,thismonth,1)-1;
			if(weekdayfirst<0){
				weekdayfirst=6;
			}
			//确定上个月的天数
			var startinsertlen=getday(thismonth-1,year);
			var insertday="";
			for(ddi=startinsertlen-weekdayfirst;ddi<=startinsertlen;ddi++){
				insertday+="<span class=\"noaction pre\">"+ddi+"</span>";
			}
			$("."+ccd+" span").eq(0).before(insertday);
			//确定一共有多少个子元素，剩余添加
			var dayspanlen=42-$("."+ccd+" span").length;
			
			var endinsertday="";
			for(dddi=0;dddi<dayspanlen;dddi++){
				endinsertday+="<span class=\"noaction next\">"+(dddi+1)+"</span>";
			}
			$("."+ccd).append(endinsertday);
			$("#pinkd"+pinkd).attr("class","dayselected");
		},
		resethms=function(param){
			var obj=param;
			$("."+obj['empty']).html(" ");
		    var hmsspan="";
		    for(var hi=obj['startnum'];hi<obj['endnum'];hi++){
		    	var showi=hi<10?("0"+hi):hi;
		    	if(hi==obj["hms"])
		    	{
		    		hmsspan+="<span id=\""+obj["spanid"]+hi+"\" class=\""+obj["spanbingo"]+"\">"+showi+"</span>";
		    		$("."+obj["setvalels"]).attr(obj["attr"],hi);
		    		$("."+obj["setvalels"]).text(showi);
		    	}
		    	else{
		    		hmsspan+="<span id=\""+obj["spanid"]+hi+"\" class=\"action\">"+showi+"</span>";
		    	}
		    }
			$("."+obj["empty"]).append(hmsspan);
		},
		//重置小时
		resethour=function(pinkh){
			resethms({
				"empty":cchls,
				"hms":pinkh,
				"startnum":0,
				"endnum":24,
				"spanid":"pinkh",
				"spanbingo":"hourselected",
				"attr":"hour",
				"setvalels":cchtxt
			})
		},
		//重置分之
		resetminutes=function(pinkmi){
			resethms({
				"empty":ccmls,
				"hms":pinkmi,
				"startnum":0,
				"endnum":60,
				"spanid":"pinkmi",
				"spanbingo":"minutesselected",
				"attr":"minutes",
				"setvalels":ccmtxt
			})
		},
		//重置秒
		resetseconds=function(pinkse){
			resethms({
				"empty":ccsls,
				"hms":pinkse,
				"startnum":0,
				"endnum":60,
				"spanid":"pinkse",
				"spanbingo":"secondsselected",
				"attr":"seconds",
				"setvalels":ccstxt
			})
		},
		//按钮事件合并代码
		btnsevent=function(id,year,month,day,hour,minutes,seconds,_month,halfset){
			seconds=(seconds==undefined?0:seconds);
			hour=(hour==undefined?0:hour);
			minutes=(minutes==undefined?0:minutes);
			setattr("#",id,"set","year",year);
			setattr("#",id,"set","month",month);
			setattr("#",id,"set","day",day);
			setattr("#",id,"set","hour",hour);
			setattr("#",id,"set","minutes",minutes);
			setattr("#",id,"set","seconds",seconds);
//			setattr(".",schy,"set","id","pinky"+year);
//			setattr(".",schm,"set","id","pinkm"+(month-1));
			if(halfset=="false"){
				setattr("#",id,"set",id+"_year",year);
				setattr("#",id,"set",id+"_month",_month);
				setattr("#",id,"set",id+"_day",day);
				setattr("#",id,"set",id+"_hour",hour);
				setattr("#",id,"set",id+"_minutes",minutes);
				setattr("#",id,"set",id+"_seconds",seconds);
			}
		},
		hidehms=function(param){
	    	var obj=param;
	    	//隐藏年份弹窗
	    	hidecalender(chyl,chml,cchl,ccml,ccsl);
	    	var flag=$("."+obj["display"]).css("display");
	    	if(flag=="block")
	    	{
	    		$("."+obj["display"]).hide();
	    	}
	    	else
	    	{
	    		$("."+obj["display"]).show();
	    	}
	    	$("."+obj["selectlist"] +" span").eq(parint(obj["thistxt"])).attr("class",obj["selectattr"]);
		},
		resetstartend=function(id){
			var nowinputfor,timestartid,timeendid;
			if( $("#"+id).attr("for")!=undefined){
	    		nowinputfor = $("#"+id).attr("for").split("_");
		    	if(nowinputfor[0]=="s")
		    	{
		    		timestartid = nowinputfor[1];
		    		timeendid   = id;
		    	}
		    	else if(nowinputfor[0]=="e")
		    	{
		    		timestartid = id;
		    		timeendid   = nowinputfor[1];
		    	}
		    	if($("#"+timestartid).attr("compareflag")=="true"&&$("#"+timeendid).attr("compareflag")=="true")
				{	
					//console.log("进入年份对比11"+"--"+timestartid+"--"+timeendid)
					compare(timestartid,timeendid,"","","","","","","");
				}	
	    	}
		},
		//开始时间，结束时间对比
		compare=function(timestartid,timeendid,spanhind,spanmind,spansind,today,y,m,d)
		{
			//比较值大小,开始时间
			var startyear,startmonth,startday,starthour,startminutes,startseconds;
			if(today!=""&&today!="undefined")
			{
				startyear   = parint(y);
				startmonth  = parint(m);
				startday    = parint(d);
				starthour   = parint(spanhind);
				startminutes= parint(spanmind);
				startseconds= parint(spansind);
			}
			else
			{
				startyear   = parint(setattr("#",timestartid,"get","year",0));
				startmonth  = parint(setattr("#",timestartid,"get","month",0));
				startday    = parint(setattr("#",timestartid,"get","day",0));
				starthour   = parint(setattr("#",timestartid,"get","hour",0));
				startminutes= parint(setattr("#",timestartid,"get","minutes",0));
				startseconds= parint(setattr("#",timestartid,"get","seconds",0));
			}
			
			//结束时间
			var endyear     = parint(setattr("#",timeendid,"get","year",0));
			var endmonth    = parint(setattr("#",timeendid,"get","month",0));
			var endday      = parint(setattr("#",timeendid,"get","day",0));
			var endhour     = parint(setattr("#",timeendid,"get","hour",0));
			var endminutes  = parint(setattr("#",timeendid,"get","minutes",0));
			var endseconds  = parint(setattr("#",timeendid,"get","seconds",0));
			//判断当前id是开始时间还是结束时间id
			var nowid=cid();
			//结束时间id
			if(nowid==timeendid)
			{
				//console.log("结束时间id");
				//判断开始年份，如果结束年份等于开始年份，需要判断年份的倒数事件，小于开始年份的不可点击
				if(endyear==startyear)
				{
					//开始年份以前的置灰
					for(i=0;i<10;i++)
					{
						var thisyear=parint($("."+chyl+" #pink"+i).attr("year"));
						if(startyear>thisyear){
							$("."+chyl+" #pink"+i).attr("class","noaction");
						}
					}
					//年相等，判断月份	
					if(endmonth>startmonth)
					{
						//开始月份份以前的置灰
						for(i=0;i<12;i++)
						{
							var thismonth=parint($("."+chml+" #pinkm"+i).attr("month"));
							if(startmonth>thismonth){
								$("."+chml+" #pinkm"+i).attr("class","noaction");
							}
						}
						resetdays(endmonth,endyear,endday);	
					}
					else if(endmonth>=startmonth)
					{  
						//console.log("结束时间id--年,月相等,左翻按钮不可用a1")
						hidecalender(chmal);
						$("."+chmal).prev().show();
						//开始月份份以前的置灰
						for(i=0;i<12;i++)
						{
							var thismonth=parint($("."+chml+" #pinkm"+i).attr("month"));
							if(startmonth>thismonth){
								$("."+chml+" #pinkm"+i).attr("class","noaction");
							}
						}
						//console.log(endday+"---"+startday)
						//月相等，判断天
						if(endday>startday)
						{ //console.log("aaass")
							resetdays(endmonth,endyear,endday);
							var resetday=$("#"+cid()).attr("day");
							$("#pinkd"+resetday).click();
							var days=$("."+ccd+" .action");
							for(i=1;i<=days.length;i++)
							{
								var thisday=parseInt($("."+ccd+" #pinkd"+i).text());
								if(startday>thisday){
									$("."+ccd+" #pinkd"+i).attr("class","noaction");
								}
							}
							resetfor(24,"#pinkh","action",0);
							resetfor(60,"#pinkmi","action",0);
							resetfor(60,"#pinkse","action",0);
						}
						else if(endday==startday)
						{//console.log("aaass22")
							var daylen=$("."+ccd+" span");
							for(i=0;i<daylen.length;i++)
							{
								if(daylen.eq(i).attr("id")!=undefined){
									$("."+ccd+" #"+daylen.eq(i).attr("id")).attr("class","action");
								}
							}
							var resetday=$("#"+cid()).attr("day");
							//console.log("结束时间id--年,月，日相等"+resetday)
							$("#pinkd"+resetday).attr("class","dayselected");
							var days=$("."+ccd+" .action");
							for(i=1;i<=days.length;i++)
							{
								var thisday=parseInt($("."+ccd+" #pinkd"+i).text());
								if(startday>thisday){
									$("."+ccd+" #pinkd"+i).attr("class","noaction");
								}
							}
							//天相等，判断小时
							if(endhour>starthour)
							{
								//console.log("e-hour--")
								resetfor(24,"#pinkh","action",0);
								for(i=0;i<24;i++)
								{
									var thishour=parseInt($("#pinkh"+i).text());
									if(starthour>thishour){
										$("#pinkh"+i).attr("class","noaction");
									}
									else if(thishour==endhour)
									{
										$("#pinkh"+i).attr("class","hourselected");
									}
								}
								resetfor(60,"#pinkmi","action",0);
								resetfor(60,"#pinkse","action",0);
							}
							else if(endhour==starthour)
							{//console.log("e-hour1==--")
								resetfor(24,"#pinkh","action",0);
								for(i=0;i<24;i++)
								{
									var thishour=parseInt($("#pinkh"+i).text());
									if(starthour>thishour){
										$("#pinkh"+i).attr("class","noaction");
									}
									else if(thishour==endhour)
									{
										$("#pinkh"+i).attr("class","hourselected");
									}
								}
								
								//小时相等，判断分钟
								if(endminutes>startminutes)
								{//console.log("小时相等，判断分钟--")
									resetfor(60,"#pinkmi","action",0);
									for(i=0;i<60;i++)
									{
										var thisminutes=parseInt($("#pinkmi"+i).text());
										if(startminutes>thisminutes){
											$("#pinkmi"+i).attr("class","noaction");
										}
										else if(thisminutes==endminutes){
											$("#pinkmi"+i).attr("class","minutesselected");
										}
									}
									resetfor(60,"#pinkse","action",0);
								}
								else if(endminutes==startminutes)
								{//console.log("小时相等，判断分钟--==")
									resetfor(60,"#pinkmi","action",0);
									for(i=0;i<60;i++)
									{
										var thisminutes=parseInt($("#pinkmi"+i).text());
										if(startminutes>thisminutes){
											$("#pinkmi"+i).attr("class","noaction");
										}
										else if(thisminutes==endminutes){
											$("#pinkmi"+i).attr("class","minutesselected");
										}
									}
									//分钟相等，判断秒
									if(endseconds>=startseconds)
									{
										//console.log("分钟相等，判断秒=")
										resetfor(60,"#pinkse","action",0);
										resetfor(startseconds,"#pinkse","noaction",0);
										for(var i=startseconds;i<60;i++)
										{
											if(i==endseconds)
											{
												$("#pinkse"+i).attr("class","secondsselected");
											}
											else
											{
												$("#pinkse"+i).attr("class","action");
											}
										}
									}
								}
							}
							else
							{//结束小时小于开始小时，讲开始小时赋值给结束小时
								//console.log("e-hour1-------ss=--")
								$("."+cchtxt).attr("hour",starthour);
								$("."+cchtxt).text((starthour<10?("0"+starthour):starthour));
								resetfor(24,"#pinkh","action",0);
								for(i=0;i<24;i++)
								{
									var thishour=parseInt($("#pinkh"+i).text());
									if(starthour>thishour){
										$("#pinkh"+i).attr("class","noaction");
									}
									else if(thishour==endhour)
									{
										$("#pinkh"+i).attr("class","hourselected");
									}
								}
								//小时相等，判断分钟
								if(endminutes>startminutes)
								{//console.log("小时相等，判断分钟--")
									resetfor(60,"#pinkmi","action",0);
									for(i=0;i<60;i++)
									{
										var thisminutes=parseInt($("#pinkmi"+i).text());
										if(startminutes>thisminutes){
											$("#pinkmi"+i).attr("class","noaction");
										}
										else if(thisminutes==endminutes){
											$("#pinkmi"+i).attr("class","minutesselected");
										}
									}
								}
								else if(endminutes==startminutes)
								{//console.log("小时相等，判断分钟--==")
									resetfor(60,"#pinkmi","action",0);
									for(i=0;i<60;i++)
									{
										var thisminutes=parseInt($("#pinkmi"+i).text());
										if(startminutes>thisminutes){
											$("#pinkmi"+i).attr("class","noaction");
										}
										else if(thisminutes==endminutes){
											$("#pinkmi"+i).attr("class","minutesselected");
										}
									}
									//分钟相等，判断秒
									if(endseconds>=startseconds)
									{
										//console.log("分钟相等，判断秒=")
										resetfor(60,"#pinkse","action",0);
										resetfor(startseconds,"#pinkse","noaction",0);
										for(var i=startseconds;i<60;i++)
										{
											if(i==endseconds)
											{
												$("#pinkse"+i).attr("class","secondsselected");
											}
											else
											{
												$("#pinkse"+i).attr("class","action");
											}
										}
									}
								}
								
							}
						}
						else{
							//console.log("结束天小")
							$("#pinkd"+startday).attr("class","dayselected");
							var days=$("."+ccd+" .action");
							for(i=1;i<=startday-1;i++)
							{
								$("."+ccd+" #pinkd"+i).attr("class","noaction");
							}
						}
					}
					else if(endmonth<startmonth)
					{
						//修改当前月份为开始时间的月份
						$("#"+cid()).attr("month",startmonth);
						$("#"+cid()).attr(cid()+"_month",startmonth-1);
						$("."+schm).attr("month",startmonth);
						$("."+schm).text(twobyte(startmonth)+"月");
						
						resetdays(startmonth,endyear,endday);
						for(var i=1;i<startday;i++)
						{
							$("."+ccd+" #pinkd"+i).attr("class","noaction")
						}
						//还需要判断天
						if(endday<startday)
						{
							//修改当前月份为开始时间的月份
							$("#"+cid()).attr("day",startday);
							$("#"+cid()).attr(cid()+"_day",startday);
							$("."+ccd+" #pinkd"+startday).attr("class","dayselected");
						}
						if(endhour<starthour)
						{
							//修改当前月份为开始时间的月份
							$("#"+cid()).attr("hour",starthour);
							$("#"+cid()).attr(cid()+"_hour",starthour);
							$("."+cchtxt).attr("hour",starthour);
							$("."+cchtxt).text(twobyte(starthour));	
						}
						if(endminutes<startminutes)
						{
							//修改当前月份为开始时间的月份
							$("#"+cid()).attr("minutes",startminutes);
							$("#"+cid()).attr(cid()+"_minutes",startminutes);
							$("."+ccmtxt).attr("minutes",startminutes);
							$("."+ccmtxt).text(twobyte(startminutes));	
						}
						if(endseconds<startseconds)
						{
							//修改当前月份为开始时间的月份
							$("#"+cid()).attr("seconds",startseconds);
							$("#"+cid()).attr(cid()+"_seconds",startseconds);
							$("."+ccstxt).attr("seconds",startseconds);
							$("."+ccstxt).text(twobyte(startseconds));	
						}
						//返回input现在的值
						var dataparam=returnnowdate().split(partline);
						btnsevent(cid(),dataparam[0],dataparam[1],dataparam[2],dataparam[3],dataparam[4],dataparam[5],parseInt(dataparam[1])-1,"false");
						$("#pinkd"+dataparam[2]).attr("class","dayselected");	
					}
					else{}
					//如果年份相等，年份倒数不可用按钮状态处理
					hidecalender(chyal);
					$("."+chyal).prev().show();
					$("."+chyar).show();
					$("."+chyar).prev().hide();
					$("."+chmar).show();
					$("."+chmar).prev().hide();
					
				}
				else if(endyear>startyear)//结束年份大于开始年份
				{
					//console.log("结束时间id endyear>startyear")
					//console.log(endyear+"===="+startyear)
					//开始年份以前的置灰
					for(i=0;i<10;i++)
					{
						var thisyear=parint($("."+chyl+" #pink"+i).attr("year"));
						if(startyear>thisyear){
							$("."+chyl+" #pink"+i).attr("class","noaction");
						}
					}
					//如果年份不相等，年份倒数可用
					$("."+chyal).show();
					$("."+chyal).prev().hide()	;
					$("."+chyar).show();
					$("."+chyar).prev().hide();
					$("."+chmar).show();
					$("."+chmar).prev().hide()	;
					$("."+chmal).show();
					$("."+chmal).prev().hide()	;
					//重置时分秒，都可用
					resetfor(24,"#pinkh","action",0);
					resetfor(60,"#pinkmi","action",0);
					resetfor(60,"#pinkse","action",0);
				}
				else{}
			}
			else
			{//开始时间比对
				$("."+chyar).show();
				$("."+chyar).prev().hide();
				$("."+chmar).show();
				$("."+chmar).prev().hide();
				//console.log("开始时间id");
				//console.log(startyear+"---"+endyear)
				//结束时间以后的都不可以点击
				if(startyear>=endyear)
				{
					//console.log("开始时间id，年相等");
					hidecalender(chyar);
					$("."+chyar).prev().show();
					//结束年份以后的置灰
					for(i=0;i<10;i++)
					{
						var thisyear=parseInt($("."+chyl+" #pink"+i).attr("year"));
						if(thisyear>endyear){
							$("."+chyl+" #pink"+i).attr("class","noaction");
						}
					}
					//年相等，判断月份	
					if(endmonth>startmonth)
					{
						//console.log("开始时间id，年相等，结束月大"+startmonth+"---"+endmonth);
						//结束月份份以后的置灰
						for(i=0;i<12;i++)
						{
							var thismonth=parseInt($("."+chml+" #pinkm"+i).attr("month"));
							if(thismonth>endmonth){
								$("."+chml+" #pinkm"+i).attr("class","noaction");
							}
						}
						
					}
					else if(endmonth==startmonth)
					{ //  console.log("开始时间id，年相等，结束月相等ao");
						$("#"+timestartid).attr("month",endmonth);
						//重置按钮状态 禁用月份右 年份右 开启左
						hidecalender(chmar);
						$("."+chmar).prev().show();
						$("."+chyal).show();
						$("."+chyal).prev().hide();
						$("."+chmal).show();
						$("."+chmal).prev().hide();
						//结束月份份以后的置灰
						for(i=0;i<12;i++)
						{
							var thismonth=parseInt($("."+chml+" #pinkm"+i).attr("month"));
							if(thismonth>endmonth){
								$("."+chml+" #pinkm"+i).attr("class","noaction");
							}
						}
						//console.log("月相等，判断天"+endday+"---"+startday)
						//月相等，判断天
						if(endday>startday)
						{
							var daylen=$("."+ccd+" span");
							for(i=0,j=0;i<daylen.length;i++)
							{
								if(daylen.eq(i).attr("id")!=undefined){
									$("."+ccd+" #"+daylen.eq(i).attr("id")).attr("class","action");
								}
							}
							var resetday=$("#"+cid()).attr("day")
							$("#pinkd"+resetday).attr("class","dayselected")
							var days=$("."+ccd+" .action");
							for(i=0;i<=days.length;i++)
							{
								var thisday=parseInt($("."+ccd+" #pinkd"+(i+1)).text());
								if(thisday>endday){
									$("."+ccd+" #pinkd"+(i+1)).attr("class","noaction");
								}
							}
							resetfor(60,"#pinkse","action",0);
				    		resetfor(60,"#pinkmi","action",0);
				    		resetfor(24,"#pinkh","action",0);
						}
						else if(endday==startday)
						{
							
							var daylen=$("."+ccd+" span");
							for(i=0;i<daylen.length;i++)
							{
								if(daylen.eq(i).attr("id")!=undefined){
									$("."+ccd+" #"+daylen.eq(i).attr("id")).attr("class","action");
								}
							}
							var resetday=$("#"+cid()).attr("day");
							$("#pinkd"+resetday).attr("class","dayselected");
							var days=$("."+ccd+" .action");
							for(i=0;i<=days.length;i++)
							{
								var thisday=parseInt($("."+ccd+" #pinkd"+(i+1)).text());
								if(thisday>endday){
									$("."+ccd+" #pinkd"+(i+1)).attr("class","noaction");
								}
							}
							//console.log("年月日天都相等，判断小时")
							//天相等，判断小时
							resetfor(24,"#pinkh","action",0);
							resetfor(24,"#pinkh","noaction",endhour+1);
					    	if(starthour>=endhour)
					    	{
					    		$("."+cchtxt).attr("hour",endhour);
					    		$("."+cchtxt).text(endhour<10?("0"+endhour):endhour);
								$("#pinkh"+endhour).attr("class","hourselected");
								resetfor(60,"#pinkmi","action",0);
								resetfor(60,"#pinkmi","noaction",endminutes+1);		
								//console.log("年月日天小时都相等，判断分钟")
								if(startminutes>=endminutes)
								{
									resetminutes(endminutes);
									resetfor(60,"#pinkmi","noaction",endminutes+1);
									$("#"+cid()).attr("minutes",endminutes);
									//判断秒 endseconds以后重置为不可用
									resetfor(60,"#pinkse","noaction",endseconds);
									$("#"+cid()).attr("seconds",endseconds);
									
								}
								else
								{
									$("#pinkmi"+startminutes).attr("class","minutesselected");
								}
					    	}
					    	else
					    	{
					    		$("#pinkh"+starthour).attr("class","hourselected");
					    		resetfor(60,"#pinkse","action",0);
				    			resetfor(60,"#pinkmi","action",0);
					    	}
						}
						else
						{
							//console.log("开始时间id，年月相等，结束天小");
							//重置开始时间的天数；需要判断小时，如果小时相同还需判断分钟，如果分钟相同，还需判断秒
							if(starthour>=endhour)
							{//console.log("开始时间id，年月相等，结束天小h");
								
								resetfor(24,"#pinkh","action",0);
								for(i=0;i<24;i++)
								{
									var thishour=parseInt($("#pinkh"+i).text());
									if(thishour>endhour){
										$("#pinkh"+i).attr("class","noaction");
									}
									else if(thishour==endhour)
									{
										$("#pinkh"+i).attr("class","hourselected");
									}
								}
								$("#"+cid()).attr("hour",endhour);
								setattr(".",cchtxt,"set","hour",endhour);
								settxt(".",cchtxt,"set",twobyte(endhour));
								//判断分钟
								if(startminutes>=endminutes)
								{//console.log("开始时间id，年月相等，结束天小m");
									resetfor(60,"#pinkmi","action",0);
									for(i=0;i<60;i++)
									{
										var thisminutes=parseInt($("#pinkmi"+i).text());
										if(thisminutes>endminutes){
											$("#pinkmi"+i).attr("class","noaction");
										}
										else if(thisminutes==endminutes){
											$("#pinkmi"+i).attr("class","minutesselected");
										}
									}
									$("#"+cid()).attr("minutes",endminutes);
									setattr(".",ccmtxt,"set","minutes",endminutes);
									settxt(".",ccmtxt,"set",twobyte(endminutes));
									//判断秒
									if(startseconds>=endseconds)
									{//console.log("开始时间id，年月相等，结束天小s");
										//将结束秒拿过来，重新赋值
										resetfor(60,"#pinkse","action",0);
										for(i=0;i<60;i++)
										{
											var thisseconds=parseInt($("#pinkse"+i).text());
											if(thisseconds>endseconds){
												$("#pinkse"+i).attr("class","noaction");
											}
											else if(thisseconds==endseconds)
											{
												$("#pinkse"+i).attr("class","secondsselected");
											}
										}
										$("#"+cid()).attr("seconds",endseconds);
										setattr(".",ccstxt,"set","seconds",endseconds);
										settxt(".",ccstxt,"set",twobyte(endseconds));
										hidecalender(chmar);
										$("."+chmar).prev().show();
									}
								}
							}
							else
							{//console.log("开始时间小于结束时间小时，分钟，秒做限制")
								resetfor(24,"#pinkh","action",0);
								resetfor(24,"#pinkh","noaction",endhour+1);
								if(starthour==endhour)
								{
									//console.log("开始时间小于结束时间小时，分钟，秒做限制分钟处理")
									resetfor(60,"#pinkmi","action",0);
									if(startminutes==endminutes)
									{
										resetfor(60,"#pinkmi","noaction",endminutes+1);
										//将结束秒拿过来，重新赋值
										resetfor(60,"#pinkse","action",0);
										resetfor(60,"#pinkse","noaction",endseconds+1);
									}
								}
							}
							var daylen=$("."+ccd+" span");
							for(i=0,j=0;i<daylen.length;i++)
							{
								if(daylen.eq(i).attr("id")!=undefined){
									$("."+ccd+" #"+daylen.eq(i).attr("id")).attr("class","action");
								}
							}
							var resetday=$("#"+cid()).attr("day");
							$("#pinkd"+resetday).attr("class","dayselected");
							var days=$("."+ccd+" .action");
							for(i=0;i<=days.length;i++)
							{
								var thisday=parseInt($("."+ccd+" #pinkd"+(i+1)).text());
								if(thisday>endday){
									$("."+ccd+" #pinkd"+(i+1)).attr("class","noaction");
								}
							}
							//重新赋值input
							$("#"+cid()).attr("day",endday);
							var dataparam=returnnowdate().split(partline);
							btnsevent(cid(),dataparam[0],dataparam[1],dataparam[2],dataparam[3],dataparam[4],dataparam[5],parseInt(dataparam[1])-1,"false");
							$("#pinkd"+dataparam[2]).attr("class","dayselected")	;
						}
					}
					else
					{
						//console.log("开始时间id，年相等，结束月小");
						//结束月赋值到开始时间
						
						//重新赋值input
						$("#"+cid()).attr("month",endmonth);
						$("#"+cid()).attr("day",endday);
						$("#"+cid()).attr("hour",endhour);
						$("#"+cid()).attr("minutes",endminutes);
						$("#"+cid()).attr("seconds",endseconds);
						$("."+schm).attr("month",endmonth);
						$("."+schm).text((endmonth<10?"0"+endmonth:endmonth)+"月");
						var dataparam=returnnowdate().split(partline);
						btnsevent(cid(),dataparam[0],dataparam[1],dataparam[2],dataparam[3],dataparam[4],dataparam[5],parseInt(dataparam[1])-1,"false");
						$("#pinkd"+dataparam[2]).attr("class","dayselected");
						var spanlen=$("."+ccd+" span").length;
						var noactionlen=$("."+ccd+" .noaction").length;
						for(i=parseInt(dataparam[2]);i<=spanlen-noactionlen;i++)
						{
							$("#pinkd"+(i+1)).attr("class","noaction");
						}	
					}
				}
				else if(startyear<endyear)//结束年份大于开始年份
				{
					//console.log("开始时间id，结束年份大");
					//结束年份以后的置灰
					for(i=0;i<10;i++)
					{
						var thisyear=parseInt($("."+chyl+" #pink"+i).attr("year"));
						if(thisyear>endyear){
							$("."+chyl+" #pink"+i).attr("class","noaction");
						}
					}
					resetfor(24,"#pinkh","action",0);
					resetfor(60,"#pinkmi","action",0);
					resetfor(60,"#pinkse","action",0);	
				}
				else{/*结束时间小,开始时间设置为结束时间*/}
			}
			//重新绑定事件
			dayclick();
		    secondsclick();
		    minutesclick();
		    hoursclick();
			var compareval=returnnowdate();
			return compareval;
		},
		initreset=function(id,ymd,compareflag,timeflag,todayflag,forflag,clearflag){
			
			var ymdcount=0;
			for(var i=0;i<ymd.length;i++){
				switch(ymd[i]){
					case "y":
					case "m":
					case "d":
					ymdcount++;
					break;
				}
			}
			if(ymd.length<3||ymdcount<3){
				throw new Error("初始化错误：日期必须包含年月日;ymd参数需与flag参数保持一致,且ymd参数必须包含年月日参数")
			}
			$("#"+id).keydown(function(e){
				e.preventDefault();
			});
			$("#"+id).attr("ymd",ymd);
			if(compareflag==true||compareflag=="true")
			{
				$("#"+id).attr("compareflag",compareflag);
				$("#"+id).attr("for",forflag);
			}
			else
			{
				$("#"+id).attr("compareflag",compareflag);
			}
			$("#"+id).attr("clear",clearflag);
			$("#"+id).attr("onpaste","return false");
			$("#"+id).attr("ondragenter","return false");
			$("#"+id).attr("oncontextmenu","return false");
			$("#"+id).attr("style","ime-mode:disabled");
			if(opt.min!=""){
				$("#C"+id).attr("style","ime-mode:disabled;width:0;display: none;");
			}else if(opt.max!=""){
				$("#E"+id).attr("style","ime-mode:disabled;width:0;display: none;");
			}
			if(timeflag==false||timeflag=="false")
			{
				//console.log("ttt")
				hidecalender(cchtxt,ccmtxt,ccstxt);
				$("."+cchtxt).prev().hide();
				$("."+ccmtxt).prev().hide();
				$("."+ccstxt).prev().hide();
				$("#"+id).attr("time",false);
			}
			else if(timeflag==true||timeflag=="true")
			{
				//console.log("ppp")
				showcalender(cchtxt,ccmtxt,ccstxt);
				$("."+cchtxt).prev().show();
				$("."+ccmtxt).prev().show();
				$("."+ccstxt).prev().show();
				$("#"+id).attr("time",true);
			}
			else if(timeflag=="hM"){
				hidecalender(cchtxt,ccmtxt,ccstxt);
				$("."+cchtxt).prev().hide();
				$("."+ccmtxt).prev().hide();
				$("."+ccstxt).prev().hide();
				showcalender(cchtxt,ccmtxt);
				$("."+cchtxt).prev().show();
				$("."+ccmtxt).prev().show();
			}
			else if(timeflag=="h"){
				hidecalender(cchtxt,ccmtxt,ccstxt);
				$("."+cchtxt).prev().hide();
				$("."+ccmtxt).prev().hide();
				$("."+ccstxt).prev().hide();
				showcalender(cchtxt);
				$("."+cchtxt).prev().show();
			}
		},
		focusreset=function(id,res,forlen,switchflag,setinput,change){
			if($("#"+id).attr("clear")=="true"){
				$("."+btncancel).show();
			}
			if($("#"+id).attr("today")=="true"){
				$("."+btnsure).show();
			}
			if($("#"+id).attr("clear")=="false"){
				hidecalender(btncancel);
			}
			if($("#"+id).attr("today")=="false"){
				hidecalender(btntoday);
			}
			var timeval="",dataval="";
			var inityear,initmonth,initday,inithour,initminutes,initseconds;
			if(res=="")
			{
				for(var i=0,k=0;i<forlen;i++){
					switch(switchflag[i]){
						case "y":
						j=inityear=setinput['year'];
						k++;
						dataval+=j+partline;
						break;
						case "m":
						j=initmonth=setinput['month'];
						k++;
						dataval+=twobyte(j)+partline;
						break;
						case "d":
						j=initday=setinput['day'] ;
						dataval+=twobyte(j)+partline;
						break;
						case "h":
						j=inithour =setinput['hour'];
						timeval+=twobyte(j)+":";
						break;
						case "M":
						j=initminutes=setinput['minutes'] ;
						timeval+=twobyte(j)+":";
						break;
						case "s":
						j=initseconds=setinput['seconds'] ;
						timeval+=twobyte(j)+":";
						break;
					}
				}
				
				if(change){
					
					$("#"+id).val(timeval.substring(0,timeval.length-1)+" "+dataval.substring(0,dataval.length-1));
				    $("#"+id).attr("defval",timeval.substring(0,timeval.length-1)+" "+dataval.substring(0,dataval.length-1));
				}
				else{
					//console.log(dataval.substring(0,dataval.length-1)+" 444444 "+timeval.substring(0,timeval.length-1))
					$("#"+id).val(dataval.substring(0,dataval.length-1)+" "+timeval.substring(0,timeval.length-1));
					$("#"+id).attr("defval",dataval.substring(0,dataval.length-1)+" "+timeval.substring(0,timeval.length-1));
				}
				
			}
			else
			{
				//console.log("bbb")
				var kk=0;
				if(change){
					var temp=res[0];
					res[0]=res[1];
					res[1]=temp;
				}
				for(var i=0,k=0;i<forlen;i++)
				{
					var j="";
					switch(switchflag[i]){
						case "y":
						j=inityear=parint(res[0].split(partline)[i-kk]);
						k++;
						if(setinput!="focusc"){
							resetyear(inityear,0);
						}
						dataval+=j+partline;
						if(initmonth!=undefined&&inityear!=undefined&&initday!=undefined){
							if(setinput!="focusc"){
								resetdays(initmonth,inityear,initday);
							}	
						}
						break;
						case "m":
						j=initmonth = parint(res[0].split(partline)[i-kk]);
						k++;
						if(setinput!="focusc"){
							resetmonth(initmonth-1);
						}
						dataval+=twobyte(j)+partline;
						if(initmonth!=undefined&&inityear!=undefined&&initday!=undefined){
							if(setinput!="focusc"){
								resetdays(initmonth,inityear,initday);
							}	
						}
						
						break;
						case "d":
						j=initday = parint(res[0].split(partline)[i-kk]);
						dataval+=twobyte(j)+partline;
						k++;
						if(initmonth!=undefined&&inityear!=undefined&&initday!=undefined){
							if(setinput!="focusc"){
								resetdays(initmonth,inityear,initday);
							}	
						}
						break;
						case "h":
						j=inithour = parint(res[1].split(":")[i-k]);
						if(setinput!="focusc"){
							resethour(inithour);
						}	
						kk++;
						timeval+=twobyte(j)+":";
						break;
						case "M":
						j=initminutes = parint(res[1].split(":")[i-k]);
						if(setinput!="focusc"){
							resetminutes(initminutes);
						}	
						kk++;
						timeval+=twobyte(j)+":";
						break;
						case "s":
						j=initseconds = parint(res[1].split(":")[i-k]);
						if(setinput!="focusc"){
							resetseconds(initseconds);
						}	
						kk++;
						timeval+=twobyte(j)+":";
						break;
					}	
				}
				if(setinput=="initcanlender")
				{
					//console.log("initcanlender"+initseconds)
					btnsevent(id,inityear,initmonth,initday,inithour,initminutes,initseconds,initmonth-1,"true");
					if(change){
						$("#"+id).val(timeval.substring(0,timeval.length-1)+" "+dataval.substring(0,dataval.length-1));
						$("#"+id).attr("defval",timeval.substring(0,timeval.length-1)+" "+dataval.substring(0,dataval.length-1));
					}
					else{
						$("#"+id).val(dataval.substring(0,dataval.length-1)+" "+timeval.substring(0,timeval.length-1));
						$("#"+id).attr("defval",dataval.substring(0,dataval.length-1)+" "+timeval.substring(0,timeval.length-1));
					}	
				}
				if(setinput=="focusc"){
					//console.log("focusc++++initmonth="+initseconds)
					btnsevent(id,inityear,initmonth,initday,inithour,initminutes,initseconds,initmonth-1,"true");
				}
			}
			var dates={
				"year":inityear,
				"month":initmonth,
				"day":initday,
				"hour":inithour,
				"minutes":initminutes,
				"seconds":initseconds
			}
			return dates;
		},
		initcalendar=function()
		{
			var id=opt["id"];
			if(opt.min!=""){
				var html = '<input class="time hide" id="C'+id+'" value="'+opt.min+'" >';
				$("#"+id).before(html);
				initreset("C"+id,opt["ymd"],true,opt["time"],opt["today"],"e_"+id,opt["clear"]);
				$("#C"+id).attr("defval",opt.min);
			}
			if(opt.max!=""){
				var html = '<input class="time hide" id="E'+id+'" value="'+opt.max+'" >';
				$("#"+id).next().after(html);
				initreset("E"+id,opt["ymd"],true,opt["time"],opt["today"],"s_"+id,opt["clear"]);
				$("#E"+id).attr("defval",opt.max);
			}
			initreset(id,opt["ymd"],opt["compareflag"],opt["time"],opt["today"],opt["for"],opt["clear"]);
			var timeval=opt['flag']||$("#"+id).val()||$("#"+id).attr("defval");
			
			if(timeval==""||timeval==undefined)
			{//input没有初始化值
				setattr("#",id,"set",id+"_year",0);//初始化为pink0;
				setattr("#",id,"set","focuschange",opt['focuschange']);
				/*
			     *年，月，日，小时,分钟,秒初始化处理 
			     * */
			    var nowtime = new Date(),
				year    = nowtime.getFullYear(),
				month   = nowtime.getMonth()+1,
				day     = nowtime.getDate(),
				week    = nowtime.getDay(),
				hour    = nowtime.getHours(),
				minutes = nowtime.getMinutes(),
				seconds = nowtime.getSeconds();
			    resetyear(year,0);
			    setinputval(year,month,day,hour,minutes,seconds,id,"hide");
			    //setattr(".",can,"set","eventflag",id);
			    $("."+can).removeAttr("eventflag");
			    var todayobj={
					"year":year,
					"month":month,
					"day":day,
					"hour":hour,
					"minutes":minutes,
					"seconds":seconds
				};
			    focusreset(id,"",$("#"+id).attr("ymd").length,$("#"+id).attr("ymd"),todayobj,opt['focuschange']);
			    if(!opt.valShow){
			    	 $("#"+id).val("");
			    }

			}
			else
			{	
				$("#"+id).attr("defval",timeval);
				var res = timeval.split(" ");
				var change=false,res1,res2;
				if((res[0]+"").indexOf(partline)<0){
					if((res[1]+"").indexOf(partline)>0){
						change=true;
						res1=res[1];
						res2=res[0];
					}
				}
				else{
					change=false;
					res1=res[0];
					res2=res[1];
				}
				var inityear,initmonth,initday,inithour,initminutes,initseconds;
				//判断日期查分符号正确与否
				if((res1+"").indexOf(partline)<0 || (res2!=""&&res2!=undefined&&(res2+"").indexOf(":")<0))
				{
					throw new Error("初始化错误：partline拆分符号不一致;");
				}
				else
				{
					var results=focusreset(id,res,opt['ymd'].length,opt['ymd'],"initcanlender",change);
					//判断是否需要比对
					if((opt['compareflag']==true||opt['compareflag']=="true")&&($("#"+(opt['for']+"").substring(2)).attr("compareflag")=="true"||$("#"+(opt['for']+"").substring(2)).attr("compareflag")==true))
					{
						setinputval(results["year"],results["month"],results["day"],results["hour"],results["minutes"],results["seconds"],id,"hide");
				    	var nowinputfor = $("#"+id).attr("for").split("_");
				    	if(nowinputfor[0]=="s")
				    	{
				    		timestartid = nowinputfor[1];
				    		timeendid   = id;
				    	}
				    	else if(nowinputfor[0]=="e")
				    	{
				    		timestartid = id;
				    		timeendid   = nowinputfor[1];
				    	}
					}
					else
					{
						setattr("#",id,"set",id+"_year",0);//初始化为pink0;
						/*年，月，日，小时,分钟,秒初始化处理 */
					    resetyear(results["year"],0);
					    setinputval(results["year"],results["month"],results["day"],results["hour"],results["minutes"],results["seconds"],id,"hide");
					    $("."+can).removeAttr("eventflag");
					}
				}
			}
			
		},
		
		focuspart=function(id)
		{
			if(opt['disabled']){
				return false;
			}
			hidecalender(chyl,chml,cchl,ccml,ccsl);
			
	      	//获取start的屏幕坐标
	    	var startleft = $("#"+id).offset().left;
	    	var starttop  = $("#"+id).offset().top;
	    	$("."+can).attr("id",id+"__canlendar");
	    	$("#"+id+"__canlendar").css({"top":starttop+$("#"+id).height()+"px","left":startleft+"px"}); 
	    	var nowinputid  = $("#"+id).attr("id");
	    	var nowinputfor;
	    	//重新赋值
	    	initreset(id,$("#"+id).attr("ymd"),$("#"+id).attr("compareflag"),$("#"+id).attr("time"),$("#"+id).attr("today"),$("#"+id).attr("for"),$("#"+id).attr("clear"));
	    	var res=$("#"+id).attr("defval").split(" ");
	    	var change=false,res1,res2;
			if((res[0]+"").indexOf(partline)<0){
				if((res[1]+"").indexOf(partline)>0){
					change=true;
					res1=res[1];
					res2=res[0];
				}
			}
			else{
				change=false;
				res1=res[0];
				res2=res[1];
			}
	    	focusreset(id,res,$("#"+id).attr("ymd").length,$("#"+id).attr("ymd"),"",change);
    		$("."+can).show();
	    	if( $("#"+id).attr("for")!=undefined){
	    		nowinputfor = $("#"+id).attr("for").split("_");
		    	if(nowinputfor[0]=="s")
		    	{
		    		timestartid = nowinputfor[1];
		    		timeendid   = id;
		    	}
		    	else if(nowinputfor[0]=="e")
		    	{
		    		timestartid = id;
		    		timeendid   = nowinputfor[1];
		    	}
		    	//对需要对比的另一项进行初始值恢复,还需要判断当前时间是否为空和救赎时间是否为空
		    	if(id==timestartid)
		    	{//开始时间
		    		//console.log($("#"+id).val()+"--vallll===="+$("#"+timeendid).val())
		    		if($("#"+id).val()==""&&$("#"+timeendid).val()==""){
		    			//console.log("开始时间，结束时间都为空，结束时间不做限制")
		    			$("#"+id).attr("cflag","true");
		    			$("#"+id).attr("compareflag","false");  
		    		}
		    		else
		    		{
		    			var rese=$("#"+timeendid).attr("defval").split(" ");
	    				focusreset(timeendid,rese,$("#"+timeendid).attr("ymd").length,$("#"+timeendid).attr("ymd"),"focusc",change);
		    		}
		    	}
		    	else{//结束时间
		    		var ress=$("#"+timestartid).attr("defval").split(" ");
	    			focusreset(timestartid,ress,$("#"+timestartid).attr("ymd").length,$("#"+timestartid).attr("ymd"),"focusc",change);
		    	}
		    	if($("#"+timestartid).attr("compareflag")=="true"&&$("#"+timeendid).attr("compareflag")=="true")
				{	
					//console.log("进入比对")
					compare(timestartid,timeendid,"","","","","","","");
				}	
	    	}
		    //对年月日重新监听
		    dayclick();
		    secondsclick();
		    minutesclick();
		    hoursclick();
		    monthclick();
		    yearclick();
		},
		yearupdown=function(firstyear,forl,form){
			$("."+chyls).html("");
			var yearspan="";
			for(i=firstyear+forl,j=0;i<firstyear+form;i++,j++)
			{
				if(i<1900||i>2099){
					yearspan+="<span id=\"pink"+j+"\" class=\"noaction\" year=\""+i+"\">"+i+"年</span>";
				}
				else
				{
					var nowyear=parint(setattr(".",schy,"get","year",0));
					if(i==nowyear)
					{
						yearspan+="<span id=\"pink"+j+"\" class=\"yearselected\"  year=\""+i+"\">"+i+"年</span>";
					}
					else
					{
						yearspan+="<span id=\"pink"+j+"\" class=\"action\"  year=\""+i+"\">"+i+"年</span>";
					}
				}
			}
			$("."+chyls).append(yearspan);
			$("."+chyl).show();
			resetstartend(cid());
		    yearclick();
		},
		todaybtn=function(){
			var id=cid(),
		    nowtime = new Date(),
			year    = nowtime.getFullYear(),
			month   = nowtime.getMonth(),
			day     = nowtime.getDate(),
			week    = nowtime.getDay(),
			hour    = nowtime.getHours(),
			minutes = nowtime.getMinutes(),
			seconds = nowtime.getSeconds();
			if($("#"+id).attr("compareflag")=="true"&&$("#"+id).attr("for").substr(0,2)=="e_"){
				var endid = $("#"+id).attr("for").substring(2);
				$("#"+id).val($("#"+endid).val())
				
			}else{
				btnsevent(id,year,month+1,day,hour,minutes,seconds,month,"false");
				var todayobj={
					"year":year,
					"month":month+1,
					"day":day,
					"hour":hour,
					"minutes":minutes,
					"seconds":seconds
				};
				var timeval=$("#"+id).val()||$("#"+id).attr("defval");
				var res = timeval.split(" ");
				var change=false;
				if(res[0].toString().indexOf(partline)<0){
					if(res[1].toString().indexOf(partline)>0){
						change=true;
					}
				}
				else{
					change=false;
				}
				if($("#"+id).attr("cflag")=="true")
				{
					focusreset(id,"",$("#"+id).attr("ymd").length,$("#"+id).attr("ymd"),todayobj,change);
					$("#"+id).attr("compareflag","true");
					var forval=$("#"+id).attr("for");
					var timeendid=forval.substring(2,forval.length);
					$("#"+timeendid).attr("defval",$("#"+id).attr("defval"));
					var rese=$("#"+timeendid).attr("defval").split(" ");
					focusreset(timeendid,rese,$("#"+timeendid).attr("ymd").length,$("#"+timeendid).attr("ymd"),"focusc",change);
					$("#"+id).removeAttr("cflag");
				}
				else
				{
					focusreset(id,"",$("#"+id).attr("ymd").length,$("#"+id).attr("ymd"),todayobj,change);
				}
				resetstartend(id);
			}
			
		    $("."+can).hide();
		};
	canlendaradd();
	initcalendar();
	//年份点击事件--倒数年份
	document.getElementsByClassName(chylup)[0].onclick=function(){
		//获取第一个的年份
			var firstyear=parint(setattr(".",chyls+" span:first","get","year",0));
//			console.log("firstyearfirstyear"+firstyear)
			yearupdown(firstyear,-10,0);
	}
	//年份点击事件--正向年份
	document.getElementsByClassName(chyldown)[0].onclick=function(){
		//获取第最后一个的年份
		var firstyear=parint(setattr(".",chyls+" span:last","get","year",0));
		yearupdown(firstyear,1,11);
	}
	//年份点击事件
	function yearclick(){
		var yeareventsel=document.getElementsByClassName(chyls)[0].getElementsByTagName("span");
    	for(var i=0;i<yeareventsel.length;i++)
		{
			yeareventsel[i].addEventListener("click",function(){
				var thisclass=this.getAttribute("class");
				if(thisclass=="action")
				{
					var thisclass=this.getAttribute("class");
					if(thisclass=="action")
					{
						if(this.parentNode.getElementsByClassName("yearselected")[0]!=undefined)
						{
							this.parentNode.getElementsByClassName("yearselected")[0].style.color="#000";
				   			this.parentNode.getElementsByClassName("yearselected")[0].setAttribute("class","action");
						}
				   		this.setAttribute("class","yearselected");
				   		this.style.color="#fff";
						var getthisyear=parint(this.getAttribute("year"));
				   		var thismonth=parint(setattr(".",schm,"get","month",0));
				   		var id=cid();
						settxt(".",schy,"set",getthisyear+"年");
						setattr(".",schy,"set","year",getthisyear);
						setattr(".",schy,"set","id",$(this).attr("id"));
						setattr("#",cid(),"set","year",getthisyear);
						setattr("#",id,"set",id+"_year",$(this).attr("id").substring(4,5));
						yearchangeopt(thismonth,getthisyear);
					}
				}
			},false)
		}
	}
	//年份下拉菜单点击
	document.getElementsByClassName(chyad)[0].onclick=function(){
		//console.log("yeardown")
		var thisid=cid();
		var flag=$("."+chyl).css("display");
		if(flag=="block"){
			hidecalender(chyl);
			$("."+chyls).html(" ");
		}
		else
		{
			//获取当前年份，然后处理
			
			var nowyear=parint(setattr(".",schy,"get","year",0));
			var nowyearid=parint(setattr("#",thisid,"get",thisid+"_year",0));
			if(nowyearid>10)
			{
				nowyearid=0
			}
//			console.log(nowyear+"vnowyear")
			yearupdown(nowyear,-nowyearid,-nowyearid+10);
		}
	}	
	document.getElementsByClassName(schy)[0].onclick=function(){
		document.getElementsByClassName(chyad)[0].click();
	}
	//年份切换
	document.getElementsByClassName(chyar)[0].onclick=function(){
		//隐藏年份弹窗
		var id=cid();
		hidecalender(chyl,chml,cchl,ccml,ccsl);
		$("."+chmal).show();
		$("."+chmal).prev().hide();
		var preyearval=parint(setattr(".",schy,"get","year",0));
		var thisymonth=parint(setattr(".",schm,"get","month",0));
		settxt(".",schy,"set",(preyearval+1)+"年");
		setattr(".",schy,"set","year",(preyearval+1));
		setattr("#",id,"set","year",(preyearval+1));
		setattr("#",id,"set",id+"_year",0);
		//获取当前年份，需要对月份进行判断
		yearchangeopt(thisymonth,preyearval+1);
		
	}
	document.getElementsByClassName(chyal)[0].onclick=function(){
		//隐藏年份弹窗
		var id=cid();
		hidecalender(chyl,chml,cchl,ccml,ccsl);
		$("."+chmar).show();
		$("."+chmar).prev().hide();
		var preyearval=parint(setattr("#",id,"get","year",0));
		var thisymonth=parint(setattr("#",id,"get","month",0));
		settxt(".",schy,"set",(preyearval-1)+"年");
		setattr(".",schy,"set","year",(preyearval-1));
		setattr("#",id,"set","year",(preyearval-1));
		setattr("#",id,"set",id+"_year",0);
		//获取当前年份，需要对月份进行判断
		yearchangeopt(thisymonth,preyearval-1);
}
	/*
	 * 月份点击事件（下拉菜单点击，月份点击，和置灰天数点击，月份左右箭头点击）
	 * */
	//月份切换--右箭头
	document.getElementsByClassName(chmar)[0].onclick=function(){
		showcalender(chmal,chyal);
		$("."+chmal).prev().hide();
		$("."+chyal).prev().hide();
		var id=cid();
		//隐藏年份弹窗
		hidecalender(chyl,chml,cchl,ccml,ccsl);
		var preyearval=parint(setattr("#",id,"get","year",0));
		var premonthval=parint(setattr("#",id,"get","month",0));
		if(premonthval>=12)
		{
			settxt(".",schy,"set",(preyearval+1)+"年");
			setattr(".",schy,"set","year",(preyearval+1));
			setattr(".",schm,"set","month",0);
			settxt(".",schm,"set","01月");
			setattr("#",id,"set","month",1);
			setattr("#",id,"set",cid()+"_month",0);
			setattr("#",id,"set","year",(preyearval+1));
	    	premonthval=0;	
		}
		else
		{
			if(premonthval<9){
				var arrowrightmonth="0"+(premonthval+1);
			}else{
				arrowrightmonth=(premonthval+1);
			}
			settxt(".",schm,"set",arrowrightmonth+"月");
			setattr(".",schm,"set","month",(premonthval+1));
			setattr("#",id,"set","month",(premonthval+1));
			setattr("#",id,"set",id+"_month",premonthval);
		}
		//对天数的处理
	    nextmonthopt(premonthval,preyearval);
	};
	//月份切换--左箭头
	document.getElementsByClassName(chmal)[0].onclick=function(){
		//隐藏年份弹窗
		hidecalender(chyl,chml,cchl,ccml,ccsl);
		$("."+chmar).show();
		$("."+chmar).prev().hide();
		var id=cid();
		var preyearval=parint(setattr("#",id,"get","year",0));
		var premonthval=parint(setattr("#",id,"get","month",0));
		if(premonthval<=1)
		{
			settxt(".",schy,"set",(preyearval-1)+"年");
			setattr(".",schy,"set","year",(preyearval-1));
			settxt(".",schm,"set","12月");
			setattr(".",schm,"set","month",12);
			setattr("#",id,"set","month",12);
	    	setattr("#",id,"set","year",(preyearval-1));
	    	setattr("#",id,"set",cid()+"_month",11);
	    	premonthval=12;
		}
		else
		{
			if(premonthval<=10){
				var arrowrightmonth="0"+(premonthval-1);
			}else{
				arrowrightmonth=(premonthval-1);
			}
			settxt(".",schm,"set",arrowrightmonth+"月");
			setattr(".",schm,"set","month",(premonthval-1));
			setattr("#",id,"set","month",(premonthval-1));
			setattr("#",id,"set",id+"_month",premonthval-2);
		}
		premonthopt(premonthval,preyearval);
	}
	//月份下拉菜单点击
	document.getElementsByClassName(chmad)[0].onclick=function(){
		//隐藏年份弹窗
		hidecalender(chyl,cchl,ccml,ccsl);
		var flag=$("."+chml).css("display");
		if(flag=="block"){
			hidecalender(chml);
			$("."+chml).html("");
		}
		else
		{
			//需要判断年份
			//获取当前月份，然后处理
			var nowmonth=parint(setattr("#",cid(),"get","month",0));
			var nowmonthid=parint(setattr("#",cid(),"get",cid()+"_month",0));
			$("."+chml).html("");
			var monthspan="";
			for(i=1,j=0;i<=12;i++,j++)
			{
				if(i<10){
					monthspan+="<span id=\"pinkm"+j+"\" class=\"action\" month=\""+i+"\">0"+i+"月</span>";
				}
				else
				{
					monthspan+="<span id=\"pinkm"+j+"\" class=\"action\" month=\""+i+"\">"+i+"月</span>";
				}
			}
			$("."+chml).append(monthspan);
			$("."+chml+" #pinkm"+nowmonthid).addClass("monthselected").removeClass("action").css("color","#fff");
			$("."+chml).show();
		}
		resetstartend(cid());
		monthclick();
	}
	//月份点击文字
	document.getElementsByClassName(schm)[0].onclick=function(){
		document.getElementsByClassName(chmad)[0].click();
	}
	//月份点击事件
	function monthclick(){
    	var montheventsel=document.getElementsByClassName(chml)[0].getElementsByTagName("span");
    	for(var i=0;i<montheventsel.length;i++)
		{
			montheventsel[i].addEventListener("click",function(){
				var thisclass=this.getAttribute("class");
				if(thisclass=="action")
				{
					var id=cid();
					var getthismonth=parint(this.getAttribute("month"));
			   		var year=parint(setattr("#",id,"get","year",0));
			   		var	realmonth    = fomcatdate(realmonth,getthismonth);
			   		if(this.parentNode.getElementsByClassName("monthselected")[0]){
			   			this.parentNode.getElementsByClassName("monthselected")[0].style.color="#000";
			   			this.parentNode.getElementsByClassName("monthselected")[0].setAttribute("class","action");
			   		}
			   		
			   		this.setAttribute("class","monthselected");
			   		this.style.color="#fff";
					settxt(".",schm,"set",realmonth+"月");
					setattr(".",schm,"set","month",getthismonth);
					setattr(".",schm,"set","id",$(this).attr("id"));
					setattr("#",id,"set",id+"_month",$(this).attr("id").substring(5,7));
					setattr("#",id,"set","month",getthismonth);
					//天处理
					yearchangeopt(getthismonth,year);
				}
				
			},false)
		}
    } 
    /*
     *小时处理 
     * */
    //点击显示或者隐藏内容框
    document.getElementsByClassName(cchtxt)[0].onclick=function(){
    	var thistxt=this.innerText;
	   	hidehms({
	   		"thistxt":thistxt,
	   		"display":cchl,
	   		"selectlist":cchls,
	   		"selectattr":"hourselected"
	   	})	
    }

    //点击x显示或者隐藏内容框
     document.getElementsByClassName(cchlt)[0].getElementsByTagName("span")[0].onclick=function(){
     	$("."+cchl).hide();
     }
    //小时点击事件
     function hoursclick(){
    	var houreventsel=document.getElementsByClassName(cchls)[0].getElementsByTagName("span");
    	for(var i=0;i<houreventsel.length;i++)
		{
			houreventsel[i].addEventListener("click",function(){
				var thisclass=this.getAttribute("class");
				if(thisclass=="action")
				{
					this.parentNode.getElementsByClassName("hourselected")[0].setAttribute("class","action");
					var thisval=parseInt(this.innerText);
					var	realval    = fomcatdate(realval,thisval);
			    	settxt(".",cchtxt,"set",realval);
			    	setattr(".",cchtxt,"set","hour",thisval);
			    	setattr("#",cid(),"set","hour",thisval);
			    	this.setAttribute("class","hourselected");
			    	resetstartend(cid());
				}
			},false)
		}
    } 
    /*
     *分钟处理 
     * */
    //点击显示或者隐藏内容框
    document.getElementsByClassName(ccmtxt)[0].onclick=function(){
		var thistxt=this.innerText;
	   	hidehms({
	   		"thistxt":thistxt,
	   		"display":ccml,
	   		"selectlist":ccmls,
	   		"selectattr":"minutesselected"
	   	})	
    }
    //点击x显示或者隐藏内容框
     document.getElementsByClassName(ccmlt)[0].getElementsByTagName("span")[0].onclick=function(){
     	$("."+ccml).hide();
     }
    //分钟点击事件
    function minutesclick(){
    	var minuteeventsel=document.getElementsByClassName(ccmls)[0].getElementsByTagName("span");
    	for(var i=0;i<minuteeventsel.length;i++)
		{
			minuteeventsel[i].addEventListener("click",function(){
				var thisclass=this.getAttribute("class");
				if(thisclass=="action")
				{
					this.parentNode.getElementsByClassName("minutesselected")[0].setAttribute("class","action");
					var thisval=parseInt(this.innerText);
					var	realval    = fomcatdate(realval,thisval);
			    	settxt(".",ccmtxt,"set",realval);
			    	setattr(".",ccmtxt,"set","minutes",thisval);
			    	setattr("#",cid(),"set","minutes",thisval);
			    	this.setAttribute("class","minutesselected");
			    	resetstartend(cid());
				}
			},false)
		}
    }
    
    /*
     *秒处理 
     * */
    //点击显示或者隐藏内容框
   document.getElementsByClassName(ccstxt)[0].onclick=function(){
   	var thistxt=this.innerText;
   	hidehms({
   		"thistxt":thistxt,
   		"display":ccsl,
   		"selectlist":ccsls,
   		"selectattr":"secondsselected"
   	})	
   }
    //点击x显示或者隐藏内容框
    document.getElementsByClassName(ccslt)[0].getElementsByTagName("span")[0].onclick=function(){
     	$("."+ccsl).hide();
     }
    //秒点击事件
    function secondsclick(){
    	var secondeventsel=document.getElementsByClassName(ccsls)[0].getElementsByTagName("span");
    	for(var i=0;i<secondeventsel.length;i++)
		{
			secondeventsel[i].addEventListener("click",function(){
				var thisclass=this.getAttribute("class");
				if(thisclass=="action")
				{
					this.parentNode.getElementsByClassName("secondsselected")[0].setAttribute("class","action");
					var thisval = parseInt(this.innerText);
					var	realval = fomcatdate(realval,thisval);
					settxt(".",ccstxt,"set",realval);
			    	setattr(".",ccstxt,"set","seconds",thisval);
			    	setattr("#",cid(),"set","seconds",thisval);
			    	this.setAttribute("class","secondsselected");
					resetstartend(cid());
				}
			},false)
		}
    }
     /*
     *天处理 
     * */
	function dayclick(){
		var dayeventsel=document.getElementsByClassName(ccd)[0].getElementsByTagName("span");
		for(var i=0;i<dayeventsel.length;i++)
		{
			dayeventsel[i].addEventListener("click",function(){
				var thisclass=this.getAttribute("class");
				if(thisclass=="action")
				{
					var id=cid();
					var thisval = parseInt(this.innerText);
					setattr(".","dayselected","set","class","action");
			   		setattr("#",id,"set","day",thisval);
			   		setattr("#",id,"set",id+"_day",thisval);
			   		this.setAttribute("class","dayselected");
				   resetstartend(id);
				}
				else if(thisclass=="noaction pre")//天数置灰部分点击事件（上个月） 
				{
					document.getElementsByClassName(chmal)[0].click();
				}
				else if(thisclass=="noaction next")//天数置灰部分点击事件（下个月） 
				{
					document.getElementsByClassName(chmar)[0].click();
				}
			},false)
		}
	}
	/*input点击 */
    $("#"+opt['id']).focus(function(){
    	$(this).blur();
    	focuspart(opt['id']);
    });
	 //点击空白区域，隐藏select模拟
	$(document).bind("click",function(e){
	 	var e = e||window.event;
	 	var targets = e.target||e.srcElement;
	 	var targetid=targets.getAttribute("id");
		if(targets.getAttribute("class")==canicon.substring(1))
		{
			focuspart($("#"+targetid).prev().attr("id"));
		}
		var thisid=cid();
		
		if($("#"+thisid+"__canlendar").offset()!=undefined)
		{	
			var startleft=$("#"+thisid+"__canlendar").offset()['left'];
			var starttop=$("#"+thisid+"__canlendar").offset()['top'];
			var ex=e.pageX||e.clientX;
			var ey=e.pageY||e.clientY;
			
			if($(targets).closest("#"+thisid+"__canlendar").length == 0)
			{
				if(ex>startleft+$("#"+thisid+"__canlendar").width()||ey>starttop+$("#"+thisid+"__canlendar").height()||ey<starttop-$("#"+thisid).height()||ex<startleft)
				{
					hidecalender(can,ccsl,cchl,ccml,chyl,chml);
				}
			}
		}
	 });
	//年列表鼠标经过事件
	$("."+chyl).mouseover(function(){
		$(this).show();
	}).mouseout(function(){
		$(this).hide();
	});
	//月列表鼠标经过事件
	$("."+chml).mouseover(function(){
		$(this).show();
	}).mouseout(function(){
		$(this).hide();
	});
	//点击今天按钮事件
	document.getElementsByClassName(btntoday)[0].onclick=todaybtn;
	//点击确定按钮事件
	document.getElementsByClassName(btnsure)[0].onclick=function(){
		var id=cid();
		var parents = $(this).parents("."+can);
		var year=parents.find("."+schy).attr("year");
		var month=parents.find("."+schm).attr("month");
		var day=parents.find(".dayselected").text();
		var hour=parents.find("."+cchtxt).attr("hour");
		var minutes=parents.find("."+ccmtxt).attr("minutes");
		var seconds=parents.find("."+ccstxt).attr("seconds");
		if(month=="0"){
			month=1
		}
		if(day==""||day==undefined){
			day=1;
		}
		var todayobj={
			"year":year,
			"month":month,
			"day":day,
			"hour":hour,
			"minutes":minutes,
			"seconds":seconds
		};
		var timeval=$("#"+id).val()||$("#"+id).attr("defval");
		var res = timeval.split(" ");
		var change=false;
		if(res[0].toString().indexOf(partline)<0){
			if(res[1].toString().indexOf(partline)>0){
				change=true;
			}
		}
		else{
			change=false;
		}
		
		if($("#"+id).attr("cflag")=="true")
		{
//			console.log("aaaaaa")
			focusreset(id,"",$("#"+id).attr("ymd").length,$("#"+id).attr("ymd"),todayobj,change);
			$("#"+id).attr("compareflag","true");
			var forval=$("#"+id).attr("for");
			var timeendid=forval.substring(2,forval.length);
			$("#"+timeendid).attr("defval",$("#"+id).attr("defval"));
			var rese=$("#"+timeendid).attr("defval").split(" ");
			focusreset(timeendid,rese,$("#"+timeendid).attr("ymd").length,$("#"+timeendid).attr("ymd"),"focusc",change);
			$("#"+id).removeAttr("cflag");
		}
		else
		{
			//console.log("-----555555------")
			focusreset(id,"",$("#"+id).attr("ymd").length,$("#"+id).attr("ymd"),todayobj,change);
		}
		//点击确定，清空，或者今天的时候重新赋值
		 $("."+can).hide();
		 if(fns)
		 {
		 	fn();
		 }
	};	
	//清空
	document.getElementsByClassName(btncancel)[0].onclick=function(){
		$("#"+cid()).val("")
		$("."+can).hide();
	}
};