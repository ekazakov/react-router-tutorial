import React from 'react'
import {Link} from 'react-router';
import NavLink from './NavLink'


export default React.createClass({
    contextTypes: {
        router: React.PropTypes.object
    },

    handleSubmit(e) {
        e.preventDefault();
        var userName = e.target.elements[0].value;      
        var repo = e.target.elements[1].value;      
        var path = `/repos/${userName}/${repo}`;
        console.log(path);

        this.context.router.push(path);
    },
    
    render() {
        return <div>
            <h2>Repos</h2>
            <ul>
                <li><NavLink to="/repos/rackt/react-router">React Router</NavLink></li>
                <li><NavLink to="/repos/facebook/react">React</NavLink></li>
                <li>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="userName"/> / {' '}
                        <input type="text" placeholder="repo"/>{' '}
                        <button type="submit">Go</button>
                    </form>
                </li>
            </ul>
            <div>
                {this.props.children}
            </div>
        </div>
    }
})
