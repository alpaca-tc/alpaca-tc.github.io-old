---
layout: post
title: "初級vimmerが知らないようなvimの話"
date: 2013-10-29 19:57
comments: true
categories: vim
---

Vimの中で、`g:...`, `s:...`のように、スコープ毎に変数が分かれてるよね。

例えば、`g:global#hoge`ならグローバルスコープだし、`s:script#hoge`ならスクリプトスコープという感じ！
あれって、実はDictionaryオブジェクトです。

```vim
:echo g:
=> { 'loaded_gist_vim': 1, 'unite_winwidth': 90, 'caw_I_sp_blank': '', ... }

:echo b:
=> { 'start_time': [1383044456, 140426], 'old_linenr': 17, ... }

:echo type(g:) == type({})
=> 1
```

ちなみに、変数名で`:`の文字は許可されていないのに、関数名では使えたりします。
そんなVimの謎なところが好き。
