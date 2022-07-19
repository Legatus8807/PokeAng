import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PokeName } from 'src/app/PokeName';
import { Pokemon } from 'src/app/Pokemon';

@Component({
  selector: 'app-input-name',
  templateUrl: './input-name.component.html',
  styleUrls: ['./input-name.component.css']
})
export class InputNameComponent implements OnInit {
  pokeName: string = '';
  @Output() onAddName: EventEmitter<PokeName> = new EventEmitter<PokeName>();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    const newPokeName: PokeName = {
      name: this.pokeName
    }

    this.onAddName.emit(newPokeName)
  }

}
