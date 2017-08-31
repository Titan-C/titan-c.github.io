---
layout: post
title: Using U2F
categories: configs
---

Some time ago I became concerned to have two factor activation enabled
in my online accounts. First I started using the Google Authenticator
app on my Android phone, but it is very inconfortable to have to use
my phone every time. So I decided to try the FIDO U2F keys. The most
famous are from [Yubico], but they felt a bit to expensive to try
them out for convenience, and though they support GPG the starter key
just for authentication is also a bit expensive so I went for a
cheaper alternative that shall do the same with the [HyperFIDO U2F
Security Key], which was half the price, most certainly half the
features, too. The thing is that on their website you will only find
documentation to use to authenticate in Google accounts. This post is
to tell you how far I got in using it.

I'm using [Arch Linux] because it's great. The [HyperFIDO U2F Security
Key] is all plastic and the cap can't stay fixed after few insertions
of the key into the USB slot it is just an individual device. So the
indestructible feature of the yubico keys starts to look interesting.

First the standard. Get google to know about this key. When I directly
tried it failed and I was completely disapointed and thought I bought
shit and I should have gone for the yubico device. Nevertheless,
investigating a bit further I went to the Arch wiki on the [yubikey] where it
explicitly states that you need to install [libu2f-host] for the key to
work, and this is valid for yubikey too. So after installing my fido
key worked immediately with google authentication. So well done. I have
it working. Then do the same with Github where it works too. Great.

Now if you stop here is good. But better use this key to authenticate
your desktop login. Yes! two factor authentication just to access your
own computer. Althought I'm not in a unsafe environment I wanted to do
it just to learn and practice.

I found some reviews on this topic on [local-2FA] and
[linux-desktop-2FA] both say pretty much the same but I would not
figure it out with just one of them.

And here I present you my summary solution.

First install

```bash
yaourt -S pam_u2f
```

That shall pull some dependencies too.

<div class="alert alert-danger">
<strong>Danger</strong> from here on read everything before trying it out. So you
don't get locked out of your system.
</div>

Make a file that contains the U2F keys for all the users you are going
to allow login. That means if a user is not in this list and you
require 2FA he will not be able to log in.

```bash
pamu2fcfg -u myuser >> /tmp/u2f_maps
```

Then move this file to a safer place and change user and permissions

```bash
sudo mv /tmp/u2f_maps /etc/u2f_maps
sudo chown root:root /etc/u2f_maps
sudo chmod 400 /etc/u2f_maps
```

## Configuring PAM

I only think to need changing `/etc/pam.d/su` and
`/etc/pam.d/system-auth`, because the `system-auth` manages most of
the login authentication cases and then `su` is for changes once a
user is logged in.

to those files I add the line as last of the `auth` statements

```bash
auth    required pam_u2f.so cue authfile=/etc/u2f_maps
```

This will use the module of Yubico pam_u2f and require and
authentication with key. That's why you need to have all your users
listed in the file `/etc/u2f_maps`. `cue` writes a reminder that you
shall press the button on your key to log in. Otherwise you migth be
waiting a long time before you remember it yourself. If the key is not
pluged then there is no reminder message, your login just fails.

Now I also see the convenience of having the user register their key
under `~/.config/yubico/key` and a more personal config.



[Arch Linux]: https://www.archlinux.org
[Yubico]: https://www.yubico.com
[HyperFIDO U2F Security Key]: https://www.hypersecu.com/products/hyperfido
[yubikey]: https://wiki.archlinux.org/index.php/yubikey
[libu2f-host]: https://www.archlinux.org/packages/?name=libu2f-host
[local-2FA]: http://seabre.github.io/blog/2015/10/17/local-two-factor-authentication-with-u2f-on-ubuntu-14-dot-04/
[linux-desktop-2FA]: http://www.mikejonesey.co.uk/security/2fa/linux-desktop-2fa-with-pam-u2f
