import { Component, OnInit } from '@angular/core'
import { Accounts } from 'meteor/accounts-base'
import { Meteor } from 'meteor/meteor'
import { Router } from '@angular/router'

import { FileService } from '../files.service'

import template from './login.component.html'
import style from './login.component.sass'

interface Credentials {
    mail : string,
    password : string,
    passwordCnf?: string
}

@Component({selector: 'login', template, styles: [style]})
export class LoginComponent implements OnInit {

    private signup : boolean = false
    private credentials : Credentials
    private error : string

    constructor(private router : Router, private fileService: FileService) {
        this.credentials = {
            mail: '',
            password: ''
        }
    }
    
    ngOnInit() {
        /*if (Meteor.userId())
            this.router.navigateByUrl('/editor')*/
    }

    doLogin() {
        Meteor.loginWithPassword(this.credentials.mail, this.credentials.password, (error) => {
            if (error) {
                this.error = error.reason || "Fehler bei der Anmeldung"
            } else {
                this.router.navigateByUrl('/editor')
            }
        })

        this.fileService.newUser()
    }

    doSignup() {
        if (this.credentials.password !== this.credentials.passwordCnf) {
            this.error = "Passwörter stimmen nicht überein"
            return
        }

        Accounts.createUser({
            email: this.credentials.mail,
            password: this.credentials.password
        }, (error) => {
            if (error) 
                this.error = error.reason || "Unbekannter Fehler"
            else {
                this.doLogin()
            }
        })
    }
}