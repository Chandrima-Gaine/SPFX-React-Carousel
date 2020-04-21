import * as React from 'react';
import styles from './ReactCarousel.module.scss';
import { IReactCarouselProps } from './IReactCarouselProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { IReactCarouselState } from './IReactCarouselState';

import { ServiceScope } from '@microsoft/sp-core-library';
import { ImageService } from '../../../services/ImageService';
import { IDataService } from '../../../services/IDataService';

export default class ReactCarousel extends React.Component<IReactCarouselProps, IReactCarouselState> {
  private dataCenterServiceInstance: IDataService;

  public constructor(props: IReactCarouselProps, state: IReactCarouselState) {
    super(props);

    this.state = {
      imageURLs: []
    };

    let serviceScope: ServiceScope = this.props.serviceScope;
    this.dataCenterServiceInstance = serviceScope.consume(ImageService.serviceKey);

    this.dataCenterServiceInstance.getImages('ChandrimaPicLib').then((carouselItems: any) => {
      this.setState({
        imageURLs: carouselItems
      });
    });
  }

  public render(): React.ReactElement<IReactCarouselProps> {
    return (
      <div className={ styles.reactCarousel }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>!!! Gallery !!!</span>
              <p className={ styles.subTitle }>SharePoint Framework - React-based Carousel</p>
              <p className={ styles.description }>Chandrima's Photo Gallery using ReactCarousel</p>
              <Carousel showThumbs={false} autoPlay={true}>
                {this.state.imageURLs.map((imageList) => {
                  return (<div>
                    <img src={imageList} />
                  </div>);
                })}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
