import { Injectable } from '@angular/core';

import { ImageService } from './image.service';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class ImageResolveService implements Resolve<any> {

    constructor(private imageService: ImageService) { }

    /**
     * Image Data Resolver Service
     * returns 1 post object
     *
     * @returns Observable<any> - resolve: image <Buffer>
     *
     */
    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        const imageId = route.params.id;
        console.log('getting image with id: ', imageId);
        return this.imageService.getImageById(imageId).pipe()

    }
}

