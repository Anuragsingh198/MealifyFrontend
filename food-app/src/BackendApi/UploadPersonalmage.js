export const UploadPersonalImage= async({Image,ClientId})=>{
    console.log('yes');
const Data=await  fetch(`http://localhost:4000/${ClientId}/foreimage`,{
    method:"POST",
    body:JSON.stringify({
        Image:Image
    }),
    headers: { "Content-type": "application/json" },
});
if(Data.status==='200')
{
  return true;
}
else{
  return false;
}
}