---
layout: post
title: Using Cython in real case example
disqus_id: 2015215bootstrap
categories: Scientific computing
---

Python has grown to be my prefered choise when it comes to programing.
It is just so simple to import from its huge selection of modules and
just build upon them to get things working. But at some point, when all
the desing phase is over, it just feels so slow when it has to work.

In this case, I'm refering to numerial calculations. Indeed the [numpy]
and [scipy] modules are of great help, letting all the numerical calculations
to run faster in their C or Fortran coded engines. But what of the
algorithm I code in Python, it is just going to be the slow part of
my work. So I have to avoid writing too much python and prefer calling
all this C coded modules. YES!!, this is just it. BUT is not enough, there
[numpy] and [scipy] only provide very general function and it is up to
the user to make a use out of them.

So once the user has its algorithm working, he needs to speed it up. Coding
it all into C might be too much of a <hassel> and error prone. He also might
loose many of the python modules he depends on in the first place and the
code will become less redable. The alternatives for now are to use [Cython]
and the not so new project [numba], this two are desinged to establish
the link between python ease of use and C level performance. My problem with
them is that all the advertisement you get from them, all the simple examples
you get from them, where they show you the huge preformance boost. Are
simple examples where you are implementing the complete algorithm your
self and the python interpreter is slowing this down. So a quick call
to [numba] or [cython] static typesetting will just solve the problem
and give you 3 orders of magnitude performance boost.

So to come to my story it is because, I was already calling the C functions
of [numpy] and [scipy], and those, should be the most time consuming
functions of my algorithm. But they weren't, there was enought python code
to slow me down. So my first hope was to call [numba], but there was no
performance gain. It can't deal with my calls to [scipy] functions. So
let's go to [cython]. This wasn't easy, it never is in the begining and
the tutorial don't use real cases scenarios.



[numpy]: http
[scipy]: http
[cython]:
[numba]:
