$(function() {
        // 调用获取基本信息接口
        getUserinfo()
        var layer = layui.layer
        $('#btnLogout').on('click', function() {

            layer.confirm('确认退出?', { icon: 3, title: '提示' },
                function(index) {
                    //do something

                    layer.close(index);
                    console.log('ok');
                    //退出需要清除token
                    localStorage.removeItem('token')
                    location.href = '/login.html'
                })
        })

    })
    //获取用户的基本信息
function getUserinfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''


        // },
        success: function(res) {
            // console.log(localStorage.getItem('token'));
            console.log(res);
            // console.log(Headers);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            //调用 renderAvatar 渲染用户头像
            renderAvatar(res.data)
        },
        // complete: function(res) {
        //     console.log('object');
        //     console.log(res);
        //     //complete回调函数中 可以使用res.response拿到服务器数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         //1.强制清空头肯


        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    })


}

function renderAvatar(user) {
    //1.获取用户名称
    var name = user.nickname || user.username
    console.log(name);
    //设置欢迎文本
    $('#welcome').html('欢迎' + name)
        // 3.按需渲染
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).hide()
        $('.text-avater').hide()
    } else {
        //渲染文字头像
        $('.layui-nav-img').hide()
        var first = name[2].toUpperCase()
        $('.text-avater').html(first).show()
    }


}