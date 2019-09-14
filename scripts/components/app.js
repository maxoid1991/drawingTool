import React, { Component, PureComponent } from 'react';

//Redux
import {connect} from "react-redux";
import { store } from "../store/store";
import { polygonCoordsAction, newShape, clearCoords, checkBtn } from "../actionCreators/actionCreator";

import '../../styles/app.scss';

class DrawTool extends Component {
    constructor(props) {
        super(props);
        this.canvas   = React.createRef();
        this.polygon  = React.createRef();
        this.polygonQ = React.createRef();
        this.circleQ = React.createRef();
        this.buttonsCheck = React.createRef();
    }

    createPolygonDot(x, y) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', 5);
        circle.style.fill = 'black';
        circle.setAttribute('class', 'poligonDots');
        this.canvas.current.appendChild(circle);
    }

    polygonArea(X, Y, numPoints) {
        let area = 0;    
        let j = numPoints-1;  
      
        for (let i = 0; i < numPoints; i++) {
            area = area + ( X[j] + X[i] ) * ( Y[j] - Y[i] ); 
            j = i; 
        }

        return area/2;
    }

    polygonEvent(e) {
        let x = e.nativeEvent.offsetX;
        let y = e.nativeEvent.offsetY;
        let updatedStore;

        if (this.props.state.newShape) {
            store.dispatch(clearCoords());
            this.polygon.current.removeAttribute("points");
            this.canvas.current.querySelectorAll('.poligonDots').forEach(item => item.remove());
            store.dispatch(newShape(false));
        }

        const drawPoligon = (e) => {
            if (this.props.state.totalCoords.length && e.offsetY > 5) {
                let coords = this.props.state.totalCoords.join(',') + ',' + e.offsetX + ',' + e.offsetY;
                this.polygon.current.setAttribute("points", coords);
            } else {
                let coords = this.props.state.totalCoords.join(',');
                this.polygon.current.setAttribute("points", coords);
                this.canvas.current.onmousemove = null;
                store.dispatch(newShape(true));
            }
        };

        if(this.props.state.totalCoords.length) {
            const byX = e.nativeEvent.offsetX > this.props.state.coordsX[0] - 5 && e.nativeEvent.offsetX < this.props.state.coordsX[0] + 5;
            const byY = e.nativeEvent.offsetY > this.props.state.coordsY[0] - 5 && e.nativeEvent.offsetY < this.props.state.coordsY[0] + 5;

            if(byX && byY) {
                this.canvas.current.onmousemove = null;
                store.dispatch(newShape(true));
                return;
            }
        }

        this.createPolygonDot(x, y);
        store.dispatch(polygonCoordsAction([x,y], x, y));
        this.canvas.current.onmouseup = drawPoligon;
        this.canvas.current.onmousemove = drawPoligon;

        updatedStore = store.getState().MainPageReducer;
        this.polygonQ.current.innerHTML = Math.abs(this.polygonArea(updatedStore.coordsX, updatedStore.coordsY, updatedStore.coordsX.length));
    }

    drawCircle(e) {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;
        const circleDrawn = this.canvas.current.querySelectorAll('.circleArea');

        if (circleDrawn.length) circleDrawn.forEach(item => item.remove());

        circle.setAttribute("class", "circleArea");
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);

        this.canvas.current.appendChild(circle);

        const drawCircleBorder = (e) => {
            const circleMove = this.canvas.current.querySelectorAll('.circleArea');

            if(circleMove[0]) {
                const a = x - e.offsetX;
                const b = y - e.offsetY;
                const c = Math.sqrt( a*a + b*b );
                const circleArea = Math.pow(c, 2) * Math.PI;

                circleMove[0].setAttribute("r", c);
                this.circleQ.current.innerHTML = circleArea.toFixed(2);
            }
        }

        this.canvas.current.onmousemove = drawCircleBorder;
        this.canvas.current.onmouseup = () => {
            this.canvas.current.onmousemove = null;
        }
    }

    checkShape(e){
        switch (e.target.innerHTML) {
            case 'Poligon' : {
                this.buttonsCheck.current.className = "buttons-wrapper buttons-selected-first";
                store.dispatch(checkBtn(true));
                break;
            }

            case 'Circle' : {
                this.buttonsCheck.current.className = "buttons-wrapper buttons-selected-second";
                store.dispatch(checkBtn(false));
                break;
            }
        }
    }

    render() {
        return(
            <div> 
                <div className="header">
                    <div className="data">
                        <p>Poligon area: <span className="poligon_area" ref={this.polygonQ}></span></p>
                        <p>Circle area: <span className="circle_area" ref={this.circleQ}></span></p>
                    </div>         
                    <div className={"buttons-wrapper buttons-selected-first"} ref={this.buttonsCheck} onClick={this.checkShape.bind(this)}>
                        <button>Poligon</button>
                        <button>Circle</button>
                    </div>
                </div>     
                <svg
                    ref={this.canvas}
                    onMouseDown={this.props.state.button ? this.polygonEvent.bind(this) : this.drawCircle.bind(this)}
                    id='canvas' width="100%" height="100vh">
                    <polygon ref={this.polygon} className='poligonShape'></polygon>   
                </svg>
            </div>
        )    
    }
}

const mapStateToProps = (state, props) => {

    return {
        state : state.MainPageReducer
    }
};

export default connect(mapStateToProps)(DrawTool);