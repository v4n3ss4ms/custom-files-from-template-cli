#!/usr/bin/env python

import inquirer
import os
from utils.string_utils import to_kebab_case, to_camel_case, to_pascal_case, to_snake_case
from templates.angular_templates import angular_component_template, angular_html_template, angular_test_template, angular_style_template
from templates.react_templates import react_component_template, react_test_template, react_style_template


def create_component(name, framework):
    file_name = to_kebab_case(name)
    class_name = to_pascal_case(name)
    os.makedirs(file_name, exist_ok=True)

    if framework == 'Angular':
        with open(os.path.join(file_name, f"{file_name}.component.ts"), 'w') as f:
            f.write(angular_component_template(class_name, file_name))

        with open(os.path.join(file_name, f"{file_name}.component.html"), 'w') as f:
            f.write(angular_html_template(class_name))

        with open(os.path.join(file_name, f"{file_name}.component.spec.ts"), 'w') as f:
            f.write(angular_test_template(class_name, file_name))

        with open(os.path.join(file_name, f"{file_name}.component.scss"), 'w') as f:
            f.write(angular_style_template(class_name))

    elif framework == 'React':
        with open(os.path.join(file_name, f"{file_name}.component.tsx"), 'w') as f:
            f.write(react_component_template(class_name, file_name))

        with open(os.path.join(file_name, f"{file_name}.component.test.tsx"), 'w') as f:
            f.write(react_test_template(class_name, file_name))

        with open(os.path.join(file_name, f"{file_name}.module.scss"), 'w') as f:
            f.write(react_style_template(class_name))

    print(f"{framework} component '{name}' created successfully!")


def prompt_for_component():
    questions = [
        inquirer.Text('name', message="What's the name of the component?"),
        inquirer.List('framework',
                      message="Which framework are you using?",
                      choices=['React', 'Angular'],
                     ),
    ]
    answers = inquirer.prompt(questions)
    return answers

def main():
    answers = prompt_for_component()
    name = answers['name']
    framework = answers['framework']

    create_component(name, framework)

if __name__ == "__main__":
    main()
