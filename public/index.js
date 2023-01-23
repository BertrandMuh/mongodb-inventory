console.log('connected');

const submitButton = document.getElementById('submit-btn');

const getItem = async () => {
    let name = document.getElementById('name-search').value.toLowerCase();
    let main = document.getElementById('main')
    let response = await fetch(`/get_item/${name}`);
    let parseData = await response.json();
    console.log(parseData);
    parseData.forEach(el => {
        let para = document.createElement('p')
        para.style.color = 'red';
        para.textContent = el.name;
        while (main.firstChild) {
            main.removeChild(main.firstChild)
        }
        main.appendChild(para)
    })
}
const displayAllItems = async () => {
    let main = document.getElementById('main');
    let response = await fetch('/get_all_items');
    let parseData = await response.json();
    parseData.forEach(el => {
        let para = document.createElement('p');
        para.textContent = el.name;
        main.appendChild(para)
    })
}

const addItem = async () => {
    let name = document.getElementById('item-name').value.toLowerCase();
    let price = +document.getElementById('price').value;
    let inventory = +document.getElementById('inventory').value;
    let deliveryAmt = +document.getElementById('delivery-amt').value;
    let nextDelivery = document.getElementById('next-delivery').value;
    let requestData = {
        price,
        inventory,
        nextDelivery,
        deliveryAmt,
        name
    }

    let response = await fetch('/create_item', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    if (response.status === 200) {
        let parseData = await response.json();
        console.log(parseData.name, 'was added successfully.');
    }
    else {
        console.log('Something went wront', response.status);
    }
    while (main.firstChild) {
        main.removeChild(main.firstChild)
    }
    displayAllItems()
}

window.onload = displayAllItems()
let addButton = document.getElementById('add-btn');
addButton.addEventListener('click', addItem)
submitButton.addEventListener('click', getItem)
