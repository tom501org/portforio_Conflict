$(function () {
    $('#btn').on('click', function () {
        $('#btn__top').toggleClass('rotate-top')
        $('#btn__bottom').toggleClass('rotate-bottom')
        $('#gnav').slideToggle();
    })
});

$(function () {
 
        // 1秒かけてロゴを非表示にし、その後0.8秒かけて背景を非表示にする
        $('.loading__anime').fadeOut(1000, function(){
            $('.js-loading').fadeOut(400)
        });
});


// オブザーバー
window.addEventListener('load', function () {
    const observer = new IntersectionObserver(function (entries) {
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









$(function () {
    let stageW = 0; // 画面の幅
    let stageH = 0; // 画面の高さ
    // canvas要素の参照を取得
    const canvas = document.querySelector('.loop');
    // 2Dの描画命令群を取得
    const context = canvas.getContext('2d');
    noise.seed(Math.random());
    resize();
    tick();
    window.addEventListener('resize', resize);
    /** エンターフレームのタイミングです。 */
    function tick() {
        requestAnimationFrame(tick);
        const time = Date.now() / 4000;
        draw(time);
    }
    /** 描画します。 */
    function draw(time) {
        // 画面をリセット
        context.clearRect(0, 0, stageW, stageH);
        context.lineWidth = 1;
        const amplitude = stageH / 2; // 振幅（縦幅)の大きさ
        const lineNum = 150; // ラインの数
        const segmentNum = 150; // 分割数
        [...Array(lineNum).keys()].forEach(j => {
            const coefficient = 50 + j;
            context.beginPath();
            const h = Math.round(j / lineNum * 360); // 色相
            const s = 100; // 彩度
            const l = Math.round(j / lineNum * 100); // 明度
            context.strokeStyle = `hsl(${h}, ${s}%, ${l}%)`;
            [...Array(segmentNum).keys()].forEach(i => {
                const x = i / (segmentNum - 1) * stageW;
                const px = i / coefficient;
                const py = (j / 50 + time);
                const y = amplitude * noise.perlin2(px, py) + stageH / 2;
                if (i === 0) {
                    context.moveTo(x, y);
                } else {
                    context.lineTo(x, y);
                }
            });
            context.stroke();
        });
    }
    /** リサイズ時のイベントです。 */
    function resize() {
        stageW = innerWidth * devicePixelRatio;
        stageH = innerHeight * devicePixelRatio;

        canvas.width = stageW;
        canvas.height = stageH;
    }
});




$(function(){
  
    //カーソル要素の指定
    var cursor=$("#cursor");
    //ちょっと遅れてついてくるストーカー要素の指定  
    var stalker=$("#stalker");
    
    //mousemoveイベントでカーソル要素を移動させる
    $(document).on("mousemove",function(e){
      //カーソルの座標位置を取得
      var x=e.clientX;
      var y=e.clientY;
      //カーソル要素のcssを書き換える用
      cursor.css({
        "opacity":"1",
        "top":y+"px",
        "left":x+"px"
      });
      //ストーカー要素のcssを書き換える用    
      setTimeout(function(){
        stalker.css({
          "opacity":"1",
          "top":y+"px",
          "left":x+"px"
        });
      },-5);//カーソルより遅れる時間を指定
      
    });
  });