export class Order {
    _id: string;
    user: string;
    status: number;
    address: any;
    products:any;

    prices  : {
        products  :number,
        delivery : number,
        total     : number
    };
}
