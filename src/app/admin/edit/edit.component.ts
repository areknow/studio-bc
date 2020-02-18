import { Component, OnInit } from '@angular/core';

const ELEMENT_DATA = [
  {
    id: 1,
    name: 'N001',
    width: 22,
    height: 28,
    price: 500,
    sold: true,
    image: '',
    thumbnail: '',
  },
  {
    id: 2,
    name: 'N001',
    width: 22,
    height: 28,
    price: 500,
    sold: true,
    image: '',
    thumbnail: '',
  },
];

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  displayedColumns: string[] = ['name', 'width', 'height', 'price', 'sold', 'image', 'thumbnail', 'edit'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

  newRow(): void {
    console.log('new')
  }

  editRow(id: number): void {
    console.log(id)
  }

}
