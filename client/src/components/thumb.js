import React, { Component } from 'react';
import { config } from '../helpers/config';

class Thumb extends Component {
    state = {
        loading: false,
        filePath: '',
        fileName: '',
    };

    componentWillReceiveProps(nextProps) {
        if (!nextProps.file) { return; }

        const file = nextProps.file;

        if (typeof file === 'string' || file instanceof String) {
            this.setState({ filePath: file, fileName: file });
        } else {
            this.setState({ loading: true }, () => {
                let reader = new FileReader();

                reader.onloadend = () => {
                    this.setState({ loading: false, filePath: reader.result, fileName: file.name });
                };

                reader.readAsDataURL(nextProps.file);
            });
        }
    }

    render() {

        if (this.state.loading) { return <p>loading...</p>; }

        if (!this.props.file) { return null; }
        
        if (this.props.file && this.props.file.name) {
            return (
                <img src={'' + this.state.filePath} alt={this.state.fileName} className="img-thumbnail mt-2" height={200} width={200} />
            );
        }
        else {
            return (
                <img src={config.imgUrl + this.props.file} alt={this.state.fileName} className="img-thumbnail mt-2" height={200} width={200} />
            );
        }
    }
}

export default Thumb;