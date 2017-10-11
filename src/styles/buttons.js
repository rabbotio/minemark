// Styles
import styled from 'styled-components'

const Buttonz = styled.button`
cursor: pointer;
position:relative;
width: auto;
display:inline-block;
color:#ecf0f1;
text-decoration:none;
border-radius:5px;
border:solid 1px #bdc3c7;
background:#95a5a6;
text-align:center;
margin: 8px;
outline: none;
height: 26px;
padding-bottom: 2.2em;

-webkit-transition: all 0.1s;
-moz-transition: all 0.1s;
transition: all 0.1s;

-webkit-box-shadow: 0px 3px 0px #7f8c8d;
-moz-box-shadow: 0px 3px 0px #7f8c8d;
box-shadow: 0px 3px 0px #7f8c8d;

:active{
  -webkit-box-shadow: 0px 2px 0px #7f8c8d;
  -moz-box-shadow: 0px 2px 0px #7f8c8d;
  box-shadow: 0px 2px 0px #7f8c8d;
  position:relative;
  top:4px;
}

svg {
  display:inline-block;
  margin-top: 0.1em;
  padding: 0.2em;
}

span {
  margin-top: 0.3em;
  display: inline-block;
  vertical-align: top;
  padding: 0.1em;
  height: 16px;
}
`

export { Buttonz }
