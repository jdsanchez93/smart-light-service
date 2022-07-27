const express = require('express')
const bodyParser = require('body-parser')
const TuyAPI = require('tuyapi')

const app = express()
const port = 3000

const jsonParser = bodyParser.json();

app.put('/', jsonParser, (req, res) => {
    const body = req.body;

    let obj = {};
    if (Object.keys(body).find(x => x === 'isOn')) {
        obj['20'] = body.isOn
    }

    if (Object.keys(body).find(x => x === 'colorString')) {
        obj['21'] = body.colorString
    }

    if (Object.keys(body).find(x => x === 'colorCode')) {
        obj['24'] = body.colorCode
    }

    //get device id/key from env variables
    const device = {
        id: process.env.SMART_LIGHT_BULB_ID,
        key: process.env.SMART_LIGHT_BULB_KEY
    };

    console.log(device);

    setSmartLight(obj, device.id, device.key)
        .then(() => {
            res.sendStatus(204);
        })
        .catch(x => {
            res.status(500).send(x)
        });

})

app.listen(port, () => {
    console.log(`Server running on ${port}`);
})

async function setSmartLight(smartLightData, id, key) {

    return new Promise((resolve, reject) => {
        const device = new TuyAPI({
            id: id,
            key: key
        });

        // Find device on network
        device.find()
            .then(() => {
                console.log('device found')
                // Connect to device
                device.connect();
            })
            .catch(err => {
                console.log('Unable to find', err);
                reject(err.message);
            });

        // Add event listeners
        device.on('connected', () => {

            let setObj = {
                multiple: true,
                data: smartLightData
            }
            device.set(setObj)
                .then(res => {
                    console.log('device set', res)
                    device.disconnect();
                    resolve("good to go");
                })
                .catch(err => {
                    console.log('error during set', err)
                    device.disconnect();
                    reject("error during set");
                });

        });

        device.on('disconnected', () => {
            console.log('Disconnected from device.');
        });

        device.on('error', error => {
            console.log('Error!', error);
            reject(error);
        });

        // Disconnect after 10 seconds
        setTimeout(() => { device.disconnect(); }, 10000);
    });
}