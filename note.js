// 8255
e.prototype.onTouchBuyHandler = function () {
  if (c.default.playEffect(c.default.CLICK), m.default.ins.money >= this.cf.price) {
    y.default.ins.addItem(this.pcf.id, 1, !1);
    var t = y.default.ins.getData();
    g.default.buyItem(this.pcf.id, t, this._buyComplete, this, this._buyFail);
  }
}
// 3391 
t.buyItem = function (e, n, o, i, r) {
  var a = { spId: e, item: n };
  t.commandPost("/game/buyItem", a, o, i, r);
}
// 3351 
// 发送命令
// e接口；n数据；o,i,r回调相关
t.commandPost = function (e, n, i, r, l) {
  var u = t.makeSign(n),//制作sign
    f = s.default.getHost() + e; //访问网址
  c.default.log("command input:", f, n),
    a.default.encodePost(f, u, t/*回调函数*/, this);
}
// 3350 
// makesign
// sign=md5(uid+ts+JSON(数据json文本)+"472770f9e581cffb09349f422af57c5d")
t.makeSign = function (e) {
  var n = {
    uid: o.default.getUid(),
    ts: t.getCommandSeq(),
    params: JSON.stringify(e)
  };
  return n.sign = i.default.hex_md5(n.uid + n.ts.toString() + n.params + r.default.CLIENT_KEY //472770f9e581cffb09349f422af57c5d
  ), n;
}
// 6870 
//e 网址；n sign；r回调函数；a father.this
t.encodePost = function (e, n, r, a) {
  void 0 === a && (a = null);
  var s = new XMLHttpRequest();
  s.onreadystatechange = t//回调函数
  var c = i.default.randomInt(1e7, 99999999), //密钥t为随机数
    l = { t: c, v: t.encode(c, n) };
  s.open("POST", e, !0),
    s.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
    s.send(o.default.formatHttpParams(l));
}
// 加密核心代码
t.encrypt = function (t, e) {
  for (var n, o = e.length,
    i = (t ^ o) % 255,
    r = ((o & i) + (t ^ i)) % 255,
    a = [], s = 0; s < o; s++) {
    i -= (r * o ^ t) % 255, t -= r, n = 255 & ((n = e[s]) ^ (r = i % 255)), a.push(n);
  } return a;
}, t.encode = function (e, n) {
  var i = JSON.stringify(n),
    r = t.encrypt(e, o.default.stringToByte(i));
  return o.default.parseByte2HexStr(r);
}, t.decode = function (e, n) {
  var i = t.encrypt(e, o.default.parseHexStr2Byte(n)),
    r = o.default.byteToString(i);
  return JSON.parse(r);
}
// 8684
// http post格式
t.formatHttpParams = function (t) {
  var e = "";
  if (null != t)
    for (var n in t) {
      e += n + "=" + t[n] + "&";
    }
  return e.length > 0 && (e = e.substr(0, e.length - 1)), e;
}

// 解密代码
function dec(t) {
  if ("string" == typeof t) return t; for (var n = [], i = 0; i < t.length; i++) {
    n.push(t[i]);
  } return n;
}
function decodeUtf8(bytes) {
  var encoded = "";
  for (var i = 0; i < bytes.length; i++) {
    encoded += '%' + bytes[i].toString(16);
  }
  return decodeURIComponent(encoded);
}
function n(t) {
  var e = 0,
    n = t.length; if (n % 2 != 0) return null; n /= 2; for (var o = [], i = 0; i < n; i++) {
      var r = t.substr(e, 2),
        a = parseInt(r, 16); o.push(a), e += 2;
    } return o;
}
function m(t, e) {
  for (var n, o = e.length,
    i = (t ^ o) % 255,
    r = ((o & i) + (t ^ i)) % 255,
    a = [], s = 0; s < o; s++) {
    i -= (r * o ^ t) % 255, t -= r, n = 255 & ((n = e[s]) ^ (r = i % 255)), a.push(n);
  } return a;
}
function decode() {
  var p = m(93150642, n("9ee199c52ec765a01373a5ccbbfb2f311197b47c6210890aa10a67505ba13d4cea4a9e7dc08ba152b8b7473438784991ac0ef46a95ed6406e88de5ae5cce7a4ae3855339ad2c2171dd5a3ec7d9f87b69a4827bd9d905c77731c4e0304dbd9ff21f40ee5b329e1e00e874dd95941e65ff06e08e194a08"))
  console.log(decodeUtf8(dec(p)));
}


// 第一次发送的数据
// {"gid":"201","sdk":4,"uid":"899376e****************3e2b0f","ios":false,"sign":"5e85b****************cfa122e9fdc"}
// sign=md5(e.gid + e.sdk + e.uid + c.default.CLIENT_KEY)