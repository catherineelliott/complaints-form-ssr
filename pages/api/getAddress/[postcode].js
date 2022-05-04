// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//Since API Routes are on the server, we're able to use sensitive values (like API keys) through Environment Variables 
//without exposing them to the client. This is critical for the security of your application.

export default async function getAddress(req, res) {
  /* const { postcode } = req.query
  const result = await fetch(`https://api.github.com/users/${postcode}`);//fetch(`https://esbuat.leeds.gov.uk/LCC.Services.LLPG/SearchAddress?postcode=LS11UR`)

  const data = await result.json() 

  res.status(200).json({ name: data.login }) */
  res.status(200).json({ route: [0,1,2] })
}