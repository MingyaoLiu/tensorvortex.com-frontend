import { Component, OnInit } from '@angular/core';

import { slideInAnimation } from '../animation';
import { faGithub, faFacebook, faTwitter, faInternetExplorer, faChrome } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faGlobe, faPhone } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.less']
})

export class ResumeComponent implements OnInit {

  constructor() { }
  faGithub = faGithub;
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faIE = faInternetExplorer;
  faChrome = faChrome;
  faGlobe = faGlobe;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  ngOnInit() {
  }
}
