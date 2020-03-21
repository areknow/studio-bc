export interface IOrder {
  value: IOrderEntry[];
}

export interface IOrderEntry {
  id: string;
}

export interface IGalleryItem {
  id?: string;
  name: string;
  width: number;
  height: number;
  price: number;
  sold: boolean;
  image: string;
  thumbnail: string;
  date: Date;
}

export interface IDialogData {
  editing: boolean;
  content: IGalleryItem;
}
