// import * as React from 'react';

// export interface IAppProps {
// }

// export interface IAppState {
// }

// export default class CommingSoonPage extends React.Component<IAppProps, IAppState> {
//     constructor(props: IAppProps) {
//         super(props);

//         this.state = {
//         }
//     }

//     render() {
//         return (
//             <div>
//                 COMMING SOON
//             </div>
//         );
//     }
// }

import React from 'react';
import { NavLink } from 'react-router-dom';
import { getShowTimeMovieList } from '../../../core/services/movieManager.service';


const CommingSoonPage = () => {
    let [danhSachPhim, setDanhSachPhim] = React.useState([]);
    const renderDanhSachPhim = () => {
        return danhSachPhim.map((phim:any, index) => {
            console.log(danhSachPhim);
            return (
                <div className = "col-4" key = {index}>
                    <div className="card text-left">
                            <img className="card-img-top" src={phim.hinhAnh} />
                        <div className="card-body">
                            <h4 className="card-title">{phim.tenPhim}</h4>
                            <NavLink className = "btn btn-success" to={`/moviedetail/${phim.maPhim}`}>Đặt vé</NavLink>
                        </div>
                    </div>
                </div>
            )
            
        })
    }
    React.useEffect(() => {
        getShowTimeMovieList().then(result => {
            console.log(result.data);
            setDanhSachPhim(result.data);
        }).catch(errors => { console.log(errors.response.data) })
    }, []) // tham so 2 rỗng
    return (
        <div className="container">
            <div className="display-4 text-center" >Danh Sách Phim</div>
            <div className="row">
                {renderDanhSachPhim()}
            </div>
        </div>
    );
};

export default CommingSoonPage;