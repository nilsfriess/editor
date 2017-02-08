import { NgModule } from '@angular/core' 
import { BrowserModule } from '@angular/platform-browser' 
import { AppComponent } from './app.component'
import { SidebarComponent } from './sidebar/sidebar.component'
import { NotepadComponent } from './notepad/notepad.component'
import { AddModalComponent } from './modal/modal.component'
import { FileService } from './files.service'
import { QuillModule } from 'ngx-quill'
import { FormsModule }   from '@angular/forms'

@NgModule({
  // Components, Pipes, Directive
  declarations: [
    AppComponent,
    SidebarComponent,
    NotepadComponent,
    AddModalComponent
  ],
  // Entry Components
  entryComponents: [
    AppComponent
  ],
  // Providers
  providers: [
    FileService
  ],
  // Modules
  imports: [
    BrowserModule,
    QuillModule,
    FormsModule
  ],
  // Main Component
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor() {

  }
}
