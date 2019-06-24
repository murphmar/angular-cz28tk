import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";


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
        transform: 'translate(-1140px, -110px)'
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

  constructor(private domSanitizer: DomSanitizer, private matIconRegistry: MatIconRegistry) {
    this.matIconRegistry.addSvgIcon(
      `barcode_scanner`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJ%0D%0AQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9T%0D%0AVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAv%0D%0Ac3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0i%0D%0AMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0i%0D%0ATTQsNkg2VjE4SDRWNk03LDZIOFYxOEg3VjZNOSw2SDEyVjE4SDlWNk0xMyw2SDE0VjE4SDEzVjZN%0D%0AMTYsNkgxOFYxOEgxNlY2TTE5LDZIMjBWMThIMTlWNk0yLDRWOEgwVjRBMiwyIDAgMCwxIDIsMkg2%0D%0AVjRIMk0yMiwyQTIsMiAwIDAsMSAyNCw0VjhIMjJWNEgxOFYySDIyTTIsMTZWMjBINlYyMkgyQTIs%0D%0AMiAwIDAsMSAwLDIwVjE2SDJNMjIsMjBWMTZIMjRWMjBBMiwyIDAgMCwxIDIyLDIySDE4VjIwSDIy%0D%0AWiIgLz48L3N2Zz4=`)
    );

    this.filteredVehicles = this.vehicleControl.valueChanges
      .pipe(
        startWith(''),
        map(vehicle => vehicle ? this._filteredVehicles(vehicle) : this.vehicles.slice())
      );
  }

  private _filteredVehicles(value: string): any[] {
    return this.vehicles.filter(vehicle => vehicle.vin.indexOf(value) === 0);
  }


  vehicleSelected(event: any) {
    if (event.option.value == 'new') {
      this.selectedVehicle = {};
    } else {
      this.selectedVehicle = event.option.value;
      this.selectedVehicleDescription = event.option.value.vin;
    }
    this.stateTracker = '2';
  }

  handleEmptyInput(event: any) {
    if (event.target.value === '') {
      this.stateTracker = '1';
    }
  }
}