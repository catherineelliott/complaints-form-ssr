export default async function getNextPage(req, res) {
/*     const data = JSON.parse(req.body);
    let nextPage = data.currentPage + 1;

    switch(data.currentPage) {
        case 1:
            if (data.values.contactYesNo === "No")
                nextPage = 4
          break;
        case 6:
          // code block
          break;
      }

    res.status(200).json({ page: nextPage }); */

    const data = JSON.parse(req.body);
    let nextPage = "";

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