document.getElementById('addBtn').addEventListener('click', addToCart)
const nameBox = document.getElementById('name')
const priceBox = document.getElementById('price')
let xbtns


async function addToCart(){
    const data = {
        name: nameBox.value,
        price: priceBox.value
    }
    const url = 'http://127.0.0.1:3000/cart'
    const response = await fetch(url, {
        method: "POST", 
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow", 
        referrerPolicy: "no-referrer", 
        body: JSON.stringify(data)
    })
    getCart()
}

async function getCart(){
    document.getElementById('cart').remove()
    const res = await fetch('http://127.0.0.1:3000/cart');
    const cart = await res.json()
    console.log(cart)
    const cartArea = document.createElement('div')
    cartArea.id = 'cart'
    document.body.append(cartArea)
    for(let item of cart.cart){
        const li = document.createElement('li')
        li.textContent = `${item.name}, ${item.price}`
        const xbtn = document.createElement('div')
        xbtn.classList.add('xbtn')
        xbtn.textContent = "x"
        xbtn.dataset.item = item.name
        const container = document.createElement('div')
        container.style.display = "flex"
        container.style.gap = "6px"
        container.style.marginTop = "6px"
        container.append(li, xbtn)
        document.getElementById('cart').append(container)
    }
    xbtns = document.querySelectorAll('.xbtn')
    for(let xbtn of xbtns){
        xbtn.addEventListener('click', rmvItem)
    }
    return cart
}


async function rmvItem(e){
    const item = e.target.dataset.item
    const url = `http://127.0.0.1:3000/cart/${item}`
    const response = await fetch(url, {
        method: "DELETE", 
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow", 
        referrerPolicy: "no-referrer", 
    })
    getCart()
}






getCart()

