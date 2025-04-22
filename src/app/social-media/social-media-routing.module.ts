import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'social-media', loadChildren: () => import('./social-media.module').then(m => m.SocialMediaModule) },
  {path:'**', redirectTo: 'social-media', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocialMediaRoutingModule { }
