function toCategoryPage()
{
    var categories = document.getElementsByClassName("tocatgorypage");
    var numbers_of_categories = categories.length;

    for (var i = 0; i < numbers_of_categories; i++)
    {
        (function(i)
        {
            categories[i].addEventListener("click", function()
            {
                var url = 'category_page.html?' + 'category=' + i;
                window.location.href = url;
            })
        })(i);
    }
}