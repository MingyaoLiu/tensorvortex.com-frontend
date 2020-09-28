import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, AfterContentInit, Renderer2 } from '@angular/core';
import { GoogleAnalyticsService } from '../google-analytics.service';
import { BlogService } from '../blog.service';
@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.less']
})
export class BlogComponent implements OnInit, AfterViewInit, AfterContentInit {


    ga: GoogleAnalyticsService;

    posts: object[] = [];


    constructor(googleAnalytics: GoogleAnalyticsService, private renderer: Renderer2, private blogService: BlogService) {
        this.ga = googleAnalytics;
    }

    @ViewChild('headerRef', { read: ElementRef, static: true }) headerRef: ElementRef;
    @ViewChild('ttref', { read: ElementRef, static: true }) ttref: ElementRef;
    @ViewChild('vtref', { read: ElementRef, static: true }) vtref: ElementRef;


    ttInitMarginLeft = 0;
    ttInitMarginTop = 0;
    vtInitMarginLeft = 0;
    vtInitMarginTop = 0;


    ngOnInit() {

        this.blogService.getBlogs().subscribe((data: Array<object>) => {
            this.posts = data;
            console.log(this.posts);
        });

        console.log(this.ttref.nativeElement.style.marginLeft)
        console.log(this.vtref.nativeElement.style.marginLeft)

    }

    ngAfterViewInit(): void {
        this.ttInitMarginLeft = Number(this.ttref.nativeElement.style.marginLeft.slice(0, -3));
        this.ttInitMarginTop = Number(this.ttref.nativeElement.style.marginTop.slice(0, -3));
        this.vtInitMarginLeft = Number(this.vtref.nativeElement.style.marginLeft.slice(0, -3));
        this.vtInitMarginTop = Number(this.vtref.nativeElement.style.marginTop.slice(0, -3));



    }

    ngAfterContentInit() {
    }

    onMouseMove(e) {

        const targetWidth = e.target.clientWidth;
        const targetHeight = e.target.clientHeight;

        const mousePostionX = e.clientX;
        const mousePostionY = e.clientY;

        // this.ttref.nativeElement.style.marginTop = String((targetHeight - mousePostionY) / 400 + this.ttInitMarginTop) + 'rem';

        // this.vtref.nativeElement.style.marginTop = String((targetHeight - mousePostionY) / 400 + this.vtInitMarginTop) + 'rem';
        // this.renderer.setStyle(
        //     this.headerRef.nativeElement,
        //     'border-left',
        //     '22px dashed olive'
        // );
        // console.log(this.headerRef.nativeElement.querySelector('#blog-header-float-left').style)


    }

}
