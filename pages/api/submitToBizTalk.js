//Pretend this is the BizTalk endpoint
//Accepts values as json
//Returns http success code
export default function handler(req, res) {
  const body = req.body

  // Optional logging to see the responses
  // in the command line where next.js app is running.
  console.log('body: ', body)

  if (!body.contactName) {
    // Sends a HTTP bad request error code
    return res.status(400).json({ data: 'Contact name not found' })
  }

  // Found the name.
  // Sends a HTTP success code
  res.status(200).json({ data: `${body.contactName}` })
}