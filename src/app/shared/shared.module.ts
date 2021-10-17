import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyListComponent } from './components/empty-list/empty-list.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { OptionsScrollDirective } from './directives/options-scroll.directive';

@NgModule({
  declarations: [EmptyListComponent, NavBarComponent, OptionsScrollDirective],
  imports: [CommonModule],
  exports: [EmptyListComponent, NavBarComponent],
})
export class SharedModule {}
