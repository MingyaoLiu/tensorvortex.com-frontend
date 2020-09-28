import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { catchError, tap, map } from 'rxjs/operators';
import { BlogService } from '../blog.service';
import { faWindowClose } from '@fortawesome/free-regular-svg-icons';

@Component({
    selector: 'app-blog-post',
    templateUrl: './blog-post.component.html',
    styleUrls: ['./blog-post.component.less']
})
export class BlogPostComponent implements OnInit {


    faWindowClose = faWindowClose;
    constructor(private blogService: BlogService, private router: Router, private route: ActivatedRoute) {

    }

    postObj: any;

    ngOnInit() {

        this.route.data.subscribe((data: any) => {
            this.postObj = data.postData;
            console.log(this.postObj);
        });

    }

}
