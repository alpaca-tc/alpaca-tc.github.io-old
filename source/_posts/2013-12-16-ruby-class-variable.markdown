---
layout: post
title: Rubyのクラス変数について詰まったのでヘルプ
date: 2013-12-16 01:10
comments: true
categories: ruby
---

基本的に、仕事でクラス変数を扱うことはほぼ無いです。

今回は遊びのコードを書いていて、悩んだことをまとめました。

**まだ分からないので、誰か教えてください><**

<!-- more -->

# Rubyのクラス変数の扱いが難しい...。

まず、次のようなコードを書いてみた。

```ruby
class Base; end

class Node < Base
  @@val = 'Node'
end

class Branch < Base
  @@val = 'Branch'
end

p Node.class_variable_get('@@val') #=> 'Node'
p Branch.class_variable_get('@@val') #=> 'Branch'
```

ふむ、いたって想定通りの動作である。

では、続いてクラス変数にデフォルト値を与えてみる。

```ruby
class Base
  @@val = 'Base'
end

class Node < Base
  @@val = 'Node'
end

class Branch < Base
  @@val = 'Branch'
end

p Node.class_variable_get('@@val') #=> 'Branch'
p Branch.class_variable_get('@@val') #=> 'Branch'
```

Ooops!!! 派性クラス内のクラス変数が、Baseのクラス変数を参照しよる！！

## 解決編

うーん、どうもクラス変数という感じではなくなるけれど、こうするしかないのだろうか...。

ものすごく気持ちが悪い。

```ruby
class Base
  class << self
    private

    def val
      'Base'
    end
  end
end

class Node < Base
  class << self
    private

    def val
      'Node'
    end
  end
end

class Branch < Base
  class << self
    private

    def val
      'Branch'
    end
  end
end

p Node.send(:val) #=> 'Node'
p Branch.send(:val) #=> 'Branch'
```

これだと、クラス変数ではなくなったけれど一応コードとして動く。 ただ、「これは無いだろ感」が凄いする。

しかし、クラスインスタンス変数だと継承されないし、こうするしかないのかなぁ。

今回の悩みは検索するにもキーワードが難しくて、正しい答えにたどり着けてないです><

**だれか教えて！**
