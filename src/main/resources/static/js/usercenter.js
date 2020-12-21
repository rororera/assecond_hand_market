function openLogin(){
    layer.open({
        type: 1 //Page层类型
        ,skin: 'layui-layer-molv'
        ,area: ['400px', '400px']
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
        ,area: ['400px', '600px']
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
        ,area: ['400px', '600px']
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
    console.log(JSON.stringify($('#login_from').serializeObject()))
    $.ajax({
        type: "post",
        contentType: "application/json",
        dataType: "json",
        url: "/user/api/login",
        data: JSON.stringify($('#login_from').serializeObject()),
        success: function (data) {
            if(data.success){
                location.reload();
            }else{
                layer.msg(data.message);
            }
        }
    });
}

function register() {
    $.ajax({
        type: "post",
        contentType: "application/json",
        dataType: "json",
        url: "/user/api/addUser",
        data: JSON.stringify($('#register_form').serializeObject()),
        success: function (data) {
            console.log(data);
        }
    });

}

function changePwd() {
    var password1 = $('#password1').val();
    var password2 = $('#password2').val();

    if(password1 != password2){
        layer.msg("两次密码不一致！");
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





