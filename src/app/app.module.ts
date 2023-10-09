import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { DataModule } from 'src/data/data.module';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { AppComponent } from './app.component';
import { MatIconModule } from '@angular/material/icon';
import { ClientComponent } from './presentation/client/client.component';
import { FormComponent } from './components/form/form.component';
import { NewClientComponent } from './presentation/new-client/new-client.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// ...

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    ClientComponent,
    NewClientComponent,
    FormComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    MatButtonModule,
    AppRoutingModule,
    DataModule,
    MatTableModule,
    MatBadgeModule,
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
