export class Deferred {

    promise:Promise<any>;
    reject!:()=>void;
    resolve!:(data:any)=>any;
    data:any

    constructor() {
      this.promise = new Promise((resolve, reject)=> {
        this.reject = reject
        this.resolve = resolve
      })
    }
}