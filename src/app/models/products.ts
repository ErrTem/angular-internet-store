export interface PProduct {
  id: number,
  title: string,
  price: number,
  image: string,
  ingredients: string
}

export interface BasketItem {
  product: PProduct,
  quantity: number
}
