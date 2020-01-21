class Runner {
    constructor(x) {
        this.scene = document.querySelector('.scene')

        this.runner = document.querySelector(x.runner)
        this.runnerLegs = this.runner.querySelector('.runner__legs')

        this.road = this.runner.closest('.scene').querySelector('.road')
        this.roadStructure = this.road.querySelectorAll('img')
        this.cars = this.scene.querySelector('.cars')

        this.moveSize = 0
        this.level = 5
        this.fps = 10
        this.moveTOrF = true
        this.btn = x.btn
        this.moveLegSize = 0
        this.carsMove = 0
        this.moveJump = 0
        this.score = 0

        document.addEventListener('keydown', (e) => { this.jump(e) })


        document.addEventListener('keydown', (e) => { this.move(e) })
        document.addEventListener('keydown', (e) => { this.gamePause(e) })

        this.algoritmCars()

        this.dayOrNight()
    }
    move(e) {
        if (e.code == 'Enter') this.moveTOrF = true;
        if (e.code == 'Enter' || e == true) {
            if (this.moveSize >= this.road.clientWidth) {
                this.moveSize = 0
            }
            if (this.fps <= 5) {
                this.fps = 5
            }
            this.moveSize = this.moveSize + this.level
            this.level = this.level + 0.0001
            this.fps = this.fps - 0.01

            for (let i = 0; i < this.roadStructure.length; i++) {
                const el = this.roadStructure[i];
                el.style.transform = `translateX(${this.moveSize * -1}px)`
            }

            let moveInterval = setTimeout(() => {
                this.move(true)
                this.moveLegs()
                this.gameEnd()
            }, this.fps)
            if (this.moveTOrF == false) {
                clearInterval(moveInterval)
            }
            this.moveCars()

            this.gameScore()
        }
    }
    moveCars() {
        this.carsMove += 5
        this.cars.style.transform = `translateX(-${this.carsMove}px)`

    }
    algoritmCars() {
        let carsInterval = setTimeout(() => {
            let random = 900 + Math.random() * (5000 + 1 - 900);
            if (this.carsMove >= Math.floor(random)) {
                this.carsMove = 0
            }
            this.algoritmCars()
        }, 1000)
    }
    moveLegs() {
        this.moveLegSize++
        this.runnerLegs.children[0].style.transform = `translateX(${this.moveLegSize}px)`
        if (this.moveLegSize >= 12) {
            this.moveLegSize = 0;
        }
        this.runnerLegs.children[1].style.transform = `translateX(-${this.moveLegSize}px)`
    }

    dayOrNight() {
        let dayOrNightInterval = setTimeout(() => {
            this.dayOrNight()
            this.road.children[0].style = `z-index:1;`
        }, 10000);
        setTimeout(() => {
            clearTimeout(dayOrNightInterval)
            this.road.children[0].style = `z-index:0;`
        }, 15000);
    }

    jump(e) {
        if (e.code == this.btn && this.moveJump == 0 || e == true) {
            this.moveJump += 5
            this.runner.style.transform = `translateY(-${this.moveJump}px)`

            let jumpSetInterval = setTimeout(() => {
                this.jump(true)
            }, 0)
            if (this.moveJump >= (this.scene.clientHeight - 100)) {
                clearInterval(jumpSetInterval)
                this.drop()
            }
        }
    }
    drop() {
        this.moveJump -= 2
        this.runner.style.transform = `translateY(-${this.moveJump}px)`

        let jumpSetInterval = setTimeout(() => {
            this.drop(true)
        }, 0)
        if (this.moveJump == 0) {
            clearInterval(jumpSetInterval)
        }
    }
    gamePause(e) {
        if (e.code == 'Escape') {
            this.moveTOrF = false;
        }
    }

    gameEnd() {
        if (this.carsMove == 660 && this.moveJump <= 60 || this.carsMove == 750 && this.moveJump <= 60) {
            alert(`Вы проиграли !!!
Ваш счёт: ${this.score}`)
            location.reload()
        }
    }
    gameScore() {
        this.score++
        document.querySelector('.game-score').innerHTML = this.score;
    }
}



const tRex = new Runner({
    runner: '.t-rex',
    btn: 'Space'
})

console.log(tRex);


