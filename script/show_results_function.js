// 自定义添加元素的函数
function createNewElement(parentNode, TagName, className)
{
    var element = document.createElement(TagName);
    if(className)
    {
        element.className = className;
    }
    parentNode.appendChild(element);
}

// 显示初始的页码栏
function showInitialPageBar(totalpages)
{
    // 添加页码
    if (totalpages <= 5) // 页面数小于等于5时，所有页码均显示
    {
        for (var i = 0; i < totalpages; i++)
        {
            // 添加页数元素
            var pagecontrol = document.getElementsByClassName("pagebar")[0];
            var nextpage = document.getElementById("next_page");
            var page_temp = document.createElement("div");
            page_temp.className = "page";
            pagecontrol.insertBefore(page_temp, nextpage);
    
            // 添加页码
            var page = document.getElementsByClassName("page")[i];
            page.innerHTML = i + 1;
        }
    }
    else // 页码数大于5时，仅显示部分页码
    {
        for (var i = 0; i < 5; i++)
        {
            // 添加页数元素
            var pagecontrol = document.getElementsByClassName("pagebar")[0];
            var nextpage = document.getElementById("next_page");
            var page_temp = document.createElement("div");
            page_temp.className = "page";
            pagecontrol.insertBefore(page_temp, nextpage);
            
            // 添加页码
            var page = document.getElementsByClassName("page")[i];
            if (i < 3)
            {
                page.innerHTML = i + 1;
            }
            else if (i == 3)
            {
                page.innerHTML = "···";
            }
            else if (i == 4)
            {
                page.innerHTML = totalpages;
            }
        }
    }

    // 添加说明文本“共 x 页”
    var total = document.getElementsByClassName("total")[0];
    total.innerHTML = "共 " + totalpages + " 页";
}

// 页面切换功能
function readyToChangePage(books, totalbooks, totalpages)
{
    var pages = document.getElementsByClassName("page");

    // 初始状态
    pages[0].id = "selected";
    showCertainPage(books, totalbooks, 1);

    // 上一页
    var lastpage = document.getElementById("last_page");
    lastpage.onclick = function()
    {
        if (totalpages <= 5) // 页面数小于等于5时
        {
            for (var i = 0; i < totalpages; i++)
            {
                if (pages[i].id == "selected" && i != 0)
                {
                    pages[i].id = " ";
                    pages[i - 1].id = "selected";
                    showCertainPage(books, totalbooks, i);
                    break;
                }
            }
        }
        else // 页面数大于5时
        {
            if (pages[1].id == "selected") // 第二页（左二）跳转至第一页（左一）
            {
                pages[1].id = " ";
                pages[0].id = "selected";
                showCertainPage(books, totalbooks, 1);
            }
            else if (pages[2].id == "selected" && pages[2].innerHTML == 3) // 第三页（中间）跳转至第二页（左二）
            {
                pages[2].id = " ";
                pages[1].id = "selected";
                showCertainPage(books, totalbooks, 2);
            }
            else if (pages[2].id == "selected" && pages[2].innerHTML == 4) // 第四页（中间）跳转至第三页（中间），样式变化
            {
                pages[1].innerHTML = 2;
                pages[2].innerHTML = 3;
                pages[3].innerHTML = "···";
                showCertainPage(books, totalbooks, 3);
            }
            else if (pages[2].id == "selected" && pages[2].innerHTML > 4 && pages[2].innerHTML < totalpages - 2) // 第五页至倒数第四页的页面跳转至上一页
            {
                pages[2].innerHTML = parseInt(pages[2].innerHTML) - 1;;
                showCertainPage(books, totalbooks, pages[2].innerHTML, totalpages);
            }
            else if (pages[2].id == "selected" && pages[2].innerHTML == totalpages - 2) // 倒数第三页（中间）跳转至倒数第四页（中间），样式变化
            {
                pages[2].innerHTML = totalpages - 3;
                pages[3].innerHTML = "···";
                showCertainPage(books, totalbooks, totalpages - 3);
            }
            else if (pages[3].id== "selected") // 倒数第二页（右二）跳转至倒数第三页（中间）
            {
                pages[3].id = " ";
                pages[2].id = "selected";
                showCertainPage(books, totalbooks, totalpages - 2);
            }
            else if (pages[4].id== "selected") // 最后一页（右一）跳转至倒数第二页（右二）
            {
                pages[4].id = " ";
                pages[3].id = "selected";
                showCertainPage(books, totalbooks, totalpages - 1);
            }
        }
    };
    lastpage.onmouseover = function()
    {
        lastpage.style.cursor = "pointer";
    };

    // 下一页
    var nextpage = document.getElementById("next_page");
    nextpage.onclick = function()
    {
        if (totalpages <= 5) // 页面数小于等于5时
        {
            for (var i = 0; i < totalpages; i++)
            {
                if (pages[i].id == "selected" && i != totalpages - 1)
                {
                    pages[i].id = " ";
                    pages[i + 1].id = "selected";
                    showCertainPage(books, totalbooks, i + 2)
                    break;
                }
            }
        }
        else // 页面数大于5时
        {
            if (pages[0].id == "selected") // 第一页（左一）跳转至第二页（左二）
            {
                pages[0].id = " ";
                pages[1].id = "selected";
                showCertainPage(books, totalbooks, 2);
            }
            else if (pages[1].id == "selected") // 第二页（左二）跳转至第三页（中间）
            {
                pages[1].id = " ";
                pages[2].id = "selected";
                showCertainPage(books, totalbooks, 3);
            }
            else if (pages[2].id == "selected" && pages[2].innerHTML == 3) // 第三页（中间）跳转至第四页（中间），样式变化
            {
                pages[1].innerHTML = "···";
                pages[2].innerHTML = 4;
                if (totalpages == 6)
                {
                    pages[3].innerHTML = 5;
                }
                showCertainPage(books, totalbooks, 4);
            }
            else if (pages[2].id == "selected" && pages[2].innerHTML > 3 && pages[2].innerHTML < totalpages - 3) // 第五页至倒数第四页的页面跳转至上一页
            {
                pages[2].innerHTML = parseInt(pages[2].innerHTML) + 1;
                showCertainPage(books, totalbooks, pages[2].innerHTML);
            }
            else if (pages[2].id == "selected" && pages[2].innerHTML == totalpages - 3) // 倒数第四页（中间）跳转至倒数第三页（中间），样式变化
            {
                pages[2].innerHTML = totalpages - 2;
                pages[3].innerHTML = totalpages - 1;
                showCertainPage(books, totalbooks, totalpages - 2);
            }
            else if (pages[2].id== "selected" && pages[2].innerHTML == totalpages - 2) // 倒数第三页（中间）跳转至倒数第二页（右二）
            {
                pages[2].id = " ";
                pages[3].id = "selected";
                if (pages[2].innerHTML == 4)
                {
                    pages[3].innerHTML = 5;
                }
                showCertainPage(books, totalbooks, totalpages - 1);
            }
            else if (pages[3].id== "selected") // 倒数第二页（右二）跳转至最后一页（右一）
            {
                pages[3].id = " ";
                pages[4].id = "selected";
                showCertainPage(books, totalbooks, totalpages);
            }
        }
    };
    nextpage.onmouseover = function()
    {
        nextpage.style.cursor = "pointer";
    };

    // 页码跳转
    if (totalpages <= 5)
    {
        total = totalpages;
    }
    else
    {
        total = 5;
    }
    for (var i = 0; i < total; i++)
    {
        (function(i)
        {
            pages[i].addEventListener("click", function()
            {
                if (pages[i].innerHTML == "···")
                {
                    return false;
                }
                for (var j = 0; j < total; j++)
                {
                    if (pages[j].id == "selected" || pages[j].id == "temp")
                    {
                        if (j == i)
                        {
                            return false;
                        }
                        pages[j].id = " ";
                    }
                }
                pages[i].id = "selected";
                showCertainPage(books, totalbooks, pages[i].innerHTML);
                if (i == 0 && totalpages > 5) // 页面数大于5且点击第一页时
                {
                    for (var k = 0; k < 5; k++)
                    {
                        if (k < 3)
                        {
                            pages[k].innerHTML = k + 1;
                        }
                        else if (k == 3)
                        {
                            pages[k].innerHTML = "···";
                        }
                        else if (k == 4)
                        {
                            pages[k].innerHTML = totalpages;
                        }
                    }
                }
                if (i == 4 && totalpages > 5) // 页面数大于5且点击最后一页时
                {
                    for (var k = 0; k < 5; k++)
                    {
                        if (k == 0)
                        {
                            pages[k].innerHTML = 1;
                        }
                        else if (k == 1)
                        {
                            pages[k].innerHTML = "···";
                        }
                        else if (k > 1)
                        {
                            pages[k].innerHTML = totalpages + k - 4;
                        }
                    }
                }
            })
            // 指针移动到页码上方时
            pages[i].addEventListener("mouseover", function()
            {
                if (pages[i].innerHTML == "···")
                {
                    return false;
                }
                for (var j = 0; j < totalpages; j++)
                {
                    if (pages[j].id == "selected" && j != i)
                    {
                        pages[j].id = "temp";
                        pages[i].id = "hover";
                        pages[i].style.cursor = "pointer";
                    }
                }
            })
            // 指针离开页码上方时
            pages[i].addEventListener("mouseout", function()
            {
                if (pages[i].innerHTML == "···")
                {
                    return false;
                }
                if (pages[i].innerHTML == "···")
                {
                    return false;
                }
                for (var j = 0; j < total; j++)
                {
                    if (pages[j].id == "temp" && j != i)
                    {
                        pages[j].id = "selected";
                        pages[i].id = " ";
                    }
                }
            })
        })(i);
    }
}

// 显示具体页面
function showCertainPage(books, totalbooks, page)
{
    var result = document.getElementsByClassName("result")[0];
    var wrap = result.getElementsByClassName("books-wrapper")[0]
    if (wrap.getElementsByClassName("books")[0])
    {
        wrap.removeChild(wrap.getElementsByClassName("books")[0]);
    }
    createNewElement(wrap, "div", "books");
    var wrapper = document.getElementsByClassName("books")[0];
    if (document.getElementById("searchpage-books-wrapper"))
    {
        wrapper.id = "searchpage-books";
    }
    else if (document.getElementById("categorypage-books-wrapper"))
    {
        wrapper.id = "categorypage-books";
    }
    

    for (var i = 0; i < 8; i++)
    {
        // 添加外层元素
        createNewElement(wrapper, "div", "book");

        if (8 * (page - 1) + i < totalbooks)
        {
            // 添加封面元素
            var book = document.getElementsByClassName("book")[i];
            createNewElement(book, "div", "cover");
            // 添加封面
            var cover = document.getElementsByClassName("cover")[i];
            var url = books[8 * (page - 1) + i].cover.split(")")[0];
            cover.style.backgroundImage = "url" + "(" + url + ")";    

            // 添加评分元素
            createNewElement(book, "div", "score");
            // 添加评分
            var stars = document.getElementsByClassName("score")[i];
            var score = books[8 * (page - 1) + i].score;
            for (var j = 0; j < score; j++)
            {
                createNewElement(stars, "img");
                stars.getElementsByTagName("img")[j].src = "image/black_star.png";
            }
            for (var j = score; j < 5; j++)
            {
                createNewElement(stars, "img");
                stars.getElementsByTagName("img")[j].src = "image/white_star.png";
            }

            // 添加标题元素
            createNewElement(book, "div", "title");
            // 添加标题
            var title = document.getElementsByClassName("title")[i];
            var title_text = books[8 * (page - 1) + i].title;
            title.innerHTML = title_text;

            // 添加作者元素
            createNewElement(book, "div", "author");
            // 添加作者
            var author = document.getElementsByClassName("author")[i];
            var author_text = books[8 * (page - 1) + i].author;
            author.innerHTML = author_text;

            // 添加装饰线元素
            createNewElement(book, "div", "decorationline");
            // 添加装饰线
            var decorationline = document.getElementsByClassName("decorationline")[i];
            createNewElement(decorationline, "img");
            decorationline.getElementsByTagName("img")[0].src = "image/search_page/search_page_decoration_line.png";

            // 添加点击封面/盒子弹出详情页事件
            (function(i)
            {
                book.addEventListener("click", function()
                {
                    showDetail(books[8 * (page - 1) + i]);
                });
            })(i);
        }
    }
}

// 显示详情页
function showDetail(info)
{
    // 显示弹窗
    var detailPage = document.getElementById("detailpage-wrapper");
    detailPage.style.display = "block";
    
    // 添加封面
    var cover = document.getElementById("detail-cover");
    var image = info.cover.split(")")[0];
    cover.style.backgroundImage = "url" + "(" + image + ")"; 

    // 添加书名
    var title = document.getElementById("detail-title");
    var title_text = info.title;
    title.innerHTML = title_text;

    // 添加作者
    var author = document.getElementById("detail-author");
    var author_text = info.author;
    author.innerHTML = author_text;

    // 添加出版社
    var publisher = document.getElementById("detail-publisher");
    var publisher_text = info.publish;
    publisher.innerHTML = publisher_text;

    // 添加出版时间
    var publicationdate = document.getElementById("detail-publicationdate");
    var publicationdate_text = info.publishDate;
    publicationdate.innerHTML = publicationdate_text;

    // 添加图书馆馆藏信息
    // 数目
    var total = document.getElementById("detail-total");
    var total_text = info.library[0].total;
    total.innerHTML = total_text + "本";
    // 位置
    var position = document.getElementById("detail-position");
    var position_text = info.library[0].position;
    position.innerHTML = position_text;

    // 添加阅读类社群网站链接
    // 豆瓣
    var douban = document.getElementById("detail-douban");
    var douban_url = info.bookUrl[0].doubanUrl;
    douban.href = douban_url;
    // 知乎
    var zhihu = document.getElementById("detail-zhihu");
    var zhihu_url = info.bookUrl[0].zhihuUrl;
    zhihu.href = zhihu_url;

    // 添加购买链接
    // 京东
    var jingdong = document.getElementById("detail-jingdong");
    var jingdong_url = info.buyUrl[0].jDUrl;
    jingdong.href = jingdong_url;
    // 当当
    var dangdang = document.getElementById("detail-dangdang");
    var dangdang_url = info.buyUrl[0].DangUrl;
    dangdang.href = dangdang_url;
    // 亚马逊
    var amazon = document.getElementById("detail-amazon");
    var amazon_url = info.buyUrl[0].AmazonUrl;
    amazon.href = amazon_url;

    // 添加作者介绍
    var authorintro = document.getElementById("detail-authorintro");
    var authorintro_text = info.ahthorIntro;
    authorintro.innerHTML = authorintro_text;

    // 添加书籍介绍
    var bookintro = document.getElementById("detail-bookintro");
    var bookintro_text = info.bookIntro;
    bookintro.innerHTML = bookintro_text;

    // 添加关闭按钮事件
    var button = document.getElementById("detailpage-closebutton");
    var button_icon = document.getElementById("detailpage-closebutton-icon");
    button.addEventListener("click", function()
    {
        detailPage.style.display = "none";
    });
    button_icon.addEventListener("click", function()
    {
        detailPage.style.display = "none";
    });
}

function showBooks(books)
{
    // 书本总数
    var numbers_of_books = books.length;
    // 页面总数
    if (numbers_of_books % 8 == 0)
    {
        var numbers_of_pages = numbers_of_books / 8;
    }
    else
    {
        var numbers_of_pages = parseInt(numbers_of_books / 8) + 1; // 向上取整
    }

    showInitialPageBar(numbers_of_pages);
    readyToChangePage(books, numbers_of_books, numbers_of_pages);
}

// 显示具体分类的书本
function readyToChangeCategory(bookclass)
{
    var categories = document.getElementsByClassName("category");
    var numbers_of_categories = bookclass.length;

    for (var i = 0; i < numbers_of_categories; i++)
    {
        (function(i)
        {
            categories[i].addEventListener("click", function()
            {
                for (var j = 0; j < numbers_of_categories; j++)
                {
                    if (categories[j].id == "selectedcategory" || categories[j].id == "tempcategory")
                    {
                        if (j == i)
                        {
                            return false;
                        }
                        categories[j].id = " ";
                    }
                }
                categories[i].id = "selectedcategory";
                              
                var wrap = document.getElementsByClassName("books-wrapper")[0]
                if (wrap.getElementsByClassName("books")[0])
                {
                    wrap.removeChild(wrap.getElementsByClassName("books")[0]);
                }
                var pagebar = document.getElementsByClassName("pagebar")[0];
                var page = document.getElementsByClassName("page");
                var length = page.length;
                var total = document.getElementsByClassName("total")[0];
                for (var k = 0; k < length; k++)
                {
                    if (page[0])
                    {
                        pagebar.removeChild(page[0]);
                    }
                }
                total.innerHTML = " ";

                showBooks(bookclass[i].bookInfo);
            })
            // 指针移动到某一分类上方时
            categories[i].addEventListener("mouseover", function()
            {
                for (var j = 0; j < numbers_of_categories; j++)
                {
                    if (categories[j].id == "selectedcategory" && j != i)
                    {
                        categories[j].id = "tempcategory";
                        categories[i].id = "hovercategory";
                        categories[i].style.cursor = "pointer";
                    }
                }
            })
            // 指针离开某一分类上方时
            categories[i].addEventListener("mouseout", function()
            {
                for (var j = 0; j < total; j++)
                {
                    if (categories[j].id == "tempcategory" && j != i)
                    {
                        categories[j].id = "selectedcategory";
                        categories[i].id = " ";
                    }
                }
            })
        })(i);
    }
}

// 搜索页
function readyToShowBooksOnSearchPage()
{
    var search_content = window.location.search.substr(1).split("search=")[1];
    $(document).ready(function()
    {
        $.ajax(
            {
                url: "http://vtmer.cn/search" + "=" + search_content,
                dataType: "json",
                async: true,
                type: "GET",
                success: function(data)
                {
                    var info = data.bookclass[0].bookInfo;
                    showBooks(info);
                }
            }
        )
    })
}

// 分类页
function readyToShowBooksOnCategoryPage()
{
    var category = window.location.search.substr(1).split("category=")[1];
    $(document).ready(function()
    {
        $.ajax(
            {
                url: "http://vtmer.cn/class" + "=" + category,
                dataType: "json",
                async: true,
                type: "GET",
                success: function(data)
                {                   
                    var bookclass = data.bookclass;
                    if (category)
                    {
                        var info = bookclass[category].bookInfo;
                        var selected = document.getElementsByClassName("category")[category];
                    }
                    else
                    {
                        var info = bookclass[0].bookInfo;
                        var selected = document.getElementsByClassName("category")[0];
                    } 

                    selected.id = "selectedcategory";
                    showBooks(info);
                    readyToChangeCategory(bookclass);
                }
            }
        )
    })
}

// Mock.js随机数据 
// 搜索页
Mock.mock(/http:\/\/vtmer\.cn\/search/, {
    // 书的大分类
    'bookclass': [{
        // 书的详情
        'bookInfo|20-80': [{
            // 书名
            title: '@title(1,5)',
            // 作者
            author: '@name()',
            // 出版社
            publish: '@region()出版社',
            // 出版时间
            publishDate: '@date(yyyy-MM-dd)',
            // 图书馆详情
            library: [{
                // 数目
                total: '@natural(0, 100)',
                // 位置
                position: '@natural(2, 7)楼@natural(1,100)架@natural(0, 100)'
            }],
            // 书本链接
            bookUrl: [{
                doubanUrl: '@url()',
                zhihuUrl: '@url()'
            }],
            // 书本购买链接
            buyUrl:[{
                jDUrl: '@url()',
                DangUrl: '@url()',
                AmazonUrl: '@url()'
            }],
            // 作者介绍
            ahthorIntro: '@paragraph(3)',
            // 书本介绍
            bookIntro: '@paragraph(5)',
            // 书本封面链接
            cover: '@image(200x280,@color(),png)',
            // 评分
            score: '@natural(0, 5)'
        }]
    }]
});
// 分类页
Mock.mock(/http:\/\/vtmer\.cn\/class/, {
        // 书的大分类
        'bookclass|4': [{
            // 书的详情
            'bookInfo|20-80': [{
                // 书名
                title: '@title(1,5)',
                // 作者
                author: '@name()',
                // 出版社
                publish: '@region()出版社',
                // 出版时间
                publishDate: '@date(yyyy-MM-dd)',
                // 图书馆详情
                library: [{
                    // 数目
                    total: '@natural(0, 100)',
                    // 位置
                    position: '@natural(2, 7)楼@natural(1,100)架@natural(0, 100)'
                }],
                // 书本链接
                bookUrl: [{
                    doubanUrl: '@url()',
                    zhihuUrl: '@url()'
                }],
                // 书本购买链接
                buyUrl: [{
                    jDUrl: '@url()',
                    DangUrl: '@url()',
                    AmazonUrl: '@url()'
                }],
                // 作者介绍
                ahthorIntro: '@paragraph(3)',
                // 书本介绍
                bookIntro: '@paragraph(5)',
                // 书本封面链接
                cover: '@image(200x280,@color(),png)',
                // 评分
                score: '@natural(0, 5)'
            }]
        }]
    });