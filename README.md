# vue-loader-15-tslint-issue
This project shows how a basic project using the following tools fails to build with vue-loader 15:

* TypeScript
* tslint
* webpack
* vue-loader 15

A similar setup worked with vue-loader 14.  It appears that vue-loader is passing the TS content to
tsc, but tsc is unhappy with the `.vue` file extension.

To run:

```bash
git clone https://github.com/bobbylight/vue-loader-15-tslint-issue.git
npm install
npm run build
```
