![Build Status](https://codebuild.us-west-2.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiMFA2azY2aW5EcGdBK1JWalE5UE40YjVIZndKWGRSczFscTQrUU9ZNlE0YnZubitSZDhIcnNtQ1VMRmNhNjNmVHZsTm5RRmtNeG5MbGlQdGY5eWtwMWJJPSIsIml2UGFyYW1ldGVyU3BlYyI6InJBK2dpSGVPL1A0ZXlYaUoiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Webgl2App

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

If tests begin to fail on 2nd run, find assignment `this._discoveredLazyRoutes` and replace the ternary with the following code `this._discoveredLazyRoutes = this._getLazyRoutesFromNgtools();`

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `npm start`.

## AWS CodeBuild

The `buildspec.yml` file contains the orchestration definition that builds the environment and subsequently the code.

## AWS S3 Bucket

After the code successfully builds, the site is deployed to an S3 bucket which hosts the site.

## 2D

**Experimental**  
Since WebGL is still in development, some browsers automatically disable webgl2. If you find the site not working because the GL context is not available then this might be your problem. Open your browser and put `about:flags` in the url to navigate to these settings. Search for WebGL and enable the tools.

The 2D tab is the 2D canvas game engine sandbox. It is used to provide helpful insight 

## Pathfinder

The Pathfinder tab has the maze editor and A* pathfinder algorithm  
