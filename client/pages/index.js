// import axios from "axios"; as we create BuildClient we dont need this
//We cant use hook here . hook is used in react component . getInitialProps is not a function
import { BuildClient } from "../api/build-client";

const LandingPage = ({currentUser}) =>{
    return currentUser ? <h1>You are signed in</h1>: <h1>You are not signed in</h1>
};

//This is only in next js. So next js is going to call this function while it is attempting to render our application on the server. Get Initial props is our opportunity to attempt to fetch some data that this component needs during server side rendering process
//This is static method
// LandingPage.getInitialProps = async({ req }) =>{
//     // const response = await axios.get('/api/users/currentuser').catch((err) =>{
//     //     console.log(err.message)
//     // });
//     // console.log('I am on server');
//     console.log(req.headers)
//     //To know wheather on the server or browser
//     if(typeof window === 'undefined'){ //window object that only exist in browser and not on node.js environment
//         // We are on the server
//         // requests should be made to http://ingress-nginx-controller.ingress-nginx.svc.cluster
//         try{
//             //destructure data from response
//             const {data} = await axios.get('http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser', {
//                 // headers: {
//                 //     Host: 'ticketing.dev'
//                 // }
//                 headers: req.headers
//             } )
//             console.log('on server')
//             return data;
//         }
//         catch(err){
//             console.log(err.message)
//         };

//     }else{
//         //we are on the browser
//         //requests can be made with a base url of ''
//         try{
//             const {data} = await axios.get('/api/users/currentuser'); //destructure data from response
//             console.log('on browser')
//             return data;
//         }
//         catch(err){
//             console.log(err.message)
//         };
//     }
//     return {}

// }


LandingPage.getInitialProps = async(context) => {
    const {data} = await BuildClient(context).get('/api/users/currentuser');
    return data;
}
export default LandingPage;