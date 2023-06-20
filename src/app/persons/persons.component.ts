import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { PersonsService } from './persons.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
})
export class PersonsComponent implements OnInit, OnDestroy {
  constructor(private prsService: PersonsService) {
    // this.personList = prsService.persons;
    // this.personService = prsService;
  }

  // From person-input.component.ts
  enteredPersonName = '';
  onCreatePerson() {
    console.log('Created a person: ' + this.enteredPersonName);
    this.prsService.addPerson(this.personList,this.enteredPersonName);
    this.enteredPersonName = '';
  }

  personList: string[] = [];
  isFetching = false;
  private personListSubs: Subscription = new Subscription();
  // private personService: PersonsService;

  ngOnInit() {
    this.personListSubs = this.prsService.personsChanged.subscribe(
      (persons) => {
        this.personList = persons;
        this.isFetching = false;
      }
    );
    this.isFetching = true;
    this.prsService.fetchPersons();
  }

  onRemovePerson(personName: string) {
    this.prsService.removePerson(this.personList, personName);
  }

  ngOnDestroy() {
    this.personListSubs.unsubscribe();
  }
}
