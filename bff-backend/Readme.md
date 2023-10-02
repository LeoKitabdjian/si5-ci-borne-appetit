# Borne'Appetit

This is a Backend For Frontend designed for Borne'Appetit(BA) app.

I work mainly like gateway between [Micro Restaurant](https://github.com/collet/micro-restaurant-public)
and the client (Borne).

To use this application, you need to up Micro Restaurant app first and then 
`docker-compose up bff` to start this application inside docker container.

## Troubleshooting

### Communication between this app and the gateway
Assure to put the image in the same network with the micro restaurant.
If you get error 500, it means the services are not in the same network. You can type 
`docker network ls | grep restaurant` to find the name of the network. Then, change 
the network name inside docker-compose.yml file

[ Communication between multiple docker-compose projects ](https://stackoverflow.com/questions/38088279/communication-between-multiple-docker-compose-projects)