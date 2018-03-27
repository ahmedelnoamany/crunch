import React from 'react';
import Svg, {
    Circle,
    Path
} from 'react-native-svg';

export default (props) => (
    <Svg width={props.width} height={props.height} version="1" viewBox="0 0 512 512">
 <Circle cx="256" cy="256" r="256" fill="#00e8f2"/>
 <Path d="M512 256l-2-28-126-126c-7-9-19-15-31-15H159c-22 0-40 18-40 40v101c-8 5-13 13-13 23v26H93v128l99 99a256 256 0 0 0 320-248z" fill="#00b8c0"/>
 <Path d="M393 253H119V127c0-22 18-40 40-40h194c22 0 40 18 40 40v126z" fill="#415be9"/>
 <Path d="M393 127v126H256V87h97c22 0 40 18 40 40z" fill="#052ae3"/>
 <Path d="M231 234h-69c-10 0-18-8-18-18v-28c0-10 8-18 18-18h69c10 0 18 8 18 18v28c0 10-8 18-18 18z" fill="#ffed93"/>
 <Path d="M350 234h-69c-10 0-18-8-18-18v-28c0-10 8-18 18-18h69c10 0 18 8 18 18v28c0 10-8 18-18 18z" fill="#ffd500"/>
 <Path d="M406 283H106v-32c0-15 12-27 27-27h246c15 0 27 12 27 27v32z" fill="#fff"/>
 <Path d="M406 251v32H256v-59h123c5 0 10 1 14 4 8 5 13 13 13 23z" fill="#fff5ca"/>
 <Path fill="#415be9" d="M93 350h33v55H93z"/>
 <Path fill="#052ae3" d="M386 350h33v55h-33z"/>
 <Path fill="#6977eb" d="M93 277h326v84H93z"/>
 <Path fill="#415be9" d="M256 277h163v84H256z"/>
</Svg>)