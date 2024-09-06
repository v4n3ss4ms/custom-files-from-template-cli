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

type SettingTemplate = {
  template: (componentClassName: string, fileName: string) => string;
  extension: string;
};

type FrameworkSettings = {
  name: FrameworkType;
  templates: {
    component?: SettingTemplate;
    style?: SettingTemplate;
    test?: SettingTemplate;
    html?: SettingTemplate;
  };
};

const FRAMEWORKS_SETTINGS: Record<FrameworkType, FrameworkSettings> = {
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

function getFrameworks() {
  return Object.keys(FRAMEWORKS_SETTINGS)
}

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
      choices: getFrameworks(),
    },
  ]);
}

function successCreationLog(componentClassName: string, componentDir: string) {
  console.log(`Component ${componentClassName} created successfully at ${componentDir}`);
}

async function createComponent() {
  const { componentName, framework } = await promptForComponent();
  const { className, fileName, componentDir } = getComponentSettings(componentName);
  const frameworkKey = framework as FrameworkType;
  const frameworkTemplates = FRAMEWORKS_SETTINGS[frameworkKey].templates;

  fs.ensureDirSync(componentDir);

  Object.entries(frameworkTemplates).map(([_, tmpl]) => {
      const content = tmpl.template(className, fileName);
      fs.writeFileSync(path.join(componentDir, `${fileName}${tmpl.extension}`), content);
  });

  successCreationLog(className, componentDir);
}

const program = new Command();

program
    .version('1.0.0')
    .description('CLI - component creation from template')
    .action(createComponent);

program.parse(process.argv);
