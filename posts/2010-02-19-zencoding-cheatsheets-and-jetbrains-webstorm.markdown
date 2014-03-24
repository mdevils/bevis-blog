---
author: makishvili
comments: true
date: 2010-02-19 08:38:42+00:00
layout: post
slug: zencoding-cheatsheets-and-jetbrains-webstorm
title: ZenCoding CheatSheets and JetBrains WebStorm
wordpress_id: 1362
categories:
- tech
tags:
- IntelliJIDEA
- WebIDE
- ZenCoding
---

### Справочник

На [странице проекта](http://code.google.com/p/zen-coding/wiki/CheatSheets) появились читы.
Всё перед глазами. Удобно:

![ZenCoding CheatSheets](http://makishvili.com/images/post/2010-02-19-zencoding-cheatsheets-and-jetbrains-webstorm/cheat.png)


### Поддержка в WebStorm

Частичная, в процессе разработки, например, в последнем билде 94.335

* есть Zen HTML Elements, но с недоделками, например `script:src` развернется неправильно, а вот так — `<script:src></script:src>`

* есть алиасы по типу `div#page>h3.title+ul>li.item*3>a`, но с некоторыми ошибками, например, создаёт только один вложенный `li`

* не реализованы Zen CSS Properties

В этом билде в настройках увидеть Zen невозможно, он зашит внутри (пока?)
Несмотря на явные недоделки, я уже пользуюсь алиасами и ZenHTML :)
