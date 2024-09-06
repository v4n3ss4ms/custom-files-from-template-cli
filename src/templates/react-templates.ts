export const componentTemplate = (componentClassName: string, fileName: string) =>
`import React, { FC } from 'react';
import styles from './${fileName}.module.scss'
export const ${componentClassName}: FC = () => {

  return (
    <div>${componentClassName} component</div>
  );
}
`;

export const testTemplate = (componentClassName: string, fileName: string) =>
`import { render, screen } from '@testing-library/react';
import { ${componentClassName} } from './${fileName}.component';

describe('${componentClassName} Component', () => {
  test('it should render', () => {
    render(<${componentClassName} />);
    expect(screen.getByText('${componentClassName} component')).toBeInTheDocument();
  });
});
`;

export const styleTemplate = (componentClassName: string, fileName: string) =>
`.${componentClassName} {
}
`;
