import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PokeName } from 'src/app/PokeName';
import { PokeService } from 'src/app/services/poke.service';

@Component({
  selector: 'app-db-button',
  templateUrl: './db-button.component.html',
  styleUrls: ['./db-button.component.css']
})
export class DbButtonComponent implements OnInit {
  @Input() pokeName: string;
  @Output() onAddNameDb: EventEmitter<PokeName> = new EventEmitter<PokeName>();
  //@Output() onChangeNameDb: EventEmitter<PokeName> = new EventEmitter<PokeName>();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    const newPokeName: PokeName = {
      name: this.pokeName
    }

    this.onAddNameDb.emit(newPokeName)
  }

}

