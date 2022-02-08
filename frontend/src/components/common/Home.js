import { useState, useEffect } from "react";
let a = localStorage.getItem('loggedin');
console.log(a);

const Home = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setName("Dass TAs");
  }, []);
  
  if(a!=="1")
  return <div style={{ textAlign: "center" }}><br></br><br></br>Welcome!<br></br><br></br><br></br> Please Login or Register to use this Web-App</div>;

  else
  {
    let type = localStorage.getItem('usertype')
    if(type==='customer')
    {
      
    return <div style={{ textAlign: "center" }}>Welcome customer -{localStorage.getItem('email')}! </div>;
    }
    else{
      
      return <div style={{ textAlign: "center" }}>Welcome vendor -{localStorage.getItem('email')}!</div>;
    }
  }
};

export default Home;
