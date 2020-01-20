import React, { Component } from "react";
const electron = window.require("electron");
const Store = window.require("electron-store");
const settings = new Store({
    name: "settings"
});

const ipcRenderer = electron.ipcRenderer;

export default class home extends Component {
    componentDidMount() {
        const fontSize = settings.get("settings.font_size");
        document.querySelector(".change-font").placeholder = fontSize;
        const backgroundColor = settings.get("settings.backgroundColor");
        document.querySelector(".change-color").value = backgroundColor;
    }

    enterKeyPressed = target => {
        const font_size = document.querySelector(".change-font");
        if (target.charCode === 13) {
            if (font_size.value !== "") {
                ipcRenderer.send("save:font", font_size.value);
            }
        }
    };

    limitNumber = item => {
        if (item.target.value > 2) {
            item.target.value = item.target.value.slice(0, 2);
        }
    };

    openSettings = () => {
        settings.openInEditor();
    };

    changeColor = item => {
        const color = item.target.value;
        ipcRenderer.send("save:color", color);

        document.body.style.background = color;
    };

    render() {
        return (
            <div id="main" className="wrapper-options">
                <div id="box-background-color" className="box-options">
                    <button onClick={this.openSettings}>
                        Open settings file in editor
                    </button>
                </div>
                <div id="box-background-color" className="box-options1">
                    <section>
                        <span>Font size in textbox</span>
                        <input
                            maxLength="3"
                            className="change-font"
                            onKeyPressCapture={this.enterKeyPressed}
                            onChange={this.limitNumber}
                            type="number"
                        />
                    </section>
                </div>
                <div id="box-background-color" className="box-options2">
                    <span>Background color</span>
                    <input
                        type="color"
                        className="change-color"
                        onChange={this.changeColor}
                    />
                </div>
            </div>
        );
    }
}