import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { registerLocaleData } from '@angular/common';
import localeHu from '@angular/common/locales/hu';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';

registerLocaleData(localeHu);

bootstrapApplication(AppComponent, {
  providers: [provideRouter(appRoutes)],
});
