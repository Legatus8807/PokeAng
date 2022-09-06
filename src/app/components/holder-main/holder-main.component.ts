import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription, Subject } from 'rxjs';
import { Router, Routes } from '@angular/router';
import { DbPokemon } from 'src/app/DbPokemon';
import { Pokemon } from 'src/app/Pokemon';
import { PokeName } from 'src/app/PokeName';
//import { DbPokemon } from 'src/app/DbPokemon';
import { PokeService } from 'src/app/services/poke.service';

@Component({
  selector: 'app-holder-main',
  templateUrl: './holder-main.component.html',
  styleUrls: ['./holder-main.component.css']
})
export class HolderMainComponent implements OnInit {
  private subject = new Subject<DbPokemon[]>()
  @Input() idVal: number;
  //@Input() current: number;
  //@Input() total: number;
  poke1!:Pokemon;
  poke2: DbPokemon;
  //updateObserving: number;
  pokeArray:DbPokemon[] = [];
  // Create an array of pokemon and push added pokemon to it.
  // Add in the carousel
  // Create the node.js file

  constructor(private pokeService:PokeService, private router:Router) { }

  ngOnInit(): void { // Change to get from array;
    //const poke2:PokeName = {name: 'bulbasaur'};

    /* Getting from old Json Server
    this.pokeService.getPoke().subscribe((pokeA:DbPokemon[]) => {
      pokeA.forEach(poke => {
        this.pokeArray.push(poke);
      })
    });
    */

    this.pokeService.getPokeFromMongo().subscribe((pokeA:DbPokemon[]) => {
      this.pokeArray = [];
      pokeA.forEach(poke => {
        this.pokeArray.push(poke);
      });
      this.pokeService.updateSubject().next(this.pokeArray);
    });


    /*
    this.pokeService.getPokeFromApi(poke2).subscribe((pokeSend) => {
      this.poke1 = pokeSend;
    })
    */
  }


  transPoke(pokeName:PokeName) {
    this.pokeService.getPokeFromApiNoTransform(pokeName).subscribe((pokeSend) => {
      this.poke1 = pokeSend;
      console.log(this.poke1.types[1]);
    });
  }


  pushPoke(pokeName: PokeName) {
    /* For pushing to array
    this.pokeService.addPoke(pokeName).subscribe(poke => {
      this.pokeArray.push(poke);
    })
    */

    //Switched postWholePokeData to postPokeTo Mongo
    this.pokeService.getPokeFromApi(pokeName).subscribe(pokeApi => {
      const newPoke = pokeApi; // Can maybe skip this part
      this.pokeService.postPokeToMongo(newPoke).subscribe(poke => {
        this.pokeArray.push(poke);
        /*
        this.router.navigate(['/holder-component'])
          .then(() => {
            window.location.reload();
          });
        */
        this.ngOnInit();
      });
    })
  }

    /*
    this.pokeService.addPoke(pokeName).subscribe(poke => {
      this.pokeArray.push(poke); // This array is key!!!!!!!!!!!!!
    })
    */




  putPoke(pokeName:PokeName) {
    this.pokeService.getPokeFromApi(pokeName).subscribe(pokeApi => {
      this.pokeService.updatePoke(pokeApi, pokeName.id).subscribe(poke => {
        const index = this.pokeArray.findIndex(arrayPoke => {arrayPoke.id === poke.id});
        this.pokeArray[index] = poke;
        /*
        this.router.navigate(['/holder-component'])
          .then(() => {
            window.location.reload();
          });
        */
       this.ngOnInit();
      });
    });
  }

  removePoke(pokeName:PokeName) {
    this.pokeService.deletePoke(pokeName.id).subscribe(poke => {
      const index = this.pokeArray.findIndex(arrayPoke => {arrayPoke.id === pokeName.id});
      this.pokeArray.splice(index, 1);
      this.ngOnInit();
    });
  }



}



