$(function(){
    var form = layui.form

    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必为6到12位的非空字符'],
        samPwd:function(value){
            if(value === $('[name=oldPwd]').val()){
                return '新旧密码不能相同'
            }
        },
        rePwd:function(value){
            if(value !== $('[name=newPwd]').val()){
                return '两次密码输如不一致。'
            }
        }
    })

    // 实现重置密码功能
    $('.layui-form').on('submit',function(e){
        // 阻止默认提交行为
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                console.log(res);
                if(res.status !== 0){
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                // 重置表单
                $('.layui-form')[0].reset()
            }
        })

    })
})