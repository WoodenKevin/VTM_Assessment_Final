window.onload = function()
{
    var input = document.getElementById('searchcontent');
    function show_placeholder()
    {
        input.placeholder = '搜索';
    } 
    function hide_placeholder()
    {
        input.placeholder = ' ';
    }
    input.addEventListener('focus', hide_placeholder);
    input.addEventListener('blur', show_placeholder);

    var popup = document.getElementsByClassName('loginform')[0];
    var icon = document.getElementById('login-icon');
    popup.style.display = 'none';
    function show_and_hide_popup()
    {
        if (popup.style.display == 'none')
        {
            popup.style.display = 'block';
        }
        else if (popup.style.display == 'block')
        {
            popup.style.display = 'none';
        }
    }
    icon.addEventListener('click', show_and_hide_popup);
}
