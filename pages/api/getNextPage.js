export default async function getNextPage(req, res) {
    const data = JSON.parse(req.body);
    let nextPage = data.currentPage + 1;

    switch(data.currentPage) {
        case 1:
            if (data.values.contactYesNo === "false")
                nextPage = 4
          break;
        case 6:
          // code block
          break;
      }

    res.status(200).json({ page: nextPage });
}