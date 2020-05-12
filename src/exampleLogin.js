import React, { Component } from "react";

//this එක ගැන : React වලදී class use වෙන නිසා this එක use වෙනවා, ඒ හැම තිස්සෙම this එකෙන් කියන්නේ ඔයා ඉන්නා class එකේ තියෙන කියන එක

class Login extends Component {
  //මෙන්න මේ class එක ගැන තමා හැම තිස්සේම this එකෙන් කියන්නේ (මේකේදි Login Class එක )

  //   React වල තියෙනවා state  කියලා එකක්, ඒකෙන් වෙන්නේ අපි මොකක් හරි event එකක් කරපුවම
  //   වෙන state එකේ වෙනස control කරන එක,event  කියලා කියන්නේ අපි කරන දේවල්(KeyPress, Mouse Click, Mouse Hover......)
  //  ඒ වගේ වෙනස් කරන්න පුලුවන් ඒවා අපි state object එකක් හදලා එකේ properties විදියට දානවා
  state = {
    username: "", //මේ තියෙන්නෙ ඔයාගේ username කියන, අපි keypress event එකක් කරන username input එකට අදාළ state prpoerty එක,
    // එකේ අපි type කරන්න හිතන් ඉන්නේ string එකක් නිසා,webpage එක load වුන ගමන් එක හිස්ව තියෙන්න ඔන නිසාත් අපි එක හිස් string එකක් විදියට declare කරනවා
    password: "", //password එකත් ඒ වගේම තමා
  };

  //onChange Methods   //මේවා තමා අපි event එකක් කරහම වෙන දේ කරන methods ටික
  onChangeUserame(event) {
    //මේ තියෙන්නේ ඔයාගේ username input එකට අපි event එකක් කරහම ඒ දේ කරන method එක, අපි event කියන එක මේ method වලට pass කරන්න ඕනේ
    this.setState({
      //state object එක අපිට කෙලින්ම වෙනස් කරන්න බෑ(this.state.username = event.target.value කියලා බෑ), ඒකට මේ setState කියන method එක use කරන්න ඕනේ
      username: event.target.value, //අපේ event එකෙන් ඒකට අදාල target එක හොයාගෙන අපි event එකෙන් කරපු value එක දාන්න කියන එක
    });
  }

  onChangePassword(event) {
    //මේකත් username එක වගේ තමා
    this.setState({
      password: event.target.value,
    });
  }

  //Button Click event එකට අදාල function එක තමා මේක, අපි Login Button එක  එබුවම කරන්න ඕන දේ මෙයාට කියන්න
  onLogin() {
    //JavaScript code for Login --(backend validation)
  }
  render() {
    //මෙයා තමා html part එක කරන්නේ
    return (
      //React වලදි html class වලට කියන්නේ className කියලා
      <div className="Login">
        <label>Username : </label>
        <input
          type="text"
          value={this.state.username} //මේක තමා අර onChange method වල value එක විදියට වැඩ කළේ/ඔයා username input එකේ type කරන දේම state එකට දාන්න තියා ගන්න variable එකක් වගේ මේක
          onChange={this.onChangeUserame} //මෙයා තමා onChange method එකට කතා කරන්නේ/ onChange React වලින්ම එන එකක්
        />
        <label>Password : </label>
        <input
          type="password"
          value={this.state.password}
          onChange={this.onChangePassword}
        />
        {/* ඔයා button එක click කරහම වෙන දේ කරන්නේ මෙයා තමා */}
        <button onClick={this.onLogin}>Login</button>
      </div>
    );
  }
}

export default Login;
