import axios from 'axios'
import { useEffect, useState } from 'react'

const BitCoin = () => {

    const [bitcoin, setbitcoin] = useState(0)

    const fetchBitCoin = async () => {
        try {
            const resp = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd")
            // console.log(resp)
            setbitcoin(resp?.data?.bitcoin?.usd)
        } catch (error) {
            console.log(error)
        }
    }

    console.log("this is the main output ", bitcoin)

    useEffect(() => {
        fetchBitCoin()
        const interval = setInterval(() => {
            fetchBitCoin()
        }, 2000);
        
        return () => clearInterval(interval)
    }, [])

    return (
        <>
            price:{bitcoin}
        </>
    )
}

export default BitCoin