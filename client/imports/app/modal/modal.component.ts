import { Component } from '@angular/core'

import template from './modal.component.html'
import style from './modal.component.sass'

import { FileService } from '../files.service'

@Component({
    selector: 'add-modal',
    template,
    styles: [ style ]
})
export class AddModalComponent {
    private type: string = 'category'
    private nameInput: string
    private selectedSubject

    constructor(private fileService: FileService) {

    }

    createNew(event) {
        if (this.nameInput === '' || event.keyCode !== 13 )
            return

        if (this.type === 'subject') {
            this.fileService.createSubject(this.nameInput)
        } else {
            this.fileService.createFile(this.nameInput, new Date(), this.selectedSubject )
        }
    }
}