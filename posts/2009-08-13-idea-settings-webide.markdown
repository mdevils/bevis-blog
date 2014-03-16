---
author: makishvili
comments: true
date: 2009-08-13 07:52:02+00:00
layout: post
slug: idea-settings-webide
title: IntelliJIDEA → settings → WebIDE
wordpress_id: 1102
categories:
- tech
tags:
- IntelliJIDEA
- WebIDE
---

Если вы пользовались IntelliJIDEA, а сейчас хотите попробовать WebIDE, то скорее всего вам хочется в WebIDE иметь те же настройки, что и в IDEA.

Два способа:

1. в IDEA сделать **File** -> **Export settings** -> получить файлик settings.jar

2. в WebIDE сделать **File** -> **Import settings** <- загрузить settings.jar

**Update:**
Выяснилось, что Live Templates для CSS от Яндекса были включены в инсталляцию IntelliJIDEA уже в поздних билдах Diana. И в Maia они тоже уже идут по-умолчанию. А вот в WebIDE они случайно не попали (ну EAP же).
