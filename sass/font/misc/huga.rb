url_list = %w[
http://www.amazeelabs.com/misc/throbber.gif
http://www.amazeelabs.com/misc/grippie.png
http://www.amazeelabs.com/misc/draggable.png
http://www.amazeelabs.com/misc/tree.png
http://www.amazeelabs.com/misc/tree-bottom.png
http://www.amazeelabs.com/misc/tree.png
http://www.amazeelabs.com/misc/throbber.gif
http://www.amazeelabs.com/misc/menu-expanded.png
http://www.amazeelabs.com/misc/menu-leaf.png
http://www.amazeelabs.com/misc/message-24-ok.png
http://www.amazeelabs.com/misc/message-24-warning.png
http://www.amazeelabs.com/misc/message-24-error.png
http://www.amazeelabs.com/misc/menu-collapsed.png
http://www.amazeelabs.com/misc/help.png
http://www.amazeelabs.com/misc/menu-expanded.png
http://www.amazeelabs.com/misc/menu-collapsed.png
http://www.amazeelabs.com/misc/progress.gif
]
url_list.each do |url|
  `wget #{url}`
end
