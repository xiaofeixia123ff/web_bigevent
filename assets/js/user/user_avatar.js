var layer = layui.layer

// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选
const options = {
    // 纵横比
    aspectRatio:1,
    // 指定预览区域
    preview: '.img-preview'
}
// 1.3 创建裁剪区域
$image.cropper(options)

// 给上传按钮绑定选择文件功能
$("#btnchooseImage").on('click', function () {
    $("#file").click()
})

// 给选择文件筐绑定 改变事件
$("#file").on('change', function (e) {
    // console.log(e);
    // 获取用户选择的文件
    var fileList = e.target.files;
    // console.log(fileList);
    if (fileList.length === 0) {
        return layer.msg('请选择照片')
    }
    // 1. 拿到用户选择的文件
    var file = e.target.files[0]
    // console.log(file);
    // 2. 将 文件转换为路径。
    var imgURL = URL.createObjectURL(file)
    // 3. 初始化裁剪区域
    $image
        .cropper('destroy') // 销毁旧的裁剪区域
        .attr('src', imgURL) // 重新设置图片路径
        .cropper(options) // 重新初始化裁剪区域
})

$("#btnUpload").on('click', function () {
    // 1. 拿到用户裁剪之后的头像
    var dataURL = $image
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 100,
            height: 100
        })
        .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    
    // 2. 调用接口，把头像上传到服务器。
    $.ajax({
        method:'POST',
        url:'/my/update/avatar',
        data:{
            avatar:dataURL
        },
        success:function(res){
            // console.log(res);
            if(res.status !== 0){
                return layer.msg(res.message)
            }
            layer.msg(res.message)
            window.parent.getUserInfo()
        }
    })
})