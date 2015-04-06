---
layout: post
title: Using Cython in real case example
disqus_id: 2015215bootstrap
categories: Scientific computing
---

Python has grown to be my preferred choice when it comes to programing.
It is just so simple to import from its huge selection of modules and
just build upon them to get things working. But at some point, when all
the design phase is over, it just feels so slow when it has to work.

In this case, I'm referring to numerical calculations. Indeed the [numpy]
and [scipy] modules are of great help, letting all the numerical calculations
to run faster in their C or Fortran coded engines. But what of the
algorithm I code in Python, it is just going to be the slow part of
my work. So I have to avoid writing too much python and prefer calling
all this C coded modules. YES!!, this is just it. BUT is not enough, because
[numpy] and [scipy] only provide very general functions and it is up to
the user to make a use out of them.

So once the user has its algorithm working, he needs to speed it up. Coding
it all into C might be too much of a hassle and error prone. He also might
loose many of the python modules he depends on in the first place and the
code will become less readable. The alternatives for now are to use [Cython]
and the not so new project [numba], this two are designed to establish
the link between python ease of use and C level performance. My problem with
them is that all the advertisement you get from them, all the simple examples
you get from them, where they show you the huge performance boost. Are only
simple examples where you are implementing the complete algorithm your
self and the python interpreter is slowing this down. So a quick call
to [numba] or [Cython] static typesetting will just solve the problem
and give you 3 orders of magnitude performance boost.

My story begins because I was already calling the fast C functions
of [numpy] and [scipy], and those, should be the most time consuming
functions of my algorithm. But they weren't, there was enough python code
to slow it down. So my first hope was to call [numba], but there was no
performance gain. It can't deal with my calls to [scipy] functions. So
let's go to [Cython]. This wasn't easy, it never is, in the beginning and
the tutorial don't use real cases scenarios.

* * *

So I now present you how I solved my problem and gained a performance
boost of 4x. Indeed it is not so glamorous or amazing as 1000x, but
it is the last bottleneck before you are matching C speed.

So before I start I will stress: **HAVE TESTS FOR YOUR CODE!**
It doesn't help at all to get faster execution times just to arrive to
the wrong results faster. Debugging is a pain, and it is more painful
every time your new modifications break old code. Testing lets you test
over smaller pieces of your code and make it easier to track what broke
your code. I love python so much because there are very simple frameworks
to write your tests, so just use them. When is a good time to write your
test? If you can before your own module great. After you wrote the module
is also good, and even if it gave you the right results from the beginning
you have to keep track it continues to do so as your code evolves.

The goal of this work is to implement a Quantum Monte Carlo algorithm
to solve the Anderson impurity model and use it in the context of DMFT.
There are already many implementations of this code spread around the
world many of them in Fortran and C/C++ so why not use them? Well, first
they are more complicated to understand, modify, and some times to big
packages. Second, I needed to learn and modify it on my own style.

* * *

Lets start by profiling the code. Here you see only the relevant parts
I want to focus on for this short example. In this Code the main time
is spend inside the imp_solver which performs the Monte Carlo update,
which needs to update a dense matrix each time. Almost all of the time
would need to be spend in the matrix update, but because I'm using [scipy]
interface to BLAS it just doesn't take that much time and it is the Metropolis
update scheme which is manually implemented in python that takes all the time.

<script src="https://gist.github.com/Titan-C/b729e6f7fd34c7c7c0f0.js?file=Starting_Profile.txt"></script>

Based on this example for the [Ising model](http://matthewrocklin.com/blog/work/2015/02/28/Ising/)
I wanted to test [numba], but it just did not help, because numba can't, to my
knowledge, compile the calls I do to scipy. Static typing in Cython didn't
work either as the main delay was presented by calling still the scipy module
of BLAS. So I need to use Cython to perform the direct call into BLAS. It was
thanks to [tokyo](https://github.com/tokyo/tokyo), a Cython wrapper to BLAS
that I could learn this. Although [scipy] seems to be inserting in its
development branch the Cython wrappers to BLAS, but that will be for a later
time.

<script src="https://gist.github.com/Titan-C/b729e6f7fd34c7c7c0f0.js?file=pure_python_gnew.py"></script>

Cythonizing this it becomes
<script src="https://gist.github.com/Titan-C/b729e6f7fd34c7c7c0f0.js?file=cython_gnew.pyx"></script>
It is important to keep in mind that numpy normally uses **C** ordered arrays,
but if you happen to use scipy functions in some steps, your numpy arrays will
become **Fortran** ordered. Then it is important to keep that ordering when
you call BLAS. (This was the big bug, and why you need tests). So pay special
attention of the keyword of `CblasColMajor` to keep the Fortran Column ordering
provided by the numpy arrays. The copy instruction is also necessary.
<script src="https://gist.github.com/Titan-C/b729e6f7fd34c7c7c0f0.js?file=cy_gnew_profile.txt"></script>

This first action dropped the amount of python calls almost by half. The new
Cython function is faster by almost half. The changing number of calls is
because I'm a bad profiler and I'm not using the same seed for the random
number generator, but in this case is has quite negligible effects. The total
execution time dropped by a bit more than a second.

Now it's time to cythoonize the update function that is in charge of the Metropolis
algorithm. It has a very simple structure. It uses most of its time calling
the random number generator and doing the algebra operations over simple floats
<script src="https://gist.github.com/Titan-C/b729e6f7fd34c7c7c0f0.js?file=pure_python_update.py"></script>

But once cythonized it becomes:
<script src="https://gist.github.com/Titan-C/b729e6f7fd34c7c7c0f0.js?file=cython_update.pyx"></script>
Notice that in this case I'm again calling external functions available in C
like the ones of the [GSL] libraries. After this changes the end result
is a completely cythonized Metropolis Monte Carlo update function that
runs entirely on C. As it is shown by the profiler.
<script src="https://gist.github.com/Titan-C/b729e6f7fd34c7c7c0f0.js?file=cy_update_profile.txt"></script>
The amount of python function calls dropped again this time by 5 times. And the
`update` function internally calling `gnew` requires in total 0.841s. Droping
the total time used by the impurity solver from 3.591s to 0.841s that is
a 4.12x speed gain. And most of the time would be spend as expected in the
matrix update function `gnew`.


[numpy]: http://www.numpy.org
[scipy]: http://www.scipy.org
[cython]: http://www.cython.org
[numba]: http://numba.pydata.org
[GSL]: http://www.gnu.org/software/gsl/
