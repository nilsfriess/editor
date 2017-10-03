import { Component, OnInit, OnDestroy } from '@angular/core'
import template from './notepad.component.html'
import style from './notepad.component.sass'
import { Observable } from 'rxjs'
import { Meteor } from 'meteor/meteor'
import { Router } from '@angular/router'
import { Accounts } from 'meteor/accounts-base'

import { FileService } from '../files.service'
import { Files } from '../../../../both/collections/files.collection'

@Component({
    selector: 'notepad',
    template,
    styles: [ style ]
})
export class NotepadComponent implements OnInit, OnDestroy {

    private timerHasTicked: boolean
    private lastSaveTime: string
    private timerSubscription
    private currentFileSubscription
    private editor: any
    user: Meteor.User

    editorConfig = {
        theme: 'snow'
    }

    modules = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            ['blockquote', 'code-block'],

            [{ 'list': 'ordered'}, { 'list': 'bullet' }],

            [{ 'size': ['small', false, 'large', 'huge'] }],

            [{ 'color': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }]
        ]
    }

    private editorContent = "Noch nichts notiert"

    constructor(private fileService: FileService, private router: Router) {
        this.timerHasTicked = false
    }

    ngOnInit() {


        this.timerSubscription = Observable.timer(0, 10000).subscribe(() => {
            this.timerHasTicked = true
        })

        let loggingInTimer = Observable.timer(0, 100)
        let subscription = loggingInTimer.subscribe(() => {
            if (!Meteor.loggingIn() && Meteor.user()) {
                this.user = Meteor.user()
                subscription.unsubscribe()
            }
        })

        this.currentFileSubscription = this.fileService.getCurrentFileObservable().subscribe(file => {
            if (file) {
                this.setLastSaveTime(file.lastSave)
                this.editor.root.innerHTML = file.content
                console.log(this.editor)
            }
                
        })
    }

    onEditorCreated(editor) {
        this.editor = editor
    }

    setLastSaveTime(date: Date) {
        if (!date)
            this.lastSaveTime = 'Noch nie'
        else
            this.lastSaveTime = date.getHours() 
                        + ':' + ((date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes())
                        + ':' + ((date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds()) 
                        + ' Uhr'
    }

    ngOnDestroy() {
        this.timerSubscription.unsubscribe()
        this.fileService.setCurrentFile()
        this.currentFileSubscription.unsubscribe()
    }

    onContentChanged({quill, html, text}) {
        if (!this.timerHasTicked || this.fileService.getCurrentFile().subjectID === '-1')
            return

        this.timerHasTicked = false
        Files.update(this.fileService.getCurrentFile()._id, {
            $set: { 
                content: html,
                lastSave: new Date() 
            }
        })

        this.setLastSaveTime(new Date())
    }

    saveClicked(editor) {
        let html = editor.editorElem.children[0].innerHTML

        Files.update(this.fileService.getCurrentFile()._id, {
            $set: { 
                content: html,
                lastSave: new Date() 
            }
        })

        this.setLastSaveTime(new Date())
    }

    onTitleChanged(event) {
        Files.update(this.fileService.getCurrentFile()._id, {
            $set: { name: event.target.value }
        })
    }

    logout() {
        Meteor.logout()
        this.router.navigateByUrl('/login')
    }
}