import{p as Le,i as De,t as ge,m as e,l as t,c as Xe,x as pt,y as c,r,A as bt,B as st,e as de,f as Re,C as S,D as ae,s as re,u as dt,h as wt,E as _e,F as xt,G as Bt,b as zt,n,H as T,I as Lt,o as Dt,J as L,K as i,L as vt}from"./index-Dv_kEzIZ.js";import{I as D}from"./Icon-CyjxMOkf.js";function Rt(o,l,s){for(let d=0;d<o.length;d++)l[d]!==void 0&&(s[o[d]]=l[d])}let Ye,He,Ke,je=200,Ge=100,Ce,Ae,Je,Qe,Ue,Ve,we;const $t=o=>{Ye=void 0,He=void 0,Ke=void 0,je=200,Ge=100,Je=void 0,Qe=void 0,Ce=void 0,Ae=void 0,Ue=void 0,Ve=void 0,o.currentTarget.reset()},Et=o=>{Ce=o.target.checked},It=o=>{Ae=o.target.checked},Nt=o=>{const l=o.target;l.value==""?we=void 0:we=l.value};var Tt=ge('<div id="nodeContainer" class="svelte-1q80enq"><form><ul aria-labelledby="select_props" class="svelte-1q80enq"><li class="list-item svelte-1q80enq"><label for="bgColor" class="svelte-1q80enq">Background:</label> <input id="bgColor" class="colorWheel svelte-1q80enq" type="color"></li> <li class="list-item svelte-1q80enq"><label for="borderColor" class="svelte-1q80enq">Border:</label> <input id="borderColor" class="colorWheel svelte-1q80enq" type="color"></li> <li class="list-item svelte-1q80enq"><label for="dimensions" class="svelte-1q80enq">Dimensions:</label></li> <li class="list-item svelte-1q80enq"><label for="width" class="svelte-1q80enq">Width:</label> <input id="width" class="inputField svelte-1q80enq" type="input"> <label for="height" style="margin-left: 6px" class="svelte-1q80enq">Height:</label> <input id="height" class="inputField svelte-1q80enq" type="input"></li> <li class="list-item svelte-1q80enq"><label for="locked" class="svelte-1q80enq">Locked:</label> <input id="label" type="checkbox"></li> <li class="list-item svelte-1q80enq"><label for="centered" class="svelte-1q80enq">Centered:</label> <input id="centered" type="checkbox"></li> <li class="list-item svelte-1q80enq"><label for="rotation" class="svelte-1q80enq">Rotation:</label> <input id="rotation" class="inputField svelte-1q80enq" type="number"></li> <li class="list-item svelte-1q80enq"><label for="zIndex" class="svelte-1q80enq">zIndex:</label> <input id="zIndex" class="inputField svelte-1q80enq" type="number"></li> <li class="list-item svelte-1q80enq"><label for="label" class="svelte-1q80enq">Label :</label> <input id="label" type="text"></li> <li class="list-item svelte-1q80enq"><label for="defaultAnchors" class="svelte-1q80enq">Default Anchors:</label></li> <li class="list-item svelte-1q80enq"><label for="inputAnchor" class="svelte-1q80enq">Input:</label> <input id="inputAnchor" class="inputField svelte-1q80enq" type="number" min="0"> <label for="outputAnchor" style="margin-left: 6px" class="svelte-1q80enq">Output:</label> <input id="outputAnchor" class="inputField svelte-1q80enq" type="number" min="0"></li> <li class="list-item svelte-1q80enq"><label for="anchorPositon" class="svelte-1q80enq">Anchor Position:</label> <select id="anchorPosition"><option>-</option><option>LR</option><option>TD</option></select></li> <li class="list-item svelte-1q80enq"><button class="nodeResetBtn btn svelte-1q80enq" aria-label="Reset">Reset</button></li></ul></form></div>');function St(o,l){Le(l,!1),De();var s=Tt(),d=t(s),x=t(d),w=t(x),y=e(t(w),2),R=e(w,2),C=e(t(R),2),f=e(R,4),m=e(t(f),2),P=e(m,4),q=e(f,2),k=e(t(q),2),g=e(q,2),b=e(t(g),2),$=e(g,2),E=e(t($),2),I=e($,2),W=e(t(I),2),A=e(I,2),p=e(t(A),2),H=e(A,4),K=e(t(H),2),G=e(K,4),F=e(H,2),N=e(t(F),2);Xe(()=>{pt(()=>{})});var z=t(N);z.value=((z.__value="")==null,"");var O=e(z);O.value=(O.__value="LR")==null?"":"LR";var u=e(O);u.value=(u.__value="TD")==null?"":"TD",c(y,()=>Ye,a=>Ye=a),c(C,()=>He,a=>He=a),c(m,()=>je,a=>je=a),c(P,()=>Ge,a=>Ge=a),c(k,()=>Ce,a=>Ce=a),r("change",k,Et),c(b,()=>Ae,a=>Ae=a),r("change",b,It),c(E,()=>Ue,a=>Ue=a),c(W,()=>Ve,a=>Ve=a),c(p,()=>Ke,a=>Ke=a),c(K,()=>Je,a=>Je=a),c(G,()=>Qe,a=>Qe=a),bt(N,()=>we,a=>we=a),r("change",N,Nt),r("submit",d,st($t)),de(o,s),Re()}const $e=_e(0),Ee=_e(0),Ie=_e(0),Ne=_e(0),Te=_e(0);let ve,ue,pe,be,he,Y,fe,ht,qe,xe,ut,Pt,v={self:[],left:[],right:[],top:[],bottom:[]};const Wt=(o,l)=>{Y==""&&(Y=void 0);const s={};Rt(["invisible","nodeConnect","input","output","multiple","direction","dynamic","edgeLabel","locked","bgColor","edge"],[ve,ue,pe,be,he,Y,fe,ht,qe,xe,Pt],s),Object.keys(s).length&&(l==="addLeftAnchor"?v.left.push(s):l==="addRightAnchor"?v.right.push(s):l==="addTopAnchor"?v.top.push(s):l==="addBottomAnchor"?v.bottom.push(s):l==="addSelfAnchor"&&v.self.push(s))},Ft=o=>{qe=o.target.checked},Ot=o=>{ve=o.target.checked},Mt=o=>{ue=o.target.checked},Xt=o=>{pe=o.target.checked},Yt=o=>{be=o.target.checked},Ht=o=>{he=o.target.checked},Kt=o=>{fe=o.target.checked},jt=o=>{const l=o.target;l.value==""?Y=void 0:Y=l.value},Gt=o=>{ve=void 0,ue=void 0,pe=void 0,be=void 0,he=void 0,Y=void 0,fe=void 0,ht=void 0,qe=void 0,xe=void 0,v.left=[],v.right=[],v.top=[],v.bottom=[],v.self=[],Te.set(0),$e.set(0),Ee.set(0),Ie.set(0),Ne.set(0);const l=o.target;o&&l.reset()},ie=o=>{var d;const l=o.target,s=((d=l==null?void 0:l.parentElement)==null?void 0:d.id)||(l==null?void 0:l.id);Wt(!1,s),s==="addLeftAnchor"?$e.set(v.left.length):s==="addRightAnchor"?Ee.set(v.right.length):s==="addTopAnchor"?Ie.set(v.top.length):s==="addBottomAnchor"?Ne.set(v.bottom.length):s==="addSelfAnchor"&&Te.set(v.self.length)},ce=o=>{var d;const l=o.target,s=((d=l==null?void 0:l.parentElement)==null?void 0:d.id)||(l==null?void 0:l.id);s==="deleteLeftAnchor"?(v.left.pop(),$e.set(v.left.length)):s==="deleteRightAnchor"?(v.right.pop(),Ee.set(v.right.length)):s==="deleteTopAnchor"?(v.top.pop(),Ie.set(v.top.length)):s==="deleteBottomAnchor"?(v.bottom.pop(),Ne.set(v.bottom.length)):s==="deleteSelfAnchor"&&(v.self.pop(),Te.set(v.self.length))};var Jt=ge('<div id="anchorContainer" class="svelte-1qkq4bu"><form><ul aria-labelledby="select_props" class="svelte-1qkq4bu"><li class="list-item svelte-1qkq4bu"><label for="anchorBgColor" class="svelte-1qkq4bu">Background:</label> <input id="anchorBgColor" class="colorWheel svelte-1qkq4bu" type="color"></li> <li class="list-item svelte-1qkq4bu"><label for="invisible" class="svelte-1qkq4bu">Invisible:</label> <input id="invisible" type="checkbox"></li> <li class="list-item svelte-1qkq4bu"><label for="nodeConnect" class="svelte-1qkq4bu">Node Connect:</label> <input id="nodeConnect" type="checkbox"></li> <li class="list-item svelte-1qkq4bu"><label for="input" class="svelte-1qkq4bu">Input:</label> <input id="input" type="checkbox"></li> <li class="list-item svelte-1qkq4bu"><label for="output" class="svelte-1qkq4bu">Output:</label> <input id="output" type="checkbox"></li> <li class="list-item svelte-1qkq4bu"><label for="multiple" class="svelte-1qkq4bu">Multiple:</label> <input id="multiple" type="checkbox"></li> <li class="list-item svelte-1qkq4bu"><label for="direction" class="svelte-1qkq4bu">Direction:</label> <select id="direction"><option>-</option><option>North</option><option>South</option><option>East</option><option>West</option><option>Self</option></select></li> <li class="list-item svelte-1qkq4bu"><label for="dynamic" class="svelte-1qkq4bu">Dynamic:</label> <input id="dynamic" type="checkbox"></li> <li class="list-item svelte-1qkq4bu"><label for="anchorLocked" class="svelte-1qkq4bu">Locked:</label> <input id="anchorLocked" type="checkbox"></li> <li class="list-item svelte-1qkq4bu"><label for="addAnchors" class="svelte-1qkq4bu">Add Anchors:</label> <button id="deleteSelfAnchor" class="deleteAnchor svelte-1qkq4bu" type="button"><!></button> <span class="list-item counter svelte-1qkq4bu"> </span> <button id="addSelfAnchor" class="addAnchor svelte-1qkq4bu" type="button"><!></button></li> <li class="list-item anchor-directions svelte-1qkq4bu"><p>Left</p> <p>Right</p></li> <li class="list-item anchor-directions svelte-1qkq4bu"><button id="deleteLeftAnchor" class="deleteAnchor svelte-1qkq4bu" type="button"><!></button> <span class="list-item couter svelte-1qkq4bu"> </span> <button id="addLeftAnchor" class="addAnchor svelte-1qkq4bu" type="button"><!></button> <button id="deleteRightAnchor" class="deleteAnchor svelte-1qkq4bu" type="button"><!></button> <span class="list-item couter svelte-1qkq4bu"> </span> <button id="addRightAnchor" class="addAnchor svelte-1qkq4bu" type="button"><!></button></li> <li class="list-item anchor-directions svelte-1qkq4bu"><p>Top</p> <p>Bottom</p></li> <li class="list-item anchor-directions svelte-1qkq4bu"><button id="deleteTopAnchor" class="deleteAnchor svelte-1qkq4bu" type="button"><!></button> <span class="list-item couter svelte-1qkq4bu"> </span> <button id="addTopAnchor" class="addAnchor svelte-1qkq4bu" type="button"><!></button> <button id="deleteBottomAnchor" class="deleteAnchor svelte-1qkq4bu" type="button"><!></button> <span class="list-item couter svelte-1qkq4bu"> </span> <button id="addBottomAnchor" class="addAnchor svelte-1qkq4bu" type="button"><!></button></li> <li class="list-item svelte-1qkq4bu"><button class="anchorResetBtn btn svelte-1qkq4bu" type="submit" aria-label="Reset">Reset</button></li></ul></form></div>');function Qt(o,l){Le(l,!1);const[s,d]=wt(),x=()=>re(Te,"$selfAnchorCounter",s),w=()=>re($e,"$leftAnchorCounter",s),y=()=>re(Ee,"$rightAnchorCounter",s),R=()=>re(Ie,"$topAnchorCounter",s),C=()=>re(Ne,"$bottomAnchorCounter",s);De();var f=Jt(),m=t(f),P=t(m),q=t(P),k=e(t(q),2),g=e(q,2),b=e(t(g),2),$=e(g,2),E=e(t($),2),I=e($,2),W=e(t(I),2),A=e(I,2),p=e(t(A),2),H=e(A,2),K=e(t(H),2),G=e(H,2),F=e(t(G),2);Xe(()=>{pt(()=>{})});var N=t(F);N.value=((N.__value="")==null,"");var z=e(N);z.value=(z.__value="north")==null?"":"north";var O=e(z);O.value=(O.__value="south")==null?"":"south";var u=e(O);u.value=(u.__value="east")==null?"":"east";var a=e(u);a.value=(a.__value="west")==null?"":"west";var B=e(a);B.value=(B.__value="self")==null?"":"self",S(F,_=>ut=_,()=>ut);var M=e(G,2),X=e(t(M),2),Q=e(M,2),U=e(t(Q),2),me=e(Q,2),j=e(t(me),2),V=t(j);D(V,{icon:"arrow_left"});var Z=e(j,2),ke=t(Z),ee=e(Z,2),Se=t(ee);D(Se,{icon:"arrow_right"});var te=e(me,4),J=t(te),Pe=t(J);D(Pe,{icon:"arrow_left"});var le=e(J,2),ye=t(le),oe=e(le,2),We=t(oe);D(We,{icon:"arrow_right"});var ne=e(oe,2),h=t(ne);D(h,{icon:"arrow_left"});var se=e(ne,2),ft=t(se),at=e(se,2),qt=t(at);D(qt,{icon:"arrow_right"});var gt=e(te,4),Fe=t(gt),_t=t(Fe);D(_t,{icon:"arrow_left"});var rt=e(Fe,2),mt=t(rt),Oe=e(rt,2),kt=t(Oe);D(kt,{icon:"arrow_right"});var Me=e(Oe,2),yt=t(Me);D(yt,{icon:"arrow_left"});var it=e(Me,2),Ct=t(it),ct=e(it,2),At=t(ct);D(At,{icon:"arrow_right"}),Xe(()=>{ae(ke,x()),ae(ye,w()),ae(ft,y()),ae(mt,R()),ae(Ct,C())}),c(k,()=>xe,_=>xe=_),c(b,()=>ve,_=>ve=_),r("change",b,Ot),c(E,()=>ue,_=>ue=_),r("change",E,Mt),c(W,()=>pe,_=>pe=_),r("change",W,Xt),c(p,()=>be,_=>be=_),r("change",p,Yt),c(K,()=>he,_=>he=_),r("change",K,Ht),bt(F,()=>Y,_=>Y=_),r("change",F,jt),c(X,()=>fe,_=>fe=_),r("change",X,Kt),c(U,()=>qe,_=>qe=_),r("change",U,Ft),r("click",j,dt(ce)),r("click",ee,dt(ie)),r("click",J,ce),r("click",oe,ie),r("click",ne,ce),r("click",at,ie),r("click",Fe,ce),r("click",Oe,ie),r("click",Me,ce),r("click",ct,ie),r("submit",m,st(Gt)),de(o,f),Re(),d()}let Ze,et,Be,tt,ze,lt,ot,nt;const Ut=o=>{Be=o.target.checked},Vt=o=>{ze=o.target.checked},Zt=o=>{Ze=void 0,et=void 0,Be=void 0,tt=void 0,ze=void 0,lt=void 0,ot=void 0,nt=void 0,o.target.reset()};var el=ge('<div id="edgeContainer" class="svelte-1l9z4rf"><form><ul aria-labelledby="select_props" class="svelte-1l9z4rf"><li class="list-item svelte-1l9z4rf"><label for="color" class="svelte-1l9z4rf">Background:</label> <input id="color" class="colorWheel svelte-1l9z4rf" type="color"></li> <li class="list-item svelte-1l9z4rf"><label for="labelColor" class="svelte-1l9z4rf">Label:</label> <input id="labelColor" class="colorWheel svelte-1l9z4rf" type="color"></li> <li class="list-item svelte-1l9z4rf"><label for="textColor" class="svelte-1l9z4rf">Text:</label> <input id="textColor" class="colorWheel svelte-1l9z4rf" type="color"></li> <li class="list-item svelte-1l9z4rf"><label for="animate" class="svelte-1l9z4rf">Animate :</label> <input id="animate" type="checkbox"></li> <li class="list-item svelte-1l9z4rf"><label for="step" class="svelte-1l9z4rf">Step:</label> <input id="step" type="checkbox"></li> <li class="list-item svelte-1l9z4rf"><label for="cornerRadius" class="svelte-1l9z4rf">Corner Radius:</label> <input id="cornerRadius" class="inputField svelte-1l9z4rf" type="number"></li> <li class="list-item svelte-1l9z4rf"><label for="width" class="svelte-1l9z4rf">Width:</label> <input id="width" class="inputField svelte-1l9z4rf" type="number"></li> <li class="list-item svelte-1l9z4rf"><label for="edgeLabel" class="svelte-1l9z4rf">Edge Label:</label> <input id="edgeLabel" type="text"></li> <li class="list-item svelte-1l9z4rf"><button class="edgeResetBtn btn svelte-1l9z4rf" aria-label="Reset">Reset</button></li></ul></form></div>');function tl(o,l){Le(l,!1),De();var s=el(),d=t(s),x=t(d),w=t(x),y=e(t(w),2),R=e(w,2),C=e(t(R),2),f=e(R,2),m=e(t(f),2),P=e(f,2),q=e(t(P),2),k=e(P,2),g=e(t(k),2),b=e(k,2),$=e(t(b),2),E=e(b,2),I=e(t(E),2),W=e(E,2),A=e(t(W),2);c(y,()=>et,p=>et=p),c(C,()=>ot,p=>ot=p),c(m,()=>nt,p=>nt=p),c(q,()=>ze,p=>ze=p),r("change",q,Vt),c(g,()=>Be,p=>Be=p),r("change",g,Ut),c($,()=>tt,p=>tt=p),c(I,()=>Ze,p=>Ze=p),c(A,()=>lt,p=>lt=p),r("submit",d,st(Zt)),de(o,s),Re()}var ll=ge('<button class="drawerBtn svelte-zlwv6l" aria-label="Open/Close Drawer"><!></button> <ul class="drawerContents svelte-zlwv6l"><li class="list-item"><div class="menu svelte-zlwv6l"><button class="dropdown svelte-zlwv6l" aria-label="Component">Node</button> <button class="dropdown svelte-zlwv6l" aria-label="Component">Anchor</button> <button class="dropdown svelte-zlwv6l" aria-label="Component">Edge</button></div></li> <li class="list-item"><div class="propsContainer nodeContainer svelte-zlwv6l"><!></div></li> <li class="list-item"><div class="propsContainer anchorContainer svelte-zlwv6l"><!></div></li> <li class="list-item"><div class="propsContainer edgeContainer svelte-zlwv6l"><!></div></li> <li class="list-item"><div role="presentation" class="defaultNodes svelte-zlwv6l" draggable="true">Node</div></li></ul>',1),ol=ge('<nav id="drawerWrapper" class="svelte-zlwv6l"><!></nav>');function al(o,l){Le(l,!1);let s=T(!1),d=!1,x=!1,w=!1,y=T(),R=T(),C=T(),f=T(),m=T(),P=T(),q=T(),k=T(),g=T(),b=null;const $=()=>{n(s)?(L(s,!1),i(y,n(y).style.height="35px"),i(y,n(y).style.width="35px"),w=!1,x=!1,d=!1,i(q,n(q).style.display="block"),i(g,n(g).style.display="none"),i(k,n(k).style.display="none"),i(C,n(C).style.borderBottom="3px solid var(--prop-drawer-button-text-color,var(--drawer-button-text-color, var(--default-drawer-button-text-color)))"),i(f,n(f).style.borderBottom="none"),i(m,n(m).style.borderBottom="none")):(L(s,!0),i(y,n(y).style.height="fit-content"),i(y,n(y).style.width="300px"))},E=()=>{d||(d=!0,w=!1,x=!1,i(q,n(q).style.display="block"),i(g,n(g).style.display="none"),i(k,n(k).style.display="none"),i(C,n(C).style.borderBottom="3px solid var(--prop-drawer-button-text-color,var(--drawer-button-text-color, var(--default-drawer-button-text-color)))"),i(f,n(f).style.borderBottom="none"),i(m,n(m).style.borderBottom="none"))},I=()=>{w||(w=!0,x=!1,d=!1,i(k,n(k).style.display="block"),i(g,n(g).style.display="none"),i(q,n(q).style.display="none"),i(C,n(C).style.borderBottom="none"),i(f,n(f).style.borderBottom="none"),i(m,n(m).style.borderBottom="3px solid var(--prop-drawer-button-text-color,var(--drawer-button-text-color, var(--default-drawer-button-text-color)))"))},W=()=>{x||(x=!0,d=!1,w=!1,i(g,n(g).style.display="block"),i(k,n(k).style.display="none"),i(q,n(q).style.display="none"),i(C,n(C).style.borderBottom="none"),i(f,n(f).style.borderBottom="3px solid var(--prop-drawer-button-text-color,var(--drawer-button-text-color, var(--default-drawer-button-text-color)))"),i(m,n(m).style.borderBottom="none"))};let A="Node";const p=u=>{u.key==="D"?$():u.key==="T"&&n(s)&&(A==="Node"?(I(),A="Anchor"):A==="Anchor"?(W(),A="Edge"):A==="Edge"&&(E(),A="Node"))};let H=0,K=0;const G=(u,a,B)=>{u.dataTransfer&&(console.log("Dragging Node:",B),u.dataTransfer.dropEffect="move",u.dataTransfer.setData("text/plain",B),b=a)},F=u=>{if(!b)return;console.log("handleDragMove function called!"),console.log("Dragging...",u.clientX,u.clientY);const a=u.clientX-H,B=u.clientY-K,{x:M,y:X}=vt(a,B);console.log("Snapped to:",M,X),(parseInt(b.style.left,10)!==M||parseInt(b.style.top,10)!==X)&&(b.style.left=`${M}px`,b.style.top=`${X}px`)},N=()=>{if(!b)return;const{x:u,y:a}=vt(parseInt(b.style.left,10),parseInt(b.style.top,10));b.style.left=`${u}px`,b.style.top=`${a}px`,b=null};xt(()=>{window.addEventListener("keydown",p),window.addEventListener("mousemove",F),window.addEventListener("mouseup",N)}),Bt(()=>{window.removeEventListener("keydown",p),window.removeEventListener("mousemove",F),window.removeEventListener("mouseup",N)}),De();var z=ol(),O=t(z);zt(O,l,"default",{},u=>{var a=ll(),B=Lt(a),M=t(B);const X=Dt(()=>n(s)?"south_east":"north_west");D(M,{get icon(){return n(X)}}),S(B,h=>L(R,h),()=>n(R));var Q=e(B,2),U=t(Q),me=t(U),j=t(me);S(j,h=>L(C,h),()=>n(C));var V=e(j,2);S(V,h=>L(m,h),()=>n(m));var Z=e(V,2);S(Z,h=>L(f,h),()=>n(f));var ke=e(U,2),ee=t(ke),Se=t(ee);St(Se,{}),S(ee,h=>L(q,h),()=>n(q));var te=e(ke,2),J=t(te),Pe=t(J);Qt(Pe,{}),S(J,h=>L(k,h),()=>n(k));var le=e(te,2),ye=t(le),oe=t(ye);tl(oe,{}),S(ye,h=>L(g,h),()=>n(g));var We=e(le,2),ne=t(We);S(Q,h=>L(P,h),()=>n(P)),r("click",B,$),r("click",j,E),r("click",V,I),r("click",Z,W),r("dragstart",ne,h=>{const se=h.target;se instanceof HTMLElement&&G(h,se,"defaultNode")}),de(u,a)}),S(z,u=>L(y,u),()=>n(y)),de(o,z),Re()}export{al as default};
