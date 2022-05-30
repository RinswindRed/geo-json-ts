# To start
git clone
npm/yarn install
npm/yarn start

Run units:
npm/yarn test


## Pipeline
React, TypeScript, openstreetmap, osmtogjson, react-leafleat, turf

## Description
Applications is using openStreetApi "https://www.openstreetmap.org/api/0.6/map" to download osm file by given coordinates.
You can pass latitude and langitude or pass bbox params.
Due large osm file size in API response, bbox parameters are generated in 0.5km radius when lat,lng is passed.
OsmToGjson is used to convert osm to gjson, and map is from react-leaflet.
If Map looks empty please un-zoom it.
Coordinates can be copy/pasted from Google maps.

## TODO
App is not fully unit covered.
Error handling need to be done on proper way.
Inputs validation can be beeter.

## Author
Nikolic Dragan 10/05/2022
