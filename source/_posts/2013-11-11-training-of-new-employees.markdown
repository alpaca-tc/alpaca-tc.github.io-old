---
layout: post
title: Vimを使って新人教育
date: 2013-11-11 05:21
comments: true
categories: vim
---

嬉しいことに、一緒に働く仲間が2人増えました。

まだRubyに慣れていないそうなので、はじめの一ヶ月は教育期間を挟みます。

新人の方もvimmerなので、そのためのプラグインを作りました。

{% img image_on_frame center /images/blog/2013_11_11.png Vimのデモ %}

**[assignment.vim](https://github.com/enfactv/assignment)**

インストールはごく簡単です。

```vim
NeoBundle 'alpaca-tc/assignment'`

let g:assignment#path = expand('~/path/to/assignment')
```

## [assignment.vim](https://github.com/enfactv/assignment)とは

Vimから演習問題を選択して、挑戦することができます。
それぞれの演習問題は、テストが書かれているのでGuard-Rspecを回しながら確認できます。

オールグリーンになったら、Vimからコマンドを実行してGithubへPull-Requestを送ります。

### 良かったこと

- GitHubの使い方がわからなくても、Vimから徐々に取り組めること
- 問題のやり取りが楽になったこと(コマンドで自動化)
- 自動テストがあるので、挑戦者が自分で採点できること(リモート勤務なので、必須)

### 悪かったこと

- 一問一答の形式って効率悪いよね...

作る時間が割ともったいない。
ま、とりあえず一ヶ月はこの形式で進めて、Rubyに慣れてもらおうかと思います。

## まとめ

正直、今日は書くことがなかっただけです。えへ。
暇だなー、俺初級者かなーと思う方が入れば、試しに問題に挑戦してみてください。

1. プラグインをインストール
2. `:AssignmentInit ~/インストール先ディレクトリ`を実行して初期化
3. vimrcに`let g:assignment#path = expand('~/path/to/assignment')`を追加
4. `:Assignment solve <tab>`で問題を選択
5. Guardをまわしながら解くのみ！

初めは、8クイーン問題や、RubyのDSLを作る問題などです。
初級者向けですが、少しは暇つぶしにはなると思いますよ！
