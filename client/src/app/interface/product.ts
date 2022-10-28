export interface Product {
  tig_id:number;
  name:string;
  category: number;
  price:number;
  unit:number;
  availability : boolean;
  sale:boolean
  discount:number;
  comments : string;
  quantity_stock:number;
  quantity_sold:number;
  id:number;
  sellPrice:number;
  owner:string;
  userId:string;
}
