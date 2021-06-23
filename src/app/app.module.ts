import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//for google cloud storage
import { AngularFirestoreModule } from "@angular/fire/firestore";
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {NO_ERRORS_SCHEMA } from '@angular/core';
import {ContactService} from './services/contact.service';
import {environment} from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { AngularFireModule } from '@angular/fire';

//translation
import { TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TestComponent} from './test/test.component';

export const createTranslateLoader = (http: HttpClient) => {
  return new TranslateHttpLoader(http, "./assets/i18/", '.json');
};

const appRoutes: Routes = [
  { path: '', component: HomeComponent },

  { path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },
  { path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
        }
      }),
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes,
        {enableTracing:true}),
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  exports:[RouterModule],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule {

}