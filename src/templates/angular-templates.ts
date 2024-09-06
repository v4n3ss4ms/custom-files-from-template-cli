const componentTemplate = (componentClassName: string, fileName: string) =>
`import { Component } from '@angular/core';

@Component({
  selector: 'app-${fileName}',
  templateUrl: './${fileName}.component.html',
  styleUrls: ['./${fileName}.component.scss']
})
export class ${componentClassName} {
  // Component logic here
}
`;

const htmlTemplate = (componentClassName: string, fileName: string) =>
`<p>
  ${componentClassName} works!
</p>
`;

const testTemplate = (componentClassName: string, fileName: string) =>
`import { ${componentClassName} } from './${fileName}.component';

describe('${componentClassName} Component', () => {
  test('it should render', () => {
    render(${componentClassName});
    expect(screen.getByText('${componentClassName} component')).toBeInTheDocument();
  });
});
`;

const styleTemplate = (componentClassName: string, fileName: string) =>
`/* Add your styles here */
`;

export const getTemplate = (type: string) => {
  switch(type) {
    case 'component':
      return componentTemplate;
    case 'html':
      return htmlTemplate;
    case 'test':
      return testTemplate;
    case 'style':
      return styleTemplate;
    default:
      return () => 'template';
  }
}