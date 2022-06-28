import "../testfile5.ts"


// a decorator function
function decorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log(target);
}
export class c {
  @decorator
  public b() { }
}
