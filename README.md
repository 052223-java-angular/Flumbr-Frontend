# Flumblr

Tumblr / Twitter Hybrid

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.5.

## Setup

Create a file called `environment.development.ts` under `src/environments` with the following content:

```typescript
export const environment = {
  production: false,
  apiBaseUrl: "http://localhost:5000/flumblr/api",
};
```

> Ensure the port is the same as the port you have configured in your [Flumblr Backend's](https://github.com/052223-java-angular/Flumblr-Backend) application.properties

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
