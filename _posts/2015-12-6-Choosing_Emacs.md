---
layout: post
title: Choosing a text editor to match my workflow
disqus_id: 20151206choosingEmacs
categories: Workflow
---

TL;DR Emacs is the way to go

Optimization is my way of procrastination. This time it is about
getting a decent text editor. I am at the point where it is just
annoying that all my text is getting scattered between different
editors and that many times I have to open my same files under
different editors to get what I need done.

Why IDEs never come with a spell checker? Is is just horrible to have
poor spelling on any comment. I keep my personal notes in a
[zim-wiki], but it does not have completion nor syntax highlighting,
cross-referencing documents is great and that is what wikis are for. I
keep my plots in there, but I can't generate them inside the document
itself. And keeping track of which code generates which output has
become quite insane. Despite git version control, and having a journal.
Documents support a rich syntax, I can even embed and display
math, I just can't type it directly because I need to call an extra
editor inside zim to do it. Then the equation does not get stored in
the main file but on a separate one, and so for each equation. Making
it tedious to keep track of all this files and their png outputs that
are embedded in the displayed document.

[Jupyter/Ipython] solves the lab notebook use of my note taking. But
Jupyter/Ipython is just slow in the web browser and the files are
not version control friendly. It does embed MathJax for the math I
need, and is dynamic in its evaluation. Indexing files is no really
possible in the way a wiki works. Search is no possible either. And
for every file I open I have to launch a new kernel that eats more of
my machine resources.

So I accepted that I need to spend time into getting a tool that
allows me to do my work. Here I put my criteria of what I need

* Text editing features:
  * Everything in reach of the keyboard, no extra arm movements
  * Spellchecking in multiple human languages
  * Auto completion for any language/text I type
* IDE features
  * Linter for my code
  * Link to code, documentation
  * Integration with the debugger
* Workflow enabling features:
  * Keep track of a daily journal
  * Document my scientific outputs
    * capture code that run, instance and version
    * std-out capture
    * Attach figures
  * Keep track of planing
  * Keep track of notes and outlines
  * Support embedded Latex
* Communication features
  * Export to latex PDF
  * Export to markdown or text files that are simple to version control

But this challenges can't be new, there must be a solution
already. The truth is that getting all of it is not so simple. I must
say that up to this experience point, it feels that VIM can't be
beaten in the text editing features, I may be to biased, but that's
the tool I started using when I had to edit files in remote servers,
and gave me the best experience after the pain of learning it. It just
feels so natural to keep the hands on the keys and not exaggerated
keys combinations, it really feels like a text editing language on
itself. And there are a lot of plugins to help you handle email and
calendar and task list and planning. Using it in combination with the
shell, seemed a good option for a long while, using ack to find the
files I needed is an amazing alternative to indexing, it even makes me
think why having at wiki index at all? But VIM just fails with my
requirement of working with richer media. I just need to be able to
put latex and figures in my files really badly, and I could not find a
way to do that in VIM. Nor, that neovim would be able to do that in
the near future.

If not VIM then what about its famous contestant? Emacs on the other
hand, has this complicated key combinations, but it supports richer
text, latex, and images. In fact, for some reason I blocked into my
mind that a text editor can't display images (despite having my wiki
do it all the time, and web sites also do it). Text editors have a
single font, single/uniform font height, and miss all the goodness of
the graphical interface, only using some icon at the top of the
screen. It was just after this [Emacs talk], that it finally clicked
into my mind all this was possible. That talk referenced
[Carsten Dominik talk] giving me the scientific workflow framework
that I wanted to adapt which was then complemented by a [scipy talk]
showing it for a specific scientific workflow.  That made it the
winner for now. There is no other alternative to match that I could
find. I'm still fighting with the learn process and there are still
some rough parts that hinder me from living in Emacs. I didn't plan to
live in my text editor, but the Emacs philosophy does tend to drive me
to it. I also don't know if all this key combinations would be better
handled with better keyboards that put the control keys closer to your
thumbs [keyboardio]. The fact is that despite all our technological
evolution. The best way to treat our information is plain text, and
the best way to get our thoughts into the computer is a keyboard.

In the end, nothing survives if it doesn't adapt to its surroundings,
that is natural selection. The fact VIM and Emacs are still up I think
is because we can adapt them to our work styles. Both are amazing, and
each one might suit your needs at a different level. For me the
solution came in Emacs, using evil-mode puts some sanity back into the
text editing.

[scipy talk]: https://www.youtube.com/watch?v=1-dUkyn_fZA
[keyboardio]: http://shop.keyboard.io/
[zim-wiki]: http://zim-wiki.org/
[Emacs talk]: https://www.youtube.com/watch?v=JWD1Fpdd4Pc
[Carsten Dominik talk]: https://www.youtube.com/watch?v=oJTwQvgfgMM
