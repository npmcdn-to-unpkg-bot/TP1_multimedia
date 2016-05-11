/**
 * Created by 1494778 on 2016-04-27.
 */
import {Injectable} from 'angular2/core';
import {Hero} from './hero';
import {HEROES} from './mock-heroes';

@Injectable()
export class HeroService {
  private _heroes;

  constructor() {
    this._heroes = localStorage.getItem("HEROES");

    this._heroes = JSON.parse(this._heroes);
    if (this._heroes == null) {
      this._heroes = HEROES;
    }

  }

  getHeroes() {
    return Promise.resolve(this._heroes);
  }


  getHero(id: number) {
    return Promise.resolve(this._heroes).then(
      heroes => heroes.filter(hero => hero.id === id)[0]
    );
  }

  deleteHero(id: number) {
    this._heroes.splice(this._heroes.indexOf(this._heroes.filter(hero => hero.id === id)[0]), 1);
    this.save();
  }

  newHero() {
    var maxId = Math.max.apply(Math, this._heroes.map(function (hero) {
        return hero.id;
      })),
      newHero = new Hero();
    newHero.id = maxId + 1;
    newHero.name = "hero"+(maxId+1);
    this._heroes.push(newHero);
    this.save();
    return newHero.id;
  }

  save() {
    console.log(this._heroes);
    localStorage.setItem("HEROES", JSON.stringify(this._heroes));
  }

}


