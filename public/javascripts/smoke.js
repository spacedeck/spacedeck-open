/*
	SMOKE.JS - 0.1.3
	(c) 2011-2013 Jonathan Youngblood
	demos / documentation: http://smoke-js.com/ 
*/

;(function(window, document) {

	/*jslint browser: true, onevar: true, undef: true, nomen: false, eqeqeq: true, bitwise: true, regexp: true, newcap: true, immed: true */
	
	var smoke = {
	  smoketimeout: [],
	  init: false,
	  zindex: 40000,
	  i: 0,
	
		bodyload: function(id) {
			var ff = document.createElement('div');
					ff.setAttribute('id','smoke-out-'+id);
					ff.className = 'smoke-base';
					ff.style.zIndex = smoke.zindex;
					smoke.zindex++;
					document.body.appendChild(ff);
		},
	
		newdialog: function() {
			var newid = new Date().getTime();
					newid = Math.random(1,99) + newid;	
	
			if (!smoke.init) {		
		    smoke.listen(window,"load", function() {
			    smoke.bodyload(newid);
				});
			} else {
		    smoke.bodyload(newid);		
			}
	
			return newid;
		},
	
		forceload: function() {},
	
		build: function (e, f) {
			smoke.i++;
			
			f.stack = smoke.i;
	
			e = e.replace(/\n/g,'<br />');
			e = e.replace(/\r/g,'<br />');
	
			var prompt = '',
			    ok = 'OK',
			    cancel = 'Cancel',
			    classname = '',
			    buttons = '',
			    box;
	
			if (f.type === 'prompt') {
				prompt = 
					'<div class="smoke-dialog-prompt">'+
						'<input class="input" id="smoke-dialog-input-'+f.newid+'" type="text" ' + (f.params.value ? 'value="' + f.params.value + '"' : '') + ' />'+
					'</div>';
			}
	
			if (f.params.ok) {
				ok = f.params.ok;
			}
			
			if (f.params.cancel) {
				cancel = f.params.cancel;
			}
			
			if (f.params.classname) {
				classname = f.params.classname;
			}
	
			if (f.type !== 'signal') {
				buttons = '<div class="smoke-dialog-buttons">';
				if (f.type === 'alert') {
					buttons +=
						'<button class="btn btn-md btn-round" id="alert-ok-'+f.newid+'">'+ok+'</button>';
				}
				 else if (f.type === 'quiz') {
	
					if (f.params.button_1) {
						buttons +=
							'<button class="btn btn-md btn-round quiz-button" id="'+f.type+'-ok1-'+f.newid+'">'+f.params.button_1+'</button>';
					}
	
					if (f.params.button_2) {
						buttons +=
							'<button class="btn btn-md btn-round quiz-button" id="'+f.type+'-ok2-'+f.newid+'">'+f.params.button_2+'</button>';
					}
	
					if (f.params.button_3) {
						buttons +=
							'<button class="btn btn-md btn-round quiz-button" id="'+f.type+'-ok3-'+f.newid+'">'+f.params.button_3+'</button>';
					}
					if (f.params.button_cancel) {
						buttons +=
							'<button id="'+f.type+'-cancel-'+f.newid+'" class="btn btn-md btn-round cancel">'+f.params.button_cancel+'</button>';
					}
	
				}
				
				 else if (f.type === 'prompt' || f.type === 'confirm') {
					if (f.params.reverseButtons) {
						buttons +=
							'<button class="btn btn-md btn-round btn-primary" id="'+f.type+'-ok-'+f.newid+'">'+ok+'</button>' +
							'<button class="btn btn-md btn-round cancel" id="'+f.type+'-cancel-'+f.newid+'">'+cancel+'</button>';				
					} else {
						buttons +=
							'<button class="btn btn-md btn-round cancel" id="'+f.type+'-cancel-'+f.newid+'">'+cancel+'</button>'+
							'<button class="btn btn-md btn-round btn-primary" id="'+f.type+'-ok-'+f.newid+'">'+ok+'</button>';
					}
				}
				buttons += '</div>';
			}
	
	
			box = 
				'<div class="smoke-dialog smoke '+classname+'">'+
					'<div class="smoke-dialog-inner">'+
							e+
							prompt+
							buttons+			
					'</div>'+
				'</div>';
	
			if (!smoke.init) {		
				smoke.listen(window,"load", function() {
					smoke.finishbuild(e,f,box);
				});
			} else{
				smoke.finishbuild(e,f,box);
			}
	
		},
	
		finishbuild: function(e, f, box) {
		
			var ff = document.getElementById('smoke-out-'+f.newid);
	
			ff.className = 'smoke-base smoke-visible  smoke-' + f.type;
			ff.innerHTML = box;
					
			while (ff.innerHTML === "") {
				ff.innerHTML = box;
			}
			
			if (smoke.smoketimeout[f.newid]) {
				clearTimeout(smoke.smoketimeout[f.newid]);
			}
	
			// smoke.listen(
			// 	document.getElementById('smoke-bg-'+f.newid),
			// 	"click", 
			// 	function () {
			// 		smoke.destroy(f.type, f.newid);
			// 		if (f.type === 'prompt' || f.type === 'confirm' || f.type === 'quiz') {
			// 			f.callback(false);
			// 		} else if (f.type === 'alert' && typeof f.callback !== 'undefined') {
			// 			f.callback();
			// 		}	
			// 	}
			// );
		
		
			switch (f.type) {
				case 'alert': 
					smoke.finishbuildAlert(e, f, box);
					break;
				case 'confirm':
					smoke.finishbuildConfirm(e, f, box);
					break;
				case 'quiz':
					smoke.finishbuildQuiz(e, f, box);
					break;
				case 'prompt':
					smoke.finishbuildPrompt(e, f, box);
					break;
				case 'signal':
					smoke.finishbuildSignal(e, f, box);
					break;
				default:
					throw "Unknown type: " + f.type;
			}
		},
		
		finishbuildAlert: function (e, f, box) {
			smoke.listen(
				document.getElementById('alert-ok-'+f.newid),
				"click", 
				function () {
					smoke.destroy(f.type, f.newid);
					if (typeof f.callback !== 'undefined') {
						f.callback();
					}
				}
			);
		
			document.onkeyup = function (e) {
				if (!e) {
					e = window.event;
				}
				if (e.keyCode === 13 || e.keyCode === 32 || e.keyCode === 27) {
					smoke.destroy(f.type, f.newid);
					if (typeof f.callback !== 'undefined') {
						f.callback();
					}					
				}
			};	
		},
		
		finishbuildConfirm: function (e, f, box) {
			smoke.listen(
				document.getElementById('confirm-cancel-' + f.newid),
				"click", 
				function () 
				{
					smoke.destroy(f.type, f.newid);
					f.callback(false);
				}
			);
			
			smoke.listen(
				document.getElementById('confirm-ok-' + f.newid),
				"click", 
				function () 
				{
					smoke.destroy(f.type, f.newid);
					f.callback(true);
				}
			);
					
			document.onkeyup = function (e) {
				if (!e) {
					e = window.event;
				}
				if (e.keyCode === 13 || e.keyCode === 32) {
					smoke.destroy(f.type, f.newid);
					f.callback(true);
				} else if (e.keyCode === 27) {
					smoke.destroy(f.type, f.newid);
					f.callback(false);
				}
			};	
		},
		
		finishbuildQuiz: function (e, f, box) {
			var a, b, c;
			
			smoke.listen(
				document.getElementById('quiz-cancel-' + f.newid),
				"click", 
				function () 
				{
					smoke.destroy(f.type, f.newid);
					f.callback(false);
				}
			);
	
	
			if (a = document.getElementById('quiz-ok1-'+f.newid))
			smoke.listen(
				a,
				"click", 
				function () {
					smoke.destroy(f.type, f.newid);
					f.callback(a.innerHTML);
				}
			);
	
	
			if (b = document.getElementById('quiz-ok2-'+f.newid))
			smoke.listen(
				b,
				"click", 
				function () {
					smoke.destroy(f.type, f.newid);
					f.callback(b.innerHTML);
				}
			);
	
	
			if (c = document.getElementById('quiz-ok3-'+f.newid))
			smoke.listen(
				c,
				"click", 
				function () {
					smoke.destroy(f.type, f.newid);
					f.callback(c.innerHTML);
				}
			);
	
			document.onkeyup = function (e) {
				if (!e) {
					e = window.event;
				}
				if (e.keyCode === 27) {
					smoke.destroy(f.type, f.newid);
					f.callback(false);
				}
			};	
		
		},
		
		finishbuildPrompt: function (e, f, box) {
			var pi = document.getElementById('smoke-dialog-input-'+f.newid);
				
			setTimeout(function () {
				pi.focus();
				pi.select();
			}, 100);
		
			smoke.listen(
				document.getElementById('prompt-cancel-'+f.newid),
				"click", 
				function () {
					smoke.destroy(f.type, f.newid);
					f.callback(false);
				}
			);
		
			smoke.listen(
				document.getElementById('prompt-ok-'+f.newid),
				"click", 
				function () {
					smoke.destroy(f.type, f.newid);
					f.callback(pi.value);
				}
			);
					
			document.onkeyup = function (e) {
				if (!e) {
					e = window.event;
				}
				
				if (e.keyCode === 13) {
					smoke.destroy(f.type, f.newid);
					f.callback(pi.value);
				} else if (e.keyCode === 27) {
					smoke.destroy(f.type, f.newid);
					f.callback(false);
				}
			};
		},
		
		finishbuildSignal: function (e, f, box) {
	
	
			document.onkeyup = function (e) {
				if (!e) {
					e = window.event;
				}
				if (e.keyCode === 27) {
					smoke.destroy(f.type, f.newid);
					if (typeof f.callback !== 'undefined') {
						f.callback();
					}
				}
			};	
	
			smoke.smoketimeout[f.newid] = setTimeout(function () {
				smoke.destroy(f.type, f.newid);
				if (typeof f.callback !== 'undefined') {
					f.callback();
				}
			}, f.timeout);
		},
		
				
		destroy: function (type,id) {
	
			var box = document.getElementById('smoke-out-'+id);
	
			if (type !== 'quiz') {
			    var okButton = document.getElementById(type+'-ok-'+id);
			}
	
	    var cancelButton = document.getElementById(type+'-cancel-'+id);
			box.className = 'smoke-base';
	
			if (okButton) {
				smoke.stoplistening(okButton, "click", function() {});
				document.onkeyup = null;
			}
			
			if (type === 'quiz') {
				var quiz_buttons = document.getElementsByClassName("quiz-button");
				for (var i = 0; i < quiz_buttons.length; i++) {
				smoke.stoplistening(quiz_buttons[i], "click", function() {});
				document.onkeyup = null;
				}			
			}
			
			if (cancelButton) {
				smoke.stoplistening(cancelButton, "click", function() {});
			}
			
			smoke.i = 0;
			box.innerHTML = '';
		},
	
		alert: function (e, f, g) {
			if (typeof g !== 'object') {
				g = false;
			}
			
			var id = smoke.newdialog();
			
			smoke.build(e, {
				type:     'alert',
				callback: f,
				params:   g,
				newid:    id
			});
		},
		
		signal: function (e, f, g) {
			if (typeof g !== 'object') {
				g = false;
			}		

			var duration = 5000;
			if (g.duration !== 'undefined'){
				duration = g.duration;
			}
			
			var id = smoke.newdialog();
			smoke.build(e, {
				type:    'signal',
				callback: f,
				timeout: duration,
				params:  g,
				newid:   id
			});
		},
		
		confirm: function (e, f, g) {
			if (typeof g !== 'object') {
				g = false;
			}
			
			var id = smoke.newdialog();
			smoke.build(e, {
				type:     'confirm',
				callback: f,
				params:   g,
				newid:    id
			});
		},
		
		quiz: function (e, f, g) {
			if (typeof g !== 'object') {
				g = false;
			}
			
			var id = smoke.newdialog();
			smoke.build(e, {
				type:     'quiz',
				callback: f,
				params:   g,
				newid:    id
			});
		},
		
		prompt: function (e, f, g) {
			if (typeof g !== 'object') {
				g = false;
			}
			
			var id = smoke.newdialog();
			return smoke.build(e,{type:'prompt',callback:f,params:g,newid:id});
		},
		
		listen: function (e, f, g) {
	    if (e.addEventListener) {
	      return e.addEventListener(f, g, false);
	    } 
	    
	    if (e.attachEvent) {
	      return e.attachEvent('on'+f, g);
	    } 
	    
			return false;
		},
		
		stoplistening: function (e, f, g) {	
	    if (e.removeEventListener) {
	      return e.removeEventListener(f, g, false);
	    }
	    
	    if (e.detachEvent) {
	      return e.detachEvent('on'+f, g);
	    }
	    
	    return false;
		}
	};
	
	
	smoke.init = true;

	if (typeof module != 'undefined' && module.exports) {
		module.exports = smoke;
	}
	else if (typeof define === 'function' && define.amd) {
		define('smoke', [], function() {
		    return smoke;
		});
	}
	else {
		this.smoke = smoke;
	}

})(window, document);
