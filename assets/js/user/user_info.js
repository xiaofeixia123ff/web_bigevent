$(function(){
    var form = layui.form
    var layer = layui.layer

    form.verify({
        nickname:function(value){
            if(value.length > 6){
                return '昵称长度必须在1 ~ 6 个字符之间'
            }
        }
    })

    initUserInfo()
    // 初始换用户的基本信息
    function initUserInfo(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('获取用户信息失败')
                }
                // console.log(res);
                // 调用 form.val()快速为表单赋值
                form.val('formUserInfo',res.data)
            }
        })
    }

    // 设置表单的重置
    $("#btnReset").on('click',function(e){
        // 阻止表单的默认重置行为
        e.preventDefault();
        initUserInfo();
    })

    // 监听表单提交的事件
    $('.layui-form').on('submit',function(e){
        // 阻止表单的默认提交行为
        e.preventDefault();
        // 发起ajax数据请
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                // console.log($('.layui-form').serialize());
                // console.log(res);
                if(res.status !== 0){
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                // 调用父页面中的方法，从新渲染用户的头像和用户的信息
                console.log(window);//这个window是fm 也就是 fm板块
                window.parent.getUserInfo()
            }
        })
    })
})