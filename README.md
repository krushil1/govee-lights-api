## A simple API created to control my Govee Smart Lights

Functionality of this API is to control my smart light's brightness and color via a react app's front-end interface for easy color/brightness shortcuts as well as Siri shortcuts for custom colors/brightness.

The API also implements a personal API key so the incoming requests can be solely made by me.

<br>

### Example of an api call:

#### POST /control

```json
{
  "brightness": 50,
  "r": 75,
  "g": 0,
  "b": 130
}
```

<br>

### Return response

```json
{
  "brightness": {
    "code": 200,
    "message": "Success",
    "data": {}
  },
  "color": {
    "code": 200,
    "message": "Success",
    "data": {}
  }
}
```
