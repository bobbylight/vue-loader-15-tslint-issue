# vue-loader-15-tslint-issue
This project shows how a basic project using the following tools fails to build with vue-loader 15:

* TypeScript
* tslint
* webpack
* vue-loader 15

A similar setup worked with vue-loader 14.

## To Run:

```bash
git clone https://github.com/bobbylight/vue-loader-15-tslint-issue.git
npm install
npm run build
```

## Expected Result
The build completes successfully.

## Actual Result
As-is, with `typeCheck` disabled for `tslint-loader` in `webpack.config.js`, the build does
complete, but you cannot enable the `no-consecutive-blank-lines` rule because of how `vue-loader` blanks out
template/style lines instead of removing them.  Besides the fact that you can't use any `tslint` rules
that require type checking.

If you enable `typeCheck` for `tslint-loader` in `webpack.config.js`, the build fails with errors like
the following:

```
Invalid source file: D:\dev\vue-loader-15-tslint-issue\src\app\app.vue. Ensure that the files supplied to
lint have a .ts, .tsx, .d.ts, .js or .jsx extension.
```

It appears that when type checking, tslint is checking the actual file name (no `.ts` appended) and
is thus unhappy.
