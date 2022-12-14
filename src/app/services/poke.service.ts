import { Injectable } from '@angular/core';
import { Observable, of, pipe, map, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pokemon, Type, Type2 } from '../Pokemon';
import { DbPokemon } from '../DbPokemon';
import { PokeName } from '../PokeName';
import { ThisReceiver } from '@angular/compiler';
import mongoose from 'mongoose';
import { stringify } from 'querystring';
//import { stringify } from 'querystring';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  })
}

@Injectable({
  providedIn: 'root'
})
export class PokeService {
  private subject = new Subject<DbPokemon[]>();
  private pokeArray:Pokemon[] = [];
  private pokeDbArray:DbPokemon[] = [];
  //private updateInt:number = 0;
  private pokeApiUrl = '';
  private pokeDbUrl = 'http://localhost:5000/pokemon/';
  private pokeMongoUrl = 'http://localhost:5500/pokemon/';

  private tempName = 'bulbasaur'
  //private newPoke: DbPokemon;

  constructor(private http:HttpClient) { }

  // Send url + entered_pokemon as a parameter, call in component function
  /*
  getPokeFromApi(pokeName:PokeName): Observable<Pokemon> {
    this.pokeApiUrl = 'https://pokeapi.co/api/v2/pokemon/' + pokeName.name;

    return this.http.get<Pokemon>(this.pokeApiUrl).pipe(map(poke => {
      //let fakeTypes = [];
      const fakeTypes = [...poke.types];

      if(poke.types.length === 1) {
        const newType:Type = {
          slot: 1,
          type: {name: 'N/A', url: 'N/A'}
        }
        fakeTypes.push(newType)
      }

      poke.types = fakeTypes;

      this.pokeArray.push(poke);
      this.pokeArray.forEach(poke => {console.log(poke.name)});
      return poke;
    }));
  }
  */

  getPokeFromApiNoTransform(pokeName:PokeName):Observable<Pokemon> {
    this.pokeApiUrl = 'https://pokeapi.co/api/v2/pokemon/' + pokeName.name;
    return this.http.get<Pokemon>(this.pokeApiUrl);
  }

  getPokeFromApi(pokeName:PokeName):Observable<DbPokemon> { //!!!!!!!!!!!!!!!!! Use This!!!!!!!!!!!!!!!!!!!!!
    this.pokeApiUrl = 'https://pokeapi.co/api/v2/pokemon/' + pokeName.name.toLowerCase();

    return this.http.get<Pokemon>(this.pokeApiUrl).pipe(map(poke => {
      const newPoke:DbPokemon = {
        name: poke.name.charAt(0).toUpperCase() + poke.name.slice(1),
        type1: poke.types[0].type.name.charAt(0).toUpperCase() + poke.types[0].type.name.slice(1),
        type2: (poke.types[1] != null ? poke.types[1].type.name.charAt(0).toUpperCase() + poke.types[1].type.name.slice(1) : 'N/A'),
        dexNum: poke.id,
        hp: poke.stats[0].base_stat,
        atk: poke.stats[1].base_stat,
        def: poke.stats[2].base_stat,
        spA: poke.stats[3].base_stat,
        spD: poke.stats[4].base_stat,
        spe: poke.stats[5].base_stat
      }
      return newPoke;
    }));
    //return newPoke;
  }

  /*
  getPokeFromMongo(): Observable<DbPokemon[]> {
    return this.http.get<{message: string, pokemon: any}>(this.pokeMongoUrl, httpOptions).pipe(map(pokeData => {
      return pokeData.pokemon.map((poke: { _id: string; name: string; dexNum: number; type1: string; type2: string; hp: number; atk: number; def: number; spA: number; spD: number; spe: number; }) => {
        const newPoke:DbPokemon = {
          id: poke._id,
          name: poke.name,
          dexNum: poke.dexNum,
          type1: poke.type1,
          type2: poke.type2,
          hp: poke.hp,
          atk: poke.atk,
          def: poke.def,
          spA: poke.spA,
          spD: poke.spD,
          spe: poke.spe
        }
        return newPoke
      })

    }))
    }
*/

  getPokeFromMongo(): Observable<DbPokemon[]> {
    return this.http.get<any>(this.pokeMongoUrl).pipe(map(pokeData => {
      return pokeData.pokemon.map((poke:{
       _id: string; name: string; dexNum: string; type1: string;
       type2: string; hp: number; atk: number; def: number;
       spA: number; spD: number; spe: number;
      }) => {
        const newPoke = {
          id: poke._id,
          name: poke.name,
          dexNum: poke.dexNum,
          type1: poke.type1,
          type2: poke.type2,
          hp: poke.hp,
          atk: poke.atk,
          def: poke.def,
          spA: poke.spA,
          spD: poke.spD,
          spe: poke.spe
        };
        return newPoke
      })
    }))

  }


  getPoke(): Observable<DbPokemon[]> {
    return this.http.get<DbPokemon[]>(this.pokeDbUrl);

    /*
    this.http.get<DbPokemon[]>(this.pokeDbUrl).subscribe(dbArray => {
      dbArray.forEach((poke) => {
        this.pokeDbArray.push(poke)
      }

    )})

    return of([...this.pokeDbArray]);
    */
  }

  addPoke(pokeName: PokeName): Observable<DbPokemon> { // user puts in pokemon name, then gets rest from API, and pushes it all to the database
    this.pokeApiUrl = 'https://pokeapi.co/api/v2/pokemon/' + pokeName.name;

    //let newPoke: DbPokemon;
    let newPromise: Promise<DbPokemon>; //Learn how to use promises
    /*
    this.http.get<Pokemon>(this.pokeApiUrl).subscribe(poke => {
      newPoke = {
        name: poke.name,
        type1: poke.types[0].type.name,
        type2: (poke.types[1] != null ? poke.types[1].type.name : 'N/A'),
        dexNum: poke.id,
        hp: poke.stats[0].base_stat,
        atk: poke.stats[1].base_stat,
        def: poke.stats[2].base_stat,
        spA: poke.stats[3].base_stat,
        spD: poke.stats[4].base_stat,
        spe: poke.stats[5].base_stat
      }

     //this.pokeDbArray.push(this.newPoke);

      //this.http.post<DbPokemon>(this.pokeDbUrl, newPoke, httpOptions)

    });
    */

    this.getPokeFromApi(pokeName).subscribe(poke => {
      const newPoke = poke;
    })

    return this.http.post<DbPokemon>(this.pokeMongoUrl, httpOptions) // switching to pokeMongoUrl from pokeDbUrl

     //possibly put the get request as part of the subscription.subscribe()
    //return this.http.post<DbPokemon[]>(this.pokeDbUrl, this.pokeDbArray, httpOptions)


    //let newPoke!: Pokemon;
    //let newPoke!: DbPokemon;
    /*
    const newPoke: Pokemon =  this.http.get<Pokemon>(this.pokeApiUrl).pipe(map(poke => {
      const testPoke: Pokemon = {
        height: poke.height,
        id: poke.id,
        location_area_encounters: poke.location_area_encounters,
        name: poke.name,
        stats: poke.stats,
        types: poke.types
      }
      return testPoke
    }))

    const dbPoke: DbPokemon = {
      name: newPoke.name,
      type1: poke.types[0].type.name,
      type2: (poke.types[1] != null ? poke.types[1].type.name : 'N/A'),
      dexNum: poke.id,
      hp: poke.stats[0].base_stat,
      atk: poke.stats[1].base_stat,
      def: poke.stats[2].base_stat,
      spA: poke.stats[3].base_stat,
      spD: poke.stats[4].base_stat,
      spe: poke.stats[5].base_stat
    }
    */

    // May need to create it as a DbPokemon

    //return this.http.post<DbPokemon>('http://localhost:5000/pokemon', newPoke, httpOptions);

  }

  postWholePokeData(poke:DbPokemon) { //switching to pokeMongoUrl from pokeDbUrl
    return this.http.post<DbPokemon>(this.pokeDbUrl, poke, httpOptions);
  }

  postPokeToMongo(poke:DbPokemon) { //remove return for mongo sub
    return this.http.post<DbPokemon>(this.pokeMongoUrl, poke, httpOptions);
  }

  updatePoke(poke:DbPokemon, pokeId:string) {
    return this.http.put<DbPokemon>(this.pokeMongoUrl + pokeId, poke, httpOptions);
  }

  deletePoke(pokeId:string) {
    return this.http.delete<DbPokemon>(this.pokeMongoUrl + pokeId, httpOptions);
  }

  updateSubject():Subject<DbPokemon[]> {
    return this.subject;
  }

  getSubject():Observable<DbPokemon[]> {
    return this.subject.asObservable();
  }

  /*updatePage(currentPage:number):Observable<number> {

  }*/

  getMaxPage(aLength:number):Observable<number> {
    return of(Math.floor(aLength/8));
  }

}
