# What is it?
Mainly an excuse to build something in Slim and share / collaborate with others.  If it helps our user group, great.  If it helps other user groups..even better.

## Will you accept PR's?
You betcha.  There are SOooo many ways to improve.  Track who won, remove them from list, track across meetings, etc.

PR's certain welcome!

## Style Guide

All pull requests must adhere to the [PSR-2 standard](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-2-coding-style-guide.md).

# Setup
## Install Composer

If you have not installed Composer, do that now. I prefer to install Composer globally in `/usr/local/bin`, but you may also install Composer locally in your current working directory. For this tutorial, I assume you have installed Composer locally.

<http://getcomposer.org/doc/00-intro.md#installation>

## Install the Application dependencies

> php composer.phar install

## edit config/local.php
copy config/local-dist.php to local.php

Add your meetup.com url name and API Key.

You can find your meetup.com api key here: https://secure.meetup.com/meetup_api/key/

DO NOT check in your new local.php file.

# Run!

> cd public
> php -S localhost:9999