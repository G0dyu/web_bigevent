$(function() {
    //点击注册账号
    $('#link_reg').on('click', function() {
            $('.login-box').hide()
            $('.reg-box').show()
        })
        // #点击去登录的链接
        //点击登录账号
    $('#link_login').on('click', function() {
            $('.login-box').show()
            $('.reg-box').hide()

        })
        //从layui对象中获取form独享
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ], //校验两次密码是否一致的规则
        repwd: function(value) {
            //通过形参拿到的是确认密码框的内容，我们还需要拿到密码框的内容
            //进行判断
            var pwd = $('.reg-box [name=password]').val()

            if (pwd !== value) {
                //陈宫
                return '两次密码不一致！'
            }
        }

    })
    $('#form-reg').on('submit', function(e) {
        e.preventDefault()
        var data = { username: $('#form-reg [name=username]').val(), password: $('#form-reg [name=password]').val() }
        $.post('http://api-breakingnews-web.itheima.net/api/reguser', data,
            function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功,请登录！');
                //模拟人的点击行为
                $('#link_login').click()
            })

    })
    $('#form_login').submit(function(e) {
        //阻止默认提交行为
        e.preventDefault()
        $.ajax({
            url: 'http://api-breakingnews-web.itheima.net/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                console.log(res.token);
                //将获取的token保存到locs中
                localStorage.setItem('token', res.token)
                location.href = 'index.html'
            }
        })
    })
})