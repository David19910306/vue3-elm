import { Store } from 'vuex'

export async function addFoodsToCart (store:Store<any>, food: {[propName:string]:any}, specsId: number) {
  if (food.specifications.length > 0) {
    const foods = food.specfoods.find((specs:Record<string, any>) => specs.food_id === specsId)
    await store.dispatch('recordFoods', foods)
  } else {
    await store.dispatch('recordFoods', food.specfoods[0])
  }
}
