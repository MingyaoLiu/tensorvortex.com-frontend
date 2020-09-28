import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ImagePreloadService } from '../image-preload.service';

@Component({
    selector: 'app-init-loader',
    templateUrl: './init-loader.component.html',
    styleUrls: ['./init-loader.component.less']
})
export class InitLoaderComponent implements OnInit {


    @ViewChild('progress_page', { read: ElementRef, static: true }) progressPage: ElementRef;
    progressBarCircum = 48 * 2 * Math.PI;
    strokeColor = '#FFF';

    private images = [  // aot compiler extract files from assets directory.
        '../bg_1280_548_5.png',
        '../bg_1280_548_2.png',
        '../bg_1280_548_3.png',
        '../bg_1280_548_4.png',
    ];

    constructor(private imagePreloadService: ImagePreloadService, private renderer: Renderer2) { }

    ngOnInit() {
        console.log('version is ' + environment.version);
        if (environment.production === false) {
            console.log('detect environment is dev');
            this.images = [
                '../assets/bg_1280_548_5.png',
                'http://orig15.deviantart.net/d950/f/2009/187/9/8/big_wallpaper_05_1920x1200_by_kittenkiss.jpg',
                '../assets/bg_1280_548_2.png',
                'http://i2.cdn.turner.com/cnnnext/dam/assets/130419165742-dzhokar-tsarnaev-vk-exlarge-169.jpg',
                '../assets/bg_1280_548_3.png',
                'http://www.pageresource.com/wallpapers/wallpaper/fantasy-dual-big-kyleabaker_791679.jpg',
                '../assets/bg_1280_548_4.png',
                'https://www.google.com/images/srpr/logo11w.png',
                'https://s.yimg.com/pw/images/sohp_2014/trees_noblur.jpg',
            ];
            this.fadeOutProgress();
            // setTimeout(() => {
            //     this.preloadImages();
            // }, 2000);
        } else {
            setTimeout(() => {
                this.preloadImages();
            }, 2000);
        }


    }

    ngAfterViewInit(): void {
        // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        // Add 'implements AfterViewInit' to the class.

    }

    private preloadImages() {
        const strongThis = this;
        this.imagePreloadService.preloadImages(strongThis.images, (percentage) => {

            if (percentage === 1) {
                strongThis.fadeOutProgress();
            }
        });
    }

    private fadeOutProgress() {
        setTimeout(() => {
            this.renderer.setStyle(
                this.progressPage.nativeElement,
                'opacity',
                '0'
            );
            setTimeout(() => { // Set Display to None after fade out
                this.renderer.setStyle(
                    this.progressPage.nativeElement,
                    'display',
                    'none'
                );
            }, 1000);
        }, 1000);

    }
}
