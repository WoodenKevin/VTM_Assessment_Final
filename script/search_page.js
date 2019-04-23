// 显示搜索内容
function showSearchContent()
{
    // 获取搜索的内容
    var search_content = window.location.search.substr(1).split("search=")[1];
    var show_content = document.getElementsByClassName("content")[0];
    
    // 主页成功向搜索页传值时
    if (search_content)
    {
        // 显示搜索的内容
        show_content.innerHTML = search_content;
    }
}

// 显示分类下拉菜单
function showCategory()
{
    var button = document.getElementsByClassName("searchpage-categories")[0];
    var list = document.getElementsByClassName("search-category-wrap")[0];

    var mouse_over_button = false;
    var mouse_over_list = false;

    function show_or_hide_category()
    {
        if (mouse_over_button && !mouse_over_list)
        {
            list.style.cssText = "display: flex; display: -webkit-flex;";
            list.id = "showCategory";
        }
        else if (!mouse_over_button && mouse_over_list)
        {
            list.style.cssText = "display: flex; display: -webkit-flex;";
            list.id = " ";
        }
        else if (!mouse_over_button && !mouse_over_list)
        {
            list.id = "hideCategory";
        }
    }
    
    button.addEventListener("mouseover", function()
    {
        mouse_over_button = true;
        show_or_hide_category();
    });
    button.addEventListener("mouseout", function()
    {
        mouse_over_button = false;
        show_or_hide_category();
    });
    list.addEventListener("mouseover", function()
    {
        mouse_over_list = true;
        show_or_hide_category();
    });
    list.addEventListener("mouseout", function()
    {
        mouse_over_list = false;
        show_or_hide_category();
    });
    list.addEventListener("webkitAnimationEnd", function()
    {
        if (!mouse_over_button && !mouse_over_list)
        {
            list.style.cssText = "display: none;";
        }
    })
}

// 页面加载完成后
window.onload = function()
{
    readyToSearh(); // 搜索功能 // search_function.js
    showCategory();
    toCategoryPage(); // 跳转至分类页 // to_category_page_function.js
    showSearchContent(); // 显示搜索内容
    readyToShowBooksOnSearchPage(); // 显示搜索结果 // show_results_function.js
}