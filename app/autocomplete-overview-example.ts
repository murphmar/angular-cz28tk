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
          transform: 'translate(-540px, -110px)'
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
  selectedVehicleDescription = '';
  selectedVehicle = {};

  vehicles: any = [
    {
      customerFirstName: 'Mark',
      customerLastName: 'Murphy',
      year: '2017',
      make: 'Hyundai',
      model: 'Elantra',
      vin: '1'
    },
    {
      customerFirstName: 'Jimmy',
      customerLastName: 'Westcott',
      year: '2018',
      make: 'Ford',
      model: 'Mustang',
      vin: '2'
    },
    {
      customerFirstName: 'Ryan',
      customerLastName: 'Braybrook',
      year: '1982',
      make: 'Honda',
      model: 'CRV',
      vin: '3'
    },
    {
      customerFirstName: 'Luke',
      customerLastName: 'Butler',
      year: '1998',
      make: 'Mazda',
      model: '3',
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

  
  vehicleSelected(event: any){
    this.stateTracker = '2';
    this.selectedVehicle = event.option.value;
    this.selectedVehicleDescription = event.option.value.vin;
    console.log(this.selectedVehicle);
  }

  handleEmptyInput(event: any){
    if(event.target.value === '') {
      this.stateTracker = '1';
    }
}
}