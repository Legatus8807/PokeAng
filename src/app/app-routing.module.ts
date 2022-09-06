import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HolderMainComponent } from './components/holder-main/holder-main.component';

const routes: Routes = [
  {path: 'holder-component', component: HolderMainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
