---
layout: post
title: 仕事が捗る！VimからGitを使う最適解
date: 2013-12-17 23:36
comments: true
categories: vim
---

先日の記事でもチラッと出てきた[vim-unite-giti](https://github.com/kmnk/vim-unite-giti)というプラグインがあります。

**ものすごーーーく便利**なプラグインなんですが、何故かほとんど話を聞かないプラグインです。

先日の記事でも、git系のプラグインは「知らなかった」という話を沢山聞きました。せっかくなので使い方を紹介します。

<!-- more -->

## vimからgitを使う。

有名なプラグインは次のようなものです。それぞれ、一言でまとめます。

- git-vim　**`:Git`コマンドが便利。それなりに補完してくれる**
- vim-fugitive(fugitive.vim)　**vim+gitでは一番有名。ただし、コードが糞なのと、操作が難しい**
- vim-versions(旧vim-vcs)　**git+unite系では結構有名。簡単な操作なら十分かもしれない**
- gitv　**gitkのvim版。gitk使ったこと無いっていう人には不要**

## 今回紹介するのはvim-unite-giti!!

何はともあれ、**まずは動画をみてくれ。**

{% youtube jCgcpIO9oBs %}

とにかく、uniteインターフェースは操作を覚えることが少ない。

今回も、幾つかのUniteコマンドを使っているけれど、基本的に「選択」→「アクション」の動作しかない。

### :Unite giti/status

add, unstage, checkoutなどの操作が簡単ですね

conflictがあれば、すぐ見れます。「選択」→「commitアクション」と進めば、指定したファイルだけのコミットもお手軽に作れます(!!)

### :Unite giti/branch

tracking, chckout, deleteなどの操作が簡単ですね。

branchを切るのにわざわざShellを使うなんて。あなた、Vimと触れ合う時間が減ってしまうではないですか。

### :Unite giti/log

紹介していませんが、普通に便利です。vimdiffなどを見る事も簡単です。

## vim-unite-giti以外のプラグイン

### *git-vim* :GitDiff, :Git push

こちらは、特に驚きはないので初めて使う人以外は見なくてもいいです。

{% youtube wWI3Wb-0Vw4 %}

言わずもがな、コマンド名の通りです。

git-vimを使って何がうれしいかと言うと、それなりに補完ができる点です。

### *fugitive* :Gcommit, :Gblame

すでに語り尽くされているので、ここでは取り上げません。

他のプラグインにもにたようなコマンドがありますが、色付きなのと、機能性が優れているのでfugitiveがおすすめです。

## vimrc

```vim
" コピペで貼付けているので、これで動作しなかったら賢く書き換えてください。
NeoBundleLazy 'kmnk/vim-unite-giti', {
      \ 'autoload': {
      \   'unite_sources': [
      \     'giti', 'giti/branch', 'giti/branch/new', 'giti/branch_all',
      \     'giti/config', 'giti/log', 'giti/remote', 'giti/status'
      \   ]
      \ }}
NeoBundleLazy 'Shougo/git-vim', {
      \ 'autoload' : {
      \ 'function_prefix' : 'git',
      \ 'functions' : 'git#get_current_branch',
      \ 'commands': [
      \   { 'name': 'GitDiff',     'complete' : 'customlist,git#list_commits' },
      \   { 'name': 'GitVimDiff',  'complete' : 'customlist,git#list_commits' },
      \   { 'name': 'Git',         'complete' : 'customlist,git#list_commits' },
      \   { 'name': 'GitCheckout', 'complete' : 'customlist,git#list_commits' },
      \   { 'name': 'GitAdd',      'complete' : 'file' },
      \   'GitLog', 'GitCommit', 'GitBlame', 'GitPush'] }}
NeoBundleLazy 'tpope/vim-fugitive', { 'autoload': {
      \ 'functions' : ['fugitive#head', 'fugitive#detect'],
      \ 'commands': ['Gcommit', 'Gblame', 'Ggrep', 'Gdiff', 'Gcd'] }}

" git-vim
let g:git_bin = executable('hub') ? 'hub' : 'git'
let g:git_command_edit = 'vnew'
let g:git_no_default_mappings = 1
nnoremap gA :<C-U>GitAdd<Space>
nnoremap <silent>ga :<C-U>GitAdd<CR>
nnoremap gp :<C-U>Git push<Space>
nnoremap gD :<C-U>GitDiff<Space>
nnoremap gDD :<C-U>GitDiff HEAD<CR>
nnoremap git :<C-U>Git<Space>

" fugitive
nnoremap <silent>gM :Gcommit --amend<CR>
nnoremap <silent>gb :Gblame<CR>
nnoremap <silent>gB :Gbrowse<CR>
nnoremap <silent>gm :Gcommit<CR>
let hooks = neobundle#get_hooks('vim-fugitive')
function! hooks.on_source(bundle)
  augroup MyGitCmd
    autocmd!
    autocmd FileType fugitiveblame vertical res 25
    autocmd FileType gitcommit,git-diff nnoremap <buffer>q :q<CR>
  augroup END

  let g:fugitive_git_executable = executable('hub') ? 'hub' : 'git'
endfunction
function! hooks.on_post_source(bundle)
  call fugitive#detect(expand('<amatch>:p'))
endfunction
command! FugitiveReload call fugitive#detect(expand('<amatch>:p'))
unlet hooks

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

余談ですが、作者の[kmnk](https://github.com/kmnk)さんのコードは**めちゃくちゃ奇麗**です。

今までで読んできた中で、*一番奇麗なVimLのコード*でした。ほどよい抽象化、適切な命名、整理されたファイル達。率直に、この人と一緒に仕事出来る人は幸せだろうなぁと感じました。

vim-unite-gitiを作ってくださって感謝します。

