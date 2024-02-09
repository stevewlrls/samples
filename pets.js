class Pet {
  constructor(type, name) {
    this.type = type
    this.name = name
  }
  printName() {
    console.log(`"${this.name}" the ${this.type}`)
  }
}

const sticky = new Pet('stick insect', 'sticky')
sticky.printName()

class Dog extends Pet {
  constructor(name, breed) {
    super('dog', name) // Call Pet constructor
    this.breed = breed // Add extra data
  }
  printName() {
    console.log(`"${this.name}" the ${this.breed}`)
  }
}

const freddy = new Dog('freddy', 'Lakeland Terrier')
freddy.printName()

class Cat extends Pet {
  constructor(name, fur) {
    super('cat', name) // Call Pet constructor
    this.fur = fur // Add extra data
  }
  printName() {
    console.log(`"${this.name}" the ${this.fur}-haired cat`)
  }
}

const tabby = new Cat('tabby', 'short')
tabby.printName()
