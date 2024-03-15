let wallet, slot, display

const drinks = [
  { name: 'Cola', price: 50 },
  { name: 'Spritz', price: 50 },
  { name: 'Water', price: 50 }
]

class Wallet {
  constructor(id) {
    this.coins = []
    this.el = document.querySelector(`#${id} img`)
    this.el.draggable = true
    this.el.ondragstart = this.spendCoin.bind(this)
    this.el.ondragend = this.removeCoin.bind(this)
    this.showNext()
  }
  addMoney(coins) {
    this.coins.push(...coins)
    this.showNext()
  }
  spendCoin(ev) {
    const coin = this.coins[0]
    if (coin) {
      ev.dataTransfer.setData(
        'application/x-coin-payment',
        JSON.stringify({ coin })
      )
    } else {
      console.log('Wallet empty')
      ev.preventDefault()
    }
  }
  removeCoin(ev) {
    if (ev.dataTransfer.dropEffect !== 'none') {
      console.log('Spending', this.coins[0])
      this.coins.shift()
      this.showNext()
    }
  }
  showNext() {
    const coin = this.coins[0]
    this.el.nextElementSibling.innerText = coin
      ? 'Next coin: ' + coin
      : 'Wallet empty'
  }
}

class DisplayPanel {
  constructor(id) {
    this.value = 0
    this.el = document.getElementById(id)
    this.update()
  }
  setValue(val) {
    this.value = val
    this.update()
  }
  update() {
    this.el.innerText = (this.value / 100).toFixed(2)
  }
}

class CoinSlot {
  constructor(id) {
    this.coins = 0
    const el = document.getElementById(id)
    el.ondragover = (ev) => ev.preventDefault()
    el.ondrop = this.receiveCoin.bind(this)
  }
  receiveCoin(ev) {
    const data = ev.dataTransfer.getData('application/x-coin-payment')
    const { coin } = JSON.parse(data)
    if (coin) {
      this.coins += coin
      display.setValue(this.coins)
    }
  }
  pay(amount) {
    if (this.coins < amount) return false
    this.coins -= amount
    display.setValue(this.coins)
    return true
  }
}

class Hopper {
  constructor(drink, count) {
    this.drink = drink
    this.count = count
  }
  dispenseDrink(name) {
    if (this.count < 1) console.log('Hopper empty:', name)
    else if (!slot.pay(this.drink.price)) console.log('Insufficient coins')
    else {
      this.count--
      console.log('Drink dispensed:', this.drink.name)
      return true
    }
    return false
  }
}

class DrinkButton {
  constructor(bn, hopper) {
    this.name = hopper.drink.name
    this.hopper = hopper
    const image = new Image()
    bn.className = 'drink-button'
    bn.title = hopper.drink.name
    bn.onclick = () => this.hopper.dispenseDrink()
    image.src = 'images/soda-575433_640.png'
    image.alt = this.name
    bn.appendChild(image)
  }
}

wallet = new Wallet('wallet')
wallet.addMoney([10, 10, 25, 25, 50, 50, 25, 10])
display = new DisplayPanel('display-panel')
slot = new CoinSlot('coin-slot')
const buttons = document.getElementById('drink-buttons')
for (d of drinks) {
  const hopper = new Hopper(d, 5)
  const bn = document.createElement('button')
  new DrinkButton(bn, hopper)
  buttons.appendChild(bn)
}
