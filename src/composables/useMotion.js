import {
    Plugins
} from '@capacitor/core';
const {
    Motion
} = Plugins;

export function useMotion() {
    let acceleration = {
        x: 0,
        y: 0,
        z: 0,
    }

    const initMotionSensor = async () => {
        try {
            await Motion.requestPermissions
        } catch (e) {
            // Handle error
            console.log("coudn't get motion sensor permission")
            return false
        }
        console.log("success");
        return true
    }

    const getMotion = async () => {
        //Motion.requestPermissions
        //initMotionSensor()
        Motion.addListener('accel', (event) => {
            console.log(
                "x: ", event.acceleration.x,
                "\ny: ", event.acceleration.y,
                "\nz: ", event.acceleration.z
            )
        });
        return 12
    }

    const detectShake = () => {
        this.subscription = Motion.watchAcceleration({
            frequency: 200
        }).subscribe(acc => {
            console.log(acc);

            if (!this.lastX) {
                this.lastX = acc.x;
                this.lastY = acc.y;
                this.lastZ = acc.z;
                return;
            }

            let deltaX, deltaY, deltaZ;
            deltaX = Math.abs(acc.x - this.lastX);
            deltaY = Math.abs(acc.y - this.lastY);
            deltaZ = Math.abs(acc.z - this.lastZ);

            if (deltaX + deltaY + deltaZ > 3) {
                this.moveCounter++;
            } else {
                this.moveCounter = Math.max(0, --this.moveCounter);
            }

            if (this.moveCounter > 2) {
                console.log('SHAKE');
                this.moveCounter = 0;
            }

            this.lastX = acc.x;
            this.lastY = acc.y;
            this.lastZ = acc.z;
        });
    }

    return {
        coord,
        initMotionSensor,
        getMotion,
        detectShake
    }
}