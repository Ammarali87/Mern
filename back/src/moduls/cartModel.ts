import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { Product } from "./productModel";

@modelOptions({ schemaOptions: { timestamps: true } })
export class CartItem {
  @prop({ required: true })
  productId!: string;

  @prop({ required: true })
  quantity!: number;
}

@modelOptions({ schemaOptions: { timestamps: true } })
export class Cart {
  public _id?: string;
  @prop({ ref: 'Product' })
  public productId!: Product;
  @prop({ default: [] })
  public items!: CartItem[];
}

export const CartModel = getModelForClass(Cart);
