import { Injectable } from '@angular/core';
import { Observable, of, pipe, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pokemon, Type, Type2 } from '../Pokemon';
import { PokeName } from '../PokeName';

@Injectable({
  providedIn: 'root'
})
export class PokeService {
  private tempName = 'bulbasaur'
  //private pokeUrl = 'https://pokeapi.co/api/v2/pokemon/' + this.tempName;

  constructor(private http:HttpClient) { }

  // Send url + entered_pokemon as a parameter, call in component function
  getPoke(pokeName:PokeName): Observable<Pokemon> {
    const pokeUrl = 'https://pokeapi.co/api/v2/pokemon/' + pokeName.name;
    return this.http.get<Pokemon>(pokeUrl).pipe(map(poke => {
      const fakeTypes = [...poke.types];
      const newType:Type = {
        slot: 1,
        type: {name: 'N/A', url: 'N/A'}
      }
      fakeTypes.push(newType)
      poke.types = fakeTypes;
      return poke;
    }));
  }
}
