import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';

@Component({
    selector: 'ai-mobile-header',
    templateUrl: 'header.component.html',
    styleUrls: ['./header.scss']
})
export class MobileHeaderComponent implements OnInit {

    @Input() title;
    @Input() hasBack = false;

    constructor(private location: Location) {

    }

    ngOnInit(): void {
    }

    goBack() {
        this.location.back();
    }
}