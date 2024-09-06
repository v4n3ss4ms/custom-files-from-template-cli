export const componentTemplate = (componentClassName: string, fileName: string) =>
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

export const htmlTemplate = (componentClassName: string) =>
`<p>
  ${componentClassName} works!
</p>
`;

export const testTemplate = (componentClassName: string, fileName: string) =>
`import { ${componentClassName} } from './${fileName}.component';

describe('${componentClassName} Component', () => {
  test('it should render', () => {
    render(${componentClassName});
    expect(screen.getByText('${componentClassName} component')).toBeInTheDocument();
  });
});
`;

export const styleTemplate = () =>
`/* Add your styles here */
`;
