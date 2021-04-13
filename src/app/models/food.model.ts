export class Food {
    idfood!: number;
    food!: string;
    constructor(id: number, food: string){
      this.idfood = id;
      this.food = food
    }
}