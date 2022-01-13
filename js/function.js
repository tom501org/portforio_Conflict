$(function () {
    $('#btn').on('click', function () {
        $('#btn__top').toggleClass('rotate-top')
        $('#btn__bottom').toggleClass('rotate-bottom')
        $('#gnav').slideToggle();
    })
});

$(function () {

    // 1秒かけてロゴを非表示にし、その後0.8秒かけて背景を非表示にする
    $('.loading__anime').fadeOut(1500, function () {
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
        const time = Date.now() / 10000;
        draw(time);
    }
    /** 描画します。 */
    function draw(time) {
        // 画面をリセット
        context.clearRect(0, 0, stageW, stageH);
        context.lineWidth = 1;
        const amplitude = stageH / 2; // 振幅（縦幅)の大きさ
        const lineNum = 50; // ラインの数
        const segmentNum = 100; // 分割数
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
                const py = (j / 100 + time);
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







$(function () {
    const mouseStalker = () => {
        const o = $("#c-mouseStalker_cursor"),
            e = $("#c-mouseStalker_delay"),
            r = {
                cursor: {
                    width: o.outerWidth(),
                    coorX: 0,
                    coorY: 0,
                    delay: .001
                },
                delay: {
                    width: e.outerWidth(),
                    coorX: 0,
                    coorY: 0,
                    delay: 10
                }
            };
        TweenMax.to({}, r.cursor.delay, {
                repeat: -1,
                onRepeat: function () {
                    r.delay.coorX += (r.cursor.coorX - r.delay.coorX) / r.delay.delay,
                        r.delay.coorY += (r.cursor.coorY - r.delay.coorY) / r.delay.delay,
                        TweenMax.set(e, {
                            css: {
                                left: r.delay.coorX - r.delay.width / 2,
                                top: r.delay.coorY - r.delay.width / 2
                            }
                        }),
                        TweenMax.set(o, {
                            css: {
                                left: r.cursor.coorX - r.cursor.width / 2,
                                top: r.cursor.coorY - r.cursor.width / 2
                            }
                        })
                }
            }),
            $(document).on("mousemove", (function (o) {
                r.cursor.coorX = o.clientX,
                    r.cursor.coorY = o.clientY
            }));
        $("#address,#btn").on({
            mouseenter: function () {
                o.addClass("active"),
                    e.addClass("active")
            },
            mouseleave: function () {
                o.removeClass("active"),
                    e.removeClass("active")
            }
        })
    };
    window.addEventListener("load", () => {
        mouseStalker()
    });
});