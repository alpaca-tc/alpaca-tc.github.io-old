---
layout: post
title: JavaScript補完プラグインのTernがすごい
date: 2013-11-13 14:40
comments: true
categories:
---

「え、JavaScriptを書いているのに、Tern使ってないの？」

ダサい。イケてない。
あぁ、残念。

[Tern](https://github.com/marijnh/tern)は、marijnhという凄いエンジニアの人が作っているJavaScriptの動的補完プラグイン

コードを動的にパースして、今カーソルがある変数の型まで調べて補完しちゃってくれる。
設定をすれば、jQueryなどのプラグインでの諸々も補完しちゃう凄いやつなのだ。

まぁ、何はともあれ一度使ってみてください。

```vim
if has('python') && executable('npm')
  NeoBundleLazy 'marijnh/tern_for_vim', {
        \ 'build' : 'npm install',
        \ 'autoload' : {
        \ 'functions': ['tern#Complete', 'tern#Enable'],
        \ 'filetypes' : 'javascript'
        \ }}
endif

let hooks = neobundle#get_hooks('tern_for_vim')
function! hooks.on_post_source(bundle) "{{{
  function! s:disable_tern() "{{{
    if &filetype =~ '^javascript'
      autocmd! TernAutomatically <buffer>
      call tern#Disable()
    endif
  endfunction"}}}

  function! s:disable_tern_automatically() "{{{
    augroup TernAutomatically
      autocmd! * <buffer>
      autocmd FileType * <buffer> call s:disable_tern()
    augroup END
  endfunction"}}}

  augroup MyAutoCmd
    autocmd FileType javascript call s:disable_tern_automatically()
  augroup END
endfunction"}}}
unlet hooks
```
