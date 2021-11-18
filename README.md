# account

Easy to manage your various account passwords. Current support：

* account
* email
* server

## Downloads

Click [Actions](https://github.com/writethesky/account/actions) to download the app. Then click on any workflow, scroll
to the bottom of the page, and select the app that matches your operating system to download

## Q&A

### is damaged and can’t be opened. You should move it to the Trash

By default, the Mac only trusts apps downloaded from the Mac App Store and signed with a developer ID, but it also
blocks "honest apps" without a developer's signature.

To resolve the problem, run the `sudo xattr -rd com.apple.quarantine /Applications/account.app` command

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
