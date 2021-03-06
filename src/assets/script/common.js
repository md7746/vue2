import {MTween,css} from './m.Tween.js'

/**
 * Vue的插件，用初始化！
 **/
let common = {
	preventDefault(){
		document.addEventListener('touchstart', function(e) {
			if(!(e.target.className.indexOf('has-event')>-1)){
				e.preventDefault();
			}
		});
	},
	basicRem(value) {
		let html = document.documentElement;
		let hWidth = html.getBoundingClientRect().width;
		html.style.fontSize = hWidth / value + "px";
	},
	defineScroll(init){
		if(!init.el){
			return;
		}
		if(!init.type){
			init.type = "backOut"
		}
		var wrap = init.el;
		var inner = init.el.children[0];
		var scrollBar = document.createElement("div");	
		var startPoint = 0;
		var startEl = 0;
		var lastY = 0;
		var lastDis = 0;
		var lastTime = 0;
		var lastTimeDis = 0;
		var maxTranslate = wrap.clientHeight - inner.offsetHeight;
		if(!init.offBar){
			var scale = wrap.clientHeight/inner.offsetHeight;
			inner.style.minHeight = "100%";
			scrollBar.style.cssText = "width:6px;background:rgba(0,0,0,.5);position:absolute;right:0;top:0;border-radius:3px;opacity:0;transition:.3s opacity;";
			wrap.appendChild(scrollBar);
		}
		css(inner,"translateZ",0.01);
		inner.addEventListener('touchstart', function(e) {
			maxTranslate = wrap.clientHeight - inner.offsetHeight;
			if(!init.offBar){
				if(maxTranslate >= 0) {
					scrollBar.style.display = "none";
				} else {
					scrollBar.style.display = "block";
				}
				scale = wrap.clientHeight/inner.offsetHeight;
				scrollBar.style.height = wrap.clientHeight * scale + "px";
			}
			startPoint = e.changedTouches[0].pageY;
			startEl = css(inner,"translateY");
			lastY = startEl;
			lastTime = new Date().getTime();
			lastTimeDis = lastDis = 0;
			(init.offBar)||(scrollBar.style.opacity = 1);
		});
		inner.addEventListener('touchmove', function(e) {
			var nowTime = new Date().getTime();
			var nowPoint = e.changedTouches[0].pageY;
			var dis = nowPoint - startPoint;
			var translateY = startEl + dis;
			css(inner,"translateY",translateY);
			(init.offBar)||css(scrollBar,"translateY",-translateY*scale);
			lastDis = translateY - lastY;
			lastY = translateY;
			lastTimeDis = nowTime - lastTime;
			lastTime = nowTime;
		});
		inner.addEventListener('touchend', function(e) {
			var type = init.type;
			var speed = Math.round(lastDis / lastTimeDis*10);
			speed = lastTimeDis <= 0?0 :speed;
			var target = Math.round(speed*30 + css(inner,"translateY"));
			if(target > 0+0){
				target = 0;
			} else if(target < maxTranslate-0){
				target = maxTranslate;

				if(init.loadDown){
					init.loadDown();
				}
				
			}
			MTween({
				el:inner,
				target: {translateY:target},
				time: Math.round(Math.abs(target - css(inner,"translateY"))*1.8),
				type: type,
				callBack: function(){
					(init.offBar) || (scrollBar.style.opacity = 0);
				},
				callIn: function(){
					var translateY = css(inner,"translateY");
					init.offBar||css(scrollBar,"translateY",-translateY*scale);
				}
			});
		});
	}
}

export default {
	install: function(vm) {
		vm.prototype.$common = common
	}
}