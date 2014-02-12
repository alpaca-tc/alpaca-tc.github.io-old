---
layout: post
title: RubyのGemの正しく作ってみる
date: 2014-02-13 02:52
comments: true
categories: ruby
---

{% img image_on_frame center /images/blog/i-have-almost-finished-implementing-comment-parser/capture.png コメントを抽象的に扱う %}

先日から書いていたGemですが、ようやく一通りの動作が確認出来ました。

あらゆるソースコードをパースして、コメントを抽象的に扱えるようにするGemです。

<!-- more -->

## 一旦振り返り

設計からRubyGemsにあげるまで、44:32:23かかりました。

とりあえず、これからwatson-rubyのnhmoodさんに連絡して、watson-rubyに取り入れてもらう予定です。

## 誰かコードレビューを...

一人でコード書いていると、これで良いのかと悩みます。

一応、正しく作っているつもりですがプログラミングは文系独学なので、正直自信が無いです。。

[**comment\_parser**](https://github.com/alpaca-tc/comment_parser)

↑どなたか、コードレビューお願いします！><↑

## Vimプラグインが捗る

続いて、コメントの文法チェックや翻訳のプラグインを完成させまする！
