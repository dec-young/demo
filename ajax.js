/**
 * @author Young
 * @data 2019-07-25
 * @description 封装好的ajax方法
 * @param {object || null } options
 * @example options {
 *  type ：请求方式 get/post
 *  url：请求地址
 *  data：携带的数据，要求是 键=值&键=值 形式
 *  callback：请求成功的回调函数
 *    接收一个参数，这个参数是一个返回的结果，是一个字符串
 * }
*/

function ajax(options) {
	options = options || {};
	options.type = options.type || 'get';
	options.url = options.url || '';
	options.data = options.data || '';
	options.callback = options.callback || function (res) {
		console.log('回调函数没有给');
		console.log(res);
	}

	let xhr = new XMLHttpRequest();
	// 如果是get请求，把数据拼接在url的后面
	if (options.type === 'get') {
		options.url += '?' + options.data;
	}
	xhr.open(options.type,options.url);
	// 如果是post请求，把数据放在send的里面，在之前需要设置请求头
	if(options.type === 'post'){
		xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		xhr.send(options.data);
	} else {
		xhr.send();
	}
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			if(xhr.status === 200){
				// 请求成功
				options.callback(xhr.responseText);
			}
		}
	}

}