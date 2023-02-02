export interface PProducts {
  id: number,
  title: string,
  price: number,
  image?: string,
  configure: PProductsConfig,
  quantity: number
}

export interface PProductsConfig {
  chip: string,
  ssd: string,
  memory: string
}
