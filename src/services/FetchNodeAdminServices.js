import axios from 'axios'
const serverURL='http://localhost:5000'
const currentDate=()=>{
  var d=new Date()
  var cd=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()
  var ct=d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()
  return(cd+" "+ct)
}
const createDate=(date)=>{
  var d=new Date(date)
  var cd=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()
  var ct=d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()
  return(cd+" "+ct)
}
const postData=async(url,body)=>{
  try{
  var response= await axios.post(`${serverURL}/${url}`,body)  
  var result=response.data
  return result
  }
  catch(e)
  {
    return e.response.data
  }


}
const getData=async(url)=>{
  try{
  var response= await axios.get(`${serverURL}/${url}`)  
  var result=response.data
  return result
  }
  catch(e)
  {
    return e.response.data
  }


}

export{ postData,serverURL,currentDate,getData,createDate}
