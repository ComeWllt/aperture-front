export interface IAlbum {
  photos: string[];
  _id: string;
  title: string;
  date: string;
  author: string;
  albumCover: string;
  location: {
    _id: string;
    country: string;
    city: string;
    lat: number;
    lng: number;
  };
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IFormattedAlbum extends IAlbum {
  formattedDate: string;
}

export interface IPortfolio {
  photos: string[];
  _id: string;
  title: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}
