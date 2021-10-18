import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { BehaviorSubject } from 'rxjs';
import { SearchInput } from '../../models/search-input';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  // Inputs
  @Input() separatorKeysCodes: number[] = [];
  @Input() placeholder: string = '';
  @Input() removable: boolean = true;
  @Input() loading: boolean = false;
  @Input() suggestionsTags: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);

  // Outputs
  @Output() onAdd = new EventEmitter<string[]>();
  @Output() onRemove = new EventEmitter<string[]>();
  @Output() onSelected = new EventEmitter<string[]>();
  @Output() onTextChange = new EventEmitter<string>();
  @Output() onScrollTags = new EventEmitter<SearchInput>();

  // vars
  tagCtrl = new FormControl();
  @ViewChild('tagInput', { static: false })
  tagInput!: ElementRef<HTMLInputElement>;
  private timeout: any;
  tags: string[] = [];
  private page: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.textChange();
  }

  add(event: MatChipInputEvent, inputName: HTMLInputElement): void {
    const value = (event.value || '').trim();

    // Add our tag
    if (value && !this.tags.includes(value)) {
      this.tags.push(value);
    }
    // Clear the input value
    // event.chipInput!.clear();
    inputName.value = '';
    this.reset();
    this.onAdd.emit(this.tags);
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
    this.onRemove.emit(this.tags);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    // add tag when not selected
    if (!this.tags.includes(event.option.viewValue)) {
      this.tags.push(event.option.viewValue);
    }
    // reset vars
    this.tagInput.nativeElement.value = '';
    this.reset();
    this.onSelected.emit(this.tags);
  }

  // on scroll return new page
  scrollTags() {
    if (!this.loading) {
      this.page++;
      this.onScrollTags.emit({
        input: this.tagInput.nativeElement.value,
        page: this.page,
      });
    }
  }

  private textChange() {
    // handle input change
    this.tagCtrl.valueChanges.subscribe((input: string | null) => {
      // check if the input not null && not exist in the suggestions tags
      if (input && !this.suggestionsTags.getValue().includes(input)) {
        clearTimeout(this.timeout);
        var $this = this;
        // wait the user finish typing
        this.timeout = setTimeout(() => {
          $this.onTextChange.emit(input);
        }, 500);
      }
      if (input && input.length === 0) {
        this.suggestionsTags.next([]);
        this.page = 0;
      }
    });
  }

  reset() {
    this.tagCtrl.setValue(null);
    this.suggestionsTags.next([]);
    this.page = 0;
  }
}
