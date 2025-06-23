import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

bootstrapApplication(AppComponent, {
  // Aquí desplegamos TODO lo que ya tenías en appConfig:
  ...appConfig,
  // Y añadimos nuestro provider extra
  providers: [
    // Mantenemos los providers originales (si los hay)
    ...(appConfig.providers ?? []),
    // Registramos todos los tipos de Chart.js de golpe
    provideCharts(withDefaultRegisterables())
  ]
})
  .catch((err) => console.error(err));
