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

// type FrameworkInfo = {
//   name: FrameworkType;
//   createComponent: (componentName: string, options: FrameworkOptionsType[]) => void;
// };


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

const FrameworkSettings: Record<FrameworkType, any> = { // TODO: remove any
  React: {
    name: 'React',
    templates: {
      component: {
        template: reactComponentTemplate,
        extension: '.component.tsx',
      },
      style: {
        template: reactStyleTemplate,
        extension: '.module.scss',
      },
      test: {
        template: reactTestTemplate,
        extension: '.component.test.tsx',
      },
    },
  },
  Angular: {
    name: 'Angular',
    templates: {
      component: {
        template: angularComponentTemplate,
        extension: '.component.ts',
      },
      style: {
        template: angularStyleTemplate,
        extension: '.component.scss',
      },
      test: {
        template: angularTestTemplate,
        extension: '.component.spec.ts',
      },
      html: {
        template: angularHtmlTemplate,
        extension: '.component.html',
      },
    },
  },
};

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

function successCreationLog(componentClassName: string, componentDir: string) {
  console.log(`Component ${componentClassName} created successfully at ${componentDir}`);
}

async function createComponent() {
  const { componentName, framework, options } = await promptForComponent();

  const frameworkKey = framework as FrameworkType;

  const { className, fileName, componentDir } = getComponentSettings(componentName);

  const frameworkSettings = FrameworkSettings[frameworkKey];

  fs.ensureDirSync(componentDir);

  const componentContent = frameworkSettings.templates.component.template(className, fileName);
  fs.writeFileSync(path.join(componentDir, `${fileName}${frameworkSettings.templates.component.extension}`), componentContent);

  if (options.includes(FrameworkOptionsMap.styles)) {
    const styleContent = frameworkSettings.templates.style.template(fileName);
    fs.writeFileSync(path.join(componentDir, `${fileName}${frameworkSettings.templates.style.extension}`), styleContent);
  }

  if (options.includes(FrameworkOptionsMap.tests)) {
    const testContent = frameworkSettings.templates.test.template(className, fileName);
    fs.writeFileSync(path.join(componentDir, `${fileName}${frameworkSettings.templates.test.extension}`), testContent);
  }

  if (frameworkSettings.templates.html) {
    const htmlContent = frameworkSettings.templates.html.template(className);
    fs.writeFileSync(path.join(componentDir, `${fileName}${frameworkSettings.templates.html.extension}`), htmlContent);
  }

  successCreationLog(className, componentDir);
}

function writeFile(componentName: string) {
  const { className, fileName, componentDir } = getComponentSettings(componentName);
}







const program = new Command();

program
    .version('1.0.0')
    .description('CLI - component creation from template')
    .action(createComponent);

program.parse(process.argv);
