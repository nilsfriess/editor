import { Component, OnInit } from '@angular/core'
import template from './notepad.component.html'
import style from './notepad.component.sass'
import { Observable } from 'rxjs'

import { FileService } from '../files.service'
import { Files } from '../../../../both/collections/files.collection'

@Component({
    selector: 'notepad',
    template,
    styles: [ style ]
})
export class NotepadComponent implements OnInit {

    private timerHasTicked: boolean
    private lastSaveTime: string

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

    constructor(private fileService: FileService) {
        this.timerHasTicked = false
    }

    ngOnInit() {
        Observable.timer(0, 10000).subscribe(() => {
            this.timerHasTicked = true
            const date = new Date()
            this.lastSaveTime = date.getHours() + ':' + date.getMinutes() + ' Uhr'
        })
    }

    onContentChanged({quill, html, text}) {
        if (!this.timerHasTicked || this.fileService.getCurrentFile().subjectID === '-1')
            return

        this.timerHasTicked = false
        Files.update(this.fileService.getCurrentFile()._id, {
            $set: { content: html }
        })
    }

    onTitleChanged(event) {
        Files.update(this.fileService.getCurrentFile()._id, {
            $set: { name: event.target.value }
        })
    }
}