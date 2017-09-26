class Cars {
  carSpeeds = [1, 2, 3]
  carTargetSpeeds = [3, 2, 1]

  constructor (svg) {
    this.cars = [0, 1, 2].map(index => {
      const car = svg.querySelector(`g image#car${index}`)
      const carY = this.getRandomCarY(index)
      car.setAttribute('y', carY)
      this.carSpeeds[index] = this.getRandomSpeed()
      this.carTargetSpeeds[index] = this.getRandomSpeed()
      return car
    })
  }

  getRandomSpeed = () => 2 + 3 * Math.random()
  getRandomCarY = index => 320 / 2 - 36 - 10 * (3 - index) - Math.random() * 6 + Math.random() * 6

  update = () => {
    this.cars.forEach((car, index) => {
      this.carSpeeds[index] += (this.carTargetSpeeds[index] - this.carSpeeds[index]) / 10
      const _carX = Number(car.getAttribute('x'))
      const carX = _carX + this.carSpeeds[index]
      car.setAttribute('x', carX)

      // Random start Y
      if (carX > 320) {
        car.setAttribute('x', 0)
        const carY = this.getRandomCarY(index)
        car.setAttribute('y', carY)
        this.carTargetSpeeds[index] = this.getRandomSpeed()
      }
    })
  }
}

export default Cars
