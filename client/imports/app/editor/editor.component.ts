import { Component, OnInit } from '@angular/core'
import { Location } from '@angular/common'
import { Router } from '@angular/router'
import { Meteor } from 'meteor/meteor'

import template from './editor.component.html'
import style from './editor.component.sass'

@Component({
    selector: 'editor',
    template,
    styles: [ style ]
})
export class EditorComponent implements OnInit {
    constructor(private router: Router, private location: Location) {

    }

    ngOnInit() {
        if (!Meteor.userId()) {
            this.location.replaceState('/'); // clears browser history so they can't navigate with back button
            this.router.navigateByUrl('/login');
        }
    }
}