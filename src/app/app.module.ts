import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { SocialMediaRoutingModule } from './social-media/social-media-routing.module';
import { ComplexFormRoutingModule } from './complex-form/complex-form-routing.module';
import { ReactiveStateRoutingModule } from './reactive-state/reactive-state-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    SocialMediaRoutingModule,
    ComplexFormRoutingModule,
    ReactiveStateRoutingModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
