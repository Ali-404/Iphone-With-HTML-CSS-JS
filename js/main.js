


class Phone {
    power = false
    apps = []
    volume = 1

    container = null
    power_btn = null
    battery_level = 100

    togglePower(){
        this.power = !this.power
        this.updatePower()
    }

    updatePower(){
        this.container.classList.toggle("off",!this.power)
    }
    updateStatusBar(){
        // battery
        const batteryEl = document.querySelector("#battery_indicator #indicator_count")
        const batteryElRange = document.querySelector("#battery_indicator #indicator")
        batteryEl.innerHTML = this.battery_level
        batteryElRange.style.width = this.battery_level + "%"
        if (this.battery_level >= 100){
            batteryElRange.style.backgroundColor = "green"
        }else if (this.battery_level > 20){
            batteryElRange.style.backgroundColor = "white"
            batteryEl.style.color = "black"
            batteryEl.style.textShadow = "none"
        }else {
            batteryElRange.style.backgroundColor = "red"
        }
    }
    
    constructor(default_power = false, battery_level = 100){

        this.power = default_power
        this.battery_level = battery_level


        this.container = document.querySelector(".container")
        this.power_btn = document.getElementById("power")
        this.power_btn.onclick = () => this.togglePower()
        this.updatePower()

        this.updateStatusBar()
        this.updateLock()
        setInterval(this.updateLock, 1000)
    }


    setBatteryLevel(level){
        this.battery_level = level
        this.updateStatusBar()
    }


    updateLock(){
        const lockDateEl = document.getElementById("lock_date")
        const lockTimeEl = document.getElementById("lock_time")
        const date = new Date()
        const options = {
            weekday: 'short',  
            day: '2-digit',    
            month: 'short'     
        };
        const time = date.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false  
        });
        
        lockDateEl.innerHTML = date.toLocaleDateString("en-US", options)
        lockTimeEl.innerHTML = time
    }
    

}


const phone = new Phone(true)
phone.setBatteryLevel(19)
