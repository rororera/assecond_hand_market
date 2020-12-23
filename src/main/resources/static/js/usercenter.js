function openLogin(){
    layer.open({
        type: 1 //Page层类型
        ,skin: 'layui-layer-molv'
        ,area: ['400px', '300px']
        ,title: ['登录','font-size:20px']
        ,shadeClose: true
        ,shade: 0.4 //遮罩透明度
        ,content:$("#login_model")
        ,end: function (){
            document.getElementById("login_from").reset();
        }
    });
}

function openRegister(){
    layer.open({
        type: 1 //Page层类型
        ,skin: 'layui-layer-molv'
        ,area: ['400px', '550px']
        ,title: ['注册','font-size:20px']
        ,shadeClose: true
        ,shade: 0.4 //遮罩透明度
        ,content:$("#register_model")
        ,end: function (){
            document.getElementById("register_form").reset();
        }
    });
}

function openPwdModel(){
    layer.open({
        type: 1 //Page层类型
        ,skin: 'layui-layer-molv'
        ,area: ['400px', '400px']
        ,title: ['修改密码','font-size:20px']
        ,shadeClose: true
        ,shade: 0.4 //遮罩透明度
        ,content:$("#pwd_model")
        ,end: function (){
            document.getElementById("pwd_from").reset();
        }
    });
}

function login() {
    $.ajax({
        type: "post",
        contentType: "application/json",
        dataType: "json",
        url: "/user/api/login",
        data: JSON.stringify($('#login_from').serializeObject()),
        success: function (data) {
            if(data.success){
                layer.msg("登录成功！");
                setTimeout(function(){
                    location.reload();
                },2000);
            }else{
                layer.msg(data.message);
            }
        }
    });
}

function register() {
    var a = $('#passworda').val();
    var b = $('#passwordb').val();
    if(a != b){
        layer.msg("两次输入的密码不一致！");
    }
    $.ajax({
        type: "post",
        contentType: "application/json",
        dataType: "json",
        url: "/user/api/addUser",
        data: JSON.stringify($('#register_form').serializeObject()),
        success: function (data) {
            if(data.success){
                layer.msg("注册成功！");
            }else{
                layer.msg(data.message);
            }
        }
    });

}

function changePwd() {
    var password1 = $('#password1').val();
    var password2 = $('#password2').val();

    if(password1 != password2){
        layer.msg("两次输入的密码不一致！");
    }else{
        $.ajax({
            type: "post",
            contentType: "application/json",
            dataType: "json",
            url: "/user/changePassword",
            data:JSON.stringify($('#pwd_from').serializeObject()),
            success: function (data) {
                if(data.success){
                    layer.msg("修改成功！");
                    setTimeout(function(){
                        location.reload();
                    },3000);
                }else{
                    layer.msg(data.message);
                }
            }
        });
    }
}

$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [ o[this.name] ];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
}





