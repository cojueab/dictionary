
import * as React from "react";

import {
    Alignment,
    Button,
    Classes,
    InputGroup,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NavbarHeading,
} from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import {style} from "typestyle";

import {Link} from "react-router-dom";
import './Navbar.css';
const aClass = style({
    $nest: {
      '&': {
        color: 'white',
      },
      '&:hover': {
        color:'black',
      },
    },
  });
export class NavbarExample extends React.PureComponent<any, any> {

    public render() {
        return (
            <Navbar className='bp3-dark' style={{justifyContent: "center"}}>
                <NavbarGroup align={Alignment.CENTER} style={{maxWidth: '760px', margin: "0 auto" }}>
                    <NavbarHeading><Link to="/" className={aClass}>Dictionary</Link></NavbarHeading>
                    <NavbarDivider/>
                    <InputGroup
                        leftIcon="search"
                        placeholder="Filter phrases..."
                        onChange={this.props.onChange}
                    />
                    <Link to="/create" style={{textDecoration: 'none'}}><Button className={Classes.MINIMAL} icon="add" text="Add phrase"/></Link>

                </NavbarGroup>
            </Navbar>
        );
    }
}