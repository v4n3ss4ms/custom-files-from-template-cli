#!/usr/bin/env node

import { Command } from 'commander';
import * as fs from 'fs-extra';
import * as path from 'path';
import inquirer from 'inquirer';
import { toKebabCase, toPascalCase } from './utils/stringUtils';
import {
  componentTemplate as reactComponentTemplate,
  styleTemplate as reactStyleTemplate,
  testTemplate as reactTestTemplate
} from './templates/react-templates';
import {
  componentTemplate as angularComponentTemplate,
  htmlTemplate as angularHtmlTemplate,
  styleTemplate as angularStyleTemplate,
  testTemplate as angularTestTemplate
} from './templates/angular-templates';

type FrameworkType = 'React' | 'Angular';
type FrameworkOptionsType = 'tests' | 'styles';

const FrameworkOptionsMap: Record<FrameworkOptionsType, FrameworkOptionsType> = {
  tests: 'tests',
  styles: 'styles',
};

type FrameworkInfo = {
  name: FrameworkType;
  createComponent: (componentName: string, options: FrameworkOptionsType[]) => void;
};

const FrameworkSettings: Record<FrameworkType, FrameworkInfo> = {
  React: { name: 'React', createComponent: createReactComponent },
  Angular: { name: 'Angular', createComponent: createAngularComponent },
};

function getComponentSettings(name: string) {
  const className = toPascalCase(name);
  const fileName = toKebabCase(name);
  const componentDir = path.join(process.cwd(), fileName);

  return {
    className,
    fileName,
    componentDir,
  }
}

function promptForComponent() {

  return inquirer.prompt([
    {
      type: 'input',
      name: 'componentName',
      message: 'What is the name of your new component?',
      validate: (input: string) => (!input) ? 'Component name is required' : true,
    },
    {
      type: 'list',
      name: 'framework',
      message: 'Framework?',
      choices: [FrameworkSettings.React.name, FrameworkSettings.Angular.name],
    },
    {
      type: 'checkbox',
      name: 'options',
      message: 'Do you need tests and SCSS? Checked by default',
      choices: [
        { name: 'Tests', value: FrameworkOptionsMap.tests, checked: true },
        { name: 'SCSS', value: FrameworkOptionsMap.styles, checked: true },
      ],
    },
  ]);
}

function createReactComponent(componentName: string, options: FrameworkOptionsType[]) {
  const { className, fileName, componentDir } = getComponentSettings(componentName);

  const componentContent = reactComponentTemplate(className);
  const testContent = reactTestTemplate(className, fileName);
  const styleContent = reactStyleTemplate(fileName);

  fs.ensureDirSync(componentDir);

  fs.writeFileSync(path.join(componentDir, `${fileName}.component.tsx`), componentContent);

  if (options.includes(FrameworkOptionsMap.styles)) {
    fs.writeFileSync(path.join(componentDir, `${fileName}.module.scss`), styleContent);
  }

  if (options.includes(FrameworkOptionsMap.tests)) {
    fs.writeFileSync(path.join(componentDir, `${fileName}.component.test.tsx`), testContent);
  }

  successCreationLog(className, componentDir);
}

function createAngularComponent(componentName: string, options: FrameworkOptionsType[]) {
  const { className, fileName, componentDir } = getComponentSettings(componentName);

  const componentContent = angularComponentTemplate(className, fileName);
  const templateContent = angularHtmlTemplate(className);
  const styleContent = angularStyleTemplate();
  const testContent = angularTestTemplate(className, fileName);

  fs.ensureDirSync(componentDir);

  fs.writeFileSync(path.join(componentDir, `${fileName}.component.ts`), componentContent);
  fs.writeFileSync(path.join(componentDir, `${fileName}.component.html`), templateContent);

  if (options.includes(FrameworkOptionsMap.styles)) {
    fs.writeFileSync(path.join(componentDir, `${fileName}.module.scss`), styleContent);
  }

  if (options.includes(FrameworkOptionsMap.tests)) {
    fs.writeFileSync(path.join(componentDir, `${fileName}.component.spec.ts`), testContent);
  }

  successCreationLog(className, componentDir);
}

function successCreationLog(componentClassName: string, componentDir: string) {
  console.log(`Component ${componentClassName} created successfully at ${componentDir}`);
}

async function createComponent() {
  const { componentName, framework, options } = await promptForComponent();

  const frameworkKey = framework as FrameworkType;
  const frameworkOptions = options as FrameworkOptionsType[];
  const frameworkSettings = FrameworkSettings[frameworkKey];

  frameworkSettings.createComponent(componentName, frameworkOptions);
}

const program = new Command();

program
    .version('1.0.0')
    .description('CLI - component creation from template')
    .action(createComponent);

program.parse(process.argv);
