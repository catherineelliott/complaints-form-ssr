// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//Since API Routes are on the server, we're able to use sensitive values (like API keys) through Environment Variables 
//without exposing them to the client. This is critical for the security of your application.

export default async function getAddress(req, res) {
  try {
    const { postcode } = req.query
    const result = await fetch(`https://api.postcodes.io/postcodes/${postcode}`);//fetch(`https://esbuat.leeds.gov.uk/LCC.Services.LLPG/SearchAddress?postcode=LS11UR`)

    const data = await result.json() 
    
    if (data.status === 200) {
      console.log('result data 200',data)
      return res.status(200).json({ status: data.status, country: data.result.country, addresses: ["123 Fake Street","456 Fake Street"] }) 
    }
    else {
      console.log('result data error',data)
      return res.status(data.status).json({status: data.status, message: data.error})
    }
  }
  catch (err) {
    return res.status(500).json({message: err.message})
  }
  
}