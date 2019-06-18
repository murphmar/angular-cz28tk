import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { trigger, state, style, animate, transition } from '@angular/animations';

export interface State {
  flag: string;
  name: string;
  population: string;
}

/**
 * @title Autocomplete overview
 */
@Component({
  selector: 'autocomplete-overview-example',
  templateUrl: 'autocomplete-overview-example.html',
  styleUrls: ['autocomplete-overview-example.css'],
  animations: [
    trigger('changeState', [
      state('2', style({
        transform: 'translateY(-160px)'
      })),
      transition('*=>2', animate('500ms ease-in-out')),
      transition('*=>1', animate('500ms ease-in-out'))
    ]),
    trigger('changeState2', [
      state('2', style({
          opacity: 1,
transform: 'translateY(-160px)'
      })),
      transition('*=>2', animate('500ms ease-in-out')),
      transition('*=>1', animate('500ms ease-in-out'))
    ])
  ]
})
export class AutocompleteOverviewExample {
  stateCtrl = new FormControl();
  filteredStates: Observable<State[]>;
  stateTracker = '1';
  selectedVehicle = '';


  states: State[] = [
    {
      name: 'Mark Murphy',
      population: '2017 Hyundai Elantra',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
    },
    {
      name: 'Jimmy Westcott',
      population: '2018 Ford Mustang',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    },
    {
      name: 'Ryan Braybrook',
      population: '1987 Honda CRV',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
    },
    {
      name: 'Luke Butler',
      population: '1995 Mazda 3',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    }
  ];

  constructor() {
    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.states.slice())
      );
  }

  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }

  
  vehicleSelected(event: Event){
    this.stateTracker = '2';
  }

  handleEmptyInput(event: any){
    if(event.target.value === '') {
      this.stateTracker = '1';
    }
}
}