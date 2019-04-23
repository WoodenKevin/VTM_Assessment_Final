function readyToSearh()
{
    var searchbar = document.getElementsByClassName('searchbar')[0];
    var input = document.getElementsByClassName('searchcontent')[0];
    var search = document.getElementsByClassName('search')[0];

    // 搜索框未激活时，显示提示文本
    input.addEventListener('blur', function()
    {
        if(document.getElementById('index-searchbar'))
        {
            input.placeholder = '搜索';
        }
        if(document.getElementById('navibar-searchbar'))
        {
            input.placeholder = '请搜索';
        }
    });

    // 搜索框激活时，隐藏提示文本
    input.addEventListener('focus', function()
    {
        input.placeholder = ' ';
    });

    // 点击搜索按钮时，检测是否有输入内容，并跳转至搜索页
    search.addEventListener('click', function(){
        // 搜索内容为空时禁止跳转
        if (!input.value || input.value == ' ')
        {
            return false;
        }
        // 搜索页地址
        var url = 'search_page.html?' + 'search=' + input.value;
        // 跳转至搜索页
        window.location.href = url
        // 禁止提交表单
        return false;
    });

    // 激活搜索框并按下回车键时，检测是否有输入内容，并跳转至搜索页
    searchbar.onkeydown = function()
    {
        // 按下回车时
        if (event.keyCode == 13)
        {
            // 搜索内容为空时禁止跳转
            if (!input.value || input.value == ' ')
            {
                return false;
            }
            // 搜索页地址
            var url = 'search_page.html?' + 'search=' + input.value;
            // 跳转至搜索页
            window.location.href = url
            // 禁止提交表单
            return false;
        }
    }
}