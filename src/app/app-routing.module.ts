import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';
import { BlogComponent } from './blog/blog.component';
import { AboutComponent } from './about/about.component';
import { BlogGeneratorComponent } from './blog-generator/blog-generator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { PostResolveService } from './post-resolve.service';
import { ImageResolveService } from './image-resolve.service';
import { PurchaseComponent } from './purchase/purchase.component';
import { ImageComponent } from './image/image.component';
import { ResumeComponent } from './resume/resume.component';


const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, data: { animation: 'HomePage' } },
    { path: 'project', component: ProjectComponent, data: { animation: 'ProjectPage' } },
    {
        path: 'blog',
        children: [
            { path: '', component: BlogComponent, data: { animation: 'BlogPage' } },
            {
                path: ':id', component: BlogPostComponent, data: { animation: 'BlogPost', },
                resolve: {
                    postData: PostResolveService
                }
            }
        ]
    },
    { path: 'about', component: AboutComponent, data: { animation: 'AboutPage' } },
    { path: 'blog-gen', component: BlogGeneratorComponent },
    {
        path: 'purchase',
        children: [

            { path: '', component: PurchaseComponent, data: { animation: 'BlogPage' } },
            {
                path: ':id', component: ImageComponent,
                resolve: {
                    imageData: ImageResolveService
                },
            }


        ]
    },
    { path: 'resume', component: ResumeComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
    exports: [RouterModule],
    providers: [
        PostResolveService
    ]
})
export class AppRoutingModule { }
