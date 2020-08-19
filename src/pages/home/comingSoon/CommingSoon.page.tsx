import * as React from 'react';

export interface IAppProps {
}

export interface IAppState {
}

export default class CommingSoonPage extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);

        this.state = {
        }
    }

    render() {
        return (
            <div>
                COMMING SOON
            </div>
        );
    }
}
