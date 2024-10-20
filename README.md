## What's inside?

This is Monorepo setup of Futsa : Futsal Booking and management system.
This Turborepo includes the following packages/apps:

### Apps and Packages

- `web`: Admin app [Next.js](https://nextjs.org/) app
- `mob`: an expo app reactnative for users.
- `core`: mutually sharing codes for both mobile and web.
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Develop

To develop all apps and packages, run the following command:

```
cd futsa-finalproject
yarn dev
yarn start:mob
```

