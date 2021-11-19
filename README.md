# Account manager

![](./public/img/icon.png)

Easy to manage your various account passwords. Current support：

* account
* email
* server

**Ultimate security** can secure data transfers in extreme situations(e.g. your computer communications may be
monitored), more secure than HTTPS. Here's the problem with HTTPS, Some unscrupulous CA work with companies or
organizations to issue genuine and valid illegal certificates for man-in-the-middle attacks. Or you may use the work
computer provided by the company. The company may have a [hook tool](https://github.com/nabla-c0d3/ssl-kill-switch2)
preset on your computer, which can hook related functions of HTTPS

**Back-end services** To keep your data storage secure, it is recommended that you independently
deploy [the server](https://github.com/writethesky/account-server)
on your own server, then recompile the application and let your application communicate with your own server through
environment variables

## Downloads

Click [Actions](https://github.com/writethesky/account/actions) to download the app. Then click on any workflow, scroll
to the bottom of the page, and select the app that matches your operating system to download

## Q&A

### is damaged and can’t be opened. You should move it to the Trash

By default, the Mac only trusts apps downloaded from the Mac App Store and signed with a developer ID, but it also
blocks "honest apps" without a developer's signature.

To resolve the problem, run the command of `sudo xattr -rd com.apple.quarantine /Applications/Account.app`

## For developer

```
yarn install
```

### Set env

`export VUE_APP_API_URL = http://your-api-server.com`

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Compiles and minifies for production and run this app

```
yarn start
```

### make app

```
yarn make
```

### Run your unit tests

```
yarn test:unit
```

### Run your end-to-end tests

```
yarn test:e2e
```

### Lints and fixes files

```
yarn lint
```

### Generate icons

```
sips -z 1024 1024 book.png --out icons.iconset/icon_512x512@2x.png
iconutil -c icns icons.iconset -o icon.icns
```
