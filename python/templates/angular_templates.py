def angular_component_template(component_class_name, file_name):
    return f"""
import {{ Component }} from '@angular/core';

@Component({{
  selector: 'app-{file_name}',
  templateUrl: './{file_name}.component.html',
  styleUrls: ['./{file_name}.component.scss']
}})
export class {component_class_name} {{
  // Component logic here
}}
"""

def angular_html_template(component_class_name):
    return f"<p>{component_class_name} works!</p>"

def angular_test_template(component_class_name, file_name):
    return f"""
import {{ {component_class_name} }} from './{file_name}.component';

describe('{component_class_name} Component', () => {{
  test('it should render', () => {{
    render({component_class_name});
    expect(screen.getByText('{component_class_name} component')).toBeInTheDocument();
  }});
}});
"""

def angular_style_template(component_class_name):
    return "/* Add your styles here */"