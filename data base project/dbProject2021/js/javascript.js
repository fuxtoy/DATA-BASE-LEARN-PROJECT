/*
[Main Script]
*/
var FixedTopStatus = true;
    
(function($){
    //判斷選單是否固定在頂端
    if ($('body').hasClass('fixed-top') === true)
        FixedTopStatus = true;
    else
        FixedTopStatus = false;
})(jQuery);

window.onload = function()
{   
    // 設定google search文字框內容
    /*
    var searchBox =  document.getElementById("gsc-i-id1");
    searchBox.placeholder="搜尋...";
    searchBox.title="請輸入搜尋關鍵字";    
    var searchBox =  document.getElementById("gsc-i-id2");
    searchBox.placeholder="搜尋...";
    searchBox.title="請輸入搜尋關鍵字";
    */
    $('input.gsc-input').attr('placeholder',"搜尋...");
    $('input.gsc-input').attr('title',"請輸入搜尋關鍵字");
}

//判斷選單是否折疊狀態
function CheckCollapseStatus(){
    if ($('nav').find('.navbar-toggler').css("display") == "none") //若navbar-toggler顯示時，表示選單為折疊狀態
        return false; //解析度較大
    else
        return true; //解析度較小
}

//判斷下拉選單是否超出視窗範圍
function CheckCollapseScope(dropdown_menu){
    var html_Height = $('html')[0].clientHeight; //瀏覽器高度
    var dropdown_menu_distance = dropdown_menu[0].getBoundingClientRect().top; //下拉選單相對瀏覽器上方距離    
    var dropdown_menu_height = dropdown_menu_distance + dropdown_menu.outerHeight(); //下拉選單相對瀏覽器上方距離＋下拉選單高度
    var object = dropdown_menu.closest('.dropdown').children('div').children('a:first');

    if (dropdown_menu_height > html_Height && dropdown_menu.hasClass('show') === true) //如果高度超出瀏覽器高度＆子選單為顯示狀態
    {
        if (dropdown_menu.closest('li').hasClass('nav-item') === false) //如果非第一層子選單，則調整子選單上下位置以利顯示完整選單
            //dropdown_menu.outerHeight() < html_Height && 
        {
            dropdown_menu.css('top',html_Height - dropdown_menu_height);
        }
        else
        {
            //var dropdown_menu_rate = 1 - ((dropdown_menu_height - html_Height + 15) / dropdown_menu.outerHeight());
            var dropdown_menu_rate = (html_Height - dropdown_menu_distance) / (dropdown_menu.outerHeight());            
            var dropdown_menu_link = dropdown_menu.children('li');
            var font_size = Number(dropdown_menu_link.css("font-size").replace("px",""));

            if (dropdown_menu_rate < 0.5)
            {
                var index = dropdown_menu.children('li').length;
                dropdown_menu_rate = ((html_Height - dropdown_menu_distance - 10) / index) / 2 / font_size;
            }

            dropdown_menu_link.children(":first-child").css("font-size", font_size * dropdown_menu_rate +  "px");
        }
    }
    else
    {
        dropdown_menu.children('li').children(":first-child").removeAttr("style");
    }
}


/*
var max_height;
//瀏覽器縮放時判斷
$(window).resize(function() {
    if ($('.navbar-collapse').hasClass('show'))
        CheckCollapseMaxHeight();
});

//判斷折疊下拉選單是否超出視窗範圍
function CheckCollapseMaxHeight(){
    var html_Height = $('html')[0].clientHeight; //瀏覽器高度
    Collapse_distance = $('.navbar-collapse.show')[0].getBoundingClientRect().top; //下拉選單相對瀏覽器上方距離    
    if (max_height == null)
        max_height = $('.navbar-collapse.show').css('max-height').replace('px','');
    if ((html_Height - Collapse_distance - 30) < max_height)
    {
        $('.navbar-collapse.show').css('max-height',html_Height - Collapse_distance - 30);
        var height = $('.navbar-collapse.show').css('max-height').replace('px','');
    }
    else
    {
        $('.navbar-collapse.show').css('max-height',max_height + "px");
    }
}
*/

//******************************************
//navbar collapse 點擊時折疊其他collapse-Start
//******************************************
var toggler_clickout = true; //避免重複點擊之flag
$(".navbar-toggler").on("click", function() {
    if (toggler_clickout){
        toggler_clickout = false;
        $(this).toggleClass("collapsed").siblings().removeClass("collapsed"); //collapsed 標示navbar-toggler已點擊
        $($(this).attr('data-target')).find('.show').removeClass('show');
        $($(this).attr('data-target')).find('.dropdown-menu:not(.show)').removeAttr("style");
        $('nav').find('.navbar-collapse.show').slideUp(300).removeClass('show'); //折疊展開之選單
        $($(".navbar-toggler.collapsed").attr("data-target")).slideDown(300).addClass("show"); //展開選單
        setTimeout(function(){
            $('nav').find('.navbar-collapse:not(.show)').removeAttr("style"); //移除slideUp所增加之style="display:none"，避免電腦版無法顯示
            toggler_clickout = true;
        },350);
    }
});

//****************************************
//navbar collapse 點擊時折疊其他collapse-End
//****************************************


//********************************
//navbar無摺疊時，自動跳出子選單-Start
//********************************

//滑鼠移上時
var double_change = false; //避免平板重複執行hover與click行為造成選單無法展開
$('.dropdown').on('mouseenter', function () {
    double_change = true;
    if (!CheckCollapseStatus() && $(this).hasClass("show") == false){ //若navbar-toggler顯示時，則不自動跳出子選單
        $(this).siblings().removeClass('show').find(".show").removeClass('show'); //關閉同層其他子選單
        $(this).addClass('show').children('.dropdown-menu').addClass('show'); //開啟移上之子選單

        if (FixedTopStatus)
            CheckCollapseScope($(this).children('.dropdown-menu'));
    }
    setTimeout(function(){
        double_change = false;
    },150);
})
.on('mouseleave', function () {
    if (!CheckCollapseStatus() && $(this).hasClass("show") == true){ //若navbar-toggler顯示時，則不自動收起子選單
        $(this).removeClass('show').find(".show").removeClass('show'); //關閉子選單
        $('nav').find('.dropdown-menu').removeAttr("style"); //移除navbar摺疊時，slide動畫所增加之style="display:xxxx"，避免折疊與不折疊切換時，顯示異常問題

        if (FixedTopStatus)
            CheckCollapseScope($(this).children('.dropdown-menu'));        
    }
});

//focus時
$('.main-navbar .navbar-nav a').on('focus', function (e) {
    //alert("focus");
    if (!CheckCollapseStatus() && $(this).hasClass("show") == false){ //若navbar-toggler顯示時，則不自動跳出子選單
        if($(this).closest('li').hasClass('dropdown')) //判斷是否有子選單
        {
            $(this).closest('li').addClass('show').siblings().removeClass('show').find(".show").removeClass('show'); //若有子選單則展開，並關閉其他子選單
            $(this).children('.dropdown-menu').addClass('show'); //開啟focus的子選單
        } 
        else
        {
            $(this).closest('li').siblings().removeClass('show').find(".show").removeClass('show'); //若有子選單則展開，並關閉其他子選單
        }
    }
});

//tab切換時
$('.main-navbar .navbar-nav a').on('keydown', function (event) {
    //alert("keydown");
    if (!CheckCollapseStatus() && $(this).hasClass("show") == false){ //若navbar-toggler顯示時，則不自動跳出子選單
        var keynum = event.key;
        if(keynum == 'Tab'){  //判斷是否按下tab鍵
            if (event.shiftKey) {    //判斷是否為組合鍵(也就是+shift鍵)
                //判斷是否為navbar第一層第一個項目
                if($(this).closest("li").is('.nav-item:first-child')){
                    $(this).closest('li').removeClass('show').find(".show").removeClass('show');
                }    
            } else {
                //判斷navbar上層所有項目是否都是該層最後一個項目 並且無子選單或子選單位展開
                if($(this).parents('li:not(:last-child)').length == 0 && $(this).closest("li").hasClass('show') != true){
                    $(this).closest('.nav-item').removeClass('show').find(".show").removeClass('show');
                }     
            }
        }
    }
});

//滾動時，自動收起選單
/*
$(window).scroll(function(){
    $('.main-navbar .navbar-nav').find(".show").removeClass('show');
});
*/
//***************************************
//navbar無摺疊時，滑鼠移上選單自動跳出子選單-End
//***************************************

//****************************
// navbar 點擊選單跳出子選單-Start
//****************************
$('.main-navbar .navbar-nav .dropdown > div > a').on('click', function (e) {
    //alert("click");
    if ($(this).attr("href") == "#" || $(this).hasClass("nav-link") == true) //判斷是否為子選單開關按鈕或為第一層選單(無障礙網頁)
    {
        if (CheckCollapseStatus()) //判斷navbar是否折疊
        {
            e.preventDefault();
            e.stopPropagation();
            $(this).closest('li').siblings().removeClass('show').children('.dropdown-menu.show').slideUp(300).removeClass('show').find('.dropdown.show').removeClass('show').children('.dropdown-menu.show').removeClass('show'); //關閉同層其他子選單

            $(this).closest('li').toggleClass('show').children('.dropdown-menu').slideToggle(300).toggleClass('show'); //開啟點擊之子選單

            setTimeout(function(){
                $('nav').find('.dropdown-menu:not(.show)').removeAttr("style"); //移除slideUp所增加之style="display:none"，避免電腦版無法顯示
            },350);
        }
        else
        {
            ////double_change為避免平板重複執行hover與click行為造成選單無法展開，所使用之參數
            if (double_change === false && ($(this).attr("href") == "#" || ($(this).hasClass("nav-link") == true && $(this).attr("href").substr(0,1) == "/")))
            {
                e.preventDefault();
                e.stopPropagation();

                $(this).closest('li').siblings().removeClass('show').find(".show").removeClass('show'); //關閉同層其他子選單
                $(this).closest('li').toggleClass('show').children('.dropdown-menu').toggleClass('show'); //toggle點擊之子選單
            }
            else if (double_change === true)
            {
                e.preventDefault();
                e.stopPropagation();                
            }
        }
    }
});

//***************************
// navbar 點擊選單跳出子選單-End
//***************************


var scroll_animate_time = 200; //捲軸滾動動畫時間
//**********************
//carousel 滑動動作-Start
//**********************
(function($){
    $('body').removeClass("nojs");
    $('.indicators li:first-child').addClass("active");

    var i = 1;
    $('.carousel').each(function() {
        $(this).attr('data-width', $(this).find('a')[0].getBoundingClientRect().width); //輪播顯示寬度
        $(this).attr('data-count', $(this).children('ul').children().length); //項目總數
        $(this).attr('data-indicator_num', 1); //現在畫面顯示的項目編號
        $(this).attr('id', 'carousel_' + i);
        i++;
    });
})(jQuery);


function Scroll_Left(e){
    var count = parseInt(e.attr('data-count'));
    var indicator_num = parseInt(e.attr('data-indicator_num'));

    if (indicator_num == 1)
        indicator_num = count;
    else
        indicator_num--;

    Scroll_To(e, indicator_num);
}

function Scroll_Right(e){
    var count = parseInt(e.attr('data-count'));
    var indicator_num = parseInt(e.attr('data-indicator_num'));

    if (indicator_num >= count)
        indicator_num = 1;
    else
        indicator_num++;

    Scroll_To(e, indicator_num);
}

function Scroll_To(e,indicator_num){
    var width = Number(e.attr('data-width'));
    
    e.closest('.carousel').find('.indicator').eq(indicator_num - 1).addClass("active").siblings().removeClass("active"); //切換indicator，eq為取得第N個元素(0為起始，，故需-1)

    e.attr('data-indicator_num', indicator_num);

    var scroll_pos = (indicator_num - 1) * width;
    
    e.children('ul').stop();
    e.children('ul').animate({scrollLeft: scroll_pos}, scroll_animate_time);
}
//********************
//carousel 滑動動作-End
//********************

//***************************
//carousel 左右鍵滑動按鈕-Start
//***************************
$(".carousel .control-prev").on("click", function() {
    var event = $(this).closest('.carousel');
    Scroll_Left(event);
    StopAutoScroll(event);
});
$(".carousel .control-next").on("click", function() {
    var event = $(this).closest('.carousel');
    Scroll_Right(event);
    StopAutoScroll(event);
});
//*************************
//carousel 左右鍵滑動按鈕-End
//*************************

//***************************
//carousel indicator按鈕-Start
//***************************

$(".carousel .indicator").on("click", function() {    
    var event = $(this).closest('.carousel');
    var index = event.find('.indicator').index(this) + 1; //計算focus為第幾個項目(0為起始，故需+1)

    Scroll_To(event, index);
    StopAutoScroll(event);
});
//*************************
//carousel indicator按鈕-End
//*************************

//******************************
//carousel 自動調整至正確位置-Start
//******************************

var resize_timer = false; //判斷resize是否進行中
//瀏覽器縮放時判斷
$(window).on('resize', function () {
    if (resize_timer)
        clearTimeout(resize_timer);

    //避免縮放中執行造成異常
    resize_timer = setTimeout(function(){
        $('.carousel').each(function() {
            $(this).attr('data-width', $(this).find('a')[0].getBoundingClientRect().width); //輪播顯示寬度

            Scroll_To($(this), $(this).attr('data-indicator_num'));

            timer = setTimeout(function(){
                resize_timer = false;  //resize已停止
            }, scroll_animate_time * 2.5);
        });
    }, scroll_animate_time * 2.5);
});

var scroll_timer = [];
//滑動時，檢查圖片位置是否正確
$('.carousel ul').on('scroll', function () {
    //因resize中會也產生scroll的行為，為避免相衝，故在resize時，不進行carousel位置檢查
    if (!resize_timer){
        var scroll_id = $(this).closest('.carousel').attr('id');
        var event = $(this).closest('.carousel');

        //避免滑動重複執行造成異常
        if (scroll_timer[scroll_id])
            clearTimeout(scroll_timer[scroll_id]);

        scroll_timer[scroll_id] = setTimeout(function(){
            CheckScrollPos(event);
        }, scroll_animate_time * 2.5);
    }
});

var scroll_counter = 0;
//檢查圖片位置是否正確
function CheckScrollPos(e){
    var width = Number(e.attr('data-width'));
    var count = parseInt(e.attr('data-count'));
    var indicator_num = parseInt(e.attr('data-indicator_num'));
    var scroll_pos = (indicator_num - 1) * width;
    
    var afterScrollLeft = e.children('ul').scrollLeft();
    
    if (afterScrollLeft > Math.ceil(scroll_pos) + 1 * (count - 1)) //無條件進位，因scrollLeft只會取整數，故scroll_pos須先進行處理，並需加上寬度有小數點時的誤差
    {
        var no = Math.ceil(afterScrollLeft/width) + 1; //無條件進位
        Scroll_To(e, no);
    }
    else if (afterScrollLeft < Math.floor(scroll_pos) - 1 * (count - 1)) //無條件捨去，因scrollLeft只會取整數，故scroll_pos須先進行處理，並需扣除寬度有小數點時的誤差
    {
        var no = Math.floor(afterScrollLeft/width) + 1; //無條件捨去
        Scroll_To(e, no);
    }
}

$('.carousel ul li a').on('focus', function () {
    var event = $(this).closest('.carousel');
    var index = event.children('ul').children('li').children('a').index(this) + 1; //計算focus為第幾個項目(0為起始，故需+1)

    StopAutoScroll(event);

    Scroll_To(event, index);
});
//****************************
//carousel 自動調整至正確位置-End
//****************************

//*********************
//carousel自動滑動-Start
//*********************
var carousel_autoscroll_timer = [];
var Interval_timer = 4000; //自動滑動時間

//自動向右滑動
(function($){
    $('.carousel').each(function() {
        var scroll_id = $(this).closest('.carousel').attr('id'); 

        if (!carousel_autoscroll_timer[scroll_id] && $(this).attr("autoscroll") == "true")
        carousel_autoscroll_timer[scroll_id] = setInterval("Scroll_Right($('#" + scroll_id + "'))", Interval_timer);
    });
})(jQuery);

$('.carousel').on('mouseover touchstart', function () {
    var scroll_id = $(this).closest('.carousel').attr('id'); 
    clearInterval(carousel_autoscroll_timer[scroll_id]);
    carousel_autoscroll_timer[scroll_id] = false;
});

$('.carousel').on('mouseout', function () {
    var scroll_id = $(this).closest('.carousel').attr('id'); 
    if (!carousel_autoscroll_timer[scroll_id] && $(this).attr("autoscroll") == "true") //檢查是否已有其他排程
    carousel_autoscroll_timer[scroll_id] = setInterval("Scroll_Right($('#" + scroll_id + "'))", Interval_timer);
});

function StopAutoScroll(event){
    if (event.attr("autoscroll") == 'true')
    {
        var scroll_id = event.attr('id'); 

        clearInterval(carousel_autoscroll_timer[scroll_id]);
        carousel_autoscroll_timer[scroll_id] = false;
        event.attr("autoscroll", "stop");
    }
}
//*******************
//carousel自動滑動-End
//*******************


//******************************
//設定第一個tab(頁籤)為active-Start
//******************************
(function($){
    $('div[role=tablist] > ul > li:first-child').addClass("active"); //第一個tablist加上active
    $('.tab:not(.list) .tab-content .tab.sub:not(:first-child)').removeClass("active"); //在非list的樣式下，非第一個sub tab 移除 active
})(jQuery);
//****************************
//設定第一個tab(頁籤)為active-End
//****************************

//**********************************
//按下tab(頁籤)切換至正確tabpanel-Start
//**********************************
$('div[role=tablist] > ul li a').on('focus', function (event) {
    tab_change($(this));
});
$('div[role=tablist] > ul > li > a').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();

    tab_change($(this));
});

function tab_change(e){
    e.parent().addClass("active").siblings().removeClass("active");
    
    var tablist_id = e.closest('[role=tablist]').attr("id");
    var index = $('#' + tablist_id +' li a').index(e); //計算focus為第幾個項目，index由0開始
    $('#' + tablist_id + '_tabpanel').children('.tab').eq(index).addClass("active").siblings().removeClass("active");
}
//********************************
//按下tab(頁籤)切換至正確tabpanel-End
//********************************

//**************************
//調整tab(頁籤)的tab順序-Start
//**************************

//於tablist按下tab鍵時，跳至相對應tabpanel內容
$('div[role=tablist] > ul li a').on('keydown', function (event) {
    var keynum = event.key;
    if(keynum == 'Tab' && !(event.shiftKey)){ 
        event.preventDefault();
        var tablist_id = $(this).closest('[role=tablist]').attr("id");
        var index = $('#' + tablist_id +' li').index($(this).closest('li')); //計算focus為第幾個項目
        $('#' + tablist_id + '_tabpanel').children('.tab').eq(index).children('.tab-content').children('ul').children("li:first").children('a').trigger('focus');
    }
});

//於tabpanel內容按下 shift+tab鍵 或 tab鍵 時，跳至前或後一個tablist
$('ul[role=tabpanel] li a').on('keydown', function (event) {
    var keynum = event.key;
    //依據按下 shift+tab鍵 或 tab鍵 執行對應行為
    if(keynum == 'Tab'){  //判斷是否按下tab鍵
        if (event.shiftKey) {    //判斷是否為組合鍵(也就是+shift鍵)
            //判斷是否為該tabpanel第一個連結
            if($(this).closest("li").is(':first-child')){
                event.preventDefault();
                var tabpanel_id = $(this).closest(".tab.sub").parent().attr("id");
                var index = $('#' + tabpanel_id +' ul[role=tabpanel]').index($(this).closest('ul')); //計算focus為第幾個項目
                $('#' + tabpanel_id.replace('_tabpanel','')).children('ul').children('li').eq(index).children('a').trigger('focus');
            }    
        } else {
            //判斷是否為該tabpanel最後一個連結 與 該tabpanel是否為最後一個tabpanel
            if($(this).closest("li").is(':last-child') && !($(this).closest(".tab.sub").is(':last-child'))){
                event.preventDefault();
                var tabpanel_id = $(this).closest(".tab.sub").parent().attr("id");
                var index = $('#' + tabpanel_id +' ul[role=tabpanel]').index($(this).closest('ul')); //計算focus為第幾個項目
                $('#' + tabpanel_id.replace('_tabpanel','')).children('ul').children('li').eq(index+1).children('a').trigger('focus');
            }     
        }
    }
});
//************************
//調整tab(頁籤)的tab順序-End
//************************


//*****************************
//回頂端 & navbar 精簡與透明-Start
//*****************************
//卷軸滑動時判斷
$(window).on('scroll', function () {
    CheckNavbarPos();
});
(function($){
    CheckNavbarPos();
})(jQuery);

//20211112 因 nav 會縮放，須確保焦點在網頁第一個項目時，能完整呈現 nav
$('.tocontent').on('focus', function () {
    if ($('html, body').scrollTop() != 0 && !CheckCollapseStatus() && FixedTopStatus){
        $('body').addClass('top');
        $('body').removeClass('untop');
        ToTop();
    }
});

//20211112 因 nav 為固定，使用快速鍵跳到內容區時，須確保內容不會被 nav 擋到
$("a[name='C']").on('focus', function () {
    ToTop();
});
function CheckNavbarPos(){
    var view_height = $('html')[0].clientHeight; //可視寬度
    var scrollHeight = $("body")[0].scrollHeight; //捲軸高度
    var scrollTop = $(window).scrollTop(); //捲軸位置

    //若高度<=135則不顯示，untop為banner縮小用
    if ((scrollHeight - view_height) < 135)
    {
        $("#ToTopButton").addClass('hidden');
        $("#ToBottomButton").addClass('hidden');

        if (FixedTopStatus)
        {
            $('body').addClass('top');
            $('body').removeClass('untop');
            /*
            if (scrollTop <= 0)
                setTimeout('CheckNavbarHeight();',350);
            */
        }
    }
    else if(scrollTop <= 135) 
    {
        $("#ToTopButton").addClass('hidden');
        $("#ToBottomButton").removeClass('hidden');

        if (FixedTopStatus)
        {
            $('body').addClass('top');
            $('body').removeClass('untop');
        }
    }
    else if ((scrollTop + view_height) >= scrollHeight - 135)
    {
        $("#ToTopButton").removeClass('hidden');
        $("#ToBottomButton").addClass('hidden');

        if (FixedTopStatus)
        {
            $('body').removeClass('top');
            $('body').addClass('untop');
        }
    }
    else 
    {
        $("#ToTopButton").removeClass('hidden');
        $("#ToBottomButton").removeClass('hidden');
        
        if (FixedTopStatus)
        {
            $('body').removeClass('top');
            $('body').addClass('untop');
        }
    }
}

var scroll_speed = 500;
function ToTopButton(){
    ToTop();    
    setTimeout("$('a[accesskey=U]').trigger('focus');", scroll_speed);
}
function ToBottomButton(){
    ToBottom();
    setTimeout("$('a[accesskey=B]').trigger('focus');", scroll_speed);    
}

function ToTop(){
    $("html, body").animate({scrollTop: 0}, scroll_speed);
}
function ToBottom(){
    var scrollHeight = $("body")[0].scrollHeight; //捲軸高度
    $("html, body").animate({scrollTop: scrollHeight}, scroll_speed);    
}

//***************************
//回頂端 & navbar 精簡與透明-End
//***************************


//******************************
//判斷navbar與carousel的距離-Start
//******************************
//20190923 nav過多變兩行時會自動調整nav padding-top，但為運作順暢移除此功能 by 俊盛
/*
//進入網頁時判斷
(function($){
    $("body").ready(function(){
        if (FixedTopStatus)
            CheckNavbarHeight();
    });
})(jQuery);

//瀏覽器縮放時判斷
$(window).resize(function() {
    if (FixedTopStatus)
        CheckNavbarHeight();
});

function CheckNavbarHeight(){
    setTimeout(function(){
        if (!CheckCollapseStatus())
            var height = $("nav").height() + 15;
        else
            var height = $("nav .navbar-toggle").height() + 9;
        //var adjust = 15 / ( $('body').css('font-size').replace('px','') / 16 ); //須除以body font-size增加之比例
        if ($('body').css('padding-top') != height)
            $('body').css('padding-top',height);
    },200);
}
*/
//****************************
//判斷navbar與carousel的距離-End
//****************************


//****************************
//判斷tab是否該呈現左右箭頭-Start
//****************************
//進入網頁時判斷
(function($){
    CheckTabWidth();
})(jQuery);

//瀏覽器縮放時判斷
$(window).on('resize', function() {
    CheckTabWidth();
});

//卷軸滑動時判斷
$('div[role=tablist] ul').on('scroll', function(){
    CheckTabWidth($(this));    
});

function CheckTabWidth(e){
    var e = e || $("div[role=tablist] ul");

    e.each(function(){
        var view_width = Math.round($(this).width()); //可視寬度
        var scroll_pos = $(this).scrollLeft(); //捲軸位置
        var scrollWidth = $(this)[0].scrollWidth; //捲軸整體寬度

        //若tab可視寬度=捲軸寬度，則不顯示左右箭頭
        if (view_width == scrollWidth)
        {
            $(this).closest("[role=tablist]").removeClass('left');
            $(this).closest("[role=tablist]").removeClass('right');
        }
        else if (scroll_pos < scrollWidth)
        {
            //若捲軸位置<=0，則不顯示左箭頭
            if (scroll_pos <= 0)
                $(this).closest("[role=tablist]").removeClass('left');
            else
                $(this).closest("[role=tablist]").addClass('left');
            //若捲軸位置+可視寬度>捲軸寬度，則不顯示右箭頭
            if ((view_width + scroll_pos) >= scrollWidth)
                $(this).closest("[role=tablist]").removeClass('right');
            else
                $(this).closest("[role=tablist]").addClass('right');
        }
    });
}
//**************************
//判斷tab是否該呈現左右箭頭-End
//**************************


//*******************************
//超連結為#之項目，不執行預設行為-Start
//*******************************
$("a[href='#']").on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
});
//******************************
//超連結為#之項目，不執行預設行為-End
//******************************


//**********************
//點擊連結記錄相關資訊-Start
//**********************

//傳送至google analytics
$('a').on('click', function () {
    var page_title = $('title').html();

    if (page_title == "國立臺灣海洋大學")
        page_title = "首頁";
    else
        page_title = page_title.replace(" - 國立臺灣海洋大學", "");

    var title = $(this).attr("title");
    var url = $(this).attr("href");

    var main = $(this).parents('main').attr("role");

    if(typeof(main) != "undefined") //判斷是否為內容區
    {
        title = title + " (" + page_title + ")";
    }
    
    gtag('event', 'click', {
        'event_category': title,
        'event_label': page_title,
        'transport_type': 'beacon'
    });
});

$('．a').on('click', function (e) {
    //e.preventDefault();
    //e.stopPropagation();

    //console.log(location.href + " " + $(this).attr("href") + " " + $(this).attr("title"));
    $.ajax({
        type : "POST",
        url:"/non_csrf/clicklog",
        data: {
            "page_title": $('title').html(),
            "page_url": window.location.pathname,
            "link_title": $(this).attr("title"),
            "link_url": $(this).attr("href")
        },
        dataType:'json',
        //當訊息傳送給後端處理之後，處理完成必須回傳一個成功訊息，接收到成功訊息才代表完成記錄
        //如果成功收到回傳訊息後的處理動作
        success:function(data){
                //alert(data['msg']);
        },
        //如果傳送(或接收)失敗的處理動作
        error:function(xhr, ajaxOptions, thrownError){
            alert(xhr.responseText);
        },
        beforeSend: function() {
            // 發送中                
        }
    }); 
});
//*********************
//點擊連結記錄相關資訊-End
//*********************