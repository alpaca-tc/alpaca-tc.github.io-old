---
layout: post
title: カヤックのお年玉企画「お好き玉」の解説
date: 2014-01-07 00:07
comments: true
categories: web-service
---

[先日紹介した「お好き玉」](http://alpaca-tc.github.io/blog/web-service/kayac-2014-otoshidama.html)ですが、アクセス数が多いはずなのにまだ2014に達していません！

アクセスが足りないのか、みんな諦めるのか分かりませんが**2014に達さないと企画者が寂しいだろう**から、少しだけヒント載せておきます！

素人でも、これをきっかけに少しだけWebエンジニアっぽいことに挑戦できたら楽しいよね:)

<!-- more -->

## 逃げる「イイネ!!」が押せない仕組み

このFBイイネが押せない理由は2つあります。

1. イイネボタンの上にCSSでマスクがかかっている
2. カーソルに合わせてボタンが動く

この両方を解除しないとボタンは押せません。

[Google Chrome](https://www.google.com/intl/en/chrome/browser/)の[Developer Tool](http://www.buildinsider.net/web/chromedevtools/01)は必須ですヨ:)

### 1.イイネボタンの上にCSSでマスクがかかっている

z-indexの仕業かと思ったら、こんな方法もあるんですねぇ。感心。

```css
// http://iine2014.fnobi.com/css/iine2014.css:84
#iine:after {
  content: '';
  display: block;
  width: 120px;
  height: 22px;
  position: absolute;
  top: 0px;
  left: 0px;
}
```

Facebookのイイネボタンのidが`#iine`で、その直後に疑似要素`:after`が同じサイズでかぶさっています。なので、どんなに頑張ってもボタンは押せません。

この疑似要素を消すか、widthを0にしてしまえばボタンは押せますね。Developer Toolの出番やで！

## 2. カーソルに合わせてボタンが動く

JavaScriptを見てみると、`mouseover`と`touchstart`のタイミングで位置を移動させているのが分かります。

```javascript
// http://iine2014.fnobi.com/js/iine2014.js:9130
(function (win) {
    $(function () {
        var $window = $(window);
        var $iine = $('#iine');

        // 略

        $iine.on('mouseover touchstart', function () {
          // 略
        });
```

なので、このeventを解除してやれば動かなくなります(・∀・) `on`の逆をすればいいのです

## まとめ

解説しましたが、つまるところ`#iine`にまつわるものを解除してやればいいので、Developer Toolを開いて、ちょめっとすれば一瞬ですネヾ(\*´∀｀\*)ﾉ
