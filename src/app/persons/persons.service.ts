import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PersonsService {
  personsChanged = new Subject<string[]>();
  persons: string[] = [];

  constructor(private http: HttpClient) {}

  fetchPersons() {
    this.http
      // .get<any>('https://swapi.co/api/people')
      .get<any>('https://swapi.dev/api/people')
      .pipe(
        map((resData) => {
          return resData.results.map(
            (character: { name: any }) => character.name
          );
        })
      )
      .subscribe((transformedData) => {
        this.personsChanged.next(transformedData);
      });
  }

  addPerson(personList: string[], name: string) {
    this.persons = personList;
    this.persons.push(name);
    this.personsChanged.next(this.persons);
  }

  removePerson(personList: string[], name: string) {
    this.persons = personList;
    this.persons = this.persons.filter((person) => {
      return person !== name;
    });
    this.personsChanged.next(this.persons);
  }
}
