---
layout: page
title: "Blog"
date: 2013-11-1 4:20
comments: true
sharing: true
footer: true
---

<section id="category_list">
<h1>カテゴリーリスト</h1>
{% for item in site.categories %}
  <li>
  <a href="/blog/{{ item[0] }}/">{{ item[0] | capitalize }}</a> [{{ item[1].size }}]
  </li>
{% endfor %}
</section>

<section id="entry_list">
<h1>記事一覧</h1>
{% for post in site.posts reversed %}
{% capture this_year %}{{ post.date | date: "%Y" }}{% endcapture %}
{% unless year == this_year %}
  {% assign year = this_year %}
  <h2>{{ year }}</h2>
{% endunless %}
<article>
{% include archive_post.html %}
</article>
{% endfor %}
</section>
