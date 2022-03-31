import { Store } from 'vuex'

export async function addFoodsToCart (store:Store<any>, food: {[propName:string]:any}, specsId: number):Promise<void> {
  // console.log(food)
  if (food.specifications.length > 0) {
    const foods = food.specfoods.find((specs:Record<string, any>) => specs.food_id === specsId)
    await store.dispatch('recordFoods', { category_id: food.category_id, ...foods })
  } else {
    await store.dispatch('recordFoods', { category_id: food.category_id, ...food.specfoods[0] })
  }
}

export async function minusFoodInCart (store: Store<any>, delItemId:number):Promise<void> {
  await store.dispatch('deleteFood', delItemId)
}
