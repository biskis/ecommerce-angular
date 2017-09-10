export class Order {
    _id: string;
    user: string;
    status: string;
    address: any;
    billing_address: any;
    products:any;

    prices  : {
        products  :number,
        delivery : number,
        total     : number
    };
}
