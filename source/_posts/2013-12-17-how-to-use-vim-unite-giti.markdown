---
layout: post
title: 仕事が捗る！VimからGitを使う最適解
date: 2013-12-17 23:36
comments: true
categories: vim
---

先日の記事でもチラッと出てきた[vim-unite-giti](https://github.com/kmnk/vim-unite-giti)というプラグインがあります。

**ものすごーーーく便利**なプラグインなんですが、何故かほとんど話を聞かないプラグインです。

先日の記事でも、「知らなかった」という話を沢山聞きました。せっかくなので使い方を紹介します。

## これがvim-unite-giti!!

何はともあれ、まずは動画をみてくれ。

{% youtube jCgcpIO9oBs %}

### giti/status

add, unstage, checkoutなどの操作が簡単ですね

### giti/branch

tracking, chckout, deleteなどの操作が簡単ですね

### giti/log

紹介していませんが、普通に便利です。

## vimrc

```vim
NeoBundleLazy 'kmnk/vim-unite-giti', {
      \ 'autoload': {
      \   'unite_sources': [
      \     'giti', 'giti/branch', 'giti/branch/new', 'giti/branch_all',
      \     'giti/config', 'giti/log', 'giti/remote', 'giti/status'
      \   ]
      \ }}
" video内では、git-vimも使用しています

" vim-unite-giti
nnoremap <silent>gl :Unite giti/log -no-start-insert -horizontal<CR>
nnoremap <silent>gP :Unite giti/pull_request/base -no-start-insert -horizontal<CR>
nnoremap <silent>gs :Unite giti/status -no-start-insert -horizontal<CR>
nnoremap <silent>gh :Unite giti/branch_all -no-start-insert<CR>

augroup MyUniteCmd
  autocmd!
  autocmd FileType unite call <SID>unite_my_settings()
augroup END

function s:unite_my_settings()
  let profile_name = substitute(unite#get_current_unite().profile_name, '[-/]', '_', 'g')
  if !empty(profile_name) && has_key(s:unite_hooks, profile_name)
    call s:unite_hooks[profile_name]()
  endif
endfunction

let s:unite_hooks = {}
function! s:unite_hooks.source_giti_status()
  " nnoremap <silent><buffer><expr>gM unite#do_action('ammend')
  " nnoremap <silent><buffer><expr>gm unite#do_action('commit')
  nnoremap <silent><buffer><expr>ga unite#do_action('stage')
  nnoremap <silent><buffer><expr>gc unite#do_action('checkout')
  nnoremap <silent><buffer><expr>gd unite#do_action('diff')
  nnoremap <silent><buffer><expr>gu unite#do_action('unstage')
endfunction

function! s:unite_hooks.source_giti_branch()
  nnoremap <silent><buffer><expr>d unite#do_action('delete')
  nnoremap <silent><buffer><expr>D unite#do_action('delete_force')
endfunction

function! s:unite_hooks.source_giti_branch_all()
  call s:unite_hooks.source_giti_branch()
endfunction

function! s:unite_hooks.source_giti_log()
  nnoremap <silent><buffer><expr>gd unite#do_action('diff')
  nnoremap <silent><buffer><expr>d unite#do_action('diff')
endfunction
```

## まとめ

ujihisaさんに憧れてのYoutube記事です。笑

余談ですが、作者の[kmnk](https://github.com/kmnk)さんのコードは*めちゃくちゃ奇麗*です。

今までで読んできた中で、一番奇麗なVimLのコードでした。ほどよい抽象化、適切な命名、整理されたファイル達。率直に、この人と一緒に仕事出来る人は幸せだろうなぁと感じました。

vim-unite-gitiを作ってくださって感謝します。
