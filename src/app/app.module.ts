import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './route';
import { NavComponent } from './nav/nav.component';
import { BsDropdownModule } from 'ngx-bootstrap';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DetailsComponent } from './details/details.component';
import { PhoneuserComponent } from './phoneuser/phoneuser.component';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { ModalModule } from 'ngx-bootstrap';
import { MapComponent } from './map/map.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './_guards/auth.guard';
import { AuthenticationService } from './_services/authentication.service';
import { GetsitenameService } from './_services/getsitename.service';
import { UserService } from './_services/user.service';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { fakeBackendProvider } from './_helpers/fake-backend';
import { SitenameComponent } from './sitename/sitename.component';
import { CircleManager } from 'node_modules/@agm/core/services/managers/circle-manager';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    SidebarComponent,
    DetailsComponent,
    PhoneuserComponent,
    MapComponent,
    SitenameComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBrtgXDLbb58ls_9ZAtvM1Wqo-7TDr_KJc'
    }),
    AgmDirectionModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    GetsitenameService,
    UserService,
    CircleManager,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    fakeBackendProvider,
    MapComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
