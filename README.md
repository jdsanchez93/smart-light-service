# smart-light-service

This requires two environment variables to be set, both of which can be found using the `tuya-cli wizard`

1. SMART_LIGHT_BULB_ID
2. SMART_LIGHT_BULB_KEY


Build the docker image like this:

`docker build -t jdeeezy/smart-light-service:0.0.1 .`

Run the docker image like below. 

Windows:
`docker run --rm -it -p 3000:3000 -p:6668:6668 -p 6666:6666/udp -p 6667:6667/udp --env SMART_LIGHT_BULB_ID=$env:SMART_LIGHT_BULB_ID --env SMART_LIGHT_BULB_KEY=$env:SMART_LIGHT_BULB_KEY jdeeezy/smart-light-service:0.0.1`

Linux:
`docker run --rm -it -p 3000:3000 -p:6668:6668 -p 6666:6666/udp -p 6667:6667/udp --env SMART_LIGHT_BULB_ID=$SMART_LIGHT_BULB_ID --env SMART_LIGHT_BULB_KEY=$SMART_LIGHT_BULB_KEY jdeeezy/smart-light-service:0.0.1`