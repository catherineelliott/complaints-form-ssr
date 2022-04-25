function test(data) {
    return <div>{data.name}</div>
}

// This gets called on every request
export async function getServerSideProps(context) {
    console.log('ss');
  // Fetch data from external API
/*     const res = await fetch(`https://api.github.com/users/catherineelliott`);//fetch(`https://esbuat.leeds.gov.uk/LCC.Services.LLPG/SearchAddress?postcode=LS11UR`)
  console.log('res',res);
  const data = await res.json() */
  const data = {"name":"Cath"}
  console.log('data',data);
  // Pass data to the page via props
  return { props: { data } }
}

export default test