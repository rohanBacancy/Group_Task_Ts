import React,{FC} from 'react';
import './Backdrop.css';
interface IbackdropProps{
    show:boolean
}
const backDrop:FC<IbackdropProps> = (props:any) =>(
    props.show ? <div className='BackDrop'>{props.children}</div> : null
);

export default backDrop;