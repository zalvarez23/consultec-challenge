import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './presentation/client/client.component';
import { NewClientComponent } from './presentation/new-client/new-client.component';

const routes: Routes = [
  { path: '', component: ClientComponent },
  { path: 'new-client', component: NewClientComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
