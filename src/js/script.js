/* intro アニメーション */

$(window).on('load',function(){
    $("#transition_logo").delay(1200).fadeOut('slow');//ロゴを1.2秒でフェードアウトする記述
    
    //=====ここからローディングエリア（splashエリア）を1.5秒でフェードアウトした後に動かしたいJSをまとめる
    $("#transition").delay(1500).fadeOut('slow',function(){//ローディングエリア（splashエリア）を1.5秒でフェードアウトする記述
    
    $('body').addClass('appear');//フェードアウト後bodyにappearクラス付与
    
    });
    //=====ここまでローディングエリア（splashエリア）を1.5秒でフェードアウトした後に動かしたいJSをまとめる
    
    //=====ここから背景が伸びた後に動かしたいJSをまとめたい場合は
    $('.p-intro__image').on('animationend', function() { 
    //この中に動かしたいJSを記載
    });
    //=====ここまで背景が伸びた後に動かしたいJSをまとめる
    
    });

/*スクロールでtopのlogoを小さく*/

(function($){
    $(function(){
       $(window).scroll(function(){
          var scr = $(window).scrollTop();
          if(scr > 1){
             $('#logo,#logo2').addClass('mini');
          }else{
             $('#logo,#logo2').removeClass('mini');
          }
       })
    })
})(jQuery);


/* ハンバーガーメニュー */

$(function() {
  $('.l-spbutton').on("click", function(){
    $(this).toggleClass('open');
    $('.l-spnav').toggleClass('open');
  });

});

// メニューをクリックされたら、非表示にする
$(function() {
  $('l-spnav__link').on("click", function(){
     $('.l-spnav, .l-spbutton').removeClass('open');
  });
});

/*　ページ内移動　*/

$(function(){
    // #で始まるアンカーをクリックした場合に処理
    $('a[href^="#products"],a[href^="#concept"],a[href^="#top"],a[href^="#banner"],a[href^="#site1"],a[href^="#site2"],a[href^="#profile"]').click(function() {
       // スクロールの速度
       var speed = 400; // ミリ秒
       // アンカーの値取得
       var href= $(this).attr("href");
       // 移動先を取得
       var target = $(href == "#" || href == "" ? 'html' : href);
       // 移動先を数値で取得
       var position = target.offset().top;
       // スムーススクロール
       $('body,html').animate({scrollTop:position}, speed, 'swing');
       return false;
    });
  });


/*　バナーモーダル　*/
$(function(){
    $('.js_modal_open').each(function(){
        $(this).on('click',function(){
            $("body").addClass("no_scroll"); // 背景固定させるクラス付与
            var target = $(this).data('target');
            var modal = document.getElementById(target);
            $(modal).fadeIn();
            return false;
        });
    });
    $('.js_modal_content_a,.js_modal_close').on('click',function(){
        $("body").removeClass("no_scroll"); // 背景固定させるクラス削除
        $('.js_modal').fadeOut();
        return false;
    }); 
});
