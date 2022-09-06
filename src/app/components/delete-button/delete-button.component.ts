import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PokeName } from 'src/app/PokeName';
import { DbPokemon } from 'src/app/DbPokemon';
import { PokeService } from 'src/app/services/poke.service';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.css']
})
export class DeleteButtonComponent implements OnInit {

  @Input() pokeName: string;
  @Input() idVal: string;
  @Output() onDeleteDb: EventEmitter<PokeName> = new EventEmitter<PokeName>();

  constructor() { }

  ngOnInit(): void {
  }

  onDelete() {
    const newPokeName: PokeName = {
      id: this.idVal,
      name: this.pokeName
    }

    this.onDeleteDb.emit(newPokeName)
  }

}
