import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GiphysRoutingModule } from './giphys-routing.module';
import { ListComponent } from './components/list/list.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    GiphysRoutingModule,
    InfiniteScrollModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class GiphysModule {}
