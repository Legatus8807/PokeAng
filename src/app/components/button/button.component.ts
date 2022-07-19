import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { PokeService } from 'src/app/services/poke.service';
import { Pokemon } from 'src/app/Pokemon';
import { PokeName } from 'src/app/PokeName';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  poke!:Pokemon;

  constructor(private pokeService:PokeService) { }

  ngOnInit(): void {
  }


  onClick() {
    /*
    return this.pokeService.getPoke().subscribe((getPoke) => {
      this.poke = getPoke;
      const pokeHeight = this.poke.height;
      console.log(pokeHeight * 2);
    })
    */
  }

  callPoke(poke:PokeName) {

  }

}
