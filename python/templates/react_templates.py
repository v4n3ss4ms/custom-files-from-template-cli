def react_component_template(component_class_name, file_name):
    return f"""
import React, {{ FC }} from 'react';
import styles from './{file_name}.module.scss'

export const {component_class_name}: FC = () => {{

  return (
    <div>{component_class_name} component</div>
  );
}}
"""

def react_test_template(component_class_name, file_name):
    return f"""
import {{ render, screen }} from '@testing-library/react';
import {{ {component_class_name} }} from './{file_name}.component';

describe('{component_class_name} Component', () => {{
  test('it should render', () => {{
    render(<{component_class_name} />);
    expect(screen.getByText('{component_class_name} component')).toBeInTheDocument();
  }});
}});
"""

def react_style_template(component_class_name):
    return f""".{component_class_name} {{
}}
"""