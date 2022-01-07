$(function() {
    // ここにjQueryを記述
    //ハンバーガー
    $('#btn').on('click', function() {
        $('#btn__top').toggleClass('rotate-top')
            // $('#btn__middle').toggleClass('hide-middle')
        $('#btn__bottom').toggleClass('rotate-bottom')
        $('#gnav').slideToggle();
    })
});


$(function() {


    //カーソル要素の指定
    let cursor = $("#cursor");
    //ちょっと遅れてついてくるストーカー要素の指定  
    let stalker = $("#stalker");


    //mousemoveイベントでカーソル要素を移動させる
    $(document).on("mousemove", function(e) {
        //カーソルの座標位置を取得
        let x = e.clientX;
        let y = e.clientY;
        //カーソル要素のcssを書き換える用
        cursor.css({
            "opacity": "1",
            "top": y + "px",
            "left": x + "px"
        });
        //ストーカー要素のcssを書き換える用    

        stalker.css({
            "opacity": "1",
            "top": y + "px",
            "left": x + "px"
        });; //カーソルより遅れる時間を指定
    })
});

window.addEventListener('load', function() {
    const observer = new IntersectionObserver(function(entries) {
        for (let i = 0; i < entries.length; i++) {
            if (entries[i].intersectionRatio <= 0) continue;
            showElm(entries[i].target);
        }
    }, {
        rootMargin: '-20% 0% -20% 0%'
    });
    const elements = document.querySelectorAll('.fadeIn');
    for (let i = 0; i < elements.length; i++) {
        observer.observe(elements[i]);
    }

    function showElm(e) {
        e.classList.add('e-f');
        observer.unobserve(e);
    }
}, false);