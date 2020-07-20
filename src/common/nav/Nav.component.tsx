import * as React from 'react';
import './Nav.component.scss';

export interface NavComponentProps {
}

export interface NavComponentState {
}

export default class NavComponent extends React.Component<NavComponentProps, NavComponentState> {
    constructor(props: NavComponentProps) {
        super(props);

        this.state = {
        }
    }

    public render() {
        return (
            <div>

            </div>
        );
    }
}
