import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';

import { environment } from '../environments/environment';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';
import { BlogComponent } from './blog/blog.component';
import { AboutComponent } from './about/about.component';
import { GoogleAnalyticsService } from './google-analytics.service';
import { ImagePreloadService } from './image-preload.service';
import { BlogService } from './blog.service';
import { fromEventPattern } from 'rxjs';
import { InitLoaderComponent } from './init-loader/init-loader.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { MenuBtnComponent } from './menu-btn/menu-btn.component';
import { FooterComponent } from './footer/footer.component';
import { BlogGeneratorComponent } from './blog-generator/blog-generator.component';

import { DropdownDirective } from './drop-down.directive';
import { PurchaseComponent } from './purchase/purchase.component';
import { ImageComponent } from './image/image.component';
import { ImageResolveService } from './image-resolve.service';
import { ResumeComponent } from './resume/resume.component';

@NgModule({
    declarations: [
        AppComponent,
        SideNavComponent,
        HomeComponent,
        ProjectComponent,
        BlogComponent,
        AboutComponent,
        InitLoaderComponent,
        BlogPostComponent,
        MenuBtnComponent,
        FooterComponent,
        BlogGeneratorComponent,
        DropdownDirective,
        PurchaseComponent,
        ImageComponent,
        ResumeComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        FontAwesomeModule,
        HttpClientModule
    ],
    providers: [
        GoogleAnalyticsService,
        ImagePreloadService,
        BlogService,
        ImageResolveService
    ],
    bootstrap: [AppComponent]
})

export class AppModule {

    constructor(protected _googleAnalyticsService: GoogleAnalyticsService) {
        this.appendGaTrackingCode();
    }

    private appendGaTrackingCode() {
        try {
            const script = document.createElement('script');
            script.innerHTML = `
                (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

                ga('create', '` + environment.googleAnalyticsKey + `', 'auto');
            `;
            document.head.appendChild(script);
        } catch (ex) {
            console.error('Error appending google analytics');
            console.error(ex);
        }
    }
}
