import css from "./loading.module.css";
import Spinner from 'react-bootstrap/Spinner';
const Loading=()=>{
    return <>
        <div className={`${css.loadDiv}`}>
    <Spinner style={{backgroundColor:'#F3F2F2'}} animation="grow" variant="primary" />
      <Spinner style={{backgroundColor:'#E6E4E4'}} animation="grow" variant="secondary" />
      <Spinner style={{backgroundColor:'#DAD7D7'}} animation="grow" variant="success" />
      <Spinner style={{backgroundColor:'#CDC9C9'}} animation="grow" variant="danger" />
      {/* <Spinner style={{backgroundColor:'#F2F2F2'}} animation="grow" variant="warning" /> */}
      <Spinner style={{backgroundColor:'#D0CFCF	'}} animation="grow" variant="info" />
      <Spinner style={{backgroundColor:'#ADACAC	'}} animation="grow" variant="light" />
      <Spinner style={{backgroundColor:'#8B8989'}} animation="grow" variant="dark" />
        </div>
    </>
}

export default Loading;