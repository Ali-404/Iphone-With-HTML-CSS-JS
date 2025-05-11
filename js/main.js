


class Phone {

    WIDTH = 300
    HEIGHT = 600

    power = false
    apps = []
    volume = 1
    
    container = null
    power_btn = null
    battery_level = 100
    brightness_level = 100


    statusBar = {
        isDragging: false,
        startY: 0
    }

    draggableStatusBar(){
        const statusBarEl = document.getElementById("status_bar")
        const settingsPanel = document.getElementById("settings_screen")
    
        statusBarEl.addEventListener("mousedown", (e) => {
            this.statusBar.isDragging = true;
            this.statusBar.startY = e.clientY; 
            settingsPanel.style.transition = 'none'; 
        })

        document.addEventListener("mousemove", (e) => {
            if (!this.statusBar.isDragging) return;
            let dragY = e.clientY - this.statusBar.startY
            if (dragY > 0){
                const newH = -100 + ( (dragY / this.HEIGHT) * 100)
                settingsPanel.style.top = `${newH}%`;
            }
            
            
        })


        document.addEventListener('mouseup', (e) => {
            if (!this.statusBar.isDragging) return;
            this.statusBar.isDragging = false;
            settingsPanel.style.transition = 'top 0.3s ease';
          
            const panelRect = settingsPanel.getBoundingClientRect();
            log(panelRect.top)
            if (panelRect.top > -70) {
              // Open
              settingsPanel.style.top = '0';
            } else {
              // Close
              settingsPanel.style.top = '-100%';
            }
        });
    }

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
    
    constructor(default_power = false, battery_level = 100, brightness_level = 100){

        this.power = default_power
        this.battery_level = battery_level
        this.brightness_level = brightness_level


        this.container = document.querySelector(".container")
        this.power_btn = document.getElementById("power")
        this.power_btn.onclick = () => this.togglePower()
        this.updatePower()

        this.updateStatusBar()
        this.updateLock()
        this.draggableStatusBar()
        setInterval(this.updateLock, 1000)
    }


    setBatteryLevel(level){
        this.battery_level = level
        this.updateStatusBar()
    }

    setBrightnessLevel(level){
        this.brightness_level = level
        this.updateLock()
    }

    updateLock(){
        // update brightness
        if (this.brightness_level < 30){
            this.setBrightnessLevel(30)
        }
        document.querySelectorAll(".screen").forEach(e => e.style.filter = `brightness(${this.brightness_level}%)`)

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
phone.setBatteryLevel(50)
phone.setBrightnessLevel(100)



function log(string){
document.getElementById("console_log").innerHTML = string.toString()
}