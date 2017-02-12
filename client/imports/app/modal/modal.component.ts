import { Component, Output, EventEmitter, ElementRef } from '@angular/core'

import template from './modal.component.html'
import style from './modal.component.sass'

import { FileService } from '../files.service'

@Component({
    selector: 'add-modal',
    template,
    styles: [ style ]
})
export class AddModalComponent {
    private subject: boolean = false
    private nameInput: string
    private selectedSubject
 
    @Output() clickedOutside = new EventEmitter()
    private shouldFireEvent: boolean = false

    constructor(private fileService: FileService, private elementRef: ElementRef) {
        document.addEventListener('click', (event) => {
            if (!this.elementRef.nativeElement.contains(event.target) && this.shouldFireEvent) {
                this.clickedOutside.emit()
                console.log('clicked outside')
            }
        })
    }

    createNew(form, event: Event) {
        event.preventDefault()
        if (this.nameInput === '')
            return

        if (this.subject) {
            this.fileService.createSubject(this.nameInput)
        } else {
            this.fileService.createFile(this.nameInput, new Date(), this.selectedSubject )
        }
    }

    listenToClickEvent() {
        this.shouldFireEvent = true
        console.log('start listen')
    }

    stopListenToClickEvent() {
        this.shouldFireEvent = false
        console.log('stop listen')
    }


}