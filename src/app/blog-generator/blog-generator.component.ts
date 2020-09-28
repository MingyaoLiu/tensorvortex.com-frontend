import { Component, OnInit } from '@angular/core';
import { TouchSequence } from 'selenium-webdriver';
import { PostResolveService } from '../post-resolve.service';
import { BlogService } from '../blog.service';

@Component({
    selector: 'app-blog-generator',
    templateUrl: './blog-generator.component.html',
    styleUrls: ['./blog-generator.component.less']
})
export class BlogGeneratorComponent implements OnInit {

    constructor(private blogService: BlogService) { }



    reservedObj = {
        title: "placeholder",
        author : "[db] Author Name Str",
        subTitle : "[db] This is a level 1 subtitle",
        article: [
        {
            tag: 'h1',
            txt: 'title',
            url: '',
            class: 'normal_text',
        },
        {
            tag: 'p',
            txt: 'sss',
            url: '',
            class: 'normal_text',
        }
    ]};

    tagArray = ['h1', 'h2', 'p', 'span', 'img', 'b', 'i', 'html' ]
    
    classArray = ['normal_text']

    generatedHTML = '<p>Generated HTML</p>';

    drafts = [];

    selectedDraft = this.reservedObj;

    ngOnInit() {
        const strongThis = this;
        this.blogService.getDrafts().subscribe((data: any) => {
            strongThis.drafts = data;
        })
    }


    loadDraft(id) {
        const strongThis = this;
        this.blogService.getDraft(id).subscribe((data: any) => {
            strongThis.selectedDraft = data;
        })
    }

    selectDraft($event, i) {
        this.selectedDraft = this.drafts[i];
        this.generateHTML();
    }


    // Auto Refresh and generate HTML

    generateHTML() {
        this.generatedHTML = '';
        const strongThis = this;
        this.selectedDraft.article.forEach((obj) => {
            switch (obj.tag) {
                case 'html': {
                    strongThis.generatedHTML += obj;
                }
                case 'img': {
                    strongThis.generatedHTML += '<' + obj.tag + ' class="' + obj.class + '" ' + ' >' + obj.txt + '</' + obj.tag + '>';
                }
                default : {
                    strongThis.generatedHTML += '<' + obj.tag + ' class="' + obj.class + '" ' + ' >' + obj.txt + '</' + obj.tag + '>';
                }

            }
        });
    }

    updateText($event, i) {
        this.generateHTML();
        console.log(i);
        console.log($event);
    }

    // Blog Gen Button Control

    updateParaTag($event, i) {
        console.log(i);
        console.log($event);
        this.selectedDraft.article[i].tag = $event
        this.generateHTML();
    }

    updateParaClass($event, i) {
        console.log(i);
        console.log($event);
        this.selectedDraft.article[i].class = $event
        this.generateHTML();
    }

    addNewPara(i) {
        let emptyObj = {
            tag: '',
            txt: '',
            url: '',
            class: '',
        }
        this.selectedDraft.article.splice(i+1, 0, emptyObj);
    }



}
