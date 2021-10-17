import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GiphysRoutingModule } from './giphys-routing.module';
import { ListComponent } from './components/list/list.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    GiphysRoutingModule,
    InfiniteScrollModule,
    SharedModule,
  ],
})
export class GiphysModule {}
