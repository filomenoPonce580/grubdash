# GrubDash Back-end Application
GrubDash is a Full Stack application that allows users to simulate ordering dishes online. The Front-end (not included) was created by Thinkful, and students were tasked with creating the server that connects to two resources, dishes and orders, and route appropriately.

For the frontend, please visit [Thinkful's GrubDash Front-end Repository](https://github.com/Thinkful-Ed/starter-grub-dash-front-end).

# Getting Started
To get started with this project, follow these steps:

1. Clone this repository to your local machine using `git clone https://github.com/filomenoPonce580/grubdash.git`.
2. Navigate to the project directory using `cd grubdash`.
3. Install the required dependencies using `npm install`.
4. Start the development server using `npm start`.

# API Calls

### Path: localhost:3000/dishes

**GET** 
> Lists all recipes available.

**POST**
> Creates a new recipe in this format:
```json
{
  "id": "3c637d011d844ebab1205fef8a7e36ea",
  "name": "Broccoli and beetroot stir fry",
  "description": "Crunchy stir fry featuring fresh broccoli and beetroot",
  "price": 15,
  "image_url": "https://images.pexels.com/photos/4144234/pexels-photo-4144234.jpeg?h=530&w=350"
}
```

### Path: localhost:3000/orders

**GET** 
> Lists all orders available.

**POST**
> Creates a new order in this format:
```json
{
  "id": "f6069a542257054114138301947672ba",
  "deliverTo": "1600 Pennsylvania Avenue NW, Washington, DC 20500",
  "mobileNumber": "(202) 456-1111",
  "status": "out-for-delivery",
  "dishes": [
    {
      "id": "90c3d873684bf381dfab29034b5bba73",
      "name": "Falafel and tahini bagel",
      "description": "A warm bagel filled with falafel and tahini",
      "image_url": "https://images.pexels.com/photos/4560606/pexels-photo-4560606.jpeg?h=530&w=350",
      "price": 6,
      "quantity": 1
    }
  ]
}
```

### Path: localhost:3000/orders/{orderId}

**GET** 
> Lists information for a specific order.

**PUT**
> Edits an Order:

**DELETE**
> Deletes the order


# Running Tests
This project includes a set of tests that can be run using the command line. To run the tests, use the command npm test.
