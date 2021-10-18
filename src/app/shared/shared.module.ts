import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyListComponent } from './components/empty-list/empty-list.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { OptionsScrollDirective } from './directives/options-scroll.directive';
import { SearchComponent } from './components/search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    EmptyListComponent,
    NavBarComponent,
    OptionsScrollDirective,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  exports: [EmptyListComponent, NavBarComponent, SearchComponent],
})
export class SharedModule {}
