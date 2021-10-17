import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyListComponent } from './components/empty-list/empty-list.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@NgModule({
  declarations: [EmptyListComponent, NavBarComponent],
  imports: [CommonModule],
  exports: [EmptyListComponent, NavBarComponent],
})
export class SharedModule {}
