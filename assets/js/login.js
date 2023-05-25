$(function(){
    // 给“去注册账号”绑定点击事件
    $("#link_reg").on('click',function(){
        $(".login_box").hide();
        $(".reg_box").show();
    })
    // 给“去登录"绑定点击事件
    $("#link_login").on('click',function(){
        $(".reg_box").hide();
        $(".login_box").show();
    })


    // 从layui中获取form对象
    var form = layui.form;
    var layer = layui.layer;
    // 通过form.verify(obj)的方法 自定义验证方法
    form.verify({
        // 自定义一个密码验证规则。
        pwd:[/^[\S]{6,12}$/, '密码必须为6到12位的非空字符'],

        // 校验两次密码不一致规则
        repwd:function(value){
            // 通过形参拿到确认密码输入的内容
            // 还需要拿到密码框中内容
            var pwd = $(".reg_box [name=password]").val();
            // 比较两次拿到的内容
            if(pwd !== value){
                return "两次密码输入不一致"
            }
            // 如果两次内容比较不一致，则返回提示信息。
        }
    })

    // 监听注册提交事件
    $("#form_reg").on('submit',function(e){
        // 1. 阻止默认事件
        e.preventDefault();
        var data = {
            username:$('#form_reg [name=username]').val(),
            password:$('#form_reg [name=password]').val()
        }
        $.post('/api/reguser',data, function (res) {
            if(res.status !== 0){
                // return console.log(res.message);
                return layer.msg(res.message)
            }
        //   console.log(res.message)
            layer.msg(res.message)
            // 模拟人的点击行为
            $("#link_login").click()
        })
    })

    // 监听登录提交事件
    $("#form_login").submit(function(e){
        // 阻止默认提交事件
        e.preventDefault();
        // 发起 post 请求
        $.ajax({
            url:'/api/login',
            method:'POST',
            // 快速获取表单中的数据
            data:$(this).serialize(),
            success:function(res){
                // console.log(res);
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                // 将登录成功得到 token 字符串 ，保存到 localStorage 中
                localStorage.setItem('token',res.token)
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})