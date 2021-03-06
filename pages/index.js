import * as React from 'react';
import Link from 'next/link'
import Head from '../component/Head';
const braggersLogo = '../static/img/braggers_logo.png';

export default class App extends React.Component {

    constructor(props) {
        super(props);
    }

    async loginHandler() {
        const token = await Requester.post(endpoints.getTokenEnpoint);        
    }

    render() {
        return <div>
            <Head />
            <div className="row center-xs">
                <div className="col-xs-6">
                    <img src={braggersLogo} style={{ marginTop: '200px' }} />
                </div>
            </div>
            <div className="row center-xs">
                <div className="col-xs-7">
                    <h1 className="hdg hdg_1 mix-hdg_light">share your ideas. make an impact.</h1>
                </div>
            </div>
            <div className="row center-xs">
                <Link href={`/users`}><button className="button" onClick={this.props.loginHandler} type="submit">Join for Free</button></Link>
            </div>
            <div className="row center-xs">
                OR
            </div>                
            <div className="row center-xs">
                <div className="col-xs-3">
                    <input name="email" type="text" placeholder="enter email to enter" />
                    <Link href={`/sendtoken`}><button className="button" onClick={this.props.loginHandler} type="submit">Admin Area</button></Link>
                </div>
            </div>
        </div>

    }
}