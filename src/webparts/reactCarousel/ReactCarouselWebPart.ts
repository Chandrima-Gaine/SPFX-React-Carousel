import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ReactCarouselWebPartStrings';
import ReactCarousel from './components/ReactCarousel';
import { IReactCarouselProps } from './components/IReactCarouselProps';

export interface IReactCarouselWebPartProps {
  description: string;
}

export default class ReactCarouselWebPart extends BaseClientSideWebPart<IReactCarouselWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IReactCarouselProps > = React.createElement(
      ReactCarousel,
      {
        description: this.properties.description,
        serviceScope: this.context.serviceScope
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
