class Vehicle {
  constructor(options) {
    this.type = options.type || '';
    this.name = options.name || '';
  }

  getType() {
    console.log(this.type);
  }

  getName() {
    console.log(this.name);
  }
}

class Car extends Vehicle {
  constructor(options) {
    console.log(new.target);
    if (!new.target) {
      console.log('new instance');
      return new Car({ name: 'Opel' });
    }
    options.type = 'car';
    super(options);
  }
}

const v = new Vehicle({ type: 'car', name: 'Mercedes' });
v.getType();
v.getName();

const car = Car();
car.getType();
car.getName();
