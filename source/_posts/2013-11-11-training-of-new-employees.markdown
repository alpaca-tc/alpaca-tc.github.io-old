---
layout: post
title: Vimを使って新人教育
date: 2013-11-11 05:21
comments: true
categories: vim
---

一緒に働く仲間が増えました。
普段からオープンソースの開発や、バリバリ仕事ができる人でなければなかなかコードを書く力というのは一定の基準にならないと思います。

そこで、ペアプロやリファクタリングなどを行ってコーディングを教えるのが普通だと思うのですが、うちの会社はほとんどリモート勤務です。

とりあえず、最低限のレベルになるまでは、Githubを通して一問一答の形で問題を解いてってもらおうかなと思いました。


幸い、新人の人もvimmerなので、そのためのプラグインを作りました。

{% img image_on_frame center /images/blog/11_11.png Vimのデモ %}

**[assignment.vim](https://github.com/enfactv/assignment)**

インストールはごく簡単です。

```vim
NeoBundle 'alpaca-tc/assignment'`

let g:assignment#path = expand('~/path/to/assignment')

" 初期化
" `:AssignmentInit ~/インストール先ディレクトリ`
```

### 良かったこと

- GitHubの使い方がわからなくても、Vimから取り組めること
- 問題を作成するのが少し楽になったこと
- Guard + Rspecの環境で、自動テストされること

### 悪かったこと

- 一問一答の形式って鬼効率悪いよね...


まぁ、とりあえず一ヶ月はこの形式で進めていけば、最低限のコーディングができるようになるはずです。

### まとめ

正直、今日は書くことがなかっただけです。うい！
暇だなーと思う方が入れば、プラグインを入れて問題を解いてみてください。

1. プラグインをインストール
2. `:AssignmentInit ~/インストール先ディレクトリ`を実行
3. vimrcに`let g:assignment#path = expand('~/path/to/assignment')`を追加
4. `:Assignment solve <tab>`で問題を選択
5. Guardをまわしながら解くのみ！

8クイーン問題や、RubyのDSLを作る問題などです。
初級者向けですが、暇つぶしにはなると思いますよ！
