export const componentTemplate = (componentClassName: string, kebabCaseName: string) =>
`import { Component } from '@angular/core';

@Component({
  selector: 'app-${kebabCaseName}',
  templateUrl: './${kebabCaseName}.component.html',
  styleUrls: ['./${kebabCaseName}.component.scss']
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

export const testTemplate = (componentClassName: string, kebabCaseName: string) =>
`import { ${componentClassName} } from './${kebabCaseName}.component';

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
