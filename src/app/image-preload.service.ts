import { Injectable } from '@angular/core';
import { GoogleAnalyticsService } from './google-analytics.service';

@Injectable({
    providedIn: 'root'
})


export class ImagePreloadService {

    constructor(private googleAnalyticsService: GoogleAnalyticsService) {
    }

    /**
     * Input a list of image to load, callback percentage load status of all images.
     *
     *
     * @param images - string[] list of url of image assets.
     *
     * @returns void
     * @callback percentage load progress of the images.
     *
     */
    public preloadImages(images: string[], callback: (progress: number) => void) {
        const numberOfImage = images.length;
        let currentLoaded = 0;
        const strongThis = this;
        images.map((imgUrl) => { // choosing map over for-loop for code clearity.
            const image = new Image();
            image.src = imgUrl;
            const imageLoadListener: EventListenerOrEventListenerObject = () => {
                currentLoaded += 1;
                callback(currentLoaded / numberOfImage);
                image.removeEventListener('load', imageLoadListener);
                image.removeEventListener('error', imageErrorListener);
            };
            const imageErrorListener: EventListenerOrEventListenerObject = () => {
                strongThis.googleAnalyticsService.emitEvent('Images', 'loadError', imgUrl);
                currentLoaded += 1;
                callback(currentLoaded / numberOfImage);
                image.removeEventListener('load', imageLoadListener);
                image.removeEventListener('error', imageErrorListener);
            };
            image.addEventListener('load', imageLoadListener);
            image.addEventListener('error', imageErrorListener);
        });
    }

}
