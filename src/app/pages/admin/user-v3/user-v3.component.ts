import { Component } from '@angular/core';

import { IColumn } from 'src/app/types/core';

interface IUserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

const FRUITS = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];

const NAMES = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

@Component({
  selector: 'app-user-v3',
  templateUrl: './user-v3.component.html',
  styleUrls: ['./user-v3.component.scss']
})
export class UserV3Component {

  users: Array<IUserData> = [];

  columns: Array<IColumn> = [
    {
      columnDef: 'id',
      header: 'ID',
      cell: (element: IUserData) => element.id,
    },
    {
      columnDef: 'name',
      header: 'Name',
      cell: (element: IUserData) => element.name,
    },
    {
      columnDef: 'progress',
      header: 'Progress',
      cell: (element: IUserData) => element.progress,
    },
    {
      columnDef: 'fruit',
      header: 'Fruit',
      cell: (element: IUserData) => element.fruit,
    },
  ];

  constructor() {
    this.users = Array.from({length: 100}, (_, k) => createNewUser((k + 1).toString()));
  }

}

const createNewUser = (id: string): IUserData => {
  const _name = NAMES[Math.round(Math.random() * (NAMES.length - 1))];
  const name = `${_name} ${_name.charAt(0)}`;
  const fruit = FRUITS[Math.round(Math.random() * (FRUITS.length - 1))];
  const progress = Math.round(Math.random() * 100).toString();

  return { id, name, progress, fruit };
}