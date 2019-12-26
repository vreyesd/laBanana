const inputs = require('./inputs')
const Exchange = require('./exchange')

const exchange = new Exchange()

const main = () => {
    const {orders} = inputs

    for(let i=0; i<orders.length; i++) {
        const order = orders[i]

        exchange.newOrder(order)
    }

    console.log(JSON.stringify({
        transactions: exchange.transactionsToPrint(),
        orders: [
            ...exchange.ordersToPrint('ask').filter(o => !o.executed), 
            ...exchange.ordersToPrint('bid').filter(o => !o.executed)
        ]
    }))
}

main()