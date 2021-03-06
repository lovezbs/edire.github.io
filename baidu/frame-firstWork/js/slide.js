/*
 * jQuery - Slide v1.0
 * Copyright(c) 2014 by 范明非-Edire
 * Date: 2014-10-1
 * For: Baidu Cloud
 */
(function($){
	var canSlide=true,thisImg=0,tm,n,run,ts;
	$.fn.slideInit=function(imgSrc,time){
		var text='',
			x;
		for(x in imgSrc){				//将所有的图片写入字符串
				text+='<li class="case" style="background-image:url('+imgSrc[x]+')"><a href=""></a></li>';
			}
		$(text).appendTo(this);			//将整理好的字符串变成对象写入DOM
		var img=$('.case');						//获取轮播单位
		$(img[0]).clone(true).appendTo(this);	//将第一个单位复制并放到最后，为了实现连续轮播
		var boxWidth=(imgSrc.length+1)*100+'%';	//计算存放图片的盒子宽度
		$(this).css('width',boxWidth);		//设置存放图片的盒子宽度
		$(this).css('left','0');				//设置存放图片盒子的left，以便使用jquery对其进行检测与操作
		var caseWidth2=100/(imgSrc.length+1)+'%';//计算轮播单位的宽度
		$('.case').css('width',caseWidth2);		//设置轮播单位的宽度
		n=imgSrc.length;						//复制一个n的变量，以便以后用
		tm=5000;								//默认时间
		if(time){
			tm=time;								//设置时间	
		}
		ts=$(this);
		run=ts.slideTimeRun();					//滚动开始
	};
	$.fn.slideNext=function(){
		if(canSlide==true){					//判断是否可以执行轮播
				if(thisImg==n) {			//判断是否是最后一个轮播单位，如果是变为第一个轮播单位
					$(this).css('left','0');
					thisImg=0;
				}
				canSlide=false;					//准备轮播，禁止重复轮播事件发生
				clearInterval(run);						//停止时间间隔事件，防止下次轮播提前x
				$(this).animate({'left':"-="+'100%'},function(){
					canSlide=true;				//轮播完毕，可以进行下一次轮播
					thisImg++;					//改变当前图片记录
					run=ts.slideTimeRun();
					});
			}
	};
	$.fn.slidePrev=function(){
		if(canSlide==true){					//判断是否可以执行轮播
				if(thisImg==0) {			//判断是否是最后一个轮播单位，如果是变为第一个轮播单位
					$(this).css('left',-n*100+'%');
					thisImg=n;
				}
				canSlide=false;					//准备轮播，禁止重复轮播事件发生
				clearInterval(run);						//停止时间间隔事件，防止下次轮播提前
				$(this).animate({'left':"+="+'100%'},function(){
					canSlide=true;				//轮播完毕，可以进行下一次轮播
					thisImg--;					//改变当前图片记录
					run=ts.slideTimeRun();					//开始时间间隔事件
					});
			}
	};
	$.fn.slideTimeRun=function(){
		return setInterval(function(){
			ts.slideNext();
				},tm);
	}
})(jQuery)