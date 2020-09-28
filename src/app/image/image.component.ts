import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.less']
})
export class ImageComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private sanitizer: DomSanitizer) {

  }
  imageObj: any;
  ngOnInit(): void {
    this.route.data.subscribe((data: any) => {
      let blob = new Blob([data.imageData], { type: "image/png" });
      let url = window.URL.createObjectURL(blob);
      // document.getElementById('imageWrapper').style.background = url;
      this.imageObj = this.sanitizer.bypassSecurityTrustUrl(url);
      console.log(this.imageObj)
    });

  }

}
