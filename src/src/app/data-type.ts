export interface signup{
    name:string,
    email:string,
    password:string,
}

export interface login{
    email:string;
    password:string;

}

export interface product{
    name:string;
    price:number;
    category:string;
    color:string;
    image:string;
    description:string;
    id:number;
    quantity:undefined|number;
    productid:undefined|number;
    fullprice:undefined|number;
}

export interface cart{
    name:string;
    price:number;
    category:string;
    color:string;
    image:string;
    description:string;
    id:number | undefined;
    quantity:undefined|number;
    productid:number;
    userid:number;
    fullprice:undefined|number;
}
export interface pricesummary{
    price:number;
    discount:number;
    tax:number;
    dilevery:number;
    total:number;
}