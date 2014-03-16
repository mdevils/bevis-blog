---
author: makishvili
comments: true
date: 2010-10-25 07:36:16+00:00
layout: post
slug: input-typesubmit-padding-bug-on-safari-mobile
title: Неуправляемый паддинг  внутри input
wordpress_id: 1445
categories:
- tech
tags:
- Safari
---

В мобильном Сафари внутри input появляется неуправляемый паддинг слева и справа от текста. [Прочитать](http://stackoverflow.com/questions/3516651/input-typesubmit-padding-bug-on-safari-mobile) подробное описание проблемы.

Решение — использовать button вместо input:

    
    <style>
        button {font-size: 1px}
        button span {font-size: 14px}
    </style>
    <button><span>Текст кнопки</span></button>



Решение найдено методом "мгновенного коллективного озарения"  :) 
Озарило [Антона](http://smmurf.ya.ru), [Наташу](http://kissochka.ya.ru/), [Олю](http://olyuwik.ya.ru)
