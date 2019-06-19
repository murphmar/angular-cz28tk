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
    ]),
    trigger('changeState3', [
      state('2', style({
          height: '56px',
          width: '64px',
          transform: 'translate(-540px, -170px)'
          // transform: 'translate(-100%, -100%)'
      })),
      transition('*=>2', animate('500ms ease-in-out')),
      transition('*=>1', animate('500ms ease-in-out'))
    ])
  ]
})
export class AutocompleteOverviewExample {
  vehicleControl = new FormControl();
  filteredVehicles: Observable<Array<any>>;
  stateTracker = '1';
  selectedVehicle = '';


  vehicles: any = [
    {
      customer: 'Mark Murphy',
      description: '2017 Hyundai Elantra',
      vin: '1'
    },
    {
      customer: 'Jimmy Westcott',
      description: '2018 Ford Mustang',
      vin: '2'
    },
    {
      customer: 'Ryan Braybrook',
      description: '1987 Honda CRV',
      vin: '3'
    },
    {
      customer: 'Luke Butler',
      description: '1995 Mazda 3',
      vin: '4'
    }
  ];

  constructor() {
    this.filteredVehicles = this.vehicleControl.valueChanges
      .pipe(
        startWith(''),
        map(vehicle => vehicle ? this._filteredVehicles(vehicle) : this.vehicles.slice())
      );
  }

  private _filteredVehicles(value: string): any[] {
    return this.vehicles.filter(vehicle => vehicle.vin.indexOf(value) === 0);
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