// 注意：每次调用 $.get() 或 $.post() 的时候，会先调用 ajaxPrefilter 这个函数
// 在这个啊函数中，可以拿到我们给Ajax提供的配置对象。
$.ajaxPrefilter(function(options){
    // 发起真正的 Ajax 请求之前，统一拼接请求的跟路径。
    // console.log(options.url);
    options.url = 'http://127.0.0.1:3007' + options.url;
    // console.log(options.url);
})