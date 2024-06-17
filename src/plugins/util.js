export default {
	install(app, options) {
		const $util = {
			imgLoadingChk: imgSelector => {
				return new Promise((resolve, reject) => {
					var total = imgSelector.length;
					return (function f(image, new_arr) {
						var imgArr = Array.prototype.slice.call(image);

						imgArr.forEach((img, index) => {
							console.log('이미지 ' + index + ' - 반복문 시작');
							if (img.complete) {
								console.log('이미지 로드가 되었습니다.');
								new_arr.push({
									loaded: img.complete,
									width: img.clientWidth,
									height: img.clientHeight,
								});
							} else {
								console.log('이미지 로드가 실패했습니다.');
								document.querySelectorAll('img').forEach(img => {
									img.addEventListener('load', () => {
										f([img], new_arr);
									});
									img.addEventListener('error', () => {
										console.log('이미지 로드 에러!');
									});
								});
							}

							if (total === new_arr.length) {
								console.log('이미지 로딩 완료');
								resolve(new_arr);
							}
						});
					})(imgSelector, []);
				});
			},
			addEventListener: function (element, type, callback) {
				if (element.addEventListener) {
					element.addEventListener(type, callback, false);
				} else {
					element.attachEvent('on' + type, callback);
				}
			},
			removeEventListener: function (element, type, callback) {
				if (element.removeEventListener) {
					element.removeEventListener(type, callback, false);
				} else {
					element.detachEvent('on' + type, callback);
				}
			},
			isElementInViewport: function (el) {
				var rect = el.getBoundingClientRect();

				return (
					((rect.top <= 0 && Math.abs(rect.top) <= el.clientHeight) ||
						rect.top >= 0) &&
					rect.left >= 0 &&
					rect.bottom <=
						(window.innerHeight ||
							document.documentElement
								.clientHeight) /*or $(window).height() */ &&
					rect.right <=
						(window.innerWidth ||
							document.documentElement.clientWidth) /*or $(window).width() */
				);
			},
      randomKey: function(){
        return 'f' + (Math.random() * (1 << 30)).toString(16).replace('.', '');
      },
      //소수점 이하의 값만 구하기
      getOnlyDecimal: function(number, length) {
        let result;
        result = number % 1;
        result  = Number(result .toFixed(length));
        return result;
      },
      deepCopy: function(obj) {
        let result = {};
        if (typeof obj === "object" && obj !== null){
          for (let i in obj) result[i] = $util.deepCopy(obj[i]);
        } else {
          result = obj;
        }
        return result;
      },      
		};

		app.provide('util', $util);
	},
};
