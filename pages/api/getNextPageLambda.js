export default async function getNextPageLambda(req, res) {
    
    const data = JSON.parse(req.body);
    let nextPage = "";
    console.log('data', data)
    switch(data.currentPage) {
        case "WhatDoYouWantToDo":
            nextPage = "ContactYesNo"
          break;
        case "ContactYesNo":
            if (data.values.contactYesNo === "No")
                nextPage = "Summary"
            else
            nextPage = "Contact"
          break;
        case "Contact":
            nextPage = "Address"
          break;
        case "Address":
            nextPage = "Summary"
          break;
        default:
            nextPage = "Summary"
      }

    res.status(200).json({ page: nextPage });
}