# CLI - component creation from template

## Table of Contents

1. [How to Use](#how-to-use)
    - [1 - Install Dependencies](#1---install-dependencies)
    - [2 - Start the Application](#2---start-the-application)
2. [How to Add More Frameworks](#how-to-add-more-frameworks)
    - [1 - Create the Templates File](#1---create-the-templates-file)
    - [2 - Add Your New Framework Type](#2---add-your-new-framework-type)
    - [3 - Add Settings](#3---add-settings)
3. [How to Add More Questions](#how-to-add-more-questions)


## How to use

### 1 - Install dependencies

Run `npm install`

### 2 - Start the application

Run `npm run dev`

Follow the terminal instructions 

## How to add more frameworks

### 1 - Create the templates file

You can use any of the existing ones as examples (i.e `/templates/react-templates.ts`).

### 2 - Add your new framework type

`type FrameworkType = 'React' | 'Angular' | 'NewFramework';`

### 3 - Add settings

```javascript
const FRAMEWORKS_SETTINGS: Record<FrameworkType, FrameworkSettings> = {
  React: {...},
  Angular: {...},
  NewFramework: {
    name: 'NewFramework',
    templates: {
      component: {
        template: getNewFrameworkTemplate('component'),
        extension: '.component_extension.ts',
      },
      style: {
        template: getNewFrameworkTemplate('style'),
        extension: '.component_extension.scss',
      },
    },
  },
};
```
## How to add more questions

You can read the `inquirer` documentation on [the npm page](https://www.npmjs.com/package/inquirer) or [the repository](https://github.com/SBoudrias/Inquirer.js)
