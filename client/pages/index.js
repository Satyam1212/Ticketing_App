import axios from "axios";
//We cant use hook here . hook is used in react component . getInitialProps is not a function

const LandingPage = ({currentUser}) =>{
    console.log(currentUser)
    return <h1>LandingPage</h1>
};

//This is only in next js. So next js is going to call this function while it is attempting to render our application on the server. Get Initial props is our opportunity to attempt to fetch some data that this component needs during server side rendering process
//This is static method
LandingPage.getInitialProps = async() =>{
    const response = await axios.get('/api/users/currentuser').catch((err) =>{
        console.log(err.message)
    });
    console.log('I am on server');

    return {};

}
export default LandingPage;