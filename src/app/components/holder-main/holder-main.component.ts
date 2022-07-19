import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pokemon } from 'src/app/Pokemon';
import { PokeName } from 'src/app/PokeName';
import { PokeService } from 'src/app/services/poke.service';

@Component({
  selector: 'app-holder-main',
  templateUrl: './holder-main.component.html',
  styleUrls: ['./holder-main.component.css']
})
export class HolderMainComponent implements OnInit {
  poke1!:Pokemon;

  constructor(private pokeService:PokeService) { }

  ngOnInit(): void {
    const poke2:PokeName = {name: 'bulbasaur'};
    this.pokeService.getPoke(poke2).subscribe((pokeSend) => {
      this.poke1 = pokeSend;
    })
  }

  transPoke(pokeName:PokeName) {
    this.pokeService.getPoke(pokeName).subscribe((pokeSend) => {
      this.poke1 = pokeSend;
      console.log(this.poke1.height);
    });
  }

}
