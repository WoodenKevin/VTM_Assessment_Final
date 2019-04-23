function readyToPopUp()
{
    var popup = document.getElementsByClassName('loginform')[0];
    var show = document.getElementById('login-icon');
    var hide = document.getElementById('close-icon');
    popup.style.display = 'none';

    // 弹出登录框
    show.addEventListener('click', function()
    {
        if (popup.style.display == 'none')
        {
            popup.style.display = 'block';
        }
    });

    // 隐藏登录框
    hide.addEventListener('click', function()
    {
        if (popup.style.display == 'block')
        {
            popup.style.display = 'none';
        }
    });
}

function LoadingAnimation()
{
    var form = document.getElementsByClassName('loginform')[0];
    form.style.display = 'none';

    var animation = document.getElementsByClassName('loading')[0];
    animation.style.visibility = 'visible';

    function dotsAnimation()
    {
        var dots = document.getElementsByClassName('loadingdot');
        dots[0].style.backgroundColor = '#444444';

        setTimeout(function()
        {
            dots[0].style.backgroundColor = '#eff3f6';
            dots[1].style.backgroundColor = '#444444';
        }, 200);
        setTimeout(function()
        {
            dots[1].style.backgroundColor = '#eff3f6';
            dots[2].style.backgroundColor = '#444444';
        }, 400);
        setTimeout(function()
        {
            dots[2].style.backgroundColor = '#eff3f6';
            dots[0].style.backgroundColor = '#444444';
        }, 600);
    }

    dotsAnimation();
    setTimeout(dotsAnimation, 600);
    setTimeout(function()
    {
        animation.style.visibility = 'hidden';
    }, 600);
}

function LogIn(username, password)
{
    $.ajax(
        {
            url: "http://vtmer.cn/login",
            dataType: "json",
            async: true,
            type: "GET",
            success: function(data)
            {
                var i = Math.floor(Math.random() * 9);
                var username = data.user[i].name;

                LoadingAnimation();
                
                var icon = document.getElementsByClassName('showpopup')[0];
                icon.style.display = 'none';

                var text = document.getElementsByClassName('username')[0];
                text.innerHTML = username;
            }
        }
    )
}

function readyToLogIn()
{
    var input = document.getElementsByClassName('input');
    var login = document.getElementById('login');
    var form = document.getElementsByClassName('loginarea')[0];

    for(var i = 0; i < 2; i++)
    {
        (function(i)
        {
            // 输入框失去焦点时，显示提示文本
            input[i].addEventListener('blur', function()
            {
                if (i == 0)
                {
                    input[i].placeholder = '用户名';
                }
                else
                {
                    input[i].placeholder = '﹡﹡﹡﹡﹡﹡﹡';
                }
            });

            // 输入框获得焦点时，隐藏提示文本
            input[i].addEventListener('focus', function()
            {
                input[i].placeholder = ' ';
            });


        })(i);
    }
    
    // 点击登录按钮时，检测是否有输入内容以及输入内容是否合法，并登录
    login.addEventListener('click', function(){
        if (!input[0].value || !input[1].value)
        {
            return false;
        }
        else if (input[0].value == ' ')
        {
            alert("用户名不能为空！");
            return false;
        }
        else if (input[1].value == ' ')
        {
            alert("密码不能为空！");
            return false;
        }
        else if (input[0].value != ' ' && input[1].value != ' ')
        {
            var username_patt = /^[A-z]+$/;
            var password_patt = /^\d{6,10}$/;

            if (!username_patt.test(input[0].value) && password_patt.test(input[1].value))
            {
                alert("用户名只能由英文字符构成且不能有空格！");
                return false;
            }
            if (!password_patt.test(input[1].value) && username_patt.test(input[0].value))
            {
                alert("密码只能由纯数字构成且长度为6~10！");
                return false;
            }
            if (!username_patt.test(input[0].value) && !password_patt.test(input[1].value))
            {
                alert("用户名只能由英文字符构成且不能有空格！\n密码只能由纯数字构成且长度为6~10！");
                return false;
            }

            LogIn(input[0].value, input[1].value);
        }
    });
    // 激活输入框并按下回车键时，检测是否有输入内容以及输入内容是否合法，并登录
    form.onkeydown = function()
    {
        // 按下回车时
        if (event.keyCode == 13)
        {
            if (!input[0].value || !input[1].value)
            {
                return false;
            }
            else if (input[0].value == ' ')
            {
                alert("用户名不能为空！");
                return false;
            }
            else if (input[1].value == ' ')
            {
                alert("密码不能为空！");
                return false;
            }
            else if (input[0].value != ' ' && input[1].value != ' ')
            {
                var username_patt = /^[A-z]+$/;
                var password_patt = /^\d{6,10}$/;
    
                if (!username_patt.test(input[0].value) && password_patt.test(input[1].value))
                {
                    alert("用户名只能由英文字符构成且不能有空格！");
                    return false;
                }
                if (!password_patt.test(input[1].value) && username_patt.test(input[0].value))
                {
                    alert("密码只能由纯数字构成且长度为6~10！");
                    return false;
                }
                if (!username_patt.test(input[0].value) && !password_patt.test(input[1].value))
                {
                    alert("用户名只能由英文字符构成且不能有空格！\n密码只能由纯数字构成且长度为6~10！");
                    return false;
                }
    
                LogIn(input[0].value, input[1].value);
                return false;
            }
        }
    }
    // 禁止提交表单
    form.onsubmit = function()
    {
        return false;
    }
}

// Mock.js随机数据 
Mock.mock('http://vtmer.cn/login', {
    'user|9':[{
             name:'@first()',
             password:'@string(lower+number,6,10)'
         }]         
 });

window.onload = function()
{
    readyToSearh(); // 搜索功能 // search_function.js
    toCategoryPage(); // 跳转至分类页 // to_category_page_function.js
    readyToPopUp();
    readyToLogIn();
}
