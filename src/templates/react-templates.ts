export const componentTemplate = (componentClassName: string) =>
`import React, { FC } from 'react';
export const ${componentClassName}: FC = () => {

  return (
    <div>${componentClassName} component</div>
  );
}
`;

export const testTemplate = (componentClassName: string, kebabCaseName: string) =>
`import { render, screen } from '@testing-library/react';
import { ${componentClassName} } from './${kebabCaseName}.component';

describe('${componentClassName} Component', () => {
  test('it should render', () => {
    render(<${componentClassName} />);
    expect(screen.getByText('${componentClassName} component')).toBeInTheDocument();
  });
});
`;

export const styleTemplate = (componentName: string) =>
    `.${componentName} {
}
`;
