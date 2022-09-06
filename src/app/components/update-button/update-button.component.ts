import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PokeName } from 'src/app/PokeName';
import { Pokemon } from 'src/app/Pokemon';
import { DbPokemon } from 'src/app/DbPokemon';
import { PokeService } from 'src/app/services/poke.service';

@Component({
  selector: 'app-update-button',
  templateUrl: './update-button.component.html',
  styleUrls: ['./update-button.component.css']
})
export class UpdateButtonComponent implements OnInit {
  @Input() pokeName: string;
  @Input() idVal: string;
  @Output() onChangeNameDb: EventEmitter<PokeName> = new EventEmitter<PokeName>();

  constructor() { }

  ngOnInit(): void {
  }

  onUpdateSubmit() {
    const newPokeName: PokeName = {
      id: this.idVal,
      name: this.pokeName
    }

    this.onChangeNameDb.emit(newPokeName)
  }

}
