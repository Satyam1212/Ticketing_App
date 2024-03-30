import 'bootstrap/dist/css/bootstrap.css';
import BuildClient from '../api/build-client';
import  Header  from '../components/header';

const AppComponent = ({Component, pageProps, currentUser}) => {
    return (
        <div>

        {/* <h1>Header! {currentUser.email}</h1> */}
        <Header currentUser={currentUser}/>
        <Component {...pageProps}/>
        </div>
     )
        
}

AppComponent.getInitialProps = async(appContext) =>{
    // console.log(Object.keys(appContext)); // [ 'AppTree', 'Component', 'router', 'ctx' ]
    const client = BuildClient(appContext.ctx);
    const { data } = await client.get('/api/users/currentuser');

    //console.log(appContext); you will find getInitialprops in the Component
    let pageProps = {};
    if(appContext.Component.getInitialProps){
        pageProps = await appContext.Component.getInitialProps(appContext.ctx)
    }


    console.log(pageProps)

    console.log(data)
    return {
        pageProps,
        ...data,
        // currentUser: data.currentUser
    };
}

export default AppComponent;