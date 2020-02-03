const inputs = require('./inputs')
const Exchange = require('./exchange')

const exchange = new Exchange()

const main = () => {
    const {orders} = inputs

    for(let i=0; i<orders.length; i++) {
        const order = orders[i]

        exchange.setNewOrder(order)
    }

    console.log({
        transactions: JSON.stringify(exchange.transactions),
        orders: [
            ...exchange.ordersToPrint('ask').filter(o => o.remaining), 
            ...exchange.ordersToPrint('bid').filter(o => o.remaining)
        ]
    })
}

main()