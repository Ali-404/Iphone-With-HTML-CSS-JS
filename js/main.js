


class Phone {
    power = false
    apps = []
    volume = 1

    container = null
    power_btn = null

    togglePower(){
        this.power = !this.power
        this.updatePower()
    }

    updatePower(){
        this.container.classList.toggle("off",!this.power)
    }
    
    constructor(){

        this.container = document.querySelector(".container")
        this.power_btn = document.getElementById("power")
        this.power_btn.onclick = () => this.togglePower()
        this.updatePower()
    }

    

}


const phone = new Phone()


