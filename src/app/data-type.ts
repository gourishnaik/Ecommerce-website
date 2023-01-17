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
    fullprice:number;
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
    fullprice:number;
}
export interface pricesummary{
    price:number;
    discount:number;
    tax:number;
    dilevery:number;
    total:number;
}
export interface checkout{
    email:string;
    address:string;
    phonenumber:number;
    totalprice:number;
    userid:string;
    id:number|undefined; // from checkout we need a id to go further
}