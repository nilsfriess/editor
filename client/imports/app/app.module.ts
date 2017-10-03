import { NgModule }           from '@angular/core' 
import { FormsModule }        from '@angular/forms'
import { BrowserModule }      from '@angular/platform-browser' 
import { 
  Routes, 
  RouterModule }              from '@angular/router'

import { AppComponent }         from './app.component'
import { SidebarComponent }     from './sidebar/sidebar.component'
import { NotepadComponent }     from './notepad/notepad.component'
import { AddModalComponent }    from './modal/modal.component'
import { LoginComponent }       from './login/login.component'
import { EditorComponent }      from './editor/editor.component'
import { DeleteModalComponent } from './delete/delete.component'

import { FileService }        from './files.service'

import { QuillModule } from 'ngx-quill'
import { AccountsModule } from 'angular2-meteor-accounts-ui'

import { Meteor } from 'meteor/meteor'

const routes: Routes = [
  {
    path: 'editor',
    component: EditorComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: '/editor',
    pathMatch: 'full'
  }
]

@NgModule({
  // Components, Pipes, Directive
  declarations: [
    AppComponent,
    SidebarComponent,
    NotepadComponent,
    AddModalComponent,
    LoginComponent,
    EditorComponent,
    DeleteModalComponent
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
    FormsModule,
    AccountsModule,
    RouterModule.forRoot(routes)
  ],
  // Main Component
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor() {

  }
}
